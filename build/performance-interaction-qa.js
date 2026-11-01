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

process.env.DISABLE_RATE_LIMIT = '1';

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
      page.on('console', message => {
        if (message.type() !== 'error') return;
        // Without RESEND_API_KEY the honest contact response is 503. Chrome logs
        // that failed fetch as a console error; every other console error stays fatal.
        const source = message.location() ? message.location().url : '';
        if (source.endsWith('/api/contact') && /status of 503/.test(message.text())) return;
        errors.push('Console: ' + message.text());
      });
      await page.goto(base, { waitUntil: 'load' });
      assert.equal(await page.evaluate(() => document.documentElement.classList.contains('js')), true, 'Progressive-enhancement bootstrap did not run');
      await page.evaluate(() => document.fonts.ready);
      // Motion readiness: reveals enable only after in-view targets are marked,
      // and the authored homepage hero must finish its entrance behind the loader.
      await page.waitForFunction(() => document.documentElement.classList.contains('motion-reveals'), null, { timeout: 5000 });
      assert.equal(await page.evaluate(() => document.documentElement.classList.contains('motion-ready')), true, 'Motion system did not initialise');
      await page.waitForFunction(() => {
        const title = document.querySelector('.page-home .hero__title-text');
        return !title || Number(getComputedStyle(title).opacity) > 0.99;
      }, null, { timeout: 3000 });
      // A below-the-fold reveal must resolve once it enters the viewport.
      const lastReveal = page.locator('.reveal').last();
      assert(await lastReveal.count() > 0, 'No reveal targets were authored');
      await lastReveal.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const targets = document.querySelectorAll('.reveal');
        const last = targets[targets.length - 1];
        return !last || (last.classList.contains('is-revealed') && Number(getComputedStyle(last).opacity) > 0.99);
      }, null, { timeout: 5000 });
      assert((await lastReveal.evaluate(el => Number(getComputedStyle(el).opacity))) > 0.99, 'Scrolled reveal did not become visible');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      // Compact and touch navigation stays immediate: no desktop handoff layer.
      if (width < 1024) assert.equal(await page.locator('.page-transition').count(), 0, 'Touch navigation must not use the desktop transition');
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

       await page.goto(base + '/blogs/', { waitUntil: 'load' });
       assert.equal(await page.locator('.blog-card').count(), 10);
       await page.locator('[data-blog-filter="Patient Perspectives"]').click();
       assert.equal(await page.locator('.blog-card:visible').count(), 5);
       // The filter animation must hand transform back to the reveal/hover layer.
       await page.waitForFunction(() => !document.querySelector('.blog-card.filter-enter'), null, { timeout: 3000 });
       assert.equal(await page.locator('.blog-card.filter-enter').count(), 0, 'Blog filter animation class was not cleaned up');
       await page.locator('#blog-search').fill('recovery');
       assert.equal(await page.locator('.blog-card:visible').count(), 1);
       assert.match(await page.locator('#blog-results').innerText(), /^1 article matching your filters$/);
       await page.locator('[data-blog-filter="All Articles"]').click();
       assert.equal(await page.locator('.blog-card:visible').count(), 3);
       await page.locator('.blog-card:visible h2 a').first().click();
       await page.waitForURL(/\/blogs\/[^/]+\/$/);
       assert.equal(await page.locator('.blog-article__figure img').count(), 1);

       await page.goto(base + '/contact/', { waitUntil: 'load' });
      const form = page.locator('[data-consult-form]');
      // Exercise the real endpoint. Without mail credentials it must report an
      // honest failure rather than a false success; no lead is actually sent.
      assert.equal(await form.getAttribute('data-endpoint'), '/api/contact');
      const invalidApi = await page.request.post(base + '/api/contact', {
        headers: { 'X-Forwarded-For': '10.0.0.' + width },
        data: { name: 'A', email: 'not-an-email', country_code: '+91', phone: '1', preferred_country: 'India', preferred_branch: 'la-crown', topic: 'General breast-enlargement information', preferred_date: '2020-01-01', preferred_time: 'Morning (10:00–13:00)', consent: false }
      });
      assert.equal(invalidApi.status(), 422);
      if (!process.env.RESEND_API_KEY) {
        const unavailable = await page.request.post(base + '/api/contact', {
          headers: { 'X-Forwarded-For': '10.0.0.' + width },
          data: { name: 'Layout QA', email: 'layout-qa@example.com', country_code: '+91', phone: '9876543210', preferred_country: 'India', preferred_branch: 'la-crown', topic: 'General breast-enlargement information', preferred_date: '2030-01-01', preferred_time: 'Any time', consent: true }
        });
        assert.equal(unavailable.status(), 503);
        const unavailableBody = await unavailable.json();
        assert.equal(unavailableBody.ok, false);
        assert.equal(unavailableBody.code, 'delivery_unconfigured');
      }
      assert.notEqual(await page.locator('#cf-country-code').getAttribute('required'), null);
      assert.notEqual(await page.locator('#cf-phone').getAttribute('required'), null);
      await form.locator('[type="submit"]').click();
      assert(await page.locator('.field--error').count() > 0);
      assert.equal(await page.locator('#cf-phone').getAttribute('aria-invalid'), 'true');
      await page.locator('#cf-name').fill('Layout QA');
      await page.locator('#cf-email').fill('layout-qa@example.com');
      await page.locator('#cf-country-code').selectOption('+91');
      await page.locator('#cf-phone').fill('9876543210');
      await page.locator('#cf-preferred-country').selectOption('India');
      await page.locator('#cf-preferred-branch').selectOption('la-crown');
      await page.locator('#cf-topic').selectOption({ index: 1 });
      await page.locator('#cf-date').fill('2030-01-01');
      await page.locator('#cf-time').selectOption('Any time');
      await page.locator('#cf-consent').check();
      assert.equal(await page.locator('.field--error').count(), 0);
      await form.locator('[type="submit"]').click();
      await page.waitForFunction(() => !/Sending your appointment enquiry/i.test(document.querySelector('[data-status]').textContent));
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
       results.push({ width, navigation: 'pass', faq: 'pass', blogs: 'pass', contact: 'pass', research: 'pass', motion: 'pass', maxObservedEventMs: Math.max(0, ...events.map(e => e.duration)), events });
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
    // Reduced motion: no reveal gating, no motion styling and no page handoff.
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(String(e)));
      await page.goto(base, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.evaluate(() => document.documentElement.classList.contains('motion-reveals')), false, 'Reduced motion enabled reveal gating');
      assert.equal(await page.evaluate(() => document.documentElement.classList.contains('motion-ready')), false, 'Reduced motion enabled motion styling');
      assert.equal(await page.locator('.page-transition').count(), 0, 'Reduced motion created a page transition');
      assert.equal(await page.locator('.reveal').first().evaluate(el => getComputedStyle(el).opacity), '1', 'Reduced motion hid reveal content');
      assert.deepEqual(errors, []);
      await context.close();
      console.log('Reduced motion passed');
    }
    // Fine-pointer desktop navigation uses the short handoff without blocking input.
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      await context.addInitScript(() => {
        const real = window.matchMedia.bind(window);
        window.matchMedia = query => query === '(hover: hover) and (pointer: fine)'
          ? { matches: true, media: query, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } }
          : real(query);
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(String(e)));
      await page.goto(base, { waitUntil: 'load' });
      const overlay = page.locator('.page-transition');
      assert.equal(await overlay.count(), 1, 'Fine-pointer desktop did not create a page transition');
      assert.equal(await overlay.evaluate(el => getComputedStyle(el).pointerEvents), 'none', 'Transition overlay blocks input at rest');
      await page.locator('.site-footer a[href="/surgical-breast-enlargement/"]').first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      await page.locator('.site-footer a[href="/surgical-breast-enlargement/"]').first().click();
      await page.waitForFunction(() => document.documentElement.classList.contains('is-leaving'), null, { timeout: 2000 });
      await page.waitForURL(/\/surgical-breast-enlargement\/$/);
      assert.equal(await page.evaluate(() => document.documentElement.classList.contains('is-leaving')), false, 'Transition state survived navigation');
      assert.deepEqual(errors, []);
      await context.close();
      console.log('Desktop page transition passed');
    }
    const out = path.join(ROOT, 'docs/performance-audit');
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, label + '-interactions.json'), JSON.stringify({ base, note: 'Lab Event Timing observations, not field INP.', results }, null, 2));
    console.log('PASS: navigation, FAQ, blog filters/search/article links, contact validation, research search/year/sort/pagination/abstracts, hashes, reveals, reduced motion, desktop handoff and no-JS rendering.');
  } finally { await browser.close(); await server.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
