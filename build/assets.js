'use strict';
// Build-only minification. Content-addressed URLs can be cached indefinitely
// without serving stale CSS/JS after a deployment. No client-side bundler/runtime.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const esbuild = require('esbuild');
const PUBLIC = path.join(__dirname, '../public/assets');
const files = new Map();
function register(name, text, loader) {
  const result = esbuild.transformSync(text, { loader, minify: true, target: ['chrome100', 'safari15', 'firefox100'], legalComments: 'none' });
  if (result.warnings.length) throw new Error(name + ': ' + result.warnings.map(w => w.text).join('; '));
  const output = result.code;
  const hash = crypto.createHash('sha256').update(output).digest('hex').slice(0, 12);
  const filename = name.replace(/\.(css|js)$/, '-' + hash + '.$1');
  files.set(name, { href: '/assets/built/' + filename, filename, output });
}
let components = fs.readFileSync(path.join(PUBLIC, 'css/components.css'), 'utf8');
// Keep authored styles in one readable source. Only pages with these components
// request their styles. Core breakpoint overrides still follow the base rules.
for (const [name, pattern] of [
  ['form', /\/\* =+ form =+ \*\/[\s\S]*?(?=\/\* =+ page banner)/],
  ['gallery', /\/\* =+ gallery =+ \*\/[\s\S]*?(?=\/\* =+ page banner)/],
  ['research', /\/\* ---------- PMC research library ---------- \*\/[\s\S]*?(?=\/\* Canonical section)/],
  ['blog', /\/\* =+ blog styles =+ \*\/[\s\S]*?(?=\/\* =+ profile styles =+ \*\/)/],
  ['profiles', /\/\* =+ profile styles =+ \*\/[\s\S]*?\/\* =+ end profile styles =+ \*\/\s*/]
]) {
  const match = components.match(pattern);
  if (!match) throw new Error('Missing component CSS boundary: ' + name);
  register(name + '.css', match[0], 'css');
  components = components.replace(pattern, '');
}
register('site.css', ['fonts', 'tokens', 'base', 'components', 'banners'].map(name => name === 'components' ? components : fs.readFileSync(path.join(PUBLIC, 'css', name + '.css'), 'utf8')).join('\n'), 'css');
for (const name of ['main', 'research']) register(name + '.js', fs.readFileSync(path.join(PUBLIC, 'js', name + '.js'), 'utf8'), 'js');
function href(name) { return files.get(name).href; }
function write(dist) {
  const dir = path.join(dist, 'assets/built');
  fs.mkdirSync(dir, { recursive: true });
  for (const file of files.values()) fs.writeFileSync(path.join(dir, file.filename), file.output);
  // Preserve all records and properties, removing serialization whitespace only.
  const data = path.join(dist, 'assets/data');
  for (const filename of fs.readdirSync(data).filter(name => name.endsWith('.json'))) {
    const file = path.join(data, filename);
    fs.writeFileSync(file, JSON.stringify(JSON.parse(fs.readFileSync(file, 'utf8'))));
  }
  console.log('Minified assets: ' + [...files.values()].map(file => `${file.filename} ${Buffer.byteLength(file.output)} B`).join(', '));
}
module.exports = { href, write };
