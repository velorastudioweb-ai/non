'use strict';

/* =============================================================================
   Site content — Breast Enlargement Guide (nonsurgicalbreastenlargement.in)
   An independent, evidence-based educational resource about breast enlargement:
   non-surgical options, surgical options, the published evidence and safety.
   The site is NOT a clinic and does not provide treatment, consultations or
   diagnoses. No doctor, clinic, medical team or physical location is presented
   because none has been verified. Content was consolidated from multiple
   sources, deduplicated and rewritten into original educational explanations;
   promotional claims from source material (e.g. "clinically proven", "safe &
   effective", "no surgery, no scars") have been removed or neutralised.
   ============================================================================= */

const SITE_URL = (process.env.SITE_URL || 'https://nonsurgicalbreastenlargement.in').replace(/\/+$/, '');

const site = {
  name: 'Quantum Health',
  shortName: 'Quantum Health',
  tagline: 'Independent, evidence-based education on non-surgical and surgical breast enlargement.',
  domain: SITE_URL.replace(/^https?:\/\//, ''),
  url: SITE_URL,
  base: '/',
  defaultOg: '/assets/img/og-cover.svg',
  contact: {
    // Only the site mailbox is published. No phone number, clinic address or
    // opening hours are listed because this website is an educational
    // resource, not a clinic, and no such details have been verified.
    phone: '',
    email: 'enquiries@nonsurgicalbreastenlargement.in',
    address: '',
    addressNote: '',
    hours: '',
    // Placeholder delivery endpoint. Leave empty to keep the form honest (it
    // will NOT fake a successful submission). Set a real Web3Forms/Formspree/
    // custom URL to enable delivery.
    formEndpoint: ''
  },
  footerBlurb: 'An independent educational website about breast enlargement — what works, what does not, the published evidence behind each option and the safety questions to ask. This is not a clinic, and no treatments are offered or sold here.',
  medicalDisclaimerShort: '',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Non-surgical', href: '/non-surgical/' },
    { label: 'Surgical', href: '/surgical-breast-enhancement/' },
    { label: 'Glossary', href: '/glossary/' },
    { label: 'Contact us', href: '/contact/' }
  ],
  navSecondary: [],
  footerExplore: [
    { label: 'Understanding breast enlargement', href: '/understanding-breast-enlargement/' },
    { label: 'Non-surgical options', href: '/non-surgical/' },
    { label: 'Surgical options', href: '/surgical-breast-enhancement/' },
    { label: 'Breast implants', href: '/breast-implants/' },
    { label: 'Fat transfer', href: '/surgical/fat-transfer-breast-augmentation/' },
    { label: 'Treatment comparison', href: '/breast-enhancement-comparison/' },
    { label: 'What works: evidence guide', href: '/breast-enlargement-without-surgery/' }
  ],
  footerPatient: [
    { label: 'About this website', href: '/about-us/' },
    { label: 'Breast anatomy', href: '/breast-anatomy/' },
    { label: 'Safety & candidacy', href: '/breast-enlargement-safety/' },
    { label: 'Breast implant safety', href: '/breast-implant-safety/' },
    { label: 'Choosing a surgeon', href: '/choosing-a-surgeon/' },
    { label: 'Insights & articles', href: '/blogs/' },
    { label: 'Research & sources', href: '/research/' },
    { label: 'PubMed research', href: '/breast-enlargement-research/' },
    { label: 'PMC research library', href: '/research/breast-enlargement/' },
    { label: 'Cochrane reviews', href: '/research/cochrane-breast-enlargement/' },
    { label: 'FDA information', href: '/research/fda-breast-enlargement/' },
    { label: 'NHS information', href: '/research/nhs-breast-enlargement/' },
    { label: 'Glossary', href: '/glossary/' },
    { label: 'References', href: '/references/' },
    { label: 'FAQs', href: '/faqs/' }
  ],
  footerContact: [
    { label: 'Contact us', href: '/contact/' },
    { label: 'Enquiries by email', href: 'mailto:enquiries@nonsurgicalbreastenlargement.in' }
  ],
  footerLegal: [
    { label: 'Privacy policy', href: '/privacy-policy/' },
    { label: 'Cookie policy', href: '/cookie-policy/' },
    { label: 'Terms of use', href: '/terms-of-use/' },
    { label: 'Medical disclaimer', href: '/medical-disclaimer/' }
  ]
};

/* ---------- shared blocks ---------- */
const stdCta = (over) => Object.assign({
  type: 'cta',
  eyebrow: 'Your journey starts with information',
  heading: 'Keep exploring the evidence',
  text: 'Use the guides, comparisons and research libraries on this website to prepare your questions — then discuss them with a qualified, registered healthcare professional who can assess you in person.',
  button: { label: 'Contact us', href: '/contact/' }
}, over || {});

/* =============================================================================
   HOME
   ============================================================================= */
const home = {
  url: '/', slug: 'home', h1: '', showBanner: false,
  seoTitle: 'Breast Enlargement: Non-Surgical & Surgical Options Explained',
  seoDescription:
    'Independent, evidence-based education about surgical and non-surgical breast enlargement — what works, what does not, the risks, and the questions to ask before any decision.',
  schema: [
    {
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: 'Breast Enlargement Guide', url: site.url + '/'
    }
  ],
  blocks: [
    {
      type: 'hero',
      eyebrow: 'Independent Patient Education',
      title: 'A More Informed Approach to <em class="accent-rose">Breast Enhancement</em>',
      uppercase: 'Confidence begins with clear, honest information.',
      lead: 'Understand surgical and non-surgical breast enlargement options through clear explanations, published evidence and realistic limitations — before you speak to any clinic.',
      actions: [
        { label: 'Read the evidence guide', href: '/breast-enlargement-without-surgery/', style: 'primary' },
        { label: 'Explore treatments', href: '#treatments', style: 'outline' }
      ],
      note: 'This website provides general education only. Individual suitability, outcomes and risks vary and require assessment by a qualified clinician.',
      slot: 'Hero portrait',
      featureStrip: [
        { icon: 'evidence', label: 'Evidence-based' },
        { icon: 'scale', label: 'Options compared fairly' },
        { icon: 'safety', label: 'Risks explained' },
        { icon: 'info', label: 'No sales pressure' },
        { icon: 'personalised', label: 'Realistic expectations' },
        { icon: 'natural', label: 'Independent & educational' }
      ]
    },
    {
      type: 'split',
      alt: true,
      eyebrow: 'Our approach',
      heading: 'Clear information. Honest limits. No promotion.',
      body: '<p>Every person considering breast enhancement has different anatomy, breast tissue, aesthetic preferences and expectations. This website exists to explain the options before you discuss them with any clinic or surgeon.</p>' +
        '<p>We aim to make complex treatment choices easier to understand by presenting the potential benefits, limitations, recovery considerations and risks of each approach — so you can make decisions grounded in accurate information rather than promotion.</p>' +
        '<p>Whether you are exploring breast augmentation surgery, fat transfer or a non-surgical treatment, our focus is on transparent, evidence-based information and realistic expectations.</p>',
      slot: 'Clinic / consultation environment',
      link: { label: 'Read about this website', href: '/about-us/' },
      script: 'Clarity before any decision'
    },
    {
      type: 'icon-grid',
      eyebrow: 'Our principles',
      heading: 'Four commitments behind every page',
      cols: 4,
      items: [
        { icon: 'personalised', title: 'Reader-first', text: 'Written for people weighing real decisions, not to sell any treatment.' },
        { icon: 'safety', title: 'Safety-first', text: 'Contraindications, alternatives and potential complications are stated plainly.' },
        { icon: 'evidence', title: 'Evidence-informed', text: 'Explanations grounded in published research and regulator guidance, with sources linked.' },
        { icon: 'discretion', title: 'No promotion', text: 'No clinic, product or practitioner is advertised or recommended here.' }
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
      ratio: 'ratio-3-4',
      eyebrow: 'Treatments',
      heading: 'A closer look at individual options',
      items: [
        { title: 'Breast dermal fillers', text: 'Injectable products for specific approved aesthetic indications — and why breast use raises safety questions.', href: '/non-surgical/dermal-fillers/' },
        { title: 'PRP', text: 'How platelet-rich plasma is prepared, what it is intended to do, and how the evidence is assessed.', href: '/non-surgical/prp/' },
        { title: 'Thread-based procedures', text: 'PDO and mono threads: intended mechanical effects, limitations and product-specific indications.', href: '/non-surgical/breast-threads/' },
        { title: 'Sculptra & biostimulators', text: 'Poly-L-lactic acid and collagen-stimulating products — approved uses versus breast-use claims.', href: '/non-surgical/sculptra-plla/' },
        { title: 'Breast implants', text: 'Medical devices with an outer shell and gel filling, and their long-term monitoring needs.', href: '/breast-implants/' },
        { title: 'Fat transfer', text: 'Using your own fat for a modest, individualised increase in volume, and its retention variability.', href: '/surgical/fat-transfer-breast-augmentation/' },
        { title: 'Breast augmentation', text: 'Surgical increase of breast volume using implants or, in selected cases, your own fat.', href: '/surgical/breast-augmentation/' },
        { title: 'Compare all options', text: 'A side-by-side view of intended effect, primary consideration and important limitation.', href: '/breast-enhancement-comparison/' }
      ]
    },
    {
      type: 'steps',
      alt: true,
      eyebrow: 'How to use this website',
      heading: 'A clear, five-step pathway to an informed decision',
      lead: 'Work through the information at your own pace. No decision about your body should ever be rushed by advertising.',
      items: [
        { title: 'Learn what each option is', text: 'Start with the non-surgical and surgical sections to understand intended effects, mechanisms and limitations.' },
        { title: 'Check what the evidence shows', text: 'Read the evidence guide and the research libraries to see what is proven, what is unproven and what to avoid.' },
        { title: 'Understand the risks', text: 'Review candidacy, contraindications, possible complications and the warning signs that need medical attention.' },
        { title: 'Compare fairly', text: 'Use the side-by-side comparison to weigh intended effect, evidence quality, recovery and reversibility.' },
        { title: 'Talk to a qualified professional', text: 'Take your written questions to a registered, appropriately qualified clinician and compare more than one opinion before deciding.' }
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
      type: 'cards',
      alt: true,
      cols: 4,
      eyebrow: 'Research & sources',
      heading: 'Go straight to the published sources',
      lead: 'This website is built from primary sources. Start at the research hub, or go directly to a topic library — every page links to the original regulator guidance, public-health information, systematic reviews or peer-reviewed record behind it.',
      items: [
        { title: 'Research hub', text: 'An index of every research and reference library on this website, with a short explanation of what each one contains and how to read it.', href: '/research/', kicker: 'Start here' },
        { title: 'PubMed research', text: 'Peer-reviewed breast enlargement studies indexed in PubMed — fat transfer, implants, external expansion, fillers and global trends, grouped by topic with a link to every record.', href: '/breast-enlargement-research/', kicker: 'PubMed' },
        { title: 'PMC research library', text: 'Every PubMed Central record for “breast enlargement” — searchable, with abstracts and links to the original articles.', href: '/research/breast-enlargement/', kicker: 'PubMed Central' },
        { title: 'Cochrane evidence library', text: 'Every Cochrane systematic review and registered protocol on breast implants, wound drains, implant types and reconstruction, with key findings and evidence gaps.', href: '/research/cochrane-breast-enlargement/', kicker: 'Cochrane Library' },
        { title: 'FDA information library', text: 'US regulator pages on breast implants, dermal fillers and injectable-silicone warnings, summarised and linked.', href: '/research/fda-breast-enlargement/', kicker: 'U.S. FDA' },
        { title: 'NHS information library', text: 'UK public-health patient information on breast enlargement, costs, complications and choosing a practitioner.', href: '/research/nhs-breast-enlargement/', kicker: 'NHS (UK)' },
        { title: 'ASPS library', text: 'American Society of Plastic Surgeons patient information on breast augmentation: candidacy, cost, implant types, safety, recovery, results and choosing a surgeon.', href: '/research/asps-breast-enlargement/', kicker: 'ASPS (US)' },
        { title: 'All references', text: 'A single consolidated bibliography of every source cited across this website, grouped by publisher and linked to the original.', href: '/references/', kicker: 'Bibliography' }
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
    blocks: [].concat(o.blocks, [stdCta({ heading: o.ctaHeading || "Discuss whether this option may be appropriate for you" })])
  };
}

const pages = [];

/* ---------- Non-surgical overview ---------- */
pages.push({
  url: '/non-surgical/', slug: 'non-surgical',
  h1: 'Non-Surgical Breast Enhancement: Options, Evidence & Safety',
  seoTitle: 'Non-Surgical Breast Enhancement: Options & Safety | Breast Enlargement Guide',
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
    { type: 'cards', cols: 3, alt: true, ratio: 'ratio-3-4', eyebrow: 'Options covered', heading: 'Non-surgical treatments explained individually',
      items: [
        { title: 'Breast dermal fillers', text: 'Injectable products for specific approved aesthetic indications, and the serious safety questions around breast use.', href: '/non-surgical/dermal-fillers/', slot: 'Dermal filler imagery' },
        { title: 'PRP (platelet-rich plasma)', text: 'Prepared from your own blood to concentrate platelets. What it is intended to do, and how evidence is assessed.', href: '/non-surgical/prp/', slot: 'PRP preparation imagery' },
        { title: 'PDO threads', text: 'Medical sutures placed in tissue for specific intended effects, with product-specific indications and limitations.', href: '/non-surgical/breast-threads/', slot: 'Thread procedure imagery' },
        { title: 'Mono threads', text: 'Ultra-fine threads that differ in design and intended mechanical effect from cog threads.', href: '/non-surgical/mono-threads/', slot: 'Mono thread imagery' },
        { title: 'Sculptra & PLLA', text: 'Poly-L-lactic acid injectables for certain specified aesthetic indications, subject to product labelling and local authorisation.', href: '/non-surgical/sculptra-plla/', slot: 'PLLA product imagery' },
        { title: 'Biostimulators', text: 'A broad category intended to stimulate a tissue response such as collagen production, for selected indications.', href: '/non-surgical/biostimulators/', slot: 'Biostimulator imagery' },
        { title: 'Stem cells & regenerative medicine', text: 'The subject of ongoing research. “Regenerative” does not establish that a product is effective or approved.', href: '/non-surgical/regenerative-medicine/', slot: 'Regenerative research imagery' },
        { title: 'Home care & skin quality', text: 'Supportive skin-quality measures discussed at consultation where appropriate.', href: '/non-surgical/' },
        { title: 'What works: the evidence verdict', text: 'A scorecard of more than 20 popular methods — bras and fat transfer to creams, cups and fillers — with the evidence, the risks and the red flags behind each.', href: '/breast-enlargement-without-surgery/', slot: 'Evidence guide imagery' }
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
        ['Stem-cell approaches', 'Evidence and regulatory status of the exact product', 'Many marketed regenerative uses remain unapproved or investigational']
      ],
      note: 'This table covers non-surgical options only. For a side-by-side view including surgical routes (implants and fat transfer), see the full <a href="/breast-enhancement-comparison/">treatment comparison</a>. It should not be read to suggest that a non-surgical procedure is automatically safer than surgery.'
    },
    { type: 'faq', id: 'ns', alt: true, eyebrow: 'Questions', heading: 'Non-surgical treatment FAQs',
      items: [
        { q: 'What is the safest non-surgical way to make breasts look bigger?', a: '<p>A properly fitted bra, padding, clothing choices and posture change the look immediately and carry no medical risk — but they change appearance, not breast tissue. For a method-by-method verdict on every popular approach, read the <a href="/breast-enlargement-without-surgery/">evidence guide</a>.</p>' },
        { q: 'Does “regenerative” mean a treatment is effective?', a: '<p>No. The term describes an area of ongoing research, not proof of effectiveness, approval or suitability for breast enhancement. Products and permitted uses vary by jurisdiction.</p>' },
        { q: 'Where can I find answers about fillers, PRP, fat transfer and surgery?', a: '<p>Each treatment page on this website answers its own specific questions, and the most common cross-cutting questions are consolidated on the <a href="/faqs/">main FAQs page</a>, with links into the detailed guides.</p>' }
      ]
    },
    stdCta({ heading: 'Understand the evidence before you choose a non-surgical option' })
  ]
});

/* ---------- Individual non-surgical treatment pages ---------- */
pages.push(treatmentPage({
  url: '/non-surgical/dermal-fillers/', slug: 'dermal-fillers',
  h1: 'Breast Dermal Fillers: Safety, Evidence & Alternatives',
  seoTitle: 'Breast Fillers: Safety, Evidence & Alternatives | Breast Enlargement Guide',
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
  seoTitle: 'PRP and Breast Enhancement: Evidence Explained | Breast Enlargement Guide',
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
  seoTitle: 'Breast Thread Procedures: Uses & Limitations | Breast Enlargement Guide',
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
  seoTitle: 'Mono Threads: Uses and Limitations | Breast Enlargement Guide',
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
  seoTitle: 'Stem Cells and Regenerative Medicine | Breast Enlargement Guide',
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
  seoTitle: 'Sculptra and PLLA: Uses, Safety & Evidence | Breast Enlargement Guide',
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
  seoTitle: 'Biostimulators: Collagen-Stimulating Treatments | Breast Enlargement Guide',
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
  seoTitle: 'Breast Augmentation: Implants & Fat Transfer | Breast Enlargement Guide',
  seoDescription: 'An educational overview of surgical breast enhancement — breast augmentation, silicone gel-filled implants and autologous fat transfer, including recovery and long-term considerations.',
  bannerEyebrow: SG,
  bannerLead: 'Surgical options can increase breast volume or alter breast shape. Like all surgery, they carry risks, require informed consent and may involve future procedures.',
  breadcrumb: [{ label: 'Surgical' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Surgical Breast Enhancement', url: site.url + '/surgical-breast-enhancement/' }],
  blocks: [
    { type: 'prose', html:
      '<p>Breast augmentation is a surgical procedure designed to increase breast volume or alter breast shape using implants or, in selected cases, the patient’s own fat. It may be considered by people seeking greater fullness, a change in proportions, or restoration of volume following pregnancy or weight change.</p>' +
      '<p>Treatment planning should take account of anatomy, existing breast tissue, skin characteristics, general health, lifestyle, expectations, and the individual’s willingness to accept surgical risks and future follow-up. An appropriately credentialed surgeon should lead this assessment.</p>' },
    { type: 'cards', alt: true, cols: 3, ratio: 'ratio-3-4', eyebrow: 'Options', heading: 'Surgical pathways',
      items: [
        { title: 'Breast augmentation', text: 'A personalised approach to increasing breast volume or altering shape using implants or, in selected cases, your own fat.', href: '/surgical/breast-augmentation/', slot: 'Breast augmentation imagery' },
        { title: 'Breast implants', text: 'Medical devices with an outer shell and a silicone gel filling — not the same as injectable silicone.', href: '/breast-implants/', slot: 'Implant imagery' },
        { title: 'Fat transfer', text: 'Using your own fat, transferred from a donor area, for a modest and individualised increase in volume.', href: '/surgical/fat-transfer-breast-augmentation/', slot: 'Fat transfer imagery' }
      ]
    },
    { type: 'cards', alt: true, cols: 3, ratio: 'ratio-3-4', eyebrow: 'More procedures', heading: 'Revision, reduction, lift and corrective surgery',
      items: [
        { title: 'Breast revision', text: 'Implant exchange, removal or repair when a previous operation needs attention.', href: '/surgical/breast-revision/', slot: 'Revision surgery imagery' },
        { title: 'Breast reduction', text: 'Reducing breast size and weight to relieve physical symptoms and restore proportion.', href: '/surgical/breast-reduction/', slot: 'Breast reduction imagery' },
        { title: 'Breast lift (mastopexy)', text: 'Reshaping and raising sagging breasts without adding volume.', href: '/surgical/breast-lift/', slot: 'Breast lift imagery' },
        { title: 'Mastectomy & chest surgery', text: 'Removal of breast tissue for chest contouring, risk reduction or treatment.', href: '/surgical/mastectomy-chest-surgery/', slot: 'Chest surgery imagery' },
        { title: 'Breast filler removal', text: 'Corrective surgery for injected fillers and liquid silicone that have caused problems.', href: '/surgical/breast-filler-removal/', slot: 'Corrective surgery imagery' }
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
  seoTitle: 'Breast Augmentation: Implants & Fat Transfer | Breast Enlargement Guide',
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
    },
    { type: 'prose', html:
      '<h2 class="h3">Breast augmentation: data from the American Society of Plastic Surgeons</h2>' +
      '<p>The figures and lists below summarise patient information published by the American Society of Plastic Surgeons (ASPS), the largest association of board-certified plastic surgeons in the United States. They are reproduced here for education and context. ASPS guidance reflects United States practice and regulation and does not replace assessment by a suitably qualified clinician in your own jurisdiction.</p>' },
    { type: 'table', eyebrow: 'ASPS patient information', heading: 'What breast augmentation can — and cannot — do',
      head: ['Goal', 'What ASPS patient information says'],
      rows: [
        ['Increase fullness and projection', 'Breast implants or fat transfer can increase the size and projection of the breasts.'],
        ['Improve balance and proportion', 'Augmentation can improve the balance between breast and hip contours.'],
        ['Support body image', 'ASPS notes the procedure may enhance self-image and self-confidence.'],
        ['Breast reconstruction', 'Implants may also be used for breast reconstruction after mastectomy or injury.'],
        ['Severe drooping', 'Augmentation alone does not correct severely drooping breasts; a breast lift may be needed, at the same time or as a separate operation.']
      ] },
    { type: 'steps', eyebrow: 'ASPS patient information', heading: 'How the procedure is usually performed',
      lead: 'ASPS describes the operation in five broad stages.',
      items: [
        { title: 'Anesthesia', text: 'Intravenous sedation or general anaesthesia is used, so the procedure is comfortable throughout.' },
        { title: 'Incision', text: 'Peri-areolar, inframammary fold or axillary incisions are the usual routes; ASPS notes that the belly-button approach carries a higher complication rate.' },
        { title: 'Placement', text: 'The implant is placed either under the pectoral muscle (submuscular) or behind the breast tissue over the muscle (subglandular).' },
        { title: 'Closure', text: 'Layered sutures close the tissue, with sutures, skin adhesive or surgical tape on the skin. Scars fade over time and are affected by genetics, nicotine and infection.' },
        { title: 'Results', text: 'Results are visible immediately, with the final shape settling as swelling resolves.' }
      ] },
    { type: 'table', alt: true, eyebrow: 'ASPS patient information', heading: 'Types of breast implants',
      head: ['Implant', 'What ASPS patient information says'],
      rows: [
        ['Saline', 'Sterile salt water; collapses and is absorbed or expelled if the shell leaks; uniform shape and firmness; FDA-approved from age 18.'],
        ['Structured saline', 'Salt water with an internal structure for a more natural feel.'],
        ['Silicone gel', 'Gel feels more like natural breast tissue; does not collapse if it leaks; regular ultrasound or MRI screening is advised; FDA-approved from age 22.'],
        ['Form-stable (“gummy bear”)', 'Keeps its shape even if the shell breaks; firmer and thicker; a shaped version gives more bottom projection but can look unusual if it rotates; requires a longer incision.'],
        ['Round', 'Generally a fuller look; higher profiles add more projection; less concern about rotation.'],
        ['Smooth', 'Softest feel and natural movement, but rippling may be felt or seen.'],
        ['Textured', 'Tissue adheres to the surface so it is less likely to move and may reduce capsular contracture, but textured surfaces are where BIA-ALCL occurs most often.']
      ] },
    { type: 'notice', icon: 'downtime', title: 'Recovery and results (ASPS patient information)',
      text: '<ul>' +
        '<li>Immediately after surgery the breasts are wrapped in gauze, with an elastic bandage or support bra to limit swelling and support healing.</li>' +
        '<li>Patients are monitored in recovery and are usually permitted home about an hour after surgery once stable for discharge.</li>' +
        '<li>The support garment (a bra or elastic band) is worn around the clock as instructed; wound care instructions differ between surgeons and should be followed exactly.</li>' +
        '<li>Acute pain typically subsides after one to five days, but soreness and swelling may persist for a few weeks.</li>' +
        '<li>Final results settle over a few weeks as swelling subsides; incision lines may take several months to a couple of years to fade.</li>' +
        '<li>Breasts change over time with ageing, weight fluctuation, hormones and gravity; some people later choose a lift or an implant exchange.</li>' +
        '<li>Implants are not guaranteed to last a lifetime, so further surgery may eventually be needed.</li>' +
        '</ul>' },
    { type: 'notice', icon: 'safety', title: 'Risks and safety (ASPS patient information)',
      text: '<p>ASPS lists the following possible risks of breast augmentation surgery, discussed fully before consent:</p><ul>' +
        '<li>Anaesthesia risks.</li>' +
        '<li>Breast implant-associated anaplastic large cell lymphoma (BIA-ALCL) or other very rare cancers in the capsule, such as breast implant-associated squamous cell carcinoma (BIA-SCC).</li>' +
        '<li>Bleeding or haematoma.</li>' +
        '<li>Changes in nipple or breast sensation.</li>' +
        '<li>Fluid accumulation (seroma).</li>' +
        '<li>Tight scar tissue forming around the implant (capsular contracture).</li>' +
        '<li>Implant leakage or rupture.</li>' +
        '<li>Infection and persistent pain.</li>' +
        '<li>Poor scarring, wrinkling of the skin over the implant, or the implant sitting in the wrong position.</li>' +
        '<li>The possibility that revision surgery will be needed.</li>' +
        '</ul><p>For silicone implants, the FDA recommends screening with MRI or ultrasound five to six years after placement and every two to three years thereafter. Risk factors include pregnancy, weight change and the menopause. Routine examinations help confirm that an implant is intact, because a ruptured implant sometimes causes no symptoms.</p>' },
    { type: 'table', eyebrow: 'ASPS patient information', heading: 'US average costs',
      head: ['Procedure', 'ASPS average surgeon fee'],
      rows: [
        ['Breast augmentation with implants', '$4,875'],
        ['Breast augmentation with fat grafting', '$5,719']
      ],
      note: 'ASPS averages cover the surgeon’s fee only and exclude anaesthesia, operating-room facilities, medical tests, post-surgery garments and prescriptions. Most health insurance plans do not cover cosmetic breast augmentation or a later revision.' },
    { type: 'table', alt: true, eyebrow: 'ASPS 2025 statistics', heading: 'Breast augmentation at a glance',
      head: ['Measure', 'ASPS 2025 data'],
      rows: [
        ['Year-on-year change', 'Breast augmentation rose about 11% in 2025.'],
        ['Rank', 'Second most common cosmetic surgical procedure, behind liposuction.'],
        ['Among women', 'Narrowly the most popular cosmetic procedure, ahead of liposuction.'],
        ['By age', 'Favourite procedure for ages 36–45; gains across ages 26–65; the 66+ group grew fastest overall (+24%).'],
        ['Preference', 'A shift towards smaller, more proportionate implants was noted.'],
        ['Related trends', 'Breast lifts rose about 8% and breast reductions about 7%; 82% of member surgeons reported GLP-1-related consultation requests.']
      ],
      note: 'Figures are from the ASPS 2025 plastic surgery statistics and describe the United States, so they do not represent Indian or regional practice.' },
    { type: 'notice', blush: true, icon: 'evidence', title: 'Source: American Society of Plastic Surgeons',
      text: '<p>Summarised from ASPS patient information and statistics pages:</p><ul>' +
        '<li><a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation">Breast augmentation</a></li>' +
        '<li><a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/candidates">Candidates</a></li>' +
        '<li><a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/implants">Types of breast implants</a></li>' +
        '<li><a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/procedure">Procedure steps</a></li>' +
        '<li><a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/recovery">Recovery</a></li>' +
        '<li><a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/results">Results</a></li>' +
        '<li><a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/safety">Risks and safety</a></li>' +
        '<li><a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/cost">Cost</a></li>' +
        '<li><a href="https://www.plasticsurgery.org/news/plastic-surgery-statistics">2025 plastic surgery statistics</a></li>' +
        '</ul>' },
    { type: 'notice', blush: true, icon: 'evidence', title: 'Source: NCBI Bookshelf clinical review',
      text: '<p>The clinical background on this page is also drawn from the peer-reviewed StatPearls review <strong>Breast Augmentation</strong> (Bookshelf ID NBK482206, PMID 29489168), published by the US National Library of Medicine. Its sections on indications, contraindications, implant choices, placement, incisions, recovery, complications and outcomes are indexed in our <a href="/research/statpearls-breast-augmentation/">NCBI Bookshelf breast augmentation library</a>, with links to each section of the original.</p>' +
        '<p><a href="https://www.ncbi.nlm.nih.gov/books/NBK482206/" rel="noopener">Read the full review on ncbi.nlm.nih.gov</a> \u2014 it is free to read, and it describes United States practice and regulation at the time of writing.</p>' }
  ],
  ctaHeading: 'Plan a personalised breast augmentation consultation'
}));

pages.push(treatmentPage({
  url: '/surgical/fat-transfer-breast-augmentation/', slug: 'fat-transfer',
  h1: 'Fat Transfer Breast Augmentation: What to Know',
  seoTitle: 'Fat Transfer Breast Augmentation: What to Know | Breast Enlargement Guide',
  seoDescription: 'Fat transfer breast augmentation: how the procedure works, donor-site and liposuction considerations, variable fat retention, recovery and potential complications.',
  bannerEyebrow: 'Surgical · Autologous fat transfer',
  bannerLead: 'Fat transfer breast augmentation removes fat from a donor area using liposuction, processes it, and transfers selected fat to the breasts. It may suit certain patients seeking a relatively modest increase in volume without implants.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Fat transfer' }],
  blocks: [
    { type: 'prose', html:
      '<p>The amount of fat that can be transferred safely, and the proportion that remains over time, vary. Some transferred fat may not survive, and more than one procedure may be needed to approach a patient’s goals.</p>' },
    { type: 'notice', icon: 'evidence', title: 'Fat transfer data from the American Society of Plastic Surgeons',
      text: '<p>ASPS describes fat transfer breast augmentation as using liposuction to remove fat from another part of the body and inject it into the breasts, and notes that it is best suited to patients who want a relatively small increase with a natural result. The ASPS average surgeon fee for breast augmentation with fat grafting is $5,719 (United States, surgeon’s fee only). ASPS also refers to the technique as breast augmentation with fat grafting, and cites research into mega-volume fat transfer with pre-expansion and into techniques intended to double breast size using the patient’s own fat.</p><p><a href="https://www.plasticsurgery.org/cosmetic-procedures/fat-transfer-breast-augmentation">ASPS: Fat transfer breast augmentation</a></p>' },
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

pages.push(treatmentPage({
  url: '/surgical/breast-revision/', slug: 'breast-revision',
  h1: 'Breast Revision Surgery: When Implants Need Attention',
  seoTitle: 'Breast Revision Surgery: Implant Exchange, Removal & Repair | Breast Enlargement Guide',
  seoDescription: 'Breast revision surgery: why implants may need revision — capsular contracture, rupture, displacement, asymmetry or a change in preferences — and what revision planning involves.',
  bannerEyebrow: 'Surgical · Revision',
  bannerLead: 'Breast revision surgery is performed when a previous breast operation needs correction, adjustment or reversal — for example implant exchange, removal, or repair of capsule-related changes.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Breast revision' }],
  blocks: [
    { type: 'prose', html:
      '<p>Breast implants are not lifetime devices. Over time, the capsule of scar tissue that naturally forms around an implant can tighten (capsular contracture), an implant can rupture or change position, or the breasts can change with pregnancy, weight change and ageing. Some people also simply wish to change size. Revision surgery addresses any of these situations.</p>' +
      '<p>Revision is often more complex than a first operation: scar tissue, stretched skin, thinned breast tissue and previous implant position all shape what can safely be achieved. Planning should therefore be led by a suitably qualified surgeon who will examine you, review any previous operative records and imaging, and discuss realistic options — which may include implant exchange, removal with or without replacement, capsulectomy, or combining revision with a breast lift.</p>' },
    { type: 'icon-grid', eyebrow: 'Common reasons', heading: 'Why revision surgery is considered', cols: 3,
      items: [
        { icon: 'safety', title: 'Capsular contracture', text: 'Scar tissue tightening around an implant, causing firmness, distortion or discomfort.' },
        { icon: 'info', title: 'Implant rupture or deflation', text: 'Loss of implant integrity, confirmed by examination and imaging where indicated.' },
        { icon: 'shape', title: 'Position or shape changes', text: 'Displacement, rotation, bottoming out or an unnatural appearance over time.' },
        { icon: 'scale', title: 'Asymmetry', text: 'Differences between sides that developed after the original surgery.' },
        { icon: 'personalised', title: 'Change of preference', text: 'A wish to change size, or to remove implants entirely (explantation).' },
        { icon: 'downtime', title: 'Tissue changes', text: 'Sagging or skin laxity after pregnancy, weight change or ageing.' }
      ]
    },
    { type: 'notice', icon: 'info', title: 'Revision is individualised',
      text: 'What is possible depends on the remaining breast tissue, skin quality, implant position and your goals. In some cases a good result requires combining implant revision with a breast lift, or accepting that implant removal alone will leave a less full shape.' },
    { type: 'faq', alt: true, id: 'rev', eyebrow: 'Questions', heading: 'Breast revision FAQs',
      items: [
        { q: 'How long do breast implants last?', a: '<p>There is no fixed lifespan. Implants may remain stable for many years, but additional operations are common over a lifetime of implant use. Regular review and prompt assessment of any new change are recommended.</p>' },
        { q: 'Can implants be removed without replacement?', a: '<p>Yes — explantation without replacement is possible. The resulting shape depends on how much natural breast tissue remains and the degree of skin laxity; some people choose to combine removal with a lift.</p>' },
        { q: 'Is revision surgery more complex than first-time surgery?', a: '<p>Often, yes. Existing scar tissue, altered anatomy and thinner breast tissue can make revision longer and less predictable. A thorough consultation, including imaging where indicated, is essential before planning.</p>' }
      ]
    }
  ],
  ctaHeading: 'Discuss your revision concerns with a qualified surgeon'
}));

pages.push(treatmentPage({
  url: '/surgical/breast-reduction/', slug: 'breast-reduction',
  h1: 'Breast Reduction Surgery: Relief, Proportion and Recovery',
  seoTitle: 'Breast Reduction Surgery: Benefits, Techniques & Recovery | Breast Enlargement Guide',
  seoDescription: 'Breast reduction surgery: how reducing breast volume and weight can relieve physical symptoms, what the procedure involves, scarring, recovery and factors that shape the outcome.',
  bannerEyebrow: 'Surgical · Reduction',
  bannerLead: 'Breast reduction removes skin, fat and glandular tissue to reduce breast size and weight, and repositions the breast into a more proportionate shape.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Breast reduction' }],
  blocks: [
    { type: 'prose', html:
      '<p>Very large or heavy breasts can cause persistent neck, shoulder and back pain, shoulder-groove marks from bra straps, skin irritation beneath the breasts, and difficulty with physical activity. Breast reduction addresses both the symptoms and the proportions, by removing excess tissue and reshaping the remaining breast.</p>' +
      '<p>The operation is planned around your anatomy, the degree of reduction desired, blood supply to the nipple–areola complex and your overall health. Scarring is an unavoidable part of the procedure; incisions are placed so that scars fall within the bra line or along the areola border where possible. Because breast reduction is performed to relieve documented physical symptoms, it may in some cases be approached through medical insurance — criteria vary and require documentation.</p>' },
    { type: 'icon-grid', alt: true, eyebrow: 'What patients should understand', heading: 'Key considerations', cols: 3,
      items: [
        { icon: 'scale', title: 'Symptom relief', text: 'Reduction commonly relieves back, neck and shoulder strain caused by breast weight.' },
        { icon: 'shape', title: 'Scars are permanent', text: 'Incision lines around the areola, vertically, or along the inframammary fold.' },
        { icon: 'personalised', title: 'Symmetry is approximate', text: 'Perfectly equal breasts cannot be promised; some asymmetry is normal.' },
        { icon: 'downtime', title: 'Recovery period', text: 'Several weeks away from heavy lifting and exercise, with gradual return to activity.' },
        { icon: 'safety', title: 'Sensation changes', text: 'Nipple and breast skin sensation may temporarily or permanently change.' },
        { icon: 'info', title: 'Breastfeeding', text: 'Future breastfeeding ability can be affected; this is discussed in advance.' }
      ]
    },
    { type: 'faq', id: 'red', eyebrow: 'Questions', heading: 'Breast reduction FAQs',
      items: [
        { q: 'Can breast reduction be combined with a lift?', a: '<p>Breast reduction inherently includes lifting and reshaping the breast. A separate lift is generally not needed, although the specific technique is tailored to each case.</p>' },
        { q: 'Will the breasts grow back after reduction?', a: '<p>Reduced tissue does not regrow, but substantial weight gain, pregnancy and hormonal changes can alter breast size again. Long-term results depend on stable weight and individual anatomy.</p>' },
        { q: 'How much tissue is removed?', a: '<p>The amount depends on your anatomy, symptoms and goals, and is planned with your surgeon. The aim is a proportionate, symptom-relieving result rather than a specific cup size, which cannot be guaranteed.</p>' }
      ]
    }
  ],
  ctaHeading: 'Discuss whether breast reduction could relieve your symptoms'
}));

pages.push(treatmentPage({
  url: '/surgical/breast-lift/', slug: 'breast-lift',
  h1: 'Breast Lift (Mastopexy): Restoring Shape',
  seoTitle: 'Breast Lift Surgery (Mastopexy): Shape, Scars & Longevity | Breast Enlargement Guide',
  seoDescription: 'Breast lift (mastopexy): what it changes — sagging skin, nipple position and breast shape — how it differs from augmentation, scarring, longevity and combination options.',
  bannerEyebrow: 'Surgical · Mastopexy',
  bannerLead: 'A breast lift raises and reshapes sagging breasts by removing excess skin and repositioning the breast tissue and nipple. It changes shape, not volume.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Breast lift' }],
  blocks: [
    { type: 'prose', html:
      '<p>Sagging (ptosis) develops with ageing, pregnancy, breastfeeding, weight change and gravity. A breast lift addresses it by removing loose skin, reshaping the remaining breast tissue and repositioning the nipple–areola complex higher on the chest. Unlike augmentation, a lift on its own does not add volume — the breast is reshaped using the tissue already present.</p>' +
      '<p>The degree of lift required determines the pattern of scars: around the areola alone for mild sagging, plus a vertical line for moderate sagging, or an additional line within the inframammary fold for more significant sagging. Where more fullness is also desired, a lift can be combined with an implant or fat transfer, with the trade-offs of each discussed at consultation.</p>' },
    { type: 'table', eyebrow: 'At a glance', heading: 'Lift compared with augmentation and reduction',
      head: ['Procedure', 'What it changes', 'Volume'],
      rows: [
        ['<strong>Breast lift (mastopexy)</strong>', 'Shape and position — raises sagging tissue and repositions the nipple', 'Unchanged'],
        ['<strong>Augmentation</strong>', 'Volume and fullness — implants or fat transfer', 'Increased'],
        ['<strong>Reduction</strong>', 'Volume, weight and shape — removes tissue', 'Decreased']
      ]
    },
    { type: 'icon-grid', alt: true, eyebrow: 'Key points', heading: 'What to understand before deciding', cols: 3,
      items: [
        { icon: 'shape', title: 'Scars are permanent', text: 'Scars fade with time but do not disappear; their pattern depends on the lift required.' },
        { icon: 'clock', title: 'Results are long-lasting, not permanent', text: 'Pregnancy, weight change and ageing continue to affect the breast over time.' },
        { icon: 'personalised', title: 'Combination is common', text: 'Lift with implant or fat transfer when both shape and volume need change.' },
        { icon: 'safety', title: 'Sensation and feeding', text: 'Nipple sensation and future breastfeeding may be affected; this is discussed in advance.' }
      ]
    },
    { type: 'faq', id: 'lift', eyebrow: 'Questions', heading: 'Breast lift FAQs',
      items: [
        { q: 'What is the difference between a breast lift and augmentation?', a: '<p>Augmentation adds volume with an implant or fat; a lift reshapes and raises existing tissue without adding volume. Some people need one, some need both, and the right combination depends on your anatomy and goals.</p>' },
        { q: 'How long does a breast lift last?', a: '<p>The reshaping is durable, but the breast continues to age. Pregnancy, weight change and gravity gradually affect the result, and some people eventually choose further surgery.</p>' },
        { q: 'Can a lift be done without visible scars?', a: '<p>No. Every lift technique involves incisions and therefore permanent scars, although they are planned to sit within the areola border or bra line. No procedure can promise scarless results.</p>' }
      ]
    }
  ],
  ctaHeading: 'Discuss whether a breast lift suits your goals'
}));

pages.push(treatmentPage({
  url: '/surgical/mastectomy-chest-surgery/', slug: 'mastectomy-chest-surgery',
  h1: 'Mastectomy and Chest Contouring Surgery',
  seoTitle: 'Mastectomy & Chest Contouring Surgery: Patient Information | Breast Enlargement Guide',
  seoDescription: 'Mastectomy and chest contouring: why the surgery is performed, common surgical approaches, important considerations, recovery and questions to ask at consultation.',
  bannerEyebrow: 'Surgical · Chest surgery',
  bannerLead: 'Mastectomy removes breast tissue. When performed to create a flatter, more contoured chest, it is often called chest masculinisation or top surgery.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Mastectomy & chest surgery' }],
  blocks: [
    { type: 'prose', html:
      '<p>Mastectomy is the surgical removal of breast tissue. It is performed for several reasons, including gender-affirming chest masculinisation, reduction of elevated cancer risk in selected patients, and treatment of disease. This page provides general educational information; the appropriate procedure, eligibility and timing are determined through individual medical assessment.</p>' +
      '<p>When the goal is chest contouring rather than treatment of disease, the technique is tailored to the amount of breast tissue, skin laxity and the desired chest shape. Approaches may include a double-incision technique with nipple grafting, or a periareolar (keyhole) approach in suitable anatomy. The surgeon also considers scar placement, chest-wall contour and future revision options.</p>' },
    { type: 'icon-grid', eyebrow: 'What to discuss', heading: 'Questions for your consultation', cols: 3,
      items: [
        { icon: 'personalised', title: 'Which technique suits you', text: 'The approach depends on tissue volume, skin elasticity and the contour you want.' },
        { icon: 'shape', title: 'Scars and nipple position', text: 'Where incisions fall and how nipple–areola position and sensation are planned.' },
        { icon: 'safety', title: 'Risks', text: 'Bleeding, infection, contour irregularity, sensation changes and the possibility of revision.' },
        { icon: 'downtime', title: 'Recovery', text: 'Drain use, compression garments, activity restrictions and follow-up schedule.' },
        { icon: 'evidence', title: 'Eligibility assessment', text: 'Medical and psychological assessment where required, and any eligibility criteria that apply.' },
        { icon: 'info', title: 'Future procedures', text: 'Whether staged or additional surgery may be needed to refine the result.' }
      ]
    },
    { type: 'notice', icon: 'info', title: 'Assessment comes first',
      text: 'Chest surgery is elective and requires assessment by an appropriately qualified surgeon, including a discussion of risks, alternatives, realistic outcomes and — where required — eligibility criteria. No outcome can be guaranteed.' },
    { type: 'faq', alt: true, id: 'mast', eyebrow: 'Questions', heading: 'Mastectomy & chest surgery FAQs',
      items: [
        { q: 'What is the difference between mastectomy and breast reduction?', a: '<p>Breast reduction removes a portion of tissue to make the breasts smaller while preserving a feminine breast shape. Mastectomy for chest contouring removes breast tissue to create a flatter, more masculine chest wall, with a different approach to nipple position and scars.</p>' },
        { q: 'Will I need follow-up surgery?', a: '<p>Most people are satisfied with a single procedure, but refinement or revision surgery is sometimes desired for contour or scar reasons. This is discussed in advance.</p>' },
        { q: 'How long is recovery?', a: '<p>Recovery varies with the technique and individual healing. Compression garments, limited arm activity and drain care are commonly required for a period after surgery, with a gradual return to full activity as advised by your surgeon.</p>' }
      ]
    }
  ],
  ctaHeading: 'Arrange a confidential consultation to discuss chest surgery'
}));

pages.push(treatmentPage({
  url: '/surgical/breast-filler-removal/', slug: 'breast-filler-removal',
  h1: 'Breast Filler Removal: Addressing Injected Fillers and Silicone',
  seoTitle: 'Breast Filler Removal: Clearing Injected Fillers & Silicone | Breast Enlargement Guide',
  seoDescription: 'Breast filler removal: why injected fillers and liquid silicone cause complications, how removal is approached, and what to expect regarding imaging, scars and staged treatment.',
  bannerEyebrow: 'Surgical · Corrective',
  bannerLead: 'Injectable fillers and liquid silicone are not approved for breast enlargement. When they cause pain, migration, lumps or infection, removal surgery may be required.',
  breadcrumb: [{ label: 'Surgical', href: '/surgical-breast-enhancement/' }, { label: 'Breast filler removal' }],
  blocks: [
    { type: 'notice', icon: 'safety', title: 'Fillers are not implants',
      text: 'Dermal fillers approved for facial use must never be assumed suitable for the breasts. Injected silicone and fillers can migrate, form granulomas, cause chronic inflammation and infection, and complicate breast imaging. They are not an equivalent or safer substitute for a breast implant.' },
    { type: 'prose', html:
      '<p>People who have had fillers or liquid silicone injected into the breasts may present with pain, hardness, migrating lumps, asymmetry, skin changes or recurrent infection. Removal is corrective surgery: the injected material is not neatly contained like an implant, and it interleaves with breast tissue, so complete removal is not always possible in one operation.</p>' +
      '<p>Surgical approaches may include removal of the injected material together with the surrounding affected tissue, staged procedures, and in some cases combining removal with implant placement or a lift once healthy tissue has healed. Imaging (such as ultrasound or mammography) is usually assessed before planning, because injected material can distort images and mask or mimic lesions.</p>' },
    { type: 'icon-grid', alt: true, eyebrow: 'What patients should understand', heading: 'Key considerations', cols: 3,
      items: [
        { icon: 'info', title: 'Removal may be incomplete', text: 'Injected material spreads through tissue; complete clearance in one operation cannot be promised.' },
        { icon: 'evidence', title: 'Imaging first', text: 'Breast imaging is typically reviewed before surgery to map the material and assess the tissue.' },
        { icon: 'downtime', title: 'Staged treatment', text: 'More than one operation may be needed, with healing periods in between.' },
        { icon: 'shape', title: 'Scarring & shape', text: 'Removal can leave contour changes; reconstruction options are discussed case by case.' },
        { icon: 'safety', title: 'Pathology', text: 'Removed tissue may be sent for histological examination, as routine.' },
        { icon: 'clock', title: 'Delayed presentation', text: 'Complications can appear years after injection, so history matters at consultation.' }
      ]
    },
    { type: 'faq', id: 'fill', eyebrow: 'Questions', heading: 'Breast filler removal FAQs',
      items: [
        { q: 'Can all injected material be removed?', a: '<p>Not always. Injected silicone and fillers intermingle with breast tissue rather than sitting in a pocket, so complete removal in a single operation is not always achievable. The surgical aim is to remove as much affected material and tissue as safely possible.</p>' },
        { q: 'Can implants be placed at the same time as removal?', a: '<p>Sometimes, but staged surgery is often safer when there is chronic inflammation or infection. Your surgeon will advise based on the condition of the tissue.</p>' },
        { q: 'Do injected fillers affect breast screening?', a: '<p>Injected material can distort imaging and make interpretation harder. It is important to tell radiologists and surgeons about any prior injections, and to keep up with recommended screening.</p>' }
      ]
    }
  ],
  ctaHeading: 'Discuss filler removal and corrective options with a surgeon'
}));

/* ---------- Evidence guide: breast enlargement without surgery ---------- */
pages.push({
  url: '/breast-enlargement-without-surgery/', slug: 'evidence-guide',
  h1: 'Breast Enlargement Without Surgery: What Works and What Doesn’t',
  seoTitle: 'Breast Enlargement Without Surgery: What Works | Evidence Guide',
  seoDescription: 'An evidence-based scorecard of more than 20 popular breast enlargement methods — what adds real volume, what only changes appearance, and what to avoid.',
  bannerEyebrow: 'Evidence guide · Scorecard',
  bannerLead: 'What works, what doesn’t — a verdict for every popular method, with the evidence, the risks and the red flags behind it.',
  breadcrumb: [{ label: 'Evidence guide' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Breast Enlargement Without Surgery: What Works and What Doesn’t', url: site.url + '/breast-enlargement-without-surgery/' }],
  blocks: [
    { type: 'prose', html:
      '<p>This guide answers one question: which non-surgical ways of enlarging the breasts actually work, and which do not? Each method gets a verdict, the evidence behind it and the risks. It draws on regulator statements and published medical reviews, and it is general education — not a recommendation for any individual.</p>' +
      '<p><strong>The short version:</strong> methods that change how the breasts look — a well-fitted bra, padding and styling — work immediately and safely. The only approaches shown to add real, lasting volume without an implant are fat-based: fat transfer, with or without an external device worn beforehand. Those give a modest gain and still involve a procedure. Nearly everything else sold to enlarge breasts, including creams, pills, massage and suction cups, has no reliable evidence behind it, and injectable fillers and silicone are actively dangerous.</p>' },
    { type: 'table', eyebrow: 'How to read the verdicts', heading: 'What the five verdicts mean',
      head: ['Verdict', 'Meaning'],
      rows: [
        ['<strong>WORKS</strong>', 'Delivers what it claims — either a visual change (bras, styling) or a measurable, lasting volume gain (fat transfer) — with risks that are understood.'],
        ['<strong>PARTLY</strong>', 'Delivers part of the promise, for example a firmer-looking chest or promising but demanding results, but not a simple route to a bigger breast.'],
        ['<strong>UNPROVEN</strong>', 'Plausible or widely used, but good evidence for breast enlargement is missing or mixed.'],
        ['<strong>DOESN’T WORK</strong>', 'No reliable evidence of lasting enlargement, or the effect is only temporary swelling.'],
        ['<strong>AVOID</strong>', 'Not approved for this use and linked to serious harm. The risks outweigh any possible benefit.']
      ]
    },
    { type: 'table', alt: true, eyebrow: 'The scorecard', heading: 'More than 20 popular methods, judged',
      lead: 'Each row gives a verdict, what the method actually does, and the bottom line.',
      head: ['Method', 'Verdict', 'What it actually does', 'Bottom line'],
      rows: [
        ['Correctly fitted bra', '<strong>WORKS</strong> (look)', 'Changes shape and apparent size immediately', 'Best first step. No medical risk.'],
        ['Padded, push-up and adhesive bras; inserts', '<strong>WORKS</strong> (look)', 'Adds roughly a cup visually while worn', 'Reversible and inexpensive.'],
        ['Clothing, styling and make-up contouring', '<strong>WORKS</strong> (look)', 'Creates fullness through necklines, layers and highlight', 'Free to try.'],
        ['Posture training', '<strong>WORKS</strong> (look)', 'Opens the chest and removes a stooped look', 'Visible difference, no cost.'],
        ['Chest strength training', '<strong>PARTLY</strong>', 'Builds the muscle under the breast; firmer chest wall', 'Does not enlarge breast tissue.'],
        ['Weight gain', '<strong>PARTLY</strong>', 'Raises breast fat but cannot be targeted', 'Unpredictable; not advised for this goal.'],
        ['Fat transfer', '<strong>WORKS</strong> (modest)', 'Adds your own fat; a review averaged about 58% retained', 'Roughly one cup; it is a surgical procedure.'],
        ['External expansion plus fat transfer', '<strong>PARTLY</strong>', 'Stretches tissue first so more fat survives', 'Promising, but demanding and mostly developer-led data.'],
        ['PRP or stem-cell (SVF) add-ons', '<strong>UNPROVEN</strong>', 'Claimed to help fat survive', 'Debated; may cut usable volume.'],
        ['Muscle stimulators (EMS)', '<strong>DOESN’T WORK</strong>', 'Contracts the chest muscle beneath', 'Cannot enlarge breast tissue.'],
        ['Radiofrequency, ultrasound, laser', '<strong>DOESN’T WORK</strong>', 'Warms skin for tightening', 'Tightening, not volume.'],
        ['Thread lifts', '<strong>DOESN’T WORK</strong>', 'Repositions tissue', 'Lift, not size.'],
        ['Creams and lotions', '<strong>DOESN’T WORK</strong>', 'Moisturise the skin surface', 'Cannot grow glandular or fatty tissue.'],
        ['Herbal pills and teas', '<strong>DOESN’T WORK</strong>', 'Contain plant compounds with hormonal activity', 'No clinical trials; safety concerns.'],
        ['Foods and diets (soy, flax, milk, papaya)', '<strong>DOESN’T WORK</strong>', 'Nutrition only', 'No effect on breast volume.'],
        ['Massage', '<strong>DOESN’T WORK</strong>', 'Relaxes and warms the skin', 'No growth.'],
        ['Suction and vacuum cups', '<strong>DOESN’T WORK</strong>', 'Draws fluid into the tissue', 'Temporary swelling; bruising risk.'],
        ['Hypnosis, subliminal audio, magnets, patches, acupuncture', '<strong>DOESN’T WORK</strong>', 'No credible mechanism', 'No credible evidence.'],
        ['Hyaluronic acid, CaHA or PLLA fillers in the breast', '<strong>AVOID</strong>', 'Inject gel into the breast area', 'FDA recommends against; imaging problems.'],
        ['Liquid silicone, oils and unknown materials', '<strong>AVOID</strong>', 'Inject permanent or unknown material', 'Linked to disfigurement and death.'],
        ['Self-injection and needle-free filler devices', '<strong>AVOID</strong>', 'Unregulated delivery', 'Not approved; serious harm reported.'],
        ['Hormone products without supervision', '<strong>AVOID</strong>', 'Alter hormone levels', 'Not a cosmetic route; real health risks.'],
        ['Implants (surgical, for comparison)', '<strong>WORKS</strong> (surgical)', 'Place a prosthesis through an incision', 'Reliable size, but outside the scope of this guide.']
      ],
      note: '<strong>The pattern to remember:</strong> methods that work are either honest about being cosmetic — they change the look, not the breast — or honest about being a procedure — they move real tissue, with real risks. Methods that promise growth without either of these are the ones that fail.'
    },
    { type: 'notice', icon: 'evidence', title: 'How we judged whether a method works',
      text: 'Four questions were applied to every method: <strong>Does it add measurable volume?</strong> — not a feeling of fullness or a better-fitting bra, but more breast. <strong>Does it last?</strong> — weeks of swelling is not enlargement. <strong>Is it safe enough for the benefit?</strong> — a small gain is not worth a serious risk. <strong>Is the evidence independent and well designed?</strong> — who ran the study, who paid for it, and were the results compared with a fair control? Systematic reviews sit at the top of the evidence ladder; manufacturer surveys, patents and testimonials sit at the bottom.'
    },
    { type: 'prose', alt: true, html:
      '<h2 class="h3">Why most methods fail: how breast tissue actually grows</h2>' +
      '<p>The breast’s duct system and the fat around it develop mainly in response to hormones, above all oestrogen, during puberty, with further changes in pregnancy and breastfeeding. In adult life, breast volume mostly follows body fat, the hormonal cycle, pregnancy and age. The signal that builds breast tissue is internal and hormonal, and nothing applied to the skin or worn over the chest sends that signal.</p>' +
      '<p>Only three routes are known to add tissue: hormonal stimulation (which belongs under medical supervision for medical reasons only, not cosmetics), fat transfer (your own fat moved by a qualified surgeon — modest and surgical), and implants (surgery, outside this guide). Creams, pills, massage, cups and devices have no established mechanism for adding tissue at all.</p>' +
      '<h3 class="h4">Why creams and pills cannot do it</h3>' +
      '<p>To grow breast tissue, a cream or pill would have to deliver a growth signal to deep tissue. The only substances known to do that are hormones, which are drugs with effects throughout the body. A product that truly worked in that way would not be a harmless cosmetic — it would be an unregulated hormone treatment. A product that is harmless is, almost by definition, one that does not do the job.</p>' +
      '<h3 class="h4">A quick test: swelling or growth?</h3>' +
      '<ul>' +
      '<li>If fullness fades within hours or days, it was fluid, swelling or a hormonal cycle effect, not growth.</li>' +
      '<li>If it appears and disappears with your cycle, it is a normal cyclical change.</li>' +
      '<li>If it follows weight gain, the fat changed — and that would happen without the product.</li>' +
      '<li>Real, lasting added volume appears only after procedures that place tissue or material in the breast, or after hormonal development.</li>' +
      '</ul>' },
    { type: 'prose', html:
      '<h2 class="h3">Works for appearance: bras, styling and posture</h2>' +
      '<p>These options do not change the breast itself. They change how it looks and sits, and they do it immediately, cheaply and without medical risk. For many people who ask about enlargement, they are the most effective and least regrettable place to start. Fitting professionals often report that many people wear a band that is too loose and a cup that is too small — a bra that fits properly lifts and supports the breast, which projects the chest forward and changes the shape and apparent size more than any pill or cream.</p>' },
    { type: 'table', alt: true, eyebrow: 'Bra styles', heading: 'Styles and what they do',
      head: ['Style', 'Effect', 'Best for'],
      rows: [
        ['Padded T-shirt bra', 'Smooth shape and modest added fullness', 'Everyday wear under fitted tops'],
        ['Push-up bra', 'Lifts and brings the breasts together; often reads as about a cup larger', 'Cleavage, low necklines'],
        ['Balconette', 'Lifts the upper curve into a rounded shape', 'Square and wide necklines'],
        ['Plunge', 'Brings the breasts together at the centre', 'Deep necklines'],
        ['Adhesive or stick-on', 'Lifts and shapes without straps or a band', 'Backless and strapless outfits; may irritate sensitive skin'],
        ['Silicone or foam inserts', 'Adds volume inside a bra or swimwear', 'Asymmetry or extra fullness; keep clean and dry']
      ],
      note: 'Necklines such as boat, sweetheart and wrap styles draw the eye across the chest. Ruching, gathers, pleats, prints and layering add visual volume at the bust line. Rounded shoulders and a stooped upper back hide the chest — drawing the shoulders gently back and down gives an immediate difference in how the chest looks.'
    },
    { type: 'prose', html:
      '<h2 class="h3">Partly works: strength training and weight</h2>' +
      '<p>The breast is made of glandular tissue, fat and connective tissue, with skin around it. There is no muscle inside the breast. The pectoral muscles lie underneath, so chest exercises build the platform the breast sits on, not the breast. Training can firm and broaden the chest wall, improve posture and shoulder support, and make the breast sit slightly higher and fuller in clothes. It cannot enlarge glandular or fatty breast tissue, reverse sagging caused by stretched skin and ligaments, or target fat gain or loss in the breasts.</p>' +
      '<p>Because breasts contain a lot of fat, gaining weight often increases size — but you cannot choose where weight is gained, and gaining weight purely for this goal carries its own health trade-offs, so it is not a sensible strategy. The reverse also holds: fat loss from heavy training or dieting can reduce breast size, and rapid weight change can leave skin looser.</p>' },
    { type: 'table', alt: true, eyebrow: 'Chest routine', heading: 'Suggested exercises if you train',
      head: ['Exercise', 'Suggested volume', 'Notes'],
      rows: [
        ['Incline push-ups (hands on a bench or table)', '3 sets of 8–12', 'Lower the incline as you get stronger.'],
        ['Dumbbell chest press', '3 sets of 8–12', 'Choose a weight that makes the last two reps challenging.'],
        ['Dumbbell chest fly', '2 sets of 10–12', 'Light weights, elbows slightly bent.'],
        ['Seated or bent-over row', '3 sets of 10–12', 'Balances the chest work and supports posture.']
      ],
      note: 'Train two to three non-consecutive days a week and warm up first. If you have a shoulder, wrist or heart condition, or are new to exercise, ask a doctor or qualified trainer first.'
    },
    { type: 'prose', html:
      '<h2 class="h3">Works modestly: fat transfer</h2>' +
      '<p>Fat transfer (also called lipofilling or autologous fat grafting) removes fat from another body area by liposuction, processes it, and injects it into the breast in small amounts. It leaves no implant. It is often marketed as non-surgical, but because it involves liposuction and, usually, sedation or anaesthesia, it is better described as minimally invasive surgery. It is the best-supported route to real, lasting volume without an implant — but the gain is modest and unpredictable, complications are not rare, and a surgeon who quotes a range rather than a guarantee is giving you honest information.</p>' },
    { type: 'table', alt: true, eyebrow: 'What the evidence shows', heading: 'Fat transfer: the published figures',
      head: ['Measure', 'What reviews report'],
      rows: [
        ['Average fat injected', 'About 300 mL per breast (range 134–610 mL) in a systematic review of 35 studies including 3,757 women'],
        ['Average volume retained', 'About 58% (range 44–83%); another review reported 39% to 76%'],
        ['Overall complication rate', '27.8% of cases; fat necrosis made up 43.7% of all complications'],
        ['Imaging changes', 'Fat necrosis in 9.4% and calcification in 1.2% of cases'],
        ['Patient satisfaction', 'Reported as high despite incomplete retention']
      ],
      note: 'If about 300 mL is injected and about 58% survives, the gain is around 175 mL — by the common rule of thumb that one cup is roughly 150–200 mL, about one cup size. Results vary with blood supply, surgical technique, recipient tissue, smoking and weight change. Risks include fat necrosis and oil cysts, calcifications visible on mammograms, bruising, swelling, infection, asymmetry, donor-site dents or numbness, and anaesthesia risks.'
    },
    { type: 'prose', html:
      '<h2 class="h3">Promising but demanding: external expansion with fat transfer</h2>' +
      '<p>Some clinics use a bra-like vacuum device worn for long periods each day for several weeks before fat grafting. The aim is to stretch the tissue gently and improve its blood supply, so that it accepts more fat and more of it survives. A developer-led study of 81 patients reported an average gain of 233 mL per breast at 12 months, compared with 134 mL in published series of fat transfer without expansion — though the comparison was against published series rather than a randomly assigned control group. A 2018 review of 13 studies reported graft survival between 53% and 82% at 6 to 12 months, with high satisfaction. A 2022 review concluded that external expansion improves fat survival but that complications and poor compliance are obvious, and that no standard parameters exist.</p>' +
      '<p>The burden is heavy: many hours of device wear a day for weeks, skin problems such as swelling, bruising, blisters and dermatitis, and rare but reported serious complications including pneumothorax. The verdict is <strong>promising, not settled</strong> — the strongest numbers come from the group that developed the technique.</p>' },
    { type: 'table', alt: true, eyebrow: 'Add-ons and devices', heading: 'Treatments that are real — but do not enlarge the breast',
      head: ['Treatment', 'What it can do', 'What it is sold as', 'Verdict'],
      rows: [
        ['PRP alone', 'May support tissue repair elsewhere in the body', 'Non-surgical breast enlargement or lift', '<strong>UNPROVEN</strong> for breast volume'],
        ['Stem-cell or SVF enrichment', 'Experimental add-on to fat grafts', 'Higher fat survival and bigger result', '<strong>UNPROVEN</strong>; may reduce usable volume'],
        ['Muscle stimulators (EMS)', 'Contract the chest muscle', 'Breast lifting and growth', '<strong>DOESN’T WORK</strong> for size'],
        ['Radiofrequency, ultrasound, laser', 'Mild skin tightening', 'Firmer, bigger breasts', '<strong>DOESN’T WORK</strong> for size'],
        ['Thread lifts', 'Reposition tissue for a limited time', 'Instant enlargement', '<strong>DOESN’T WORK</strong> for size']
      ]
    },
    { type: 'prose', html:
      '<h2 class="h3">Methods that don’t work: products you can buy</h2>' +
      '<p><strong>Creams and lotions</strong> act on the skin surface. They can moisturise and make the skin feel smoother, and a smoother surface can look firmer for a while. There is no plausible way for a cream to grow glandular or fatty tissue underneath, and no well-designed clinical trial shows that any cream does so. Beware of creams that contain hormones that are not listed on the label.</p>' +
      '<p><strong>Herbal pills, teas and capsules</strong> usually contain plant extracts promoted as “phytoestrogens”. A medical review of bust-enhancing herbal products published in <em>Obstetrics &amp; Gynecology</em> found that no clinical trials had been published, noted that several ingredients — including hops, saw palmetto, dong quai, chaste-tree berry, wild yam, fennel, black cohosh and fenugreek — are hormonally active, and concluded that their use should be discouraged because of lack of evidence of efficacy and long-term safety concerns. Hormone-active ingredients can cause temporary breast fullness and tenderness, which looks like growth — and can also disrupt periods and hormone levels.</p>' +
      '<p><strong>Foods and diets</strong> (soy, flaxseed, milk, papaya and similar claims) target nothing: the amount of plant compounds in a normal diet does not enlarge the breast. <strong>Massage</strong> may relax and improve skin feel, but forceful massage can bruise and is not advisable. <strong>Suction and vacuum cups</strong> draw fluid and blood into the tissue, causing temporary swelling that fades in hours or days — the exact effect people mistake for growth — and misuse can cause bruising, broken blood vessels and skin damage. <strong>Hypnosis, subliminal audio, magnets, patches and acupuncture</strong> have no credible mechanism and no credible evidence; some patches even contain hormones or other active ingredients.</p>' +
      '<p>People believe these methods work because of temporary swelling, cyclical changes across the menstrual cycle, small weight gains during weeks of use, better posture or a better bra, hope and the placebo effect, and the selective sharing of success stories.</p>' },
    { type: 'notice', icon: 'safety', title: 'Methods to avoid: fillers, silicone and unsupervised hormones',
      text: 'The US FDA recommends against using dermal fillers or any injectable filler to increase breast size — these uses are not approved, and the risks of unapproved uses are not known. In a 2017 safety communication, the FDA warned that injectable silicone and products falsely marketed as approved fillers have caused serious injuries and disfigurement when used to enlarge the breasts; large-scale injections can block blood vessels in the lungs, heart or brain, causing stroke or death, and problems can appear years later. At an August 2025 advisory meeting, the FDA raised concerns that filler can migrate, form nodules or granulomas, interfere with mammograms and breast examination, and potentially affect breastfeeding — and news coverage reported that no approved method exists for removing dermal fillers. Needle-free devices are not approved for injecting fillers, no filler is approved for over-the-counter use, and people should never inject themselves. Hormone products bought online are not a cosmetic route to larger breasts and carry real risks including blood clots.'
    },
    { type: 'table', alt: true, eyebrow: 'Spotting false claims', heading: 'Red flags before you spend money',
      head: ['Claim you will see', 'Why it is a problem', 'A better question'],
      rows: [
        ['“Clinically proven”', 'Often means an in-house survey or a study on something else', 'Where is the independent, published trial, and what did it measure?'],
        ['“100% natural”', 'Natural ingredients can still be hormone-active or contaminated', 'What are the ingredients, and has anyone tested their effect on breast size?'],
        ['“Doctor recommended”', 'Which doctor, and were they paid?', 'Can I speak to a registered specialist independent of the seller?'],
        ['“Results in 30 days”', 'Fast changes are usually swelling or weight change', 'How was the result measured, and how long did it last?'],
        ['“FDA registered”', 'In the US, registration of a facility is not the same as approval of a product for a use', 'Is this product approved or cleared for this specific use?'],
        ['“Permanent, no risk”', 'No breast procedure is risk-free, and few results are permanent', 'What are the complication rates, and what happens if I am unhappy?'],
        ['Before-and-after photos', 'Lighting, posture, timing and bras change the picture', 'Are they standardised, unretouched and from real patients like me?'],
        ['“Limited-time offer”', 'Pressure removes time to think', 'Can I take the written plan home and decide later?']
      ],
      note: 'Before you buy: search the product name with “warning”, “recall” or “adverse events”; check the regulator in your country for approval status; look for a published, independent study; read the full ingredient list; and ask a pharmacist or doctor about interactions with your medicines or conditions.'
    },
    { type: 'table', alt: true, eyebrow: 'Compared side by side', heading: 'Effort, risk and reversibility',
      head: ['Method', 'Effort and time', 'Invasiveness', 'Time to a visible change', 'Reversible?', 'Risk level'],
      rows: [
        ['Bras, padding, styling', 'Minutes; ongoing', 'None', 'Immediate', 'Yes', 'None'],
        ['Strength training', '2–3 sessions a week', 'None', 'Weeks to months', 'Yes', 'Low'],
        ['Fat transfer', 'One or two procedures, then recovery', 'Minimally invasive surgery', 'Swelling first; final result after several months', 'Not fully; lost fat cannot be replaced without repeating', 'Moderate'],
        ['External expansion plus fat transfer', 'Weeks of daily device wear plus a procedure', 'Device plus surgery', 'Months', 'Partly', 'Moderate'],
        ['Creams, massage', 'Daily', 'None', 'No lasting change', 'Yes', 'Low'],
        ['Herbal or hormone pills', 'Daily for weeks', 'Oral', 'No lasting change; swelling possible', 'Effects of hormones may persist', 'Low to moderate'],
        ['Suction cups', 'Sessions of minutes to hours', 'External', 'Hours (swelling)', 'Yes', 'Low to moderate'],
        ['Fillers in the breast', 'A clinic visit', 'Injection', 'Immediate', 'No reliable method of removal', 'High'],
        ['Liquid silicone, oils', 'A clinic or unlicensed visit', 'Injection', 'Immediate', 'No', 'Very high']
      ],
      note: '<strong>The effort-to-reward trade:</strong> methods that ask little of you give little and cost little. Methods that give real volume ask for a procedure, recovery time and acceptance of risk. No method on this list gives a large, lasting gain for no effort and no risk, and any seller who says otherwise is selling hope.'
    },
    { type: 'steps', eyebrow: 'What to do instead', heading: 'A sensible order of steps',
      lead: 'Match the method to your actual goal, then pick the least invasive option that can deliver it.',
      items: [
        { title: 'Look fuller in clothes', text: 'Start with a professional bra fitting, padded or push-up styles, necklines and posture. Rarely needs a specialist.' },
        { title: 'Get a firmer chest', text: 'Strength training and posture work for 8 to 12 weeks. Consider a specialist if loose skin or marked sagging remains.' },
        { title: 'A modest, lasting increase', text: 'Learn about fat transfer and ask for retention and complication data — if you have stable weight, enough donor fat and realistic goals.' },
        { title: 'A large, predictable increase', text: 'Learn about surgical options, and see a qualified plastic surgeon. Compare more than one opinion, in writing, with the full cost and a revision policy.' },
        { title: 'Different-sized breasts', text: 'A padded insert on the smaller side; have any recent change checked. Discuss fat transfer or surgery if the difference bothers you.' },
        { title: 'Under 18', text: 'Talk with a doctor and a trusted adult — breasts keep developing for years. No product, device or procedure is appropriate.' }
      ]
    },
    { type: 'table', alt: true, eyebrow: 'Real-life scenarios', heading: 'Common situations, sensible paths',
      head: ['Situation', 'A sensible path', 'What to avoid'],
      rows: [
        ['“I have an event in three months and want to look fuller.”', 'Get a professional bra fitting; choose a tailored outfit and neckline; consider padded or adhesive options; work on posture.', 'Pills and quick injections: they are too slow, unproven or unsafe.'],
        ['“I’m slim and want a modest, natural increase.”', 'Ask a qualified surgeon whether you have enough donor fat for fat transfer, and compare it with surgical options.', 'Gaining weight at random, or any filler.'],
        ['“My breasts changed after pregnancy or weight loss.”', 'Get re-measured for bras; train the chest and back; ask a surgeon about lift or augmentation if it bothers you.', 'Creams promising to “restore” volume.'],
        ['“An ad promises two cup sizes in 30 days.”', 'Do not buy. Check ingredients and look for independent, published trials.', 'Any product with hormone-like or undeclared ingredients.'],
        ['“A clinic has offered me filler in my breasts.”', 'Decline, and ask for the product name, its regulatory approval for breast use and what happens if you need removal; get a second opinion from a qualified surgeon.', 'Agreeing the same day, or paying a deposit under pressure.'],
        ['“One breast is clearly smaller.”', 'Use a padded insert on the smaller side; have any recent change examined; discuss fat transfer or surgery if it bothers you.', 'Treating one side with creams, cups or devices.']
      ]
    },
    { type: 'table', alt: true, eyebrow: 'Safety', heading: 'Warning signs — and what to do',
      head: ['Sign', 'Why it matters', 'What to do'],
      rows: [
        ['Fever, spreading redness, pus or worsening pain after a treatment', 'Possible infection', 'Contact your clinician the same day.'],
        ['Pale, bluish, dusky or dark skin, or blisters', 'May mean reduced blood supply', 'Seek urgent medical care.'],
        ['Chest pain, breathlessness or collapse', 'Possible blood clot or other serious event', 'Call emergency services.'],
        ['Sudden vision change, severe headache or weakness after filler', 'Possible blocked blood vessel', 'Call emergency services.'],
        ['New lump or hardness weeks or months later', 'Fat necrosis, filler reaction or something unrelated', 'Have it examined and imaged.'],
        ['Nipple discharge, dimpling or skin changes', 'Can arise for unrelated reasons', 'See a doctor promptly.']
      ],
      note: 'Whatever you choose, keep up regular breast awareness and follow your national screening advice. Tell any radiographer about fat grafting, injections or implants, and keep a record of what was done, when and by whom.'
    },
    { type: 'faq', id: 'eg', eyebrow: 'Questions', heading: 'Frequently asked questions',
      items: [
        { q: 'Is there any non-surgical method that makes breasts bigger permanently?', a: '<p>Fat transfer is the best-supported option for lasting volume, but it involves liposuction and delivers modest, variable gains. External expansion before grafting may increase them.</p>' },
        { q: 'Do breast enlargement pills work?', a: '<p>A medical review found no published clinical trials of bust-enhancing herbal products and discouraged their use. There is no controlled trial showing that any pill enlarges the breasts.</p>' },
        { q: 'Do creams and massage work?', a: '<p>No reliable evidence shows that they enlarge breasts. They can improve how the skin feels.</p>' },
        { q: 'Do chest exercises make breasts bigger?', a: '<p>They build the muscle beneath the breast and can improve firmness and posture, but they do not increase breast tissue.</p>' },
        { q: 'Is filler a safe shortcut?', a: '<p>The FDA recommends against filler for breast enlargement and has not approved any for this use. Risks include nodules, migration, imaging problems and difficulty removing the material.</p>' },
        { q: 'Is fat transfer safe?', a: '<p>It is widely used, but one review reported an overall complication rate of 27.8%, with fat necrosis the most common. Discuss the risks with a qualified surgeon.</p>' },
        { q: 'How many cup sizes can I realistically gain without surgery?', a: '<p>Bras and padding add about a cup visually. Fat transfer is typically around one cup per session. More usually needs implants.</p>' },
        { q: 'Will it affect mammograms?', a: '<p>Fat grafting and fillers can both cause imaging changes. Always tell your radiographer.</p>' },
        { q: 'Why do so many people say supplements worked for them?', a: '<p>Temporary swelling, cycle changes, small weight gains and better bras can look like growth, and success stories are shared more than failures.</p>' },
        { q: 'What is the single best first step?', a: '<p>A professional bra fitting. It costs little, carries no risk, and often changes the look more than people expect.</p>' }
      ]
    },
    { type: 'notice', icon: 'evidence', title: 'Sources and further reading',
      text: '<ul>' +
        '<li>U.S. Food and Drug Administration — Dermal Fillers (Soft Tissue Fillers), and the 2017 safety communication on illegal use of injectable silicone for body contouring.</li>' +
        '<li>U.S. Food and Drug Administration — Executive Summary: Meeting on Dermal Fillers (advisory panel, August 2025).</li>' +
        '<li>Seth I, et al. — Autologous fat grafting in breast augmentation: a systematic review highlighting the need for clinical caution (35 studies, 3,757 women).</li>' +
        '<li>Adipose-derived stem cell enrichment is counter-productive for the majority of women seeking primary aesthetic breast augmentation by autologous fat transfer: a systematic review. <em>J Plast Reconstr Aesthet Surg</em>, 2020;73(11):2025–2032.</li>' +
        '<li>Khouri RK, et al. — Brava and Autologous Fat Transfer Is a Safe and Effective Breast Augmentation Alternative: Results of a 6-Year, 81-Patient, Prospective Multicenter Study. <em>Plast Reconstr Surg</em>, 2012.</li>' +
        '<li>The Impact of Recipient Site External Expansion in Fat Grafting Surgical Outcomes. <em>Plast Reconstr Surg Glob Open</em>, 2018; and Research progress of external volume expansion assisted autologous fat grafting for breast reconstruction, 2022.</li>' +
        '<li>“Bust enhancing” herbal products. <em>Obstet Gynecol</em>, 2003;101(6):1345–9; ConsumerLab.com breast enhancement supplements review (2002).</li>' +
        '<li>American Society of Plastic Surgeons — breast augmentation patient information and the 2025 plastic surgery statistics. <a href="https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation">plasticsurgery.org</a> · <a href="https://www.plasticsurgery.org/news/plastic-surgery-statistics">2025 statistics</a></li>' +
        '</ul>Evidence and regulations change, and study figures may not apply to your situation. Check the originals and current regulator guidance before acting.' },
    { type: 'notice', icon: 'evidence', title: 'Browse the complete published literature',
      text: 'This guide cites selected sources. The <a href="/research/breast-enlargement/">PMC research library</a> indexes every PubMed Central record for the phrase “breast enlargement” — with abstracts, citations and direct links to the original articles.' },
    { type: 'notice', blush: true, icon: 'info', title: 'Educational information only — not medical advice',
      text: 'This guide does not recommend any treatment for you. Decisions about your body should be made with a qualified, registered doctor who can examine you. If you notice a new breast lump or any urgent warning sign, seek medical care promptly.' },
    stdCta({ heading: 'Talk through the options with a qualified clinician' })
  ]
});

/* ---------- Comparison ---------- */
pages.push({
  url: '/breast-enhancement-comparison/', slug: 'comparison',
  h1: 'Breast Enhancement Comparison: Intended Effect vs. Claims',
  seoTitle: 'Breast Enhancement Options Compared | Breast Enlargement Guide',
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
  url: '/about-us/', slug: 'about-us',
  h1: 'About this website',
  seoTitle: 'About this website | Breast Enlargement Guide',
  seoDescription: 'Independent, evidence-based education about breast enlargement — non-surgical and surgical options, risks, limitations, and sources.',
  bannerEyebrow: 'Independent education',
  bannerLead: 'Clear, balanced information about breast enlargement options — what works, what does not, and what to ask.',
  breadcrumb: [{ label: 'Home', href: '/' }, { label: 'About' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About this website', url: site.url + '/about-us/' }],
  blocks: [
    { type: 'prose', html:
      '<p>This website is an independent educational resource about breast enlargement. It aims to explain surgical and non-surgical options clearly, describe what the published evidence does — and does not — show, and set realistic expectations about benefits, limitations and risks.</p>' +
      '<p>There is no clinic, medical practice, doctor, team or physical address promoted here. Content is written to help readers prepare informed questions for a qualified, registered healthcare professional who can assess them in person.</p>' +
      '<p>Where possible, explanations are grounded in published research, peer-reviewed literature and guidance from recognised regulators and public-health bodies. Marketing claims are not accepted uncritically: terms like "regenerative", "natural" or "permanent" are explained by what evidence supports them.</p>' +
      '<p>This site does not sell treatments, products or procedures. Links to external sources are provided for verification. For decisions about your health, speak to an appropriately qualified clinician.</p>' },
    { type: 'cta',
      eyebrow: 'Learn and compare',
      heading: 'Start with the evidence',
      text: 'Use the treatment guides, comparison page and research libraries to prepare questions before any consultation.',
      button: { label: 'View treatment comparison', href: '/breast-enhancement-comparison/' }
    }
  ]
});
/* ---------- FAQ page ---------- */
pages.push({
  url: '/faqs/', slug: 'faqs',
  h1: 'Frequently Asked Questions',
  seoTitle: 'Breast Enhancement FAQs | Breast Enlargement Guide',
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

/* ---------- Breast enlargement research (PubMed) ---------- */
const pubmed = (id, label) => '<a href="https://pubmed.ncbi.nlm.nih.gov/' + id + '/" rel="noopener">' + (label || 'PMID ' + id) + '</a>';
pages.push({
  url: '/breast-enlargement-research/', slug: 'breast-enlargement-research',
  h1: 'Breast Enlargement Research: What the Published Evidence Shows',
  seoTitle: 'Breast Enlargement Research & PubMed Evidence | Breast Enlargement Guide',
  seoDescription: 'Peer-reviewed breast enlargement research indexed in PubMed — fat transfer, implants, external expansion, fillers and global trends, with links to every study.',
  bannerEyebrow: 'Research library · PubMed',
  bannerLead: 'Breast enlargement studies indexed in PubMed — surgical and non-surgical — summarised by topic, with a link to every original record.',
  breadcrumb: [{ label: 'Research' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'Breast Enlargement Research (PubMed)', url: site.url + '/breast-enlargement-research/' }],
  blocks: [
    { type: 'prose', html:
      '<p>This page collects peer-reviewed research on breast enlargement — surgical and non-surgical — indexed in PubMed, the US National Library of Medicine’s database of biomedical literature. In October 2026 we searched PubMed using title and abstract terms covering breast augmentation, breast enlargement, fat transfer and autologous fat grafting, non-surgical enlargement, breast implants and breast fillers. Of 77 unique records retrieved, the most relevant are summarised here, grouped by topic, with a link to each original PubMed record.</p>' +
      '<p><strong>What the literature shows in brief:</strong> breast augmentation with implants remains one of the most frequently performed aesthetic operations worldwide, with predictable volume but real complication and revision rates. Autologous fat grafting is the best-supported route to lasting volume without an implant, but the gain is modest and complications occur in roughly a quarter of cases in the largest systematic review. External vacuum expansion has produced true tissue growth in small studies, but demands weeks of daily device wear. Injectable fillers are not approved for breast enlargement, and published case series document serious complications. Creams, pills and most devices have no credible supporting trials.</p>' },
    { type: 'notice', icon: 'evidence', title: 'How this page was compiled',
      text: 'Searches were run on PubMed (National Library of Medicine, USA) in October 2026 using title/abstract terms: “breast augmentation”, “breast enlargement”, (“fat transfer” OR “autologous fat grafting” OR “fat grafting”) AND breast augmentation, (“non-surgical” OR filler OR PRP OR “platelet-rich plasma”) AND breast enlargement, and breast implants AND (augmentation OR enlargement). 77 unique records were retrieved; the studies most relevant to breast enlargement are summarised below. Summaries use abstract-level data — consult the full article and current guidelines before drawing clinical conclusions. Inclusion here is not an endorsement of any study or treatment.' },
    { type: 'table', alt: true, eyebrow: 'Evidence at a glance', heading: 'The headline findings, by question',
      lead: 'Each row links to the PubMed record behind the finding.',
      head: ['Question', 'What the published evidence shows', 'Key studies'],
      rows: [
        ['Does fat transfer enlarge breasts?', 'Yes — modestly. The largest systematic review (35 studies, 3,757 women) reported an average 58% fat retention from about 300 mL injected per breast — roughly one cup — with a 27.8% overall complication rate and 92% average patient satisfaction.', 'Seth 2024 (' + pubmed('37166041') + ')'],
        ['Is fat transfer better than implants?', 'The only randomised trial identified found implants gave more evident and durable augmentation (87.5% vs 70% “excellent” aesthetic outcomes), while fat grafting produced more natural-looking results and better correction of chest-wall deformity.', 'Gentile 2026 (' + pubmed('40908320') + ')'],
        ['Can a vacuum device enlarge breasts without surgery?', 'A 2000 study reported a stable 55% average size increase after 10 weeks of daily external expansion (10–12 h/day); MRI confirmed growth of fat and fibroglandular tissue. Evidence remains limited and largely developer-led.', 'Khouri 2000 (' + pubmed('10845308') + '); Kardorff 2004 (' + pubmed('16285326') + ')'],
        ['Do breast fillers work — and are they safe?', 'Hyaluronic acid gel was briefly authorised for breast use in Europe (2008), then withdrawn worldwide after side effects. A 31-patient complication series found 88.9% of conservatively treated aquafilling cases needed reoperation. Regulators advise against fillers for breast enlargement.', 'Siebert 2014 (' + pubmed('24507861') + '); Gierej 2023 (' + pubmed('37721627') + '); Jeyaratnam 2021 (' + pubmed('34849315') + ')'],
        ['How often do implants need revision?', 'Reported revision rates after primary augmentation are as high as 36%, most commonly for capsular contracture, implant malposition and ptosis of the ageing breast.', 'Denney 2021 (' + pubmed('34121945') + ')'],
        ['Is “breast implant illness” established?', 'Systemic symptoms attributed to implants are widely reported, but a 2024 Danish review notes the correlation with implants is not established, evidence is limited, and it is not a recognised diagnosis.', 'Borhani-Khomani 2024 (' + pubmed('38808767') + ')'],
        ['How common is augmentation worldwide?', 'ISAPS 14-year global data show breast augmentation consistently among the top five surgical aesthetic procedures. Implant removal has been the fastest-growing procedure since 2015 (+46.3% over five years).', 'Triana 2024 (' + pubmed('39103642') + ')']
      ],
      note: 'Study figures describe the groups studied and may not apply to any individual. Evidence and regulatory positions change — check the linked records and current regulator guidance before acting.' },
    { type: 'prose', html:
      '<h2 class="h3">Fat transfer (autologous fat grafting)</h2>' +
      '<p>Fat transfer removes fat by liposuction from another body area and injects it into the breast. It is the best-documented route to real, lasting volume without an implant — but the gain is modest, and the evidence base, while growing, is still dominated by retrospective series rather than controlled trials.</p>' },
    { type: 'table', eyebrow: 'Fat transfer studies', heading: 'What fat-grafting research reports',
      head: ['Study', 'Design', 'What it found'],
      rows: [
        ['Seth I, et al. 2024 — <em>Plast Reconstr Surg</em> (' + pubmed('37166041') + ')', 'Systematic review: 35 studies, 3,757 women', 'Average 300 mL injected per breast; 58% volume retention (range 44–83%); 27.8% overall complication rate, fat necrosis the most common (43.7% of complications); radiologic fat necrosis 9.4%, calcification 1.2%; 92% average satisfaction at one year.'],
        ['Gentile P. 2026 — <em>Aesthetic Plast Surg</em> (' + pubmed('40908320') + ')', 'Randomised open-label trial: 95 implants vs 90 lipofilling', '87.5% of implant patients vs 70% of lipofilling patients had excellent aesthetic outcomes at 12 months. Implant results were significantly more durable; lipofilling results were judged more natural and improved pectus excavatum. Both were safe and effective.'],
        ['Voglimacci M, et al. 2015 — <em>Aesthetic Surg J</em> (' + pubmed('25908697') + ')', 'Systematic review: 42 articles', 'Evidence mostly low level (one level-2 study). Two cancers among 2,023 patients (0.09%) with insufficient follow-up for long-term conclusions. Concludes registries with proper follow-up are needed.'],
        ['Leopardi D, et al. 2014 — <em>ANZ J Surg</em> (' + pubmed('23656507') + ')', 'Systematic review vs implant comparators', 'No comparative studies were found. Fat necrosis, cysts and lumps were the most common complications; reabsorption occurs mainly in the first 12 months; efficacy could not be determined from the available evidence.'],
        ['Hivernaud V, et al. 2015 — <em>Aesthetic Plast Surg</em> (' + pubmed('26085223') + ')', 'Technique review', 'High resorption remains the central problem of large-volume grafting; refinements in harvesting and graft preparation aim to improve fat viability and long-term success.'],
        ['Coleman SR, Saboeiro AP. 2015 — <em>Clin Plast Surg</em> (' + pubmed('26116935') + ')', 'Technique review', 'The 2009 ASPS Fat Graft Task Force concluded fat grafting may be considered for breast augmentation, with results dependent on technique and surgeon expertise.'],
        ['Finzi E. 2003 — <em>Dermatol Surg</em> (' + pubmed('12930335') + ')', 'Retrospective record review', 'Breast enlargement occurred in 43% of patients after tumescent liposuction of other body areas; 30% gained one cup size or more — an incidental, redistribution-based effect.'],
        ['Seth I, et al. 2023 — <em>Gland Surg</em> (' + pubmed('36761486') + ')', 'Method paper: hybrid augmentation', 'Proposes a preoperative formula to estimate fat-graft volume when combining implants with lipofilling (hybrid breast augmentation).']
      ] },
    { type: 'prose', alt: true, html:
      '<h2 class="h3">Non-surgical enlargement: external expansion</h2>' +
      '<p>External vacuum expansion devices (bra-like systems worn for hours a day) aim to grow tissue through controlled mechanical stretch. Small studies report measurable growth; the regimens are demanding, and critics have questioned measurement consistency.</p>' },
    { type: 'table', alt: true, eyebrow: 'Expansion studies', heading: 'External expansion: the published record',
      head: ['Study', 'Design', 'What it found'],
      rows: [
        ['Khouri RK, et al. 2000 — <em>Plast Reconstr Surg</em> (' + pubmed('10845308') + ')', 'Single-group study: 17 women (12 completed)', 'A brassiere-like system applying 20 mmHg per breast, 10–12 h/day for 10 weeks: peak increase 98%; after recoil, a stable long-term increase of 55% (range 15–115%). MRI confirmed proportionate growth of adipose and fibroglandular tissue. No adverse events recorded.'],
        ['Kardorff B, et al. 2004 — <em>JDDG</em> (' + pubmed('16285326') + ')', 'German case report using the same protocol', 'Chest circumference at the nipple level remained 4 cm above baseline at three months after oedema resolved. Side effects were limited to transient irritant contact dermatitis and folliculitis.'],
        ['He Y, et al. 2017 — <em>Plast Reconstr Surg</em> (' + pubmed('28350663') + ')', 'Preclinical/technique study', 'Combining minimally invasive tissue dissection with external volume expansion generated far more adipose tissue than expansion alone, mediated by release of cell-contact inhibition.'],
        ['Tebbetts JB. 2001 — <em>Plast Reconstr Surg</em> (' + pubmed('11379562') + ')', 'Critical review', 'Argued that claimed non-surgical enlargement largely reflects measurement variability and soft-tissue change rather than reliable true tissue growth — a caution against overstating the early expansion data.'],
        ['Uyulmaz S, et al. 2020 — <em>Praxis</em> (' + pubmed('33109001') + ')', 'Clinical review', 'Reviews implant-free cosmetic augmentation: mastopexy for optical lift and lipofilling for volume; large-volume or high-goal augmentation with fat alone remains limited.']
      ] },
    { type: 'prose', html:
      '<h2 class="h3">Fillers and injectable products</h2>' +
      '<p>No injectable filler is approved for breast enlargement by major regulators. The published literature documents what happens when fillers are used in the breast: product withdrawal, complication series and reoperation.</p>' },
    { type: 'table', eyebrow: 'Filler safety evidence', heading: 'What the filler studies report',
      head: ['Study', 'Design', 'What it found'],
      rows: [
        ['Siebert T, et al. 2014 — <em>Ann Chir Plast Esthet</em> (' + pubmed('24507861') + ')', 'Literature review (Macrolane)', 'Hyaluronic acid gel (Macrolane) received European authorisation for breast augmentation in 2008, then was withdrawn from the worldwide breast-augmentation market after numerous side-effect controversies.'],
        ['Gierej P, et al. 2023 — <em>Aesthetic Plast Surg</em> (' + pubmed('37721627') + ')', 'Observational cohort: 31 women with aquafilling-gel complications', '88.9% of patients treated conservatively required reoperation, vs 22.7% after radical surgery. Needle aspiration was ineffective and associated with infection (75% positive cultures). More filler injected correlated with more symptoms.'],
        ['Jeyaratnam S, Joethy J. 2021 — <em>PRS Global Open</em> (' + pubmed('34849315') + ')', 'Case-based review', 'Documents the dangers of filler breast augmentation, consistent with regulator advice against the practice.']
      ] },
    { type: 'prose', alt: true, html:
      '<h2 class="h3">Implant augmentation: outcomes, complications and revision</h2>' +
      '<p>Implant surgery has the largest evidence base of any augmentation method. The studies below cover complication prevention, revision burden, device history, imaging and patient-reported systemic symptoms.</p>' },
    { type: 'table', alt: true, eyebrow: 'Implant studies', heading: 'Implant augmentation: the study data',
      head: ['Study', 'Design', 'What it found'],
      rows: [
        ['Denney BD, et al. 2021 — <em>Semin Plast Surg</em> (' + pubmed('34121945') + ')', 'Review', 'Revision rates after primary augmentation remain as high as 36%; the commonest causes are capsular contracture, implant malposition and ptosis of the ageing breast.'],
        ['Nava MB, et al. 2017 — <em>Gland Surg</em> (' + pubmed('28497025') + ')', 'Evidence review', 'No high-level evidence identifies a single best technique or implant; complication reduction follows established surgical principles rather than device fashion.'],
        ['Nahabedian MY. 2019 — <em>Plast Reconstr Surg</em> (' + pubmed('31246764') + ')', 'Review of form-stable implants', 'Reviews diagnosis and management of complications with modern cohesive-gel implants; no implant lasts forever, though devices remain safe and effective per clinical and epidemiologic studies.'],
        ['Kaoutzanis C, et al. 2019 — <em>Semin Plast Surg</em> (' + pubmed('31632203') + ')', 'Historical review', 'Traces implant evolution since 1962, including the silicone-gel controversies, and how successive generations improved safety and aesthetics.'],
        ['Correia-Sá I, et al. 2013 — <em>Aesthetic Plast Surg</em> (' + pubmed('23943050') + ')', 'Case report with histology', 'PIP implants showed increased rupture and leakage risk; documents clinical, histologic and microbiologic findings after rupture, including siliconoma and lymph-node involvement.'],
        ['Monstrey S, et al. 2004 — <em>Plast Reconstr Surg</em> (' + pubmed('15108875') + ')', 'Case series: 13 patients', 'Trilucent (soybean-oil-filled) implants failed because of lipid-oxidation metabolites; UK and Belgian authorities advised removal — a documented device-withdrawal precedent.'],
        ['Simádo TS. 2021 — <em>Plast Reconstr Surg</em> (' + pubmed('33885442') + ')', 'Clinical algorithm', 'Galactorrhea and galactocele after breast augmentation: a diagnosis and treatment algorithm.'],
        ['Green LA, et al. 2018 — <em>Clin Imaging</em> (' + pubmed('28918365') + ')', 'Imaging review', 'Breast-cancer screening must continue after augmentation; radiologists need familiarity with surgical techniques, implant appearances and MRI findings.'],
        ['Faguy K. 2018 — <em>Radiol Technol</em> (' + pubmed('29793920') + ')', 'Imaging review', 'Catalogues adverse effects and imaging appearances of breast implants for technologists and radiologists.'],
        ['Borhani-Khomani K, et al. 2024 — <em>Ugeskr Læger</em> (' + pubmed('38808767') + ')', 'Danish review', 'Self-reported systemic symptoms attributed to implants (“breast implant illness”): the correlation is not established, evidence is limited, and the condition is not currently a recognised diagnosis.'],
        ['Luan J. 2023 — <em>Clin Plast Surg</em> (' + pubmed('36396254') + ')', 'Technique review', 'Endoscopic-assisted transaxillary augmentation: the axillary approach remains preferred by many patients in Asia; endoscopy improves control and stability of the result.'],
        ['Bekeny JC, et al. 2020 — <em>Gland Surg</em> (' + pubmed('32775269') + ')', 'Review (transfeminine augmentation)', 'Augmentation for transfeminine patients is technically similar to that for cisgender peers, with equivalent complication rates and documented quality-of-life benefits.'],
        ['Holst-Albrechtsen S, et al. 2018 — <em>Ugeskr Læger</em> (' + pubmed('29886889') + ')', 'Clinical study', 'Post-operative infections after cosmetic surgery abroad (“cosmetic tourism”) — treatment abroad carries identifiable infection risk.']
      ] },
    { type: 'prose', html:
      '<h2 class="h3">Global trends and contemporary benchmarks</h2>' +
      '<p>Large registry analyses show how often augmentation is performed, how preferences are shifting, and where the field is heading.</p>' },
    { type: 'table', eyebrow: 'Trends', heading: 'What the registry and benchmark studies report',
      head: ['Study', 'Design', 'What it found'],
      rows: [
        ['Triana L, et al. 2024 — <em>Aesthetic Plast Surg</em> (' + pubmed('39103642') + ')', 'ISAPS global statistics, 2010–2023', '34.9 million aesthetic procedures worldwide in 2023. Breast augmentation has remained consistently in the top five surgical procedures for 14 years, with a first decline in the most recent year; implant removal is the fastest-growing procedure since 2015 (+46.3% over five years).'],
        ['Glicksman CA. 2026 — <em>Clin Plast Surg</em> (' + pubmed('41826039') + ')', 'Benchmarks review', 'Contemporary benchmarks in breast augmentation surgery — current reference points for planning and outcomes.'],
        ['Lhuaire M, et al. 2019 — <em>Plast Reconstr Surg</em> (' + pubmed('31764702') + ')', 'Technique paper', 'Minimally invasive inframammary breast augmentation — approaches aimed at smaller, hidden incisions.'],
        ['Lin Y, et al. 2022 — <em>Aesthetic Plast Surg</em> (' + pubmed('33403418') + ')', 'Anthropometric study', 'Body and breast measurements in augmentation planning — objective sizing data supporting implant selection.']
      ] },
    { type: 'faq', id: 'res', eyebrow: 'Questions', heading: 'About this research page',
      items: [
        { q: 'What is PubMed, and why use it?', a: '<p>PubMed is the US National Library of Medicine’s free index of biomedical literature, covering thousands of peer-reviewed journals. Searching it gives a structured, reproducible view of what has actually been studied — rather than what is advertised.</p>' },
        { q: 'Does listing a study mean we recommend its findings?', a: '<p>No. Listing means the study is part of the published evidence base. Individual studies vary in quality — a small case report carries far less weight than a systematic review or randomised trial. Nothing on this page is a recommendation for any individual.</p>' },
        { q: 'Why do study findings sometimes disagree?', a: '<p>Different designs, patient groups, surgical techniques, measurement methods and eras produce different results. Systematic reviews that pool many studies sit at the top of the evidence ladder; single-centre case series sit lower.</p>' },
        { q: 'How current is this page?', a: '<p>The PubMed search was run in October 2026. New studies are indexed continuously — check PubMed for the latest work, and look for updated systematic reviews and regulator statements.</p>' },
        { q: 'Where can I read the full articles?', a: '<p>Each link opens the study’s PubMed record with its abstract. Many full texts sit behind journal subscriptions; ask a librarian, university library or your clinician for access, and treat any claim you cannot verify with caution.</p>' }
      ]
    },
    { type: 'notice', blush: true, icon: 'info', title: 'Educational information only — not medical advice',
      text: 'This page summarises published research for general education. It cannot account for your health, anatomy or circumstances, and it does not recommend any treatment. Study figures may not transfer to individuals. Decisions about breast enlargement should be made with a qualified, registered clinician after proper assessment. If you notice a new breast lump or any urgent symptom, seek medical care promptly.' },
    stdCta({ heading: 'Want to discuss what the evidence means for you?' })
  ]
});

module.exports = { site, pages, home, stdCta, treatmentPage };
