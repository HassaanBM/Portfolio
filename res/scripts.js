

document.addEventListener("contextmenu", function(e){
  e.preventDefault()
  }, false
);



gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


ScrollSmoother.create({
  wrapper: "#smooth-wrapper",   // outer container
  content: "#smooth-content",   // scrollable content
  smooth: 1.63,                  // amount of smoothing (default is 1.0)
  effects: true                 // enable effects like data-speed, data-lag
});


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


const tlIntroduction = gsap.timeline({ defaults: { duration: 0.85, ease: 'power4.out' }, delay: 1.65 });
tlIntroduction
    .from('.intro-text h1 .first-name', {opacity: 0,y: 50}, 0.5)
    .from('.intro-text h1 .middle-name',{opacity: 0,y: 50}, 0.75)
    .from('.intro-text h1 .last-name',  {opacity: 0,y: 50}, 1)
    .from('.intro-text h2 .position',   {opacity: 0,y: 50}, 2.0)
    .from('.intro-text h2 .country',    {opacity: 0,y: 50}, 3)
    .from('.intro-text .font-large',    {opacity: 0,y: 50}, 3.5)
    .from('.header',                    {opacity: 0,y: -50 }, 4.0)
    .from('.freelance-label',           {opacity: 0, y: 10 }, 5.0)
    .from('.status-light',              {scale: 0.01, width: 0 }, 5.5)
    ;
gsap.timeline().add(tlIntroduction);





// Loader Animations
const tlLoaderIn = gsap.timeline({ defaults: { duration: 0.75, ease: 'power2.out' } });
tlLoaderIn.to(loaderInner, { scaleY: 1, transformOrigin: 'bottom', ease: 'power1.inOut' });

const tlLoaderOut = gsap.timeline({ defaults: { duration: 0.75, ease: 'power4.inOut' }, delay: 0.2 });
tlLoaderOut.to(loader, { yPercent: -100 }, 0.0).from('.main-content', { y: 150 }, 0.2);

gsap.timeline().add(tlLoaderIn).add(tlLoaderOut);

ScrollTrigger.refresh();