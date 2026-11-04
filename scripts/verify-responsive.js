'use strict';
/* Responsive + payload QA across viewports on the local build. */
const { chromium } = require('playwright-core');
const BASE = 'http://localhost:8123';
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('PASS | ' + n); } else { fail++; console.log('FAIL | ' + n + (x ? ' | ' + String(x).slice(0, 180) : '')); } };

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const views = [[360, 640, 'small Android phone'], [412, 915, 'large phone'], [768, 1024, 'tablet'], [1366, 768, 'laptop']];
  const pagesToCheck = ['/', '/meet-doctors/', '/locations/', '/surgical/breast-augmentation/', '/contact/'];
  for (const [w, h, label] of views) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 500, hasTouch: w < 500 });
    for (const path of pagesToCheck) {
      const page = await ctx.newPage();
      await page.goto(BASE + path, { waitUntil: 'networkidle' }).catch(() => {});
      await page.waitForTimeout(700);
      const r = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth
      }));
      ok('no horizontal overflow at ' + w + 'px ' + label + ' on ' + path, r.scrollW <= r.clientW + 1, 'scrollW ' + r.scrollW + ' vs clientW ' + r.clientW);
      await page.close();
    }
    await ctx.close();
  }
  // mobile quickbar present with WhatsApp
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mp = await mctx.newPage();
  await mp.goto(BASE + '/', { waitUntil: 'networkidle' });
  await mp.waitForTimeout(800);
  const quick = await mp.$$eval('.mobile-quickbar a', (a) => a.map((x) => x.getAttribute('href')));
  ok('mobile quick bar: call + whatsapp + locations + enquire', quick.length === 4 && quick.some((h) => h.startsWith('tel:')) && quick.some((h) => h.startsWith('https://wa.me/')), quick.join(' | '));
  const menu = await mp.$('.nav-toggle');
  await menu.click();
  await mp.waitForTimeout(500);
  const navOpen = await mp.$eval('#mobile-nav', (n) => getComputedStyle(n).visibility !== 'hidden' && n.getBoundingClientRect().height > 100).catch(() => false);
  ok('mobile menu opens', navOpen);
  const meetLink = await mp.$$eval('#mobile-nav a', (a) => a.map((x) => x.textContent.trim()).filter((t) => /Meet Doctors/i.test(t)).length);
  ok('Meet Doctors in mobile menu', meetLink >= 1);
  await mctx.close();

  /* payload probe (measured bytes over the wire) */
  const pctx = await browser.newContext();
  const pp = await pctx.newPage();
  let homeBytes = 0, homeImgs = 0, jsKB = 0, cssKB = 0, imgKB = 0;
  pp.on('response', async (res) => {
    try {
      const len = Number(res.headers()['content-length'] || 0);
      const u = res.url();
      if (len) {
        homeBytes += len;
        if (u.endsWith('.js')) jsKB += len / 1024;
        if (u.endsWith('.css')) cssKB += len / 1024;
        if (/\.(webp|png|jpe?g|svg)$/.test(u)) imgKB += len / 1024;
      }
    } catch (e) {}
  });
  await pp.goto(BASE + '/', { waitUntil: 'networkidle' });
  homeImgs = await pp.$$eval('img', (n) => n.length);
  const lazy = await pp.$$eval('img[loading="lazy"], img[loading]', (n) => n.length);
  ok('below-fold images lazy-loaded', lazy >= Math.max(5, Math.floor(homeImgs * 0.6)), 'lazy ' + lazy + ' of ' + homeImgs);
  const heroPriority = await pp.$eval('.hero__image', (n) => n.getAttribute('fetchpriority') || n.closest('[fetchpriority]') ? 'set' : 'unset').catch(() => 'none');
  ok('hero image fetchpriority declared', heroPriority === 'set', heroPriority);
  console.log('INFO | homepage total transfer ~' + Math.round(homeBytes / 1024) + ' KB (js ' + Math.round(jsKB) + ' KB, css ' + Math.round(cssKB) + ' KB, images ' + Math.round(imgKB) + ' KB)');
  await pctx.close();

  await browser.close();
  console.log('\nRESULT: ' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 2 : 0);
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
