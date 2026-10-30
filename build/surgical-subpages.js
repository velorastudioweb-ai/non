'use strict';

/*
 * Surgical sub-pages, batch 2 (25 pages).
 *
 * Five detailed pages for each of the fat-transfer, breast-lift, revision,
 * filler-removal and breast-reduction parent guides. The copy is educational,
 * avoids prices and outcome promises, and has not yet been reviewed by a named
 * clinician. Source and review notes are in docs/surgical-subpages-batch-2.md.
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

const pages = [
  /* ------------------------------------------------------------------ *
   * Fat transfer
   * ------------------------------------------------------------------ */
  page({
    url: '/surgical/fat-transfer-breast-augmentation/candidacy/',
    slug: 'fat-transfer-candidacy',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/fat-transfer-breast-augmentation/',
    parentLabel: 'Fat transfer',
    h1: 'Is Fat Transfer Right for You? Candidacy and Limits',
    cardTitle: 'Fat transfer candidacy',
    seoTitle: 'Fat Transfer Breast Augmentation: Candidacy and Limits | Quantum Health',
    seoDescription: 'Who may be suited to breast fat transfer, who may not, and why donor fat, skin and goals matter.',
    bannerLead: 'Fat transfer can add modest volume using your own tissue, but it is not suitable for every goal or body type.',
    imageKey: 'fatTransferBanner',
    related: [
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'The parent guide to the procedure, recovery and risks.'],
      ['/surgical/fat-transfer-survival/', 'How much fat survives', 'Why retention varies and what it means for your result.'],
      ['/surgical/fat-transfer-breast-augmentation/with-implants/', 'Fat transfer with implants', 'When the two approaches are used together.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Fat transfer uses your own fat to add volume. It suits some goals well and others poorly. The main limits are how much donor fat you have, how much space your breast tissue can accept, and how much change you want.</p>
<h2>Who it may suit</h2>
<ul>
<li>People who want a modest, natural-feeling increase in size</li>
<li>Those with enough fat in areas such as the abdomen, thighs or flanks to harvest</li>
<li>People who prefer to avoid a manufactured device in the body</li>
<li>Those correcting small contour irregularities or mild asymmetry</li>
<li>Selected people in reconstruction, under specialist care</li>
</ul>
<h2>Who may find it unsuitable</h2>
<ul>
<li>Very slim people with little donor fat</li>
<li>Those wanting a large increase in size in one operation</li>
<li>People with tight breast skin, which limits how much fat can safely be placed</li>
<li>Smokers, because blood supply affects fat survival</li>
<li>People with conditions that raise surgical or anaesthetic risk</li>
<li>Anyone who expects the full injected volume to remain</li>
</ul>
<h2>Why skin and tissue matter</h2>
<p>Injected fat needs space and a blood supply. Tight skin, scarred tissue or a small breast envelope restricts how much can be placed and may reduce how much survives. This is why the same volume can produce different results in different people.</p>
<h2>Realistic goals</h2>
<p>A typical goal is a subtle change rather than a dramatic one. Some people need more than one session, and not everyone is pleased with the final volume. An implant may be more predictable for a larger increase. Read <a href="/surgical/fat-transfer-survival/">how much fat survives</a> before setting expectations.</p>
<h2>Timing</h2>
<p>Surgeons usually prefer a stable weight before fat transfer, because later weight change alters both donor areas and breast volume. If pregnancy is part of your near-term plans, discuss whether waiting would be more predictable.</p>
<h2>What assessment involves</h2>
<p>The surgeon examines your breasts and donor areas, reviews your health and smoking history, and discusses what is realistic. Photographs and, in some cases, breast imaging may be arranged. No surgeon can guarantee a specific cup size or retention rate.</p>
<h2>Questions to ask</h2>
<ul>
<li>Do I have enough donor fat?</li>
<li>How much increase is realistic for me?</li>
<li>Might an implant suit my goals better?</li>
<li>Who will perform the liposuction and injection?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Fat transfer works best for modest change in people with adequate donor fat and healthy tissue. It is not a reliable way to achieve a large increase in one operation.'
      }
    ]
  }),

  page({
    url: '/surgical/fat-transfer-breast-augmentation/procedure/',
    slug: 'fat-transfer-procedure',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/fat-transfer-breast-augmentation/',
    parentLabel: 'Fat transfer',
    h1: 'How Breast Fat Transfer Is Performed',
    cardTitle: 'The fat transfer procedure',
    seoTitle: 'How Breast Fat Transfer Is Performed | Quantum Health',
    seoDescription: 'A step-by-step explanation of fat harvesting, processing and injection in breast fat transfer, with what to ask a surgeon.',
    bannerLead: 'Fat transfer has three main stages: harvesting, processing and injection. The details vary between surgeons and can affect the result.',
    imageKey: 'fatTransferBanner',
    related: [
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'The parent guide to candidacy, recovery and risks.'],
      ['/surgical/fat-transfer-breast-augmentation/candidacy/', 'Is fat transfer right for you?', 'Donor fat, skin and realistic goals.'],
      ['/surgical/fat-transfer-breast-augmentation/recovery/', 'Recovery after fat transfer', 'What to expect at the breast and donor sites.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Fat transfer has three main stages: harvesting, processing and injection. Surgeons differ in technique, and there is no single method that has been proven best for every patient.</p>
<h2>1. Planning</h2>
<p>The surgeon examines your breasts and donor areas, discusses your goals and marks the areas to be treated. Photographs are usually taken for your records. The plan should include how much fat is likely to be needed and whether one session is realistic.</p>
<h2>2. Harvesting</h2>
<p>Fat is collected by liposuction through small incisions, often under general anaesthesia, though some cases use sedation or local anaesthesia. The surgeon uses gentle techniques intended to protect the fat cells. Common donor areas are the abdomen, flanks and thighs.</p>
<h2>3. Processing</h2>
<p>The harvested fat is prepared by methods such as washing, filtering or centrifuging to separate usable fat from fluid, oil and debris. There is no single agreed method, and evidence on which is best is still developing.</p>
<h2>4. Injection</h2>
<p>The fat is injected in many small amounts through tiny entry points, at different depths in the breast. Spreading small amounts helps each deposit get a blood supply. Overfilling can reduce survival and raise complications.</p>
<h2>5. Dressings</h2>
<p>The small wounds are covered and a supportive garment may be advised for the donor areas. Avoid pressure on the breasts as directed, because compression may affect the transferred fat.</p>
<h2>Time and setting</h2>
<p>The operation commonly takes a few hours, depending on the extent of liposuction and treatment. It is usually done in a hospital or accredited facility by a surgeon with experience in both liposuction and breast surgery.</p>
<h2>Some surgeons use pre-expansion</h2>
<p>A suction device worn before surgery is used by some surgeons to prepare the breast tissue. Evidence and experience vary, so ask whether it is advised for you and what it adds.</p>
<h2>Scars and donor sites</h2>
<p>Liposuction entry points and breast injection sites leave small scars. Donor-site bruising and contour changes may take weeks to settle, and the amount of fat removed affects recovery.</p>
<h2>Questions to ask</h2>
<ul>
<li>Where will you take fat from, and how much?</li>
<li>How do you process and inject it?</li>
<li>What anaesthesia will be used, and by whom?</li>
<li>How many sessions might be needed?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'The technique matters, so ask your surgeon to explain their method, their experience and why it suits your goals.'
      }
    ]
  }),

  page({
    url: '/surgical/fat-transfer-breast-augmentation/recovery/',
    slug: 'fat-transfer-recovery',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/fat-transfer-breast-augmentation/',
    parentLabel: 'Fat transfer',
    h1: 'Recovery After Breast Fat Transfer',
    cardTitle: 'Fat transfer recovery',
    seoTitle: 'Recovery After Breast Fat Transfer | Quantum Health',
    seoDescription: 'What to expect after breast fat transfer, including swelling, donor-site recovery, garments, activity limits and when to call your surgeon.',
    bannerLead: 'Recovery involves two areas: the breasts that received fat and the donor areas where fat was taken. Follow your own surgeon’s instructions.',
    imageKey: 'fatTransferBanner',
    related: [
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'The parent guide to candidacy, technique and risks.'],
      ['/surgical/fat-transfer-breast-augmentation/lumps-fat-necrosis/', 'Lumps after fat transfer', 'Fat necrosis, oil cysts and calcifications.'],
      ['/surgical/breast-surgery-warning-signs/', 'Warning signs after surgery', 'Symptoms that need urgent medical attention.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Recovery involves two areas: the breasts that received fat and the donor areas where fat was taken. Follow your surgeon’s instructions, which may differ from this general guide.</p>
<h2>The first days</h2>
<ul>
<li>Soreness, swelling and bruising in the breasts and donor sites</li>
<li>Fluid leakage from small incisions</li>
<li>Tightness from compression garments</li>
<li>Tiredness after anaesthesia</li>
</ul>
<p>Donor-site bruising can feel more uncomfortable than the breasts, especially if a larger area was treated.</p>
<h2>Garments</h2>
<p>You may be asked to wear a compression garment on the donor areas. For the breasts, some surgeons advise avoiding tight bras or pressure for a period, because compression may harm the transferred fat. Follow the specific advice you receive.</p>
<h2>Activity</h2>
<p>Light walking is generally encouraged to support circulation. Strenuous exercise, heavy lifting and sleeping on your front are usually restricted for a time, which your surgeon will specify. Avoid massage unless advised.</p>
<h2>Swelling and change in size</h2>
<p>The breasts look largest early on because of swelling. As swelling settles and some fat is reabsorbed over the following weeks and months, size may reduce. A final assessment is usually made after several months, not in the first few weeks.</p>
<h2>Avoid</h2>
<ul>
<li>Smoking and nicotine, which can impair healing and fat survival</li>
<li>Dramatic weight loss, which can reduce results</li>
<li>Unsupervised massage or devices</li>
</ul>
<h2>Call your surgeon if you have</h2>
<p>Fever, spreading redness, severe or increasing pain, pus, rapidly increasing swelling or skin colour change. See our <a href="/surgical/breast-surgery-warning-signs/">warning signs page</a> and seek urgent care if symptoms are severe.</p>
<h2>Returning to work</h2>
<p>Desk work may be possible within days to a week or two, depending on comfort and the extent of liposuction. Physical work, lifting and exercise usually take longer. Ask for a written plan rather than relying on a general timeline.</p>
<h2>Driving</h2>
<p>Do not drive while you are taking strong pain relief or cannot move comfortably and react safely. Check your surgeon’s advice and your insurance conditions.</p>
<h2>Follow-up</h2>
<p>Expect check-ups, photographs and advice about breast imaging. Tell any imaging team that you have had fat transfer, because the changes can affect how scans are read.</p>
<h2>Follow-up and records</h2>
<p>At each review, ask what change is expected, which symptoms need a call and when you can return to each activity. Keep the operation note and tell future clinicians about the transfer. That history can help a radiologist interpret later imaging, but it does not replace routine breast screening or assessment of a new symptom.</p>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Patience matters, because the early look is not the final result. Most of the settling takes weeks to months, not days.'
      }
    ]
  }),

  page({
    url: '/surgical/fat-transfer-breast-augmentation/lumps-fat-necrosis/',
    slug: 'fat-transfer-lumps',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/fat-transfer-breast-augmentation/',
    parentLabel: 'Fat transfer',
    h1: 'Lumps After Fat Transfer: Fat Necrosis, Oil Cysts and Calcifications',
    cardTitle: 'Lumps and fat necrosis',
    seoTitle: 'Lumps After Fat Transfer: Fat Necrosis and Oil Cysts | Quantum Health',
    seoDescription: 'Why lumps can form after breast fat transfer, how they are assessed and why any new breast lump should still be checked by a doctor.',
    bannerLead: 'After fat transfer, some people notice firm areas or lumps. Many are harmless, but every new lump should be assessed.',
    imageKey: 'fatTransferBanner',
    related: [
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'The parent guide to the procedure and recovery.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Assessment, warning signs and choosing a surgeon.'],
      ['/surgical/breast-surgery-warning-signs/', 'Warning signs after surgery', 'When a symptom needs urgent attention.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">After fat transfer, some people notice firm areas or lumps. Many are harmless, but every new lump should be assessed rather than assumed to be a normal effect of surgery.</p>
<h2>Fat necrosis</h2>
<p>Fat necrosis happens when injected fat does not get enough blood supply and its cells die. This can form firm, sometimes tender lumps. It is a recognised complication of fat grafting, not evidence that the procedure has failed.</p>
<h2>Oil cysts</h2>
<p>As fat breaks down, it can leave fluid-filled pockets called oil cysts. They may feel like smooth, soft or firm lumps and can change over time.</p>
<h2>Calcifications</h2>
<p>Over time, areas of damaged fat can harden with calcium deposits. These may show on mammograms. Radiologists can often tell benign patterns from concerning ones, but sometimes further tests are needed.</p>
<h2>How common is it?</h2>
<p>Frequency varies with technique, the volume injected and individual factors. Ask your surgeon about their own rates and how they manage these problems.</p>
<h2>Why assessment matters</h2>
<p>A lump after fat transfer is not automatically fat necrosis. It can also be something unrelated, including breast cancer. A clinician may use examination, ultrasound, mammography, MRI or biopsy to find out.</p>
<h2>What a lump may feel like</h2>
<p>Fat necrosis can feel firm, irregular or tender; an oil cyst may feel smooth and round. These descriptions overlap with other breast conditions, so how a lump feels cannot confirm the cause.</p>
<h2>Imaging after fat transfer</h2>
<p>Mammograms and ultrasound may show calcifications or cysts related to the graft. Radiologists compare the pattern with your surgical history, which is why accurate records and a clear explanation of the procedure are useful.</p>
<h2>What to do</h2>
<ul>
<li>Do not assume a lump is harmless</li>
<li>Report new lumps, hardness or skin change promptly</li>
<li>Tell imaging teams about your fat transfer</li>
<li>Keep records of your procedure and any imaging</li>
</ul>
<h2>Treatment</h2>
<p>Many areas need only monitoring. Painful or concerning lumps may be aspirated or removed. Treatment depends on the diagnosis, not on the appearance alone.</p>
<h2>Reducing risk</h2>
<p>Surgeons aim to inject small amounts in several layers and avoid overfilling. No technique removes the risk entirely.</p>
<h2>Do not wait for a scheduled check</h2>
<p>Contact a clinician promptly for a rapidly enlarging area, significant redness, fever, discharge, a marked skin change or pain that is getting worse. A new breast or armpit lump deserves assessment even years after transfer, whether or not you recently had imaging.</p>`
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Lumps after fat transfer are a known issue, but they should always be checked. See <a href="/breast-enlargement-safety/">Breast Enlargement Safety</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/fat-transfer-breast-augmentation/with-implants/',
    slug: 'fat-transfer-with-implants',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/fat-transfer-breast-augmentation/',
    parentLabel: 'Fat transfer',
    h1: 'Combining Fat Transfer With Implants',
    cardTitle: 'Fat transfer with implants',
    seoTitle: 'Combining Fat Transfer With Breast Implants | Quantum Health',
    seoDescription: 'When surgeons combine fat transfer with breast implants, the possible benefits, limits and questions to ask about this composite approach.',
    bannerLead: 'Some surgeons use a small amount of fat together with an implant, sometimes called composite augmentation. It adds complexity as well as potential benefits.',
    imageKey: 'fatTransferBanner',
    related: [
      ['/surgical/fat-transfer-breast-augmentation/', 'Fat transfer breast augmentation', 'The parent guide to fat transfer.'],
      ['/blogs/breast-implants-vs-fat-transfer/', 'Implants vs fat transfer', 'Compare volume, recovery, scarring and longevity.'],
      ['/surgical/implant-longevity/', 'How long implants last', 'Monitoring and possible replacement over time.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Some surgeons use a small amount of fat together with an implant, sometimes called composite augmentation. The aim is usually to improve soft-tissue cover or contour rather than to add most of the volume.</p>
<h2>Why combine them?</h2>
<ul>
<li>To add soft-tissue cover over an implant and soften visible edges or rippling</li>
<li>To improve cleavage or the upper-breast contour</li>
<li>To correct small irregularities or asymmetry</li>
<li>To refine results after earlier surgery</li>
</ul>
<h2>Who may be considered</h2>
<p>People with thin tissue who want an implant but are concerned about visibility, and those needing contour correction. Donor fat must be available, and the breast must have enough room for both the implant and the graft.</p>
<h2>Staged or combined?</h2>
<p>Some surgeons perform liposuction and implant placement in one operation, while others stage the procedures to limit operating time or to see how tissues settle. There is no single correct schedule; your anatomy, health and the reason for combining the procedures should guide the plan.</p>
<h2>What fat can and cannot add</h2>
<p>Fat is best used for contour and soft-tissue cover. It should not be presented as a way to make a large, predictable size increase, because retention varies. Ask how much of the planned result depends on the implant and how much on the graft.</p>
<h2>Trade-offs</h2>
<ul>
<li>Two procedures in one: liposuction plus implant surgery</li>
<li>Longer operation and recovery</li>
<li>Some of the fat may be reabsorbed</li>
<li>Risks of both, including lumps from fat necrosis and implant-related complications</li>
<li>Greater cost and need for follow-up</li>
</ul>
<h2>Imaging considerations</h2>
<p>Both implants and transferred fat can affect breast imaging. Tell radiology teams about both, and keep a record of the implant details and the transfer.</p>
<h2>Evidence</h2>
<p>Results are reported by surgeons and in studies, but long-term comparative data are still limited. Ask for the evidence your surgeon relies on and how they judge success.</p>
<h2>Plan each component separately</h2>
<p>A sound consultation identifies what the implant is meant to achieve and what the graft is meant to achieve. It should also cover the liposuction sites, incision scars, recovery demands and future monitoring. “Composite” is a description of two procedures, not a benefit in itself.</p>
<h2>Questions to ask</h2>
<ul>
<li>What would fat add to my implant result?</li>
<li>How many cases like mine have you done?</li>
<li>What extra risks apply?</li>
<li>What happens to the fat if I later change the implant?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Composite augmentation can help in selected people, but it adds complexity. See <a href="/breast-implants/">breast implants</a> and <a href="/surgical/fat-transfer-survival/">how much fat survives</a>.'
      }
    ]
  }),

  /* ------------------------------------------------------------------ *
   * Breast lift
   * ------------------------------------------------------------------ */
  page({
    url: '/surgical/breast-lift/understanding-sagging/',
    slug: 'breast-lift-sagging',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-lift/',
    parentLabel: 'Breast lift',
    h1: 'Understanding Breast Sagging: Types and What a Lift Can Do',
    cardTitle: 'Types of breast sagging',
    seoTitle: 'Types of Breast Sagging and What a Lift Can Do | Quantum Health',
    seoDescription: 'How surgeons classify breast sagging (ptosis), the difference between true sagging and pseudoptosis, and what a lift can and cannot change.',
    bannerLead: 'The right procedure depends on how much skin and tissue has descended, not just on breast size.',
    imageKey: 'breastLiftBanner',
    related: [
      ['/surgical/breast-lift/', 'Breast lift surgery', 'The parent guide to techniques, scars and longevity.'],
      ['/surgical/breast-lift-vs-augmentation/', 'Lift vs augmentation', 'When volume, position or both need to change.'],
      ['/surgical/breast-lift/incisions-scars/', 'Incisions and scars', 'How the scar pattern follows the lift required.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Breast sagging, or ptosis, happens when skin stretches and breast tissue descends. Causes include ageing, pregnancy, breastfeeding, weight change, gravity and genetics.</p>
<h2>Classifying ptosis</h2>
<p>Surgeons often assess the nipple position compared with the fold beneath the breast. A commonly used scale describes:</p>
<ul>
<li><strong>Grade 1 (mild):</strong> nipple at the level of the fold</li>
<li><strong>Grade 2 (moderate):</strong> nipple below the fold but above the lowest point of the breast</li>
<li><strong>Grade 3 (severe):</strong> nipple at or below the lowest point, pointing downward</li>
<li><strong>Pseudoptosis:</strong> the breast hangs below the fold but the nipple stays above it</li>
</ul>
<h2>Why classification matters</h2>
<p>It helps decide whether a lift is needed, which technique suits, and whether an implant could be enough on its own. Two people with the same cup size can need very different operations.</p>
<h2>How the assessment is made</h2>
<p>The surgeon observes the breast from the front and side, measures nipple position relative to the fold, and considers skin elasticity, breast volume and asymmetry. Photographs may help track change, but they do not replace an in-person examination.</p>
<h2>Skin quality and volume</h2>
<p>Sagging is not only about loose skin. A breast with little tissue may need volume as well as lifting, while a heavy breast may need reduction rather than augmentation. The plan should address both shape and weight.</p>
<h2>A measurement is only one part of the decision</h2>
<p>Ptosis grades describe nipple position, but they do not capture skin quality, breast width, tissue weight, bra fit or how you feel about your shape. They are a planning tool, not a score that proves someone needs surgery or needs it quickly.</p>
<h2>What a lift does</h2>
<p>A breast lift removes excess skin, reshapes tissue and raises the nipple to a higher position. It may also reduce a stretched areola. See <a href="/surgical/breast-lift/">Breast Lift Surgery</a>.</p>
<h2>What it does not do</h2>
<ul>
<li>It does not add much volume</li>
<li>It does not stop future ageing or gravity</li>
<li>It does not leave you without scars</li>
<li>It does not guarantee a particular shape</li>
</ul>
<h2>If you also want more fullness</h2>
<p>A lift can be combined with an implant or fat transfer, or staged. See our page on <a href="/surgical/breast-lift-vs-augmentation/">lift vs augmentation</a>.</p>
<h2>Questions to ask</h2>
<ul>
<li>What grade of sagging do I have?</li>
<li>Do I need a lift, an implant, or both?</li>
<li>What scars does my case need?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'The right procedure depends on how much skin and tissue has descended, not just on size.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-lift/incisions-scars/',
    slug: 'breast-lift-incisions-scars',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-lift/',
    parentLabel: 'Breast lift',
    h1: 'Breast Lift Incisions and Scars: What to Expect',
    cardTitle: 'Incisions and scars',
    seoTitle: 'Breast Lift Incisions and Scars: What to Expect | Quantum Health',
    seoDescription: 'The main breast lift incision patterns, which sagging each suits, how scars heal and how to look after them.',
    bannerLead: 'The amount of sagging largely decides the scar pattern. More lift usually means more scar.',
    imageKey: 'breastLiftBanner',
    related: [
      ['/surgical/breast-lift/', 'Breast lift surgery', 'The parent guide to shape, longevity and recovery.'],
      ['/surgical/breast-lift/risks/', 'Breast lift risks', 'Scarring, nipple blood supply and sensation changes.'],
      ['/surgical/breast-augmentation/#scars', 'Scar healing and aftercare', 'General scar-care guidance after breast surgery.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">The amount of sagging largely decides the scar pattern. More lift usually means more scar, and every lift leaves permanent marks.</p>
<h2>Periareolar (around the areola)</h2>
<p>A scar encircles the areola. It suits mild sagging and may reshape the areola. Scars can widen in some people, and flattening of the breast is a known concern with this technique alone.</p>
<h2>Vertical (lollipop)</h2>
<p>A scar goes around the areola and straight down to the breast fold. It suits moderate sagging and offers more reshaping than an areolar-only lift.</p>
<h2>Inverted T (anchor)</h2>
<p>In addition, a scar runs along the fold. It suits significant sagging or large amounts of excess skin and gives the most control. This is the longest scar.</p>
<h2>How scars mature</h2>
<p>Scars usually look red or raised at first, then flatten and fade over a year or longer. Some people develop widened, thick (hypertrophic) or keloid scars. Healing is partly genetic.</p>
<h2>Looking after scars</h2>
<ul>
<li>Follow wound-care instructions</li>
<li>Avoid tension, heavy lifting and sun exposure on healing scars</li>
<li>Do not use scar products or silicone sheets unless your surgeon advises</li>
<li>Report wounds that open, discharge or look infected</li>
</ul>
<h2>Scar revision</h2>
<p>If a scar widens, thickens or causes tension, a surgeon may offer scar revision after the tissues have settled. This is another operation with its own healing and does not guarantee a fine scar. Some scars are better managed with time and non-surgical care.</p>
<h2>Plan for scars before surgery</h2>
<p>Ask the surgeon to show where each incision will sit in relation to your usual bra or swimwear. Scar lines can be uneven and may not be completely hidden by every garment. A good consent discussion explains the likely trade-off before, rather than after, surgery.</p>
<h2>Nipple sensation and position</h2>
<p>Moving the nipple can change sensation, and the final position may differ slightly from the planned mark as swelling resolves. Discuss both before surgery rather than judging the early result.</p>
<h2>Trade-off to weigh</h2>
<p>Some people accept longer scars for a better shape; others prefer shorter scars with less lift. Be honest with your surgeon about how you feel, and ask to see typical healed scars with consent.</p>
<h2>Questions to ask</h2>
<ul>
<li>Which pattern do you recommend, and why?</li>
<li>Where will each scar sit relative to my bra or swimwear?</li>
<li>Can I see typical healed scars, with permission, at one year?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Every lift trades scars for position and shape. Make sure you understand the trade-off before you consent.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-lift/recovery/',
    slug: 'breast-lift-recovery',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-lift/',
    parentLabel: 'Breast lift',
    h1: 'Recovery After a Breast Lift',
    cardTitle: 'Breast lift recovery',
    seoTitle: 'Recovery After a Breast Lift | Quantum Health',
    seoDescription: 'What to expect in the days and weeks after a breast lift, including dressings, activity limits, scar care and warning signs.',
    bannerLead: 'Recovery varies with the extent of the lift and whether it is combined with other surgery. Your surgeon’s instructions take priority.',
    imageKey: 'breastLiftBanner',
    related: [
      ['/surgical/breast-lift/', 'Breast lift surgery', 'The parent guide to suitability, scars and longevity.'],
      ['/surgical/breast-lift/risks/', 'Breast lift risks', 'What can go wrong and how risk is reduced.'],
      ['/surgical/breast-surgery-warning-signs/', 'Warning signs after surgery', 'Symptoms that need urgent medical attention.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Recovery varies with the extent of the lift and whether it is combined with other surgery. Your surgeon’s instructions take priority over any general timeline.</p>
<h2>The first days</h2>
<ul>
<li>Soreness, swelling, bruising and tightness</li>
<li>Dressings and a surgical or support bra</li>
<li>Sometimes small drains, removed after a few days</li>
<li>Numbness or altered sensation around the breast and nipple</li>
</ul>
<p>Most people go home the same day or after one night.</p>
<h2>Pain and medicines</h2>
<p>You will usually be given pain relief. Follow instructions and avoid medicines you were told to stop, since some raise bleeding risk.</p>
<h2>Activity</h2>
<ul>
<li>Walk gently from early on, which helps circulation</li>
<li>Avoid lifting, pushing and strenuous exercise for several weeks, as advised</li>
<li>Avoid raising your arms above shoulder height if told to, since tension can stress wounds</li>
<li>Return to desk work after a period determined by your surgeon, and to heavier work later</li>
</ul>
<h2>Sleeping</h2>
<p>Sleeping on your back with your upper body slightly raised is commonly advised. Avoid sleeping on your front.</p>
<h2>Support garments</h2>
<p>Wear the recommended bra as directed, usually for several weeks. Avoid underwired bras until your surgeon says it is safe.</p>
<h2>Wound and scar care</h2>
<p>Keep dressings clean and dry as instructed, and attend wound checks. Scars mature over a year or more. Protect them from the sun.</p>
<h2>The shape will change</h2>
<p>Swelling and tightness mean the breasts may look high and tight at first. They settle gradually over weeks to months.</p>
<h2>Follow-up is part of recovery</h2>
<p>Attend wound and scar checks even if you feel well. Ask when changes in shape, nipple sensation or scar colour are expected and when they are not. Take concerns to your own surgical team rather than changing dressings, bras or scar treatments based only on advice online.</p>
<h2>Driving and work</h2>
<p>Do not drive while taking strong pain relief or while movement is restricted. Desk work may be possible after a week or two, but physical work and exercise usually need longer. Ask for advice specific to your operation.</p>
<h2>When swelling settles</h2>
<p>Early swelling can make the breasts look high and tight. Most change occurs over the first few months, but subtle settling can continue for longer. Avoid judging the final shape in the first weeks.</p>
<h2>Call your surgeon if you notice</h2>
<p>Fever, increasing pain, spreading redness, a wound opening, rapid swelling on one side, or skin around the nipple turning dark or pale. See <a href="/surgical/breast-surgery-warning-signs/">warning signs</a>.</p>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Plan for rest, help at home and patience while the shape settles. See <a href="/surgical/breast-lift/">Breast Lift Surgery</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-lift/risks/',
    slug: 'breast-lift-risks',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-lift/',
    parentLabel: 'Breast lift',
    h1: 'Breast Lift Risks: What to Know Before You Decide',
    cardTitle: 'Breast lift risks',
    seoTitle: 'Breast Lift Risks: Scars, Sensation and Healing | Quantum Health',
    seoDescription: 'The main risks of breast lift surgery, including scarring, nipple blood supply, sensation changes, asymmetry and the chance of sagging again.',
    bannerLead: 'A lift is a major operation on the breast’s blood supply and skin. Understanding the risks supports informed consent.',
    imageKey: 'breastLiftBanner',
    related: [
      ['/surgical/breast-lift/', 'Breast lift surgery', 'The parent guide to planning, scars and longevity.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, warning signs and choosing a surgeon.'],
      ['/breast-surgeon-credentials/', 'Checking a surgeon', 'Registration, training and facility checks.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">A lift is a major operation on the breast’s blood supply and skin. Understanding the risks supports informed consent and realistic expectations.</p>
<h2>General risks</h2>
<ul>
<li>Bleeding and haematoma</li>
<li>Infection</li>
<li>Reactions to anaesthesia</li>
<li>Blood clots</li>
<li>Delayed wound healing, especially at scar junctions</li>
</ul>
<h2>Risks specific to a lift</h2>
<ul>
<li><strong>Scarring:</strong> visible, widened or thickened scars</li>
<li><strong>Nipple and areola blood supply:</strong> because the nipple is moved, its blood supply can be compromised. Serious loss is uncommon, but it can occur, particularly in smokers or with large lifts</li>
<li><strong>Sensation changes:</strong> reduced, lost or heightened nipple and breast sensation</li>
<li><strong>Asymmetry:</strong> differences in shape, size or nipple position</li>
<li><strong>Contour irregularities</strong> or fat necrosis lumps</li>
<li><strong>Breastfeeding effects:</strong> many people can still breastfeed, but it is not guaranteed</li>
<li><strong>Recurrent sagging:</strong> gravity and ageing continue to act</li>
<li><strong>Need for revision</strong></li>
</ul>
<h2>Factors that raise risk</h2>
<ul>
<li>Smoking</li>
<li>Large breasts or extensive lifts</li>
<li>Significant weight change</li>
<li>Conditions affecting healing, such as poorly controlled diabetes</li>
</ul>
<h2>Risk is personal, not a checklist score</h2>
<p>A complication can be uncommon overall but still matter greatly to a particular person. Ask which risks are most relevant to your anatomy, medicines, smoking or nicotine use and planned operation, how they would be recognised, and what treatment or revision could involve.</p>
<h2>Seroma and delayed healing</h2>
<p>Fluid can collect under the skin (seroma), and small areas of the wound may heal slowly, especially where incisions meet. These problems are usually manageable with drainage, dressings or antibiotics, but they can prolong recovery and affect scarring.</p>
<h2>Anaesthesia and general health</h2>
<p>Anaesthetic risk depends on your health, medicines and history. A preoperative assessment may identify conditions that need treatment before surgery. Report sleep apnoea, bleeding disorders, previous clots and all supplements.</p>
<h2>What to tell your surgeon</h2>
<p>Be explicit about smoking, nicotine products, weight change and any plan for pregnancy. These factors affect tissue healing and the timing of surgery.</p>
<h2>Combining with implants</h2>
<p>Combining a lift with an implant increases complexity. Some surgeons stage the two operations for safety.</p>
<h2>Reducing risk</h2>
<ul>
<li>Stop smoking well before surgery</li>
<li>Reach a stable weight</li>
<li>Follow aftercare instructions</li>
<li>Choose a surgeon who performs lifts regularly</li>
</ul>
<h2>Questions to ask</h2>
<ul>
<li>Which risks are most relevant for me?</li>
<li>How do you protect the nipple’s blood supply?</li>
<li>What is your approach if healing is delayed?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'The risks are manageable when you are well prepared, but they are real. Ask how your surgeon prevents, recognises and treats them.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-lift/protecting-results/',
    slug: 'breast-lift-longevity',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-lift/',
    parentLabel: 'Breast lift',
    h1: 'Will a Breast Lift Last? Protecting Your Results',
    cardTitle: 'Protecting lift results',
    seoTitle: 'How Long Does a Breast Lift Last? | Quantum Health',
    seoDescription: 'How long breast lift results can last, what causes sagging to return and what you can do to look after your results.',
    bannerLead: 'A lift repositions the breast but does not stop time. Results last for varying lengths, and some descent after surgery is normal.',
    imageKey: 'breastLiftBanner',
    related: [
      ['/surgical/breast-lift/', 'Breast lift surgery', 'The parent guide to technique, scars and recovery.'],
      ['/surgical/implant-longevity/', 'How long implants last', 'If a lift was combined with an implant.'],
      ['/surgical/pregnancy-breastfeeding-implants/', 'Pregnancy and breastfeeding', 'How future pregnancy can affect breast shape.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">A lift repositions the breast but does not stop time. Results last for varying lengths, and some descent after surgery is normal.</p>
<h2>Why sagging can return</h2>
<ul>
<li>Gravity and ageing reduce skin elasticity</li>
<li>Weight changes stretch skin again</li>
<li>Pregnancy and breastfeeding alter breast tissue</li>
<li>Hormones and menopause change breast density</li>
<li>Heavy breast tissue puts more strain on skin</li>
<li>Genetics affect how skin holds up</li>
</ul>
<h2>What is normal</h2>
<p>Breasts typically settle in the first months after a lift, and some descent is expected. Long-term results vary widely, and no one can promise how many years it will last.</p>
<h2>Protecting your result</h2>
<ul>
<li>Maintain a stable weight</li>
<li>Wear supportive bras, especially for exercise, as your surgeon advises</li>
<li>Avoid smoking, which affects skin quality</li>
<li>Protect your skin from the sun</li>
<li>Consider the timing of future pregnancies</li>
<li>Attend follow-ups</li>
</ul>
<h2>Weight and pregnancy timing</h2>
<p>Large weight changes can stretch or shrink the breast and alter the result. If you are planning pregnancy, discuss timing with your surgeon. A lift does not prevent pregnancy or breastfeeding, but pregnancy can change shape and volume.</p>
<h2>Posture and support</h2>
<p>A well-fitting, supportive bra can reduce strain during exercise, but it cannot prevent natural ageing or guarantee that a particular bra will keep the result in place. There is no evidence that special creams or exercises preserve a lift.</p>
<h2>A review does not always mean revision</h2>
<p>Some settling, scar change and gradual descent are expected and may only need reassurance or observation. A sudden change, a new lump or persistent one-sided pain needs a diagnosis first. Do not assume that every change is cosmetic or that another operation is the only answer.</p>
<h2>When to seek review</h2>
<p>Ask for assessment if you notice a new lump, persistent pain, a change in one breast or a sudden loss of shape, rather than assuming it is expected settling.</p>
<h2>What about implants?</h2>
<p>An implant can add volume and upper fullness but adds weight, and does not stop ageing. Implants may also need replacing in time. See <a href="/surgical/implant-longevity/">how long implants last</a>.</p>
<h2>If sagging returns</h2>
<p>Options include observation, a repeat lift or other procedures. Revision surgery has its own risks and may be less predictable than the first operation.</p>
<h2>Questions to ask</h2>
<ul>
<li>How long might my result last?</li>
<li>What can I do to protect it?</li>
<li>What if I plan pregnancy?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Think of a lift as resetting the clock, not stopping it. Stable weight and realistic expectations help protect the result.'
      }
    ]
  }),

  /* ------------------------------------------------------------------ *
   * Breast revision
   * ------------------------------------------------------------------ */
  page({
    url: '/surgical/breast-revision/reasons/',
    slug: 'breast-revision-reasons',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-revision/',
    parentLabel: 'Breast revision',
    h1: 'Why People Need Breast Revision Surgery',
    cardTitle: 'Why revision is needed',
    seoTitle: 'Why People Need Breast Revision Surgery | Quantum Health',
    seoDescription: 'The most common reasons for breast revision surgery, including implant problems, shape changes and personal choice, and what revision involves.',
    bannerLead: 'Revision surgery can address a device problem, a change in shape or a change in what someone wants. Needing it is common.',
    imageKey: 'breastRevisionBanner',
    related: [
      ['/surgical/breast-revision/', 'Breast revision surgery', 'The parent guide to exchange, removal and repair.'],
      ['/surgical/capsular-contracture/', 'Capsular contracture', 'Firmness, distortion and treatment options.'],
      ['/surgical/bia-alcl-implant-illness/', 'BIA-ALCL and implant illness', 'Rare implant-related conditions and symptoms.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Breast revision surgery is any further operation to correct, replace or remove implants or improve an earlier result. There are many reasons, and needing revision is not a failure of the patient.</p>
<h2>Medical or device-related reasons</h2>
<ul>
<li>Capsular contracture (see our <a href="/breast-implant-safety/">implant safety page</a>)</li>
<li>Implant rupture or deflation</li>
<li>Infection or an exposed implant</li>
<li>An implant recall or safety notice</li>
<li>Rare complications such as BIA-ALCL</li>
</ul>
<h2>Position and appearance reasons</h2>
<ul>
<li>An implant that has moved, tilted or is sitting too low or too high</li>
<li>Visible rippling or edges</li>
<li>Asymmetry</li>
<li>Dissatisfaction with size or shape</li>
<li>Scar problems</li>
</ul>
<h2>Life-stage reasons</h2>
<ul>
<li>Changes after pregnancy, breastfeeding, weight change or ageing</li>
<li>A wish to change size or shape</li>
<li>A wish to remove implants</li>
<li>Breast changes that need a lift</li>
</ul>
<h2>Revision is common</h2>
<p>Many people with implants will have another operation at some point. This is not a failure of the patient. See <a href="/surgical/implant-longevity/">how long implants last</a>.</p>
<h2>First steps</h2>
<ul>
<li>Get a clear diagnosis of what is wrong</li>
<li>Collect your implant card and surgery records</li>
<li>Consider imaging if rupture or contracture is suspected</li>
<li>Seek a surgeon with revision experience, and consider a second opinion</li>
</ul>
<h2>Not every concern needs an operation</h2>
<p>Some concerns can be monitored, treated without surgery or addressed by changing support garments, pain management or expectations. A surgeon should explain why surgery is likely to help in your case, what it cannot correct and what observation would involve. A revision should not be presented as the only response to normal settling.</p>
<h2>Urgency depends on symptoms</h2>
<p>Severe pain, fever, spreading redness, sudden swelling, an enlarging breast, a new mass or a wound problem needs prompt medical advice. Other concerns, such as a stable position or size preference, can usually be assessed carefully over time. Do not delay urgent assessment while seeking cosmetic opinions.</p>
<h2>Choosing the right team</h2>
<p>Complex revision may need imaging specialists, an anaesthetist and a surgeon who regularly manages scar tissue, implant pockets and explant decisions. Ask who would coordinate your care and what happens if an unexpected finding changes the plan during surgery.</p>
<h2>Realistic expectations</h2>
<p>Revision can be more complex than first-time surgery because of scar tissue and altered anatomy. Outcomes and risks can differ, and more than one operation may be needed.</p>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Needing revision is common, and the best start is a clear understanding of the cause.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-revision/removal-exchange/',
    slug: 'breast-revision-removal-exchange',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-revision/',
    parentLabel: 'Breast revision',
    h1: 'Implant Removal and Exchange: Options and What to Expect',
    cardTitle: 'Removal and exchange',
    seoTitle: 'Breast Implant Removal and Exchange | Quantum Health',
    seoDescription: 'Compare removing implants, replacing them and removing them with a lift or fat transfer, including how breast shape may change.',
    bannerLead: 'Someone with implants may choose to remove them, replace them or change them for another type. The right option depends on your reasons, tissue and goals.',
    imageKey: 'breastRevisionBanner',
    related: [
      ['/surgical/breast-revision/', 'Breast revision surgery', 'The parent guide to planning revision.'],
      ['/surgical/breast-revision/capsule-surgery/', 'Capsule surgery explained', 'Capsulotomy, capsulectomy and en bloc removal.'],
      ['/surgical/breast-lift/', 'Breast lift surgery', 'A lift may be combined with removal.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Someone with implants may choose to remove them, replace them or change them for another type. The right option depends on your reasons, your tissue and your goals.</p>
<h2>Removal only (explant)</h2>
<p>Implants are taken out without replacement. The capsule may be left, partly removed or removed whole. Reasons include symptoms, complications, ageing implants or personal preference.</p>
<h2>Exchange</h2>
<p>Old implants are replaced with new ones, perhaps of a different size, type or position. Exchange may be combined with capsule surgery or a lift.</p>
<h2>Removal with a lift</h2>
<p>After removal, the breast skin may be loose, especially if the implants were large or have been in for years. A lift may be considered at the same time or later.</p>
<h2>Removal with fat transfer</h2>
<p>Some people choose fat transfer to restore some volume after implant removal. It is not suitable for everyone and may need more than one session.</p>
<h2>How the breast may look afterwards</h2>
<p>The shape after removal depends on your original breast, how long implants were in, tissue changes and skin quality. Expect possible loss of volume, laxity or contour irregularity. A surgeon can discuss likely outcomes, though they cannot be guaranteed.</p>
<h2>Recovery</h2>
<p>Removal is often shorter than the original surgery, but recovery depends on whether capsule surgery or a lift is done. Follow your surgeon’s instructions on garments, activity and wound care.</p>
<h2>Decide what happens to the capsule</h2>
<p>A capsule is scar tissue that normally forms around an implant. Whether it is left, released or removed depends on findings such as contracture, rupture, fluid, abnormal tissue and how safely it can be separated from the chest wall. Ask for the reason for the planned extent of surgery, not simply a label.</p>
<h2>Think in stages when needed</h2>
<p>If there is infection, uncertain tissue health or a major change in size, the safest plan may separate removal, healing and reconstruction. A staged plan can feel disappointing, but it may give tissue time to settle and make the next decision more reliable.</p>
<h2>Planning</h2>
<ul>
<li>Ask about the likely look afterwards</li>
<li>Discuss the capsule and why it is or is not removed</li>
<li>Consider imaging and any need for pathology tests</li>
<li>Think about breast screening in future</li>
</ul>
<p>If you have symptoms you attribute to implants, see a doctor to assess other possible causes. See <a href="/surgical/bia-alcl-implant-illness/">BIA-ALCL and implant illness</a>.</p>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Plan for what the breast will look like after removal, not just the removal itself.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-revision/capsule-surgery/',
    slug: 'breast-revision-capsule-surgery',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-revision/',
    parentLabel: 'Breast revision',
    h1: 'Capsulotomy, Capsulectomy and En Bloc Removal Explained',
    cardTitle: 'Capsule surgery',
    seoTitle: 'Capsulotomy, Capsulectomy and En Bloc Removal | Quantum Health',
    seoDescription: 'The differences between releasing, partly removing and fully removing the scar capsule around a breast implant, and why surgeons choose each.',
    bannerLead: 'When scar tissue around an implant causes problems, surgeons may operate on the capsule. The terms sound alike but mean different things.',
    imageKey: 'breastRevisionBanner',
    related: [
      ['/surgical/breast-revision/', 'Breast revision surgery', 'The parent guide to removal, exchange and repair.'],
      ['/surgical/capsular-contracture/', 'Capsular contracture', 'Why the capsule tightens and how it is assessed.'],
      ['/surgical/bia-alcl-implant-illness/', 'BIA-ALCL', 'When en bloc removal may be considered.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">When scar tissue around an implant causes problems, surgeons may operate on the capsule. The terms sound alike but mean different things.</p>
<h2>Capsulotomy</h2>
<p>The capsule is cut or released to loosen it, but not removed. It is the least extensive option and may be used in selected mild cases or to adjust the pocket.</p>
<h2>Capsulectomy</h2>
<p>The capsule is removed, partly or totally. This can treat capsular contracture and allows new implants to sit in a fresh pocket. It takes longer and has more bleeding and risk than a release.</p>
<h2>En bloc capsulectomy</h2>
<p>The implant and capsule are removed together as a single unit, without opening the capsule. This is used when there is concern about certain conditions, such as BIA-ALCL, or when it is felt important to avoid leaking contents.</p>
<h2>The capsule is a normal response</h2>
<p>Implants develop a scar capsule. The presence of a capsule alone is not a disease and does not automatically mean it must be removed. The relevant questions are whether it is tight, thickened, calcified, infected, contains abnormal fluid or is linked to another diagnosed problem.</p>
<h2>Why en bloc is not a universal standard</h2>
<p>Removing an implant and capsule together may be important when malignancy is suspected or confirmed, but it is not automatically safer or necessary in every removal. In some positions, forcing a capsule away from the chest wall could create avoidable risk. The reason, benefit and alternatives should be explained clearly.</p>
<h2>Trade-offs</h2>
<p>More extensive removal can:</p>
<ul>
<li>Remove more scar tissue</li>
<li>Take longer and cause more bruising and swelling</li>
<li>Increase the chance of bleeding or injury to nearby structures</li>
<li>Leave a larger cavity or affect breast shape</li>
</ul>
<p>But leaving the capsule can mean it remains a source of problems in some cases. There is no one approach for everyone.</p>
<h2>Pathology</h2>
<p>Surgeons may send removed tissue for examination, particularly if there are unusual findings or fluid.</p>
<h2>Plan from the diagnosis and anatomy</h2>
<p>Imaging, examination and the operative findings may change how much capsule can safely be treated. If fluid is present, ask whether it will be tested and how results will be communicated. A consent discussion should allow for reasonable changes in plan, without promising a more extensive operation than is safe.</p>
<h2>Questions to ask</h2>
<ul>
<li>Which of these will I have, and why?</li>
<li>Why not a more or less extensive operation?</li>
<li>What are the risks specific to capsule surgery in my case?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Make sure you understand which capsule operation is planned and why. See <a href="/surgical/capsular-contracture/">capsular contracture</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-revision/malposition/',
    slug: 'breast-revision-malposition',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-revision/',
    parentLabel: 'Breast revision',
    h1: 'Implant Malposition: Bottoming Out, Side Displacement and Symmastia',
    cardTitle: 'Implant malposition',
    seoTitle: 'Implant Malposition: Bottoming Out and Symmastia | Quantum Health',
    seoDescription: 'What it means when implants move out of position, what causes it and the options for correcting it.',
    bannerLead: 'Sometimes an implant ends up in the wrong place, either at the time of surgery or over time.',
    imageKey: 'breastRevisionBanner',
    related: [
      ['/surgical/breast-revision/', 'Breast revision surgery', 'The parent guide to revision planning.'],
      ['/surgical/breast-revision/capsule-surgery/', 'Capsule surgery', 'How scar tissue can affect position.'],
      ['/surgical/breast-revision/reasons/', 'Why revision is needed', 'Common device and appearance problems.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Sometimes an implant ends up in the wrong place, either at the time of surgery or over time. The cause guides whether correction is straightforward or complex.</p>
<h2>Common types</h2>
<ul>
<li><strong>Bottoming out:</strong> the implant drops below the breast fold, with the nipple pointing upward</li>
<li><strong>High-riding:</strong> the implant sits too high, often with capsular contracture</li>
<li><strong>Lateral displacement:</strong> the implant slides toward the armpit</li>
<li><strong>Symmastia:</strong> the implants come together over the breastbone, losing separation between the breasts</li>
<li><strong>Rotation or tilt:</strong> especially with shaped implants</li>
</ul>
<h2>Why it happens</h2>
<ul>
<li>A pocket made too large or in the wrong place</li>
<li>Tissue stretching under heavy implants</li>
<li>Capsular contracture</li>
<li>Muscle movement or pull</li>
<li>Weight change, ageing or pregnancy</li>
<li>Thin or weak tissue</li>
</ul>
<h2>Treatment options</h2>
<p>Treatment depends on the type and severity. Surgeons may:</p>
<ul>
<li>Tighten or rebuild the pocket with internal stitches (capsulorrhaphy)</li>
<li>Change the implant size or position</li>
<li>Use supportive tissue or materials in selected cases</li>
<li>Treat any contracture</li>
</ul>
<p>Supportive materials have varying evidence and costs, so ask what is proposed and why.</p>
<h2>Can it come back?</h2>
<p>Yes. Correction can be less predictable than a first operation, and tissues that have already stretched may stretch again.</p>
<h2>Prevention</h2>
<p>Careful planning, an appropriate implant size and following aftercare advice can lower the risk, though they cannot remove it.</p>
<h2>How position is assessed</h2>
<p>The surgeon compares the implant, nipple, breast fold and chest-wall shape, then considers photographs, scar position and any symptoms. What looks like a low implant can sometimes reflect a high breast fold, skin stretch or a change in the breast tissue itself. Imaging may be useful if rupture or another complication is also suspected.</p>
<h2>Correction may involve more than moving an implant</h2>
<p>A repair can require pocket tightening, changing the implant plane, adjusting the breast fold, exchanging the implant or adding support in selected cases. If skin and breast tissue have stretched, a lift or a staged approach may also be discussed. Each added procedure brings its own scars and recovery.</p>
<h2>Recovery after repair</h2>
<p>Aftercare often focuses on protecting the repaired pocket while it heals. Ask about sleep position, arm movement, bras, lifting and exercise rather than relying on the timeline from your first augmentation. Early symmetry is not the final assessment.</p>
<h2>Questions to ask</h2>
<ul>
<li>What is causing the problem in my case?</li>
<li>How will you correct it, and how long might that last?</li>
<li>What are the alternatives?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Correction is possible, but the cause must be understood first.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-revision/preparing/',
    slug: 'breast-revision-preparing',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-revision/',
    parentLabel: 'Breast revision',
    h1: 'Preparing for Revision Surgery: Records, Questions and Expectations',
    cardTitle: 'Preparing for revision',
    seoTitle: 'Preparing for Breast Revision Surgery | Quantum Health',
    seoDescription: 'How to prepare for revision breast surgery, covering records, second opinions, realistic expectations and questions to ask.',
    bannerLead: 'Revision surgery requires more preparation than a first operation. Good records and a clear diagnosis make planning safer.',
    imageKey: 'breastRevisionBanner',
    related: [
      ['/surgical/breast-revision/', 'Breast revision surgery', 'The parent guide to exchange, removal and repair.'],
      ['/breast-augmentation-consultation-checklist/', 'Consultation checklist', 'Questions to ask before consenting to surgery.'],
      ['/breast-surgeon-credentials/', 'Checking a surgeon', 'Training, registration and facility checks.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Revision surgery requires more preparation than a first operation. Good records, a clear diagnosis and realistic expectations make planning safer.</p>
<h2>Gather your records</h2>
<ul>
<li>Implant card with manufacturer, model, size and batch</li>
<li>Operation notes and details from your first surgery</li>
<li>Imaging reports such as ultrasound, MRI or mammograms</li>
<li>Photos from before and after your first operation</li>
<li>Medical history and medications</li>
</ul>
<p>If you cannot find them, ask the original clinic or hospital for copies.</p>
<h2>Get a clear diagnosis</h2>
<p>Ask what is wrong and what evidence supports it. Imaging may be needed to check for rupture, fluid or capsule changes.</p>
<h2>Consider a second opinion</h2>
<p>A different surgeon may suggest a different approach. This is reasonable and common, especially for complex revision.</p>
<h2>Set realistic expectations</h2>
<ul>
<li>Revision may be less predictable than first-time surgery</li>
<li>Risks of complications can be higher</li>
<li>Results may not match what you originally had or wanted</li>
<li>More than one operation may be needed</li>
</ul>
<h2>Practical matters</h2>
<p>Ask about costs, whether implants will be replaced, warranty coverage and recovery time. Check what the original surgeon or clinic offers, if anything, for complications. Get a written estimate before proceeding.</p>
<h2>Optimise health before surgery</h2>
<p>Revision planning should include a review of smoking or nicotine exposure, medicines and supplements, blood-clot risk, diabetes control and any previous healing problems. Your surgeon or anaesthetist may ask for tests or recommend delaying surgery until a modifiable risk is addressed. Do not stop prescribed medicines without medical advice.</p>
<h2>Plan around uncertainty</h2>
<p>Scar tissue and implant findings can be clearer during surgery than on a scan. Ask which decisions are fixed, which might change in theatre and who will discuss an unexpected result with you. A written plan can make choices about replacement, removal and pathology easier to revisit calmly.</p>
<h2>Prepare practical support</h2>
<p>Arrange a responsible adult, time away from work and help with lifting, children or household tasks if needed. Confirm the contact route for after-hours concerns and the schedule for wound checks. Practical preparation reduces pressure to resume activity before your surgical team says it is safe.</p>
<h2>Emotional side</h2>
<p>Revision can feel frustrating or distressing. Support from friends, family or a counsellor can help.</p>
<h2>Questions to ask</h2>
<ul>
<li>How many revisions like mine have you done?</li>
<li>What is the goal, and what is a realistic result?</li>
<li>What risks apply to me specifically?</li>
<li>What if the result is not what I hoped?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Good records and a clear plan make revision safer and less stressful. See <a href="/surgical/breast-revision/">Breast Revision Surgery</a>.'
      }
    ]
  }),

  /* ------------------------------------------------------------------ *
   * Filler removal
   * ------------------------------------------------------------------ */
  page({
    url: '/surgical/breast-filler-removal/why-removal/',
    slug: 'filler-removal-why',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-filler-removal/',
    parentLabel: 'Filler removal',
    h1: 'Why Breast Filler or Injection Removal May Be Needed',
    cardTitle: 'Why removal may be needed',
    seoTitle: 'Why Breast Filler or Injection Removal May Be Needed | Quantum Health',
    seoDescription: 'Signs that breast injections may be causing problems, what complications look like and why early medical assessment matters.',
    bannerLead: 'Some people seek removal of material injected into the breast. Reasons range from cosmetic dissatisfaction to serious complications.',
    imageKey: 'breastFillerRemovalBanner',
    related: [
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'The parent guide to assessment and treatment.'],
      ['/non-surgical/unsafe-breast-injections/', 'Unsafe breast injections', 'Why fillers, silicone and unknown substances are risky.'],
      ['/surgical/breast-surgery-warning-signs/', 'Warning signs', 'Symptoms that need urgent medical attention.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Some people seek removal of material injected into the breast, such as fillers, oils or silicone. Reasons range from cosmetic dissatisfaction to serious complications. See <a href="/surgical/breast-filler-removal/">Breast Filler Removal</a>.</p>
<h2>Problems that may lead to removal</h2>
<ul>
<li>Hard lumps or nodules, sometimes years after injection</li>
<li>Pain, tenderness or burning</li>
<li>Infection, abscess or discharge</li>
<li>Migration of material to other areas</li>
<li>Changes in shape, asymmetry or skin changes</li>
<li>Inflammation that keeps returning</li>
<li>Difficulty with breast imaging or examination</li>
<li>Dissatisfaction with the appearance</li>
</ul>
<h2>Why complications can appear late</h2>
<p>Some reactions to injected material develop slowly. A person may feel well for months or years and then notice lumps or inflammation.</p>
<h2>Not all injected substances are the same</h2>
<p>Some products are temporary and absorbable. Others are permanent, and some are unidentified. What was injected strongly influences what can be done. See <a href="/non-surgical/unsafe-breast-injections/">why breast injections are risky</a>.</p>
<h2>What to do if you have symptoms</h2>
<ul>
<li>See a doctor, ideally with experience in breast surgery</li>
<li>Do not squeeze, drain or try to remove material yourself</li>
<li>Gather any records of what was injected, where and when</li>
<li>Seek urgent care for fever, spreading redness or severe pain</li>
</ul>
<h2>If you have no symptoms</h2>
<p>You may still want a medical review, including a discussion of breast screening and imaging, since injected material can affect interpretation.</p>
<h2>Symptoms need a diagnosis</h2>
<p>Injection complications can resemble infection, inflammation, ordinary breast disease or a combination of problems. A symptom alone cannot identify the substance or show how far it has spread. Assessment before treatment protects against removing the wrong tissue or missing another cause of a lump.</p>
<h2>Do not add more material to hide a problem</h2>
<p>Further injections, unprescribed dissolving agents, forceful massage or attempts to squeeze a lump can add injury and make the material harder to trace. Avoid treatments offered solely to “break down” an unknown injection unless an appropriately qualified clinician has assessed you.</p>
<h2>When to seek urgent help</h2>
<p>Seek urgent medical care for fever, rapidly spreading redness, severe or escalating pain, an open or draining wound, sudden swelling, breathing difficulty or a severe allergic reaction. These symptoms need prompt assessment; they should not wait for a cosmetic consultation.</p>
<h2>Useful records</h2>
<p>Bring product labels, receipts, consent forms, photographs and any details of where treatment occurred, including overseas treatment. Even incomplete information can help a specialist plan tests and explain their limits.</p>`
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Report symptoms early. The sooner the problem is understood, the more options there may be.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-filler-removal/assessment/',
    slug: 'filler-removal-assessment',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-filler-removal/',
    parentLabel: 'Filler removal',
    h1: 'How Doctors Assess Breasts After Injections',
    cardTitle: 'Assessment after injections',
    seoTitle: 'How Doctors Assess Breasts After Injections | Quantum Health',
    seoDescription: 'What to expect when a doctor assesses breast injections, including history, examination, imaging and why the substance identity matters.',
    bannerLead: 'Before deciding on treatment, a doctor tries to understand what was injected and what it is doing.',
    imageKey: 'breastFillerRemovalBanner',
    related: [
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'The parent guide to options and aftercare.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Assessment, warning signs and second opinions.'],
      ['/breast-anatomy/', 'Breast anatomy', 'The tissue and blood supply involved in assessment.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Before deciding on treatment, a doctor tries to understand what was injected and what it is doing. The assessment combines your history, an examination and, often, imaging.</p>
<h2>Your history</h2>
<p>Be prepared to share:</p>
<ul>
<li>What was injected, if known, including product names or documents</li>
<li>When, where and by whom</li>
<li>Whether it was repeated</li>
<li>Your symptoms and their timeline</li>
<li>Previous breast surgery, implants or infections</li>
<li>Family history of breast disease</li>
</ul>
<p>If you do not know the product, say so. That is common.</p>
<h2>Examination</h2>
<p>The doctor examines the breasts, skin, nipples and lymph nodes in the armpits, noting lumps, tenderness, asymmetry and skin changes.</p>
<h2>Imaging</h2>
<p>Tests may include:</p>
<ul>
<li>Ultrasound to see lumps, fluid collections and the distribution of material</li>
<li>Mammography, with care and appropriate technique</li>
<li>MRI to map extent and relation to surrounding tissue</li>
</ul>
<p>Imaging can show where material is, but may not tell what it is.</p>
<h2>Other tests</h2>
<p>If there is infection, samples may be taken. If a lump is unclear, a needle biopsy may be needed to rule out other causes, including cancer. A biopsy can sometimes help identify the nature of the material.</p>
<h2>Why identity matters</h2>
<p>Some fillers can be dissolved by specific medicines; others cannot. Treatment depends on what is present, so tell your doctor everything you know.</p>
<h2>Imaging maps, but may not identify everything</h2>
<p>Scans can show the location of material, fluid or altered tissue, but may not reliably name an unknown product or exclude every diagnosis. The radiologist needs the injection history and clinical question. Sometimes repeat imaging, a specialist review or a tissue sample is safer than making a treatment decision from one scan alone.</p>
<h2>Planning after assessment</h2>
<p>The next step may be observation, medication, drainage, surgery, a second opinion or referral to a breast team. Ask what problem treatment is intended to solve, what it cannot solve and whether there is a reason to act now rather than monitor. Complex cases may need staged decisions rather than a single procedure.</p>
<h2>How to prepare for the appointment</h2>
<p>Write down when symptoms started, whether they change, your medical conditions and all medicines or supplements. Bring prior reports and a trusted person if you want help remembering the discussion. Ask for the plan and warning signs in writing.</p>
<h2>Questions to ask</h2>
<ul>
<li>What do the tests show, and what are their limits?</li>
<li>Is any of this concerning for other conditions?</li>
<li>What are my options and the risks of each?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'A careful assessment guides safe treatment. Do not skip it, even if the appearance bothers you more than the symptoms.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-filler-removal/removal-options/',
    slug: 'filler-removal-options',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-filler-removal/',
    parentLabel: 'Filler removal',
    h1: 'Options for Removing Breast Filler',
    cardTitle: 'Removal options',
    seoTitle: 'Options for Removing Breast Filler | Quantum Health',
    seoDescription: 'Approaches to treating breast filler complications, including dissolving, drainage and surgical removal, and when each may be considered.',
    bannerLead: 'There is no single removal method. The right choice depends on the type of material, its location and your symptoms.',
    imageKey: 'breastFillerRemovalBanner',
    related: [
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'The parent guide to assessment and recovery.'],
      ['/non-surgical/dermal-fillers/', 'Breast fillers', 'Approved uses, regulatory warnings and alternatives.'],
      ['/surgical/breast-filler-removal/permanent-unknown/', 'Permanent or unknown substances', 'Why some injections are harder to treat.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">There is no single method. The right choice depends on the type of material, its location and your symptoms.</p>
<h2>Dissolving (for some fillers)</h2>
<p>Hyaluronic acid fillers can be broken down by an enzyme called hyaluronidase. It only works on hyaluronic acid products and cannot dissolve other materials. Using it requires knowing or reasonably establishing what was injected, and should be done by a qualified clinician in an appropriate setting. Allergic reactions are possible.</p>
<h2>Needle aspiration or drainage</h2>
<p>Fluid collections, abscesses or some soft material may be drained under ultrasound guidance. This may be repeated if fluid returns.</p>
<h2>Surgical removal</h2>
<p>Surgery may be used when lumps are hard, material is permanent or complications persist. Methods range from removing individual lumps to more extensive excision of affected tissue. The extent depends on how widely the material has spread.</p>
<h2>Liposuction-assisted methods</h2>
<p>Some surgeons use suction techniques in selected cases to remove material mixed with fat. Suitability varies.</p>
<h2>Observation</h2>
<p>If material is stable and causes no problems, careful monitoring may be reasonable.</p>
<h2>Treat active problems first</h2>
<p>When there is infection, skin breakdown or a collection of fluid, controlling that problem may take priority over improving shape. Antibiotics, drainage or a hospital assessment may be needed before any reconstructive decision. A removal plan should not underestimate an active infection.</p>
<h2>Treating infection</h2>
<p>Antibiotics and drainage may be needed first, and surgery may be delayed until infection is controlled.</p>
<h2>Limits</h2>
<p>Complete removal is not always possible, because material can be intermingled with tissue. Ask what is likely to remain and what that means for follow-up.</p>
<h2>Removal can change breast shape</h2>
<p>Taking out material, scar tissue or affected breast tissue can leave volume loss, dimpling, asymmetry or scars. Reconstruction is sometimes possible, but it should not distract from the immediate safety goal. Ask whether the proposed operation aims for diagnosis, symptom control, removal, reconstruction or a combination.</p>
<h2>Choosing observation or intervention</h2>
<p>Observation is not doing nothing: it needs a plan for symptoms, imaging, breast screening and review. Intervention may be reasonable when symptoms, infection, tissue damage or diagnostic uncertainty outweigh its risks. The decision should be individual and revisited if the situation changes.</p>
<h2>Regulatory check</h2>
<p>In India, check the product’s regulatory status and labelled intended use against current CDSCO records and product information. Ask for its name, manufacturer and documentation. An authorisation for another anatomical area does not establish that breast use is authorised, appropriate or safe.</p>`
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'The material determines the method. Do not try dissolving agents or drainage without knowing what was injected and without qualified clinical supervision.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-filler-removal/permanent-unknown/',
    slug: 'filler-removal-permanent-unknown',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-filler-removal/',
    parentLabel: 'Filler removal',
    h1: 'When the Injected Substance Is Permanent or Unknown',
    cardTitle: 'Permanent or unknown substances',
    seoTitle: 'Permanent or Unknown Breast Injections | Quantum Health',
    seoDescription: 'Why permanent or unidentified breast injections such as liquid silicone or oils are hard to treat, and what specialists may consider.',
    bannerLead: 'Some people had injections of liquid silicone, paraffin, oils or unlabelled products, sometimes years ago or abroad. These situations are among the most difficult.',
    imageKey: 'breastFillerRemovalBanner',
    related: [
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'The parent guide to assessment and treatment.'],
      ['/non-surgical/unsafe-breast-injections/', 'Unsafe breast injections', 'Why these products can cause permanent harm.'],
      ['/surgical/breast-revision/', 'Breast revision surgery', 'Reconstruction and revision after complex surgery.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Some people had injections of liquid silicone, paraffin, oils or unlabelled products, sometimes years ago or abroad. These situations are among the most difficult.</p>
<h2>Why it is hard</h2>
<ul>
<li>Material can spread into tissue in tiny droplets that cannot be separated out</li>
<li>The body forms inflammatory lumps (granulomas) around it</li>
<li>It can migrate to surrounding areas, such as the chest wall or armpit</li>
<li>Its exact nature may be unknown</li>
<li>Removing it may mean removing healthy tissue as well</li>
</ul>
<h2>What specialists may consider</h2>
<ul>
<li>Detailed imaging to map the extent</li>
<li>Removal of the most affected tissue</li>
<li>In some extensive cases, removal of much of the breast tissue, sometimes followed by reconstruction</li>
<li>Staged operations rather than a single one</li>
<li>Support for scarring and shape</li>
</ul>
<p>Decisions are individual and should be made with an experienced surgeon, sometimes with a multidisciplinary team.</p>
<h2>Risks of surgery</h2>
<p>These include bleeding, infection, scarring, asymmetry, loss of sensation, delayed healing and incomplete removal. Results may be unpredictable.</p>
<h2>Reconstruction options</h2>
<p>After removal, options may include implants, fat transfer or other techniques, depending on tissue quality and safety. Timing varies and is individual.</p>
<h2>The aim may be control, not complete removal</h2>
<p>With widely dispersed material, complete removal may damage more healthy tissue than it helps. A team may therefore aim to treat infection, painful lumps, skin problems or tissue distortion while leaving stable material under surveillance. This is not a failed operation; it is a safety-based balance that should be explained before consent.</p>
<h2>Finding a safe boundary</h2>
<p>Imaging and examination help estimate where material has travelled, but the true extent can be uncertain until surgery. Ask which tissue might need to be removed, whether the procedure could change during surgery and what reconstruction, if any, should wait until healing is complete.</p>
<h2>Screening and new symptoms still matter</h2>
<p>Previous injections do not make later lumps automatically benign. Continue age- and risk-appropriate screening as advised, tell imaging teams about the injections, and seek review for a new breast or armpit lump, skin change, persistent pain or swelling.</p>
<h2>Emotional impact</h2>
<p>People dealing with these complications can feel anxious, ashamed or let down. Support from a counsellor or support group can help, and seeking care is the right step.</p>
<h2>Questions to ask</h2>
<ul>
<li>Can you identify what the material is?</li>
<li>Is staged surgery needed?</li>
<li>What can I realistically expect afterwards?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Seek an experienced specialist. Do not delay care out of embarrassment.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-filler-removal/after-removal/',
    slug: 'filler-removal-aftercare',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-filler-removal/',
    parentLabel: 'Filler removal',
    h1: 'After Filler Removal: Recovery, Results and Follow-Up',
    cardTitle: 'After removal',
    seoTitle: 'After Breast Filler Removal: Recovery and Follow-Up | Quantum Health',
    seoDescription: 'What to expect after treatment for breast filler complications, including recovery, healing, scars, screening and possible further procedures.',
    bannerLead: 'Recovery depends on what was done, from a small procedure to major surgery.',
    imageKey: 'breastFillerRemovalBanner',
    related: [
      ['/surgical/breast-filler-removal/', 'Breast filler removal', 'The parent guide to assessment and options.'],
      ['/surgical/breast-surgery-warning-signs/', 'Warning signs after surgery', 'When to seek urgent medical help.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Long-term monitoring and choosing a surgeon.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Recovery depends on what was done, from a small procedure to major surgery. Follow your surgeon’s instructions on wounds, garments and activity.</p>
<h2>After dissolving or drainage</h2>
<p>You may have swelling, bruising and tenderness for days. Follow-up checks are usually arranged to see whether more treatment is needed.</p>
<h2>After surgery</h2>
<p>Recovery is similar to other breast operations: soreness, swelling, dressings, possibly drains and activity limits for several weeks. Your surgeon will advise on garments, wound care and returning to work.</p>
<h2>Scars and shape</h2>
<p>Surgical removal leaves scars, and the breast may look different, with loss of volume, firmness or asymmetry. Further procedures such as reconstruction may be considered after healing.</p>
<h2>Pathology</h2>
<p>Removed tissue is often examined to help confirm what it is and to check for other conditions.</p>
<h2>Follow-up</h2>
<ul>
<li>Attend all check-ups</li>
<li>Report new lumps, pain, redness, swelling or discharge</li>
<li>Keep records of what was found and done</li>
<li>Tell imaging teams about any previous injections and surgery</li>
</ul>
<h2>Breast screening</h2>
<p>Maintain screening as advised for your age and risk. Injected material and scarring can make imaging harder, so choose imaging teams with experience if possible.</p>
<h2>Recurrence</h2>
<p>If material remains, problems can recur. Ask what was left behind and what signs to watch for.</p>
<h2>The first weeks need a clear plan</h2>
<p>Ask how to look after dressings, shower, sleep, use pain relief and contact the team out of hours. Do not restart strenuous exercise, nicotine use, massage or scar products until you have specific advice. Early swelling can hide the eventual contour.</p>
<h2>Reconstruction takes planning</h2>
<p>If removal changes shape substantially, a surgeon may discuss reconstruction only after infection, inflammation and wounds have settled. The safest timing depends on the amount of affected tissue, the material involved and your healing. A reconstruction discussion should include scars, surveillance and the possibility of more than one stage.</p>
<h2>Keep a long-term record</h2>
<p>Keep copies of operative notes, pathology and imaging reports, and share them with your GP or other treating clinicians. They can inform later breast assessment, screening and decisions about further surgery.</p>
<h2>Emotional recovery</h2>
<p>Take time to adjust to changes. Talk to your care team if you feel low or anxious.</p>
<h2>Questions to ask</h2>
<ul>
<li>What was removed, and what remains?</li>
<li>What follow-up do I need?</li>
<li>When can I consider reconstruction?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Ongoing follow-up matters, because some problems can reappear. See <a href="/breast-enlargement-safety/">Breast Enlargement Safety</a>.'
      }
    ]
  }),

  /* ------------------------------------------------------------------ *
   * Breast reduction
   * ------------------------------------------------------------------ */
  page({
    url: '/surgical/breast-reduction/candidacy/',
    slug: 'breast-reduction-candidacy',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-reduction/',
    parentLabel: 'Breast reduction',
    h1: 'Who Is a Candidate for Breast Reduction?',
    cardTitle: 'Breast reduction candidacy',
    seoTitle: 'Who Is a Candidate for Breast Reduction? | Quantum Health',
    seoDescription: 'The symptoms, health factors and expectations that surgeons consider when assessing suitability for breast reduction surgery.',
    bannerLead: 'Breast reduction removes breast tissue and skin to reduce size and weight. It is often done for physical symptoms as well as appearance.',
    imageKey: 'breastReductionBanner',
    related: [
      ['/surgical/breast-reduction/', 'Breast reduction surgery', 'The parent guide to techniques, recovery and outcomes.'],
      ['/surgical/breast-reduction/techniques/', 'Reduction techniques', 'How scars and tissue removal differ.'],
      ['/surgical/breast-reduction/risks/', 'Reduction risks', 'Scars, sensation and breastfeeding trade-offs.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Breast reduction removes breast tissue and skin to reduce size and weight. It is often done for physical symptoms as well as appearance. See <a href="/surgical/breast-reduction/">Breast Reduction</a>.</p>
<h2>Symptoms that often lead people to consider it</h2>
<ul>
<li>Neck, shoulder or back pain</li>
<li>Deep grooves from bra straps</li>
<li>Skin irritation or rashes under the breasts</li>
<li>Difficulty exercising or finding clothes that fit</li>
<li>Poor posture</li>
<li>Headaches or numbness in the hands</li>
<li>Distress about breast size</li>
</ul>
<p>These can have other causes, so a doctor should check for them.</p>
<h2>What the surgeon assesses</h2>
<ul>
<li>Breast size, weight and shape</li>
<li>Skin quality and nipple position</li>
<li>Your general health and weight</li>
<li>Breast screening history and family history</li>
<li>Your goals and expectations</li>
</ul>
<h2>Factors that favour surgery</h2>
<ul>
<li>Breasts that have finished developing</li>
<li>A relatively stable weight</li>
<li>Good general health</li>
<li>Realistic expectations</li>
<li>A non-smoking status</li>
</ul>
<h2>Factors that need discussion</h2>
<ul>
<li>Smoking, which affects healing</li>
<li>Plans for pregnancy or breastfeeding</li>
<li>Obesity or medical conditions</li>
<li>Plans for significant weight loss, which may change breast size</li>
</ul>
<h2>Non-surgical steps first</h2>
<p>Supportive bras, physiotherapy and weight management may help some people. Surgeons may suggest these first, especially when symptoms are mild.</p>
<h2>Document symptoms and their effect</h2>
<p>Keep a simple record of pain, rashes, strap grooves, activity limits and treatments you have tried. This helps a clinician look for other causes and understand how breast size affects daily life. It is useful information, but it does not replace examination or guarantee that surgery is the right answer.</p>
<h2>Goals are more than a cup size</h2>
<p>Cup sizes differ between brands and do not describe breast width, shape, scars or nipple position. Explain which activities or clothing are difficult and what amount of change feels acceptable. A surgeon can discuss a range of likely proportions, but cannot promise an exact bra size.</p>
<h2>Screening and timing</h2>
<p>Tell the surgeon about previous lumps, biopsies, implants, family history and any screening that is due. Significant weight change or pregnancy plans can alter breast size and shape, so timing may matter. A review can help decide whether waiting would make the result more predictable.</p>
<h2>Questions to ask</h2>
<ul>
<li>Am I suitable now, or should I wait?</li>
<li>How much reduction is realistic?</li>
<li>What would you do if I plan pregnancy?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Suitability depends on health, symptoms and goals, not size alone.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-reduction/techniques/',
    slug: 'breast-reduction-techniques',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-reduction/',
    parentLabel: 'Breast reduction',
    h1: 'Breast Reduction Techniques: How the Operation Is Done',
    cardTitle: 'Reduction techniques',
    seoTitle: 'Breast Reduction Techniques and Scars | Quantum Health',
    seoDescription: 'The main breast reduction techniques, including inverted-T, vertical and liposuction-assisted methods, and how they differ in scars and suitability.',
    bannerLead: 'Surgeons choose a technique based on breast size, shape, skin and the nipple’s position.',
    imageKey: 'breastReductionBanner',
    related: [
      ['/surgical/breast-reduction/', 'Breast reduction surgery', 'The parent guide to benefits and recovery.'],
      ['/surgical/breast-reduction/risks/', 'Reduction risks', 'Nipple circulation, sensation and scarring.'],
      ['/surgical/breast-reduction/recovery/', 'Reduction recovery', 'What to expect after surgery.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Surgeons choose a technique based on breast size, shape, skin and the nipple’s position. The aim is to remove tissue safely while preserving blood supply and creating a natural shape.</p>
<h2>The basic steps</h2>
<p>Under general anaesthesia, the surgeon removes excess breast tissue, fat and skin, reshapes the remaining breast and repositions the nipple and areola, usually keeping them attached to their blood supply. Operation time depends on the extent of surgery, and many people stay in hospital for a day or less.</p>
<h2>Inverted-T (anchor) technique</h2>
<p>Scars go around the areola, down the breast and along the fold. It suits larger reductions and gives good control of skin and shape. It has the longest scar.</p>
<h2>Vertical technique</h2>
<p>Scars go around the areola and down to the fold, without a long scar along it. It is used for moderate reductions in suitable breasts.</p>
<h2>Liposuction-assisted reduction</h2>
<p>When breasts are mostly fat, liposuction may reduce volume with small incisions. It does not lift or remove skin and is not suitable for dense breasts.</p>
<h2>Pedicle choices and nipple safety</h2>
<p>In many reductions, the nipple and areola remain attached to a section of tissue, called a pedicle, that carries blood supply and nerves. The surgeon chooses its design according to breast size, anatomy and the planned reduction. In a very large reduction, a free nipple graft may be safer but has different trade-offs.</p>
<h2>Shape cannot be reduced to a cup size</h2>
<p>Technique affects width, projection, upper fullness and scar length as well as volume. Natural differences between breasts can remain after surgery. Ask the surgeon to explain the goals for your own proportions and what they would do if safely achieving the planned size conflicts with preserving blood supply.</p>
<h2>Free nipple graft</h2>
<p>In very large reductions or where blood supply is a concern, the nipple and areola may be removed and replaced as a graft. This carries a high chance of lost sensation and loss of breastfeeding ability, and the graft may change colour.</p>
<h2>Drains and dressings</h2>
<p>Some surgeons use drains for a short time. Dressings and a support bra are standard.</p>
<h2>Tissue examination</h2>
<p>Removed tissue is usually sent for pathology to check for unexpected findings.</p>
<h2>Questions to ask</h2>
<ul>
<li>Which technique do you suggest, and why?</li>
<li>What scars will I have?</li>
<li>Will the nipple stay attached to its blood supply?</li>
<li>How will this affect breastfeeding?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Technique depends on your breasts. Ask for the reasons behind your surgeon’s choice, not just the name of the operation.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-reduction/recovery/',
    slug: 'breast-reduction-recovery',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-reduction/',
    parentLabel: 'Breast reduction',
    h1: 'Recovery After Breast Reduction',
    cardTitle: 'Reduction recovery',
    seoTitle: 'Recovery After Breast Reduction | Quantum Health',
    seoDescription: 'What to expect after breast reduction, including pain, swelling, dressings, activity limits, scar care and warning signs.',
    bannerLead: 'Recovery varies with technique and extent. Your surgeon’s advice comes first, especially in the first weeks.',
    imageKey: 'breastReductionBanner',
    related: [
      ['/surgical/breast-reduction/', 'Breast reduction surgery', 'The parent guide to benefits and techniques.'],
      ['/surgical/breast-reduction/risks/', 'Reduction risks', 'Healing problems, sensation and scarring.'],
      ['/surgical/breast-surgery-warning-signs/', 'Warning signs after surgery', 'Symptoms that need urgent medical attention.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Recovery varies with technique and extent. Your surgeon’s advice comes first, especially in the first weeks.</p>
<h2>The first days</h2>
<ul>
<li>Soreness, swelling, bruising and tightness</li>
<li>Dressings and a surgical bra</li>
<li>Possible drains</li>
<li>Altered sensation in the breasts and nipples</li>
<li>Tiredness</li>
</ul>
<p>Some people feel immediate relief from weight and strain even while sore.</p>
<h2>Medicines</h2>
<p>You will usually have pain relief. Follow instructions on which medicines to avoid, since some raise bleeding risk.</p>
<h2>Activity</h2>
<ul>
<li>Walk gently from early on</li>
<li>Avoid lifting, pushing and strenuous exercise for several weeks</li>
<li>Avoid reaching overhead and sudden movements if advised</li>
<li>Return to office-type work after a period set by your surgeon, and to physical work later</li>
</ul>
<h2>Sleeping and support</h2>
<p>Sleeping on your back with your upper body raised is often advised. Wear the recommended bra as instructed, day and night at first.</p>
<h2>Wounds and scars</h2>
<p>Keep dressings clean and dry, and attend wound checks. Scars begin red and raised and fade over a year or more. Protect them from the sun.</p>
<h2>Healing at scar junctions</h2>
<p>The point where scars meet can heal slowly in some people, sometimes needing dressings for a while.</p>
<h2>Shape</h2>
<p>Breasts look swollen and high at first, and settle over weeks to months.</p>
<h2>Work, caregiving and lifting</h2>
<p>Plan ahead for meals, transport, childcare and tasks that need pushing, pulling or carrying. Even if desk work feels possible early, fatigue and limited arm movement can make a full day difficult. Ask for separate guidance on returning to office work, manual work, driving and exercise.</p>
<h2>Follow-up and gradual activity</h2>
<p>Attend planned wound checks and ask when it is safe to change bras, sleep on your side, raise your arms freely and restart each type of exercise. Returning too quickly can stress healing wounds. Your plan may change if there is delayed healing, a seroma or a scar problem.</p>
<h2>Longer-term changes</h2>
<p>Numbness, scar colour and breast shape can continue to change for many months. Keep routine breast care and tell imaging teams about the operation. A new lump, discharge or persistent one-sided change still needs medical assessment.</p>
<h2>Call your surgeon if</h2>
<p>You have fever, spreading redness, discharge, rapid swelling on one side, a wound opening, or a nipple turning dark, pale or cold. See <a href="/surgical/breast-surgery-warning-signs/">warning signs</a>.</p>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Plan for rest and help at home. See <a href="/surgical/breast-reduction/">Breast Reduction</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-reduction/risks/',
    slug: 'breast-reduction-risks',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-reduction/',
    parentLabel: 'Breast reduction',
    h1: 'Breast Reduction Risks: Scars, Nipple Circulation, Sensation and Breastfeeding',
    cardTitle: 'Reduction risks',
    seoTitle: 'Breast Reduction Risks and Trade-offs | Quantum Health',
    seoDescription: 'The main risks and trade-offs of breast reduction surgery, from scarring and nipple blood supply to sensation and breastfeeding.',
    bannerLead: 'Breast reduction is widely performed and often brings relief, but it involves trade-offs.',
    imageKey: 'breastReductionBanner',
    related: [
      ['/surgical/breast-reduction/', 'Breast reduction surgery', 'The parent guide to candidacy and recovery.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Consent, warning signs and choosing a surgeon.'],
      ['/breast-surgeon-credentials/', 'Checking a surgeon', 'Training, registration and facility checks.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Breast reduction is widely performed and often brings relief, but it involves trade-offs. Understanding them supports informed consent.</p>
<h2>General risks</h2>
<ul>
<li>Bleeding, infection and wound-healing problems</li>
<li>Reactions to anaesthesia</li>
<li>Blood clots</li>
</ul>
<h2>Risks specific to reduction</h2>
<ul>
<li><strong>Scarring:</strong> visible, widened or thickened scars, sometimes lasting</li>
<li><strong>Nipple and areola circulation:</strong> partial or, rarely, complete loss of blood supply, which is more likely in large reductions and smokers</li>
<li><strong>Sensation changes:</strong> reduced or lost nipple and breast sensation, which may be permanent</li>
<li><strong>Breastfeeding:</strong> milk production may be reduced or lost, particularly with large reductions or nipple grafts</li>
<li><strong>Asymmetry</strong> in size, shape or nipple position</li>
<li><strong>Fat necrosis,</strong> causing firm lumps</li>
<li><strong>Skin and wound breakdown,</strong> particularly at scar junctions</li>
<li><strong>Regrowth or changes</strong> with weight gain, hormones or pregnancy</li>
<li><strong>Further surgery</strong></li>
</ul>
<h2>Risk factors</h2>
<p>Smoking, higher body weight, large resections, diabetes and other conditions affecting healing can raise risk.</p>
<h2>Blood supply needs close attention</h2>
<p>Moving the nipple and removing tissue changes the blood supply to skin, fat and the nipple-areola complex. A surgeon will assess this during and after surgery, but compromised circulation can still occur. Increasing pain, unusual coldness, darkening, marked paleness or a worsening wound needs prompt review.</p>
<h2>General health risks still apply</h2>
<p>A preoperative assessment considers anaesthesia, blood clots, bleeding, medicines and medical conditions as well as the breast operation itself. Tell the team about prior clots, sleep apnoea, allergies, supplements and nicotine in all forms. Follow instructions about fasting and prevention of clots.</p>
<h2>If further treatment is needed</h2>
<p>Dressings, antibiotics, drainage, scar treatment or a further operation may be needed if healing does not follow the expected course. This can extend time away from work and alter the final shape. Ask how the team manages common complications and who to contact outside normal hours.</p>
<h2>Personal plans matter</h2>
<p>Before consenting, discuss pregnancy, breastfeeding, major weight change and your priorities around scars and sensation. There may be no option without trade-offs. The most suitable plan is one that reflects your health and goals, not simply the smallest scar or largest possible reduction.</p>
<h2>Reducing risk</h2>
<ul>
<li>Stop smoking before and after surgery</li>
<li>Reach a stable, healthy weight</li>
<li>Follow aftercare advice</li>
<li>Choose an experienced surgeon</li>
</ul>
<h2>Breast screening</h2>
<p>Scars and tissue changes can affect mammograms. Tell the imaging team about your surgery.</p>
<h2>Questions to ask</h2>
<ul>
<li>What are my specific risks?</li>
<li>How likely is a nipple graft?</li>
<li>What is the chance I could still breastfeed?</li>
</ul>`
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Understand the trade-offs, especially for sensation and breastfeeding, before you decide.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-reduction/outcomes/',
    slug: 'breast-reduction-outcomes',
    section: 'surgical',
    group: 'subpages',
    parent: '/surgical/breast-reduction/',
    parentLabel: 'Breast reduction',
    h1: 'Life After Breast Reduction: Outcomes, Quality of Life and Long-Term Care',
    cardTitle: 'Life after reduction',
    seoTitle: 'Life After Breast Reduction: Outcomes and Long-Term Care | Quantum Health',
    seoDescription: 'What research and patients report about life after breast reduction, including pain relief, exercise, satisfaction and long-term breast care.',
    bannerLead: 'Many people who have breast reduction report meaningful improvements, though experiences vary.',
    imageKey: 'breastReductionBanner',
    related: [
      ['/surgical/breast-reduction/', 'Breast reduction surgery', 'The parent guide to candidacy and recovery.'],
      ['/breast-surgery-costs/', 'Understanding costs', 'Quotes, exclusions and insurance questions.'],
      ['/surgical/breast-reduction/risks/', 'Reduction risks', 'Scars, sensation and long-term changes.']
    ],
    blocks: [
      {
        type: 'prose',
        html: `
<p class="lead">Many people who have breast reduction report meaningful improvements, though experiences vary. Outcomes depend on symptoms, technique, healing and later life changes.</p>
<h2>Symptoms</h2>
<p>Studies generally report reduced neck, shoulder and back pain and improved comfort, often described as a significant benefit. Results vary, and not every symptom improves.</p>
<h2>Physical activity and daily life</h2>
<p>Many people find it easier to exercise, sleep, dress and move. Some find that they feel more confident, but outcomes are individual and expectations should be realistic.</p>
<h2>Appearance</h2>
<p>Breasts are smaller, lighter and often higher. Scars are permanent and fade. Shapes may change over time with ageing and weight changes.</p>
<h2>Satisfaction</h2>
<p>Research commonly finds high satisfaction after breast reduction, but some people are unhappy with scars, sensation, size or asymmetry. Ask your surgeon about outcomes in people like you.</p>
<h2>Staying well</h2>
<ul>
<li>Attend follow-up visits</li>
<li>Continue breast screening as advised, telling teams about your surgery</li>
<li>Check your breasts regularly and report new lumps</li>
<li>Maintain a stable weight where possible</li>
</ul>
<h2>Size change over time</h2>
<p>Breasts can grow again with weight gain, hormones and pregnancy. Surgery does not prevent this entirely.</p>
<h2>Pregnancy and breastfeeding</h2>
<p>Breast reduction does not prevent pregnancy, and some people can breastfeed afterwards, but supply may be reduced.</p>
<h2>How to think about an outcome</h2>
<p>Improvement is usually judged by comfort, function, shape, scars and how the result fits your own priorities. Research averages cannot predict relief from a particular symptom or how you will feel about scars and sensation. Discuss the outcomes that matter most to you before surgery.</p>
<h2>Adjustment is not only physical</h2>
<p>It can take time to get used to a different body shape, clothing fit and other people’s reactions. Some people welcome the change immediately; others need time or support. Talk to your care team if regret, anxiety, low mood or body-image concerns persist.</p>
<h2>Long-term care</h2>
<p>Routine screening, general breast awareness and a stable weight where possible remain important after a reduction. Keep your surgical records and seek assessment for new symptoms rather than assuming that every change is scar tissue or normal ageing.</p>
<h2>Costs and cover</h2>
<p>In India, health policies may apply IRDAI’s standard cosmetic or plastic-surgery exclusion. Exceptions include reconstruction after accident, burns or cancer, and medically necessary treatment to remove a direct and immediate health risk certified by the attending medical practitioner. Eligibility remains policy- and case-specific. Read the current wording and obtain written pre-authorisation; certification does not guarantee payment.</p>`
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Many people benefit, but understanding trade-offs and keeping up long-term breast health matters. See <a href="/surgical/breast-reduction/">Breast Reduction</a>.'
      }
    ]
  })
];

module.exports = { surgicalSubpages: pages };
