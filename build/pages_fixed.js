'use strict';

const fs = require('fs');
const path = require('path');
const { loadWiki } = require('./wiki');
const { cities } = require('./cities');
const { costs } = require('./costs');
const { site, countries, surgeons, compliance } = require('./config');
const { breadcrumbList, medicalClinic, physician, medicalWebPage, articleSchema, faqPage, webSite } = require('./schema');
const { parseFrontMatter, markdownToHtml } = require('./markdown');
const tpl = require('./templates2');
const { autoLink } = require('./glossary');
const { strings } = require('./i18n');

function loadMd(p) {
  if (!fs.existsSync(p)) return { data: {}, html: '' };
  const src = fs.readFileSync(p, 'utf8');
  const { data, body } = parseFrontMatter(src);
  let html = markdownToHtml(body);
  html = autoLink(html);
  return { data, html };
}

function simplePage(slug) {
  const f = path.join(__dirname, '..', 'content', 'pages', slug + '.md');
  const { data, html } = loadMd(f);
  return { data, html };
}

function buildWikiIndex(wiki) {
  const groups = {};
  wiki.forEach((a) => {
    const cat = a.data.category || 'Other';
    groups[cat] = groups[cat] || [];
    groups[cat].push(a);
  });
  const cats = Object.keys(groups).sort();
  const body = '<h1>Wiki: Breast Augmentation &amp; Related Topics</h1><p class="lead">An evidence-first encyclopedia covering procedures, implants, recovery, risks and costs.</p>' +
    cats.map((c) => '<h2 id="' + c.toLowerCase().replace(/\s+/g, '-') + '">' + c + '</h2><ul>' +
      groups[c].sort((x, y) => x.data.title.localeCompare(y.data.title)).map((a) => '<li><a href="' + a.url + '">' + a.data.title + '</a>' + (a.data.summary ? ' — <span>' + a.data.summary + '</span>' : '') + '</li>').join('') +
      '</ul>').join('');
  const schema = [medicalWebPage({ title: 'Breast Augmentation Wiki | Breast Enlargement Guide', description: 'Encyclopedia of breast augmentation: procedures, implants, recovery, risks and costs.', url: '/wiki/' }), breadcrumbList([{ label: 'Wiki' }])];
  return { url: '/wiki/', title: 'Breast Augmentation Wiki | Breast Enlargement Guide', description: 'Encyclopedia of breast augmentation: procedures, implants, recovery, risks and costs.', schema, breadcrumbs: [{ label: 'Wiki' }], body, bodyClass: 'wiki-index' };
}

function buildGlossary() {
  const { terms } = require('./glossary');
  const body = '<h1>Glossary of Breast Augmentation Terms</h1><p class="lead">Definitions of common medical terms used throughout this site.</p><dl>' +
    terms.map((t) => '<div id="' + t.slug + '"><dt>' + t.term + '</dt><dd>' + t.def + '</dd></div>').join('') + '</dl>';
  const schema = [medicalWebPage({ title: 'Glossary | Breast Enlargement Guide', description: 'Breast augmentation glossary of terms with plain-language definitions.', url: '/wiki/glossary/' }), breadcrumbList([{ label: 'Wiki', href: '/wiki/' }, { label: 'Glossary' }])];
  return { url: '/wiki/glossary/', title: 'Breast Augmentation Glossary | Breast Enlargement Guide', description: 'Plain-language glossary of breast augmentation terms.', schema, breadcrumbs: [{ label: 'Wiki', href: '/wiki/' }, { label: 'Glossary' }], body };
}

function buildHome() {
  const body = '<section class="hero"><h1>Breast Augmentation: Information You Can Trust</h1><p class="lead">Evidence-based answers on breast augmentation, implant types, recovery and costs across India, the UAE and the UK. Surgeon-led education with no pressure or guarantees.</p><p><a class="btn btn-accent" href="/book-consultation/">Book a consultation</a> <a class="btn btn-outline" href="/wiki/breast-augmentation/">Read the complete guide</a></p></section>' +
    tpl.trustStrip() +
    '<section><h2>Featured guides</h2><div class="card-grid"><article><h3><a href="/wiki/breast-augmentation/">Breast augmentation (complete guide)</a></h3><p>What it is, who it suits, options, costs, recovery and risks.</p></article><article><h3><a href="/wiki/breast-implant-types/">Implant types</a></h3><p>Shapes, fills and surfaces explained clearly.</p></article><article><h3><a href="/wiki/breast-augmentation-recovery/">Recovery timeline</a></h3><p>Week-by-week guide with what’s normal and warning signs.</p></article><article><h3><a href="/wiki/breast-augmentation-risks/">Risks and complications</a></h3><p>The real risks, explained honestly.</p></article></div></section>' +
    '<section><h2>Countries we serve</h2><div class="card-grid"><article><h3><a href="/in/">Breast augmentation in India</a></h3><p>Main market. <a href="/in/breast-augmentation-cost/">India cost guide</a> and <a href="/in/cities/">cities</a>.</p></article><article><h3><a href="/uae/">Breast augmentation in UAE</a></h3><p><a href="/uae/breast-augmentation-cost/">UAE cost guide</a>.</p></article><article><h3><a href="/uk/">Breast augmentation in UK</a></h3><p><a href="/uk/breast-augmentation-cost/">UK cost guide</a>.</p></article><article><h3><a href="/medical-tourism/">Medical tourism</a></h3><p>Visa, travel, stay and aftercare planning.</p></article></div></section>' + tpl.ctaBand(null);
  const schema = [medicalWebPage({ title: site.brand + ' — Breast Augmentation Information', description: 'Evidence-first breast augmentation guides, costs and consultations across India, UAE and UK.', url: '/' }), medicalClinic(), webSite()];
  return { url: '/', title: site.brand + ' — Breast Augmentation Information', description: 'Evidence-first breast augmentation guides, costs and consultations across India, UAE and UK.', schema, breadcrumbs: [], body, country: null, hreflang: [
    { lang: 'en-IN', href: '/in/' },
    { lang: 'en-AE', href: '/uae/' },
    { lang: 'en-GB', href: '/uk/' },
    { lang: 'x-default', href: '/' }
  ] };
}

function countryHome(cc) {
  const c = countries[cc];
  const body = '<section class="hero"><h1>Breast Augmentation in ' + c.name + '</h1><p class="lead">Surgeon-led information and consultations in ' + c.city + '. Transparent cost range: ' + c.costRange + '.</p><p><a class="btn btn-accent" href="/book-consultation/">Book consultation</a> <a class="btn btn-outline" href="/' + cc + '/breast-augmentation-cost/">View cost details</a></p></section>' + tpl.trustStrip() +
    '<section><h2>Learn more</h2><div class="card-grid"><article><h3><a href="/wiki/breast-augmentation/">Complete guide</a></h3><p>Options, recovery, risks and planning.</p></article><article><h3><a href="/' + cc + '/cities/">Cities in ' + c.name + '</a></h3><p>Find consultations near you.</p></article>' + (cc === 'in' ? '<article><h3><a href="/medical-tourism/">Medical tourism</a></h3><p>Plan your visit from abroad.</p></article>' : '') + '<article><h3><a href="/surgeons/vikas-singh/">Our surgeon</a></h3><p>Credentials, experience and philosophy.</p></article></div></section>' + tpl.ctaBand(cc);
  const schema = [medicalWebPage({ title: 'Breast Augmentation in ' + c.name + ' | ' + site.brand, description: 'Surgeon-led breast augmentation information and consultations in ' + c.name + '.', url: '/' + cc + '/' }), medicalClinic(cc)];
  const hreflang = [
    { lang: 'en-IN', href: '/in/' },
    { lang: 'en-AE', href: '/uae/' },
    { lang: 'en-GB', href: '/uk/' },
    { lang: 'x-default', href: '/' }
  ];
  return { url: '/' + cc + '/', title: 'Breast Augmentation in ' + c.name + ' | ' + site.brand, description: 'Surgeon-led breast augmentation in ' + c.name + ': evidence-first guides, transparent costs and consultations.', schema, breadcrumbs: [], body, country: cc, hreflang };
}

function wikiPage(a) {
  const d = a.data;
  const toc = a.toc && a.toc.length ? tpl.tocBlock(a.toc) : '';
  const rows = [];
  if (d.category) rows.push(['Category', d.category]);
  if (d.last_reviewed) rows.push(['Last medically reviewed', d.last_reviewed]);
  if (d.author) rows.push(['Author', d.author.replace(/-/g, ' ')]);
  if (d.reviewer) rows.push(['Medical reviewer', d.reviewer.replace(/-/g, ' ')]);
  const inf = rows.length ? tpl.infobox(rows, 'Quick facts') : '';
  const faq = d.faq && d.faq.length ? tpl.faqSection(d.faq) : '';
  const refs = d.references && d.references.length ? '<section><h2 id="references" data-i18n="article.refs">References</h2><ol>' + d.references.map((r) => '<li>' + r + '</li>').join('') + '</ol></section>' : '';
  const related = [];
  if (d.related) {
    d.related.forEach((slug) => {
      const art = wikiAll.find((x) => x.slug === slug);
      if (art) related.push({ href: art.url, title: art.data.title, blurb: art.data.summary || '' });
    });
  }
  const relatedBlock = related.length ? tpl.relatedBlock(related) : '';
  const body = '<article class="wiki-main"><p class="wiki-kicker">' + (d.category || '') + '</p><h1>' + d.title + '</h1>' + (d.summary ? '<p class="lead">' + d.summary + '</p>' : '') + toc + a.html + faq + refs + tpl.disclaimerNote() + relatedBlock + '</article><aside class="wiki-rail">' + inf + tpl.ctaBand(null) + '</aside>';
  const grid = '<div class="wiki-grid">' + body + '</div>';
  const schema = [medicalWebPage({ title: d.seo_title || d.title, description: d.seo_description || d.summary || '', url: a.url, lastReviewed: d.last_reviewed, about: 'Breast augmentation' }), articleSchema({ title: d.title, description: d.seo_description || d.summary || '', url: a.url, firstPublished: d.first_published, lastReviewed: d.last_reviewed, reviewerName: d.reviewer })];
  if (d.faq && d.faq.length) schema.push(faqPage(d.faq));
  schema.push(breadcrumbList([{ label: 'Wiki', href: '/wiki/' }, { label: d.title }]));
  const robots = a.status && a.status.indexOf('stub') > -1 ? 'noindex, nofollow' : 'index, follow';
  return { url: a.url, title: d.seo_title || d.title, description: d.seo_description || (d.summary || '').slice(0, 155), schema, breadcrumbs: [{ label: 'Wiki', href: '/wiki/' }, { label: d.title }], body: grid, bodyClass: 'wiki-page', robots };
}

function cityPage(c) {
  const ctry = countries[c.country];
  const body = '<h1>Breast Augmentation in ' + c.name + ', ' + (c.state || c.country.toUpperCase()) + '</h1><p class="lead">Evidence-based information about breast augmentation consultations in ' + c.name + '. Typical cost range in this region: ' + ctry.costRange + '.</p>' +
    '<section><h2>Why choose ' + c.name + '</h2><ul><li>Accredited surgical facilities and structured follow-up.</li><li>Consultations in local language where requested.</li><li>Transparent pricing with all components explained.</li></ul></section>' +
    '<section><h2>Cost snapshot</h2><p>For full breakdown, see <a href="/' + c.country + '/breast-augmentation-cost/">breast augmentation cost in ' + ctry.name + '</a>.</p></section>' +
    '<section><h2>Frequently asked questions</h2><details><summary>Do I need to stay overnight?</summary><p>' + (c.stay || 'Day case or one night is common; international patients should allow 7–10 nights.') + '</p></details><details><summary>Which airport should I fly into?</summary><p>' + (c.airports || '') + '</p></details></section>' +
    '<section><h2>Map</h2><div style="height:320px;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden"><iframe title="Map of ' + c.name + '" width="100%" height="320" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=' + encodeURIComponent(c.mapQuery) + '&amp;z=12&amp;output=embed"></iframe></div></section>' +
    '<section><h2>Book a consultation in ' + c.name + '</h2>' + tpl.consultForm(c.country) + '</section>' + tpl.ctaBand(c.country);
  const schema = [medicalWebPage({ title: 'Breast Augmentation in ' + c.name + ' | ' + site.brand, description: 'Surgeon-led breast augmentation in ' + c.name + ': costs, planning and consultations.', url: '/' + c.country + '/breast-augmentation-' + c.slug + '/' }), medicalClinic(c.country)];
  const breadcrumbs = [{ label: ctry.name, href: '/' + c.country + '/' }, { label: 'Cities', href: '/' + c.country + '/cities/' }, { label: c.name }];
  return { url: '/' + c.country + '/breast-augmentation-' + c.slug + '/', title: 'Breast Augmentation in ' + c.name + ' | ' + site.brand, description: 'Breast augmentation in ' + c.name + ': evidence-first information, cost ranges and consultations.', schema, breadcrumbs, body, country: c.country };
}

function citiesIndex(cc) {
  const c = countries[cc];
  const list = cities.filter((x) => x.country === cc);
  const body = '<h1>Cities for Breast Augmentation in ' + c.name + '</h1><p class="lead">Find information and consultations in cities across ' + c.name + '.</p><ul>' + list.map((x) => '<li><a href="/' + cc + '/breast-augmentation-' + x.slug + '/">Breast augmentation in ' + x.name + '</a></li>').join('') + '</ul>' + tpl.ctaBand(cc);
  return { url: '/' + cc + '/cities/', title: 'Breast Augmentation Cities in ' + c.name + ' | ' + site.brand, description: 'Cities offering breast augmentation consultations in ' + c.name + '.', schema: [medicalWebPage({ title: 'Cities | ' + c.name, description: 'Breast augmentation cities in ' + c.name + '.', url: '/' + cc + '/cities/' })], breadcrumbs: [{ label: c.name, href: '/' + cc + '/' }, { label: 'Cities' }], body, country: cc };
}

function costPage(cc) {
  const c = countries[cc], co = costs[cc];
  const table = '<div class="table-wrap"><table><thead><tr><th>Component</th><th>Approximate range (' + c.currencySymbol + ')</th><th>Notes</th></tr></thead><tbody>' + co.components.map((r) => '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>').join('') + '</tbody></table></div>';
  const faqs = co.faq.length ? tpl.faqSection(co.faq) : '';
  const body = '<h1>Breast Augmentation Cost in ' + c.name + '</h1><p class="lead">Typical range: ' + co.range + '. ' + c.costNotes + '</p>' +
    '<section><h2>Cost breakdown</h2>' + table + '</section>' +
    '<section><h2>What affects your quote</h2><ul>' + co.factors.map((f) => '<li>' + f + '</li>').join('') + '</ul></section>' +
    '<section><h2>Compare countries</h2><ul><li><a href="/in/breast-augmentation-cost/">India</a></li><li><a href="/uae/breast-augmentation-cost/">UAE</a></li><li><a href="/uk/breast-augmentation-cost/">UK</a></li></ul></section>' + faqs + tpl.disclaimerNote() + tpl.ctaBand(cc);
  const schema = [medicalWebPage({ title: 'Breast Augmentation Cost in ' + c.name + ' | ' + site.brand, description: 'Transparent breast augmentation cost breakdown in ' + c.name + ' with ranges and factors.', url: '/' + cc + '/breast-augmentation-cost/' }), faqPage(co.faq)];
  const breadcrumbs = [{ label: c.name, href: '/' + cc + '/' }, { label: 'Cost' }];
  return { url: '/' + cc + '/breast-augmentation-cost/', title: 'Breast Augmentation Cost in ' + c.name + ' | ' + site.brand, description: 'Breast augmentation cost in ' + c.name + ': typical ranges, breakdown and what changes your quote.', schema, breadcrumbs, body, country: cc, hreflang: [
    { lang: 'en-IN', href: '/in/breast-augmentation-cost/' },
    { lang: 'en-AE', href: '/uae/breast-augmentation-cost/' },
    { lang: 'en-GB', href: '/uk/breast-augmentation-cost/' },
    { lang: 'x-default', href: '/in/breast-augmentation-cost/' }
  ] };
}

function surgeonPage() {
  const s = surgeons['vikas-singh'];
  const body = '<h1>' + s.name + '</h1><p class="lead">' + s.title + '</p><section><h2>Qualifications</h2><ul>' + s.qualifications.map((q) => '<li>' + q + '</li>').join('') + '</ul></section><section><h2>Memberships</h2><ul>' + s.memberships.map((m) => '<li>' + m + '</li>').join('') + '</ul></section><section><h2>Clinical focus</h2><ul>' + s.focus.map((f) => '<li>' + f + '</li>').join('') + '</ul></section><section><h2>About</h2>' + s.bio.map((p) => '<p>' + p + '</p>').join('') + '</section><p><strong>Registration:</strong> ' + s.registration + '</p>' + tpl.ctaBand(null);
  const schema = [medicalWebPage({ title: s.name + ' | ' + site.brand, description: s.title + ' — breast augmentation specialist.', url: '/surgeons/vikas-singh/' }), physician('vikas-singh'), breadcrumbList([{ label: 'Surgeons', href: '/surgeons/vikas-singh/' }, { label: s.name }])];
  return { url: '/surgeons/vikas-singh/', title: s.name + ' | ' + site.brand, description: s.title + ' with focus on breast augmentation and patient education.', schema, breadcrumbs: [{ label: 'Surgeons' }, { label: s.name }], body };
}

function consultationPage() {
  const body = '<h1>Book a Consultation</h1><p class="lead">Tell us about your enquiry and our patient coordinator will reply within one working day. No pressure, no guaranteed outcomes.</p>' + tpl.consultForm(null, 'consultation-main') + '<section><h2>Other ways to get in touch</h2><ul><li>WhatsApp India: <a href="https://wa.me/919000000000">+91 90000 00000</a></li><li>UAE: <a href="https://wa.me/97140000000">+971 4 000 0000</a></li><li>UK: <a href="https://wa.me/442000000000">+44 20 0000 0000</a></li></ul></section>' + tpl.disclaimerNote();
  const schema = [medicalWebPage({ title: 'Book a Consultation | ' + site.brand, description: 'Book a breast augmentation consultation across India, UAE and UK.', url: '/book-consultation/' }), breadcrumbList([{ label: 'Consultation' }])];
  return { url: '/book-consultation/', title: 'Book a Consultation | ' + site.brand, description: 'Request a breast augmentation consultation. Evidence-first, no pressure.', schema, breadcrumbs: [{ label: 'Consultation' }], body };
}

function blogIndex(posts) {
  const body = '<h1>Blog &amp; Patient Resources</h1><p class="lead">Short, evidence-aware articles on planning, safety and recovery.</p><ul>' + posts.map((p) => '<li><a href="/blog/' + p.slug + '/">' + p.data.title + '</a> — ' + (p.data.summary || '') + '</li>').join('') + '</ul>';
  return { url: '/blog/', title: 'Blog | ' + site.brand, description: 'Patient education articles on breast augmentation planning and safety.', schema: [medicalWebPage({ title: 'Blog | ' + site.brand, description: 'Breast augmentation blog posts.', url: '/blog/' })], breadcrumbs: [{ label: 'Blog' }], body };
}

function blogPost(p) {
  const d = p.data;
  const body = '<article><h1>' + d.title + '</h1>' + (d.summary ? '<p class="lead">' + d.summary + '</p>' : '') + p.html + tpl.disclaimerNote() + '</article>';
  const schema = [medicalWebPage({ title: d.seo_title || d.title, description: d.seo_description || d.summary || '', url: '/blog/' + d.slug + '/' }), articleSchema({ title: d.title, description: d.seo_description || d.summary || '', url: '/blog/' + d.slug + '/', firstPublished: d.first_published, lastReviewed: d.last_reviewed })];
  return { url: '/blog/' + d.slug + '/', title: d.seo_title || d.title, description: d.seo_description || (d.summary || '').slice(0, 155), schema, breadcrumbs: [{ label: 'Blog', href: '/blog/' }, { label: d.title }], body };
}

function simpleMdPage(slug) {
  const { data, html } = simplePage(slug);
  const body = '<h1>' + data.title + '</h1>' + html;
  return { url: '/' + slug + '/', title: data.seo_title || data.title, description: data.seo_description || '', schema: [medicalWebPage({ title: data.seo_title || data.title, description: data.seo_description || '', url: '/' + slug + '/' }), breadcrumbList([{ label: data.title }])], breadcrumbs: [{ label: data.title }], body };
}

function searchPage() {
  const body = '<h1>Search</h1><p class="lead">Find articles, costs and city guides across the site.</p><form id="search-form" class="consult-form"><input type="search" name="q" id="search-input" placeholder="Search…" aria-label="Search"><button class="btn btn-accent" type="submit">Search</button></form><div id="search-results" aria-live="polite"></div><script>window.__searchIndexUrl="/search-index.json";</script>';
  return { url: '/search/', title: 'Search | ' + site.brand, description: 'Search the QuantumHealth knowledge hub.', schema: [medicalWebPage({ title: 'Search | ' + site.brand, description: 'Search articles, costs and cities.', url: '/search/' })], breadcrumbs: [{ label: 'Search' }], body, robots: 'noindex, follow' };
}

function notFoundPage() {
  const body = '<h1>Page not found</h1><p class="lead">The page you were looking for could not be found. It may have moved or the link may be incorrect.</p><p><a class="btn btn-accent" href="/">Return home</a> <a class="btn btn-outline" href="/wiki/">Browse the wiki</a></p>';
  return { url: '/404.html', title: 'Page Not Found | ' + site.brand, description: 'The requested page could not be found.', schema: [], breadcrumbs: [], body, robots: 'noindex, nofollow' };
}

var wikiAll = [];
function getAll() {
  const wiki = loadWiki();
  wikiAll = wiki;
  const pages = [];
  pages.push(buildHome());
  ['in', 'uae', 'uk'].forEach((cc) => { pages.push(countryHome(cc)); pages.push(citiesIndex(cc)); pages.push(costPage(cc)); cities.filter((x) => x.country === cc).forEach((x) => pages.push(cityPage(x))); });
  pages.push(buildWikiIndex(wiki));
  wiki.forEach((a) => pages.push(wikiPage(a)));
  pages.push(buildGlossary());
  pages.push(surgeonPage());
  pages.push(consultationPage());
  const blogDir = path.join(__dirname, '..', 'content', 'blog');
  const blogPosts = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, html } = loadMd(path.join(blogDir, f));
    return { slug: data.slug || f.replace(/\.md$/, ''), data, html };
  }) : [];
  pages.push(blogIndex(blogPosts));
  blogPosts.forEach((p) => pages.push(blogPost(p)));
  ['about', 'medical-disclaimer', 'editorial-policy', 'privacy-policy', 'cookie-policy', 'contact'].forEach((s) => pages.push(simpleMdPage(s)));
  pages.push({ url: '/terms-of-use/', title: 'Terms of Use | ' + site.brand, description: 'Website terms of use for QuantumHealth.', schema: [medicalWebPage({ title: 'Terms of Use | ' + site.brand, description: 'Terms of use.', url: '/terms-of-use/' })], breadcrumbs: [{ label: 'Terms' }], body: '<h1>Terms of Use</h1><p>Use of this website is subject to these terms. Content is provided for general information only and is not medical advice.</p>' });
  pages.push({ url: '/patient-photography-consent/', title: 'Patient Photography Consent | ' + site.brand, description: 'Consent policy for patient photography.', schema: [], breadcrumbs: [], body: '<h1>Patient Photography Consent</h1><p>Where before/after images are shown (UAE/UK only, where permitted), written informed consent is required and documented. Images are never used without consent.</p>' });
  pages.push(searchPage());
  pages.push(notFoundPage());
  return pages;
}

module.exports = { getAll };
