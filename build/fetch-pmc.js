'use strict';

/* =============================================================================
   Extract the complete PubMed Central (PMC) literature set for the exact
   phrase "breast enlargement" and write it to a static JSON asset used by
   /research/breast-enlargement/.

   Source: NCBI E-utilities (esearch / esummary / efetch).
   Run with: node build/fetch-pmc.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
const TOOL = 'quantumhealth-website';
const EMAIL = 'enquiries@nonsurgicalbreastenlargement.in';
const QUERY = '"breast enlargement"';
const OUT = path.join(__dirname, '..', 'public', 'assets', 'data', 'pmc-breast-enlargement.json');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function request(url, params, attempt = 1) {
  const body = new URLSearchParams(Object.assign({ tool: TOOL, email: EMAIL }, params || {}));
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
  } catch (err) {
    if (attempt > 5) throw err;
    await sleep(1000 * attempt);
    return request(url, params, attempt + 1);
  }
  if (res.status === 429 || res.status >= 500) {
    if (attempt > 5) throw new Error('NCBI error ' + res.status + ' for ' + url);
    await sleep(1500 * attempt);
    return request(url, params, attempt + 1);
  }
  if (!res.ok) throw new Error('NCBI error ' + res.status + ' for ' + url);
  return res.text();
}

async function esearch() {
  const xml = await request(EUTILS + 'esearch.fcgi', {
    db: 'pmc', retmode: 'json', retmax: '10000', sort: 'relevance', term: QUERY
  });
  const json = JSON.parse(xml);
  const count = Number(json.esearchresult.count);
  const ids = json.esearchresult.idlist || [];
  if (!ids.length) throw new Error('No PMC records returned');
  return { count, ids };
}

async function esummary(ids) {
  const xml = await request(EUTILS + 'esummary.fcgi', {
    db: 'pmc', retmode: 'json', id: ids.join(',')
  });
  return JSON.parse(xml).result;
}

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ndash: '\u2013', mdash: '\u2014', lsquo: '\u2018', rsquo: '\u2019',
  ldquo: '\u201c', rdquo: '\u201d', hellip: '\u2026', deg: '\u00b0',
  plusmn: '\u00b1', times: '\u00d7', micro: '\u00b5', alpha: '\u03b1',
  beta: '\u03b2', gamma: '\u03b3', mu: '\u03bc', ge: '\u2265', le: '\u2264'
};

function decodeEntities(s) {
  return String(s || '')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&([a-z][a-z0-9]+);/gi, (m, n) => {
      const v = ENTITIES[n.toLowerCase()];
      return v === undefined ? m : v;
    });
}

function clean(s) {
  return decodeEntities(String(s || '').replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function parseAbstract(xml) {
  const block = xml.match(/<Abstract>([\s\S]*?)<\/Abstract>/);
  if (!block) return '';
  const parts = [];
  const re = /<AbstractText([^>]*)>([\s\S]*?)<\/AbstractText>/g;
  let m;
  while ((m = re.exec(block[1]))) {
    const label = (m[1].match(/Label="([^"]*)"/) || [])[1];
    const text = clean(m[2]);
    if (!text) continue;
    parts.push(label && !/^(unlabeled|abstract)$/i.test(label) ? label + ': ' + text : text);
  }
  if (parts.length) return parts.join(' ');
  const plain = block[1].match(/<AbstractText[^>]*>([\s\S]*?)<\/AbstractText>/);
  return plain ? clean(plain[1]) : clean(block[1]);
}

async function efetchAbstracts(pmids) {
  if (!pmids.length) return {};
  const xml = await request(EUTILS + 'efetch.fcgi', {
    db: 'pubmed', retmode: 'xml', id: pmids.join(',')
  });
  const map = {};
  const articles = xml.split('<PubmedArticle>').slice(1);
  for (const article of articles) {
    const pmid = (article.match(/<PMID[^>]*>(\d+)<\/PMID>/) || [])[1];
    if (!pmid) continue;
    map[pmid] = parseAbstract(article);
  }
  return map;
}

function yearOf(s) {
  const m = String(s || '').match(/\b(\d{4})\b/);
  return m ? Number(m[1]) : null;
}

async function main() {
  console.log('Searching PMC for ' + QUERY + ' ...');
  const search = await esearch();
  console.log('  ' + search.count + ' records, ' + search.ids.length + ' IDs retrieved');

  const summaries = {};
  for (let i = 0; i < search.ids.length; i += 100) {
    const batch = search.ids.slice(i, i + 100);
    const result = await esummary(batch);
    for (const id of batch) if (result[id]) summaries[id] = result[id];
    process.stdout.write('\r  metadata ' + Math.min(i + 100, search.ids.length) + '/' + search.ids.length);
    await sleep(400);
  }
  process.stdout.write('\n');

  const articles = [];
  const pmidToPmcid = {};
  for (const id of search.ids) {
    const s = summaries[id];
    if (!s) continue;
    const ids = s.articleids || [];
    const pmid = (ids.find((a) => a.idtype === 'pmid') || {}).value || '';
    const doi = (ids.find((a) => a.idtype === 'doi') || {}).value || '';
    const year = yearOf(s.pubdate || s.printpubdate || s.epubdate || s.sortdate);
    const record = {
      pmcid: 'PMC' + id,
      pmid,
      doi,
      title: clean(s.title),
      authors: (s.authors || []).filter((a) => a.authtype === 'Author').map((a) => clean(a.name)),
      journal: clean(s.fulljournalname || s.source),
      journalAbbr: clean(s.source),
      year,
      pubdate: clean(s.pubdate || s.printpubdate || s.epubdate),
      volume: clean(s.volume),
      issue: clean(s.issue),
      pages: clean(s.pages),
      abstract: '',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC' + id + '/'
    };
    if (pmid) pmidToPmcid[pmid] = record;
    articles.push(record);
  }

  const pmids = Object.keys(pmidToPmcid);
  let done = 0;
  for (let i = 0; i < pmids.length; i += 200) {
    const batch = pmids.slice(i, i + 200);
    const abstracts = await efetchAbstracts(batch);
    for (const pmid of batch) {
      const rec = pmidToPmcid[pmid];
      if (rec && abstracts[pmid]) rec.abstract = abstracts[pmid];
    }
    done += batch.length;
    process.stdout.write('\r  abstracts ' + Math.min(done, pmids.length) + '/' + pmids.length);
    await sleep(400);
  }
  process.stdout.write('\n');

  articles.sort((a, b) => (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title));

  const years = articles.map((a) => a.year).filter(Boolean);
  const payload = {
    generated: new Date().toISOString().slice(0, 10),
    source: 'PubMed Central (PMC), U.S. National Library of Medicine',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/',
    query: QUERY,
    total: articles.length,
    yearRange: years.length ? [Math.min(...years), Math.max(...years)] : null,
    withAbstract: articles.filter((a) => a.abstract).length,
    journals: new Set(articles.map((a) => a.journal).filter(Boolean)).size,
    articles
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload), 'utf8');
  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log('Wrote ' + OUT);
  console.log('  ' + payload.total + ' records, ' + payload.withAbstract + ' abstracts, ' +
    payload.journals + ' journals, ' + kb + ' KB');
}

main().catch((err) => {
  console.error('\nExtraction failed:', err.message);
  process.exit(1);
});
