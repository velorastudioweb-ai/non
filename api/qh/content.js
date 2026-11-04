'use strict';
/* GET /api/qh/content?page=/url/ — public published overlay + site settings.
 * ?page=&draft=1 returns the draft only when a valid admin session cookie is
 * present; anonymous callers always receive the published document. */
const A = require('../_qh/actions');

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(payload));
}

async function handler(req, res) {
  try {
    let pathname = req.query.page;
    if (Array.isArray(pathname)) pathname = pathname[pathname.length - 1];
    if (typeof pathname !== 'string' || !pathname.startsWith('/')) pathname = '/';
    const wantDraft = req.query.draft === '1';
    const out = await A.contentFor(req, pathname, wantDraft);
    res.setHeader('Cache-Control', wantDraft ? 'no-store' : 'public, s-maxage=30, stale-while-revalidate=120');
    return json(res, 200, out);
  } catch (error) {
    const status = error.status || 500;
    console.error('[qh-content]', error && error.message);
    return json(res, status, { error: status >= 500 ? 'Server error' : error.message });
  }
}

module.exports = handler;
module.exports.handler = handler;
