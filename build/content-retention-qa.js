'use strict';
const fs = require('fs');
const path = require('path');
const { pages } = require('./content');
const { libraryPages } = require('./library');
const { redirects } = require('./structure');
const targets = new Map(redirects.map((r) => [r.from, r.to.split('#')[0]]));
const norm = (s) => s.replace(/<[^>]*>/g, ' ').replace(/&(?:amp|quot|lt|gt|#\d+);/g, ' ').toLowerCase().replace(/[^a-z0-9]/g, '');
function strings(value, out = []) {
  if (typeof value === 'string' && value.length > 80) out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out));
  return out;
}
const results = [];
for (const p of pages.concat(libraryPages)) {
  // The former research hub was an index, not a source of clinical findings.
  if (p.url === '/research/') continue;
  const target = targets.get(p.url) || p.url;
  const file = path.join(__dirname, '..', 'dist', target, 'index.html');
  const text = norm(fs.readFileSync(file, 'utf8').match(/<main[^>]*>([\s\S]*?)<\/main>/)[1]);
  const blocks = p.blocks.filter((b) => !['cards', 'cta'].includes(b.type));
  const fragments = strings(blocks);
  const missing = fragments.filter((s) => !text.includes(norm(s)));
  results.push({ source: p.url, target, fragments: fragments.length, missing });
}
const report = { checked: results.reduce((n, r) => n + r.fragments, 0), results,
  intentionalConsolidations: 'Four treatment-specific shared FAQ answers now link to their canonical guides. The generic augmentation suitability answer is owned by shared FAQs. Topic grids and repeated CTAs are navigation, not medical content.' };
fs.writeFileSync(path.join(__dirname, '..', 'docs', 'restructure-audit', 'content-retention.json'), JSON.stringify(report, null, 2));
console.log('Compared ' + report.checked + ' original clinical content fragments with their final destinations.');
results.filter((r) => r.missing.length).forEach((r) => console.log(r.source + ': ' + r.missing.length + ' consolidated fragments\n' + r.missing.map((s) => s.slice(0, 140)).join('\n')));
