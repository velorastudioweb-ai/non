// Temporary visual capture for the new brand artwork. Not part of the build.
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright-core');

const OUT = 'C:/Users/Lokesh Reddy/AppData/Local/Temp/opencode/qh-shots';
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  { name: 'panels-1440', url: 'http://localhost:8099/locations/', selector: '.city-panels', width: 1440, height: 900 },
  { name: 'panels-1200', url: 'http://localhost:8099/locations/', selector: '.city-panels', width: 1200, height: 900 },
  { name: 'panels-1000', url: 'http://localhost:8099/locations/', selector: '.city-panels', width: 1000, height: 900 },
  { name: 'panels-390', url: 'http://localhost:8099/locations/', selector: '.city-panels', width: 390, height: 844 },
  { name: 'panels-860', url: 'http://localhost:8099/locations/', selector: '.city-panels', width: 860, height: 900 },
  { name: 'vikas-860', url: 'http://localhost:8099/doctors/dr-vikas-singh/', selector: '.qh-vikas-hero--banner', width: 860, height: 900 },
  { name: 'vikas-390', url: 'http://localhost:8099/doctors/dr-vikas-singh/', selector: '.qh-vikas-hero--banner', width: 390, height: 844 },
  { name: 'vikas-1440', url: 'http://localhost:8099/doctors/dr-vikas-singh/', selector: '.qh-vikas-hero--banner', width: 1440, height: 900 },
  { name: 'vikas-media-1440', url: 'http://localhost:8099/doctors/dr-vikas-singh/', selector: '.qh-video', width: 1440, height: 900 },
  { name: 'home-approach-1440', url: 'http://localhost:8099/', selector: '.split', width: 1440, height: 900 },
  { name: 'header-1440', url: 'http://localhost:8099/', selector: '.site-header .container', width: 1440, height: 900 },
  { name: 'header-390', url: 'http://localhost:8099/', selector: '.site-header .container', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const report = [];
  for (const shot of shots) {
    const page = await browser.newPage({ viewport: { width: shot.width, height: shot.height } });
    await page.goto(shot.url, { waitUntil: 'load' });
    const el = page.locator(shot.selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const file = path.join(OUT, shot.name + '.png');
    await el.screenshot({ path: file });
    if (shot.selector === '.city-panels') {
      const geometry = await page.evaluate(() => [...document.querySelectorAll('.city-panel')].map((panel) => {
        const frame = panel.querySelector('.city-panel__frame');
        const r = frame.getBoundingClientRect();
        const pct = (sel) => {
          const node = frame.querySelector(sel);
          if (!node) return null;
          const b = node.getBoundingClientRect();
          return {
            left: +((b.left - r.left) / r.width * 100).toFixed(1),
            top: +((b.top - r.top) / r.height * 100).toFixed(1),
            right: +((b.right - r.left) / r.width * 100).toFixed(1),
            bottom: +((b.bottom - r.top) / r.height * 100).toFixed(1),
            cityFont: Math.round(parseFloat(getComputedStyle(frame.querySelector('.city-panel__city')).fontSize) * 10) / 10
          };
        };
        return {
          mode: getComputedStyle(frame.querySelector('.city-panel__art')).position,
          panelWidth: Math.round(r.width),
          head: pct('.city-panel__head'),
          body: pct('.city-panel__body'),
          cta: pct('.city-panel__cta')
        };
      }));
      report.push({ shot: shot.name, geometry });
    }
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify(report, null, 1));
  console.log('saved to ' + OUT);
})();
