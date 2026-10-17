'use strict';
const { icons, figure, flourish, divider } = require('./icons');
/* ---------- tiny helpers ---------- */
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const raw = (s) => s; // trusted authored HTML fragments
function mediaSlot(label, note, cls) {
  return `<div class="media-slot ${cls || ''}" role="img" aria-label="${esc('Placeholder image: ' + label)}">
<strong>${esc(label)}</strong>
<span>${esc(note || 'Licensed image to be supplied')}</span>
  </div>`;
}
function icon(name) { return icons[name] || ''; }
/* ---------- HEAD ---------- */
function head(page, site) {
  const url = site.url + page.url;
  const og = page.og || site.defaultOg;
  const noindex = page.noindex ? '\n<meta name="robots" content="noindex, nofollow">' : '';
  const schema = (page.schema || []).map((s) =>
`<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.seoTitle)}</title>
<meta name="description" content="${esc(page.seoDescription)}">${noindex}
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#2E070F">
<meta property="og:type" content="${esc(page.ogType || 'website')}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(page.seoTitle)}">
<meta property="og:description" content="${esc(page.seoDescription)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}/assets/img/og-cover.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="QuantumHealth by Dr. Vikas Singh â€” A more informed approach to breast enhancement">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.seoTitle)}">
<meta name="twitter:description" content="${esc(page.seoDescription)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&family=Pinyon+Script&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${site.base}assets/css/styles.css">
<link rel="icon" href="${site.base}assets/img/favicon.svg" type="image/svg+xml">
${schema}
</head>`;
}
/* ---------- HEADER ---------- */
function navLink(item, activeUrl) {
  const active = activeUrl === item.href || (item.href !== '/' && activeUrl.indexOf(item.href) === 0);
  return `<a class="nav__link" href="${item.href}"${active ? ' aria-current="page"' : ''}>${esc(item.label)}</a>`;
}
function header(page, site) {
  const links = site.nav.map((i) => navLink(i, page.url)).join('\n        ');
  const mobileLinks = site.nav.concat(site.navSecondary || []).map((i) => {
const active = page.url === i.href || (i.href !== '/' && page.url.indexOf(i.href) === 0);
return `<li><a class="mobile-nav__link" href="${i.href}"${active ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`;
  }).join('\n        ');
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="container header-inner">
<a class="brand" href="${site.base}" aria-label="${esc(site.name)} home">
<span class="brand__ico" aria-hidden="true">${icon('lotus')}</span>
<span class="brand__text">
<span class="brand__name">QuantumHealth</span>
<span class="brand__tag">By Dr. Vikas Singh</span>
</span>
</a>
<nav class="nav" aria-label="Primary">
${links}
</nav>
<div class="header-cta">
<a class="btn btn--primary btn--sm" href="${site.base}book-consultation/">Book a Consultation</a>
</div>
<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">
<span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
<span>Menu</span>
</button>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav">
  <nav aria-label="Mobile">
<ul class="mobile-nav__list">
${mobileLinks}
</ul>
<div class="mobile-nav__cta">
<a class="btn btn--primary btn--block" href="${site.base}book-consultation/">Book a Consultation</a>
</div>
<p class="mobile-nav__meta">${esc(site.tagline)}</p>
  </nav>
</div>`;
}
/* ---------- FOOTER ---------- */
function footer(page, site) {
  const col = (title, items) => `<div class="footer-col"><h3>${esc(title)}</h3><ul>
${items.map((i) => `<li><a href="${i.href}">${esc(i.label)}</a></li>`).join('\n      ')}
</ul></div>`;
  return `<footer class="site-footer">
  <div class="container">
<div class="footer-top">
<div class="footer-brand">
<a class="brand" href="${site.base}" aria-label="${esc(site.name)} home">
<span class="brand__ico" aria-hidden="true">${icon('lotus')}</span>
<span class="brand__text"><span class="brand__name">QuantumHealth</span><span class="brand__tag">By Dr. Vikas Singh</span></span>
</a>
<p>${esc(site.footerBlurb)}</p>
<ul class="footer-contact-details">
${site.contact.phone ? `<li><a href="tel:${esc(String(site.contact.phone).replace(/\s/g, ''))}">${esc(site.contact.phone)}</a></li>` : ''}
${site.contact.email ? `<li><a href="mailto:${esc(site.contact.email)}">${esc(site.contact.email)}</a></li>` : ''}
${site.contact.address ? `<li>${esc(site.contact.address)}</li>` : ''}
</ul>
</div>
${col('Explore', site.footerExplore)}
${col('Patient information', site.footerPatient)}
${col('Contact', site.footerContact)}
</div>
<div class="footer-disclaimer">
${esc(site.medicalDisclaimerShort)}
</div>
<div class="footer-bottom">
<p>&copy; <span data-year>2026</span> ${esc(site.name)}. All rights reserved.</p>
<div class="footer-legal">
${site.footerLegal.map((i) => `<a href="${i.href}">${esc(i.label)}</a>`).join('\n        ')}
</div>
</div>
  </div>
</footer>`;
}
/* ---------- PAGE BANNER ---------- */
function pageBanner(page, site) {
  const crumbs = [`<a href="${site.base}">Home</a>`]
.concat((page.breadcrumb || []).map((b) => b.href ? `<a href="${b.href}">${esc(b.label)}</a>` : esc(b.label)))
.join('<span aria-hidden="true">/</span>');
  return `<section class="page-banner">
  <div class="container page-banner__inner">
${page.bannerEyebrow ? `<p class="eyebrow eyebrow--light">${esc(page.bannerEyebrow)}</p>` : ''}
<h1>${esc(page.h1)}</h1>
${page.bannerLead ? `<p>${esc(page.bannerLead)}</p>` : ''}
<nav class="breadcrumbs" aria-label="Breadcrumb">${crumbs}</nav>
  </div>
</section>`;
}
/* ---------- BLOCK RENDERERS ---------- */
function renderProse(b) {
  return `<div class="container"><div class="prose reveal">${raw(b.html)}</div></div>`;
}
function renderSplit(b) {
  const media = b.slot
? mediaSlot(b.slot, b.slotNote, 'ratio-4-5')
: (b.media || '');
  return `<div class="container">
  <div class="split ${b.reverse ? 'split--reverse' : ''}">
<div class="split__copy reveal">
${b.eyebrow ? `<p class="eyebrow">${esc(b.eyebrow)}</p>` : ''}
<h2 class="h2">${raw(b.heading)}</h2>
${b.body ? `<div class="prose" style="margin-top:var(--sp-3)">${raw(b.body)}</div>` : ''}
${b.link ? `<p style="margin-top:var(--sp-4)"><a class="link-arrow" href="${b.link.href}">${esc(b.link.label)} ${icon('arrow')}</a></p>` : ''}
</div>
<div class="split__media reveal" data-delay="1">
<div class="media-frame ${b.mediaRatio || 'ratio-4-5'}">${media}</div>
${b.script ? `<p class="script" style="margin-top:var(--sp-3);text-align:right">${esc(b.script)}</p>` : ''}
</div>
  </div>
</div>`;
}
function renderCards(b) {
  const cols = b.cols || 3;
  const cards = b.items.map((it, i) => `<article class="card reveal" data-delay="${(i % cols)}">
<div class="card__media">${mediaSlot(it.slot || 'Image', it.slotNote, '')}</div>
<div class="card__body">
${it.kicker ? `<p class="card__kicker">${esc(it.kicker)}</p>` : ''}
<h3 class="card__title">${esc(it.title)}</h3>
<p class="card__text">${esc(it.text)}</p>
</div>
${it.href ? `<div class="card__footer"><a class="link-arrow" href="${it.href}">Learn more ${icon('arrow')}</a></div>` : ''}
  </article>`).join('\n    ');
  return `<div class="container">
  <div class="section-head ${b.center ? 'section-head--center' : ''} reveal">
${b.eyebrow ? `<p class="eyebrow ${b.center ? 'eyebrow--center' : ''}">${esc(b.eyebrow)}</p>` : ''}
<h2 class="h2">${raw(b.heading)}</h2>
${b.lead ? `<p class="lead">${esc(b.lead)}</p>` : ''}
  </div>
  <div class="grid grid-${cols}" style="margin-top:var(--sp-5)">
${cards}
  </div>
</div>`;
}
function renderIconGrid(b) {
  const cols = b.cols || 4;
  const items = b.items.map((it, i) => `<div class="icon-card reveal" data-delay="${i % cols}">
<div class="icon-card__icon">${icon(it.icon)}</div>
<h3>${esc(it.title)}</h3>
<p>${esc(it.text)}</p>
  </div>`).join('\n    ');
  return `<div class="container">
  <div class="section-head ${b.center !== false ? 'section-head--center' : ''} reveal">
${b.eyebrow ? `<p class="eyebrow ${b.center !== false ? 'eyebrow--center' : ''}">${esc(b.eyebrow)}</p>` : ''}
<h2 class="h2">${raw(b.heading)}</h2>
${b.lead ? `<p class="lead">${esc(b.lead)}</p>` : ''}
  </div>
  <div class="grid grid-${cols}" style="margin-top:var(--sp-5)">${items}</div>
</div>`;
}
function renderSteps(b) {
  const items = b.items.map((it, i) => `<div class="step reveal" data-delay="${i % 3}">
<span class="step__num">${String(i + 1).padStart(2, '0')}</span>
<div><h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></div>
  </div>`).join('\n    ');
  return `<div class="container">
  <div class="split" style="align-items:start">
<div class="reveal">
${b.eyebrow ? `<p class="eyebrow">${esc(b.eyebrow)}</p>` : ''}
<h2 class="h2">${raw(b.heading)}</h2>
${b.lead ? `<p class="lead" style="margin-top:var(--sp-3)">${esc(b.lead)}</p>` : ''}
<hr class="rule">
${b.slot ? `<div class="media-frame ratio-4-3">${mediaSlot(b.slot, b.slotNote)}</div>` : ''}
</div>
<div class="steps reveal" data-delay="1">${items}</div>
  </div>
</div>`;
}
function renderNotice(b) {
  return `<div class="container"><div class="notice ${b.blush ? 'notice--blush' : ''} reveal">
<span class="notice__icon" aria-hidden="true">${icon(b.icon || 'info')}</span>
<div><h3>${esc(b.title)}</h3><p>${raw(b.text)}</p></div>
  </div></div>`;
}
function renderTable(b) {
  const head = `<tr>${b.head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr>`;
  const rows = b.rows.map((r) => `<tr>${r.map((c) => `<td>${raw(c)}</td>`).join('')}</tr>`).join('\n    ');
  return `<div class="container">
  <div class="section-head ${b.center !== false ? 'section-head--center' : ''} reveal">
${b.eyebrow ? `<p class="eyebrow ${b.center !== false ? 'eyebrow--center' : ''}">${esc(b.eyebrow)}</p>` : ''}
<h2 class="h2">${raw(b.heading)}</h2>
${b.lead ? `<p class="lead">${esc(b.lead)}</p>` : ''}
  </div>
  <div class="table-wrap reveal" style="margin-top:var(--sp-5)">
<table class="compare"><caption class="hp-field">${esc(b.heading)}</caption>
<thead>${head}</thead>
<tbody>${rows}</tbody>
</table>
  </div>
  ${b.note ? `<p class="lead" style="margin-top:var(--sp-3);font-size:var(--fs-sm)">${raw(b.note)}</p>` : ''}
</div>`;
}
function renderFaq(b) {
  const fid = b.id || 'faq';
  const items = b.items.map((it, i) => `<div class="faq__item reveal">
<h3 style="margin:0">
<button class="faq__q" type="button" id="faq-q-${fid}-${i}" aria-expanded="false" aria-controls="faq-a-${fid}-${i}">
<span>${esc(it.q)}</span><span class="faq__sign" aria-hidden="true"></span>
</button>
</h3>
<div class="faq__a" id="faq-a-${fid}-${i}" role="region" aria-labelledby="faq-q-${fid}-${i}">
<div class="faq__a-inner">${raw(it.a)}</div>
</div>
  </div>`).join('\n    ');
  return `<div class="container container-narrow">
  <div class="section-head section-head--center reveal">
${b.eyebrow ? `<p class="eyebrow eyebrow--center">${esc(b.eyebrow)}</p>` : ''}
<h2 class="h2">${raw(b.heading)}</h2>
  </div>
  <div class="faq" style="margin-top:var(--sp-5)">${items}</div>
</div>`;
}
function renderGallery(b) {
  const items = b.items.map((it, i) => `<button class="gallery-item reveal" type="button" data-lightbox
data-full="${it.full || ''}" data-caption="${esc(it.caption)}" aria-label="${esc('Open image: ' + it.caption)}">
${mediaSlot(it.slot || it.caption, it.slotNote, it.ratio || 'ratio-4-5')}
<span class="gallery-item__cap">${esc(it.caption)}</span>
  </button>`).join('\n    ');
  return `<div class="container">
  <div class="section-head ${b.center !== false ? 'section-head--center' : ''} reveal">
${b.eyebrow ? `<p class="eyebrow ${b.center !== false ? 'eyebrow--center' : ''}">${esc(b.eyebrow)}</p>` : ''}
<h2 class="h2">${raw(b.heading)}</h2>
${b.lead ? `<p class="lead">${esc(b.lead)}</p>` : ''}
  </div>
  <div class="gallery-grid" style="margin-top:var(--sp-5)">${items}</div>
</div>`;
}
function renderCta(b) {
  return `<div class="container">
  <div class="cta-band__inner reveal">
<div>
${b.eyebrow ? `<p class="eyebrow eyebrow--light">${esc(b.eyebrow)}</p>` : ''}
<h2>${raw(b.heading)}</h2>
${b.text ? `<p>${esc(b.text)}</p>` : ''}
</div>
<div><a class="btn btn--primary" href="${b.button.href}">${esc(b.button.label)} ${icon('arrow')}</a></div>
  </div>
</div>`;
}
function renderForm(b, site) {
  const interests = (b.interests || []).map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('\n          ');
  const contacts = (b.contactMethods || ['Phone', 'Email']).map((m, i) => `<label><input type="radio" name="contact_method" value="${esc(m)}"${i === 0 ? ' checked' : ''}> ${esc(m)}</label>`).join('\n        ');
  const sidebar = b.points ? `<ul class="stack">${b.points.map((p) => `<li style="display:flex;gap:.7rem;align-items:flex-start"><span style="color:var(--gold-deep);flex:none">${icon('check')}</span><span>${esc(p)}</span></li>`).join('')}</ul>` : '';
  return `<div class="container">
  <div class="split" style="align-items:start">
<div class="reveal">
${b.eyebrow ? `<p class="eyebrow">${esc(b.eyebrow)}</p>` : ''}
<h2 class="h2">${raw(b.heading)}</h2>
${b.lead ? `<p class="lead" style="margin-top:var(--sp-3)">${esc(b.lead)}</p>` : ''}
<hr class="rule">
${sidebar}
${b.slot ? `<div class="media-frame ratio-4-3" style="margin-top:var(--sp-4)">${mediaSlot(b.slot, b.slotNote)}</div>` : ''}
</div>
<div class="reveal" data-delay="1">
<form class="form" data-consult-form data-endpoint="${esc(b.endpoint || '')}" novalidate>
<div class="form-row">
<div class="field">
<label for="cf-name">Full name <span class="req" aria-hidden="true">*</span></label>
<input id="cf-name" name="name" type="text" autocomplete="name" required aria-describedby="cf-name-err">
<span class="field__error" id="cf-name-err" role="alert"></span>
</div>
<div class="field">
<label for="cf-email">Email address <span class="req" aria-hidden="true">*</span></label>
<input id="cf-email" name="email" type="email" autocomplete="email" required aria-describedby="cf-email-err">
<span class="field__error" id="cf-email-err" role="alert"></span>
</div>
</div>
<div class="form-row">
<div class="field">
<label for="cf-phone">Phone number <span class="field__hint">(optional)</span></label>
<input id="cf-phone" name="phone" type="tel" autocomplete="tel" placeholder="Include your country code" aria-describedby="cf-phone-err">
<span class="field__error" id="cf-phone-err" role="alert"></span>
</div>
<div class="field">
<label for="cf-interest">Area of interest <span class="req" aria-hidden="true">*</span></label>
<select id="cf-interest" name="interest" required aria-describedby="cf-interest-err">
<option value="">Please chooseâ€¦</option>
${interests}
</select>
<span class="field__error" id="cf-interest-err" role="alert"></span>
</div>
</div>
<div class="form-row">
<div class="field">
<label for="cf-location">Preferred consultation location</label>
<input id="cf-location" name="location" type="text" placeholder="To be confirmed by the clinic">
</div>
<div class="field">
<label for="cf-time">Preferred contact time <span class="field__hint">(optional)</span></label>
<input id="cf-time" name="preferred_time" type="text" placeholder="e.g. weekday mornings">
</div>
</div>
<div class="field">
<label id="cf-contact-label">Preferred contact method</label>
<div class="radio-group" role="radiogroup" aria-labelledby="cf-contact-label">
${contacts}
</div>
</div>
<div class="field">
<label for="cf-message">Anything you would like us to know? <span class="field__hint">(optional â€” please do not include sensitive medical details)</span></label>
<textarea id="cf-message" name="message"></textarea>
</div>
<div class="hp-field" aria-hidden="true">
<label for="cf-company">Company website</label>
<input id="cf-company" name="company_website" type="text" tabindex="-1" autocomplete="off">
</div>
<div class="checkbox">
<input id="cf-consent" name="consent" type="checkbox" required aria-describedby="cf-consent-err">
<label for="cf-consent">I agree to be contacted about this enquiry and I have read the <a href="${site.base}privacy-policy/" style="text-decoration:underline">privacy notice</a>. <span class="req" aria-hidden="true">*</span>
<span class="field__error" id="cf-consent-err" role="alert"></span>
</label>
</div>
<div class="form__submit">
<button class="btn btn--primary" type="submit">${esc(b.submitLabel || 'Prepare enquiry')} ${icon('arrow')}</button>
<span class="field__hint">Your information is handled confidentially.</span>
</div>
<div class="form__status" data-status role="status" aria-live="polite"></div>
</form>
</div>
  </div>
</div>`;
}
function renderFeatureStrip(items) {
  const chips = items.map((it) => `<div class="feature-chip">
<span class="feature-chip__icon" aria-hidden="true">${icon(it.icon)}</span>
<span class="feature-chip__label">${esc(it.label)}</span>
  </div>`).join('\n    ');
  return `<div class="feature-strip"><div class="container feature-strip__inner">${chips}</div></div>`;
}
/* ---------- HERO ---------- */
function renderHero(b, site) {
  const actions = (b.actions || []).map((a) =>
`<a class="btn ${a.style === 'ghost' ? 'btn--ghost' : 'btn--primary'}" href="${a.href}">${esc(a.label)} ${icon('arrow')}</a>`
  ).join('\n        ');
  const benefits = (b.benefits || []).map((it) =>
`<div class="benefit"><span class="benefit__icon" aria-hidden="true">${icon(it.icon)}</span><span class="benefit__label">${esc(it.label)}</span></div>`
  ).join('\n      ');
  const figureBlock = b.slot
? `<div class="hero__figure">${mediaSlot(b.slot, b.slotNote)}</div>`
: '';
  const strip = b.featureStrip ? renderFeatureStrip(b.featureStrip) : '';
  return `<section class="hero">
  <div class="container hero__inner">
<div class="hero__copy">
${b.eyebrow ? `<p class="eyebrow eyebrow--light hero__eyebrow">${esc(b.eyebrow)}</p>` : ''}
<h1 class="hero__title">${raw(b.title)}</h1>
${b.script ? `<p class="script hero__script">${esc(b.script)}</p>` : ''}
${b.lead ? `<p class="hero__lead">${esc(b.lead)}</p>` : ''}
<div class="hero__actions">${actions}</div>
${b.note ? `<p class="hero__note">${icon('info')}<span>${esc(b.note)}</span></p>` : ''}
</div>
<div class="hero__aside">
${figureBlock}
${benefits ? `<div class="benefit-rail">${benefits}</div>` : ''}
</div>
  </div>
  ${strip}
</section>`;
}
/* ---------- SECTION WRAPPER ---------- */
function renderBlock(b, page, site) {
  const sid = b.id ? ` id="${b.id}"` : '';
  switch (b.type) {
case 'hero': return renderHero(b, site);
case 'prose': return `<section${sid} class="section${b.tight ? ' section--tight' : ''}">${renderProse(b)}</section>`;
case 'split': return `<section${sid} class="section${b.alt ? ' section--alt' : ''}">${renderSplit(b)}</section>`;
case 'cards': return `<section${sid} class="section${b.alt ? ' section--alt' : ''}">${renderCards(b)}</section>`;
case 'icon-grid': return `<section${sid} class="section${b.alt ? ' section--alt' : ''}">${renderIconGrid(b)}</section>`;
case 'steps': return `<section${sid} class="section${b.alt ? ' section--alt' : ''}${b.wine ? ' section--wine' : ''}">${renderSteps(b)}</section>`;
case 'notice': return `<section${sid} class="section section--tight">${renderNotice(b)}</section>`;
case 'table': return `<section${sid} class="section${b.alt ? ' section--alt' : ''}">${renderTable(b)}</section>`;
case 'faq': return `<section${sid} class="section${b.alt ? ' section--alt' : ''}">${renderFaq(b)}</section>`;
case 'gallery': return `<section${sid} class="section${b.alt ? ' section--alt' : ''}">${renderGallery(b)}</section>`;
case 'form': return `<section${sid} class="section${b.alt ? ' section--alt' : ''}">${renderForm(b, site)}</section>`;
case 'cta': return `<section${sid} class="section section--tight cta-band">${renderCta(b)}</section>`;
default: return '';
  }
}
/* ---------- FULL LAYOUT ---------- */
function layout(page, site) {
  const isHome = page.url === '/';
  const body = page.blocks.map((b) => renderBlock(b, page, site)).join('\n');
  const banner = (page.h1 && !isHome && page.showBanner !== false) ? pageBanner(page, site) : '';
  return `${head(page, site)}
<body class="page-${(page.slug || 'home')}">
${header(page, site)}
<main id="main" tabindex="-1">
${banner}
${body}
</main>
${footer(page, site)}
<script src="${site.base}assets/js/main.js" defer></script>
</body>
</html>`;
}
module.exports = { layout, head, header, footer, icon, mediaSlot, renderFeatureStrip, esc, raw };



