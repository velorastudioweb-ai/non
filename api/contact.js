'use strict';

/*
 * Appointment-enquiry delivery endpoint.
 *
 * The website is published as static HTML plus this single serverless function.
 * Delivery is intentionally honest: if the deployment has no mail credentials,
 * the endpoint returns 503 and the visitor is told the enquiry was not sent and
 * given the published mailbox as a fallback. It never reports a false success.
 *
 * Required environment variables for live delivery:
 *   RESEND_API_KEY       API key for Resend
 * Optional:
 *   CONTACT_TO_EMAIL     Inbox that receives enquiries (defaults to the published mailbox)
 *   CONTACT_FROM_EMAIL   Verified sender, e.g. "Website <enquiries@example.org>"
 *   KV_REST_API_URL      Upstash/Vercel KV REST URL for secure enquiry storage
 *   KV_REST_API_TOKEN    Upstash/Vercel KV REST token
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are also accepted.
 */

const crypto = require('crypto');

const TOPICS = [
  'General breast-enlargement information',
  'Surgical breast enlargement',
  'Breast implants',
  'Fat transfer breast augmentation',
  'Non-surgical breast enhancement',
  'Breast fillers',
  'PRP and regenerative treatments',
  'Thread procedures',
  'Biostimulators and Sculptra',
  'Safety, risks or recovery',
  'Second opinion or choosing a surgeon',
  'Other / not sure'
];
const COUNTRIES = ['Hong Kong', 'India', 'United Arab Emirates', 'Other / not sure'];
const BRANCHES = ['hong-kong', 'la-crown', 'ritz', 'dubai', 'no-preference'];
const TIME_WINDOWS = ['Morning (10:00–13:00)', 'Afternoon (14:00–17:00)', 'Evening (17:00–19:00)', 'Any time'];
const CONTACT_METHODS = ['Phone', 'Email'];
const INTERESTS = TOPICS; // Backwards-compatible alias for older callers/tests.
const FALLBACK_EMAIL = 'drvikas090909@gmail.com';
const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitState = new Map();

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(payload));
}

function clean(value, max) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, max);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body !== undefined && req.body !== null) {
      if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return resolve(req.body);
      return resolve(String(req.body));
    }
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Payload too large'), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parseBody(raw, contentType) {
  if (raw && typeof raw === 'object') return raw;
  const text = String(raw || '').trim();
  if (!text) return {};
  if (/application\/x-www-form-urlencoded/i.test(contentType || '')) {
    return Object.fromEntries(new URLSearchParams(text));
  }
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function branchLabel(value) {
  const labels = {
    'hong-kong': 'Hong Kong — Head Office',
    'la-crown': 'Bengaluru — La Crown, Jayanagar',
    ritz: 'Bengaluru — Ritz',
    dubai: 'Dubai — Badr Al Samaa Medical Center',
    'no-preference': 'No preference — advise me'
  };
  return labels[value] || value;
}

function isFutureOrToday(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const today = new Date();
  const todayUtc = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const parts = value.split('-').map(Number);
  const dateUtc = Date.UTC(parts[0], parts[1] - 1, parts[2]);
  return dateUtc >= todayUtc;
}

function validate(input) {
  const data = input || {};
  const name = clean(data.name, 120);
  const email = clean(data.email, 254).toLowerCase();
  const countryCode = clean(data.country_code, 8);
  const phoneRaw = clean(data.phone, 30);
  const preferredCountry = clean(data.preferred_country || data.preferredCountry, 80);
  const preferredBranch = clean(data.preferred_branch || data.preferredBranch, 80);
  const topic = clean(data.topic || data.interest, 160);
  const preferredDate = clean(data.preferred_date || data.preferredDate, 20);
  const preferredTime = clean(data.preferred_time || data.preferredTime, 80);
  const message = clean(data.message, 4000);
  const consent = data.consent === true || data.consent === 'true' || data.consent === 'on' || data.consent === '1';

  const errors = {};
  if (name.length < 2) errors.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
  if (!/^\+\d{1,4}$/.test(countryCode)) errors.country_code = 'Please choose your country calling code.';
  const phoneDigits = phoneRaw.replace(/[^\d]/g, '');
  const fullDigits = (countryCode + phoneRaw).replace(/[^\d]/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15 || fullDigits.length > 15) {
    errors.phone = 'Please enter a valid mobile number for the selected country code.';
  }
  if (!COUNTRIES.includes(preferredCountry)) errors.preferred_country = 'Please choose your preferred country.';
  if (!BRANCHES.includes(preferredBranch)) errors.preferred_branch = 'Please choose your preferred branch.';
  if (!TOPICS.includes(topic)) errors.topic = 'Please choose a treatment or consultation topic.';
  if (!isFutureOrToday(preferredDate)) errors.preferred_date = 'Please choose a preferred date from today onwards.';
  if (!TIME_WINDOWS.includes(preferredTime)) errors.preferred_time = 'Please choose a preferred time.';
  if (!consent) errors.consent = 'Please confirm you agree to be contacted.';

  return {
    errors,
    value: {
      name, email, countryCode, phone: phoneRaw, preferredCountry, preferredBranch, topic,
      preferredDate, preferredTime, message, consent
    }
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function storageConfig(env) {
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/+$/, ''), token };
}

async function storeEnquiry(value, env) {
  const config = storageConfig(env);
  if (!config) return { code: 'storage_unconfigured' };

  const id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + '-' + Math.random().toString(36).slice(2));
  const receivedAt = new Date().toISOString();
  const record = {
    id,
    receivedAt,
    name: value.name,
    email: value.email,
    countryCode: value.countryCode,
    phone: value.phone,
    preferredCountry: value.preferredCountry,
    preferredBranch: value.preferredBranch,
    preferredBranchLabel: branchLabel(value.preferredBranch),
    topic: value.topic,
    preferredDate: value.preferredDate,
    preferredTime: value.preferredTime,
    message: value.message,
    consent: value.consent
  };
  const key = 'appointment-enquiry:' + receivedAt.slice(0, 10) + ':' + id;

  let response;
  try {
    response = await fetch(config.url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + config.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['SET', key, JSON.stringify(record), 'EX', 60 * 60 * 24 * 365])
    });
  } catch {
    return { code: 'storage_failed' };
  }
  if (!response.ok) return { code: 'storage_failed' };
  return { code: 'stored', id, key };
}

async function deleteEnquiry(key, env) {
  const config = storageConfig(env);
  if (!config || !key) return;
  try {
    await fetch(config.url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + config.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(['DEL', key])
    });
  } catch {
    // Best-effort cleanup only.
  }
}

async function deliver(value, env) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return { code: 'delivery_unconfigured' };

  const to = env.CONTACT_TO_EMAIL || FALLBACK_EMAIL;
  const from = env.CONTACT_FROM_EMAIL || 'Quantum Health Website <onboarding@resend.dev>';
  const subject = 'Appointment enquiry — ' + value.topic + ' — ' + branchLabel(value.preferredBranch);
  const text = [
    'New appointment enquiry',
    '',
    'Patient name: ' + value.name,
    'Email: ' + value.email,
    'Phone: ' + value.countryCode + ' ' + value.phone,
    'Preferred country: ' + value.preferredCountry,
    'Preferred branch: ' + branchLabel(value.preferredBranch),
    'Topic: ' + value.topic,
    'Preferred date: ' + value.preferredDate,
    'Preferred time: ' + value.preferredTime,
    '',
    'Additional message:',
    value.message || '(no additional message provided)',
    '',
    'Privacy consent: ' + (value.consent ? 'Yes' : 'No')
  ].join('\n');

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: value.email,
        subject,
        text,
        html: '<h1>New appointment enquiry</h1>' +
          '<p><strong>Patient name:</strong> ' + escapeHtml(value.name) + '</p>' +
          '<p><strong>Email:</strong> ' + escapeHtml(value.email) + '</p>' +
          '<p><strong>Phone:</strong> ' + escapeHtml(value.countryCode + ' ' + value.phone) + '</p>' +
          '<p><strong>Preferred country:</strong> ' + escapeHtml(value.preferredCountry) + '</p>' +
          '<p><strong>Preferred branch:</strong> ' + escapeHtml(branchLabel(value.preferredBranch)) + '</p>' +
          '<p><strong>Topic:</strong> ' + escapeHtml(value.topic) + '</p>' +
          '<p><strong>Preferred date:</strong> ' + escapeHtml(value.preferredDate) + '</p>' +
          '<p><strong>Preferred time:</strong> ' + escapeHtml(value.preferredTime) + '</p>' +
          '<p><strong>Additional message:</strong></p><p>' + escapeHtml(value.message || '(no additional message provided)') + '</p>'
      })
    });
  } catch {
    return { code: 'delivery_failed' };
  }
  if (!response.ok) return { code: 'delivery_failed' };
  return { code: 'sent' };
}

function clientIp(req) {
  const forwarded = req.headers && (req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For']);
  if (forwarded) return String(forwarded).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function rateLimit(req) {
  if (process.env.DISABLE_RATE_LIMIT === '1') return true;
  const now = Date.now();
  const ip = clientIp(req);
  const entry = rateLimitState.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitState.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return false;
  return true;
}

function originAllowed(req) {
  const origin = req.headers && (req.headers.origin || req.headers.Origin);
  if (!origin) return true;
  try {
    const url = new URL(origin);
    const host = req.headers.host || req.headers.Host;
    return host ? url.host === host : true;
  } catch {
    return false;
  }
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, code: 'method_not_allowed', message: 'Use POST to submit this form.' });
  }

  if (!originAllowed(req)) {
    return json(res, 403, { ok: false, code: 'forbidden', message: 'This form cannot be submitted from this origin.' });
  }

  if (!rateLimit(req)) {
    return json(res, 429, { ok: false, code: 'rate_limited', message: 'Too many enquiries from this connection. Please try again later or email ' + FALLBACK_EMAIL + '.' });
  }

  let body;
  try {
    const raw = await readBody(req);
    body = parseBody(raw, req.headers && (req.headers['content-type'] || req.headers['Content-Type']));
  } catch (error) {
    return json(res, error.status || 400, { ok: false, code: 'invalid_request', message: 'The request could not be read.' });
  }
  if (!body || typeof body !== 'object') {
    return json(res, 400, { ok: false, code: 'invalid_request', message: 'The request could not be read.' });
  }

  // Honeypot: acknowledge silently so automated submissions do not retry.
  if (clean(body.company_website, 200)) return json(res, 200, { ok: true });

  const { errors, value } = validate(body);
  if (Object.keys(errors).length) {
    return json(res, 422, {
      ok: false,
      code: 'validation_failed',
      message: 'Please correct the highlighted fields and try again.',
      errors
    });
  }

  const storage = storageConfig(process.env);
  let storageResult = { code: storage ? 'pending' : 'storage_unconfigured' };
  let storedKey = null;

  if (storage) {
    storageResult = await storeEnquiry(value, process.env);
    if (storageResult.code !== 'stored') {
      return json(res, 502, {
        ok: false,
        code: 'storage_failed',
        message: 'We could not store your enquiry securely. Please try again or email ' + FALLBACK_EMAIL + '.'
      });
    }
    storedKey = storageResult.key;
  }

  const result = await deliver(value, process.env);
  if (result.code === 'sent') {
    return json(res, 200, {
      ok: true,
      storage: storageResult.code === 'stored' ? 'stored' : 'email_only'
    });
  }

  if (storedKey) await deleteEnquiry(storedKey, process.env);

  if (result.code === 'delivery_unconfigured') {
    return json(res, 503, {
      ok: false,
      code: 'delivery_unconfigured',
      message: 'Email delivery is not configured on this deployment, so your enquiry was not sent. Please email ' + FALLBACK_EMAIL + ' instead.'
    });
  }
  return json(res, 502, {
    ok: false,
    code: 'delivery_failed',
    message: 'We could not send your enquiry right now. Please try again or email ' + FALLBACK_EMAIL + '.'
  });
}

module.exports = handler;
module.exports.handler = handler;
module.exports._validate = validate;
module.exports.FALLBACK_EMAIL = FALLBACK_EMAIL;