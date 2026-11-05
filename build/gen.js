'use strict';

const fs = require('fs');
const path = require('path');
const { layout } = require('./templates');
const { site, allPages } = require('./structure');
const { writeStubs } = require('./redirects');
const assets = require('./assets');
const { verifyImages } = require('./responsive-images');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUB = path.join(ROOT, 'public');

/* ---------- helpers ---------- */
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function writePage(url, html) {
  const dir = url === '/' ? DIST : path.join(DIST, url.replace(/^\//, '').replace(/\/$/, ''));
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), html.replace(/[\t ]+$/gm, ''), 'utf8');
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

/* ---------- 404 ---------- */
const notFound = {
  url: '/404.html', slug: '404', h1: 'Page not found',
      seoTitle: 'Page Not Found | Quantum Health', seoDescription: 'The page you were looking for could not be found.',
  noindex: true,
  bannerEyebrow: 'Error 404', showBanner: false,
  blocks: [
    { type: 'prose', html:
      '<div class="err-page"><div><p class="display">404</p><h1 class="h2" style="margin-top:1rem">This page could not be found</h1>' +
      '<p class="lead" style="margin-top:1rem">The page may have moved, or the link may be incorrect.</p>' +
      '<p style="margin-top:2rem"><a class="btn btn--primary" href="/">Return home</a></p></div></div>' }
  ]
};

/* ---------- generate ---------- */
function build() {
  verifyImages();
  if (fs.existsSync(DIST)) {
    // Remove contents rather than the directory itself to avoid EPERM on Windows
    // when the directory or a parent is held open by a file watcher / server.
    for (const entry of fs.readdirSync(DIST, { withFileTypes: true })) {
      const child = path.join(DIST, entry.name);
      fs.rmSync(child, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    }
  } else {
    ensureDir(DIST);
  }

  const all = allPages;
  const routes = new Set();
  all.forEach((p) => {
    if (routes.has(p.url)) throw new Error('Duplicate canonical route: ' + p.url);
    routes.add(p.url);
  });

  const written = [];
  all.forEach((page) => {
    writePage(page.url, layout(page, site));
    written.push(page.url);
  });
  // redirect stubs for retired routes (written to dist, noindex, excluded from sitemap)
  const redirectCount = writeStubs(writePage);
  // 404 written to dist/404.html (not a folder)
  fs.writeFileSync(path.join(DIST, '404.html'), layout(notFound, site), 'utf8');

  // assets
  copyDir(path.join(PUB, 'assets'), path.join(DIST, 'assets'));
  assets.write(DIST);
  // admin panel (static SPA; all data flows through /api/qh)
  copyDir(path.join(PUB, 'admin'), path.join(DIST, 'admin'));

  // copy any root-level static files from public/ (e.g. .htaccess, favicon,
  // full-size source images linked from figures and captions). Keep root raster
  // files even when a responsive manifest entry exists, because editorial
  // captions may link to the original full-resolution asset.
  for (const entry of fs.readdirSync(PUB, { withFileTypes: true })) {
    if (entry.isDirectory()) continue;
    fs.copyFileSync(path.join(PUB, entry.name), path.join(DIST, entry.name));
  }

  // robots.txt
  fs.writeFileSync(path.join(DIST, 'robots.txt'),
    'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ' + site.url + '/sitemap.xml\n', 'utf8');

  // CMS page registry + placeholder baseline (consumed by /admin and the
  // Placeholder Audit module; published edits overlay these at runtime).
  const qhData = path.join(DIST, 'assets', 'data');
  ensureDir(qhData);
  const slugOf = (u) => { const seg = u.replace(/^\/+|\/+$/g, ''); return !seg || seg === 'index' ? 'home' : seg.replace(/\/+$/, '').replace(/\//g, '-').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase(); };
  fs.writeFileSync(path.join(qhData, 'qh-pages.json'), JSON.stringify({
    generatedAt: new Date().toISOString(),
    pages: all.map((p) => ({ url: p.url, slug: slugOf(p.url), title: p.seoTitle || p.h1, h1: p.h1, noindex: !!p.noindex }))
  }), 'utf8');

  // placeholder baseline: scan generated HTML for template leftovers
  const patterns = [
    [/lorem\s+ipsum/i, 'lorem-ipsum'],
    [/\bTBD\b|\bTODO\b/i, 'todo'],
    [/coming\s+soon/i, 'coming-soon'],
    [/919000000000|\+91\s?90000\s?00000/, 'placeholder-phone'],
    [/[\w.-]+@quantumhealth\.example|example\.(com|org)/i, 'placeholder-email'],
    [/PLACEHOLDER/i, 'placeholder-token'],
    [/portrait pending/i, 'portrait-pending'],
    [/verification pending/i, 'verification-pending']
  ];
  const findings = [];
  const walkDir = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = path.join(dir, e.name);
      if (e.isDirectory()) { walkDir(fp); continue; }
      if (!fp.endsWith('index.html')) continue;
      if (/[\\/]admin[\\/]/.test(fp)) continue;
      const rel = '/' + path.relative(DIST, fp).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/^\//, '');
      const html = fs.readFileSync(fp, 'utf8');
      patterns.forEach(([re, name]) => {
        const hits = html.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'));
        if (hits) findings.push({ page: rel.startsWith('/') ? rel : '/' + rel + '/', pattern: name, count: hits.length });
      });
    }
  };
  walkDir(DIST);
  fs.writeFileSync(path.join(qhData, 'qh-placeholders.json'), JSON.stringify({ generatedAt: new Date().toISOString(), findings }, null, 1), 'utf8');

  // sitemap.xml (exclude noindex pages)
  const indexable = all.filter((p) => !p.noindex);
  const urls = indexable.map((p) => {
    const lastmod = (p.ogType === 'article' ? '' : '');
    return '  <url>\n    <loc>' + site.url + p.url + '</loc>\n    <changefreq>' +
      (p.url === '/' ? 'weekly' : 'monthly') + '</changefreq>\n    <priority>' +
      (p.url === '/' ? '1.0' : '0.7') + '</priority>\n  </url>';
  }).join('\n');
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n', 'utf8');

  return { written, total: written.length + 1, indexable: indexable.length, redirects: redirectCount };
}

const result = build();
console.log('Generated ' + result.total + ' HTML pages (' + result.indexable + ' indexable) + robots.txt + sitemap.xml');
console.log('Redirect stubs: ' + result.redirects);
console.log('Pages:', result.written.join(' '));
