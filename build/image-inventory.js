'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { allPages } = require('./structure');
const { routes, showCardImages, inlineFor } = require('./visual-plan');
const { bannerFor, keyFor } = require('./images');
const dir = path.join(__dirname, '..', 'docs', 'image-audit');
fs.mkdirSync(dir, { recursive: true });
const common = 'Premium original educational illustration, deep maroon #4A0D24 and #651B36, champagne gold #D6B77A, warm ivory, blush and beige. Sophisticated editorial lighting, spacious composition, precise clean forms. No text, labels, logos, watermark, statistics, treatment outcomes, incisions or efficacy claims. Clearly an illustration, not clinical evidence.';
const inventory = [];
function inspect(page, blocks, prefix = '') {
  blocks.forEach((b, i) => {
    const section = prefix + (b.heading || b.title || b.eyebrow || b.type + ' ' + (i + 1));
    const art = routes[page.url];
    const needs = inlineFor(page, b) || ['hero', 'split'].includes(b.type) || b.type === 'steps' && !!b.slot || b.type === 'cards' && showCardImages(b);
    const row = { page: page.h1 || 'Home', route: page.url, section, type: b.type,
      existingContent: b, imageNeeded: !!needs,
      rationale: needs ? 'Existing visual component: replace arbitrary imagery with a topic-specific asset where available.' : 'Preserve reading flow: prose, evidence tables, warnings, FAQs and source details do not need decorative photographs.',
      concept: needs && art ? art.concept : needs ? 'Use only the corresponding explicitly mapped card/topic asset.' : null,
      dimensions: needs ? b.type === 'hero' ? '1920×1080 and 2560×1440; 16:9' : '480×330 and 960×660; 16:11; contain within portrait/step frames where needed' : null,
      placement: needs ? 'Inside the existing media region; do not replace or overlay written data.' : 'No additional media',
      generationPrompt: needs && art ? common + ' Subject: ' + art.concept : null,
      filename: needs && art ? art.key + '-card-960.webp' : null,
      existingImageKeys: b.type === 'cards' ? b.items.map((it) => ({ title: it.title, href: it.href, key: keyFor(it), plannedKey: routes[(it.href || '').split('#')[0]]?.key || null })) : b.slot ? [keyFor(b)] : [] };
    inventory.push(row);
    if (b.blocks) inspect(page, b.blocks, section + ' / ');
  });
}
allPages.forEach((p) => {
  const art = routes[p.url];
  inventory.push({ page: p.h1 || 'Home', route: p.url, section: 'Page banner', type: 'banner', existingContent: { h1: p.h1, lead: p.bannerLead },
    imageNeeded: !!art, existingImageKeys: [bannerFor(p)], concept: art?.concept || null,
    dimensions: art ? '960×384 and 1600×640; 5:2; subject at right with quiet left text region' : null,
    placement: art ? 'Existing decorative banner background' : 'Existing banner typography and gradient only; legal pages do not need photographs.',
    generationPrompt: art ? common + ' Wide banner. Subject at right: ' + art.concept : null,
    filename: art ? art.key + '-banner-1600.webp' : null });
  inspect(p, p.blocks);
});
const pending = [
  { route: '/', section: 'Homepage hero', filename: 'confident-adult-woman-maroon-editorial-2560.webp', dimensions: '2560×1440; art-directed 1200×1500 mobile variant', status: 'Requires an image-generation tool or supplied licensed photography; retain and correctly label existing abstract art meanwhile.', prompt: 'Photorealistic premium editorial portrait of a confident adult woman, tasteful elegant ivory clothing with a modest neckline, natural fuller bust and natural proportions, realistic face, hands and skin texture, body-positive non-sexual pose, warm studio lighting, deep maroon #4A0D24 background, champagne accents, model on right, generous negative space on left, no text, logos, watermarks, surgery or before-and-after suggestion.' },
  { route: '/breast-enlargement-safety/', section: 'Consultation and informed consent', filename: 'illustrative-adult-consultation-maroon-1600.webp', dimensions: '1600×1200; 4:3', status: 'Photorealistic generation unavailable. Do not represent synthetic subjects as Quantum Health practitioners/patients.', prompt: 'Photorealistic editorial scene of a fully clothed adult woman and an adult healthcare professional discussing an unmarked options notebook in a calm premium consultation room, natural hands, varied adult ages and skin tones, warm ivory clothing, deep maroon upholstery and champagne lighting, no visible credentials, logos, charts, needles, outcome claims or text. Clearly label on the website as an illustrative scene, not actual staff or a patient.' },
  { route: '/surgical/breast-augmentation/', section: 'Recovery and aftercare', filename: 'adult-resting-recovery-editorial-1600.webp', dimensions: '1600×1200; 4:3', status: 'Requires supplied/licensed photography or generation capability; do not invent a patient or recovery result.', prompt: 'Photorealistic respectful lifestyle image of a fully clothed adult woman resting comfortably in a supportive armchair, loose ivory clothing, quiet deep-maroon and beige room, soft daylight, natural anatomy and hands, no surgical wounds, bandages, clocks, calendars, guaranteed recovery or before-after implication. Clearly illustrative, not an actual patient.' }
];
fs.writeFileSync(path.join(dir, 'requirements.json'), JSON.stringify({ pages: allPages.length, sections: inventory.length, inventory, pendingPhotography: pending }, null, 2));
fs.writeFileSync(path.join(dir, 'content-baseline.json'), JSON.stringify({ sha256: crypto.createHash('sha256').update(JSON.stringify(allPages)).digest('hex'), pages: allPages }, null, 2));
const rows = inventory.map((r) => '| `' + r.route + '` | ' + r.section.replace(/\|/g, '/') + ' | ' + (r.imageNeeded ? 'Yes' : 'No') + ' | ' + (r.filename || 'Text / existing subtle icon') + ' |').join('\n');
fs.writeFileSync(path.join(dir, 'requirements.md'), '# Complete image requirements inventory\n\nPrepared before generating assets. The JSON companion contains the full existing content, placement, dimensions, concepts and generation prompts for every section.\n\nPages: ' + allPages.length + '; audited page-banner/content sections: ' + inventory.length + '.\n\n| Route | Section | Image needed | Planned asset |\n| --- | --- | --- | --- |\n' + rows + '\n\n## Outstanding photorealistic assets\n\n' + pending.map((p) => '- **' + p.section + '** (`' + p.route + '`): ' + p.status).join('\n') + '\n');
console.log('Inventoried ' + allPages.length + ' routes and ' + inventory.length + ' banner/content sections. Full authored content baseline preserved.');
