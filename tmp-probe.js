'use strict';
const BASE = 'https://www.breastenlargementclinic.co.in';
(async () => {
  for (const u of [BASE + '/api/qh/content?page=/', BASE + '/api/qh/content/?page=/']) {
    try {
      const r = await fetch(u, { redirect: 'manual' });
      console.log(r.status, u, 'loc:', r.headers.get('location'));
      if (r.status === 200) { const j = await r.json(); console.log('   slug=' + j.slug, 'site:' + !!j.site, 'overlay:' + (j.overlay ? 'yes' : 'null')); }
      else { const t = await r.text().catch(() => ''); console.log('   body:', t.slice(0, 120)); }
    } catch (e) { console.log('ERR', u, e.message); }
  }
  // does the long-standing form endpoint work at trailing-slash and non-slash?
  for (const u of [BASE + '/api/contact', BASE + '/api/contact/']) {
    const r = await fetch(u, { method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/json' }, body: '{}' });
    console.log('contact', r.status, u, 'loc:', r.headers.get('location'));
  }
})();

