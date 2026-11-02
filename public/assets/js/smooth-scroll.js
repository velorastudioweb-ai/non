/* ===========================================================================
   QuantumHealth — smooth-scroll.js
   Progressive enhancement for same-page anchors only. Native page and touch
   scrolling remain untouched, and reduced-motion preferences always win.
   A short eased traversal gives section links a premium feel without any
   scroll hijacking: the animation stops the moment the visitor scrolls,
   touches or presses a key.
   ========================================================================== */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var frame = 0;
  var activeTarget = null;

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

  function scrollOffset() {
    var header = document.querySelector('.site-header');
    var height = header ? header.getBoundingClientRect().height : 0;
    return Math.max(72, height + 24);
  }

  function easeOutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
  }

  function stop() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
    activeTarget = null;
    document.documentElement.style.removeProperty('scroll-behavior');
  }

  function moveToTarget(target, focus) {
    if (!target) return;
    stop();
    activeTarget = target;
    var top = target.getBoundingClientRect().top + window.scrollY - scrollOffset();
    var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    top = Math.max(0, Math.min(max, top));

    var start = window.scrollY;
    var distance = top - start;
    var duration = Math.max(380, Math.min(920, Math.abs(distance) * 0.42));
    var startTime = 0;
    var html = document.documentElement;
    var previousBehavior = html.style.scrollBehavior;

    if (reducedMotion.matches) {
      window.scrollTo(0, top);
      finish(target, focus);
      return;
    }

    html.style.scrollBehavior = 'auto';

    function finish() {
      frame = 0;
      activeTarget = null;
      html.style.scrollBehavior = previousBehavior;
      if (!focus) return;
      if (!target.matches('a, button, input, select, textarea, [tabindex]')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }

    function step(now) {
      if (activeTarget !== target) return;
      if (!startTime) startTime = now;
      var progress = Math.min(1, (now - startTime) / duration);
      window.scrollTo(0, start + distance * easeOutQuint(progress));
      if (progress < 1) frame = window.requestAnimationFrame(step);
      else finish();
    }
    frame = window.requestAnimationFrame(step);
  }

  function finish(target, focus) {
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

  /* Any deliberate input hands scrolling back to the visitor immediately. */
  ['wheel', 'touchstart', 'keydown'].forEach(function (type) {
    window.addEventListener(type, function () {
      if (!activeTarget) return;
      stop();
    }, { passive: type !== 'keydown' });
  });

  window.addEventListener('popstate', function () {
    var target = getHashTarget(window.location.hash);
    if (!target) return;
    announceHashChange();
    window.requestAnimationFrame(function () { moveToTarget(getHashTarget(window.location.hash) || target, false); });
  });
}());
