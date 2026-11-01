/* ===========================================================================
   Quantum Health — motion system
   Lightweight, progressive motion built on CSS transforms and one-shot
   IntersectionObservers. No runtime library, scroll hijacking or animation
   work is enabled for reduced-motion or coarse-pointer contexts.
   =========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var desktop = window.matchMedia('(min-width: 1024px)');
  var cleanups = [];
  var initialized = false;

  function $$(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  function addCleanup(fn) {
    cleanups.push(fn);
  }

  function cleanup() {
    while (cleanups.length) {
      try { cleanups.pop()(); } catch (error) { /* Best-effort page teardown. */ }
    }
    root.classList.remove('motion-reveals');
    initialized = false;
  }

  function decorate(selector, className, columns) {
    $$(selector).forEach(function (element, index) {
      if (!element.classList.contains('reveal')) element.classList.add('reveal');
      if (className) element.classList.add(className);
      if (!element.hasAttribute('data-delay')) {
        element.setAttribute('data-delay', String((index % (columns || 3)) + 1));
      }
    });
  }

  function collectRevealTargets() {
    /* Include the authored targets and the surfaces decorated below before
       modifying their classes. That keeps initial viewport reads mutation-free. */
    return $$('.reveal, .blog-card, .qh-card, .educational-visual, .page-banner__art--motion').filter(function (element) {
      return !element.closest('[hidden], [aria-hidden="true"]');
    });
  }

  function prepareRevealTargets() {
    /* These surfaces are authored in generated/template content that does not
       pass through the shared section renderers. Decorate them here so all
       routes use the same one-shot entrance contract. */
    decorate('.blog-card', 'reveal--card', 3);
    decorate('.qh-card', 'reveal--card', 3);
    decorate('.educational-visual', 'reveal--image', 1);
    decorate('.page-banner__art--motion', 'reveal--image', 1);
  }

  function setRevealDelay(element, compact) {
    var requested = parseInt(element.getAttribute('data-delay') || '0', 10);
    var delay = compact || !requested ? 0 : Math.min(requested, 5) * 70;
    element.style.setProperty('--reveal-delay', delay + 'ms');
  }

  function setupReveals() {
    var reduced = reducedMotion.matches;
    var compact = !finePointer.matches || window.innerWidth < 768;
    var targets = collectRevealTargets();
    prepareRevealTargets();
    targets.forEach(function (element) { setRevealDelay(element, compact); });

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach(function (element) { element.classList.add('is-revealed'); });
      if (!reduced) root.classList.add('motion-reveals');
      return;
    }

    /* IntersectionObserver reports an initial state for every observed target.
       Keep content visible until that batch has marked the in-view targets, so
       there is neither a flash of hidden copy nor synchronous layout reads. */
    if (!targets.length) {
      root.classList.add('motion-reveals');
      return;
    }

    /* Observing after the next frame lets the browser consume the decoration
       writes above before it calculates intersections. */
    var frame = window.requestAnimationFrame(function () {
      frame = 0;
      var seen = [];
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (seen.indexOf(entry.target) === -1) seen.push(entry.target);
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
        if (seen.length === targets.length) root.classList.add('motion-reveals');
      }, { rootMargin: '0px 0px 8% 0px', threshold: 0 });
      targets.forEach(function (element) { observer.observe(element); });
      addCleanup(function () { observer.disconnect(); });
    });
    addCleanup(function () {
      if (frame) window.cancelAnimationFrame(frame);
    });
  }

  function setupHeroParallax() {
    var hero = document.querySelector('.hero');
    var background = hero && hero.querySelector('.hero__bg');
    if (!hero || !background || reducedMotion.matches || !finePointer.matches || !desktop.matches) return;

    var frame = 0;
    function update() {
      frame = 0;
      var rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      /* Cap movement at 24px so readable hero content is never displaced. */
      var amount = Math.max(-24, Math.min(24, rect.top * -0.055));
      background.style.setProperty('--hero-parallax-y', amount.toFixed(2) + 'px');
    }
    function queueUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }
    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate, { passive: true });
    addCleanup(function () {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      background.style.removeProperty('--hero-parallax-y');
    });
  }

  function setupMagneticButtons() {
    if (reducedMotion.matches || !finePointer.matches) return;

    $$('.btn, .btn--header').forEach(function (button) {
      var frame = 0;
      var x = 0;
      var y = 0;
      function apply() {
        frame = 0;
        button.style.setProperty('--magnetic-x', x.toFixed(2) + 'px');
        button.style.setProperty('--magnetic-y', y.toFixed(2) + 'px');
      }
      function move(event) {
        if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        var rect = button.getBoundingClientRect();
        x = Math.max(-3, Math.min(3, (event.clientX - (rect.left + rect.width / 2)) * 0.075));
        y = Math.max(-2, Math.min(2, (event.clientY - (rect.top + rect.height / 2)) * 0.06));
        if (!frame) frame = window.requestAnimationFrame(apply);
      }
      function reset() {
        x = 0;
        y = 0;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        button.style.setProperty('--magnetic-x', '0px');
        button.style.setProperty('--magnetic-y', '0px');
      }
      button.addEventListener('pointermove', move, { passive: true });
      button.addEventListener('pointerleave', reset, { passive: true });
      button.addEventListener('blur', reset);
      addCleanup(function () {
        button.removeEventListener('pointermove', move);
        button.removeEventListener('pointerleave', reset);
        button.removeEventListener('blur', reset);
        reset();
      });
    });
  }

  function safeSession(action) {
    try { action(window.sessionStorage); } catch (error) { /* Storage may be unavailable. */ }
  }

  function setupPageTransitions() {
    /* Touch navigation should remain immediate. The richer route handoff is a
       desktop affordance; compact layouts retain their lightweight reveals. */
    if (reducedMotion.matches || !finePointer.matches) return;
    var overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    function handleClick(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var anchor = event.target.closest('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download') || anchor.hasAttribute('data-lightbox') || anchor.closest('.lightbox')) return;
      if (anchor.matches('.skip-link') || anchor.getAttribute('aria-disabled') === 'true') return;

      var url;
      try { url = new URL(anchor.href, window.location.href); } catch (error) { return; }
      if (url.origin !== window.location.origin || !/^https?:$/.test(url.protocol)) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      event.preventDefault();
      root.classList.add('is-leaving');
      safeSession(function (storage) { storage.setItem('qh-focus-main', '1'); });
      window.setTimeout(function () { window.location.assign(url.href); }, 170);
    }

    document.addEventListener('click', handleClick);
    addCleanup(function () {
      document.removeEventListener('click', handleClick);
      overlay.remove();
    });
  }

  function restoreNavigationFocus() {
    root.classList.remove('is-leaving');
    safeSession(function (storage) {
      if (storage.getItem('qh-focus-main') !== '1') return;
      storage.removeItem('qh-focus-main');
      var main = document.getElementById('main');
      if (main) window.requestAnimationFrame(function () { main.focus({ preventScroll: true }); });
    });
  }

  function start() {
    if (initialized) return;
    initialized = true;
    setupReveals();
    if (!reducedMotion.matches) root.classList.add('motion-ready');
    setupHeroParallax();
    setupMagneticButtons();
    setupPageTransitions();
  }

  function boot() {
    start();
    restoreNavigationFocus();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();

  window.addEventListener('pagehide', cleanup);
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) boot();
    else restoreNavigationFocus();
  });
}());
