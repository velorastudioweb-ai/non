'use strict';

/*
 * Surgical sub-pages, batch 1: augmentation, implants and implant safety.
 *
 * Fifteen supporting pages for the three established surgical guides. They are
 * deliberately narrower than the parent pages and avoid repeating the earlier
 * implant-choice pages (silicone vs saline, shape, size, placement, longevity,
 * contracture, BIA-ALCL, mammograms and pregnancy).
 *
 * Editorial status: draft for clinician review. Regulatory statements are kept
 * general and must be checked against current Indian device rules before use.
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
  /* ==========================================================================
     Breast augmentation
     ========================================================================== */
  page({
    url: '/surgical/breast-augmentation-candidacy/',
    slug: 'breast-augmentation-candidacy',
    section: 'surgical',
    group: 'augmentation',
    h1: 'Who Is a Good Candidate for Breast Augmentation?',
    cardTitle: 'Augmentation candidacy',
    seoTitle: 'Who Is a Good Candidate for Breast Augmentation? | Quantum Health',
    seoDescription: 'Understand who may be suitable for breast augmentation, who may need to wait, and the health and expectation factors a surgeon assesses.',
    bannerLead: 'Suitability is about health, anatomy and motivation as much as size. A good consultation includes an honest discussion of when surgery is not the right step.',
    imageKey: 'breastAugmentation',
    related: [
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'The parent guide to planning, surgery and recovery.'],
      ['/breast-augmentation-consultation-checklist/', 'Consultation checklist', 'Questions and information to prepare before you decide.'],
      ['/surgical/breast-lift-vs-augmentation/', 'Lift vs augmentation', 'When sagging, rather than volume, is the main concern.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Breast augmentation is elective surgery, so suitability depends on your health, anatomy and reasons for wanting it. Only a qualified surgeon can assess this in person, but the points below explain what is usually considered.</p>' +
          '<h2>Factors that often support candidacy</h2>' +
          '<ul><li>You are an adult in good general health.</li><li>Your breasts have finished developing, or you are unhappy with volume after pregnancy, weight loss or natural change.</li><li>You want the change for yourself, not mainly to please someone else.</li><li>Your expectations are realistic and you understand the risks.</li><li>You accept that further surgery may be needed at some point.</li></ul>' +
          '<h2>What the surgeon examines</h2>' +
          '<ul><li>Breast width, volume, shape and skin elasticity.</li><li>Nipple position and the level of the breast fold.</li><li>Chest-wall shape and any asymmetry.</li><li>The thickness of soft tissue available to cover an implant.</li><li>Whether sagging suggests a breast lift may be needed instead of, or as well as, augmentation.</li></ul>' +
          '<h2>When surgery may need to wait or may not suit</h2>' +
          '<ul><li>Pregnancy or breastfeeding.</li><li>An active infection, or an unexplained breast lump that has not been assessed.</li><li>Poorly controlled medical conditions, including bleeding disorders.</li><li>Smoking or nicotine use, which can slow healing.</li><li>Plans for pregnancy in the near future, which some surgeons advise waiting for.</li><li>Significant distress about appearance that seems out of proportion to what others see; a good surgeon may suggest speaking to a mental health professional first.</li><li>Expectations that surgery cannot meet.</li></ul>' +
          '<h2>Age, consent and expectations</h2>' +
          '<p>Implant labelling includes minimum ages in some countries, and surgeons are generally cautious about operating before breast development is complete. There is no single upper age limit; general health and tissue quality matter more. A useful consultation should tell you not only whether you are suitable, but which approach is suitable and why.</p>' +
          '<h2>What surgery can and cannot change</h2>' +
          '<p>Augmentation can add volume and alter upper-breast fullness. It cannot change your height, waist, skin quality or the underlying shape of your chest wall, and it will not make your breasts symmetrical if the asymmetry comes from the ribcage or the position of the fold. A lift is better for sagging; reduction removes tissue. Understanding these limits before surgery is more useful than comparing cup sizes.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Am I a suitable candidate, and for which approach?</li><li>What would make me unsuitable?</li><li>Would waiting, a lift or another option be better for me?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'A good consultation includes being told when surgery is not the right step. That is part of careful assessment, not a reason to feel rejected. Read the <a href="/surgical/breast-augmentation/">breast augmentation guide</a> for the wider picture.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-augmentation-procedure/',
    slug: 'breast-augmentation-procedure',
    section: 'surgical',
    group: 'augmentation',
    h1: 'Breast Augmentation Step by Step: Before, During and After',
    cardTitle: 'The procedure step by step',
    seoTitle: 'Breast Augmentation Step by Step: Before, During and After | Quantum Health',
    seoDescription: 'A plain-language walkthrough of breast augmentation, from the consultation and anaesthesia to the operation, recovery and follow-up.',
    bannerLead: 'Knowing the stages helps you ask better questions. Details vary by surgeon and facility, and your own team’s instructions come first.',
    imageKey: 'breastAugmentation',
    related: [
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'The parent guide to benefits, risks and recovery.'],
      ['/surgical/preparing-for-breast-augmentation/', 'Preparing for surgery', 'Practical checks, medicines and home arrangements.'],
      ['/surgical/breast-augmentation-results/', 'Results over time', 'How swelling, settling and long-term change affect the look.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Breast augmentation is a planned operation with several stages. Understanding them can reduce uncertainty and help you compare what different clinics offer.</p>' +
          '<h2>1. Consultation and planning</h2>' +
          '<p>You discuss your goals, health history and options, and the surgeon measures and examines you. You should receive written information and time to decide. A second consultation is reasonable if you are unsure.</p>' +
          '<h2>2. Pre-operative assessment</h2>' +
          '<p>This may include a medical review and blood tests, plus instructions about medicines and fasting. Any breast lump or abnormal screening result should be assessed before surgery. See <a href="/surgical/preparing-for-breast-augmentation/">preparing for breast augmentation</a>.</p>' +
          '<h2>3. Anaesthesia</h2>' +
          '<p>Most augmentations are performed under general anaesthesia, given by a qualified anaesthetist. Ask who will monitor you throughout and what emergency equipment and arrangements are available.</p>' +
          '<h2>4. The operation</h2>' +
          '<p>The surgeon makes an incision, creates a pocket for the implant, places the implant and closes the wound. Operation time commonly ranges from about one to two hours, but varies with the plan and whether other procedures are combined. Drains are used in some cases.</p>' +
          '<h2>5. Immediate recovery</h2>' +
          '<p>You wake in a recovery area, usually with dressings and a supportive garment. Many people go home the same day or after one night, depending on the facility and how they recover.</p>' +
          '<h2>6. First days and weeks</h2>' +
          '<p>Expect soreness, swelling, bruising and tightness. Follow instructions on medicines, rest, wound care and lifting restrictions. Contact the team early if pain, swelling or redness worsens rather than waiting for a routine review.</p>' +
          '<h2>What can vary between clinics</h2>' +
          '<p>Not every augmentation follows the same pathway. The facility, anaesthetic team, implant choice, use of drains, garment, follow-up schedule and arrangements for complications can all differ. Ask who performs the operation, who provides anaesthesia, what is included in the quoted cost, and what happens if you need unplanned care. A lower price may exclude follow-up or revision. These details matter more than a hotel-style brochure.</p>' +
          '<h2>7. Follow-up and long-term care</h2>' +
          '<p>Check-ups monitor healing and implant position. Ask how many are included, how to reach the team out of hours, and what monitoring is advised for your implant type. Keep your implant card and report any new change in shape, size or comfort.</p>'
      },
      {
        type: 'notice',
        icon: 'clock',
        title: 'Key takeaway',
        text: 'The operation is only one part of the process. Planning, consent and aftercare matter as much, and a clear route for urgent questions is part of safe care.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-augmentation-incisions/',
    slug: 'breast-augmentation-incisions',
    section: 'surgical',
    group: 'augmentation',
    h1: 'Incision Options for Breast Augmentation and Their Trade-Offs',
    cardTitle: 'Incision options',
    seoTitle: 'Breast Augmentation Incision Options and Trade-Offs | Quantum Health',
    seoDescription: 'Compare inframammary, periareolar and armpit incisions for breast augmentation, including scarring, visibility and practical considerations.',
    bannerLead: 'Where the incision goes affects scar position, access for the surgeon and some recovery factors. No single option suits everyone.',
    imageKey: 'breastAugmentation',
    related: [
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'The parent guide to planning and recovery.'],
      ['/surgical/breast-sensation-changes/', 'Sensation changes', 'Why nerve symptoms can occur and when to seek advice.'],
      ['/surgical/breast-revision/', 'Breast revision', 'How a previous incision can affect later surgery.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">The incision is a surgical access route, not a cosmetic add-on. The right choice depends on your anatomy, the implant, your surgeon’s experience and what matters most to you.</p>'
      },
      {
        type: 'table',
        eyebrow: 'Incision routes',
        heading: 'Where the scar sits and what it means',
        head: ['Route', 'Position', 'Trade-offs'],
        rows: [
          ['<strong>Inframammary</strong>', 'In the fold beneath the breast', 'Direct access and widely used. The scar is usually hidden in the fold, though it can be visible when lying down or if the fold position changes.'],
          ['<strong>Periareolar</strong>', 'Around the lower edge of the areola', 'Scars can blend well where skin colour changes. Some evidence links this route to more nipple-sensation changes, and larger implants can be harder to place through a small opening.'],
          ['<strong>Transaxillary</strong>', 'In the armpit', 'No scar on the breast, but access to the pocket is more limited and a camera may be used. Placement can be harder to control and revision through the same route can be difficult.']
        ],
        note: 'A cut through the navel (transumbilical) has been used with saline implants but is less common and offers less control. Ask about your surgeon’s experience with any technique.'
      },
      {
        type: 'prose',
        html:
          '<h2>How to compare the options</h2>' +
          '<p>Ask your surgeon to explain what each route would mean for your implant size, your tissue and any future revision. A scar in a less visible place is not automatically the safer choice if it limits access or makes the pocket harder to control. Write down the trade-offs in your own words, and take the plan home before deciding.</p>' +
          '<h2>Other factors in choosing</h2>' +
          '<ul><li>Implant type, surface and size.</li><li>Your skin quality and how you tend to scar.</li><li>Whether you plan to breastfeed.</li><li>Your surgeon’s training and usual practice.</li><li>The possible need for future revision.</li></ul>' +
          '<h2>Scarring</h2>' +
          '<p>Scars fade over many months but never disappear. People vary widely in how they scar. Follow aftercare advice, avoid sun exposure on healing scars, and report a scar that becomes raised, painful or keeps growing. Massage, silicone gel sheets and other scar treatments are sometimes advised, but evidence for them is limited. Ask before using anything on a healing wound.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Which incision do you recommend for me, and why?</li><li>Where exactly will the scar be, and how long will it be?</li><li>How would this affect revision later?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Choose the incision on safety and suitability first, scar position second. See the <a href="/surgical/breast-augmentation/">breast augmentation guide</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/preparing-for-breast-augmentation/',
    slug: 'preparing-for-breast-augmentation',
    section: 'surgical',
    group: 'augmentation',
    h1: 'Preparing for Breast Augmentation: A Practical Checklist',
    cardTitle: 'Preparing for surgery',
    seoTitle: 'Preparing for Breast Augmentation: A Practical Checklist | Quantum Health',
    seoDescription: 'How to prepare for breast augmentation, covering medical checks, medicines, smoking, home preparation and what to arrange for recovery.',
    bannerLead: 'Good preparation can reduce stress and may help recovery. Always follow your surgeon’s own instructions where they differ from this general guide.',
    imageKey: 'surgicalConsultationPreparation',
    related: [
      ['/surgical/breast-augmentation-procedure/', 'The procedure step by step', 'What happens from anaesthesia to follow-up.'],
      ['/breast-augmentation-consultation-checklist/', 'Consultation checklist', 'Questions to ask before committing to surgery.'],
      ['/surgical/breast-surgery-warning-signs/', 'Urgent warning signs', 'Symptoms that need prompt medical assessment.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Preparation is not only about the day of surgery. It covers your health, medicines, home setup and the support you will need while you recover.</p>' +
          '<h2>Health checks</h2>' +
          '<ul><li>A full medical-history review and any tests your surgeon requests.</li><li>Breast screening or imaging if advised for your age and risk.</li><li>Management of conditions such as high blood pressure or diabetes.</li><li>Assessment of any breast lump or unusual change before surgery.</li></ul>' +
          '<h2>Medicines and supplements</h2>' +
          '<p>Tell your team about everything you take, including over-the-counter products and herbal supplements. Some medicines, such as blood thinners and anti-inflammatories, and some supplements can increase bleeding risk, and you may be asked to stop them before surgery. Do not stop prescribed medicines without advice.</p>' +
          '<h2>Smoking and nicotine</h2>' +
          '<p>Smoking and nicotine products reduce blood flow and can slow healing and increase wound complications. Surgeons often ask you to stop for several weeks before and after surgery. Ask for support if you need it.</p>' +
          '<h2>Fasting and the day before</h2>' +
          '<p>You will be told when to stop eating and drinking before anaesthesia. Follow this exactly. If you become unwell, contact the facility before travelling.</p>' +
          '<h2>Practical arrangements</h2>' +
          '<ul><li>A responsible adult to take you home and stay with you for the first day or two.</li><li>Time off work, based on your surgeon’s advice and the demands of your job.</li><li>Front-opening tops and loose clothing.</li><li>Prescribed medicines collected in advance.</li><li>Extra pillows so you can rest comfortably.</li><li>Help with childcare, lifting and housework.</li><li>Your surgeon’s emergency contact saved in your phone.</li></ul>' +
          '<h2>The week before surgery</h2>' +
          '<p>Confirm your admission time, fasting instructions and transport. Check that your medicines and aftercare supplies are ready, and tell your employer what you have arranged. Avoid starting new supplements or treatments in the days before surgery, and do not shave or apply products to the chest unless your team advises it.</p>' +
          '<h2>When to reschedule</h2>' +
          '<p>Contact the facility if you develop a fever, a chest infection, a skin infection or any illness that could affect anaesthesia. It is safer to postpone than to proceed while unwell.</p>' +
          '<h2>Mental preparation</h2>' +
          '<p>It is normal to feel nervous. Swelling means your breasts will not look final in the first weeks, so plan for patience and avoid judging the result too early.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Which medicines should I stop, and when?</li><li>What should I bring on the day?</li><li>Who do I call if I have a problem at night?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Follow instructions carefully and arrange support at home before you go in. See the <a href="/breast-augmentation-consultation-checklist/">consultation checklist</a> for the questions to settle first.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-augmentation-results/',
    slug: 'breast-augmentation-results',
    section: 'surgical',
    group: 'augmentation',
    h1: 'Breast Augmentation Results Over Time: Year One and Beyond',
    cardTitle: 'Results over time',
    seoTitle: 'Breast Augmentation Results Over Time: Year One and Beyond | Quantum Health',
    seoDescription: 'How breast augmentation results change from the first weeks to years later, including swelling, settling, ageing and weight change.',
    bannerLead: 'Augmentation is not a one-off event with a fixed result. Swelling, healing, ageing and body change all affect how the breasts look.',
    imageKey: 'breastAugmentation',
    related: [
      ['/surgical/implant-longevity/', 'How long implants last', 'Replacement, revision and long-term monitoring.'],
      ['/surgical/breast-augmentation/', 'Breast augmentation', 'The parent guide to planning and recovery.'],
      ['/surgical/breast-revision/', 'Breast revision', 'Exchange, removal and repair when a result changes.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">The result you see in the first weeks is not the final result. Breasts and implants continue to change with healing, ageing and changes in body weight.</p>' +
          '<h2>First weeks</h2>' +
          '<p>Swelling and bruising are common. Implants may sit high and feel tight, and muscle tightness can limit movement at first. Early photographs are not a reliable guide to the final look.</p>' +
          '<h2>Three to six months</h2>' +
          '<p>Swelling reduces and implants usually drop and settle into position. Scars are still maturing and may look red or raised before fading. Many surgeons reassess around this time.</p>' +
          '<h2>One year</h2>' +
          '<p>Most people see the closest picture of their settled result around a year after surgery, although change continues. If you are unhappy, wait until the result has stabilised before discussing revision.</p>' +
          '<h2>Judging the result</h2>' +
          '<p>Compare like with like: use the same lighting, posture and camera angle, and avoid judging in the first three months. Ask your surgeon what changes are expected at each review. A result that looks slightly uneven while healing may settle, but a change that appears after months of stability deserves assessment. Photographs can show proportions but not how the breasts feel, move or age.</p>' +
          '<h2>When to discuss revision</h2>' +
          '<p>Revision is easier to plan once the tissues have settled. Bring specific concerns, such as width, upper fullness or nipple position, rather than a single photograph of someone else.</p>' +
          '<h2>Long term</h2>' +
          '<p>Breasts and implants continue to change with:</p>' +
          '<ul><li>Ageing and gravity, which affect skin and tissue even with implants.</li><li>Weight gain or loss, which changes the soft tissue around the implant.</li><li>Pregnancy and breastfeeding.</li><li>Hormonal changes such as menopause.</li><li>Time, since implants may shift, wear or need replacement.</li></ul>' +
          '<p>Possible later changes include visible rippling, altered firmness, displacement and a wish for a different size. Some people need further surgery, such as a lift or revision. See <a href="/surgical/implant-longevity/">how long implants last</a>.</p>' +
          '<h2>Looking after the result</h2>' +
          '<ul><li>Attend follow-up visits and any recommended imaging.</li><li>Wear supportive bras as advised.</li><li>Maintain a stable weight where possible.</li><li>Protect scars from sun.</li><li>Report any new change promptly.</li></ul>'
      },
      {
        type: 'notice',
        icon: 'clock',
        title: 'Key takeaway',
        text: 'Think of augmentation as the beginning of a long-term relationship with your implants and your breast health, not a single finished result. See the <a href="/surgical/breast-augmentation/">breast augmentation guide</a>.'
      }
    ]
  }),

  /* ==========================================================================
     Breast implants
     ========================================================================== */
  page({
    url: '/surgical/how-breast-implants-are-made/',
    slug: 'how-breast-implants-are-made',
    section: 'surgical',
    group: 'implants',
    h1: 'How Breast Implants Are Made and Regulated',
    cardTitle: 'How implants are made',
    seoTitle: 'How Breast Implants Are Made and Regulated | Quantum Health',
    seoDescription: 'What breast implants are made of, how they are regulated as medical devices, and why knowing the manufacturer and model matters.',
    bannerLead: 'Breast implants are medical devices, not cosmetic products. Understanding how they are made and overseen helps you ask the right questions.',
    imageKey: 'breastImplants',
    related: [
      ['/breast-implants/', 'Breast implants', 'Types, surfaces, placement and long-term reality.'],
      ['/surgical/implant-records-warranties/', 'Implant records and warranties', 'Cards, registries, recalls and what cover usually means.'],
      ['/breast-implant-safety/', 'Breast implant safety', 'Rupture, contracture, ALCL and monitoring.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">A breast implant is a regulated medical device. Knowing what it is made of, who made it and where it is approved is part of informed consent.</p>' +
          '<h2>Structure</h2>' +
          '<p>An implant has an outer shell and a filling.</p>' +
          '<ul><li><strong>Shell:</strong> a layered silicone elastomer, which may have a smooth or textured surface.</li><li><strong>Filling:</strong> sterile saline or cohesive silicone gel.</li><li><strong>Features:</strong> some have a valve, a barrier layer intended to limit gel bleed, or a defined anatomical shape.</li></ul>' +
          '<h2>Manufacturing and quality</h2>' +
          '<p>Reputable manufacturers produce implants under quality-management systems, test shell strength and gel properties, and track each implant by a batch or lot number. That traceability is what makes a recall or warranty claim possible.</p>' +
          '<h2>What “cohesive” means</h2>' +
          '<p>Cohesive gel is designed to hold together rather than flow like liquid. It can still leak if the shell fails, and it is not the same as injectable silicone. The term describes the filling’s behaviour, not a guarantee that rupture will always be obvious.</p>' +
          '<h2>Regulation</h2>' +
          '<p>Regulators decide whether a device may be sold and what evidence is required. In the United States, the FDA reviews breast implants through a premarket approval process. In Europe, devices carry a CE mark under medical-device regulations. In India, medical devices are governed by the Medical Devices Rules and overseen by the Central Drugs Standard Control Organisation (CDSCO); CDSCO classification material lists breast implants as Class C. Check the current classification and licensing status for the exact product with CDSCO before publication or surgery. Approval in one country does not guarantee the same status elsewhere.</p>' +
          '<p>Approval is a minimum standard, not a promise of perfect performance. It reflects the evidence available at the time and comes with conditions for monitoring and reporting.</p>' +
          '<h2>Why the manufacturer matters</h2>' +
          '<ul><li>Track record and published long-term safety data.</li><li>Whether the model has been recalled or restricted.</li><li>Warranty and support terms.</li><li>Traceability if a problem occurs.</li></ul>' +
          '<h2>Warning signs</h2>' +
          '<p>Be cautious if the clinic cannot name the manufacturer and model, cannot show approvals, offers unbranded or “imported” implants without documentation, or will not give you an implant card.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Who manufactures the implant, and what is the exact model?</li><li>Where is it approved, and can I see the documentation?</li><li>What long-term data exist for this model?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'evidence',
        title: 'Key takeaway',
        text: 'The implant is a regulated device. You are entitled to know exactly what is placed in your body, who made it and how it is traced. See <a href="/breast-implants/">breast implants</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/implant-profile-width-volume/',
    slug: 'implant-profile-width-volume',
    section: 'surgical',
    group: 'implants',
    h1: 'Implant Profile, Width and Volume Explained',
    cardTitle: 'Profile, width and volume',
    seoTitle: 'Breast Implant Profile, Width and Volume Explained | Quantum Health',
    seoDescription: 'How implant profile, base width and volume work together to determine how a breast implant looks, and why volume alone is a poor guide.',
    bannerLead: 'Two implants with the same volume can look very different. Surgeons use several measurements to choose an implant that suits your body.',
    imageKey: 'breastImplants',
    related: [
      ['/surgical/implant-size/', 'Choosing implant size', 'Why cup size is unreliable and how volume is assessed.'],
      ['/breast-implants/', 'Breast implants', 'The wider guide to implant choices.'],
      ['/surgical/implant-placement/', 'Implant placement', 'How the pocket and muscle affect the final look.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Implant size is not just a number of cubic centimetres. Width, projection and volume interact, and the right balance depends on your chest and soft tissue.</p>' +
          '<h2>Volume</h2>' +
          '<p>Volume is measured in cubic centimetres (cc). It describes how much the implant holds, not how large it will look on you. The same volume can look modest on a wider chest and fuller on a narrower one.</p>' +
          '<h2>Base width</h2>' +
          '<p>Base width is the measurement across the bottom of the implant. It should fit the width of your breast so that the implant does not extend past the natural base or leave tissue uncovered. A base that is too wide may cause problems at the sides of the breast or under the arm.</p>' +
          '<h2>Profile or projection</h2>' +
          '<p>Profile describes how far the implant projects forward. Manufacturers use terms such as low, moderate, moderate-plus and high, but these names differ between brands and are not standard.</p>' +
          '<ul><li>Lower projection gives a broader, more gradual look.</li><li>Higher projection gives a fuller, more forward look on a narrower base.</li></ul>' +
          '<h2>How they interact</h2>' +
          '<p>For a given volume, a higher-profile implant has a narrower base. For a given base, a higher volume usually means more projection. A wide implant on a narrow chest can create problems, high-projection implants may look more obviously augmented in some people, and overly large dimensions raise the chance of stretching, thinning and later surgery.</p>' +
          '<h2>Reading the surgical plan</h2>' +
          '<p>A written plan should state the implant volume, base width, profile, surface, shape and placement, and explain why those choices suit your measurements. If two plans give the same volume but different widths, the look and the risks are not the same. Ask which measurement drove the decision.</p>' +
          '<h2>Why cup size is a poor guide</h2>' +
          '<p>Cup size depends on band size and manufacturer, so it cannot describe an implant. A 300 cc implant may produce different cup sizes on two people. Use cup size to describe your goal, then let measurements guide the choice.</p>' +
          '<h2>Tools and questions</h2>' +
          '<p>Surgeons measure the breast base, assess tissue pinch and may use sizers. Treat computer simulations as a rough indicator only.</p>' +
          '<ul><li>What base width and profile do you recommend for me?</li><li>How will this look compared with other options?</li><li>What are the trade-offs?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Ask about width and projection, not just cc or cup size. See <a href="/surgical/implant-size/">choosing implant size</a> and the <a href="/breast-implants/">breast implants guide</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/implant-rippling/',
    slug: 'implant-rippling',
    section: 'surgical',
    group: 'implants',
    h1: 'Breast Implant Rippling and Visibility: Causes and Prevention',
    cardTitle: 'Rippling and visibility',
    seoTitle: 'Breast Implant Rippling and Visibility: Causes and Prevention | Quantum Health',
    seoDescription: 'Why some breast implants show visible rippling or edges, who is more likely to be affected and what can reduce the risk.',
    bannerLead: 'Rippling means wave-like ridges or wrinkles that can be seen or felt at the edges of an implant. It is a recognised issue, not a sign that you did something wrong.',
    imageKey: 'breastImplants',
    related: [
      ['/breast-implants/', 'Breast implants', 'Types, surfaces and placement.'],
      ['/surgical/implant-placement/', 'Implant placement', 'How the pocket affects coverage and visibility.'],
      ['/surgical/breast-revision/', 'Breast revision', 'Options when rippling bothers you.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Visible or palpable rippling is one of the more common cosmetic concerns after augmentation. It is more likely in some bodies and with some implant choices than others.</p>' +
          '<h2>Why it happens</h2>' +
          '<ul><li><strong>Thin tissue coverage:</strong> little natural breast tissue or fat over the implant.</li><li><strong>Implant position:</strong> implants placed over the muscle tend to show more.</li><li><strong>Implant type:</strong> saline implants are generally more prone than cohesive silicone gel, though not exclusively.</li><li><strong>Underfilling:</strong> a saline implant filled below its recommended volume can fold.</li><li><strong>Size:</strong> an implant that is large relative to your tissue.</li><li><strong>Weight loss or ageing:</strong> reducing the cover over time.</li></ul>' +
          '<h2>Where it shows</h2>' +
          '<p>Rippling is most often noticed on the sides and lower part of the breast, and when leaning forward or standing. It may be felt rather than seen.</p>' +
          '<h2>Reducing the risk</h2>' +
          '<ul><li>Choose an implant volume that suits your tissue.</li><li>Discuss placement under the muscle if you have little coverage; see <a href="/surgical/implant-placement/">implant placement</a>.</li><li>Talk about the pros and cons of saline versus silicone for you.</li><li>Consider adding fat transfer on top of the implant in selected cases, as some surgeons do.</li><li>Maintain a stable weight.</li></ul>' +
          '<p>If you are very lean or have little breast tissue, discuss whether implants are the right option at all. Fat transfer or a different approach may be more suitable in selected cases.</p>' +
          '<h2>When rippling needs medical review</h2>' +
          '<p>Rippling alone is usually cosmetic, but a new ridge with pain, a change in shape or a lump should be assessed. If the implant feels different or the breast becomes firm, your surgeon may check for rupture or capsular contracture. Do not assume every new change is rippling.</p>' +
          '<h2>What if it develops?</h2>' +
          '<p>Mild rippling may be acceptable. If it bothers you, options include changing the implant, adjusting placement or adding soft-tissue cover. Each has trade-offs and should be discussed with a surgeon. See <a href="/surgical/breast-revision/">breast revision</a>. Revision is not guaranteed to remove rippling completely, especially if your tissue is thin, so ask what improvement is realistic before agreeing to another operation.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>How likely is visible rippling in someone with my tissue?</li><li>Which choice reduces it for me?</li><li>What would you do if it occurs?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Honest assessment of your tissue before surgery is the best protection against visible implants. See the <a href="/breast-implants/">breast implants guide</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/implant-surface-texture/',
    slug: 'implant-surface-texture',
    section: 'surgical',
    group: 'implants',
    h1: 'Smooth vs Textured Breast Implants: Why Surface Matters',
    cardTitle: 'Smooth vs textured',
    seoTitle: 'Smooth vs Textured Breast Implants: Why Surface Matters | Quantum Health',
    seoDescription: 'How smooth and textured implant surfaces differ, why texture became a safety issue and what to ask about the surface of any implant.',
    bannerLead: 'The outer surface of an implant is a design feature that affects how it sits and how the body responds. It is also a safety question.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/surgical/bia-alcl-implant-illness/', 'BIA-ALCL and implant illness', 'The lymphoma linked mainly to textured implants.'],
      ['/breast-implant-safety/', 'Breast implant safety', 'Rupture, contracture, ALCL and monitoring.'],
      ['/breast-implants/', 'Breast implants', 'The wider guide to implant choices.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Smooth and textured implants differ in more than feel. Surface design affects movement, the shapes available and, for some textures, the risk of a rare implant-associated lymphoma.</p>' +
          '<h2>Smooth implants</h2>' +
          '<p>The shell has a uniform, smooth surface. Smooth implants can move slightly within the pocket and are generally round. They have a long history of use.</p>' +
          '<h2>Textured implants</h2>' +
          '<p>The shell has a roughened surface. Texture was developed to help implants stay in place and to lower the chance of capsular contracture, particularly for shaped implants. Texturing varies widely, from fine to coarse (macro-textured).</p>' +
          '<h2>The safety concern</h2>' +
          '<p>A rare lymphoma, BIA-ALCL, has been linked mostly to textured implants, especially those with coarser texture. Some regulators asked for particular textured implants to be withdrawn, and several countries now restrict them. Read more on <a href="/surgical/bia-alcl-implant-illness/">BIA-ALCL and implant illness</a>.</p>'
      },
      {
        type: 'table',
        eyebrow: 'Surface comparison',
        heading: 'Trade-offs at a glance',
        head: ['Consideration', 'Smooth', 'Textured'],
        rows: [
          ['<strong>Movement</strong>', 'Can move more within the pocket', 'Intended to stay put'],
          ['<strong>Shape options</strong>', 'Mostly round', 'Includes shaped implants'],
          ['<strong>Lymphoma association</strong>', 'Lower', 'Higher, and varies by texture'],
          ['<strong>Availability</strong>', 'Widely available', 'Restricted in some countries']
        ],
        note: 'Individual risk depends on the exact implant, texture type and follow-up. Ask for the manufacturer and model.'
      },
      {
        type: 'prose',
        html:
          '<h2>Texture and capsular contracture</h2>' +
          '<p>Textured surfaces were introduced partly to reduce capsular contracture, but the evidence is not clear enough to say that texture is safer overall. Any benefit must be weighed against the lymphoma association and the availability of the exact implant. Ask for data specific to the model, not a general claim about “textured implants”.</p>' +
          '<h2>What to ask</h2>' +
          '<ul><li>What is the exact surface of the implant you propose?</li><li>Has this implant been restricted or withdrawn anywhere?</li><li>Why do you recommend this surface for me?</li><li>What follow-up do you suggest for it?</li></ul>' +
          '<p>If you are choosing between two implants and the only difference is surface, ask what the evidence is for that exact model and whether the same shape is available with a smooth surface.</p>' +
          '<h2>If you already have textured implants</h2>' +
          '<p>Do not panic. The risk of BIA-ALCL is low. Know what you have by checking your implant card, and report new swelling, a lump or pain to a doctor promptly. If you are unsure what you have, your implant card or operative record should identify the surface. If those records are missing, contact the clinic that performed the surgery.</p>'
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Always ask what the surface is, and why it was chosen. See <a href="/breast-implant-safety/">breast implant safety</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/implant-records-warranties/',
    slug: 'implant-records-warranties',
    section: 'surgical',
    group: 'implants',
    h1: 'Implant Cards, Registries, Recalls and Warranties',
    cardTitle: 'Implant records and warranties',
    seoTitle: 'Implant Cards, Registries, Recalls and Warranties | Quantum Health',
    seoDescription: 'Why you should keep your implant card, how registries and recalls work, and what implant warranties usually cover.',
    bannerLead: 'The paperwork around implants matters long after surgery. It identifies the device and supports follow-up, safety notices and warranty claims.',
    imageKey: 'breastImplants',
    related: [
      ['/breast-implants/', 'Breast implants', 'The wider guide to implant choice and follow-up.'],
      ['/surgical/implant-longevity/', 'How long implants last', 'Replacement, revision and monitoring.'],
      ['/breast-implant-safety/', 'Breast implant safety', 'What regulators and follow-up guidance say.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">The implant card is a medical record, not a receipt. Keep it with your other health documents and store a photograph of it somewhere you can find later.</p>' +
          '<h2>The implant card</h2>' +
          '<p>You should receive a card or record listing the manufacturer, model, size, surface, serial or batch numbers and the surgery date. Ask for it if it is not offered.</p>' +
          '<h2>Why it matters</h2>' +
          '<ul><li>It identifies your implants if a safety notice is issued.</li><li>It helps future surgeons and radiology teams.</li><li>It supports claims under a warranty.</li></ul>' +
          '<h2>Registries</h2>' +
          '<p>Several countries run breast implant registries that record implants and outcomes to monitor safety. Ask the clinic whether your details will be recorded in any applicable registry, how long the records are kept and who holds them. Registry availability and participation can change, so do not assume that a national system is in place.</p>' +
          '<h2>If you move or change doctors</h2>' +
          '<p>Give your new doctor a copy of your implant card and operative notes at your first visit. If you cannot find them, ask the original clinic or hospital for the records. This is especially important before imaging, pregnancy or any further breast surgery.</p>' +
          '<h2>Recalls and safety notices</h2>' +
          '<p>Regulators and manufacturers can issue notices when a problem is found. You may hear about them through the news, your clinic or the regulator. If you have a notice that matches your implant, contact your surgeon or doctor. A recall does not always mean the implant must be removed. It may recommend monitoring, or removal only if there is a rupture or symptoms. Follow the specific notice and your surgeon’s advice.</p>' +
          '<h2>Warranties</h2>' +
          '<p>Manufacturers may offer limited warranties for device failure. Typical features include:</p>' +
          '<ul><li>They cover the implant, often not the cost of surgery or hospital fees.</li><li>They have time limits and conditions, such as registration.</li><li>Some clinics offer their own aftercare plans.</li></ul>' +
          '<p>Read the terms before surgery, and ask what happens if the implant fails within the warranty period. Keep the surgery date, registration confirmation and any claim paperwork with your implant card.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Will I get an implant card, and when?</li><li>What does the warranty cover and exclude?</li><li>If there is a recall, how will you contact me?</li><li>Where are my records stored, and for how long?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Treat the implant card like an important medical document. See the <a href="/breast-implants/">breast implants guide</a>.'
      }
    ]
  }),

  /* ==========================================================================
     Breast implant safety
     ========================================================================== */
  page({
    url: '/surgical/breast-implant-risks/',
    slug: 'breast-implant-risks',
    section: 'surgical',
    group: 'safety',
    h1: 'Breast Implant Risks: An Overview of What Can Go Wrong',
    cardTitle: 'Risks overview',
    seoTitle: 'Breast Implant Risks: An Overview of What Can Go Wrong | Quantum Health',
    seoDescription: 'A balanced overview of the main risks of breast implant surgery, from early complications to long-term issues, and why informed consent matters.',
    bannerLead: 'All surgery has risks. Implants add device-related risks that can appear soon after surgery or years later.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/breast-implant-safety/', 'Breast implant safety', 'The parent guide to rupture, contracture, ALCL and monitoring.'],
      ['/surgical/early-implant-complications/', 'Early complications', 'Infection, haematoma and seroma.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, warning signs and choosing a surgeon.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">A risk list is not a prediction. It is the set of possibilities you should understand before consenting, together with how likely they are, how they are treated and who pays for further care.</p>' +
          '<h2>Risks of any surgery</h2>' +
          '<ul><li>Bleeding, infection and wound-healing problems.</li><li>Reactions to anaesthesia.</li><li>Blood clots.</li><li>Scarring, which can be wide, raised or discoloured.</li></ul>' +
          '<h2>Risks specific to implants</h2>' +
          '<ul><li>Capsular contracture, where scar tissue tightens around the implant.</li><li>Implant rupture or leakage.</li><li>Displacement, rotation or visible rippling.</li><li>Changes in nipple or breast sensation.</li><li>Asymmetry or an unsatisfactory appearance.</li><li>Fluid collection (seroma) and haematoma.</li><li>Difficulty with breastfeeding in some cases.</li><li>Interference with breast imaging.</li><li>Rare serious conditions such as BIA-ALCL.</li><li>The chance of further surgery.</li></ul>' +
          '<h2>Risk is not the same for everyone</h2>' +
          '<p>Smoking, existing conditions, implant type, size and surgical technique can all affect risk. Ask your surgeon to explain what applies to you rather than quoting a general figure.</p>' +
          '<h2>How complications are managed</h2>' +
          '<p>Most complications have a management pathway: antibiotics or drainage for infection, surgery for a large haematoma, capsule surgery for contracture, and removal or replacement for rupture. Ask who would manage each problem, where, and at what cost. A plan that describes only the operation but not the aftercare is incomplete.</p>' +
          '<h2>Reading risk figures</h2>' +
          '<p>Be careful with percentages: they depend on the study, the implant, how long people were followed and how a complication was defined. A single figure cannot describe your risk. Ask where the numbers come from, and ask what happens if the complication occurs.</p>' +
          '<h2>Second opinions and cooling off</h2>' +
          '<p>You do not have to decide at the first consultation. A cooling-off period gives you time to check the surgeon, the facility and the implant. If a clinic discourages this, treat that as a warning sign.</p>' +
          '<h2>Informed consent</h2>' +
          '<p>A proper consent process means you receive written information, the surgeon explains benefits, risks and alternatives, you have time to reflect and ask questions, and you can say no at any point.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>What are the most likely complications for me?</li><li>How are they treated, and who covers the cost?</li><li>What would make you advise against surgery for me?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'A clinic that welcomes tough questions about risk is a good sign. See the <a href="/breast-implant-safety/">breast implant safety guide</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/implant-rupture/',
    slug: 'implant-rupture',
    section: 'surgical',
    group: 'safety',
    h1: 'Breast Implant Rupture: Silent and Visible',
    cardTitle: 'Implant rupture',
    seoTitle: 'Breast Implant Rupture: Silent and Visible | Quantum Health',
    seoDescription: 'How breast implants can rupture or leak, why silicone ruptures may go unnoticed, how they are detected and what happens next.',
    bannerLead: 'Implant shells can wear, tear or leak. Saline rupture is usually obvious; a silicone rupture may cause no symptoms at all.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/surgical/implant-longevity/', 'How long implants last', 'Why implants are not lifetime devices.'],
      ['/breast-implant-safety/', 'Breast implant safety', 'Monitoring and regulator guidance.'],
      ['/surgical/breast-surgery-warning-signs/', 'Urgent warning signs', 'Symptoms that need prompt assessment.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Rupture means the implant shell has failed. It can happen with any implant, at any time, and sometimes without an obvious cause.</p>' +
          '<h2>What can cause it</h2>' +
          '<ul><li>Ageing and wear of the shell over time.</li><li>Surgical damage during insertion.</li><li>Injury or heavy compression.</li><li>Manufacturing defect, in rare cases.</li><li>Mammogram compression, rarely.</li></ul>' +
          '<p>Some ruptures are found during imaging for another reason and may have been present for some time. This is why scheduled monitoring is useful even when you feel well.</p>' +
          '<h2>Saline implants</h2>' +
          '<p>If a saline implant leaks, it usually deflates over hours to days. The breast visibly shrinks and the body absorbs the salt water safely. The implant then needs replacing or removal.</p>' +
          '<h2>Silicone gel implants</h2>' +
          '<p>The gel is cohesive and often stays within the scar capsule, so there may be no visible change. This is called a silent rupture. Symptoms, when present, can include changes in shape or size, firmness, pain, tingling or a lump.</p>' +
          '<h2>How it is detected</h2>' +
          '<p>MRI is generally the most sensitive test. Ultrasound is often used as a first test, depending on availability and skill. Clinical examination alone can miss a rupture. The US FDA recommends imaging for silicone gel implants starting five to six years after surgery and then every two to three years; ask your surgeon what follow-up applies to you.</p>' +
          '<h2>What imaging reports may say</h2>' +
          '<p>A report may describe an intact implant, a suspected intracapsular rupture, an extracapsular rupture or indeterminate findings. The words matter, but they are not a treatment plan. Ask your surgeon to explain what the finding means for you and whether further imaging is needed.</p>' +
          '<h2>What happens if rupture is found</h2>' +
          '<p>Implants are usually removed or replaced, sometimes with removal of the surrounding capsule. The urgency depends on the implant type, symptoms and findings, so seek advice promptly rather than waiting for a routine appointment. An intact capsule with no symptoms may allow time to plan, while gel outside the capsule or symptoms usually prompts earlier surgery.</p>' +
          '<h2>What to do</h2>' +
          '<ul><li>Report any new change in breast shape, size or comfort.</li><li>Keep regular check-ups.</li><li>Keep your implant records.</li></ul>'
      },
      {
        type: 'notice',
        icon: 'clock',
        title: 'Key takeaway',
        text: 'A silicone rupture can happen without symptoms, so scheduled monitoring matters. See <a href="/surgical/implant-longevity/">how long implants last</a> and <a href="/breast-implant-safety/">breast implant safety</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/breast-sensation-changes/',
    slug: 'breast-sensation-changes',
    section: 'surgical',
    group: 'safety',
    h1: 'Changes in Nipple and Breast Sensation After Augmentation',
    cardTitle: 'Sensation changes',
    seoTitle: 'Nipple and Breast Sensation Changes After Augmentation | Quantum Health',
    seoDescription: 'Why feeling in the nipple and breast can change after implant surgery, how common it is, how long it lasts and when to seek advice.',
    bannerLead: 'Changes in sensation are among the most common effects of breast augmentation. Many are temporary, but some persist.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/surgical/breast-augmentation-incisions/', 'Incision options', 'How the surgical route can affect sensation.'],
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, risks and warning signs.'],
      ['/surgical/breast-surgery-warning-signs/', 'Urgent warning signs', 'When numbness or pain needs urgent review.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Nerves supply the nipple and breast through the tissue a surgeon works in. Even careful surgery can stretch, bruise or divide small nerves, and swelling can press on them.</p>' +
          '<h2>What people report</h2>' +
          '<ul><li>Reduced or lost sensation.</li><li>Increased sensitivity or discomfort to touch.</li><li>Tingling, numbness or burning.</li><li>Changes in nipple sensitivity.</li></ul>' +
          '<h2>Factors that may influence it</h2>' +
          '<ul><li>Incision location, with some evidence linking the periareolar approach to a higher chance of nipple changes.</li><li>Implant size, since larger implants stretch tissue more.</li><li>Placement and surgical technique.</li><li>Existing nerve problems.</li></ul>' +
          '<h2>Sensation and breastfeeding</h2>' +
          '<p>Nipple sensation and milk flow are related but not the same. Some people breastfeed successfully after augmentation, while others have difficulty, especially after periareolar incisions or revision surgery. If breastfeeding matters to you, raise it before surgery rather than assuming it will be unaffected. There is no technique that guarantees normal sensation; surgeons can try to avoid major nerves, but small branches vary between people and cannot always be seen.</p>' +
          '<h2>How long does it last?</h2>' +
          '<p>Often sensation returns gradually over weeks to months as swelling settles and nerves recover. In some people, changes last longer or are permanent. The outcome is not predictable, and no surgeon can guarantee normal sensation.</p>' +
          '<p>Some people notice numbness or tingling before the breast looks fully healed, while others notice a change only when sensation begins to return. Both patterns can occur. A review is worthwhile if the change is one-sided, painful or accompanied by skin colour change.</p>' +
          '<h2>What you can do</h2>' +
          '<ul><li>Ask about the risk before surgery and include it in your consent discussion.</li><li>Protect numb areas from heat and injury, such as hot water bottles.</li><li>Report severe or worsening pain, or new numbness, to your surgeon.</li><li>Be patient, because recovery can take many months.</li></ul>' +
          '<h2>Documenting changes</h2>' +
          '<p>Note when a change started, whether it is constant or intermittent, and whether it affects one or both sides. This helps your surgeon assess whether the cause is swelling, nerve irritation or something else. Bring the notes to your review rather than relying on memory.</p>' +
          '<h2>When to seek advice</h2>' +
          '<p>Sudden severe pain, loss of sensation with skin colour change, or signs of infection need prompt assessment. Do not wait for a routine follow-up if you are worried.</p>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Sensation change is a real possibility. Make sure it is part of your informed consent. See <a href="/surgical/breast-augmentation-incisions/">breast augmentation incision options</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/early-implant-complications/',
    slug: 'early-implant-complications',
    section: 'surgical',
    group: 'safety',
    h1: 'Early Complications: Infection, Haematoma and Seroma',
    cardTitle: 'Early complications',
    seoTitle: 'Early Implant Complications: Infection, Haematoma and Seroma | Quantum Health',
    seoDescription: 'Understand infection, bleeding (haematoma) and fluid collection (seroma) after breast implant surgery, including warning signs and treatment.',
    bannerLead: 'Most early problems appear in the first days or weeks. Knowing the signs helps you act quickly rather than waiting to see whether they settle.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/breast-implant-safety/', 'Breast implant safety', 'The wider guide to implant risks and monitoring.'],
      ['/surgical/breast-surgery-warning-signs/', 'Urgent warning signs', 'When to call your team or seek emergency care.'],
      ['/surgical/bia-alcl-implant-illness/', 'BIA-ALCL and implant illness', 'Why late fluid collection needs assessment.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">Infection, bleeding and fluid collection are the early complications most worth recognising. Prompt treatment usually gives the best chance of resolving them.</p>' +
          '<h2>Infection</h2>' +
          '<p>Bacteria can enter the wound or implant pocket. Signs include fever, spreading redness, warmth, increasing pain, swelling and discharge. Treatment may include antibiotics, drainage and, in some cases, removal of the implant so the infection can clear. Surgeons use sterile techniques and sometimes antibiotics to lower the risk.</p>' +
          '<h2>Haematoma</h2>' +
          '<p>A haematoma is a collection of blood around the implant. It usually occurs soon after surgery and causes rapid, often one-sided swelling, tightness and pain. Small ones may settle. Larger ones often need a return to theatre to drain the blood and control bleeding. Blood thinners, certain supplements and high blood pressure can raise the risk.</p>' +
          '<h2>Seroma</h2>' +
          '<p>A seroma is a build-up of fluid. Early seromas may settle or be drained. Fluid that appears long after surgery, especially more than a year later, needs prompt medical assessment, because it can occasionally signal BIA-ALCL. Do not ignore it. See <a href="/surgical/bia-alcl-implant-illness/">BIA-ALCL and implant illness</a>.</p>' +
          '<h2>Red flags that need urgent care</h2>' +
          '<p>Seek emergency care for difficulty breathing, chest pain, fainting, a rapid painful swelling of one breast, or skin that turns pale, blue or blistered. These can signal a clot, major bleeding or poor blood supply. Do not wait for a routine appointment.</p>' +
          '<h2>Other early problems</h2>' +
          '<ul><li>Wound-edge breakdown or delayed healing.</li><li>Skin or nipple colour change, which may signal poor blood supply.</li><li>Implant malposition.</li></ul>' +
          '<h2>Why follow-up matters</h2>' +
          '<p>Some problems are easier to treat when found early. Keep your review appointments even if you feel well, and tell the team about any change in comfort, shape or wound healing. A photograph taken at the same angle can help you describe a change.</p>' +
          '<h2>What to do</h2>' +
          '<ul><li>Know your surgeon’s emergency contact before you leave.</li><li>Report symptoms early rather than waiting.</li><li>Go to emergency care if you cannot reach the team.</li></ul>' +
          '<p>Do not try to drain a wound or collection yourself, and do not start leftover antibiotics without advice.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>How do you lower the risk of infection and bleeding?</li><li>What would trigger a return to theatre?</li><li>Who covers the costs if I need further surgery for a complication?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'safety',
        title: 'Key takeaway',
        text: 'Early recognition and treatment usually leads to better outcomes. See the full list of <a href="/surgical/breast-surgery-warning-signs/">warning signs after breast surgery</a>.'
      }
    ]
  }),

  page({
    url: '/surgical/who-should-delay-implants/',
    slug: 'who-should-delay-implants',
    section: 'surgical',
    group: 'safety',
    h1: 'Who Should Delay or Avoid Breast Implants?',
    cardTitle: 'Who should delay or avoid implants',
    seoTitle: 'Who Should Delay or Avoid Breast Implants? | Quantum Health',
    seoDescription: 'Situations in which breast implants may be unsuitable or better delayed, including health, lifestyle and expectation-related factors.',
    bannerLead: 'Breast implants are not right for everyone, or not right at every time. A responsible surgeon will say honestly if it is better to wait or choose another path.',
    imageKey: 'breastImplantSafety',
    related: [
      ['/breast-enlargement-safety/', 'Breast enlargement safety', 'Candidacy, risks and warning signs.'],
      ['/surgical/breast-augmentation-candidacy/', 'Augmentation candidacy', 'What a surgeon assesses before surgery.'],
      ['/breast-augmentation-consultation-checklist/', 'Consultation checklist', 'How to prepare for an honest discussion.']
    ],
    blocks: [
      {
        type: 'prose',
        html:
          '<p class="lead">A surgeon who turns some people down, or asks them to wait, is protecting them. Being told “not yet” is not a judgment about how much you deserve care.</p>' +
          '<h2>Reasons to delay</h2>' +
          '<ul><li>Pregnancy or breastfeeding.</li><li>Active infection anywhere in the body, especially in or near the breast.</li><li>Recent significant weight change or plans to lose weight, since results may change.</li><li>Smoking or nicotine use, which slows healing and raises complications.</li><li>Plans for pregnancy soon, which some surgeons advise waiting for.</li><li>An unassessed breast lump or abnormal screening result.</li></ul>' +
          '<h2>Reasons implants may be unsuitable</h2>' +
          '<ul><li>Poorly controlled medical conditions or bleeding disorders.</li><li>Conditions that significantly affect healing.</li><li>Previous radiotherapy to the chest, which can raise complication rates and calls for specialist advice.</li><li>Very thin tissue where an implant could not be adequately covered.</li><li>A strong preference to avoid any future surgery, since implants may need it.</li></ul>' +
          '<h2>Autoimmune and other conditions</h2>' +
          '<p>People with autoimmune or connective-tissue conditions should discuss this with their specialist and surgeon. Evidence is limited and individual advice is essential.</p>' +
          '<h2>Psychological factors</h2>' +
          '<p>Some people have intense distress about their appearance that does not match how others see them, as in body dysmorphic disorder. Surgery generally does not relieve this and can make things worse. A responsible surgeon may suggest talking to a mental health professional first. This is a sign of care, not rejection.</p>' +
          '<h2>Unrealistic expectations</h2>' +
          '<p>Surgery cannot change life circumstances, guarantee a relationship or career outcome, or produce an exact result seen in a photograph.</p>' +
          '<h2>Questions for a second opinion</h2>' +
          '<p>Ask whether the surgeon would recommend the same operation for a family member, what they would do differently if you had more or less tissue, and what they would advise if you wanted to wait a year. A consistent, reasoned answer is more reassuring than a sales pitch.</p>' +
          '<h2>Alternatives</h2>' +
          '<p>In some cases a different option, such as a breast lift, fat transfer, a supportive bra or no procedure, may fit better.</p>' +
          '<h2>Questions to ask</h2>' +
          '<ul><li>Are there reasons I should wait or avoid implants?</li><li>What would improve my suitability?</li><li>What alternatives do you suggest?</li></ul>'
      },
      {
        type: 'notice',
        icon: 'info',
        title: 'Key takeaway',
        text: 'Good surgeons turn some people down or ask them to wait. That is protective, not obstructive. See <a href="/breast-enlargement-safety/">breast enlargement safety</a>.'
      }
    ]
  })
];

const sourcesByGroup = {
  augmentation: [
    ['ASPS: Breast Augmentation', 'https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation'],
    ['StatPearls: Breast Augmentation', 'https://www.ncbi.nlm.nih.gov/books/NBK482206/']
  ],
  implants: [
    ['FDA: Breast Implants', 'https://www.fda.gov/medical-devices/implants-and-prosthetics/breast-implants'],
    ['CDSCO: Medical Device & Diagnostics', 'https://cdsco.gov.in/opencms/opencms/en/Medical-Device-Diagnostics/Medical-Device-Diagnostics/']
  ],
  safety: [
    ['FDA: Risks and Complications of Breast Implants', 'https://www.fda.gov/medical-devices/breast-implants/risks-and-complications-breast-implants'],
    ['CDSCO: Medical Devices Rules, 2017', 'https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2022/m_device/Medical%20Devices%20Rules,%202017.pdf']
  ]
};

function reviewAndSources(group) {
  const links = (sourcesByGroup[group] || sourcesByGroup.safety)
    .map(([label, href]) => `<a href="${href}" rel="noopener">${label}</a>`)
    .join(' · ');
  return {
    type: 'notice',
    blush: true,
    icon: 'evidence',
    title: 'Draft review and sources',
    text: `<strong>Before publication:</strong> qualified clinician review and current Indian regulatory verification, where relevant, are required. Sources: ${links}.`
  };
}

const surgicalSubpages = pages.map((entry) => ({
  ...entry,
  blocks: entry.blocks.concat(reviewAndSources(entry.group))
}));

module.exports = { surgicalSubpages };
