'use strict';

/* ASPS breast enlargement information library. The dataset is extracted from
   American Society of Plastic Surgeons patient-information pages on breast
   augmentation and fat transfer breast augmentation, and is stored as a static
   JSON asset so it can be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'asps-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'American Society of Plastic Surgeons (ASPS)', sourceUrl: 'https://www.plasticsurgery.org/', categories: [], documents: [], facts: [] };
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
  { value: n(docs.length), label: 'ASPS pages' },
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
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read the original on plasticsurgery.org \u2192</a></p>' +
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

const aspsPage = {
  url: '/research/asps-breast-enlargement/',
  slug: 'asps-research',
  h1: 'ASPS Breast Augmentation Information',
  seoTitle: 'ASPS Breast Augmentation Information | Breast Implants, Costs & Safety | QuantumHealth',
  seoDescription: 'A curated library of ' + n(docs.length) + ' ASPS patient-information pages and ' + n(facts.length) + ' extracted facts on breast augmentation, implant types, costs, preparation, recovery, risks and choosing a plastic surgeon, with links to plasticsurgery.org.',
  bannerEyebrow: 'Professional society library',
  bannerLead: 'Breast augmentation information published by the American Society of Plastic Surgeons \u2014 what the procedure is, candidates, consultation, costs, implant types, safety, preparation, recovery, results and choosing a surgeon, extracted and linked to the original plasticsurgery.org pages.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'ASPS information' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'ASPS Breast Augmentation Information',
      description: 'A curated index of American Society of Plastic Surgeons patient-information pages about breast augmentation, breast implants, fat transfer, cost, recovery and choosing a plastic surgeon.',
      url: site.url + '/research/asps-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast augmentation' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'ASPS pages and extracted facts for "breast enlargement"',
      description: 'Summaries, key points and source links for ' + n(docs.length) + ' ASPS pages related to breast augmentation and fat transfer breast augmentation.',
      url: site.url + '/research/asps-breast-enlargement/',
      creator: {
        '@type': 'Organization',
        name: 'American Society of Plastic Surgeons',
        url: 'https://www.plasticsurgery.org/'
      },
      isAccessibleForFree: true,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/asps-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects the American Society of Plastic Surgeons\u2019 public patient information on breast enlargement: the overview page, candidacy, consultation, questions to ask, cost, implant types, risks and safety, preparation, procedure steps, recovery, results, choosing a surgeon and fat transfer. Every entry links to the original page on <a href="https://www.plasticsurgery.org/" rel="noopener">plasticsurgery.org</a>, so the wording and any subsequent updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library does and does not mean',
      text:
        '<p>ASPS is a professional membership organization for board-certified plastic surgeons, not a government regulator and not a clinic. Its pages describe breast augmentation as performed by its member surgeons and the standards it expects of them. Nothing here is a recommendation to have a procedure, and ASPS does not endorse any individual surgeon, clinic or product.</p>' +
        '<p>Summaries and key points are condensed from ASPS pages for readability. They are not a substitute for the original documents, which may have been updated since this library was compiled on ' + esc(data.generated || 'the latest update') + '. Always read the current version on plasticsurgery.org and discuss it with a qualified clinician.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the ASPS information covers',
      lead: 'The library is grouped into six areas, from the overview of the operation to devices, safety, aftercare, fat transfer and the surgeon credentials to check.',
      cols: 3,
      items: [
        { icon: 'personalised', title: 'Decisions and consent', text: 'What augmentation can and cannot do, who makes a candidate, what happens at consultation and the questions the ASPS checklist tells patients to ask.' },
        { icon: 'surgical', title: 'Implants and techniques', text: 'Saline, silicone and structured fills, form-stable, round, smooth and textured surfaces, incision and placement options, and the five procedure steps.' },
        { icon: 'safety', title: 'Risks and safety', text: 'Capsular contracture, rupture, BIA-ALCL, BIA-SCC, breast implant illness, the fact that implants are not lifetime devices and the FDA screening intervals.' },
        { icon: 'downtime', title: 'Preparation and recovery', text: 'Medication and substance changes before surgery, accredited facilities, support at home, discharge timing, pain timeline and how results settle.' },
        { icon: 'evidence', title: 'Fat transfer', text: 'Using your own fat harvested by liposuction for a smaller, natural-feeling increase, and the ASPS-cited research behind the technique.' },
        { icon: 'info', title: 'Cost and credentials', text: 'Average surgeon fees for implant and fat-grafting augmentation, what those figures exclude, insurance position, board certification and facility standards.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All ASPS pages in this library</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives a short summary, the main extracted points and a direct link to the full ASPS page.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the ASPS pages',
      lead: 'The statements below summarise what ASPS says about breast enlargement and related decisions. The right-hand column links to the source page.',
      head: ['Topic', 'What ASPS says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased from ASPS patient information. Verify against the linked plasticsurgery.org page before relying on any point, and note that fee figures are national averages reported by ASPS.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Jurisdiction and copyright',
      text:
        '<p>ASPS pages describe practice, board certification and fees in the United States. Board-certification bodies, FDA device approvals, facility accreditation and insurance rules are US arrangements, and standards differ between countries.</p>' +
        '<p>This library stores only summaries, extracted facts and links to publicly available ASPS pages. Website content of the American Society of Plastic Surgeons is their property and is subject to their <a href="https://www.plasticsurgery.org/terms-and-conditions" rel="noopener">terms and conditions</a>.</p>' +
        '<p>For regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a>. For UK patient information, see the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For Australian Government health advice, see the <a href="/research/healthdirect-breast-enlargement/">healthdirect information library</a>. For academic patient education, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/asps-breast-enlargement.json">JSON</a>. It contains the page list, categories, summaries, key points and extracted facts, with source URLs.</p>'
    },
    stdCta({ heading: 'Want to discuss what the ASPS guidance means for you?' })
  ]
};

module.exports = { aspsPage };
