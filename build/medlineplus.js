'use strict';

/* MedlinePlus breast enlargement information library. The dataset is curated
   from MedlinePlus (U.S. National Library of Medicine) pages on breast
   augmentation surgery, recovery and related cosmetic breast procedures, and
   is stored as a static JSON asset so it can be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'medlineplus-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'MedlinePlus (U.S. National Library of Medicine)', sourceUrl: 'https://medlineplus.gov/', categories: [], documents: [], facts: [] };
  }
}

const data = load();
const docs = data.documents || [];
const facts = data.facts || [];
const categories = data.categories || [];
const byId = {};
docs.forEach((d) => { byId[d.id] = d; });

const n = (v) => Number(v || 0).toLocaleString('en-US');

const statBoxes = [
  { value: n(docs.length), label: 'MedlinePlus pages' },
  { value: n(facts.length), label: 'Extracted facts' },
  { value: n(categories.length), label: 'Topics' },
  { value: data.generated || '\u2014', label: 'Compiled' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function docCard(d) {
  const updated = d.updated ? ' \u00b7 Page last reviewed ' + d.updated : '';
  const points = d.keyPoints && d.keyPoints.length
    ? '<ul>' + d.keyPoints.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>'
    : '';
  return '<article id="doc-' + esc(d.id) + '" style="margin-top:var(--sp-4)">' +
    '<h3 style="margin-bottom:.35rem"><a href="' + esc(d.url) + '" rel="noopener">' + esc(d.title) + '</a></h3>' +
    '<p class="eyebrow" style="margin:0 0 .6rem">' + esc(d.kind) + updated + '</p>' +
    '<p>' + esc(d.summary) + '</p>' +
    points +
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read the original on medlineplus.gov \u2192</a></p>' +
    '</article>';
}

const categorySections = categories.map((c) => {
  const items = docs.filter((d) => d.category === c.id);
  if (!items.length) return '';
  return '<h2 class="h3" style="margin-top:var(--sp-6)">' + esc(c.name) + '</h2>' +
    '<p class="lead" style="font-size:var(--fs-sm)">' + esc(c.description) + '</p>' +
    items.map(docCard).join('');
}).join('');

const factRows = facts.map((f) => {
  const src = byId[f.source];
  const source = src
    ? '<a href="' + esc(src.url) + '" rel="noopener">' + esc(src.title) + '</a>'
    : esc(f.source || '');
  return ['<strong>' + esc(f.topic) + '</strong>', esc(f.statement), source];
});

const medlinePlusPage = {
  url: '/research/medlineplus-breast-enlargement/',
  slug: 'medlineplus-research',
  h1: 'MedlinePlus Breast Enlargement Information',
  seoTitle: 'MedlinePlus Breast Enlargement Information | Breast Augmentation, Recovery & Risks | Breast Enlargement Guide',
  seoDescription: 'A curated library of ' + n(docs.length) + ' MedlinePlus pages and ' + n(facts.length) + ' extracted facts on breast enlargement \u2014 breast augmentation surgery, incisions, risks, recovery, wound care and related procedures, with links to medlineplus.gov.',
  bannerEyebrow: 'Consumer health library',
  bannerLead: 'Breast enlargement information published by MedlinePlus, the U.S. National Library of Medicine \u2014 breast augmentation surgery, anaesthetic and incision options, risks, recovery and wound care, extracted and linked to the original medlineplus.gov pages.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'MedlinePlus information' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'MedlinePlus Breast Enlargement Information',
      description: 'A curated index of MedlinePlus pages about breast enlargement, breast augmentation surgery, recovery and related cosmetic breast procedures.',
      url: site.url + '/research/medlineplus-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'MedlinePlus pages and extracted facts for "breast enlargement"',
      description: 'Summaries, key points and source links for ' + n(docs.length) + ' MedlinePlus pages related to breast enlargement, breast augmentation surgery and recovery.',
      url: site.url + '/research/medlineplus-breast-enlargement/',
      creator: {
        '@type': 'Organization',
        name: 'MedlinePlus, U.S. National Library of Medicine',
        url: 'https://medlineplus.gov/'
      },
      isAccessibleForFree: true,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/medlineplus-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects MedlinePlus\u2019s public consumer-health information on breast enlargement: the breast augmentation operation itself, recovery and wound-care instructions, related breast procedures and the wider plastic and cosmetic surgery topic page. Every entry links to the original page on <a href="https://medlineplus.gov/" rel="noopener">medlineplus.gov</a>, so the wording, review dates and any subsequent updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library does and does not mean',
      text:
        '<p>MedlinePlus is a consumer-health information service of the U.S. National Library of Medicine. It does not provide medical advice, endorse any clinic, surgeon or treatment package, or approve breast enlargement as a procedure. Nothing here is a recommendation to have a treatment, and individual suitability can only be assessed in a consultation.</p>' +
        '<p>Summaries and key points are condensed from MedlinePlus pages for readability. They are not a substitute for the original documents, which may have been updated since this library was compiled on ' + esc(data.generated || 'the latest update') + '. Always read the current version on medlineplus.gov and discuss it with a qualified clinician.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the MedlinePlus information covers',
      lead: 'The library is grouped into five areas, from the operation itself to recovery, related procedures and visual resources.',
      cols: 3,
      items: [
        { icon: 'surgical', title: 'The procedure', text: 'What breast augmentation is, implant fills and placement, anaesthetic choices, the four incision routes and what implant choice affects.' },
        { icon: 'safety', title: 'Risks and safety', text: 'General and breast-specific risks, capsular contracture, breast implant-associated lymphoma and the reported systemic symptoms called breast implant illness.' },
        { icon: 'downtime', title: 'Recovery and wound care', text: 'Discharge instructions: activity and driving limits, dressings, drains, medicines and scar care, plus general care for an open surgical incision.' },
        { icon: 'personalised', title: 'Before surgery', text: 'Screening mammograms, disclosing pregnancy and all medicines, managing chronic conditions, stopping smoking and pausing blood thinners.' },
        { icon: 'evidence', title: 'Related procedures', text: 'Breast lift and breast reduction articles, the illustrated image series and the breast lift anatomy video.' },
        { icon: 'info', title: 'Topic hub', text: 'The Plastic and Cosmetic Surgery health topic page with statistics, clinical-trial searches, patient handouts and Spanish versions.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All MedlinePlus pages in this library</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives a short summary, the main extracted points and a direct link to the full MedlinePlus page.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the MedlinePlus pages',
      lead: 'The statements below summarise what MedlinePlus says about breast enlargement and the decisions around it. The right-hand column links to the source page.',
      head: ['Topic', 'What MedlinePlus says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased from MedlinePlus consumer health information. Pages carry their own review dates and may be updated; verify against the linked medlineplus.gov page before relying on any point.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Jurisdiction and copyright',
      text:
        '<p>MedlinePlus pages describe care in the United States; costs, professional registration, screening programmes and clinical standards differ between countries, and local standards still apply where a procedure is performed.</p>' +
        '<p>This library stores only original summaries, extracted facts and links to publicly available MedlinePlus pages. Encyclopedia and patient-instruction content on medlineplus.gov is produced by A.D.A.M. for the U.S. National Library of Medicine and remains subject to the MedlinePlus and A.D.A.M. terms of use.</p>' +
        '<p>For regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a> and the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For UK surgical-association patient guidance, see the <a href="/research/baaps-breast-enlargement/">BAAPS information library</a>. For Australian Government health advice, see the <a href="/research/healthdirect-breast-enlargement/">healthdirect information library</a>. For academic patient education, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/medlineplus-breast-enlargement.json">JSON</a>. It contains the page list, categories, summaries, key points and extracted facts, with source URLs.</p>'
    },
    stdCta({ heading: 'Want to discuss what the MedlinePlus guidance means for you?' })
  ]
};

module.exports = { medlinePlusPage };
