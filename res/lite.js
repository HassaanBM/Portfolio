/**
 * Lite version script
 * -------------------
 * Only one job: the same smooth scroll as the full site.
 * The settings below match res/scripts.js exactly (smooth: 1.763, effects: true).
 * If GSAP fails to load (offline, blocked), the page falls back to normal scrolling.
 */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !window.gsap || !window.ScrollTrigger || !window.ScrollSmoother) return;

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // The fixed wrapper is only switched on once the smoother exists
  document.documentElement.classList.add("has-smoother");

  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",   // Outer container
    content: "#smooth-content",   // Scrollable content
    smooth: 1.763,                // Smoothing intensity (same as the full site)
    effects: true                 // Enable data-speed, data-lag effects
  });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
