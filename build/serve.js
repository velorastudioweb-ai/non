/* Dependency-free static server for the generated site (dist/).
   Usage:
     node build/serve.js            serve dist/ on http://localhost:8099
     node build/serve.js --watch    also rebuild on changes to build/ and public/
     node build/serve.js --port 5000
*/
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const WATCH = process.argv.includes('--watch');

const portArg = process.argv.indexOf('--port');
const PORT = portArg > -1 ? Number(process.argv[portArg + 1]) : 8099;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const full = path.join(DIST, path.normalize(p).replace(/^(\.\.[/\\])+/, ''));
  if (!full.startsWith(DIST)) return null;
  if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  if (fs.existsSync(full + '.html')) return full + '.html';
  if (fs.existsSync(path.join(full, 'index.html'))) return path.join(full, 'index.html');
  return null;
}

function send(res, file, status) {
  const ext = path.extname(file).toLowerCase();
  res.writeHead(status || 200, {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (file) return send(res, file);
  const notFound = path.join(DIST, '404.html');
  if (fs.existsSync(notFound)) return send(res, notFound, 404);
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log('\n  Breast Enlargement Guide dev server');
  console.log('  Serving dist/ at  http://localhost:' + PORT + '/\n');
  if (WATCH) {
    console.log('  Watching build/ and public/ for changes (Ctrl+C to stop)...\n');
    let timer = null;
    const rebuild = () => {
      try {
        execFileSync(process.execPath, [path.join(__dirname, 'gen.js')], { stdio: 'inherit' });
      } catch (e) {
        console.error('  Build failed; server still running.');
      }
    };
    const onChange = () => { clearTimeout(timer); timer = setTimeout(rebuild, 150); };
    for (const dir of ['build', 'public']) {
      try { fs.watch(path.join(ROOT, dir), { recursive: true }, onChange); } catch (e) {}
    }
  }
});
