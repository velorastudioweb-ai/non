/* =============================================================================
   Contrast + palette QA
   -----------------------------------------------------------------------------
   Renders pages in real Chromium, screenshots them, decodes the PNG pixels and
   measures the *actual* background colour behind text so WCAG contrast ratios
   are checked against what a user really sees (gradients, glows and overlays
   included) rather than against flat token values.

   It also asserts that the luminous ruby / orchid / champagne-gold palette is
   genuinely applied to the key elements (header, hero, cards, buttons, footer).

   Usage:
     node build/contrast-qa.js            default routes x 3 viewports
     node build/contrast-qa.js --quick    home + one inner page
   ============================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

/* ------------------------------ png decoding ------------------------------ */
function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a png');
  let pos = 8, w = 0, h = 0, bitDepth = 0, colorType = 0, interlace = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      w = data.readUInt32BE(0); h = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9]; interlace = data[12];
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2) || interlace !== 0) {
    throw new Error('unsupported png (depth ' + bitDepth + ', type ' + colorType + ', interlace ' + interlace + ')');
  }
  const bpp = colorType === 6 ? 4 : 3;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * bpp;
  const out = Buffer.alloc(h * stride);
  let ip = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[ip++];
    const lineStart = ip;
    for (let x = 0; x < stride; x++) {
      const v = raw[lineStart + x];
      const a = x >= bpp ? out[y * stride + x - bpp] : 0;
      const b = y > 0 ? out[(y - 1) * stride + x] : 0;
      const c = (y > 0 && x >= bpp) ? out[(y - 1) * stride + x - bpp] : 0;
      let val;
      switch (filter) {
        case 0: val = v; break;
        case 1: val = v + a; break;
        case 2: val = v + b; break;
        case 3: val = v + ((a + b) >> 1); break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          val = v + ((pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c));
          break;
        }
        default: throw new Error('bad png filter ' + filter);
      }
      out[y * stride + x] = val & 255;
    }
    ip += stride;
  }
  return { w, h, bpp, stride, data: out };
}

const px = (img, x, y) => {
  const i = y * img.stride + x * img.bpp;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
};

/* ------------------------------- contrast -------------------------------- */
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
function ratio(a, b) {
  const l1 = lum(a), l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
function medianColor(list) {
  const s = [0, 1, 2].map((ch) => list.map((c) => c[ch]).sort((x, y) => x - y));
  const mid = Math.floor(list.length / 2);
  return [0, 1, 2].map((ch) => s[ch][mid]);
}
const parseRgb = (str) => {
  const m = /rgba?\(([^)]+)\)/.exec(str);
  if (!m) return null;
  const p = m[1].split(',').map((n) => parseFloat(n));
  return [p[0], p[1], p[2]];
};

/* ------------------------------- server ---------------------------------- */
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp'
};
function startServer(port, root) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const full = path.join(root, path.normalize(p).replace(/^(\.\.[/\\])+/, ''));
    const send = (file, status) => {
      res.writeHead(status || 200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      const s = fs.createReadStream(file);
      s.on('error', () => { try { res.end(); } catch (e) {} });
      s.pipe(res);
    };
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return send(full);
    if (fs.existsSync(path.join(full, 'index.html'))) return send(path.join(full, 'index.html'));
    const nf = path.join(root, '404.html');
    if (fs.existsSync(nf)) return send(nf, 404);
    res.writeHead(404); res.end('404');
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

/* ------------------------------ expectations ------------------------------ */
/* Computed-style palette assertions — proves the redesign is really live. */
const PALETTE = [
{ sel: 'body', prop: 'color', expect: ['rgb(255, 248, 243)'], label: 'ivory body text' },
{ sel: '.eyebrow', prop: 'color', expect: ['rgb(216, 181, 138)', 'rgb(234, 215, 221)'], label: 'champagne-gold eyebrow' },
{ sel: '.hero__title em', prop: 'color', expect: ['rgb(255, 77, 166)'], label: 'orchid hero accent', home: true },
  { sel: '.btn--primary', prop: 'color', expect: ['rgb(31, 3, 7)'], label: 'dark ink on ruby CTA' },
  { sel: '.card', prop: 'borderTopColor', expect: ['rgba(255, 77, 166, 0.3)'], label: 'orchid card border' }
];

/* Text elements whose real rendered contrast is measured against pixels. */
const TEXT_CHECKS = [
  '.hero__title', '.hero__lead', '.hero__eyebrow', '.hero__uppercase-stmt',
  '.hero__note', '.hero__credit', '.feature-chip__label', '.benefit__label',
  '.eyebrow', 'h2', '.lead', '.card__title', '.card__text', '.card__kicker',
  '.icon-card h3', '.icon-card p', '.btn--primary', '.btn--outline',
  '.link-arrow', '.section-head .h2', '.step__num', '.step p', '.notice p',
  '.prose p', '.prose a', '.prose h2', '.faq__q', '.faq__a-inner',
  '.field label', '.field input', '.cta-band h2', '.cta-band p',
  '.breadcrumbs a', '.footer-col h3', '.footer-col a', '.footer-legal a',
  '.footer-contact-details a', '.site-footer .footer-brand p', '.footer-disclaimer',
  '.tag', '.stat__value', '.stat__label', '.page-banner h1', '.page-banner p',
  '.media-frame + .script', '.script', '.qh-about .qh-about-note',
  '.qh-about .qh-doctor-card h3', '.qh-about .qh-doctor-card__details h4',
  '.qh-about .qh-doctor-card__details li', '.qh-about .qh-btn'
];

/* -------------------------------------------------------------------------- */
async function checkRoute(browser, base, route, viewport) {
  const ctx = await browser.newContext({
    viewport: { width: viewport.w, height: viewport.h }, deviceScaleFactor: 1
  });
  const page = await ctx.newPage();
  const results = { route, vp: viewport.tag, palette: [], contrast: [], sampleIssues: [] };
  await page.goto(base + route, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  /* palette assertions (computed styles) */
  for (const p of PALETTE) {
    if (p.home && route !== '/') continue;
    const got = await page.evaluate(({ sel, prop }) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      return getComputedStyle(el)[prop];
    }, p);
    if (got === null) results.sampleIssues.push('palette: ' + p.sel + ' not found on ' + route);
    else if (!p.expect.includes(got)) results.palette.push({ sel: p.sel, label: p.label, expect: p.expect.join(' | '), got });
  }

  /* element boxes + computed text colours */
  const boxes = await page.evaluate((sels) => {
    const out = [];
    const vw = document.documentElement.clientWidth;
    for (const sel of sels) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 6) continue;
      if (r.bottom < 0 || r.top > window.innerHeight || r.right < 0 || r.left > vw) continue;
      const fs = parseFloat(cs.fontSize);
      const fw = parseInt(cs.fontWeight, 10) || 400;
      out.push({
        sel, color: cs.color, bg: cs.backgroundColor,
        x: Math.round(r.left), y: Math.round(r.top),
        w: Math.round(r.width), h: Math.round(r.height),
        fontSize: fs, bold: fw >= 700, large: fs >= 24 || (fs >= 18.66 && fw >= 700),
        text: (el.textContent || '').trim().slice(0, 40)
      });
    }
    return out;
  }, TEXT_CHECKS);

  const shot = await page.screenshot({ fullPage: false });
  await ctx.close();

  let img;
  try { img = decodePNG(shot); }
  catch (e) { results.sampleIssues.push('png decode failed: ' + e.message); return results; }

  for (const b of boxes) {
    const textColor = parseRgb(b.color);
    if (!textColor) continue;
    const ownBg = parseRgb(b.bg);
    let bg;
    const samples = [];
    const inset = 2;
    const x0 = Math.max(0, b.x + inset), x1 = Math.min(img.w - 1, b.x + b.w - inset);
    const y0 = Math.max(0, b.y + inset), y1 = Math.min(img.h - 1, b.y + b.h - inset);
    if (x1 <= x0 || y1 <= y0) continue;
    const cols = 14, rows = 4;
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = Math.round(x0 + ((x1 - x0) * i) / cols);
        const y = Math.round(y0 + ((y1 - y0) * j) / rows);
        samples.push(px(img, x, y));
      }
    }
    if (ownBg && (ownBg[0] + ownBg[1] + ownBg[2]) > 0) bg = ownBg;
    else bg = medianColor(samples);
    const cr = ratio(textColor, bg);
    const need = b.large ? 3 : 4.5;
    if (cr < need) {
      results.contrast.push({
        sel: b.sel, text: b.text, ratio: +cr.toFixed(2), need,
        color: b.color, bg: 'rgb(' + bg.join(', ') + ')', fs: b.fontSize
      });
    }
  }
  return results;
}

/* ------------------------------- palette presence -------------------------- */
/* Confirms the page actually contains luminous ruby / orchid / gold pixels —
   not merely token definitions in the stylesheet. */
function analyseShade(img) {
  let rubyOrchid = 0, gold = 0, total = 0;
  for (let y = 0; y < img.h; y += 6) {
    for (let x = 0; x < img.w; x += 6) {
      const [r, g, b] = px(img, x, y);
      total++;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      if (max < 40) continue;
      const sat = (max - min) / max;
      /* saturated red/magenta family */
      if (sat > 0.45 && r > 90 && b > 40 && g < r * 0.75) rubyOrchid++;
      /* warm gold / champagne highlights */
      else if (sat > 0.18 && r > 170 && g > 130 && b < g * 0.85) gold++;
    }
  }
  return {
    total,
    rubyPct: +(100 * rubyOrchid / total).toFixed(2),
    goldPct: +(100 * gold / total).toFixed(2)
  };
}

/* --------------------------------- main ---------------------------------- */
async function main() {
  const quick = process.argv.includes('--quick');
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('dist/ is empty — run `npm run build` first.'); process.exit(2);
  }
  const PORT = 8145;
  const routes = quick ? ['/', '/non-surgical/'] :
    ['/', '/non-surgical/', '/surgical-breast-enlargement/', '/faqs/',
      '/contact/', '/blogs/', '/about-us/', '/privacy-policy/',
      '/non-surgical/hyaluronic-acid-fillers/',
      '/surgical/mastectomy-chest-surgery/'];
  const viewports = [{ w: 390, h: 844, tag: '390' }, { w: 768, h: 1024, tag: '768' }, { w: 1440, h: 900, tag: '1440' }];

  let chromium;
  try { chromium = require('playwright-core').chromium; }
  catch (e) { console.error('playwright-core missing'); process.exit(2); }
  const chrome = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium'
  ].filter(Boolean).find((c) => fs.existsSync(c));
  if (!chrome) { console.error('no Chrome found'); process.exit(2); }

  const server = await startServer(PORT, DIST);
  const browser = await chromium.launch({ executablePath: chrome, headless: true });
  const failures = [];
  const paletteFails = [];
  const contrastFails = [];
  const shadeReport = [];
  const notes = [];
  try {
    for (const vp of viewports) {
      for (const route of routes) {
        console.log('Checking ' + vp.tag + 'px ' + route);
        const r = await checkRoute(browser, 'http://127.0.0.1:' + PORT, route, vp);
        paletteFails.push(...r.palette.map((p) => ({ vp: vp.tag, route, ...p })));
        contrastFails.push(...r.contrast.map((c) => ({ vp: vp.tag, route, ...c })));
        notes.push(...r.sampleIssues.map((n) => vp.tag + ' ' + route + ': ' + n));
        if (route === '/' && (vp.tag === '390' || vp.tag === '1440')) {
          const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
          const page = await ctx.newPage();
          await page.goto('http://127.0.0.1:' + PORT + route, { waitUntil: 'load' });
          await page.waitForTimeout(500);
          const buf = await page.screenshot({ fullPage: false });
          await ctx.close();
          try {
            const shade = analyseShade(decodePNG(buf));
            shadeReport.push({ vp: vp.tag, ...shade });
            if (shade.rubyPct < 3) failures.push('hero at ' + vp.tag + ' has only ' + shade.rubyPct + '% ruby/orchid pixels');
            if (shade.goldPct < 0.2) failures.push('hero at ' + vp.tag + ' has only ' + shade.goldPct + '% gold pixels');
          } catch (e) { notes.push('shade analysis failed: ' + e.message); }
        }
      }
    }
  } finally {
    await browser.close().catch(() => {});
    try { server.close(); } catch (e) {}
  }

  console.log('=========== CONTRAST / PALETTE QA ===========');
  console.log('Routes checked: ' + routes.length + ' x ' + viewports.length + ' viewports');
  console.log('\nPalette application failures: ' + paletteFails.length);
  paletteFails.forEach((p) => console.log('  - [' + p.vp + ' ' + p.route + '] ' + p.sel + ' (' + p.label + '): expected ' + p.expect + ', got ' + p.got));
  console.log('\nContrast failures (measured against rendered pixels): ' + contrastFails.length);
  contrastFails.slice(0, 40).forEach((c) =>
    console.log('  - [' + c.vp + ' ' + c.route + '] ' + c.sel + ' ' + c.ratio + ':1 (needs ' + c.need + ') color ' + c.color + ' on ' + c.bg + ' "' + c.text + '"'));
  if (contrastFails.length > 40) console.log('  ... +' + (contrastFails.length - 40) + ' more');
  console.log('\nHero colour coverage (ruby/orchid + gold pixels):');
  shadeReport.forEach((s) => console.log('  ' + s.vp + ': ruby/orchid ' + s.rubyPct + '%, gold ' + s.goldPct + '%'));
  console.log('\nOther notes: ' + notes.length);
  notes.slice(0, 10).forEach((n) => console.log('  - ' + n));
  failures.forEach((f) => console.log('  FAIL: ' + f));
  console.log('\n' + (paletteFails.length || contrastFails.length || failures.length ? 'RESULT: FAIL' : 'RESULT: PASS'));
  process.exit(paletteFails.length || contrastFails.length || failures.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
