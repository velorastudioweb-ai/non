'use strict';
// Explicit, content-led art direction. No hash-selected medical imagery.
const entries = [
  ['/surgical-breast-enlargement/', 'surgical-options', 'options', 'Implant device, adipose-tissue motif and an open planning notebook', 'Surgical options and informed planning'],
  ['/non-surgical-breast-enlargement/', 'non-surgical-evidence', 'evidence', 'Magnifying lens over a reading card beside an unmarked evidence checklist', 'Assessing non-surgical evidence'],
  ['/education-research/', 'education-research', 'learning', 'Breast Education and Research Collage', 'Breast education and research overview'],
  ['/surgical/breast-augmentation/', 'augmentation-planning', 'options', 'A closed implant device and adipose-cell motifs beside a planning sheet', 'Implants and fat-transfer planning'],
  ['/breast-implants/', 'implant-shell-profiles', 'implant', 'Two isolated implant-device profiles with a clearly visible outer shell', 'Implant-device shapes and outer shells'],
  ['/breast-implant-safety/', 'implant-monitoring', 'monitoring', 'A sealed implant-device illustration beside a monitoring lens and shield', 'Implant monitoring and safety'],
  ['/surgical/fat-transfer-breast-augmentation/', 'fat-transfer-tissue', 'fat', 'A stylised cluster of adipose cells beside an isolated blunt cannula', 'Fat-tissue and cannula concepts'],
  ['/surgical/breast-lift/', 'mastopexy-planning', 'scars', 'Three non-graphic incision-pattern motifs from the page: areolar, vertical and inframammary-fold patterns; no postoperative body or result', 'Schematic areolar, vertical and fold incision-pattern concepts'],
  ['/surgical/breast-revision/', 'implant-revision', 'revision', 'An isolated implant device with circular review arrows and a planning record', 'Implant review and revision planning'],
  ['/surgical/breast-filler-removal/', 'filler-removal-assessment', 'material', 'Separated material shapes in a laboratory assessment tray beside a warning outline; no complete-removal claim', 'Assessment of previously injected materials'],
  ['/surgical/breast-reduction/', 'reduction-planning', 'shoulders', 'Neutral back-and-shoulder outline beside an assessment record, relating to the neck and shoulder symptoms discussed on the page', 'Back and shoulder symptoms to discuss before breast reduction'],
  ['/surgical/mastectomy-chest-surgery/', 'chest-contouring-planning', 'garment', 'An isolated postoperative compression-garment concept and follow-up notebook, based on the aftercare discussed on the page; no person or result', 'Chest-surgery garment and follow-up concepts'],
  ['/breast-enlargement-without-surgery/', 'without-surgery-evidence', 'claims', 'Three unmarked claim cards under a reading lens, with no ratings or efficacy symbols', 'Reading the evidence behind enlargement claims'],
  ['/non-surgical/', 'non-surgical-safety-review', 'assessment', 'Unmarked assessment sheet, magnifying lens and safety outline', 'Reviewing non-surgical claims and safety'],
  ['/non-surgical/dermal-fillers/', 'filler-product-caution', 'filler', 'An isolated sealed generic syringe and safety shield; no injection into a person', 'Injectable-product safety questions'],
  ['/non-surgical/breast-threads/', 'cog-suture-material', 'cog', 'Isolated barbed-suture material in a macro-style scientific illustration; no tissue placement', 'Cog-suture material, not a placement guide'],
  ['/non-surgical/mono-threads/', 'smooth-suture-material', 'mono', 'Isolated smooth monofilament sutures with fine looping strands; no tissue placement', 'Smooth monofilament-suture material'],
  ['/non-surgical/prp/', 'prp-preparation-tube', 'prp', 'Unmarked capped laboratory tube with separated blood-component colours on a laboratory stand', 'Blood-preparation laboratory concept'],
  ['/non-surgical/biostimulators/', 'biostimulator-research', 'scaffold', 'Abstract material scaffold under a magnifying lens; no claim of breast-tissue growth', 'Biostimulator material research concept'],
  ['/non-surgical/sculptra-plla/', 'plla-material-concept', 'polymer', 'Stylised polymer beads and an unbranded sealed vial; not a molecular structural formula', 'PLLA material concept'],
  ['/non-surgical/regenerative-medicine/', 'regenerative-laboratory-research', 'cells', 'Petri dish with stylised cells and a microscope silhouette; no treatment or efficacy claim', 'Regenerative laboratory research'],
  ['/understanding-breast-enlargement/', 'understanding-options', 'choice', 'An open decision notebook with three distinct unmarked option cards', 'Understanding options before deciding'],
  ['/breast-anatomy/', 'breast-tissue-schematic', 'anatomy', 'Simplified breast cross-section with an outer skin contour, fat lobules and branching ducts; no operative details', 'Simplified breast-tissue schematic'],
  ['/breast-enhancement-comparison/', 'comparing-treatment-options', 'comparison', 'Balanced comparison cards and a simple balance beam, without ratings or outcome charts', 'Comparing options without outcome guarantees'],
  ['/breast-enlargement-safety/', 'safety-informed-choice', 'safety', 'Safety shield, open consent notebook and an unmarked checklist', 'Safety and informed choice'],
  ['/research/', 'external-research-library', 'library', 'Stacked peer-reviewed reading material, open book and magnifying lens; no fabricated charts', 'External research and scientific reading'],
  ['/references/', 'scientific-source-references', 'references', 'Layered citation documents with a bookmark and reference-book spine', 'External scientific references'],
  ['/glossary/', 'medical-terms-reference', 'glossary', 'Open dictionary with blank index tabs and a reading lens; no embedded lettering', 'Plain-language medical terminology'],
  ['/faqs/', 'shared-questions', 'questions', 'Unmarked speech cards and an open notebook, without embedded text', 'Questions and informed discussion'],
  ['/about-us/', 'independent-patient-education', 'reading', 'An open educational notebook on a quiet reading desk; no clinic identity or practitioner portrait', 'Independent patient education'],
  ['/contact/', 'website-enquiries', 'contact', 'Envelope and unmarked correspondence card on a quiet maroon desk', 'Website correspondence'],
  /* Body-section artwork. These keys are referenced directly by figure blocks
     rather than by a route, so the pseudo-route keeps them out of banners. */
  ['#reduction-incisions', 'reduction-incisions', 'incisionPlans', 'Schematic breast contour with areolar, vertical and inframammary incision lines and a shaded excision area', 'Schematic incision patterns discussed before breast reduction'],
  ['#reduction-recovery', 'reduction-recovery', 'recovery', 'Unmarked calendar checkpoints, a support garment and a gradual-activity path', 'Recovery stages and aftercare concepts after breast reduction']
];
const routes = Object.fromEntries(entries.map(([route, slug, kind, concept, alt], i) => [route, {
  route, key: 'qh-' + slug, kind, concept, alt: 'Educational illustration: ' + alt.toLowerCase(), seed: i,
  caption: kind === 'anatomy' ? 'Simplified educational schematic; not an operative or diagnostic diagram.' : 'Conceptual educational illustration; not a patient, treatment result or clinical recommendation.'
}]));
const slots = {
  'Clinic / consultation environment': 'qh-independent-patient-education',
  'Consultation room detail': 'qh-safety-informed-choice',
  'Consultation imagery': 'qh-safety-informed-choice',
  'Consultation welcome imagery': 'qh-website-enquiries',
  'Surgical consultation imagery': 'qh-augmentation-planning'
};
function forItem(item) {
  if (item && item.href && routes[item.href.split('#')[0]]) return routes[item.href.split('#')[0]].key;
  if (item && slots[item.slot]) return slots[item.slot];
  return null;
}
function showCardImages(block) {
  return block.eyebrow !== 'Continue reading' && block.eyebrow !== 'In this guide'
    && !/^Related education$/.test(block.heading || '');
}
const inlineRoutes = new Set(['/breast-anatomy/', '/breast-implants/', '/surgical/fat-transfer-breast-augmentation/', '/non-surgical/prp/', '/non-surgical/breast-threads/', '/non-surgical/mono-threads/', '/non-surgical/regenerative-medicine/']);
function inlineFor(page, block) {
  return inlineRoutes.has(page.url) && block === (page.blocks.find((b) => b.type === 'prose') || page.blocks.find((b) => b.type === 'notice'));
}
module.exports = { entries, routes, slots, forItem, showCardImages, inlineFor };
