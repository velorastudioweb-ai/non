'use strict';

/* Wikipedia "Breast augmentation" information library. The dataset is extracted
   from the English Wikipedia article "Breast augmentation" (a fixed revision)
   and is stored as a static JSON asset so it can be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'wikipedia-breast-augmentation.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Breast_augmentation', article: {}, purposes: [], incisions: [], placements: [], prostheses: [], categories: [], documents: [], facts: [], references: [] };
  }
}

const data = load();
const article = data.article || {};
const docs = data.documents || [];
const facts = data.facts || [];
const categories = data.categories || [];
const purposes = data.purposes || [];
const incisions = data.incisions || [];
const placements = data.placements || [];
const prostheses = data.prostheses || [];
const references = data.references || [];
const articleUrl = (data.article && data.article.url) || data.sourceUrl;
const byId = {};
docs.forEach((d) => { byId[d.id] = d; });

const n = (v) => Number(v || 0).toLocaleString('en-US');

const statBoxes = [
  { value: n(docs.length), label: 'Article sections' },
  { value: n(facts.length), label: 'Extracted facts' },
  { value: n(references.length), label: 'Key references' },
  { value: data.generated || '\u2014', label: 'Compiled' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function docCard(d) {
  const points = d.keyPoints && d.keyPoints.length
    ? '<ul>' + d.keyPoints.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>'
    : '';
  return '<article id="doc-' + esc(d.id) + '" style="margin-top:var(--sp-4)">' +
    '<h3 style="margin-bottom:.35rem"><a href="' + esc(d.url) + '" rel="noopener">' + esc(d.title) + '</a></h3>' +
    '<p class="eyebrow" style="margin:0 0 .6rem">' + esc(d.kind) + '</p>' +
    '<p>' + esc(d.summary) + '</p>' +
    points +
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read this section on Wikipedia \u2192</a></p>' +
    '</article>';
}

const categorySections = categories.map((c) => {
  const items = docs.filter((d) => d.category === c.id);
  if (!items.length) return '';
  return '<h2 class="h3" style="margin-top:var(--sp-6)">' + esc(c.name) + '</h2>' +
    '<p class="lead" style="font-size:var(--fs-sm)">' + esc(c.description) + '</p>' +
    items.map(docCard).join('');
}).join('');

const factRows = facts.map((f) => [
  '<strong>' + esc(f.topic) + '</strong>',
  esc(f.statement),
  '<a href="' + esc(articleUrl) + '" rel="noopener">' + esc(article.title || 'Wikipedia') + '</a>'
]);

const listRows = (arr) => arr.map((x) => ['<strong>' + esc(x.name) + '</strong>', esc(x.detail)]);

const referenceItems = references.map((r) => {
  const links = (r.links || []).map((l) => '<a href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) + '</a>').join(' &middot; ');
  return '<li id="ref-' + r.n + '">' + esc(r.citation) + (links ? '<br><span style="font-size:var(--fs-sm)">' + links + '</span>' : '') + '</li>';
}).join('');

const wikipediaAugmentationPage = {
  url: '/research/wikipedia-breast-augmentation/',
  slug: 'wikipedia-augmentation-research',
  h1: 'Wikipedia: Breast Augmentation Data',
  seoTitle: 'Wikipedia Breast Augmentation Data: Implants, Procedures & Risks | Breast Enlargement Guide',
  seoDescription: 'Structured data from the Wikipedia article on breast augmentation \u2014 ' + n(docs.length) + ' section summaries, implant types, five incision routes, four implant-pocket placements, ' + n(facts.length) + ' extracted facts and key references, linked to the original article.',
  bannerEyebrow: 'Source library',
  bannerLead: 'Everything the English Wikipedia article \u201cBreast augmentation\u201d covers \u2014 prostheses, surgical technique, recovery, complications, fat grafting and the patient \u2014 captured at a fixed revision and linked to the original.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'Wikipedia breast augmentation' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Wikipedia Breast Augmentation Data',
      description: 'A structured capture of the English Wikipedia article "Breast augmentation": implant types, surgical technique, complications, fat grafting, extracted facts and references.',
      url: site.url + '/research/wikipedia-breast-augmentation/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast augmentation' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Wikipedia article data for "breast augmentation"',
      description: 'Section summaries, purposes, incisions, placements, extracted facts and references from the Wikipedia article "Breast augmentation" (revision ' + (article.revisionId || '') + ').',
      url: site.url + '/research/wikipedia-breast-augmentation/',
      creator: {
        '@type': 'Organization',
        name: 'Wikipedia contributors',
        url: 'https://en.wikipedia.org/'
      },
      isAccessibleForFree: true,
      license: 'https://creativecommons.org/licenses/by-sa/4.0/',
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/wikipedia-breast-augmentation.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library captures the content of the English Wikipedia article <a href="' + esc(articleUrl) + '" rel="noopener">\u201cBreast augmentation\u201d</a> (also called breast enlargement) \u2014 its definition and three therapeutic purposes, the four implant types, the five incision routes and four pocket placements, recovery and complication data, fat-graft technique, the breastfeeding and toxicity sections, the psychology findings, ' + n(facts.length) + ' extracted facts and the key references. Every entry links back to the original article so wording and later edits can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library is \u2014 and what it is not',
      text:
        '<p>Wikipedia is a collaboratively edited, open encyclopedia. It is a starting point for orientation, not medical guidance: its articles are not written or reviewed by a clinician, and their content can change between visits. Nothing here is a recommendation of a procedure, implant or surgeon, and individual suitability always requires assessment by a qualified healthcare professional.</p>' +
        '<p>The data on this page was captured from revision ' + esc(article.revisionId || '') + ' of the article, last edited on ' + esc(article.lastEdited || '') + '. Wikipedia articles change over time \u2014 always read the <a href="' + esc(article.revisionUrl || articleUrl) + '" rel="noopener">current version</a> before relying on any point.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the Wikipedia article covers',
      lead: 'A long, technical article with 36 sections spanning prostheses, operative technique, complications, fat grafting and the patient.',
      cols: 3,
      items: [
        { icon: 'surgical', title: 'Implant prostheses', text: 'Saline, silicone-gel (five generations), alternative-composition and structured implants, plus their commercial history.' },
        { icon: 'minimally', title: 'Operative technique', text: 'Three therapeutic purposes, five incision routes (inframammary to transabdominal) and four pocket placements.' },
        { icon: 'downtime', title: 'Recovery and complications', text: 'Healing timelines, complication rates, rupture and detection, capsular contracture, revision surgery and systemic sickness.' },
        { icon: 'natural', title: 'Fat-graft augmentation', text: 'Autologous fat injection: indications, harvesting and refinement, external tissue expansion, post-mastectomy reconstruction and limits.' },
        { icon: 'safety', title: 'Function and safety', text: 'Breastfeeding with implants, breast-filler toxicity and the platinum catalyst used in silicone gel.' },
        { icon: 'personalised', title: 'The patient', text: 'Pre-operative psychology, reported satisfaction and self-esteem gains, bodybuilders, and the mental-health findings with their caveats.' }
      ]
    },
    {
      type: 'table',
      alt: true,
      eyebrow: 'Indications',
      heading: 'The three therapeutic purposes',
      lead: 'The article frames every prosthetic-breast placement under one of three purposes.',
      head: ['Purpose', 'What the article says'],
      rows: listRows(purposes),
      note: 'Condensed from the article\u2019s lead and \u201cBreast surgery procedures\u201d section.'
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All sections captured from the article</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives a short summary, the main extracted points and a direct link to that section of the Wikipedia article.</p>' +
        categorySections
    },
    {
      type: 'table',
      alt: true,
      eyebrow: 'Surgical technique',
      heading: 'Five types of surgical incision',
      lead: 'How the prosthesis reaches the implant pocket \u2014 and what each route means for scars, access and breastfeeding.',
      head: ['Incision', 'What the article says'],
      rows: listRows(incisions),
      note: 'Condensed from the \u201cTypes of surgical incision\u201d section. The incision route is chosen with the surgeon according to anatomy, implant type and goals.'
    },
    {
      type: 'table',
      eyebrow: 'Surgical technique',
      heading: 'Four implant-pocket placements',
      lead: 'Placements described in anatomical relation to the pectoralis major muscle.',
      head: ['Placement', 'What the article says'],
      rows: listRows(placements),
      note: 'Condensed from the \u201cImplant-pocket placement\u201d section. Placement affects coverage, rippling risk, recovery and how the implant moves.'
    },
    {
      type: 'table',
      alt: true,
      eyebrow: 'Implant types',
      heading: 'The four prosthesis types',
      lead: 'The four categories of breast prosthesis the article describes, two of which are discontinued.',
      head: ['Prosthesis', 'Category', 'Summary', 'Detail'],
      rows: prostheses.map((p) => ['<strong>' + esc(p.name) + '</strong>', esc(p.category), esc(p.summary), esc(p.detail)]),
      note: 'Condensed from the \u201cBreast-augmentation prostheses\u201d section. Implant availability differs by country and regulator.'
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the article',
      lead: 'The statements below condense what the Wikipedia article says about breast augmentation. The right-hand column links to the source article.',
      head: ['Topic', 'What the article says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased from the Wikipedia article. Wikipedia is open content that anyone can edit; verify against the linked article revision before relying on any point.'
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">Key references cited by the article</h2>' +
        '<p class="lead">A selection of the most load-bearing citations from the article\u2019s ' + n(article.referencesCount || 0) + '-reference list \u2014 the studies and regulator notices behind its rates and findings \u2014 with DOI and PubMed links where available.</p>' +
        '<ol class="ref-list">' + referenceItems + '</ol>' +
        '<p style="font-size:var(--fs-sm)"><a href="' + esc(article.revisionUrl || articleUrl) + '" rel="noopener">See the full reference list in the article \u2192</a></p>'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Source, licence and attribution',
      text:
        '<p>Text on this page is a condensed, paraphrased summary of the English Wikipedia article \u201cBreast augmentation\u201d, not a verbatim copy. The original article is available under the <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="noopener">Creative Commons Attribution-ShareAlike 4.0 licence (CC BY-SA 4.0)</a>; Wikipedia\u00ae is a registered trademark of the Wikimedia Foundation, Inc. This library stores summaries, extracted facts, reference selections and links only.</p>' +
        '<p>For the shorter Wikipedia overview of enlargement methods, see the <a href="/research/wikipedia-breast-enlargement/">Wikipedia breast enlargement library</a>. For regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a> and the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For academic patient education, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>, or read our <a href="/breast-enlargement-without-surgery/">evidence guide</a>.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/wikipedia-breast-augmentation.json">JSON</a>. It contains the article metadata, overview, purposes, incisions, placements, prosthesis types, section summaries, extracted facts and the selected key references.</p>'
    },
    stdCta({ heading: 'Want these findings put in context for your own decision?' })
  ]
};

module.exports = { wikipediaAugmentationPage };
