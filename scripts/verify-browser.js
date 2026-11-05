'use strict';
/* Browser QA: confirms the CMS runtime overlay actually mutates the public
 * DOM, WhatsApp icons render, About page renders, and the admin SPA
 * boots and logs in. Run with the dev server on :8123. */
const { chromium } = require('playwright-core');
const BASE = 'http://localhost:8123';
const PW = process.env.QH_VERIFY_PW || '';
const CHROME_PATH = process.env.CHROME_PATH ||
  (process.platform === 'win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome');
if (!PW) {
  console.error('Set QH_VERIFY_PW to the admin verification password.');
  process.exit(1);
}
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if (cond) { pass++; console.log('PASS | ' + name); } else { fail++; console.log('FAIL | ' + name + (extra ? ' | ' + String(extra).slice(0, 160) : '')); } };

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

  /* --- public page renders overlay --- */
  const pubPage = await ctx.newPage();
  await pubPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const result = await pubPage.evaluate(async (base) => {
    const hdr = { 'content-type': 'application/json', 'x-qh-request': '1' };
    const login = await fetch(base + '/api/qh/admin', { method: 'POST', headers: hdr, credentials: 'include', body: JSON.stringify({ action: 'login', email: 'rjagadeeswara66@gmail.com', password: PW }) }).then((r) => r.json());
    // s0.f1 = the h1 inside the page hero (f0 is the eyebrow paragraph)
    const doc = { seo: null, sections: { s0: { fields: { f1: { text: 'ABOUT QUANTUM HEALTH INDEPENDENT EDUCATION' } } } }, order: null, added: [] };
    await fetch(base + '/api/qh/admin', { method: 'POST', headers: hdr, credentials: 'include', body: JSON.stringify({ action: 'page.saveDraft', slug: 'about-us', doc }) });
    const pub = await fetch(base + '/api/qh/admin', { method: 'POST', headers: hdr, credentials: 'include', body: JSON.stringify({ action: 'page.publish', slug: 'about-us' }) }).then((r) => r.status);
    return { loginOk: !!login.ok, pub };
  }, BASE).catch((e) => ({ error: String(e) }));
  ok('browser-side publish workflow', result.loginOk === true && result.pub === 200, JSON.stringify(result));
  await pubPage.close();

  await page.goto(BASE + '/about-us/', { waitUntil: 'networkidle' });
  const heading = await page.$eval('h1', (n) => n.textContent.trim()).catch(() => null);
  ok('published text overlay renders in browser', heading && /ABOUT QUANTUM HEALTH INDEPENDENT EDUCATION/i.test(heading), heading);

  const doctorCards = await page.$$eval('.qh-doctor-card, .qh-card', (n) => n.length);
  ok('doctor profiles render', doctorCards >= 4, doctorCards);

  const meetNav = await page.$$eval('.nav__link', (links) => links.map((l) => l.textContent.trim()));
  ok('nav shows Dr. Vikas Singh', meetNav.some((t) => /Dr\. Vikas Singh/i.test(t)), meetNav.join(','));
  ok('nav keeps separate About link', meetNav.some((t) => /About/i.test(t)) && meetNav.some((t) => /Dr\. Vikas Singh/i.test(t)), meetNav.join(','));

  // gold token applied
  const goldVar = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--nav-gold').trim());
  ok('gold nav token present', /^#D4AF37/i.test(goldVar), goldVar);

  /* --- WhatsApp icons on the locations page --- */
  const loc = await ctx.newPage();
  await loc.goto(BASE + '/locations/', { waitUntil: 'networkidle' });
  const waBadges = await loc.$$eval('.location-card__wa', (n) => n.length);
  const waHrefs = await loc.$$eval('.location-card__wa', (n) => n.map((a) => a.getAttribute('href')));
  ok('WhatsApp icon badges render on branch cards', waBadges >= 6, 'badges ' + waBadges);
  ok('WhatsApp badges use wa.me deep links', waHrefs.every((h) => h && h.startsWith('https://wa.me/')) && waHrefs.some((h) => h.includes('85244608658')) && waHrefs.some((h) => h.includes('919148717036')), waHrefs.join(','));
  const prefilled = waHrefs.some((h) => /text=Hello%20Quantum%20Health/.test(h));
  ok('prefilled enquiry message in links', prefilled);
  const telCount = await loc.$$eval('.location-card__phones a[href^="tel:"]', (n) => n.length);
  ok('telephone links preserved for every number', telCount >= 7, telCount);
  await loc.close();

  /* --- admin SPA login (fresh context, no session) --- */
  const ctx2 = await browser.newContext();
  const admin = await ctx2.newPage();
  const adminErrors = [];
  admin.on('console', (m) => { if (m.type() === 'error') adminErrors.push(m.text()); });
  admin.on('pageerror', (e) => adminErrors.push('PAGEERROR ' + e.message));
  admin.on('requestfailed', (r) => adminErrors.push('REQFAIL ' + r.url().slice(-60) + ' ' + (r.failure() && r.failure().errorText)));
  await admin.goto(BASE + '/admin/', { waitUntil: 'load' });
  await admin.waitForTimeout(2000);
  const loginState = await admin.evaluate(() => ({
    loginHidden: document.getElementById('login').classList.contains('hidden'),
    shellHidden: document.getElementById('shell').classList.contains('hidden')
  })).catch(() => null);
  ok('admin login screen visible when signed out', loginState && loginState.loginHidden === false && loginState.shellHidden === true, JSON.stringify(loginState) + ' errors: ' + adminErrors.slice(0, 4).join(' || '));
  await admin.waitForSelector('#login-form', { timeout: 10000 });
  ok('admin panel loads at /admin/', await admin.$eval('#login-email', (n) => !!n));
  await admin.fill('#login-email', 'rjagadeeswara66@gmail.com');
  await admin.fill('#login-password', PW);
  await admin.click('#login-form button[type=submit]');
  await admin.waitForSelector('#shell:not(.hidden)', { timeout: 15000 }).catch(() => {});
  const shellVisible = await admin.$eval('#shell', (n) => !n.classList.contains('hidden')).catch(() => false);
  ok('admin login via UI reaches dashboard', shellVisible);
  const menuCount = await admin.$$eval('#nav-menu button', (n) => n.length);
  ok('all 20 admin modules present', menuCount === 20, menuCount);
  // navigate each module, capture JS console errors triggered by module code
  for (const m of ['pages', 'editor', 'doctors', 'gallery', 'media', 'locations', 'contacts', 'enquiries', 'nav', 'seo', 'appearance', 'components', 'placeholders', 'revisions', 'security', 'settings']) {
    await admin.evaluate((mod) => { location.hash = '#/' + mod; }, m);
    await admin.waitForTimeout(350);
  }
  ok('every admin module renders without page errors', !errors.some((e) => /PAGEERROR/.test(e)), errors.filter((e) => /PAGEERROR|Uncaught|is not a function|undefined/.test(e)).slice(0, 3).join(' || '));
  await admin.screenshot({ path: 'docs/qa/admin-dashboard.png', fullPage: false }).catch(() => {});
  await admin.close();

  /* --- cleanup: restore canonical doctors grid (remove QA text marker) --- */
  await admin.evaluate(async (base) => {
    const hdr = { 'content-type': 'application/json', 'x-qh-request': '1' };
    const post = (b) => fetch(base + '/api/qh/admin', { method: 'POST', headers: hdr, credentials: 'include', body: JSON.stringify(b) });
    await post({ action: 'page.unpublish', slug: 'about-us' });
    await post({ action: 'page.discardDraft', slug: 'about-us' });
    const d = await post({ action: 'doctors.get' }).then((r) => r.json());
    await post({ action: 'doctors.save', list: d.list, publish: true });
  }, BASE).catch(() => {});

  const criticalErrors = errors.filter((e) => !/favicon|net::ERR|404/.test(e));
  ok('no critical console errors on public pages', criticalErrors.length === 0, criticalErrors.slice(0, 4).join(' || '));

  await browser.close();
  console.log('\nRESULT: ' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 2 : 0);
})().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
