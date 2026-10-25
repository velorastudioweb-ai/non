'use strict';
// Rasterize the EXISTING grain and brand mark once rather than asking each
// mobile GPU to run an SVG turbulence filter over the screen on every repaint.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
(async () => {
  const archive = path.join(ROOT, 'assets-src');
  fs.mkdirSync(archive, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 320, height: 320 }, deviceScaleFactor: 1 });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    await page.setContent('<style>body{margin:0}svg{display:block}</style>' + svg);
    await page.screenshot({ path: path.join(archive, 'grain.png'), omitBackground: true });
    const mark = require('./icons').icons.lotus;
    await page.setViewportSize({ width: 64, height: 64 });
    await page.setContent('<style>body{margin:0;background:#641b35;color:#d8b58a}svg{display:block;width:64px;height:64px}</style>' + mark);
    await page.screenshot({ path: path.join(archive, 'favicon.png') });
  } finally { await browser.close(); }
  execFileSync('python', [path.join(__dirname, 'prepare-ui-assets.py')], { stdio: 'inherit' });
})().catch(e => { console.error(e); process.exitCode = 1; });
