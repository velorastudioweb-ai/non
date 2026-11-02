// Capture the four new artwork placements + open the live pages in the Review pane.
const fs = require('fs');
const { chromium } = require('playwright-core');
const OUT = 'C:/Users/Lokesh Reddy/AppData/Local/Temp/opencode/qh-review';
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  ['1-logo-header', 'http://localhost:8099/', '.site-header .container', 1440],
  ['2-our-approach', 'http://localhost:8099/', '.split', 1440],
  ['3-vikas-banner', 'http://localhost:8099/doctors/dr-vikas-singh/', '.qh-vikas-hero--banner', 1440],
  ['4-vikas-video', 'http://localhost:8099/doctors/dr-vikas-singh/', '.qh-video', 1440],
  ['5-city-panels', 'http://localhost:8099/locations/', '.city-panels', 1440]
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  for (const [name, url, sel, width] of shots) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url, { waitUntil: 'load' });
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await el.screenshot({ path: `${OUT}/${name}.png` });
    await page.close();
  }
  await browser.close();
  console.log(fs.readdirSync(OUT).join('\n'));
})();
