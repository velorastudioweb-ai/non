# Performance and responsive optimization — verified production release

## Deployment

- Public site: https://quantumhealth-website.vercel.app/
- Verified production deployment: `dpl_D2N9ADdv87rQxrz3RDPwgcU2ibtn`.
- Vercel inspection: https://vercel.com/jagadeesh-94bb/quantumhealth-website/D2N9ADdv87rQxrz3RDPwgcU2ibtn
- Production build: `npm run qa`; 44 canonical routes, 40 indexable routes,
  38 redirects and the custom 404 document.
- Final live content verification passed for all **45 documents**, comparing
  text, links, image identities, metadata and structured data with the captured
  authored release snapshot. All rendered images loaded in the live layout audit.
- Earlier byte-level deployment checks exercised all 44 pages, the custom 404,
  **375 assets**, redirects and immutable cache headers. That checker intentionally
  flags differences if subsequent authoring changes have rebuilt local `dist/`.
- Vercel configures `SITE_URL=https://quantumhealth-website.vercel.app`.
  Verification explicitly mirrors that existing setting; it does not change the
  configured canonical URLs or ignore other HTML differences.

These results describe this deployment. Concurrent About/profile/homepage
authoring continued during the audit; subsequent releases need their own
verification. The original optimization commit is `c9390ff`; the verification
tooling follow-up is `17eb3cc` on `feature/dr-vikas-singh-profile`.

## Implemented optimizations

- Responsive, uncropped WebP derivatives for all 18 supplied root images;
  source originals retained, hash-verified and represented in the image manifest.
- Responsive `srcset`/`sizes` and intrinsic dimensions for supplied artwork.
  Hero preload and eager/high-priority loading; below-fold native lazy loading.
- Mobile/tablet banners use intrinsic-height artwork rows, separated from text.
  The homepage stacks its complete artwork, copy and visible actions.
- Self-hosted original font families/weights, WOFF2 subsets, swap rendering and
  critical font preloads; no production Google Fonts dependency.
- Minified, content-addressed CSS/JS and optional component styles. The research
  script remains specific to the research page. Static HTML rendering retained.
- Immediate section visibility, removal of continuous decorative drift and
  scroll-reveal delays, less redundant header work, and a rasterized equivalent
  of the original subtle grain treatment.
- Asynchronous header scroll-state observation removes the initial forced
  document-layout read. Offscreen homepage sections use browser-native
  `content-visibility` with remembered intrinsic sizes; their full authored HTML
  remains present. Research source links jump directly to their opened targets.
- Research JSON loads as the archive approaches the viewport or receives focus;
  complete records, search, years, sorting, pagination and abstracts remain
  available. Search strings are cached and year counts use a single pass.
- Long-lived immutable caching for hashed build/responsive assets and versioned
  fonts; explicit data caching; original Open Graph image URL and favicon fixed.

## Responsive and functional verification

Real Chrome rendered **45 documents × 8 viewport widths = 360 checks**:

`320`, `375`, `390`, `430`, `768`, `1024`, `1440`, `1920` pixels.

Both final production runs passed with zero failing renders:

- `completed-live-mobile/results.json`: 180 mobile renders.
- `completed-live-large/results.json`: 180 tablet/laptop/desktop renders.

The checks exercised native lazy loading, loaded image dimensions, full mobile
banner geometry, image/text separation, text/card bounds, page overflow, HTTP
failures and JavaScript errors. Mobile/tablet images were fully contained and
proportional. Mobile hero, surgical and non-surgical banner screenshots were
also inspected visually. Screenshots are retained locally, excluded from Git.

The later desktop design intentionally uses cover-style photographic
backgrounds. `--allow-desktop-cover` was explicitly selected and **12 desktop
cover crops** were recorded, rather than presented as uncropped images. Mobile
and tablet full-image checks remained strict. Omitting the flag enforces full
desktop-image containment as well.

`completed-live-interactions.json` records passing navigation/dropdown/focus/Escape,
FAQ, contact validation, research search/year/sort/pagination/abstract, source
fragment and no-JavaScript checks. Header scroll state and the homepage's
"Explore treatments" anchor were also checked. All eight widths were exercised. The existing
unconfigured contact endpoint was checked without submitting a real enquiry.

## Lighthouse: actual production site

Lighthouse **13.5.0**, default simulated mobile throttling and the desktop
configuration, run sequentially. These are individual lab measurements, not
field Core Web Vitals or guaranteed scores.

| Page | Mobile performance | Desktop performance | Mobile LCP | Accessibility M/D | Best Practices M/D | SEO M/D |
| --- | ---: | ---: | ---: | --- | --- | --- |
| Home | 97 | 100 | 2.382 s | 100 / 100 | 100 / 100 | 92 / 92 |
| Surgical overview | 97 | 100 | 1.910 s | 100 / 100 | 100 / 100 | 92 / 92 |
| Breast implants | 98 | 100 | 1.909 s | 98 / 98 | 100 / 100 | 92 / 92 |
| Non-surgical overview | 99 | 100 | 1.858 s | 98 / 98 | 100 / 100 | 92 / 92 |
| Education & research overview | 100 | 100 | 1.634 s | 98 / 98 | 100 / 100 | 92 / 92 |
| Research library | 97 | 100 | 2.213 s | 99 / 99 | 100 / 100 | 92 / 92 |

- All six sampled mobile LCP results were below 2.5 seconds.
- Mobile CLS ranged from 0 to 0.018. Desktop CLS ranged from 0 to 0.050.
- Mobile TBT ranged from 0 to 74 ms. TBT is not INP.
- All four Lighthouse category targets were met on the sampled pages in this
  final run. Earlier runs, including below-target results before the forced-layout
  fix, remain locally available. Scores vary by network/device and are not guarantees.
- Interactive lab Event Timing observations reached 72 ms on the tested mobile
  widths and 120 ms overall. They do not establish a field INP result or prove
  the under-200-ms target for real visitors.

The initial local homepage baseline was performance 70, LCP 4.144 s and CLS
0.191. It used Lighthouse 13.0.3 and uncompressed local serving; the final
production measurements use 13.5.0 and Vercel compression. They demonstrate the
observed improvement, but are not a controlled same-host/version A/B comparison.

## Content preservation and audit scope

The original 37-document snapshot passed exact text/link/image-identity/SEO and
structured-data comparison during optimization. It remains in
`content-baseline.json`. Later intentional authoring changes added profiles and
consolidated About/leadership navigation, so that historical snapshot must not
be silently replaced or described as matching the later authored website.
Use an explicitly named snapshot for future approved content versions, as
documented in the README. `release-content.json` captures the 45-document version
before the final rendering changes; `live-content-verification.json` records
the passing final production comparison. This avoids mistaking concurrent local
authoring changes for a failed deployment or silently replacing the original baseline.

Machine-readable final Lighthouse, interaction, responsive and deployment
results accompany this report. Raw Lighthouse HTML/JSON reports and screenshots
remain available locally under `docs/performance-audit/`.
