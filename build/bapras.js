'use strict';

/* BAPRAS breast augmentation patient guide. The British Association of Plastic,
   Reconstructive and Aesthetic Surgeons (BAPRAS) publishes a four-part patient
   guide to breast augmentation (breast enlargement). This page condenses every
   section of that guide — the introduction, implant techniques, complications
   and other information — and links to the original pages on bapras.org.uk so
   the wording and any updates can be checked at source. */

const { site, stdCta } = require('./content');

const GUIDE = 'https://www.bapras.org.uk/public/patient-information/surgery-guides/breast-augmentation';
const P_GUIDE = GUIDE;
const P_TECHNIQUES = GUIDE + '/implant-techniques';
const P_COMPLICATIONS = GUIDE + '/what-complications-can-occur';
const P_OTHER = GUIDE + '/other-information';

const baprasPage = {
  url: '/research/bapras-breast-augmentation/',
  slug: 'bapras-research',
  h1: 'BAPRAS Breast Augmentation Patient Guide',
  seoTitle: 'BAPRAS Breast Augmentation Guide: Implants, Risks & Costs | Breast Enlargement Guide',
  seoDescription: 'The complete BAPRAS (British Association of Plastic, Reconstructive and Aesthetic Surgeons) breast enlargement patient guide summarised: consultation and cooling-off, implant techniques, reported complication rates, long-term consequences, alternatives and the implant registry.',
  bannerEyebrow: 'Professional association guide',
  bannerLead: 'Breast augmentation explained by BAPRAS — the operation, implant choices, the reported risks with their frequencies, the long-term consequences and the decisions you should never be rushed into.',
  breadcrumb: [{ label: 'Research library', href: '/research/breast-enlargement/' }, { label: 'BAPRAS patient guide' }],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'BAPRAS Breast Augmentation Patient Guide',
      description: 'A section-by-section summary of the four-part BAPRAS patient guide to breast augmentation, with links to the original pages on bapras.org.uk.',
      url: site.url + '/research/bapras-breast-augmentation/',
      isPartOf: { '@type': 'WebSite', name: site.name, url: site.url + '/' },
      about: { '@type': 'MedicalEntity', name: 'Breast augmentation' },
      creator: { '@type': 'Organization', name: 'British Association of Plastic, Reconstructive and Aesthetic Surgeons (BAPRAS)', url: 'https://www.bapras.org.uk/' }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'BAPRAS Breast Augmentation Patient Guide',
      url: site.url + '/research/bapras-breast-augmentation/',
      about: { '@type': 'MedicalProcedure', name: 'Breast augmentation' }
    }
  ],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This page works through the patient guide published by the <a href="https://www.bapras.org.uk/" rel="noopener">British Association of Plastic, Reconstructive and Aesthetic Surgeons (BAPRAS)</a> — the four-part guide to breast augmentation (bilateral breast augmentation, or BBA): what the operation is, how to choose a surgeon, implant techniques, the complications that can occur and the long-term consequences. Every part is summarised here and linked to the original, so the current wording can always be checked at source.</p>' +
        '<p>BAPRAS describes breast enlargement as a potentially life-enhancing procedure — but also as a big decision: major surgery with potential risks, and a result that cannot be guaranteed. The guide was edited by Lee Martin and Emma de Sousa, with contributions from Julie Doughty, Paul Harris, Mark Henley, Nigel Mercer, Charles Nduka, Mary O’Brien, Caroline Payne and Ruth Waters, and was last updated in 2021. A printed copy of the guide is available from the BAPRAS secretariat, and a PDF is published alongside the online version.</p>' +
        '<p>This summary is educational. It does not replace the discussion you should have with your own surgeon, and it does not constitute medical advice or a recommendation of any procedure, surgeon or clinic.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'The four-part guide',
      heading: 'What the BAPRAS guide covers',
      lead: 'From the first consultation to the decisions that stay with you for decades.',
      cols: 3,
      items: [
        { icon: 'personalised', title: 'The decision', text: 'Who the guide is for, what breast augmentation can and cannot achieve, and why realistic expectations matter.' },
        { icon: 'clock', title: 'Consultation & cooling-off', text: 'How to seek a consultation, what happens at it, and why a cooling-off period of at least two weeks is required.' },
        { icon: 'surgical', title: 'Implant techniques', text: 'Incisions, placement behind the breast or muscle, dual plane, and how implant type, size, shape and texture are chosen.' },
        { icon: 'downtime', title: 'The operation', text: 'Anaesthetic, time in hospital, recovery week by week, and how scars typically evolve over the first year.' },
        { icon: 'safety', title: 'Complications', text: 'Reported frequencies for bleeding, infection, capsular contracture, sensation change and rupture — plus BIA-ALCL and breast implant illness.' },
        { icon: 'evidence', title: 'Long-term questions', text: 'Mammography with implants, alternatives such as lipofilling and uplift surgery, and the national implant registry.' }
      ]
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'What this page is — and is not',
      text:
        '<p>This is a condensed, section-by-section summary of BAPRAS patient information written for people considering breast enlargement in the United Kingdom. Figures such as complication frequencies are those published in the guide; UK practice, funding rules and professional registers differ between countries, so local standards still apply wherever a procedure is performed.</p>' +
        '<p>Nothing here is a personal assessment of suitability. That can only be done in a consultation with a qualified, registered surgeon who examines you.</p>'
    },

    {
      type: 'prose',
      html:
        '<h2 class="h2">What breast augmentation is</h2>' +
        '<p>Breast augmentation (bilateral breast augmentation or BBA) is an operation to enlarge the breasts, usually by inserting an implant beneath the breast to make it look larger. It can enlarge breasts that have always been small, and it can also fill out breasts that used to be larger — for example breasts that have emptied out after pregnancy. The procedure reshapes breasts to some extent and can be used to correct breasts that are of unequal size.</p>' +
        '<p>An alternative to enlargement with an implant is fat transfer, sometimes called lipomodelling, lipofilling or fat grafting: fat taken from elsewhere on the body is injected into the breast area. Fat transfer may be appropriate for a few people but is not suitable for all, often requires more than one episode of surgery, and can also be combined with an implant augmentation.</p>' +
        '<p>Patients who have breast augmentation tend to be pleased with the results, but the guide is explicit that expectations must be realistic. You need to understand what can and cannot be achieved, the limitations of surgery, and the long-term consequences of having breast implants.</p>'
    },
    {
      type: 'steps',
      eyebrow: 'Next steps',
      heading: 'Getting to a decision',
      lead: 'The BAPRAS guide sets out a deliberate, unhurried path from first enquiry to the operating table.',
      items: [
        { title: 'Find a surgeon', text: 'Your GP may be able to suggest surgeons locally, or you can approach a private hospital or clinic directly. If you do, make sure your initial consultation is with the surgeon who will actually do the operation. Your surgeon will normally seek permission to write to your GP afterwards.' },
        { title: 'Attend a full consultation', text: 'You will be asked what is bothering you about your breasts and what you expect from surgery, must share your full medical history, and will be examined with measurements taken. Discussion follows about implant shapes, possible sizes and the position of the pockets behind your existing breast tissue. A consultation fee is normal.' },
        { title: 'See the likely result', text: 'Some surgeons use implant sizers in a bra, others 3D photography. This is only a guide — the same implant can look very different in different people. You should be told about the operation, the expected outcome and the possible risks and complications.' },
        { title: 'Take the cooling-off period', text: 'You should be given a cooling-off period of at least two weeks before surgery and offered a second consultation. You should not feel rushed into surgery — if you are, walk away.' }
      ]
    },
    {
      type: 'notice',
      blush: true,
      icon: 'clock',
      title: 'Why there is a cooling-off period',
      text:
        '<p>Breast augmentation is a lifetime commitment and must not be considered a one-stop permanent solution. You need to be making the appropriate choice and understand all the implications of the surgery you are considering — including that you will need revision surgery as the years go by, and that you must be prepared personally and financially for this.</p>' +
        '<p>Nobody needs an urgent breast augmentation. If you are not offered a cooling-off period, or you are put under pressure to proceed, the guide’s advice is simple: walk away.</p>'
    },
    {
      type: 'table',
      eyebrow: 'Checks, costs and funding',
      heading: 'Before you commit',
      head: ['Topic', 'What the BAPRAS guide says'],
      rows: [
        ['<strong>Checking your surgeon</strong>', 'All surgeons should be listed with the General Medical Council (GMC). Check the register at <a href="https://www.gmc-uk.org/" rel="noopener">gmc-uk.org</a> using “Check a doctor’s registration status”. Under “Status” they should be listed as “Registered with a license to practise; this doctor is on the specialist register”. Surgeons may also be registered with the Association of Breast Surgery (ABS), BAAPS and/or BAPRAS — members of these organisations hold a standard set of recognised qualifications. It is perfectly reasonable to ask about a surgeon’s experience and qualifications.'],
        ['<strong>Internet searches</strong>', 'Information found through search engines may be promotional in nature; some surgeons and services pay for their listing. A prominent listing is a measure of marketing ability, not of service quality.'],
        ['<strong>Cost</strong>', 'An approximate cost should be obtainable from your local private hospital or the surgeon’s secretary before your consultation, and you should expect to pay a fee for the consultation itself. After your consultation(s), if you plan to go ahead, you should be given a written quote for the planned care.'],
        ['<strong>Deposits and inducements</strong>', 'Avoid any deal asking for a non-refundable deposit, and do not accept a financial inducement or time-limited deal — even offering to refund the consultation fee if you proceed with surgery is considered an inducement and is against GMC guidance.'],
        ['<strong>Package prices</strong>', 'It is appropriate to be offered a package covering the whole process and the cost of treating any complications arising in the initial weeks after surgery. You should be told exactly what the package includes. The cheapest deal may not be the best: cosmetic surgery is a significant financial commitment, and you will need to pay for further surgery in the future.'],
        ['<strong>NHS funding</strong>', 'Cosmetic breast augmentation is not available on the NHS, so you will normally consult and pay privately. Exceptional circumstances can include very uneven breasts (a significant difference in size), having no breasts, or treatment as part of a breast reconstruction care plan — your GP can explain the rules in your area.'],
        ['<strong>Surgery abroad</strong>', 'If you go abroad for breast augmentation, be aware that on return to the UK only emergency complications will be dealt with by the NHS.']
      ],
      note: 'Summarised from the BAPRAS patient guide. Cosmetic-surgery funding, regulation and professional registers differ between countries — verify the current position in your own jurisdiction.'
    },

    {
      type: 'prose',
      html:
        '<h2 class="h2">Implant techniques</h2>' +
        '<p>Breast enlargement involves placing an implant under the breast tissue to increase the size and shape of the breast. Implants are usually inserted through an incision under the breast at the crease, but they can also be placed through an incision in the armpit or around the nipple.</p>' +
        '<h3 class="h3">Behind the breast (sub-glandular)</h3>' +
        '<p>Placing the implant behind the breast, on top of the chest wall muscle, is considered the simplest of the available enlargement procedures and is less likely to cause significant discomfort. This route is also effective for patients with some drooping of the breasts.</p>' +
        '<h3 class="h3">Behind the muscle (sub-muscular)</h3>' +
        '<p>Placing the implant behind the breast muscle gives more padding or coverage for the implant. This can help slender patients and those with very little breast tissue, because it reduces the chances of being able to feel or see the implant under the breast tissue.</p>' +
        '<h3 class="h3">Dual plane augmentation</h3>' +
        '<p>Surgeons often combine the two routes, placing the implant partly behind the breast and partly behind the muscle, to try to give the benefits of both — this is called a dual plane augmentation. If implants are inserted behind the muscle they are likely to move when the muscle contracts; this is called animation and is normal. Your surgeon will advise which placement is appropriate for you.</p>'
    },
    {
      type: 'prose',
      html:
        '<h3 class="h3">What the operation involves</h3>' +
        '<p>Before and after photographs should be taken for your clinical record, to help you and your surgeon plan the operation and assess the result. Your face is not included and you will be asked for consent; if your surgeon wants to use the images for teaching or publication, they must ask for specific additional consent.</p>' +
        '<p>Breast enlargement surgery takes about one-and-a-half hours and is usually done under general anaesthetic. You may be able to go home the same day, but many patients spend one night in hospital. Postoperative pain should be well controlled: your chest may feel tight and your breasts and ribs may be tender. You will be mobile from day one and should be back to full exercise within six weeks, with one to two weeks off work recommended.</p>' +
        '<p>At first the breasts may look high and the skin tight; this tends to settle over the first six weeks, but the long-term result takes three to four months as a more natural shape emerges. Most patients are pleased with their surgery, though some find the new shape difficult to get used to. Scars are typically quite red for the first six weeks, change to purple over the next three months and then fade to white. Most patients form good-quality scars, but abnormal scarring can occur.</p>'
    },
    {
      type: 'table',
      alt: true,
      eyebrow: 'Implant techniques',
      heading: 'Choosing the implant',
      head: ['Decision', 'What the BAPRAS guide says'],
      rows: [
        ['<strong>Fill material</strong>', 'The outer shell of all implants is made of silicone, and some have an additional polyurethane coating. The shell is filled with either silicone gel or saline. Implants have been used since the 1960s and the evidence suggests they are safe. Most patients are offered silicone gel-filled implants — they tend to feel the most natural, come in a range of shapes and are durable. Saline implants feel less natural, folds or ripples may be more visible, and they carry a risk of deflation. All other filler materials have been withdrawn for use in the UK. Ask your surgeon exactly which type and manufacturer will be used, and why.'],
        ['<strong>Size</strong>', 'Implants are supplied by volume, and it is not possible to guarantee a cup size. Your surgeon assesses your chest wall, your existing breast tissue and how much skin is available, then indicates an appropriate range — your own view matters, because in most patients a range of sizes could be used. The larger the implant and the slimmer you are, the less natural the result; an implant out of proportion with your frame is more likely to cause complications such as drooping, stretching of the breast tissue and being more easily felt.'],
        ['<strong>Shape</strong>', 'Implants are round or teardrop (anatomical). Round implants give more volume at the top of the breast and are as wide as they are tall. With teardrop implants the width and height can be chosen separately, giving more control of the eventual shape. Both come in varying degrees of projection; your surgeon discusses the best shape for your frame and desired outcome.'],
        ['<strong>Texture</strong>', 'Surfaces are smooth or textured, in degrees from very fine to coarse; some implants have a foamy polyurethane coating. Texturing exists to reduce capsular contracture (evidence is strongest when the implant is placed in front of the muscle) and to reduce unwanted movement or rotation — so anatomical implants tend to be textured, while rotation of a round implant is not noticeable. A textured surface is linked to the uncommon BIA-ALCL; smooth implants currently have no such link. Smooth implants are almost always round, move within the breast and take several months to settle, and can slip sideways (lateral displacement) or drop below the crease (bottoming out). The choice is not straightforward — your surgeon should help decide.'],
        ['<strong>Silicone safety</strong>', 'Implants are made from medical-grade silicone. Small quantities of silicone can be taken up by the body and found in breast tissue and sometimes the armpit lymph glands; occasionally the body forms inflammation and extra tissue around silicone deposits (silicone granuloma). If the shell fails, the gel often keeps its shape and the appearance may not change — ruptures are frequently discovered by accident while investigating another breast problem, though they can cause lumpiness or a change in shape. A confirmed rupture is treated by removal of the implants, with replacement possible at the same or a later operation. There is no association between breast augmentation and breast cancer.']
      ],
      note: 'The three most important decisions are implant size, shape and placement. Summarised from the BAPRAS implant techniques guide.'
    },

    {
      type: 'prose',
      html:
        '<h2 class="h2">What complications can occur?</h2>' +
        '<p>All operations are associated with risks. Serious complications are uncommon with breast augmentation, occurring in less than 1 in 100 operations. The figures below are those published in the BAPRAS guide.</p>'
    },
    {
      type: 'table',
      eyebrow: 'Reported frequencies',
      heading: 'Risks and how often they occur',
      head: ['Complication', 'What the BAPRAS guide says'],
      rows: [
        ['<strong>Serious complications overall</strong>', 'Uncommon — less than 1 in 100 breast augmentation operations.'],
        ['<strong>Bleeding (haematoma)</strong>', 'Less than 1 in 100. Usually immediately after surgery, occasionally up to two weeks later. The breast becomes very swollen and tight and you return to theatre to have the blood removed and the bleeding stopped; the implant can be retained. Expect an extra night in hospital and more bruising than usual. Haematoma can increase the risk of later capsular contracture.'],
        ['<strong>Infection</strong>', 'Less than 1 in 1000. Usually apparent over the first two or three weeks: swelling, tenderness, redness, wound discharge and a raised temperature. Antibiotics sometimes settle a mild infection, but most established infections around the implant require removal — a new implant cannot be inserted immediately, and three to six months should pass before re-insertion. Your package price should cover treatment of bleeding or infection.'],
        ['<strong>Capsular contracture</strong>', 'The body forms a scar capsule around every implant; when it contracts the breast feels firmer, and may become round or tender. Noticeable firmness occurs in up to 1 in 10 of all breast augmentations, but most of those patients do not need revision surgery. Options include living with it (safe), releasing the capsule (capsulotomy) or removing it (capsulectomy) with a new implant — but scar tissue can return in at least half of people having secondary surgery. Capsular contracture is the most common reason for re-operation, and once it has happened it is likely to recur in 1 in 2 cases.'],
        ['<strong>Re-operation for any reason</strong>', 'About 1% (1 in 100) per year — so after 10 years, about 10 in every 100 women will have had more surgery.'],
        ['<strong>Changes in sensation</strong>', 'Some alteration of sensation is usual, most often numbness and oversensitivity of the nipples. Oversensitivity gradually settles, usually over several months. Around 1 in 5 patients have a reduction in nipple sensation; recovery can take up to 12 months, and 1 in 10 patients have some permanent numbness.'],
        ['<strong>Feeling or seeing the implant</strong>', 'It is common to feel the implant, especially in slim patients or those with little breast tissue; this is an inevitable consequence of the operation and does not improve with time. Ripples or folds may become visible leaning forwards. Small amounts of your own fat can be injected (lipomodelling) to improve the situation in some patients. A marked crease can be a sign of capsular contracture.'],
        ['<strong>Implant failure (rupture)</strong>', 'The shell can eventually fail. The American Core study (FDA update, 2011) found 1 in 10 implants had ruptured at 10 years, and it is estimated half of all breast implants may rupture by 15 years. Rupture is often contained within the body’s own capsule (silent rupture) and does not appear harmful; some patients notice a change in size, shape or consistency, a lump or swelling. A scan is usually performed and, if rupture is suggested, removal and exchange is advised. There is no universally agreed replacement schedule, and exchange before ten years is unusual — if you have noticed no change, no regular follow-up or scans are needed.'],
        ['<strong>Asymmetry</strong>', 'Some asymmetry between breasts is normal and perfect symmetry is not an achievable goal; asymmetry may appear more pronounced after surgery. A larger implant in the smaller breast improves the volume difference only, not other differences such as nipple position. Implants can also settle differently in their pockets.'],
        ['<strong>Wide cleavage</strong>', 'Implants are positioned centrally behind the nipples and will not improve a naturally wide cleavage — with sub-muscular placement the cleavage can even appear wider. Breasts and implants falling to the sides when you lie down is normal.'],
        ['<strong>Stretch marks and veins</strong>', 'Stretch marks may develop after surgery, especially with larger implants, and veins may become more noticeable on the breast surface.'],
        ['<strong>Ptosis (sagging)</strong>', 'Breasts will sag with time because augmented breasts are larger and heavier — the larger the implant, the more the breast will droop. They may also “bottom out”, meaning the implant sits lower, below the nipple rather than above it.'],
        ['<strong>Pregnancy and breastfeeding</strong>', 'Implants do not interfere with the ability to breastfeed. There is some evidence that the amount of milk produced by some women with implants is reduced, and no evidence of increased illness in children of women with silicone gel implants. Pregnancy and breastfeeding may adversely affect the shape of the breast.'],
        ['<strong>Other reasons for re-operation</strong>', 'Some patients choose re-augmentation with larger implants as time goes by; augmented breasts change shape with time, pregnancy and weight fluctuation; teardrop-shaped implants can rotate behind the breast (usually rotating back by themselves or being gently pushed back, but repeated rotation needs re-operation, especially with large implants correcting droop); and intermittent swelling around an implant may lead to scans, further tests or implant replacement.'],
        ['<strong>Who pays for future treatment</strong>', 'Many of these long-term problems will not be covered by the package bought at the time of surgery, and you should not expect the NHS to provide future treatment. You must be prepared to pay for consultations, scans and further surgery if needed.']
      ],
      note: 'Frequency figures are those published in the BAPRAS patient guide (updated 2021) and describe breast augmentation generally; individual risk depends on your anatomy, the technique used and your health.'
    },
    {
      type: 'prose',
      html:
        '<h3 class="h3">Breast Implant Associated Anaplastic Large Cell Lymphoma (BIA-ALCL)</h3>' +
        '<p>Since 2016, anaplastic large cell lymphoma in association with breast implants has been recognised by the World Health Organization. The risk is small. It is not a breast cancer but a type of cancer associated with the scar tissue (capsule) the body lays down around an implant. Cases have occurred between 2 and 28 years after implant insertion, with an average of 8 years, and it most likely presents as swelling around the implant (a seroma) causing an increase in breast size. It can usually be treated successfully by removing the implant and the surrounding capsule.</p>' +
        '<p>Because it is uncommon, international organisations share data on the condition. Most cases worldwide have occurred in women with textured breast implants, with higher numbers where the texture is coarser — so ask your surgeon for the most up-to-date recommendations. Breast implants continue to hold safety approval from government organisations such as the UK MHRA and the USA FDA and remain used in breast reconstruction after cancer worldwide.</p>' +
        '<h3 class="h3">Breast Implant Illness (BII)</h3>' +
        '<p>Breast Implant Illness is a term used by some patients who experience symptoms they feel are connected to their silicone implants — tiredness, “brain fog”, joint aches, immune-related symptoms, sleep disturbance, depression, hormonal issues, headaches, hair loss, chills, rash and neurological issues. BII is not a medical diagnosis, there is no proven association with breast implants, and there is currently no scientific evidence confirming the proposed link or any diagnostic test for the condition; research continues. Some patients report improvement after implant removal, but not all do. The UK government guidance on BII symptoms and the FDA’s breast-implant risk pages are referenced in the guide.</p>'
    },

    {
      type: 'prose',
      html:
        '<h2 class="h2">Long-term consequences and alternatives</h2>' +
        '<h3 class="h3">Mammography and screening</h3>' +
        '<p>Implants push your natural breasts forward and do not make it harder to examine your breasts for lumps, but they do interfere with mammography: X-rays cannot pass through the implant, so some breast tissue is obscured. UK breast screening starts at age 50. If you are called for a screening mammogram you must tell the service you have implants — they may scan you at a different centre and take special views. The more of your total breast volume that is implant, the greater the problem, so a breast augmentation reduces the sensitivity of a future mammogram. Some patients pay privately for MRI screening instead to avoid these issues.</p>' +
        '<h3 class="h3">Myths and routine replacement</h3>' +
        '<p>It is not unsafe to sunbathe or to fly in an aeroplane with implants — neither presents a problem. There is no need to massage breast implants, and this is not recommended with modern textured-surface implants. Routine replacement after a specified time is not recommended: replacement is advised only if you are unhappy with the appearance or have developed a problem.</p>' +
        '<h3 class="h3">Alternatives: lipofilling and breast uplift</h3>' +
        '<p>The only alternative surgical technique to enlarge the breast is lipofilling (fat transfer): fat is removed by liposuction from the hips, thighs or tummy and injected into the breast area. Only a relatively small amount can be injected, so multiple operations are usually needed for a worthwhile effect; some fat is absorbed in the first weeks, but fat lasting beyond that brings permanent enlargement. It is more gradual than implant surgery and avoids an implant, but the surgeon cannot be sure how effective it will be and results are variable. <strong>Your own fat is the only substance that can be safely injected into the breast</strong> — other materials have been tried and withdrawn. Do not allow anyone to inject anything other than your own fat.</p>' +
        '<p>If you are bothered by droopiness but happy with your breast size, you do not need an augmentation — you may be offered a breast uplift (mastopexy), which lifts the nipple and breast tissue and tightens the skin, with incisions around the areola and possibly vertically and under the breast. Scarring is more obvious than with augmentation alone and no implant is used, but uplifted breasts tend to droop again with time and gravity, and often seem smaller afterwards despite little or no tissue removal. Mild droopiness can be improved by augmentation alone; where both volume loss and droopiness are a problem, augmentation and mastopexy may be discussed as one operation or in two stages — usually best done one at a time, though sometimes performed together after careful planning and counselling, with results that are not always entirely predictable in size and shape.</p>' +
        '<h3 class="h3">Breast Implant Registry</h3>' +
        '<p>In the UK there is a national Breast and Cosmetic Implant Registry, administered by NHS Digital, recording every implant placed or removed with patient details, the organisation and the surgeon. Its main aim is to trace and inform affected patients if a failed implant is ever recalled, and to identify possible trends and complications relating to specific implants. Entry requires your consent, and you are strongly recommended to agree to the register if you have implant-based surgery — for your own protection and that of others.</p>'
    },

    {
      type: 'faq',
      alt: true,
      id: 'bapras',
      eyebrow: 'Quick answers',
      heading: 'Questions the BAPRAS guide answers',
      items: [
        { q: 'Can my surgeon guarantee a cup size?', a: '<p>No. Implants are supplied by volume and it is not possible to guarantee a cup size. Your surgeon assesses your chest wall, existing breast tissue and available skin, then indicates an appropriate range of sizes — in most patients a range could be used, and your own preference decides where in that range to sit.</p>' },
        { q: 'Do breast implants have to be replaced after a set number of years?', a: '<p>No. There is no universally agreed replacement schedule, and exchange before ten years is unusual. If you have noticed no change you do not need regular follow-up or scans. You should still be prepared — personally and financially — for further surgery at some point, since about 1% of patients have a re-operation each year.</p>' },
        { q: 'Is breast enlargement available on the NHS?', a: '<p>Cosmetically, no — you would consult and pay as a private patient. Exceptions include very uneven breasts, having no breasts, or treatment within a reconstruction care plan. If you have surgery abroad, only emergency complications will be treated by the NHS on your return.</p>' },
        { q: 'What exactly is the cooling-off period?', a: '<p>At least two weeks between your decision and surgery, plus an offer of a second consultation beforehand. Nobody needs an urgent breast augmentation: if you are pressured to proceed or offered no cooling-off period, walk away.</p>' },
        { q: 'Are silicone implants safe?', a: '<p>Implants are made from medical-grade silicone and have been used since the 1960s; the evidence suggests they are safe, and there is no association between breast augmentation and breast cancer. Rupture remains possible (about 1 in 10 at 10 years) and is usually treated by removal and exchange. Rare risks such as BIA-ALCL, and the symptoms described as breast implant illness, are covered above.</p>' },
        { q: 'What is the alternative to an implant?', a: '<p>Lipofilling — transferring your own fat by liposuction and injection. It avoids an implant but usually needs several operations for a worthwhile effect, gives a gradual result and is variable. Your own fat is the only substance that should ever be injected into the breast.</p>' }
      ]
    },

    {
      type: 'notice',
      blush: true,
      icon: 'evidence',
      title: 'Source and copyright',
      text:
        '<p>Summarised from the four-part BAPRAS patient guide to breast augmentation (updated 2021), edited by Lee Martin and Emma de Sousa. All original content remains the property of BAPRAS; this page is a condensed educational summary with links to the originals:</p>' +
        '<ul>' +
        '<li><a href="' + P_GUIDE + '" rel="noopener">Breast augmentation — introduction</a></li>' +
        '<li><a href="' + P_TECHNIQUES + '" rel="noopener">Implant techniques</a></li>' +
        '<li><a href="' + P_COMPLICATIONS + '" rel="noopener">What complications can occur?</a></li>' +
        '<li><a href="' + P_OTHER + '" rel="noopener">Other information</a></li>' +
        '</ul>' +
        '<p>BAPRAS is a UK professional association, so the guide describes UK practice and regulation. For published research, see the <a href="/research/breast-enlargement/">PMC research library</a>; for regulator guidance, the <a href="/research/fda-breast-enlargement/">FDA</a> and <a href="/research/nhs-breast-enlargement/">NHS</a> libraries; for our own treatment pages, <a href="/surgical/breast-augmentation/">breast augmentation</a> and <a href="/surgical/silicone-breast-implants/">silicone implants</a>.</p>'
    },
    stdCta({ heading: 'Take the guide’s questions into a consultation' })
  ]
};

module.exports = { baprasPage };
