'use strict';
const fs = require('fs');
for (const f of ['public/admin/admin.js', 'public/assets/js/qh-cms.js']) {
  let s = fs.readFileSync(f, 'utf8');
  s = s.split('/api/qh/admin').join('/api/qh/admin/');
  s = s.split('/api/qh/content?').join('/api/qh/content/?');
  fs.writeFileSync(f, s, 'utf8');
  console.log('patched', f);
}
// ensure no double slashes crept in ('/api/qh/admin//')
for (const f of ['public/admin/admin.js', 'public/assets/js/qh-cms.js']) {
  let s = fs.readFileSync(f, 'utf8');
  const before = s.length;
  s = s.split('/api/qh/admin//').join('/api/qh/admin/');
  fs.writeFileSync(f, s, 'utf8');
  if (s.length !== before) console.log('fixed double-slash in', f);
}
