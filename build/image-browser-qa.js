'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');
const { spawn } = require('child_process');
const { chromium } = require('playwright-core');
const { allPages } = require('./structure');
const baseline = process.argv.includes('--baseline');
const out = path.join(__dirname, '..', 'docs', 'image-audit');

async function main() {
  fs.mkdirSync(out, { recursive: true });
  if (!baseline) {
    const saved = JSON.parse(fs.readFileSync(path.join(out, 'content-baseline.json')));
    assert.equal(crypto.createHash('sha256').update(JSON.stringify(allPages)).digest('hex'), saved.sha256, 'Authored page content changed');
  }
  const port = baseline ? 8142 : 8143;
  const server = spawn(process.execPath, [path.join(__dirname, 'serve.js'), '--port', String(port)], { stdio: 'ignore' });
  const base = 'http://127.0.0.1:' + port;
  let browser;
  try {
    for (let i = 0; i < 60; i++) {
      try { if ((await fetch(base)).ok) break; } catch (_) { /* starting */ }
      await new Promise((r) => setTimeout(r, 100));
    }
    const chrome = ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(fs.existsSync);
    browser = await chromium.launch({ executablePath: chrome, headless: true });
    const results = [];
    const failures = [];
    await Promise.all([390, 768, 1440].map(async (width) => {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', (e) => failures.push('JS: ' + e.message));
      for (const p of allPages) {
        const response = await page.goto(base + p.url, { waitUntil: 'load' });
        assert.equal(response.status(), 200, p.url);
        // Open source disclosures and force lazy images to load so the audit
        // covers below-the-fold/collapsed content rather than just the hero.
        await page.evaluate(async () => {
          document.querySelectorAll('.source-group > details').forEach((d) => { d.open = true; });
          document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible'));
          await Promise.all([...document.images].map((img) => {
            img.loading = 'eager';
            return img.decode().catch(() => {});
          }));
          await document.fonts.ready;
        });
        const r = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          sections: [...document.querySelectorAll('main section')].map((s) => ({ heading: s.querySelector('h1,h2,h3')?.textContent?.trim() || '', imageCount: s.querySelectorAll('img').length })),
          images: [...document.images].map((img) => {
            const box = img.getBoundingClientRect();
            const style = getComputedStyle(img);
            return { src: img.currentSrc, alt: img.alt, natural: [img.naturalWidth, img.naturalHeight], rendered: [Math.round(box.width), Math.round(box.height)], fit: style.objectFit, position: style.objectPosition, lazy: img.getAttribute('loading'), width: img.getAttribute('width'), height: img.getAttribute('height'), inMain: !!img.closest('main') };
          }),
          placeholders: document.querySelectorAll('main .pending').length
        }));
        results.push({ route: p.url, width, ...r });
        if (r.overflow > 1) failures.push(p.url + '@' + width + ': page overflow ' + r.overflow);
        for (const img of r.images) {
          if (!img.natural[0]) failures.push(p.url + '@' + width + ': broken image ' + img.src);
          if (!img.width || !img.height) failures.push(p.url + '@' + width + ': dimensions missing');
          if (img.fit === 'fill' && img.rendered[0] > 0 && img.rendered[1] > 0 && Math.abs(img.natural[0] / img.natural[1] - img.rendered[0] / img.rendered[1]) > .15) failures.push(p.url + '@' + width + ': stretched image');
        }
        if (!baseline && width !== 768 && ['/', '/surgical-breast-enlargement/', '/breast-implants/', '/breast-anatomy/', '/research/'].includes(p.url)) {
          await page.screenshot({ path: path.join(out, (p.slug || 'home') + '-' + width + '.jpg'), type: 'jpeg', quality: 75, fullPage: p.url !== '/research/' });
        }
      }
      await context.close();
      console.log('Audited all 36 routes at ' + width + 'px, including below-the-fold images and source sections.');
    }));
    fs.writeFileSync(path.join(out, baseline ? 'browser-before.json' : 'browser-after.json'), JSON.stringify({ phase: baseline ? 'before' : 'after', renders: results.length, failures, results }, null, 2));
    console.log('Image browser audit: ' + results.length + ' renders; ' + failures.length + ' failures.');
    assert.equal(failures.length, 0, failures.join('\n'));
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
