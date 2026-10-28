const fs = require('fs');
const list = fs.readdirSync('dist/doctors');
const out = [];
for (const d of list) {
  const p = 'dist/doctors/' + d + '/index.html';
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  const m = html.match(/dr-[a-z0-9-]+\.png/i);
  out.push({ d: d, img: m ? m[0] : null, pending: html.indexOf('portrait pending') >= 0 });
}
console.log(JSON.stringify(out, null, 2));
