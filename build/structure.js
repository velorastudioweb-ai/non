'use strict';

// Canonical route registry. Existing authored content remains in content/library;
// this is the only assembly point used by the generator and route verification.
const { site, home, pages } = require('./content');
const { libraryPages } = require('./library');
const { articles } = require('./blog');
const publishedBlogs = require('./published-blogs');
const { contact, legal } = require('./extra-pages');
const { siteImages, topicImage } = require('./site-images');
const clone = (value) => JSON.parse(JSON.stringify(value));
const source = new Map(pages.concat(libraryPages).map((p) => [p.url, p]));
const get = (url) => {
  if (!source.has(url)) throw new Error('Missing source content: ' + url);
  return clone(source.get(url));
};
const sections = [
  { label: 'Surgical Breast Enlargement', href: '/surgical-breast-enlargement/' },
  { label: 'Non-Surgical Breast Enlargement', href: '/non-surgical-breast-enlargement/' },
  { label: 'Education & Research', href: '/education-research/' }
];
const surgical = [
  ['/surgical/breast-augmentation/', 'Breast Augmentation: Implants & Fat Transfer'],
  ['/breast-implants/', 'Breast Implants: Types, Placement & Long-Term Reality'],
  ['/breast-implant-safety/', 'Breast Implant Safety: Rupture, ALCL, Contracture & Monitoring'],
  ['/surgical/fat-transfer-breast-augmentation/', 'Fat Transfer Breast Augmentation: What to Know'],
  ['/surgical/breast-lift/', 'Breast Lift Surgery (Mastopexy): Shape, Scars & Longevity'],
  ['/surgical/breast-revision/', 'Breast Revision Surgery: Implant Exchange, Removal & Repair'],
  ['/surgical/breast-filler-removal/', 'Breast Filler Removal: Clearing Injected Fillers & Silicone'],
  ['/surgical/breast-reduction/', 'Breast Reduction Surgery: Benefits, Techniques & Recovery'],
  ['/surgical/mastectomy-chest-surgery/', 'Mastectomy & Chest Contouring Surgery: Patient Information']
];
const nonsurgical = [
  ['/breast-enlargement-without-surgery/', 'Breast Enlargement Without Surgery: What Works — Evidence Guide'],
  ['/non-surgical/', 'Non-Surgical Breast Enhancement: Options & Safety'],
  ['/non-surgical/dermal-fillers/', 'Breast Fillers: Safety, Evidence & Alternatives'],
  ['/non-surgical/breast-threads/', 'Breast Thread Procedures: Uses & Limitations'],
  ['/non-surgical/mono-threads/', 'Mono Threads: Uses and Limitations'],
  ['/non-surgical/prp/', 'PRP and Breast Enhancement: Evidence Explained'],
  ['/non-surgical/biostimulators/', 'Biostimulators: Collagen-Stimulating Treatments'],
  ['/non-surgical/sculptra-plla/', 'Sculptra and PLLA: Uses, Safety & Evidence'],
  ['/non-surgical/regenerative-medicine/', 'Stem Cells and Regenerative Medicine']
];
const education = [
  ['/understanding-breast-enlargement/', 'Understanding Breast Enlargement: An Evidence-Aware Overview'],
  ['/breast-anatomy/', 'Breast Anatomy Explained: Tissue, Ligaments and Blood Supply'],
  ['/breast-enhancement-comparison/', 'Breast Enhancement Options Compared: Surgical vs Non-Surgical'],
  ['/breast-enlargement-safety/', 'Breast Enlargement Safety: Candidacy, Risks and Warning Signs'],
  ['/research/', 'Breast Enlargement Research Library'],
  ['/references/', 'Clinical Studies, Reviews and Research References'],
  ['/glossary/', 'Glossary of Medical Terms'],
  ['/faqs/', 'Frequently Asked Questions']
];
const redirects = [
  { from: '/surgical-breast-enhancement/', to: sections[0].href },
  { from: '/choosing-a-surgeon/', to: '/breast-enlargement-safety/#choosing-a-surgeon' },
  { from: '/breast-enlargement-research/', to: '/research/#pubmed' },
  { from: '/research/breast-enlargement/', to: '/research/#pmc' }
];

function contentBlocks(page) { return page.blocks.filter((b) => b.type !== 'cta'); }
function articleSections(slug, indices) {
  const a = articles.find((x) => x.slug === slug);
  if (!a) throw new Error('Missing article ' + slug);
  return { type: 'prose', html: a.body.filter((_, i) => !indices || indices.includes(i))
    .map(([h, text]) => '<h2 class="h3">' + h + '</h2>' + text).join('') };
}
const topicPages = surgical.concat(nonsurgical, education.filter(([u]) => u !== '/research/')).map(([url, title]) => {
  const p = get(url);
  p.h1 = title;
  p.seoTitle = title + ' | Quantum Health';
  return p;
});
const byUrl = new Map(topicPages.map((p) => [p.url, p]));
const append = (url, block) => byUrl.get(url).blocks.push(block);
// Recover the unique scar-care content from the abandoned wiki implementation.
const fs = require('fs');
const path = require('path');
const { parseFrontMatter, markdownToHtml } = require('./markdown');
const scars = parseFrontMatter(fs.readFileSync(path.join(__dirname, '..', 'content', 'sections', 'breast-augmentation-scars.md'), 'utf8'));
append('/surgical/breast-augmentation/', { type: 'group', id: 'scars', heading: 'Incision sites, scar healing and aftercare', blocks: [
  { type: 'prose', html: markdownToHtml(scars.body.replace(/^\|\s*---.*\|\s*$/gm, '')) },
  { type: 'faq', id: 'scar-faq', heading: 'Scar-care questions', items: scars.data.faq.map((f) => ({ q: f.q, a: '<p>' + f.a + '</p>' })) },
  { type: 'notice', title: 'Scar-care source references', icon: 'evidence', text: '<ul>' + scars.data.references.map((r) => '<li>' + r + '</li>').join('') + '</ul>' }
] });

// Consolidate the articles by meaning: retain their unique questions/discussion,
// rather than reprinting summaries already present on the clinical topic pages.
append('/breast-enhancement-comparison/', articleSections('surgical-vs-non-surgical-breast-enhancement'));
append('/non-surgical/prp/', articleSections('prp-and-breast-enhancement-what-the-evidence-says', [1, 2]));
append('/breast-enlargement-safety/', articleSections('ten-questions-to-ask-at-a-breast-enhancement-consultation'));
append('/breast-implants/', articleSections('before-choosing-breast-implants', [0, 1]));
append('/non-surgical/dermal-fillers/', articleSections('breast-fillers-sculptra-and-biostimulators-safety-questions', [2]));
const blogTargets = [
  '/breast-enhancement-comparison/', '/breast-implants/', '/non-surgical/prp/',
  '/breast-enlargement-safety/', '/non-surgical/dermal-fillers/', '/breast-enlargement-without-surgery/'
];
articles.forEach((a, i) => {
  redirects.push({ from: '/blogs/' + a.slug + '/', to: blogTargets[i] });
  // Preserve the original reference wording and attribution, even where an
  // article only supplied a publisher name rather than an actual link.
  append(blogTargets[i], { type: 'notice', icon: 'evidence', title: 'Further reading from the consolidated article',
    text: '<ul>' + a.references.map((r) => '<li>' + r + '</li>').join('') + '</ul>' });
});
const safety = byUrl.get('/breast-enlargement-safety/');
const surgeonGuide = contentBlocks(get('/choosing-a-surgeon/'));
if (surgeonGuide[0] && surgeonGuide[0].type === 'prose') {
  surgeonGuide[0].id = 'choosing-a-surgeon';
  surgeonGuide[0].html = '<h2>Choosing a qualified surgeon</h2>' + surgeonGuide[0].html;
} else {
  surgeonGuide.unshift({ type: 'prose', id: 'choosing-a-surgeon', html: '<h2>Choosing a qualified surgeon</h2>' });
}
safety.blocks.push(...surgeonGuide);
// The shared FAQ answers cross-category questions. Treatment-specific answers
// already live in their guides and are linked here instead of repeated.
const sharedFaq = byUrl.get('/faqs/');
sharedFaq.blocks.find((b) => b.type === 'faq').id = 'shared-faq';
sharedFaq.blocks.find((b) => b.type === 'faq').items = sharedFaq.blocks.find((b) => b.type === 'faq').items.filter((_, i) => [0, 3, 6].includes(i));
sharedFaq.blocks.push({ type: 'prose', html: '<h2>Questions about an individual option</h2><p>Read the dedicated FAQs for <a href="/non-surgical/dermal-fillers/">fillers</a>, <a href="/non-surgical/prp/">PRP</a>, <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer</a> and <a href="/surgical/breast-augmentation/">augmentation and recovery</a>.</p>' });
const augmentation = byUrl.get('/surgical/breast-augmentation/');
augmentation.blocks.filter((b) => b.type === 'faq').forEach((b) => {
  b.items = b.items.filter((i) => i.q !== 'How do I know which approach is right for me?');
});

// The options/safety topic is distinct from its new category landing page.
// Remove the old duplicate topic grid; the category is the single topic index.
const nsOverview = byUrl.get('/non-surgical/');
nsOverview.blocks = nsOverview.blocks.filter((b) => b.type !== 'cards');
nsOverview.blocks.unshift({ type: 'prose', html: '<p>For the individual evidence guides, explore the <a href="/non-surgical-breast-enlargement/">Non-Surgical Breast Enlargement section</a>.</p>' });

const publishers = [
  ['cochrane', 'cochranePage', 'cochrane', 'Cochrane systematic reviews and protocols'],
  ['fda', 'fdaPage', 'fda', 'U.S. FDA — regulator guidance'],
  ['nhs', 'nhsPage', 'nhs', 'NHS — UK patient information'],
  ['healthdirect', 'healthdirectPage', 'healthdirect', 'healthdirect — Australian health information'],
  ['clevelandclinic', 'clevelandClinicPage', 'clevelandclinic', 'Cleveland Clinic — external patient education'],
  ['asps', 'aspsPage', 'asps', 'American Society of Plastic Surgeons'],
  ['bapras', 'baprasPage', 'bapras', 'British Association of Plastic, Reconstructive and Aesthetic Surgeons'],
  ['baaps', 'baapsPage', 'baaps', 'British Association of Aesthetic Plastic Surgeons'],
  ['statpearls', 'statPearlsPage', 'statpearls', 'StatPearls — NCBI Bookshelf clinical review'],
  ['medlineplus', 'medlinePlusPage', 'medlineplus', 'MedlinePlus — National Library of Medicine'],
  ['wikipedia', 'wikipediaPage', 'wikipedia', 'Wikipedia — enlargement encyclopedia reference'],
  ['wikipedia-augmentation', 'wikipediaAugmentationPage', 'wikipediaaug', 'Wikipedia — augmentation encyclopedia reference']
];
const research = get('/breast-enlargement-research/');
research.url = '/research/';
research.slug = 'research';
research.h1 = 'Breast Enlargement Research Library';
research.seoTitle = research.h1 + ' | Quantum Health';
research.seoDescription = 'Published breast enlargement studies, systematic reviews, regulator guidance and searchable PMC citations, with external source attribution and evidence limitations.';
research.bannerLead = 'An independent reading guide to external research and patient information. These studies and source publications are not Quantum Health research.';
research.blocks = [
  { type: 'notice', icon: 'evidence', title: 'External research, clearly attributed', text: 'Quantum Health provides educational summaries, not original clinical research. Publication does not prove effectiveness. Read each source in context, check its date and jurisdiction, and distinguish a registered protocol from a completed review.' },
  { type: 'prose', html: '<nav class="source-index" aria-label="Research collections"><a href="#pubmed">PubMed study summaries</a> · <a href="#pmc">Search PMC records</a> · ' + publishers.map(([, , id, title]) => '<a href="#' + id + '">' + title + '</a>').join(' · ') + '</nav>' },
  { type: 'group', id: 'pubmed', heading: 'PubMed: topic-grouped study findings', open: true, blocks: contentBlocks(research) },
  { type: 'group', id: 'pmc', heading: 'PubMed Central: searchable citation archive', open: true, blocks: contentBlocks(clone(require('./research').researchPage)) }
];
publishers.forEach(([module, exported, id, title]) => {
  const p = clone(require('./' + module)[exported]);
  redirects.push({ from: p.url, to: '/research/#' + id });
  // Source documents use common fragment names such as doc-complications.
  // Namespace them when combining collections into one HTML document.
  p.blocks = JSON.parse(JSON.stringify(p.blocks)
    .replace(/id=\\"([^"\\]+)\\"/g, (_, anchor) => 'id=\\"' + id + '-' + anchor + '\\"')
    .replace(/href=\\"#([^"\\]+)\\"/g, (_, anchor) => 'href=\\"#' + id + '-' + anchor + '\\"'));
  p.blocks.forEach((b) => { if (b.id) b.id = id + '-' + b.id; });
  research.blocks.push({ type: 'group', id, heading: title, blocks: contentBlocks(p) });
});
topicPages.push(research);
byUrl.set(research.url, research);

function cards(entries, heading, lead) {
  return { type: 'cards', cols: 3, heading, lead, items: entries.map(([href, title]) => {
    const p = byUrl.get(href);
    const imageKey = {
      '/breast-implants/': 'breastImplants',
      '/surgical/breast-augmentation/': 'breastAugmentation',
      '/breast-implant-safety/': 'breastImplantSafety',
      '/surgical/fat-transfer-breast-augmentation/': 'fatTransfer'
    }[href];
    const media = imageKey ? topicImage(imageKey) : undefined;
    return { title, href, text: p.seoDescription, slot: title, media };
  }) };
}
function landing(section, title, lead, blocks, slug) {
  return { url: section.href, slug, h1: title, seoTitle: title + ' | Quantum Health',
    seoDescription: lead, bannerLead: lead, bannerEyebrow: 'Independent patient education',
    breadcrumb: [{ label: title }], blocks,
    schema: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url: site.url + section.href }] };
}
const oldSurgical = get('/surgical-breast-enhancement/');
const surgicalIntro = contentBlocks(oldSurgical).filter((b) => b.type === 'prose');
const surgicalGuidance = contentBlocks(oldSurgical).filter((b) => b.type !== 'cards' && b.type !== 'prose');
const landings = [
  landing(sections[0], sections[0].label, oldSurgical.bannerLead, [
    ...surgicalIntro,
    cards(surgical.slice(0, 4), 'Breast enlargement: implants and fat transfer'),
    { type: 'notice', icon: 'info', title: 'Related surgical procedures', text: 'A lift changes shape and position; reduction removes tissue; mastectomy removes breast tissue for specific clinical or chest-contouring goals. These are not breast enlargement procedures. Revision and filler-removal surgery address previous procedures and their complications.' },
    cards(surgical.slice(4), 'Related surgery: shape, correction, reduction and chest contouring'),
    ...surgicalGuidance
  ], 'surgical-breast-enhancement'),
  landing(sections[1], sections[1].label, 'Understand what changes appearance, what has evidence for lasting volume, and which breast-enlargement claims are unsupported or unsafe.', [
    { type: 'notice', icon: 'safety', title: 'Non-surgical does not mean proven or safe', text: 'Fillers are not FDA-approved for breast enlargement. Facial approval does not establish breast-use approval. Threads, PRP, biostimulators and regenerative products should not be presented as proven substitutes for augmentation. Fat transfer is surgery, even though it does not use an implant.' },
    cards(nonsurgical, 'Non-surgical options: evidence, limitations and safety')
  ], 'non-surgical'),
  landing(sections[2], 'General Education & Research', 'Shared information on anatomy, comparisons, candidacy, warning signs and the external evidence behind surgical and non-surgical options.', [
    { type: 'notice', icon: 'info', title: 'Education before a personal decision', text: 'These resources provide general education, not individual medical advice. Research is attributed to its external authors and publishers; no treatments or clinical consultations are offered by this website.' },
    cards(education, 'Learn, compare and read the evidence')
  ], 'education-research')
];
landings[0].bannerImage = siteImages.surgicalOverview.src;
landings[0].bannerWidth = siteImages.surgicalOverview.width;
landings[0].bannerHeight = siteImages.surgicalOverview.height;
landings[1].bannerImage = siteImages.nonSurgicalHero.src;
landings[1].bannerWidth = siteImages.nonSurgicalHero.width;
landings[1].bannerHeight = siteImages.nonSurgicalHero.height;
const topicMembership = new Map();
[surgical, nonsurgical, education].forEach((entries, i) => entries.forEach(([url]) => topicMembership.set(url, i)));
topicPages.forEach((p) => {
  const section = sections[topicMembership.get(p.url)];
  p.sectionUrl = section.href;
  p.bannerEyebrow = section.label;
  p.breadcrumb = [{ label: section.label, href: section.href }, { label: p.h1 }];
  // Detailed guidance comes before FAQs; shared related links remain last.
  const topicBlocks = contentBlocks(p);
  const faqBlocks = topicBlocks.filter((b) => b.type === 'faq');
  p.blocks = topicBlocks.filter((b) => b.type !== 'faq').concat(faqBlocks);
  p.blocks.push({ type: 'cards', cols: 3, eyebrow: 'Continue reading', heading: 'Related education', items: [
    { title: section.label, href: section.href, text: 'Return to the full category guide.' },
    { title: 'Safety and warning signs', href: '/breast-enlargement-safety/', text: 'Candidacy, risks and when to seek medical help.' },
    { title: 'External research and sources', href: '/research/', text: 'Study findings, limitations and original publications.' }
  ].filter((i) => i.href !== p.url) });
  p.schema = [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: p.h1, url: site.url + p.url, isPartOf: { '@type': 'CollectionPage', url: site.url + section.href } }];
});

const finalHome = clone(home);
const pathways = finalHome.blocks.find((b) => b.id === 'treatments');
Object.assign(pathways, { cols: 3, eyebrow: 'Three educational sections', heading: 'Find your starting point', lead: 'Explore the options, then compare the evidence and safety considerations.', items: sections.map((s, i) => ({ title: s.label, href: s.href, text: landings[i].seoDescription, media: i === 0 ? topicImage('surgicalOptions', { alt: 'Surgical Breast Enlargement' }) : i === 1 ? topicImage('nonSurgicalOverview', { alt: 'Non-Surgical Breast Enlargement' }) : i === 2 ? topicImage('educationResearch', { alt: 'Education and Research' }) : undefined, slot: undefined })) });
// Replace duplicate article and publisher archives on the home page with the
// canonical shared-education links; detailed topic content stays on its page.
finalHome.blocks = finalHome.blocks.filter((b) => !['Education and insights', 'Research & sources'].includes(b.eyebrow));
const foundationCards = cards(education.slice(0, 4), 'A clear foundation for your decision');
foundationCards.items[0].media = topicImage('breastEducation', { alt: 'Understanding Breast Enlargement' });
foundationCards.items[1].media = topicImage('breastAnatomy', { alt: 'Breast Anatomy Explained' });
foundationCards.items[2].media = topicImage('compareOptions', { alt: 'Breast Enhancement Options Compared' });
foundationCards.items[3].media = topicImage('breastSafety', { alt: 'Breast Enlargement Safety' });
finalHome.blocks.push(foundationCards);
const homeOrder = [
  (b) => b.type === 'hero',
  (b) => b.id === 'treatments',
  (b) => b.eyebrow === 'Our approach',
  (b) => b.eyebrow === 'Our principles',
  (b) => b.title === 'An important clinical distinction',
  (b) => b.eyebrow === 'Treatments',
  (b) => b.eyebrow === 'How to use this website',
  (b) => b.heading === 'A clear foundation for your decision',
  (b) => b.type === 'cta'
];
finalHome.blocks = homeOrder.flatMap((match) => finalHome.blocks.filter(match));
const quantumHealth = require('./quantum-health');

function extractQuantumBody(page) {
  const html = page.blocks[0].html;
  const wrapper = '<main class="qh"><div class="qh-wrap">';
  const note = '<p class="qh-note">Medical services and promotional information require appropriate professional assessment and verification before publication. No treatment outcome is guaranteed.</p>';
  const wrapperStart = html.indexOf(wrapper);
  if (wrapperStart < 0 || !html.endsWith('</div></main>')) {
    throw new Error('Unexpected Quantum Health page structure: ' + page.url);
  }
  return {
    body: html.slice(wrapperStart + wrapper.length)
      .replace(note, '')
      .replace(/<\/div><\/main>$/, '')
      .replace(/<h1>/g, '<h2>').replace(/<\/h1>/g, '</h2>')
  };
}
const doctorDirectory = extractQuantumBody(quantumHealth.pages.find((p) => p.url === '/doctors/'));
const escapeAboutText = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const aboutHero = `<header class="qh-about-hero"><div><nav class="qh-about-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">About</span></nav><p class="eyebrow">Independent education</p><h1>About this website</h1><p>An independent resource on breast-enlargement options, the evidence behind them, and important limits and safety questions. This website does not provide treatment or medical consultations.</p></div><nav class="qh-about-links" aria-label="About sections"><a href="#our-doctors"><span>01</span><strong>Our Doctors</strong><span aria-hidden="true">↘</span></a><a href="#leadership"><span>02</span><strong>Leadership</strong><span aria-hidden="true">↘</span></a></nav></header>`;
const aboutDoctorCards = quantumHealth.doctors.map((doctor) => {
  const initials = doctor.name.replace(/^Dr\.\s*/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const expertise = (doctor.specialisations && doctor.specialisations.length ? doctor.specialisations : [doctor.designation])
    .flatMap((item) => String(item || '').split('|'))
    .map((item) => item.trim())
    .filter((item) => item && !/\bexpert\b/i.test(item));
  const qualifications = doctor.qualifications.length ? doctor.qualifications : (doctor.suppliedQualifications || []);
  const expertiseList = `<ul>${expertise.map((item) => `<li>${escapeAboutText(item)}</li>`).join('')}</ul>`;
  const qualificationList = qualifications.length
    ? `<ul>${qualifications.map((item) => `<li>${escapeAboutText(item)}</li>`).join('')}</ul>`
    : '<p class="qh-doctor-card__empty">No qualifications are listed in the supplied profile.</p>';
  const portrait = doctor.portrait
    ? `<img class="qh-portrait-image qh-doctor-card__image" src="${escapeAboutText(doctor.portrait.src)}" alt="Portrait of ${escapeAboutText(doctor.name)}" width="${doctor.portrait.width}" height="${doctor.portrait.height}" loading="lazy" decoding="async">`
    : `<div class="qh-portrait" aria-hidden="true"><span>${escapeAboutText(initials)}</span></div>`;
  return `<article class="qh-card qh-doctor-card">${portrait}<h3>${escapeAboutText(doctor.name)}</h3><div class="qh-doctor-card__details"><div><h4>Profile-listed expertise</h4>${expertiseList}</div><div><h4>Profile-listed qualifications</h4>${qualificationList}</div></div><div class="qh-actions"><a class="qh-btn" href="${escapeAboutText(doctor.profileUrl)}">View profile</a></div></article>`;
}).join('');
const aboutBody = `${aboutHero}
  <section id="our-doctors" aria-labelledby="our-doctors-heading">
    <div class="qh-about-section-head"><div><p class="eyebrow">Reference profiles</p><h2 id="our-doctors-heading">Our Doctors</h2></div><p class="qh-about-note">Names, profile-listed expertise, and qualifications are transcribed from supplied profiles for reference only. They have not been independently verified. This website does not represent or endorse the clinicians listed, provide treatment, or arrange appointments. Check credentials and affiliations with the relevant professional registers.</p></div>
    <div class="qh-grid">${aboutDoctorCards}</div>
  </section>
  <section id="leadership" class="qh-about-leadership" aria-labelledby="leadership-heading">
    <p class="eyebrow">Leadership reference</p><div class="qh-portrait" aria-hidden="true"><span>SD</span></div><div><h2 id="leadership-heading">Dr. Sunitha Devaraj</h2><p class="qh-about-note">The supplied material includes a leadership profile under this name. This educational website does not verify a current role, professional affiliation, or credentials.</p></div>
  </section>
  <section id="contact" class="qh-about-contact" aria-labelledby="about-contact-heading">
    <div><p class="eyebrow">Stay in touch</p><h2 id="about-contact-heading">Questions or corrections?</h2><p class="qh-about-note">Contact us about website content, sources, or accessibility.</p></div><a class="qh-btn" href="/contact/">Contact us</a>
  </section>`;
const about = get('/about-us/');
about.h1 = 'About this website';
about.seoTitle = 'About this website | Breast Enlargement Guide';
about.seoDescription = 'Learn about this independent educational website on breast-enlargement options, evidence, limitations, and safety.';
about.bannerEyebrow = 'Independent education';
about.bannerLead = 'An evidence-aware guide to breast-enlargement options, limitations, and safety.';
about.showBanner = false;
about.schema = [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: about.h1, url: site.url + '/about-us/' }];
about.blocks = [{ type: 'prose', wide: true, html: '<div class="qh qh-about"><div class="qh-wrap">' + aboutBody + '</div></div>' }];
const doctorProfiles = quantumHealth.pages.filter((p) => p.url.startsWith('/doctors/') && p.url !== '/doctors/');
const blogCards = publishedBlogs.articles.map((a) => `<article class="blog-card" data-category="${a.category}" data-search="${(a.title+' '+a.category+' '+a.description+' '+a.keyword).toLowerCase()}"><img src="${a.image}" alt="" width="${a.imageWidth}" height="${a.imageHeight}" loading="lazy" decoding="async"><div><p class="eyebrow">${a.category}</p><h2><a href="/blogs/${a.slug}/">${a.title}</a></h2><p>${a.description}</p><p class="blog-meta">${a.date} · 8 min read</p><a class="text-link" href="/blogs/${a.slug}/">Read article</a></div></article>`).join('');
const blogsIndex = { url: '/blogs/', slug: 'blogs', h1: 'Breast Enlargement Blogs', showBanner: false, seoTitle: 'Breast Enlargement Blogs | Quantum Health', seoDescription: 'Evidence-aware breast enlargement education and illustrative patient-perspective articles.', breadcrumb: [{ label: 'Blogs' }], schema: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Breast Enlargement Blogs', url: site.url + '/blogs/' }], blocks: [{ type: 'prose', wide: true, html: '' }] };
finalHome.schema[0].name = site.name;
// Keep the interactive listing semantic and theme-neutral. Styling is shared in
// components.css so this page cannot introduce a light-card colour scheme.
function blogIndexMarkup() {
  return `<div class="blog-hub">
    <p class="eyebrow">Independent patient education</p>
    <h1>Breast Enlargement Blogs</h1>
    <p class="lead">Clear, evidence-aware articles about options, safety, recovery and decision-making. Patient-perspective pieces are fictional educational scenarios, never testimonials.</p>
    <div class="blog-tools">
      <label for="blog-search">Search articles</label>
      <input id="blog-search" type="search" placeholder="Search by topic or category" aria-describedby="blog-results">
      <div class="blog-tabs" role="group" aria-label="Filter articles by category">
        <button type="button" data-blog-filter="All Articles" aria-controls="blog-grid" aria-pressed="true">All Articles</button>
        <button type="button" data-blog-filter="Breast Enlargement Education" aria-controls="blog-grid" aria-pressed="false">Breast Enlargement Education</button>
        <button type="button" data-blog-filter="Patient Perspectives" aria-controls="blog-grid" aria-pressed="false">Patient Perspectives</button>
      </div>
    </div>
    <p id="blog-results" class="blog-meta" role="status" aria-live="polite">${publishedBlogs.articles.length} articles</p>
    <div class="blog-grid" id="blog-grid">${blogCards}</div>
  </div>`;
}
blogsIndex.blocks[0].html = blogIndexMarkup();
const allPages = [finalHome, ...landings, ...topicPages, blogsIndex, ...publishedBlogs.pages, about, clone(contact), ...clone(legal), ...doctorProfiles];
const finalSite = clone(site);
const menuLabel = (title) => title.split(':')[0];
finalSite.nav = [
  { label: 'Home', href: '/' },
  ...sections.map((s, i) => ({
    ...s,
    shortLabel: ['Surgical', 'Non-surgical', 'Education & Research'][i],
    children: [surgical, nonsurgical, education][i].map(([href, label]) => ({ href, label: menuLabel(label) }))
  })),
  { label: 'Blogs', href: '/blogs/' },
  { label: 'About', href: '/about-us/' },
  { label: 'Contact us', href: '/contact/' }
];
finalSite.footerExplore = sections;
finalSite.footerPatient = education.filter(([u]) => ['/breast-enlargement-safety/', '/research/', '/references/', '/glossary/', '/faqs/'].includes(u)).map(([href, label]) => ({ href, label }));
finalSite.medicalDisclaimerShort = '';

// Apply canonical replacements to every nested content field (including authored
// HTML). The registry is shared by redirects and the generator, avoiding drift.
const retired = require('./retired-routes');
redirects.push(...retired);
redirects.push(
  { from: '/doctors/', to: '/about-us/#our-doctors' },
  { from: '/leadership/dr-sunitha-devaraj/', to: '/about-us/#leadership' }
);
redirects.push(
  { from: '/wiki/breast-augmentation-scars/', to: '/surgical/breast-augmentation/#scars' },
  { from: '/wiki/non-surgical-breast-enlargement/', to: '/breast-enlargement-without-surgery/' }
);
const legacyLinks = {
  '/wiki/implant-placement/': '/breast-implants/',
  '/wiki/breast-implant-sizes/': '/breast-implants/',
  '/wiki/glossary/': '/glossary/',
  '/wiki/breast-augmentation-recovery/': '/surgical/breast-augmentation/',
  '/wiki/breast-augmentation-risks/': '/breast-implant-safety/',
  '/wiki/fat-transfer-breast-augmentation/': '/surgical/fat-transfer-breast-augmentation/',
  '/wiki/breast-implant-revision/': '/surgical/breast-revision/',
  '/wiki/breast-augmentation-surgery/': '/surgical/breast-augmentation/'
};
const map = new Map(redirects.map((r) => [r.from, r.to]));
Object.entries(legacyLinks).forEach(([from, to]) => map.set(from, to));
function canonical(url) {
  const [route, hash] = url.split('#');
  const target = map.get(route);
  if (!target) return url;
  const next = canonical(target);
  return next.includes('#') || !hash ? next : next + '#' + hash;
}
redirects.forEach((r) => { r.to = canonical(r.to); });
function rewrite(value) {
  if (typeof value === 'string') {
    if (value.startsWith('/') && !value.includes(' ')) return canonical(value);
    return value.replace(/(href=")[^"]+(?=")/g, (match) => 'href="' + canonical(match.slice(6)));
  }
  if (Array.isArray(value)) return value.map(rewrite);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewrite(v)]));
  return value;
}
// Deduplicate exact repeated blocks after canonical link rewriting, preserving
// distinct findings even when their topic is the same.
function dedupe(blocks) {
  const seen = new Set();
  return blocks.filter((b) => {
    if (b.blocks) b.blocks = dedupe(b.blocks);
    const key = JSON.stringify(b);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}
const canonicalPages = rewrite(allPages);
canonicalPages.forEach((p) => { p.blocks = dedupe(p.blocks); });
module.exports = { allPages: canonicalPages, site: rewrite(finalSite), sections, surgical, nonsurgical, education, redirects };
