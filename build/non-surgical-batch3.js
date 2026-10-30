'use strict';

/*
 * Batch 3 non-surgical sub-pages, prepared 30 October 2026.
 *
 * Thirty supporting pages for six parent guides: without surgery, non-surgical
 * enhancement, fillers, threads, mono threads and PRP. The copy is deliberately
 * cautious because evidence for most non-surgical breast treatments is limited.
 *
 * Publication checks still required:
 * - clinical review of every page;
 * - linked primary sources from the research library;
 * - verification of product-regulation statements against current Indian rules;
 * - confirmation that no page promises volume, cup size or a lasting result.
 */

const { siteImages } = require('./site-images');

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

const prose = (html) => ({ type: 'prose', html });
const takeaway = (text, icon = 'info') => ({ type: 'notice', icon, title: 'Key takeaway', text });
const questions = (items) => '<ul>' + items.map((item) => '<li>' + item + '</li>').join('') + '</ul>';

const pages = [
  page({
    url: '/breast-enlargement-without-surgery/what-enlargement-means/',
    slug: 'what-enlargement-means',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/breast-enlargement-without-surgery/',
    parentLabel: 'Without surgery',
    h1: 'What Does "Breast Enlargement" Actually Mean? Volume vs Appearance',
    cardTitle: 'Volume vs appearance',
    seoTitle: 'Breast Enlargement: Does It Mean Volume or Appearance? | Quantum Health',
    seoDescription: 'The difference between a real increase in breast volume and a temporary change in how the breasts look, and why it matters when judging claims.',
    bannerLead: 'The same search can mean a lasting increase in tissue or a short-lived change in appearance. Separating the two makes claims easier to judge.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The evidence guide and method scorecard.'],
      ['/breast-enlargement-without-surgery/unhappy-with-size/', 'Feeling unhappy about size', 'How to think about the decision and next steps.'],
      ['/breast-enhancement-comparison/', 'Options compared', 'Surgical and non-surgical approaches side by side.']
    ],
    blocks: [
      prose(
        '<p class="lead">When people search for breast enlargement without surgery, they may mean very different things. One person wants more tissue; another wants a fuller look under clothes. Separating these goals makes it easier to judge what a treatment can honestly offer.</p>' +
        '<h2>A real increase in volume</h2>' +
        '<p>This means more tissue: fat, glandular tissue or an implanted material. Only a few medical procedures are designed to do this, and most involve surgery. Fat transfer uses your own fat, but it is still a surgical procedure with liposuction, healing and variable fat survival. Implants add a manufactured device and carry long-term monitoring and revision risks.</p>' +
        '<h2>A change in appearance</h2>' +
        '<p>Some approaches change how breasts look without adding tissue. Examples include padded or shaped bras, posture changes, swelling or temporary fluid after an injection, skin tightening or smoothing, and improved muscle tone in the chest. These can be real and pleasing, but they are not growth. A push-up bra can change a silhouette in minutes; that does not make it a medical treatment.</p>' +
        '<h2>Why the difference matters</h2>' +
        '<p>A before-and-after photo can show a change in shape, lighting or posture without any lasting change in volume. Short-lived swelling can look like a result in the first days. If a provider cannot say what has changed in the breast itself, be cautious. Ask whether the effect is tissue, fluid, clothing or camera angle.</p>' +
        '<h2>Questions to ask any provider</h2>' +
        questions([
          'Does this add tissue, or change appearance?',
          'How is the change measured, and by whom?',
          'How long does it last, according to published data?',
          'What is the evidence, and where is it published?'
        ]) +
        '<h2>Temporary vs lasting</h2>' +
        '<p>Temporary does not mean worthless, if you are told clearly and the risk is low. Problems arise when something temporary is sold as permanent, or when a high-risk procedure is used for a short-lived effect. A useful test is to ask what you will see at six and twelve months, not only on the day of treatment.</p>'
      ),
      takeaway('Ask whether a treatment changes volume or only appearance. The honest answer shapes everything else, including cost, risk and how long you should expect the result to last.', 'evidence')
    ]
  }),

  page({
    url: '/breast-enlargement-without-surgery/bras-posture-clothing/',
    slug: 'bras-posture-clothing',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/breast-enlargement-without-surgery/',
    parentLabel: 'Without surgery',
    h1: 'Bras, Posture and Clothing: Non-Medical Ways to Change How Breasts Look',
    cardTitle: 'Bras, posture and clothing',
    seoTitle: 'Bras, Posture and Clothing: Non-Medical Ways to Change Breast Appearance | Quantum Health',
    seoDescription: 'Practical, low-risk ways to change the appearance of your bust through bra fit, posture and clothing, and why fit matters for comfort.',
    bannerLead: 'If you want a different look without a medical procedure, these options carry no medical risk. They do not change tissue, but they can change comfort and confidence.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'What changes volume and what changes appearance.'],
      ['/non-surgical/', 'Non-surgical enhancement', 'Evidence and safety across non-surgical options.'],
      ['/breast-enlargement-without-surgery/unhappy-with-size/', 'Feeling unhappy about size', 'When appearance concerns deserve more support.']
    ],
    blocks: [
      prose(
        '<p class="lead">If you want to change how your breasts look without a medical procedure, there are options with no medical risk. They do not change tissue, but they may change how you look and feel. For many people, a better bra and a few clothing adjustments are enough.</p>' +
        '<h2>Start with bra fit</h2>' +
        '<p>Many people wear the wrong size. A poorly fitting bra can flatten, spread or lower the breasts and cause discomfort. A professional fitting, repeated when your body changes, can make a visible difference. Signs of a good fit include a band that stays level, cups without gaps or spill, a centre panel that sits close to the chest, and straps that do not dig or slip.</p>' +
        '<h2>Types of bra</h2>' +
        '<ul><li>Padded and push-up bras add shape and fullness.</li><li>Balconette and plunge styles change the neckline and cleavage.</li><li>Sports bras support the breasts during exercise.</li><li>Adhesive or silicone inserts shape the bust under clothing.</li></ul>' +
        '<p>Choose comfort and avoid anything that causes pain, skin damage or breathing difficulty. A bra that leaves deep marks or makes it hard to take a full breath is not a good fit, however it looks.</p>' +
        '<h2>Posture</h2>' +
        '<p>Standing tall with relaxed shoulders can make the chest look fuller and more open. Prolonged slouching rounds the shoulders and can make breasts look smaller. Physiotherapy or posture exercises may help if you have discomfort. Posture change is not a treatment for breast size, but it can affect the silhouette.</p>' +
        '<h2>Chest exercises</h2>' +
        '<p>Exercises such as presses and push-ups build the pectoral muscles under the breast. This can improve upper-chest definition but does not increase breast tissue. A stronger chest may change how clothes sit, and that can be a useful goal in itself.</p>' +
        '<h2>Clothing choices</h2>' +
        '<p>Necklines, fabrics, layers and cuts affect how the bust looks. A tailor or stylist can help you find shapes that feel comfortable. Skin care, including sun protection and moisturising, supports skin health, though it does not change size.</p>'
      ),
      takeaway('A well-fitted bra and good posture are the safest ways to change how breasts look. They are worth trying before considering any medical procedure.', 'info')
    ]
  }),

  page({
    url: '/breast-enlargement-without-surgery/hormones-natural-size/',
    slug: 'hormones-natural-size',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/breast-enlargement-without-surgery/',
    parentLabel: 'Without surgery',
    h1: 'Hormones and Natural Breast Size: What Is Known',
    cardTitle: 'Hormones and natural size',
    seoTitle: 'Hormones and Natural Breast Size: What Is Known | Quantum Health',
    seoDescription: 'How hormones, genetics and life stages shape natural breast size, and why hormone products are not a safe route to enlargement.',
    bannerLead: 'Breast size is influenced by several factors, many outside your control. Hormone products sold for enlargement are not a safe shortcut.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The wider evidence guide.'],
      ['/non-surgical/creams-pills-massage/', 'Creams, pills and massage', 'What the evidence says about products and routines.'],
      ['/breast-anatomy/', 'Breast anatomy', 'Tissue, ligaments and blood supply explained.']
    ],
    blocks: [
      prose(
        '<p class="lead">Breast size is influenced by several factors, many outside your control. Understanding them can help you separate normal variation from a change that needs medical assessment.</p>' +
        '<h2>What shapes breast size</h2>' +
        '<ul><li><strong>Genetics:</strong> family patterns influence size and shape.</li><li><strong>Puberty:</strong> oestrogen and other hormones drive development, which usually finishes by early adulthood.</li><li><strong>Body fat:</strong> breasts contain fat, so overall body fat matters.</li><li><strong>Pregnancy and breastfeeding:</strong> breasts often enlarge and then change shape.</li><li><strong>Menstrual cycle:</strong> many people notice cyclical fullness and tenderness.</li><li><strong>Menopause:</strong> glandular tissue declines and the fat share rises.</li><li><strong>Medicines and conditions:</strong> some can affect breast size or cause swelling.</li></ul>' +
        '<h2>Hormone products and enlargement</h2>' +
        '<p>Hormones are prescribed for medical reasons under supervision. Using hormone-containing creams, pills or injections to enlarge breasts without medical advice can cause side effects and may be unsafe, especially for people with hormone-sensitive conditions, clotting risks or a family history of certain cancers. There is no approved, reliable hormone treatment for cosmetic enlargement in otherwise healthy adults.</p>' +
        '<p>Products marketed as "natural" are not automatically safe. Herbal preparations can contain hormone-active compounds, vary in strength and interact with other medicines. See our page on <a href="/non-surgical/creams-pills-massage/">creams, pills and massage</a> for what the evidence shows.</p>' +
        '<h2>What is normal variation?</h2>' +
        '<p>It is common for one breast to be slightly larger than the other, for size to change across the cycle, and for shape to change after pregnancy or weight change. Normal variation does not need treatment unless it bothers you or a clinician finds a concerning change. There is no single "correct" breast size.</p>' +
        '<h2>When to see a doctor</h2>' +
        '<ul><li>Breasts that have not developed by the expected age.</li><li>A sudden change in size in one or both breasts.</li><li>Lumps, discharge or skin changes.</li><li>Irregular periods or other hormonal symptoms.</li></ul>' +
        '<p>A doctor can check for underlying causes. Most variation is normal, but a new or one-sided change deserves assessment.</p>'
      ),
      takeaway('Natural size is largely determined by genes, hormones and life stage. Avoid self-prescribing hormones or assuming that a supplement is safe because it is sold as natural.', 'safety')
    ]
  }),

  page({
    url: '/breast-enlargement-without-surgery/weight-breast-size/',
    slug: 'weight-breast-size',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/breast-enlargement-without-surgery/',
    parentLabel: 'Without surgery',
    h1: 'Weight, Body Fat and Breast Size',
    cardTitle: 'Weight and breast size',
    seoTitle: 'Weight, Body Fat and Breast Size | Quantum Health',
    seoDescription: 'How gaining or losing weight changes breast size and shape, and why weight change is not a targeted or controllable way to enlarge breasts.',
    bannerLead: 'Breasts contain fat, so body weight affects them. But weight change is not a targeted or predictable enlargement method.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The evidence guide and alternatives.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer', 'Using your own fat, and why it is still surgery.'],
      ['/breast-enhancement-comparison/', 'Options compared', 'How approaches differ in evidence and risk.']
    ],
    blocks: [
      prose(
        '<p class="lead">Breasts are made of glandular tissue and fat, so body weight affects them. The relationship is real, but it is not a tool for choosing where fat goes.</p>' +
        '<h2>Weight gain</h2>' +
        '<p>Gaining weight often increases breast volume because fat is stored in the breast. But fat is also gained elsewhere, and where it goes is largely determined by genetics and hormones. You cannot choose to gain weight only in the breasts. Some people gain little breast volume; others notice a marked change.</p>' +
        '<h2>Weight loss</h2>' +
        '<p>Losing weight often reduces breast size, particularly in people whose breasts are mostly fat. Skin may also lose volume and elasticity, leading to a change in shape or sagging. The amount of change is difficult to predict and depends on age, skin quality, genetics and how quickly the weight is lost.</p>' +
        '<h2>Weight fluctuation</h2>' +
        '<p>Repeated weight gain and loss can stretch skin and affect breast shape. Rapid change can leave the skin loose. Weight cycling may also affect general health, so it is not a sensible strategy for changing breast size.</p>' +
        '<h2>Why gaining weight to enlarge breasts is not advisable</h2>' +
        '<ul><li>Results are unpredictable.</li><li>It affects health, including blood pressure, blood sugar and joint load.</li><li>Breast changes may not match your goal.</li><li>Loss of weight later can reverse the effect.</li></ul>' +
        '<h2>If you have a medical reason to change weight</h2>' +
        '<p>A doctor or dietitian can support healthy change. Surgeons often prefer a stable weight before breast surgery, because results are more predictable. If you may gain or lose weight soon, discuss timing with your surgeon.</p>' +
        '<h2>Breast size and exercise</h2>' +
        '<p>Chest exercises do not increase breast tissue but can affect the look of the upper chest. Intense exercise combined with low body fat may reduce breast size. A balanced approach to movement is better than trying to manipulate breast size through exercise alone.</p>' +
        '<p>What is more predictable is that breast size will change if your overall body weight changes substantially. It is not possible to direct that change to the breast alone.</p>'
      ),
      takeaway('Weight affects breast size in unpredictable ways, and it is not a safe tool for targeted enlargement. Focus on health, not on directing fat to the breast.', 'info')
    ]
  }),

  page({
    url: '/breast-enlargement-without-surgery/unhappy-with-size/',
    slug: 'unhappy-with-size',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/breast-enlargement-without-surgery/',
    parentLabel: 'Without surgery',
    h1: 'Feeling Unhappy About Your Breast Size: Understanding the Feeling and Choosing Next Steps',
    cardTitle: 'Feeling unhappy about size',
    seoTitle: 'Feeling Unhappy About Breast Size: Next Steps | Quantum Health',
    seoDescription: 'Support for people who feel unhappy about breast size, including how to think about the feeling, what helps and when to seek advice.',
    bannerLead: 'Many people feel dissatisfied with their breasts at some point. That is common and nothing to be ashamed of. How you respond matters.',
    imageKey: 'withoutSurgery',
    related: [
      ['/breast-enlargement-without-surgery/', 'Breast enlargement without surgery', 'The evidence guide and low-risk options.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, risks and warning signs.'],
      ['/non-surgical/', 'Non-surgical enhancement', 'What different treatments can and cannot offer.']
    ],
    blocks: [
      prose(
        '<p class="lead">Many people feel dissatisfied with their breasts at some point. That is common and nothing to be ashamed of. How you respond matters more than whether the feeling is present.</p>' +
        '<h2>Where the feeling comes from</h2>' +
        '<p>Media, social comparisons, comments from others, life changes such as pregnancy or weight loss, and personal history can all play a part. Filters and edited images create unrealistic standards. It can help to notice when your attention is being pulled towards an ideal that few people meet.</p>' +
        '<h2>Pause before acting</h2>' +
        '<p>A few questions can help:</p>' +
        questions([
          'What exactly bothers me, and in which situations?',
          'Would I feel the same if no one else saw my body?',
          'Am I considering a change for myself or for someone else?',
          'Have I had this feeling for a long time, or is it recent?'
        ]) +
        '<h2>Low-risk steps to try first</h2>' +
        '<ul><li>Professional bra fitting.</li><li>Clothing that suits your body and feels comfortable.</li><li>Talking to someone you trust.</li><li>Limiting exposure to social media that makes you feel worse.</li><li>Focusing on what your body can do, not only how it looks.</li></ul>' +
        '<h2>When to talk to a professional</h2>' +
        '<p>If you feel intense distress, preoccupation with your appearance, avoid social situations or spend a lot of time checking or hiding your body, speak to a doctor or mental health professional. These may be signs of a condition such as body dysmorphic disorder, which is treatable and which surgery generally does not relieve.</p>' +
        '<h2>If you are considering a procedure</h2>' +
        '<p>See a qualified, registered clinician, ask about alternatives including doing nothing, and take time. A consultation should help you decide, not pressure you to book. Bring questions and, if it helps, someone you trust. See our <a href="/breast-enlargement-safety/">safety page</a> for what to check.</p>' +
        '<h2>If someone else is pressuring you</h2>' +
        '<p>A partner, family member or clinic may have strong views about what you should do. The decision is yours. You are allowed to delay, ask for a second opinion or decide against a procedure. Pressure is a reason to slow down, not a reason to consent.</p>'
      ),
      takeaway('Your feelings are valid. Decisions about your body are best made calmly, with accurate information and support, and without pressure from a clinic or a social feed.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/treatments-at-a-glance/',
    slug: 'treatments-at-a-glance',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/',
    parentLabel: 'Non-surgical enhancement',
    h1: 'Non-Surgical Breast Treatments at a Glance: What Each Is Intended to Do',
    cardTitle: 'Treatments at a glance',
    seoTitle: 'Non-Surgical Breast Treatments at a Glance | Quantum Health',
    seoDescription: 'A plain overview of fillers, threads, PRP, biostimulators and regenerative approaches, what each is designed for and the main limitation of each.',
    bannerLead: 'Each non-surgical option has a different purpose. None is a proven substitute for implants or fat transfer when the goal is lasting volume.',
    imageKey: 'nonSurgicalOverview',
    related: [
      ['/non-surgical/', 'Non-surgical enhancement', 'The parent guide to options and safety.'],
      ['/breast-enhancement-comparison/', 'Options compared', 'Surgical and non-surgical approaches side by side.'],
      ['/non-surgical/reading-the-evidence/', 'Reading the evidence', 'How to judge studies and claims.']
    ],
    blocks: [
      prose(
        '<p class="lead">This page summarises the treatments discussed on our site. Details are on each dedicated page. The table is not a recommendation, and a treatment being non-surgical does not make it effective or safe.</p>'
      ),
      {
        type: 'table',
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
        note: 'Approval, availability and evidence vary by country and by product. Always ask about the exact product and its intended use.'
      },
      prose(
        '<h2>How to read the table</h2>' +
        '<p>None of these has the same evidence, or the same ability to change volume, as implants or fat transfer. Some are used for other purposes in the body with better evidence. That does not mean the same benefit applies to the breast.</p>' +
        '<h2>What they may offer</h2>' +
        '<p>Some may produce a small, temporary change in appearance or skin quality. Some may help with skin texture or support in selected people. These are modest goals, and results vary.</p>' +
        '<h2>Why the evidence differs</h2>' +
        '<p>A product can be well studied for one purpose and barely studied for another. Facial fillers, for example, have a body of evidence for specific facial areas. That evidence does not tell us how a large volume behaves in breast tissue, how it affects mammograms, or how often it causes lumps over years. The same logic applies to threads, PRP and collagen stimulators.</p>' +
        '<h2>Cost and repetition</h2>' +
        '<p>Temporary treatments may need repeating to maintain an effect. Ask for the likely number of sessions, the cost over a year, and what happens if you stop. A low initial price can hide ongoing costs and cumulative risk.</p>' +
        '<h2>What to ask</h2>' +
        questions([
          'What is this specific treatment intended to do?',
          'Is it approved or registered for this area and use?',
          'What does the research show, and in which body area?',
          'What are the risks, and how are complications treated?'
        ]) +
        '<p>For the wider comparison, see <a href="/breast-enhancement-comparison/">breast enhancement options compared</a>.</p>'
      ),
      takeaway('Each non-surgical option has a different purpose. Match the claim to the evidence, and do not assume that a treatment used elsewhere in the body is proven in the breast.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/appearance-vs-volume/',
    slug: 'appearance-vs-volume',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/',
    parentLabel: 'Non-surgical enhancement',
    h1: 'Appearance vs Volume: Why Many Non-Surgical Results Are Temporary',
    cardTitle: 'Appearance vs volume',
    seoTitle: 'Appearance vs Volume: Why Non-Surgical Results Are Temporary | Quantum Health',
    seoDescription: 'Why some non-surgical breast treatments may change how the breasts look briefly without adding lasting volume, and how to avoid being misled.',
    bannerLead: 'A change seen soon after a procedure is not always a lasting result. Swelling, absorbed material and photography can all explain it.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical enhancement', 'The parent guide to options and safety.'],
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'Approved uses and safety concerns.'],
      ['/non-surgical/prp/', 'PRP', 'What the evidence says about platelet-rich plasma.']
    ],
    blocks: [
      prose(
        '<p class="lead">People sometimes see a change soon after a non-surgical treatment and assume it is lasting. Several things can explain a short-term change, and none of them is the same as new breast tissue.</p>' +
        '<h2>Swelling and fluid</h2>' +
        '<p>Injections and procedures cause temporary swelling that makes the area look fuller. It fades over days or weeks. This is one reason early photographs can be misleading, especially if they are taken immediately after treatment.</p>' +
        '<h2>Product that is absorbed</h2>' +
        '<p>Many injectable or suture materials are designed to be absorbed by the body. Any effect connected to the material fades as it dissolves. If a provider claims a permanent result from an absorbable product, ask what is supposed to remain after it has gone.</p>' +
        '<h2>Skin changes</h2>' +
        '<p>Some treatments aim to improve skin quality or texture, which can change the look of the skin without altering underlying volume. A tighter-looking surface is not the same as more breast tissue.</p>' +
        '<h2>Photography and positioning</h2>' +
        '<p>Lighting, angle, posture, bras, make-up and editing can all alter apparent size. Photos taken under different conditions are not reliable evidence. Ask for standardised images taken at fixed times, with the same lighting and position.</p>' +
        '<h2>Placebo and expectation</h2>' +
        '<p>People who expect a result may perceive one. This is why controlled studies matter. Anecdotes and testimonials cannot separate a real effect from hope, swelling or a change in clothing.</p>' +
        '<h2>Measuring change properly</h2>' +
        '<p>Reliable assessment uses standard photographs, measurements or 3D imaging at fixed times, and independent evaluation. Ask who measured the result and whether they were involved in selling the treatment.</p>' +
        '<h2>What lasting evidence would look like</h2>' +
        '<p>It would show a measured difference in breast volume or shape that persists after any swelling has settled and after an absorbable product has gone. It would be assessed by people who are not selling the treatment, and it would report complications honestly.</p>' +
        '<h2>What to ask a provider</h2>' +
        questions([
          'How is the result measured?',
          'How long does it last, according to published data?',
          'Can I see results at six and twelve months, not only days after treatment?'
        ])
      ),
      takeaway('Judge any result at several months, not days after a procedure. If the effect depends on swelling or an absorbable material, expect it to change.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/reading-the-evidence/',
    slug: 'reading-the-evidence',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/',
    parentLabel: 'Non-surgical enhancement',
    h1: 'How to Read the Evidence on Non-Surgical Breast Treatments',
    cardTitle: 'Reading the evidence',
    seoTitle: 'How to Read the Evidence on Non-Surgical Breast Treatments | Quantum Health',
    seoDescription: 'A practical guide to judging studies, reviews and testimonials on non-surgical breast enlargement, including common weaknesses.',
    bannerLead: 'Claims often cite studies, but studies vary widely in quality. These questions help separate useful evidence from marketing.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical enhancement', 'The parent guide to options and safety.'],
      ['/research/', 'Research library', 'Study findings, limitations and original publications.'],
      ['/references/', 'References', 'Clinical studies and reviews behind the site.']
    ],
    blocks: [
      prose(
        '<p class="lead">Claims about non-surgical breast treatments often cite studies, but studies vary widely in quality. A single paper, a conference abstract or a testimonial is not enough to establish that a treatment works.</p>' +
        '<h2>Stronger evidence</h2>' +
        '<ul><li>Randomised controlled trials with a comparison group.</li><li>Large numbers of participants.</li><li>Independent measurement of results.</li><li>Long follow-up, at least a year.</li><li>Systematic reviews of multiple studies.</li><li>Publication in recognised peer-reviewed journals.</li></ul>' +
        '<h2>Weaker evidence</h2>' +
        '<ul><li>Case reports and small series.</li><li>No control group.</li><li>Short follow-up.</li><li>Results measured by the person selling the treatment.</li><li>Studies funded by the manufacturer without independent review.</li><li>Animal or laboratory research presented as proof in people.</li><li>Testimonials and before-and-after photos.</li></ul>' +
        '<h2>Questions to ask about a study</h2>' +
        questions([
          'Who was studied, and how many?',
          'What was measured, and how?',
          'How long were people followed?',
          'Were there side effects, and how were they reported?',
          'Who funded it?'
        ]) +
        '<h2>Use from a different body area</h2>' +
        '<p>A treatment studied for the face or skin does not automatically work or stay safe in the breast. The tissue is different, the volumes needed are different, and the consequences of complications are different. Look for evidence in the breast itself.</p>' +
        '<h2>Reading a review</h2>' +
        '<p>A systematic review can be useful, but check whether it found enough good studies to answer the question. A review that concludes "insufficient evidence" is not proof that a treatment works; it means the question remains open. Look at the size and quality of the included studies, not only the headline.</p>' +
        '<h2>Check the journal and the authors</h2>' +
        '<p>Peer review is not a guarantee of quality, but it is a basic filter. Check whether the journal is indexed and whether the authors declare funding or conflicts of interest. Be cautious when a clinic cites its own unpublished audit as proof that its treatment works.</p>' +
        '<h2>Where to look</h2>' +
        '<p>Our <a href="/research/">research library</a> and <a href="/references/">references page</a> link to original sources. Read the abstract and, where possible, the full paper. Check whether the conclusion matches the data and whether the authors acknowledge limitations.</p>'
      ),
      takeaway('Look for independent, controlled, long-term evidence in the breast itself. Absence of it is information too, and it should shape what you are willing to pay and risk.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/regulatory-status/',
    slug: 'regulatory-status',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/',
    parentLabel: 'Non-surgical enhancement',
    h1: 'Approved Use vs Off-Label Use: Understanding Regulatory Status',
    cardTitle: 'Regulatory status',
    seoTitle: 'Approved Use vs Off-Label Use: Regulatory Status Explained | Quantum Health',
    seoDescription: 'What it means for a product to be approved, cleared or used off-label, and why it matters for non-surgical breast treatments.',
    bannerLead: 'Many non-surgical breast treatments use products approved for something else. Knowing the difference helps you ask better questions.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical enhancement', 'The parent guide to options and safety.'],
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'Why facial approval is not breast approval.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, risks and warning signs.']
    ],
    blocks: [
      prose(
        '<p class="lead">Many non-surgical breast treatments use products approved for something else. Knowing the difference between approved, cleared, registered and off-label use helps you ask better questions.</p>' +
        '<h2>What approval means</h2>' +
        '<p>Regulators assess a product for a specific purpose, in a specific body area, using specific evidence of safety and performance. Approval is tied to that intended use. A product can be legally sold and still not be approved for the use you are being offered.</p>' +
        '<h2>Approved, cleared and registered</h2>' +
        '<p>Terms differ by country. In some systems a product is "approved" after detailed review; in others it is "cleared" as similar to an existing device, or simply "registered". These carry different levels of scrutiny. In India, medical devices are regulated under the Medical Devices Rules, administered by the CDSCO. Ask which category and registration applies to the exact product, and verify it independently on the regulator\'s public information.</p>' +
        '<h2>Off-label use</h2>' +
        '<p>Doctors may legally use some products for purposes other than those approved, when they judge it appropriate. Off-label does not automatically mean unsafe, but it means the specific use has not been reviewed by the regulator, so evidence of safety and benefit may be limited. The further the use is from the approved area, the more caution is needed.</p>' +
        '<h2>Why it matters for breasts</h2>' +
        '<p>A filler approved for lips or cheeks has not been shown safe or effective in the breast. A thread cleared as a suture has not necessarily been shown to enlarge or lift the breast. A product being approved "in the country" does not tell you what it is approved for.</p>' +
        '<h2>Questions to ask</h2>' +
        questions([
          'Is this exact product approved or registered for this use?',
          'Can I see the documentation, product name and batch number?',
          'If it is off-label, why do you recommend it, and what evidence supports it?',
          'Will I be asked to sign a specific consent form?'
        ]) +
        '<h2>Red flags</h2>' +
        '<ul><li>Vague answers about the product.</li><li>Unbranded or imported products without documents.</li><li>Claims such as "FDA approved" with no detail about the approval or the use.</li></ul>'
      ),
      takeaway('Approval is specific to a purpose. Ask what the product is approved for, not just whether it is approved.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/questions-and-red-flags/',
    slug: 'questions-and-red-flags',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/',
    parentLabel: 'Non-surgical enhancement',
    h1: 'Questions to Ask Before Any Non-Surgical Breast Treatment, and Red Flags',
    cardTitle: 'Questions and red flags',
    seoTitle: 'Questions to Ask Before Non-Surgical Breast Treatment | Quantum Health',
    seoDescription: 'A practical checklist of questions to ask a clinic offering non-surgical breast treatments, and the warning signs that should make you pause.',
    bannerLead: 'Use this checklist at a consultation. A trustworthy provider welcomes questions and gives you time to decide.',
    imageKey: 'nonSurgicalSafety',
    related: [
      ['/non-surgical/', 'Non-surgical enhancement', 'The parent guide to options and safety.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, risks and warning signs.'],
      ['/non-surgical/regulatory-status/', 'Regulatory status', 'What approval and off-label use mean.']
    ],
    blocks: [
      prose(
        '<p class="lead">Use this checklist at a consultation. A trustworthy provider welcomes questions, gives clear answers and does not rush you. If you cannot get clear answers, walk away.</p>' +
        '<h2>About the treatment</h2>' +
        questions([
          'What exactly is it intended to do for the breast?',
          'What is the evidence for breast use, and where is it published?',
          'How long do results last, and how is that known?',
          'What are the risks, and how are complications treated?',
          'What are the alternatives, including doing nothing?'
        ]) +
        '<h2>About the product</h2>' +
        questions([
          'What is the product name, manufacturer and batch number?',
          'Is it approved or registered for this use?',
          'Is it absorbable? If so, what happens as it dissolves?'
        ]) +
        '<h2>About the clinician</h2>' +
        questions([
          'What are your registration and specialist qualifications?',
          'How many of these treatments have you done in the breast?',
          'Who treats complications, and where?'
        ]) +
        '<h2>About the setting</h2>' +
        questions([
          'Is this a licensed medical facility?',
          'What emergency arrangements exist?',
          'How do I contact you out of hours?'
        ]) +
        '<h2>About costs and consent</h2>' +
        questions([
          'What is included in the price, and what is not?',
          'Will I get written information and time to decide?'
        ]) +
        '<h2>Red flags</h2>' +
        '<ul><li>Guaranteed results or cup-size promises.</li><li>Pressure to book or pay quickly, or time-limited discounts.</li><li>Reluctance to name the product.</li><li>Before-and-after photos that cannot be verified.</li><li>No medical history taken.</li><li>Treatment offered outside a medical setting.</li><li>Claims that it is "risk-free", "natural" or "permanent".</li></ul>' +
        '<h2>How to use the checklist</h2>' +
        '<p>Write the answers down or ask for them in writing. Compare what different providers say. A clinic that cannot explain the product, the evidence and the complication plan in plain language is not giving you enough to make an informed decision.</p>' +
        '<h2>Consent is more than a signature</h2>' +
        '<p>You should understand what will be done, what could go wrong, what alternatives exist and what happens if you change your mind. Consent obtained under pressure or without time to read is not meaningful consent.</p>' +
        '<p>Take your time. You can leave, think and get another opinion. See our <a href="/breast-enlargement-safety/">safety guide</a> for more on warning signs and consent.</p>'
      ),
      takeaway('If you cannot get clear answers about the product, the evidence and the plan for complications, do not proceed.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/dermal-fillers/hyaluronic-acid-fillers/',
    slug: 'hyaluronic-acid-fillers',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/dermal-fillers/',
    parentLabel: 'Breast fillers',
    h1: 'Hyaluronic Acid Fillers: What They Are and What They Are Approved For',
    cardTitle: 'Hyaluronic acid fillers',
    seoTitle: 'Hyaluronic Acid Fillers: Approved Uses and Breast Limits | Quantum Health',
    seoDescription: 'What hyaluronic acid fillers are, how they work, their usual approved uses and why those approvals do not extend to breast enlargement.',
    bannerLead: 'Hyaluronic acid fillers are familiar in facial aesthetics. Their approvals are specific, and they do not establish safety or effectiveness in the breast.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to safety and evidence.'],
      ['/non-surgical/dermal-fillers/complications/', 'Filler complications', 'What can go wrong and how problems are treated.'],
      ['/non-surgical/dermal-fillers/screening/', 'Fillers and screening', 'Why imaging teams need to know.']
    ],
    blocks: [
      prose(
        '<p class="lead">Hyaluronic acid (HA) is a substance found naturally in the body that attracts and holds water. HA fillers are gels made from a modified form, injected to add volume or fill lines. They are not the same as a breast implant, and they are not approved for breast enlargement.</p>' +
        '<h2>How they work</h2>' +
        '<p>The gel sits under the skin and adds volume directly, and it binds water. The body gradually breaks it down, so effects are temporary, commonly lasting months to a couple of years depending on the product and area. The result depends on the amount injected, the product\'s properties and the tissue being treated.</p>' +
        '<h2>Typical approved uses</h2>' +
        '<p>Approvals vary by product and country, but typically include facial areas such as lips, cheeks, nasolabial folds and under-eye hollows, and in some cases hands. Approval is based on studies in those areas. It is tied to a specific product, indication and injection technique, not to the ingredient in general.</p>' +
        '<h2>Why this does not cover breasts</h2>' +
        '<p>Breast tissue is much larger, softer and more complex. Studies supporting facial use do not show safety or effectiveness in breast enlargement. A product may be sold in a country but still not be approved for breast use. "HA is natural" does not mean that a large volume injected into the breast is low risk.</p>' +
        '<h2>Dissolvable does not mean risk-free</h2>' +
        '<p>HA fillers can be broken down by an enzyme called hyaluronidase, which is one of their advantages. This applies only to HA products and does not apply to other filler materials. Even when dissolution is possible, it may not resolve every complication, and the enzyme itself can cause reactions.</p>' +
        '<h2>Other filler types</h2>' +
        '<p>Other fillers use different materials, such as calcium hydroxylapatite or poly-L-lactic acid, with different behaviours. Some are semi-permanent or permanent. Each has its own risks, and none should be assumed safe for breast enlargement.</p>' +
        '<h2>Questions to ask</h2>' +
        questions([
          'What is the exact product, and is it HA?',
          'What is it approved for, and in which country?',
          'What would happen if I needed it removed?',
          'How many millilitres are proposed, and over how many sessions?'
        ])
      ),
      takeaway('Fillers approved for the face are not proven for breast use. Ask about the exact product and its approved indication, not just the ingredient.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/dermal-fillers/why-breasts-are-different/',
    slug: 'why-breasts-are-different',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/dermal-fillers/',
    parentLabel: 'Breast fillers',
    h1: 'Why the Breast Is Not Like the Face: Volume, Spread and Safety',
    cardTitle: 'Why breasts are different',
    seoTitle: 'Why the Breast Is Not Like the Face: Filler Risks | Quantum Health',
    seoDescription: 'The practical and safety reasons why injectable fillers designed for the face are difficult to use for breast enlargement.',
    bannerLead: 'The face and breast are very different places to inject. Volume, tissue movement and imaging all change the risk calculation.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to safety and evidence.'],
      ['/non-surgical/dermal-fillers/complications/', 'Filler complications', 'Lumps, infection and other problems.'],
      ['/breast-anatomy/', 'Breast anatomy', 'Why breast tissue is structurally different.']
    ],
    blocks: [
      prose(
        '<p class="lead">The face and breast are very different places to inject. A technique that works for a small facial hollow does not automatically transfer to a large, soft, mobile organ.</p>' +
        '<h2>The volume problem</h2>' +
        '<p>A filler syringe usually holds around one millilitre. A noticeable breast increase involves volumes many times larger, often hundreds of millilitres per breast, meaning very large quantities of product. This raises costs, risks and the chance of complications. It also means a complication may involve a large area rather than a small, contained one.</p>' +
        '<h2>Product spread</h2>' +
        '<p>A soft, large organ allows injected gel to shift or spread with movement, gravity and pressure. Lumps, irregularities and migration are more likely. The product may not stay where it was placed, and it can be difficult to know exactly where it has gone.</p>' +
        '<h2>Difficulty correcting problems</h2>' +
        '<p>With small amounts, a problem may be easier to treat. With large volumes, treatment is harder and may involve surgery. Some materials cannot be dissolved, and removal may be incomplete. The more product there is, the more complex the correction.</p>' +
        '<h2>Interference with screening</h2>' +
        '<p>Injected material can appear on mammograms and ultrasound, and may be mistaken for abnormalities or hide real ones. See <a href="/non-surgical/dermal-fillers/screening/">fillers and screening</a>. This is a long-term consideration, not only a risk on the day of treatment.</p>' +
        '<h2>Lack of long-term evidence</h2>' +
        '<p>Compared with facial use, little long-term data exist on breast fillers, especially across years of screening and ageing. We do not have good answers to basic questions about how often lumps occur, how the material behaves over time, or how it affects breast cancer surveillance.</p>' +
        '<h2>Professional caution</h2>' +
        '<p>Some professional bodies have expressed concerns about large-volume fillers in the breast. Some large-volume HA products once marketed for the breast have faced restrictions or withdrawal in some places. Ask what has happened to the exact product you are considering.</p>' +
        '<h2>Questions to ask</h2>' +
        questions([
          'How many millilitres would my treatment need?',
          'What happens if it forms lumps or moves?',
          'How would it affect my mammograms?',
          'Can it be removed, and how completely?'
        ])
      ),
      takeaway('The scale and nature of the breast make filler use there a different, higher-risk proposition. Facial evidence cannot be stretched to cover it.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/dermal-fillers/complications/',
    slug: 'complications',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/dermal-fillers/',
    parentLabel: 'Breast fillers',
    h1: 'Complications of Breast Filler Injections and How They Are Treated',
    cardTitle: 'Filler complications',
    seoTitle: 'Complications of Breast Filler Injections | Quantum Health',
    seoDescription: 'The potential complications of breast filler injections, signs to watch for and how doctors may approach treatment.',
    bannerLead: 'Complications range from mild and short-lived to serious and long-lasting. Early recognition gives the best chance of effective treatment.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to safety and evidence.'],
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'What removal involves and why it can be complex.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Warning signs and when to seek help.']
    ],
    blocks: [
      prose(
        '<p class="lead">Complications range from mild and short-lived to serious and long-lasting. Some appear immediately; others develop months or years later. Early recognition gives the best chance of effective treatment.</p>' +
        '<h2>Common early effects</h2>' +
        '<p>Bruising, swelling, tenderness and redness are common after any injection and usually settle within days. These are expected effects, not proof that the treatment is working or that it is safe.</p>' +
        '<h2>Possible complications</h2>' +
        '<ul><li><strong>Lumps and nodules:</strong> firm areas that may appear soon after or much later.</li><li><strong>Infection:</strong> including abscess, sometimes with delayed onset.</li><li><strong>Inflammation or granulomas:</strong> a reaction around the material.</li><li><strong>Migration:</strong> product moving from where it was placed.</li><li><strong>Asymmetry or irregular contour.</strong></li><li><strong>Skin changes</strong> and, rarely, skin damage from compromised blood supply.</li><li><strong>Allergic reactions.</strong></li><li><strong>Biofilm-related problems:</strong> persistent low-grade infection.</li><li><strong>Difficulty with imaging and screening.</strong></li></ul>' +
        '<h2>Signs that need prompt attention</h2>' +
        '<p>Severe pain, skin turning pale, blue or dark, spreading redness, fever, rapidly growing lumps or discharge need urgent assessment. Do not wait to see whether these settle on their own.</p>' +
        '<h2>How doctors may treat it</h2>' +
        '<ul><li>Hyaluronidase to dissolve HA products.</li><li>Antibiotics and drainage for infection.</li><li>Anti-inflammatory treatment.</li><li>Surgery for persistent lumps or non-dissolvable material.</li></ul>' +
        '<p>Treatment depends on the product, the timing and the symptoms. Some problems are easier to manage than others, and not every complication can be fully corrected. See our page on <a href="/surgical/breast-filler-removal/">breast filler removal</a>.</p>' +
        '<h2>When to seek emergency care</h2>' +
        '<p>Go to an emergency department or contact your provider urgently if you have severe pain, a rapid increase in swelling, fever with shaking chills, skin that turns pale, mottled, blue or black, or redness that spreads quickly. These can indicate infection, a collection of blood or compromised blood supply. Do not wait for a routine appointment.</p>' +
        '<h2>Your part</h2>' +
        '<p>Keep a record of what was injected, tell all clinicians, and report symptoms early. If you do not know the product, say so; imaging and examination can still help. Do not squeeze or try to drain a lump yourself.</p>'
      ),
      takeaway('Most problems are better managed when caught early. Seek urgent care for severe pain, skin colour change, fever or rapidly growing lumps.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/dermal-fillers/screening/',
    slug: 'screening',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/dermal-fillers/',
    parentLabel: 'Breast fillers',
    h1: 'Breast Fillers and Screening: What Radiologists and Patients Should Know',
    cardTitle: 'Fillers and screening',
    seoTitle: 'Breast Fillers and Screening: Mammograms and Imaging | Quantum Health',
    seoDescription: 'How injected breast fillers can appear on mammograms, ultrasound and MRI, and why you should tell your imaging team.',
    bannerLead: 'Breast screening is an important health check. Injected material can complicate it, so the imaging team needs to know what was injected and when.',
    imageKey: 'dermalFillers',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to safety and evidence.'],
      ['/surgical/mammograms-with-implants/', 'Mammograms with implants', 'How implants affect imaging.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Screening and warning signs.']
    ],
    blocks: [
      prose(
        '<p class="lead">Breast screening is an important health check. Injected material can complicate it, and the people reading your images need to know about it before they start.</p>' +
        '<h2>How fillers can appear</h2>' +
        '<ul><li><strong>Mammography:</strong> some materials look like dense areas, calcifications or masses.</li><li><strong>Ultrasound:</strong> collections of gel can look like cysts, with variable appearances.</li><li><strong>MRI:</strong> may show collections and inflammation.</li></ul>' +
        '<p>Appearances depend on the product, how long ago it was injected and the tissue reaction. There is no single pattern that covers every filler.</p>' +
        '<h2>The risk of misinterpretation</h2>' +
        '<p>Injected material may be mistaken for a lump or other abnormality, leading to extra tests or biopsies. It could also obscure a genuine abnormality. Both possibilities matter: unnecessary procedures cause anxiety and cost, while a missed finding is more serious.</p>' +
        '<h2>What to do</h2>' +
        '<ul><li>Tell the clinic and the radiologist exactly what was injected, when and where, before imaging.</li><li>Bring any documents, product names or batch details.</li><li>Ask whether the imaging team has experience with injected breasts.</li><li>Keep up with screening recommended for your age and risk.</li></ul>' +
        '<h2>Biopsy</h2>' +
        '<p>If a biopsy is needed, say that you have had injections. Sampling through injected material needs careful planning, and the pathologist may need to know what material is present.</p>' +
        '<h2>If you do not know what was injected</h2>' +
        '<p>Say so. Imaging and, if needed, tissue sampling can help characterise it. Do not guess a product name or assume it was HA. If you had treatment abroad, bring any paperwork or photographs of the product packaging.</p>' +
        '<h2>Will I still be screened?</h2>' +
        '<p>Having fillers does not usually mean you should skip screening. It means the imaging team needs a clear history so they can choose the best technique and interpret the images. Screening recommendations depend on age, family history and local guidance, not on whether you have had a cosmetic injection.</p>' +
        '<h2>For clinics</h2>' +
        '<p>A provider should discuss screening implications before any breast injection and record the details for future reference. That record should be given to the patient, not kept only in the clinic file.</p>'
      ),
      takeaway('Always tell imaging teams about breast injections, even if the treatment was years ago. A clear history helps them interpret what they see.', 'info')
    ]
  }),

  page({
    url: '/non-surgical/dermal-fillers/options-compared/',
    slug: 'options-compared',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/dermal-fillers/',
    parentLabel: 'Breast fillers',
    h1: 'If You Want Fuller Breasts: How Filler Compares With Other Options',
    cardTitle: 'Filler options compared',
    seoTitle: 'Breast Fillers Compared With Fat Transfer and Implants | Quantum Health',
    seoDescription: 'A balanced comparison of fillers with fat transfer, implants and non-medical options for people seeking a change in breast fullness.',
    bannerLead: 'If fullness is your goal, it helps to see how options differ in evidence, duration, risk and what they can realistically achieve.',
    imageKey: 'compareOptions',
    related: [
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'The parent guide to safety and evidence.'],
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer', 'Your own fat, and why it is still surgery.'],
      ['/breast-implants/', 'Breast implants', 'Types, placement and long-term monitoring.']
    ],
    blocks: [
      prose(
        '<p class="lead">If fullness is your goal, it helps to see how options differ. The question is not only whether a procedure involves a knife, but whether it has evidence, how long it lasts and what happens if something goes wrong.</p>' +
        '<h2>Fillers</h2>' +
        '<ul><li>Not approved for breast enlargement in many countries.</li><li>Temporary or uncertain duration.</li><li>Risks of lumps, infection, migration and screening problems.</li><li>Large volumes needed, so cost and risk are high.</li><li>Limited evidence in the breast.</li></ul>' +
        '<h2>Fat transfer</h2>' +
        '<ul><li>Uses your own tissue, usually for a modest increase.</li><li>Requires liposuction and enough donor fat.</li><li>Variable survival of fat; lumps are possible.</li><li>It is a surgical procedure with anaesthesia, scars and recovery.</li></ul>' +
        '<p>See <a href="/surgical/fat-transfer-breast-augmentation/">fat transfer breast augmentation</a> for the full process.</p>' +
        '<h2>Implants</h2>' +
        '<ul><li>Designed and regulated for breast enlargement.</li><li>More predictable volume change.</li><li>Surgical risks, long-term monitoring and possible further surgery.</li></ul>' +
        '<p>See <a href="/breast-implants/">breast implants</a> for types, placement and follow-up.</p>' +
        '<h2>Non-medical options</h2>' +
        '<ul><li>Padded bras, clothing and posture.</li><li>No medical risk, no change in tissue.</li><li>Useful for appearance and comfort, not for volume.</li></ul>' +
        '<h2>Choosing</h2>' +
        '<p>The best option depends on your goals, anatomy, health, risk tolerance and willingness to have surgery. A consultation with a registered, qualified clinician can help you compare them. Be wary of anyone who recommends only the treatment they sell.</p>' +
        '<h2>Cost and time</h2>' +
        '<p>Compare the total cost over several years, not only the first appointment. Temporary treatments may need repeating, and complications may add costs that were not in the original quote. Surgery has a larger upfront cost and downtime, but may not need repeating as often. Ask what follow-up and revision are included.</p>' +
        '<h2>Questions to ask</h2>' +
        questions([
          'Which option suits my goals and body?',
          'What are the long-term commitments?',
          'What if I am unhappy with the result?',
          'What evidence exists for the specific use you are proposing?'
        ])
      ),
      takeaway('Compare options by evidence and long-term implications, not just by whether they involve a knife. A non-surgical label does not make a treatment safer or more effective.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/breast-threads/what-they-are/',
    slug: 'what-they-are',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/breast-threads/',
    parentLabel: 'Breast threads',
    h1: 'What Are Breast Threads? Types, Materials and Intended Purpose',
    cardTitle: 'What breast threads are',
    seoTitle: 'What Are Breast Threads? Types and Materials | Quantum Health',
    seoDescription: 'An introduction to thread procedures sometimes offered for the breast, the materials used and what they are designed to do.',
    bannerLead: 'Thread procedures place thin, sterile threads under the skin. They are used for lifting or support in some areas, but breast use is largely unproven.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to uses and limitations.'],
      ['/non-surgical/mono-threads/', 'Mono threads', 'Smooth threads and their intended effect.'],
      ['/non-surgical/breast-threads/can-and-cannot-do/', 'What threads can and cannot do', 'A realistic look at the limits.']
    ],
    blocks: [
      prose(
        '<p class="lead">Thread procedures place thin, sterile threads under the skin. They have been used in the face and body for lifting or skin support. Breast use is a different proposition, and the evidence is much thinner.</p>' +
        '<h2>Materials</h2>' +
        '<p>Most absorbable threads are made from polydioxanone (PDO), also used in dissolvable stitches. Others use polylactic acid or polycaprolactone. Non-absorbable threads exist but are used differently. The material affects how long the thread lasts and how the body responds to it.</p>' +
        '<h2>Types</h2>' +
        '<ul><li><strong>Smooth (mono) threads:</strong> designed mainly to stimulate the skin. See <a href="/non-surgical/mono-threads/">mono threads</a>.</li><li><strong>Barbed or cog threads:</strong> have small barbs or cones designed to grip tissue for a mechanical lifting effect.</li><li><strong>Screw or twisted threads:</strong> a spiral shape, often used for a volumising effect in the skin.</li></ul>' +
        '<h2>The intended idea</h2>' +
        '<p>Cog threads are placed to hold or lift tissue; the body\'s response around the thread may stimulate collagen. Marketing for breast use often claims lift and enhanced shape. These are intended effects, not guaranteed outcomes. A thread is not a structural support in the same way as a surgical lift.</p>' +
        '<h2>Evidence in the breast</h2>' +
        '<p>Threads were developed and mostly studied for facial and some body use. High-quality evidence for breast enlargement or lift is limited, and threads are not designed to add significant volume. Small case series and provider reports cannot tell you how likely a meaningful result is, or how often complications occur.</p>' +
        '<h2>Regulatory status</h2>' +
        '<p>Many threads are cleared or registered as surgical sutures. Approval for aesthetic breast use varies and may be absent. Ask what applies to the exact product, not to the thread material in general.</p>' +
        '<h2>Questions to ask</h2>' +
        questions([
          'What type and material are the threads?',
          'What is the intended effect in my breast?',
          'What evidence exists for breast use?',
          'Is this product registered for this purpose?'
        ])
      ),
      takeaway('Threads differ in material and design, and their breast use is largely unproven. Ask for the exact product and the evidence behind the claim.', 'evidence')
    ]
  }),

  page({
    url: '/non-surgical/breast-threads/can-and-cannot-do/',
    slug: 'can-and-cannot-do',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/breast-threads/',
    parentLabel: 'Breast threads',
    h1: 'What Breast Threads Can and Cannot Do',
    cardTitle: 'What threads can and cannot do',
    seoTitle: 'What Breast Threads Can and Cannot Do | Quantum Health',
    seoDescription: 'A realistic look at the possible effects of breast threads, including mild lifting or skin support, and why they do not substitute for surgery.',
    bannerLead: 'Threads are often advertised as a "non-surgical breast lift". It helps to separate a possible modest effect from an unrealistic promise.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to uses and limitations.'],
      ['/surgical/breast-lift/', 'Breast lift surgery', 'What a surgical lift can address.'],
      ['/breast-anatomy/', 'Breast anatomy', 'Why sagging involves skin and tissue support.']
    ],
    blocks: [
      prose(
        '<p class="lead">Threads are often advertised as a "non-surgical breast lift". It helps to separate possibility from promise. A thread can be placed under the skin; that does not mean it can support the weight of a breast.</p>' +
        '<h2>What threads may do</h2>' +
        '<ul><li>Provide a small, temporary change in the position of soft tissue.</li><li>Slightly tighten or support skin.</li><li>Stimulate some collagen around the thread.</li></ul>' +
        '<p>Such effects may be subtle, vary between people and fade as threads dissolve over months. A change in posture or clothing can produce a similar visual effect without any procedure.</p>' +
        '<h2>What threads cannot reasonably do</h2>' +
        '<ul><li>Add meaningful breast volume.</li><li>Correct moderate or significant sagging.</li><li>Remove excess skin.</li><li>Give the result of a surgical lift.</li><li>Make a lasting change if the thread is absorbable.</li></ul>' +
        '<h2>Why sagging is hard to treat with threads</h2>' +
        '<p>Sagging involves stretched skin, descended tissue and weight, and threads have limited holding strength. A surgical lift removes skin and repositions tissue. A thread can pull on a small area, but it cannot recreate the support that has been lost.</p>' +
        '<h2>Evidence</h2>' +
        '<p>Studies in the breast are limited, mostly small and short. Reported benefits are modest and often assessed by the providers. There is no robust evidence that threads produce a lasting lift or an increase in breast volume.</p>' +
        '<h2>Who might consider threads</h2>' +
        '<p>People with very mild changes who accept a modest, temporary effect and understand the risks. Anyone with moderate or significant sagging, or who wants more volume, should ask whether a surgical opinion is more appropriate.</p>' +
        '<h2>Questions to ask</h2>' +
        questions([
          'How much change is realistic for my breasts?',
          'How long will it last?',
          'What happens if I am unhappy?',
          'How does this compare with a surgical lift?'
        ])
      ),
      takeaway('Threads are not a replacement for a surgical lift or for implants. They may offer a small, temporary change at best, with real risks.', 'info')
    ]
  }),

  page({
    url: '/non-surgical/breast-threads/procedure-recovery/',
    slug: 'procedure-recovery',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/breast-threads/',
    parentLabel: 'Breast threads',
    h1: 'The Breast Thread Procedure and Recovery: What Is Involved',
    cardTitle: 'Procedure and recovery',
    seoTitle: 'Breast Thread Procedure and Recovery | Quantum Health',
    seoDescription: 'How breast thread procedures are described, what the experience may involve, typical aftercare and when to contact a doctor.',
    bannerLead: 'Procedures vary between providers, and breast use is not a standardised treatment. This page describes what is commonly reported.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to uses and limitations.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Warning signs and when to seek help.'],
      ['/surgical/breast-surgery-warning-signs/', 'Urgent warning signs', 'Symptoms that need prompt assessment.']
    ],
    blocks: [
      prose(
        '<p class="lead">Procedures vary between providers, and because breast use is not an established, standardised treatment, there is no single agreed method. This page describes what is commonly reported, not a recommended technique.</p>' +
        '<h2>Assessment</h2>' +
        '<p>A clinician should take a medical history, examine your breasts and discuss goals, risks and alternatives. Medical conditions, bleeding tendency, skin infections and allergies matter. If you have unexplained lumps or breast symptoms, these should be assessed before any cosmetic procedure.</p>' +
        '<h2>The procedure</h2>' +
        '<ul><li>The skin is cleaned and the area marked.</li><li>Local anaesthetic is usually given.</li><li>Threads, loaded in fine needles or cannulas, are passed under the skin in planned patterns.</li><li>Some threads are left in place; the needle is withdrawn.</li><li>Treatment commonly takes up to an hour or so.</li></ul>' +
        '<p>You may feel pulling, pressure or stinging. Tell the clinician if you have pain; more anaesthetic may be needed.</p>' +
        '<h2>Immediately afterwards</h2>' +
        '<p>Bruising, swelling, tenderness, tightness and small puncture marks are common. Some people feel the threads or notice pulling when they move. These effects usually settle, but they can be uncomfortable.</p>' +
        '<h2>Aftercare</h2>' +
        '<p>Providers commonly advise:</p>' +
        '<ul><li>Avoiding strenuous exercise and heavy lifting for a period.</li><li>Avoiding tight underwire bras or pressure as instructed.</li><li>Sleeping on your back.</li><li>Avoiding saunas, hot baths and massage of the area.</li><li>Using prescribed or recommended pain relief.</li></ul>' +
        '<p>Follow the specific instructions you receive. If advice conflicts with this general page, follow your clinician\'s written plan.</p>' +
        '<h2>How long do effects last?</h2>' +
        '<p>Absorbable threads dissolve over months. Any effect related to the thread itself is expected to fade as it is absorbed, although some providers claim collagen effects last longer. Published breast data are limited.</p>' +
        '<h2>When to contact a doctor</h2>' +
        '<p>Fever, spreading redness, severe pain, discharge, a thread poking through the skin, skin dimpling or a new lump need assessment. See our page on <a href="/surgical/breast-surgery-warning-signs/">urgent warning signs</a>.</p>'
      ),
      takeaway('Ask for a clear written explanation of the procedure and aftercare before you agree. If you are not told what to expect, do not proceed.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/breast-threads/risks/',
    slug: 'risks',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/breast-threads/',
    parentLabel: 'Breast threads',
    h1: 'Risks of Breast Thread Procedures',
    cardTitle: 'Thread risks',
    seoTitle: 'Risks of Breast Thread Procedures | Quantum Health',
    seoDescription: 'The potential complications of breast threads, including infection, visible or migrating threads, dimpling and asymmetry, and how they may be managed.',
    bannerLead: 'Thread procedures are often described as minimally invasive, but they place a foreign material under the skin. That carries real risks.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to uses and limitations.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Warning signs and when to seek help.'],
      ['/surgical/breast-surgery-warning-signs/', 'Urgent warning signs', 'Symptoms that need prompt assessment.']
    ],
    blocks: [
      prose(
        '<p class="lead">Thread procedures are often described as minimally invasive, but they place a foreign material under the skin. The breast is soft and mobile, and threads can behave differently from how they do in the face.</p>' +
        '<h2>Possible complications</h2>' +
        '<ul><li>Bruising, swelling and pain.</li><li>Infection, including abscess, sometimes late.</li><li>Visible or palpable threads, especially in thin tissue.</li><li>Thread extrusion: a thread coming through the skin.</li><li>Migration: threads moving from the intended position.</li><li>Skin dimpling, puckering or irregularities.</li><li>Asymmetry.</li><li>Granulomas or inflammatory nodules.</li><li>Nerve irritation or altered sensation.</li><li>Scarring at entry points.</li><li>Allergic reaction or reaction to the material.</li><li>Interference with imaging, possibly appearing as lines on mammograms or ultrasound.</li></ul>' +
        '<h2>Why the breast is different</h2>' +
        '<p>The breast is soft, mobile and changes with movement, weight and hormones. Threads can shift, become visible or fail to hold tissue. The weight of the breast is much greater than the small areas of skin used in facial thread lifts.</p>' +
        '<h2>Removal difficulties</h2>' +
        '<p>Absorbable threads dissolve over time, but in some cases problems need earlier removal. Removal can be difficult if threads are deep or have migrated. A thread that has caused a lump or infection may need surgical exploration.</p>' +
        '<h2>Who has higher risk</h2>' +
        '<p>People with active infections, skin conditions at the site, bleeding disorders, autoimmune conditions, keloid tendency or poor healing should discuss this carefully. Pregnancy and breastfeeding are also reasons to delay elective treatment.</p>' +
        '<h2>Questions to ask</h2>' +
        questions([
          'What complications have you seen with breast threads?',
          'How would you remove them if needed?',
          'Who treats me if there is a problem out of hours?',
          'How would this affect future breast imaging?'
        ])
      ),
      takeaway('Understand the risks and the plan for problems before you agree to threads. A "minimally invasive" label does not remove the need for a complication plan.', 'safety')
    ]
  }),

  page({
    url: '/non-surgical/breast-threads/vs-breast-lift/',
    slug: 'vs-breast-lift',
    section: 'non-surgical',
    group: 'nonsurgical',
    parent: '/non-surgical/breast-threads/',
    parentLabel: 'Breast threads',
    h1: 'Breast Threads vs a Surgical Breast Lift: An Honest Comparison',
    cardTitle: 'Threads vs a breast lift',
    seoTitle: 'Breast Threads vs a Surgical Breast Lift | Quantum Health',
    seoDescription: 'How thread procedures differ from surgical breast lift in what they can achieve, how long they last, risks and cost considerations.',
    bannerLead: 'Because threads are marketed as a "lift without surgery", comparing them with a surgical lift is useful. They are not equivalent treatments.',
    imageKey: 'threadProcedures',
    related: [
      ['/non-surgical/breast-threads/', 'Breast thread procedures', 'The parent guide to uses and limitations.'],
      ['/surgical/breast-lift/', 'Breast lift surgery', 'Technique, scars and recovery.'],
      ['/surgical/breast-lift-vs-augmentation/', 'Lift vs augmentation', 'Shape versus volume.']
    ],
    blocks: [
      prose(
        '<p class="lead">Because threads are marketed as a "lift without surgery", comparing them with a surgical lift is useful. They act differently, last differently and carry different risks.</p>'
      ),
      {
        type: 'table',
        eyebrow: 'Side by side',
        heading: 'Breast threads compared with a surgical lift',
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
        note: 'This is a general comparison. Suitability and risks require individual assessment.'
      },
      prose(
        '<h2>The core difference</h2>' +
        '<p>Sagging usually involves excess skin and descended tissue. A surgical lift addresses both. Threads provide at most a modest, temporary mechanical effect. They cannot remove skin or recreate the internal support of a lift.</p>' +
        '<h2>Why the trade-off exists</h2>' +
        '<p>Surgery involves more risk and downtime but can produce a more reliable, lasting change in position. Threads involve less recovery but have less predictable benefit. A shorter recovery is not worth much if the result does not address your concern.</p>' +
        '<h2>Cost</h2>' +
        '<p>Because threads fade and may need repeating, long-term cost may not be lower than a single lift. Ask for a realistic estimate over several years, including repeat treatments and the cost of managing complications.</p>' +
        '<h2>Who might consider which</h2>' +
        '<p>People with moderate or significant sagging usually need surgery to see a meaningful change. People wanting a subtle, temporary effect and who accept uncertainty might ask about threads, with a clear understanding of the evidence. A surgical opinion can still be useful even if you decide against surgery.</p>' +
        '<h2>Questions to ask</h2>' +
        questions([
          'Would threads change my breast position noticeably?',
          'What would a surgeon advise for me?',
          'What would I do if I am unhappy with threads?',
          'What is the total cost over three to five years?'
        ])
      ),
      takeaway('Threads are not an equivalent substitute for a lift. If your goal is to correct sagging, ask what surgery can offer before paying for a temporary alternative.', 'info')
    ]
  })
];

module.exports = { nonSurgicalSubpages: pages };
