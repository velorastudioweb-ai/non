'use strict';

/* BAAPS breast enlargement information library. The dataset is extracted from
   British Association of Aesthetic Plastic Surgeons patient pages and the
   joint ABS, BAAPS & BAPRAS "Your Guide to Breast Augmentation" booklet, and
   is stored as a static JSON asset so it can be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'baaps-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'British Association of Aesthetic Plastic Surgeons (BAAPS)', sourceUrl: 'https://baaps.org.uk/', categories: [], documents: [], facts: [] };
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
  { value: n(docs.length), label: 'BAAPS sources' },
  { value: n(facts.length), label: 'Extracted facts' },
  { value: n(categories.length), label: 'Topics' },
  { value: data.generated || '\u2014', label: 'Compiled' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function docCard(d) {
  const updated = d.updated ? ' \u00b7 Updated ' + d.updated : '';
  const points = d.keyPoints && d.keyPoints.length
    ? '<ul>' + d.keyPoints.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>'
    : '';
  return '<article id="doc-' + esc(d.id) + '" style="margin-top:var(--sp-4)">' +
    '<h3 style="margin-bottom:.35rem"><a href="' + esc(d.url) + '" rel="noopener">' + esc(d.title) + '</a></h3>' +
    '<p class="eyebrow" style="margin:0 0 .6rem">' + esc(d.kind) + updated + '</p>' +
    '<p>' + esc(d.summary) + '</p>' +
    points +
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read the original on baaps.org.uk \u2192</a></p>' +
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

const baapsPage = {
  url: '/research/baaps-breast-enlargement/',
  slug: 'baaps-research',
  h1: 'BAAPS Breast Enlargement Information',
  seoTitle: 'BAAPS Breast Enlargement Information | Augmentation Guide, Implant Safety & Consumer Advice | QuantumHealth',
  seoDescription: 'A curated library of ' + n(docs.length) + ' ABS/BAAPS/BAPRAS sources and ' + n(facts.length) + ' extracted facts on breast enlargement — the joint patient booklet, implant safety (BII, BIA-ALCL, PIP) and consumer safety guidelines, with links to baaps.org.uk.',
  bannerEyebrow: 'Association library',
  bannerLead: 'Breast enlargement information published by the British Association of Aesthetic Plastic Surgeons \u2014 the joint ABS, BAAPS and BAPRAS patient booklet, breast implant safety and consumer safety guidance, extracted and linked to the original baaps.org.uk pages.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'BAAPS information' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'BAAPS Breast Enlargement Information',
      description: 'A curated index of BAAPS patient information about breast enlargement, the joint ABS/BAAPS/BAPRAS patient booklet, breast implant safety and consumer safety guidelines.',
      url: site.url + '/research/baaps-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'BAAPS sources and extracted facts for "breast enlargement"',
      description: 'Summaries, key points and source links for ' + n(docs.length) + ' BAAPS patient information sources related to breast enlargement, implant safety and consumer guidance.',
      url: site.url + '/research/baaps-breast-enlargement/',
      creator: {
        '@type': 'Organization',
        name: 'British Association of Aesthetic Plastic Surgeons (BAAPS)',
        url: 'https://baaps.org.uk/'
      },
      isAccessibleForFree: true,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/baaps-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects the BAAPS\u2019s public patient information on breast enlargement and the decisions around it \u2014 including the joint ABS, BAAPS and BAPRAS booklet <em>Your Guide to Breast Augmentation</em>. Every entry links to the original page or PDF on <a href="https://baaps.org.uk/" rel="noopener">baaps.org.uk</a>, so the wording, dates and any subsequent updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library does and does not mean',
      text:
        '<p>BAAPS is a professional association of aesthetic plastic surgeons; it publishes patient education and safety guidance but does not endorse any particular clinic, surgeon outside its membership, or treatment package. Nothing here is a recommendation to have a procedure, and individual suitability always requires assessment by a qualified clinician.</p>' +
        '<p>Summaries and key points are condensed from BAAPS pages and the joint patient booklet for readability. They are not a substitute for the original documents, which may have been updated since this library was compiled on ' + esc(data.generated || 'the latest update') + '. Always read the current version on baaps.org.uk and discuss it with a qualified clinician.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the BAAPS information covers',
      lead: 'The library is grouped into four areas, from the procedure itself to implant safety and consumer guidance.',
      cols: 3,
      items: [
        { icon: 'surgical', title: 'The procedure', text: 'What breast augmentation involves, consultation and consent, implant placement, operation time, recovery and expected outcomes.' },
        { icon: 'evidence', title: 'The patient booklet', text: 'The joint ABS, BAAPS and BAPRAS guide: decisions, costs, techniques, implant type, size, shape and texture, complications with frequencies, long-term consequences and alternatives.' },
        { icon: 'safety', title: 'Implant safety', text: 'Breast Implant Illness (BII), BIA-ALCL, BIA-SCC, PIP implants and the association\u2019s published safety statements.' },
        { icon: 'personalised', title: 'Consumer guidance', text: 'Fourteen safety points covering your own decision, research, questions, credentials, cooling-off periods, timing and taking your time.' },
        { icon: 'downtime', title: 'Complications', text: 'Bleeding, infection, asymmetry, capsular contracture, sensation changes, palpability, rupture and revision rates with typical frequencies from the booklet.' },
        { icon: 'minimally', title: 'Alternatives', text: 'Fat transfer (lipofilling) and breast uplift (mastopexy) as alternatives or adjuncts to implant augmentation, and the UK implant registry.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All BAAPS sources in this library</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives a short summary, the main extracted points and a direct link to the full BAAPS page or PDF.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the BAAPS sources',
      lead: 'The statements below summarise what BAAPS and the joint booklet say about breast enlargement and related decisions. The right-hand column links to the source page.',
      head: ['Topic', 'What BAAPS says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased from BAAPS patient information and the joint ABS, BAAPS and BAPRAS booklet (Edition 2, 2021). Sources are reviewed and updated periodically; verify against the linked baaps.org.uk page or PDF before relying on any point.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Source and copyright',
      text:
        '<p>BAAPS patient information describes practice in the United Kingdom; costs, funding, professional registration and clinical standards differ between countries, and local standards still apply where a procedure is performed. Cosmetic breast augmentation is generally private in the UK; the NHS may fund it only in exceptional circumstances.</p>' +
        '<p>The joint booklet <em>Your Guide to Breast Augmentation</em> is published by the Association of Breast Surgery, BAAPS and BAPRAS (Edition 2, BAPRAS London, 2021; editors Lee Martin and Emma de Sousa; reviewed by PRASEAG). This library stores only summaries, extracted facts and links to publicly available BAAPS pages and PDFs; BAAPS content remains the property of BAAPS and the respective publishing bodies.</p>' +
        '<p>For US regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a>. For UK health-service guidance, see the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For academic patient education, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/baaps-breast-enlargement.json">JSON</a>. It contains the source list, categories, summaries, key points and extracted facts, with source URLs.</p>'
    },
    stdCta({ heading: 'Want to discuss what the BAAPS guidance means for you?' })
  ]
};

module.exports = { baapsPage };
