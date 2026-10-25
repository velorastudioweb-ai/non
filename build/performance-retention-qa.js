'use strict';
// Compare the generated documents before/after delivery and layout changes.
// Includes collapsed source collections, every link, image identity and SEO data.
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('playwright-core');
const { allPages } = require('./structure');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs/performance-audit');
const file = path.join(OUT, 'content-baseline.json');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const result = {};
    for (const route of [...allPages.map(p => p.url), '/404.html']) {
      const html = fs.readFileSync(path.join(ROOT, 'dist', route === '/404.html' ? '404.html' : route + 'index.html'), 'utf8');
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
      const baseline = JSON.parse(fs.readFileSync(file, 'utf8'));
      assert.deepEqual(result, baseline);
      console.log('PASS: all 37 pages retain their text, links, images, titles, metadata and structured data.');
    }
  } finally { await browser.close(); }
})().catch(err => { console.error(err); process.exitCode = 1; });
