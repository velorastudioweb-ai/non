'use strict';
/* QA: validate internal links, in-page anchors, images, JS syntax, and basic HTML sanity. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIST = path.join(__dirname, '..', 'dist');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function walkExt(dir, ext, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkExt(p, ext, out);
    else if (e.name.endsWith(ext)) out.push(p);
  }
  return out;
}

const files = walk(DIST).sort();
const urlsOf = new Set();
files.forEach((f) => {
  const rel = path.relative(DIST, f).replace(/\\/g, '/');
  if (rel === '404.html') { urlsOf.add('/404.html'); return; }
  urlsOf.add('/' + rel.replace(/index\.html$/, ''));
});

const errors = [];
const warnings = [];

function resolve(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '') return true; // pure hash — handled separately
  if (/^https?:\/\//.test(clean) || /^(mailto:|tel:|#)/.test(clean)) return true;
  const p = clean.startsWith('/') ? clean : null;
  if (p === null) { warnings.push('relative link: ' + href); return true; }
  if (urlsOf.has(p)) return true;
  // allow file targets like /robots.txt /sitemap.xml /assets/*
  const onDisk = path.join(DIST, p.replace(/^\//, ''));
  if (fs.existsSync(onDisk) && !p.endsWith('/')) return true;
  if (fs.existsSync(path.join(onDisk, 'index.html'))) return true;
  return false;
}

let linkCount = 0, anchorCount = 0;
files.forEach((f) => {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(DIST, f).replace(/\\/g, '/');

  // collect ids in this page
  const ids = new Set();
  let m;
  const idRe = /\sid="([^"]+)"/g;
  while ((m = idRe.exec(html))) ids.add(m[1]);

  // hrefs
  const hrefRe = /\shref="([^"]+)"/g;
  while ((m = hrefRe.exec(html))) {
    const href = m[1];
    linkCount++;
    if (href.startsWith('#')) { anchorCount++;
      const id = href.slice(1);
      if (id && !ids.has(id)) errors.push(rel + ': missing anchor ' + href);
      continue;
    }
    if (!resolve(href)) errors.push(rel + ': broken link -> ' + href);
  }
  // src (img/script/link) internal
  const srcRe = /\s(?:src|href)="(\/[^"#?]+\.(?:svg|png|jpg|jpeg|webp|css|js))"/g;
  while ((m = srcRe.exec(html))) {
    const p = m[1];
    if (!fs.existsSync(path.join(DIST, p.replace(/^\//, '')))) errors.push(rel + ': missing asset -> ' + p);
  }

  // sanity: exactly one <h1> on indexable pages
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const noindex = /name="robots" content="noindex/.test(html);
  // redirect stubs are intentionally minimal (noindex + meta refresh); skip
  // content-completeness checks for them.
  const isRedirectStub = noindex && /http-equiv="refresh"/.test(html);
  if (!isRedirectStub) {
    if (h1s === 0) warnings.push(rel + ': no <h1>');
    if (h1s > 1 && !noindex) warnings.push(rel + ': ' + h1s + ' <h1> elements');

    // title / description presence
    if (!/<title>[^<]+<\/title>/.test(html)) errors.push(rel + ': missing <title>');
    if (!/name="description" content="[^"]+"/.test(html)) errors.push(rel + ': missing meta description');
    if (!/rel="canonical"/.test(html)) warnings.push(rel + ': missing canonical');
    if (!/lang="en(?:-[A-Za-z]+)?"/.test(html)) errors.push(rel + ': missing lang');
  }

  // unclosed section balance (rough)
  const openSection = (html.match(/<section[\s>]/g) || []).length;
  const closeSection = (html.match(/<\/section>/g) || []).length;
  if (openSection !== closeSection) errors.push(rel + ': section open/close mismatch ' + openSection + '/' + closeSection);
  const openDiv = (html.match(/<div[\s>]/g) || []).length;
  const closeDiv = (html.match(/<\/div>/g) || []).length;
  if (openDiv !== closeDiv) errors.push(rel + ': div open/close mismatch ' + openDiv + '/' + closeDiv);
});

/* ---------- JS assets must parse (guards against blank-page regressions) ---------- */
const jsAssets = path.join(DIST, 'assets', 'js');
let jsCount = 0;
if (fs.existsSync(jsAssets)) {
  walkExt(jsAssets, '.js').forEach((f) => {
    jsCount++;
    const rel = path.relative(DIST, f).replace(/\\/g, '/');
    try {
      new vm.Script(fs.readFileSync(f, 'utf8'), { filename: rel });
    } catch (err) {
      errors.push(rel + ': JS SYNTAX ERROR — ' + err.message);
    }
  });
}

/* ---------- CSS assets must be non-empty ---------- */
const cssAssets = path.join(DIST, 'assets', 'css');
let cssCount = 0;
if (fs.existsSync(cssAssets)) {
  walkExt(cssAssets, '.css').forEach((f) => {
    cssCount++;
    if (!fs.readFileSync(f, 'utf8').trim()) {
      errors.push(path.relative(DIST, f).replace(/\\/g, '/') + ': CSS file is empty');
    }
  });
}

console.log('Files scanned: ' + files.length);
console.log('Links checked: ' + linkCount + ' (' + anchorCount + ' in-page anchors)');
console.log('JS assets parsed: ' + jsCount + ', CSS assets checked: ' + cssCount);
console.log('\n--- ERRORS (' + errors.length + ') ---');
errors.forEach((e) => console.log('  ' + e));
console.log('\n--- WARNINGS (' + warnings.length + ') ---');
warnings.forEach((w) => console.log('  ' + w));
if (errors.length) process.exitCode = 1;
