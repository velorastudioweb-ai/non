/* ===========================================================================
 QuantumHealth — smooth-scroll.js
 Progressive enhancement for same-page anchors only. Native page and touch
 scrolling remain untouched, and reduced-motion preferences always win.
 ========================================================================== */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function getHashTarget(hash) {
    if (!hash || hash === '#') return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
    catch (error) { return null; }
  }

  document.addEventListener('click', function (event) {
    if (reducedMotion.matches || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var anchor = event.target.closest('a[href]');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;

    var href = anchor.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;

    var target = getHashTarget(href);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, '', href);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (!target.matches('a, button, input, select, textarea, [tabindex]')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  });
})();
