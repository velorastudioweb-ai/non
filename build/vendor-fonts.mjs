// One-time/reproducible asset preparation; normal builds never require Google.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dest = path.join(root, 'public/assets/fonts');
await fs.mkdir(dest, { recursive: true });
const families = [
  ['cormorant-garamond-v21', 'Cormorant+Garamond:ital,wght@0,500..600;1,500..600', 'cormorantgaramond'],
  ['montserrat-v31', 'Montserrat:wght@300..500', 'montserrat'],
  ['pinyon-script-v24', 'Pinyon+Script', 'pinyonscript']
];
async function download(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
  if (!response.ok) throw new Error(url + ': HTTP ' + response.status);
  return response;
}
let css = '/* Self-hosted original Google Fonts families, weights and Unicode coverage. */\n';
for (const [name, query, licenseDir] of families) {
  const remote = await (await download('https://fonts.googleapis.com/css2?family=' + query + '&display=swap')).text();
  for (const match of remote.matchAll(/\/\* ([\w-]+) \*\/\s*(@font-face\s*\{[^}]+\})/g)) {
    const [, subset, block] = match;
    const style = /font-style:\s*(\w+)/.exec(block)[1];
    const url = /url\(([^)]+)\)/.exec(block)[1];
    if (!url.endsWith('.woff2')) throw new Error('Expected WOFF2: ' + url);
    const filename = `${name}-${style}-${subset}.woff2`;
    await fs.writeFile(path.join(dest, filename), Buffer.from(await (await download(url)).arrayBuffer()));
    css += block.replace(url, '../fonts/' + filename) + '\n';
  }
  await fs.writeFile(path.join(dest, name + '-OFL.txt'), await (await download('https://raw.githubusercontent.com/google/fonts/main/ofl/' + licenseDir + '/OFL.txt')).text());
}
if (!css.includes('@font-face')) throw new Error('No font declarations downloaded.');
await fs.writeFile(path.join(root, 'public/assets/css/fonts.css'), css);
console.log('Vendored the original three font families (WOFF2, all supplied Unicode subsets + OFL licenses).');
