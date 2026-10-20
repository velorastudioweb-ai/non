'use strict';

/* =============================================================================
   Topic library — original, evidence-aware educational pages assembled from the
   published reference datasets in public/assets/data/*.json.

   These pages are the site's own prose. They cite the source datasets (and,
   where relevant, FDA, NHS, Cochrane, ASPS, BAPRAS, StatPearls and the PMC
   record set) but never fabricate studies, authors, dates or PMIDs: every
   citation is pulled from a dataset that already holds the source metadata.

   Pages created here:
     /understanding-breast-enlargement/
     /breast-anatomy/
     /breast-implants/
     /breast-implant-safety/
     /choosing-a-surgeon/
     /breast-enlargement-safety/
     /glossary/
     /references/
     /research/            (the research hub index)
   ============================================================================= */

const fs = require('fs');
const path = require('path');
const { site, stdCta } = require('./content');
const { terms } = require('./glossary');

const DATA_DIR = path.join(__dirname, '..', 'public', 'assets', 'data');

/* ---------- dataset loading (defensive: a missing file must not break build) */
function load(name) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8'));
  } catch (err) {
    return { documents: [], facts: [], categories: [] };
  }
}

const DATASETS = [
  { key: 'fda', file: 'fda-breast-enlargement.json' },
  { key: 'nhs', file: 'nhs-breast-enlargement.json' },
  { key: 'healthdirect', file: 'healthdirect-breast-enlargement.json' },
  { key: 'clevelandclinic', file: 'clevelandclinic-breast-enlargement.json' },
  { key: 'asps', file: 'asps-breast-enlargement.json' },
  { key: 'bapras', file: 'bapras-breast-enlargement.json' },
  { key: 'baaps', file: 'baaps-breast-enlargement.json' },
  { key: 'statpearls', file: 'statpearls-breast-enlargement.json' },
  { key: 'wikipedia', file: 'wikipedia-breast-enlargement.json' },
  { key: 'wikipediaaug', file: 'wikipedia-breast-augmentation.json' },
  { key: 'medlineplus', file: 'medlineplus-breast-enlargement.json' },
  { key: 'cochrane', file: 'cochrane-breast-enlargement.json' }
].map((d) => Object.assign({ data: load(d.file) }, d));

function ds(key) { return DATASETS.filter((d) => d.key === key)[0] || null; }

/* Render a "Sources consulted" notice from one or more datasets. Each dataset
   already stores the publisher, URL and document list, so nothing is invented. */
function sourceNotice(datasets, title) {
  const body = datasets.map((d) => {
    const dd = d.data;
    const docs = (dd.documents || []).slice(0, 6).map((doc) =>
      '<li><a href="' + doc.url + '" rel="noopener">' + esc(doc.title) + '</a>' +
      (doc.kind ? ' <span class="muted">(' + esc(doc.kind) + ')</span>' : '') + '</li>').join('');
    const more = (dd.documents || []).length > 6
      ? '<li>…and ' + (dd.documents.length - 6) + ' more in the full library.</li>' : '';
    const srcLabel = dd.sourceUrl
      ? ' — <a href="' + dd.sourceUrl + '" rel="noopener">' + esc(dd.sourceUrl.replace(/^https?:\/\//, '')) + '</a>'
      : '';
    return '<p><strong>' + esc(dd.source || d.key) + '</strong>' + srcLabel + '</p>' +
      (docs ? '<ul>' + docs + more + '</ul>' : '');
  }).join('');
  return { type: 'notice', blush: true, icon: 'evidence', title: title || 'Sources consulted', text: body };
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Pull facts from a dataset by topic keyword (case-insensitive), capped. */
function factsLike(dataset, words, cap) {
  if (!dataset) return [];
  const re = new RegExp(words.join('|'), 'i');
  return (dataset.data.facts || []).filter((f) => re.test(f.topic) || re.test(f.statement)).slice(0, cap || 8);
}

/* =============================================================================
   /understanding-breast-enlargement/
   ============================================================================= */
const understanding = {
  url: '/understanding-breast-enlargement/',
  slug: 'understanding',
  h1: 'Understanding Breast Enlargement',
  seoTitle: 'Understanding Breast Enlargement: An Evidence-Aware Overview',
  seoDescription:
    'What breast enlargement means, the difference between real tissue growth and temporary appearance change, the main routes to more volume, and how to read the evidence behind any claim.',
  bannerEyebrow: 'Start here',
  bannerLead:
    'Before comparing treatments, it helps to understand what breast enlargement actually involves — and the difference between changing how the breasts look and changing the breast itself.',
  breadcrumb: [{ label: 'Understand' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Understanding Breast Enlargement', url: site.url + '/understanding-breast-enlargement/', isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' } }],
  blocks: [
    {
      type: 'prose',
      html:
        '<div class="prose__with-toc">' +
        '<p class="lead">“Breast enlargement” describes two very different things. One is a change in the <strong>look</strong> of the breasts — a bra, padding, posture or clothing. The other is a change in the <strong>breast itself</strong> — more glandular or fatty tissue, or a device placed inside it. Confusing the two is the single most common reason people spend money on something that cannot work.</p>' +
        '<p>This page sets out the vocabulary, the biology and the framework used throughout the rest of the site, so that every treatment page and evidence verdict has a clear reference point.</p>' +
        '</div>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'The core distinction',
      heading: 'Appearance vs. tissue',
      cols: 2,
      items: [
        { icon: 'info', title: 'Appearance only', text: 'A correctly fitted bra, padding, push-up styles, inserts, styling and posture change how the chest looks immediately. They carry no medical risk, are fully reversible, and do not alter breast tissue.' },
        { icon: 'evidence', title: 'Real tissue or a device', text: 'Fat transfer moves your own fat into the breast; implants place a prosthesis. Both are procedures with recovery, risk and cost. Only these routes add lasting volume without hormones.' }
      ]
    },
    {
      type: 'prose',
      alt: true,
      html:
        '<h2 class="h3">What the breast is made of</h2>' +
        '<p>The breast sits on the chest wall over the pectoral muscles. It contains glandular tissue (lobules and ducts that produce and carry milk), fibrous connective tissue that supports it, and fat. There is no muscle inside the breast — a point that explains why chest exercises firm the <em>wall</em> but do not enlarge the breast. Skin and suspensory ligaments give the breast its shape and are the structures that stretch with pregnancy, weight change and age.</p>' +
        '<p>Breast size is therefore determined by how much glandular and fatty tissue sits on the chest, plus the skin envelope around it. Nothing applied to the surface of the skin can grow the tissue underneath.</p>' +
        '<h2 class="h3">How breast tissue actually grows</h2>' +
        '<p>Breast development is driven mainly by hormones — above all oestrogen — during puberty, with further changes in pregnancy and breastfeeding. In adult life, breast volume mostly follows overall body fat, the hormonal cycle, pregnancy and age. The signal that builds breast tissue is internal and hormonal.</p>' +
        '<p>This is why the only known routes to more <em>tissue</em> are hormonal stimulation (a medical matter, not a cosmetic one), fat transfer (your own fat, moved by a surgeon), and implants (a prosthesis). Creams, pills, massage, suction cups and devices have no established mechanism for adding breast tissue at all.</p>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'A quick test: swelling or growth?',
      text:
        '<ul>' +
        '<li>If fullness fades within hours or days, it was fluid, swelling or a cycle effect — not growth.</li>' +
        '<li>If it appears and disappears with your menstrual cycle, it is a normal cyclical change.</li>' +
        '<li>If it follows weight gain, the fat changed — and that would happen without any product.</li>' +
        '<li>Lasting added volume appears only after a procedure that places tissue or material in the breast, or after hormonal development.</li>' +
        '</ul>'
    },
    {
      type: 'table',
      alt: true,
      eyebrow: 'At a glance',
      heading: 'The four broad routes to more volume',
      head: ['Route', 'What it is', 'Adds lasting tissue?', 'Nature'],
      rows: [
        ['<strong>Cosmetic</strong>', 'Bras, padding, styling, posture', 'No — changes appearance only', 'Free or low cost, reversible, no medical risk'],
        ['<strong>Fat transfer</strong>', 'Your own fat moved by liposuction and injection', 'Yes — modest and variable', 'Minimally invasive procedure with real risks'],
        ['<strong>Implants</strong>', 'A saline or silicone device placed surgically', 'Yes — predictable volume', 'Surgery with long-term monitoring and revision risk'],
        ['<strong>Hormonal</strong>', 'Medically supervised hormone treatment', 'Yes, in principle', 'A medical treatment, not a cosmetic route; carries systemic risks']
      ],
      note: 'Non-surgical injectables such as fillers, PRP and biostimulators do <strong>not</strong> belong on this list as reliable routes to lasting volume — see the <a href="/breast-enlargement-without-surgery/">evidence guide</a> for why.'
    },
    {
      type: 'steps',
      eyebrow: 'How to use this website',
      heading: 'A clear path from curiosity to an informed decision',
      lead: 'Work through the information at your own pace. No decision about your body should ever be rushed by advertising.',
      items: [
        { title: 'Understand the biology', text: 'Read this page and the breast anatomy guide so that you can tell appearance changes from tissue changes.' },
        { title: 'Learn each option', text: 'Work through the non-surgical and surgical sections to understand intended effects, mechanisms and limitations.' },
        { title: 'Check the evidence', text: 'Use the evidence guide and research libraries to see what is proven, what is unproven and what to avoid.' },
        { title: 'Understand the risks', text: 'Review candidacy, contraindications, complications and the warning signs that need medical attention.' },
        { title: 'Prepare for a clinician', text: 'Take written questions to a registered, appropriately qualified professional and compare more than one opinion.' }
      ],
      slot: 'Consultation room detail'
    },
    {
      type: 'notice',
      icon: 'evidence',
      title: 'Educational information only — not medical advice',
      text: 'This page explains concepts for general education. It cannot account for your health, anatomy or circumstances, and it does not recommend any treatment. Decisions about breast enlargement should be made with a qualified, registered clinician after proper assessment.'
    },
    stdCta({ heading: 'Ready to look at the options in detail?' })
  ]
};

/* =============================================================================
   /breast-anatomy/
   ============================================================================= */
const anatomy = {
  url: '/breast-anatomy/',
  slug: 'breast-anatomy',
  h1: 'Breast Anatomy: The Structures That Matter',
  seoTitle: 'Breast Anatomy Explained: Tissue, Ligaments and Blood Supply',
  seoDescription:
    'A clear guide to breast anatomy — glandular and fatty tissue, Cooper’s ligaments, skin envelope, blood supply, nerves and lymph drainage — and why each structure matters for enlargement.',
  bannerEyebrow: 'Foundations',
  bannerLead:
    'Understanding the structures of the breast explains why some treatments can add volume, why sagging happens, and why injecting or operating carries the risks it does.',
  breadcrumb: [{ label: 'Understand', href: '/understanding-breast-enlargement/' }, { label: 'Breast anatomy' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Breast Anatomy', url: site.url + '/breast-anatomy/', about: { '@type': 'AnatomicalStructure', name: 'Breast' } }],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">The breast is not a simple sac of tissue. It is a layered structure whose behaviour — how it changes with weight and hormones, how it sags, and how it responds to surgery or injection — follows from what it is made of and how it is supplied with blood and nerve.</p>'
    },
    {
      type: 'table',
      eyebrow: 'Structures',
      heading: 'The layers and what each one does',
      head: ['Structure', 'What it is', 'Why it matters'],
      rows: [
        ['<strong>Skin & subcutaneous fat</strong>', 'The outer envelope and the fat immediately beneath it', 'Determines the covering of the breast and where surgery marks fall'],
        ['<strong>Glandular tissue</strong>', 'Lobules and ducts that produce and carry milk', 'The functional tissue; its proportion to fat varies greatly between people'],
        ['<strong>Fatty tissue</strong>', 'Adipose tissue distributed around the glandular tissue', 'A large part of breast volume; follows overall body fat and can be moved by fat transfer'],
        ['<strong>Cooper’s ligaments</strong>', 'Fibrous bands anchoring the breast to the chest wall and skin', 'Support the breast; stretching with age, weight change and pregnancy contributes to sagging'],
        ['<strong>Pectoral muscles</strong>', 'Chest muscles lying <em>under</em> the breast', 'There is no muscle in the breast itself — so training builds the wall, not the breast'],
        ['<strong>Blood supply</strong>', 'Arteries feeding the breast from several directions', 'Critical to fat-graft survival and to safe surgery; a blocked vessel by injected material can be catastrophic'],
        ['<strong>Nerves</strong>', 'Sensory and autonomic nerves to breast and nipple', 'Their position explains why surgery and procedures can change nipple and skin sensation'],
        ['<strong>Lymph drainage</strong>', 'Vessels draining toward the axilla (armpit) and internal mammary chain', 'Relevant to cancer detection and to interpreting injected material on imaging']
      ]
    },
    {
      type: 'prose',
      alt: true,
      html:
        '<h2 class="h3">Why anatomy shapes every treatment decision</h2>' +
        '<p><strong>Existing tissue.</strong> A breast with little natural tissue cannot hide a large implant or supply much fat for reabsorption; a breast with a lot of tissue behaves differently again. This is why implant selection and fat-transfer volumes are individual decisions, not catalogue choices.</p>' +
        '<p><strong>Skin quality and laxity.</strong> Skin and the suspensory ligaments determine how well a breast holds its shape. Stretched skin after pregnancy or weight change is one reason a lift may be discussed alongside augmentation.</p>' +
        '<p><strong>Blood supply.</strong> Fat survives only where the tissue around it can supply blood. Poor blood supply is a central reason a proportion of transferred fat does not survive, and why large-volume grafting is unreliable. It is also why any injected material that obstructs a vessel is dangerous.</p>' +
        '<p><strong>Sensation and breastfeeding.</strong> Nerve pathways to the nipple pass through the breast. Depending on the technique, surgery and some procedures can affect nipple sensation or future breastfeeding, which is why these are discussed before consent.</p>'
    },
    {
      type: 'notice',
      icon: 'safety',
      title: 'Anatomy is why “non-surgical” is not automatically “safe”',
      text: 'The breast is a blood-rich, nerve-dense area that drains to the lymph nodes. Material injected into it can migrate, obstruct vessels, provoke inflammation and complicate cancer screening. That is the anatomical reason regulators advise against injecting fillers or silicone to enlarge the breasts — not merely a labelling matter.'
    },
    {
      type: 'notice',
      blush: true,
      icon: 'info',
      title: 'Putting it in context',
      text: 'This page gives a general anatomical overview. Individual anatomy varies widely, and how any structure affects your own options can only be assessed in person by a qualified clinician. For the evidence context, see the <a href="/breast-enlargement-without-surgery/">evidence guide</a> and the <a href="/research/">research hub</a>.'
    },
    stdCta({ heading: 'See how anatomy shapes the treatment options' })
  ]
};

/* =============================================================================
   /breast-implants/
   ============================================================================= */
const statpearlsD = ds('statpearls');
const aspsD = ds('asps');
const implantFacts = factsLike(statpearlsD, ['implant', 'silicone', 'saline'], 12);

const implants = {
  url: '/breast-implants/',
  slug: 'breast-implants',
  h1: 'Breast Implants: Types, Placement and Long-Term Reality',
  seoTitle: 'Breast Implants: Types, Placement & Long-Term Reality',
  seoDescription:
    'An evidence-aware guide to breast implants — saline and silicone, smooth and textured, shape and profile, placement and incisions, longevity, monitoring and the difference from injectable silicone.',
  bannerEyebrow: 'Surgical pathway',
  bannerLead:
    'Breast implants are medical devices placed surgically to increase breast volume. They are the most studied enlargement method — with real complication and revision rates that every patient should understand before deciding.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Breast implants' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Breast Implants', url: site.url + '/breast-implants/', about: { '@type': 'MedicalDevice', name: 'Breast implant' } }],
  blocks: [
    {
      type: 'notice',
      icon: 'safety',
      title: 'Not the same as injectable silicone',
      text: 'Injectable silicone is a different product from a silicone gel-filled implant and must never be used as a substitute. Injectable silicone used to enlarge the breasts can cause serious, potentially permanent harm.'
    },
    {
      type: 'prose',
      html:
        '<p class="lead">An implant is a device — a shell filled with saline (sterile salt water) or silicone gel — placed behind the breast tissue or behind the pectoral muscle. Implant surgery is the best-documented route to a larger, predictable breast size, but it is surgery: it carries risks, it is not permanent, and follow-up over the years is part of the decision.</p>'
    },
    {
      type: 'table',
      eyebrow: 'Implant types',
      heading: 'Filling, surface and shape',
      head: ['Choice', 'Options', 'Trade-offs to understand'],
      rows: [
        ['<strong>Filling</strong>', 'Saline (salt water) or silicone gel', 'Silicone gel tends to feel more like natural breast tissue and does not collapse if it leaks; it requires monitoring for silent rupture. Saline collapses and is absorbed if the shell leaks. Regulators approve saline from age 18 and silicone from age 22 in the US.'],
        ['<strong>Surface</strong>', 'Smooth or textured', 'Smooth implants tend to feel softer and move naturally but may ripple; textured implants are less likely to move but are where implant-associated ALCL occurs most often.'],
        ['<strong>Shape</strong>', 'Round or form-stable (“gummy bear”)', 'Round gives a fuller look with less concern about rotation; shaped implants give more controlled projection but can look unusual if they rotate and need a longer incision.'],
        ['<strong>Profile</strong>', 'Low to high projection', 'Profile determines how far the implant projects from the chest wall; it must match the width of your chest to look proportionate.']
      ]
    },
    {
      type: 'prose',
      alt: true,
      html:
        '<h2 class="h3">Placement and incisions</h2>' +
        '<p>The implant can sit <strong>under the pectoral muscle</strong> (submuscular) or behind the breast tissue over the muscle (subglandular). Access is usually through the <strong>inframammary fold</strong> (under the breast), around the <strong>areola</strong>, or in the <strong>armpit</strong> (transaxillary). The route affects scarring and, to some extent, how the implant behaves.</p>' +
        '<p>There is no single best combination. Nava and colleagues reviewed the evidence and found no high-level evidence identifying one ideal technique or implant; complication reduction follows established surgical principles rather than device fashion.</p>' +
        '<h2 class="h3">Longevity, monitoring and revision</h2>' +
        '<p>Breast implants are <strong>not lifetime devices</strong>. There is no fixed lifespan: some remain stable for many years, but additional operations are common over a lifetime of implant use. For silicone implants, the US FDA recommends <strong>MRI or ultrasound screening</strong> five to six years after placement and then every two to three years, because a rupture can be silent.</p>' +
        '<p>Revision rates after primary augmentation have been reported as high as <strong>36%</strong>, most commonly for capsular contracture, implant malposition and ptosis of the ageing breast. None of this means implants are unsafe — most people are satisfied — but it should shape expectations.</p>'
    },
    {
      type: 'cards',
      alt: true,
      cols: 3,
      ratio: 'ratio-3-4',
      eyebrow: 'Related pages',
      heading: 'Go deeper',
      items: [
        { title: 'Breast implant safety', text: 'Rupture, capsular contracture, ALCL, screening and what the regulators say about monitoring.', href: '/breast-implant-safety/' },
        { title: 'Breast augmentation', text: 'How the operation is planned and performed, recovery, and what it can and cannot achieve.', href: '/surgical/breast-augmentation/' },
        { title: 'Choosing a surgeon', text: 'How to check credentials, registrations and the questions worth asking before committing.', href: '/choosing-a-surgeon/' }
      ]
    },
    sourceNotice([statpearlsD, aspsD], 'Where this page is grounded'),
    {
      type: 'notice',
      icon: 'evidence',
      title: 'Educational information only',
      text: 'Implant selection, technique and suitability are individual decisions that require examination and assessment by an appropriately credentialed surgeon. Nothing here is a recommendation for any individual.'
    },
    stdCta({ heading: 'Discuss implants with a qualified surgeon' })
  ]
};

/* =============================================================================
   /breast-implant-safety/
   ============================================================================= */
const fdaD = ds('fda');
const cochraneD = ds('cochrane');
const implantSafetyFacts = factsLike(fdaD, ['implant', 'safety', 'rupture', 'ALCL', 'contracture'], 10);

const implantSafety = {
  url: '/breast-implant-safety/',
  slug: 'breast-implant-safety',
  h1: 'Breast Implant Safety',
  seoTitle: 'Breast Implant Safety: Rupture, ALCL, Contracture & Monitoring',
  seoDescription:
    'What is actually known about breast implant safety — rupture and silent rupture, capsular contracture, BIA-ALCL, systemic symptoms, screening and the regulator guidance behind monitoring.',
  bannerEyebrow: 'Safety',
  bannerLead:
    'Most people who have implants are satisfied, but implants have documented risks that do not disappear with time. This page sets out what the evidence and regulators actually say.',
  breadcrumb: [{ label: 'Safety', href: '/breast-enlargement-safety/' }, { label: 'Breast implant safety' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Breast Implant Safety', url: site.url + '/breast-implant-safety/' }],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">Implant safety is not a single yes-or-no. It is a set of known, quantified risks — some common and manageable, some rare and serious — against benefits that many patients find worthwhile. Reading them honestly is the basis of informed consent.</p>'
    },
    {
      type: 'table',
      eyebrow: 'The main risks',
      heading: 'What can happen, and how common it is',
      head: ['Risk', 'What it is', 'What to understand'],
      rows: [
        ['<strong>Capsular contracture</strong>', 'Tightening of the scar capsule around the implant', 'The most common reason for revision; can cause firmness, distortion and discomfort. Textured surfaces were introduced partly to reduce it.'],
        ['<strong>Rupture / silent rupture</strong>', 'Loss of implant integrity', 'Silicone rupture may cause no symptoms, which is why screening is recommended; saline rupture is usually obvious as the breast deflates.'],
        ['<strong>BIA-ALCL</strong>', 'Breast implant-associated anaplastic large cell lymphoma', 'A rare lymphoma of the fluid or capsule, linked mainly to textured implants. It is treatable, particularly when caught early.'],
        ['<strong>BIA-SCC</strong>', 'Breast implant-associated squamous cell carcinoma', 'A very rare cancer in the capsule; regulators list it alongside ALCL as a device-associated risk.'],
        ['<strong>Infection</strong>', 'Infection around the implant', 'May require antibiotics and, in some cases, implant removal.'],
        ['<strong>Systemic symptoms (“BII”)</strong>', 'Self-reported fatigue, “brain fog”, joint pain and rash', 'Widely reported but not an established diagnosis; reviews find the correlation with implants is not established and evidence is limited.'],
        ['<strong>Sensation & breastfeeding changes</strong>', 'Altered nipple or skin sensation; effects on feeding', 'Varies with technique and individual anatomy; discussed before consent.'],
        ['<strong>Need for revision</strong>', 'Further surgery at some point', 'Reported revision rates after primary augmentation are as high as 36%.']
      ]
    },
    {
      type: 'notice',
      icon: 'clock',
      title: 'Monitoring, not reassurance',
      text: 'For silicone implants the FDA recommends MRI or ultrasound at five to six years after placement and then every two to three years, because a ruptured implant can produce no symptoms. Ongoing monitoring is part of living with implants — not a sign that something has gone wrong.'
    },
    {
      type: 'prose',
      alt: true,
      html:
        '<h2 class="h3">What the systematic reviews show</h2>' +
        '<p>The Cochrane Library holds independent systematic reviews and registered protocols on breast implants, wound drains, implant types and reconstruction. Systematic reviews pool many studies and sit at the top of the evidence ladder, which makes them the most reliable single guide to what is known and, equally importantly, to where the evidence is still missing.</p>' +
        '<p>The literature also documents past device failures and withdrawals — from PIP implants, with their increased rupture and leakage risk, to the soybean-oil-filled Trilucent implants that were withdrawn because of lipid-oxidation metabolites. These episodes are why modern regulators require long-term data and registries.</p>' +
        '<h2 class="h3">Injectable silicone and fillers</h2>' +
        '<p>Importantly, most of the serious “breast filler” harms in the literature are not about implants at all. They concern injectable fillers and liquid silicone used to enlarge the breast off-label — products that can migrate, cause infection, granulomas and disfigurement, and interfere with mammography. The safest position on injectable fillers and silicone in the breast is the regulator position: do not use them for this purpose.</p>'
    },
    sourceNotice([fdaD, cochraneD], 'Regulator and systematic-review sources'),
    {
      type: 'notice',
      icon: 'evidence',
      title: 'Educational information only',
      text: 'This page summarises published evidence and regulator guidance for general education. It cannot account for your health or circumstances and does not recommend any treatment. Discuss any symptom after a procedure promptly with a qualified clinician.'
    },
    stdCta({ heading: 'Have questions about implant safety?' })
  ]
};

/* =============================================================================
   /choosing-a-surgeon/
   ============================================================================= */
const choosingSurgeon = {
  url: '/choosing-a-surgeon/',
  slug: 'choosing-a-surgeon',
  h1: 'Choosing a Surgeon',
  seoTitle: 'Choosing a Surgeon: Credentials, Questions and Red Flags',
  seoDescription:
    'How to choose a surgeon for breast augmentation or related surgery — verifying credentials and registration, understanding scope of practice, questions to ask, and the red flags that should end a consultation.',
  bannerEyebrow: 'Decisions',
  bannerLead:
    'The single biggest determinant of a safe, well-judged result is the clinician you choose. Credentials can be checked, and the questions that expose a weak consultation can be asked.',
  breadcrumb: [{ label: 'Safety', href: '/breast-enlargement-safety/' }, { label: 'Choosing a surgeon' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Choosing a Surgeon', url: site.url + '/choosing-a-surgeon/' }],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">Advertising is not a credential. Anyone can describe themselves as a “cosmetic surgeon”, and clinics may use the word “expert” freely. What can be verified is registration with a professional regulator, recognised surgical training, and membership of a relevant professional body.</p>'
    },
    {
      type: 'steps',
      eyebrow: 'Verification',
      heading: 'How to check a surgeon before you commit',
      lead: 'These steps are cheap, quick and entirely reasonable to insist on.',
      items: [
        { title: 'Confirm registration', text: 'Find the surgeon on your national medical council or regulator and confirm the registration is current and unrestricted.' },
        { title: 'Confirm surgical training', text: 'A surgeon performing breast surgery should hold recognised training in plastic or reconstructive surgery, not merely a short cosmetic course.' },
        { title: 'Check scope of practice', text: 'The clinician should operate within their qualifications; ask directly who will perform each part of the procedure.' },
        { title: 'Check the operating setting', text: 'Ask where the procedure is performed, who provides anaesthesia, and what arrangements exist for emergencies.' },
        { title: 'Ask for the plan in writing', text: 'A reputable surgeon provides a written plan covering technique, risks, costs and revision policy — so you can think it over.' }
      ],
      slot: 'Surgical consultation imagery'
    },
    {
      type: 'table',
      alt: true,
      eyebrow: 'Questions',
      heading: 'What to ask at the consultation',
      head: ['Question', 'What a good answer looks like'],
      rows: [
        ['How many of these procedures do you personally perform each year?', 'A specific number and a willingness to discuss outcomes, not evasion.'],
        ['What are your complication and revision rates?', 'Honest acknowledgment that complications occur, with figures or a range, not a claim of zero.'],
        ['What would you do if I were unhappy with the result?', 'A clear revision policy and costs, stated in advance.'],
        ['Which options are you <em>not</em> offering me, and why?', 'A balanced comparison — including options that are less profitable or out of scope.'],
        ['How do you handle a problem after surgery?', 'A named route for concerns, including out-of-hours arrangements.'],
        ['Can I take the written plan home before deciding?', 'Yes, without pressure. A cooling-off period is normal and expected.']
      ]
    },
    {
      type: 'notice',
      icon: 'safety',
      title: 'Red flags that should end a consultation',
      text:
        '<ul>' +
        '<li>Pressure to decide or pay a deposit the same day, or a “limited-time” discount.</li>' +
        '<li>Guaranteed results, guaranteed symmetry, or claims of “no risk”.</li>' +
        '<li>Vague or evasive answers about who performs the surgery and where.</li>' +
        '<li>Reluctance to provide a written plan, quote or revision policy.</li>' +
        '<li>Pushing an unapproved injectable, or refusing to name the exact product being offered.</li>' +
        '<li>No discussion of alternatives, contraindications or what happens if things go wrong.</li>' +
        '</ul>'
    },
    {
      type: 'prose',
      alt: true,
      html:
        '<h2 class="h3">Why a cooling-off period matters</h2>' +
        '<p>Cosmetic surgery decisions are permanent enough that reflection is part of good practice. Professional bodies such as the UK’s BAPRAS describe a consultation and cooling-off period before consent precisely because a rushed decision is a poor decision. If a clinic discourages taking time, that in itself is information.</p>'
    },
    sourceNotice([ds('bapras'), ds('asps')], 'Professional-society guidance'),
    stdCta({ heading: 'Prepare your questions in advance' })
  ]
};

/* =============================================================================
   /breast-enlargement-safety/
   ============================================================================= */
const nhsD = ds('nhs');
const safetyFacts = factsLike(fdaD, ['safety', 'advice', 'harm', 'warning'], 8)
  .concat(factsLike(nhsD, ['safety', 'risk', 'complication'], 8)).slice(0, 12);

const safety = {
  url: '/breast-enlargement-safety/',
  slug: 'breast-enlargement-safety',
  h1: 'Breast Enlargement Safety',
  seoTitle: 'Breast Enlargement Safety: Candidacy, Risks and Warning Signs',
  seoDescription:
    'A safety overview across every breast enlargement route — candidacy and contraindications, the risks common to each option, when to seek urgent care, and the questions that reveal a safe clinic.',
  bannerEyebrow: 'Safety',
  bannerLead:
    'Safety is not a property of a treatment label; it is the balance of benefit, risk and suitability for one person. This page brings the safety points from every option into one place.',
  breadcrumb: [{ label: 'Safety' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Breast Enlargement Safety', url: site.url + '/breast-enlargement-safety/' }],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">“Non-surgical” describes a method, not a risk level. A cream carries almost no medical risk but also does nothing; an injectable can be marketed as non-surgical and still cause serious harm; surgery carries the risks of any operation. Safety means matching the smallest effective intervention to your actual goal, after honest assessment.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Candidacy',
      heading: 'Factors that shape whether a procedure is appropriate',
      cols: 3,
      items: [
        { icon: 'personalised', title: 'General health', text: 'Medical conditions, medications and allergies can affect whether a procedure is suitable and how healing proceeds.' },
        { icon: 'clock', title: 'Timing', text: 'Pregnancy, breastfeeding and significant planned weight change all argue for waiting.' },
        { icon: 'scale', title: 'Anatomy & tissue', text: 'Existing tissue, skin quality and chest-wall proportions determine what is realistically achievable.' },
        { icon: 'info', title: 'Age', text: 'Breasts may keep developing into the late teens and early twenties; most professional guidance advises against enlargement procedures for minors.' },
        { icon: 'evidence', title: 'Expectations', text: 'Realistic expectations — and a willingness to accept that revision may be needed — are part of candidacy.' },
        { icon: 'safety', title: 'Contraindications', text: 'Active infection, certain uncontrolled conditions and pregnancy are typical reasons to postpone or decline a procedure.' }
      ]
    },
    {
      type: 'table',
      eyebrow: 'Risk by route',
      heading: 'What can go wrong, by option',
      head: ['Route', 'Main risks', 'Severity'],
      rows: [
        ['Bras, padding, styling', 'Skin irritation from adhesive products', 'Very low'],
        ['Creams and pills', 'Allergic reactions; undeclared or hormone-active ingredients', 'Low, but no benefit'],
        ['Suction / vacuum devices', 'Bruising, broken vessels, skin damage', 'Low to moderate'],
        ['Fat transfer', 'Fat necrosis, oil cysts, calcification, infection, asymmetry; complications reported in about a quarter of cases in the largest review', 'Moderate'],
        ['External expansion + fat transfer', 'Everything above plus skin problems and rare serious events from prolonged device wear', 'Moderate'],
        ['Implants (surgery)', 'Capsular contracture, rupture, ALCL, infection, sensation change, revision surgery', 'Moderate to serious'],
        ['Injectable fillers in the breast', 'Nodules, migration, infection, imaging interference, difficulty of removal; not approved for this use', 'High'],
        ['Liquid silicone / unknown injectables', 'Disfigurement, embolism, stroke or death; problems may appear years later', 'Very high']
      ],
      note: 'Figures describe the groups studied and may not apply to any individual. See the <a href="/breast-enlargement-without-surgery/">evidence guide</a> for the data behind the non-surgical rows.'
    },
    {
      type: 'notice',
      icon: 'safety',
      title: 'Warning signs — seek help promptly',
      text:
        '<ul>' +
        '<li>Fever, spreading redness, pus or worsening pain after any procedure — possible infection; contact your clinician the same day.</li>' +
        '<li>Pale, bluish, dusky or dark skin, or blisters — may mean reduced blood supply; seek urgent care.</li>' +
        '<li>Chest pain, breathlessness or collapse — possible blood clot; call emergency services.</li>' +
        '<li>Sudden vision change, severe headache or weakness after an injection — possible blocked vessel; call emergency services.</li>' +
        '<li>A new lump, hardness or skin change — have it examined and imaged.</li>' +
        '</ul>'
    },
    {
      type: 'faq',
      alt: true,
      id: 'safety',
      eyebrow: 'Questions',
      heading: 'Safety FAQs',
      items: [
        { q: 'Is non-surgical always safer than surgery?', a: '<p>No. A cream is low-risk but ineffective; unapproved breast filler is “non-surgical” yet linked to serious harm; surgery carries real but better-understood risks. Safety depends on the specific product, the indication and who performs it.</p>' },
        { q: 'How do I know if a clinic is safe?', a: '<p>Check registration and credentials, insist on a written plan and revision policy, ask who performs the procedure and where, and treat pressure or guarantees as red flags. See <a href="/choosing-a-surgeon/">choosing a surgeon</a>.</p>' },
        { q: 'Are there signs I should not have a procedure at all?', a: '<p>Yes. Active infection, pregnancy or breastfeeding, some uncontrolled medical conditions, and unrealistic expectations are typical reasons to postpone or decline. A good clinician will say so.</p>' }
      ]
    },
    sourceNotice([fdaD, nhsD], 'Regulator sources'),
    {
      type: 'notice',
      icon: 'evidence',
      title: 'Educational information only',
      text: 'This page is general education, not a personal assessment. Suitability, risks and outcomes vary and require evaluation by an appropriately qualified clinician.'
    },
    stdCta({ heading: 'Take your safety questions to a qualified clinician' })
  ]
};

/* =============================================================================
   /glossary/
   ============================================================================= */
function glossItem(t) {
  return '<h3 class="h4" id="' + t.slug + '">' + esc(t.term) + '</h3><p>' + esc(t.def) + '</p>';
}
const glossary = {
  url: '/glossary/',
  slug: 'glossary',
  h1: 'Glossary of Breast Enlargement Terms',
  seoTitle: 'Glossary: Breast Enlargement and Implant Terms',
  seoDescription:
    'Plain-language definitions of the terms used across this site — implant types, capsular contracture, BIA-ALCL, fat transfer, mastopexy, revision surgery and more.',
  bannerEyebrow: 'Reference',
  bannerLead: 'Plain-language definitions of the terms you will meet on this site and in a consultation.',
  breadcrumb: [{ label: 'Glossary' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: 'Breast Enlargement Glossary', url: site.url + '/glossary/' }],
  blocks: [
    {
      type: 'prose',
      wide: true,
      html:
        '<p class="lead">Terms are arranged alphabetically. Definitions are deliberately short and non-promotional — enough to follow a consultation or a research abstract, not a substitute for clinical advice.</p>' +
        '<div class="glossary">' + terms.slice().sort((a, b) => a.term.localeCompare(b.term)).map(glossItem).join('') + '</div>'
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'A note on terminology',
      text: 'Some terms — such as “regenerative” or “non-surgical” — are used in marketing far more loosely than their technical meaning allows. Where that happens, this site explains the gap rather than repeating the claim.'
    },
    stdCta({ heading: 'Follow a term through to the evidence' })
  ]
};

/* =============================================================================
   /references/
   ============================================================================= */
function referenceSections() {
  return DATASETS.map((d) => {
    const dd = d.data;
    const docs = (dd.documents || []);
    if (!docs.length) return '';
    const items = docs.map((doc) => {
      const meta = [doc.kind, doc.updated].filter(Boolean).join(' · ');
      return '<li><a href="' + doc.url + '" rel="noopener">' + esc(doc.title) + '</a>' +
        (meta ? ' <span class="muted">— ' + esc(meta) + '</span>' : '') + '</li>';
    }).join('');
    return '<h2 class="h3" id="' + d.key + '">' + esc(dd.source || d.key) + '</h2>' +
      '<p class="muted">' + (dd.sourceUrl ? '<a href="' + dd.sourceUrl + '" rel="noopener">' + esc(dd.sourceUrl) + '</a>' : '') +
      (dd.generated ? ' · captured ' + esc(dd.generated) : '') + '</p>' +
      '<ul>' + items + '</ul>';
  }).join('');
}
const references = {
  url: '/references/',
  slug: 'references',
  h1: 'References and Sources',
  seoTitle: 'References: Sources Cited Across This Website',
  seoDescription:
    'A consolidated bibliography of every source indexed by this website — FDA, NHS, Cochrane, ASPS, BAPRAS, BAAPS, StatPearls, plus the complete PubMed Central record set.',
  bannerEyebrow: 'Bibliography',
  bannerLead: 'Every source this website draws on, grouped by publisher and linked to the original.',
  breadcrumb: [{ label: 'References' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'References and Sources', url: site.url + '/references/' }],
  blocks: [
    {
      type: 'prose',
      wide: true,
      html:
        '<p class="lead">This is the consolidated bibliography behind the site. Each group below is a published collection of documents captured from a recognised regulator, public-health body, professional society or peer-reviewed source. Links open the original.</p>' +
        '<p>For the complete, searchable PubMed Central record set for “breast enlargement” (thousands of citations with abstracts), see the <a href="/research/breast-enlargement/">PMC research library</a>. For a curated, topic-grouped summary of the studies most relevant to enlargement, see the <a href="/breast-enlargement-research/">PubMed research page</a>.</p>' +
        referenceSections()
    },
    {
      type: 'notice',
      icon: 'evidence',
      title: 'How to use a bibliography',
      text: 'Listing a source here means it forms part of the evidence base for a topic — not that its every claim is endorsed or current. Check the source’s date, its origin and whether it describes your jurisdiction before relying on it.'
    },
    stdCta({ heading: 'Not sure how to read a source?' })
  ]
};

/* =============================================================================
   /research/  (hub index)
   ============================================================================= */
const researchHub = {
  url: '/research/',
  slug: 'research',
  h1: 'Research and Reference Libraries',
  seoTitle: 'Research Hub: Every Evidence Library on This Site',
  seoDescription:
    'An index of every research and reference library on this website — PubMed and PMC, Cochrane systematic reviews, FDA, NHS, BAPRAS, BAAPS, ASPS, Cleveland Clinic, MedlinePlus, healthdirect and StatPearls.',
  bannerEyebrow: 'Evidence',
  bannerLead:
    'This site is built from primary sources rather than opinion. Here is every library it draws on, what each one contains, and how to read it responsibly.',
  breadcrumb: [{ label: 'Research' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Research and Reference Libraries', url: site.url + '/research/' }],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">A claim is only as good as the source behind it. Rather than asking you to trust this website, the libraries below let you go straight to the original material — regulator guidance, public-health information, systematic reviews and the peer-reviewed record.</p>'
    },
    {
      type: 'cards',
      cols: 3,
      eyebrow: 'Primary evidence',
      heading: 'Research collections',
      items: [
        { title: 'PubMed research', text: 'Curated, topic-grouped summaries of the peer-reviewed breast enlargement studies most relevant to patients — fat transfer, implants, external expansion, fillers and global trends — with a link to every record.', href: '/breast-enlargement-research/', kicker: 'PubMed' },
        { title: 'PMC research library', text: 'Every PubMed Central record for the exact phrase “breast enlargement”, searchable by title, abstract, author, journal and year. A complete capture, not a hand-picked list.', href: '/research/breast-enlargement/', kicker: 'PubMed Central' },
        { title: 'Cochrane evidence library', text: 'Independent systematic reviews and registered protocols on breast implants, wound drains, implant types and reconstruction, with key findings and evidence gaps.', href: '/research/cochrane-breast-enlargement/', kicker: 'Cochrane Library' }
      ]
    },
    {
      type: 'cards',
      alt: true,
      cols: 3,
      eyebrow: 'Regulator and public-health information',
      heading: 'Official sources',
      items: [
        { title: 'FDA information', text: 'US regulator pages on breast implants, dermal fillers and injectable-silicone warnings, summarised and linked.', href: '/research/fda-breast-enlargement/', kicker: 'U.S. FDA' },
        { title: 'NHS information', text: 'UK public-health patient information on breast enlargement, costs, complications and choosing a practitioner.', href: '/research/nhs-breast-enlargement/', kicker: 'NHS (UK)' },
        { title: 'healthdirect information', text: 'Australian Government health advice on breast augmentation — preparation, costs, recovery, complications and alternatives.', href: '/research/healthdirect-breast-enlargement/', kicker: 'healthdirect (AU)' },
        { title: 'MedlinePlus information', text: 'US National Library of Medicine consumer health information on breast augmentation surgery, risks, recovery and wound care.', href: '/research/medlineplus-breast-enlargement/', kicker: 'MedlinePlus (NLM)' }
      ]
    },
    {
      type: 'cards',
      cols: 3,
      eyebrow: 'Professional societies and academic sources',
      heading: 'Clinical and society libraries',
      items: [
        { title: 'BAPRAS patient guide', text: 'UK professional-association guide to breast augmentation: consultation and cooling-off, implant techniques, complication rates, long-term consequences and the implant registry.', href: '/research/bapras-breast-augmentation/', kicker: 'BAPRAS (UK)' },
        { title: 'BAAPS information', text: 'British Association of Aesthetic Plastic Surgeons patient information on breast augmentation and its risks.', href: '/research/baaps-breast-enlargement/', kicker: 'BAAPS (UK)' },
        { title: 'ASPS information', text: 'American Society of Plastic Surgeons patient information on breast augmentation: candidacy, cost, implant types, safety, recovery, results and choosing a surgeon.', href: '/research/asps-breast-enlargement/', kicker: 'ASPS (US)' },
        { title: 'Cleveland Clinic information', text: 'Academic patient education on breast augmentation, implant types, fat transfer, recovery and complications.', href: '/research/cleveland-clinic-breast-enlargement/', kicker: 'Cleveland Clinic' },
        { title: 'NCBI Bookshelf (StatPearls)', text: 'A peer-reviewed clinical review of breast augmentation — indications, contraindications, technique, complications and outcomes.', href: '/research/statpearls-breast-augmentation/', kicker: 'StatPearls' },
        { title: 'Wikipedia captures', text: 'Fixed-revision captures of the Wikipedia articles on breast enlargement and breast augmentation, with extracted facts and references, clearly labelled as encyclopedia content.', href: '/research/wikipedia-breast-enlargement/', kicker: 'Wikipedia' }
      ]
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'How to read research responsibly',
      text: 'An archive is not a recommendation service. A published paper can be small, observational, outdated or contradicted by later work. Systematic reviews and randomised trials sit at the top of the evidence ladder; single-centre case series and manufacturer surveys sit near the bottom. Before changing a treatment decision, read the full article, check its date and design, and discuss it with a qualified clinician.'
    },
    {
      type: 'cards',
      alt: true,
      cols: 2,
      eyebrow: 'Our own guides',
      heading: 'Start with the summaries',
      items: [
        { title: 'What works: evidence guide', text: 'A scorecard of more than 20 popular methods — what adds real volume, what only changes appearance, and what to avoid.', href: '/breast-enlargement-without-surgery/' },
        { title: 'References & sources', text: 'A single consolidated bibliography of every source this website indexes, grouped by publisher.', href: '/references/' }
      ]
    },
    stdCta({ heading: 'Bring your findings to a qualified clinician' })
  ]
};

const libraryPages = [
  understanding,
  anatomy,
  implants,
  implantSafety,
  choosingSurgeon,
  safety,
  glossary,
  references,
  researchHub
];

module.exports = { libraryPages };
