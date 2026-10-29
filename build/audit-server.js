'use strict';
// Audit a frozen production build so another local build cannot remove assets
// in the middle of a browser run. Each run owns its own temporary snapshot.
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
async function startAuditServer(base) {
  if (base) {
    await fetch(base);
    return { base, close: async () => {} };
  }
  const parent = path.join(os.tmpdir(), 'opencode');
  fs.mkdirSync(parent, { recursive: true });
  const snapshot = fs.mkdtempSync(path.join(parent, 'responsive-'));
  fs.cpSync(path.join(__dirname, '../dist'), snapshot, { recursive: true });
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/api/contact') return require('../api/contact')(req, res);
    const requested = path.resolve(snapshot, '.' + pathname);
    let file = requested;
    if (!file.startsWith(snapshot + path.sep) && file !== snapshot) { res.writeHead(400); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    const exists = fs.existsSync(file) && fs.statSync(file).isFile();
    if (!exists) file = path.join(snapshot, '404.html');
    res.writeHead(exists ? 200 : 404, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  return {
    base: 'http://127.0.0.1:' + server.address().port,
    close: async () => {
      await new Promise(resolve => { server.close(resolve); server.closeAllConnections(); });
      fs.rmSync(snapshot, { recursive: true, force: true });
    }
  };
}
module.exports = { startAuditServer };
