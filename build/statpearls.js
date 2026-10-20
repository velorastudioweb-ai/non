'use strict';

/* NCBI Bookshelf (StatPearls) breast augmentation library. The dataset is
   extracted from the StatPearls clinical review "Breast Augmentation"
   (Bookshelf ID NBK482206) and is stored as a static JSON asset so it can be
   reused. Summaries and facts are paraphrased; every entry links back to the
   original review on ncbi.nlm.nih.gov. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'statpearls-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'NCBI Bookshelf (StatPearls Publishing)', sourceUrl: 'https://www.ncbi.nlm.nih.gov/books/', article: {}, categories: [], documents: [], facts: [], references: [] };
  }
}

const data = load();
const art = data.article || {};
const docs = data.documents || [];
const facts = data.facts || [];
const categories = data.categories || [];
const refs = data.references || [];
const byId = {};
docs.forEach((d) => { byId[d.id] = d; });

const count = (id) => docs.filter((d) => d.category === id).length;
const n = (v) => Number(v || 0).toLocaleString('en-US');

const statBoxes = [
  { value: n(docs.length), label: 'Review sections' },
  { value: n(facts.length), label: 'Extracted facts' },
  { value: n(refs.length), label: 'Cited references' },
  { value: art.updated || data.generated || '\u2014', label: 'Review updated' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function docCard(d) {
  const updated = d.updated ? ' \u00b7 Last updated ' + d.updated : '';
  const points = d.keyPoints && d.keyPoints.length
    ? '<ul>' + d.keyPoints.map((p) => '<li>' + esc(p) + '</li>').join('') + '</ul>'
    : '';
  return '<article id="doc-' + esc(d.id) + '" style="margin-top:var(--sp-4)">' +
    '<h3 style="margin-bottom:.35rem"><a href="' + esc(d.url) + '" rel="noopener">' + esc(d.title) + '</a></h3>' +
    '<p class="eyebrow" style="margin:0 0 .6rem">' + esc(d.kind) + updated + '</p>' +
    '<p>' + esc(d.summary) + '</p>' +
    points +
    '<p style="font-size:var(--fs-sm)"><a href="' + esc(d.url) + '" rel="noopener">Read this section on ncbi.nlm.nih.gov \u2192</a></p>' +
    '</article>';
}

const categorySections = categories.map((c) => {
  const items = docs.filter((d) => d.category === c.id);
  if (!items.length) return '';
  return '<h2 class="h3" style="margin-top:var(--sp-6)">' + esc(c.name) + '</h2>' +
    '<p class="lead" style="font-size:var(--fs-sm)">' + esc(c.description) + ' <span style="white-space:nowrap">(' + count(c.id) + ')</span></p>' +
    items.map(docCard).join('');
}).join('');

const factRows = facts.map((f) => {
  const src = byId[f.source];
  const source = src
    ? '<a href="' + esc(src.url) + '" rel="noopener">' + esc(src.title) + '</a>'
    : esc(f.source || '');
  return ['<strong>' + esc(f.topic) + '</strong>', esc(f.statement), source];
});

const refItems = refs.map((r) =>
  esc(r.citation) + ' <a href="https://pubmed.ncbi.nlm.nih.gov/' + esc(r.pmid) + '/" rel="noopener">PubMed ' + esc(r.pmid) + '</a>'
).join('</li><li>');

const statPearlsPage = {
  url: '/research/statpearls-breast-augmentation/',
  slug: 'statpearls-research',
  h1: 'NCBI Bookshelf Breast Augmentation Review',
  seoTitle: 'NCBI Bookshelf Breast Augmentation Review (StatPearls) | Indications, Technique & Complications',
  seoDescription: 'A structured library of the ' + n(docs.length) + ' sections, ' + n(facts.length) + ' extracted facts and ' + n(refs.length) + ' cited references from the StatPearls clinical review Breast Augmentation (NBK482206) on NCBI Bookshelf, with links to the original.',
  bannerEyebrow: 'Clinical review library',
  bannerLead: 'The StatPearls clinical review of breast augmentation from NCBI Bookshelf \u2014 indications, contraindications, technique, complications and outcomes, extracted section by section and linked to the original.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'NCBI Bookshelf review' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'NCBI Bookshelf Breast Augmentation Review',
      description: 'A section-by-section index of the StatPearls clinical review Breast Augmentation (NBK482206) on NCBI Bookshelf.',
      url: site.url + '/research/statpearls-breast-augmentation/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'StatPearls "Breast Augmentation" (NBK482206) sections and extracted facts',
      description: 'Section summaries, key points, extracted facts and cited references for the StatPearls clinical review Breast Augmentation.',
      url: site.url + '/research/statpearls-breast-augmentation/',
      creator: {
        '@type': 'Organization',
        name: 'NCBI Bookshelf / StatPearls Publishing',
        url: 'https://www.ncbi.nlm.nih.gov/books/'
      },
      isAccessibleForFree: true,
      dateModified: art.updated || undefined,
      distribution: [{
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: site.url + '/assets/data/statpearls-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library collects the clinical review <strong>Breast Augmentation</strong> published on <a href="' + esc(art.url || 'https://www.ncbi.nlm.nih.gov/books/') + '" rel="noopener">NCBI Bookshelf</a> as part of StatPearls \u2014 peer-reviewed point-of-care reviews produced for the US National Library of Medicine. Every entry links back to the matching section of the original review, so wording, dates and any later updates can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'About this source',
      text:
        '<p><strong>' + esc(art.title || 'Breast Augmentation') + '</strong>, ' + esc(art.authors || '') + ' \u00b7 ' + esc(art.affiliations || '') + '. Bookshelf ID ' + esc(art.id || '') + ' \u00b7 PMID ' + esc(art.pmid || '') + ' \u00b7 last updated ' + esc(art.updated || '') + '. ' + esc(art.citation || '') + '</p>' +
        '<p>StatPearls reviews are educational clinical summaries, not guidelines, and they do not recommend any clinic, surgeon or treatment package. This page stores only paraphrased summaries, extracted facts and links: it is not a substitute for reading the original review, which may have been updated since it was captured on ' + esc(data.generated || 'the latest update') + '. Individual suitability still requires assessment by a qualified clinician in your own jurisdiction.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the review covers',
      lead: 'The review is grouped here into four themes, matching the sections of the original article.',
      cols: 4,
      items: [
        { icon: 'evidence', title: 'Background', text: 'What augmentation is, the FDA history of silicone implants, monitoring advice, and the anatomy, blood supply and nerve supply of the breast.' },
        { icon: 'personalised', title: 'Who it is for', text: 'Indications from reconstruction to developmental hypomastia and elective self-image, and the medical and psychological contraindications.' },
        { icon: 'surgical', title: 'The operation', text: 'Equipment, the theatre team, saline and silicone implants, smooth and textured surfaces, placement, incisions, anaesthesia, duration and recovery.' },
        { icon: 'safety', title: 'Risks and results', text: 'Early and late complications, capsular contracture grading and microbiology, implant longevity, ALCL, reported volumes and satisfaction.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">All sections of the review</h2>' +
        '<p class="lead">Grouped by theme. Each entry gives a short summary, the main extracted points and a direct link to that section of the NCBI Bookshelf article.</p>' +
        categorySections
    },
    {
      type: 'table',
      eyebrow: 'Extracted data',
      heading: 'Key facts from the review',
      lead: 'The statements below summarise what the StatPearls review says about breast augmentation. The right-hand column links to the section each statement came from.',
      head: ['Topic', 'What the review says', 'Source section'],
      rows: factRows,
      note: 'Statements are paraphrased from the StatPearls review ' + (art.id || '') + ', last updated ' + esc(art.updated || 'as published') + '. Verify against the linked NCBI Bookshelf section before relying on any point, and note that clinical practice and regulatory positions change over time.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Source, citation and licence',
      text:
        '<p>' + esc(art.citation || '') + ' The review is distributed by its publishers under a <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" rel="noopener">CC BY-NC-ND 4.0</a> licence; this page stores paraphrased summaries, extracted facts and links to the freely readable original on ncbi.nlm.nih.gov.</p>' +
        '<p>Descriptions of indications, approvals and monitoring reflect United States practice at the time of writing; standards, product approvals and screening advice differ between countries.</p>' +
        '<p>For published studies rather than a single clinical review, see the <a href="/research/breast-enlargement/">PMC research library</a>. For regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a> and the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For academic patient education, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For our own treatment guides, see <a href="/surgical/breast-augmentation/">breast augmentation</a> and the <a href="/breast-enlargement-without-surgery/">evidence guide</a>.</p>'
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h3">References cited by the review</h2>' +
        '<p class="lead">All ' + n(refs.length) + ' sources from the review\u2019s reference list, each linking to its PubMed record.</p>' +
        '<ol>' + refItems + '</ol>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/statpearls-breast-enlargement.json">JSON</a>. It contains the section list, categories, summaries, key points, extracted facts and cited references, with source URLs and the article citation.</p>'
    },
    stdCta({ heading: 'Want to discuss what this review means for you?' })
  ]
};

module.exports = { statPearlsPage };
