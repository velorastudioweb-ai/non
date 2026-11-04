'use strict';
const { chromium } = require('playwright-core');
const BASE = 'http://localhost:8123';
(async () => {
  const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const p = await b.newPage();
  p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) console.log('CONSOLE', m.type(), m.text().slice(0, 160)); });
  p.on('pageerror', (e) => console.log('PAGEERR', e.message.slice(0, 220)));
  p.on('requestfailed', (r) => console.log('REQFAIL', r.url(), r.failure() && r.failure().errorText));
  p.on('response', (r) => { if (r.url().includes('/api/qh') && rtrue) console.log('API', r.status(), r.url().slice(0, 90)); });
  await p.goto(BASE + '/admin/');
  await p.waitForSelector('#login-form', { timeout: 20000 });
  await p.fill('#login-email', 'rjagadeeswara66@gmail.com');
  await p.fill('#login-password', 'QhGold#2026Admin!x7');
  await p.click('#login-form button[type=submit]');
  await p.waitForTimeout(6000);
  const state = await p.evaluate(() => ({
    shellHidden: document.getElementById('shell').classList.contains('hidden'),
    loginHidden: document.getElementById('login').classList.contains('hidden'),
    toast: document.getElementById('toast').textContent
  }));
  console.log('STATE', JSON.stringify(state));
  if (!state.shellHidden) {
    await p.evaluate(() => { location.hash = '#/editor/faqs'; });
    await p.waitForTimeout(6000);
    const st2 = await p.evaluate(() => ({
      secItems: document.querySelectorAll('#seclist .sec-item').length,
      topBtns: Array.from(document.querySelectorAll('#top-actions button')).map((x) => x.textContent),
      frame: !!document.getElementById('editor-frame')
    }));
    console.log('EDITOR', JSON.stringify(st2));
  }
  await b.close();
})();
