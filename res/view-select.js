/**
 * View selector: full experience vs. lite version
 * ------------------------------------------------
 * - A visitor's own choice (saved in localStorage) always wins.
 * - Otherwise visitors on a slow / data-saving connection, or on a machine
 *   without hardware acceleration, are sent to lite.html automatically.
 * - ?view=lite or ?view=full in the address bar sets the choice by hand.
 * Runs in <head>, before anything is painted, so there is no flash.
 */
(function () {
  var KEY = "portfolio-view";
  var isLitePage = /lite(\.html)?\/?$/.test(location.pathname);

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* storage blocked: ignore */ }
  }

  // Slow connection or data-saver turned on
  function slowConnection() {
    var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!c) return false;
    return !!c.saveData || /^(slow-2g|2g|3g)$/.test(c.effectiveType || "");
  }

  // No hardware acceleration: WebGL missing, or a software renderer
  function noHardwareAcceleration() {
    try {
      var canvas = document.createElement("canvas");
      var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return true;
      var info = gl.getExtension("WEBGL_debug_renderer_info");
      if (!info) return false;
      var renderer = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) || "");
      return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
    } catch (e) {
      return false;
    }
  }

  // Manual override from the address bar
  var m = /[?&]view=(lite|full)/.exec(location.search);
  if (m) save(m[1]);

  var choice = read();

  if (!isLitePage) {
    var goLite = choice === "lite" || (!choice && (slowConnection() || noHardwareAcceleration()));
    if (goLite) {
      location.replace("lite.html");
      return;
    }
  }

  // Remember the choice whenever someone uses a "Lite version" / "Full experience" link
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-view]");
    if (el) save(el.getAttribute("data-view"));
  });
})();
