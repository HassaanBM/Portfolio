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
    smooth: 1.63,                 // Smoothing intensity
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
let mobileStickyNavTrigger = null;

// Create or destroy ScrollTrigger based on screen width
function handleMobileStickyNav() {
    const isMobile = window.innerWidth < 768;

    // If on desktop and trigger exists, kill it
    if (!isMobile && mobileStickyNavTrigger) {
        mobileStickyNavTrigger.kill();
        mobileStickyNavTrigger = null;
        gsap.set(".navigation", { clearProps: "y" });
        ScrollTrigger.refresh();
        return;
    }

    // If on mobile and not already created, create it
    if (isMobile && !mobileStickyNavTrigger) {
        mobileStickyNavTrigger = ScrollTrigger.create({
            trigger: "#smooth-content",
            start: "top top",
            end: "bottom bottom",
            onUpdate: self => {
                const scrollY = self.scroll();
                gsap.set(".navigation", { y: scrollY });
            }
        });
        ScrollTrigger.refresh();
    }
}

// Call on load
window.addEventListener("load", handleMobileStickyNav);

// Call on resize with debounce
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        handleMobileStickyNav();
    }, 250);
});





// ----------------------------------------
// 09. Refresh ScrollTrigger
// ----------------------------------------
ScrollTrigger.refresh();
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createMobileStickyNav();  // Re-evaluate sticky nav on resize
        ScrollTrigger.refresh();  // Recalculate scroll positions
    }, 250);
});





// ----------------------------------------
// 10. Mobile Menu Animation with Checkbox Trigger
// ----------------------------------------

// Responsive check mobile menu function
function toggleMobileMenu() {
    if (window.innerWidth < 768) {
        // Create the menu timeline (initially paused and reversed)
        const menuTimeline = gsap.timeline({ paused: true, reversed: true });

        // Animate the menu in and stagger nav items
        menuTimeline
            .to(".navigation", {
                x: "-100dvw", // brings it into view from right to left
                width: "100%",
                duration: 0.6,
                ease: "power4.out"
            })
            .from(".navigation ul li", {
                opacity: 0,
                y: 30,
                stagger: 0.12,
                duration: 0.4,
                ease: "power2.out"
            }, "<+=0.1"); // slight delay after nav appears

        // Event listener for checkbox toggle
        const menuCheckbox = document.querySelector("#menu-trigger");

        menuCheckbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                menuTimeline.play();
            } else {
                menuTimeline.reverse();
            }
        });
    }
}
// Call it on load
window.addEventListener("load", toggleMobileMenu);

// Call it on resize with debounce
let resizeTimeoutCheck;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeoutCheck);
  resizeTimeoutCheck = setTimeout(() => {
    toggleMobileMenu();
  }, 250);
});