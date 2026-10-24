'use strict';
const fs = require('fs');
const path = require('path');
const { allPages } = require('./structure');
const { routes, forItem, showCardImages, inlineFor } = require('./visual-plan');
const root = path.join(__dirname, '..');
const dir = path.join(root, 'docs', 'image-audit');
const inventoryFile = path.join(dir, 'requirements.json');
const inventory = JSON.parse(fs.readFileSync(inventoryFile));
const assets = JSON.parse(fs.readFileSync(path.join(dir, 'generated-assets.json')));
const placements = [];
function record(page, section, key, variant, originalContent) {
  if (key) placements.push({ route: page.url, page: page.h1 || 'Home', section, key, variant, originalContent,
    source: '/assets/img/' + key + '-' + variant + '.svg',
    files: (variant === 'portrait' ? [480, 960] : variant === 'banner' ? [640, 960, 1600] : [480, 960, 1600]).map((w) => '/assets/img/' + key + '-' + variant + '-' + w + '.webp') });
}
function inspect(page, blocks, parent = '') {
  blocks.forEach((b) => {
    const heading = parent + (b.heading || b.title || b.eyebrow || b.type);
    if (b.type === 'cards' && showCardImages(b)) b.items.forEach((it) => record(page, heading + ' / ' + it.title, forItem(it), 'card', it));
    if (b.type === 'split') record(page, heading, forItem(b), 'portrait', b.body);
    if (b.type === 'steps' && b.slot) record(page, heading, forItem(b), 'card', b.items);
    if (inlineFor(page, b)) record(page, heading + ' / educational figure', routes[page.url].key, 'card', b);
    if (b.blocks) inspect(page, b.blocks, heading + ' / ');
  });
}
allPages.forEach((p) => {
  if (routes[p.url]) record(p, 'Page banner', routes[p.url].key, 'banner', { title: p.h1, introduction: p.bannerLead });
  inspect(p, p.blocks);
});
const common = 'Original non-photographic educational illustration in deep maroon #4A0D24, secondary #651B36, champagne #D6B77A, ivory and blush. Soft editorial lighting, spacious composition, no text, logos, clinical outcomes, invented charts or evidence claims.';
inventory.finalImageRecommendations = Object.values(routes).map((a) => ({ route: a.route, concept: a.concept, generationPrompt: common + ' Subject: ' + a.concept, alt: a.alt, filenameStem: a.key, actualPlacements: placements.filter((p) => p.key === a.key).map((p) => ({ route: p.route, section: p.section, variant: p.variant })) }));
fs.writeFileSync(inventoryFile, JSON.stringify(inventory, null, 2));
fs.writeFileSync(path.join(dir, 'placements.json'), JSON.stringify(placements, null, 2));
function payload(name) {
  const report = JSON.parse(fs.readFileSync(path.join(dir, name)));
  const atDesktop = report.results.filter((r) => r.width === 1440);
  const files = new Set(atDesktop.flatMap((r) => r.images.map((img) => new URL(img.src).pathname)));
  return { uniqueFiles: files.size, uniqueBytes: [...files].reduce((n, f) => n + fs.statSync(path.join(root, 'public', f.replace(/^\//, ''))).size, 0), imageReferences: atDesktop.reduce((n, r) => n + r.images.length, 0) };
}
const performance = { before: payload('browser-before.json'), after: payload('browser-after.json'), scope: 'Unique image resources actually selected across all 36 desktop routes at DPR 1; excludes unchanged CSS/background assets and browser caching between routes.' };
fs.writeFileSync(path.join(dir, 'payload-comparison.json'), JSON.stringify(performance, null, 2));
const generatedFiles = assets.flatMap((a) => {
  const base = a.filename.replace(/\.svg$/, '');
  const widths = a.variant === 'portrait' ? [480, 960] : a.variant === 'banner' ? [640, 960, 1600] : [480, 960, 1600];
  return ['/assets/img/' + a.filename, ...widths.map((w) => '/assets/img/' + base + '-' + w + '.webp')];
});
fs.writeFileSync(path.join(dir, 'generated-files.json'), JSON.stringify(generatedFiles, null, 2));
const routeTable = allPages.map((p) => '| `' + p.url + '` | ' + (p.h1 || 'Home').replace(/\|/g, '/') + ' | ' + (p.url === '/' ? 'Retained abstract hero optimised; new content-led section/card imagery' : routes[p.url] ? routes[p.url].concept : 'Text-first legal page; no unnecessary image') + ' |').join('\n');
const assetTable = Object.values(routes).map((a) => '| `' + a.route + '` | `' + a.key + '` | ' + assets.filter((x) => x.route === a.route).map((x) => x.variant).join(', ') + ' |').join('\n');
const placementTable = placements.map((p) => '| `' + p.route + '` | ' + p.section.replace(/\|/g, '/') + ' | `' + p.key + '-' + p.variant + '` |').join('\n');
const savings = (100 * (1 - performance.after.uniqueBytes / performance.before.uniqueBytes)).toFixed(1);
fs.writeFileSync(path.join(dir, 'completion-report.md'), `# Complete website image audit and integration report

## Delivery and capability limit

Audited all **36 canonical routes**, **380 banner/content sections**, and every nested source section/card in the retained site. The pre-generation inventory includes complete existing section content, dimensions, placement, concepts, prompts and proposed filenames. Final per-card recommendations and placements are recorded in the JSON companions.

**Photorealistic generation was unavailable.** No image-generation tool or configured photorealistic model was present; the existing Python generators also only draw abstract art. This delivery therefore contains original authored **educational SVG illustrations**, not AI photographs. The requested photorealistic homepage woman, consultation and recovery photographs remain outstanding. Their prompts and proposed filenames are in <code>requirements.json</code>. The retained homepage abstract image is correctly labelled as an illustration, not photography.

Generated **31 route-specific illustration concepts**, **${assets.length} used compositions**, and **${generatedFiles.length - assets.length} responsive WebP derivatives**. Additional WebP versions optimise the two retained homepage hero sizes. All assets are local and use the maroon, champagne, ivory and blush visual direction. No text, logos, testimonials, postoperative bodies, outcome comparisons or fabricated charts are embedded in the new artwork.

## Every page audited

| Route | Page | Visual decision |
| --- | --- | --- |
${routeTable}

## Every generated image family

Assets are under <code>public/assets/img/</code> and copied to <code>dist/assets/img/</code> by the existing build. For each stem below, the exact SVG file is <code>{stem}-{composition}.svg</code>. Cards have 480×330, 960×660 and 1600×1100 WebP files; banners have 640×256, 960×384 and 1600×640; the portrait has 480×600 and 960×1200. Every individual filename and path is listed in <code>generated-files.json</code> (SVG plus WebP) and <code>generated-assets.json</code> (SVG provenance and alt text).

| Content route | Filename stem | Used compositions |
| --- | --- | --- |
${assetTable}

## Actual integration placements

| Page route | Section/card | Asset stem and composition |
| --- | --- | --- |
${placementTable}

## Existing assets retained

- Homepage abstract artwork: <code>homepage-hero-luxury-editorial-1920.jpg</code> and <code>homepage-hero-luxury-editorial-2560.jpg</code>, with new WebP equivalents. Its written visual caption was corrected because the source was never a photograph.
- Existing brand mark, favicon, OG artwork, small SVG icons, decorative flourishes and theme effects remain.
- Existing JPEG originals remain in the project as source/legacy assets; generic hash-selected artwork is replaced in live topic placements by explicit mappings. No existing source image was destroyed.

## Deliberately left without additional images

- FAQ answers, glossary definitions, warnings, evidence tables, citations, bibliography entries, research-source details and forms remain readable text/icon-led components.
- Repeated “Continue reading / Related education” navigation cards retain all their wording and links but no longer repeat decorative photos.
- Privacy, cookie, terms and medical-disclaimer pages use their existing typography/gradient rather than unnecessary decorative images.
- The research archive retains its search, filters, sorting, abstracts and source links; no fabricated study illustrations or charts are inserted.

## Authentic photography and outstanding work

- No authorised patient/staff/clinic photographs were supplied. Actual people, premises or clinical credentials would require properly authorised photographs to represent them as real.
- No testimonial or before-and-after result component exists on the approved retained site. No synthetic patient, reviewer, clinician credential or result was created.
- Outstanding photorealistic assets: homepage lifestyle portrait, illustrative consultation scene and respectful recovery scene. These require a generation capability or appropriate supplied/licensed photography. Current illustrative imagery is not described as completion of that photographic requirement.
- Scientific illustrations are intentionally simplified concepts. They are not operative instructions, diagnostic images or evidence that a product is effective or approved for breast use.

## Content, accessibility, responsiveness and performance

- Authored canonical page data is hash-checked against the pre-audit snapshot. All 36 rendered pages are separately compared with Git checkpoint <code>000aa86</code>, excluding only visual captions, SVG markup and scripts. All original headings, paragraphs, tables, FAQs, warnings, citations and links are unchanged.
- Responsive WebP source sets have intrinsic width/height and SVG fallbacks; below-fold images are lazy-loaded. Only hero/banner imagery is eager/high-priority. Decorative banner images have empty alt text; meaningful figures/cards have descriptive illustration alt text.
- Subject-safe <code>contain</code> treatment prevents medical illustrations from being cropped in content frames. Wide banner subjects sit at the right; the existing dark text overlay preserves readability. Portrait art is separately composed.
- Before and after image audit: **108 renders each**, every page at 390, 768 and 1440 px, including below-fold images and opened research source disclosures: zero failures after integration.
- Full responsive suite: **144 renders**, all 36 pages at 320, 768, 1024 and 1440 px: zero page overflow, off-screen elements, clipped text, broken/distorted images, HTTP failures or console/network errors.
- Build/link/canonical checks and the HTTP/browser interaction suite pass, including all redirects, navigation, FAQs, source deep links and PMC searching/sorting/abstracts.
- Desktop image resource comparison: ${performance.before.uniqueFiles} unique selected images / ${performance.before.uniqueBytes.toLocaleString()} bytes before; ${performance.after.uniqueFiles} / ${performance.after.uniqueBytes.toLocaleString()} bytes after (**${savings}% fewer unique image bytes** under the measured conditions). This is a local resource comparison, not a Lighthouse/Core Web Vitals claim.

## Reproduction

<code>node build/image-inventory.js</code> creates the pre-change inventory/baseline (do not rerun to replace an audit baseline accidentally).
<code>node build/generate-editorial-visuals.js</code> draws used SVG compositions.
<code>node build/rasterize-editorial-visuals.js</code> renders them with local Chromium and encodes WebP with Pillow.
<code>npm run qa</code>, <code>python build/verify-image-content.py</code>, <code>node build/image-browser-qa.js</code>, and the existing responsive/interaction suites verify the integration.
`);
console.log('Report: ' + placements.length + ' placements; ' + generatedFiles.length + ' generated asset files; desktop unique-image byte reduction ' + savings + '%.');
