/* =============================================================================
   Responsive / cross-device QA harness
   -----------------------------------------------------------------------------
   Renders every generated page in real Chromium at the project's required
   viewport matrix and reports genuine layout defects:

     · page-level horizontal overflow (documentElement.scrollWidth vs clientWidth)
     · visible elements extending past the viewport (clipped / off-screen content)
     · text clipped inside overflow-hidden boxes (scrollWidth/Height > client*)
     · broken images and images rendered at a distorted aspect ratio
     · console errors and failed network requests

   Usage:
     node build/responsive-qa.js                 full run (all pages x viewports)
     node build/responsive-qa.js --quick         key pages only
     node build/responsive-qa.js --port 8123     use a specific port
     node build/responsive-qa.js --json out.json also write raw findings

   Requires playwright-core (dev-only, not shipped) and a local Chrome/Edge.
   ============================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

/* ------------------------------- viewports ------------------------------- */
/* Testing ranges from the responsive brief, incl. landscape + ultrawide. */
const VIEWPORTS = [
  { name: '320x568 (small mobile)', width: 320, height: 568 },
  { name: '360x800 (standard mobile)', width: 360, height: 800 },
  { name: '375x812 (iPhone X)', width: 375, height: 812 },
  { name: '390x844 (iPhone 13)', width: 390, height: 844 },
  { name: '430x932 (iPhone Pro Max)', width: 430, height: 932 },
  { name: '480x854 (large mobile)', width: 480, height: 854 },
  { name: '560x320 (mobile landscape)', width: 560, height: 320 },
  { name: '600x900 (small tablet)', width: 600, height: 900 },
  { name: '768x1024 (tablet portrait)', width: 768, height: 1024 },
  { name: '820x1180 (iPad Air)', width: 820, height: 1180 },
  { name: '844x390 (iPhone landscape)', width: 844, height: 390 },
  { name: '900x700 (intermediate)', width: 900, height: 700 },
  { name: '1024x768 (tablet landscape)', width: 1024, height: 768 },
  { name: '1200x800 (intermediate)', width: 1200, height: 800 },
  { name: '1280x800 (laptop)', width: 1280, height: 800 },
  { name: '1366x768 (laptop)', width: 1366, height: 768 },
  { name: '1440x900 (desktop)', width: 1440, height: 900 },
  { name: '1600x900 (desktop)', width: 1600, height: 900 },
  { name: '1920x1080 (full HD)', width: 1920, height: 1080 },
  { name: '2560x1440 (QHD)', width: 2560, height: 1440 }
];

/* Pages that exercise each distinct layout family. */
const KEY_PAGES = [
  '/', '/non-surgical/', '/surgical-breast-enhancement/',
  '/breast-enhancement-comparison/', '/about-us/', '/about-dr-vikas-singh/',
  '/our-team/', '/locations/', '/before-after-gallery/', '/video-gallery/',
  '/faqs/', '/book-consultation/', '/blogs/',
  '/blogs/surgical-vs-non-surgical-breast-enhancement/',
  '/non-surgical/dermal-fillers/', '/surgical/breast-augmentation/',
  '/privacy-policy/', '/404.html'
];

function listPages() {
  const pages = [];
  const walk = (dir, base) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = base + entry.name;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full, rel + '/');
      else if (entry.name.endsWith('.html')) {
        pages.push(rel === 'index.html' ? '/' : '/' + rel.replace(/index\.html$/, ''));
      }
    }
  };
  walk(DIST, '');
  return pages.sort();
}

/* ------------------------------ chrome path ------------------------------ */
function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  ].filter(Boolean);
  for (const c of candidates) { try { if (fs.existsSync(c)) return c; } catch (e) {} }
  return null;
}

/* -------------------------------- server -------------------------------- */
/* Self-contained static server (no dependency on build/serve.js) so the run
   can serve a frozen snapshot of dist/ while the tree is being rebuilt. */
function startServer(port, root) {
  const TYPES = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff'
  };
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent((req.url || '/').split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const full = path.join(root, path.normalize(p).replace(/^(\.\.[/\\])+/, ''));
    const send = (file, status) => {
      const ext = path.extname(file).toLowerCase();
      res.writeHead(status || 200, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
      const stream = fs.createReadStream(file);
      stream.on('error', () => {
        try { res.writeHead(500); res.end('read error'); } catch (e) {}
      });
      stream.pipe(res);
    };
    if (full.startsWith(root) && fs.existsSync(full)) {
      const st = fs.statSync(full);
      if (st.isFile()) return send(full);
      if (st.isDirectory()) {
        const idx = path.join(full, 'index.html');
        if (fs.existsSync(idx)) return send(idx);
      }
    }
    if (full.startsWith(root) && fs.existsSync(full + '.html') && fs.statSync(full + '.html').isFile()) return send(full + '.html');
    const notFound = path.join(root, '404.html');
    if (fs.existsSync(notFound) && fs.statSync(notFound).isFile()) return send(notFound, 404);
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404');
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

/* Copy dist/ to a private snapshot directory so concurrent rebuilds of
   dist/ cannot 404 the run mid-flight. */
function snapshotDist(dest) {
  fs.rmSync(dest, { recursive: true, force: true });
  const failures = [];
  const copy = (src, dst) => {
    fs.mkdirSync(dst, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const s = path.join(src, entry.name), d = path.join(dst, entry.name);
      try {
        if (entry.isDirectory()) copy(s, d);
        else fs.copyFileSync(s, d);
      } catch (e) {
        /* dist/ may be rebuilt concurrently — skip the file and report */
        failures.push(s + ' (' + e.code + ')');
      }
    }
  };
  copy(DIST, dest);
  if (!fs.existsSync(path.join(dest, 'index.html'))) {
    throw new Error('snapshot failed: dist/index.html missing after copy' +
      (failures.length ? ' — copy failures: ' + failures.slice(0, 5).join('; ') : ''));
  }
  if (failures.length) console.log('  snapshot: skipped ' + failures.length + ' file(s) being rewritten concurrently');
  return dest;
}

/* ---------------------------- in-page auditor ---------------------------- */
/* Runs inside every page/viewport. Returns structured findings. */
function auditInPage() {
  const vw = document.documentElement.clientWidth;
  const findings = { overflow: 0, offenders: [], clipped: [], brokenImages: [], distorted: [] };

  findings.overflow = Math.max(0, document.documentElement.scrollWidth - vw);

  /* Scrollable ancestors: horizontal overflow *inside* these is intentional
     (data tables etc.) and must not count as page-level overflow. */
  const scrollParent = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const s = getComputedStyle(p);
      const ox = s.overflowX;
      if ((ox === 'auto' || ox === 'scroll') && p.scrollWidth > p.clientWidth + 1) return true;
    }
    return false;
  };

  const describe = (el) => {
    let sel = el.tagName.toLowerCase();
    if (el.id) sel += '#' + el.id;
    if (el.classList.length) sel += '.' + Array.from(el.classList).slice(0, 3).join('.');
    return sel;
  };

  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') continue;
    /* overlays that are deliberately hidden off-canvas */
    if (el.closest('.mobile-nav') && !el.closest('.mobile-nav').classList.contains('is-open')) continue;
    if (el.closest('.skip-link')) continue;
    if (el.closest('.hp-field')) continue;
    /* decorative layers (blur blobs, banner figures, ornaments) — clipped by
       their section's overflow:hidden and aria-hidden in the markup */
    if (el.closest('.hero__rose, .page-banner__figure, .hero__curve, .ornament, .petals')) continue;
    /* SVG geometry is not a layout box we can reason about */
    if (el.matches('path, g, circle, rect, line, polyline, polygon, defs, clipPath, use, ellipse')) continue;

    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;

    /* element sticking out of the viewport */
    if (!scrollParent(el) && r.width > 0 && (r.right > vw + 1.5 || r.left < -1.5)) {
      findings.offenders.push({
        sel: describe(el),
        left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width),
        text: (el.textContent || '').trim().slice(0, 50)
      });
    }

    /* text clipped inside a scroll-hidden box (collapsed accordion panels are
       intentionally height:0 — skip unless currently open) */
    const clips = s.overflow === 'hidden' || s.overflow === 'clip' || s.overflowY === 'hidden' || s.overflowX === 'hidden';
    const isTextual = el.matches('h1,h2,h3,h4,h5,h6,p,a,span,li,label,td,th,button,small,strong,em,div') &&
      (el.textContent || '').trim().length > 0 && el.children.length < 4;
    const collapsedPanel = el.matches('.faq__a') && !el.closest('.faq__item.is-open');
    if (clips && isTextual && !collapsedPanel &&
        !el.closest('.media-frame, .card__media, .gallery-item, .hero__figure, .lightbox, .pending, .spinner')) {
      const clipX = el.scrollWidth - el.clientWidth > 2 && s.overflowX === 'hidden';
      const clipY = el.scrollHeight - el.clientHeight > 2 && s.overflowY === 'hidden';
      if (clipX || clipY) {
        findings.clipped.push({
          sel: describe(el),
          clipX: clipX ? el.scrollWidth - el.clientWidth : 0,
          clipY: clipY ? el.scrollHeight - el.clientHeight : 0,
          text: (el.textContent || '').trim().slice(0, 50)
        });
      }
    }

    /* images */
    if (el.tagName === 'IMG') {
      const img = el;
      if (img.complete && img.naturalWidth === 0) {
        findings.brokenImages.push({ src: img.currentSrc || img.src, sel: describe(img) });
      } else if (img.naturalWidth > 0 && img.clientWidth > 8 && img.clientHeight > 8) {
        const fit = s.objectFit;
        if (fit === 'fill') {
          const nat = img.naturalWidth / img.naturalHeight;
          const ren = img.clientWidth / img.clientHeight;
          if (Math.abs(nat - ren) / nat > 0.15) {
            findings.distorted.push({
              sel: describe(img), natural: +nat.toFixed(2), rendered: +ren.toFixed(2),
              src: (img.currentSrc || img.src).split('/').pop()
            });
          }
        }
      }
    }
  }

  findings.offenders = findings.offenders.slice(0, 12);
  findings.clipped = findings.clipped.slice(0, 12);
  findings.distorted = findings.distorted.slice(0, 8);
  findings.brokenImages = findings.brokenImages.slice(0, 8);
  return findings;
}

/* --------------------------- interactions pass --------------------------- */
/* Drawer, accordion, lightbox, form states and font-scaling at real viewports. */
async function runInteractions(browser, PORT) {
  const base = 'http://127.0.0.1:' + PORT;
  const problems = [];
  const note = (where, msg) => problems.push(where + ': ' + msg);

  const noOverflow = async (page, where) => {
    const o = await page.evaluate(() =>
      Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth));
    if (o > 1) note(where, 'page overflow +' + o + 'px');
    return o;
  };
  const vw = (page) => page.evaluate(() => document.documentElement.clientWidth);

  /* --- 1. mobile drawer --- */
  for (const w of [320, 375, 390, 430, 480, 768]) {
    const where = 'drawer@' + w;
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, hasTouch: true, isMobile: w < 768 });
    const page = await ctx.newPage();
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const toggle = page.locator('.nav-toggle');
    if (await toggle.isVisible()) {
      await toggle.click();
      await page.waitForTimeout(350);
      const open = await page.evaluate(() => {
        const d = document.querySelector('.mobile-nav');
        return {
          isOpen: !!d && d.classList.contains('is-open'),
          expanded: document.querySelector('.nav-toggle').getAttribute('aria-expanded'),
          bodyLocked: document.body.classList.contains('nav-open'),
          drawerOverflow: Math.max(0, (d ? d.scrollWidth : 0) - (d ? d.clientWidth : 0)),
          links: Array.from(document.querySelectorAll('.mobile-nav__link, .mobile-nav__cta .btn')).map((a) => {
            const r = a.getBoundingClientRect();
            return { t: (a.textContent || '').trim().slice(0, 24), h: Math.round(r.height), w: Math.round(r.width), l: Math.round(r.left), r: Math.round(r.right) };
          })
        };
      });
      if (!open.isOpen) note(where, 'drawer did not open');
      if (open.expanded !== 'true') note(where, 'aria-expanded not true (got ' + open.expanded + ')');
      if (!open.bodyLocked) note(where, 'body scroll not locked while drawer open');
      if (open.drawerOverflow > 1) note(where, 'drawer content overflows +' + open.drawerOverflow + 'px');
      const width = await vw(page);
      for (const l of open.links) {
        if (l.h < 40) note(where, 'tap target "' + l.t + '" only ' + l.h + 'px tall');
        if (l.l < -1 || l.r > width + 1) note(where, 'link "' + l.t + '" outside viewport [' + l.l + '..' + l.r + ']');
      }
      await page.keyboard.press('Escape');
      await page.waitForTimeout(350);
      const closed = await page.evaluate(() =>
        !document.querySelector('.mobile-nav').classList.contains('is-open') &&
        document.querySelector('.nav-toggle').getAttribute('aria-expanded') === 'false');
      if (!closed) note(where, 'Escape did not close drawer');
    }
    await noOverflow(page, where);
    await ctx.close();
  }

  /* --- 2. FAQ accordion open state --- */
  for (const w of [320, 375, 768, 1280]) {
    const where = 'faq@' + w;
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(base + '/faqs/', { waitUntil: 'networkidle' });
    const q = page.locator('.faq__q').first();
    if (await q.count()) {
      await q.click();
      await page.waitForTimeout(500);
      const state = await page.evaluate(() => {
        const item = document.querySelector('.faq__item.is-open');
        const a = item && item.querySelector('.faq__a');
        return {
          open: !!item,
          height: a ? a.getBoundingClientRect().height : 0,
          overflow: Math.max(0, (a ? a.scrollWidth : 0) - (a ? a.clientWidth : 0))
        };
      });
      if (!state.open) note(where, 'accordion item did not open');
      if (state.height < 10) note(where, 'open answer has no height');
      if (state.overflow > 1) note(where, 'answer content overflows +' + state.overflow + 'px');
    }
    await noOverflow(page, where);
    await ctx.close();
  }

  /* --- 3. lightbox (when real gallery items exist) --- */
  for (const w of [320, 375, 1280]) {
    const where = 'lightbox@' + w;
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(base + '/before-after-gallery/', { waitUntil: 'networkidle' });
    const item = page.locator('button.gallery-item').first();
    if (await item.count()) {
      await item.click();
      await page.waitForTimeout(400);
      const st = await page.evaluate(() => {
        const lb = document.querySelector('.lightbox.is-open');
        const img = lb && lb.querySelector('.lightbox__img');
        const r = img && img.getBoundingClientRect();
        return {
          open: !!lb,
          img: r ? { w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) } : null,
          vw: document.documentElement.clientWidth,
          vh: window.innerHeight
        };
      });
      if (!st.open) note(where, 'lightbox did not open');
      if (st.img && (st.img.w > st.vw || st.img.h > st.vh || st.img.top < -1)) note(where, 'lightbox image out of bounds ' + JSON.stringify(st.img));
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
    }
    await ctx.close();
  }

  /* --- 4. consultation form states --- */
  for (const w of [320, 375, 768, 1280]) {
    const where = 'form@' + w;
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(base + '/book-consultation/', { waitUntil: 'networkidle' });
    const form = page.locator('form[data-consult-form]').first();
    if (await form.count()) {
      await form.locator('[type="submit"]').click();
      await page.waitForTimeout(350);
      const errState = await page.evaluate(() => {
        const s = document.querySelector('[data-status]');
        const vis = s && s.classList.contains('is-visible');
        const r = s && s.getBoundingClientRect();
        return {
          visible: !!vis,
          text: s ? (s.textContent || '').trim().slice(0, 60) : '',
          inView: r ? (r.left >= -1 && r.right <= document.documentElement.clientWidth + 1) : false,
          badFields: document.querySelectorAll('.field--error, input[aria-invalid="true"]').length
        };
      });
      if (!errState.visible) note(where, 'no status message after empty submit');
      if (!errState.inView) note(where, 'status message outside viewport');
      if (errState.badFields === 0 && !errState.text) note(where, 'no validation feedback at all');
      await noOverflow(page, where + '(invalid)');

      /* valid fill */
      const nameIn = form.locator('input[name]');
      await nameIn.first().fill('Responsive QA Test');
      const inputs = await form.locator('input, select, textarea').all();
      for (const inp of inputs) {
        const tag = await inp.evaluate((el) => el.tagName.toLowerCase() + ':' + (el.type || ''));
        if (tag.startsWith('input:text') || tag === 'input:tel' || tag === 'input:email') {
          const v = tag === 'input:email' ? 'qa@example.com' : (tag === 'input:tel' ? '9000000000' : 'Responsive QA Test');
          await inp.fill(v).catch(() => {});
        }
      }
      await form.locator('#cf-country-code').selectOption('+91').catch(() => {});
      await form.locator('#cf-interest').selectOption({ index: 1 }).catch(() => {});
      const consent = form.locator('input[type="checkbox"]');
      if (await consent.count()) await consent.first().check().catch(() => {});
      await form.locator('[type="submit"]').click();
      await page.waitForTimeout(400);
      await noOverflow(page, where + '(valid)');
    } else {
      note(where, 'consultation form not found on /book-consultation/');
    }
    await ctx.close();
  }

  /* --- 5. font scaling (user text size) and zoom-equivalent widths --- */
  for (const [w, h, scale] of [[320, 568, 2], [375, 812, 1.5], [375, 812, 2], [430, 932, 2], [768, 1024, 2], [1280, 800, 1.5], [1280, 800, 2]]) {
    const where = 'fontscale@' + w + 'x' + h + ' s' + scale;
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.evaluate((s) => { document.documentElement.style.fontSize = Math.round(16 * s) + 'px'; }, scale);
    await page.waitForTimeout(250);
    const res = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const overflow = Math.max(0, document.documentElement.scrollWidth - vw);
      const clipped = [];
      for (const el of document.querySelectorAll('h1, h2, h3, h4, .btn, .nav-toggle, .brand__name, p, .card__title, .lead')) {
        const s = getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        if (r.right > vw + 1.5 || r.left < -1.5) {
          if (!el.closest('.hero__rose, .page-banner__figure, .hero__curve, .petals, .ornament')) {
            clipped.push((el.className || el.tagName) + ' [box ' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
          }
        }
        /* text painting outside its own box (long word vs line) */
        if (el.scrollWidth - el.clientWidth > 2 && s.overflowX === 'visible') {
          clipped.push((el.className || el.tagName) + ' [content +' + (el.scrollWidth - el.clientWidth) + 'px] "' + (el.textContent || '').trim().slice(0, 30) + '"');
        }
      }
      return { overflow, clipped: clipped.slice(0, 8) };
    });
    if (res.overflow > 1) note(where, 'page overflow +' + res.overflow + 'px');
    for (const c of res.clipped) note(where, 'element outside viewport: ' + c);
    await ctx.close();
  }

  console.log('\n============ INTERACTION / SCALING REPORT ============');
  if (!problems.length) console.log('All interaction checks passed (drawer, accordion, lightbox, form, font-scaling).');
  else { problems.forEach((p, i) => console.log('  ' + (i + 1) + '. ' + p)); }
  console.log('Checks with findings: ' + problems.length);
  return problems.length;
}

/* --------------------------------- main --------------------------------- */
async function main() {
  const args = process.argv.slice(2);
  const QUICK = args.includes('--quick');
  const canonical = args.includes('--canonical');
  const viewports = args.includes('--standard') ? VIEWPORTS.filter((v) => [320, 768, 1024, 1440].includes(v.width)) : VIEWPORTS;
  const INTERACTIONS = args.includes('--interactions');
  const jsonArg = args.indexOf('--json');
  const portArg = args.indexOf('--port');
  const PORT = portArg > -1 ? Number(args[portArg + 1]) : 8123;

  const pages = canonical ? require('./structure').allPages.map((p) => p.url) : QUICK ? KEY_PAGES : listPages();
  const chrome = findChrome();
  if (!chrome) { console.error('No Chrome/Edge found. Set CHROME_PATH.'); process.exit(2); }

  let chromium;
  try { chromium = require('playwright-core').chromium; }
  catch (e) { console.error('playwright-core not installed (dev-only dependency).'); process.exit(2); }
  if (!chromium || typeof chromium.launch !== 'function') {
    console.error('playwright-core is present but chromium.launch is unavailable.'); process.exit(2);
  }

  if (!fs.existsSync(DIST) || !fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('dist/ is empty — run `node build/gen.js` first.'); process.exit(2);
  }

  /* freeze dist/ so a concurrent rebuild cannot break this run */
  const SERVE_ROOT = snapshotDist(path.join(ROOT, 'build', '_qa-snapshot'));

  console.log('Responsive QA — ' + pages.length + ' pages x ' + viewports.length + ' viewports');
  console.log('Browser: ' + chrome);
  console.log('Serving snapshot: build/_qa-snapshot\n');

  const server = await startServer(PORT, SERVE_ROOT);
  const browser = await chromium.launch({ executablePath: chrome, headless: true });

  if (INTERACTIONS) {
    try {
      const n = await runInteractions(browser, PORT);
      await browser.close().catch(() => {});
      try { server.close(); } catch (e) {}
      process.exit(n ? 1 : 0);
    } catch (e) {
      console.error(e);
      await browser.close().catch(() => {});
      try { server.close(); } catch (e) {}
      process.exit(2);
    }
  }

  const findings = [];
  let checks = 0;
  const consoleNoise = [];

  try {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1, hasTouch: vp.width < 1024, isMobile: vp.width < 768
      });
      const page = await context.newPage();
      page.on('console', (m) => {
        if (m.type() === 'error') consoleNoise.push({ vp: vp.name, text: m.text().slice(0, 160) });
      });
      page.on('pageerror', (e) => consoleNoise.push({ vp: vp.name, text: 'pageerror: ' + String(e).slice(0, 160) }));
      page.on('requestfailed', (r) => {
        const u = r.url();
        if (!u.startsWith('data:')) consoleNoise.push({ vp: vp.name, text: 'requestfailed: ' + u.split('/').slice(-2).join('/') });
      });

      for (const route of pages) {
        const url = 'http://127.0.0.1:' + PORT + route;
        let res;
        try { res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }); }
        catch (e) {
          findings.push({ route, vp: vp.name, fatal: 'navigation failed: ' + e.message.slice(0, 120) });
          continue;
        }
        if (res && res.status() >= 400 && route !== '/404.html') {
          findings.push({ route, vp: vp.name, fatal: 'HTTP ' + res.status() });
        }
        /* settle lazy content: nudge scroll so IntersectionObserver reveals run */
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(120);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(80);

        let f;
        try { f = await page.evaluate(auditInPage); }
        catch (e) { findings.push({ route, vp: vp.name, fatal: 'audit crashed: ' + e.message.slice(0, 120) }); continue; }
        checks++;

        const bad = f.overflow > 1 || f.offenders.length || f.clipped.length || f.brokenImages.length || f.distorted.length;
        if (bad) findings.push({ route, vp: vp.name, ...f });
      }
      await context.close();
      process.stdout.write('  checked ' + vp.name + ' (' + checks + ' page renders)\n');
    }
  } finally {
    await browser.close().catch(() => {});
    try { server.close(); } catch (e) {}
  }

  /* ------------------------------- report -------------------------------- */
  const overflow = findings.filter((f) => f.overflow > 1);
  const offenders = findings.filter((f) => f.offenders && f.offenders.length);
  const clipped = findings.filter((f) => f.clipped && f.clipped.length);
  const broken = findings.filter((f) => f.brokenImages && f.brokenImages.length);
  const distorted = findings.filter((f) => f.distorted && f.distorted.length);
  const fatals = findings.filter((f) => f.fatal);

  console.log('\n================ RESPONSIVE QA REPORT ================');
  console.log('Page renders checked: ' + checks);
  console.log('  page-level horizontal overflow : ' + overflow.length);
  console.log('  element-outside-viewport hits  : ' + offenders.length);
  console.log('  clipped-text hits              : ' + clipped.length);
  console.log('  broken images                  : ' + broken.length);
  console.log('  distorted images               : ' + distorted.length);
  console.log('  navigation/HTTP failures       : ' + fatals.length);
  console.log('  console/network errors         : ' + consoleNoise.length);

  const show = (label, arr, fmt, limit = 25) => {
    if (!arr.length) return;
    console.log('\n---- ' + label + ' ----');
    arr.slice(0, limit).forEach((f, i) => console.log('  ' + (i + 1) + '. ' + fmt(f)));
    if (arr.length > limit) console.log('  ... +' + (arr.length - limit) + ' more');
  };

  show('HORIZONTAL PAGE OVERFLOW', overflow,
    (f) => f.route + ' @ ' + f.vp + '  +' + f.overflow + 'px');
  show('ELEMENTS OUTSIDE VIEWPORT', offenders,
    (f) => f.route + ' @ ' + f.vp + ' -> ' + f.offenders.map((o) => o.sel + ' [' + o.left + '..' + o.right + '] "' + o.text + '"').join(', '));
  show('CLIPPED TEXT', clipped,
    (f) => f.route + ' @ ' + f.vp + ' -> ' + f.clipped.map((c) => c.sel + ' (x' + c.clipX + ',y' + c.clipY + ') "' + c.text + '"').join(', '));
  show('BROKEN IMAGES', broken,
    (f) => f.route + ' @ ' + f.vp + ' -> ' + f.brokenImages.map((b) => b.src).join(', '));
  show('DISTORTED IMAGES (object-fit: fill)', distorted,
    (f) => f.route + ' @ ' + f.vp + ' -> ' + f.distorted.map((d) => d.sel + ' nat' + d.natural + '/ren' + d.rendered).join(', '));
  show('NAVIGATION / HTTP', fatals, (f) => f.route + ' @ ' + f.vp + ' -> ' + f.fatal);
  show('CONSOLE / NETWORK', consoleNoise,
    (f) => f.vp + ' -> ' + f.text, 15);

  if (jsonArg > -1 && args[jsonArg + 1]) {
    fs.writeFileSync(args[jsonArg + 1], JSON.stringify({ findings, consoleNoise, checks }, null, 2));
    console.log('\nRaw findings written to ' + args[jsonArg + 1]);
  }

  const failed = overflow.length + offenders.length + broken.length + fatals.length;
  console.log('\n' + (failed ? 'RESULT: FAIL (' + failed + ' structural issue groups)' : 'RESULT: PASS (no structural overflow/broken-asset issues)'));
  process.exit(failed ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(2); });
