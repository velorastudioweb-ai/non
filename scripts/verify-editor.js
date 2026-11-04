'use strict';
/* Visual editor interaction test: log in, open the editor for /faqs/, click a
 * heading in the live preview iframe, edit it in the inspector, confirm the
 * draft persists and publishes, and confirm the public page updates. */
const { chromium } = require('playwright-core');
const BASE = 'http://localhost:8123';
const PW = 'QhGold#2026Admin!x7';
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('PASS | ' + n); } else { fail++; console.log('FAIL | ' + n + (x ? ' | ' + String(x).slice(0, 160) : '')); } };

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push('PAGEERR ' + e.message.slice(0, 220)));

  await page.goto(BASE + '/admin/', { waitUntil: 'load' });
  await page.waitForSelector('#login-form');
  await page.fill('#login-email', 'rjagadeeswara66@gmail.com');
  await page.fill('#login-password', PW);
  await page.click('#login-form button[type=submit]');
  await page.waitForSelector('#shell:not(.hidden)', { timeout: 60000 });

  // open editor directly for FAQs page
  await page.evaluate(() => { location.hash = '#/editor/faqs'; });
  await page.waitForSelector('#editor-frame', { timeout: 30000 });

  // wait for the iframe to index the DOM (seclist populated)
  await page.waitForFunction(() => document.querySelectorAll('#seclist .sec-item').length >= 2, { timeout: 45000 }).catch(() => {});
  const secCount = await page.$$eval('#seclist .sec-item', (n) => n.length);
  ok('editor lists page sections', secCount >= 2, secCount);

  const frame = page.frameLocator('#editor-frame');
  const h1 = frame.locator('h1').first();
  await h1.dispatchEvent('click', { bubbles: true, cancelable: true }, { timeout: 15000 });
  await page.waitForTimeout(400);
  const ta = page.locator('#inspector textarea');
  const hasInspector = await ta.count();
  ok('clicking preview content opens inspector', hasInspector >= 1);
  if (hasInspector) {
    const original = await ta.first().inputValue();
    await ta.first().fill('Frequently Asked Questions - CMS EDITOR VERIFIED');
    await page.waitForTimeout(1400); // debounce autosave
    // check draft persisted server-side
    const draft = await page.evaluate(async (base) => {
      const r = await fetch(base + '/api/qh/admin', { method: 'POST', headers: { 'content-type': 'application/json', 'x-qh-request': '1' }, credentials: 'include', body: JSON.stringify({ action: 'page.get', slug: 'faqs' }) });
      return r.json();
    }, BASE);
    const txt = JSON.stringify(draft.draft || {});
    ok('auto-saved draft contains the edit', /CMS EDITOR VERIFIED/.test(txt), txt.slice(0, 120));

    // preview iframe shows the edit
    await page.waitForTimeout(300);
    const previewH1 = await frame.locator('h1').first().textContent().catch(() => '');
    ok('live preview reflects the edit instantly', /CMS EDITOR VERIFIED/.test(previewH1 || ''), previewH1);

    // publish
    await page.click('#top-actions >> text=Save & Publish');
    let pub = {};
    for (let t = 0; t < 30; t++) {
      pub = await page.evaluate(async (base) => (await fetch(base + '/api/qh/content?page=/faqs/&_=' + Date.now(), { cache: 'no-store' })).json(), BASE);
      if (/CMS EDITOR VERIFIED/.test(JSON.stringify(pub.overlay || {}))) break;
      await page.waitForTimeout(1000);
    }
    ok('publish writes the overlay publicly', /CMS EDITOR VERIFIED/.test(JSON.stringify(pub.overlay || '')));

    // verify public page (fresh context, no session) applies it
    const ctx2 = await browser.newContext();
    const p2 = await ctx2.newPage();
    await p2.goto(BASE + '/faqs/', { waitUntil: 'networkidle' });
    await p2.waitForTimeout(1200);
    const live = await p2.evaluate(() => {
      const hs = Array.from(document.querySelectorAll('h1,h2'));
      return hs.map((h) => h.textContent).join(' | ');
    });
    ok('public visitors see the published edit', /CMS EDITOR VERIFIED/.test(live));

    // cleanup: revert faqs to base content
    await page.evaluate(async (base) => {
      const hdr = { 'content-type': 'application/json', 'x-qh-request': '1' };
      const post = (b) => fetch(base + '/api/qh/admin', { method: 'POST', headers: hdr, credentials: 'include', body: JSON.stringify(b) });
      await post({ action: 'page.unpublish', slug: 'faqs' });
      await post({ action: 'page.discardDraft', slug: 'faqs' });
    }, BASE);
    const pub2 = await page.evaluate(async (base) => (await fetch(base + '/api/qh/content?page=/faqs/&_=' + Date.now(), { cache: 'no-store' })).json(), BASE);
    ok('revert restores base content', !pub2.overlay);
  }
  ok('no page errors during editor session', !errs.length, errs.slice(0, 3).join(' || '));

  await browser.close();
  console.log('\nRESULT: ' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 2 : 0);
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
