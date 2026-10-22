'use strict';

/* FDA breast enlargement information library. The dataset is curated from
   fda.gov pages on breast implants, BIA-ALCL, dermal fillers and injectable
   silicone, and is stored as a static JSON asset so it can be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'fda-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'U.S. Food and Drug Administration (FDA)', sourceUrl: 'https://www.fda.gov/', categories: [], documents: [], facts: [] };
  }
}

const data = load();
const docs = data.documents || [];
const facts = data.facts || [];
const categories = data.categories || [];
const byId = {};
docs.forEach((d) => { byId[d.id] = d; });

const count = (id) => docs.filter((d) => d.category === id).length;
const n = (v) => Number(v || 0).toLocaleString('en-US');

const statBoxes = [
  { value: n(docs.length), label: 'FDA documents' },
  { value: n(facts.length), label: 'Extracted facts' },
  { value: n(categories.length), label: 'Topics' },
  { value: data.generated || '\u2014', label: 'Compiled' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function docCard(d) {
  const updated = d.updated ? ' \u00b7 Content current as of ' + d.updated : '';
  const points = d.keyPoints && d.keyPoints.length
    ? '<ul>' + d.keyPoints.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>'
    : '';
  return '<article id="doc-' + esc(d.id) + '" style="margin-top:var(--sp-4)">' +
    '<h3 style="margin-bottom:.35rem"><a href="' + esc(d.url) + '" rel="noopener">' + esc(d.title) + '</a></h3>' +
    '<p class="eyebrow" style="margin:0 0 .6rem">' + esc(d.kind) + updated + '</p>' +
    '<p>' + esc(d.summary) + '</p>' +
    points +
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read the original on fda.gov \u2192</a></p>' +
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

const fdaPage = {
  url: '/research/fda-breast-enlargement/',
  slug: 'fda-research',
  h1: 'FDA Breast Enlargement Information',
  seoTitle: 'FDA Breast Enlargement Information | Breast Implants, Fillers & Safety || Quantum Health',
  seoDescription: 'A curated library of ' + n(docs.length) + ' FDA documents and ' + n(facts.length) + ' extracted facts on breast enlargement, breast implants, BIA-ALCL, dermal fillers and injectable silicone, with links to fda.gov.',
  bannerEyebrow: 'Regulator library',
  bannerLead: 'Breast enlargement information published by the U.S. Food and Drug Administration \u2014 breast implants, BIA-ALCL, dermal fillers and injectable silicone, extracted and linked to the original fda.gov pages.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'FDA information' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'FDA Breast Enlargement Information',
      description: 'A curated index of FDA documents about breast enlargement, breast implants, BIA-ALCL, dermal fillers and injectable silicone.',
      url: site.url + '/research/fda-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'FDA documents and extracted facts for "breast enlargement"',
      description: 'Summaries, key points and source links for ' + n(docs.length) + ' FDA documents related to breast enlargement, breast implants and injectable fillers.',
      url: site.url + '/research/fda-breast-enlargement/',
      creator: {
        '@type': 'Organization',
        name: 'U.S. Food and Drug Administration (FDA)',
        url: 'https://www.fda.gov/'
      },
      isAccessibleForFree: true,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/fda-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects the FDA\u2019s public information on breast enlargement and the products used for it. Every entry links to the original page on <a href="https://www.fda.gov/" rel="noopener">fda.gov</a>, so the wording, dates and any subsequent updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library does and does not mean',
      text:
        '<p>The FDA regulates medical devices such as breast implants and dermal fillers. It does not approve breast enlargement as a procedure, and it does not endorse any clinic, surgeon or treatment package. A document appearing here is not a recommendation to have a treatment.</p>' +
        '<p>Summaries and key points are condensed from FDA pages for readability. They are not a substitute for the original documents, which may have been updated since this library was compiled on ' + esc(data.generated || 'the latest update') + '. Always read the current version on fda.gov and discuss it with a qualified clinician.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the FDA information covers',
      lead: 'The library is grouped into five areas, from implant regulation and safety to fillers, cancers and patient reporting.',
      cols: 3,
      items: [
        { icon: 'evidence', title: 'Implant regulation', text: 'Approved implant types, age indications, labeling requirements and restrictions on sale and distribution.' },
        { icon: 'safety', title: 'Safety and complications', text: 'Capsular contracture, rupture, reoperation, monitoring, breast implant illness and long-term follow-up.' },
        { icon: 'scale', title: 'Cancers', text: 'BIA-ALCL, squamous cell carcinoma and other lymphomas reported in the capsule around breast implants.' },
        { icon: 'minimally', title: 'Fillers and silicone', text: 'Approved facial uses, the FDA position on fillers for breast enlargement, and warnings about injectable silicone.' },
        { icon: 'info', title: 'Consumer guidance', text: 'Decision checklists, patient labeling and how to report adverse events or suspected illegal products.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All FDA documents in this library</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives a short summary, the main extracted points and a direct link to the full FDA page.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the FDA pages',
      lead: 'The statements below summarise the FDA position on breast enlargement and related products. The right-hand column links to the source document.',
      head: ['Topic', 'What the FDA says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased. Regulatory positions can change; verify against the linked FDA page before relying on any point.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Regulatory scope and jurisdiction',
      text:
        '<p>FDA statements describe the position of the U.S. regulator. Approvals, warnings and labeling requirements can differ in other countries, and the FDA does not regulate where a procedure is performed or by whom outside its jurisdiction. Local registration, advertising rules and clinical standards still apply.</p>' +
        '<p>For published research rather than regulator guidance, see the <a href="/research/breast-enlargement/">PMC research library</a>. For UK patient information, see the <a href="/research/nhs-breast-enlargement/">NHS information library</a> and the <a href="/research/baaps-breast-enlargement/">BAAPS information library</a>. For Australian Government health advice, see the <a href="/research/healthdirect-breast-enlargement/">healthdirect information library</a>. For academic patient education on augmentation and implants, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For professional-society patient information on breast augmentation, see the <a href="/research/asps-breast-enlargement/">ASPS information library</a>. For U.S. consumer health information on the operation and recovery, see the <a href="/research/medlineplus-breast-enlargement/">MedlinePlus information library</a>. For an evidence overview of non-surgical options, see the <a href="/breast-enlargement-without-surgery/">evidence guide</a>. For professional-association patient guidance, see the <a href="/research/bapras-breast-augmentation/">BAPRAS patient guide</a>.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/fda-breast-enlargement.json">JSON</a>. It contains the document list, categories, summaries, key points and extracted facts, with source URLs. FDA website content is subject to the <a href="https://www.fda.gov/about-fda/about-website/website-policies" rel="noopener">FDA website policies</a>; this library stores only summaries and links.</p>'
    },
    stdCta({ heading: 'Want to discuss what the FDA guidance means for you?' })
  ]
};

module.exports = { fdaPage };
