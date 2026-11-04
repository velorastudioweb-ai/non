'use strict';
/* POST /api/qh/admin — authenticated CMS JSON-RPC. (Filesystem routes match
 * trailing-slash URLs under trailingSlash:true; catch-all splats do not.) */
const A = require('../_qh/actions');

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body != null) return resolve(typeof req.body === 'object' && !Buffer.isBuffer(req.body) ? req.body : String(req.body));
    let size = 0; const chunks = [];
    req.on('data', (c) => { size += c.length; if (size > 12 * 1024 * 1024) { reject(Object.assign(new Error('too large'), { status: 413 })); req.destroy(); return; } chunks.push(c); });
    req.on('end', () => { const text = Buffer.concat(chunks).toString('utf8'); try { resolve(text ? JSON.parse(text) : {}); } catch { reject(Object.assign(new Error('invalid json'), { status: 400 })); } });
    req.on('error', reject);
  });
}

async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return; }
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Use POST.' }); }
  try {
    const body = await readBody(req);
    const action = String(body.action || '');
    const origin = req.headers.origin;
    if (origin && action !== 'login') {
      try { if (new URL(origin).host !== (req.headers.host || '')) return json(res, 403, { error: 'Cross-origin request blocked.' }); } catch (e) {}
    }
    const result = await A.run(action, body, { req, res });
    return json(res, 200, result || { ok: true });
  } catch (error) {
    const status = error.status || 500;
    if (status >= 500) console.error('[qh-admin]', error && error.message);
    return json(res, status, { error: status >= 500 ? 'Server error. Check the Blob storage configuration.' : error.message });
  }
}

module.exports = handler;
module.exports.handler = handler;
