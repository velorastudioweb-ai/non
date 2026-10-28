'use strict';

// Canonical local assets for repeatable topic cards and page banners.  Keep
// topic imagery here so a topic is not given a different illustration each
// time it appears in the static site.
const topicImages = Object.freeze({
  surgical: '/breast-augmentation-implants-fat-transfer.png',
  nonSurgical: '/nonsurgical-breast-enlargement-banner.png',
  augmentation: '/breast-augmentation-implants-fat-transfer.png',
  implants: '/implants.webp',
  fatTransfer: '/fat-transfer.webp',
  breastLift: '/Breast Augmentation Consultation Illustration.webp',
  fillers: '/dermal-fillers.webp',
  prp: '/prp.webp',
  threads: '/threads.webp',
  sculptra: '/sculptra.webp',
  anatomy: '/Breast Anatomy and Augmentation Illustration.webp',
  safety: '/Breast Augmentation Safety Consultation Infographic.webp',
  research: '/Breast Enhancement Medical Infographic.webp',
  comparison: '/Breast Enhancement Options Infographic.webp',
  understanding: '/Breast Enhancement Medical Infographic.webp'
});

const routeImageKeys = Object.freeze({
  '/surgical-breast-enlargement/': 'surgical',
  '/non-surgical-breast-enlargement/': 'nonSurgical',
  '/surgical/breast-augmentation/': 'augmentation',
  '/breast-implants/': 'implants',
  '/surgical/fat-transfer-breast-augmentation/': 'fatTransfer',
  '/surgical/breast-lift/': 'breastLift',
  '/non-surgical/dermal-fillers/': 'fillers',
  '/non-surgical/prp/': 'prp',
  '/non-surgical/breast-threads/': 'threads',
  '/non-surgical/mono-threads/': 'threads',
  '/non-surgical/sculptra-plla/': 'sculptra',
  '/non-surgical/biostimulators/': 'sculptra',
  '/breast-anatomy/': 'anatomy',
  '/breast-enlargement-safety/': 'safety',
  '/research/': 'research',
  '/breast-enhancement-comparison/': 'comparison',
  '/understanding-breast-enlargement/': 'understanding',
  '/breast-enlargement-without-surgery/': 'nonSurgical'
});

function topicImageFor(url) {
  return topicImages[routeImageKeys[url]] || null;
}

module.exports = { topicImages, routeImageKeys, topicImageFor };
