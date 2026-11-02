'use strict';

/*
 * "Trending Options For Non-Surgical Breast Enlargement" — the page the homepage
 * hero button leads to. It collects the five treatments clinics market most often
 * (dermal fillers, Sculptra, PDO threads, PRP and stem-cell approaches) and, for
 * each one, states what it is, why it is popular, what the evidence shows and what
 * the main risks are. Nothing here is presented as a recommendation, and no outcome
 * is promised; every entry links to its own in-depth guide.
 */

const { siteImages, topicImage } = require('./site-images');

function page(data) {
  const image = siteImages[data.imageKey];
  if (!image) throw new Error('Unknown image for trending-options page: ' + data.imageKey);
  const { imageKey, ...rest } = data;
  return {
    ...rest,
    bannerImage: image.src,
    bannerWidth: image.width,
    bannerHeight: image.height
  };
}

const trendingOptionsPage = page({
  url: '/non-surgical/trending-options/',
  slug: 'trending-options',
  section: 'non-surgical',
  group: 'nonsurgical',
  h1: 'Trending Options For Non-Surgical Breast Enlargement',
  cardTitle: 'Trending options: fillers, Sculptra, threads, PRP, AAA stem cell',
  seoTitle: 'Trending Options For Non-Surgical Breast Enlargement | Quantum Health',
  seoDescription: 'Dermal fillers, Sculptra, PDO threads, PRP and AAA stem cell protocols are the most-advertised non-surgical breast enlargement options. Here is what each claims and what the evidence shows.',
  bannerLead: 'The five treatments advertised most often for non-surgical breast enlargement, explained one by one: what each is approved to do, what clinics claim, and what the published evidence supports.',
  imageKey: 'nonSurgicalSafety',
  related: [
    ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery: what works', 'An evidence scorecard covering more than 20 popular methods.'],
    ['/non-surgical/questions-red-flags/', 'Questions to ask, and red flags', 'What to check before booking any non-surgical breast treatment.'],
    ['/surgical/breast-augmentation/', 'Breast augmentation: implants and fat transfer', 'The two established routes to a measurable, lasting increase in volume.']
  ],
  blocks: [
    {
      type: 'prose',
      id: 'trending-intro',
      html:
        '<p class="lead">Ask about a “no-surgery” way to increase breast size and the same five treatments come up, in clinics and on social media, almost every time: dermal fillers, Sculptra (poly-L-lactic acid), PDO threads, PRP (platelet-rich plasma, often sold as a “vampire breast lift”) and AAA stem cell or “regenerative” protocols.</p>' +
        '<p>Each is genuinely popular. Popularity is not evidence. A treatment trends because it is marketable — quick to advertise, framed as natural, reversible or “just an injection” — and because a consultation room can offer it on the same afternoon. None of these five has an approved indication for increasing breast size, and none has been shown in published research to produce a reliable, lasting increase in breast volume.</p>' +
        '<p>This page sets out what each option actually is, how it is being sold, where the evidence stands and what can go wrong, then links to the full guide for each one. It is written so that a claim in an advertisement can be compared with a claim in a study. For a method-by-method verdict on more than 20 approaches, including bras, creams, supplements and exercises, read the <a href="/breast-enlargement-without-surgery/">evidence guide</a>; for the underlying terms, see <a href="/non-surgical/reading-the-evidence/">how to read the evidence on non-surgical breast treatments</a>.</p>' +
        '<p>If a measurable, lasting increase in breast volume is the goal, the two established routes are implants and autologous fat transfer — both surgical, both with their own recovery and long-term commitments. That comparison is set out on the <a href="/breast-enhancement-comparison/">surgical versus non-surgical</a> page, and <a href="/non-surgical/appearance-vs-volume/">appearance versus volume</a> explains why so many non-surgical results are temporary.</p>'
    },
    {
      type: 'prose',
      html:
        '<nav class="source-index" aria-label="Trending options on this page"><a href="#trending-dermal-fillers">1. Dermal fillers</a> · <a href="#trending-sculptra">2. Sculptra and biostimulators</a> · <a href="#trending-pdo-threads">3. PDO threads</a> · <a href="#trending-prp">4. PRP</a> · <a href="#trending-stem-cells">5. AAA stem cell</a> · <a href="#trending-comparison">Side-by-side view</a> · <a href="#trending-before-you-book">Before you book</a> · <a href="#trending-faq">Questions</a></nav>'
    },
    {
      type: 'notice',
      icon: 'safety',
      title: 'What the regulators actually say',
      text: 'The U.S. FDA recommends against using dermal fillers — or any injectable filler — to increase breast size, and has warned that injectable silicone used for body contouring has caused disfigurement, blocked blood vessels and deaths, with problems sometimes appearing years later and no approved method of removal. Sculptra (poly-L-lactic acid), PDO threads, PRP and stem-cell products are authorised for particular, specified indications that do not include breast enlargement; approval for the face does not extend to the breast. Where a clinic tells you a product is “approved”, ask which product, in which country, and for which exact indication. See <a href="/non-surgical/regulatory-status/">approved use versus off-label use</a>.'
    },
    {
      type: 'split',
      id: 'trending-dermal-fillers',
      alt: true,
      eyebrow: 'Trending option 1 · Injectable gel',
      heading: 'Dermal fillers (“breast filler”)',
      media: topicImage('dermalFillers', { alt: 'Educational illustration about breast dermal fillers' }),
      script: 'Marketed as the fastest way to add curve without a scalpel. It is also the option regulators warn against most explicitly.',
      body:
        '<p><strong>What it is.</strong> Dermal fillers are injectable gels used for specified aesthetic indications, most often in the face. The best-known is hyaluronic acid; others include calcium hydroxylapatite. “Breast filler” means injecting sizeable volumes of such a product — sometimes unlicensed substances such as liquid silicone or industrial oils — into or behind breast tissue. See <a href="/non-surgical/hyaluronic-acid-fillers/">what hyaluronic acid fillers are approved for</a> and <a href="/non-surgical/why-breast-fillers-differ/">why the breast is not like the face</a>.</p>' +
        '<p><strong>Why it trends.</strong> It is fast, needs no operating theatre, and the before-and-after photograph is immediate. Clinics can offer “a cup size, no downtime” in a single appointment.</p>' +
        '<p><strong>Where the evidence stands.</strong> No filler is licensed for breast enlargement, and no peer-reviewed study establishes that filler injection is a safe way to increase breast volume. The licensed doses used in the face are a small fraction of what a breast-volume change would require, and safety at breast-scale volumes has simply not been tested. The FDA’s position — that fillers should not be used to increase breast size — reflects that absence of evidence plus a serious complication profile.</p>' +
        '<p><strong>Main risks.</strong> Lumps and nodules, infection, inflammation, filler migration and asymmetry; pain and firmness that can persist; vascular occlusion and tissue death in the worst cases; granulomas and chronic inflammation with permanent or non-absorbable materials such as silicone; and interference with mammography and ultrasound, where injected material can mimic or hide disease. Removal is not straightforward: hyaluronidase dissolves only hyaluronic acid, and much of what has been injected into breasts cannot be dissolved at all — it is addressed by surgery, sometimes repeatedly. Read <a href="/non-surgical/filler-complications/">complications of breast filler and how they are treated</a> and <a href="/non-surgical/fillers-and-screening/">breast fillers and screening</a>.</p>' +
        '<p><strong>Bottom line.</strong> The most-advertised non-surgical option is also the one with the clearest regulatory warning against it.</p>',
      link: { label: 'Full guide: breast dermal fillers — safety, evidence and alternatives', href: '/non-surgical/dermal-fillers/' }
    },
    {
      type: 'split',
      id: 'trending-sculptra',
      eyebrow: 'Trending option 2 · Collagen stimulator',
      heading: 'Sculptra and biostimulators (poly-L-lactic acid)',
      media: topicImage('sculptraBiostimulators', { alt: 'Educational illustration about Sculptra and biostimulators' }),
      script: 'Sold as “your own collagen, gradually”. The collagen part is real; the breast-volume claim is not established.',
      body:
        '<p><strong>What it is.</strong> Sculptra contains poly-L-lactic acid (PLLA) microparticles. Injected into the dermis or deeper tissue, it provokes a controlled inflammatory response that lays down collagen over weeks to months. It is a biostimulator rather than a filler gel: it does not occupy volume itself in the way hyaluronic acid does, and it cannot be dissolved with hyaluronidase. Other products in the same marketing bucket include calcium hydroxylapatite and the broader group described on our <a href="/non-surgical/biostimulators/">biostimulators</a> page.</p>' +
        '<p><strong>Why it trends.</strong> “Natural collagen-building” is an appealing story, and the gradual onset is presented as more subtle than filler or surgery. A series of sessions also suits repeat clinic visits.</p>' +
        '<p><strong>Where the evidence stands.</strong> PLLA is authorised for specific, labelled indications — mainly facial volume loss and skin laxity, with a documented history in correcting lipoatrophy. Its use to enlarge breasts is off-label in every jurisdiction whose guidance this site cites, and there is no clinical trial programme establishing that injecting PLLA into the breast produces a safe, predictable, lasting increase in volume. What is documented is the product’s behaviour in tissue: a collagen response driven by inflammation.</p>' +
        '<p><strong>Main risks.</strong> Nodules and granulomas are the characteristic complication of PLLA and are commoner where larger volumes are used; they can be palpable, tender, visible and persistent, and in the breast a lump may require imaging or biopsy to sort out. Reactions can be delayed, and because the material is not dissolvable, treatment is observation, steroids, needling or surgical excision rather than simple reversal. See <a href="/non-surgical/sculptra-plla/nodules-complications/">Sculptra nodules and complications</a>.</p>' +
        '<p><strong>Bottom line.</strong> A real pharmacological effect, in a body site where it has not been studied for this purpose and where a nodule is a serious problem.</p>',
      link: { label: 'Full guide: Sculptra and PLLA — uses, safety and evidence', href: '/non-surgical/sculptra-plla/' }
    },
    {
      type: 'split',
      id: 'trending-pdo-threads',
      alt: true,
      eyebrow: 'Trending option 3 · Absorbable sutures',
      heading: 'PDO threads (“thread breast lift”)',
      media: topicImage('threadProcedures', { alt: 'Educational illustration about thread-based breast procedures' }),
      script: 'Thread material is genuinely absorbable. The support it gives a heavy breast is the part that is not established.',
      body:
        '<p><strong>What it is.</strong> PDO (polydioxanone) threads are biodegradable surgical sutures. In aesthetic practice, barbed or “cog” threads are placed under the skin to give a temporary mechanical lift, mostly in the face and neck; smooth threads — <a href="/non-surgical/mono-threads/">mono threads</a> — are used to provoke a mild collagen response. “Breast threading” adapts the same materials and claims a lift, projection or perky position for the breast.</p>' +
        '<p><strong>Why it trends.</strong> It is marketed as a “lunchtime lift” for breasts, priced and positioned against surgery, with no scalpel and no implant.</p>' +
        '<p><strong>Where the evidence stands.</strong> Threads are sutures with product-specific indications; they are designed for temporary support in thin, mobile facial tissue, not for carrying the weight of breast tissue. There is no published evidence that thread procedures produce lasting breast elevation or added volume, and no licensed breast-enlargement indication. A lift, in surgical terms, means removing skin and repositioning tissue — the difference is set out in <a href="/non-surgical/threads-vs-breast-lift/">breast threads versus a surgical breast lift</a>. What threads can do is create a short-lived mechanical effect while the suture holds, after which they are absorbed.</p>' +
        '<p><strong>Main risks.</strong> Visibility or palpability of the thread, thread extrusion or migration, asymmetry, dimpling and contour irregularity, infection, granuloma and tearing of the tissue the barbs grip — the breast moves, and barbs that hold in the face do not behave the same way in tissue that shifts with posture, gravity and activity. Pain and puckering on movement are reported. See <a href="/non-surgical/breast-threads-risks/">risks of breast thread procedures</a> and <a href="/non-surgical/mono-threads-risks/">mono thread risks and who should avoid them</a>.</p>' +
        '<p><strong>Bottom line.</strong> A temporary mechanical effect from an absorbable suture, sold as a lift — and not a way to add volume.</p>',
      link: { label: 'Full guide: breast thread procedures — uses and limitations', href: '/non-surgical/breast-threads/' }
    },
    {
      type: 'split',
      id: 'trending-prp',
      eyebrow: 'Trending option 4 · Platelet concentrate',
      heading: 'PRP (platelet-rich plasma) and the “vampire breast lift”',
      media: topicImage('prp', { alt: 'Educational illustration about platelet-rich plasma and the breast' }),
      script: 'Your own blood, so “natural” — which is why the claims need checking more carefully, not less.',
      body:
        '<p><strong>What it is.</strong> Blood is drawn from you, spun in a centrifuge to concentrate platelets, and the resulting plasma is injected back into tissue. Platelets release growth factors, which is the basis for investigating PRP in wound healing, tendon pain and hair loss. Our guide to <a href="/non-surgical/what-is-prp/">how PRP is prepared</a> explains why two “PRP” products can be entirely different preparations.</p>' +
        '<p><strong>Why it trends.</strong> The “vampire breast lift” pitch is fullness and firmness using your own cells, with no implant and no foreign material. It is quick to do and easy to brand, and kits are sold to clinics as a complete protocol.</p>' +
        '<p><strong>Where the evidence stands.</strong> Research on PRP in the breast is largely about how it behaves alongside surgery — graft retention after fat transfer, wound healing — not about enlarging a breast on its own. There is no robust trial showing a reproducible increase in breast volume from PRP injection alone, and no approved indication for breast enlargement. Any firmness or fullness described in anecdotal reports is typically modest and temporary, and the preparation, activation and injection technique vary so widely between clinics that results are not comparable. Read <a href="/non-surgical/prp-claims/">evaluating PRP breast claims</a> for the difference between researching a treatment and establishing one.</p>' +
        '<p><strong>Main risks.</strong> Injection-site pain, swelling, bruising and tenderness; nodules and calcification that can later appear on imaging; infection if the procedure is not performed with proper sterile technique; and the risk of being sold a product that is not what its name claims — there is no standard, regulated definition of “PRP” for this use. Autologous material removes the risk of allergic reaction to a foreign substance; it does not remove the risks of needle trauma, contamination or an unproven product. See <a href="/non-surgical/prp-safety/">is PRP safe?</a>.</p>' +
        '<p><strong>Bottom line.</strong> An area of legitimate research interest, marketed as an established enlargement method it has not yet been shown to be.</p>',
      link: { label: 'Full guide: PRP and breast enhancement — evidence explained', href: '/non-surgical/prp/' }
    },
    {
      type: 'split',
      id: 'trending-stem-cells',
      alt: true,
      eyebrow: 'Trending option 5 · AAA stem cell protocol',
      heading: 'AAA stem cell and “regenerative” breast enlargement',
      media: topicImage('nonSurgicalOverview', { alt: 'Educational illustration about stem-cell and regenerative breast treatments' }),
      script: 'The label is the marketing. Ask what is actually in the syringe, and how it was processed.',
      body:
        '<p><strong>What it is.</strong> An umbrella for several different things. Adipose-derived stem or stromal cells (ASC) and stromal vascular fraction (SVF) are cell mixtures obtained from fat tissue, sometimes added to a fat graft in “cell-assisted lipotransfer” (CAL). Exosomes and “secretome” products are substances released by cells. “AAA stem cell” and similar brand names attach stem-cell language to a particular clinic protocol — the name is a marketing label, not a licensed product with its own published indication. Our glossary page on <a href="/non-surgical/regenerative-medicine/stem-cell-terms/">stem-cell and regenerative terms</a> separates these.</p>' +
        '<p><strong>Why it trends.</strong> It sounds like the science has caught up with surgery: grow your own tissue, no implant, no donor site morbidity, “natural” results. It also justifies a premium price.</p>' +
        '<p><strong>Where the evidence stands.</strong> Basic research on these cells is real and active, and fat-graft biology is one of the areas where enrichment is being studied. That is a long way from an established enlargement treatment. A systematic review of cell-enriched fat grafting for primary cosmetic breast augmentation found the approach counter-productive for most women seeking aesthetic augmentation, and trial evidence for “stem cell breast enlargement” protocols as marketed is absent. Regulators, including the FDA, warn that many products promoted as stem-cell therapies are unapproved and investigational. If a protocol is offered as a treatment rather than a study, ask whether a registered clinical trial exists for exactly that product and indication — see <a href="/non-surgical/regenerative-medicine/clinical-trials/">how to check a trial</a> and <a href="/non-surgical/regenerative-medicine/marketing-claims-evidence/">marketing claims versus evidence</a>.</p>' +
        '<p><strong>Main risks.</strong> Uncertain content and potency — a product labelled “stem cell” may contain few such cells, or none, and processing varies. Cell and tissue handling that falls outside regulated manufacturing carries infection and contamination risk. Injected or grafted material can produce oil cysts, calcification, nodules and asymmetry that alter breast imaging for years. The long-term behaviour of added cell products in breast tissue, including anything relevant to cancer risk and cancer surveillance, is not established. Unproven regenerative treatments also carry real harms described in <a href="/non-surgical/regenerative-medicine/safety-unproven-treatments/">safety of unproven treatments</a>. And note that the procedure that supplies the cells usually involves liposuction, which is surgery.</p>' +
        '<p><strong>Bottom line.</strong> The newest-sounding option is the one whose evidence is furthest from routine clinical use — and whose “non-surgical” label is least accurate.</p>',
      link: { label: 'Full guide: stem cells and regenerative medicine', href: '/non-surgical/regenerative-medicine/' }
    },
    {
      type: 'table',
      id: 'trending-comparison',
      alt: true,
      eyebrow: 'Side-by-side view',
      heading: 'What each trending option is, and where its evidence stops',
      lead: 'Read the last column first. “Marketed for breast enlargement” and “approved or established for breast enlargement” are different statements.',
      head: ['Trending option', 'What it is made of', 'What is claimed', 'Approved or established for breast volume?'],
      rows: [
        ['<a href="#trending-dermal-fillers">Dermal fillers</a>', 'Hyaluronic acid or calcium hydroxylapatite gel; in unlicensed settings, silicone or oils', 'Immediate cup-size increase, no surgery', 'No. The FDA advises against using fillers to increase breast size'],
        ['<a href="#trending-sculptra">Sculptra / PLLA</a>', 'Poly-L-lactic acid microparticles that trigger collagen formation', 'Gradual, “natural” collagen-based fullness', 'No. Authorised for specified facial indications, not the breast'],
        ['<a href="#trending-pdo-threads">PDO threads</a>', 'Absorbable polydioxanone sutures, barbed or smooth', 'A lift and projection without an implant', 'No. Temporary mechanical support; no evidence of lasting breast elevation'],
        ['<a href="#trending-prp">PRP</a>', 'Your own concentrated platelet plasma', 'Fuller, firmer breasts using your own cells', 'No. Studied mainly alongside surgery, not as enlargement'],
        ['<a href="#trending-stem-cells">AAA stem cell</a>', 'ASC/SVF cell mixtures, exosomes or branded regenerative products', 'Tissue growth that replaces surgery', 'No. Investigational, and often involves liposuction to obtain the cells']
      ],
      note: 'For completeness: the approaches with evidence for a real, lasting increase in breast volume are implants and autologous fat transfer — both surgical. Creams, pills, massage, pumps and exercises are assessed in the <a href="/breast-enlargement-without-surgery/">evidence guide</a>, and <a href="/non-surgical/treatments-at-a-glance/">treatments at a glance</a> separates procedures that add volume from those that change appearance.'
    },
    {
      type: 'steps',
      id: 'trending-before-you-book',
      eyebrow: 'Before you book',
      heading: 'Six things to establish before paying for any trending treatment',
      lead: 'A treatment that survives these six questions is worth a clinical conversation. One that does not is worth walking away from.',
      items: [
        { title: 'The exact product, by name', text: 'Ask for the manufacturer, batch and authorised indications, in writing. “Stem cell”, “PRP” and “filler” are categories, not products, and the category label tells you nothing about what will be injected.' },
        { title: 'Approval for this site, not just for injection', text: 'A licence for the face, hands or lipoatrophy does not authorise breast use. Confirm what the product is approved for in your country, and who regulates it.' },
        { title: 'Published evidence for this indication', text: 'Ask for a study on breast enlargement with this product, in this dose, in people like you — not facial data, not a case series of ten, not a testimonial video.' },
        { title: 'How the clinician will manage complications', text: 'Who treats a nodule, an infection or a vascular problem after hours; is there an named surgical service for removal; and what has already been done for previous patients with this complication.' },
        { title: 'Reversibility and imaging', text: 'Find out whether the material can be dissolved or removed, how long it stays, and how it will appear on future mammography or ultrasound. Disclose any injection to whoever does your imaging.' },
        { title: 'Your own baseline and follow-up plan', text: 'An examination before treatment, documented findings, and a defined review point, so a change you notice later is a fact rather than a memory. Suitability, including pregnancy, breastfeeding, implants, family history and existing breast disease, needs an individual assessment — see <a href="/breast-enlargement-safety/">candidacy and safety</a>.' }
      ],
      media: topicImage('consultation-illustrative', { alt: 'Illustration of a patient discussing questions with a healthcare professional' })
    },
    {
      type: 'faq',
      id: 'trending-faq',
      alt: true,
      eyebrow: 'Common questions',
      heading: 'Trending non-surgical breast enlargement — questions',
      items: [
        { q: 'Which of these trending options works best?', a: '<p>None is approved or established for increasing breast volume, so there is no “best” to choose from. They differ mainly in what they are made of and what can go wrong. If your goal is a measurable, lasting change in size, the established routes are implants and fat transfer, both surgical; if your goal is appearance — cleavage, shape in clothing, firmness — <a href="/non-surgical/appearance-vs-volume/">appearance versus volume</a> and <a href="/non-surgical/bras-posture-clothing/">bras, posture and clothing</a> explain what changes without injection.</p>' },
        { q: 'A clinic says its treatment is “FDA approved”. What should I check?', a: '<p>Three things: which specific product, approved under which reference, and for which exact indication. Approval is granted to a product for a stated use, not to a technique or a brand name. Approval for facial injection does not extend to the breast. Ask for the paperwork and check it against the regulator’s own listing — see <a href="/non-surgical/regulatory-status/">approved use versus off-label use</a>.</p>' },
        { q: 'Isn’t PRP or my own stem cells safer because it’s from my body?', a: '<p>Autologous material removes the risk of reacting to a foreign substance. It does not remove the risks of the needle, the volume injected, sterile technique, or an unproven and variably prepared product. It also does not create evidence: a treatment still has to show that it works. Read <a href="/non-surgical/prp-safety/">is PRP safe?</a> and <a href="/non-surgical/regenerative-medicine/safety-unproven-treatments/">the safety of unproven regenerative treatments</a>.</p>' },
        { q: 'How long do the results of these trending treatments last?', a: '<p>Where effects are described at all, they are generally temporary and modest — threads while the suture holds, hyaluronic filler until it is metabolised, PLLA as a collagen response that varies person to person, PRP and cell products with no established duration. Some effects, notably nodules, calcification and scar tissue, can last far longer than any claimed aesthetic benefit. <a href="/non-surgical/sculptra-plla/realistic-expectations/">Sculptra: realistic expectations</a> and <a href="/non-surgical/mono-threads-procedure/">mono thread treatment and how long effects last</a> discuss duration by product.</p>' },
        { q: 'Will injected material affect future breast cancer screening?', a: '<p>It can. Fillers, silicone, oil cysts, calcification and scar tissue may mimic or obscure findings on mammography and ultrasound, which can mean extra imaging, unnecessary biopsy, or a genuine abnormality that is harder to see. Tell the imaging team exactly what was injected, where and when, and keep any product documentation. See <a href="/non-surgical/fillers-and-screening/">breast fillers and screening</a>.</p>' },
        { q: 'I have already had one of these treatments. What should I do now?', a: '<p>Do not try to drain, massage or remove anything yourself. Book an assessment with a doctor experienced in breast imaging or plastic surgery, tell them what was injected and when, and seek urgent care for fever, spreading redness, severe pain, rapidly enlarging swelling or discharge. Information on clearing injected material is on the <a href="/surgical/breast-filler-removal/">breast filler removal</a> page, and <a href="/non-surgical/unsafe-breast-injections/">unsafe breast injections</a> explains which symptoms need prompt attention.</p>' },
        { q: 'Why are these five treatments so heavily advertised if the evidence is weak?', a: '<p>Because advertising measures attention, not outcomes. “Non-surgical” is a powerful word, and injectable procedures are quick to offer, easy to photograph and profitable to repeat. Regulation of the product is not regulation of the marketing around it. <a href="/non-surgical/breast-enlargement-myths/">Seven myths about non-surgical enlargement</a> and <a href="/non-surgical/questions-red-flags/">questions to ask and red flags</a> cover the specific claims to watch for.</p>' }
      ]
    },
    {
      type: 'notice',
      icon: 'evidence',
      title: 'Sources behind this page',
      text: '<ul>' + [
        'U.S. FDA — Dermal Fillers (Soft Tissue Fillers), including the advice against using fillers to increase breast size, and the 2017 safety communication on injectable silicone for body contouring.',
        'U.S. FDA — Executive Summary: advisory meeting on dermal fillers (August 2025), and FDA guidance on unapproved stem-cell and regenerative products.',
        'Adipose-derived stem cell enrichment is counter-productive for primary aesthetic breast augmentation by autologous fat transfer: a systematic review. Journal of Plastic, Reconstructive and Aesthetic Surgery, 2020.',
        'NHS — patient information on breast augmentation and its complications; healthdirect (Australia) — cosmetic procedure risks.',
        'American Society of Plastic Surgeons and BAPRAS — breast augmentation, fat transfer and mastopexy patient guidance.',
        'Cochrane Library — reviews and registered protocols covering breast implants and reconstruction, and the documented absence of systematic reviews for fillers, PRP, threads and biostimulators in breast enlargement.'
      ].map((item) => '<li>' + item + '</li>').join('') + '</ul>' +
        '<p>Every citation used on this website, grouped by publisher, is listed in the <a href="/references/">reference library</a>, and the underlying studies are indexed in the <a href="/research/">research library</a>. Quoted publication does not establish effectiveness for a cosmetic indication; check each source for its own population, dose and outcomes.</p>'
    }
  ]
});

module.exports = { trendingOptionsPage };
