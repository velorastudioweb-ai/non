'use strict';
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { spawnSync } = require('child_process');
const { chromium } = require('playwright-core');
const root = path.join(__dirname, '..');
const directory = path.join(root, 'public', 'assets', 'img');
const requestedRoutes = process.argv.slice(2);
const assets = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'image-audit', 'generated-assets.json'))).filter((a) => !requestedRoutes.length || requestedRoutes.includes(a.route));
const convert = 'import sys,io; from PIL import Image; im=Image.open(io.BytesIO(sys.stdin.buffer.read())).convert("RGB"); base=sys.argv[1]; widths=[int(x) for x in sys.argv[2].split(",")]; [(im.resize((w,round(im.height*w/im.width)),Image.Resampling.LANCZOS).save(base+"-"+str(w)+".webp","WEBP",quality=83,method=6)) for w in widths]';
async function main() {
  const chrome = ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(fs.existsSync);
  const browser = await chromium.launch({ executablePath: chrome, headless: true });
  try {
    const page = await browser.newPage();
    for (const asset of assets) {
      const sizes = asset.variant === 'banner' ? [1600, 640] : asset.variant === 'portrait' ? [960, 1200] : [1600, 1100];
      await page.setViewportSize({ width: sizes[0], height: sizes[1] });
      await page.goto(pathToFileURL(path.join(directory, asset.filename)).href);
      await page.evaluate(() => { document.documentElement.style.width = '100vw'; document.documentElement.style.height = '100vh'; });
      const png = await page.screenshot({ type: 'png' });
      const widths = asset.variant === 'portrait' ? '480,960' : asset.variant === 'banner' ? '640,960,1600' : '480,960,1600';
      const result = spawnSync('python', ['-c', convert, path.join(directory, asset.filename.replace(/\.svg$/, '')), widths], { input: png, maxBuffer: 8 * 1024 * 1024 });
      if (result.status !== 0) throw new Error(result.stderr.toString());
    }
  } finally { await browser.close(); }
  const hero = spawnSync('python', ['-c', 'from PIL import Image; import sys; from pathlib import Path; p=Path(sys.argv[1]); [(Image.open(p/("homepage-hero-luxury-editorial-"+str(w)+".jpg")).save(p/("homepage-hero-luxury-editorial-"+str(w)+".webp"),"WEBP",quality=83,method=6)) for w in [1920,2560]]', directory]);
  if (hero.status !== 0) throw new Error(hero.stderr.toString());
  console.log('Rasterized ' + assets.length + ' SVG compositions into responsive WebP files; optimized two retained homepage hero sizes.');
}
main().catch((e) => { console.error(e); process.exitCode = 1; });
