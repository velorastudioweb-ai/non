'use strict';
/* Reset any QA edits so production starts from clean base content. */
const BASE = process.env.QH_API || 'http://localhost:8123';
const PW = process.env.QH_VERIFY_PW || '';
(async () => {
  let cookie = '';
  const call = async (action, payload) => {
    const r = await fetch(BASE + '/api/qh/admin/', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-qh-request': '1', ...(cookie ? { cookie } : {}) },
      body: JSON.stringify(Object.assign({ action }, payload))
    });
    const s = r.headers.get('set-cookie'); if (s) cookie = s.split(';')[0];
    return r.json().catch(() => ({}));
  };
  console.log('login', !!(await call('login', { email: 'rjagadeeswara66@gmail.com', password: PW })).ok);
  for (const slug of ['home', 'faqs', 'meet-doctors']) {
    await call('page.unpublish', { slug });
    await call('page.discardDraft', { slug });
    console.log('reset', slug);
  }
  const d = await call('doctors.get');
  if (d.list) { await call('doctors.save', { list: d.list, publish: true }); console.log('doctors grid republished (canonical order)'); }
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
