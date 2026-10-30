'use strict';

/*
 * Non-surgical sub-pages, batch 3: thirty supporting pages for six established
 * parent guides (without surgery, non-surgical enhancement, fillers, threads,
 * mono threads and PRP).
 *
 * Editorial status: draft for qualified clinical review. The pages describe
 * intended effects and limitations rather than promised outcomes. Regulatory
 * wording is deliberately general and must be checked against current Indian
 * medical-device and advertising rules before publication.
 *
 * Word counts are approximately 330-380 words per page, excluding the key
 * takeaway and related-card navigation.
 */

const { siteImages } = require('./site-images');

function page(data) {
  const image = siteImages[data.imageKey];
  if (!image) throw new Error('Unknown image for non-surgical sub-page: ' + data.imageKey);
  const { imageKey, ...rest } = data;
  return {
    ...rest,
    bannerImage: image.src,
    bannerWidth: image.width,
    bannerHeight: image.height,
    bannerAlt: data.bannerAlt || 'Educational illustration for ' + data.h1
  };
}

const prose = (html) => ({ type: 'prose', html });
const takeaway = (text, icon = 'info') => ({ type: 'notice', icon, title: 'Key takeaway', text });
const comparison = ({ eyebrow, heading, lead, head, rows, note }) => ({
  type: 'table', eyebrow, heading, lead, head, rows, note
});

const withoutSurgery = [
  page({
    url: '/non-surgical/what-breast-enlargement-means/',
    slug: 'what-breast-enlargement-means',
    section: 'non-surgical',
    group: 'without-surgery',
    parentUrl: '/breast-enlargement-without-surgery/',
    parentTitle: 'Breast Enlargement Without Surgery',
    h1: 'What Does "Breast Enlargement" Actually Mean? Volume vs Appearance',
    cardTitle: 'Volume vs appearance',
    cardText: 'Why a change in appearance is not the same as added breast volume.',
    seoTitle: 'What Does Breast Enlargement Mean? Volume vs Appearance | Quantum Health',
    seoDescription: 'The difference between a real increase in breast volume and a temporary change in how the breasts look, and why it matters when judging claims.',
    bannerLead: 'Some approaches add tissue; others change only how the breasts look. The difference matters when you judge a claim.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The parent evidence guide and method scorecard.'],
      ['/non-surgical/appearance-vs-volume/', 'Appearance vs volume', 'Why many non-surgical results are temporary.'],
      ['/non-surgical/reading-the-evidence/', 'Reading the evidence', 'How to judge studies, reviews and testimonials.']
    ],
    blocks: [
      prose(
        '<p class="lead">When people search for breast enlargement without surgery, they may mean very different things. Separating them makes it easier to judge what a treatment can honestly offer. This page is part of the guide to <a href="/breast-enlargement-without-surgery/">breast enlargement without surgery</a>.</p>' +
        '<h2>Real increase in volume</h2>' +
        '<p>This means more tissue, either fat, glandular tissue or an implanted material. Only a few medical procedures are designed to do this, and most involve surgery.</p>' +
        '<h2>Change in appearance</h2>' +
        '<p>Some approaches change how breasts look without adding tissue:</p>' +
        '<ul><li>Padded or shaped bras</li><li>Posture changes</li><li>Swelling or temporary fluid after an injection</li><li>Skin tightening or smoothing</li><li>Improved muscle tone in the chest</li></ul>' +
        '<p>These can be real and pleasing, but they are not growth.</p>' +
        '<h2>Why the difference matters</h2>' +
        '<p>A before-and-after photo can show a change in shape or lighting without any lasting change in volume. A short-lived swelling can look like a result in the first days. Ask what has changed in the breast itself: tissue, fluid, posture, clothing or image. If the answer is unclear, treat the claim as unproven.</p>' +
        '<h2>Questions to ask any provider</h2>' +
        '<ul><li>Does this add tissue, or change appearance?</li><li>How is the change measured, and by whom?</li><li>How long does it last?</li><li>What is the evidence, and where is it published?</li></ul>' +
        '<h2>Temporary vs lasting</h2>' +
        '<p>Temporary does not mean worthless, if you are told clearly and the risk is low. Problems arise when something temporary is sold as permanent, or when a high-risk procedure is used for a short-lived effect.</p>'
      ),
      takeaway('Ask whether a treatment changes volume or only appearance. The honest answer shapes everything else.')
    ]
  }),

  page({
    url: '/non-surgical/bras-posture-clothing/',
    slug: 'bras-posture-clothing',
    section: 'non-surgical',
    group: 'without-surgery',
    parentUrl: '/breast-enlargement-without-surgery/',
    parentTitle: 'Breast Enlargement Without Surgery',
    h1: 'Bras, Posture and Clothing: Non-Medical Ways to Change How Breasts Look',
    cardTitle: 'Bras, posture and clothing',
    cardText: 'Low-risk ways to change how the bust looks through fit, posture and clothing.',
    seoTitle: 'Bras, Posture and Clothing: Changing How Breasts Look | Quantum Health',
    seoDescription: 'Practical, low-risk ways to change the appearance of your bust through bra fit, posture and clothing, and why fit matters for comfort.',
    bannerLead: 'These options carry no medical risk. They do not change breast tissue, but they can change how you look and feel.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The parent guide to what works and what does not.'],
      ['/non-surgical/what-breast-enlargement-means/', 'Volume vs appearance', 'The difference between tissue growth and a visual change.'],
      ['/breast-enhancement-comparison/', 'Breast enhancement options compared', 'How surgical and non-surgical options differ.']
    ],
    blocks: [
      prose(
        '<p class="lead">If you want to change how your breasts look without a medical procedure, there are options with no medical risk. They do not change tissue but may change how you look and feel. This page sits within our guide to <a href="/breast-enlargement-without-surgery/">breast enlargement without surgery</a>.</p>' +
        '<h2>Bra fit</h2>' +
        '<p>Many people wear the wrong size. A poorly fitting bra can flatten, spread or lower the breasts and cause discomfort. A professional fitting, repeated when your body changes, can make a visible difference. Signs of a good fit include a band that stays level, cups without gaps or spill, and straps that do not dig.</p>' +
        '<h2>Types of bra</h2>' +
        '<ul><li>Padded and push-up bras add shape and fullness</li><li>Balconette and plunge styles change the neckline and cleavage</li><li>Sports bras support the breasts during exercise</li><li>Adhesive or silicone inserts shape the bust under clothing</li></ul>' +
        '<p>Choose comfort and avoid anything that causes pain, skin damage or breathing difficulty.</p>' +
        '<h2>Posture</h2>' +
        '<p>Standing tall with relaxed shoulders can make the chest look fuller and more open. Prolonged slouching rounds the shoulders and can make breasts look smaller. Physiotherapy or posture exercises may help if you have discomfort.</p>' +
        '<h2>Chest exercises</h2>' +
        '<p>Exercises such as presses and push-ups build the pectoral muscles under the breast. This can improve upper-chest definition but does not increase breast tissue.</p>' +
        '<h2>Clothing choices</h2>' +
        '<p>Necklines, fabrics, layers and cuts affect how the bust looks. A tailor or stylist can help.</p>' +
        '<h2>Skin care</h2>' +
        '<p>Sun protection and moisturising support skin health, though they do not change size.</p>'
      ),
      takeaway('A well-fitted bra and good posture are the safest ways to change how breasts look. See <a href="/breast-enhancement-comparison/">breast enhancement options compared</a>.')
    ]
  }),

  page({
    url: '/non-surgical/hormones-breast-size/',
    slug: 'hormones-breast-size',
    section: 'non-surgical',
    group: 'without-surgery',
    parentUrl: '/breast-enlargement-without-surgery/',
    parentTitle: 'Breast Enlargement Without Surgery',
    h1: 'Hormones and Natural Breast Size: What Is Known',
    cardTitle: 'Hormones and breast size',
    cardText: 'How genetics, hormones and life stages shape size, and why self-prescribing is unsafe.',
    seoTitle: 'Hormones and Natural Breast Size: What Is Known | Quantum Health',
    seoDescription: 'How hormones, genetics and life stages shape natural breast size, and why hormone products are not a safe route to enlargement.',
    bannerLead: 'Natural size is largely determined by genes, hormones and life stage. Hormone products are not a safe do-it-yourself route to enlargement.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The parent guide to evidence and safety.'],
      ['/non-surgical/creams-pills-massage/', 'Creams, pills and massage', 'What the evidence says about over-the-counter products.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, risks and when to seek medical advice.']
    ],
    blocks: [
      prose(
        '<p class="lead">Breast size is influenced by several factors, many outside your control. This page is part of our guide to <a href="/breast-enlargement-without-surgery/">breast enlargement without surgery</a>.</p>' +
        '<h2>What shapes breast size</h2>' +
        '<ul><li><strong>Genetics:</strong> family patterns influence size and shape</li><li><strong>Puberty:</strong> oestrogen and other hormones drive development, which usually finishes by early adulthood</li><li><strong>Body fat:</strong> breasts contain fat, so overall body fat matters</li><li><strong>Pregnancy and breastfeeding:</strong> breasts often enlarge and then change shape</li><li><strong>Menstrual cycle:</strong> many people notice cyclical fullness and tenderness</li><li><strong>Menopause:</strong> glandular tissue declines and fat share rises</li><li><strong>Medicines and conditions:</strong> some can affect breast size</li></ul>' +
        '<h2>Hormone products and enlargement</h2>' +
        '<p>Hormones are prescribed for medical reasons under supervision. Using hormone-containing creams, pills or injections to enlarge breasts without medical advice can cause side effects and may be unsafe, especially for people with hormone-sensitive conditions, clotting risks or a family history of certain cancers. There is no approved, reliable hormone treatment for cosmetic enlargement in otherwise healthy adults.</p>' +
        '<h2>Supplements</h2>' +
        '<p>See our page on <a href="/non-surgical/creams-pills-massage/">creams, pills and massage</a> for what the evidence shows.</p>' +
        '<h2>When to see a doctor</h2>' +
        '<ul><li>Breasts that have not developed by the expected age</li><li>A sudden change in size in one or both breasts</li><li>Lumps, discharge or skin changes</li><li>Irregular periods or other hormonal symptoms</li></ul>' +
        '<p>A doctor can check for underlying causes and discuss safe options. Do not self-prescribe hormones or buy unregulated products online.</p>'
      ),
      takeaway('Natural size is largely determined by genes, hormones and life stage. Avoid self-prescribing hormones.')
    ]
  }),

  page({
    url: '/non-surgical/weight-breast-size/',
    slug: 'weight-breast-size',
    section: 'non-surgical',
    group: 'without-surgery',
    parentUrl: '/breast-enlargement-without-surgery/',
    parentTitle: 'Breast Enlargement Without Surgery',
    h1: 'Weight, Body Fat and Breast Size',
    cardTitle: 'Weight and breast size',
    cardText: 'Why weight change affects breasts unpredictably and cannot target enlargement.',
    seoTitle: 'Weight, Body Fat and Breast Size | Quantum Health',
    seoDescription: 'How gaining or losing weight changes breast size and shape, and why weight change is not a targeted or controllable way to enlarge breasts.',
    bannerLead: 'Breasts contain fat, so weight affects them. But the change is unpredictable and cannot be directed to the breasts.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The parent evidence guide.'],
      ['/non-surgical/hormones-breast-size/', 'Hormones and breast size', 'The other main influence on natural size.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'A surgical option that uses your own fat.']
    ],
    blocks: [
      prose(
        '<p class="lead">Breasts are made of glandular tissue and fat, so body weight affects them. This page is part of our guide to <a href="/breast-enlargement-without-surgery/">breast enlargement without surgery</a>.</p>' +
        '<h2>Weight gain</h2>' +
        '<p>Gaining weight often increases breast volume because fat is stored in the breast. But fat is also gained elsewhere, and where it goes is largely determined by genetics and hormones. You cannot choose to gain weight only in the breasts.</p>' +
        '<h2>Weight loss</h2>' +
        '<p>Losing weight often reduces breast size, particularly in people whose breasts are mostly fat. Skin may also lose volume and elasticity, leading to a change in shape or sagging.</p>' +
        '<h2>Weight fluctuation</h2>' +
        '<p>Repeated weight gain and loss can stretch skin and affect breast shape. Rapid change can leave the skin loose.</p>' +
        '<h2>Why gaining weight to enlarge breasts is not advisable</h2>' +
        '<ul><li>Results are unpredictable</li><li>It affects health, including blood pressure, blood sugar and joint load</li><li>Breast changes may not match your goal</li><li>Loss of weight later can reverse the effect</li></ul>' +
        '<h2>If you have a medical reason to change weight</h2>' +
        '<p>A doctor or dietitian can support healthy change. Surgeons often prefer a stable weight before breast surgery, because results are more predictable. If you are considering an operation, read about <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer</a> and the wider surgical options before deciding.</p>' +
        '<h2>Breast size and exercise</h2>' +
        '<p>Chest exercises do not increase breast tissue but can affect the look of the upper chest. Intense exercise combined with low body fat may reduce breast size.</p>' +
        '<h2>Planning surgery</h2>' +
        '<p>If you may gain or lose weight soon, discuss timing with your surgeon. Stable weight is easier to plan around than a moving target.</p>'
      ),
      takeaway('Weight affects breast size in unpredictable ways, and it is not a safe tool for targeted enlargement.')
    ]
  }),

  page({
    url: '/non-surgical/unhappy-breast-size/',
    slug: 'unhappy-breast-size',
    section: 'non-surgical',
    group: 'without-surgery',
    parentUrl: '/breast-enlargement-without-surgery/',
    parentTitle: 'Breast Enlargement Without Surgery',
    h1: 'Feeling Unhappy About Your Breast Size: Understanding the Feeling and Choosing Next Steps',
    cardTitle: 'When you feel unhappy',
    cardText: 'How to think about dissatisfaction with breast size and choose a safe next step.',
    seoTitle: 'Unhappy With Your Breast Size: Next Steps | Quantum Health',
    seoDescription: 'Support for people who feel unhappy about breast size, including how to think about the feeling, what helps and when to seek advice.',
    bannerLead: 'Many people feel dissatisfied with their breasts at some point. That is common and nothing to be ashamed of.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The parent guide to options and evidence.'],
      ['/non-surgical/bras-posture-clothing/', 'Bras, posture and clothing', 'Low-risk ways to change appearance.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, risks and warning signs.']
    ],
    blocks: [
      prose(
        '<p class="lead">Many people feel dissatisfied with their breasts at some point. That is common and nothing to be ashamed of. How you respond matters. This page is part of our guide to <a href="/breast-enlargement-without-surgery/">breast enlargement without surgery</a>.</p>' +
        '<h2>Where the feeling comes from</h2>' +
        '<p>Media, social comparisons, comments from others, life changes such as pregnancy or weight loss, and personal history can all play a part. Filters and edited images create unrealistic standards. It can help to notice when the feeling is strongest and what is happening around you at the time.</p>' +
        '<h2>Pause before acting</h2>' +
        '<p>A few questions can help:</p>' +
        '<ul><li>What exactly bothers me, and in which situations?</li><li>Would I feel the same if no one else saw my body?</li><li>Am I considering a change for myself or for someone else?</li><li>Have I had this feeling for a long time or is it recent?</li></ul>' +
        '<h2>Low-risk steps to try first</h2>' +
        '<ul><li>Professional bra fitting</li><li>Clothing that suits your body</li><li>Talking to someone you trust</li><li>Limiting exposure to social media that makes you feel worse</li></ul>' +
        '<h2>When to talk to a professional</h2>' +
        '<p>If you feel intense distress, preoccupation with your appearance, avoid social situations or spend a lot of time checking or hiding your body, speak to a doctor or mental health professional. These may be signs of a condition such as body dysmorphic disorder, which is treatable and which surgery generally does not relieve.</p>' +
        '<h2>If you are considering a procedure</h2>' +
        '<p>See a qualified, registered clinician, ask about alternatives including doing nothing, and take time. There is no deadline that justifies a rushed decision. Read our <a href="/breast-enlargement-safety/">breast enlargement safety</a> guidance before consenting to anything.</p>'
      ),
      takeaway('Your feelings are valid. Decisions about your body are best made calmly, with accurate information and support.')
    ]
  })
];

const enhancement = [
  page({
    url: '/non-surgical/treatments-at-a-glance/',
    slug: 'treatments-at-a-glance',
    section: 'non-surgical',
    group: 'enhancement',
    parentUrl: '/non-surgical/',
    parentTitle: 'Non-Surgical Breast Enhancement',
    h1: 'Non-Surgical Breast Treatments at a Glance: What Each Is Intended to Do',
    cardTitle: 'Treatments at a glance',
    cardText: 'What fillers, threads, mono threads, PRP and biostimulators are intended to do.',
    seoTitle: 'Non-Surgical Breast Treatments at a Glance | Quantum Health',
    seoDescription: 'A plain overview of fillers, threads, PRP, biostimulators and regenerative approaches, what each is designed for and the main limitation of each.',
    bannerLead: 'Each non-surgical option has a different purpose. None is a proven substitute for implants or fat transfer.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical breast enhancement', 'The parent guide to options, evidence and safety.'],
      ['/breast-enhancement-comparison/', 'Breast enhancement options compared', 'How all the main options differ.'],
      ['/non-surgical/reading-the-evidence/', 'Reading the evidence', 'What counts as useful evidence for a treatment claim.']
    ],
    blocks: [
      prose(
        '<p class="lead">This page summarises the treatments discussed on our site. Details are on each dedicated page. It is part of our guide to <a href="/non-surgical/">non-surgical breast enhancement</a>.</p>'
      ),
      comparison({
        eyebrow: 'At a glance',
        heading: 'What each treatment is intended to do',
        head: ['Treatment', 'Intended effect', 'Main limitation for breast enlargement'],
        rows: [
          ['<strong>Dermal fillers</strong>', 'Add volume in approved areas, usually the face', 'Not approved for breast enlargement; safety concerns'],
          ['<strong>Thread procedures</strong>', 'Mechanical lifting or skin support', 'Not designed to add significant volume'],
          ['<strong>Mono threads</strong>', 'Stimulate skin collagen', 'Effect on breast volume not established'],
          ['<strong>PRP</strong>', 'Promote healing using concentrated platelets', 'No robust evidence of breast enlargement'],
          ['<strong>Sculptra and PLLA</strong>', 'Stimulate collagen over time', 'Approved uses are specific; breast use unproven'],
          ['<strong>Stem cell approaches</strong>', 'Regenerative research', 'Not an established enlargement treatment']
        ],
        note: 'Approval and availability differ by product and country. A treatment being non-surgical does not make it effective or safe.'
      }),
      prose(
        '<h2>How to read the table</h2>' +
        '<p>None of these has the same evidence, or the same ability to change volume, as implants or fat transfer. A treatment being non-surgical does not make it effective or safe.</p>' +
        '<h2>What they may offer</h2>' +
        '<p>Some may produce a small, temporary change in appearance or skin quality. Some are used for other purposes in the body with better evidence. That does not establish a benefit in the breast.</p>' +
        '<h2>What to ask</h2>' +
        '<ul><li>What is this specific treatment intended to do?</li><li>Is it approved for this area and use?</li><li>What does the research show?</li><li>What are the risks?</li></ul>'
      ),
      takeaway('Each non-surgical option has a different purpose. See <a href="/breast-enhancement-comparison/">breast enhancement options compared</a>.')
    ]
  }),

  page({
    url: '/non-surgical/appearance-vs-volume/',
    slug: 'appearance-vs-volume',
    section: 'non-surgical',
    group: 'enhancement',
    parentUrl: '/non-surgical/',
    parentTitle: 'Non-Surgical Breast Enhancement',
    h1: 'Appearance vs Volume: Why Many Non-Surgical Results Are Temporary',
    cardTitle: 'Appearance vs volume',
    cardText: 'Why a short-term visual change is not evidence of lasting breast volume.',
    seoTitle: 'Appearance vs Volume: Why Results Are Temporary | Quantum Health',
    seoDescription: 'Why some non-surgical breast treatments may change how the breasts look briefly without adding lasting volume, and how to avoid being misled.',
    bannerLead: 'A change seen days after a procedure is not proof of a lasting result.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical breast enhancement', 'The parent guide to claims, evidence and safety.'],
      ['/non-surgical/what-breast-enlargement-means/', 'Volume vs appearance', 'The basic difference between growth and a visual effect.'],
      ['/non-surgical/treatments-at-a-glance/', 'Treatments at a glance', 'What each non-surgical treatment is intended to do.']
    ],
    blocks: [
      prose(
        '<p class="lead">People sometimes see a change soon after a non-surgical treatment and assume it is lasting. Several things can explain a short-term change. This page is part of our guide to <a href="/non-surgical/">non-surgical breast enhancement</a>.</p>' +
        '<h2>Swelling and fluid</h2>' +
        '<p>Injections and procedures cause temporary swelling that makes the area look fuller. It fades over days or weeks. A photograph taken during this window can overstate the result.</p>' +
        '<h2>Product that is absorbed</h2>' +
        '<p>Many injectable or suture materials are designed to be absorbed by the body. Any effect connected to the material fades as it dissolves.</p>' +
        '<h2>Skin changes</h2>' +
        '<p>Some treatments aim to improve skin quality or texture, which can change the look of the skin without altering underlying volume.</p>' +
        '<h2>Photography and positioning</h2>' +
        '<p>Lighting, angle, posture, bras, make-up and editing can all alter apparent size. Photos taken under different conditions are not reliable evidence. Ask for standardised images taken at the same distance and in the same position.</p>' +
        '<h2>Placebo and expectation</h2>' +
        '<p>People who expect a result may perceive one. This is why controlled studies matter.</p>' +
        '<h2>Measuring change properly</h2>' +
        '<p>Reliable assessment uses standard photographs, measurements or 3D imaging at fixed times, and independent evaluation. A clinic assessing its own results without a comparison group cannot show that the treatment caused the change.</p>' +
        '<h2>What to ask a provider</h2>' +
        '<ul><li>How is the result measured?</li><li>How long does it last, according to published data?</li><li>Can I see results at 6 and 12 months, not only days after treatment?</li></ul>'
      ),
      takeaway('Judge any result at several months, not days after a procedure.')
    ]
  }),

  page({
    url: '/non-surgical/reading-the-evidence/',
    slug: 'reading-the-evidence',
    section: 'non-surgical',
    group: 'enhancement',
    parentUrl: '/non-surgical/',
    parentTitle: 'Non-Surgical Breast Enhancement',
    h1: 'How to Read the Evidence on Non-Surgical Breast Treatments',
    cardTitle: 'Reading the evidence',
    cardText: 'How to tell stronger studies from anecdotes and marketing claims.',
    seoTitle: 'How to Read Evidence on Non-Surgical Breast Treatments | Quantum Health',
    seoDescription: 'A practical guide to judging studies, reviews and testimonials on non-surgical breast enlargement, including common weaknesses.',
    bannerLead: 'Claims often cite studies, but studies vary widely in quality. The questions below help you tell the difference.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical breast enhancement', 'The parent guide to the evidence and safety of each option.'],
      ['/research/', 'Breast enlargement research library', 'Study findings, limitations and original publications.'],
      ['/references/', 'Clinical studies and references', 'External source material for the topics discussed here.']
    ],
    blocks: [
      prose(
        '<p class="lead">Claims about non-surgical breast treatments often cite studies, but studies vary widely in quality. This page is part of our guide to <a href="/non-surgical/">non-surgical breast enhancement</a>.</p>' +
        '<h2>Stronger evidence</h2>' +
        '<ul><li>Randomised controlled trials with a comparison group</li><li>Large numbers of participants</li><li>Independent measurement of results</li><li>Long follow-up, at least a year</li><li>Systematic reviews of multiple studies</li><li>Publication in recognised peer-reviewed journals</li></ul>' +
        '<h2>Weaker evidence</h2>' +
        '<ul><li>Case reports and small series</li><li>No control group</li><li>Short follow-up</li><li>Results measured by the person selling the treatment</li><li>Studies funded by the manufacturer without independent review</li><li>Animal or laboratory research presented as proof in people</li><li>Testimonials and before-and-after photos</li></ul>' +
        '<h2>Questions to ask about a study</h2>' +
        '<ul><li>Who was studied, and how many?</li><li>What was measured, and how?</li><li>How long were people followed?</li><li>Were there side effects, and how were they reported?</li><li>Who funded it?</li></ul>' +
        '<h2>Use from a different body area</h2>' +
        '<p>A treatment studied for the face or skin does not automatically work or stay safe in the breast. Anatomy, tissue behaviour and the consequences of complications differ.</p>' +
        '<h2>Where to look</h2>' +
        '<p>Our <a href="/research/">research library</a> and <a href="/references/">references page</a> link to original sources. Read the abstract and the limitations, not only the conclusion. If a clinic cannot point to independent evidence for breast use, that absence is important information.</p>'
      ),
      takeaway('Look for independent, controlled, long-term evidence in the breast itself. Absence of it is information too.')
    ]
  }),

  page({
    url: '/non-surgical/regulatory-status/',
    slug: 'regulatory-status',
    section: 'non-surgical',
    group: 'enhancement',
    parentUrl: '/non-surgical/',
    parentTitle: 'Non-Surgical Breast Enhancement',
    h1: 'Approved Use vs Off-Label Use: Understanding Regulatory Status',
    cardTitle: 'Approved vs off-label',
    cardText: 'What approval means, why it is tied to a specific use, and what to verify.',
    seoTitle: 'Approved vs Off-Label Use: Regulatory Status | Quantum Health',
    seoDescription: 'What it means for a product to be approved, cleared or used off-label, and why it matters for non-surgical breast treatments.',
    bannerLead: 'A product being approved somewhere does not tell you what it is approved for. The intended use is the detail that matters.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical breast enhancement', 'The parent guide to individual treatments and limits.'],
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'Why facial approval does not cover breast use.'],
      ['/non-surgical/breast-threads/', 'Breast threads', 'How suture products are used outside their usual purpose.']
    ],
    blocks: [
      prose(
        '<p class="lead">Many non-surgical breast treatments use products approved for something else. Knowing the difference helps you ask better questions. This page is part of our guide to <a href="/non-surgical/">non-surgical breast enhancement</a>.</p>' +
        '<h2>What approval means</h2>' +
        '<p>Regulators assess a product for a specific purpose, in a specific body area, using specific evidence of safety and performance. Approval is tied to that intended use.</p>' +
        '<h2>Approved, cleared and registered</h2>' +
        '<p>Terms differ by country. In some systems a product is "approved" after detailed review; in others it is "cleared" as similar to an existing device, or simply "registered". These carry different levels of scrutiny. In India, medical devices fall under the Medical Devices Rules overseen by the CDSCO; ask which category and registration applies to the exact product and verify it independently.</p>' +
        '<h2>Off-label use</h2>' +
        '<p>Doctors may legally use some products for purposes other than those approved, when they judge it appropriate. Off-label does not automatically mean unsafe, but it means the specific use has not been reviewed by the regulator, so evidence of safety and benefit may be limited.</p>' +
        '<h2>Why it matters for breasts</h2>' +
        '<p>A filler approved for lips or cheeks has not been shown safe or effective in the breast. A thread cleared as a suture has not necessarily been shown to enlarge or lift the breast. A product being approved "in the country" does not tell you for what. Read more about <a href="/non-surgical/dermal-fillers/">breast fillers</a> and <a href="/non-surgical/breast-threads/">breast threads</a>.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>Is this exact product approved or registered for this use?</li><li>Can I see the documentation, product name and batch number?</li><li>If it is off-label, why do you recommend it, and what evidence supports it?</li><li>Will I be asked to sign a specific consent form?</li></ul>' +
        '<h2>Red flags</h2>' +
        '<ul><li>Vague answers about the product</li><li>Products that are unbranded or imported without documents</li><li>Claims such as "FDA approved" with no detail</li></ul>'
      ),
      takeaway('Approval is specific to a purpose. Ask what the product is approved for, not just whether it is approved.')
    ]
  }),

  page({
    url: '/non-surgical/questions-red-flags/',
    slug: 'questions-red-flags',
    section: 'non-surgical',
    group: 'enhancement',
    parentUrl: '/non-surgical/',
    parentTitle: 'Non-Surgical Breast Enhancement',
    h1: 'Questions to Ask Before Any Non-Surgical Breast Treatment, and Red Flags',
    cardTitle: 'Questions and red flags',
    cardText: 'A practical consultation checklist and the warning signs that should make you pause.',
    seoTitle: 'Questions and Red Flags Before Breast Treatment | Quantum Health',
    seoDescription: 'A practical checklist of questions to ask a clinic offering non-surgical breast treatments, and the warning signs that should make you pause.',
    bannerLead: 'Use this checklist at a consultation. A trustworthy provider welcomes questions.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical breast enhancement', 'The parent guide to treatments and safety.'],
      ['/non-surgical/regulatory-status/', 'Approved vs off-label', 'How to check what a product is approved for.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, complications and warning signs.']
    ],
    blocks: [
      prose(
        '<p class="lead">Use this checklist at a consultation. A trustworthy provider welcomes questions. This page is part of our guide to <a href="/non-surgical/">non-surgical breast enhancement</a>.</p>' +
        '<h2>About the treatment</h2>' +
        '<ul><li>What exactly is it intended to do for the breast?</li><li>What is the evidence for breast use, and where is it published?</li><li>How long do results last, and how is that known?</li><li>What are the risks, and how are complications treated?</li><li>What are the alternatives, including doing nothing?</li></ul>' +
        '<h2>About the product</h2>' +
        '<ul><li>What is the product name, manufacturer and batch number?</li><li>Is it approved or registered for this use?</li><li>Is it absorbable? If so, what happens as it dissolves?</li></ul>' +
        '<h2>About the clinician</h2>' +
        '<ul><li>What are your registration and specialist qualifications?</li><li>How many of these treatments have you done in the breast?</li><li>Who treats complications, and where?</li></ul>' +
        '<h2>About the setting</h2>' +
        '<ul><li>Is this a licensed medical facility?</li><li>What emergency arrangements exist?</li><li>How do I contact you out of hours?</li></ul>' +
        '<h2>About costs and consent</h2>' +
        '<ul><li>What is included in the price, and what is not?</li><li>Will I get written information and time to decide?</li></ul>' +
        '<h2>Red flags</h2>' +
        '<ul><li>Guaranteed results or cup-size promises</li><li>Pressure to book or pay quickly, or time-limited discounts</li><li>Reluctance to name the product</li><li>Before-and-after photos that cannot be verified</li><li>No medical history taken</li><li>Treatment offered outside a medical setting</li><li>Claims that it is "risk-free", "natural" or "permanent"</li></ul>' +
        '<h2>Take your time</h2>' +
        '<p>You can leave, think and get another opinion. Read <a href="/breast-enlargement-safety/">breast enlargement safety</a> for warning signs and complaint routes.</p>'
      ),
      takeaway('If you cannot get clear answers, walk away.')
    ]
  })
];

const fillers = [
  page({
    url: '/non-surgical/hyaluronic-acid-fillers/',
    slug: 'hyaluronic-acid-fillers',
    section: 'non-surgical',
    group: 'fillers',
    parentUrl: '/non-surgical/dermal-fillers/',
    parentTitle: 'Breast Fillers',
    h1: 'Hyaluronic Acid Fillers: What They Are and What They Are Approved For',
    cardTitle: 'Hyaluronic acid fillers',
    cardText: 'How HA fillers work, their approved uses and why breast use is different.',
    seoTitle: 'Hyaluronic Acid Fillers: Uses and Limits | Quantum Health',
    seoDescription: 'What hyaluronic acid fillers are, how they work, their usual approved uses and why those approvals do not extend to breast enlargement.',
    bannerLead: 'HA fillers add temporary volume where they are approved. Breast enlargement is not one of those approved uses.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to evidence, regulation and safety.'],
      ['/non-surgical/filler-complications/', 'Filler complications', 'Lumps, infection, migration and other risks.'],
      ['/non-surgical/fillers-options-compared/', 'Fillers vs other options', 'How fillers compare with fat transfer and implants.']
    ],
    blocks: [
      prose(
        '<p class="lead">Hyaluronic acid (HA) is a substance found naturally in the body that attracts and holds water. HA fillers are gels made from a modified form, injected to add volume or fill lines. This page is part of our guide to <a href="/non-surgical/dermal-fillers/">breast fillers</a>.</p>' +
        '<h2>How they work</h2>' +
        '<p>The gel sits under the skin and adds volume directly, and it binds water. The body gradually breaks it down, so effects are temporary, commonly lasting months to a couple of years depending on the product and area.</p>' +
        '<h2>Typical approved uses</h2>' +
        '<p>Approvals vary by product and country, but typically include facial areas such as lips, cheeks, nasolabial folds and under-eye hollows, and in some cases hands. Approval is based on studies in those areas.</p>' +
        '<h2>Why this does not cover breasts</h2>' +
        '<p>Breast tissue is much larger, softer, and more complex. Studies supporting facial use do not show safety or effectiveness in breast enlargement. A product may be sold in a country but still not be approved for breast use.</p>' +
        '<h2>Dissolvable</h2>' +
        '<p>HA fillers can be broken down by an enzyme called hyaluronidase, which is one of their advantages. This applies only to HA products and does not apply to other filler materials. Even when a product can be dissolved, large-volume injections can leave inflammation, lumps or contour problems that need further treatment.</p>' +
        '<h2>Other filler types</h2>' +
        '<p>Other fillers use different materials, such as calcium hydroxylapatite or poly-L-lactic acid, with different behaviours. Some are semi-permanent or permanent.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>What is the exact product, and is it HA?</li><li>What is it approved for?</li><li>What would happen if I needed it removed?</li></ul>'
      ),
      takeaway('Fillers approved for the face are not proven for breast use.')
    ]
  }),

  page({
    url: '/non-surgical/why-breast-fillers-differ/',
    slug: 'why-breast-fillers-differ',
    section: 'non-surgical',
    group: 'fillers',
    parentUrl: '/non-surgical/dermal-fillers/',
    parentTitle: 'Breast Fillers',
    h1: 'Why the Breast Is Not Like the Face: Volume, Spread and Safety',
    cardTitle: 'Why breasts are different',
    cardText: 'The scale, movement and screening consequences that make breast filler use higher risk.',
    seoTitle: 'Why the Breast Is Not Like the Face: Filler Safety | Quantum Health',
    seoDescription: 'The practical and safety reasons why injectable fillers designed for the face are difficult to use for breast enlargement.',
    bannerLead: 'Face and breast are very different places to inject. The scale of the breast changes the risk.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to approved uses and safety.'],
      ['/non-surgical/hyaluronic-acid-fillers/', 'Hyaluronic acid fillers', 'What HA products are and what they are approved for.'],
      ['/non-surgical/fillers-and-screening/', 'Fillers and screening', 'How injected material can affect mammograms.']
    ],
    blocks: [
      prose(
        '<p class="lead">Face and breast are very different places to inject. This page is part of our guide to <a href="/non-surgical/dermal-fillers/">breast fillers</a>.</p>' +
        '<h2>The volume problem</h2>' +
        '<p>A filler syringe usually holds around one millilitre. A noticeable breast increase involves volumes many times larger, often hundreds of millilitres per breast, meaning very large quantities of product. This raises costs, risks and the chance of complications.</p>' +
        '<h2>Product spread</h2>' +
        '<p>A soft, large organ allows injected gel to shift or spread with movement, gravity and pressure. Lumps, irregularities and migration are more likely. Unlike a cohesive implant, the material does not stay as a single defined object.</p>' +
        '<h2>Difficulty correcting problems</h2>' +
        '<p>With small amounts, a problem may be easy to treat. With large volumes, treatment is harder and may involve surgery. The material can be deep or dispersed, and not all fillers dissolve.</p>' +
        '<h2>Interference with screening</h2>' +
        '<p>Injected material can appear on mammograms and ultrasound, and may be mistaken for abnormalities or hide real ones. See <a href="/non-surgical/fillers-and-screening/">fillers and screening</a>.</p>' +
        '<h2>Lack of long-term evidence</h2>' +
        '<p>Compared with facial use, little long-term data exist on breast fillers, especially across years of screening and ageing.</p>' +
        '<h2>Professional bodies\' caution</h2>' +
        '<p>Some professional bodies have expressed concerns about large-volume fillers in the breast. Some large-volume HA products once marketed for the breast have faced restrictions or withdrawal in some places.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>How many millilitres would my treatment need?</li><li>What happens if it forms lumps?</li><li>How would it affect my mammograms?</li></ul>'
      ),
      takeaway('The scale and nature of the breast make filler use there a different, higher-risk proposition.')
    ]
  }),

  page({
    url: '/non-surgical/filler-complications/',
    slug: 'filler-complications',
    section: 'non-surgical',
    group: 'fillers',
    parentUrl: '/non-surgical/dermal-fillers/',
    parentTitle: 'Breast Fillers',
    h1: 'Complications of Breast Filler Injections and How They Are Treated',
    cardTitle: 'Filler complications',
    cardText: 'The early and late problems that can follow breast filler injections.',
    seoTitle: 'Complications of Breast Filler Injections | Quantum Health',
    seoDescription: 'The potential complications of breast filler injections, signs to watch for and how doctors may approach treatment.',
    bannerLead: 'Complications range from mild and short-lived to serious and long-lasting.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to evidence and safety.'],
      ['/non-surgical/fillers-and-screening/', 'Fillers and screening', 'Imaging effects and what to tell the radiologist.'],
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'What removal involves and why it can be difficult.']
    ],
    blocks: [
      prose(
        '<p class="lead">Complications range from mild and short-lived to serious and long-lasting. This page is part of our guide to <a href="/non-surgical/dermal-fillers/">breast fillers</a>.</p>' +
        '<h2>Common early effects</h2>' +
        '<p>Bruising, swelling, tenderness and redness are common after any injection and usually settle within days.</p>' +
        '<h2>Possible complications</h2>' +
        '<ul><li><strong>Lumps and nodules:</strong> firm areas that may appear soon after or much later</li><li><strong>Infection:</strong> including abscess, sometimes with delayed onset</li><li><strong>Inflammation or granulomas:</strong> a reaction around the material</li><li><strong>Migration:</strong> product moving from where it was placed</li><li><strong>Asymmetry or irregular contour</strong></li><li><strong>Skin changes</strong> and, rarely, skin damage from compromised blood supply</li><li><strong>Allergic reactions</strong></li><li><strong>Biofilm-related problems:</strong> persistent low-grade infection</li><li><strong>Difficulty with imaging and screening</strong></li></ul>' +
        '<h2>Signs that need prompt attention</h2>' +
        '<p>Severe pain, skin turning pale, blue or dark, spreading redness, fever, rapidly growing lumps or discharge.</p>' +
        '<h2>How doctors may treat it</h2>' +
        '<ul><li>Hyaluronidase to dissolve HA products</li><li>Antibiotics and drainage for infection</li><li>Anti-inflammatory treatment</li><li>Surgery for persistent lumps or non-dissolvable material</li></ul>' +
        '<p>Read more about <a href="/surgical/breast-filler-removal/">breast filler removal</a>.</p>' +
        '<h2>Your part</h2>' +
        '<p>Keep a record of what was injected, tell all clinicians, and report symptoms early. If you do not know the product, say so; imaging and tissue sampling may help identify it.</p>'
      ),
      takeaway('Most problems are better managed when caught early.')
    ]
  }),

  page({
    url: '/non-surgical/fillers-and-screening/',
    slug: 'fillers-and-screening',
    section: 'non-surgical',
    group: 'fillers',
    parentUrl: '/non-surgical/dermal-fillers/',
    parentTitle: 'Breast Fillers',
    h1: 'Breast Fillers and Screening: What Radiologists and Patients Should Know',
    cardTitle: 'Fillers and screening',
    cardText: 'How injected filler can appear on breast imaging and why you must tell the clinic.',
    seoTitle: 'Breast Fillers and Screening: What to Know | Quantum Health',
    seoDescription: 'How injected breast fillers can appear on mammograms, ultrasound and MRI, and why you should tell your imaging team.',
    bannerLead: 'Breast screening is an important health check. Injected material can complicate it.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to evidence, approval and risk.'],
      ['/non-surgical/filler-complications/', 'Filler complications', 'Lumps, infection and other problems to watch for.'],
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'Assessment and treatment of persistent material.']
    ],
    blocks: [
      prose(
        '<p class="lead">Breast screening is an important health check. Injected material can complicate it. This page is part of our guide to <a href="/non-surgical/dermal-fillers/">breast fillers</a>.</p>' +
        '<h2>How fillers can appear</h2>' +
        '<ul><li><strong>Mammography:</strong> some materials look like dense areas, calcifications or masses</li><li><strong>Ultrasound:</strong> collections of gel can look like cysts, with variable appearances</li><li><strong>MRI:</strong> may show collections and inflammation</li></ul>' +
        '<p>Appearances depend on the product, how long ago it was injected and the tissue reaction.</p>' +
        '<h2>The risk of misinterpretation</h2>' +
        '<p>Injected material may be mistaken for a lump or other abnormality, leading to extra tests or biopsies. It could also obscure a genuine abnormality.</p>' +
        '<h2>What to do</h2>' +
        '<ul><li>Tell the clinic and the radiologist exactly what was injected, when and where, before imaging</li><li>Bring any documents</li><li>Ask whether the imaging team has experience with injected breasts</li><li>Keep up with screening recommended for your age and risk</li></ul>' +
        '<h2>Biopsy</h2>' +
        '<p>If a biopsy is needed, say that you have had injections. Sampling through injected material needs careful planning.</p>' +
        '<h2>If you do not know what was injected</h2>' +
        '<p>Say so. Imaging and, if needed, tissue sampling can help characterise it.</p>' +
        '<h2>For clinics</h2>' +
        '<p>A provider should discuss screening implications before any breast injection and record the details for future reference. See <a href="/breast-enlargement-safety/">breast enlargement safety</a> for wider pre-treatment checks.</p>'
      ),
      takeaway('Always tell imaging teams about breast injections. See <a href="/breast-enlargement-safety/">breast enlargement safety</a>.')
    ]
  }),

  page({
    url: '/non-surgical/fillers-options-compared/',
    slug: 'fillers-options-compared',
    section: 'non-surgical',
    group: 'fillers',
    parentUrl: '/non-surgical/dermal-fillers/',
    parentTitle: 'Breast Fillers',
    h1: 'If You Want Fuller Breasts: How Filler Compares With Other Options',
    cardTitle: 'Fillers vs other options',
    cardText: 'A balanced comparison of fillers, fat transfer, implants and non-medical choices.',
    seoTitle: 'Fillers vs Fat Transfer and Implants | Quantum Health',
    seoDescription: 'A balanced comparison of fillers with fat transfer, implants and non-medical options for people seeking a change in breast fullness.',
    bannerLead: 'Compare options by evidence, duration and long-term implications, not only by whether they involve surgery.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to approved uses and serious concerns.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'A surgical option using your own fat.'],
      ['/breast-implants/', 'Breast implants', 'Types, placement and long-term monitoring.']
    ],
    blocks: [
      prose(
        '<p class="lead">If fullness is your goal, it helps to see how options differ. This page is part of our guide to <a href="/non-surgical/dermal-fillers/">breast fillers</a>.</p>' +
        '<h2>Fillers</h2>' +
        '<ul><li>Not approved for breast enlargement</li><li>Temporary or uncertain duration</li><li>Risks of lumps, infection, migration and screening problems</li><li>Large volumes needed, so cost and risk are high</li><li>Limited evidence</li></ul>' +
        '<h2>Fat transfer</h2>' +
        '<ul><li>Uses your own tissue, usually for a modest increase</li><li>Requires liposuction and enough donor fat</li><li>Variable survival of fat; lumps possible</li><li>See <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer</a></li></ul>' +
        '<h2>Implants</h2>' +
        '<ul><li>Designed and regulated for breast enlargement</li><li>More predictable volume change</li><li>Surgical risks, long-term monitoring and possible further surgery</li><li>See <a href="/breast-implants/">breast implants</a></li></ul>' +
        '<h2>Non-medical options</h2>' +
        '<ul><li>Padded bras, clothing and posture</li><li>No medical risk, no change in tissue</li></ul>' +
        '<h2>Choosing</h2>' +
        '<p>The best option depends on your goals, anatomy, health, risk tolerance and willingness to have surgery. A consultation with a registered, qualified clinician can help you compare them. Be wary of any provider who presents a single option as suitable for everyone.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>Which option suits my goals and body?</li><li>What are the long-term commitments?</li><li>What if I am unhappy?</li></ul>'
      ),
      takeaway('Compare options by evidence and long-term implications, not just by whether they involve a knife. See <a href="/breast-enhancement-comparison/">options compared</a>.')
    ]
  })
];

const threads = [
  page({
    url: '/non-surgical/breast-threads-types/',
    slug: 'breast-threads-types',
    section: 'non-surgical',
    group: 'threads',
    parentUrl: '/non-surgical/breast-threads/',
    parentTitle: 'Breast Threads',
    h1: 'What Are Breast Threads? Types, Materials and Intended Purpose',
    cardTitle: 'What breast threads are',
    cardText: 'The materials and designs used in thread procedures, and what they aim to do.',
    seoTitle: 'What Are Breast Threads? Types and Purpose | Quantum Health',
    seoDescription: 'An introduction to thread procedures sometimes offered for the breast, the materials used and what they are designed to do.',
    bannerLead: 'Thread procedures place thin, sterile threads under the skin. Their breast use is largely unproven.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to evidence, recovery and risks.'],
      ['/non-surgical/breast-threads-results/', 'What threads can and cannot do', 'A realistic look at lifting and volume claims.'],
      ['/non-surgical/mono-threads-basics/', 'What mono threads are', 'Smooth threads used mainly for skin quality.']
    ],
    blocks: [
      prose(
        '<p class="lead">Thread procedures place thin, sterile threads under the skin. They have been used in the face and body for lifting or skin support. This page is part of our guide to <a href="/non-surgical/breast-threads/">breast thread procedures</a>.</p>' +
        '<h2>Materials</h2>' +
        '<p>Most absorbable threads are made from polydioxanone (PDO), also used in dissolvable stitches. Others use polylactic acid or polycaprolactone. Non-absorbable threads exist but are used differently.</p>' +
        '<h2>Types</h2>' +
        '<ul><li><strong>Smooth (mono) threads:</strong> designed mainly to stimulate the skin. See <a href="/non-surgical/mono-threads/">mono threads</a></li><li><strong>Barbed or cog threads:</strong> have small barbs or cones designed to grip tissue for a mechanical lifting effect</li><li><strong>Screw or twisted threads:</strong> a spiral shape, often used for a volumising effect in the skin</li></ul>' +
        '<h2>The intended idea</h2>' +
        '<p>Cog threads are placed to hold or lift tissue; the body\'s response around the thread may stimulate collagen. Marketing for breast use often claims lift and enhanced shape.</p>' +
        '<h2>Evidence in the breast</h2>' +
        '<p>Threads were developed and mostly studied for facial and some body use. High-quality evidence for breast enlargement or lift is limited, and threads are not designed to add significant volume.</p>' +
        '<h2>Regulatory status</h2>' +
        '<p>Many threads are cleared or registered as surgical sutures. Approval for aesthetic breast use varies and may be absent. Ask what applies to the product, and read our page on <a href="/non-surgical/regulatory-status/">approved versus off-label use</a>.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>What type and material are the threads?</li><li>What is the intended effect in my breast?</li><li>What evidence exists for breast use?</li></ul>'
      ),
      takeaway('Threads differ in material and design, and their breast use is largely unproven.')
    ]
  }),

  page({
    url: '/non-surgical/breast-threads-results/',
    slug: 'breast-threads-results',
    section: 'non-surgical',
    group: 'threads',
    parentUrl: '/non-surgical/breast-threads/',
    parentTitle: 'Breast Threads',
    h1: 'What Breast Threads Can and Cannot Do',
    cardTitle: 'What threads can do',
    cardText: 'Separating a small temporary effect from promises of a non-surgical lift.',
    seoTitle: 'What Breast Threads Can and Cannot Do | Quantum Health',
    seoDescription: 'A realistic look at the possible effects of breast threads, including mild lifting or skin support, and why they do not substitute for surgery.',
    bannerLead: 'Threads are often advertised as a "non-surgical breast lift". It helps to separate possibility from promise.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to procedure, recovery and risks.'],
      ['/non-surgical/breast-threads-types/', 'Types of breast threads', 'Materials, designs and intended purpose.'],
      ['/non-surgical/threads-vs-breast-lift/', 'Threads vs a breast lift', 'Why the two are not equivalent.']
    ],
    blocks: [
      prose(
        '<p class="lead">Threads are often advertised as a "non-surgical breast lift". It helps to separate possibility from promise. This page is part of our guide to <a href="/non-surgical/breast-threads/">breast thread procedures</a>.</p>' +
        '<h2>What threads may do</h2>' +
        '<ul><li>Provide a small, temporary change in the position of soft tissue</li><li>Slightly tighten or support skin</li><li>Stimulate some collagen around the thread</li></ul>' +
        '<p>Such effects may be subtle, vary between people and fade as threads dissolve over months.</p>' +
        '<h2>What threads cannot reasonably do</h2>' +
        '<ul><li>Add meaningful breast volume</li><li>Correct moderate or significant sagging</li><li>Remove excess skin</li><li>Give the result of a surgical lift</li><li>Make a lasting change if the thread is absorbable</li></ul>' +
        '<h2>Why sagging is hard to treat with threads</h2>' +
        '<p>Sagging involves stretched skin, descended tissue and weight, and threads have limited holding strength. See <a href="/surgical/breast-lift/">breast lift surgery</a> for how a surgical lift addresses those components.</p>' +
        '<h2>Evidence</h2>' +
        '<p>Studies in the breast are limited, mostly small and short. Reported benefits are modest and often assessed by the providers.</p>' +
        '<h2>Who might consider threads</h2>' +
        '<p>People with very mild changes who accept a modest, temporary effect and understand the risks.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>How much change is realistic for my breasts?</li><li>How long will it last?</li><li>What happens if I am unhappy?</li><li>How does this compare with a surgical lift?</li></ul>'
      ),
      takeaway('Threads are not a replacement for a surgical lift or for implants. See <a href="/non-surgical/threads-vs-breast-lift/">threads vs a lift</a>.')
    ]
  }),

  page({
    url: '/non-surgical/breast-threads-procedure/',
    slug: 'breast-threads-procedure',
    section: 'non-surgical',
    group: 'threads',
    parentUrl: '/non-surgical/breast-threads/',
    parentTitle: 'Breast Threads',
    h1: 'The Breast Thread Procedure and Recovery: What Is Involved',
    cardTitle: 'Thread procedure and recovery',
    cardText: 'What a thread session may involve, typical aftercare and warning signs.',
    seoTitle: 'Breast Thread Procedure and Recovery | Quantum Health',
    seoDescription: 'How breast thread procedures are described, what the experience may involve, typical aftercare and when to contact a doctor.',
    bannerLead: 'Breast thread use is not a standardised treatment, so there is no single agreed method. Ask for the plan in writing.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to evidence and limitations.'],
      ['/non-surgical/breast-threads-risks/', 'Risks of breast threads', 'Complications and how they may be managed.'],
      ['/non-surgical/mono-threads-procedure/', 'Mono thread treatment', 'How smooth-thread sessions are typically described.']
    ],
    blocks: [
      prose(
        '<p class="lead">Procedures vary between providers, and because breast use is not an established, standardised treatment, there is no single agreed method. This page describes what is commonly reported. It is part of our guide to <a href="/non-surgical/breast-threads/">breast thread procedures</a>.</p>' +
        '<h2>Assessment</h2>' +
        '<p>A clinician should take a medical history, examine your breasts and discuss goals, risks and alternatives. Medical conditions, bleeding tendency, skin infections and allergies matter.</p>' +
        '<h2>The procedure</h2>' +
        '<ul><li>The skin is cleaned and the area marked</li><li>Local anaesthetic is usually given</li><li>Threads, loaded in fine needles or cannulas, are passed under the skin in planned patterns</li><li>Some threads are left in place; the needle is withdrawn</li><li>Treatment commonly takes up to an hour or so</li></ul>' +
        '<h2>Immediately afterwards</h2>' +
        '<p>Bruising, swelling, tenderness, tightness and small puncture marks are common. Some people feel the threads or notice pulling when they move.</p>' +
        '<h2>Aftercare</h2>' +
        '<p>Providers commonly advise:</p>' +
        '<ul><li>Avoiding strenuous exercise and heavy lifting for a period</li><li>Avoiding tight underwire bras or pressure as instructed</li><li>Sleeping on your back</li><li>Avoiding saunas, hot baths and massage of the area</li><li>Using prescribed or recommended pain relief</li></ul>' +
        '<p>Follow the specific instructions you receive.</p>' +
        '<h2>How long do effects last?</h2>' +
        '<p>Absorbable threads dissolve over months. Any effect related to the thread itself is expected to fade as it is absorbed, although some providers claim collagen effects last longer. Published breast data are limited.</p>' +
        '<h2>When to contact a doctor</h2>' +
        '<p>Fever, spreading redness, severe pain, discharge, a thread poking through the skin, skin dimpling or a new lump. Read our <a href="/breast-enlargement-safety/">safety and warning signs</a> page.</p>'
      ),
      takeaway('Ask for a clear written explanation of the procedure and aftercare before you agree.')
    ]
  }),

  page({
    url: '/non-surgical/breast-threads-risks/',
    slug: 'breast-threads-risks',
    section: 'non-surgical',
    group: 'threads',
    parentUrl: '/non-surgical/breast-threads/',
    parentTitle: 'Breast Threads',
    h1: 'Risks of Breast Thread Procedures',
    cardTitle: 'Thread risks',
    cardText: 'Infection, visible threads, dimpling, migration and other possible complications.',
    seoTitle: 'Risks of Breast Thread Procedures | Quantum Health',
    seoDescription: 'The potential complications of breast threads, including infection, visible or migrating threads, dimpling and asymmetry, and how they may be managed.',
    bannerLead: 'Thread procedures are often called minimally invasive, but they place a foreign material under the skin.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to what threads can and cannot do.'],
      ['/non-surgical/breast-threads-procedure/', 'Procedure and recovery', 'What to expect during and after a session.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Warning signs and when to seek urgent care.']
    ],
    blocks: [
      prose(
        '<p class="lead">Thread procedures are often described as minimally invasive, but they place a foreign material under the skin. This page is part of our guide to <a href="/non-surgical/breast-threads/">breast thread procedures</a>.</p>' +
        '<h2>Possible complications</h2>' +
        '<ul><li>Bruising, swelling and pain</li><li>Infection, including abscess, sometimes late</li><li>Visible or palpable threads, especially in thin tissue</li><li>Thread extrusion, where a thread comes through the skin</li><li>Migration, where threads move from the intended position</li><li>Skin dimpling, puckering or irregularities</li><li>Asymmetry</li><li>Granulomas or inflammatory nodules</li><li>Nerve irritation or altered sensation</li><li>Scarring at entry points</li><li>Allergic reaction or reaction to the material</li><li>Interference with imaging, possibly appearing as lines on mammograms or ultrasound</li></ul>' +
        '<h2>Why the breast is different</h2>' +
        '<p>The breast is soft, mobile and changes with movement, weight and hormones. Threads can behave differently from how they do in the face.</p>' +
        '<h2>Removal difficulties</h2>' +
        '<p>Absorbable threads dissolve over time, but in some cases problems need earlier removal. Removal can be difficult if threads are deep or have migrated.</p>' +
        '<h2>Who has higher risk</h2>' +
        '<p>People with active infections, skin conditions at the site, bleeding disorders, autoimmune conditions, keloid tendency or poor healing should discuss this carefully.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>What complications have you seen with breast threads?</li><li>How would you remove them if needed?</li><li>Who treats me if there is a problem out of hours?</li></ul>'
      ),
      takeaway('Understand the risks and the plan for problems before you agree to threads.')
    ]
  }),

  page({
    url: '/non-surgical/threads-vs-breast-lift/',
    slug: 'threads-vs-breast-lift',
    section: 'non-surgical',
    group: 'threads',
    parentUrl: '/non-surgical/breast-threads/',
    parentTitle: 'Breast Threads',
    h1: 'Breast Threads vs a Surgical Breast Lift: An Honest Comparison',
    cardTitle: 'Threads vs a breast lift',
    cardText: 'How threads differ from mastopexy in effect, duration, scars and risk.',
    seoTitle: 'Breast Threads vs a Surgical Breast Lift | Quantum Health',
    seoDescription: 'How thread procedures differ from surgical breast lift in what they can achieve, how long they last, risks and cost considerations.',
    bannerLead: 'Because threads are marketed as a "lift without surgery", comparing them with a surgical lift is useful.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to types, evidence and risks.'],
      ['/non-surgical/breast-threads-results/', 'What threads can and cannot do', 'Why sagging is difficult to treat with threads.'],
      ['/surgical/breast-lift/', 'Breast lift surgery', 'Technique, scars, recovery and longevity.']
    ],
    blocks: [
      prose('<p class="lead">Because threads are marketed as a "lift without surgery", comparing them with a surgical lift is useful. This page is part of our guide to <a href="/non-surgical/breast-threads/">breast thread procedures</a>.</p>'),
      comparison({
        eyebrow: 'Side by side',
        heading: 'What each approach can offer',
        head: ['Consideration', 'Breast threads', 'Surgical breast lift'],
        rows: [
          ['<strong>Mechanism</strong>', 'Threads under skin for support', 'Removal of excess skin, reshaping and repositioning of tissue'],
          ['<strong>Suits</strong>', 'Very mild changes, if at all', 'Mild to severe sagging'],
          ['<strong>Evidence in the breast</strong>', 'Limited', 'Established, though results vary'],
          ['<strong>Duration</strong>', 'Months, then fades', 'Years, though ageing continues'],
          ['<strong>Scars</strong>', 'Tiny entry points', 'Longer scars'],
          ['<strong>Recovery</strong>', 'Short', 'Several weeks'],
          ['<strong>Main risks</strong>', 'Infection, visible threads, dimpling, migration', 'Scarring, nipple blood supply, asymmetry, healing problems'],
          ['<strong>Can remove excess skin</strong>', 'No', 'Yes']
        ],
        note: 'Thread effects are not equivalent to a surgical lift. Suitability and likely benefit require an in-person assessment.'
      }),
      prose(
        '<h2>The core difference</h2>' +
        '<p>Sagging usually involves excess skin and descended tissue. A surgical lift addresses both. Threads provide at most a modest, temporary mechanical effect.</p>' +
        '<h2>Why the trade-off exists</h2>' +
        '<p>Surgery involves more risk and downtime but can produce a more reliable, lasting change in position. Threads involve less recovery but have less predictable benefit.</p>' +
        '<h2>Cost</h2>' +
        '<p>Because threads fade and may need repeating, long-term cost may not be lower than a single lift. Ask for a realistic estimate over several years.</p>' +
        '<h2>Who might consider which</h2>' +
        '<p>People with moderate or significant sagging usually need surgery to see a meaningful change. People wanting a subtle, temporary effect and who accept uncertainty might ask about threads, with a clear understanding of the evidence. Read <a href="/surgical/breast-lift/">breast lift surgery</a> for the surgical alternative.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>Would threads change my breast position noticeably?</li><li>What would a surgeon advise for me?</li><li>What would I do if I am unhappy with threads?</li></ul>'
      ),
      takeaway('Threads are not an equivalent substitute for a lift. See <a href="/surgical/breast-lift/">breast lift surgery</a>.')
    ]
  })
];

const monoThreads = [
  page({
    url: '/non-surgical/mono-threads-basics/',
    slug: 'mono-threads-basics',
    section: 'non-surgical',
    group: 'mono',
    parentUrl: '/non-surgical/mono-threads/',
    parentTitle: 'Mono Threads',
    h1: 'What Are Mono Threads? Smooth Threads and Their Intended Effect',
    cardTitle: 'What mono threads are',
    cardText: 'Smooth absorbable threads, how they are placed and what they are meant to do.',
    seoTitle: 'What Are Mono Threads? Smooth PDO Threads | Quantum Health',
    seoDescription: 'An introduction to mono threads, smooth absorbable threads used in aesthetic medicine, what they are meant to do and how they differ from lifting threads.',
    bannerLead: 'Mono threads are smooth threads intended to improve skin quality, not to lift or enlarge the breast.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/mono-threads/', 'Mono threads', 'The parent guide to evidence, procedure and risks.'],
      ['/non-surgical/mono-vs-cog-threads/', 'Mono vs cog threads', 'How smooth and barbed threads differ.'],
      ['/non-surgical/breast-threads-types/', 'Types of breast threads', 'Materials, designs and intended purpose.']
    ],
    blocks: [
      prose(
        '<p class="lead">Mono threads are thin, smooth threads, typically made of polydioxanone (PDO), a material used in dissolvable stitches. This page is part of our guide to <a href="/non-surgical/mono-threads/">mono threads</a>.</p>' +
        '<h2>What they look like</h2>' +
        '<p>They are very fine, smooth filaments with no barbs or cones, usually supplied in a fine needle or cannula. Many are placed in a mesh or crisscross pattern.</p>' +
        '<h2>The intended purpose</h2>' +
        '<p>The aim is not to lift tissue mechanically. Instead, as the thread dissolves, the body responds around it, which is hoped to stimulate collagen and improve skin firmness, texture or tone. This is sometimes called biostimulation.</p>' +
        '<h2>Where they are commonly used</h2>' +
        '<p>Mono threads are mainly used on facial and neck skin, and in some body areas, to improve skin quality. They are not designed to add substantial volume.</p>' +
        '<h2>Breast use</h2>' +
        '<p>Mono threads in the breast are marketed with claims of tightening skin, improving the look of the chest or enhancing shape. Evidence for a lasting increase in breast volume is not established.</p>' +
        '<h2>Material and duration</h2>' +
        '<p>PDO is absorbed over several months. Any effect on skin may last longer than the thread itself, according to some providers, but the published evidence is limited and variable.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>What material are the threads and how long do they dissolve?</li><li>What exactly is the expected effect?</li><li>Is there evidence for breast skin?</li></ul>'
      ),
      takeaway('Mono threads aim to improve skin quality, not to enlarge breasts.')
    ]
  }),

  page({
    url: '/non-surgical/mono-vs-cog-threads/',
    slug: 'mono-vs-cog-threads',
    section: 'non-surgical',
    group: 'mono',
    parentUrl: '/non-surgical/mono-threads/',
    parentTitle: 'Mono Threads',
    h1: 'Mono Threads vs Cog Threads: What Is the Difference?',
    cardTitle: 'Mono vs cog threads',
    cardText: 'Smooth threads for skin quality versus barbed threads intended for lifting.',
    seoTitle: 'Mono Threads vs Cog Threads: The Difference | Quantum Health',
    seoDescription: 'How smooth mono threads differ from barbed cog threads in design, intended effect and typical uses.',
    bannerLead: 'Thread names are often used loosely in marketing. Understanding the basic types helps.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/mono-threads/', 'Mono threads', 'The parent guide to evidence and safety.'],
      ['/non-surgical/mono-threads-basics/', 'What mono threads are', 'Smooth filaments and their intended effect.'],
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to lifting threads.']
    ],
    blocks: [
      prose('<p class="lead">Thread names are often used loosely in marketing. Understanding the basic types helps. This page is part of our guide to <a href="/non-surgical/mono-threads/">mono threads</a>.</p>'),
      comparison({
        eyebrow: 'Thread types',
        heading: 'How smooth and barbed threads differ',
        head: ['Feature', 'Mono (smooth) threads', 'Cog (barbed) threads'],
        rows: [
          ['<strong>Design</strong>', 'Smooth filament', 'Barbs or cones along the thread'],
          ['<strong>Intended effect</strong>', 'Skin quality, collagen stimulation', 'Mechanical lifting or support'],
          ['<strong>Placement</strong>', 'Often multiple fine threads in a mesh', 'Fewer, longer threads anchored in tissue'],
          ['<strong>Lifting effect</strong>', 'Minimal', 'Modest and temporary at best'],
          ['<strong>Risks</strong>', 'Bruising, lumps, infection', 'Same, plus visibility, dimpling, migration'],
          ['<strong>Typical use</strong>', 'Skin texture and tone', 'Facial lifting, some body areas']
        ],
        note: 'Product designs vary. Ask for the exact product name and instructions for use.'
      }),
      prose(
        '<h2>Screw or twisted threads</h2>' +
        '<p>Some threads have a coiled or twisted design intended to add a small amount of volume in the skin. Evidence of lasting volume is limited.</p>' +
        '<h2>Why it matters in the breast</h2>' +
        '<p>If a provider offers "threads" for the breast, ask which type, because the intended effect and risk profile differ. Cog threads aim for lift, mono threads aim for skin quality, and neither is designed to add significant volume.</p>' +
        '<h2>Product labelling</h2>' +
        '<p>Products can have similar names but different designs. Ask for the product name, manufacturer and instructions for use. Read <a href="/non-surgical/regulatory-status/">approved versus off-label use</a>.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>Which type are you proposing and why?</li><li>What outcome do you expect, and how will we measure it?</li><li>Is this product intended for the breast?</li></ul>'
      ),
      takeaway('Know which type of thread is proposed. They are not interchangeable. See <a href="/non-surgical/breast-threads/">breast thread procedures</a>.')
    ]
  }),

  page({
    url: '/non-surgical/mono-threads-collagen/',
    slug: 'mono-threads-collagen',
    section: 'non-surgical',
    group: 'mono',
    parentUrl: '/non-surgical/mono-threads/',
    parentTitle: 'Mono Threads',
    h1: 'Collagen Stimulation and Mono Threads: What Is Known and What Is Not',
    cardTitle: 'Collagen stimulation',
    cardText: 'What collagen stimulation can and cannot mean for breast volume.',
    seoTitle: 'Collagen Stimulation and Mono Threads | Quantum Health',
    seoDescription: 'A cautious look at the theory and evidence behind collagen stimulation from absorbable threads, and what it can and cannot mean for the breast.',
    bannerLead: 'More collagen in the skin is not the same as more breast volume.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/mono-threads/', 'Mono threads', 'The parent guide to procedure and risks.'],
      ['/non-surgical/mono-threads-basics/', 'What mono threads are', 'Smooth threads and their intended effect.'],
      ['/non-surgical/reading-the-evidence/', 'Reading the evidence', 'How to assess collagen and growth claims.']
    ],
    blocks: [
      prose(
        '<p class="lead">The main claim for mono threads is that they stimulate collagen. It is worth looking at what this means. This page is part of our guide to <a href="/non-surgical/mono-threads/">mono threads</a>.</p>' +
        '<h2>The theory</h2>' +
        '<p>When a thread is placed under the skin, the body treats it as a foreign material and responds with a mild inflammatory reaction. Cells called fibroblasts may then produce collagen around the thread. Over time, the thread dissolves.</p>' +
        '<h2>What laboratory and skin studies suggest</h2>' +
        '<p>Some laboratory and small clinical studies, mostly in facial skin, report increases in collagen markers or improvement in skin texture after PDO thread placement. These studies are generally small and short, with varied methods.</p>' +
        '<h2>The gap for the breast</h2>' +
        '<p>The breast\'s volume is mostly fat and glandular tissue, not skin collagen. More collagen in the skin does not mean more breast volume. Evidence that mono threads increase breast size is lacking.</p>' +
        '<h2>What a result might be</h2>' +
        '<p>At best, a small improvement in skin texture or tightness, which may be subtle and temporary.</p>' +
        '<h2>Unknowns</h2>' +
        '<ul><li>How long any effect lasts</li><li>Which patients respond</li><li>Whether benefits outweigh risks in breast skin</li><li>Long-term effects on imaging and tissue</li></ul>' +
        '<h2>Evaluating claims</h2>' +
        '<p>Be cautious about phrases such as "natural breast growth", "regenerates tissue" or "permanent results". See <a href="/non-surgical/reading-the-evidence/">how to read the evidence</a>.</p>'
      ),
      takeaway('Collagen stimulation in skin is not the same as breast enlargement.')
    ]
  }),

  page({
    url: '/non-surgical/mono-threads-procedure/',
    slug: 'mono-threads-procedure',
    section: 'non-surgical',
    group: 'mono',
    parentUrl: '/non-surgical/mono-threads/',
    parentTitle: 'Mono Threads',
    h1: 'Mono Thread Treatment: What Happens, Aftercare and How Long Effects Last',
    cardTitle: 'Mono thread aftercare',
    cardText: 'What a session may involve, typical aftercare and the limits on duration.',
    seoTitle: 'Mono Thread Treatment and Aftercare | Quantum Health',
    seoDescription: 'What the mono thread process typically involves, usual aftercare and what to expect about duration of effects.',
    bannerLead: 'The approach differs between providers. Always follow the instructions you receive.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/mono-threads/', 'Mono threads', 'The parent guide to evidence and safety.'],
      ['/non-surgical/mono-threads-risks/', 'Mono thread risks', 'Who may be at higher risk and what to ask.'],
      ['/non-surgical/breast-threads-procedure/', 'Breast thread recovery', 'How cog-thread sessions are typically described.']
    ],
    blocks: [
      prose(
        '<p class="lead">The approach differs between providers. Always follow the instructions you receive. This page is part of our guide to <a href="/non-surgical/mono-threads/">mono threads</a>.</p>' +
        '<h2>Consultation</h2>' +
        '<p>A qualified clinician should check your history, examine the area and explain risks, alternatives and limits. You should receive written consent information and time to decide.</p>' +
        '<h2>Treatment</h2>' +
        '<ul><li>The skin is cleaned and may be numbed with local anaesthetic or cream</li><li>Many fine threads are inserted just under the skin using fine needles or cannulas</li><li>The needle is withdrawn, leaving the thread in place</li><li>A session often takes under an hour, depending on the area</li></ul>' +
        '<h2>Straight afterwards</h2>' +
        '<p>Tiny puncture marks, redness, mild swelling and bruising are common. Some people feel small lumps or the threads under the skin.</p>' +
        '<h2>Aftercare</h2>' +
        '<p>Typical advice includes:</p>' +
        '<ul><li>Avoiding strenuous exercise and heat for a period</li><li>Not rubbing or massaging the area</li><li>Keeping the skin clean</li><li>Sleeping on your back</li><li>Avoiding tight underwire</li></ul>' +
        '<h2>Duration</h2>' +
        '<p>PDO threads are absorbed over several months. Providers may suggest repeating treatment. Evidence on how long any skin benefit lasts is limited, and results vary.</p>' +
        '<h2>Repeat treatments</h2>' +
        '<p>Repeating adds cost and cumulative risk. Ask how many sessions are suggested and what you can expect at each stage.</p>' +
        '<h2>Contact your clinician if</h2>' +
        '<p>You develop fever, increasing pain, redness, discharge, firm lumps or thread coming through skin. See <a href="/breast-enlargement-safety/">breast enlargement safety</a> for urgent warning signs.</p>'
      ),
      takeaway('Ask for a written plan including repeat treatments, costs and complications.')
    ]
  }),

  page({
    url: '/non-surgical/mono-threads-risks/',
    slug: 'mono-threads-risks',
    section: 'non-surgical',
    group: 'mono',
    parentUrl: '/non-surgical/mono-threads/',
    parentTitle: 'Mono Threads',
    h1: 'Mono Thread Risks and Who Should Avoid Them',
    cardTitle: 'Mono thread risks',
    cardText: 'Possible side effects, higher-risk groups and screening considerations.',
    seoTitle: 'Mono Thread Risks and Who Should Avoid Them | Quantum Health',
    seoDescription: 'The possible side effects of mono threads in the breast, who may be at higher risk and the questions to ask before treatment.',
    bannerLead: 'Mono threads are often described as gentle, but they still involve introducing material into the skin.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/mono-threads/', 'Mono threads', 'The parent guide to evidence and procedure.'],
      ['/non-surgical/mono-threads-procedure/', 'Mono thread aftercare', 'What happens during and after treatment.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, complications and warning signs.']
    ],
    blocks: [
      prose(
        '<p class="lead">Mono threads are often described as gentle, but they still involve introducing material into the skin. This page is part of our guide to <a href="/non-surgical/mono-threads/">mono threads</a>.</p>' +
        '<h2>Possible side effects</h2>' +
        '<ul><li>Bruising, swelling, tenderness</li><li>Small lumps or nodules, where threads can be felt</li><li>Infection, including delayed infection</li><li>Skin irregularity or dimpling</li><li>Visible threads in thin skin</li><li>Inflammatory reaction or granulomas</li><li>Temporary or lasting changes in sensation</li><li>Pigmentation changes</li><li>Reaction to the material</li><li>Interference with breast imaging</li></ul>' +
        '<h2>Who may need to avoid or take extra care</h2>' +
        '<ul><li>People with active infection or skin disease at the site</li><li>Those with bleeding disorders or on blood thinners</li><li>Pregnancy and breastfeeding</li><li>People who form keloid or raised scars</li><li>Autoimmune or connective tissue conditions</li><li>Anyone with unexplained breast lumps or unassessed symptoms</li><li>Those who have had previous breast injections or surgery, without a specialist review</li></ul>' +
        '<h2>Screening</h2>' +
        '<p>Tell any imaging team you have had threads. Breast screening should continue as recommended for your age and risk.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>What would make me a poor candidate?</li><li>How common are complications in your practice?</li><li>What is your plan if I develop a lump or infection?</li></ul>'
      ),
      takeaway('Even small treatments carry risk. Ask for a clear answer before agreeing. See <a href="/breast-enlargement-safety/">breast enlargement safety</a>.')
    ]
  })
];

const prp = [
  page({
    url: '/non-surgical/what-is-prp/',
    slug: 'what-is-prp',
    section: 'non-surgical',
    group: 'prp',
    parentUrl: '/non-surgical/prp/',
    parentTitle: 'PRP and Breast Enhancement',
    h1: 'What Is PRP? How Platelet-Rich Plasma Is Prepared',
    cardTitle: 'What PRP is',
    cardText: 'How platelet-rich plasma is made from your own blood and why preparations vary.',
    seoTitle: 'What Is PRP? Platelet-Rich Plasma Explained | Quantum Health',
    seoDescription: 'A plain explanation of platelet-rich plasma, how it is made from your own blood and why preparation methods differ.',
    bannerLead: 'PRP is concentrated platelets from your own blood. Preparation varies between clinics, which makes comparisons difficult.',
    imageKey: 'prp',
    related: [
      ['/non-surgical/prp/', 'PRP and breast enhancement', 'The parent guide to evidence, safety and claims.'],
      ['/non-surgical/prp-uses/', 'Where PRP is used', 'Evidence in other medical settings and the breast gap.'],
      ['/non-surgical/prp-safety/', 'PRP safety', 'Risks, preparation quality and clinic standards.']
    ],
    blocks: [
      prose(
        '<p class="lead">Platelet-rich plasma (PRP) is a preparation made from your own blood that contains a higher concentration of platelets than normal. This page is part of our guide to <a href="/non-surgical/prp/">PRP and breast enhancement</a>.</p>' +
        '<h2>What platelets do</h2>' +
        '<p>Platelets are blood cells that help blood clot and release growth factors, proteins involved in healing and tissue repair. PRP is based on the idea that delivering concentrated platelets to a tissue may encourage healing.</p>' +
        '<h2>How it is made</h2>' +
        '<ul><li>A small sample of blood is drawn, usually from your arm</li><li>It is placed in a centrifuge, which spins the blood to separate its components</li><li>The platelet-rich layer is collected</li><li>The preparation is injected or applied to the target area</li></ul>' +
        '<p>The process typically takes under an hour.</p>' +
        '<h2>Why it is called autologous</h2>' +
        '<p>Because it comes from your own blood, the risk of allergy or disease transmission from the product is low compared with donor materials. This does not make the procedure risk-free, since injection itself carries risks.</p>' +
        '<h2>Not all PRP is the same</h2>' +
        '<p>Systems differ in how much blood is drawn, how fast it is spun, how concentrated the platelets are, and whether white cells are included. Some are activated before injection. There is no universally agreed standard, which makes studies hard to compare.</p>' +
        '<h2>Regulation</h2>' +
        '<p>The kits used to prepare PRP are regulated as devices in many countries, but this does not mean that every use is approved or supported by evidence.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>What system do you use and what is the platelet concentration?</li><li>Is the preparation done in a sterile environment?</li><li>What is the intended purpose in my breast?</li></ul>'
      ),
      takeaway('PRP is concentrated platelets from your own blood. Preparation varies between clinics.')
    ]
  }),

  page({
    url: '/non-surgical/prp-uses/',
    slug: 'prp-uses',
    section: 'non-surgical',
    group: 'prp',
    parentUrl: '/non-surgical/prp/',
    parentTitle: 'PRP and Breast Enhancement',
    h1: 'Where Is PRP Used in Medicine, and What About the Breast?',
    cardTitle: 'Where PRP is used',
    cardText: 'The medical settings where PRP is studied, and why that evidence does not cover breasts.',
    seoTitle: 'Where Is PRP Used? Evidence by Area | Quantum Health',
    seoDescription: 'The medical settings where PRP is used, how strong the evidence is in each and why that evidence does not extend to breast enlargement.',
    bannerLead: 'PRP has been studied in many areas of medicine. The strength of evidence varies by use.',
    imageKey: 'prp',
    related: [
      ['/non-surgical/prp/', 'PRP and breast enhancement', 'The parent guide to evidence and limitations.'],
      ['/non-surgical/what-is-prp/', 'What PRP is', 'Preparation, platelet concentration and regulation.'],
      ['/non-surgical/prp-claims/', 'Evaluating PRP claims', 'Questions and red flags to use at a consultation.']
    ],
    blocks: [
      prose(
        '<p class="lead">PRP has been studied in many areas of medicine. The strength of evidence varies by use. This page is part of our guide to <a href="/non-surgical/prp/">PRP and breast enhancement</a>.</p>' +
        '<h2>Areas where PRP is used or studied</h2>' +
        '<ul><li><strong>Orthopaedics and sports medicine:</strong> tendon problems and knee osteoarthritis; results are mixed and depend on the condition and preparation</li><li><strong>Dermatology:</strong> skin rejuvenation and hair loss; some studies show benefit, though quality varies</li><li><strong>Wound healing:</strong> some chronic wounds</li><li><strong>Dental and oral surgery:</strong> certain procedures</li><li><strong>Surgery:</strong> sometimes used as an adjunct, with uncertain benefit</li></ul>' +
        '<p>Even in these areas, researchers continue to debate how well PRP works.</p>' +
        '<h2>PRP and breast enlargement</h2>' +
        '<p>There is no robust evidence that PRP injected into the breast increases breast volume in a lasting way. Platelet growth factors act on healing; they are not known to grow new breast tissue on their own.</p>' +
        '<h2>Marketing terms</h2>' +
        '<p>Names such as "PRP breast lift" or "natural breast enhancement" are marketing terms. Be careful with claims of firmness, lift or increased size, since they may refer to temporary or subjective skin changes.</p>' +
        '<h2>Why evidence from other areas does not transfer</h2>' +
        '<p>A tendon, a knee joint and a breast are different tissues. A benefit in one does not show a benefit in another. The way a tissue heals, its blood supply and the purpose of treatment all differ.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>What studies support PRP in the breast?</li><li>What outcome was measured and for how long?</li><li>Why do you expect this to work for me?</li></ul>'
      ),
      takeaway('PRP is a legitimate medical tool in some settings, but breast enlargement is not an established use.')
    ]
  }),

  page({
    url: '/non-surgical/prp-fat-transfer/',
    slug: 'prp-fat-transfer',
    section: 'non-surgical',
    group: 'prp',
    parentUrl: '/non-surgical/prp/',
    parentTitle: 'PRP and Breast Enhancement',
    h1: 'PRP With Fat Transfer: Why Some Surgeons Combine Them and What Is Known',
    cardTitle: 'PRP with fat transfer',
    cardText: 'The theory behind adding PRP to fat grafting and how uncertain the benefit remains.',
    seoTitle: 'PRP With Fat Transfer: What Is Known | Quantum Health',
    seoDescription: 'Why some surgeons add PRP to breast fat transfer, what the theory is and how limited the evidence remains.',
    bannerLead: 'PRP is sometimes added to fat transfer, but the benefit is uncertain and it does not remove the risks of surgery.',
    imageKey: 'prp',
    related: [
      ['/non-surgical/prp/', 'PRP and breast enhancement', 'The parent guide to the evidence and claims.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'How fat grafting works and what it can achieve.'],
      ['/non-surgical/prp-claims/', 'Evaluating PRP claims', 'How to judge a promised improvement in fat survival.']
    ],
    blocks: [
      prose(
        '<p class="lead">Some surgeons add PRP to fat transfer, hoping it improves how much fat survives. This is a surgical adjunct, not a stand-alone enlargement method. This page is part of our guide to <a href="/non-surgical/prp/">PRP and breast enhancement</a>.</p>' +
        '<h2>The idea</h2>' +
        '<p>Transferred fat needs a blood supply to survive. Growth factors in PRP might support new blood vessel growth and cell survival, which could improve retention.</p>' +
        '<h2>What studies suggest</h2>' +
        '<p>Studies on PRP with fat grafting, mostly in different body areas and in small series, report mixed results. Some suggest better graft survival; others find no clear advantage. Methods differ in how PRP is prepared and used, so results are hard to compare.</p>' +
        '<h2>Limits of current evidence</h2>' +
        '<ul><li>Few large, well-controlled breast studies</li><li>Short follow-up</li><li>Variation in technique</li><li>Possible bias when surgeons assess their own results</li></ul>' +
        '<h2>Safety and imaging</h2>' +
        '<p>Adding PRP does not remove the risks of fat transfer, such as lumps, oil cysts and calcifications. Whether PRP changes that risk is not established. Read more about <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer breast augmentation</a>.</p>' +
        '<h2>What this means for you</h2>' +
        '<p>If a surgeon suggests PRP with fat transfer, ask why, and treat it as an optional addition with uncertain benefit, not a guarantee of better results. Consider whether any extra cost is justified.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>What do you expect PRP to add in my case?</li><li>What evidence supports this in the breast?</li><li>What extra costs or risks does it involve?</li></ul>'
      ),
      takeaway('PRP with fat transfer is a developing area with uncertain benefit.')
    ]
  }),

  page({
    url: '/non-surgical/prp-safety/',
    slug: 'prp-safety',
    section: 'non-surgical',
    group: 'prp',
    parentUrl: '/non-surgical/prp/',
    parentTitle: 'PRP and Breast Enhancement',
    h1: 'Is PRP Safe? Risks, Quality and Standards',
    cardTitle: 'PRP safety',
    cardText: 'The real risks of PRP injections and the standards a clinic should meet.',
    seoTitle: 'Is PRP Safe? Risks and Quality Standards | Quantum Health',
    seoDescription: 'The risks of PRP injections, why preparation quality matters and how to judge whether a clinic follows safe standards.',
    bannerLead: 'Because PRP uses your own blood, people often assume it is risk-free. It is still an injection procedure.',
    imageKey: 'prp',
    related: [
      ['/non-surgical/prp/', 'PRP and breast enhancement', 'The parent guide to evidence and claims.'],
      ['/non-surgical/what-is-prp/', 'What PRP is', 'How it is prepared and why methods vary.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Warning signs and clinical standards.']
    ],
    blocks: [
      prose(
        '<p class="lead">Because PRP uses your own blood, people often assume it is risk-free. It is lower risk than some products in terms of allergy, but it is still an injection procedure. This page is part of our guide to <a href="/non-surgical/prp/">PRP and breast enhancement</a>.</p>' +
        '<h2>Possible risks</h2>' +
        '<ul><li>Pain, bruising and swelling at the injection site</li><li>Infection, particularly if sterile technique is poor</li><li>Bleeding</li><li>Lumps or nodules</li><li>Skin irritation or changes in pigment</li><li>Nerve irritation</li><li>Contamination of the preparation, if handled incorrectly</li><li>Cross-contamination if equipment or blood samples are mixed up</li></ul>' +
        '<h2>Who may need extra care</h2>' +
        '<p>People with bleeding or platelet disorders, active infection, blood cancers, those on blood thinners, and pregnant or breastfeeding people should talk to their doctor before PRP.</p>' +
        '<h2>Quality and standards</h2>' +
        '<p>A safe clinic will:</p>' +
        '<ul><li>Use single-use, sterile kits designed for the purpose</li><li>Follow clear labelling and identification of your blood sample</li><li>Have trained staff and a medical setting</li><li>Explain the preparation method and its limits</li><li>Provide written information and obtain consent</li></ul>' +
        '<h2>Imaging</h2>' +
        '<p>PRP itself is not known to cause lasting changes on mammograms, but any injected treatment should be mentioned to imaging teams.</p>' +
        '<h2>Costs</h2>' +
        '<p>PRP is often sold in packages of sessions. Ask about the evidence for repeated treatment before paying in advance. See <a href="/breast-enlargement-safety/">breast enlargement safety</a> for wider checks.</p>' +
        '<h2>Questions to ask</h2>' +
        '<ul><li>How is the sample handled and labelled?</li><li>What are the risks specific to breast injections?</li><li>What happens if I have a complication?</li></ul>'
      ),
      takeaway('"Your own blood" does not mean no risk. Look for medical standards and honest explanations.')
    ]
  }),

  page({
    url: '/non-surgical/prp-claims/',
    slug: 'prp-claims',
    section: 'non-surgical',
    group: 'prp',
    parentUrl: '/non-surgical/prp/',
    parentTitle: 'PRP and Breast Enhancement',
    h1: 'Evaluating PRP Breast Claims: Questions, Red Flags and Better Starting Points',
    cardTitle: 'Evaluating PRP claims',
    cardText: 'How to judge PRP marketing and find balanced advice.',
    seoTitle: 'Evaluating PRP Breast Enhancement Claims | Quantum Health',
    seoDescription: 'How to judge PRP breast enhancement marketing, the warning signs of overstated claims and where to turn for balanced advice.',
    bannerLead: 'PRP is widely marketed for breast enhancement, often with strong language. A few checks can help.',
    imageKey: 'prp',
    related: [
      ['/non-surgical/prp/', 'PRP and breast enhancement', 'The parent guide to evidence and safety.'],
      ['/non-surgical/prp-uses/', 'Where PRP is used', 'What is established in other areas and what is not.'],
      ['/non-surgical/reading-the-evidence/', 'Reading the evidence', 'How to judge studies and outcome claims.']
    ],
    blocks: [
      prose(
        '<p class="lead">PRP is widely marketed for breast enhancement, often with strong language. A few checks can help. This page is part of our guide to <a href="/non-surgical/prp/">PRP and breast enhancement</a>.</p>' +
        '<h2>Claims to be cautious about</h2>' +
        '<ul><li>"Natural breast enlargement" or "grows new tissue"</li><li>"Non-surgical breast lift" with no explanation of what changes</li><li>A specific cup-size increase</li><li>"Permanent" results</li><li>"No risk" because it uses your own blood</li><li>Before-and-after photos with no information about timing, lighting or other treatments</li></ul>' +
        '<h2>Questions to put to the provider</h2>' +
        '<ul><li>What exactly will PRP do in my breast?</li><li>What published evidence is there for breast use, and how strong is it?</li><li>How is the result measured and at what time?</li><li>What proportion of patients benefit?</li><li>What are the risks and costs, including repeat sessions?</li><li>Is there an alternative that has better evidence?</li></ul>' +
        '<h2>Red flags</h2>' +
        '<ul><li>Reluctance to cite studies</li><li>Pressure to pay for multiple sessions upfront</li><li>Treatment outside a medical facility</li><li>Unclear training of the person injecting</li><li>No consent form or aftercare plan</li></ul>' +
        '<h2>What a fair answer might sound like</h2>' +
        '<p>"PRP is used in some medical settings. For the breast, there is no strong evidence that it increases volume. Some people may notice a small change in skin quality, but this is uncertain."</p>' +
        '<h2>Better starting points</h2>' +
        '<ul><li>A consultation with a registered, appropriately qualified clinician, preferably one experienced with breast surgery as well as non-surgical options</li><li>Our <a href="/research/">research library</a> and <a href="/references/">references</a></li><li>A second opinion</li></ul>'
      ),
      takeaway('The more dramatic and certain the promise, the more reason to ask for the evidence.')
    ]
  })
];

const pages = withoutSurgery.concat(enhancement, fillers, threads, monoThreads, prp);

module.exports = { nonsurgicalSubpages: pages };
