'use strict';
const { chromium } = require('playwright-core');
const { startAuditServer } = require('./audit-server');
(async () => {
  const server = await startAuditServer();
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 375, height: 900 }, hasTouch: true });
    const page = await context.newPage();
    await page.goto(server.base + '/contact/', { waitUntil: 'load' });
    const form = page.locator('[data-consult-form]');
    await form.locator('[type="submit"]').click();
    await page.locator('#cf-name').fill('Layout QA');
    await page.locator('#cf-email').fill('layout-qa@example.com');
    await page.locator('#cf-country-code').selectOption('+91');
    await page.locator('#cf-phone').fill('9876543210');
    await page.locator('#cf-interest').selectOption({ index: 1 });
    await page.locator('#cf-consent').check();
    console.log(await page.evaluate(() => {
      const f = document.querySelector('[data-consult-form]');
      return [...f.querySelectorAll('input,select,textarea')].map(i => ({ name: i.name, type: i.type, value: i.type === 'checkbox' ? i.checked : i.value, required: i.required, invalid: i.getAttribute('aria-invalid'), err: i.closest('.field,.checkbox')?.querySelector('.field__error')?.textContent }));
    }));
    console.log('errors before submit', await page.locator('.field--error').count());
    await form.locator('[type="submit"]').click();
    console.log('feedback', await page.locator('[data-status]').innerText());
    console.log('errors after submit', await page.locator('.field--error').count());
    await context.close();
  } finally { await browser.close(); await server.close(); }
})();
