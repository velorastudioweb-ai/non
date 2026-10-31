'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const { allPages } = require('./structure');
const { startAuditServer } = require('./audit-server');

const arg = name => process.argv.includes(name) ? process.argv[process.argv.indexOf(name) + 1] : null;
let base = arg('--base');
const widths = [390, 1440];
const out = [];
const failures = [];

(async () => {
  const server = await startAuditServer(base);
  base = server.base;
  const chrome = ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(fs.existsSync);
  const browser = await chromium.launch({ executablePath: chrome, headless: true });
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', (e) => failures.push('JS@' + width + ': ' + e.message));
    page.on('console', (m) => { if (m.type() === 'error') failures.push('CONSOLE@' + width + ': ' + m.text()); });
    for (const p of allPages) {
      const response = await page.goto(base + p.url, { waitUntil: 'load' });
      if (!response || response.status() !== 200) { failures.push(p.url + '@' + width + ': HTTP ' + (response && response.status())); continue; }
      await page.evaluate(async () => {
        document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible'));
        await Promise.all([...document.images].map((img) => {
          img.loading = 'eager';
          return new Promise((resolve) => {
            if (img.complete) return resolve();
            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
            setTimeout(resolve, 5000);
          });
        }));
        await document.fonts.ready;
      });
      const r = await page.evaluate(() => {
        const isWhite = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return false; const [r, g, b, a = '1'] = m[1].split(',').map((n) => parseFloat(n.trim())); return +a > 0.6 && r > 230 && g > 230 && b > 225; };
        const whites = [];
        for (const el of document.querySelectorAll('body *')) {
          const box = el.getBoundingClientRect();
          if (box.width * box.height < 12000) continue;
          const s = getComputedStyle(el);
          if (isWhite(s.backgroundColor)) whites.push({ tag: el.tagName, cls: el.className && String(el.className).slice(0, 80), bg: s.backgroundColor, w: Math.round(box.width), h: Math.round(box.height) });
        }
        return {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content || '',
          canonical: document.querySelector('link[rel="canonical"]')?.href || '',
          h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()),
          bodyBg: getComputedStyle(document.body).backgroundColor,
          htmlBg: getComputedStyle(document.documentElement).backgroundColor,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          whites,
          images: [...document.images].map((img) => ({ src: img.currentSrc, alt: img.alt, decorative: !!img.closest('[aria-hidden="true"]'), nw: img.naturalWidth, nh: img.naturalHeight, loading: img.getAttribute('loading'), w: Math.round(img.getBoundingClientRect().width), h: Math.round(img.getBoundingClientRect().height), inMain: !!img.closest('main') })),
          links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
          hasHeader: !!document.querySelector('header.site-header, header'),
          hasFooter: !!document.querySelector('footer'),
          navCount: document.querySelectorAll('header nav a').length,
        };
      });
      out.push({ route: p.url, width, ...r });
      if (r.overflow > 1) failures.push(p.url + '@' + width + ': overflow ' + r.overflow);
      if (!r.hasHeader) failures.push(p.url + '@' + width + ': no header');
      if (!r.hasFooter) failures.push(p.url + '@' + width + ': no footer');
      if (r.h1.length !== 1) failures.push(p.url + '@' + width + ': h1 count ' + r.h1.length);
      if (r.whites.length) failures.push(p.url + '@' + width + ': white blocks ' + JSON.stringify(r.whites.slice(0, 3)));
      for (const img of r.images) {
        if (!img.nw || !img.nh) failures.push(p.url + '@' + width + ': broken image ' + img.src);
        if (!img.alt && !img.decorative) failures.push(p.url + '@' + width + ': empty alt ' + img.src);
        if (img.w === 0 || img.h === 0) failures.push(p.url + '@' + width + ': hidden/zero image ' + img.src);
      }
      for (const href of r.links) {
        if (!href || href === '#' || href.startsWith('javascript:')) failures.push(p.url + '@' + width + ': dead link ' + href);
      }
    }
    await context.close();
    console.log('Audited at ' + width);
  }
  await browser.close();
  await server.close();
  fs.writeFileSync('docs/performance-audit/_audit-full.json', JSON.stringify(out, null, 2));
  console.log('Records', out.length, 'Failures', failures.length);
  console.log([...new Set(failures)].slice(0, 120).join('\n'));
})();
