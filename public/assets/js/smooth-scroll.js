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

  function announceHashChange() {
    /* pushState does not emit hashchange. Existing research anchors use that
       event to open their corresponding source collection before scrolling. */
    try { window.dispatchEvent(new HashChangeEvent('hashchange')); }
    catch (error) { window.dispatchEvent(new Event('hashchange')); }
  }

  function moveToTarget(target, focus) {
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    if (!focus) return;
    if (!target.matches('a, button, input, select, textarea, [tabindex]')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var anchor = event.target.closest('a[href]');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;

    var url;
    try { url = new URL(anchor.href, window.location.href); }
    catch (error) { return; }
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;

    var target = getHashTarget(url.hash);
    if (!target) return;

    event.preventDefault();
    if (url.hash !== window.location.hash) {
      window.history.pushState(null, '', url.pathname + url.search + url.hash);
    }
    announceHashChange();
    target = getHashTarget(url.hash) || target;
    window.requestAnimationFrame(function () { moveToTarget(target, true); });
  });

  window.addEventListener('popstate', function () {
    var target = getHashTarget(window.location.hash);
    if (!target) return;
    announceHashChange();
    window.requestAnimationFrame(function () { moveToTarget(getHashTarget(window.location.hash) || target, false); });
  });
}());
