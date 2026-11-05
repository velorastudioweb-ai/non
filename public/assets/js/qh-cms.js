'use strict';
/* Quantum Health CMS — public runtime overlay.
 * Applies the published content overlay (text, images, links, section
 * visibility/reorder, new sections, site nav/footer/theme/contacts/locations)
 * on top of the server-rendered HTML, so published edits appear without a
 * redeploy while the pre-rendered document keeps its full SEO payload.
 * Draft preview and editor bridging activate only when ?qh_edit=1 and the
 * request is authenticated by the CMS session cookie. */
(function () {
  if (/^\/(admin|api)\b/.test(location.pathname)) return;

  var EDIT = /[?&]qh_edit=1/.test(location.search);
  var WA_DEFAULT = 'Hello Quantum Health, I would like to know more about your treatments and consultation availability.';

  /* ---------- sanitization (mirror of the server allowlist) ---------- */
  var ALLOW = { P: 1, BR: 1, B: 1, I: 1, EM: 1, STRONG: 1, U: 1, A: 1, H2: 1, H3: 1, H4: 1, H5: 1, UL: 1, OL: 1, LI: 1, SPAN: 1, DIV: 1, SECTION: 1, ARTICLE: 1, FIGURE: 1, FIGCAPTION: 1, IMG: 1, TABLE: 1, THEAD: 1, TBODY: 1, TR: 1, TH: 1, TD: 1, BLOCKQUOTE: 1, ADDRESS: 1 };
  var ATTRS = { A: ['href', 'title'], IMG: ['src', 'alt', 'width', 'height', 'class'] };
  function safeUrl(u) { u = String(u || '').trim(); return /^(https?:|mailto:|tel:|\/|#|data:image\/)/i.test(u) && !/javascript:/i.test(u) ? u : '#'; }
  function sanitize(node) {
    var kids = Array.prototype.slice.call(node.childNodes);
    kids.forEach(function (child) {
      if (child.nodeType === 8) { child.remove(); return; } // comments
      if (child.nodeType !== 1) return;
      var tag = child.tagName;
      if (!ALLOW[tag]) {
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'IFRAME' || tag === 'OBJECT' || tag === 'EMBED') { child.remove(); return; }
        var frag = document.createDocumentFragment();
        while (child.firstChild) frag.appendChild(child.firstChild);
        child.replaceWith(frag);
        Array.prototype.slice.call(frag.childNodes).forEach(function (n) { if (n.nodeType === 1) sanitize(n); });
        return;
      }
      Array.prototype.slice.call(child.attributes).forEach(function (a) {
        var allow = ATTRS[tag] || [];
        if (a.name === 'class' || a.name === 'id' || (tag === 'A' && a.name === 'target') || (tag === 'IMG' && ['loading', 'decoding'].indexOf(a.name) > -1)) {
          if (a.name === 'id') { child.removeAttribute(a.name); return; }
          return;
        }
        if (allow.indexOf(a.name) === -1) { child.removeAttribute(a.name); return; }
        if (a.name === 'href' || a.name === 'src') child.setAttribute(a.name, safeUrl(a.value));
      });
      if (tag === 'A' && child.getAttribute('target') === '_blank') child.setAttribute('rel', 'noopener');
      sanitize(child);
    });
  }
  function cleanHtml(html) {
    var doc = document.implementation.createHTMLDocument('s');
    var box = doc.createElement('div');
    box.innerHTML = String(html || '');
    var out = document.createElement('div');
    Array.prototype.slice.call(box.childNodes).forEach(function (n) { out.appendChild(n.cloneNode(true)); });
    sanitize(out);
    return out.innerHTML;
  }

  /* ---------- element identification ---------- */
  var FIELD_SELECT = 'h1,h2,h3,h4,h5,p,li,figcaption,blockquote,a[href],img';
  var sections = []; // {el, sid, fields:[{el,fid,type}]}
  function indexMain(done) {
    var main = document.getElementById('main');
    if (!main) { if (done) done(); return; }
    sections = [];
    var kids = Array.prototype.slice.call(main.children).filter(function (el) { return el.nodeType === 1 && !el.hasAttribute('data-qh-added'); });
    var i = 0;
    var BATCH = 8;
    function nextBatch() {
      var end = Math.min(kids.length, i + BATCH);
      for (; i < end; i++) {
        var el = kids[i];
        var sid = 's' + i;
        el.setAttribute('data-qh-s', sid);
        var fields = [];
        var nodes = el.querySelectorAll(FIELD_SELECT);
        Array.prototype.slice.call(nodes).forEach(function (n) {
          if (n.closest('[hidden]') && !EDIT) { /* still index hidden */ }
          var tag = n.tagName;
          var fid = 'f' + fields.length;
          n.setAttribute('data-qh-f', sid + '.' + fid);
          fields.push({ el: n, fid: fid, type: tag === 'IMG' ? 'img' : (tag === 'A' ? 'link' : 'text') });
        });
        sections.push({ el: el, sid: sid, fields: fields });
      }
      if (i < kids.length) {
        window.requestAnimationFrame(nextBatch);
      } else if (done) {
        window.requestAnimationFrame(done);
      }
    }
    nextBatch();
  }
  function sectionByName(sid) { for (var i = 0; i < sections.length; i++) if (sections[i].sid === sid) return sections[i]; return null; }
  function fieldOf(sec, fid) { for (var i = 0; i < sec.fields.length; i++) if (sec.fields[i].fid === fid) return sec.fields[i]; return null; }

  var RES_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536, 1920, 2048];
  function applyImg(f, val) {
    var img = f.el;
    if (val.src) {
      img.setAttribute('src', safeUrl(val.src));
      img.removeAttribute('srcset');
    } else if (val.srcBase) {
      var base = String(val.srcBase);
      var natural = Number(val.width) || 1600;
      var urls = RES_WIDTHS.filter(function (w) { return w <= natural; }).map(function (w) { return base + w + '.webp'; });
      if (!urls.length) urls = [base + natural + '.webp'];
      if (urls[urls.length - 1] !== img.getAttribute('src')) img.setAttribute('src', urls[urls.length - 1]);
      img.setAttribute('srcset', urls.map(function (u, i) { return u + ' ' + RES_WIDTHS.filter(function (w) { return w <= natural; })[i] + 'w'; }).join(', '));
    }
    if (val.alt != null) img.setAttribute('alt', String(val.alt));
    if (val.width) img.setAttribute('width', String(val.width));
    if (val.height) img.setAttribute('height', String(val.height));
    if (val.hidden) { hideImg(img); }
  }
  function hideImg(img) {
    var p = img.closest('picture');
    var target = p || img;
    var wrap = target.parentElement && target.parentElement.tagName === 'DIV' && !target.parentElement.textContent.trim() ? target.parentElement : target;
    wrap.setAttribute('hidden', '');
  }
  function applyField(f, val) {
    if (!val) return;
    var el = f.el;
    if (val.hidden) { el.setAttribute('hidden', ''); return; }
    if (f.type === 'img') { applyImg(f, val); return; }
    if (val.href != null && f.type === 'link') el.setAttribute('href', safeUrl(val.href));
    if (val.html != null) el.innerHTML = cleanHtml(val.html);
    else if (val.text != null) el.textContent = String(val.text);
    var st = val.style || {};
    if (st.color) el.style.color = st.color;
    if (st.align) el.style.textAlign = st.align;
    if (st.bold) el.style.fontWeight = '700';
  }
  function applyOverlay(doc) {
    if (!doc) return;
    var main = document.getElementById('main');
    if (!main) return;
    if (doc.seo && doc.seo.title) document.title = doc.seo.title;
    var secs = doc.sections || {};
    sections.forEach(function (sec) {
      var d = secs[sec.sid];
      if (!d) return;
      if (d.hidden) { sec.el.setAttribute('hidden', ''); return; }
      if (d.html) sec.el.innerHTML = cleanHtml(d.html);
      if (d.bg) sec.el.style.background = d.bg;
      if (d.align) sec.el.style.textAlign = d.align;
      if (d.spacing) sec.el.style.padding = d.spacing === 'tight' ? '2rem 0' : (d.spacing === 'relaxed' ? '6rem 0' : '');
      var fields = d.fields || {};
      sec.fields.forEach(function (f) { applyField(f, fields[f.fid]); });
    });
    if (Array.isArray(doc.order) && doc.order.length) {
      doc.order.forEach(function (sid) { var s = sectionByName(sid); if (s) main.appendChild(s.el); });
    }
    (doc.added || []).forEach(function (a) {
      var wrap = document.createElement('div');
      wrap.innerHTML = cleanHtml(a.html);
      Array.prototype.slice.call(wrap.children).forEach(function (el) {
        el.setAttribute('data-qh-added', a.id);
        main.appendChild(el);
        Array.prototype.slice.call(el.querySelectorAll('.reveal')).forEach(function (n) { n.classList.remove('reveal', 'reveal--card', 'reveal--up', 'reveal--left', 'reveal--right', 'reveal--heading', 'reveal--image'); });
      });
    });
    if (doc.doctorsGrid && doc.doctorsGrid.html) {
      var host = null;
      Array.prototype.slice.call(main.querySelectorAll('section')).some(function (s) {
        var h2 = s.querySelector('h2');
        if (h2 && /^doctors\b/i.test(h2.textContent.trim()) && s.querySelector('.qh-grid')) { host = s.querySelector('.qh-grid'); return true; }
        return false;
      });
      if (host) host.innerHTML = cleanHtml(doc.doctorsGrid.html);
    }
  }

  /* ---------- site settings: theme, nav, footer, contacts, locations ---------- */
  function waUrl(num, msg) { return 'https://wa.me/' + String(num).replace(/[^\d]/g, '') + '?text=' + encodeURIComponent(msg || WA_DEFAULT); }
  function applyTheme(site) {
    var t = site && site.theme;
    if (!t) return;
    var old = document.getElementById('qh-theme');
    if (old) old.remove();
    var c = t.colors || {};
    var css = ':root{';
    if (c.navGold) css += '--nav-gold:' + c.navGold + ';';
    if (c.navGoldLight) css += '--nav-gold-light:' + c.navGoldLight + ';';
    if (c.navGoldDark) css += '--nav-gold-dark:' + c.navGoldDark + ';';
    if (c.bg) css += '--qh-bg:' + c.bg + ';--dark:' + c.bg + ';';
    if (c.burgundy) css += '--qh-burgundy:' + c.burgundy + ';--burgundy:' + c.burgundy + ';';
    if (c.card) css += '--qh-card:' + c.card + ';--burgundy-darker:' + c.card + ';';
    if (c.heading) css += '--qh-heading:' + c.heading + ';';
    if (c.gold) css += '--gold:' + c.gold + ';';
    css += '}';
    if (t.goldNav === false) css += '.nav__link:hover,.nav__link[aria-current="page"]{color:var(--rose-light);text-shadow:none}.nav__link::after{background:var(--rose);box-shadow:none}.btn--header:hover{border-color:var(--rose-light);color:var(--rose-light);box-shadow:none;text-shadow:none}.mobile-nav__link:hover,.mobile-nav__link[aria-current="page"]{color:var(--rose-light);text-shadow:none}';
    if (t.animation === 'off') css += '*,*::before,*::after{animation:none!important;transition:none!important}';
    if (t.animation === 'reduced') css += '.reveal{opacity:1!important;transform:none!important}';
    var st = document.createElement('style');
    st.id = 'qh-theme';
    st.textContent = css;
    document.head.appendChild(st);
  }
  function applyNav(site) {
    if (!site || !Array.isArray(site.nav)) return;
    var msg = site.settings && site.settings.whatsappPrefill;
    // Desktop + mobile lists: modify the generated items in place by href match.
    function tune(scope, sel) {
      var items = Array.prototype.slice.call(scope.querySelectorAll(sel));
      if (!items.length) return;
      var byHref = {};
      items.forEach(function (li) { var a = li.querySelector('a'); if (a) byHref[a.getAttribute('href')] = li; });
      var ordered = [];
      site.nav.forEach(function (n) {
        if (n.hidden) return;
        var li = byHref[n.href];
        if (!li) return;
        ordered.push(li);
        var links = li.querySelectorAll('a');
        if (links.length && n.label) links[0].textContent = n.label;
        links[0] && links[0].setAttribute('href', safeUrl(n.href));
        var ov = li.querySelector('.nav__overview'); if (ov) ov.setAttribute('href', safeUrl(n.href));
        var kids = (li.querySelectorAll('.nav__menu ul li a, .mobile-nav__topics a') || []);
        if (n.children && n.children.length) kids.forEach(function (k, i) { if (n.children[i]) { if (n.children[i].label) k.textContent = n.children[i].label; k.setAttribute('href', safeUrl(n.children[i].href)); } });
      });
      var list = items[0].parentElement;
      if (ordered.length === items.length && list) ordered.forEach(function (li) { list.appendChild(li); });
    }
    tune(document.querySelector('.nav'), '.nav__list > li');
    tune(document.getElementById('mobile-nav') || document, '.mobile-nav__list > li');
    // Header/footer CTA label
    var cta = site.settings && site.settings.headerCta;
    var hb = document.querySelector('.btn--header');
    if (cta && cta.label && hb) { var svg = hb.querySelector('svg'); hb.textContent = cta.label + ' '; if (svg) hb.appendChild(svg); if (cta.href) hb.setAttribute('href', safeUrl(cta.href)); }
    // Brand name
    if (site.settings && site.settings.siteName) {
      document.querySelectorAll('.brand__name').forEach(function (n) { n.textContent = site.settings.siteName; });
    }
    // WhatsApp message prefill for generated wa.me links
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) {
      var m = a.getAttribute('href').match(/^https:\/\/wa\.me\/(\d+)/);
      if (m) a.setAttribute('href', waUrl(m[1], msg));
    });
  }
  function applyFooter(site) {
    if (!site || !site.footer) return;
    var f = site.footer;
    function fillLinks(colSelector, items) {
      var col = document.querySelector(colSelector);
      if (!col || !Array.isArray(items)) return;
      var ul = col.querySelector('ul');
      if (!ul) return;
      ul.innerHTML = items.map(function (x) { return '<li><a href="' + safeUrl(x.href) + '"' + (/^https?:/.test(x.href) ? ' target="_blank" rel="noopener"' : '') + '>' + escapeText(x.label) + '</a></li>'; }).join('');
    }
    if (f.blurb) { var bp = document.querySelector('.footer-brand > p'); if (bp) bp.textContent = f.blurb; }
    if (f.note != null) { var nt = document.querySelector('.footer-brand__note'); if (nt) nt.textContent = f.note; }
    var cols = Array.prototype.slice.call(document.querySelectorAll('.footer-col'));
    cols.forEach(function (col) {
      var h = col.querySelector('h3'); if (!h) return;
      var title = h.textContent.trim().toLowerCase();
      if (title === 'explore') fillFooterUl(col, f.explore);
      else if (title === 'contact' || title === 'get in touch') fillFooterUl(col, (site.footerContact || []).concat([
        site.contacts && site.contacts.email ? { label: site.contacts.email, href: 'mailto:' + site.contacts.email } : null
      ].filter(Boolean)));
      else if (title.indexOf('patient education') > -1) fillFooterUl(col, f.patient);
    });
    var legalBar = document.querySelector('.footer-legal');
    if (legalBar && Array.isArray(f.legal)) legalBar.innerHTML = f.legal.map(function (x) { return '<a href="' + safeUrl(x.href) + '">' + escapeText(x.label) + '</a>'; }).join('');
    var socWrap = document.querySelector('.footer-social');
    if (socWrap && Array.isArray(f.social)) socWrap.innerHTML = f.social.map(function (x) { return '<a href="' + safeUrl(x.href) + '" target="_blank" rel="noopener">' + escapeText(x.label) + '</a>'; }).join('');
  }
  function fillFooterUl(col, items) {
    var ul = col.querySelector('ul');
    if (!ul || !Array.isArray(items)) return;
    ul.innerHTML = items.map(function (x) { return '<li><a href="' + safeUrl(x.href) + '"' + (/^https?:/.test(x.href) ? ' target="_blank" rel="noopener"' : '') + '>' + escapeText(x.label) + '</a></li>'; }).join('');
  }
  function escapeText(s) { var d = document.createElement('div'); d.textContent = String(s == null ? '' : s); return d.innerHTML; }
  function applyContacts(site) {
    if (!site || !site.contacts) return;
    var c = site.contacts;
    var msg = site.settings && site.settings.whatsappPrefill;
    document.querySelectorAll('.mobile-nav__quick a, .mobile-quickbar a').forEach(function (a) {
      var h = a.getAttribute('href') || '';
      if (h.indexOf('tel:') === 0 && c.phoneTel) a.setAttribute('href', 'tel:' + c.phoneTel);
      if (h.indexOf('https://wa.me/') === 0 && c.whatsappNumber) a.setAttribute('href', waUrl(c.whatsappNumber, msg));
    });
    var footDetails = document.querySelector('.footer-contact-details');
    if (footDetails) {
      var lis = [];
      if (c.numbers && c.numbers.length) c.numbers.forEach(function (n) {
        lis.push('<li><a href="tel:' + n.tel + '">' + escapeText(n.display) + '</a>' + (n.whatsapp ? ' <a class="location-card__wa" href="' + waUrl(n.whatsapp, msg) + '" target="_blank" rel="noopener" aria-label="WhatsApp enquiry on ' + escapeText(n.display) + '"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M20.4 11.7a8.4 8.4 0 0 1-12.4 7.4L3.6 20.4l1.3-4.3a8.4 8.4 0 1 1 15.5-4.4Z"/><path d="M9 8.4h2l.8 2-1 .8a6 6 0 0 0 2.9 2.9l.8-1 2 .8v2a1 1 0 0 1-1 1 7.6 6.5 0 0 1-6.6-6.5 1 1 0 0 1 1-1Z"/></svg></a>' : '') + '</li>');
      });
      else {
        if (c.phoneTel) lis.push('<li><a href="tel:' + c.phoneTel + '">' + escapeText(c.phoneDisplay || c.phoneTel) + '</a></li>');
        if (c.whatsappNumber) lis.push('<li><a href="' + waUrl(c.whatsappNumber, msg) + '" target="_blank" rel="noopener">WhatsApp ' + escapeText(c.whatsappDisplay || '') + '</a></li>');
      }
      if (c.email) lis.push('<li><a href="mailto:' + escapeText(c.email) + '">' + escapeText(c.email) + '</a></li>');
      footDetails.innerHTML = lis.join('');
    }
  }
  function applyLocations(site) {
    if (!site || !Array.isArray(site.locations) || !site.locations.length) return;
    var msg = site.settings && site.settings.whatsappPrefill;
    var seen = false;
    document.querySelectorAll('.location-grid').forEach(function (grid) {
      seen = true;
      grid.innerHTML = site.locations.map(function (l, i) { return locationCard(l, i, site, msg); }).join('');
    });
    if (seen) { /* cards render fully visible; reveal observers only bind authored markup */ }
  }
  function phoneAnchor(p, msg) {
    return '<li><a href="tel:' + p.tel + '">' + escapeText(p.display) + '</a>' + (p.whatsapp ? '<a class="location-card__wa" href="' + waUrl(p.whatsapp, msg) + '" target="_blank" rel="noopener" aria-label="WhatsApp enquiry on ' + escapeText(p.display) + '"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M20.4 11.7a8.4 8.4 0 0 1-12.4 7.4L3.6 20.4l1.3-4.3a8.4 8.4 0 1 1 15.5-4.4Z"/><path d="M9 8.4h2l.8 2-1 .8a6 6 0 0 0 2.9 2.9l.8-1 2 .8v2a1 1 0 0 1-1 1 7.6 7.6 0 0 1-6.6-6.5 1 1 0 0 1 1-1Z"/></svg><span class="sr-only">WhatsApp</span></a>' : '') + '</li>';
  }
  function locationCard(l, i, site, msg) {
    var addr = (l.addressLines || []).map(function (x) { return '<span>' + escapeText(x) + '</span>'; }).join('');
    var mapQ = l.mapQuery ? encodeURIComponent(l.mapQuery) : '';
    var email = l.email || (site.contacts && site.contacts.email);
    return '<article class="location-card" id="' + escapeText(l.id) + '">' +
      '<header class="location-card__head"><p class="location-card__role">' + escapeText(l.role || '') + '</p><h3>' + escapeText(l.name) + '</h3></header>' +
      (addr ? '<address class="location-card__address">' + addr + '</address>' : '<p class="location-card__address location-card__address--note">Telephone contact only.</p>') +
      (l.hours ? '<p class="location-card__hours">' + escapeText(l.hours) + '</p>' : '') +
      (l.image && l.image.src ? '<img class="location-card__image" src="' + safeUrl(l.image.src) + '" alt="' + escapeText(l.image.alt || l.name) + '" loading="lazy" decoding="async">' : '') +
      '<ul class="location-card__phones">' + (l.phones || []).map(function (p) { return phoneAnchor(p, msg); }).join('') + '</ul>' +
      (email ? '<p class="location-card__email"><a href="mailto:' + escapeText(email) + '">Email the team</a></p>' : '') +
      (l.note ? '<p class="location-card__note">' + escapeText(l.note) + '</p>' : '') +
      '<div class="location-card__actions"><a class="btn btn--primary" href="/contact/?branch=' + encodeURIComponent(l.id) + '#appointment">Appointment enquiry</a></div>' +
      (mapQ ? '<div class="location-card__maps"><a href="https://www.google.com/maps/search/?api=1&query=' + mapQ + '" target="_blank" rel="noopener">Open in Google Maps</a><a href="https://www.google.com/maps/dir/?api=1&destination=' + mapQ + '" target="_blank" rel="noopener">Directions</a></div>' : '') +
      '</article>';
  }
  function applySite(site) {
    if (!site) return;
    applyTheme(site);
    applyNav(site);
    applyFooter(site);
    applyContacts(site);
    applyLocations(site);
  }

  /* ---------- editor bridge ---------- */
  function activeOutline() {
    var st = document.createElement('style');
    st.id = 'qh-edit-style';
    st.textContent = '.qh-hover{outline:2px dashed #D4AF37!important;outline-offset:2px;cursor:pointer}.qh-active{outline:3px solid #D4AF37!important;outline-offset:2px}.reveal{opacity:1!important;transform:none!important}.pre-loader{display:none!important}';
    document.head.appendChild(st);
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('[data-qh-f],[data-qh-s]');
      clearHover();
      if (t) { t.classList.add('qh-hover'); t.setAttribute('data-qh-tab', ''); }
    });
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-qh-f]');
      if (!t) { t = e.target.closest('[data-qh-s]'); }
      if (!t) return;
      e.preventDefault();
      var info = t.getAttribute('data-qh-f') ? fieldInfo(t) : { sid: t.getAttribute('data-qh-s'), kind: 'section' };
      send({ type: 'qh:pick', info: info });
    }, true);
  }
  var lastHover = null;
  function clearHover() { document.querySelectorAll('.qh-hover').forEach(function (n) { n.classList.remove('qh-hover'); }); }
  function fieldInfo(el) {
    var sid = (el.getAttribute('data-qh-f') || '').split('.')[0];
    var fid = (el.getAttribute('data-qh-f') || '').split('.')[1];
    var out = { sid: sid, fid: fid, kind: 'field', tag: el.tagName };
    if (el.tagName === 'IMG') { out.src = el.getAttribute('src'); out.alt = el.getAttribute('alt'); out.width = el.getAttribute('width'); out.height = el.getAttribute('height'); }
    else if (el.tagName === 'A') { out.href = el.getAttribute('href'); out.text = el.textContent; }
    else { out.text = el.textContent; out.html = el.innerHTML; }
    return out;
  }
  function structure() {
    return sections.map(function (sec) {
      var h = sec.el.querySelector('h1,h2,h3');
      return {
        sid: sec.sid,
        name: (h ? h.textContent : sec.el.className || sec.el.tagName).slice(0, 70),
        tag: sec.el.tagName,
        hidden: sec.el.hasAttribute('hidden') || /s-hidden/.test(sec.el.className) || false,
        fields: sec.fields.map(function (f) {
          var o = { fid: f.fid, type: f.type, tag: f.el.tagName };
          if (f.type === 'img') { o.src = f.el.currentSrc || f.el.getAttribute('src'); o.alt = f.el.getAttribute('alt'); }
          else if (f.type === 'link') { o.text = f.el.textContent; o.href = f.el.getAttribute('href'); }
          else o.text = f.el.textContent.slice(0, 400);
          return o;
        })
      };
    });
  }
  function snapshotSection(sid) {
    var s = sectionByName(sid);
    if (!s) return null;
    var clone = s.el.cloneNode(true);
    clone.removeAttribute('data-qh-s');
    clone.querySelectorAll('[data-qh-s],[data-qh-f],[data-qh-added],[data-qh-tab]').forEach(function (n) { n.removeAttribute('data-qh-s'); n.removeAttribute('data-qh-f'); n.removeAttribute('data-qh-added'); n.removeAttribute('data-qh-tab'); });
    clone.classList.remove('qh-hover', 'qh-active');
    clone.querySelectorAll('script,style').forEach(function (n) { n.remove(); });
    return cleanHtml(clone.innerHTML);
  }
  function send(msg) { try { parent.postMessage(Object.assign({ from: 'qhpage' }, msg), '*'); } catch (e) {} }
  function applyPreview(doc) {
    // reset to the pristine server HTML, then apply the draft overlay
    var main = document.getElementById('main');
    if (PRISTINE_MAIN && main) main.innerHTML = PRISTINE_MAIN;
    if (PRISTINE_HEADER) document.querySelector('header.site-header').innerHTML = PRISTINE_HEADER;
    if (PRISTINE_FOOTER) document.querySelector('footer.site-footer').innerHTML = PRISTINE_FOOTER;
    if (PRISTINE_QUICK) { document.querySelectorAll('.mobile-nav__quick,.mobile-quickbar').forEach(function (n, i) { if (PRISTINE_QUICK[i]) n.outerHTML = PRISTINE_QUICK[i]; }); }
    indexMain();
    applyOverlay(doc);
    applySite(LAST_SITE);
    send({ type: 'qh:ready', structure: structure() });
  }
  var PRISTINE_MAIN = null, PRISTINE_HEADER = null, PRISTINE_FOOTER = null, PRISTINE_QUICK = null, LAST_SITE = null;

  window.addEventListener('message', function (ev) {
    var d = ev.data || {};
    if (d.from !== 'qhadmin') return;
    if (d.cmd === 'apply') applyPreview(d.doc);
    if (d.cmd === 'site') { LAST_SITE = d.site; applySite(d.site); send({ type: 'qh:site-applied' }); }
    if (d.cmd === 'structure') send({ type: 'qh:structure', structure: structure() });
    if (d.cmd === 'snapshot') send({ type: 'qh:snapshot', sid: d.sid, html: snapshotSection(d.sid) });
    if (d.cmd === 'setActive') { document.querySelectorAll('.qh-active').forEach(function (n) { n.classList.remove('qh-active'); }); var el = document.querySelector('[data-qh-f="' + d.key + '"]'); if (el) { el.classList.add('qh-active'); el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } }
  });

  /* ---------- boot ---------- */
  function boot() {
    indexMain(function () {
      if (EDIT) {
        PRISTINE_MAIN = document.getElementById('main') ? document.getElementById('main').innerHTML : null;
        PRISTINE_HEADER = document.querySelector('header.site-header') ? document.querySelector('header.site-header').innerHTML : null;
        PRISTINE_FOOTER = document.querySelector('footer.site-footer') ? document.querySelector('footer.site-footer').innerHTML : null;
        PRISTINE_QUICK = Array.prototype.slice.call(document.querySelectorAll('.mobile-nav__quick,.mobile-quickbar')).map(function (n) { return n.outerHTML; });
        activeOutline();
        // The admin parent already holds the draft document (page.get) and pushes
        // it back via postMessage; no content fetch is needed in edit mode.
        send({ type: 'qh:ready', structure: structure() });
        return;
      }
      fetch('/api/qh/content/?page=' + encodeURIComponent(location.pathname), { credentials: 'same-origin' })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (data) {
          if (data.site) applySite(data.site);
          if (data.overlay) applyOverlay(data.overlay);
          window.__QH_APPLIED = { overlay: !!data.overlay, sections: data.overlay ? Object.keys(data.overlay.sections || {}) : [] };
        })
        .catch(function (e) { if (window.console) console.warn('qh-cms overlay failed', e && e.message); });
    });
  }
  // Defer CMS work: the server-rendered page is correct immediately; the runtime
  // overlay is a progressive enhancement that should not block the main thread
  // during the critical initial paint.
  function scheduleBoot() {
    if (window.requestIdleCallback) window.requestIdleCallback(boot, { timeout: 800 });
    else window.setTimeout(boot, 1);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleBoot); else scheduleBoot();
})();
