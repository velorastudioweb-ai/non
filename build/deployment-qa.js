'use strict';
// Verify deployed HTML/assets, immutable cache headers, complete data and redirects.
// --site-url mirrors the explicit SITE_URL configured on Vercel; it does not
// change local/deployed SEO settings or ignore other document differences.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('assert/strict');
const { allPages, redirects, site } = require('./structure');
const ROOT = path.resolve(__dirname, '..');
const base = process.argv[2] || 'https://quantumhealth-website.vercel.app';
const siteUrlIndex = process.argv.indexOf('--site-url');
const expectedSiteUrl = siteUrlIndex < 0 ? site.url : process.argv[siteUrlIndex + 1].replace(/\/+$/, '');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const expectedHtml = file => fs.readFileSync(file, 'utf8').split(site.url).join(expectedSiteUrl).replace(/\r\n/g, '\n');
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const sharedHeaders = Object.fromEntries(vercel.headers[0].headers.map(({ key, value }) => [key.toLowerCase(), value]));
async function main() {
  const checked = [], failures = [];
  for (const page of allPages) {
    const response = await fetch(base + page.url);
    assert.equal(response.status, 200, page.url);
    const local = expectedHtml(path.join(ROOT, 'dist', page.url, 'index.html'));
    const remote = (await response.text()).replace(/\r\n/g, '\n');
    assert.equal(sha(remote), sha(local), 'Deployed HTML differs: ' + page.url);
    checked.push(page.url);
  }
  const missing = await fetch(base + '/__performance-qa-not-found/');
  assert.equal(missing.status, 404);
  assert.equal(sha((await missing.text()).replace(/\r\n/g, '\n')), sha(expectedHtml(path.join(ROOT, 'dist/404.html'))));
  const securityResponse = await fetch(base + '/');
  const securityHeaders = {};
  for (const [name, expected] of Object.entries(sharedHeaders)) {
    const actual = securityResponse.headers.get(name);
    assert.equal(actual, expected, 'Security header mismatch: ' + name);
    securityHeaders[name] = actual;
  }
  for (const redirect of redirects) {
    const response = await fetch(base + redirect.from, { redirect: 'manual' });
    assert([301, 308].includes(response.status), 'Redirect status: ' + redirect.from);
    assert.equal(new URL(response.headers.get('location'), base).href, new URL(redirect.to, base).href);
  }
  const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
  const dist = path.join(ROOT, 'dist');
  const files = walk(dist).filter(file => /\.(webp|svg|png|ico|woff2|css|js|json)$/.test(file));
  let next = 0;
  const assets = [];
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (next < files.length) {
      const file = files[next++];
      const url = '/' + path.relative(dist, file).replace(/\\/g, '/');
      try {
        const response = await fetch(base + encodeURI(url));
        assert.equal(response.status, 200, url);
        const remote = Buffer.from(await response.arrayBuffer());
        assert.equal(sha(remote), sha(fs.readFileSync(file)), 'Asset bytes differ: ' + url);
        const cache = response.headers.get('cache-control');
        if (/^\/assets\/(built|responsive|fonts)\//.test(url)) assert(cache.includes('immutable') && cache.includes('31536000'), 'Missing immutable cache: ' + url);
        assets.push({ url, bytes: remote.length, cache, encoding: response.headers.get('content-encoding') });
      } catch (error) { failures.push(String(error)); }
    }
  }));
  const out = path.join(ROOT, 'docs/performance-audit');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'deployment-verification.json'), JSON.stringify({ base, expectedSiteUrl, checkedAt: new Date().toISOString(), pages: checked.length, redirects: redirects.length, custom404: 'pass', securityHeaders, assets: assets.sort((a, b) => a.url.localeCompare(b.url)), failures }, null, 2));
  console.log(`Verified ${checked.length} deployed pages, ${redirects.length} redirects, custom 404, ${Object.keys(securityHeaders).length} security headers and ${assets.length} assets against the local production build.`);
  assert.deepEqual(failures, []);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
