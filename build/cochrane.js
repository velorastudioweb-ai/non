'use strict';

/* Cochrane Library evidence library. The dataset lists every Cochrane
   systematic review and registered review protocol relevant to breast
   enlargement, implant surgery and implant-based reconstruction, with
   publication metadata from PubMed. Stored as a static JSON asset. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'cochrane-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'Cochrane Library', sourceUrl: 'https://www.cochranelibrary.com/', searchUrl: 'https://www.cochranelibrary.com/search?searchBy=0&searchText=breast+augmentation', categories: [], documents: [], facts: [] };
  }
}

const data = load();
const docs = data.documents || [];
const facts = data.facts || [];
const categories = data.categories || [];
const byId = {};
docs.forEach((d) => { byId[d.id] = d; });

const reviews = docs.filter((d) => d.kind === 'Cochrane Review').length;
const protocols = docs.length - reviews;
const n = (v) => Number(v || 0).toLocaleString('en-US');

const statBoxes = [
  { value: n(docs.length), label: 'Cochrane records' },
  { value: n(reviews), label: 'Completed reviews' },
  { value: n(protocols), label: 'Protocols' },
  { value: data.generated || '\u2014', label: 'Compiled' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function docCard(d) {
  const status = d.status && d.status !== 'Completed review' ? ' \u00b7 ' + d.status : '';
  const updated = d.updated ? ' \u00b7 Published ' + d.updated : '';
  const points = d.keyPoints && d.keyPoints.length
    ? '<ul>' + d.keyPoints.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>'
    : '';
  return '<article id="doc-' + esc(d.id) + '" style="margin-top:var(--sp-4)">' +
    '<h3 style="margin-bottom:.35rem"><a href="' + esc(d.url) + '" rel="noopener">' + esc(d.title) + '</a></h3>' +
    '<p class="eyebrow" style="margin:0 0 .6rem">' + esc(d.kind) + esc(status) + esc(updated) + '</p>' +
    '<p>' + esc(d.summary) + '</p>' +
    points +
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read the record on cochranelibrary.com \u2192</a>' +
    (d.doiUrl ? ' <span style="color:var(--muted)">\u00b7 DOI <a href="' + esc(d.doiUrl) + '" rel="noopener">' + esc(d.doi) + '</a></span>' : '') +
    (d.pmid ? ' <span style="color:var(--muted)">\u00b7 PMID <a href="https://pubmed.ncbi.nlm.nih.gov/' + esc(d.pmid) + '/" rel="noopener">' + esc(d.pmid) + '</a></span>' : '') +
    '</p>' +
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

const cochranePage = {
  url: '/research/cochrane-breast-enlargement/',
  slug: 'cochrane-research',
  h1: 'Cochrane Library Breast Enlargement Evidence',
  seoTitle: 'Cochrane Breast Enlargement Evidence: Systematic Reviews, Implants & Protocols | Breast Enlargement Guide',
  seoDescription: 'Every Cochrane systematic review and registered protocol relevant to breast enlargement and breast implants \u2014 wound drains, implant types, implants versus autologous tissue, mesh and fat transfer \u2014 ' + n(docs.length) + ' records summarised with key findings and links to cochranelibrary.com.',
  bannerEyebrow: 'Systematic reviews',
  bannerLead: 'Cochrane systematic reviews and registered protocols relevant to breast enlargement and breast implants \u2014 wound drains, implant types, implants versus the patient\'s own tissue, mesh and fat transfer \u2014 summarised and linked to the original records on the Cochrane Library.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'Cochrane Library' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Cochrane Library Breast Enlargement Evidence',
      description: 'A curated index of ' + n(docs.length) + ' Cochrane systematic reviews and registered protocols relevant to breast enlargement, breast implants and implant-based reconstruction.',
      url: site.url + '/research/cochrane-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Cochrane reviews and protocols for "breast augmentation"',
      description: 'Summaries, key points and source links for ' + n(docs.length) + ' Cochrane records related to breast enlargement, implants and reconstruction (' + n(reviews) + ' completed reviews, ' + n(protocols) + ' protocols).',
      url: site.url + '/research/cochrane-breast-enlargement/',
      creator: {
        '@type': 'Organization',
        name: 'Cochrane',
        url: 'https://www.cochranelibrary.com/'
      },
      isAccessibleForFree: true,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/cochrane-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects every Cochrane systematic review and registered review protocol that bears on breast enlargement, breast implants and implant-based reconstruction \u2014 ' + n(reviews) + ' completed reviews and ' + n(protocols) + ' protocols registered with, or withdrawn by, Cochrane. Each entry links to the full record on <a href="https://www.cochranelibrary.com/" rel="noopener">cochranelibrary.com</a>, with its DOI and PubMed citation where one exists, so the wording, dates and any later updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library does and does not mean',
      text:
        '<p>Cochrane publishes independent systematic reviews that search for and appraise all available studies on a clinical question. A <strong>review</strong> here reports what the evidence showed when it was published; a <strong>protocol</strong> only states what a team intends to review \u2014 protocols contain no results, and one entry in this library was withdrawn before any review was written. Nothing here is a recommendation to have or avoid a procedure, and individual suitability always requires assessment by a qualified clinician.</p>' +
        '<p>Summaries and key points are condensed from the Cochrane abstracts and record pages for readability. They are not a substitute for the full reviews, which may have been updated since this library was compiled on ' + esc(data.generated || 'the latest update') + '. Always read the current version on cochranelibrary.com.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the Cochrane evidence covers',
      lead: 'The library is grouped into four areas, from the augmentation question itself to the reconstructive surgery evidence and the protocols still in progress.',
      cols: 3,
      items: [
        { icon: 'evidence', title: 'Completed reviews', text: n(reviews) + ' completed Cochrane Reviews: wound drains after breast surgery, different implant types, and implants versus autologous tissue flaps after mastectomy.' },
        { icon: 'surgical', title: 'Augmentation directly', text: 'What the reviews say about breast augmentation itself \u2014 the drain trials, and why capsular-contracture research (implant insertion funnels) is still only a registered protocol.' },
        { icon: 'safety', title: 'Implant type evidence', text: 'Five small randomised trials (202 participants) comparing surfaces, fillers and shapes \u2014 and the review\u2019s conclusion that implant choice cannot yet be based on randomised evidence.' },
        { icon: 'personalised', title: 'Reconstruction evidence', text: 'Quality of life, satisfaction and complications with implants versus the patient\u2019s own tissue across 35 non-randomised studies and 57,555 participants.' },
        { icon: 'downtime', title: 'Protocols in progress', text: 'Registered protocols on insertion funnels, prepectoral mesh and acellular dermal matrices \u2014 what Cochrane is currently examining, with no results yet.' },
        { icon: 'minimally', title: 'Evidence gaps', text: 'Where Cochrane has no review at all: cosmetic augmentation as a procedure, fat transfer for enlargement, breast uplift, fillers and non-surgical options.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All Cochrane records in this library</h2>' +
        '<p class="lead">Grouped by topic. Each entry gives the record type, publication date, a short summary, the main findings or planned methods, and a direct link to the full record, DOI and PubMed citation.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key findings from the Cochrane records',
      lead: 'The statements below summarise what the Cochrane reviews found, and what the protocols and evidence gaps mean for breast enlargement. The right-hand column links to the source record.',
      head: ['Topic', 'What the Cochrane evidence shows', 'Source'],
      rows: factRows,
      note: 'Findings are paraphrased from Cochrane review abstracts (retrieved via PubMed, October 2026) and are stated with the certainty ratings Cochrane applied to them. Protocols report planned methods only. Verify each point against the linked record on cochranelibrary.com before relying on it.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Where the Cochrane evidence runs out',
      text:
        '<p>Cochrane has published no systematic review of cosmetic breast augmentation as a procedure \u2014 no review of augmentation techniques, implant placement planes, satisfaction after cosmetic surgery, or long-term outcomes in women who had implants for enlargement rather than reconstruction. The completed reviews here were written for breast reduction and post-mastectomy reconstruction; their findings are evidence about those settings, not direct evidence about augmentation for cosmetic purposes.</p>' +
        '<p>There is also no Cochrane review of fat transfer or autologous fat grafting for cosmetic breast enlargement (the reconstruction protocol was withdrawn in 2021), none of silicone gel implants used for cosmetic purposes, none of breast uplift (mastopexy), none of gynaecomastia surgery in men, and none of the non-surgical options discussed elsewhere on this site \u2014 fillers, platelet-rich plasma, threads or biostimulators. Absence of a Cochrane review does not mean a treatment works or does not work; it means the question has not been systematically synthesised at this level, and other evidence must be weighed instead.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Search the Cochrane Library yourself</h2>' +
        '<p>Cochrane\u2019s own search can be run directly: <a href="' + esc(data.searchUrl || 'https://www.cochranelibrary.com/') + '" rel="noopener">search the Cochrane Library for breast augmentation</a>. Reviews carry identifiers of the form CD012345 (with .pubN suffixes for updated editions); the Cochrane Central Register of Controlled Trials (CENTRAL) inside the Library also indexes thousands of individual trials on breast implants and breast surgery that no review has yet summarised.</p>' +
        '<h2 class="h3" style="margin-top:var(--sp-5)">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/cochrane-breast-enlargement.json">JSON</a>. It contains the record list, categories, summaries, key points and extracted findings, with DOI, PMID and source URLs.</p>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'Source and copyright',
      text:
        '<p>Cochrane reviews and protocols are published in the <em>Cochrane Database of Systematic Reviews</em> in the Cochrane Library and remain the property of Cochrane and the respective authors, with abstracts distributed by PubMed. This library stores only our own summaries, paraphrased key points and links to the publicly available records; full abstracts and review texts are read on cochranelibrary.com.</p>' +
        '<p>For the wider published literature, see the <a href="/research/breast-enlargement/">PMC research library</a>. For regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a> and the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For academic patient education, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For professional-society patient information on breast augmentation, see the <a href="/research/asps-breast-enlargement/">ASPS information library</a>.</p>'
    },
    stdCta({ heading: 'Want to discuss what the Cochrane evidence means for you?' })
  ]
};

module.exports = { cochranePage };
