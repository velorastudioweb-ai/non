'use strict';

/* NHS breast enlargement information library. The dataset is extracted from
   NHS patient-information pages on breast enlargement (implants) and related
   cosmetic-procedure advice, and is stored as a static JSON asset so it can
   be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'nhs-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'National Health Service (NHS, UK)', sourceUrl: 'https://www.nhs.uk/', categories: [], documents: [], facts: [] };
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
  { value: n(docs.length), label: 'NHS pages' },
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
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read the original on nhs.uk \u2192</a></p>' +
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

const nhsPage = {
  url: '/research/nhs-breast-enlargement/',
  slug: 'nhs-research',
  h1: 'NHS Breast Enlargement Information',
  seoTitle: 'NHS Breast Enlargement Information | Breast Implants, Costs & Safety || Quantum Health',
  seoDescription: 'A curated library of ' + n(docs.length) + ' NHS patient-information pages and ' + n(facts.length) + ' extracted facts on breast enlargement, implants, costs, recovery, complications and choosing a surgeon, with links to nhs.uk.',
  bannerEyebrow: 'Regulator library',
  bannerLead: 'Breast enlargement information published by the National Health Service \u2014 the operation, costs, implant choices, recovery, complications, BIA-ALCL, PIP implants and choosing a surgeon, extracted and linked to the original nhs.uk pages.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'NHS information' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'NHS Breast Enlargement Information',
      description: 'A curated index of NHS patient-information pages about breast enlargement, breast implants, cosmetic procedure decisions and choosing a practitioner.',
      url: site.url + '/research/nhs-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'NHS pages and extracted facts for "breast enlargement"',
      description: 'Summaries, key points and source links for ' + n(docs.length) + ' NHS pages related to breast enlargement and cosmetic procedures.',
      url: site.url + '/research/nhs-breast-enlargement/',
      creator: {
        '@type': 'Organization',
        name: 'National Health Service (NHS, UK)',
        url: 'https://www.nhs.uk/'
      },
      isAccessibleForFree: true,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/nhs-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects the NHS\u2019s public patient information on breast enlargement and the decisions around it. Every entry links to the original page on <a href="https://www.nhs.uk/" rel="noopener">nhs.uk</a>, so the wording, review dates and any subsequent updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library does and does not mean',
      text:
        '<p>The NHS is a national health service, not a regulator of cosmetic procedures. Its pages describe how breast enlargement is provided and funded in the UK, what the operation involves and what can go wrong. Nothing here is a recommendation to have a procedure, and the NHS does not endorse any clinic, surgeon or treatment package.</p>' +
        '<p>Summaries and key points are condensed from NHS pages for readability. They are not a substitute for the original documents, which may have been updated since this library was compiled on ' + esc(data.generated || 'the latest update') + '. Always read the current version on nhs.uk and discuss it with a qualified clinician.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the NHS information covers',
      lead: 'The library is grouped into five areas, from the procedure itself to decisions, practitioner checks, funding and surgery abroad.',
      cols: 3,
      items: [
        { icon: 'surgical', title: 'The procedure', text: 'What breast enlargement involves, anaesthetic, operation time, implant types and placement, and how long implants last.' },
        { icon: 'downtime', title: 'Recovery and risks', text: 'Time off work, driving and exercise limits, and the complications the NHS lists, from capsular contracture to rupture.' },
        { icon: 'safety', title: 'Safety concerns', text: 'BIA-ALCL, breast implant illness, PIP implants, the implant registry and reporting problems through the Yellow Card Scheme.' },
        { icon: 'personalised', title: 'Decisions and consent', text: 'Questions to ask yourself, cooling-off periods, avoiding pressure, and what to ask a surgeon at consultation.' },
        { icon: 'evidence', title: 'Funding and screening', text: 'When the NHS may fund breast enlargement, UK costs, and breast screening and mammograms after implants.' },
        { icon: 'info', title: 'Practitioner checks', text: 'CQC clinic registration, the GMC medical register, RCS certification, and BAAPS, BAPRAS, JCCP and Save Face registers.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All NHS pages in this library</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives a short summary, the main extracted points and a direct link to the full NHS page.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the NHS pages',
      lead: 'The statements below summarise what the NHS says about breast enlargement and related decisions. The right-hand column links to the source page.',
      head: ['Topic', 'What the NHS says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased from NHS patient information. Pages are reviewed periodically; verify against the linked nhs.uk page before relying on any point.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Jurisdiction and copyright',
      text:
        '<p>NHS pages describe practice and funding in the United Kingdom. Costs, clinic registration, funding rules and professional registers differ between countries, and local standards still apply where a procedure is performed.</p>' +
        '<p>Contains public sector information licensed under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="noopener">Open Government Licence v3.0</a>. This library stores only summaries, extracted facts and links; NHS website content is Crown copyright.</p>' +
        '<p>For regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a>. For UK surgical-association patient guidance, see the <a href="/research/baaps-breast-enlargement/">BAAPS information library</a>. For Australian Government health advice, see the <a href="/research/healthdirect-breast-enlargement/">healthdirect information library</a>. For academic patient education on augmentation, implants and fat transfer, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For professional-society patient information on breast augmentation, see the <a href="/research/asps-breast-enlargement/">ASPS information library</a>. For U.S. consumer health information on the operation and recovery, see the <a href="/research/medlineplus-breast-enlargement/">MedlinePlus information library</a>. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>, or read our <a href="/breast-enlargement-without-surgery/">evidence guide</a>. For professional-association patient guidance, see the <a href="/research/bapras-breast-augmentation/">BAPRAS patient guide</a>.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/nhs-breast-enlargement.json">JSON</a>. It contains the page list, categories, summaries, key points and extracted facts, with source URLs.</p>'
    },
    stdCta({ heading: 'Want to discuss what the NHS guidance means for you?' })
  ]
};

module.exports = { nhsPage };
