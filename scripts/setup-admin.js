'use strict';
/* Secure one-time administrator setup.
 * Usage (from the project root, with the deployment's BLOB_READ_WRITE_TOKEN in
 * .env.local or the environment):
 *   node scripts/setup-admin.js            create the super administrator
 *   node scripts/setup-admin.js --reset    reset the password (revokes sessions)
 *
 * The password is never stored in code, git or environment variables: only a
 * scrypt hash is written to the private CMS store. Run in a private terminal. */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load .env.local if present (created by `vercel link` / blob provisioning).
const envFile = path.join(__dirname, '..', '.env.local');
if (!process.env.BLOB_READ_WRITE_TOKEN && fs.existsSync(envFile)) {
  fs.readFileSync(envFile, 'utf8').split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  });
}

const L = require('../api/_qh/lib');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

(async function main() {
  const reset = process.argv.includes('--reset');
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN is required (see .env.local from `vercel link`).');
    process.exit(1);
  }
  const existing = await L.readDoc('credentials.json', null);
  const envEmail = process.env.QH_ADMIN_EMAIL;
  const envPw = process.env.QH_ADMIN_PASSWORD;
  const email = (envEmail || (await ask('Admin email [' + (existing ? existing.email : 'rjagadeeswara66@gmail.com') + ']: '))).trim().toLowerCase()
    || (existing && existing.email) || 'rjagadeeswara66@gmail.com';
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) { console.error('Invalid email.'); process.exit(1); }
  let pw1, pw2;
  if (envPw) { pw1 = envPw; pw2 = envPw; }
  else {
    pw1 = await ask('Password (12+ chars, upper+lower case, number, symbol): ');
    const issues = L.passwordIssues(pw1);
    if (issues.length) { console.error('Password rejected - needs: ' + issues.join('; ')); process.exit(1); }
    pw2 = await ask('Repeat password: ');
  }
  const issues = L.passwordIssues(pw1);
  if (issues.length) { console.error('Password rejected - needs: ' + issues.join('; ')); process.exit(1); }
  if (pw1 !== pw2) { console.error('Passwords did not match.'); process.exit(1); }

  const doc = {
    email,
    hash: L.hashPassword(pw1),
    createdAt: existing && !reset ? existing.createdAt : L.nowIso(),
    updatedAt: L.nowIso(),
    failed: 0
  };
  if (existing && existing.totpSecret) doc.totpSecret = existing.totpSecret;
  await L.writeDoc('credentials.json', doc);

  if (reset) {
    const sessions = await L.listDocs('sessions/');
    for (const s of sessions) { try { await L.deleteDoc(s.pathname.slice(L.PREFIX.length)); } catch (e) {} }
    console.log('Password reset. All existing admin sessions were revoked.');
  } else {
    console.log('Super administrator configured. Sign in at /admin — the password exists only as a scrypt hash in the CMS store.');
  }
  rl.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
