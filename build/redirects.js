'use strict';

/* =============================================================================
   Redirects for retired routes.

   Every retired URL 301-redirects to a single, final destination — no chains.
   `REDIRECTS` is the source of truth:
     - generate.js writes a static HTML stub for each retired path so that the
       build output stays self-contained (works on any static host), and
     - the same table is mirrored in vercel.json `redirects` (see vercel-redirects
       note in README / kept in sync manually) for hosts that prefer server
       redirects.

   `to` must be an existing page in the built site.
   ============================================================================= */

const REDIRECTS = [
  // Retired clinic / practice pages
  { from: '/about-dr-vikas-singh/', to: '/about-us/' },
  { from: '/locations/', to: '/about-us/' },
  { from: '/media-and-press/', to: '/about-us/' },
  { from: '/technology-and-medical-standards/', to: '/about-us/' },
  { from: '/patient-photography-consent/', to: '/about-us/' },
  { from: '/our-team/', to: '/choosing-a-surgeon/' },
  { from: '/before-after-gallery/', to: '/understanding-breast-enlargement/' },
  { from: '/video-gallery/', to: '/blogs/' },
  { from: '/book-consultation/', to: '/contact/' },
  // Renamed content
  { from: '/candidacy-and-safety/', to: '/breast-enlargement-safety/' },
  { from: '/surgical/silicone-breast-implants/', to: '/breast-implants/' }
];

const { site } = require('./content');

function stubHtml(from, to) {
  const target = site.url + to;
  return '<!DOCTYPE html>\n' +
    '<html lang="en-IN">\n<head>\n' +
    '<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>Redirecting…</title>\n' +
    '<link rel="canonical" href="' + target + '">\n' +
    '<meta name="robots" content="noindex, follow">\n' +
    '<meta http-equiv="refresh" content="0; url=' + to + '">\n' +
    '<script>location.replace(' + JSON.stringify(to) + ');</script>\n' +
    '</head>\n<body>\n' +
    '<p>This page has moved. <a href="' + to + '">Continue to the new page</a>.</p>\n' +
    '</body>\n</html>\n';
}

/* Write a stub at each retired path. `writePage` is injected by gen.js so this
   module does not need to know about the dist layout. */
function writeStubs(writePage) {
  REDIRECTS.forEach((r) => {
    writePage(r.from, stubHtml(r.from, r.to));
  });
  return REDIRECTS.length;
}

module.exports = { REDIRECTS, writeStubs, stubHtml };
