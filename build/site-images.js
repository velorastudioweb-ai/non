'use strict';

/*
 * Canonical local-image registry.
 *
 * Topic artwork is intentionally declared once so a treatment keeps the same
 * approved illustration wherever that same concept is introduced. Editorial
 * article artwork remains in published-blogs.js when it illustrates a distinct
 * article rather than the treatment itself.
 */
const siteImages = Object.freeze({
  ourApproach: { src: '/Our approach.webp', width: 1536, height: 1024, alt: 'Independent patient education and evidence review' },
  surgicalOverview: { src: '/Breast Augmentation Consultation Illustration.webp', width: 1600, height: 600, alt: 'Surgical breast augmentation consultation' },
  surgicalConsultationPreparation: { src: '/Personalized Breast Consultation Scene.png', width: 1536, height: 1024, alt: 'Illustration of a patient preparing for a breast-surgery consultation' },
  surgicalOptions: { src: '/surgical.webp', width: 1254, height: 1254, alt: 'Surgical breast enlargement options' },
  mastectomyChestSurgery: { src: '/Breast Surgery Planning and Recovery Collage.png', width: 1536, height: 1024, alt: 'Mastectomy and chest contouring surgery planning and recovery' },
  breastFillerRemoval: { src: '/Breast Filler Removal Medical Infographic.png', width: 1254, height: 1254, alt: 'Breast filler removal medical infographic' },
  nonSurgicalOverview: { src: '/non surgical.webp', width: 1254, height: 1254, alt: 'Non-surgical breast enlargement evidence overview' },
  nonSurgicalHero: { src: '/Non-Surgical Breast Enhancement Infographic.png', width: 2048, height: 768, alt: 'Non-surgical breast enhancement evidence overview' },
  nonSurgicalSafety: { src: '/ChatGPT Image Oct 29, 2026, 07_10_19 AM.png', width: 1536, height: 1024, alt: 'Illustration of non-surgical breast enhancement techniques and medical assessment' },
  withoutSurgery: { src: '/Non-Surgical Breast Enhancement Guide.png', width: 1536, height: 1024, alt: 'Breast enlargement without surgery evidence guide' },
  educationResearch: { src: '/education-research.webp', width: 1536, height: 1024, alt: 'Breast enlargement education and research' },
  dermalFillers: { src: '/Medical Breast Augmentation Infographic.png', width: 1536, height: 1024, alt: 'Breast dermal fillers' },
  prp: { src: '/prp.webp', width: 1254, height: 1254, alt: 'Platelet-rich plasma evidence review' },
  threadProcedures: { src: '/threads.webp', width: 1254, height: 1254, alt: 'Thread-based breast procedure information' },
  sculptraBiostimulators: { src: '/sculptra.webp', width: 1254, height: 1254, alt: 'Sculptra and biostimulator information' },
  // Each treatment keeps its own named illustration; do not share the fat-transfer
  // infographic between implant and fat-transfer concepts.
  breastImplants: { src: '/implants.webp', width: 1254, height: 1254, alt: 'Breast implants' },
  fatTransfer: { src: '/Breast Fat Transfer Medical Infographic.png', width: 1254, height: 1254, alt: 'Fat transfer breast augmentation' },
  fatTransferGuide: { src: '/dfsjifl.png', width: 1254, height: 1254, alt: 'Illustration of fat-transfer breast augmentation from liposuction to transfer' },
  breastAugmentation: { src: '/Breast Augmentation Options Infographic.png', width: 1536, height: 1024, alt: 'Breast augmentation options' },
  breastAugmentationPlanning: { src: '/Breast Augmentation Options Infographic.png', width: 1536, height: 1024, alt: 'Breast augmentation options and planning' },
  breastRevision: { src: '/Breast Implant Revision Infographic.png', width: 1254, height: 1254, alt: 'Illustration of breast implant revision planning' },
  breastImplantSafety: { src: '/Breast Implant Safety Infographic.png', width: 1254, height: 1254, alt: 'Breast implant safety' },
  compareOptions: { src: '/Breast Enhancement Options Infographic.webp', width: 1536, height: 1024, alt: 'Breast enhancement options compared' },
  breastAnatomy: { src: '/Breast Anatomy and Augmentation Illustration.webp', width: 1536, height: 1024, alt: 'Breast anatomy explained' },
  breastSafety: { src: '/Breast Augmentation Safety Consultation Infographic.webp', width: 1536, height: 1024, alt: 'Breast enlargement safety consultation' },
  breastEducation: { src: '/Breast Enhancement Medical Infographic.webp', width: 1536, height: 1024, alt: 'Understanding breast enlargement' },
  decisionPath: { src: '/Five-Step Beauty Consultation Journey.webp', width: 1536, height: 1024, alt: 'Five steps for using this educational website' }
});

const doctorPortraits = Object.freeze({
  vikas: { src: '/dr-vikas-singh.png', width: 355, height: 431 },
  surindher: { src: '/dr-surindher-dsa.png', width: 353, height: 317 },
  amod: { src: '/dr-amod-rao.png', width: 268, height: 342 },
  arivazhagan: { src: '/dr-arivazhagan.png', width: 367, height: 348 },
  sekhar: { src: '/dr-sekhar.png', width: 382, height: 372 },
  alisha: { src: '/dr-alisha-khan.png', width: 208, height: 246 }
});

const escapeAttribute = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

function topicImage(name, options = {}) {
  const image = siteImages[name];
  if (!image) throw new Error('Unknown canonical image: ' + name);
  const loading = options.loading === undefined ? 'lazy' : options.loading;
  const decoding = options.decoding === undefined ? 'async' : options.decoding;
  const attributes = [
    `src="${image.src}"`,
    `alt="${escapeAttribute(options.alt === undefined ? image.alt : options.alt)}"`,
    `width="${image.width}"`,
    `height="${image.height}"`
  ];
  if (loading) attributes.push(`loading="${loading}"`);
  if (decoding) attributes.push(`decoding="${decoding}"`);
  if (options.fetchpriority) attributes.push(`fetchpriority="${options.fetchpriority}"`);
  if (options.className) attributes.push(`class="${escapeAttribute(options.className)}"`);
  return `<img ${attributes.join(' ')}>`;
}

module.exports = { siteImages, doctorPortraits, topicImage };
