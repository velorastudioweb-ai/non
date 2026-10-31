/* ==========================================================================
 QuantumHealth — main.js
 Nav,mobile menu,FAQ accordion,gallery lightbox,
 consultation form validation & submission states.
 Vanilla JS,no dependencies. Progressive enhancement only.
 ========================================================================== */
(function (){
 'use strict';
 var $ = function (s,c){ return (c || document).querySelector(s); };
 var $$ = function (s,c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
 /* Keep the initial loading screen brief: the document is usable as soon as
    its DOM is ready, so it must not wait for below-the-fold images. */
 var preLoader = $('.pre-loader');
 if (preLoader) {
  var hidePreLoader = function (){ preLoader.setAttribute('aria-hidden','true'); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hidePreLoader, { once: true });
  else window.requestAnimationFrame(hidePreLoader);
 }
 // Incoming source-library links reveal their collapsed collection.
 function revealSourceHash(){
  var id;
  try { id = decodeURIComponent(window.location.hash.slice(1)); } catch (e) { return; }
  if (!id) return;
  var target = document.getElementById(id);
  if (!target) return;
  var parent = target.closest('details');
  if (parent) parent.open = true;
  if (target.classList.contains('source-group')) {
   var details = target.querySelector('details');
   if (details) details.open = true;
  }
  // Jump directly to an opened source collection. Smooth traversal across the
  // research archive can trigger intermediate lazy content and miss its target.
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
 }
 revealSourceHash();
 window.addEventListener('hashchange', revealSourceHash);
 /* ---------------- Topic dropdowns ---------------- */
 (function initTopicMenus(){
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var items = nav.querySelectorAll('.nav__item--has-menu');
  function closeAll(except){
   items.forEach(function (item){
    if (item === except) return;
    item.classList.remove('is-open');
    var btn = item.querySelector('.nav__dropdown-toggle');
    if (btn) btn.setAttribute('aria-expanded','false');
   });
  }
  items.forEach(function (item){
   var toggle = item.querySelector('.nav__dropdown-toggle');
   var menu = item.querySelector('.nav__menu');
   if (!toggle || !menu) return;
   toggle.addEventListener('click',function (e){
    e.preventDefault();
    var open = !item.classList.contains('is-open');
    closeAll(open ? item : null);
    item.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
   });
   item.addEventListener('keydown',function (e){
    if (e.key === 'Escape') { item.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); toggle.focus(); }
   });
  });
  document.addEventListener('click',function (e){ if (!nav.contains(e.target)) closeAll(null); });
  document.addEventListener('keydown',function (e){ if (e.key === 'Escape') closeAll(null); });
 })();
 /* ---------------- Header scroll state ---------------- */
 var header = $('.site-header');
 if (header){
  var wasScrolled = false;
  var setHeaderScrolled = function (scrolled){
   if (scrolled === wasScrolled) return;
   wasScrolled = scrolled;
   header.classList.toggle('is-scrolled', scrolled);
  };
  if ('IntersectionObserver' in window){
   var marker = document.createElement('span');
   marker.setAttribute('aria-hidden','true');
   marker.style.cssText = 'position:absolute;top:40px;left:0;width:1px;height:1px;pointer-events:none';
   document.body.appendChild(marker);
   var headerObserver = new IntersectionObserver(function (entries){
    var entry = entries[0];
    setHeaderScrolled(!entry.isIntersecting && entry.boundingClientRect.top < 0);
   });
   headerObserver.observe(marker);
  }else{
   var onScroll = function (){ setHeaderScrolled(window.scrollY > 40); };
   window.addEventListener('scroll',onScroll,{ passive: true });
   window.addEventListener('pageshow',onScroll);
  }
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
  /* ---------------- Blog search and category filters ---------------- */
  var blogHub = $('.blog-hub');
  if (blogHub){
  var blogSearch = $('#blog-search',blogHub);
  var blogResults = $('#blog-results',blogHub);
  var blogCards = $$('.blog-card',blogHub);
  var blogFilters = $$('[data-blog-filter]',blogHub);
  var activeBlogFilter = 'All Articles';
  function blogPlural(count){ return count === 1 ? 'article' : 'articles'; }
  function applyBlogFilter(){
  var query = blogSearch ? blogSearch.value.trim().toLowerCase() : '';
  var visible = 0;
  blogCards.forEach(function (card){
  var category = card.getAttribute('data-category') || '';
  var searchable = card.getAttribute('data-search') || '';
  var matchesCategory = activeBlogFilter === 'All Articles' || category === activeBlogFilter;
  var matchesSearch = !query || searchable.indexOf(query) !== -1;
  var show = matchesCategory && matchesSearch;
  card.hidden = !show;
  if (show) visible += 1;
  });
  if (blogResults) blogResults.textContent = visible + ' ' + blogPlural(visible) + (query || activeBlogFilter !== 'All Articles' ? ' matching your filters' : '');
  }
  blogFilters.forEach(function (button){
  button.addEventListener('click',function (){
  activeBlogFilter = button.getAttribute('data-blog-filter') || 'All Articles';
  blogFilters.forEach(function (item){ item.setAttribute('aria-pressed',item === button ? 'true' : 'false'); });
  applyBlogFilter();
  });
  });
  if (blogSearch) blogSearch.addEventListener('input',applyBlogFilter);
  applyBlogFilter();
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
  country_code: function (v){ return v !== '' || 'Please choose your country calling code.'; },
  phone: function (v){
   var digits = v.replace(/[^\d]/g,'').length;
   var code = $('[name="country_code"]',form);
   var fullDigits = ((code ? code.value : '') + v).replace(/[^\d]/g,'').length;
   return (digits >= 7 && digits <= 15 && fullDigits <= 15) || 'Please enter a valid mobile number for the selected country code.';
  },
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
 status.className = 'form__status is-visible form__status--' + (type === 'ok' || type === 'pending' ? type : 'err');
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
   'This message form is not connected yet, so your enquiry has not been sent. ' +
   'Please email enquiries@nonsurgicalbreastenlargement.in instead.');
  return;
  }
 var payload = {
  name: $('#cf-name',form) ? $('#cf-name',form).value : '',
  email: $('#cf-email',form) ? $('#cf-email',form).value : '',
  country_code: $('[name="country_code"]',form) ? $('[name="country_code"]',form).value : '',
  phone: $('#cf-phone',form) ? $('#cf-phone',form).value : '',
  interest: $('#cf-interest',form) ? $('#cf-interest',form).value : '',
  contact_method: $('[name="contact_method"]:checked',form) ? $('[name="contact_method"]:checked',form).value : '',
  message: $('#cf-message',form) ? $('#cf-message',form).value : '',
  consent: $('#cf-consent',form) ? $('#cf-consent',form).checked : false,
  company_website: hp ? hp.value : ''
 };
 var original = submitBtn.innerHTML;
 submitBtn.classList.add('is-loading');
 submitBtn.disabled = true;
 submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span><span class="btn__label">Sending…</span>';
 setStatus('pending','Sending your enquiry…');
 fetch(endpoint,{
  method: 'POST',
  body: JSON.stringify(payload),
  headers: { 'Content-Type': 'application/json',Accept: 'application/json' }
 })
 .then(function (r){
  return r.json().catch(function (){ return {}; }).then(function (body){
   return { ok: r.ok,status: r.status,body: body };
  });
 })
 .then(function (result){
  if (!result.ok){
   var message = result.body && result.body.message;
   if (result.status === 422 && result.body && result.body.errors){
    Object.keys(result.body.errors).forEach(function (field){
     var input = $('[name="' + field + '"]',form);
     if (input) showError(input,result.body.errors[field]);
    });
    var first = $('.field--error input, .field--error select, .field--error textarea',form);
    if (first) first.focus();
   }
   setStatus('err',message || 'We could not send your enquiry right now. Please try again or email enquiries@nonsurgicalbreastenlargement.in.');
   return;
  }
  var preferredContact = $('[name="contact_method"]:checked',form);
  setStatus('ok','Thank you — your website enquiry has been received. We will follow up by ' + (preferredContact ? preferredContact.value.toLowerCase() : 'your selected contact method') + '.');
 form.reset();
 })
 .catch(function (){
  setStatus('err','We could not send your enquiry right now. Please try again or email enquiries@nonsurgicalbreastenlargement.in.');
 })
 .then(function (){
 submitBtn.classList.remove('is-loading');
 submitBtn.disabled = false;
 submitBtn.innerHTML = original;
 });
 });
 }
  /* ---------------- Footer year ---------------- */
  $$('[data-year]').forEach(function (el){ el.textContent = String(new Date().getFullYear()); });
})();
