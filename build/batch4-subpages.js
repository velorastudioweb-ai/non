'use strict';

/*
 * Additional sub-pages, batch 4.
 *
 * Twenty clinician-review drafts for the four remaining parent guides:
 * biostimulators, Sculptra / PLLA, stem cells and regenerative medicine, and
 * mastectomy / chest contouring. These pages are educational only. Product
 * approval and regulatory statements must be checked against current Indian
 * requirements before publication.
 */

const { siteImages } = require('./site-images');

function page(data) {
  const image = siteImages[data.imageKey];
  if (!image) throw new Error('Unknown image for batch-4 sub-page: ' + data.imageKey);
  const { imageKey, ...rest } = data;
  return {
    ...rest,
    bannerImage: image.src,
    bannerWidth: image.width,
    bannerHeight: image.height,
    bannerAlt: data.bannerAlt || image.alt
  };
}

const prose = (html) => ({ type: 'prose', html });
const takeaway = (text, icon = 'info') => ({ type: 'notice', icon, title: 'Key takeaway', text });

/* ==========================================================================
   Biostimulators
   ========================================================================== */
const biostimulators = [
  page({
    url: '/non-surgical/biostimulators/what-are-biostimulators/',
    slug: 'what-are-biostimulators',
    section: 'non-surgical',
    group: 'biostimulators',
    parentUrl: '/non-surgical/biostimulators/',
    parentTitle: 'Biostimulators',
    h1: 'What Are Biostimulators? How They Differ From Fillers',
    cardTitle: 'What biostimulators are',
    seoTitle: 'What Are Biostimulators? Fillers Compared | Quantum Health',
    seoDescription: 'An introduction to collagen-stimulating injectables, how they differ from traditional fillers and why they are not breast enlargement treatments.',
    bannerLead: 'Biostimulators aim to trigger a gradual tissue response. They are not established treatments for increasing breast volume.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/biostimulators/', 'Biostimulators', 'The parent guide to collagen-stimulating treatments.'],
      ['/non-surgical/biostimulators/approved-uses/', 'Approved uses', 'Why a product’s intended use and treatment area matter.'],
      ['/non-surgical/sculptra-plla/', 'Sculptra and PLLA', 'A guide to one type of collagen-stimulating injectable.']
    ],
    blocks: [
      prose(`
        <p class="lead">Biostimulators are injectable products intended to encourage the body to produce its own collagen. They are sometimes called collagen stimulators. This page is part of our guide to <a href="/non-surgical/biostimulators/">biostimulators</a>.</p>
        <h2>Common examples</h2>
        <ul><li><strong>Poly-L-lactic acid (PLLA):</strong> a synthetic, biodegradable polymer.</li><li><strong>Calcium hydroxylapatite (CaHA):</strong> a mineral-based microsphere product.</li><li><strong>Polycaprolactone (PCL):</strong> another biodegradable polymer.</li></ul>
        <p>Products, labels and approvals differ by country.</p>
        <h2>How they differ from fillers</h2>
        <ul><li>Fillers such as hyaluronic acid add volume mostly through the gel itself, so results are often visible straight away.</li><li>Biostimulators act more indirectly. The material triggers a gradual response in nearby tissue, and any improvement builds over weeks to months.</li></ul>
        <h2>What they are used for</h2>
        <p>Most evidence relates to facial skin quality, facial volume loss and some body areas such as the hands. They may be used to improve skin firmness, texture or gradual soft-tissue support in specifically approved or selected uses.</p>
        <h2>What they are not</h2>
        <p>Biostimulators are not designed or approved to enlarge the breast. Collagen in skin and connective tissue does not substitute for the fat and glandular tissue that make up breast volume.</p>
        <h2>Not reversible in the same way</h2>
        <p>Unlike hyaluronic acid, these products cannot be dissolved with hyaluronidase. That can make complications harder to treat, particularly if material has been placed too superficially or unevenly.</p>
        <h2>Questions to ask</h2>
        <ul><li>What is the product, and what is it approved or registered for?</li><li>How will I know if it works, and when?</li><li>What is the plan if I develop a problem?</li></ul>`
      ),
      takeaway('Biostimulators change skin and soft tissue gradually. They are not breast enlargement treatments.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/biostimulators/approved-uses/',
    slug: 'biostimulator-approved-uses',
    section: 'non-surgical',
    group: 'biostimulators',
    parentUrl: '/non-surgical/biostimulators/',
    parentTitle: 'Biostimulators',
    h1: 'Approved Uses of Biostimulators and Why the Breast Is Not One of Them',
    cardTitle: 'Approved uses',
    seoTitle: 'Biostimulator Approved Uses and Breast Limits | Quantum Health',
    seoDescription: 'What biostimulating products are typically approved for, how approval is specific to use and area, and what that means for breast treatments.',
    bannerLead: 'Approval is tied to a particular product, purpose and body area. That detail matters more than a broad claim that a product is approved.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/biostimulators/', 'Biostimulators', 'The parent guide to collagen-stimulating treatments.'],
      ['/non-surgical/regulatory-status/', 'Approved vs off-label use', 'How to interpret product status and off-label treatment.'],
      ['/non-surgical/biostimulators/what-are-biostimulators/', 'What biostimulators are', 'How these products differ from traditional fillers.']
    ],
    blocks: [
      prose(`
        <p class="lead">A product’s approval or registration is tied to a particular product, purpose and body area. This is a key part of assessing any offer made under the name of <a href="/non-surgical/biostimulators/">biostimulators</a>.</p>
        <h2>Typical approved uses</h2>
        <p>Approvals vary by country, but commonly relate to facial applications such as deep lines, loss of facial volume, cheek contour or wrinkles. Some products also have medical uses for facial fat loss in specific conditions, or indications for hands or other areas. Check the current approval or registration for the exact product being proposed.</p>
        <h2>What is not typically approved</h2>
        <p>Breast enlargement or breast lift is generally not an approved use for these products. Using a product for that purpose is usually described as off-label.</p>
        <h2>What off-label means</h2>
        <p>Doctors may sometimes use products off-label based on their clinical judgement. It does not automatically make a use unsafe, but it means the regulator has not reviewed evidence for that specific purpose. Read more about <a href="/non-surgical/regulatory-status/">approved and off-label use</a>.</p>
        <h2>Why evidence matters</h2>
        <p>Results in the face do not predict results in the breast. Skin thickness, blood supply, movement and tissue type differ. A treatment that has a recognised facial indication may still have little evidence for a chest or breast use.</p>
        <h2>Questions to ask</h2>
        <ul><li>Is this exact use approved or registered in India or elsewhere?</li><li>What evidence supports it in the chest or breast?</li><li>Why do you recommend it for me?</li><li>What will I be asked to sign for consent?</li></ul>
        <h2>Red flags</h2>
        <ul><li>Claims that a product is “FDA approved for breast enlargement”.</li><li>An unbranded or unclear product.</li><li>A refusal to show product documents or the batch details.</li></ul>`
      ),
      takeaway('Biostimulators have specific approved uses, and breast enlargement is not usually one of them.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/biostimulators/how-collagen-stimulation-works/',
    slug: 'biostimulator-collagen-stimulation',
    section: 'non-surgical',
    group: 'biostimulators',
    parentUrl: '/non-surgical/biostimulators/',
    parentTitle: 'Biostimulators',
    h1: 'How Collagen Stimulation Works, and Why Results Take Time',
    cardTitle: 'How collagen stimulation works',
    seoTitle: 'How Collagen-Stimulating Injectables Work | Quantum Health',
    seoDescription: 'The biology behind collagen-stimulating injectables, why results appear gradually and what that means for expectations and repeat treatment.',
    bannerLead: 'The response is gradual. Early fullness can be swelling or liquid carrier rather than the intended longer-term tissue change.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/biostimulators/', 'Biostimulators', 'The parent guide to these collagen-stimulating products.'],
      ['/non-surgical/sculptra-plla/preparation-technique/', 'PLLA preparation and technique', 'Why dilution, placement and aftercare can matter.'],
      ['/non-surgical/biostimulators/chest-skin-vs-breast-volume/', 'Chest skin vs breast volume', 'Why skin-quality change is not breast enlargement.']
    ],
    blocks: [
      prose(`
        <p class="lead">Biostimulators rely on the body’s own response. Understanding the process helps explain why results take time and why quick volume claims should be treated cautiously. This page is part of our <a href="/non-surgical/biostimulators/">biostimulators guide</a>.</p>
        <h2>The process</h2>
        <ol><li>The product is injected into the skin or just beneath it.</li><li>The body recognises the particles as foreign material and mounts a mild, controlled inflammatory response.</li><li>Cells called fibroblasts lay down new collagen around the particles.</li><li>Over time, the product is gradually absorbed while the new collagen may remain for a period.</li></ol>
        <h2>Why it takes months</h2>
        <p>The response is slow. Visible change typically builds over several weeks to months, and treatment is often given in a series of sessions spaced weeks apart. The timing depends on the product, area, dose and person.</p>
        <h2>What this means for expectations</h2>
        <ul><li>Early appearance may reflect swelling or the volume of liquid carrier, which fades.</li><li>The intended effect cannot be judged immediately.</li><li>Providers often suggest assessing a result at about three months or longer.</li></ul>
        <h2>How long does it last?</h2>
        <p>Duration varies by product, treatment area, dose and individual response. Some reports suggest effects lasting a year or more, with maintenance sessions, but published data are mostly for facial uses.</p>
        <h2>Limits for breast enlargement</h2>
        <p>Collagen stimulation may affect skin quality and soft-tissue support. It does not create the fat or glandular tissue that gives breasts their volume. A gradual change in chest skin should not be sold as a substitute for breast augmentation.</p>
        <h2>Questions to ask</h2>
        <ul><li>When might I see results?</li><li>How many sessions will I need?</li><li>How long might they last, and what is the evidence for this area?</li></ul>`
      ),
      takeaway('Be patient and be sceptical of fast claims. Slow biology means results cannot be judged within days.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/biostimulators/risks/',
    slug: 'biostimulator-risks',
    section: 'non-surgical',
    group: 'biostimulators',
    parentUrl: '/non-surgical/biostimulators/',
    parentTitle: 'Biostimulators',
    h1: 'Risks of Biostimulators: Nodules, Inflammation and Delayed Reactions',
    cardTitle: 'Risks and delayed reactions',
    seoTitle: 'Biostimulator Risks: Nodules and Delayed Reactions | Quantum Health',
    seoDescription: 'The potential complications of collagen-stimulating injectables, including delayed nodules, and why technique and product knowledge matter.',
    bannerLead: 'Because these products provoke a tissue response, complications can occur early or months after treatment.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/biostimulators/', 'Biostimulators', 'The parent guide to collagen-stimulating injectables.'],
      ['/non-surgical/sculptra-plla/nodules-complications/', 'PLLA nodules and complications', 'More detail on possible problems after PLLA treatment.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Warning signs and questions to ask before treatment.']
    ],
    blocks: [
      prose(`
        <p class="lead">Because biostimulators provoke a tissue response, unwanted reactions can occur. They may be mild and short-lived, or delayed and difficult to treat. This page is part of our <a href="/non-surgical/biostimulators/">biostimulators guide</a>.</p>
        <h2>Possible complications</h2>
        <ul><li>Bruising, swelling and tenderness.</li><li>Small lumps or nodules under the skin, sometimes appearing months later.</li><li>Granulomas, which are inflammatory lumps around the material.</li><li>Infection.</li><li>Uneven or lumpy results.</li><li>Vascular complications, in which product blocks or compresses a blood vessel and can damage skin; this is rare but urgent.</li><li>Allergic or unusual inflammatory reactions.</li></ul>
        <h2>Why nodules are a particular concern</h2>
        <p>Some nodules appear after a delay, are firm and do not disappear quickly. They may need treatment such as injections to reduce inflammation or, occasionally, surgical removal. Hyaluronidase does not dissolve these products.</p>
        <h2>Factors affecting risk</h2>
        <ul><li>How the product is prepared and diluted.</li><li>Depth and technique of injection.</li><li>Amount used and spacing between sessions.</li><li>The area treated, since breast skin and chest tissue differ from the face.</li><li>Aftercare and early recognition of a problem.</li></ul>
        <h2>Imaging</h2>
        <p>Injected material and resulting nodules may appear on mammograms or ultrasound. Tell imaging teams what was injected, when and where, and keep treatment records.</p>
        <h2>Questions to ask</h2>
        <ul><li>How common are nodules in your practice?</li><li>How do you treat them?</li><li>What is the plan if there is a vascular problem?</li></ul>
        <h2>Seek urgent care for</h2>
        <p>Severe pain, skin turning pale, grey, blue or dark, blistering, or rapidly worsening redness. Do not wait for a routine appointment if these occur.</p>`
      ),
      takeaway('Choose a trained clinician with a plan for complications. Read the <a href="/breast-enlargement-safety/">breast enlargement safety guide</a>.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/biostimulators/chest-skin-vs-breast-volume/',
    slug: 'chest-skin-vs-breast-volume',
    section: 'non-surgical',
    group: 'biostimulators',
    parentUrl: '/non-surgical/biostimulators/',
    parentTitle: 'Biostimulators',
    h1: 'Chest Skin Quality vs Breast Volume: What Biostimulators Can Reasonably Offer',
    cardTitle: 'Chest skin vs breast volume',
    seoTitle: 'Chest Skin Quality vs Breast Volume | Quantum Health',
    seoDescription: 'How treatments sold for the chest or décolletage differ from breast enlargement, and how to interpret claims about firmness and fullness.',
    bannerLead: 'A treatment that may affect chest-skin texture is not necessarily a treatment for breast volume or breast lift.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/biostimulators/', 'Biostimulators', 'The parent guide to collagen-stimulating treatments.'],
      ['/breast-enhancement-comparison/', 'Breast enhancement options compared', 'How evidence, risks and expected changes differ by option.'],
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'Surgical options designed to change breast volume.']
    ],
    blocks: [
      prose(`
        <p class="lead">Some clinics offer biostimulators for the décolletage or breast area. Understanding exactly what is being treated matters. This page is part of our guide to <a href="/non-surgical/biostimulators/">biostimulators</a>.</p>
        <h2>Chest skin vs breast tissue</h2>
        <ul><li><strong>Chest or décolletage skin:</strong> thin skin that can develop sun damage, wrinkles and crepiness.</li><li><strong>Breast tissue:</strong> fat and glandular tissue beneath the skin that gives breasts their volume and shape.</li></ul>
        <p>Treatments that change chest skin do not necessarily change breast volume.</p>
        <h2>What may be reasonable to expect</h2>
        <p>For chest skin, some people may see a modest improvement in texture or firmness over months, although evidence is limited and results vary. It is important to agree how any change will be assessed rather than relying on immediate photographs.</p>
        <h2>What is not reasonable to expect</h2>
        <ul><li>A reliable change in cup size.</li><li>A lift of significantly sagging breasts.</li><li>Permanent results from an absorbable product.</li></ul>
        <h2>Read the language carefully</h2>
        <p>Phrases such as “breast rejuvenation”, “breast lift” or “natural enhancement” may describe skin changes, not volume. Ask exactly what is being treated and what will be measured. A change in crepiness or light reflection is different from a change in breast tissue.</p>
        <h2>Other options for chest skin</h2>
        <p>Sun protection, skincare under medical advice and other in-clinic treatments may help skin quality, with different risk profiles. A dermatologist can help distinguish a skin concern from a concern about breast shape or volume.</p>
        <h2>If you want a change in volume</h2>
        <p>Options with evidence and regulation for volume include implants and fat transfer, which carry their own risks. Read <a href="/breast-enhancement-comparison/">breast enhancement options compared</a> before deciding.</p>
        <h2>Questions to ask</h2>
        <ul><li>Are you treating my skin or my breast tissue?</li><li>What will change, and how will we measure it?</li></ul>`
      ),
      takeaway('Chest-skin improvement is not breast enlargement. Be clear which one you are paying for.', 'info')
    ]
  })
];

/* ==========================================================================
   Sculptra and PLLA
   ========================================================================== */
const sculptraPlla = [
  page({
    url: '/non-surgical/sculptra-plla/what-is-plla/',
    slug: 'what-is-plla',
    section: 'non-surgical',
    group: 'sculptra-plla',
    parentUrl: '/non-surgical/sculptra-plla/',
    parentTitle: 'Sculptra and PLLA',
    h1: 'What Is Sculptra and Poly-L-Lactic Acid (PLLA)?',
    cardTitle: 'What PLLA is',
    seoTitle: 'What Is Sculptra and PLLA? | Quantum Health',
    seoDescription: 'An introduction to PLLA, the material in products such as Sculptra, how it is supplied, how it works and what it is used for.',
    bannerLead: 'PLLA is a biodegradable polymer used in some medical products and injectable treatments. It is not an instant filler or established breast-enlargement product.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/sculptra-plla/', 'Sculptra and PLLA', 'The parent guide to PLLA uses, limits and safety.'],
      ['/non-surgical/biostimulators/', 'Biostimulators', 'The broader category of collagen-stimulating products.'],
      ['/non-surgical/sculptra-plla/approvals-evidence/', 'Approvals and evidence', 'Why facial research does not establish breast use.']
    ],
    blocks: [
      prose(`
        <p class="lead">Poly-L-lactic acid (PLLA) is a biocompatible, biodegradable synthetic polymer. It is also used in some dissolvable sutures and medical devices. Sculptra is a well-known brand of injectable PLLA. This page is part of our <a href="/non-surgical/sculptra-plla/">Sculptra and PLLA guide</a>.</p>
        <h2>How it is supplied</h2>
        <p>The product is usually supplied as a powder containing tiny PLLA particles. It is mixed with sterile water, and sometimes local anaesthetic, shortly before injection. It is not a ready-made gel like many hyaluronic-acid fillers.</p>
        <h2>How it works</h2>
        <p>The particles are injected beneath the skin. They provoke a gradual tissue response that stimulates collagen production. Over many months, the particles are broken down and absorbed. Any improvement is thought to come mainly from the new collagen response.</p>
        <h2>What it is used for</h2>
        <p>In many places, PLLA is used for facial volume loss and some skin-contour concerns, including particular medical conditions affecting facial fat. Some clinicians also use it off-label for other areas, such as the body or chest, often in diluted forms.</p>
        <h2>Not an instant filler</h2>
        <p>Unlike hyaluronic-acid fillers, PLLA does not give a reliable immediate result. Initial swelling fades, and any intended change develops gradually over weeks to months.</p>
        <h2>Not reversible by enzymes</h2>
        <p>PLLA cannot be dissolved with hyaluronidase. This makes correct product identification, careful technique and a plan for complications particularly important.</p>
        <h2>Questions to ask</h2>
        <ul><li>Which brand and product are you using?</li><li>How is it prepared?</li><li>Is the use I am being offered approved or off-label?</li></ul>`
      ),
      takeaway('PLLA is a collagen stimulator used mainly in the face. It is not an established breast enlargement product.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/sculptra-plla/approvals-evidence/',
    slug: 'plla-approvals-evidence',
    section: 'non-surgical',
    group: 'sculptra-plla',
    parentUrl: '/non-surgical/sculptra-plla/',
    parentTitle: 'Sculptra and PLLA',
    h1: 'Sculptra and PLLA: Approvals, Evidence and the Breast',
    cardTitle: 'Approvals and evidence',
    seoTitle: 'Sculptra and PLLA: Approvals, Evidence and Breast Use | Quantum Health',
    seoDescription: 'What PLLA products are approved for, what research supports and why breast use is outside the established evidence.',
    bannerLead: 'Separate what is approved and studied from what is simply marketed. Facial PLLA evidence does not establish a breast-enlargement treatment.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/sculptra-plla/', 'Sculptra and PLLA', 'The parent guide to PLLA uses and safety.'],
      ['/non-surgical/biostimulators/approved-uses/', 'Biostimulator approved uses', 'Why approval is tied to a product, purpose and area.'],
      ['/research/', 'Research library', 'Study findings, limitations and external sources.']
    ],
    blocks: [
      prose(`
        <p class="lead">It helps to separate what is approved and studied from what is simply marketed. This page is part of our guide to <a href="/non-surgical/sculptra-plla/">Sculptra and PLLA</a>.</p>
        <h2>Approved uses</h2>
        <p>Approvals depend on country and product. Where approved, indications relate to specific facial uses, such as certain wrinkles or facial volume loss, and in some places treatment of facial fat loss in particular medical conditions. Check current approvals for the exact product in India rather than relying on overseas advertising.</p>
        <h2>The evidence</h2>
        <p>There is a reasonable body of studies for facial use, including some randomised trials that show improvement over months. For the breast or chest, published evidence is limited, often small studies or case series looking at skin appearance rather than measured breast volume.</p>
        <h2>What is not shown</h2>
        <ul><li>A safe, reliable increase in breast volume.</li><li>The long-term effect on breast tissue and screening.</li><li>Benefit compared with established options for volume or shape.</li></ul>
        <h2>Off-label use</h2>
        <p>Use in the breast is off-label in many settings. A clinician may offer it using their own judgement, but you should understand the evidence gap and the lack of standardised breast-specific protocols.</p>
        <h2>Questions to ask</h2>
        <ul><li>What studies support PLLA for the breast, and how large were they?</li><li>What was measured and for how long?</li><li>What are the risks specific to this area?</li></ul>
        <h2>Red flags</h2>
        <ul><li>Claims of guaranteed breast enlargement.</li><li>Before-and-after images with no time frame.</li><li>Pressure to pay for a package in advance.</li></ul>
        <p>Use the <a href="/research/">research library</a> to read source material alongside any claim made in a consultation.</p>`
      ),
      takeaway('Good evidence for facial PLLA does not extend to breast enlargement.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/sculptra-plla/preparation-technique/',
    slug: 'plla-preparation-technique',
    section: 'non-surgical',
    group: 'sculptra-plla',
    parentUrl: '/non-surgical/sculptra-plla/',
    parentTitle: 'Sculptra and PLLA',
    h1: 'How PLLA Is Prepared and Injected: Why Technique Matters',
    cardTitle: 'Preparation and technique',
    seoTitle: 'PLLA Preparation and Injection Technique | Quantum Health',
    seoDescription: 'The role of reconstitution, dilution and injection technique in PLLA treatment, and why these details are relevant to safety.',
    bannerLead: 'With PLLA, preparation and placement matter as much as the product itself. Breast-specific protocols are not standardised.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/sculptra-plla/', 'Sculptra and PLLA', 'The parent guide to PLLA uses, safety and limitations.'],
      ['/non-surgical/sculptra-plla/nodules-complications/', 'Nodules and complications', 'The problems that can follow PLLA treatment.'],
      ['/non-surgical/biostimulators/how-collagen-stimulation-works/', 'How collagen stimulation works', 'Why an intended response develops gradually.']
    ],
    blocks: [
      prose(`
        <p class="lead">With PLLA, how the product is prepared and placed matters as much as the product itself. This page is part of our guide to <a href="/non-surgical/sculptra-plla/">Sculptra and PLLA</a>.</p>
        <h2>Reconstitution and dilution</h2>
        <p>The powder is mixed with sterile water and sometimes anaesthetic. Different clinicians use different volumes. More dilute mixtures are often used for broader areas such as the body or chest. Product instructions describe a specific preparation, and following them is important. Some practitioners deviate based on experience, which may or may not be supported by evidence.</p>
        <h2>Rest time</h2>
        <p>The mixture is often left to hydrate before use. Skipping this step may affect how it behaves and may affect the evenness of particle distribution.</p>
        <h2>Injection technique</h2>
        <p>PLLA can be placed at different depths using needles or cannulas, in fan-like or crosshatch patterns. Placement that is too superficial can raise the chance of palpable or visible nodules. Technique should be appropriate to the exact product, area and treatment goal.</p>
        <h2>Massage</h2>
        <p>Practitioners often recommend massaging the treated area for several days to spread the product, but protocols vary. Follow the written advice from the clinician who knows the product and technique used.</p>
        <h2>Session spacing</h2>
        <p>Treatment is usually given in a series of sessions spaced weeks apart rather than all at once. Early repeat treatment before the tissue response is clear can add cost and risk without showing whether the initial treatment helped.</p>
        <h2>Why this matters for you</h2>
        <p>Because practice varies and breast-specific protocols are not standardised, outcomes depend heavily on the clinician’s training and judgement. Ask about their experience and the exact method proposed.</p>
        <h2>Questions to ask</h2>
        <ul><li>How do you prepare and dilute the product?</li><li>What depth and technique will you use?</li><li>How many sessions do you recommend, and why?</li><li>What aftercare do you advise?</li></ul>`
      ),
      takeaway('Technique affects safety, so ask for specifics and credentials.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/sculptra-plla/nodules-complications/',
    slug: 'plla-nodules-complications',
    section: 'non-surgical',
    group: 'sculptra-plla',
    parentUrl: '/non-surgical/sculptra-plla/',
    parentTitle: 'Sculptra and PLLA',
    h1: 'PLLA Nodules and Other Complications: What to Know',
    cardTitle: 'Nodules and complications',
    seoTitle: 'PLLA Nodules and Other Complications | Quantum Health',
    seoDescription: 'The main risks of PLLA injections, including delayed nodules, how they are managed and when to seek help.',
    bannerLead: 'PLLA is widely used in selected settings, but delayed nodules and other complications can occur and may be difficult to treat.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/sculptra-plla/', 'Sculptra and PLLA', 'The parent guide to PLLA uses, limits and safety.'],
      ['/non-surgical/biostimulators/risks/', 'Biostimulator risks', 'Nodules, inflammation and delayed reactions across the category.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Warning signs and questions to ask before treatment.']
    ],
    blocks: [
      prose(`
        <p class="lead">PLLA is widely used for selected indications, but complications can occur. Some are short-lived; others appear late and need specialist assessment. This page is part of our guide to <a href="/non-surgical/sculptra-plla/">Sculptra and PLLA</a>.</p>
        <h2>Common short-term effects</h2>
        <p>Swelling, bruising, redness and tenderness for days are common after injections. Temporary swelling can make the area look fuller at first, so it should not be judged as the final result.</p>
        <h2>Nodules</h2>
        <p>Nodules are firm lumps that can be felt and sometimes seen under the skin. They may appear weeks to months after treatment and can persist. Contributing factors may include superficial placement, product concentration and too much product in one place.</p>
        <h2>Granulomas</h2>
        <p>An inflammatory reaction can form granulomas, which are firm nodules containing immune cells. They can be slow to resolve and need assessment to distinguish them from infection or another breast or skin problem.</p>
        <h2>Infection and vascular problems</h2>
        <p>Infection and, rarely, blockage of a blood vessel can occur and need urgent medical care. Severe pain, skin colour change, fever, discharge or spreading redness should not wait for a routine review.</p>
        <h2>How nodules are managed</h2>
        <p>Options can include observation, massage if specifically advised, injections to reduce inflammation and, for persistent lumps, surgical excision. Hyaluronidase does not help because PLLA is not hyaluronic acid.</p>
        <h2>Imaging</h2>
        <p>PLLA and nodules may show on breast imaging. Tell radiology teams about the treatment and bring records of the product, dates and areas injected.</p>
        <h2>Reducing risk</h2>
        <ul><li>Choose an experienced, medically trained clinician.</li><li>Follow product-preparation instructions.</li><li>Avoid early repeat sessions.</li><li>Follow aftercare and report new symptoms promptly.</li></ul>`
      ),
      takeaway('Nodules can appear late and be hard to treat. Ask how your clinician manages them before you consent.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/sculptra-plla/realistic-expectations/',
    slug: 'sculptra-realistic-expectations',
    section: 'non-surgical',
    group: 'sculptra-plla',
    parentUrl: '/non-surgical/sculptra-plla/',
    parentTitle: 'Sculptra and PLLA',
    h1: 'Sculptra for the Chest or Breast: Setting Realistic Expectations',
    cardTitle: 'Realistic expectations',
    seoTitle: 'Sculptra for the Chest or Breast: Expectations | Quantum Health',
    seoDescription: 'What people may reasonably expect, and not expect, from PLLA injections in the chest or breast area, and the alternatives for those seeking volume.',
    bannerLead: 'Think of PLLA in the chest area as a possible skin-quality treatment, not a proven route to breast enlargement.',
    imageKey: 'sculptraBiostimulators',
    related: [
      ['/non-surgical/sculptra-plla/', 'Sculptra and PLLA', 'The parent guide to PLLA safety and evidence.'],
      ['/non-surgical/biostimulators/chest-skin-vs-breast-volume/', 'Chest skin vs breast volume', 'Why a skin-quality change is not added breast tissue.'],
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'Options designed to change breast volume.']
    ],
    blocks: [
      prose(`
        <p class="lead">Providers sometimes promote PLLA for the breast or chest. A realistic view of what it can and cannot do helps you judge those claims. This page is part of our guide to <a href="/non-surgical/sculptra-plla/">Sculptra and PLLA</a>.</p>
        <h2>What may be reasonable</h2>
        <ul><li>A modest, gradual improvement in skin texture or firmness on the upper chest in some people.</li><li>Results that develop over months and may need maintenance.</li></ul>
        <p>These are limited skin-quality goals, not a predictable reshaping of the breast. Evidence for chest and breast uses is much smaller than the facial evidence base.</p>
        <h2>What is unrealistic</h2>
        <ul><li>A cup-size increase.</li><li>A lift of significantly sagging breasts.</li><li>A fast or single-session result.</li><li>A permanent change.</li></ul>
        <h2>Why volume is unlikely</h2>
        <p>Breast volume comes from fat and glandular tissue. PLLA stimulates collagen mainly in the skin and just beneath it, which is not enough to create substantial breast volume. Initial fullness may simply be swelling or liquid carrier.</p>
        <h2>Costs</h2>
        <p>Because PLLA is generally given in a series and may need top-ups, costs can accumulate. Ask for an estimate over one to two years, what is included and what happens if you are dissatisfied.</p>
        <h2>Alternatives if you want volume</h2>
        <p>Implants and fat transfer have evidence and regulation for changing volume, with their own risks and downtime. Read about <a href="/surgical/breast-augmentation/">breast augmentation</a> and take time to compare options.</p>
        <h2>Alternatives if you want better skin</h2>
        <p>Sun protection, medically guided skincare and other evidence-based treatments for chest skin may be discussed with a dermatologist.</p>
        <h2>Questions to ask</h2>
        <ul><li>What will change in my chest, and how will we measure it?</li><li>What would success look like at six and twelve months?</li><li>What is the plan if I am unhappy?</li></ul>`
      ),
      takeaway('Think of PLLA on the chest as a skin treatment, not an enlargement treatment.', 'evidence')
    ]
  })
];

/* ==========================================================================
   Stem cells and regenerative medicine
   ========================================================================== */
const regenerativeMedicine = [
  page({
    url: '/non-surgical/regenerative-medicine/stem-cell-terms/',
    slug: 'stem-cell-terms',
    section: 'non-surgical',
    group: 'regenerative-medicine',
    parentUrl: '/non-surgical/regenerative-medicine/',
    parentTitle: 'Stem Cells and Regenerative Medicine',
    h1: 'Stem Cells and Regenerative Medicine: Key Terms Explained',
    cardTitle: 'Stem-cell terms explained',
    seoTitle: 'Stem Cells and Regenerative Medicine: Key Terms | Quantum Health',
    seoDescription: 'A plain-language guide to stem cells, regenerative medicine and the terms used in breast enhancement marketing.',
    bannerLead: '“Stem cell” is not a shorthand for a proven treatment. The exact cells, process and intended use matter.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/regenerative-medicine/', 'Stem cells and regenerative medicine', 'The parent guide to regenerative claims and evidence.'],
      ['/non-surgical/regenerative-medicine/marketing-claims-evidence/', 'Marketing claims vs evidence', 'How to assess “stem cell breast enlargement” claims.'],
      ['/glossary/', 'Glossary', 'Plain-language definitions for medical terms used across the site.']
    ],
    blocks: [
      prose(`
        <p class="lead">Stem-cell language is often used loosely. Understanding the terms helps you judge claims. This page is part of our guide to <a href="/non-surgical/regenerative-medicine/">stem cells and regenerative medicine</a>.</p>
        <h2>What a stem cell is</h2>
        <p>A stem cell can renew itself and can develop into other cell types. Different kinds differ in how flexible they are, how they are obtained and what evidence supports their use.</p>
        <h2>Main types</h2>
        <ul><li><strong>Embryonic stem cells:</strong> derived from early embryos; subject to ethical and legal restrictions and not used in cosmetic clinics.</li><li><strong>Induced pluripotent stem cells:</strong> adult cells reprogrammed in the laboratory; mainly a research tool.</li><li><strong>Adult or tissue stem cells:</strong> found in tissues such as bone marrow and fat. Mesenchymal stromal cells and adipose-derived stem or stromal cells belong in this broad group.</li></ul>
        <h2>Regenerative medicine</h2>
        <p>This field aims to repair or replace damaged tissue using cells, growth factors or biomaterials. Some uses are well established, such as bone-marrow transplants for certain blood diseases. Many other uses remain experimental.</p>
        <h2>Terms you may see</h2>
        <ul><li><strong>Stromal vascular fraction (SVF):</strong> a mixed cell portion from fat tissue that includes some stem cells.</li><li><strong>Cell-enriched fat grafting:</strong> fat grafts to which extra cells have been added.</li><li><strong>Exosomes and secretome:</strong> substances released by cells, sometimes marketed as “regenerative”.</li></ul>
        <h2>Why precision matters</h2>
        <p>A product labelled “stem cell” may contain few stem cells, or none, and the label does not tell you what it can do. Different processing methods yield different products and can be regulated differently.</p>
        <h2>Questions to ask</h2>
        <ul><li>What exactly is being used, and where does it come from?</li><li>Is it approved or authorised for this use?</li><li>What are the published results?</li></ul>`
      ),
      takeaway('“Stem cell” describes a type of cell, not a proven treatment.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/regenerative-medicine/marketing-claims-evidence/',
    slug: 'stem-cell-marketing-evidence',
    section: 'non-surgical',
    group: 'regenerative-medicine',
    parentUrl: '/non-surgical/regenerative-medicine/',
    parentTitle: 'Stem Cells and Regenerative Medicine',
    h1: '“Stem Cell Breast Enlargement”: Marketing Claims vs Evidence',
    cardTitle: 'Marketing claims vs evidence',
    seoTitle: 'Stem Cell Breast Enlargement: Marketing vs Evidence | Quantum Health',
    seoDescription: 'What clinics mean by stem cell breast augmentation, what the research actually shows and why regulators urge caution.',
    bannerLead: 'Most “stem cell breast enlargement” marketing describes fat transfer with an added claim, not a proven way to grow breast tissue.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/regenerative-medicine/', 'Stem cells and regenerative medicine', 'The parent guide to regenerative claims and safety.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer', 'How surgical fat transfer works and what its limits are.'],
      ['/non-surgical/regenerative-medicine/clinical-trials/', 'Clinical trials', 'How to check whether a study is legitimate and overseen.']
    ],
    blocks: [
      prose(`
        <p class="lead">Some clinics advertise “natural” or “stem cell” breast enlargement. These terms need careful reading. This page is part of our guide to <a href="/non-surgical/regenerative-medicine/">stem cells and regenerative medicine</a>.</p>
        <h2>What is often being offered</h2>
        <p>Usually, the procedure is fat transfer: fat is harvested, processed and injected. The “stem cell” element is the claim that the fat contains stem cells, or that stem cells have been added. Read about the underlying operation on our <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer page</a>.</p>
        <h2>What research shows</h2>
        <ul><li>Fat contains adipose-derived stem or stromal cells, but their role in graft survival is still under study.</li><li>Some studies of cell-enriched fat grafting report improved retention; others show no clear advantage.</li><li>Studies are generally small, short and varied in method.</li><li>Large, independent, long-term breast trials are lacking.</li></ul>
        <h2>What it does not show</h2>
        <ul><li>That stem cells alone can grow new breast tissue.</li><li>That a stem-cell injection can replace surgical enlargement.</li><li>That results are permanent or predictable.</li></ul>
        <h2>Regulatory caution</h2>
        <p>Regulators in several countries, including the US FDA, have warned that many stem-cell products marketed to patients are unapproved and may carry risks. Rules differ by country, so check the current position in India and ask what approval or authorisation applies.</p>
        <h2>How to read an advert</h2>
        <ul><li>“Stem cell” does not mean proven.</li><li>“Natural” does not mean safe.</li><li>Check whether it is fat transfer under another name.</li><li>Ask for study references specific to the breast.</li></ul>
        <h2>Questions to ask</h2>
        <ul><li>What are you adding to the fat, and why?</li><li>What evidence supports it?</li><li>Is this part of a registered research trial?</li></ul>`
      ),
      takeaway('Most “stem cell breast enlargement” is fat transfer with extra marketing.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/regenerative-medicine/cell-assisted-fat-grafting/',
    slug: 'cell-assisted-fat-grafting',
    section: 'non-surgical',
    group: 'regenerative-medicine',
    parentUrl: '/non-surgical/regenerative-medicine/',
    parentTitle: 'Stem Cells and Regenerative Medicine',
    h1: 'Cell-Assisted Fat Grafting: A Research Approach Explained',
    cardTitle: 'Cell-assisted fat grafting',
    seoTitle: 'Cell-Assisted Fat Grafting: Research Explained | Quantum Health',
    seoDescription: 'What cell-assisted lipotransfer is, why researchers study it, what early studies suggest and why it remains investigational.',
    bannerLead: 'Cell-assisted lipotransfer is being studied as a way to support fat-graft survival, but techniques and long-term data remain limited.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/regenerative-medicine/', 'Stem cells and regenerative medicine', 'The parent guide to evidence and regenerative claims.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'The procedure on which this research approach is based.'],
      ['/non-surgical/regenerative-medicine/marketing-claims-evidence/', 'Marketing claims vs evidence', 'Why “stem cell” language needs careful scrutiny.']
    ],
    blocks: [
      prose(`
        <p class="lead">Cell-assisted lipotransfer (CAL) is a research approach that mixes extra cells with a fat graft. It is not the same as a standard fat-transfer operation. This page is part of our guide to <a href="/non-surgical/regenerative-medicine/">stem cells and regenerative medicine</a>.</p>
        <h2>The idea</h2>
        <p>Transferred fat often loses volume because not all fat cells survive. In CAL, a portion of the harvested fat is processed to release a cell-rich fraction, such as stromal vascular fraction, which is mixed back into the graft. The hope is that these cells support blood-vessel growth and improve survival.</p>
        <h2>How it is done</h2>
        <p>Part of the harvested fat is treated, sometimes with enzymes, to separate cells. The cell-rich product is then combined with the remaining fat and injected. This adds time, equipment, handling and cost compared with standard fat grafting.</p>
        <h2>What studies suggest</h2>
        <p>Some small studies report better retention; others do not find a clear benefit. Differences in preparation and measurement make studies hard to compare. Long-term safety data, including imaging effects, remain limited.</p>
        <h2>Why it is still investigational</h2>
        <ul><li>Techniques are not standardised.</li><li>Regulators may treat processed cells as a drug or biological product.</li><li>The long-term effect on breast tissue and screening is not established.</li><li>Theoretical concerns about cell behaviour have prompted calls for careful long-term follow-up.</li></ul>
        <h2>What this means for you</h2>
        <p>If it is offered, ask whether it is part of a regulated clinical trial or standard practice, what ethics approval exists and what extra risks and costs apply. A research label should not be used to avoid clear consent or safety standards.</p>
        <h2>Questions to ask</h2>
        <ul><li>Why add cells in my case?</li><li>Is the process approved or authorised?</li><li>How will you follow me long term?</li></ul>`
      ),
      takeaway('Cell-assisted fat grafting is promising to some researchers but remains unproven and is best accessed through regulated trials.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/regenerative-medicine/safety-unproven-treatments/',
    slug: 'unproven-stem-cell-safety',
    section: 'non-surgical',
    group: 'regenerative-medicine',
    parentUrl: '/non-surgical/regenerative-medicine/',
    parentTitle: 'Stem Cells and Regenerative Medicine',
    h1: 'Safety Concerns With Unproven Stem Cell Treatments',
    cardTitle: 'Safety and unproven clinics',
    seoTitle: 'Safety Concerns With Unproven Stem Cell Treatments | Quantum Health',
    seoDescription: 'The risks of unapproved stem cell products and “stem cell tourism”, and how to protect yourself when considering a regenerative treatment.',
    bannerLead: 'Unproven cell products can carry real risks, including infection, poor-quality processing and unknown long-term effects.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/regenerative-medicine/', 'Stem cells and regenerative medicine', 'The parent guide to regenerative claims and evidence.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Questions, warning signs and safer decision-making.'],
      ['/non-surgical/regenerative-medicine/clinical-trials/', 'Clinical trials', 'How to check for legitimate research oversight.']
    ],
    blocks: [
      prose(`
        <p class="lead">Unproven treatments can carry real risks, including some that are not obvious before treatment. This page is part of our guide to <a href="/non-surgical/regenerative-medicine/">stem cells and regenerative medicine</a>.</p>
        <h2>Risks reported with unapproved cell products</h2>
        <ul><li>Infection from contaminated or improperly handled material.</li><li>Reactions to donor or animal-derived products.</li><li>Lumps, scarring and tissue damage at injection sites.</li><li>Unpredictable results.</li><li>Possible unknown long-term effects.</li><li>Delay in effective care.</li></ul>
        <h2>Particular concerns</h2>
        <ul><li><strong>Donor or non-autologous products:</strong> may contain contaminants or provoke immune reactions.</li><li><strong>Unregulated laboratories:</strong> can have variable processing, traceability and quality control.</li><li><strong>Claims of cure-all benefits:</strong> are a warning sign, especially where one product is sold for unrelated conditions.</li></ul>
        <h2>Stem-cell tourism</h2>
        <p>Travelling for cell treatment can leave you far from follow-up care. If complications arise, home doctors may not know what was injected or how it was prepared. Travel should not be used to bypass regulation, clear documentation or adequate aftercare.</p>
        <h2>Protecting yourself</h2>
        <ul><li>Ask for the product name, source, preparation process and regulatory status in writing.</li><li>Check whether the treatment is part of an approved clinical trial.</li><li>Be wary of high cost, pressure and guaranteed outcomes.</li><li>Make sure follow-up and emergency care are available.</li><li>Keep full records of the product and procedure.</li></ul>
        <h2>Imaging</h2>
        <p>Injected cell products or resulting lumps may affect breast imaging. Tell radiology teams about any previous injection, even when you do not know the exact product.</p>
        <h2>Questions to ask</h2>
        <ul><li>Where do the cells come from, and how are they processed?</li><li>Who is responsible if something goes wrong?</li></ul>`
      ),
      takeaway('Regenerative does not mean safe. Insist on documentation, oversight and a plan for follow-up.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/regenerative-medicine/clinical-trials/',
    slug: 'regenerative-clinical-trials',
    section: 'non-surgical',
    group: 'regenerative-medicine',
    parentUrl: '/non-surgical/regenerative-medicine/',
    parentTitle: 'Stem Cells and Regenerative Medicine',
    h1: 'Clinical Trials for Breast Regenerative Treatments: How to Judge One',
    cardTitle: 'Clinical trials',
    seoTitle: 'Clinical Trials for Breast Regenerative Treatments | Quantum Health',
    seoDescription: 'What a clinical trial is, how participation works, how to check a trial is legitimate and what questions to ask before joining.',
    bannerLead: 'A properly run clinical trial is the safest route to access a genuinely experimental treatment, but it should be open about uncertainty.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/regenerative-medicine/', 'Stem cells and regenerative medicine', 'The parent guide to regenerative claims and evidence.'],
      ['/research/', 'Research library', 'External studies, sources and evidence limitations.'],
      ['/non-surgical/regenerative-medicine/safety-unproven-treatments/', 'Safety and unproven treatments', 'Risks of unregulated products and clinics.']
    ],
    blocks: [
      prose(`
        <p class="lead">If you are interested in a new treatment, a properly run clinical trial is the safest route to access it. This page is part of our guide to <a href="/non-surgical/regenerative-medicine/">stem cells and regenerative medicine</a>.</p>
        <h2>What a trial is</h2>
        <p>A clinical trial tests a treatment in a structured way, under a written protocol and ethics oversight, to learn whether it is safe and effective. A trial is not simply a new treatment package given a research-sounding name.</p>
        <h2>Signs a trial is legitimate</h2>
        <ul><li>It is registered in a public registry. In India, check the Clinical Trials Registry of India; internationally, registries such as ClinicalTrials.gov exist.</li><li>It has ethics-committee approval.</li><li>It is run by a recognised hospital, university or research organisation.</li><li>It provides a detailed information sheet and consent form.</li><li>It does not charge you to participate in a way that feels like buying treatment.</li><li>It explains risks, uncertainties and what happens if you withdraw.</li></ul>
        <h2>Signs of a problem</h2>
        <ul><li>It is called a “trial” but sold like a treatment package.</li><li>There is no registry entry or ethics approval.</li><li>It guarantees results.</li><li>There is pressure to join quickly.</li></ul>
        <h2>What to ask</h2>
        <ul><li>What is the purpose and design of the trial?</li><li>What are the possible benefits and risks?</li><li>Will I be randomised, and might I receive a placebo or no treatment?</li><li>How long will I be followed?</li><li>Who pays for treatment of complications?</li><li>Can I withdraw at any time?</li></ul>
        <h2>Your rights and alternatives</h2>
        <p>Participation is voluntary, and you can withdraw without penalty. If you do not join a trial, discuss established options with a qualified clinician rather than assuming experimental care is your only choice. See <a href="/breast-enhancement-comparison/">breast enhancement options compared</a>.</p>`
      ),
      takeaway('A real trial is open about uncertainty and has oversight. Treat anything else with caution.', 'evidence')
    ]
  })
];

/* ==========================================================================
   Mastectomy and chest contouring surgery
   ========================================================================== */
const mastectomyChestContouring = [
  page({
    url: '/surgical/mastectomy-chest-surgery/why-chest-surgery-is-done/',
    slug: 'why-chest-surgery-is-done',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/mastectomy-chest-surgery/',
    parentLabel: 'Mastectomy and chest contouring surgery',
    h1: 'Why Chest Surgery Is Done: Mastectomy, Gender-Affirming Surgery and Male Chest Contouring',
    cardTitle: 'Why chest surgery is done',
    seoTitle: 'Why Chest Surgery Is Done | Quantum Health',
    seoDescription: 'An overview of the main reasons for chest and breast removal or reshaping surgery, and how contouring fits into each.',
    bannerLead: '“Chest surgery” covers very different needs. The right procedure depends on the medical reason, anatomy and the person’s goals.',
    imageKey: 'mastectomyChestSurgery',
    related: [
      ['/surgical/mastectomy-chest-surgery/', 'Mastectomy and chest contouring surgery', 'The parent guide to planning, techniques and recovery.'],
      ['/surgical/mastectomy-chest-surgery/types-of-mastectomy/', 'Types of mastectomy', 'How cancer and risk-reducing mastectomy approaches differ.'],
      ['/surgical/mastectomy-chest-surgery/gender-affirming-chest-surgery/', 'Gender-affirming chest surgery', 'An educational overview of masculinising chest surgery.']
    ],
    blocks: [
      prose(`
        <p class="lead">Chest surgery that removes or reshapes breast tissue is done for different reasons. This page is part of our guide to <a href="/surgical/mastectomy-chest-surgery/">mastectomy and chest contouring surgery</a>.</p>
        <h2>Main situations</h2>
        <ul><li><strong>Mastectomy for breast cancer or high risk:</strong> surgical removal of breast tissue as treatment or to reduce risk.</li><li><strong>Gender-affirming chest surgery:</strong> reshaping the chest to a more masculine contour, or other chest goals, for transgender and non-binary people.</li><li><strong>Gynaecomastia surgery:</strong> reducing enlarged male breast tissue.</li><li><strong>Other chest contouring:</strong> after major weight loss or in other circumstances.</li></ul>
        <h2>What contouring means</h2>
        <p>Contouring aims to create a smooth, balanced chest. It can involve removing glandular tissue, fat and extra skin, repositioning the nipple and using liposuction. Gynaecomastia surgery and gender-affirming surgery are not the same as cancer mastectomy, even where some of the techniques overlap.</p>
        <h2>Decisions are different in each case</h2>
        <p>For cancer, treatment decisions are led by the oncology and breast-surgery team, with contouring or reconstruction considered alongside. For gender-affirming surgery and gynaecomastia, decisions are personal and guided by medical assessment, anatomy and the desired chest shape.</p>
        <h2>Common themes</h2>
        <ul><li>Scars are unavoidable.</li><li>Nipple position and sensation are important considerations.</li><li>Recovery can involve dressings, a compression garment and activity limits.</li><li>Further revision is sometimes needed.</li><li>Breast health and screening needs may continue.</li></ul>
        <h2>Questions to ask</h2>
        <ul><li>What is the goal of this surgery in my case?</li><li>What are my options and the risks?</li><li>What will my chest look and feel like?</li><li>What follow-up or screening will I need afterwards?</li></ul>`
      ),
      takeaway('The same phrase, “chest surgery”, covers very different needs. Choose a surgeon and team experienced in yours.', 'info')
    ]
  }),

  page({
    url: '/surgical/mastectomy-chest-surgery/types-of-mastectomy/',
    slug: 'types-of-mastectomy',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/mastectomy-chest-surgery/',
    parentLabel: 'Mastectomy and chest contouring surgery',
    h1: 'Types of Mastectomy and What They Mean for Chest Shape',
    cardTitle: 'Types of mastectomy',
    seoTitle: 'Types of Mastectomy and Chest Shape | Quantum Health',
    seoDescription: 'The main types of mastectomy, how each affects the chest and what options exist afterwards, including reconstruction or a flat chest.',
    bannerLead: 'Mastectomy type is chosen for the diagnosis and treatment plan. Reconstruction and a flat chest are both valid choices afterwards.',
    imageKey: 'mastectomyChestSurgery',
    related: [
      ['/surgical/mastectomy-chest-surgery/', 'Mastectomy and chest contouring surgery', 'The parent guide to chest surgery and recovery.'],
      ['/surgical/mastectomy-chest-surgery/contouring-after-mastectomy/', 'Contouring after mastectomy', 'Flat closure, reconstruction and revision options.'],
      ['/surgical/breast-reduction/', 'Breast reduction', 'A different operation that reduces tissue while preserving breast shape.']
    ],
    blocks: [
      prose(`
        <p class="lead">If you or someone close to you faces mastectomy, understanding the terms can help with conversations. Treatment advice must always come from the care team. This page is part of our guide to <a href="/surgical/mastectomy-chest-surgery/">mastectomy and chest contouring surgery</a>.</p>
        <h2>Main types</h2>
        <ul><li><strong>Simple or total mastectomy:</strong> removal of breast tissue, nipple and areola, and usually some skin.</li><li><strong>Skin-sparing mastectomy:</strong> removes breast tissue, nipple and areola but keeps most skin, usually to allow reconstruction.</li><li><strong>Nipple-sparing mastectomy:</strong> removes breast tissue but keeps the nipple and areola in suitable cases; there is a risk to the nipple’s blood supply.</li><li><strong>Modified radical mastectomy:</strong> removes breast tissue and some lymph nodes.</li><li><strong>Risk-reducing or prophylactic mastectomy:</strong> done in people at very high risk.</li></ul>
        <p>Your team chooses based on diagnosis, tumour location and other clinical factors.</p>
        <h2>After mastectomy: choices</h2>
        <ul><li><strong>Immediate reconstruction:</strong> done at the same time as mastectomy.</li><li><strong>Delayed reconstruction:</strong> done later, sometimes after other treatment.</li><li><strong>No reconstruction, with a prosthesis:</strong> an external breast form worn in a bra.</li><li><strong>Flat closure:</strong> surgery aims for a smooth, flat chest.</li></ul>
        <h2>Factors that influence choice</h2>
        <p>The type of cancer, need for radiotherapy or chemotherapy, your health, personal preference and available expertise can all influence the plan. An option that is suitable for one person may not be suitable for another.</p>
        <h2>Emotional side</h2>
        <p>These decisions can be hard. Support from specialist nurses, counsellors and peer groups can help you understand the choices and how they may affect daily life.</p>
        <h2>Questions to ask</h2>
        <ul><li>Which type do you recommend and why?</li><li>What are my options for the chest afterwards?</li><li>How will radiotherapy affect them?</li></ul>`
      ),
      takeaway('Both reconstruction and a flat chest are valid choices. Your care team can explain the options for your situation.', 'info')
    ]
  }),

  page({
    url: '/surgical/mastectomy-chest-surgery/contouring-after-mastectomy/',
    slug: 'contouring-after-mastectomy',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/mastectomy-chest-surgery/',
    parentLabel: 'Mastectomy and chest contouring surgery',
    h1: 'Chest Contouring After Mastectomy: Flat Closure, Reconstruction and Revision',
    cardTitle: 'Contouring after mastectomy',
    seoTitle: 'Chest Contouring After Mastectomy | Quantum Health',
    seoDescription: 'Options for shaping the chest after mastectomy, including flat closure, revision of excess skin or scars, fat grafting and recovery.',
    bannerLead: 'After mastectomy, some people choose a smooth flat chest, reconstruction or later revision of contour and scars.',
    imageKey: 'mastectomyChestSurgery',
    related: [
      ['/surgical/mastectomy-chest-surgery/', 'Mastectomy and chest contouring surgery', 'The parent guide to chest surgery and recovery.'],
      ['/surgical/mastectomy-chest-surgery/types-of-mastectomy/', 'Types of mastectomy', 'How different operations affect later options.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer', 'How a surgeon may use fat grafting to refine selected contours.']
    ],
    blocks: [
      prose(`
        <p class="lead">After mastectomy, some people want improvement in how the chest looks or feels. There is no single right choice. This page is part of our guide to <a href="/surgical/mastectomy-chest-surgery/">mastectomy and chest contouring surgery</a>.</p>
        <h2>Aesthetic flat closure</h2>
        <p>Some people choose not to reconstruct. A surgeon may use techniques to create a smooth, flat chest wall, for example by removing excess skin and fat at the ends of the scar, sometimes called “dog ears”. Discuss this before mastectomy where possible, because planning at the time can help.</p>
        <h2>Revision of excess tissue or irregularity</h2>
        <p>Later, some people have contouring to correct bulges, loose skin or uneven areas. This may involve excision of tissue, liposuction or scar revision. The amount of improvement possible depends on scars, skin, remaining tissue and previous treatment.</p>
        <h2>Fat grafting</h2>
        <p>Small amounts of fat can be placed to soften irregular areas or improve contour in suitable cases. This has its own risks, including lumps, fat necrosis and changes on imaging. Read the <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer guide</a> for a wider explanation.</p>
        <h2>Reconstruction</h2>
        <p>For people who choose reconstruction, options include implants, tissue from your own body or a combination. The right approach depends on cancer treatment, health, tissue availability and personal goals.</p>
        <h2>Recovery</h2>
        <p>Typical recovery can involve dressings, possible drains, soreness, limited arm movement and lifting restrictions for a period. Specific advice must come from the surgical team because treatments and revisions differ.</p>
        <h2>Risks</h2>
        <p>Risks include bleeding, infection, fluid collection, wound-healing problems, numbness, chronic pain, scar irregularities and the need for revision.</p>
        <h2>Follow-up and screening</h2>
        <p>Keep follow-up with the cancer team. Ask whether any breast imaging is still needed for remaining tissue and report a new lump or skin change rather than assuming it is scar tissue.</p>
        <h2>Questions to ask</h2>
        <ul><li>Can you show examples of flat closure and reconstruction results?</li><li>What revision is likely?</li><li>How will the scar sit?</li></ul>`
      ),
      takeaway('There is no single right choice after mastectomy. Informed preference and a clear follow-up plan matter.', 'info')
    ]
  }),

  page({
    url: '/surgical/mastectomy-chest-surgery/gender-affirming-chest-surgery/',
    slug: 'gender-affirming-chest-surgery',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/mastectomy-chest-surgery/',
    parentLabel: 'Mastectomy and chest contouring surgery',
    h1: 'Gender-Affirming Chest Surgery: An Educational Overview',
    cardTitle: 'Gender-affirming chest surgery',
    seoTitle: 'Gender-Affirming Chest Surgery: An Overview | Quantum Health',
    seoDescription: 'A respectful, educational overview of masculinising chest surgery, including techniques, candidacy standards, recovery and risks.',
    bannerLead: 'Gender-affirming chest surgery reshapes the chest for people seeking a flatter or more masculine contour. Technique is tailored to anatomy and goals.',
    imageKey: 'mastectomyChestSurgery',
    related: [
      ['/surgical/mastectomy-chest-surgery/', 'Mastectomy and chest contouring surgery', 'The parent guide to chest surgery and recovery.'],
      ['/surgical/mastectomy-chest-surgery/why-chest-surgery-is-done/', 'Why chest surgery is done', 'The distinct reasons chest surgery may be considered.'],
      ['/breast-enlargement-safety/', 'Safety and warning signs', 'General questions for planning an operation and aftercare.']
    ],
    blocks: [
      prose(`
        <p class="lead">Gender-affirming chest surgery, sometimes called top surgery, reshapes the chest for people who want a more masculine or flatter contour. This page is educational and respects each person’s identity and choices.</p>
        <h2>Assessment and standards</h2>
        <p>Carefully planned care usually includes assessment by a surgeon and sometimes other clinicians, in line with recognised guidance such as the World Professional Association for Transgender Health Standards of Care. Requirements vary by place, so ask what applies to you and whether the team has experience in gender-affirming care.</p>
        <h2>Common techniques</h2>
        <ul><li><strong>Double incision with nipple grafts:</strong> often suitable for larger chests; excess tissue and skin are removed through lower-chest incisions, and nipples may be resized and placed as grafts.</li><li><strong>Periareolar or circumareolar technique:</strong> for smaller chests with good skin elasticity; scars lie around the areola.</li><li><strong>Keyhole technique:</strong> for very little tissue; a small incision at the areola edge, often with liposuction.</li></ul>
        <p>The best choice depends on chest size, skin quality, nipple position and your goals.</p>
        <h2>Recovery</h2>
        <p>Expect dressings or a compression garment, possible drains, swelling and restrictions on lifting and arm movement for several weeks. Your surgeon will give a personalised aftercare plan and timeline for work, exercise and scar care.</p>
        <h2>Risks</h2>
        <ul><li>Bleeding and haematoma.</li><li>Infection.</li><li>Nipple-graft problems, including partial loss or colour changes.</li><li>Loss of nipple sensation, which may be permanent.</li><li>Contour irregularities, scarring and seroma.</li><li>Revision surgery.</li></ul>
        <h2>Health after surgery</h2>
        <p>Some breast tissue can remain. Ask your doctor what screening recommendations apply to you, based on the operation, family history and other risk factors.</p>
        <h2>Questions to ask</h2>
        <ul><li>Which technique suits my chest and why?</li><li>How many of these operations do you perform?</li><li>What are the chances of revision?</li><li>Can I see results across a range of body types?</li></ul>`
      ),
      takeaway('Choose an experienced surgeon and a team that supports you before and after surgery.', 'info')
    ]
  }),

  page({
    url: '/surgical/mastectomy-chest-surgery/gynaecomastia/',
    slug: 'gynaecomastia',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/mastectomy-chest-surgery/',
    parentLabel: 'Mastectomy and chest contouring surgery',
    h1: 'Gynaecomastia: Enlarged Male Breast Tissue, Causes and Surgical Options',
    cardTitle: 'Gynaecomastia',
    seoTitle: 'Gynaecomastia: Causes and Surgical Options | Quantum Health',
    seoDescription: 'What gynaecomastia is, common causes, when to see a doctor, how surgery works and what recovery involves.',
    bannerLead: 'Gynaecomastia is common and usually harmless, but a new or one-sided change should be assessed before planning cosmetic surgery.',
    imageKey: 'mastectomyChestSurgery',
    related: [
      ['/surgical/mastectomy-chest-surgery/', 'Mastectomy and chest contouring surgery', 'The parent guide to related chest-contouring procedures.'],
      ['/surgical/mastectomy-chest-surgery/why-chest-surgery-is-done/', 'Why chest surgery is done', 'The distinct medical and personal reasons chest surgery is considered.'],
      ['/surgical/breast-reduction/', 'Breast reduction', 'A different operation for reducing breast tissue and weight.']
    ],
    blocks: [
      prose(`
        <p class="lead">Gynaecomastia is enlargement of the glandular tissue of the male breast. It is common and usually harmless, but it can cause discomfort or distress. It is included here as a distinct chest-contouring topic, not as a cancer mastectomy.</p>
        <h2>True gynaecomastia vs fat</h2>
        <p>True gynaecomastia involves a firm, rubbery disc of glandular tissue beneath the nipple. Pseudogynaecomastia is excess fat on the chest without glandular growth, often linked to weight. Some people have both, which affects the treatment plan.</p>
        <h2>Common causes</h2>
        <ul><li>Hormonal changes in puberty, which often settle within a couple of years.</li><li>Ageing.</li><li>Medicines, including some used for heart conditions, ulcers, prostate conditions and other treatments.</li><li>Anabolic steroids and some recreational substances.</li><li>Liver, kidney or thyroid disease.</li><li>Some tumours, which are uncommon.</li></ul>
        <h2>When to see a doctor</h2>
        <p>See a doctor if you have a hard lump on one side, skin changes, nipple discharge or retraction, or pain. Male breast cancer is rare but should not be missed. A clinician can look for causes and arrange tests when needed.</p>
        <h2>Non-surgical management</h2>
        <p>Some cases resolve on their own or after a cause is addressed. Medical treatments are sometimes used in selected situations. Weight management can help where excess chest fat is a major factor, but it does not remove true glandular tissue.</p>
        <h2>Surgical options</h2>
        <ul><li><strong>Liposuction:</strong> removes fatty tissue through small incisions.</li><li><strong>Gland excision:</strong> removes glandular tissue, often through a small cut at the edge of the areola.</li><li><strong>Combination treatment:</strong> many people need both.</li><li><strong>Skin removal:</strong> may be needed for larger cases with loose skin.</li></ul>
        <h2>Recovery and risks</h2>
        <p>Expect swelling, bruising and a compression garment for a few weeks, with activity limits as advised. Risks include bleeding, haematoma, infection, contour irregularities, asymmetry, changes in nipple sensation and recurrence if the cause persists.</p>
        <h2>Questions to ask</h2>
        <ul><li>What is causing my gynaecomastia?</li><li>Do I need tests?</li><li>Which procedure do you recommend?</li></ul>`
      ),
      takeaway('Find the cause first. Surgery works best once the cause and the tissue involved are understood.', 'info')
    ]
  })
];

module.exports = {
  batchFourNonsurgicalSubpages: biostimulators.concat(sculptraPlla, regenerativeMedicine),
  batchFourSurgicalSubpages: mastectomyChestContouring
};
