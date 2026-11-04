'use strict';
/* /api/qh/* router
 *   GET  /api/qh/content?page=/url/            public published overlay + site settings
 *   GET  /api/qh/content?page=/url/&draft=1    authenticated draft preview (session cookie)
 *   POST /api/qh/admin                          authenticated CMS actions (JSON RPC)
 *   GET  /api/qh/file/<media path>              media delivery (long cache, CSP-safe same origin)
 *
 * The dynamic segment is named "segments" (NOT "path") so it never collides with
 * the ?page/… query parameters that Vercel merges into req.query. */
const L = require('../_qh/lib');
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

function routeSegments(req) {
  const raw = (req.query.segments != null ? req.query.segments : req.query._path);
  if (Array.isArray(raw)) return raw;
  if (raw == null) return [];
  return String(raw).split('/').filter(Boolean);
}

async function handler(req, res) {
  const parts = routeSegments(req);
  const head = parts[0];

  if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return; }

  try {
    if (head === 'content' && req.method === 'GET') {
      let pathname = req.query.page;
      if (Array.isArray(pathname)) pathname = pathname[pathname.length - 1];
      if (typeof pathname !== 'string' || !pathname.startsWith('/')) pathname = '/';
      const wantDraft = req.query.draft === '1';
      const out = await A.contentFor(req, pathname, wantDraft);
      res.setHeader('Cache-Control', wantDraft ? 'no-store' : 'public, s-maxage=30, stale-while-revalidate=120');
      return json(res, 200, out);
    }

    if (head === 'admin') {
      if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return json(res, 405, { error: 'Use POST.' }); }
      const body = await readBody(req);
      const action = String(body.action || '');
      const origin = req.headers.origin;
      if (origin && action !== 'login') {
        try { if (new URL(origin).host !== (req.headers.host || '')) return json(res, 403, { error: 'Cross-origin request blocked.' }); } catch {}
      }
      const result = await A.run(action, body, { req, res });
      return json(res, 200, result || { ok: true });
    }

    if (head === 'file') {
      const rel = parts.slice(1).join('/');
      if (!rel.startsWith('cms/media/') && !rel.startsWith('media/')) return json(res, 404, { error: 'Not found' });
      const buf = await L.readBlobBuffer(rel.replace(/^cms\//, '')).catch(() => null);
      if (!buf) return json(res, 404, { error: 'Not found' });
      const ext = (rel.split('.').pop() || '').toLowerCase();
      res.statusCode = 200;
      res.setHeader('Content-Type', A.EXT_MIME[ext] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.end(buf);
    }

    return json(res, 404, { error: 'Unknown endpoint' });
  } catch (error) {
    const status = error.status || 500;
    if (status >= 500) console.error('[qh]', head, error && error.message);
    return json(res, status, { error: status >= 500 ? 'Server error. Check the Blob storage configuration.' : error.message });
  }
}

module.exports = handler;
module.exports.handler = handler;
