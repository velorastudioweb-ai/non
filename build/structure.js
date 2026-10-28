'use strict';

// Canonical route registry. Existing authored content remains in content/library;
// this is the only assembly point used by the generator and route verification.
const { site, home, pages } = require('./content');
const { libraryPages } = require('./library');
const { articles } = require('./blog');
const publishedBlogs = require('./published-blogs');
const { contact, legal } = require('./extra-pages');
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
    const media = href === '/breast-implants/'
      ? '<img src="/breast-implants-banner.png" alt="Breast implants" width="1254" height="1254" loading="lazy" decoding="async">'
      : href === '/surgical/fat-transfer-breast-augmentation/'
        ? '<img src="/Breast Fat Transfer Medical Infographic.png" alt="Fat transfer breast augmentation" width="1536" height="1024" loading="lazy" decoding="async">'
        : undefined;
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
landings[0].bannerImage = '/Breast Augmentation Consultation Illustration.webp';
landings[0].bannerWidth = 1600;
landings[0].bannerHeight = 600;
landings[1].bannerImage = '/nonsurgical-breast-enlargement-banner.png';
landings[1].bannerWidth = 1600;
landings[1].bannerHeight = 600;
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
Object.assign(pathways, { cols: 3, eyebrow: 'Three educational sections', heading: 'Find your starting point', lead: 'Explore the options, then compare the evidence and safety considerations.', items: sections.map((s, i) => ({ title: s.label, href: s.href, text: landings[i].seoDescription, media: i === 0 ? '<img src="/surgical.webp" alt="Surgical Breast Enlargement" width="1254" height="1254" loading="lazy" decoding="async">' : i === 1 ? '<img src="/non surgical.webp" alt="Non-Surgical Breast Enlargement" width="1254" height="1254" loading="lazy" decoding="async">' : i === 2 ? '<img src="/prp.webp" alt="Education and Research" width="1254" height="1254" loading="lazy" decoding="async">' : undefined, slot: undefined })) });
// Replace duplicate article and publisher archives on the home page with the
// canonical shared-education links; detailed topic content stays on its page.
finalHome.blocks = finalHome.blocks.filter((b) => !['Education and insights', 'Research & sources'].includes(b.eyebrow));
const foundationCards = cards(education.slice(0, 4), 'A clear foundation for your decision');
foundationCards.items[0].media = '<img src="/Breast Enhancement Medical Infographic.webp" alt="Understanding Breast Enlargement" width="1536" height="1024" loading="lazy" decoding="async">';
foundationCards.items[1].media = '<img src="/Breast Anatomy and Augmentation Illustration.webp" alt="Breast Anatomy Explained" width="1536" height="1024" loading="lazy" decoding="async">';
foundationCards.items[2].media = '<img src="/Breast Enhancement Options Infographic.webp" alt="Breast Enhancement Options Compared" width="1536" height="1024" loading="lazy" decoding="async">';
foundationCards.items[3].media = '<img src="/Breast Augmentation Safety Consultation Infographic.webp" alt="Breast Enlargement Safety" width="1536" height="1024" loading="lazy" decoding="async">';
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
finalHome.blocks.push({ type: 'prose', html: '<style>.qh-home{background:#080608;color:#FFF8F8;padding:clamp(2rem,6vw,5rem);border-top:1px solid #C98B91}.qh-home h2,.qh-home h3{font-family:Georgia,serif}.qh-home h2{font-size:clamp(2rem,4vw,3rem)}.qh-home a{color:#FFF8F8}.qh-home .qh-home-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:1rem}.qh-home article{padding:1.2rem;border:1px solid #C98B9170;background:linear-gradient(140deg,#4A071F,#10090d)}.qh-home .qh-pink{color:#F36A99}.qh-home .qh-home-cta{display:inline-block;background:#FF4D91;color:#080608;padding:.8rem 1.1rem;text-decoration:none;font-weight:bold}</style><section class="qh-home"><p class="qh-pink">AESTHETICS | REGENERATIVE | WELLNESS</p><h2>Beauty. Science. Longevity.</h2><p>Science. Nutrition. Aesthetics. For a Longer, Healthier You.</p><h3>LOOK BETTER · FEEL HEALTHIER · LIVE LONGER</h3><p>A Team of Experts, United by a Shared Vision — To Help You Look Better, Feel Healthier and Live More Confidently.</p><p><a class="qh-home-cta" href="/doctors/">OUR DOCTORS PANEL</a>　<a href="/leadership/dr-sunitha-devaraj/">Meet Executive Director Dr. Sunitha Devaraj</a></p><div class="qh-home-grid"><article><h3>Doctors Panel</h3><p>Expertise. Experience. Exceptional Care.</p><a href="/doctors/">Meet the team</a></article><article><h3>Nutrition & Longevity</h3><p>Science. Nutrition. Aesthetics. For a Longer, Healthier You.</p><a href="/leadership/dr-sunitha-devaraj/">Explore leadership</a></article><article><h3>Aesthetic Treatments</h3><p>Personalised care with appropriate professional assessment.</p><a href="/doctors/dr-alisha-khan/">Explore aesthetic expertise</a></article><article><h3>Regenerative & Wellness</h3><p>Long-term wellness grounded in science and comprehensive care.</p><a href="/doctors/">Explore our team</a></article><article><h3>Training & Academy</h3><p>Training Today for a More Beautiful Tomorrow.</p><a href="/doctors/dr-alisha-khan/">Training & Academy</a></article><article><h3>Core Values</h3><p>SCIENCE DRIVEN · COMPREHENSIVE CARE · NATURAL RESULTS · EXPERT TEAM · LONG-TERM WELLNESS</p></article></div><p><a href="/contact/">BOOK CONSULTATION</a></p></section>' });
const homeTeam = finalHome.blocks.find((b) => b.html && b.html.includes('<section class="qh-home">'));
Object.assign(homeTeam, { bleed: true, wide: true });
const quantumHomeStyles = `<style>
.qh-home{--qh-ink:#10070b;--qh-rose:#f36a99;--qh-cream:#fff8f5;position:relative;isolation:isolate;display:flex;align-items:center;width:100%;min-height:100vh;min-height:100svh;margin-block:clamp(-5.5rem,-6vw,-3.25rem);overflow:hidden;padding:clamp(3rem,7vw,6.5rem) clamp(1.25rem,6vw,6rem);border-block:1px solid #c98b9166;background:radial-gradient(ellipse at 50% 0%,#650b2d 0%,#260d18 42%,var(--qh-ink) 78%);color:var(--qh-cream);font-family:Arial,sans-serif;line-height:1.6}
.qh-home *{box-sizing:border-box}
.qh-home::before,.qh-home::after{position:absolute;z-index:-1;pointer-events:none;content:"";border:1px solid #c98b9128;border-radius:50%;aspect-ratio:1}
.qh-home::before{width:min(70vw,900px);top:-30%;left:-22%}
.qh-home::after{width:min(55vw,700px);right:-23%;bottom:-36%;border-color:#f36a9926}
.qh-home__inner{position:relative;width:min(100%,1500px);margin-inline:auto}
.qh-home__hero{max-width:1120px;margin:0 auto clamp(3.5rem,7vw,6.5rem);text-align:center}
.qh-home__eyebrow,.qh-home__section-label{color:var(--qh-rose);font-size:.75rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase}
.qh-home p.qh-home__eyebrow,.qh-home p.qh-home__subtitle,.qh-home p.qh-home__promise,.qh-home p.qh-home__manifesto,.qh-home p.qh-home__number,.qh-home p.qh-home__values-title{color:inherit}
.qh-home p.qh-home__eyebrow,.qh-home p.qh-home__values-title{color:var(--qh-rose)}
.qh-home p.qh-home__subtitle{color:#f3dfe4}
.qh-home p.qh-home__promise{color:#ffdce6}
.qh-home p.qh-home__manifesto{color:#d9c4ca}
.qh-home p.qh-home__number{color:var(--qh-rose)}
.qh-home__eyebrow{display:flex;justify-content:center;align-items:center;gap:.8rem}
.qh-home__eyebrow::before,.qh-home__eyebrow::after{width:clamp(1.5rem,5vw,4rem);height:1px;background:#f36a9980;content:""}
.qh-home__hero h2{margin:1.2rem 0;font-family:Georgia,'Times New Roman',serif;font-size:clamp(3.3rem,8vw,8rem);font-weight:400;letter-spacing:-.065em;line-height:.96;color:var(--qh-cream)}
.qh-home__hero h2 span{color:#e5b6ba}
.qh-home__hero h2 em{color:var(--qh-rose);font-weight:400}
.qh-home__subtitle{max-width:54ch;margin:1.5rem auto 0;color:#f3dfe4;font-family:Georgia,'Times New Roman',serif;font-size:clamp(1.15rem,2vw,1.55rem);line-height:1.45}
.qh-home__promise{display:flex;justify-content:center;flex-wrap:wrap;gap:.65rem 1rem;margin:1.5rem 0 0;color:#ffdce6;font-size:.74rem;font-weight:700;letter-spacing:.14em}
.qh-home__promise span+span::before{margin-right:1rem;color:var(--qh-rose);content:"·"}
.qh-home__manifesto{max-width:72ch;margin:1.4rem auto 0;color:#d9c4ca;font-size:.95rem}
.qh-home__actions{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:.85rem 1.5rem;margin-top:2rem}
.qh-home .qh-home__button{display:inline-flex;justify-content:center;align-items:center;gap:.8rem;min-height:3.25rem;padding:.8rem 1.3rem;border:1px solid var(--qh-rose);background:var(--qh-rose);color:#190910!important;font-size:.76rem;font-weight:800;letter-spacing:.09em;text-decoration:none;text-transform:uppercase;transition:background .2s ease,color .2s ease,transform .2s ease}
.qh-home .qh-home__button:hover{transform:translateY(-2px);background:transparent;color:var(--qh-cream)!important}
.qh-home__leadership{color:var(--qh-cream)!important;font-size:.9rem;font-weight:600;text-decoration-color:#f36a9980;text-underline-offset:.3em}
.qh-home .qh-home__leadership{color:var(--qh-cream)!important}
.qh-home__section-head{display:flex;justify-content:space-between;align-items:end;gap:1rem;margin-bottom:1rem;padding-bottom:.85rem;border-bottom:1px solid #c98b9155}
.qh-home__section-head p{margin:0;color:#cbb6bd;font-size:.78rem}
.qh-home__section-label{margin:0!important;color:var(--qh-rose)!important}
.qh-home__grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.8rem}
.qh-home__card{position:relative;display:flex;min-height:220px;flex-direction:column;align-items:flex-start;padding:1.25rem;border:1px solid #c98b914c;background:linear-gradient(145deg,#ffffff0b,#ffffff03);transition:background .2s ease,border-color .2s ease,transform .2s ease}
.qh-home__card:hover{transform:translateY(-4px);border-color:#f36a99a3;background:linear-gradient(145deg,#650b2d73,#ffffff08)}
.qh-home__number{margin:0 0 1.6rem!important;color:var(--qh-rose)!important;font-size:.7rem;font-weight:700;letter-spacing:.15em}
.qh-home__card h3{margin:0;color:var(--qh-cream)!important;font-family:Georgia,'Times New Roman',serif;font-size:clamp(1.18rem,1.5vw,1.55rem);font-weight:400;line-height:1.18}
.qh-home__card>p:not(.qh-home__number){margin:.65rem 0 1.2rem;color:#d9c4ca;font-size:.82rem;line-height:1.55}
.qh-home__card a{display:inline-flex;align-items:center;gap:.55rem;margin-top:auto;color:#ffdce6!important;font-size:.73rem;font-weight:700;text-decoration:none}
.qh-home__card a span{color:var(--qh-rose);font-size:1rem;transition:transform .2s ease}
.qh-home__card a:hover span{transform:translateX(4px)}
.qh-home .qh-home__button::after,.qh-home .qh-home__leadership::after,.qh-home .qh-home__card a::after{display:none}
.qh-home__bottom{display:grid;grid-template-columns:1fr auto;align-items:center;gap:2rem;margin-top:clamp(2.5rem,5vw,4rem);padding-top:1.35rem;border-top:1px solid #c98b9155}
.qh-home__values-title{margin:0 0 .7rem;color:var(--qh-rose);font-size:.69rem;font-weight:700;letter-spacing:.17em}
.qh-home__values{display:flex;flex-wrap:wrap;gap:.5rem}
.qh-home__values span{padding:.38rem .65rem;border:1px solid #c98b9155;color:#f3dfe4;font-size:.68rem;letter-spacing:.06em}
.qh-home__consult{white-space:nowrap}
.qh-home a:focus-visible{outline:2px solid var(--qh-cream);outline-offset:4px}
@media(max-width:1050px){.qh-home__grid{grid-template-columns:repeat(3,minmax(0,1fr))}.qh-home__card{min-height:200px}}
@media(max-width:680px){.qh-home{padding:3rem 1.15rem}.qh-home__hero{margin-bottom:3rem}.qh-home__hero h2{font-size:clamp(3rem,13vw,5.4rem)}.qh-home__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.65rem}.qh-home__card{min-height:205px;padding:1rem}.qh-home__section-head{align-items:flex-start;flex-direction:column;gap:.25rem}.qh-home__bottom{grid-template-columns:1fr;gap:1.5rem}.qh-home__consult{justify-self:start}}
@media(max-width:430px){.qh-home__grid{grid-template-columns:1fr}.qh-home__card{min-height:170px}.qh-home__number{margin-bottom:.9rem!important}.qh-home__promise{gap:.5rem;font-size:.65rem}.qh-home__promise span+span::before{margin-right:.5rem}}
@media(prefers-reduced-motion:reduce){.qh-home *,.qh-home *::before,.qh-home *::after{scroll-behavior:auto!important;transition:none!important}}
</style>`;
homeTeam.html = `${quantumHomeStyles}
<section class="qh-home" aria-labelledby="qh-home-title"><div class="qh-home__inner">
  <header class="qh-home__hero">
    <p class="qh-home__eyebrow">Aesthetics · Regenerative · Wellness</p>
    <h2 id="qh-home-title">Beauty. <span>Science.</span> <em>Longevity.</em></h2>
    <p class="qh-home__subtitle">Science. Nutrition. Aesthetics. For a Longer, Healthier You.</p>
    <p class="qh-home__promise"><span>LOOK BETTER</span><span>FEEL HEALTHIER</span><span>LIVE LONGER</span></p>
    <p class="qh-home__manifesto">A Team of Experts, United by a Shared Vision — To Help You Look Better, Feel Healthier and Live More Confidently.</p>
    <nav class="qh-home__actions" aria-label="Explore Quantum Health">
      <a class="qh-home__button" href="/doctors/">OUR DOCTORS PANEL <span aria-hidden="true">↗</span></a>
      <a class="qh-home__leadership" href="/leadership/dr-sunitha-devaraj/">Meet Executive Director Dr. Sunitha Devaraj</a>
    </nav>
  </header>
  <div class="qh-home__section-head"><p class="qh-home__section-label">A considered approach to wellbeing</p><p>Expertise. Experience. Exceptional Care.</p></div>
  <div class="qh-home__grid">
    <article class="qh-home__card"><p class="qh-home__number">01 / PEOPLE</p><h3>Doctors Panel</h3><p>Expertise. Experience. Exceptional Care.</p><a href="/doctors/">Meet the team <span aria-hidden="true">→</span></a></article>
    <article class="qh-home__card"><p class="qh-home__number">02 / LONGEVITY</p><h3>Nutrition &amp; Longevity</h3><p>Science. Nutrition. Aesthetics. For a Longer, Healthier You.</p><a href="/leadership/dr-sunitha-devaraj/">Explore leadership <span aria-hidden="true">→</span></a></article>
    <article class="qh-home__card"><p class="qh-home__number">03 / AESTHETICS</p><h3>Aesthetic Treatments</h3><p>Personalised care with appropriate professional assessment.</p><a href="/doctors/dr-alisha-khan/">Explore aesthetic expertise <span aria-hidden="true">→</span></a></article>
    <article class="qh-home__card"><p class="qh-home__number">04 / WELLNESS</p><h3>Regenerative &amp; Wellness</h3><p>Long-term wellness grounded in science and comprehensive care.</p><a href="/doctors/">Explore our team <span aria-hidden="true">→</span></a></article>
    <article class="qh-home__card"><p class="qh-home__number">05 / LEARNING</p><h3>Training &amp; Academy</h3><p>Training Today for a More Beautiful Tomorrow.</p><a href="/doctors/dr-alisha-khan/">Training &amp; Academy <span aria-hidden="true">→</span></a></article>
  </div>
  <div class="qh-home__bottom">
    <div><p class="qh-home__values-title">CORE VALUES</p><div class="qh-home__values"><span>SCIENCE DRIVEN</span><span>COMPREHENSIVE CARE</span><span>NATURAL RESULTS</span><span>EXPERT TEAM</span><span>LONG-TERM WELLNESS</span></div></div>
    <a class="qh-home__button qh-home__consult" href="/contact/">BOOK CONSULTATION <span aria-hidden="true">↗</span></a>
  </div>
</div></section>`;
// Keep the public site aligned with its independent-education purpose. The
// imported promotional homepage panel is retained as source material but not
// rendered alongside the footer's no-clinic statement.
finalHome.blocks = finalHome.blocks.filter((block) => block !== homeTeam);
function extractQuantumBody(page) {
  const html = page.blocks[0].html;
  const styleEnd = html.indexOf('</style>');
  const wrapper = '<main class="qh"><div class="qh-wrap">';
  const note = '<p class="qh-note">Medical services and promotional information require appropriate professional assessment and verification before publication. No treatment outcome is guaranteed.</p>';
  if (styleEnd < 0 || !html.includes(wrapper) || !html.endsWith('</div></main>')) {
    throw new Error('Unexpected Quantum Health page structure: ' + page.url);
  }
  return {
    style: html.slice(0, styleEnd + '</style>'.length),
    body: html.slice(styleEnd + '</style>'.length)
      .replace(wrapper, '')
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
  const portrait = doctor.portrait ? `<img class="qh-doctor-card__image" src="${escapeAboutText(doctor.portrait)}" alt="Portrait of ${escapeAboutText(doctor.name)}" style="display:block;width:100%;height:180px;object-fit:cover;object-position:center;margin-bottom:1rem;border:1px solid #C98B9170">` : `<div class="qh-portrait" aria-hidden="true"><span>${escapeAboutText(initials)}</span></div>`;
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
about.blocks = [{ type: 'prose', wide: true, html: doctorDirectory.style + '<div class="qh qh-about"><div class="qh-wrap">' + aboutBody + '</div></div>' }];
const doctorProfiles = quantumHealth.pages.filter((p) => p.url.startsWith('/doctors/') && p.url !== '/doctors/');
const blogCards = publishedBlogs.articles.map((a) => `<article class="blog-card" data-category="${a.category}" data-search="${(a.title+' '+a.category+' '+a.description+' '+a.keyword).toLowerCase()}"><img src="${a.image}" alt="" loading="lazy"><div><p class="eyebrow">${a.category}</p><h2><a href="/blogs/${a.slug}/">${a.title}</a></h2><p>${a.description}</p><p class="blog-meta">${a.date} · 8 min read</p><a class="text-link" href="/blogs/${a.slug}/">Read article</a></div></article>`).join('');
const blogsIndex = {url:'/blogs/',slug:'blogs',h1:'Breast Enlargement Blogs',showBanner:false,seoTitle:'Breast Enlargement Blogs | Quantum Health',seoDescription:'Evidence-aware breast enlargement education and illustrative patient-perspective articles.',breadcrumb:[{label:'Blogs'}],schema:[{'@context':'https://schema.org','@type':'CollectionPage',name:'Breast Enlargement Blogs',url:site.url+'/blogs/'}],blocks:[{type:'prose',wide:true,html:`<div class="blog-hub"><p class="eyebrow">Independent patient education</p><h1>Breast Enlargement Blogs</h1><p class="lead">Clear, evidence-aware articles about options, safety, recovery and decision-making. Patient-perspective pieces are fictional educational scenarios, never testimonials.</p><div class="blog-tools"><label>Search articles <input id="blog-search" type="search" placeholder="Search by topic or category"></label><div class="blog-tabs" role="tablist"><button type="button" data-blog-filter="All Articles" aria-pressed="true">All Articles</button><button type="button" data-blog-filter="Breast Enlargement Education" aria-pressed="false">Breast Enlargement Education</button><button type="button" data-blog-filter="Patient Perspectives" aria-pressed="false">Patient Perspectives</button></div></div><p id="blog-results" class="blog-meta">${publishedBlogs.articles.length} articles</p><div class="blog-grid" id="blog-grid">${blogCards}</div></div><style>.blog-hub{max-width:1180px;margin:auto}.blog-tools{display:grid;gap:1rem;padding:1.2rem;margin:2rem 0;background:#fff7f8;border:1px solid #e8cdd1}.blog-tools input{width:100%;padding:.8rem;margin-top:.4rem;border:1px solid #8b5260}.blog-tabs{display:flex;gap:.5rem;flex-wrap:wrap}.blog-tabs button{padding:.65rem .9rem;border:1px solid #751e35;background:#fff;color:#4a071f;cursor:pointer}.blog-tabs button[aria-pressed="true"]{background:#751e35;color:#fff}.blog-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.2rem}.blog-card{border:1px solid #e8cdd1;background:#fff;overflow:hidden}.blog-card img{width:100%;aspect-ratio:16/9;object-fit:cover}.blog-card>div{padding:1.2rem}.blog-card h2{font-size:1.45rem}.blog-card h2 a{color:#4a071f}.blog-meta{font-size:.9rem;color:#6d5360}@media(max-width:800px){.blog-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.blog-grid{grid-template-columns:1fr}}</style><script>(function(){var q=document.getElementById('blog-search'),cards=[].slice.call(document.querySelectorAll('.blog-card')),buttons=[].slice.call(document.querySelectorAll('[data-blog-filter]')),out=document.getElementById('blog-results'),category='All Articles';function go(){var term=q.value.toLowerCase().trim(),shown=0;cards.forEach(function(c){var ok=(category==='All Articles'||c.dataset.category===category)&&(!term||c.dataset.search.indexOf(term)>-1);c.hidden=!ok;if(ok)shown++});out.textContent=shown+' article'+(shown===1?'':'s')+' found';}q.addEventListener('input',go);buttons.forEach(function(b){b.addEventListener('click',function(){category=b.dataset.blogFilter;buttons.forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});go()})})})();</script>`}]};
finalHome.schema[0].name = site.name;
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
