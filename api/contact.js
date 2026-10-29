'use strict';

/*
 * Contact-form delivery endpoint.
 *
 * The website is published as static HTML plus this single serverless function.
 * Delivery is intentionally honest: if the deployment has no mail credentials,
 * the endpoint returns 503 and the visitor is told the message was not sent and
 * given the published mailbox as a fallback. It never reports a false success.
 *
 * Required environment variables for live delivery:
 *   RESEND_API_KEY       API key for Resend (or a compatible provider is not used)
 * Optional:
 *   CONTACT_TO_EMAIL     Inbox that receives enquiries
 *   CONTACT_FROM_EMAIL   Verified sender, e.g. "Website <enquiries@example.org>"
 */

const INTERESTS = [
  'General breast-enlargement information',
  'Surgical options',
  'Non-surgical options',
  'Evidence and research',
  'Safety and risks',
  'Content correction',
  'Source or reference suggestion',
  'General question about this website',
  'Other'
];
const CONTACT_METHODS = ['Phone', 'Email'];
const FALLBACK_EMAIL = 'enquiries@nonsurgicalbreastenlargement.in';
const MAX_BODY_BYTES = 32 * 1024;

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

function validate(input) {
  const data = input || {};
  const name = clean(data.name, 120);
  const email = clean(data.email, 254).toLowerCase();
  const countryCode = clean(data.country_code, 8);
  const phoneRaw = clean(data.phone, 30);
  const interest = clean(data.interest, 120);
  const contactMethod = clean(data.contact_method, 20);
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
  if (!INTERESTS.includes(interest)) errors.interest = 'Please choose an area of interest.';
  if (!CONTACT_METHODS.includes(contactMethod)) errors.contact_method = 'Please choose a preferred contact method.';
  if (!consent) errors.consent = 'Please confirm you agree to be contacted.';

  return {
    errors,
    value: { name, email, countryCode, phone: phoneRaw, interest, contactMethod, message, consent }
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

async function deliver(value, env) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return { code: 'delivery_unconfigured' };

  const to = env.CONTACT_TO_EMAIL || FALLBACK_EMAIL;
  const from = env.CONTACT_FROM_EMAIL || 'Quantum Health Website <onboarding@resend.dev>';
  const text = [
    'New website enquiry',
    '',
    'Name: ' + value.name,
    'Email: ' + value.email,
    'Phone: ' + value.countryCode + ' ' + value.phone,
    'Preferred contact: ' + value.contactMethod,
    'Area of interest: ' + value.interest,
    '',
    'Message:',
    value.message || '(no message provided)'
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
        subject: 'Website enquiry — ' + value.interest,
        text,
        html: '<h1>New website enquiry</h1><p><strong>Name:</strong> ' + escapeHtml(value.name) + '</p>' +
          '<p><strong>Email:</strong> ' + escapeHtml(value.email) + '</p>' +
          '<p><strong>Phone:</strong> ' + escapeHtml(value.countryCode + ' ' + value.phone) + '</p>' +
          '<p><strong>Preferred contact:</strong> ' + escapeHtml(value.contactMethod) + '</p>' +
          '<p><strong>Area of interest:</strong> ' + escapeHtml(value.interest) + '</p>' +
          '<p><strong>Message:</strong></p><p>' + escapeHtml(value.message || '(no message provided)') + '</p>'
      })
    });
  } catch {
    return { code: 'delivery_failed' };
  }
  if (!response.ok) return { code: 'delivery_failed' };
  return { code: 'sent' };
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, code: 'method_not_allowed', message: 'Use POST to submit this form.' });
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

  const result = await deliver(value, process.env);
  if (result.code === 'sent') return json(res, 200, { ok: true });

  if (result.code === 'delivery_unconfigured') {
    return json(res, 503, {
      ok: false,
      code: 'delivery_unconfigured',
      message: 'Email delivery is not configured on this deployment, so your message was not sent. Please email ' + FALLBACK_EMAIL + ' instead.'
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
