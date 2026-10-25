'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const manifest = require('./image-manifest.json');
const esc = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function imageInfo(src) {
  const meta = manifest[src];
  if (!meta) return null;
  const srcset = meta.variants.map(v => `${encodeURI(v.src)} ${v.width}w`);
  srcset.push(`${encodeURI(src)} ${meta.width}w`);
  return { ...meta, srcset: srcset.join(', ') };
}
function responsiveMarkup(html, sizes = '(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 46vw, 400px') {
  return html.replace(/<img\b[^>]*>/g, tag => {
    const match = /\bsrc="([^"]+)"/.exec(tag);
    const info = match && imageInfo(match[1]);
    if (!info || /\bsrcset=/.test(tag)) return tag;
    return tag.replace(/\s(?:width|height)="[^"]*"/g, '').replace(/>$/, '') +
      ` width="${info.width}" height="${info.height}" srcset="${esc(info.srcset)}" sizes="${esc(sizes)}">`;
  });
}
function verifyImages() {
  for (const [src, info] of Object.entries(manifest)) {
    const content = fs.readFileSync(path.join(__dirname, '../public', src));
    if (crypto.createHash('sha256').update(content).digest('hex') !== info.sha256) {
      throw new Error('Image changed: run python build/responsive-images.py (' + src + ')');
    }
    for (const v of info.variants) {
      if (!fs.existsSync(path.join(__dirname, '../public', v.src))) throw new Error('Missing responsive image: ' + v.src);
    }
  }
}
module.exports = { imageInfo, responsiveMarkup, verifyImages };
