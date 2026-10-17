'use strict';

/* =============================================================================
   Local editorial image library
   -----------------------------------------------------------------------------
   Every image below is downloaded to public/assets/img/, graded to black and
   white and exported at two responsive widths (see build pipeline). Sources —
   both free for commercial use, no attribution required:

     · Unsplash License  (images.unsplash.com)
     · Burst / Shopify   (burst.shopifycdn.com, free stock photo license)

   These are clearly illustrative editorial images. They are never presented as
   patient results, as clinical documentation, or as a portrait of a named
   clinician. Gallery "consented case" and video slots stay intentionally
   unpublished (pendingFrame) — no stock photography stands in for a real case.
   ============================================================================= */

/* name -> { widths:[w,h]..., alt }  (heights are the real exported dimensions) */
const IMAGES = {
  'hero-portrait':   { dims: [[700, 875], [1000, 1250]], alt: 'Black-and-white editorial portrait of a woman resting her hands against her face' },
  'portrait-studio': { dims: [[620, 775], [900, 1125]], alt: 'Black-and-white studio portrait of a woman leaning forward against a plain backdrop' },
  'portrait-shadow': { dims: [[620, 775], [900, 1125]], alt: 'Black-and-white portrait of a woman lit through a diagonal shadow' },
  'clinic':          { dims: [[620, 775], [900, 1125]], alt: 'Black-and-white view through the bright, modern atrium of a building' },
  'chair':           { dims: [[620, 775], [900, 1125]], alt: 'A high-backed woven chair beside a window in a quiet room' },
  'care-hands':      { dims: [[620, 775], [900, 1125]], alt: 'Close-up of two people holding hands' },
  'hands':           { dims: [[620, 775], [900, 1125]], alt: 'A hand resting against a dark background in dramatic light' },
  'stilllife':       { dims: [[560, 385], [900, 619]], alt: 'Cosmetic brushes and a flower arranged on a reflective surface' },
  'dropper':         { dims: [[560, 385], [900, 619]], alt: 'A hand holding a glass dropper bottle against a plain background' },
  'glass-bottles':   { dims: [[560, 385], [900, 619]], alt: 'The blurred reflection of glass bottles seen through a window' },
  'curtain':         { dims: [[560, 385], [900, 619]], alt: 'A pale curtain hanging against a plain grey wall' },
  'shadows':         { dims: [[560, 385], [900, 619]], alt: 'Striped light and shadow falling across a curved wall' },
  'perfume':         { dims: [[560, 385], [900, 619]], alt: 'A dark glass bottle casting a long shadow across a pale surface' },
  'marble-dark':     { dims: [[560, 385], [900, 619]], alt: 'Dark marble veining running across a pale stone surface' },
  'marble-white':    { dims: [[560, 385], [900, 619]], alt: 'A pale, weathered stone wall with a small step ladder leaning against it' },
  'leaf':            { dims: [[560, 385], [900, 619]], alt: 'Close-up of a single leaf against a bright background' },
  'orchid':          { dims: [[560, 385], [900, 619]], alt: 'White orchid blossoms against a dark background' },
  'concrete':        { dims: [[560, 385], [900, 619]], alt: 'Bold diagonal stripes painted on a concrete wall' },
  'skyline':         { dims: [[560, 385], [900, 619]], alt: 'Aerial view of a dense city grid in black and white' },
  'city-street':     { dims: [[560, 385], [900, 619]], alt: 'A busy city street of signs, buses and pedestrians' },
  'archways':        { dims: [[560, 385], [900, 619]], alt: 'A row of ornate marble archways above a patterned floor' },
  'escalator':       { dims: [[560, 385], [900, 619]], alt: 'A long escalator inside a modern transit station' },
  'books':           { dims: [[560, 385], [900, 619]], alt: 'Rows of antique leather-bound books on a library shelf' },
  'notebook':        { dims: [[560, 385], [900, 619]], alt: 'A flat-lay of an open notebook, a cup of coffee, glasses and greenery' },
  'fabric-folds':    { dims: [[1800, 1012]], alt: 'Soft folds of pale fabric in raking light' }
};

/* Content slot labels -> image key. `null` renders a designed "not published"
   frame instead of a photograph. */
const SLOTS = {
  'Hero portrait': 'hero-portrait',
  'Clinic / consultation environment': 'clinic',
  'Clinic environment': 'clinic',
  'Consultation imagery': 'care-hands',
  'Consultation room detail': 'chair',
  'Consultation welcome imagery': 'care-hands',
  'Portrait — Dr. Vikas Singh': 'hands',
  'Portrait - Dr. Vikas Singh': 'hands',
  'Award & conference photography': 'archways',
  'Hong Kong head office': 'skyline',
  'Hong Kong clinic imagery': 'skyline',
  'International locations imagery': 'city-street',
  'Consultation room': 'chair',
  'Treatment room': 'clinic',
  'VIP lounge': 'archways',
  'Wellness boutique': 'stilllife',
  'Non-surgical treatment imagery': 'stilllife',
  'Surgical consultation imagery': 'portrait-shadow',
  'Breast augmentation imagery': 'portrait-studio',
  'Implant imagery': 'marble-white',
  'Fat transfer imagery': 'orchid',
  'Dermal filler imagery': 'dropper',
  'PRP preparation imagery': 'glass-bottles',
  'Thread procedure imagery': 'curtain',
  'Mono thread imagery': 'shadows',
  'PLLA product imagery': 'perfume',
  'Biostimulator imagery': 'marble-dark',
  'Regenerative research imagery': 'leaf',
  'Treatment guides imagery': 'books',
  'Surgical education imagery': 'portrait-studio',
  'Evidence and research imagery': 'glass-bottles',
  'Patient resources imagery': 'notebook',
  'Safety and evidence imagery': 'concrete',
  /* deliberately unpublished — never filled with stock photography */
  'Video thumbnail': null,
  'Consented case 01': null,
  'Consented case 02': null,
  'Consented case 03': null,
  'Consented case 04': null,
  'Consented case 05': null,
  'Consented case 06': null,
  'Clinical reference': null
};

/* Route -> image key for cards that carry a link but no slot. */
const ROUTES = {
  '/': 'hero-portrait',
  '/non-surgical/': 'stilllife',
  '/surgical-breast-enhancement/': 'portrait-shadow',
  '/non-surgical/dermal-fillers/': 'dropper',
  '/non-surgical/prp/': 'glass-bottles',
  '/non-surgical/breast-threads/': 'curtain',
  '/non-surgical/mono-threads/': 'shadows',
  '/non-surgical/sculptra-plla/': 'perfume',
  '/non-surgical/biostimulators/': 'marble-dark',
  '/non-surgical/regenerative-medicine/': 'leaf',
  '/surgical/breast-augmentation/': 'portrait-studio',
  '/surgical/silicone-breast-implants/': 'marble-white',
  '/surgical/fat-transfer-breast-augmentation/': 'orchid',
  '/breast-enhancement-comparison/': 'concrete',
  '/technology-and-medical-standards/': 'escalator',
  '/candidacy-and-safety/': 'care-hands',
  '/about-us/': 'clinic',
  '/about-dr-vikas-singh/': 'hands',
  '/our-team/': 'archways',
  '/locations/': 'skyline',
  '/book-consultation/': 'care-hands',
  '/faqs/': 'notebook',
  '/media-and-press/': 'archways',
  '/video-gallery/': 'shadows',
  '/before-after-gallery/': null,
  '/blogs/': 'books',
  '/blogs/surgical-vs-non-surgical-breast-enhancement/': 'books',
  '/blogs/before-choosing-breast-implants/': 'marble-white',
  '/blogs/prp-and-breast-enhancement-what-the-evidence-says/': 'glass-bottles',
  '/blogs/ten-questions-to-ask-at-a-breast-enhancement-consultation/': 'notebook',
  '/blogs/breast-fillers-sculptra-and-biostimulators-safety-questions/': 'dropper'
};

/* Editorial fallbacks, cycled for any slot/route we have not mapped. */
const FALLBACK = ['orchid', 'shadows', 'marble-dark', 'curtain', 'leaf', 'concrete'];
const BASE = '/assets/img/';

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/* Resolve a content slot label (and optional route) to an image key.
   Returns null when the content is deliberately unpublished. */
function keyFor(item) {
  const slot = item && item.slot;
  if (slot) {
    if (Object.prototype.hasOwnProperty.call(SLOTS, slot)) return SLOTS[slot];
    return FALLBACK[hash(slot) % FALLBACK.length];
  }
  const href = item && item.href;
  if (href && Object.prototype.hasOwnProperty.call(ROUTES, href)) return ROUTES[href];
  if (href) return FALLBACK[hash(href) % FALLBACK.length];
  return FALLBACK[0];
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* <img> markup with srcset, intrinsic size and an accurate alt attribute. */
function picture(key, opts) {
  const o = opts || {};
  const meta = IMAGES[key];
  if (!meta) return '';
  const dims = meta.dims;
  const largest = dims[dims.length - 1];
  const src = BASE + key + '-' + largest[0] + '.jpg';
  const srcset = dims.map((d) => BASE + key + '-' + d[0] + '.jpg ' + d[0] + 'w').join(', ');
  const eager = o.eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy" decoding="async"';
  const cls = o.className ? ' class="' + esc(o.className) + '"' : '';
  const sizes = o.sizes ? ' sizes="' + esc(o.sizes) + '"' : '';
  return '<img' + cls + ' src="' + src + '" srcset="' + srcset + '"' + sizes +
    ' width="' + largest[0] + '" height="' + largest[1] + '"' +
    ' alt="' + esc(o.alt || meta.alt) + '"' + eager + '>';
}

/* Image for a content item (slot/route aware). Empty string if unpublished. */
function pictureFor(item, opts) {
  const key = keyFor(item);
  if (!key) return '';
  return picture(key, Object.assign({}, opts, {
    alt: (opts && opts.alt) || (item && item.alt) || IMAGES[key].alt
  }));
}

/* Designed replacement for a photograph that must not be faked:
   consented clinical cases and not-yet-recorded videos. */
function pendingFrame(item, cls) {
  const slot = (item && (item.slot || item.caption)) || 'Awaiting photography';
  const note = (item && item.slotNote) || 'Not yet published';
  const isVideo = slot === 'Video thumbnail';
  const label = isVideo ? 'Video to be recorded' : note;
  const detail = isVideo
    ? 'Published once the content has been recorded and verified.'
    : 'Published only with documented, genuine consent.';
  return '<div class="pending ' + (cls || '') + '" role="img" aria-label="' +
    esc(slot + ' — ' + detail) + '">' +
    '<span class="pending__mark" aria-hidden="true">' + (isVideo ? '&#9654;' : '&#9670;') + '</span>' +
    '<strong>' + esc(label) + '</strong>' +
    '<span class="pending__note">' + esc(detail) + '</span>' +
    '</div>';
}

/* Largest on-disk URL for a key (used for lightbox / data-full). */
function srcFor(key) {
  const meta = IMAGES[key];
  if (!meta) return '';
  const d = meta.dims[meta.dims.length - 1];
  return BASE + key + '-' + d[0] + '.jpg';
}

module.exports = { IMAGES, SLOTS, ROUTES, keyFor, picture, pictureFor, pendingFrame, srcFor, esc };
