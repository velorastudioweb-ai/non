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
  var scrollProgress = null;
  var scrollJobs = [];
  var scrollFrame = 0;
  var scrollBound = false;

  function $$(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  /* One passive scroll/resize listener drives every scroll-linked effect. Each
     feature registers a small read/write job instead of binding its own
     listener or animation frame. */
  function scheduleScroll() {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(function () {
      scrollFrame = 0;
      scrollJobs.forEach(function (job) {
        try { job(); } catch (error) { /* Keep the remaining jobs alive. */ }
      });
    });
  }

  function addScrollJob(job) {
    scrollJobs.push(job);
    if (!scrollBound) {
      window.addEventListener('scroll', scheduleScroll, { passive: true });
      window.addEventListener('resize', scheduleScroll, { passive: true });
      scrollBound = true;
    }
    scheduleScroll();
  }

  function removeScrollJob(job) {
    var index = scrollJobs.indexOf(job);
    if (index !== -1) scrollJobs.splice(index, 1);
    if (!scrollJobs.length && scrollBound) {
      window.removeEventListener('scroll', scheduleScroll);
      window.removeEventListener('resize', scheduleScroll);
      scrollBound = false;
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
    }
  }

  function addCleanup(fn) {
    cleanups.push(fn);
  }

  function cleanup() {
    while (cleanups.length) {
      try { cleanups.pop()(); } catch (error) { /* Best-effort page teardown. */ }
    }
    root.classList.remove('motion-reveals');
    if (scrollProgress) {
      scrollProgress.remove();
      scrollProgress = null;
    }
    root.style.removeProperty('--scroll-progress');
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

  /* Section headings are split into masked words so the type can rise into
     place. The split is skipped for authored inline markup and the heading
     keeps an aria-label with the complete text for assistive technology. */
  function setupSplitHeadings() {
    if (reducedMotion.matches) return;
    $$('.reveal--heading .h2, .reveal--left > .h2').forEach(function (heading) {
      if (heading.dataset.motionSplit || heading.children.length) return;
      var text = (heading.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text || text.length > 120) return;

      var words = text.split(' ');
      var wrapper = document.createElement('span');
      wrapper.className = 'motion-split__words';
      wrapper.setAttribute('aria-hidden', 'true');

      words.forEach(function (word, index) {
        var outer = document.createElement('span');
        var inner = document.createElement('span');
        outer.className = 'motion-word';
        inner.className = 'motion-word__inner';
        inner.textContent = word;
        inner.style.setProperty('--word-delay', (Math.min(index, 10) * 32) + 'ms');
        outer.appendChild(inner);
        wrapper.appendChild(outer);
        if (index < words.length - 1) wrapper.appendChild(document.createTextNode(' '));
      });

      heading.setAttribute('aria-label', text);
      heading.dataset.motionSplit = 'true';
      heading.classList.add('motion-split');
      heading.textContent = '';
      heading.appendChild(wrapper);
    });
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

  function setupScrollProgress() {
    if (reducedMotion.matches) return;
    scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(scrollProgress);

    function update() {
      var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      var value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty('--scroll-progress', value.toFixed(4));
    }
    addScrollJob(update);
    addCleanup(function () {
      removeScrollJob(update);
      if (scrollProgress) scrollProgress.remove();
      scrollProgress = null;
      root.style.removeProperty('--scroll-progress');
    });
  }

  function setupHeroParallax() {
    var hero = document.querySelector('.hero');
    var background = hero && hero.querySelector('.hero__bg');
    if (!hero || !background || reducedMotion.matches || !finePointer.matches || !desktop.matches) return;

    function update() {
      var rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      /* Cap movement at 24px so readable hero content is never displaced. */
      var amount = Math.max(-24, Math.min(24, rect.top * -0.055));
      background.style.setProperty('--hero-parallax-y', amount.toFixed(2) + 'px');
    }
    addScrollJob(update);
    addCleanup(function () {
      removeScrollJob(update);
      background.style.removeProperty('--hero-parallax-y');
    });
  }

  /* Scroll-linked movement for editorial split photography. Only the handful
     of media frames currently near the viewport are updated, each on one
     shared scroll frame, and the image keeps a small scale buffer so no edge
     is ever exposed. */
  function setupScrollLinkedMedia() {
    if (reducedMotion.matches || !finePointer.matches || !desktop.matches) return;
    var targets = $$('.split__media .media-frame');
    if (!targets.length) return;

    var active = [];
    function update() {
      var viewport = window.innerHeight;
      active.forEach(function (element) {
        var rect = element.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > viewport + 80) return;
        var progress = (viewport - rect.top) / (viewport + rect.height);
        var amount = Math.max(-12, Math.min(12, (0.5 - progress) * 26));
        element.style.setProperty('--parallax-y', amount.toFixed(2) + 'px');
      });
    }

    targets.forEach(function (element) {
      element.classList.add('motion-parallax', 'is-parallax-idle');
      element.style.setProperty('--parallax-y', '0px');
    });

    var observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var index = active.indexOf(entry.target);
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-parallax-idle');
            if (index === -1) active.push(entry.target);
          } else {
            entry.target.classList.add('is-parallax-idle');
            if (index !== -1) active.splice(index, 1);
            entry.target.style.setProperty('--parallax-y', '0px');
          }
        });
        scheduleScroll();
      }, { rootMargin: '18% 0px' });
      targets.forEach(function (element) { observer.observe(element); });
    } else {
      active = targets.slice();
    }

    addScrollJob(update);
    addCleanup(function () {
      removeScrollJob(update);
      if (observer) observer.disconnect();
      targets.forEach(function (element) {
        element.classList.remove('motion-parallax', 'is-parallax-idle');
        element.style.removeProperty('--parallax-y');
      });
      active = [];
    });
  }

  function setupSpotlight() {
    if (reducedMotion.matches || !finePointer.matches) return;
    var targets = $$('.card, .location-card, .icon-card, .blog-card, .gallery-item, .qh-card');
    targets.forEach(function (element) {
      var frame = 0;
      var x = 50;
      var y = 50;
      function apply() {
        frame = 0;
        element.style.setProperty('--spot-x', x.toFixed(1) + '%');
        element.style.setProperty('--spot-y', y.toFixed(1) + '%');
      }
      function move(event) {
        if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        var rect = element.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
        y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
        if (!frame) frame = window.requestAnimationFrame(apply);
      }
      function reset() {
        x = 50;
        y = 50;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        element.style.setProperty('--spot-x', '50%');
        element.style.setProperty('--spot-y', '50%');
      }
      element.addEventListener('pointermove', move, { passive: true });
      element.addEventListener('pointerleave', reset, { passive: true });
      addCleanup(function () {
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', reset);
        element.style.removeProperty('--spot-x');
        element.style.removeProperty('--spot-y');
      });
    });
  }

  /* Touch feedback for cards. Coarse pointers never hover, so a delegated
     touchstart/touchend pair mirrors the hover highlight for the pressed card
     only. Two passive document listeners, no scroll work, reduced-motion safe
     (CSS strips the geometry when motion is reduced). */
  function setupTouchFeedback() {
    if (finePointer.matches || !window.matchMedia('(pointer: coarse)').matches) return;
    var selector = '.card, .blog-card, .location-card, .gallery-item, .qh-card';
    var pressed = null;
    function release() {
      if (pressed) pressed.classList.remove('is-pressed');
      pressed = null;
    }
    function start(event) {
      var element = event.target;
      var card = element && element.closest ? element.closest(selector) : null;
      if (!card || card.classList.contains('gallery-item--pending')) return;
      release();
      pressed = card;
      card.classList.add('is-pressed');
    }
    document.addEventListener('touchstart', start, { passive: true });
    document.addEventListener('touchend', release, { passive: true });
    document.addEventListener('touchcancel', release, { passive: true });
    addCleanup(function () {
      release();
      document.removeEventListener('touchstart', start);
      document.removeEventListener('touchend', release);
      document.removeEventListener('touchcancel', release);
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
        button.style.setProperty('--pointer-x', (((event.clientX - rect.left) / rect.width) * 100).toFixed(1) + '%');
        button.style.setProperty('--pointer-y', (((event.clientY - rect.top) / rect.height) * 100).toFixed(1) + '%');
        if (!frame) frame = window.requestAnimationFrame(apply);
      }
      function reset() {
        x = 0;
        y = 0;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        button.style.setProperty('--magnetic-x', '0px');
        button.style.setProperty('--magnetic-y', '0px');
        button.style.setProperty('--pointer-x', '50%');
        button.style.setProperty('--pointer-y', '50%');
      }
      button.addEventListener('pointermove', move, { passive: true });
      button.addEventListener('pointerleave', reset, { passive: true });
      button.addEventListener('blur', reset);
      addCleanup(function () {
        button.removeEventListener('pointermove', move);
        button.removeEventListener('pointerleave', reset);
        button.removeEventListener('blur', reset);
        button.style.removeProperty('--pointer-x');
        button.style.removeProperty('--pointer-y');
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
      if (root.classList.contains('is-leaving')) return;
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
      window.setTimeout(function () { window.location.assign(url.href); }, 300);
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
    setupSplitHeadings();
    setupReveals();
    if (!reducedMotion.matches) root.classList.add('motion-ready');
    setupScrollProgress();
    setupHeroParallax();
    setupScrollLinkedMedia();
    setupSpotlight();
    setupTouchFeedback();
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
