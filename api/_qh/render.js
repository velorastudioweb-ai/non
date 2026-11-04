'use strict';
/* Server-side HTML fragments for CMS-managed sections.
 * These mirror the class names of the generated site so the existing
 * stylesheet renders them identically. All output is sanitized afterwards. */

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const listHtml = (items) => items && items.length ? `<ul>${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';

function initialsFor(name) {
  return String(name || '').replace(/^Dr\.?\s*/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase();
}

function doctorPortrait(d) {
  if (d.portrait && d.portrait.src) {
    return `<img class="qh-portrait-image" src="${esc(d.portrait.src)}" alt="${esc(d.portrait.alt || ('Portrait of ' + d.name))}" width="${Number(d.portrait.width) || 600}" height="${Number(d.portrait.height) || 800}" loading="lazy" decoding="async">`;
  }
  const iname = initialsFor(d.name);
  return `<div class="qh-portrait qh-portrait--initials" role="img" aria-label="${esc(iname)} monogram — a verified professional portrait of ${esc(d.name)} has not yet been supplied"><span aria-hidden="true">${esc(iname)}</span></div>`;
}

function doctorCard(d) {
  const quals = (d.qualifications || []).length ? d.qualifications : [];
  const supplied = (d.suppliedQualifications || []).length
    ? `<h4>Qualifications shown in promotional material — verification pending</h4>${listHtml(d.suppliedQualifications)}${d.credentialNote ? `<p class="qh-note">${esc(d.credentialNote)}</p>` : ''}`
    : '';
  const contactBits = [];
  if (d.contact && d.contact.phone) contactBits.push(`<a href="tel:${esc(String(d.contact.phone).replace(/[^\d+]/g, ''))}">${esc(d.contact.phone)}</a>`);
  if (d.contact && d.contact.whatsapp) contactBits.push(`<a href="${esc(d.contact.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`);
  if (d.contact && d.contact.email) contactBits.push(`<a href="mailto:${esc(d.contact.email)}">${esc(d.contact.email)}</a>`);
  return `<article class="qh-card qh-doctor-card">${doctorPortrait(d)}<h3><a href="${esc(d.profileUrl || '#')}">${esc(d.name)}</a></h3><p>${esc(d.designation)}</p>${listHtml(d.specialisations || [])}${quals.length ? `<h4>Qualifications</h4>${listHtml(quals)}` : ''}${supplied}${d.experience ? `<p class="pink">${esc(d.experience)}</p>` : ''}${(d.bio || []).length ? `<div class="prose">${(d.bio || []).map((p) => `<p>${esc(p)}</p>`).join('')}</div>` : ''}${(d.locations || []).length ? `<h4>Consultation locations</h4>${listHtml(d.locations)}` : ''}${(d.awards || []).length ? `<h4>Supplied awards and affiliations — verification pending</h4>${listHtml(d.awards)}<p class="qh-note">Awards and affiliations are published only after the team supplies verifiable records.</p>` : ''}${contactBits.length ? `<p>${contactBits.join(' · ')}</p>` : ''}<div class="qh-actions"><a class="qh-btn" href="${esc(d.profileUrl || '/contact/')}">View Profile</a><a class="qh-btn secondary" href="/contact/">Book Consultation</a></div></article>`;
}

function doctorsSectionHtml(doctors, heading) {
  const visible = (doctors || []).filter((d) => d.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
  return `<section class="qh-doctors-grid-section"><h2>${esc(heading || 'Doctors')}</h2><div class="qh-grid">${visible.map(doctorCard).join('')}</div></section>`;
}

function gallerySectionHtml(items, heading, lead) {
  const cards = (items || []).filter((g) => g.published !== false).map((g, i) => `
<figure class="gallery__item">
  <div class="gallery__pair">
    <img src="${esc(g.before && g.before.src)}" alt="${esc((g.before && g.before.alt) || ('Before treatment — ' + (g.title || '')))}" width="${(g.before && Number(g.before.width)) || 800}" height="${(g.before && Number(g.before.height)) || 800}" loading="lazy" decoding="async">
    <img src="${esc(g.after && g.after.src)}" alt="${esc((g.after && g.after.alt) || ('After treatment — ' + (g.title || '')))}" width="${(g.after && Number(g.after.width)) || 800}" height="${(g.after && Number(g.after.height)) || 800}" loading="lazy" decoding="async">
  </div>
  <figcaption><span class="gallery__cat">${esc(g.category || '')}</span> ${esc(g.caption || g.title || '')}${g.consent ? '' : ' <em>(illustrative — no consented patient photography supplied)</em>'}</figcaption>
</figure>`).join('');
  return `<section class="gallery"><h2>${esc(heading || 'Before and after')}</h2>${lead ? `<p>${esc(lead)}</p>` : ''}<div class="gallery__grid">${cards}</div><p class="qh-note">Clinical photography is published only with written patient consent. Items without a consent record are labelled illustrative and must never be presented as genuine clinical results.</p></section>`;
}

function newBlockHtml(tpl, fields) {
  const f = fields || {};
  const title = esc(f.title || 'New section');
  switch (tpl) {
    case 'heading-text': return `<section class="section"><div class="container"><h2 class="h2">${title}</h2><div class="prose">${String(f.html || sanitizeDefault(f.text))}</div></div></section>`;
    case 'cta': return `<section class="section section--tight cta-band petals"><div class="container"><div class="cta"><h2 class="h2">${title}</h2><p>${esc(f.text || '')}</p><p><a class="btn btn--primary" href="${esc(f.href || '/contact/')}">${esc(f.label || 'Contact us')}</a></p></div></div></section>`;
    case 'faq': {
      const items = (f.items || []).map((q) => `<details class="faq__item"><summary><span>${esc(q.q)}</span></summary><div class="prose">${esc(q.a)}</div></details>`).join('');
      return `<section class="section"><div class="container"><h2 class="h2">${title}</h2><div class="faq">${items}</div></div></section>`;
    }
    default: return `<section class="section"><div class="container"><h2 class="h2">${title}</h2></div></section>`;
  }
}
function sanitizeDefault(text) {
  return String(text || '').split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}

module.exports = { esc, doctorsSectionHtml, gallerySectionHtml, newBlockHtml, doctorCard };
