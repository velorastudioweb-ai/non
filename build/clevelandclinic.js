'use strict';

/* Cleveland Clinic breast enlargement information library. The dataset is
   extracted from Cleveland Clinic Health Library pages on breast
   augmentation, breast implants and fat transfer breast augmentation, and is
   stored as a static JSON asset so it can be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'clevelandclinic-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'Cleveland Clinic', sourceUrl: 'https://my.clevelandclinic.org/', categories: [], documents: [], facts: [] };
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
  { value: n(docs.length), label: 'Cleveland Clinic pages' },
  { value: n(facts.length), label: 'Extracted facts' },
  { value: n(categories.length), label: 'Topics' },
  { value: data.generated || '\u2014', label: 'Compiled' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function docCard(d) {
  const updated = d.updated ? ' \u00b7 Medically reviewed, last updated ' + d.updated : '';
  const points = d.keyPoints && d.keyPoints.length
    ? '<ul>' + d.keyPoints.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>'
    : '';
  return '<article id="doc-' + esc(d.id) + '" style="margin-top:var(--sp-4)">' +
    '<h3 style="margin-bottom:.35rem"><a href="' + esc(d.url) + '" rel="noopener">' + esc(d.title) + '</a></h3>' +
    '<p class="eyebrow" style="margin:0 0 .6rem">' + esc(d.kind) + updated + '</p>' +
    '<p>' + esc(d.summary) + '</p>' +
    points +
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read the original on my.clevelandclinic.org \u2192</a></p>' +
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

const clevelandClinicPage = {
  url: '/research/cleveland-clinic-breast-enlargement/',
  slug: 'cleveland-clinic-research',
  h1: 'Cleveland Clinic Breast Enlargement Information',
  seoTitle: 'Cleveland Clinic Breast Enlargement Information | Augmentation, Implants & Fat Transfer | Breast Enlargement Guide',
  seoDescription: 'A curated library of ' + n(docs.length) + ' Cleveland Clinic Health Library pages and ' + n(facts.length) + ' extracted facts on breast augmentation, breast implants and fat transfer breast augmentation \u2014 types, surgery, recovery, risks and candidacy, with links to my.clevelandclinic.org.',
  bannerEyebrow: 'Clinical library',
  bannerLead: 'Breast enlargement information published by the Cleveland Clinic \u2014 breast augmentation, breast implant types, fat transfer, surgery, recovery and complications, extracted and linked to the original Health Library pages.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'Cleveland Clinic information' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Cleveland Clinic Breast Enlargement Information',
      description: 'A curated index of Cleveland Clinic Health Library pages about breast augmentation, breast implants and fat transfer breast augmentation.',
      url: site.url + '/research/cleveland-clinic-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Cleveland Clinic pages and extracted facts for "breast enlargement"',
      description: 'Summaries, key points and source links for ' + n(docs.length) + ' Cleveland Clinic pages related to breast enlargement, breast implants and fat transfer.',
      url: site.url + '/research/cleveland-clinic-breast-enlargement/',
      creator: {
        '@type': 'Organization',
        name: 'Cleveland Clinic',
        url: 'https://my.clevelandclinic.org/'
      },
      isAccessibleForFree: true,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/clevelandclinic-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects the Cleveland Clinic\u2019s public Health Library information on breast enlargement: breast augmentation, breast implants and fat transfer breast augmentation. Every entry links to the original page on <a href="https://my.clevelandclinic.org/" rel="noopener">my.clevelandclinic.org</a>, so the wording, review dates and any subsequent updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library does and does not mean',
      text:
        '<p>Cleveland Clinic is an academic medical center that publishes patient education; it does not endorse any clinic, surgeon or treatment package, and nothing here is a recommendation to have a procedure. Individual suitability and outcomes require assessment by a qualified clinician.</p>' +
        '<p>Summaries and key points are condensed from Cleveland Clinic pages for readability. They are not a substitute for the original documents, which may have been updated since this library was compiled on ' + esc(data.generated || 'the latest update') + '. Always read the current version on my.clevelandclinic.org and discuss it with a qualified clinician.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the Cleveland Clinic information covers',
      lead: 'The library is grouped into three areas, from the augmentation procedure itself to implants and fat transfer.',
      cols: 3,
      items: [
        { icon: 'surgical', title: 'The procedure', text: 'What breast augmentation is, the two main types, consultation, preparation, anaesthesia, incisions, implant placement and aftercare.' },
        { icon: 'downtime', title: 'Recovery and risks', text: 'Time off work, recovery timelines of six to eight weeks, side effects, complications from capsular contracture to rupture, and when to call the doctor.' },
        { icon: 'safety', title: 'Safety concerns', text: 'BIA-ALCL and textured implants, cancer screening and mammograms with implants, breastfeeding effects and long-term implant monitoring.' },
        { icon: 'evidence', title: 'Breast implants', text: 'Implant types, age limits for saline and silicone, natural look and feel, sizing, placement, incision options and how long implants last.' },
        { icon: 'minimally', title: 'Fat transfer', text: 'Candidacy, the liposuction and injection technique, lifelong results, one-to-two-cup-size limits, risks and mammograms afterwards.' },
        { icon: 'personalised', title: 'Decisions and costs', text: 'Questions to ask at consultation, why people choose augmentation, insurance coverage, reversibility and breastfeeding considerations.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All Cleveland Clinic pages in this library</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives a short summary, the main extracted points and a direct link to the full Cleveland Clinic page.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the Cleveland Clinic pages',
      lead: 'The statements below summarise what Cleveland Clinic says about breast enlargement and related topics. The right-hand column links to the source page.',
      head: ['Topic', 'What Cleveland Clinic says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased from Cleveland Clinic patient information. Pages are medically reviewed and updated periodically; verify against the linked my.clevelandclinic.org page before relying on any point.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Source and copyright',
      text:
        '<p>Cleveland Clinic pages describe care in the United States; costs, licensing, professional registration and clinical standards differ between countries, and local standards still apply where a procedure is performed.</p>' +
        '<p>This library stores only summaries, extracted facts and links to publicly available Cleveland Clinic Health Library pages. Cleveland Clinic content remains the property of the Cleveland Clinic and is subject to its <a href="https://my.clevelandclinic.org/about/website/terms-of-use" rel="noopener">website terms of use</a>.</p>' +
        '<p>For regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a> and the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For UK surgical-association patient guidance, see the <a href="/research/baaps-breast-enlargement/">BAAPS information library</a>. For Australian Government health advice, see the <a href="/research/healthdirect-breast-enlargement/">healthdirect information library</a>. For professional-society patient information on breast augmentation, see the <a href="/research/asps-breast-enlargement/">ASPS information library</a>. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/clevelandclinic-breast-enlargement.json">JSON</a>. It contains the page list, categories, summaries, key points and extracted facts, with source URLs.</p>'
    },
    stdCta({ heading: 'Want to discuss what the Cleveland Clinic guidance means for you?' })
  ]
};

module.exports = { clevelandClinicPage };
