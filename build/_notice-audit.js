'use strict';
// Temp audit: every notice block + JS alert roles, for the safety-content review.
const { allPages } = require('./structure');
const fs = require('fs');
const out = [];
function walk(blocks, page, prefix) {
  (blocks || []).forEach((b, i) => {
    if (b.type === 'notice') out.push({ page, path: prefix + i, title: b.title, text: String(b.text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 140), icon: b.icon || 'info' });
    if (b.blocks) walk(b.blocks, page, prefix + i + '.');
  });
}
allPages.forEach((p) => walk(p.blocks, p.url, ''));
const groups = new Map();
out.forEach((n) => {
  const key = n.title.replace(/\s+/g, ' ').trim().toLowerCase();
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(n);
});
const dupes = [...groups.entries()].filter(([, v]) => v.length > 1);
fs.writeFileSync('build/_notice-audit.json', JSON.stringify({ total: out.length, dupes, all: out }, null, 1));
console.log('total notices:', out.length, '| duplicate-title groups:', dupes.length);
dupes.forEach(([k, v]) => console.log(' -', k, v.length, v.map((x) => x.page).slice(0, 4).join(',')));
// JS-driven alerts
const js = ['main.js', 'gallery.js', 'contact.js', 'research.js', 'motion.js', 'form.js'];
js.forEach((f) => {
  const p = 'public/assets/js/' + f;
  if (!fs.existsSync(p)) return;
  const roles = [...fs.readFileSync(p, 'utf8').matchAll(/role[^,\)]{0,20}/g)].length;
  console.log('js', f, 'role mentions', roles);
});
