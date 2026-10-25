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
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);

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

  // copy any root-level static files from public/ (e.g. .htaccess)
  for (const entry of fs.readdirSync(PUB, { withFileTypes: true })) {
    if (entry.isDirectory()) continue;
    fs.copyFileSync(path.join(PUB, entry.name), path.join(DIST, entry.name));
  }

  // robots.txt
  fs.writeFileSync(path.join(DIST, 'robots.txt'),
    'User-agent: *\nAllow: /\n\nSitemap: ' + site.url + '/sitemap.xml\n', 'utf8');

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
