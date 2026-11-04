'use strict';
/* Seed the CMS database from the generator's authored content.
 * Run after `node scripts/setup-admin.js`:
 *   node scripts/seed-cms.js          (skips documents that already exist)
 *   node scripts/seed-cms.js --force  (overwrite with the current build content)
 * Idempotent: never deletes drafts, published pages, media or enquiries. */

const fs = require('fs');
const path = require('path');

const envFile = path.join(__dirname, '..', '.env.local');
if (!process.env.BLOB_READ_WRITE_TOKEN && fs.existsSync(envFile)) {
  fs.readFileSync(envFile, 'utf8').split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  });
}

const L = require('../api/_qh/lib');
const A = require('../api/_qh/actions');
const { site: genSite } = require('../build/content');
const { locations, CONTACT_EMAIL, WHATSAPP, WHATSAPP_MESSAGE } = require('../build/locations');
const qh = require('../build/quantum-health');
const { redirects } = require('../build/structure');

async function putIfAbsent(name, doc, force) {
  if (!force) {
    const existing = await L.readDoc(name, null);
    if (existing) { console.log('  keep   cms/' + name); return; }
  }
  await L.writeDoc(name, doc);
  console.log('  seed   cms/' + name);
}

(async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) { console.error('BLOB_READ_WRITE_TOKEN missing.'); process.exit(1); }
  const force = process.argv.includes('--force');
  console.log('Seeding CMS documents (force=' + force + ')');

  /* ---- site: contacts, locations, nav, footer, theme, redirects ---- */
  const numbers = [];
  locations.forEach((l) => l.phones.forEach((p) => {
    numbers.push({ id: l.id + '-' + p.tel.replace(/\D/g, ''), display: p.display, tel: p.tel, whatsapp: p.whatsapp || '', branch: l.name });
  }));
  const site = A.validateSite({
    contacts: {
      email: CONTACT_EMAIL,
      phoneDisplay: WHATSAPP.display,
      phoneTel: '+' + WHATSAPP.number,
      whatsappNumber: WHATSAPP.number,
      whatsappDisplay: WHATSAPP.display,
      whatsappMessage: WHATSAPP_MESSAGE,
      numbers
    },
    locations: locations.map((l) => ({
      id: l.id, name: l.name, shortName: l.shortName, role: l.role, country: l.country,
      addressLines: l.addressLines, phones: l.phones.map((p) => ({ display: p.display, tel: p.tel, whatsapp: p.whatsapp || '' })),
      mapQuery: l.mapQuery, hours: '', email: '', note: l.note
    })),
    nav: genSite.nav,
    footer: {
      blurb: genSite.footerBlurb,
      note: 'Location details are supplied by Quantum Health. Clinical services, practitioner availability and opening hours are confirmed directly by the team.',
      explore: genSite.footerExplore,
      patient: genSite.footerPatient,
      legal: genSite.footerLegal,
      social: []
    },
    theme: { colors: {}, goldNav: true, animation: 'full' },
    settings: { whatsappPrefill: WHATSAPP_MESSAGE, siteName: 'Quantum Health', headerCta: { label: 'Request consultation', href: '/contact/#appointment' } }
  });
  site.redirects = redirects.filter((r) => r.to && !/^https?:/.test(r.to)).map((r) => ({ from: r.from, to: r.to, permanent: true }));
  await putIfAbsent('site.json', site, force);

  /* ---- doctors ---- */
  const doctors = A.validateDoctors({
    list: qh.doctors.map((d, i) => ({
      id: d.id, name: d.name, designation: d.designation,
      qualifications: d.qualifications || [], suppliedQualifications: d.suppliedQualifications || [],
      credentialNote: d.credentialNote || '', specialisations: d.specialisations || [],
      experience: d.experience || '', bio: d.id === 'vikas' ? qh.vikasProfile.biography : [],
      locations: d.id === 'vikas' ? ['Hong Kong — Santunman Center', 'Bengaluru — Jayanagar, Koramangala, Swiss Town, HSR Layout, HRBR Layout', 'Dubai, Bahrain, Thailand, Qatar (visiting, subject to confirmed appointments)'] : [],
      awards: [],
      contact: d.id === 'vikas' ? { phone: WHATSAPP.display, whatsapp: 'https://wa.me/' + WHATSAPP.number, email: CONTACT_EMAIL, reference: qh.vikasProfile.reference } : {},
      profileUrl: d.profileUrl, portrait: d.portrait ? { src: d.portrait.src, alt: 'Portrait of ' + d.name, width: d.portrait.width, height: d.portrait.height } : null,
      visible: true, order: i
    }))
  });
  await putIfAbsent('doctors.json', doctors, force);

  /* ---- review queue (safety items moved out of public pages) ---- */
  const queue = { items: [
    { id: 'rq-surgical-subpages', page: 'surgical sub-pages (15)', kind: 'Clinician review', note: 'The public “Before publication: qualified clinician review … required” banners were consolidated here on 2026-11-04. Obtain qualified clinician review and current Indian regulatory verification, then remove this entry. Source links remain on every page under “Sources and references”.' },
    { id: 'rq-vikas-quals', page: 'meet-doctors', kind: 'Medical credentials', note: 'Dr. Vikas Singh: MBBS, MD (Dermatology), fellowships, AAAM (USA), ISHRS are as supplied by the team; verify against original certificates/registers before describing them as verified.' },
    { id: 'rq-subramini', page: 'meet-doctors', kind: 'Medical credentials', note: 'Dr. Subramini: promotional-material qualification line requires verification; remains labelled “verification pending”.' },
    { id: 'rq-awards', page: 'doctors/dr-vikas-singh', kind: 'Awards/affiliations', note: 'Award titles, issuing bodies and dates will be published only after verification (see page section “Awards & Achievements”).' }
  ] };
  await putIfAbsent('review-queue.json', queue, force);

  /* ---- empty companions ---- */
  await putIfAbsent('media/index.json', { assets: [] }, false);
  await putIfAbsent('pages/index.json', { pages: {} }, false);
  await putIfAbsent('components.json', { blocks: [] }, false);
  await putIfAbsent('gallery.json', { items: [], pageSlug: 'understanding-breast-enlargement' }, false);

  console.log('Seed complete.');
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
