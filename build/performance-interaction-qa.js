'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const { chromium } = require('playwright-core');
const { startAuditServer } = require('./audit-server');
const args = process.argv.slice(2);
const arg = name => args.includes(name) ? args[args.indexOf(name) + 1] : null;
let base = arg('--base');
const label = arg('--label') || 'local';
const data = require('../public/assets/data/pmc-breast-enlargement.json');
const ROOT = path.resolve(__dirname, '..');

(async () => {
  const server = await startAuditServer(base);
  base = server.base;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 1024 });
      await context.addInitScript(() => {
        window.measuredEvents = [];
        new PerformanceObserver(list => list.getEntries().forEach(e => {
          if (e.interactionId) window.measuredEvents.push({ name: e.name, duration: e.duration });
        })).observe({ type: 'event', buffered: true, durationThreshold: 16 });
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(String(e)));
      await page.goto(base, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => window.scrollTo({ top: 100, behavior: 'instant' }));
      await page.waitForFunction(() => document.querySelector('.site-header').classList.contains('is-scrolled'));
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForFunction(() => !document.querySelector('.site-header').classList.contains('is-scrolled'));
      await page.locator('.hero__actions a[href="#treatments"]').click();
      await page.waitForFunction(() => {
        const box = document.querySelector('#treatments').getBoundingClientRect();
        return box.top >= -1 && box.top < innerHeight;
      });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      if (width < 1024) {
        await page.locator('.nav-toggle').click();
        await page.locator('.mobile-nav.is-open').waitFor({ state: 'visible' });
        assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'), 'true');
        const summary = page.locator('.mobile-nav__topics summary').first();
        await summary.click();
        assert.equal(await summary.evaluate(el => el.parentElement.open), true);
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.querySelector('.mobile-nav').contains(document.activeElement)), true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'), 'false');
        assert.equal(await page.locator('.nav-toggle').evaluate(el => el === document.activeElement), true);
      } else {
        for (const toggle of await page.locator('.nav__dropdown-toggle').all()) {
          await toggle.click();
          const menu = page.locator('#' + await toggle.getAttribute('aria-controls'));
          await menu.waitFor({ state: 'visible' });
          const box = await menu.boundingBox();
          assert(box.x >= 0 && box.x + box.width <= width, 'Dropdown outside viewport');
          await page.keyboard.press('Escape');
          assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        }
      }
      const navEvents = await page.evaluate(() => window.measuredEvents);
      await page.goto(base + '/faqs/', { waitUntil: 'load' });
      const questions = page.locator('.faq__q');
      await questions.first().click();
      await questions.nth(1).click();
      assert.equal(await page.locator('.faq__item.is-open').count(), 1);
      assert.equal(await questions.nth(1).getAttribute('aria-expanded'), 'true');
      await page.waitForTimeout(400);
      assert(await page.locator('.faq__item.is-open .faq__a').evaluate(el => el.clientHeight >= el.scrollHeight - 2));
      const faqEvents = await page.evaluate(() => window.measuredEvents);

      await page.goto(base + '/contact/', { waitUntil: 'load' });
      const form = page.locator('[data-consult-form]');
      // Exercise the existing unconfigured-endpoint feedback, never send a lead.
      assert.equal(await form.getAttribute('data-endpoint'), '');
      await form.locator('[type="submit"]').click();
      assert(await page.locator('.field--error').count() > 0);
      await page.locator('#cf-name').fill('Layout QA');
      await page.locator('#cf-email').fill('layout-qa@example.com');
      await page.locator('#cf-interest').selectOption({ index: 1 });
      await page.locator('#cf-consent').check();
      await form.locator('[type="submit"]').click();
      const feedback = await page.locator('[data-status]').innerText();
      assert(/not.*sent|not.*connected|not.*configured/i.test(feedback), feedback);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);

      await page.goto(base + '/research/#fda', { waitUntil: 'load' });
      assert.equal(await page.locator('#fda > details').evaluate(el => el.open), true);
      await page.waitForFunction(() => {
        const box = document.querySelector('#fda').getBoundingClientRect();
        return box.top >= -1 && box.top < innerHeight;
      });
      await page.locator('#pmc-q').fill('implant');
      await page.waitForFunction(() => document.querySelector('#pmc-meta').textContent.includes('matching'));
      const expected = data.articles.filter(a => (a.title + ' ' + (a.abstract || '') + ' ' + (a.authors || []).join(' ') + ' ' + (a.journal || '')).toLowerCase().includes('implant'));
      const firstYear = await page.locator('#pmc-year option').nth(1).getAttribute('value');
      await page.locator('#pmc-year').selectOption(firstYear);
      await page.locator('#pmc-sort').selectOption('title');
      const selected = expected.filter(a => String(a.year) === firstYear).sort((a, b) => a.title.localeCompare(b.title));
      assert.equal(await page.locator('.research-item').count(), Math.min(25, selected.length));
      if (selected.length) assert.equal(await page.locator('.research-item__title a').first().innerText(), selected[0].title);
      await page.locator('#pmc-q').fill('');
      await page.locator('#pmc-year').selectOption('');
      await page.locator('#pmc-sort').selectOption('year-desc');
      await page.waitForTimeout(250);
      await page.locator('button[data-page="2"]').first().click();
      assert.equal(await page.locator('.research__page[aria-current="page"]').innerText(), '2');
      await page.locator('.research-item__abstract summary').first().click();
      assert(await page.locator('.research-item__abstract[open]').count());
      const researchEvents = await page.evaluate(() => window.measuredEvents);
      const events = [...navEvents, ...faqEvents, ...researchEvents];
      assert.deepEqual(errors, []);
      results.push({ width, navigation: 'pass', faq: 'pass', contact: 'pass', research: 'pass', maxObservedEventMs: Math.max(0, ...events.map(e => e.duration)), events });
      await context.close();
      console.log('Interactions passed at ' + width + 'px');
    }
    // Without JavaScript the complete authored content must remain visible.
    for (const width of [320, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: false });
      const page = await context.newPage();
      await page.goto(base, { waitUntil: 'load' });
      assert.equal(await page.locator('h1').isVisible(), true);
      assert.equal(await page.locator('.reveal').first().evaluate(el => getComputedStyle(el).opacity), '1');
      await context.close();
    }
    const out = path.join(ROOT, 'docs/performance-audit');
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, label + '-interactions.json'), JSON.stringify({ base, note: 'Lab Event Timing observations, not field INP.', results }, null, 2));
    console.log('PASS: navigation, FAQ, contact validation, research search/year/sort/pagination/abstracts, hashes and no-JS rendering.');
  } finally { await browser.close(); await server.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
