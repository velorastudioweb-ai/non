'use strict';
// Real production HTML: no banner/hero exclusions. Save each banner and verify
// its loaded image, uncropped geometry, text separation and horizontal bounds.
const fs = require('fs');
const path = require('path');
const { startAuditServer } = require('./audit-server');
const { chromium } = require('playwright-core');
const { allPages } = require('./structure');
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const baseline = args.includes('--baseline');
// The current desktop design deliberately uses cover on photographic banners.
// Opt in to that treatment explicitly; mobile/tablet must always remain uncropped.
const allowDesktopCover = args.includes('--allow-desktop-cover');
const arg = name => args.includes(name) ? args[args.indexOf(name) + 1] : null;
let base = arg('--base');
const label = arg('--label') || (baseline ? 'before' : 'after');
const out = path.join(ROOT, 'docs/performance-audit', label);
const widths = arg('--widths') ? arg('--widths').split(',').map(Number) : baseline ? [390, 1440] : [320, 375, 390, 430, 768, 1024, 1440, 1920];
const heights = { 320: 568, 375: 812, 390: 844, 430: 932, 768: 1024, 1024: 768, 1440: 900, 1920: 1080 };
const routes = args.includes('--quick') || baseline
  ? ['/', '/surgical-breast-enlargement/', '/breast-implants/', '/non-surgical-breast-enlargement/', '/doctors/dr-vikas-singh/']
  : [...allPages.map(p => p.url), '/404.html'];

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const server = await startAuditServer(base);
  base = server.base;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [], problems = [];
  const writeReport = () => {
    const desktopCrops = results.filter(r => r.width >= 1024 && r.banners.some(b => !b.uncropped)).map(r => ({ route: r.route, width: r.width }));
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ base, label, allowDesktopCover, checks: results.length, desktopCrops, problems, results }, null, 2));
    return desktopCrops;
  };
  try {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: heights[width] }, deviceScaleFactor: Number(arg('--dpr') || 1), isMobile: width < 768, hasTouch: width < 1024 });
      const page = await context.newPage();
      let errors = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('response', response => {
        const expected404 = response.status() === 404 && new URL(response.url()).pathname === '/__performance-qa-not-found/';
        if (response.status() >= 400 && !expected404) errors.push(response.status() + ' ' + response.url());
      });
      for (const route of routes) {
        errors = [];
        const response = await page.goto(base + (route === '/404.html' ? '/__performance-qa-not-found/' : route), { waitUntil: 'load' });
        await page.evaluate(() => document.fonts.ready);
        const status = response.status();
        const heading = page.locator('.hero, .page-banner').first();
        await page.screenshot({ path: path.join(out, `${route === '/' ? 'home' : route.replace(/\W+/g, '-')}-${width}-viewport.png`) });
        if (await heading.count()) {
          await heading.screenshot({ path: path.join(out, `${route === '/' ? 'home' : route.replace(/\W+/g, '-')}-${width}-banner.png`) });
        }
        // Native lazy loading must be exercised, not disabled by the test.
        for (const image of await page.locator('main img').all()) {
          if (await image.isVisible()) {
            await image.scrollIntoViewIfNeeded();
            await image.evaluate(el => el.decode().catch(() => {}));
          }
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        const metrics = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const bounds = el => { const r = el.getBoundingClientRect(); return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
          const visible = el => el.checkVisibility({ checkVisibilityCSS: true, checkOpacity: true }) && el.getBoundingClientRect().width > 0;
          const banners = [...document.querySelectorAll('.hero__bg img, .page-banner__art img')].map(img => {
            const section = img.closest('.hero, .page-banner');
            const copy = section.querySelector('.hero__inner, .page-banner__inner');
            const box = bounds(img), text = bounds(copy), css = getComputedStyle(img);
            const ratio = img.naturalWidth / img.naturalHeight;
            const art = img.closest('.hero__bg, .page-banner__art');
            return { src: img.currentSrc, loaded: img.complete && img.naturalWidth > 0, fit: css.objectFit, box, text,
              uncropped: css.objectFit === 'contain' || Math.abs(box.width / box.height - ratio) / ratio < .01,
              separate: box.bottom <= text.top + 1 || text.bottom <= box.top + 1,
              artOpacity: getComputedStyle(art).opacity, loading: img.loading, priority: img.fetchPriority };
          });
          const broken = [...document.images].filter(visible).filter(img => !img.complete || !img.naturalWidth).map(img => img.currentSrc || img.src);
          const outside = [];
          for (const el of document.querySelectorAll('h1,h2,h3,h4,p,li,label,button,a,img,.card,.container,.hero__inner')) {
            if (!visible(el) || el.closest('.skip-link, .hp-field, .mobile-nav:not(.is-open), .page-banner__figure')) continue;
            let scrollable = false;
            for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
              if (['auto', 'scroll'].includes(getComputedStyle(p).overflowX) && p.scrollWidth > p.clientWidth) { scrollable = true; break; }
            }
            if (scrollable) continue;
            const r = bounds(el);
            if (r.right > vw + 2 || r.left < -2 || (el.matches('h1,h2,h3,p,button') && el.scrollWidth > el.clientWidth + 2)) outside.push(el.tagName + '.' + el.className);
          }
          return { overflow: Math.max(0, document.documentElement.scrollWidth - vw), banners, broken, outside: [...new Set(outside)], images: document.images.length };
        });
        const entry = { route, width, status, errors: [...errors], ...metrics };
        results.push(entry);
        if (!baseline && (errors.length || metrics.overflow > 1 || metrics.broken.length || metrics.outside.length ||
          metrics.banners.some(b => !b.loaded || (!b.uncropped && (!allowDesktopCover || width < 1024)) || (width < 1024 && !b.separate) || b.loading === 'lazy') ||
          status !== (route === '/404.html' ? 404 : 200))) problems.push(entry);
      }
      await context.close();
      writeReport();
      console.log(`Checked ${routes.length} pages at ${width}px`);
    }
    const desktopCrops = writeReport();
    if (allowDesktopCover) console.log('Desktop cover crops recorded: ' + desktopCrops.length + '; mobile/tablet full-image checks remain strict.');
    console.log(`${baseline ? 'Baseline captured' : problems.length ? 'FAIL' : 'PASS'}: ${results.length} page/viewport renders; ${problems.length} failing renders.`);
    if (problems.length) console.log(problems.map(p => ({ route: p.route, width: p.width, outside: p.outside, errors: p.errors, broken: p.broken, banners: p.banners })).slice(0, 10));
    if (problems.length) process.exitCode = 1;
  } finally {
    await browser.close();
    await server.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
