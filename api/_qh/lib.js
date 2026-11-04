'use strict';
/* Quantum Health CMS — shared server library.
 * Runs inside Vercel serverless functions (api/_qh is not routable).
 * Storage: private Vercel Blob store via BLOB_READ_WRITE_TOKEN. */

const crypto = require('crypto');
const { put, get, list, del, head } = require('@vercel/blob');

const PREFIX = process.env.QH_CMS_PREFIX || 'cms/';

/* ---------------- blob store helpers ---------------- */
function requireToken() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is not configured on this deployment');
}
async function readDoc(name, fallback, attempt) {
  requireToken();
  try {
    const res = await get(PREFIX + name, { access: 'private', useCache: false, abortSignal: AbortSignal.timeout(20000) });
    if (!res || !res.stream) return fallback;
    const text = Buffer.from(await new Response(res.stream).arrayBuffer()).toString('utf8');
    try { return JSON.parse(text); } catch { return fallback; }
  } catch (e) {
    if (/does not exist|not found|404/i.test(String(e && e.message))) return fallback;
    const tries = attempt || 0;
    if (tries < 2) { await new Promise((r) => setTimeout(r, 250 * (tries + 1))); return readDoc(name, fallback, tries + 1); }
    throw e;
  }
}
async function writeDoc(name, value, meta) {
  requireToken();
  const json = JSON.stringify(value);
  return put(PREFIX + name, json, {
    access: 'private',
    abortSignal: AbortSignal.timeout(20000),
    contentType: 'application/json; charset=utf-8',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    ...((meta && meta) || {})
  });
}
async function deleteDoc(name) { requireToken(); await del(PREFIX + name, { access: 'private', abortSignal: AbortSignal.timeout(20000) }); }
async function listDocs(sub) {
  requireToken();
  const out = [];
  let cursor;
  do {
    const res = await list({ prefix: PREFIX + (sub || ''), cursor, abortSignal: AbortSignal.timeout(20000) });
    (res.blobs || []).forEach((b) => out.push(b));
    cursor = res.hasMore && res.cursor;
  } while (cursor);
  return out;
}
async function readBlobRaw(name) {
  requireToken();
  const res = await get(PREFIX + name, { access: 'private', abortSignal: AbortSignal.timeout(20000) });
  if (!res || !res.stream) return null;
  return res;
}
async function readBlobBuffer(name) {
  requireToken();
  const res = await get(PREFIX + name, { access: 'private', abortSignal: AbortSignal.timeout(20000) });
  if (!res || !res.stream) return null;
  return Buffer.from(await new Response(res.stream).arrayBuffer());
}
async function writeBinary(path, buffer, contentType) {
  requireToken();
  // Stored privately; delivered through /api/qh/file (same-origin, CSP-safe).
  return put(PREFIX + path, buffer, {
    access: 'private',
    abortSignal: AbortSignal.timeout(30000),
    contentType,
    pathname: PREFIX + path,
    addRandomSuffix: false,
    allowOverwrite: true
  });
}

/* ---------------- generic utils ---------------- */
const nowIso = () => new Date().toISOString();
function id(prefix) { return prefix + '-' + crypto.randomBytes(8).toString('hex'); }
function clean(value, max) { return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, max || 200); }
function constantTimeEqual(a, b) {
  const ba = Buffer.from(String(a)), bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}
function clientIp(req) {
  const f = req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For'];
  if (f) return String(f).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}
function parseCookies(req) {
  const out = {};
  String(req.headers.cookie || '').split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i > -1) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
function setCookie(res, name, value, opts) {
  const o = opts || {};
  const parts = [name + '=' + encodeURIComponent(value), 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Secure'];
  if (o.maxAge) parts.push('Max-Age=' + o.maxAge);
  const prev = res.getHeader('Set-Cookie');
  const line = parts.join('; ');
  res.setHeader('Set-Cookie', prev ? (Array.isArray(prev) ? prev.concat(line) : [prev, line]) : line);
}
function clearCookie(res, name) { setCookie(res, name, '', { maxAge: 0 }); }

/* ---------------- passwords (scrypt) ---------------- */
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };
function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(String(password), salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p, maxmem: 64 * 1024 * 1024 });
  return ['scrypt', SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString('base64'), hash.toString('base64')].join('$');
}
function verifyPassword(password, stored) {
  try {
    const [alg, N, r, p, salt, hash] = String(stored).split('$');
    if (alg !== 'scrypt') return false;
    const candidate = crypto.scryptSync(String(password), Buffer.from(salt, 'base64'), Buffer.from(hash, 'base64').length, { N: +N, r: +r, p: +p, maxmem: 64 * 1024 * 1024 });
    return crypto.timingSafeEqual(candidate, Buffer.from(hash, 'base64'));
  } catch { return false; }
}
function passwordIssues(password) {
  const pw = String(password || '');
  const issues = [];
  if (pw.length < 12) issues.push('At least 12 characters');
  if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw)) issues.push('Upper and lower case letters');
  if (!/\d/.test(pw)) issues.push('At least one number');
  if (!/[^A-Za-z0-9]/.test(pw)) issues.push('At least one symbol');
  return issues;
}

/* ---------------- TOTP (RFC 6238, SHA-1, 6 digits, 30s) ---------------- */
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function totpSecret() { let s = ''; for (let i = 0; i < 32; i++) s += B32[crypto.randomBytes(1)[0] % 32]; return s; }
function base32Decode(s) {
  let bits = '';
  String(s).toUpperCase().replace(/=+$/, '').split('').forEach((c) => {
    const v = B32.indexOf(c); if (v < 0) throw new Error('bad secret');
    bits += v.toString(2).padStart(5, '0');
  });
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(bytes);
}
function totpCode(secret, step) {
  const counter = BigInt(step == null ? Math.floor(Date.now() / 30000) : step);
  const buf = Buffer.alloc(8); buf.writeBigUInt64BE(counter);
  const hmac = crypto.createHmac('sha1', base32Decode(secret)).update(buf).digest();
  const off = hmac[19] & 0xf;
  const val = ((hmac[off] & 0x7f) << 24 | hmac[off + 1] << 16 | hmac[off + 2] << 8 | hmac[off + 3]) % 1000000;
  return String(val).padStart(6, '0');
}
function totpVerify(secret, code) {
  const step = Math.floor(Date.now() / 30000);
  for (let d = -1; d <= 1; d++) if (constantTimeEqual(totpCode(secret, step + d), String(code))) return true;
  return false;
}

/* ---------------- rate limiting (in-memory per instance + persisted failures) ---------------- */
const rl = new Map();
function rateLimit(key, max, windowMs) {
  const now = Date.now();
  const e = rl.get(key);
  if (!e || now > e.resetAt) { rl.set(key, { count: 1, resetAt: now + windowMs }); return true; }
  if (e.count >= max) return false;
  e.count++; return true;
}

/* ---------------- HTML sanitization (server-side, tag allowlist) ---------------- */
const ALLOW_TAGS = new Set(['p', 'br', 'b', 'i', 'em', 'strong', 'u', 'a', 'h2', 'h3', 'h4', 'h5', 'ul', 'ol', 'li', 'span', 'div', 'section', 'article', 'figure', 'figcaption', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote', 'address']);
const ALLOW_ATTR = { a: ['href', 'target', 'rel', 'title'], img: ['src', 'alt', 'width', 'height', 'loading', 'decoding', 'class'], div: ['class'], section: ['class'], span: ['class'], article: ['class', 'id'], p: ['class'], h2: ['class'], h3: ['class'], h4: ['class'], th: ['scope', 'class'], td: ['class'], figure: ['class', 'id'], figcaption: ['class'], ul: ['class'], li: ['class'], table: ['class'], blockquote: ['class'], address: ['class'], ol: ['class'] };
function safeUrl(u) {
  const s = String(u || '').trim();
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(s) && !/javascript:/i.test(s)) return s;
  return '#';
}
function sanitizeHtml(html) {
  const src = String(html || '');
  let out = '';
  let i = 0;
  while (i < src.length) {
    const lt = src.indexOf('<', i);
    if (lt < 0) { out += escapeText(src.slice(i)); break; }
    out += escapeText(src.slice(i, lt));
    const gt = src.indexOf('>', lt);
    if (gt < 0) { out += escapeText(src.slice(lt)); break; }
    let tag = src.slice(lt + 1, gt).trim();
    i = gt + 1;
    if (tag[0] === '!') continue; // comments/doctypes dropped
    const closing = tag[0] === '/';
    if (closing) tag = tag.slice(1);
    if (tag.endsWith('/')) tag = tag.slice(0, -1);
    const name = (tag.match(/^[a-zA-Z0-9-]+/) || [''])[0].toLowerCase();
    if (!name) continue;
    if (!ALLOW_TAGS.has(name)) continue; // unknown tags dropped (content kept)
    if (closing) { out += '</' + name + '>'; continue; }
    const attrs = [];
    const re = /([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
    let m; const attrTag = tag.slice(name.length);
    while ((m = re.exec(attrTag))) {
      const key = m[1].toLowerCase();
      const val = m[3] != null ? m[3] : m[4] || '';
      if ((ALLOW_ATTR[name] || []).includes(key)) {
        if (key === 'href') attrs.push('href="' + safeUrl(val).replace(/"/g, '') + '"');
        else if (key === 'src') attrs.push(/^(https?:|\/|data:image\/)/i.test(val) && !/javascript:/i.test(val) ? 'src="' + val.replace(/"/g, '') + '"' : 'src=""');
        else attrs.push(key + '="' + val.replace(/"/g, '') + '"');
      }
    }
    if (name === 'a' && attrs.some((a) => a.startsWith('target='))) attrs.push('rel="noopener"');
    out += '<' + name + (attrs.length ? ' ' + attrs.join(' ') : '') + '>';
  }
  return out;
}
function escapeText(s) { return String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

/* ---------------- validation helpers ---------------- */
const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function colorOr(value, fallback) { return HEX.test(String(value || '')) ? String(value) : fallback; }

module.exports = {
  PREFIX, nowIso, id, clean, constantTimeEqual, clientIp, parseCookies, setCookie, clearCookie,
  readDoc, writeDoc, deleteDoc, listDocs, readBlobRaw, readBlobBuffer, writeBinary, head,
  hashPassword, verifyPassword, passwordIssues, totpSecret, totpCode, totpVerify,
  rateLimit, sanitizeHtml, safeUrl, colorOr
};
