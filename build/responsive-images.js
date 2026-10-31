'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const manifest = require('./image-manifest.json');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const ROOT_RASTER = /\.(?:avif|gif|jpe?g|png|webp)$/i;
const esc = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function decodeSource(src) {
  const clean = String(src || '').split(/[?#]/, 1)[0];
  try { return decodeURIComponent(clean); }
  catch (_) { return clean; }
}

function imageInfo(src) {
  const source = decodeSource(src);
  const meta = manifest[source];
  if (!meta || !meta.variants || !meta.variants.length) return null;
  const fallback = meta.src || meta.variants[meta.variants.length - 1].src;
  const srcset = meta.variants.map(variant => `${encodeURI(variant.src)} ${variant.width}w`).join(', ');
  return { ...meta, src: fallback, srcset };
}

function attribute(tag, name) {
  const match = new RegExp('\\s' + name + '=("[^"]*"|\'[^\']*\')', 'i').exec(tag);
  return match ? match[1].slice(1, -1) : null;
}

function hasAttribute(tag, name) {
  return new RegExp('\\s' + name + '=', 'i').test(tag);
}

function removeAttributes(tag, names) {
  const pattern = names.join('|');
  return tag.replace(new RegExp('\\s(?:' + pattern + ')=(?:"[^"]*"|\'[^\']*\')', 'gi'), '');
}

/*
 * Rewrites any root-manifest image to an immutable WebP fallback + srcset.
 * It is deliberately safe to call at component level and again on the final
 * page markup: once rewritten, the hashed fallback no longer matches a root
 * manifest entry.  That lets raw prose, blog cards and portraits benefit from
 * the same processing as structured cards and figures.
 */
function responsiveMarkup(html, defaultSizes = '(max-width: 767px) calc(100vw - 40px), (max-width: 1240px) 92vw, 1100px') {
  return html.replace(/<img\b[^>]*>/gi, tag => {
    const source = attribute(tag, 'src');
    const info = source && imageInfo(source);
    if (!info) return tag;

    const sizes = attribute(tag, 'sizes') || defaultSizes;
    const priority = (attribute(tag, 'fetchpriority') || '').toLowerCase();
    const hasLoading = hasAttribute(tag, 'loading');
    const hasDecoding = hasAttribute(tag, 'decoding');
    const closing = /\/>$/.test(tag) ? '/>' : '>';
    const open = removeAttributes(tag.replace(/\/?\s*>$/, ''), ['src', 'srcset', 'sizes', 'width', 'height']);
    const loading = hasLoading ? '' : ` loading="${priority === 'high' ? 'eager' : 'lazy'}"`;
    const decoding = hasDecoding ? '' : ' decoding="async"';

    return `${open} src="${esc(encodeURI(info.src))}" width="${info.width}" height="${info.height}"` +
      ` srcset="${esc(info.srcset)}" sizes="${esc(sizes)}"${loading}${decoding}${closing}`;
  });
}

function publicFile(url) {
  return path.join(PUBLIC, decodeSource(url).replace(/^\//, ''));
}

function verifyImages() {
  const expectedSources = fs.readdirSync(PUBLIC, { withFileTypes: true })
    .filter(entry => entry.isFile() && ROOT_RASTER.test(entry.name))
    .map(entry => '/' + entry.name)
    .sort();
  const listedSources = Object.keys(manifest).sort();
  const missing = expectedSources.filter(source => !Object.prototype.hasOwnProperty.call(manifest, source));
  const stale = listedSources.filter(source => !expectedSources.includes(source));
  if (missing.length || stale.length) {
    throw new Error('Responsive image manifest is out of date: ' +
      (missing.length ? 'missing ' + missing.join(', ') : '') +
      (missing.length && stale.length ? '; ' : '') +
      (stale.length ? 'stale ' + stale.join(', ') : '') +
      '. Run python build/responsive-images.py');
  }

  for (const [source, info] of Object.entries(manifest)) {
    const sourceFile = publicFile(source);
    if (!fs.existsSync(sourceFile)) throw new Error('Missing source image: ' + source);
    const content = fs.readFileSync(sourceFile);
    if (crypto.createHash('sha256').update(content).digest('hex') !== info.sha256) {
      throw new Error('Image changed: run python build/responsive-images.py (' + source + ')');
    }
    if (!info.src || !Array.isArray(info.variants) || !info.variants.length) {
      throw new Error('Invalid responsive image manifest entry: ' + source);
    }
    if (!info.variants.some(variant => variant.src === info.src && variant.width === info.width && variant.height === info.height)) {
      throw new Error('Responsive fallback must be an intrinsic-size derivative: ' + source);
    }
    for (const variant of info.variants) {
      if (!variant.src.startsWith('/assets/responsive/') || !variant.src.endsWith('.webp')) {
        throw new Error('Responsive derivative must be immutable WebP: ' + source + ' -> ' + variant.src);
      }
      if (!fs.existsSync(publicFile(variant.src))) throw new Error('Missing responsive image: ' + variant.src);
    }
  }
}

module.exports = { imageInfo, responsiveMarkup, verifyImages };
