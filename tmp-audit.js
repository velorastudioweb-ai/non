const { chromium } = require('playwright-core');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const outDir = 'C:/Users/Lokesh Reddy/AppData/Local/Temp/opencode/audit';
  fs.mkdirSync(outDir, { recursive: true });
  async function run(name, url, viewport) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: viewport.width < 600, hasTouch: viewport.width < 600 });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(1200);
    // scroll through to trigger reveals
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += Math.round(viewport.height * 0.8)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(160);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${outDir}/${name}-top.png` });
    await page.screenshot({ path: `${outDir}/${name}-full.png`, fullPage: true });
    const info = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.innerText,
      h: document.body.scrollHeight,
      fonts: [...document.fonts].map(f => f.family + ':' + f.status).slice(0, 10),
      overflowX: document.documentElement.scrollWidth > innerWidth,
      errors: window.__errs || []
    }));
    await ctx.close();
    return info;
  }
  const data = {};
  data.refDesktop = await run('ref-desktop', 'https://cozmoblis.com/', { width: 1440, height: 900 });
  data.refMobile = await run('ref-mobile', 'https://cozmoblis.com/', { width: 390, height: 844 });
  data.localDesktop = await run('local-desktop', 'http://localhost:8099/', { width: 1440, height: 900 });
  data.localMobile = await run('local-mobile', 'http://localhost:8099/', { width: 390, height: 844 });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
