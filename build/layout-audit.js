'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { spawn, spawnSync } = require('child_process');
const { chromium } = require('playwright-core');
const { allPages } = require('./structure');

const baseline = process.argv.includes('--baseline');
const phase = baseline ? 'before' : 'after';
const out = path.join(__dirname, '..', 'docs', 'layout-audit');
const shots = path.join(out, phase);
const port = baseline ? 8151 : 8152;

async function main() {
  fs.mkdirSync(shots, { recursive: true });
  const server = spawn(process.execPath, [path.join(__dirname, 'serve.js'), '--port', String(port)], { stdio: 'ignore' });
  let browser;
  try {
    for (let i = 0; i < 60; i++) {
      try { if ((await fetch('http://127.0.0.1:' + port)).ok) break; } catch (_) { /* starting */ }
      await new Promise((r) => setTimeout(r, 100));
    }
    const chrome = ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(fs.existsSync);
    browser = await chromium.launch({ executablePath: chrome, headless: true });
    const results = [];
    for (const width of [390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      for (const p of allPages) {
        const response = await page.goto('http://127.0.0.1:' + port + p.url, { waitUntil: 'load' });
        assert.equal(response.status(), 200);
        await page.evaluate(async () => {
          document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in'));
          await Promise.all([...document.images].map((img) => {
            img.loading = 'eager';
            return img.decode().catch(() => {});
          }));
          await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 10000))]);
        });
        const metrics = await page.evaluate(() => ({
          mainText: document.querySelector('main').innerText,
          viewport: document.documentElement.clientWidth,
          pageHeight: document.documentElement.scrollHeight,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          sections: [...document.querySelectorAll('main > section')].map((el) => {
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            return { heading: el.querySelector('h1,h2,h3')?.textContent?.trim().slice(0, 100) || el.className,
              type: el.className, height: Math.round(r.height), paddingTop: Math.round(parseFloat(s.paddingTop)),
              paddingBottom: Math.round(parseFloat(s.paddingBottom)), textLength: el.innerText.trim().length,
              images: el.querySelectorAll('img').length };
          }),
          fontSizes: [...document.querySelectorAll('main p, main li, main td')].filter((e) => {
            const r = e.getBoundingClientRect(); return r.width && r.height && !e.children.length;
          }).map((e) => Number(parseFloat(getComputedStyle(e).fontSize).toFixed(1))),
          formControls: [...document.querySelectorAll('form')].map((form) => ({ id: form.id, fields: [...form.querySelectorAll('input,select,textarea,button')].map((e) => ({ type: e.type, disabled: e.disabled, aria: e.getAttribute('aria-label') })) })),
          images: [...document.images].map((img) => ({ src: img.currentSrc, natural: [img.naturalWidth, img.naturalHeight], alt: img.alt, loading: img.loading })),
          cardGrids: [...document.querySelectorAll('.grid')].map((grid) => ({ children: grid.children.length, equalHeights: [...grid.children].every((el, i, a) => !i || Math.abs(el.getBoundingClientRect().height - a[0].getBoundingClientRect().height) < 1) }))
        }));
        results.push({ route: p.url, width, errors, ...metrics });
        if (width !== 768) await page.screenshot({ path: path.join(shots, (p.slug || 'home') + '-' + width + '.jpg'), fullPage: true, type: 'jpeg', quality: 72 });
      }
      await context.close();
      console.log('Layout audit: all 36 pages at ' + width + 'px');
    }
    fs.writeFileSync(path.join(out, phase + '.json'), JSON.stringify({ phase, results }, null, 2));
    const sections = results.flatMap((r) => r.sections.map((s) => ({ ...s, route: r.route, width: r.width })));
    const analysis = {
      sectionCount: sections.length,
      emptyLargeSections: sections.filter((s) => s.textLength < 100 && s.height > 160 && !s.images),
      excessiveVerticalPadding: sections.filter((s) => s.paddingTop + s.paddingBottom > 180 && !s.type.includes('page-banner') && !s.type.includes('hero')),
      smallText: results.filter((r) => r.fontSizes.some((n) => n < 14)).map((r) => ({ route: r.route, width: r.width, sizes: [...new Set(r.fontSizes.filter((n) => n < 14))] })),
      unevenGrids: results.flatMap((r) => r.cardGrids.filter((g) => g.children > 1 && !g.equalHeights).map((g) => ({ route: r.route, width: r.width, ...g }))),
      consoleErrors: results.filter((r) => r.errors.length).map((r) => ({ route: r.route, width: r.width, errors: r.errors }))
    };
    fs.writeFileSync(path.join(out, phase + '-analysis.json'), JSON.stringify(analysis, null, 2));
    console.log('Saved full-page ' + phase + ' screenshots and analysis: ' + results.length + ' page renders, ' + sections.length + ' sections.');
  } finally { if (browser) await browser.close(); server.kill(); }
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
