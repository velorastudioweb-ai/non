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

const { redirects: REDIRECTS, site } = require('./structure');


function stubHtml(from, to) {
  const target = site.url + to.split('#')[0];
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
