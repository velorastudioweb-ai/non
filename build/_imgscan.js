const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(js|json|html)$/.test(f.name)) {
      const t = fs.readFileSync(p, 'utf8');
      const m = t.match(/\/[^"'`\s>]+\.(?:webp|png|jpe?g|svg|avif)/gi);
      if (m) console.log(p, JSON.stringify([...new Set(m)]));
    }
  }
}
walk('build');
walk('content');
