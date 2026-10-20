'use strict';
const fs = require('fs');
const s = fs.readFileSync(__dirname + '/build/content.js', 'utf8');
const chars = {
  rsquo: '\u2019', // right single quote
  emdash: '\u2014',
  ldquo: '\u201C',
  rdquo: '\u201D',
  middot: '\u00B7',
  endash: '\u2013',
  mojiA: '\u00E2\u20AC\u201D', // â€”
  mojiA2: '\u00E2\u20AC\u2122', // â€™
  mojiE9: '\u00E2\u0080\u0099' // leftover byte-level oddity (unlikely)
};
for (const [k, v] of Object.entries(chars)) {
  const re = new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  console.log(k, (s.match(re) || []).length);
}
const lines = s.split(/\r?\n/);
console.log('line39:', JSON.stringify(lines[38]));
console.log('line1263:', JSON.stringify(lines[1262]));
