'use strict';
/* Preflight: the routes the last audit flagged at 320px — verify against the
   current build: no horizontal overflow, banner image inside viewport, and
   every header/brand asset request returns 200. */
const { chromium } = require('playwright-core');
const { startAuditServer } = require('./build/audit-server');
(async () => {
  const server = await startAuditServer(null);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  let fails = 0;
  try {
    for (const route of ['/', '/surgical/breast-lift/', '/surgical/silicone-vs-saline-implants/', '/surgical/fat-transfer-breast-augmentation/', '/surgical/mastectomy-chest-surgery/']) {
      const ctx = await browser.newContext({ viewport: { width: 320, height: 700 }, hasTouch: true, isMobile: true });
      const page = await ctx.newPage();
      const bad = [];
      page.on('response', (r) => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url().replace(server.base, '')); });
      await page.goto(server.base + route, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(900);
      const geo = await page.evaluate(() => {
        const overflow = document.documentElement.scrollWidth > window.innerWidth + 1;
        const img = document.querySelector('.page-banner__image, .editorial-image.page-banner__image, img.page-banner__image');
        const r = img ? img.getBoundingClientRect() : null;
        const logo = document.querySelector('.brand__logo img, img.brand__logo');
        const logoOk = !logo || (logo.currentSrc || logo.src) !== '' && logo.naturalWidth > 0;
        return { overflow, bannerRight: r ? Math.round(r.right) : null, bannerInside: r ? r.right <= 320.5 && r.left >= -0.5 : true, logoPresent: !!logo, logoLoaded: logoOk };
      });
      const pass = !geo.overflow && geo.bannerInside && bad.length === 0 && geo.logoLoaded;
      if (!pass) fails++;
      console.log((pass ? 'PASS ' : 'FAIL ') + route + ' overflow=' + geo.overflow + ' banner=' + geo.bannerRight + '/320 inside=' + geo.bannerInside + ' logo=' + geo.logoLoaded + (geo.logoPresent ? '' : ' (no brand img)') + (bad.length ? ' http: ' + bad.join(', ') : ''));
      await ctx.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
  process.exitCode = fails ? 1 : 0;
  console.log(fails ? fails + ' route(s) need attention' : 'All preflight routes clean');
})().catch((e) => { console.error(e); process.exitCode = 1; });
