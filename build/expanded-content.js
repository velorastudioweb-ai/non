'use strict';

/*
 * Twenty-page editorial expansion prepared 30 October 2026.
 *
 * The array below contains the 19 new routes from the supplied draft; the
 * twentieth item expands the existing /faqs/ page in build/content.js. A
 * separate batch of 15 supporting surgical pages is concatenated at export.
 *
 * Every page is educational, avoids prices and outcome promises, and links back
 * to the existing canonical guides. Clinical review and named author/reviewer
 * attribution are still outstanding before publication; see
 * docs/expanded-content-2026.md.
 */

const { siteImages } = require('./site-images');
const { surgicalSubpages } = require('./surgical-subpages-content');

function page(data) {
  const image = siteImages[data.imageKey];
  const { imageKey, ...rest } = data;
  return {
    ...rest,
    bannerImage: image.src,
    bannerWidth: image.width,
    bannerHeight: image.height
  };
}

const pages = [
  page({
    url: '/non-surgical/creams-pills-massage/',
    slug: 'creams-pills-massage',
    section: 'non-surgical',
    group: 'nonsurgical',
    h1: 'Do Breast Enlargement Creams, Pills and Massage Actually Work?',
    cardTitle: 'Creams, pills and massage',
    seoTitle: 'Do Breast Enlargement Creams, Pills and Massage Work? | Quantum Health',
    seoDescription: 'What the evidence says about breast enlargement creams, herbal pills, massage, exercises and suction devices, and why most claims are unsupported.',
    bannerLead: 'Creams, supplements, massage routines and pumps are widely sold as alternatives to surgery. Here is what the evidence does and does not support.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'An evidence scorecard for more than 20 popular methods.'],
      ['/non-surgical/', 'Non-surgical enhancement: options and safety', 'How method, evidence and risk differ across non-surgical claims.'],
      ['/non-surgical/breast-enlargement-myths/', 'Seven myths about non-surgical enlargement', 'Common claims about threads, fillers, PRP and natural products.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Search for ways to enlarge breasts and you will find creams, capsules, herbal supplements, massage routines and pumping devices, often with dramatic promises. This page explains what these products claim and what is actually known.</p>' +
          '<h2>Creams and gels</h2>' +
          '<p>These are applied to the skin and are generally cosmetic moisturisers. There is no reliable evidence that a cream applied to the surface can grow breast tissue. Some may leave skin feeling smoother, which can be mistaken for a change in size.</p>' +
          '<h2>Pills and herbal supplements</h2>' +
          '<p>Many products claim to contain plant compounds with oestrogen-like activity. Evidence that they produce lasting breast growth is weak, and products can vary in strength and content. Hormone-active substances can affect periods, mood and other systems, and are not appropriate for everyone, including people with hormone-sensitive conditions. Speak to a doctor before taking any supplement for this purpose. See <a href="/breast-enlargement-safety/">breast enlargement safety</a>.</p>' +
          '<h2>Massage and chest exercises</h2>' +
          '<p>Massage may feel pleasant, but there is no good evidence that it increases breast volume. Chest exercises build the pectoral muscles beneath the breast. A stronger chest wall may change the look of the upper chest, but exercise does not enlarge breast tissue itself, and fat loss can reduce breast size.</p>' +
          '<h2>Suction and pumping devices</h2>' +
          '<p>These claim to stimulate growth. Evidence of a lasting increase is lacking, and they can cause bruising or skin irritation.</p>' +
          '<h2>What actually changes breast size?</h2>' +
          '<p>Breast size changes naturally with weight, hormones, pregnancy, breastfeeding and age. Only medical procedures such as implants or fat transfer are designed to add volume, and each carries its own risks. Read <a href="/breast-enlargement-without-surgery/">breast enlargement without surgery</a> for a method-by-method review.</p>' +
          '<h2>How to judge a claim</h2>' +
          '<ul><li>Is there independent research, not just testimonials?</li><li>Is the product registered or approved for this use by a recognised regulator?</li><li>Does it list ingredients and doses clearly?</li><li>Does it promise guaranteed results or a specific cup-size increase? If so, be sceptical.</li></ul>'
      },
      {
        type: 'notice',
        icon: 'evidence',
        title: 'Key takeaway',
        text: 'There is no proven cream, pill, massage or device that lastingly enlarges breasts. If you are unhappy with your breast size, a conversation with a qualified clinician is a better starting point than a product.'
      },
      {
        type: 'faq',
        id: 'creams-faq',
        heading: 'Questions about creams, pills and massage',
        items: [
          { q: 'Can massage enlarge breasts?', a: '<p>Massage may reduce tension or feel relaxing, but there is no reliable evidence that it produces lasting breast growth.</p>' },
          { q: 'Are herbal breast enlargement pills safe?', a: '<p>Not necessarily. Products vary in content and strength, and hormone-active ingredients can affect the body in ways that matter for some people. Check with a doctor before using them.</p>' }
        ]
      }
    ]
  }),

  page({
    url: '/non-surgical/unsafe-breast-injections/',
    slug: 'unsafe-breast-injections',
    section: 'non-surgical',
    group: 'nonsurgical',
    h1: 'Why Injecting Fillers, Liquid Silicone or Unknown Substances Into the Breast Is a Serious Risk',
    cardTitle: 'Unsafe breast injections',
    seoTitle: 'Unsafe Breast Injections: Fillers, Liquid Silicone and Unknown Substances | Quantum Health',
    seoDescription: 'Understand why breast injections of liquid silicone, oils or non-approved fillers can cause permanent harm, and what to do if you have already had them.',
    bannerLead: 'Injections into the breast are not a simpler form of augmentation. Some products can cause permanent lumps, infection and damage that is difficult to treat.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers: safety and evidence', 'Approved uses, regulatory warnings and alternatives.'],
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'What removal involves and why it can be complex.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, complications and warning signs.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Some clinics, and especially unlicensed providers, offer injections to enlarge breasts. Products have included liquid silicone, paraffin, oils and cosmetic fillers designed for the face. These are not the same as regulated breast implants.</p>' +
          '<h2>Why breast tissue is a difficult place for injections</h2>' +
          '<p>A breast is a large, soft organ with glandular tissue, fat and a rich blood supply. Material injected there can spread, form clumps, trigger inflammation or be hard to locate later. Unlike an implant, it cannot simply be removed as a single object.</p>' +
          '<h2>Possible complications</h2>' +
          '<ul><li>Hard lumps (granulomas) that can appear months or years later</li><li>Infection and abscess</li><li>Migration of material to other areas</li><li>Skin changes, pain and distortion</li><li>Difficulty with breast imaging, because lumps can look like abnormalities</li><li>Complex surgery to remove material, sometimes not fully possible</li></ul>' +
          '<h2>“Filler” is not one thing</h2>' +
          '<p>Some dermal fillers are approved for specific areas such as the face. That approval does not extend to the breast. Using a product outside its approved indication means its safety in that site has not been established. See <a href="/non-surgical/dermal-fillers/">breast fillers</a>.</p>' +
          '<h2>Red flags</h2>' +
          '<ul><li>No clear product name or batch information</li><li>Procedure offered at a beauty salon or home</li><li>No medical history taken</li><li>Promise of a large increase in one short visit</li><li>Price much lower than other options</li></ul>' +
          '<h2>If you have already had injections</h2>' +
          '<p>See a doctor with relevant experience. Do not try to squeeze, drain or remove lumps yourself. Tell any imaging team about the injections. Seek urgent care for fever, spreading redness, severe pain or rapidly changing lumps. Information on removal is on our <a href="/surgical/breast-filler-removal/">breast filler removal</a> page.</p>'
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Choose approaches with a clear regulatory status, a known product and a qualified clinician. Be cautious of anything that sounds quick and easy, especially when the product name is vague.'
      },
      {
        type: 'faq',
        id: 'injection-faq',
        heading: 'Questions about breast injections',
        items: [
          { q: 'Can injected material be removed completely?', a: '<p>Removal can be difficult and sometimes incomplete. The material may have spread through tissue, and surgery carries its own risks. Early assessment by an experienced clinician is important.</p>' },
          { q: 'Is injectable silicone the same as a silicone implant?', a: '<p>No. A breast implant has a solid silicone shell and contains cohesive gel or saline. Liquid injectable silicone is a different product and must not be used as a substitute.</p>' }
        ]
      }
    ]
  }),

  page({
    url: '/surgical/silicone-vs-saline-implants/',
    slug: 'silicone-vs-saline-implants',
    section: 'surgical',
    group: 'implants',
    h1: 'Silicone vs Saline Breast Implants: What Is the Difference?',
    cardTitle: 'Silicone vs saline',
    seoTitle: 'Silicone vs Saline Breast Implants: Differences and Monitoring | Quantum Health',
    seoDescription: 'Compare silicone gel and saline breast implants, including feel, appearance, rupture detection, monitoring and questions to ask your surgeon.',
    bannerLead: 'Both implant types use a silicone shell. The filling, how a leak shows up and the monitoring each needs are where they differ.',
    imageKey: 'breastImplants',
    related: [
      ['/breast-implants/', 'Breast implants: types and placement', 'The wider guide to implant choices, surfaces and incisions.'],
      ['/surgical/implant-longevity/', 'How long implants last', 'Replacement, revision and long-term monitoring.'],
      ['/breast-implant-safety/', 'Breast implant safety', 'Rupture, contracture, ALCL and follow-up.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Breast implants have a silicone elastomer shell. The difference lies in what is inside. Neither type is automatically better, and the right choice depends on your tissue, preferences and willingness to follow long-term monitoring.</p>' +
          '<h2>Saline implants</h2>' +
          '<p>Saline implants are filled with sterile salt water. They can sometimes be filled during surgery, which may allow a smaller incision. If the shell leaks, the implant usually deflates visibly over a short time and the body absorbs the saline. Some people find saline implants feel firmer or show more rippling, especially with thin tissue coverage.</p>' +
          '<h2>Silicone gel implants</h2>' +
          '<p>Silicone gel implants are filled with cohesive silicone gel. Many people find the feel closer to natural breast tissue. If the shell is damaged, the gel often stays in place, so a rupture can go unnoticed. This is why regulators such as the US FDA recommend periodic imaging for silicone gel implants. FDA guidance suggests a first MRI scan around five to six years after surgery and then every two to three years. Ask your surgeon what is recommended where you live.</p>'
      },
      {
        type: 'table',
        eyebrow: 'Side by side',
        heading: 'How the two fillings compare',
        head: ['Consideration', 'Saline', 'Silicone gel'],
        rows: [
          ['<strong>Feel</strong>', 'Can feel firmer', 'Often softer'],
          ['<strong>Rupture</strong>', 'Usually visible deflation', 'May be silent'],
          ['<strong>Monitoring</strong>', 'Clinical observation', 'Imaging may be recommended'],
          ['<strong>Incision</strong>', 'Can be smaller', 'Typically larger'],
          ['<strong>Rippling</strong>', 'May be more noticeable', 'Less likely, but not eliminated']
        ],
        note: 'Individual anatomy, implant surface and placement also affect feel and appearance.'
      },
      {
        type: 'prose',
        html:
          '<h2>Age and labelling</h2>' +
          '<p>Implant labelling can set minimum ages. In the United States, saline implants are labelled for adults aged 18 and over and silicone gel implants for those aged 22 and over for cosmetic augmentation. Rules vary by country, so check the labelling and regulatory status where you are treated.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Which implant type do you recommend for my tissue, and why?</li><li>What monitoring will I need, and who arranges it?</li><li>What is the manufacturer, model and warranty?</li><li>Will I receive an implant card with the batch details?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Neither type is better for everyone. The right choice depends on your anatomy, preferences and willingness to follow long-term monitoring. See the <a href="/breast-implants/">breast implants guide</a> and <a href="/breast-implant-safety/">breast implant safety</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/round-vs-anatomical-implants/',
    slug: 'round-vs-anatomical-implants',
    section: 'surgical',
    group: 'implants',
    h1: 'Round vs Anatomical (Teardrop) Breast Implants',
    cardTitle: 'Round vs anatomical',
    seoTitle: 'Round vs Anatomical (Teardrop) Breast Implants | Quantum Health',
    seoDescription: 'Learn how round and teardrop-shaped breast implants differ in shape, rotation risk and appearance, and which questions help you choose.',
    bannerLead: 'Implant shape affects how the upper and lower breast look. It also affects rotation risk and, in some cases, the implant surface used.',
    imageKey: 'breastImplants',
    related: [
      ['/breast-implants/', 'Breast implants: types and placement', 'Surfaces, profiles and incisions explained.'],
      ['/surgical/bia-alcl-implant-illness/', 'BIA-ALCL and implant illness', 'Why implant surface texture matters for safety.'],
      ['/surgical/silicone-vs-saline-implants/', 'Silicone vs saline', 'How the filling changes feel and monitoring.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Implant shape is a design choice, not a quality ranking. The right shape depends on your chest wall, the amount of soft tissue covering the implant and the look you want.</p>' +
          '<h2>Round implants</h2>' +
          '<p>Round implants are uniformly rounded, with fullness at the top and bottom. If they rotate slightly, the shape usually looks the same. They are available in smooth surfaces and some textured options.</p>' +
          '<h2>Anatomical (teardrop) implants</h2>' +
          '<p>Anatomical implants are shaped with a gentle slope at the top and more volume at the bottom, resembling a natural breast. Because they have a defined shape, rotation can change the look of the breast. They have historically been textured to reduce rotation.</p>' +
          '<h2>Texture matters for safety</h2>' +
          '<p>Some textured implants have been linked to a rare lymphoma called BIA-ALCL. Regulators in several countries have restricted certain textured implants. Ask your surgeon specifically about the surface texture of any implant proposed, and read our page on <a href="/surgical/bia-alcl-implant-illness/">BIA-ALCL and breast implant illness</a>.</p>' +
          '<h2>Which looks more natural?</h2>' +
          '<p>This depends on your chest shape and tissue. Many people with enough soft-tissue coverage get a natural result with round implants, because the breast tissue itself shapes the upper slope. Very thin tissue may show the implant outline more, whichever shape is used.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Why do you recommend this shape for me?</li><li>What is the surface texture and its safety record?</li><li>What is the chance of rotation or displacement?</li><li>Which manufacturer and model, and how long has it been on the market?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Shape is a design choice, not a guarantee of a natural result. Prioritise safety information and your own anatomy over trends.'
      }
    ]
  }),

  page({
    url: '/surgical/implant-size/',
    slug: 'implant-size',
    section: 'surgical',
    group: 'implants',
    h1: 'How to Choose Breast Implant Size Realistically',
    cardTitle: 'Choosing implant size',
    seoTitle: 'How to Choose Breast Implant Size Realistically | Quantum Health',
    seoDescription: 'Why cup size is unreliable, how surgeons assess implant volume, and what to consider so your expectations match your anatomy.',
    bannerLead: 'Cup sizes vary between brands and countries. Implants are measured in volume, and the same volume looks different on different bodies.',
    imageKey: 'breastAugmentation',
    related: [
      ['/breast-implants/', 'Breast implants: types and placement', 'How size, profile and base width interact.'],
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'Planning, surgery and recovery.'],
      ['/surgical/breast-revision/', 'Breast revision surgery', 'What revision can and cannot change.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Many people start with a cup size in mind, but cup sizes vary between brands and countries. Implants are measured in cubic centimetres (cc), and the same volume looks different on different bodies.</p>' +
          '<h2>What influences the right size</h2>' +
          '<ul><li>Chest width and breast base width</li><li>Existing breast volume and shape</li><li>Skin elasticity and the soft tissue available to cover the implant</li><li>Body proportions and height</li><li>Your goals and lifestyle, including exercise</li></ul>' +
          '<h2>Why bigger is not always better</h2>' +
          '<p>Larger implants place more stretch and weight on tissues. They can increase the chance of visible rippling, thinning of tissue, sagging over time and further surgery. A size that looks good in a photograph may not suit your tissue.</p>' +
          '<h2>Tools that help</h2>' +
          '<p>Surgeons may use sizers placed inside a bra, measurements of the breast base and 3D simulations. Treat simulations as a rough guide only, because they cannot predict how your tissues will heal and settle.</p>' +
          '<h2>How to communicate your goals</h2>' +
          '<ul><li>Use photos to show the look you want, not just a size</li><li>Bring pictures of results you do not want</li><li>Ask the surgeon to explain which of your wishes your anatomy supports</li></ul>' +
          '<h2>Settling</h2>' +
          '<p>Swelling means that the size you see in the first weeks is not the final result. Implants also settle over time. Ask when your surgeon expects the result to stabilise and what changes are normal.</p>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'The best size is the one your tissues can support with the lowest long-term risk. A qualified surgeon can help you estimate that, but no simulation can guarantee a result. See <a href="/surgical/breast-augmentation/">breast augmentation</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/implant-placement/',
    slug: 'implant-placement',
    section: 'surgical',
    group: 'implants',
    h1: 'Implant Placement: Over the Muscle, Under the Muscle or Dual Plane?',
    cardTitle: 'Implant placement',
    seoTitle: 'Breast Implant Placement: Over, Under or Dual Plane | Quantum Health',
    seoDescription: 'Understand where breast implants can be placed, how each position affects appearance, recovery and complications, and what to ask your surgeon.',
    bannerLead: 'An implant can sit in different layers of the chest. The choice affects how natural the result looks, how it feels, recovery and some long-term risks.',
    imageKey: 'breastImplants',
    related: [
      ['/breast-implants/', 'Breast implants: types and placement', 'The wider guide to implant planning.'],
      ['/surgical/implant-size/', 'Choosing implant size', 'Why volume and base width matter together.'],
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'The operation, recovery and revision.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">There is no single best plane. The right position depends on your tissue, implant and goals, and your surgeon should explain the trade-offs for your body.</p>'
      },
      {
        type: 'table',
        eyebrow: 'Placement options',
        heading: 'Where the implant can sit',
        head: ['Plane', 'Position', 'Trade-offs'],
        rows: [
          ['<strong>Subglandular</strong>', 'Behind breast tissue, in front of the chest muscle', 'Recovery can be easier, but less tissue covers the implant, so edges and rippling may be more visible.'],
          ['<strong>Submuscular</strong>', 'Beneath the pectoral muscle', 'The muscle adds coverage at the upper breast, but recovery may be more uncomfortable and muscle movement can distort the implant.'],
          ['<strong>Dual plane</strong>', 'Upper part under the muscle, lower part under breast tissue', 'A common approach that aims to combine coverage with a natural lower shape.'],
          ['<strong>Subfascial</strong>', 'Under the thin layer of tissue covering the muscle', 'A compromise in some patients, though suitability depends on tissue quality.']
        ],
        note: 'Your surgeon may use a variation or combination. Ask exactly what is planned for each breast.'
      },
      {
        type: 'prose',
        html:
          '<h2>What influences the choice</h2>' +
          '<ul><li>How much natural breast tissue and skin you have</li><li>Implant size and type</li><li>Your activity level, for example regular weight training</li><li>Your surgeon’s training and experience with each technique</li><li>Your priorities for recovery and appearance</li></ul>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Which placement do you recommend for my body, and why?</li><li>What are the drawbacks of that option for me?</li><li>How often do you perform it?</li><li>What is the incision plan?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Placement is a surgical decision with trade-offs, not a loyalty test for one technique. Ask for the reasoning specific to your anatomy. See <a href="/breast-implants/">breast implants</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/implant-longevity/',
    slug: 'implant-longevity',
    section: 'surgical',
    group: 'implants',
    h1: 'How Long Do Breast Implants Last?',
    cardTitle: 'How long implants last',
    seoTitle: 'How Long Do Breast Implants Last? | Quantum Health',
    seoDescription: 'Breast implants are not lifetime devices. Learn what affects their lifespan, why monitoring matters and when replacement or removal may be needed.',
    bannerLead: 'Implants are long-term medical devices, not a one-time purchase. Many people need further surgery at some point, although timing varies widely.',
    imageKey: 'breastImplants',
    related: [
      ['/breast-implants/', 'Breast implants: types and placement', 'The wider guide to implant choice and follow-up.'],
      ['/surgical/capsular-contracture/', 'Capsular contracture', 'A common reason for revision surgery.'],
      ['/surgical/breast-revision/', 'Breast revision surgery', 'Exchange, removal and repair.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">A common question is whether implants last forever. The accurate answer is no. Breast implants are medical devices, and regulators such as the US FDA state that they are not lifetime devices. Many people will need further surgery at some point, although timing varies widely.</p>' +
          '<h2>Why implants may need replacing or removing</h2>' +
          '<ul><li>Rupture or leakage of the shell</li><li>Capsular contracture, where scar tissue tightens around the implant</li><li>Changes in breast shape from ageing, weight change, pregnancy or breastfeeding</li><li>Implant displacement or rotation</li><li>Visible rippling or edge visibility</li><li>Personal preference for a different size</li><li>Rarely, a serious complication that needs removal</li></ul>' +
          '<h2>The longer you have them, the more likely a problem</h2>' +
          '<p>The chance of complications generally rises with time. Studies by manufacturers and independent researchers report a meaningful proportion of people having further surgery within ten years, though figures differ by implant type and study.</p>' +
          '<h2>Monitoring</h2>' +
          '<p>For silicone gel implants, a rupture may produce few symptoms. The US FDA recommends MRI screening about five to six years after surgery and then every two to three years; ultrasound may be used where MRI is unsuitable or unavailable. Ask your surgeon what monitoring applies in your country. For all implants, report new pain, swelling, a change in shape or firmness, or lumps.</p>' +
          '<h2>Keep your records</h2>' +
          '<p>Keep your implant card with the manufacturer, model, size and batch number. This helps if recalls, safety notices or future surgery arise.</p>' +
          '<h2>Planning for the long term</h2>' +
          '<p>Before surgery, ask about the likelihood of revision, the costs of monitoring and replacement, and the clinic’s policy if you need another operation.</p>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Think of implants as long-term devices that need ongoing attention, not a one-time procedure. See <a href="/surgical/breast-revision/">breast revision surgery</a> and <a href="/breast-implant-safety/">breast implant safety</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/capsular-contracture/',
    slug: 'capsular-contracture',
    section: 'surgical',
    group: 'implants',
    h1: 'Capsular Contracture Explained',
    cardTitle: 'Capsular contracture',
    seoTitle: 'Capsular Contracture After Breast Implants | Quantum Health',
    seoDescription: 'What capsular contracture is, how it is graded, possible causes, symptoms and treatment options after breast implant surgery.',
    bannerLead: 'A capsule of scar tissue forms around every implant. Contracture happens when that capsule tightens and squeezes the implant.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/breast-implant-safety/', 'Breast implant safety', 'Rupture, ALCL, contracture and monitoring.'],
      ['/surgical/implant-longevity/', 'How long implants last', 'Why revision may be needed over time.'],
      ['/surgical/breast-revision/', 'Breast revision surgery', 'Capsulectomy, exchange and removal.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Whenever the body has a foreign object, it forms a thin layer of scar tissue around it, called a capsule. This is normal. Capsular contracture happens when that capsule tightens and thickens, squeezing the implant.</p>' +
          '<h2>What it can feel like</h2>' +
          '<ul><li>A firmer breast</li><li>A change in shape, with the implant looking rounder, higher or distorted</li><li>Discomfort or pain</li><li>In advanced cases, a hard, painful breast</li></ul>' +
          '<h2>The Baker grading</h2>' +
          '<p>Surgeons often describe severity using four grades. The grade is a clinical description, not a prediction of what will happen next.</p>'
      },
      {
        type: 'table',
        eyebrow: 'Severity',
        heading: 'The Baker scale',
        head: ['Grade', 'What it describes'],
        rows: [
          ['<strong>I</strong>', 'Breast is soft and looks natural'],
          ['<strong>II</strong>', 'Slightly firm but looks normal'],
          ['<strong>III</strong>', 'Firm and visibly distorted'],
          ['<strong>IV</strong>', 'Hard, painful and distorted']
        ]
      },
      {
        type: 'prose',
        html:
          '<h2>What causes it?</h2>' +
          '<p>The exact cause is not fully understood. Factors that have been studied include bacterial contamination around the implant (biofilm), bleeding or fluid collection after surgery, infection, radiation therapy and implant characteristics. It can develop soon after surgery or years later.</p>' +
          '<h2>How it is managed</h2>' +
          '<p>Options depend on severity and your preferences. They can include observation for mild cases and surgery for more severe ones, such as removing the capsule (capsulectomy), replacing the implant or removing it altogether. Contracture can return after treatment.</p>' +
          '<h2>Reducing risk</h2>' +
          '<p>Surgeons use techniques intended to lower the chance, such as careful control of bleeding, minimising contamination and appropriate pocket choice. No technique guarantees prevention.</p>' +
          '<h2>When to seek review</h2>' +
          '<p>Tell your surgeon if one breast becomes firmer, changes shape or becomes painful. Early review gives more options.</p>'
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Capsular contracture is a known and relatively common reason for revision surgery. Ask any surgeon you consult how often they see it and how they manage it. See <a href="/breast-implant-safety/">breast implant safety</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/bia-alcl-implant-illness/',
    slug: 'bia-alcl-implant-illness',
    section: 'surgical',
    group: 'implants',
    h1: 'BIA-ALCL and Breast Implant Illness: What the Evidence Says',
    cardTitle: 'BIA-ALCL and implant illness',
    seoTitle: 'BIA-ALCL and Breast Implant Illness: What the Evidence Says | Quantum Health',
    seoDescription: 'A calm, factual explanation of BIA-ALCL and breast implant illness, what is known, what is uncertain and when to talk to a doctor.',
    bannerLead: 'Two topics often cause worry: BIA-ALCL and what people call breast implant illness. They are different, and the evidence differs too.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/breast-implant-safety/', 'Breast implant safety', 'Rupture, contracture, ALCL and monitoring.'],
      ['/surgical/breast-revision/', 'Breast revision surgery', 'Removal and exchange planning.'],
      ['/research/', 'Research library', 'Published studies and regulator guidance.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">BIA-ALCL is a rare cancer of immune system cells linked to breast implants. “Breast implant illness” is a term used for a group of symptoms some people attribute to their implants. They should not be confused with each other.</p>' +
          '<h2>BIA-ALCL</h2>' +
          '<p>Breast implant-associated anaplastic large cell lymphoma is a rare cancer of immune system cells, not of breast tissue. It has been linked mostly to textured implants. It most often appears years after surgery, commonly as sudden swelling from fluid around the implant, or sometimes as a lump or capsule thickening. When found early and confined to the capsule, it is usually treated by surgery to remove the implant and the surrounding capsule, with other treatment in more advanced cases.</p>' +
          '<p>Several regulators have restricted or withdrawn certain textured implants after reviewing the association. Ask your surgeon what the surface of any implant is, and which regulatory approvals it holds.</p>' +
          '<h2>What to watch for</h2>' +
          '<ul><li>Swelling of one breast that appears long after surgery</li><li>A new lump in the breast or armpit</li><li>Pain, redness or changes in the breast</li></ul>' +
          '<p>If you notice these, see a doctor and mention your implants.</p>' +
          '<h2>Breast implant illness</h2>' +
          '<p>Some people with implants report symptoms such as fatigue, joint pain, brain fog, rashes and anxiety and attribute them to their implants. It is not currently an established medical diagnosis, and research has not found a single clear mechanism. Many people report improvement after implant removal, though studies cannot yet say how much of this is due to the implants themselves. Symptoms are real and deserve a proper medical assessment to look for other causes.</p>' +
          '<h2>How to approach this as a patient</h2>' +
          '<ul><li>Ask about the implant surface and the manufacturer’s safety record</li><li>Ask how the clinic follows up long term</li><li>Keep your implant documentation</li><li>Do not ignore symptoms, and do not assume they are unrelated</li></ul>'
      },
      {
        type: 'notice',
        icon: 'evidence',
        title: 'Key takeaway',
        text: 'Serious implant-associated lymphoma is rare but real, and honest counselling should mention it. See <a href="/breast-implant-safety/">breast implant safety</a> and our <a href="/research/">research library</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/mammograms-with-implants/',
    slug: 'mammograms-with-implants',
    section: 'surgical',
    group: 'implants',
    h1: 'Breast Implants and Mammograms: What You Should Know',
    cardTitle: 'Implants and mammograms',
    seoTitle: 'Breast Implants and Mammograms: What You Should Know | Quantum Health',
    seoDescription: 'How breast implants affect mammograms and breast screening, what to tell the imaging team and why screening still matters.',
    bannerLead: 'Having implants does not mean you should skip breast screening. It does mean that imaging may need to be adapted.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, complications and warning signs.'],
      ['/breast-implant-safety/', 'Breast implant safety', 'Rupture and long-term monitoring.'],
      ['/surgical/bia-alcl-implant-illness/', 'BIA-ALCL and implant illness', 'Rare implant-associated lymphoma explained.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Implants can make mammograms more complex, but they do not make screening unimportant. Tell the imaging team about your implants when you book and when you attend.</p>' +
          '<h2>Do implants cause breast cancer?</h2>' +
          '<p>Major reviews have not found that implants cause breast cancer in breast tissue. Separately, rare implant-associated lymphoma is discussed on our <a href="/surgical/bia-alcl-implant-illness/">BIA-ALCL page</a>.</p>' +
          '<h2>How implants affect mammograms</h2>' +
          '<p>Implants can block part of the breast from view on a standard mammogram, because X-rays do not pass through them well. Imaging teams therefore often take additional views that gently push the implant back and pull breast tissue forward, called implant displacement views. Compression can feel uncomfortable, and in rare cases may risk implant damage.</p>' +
          '<h2>What to do</h2>' +
          '<ul><li>Tell the clinic you have implants when booking</li><li>Ask whether the facility has experience with implant imaging</li><li>Bring your implant card</li><li>Mention where the implant is placed and any history of capsular contracture or rupture</li></ul>' +
          '<h2>Other imaging</h2>' +
          '<p>Ultrasound and MRI may be used in addition to mammograms. MRI is also used to check silicone implants for rupture in some patients.</p>' +
          '<h2>Surgery planning and screening</h2>' +
          '<p>Before augmentation, a baseline mammogram or other screening may be recommended depending on your age and risk. Follow your doctor’s advice and national guidelines.</p>' +
          '<h2>Symptoms</h2>' +
          '<p>Self-examination matters. Know what your breasts normally look and feel like, and report new lumps, skin changes, nipple discharge or persistent pain.</p>'
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Implants make screening a little more complex, not less important. See <a href="/breast-enlargement-safety/">breast enlargement safety</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/pregnancy-breastfeeding-implants/',
    slug: 'pregnancy-breastfeeding-implants',
    section: 'surgical',
    group: 'implants',
    h1: 'Breast Augmentation, Pregnancy and Breastfeeding',
    cardTitle: 'Pregnancy and breastfeeding',
    seoTitle: 'Breast Augmentation, Pregnancy and Breastfeeding | Quantum Health',
    seoDescription: 'How breast augmentation may affect pregnancy, breastfeeding and breast shape, and what to consider if you plan to have children.',
    bannerLead: 'Many people considering augmentation also plan to have children. The two interact in a few ways, and timing is worth discussing openly.',
    imageKey: 'breastAugmentation',
    related: [
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'Planning, surgery and recovery.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'A different set of pregnancy considerations.'],
      ['/surgical/breast-lift/', 'Breast lift surgery', 'How a lift addresses shape after pregnancy.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Many people considering augmentation also plan to have children. The two interact in a few ways, and there is no single timeline that suits everyone.</p>' +
          '<h2>Can I breastfeed with implants?</h2>' +
          '<p>Many people with implants breastfeed successfully, but it is not guaranteed. Factors include the incision, the implant position, whether nerves or ducts were affected, and your breast tissue before surgery. Incisions around the nipple may carry a higher chance of affecting milk supply. A person who has had implants may also have had limited glandular tissue to begin with.</p>' +
          '<h2>Is breastfeeding safe for the baby?</h2>' +
          '<p>Current evidence has not shown that silicone from intact implants passes into milk at harmful levels. If you have concerns, discuss them with your doctor.</p>' +
          '<h2>How pregnancy changes breasts</h2>' +
          '<p>Breast size and shape change during pregnancy and breastfeeding, with or without implants. Skin stretches, and breasts may look different afterwards. Implants do not prevent these changes, and surgery before pregnancy may mean a lift, revision or other procedure later.</p>' +
          '<h2>Timing</h2>' +
          '<p>Some surgeons recommend waiting until you have finished having children. Others operate earlier if the person understands that further surgery may be needed. Fat transfer and implants have different considerations, which you can read about on our <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer page</a>.</p>' +
          '<h2>Surgery during pregnancy or breastfeeding</h2>' +
          '<p>Elective breast surgery is generally not done during pregnancy or while breastfeeding. Surgeons usually advise waiting some months after you stop breastfeeding.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Which incision best protects breastfeeding for me?</li><li>How will pregnancy affect my result?</li><li>What is the likelihood of needing a lift or revision afterwards?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'If pregnancy is likely in the near future, discuss timing openly with your surgeon before deciding. See <a href="/surgical/breast-augmentation/">breast augmentation</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/fat-transfer-survival/',
    slug: 'fat-transfer-survival',
    section: 'surgical',
    group: 'procedures',
    h1: 'Fat Transfer: How Much Fat Actually Survives?',
    cardTitle: 'How much fat survives',
    seoTitle: 'Fat Transfer: How Much Fat Actually Survives? | Quantum Health',
    seoDescription: 'Why fat survival after breast fat transfer varies, what affects it, how many sessions may be needed and how to set realistic expectations.',
    bannerLead: 'Fat transfer uses your own fat, but not all of the transferred fat survives. Published retention rates vary widely, and individual results are unpredictable.',
    imageKey: 'fatTransfer',
    related: [
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'The procedure, recovery and risks.'],
      ['/breast-enhancement-comparison/', 'Options compared', 'Fat transfer against implants and other approaches.'],
      ['/research/', 'Research library', 'Published fat-grafting studies and reviews.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Fat transfer uses your own fat, collected by liposuction, processed and injected into the breasts. A common question is how much of that fat remains.</p>' +
          '<h2>Not all of it survives</h2>' +
          '<p>Transferred fat needs a blood supply to survive. Some fat cells establish one; others do not and are absorbed by the body. Published studies report a wide range of retention, and individual results are unpredictable. Be wary of any provider promising a fixed percentage.</p>' +
          '<h2>What may influence survival</h2>' +
          '<ul><li>The technique used to harvest, process and inject fat</li><li>The volume injected, since too much at once can reduce survival</li><li>Your tissue and skin elasticity</li><li>Smoking, which affects blood supply</li><li>Weight change after surgery</li><li>Whether a bra or external expansion device is used before surgery, which some surgeons use</li></ul>' +
          '<h2>Realistic volume</h2>' +
          '<p>Fat transfer typically offers a modest, natural-feeling increase rather than a dramatic one. Some people need more than one session to reach their goal.</p>' +
          '<h2>Possible complications</h2>' +
          '<p>These include uneven results, fat necrosis (areas of hardened fat), oil cysts and calcifications that can show up on breast imaging, infection and the usual risks of liposuction. Tell any imaging team you have had fat transfer.</p>' +
          '<h2>Who may not be suitable</h2>' +
          '<p>People with little donor fat, or who want a large increase in size, may find it does not meet their goals. Your surgeon should explain this honestly.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>How much do you expect to survive in someone like me?</li><li>How many sessions might I need?</li><li>How do you handle lumps or calcifications?</li><li>Do you have results from patients with a similar body type?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Fat transfer can be a good option for modest change, but expectations should be set around variability. See <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer breast augmentation</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-lift-vs-augmentation/',
    slug: 'breast-lift-vs-augmentation',
    section: 'surgical',
    group: 'procedures',
    h1: 'Breast Lift vs Breast Augmentation: Which Do You Need?',
    cardTitle: 'Lift vs augmentation',
    seoTitle: 'Breast Lift vs Breast Augmentation: Which Do You Need? | Quantum Health',
    seoDescription: 'Understand the difference between a breast lift and augmentation, when each is used, and when they are combined.',
    bannerLead: 'People often say they want “bigger” or “perkier” breasts without being sure which procedure achieves that. The two operations solve different problems.',
    imageKey: 'breastAugmentation',
    related: [
      ['/surgical/breast-lift/', 'Breast lift surgery', 'Shape, scars and longevity.'],
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'Implants, fat transfer and recovery.'],
      ['/surgical/breast-revision/', 'Breast revision surgery', 'What revision can change after either procedure.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Augmentation adds volume. A lift changes position and shape. Some people need one, some need the other, and some need both.</p>' +
          '<h2>What augmentation does</h2>' +
          '<p>Breast augmentation adds volume, using implants or fat transfer. It can improve fullness and proportions but does not remove excess skin. If breasts already sag, adding volume can sometimes make the sagging more obvious.</p>' +
          '<h2>What a breast lift does</h2>' +
          '<p>A breast lift (mastopexy) raises the breast and reshapes it by removing excess skin and tightening the surrounding tissue. It repositions the nipple higher. It does not add significant volume. See <a href="/surgical/breast-lift/">breast lift surgery</a>.</p>' +
          '<h2>How sagging is assessed</h2>' +
          '<p>Surgeons assess breast ptosis by looking at the position of the nipple relative to the fold beneath the breast. The more the breast and nipple sit below that fold, the more likely a lift is needed.</p>' +
          '<h2>When a combination is considered</h2>' +
          '<p>If you have both low volume and sagging, you may be offered a lift with augmentation. Some surgeons perform both in one operation, and others stage them in two steps because the combination carries higher risks, such as problems with healing or implant position.</p>' +
          '<h2>Trade-offs</h2>' +
          '<ul><li>A lift leaves scars, usually around the nipple, and often down and along the fold, depending on the technique</li><li>Results are not permanent, because gravity and ageing continue</li><li>Combined surgery may mean a longer operation and recovery</li></ul>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Do I need a lift, augmentation or both, and why?</li><li>What scars should I expect and where?</li><li>If you advise staging, what is the reason?</li><li>What is the chance I will need revision?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Volume and position are separate problems. A thorough assessment, not a guess from photos, decides which operation fits. See <a href="/surgical/breast-lift/">breast lift</a> and <a href="/surgical/breast-augmentation/">breast augmentation</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-asymmetry/',
    slug: 'breast-asymmetry',
    section: 'surgical',
    group: 'procedures',
    h1: 'Breast Asymmetry: What Is Normal and What Can Be Done',
    cardTitle: 'Breast asymmetry',
    seoTitle: 'Breast Asymmetry: What Is Normal and What Can Be Done | Quantum Health',
    seoDescription: 'Most people have some breast asymmetry. Learn what is normal, what causes larger differences and what options exist.',
    bannerLead: 'Breasts are rarely perfect mirror images. Small differences in size, shape, nipple position and the breast fold are very common.',
    imageKey: 'breastAugmentation',
    related: [
      ['/surgical/breast-lift/', 'Breast lift surgery', 'Reshaping and repositioning the breast.'],
      ['/surgical/breast-reduction/', 'Breast reduction surgery', 'Reducing volume on one or both sides.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer', 'Using your own fat to build up the smaller breast.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Small differences in size, shape, nipple position and the breast fold are very common, and many people never notice them. A new or rapidly changing difference needs medical assessment.</p>' +
          '<h2>Why asymmetry happens</h2>' +
          '<ul><li>Natural variation in development during puberty</li><li>Differences in the chest wall or spine, including mild curvature</li><li>Hormonal changes, pregnancy and breastfeeding, which may affect each breast differently</li><li>Weight changes</li><li>Previous surgery, injury or radiotherapy</li><li>Congenital conditions, for example tuberous breast shape or chest wall differences</li></ul>' +
          '<h2>When to see a doctor</h2>' +
          '<p>A new change in one breast, such as a lump, skin change, nipple discharge or sudden size difference, needs medical assessment. Asymmetry that has always been present is usually not a health concern, but a clinician can check for underlying causes if it is marked or you are worried.</p>' +
          '<h2>Options when it bothers you</h2>' +
          '<ul><li>Implants of different sizes</li><li>Fat transfer to build up the smaller breast</li><li>A breast lift or reduction on one or both sides</li><li>A combination of procedures</li></ul>' +
          '<p>Surgery can improve symmetry but cannot make breasts identical. Implants also settle differently, and breasts may change differently over time.</p>' +
          '<h2>Non-surgical options</h2>' +
          '<p>Padded or shaped bras and prostheses can balance appearance without surgery. Injectables are not a safe solution. See <a href="/non-surgical/unsafe-breast-injections/">unsafe breast injections</a>.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Is my asymmetry normal or does it suggest an underlying condition?</li><li>Which options fit my anatomy?</li><li>How closely can the result match, realistically?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Some asymmetry is normal. If it affects your confidence, there are options, but realistic expectations matter. See <a href="/breast-enlargement-safety/">breast enlargement safety</a> for warning signs.'
      }
    ]
  }),

  page({
    url: '/breast-surgeon-credentials/',
    slug: 'breast-surgeon-credentials',
    section: 'education',
    group: 'education',
    h1: 'How to Check a Breast Surgeon’s Credentials in India',
    cardTitle: 'Checking a surgeon',
    seoTitle: 'How to Check a Breast Surgeon’s Credentials in India | Quantum Health',
    seoDescription: 'A practical checklist for verifying a doctor’s registration, specialist training and facility before breast enlargement surgery in India.',
    bannerLead: 'Choosing the surgeon is one of the most important decisions in any breast procedure. In India, a doctor can legally practise medicine without being a trained plastic surgeon, so it is worth checking carefully.',
    imageKey: 'educationResearch',
    related: [
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, risks and warning signs.'],
      ['/breast-augmentation-consultation-checklist/', 'Consultation checklist', 'What to bring, ask and look for.'],
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'The operation, recovery and revision.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">This page is general guidance. Rules change, so verify details with official sources and the relevant professional body.</p>' +
          '<h2>1. Check medical registration</h2>' +
          '<p>A doctor should be registered with the National Medical Commission or a State Medical Council. Ask for their registration number and check it on the official register.</p>' +
          '<h2>2. Check specialist training</h2>' +
          '<p>Ask what postgraduate qualification they hold in plastic and reconstructive surgery, such as an MCh or DNB in Plastic Surgery, and where they trained. Ask how much of their practice is breast surgery.</p>' +
          '<h2>3. Ask about experience with your procedure</h2>' +
          '<ul><li>How many of these procedures do you perform each year?</li><li>What complications have you managed, and how?</li><li>Can I speak to someone about the process, without being offered testimonials?</li></ul>' +
          '<h2>4. Professional memberships</h2>' +
          '<p>Membership of recognised professional societies, such as the Association of Plastic Surgeons of India, can be a positive sign, though it is not a guarantee. Check membership with the society itself.</p>' +
          '<h2>5. Check the facility</h2>' +
          '<ul><li>Is surgery done in a licensed hospital or day-care facility?</li><li>Is there a qualified anaesthetist?</li><li>Is there emergency equipment and arrangements to transfer you to a hospital if needed?</li></ul>' +
          '<h2>6. Check the product</h2>' +
          '<p>Ask for the implant manufacturer, model and batch number, and whether it holds approvals in India or with other recognised regulators. You should receive an implant card.</p>' +
          '<h2>7. Watch for red flags</h2>' +
          '<ul><li>Pressure to book quickly or discounts that expire</li><li>Guaranteed results or cup-size promises</li><li>Reluctance to explain risks or show credentials</li><li>Before-and-after photos that cannot be verified</li><li>No written consent form or aftercare plan</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'A good surgeon welcomes questions, explains risks plainly and gives you time. See <a href="/breast-enlargement-safety/">breast enlargement safety</a> and the <a href="/breast-augmentation-consultation-checklist/">consultation checklist</a>.'
      }
    ]
  }),

  page({
    url: '/breast-augmentation-consultation-checklist/',
    slug: 'breast-augmentation-consultation-checklist',
    section: 'education',
    group: 'education',
    h1: 'Your Breast Augmentation Consultation Checklist',
    cardTitle: 'Consultation checklist',
    seoTitle: 'Breast Augmentation Consultation Checklist | Quantum Health',
    seoDescription: 'A printable checklist of what to bring, ask and look for at a breast augmentation consultation, so you leave informed rather than rushed.',
    bannerLead: 'A consultation should help you decide, not push you towards a booking. Use this checklist to prepare and to compare what you are told.',
    imageKey: 'surgicalConsultationPreparation',
    related: [
      ['/breast-surgeon-credentials/', 'Checking a surgeon', 'Registration, training and facility checks.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, complications and warning signs.'],
      ['/breast-surgery-costs/', 'Understanding costs', 'What a quote includes and what it may exclude.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">A good consultation should leave you with clear answers and no pressure. Take notes, ask for the plan in writing and give yourself time to think.</p>' +
          '<h2>Before you go</h2>' +
          '<ul><li>Write down your goals and what bothers you now</li><li>Collect photos that show the look you want and the look you do not</li><li>List your medical history, medicines, allergies and any previous surgery</li><li>Note your family history of breast cancer</li><li>Plan to ask someone you trust to come with you, if you like</li></ul>' +
          '<h2>Ask about the surgeon</h2>' +
          '<ul><li>What is your training and registration?</li><li>How often do you perform this operation?</li><li>Can you explain complications you have seen?</li></ul>' +
          '<h2>Ask about the procedure</h2>' +
          '<ul><li>Which technique, implant and placement do you recommend, and why?</li><li>What are the alternatives, including doing nothing?</li><li>What are the risks specific to me?</li><li>What will my scars look like?</li><li>What will recovery look like, and when can I return to work and exercise?</li></ul>' +
          '<h2>Ask about the implant</h2>' +
          '<ul><li>Manufacturer, model, surface and size</li><li>Regulatory approvals and warranty</li><li>Monitoring recommendations</li></ul>' +
          '<h2>Ask about the facility and aftercare</h2>' +
          '<ul><li>Where will surgery be done, and by whom is anaesthesia given?</li><li>Who do I contact after hours?</li><li>What follow-up visits are included?</li><li>What happens if I need another operation?</li></ul>' +
          '<h2>Ask about money, clearly</h2>' +
          '<p>What does the quote include and exclude? See our <a href="/breast-surgery-costs/">guide to costs</a> for hidden costs to check.</p>' +
          '<h2>After the consultation</h2>' +
          '<p>Take time. A reputable clinic will not mind if you think it over, get a second opinion or return for another visit before consenting. If the surgeon is not willing to give you written information, that is itself information.</p>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'The aim is to leave with clear answers and no pressure. See also our <a href="/breast-surgeon-credentials/">surgeon credential checks</a>.'
      }
    ]
  }),

  page({
    url: '/breast-surgery-costs/',
    slug: 'breast-surgery-costs',
    section: 'education',
    group: 'education',
    h1: 'Understanding the Costs of Breast Surgery (Without the Sales Pitch)',
    cardTitle: 'Understanding costs',
    seoTitle: 'Understanding the Costs of Breast Surgery | Quantum Health',
    seoDescription: 'What typically makes up the cost of breast augmentation, what to check is included, and how to avoid hidden costs. No prices quoted.',
    bannerLead: 'We do not list prices, because they vary by surgeon, city, facility and procedure. This page explains what to look for in a quote so you can compare like with like.',
    imageKey: 'educationResearch',
    related: [
      ['/surgical/implant-longevity/', 'How long implants last', 'Plan for monitoring and possible replacement.'],
      ['/breast-augmentation-consultation-checklist/', 'Consultation checklist', 'Questions to ask before consenting.'],
      ['/breast-surgeon-credentials/', 'Checking a surgeon', 'Training, registration and facility checks.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">A low headline price can hide the cost of monitoring, complications and revision. Compare what is included, not just the final number.</p>' +
          '<h2>What a quote may include</h2>' +
          '<ul><li>Surgeon’s fee</li><li>Anaesthetist’s fee</li><li>Hospital or facility charges, including theatre time and overnight stay</li><li>The implants, or the fat transfer equipment</li><li>Pre-operative tests and consultations</li><li>Medication and post-operative garments</li><li>Follow-up appointments</li></ul>' +
          '<h2>What may be excluded</h2>' +
          '<ul><li>Imaging, such as an MRI or ultrasound, before or after surgery</li><li>Treatment of complications</li><li>Revision surgery, even if the cause is a complication</li><li>Implant replacement later</li><li>Time off work and travel</li></ul>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Is this a total or a package price? What is not included?</li><li>If I need another operation within the first year or two, what will I pay?</li><li>What is the warranty on the implant, and what does it cover? Often it covers the device but not surgery.</li><li>Do I pay anything extra for an overnight stay?</li></ul>' +
          '<h2>Long-term costs</h2>' +
          '<p>Because implants are not lifetime devices, plan for monitoring, possible replacement and breast changes over time. See <a href="/surgical/implant-longevity/">how long implants last</a>.</p>' +
          '<h2>Red flags</h2>' +
          '<ul><li>A price far below others</li><li>Pressure to pay a deposit immediately</li><li>No written, itemised estimate</li><li>Financing offered before medical assessment</li></ul>' +
          '<h2>Insurance</h2>' +
          '<p>Cosmetic surgery is usually not covered, but treatment of some complications might be. Check with your insurer before you proceed.</p>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'The cheapest quote is not necessarily the lowest cost once complications and revisions are counted. Compare what is included, not just the headline figure.'
      }
    ]
  }),

  page({
    url: '/non-surgical/breast-enlargement-myths/',
    slug: 'breast-enlargement-myths',
    section: 'non-surgical',
    group: 'nonsurgical',
    h1: 'Seven Myths About Non-Surgical Breast Enlargement',
    cardTitle: 'Seven myths',
    seoTitle: 'Seven Myths About Non-Surgical Breast Enlargement | Quantum Health',
    seoDescription: 'Common myths about breast threads, fillers, PRP, creams and “natural” enlargement, and what the evidence actually says.',
    bannerLead: 'Non-surgical claims are often repeated until they sound true. Here are seven common myths, checked against the evidence and regulatory position.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The evidence guide and method scorecard.'],
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'Approved uses and serious safety concerns.'],
      ['/non-surgical/breast-threads/', 'Breast threads', 'What threads can and cannot do.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">None of these myths is harmless. Each can lead someone to spend money, delay a proper assessment or accept a risk they did not understand.</p>' +
          '<h2>Myth 1: “Non-surgical means no risk.”</h2>' +
          '<p>Non-invasive does not equal risk-free. Injections and threads can cause infection, lumps and tissue damage. See <a href="/non-surgical/">non-surgical breast enhancement</a>.</p>' +
          '<h2>Myth 2: “Fillers can give me a full cup size.”</h2>' +
          '<p>Fillers approved for the face are not approved for breast enlargement. Safety and effectiveness for that use have not been established.</p>' +
          '<h2>Myth 3: “Threads lift and enlarge the breasts.”</h2>' +
          '<p>Threads are not designed to add significant volume. At most, some may cause a small, often temporary, change in appearance. See <a href="/non-surgical/breast-threads/">breast threads</a>.</p>' +
          '<h2>Myth 4: “PRP grows breast tissue.”</h2>' +
          '<p>PRP is used in some medical settings, but there is no robust evidence that it enlarges breasts. See <a href="/non-surgical/prp/">PRP and breast enhancement</a>.</p>' +
          '<h2>Myth 5: “Stem cells make new breast tissue safely.”</h2>' +
          '<p>Research is early and not an established treatment for enlargement. See <a href="/non-surgical/regenerative-medicine/">stem cells and regenerative medicine</a>.</p>' +
          '<h2>Myth 6: “Natural supplements and creams work.”</h2>' +
          '<p>There is no reliable evidence of lasting enlargement. See our page on <a href="/non-surgical/creams-pills-massage/">creams, pills and massage</a>.</p>' +
          '<h2>Myth 7: “A famous or well-reviewed clinic proves it works.”</h2>' +
          '<p>Reviews and photos are not evidence. Ask for the published research and the product’s approval status.</p>'
      },
      {
        type: 'notice',
        icon: 'evidence',
        title: 'Key takeaway',
        text: 'Be sceptical of any treatment that promises large, quick and lasting enlargement without surgery. Ask what the product is approved for, what evidence exists and what can go wrong.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-surgery-warning-signs/',
    slug: 'breast-surgery-warning-signs',
    section: 'surgical',
    group: 'procedures',
    h1: 'After Breast Surgery or Injection: Warning Signs That Need Urgent Attention',
    cardTitle: 'Urgent warning signs',
    seoTitle: 'Warning Signs After Breast Surgery or Injection | Quantum Health',
    seoDescription: 'Know the symptoms after breast surgery, fat transfer or injections that need urgent medical care, and what to do next.',
    bannerLead: 'Most recoveries go as expected, but some symptoms need prompt assessment. This page is general information, not a substitute for your surgical team’s instructions.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, complications and warning signs.'],
      ['/breast-implant-safety/', 'Breast implant safety', 'Rupture, contracture, ALCL and monitoring.'],
      ['/surgical/capsular-contracture/', 'Capsular contracture', 'A later cause of firmness or pain.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">If in doubt, call your surgical team or seek emergency care. A prompt call is better than waiting to see if a symptom passes.</p>' +
          '<h2>Seek emergency care now if you have</h2>' +
          '<ul><li>Chest pain, difficulty breathing or coughing blood, which can signal a blood clot in the lungs</li><li>Fainting, extreme dizziness or confusion</li><li>Rapid, painful swelling of one breast, which may mean bleeding</li><li>Signs of severe allergic reaction, such as swelling of the face or throat</li></ul>' +
          '<h2>Contact your surgeon or a doctor urgently if you notice</h2>' +
          '<ul><li>Fever or chills</li><li>Spreading redness, warmth or pus from a wound</li><li>Increasing pain that is not controlled with prescribed medicine</li><li>A wound opening</li><li>Swelling, pain or redness in one calf, which can signal a clot</li><li>Skin turning dark, pale, blue or blistered</li><li>An implant that seems to have moved, or a sudden change in shape or size</li></ul>' +
          '<h2>After injections into the breast</h2>' +
          '<ul><li>Severe pain or skin colour change soon after the injection</li><li>Hard, tender or growing lumps</li><li>Redness, heat or discharge</li></ul>' +
          '<p>Tell clinicians exactly what was injected, if you know.</p>' +
          '<h2>Late problems</h2>' +
          '<p>Symptoms can also appear months or years later, such as new swelling of one breast, a firm breast, a lump or pain. See our pages on <a href="/surgical/capsular-contracture/">capsular contracture</a> and <a href="/surgical/bia-alcl-implant-illness/">BIA-ALCL</a>.</p>' +
          '<h2>Be prepared</h2>' +
          '<ul><li>Save your surgeon’s and the facility’s emergency number</li><li>Know the nearest hospital with emergency services</li><li>Keep your implant card and a list of your medicines</li><li>Ask before surgery who you should contact after hours</li></ul>'
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Act early. A prompt call is better than waiting to see if a symptom passes. See <a href="/breast-enlargement-safety/">breast enlargement safety</a>.'
      }
    ]
  })
];

module.exports = { expandedPages: pages.concat(surgicalSubpages) };
