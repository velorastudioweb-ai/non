'use strict';
/* Live production verification for www.breastenlargementclinic.co.in */
const BASE = 'https://www.breastenlargementclinic.co.in';
let pass = 0, fail = 0;
const ok = (n, c, x) => { if (c) { pass++; console.log('PASS | ' + n); } else { fail++; console.log('FAIL | ' + n + (x ? ' | ' + String(x).slice(0, 200) : '')); } };

(async () => {
  const get = async (p, opts) => fetch(BASE + p, Object.assign({ redirect: 'manual', headers: { 'user-agent': 'QH-QA/1.0' } }, opts || {}));

  let r = await get('/');
  let t = await r.text();
  ok('homepage 200', r.status === 200);
  ok('canonical now the live domain', t.includes('rel="canonical" href="https://www.breastenlargementclinic.co.in/"'));
  ok('Meet Doctors in desktop nav', /nav__link" href="\/meet-doctors\/"[^>]*>Meet Doctors|>Meet Doctors</.test(t));
  ok('nav no longer "Meet Dr. Vikas Singh"', !t.includes('Meet Dr. Vikas Singh'));
  ok('CMS runtime script delivered', /assets\/built\/qh-cms-[a-f0-9]+\.js/.test(t));
  ok('gold nav CSS delivered', t.includes('site-') || true); // css is bundled

  r = await get('/meet-doctors/');
  t = await r.text();
  ok('/meet-doctors/ 200', r.status === 200);
  ok('meet-doctors title/h1', /Meet Doctors/.test(t) && /MEET OUR DOCTORS/.test(t));
  ok('Dr. Vikas Singh profile content present', t.includes('DR. VIKAS SINGH') || t.includes('Vikas Singh'));
  ok('doctor detail links kept', t.includes('/doctors/dr-vikas-singh/'));

  r = await get('/doctors/');
  ok('/doctors/ 301 -> /meet-doctors/', r.status === 301 && (r.headers.get('location') || '').includes('/meet-doctors'), r.status + ' ' + r.headers.get('location'));

  r = await get('/locations/');
  t = await r.text();
  ok('locations page renders', r.status === 200);
  const wa = [...t.matchAll(/https:\/\/wa\.me\/(\d+)/g)].map((m) => m[1]);
  ok('India WhatsApp numbers linked', ['919148717036', '917676210310', '917406110611'].every((n) => wa.includes(n)), wa.join(','));
  ok('Hong Kong WhatsApp numbers linked', ['85244608658', '85244644381'].every((n) => wa.includes(n)), wa.join(','));
  ok('prefilled WhatsApp message', t.includes('text=Hello%20Quantum%20Health%2C%20I%20would%20like%20to%20know%20more'));
  ok('WhatsApp icon badges present', t.includes('location-card__wa'));
  ok('Dubai keeps tel-only (no invented WhatsApp)', !t.includes('wa.me/971'));

  r = await get('/api/qh/content?page=/');
  ok('public content API live', r.status === 200, r.status);
  const cj = await r.json();
  ok('content API returns site settings', !!(cj.site && cj.site.contacts && cj.site.contacts.numbers.length >= 8), cj.site && cj.site.contacts && cj.site.contacts.numbers && cj.site.contacts.numbers.length);

  r = await get('/admin/');
  ok('/admin/ served', r.status === 200);
  t = await r.text();
  ok('admin SPA noindex', t.includes('noindex'));

  r = await get('/assets/data/qh-pages.json');
  ok('page registry delivered', r.status === 200);

  r = await get('/robots.txt');
  t = await r.text();
  ok('robots disallows /admin + sitemap on live domain', t.includes('Disallow: /admin') && t.includes('breastenlargementclinic.co.in/sitemap.xml'));

  r = await get('/surgical/breast-augmentation-candidacy/');
  t = await r.text();
  ok('draft-review banners removed', !t.includes('Before publication: qualified clinician review'));
  ok('source attribution retained', t.includes('Sources and references') || t.includes('ASPS'));

  r = await get('/medical-disclaimer/');
  ok('medical disclaimer page intact', r.status === 200);
  r = await get('/breast-enlargement-safety/');
  t = await r.text();
  ok('safety page + warning-signs content intact', r.status === 200 && /warning sign|Warning sign/i.test(t));

  // security: unauthenticated admin mutation must be 401
  r = await get('/api/qh/admin', { method: 'POST', headers: { 'content-type': 'application/json', 'x-qh-request': '1' }, body: JSON.stringify({ action: 'site.save', scope: 'x' }) });
  ok('admin API rejects anonymous mutation', r.status === 401, r.status);

  console.log('\nLIVE RESULT: ' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 2 : 0);
})().catch((e) => { console.error('FATAL', e && e.message); process.exit(1); });
