'use strict';

/* =============================================================================
   Site content — QuantumHealth by Dr. Vikas Singh
   Authored from the supplied PDF blueprint (evidence-aware pages) and the
   hero reference. Promotional claims in the reference designs (e.g. "clinically
   proven", "safe & effective", "no surgery, no scars") have been neutralised
   into informational language, per medical-advertising / evidence requirements.
   ============================================================================= */

const SITE_URL = (process.env.SITE_URL || 'https://quantumhealth-website.vercel.app').replace(/\/+$/, '');

const site = {
  name: 'QuantumHealth by Dr. Vikas Singh',
  shortName: 'QuantumHealth',
  tagline: 'Breast enhancement education and personalised aesthetic consultation.',
  domain: SITE_URL.replace(/^https?:\/\//, ''),
  url: SITE_URL,
  base: '/',
  defaultOg: '/assets/img/og-cover.svg',
  contact: {
    // ---------------------------------------------------------------------
    // PLACEHOLDER VALUES — replace with confirmed clinic details before launch.
    // Each is intentionally flagged so it is obvious what still needs sign-off.
    // ---------------------------------------------------------------------
    phone: '+852 4460 8658',
    email: 'enquiries@nonsurgicalbreastenlargement.in', // placeholder — real address to be confirmed
    address: 'Sun Tuen Mun Center, 55–56 Lung Mun Road, New Hong Kong Territories, Hong Kong',
    addressNote: 'Head office address as supplied by the clinic; street addresses for international locations are published once confirmed.',
    hours: 'Mon – Sat, 10:00 – 19:00 (to be confirmed)', // placeholder hours
    // Placeholder delivery endpoint. Leave empty to keep the form honest (it
    // will NOT fake a successful submission). Set a real Web3Forms/Formspree/
    // custom URL to enable delivery.
    formEndpoint: ''
  },
  footerBlurb: 'Physician-led breast enhancement education, personalised assessment and consultation for surgical and non-surgical options.',
  medicalDisclaimerShort: '',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Non-Surgical', href: '/non-surgical/' },
    { label: 'Surgical', href: '/surgical-breast-enhancement/' },
    { label: 'Gallery', href: '/before-after-gallery/' },
    { label: 'About', href: '/about-us/' },
    { label: 'Our Team', href: '/our-team/' },
    { label: 'Locations', href: '/locations/' },
    { label: 'Insights', href: '/blogs/' }
  ],
  navSecondary: [
    { label: 'Treatment comparison', href: '/breast-enhancement-comparison/' },
    { label: 'FAQs', href: '/faqs/' },
    { label: 'Video gallery', href: '/video-gallery/' },
    { label: 'Media & press', href: '/media-and-press/' },
    { label: 'Dr. Vikas Singh', href: '/about-dr-vikas-singh/' },
    { label: 'Book a consultation', href: '/book-consultation/' }
  ],
  footerExplore: [
    { label: 'Non-surgical options', href: '/non-surgical/' },
    { label: 'Surgical options', href: '/surgical-breast-enhancement/' },
    { label: 'Breast augmentation', href: '/surgical/breast-augmentation/' },
    { label: 'Fat transfer', href: '/surgical/fat-transfer-breast-augmentation/' },
    { label: 'Treatment comparison', href: '/breast-enhancement-comparison/' },
    { label: 'Gallery', href: '/before-after-gallery/' }
  ],
  footerPatient: [
    { label: 'About our approach', href: '/about-us/' },
    { label: 'Dr. Vikas Singh', href: '/about-dr-vikas-singh/' },
    { label: 'Our doctors panel', href: '/our-team/' },
    { label: 'Insights & articles', href: '/blogs/' },
    { label: 'FAQs', href: '/faqs/' },
    { label: 'Video gallery', href: '/video-gallery/' },
    { label: 'Media & press', href: '/media-and-press/' }
  ],
  footerContact: [
    { label: 'Book a consultation', href: '/book-consultation/' },
    { label: 'Locations', href: '/locations/' },
    { label: 'Enquiries by phone', href: '/book-consultation/' },
    { label: 'Enquiries by email', href: '/book-consultation/' }
  ],
  footerLegal: [
    { label: 'Privacy policy', href: '/privacy-policy/' },
    { label: 'Cookie policy', href: '/cookie-policy/' },
    { label: 'Terms of use', href: '/terms-of-use/' },
    { label: 'Medical disclaimer', href: '/medical-disclaimer/' },
    { label: 'Patient photography consent', href: '/patient-photography-consent/' }
  ]
};

/* ---------- shared blocks ---------- */
const stdCta = (over) => Object.assign({
  type: 'cta',
  eyebrow: 'Your journey starts with information',
  heading: "Let's explore your options together",
  text: 'Arrange a confidential consultation to discuss your goals and understand which options, if any, may be appropriate for you.',
  button: { label: 'Request a Consultation', href: '/book-consultation/' }
}, over || {});

const reviewNotice = {
  type: 'notice',
  blush: true,
  icon: 'evidence',
  title: 'Clinical review required before publication',
  text: 'This page is prepared as an editorial draft. Medical content, product claims and any references must be verified by a suitably qualified clinical reviewer and checked against the advertising rules of the relevant jurisdiction before this page is published.'
};

/* =============================================================================
   HOME
   ============================================================================= */
const home = {
  url: '/', slug: 'home', h1: '', showBanner: false,
  seoTitle: 'Breast Enhancement Options | QuantumHealth',
  seoDescription:
    'Physician-led information about surgical and non-surgical breast enhancement — suitability, evidence, limitations, recovery and confidential consultation.',
  schema: [
    {
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: 'QuantumHealth by Dr. Vikas Singh', url: site.url + '/'
    },
    {
      '@context': 'https://schema.org', '@type': 'MedicalBusiness',
      name: 'QuantumHealth by Dr. Vikas Singh',
      description: 'Physician-led breast enhancement education and aesthetic consultation.',
      url: site.url + '/',
      areaServed: 'IN'
    }
  ],
  blocks: [
    {
      type: 'hero',
      eyebrow: 'Physician-led aesthetic care',
      title: 'A More Informed Approach to <em>Breast Enhancement</em>',
      script: 'Confidence begins with an informed consultation',
      lead: 'Explore surgical and non-surgical options through personalised medical assessment, clear information, and a treatment plan aligned with your individual goals.',
      actions: [
        { label: 'Plan your consultation', href: '/book-consultation/', style: 'primary' },
        { label: 'Explore treatments', href: '#treatments', style: 'ghost' }
      ],
      note: 'Individual suitability, outcomes and risks vary. A consultation is required before any treatment decision.',
      slot: 'Hero portrait',
      slotNote: 'Licensed editorial / model photography — burgundy-to-blush gradient stood in for now',
      benefits: [
        { icon: 'nonsurgical', label: 'Non-surgical options' },
        { icon: 'surgical', label: 'Surgical options' },
        { icon: 'personalised', label: 'Personalised planning' },
        { icon: 'evidence', label: 'Evidence-informed' }
      ],
      featureStrip: [
        { icon: 'volume', label: 'Volume' },
        { icon: 'shape', label: 'Shape' },
        { icon: 'natural', label: 'Natural look' },
        { icon: 'downtime', label: 'Minimal downtime' },
        { icon: 'confidence', label: 'Confidence' }
      ]
    },
    {
      type: 'split',
      alt: true,
      eyebrow: 'Our approach',
      heading: 'Personalised care. Informed choices. Individualised planning.',
      body: '<p>Every person considering breast enhancement has different anatomy, breast tissue, aesthetic preferences and expectations. At QuantumHealth, our approach begins by understanding those factors before we discuss any available option.</p>' +
        '<p>We aim to make complex treatment choices easier to understand by presenting the potential benefits, limitations, recovery considerations and risks of each approach — so you can make decisions grounded in accurate information rather than promotion.</p>' +
        '<p>Whether you are exploring breast augmentation surgery, fat transfer or a non-surgical treatment, our focus is on transparent information and a carefully considered treatment plan.</p>',
      slot: 'Clinic / consultation environment',
      link: { label: 'Read about our philosophy', href: '/about-us/' },
      script: 'Clarity before any decision'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Our principles',
      heading: 'Four commitments that shape every consultation',
      cols: 4,
      items: [
        { icon: 'personalised', title: 'Individual assessment', text: 'Recommendations based on medical history, anatomy and personal goals.' },
        { icon: 'safety', title: 'Safety-first planning', text: 'Clear discussion of contraindications, alternatives and potential complications.' },
        { icon: 'evidence', title: 'Evidence-informed care', text: 'Treatment explanations grounded in available evidence and applicable regulations.' },
        { icon: 'discretion', title: 'Respect and discretion', text: 'A confidential, respectful environment for discussing sensitive concerns.' }
      ]
    },
    {
      type: 'cards',
      id: 'treatments',
      alt: false,
      cols: 2,
      eyebrow: 'Treatment pathways',
      heading: 'Explore your options by category',
      lead: 'Two broad pathways, each with different intended outcomes, evidence and risks.',
      items: [
        { title: 'Non-surgical options', kicker: 'Injectables · regenerative · skin quality', text: 'Selected injectable, regenerative and skin-quality approaches, considered with attention to evidence, suitability and approved indications. Not every non-surgical treatment is shown to increase breast volume.', href: '/non-surgical/', slot: 'Non-surgical treatment imagery' },
        { title: 'Surgical options', kicker: 'Implants · autologous fat transfer', text: 'Understand breast implants, silicone gel-filled implants and autologous fat transfer, including recovery and long-term considerations.', href: '/surgical-breast-enhancement/', slot: 'Surgical consultation imagery' }
      ]
    },
    {
      type: 'notice',
      blush: false,
      icon: 'info',
      title: 'An important clinical distinction',
      text: 'Injectable fillers, threads, PRP and biostimulators should not be presented as interchangeable alternatives to breast augmentation surgery. Their evidence, indications and ability to increase breast volume differ substantially, and a procedure being described as “non-surgical” does not by itself make it safe.'
    },
    {
      type: 'cards',
      alt: true,
      cols: 4,
      eyebrow: 'Treatments',
      heading: 'A closer look at individual options',
      items: [
        { title: 'Breast dermal fillers', text: 'Injectable products for specific approved aesthetic indications — and why breast use raises safety questions.', href: '/non-surgical/dermal-fillers/' },
        { title: 'PRP', text: 'How platelet-rich plasma is prepared, what it is intended to do, and how the evidence is assessed.', href: '/non-surgical/prp/' },
        { title: 'Thread-based procedures', text: 'PDO and mono threads: intended mechanical effects, limitations and product-specific indications.', href: '/non-surgical/breast-threads/' },
        { title: 'Sculptra & biostimulators', text: 'Poly-L-lactic acid and collagen-stimulating products — approved uses versus breast-use claims.', href: '/non-surgical/sculptra-plla/' },
        { title: 'Silicone gel implants', text: 'Medical devices with an outer shell and gel filling, and their long-term monitoring needs.', href: '/surgical/silicone-breast-implants/' },
        { title: 'Fat transfer', text: 'Using your own fat for a modest, individualised increase in volume, and its retention variability.', href: '/surgical/fat-transfer-breast-augmentation/' },
        { title: 'Breast augmentation', text: 'Surgical increase of breast volume using implants or, in selected cases, your own fat.', href: '/surgical/breast-augmentation/' },
        { title: 'Compare all options', text: 'A side-by-side view of intended effect, primary consideration and important limitation.', href: '/breast-enhancement-comparison/' }
      ]
    },
    {
      type: 'icon-grid',
      alt: true,
      eyebrow: 'Beyond breast enhancement',
      heading: 'More aesthetic solutions',
      lead: 'Quantum Health also lists the wider clinic services below, alongside regenerative and longevity medicine. Availability and services differ by location — confirm with the clinic.',
      cols: 4,
      items: [
        { icon: 'sparkle', title: 'Botox', text: 'Treatments for fine lines and youthful-looking skin.' },
        { icon: 'natural', title: 'Skin boosters', text: 'Injectable treatments for hydrated, glowing skin.' },
        { icon: 'shape', title: 'Body contouring', text: 'Non-surgical body contouring and shaping.' },
        { icon: 'personalised', title: 'Hair restoration', text: 'Hair transplantation and restoration.' },
        { icon: 'clock', title: 'Anti-ageing', text: 'Anti-ageing medicine and treatments.' },
        { icon: 'safety', title: 'IV therapy', text: 'Intravenous wellness therapy.' },
        { icon: 'scale', title: 'Slimming', text: 'Slimming and body-toning programmes.' },
        { icon: 'evidence', title: 'Wellness & longevity', text: 'Personalised wellness and longevity programmes.' }
      ]
    },
    {
      type: 'split',
      reverse: true,
      eyebrow: 'Physician-led aesthetic care',
      heading: 'Meet Dr. Vikas Singh',
      body: '<p>Dr. Vikas Singh is a cosmetic dermatologist, hair transplant surgeon and regenerative medicine practitioner, with more than 20 years across cosmetology, dermatology, hair transplantation, anti-ageing and regenerative medicine.</p>' +
        '<p>His stated philosophy centres on healthspan — bringing appearance, regeneration and longevity into one considered plan for each patient.</p>',
      slot: 'Portrait — Dr. Vikas Singh',
      slotNote: 'Licensed professional portrait to be supplied',
      link: { label: "Discover Dr. Singh's profile", href: '/about-dr-vikas-singh/' }
    },
    {
      type: 'steps',
      alt: true,
      eyebrow: 'How your consultation works',
      heading: 'A clear, five-step pathway',
      lead: 'A consultation is a conversation, not a commitment. Progression to treatment only happens if it is clinically appropriate for you.',
      items: [
        { title: 'Tell us what matters to you', text: 'Share your concerns, preferences, medical history and the outcomes you hope to achieve.' },
        { title: 'Clinical assessment', text: 'Your clinician reviews relevant medical factors and determines whether further examination, imaging or specialist assessment is appropriate.' },
        { title: 'Understand your options', text: 'Review suitable procedures, alternatives, expected limitations, recovery considerations and potential risks.' },
        { title: 'Make an informed decision', text: 'Proceed only if the selected treatment is clinically appropriate and you have had time to understand and consent to it.' },
        { title: 'Follow-up and aftercare', text: 'Receive procedure-specific instructions, follow-up arrangements and guidance on when to seek medical attention.' }
      ],
      slot: 'Consultation room detail'
    },
    {
      type: 'cards',
      eyebrow: 'Education and insights',
      heading: 'Understand the differences before you decide',
      lead: 'Evidence-led articles on treatment options, safety and the questions worth asking.',
      items: [
        { title: 'Surgical vs non-surgical breast enhancement', text: 'Understand the differences in intended outcome, recovery, evidence and risk.', href: '/blogs/surgical-vs-non-surgical-breast-enhancement/', kicker: 'Treatment guides' },
        { title: 'Questions to ask before treatment', text: 'A practical guide to credentials, products, informed consent and aftercare.', href: '/blogs/ten-questions-to-ask-at-a-breast-enhancement-consultation/', kicker: 'Patient resources' },
        { title: 'PRP and the evidence', text: 'The difference between researching a treatment and establishing its safety and effectiveness.', href: '/blogs/prp-and-breast-enhancement-what-the-evidence-says/', kicker: 'Evidence & research' }
      ]
    },
    {
      type: 'gallery',
      alt: true,
      eyebrow: 'Results and patient stories',
      heading: 'Real experiences, presented responsibly',
      lead: 'Where genuine, consented clinical cases exist, they are shown with consistent photography, clinical context and a clear statement that individual results vary. Before-and-after imagery is never fabricated or digitally altered to exaggerate outcomes.',
      items: [
        { caption: 'Breast augmentation — consented case (placeholder)', slot: 'Consented case 01', slotNote: 'Awaiting genuine consented photography' },
        { caption: 'Fat transfer — consented case (placeholder)', slot: 'Consented case 02', slotNote: 'Awaiting genuine consented photography' },
        { caption: 'Pre-treatment reference (placeholder)', slot: 'Clinical reference', slotNote: 'Awaiting genuine consented photography' },
        { caption: 'Follow-up reference (placeholder)', slot: 'Clinical reference', slotNote: 'Awaiting genuine consented photography' }
      ]
    },
    {
      type: 'cards',
      cols: 3,
      eyebrow: 'Locations',
      heading: 'Where to find us',
      lead: 'Head office in Hong Kong, with clinic presence across the Middle East, Canada, Thailand and India.',
      items: [
        { title: 'Hong Kong — head office', text: 'Sun Tuen Mun Center, 55–56 Lung Mun Road, New Hong Kong Territories, Hong Kong. Consultation and treatment rooms, VIP lounge and wellness boutique.', href: '/locations/', slot: 'Hong Kong clinic imagery' },
        { title: 'Eight international locations', text: 'Dubai, Bahrain, Toronto, Bangkok, Bangalore, Hyderabad, Mumbai and Chennai, each with its own service focus.', href: '/locations/', slot: 'International locations imagery' },
        { title: 'Enquiries', text: 'Request a consultation and the clinic team will confirm availability with you directly.', href: '/book-consultation/' }
      ]
    },
    stdCta()
  ]
};

/* =============================================================================
   REUSABLE PAGE FACTORY + SIMPLE PAGES
   ============================================================================= */
const NS = 'Non-surgical treatment information';
const SG = 'Surgical treatment information';

function treatmentPage(o) {
  return {
    url: o.url, slug: o.slug, h1: o.h1,
    seoTitle: o.seoTitle, seoDescription: o.seoDescription,
    bannerEyebrow: o.bannerEyebrow, bannerLead: o.bannerLead,
    breadcrumb: o.breadcrumb,
    schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: o.h1, url: site.url + o.url, isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' } }],
    blocks: [].concat(o.blocks, [stdCta({ heading: o.ctaHeading || "Discuss whether this option may be appropriate for you" }), reviewNotice])
  };
}

const pages = [];

/* ---------- Non-surgical overview ---------- */
pages.push({
  url: '/non-surgical/', slug: 'non-surgical',
  h1: 'Non-Surgical Breast Enhancement: Options, Evidence & Safety',
  seoTitle: 'Non-Surgical Breast Enhancement: Options & Safety | QuantumHealth',
  seoDescription: 'Explore non-surgical breast enhancement options — dermal fillers, PRP, threads, Sculptra and biostimulators — with their evidence, limitations and safety considerations.',
  bannerEyebrow: NS,
  bannerLead: 'Non-surgical treatments differ widely in their intended effects, evidence and regulatory status. This section explains those differences clearly, without advertising claims.',
  breadcrumb: [{ label: 'Non-surgical' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Non-Surgical Breast Enhancement', url: site.url + '/non-surgical/' }],
  blocks: [
    { type: 'prose', html:
      '<p>Treatments marketed as “non-surgical breast enlargement” are not a single category. They include injectable fillers, platelet-rich plasma (PRP), thread-based procedures and collagen-stimulating biostimulators. Each has a different intended effect, a different evidence base and a different regulatory position.</p>' +
      '<p>Crucially, being non-surgical does not automatically mean a treatment is safe, and not every treatment marketed for this purpose has been demonstrated to reliably increase breast volume. This section is written to help you understand those distinctions before any clinical consultation.</p>' },
    { type: 'notice', icon: 'info', title: 'The most important point',
      text: 'Dermal fillers are not approved for breast enlargement, and the FDA advises against using fillers or other injectable fillers to increase breast size because of potentially serious complications. Regenerative and biostimulatory products require careful scrutiny of their evidence and regulatory status before any claim of benefit is accepted.' },
    { type: 'cards', cols: 3, alt: true, eyebrow: 'Options covered', heading: 'Non-surgical treatments explained individually',
      items: [
        { title: 'Breast dermal fillers', text: 'Injectable products for specific approved aesthetic indications, and the serious safety questions around breast use.', href: '/non-surgical/dermal-fillers/', slot: 'Dermal filler imagery' },
        { title: 'PRP (platelet-rich plasma)', text: 'Prepared from your own blood to concentrate platelets. What it is intended to do, and how evidence is assessed.', href: '/non-surgical/prp/', slot: 'PRP preparation imagery' },
        { title: 'PDO threads', text: 'Medical sutures placed in tissue for specific intended effects, with product-specific indications and limitations.', href: '/non-surgical/breast-threads/', slot: 'Thread procedure imagery' },
        { title: 'Mono threads', text: 'Ultra-fine threads that differ in design and intended mechanical effect from cog threads.', href: '/non-surgical/mono-threads/', slot: 'Mono thread imagery' },
        { title: 'Sculptra & PLLA', text: 'Poly-L-lactic acid injectables for certain specified aesthetic indications, subject to product labelling and local authorisation.', href: '/non-surgical/sculptra-plla/', slot: 'PLLA product imagery' },
        { title: 'Biostimulators', text: 'A broad category intended to stimulate a tissue response such as collagen production, for selected indications.', href: '/non-surgical/biostimulators/', slot: 'Biostimulator imagery' },
        { title: 'Stem cells & regenerative medicine', text: 'The subject of ongoing research. “Regenerative” does not establish that a product is effective or approved.', href: '/non-surgical/regenerative-medicine/', slot: 'Regenerative research imagery' },
        { title: 'Home care & skin quality', text: 'Supportive skin-quality measures discussed at consultation where appropriate.', href: '/non-surgical/' }
      ]
    },
    { type: 'steps', eyebrow: 'Assessing any non-surgical claim', heading: 'Six questions worth asking',
      lead: 'Any advertised non-surgical breast treatment should withstand these questions before you consider it.',
      items: [
        { title: 'What is the exact product and intended use?', text: 'Ask for the precise product name, its approved indications and whether breast use is authorised in your jurisdiction.' },
        { title: 'Is it approved for this purpose?', text: 'Facial approval does not imply approval for injection into the breasts. Products and permitted uses vary by country.' },
        { title: 'What does the evidence actually show?', text: 'Distinguish marketing claims from peer-reviewed evidence for the specific procedure being offered.' },
        { title: 'Who is performing it, and with what competence?', text: 'Suitability depends on the precise product, intended use, clinician competence and applicable regulation.' },
        { title: 'What are the risks and possible complications?', text: 'Ask about infection, pain, tissue damage, nodules, asymmetry and how complications would be managed.' },
        { title: 'What are the alternatives?', text: 'Consider evidence-based alternatives for increasing breast volume, including surgical options where relevant.' }
      ],
      slot: 'Consultation imagery' },
    { type: 'table', eyebrow: 'At a glance', heading: 'Primary consideration and key limitation',
      head: ['Option', 'Primary consideration', 'Important limitation'],
      rows: [
        ['Dermal fillers', 'Product-specific approved indications', 'Not FDA-approved for breast enlargement'],
        ['PRP', 'Evidence for the particular intended use', 'Should not be promoted as proven breast enlargement'],
        ['Threads & mono threads', 'Product-specific aesthetic indications', 'Not established substitutes for breast augmentation'],
        ['Sculptra / biostimulators', 'Product-specific authorised uses', 'Do not assume suitability for breast-volume enhancement'],
        ['Stem-cell approaches', 'Evidence and regulatory status of the exact product', 'Many marketed regenerative uses remain unapproved or investigational'],
        ['Silicone breast implants', 'Surgical increase in breast volume', 'Surgery, implant-related risks and potential future procedures'],
        ['Fat transfer', 'Uses the patient’s own fat for augmentation', 'Variable fat retention and a limited, individualised result']
      ],
      note: 'This table helps distinguish a procedure’s intended effect from claims made in advertising. It should not be read to suggest that a non-surgical procedure is automatically safer than surgery.'
    },
    { type: 'faq', id: 'ns', alt: true, eyebrow: 'Questions', heading: 'Non-surgical treatment FAQs',
      items: [
        { q: 'Can breast size be increased without surgery?', a: '<p>Some treatments are marketed for this purpose, but the evidence and regulatory status vary. Many non-surgical approaches have not been shown to reliably increase breast volume. A professional assessment is the appropriate way to establish what is realistic and which, if any, option is suitable for you.</p>' },
        { q: 'Are dermal fillers safe for breast enlargement?', a: '<p>Dermal fillers are not approved for breast enlargement, and regulators advise against using them for this purpose because of potentially serious complications. A filler approved for facial use should not be assumed suitable for injection into the breasts.</p>' },
        { q: 'Is PRP a proven breast enlargement treatment?', a: '<p>PRP’s effects depend on the specific indication and the evidence available for it. It should not be marketed as a proven method of increasing breast size without robust evidence supporting that particular use.</p>' },
        { q: 'Does “regenerative” mean a treatment is effective?', a: '<p>No. The term describes an area of ongoing research, not proof of effectiveness, approval or suitability for breast enhancement. Products and permitted uses vary by jurisdiction.</p>' }
      ]
    },
    stdCta({ heading: 'Understand the evidence before you choose a non-surgical option' })
  ]
});

/* ---------- Individual non-surgical treatment pages ---------- */
pages.push(treatmentPage({
  url: '/non-surgical/dermal-fillers/', slug: 'dermal-fillers',
  h1: 'Breast Dermal Fillers: Safety, Evidence & Alternatives',
  seoTitle: 'Breast Fillers: Safety, Evidence & Alternatives | QuantumHealth',
  seoDescription: 'An evidence-aware overview of injectable dermal fillers and breast enhancement: approved uses, serious safety concerns, FDA advice and evidence-based alternatives.',
  bannerEyebrow: 'Non-surgical · Injectable fillers',
  bannerLead: 'Dermal fillers are injectable products used for certain approved aesthetic indications. Their use for breast enlargement is a different matter and is not established, approved or routine.',
  breadcrumb: [{ label: 'Non-surgical', href: '/non-surgical/' }, { label: 'Dermal fillers' }],
  blocks: [
    { type: 'notice', icon: 'info', title: 'Regulatory position',
      text: 'The FDA advises against using dermal fillers or other injectable fillers to increase breast size. Serious complications from inappropriate body injections can include infection, persistent pain, tissue damage, scarring, deformity and potentially life-threatening events.' },
    { type: 'prose', html:
      '<h2 class="h3">What dermal fillers are</h2>' +
      '<p>Dermal fillers are injectable products used for certain approved aesthetic indications, depending on the product and the jurisdiction. Different products have different compositions, behaviours and licensed uses.</p>' +
      '<h2 class="h3">Why breast use is different</h2>' +
      '<p>An approval for facial use does not imply suitability for injection into the breasts. The breast is a different anatomical site with different considerations, and the consequences of complications can be more difficult to manage. Because of this, breast filler injections should not be advertised or presented as a routine breast-enlargement service.</p>' },
    { type: 'icon-grid', eyebrow: 'What this page should help you understand', heading: 'Safety and decision points', cols: 3,
      items: [
        { icon: 'safety', title: 'Potential complications', text: 'The difficulty of managing some injected materials, and why complications can be serious or persistent.' },
        { icon: 'evidence', title: 'Evidence-based alternatives', text: 'Options for people seeking increased breast volume that are supported by clearer evidence.' },
        { icon: 'personalised', title: 'Independent advice', text: 'The importance of independent medical advice before considering any advertised treatment.' }
      ]
    },
    { type: 'faq', alt: true, id: 'df', eyebrow: 'Questions', heading: 'Dermal filler FAQs',
      items: [
        { q: 'Are breast fillers approved?', a: '<p>Dermal fillers are not approved for breast enlargement. Regulators advise against using them for this purpose because of potentially serious complications.</p>' },
        { q: 'What alternatives exist for added volume?', a: '<p>Alternatives with clearer evidence for increasing breast volume include surgical options such as implants or, in selected cases, autologous fat transfer. Suitability depends on individual factors and should be assessed by an appropriately qualified clinician.</p>' }
      ]
    }
  ],
  ctaHeading: 'Prefer an evidence-based conversation?'
}));

pages.push(treatmentPage({
  url: '/non-surgical/prp/', slug: 'prp',
  h1: 'PRP and Breast Enhancement: What the Evidence Says',
  seoTitle: 'PRP and Breast Enhancement: Evidence Explained | QuantumHealth',
  seoDescription: 'How platelet-rich plasma (PRP) is prepared, what it is intended to do, and why evidence and regulatory requirements matter for any breast-enhancement claim.',
  bannerEyebrow: 'Non-surgical · Regenerative',
  bannerLead: 'Platelet-rich plasma is prepared from your own blood to concentrate platelets. Its effects depend entirely on the specific indication and the evidence available for it.',
  breadcrumb: [{ label: 'Non-surgical', href: '/non-surgical/' }, { label: 'PRP' }],
  blocks: [
    { type: 'prose', html:
      '<h2 class="h3">How PRP is prepared</h2>' +
      '<p>PRP is prepared by taking a sample of the patient’s own blood and processing it to concentrate the platelets. The resulting preparation is intended for specific purposes; those purposes are not interchangeable, and a preparation intended for one indication is not automatically appropriate for another.</p>' +
      '<h2 class="h3">PRP and breast enhancement</h2>' +
      '<p>Claims about PRP and breast enhancement should be assessed against appropriate clinical evidence for the precise procedure being offered. The evidence for a particular use should be established before that use is described as effective.</p>' },
    { type: 'icon-grid', eyebrow: 'What this page should explain', heading: 'Key points', cols: 3,
      items: [
        { icon: 'evidence', title: 'How PRP is prepared', text: 'What it is intended to do, and why preparation and indication matter.' },
        { icon: 'safety', title: 'Procedure-related risks', text: 'Possible pain, bruising, bleeding, infection and other procedure-related risks.' },
        { icon: 'personalised', title: 'Clinician review', text: 'Why suitability and expected outcomes require review by a qualified clinician, with reference to local regulatory requirements.' }
      ]
    },
    { type: 'faq', alt: true, id: 'prp', eyebrow: 'Questions', heading: 'PRP FAQs',
      items: [
        { q: 'Is PRP proven for breast enlargement?', a: '<p>PRP should not be marketed as a proven method of increasing breast size without robust evidence supporting that particular use. Effects depend on the specific indication and the available evidence.</p>' },
        { q: 'Is PRP safe because it uses my own blood?', a: '<p>Using your own blood reduces some risks but does not remove them. Any procedure carries procedure-related risks such as pain, bruising, bleeding or infection, and suitability still requires clinical review.</p>' }
      ]
    }
  ],
  ctaHeading: 'Ask what the evidence supports for your situation'
}));

pages.push(treatmentPage({
  url: '/non-surgical/breast-threads/', slug: 'breast-threads',
  h1: 'Breast Thread Procedures: Uses & Limitations',
  seoTitle: 'Breast Thread Procedures: Uses & Limitations | QuantumHealth',
  seoDescription: 'PDO cog threads and thread-based aesthetic procedures: intended effects, product-specific indications, limitations and potential risks.',
  bannerEyebrow: 'Non-surgical · PDO threads',
  bannerLead: 'Thread procedures use medical sutures placed in tissue for specific intended effects. Different thread materials, designs and placement techniques have different indications and limitations.',
  breadcrumb: [{ label: 'Non-surgical', href: '/non-surgical/' }, { label: 'PDO threads' }],
  blocks: [
    { type: 'prose', html:
      '<h2 class="h3">Understanding thread-based procedures</h2>' +
      '<p>Thread-based procedures are not, on current evidence, a predictable alternative to breast surgery. Threads should not be presented as established substitutes for breast augmentation.</p>' +
      '<p>Potential risks include infection, discomfort, visible or palpable threads, asymmetry, thread migration or extrusion, and the need for corrective treatment. Suitability depends on the precise product, intended use, clinician competence and applicable regulations.</p>' },
    { type: 'icon-grid', eyebrow: 'What this page should cover', heading: 'Points to review at consultation', cols: 3,
      items: [
        { icon: 'evidence', title: 'Product-specific indications', text: 'Thread material and the indications specific to each product.' },
        { icon: 'scale', title: 'Intended outcome & limits', text: 'What the procedure is intended to do, and what it cannot reasonably achieve.' },
        { icon: 'personalised', title: 'Alternatives & requirements', text: 'Available alternatives and the consultation requirements before any procedure.' }
      ]
    },
    { type: 'faq', alt: true, id: 'th', eyebrow: 'Questions', heading: 'Thread FAQ',
      items: [
        { q: 'Are threads an alternative to breast surgery?', a: '<p>Threads are not established substitutes for breast augmentation. Their evidence, indications and ability to increase breast volume differ substantially from surgery.</p>' },
        { q: 'What are the risks of thread procedures?', a: '<p>Risks can include infection, discomfort, visible or palpable threads, asymmetry, thread migration or extrusion, and the possibility that corrective treatment is needed.</p>' }
      ]
    }
  ],
  ctaHeading: 'Discuss thread options and their limitations'
}));

pages.push(treatmentPage({
  url: '/non-surgical/mono-threads/', slug: 'mono-threads',
  h1: 'Mono Threads: Design, Effect & Limitations',
  seoTitle: 'Mono Threads: Uses and Limitations | QuantumHealth',
  seoDescription: 'What mono threads are, how they differ from cog threads in design and intended mechanical effect, and why breast-enlargement claims require evidence.',
  bannerEyebrow: 'Non-surgical · Mono threads',
  bannerLead: 'Mono threads differ from cog threads in design and intended mechanical effect. These differences matter when assessing suitability and realistic outcomes.',
  breadcrumb: [{ label: 'Non-surgical', href: '/non-surgical/' }, { label: 'Mono threads' }],
  blocks: [
    { type: 'prose', html:
      '<p>Mono threads are fine threads used in aesthetics for particular intended effects. They should not be claimed to reliably enlarge the breast without suitable evidence. As with all thread procedures, the intended effect is defined by the specific product and technique.</p>' },
    { type: 'icon-grid', eyebrow: 'What this page should cover', heading: 'Review at consultation', cols: 3,
      items: [
        { icon: 'evidence', title: 'Thread design & indications', text: 'How mono threads differ in design and intended mechanical effect.' },
        { icon: 'scale', title: 'Outcome & limitations', text: 'The intended outcome and the limits of what the procedure can achieve.' },
        { icon: 'personalised', title: 'Alternatives', text: 'Available alternatives, including options with clearer evidence for added volume.' }
      ]
    }
  ],
  ctaHeading: 'Discuss whether mono threads suit your goals'
}));

pages.push(treatmentPage({
  url: '/non-surgical/regenerative-medicine/', slug: 'regenerative-medicine',
  h1: 'Stem Cells & Regenerative Medicine: An Honest Overview',
  seoTitle: 'Stem Cells and Regenerative Medicine | QuantumHealth',
  seoDescription: 'Stem cells and regenerative products are the subject of ongoing research. What “regenerative” does and does not establish, and why regulatory status matters.',
  bannerEyebrow: 'Non-surgical · Regenerative',
  bannerLead: 'Stem cells and other regenerative products are the subject of ongoing research. The term “regenerative” does not establish that a product is effective, approved or appropriate for breast enhancement.',
  breadcrumb: [{ label: 'Non-surgical', href: '/non-surgical/' }, { label: 'Regenerative medicine' }],
  blocks: [
    { type: 'notice', icon: 'safety', title: 'Research versus established care',
      text: 'Many marketed regenerative uses remain unapproved or investigational. Products marketed as regenerative can carry risks including infection and other serious complications, and permitted uses vary by jurisdiction.' },
    { type: 'icon-grid', eyebrow: 'Content sections', heading: 'What to understand', cols: 4,
      items: [
        { icon: 'evidence', title: 'Meaning of “regenerative”', text: 'What the term does and does not establish about a product.' },
        { icon: 'scale', title: 'Research vs. care', text: 'The difference between an investigational approach and established clinical practice.' },
        { icon: 'safety', title: 'Sourcing & regulation', text: 'Product sourcing, processing, regulatory status, uncertainties and informed consent.' },
        { icon: 'info', title: 'Alternatives & referral', text: 'Evidence-based alternatives and specialist referral where appropriate.' }
      ]
    }
  ],
  ctaHeading: 'Get a balanced view of regenerative claims'
}));

pages.push(treatmentPage({
  url: '/non-surgical/sculptra-plla/', slug: 'sculptra-plla',
  h1: 'Sculptra and PLLA: Uses, Safety & Evidence',
  seoTitle: 'Sculptra and PLLA: Uses, Safety & Evidence | QuantumHealth',
  seoDescription: 'Sculptra and poly-L-lactic acid injectables: intended approved uses, the difference between collagen-stimulation claims and breast augmentation, and key safety points.',
  bannerEyebrow: 'Non-surgical · PLLA',
  bannerLead: 'Sculptra is a poly-L-lactic acid-based injectable used for certain specified aesthetic indications, subject to product labelling and local authorisation. It should not be described as a proven breast-enlargement product.',
  breadcrumb: [{ label: 'Non-surgical', href: '/non-surgical/' }, { label: 'Sculptra / PLLA' }],
  blocks: [
    { type: 'prose', html:
      '<p>Understanding Sculptra means understanding its intended approved uses, the difference between collagen-stimulation claims and actual breast augmentation, and the importance of respecting product-specific contraindications and instructions.</p>' },
    { type: 'icon-grid', eyebrow: 'Patient education topics', heading: 'What to ask about', cols: 4,
      items: [
        { icon: 'scale', title: 'PLLA vs. HA fillers', text: 'How PLLA-based products differ from traditional hyaluronic acid fillers.' },
        { icon: 'evidence', title: 'Intended treatment area', text: 'Why the intended treatment area and approved indications matter.' },
        { icon: 'safety', title: 'Possible complications', text: 'Potential nodules, inflammatory reactions, infection and other complications.' },
        { icon: 'info', title: 'Breast-use caution', text: 'Why breast use should not be promoted without appropriate evidence and authorisation.' }
      ]
    }
  ],
  ctaHeading: 'Ask about Sculptra’s approved uses'
}));

pages.push(treatmentPage({
  url: '/non-surgical/biostimulators/', slug: 'biostimulators',
  h1: 'Biostimulators: Collagen-Stimulating Treatments Explained',
  seoTitle: 'Biostimulators: Collagen-Stimulating Treatments | QuantumHealth',
  seoDescription: 'Biostimulators are a broad category intended to stimulate a tissue response for selected indications. Their ingredients, authorised uses and safety profiles vary.',
  bannerEyebrow: 'Non-surgical · Biostimulators',
  bannerLead: 'Biostimulators are a broad category of products intended to stimulate a tissue response, such as collagen production, for selected indications. Their ingredients, mechanisms, authorised uses and safety profiles vary considerably.',
  breadcrumb: [{ label: 'Non-surgical', href: '/non-surgical/' }, { label: 'Biostimulators' }],
  blocks: [
    { type: 'icon-grid', eyebrow: 'What this page should explain', heading: 'Points to clarify', cols: 4,
      items: [
        { icon: 'evidence', title: 'Product-specific indications', text: 'The authorised indication for each individual product.' },
        { icon: 'clock', title: 'Onset & limitations', text: 'Expected onset and the limitations of any authorised effect.' },
        { icon: 'safety', title: 'Possible complications', text: 'Potential nodules, inflammation, infection and other complications.' },
        { icon: 'personalised', title: 'Alternatives', text: 'Alternatives for patients whose primary goal is increased breast volume.' }
      ]
    },
    { type: 'prose', alt: true, html:
      '<p>Because this category is broad, it is important to identify products accurately and to distinguish their approved uses from experimental or unsupported claims. This page is intended as a starting point for a specific conversation at consultation.</p>' }
  ],
  ctaHeading: 'Discuss biostimulators with a qualified clinician'
}));

/* ---------- Surgical overview ---------- */
pages.push({
  url: '/surgical-breast-enhancement/', slug: 'surgical-breast-enhancement',
  h1: 'Surgical Breast Enhancement: Implants & Fat Transfer',
  seoTitle: 'Breast Augmentation: Implants & Fat Transfer | QuantumHealth',
  seoDescription: 'An educational overview of surgical breast enhancement — breast augmentation, silicone gel-filled implants and autologous fat transfer, including recovery and long-term considerations.',
  bannerEyebrow: SG,
  bannerLead: 'Surgical options can increase breast volume or alter breast shape. Like all surgery, they carry risks, require informed consent and may involve future procedures.',
  breadcrumb: [{ label: 'Surgical' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Surgical Breast Enhancement', url: site.url + '/surgical-breast-enhancement/' }],
  blocks: [
    { type: 'prose', html:
      '<p>Breast augmentation is a surgical procedure designed to increase breast volume or alter breast shape using implants or, in selected cases, the patient’s own fat. It may be considered by people seeking greater fullness, a change in proportions, or restoration of volume following pregnancy or weight change.</p>' +
      '<p>Treatment planning should take account of anatomy, existing breast tissue, skin characteristics, general health, lifestyle, expectations, and the individual’s willingness to accept surgical risks and future follow-up. An appropriately credentialed surgeon should lead this assessment.</p>' },
    { type: 'cards', alt: true, cols: 3, eyebrow: 'Options', heading: 'Surgical pathways',
      items: [
        { title: 'Breast augmentation', text: 'A personalised approach to increasing breast volume or altering shape using implants or, in selected cases, your own fat.', href: '/surgical/breast-augmentation/', slot: 'Breast augmentation imagery' },
        { title: 'Silicone gel-filled implants', text: 'Medical devices with an outer shell and a silicone gel filling — not the same as injectable silicone.', href: '/surgical/silicone-breast-implants/', slot: 'Implant imagery' },
        { title: 'Fat transfer', text: 'Using your own fat, transferred from a donor area, for a modest and individualised increase in volume.', href: '/surgical/fat-transfer-breast-augmentation/', slot: 'Fat transfer imagery' }
      ]
    },
    { type: 'icon-grid', eyebrow: 'What patients should understand', heading: 'Key considerations before surgery', cols: 3,
      items: [
        { icon: 'scale', title: 'Implant vs. fat transfer', text: 'The difference between implant-based augmentation and autologous fat transfer.' },
        { icon: 'personalised', title: 'Qualified surgeon', text: 'The importance of a qualified and appropriately credentialed plastic surgeon.' },
        { icon: 'evidence', title: 'Preoperative assessment', text: 'The need for preoperative assessment and informed consent.' },
        { icon: 'downtime', title: 'Recovery & scarring', text: 'Recovery requirements, scar management and follow-up.' },
        { icon: 'safety', title: 'Complications & revision', text: 'Potential complications and the possibility of revision surgery.' },
        { icon: 'info', title: 'No guarantees', text: 'Surgery cannot promise permanent outcomes, guaranteed symmetry or zero scarring.' }
      ]
    },
    { type: 'steps', alt: true, eyebrow: 'Preparation', heading: 'Preparing for a surgical consultation',
      lead: 'Come prepared to discuss your goals, health and the questions that matter most to you.',
      items: [
        { title: 'Clarify your goals and expectations', text: 'What change are you hoping for, and how would you prioritise proportion, size and shape?' },
        { title: 'Share your full medical history', text: 'Including previous surgery, medications, allergies and relevant family history.' },
        { title: 'Ask about credentials', text: 'Request the surgeon’s qualifications, registration and specific breast-procedure experience.' },
        { title: 'Ask about the plan and its limits', text: 'Discuss technique, expected limitations, recovery, costs and potential revision.' },
        { title: 'Take time to decide', text: 'Proceed only when you understand the risks, alternatives and aftercare, and feel ready to consent.' }
      ],
      slot: 'Surgical consultation imagery'
    },
    { type: 'notice', icon: 'info', title: 'No guarantees',
      text: 'Surgery is not appropriate for everyone and cannot promise permanent outcomes, guaranteed symmetry, zero scarring or a risk-free result. Individual suitability, risks and outcomes vary and require assessment by an appropriately qualified clinician.' },
    stdCta({ heading: 'Discuss surgical options with a qualified surgeon' })
  ]
});

/* ---------- Individual surgical treatment pages ---------- */
pages.push(treatmentPage({
  url: '/surgical/breast-augmentation/', slug: 'breast-augmentation',
  h1: 'A Personalised Approach to Breast Augmentation',
  seoTitle: 'Breast Augmentation: Implants & Fat Transfer | QuantumHealth',
  seoDescription: 'Breast augmentation using implants or autologous fat transfer: treatment planning, preoperative assessment, recovery, risks and the possibility of revision surgery.',
  bannerEyebrow: 'Surgical · Breast augmentation',
  bannerLead: 'Breast augmentation is a surgical procedure designed to increase breast volume or alter breast shape using implants or, in selected cases, the patient’s own fat.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Breast augmentation' }],
  blocks: [
    { type: 'prose', html:
      '<p>It may be considered by people seeking greater fullness, a change in proportions, or restoration of volume following pregnancy or weight change. Treatment planning should account for anatomy, existing breast tissue, skin characteristics, general health, lifestyle, expectations and the individual’s willingness to accept surgical risks and future follow-up.</p>' },
    { type: 'icon-grid', eyebrow: 'What patients should understand', heading: 'Before deciding', cols: 3,
      items: [
        { icon: 'scale', title: 'Implant vs. fat transfer', text: 'The difference between implant-based augmentation and fat transfer, and what each can achieve.' },
        { icon: 'personalised', title: 'Qualified surgeon', text: 'Why a qualified and appropriately credentialed plastic surgeon should lead the plan.' },
        { icon: 'evidence', title: 'Assessment & consent', text: 'The need for preoperative assessment and informed consent.' },
        { icon: 'downtime', title: 'Recovery & scars', text: 'Recovery requirements, scar management and follow-up.' },
        { icon: 'safety', title: 'Complications', text: 'Potential complications and the possibility that revision surgery is needed.' }
      ]
    },
    { type: 'faq', alt: true, id: 'aug', eyebrow: 'Questions', heading: 'Breast augmentation FAQs',
      items: [
        { q: 'How long does recovery take?', a: '<p>Recovery varies according to the procedure, surgical technique, individual healing and the clinician’s advice. Your surgeon will give you a personalised return-to-activity timeline.</p>' },
        { q: 'Are the results permanent?', a: '<p>No procedure can promise permanent results. Breast implants are not lifetime devices: additional operations may be needed and complications can occur. Fat transfer results depend on how much transferred fat survives.</p>' },
        { q: 'How do I know which approach is right for me?', a: '<p>The appropriate option depends on your health, anatomy, expectations, risk tolerance and the evidence for the intended treatment. This should be determined through assessment by an appropriately qualified clinician.</p>' }
      ]
    }
  ],
  ctaHeading: 'Plan a personalised breast augmentation consultation'
}));

pages.push(treatmentPage({
  url: '/surgical/silicone-breast-implants/', slug: 'silicone-breast-implants',
  h1: 'Silicone Breast Implants: A Patient Guide',
  seoTitle: 'Silicone Breast Implants: Patient Guide | QuantumHealth',
  seoDescription: 'Silicone gel-filled breast implants: what they are, how implant selection works, long-term monitoring, potential complications and the difference from injectable silicone.',
  bannerEyebrow: 'Surgical · Breast implants',
  bannerLead: 'Silicone gel-filled breast implants are medical devices with an outer shell and a silicone gel filling. They are different from injectable silicone, which must never be represented as an equivalent or safe substitute for an implant.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Silicone implants' }],
  blocks: [
    { type: 'notice', icon: 'safety', title: 'Not the same as injectable silicone',
      text: 'Injectable silicone is a different product and should not be used as a substitute for a breast implant. Injectable silicone used for breast enhancement can cause serious, potentially permanent harm.' },
    { type: 'prose', html:
      '<h2 class="h3">How implant selection works</h2>' +
      '<p>Implant selection depends on individual anatomy, product characteristics, surgical assessment and the patient’s preferences. Patients should receive the relevant product information and understand that breast implants are not lifetime devices.</p>' +
      '<p>Additional operations may be needed, and complications can include rupture, capsular contracture, infection, changes in sensation and other implant-associated risks.</p>' },
    { type: 'icon-grid', alt: true, eyebrow: 'Recommended page sections', heading: 'What this guide covers', cols: 4,
      items: [
        { icon: 'scale', title: 'Types of implant', text: 'Different implant types and their characteristics.' },
        { icon: 'shape', title: 'Shape, size & profile', text: 'How shape, size and profile options differ.' },
        { icon: 'personalised', title: 'Surgical planning', text: 'Planning and placement considerations.' },
        { icon: 'evidence', title: 'Preoperative assessment', text: 'The assessment carried out before surgery.' },
        { icon: 'downtime', title: 'Recovery & aftercare', text: 'Recovery and aftercare expectations.' },
        { icon: 'clock', title: 'Long-term monitoring', text: 'Monitoring and potential revision over time.' },
        { icon: 'info', title: 'FAQs', text: 'Common questions about implants.' }
      ]
    },
    { type: 'notice', blush: true, icon: 'evidence', title: 'Verify before publishing',
      text: 'Only implant brands, models and regulatory claims that the clinic can verify should be published. Specific brand names are intentionally omitted here until verified.' },
    { type: 'faq', id: 'sil', eyebrow: 'Questions', heading: 'Silicone implant FAQs',
      items: [
        { q: 'What is the difference between silicone implants and injectable silicone?', a: '<p>They are entirely different. Injectable silicone is a different product and should not be used as a substitute for a breast implant; it can cause serious, potentially permanent harm.</p>' },
        { q: 'Do implants last a lifetime?', a: '<p>No. Breast implants are not lifetime devices. Additional operations may be needed and complications can occur, so long-term monitoring is important.</p>' }
      ]
    }
  ],
  ctaHeading: 'Discuss implant suitability and long-term monitoring'
}));

pages.push(treatmentPage({
  url: '/surgical/fat-transfer-breast-augmentation/', slug: 'fat-transfer',
  h1: 'Fat Transfer Breast Augmentation: What to Know',
  seoTitle: 'Fat Transfer Breast Augmentation: What to Know | QuantumHealth',
  seoDescription: 'Fat transfer breast augmentation: how the procedure works, donor-site and liposuction considerations, variable fat retention, recovery and potential complications.',
  bannerEyebrow: 'Surgical · Autologous fat transfer',
  bannerLead: 'Fat transfer breast augmentation removes fat from a donor area using liposuction, processes it, and transfers selected fat to the breasts. It may suit certain patients seeking a relatively modest increase in volume without implants.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Fat transfer' }],
  blocks: [
    { type: 'prose', html:
      '<p>The amount of fat that can be transferred safely, and the proportion that remains over time, vary. Some transferred fat may not survive, and more than one procedure may be needed to approach a patient’s goals.</p>' },
    { type: 'icon-grid', eyebrow: 'Topics to cover', heading: 'What to discuss at consultation', cols: 3,
      items: [
        { icon: 'personalised', title: 'Candidacy', text: 'Who may be an appropriate candidate for fat transfer.' },
        { icon: 'scale', title: 'Donor site & liposuction', text: 'Donor-site availability and the liposuction component of the procedure.' },
        { icon: 'evidence', title: 'Realistic expectations', text: 'Expected changes and realistic volume limitations.' },
        { icon: 'downtime', title: 'Recovery', text: 'Recovery at both the donor and recipient sites.' },
        { icon: 'safety', title: 'Complications', text: 'Potential fat necrosis, oil cysts, calcifications, asymmetry and other complications.' }
      ]
    },
    { type: 'faq', alt: true, id: 'ft', eyebrow: 'Questions', heading: 'Fat transfer FAQs',
      items: [
        { q: 'Does fat transfer produce permanent results?', a: '<p>Some transferred fat can survive long term, but a proportion may be reabsorbed. The final result varies between individuals, and additional procedures may be considered.</p>' },
        { q: 'How much volume can be added?', a: '<p>The safe volume and the amount that survives vary individually, so fat transfer is generally associated with a more modest, individualised increase than implant-based augmentation.</p>' }
      ]
    }
  ],
  ctaHeading: 'Discuss whether fat transfer suits your goals'
}));

/* ---------- Comparison ---------- */
pages.push({
  url: '/breast-enhancement-comparison/', slug: 'comparison',
  h1: 'Breast Enhancement Comparison: Intended Effect vs. Claims',
  seoTitle: 'Breast Enhancement Options Compared | QuantumHealth',
  seoDescription: 'A side-by-side comparison of breast enhancement options — dermal fillers, PRP, threads, Sculptra, stem cells, implants and fat transfer — and their key limitations.',
  bannerEyebrow: 'Decision guide',
  bannerLead: 'This comparison helps distinguish a procedure’s intended effect from claims made in advertising. It does not suggest that a non-surgical procedure is automatically safer than surgery.',
  breadcrumb: [{ label: 'Treatment comparison' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Breast Enhancement Comparison', url: site.url + '/breast-enhancement-comparison/' }],
  blocks: [
    { type: 'table', eyebrow: 'At a glance', heading: 'Intended effect, primary consideration and key limitation',
      head: ['Option', 'Primary consideration', 'Important limitation'],
      rows: [
        ['Dermal fillers', 'Product-specific approved indications', 'Not FDA-approved for breast enlargement'],
        ['PRP', 'Evidence for the particular intended use', 'Should not be promoted as proven breast enlargement'],
        ['Threads & mono threads', 'Product-specific aesthetic indications', 'Not established substitutes for breast augmentation'],
        ['Sculptra / biostimulators', 'Product-specific authorised uses', 'Do not assume suitability for breast-volume enhancement'],
        ['Stem-cell approaches', 'Evidence and regulatory status of the exact product', 'Many marketed regenerative uses remain unapproved or investigational'],
        ['Silicone breast implants', 'Surgical increase in breast volume', 'Surgery, implant-related risks and potential future procedures'],
        ['Fat transfer', 'Uses the patient’s own fat for augmentation', 'Variable fat retention and a limited, individualised result']
      ]
    },
    { type: 'prose', alt: true, html:
      '<p>Choosing between options is not a matter of finding the “safest” label. It requires understanding your goals, your anatomy and health, the evidence for each intended effect, and the risks you are prepared to accept. A consultation with an appropriately qualified clinician is the appropriate way to reach an individualised view.</p>' },
    stdCta({ heading: 'Not sure which option to consider?' })
  ]
});

/* ---------- About ---------- */
pages.push({
  url: '/about-us/', slug: 'about',
  h1: 'About QuantumHealth: Our Philosophy',
  seoTitle: 'About QuantumHealth by Dr. Vikas Singh',
  seoDescription: 'QuantumHealth is positioned around informed aesthetic decision-making, personalised treatment planning and clear communication, built on four principles.',
  bannerEyebrow: 'Our approach',
  bannerLead: 'A thoughtful, individualised approach to aesthetic medicine — grounded in transparency, evidence and respect.',
  breadcrumb: [{ label: 'About' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About QuantumHealth', url: site.url + '/about-us/' }],
  blocks: [
    { type: 'prose', html:
      '<p>QuantumHealth by Dr. Vikas Singh is positioned around informed aesthetic decision-making, personalised treatment planning and clear communication.</p>' +
      '<p>We believe patients deserve straightforward answers about the treatments they are considering — including what a procedure may achieve, what it cannot achieve, what evidence supports its use, and what risks must be considered.</p>' },
    { type: 'icon-grid', alt: true, eyebrow: 'Our approach', heading: 'Built on four principles', cols: 4,
      items: [
        { icon: 'personalised', title: 'Individuality', text: 'Every consultation starts with the patient’s needs and circumstances.' },
        { icon: 'evidence', title: 'Transparency', text: 'Treatment limitations, risks and alternatives are discussed openly.' },
        { icon: 'safety', title: 'Competence', text: 'Discussion stays within the treating clinician’s qualifications and permitted scope.' },
        { icon: 'discretion', title: 'Continuity of care', text: 'Pre-treatment assessment, aftercare and follow-up are integral to the patient experience.' }
      ]
    },
    { type: 'split', eyebrow: 'Our aim', heading: 'Well-informed decisions, not promises',
      body: '<p>Our goal is not to promise a particular appearance. It is to help patients make well-informed decisions about their care — understanding the evidence, the limitations and the alternatives before committing to anything.</p>',
      slot: 'Clinic environment', script: 'Informed, always' },
    reviewNotice,
    stdCta({ heading: 'Speak with us about your goals' })
  ]
});

pages.push({
  url: '/about-dr-vikas-singh/', slug: 'dr-vikas-singh',
  h1: 'Dr. Vikas Singh: Professional Profile',
  seoTitle: 'Dr. Vikas Singh | Cosmetic Dermatologist & Regenerative Medicine | QuantumHealth',
  seoDescription: 'Dr. Vikas Singh — cosmetic dermatologist, hair transplant surgeon and longevity & regenerative medicine expert with 20+ years across aesthetics, dermatology and hair restoration.',
  bannerEyebrow: 'Physician-led aesthetic care',
  bannerLead: 'Cosmetic dermatology · hair transplantation · longevity & regenerative medicine',
  breadcrumb: [{ label: 'About', href: '/about-us/' }, { label: 'Dr. Vikas Singh' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'Physician', name: 'Dr. Vikas Singh', url: site.url + '/about-dr-vikas-singh/', worksFor: { '@type': 'MedicalBusiness', name: site.name } }],
  blocks: [
    { type: 'split', eyebrow: 'A global perspective', heading: 'A career built on innovation',
      body: '<p>Dr. Vikas Singh is a cosmetic dermatologist, hair transplant surgeon and longevity &amp; regenerative medicine expert.</p>' +
        '<p>For more than 20 years he has worked across the evolving fields of cosmetology, dermatology, hair transplantation, anti-ageing and regenerative medicine. His stated philosophy moves beyond conventional cosmetic treatment toward a broader idea of <strong>healthspan</strong> — bringing <strong>appearance</strong>, <strong>regeneration</strong> and <strong>longevity</strong> into a single conversation about how a patient looks and how they age.</p>',
      slot: 'Portrait — Dr. Vikas Singh', slotNote: 'Licensed professional portrait to be supplied',
      script: 'Understanding first' },
    { type: 'icon-grid', alt: true, eyebrow: 'At a glance', heading: 'A career built on innovation', cols: 4,
      items: [
        { icon: 'clock', title: '20+ years', text: 'Across cosmetology, dermatology, hair transplantation, anti-ageing and regenerative medicine.' },
        { icon: 'pin', title: 'International presence', text: 'Consulting presence across multiple countries, with patients from around the world.' },
        { icon: 'sparkle', title: 'Innovation', text: 'Recognised for innovation in aesthetics and regenerative medicine.' },
        { icon: 'evidence', title: 'Healthspan focus', text: 'Appearance, regeneration and longevity considered together, not separately.' }
      ]
    },
    { type: 'cards', cols: 3, eyebrow: 'Clinical work', heading: 'Areas of practice',
      lead: 'The thirteen clinical areas listed in Dr. Singh’s professional profile.',
      items: [
        { title: 'Advanced cosmetic dermatology', text: 'Skin assessment and advanced cosmetic dermatology treatments.' },
        { title: 'Clinical & aesthetic dermatology', text: 'Medical and aesthetic dermatology for skin health and appearance.' },
        { title: 'Hair transplantation & restoration', text: 'Hair transplant surgery and restoration planning.' },
        { title: 'Micro-Bio FUE & advanced FUE', text: 'Advanced follicular unit extraction techniques.' },
        { title: 'Regenerative hair therapies', text: 'Regenerative approaches applied to hair and scalp care.' },
        { title: 'Hair & scalp microbiome', text: 'Microbiome-informed approaches to hair and scalp health.' },
        { title: 'Anti-ageing & longevity', text: 'Anti-ageing medicine and longevity-focused programmes.' },
        { title: 'Stem-cell & regenerative medicine', text: 'Regenerative medicine, subject to product evidence and regulation.' },
        { title: 'Advanced facial rejuvenation', text: 'Facial rejuvenation planning tailored to the individual.' },
        { title: 'Body contouring & aesthetics', text: 'Non-surgical body contouring and body aesthetics.' },
        { title: 'Non-surgical breast aesthetics', text: 'Non-surgical breast aesthetic procedures, discussed with clear limits.' },
        { title: 'Advanced skin rejuvenation', text: 'Skin-quality and rejuvenation treatments.' },
        { title: 'Longevity & wellness programmes', text: 'Personalised longevity and wellness programmes.' }
      ]
    },
    { type: 'split', reverse: true, eyebrow: 'Recognition', heading: 'Awards, appointments and memberships',
      body: '<p>The following recognitions and memberships are listed by the clinic. Dates, issuing bodies and documentary evidence are being confirmed, and details may be updated following verification.</p>' +
        '<p><strong>Awards &amp; recognition:</strong></p><ul>' +
        '<li>The Times — Times Magazine featured doctor</li>' +
        '<li>Zee Business Best Doctor Award (2019)</li>' +
        '<li>Aarogya Jyoti Award</li>' +
        '<li>Arab Health — global recognition for innovation in aesthetics</li>' +
        '<li>Cosmo Prof</li>' +
        '<li>IMCAS</li></ul>' +
        '<p><strong>Memberships &amp; training:</strong></p><ul>' +
        '<li>American Academy of Aesthetic Medicine (USA)</li>' +
        '<li>International Society of Hair Restoration Surgery</li>' +
        '<li>American Board of Hair Restoration Surgery</li>' +
        '<li>Cardiff University dermatology training (Wales, UK)</li></ul>',
      slot: 'Award & conference photography', slotNote: 'Licensed photography to be supplied' },
    { type: 'notice', blush: true, icon: 'info', title: 'Listed by the clinic, pending verification',
      text: 'Awards, memberships, fellowship details and registration status above are reproduced as supplied by the clinic and remain subject to documentary verification. Registration status and specific procedure credentials should be confirmed with the relevant professional body before reliance.' },
    stdCta({ heading: 'Request a consultation with Dr. Singh' })
  ]
});

/* ---------- Our doctors panel ---------- */
pages.push({
  url: '/our-team/', slug: 'our-team',
  h1: 'Our Doctors Panel',
  seoTitle: 'Our Doctors & Specialists | QuantumHealth',
  seoDescription: 'The QuantumHealth medical panel — plastic surgeons, cosmetic surgeons, cardiologists, maxillofacial surgeons and aesthetic practitioners and their listed credentials.',
  bannerEyebrow: 'Our team',
  bannerLead: 'A multi-specialty medical panel — plastic and cosmetic surgery, dermatology, cardiology, maxillofacial surgery and aesthetic practice — working together around the patient.',
  breadcrumb: [{ label: 'Our team' }],
  schema: [{
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'QuantumHealth Doctors Panel',
    url: site.url + '/our-team/',
    itemListElement: [
      { '@type': 'Person', name: 'Dr. Vikas Singh', jobTitle: 'Founder & CEO' },
      { '@type': 'Person', name: 'Dr. Surindher D.S.A', jobTitle: 'Plastic Surgeon' },
      { '@type': 'Person', name: 'Dr. Amod Rao', jobTitle: 'Consultant, Cosmetic Surgery' },
      { '@type': 'Person', name: 'Dr. Arivazhagan', jobTitle: 'Cardiologist, Cardiothoracic & Vascular Surgeon' },
      { '@type': 'Person', name: 'Dr. Subramini', jobTitle: 'Consultant Cosmetic, Plastic & Craniofacial Reconstructive Surgeon' },
      { '@type': 'Person', name: 'Dr. D R Sekhar', jobTitle: 'Senior Consultant, Plastic, Aesthetic & Reconstructive Surgery' },
      { '@type': 'Person', name: 'Dr. Nandita', jobTitle: 'Oral & Maxillofacial Surgeon' },
      { '@type': 'Person', name: 'Dr. Alisha Khan', jobTitle: 'Aesthetic Healer & Cosmetologist' }
    ].map((m, i) => ({ '@type': 'ListItem', position: i + 1, item: m }))
  }],
  blocks: [
    { type: 'prose', html:
      '<p>Our panel brings together specialists from plastic surgery, cosmetic surgery, dermatology, cardiology, oral and maxillofacial surgery and aesthetic practice. Their combined perspective supports assessment that considers the whole patient, not a single procedure.</p>' +
      '<blockquote><p>“A team of experts, united by a shared vision — to help you look better, feel healthier and live more confidently.”</p></blockquote>' },
    { type: 'table', eyebrow: 'Medical panel', heading: 'Doctors and listed credentials',
      head: ['Doctor', 'Role', 'Credentials'],
      rows: [
        ['Dr. Vikas Singh', 'Founder &amp; CEO', 'MBBS, MD (Dermatology); fellowships in aesthetic medicine — AAAM (USA), ISHRS'],
        ['Dr. Surindher D.S.A', 'Plastic Surgeon', 'MBBS, MS (General Surgery), MCh (Plastic Surgery)'],
        ['Dr. Amod Rao', 'Consultant, Cosmetic Surgery', 'MBBS, MS (General Surgery), fellowship in aesthetic surgery (Brazil)'],
        ['Dr. Arivazhagan', 'Cardiologist, Cardiothoracic &amp; Vascular Surgeon', 'MBBS, MCh (Cardio Thoracic &amp; Vascular Surgery), MS (General Surgery); 38 years’ experience'],
        ['Dr. Subramini', 'Consultant Cosmetic, Plastic &amp; Craniofacial Reconstructive Surgeon', 'MS, MCh, F.I.C.S., F.A.I.S., Ph.D.; ALIMS (Bangalore Medical College &amp; Research Centre)'],
        ['Dr. D R Sekhar', 'Senior Consultant, Plastic, Aesthetic &amp; Reconstructive Surgery', 'MBBS, MS (General Surgery), MCh (Plastic Surgery)'],
        ['Dr. Nandita', 'Oral &amp; Maxillofacial Surgeon', 'MDS (OMFS)'],
        ['Dr. Alisha Khan', 'Aesthetic Healer &amp; Cosmetologist', 'Aesthetic treatments, cosmetology, skin, hair, laser, wellness, training &amp; education']
      ],
      note: 'Credentials are reproduced as supplied by the clinic and remain subject to documentary verification with the relevant awarding institutions and professional bodies.'
    },
    { type: 'icon-grid', alt: true, eyebrow: 'Shared vision', heading: 'One standard of care', cols: 3,
      items: [
        { icon: 'personalised', title: 'Assessment first', text: 'Every treatment decision follows individual clinical assessment.' },
        { icon: 'evidence', title: 'Within scope', text: 'Discussion and treatment stay within each clinician’s qualifications.' },
        { icon: 'discretion', title: 'Continuity', text: 'Pre-treatment planning, aftercare and follow-up are part of the same pathway.' }
      ]
    },
    { type: 'icon-grid', eyebrow: 'What we value', heading: 'Science. Artistry. Care.', cols: 3,
      items: [
        { icon: 'scale', title: 'Multidisciplinary expertise', text: 'Specialists from several disciplines contributing to one plan.' },
        { icon: 'personalised', title: 'Personalised treatments', text: 'Options matched to the individual, not a template.' },
        { icon: 'sparkle', title: 'Advanced technology', text: 'Technology selected for the clinical need.' },
        { icon: 'natural', title: 'Natural beauty', text: 'Aims that respect individual proportion and character.' },
        { icon: 'evidence', title: 'Long-term wellness', text: 'Care that considers healthspan, not only appearance.' }
      ]
    },
    stdCta({ heading: 'Meet the team at a consultation' })
  ]
});

/* ---------- Locations ---------- */
pages.push({
  url: '/locations/', slug: 'locations',
  h1: 'Clinic Locations & Consultation Information',
  seoTitle: 'Clinic Locations & Consultation Information | QuantumHealth',
  seoDescription: 'QuantumHealth head office in Hong Kong, plus clinic presence across Dubai, Bahrain, Toronto, Bangkok, Bangalore, Hyderabad, Mumbai and Chennai.',
  bannerEyebrow: 'Visit us',
  bannerLead: 'Our head office is in Hong Kong, with clinic presence across Asia, the Middle East, Canada and India. Consultation availability is confirmed directly with each location.',
  breadcrumb: [{ label: 'Locations' }],
  schema: [{
    '@context': 'https://schema.org', '@type': 'MedicalClinic', name: 'QuantumHealth Head Office',
    url: site.url + '/locations/', telephone: site.contact.phone,
    address: { '@type': 'PostalAddress', streetAddress: 'Sun Tuen Mun Center, 55–56 Lung Mun Road', addressLocality: 'New Hong Kong Territories', addressCountry: 'HK' }
  }],
  blocks: [
    { type: 'split', eyebrow: 'Head office', heading: 'Hong Kong',
      body: '<p><strong>Sun Tuen Mun Center, 55–56 Lung Mun Road, New Hong Kong Territories, Hong Kong</strong></p>' +
        '<p>Telephone: <a href="tel:' + site.contact.phone.replace(/\s/g, '') + '">' + site.contact.phone + '</a></p>' +
        '<p>The head office houses consultation and treatment rooms, a VIP lounge and a skin and wellness boutique, offering advanced aesthetic dermatology, hair restoration, regenerative medicine, anti-ageing and longevity programmes.</p>',
      slot: 'Hong Kong head office', slotNote: 'Licensed clinic photography to be supplied', script: 'Where beauty, science and longevity meet' },
    { type: 'icon-grid', eyebrow: 'At our head office', heading: 'Services', cols: 4,
      items: [
        { icon: 'evidence', title: 'Aesthetic dermatology', text: 'Advanced aesthetic dermatology.' },
        { icon: 'personalised', title: 'Hair restoration', text: 'Hair transplant and hair restoration.' },
        { icon: 'shape', title: 'Body contouring', text: 'Body contouring and non-surgical solutions.' },
        { icon: 'safety', title: 'Regenerative medicine', text: 'Regenerative medicine and stem-cell therapy, subject to evidence and regulation.' },
        { icon: 'clock', title: 'Anti-ageing & longevity', text: 'Anti-ageing and longevity programmes.' },
        { icon: 'sparkle', title: 'Skin & beauty lounge', text: 'A premium skin and beauty lounge.' },
        { icon: 'natural', title: 'Wellness programmes', text: 'Personalised wellness programmes.' }
      ]
    },
    { type: 'cards', alt: true, cols: 4, eyebrow: 'Inside the clinic', heading: 'Spaces designed around privacy and care',
      items: [
        { title: 'Consultation room', text: 'Private, personalised, premium.', slot: 'Consultation room', slotNote: 'Licensed clinic photography to be supplied' },
        { title: 'Treatment room', text: 'Advanced technology, considered care.', slot: 'Treatment room', slotNote: 'Licensed clinic photography to be supplied' },
        { title: 'VIP lounge', text: 'Luxury, comfort and discretion.', slot: 'VIP lounge', slotNote: 'Licensed clinic photography to be supplied' },
        { title: 'Skin & wellness boutique', text: 'Curated brands with expert guidance.', slot: 'Wellness boutique', slotNote: 'Licensed clinic photography to be supplied' }
      ]
    },
    { type: 'notice', icon: 'pin', title: 'Confirm details before travelling',
      text: 'The head office address and telephone number above are as supplied by the clinic. Street addresses, opening hours and directions for international locations are published once confirmed by each location. Call ahead to confirm availability.' },
    { type: 'icon-grid', alt: true, eyebrow: 'International presence', heading: 'Clinic locations', cols: 4,
      lead: 'Eight listed locations, each with its own service focus.',
      items: [
        { icon: 'pin', title: 'Dubai, UAE', text: 'Aesthetics · Regenerative Medicine · Wellness · Longevity' },
        { icon: 'pin', title: 'Bahrain', text: 'Aesthetics · Skin & Hair · Wellness · Anti-Ageing' },
        { icon: 'pin', title: 'Toronto, Canada', text: 'Aesthetics · Cosmetic Surgery · Regenerative Medicine · Wellness' },
        { icon: 'pin', title: 'Bangkok, Thailand', text: 'Aesthetics · Body Contouring · Wellness · Anti-Ageing' },
        { icon: 'pin', title: 'Bangalore, India', text: 'Aesthetics · Hair Transplant · Skin & Laser · Regenerative Medicine' },
        { icon: 'pin', title: 'Hyderabad, India', text: 'Aesthetics · Cosmetology · Wellness · Anti-Ageing' },
        { icon: 'pin', title: 'Mumbai, India', text: 'Aesthetics · Plastic Surgery · Skin & Hair · Wellness' },
        { icon: 'pin', title: 'Chennai, India', text: 'Aesthetics · Dermatology · Body Contouring · Wellness' }
      ]
    },
    { type: 'icon-grid', eyebrow: 'Planning your visit', heading: 'What each location will include', cols: 4,
      items: [
        { icon: 'pin', title: 'Full address', text: 'Accurate, verified clinic address.' },
        { icon: 'clock', title: 'Opening hours', text: 'Confirmed consultation hours.' },
        { icon: 'phone', title: 'Contact details', text: 'Verified phone and enquiry options.' },
        { icon: 'arrow', title: 'Directions', text: 'A directions link for verified locations.' }
      ]
    },
    stdCta({ heading: 'Request a consultation and confirm availability' })
  ]
});

/* ---------- Gallery ---------- */
pages.push({
  url: '/before-after-gallery/', slug: 'gallery',
  h1: 'Gallery: Real Cases, Clear Context',
  seoTitle: 'Breast Augmentation Results | Clinical Case Gallery | QuantumHealth',
  seoDescription: 'A responsible gallery approach: consented clinical cases shown with clinical context and a clear statement that individual results vary. No fabricated or altered imagery.',
  bannerEyebrow: 'Results',
  bannerLead: 'Our gallery is designed to help patients understand the range of outcomes associated with different procedures. Each case is presented with appropriate consent, clinical context and a clear explanation of individual variability.',
  breadcrumb: [{ label: 'Gallery' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Gallery', url: site.url + '/before-after-gallery/' }],
  blocks: [
    { type: 'notice', icon: 'safety', title: 'Our imagery commitment',
      text: 'Only genuine, consented clinical images are used. Illustrative stock photography is clearly labelled and never presented as a patient result. Images are never digitally altered to exaggerate treatment outcomes, and before-and-after images use consistent lighting, positioning and camera angles.' },
    { type: 'gallery', eyebrow: 'Consented cases', heading: 'Clinical gallery',
      lead: 'Each case study includes the procedure performed, the timeframe, the patient’s treatment goals (described with consent), relevant follow-up information and a clear statement that individual results vary.',
      items: [
        { caption: 'Breast augmentation — consented case (placeholder)', slot: 'Consented case 01', slotNote: 'Genuine consented photography required' },
        { caption: 'Breast augmentation — consented case (placeholder)', slot: 'Consented case 02', slotNote: 'Genuine consented photography required' },
        { caption: 'Silicone gel implants — consented case (placeholder)', slot: 'Consented case 03', slotNote: 'Genuine consented photography required' },
        { caption: 'Fat transfer — consented case (placeholder)', slot: 'Consented case 04', slotNote: 'Genuine consented photography required' },
        { caption: 'Fat transfer — consented case (placeholder)', slot: 'Consented case 05', slotNote: 'Genuine consented photography required' },
        { caption: 'Other procedure — consented case (placeholder)', slot: 'Consented case 06', slotNote: 'Genuine consented photography required' }
      ]
    },
    { type: 'icon-grid', alt: true, eyebrow: 'Responsible presentation', heading: 'What every case includes', cols: 4,
      items: [
        { icon: 'calendar', title: 'Procedure & timeframe', text: 'The procedure performed and the relevant date or timeframe.' },
        { icon: 'personalised', title: 'Goals, with consent', text: 'The patient’s treatment goals, described with consent.' },
        { icon: 'evidence', title: 'Clinical context', text: 'Relevant pre-treatment and follow-up information.' },
        { icon: 'info', title: 'Individual variability', text: 'A clear statement that individual results vary.' }
      ]
    },
    stdCta({ heading: 'Understand what results realistically look like' })
  ]
});

/* ---------- Video gallery ---------- */
pages.push({
  url: '/video-gallery/', slug: 'video-gallery',
  h1: 'Watch. Learn. Make Informed Decisions.',
  seoTitle: 'Video Gallery | QuantumHealth',
  seoDescription: 'Educational video content to help you understand treatment choices without exaggerated promotional claims — introductions, explainers and expert discussions.',
  bannerEyebrow: 'Video gallery',
  bannerLead: 'The video gallery is designed to establish a professional voice and help visitors understand treatment choices without relying on exaggerated promotional claims.',
  breadcrumb: [{ label: 'Video gallery' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Video Gallery', url: site.url + '/video-gallery/' }],
  blocks: [
    { type: 'cards', cols: 2, eyebrow: 'Video library', heading: 'Educational video content',
      lead: 'Videos are published only once recorded and verified. Placeholders below indicate the planned structure.',
      items: [
        { title: 'Meet Dr. Vikas Singh', text: 'A professional introduction, clinical philosophy and approach to patient consultations.', slot: 'Video thumbnail', slotNote: 'Video not yet recorded' },
        { title: 'Understanding breast augmentation', text: 'An educational overview of implants, fat transfer, suitability and recovery.', slot: 'Video thumbnail', slotNote: 'Video not yet recorded' },
        { title: 'What to know before a non-surgical treatment', text: 'How to assess evidence, understand product claims and ask about risks.', slot: 'Video thumbnail', slotNote: 'Video not yet recorded' },
        { title: 'Doctor interviews & expert discussions', text: 'Verified media appearances, expert commentary and patient education.', slot: 'Video thumbnail', slotNote: 'Video not yet recorded' }
      ]
    },
    { type: 'notice', icon: 'play', title: 'No autoplay, no tracking before consent',
      text: 'Videos will not autoplay, and no third-party video tracking will be loaded before the required consent has been obtained. Each video will be embedded only when its content has been verified.' },
    stdCta({ heading: 'Prefer a personalised conversation?' })
  ]
});

/* ---------- Media & press ---------- */
pages.push({
  url: '/media-and-press/', slug: 'media-and-press',
  h1: 'Media Interviews & Press',
  seoTitle: 'Media and Press | QuantumHealth',
  seoDescription: 'Verified interviews, published articles, expert contributions and media appearances relevant to aesthetic medicine and Dr. Vikas Singh’s professional work.',
  bannerEyebrow: 'Media library',
  bannerLead: 'This section showcases verified interviews, published articles, expert contributions and media appearances.',
  breadcrumb: [{ label: 'Media & press' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Media and Press', url: site.url + '/media-and-press/' }],
  blocks: [
    { type: 'prose', html:
      '<p>Dr. Vikas Singh’s professional journey has included involvement in aesthetic medicine and hair restoration. This media library brings together documented interviews and published features relevant to his professional work and the wider field of aesthetic care.</p>' },
    { type: 'icon-grid', alt: true, eyebrow: 'Content categories', heading: 'What you will find here', cols: 4,
      items: [
        { icon: 'play', title: 'Broadcast interviews', text: 'Television and broadcast interviews.' },
        { icon: 'evidence', title: 'Print features', text: 'Newspaper and magazine features.' },
        { icon: 'quote', title: 'Expert commentary', text: 'Expert commentary and educational contributions.' },
        { icon: 'personalised', title: 'Conference appearances', text: 'Professional presentations and appearances.' }
      ]
    },
    { type: 'notice', blush: true, icon: 'info', title: 'Verification required',
      text: 'Media and recognition are listed only where substantiated with the correct title, date, publication and link. Appearing in a publication does not imply endorsement by that publication. No media logos or awards are displayed until verified.' },
    stdCta({ heading: 'For media and speaking enquiries' })
  ]
});

/* ---------- FAQ page ---------- */
pages.push({
  url: '/faqs/', slug: 'faqs',
  h1: 'Frequently Asked Questions',
  seoTitle: 'Breast Enhancement FAQs | QuantumHealth',
  seoDescription: 'Answers to common questions about non-surgical and surgical breast enhancement, evidence, safety, recovery and how to choose which option may be appropriate.',
  bannerEyebrow: 'Patient information',
  bannerLead: 'Straightforward answers to the questions patients most often ask. Every individual situation still requires assessment by an appropriately qualified clinician.',
  breadcrumb: [{ label: 'FAQs' }],
  schema: [{
    '@context': 'https://schema.org', '@type': 'FAQPage', url: site.url + '/faqs/',
    mainEntity: [
      ['Can breast size be increased without surgery?', 'Some treatments are marketed for this purpose, but the evidence and regulatory status vary. Many non-surgical approaches have not been shown to reliably increase breast volume.'],
      ['Are dermal fillers safe for breast enlargement?', 'Dermal fillers are not approved for breast enlargement because of potentially serious complications. A filler approved for facial use should not be assumed suitable for injection into the breasts.'],
      ['Is PRP a proven breast enlargement treatment?', 'PRP should not be marketed as a proven method of increasing breast size without robust evidence supporting that particular use.'],
      ['What is the difference between silicone implants and injectable silicone?', 'They are entirely different. Injectable silicone should not be used as a substitute for a breast implant and can cause serious, potentially permanent harm.'],
      ['Does fat transfer produce permanent results?', 'Some transferred fat can survive long term, but a proportion may be reabsorbed, so the final result varies and additional procedures may be considered.'],
      ['How long does breast augmentation recovery take?', 'Recovery varies according to the procedure, technique, individual healing and the clinician’s advice.'],
      ['How do I know which procedure is right for me?', 'The appropriate option depends on your health, anatomy, expectations and risk tolerance, and should follow assessment by an appropriately qualified clinician.']
    ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  }],
  blocks: [
    { type: 'faq', id: 'main', eyebrow: 'Common questions', heading: 'Breast enhancement FAQs',
      items: [
        { q: 'Can breast size be increased without surgery?', a: '<p>Some treatments are marketed for this purpose, but the evidence and regulatory status vary. Many non-surgical approaches have not been shown to reliably increase breast volume. A professional assessment is the appropriate way to establish what is realistic and which options, if any, are appropriate.</p>' },
        { q: 'Are dermal fillers safe for breast enlargement?', a: '<p>Dermal fillers are not approved for breast enlargement, and regulators advise against using them for this purpose because of potentially serious complications. A filler approved for facial use should not be assumed suitable for injection into the breasts.</p>' },
        { q: 'Is PRP a proven breast enlargement treatment?', a: '<p>PRP’s effects depend on the specific indication and the evidence available. It should not be marketed as a proven method of increasing breast size without robust evidence supporting that particular use.</p>' },
        { q: 'What is the difference between silicone implants and injectable silicone?', a: '<p>They are entirely different. Injectable silicone is a different product and should not be used as a substitute for a breast implant. Injectable silicone used for breast enhancement can cause serious, potentially permanent harm.</p>' },
        { q: 'Does fat transfer produce permanent results?', a: '<p>Some transferred fat can survive long term, but a proportion may be reabsorbed. The final result varies between individuals, and additional procedures may be considered.</p>' },
        { q: 'How long does breast augmentation recovery take?', a: '<p>Recovery varies according to the procedure, surgical technique, individual healing and the clinician’s advice. Your surgeon will give you a personalised return-to-activity timeline.</p>' },
        { q: 'How do I know which procedure is right for me?', a: '<p>The appropriate option depends on your health, anatomy, expectations, risk tolerance and the evidence for the intended treatment. The decision should follow an assessment by an appropriately qualified clinician.</p>' }
      ]
    },
    stdCta({ heading: 'Still have questions? Arrange a consultation' })
  ]
});

module.exports = { site, pages, home, stdCta, reviewNotice, treatmentPage };

pages.push({
  url: '/technology-and-medical-standards/', slug: 'technology-and-medical-standards',
  h1: 'Technology and Medical Standards',
  seoTitle: 'Technology & Medical Standards | QuantumHealth',
  seoDescription: 'Our approach to assessment, clinical protocols, technology and safety in breast enhancement care.',
  bannerEyebrow: 'Clinical standards',
  bannerLead: 'Assessment, consultation, clinical protocols, technology and safety are fundamental to an informed, responsible approach.',
  breadcrumb: [{ label: 'Technology and Medical Standards' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Technology and Medical Standards', url: site.url + '/technology-and-medical-standards/' }],
  blocks: [reviewNotice]
});

pages.push({
  url: '/candidacy-and-safety/', slug: 'candidacy-and-safety',
  h1: 'Candidacy and Safety',
  seoTitle: 'Candidacy and Safety | QuantumHealth',
  seoDescription: 'Understand candidacy, suitability screening, contraindications, alternatives, risks and how safety guides decision-making.',
  bannerEyebrow: 'Patient information',
  bannerLead: 'Candidacy and safety are central to responsible care — decisions follow assessment, not promotion.',
  breadcrumb: [{ label: 'Candidacy and Safety' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Candidacy and Safety', url: site.url + '/candidacy-and-safety/' }],
  blocks: [reviewNotice]
});
