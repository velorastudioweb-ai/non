'use strict';
const { site, countries } = require('./config');
function trustStrip() {
  const items = [
    ['Surgeon-led', 'Consultations and articles led by a qualified surgeon.'],
    ['Evidence-first', 'Content written to editorial standards and medically reviewed.'],
    ['Transparent', 'Published cost ranges with clear breakdowns.'],
    ['No pressure', 'No guaranteed outcomes or time-limited offers.']
  ];
  return '<section class="trust-strip"><div class="wrap trust-grid">' + items.map(function(i){ return '<div class="trust-card"><h3>'+i[0]+'</h3><p>'+i[1]+'</p></div>'; }).join('') + '</div></section>';
}
function ctaBand(cc) {
  return '<section class="cta-band"><div class="wrap cta-in"><div><h2>Ready to discuss your options?</h2><p>Book a consultation to discuss anatomy, options and realistic outcomes.</p></div><div class="cta-actions"><a class="btn btn-accent" href="/book-consultation/">Book a consultation</a></div></div></section>';
}
function consultForm(cc, id) {
  return '<form class="consult-form" id="'+(id||'f')+'"><input type="text" placeholder="Name"><input type="tel" placeholder="Phone"><input type="email" placeholder="Email"><button class="btn btn-accent" type="submit">Request</button></form>';
}
function tocBlock(toc) {
  if (!toc || !toc.length) return '';
  return '<nav class="toc"><ol>' + toc.map(function(x){ return '<li><a href="#'+x.id+'">'+x.text+'</a></li>'; }).join('') + '</ol></nav>';
}
function infobox(rows, title) {
  if (!rows || !rows.length) return '';
  return '<aside class="infobox"><h3>'+title+'</h3><dl>' + rows.map(function(r){ return '<div><dt>'+r[0]+'</dt><dd>'+r[1]+'</dd></div>'; }).join('') + '</dl></aside>';
}
function relatedBlock(items) {
  if (!items || !items.length) return '';
  return '<section class="related"><h2>Related articles</h2><ul>' + items.map(function(r){ return '<li><a href="'+r.href+'">'+r.title+'</a></li>'; }).join('') + '</ul></section>';
}
function disclaimerNote() {
  return '<aside class="notice"><p>This page is educational information, not medical advice. Individual suitability, risks and outcomes vary.</p></aside>';
}
function layout(p, site) {
  return '<!doctype html><html><head><meta charset="utf-8"><title>'+p.title+'</title></head><body>'+p.body+'</body></html>';
}
module.exports = { trustStrip, ctaBand, consultForm, tocBlock, infobox, relatedBlock, disclaimerNote, faqSection, layout };
function faqSection(f){if(!f||!f.length)return "";return "<section class=\"faq\"><h2>FAQs</h2>"+f.map(function(x){return "<details><summary>"+x.q+"</summary><p>"+x.a+"</p></details>"}).join("")+"</section>";}
