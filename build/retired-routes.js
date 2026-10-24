'use strict';
// Historical incoming routes with relevant replacements. Unmatched retired
// pages are served by the existing 404 handler.
module.exports = [
  { from: '/about-dr-vikas-singh/', to: '/about-us/' },
  { from: '/locations/', to: '/about-us/' },
  { from: '/media-and-press/', to: '/about-us/' },
  { from: '/technology-and-medical-standards/', to: '/about-us/' },
  { from: '/patient-photography-consent/', to: '/about-us/' },
  { from: '/our-team/', to: '/breast-enlargement-safety/#choosing-a-surgeon' },
  { from: '/before-after-gallery/', to: '/understanding-breast-enlargement/' },
  { from: '/video-gallery/', to: '/education-research/' },
  { from: '/book-consultation/', to: '/contact/' },
  { from: '/candidacy-and-safety/', to: '/breast-enlargement-safety/' },
  { from: '/surgical/silicone-breast-implants/', to: '/breast-implants/' }
];
