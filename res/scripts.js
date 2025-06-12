gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",   // outer container
  content: "#smooth-content",   // scrollable content
  smooth: 1.2,                  // amount of smoothing (default is 1.0)
  effects: true                 // enable effects like data-speed, data-lag
});