'use strict';
/* GET /api/qh/file/media/<folder>/<name>.<ext>
 * Streams CMS media from the private Blob store through the site origin
 * (CSP img-src 'self' compatible) with immutable caching. URLs end in a file
 * extension, so trailingSlash canonicalisation never touches them. */
const L = require('../../_qh/lib');
const A = require('../../_qh/actions');

async function handler(req, res) {
  try {
    const raw = (req.query.name != null ? req.query.name : req.query._path);
    const parts = Array.isArray(raw) ? raw : String(raw || '').split('/').filter(Boolean);
    const rel = parts.join('/');
    if (!rel.startsWith('media/') || rel.includes('..')) {
      res.statusCode = 404; res.setHeader('Content-Type', 'text/plain'); return res.end('Not found');
    }
    const buf = await L.readBlobBuffer(rel);
    if (!buf) { res.statusCode = 404; res.setHeader('Content-Type', 'text/plain'); return res.end('Not found'); }
    const ext = (rel.split('.').pop() || '').toLowerCase();
    res.statusCode = 200;
    res.setHeader('Content-Type', A.EXT_MIME[ext] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.end(buf);
  } catch (error) {
    console.error('[qh-file]', error && error.message);
    res.statusCode = 500;
    return res.end('Server error');
  }
}

module.exports = handler;
module.exports.handler = handler;
