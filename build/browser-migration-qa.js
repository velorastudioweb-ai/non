'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright-core');
const { allPages, redirects, sections } = require('./structure');

async function main() {
  const base = 'http://127.0.0.1:8134';
  const server = spawn(process.execPath, [path.join(__dirname, 'serve.js'), '--port', '8134'], { stdio: 'ignore' });
  let browser;
  try {
    for (let i = 0; i < 50; i++) {
      try { if ((await fetch(base)).ok) break; } catch (_) { /* starting */ }
      await new Promise((r) => setTimeout(r, 100));
    }
    for (const p of allPages) assert.equal((await fetch(base + p.url)).status, 200, p.url);
    for (const r of redirects) {
      const response = await fetch(base + r.from, { redirect: 'manual' });
      assert.equal(response.status, 301, r.from);
      assert.equal(response.headers.get('location'), r.to);
    }
    assert.equal((await fetch(base + '/removed-unrelated-example/')).status, 404);
    const chrome = ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find((p) => fs.existsSync(p));
    browser = await chromium.launch({ executablePath: chrome, headless: true });
    for (const width of [320, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      await page.goto(base, { waitUntil: 'networkidle' });
      if (await page.locator('.nav-toggle').isVisible()) {
        await page.locator('.nav-toggle').click();
        assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'), 'true');
        const links = page.locator('.mobile-nav__link');
        assert.equal(await links.count(), 5);
        for (const link of await links.all()) assert((await link.boundingBox()).height >= 40, 'Small menu touch target');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.nav-toggle').getAttribute('aria-expanded'), 'false');
      }
      await page.goto(base + '/faqs/');
      await page.locator('.faq__q').first().click();
      assert.equal(await page.locator('.faq__q').first().getAttribute('aria-expanded'), 'true');
      for (const s of sections) {
        await page.goto(base + s.href, { waitUntil: 'networkidle' });
        assert.equal(await page.locator('h1').count(), 1);
      }
      await context.close();
    }
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(base + '/research/fda-breast-enlargement/', { waitUntil: 'networkidle' });
    assert(page.url().endsWith('/research/#fda'));
    assert(await page.locator('#fda > details').evaluate((e) => e.open), 'Redirected collection must open');
    await page.goto(base + '/research/#pmc', { waitUntil: 'networkidle' });
    await page.waitForSelector('.research-item');
    await page.locator('#pmc-q').fill('capsular contracture');
    await page.waitForTimeout(500);
    assert((await page.locator('.research-item').count()) > 0, 'Research search has no results');
    assert(!(await page.locator('#pmc-meta').innerText()).includes('Loading'));
    await page.locator('#pmc-sort').selectOption('year-asc');
    assert((await page.locator('.research-item').count()) > 0);
    const firstAbstract = page.locator('.research-item__abstract summary').first();
    if (await firstAbstract.count()) {
      await firstAbstract.click();
      assert(await firstAbstract.evaluate((e) => e.parentElement.open));
    }
    console.log('HTTP/browser interactions PASS: 36 direct routes, 36 HTTP 301 redirects, unmatched 404, mobile/tablet/desktop menus, FAQ, source deep-link reveal, PMC search, sort and abstract.');
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
