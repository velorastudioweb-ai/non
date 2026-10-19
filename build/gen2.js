'use strict';

const fs = require('fs');
const path = require('path');
const { layout } = require('./templates');
const { site } = require('./config');
const { getAll } = require('./pages');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUB = path.join(ROOT, 'public');

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function writePage(url, html) {
  const dir = url === '/' ? DIST : path.join(DIST, url.replace(/^\//, '').replace(/\/$/, ''));
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}
function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function build() {
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);
  const pages = getAll();
  pages.forEach((p) => writePage(p.url, layout(p, site)));
  fs.writeFileSync(path.join(DIST, '404.html'), layout(pages.find((x) => x.url === '/404.html'), site), 'utf8');
  copyDir(path.join(PUB, 'assets'), path.join(DIST, 'assets'));
  for (const entry of fs.readdirSync(PUB, { withFileTypes: true })) {
    if (entry.isDirectory()) continue;
    fs.copyFileSync(path.join(PUB, entry.name), path.join(DIST, entry.name));
  }
  fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + site.url + '/sitemap.xml\n');
  const indexable = pages.filter((p) => !p.robots || p.robots.indexOf('noindex') === -1);
  const urls = indexable.map((p) => {
    const hreflang = p.hreflang ? p.hreflang.map((h) => '    <xhtml:link rel="alternate" hreflang="' + h.lang + '" href="' + site.url + h.href + '"/>').join('\n') + '\n' : '';
    return '  <url>\n    <loc>' + site.url + p.url + '</loc>\n' + hreflang + '    <changefreq>' + (p.url === '/' ? 'weekly' : 'monthly') + '</changefreq>\n    <priority>' + (p.url === '/' ? '1.0' : '0.7') + '</priority>\n  </url>';
  }).join('\n');
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + urls + '\n</urlset>\n');
  const wiki = require('./wiki').loadWiki();
  const blogDir = path.join(__dirname, '..', 'content', 'blog');
  const blogPosts = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter((f) => f.endsWith('.md')).map((f) => {
    const md = fs.readFileSync(path.join(blogDir, f), 'utf8');
    const { data, body } = require('./markdown').parseFrontMatter(md);
    return { url: '/blog/' + (data.slug || f.replace(/\.md$/, '')) + '/', title: data.title, text: body.slice(0, 800) };
  }) : [];
  const idx = [];
  wiki.forEach((a) => idx.push({ url: a.url, title: a.data.title, text: (a.data.summary || '') + ' ' + a.data.keywords.join(' ') }));
  blogPosts.forEach((p) => idx.push({ url: p.url, title: p.title, text: p.text }));
  idx.push({ url: '/wiki/', title: 'Breast Augmentation Wiki', text: 'breast augmentation implants recovery risks costs' });
  fs.writeFileSync(path.join(DIST, 'search-index.json'), JSON.stringify(idx));
  fs.writeFileSync(path.join(DIST, 'assets', 'i18n', 'en.json'), JSON.stringify(require('./i18n').strings.en));
  fs.writeFileSync(path.join(DIST, 'assets', 'i18n', 'hi.json'), JSON.stringify(require('./i18n').strings.hi));
  fs.writeFileSync(path.join(DIST, 'assets', 'i18n', 'te.json'), JSON.stringify(require('./i18n').strings.te));
  fs.writeFileSync(path.join(DIST, 'assets', 'i18n', 'ta.json'), JSON.stringify(require('./i18n').strings.ta));
  fs.writeFileSync(path.join(DIST, 'assets', 'i18n', 'ar.json'), JSON.stringify(require('./i18n').strings.ar));
  return pages.length;
}
const n = build();
console.log('Generated', n, 'pages');
