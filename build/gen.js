'use strict';

const fs = require('fs');
const path = require('path');
const { layout } = require('./templates');
const { site, pages, home, stdCta } = require('./content');
const { articles } = require('./blog');
const { consultation, legal } = require('./extra-pages');
const { researchPage } = require('./research');
const { fdaPage } = require('./fda');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PUB = path.join(ROOT, 'public');

/* ---------- helpers ---------- */
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

/* ---------- build blog index + article pages ---------- */
const blogIndex = {
  url: '/blogs/', slug: 'blogs',
  h1: 'Insights & Patient Resources',
  seoTitle: 'Breast Enhancement Education & Patient Resources | QuantumHealth',
  seoDescription: 'Evidence-led articles on breast enhancement options, safety, recovery and the questions patients should ask before treatment.',
  bannerEyebrow: 'Knowledge for more confident decisions',
  bannerLead: 'Clear, evidence-aware articles covering treatment options, safety, recovery and the questions worth asking before any decision.',
  breadcrumb: [{ label: 'Insights' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'Blog', name: 'QuantumHealth Insights', url: site.url + '/blogs/' }],
  blocks: [
    {
      type: 'cards', cols: 3, eyebrow: 'Articles',
      heading: 'Educational articles',
      lead: 'Every article is an editorial draft pending clinical review; author and reviewer details are published only once verified.',
      items: articles.map((a) => ({
        title: a.title, text: a.excerpt, kicker: a.category,
        href: '/blogs/' + a.slug + '/', slot: a.category + ' imagery'
      }))
    },
    stdCta({ heading: 'Prefer to talk it through? Arrange a consultation' })
  ]
};

function articleToPage(a) {
  const bodyHtml = '<p class="lead">' + a.intro + '</p>' +
    a.body.map(([h, p]) => '<h2 class="h3">' + h + '</h2>' + p).join('');
  const refs = a.references && a.references.length
    ? { type: 'notice', blush: true, icon: 'evidence', title: 'Primary references consulted',
        text: '<ul>' + a.references.map((r) => '<li>' + r + '</li>').join('') + '</ul>' }
    : null;
  const related = articles.filter((x) => a.related.indexOf(x.slug) > -1);
  return {
    url: '/blogs/' + a.slug + '/', slug: a.slug,
    h1: a.title, seoTitle: a.seoTitle, seoDescription: a.seoDescription,
    bannerEyebrow: a.category,
    bannerLead: a.excerpt,
    breadcrumb: [{ label: 'Insights', href: '/blogs/' }, { label: a.title }],
    ogType: 'article',
    schema: [{
      '@context': 'https://schema.org', '@type': 'MedicalScholarlyArticle',
      headline: a.title, description: a.seoDescription,
      datePublished: a.date || undefined,
      url: site.url + '/blogs/' + a.slug + '/'
    }],
    blocks: [
      { type: 'prose', html: bodyHtml },
      {
        type: 'notice', icon: 'info', title: 'Editorial disclaimer',
        text: 'This article is educational and does not provide a personal diagnosis or treatment recommendation. It is an editorial draft: an author and a suitably qualified clinical reviewer will be credited only once the article has actually been authored and reviewed.'
      },
      refs,
      related.length ? {
        type: 'cards', alt: true, cols: related.length >= 3 ? 3 : related.length, eyebrow: 'Read next', heading: 'Related articles',
        items: related.map((r) => ({ title: r.title, text: r.excerpt, kicker: r.category, href: '/blogs/' + r.slug + '/' }))
      } : null,
      stdCta()
    ].filter(Boolean)
  };
}

/* ---------- 404 ---------- */
const notFound = {
  url: '/404.html', slug: '404', h1: 'Page not found',
  seoTitle: 'Page Not Found | QuantumHealth', seoDescription: 'The page you were looking for could not be found.',
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
  if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);

  const all = [home].concat(pages, [consultation], legal, [blogIndex], [researchPage], [fdaPage], articles.map(articleToPage));

  const written = [];
  all.forEach((page) => {
    writePage(page.url, layout(page, site));
    written.push(page.url);
  });
  // 404 written to dist/404.html (not a folder)
  fs.writeFileSync(path.join(DIST, '404.html'), layout(notFound, site), 'utf8');

  // assets
  copyDir(path.join(PUB, 'assets'), path.join(DIST, 'assets'));

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

  return { written, total: written.length + 1, indexable: indexable.length };
}

const result = build();
console.log('Generated ' + result.total + ' HTML pages (' + result.indexable + ' indexable) + robots.txt + sitemap.xml');
console.log('Pages:', result.written.join(' '));
