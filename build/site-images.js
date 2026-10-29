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
  surgicalOptions: { src: '/surgical.webp', width: 1254, height: 1254, alt: 'Surgical breast enlargement options' },
  nonSurgicalOverview: { src: '/non surgical.webp', width: 1254, height: 1254, alt: 'Non-surgical breast enlargement evidence overview' },
  nonSurgicalHero: { src: '/Non-Surgical Breast Enhancement Infographic.png', width: 2048, height: 768, alt: 'Non-surgical breast enhancement evidence overview' },
  educationResearch: { src: '/prp.webp', width: 1254, height: 1254, alt: 'Breast enlargement education and research' },
  dermalFillers: { src: '/dermal-fillers.webp', width: 1254, height: 1254, alt: 'Breast dermal fillers' },
  prp: { src: '/education-research.webp', width: 1536, height: 1024, alt: 'Platelet-rich plasma evidence review' },
  threadProcedures: { src: '/fat-transfer.webp', width: 1254, height: 1254, alt: 'Thread-based breast procedure information' },
  sculptraBiostimulators: { src: '/sculptra.webp', width: 1254, height: 1254, alt: 'Sculptra and biostimulator information' },
  // The supplied infographic is the user's current approved visual for both
  // implant and fat-transfer treatment cards. Keep the shared source explicit.
  breastImplants: { src: '/Breast Fat Transfer Medical Infographic.png', width: 1254, height: 1254, alt: 'Breast implants' },
  fatTransfer: { src: '/Breast Fat Transfer Medical Infographic.png', width: 1254, height: 1254, alt: 'Fat transfer breast augmentation' },
  breastAugmentation: { src: '/Breast Augmentation Options Infographic.png', width: 1536, height: 1024, alt: 'Breast augmentation options' },
  breastAugmentationPlanning: { src: '/breast-augmentation-implants-fat-transfer.png', width: 376, height: 362, alt: 'Breast augmentation planning' },
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
  subramini: { src: '/dr-subramini.png', width: 376, height: 362 },
  sekhar: { src: '/dr-sekhar.png', width: 382, height: 372 },
  nandita: { src: '/dr-nandita.png', width: 377, height: 370 },
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
