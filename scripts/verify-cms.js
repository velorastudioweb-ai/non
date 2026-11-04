'use strict';
/* End-to-end CMS verification against a running dev server (or deployment).
 * Usage: node scripts/verify-cms.js [base-url] [password]
 * Defaults: http://localhost:8123, env QH_VERIFY_PW */
const BASE = (process.argv[2] || 'http://localhost:8123').replace(/\/+$/, '');
const PW = process.argv[3] || process.env.QH_VERIFY_PW || '';
let cookie = '';
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if (cond) { pass++; console.log('PASS | ' + name); } else { fail++; console.log('FAIL | ' + name + (extra ? ' | ' + extra : '')); } };

async function call(action, payload) {
  const res = await fetch(BASE + '/api/qh/admin', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-qh-request': '1', ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(Object.assign({ action }, payload))
  });
  const set = res.headers.get('set-cookie');
  if (set) cookie = set.split(';')[0];
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

(async function main() {
  console.log('Verifying CMS at ' + BASE);

  const pub0 = await fetch(BASE + '/api/qh/content?page=/');
  const doc0 = await pub0.json().catch(() => ({}));
  ok('public content endpoint responds', pub0.status === 200, 'status ' + pub0.status);
  ok('site settings seeded', !!(doc0.site && doc0.site.contacts && doc0.site.locations && doc0.site.locations.length >= 4), 'locations: ' + (doc0.site && doc0.site.locations && doc0.site.locations.length));
  ok('whatsapp numbers present', JSON.stringify(doc0.site).includes('85244608658'));

  ok('unauthenticated admin call rejected', (await call('page.get', { slug: 'home' })).status === 401);
  ok('bad password rejected', (await call('login', { email: 'rjagadeeswara66@gmail.com', password: 'wrong-password-1' })).status === 401);

  const login = await call('login', { email: 'rjagadeeswara66@gmail.com', password: PW });
  ok('admin login succeeds', login.status === 200 && login.json.ok, JSON.stringify(login.json));
  if (!(login.status === 200 && login.json.ok)) process.exit(1);

  const me = await call('me');
  ok('session active', me.json.signedIn === true);

  /* page workflow: draft -> publish -> live overlay -> revision -> restore -> unpublish */
  await call('page.discardDraft', { slug: 'home' });
  await call('page.unpublish', { slug: 'home' });
  let g = await call('page.get', { slug: 'home' });
  const doc = g.json.published || { seo: null, sections: {}, order: null, added: [] };
  doc.sections = doc.sections || {};
  doc.sections.s1 = Object.assign({}, doc.sections.s1 || {});
  doc.sections.s1.fields = Object.assign({}, doc.sections.s1.fields || {}, { f1: { text: 'EDITED BY CMS QA' } });
  ok('draft saved', (await call('page.saveDraft', { slug: 'home', doc })).status === 200);
  const dr = await fetch(BASE + '/api/qh/content?page=/&draft=1', { headers: { cookie } });
  const drj = await dr.json().catch(() => ({}));
  ok('authenticated draft preview served', drj.draft === true && !!(drj.overlay && drj.overlay.sections.s1), JSON.stringify(drj).slice(0, 120));
  const drAnon = await (await fetch(BASE + '/api/qh/content?page=/&draft=1')).json().catch(() => ({}));
  ok('draft not exposed without session', !drAnon.draft);
  ok('publish succeeds', (await call('page.publish', { slug: 'home' })).status === 200);
  const live = await (await fetch(BASE + '/api/qh/content?page=/')).json();
  ok('published overlay served publicly', !!(live.overlay && live.overlay.sections && live.overlay.sections.s1));
  doc.sections.s1.fields.f2 = { text: 'second publish marker' };
  await call('page.saveDraft', { slug: 'home', doc });
  await call('page.publish', { slug: 'home' });
  const revs = await (await call('page.revisions', { slug: 'home' })).json;
  ok('revision recorded on re-publish', revs.list.length >= 1);
  ok('revision restore works', (await call('page.restore', { slug: 'home', rev: revs.list[0].rev })).status === 200);
  await call('page.unpublish', { slug: 'home' });
  const gone = await (await fetch(BASE + '/api/qh/content?page=/')).json();
  ok('unpublish restores base content', !gone.overlay);
  await call('page.discardDraft', { slug: 'home' });

  /* doctors */
  const docs = await (await call('doctors.get')).json;
  ok('doctors seeded (Vikas Singh included)', docs.list.length >= 8 && docs.list.some((d) => /Vikas Singh/.test(d.name)));
  const dp = await call('doctors.save', { list: docs.list, publish: true });
  ok('doctors publish to /meet-doctors/', dp.status === 200 && dp.json.list.length >= 8, JSON.stringify(dp.json).slice(0, 140));
  const md = await (await fetch(BASE + '/api/qh/content?page=/meet-doctors/')).json();
  ok('meet-doctors grid overlay live', !!(md.overlay && md.overlay.doctorsGrid && /Vikas Singh/.test(md.overlay.doctorsGrid.html)));

  /* site */
  const site = await (await call('site.get')).json;
  site.theme.colors.navGold = '#D4AF37';
  ok('site settings save', (await call('site.save', site)).status === 200);

  /* media */
  const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const up = await call('media.upload', { name: 'qa.png', dataUrl: 'data:image/png;base64,' + png, alt: 'QA pixel' });
  ok('media upload', up.status === 200 && !!up.json.url, JSON.stringify(up.json).slice(0, 140));
  if (up.json && up.json.url) {
    const served = await fetch(BASE + up.json.url);
    ok('media served through site origin (CSP-safe)', served.status === 200 && (served.headers.get('content-type') || '').includes('image'));
    await call('media.delete', { id: up.json.asset.id, force: true });
    const goneImg = await fetch(BASE + up.json.url);
    ok('media delete removes file', goneImg.status === 404);
  }

  /* enquiries via admin + via public form */
  const en = await call('enquiries.create', { enquiry: { name: 'QA Test Enquiry', email: 'qa@example.org', countryCode: '+91', phone: '9876543210', preferredCountry: 'India', preferredBranch: 'la-crown', preferredBranchLabel: 'Bengaluru La Crown', topic: 'General breast-enlargement information', preferredDate: new Date().toISOString().slice(0, 10), preferredTime: 'Any time', message: 'automated verification', consent: true } });
  ok('enquiry stored via CMS', en.status === 200);
  const el = await (await call('enquiries.list')).json;
  const mine = el.items.find((x) => x.name === 'QA Test Enquiry');
  ok('enquiries listed in admin', !!mine);
  if (mine) await call('enquiries.delete', { key: 'enquiries/' + mine.receivedAt.slice(0, 10) + '-' + mine.id + '.json' });

  const form = await fetch(BASE + '/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Form Test', email: 'form@example.org', country_code: '+91', phone: '9876543210', preferred_country: 'India', preferred_branch: 'la-crown', topic: 'General breast-enlargement information', preferred_date: new Date().toISOString().slice(0, 10), preferred_time: 'Any time', message: 'form verification', consent: true })
  });
  const fj = await form.json().catch(() => ({}));
  const el2 = await (await call('enquiries.list')).json;
  const ft = el2.items.find((x) => x.name === 'Form Test');
  ok('website form enquiries reach admin panel', !!ft, JSON.stringify(fj));
  if (ft) await call('enquiries.delete', { key: 'enquiries/' + ft.receivedAt.slice(0, 10) + '-' + ft.id + '.json' });

  /* security + sanitization */
  const noHdr = await fetch(BASE + '/api/qh/admin', { method: 'POST', headers: { 'content-type': 'application/json', cookie }, body: '{"action":"pages.list"}' });
  ok('CSRF header enforced on mutations', noHdr.status === 403);
  const evil = await call('page.saveDraft', { slug: 'home', doc: { sections: { s1: { fields: { f1: { html: '<img src=x onerror=alert(1)><script>bad()</script><a href="javascript:bad()">x</a><strong>kept</strong>' } } } } } });
  const saved = await (await call('page.get', { slug: 'home' })).json;
  const html = JSON.stringify(saved.draft);
  ok('injection stripped on save', evil.status === 200 && !/onerror/i.test(html) && !/<script/i.test(html) && !/javascript:/i.test(html) && /strong/i.test(html));
  await call('page.discardDraft', { slug: 'home' });

  /* audit, placeholders, stats */
  const ph = await (await call('placeholders.scan')).json;
  ok('placeholder scan returns findings list', Array.isArray(ph.findings));
  const al = await (await call('audit.list')).json;
  ok('audit log records changes', al.entries.length > 3);
  const st = await (await call('dashboard.stats')).json;
  ok('dashboard stats computed', st.doctors >= 8 && st.branches >= 4);

  console.log('\nRESULT: ' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 2 : 0);
})().catch((e) => { console.error('FATAL', e && e.message ? e.message : e); process.exit(1); });
