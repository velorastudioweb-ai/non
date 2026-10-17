/* ==========================================================================
 QuantumHealth — main.js
 Nav,mobile menu,reveal-on-scroll,FAQ accordion,gallery lightbox,
 consultation form validation & submission states.
 Vanilla JS,no dependencies. Progressive enhancement only.
 ========================================================================== */
(function (){
 'use strict';
 var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var $ = function (s,c){ return (c || document).querySelector(s); };
 var $$ = function (s,c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
 /* ---------------- Header scroll state ---------------- */
 var header = $('.site-header');
 if (header){
 var onScroll = function (){
 if (window.scrollY > 24) header.classList.add('is-scrolled');
 else header.classList.remove('is-scrolled');
 };
 onScroll();
 window.addEventListener('scroll',onScroll,{ passive: true });
 }
 /* ---------------- Mobile navigation ---------------- */
 var toggle = $('.nav-toggle');
 var drawer = $('#mobile-nav');
 var lastFocused = null;
 function focusables(){
  return $$('a[href], button:not([disabled])', drawer).filter(function (el){
  return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
  });
 }
 function openNav(){
  if (!drawer || !toggle) return;
  lastFocused = document.activeElement;
  drawer.removeAttribute('inert');
  drawer.removeAttribute('aria-hidden');
  drawer.classList.add('is-open');
  toggle.setAttribute('aria-expanded','true');
  document.body.classList.add('nav-open');
  var first = focusables()[0];
  if (first) first.focus(); else toggle.focus();
  /* visibility may lag one frame on some engines — re-assert focus */
  requestAnimationFrame(function (){
  if (!drawer.contains(document.activeElement)){
   var again = focusables()[0];
   if (again) again.focus();
  }
  });
 }
 function closeNav(returnFocus){
  if (!drawer || !toggle) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('inert','');
  drawer.setAttribute('aria-hidden','true');
  toggle.setAttribute('aria-expanded','false');
  document.body.classList.remove('nav-open');
  if (returnFocus && lastFocused && lastFocused.focus) lastFocused.focus();
 }
 if (toggle && drawer){
  drawer.setAttribute('inert','');
  drawer.setAttribute('aria-hidden','true');
  toggle.addEventListener('click',function (){
  if (drawer.classList.contains('is-open')) closeNav(true); else openNav();
  });
  $$('a',drawer).forEach(function (a){
  a.addEventListener('click',function (){ closeNav(false); });
  });
  document.addEventListener('keydown',function (e){
  if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeNav(true);
  });
  /* focus trap: Tab cycles inside the open drawer */
  drawer.addEventListener('keydown',function (e){
  if (e.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
  var f = focusables();
  if (!f.length) return;
  var first = f[0],last = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))){
   e.preventDefault(); last.focus();
  }else if (!e.shiftKey && document.activeElement === last){
   e.preventDefault(); first.focus();
  }
  });
  /* close the drawer if the layout crosses into desktop nav */
  var desktop = window.matchMedia('(min-width: 1024px)');
  var onDesktop = function (e){ if (e.matches) closeNav(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
  else if (desktop.addListener) desktop.addListener(onDesktop);
  window.addEventListener('resize',function (){
  if (desktop.matches && drawer.classList.contains('is-open')) closeNav(false);
  });
  }
/* ---------------- Reveal on scroll ---------------- */
var revealEls = $$('.reveal');
if (revealEls.length){
  var showInView = function (){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach(function (el){
      if (el.classList.contains('is-in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.96 && r.bottom > -50) el.classList.add('is-in');
    });
  };
  if (prefersReduced || !('IntersectionObserver' in window)){
    revealEls.forEach(function (el){ el.classList.add('is-in'); });
  }else{
    var io = new IntersectionObserver(function (entries){
      entries.forEach(function (en){
        if (en.isIntersecting){ en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    },{ rootMargin: '0px 0px -8% 0px',threshold: 0.12 });
    revealEls.forEach(function (el){ io.observe(el); });
    /* failsafe: nothing above the fold may stay hidden */
    showInView();
    window.addEventListener('load', showInView);
    setTimeout(showInView, 2500);
  }
}
 /* ---------------- FAQ accordion ---------------- */
 $$('.faq__item').forEach(function (item){
 var btn = $('.faq__q',item);
 var panel = $('.faq__a',item);
 if (!btn || !panel) return;
 var id = btn.getAttribute('aria-controls');
 btn.addEventListener('click',function (){
 var open = item.classList.toggle('is-open');
 btn.setAttribute('aria-expanded',open ? 'true' : 'false');
 panel.style.height = open ? panel.scrollHeight + 'px' : '0px';
 if (open){
 // allow sibling collapse for a tidy single-open accordion
 $$('.faq__item',item.parentNode).forEach(function (sib){
 if (sib !== item && sib.classList.contains('is-open')){
 sib.classList.remove('is-open');
 var sbtn = $('.faq__q',sib),span = $('.faq__a',sib);
 if (sbtn) sbtn.setAttribute('aria-expanded','false');
 if (span) span.style.height = '0px';
 }
 });
 }
 });
 });
 window.addEventListener('resize',function (){
 $$('.faq__item.is-open .faq__a').forEach(function (p){ p.style.height = p.scrollHeight + 'px'; });
 });
 /* ---------------- Gallery lightbox ---------------- */
 var galleryItems = $$('[data-lightbox]');
 if (galleryItems.length){
 var lb = document.createElement('div');
 lb.className = 'lightbox';
 lb.setAttribute('role','dialog');
 lb.setAttribute('aria-modal','true');
 lb.setAttribute('aria-label','Image viewer');
 lb.innerHTML =
 '<button class="lightbox__close" type="button" aria-label="Close image viewer">&times;</button>' +
 '<button class="lightbox__btn lightbox__btn--prev" type="button" aria-label="Previous image">&#8249;</button>' +
 '<button class="lightbox__btn lightbox__btn--next" type="button" aria-label="Next image">&#8250;</button>' +
 '<div><img class="lightbox__img" alt=""><p class="lightbox__cap"></p></div>' +
 '<p class="lightbox__count" aria-live="polite"></p>';
 document.body.appendChild(lb);
 var lbImg = $('.lightbox__img',lb);
 var lbCap = $('.lightbox__cap',lb);
 var lbCount = $('.lightbox__count',lb);
 var idx = 0;
 var opener = null;
 function render(){
 var item = galleryItems[idx];
 var full = item.getAttribute('data-full') || ($('img',item) && $('img',item).src) || '';
 var cap = item.getAttribute('data-caption') || '';
 if (full){
 lbImg.style.display = '';
 lbImg.src = full;
 lbImg.alt = ($('img',item) && $('img',item).alt) || cap;
 }else{
 lbImg.style.display = 'none';
 lbImg.removeAttribute('src');
 lbImg.alt = '';
 }
 lbCap.textContent = cap + (full ? '' : ' — not yet published');
 lbCount.textContent = (idx + 1) + ' / ' + galleryItems.length;
 }
 function open(i){
 idx = i; opener = document.activeElement;
 render(); lb.classList.add('is-open');
 document.body.style.overflow = 'hidden';
 $('.lightbox__close',lb).focus();
 }
 function close(){
 lb.classList.remove('is-open');
 document.body.style.overflow = '';
 if (opener) opener.focus();
 }
 function step(d){ idx = (idx + d + galleryItems.length) % galleryItems.length; render(); }
 galleryItems.forEach(function (item,i){
 item.addEventListener('click',function (e){ e.preventDefault(); open(i); });
 item.addEventListener('keydown',function (e){
 if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(i); }
 });
 });
 $('.lightbox__close',lb).addEventListener('click',close);
 $('.lightbox__btn--prev',lb).addEventListener('click',function (){ step(-1); });
 $('.lightbox__btn--next',lb).addEventListener('click',function (){ step(1); });
 lb.addEventListener('click',function (e){ if (e.target === lb) close(); });
 document.addEventListener('keydown',function (e){
 if (!lb.classList.contains('is-open')) return;
 if (e.key === 'Escape') close();
 else if (e.key === 'ArrowRight') step(1);
 else if (e.key === 'ArrowLeft') step(-1);
 });
 }
 /* ---------------- Consultation form ---------------- */
 var form = $('[data-consult-form]');
 if (form){
 var status = $('[data-status]',form);
 var submitBtn = $('[type="submit"]',form);
 var endpoint = form.getAttribute('data-endpoint') || '';
 var validators = {
 name: function (v){ return v.trim().length >= 2 || 'Please enter your full name.'; },
 email: function (v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.'; },
 phone: function (v){ return v.trim() === '' || v.replace(/[^\d]/g,'').length >= 7 || 'Please enter a valid phone number.'; },
 interest: function (v){ return v !== '' || 'Please choose an area of interest.'; },
 consent: function (v){ return v === true || v === 'on' || 'Please confirm you agree to be contacted.'; }
 };
 function fieldWrap(input){ return input.closest('.field') || input.closest('.checkbox'); }
 function showError(input,msg){
 var w = fieldWrap(input); if (!w) return;
 w.classList.add('field--error');
 var e = $('.field__error',w); if (e) e.textContent = msg;
 input.setAttribute('aria-invalid','true');
 }
 function clearError(input){
 var w = fieldWrap(input); if (!w) return;
 w.classList.remove('field--error');
 var e = $('.field__error',w); if (e) e.textContent = '';
 input.removeAttribute('aria-invalid');
 }
 function validateField(input){
 var rule = validators[input.name]; if (!rule) return true;
 var val = input.type === 'checkbox' ? input.checked : input.value;
 var res = rule(val);
 if (res !== true){ showError(input,res); return false; }
 clearError(input); return true;
 }
 $$('input,select,textarea',form).forEach(function (input){
 if (!validators[input.name]) return;
 input.addEventListener('blur',function (){ validateField(input); });
 input.addEventListener('input',function (){ if (fieldWrap(input).classList.contains('field--error')) validateField(input); });
 input.addEventListener('change',function (){ validateField(input); });
 });
 function setStatus(type,msg){
 if (!status) return;
 status.textContent = msg;
 status.className = 'form__status is-visible form__status--' + (type === 'ok' ? 'ok' : 'err');
 }
 form.addEventListener('submit',function (e){
 e.preventDefault();
 var valid = true,firstBad = null;
 $$('input,select,textarea',form).forEach(function (input){
 if (!validators[input.name]) return;
 if (!validateField(input)){ valid = false; if (!firstBad) firstBad = input; }
 });
 if (!valid){ if (firstBad) firstBad.focus(); setStatus('err','Please correct the highlighted fields and try again.'); return; }
 // Honeypot spam trap
 var hp = $('[name="company_website"]',form);
 if (hp && hp.value.trim() !== ''){ setStatus('ok','Thank you — your enquiry has been received.'); form.reset(); return; }
  if (!endpoint){
  // No delivery service configured — do NOT fake success.
  setStatus('err',
  'Thank you. This enquiry form is still being finalised,so your message has not been sent yet. ' +
  'Please contact the clinic directly by phone or email and the team will assist you.');
  return;
  }
 var data = new FormData(form);
 var original = submitBtn.innerHTML;
 submitBtn.classList.add('is-loading');
 submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span><span class="btn__label">Sending…</span>';
 fetch(endpoint,{ method: 'POST',body: data,headers: { Accept: 'application/json' } })
 .then(function (r){ return r.ok ? r : Promise.reject(r.status); })
 .then(function (){
 setStatus('ok','Thank you — your consultation request has been received. The clinic team will respond using your preferred contact method.');
 form.reset();
 })
 .catch(function (){
 setStatus('err','We could not send your request right now. Please try again,or contact the clinic directly by phone or email.');
 })
 .then(function (){
 submitBtn.classList.remove('is-loading');
 submitBtn.innerHTML = original;
 });
 });
 }
  /* ---------------- Footer year ---------------- */
  $$('[data-year]').forEach(function (el){ el.textContent = String(new Date().getFullYear()); });
})();
