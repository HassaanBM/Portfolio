/**
 * Project JavaScript: Animation and Interaction Script
 * -----------------------------------------------------
 * TABLE OF CONTENTS
 * 01. Context Menu Disable
 * 02. GSAP Plugins Registration
 * 03. Smooth Scroll Initialization
 * 04. Global Selectors
 * 05. Loader Initial Setup
 * 06. Loader Animation (In and Out)
 * 07. Intro Animation Sequence
 * 08. Sticky Navigation Scroll Update
 * 09. Refresh ScrollTrigger
 * 10. Mobile Menu Animation
 * 11. Second Fold: curtain transition + story text
 * 12. Work chapters: reveal on cue
 * 13. Cursor bubble
 * 14. Final refresh
 */




// ----------------------------------------
// 01. Context Menu Disable
// ----------------------------------------
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);






// ----------------------------------------
// 02. GSAP Plugins Registration
// ----------------------------------------
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);






// ----------------------------------------
// 03. Smooth Scroll Initialization
// ----------------------------------------
ScrollSmoother.create({
    wrapper: "#smooth-wrapper",   // Outer container
    content: "#smooth-content",   // Scrollable content
    smooth: 1.763,                 // Smoothing intensity
    effects: true                 // Enable data-speed, data-lag effects
});






// ----------------------------------------
// 04. Global Selectors
// ----------------------------------------
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);
const loader = select('.js-loader');
const loaderInner = select('.js-loader__inner');
const loaderMask = select('.js-loader__mask');
const progressBar = select('.js-loader__progress');
const container = select('.main-content');
const nav = document.querySelector("nav.navigation");
const wrapper = document.querySelector("div#smooth-wrapper");
const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)



document.addEventListener("DOMContentLoaded", function () {
  if (isMobile) {
    if (nav && wrapper) {
      const navClone = nav.cloneNode(true);
      navClone.classList.add("mobile-navigation"); // Add new class
      nav.remove(); // Remove original
      wrapper.parentNode.insertBefore(navClone, wrapper); // Move before #smooth-wrapper
    }
  }
});




// ----------------------------------------
// 05. Loader Initial Setup
// ----------------------------------------
gsap.set(loader, { autoAlpha: 1 });
gsap.set(loaderInner, { scaleY: 0.005, transformOrigin: 'bottom' });






// ----------------------------------------
// 06. Loader Animation (In and Out)
// ----------------------------------------

// Loader In Animation
const tlLoaderIn = gsap.timeline({
    defaults: { duration: 0.75, ease: 'power2.out' }
});
tlLoaderIn.to(loaderInner, {
    scaleY: 1,
    transformOrigin: 'bottom',
    ease: 'power1.inOut'
});

// Loader Out Animation
const tlLoaderOut = gsap.timeline({
    defaults: { duration: 0.75, ease: 'power4.inOut' },
    delay: 0.2
});
tlLoaderOut
    .to(loader, { yPercent: -100 }, 0.0)
    .from('.main-content', { y: 150 }, 0.2);

// Master Loader Timeline
gsap.timeline()
    .add(tlLoaderIn)
    .add(tlLoaderOut)
    .eventCallback("onComplete", () => {
        document.body.classList.remove("is-loading");
    });

setTimeout(() => {
    document.body.classList.remove("is-loading");
}, 8000); // force unlock after 8s max








// ----------------------------------------
// 07. Intro Animation Sequence
// ----------------------------------------
const tlIntroduction = gsap.timeline({
    defaults: { duration: 0.85, ease: 'power4.out' },
    delay: 1.65
});

tlIntroduction
    .from('.intro-text h1 .first-name', { opacity: 0, y: 50 }, 0.5)
    .from('.intro-text h1 .middle-name', { opacity: 0, y: 50 }, 0.75)
    .from('.intro-text h1 .last-name', { opacity: 0, y: 50 }, 1)
    .from('.intro-text h2 .position', { opacity: 0, y: 50 }, 2.0)
    .from('.intro-text h2 .country', { opacity: 0, y: 50 }, 3)
    .from('.intro-text .font-large', { opacity: 0, y: 50 }, 3.5)
    .from('.header', { opacity: 0, y: -50 }, 4.0)
    .from('.freelance-label', { opacity: 0, y: 10 }, 5.0)
    .from('.status-light', { scale: 0.01, width: 0 }, 5.5);

// Wrap into Master Timeline
gsap.timeline().add(tlIntroduction);








// ----------------------------------------
// 08. Sticky Navigation Scroll Update
// ----------------------------------------
// let mobileStickyNavTrigger = null;

// // Create or destroy ScrollTrigger based on screen width
// function handleMobileStickyNav() {
//     const isMobile = window.innerWidth < 768;

//     // If on desktop and trigger exists, kill it
//     if (!isMobile && mobileStickyNavTrigger) {
//         mobileStickyNavTrigger.kill();
//         mobileStickyNavTrigger = null;
//         gsap.set(".navigation", { clearProps: "y" });
//         ScrollTrigger.refresh();
//         return;
//     }

//     // If on mobile and not already created, create it
//     if (isMobile && !mobileStickyNavTrigger) {
//         mobileStickyNavTrigger = ScrollTrigger.create({
//             trigger: "#smooth-content",
//             start: "top top",
//             end: "bottom bottom",
//             onUpdate: self => {
//                 const scrollY = self.scroll();
//                 gsap.set(".navigation", { y: scrollY });
//             }
//         });
//         ScrollTrigger.refresh();
//     }
// }

// // Call on load
// window.addEventListener("load", handleMobileStickyNav);









// ----------------------------------------
// 09. Refresh ScrollTrigger
// ----------------------------------------
let resizeHandlerTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeHandlerTimeout);
    resizeHandlerTimeout = setTimeout(() => {
        ScrollTrigger.refresh();     // Recalculate scroll positions
    }, 250);
});








// ----------------------------------------
// 10. Mobile Menu Animation with Checkbox Trigger
// ----------------------------------------




// ----------------------------------------
// 11. Second Fold: curtain transition + story text
// ----------------------------------------
// The hero is closed off by horizontal blinds, then the dark story section rises over it (like davidecarusio.it).
// The hero text lags behind (data-speed) so the blinds cut across it.
// The story paragraph then reads in word by word as you scroll (like kusaludhara.com).
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const smoother = ScrollSmoother.get();

const storyCopy = {
    everyone: "Hi, welcome to my portfolio. I’m Hassaan, a hands-on Product Designer focused on crafting stories and experiences people enjoy using. Dive in to explore my work, my process, and how I turn ideas into products.",
    recruiters: "Hiring for your team? I’m a Product Designer with over a decade of experience, taking mobile and web products from first sketch to polished screens. My resume is one click away.",
    agencies: "Need an extra pair of hands? I plug into design teams quickly, own the UX and UI, and keep the work moving from the first idea all the way to launch.",
    clients: "Got an idea that needs shaping? I turn it into something simple, useful and good to look at, and I stay with you from the first conversation to launch day.",
    collaborators: "Building something interesting? I love working with developers, writers and makers who care about the details. Say hi and let’s see what we can make together."
};

const storyText = select('.js-story-text');
let storyTween = null;

function splitWords(el, text) {
    const words = text.replace(/\s+/g, ' ').trim().split(' ');
    el.textContent = '';
    words.forEach((w, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = w;
        el.appendChild(span);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return el.querySelectorAll('.word');
}

function buildStory(text) {
    if (!storyText) return;
    if (storyTween) {
        if (storyTween.scrollTrigger) storyTween.scrollTrigger.kill();
        storyTween.kill();
        storyTween = null;
    }
    const words = splitWords(storyText, text);
    if (reduceMotion) {
        gsap.set(words, { opacity: 1 });
        return;
    }
    storyTween = gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
            trigger: storyText,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: true
        }
    });
}

if (storyText) {
    buildStory(storyText.textContent);

    // Blinds: horizontal slats close over the hero as you scroll past it (like davidecarusio.it).
    // The lower slats close first, so the dark story section seems to pour up from the bottom.
    const intro = select('.intro');
    if (!reduceMotion && intro) {
        const SLATS = 10;
        const blinds = document.createElement('div');
        blinds.className = 'blinds';
        blinds.setAttribute('aria-hidden', 'true');
        for (let i = 0; i < SLATS; i++) blinds.appendChild(document.createElement('span'));
        intro.appendChild(blinds);

        gsap.to(blinds.children, {
            scaleY: 1,
            ease: 'none',
            stagger: { amount: 0.55, from: 'end' },
            scrollTrigger: {
                trigger: intro,
                start: 'top top',
                end: 'bottom 30%',
                scrub: true
            }
        });
    }

    // Audience tabs: For Everyone / Recruiters / Agencies / Clients / Collaborators
    const tabs = selectAll('.story-tab');
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => {
                const on = t === tab;
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            buildStory(storyCopy[tab.dataset.audience] || storyCopy.everyone);
            if (!reduceMotion) gsap.from(storyText, { y: 16, duration: 0.5, ease: 'power3.out' });
            ScrollTrigger.refresh();
        });
    });

    // "View my work" glides down to the work section
    const storyCta = select('.js-story-cta');
    if (storyCta) {
        storyCta.addEventListener('click', (e) => {
            e.preventDefault();
            smoother.scrollTo('#work', true, 'top 80px');
        });
    }
}





// ----------------------------------------
// 12. Work chapters: reveal on cue
// ----------------------------------------
if (!reduceMotion) {
    // Text pieces rise in one after another
    gsap.utils.toArray('.js-reveal').forEach((el) => {
        const inContent = el.closest('.project-content');
        const order = inContent ? Array.from(inContent.children).indexOf(el) : 0;
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            delay: order * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        });
    });

    // Images uncover from the top, then drift slowly while you scroll
    gsap.utils.toArray('.js-image-reveal').forEach((wrap) => {
        const img = wrap.querySelector('img, video');
        gsap.fromTo(wrap,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.1,
                ease: 'power4.out',
                scrollTrigger: { trigger: wrap, start: 'top 88%', once: true }
            });
        if (img && !img.classList.contains('js-hover-media')) {
            gsap.fromTo(img,
                { yPercent: -6 },
                {
                    yPercent: 6,
                    ease: 'none',
                    scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true }
                });
        }
    });
}





// ----------------------------------------
// 13. Cursor bubble + magnetic buttons (fine pointers only)
// ----------------------------------------
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const bubble = select('.js-cursor-bubble');
let hoveredCard = null;   // project card under the pointer
let magnetNear = false;   // pointer is close to a magnetic button

// The bubble shows over a card, but steps aside when a magnetic button is near
function updateBubble() {
    if (!bubble) return;
    const show = !!hoveredCard && !magnetNear;
    if (show) bubble.querySelector('span').textContent = hoveredCard.dataset.cursor;
    gsap.to(bubble, {
        scale: show ? 1 : 0,
        opacity: show ? 1 : 0,
        duration: show ? 0.35 : 0.25,
        ease: show ? 'power3.out' : 'power2.in',
        overwrite: 'auto'
    });
}

if (bubble && finePointer) {
    gsap.set(bubble, { xPercent: -50, yPercent: -50, scale: 0 });
    const xTo = gsap.quickTo(bubble, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(bubble, 'y', { duration: 0.4, ease: 'power3' });
    window.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); });
    selectAll('[data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => { hoveredCard = el; updateBubble(); });
        el.addEventListener('mouseleave', () => { hoveredCard = null; updateBubble(); });
    });
}

// Magnetic buttons: pulled toward the pointer, but only inside a small radius.
// The closer the pointer gets, the stronger the pull, until the button sticks to it.
// Outside the radius the button springs back home.
if (finePointer && !reduceMotion) {
    const RADIUS = 110;   // px from the button centre where the pull starts
    const magnets = Array.from(selectAll('.js-magnet')).map((el) => ({
        el,
        xTo: gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' }),
        yTo: gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' }),
        active: false
    }));

    window.addEventListener('mousemove', (e) => {
        let anyNear = false;
        magnets.forEach((m) => {
            const r = m.el.getBoundingClientRect();
            // centre of the button where it rests (remove the current pull)
            const cx = r.left + r.width / 2 - gsap.getProperty(m.el, 'x');
            const cy = r.top + r.height / 2 - gsap.getProperty(m.el, 'y');
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.hypot(dx, dy);

            if (dist < RADIUS) {
                anyNear = true;
                m.active = true;
                const pull = Math.pow(1 - dist / RADIUS, 1.5);   // 0 at the edge, 1 on the button
                m.xTo(dx * pull);
                m.yTo(dy * pull);
            } else if (m.active) {
                m.active = false;
                gsap.to(m.el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
            }
        });
        if (anyNear !== magnetNear) {
            magnetNear = anyNear;
            updateBubble();
        }
    });
}





// ----------------------------------------
// 14. Project media: still image, plays on hover
// ----------------------------------------
// Each project shows a still image. When the pointer is over the project, it plays.
// Two ways to add motion to a project (the still stays as the first frame):
//   <video class="project-image js-hover-media" data-src="clip.mp4" poster="still.jpg" muted loop playsinline preload="none">
//   <img   class="project-image js-hover-media" src="still.jpg" data-hover-src="clip.gif">
// To update a project later: replace the file and keep the same name, or change data-src / data-hover-src.
// Touch screens have no hover, so the media plays while it is on screen.
// With reduced motion, or a data-saver connection, only the still image shows.
const saveData = !!(navigator.connection && navigator.connection.saveData);
const hoverMedia = Array.from(selectAll('.js-hover-media'));
if (hoverMedia.length && !reduceMotion && !saveData) {
    const items = hoverMedia.map((el) => {
        const isVideo = el.tagName === 'VIDEO';
        const item = { el, isVideo, still: isVideo ? null : el.getAttribute('src'), loaded: false };
        item.load = () => {
            if (item.loaded) return;
            item.loaded = true;
            if (isVideo) { el.setAttribute('src', el.dataset.src); el.load(); }
            else {
                // Keep the still image if the GIF file is missing or fails to load.
                const g = new Image();
                g.onload = () => { item.ready = true; if (item.wanted) item.play(); };
                g.src = el.dataset.hoverSrc;
            }
        };
        item.play = () => {
            item.wanted = true;
            item.load();
            if (isVideo) {
                const p = el.play();
                if (p && p.catch) p.catch(() => { /* blocked: still stays */ });
            } else if (item.ready) {
                el.setAttribute('src', el.dataset.hoverSrc);
            }
        };
        item.stop = () => {
            item.wanted = false;
            if (isVideo) { el.pause(); try { el.currentTime = 0; } catch (e) { /* not ready */ } }
            else el.setAttribute('src', item.still);
        };
        return item;
    });

    // Start loading just before the project reaches the screen.
    if ('IntersectionObserver' in window) {
        const preloader = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const item = items.find((i) => i.el === entry.target);
                if (item) { item.load(); preloader.unobserve(entry.target); }
            });
        }, { rootMargin: '400px 0px' });
        items.forEach((i) => preloader.observe(i.el));
    }

    if (finePointer) {
        items.forEach((item) => {
            const card = item.el.closest('.project');
            if (!card) return;
            card.addEventListener('pointerenter', item.play);
            card.addEventListener('pointerleave', item.stop);
            card.addEventListener('focusin', item.play);
            card.addEventListener('focusout', item.stop);
        });
    } else if ('IntersectionObserver' in window) {
        const viewObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const item = items.find((i) => i.el === entry.target);
                if (!item) return;
                if (entry.isIntersecting) item.play(); else item.stop();
            });
        }, { threshold: 0.5 });
        items.forEach((i) => viewObserver.observe(i.el));
    }
}





// ----------------------------------------
// 15. Final refresh
// ----------------------------------------
window.addEventListener('load', () => ScrollTrigger.refresh());
