'use strict';

/* healthdirect breast enlargement information library. The dataset is
   extracted from the healthdirect (Australian Government) patient-information
   page on breast augmentation (breast implants) and its linked Australian
   resources, and is stored as a static JSON asset so it can be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'healthdirect-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'healthdirect (Australian Government)', sourceUrl: 'https://www.healthdirect.gov.au/', categories: [], documents: [], facts: [], references: [], relatedPages: [] };
  }
}

const data = load();
const docs = data.documents || [];
const facts = data.facts || [];
const categories = data.categories || [];
const references = data.references || [];
const relatedPages = data.relatedPages || [];
const byId = {};
docs.forEach((d) => { byId[d.id] = d; });

const n = (v) => Number(v || 0).toLocaleString('en-US');

const statBoxes = [
  { value: n(docs.length), label: 'Page sections' },
  { value: n(facts.length), label: 'Extracted facts' },
  { value: n(categories.length), label: 'Topics' },
  { value: data.reviewed || data.generated || '\u2014', label: 'Last reviewed' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function docCard(d) {
  const updated = d.updated ? ' \u00b7 Reviewed ' + d.updated : '';
  const points = d.keyPoints && d.keyPoints.length
    ? '<ul>' + d.keyPoints.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>'
    : '';
  return '<article id="doc-' + esc(d.id) + '" style="margin-top:var(--sp-4)">' +
    '<h3 style="margin-bottom:.35rem"><a href="' + esc(d.url) + '" rel="noopener">' + esc(d.title) + '</a></h3>' +
    '<p class="eyebrow" style="margin:0 0 .6rem">' + esc(d.kind) + updated + '</p>' +
    '<p>' + esc(d.summary) + '</p>' +
    points +
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read the original on healthdirect.gov.au \u2192</a></p>' +
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

const referenceItems = references.map((r) =>
  '<li><a href="' + esc(r.url) + '" rel="noopener">' + esc(r.title) + '</a></li>').join('');

const relatedItems = relatedPages.map((p) =>
  '<li><a href="' + esc(p.url) + '" rel="noopener">' + esc(p.title) + '</a></li>').join('');

const healthdirectPage = {
  url: '/research/healthdirect-breast-enlargement/',
  slug: 'healthdirect-research',
  h1: 'healthdirect Breast Augmentation Information',
  seoTitle: 'healthdirect Breast Augmentation Information | Breast Implants, Recovery & Risks | Breast Enlargement Guide',
  seoDescription: 'A curated library of ' + n(docs.length) + ' sections and ' + n(facts.length) + ' extracted facts from the healthdirect (Australian Government) breast augmentation page, covering implants, preparation, costs, recovery, complications, alternatives and Australian resources.',
  bannerEyebrow: 'Government library',
  bannerLead: 'Breast augmentation (breast implants) information published by healthdirect \u2014 what the procedure involves, benefits and considerations, preparation, recovery, complications, alternatives and Australian support resources, extracted and linked to the original page.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'healthdirect information' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'healthdirect Breast Augmentation Information',
      description: 'A curated index of sections and extracted facts from the healthdirect patient-information page on breast augmentation (breast implants).',
      url: site.url + '/research/healthdirect-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'healthdirect pages and extracted facts for "breast enlargement"',
      description: 'Summaries, key points, references and source links for ' + n(docs.length) + ' sections of the healthdirect breast augmentation page and its Australian resources.',
      url: site.url + '/research/healthdirect-breast-enlargement/',
      creator: {
        '@type': 'Organization',
        name: 'healthdirect (Australian Government)',
        url: 'https://www.healthdirect.gov.au/'
      },
      isAccessibleForFree: true,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/healthdirect-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects healthdirect\u2019s public patient information on breast augmentation (breast implants) and the Australian resources it links to. Every entry links to the original page on <a href="https://www.healthdirect.gov.au/" rel="noopener">healthdirect.gov.au</a> or to the Australian body named in the entry, so the wording, review dates and any subsequent updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library does and does not mean',
      text:
        '<p>healthdirect is a free Australian Government health information service, not a regulator or a clinic. Its pages describe breast augmentation as it is practised and paid for in Australia, what the operation involves and what can go wrong. Nothing here is a recommendation to have a procedure, and healthdirect does not endorse any clinic, surgeon or treatment package.</p>' +
        '<p>Summaries and key points are condensed from the healthdirect page for readability. They are not a substitute for the original document, which was last reviewed in ' + esc(data.reviewed || 'the published review date') + ' and may have been updated since this library was compiled on ' + esc(data.generated || 'the latest update') + '. Always read the current version on healthdirect.gov.au and discuss it with a qualified clinician.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the healthdirect information covers',
      lead: 'The library is grouped into five areas, from what the procedure is through to recovery, risks and alternatives.',
      cols: 3,
      items: [
        { icon: 'surgical', title: 'The procedure', text: 'What breast augmentation is, how implants are placed, anaesthetic, fat grafting and the TGA status of breast implant products in Australia.' },
        { icon: 'personalised', title: 'Decisions and consent', text: 'Benefits people expect, the points healthdirect says to weigh up, and the questions to ask before surgery.' },
        { icon: 'evidence', title: 'Preparation and cost', text: 'Getting fit, quitting smoking, GP referral, checking your surgeon on AHPRA and RACS, Medicare and the components of cost.' },
        { icon: 'downtime', title: 'Recovery', text: 'Time off work, exercise limits, drains and dressings, and the symptoms that mean calling your surgeon or going to hospital.' },
        { icon: 'safety', title: 'Complications', text: 'Bleeding, infection, sensation changes, rupture, and the rarer serious risks including clots and implant-associated cancer.' },
        { icon: 'info', title: 'Alternatives and support', text: 'Counselling, padded bras and non-implant surgery, plus Australian resources and the 24/7 healthdirect helpline.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All sections in this library</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives a short summary, the main extracted points and a direct link to that section of the healthdirect page.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the healthdirect page',
      lead: 'The statements below summarise what healthdirect says about breast augmentation and related decisions. The right-hand column links to the source section.',
      head: ['Topic', 'What healthdirect says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased from healthdirect patient information (last reviewed ' + esc(data.reviewed || 'as published') + '). The page is reviewed periodically; verify against the linked healthdirect.gov.au section before relying on any point.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Jurisdiction and copyright',
      text:
        '<p>healthdirect pages describe practice, costs and regulation in Australia. Medicare, private insurance, GP referral rules, AHPRA registration and TGA device decisions are Australian arrangements; standards differ between countries and local rules still apply wherever a procedure is performed.</p>' +
        '<p>Summaries and facts on this page are paraphrased from healthdirect patient information published by the Australian Government. This library stores only summaries, extracted facts and links; refer to <a href="https://www.healthdirect.gov.au/about-our-content" rel="noopener">healthdirect\u2019s content policy</a> for the original terms.</p>' +
        '<p>For UK patient information, see the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For US regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a>. For professional-society patient information on breast augmentation, see the <a href="/research/asps-breast-enlargement/">ASPS information library</a>. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>.</p>'
    },
    {
      type: 'cards',
      cols: references.length >= 3 ? 3 : Math.max(references.length, 1),
      eyebrow: 'Evidence base',
      heading: 'Sources cited by the healthdirect page',
      lead: 'healthdirect lists these publications and regulator pages behind its breast augmentation article.',
      items: references.map((r) => ({ title: r.title, text: 'Linked from the healthdirect breast augmentation page.', href: r.url }))
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Related healthdirect pages</h2>' +
        '<p>Other procedure pages on healthdirect that sit alongside breast augmentation:</p>' +
        '<ul>' + relatedItems + '</ul>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/healthdirect-breast-enlargement.json">JSON</a>. It contains the section list, categories, summaries, key points, extracted facts, cited references and related pages, with source URLs.</p>' +
        (referenceItems ? '' : '')
    },
    stdCta({ heading: 'Want to discuss what the healthdirect guidance means for you?' })
  ]
};

module.exports = { healthdirectPage };
