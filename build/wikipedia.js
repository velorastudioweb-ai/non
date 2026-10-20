'use strict';

/* Wikipedia breast enlargement library. The dataset captures the content of
   the English Wikipedia article "Breast enlargement" — its definition, the
   methods it lists (and the one it lists as ineffective), the extracted facts
   and all seven of its references — stored as a static JSON asset so it can
   be reused. */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { esc } = require('./templates');

const DATA = path.join(__dirname, '..', 'public', 'assets', 'data', 'wikipedia-breast-enlargement.json');

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA, 'utf8'));
  } catch (err) {
    return { generated: '', source: 'Wikipedia', sourceUrl: 'https://en.wikipedia.org/wiki/Breast_enlargement', article: {}, methods: [], ineffective: [], facts: [], references: [], seeAlso: [] };
  }
}

const data = load();
const article = data.article || {};
const methods = data.methods || [];
const ineffective = data.ineffective || [];
const facts = data.facts || [];
const references = data.references || [];
const seeAlso = data.seeAlso || [];
const articleUrl = (data.article && data.article.url) || data.sourceUrl;

const n = (v) => Number(v || 0).toLocaleString('en-US');

const statBoxes = [
  { value: n(methods.length), label: 'Methods listed' },
  { value: n(facts.length), label: 'Extracted facts' },
  { value: n(references.length), label: 'References cited' },
  { value: data.generated || '\u2014', label: 'Compiled' }
].map((x) => `<div class="research__stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('');

function refLinks(nums) {
  if (!nums || !nums.length) return '\u2014';
  return nums.map((k) => '<a href="#ref-' + k + '">[' + k + ']</a>').join(' ');
}

const methodRows = methods.map((m) => [
  '<strong>' + esc(m.name) + '</strong>',
  esc(m.category),
  esc(m.detail),
  refLinks(m.references)
]);

const ineffectiveRows = ineffective.map((m) => [
  '<strong>' + esc(m.name) + '</strong>',
  esc(m.category),
  esc(m.detail),
  '\u2014'
]);

const factRows = facts.map((f) => [
  '<strong>' + esc(f.topic) + '</strong>',
  esc(f.statement),
  '<a href="' + esc(articleUrl) + '" rel="noopener">' + esc(article.title || 'Wikipedia') + '</a>'
]);

const referenceItems = references.map((r) => {
  const links = (r.links || []).map((l) => '<a href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) + '</a>').join(' &middot; ');
  return '<li id="ref-' + r.n + '">' + esc(r.citation) + (links ? '<br><span style="font-size:var(--fs-sm)">' + links + '</span>' : '') + '</li>';
}).join('');

const seeAlsoItems = seeAlso.map((s) => {
  const internal = s.internal ? ' &middot; <a href="' + esc(s.internal) + '">our guide</a>' : '';
  return '<li><a href="' + esc(s.url) + '" rel="noopener">' + esc(s.title) + '</a>' + internal + '</li>';
}).join('');

const wikipediaPage = {
  url: '/research/wikipedia-breast-enlargement/',
  slug: 'wikipedia-research',
  h1: 'Wikipedia: Breast Enlargement Methods & Data',
  seoTitle: 'Wikipedia Breast Enlargement: Methods, Facts & References | Breast Enlargement Guide',
  seoDescription: 'The full data from the Wikipedia article on breast enlargement \u2014 the four methods it lists (surgical, hormonal, dietary and mechanical), the ineffective method it names, nine extracted facts and all seven references, with links to the original article.',
  bannerEyebrow: 'Source library',
  bannerLead: 'Everything the English Wikipedia article \u201cBreast enlargement\u201d covers \u2014 definition, methods, extracted facts and references \u2014 captured at a fixed revision and linked to the original.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'Wikipedia information' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Wikipedia Breast Enlargement: Methods, Facts & References',
      description: 'A structured capture of the English Wikipedia article "Breast enlargement": methods, ineffective methods, extracted facts and references.',
      url: site.url + '/research/wikipedia-breast-enlargement/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast enlargement' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Wikipedia article data for "breast enlargement"',
      description: 'Methods, extracted facts and the full reference list from the Wikipedia article "Breast enlargement" (revision ' + (article.revisionId || '') + ').',
      url: site.url + '/research/wikipedia-breast-enlargement/',
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
        contentUrl: site.url + '/assets/data/wikipedia-breast-enlargement.json'
      }]
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This library captures the content of the English Wikipedia article <a href="' + esc(articleUrl) + '" rel="noopener">\u201cBreast enlargement\u201d</a> \u2014 its definition, the four methods it lists as actual or potential ways to achieve larger breasts, the one method it lists as ineffective, the facts extracted from the text and all seven of its references. Every entry links back to the original article so the wording and any later edits can be checked at source.</p>' +
        '<div class="research__stats">' + statBoxes + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this library is \u2014 and what it is not',
      text:
        '<p>Wikipedia is a collaboratively edited, open encyclopedia. It is a starting point for orientation, not medical guidance: its articles are not written or reviewed by a clinician, and its content can change between visits. Nothing here is a recommendation of a method, product or procedure, and individual suitability always requires assessment by a qualified healthcare professional.</p>' +
        '<p>The data on this page was captured from revision ' + esc(article.revisionId || '') + ' of the article, last edited on ' + esc(article.lastEdited || '') + '. Wikipedia articles change over time \u2014 always read the <a href="' + esc(article.revisionUrl || articleUrl) + '" rel="noopener">current version</a> before relying on any point.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Coverage',
      heading: 'What the Wikipedia article covers',
      lead: 'A short article with a definition, four methods, one ineffective method, a see-also list and seven references.',
      cols: 3,
      items: [
        { icon: 'info', title: 'Definition and context', text: 'Breast enlargement as natural mammoplasia or active intervention, and why breasts matter to self-image, femininity and sexual attractiveness.' },
        { icon: 'surgical', title: 'Surgical method', text: 'Breast augmentation with implants or fat transfer, listed as an actual and potential method and linked to the augmentation articles.' },
        { icon: 'evidence', title: 'Hormonal method', text: 'Pharmacological or hormonal enhancement with medications such as estrogen or breast enlargement supplements, with three supporting citations.' },
        { icon: 'natural', title: 'Food energy and KLF14', text: 'Increasing food energy intake to add adipose tissue near the breast area, with distribution between individuals controlled by the KLF14 gene.' },
        { icon: 'minimally', title: 'Mechanical method', text: 'Mechanical breast enhancement, cited to a 2007 study of the Brava external tissue expander.' },
        { icon: 'scale', title: 'Ineffective methods', text: 'The Mark Eden bust developer, named and described as a fraudulently marketed method and device.' }
      ]
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">The article in brief</h2>' +
        '<p>' + esc(data.overview || '') + '</p>' +
        (data.natural ? '<p><strong>' + esc(data.natural.term) + '.</strong> ' + esc(data.natural.note) + '</p>' : '')
    },
    {
      type: 'table',
      alt: true,
      eyebrow: 'Methods listed',
      heading: 'Methods the article lists to achieve larger breasts',
      lead: 'The four actual and potential methods named in the article, with the wording condensed from the source. The right-hand column points to the article\u2019s own references.',
      head: ['Method', 'Category', 'What the article says', 'Refs'],
      rows: methodRows,
      note: 'Statements are condensed from the Wikipedia article \u201cBreast enlargement\u201d (revision ' + esc(article.revisionId || '') + '). Inclusion in the article is not evidence of safety or effectiveness \u2014 check the linked references and discuss any option with a qualified clinician.'
    },
    {
      type: 'table',
      eyebrow: 'Ineffective methods',
      heading: 'Methods the article lists as ineffective',
      lead: 'The article separates methods it describes as actual or potential from those it describes as ineffective.',
      head: ['Method', 'Category', 'What the article says', 'Refs'],
      rows: ineffectiveRows,
      note: 'The article names only one ineffective method. Absence of other entries from this list does not mean a method is effective \u2014 evidence for each option has to be assessed separately.'
    },
    {
      type: 'table',
      alt: true,
      eyebrow: 'Extracted data',
      heading: 'Key facts from the article',
      lead: 'The statements below condense what the Wikipedia article says about breast enlargement. The right-hand column links to the source article.',
      head: ['Topic', 'What the article says', 'Source'],
      rows: factRows,
      note: 'Statements are paraphrased from the Wikipedia article. Wikipedia is open content that anyone can edit; verify against the linked article revision before relying on any point.'
    },
    {
      type: 'prose',
      wide: true,
      html:
        '<h2 class="h2">References cited by the article</h2>' +
        '<p class="lead">All seven references from revision ' + esc(article.revisionId || '') + ', with DOI, PubMed and publisher links where the article provides them.</p>' +
        '<ol class="ref-list">' + referenceItems + '</ol>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">See also</h2>' +
        '<p>The article\u2019s own see-also list, with a link to our guide where one exists on this site.</p>' +
        '<ul>' + seeAlsoItems + '</ul>'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Source, licence and attribution',
      text:
        '<p>Text on this page is a condensed, paraphrased summary of the English Wikipedia article \u201cBreast enlargement\u201d, not a verbatim copy. The original article is available under the <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="noopener">Creative Commons Attribution-ShareAlike 4.0 licence (CC BY-SA 4.0)</a>; Wikipedia\u00ae is a registered trademark of the Wikimedia Foundation, Inc. This library stores summaries, extracted facts, the reference list and links only.</p>' +
        '<p>For the long-form Wikipedia article on the operation itself \u2014 implant types, incisions, complications and fat grafting \u2014 see the <a href="/research/wikipedia-breast-augmentation/">Wikipedia breast augmentation library</a>. For regulator guidance, see the <a href="/research/fda-breast-enlargement/">FDA information library</a> and the <a href="/research/nhs-breast-enlargement/">NHS information library</a>. For academic patient education, see the <a href="/research/cleveland-clinic-breast-enlargement/">Cleveland Clinic information library</a>. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>, or read our <a href="/breast-enlargement-without-surgery/">evidence guide</a>.</p>'
    },
    {
      type: 'prose',
      html:
        '<h2 class="h3">Download and reuse</h2>' +
        '<p>The structured dataset behind this page is available as <a href="/assets/data/wikipedia-breast-enlargement.json">JSON</a>. It contains the article metadata, overview, the method and ineffective-method lists, extracted facts, the full reference list and the see-also links.</p>'
    },
    stdCta({ heading: 'Want to put these methods in context for your own decision?' })
  ]
};

module.exports = { wikipediaPage };
