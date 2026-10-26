'use strict';
// Compare the generated documents before/after delivery and layout changes.
// Includes collapsed source collections, every link, image identity and SEO data.
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('playwright-core');
const { allPages, site } = require('./structure');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs/performance-audit');
// Keep the original optimization baseline. For intentionally authored content
// changes, select a separate snapshot explicitly instead of overwriting history.
const snapshotArg = process.argv.indexOf('--snapshot');
const file = snapshotArg < 0 ? path.join(OUT, 'content-baseline.json') : path.resolve(ROOT, process.argv[snapshotArg + 1]);
const baseArg = process.argv.indexOf('--base');
const base = baseArg < 0 ? null : process.argv[baseArg + 1].replace(/\/+$/, '');
const siteUrlArg = process.argv.indexOf('--site-url');
const expectedSiteUrl = siteUrlArg < 0 ? site.url : process.argv[siteUrlArg + 1].replace(/\/+$/, '');
if (base && process.argv.includes('--baseline')) throw new Error('Capture the authored local build before verifying a live deployment.');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const result = {};
    const baseline = process.argv.includes('--baseline') ? null : JSON.parse(fs.readFileSync(file, 'utf8').split(site.url).join(expectedSiteUrl));
    const routes = base ? Object.keys(baseline) : [...allPages.map(p => p.url), '/404.html'];
    for (const route of routes) {
      let html;
      if (base) {
        const response = await fetch(base + (route === '/404.html' ? '/__performance-qa-not-found/' : route));
        assert.equal(response.status, route === '/404.html' ? 404 : 200, route);
        html = await response.text();
      } else {
        html = fs.readFileSync(path.join(ROOT, 'dist', route === '/404.html' ? '404.html' : route + 'index.html'), 'utf8');
      }
      result[route] = await page.evaluate(html => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const seo = [...doc.querySelectorAll('title, meta, link[rel="canonical"], script[type="application/ld+json"]')].map(el => el.outerHTML);
        const images = [...doc.images].map(el => [el.getAttribute('src'), el.getAttribute('alt')]);
        const links = [...doc.querySelectorAll('body a')].map(el => [el.getAttribute('href'), el.textContent.replace(/\s+/g, ' ').trim()]);
        doc.querySelectorAll('script, style, svg').forEach(el => el.remove());
        return { seo, images, links, text: doc.body.textContent.replace(/\s+/g, ' ').trim() };
      }, html);
    }
    if (process.argv.includes('--baseline')) {
      if (fs.existsSync(file)) throw new Error('Baseline already exists; refusing to overwrite it.');
      fs.mkdirSync(OUT, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(result, null, 2));
      console.log('Saved content/link/image/SEO baseline for ' + Object.keys(result).length + ' pages.');
    } else {
      assert.deepEqual(result, baseline);
      console.log('PASS: all ' + Object.keys(result).length + ' pages retain their text, links, images, titles, metadata and structured data.');
      if (base) fs.writeFileSync(path.join(OUT, 'live-content-verification.json'), JSON.stringify({ base, snapshot: path.relative(ROOT, file).replace(/\\/g, '/'), expectedSiteUrl, checkedAt: new Date().toISOString(), pages: routes.length, result: 'pass' }, null, 2));
    }
  } finally { await browser.close(); }
})().catch(err => { console.error(err); process.exitCode = 1; });
