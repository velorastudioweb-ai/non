'use strict';

// Fail the build if a canonical topic or verified doctor image is moved or
// removed. Generated-page QA checks every rendered URL; this protects the
// central registry before a page happens to reference a particular entry.
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { siteImages, doctorPortraits } = require('./site-images');

const publicDir = path.join(__dirname, '..', 'public');
const entries = [
  ...Object.entries(siteImages).map(([name, image]) => ['topic:' + name, image]),
  ...Object.entries(doctorPortraits).map(([name, image]) => ['doctor:' + name, image])
];

for (const [name, image] of entries) {
  assert(image && typeof image.src === 'string' && image.src.startsWith('/'), name + ' must use a root-relative local source');
  assert(Number.isInteger(image.width) && image.width > 0, name + ' must declare a width');
  assert(Number.isInteger(image.height) && image.height > 0, name + ' must declare a height');
  const file = path.join(publicDir, decodeURIComponent(image.src).replace(/^\//, ''));
  assert(fs.existsSync(file), name + ' source is missing: ' + image.src);
  assert(fs.statSync(file).isFile(), name + ' source is not a file: ' + image.src);
}

console.log('Canonical image registry QA: ' + entries.length + ' local topic and portrait assets verified.');
