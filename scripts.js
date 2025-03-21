// Table of contents:
// 0. Projects List
// 1. Global Variables and Register Plugins
// 2. Page Transitions
// 3. Loader Transitions
// 4. Scrollbased Animations









// 0. Projects List
// document.addEventListener("DOMContentLoaded", function () {
//   const projects = [
//       {
//           projectTitle: "Naqlista",
//           projectDescription: "Mobile App",
//           projectImageUrl: "naqlista.jpg",
//           projectLinkUrl: "https://www.be.net/gallery/145665303/Naqlista",
//           projectTarget: "_blank"
//       },
//       {
//           projectTitle: "Frovilink",
//           projectDescription: "UX Design",
//           projectImageUrl: "naqlista.jpg",
//           projectLinkUrl: "https://www.be.net/gallery/145665303/Naqlista",
//           projectTarget: "_blank"
//       }
//   ];

//   const projectsList = document.querySelector("ul.projects");

//   if (projectsList) {
//       projects.forEach(project => {
//           const listItem = document.createElement("li");
//           listItem.classList.add("project");

//           const anchor  = document.createElement("a");
//           anchor.href   = project.projectLinkUrl;
//           anchor.title  = project.projectTitle;
//           anchor.target = project.projectTarget;

//           const title = document.createElement("h3");
//           title.classList.add("project-title");
//           title.textContent = project.projectTitle;

//           const image = document.createElement("img");
//           image.src = project.projectImageUrl;
//           image.alt = project.projectTitle;

//           const description = document.createElement("p");
//           description.classList.add("project-description");
//           description.textContent = project.projectDescription;

//           anchor.appendChild(title);
//           anchor.appendChild(image);
//           anchor.appendChild(description);

//           listItem.appendChild(anchor);
//           projectsList.appendChild(listItem);
//       });
//   }
// });


document.addEventListener("contextmenu", function(e){
  e.preventDefault()
  }, false
);










// ==============================
// 1. Global Variables & Plugins
// ==============================
var multiPageSite = false;
gsap.registerPlugin(ScrollTrigger);
let locoScroll;

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const loader      = select('.js-loader');
const loaderInner = select('.js-loader__inner');
const loaderMask  = select('.js-loader__mask');
const progressBar = select('.js-loader__progress');
const container   = select('.main-content');

// Loader Initial Setup
gsap.set(loader, { autoAlpha: 1 });
gsap.set(loaderInner, { scaleY: 0.005, transformOrigin: 'bottom' });


// ==============================
// 2. Initialize GSAP & Locomotive
// ==============================
function initSmoothScroll(container) {
    locoScroll = new LocomotiveScroll({
        el: container.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.115,
        getDirection: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: container.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    // Remove old Locomotive Scrollbar
    const scrollbar = selectAll('[data-scroll-container]');
    if (scrollbar.length > 1) {
        scrollbar[0].remove();
    }
}

// Function to initialize all GSAP animations
function initAnimations() {
  if(select('ul.projects')){
    // Homepage interactions
    gsap.from('ul.projects > li', {
      y: 100,
      scale: 0.95,
      opacity: 0,
      'pointer-events': 'none',
    //   'filter':'blur(10px)',
    //   ease: 'power2.inOut',
      stagger: 1,
      scrollTrigger: {
          trigger: 'ul.projects > li',
          scroller: '[data-scroll-container]',
          start: 'top 100%',
          end: 'top 55%',
          markers: 0,
          scrub: true
      }
  });
  const tlIntroduction = gsap.timeline({ defaults: { duration: 0.85, ease: 'power4.out' }, delay: 1.75 });
  tlIntroduction
      .from('.intro-text h1 .first-name', {opacity: 0,y: 50}, 0.5)
      .from('.intro-text h1 .middle-name',{opacity: 0,y: 50}, 0.75)
      .from('.intro-text h1 .last-name',  {opacity: 0,y: 50}, 1)
      .from('.intro-text h2 .position',   {opacity: 0,y: 50}, 2.0)
      .from('.intro-text h2 .country',    {opacity: 0,y: 50}, 3)
      .from('.intro-text .font-large',    {opacity: 0,y: 50}, 3.5)
      .from('.header', { opacity: 0 }, 4.0)
      .from('.freelance-label', { opacity: 0, y: 10 }, 5.0)
      .from('.freelance-label', { x: -10 }, 5.5)
      .from('.status-light', { scale: 0.01, y: 5 }, 5.75)
      ;
  gsap.timeline().add(tlIntroduction);
  };



    // Loader Animations
    const tlLoaderIn = gsap.timeline({ defaults: { duration: 0.75, ease: 'power2.out' } });
    tlLoaderIn.to(loaderInner, { scaleY: 1, transformOrigin: 'bottom', ease: 'power1.inOut' });

    const tlLoaderOut = gsap.timeline({ defaults: { duration: 0.75, ease: 'power4.inOut' }, delay: 0.2 });
    tlLoaderOut.to(loader, { yPercent: -100 }, 0.0).from('.main-content', { y: 150 }, 0.2);

    gsap.timeline().add(tlLoaderIn).add(tlLoaderOut);

    ScrollTrigger.refresh();
}

// Function to clear animations & destroy Locomotive
function destroyAnimations() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (locoScroll) locoScroll.destroy();
}


// ==============================
// 3. Page Transitions with Barba
// ==============================
function initPageTransitions() {
    barba.hooks.before(() => {
        select('html').classList.add('is-transitioning');
    });

    barba.hooks.after(() => {
        select('html').classList.remove('is-transitioning');
    });

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    if (multiPageSite) {
      barba.init({
        sync: true,
        debug: true,
        timeout: 7000,
        transitions: [{
            name: 'overlay-transition',
            once(data) {
                initSmoothScroll(data.next.container);
                initAnimations();
            },
            async leave(data) {
                // ✅ Kill all ScrollTrigger instances
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                
                // ✅ Destroy LocomotiveScroll
                if (locoScroll) {
                    locoScroll.destroy();
                    locoScroll = null; // Prevent potential conflicts
                }

                await pageTransitionIn(data.current);
                await delay(1000);
                data.current.container.remove();
            },
            async enter(data) {
                await pageTransitionOut(data.next);

                // ✅ Reinitialize everything after transition
                initSmoothScroll(data.next.container);
                initAnimations();

                // ✅ Ensure ScrollTrigger refreshes
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 500);
            }
        }]
      });
    } else {
        initSmoothScroll(container);
        initAnimations();
    }
}


// ==============================
// 4. Page Transition Animations
// ==============================
function pageTransitionIn({ container }) {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.inOut' } });
    return tl
        .set(loaderInner, { autoAlpha: 0 })
        .fromTo(loader, { yPercent: -100 }, { yPercent: 0 })
        .fromTo(loaderMask, { yPercent: 80 }, { yPercent: 0 }, 0)
        .to(container, { y: 100 }, 0);
}

function pageTransitionOut({ container }) {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.inOut' } });
    return tl
        .to(loader, { yPercent: 100 })
        .to(loaderMask, { yPercent: -80 }, 0)
        .from(container, { y: -150 }, 0);
}


// ==============================
// 5. Utility Functions
// ==============================
// Generic delay function
function delay(n = 2000) {
    return new Promise((done) => setTimeout(done, n));
}


// ==============================
// 6. Initialize Everything
// ==============================
initPageTransitions();