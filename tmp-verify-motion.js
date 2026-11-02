'use strict';
/* Temporary verification for the two requested effects:
   1. scroll-triggered text reveal (word-split headings, fade + rise, paragraphs after headings)
   2. card hover highlight (scale 1.03, theme glow, 0.3s, siblings untouched, touch press fallback) */
const assert = require('assert/strict');
const { chromium } = require('playwright-core');
const { startAuditServer } = require('./build/audit-server');

const results = [];
const check = (name, pass, detail) => {
  results.push({ name, pass, detail: detail === undefined ? '' : String(detail) });
  console.log((pass ? 'PASS' : 'FAIL') + ': ' + name + (detail !== undefined ? ' — ' + detail : ''));
};
const matrixScale = (m) => {
  const values = String(m).match(/matrix\(([^)]+)\)/);
  if (!values) return null;
  return Number(values[1].split(',')[0]);
};
const matrixY = (m) => {
  const values = String(m).match(/matrix\(([^)]+)\)/);
  if (!values) return null;
  return Number(values[1].split(',')[5]);
};

(async () => {
  const server = await startAuditServer(null);
  const base = server.base;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  /* ---------- Desktop: reveal + hover ---------- */
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(base + '/', { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.documentElement.classList.contains('motion-reveals'), null, { timeout: 5000 });

  check('A1 word-by-word heading split is active', (await page.locator('.motion-split').count()) > 0,
    (await page.locator('.motion-split').count()) + ' split headings');

  // Below-the-fold paragraph text: hidden after the gate settles, revealed on scroll.
  await page.waitForTimeout(1300);
  const targetInfo = await page.evaluateHandle(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    return els.find((el) => !el.classList.contains('is-revealed') && el.getBoundingClientRect().top > window.innerHeight + 300) || null;
  });
  const target = targetInfo.asElement();
  if (target) {
    const before = await target.evaluate((el) => Number(getComputedStyle(el).opacity));
    check('A2 offscreen text starts faded (awaiting reveal)', before < 0.15, before);
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);
    const after = await target.evaluate((el) => Number(getComputedStyle(el).opacity));
    check('A3 text smoothly reveals as it enters the screen', after > 0.99, after);
    await page.waitForTimeout(2500);
    const still = await target.evaluate((el) => Number(getComputedStyle(el).opacity));
    check('A4 text remains readable after the animation', still > 0.99, still);
  } else {
    check('A2/A3/A4 scroll reveal', false, 'no below-fold reveal target found');
  }

  // Reveal durations within 0.6-1s and staggered delay present on cards.
  const timing = await page.evaluate(() => {
    const el = document.querySelector('.reveal--heading');
    const s = getComputedStyle(el);
    const durations = s.transitionDuration.split(',').map((v) => parseFloat(v) * (v.includes('ms') ? 0.001 : 1));
    const card = document.querySelector('.grid .reveal--card:nth-child(2)');
    return {
      entrance: durations.filter((d) => d >= 0.3 && d <= 1.05),
      maxDuration: Math.max(...durations),
      cardDelay: card ? getComputedStyle(card).transitionDelay : null
    };
  });
  check('A5 reveal duration within 0.6–1.0s', timing.maxDuration <= 1.05 && timing.maxDuration >= 0.6, timing.maxDuration + 's');
  check('A6 staggered timing between sibling cards', timing.cardDelay && timing.cardDelay !== '0s', timing.cardDelay);

  // Paragraph after heading: the lead carries a longer combined delay than its heading.
  const paragraphOrder = await page.evaluate(() => {
    const head = document.querySelector('.reveal--heading');
    head.scrollIntoView();
    const lead = head.querySelector('p.lead');
    if (!lead) return 'no lead';
    const d = getComputedStyle(lead).transitionDelay;
    return d;
  });
  check('A7 supporting paragraph lands after the heading', paragraphOrder !== 'no lead' && parseFloat(paragraphOrder) >= 0.3, paragraphOrder);

  // ---- Card hover on a content page with a card grid ----
  await page.goto(base + '/non-surgical-breast-enlargement/', { waitUntil: 'load' });
  await page.waitForFunction(() => document.documentElement.classList.contains('motion-reveals'), null, { timeout: 5000 });
  const firstCard = page.locator('.card').first();
  await firstCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1300);
  const idleTransform = await firstCard.evaluate((el) => getComputedStyle(el).transform);
  const siblingSel = page.locator('.card').nth(1);
  const idleSibling = await siblingSel.evaluate((el) => getComputedStyle(el).transform);

  await firstCard.hover();
  await page.waitForTimeout(400);
  const hover = await firstCard.evaluate((el) => {
    const s = getComputedStyle(el);
    return { transform: s.transform, border: s.borderTopColor, shadow: s.boxShadow, durations: s.transitionDuration };
  });
  check('B1 hovered card enlarges to scale(1.03)', Math.abs(matrixScale(hover.transform) - 1.03) < 0.005, hover.transform);
  check('B2 hovered card is elevated', matrixY(hover.transform) <= -3, hover.transform);
  check('B3 glowing border uses theme colour', /rgb\(255, 77, 166\)|rgba\(255, 77, 166/.test(hover.border), hover.border);
  check('B4 subtle shadow applied', hover.shadow !== 'none', hover.shadow.slice(0, 60));
  check('B5 interaction transition is 0.3s', hover.durations.split(',').some((d) => Math.abs(parseFloat(d) - 0.3) < 0.01), hover.durations);
  const hoverSibling = await siblingSel.evaluate((el) => getComputedStyle(el).transform);
  check('B6 other cards stay unchanged while one is hovered', hoverSibling === idleSibling, hoverSibling);

  await page.mouse.move(5, 5);
  await page.waitForTimeout(450);
  const unhover = await firstCard.evaluate((el) => getComputedStyle(el).transform);
  check('B7 card smoothly returns when the mouse leaves', Math.abs((matrixScale(unhover) ?? 1) - 1) < 0.005, unhover);

  // Icon cards and blog cards also highlight.
  await page.goto(base + '/surgical-breast-enlargement/', { waitUntil: 'load' });
  await page.waitForFunction(() => document.documentElement.classList.contains('motion-reveals'), null, { timeout: 5000 });
  const iconCard = page.locator('.icon-card').first();
  if (await iconCard.count()) {
    await iconCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1300);
    await iconCard.hover();
    await page.waitForTimeout(400);
    const t = await iconCard.evaluate((el) => getComputedStyle(el).transform);
    check('B8 category/icon cards highlight too', Math.abs((matrixScale(t) ?? 0) - 1.03) < 0.005, t);
  } else check('B8 category/icon cards highlight too', false, 'no icon card on page');

  await page.goto(base + '/blogs/', { waitUntil: 'load' });
  await page.waitForFunction(() => document.documentElement.classList.contains('motion-reveals'), null, { timeout: 5000 });
  const blogCard = page.locator('.blog-card').first();
  await blogCard.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1300);
  await blogCard.hover();
  await page.waitForTimeout(400);
  const blogHover = await blogCard.evaluate((el) => getComputedStyle(el).transform);
  check('B9 blog/product cards highlight', Math.abs((matrixScale(blogHover) ?? 0) - 1.03) < 0.005, blogHover);
  await ctx.close();

  /* ---------- Mobile touch: press feedback ---------- */
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const mpage = await mctx.newPage();
  await mpage.goto(base + '/blogs/', { waitUntil: 'load' });
  await mpage.waitForFunction(() => document.documentElement.classList.contains('motion-reveals'), null, { timeout: 5000 });
  const coarse = await mpage.evaluate(() => window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  check('C1 mobile context is coarse-pointer (hover media off)', coarse);
  await mpage.locator('.blog-card').first().scrollIntoViewIfNeeded();
  const box2 = await mpage.locator('.blog-card').first().boundingBox();
  const cdp = await mctx.newCDPSession(mpage);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box2.x + box2.width / 2, y: box2.y + 30 }] });
  await mpage.waitForTimeout(320);
  const pressed = await mpage.evaluate(() => {
    const el = document.querySelector('.blog-card');
    const s = getComputedStyle(el);
    return { active: el.classList.contains('is-pressed'), transform: s.transform, border: s.borderTopColor };
  });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await mpage.waitForTimeout(420);
  const released = await mpage.evaluate(() => getComputedStyle(document.querySelector('.blog-card')).transform);
  check('C2 touch press gives subtle card feedback', pressed.active && Math.abs((matrixScale(pressed.transform) ?? 0) - 1.01) < 0.005,
    JSON.stringify({ active: pressed.active, transform: pressed.transform }));
  check('C3 feedback relaxes when the finger lifts', Math.abs((matrixScale(released) ?? 1) - 1) < 0.005, released);
  const mobileText = await mpage.evaluate(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    return els.length > 0 && els.every((el) => el.classList.contains('is-revealed') || Number(getComputedStyle(el).opacity) < 0.99);
  });
  check('C4 mobile scroll reveals still gate below-fold text', mobileText);
  await mctx.close();

  /* ---------- Reduced motion ---------- */
  const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const rpage = await rctx.newPage();
  await rpage.goto(base + '/', { waitUntil: 'load' });
  await rpage.evaluate(() => document.fonts.ready);
  const reducedGating = await rpage.evaluate(() => document.documentElement.classList.contains('motion-reveals'));
  check('D1 reduced motion disables reveal gating', reducedGating === false);
  const visible = await rpage.locator('.reveal').first().evaluate((el) => Number(getComputedStyle(el).opacity));
  check('D2 all text stays visible under reduced motion', visible > 0.99, visible);
  const rc = await rpage.locator('.card').first();
  const rcardPage = base + '/non-surgical-breast-enlargement/';
  await rpage.goto(rcardPage, { waitUntil: 'load' });
  const rcard = rpage.locator('.card').first();
  await rcard.scrollIntoViewIfNeeded();
  await rpage.waitForTimeout(600);
  await rcard.hover();
  await rpage.waitForTimeout(250);
  const rHover = await rcard.evaluate((el) => {
    const s = getComputedStyle(el);
    return { transform: s.transform, border: s.borderTopColor };
  });
  const rScale = matrixScale(rHover.transform);
  check('D3 reduced motion: hover keeps glow without geometric movement',
    (rScale === null || Math.abs(rScale - 1) < 0.001) && Math.abs((matrixY(rHover.transform) ?? 0)) < 0.5 && /rgba?\(255, 77, 166/.test(rHover.border),
    JSON.stringify(rHover));
  await rctx.close();

  assert.deepEqual(errors, []);
  check('E1 no page errors during the run', true);

  const failures = results.filter((r) => !r.pass);
  console.log('\n==== ' + (results.length - failures.length) + '/' + results.length + ' checks passed ====');
  await browser.close();
  await server.close();
  process.exitCode = failures.length ? 1 : 0;
})().catch((e) => { console.error(e); process.exitCode = 1; });
