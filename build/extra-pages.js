'use strict';

/* Consultation page + legal/consent pages (drafts requiring review) */

const { site } = require('./content');

function legalPage(o) {
  return {
    url: o.url, slug: o.slug, h1: o.h1,
    seoTitle: o.seoTitle, seoDescription: o.seoDescription,
    bannerEyebrow: 'Policy', bannerLead: o.lead,
    breadcrumb: [{ label: o.label }],
    noindex: true,
    schema: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: o.h1, url: site.url + o.url }],
    blocks: [
      { type: 'notice', blush: true, icon: 'evidence', title: 'Draft — requires legal review',
        text: 'This policy is an editable starting template. It must be completed and reviewed by the clinic’s legal adviser to reflect the clinic’s actual data practices, jurisdiction and obligations before publication. It is marked noindex until then.' },
      { type: 'prose', html: o.html }
    ]
  };
}

const consultation = {
  url: '/book-consultation/', slug: 'book-consultation',
  h1: 'Request a Private Consultation',
  seoTitle: 'Book a Consultation | QuantumHealth by Dr. Vikas Singh',
  seoDescription: 'Request a confidential breast enhancement consultation. Share your preferred contact details and the type of information you would like to discuss.',
  bannerEyebrow: 'Consultation',
  bannerLead: 'Share your preferred contact details and the type of information you would like to discuss. The clinic team can then confirm availability and next steps.',
  breadcrumb: [{ label: 'Book a consultation' }],
    schema: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Request a Consultation', url: site.url + '/book-consultation/' }],
  blocks: [
    {
      type: 'form',
      eyebrow: 'Enquiry form',
      heading: 'Tell us how best to reach you',
      lead: 'This form collects only the information needed to respond to your enquiry. Please do not include detailed medical history here — that is discussed in consultation.',
      interests: [
        'General breast enhancement consultation',
        'Non-surgical treatment information',
        'Breast implant surgery',
        'Fat transfer surgery',
        'Second opinion or treatment safety'
      ],
      contactMethods: ['Phone', 'Email'],
      points: [
        'A member of the clinic team responds using your preferred contact method.',
        'No treatment decision is made through this form — a consultation is required.',
        'Your enquiry is handled confidentially.',
        'This form does not provide medical advice or diagnosis.'
      ],
      slot: 'Consultation welcome imagery',
      submitLabel: 'Prepare enquiry',
      endpoint: site.contact.formEndpoint
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'Consultation, not a commitment',
      text: 'Submitting an enquiry does not commit you to any treatment. Any treatment plan is discussed and agreed only during a consultation with an appropriately qualified clinician, after assessment of suitability, risks and alternatives.'
    },
    {
      type: 'notice',
      icon: 'phone',
      title: 'Prefer to contact us directly?',
      text: 'Call <a href="tel:+85244608658">+852 4460 8658</a> or email <a href="mailto:' + site.contact.email + '">' + site.contact.email + '</a>. Head office: ' + site.contact.address + '. Opening hours: ' + site.contact.hours + '.'
    },
    {
      type: 'icon-grid',
      alt: true,
      eyebrow: 'What happens next',
      heading: 'After you submit an enquiry',
      cols: 3,
      items: [
        { icon: 'mail', title: 'We review your enquiry', text: 'The clinic team reads your enquiry and confirms the most suitable next step.' },
        { icon: 'calendar', title: 'We confirm availability', text: 'You are contacted using your preferred method to arrange a consultation time.' },
        { icon: 'personalised', title: 'You attend a consultation', text: 'Your goals, history, suitability, options and risks are discussed in person.' }
      ]
    }
  ]
};

const legal = [
  legalPage({
    url: '/privacy-policy/', slug: 'privacy-policy', label: 'Privacy policy',
    h1: 'Privacy Policy', seoTitle: 'Privacy Policy | QuantumHealth',
    seoDescription: 'How QuantumHealth handles personal information submitted through this website, including enquiries and consultation requests.',
    lead: 'How personal information submitted through this website is handled.',
    html:
      '<h2 class="h3">Information we collect</h2><p>This website collects the information you choose to submit through the consultation enquiry form — such as your name, email address, telephone number and area of interest — together with any optional details you provide. Please do not submit detailed medical information through this form.</p>' +
      '<h2 class="h3">How we use it</h2><p>Enquiry information is used to respond to your request and to arrange a consultation. [To be completed: retention periods, legal basis, third-party processors, and international transfer details as applicable to the clinic.]</p>' +
      '<h2 class="h3">Your choices</h2><p>You may request access to, correction of, or deletion of the personal information you have submitted. [To be completed with the clinic’s actual contact point and jurisdiction-specific rights.]</p>' +
      '<h2 class="h3">Cookies and analytics</h2><p>Where analytics, advertising pixels or embedded third-party media are used, they are activated only after the required consent is obtained. [To be completed once the clinic’s tooling is confirmed.]</p>'
  }),
  legalPage({
    url: '/cookie-policy/', slug: 'cookie-policy', label: 'Cookie policy',
    h1: 'Cookie Policy', seoTitle: 'Cookie Policy | QuantumHealth',
    seoDescription: 'How QuantumHealth uses cookies and similar technologies, and how consent is managed.',
    lead: 'How cookies and similar technologies are used, and how you can manage consent.',
    html:
      '<h2 class="h3">What cookies are</h2><p>Cookies are small files stored by your browser. This website aims to use as few as possible and to load any non-essential cookies only after consent.</p>' +
      '<h2 class="h3">Categories</h2><p><strong>Essential:</strong> required for the website to function. <strong>Analytics:</strong> used to understand site usage — loaded only after consent. <strong>Marketing:</strong> used only if applicable and only after separate consent. [To be completed once tooling is confirmed.]</p>' +
      '<h2 class="h3">Managing consent</h2><p>[To be completed: consent-management mechanism and instructions for withdrawing consent at any time.]</p>'
  }),
  legalPage({
    url: '/terms-of-use/', slug: 'terms-of-use', label: 'Terms of use',
    h1: 'Terms of Use', seoTitle: 'Terms of Use | QuantumHealth',
    seoDescription: 'The terms governing use of the QuantumHealth website and its educational content.',
    lead: 'The terms governing use of this website and its educational content.',
    html:
      '<h2 class="h3">Educational purpose</h2><p>Content on this website is provided for general educational purposes. It is not a substitute for professional medical advice, diagnosis or treatment, and it does not create a doctor–patient relationship.</p>' +
      '<h2 class="h3">No personalised advice</h2><p>Nothing on this website constitutes a personal recommendation for any specific individual. Treatment suitability, availability, risks and results vary and must be assessed in consultation.</p>' +
      '<h2 class="h3">Accuracy and changes</h2><p>Content may be updated or corrected over time. [To be completed with the clinic’s governing law, contact details and liability terms.]</p>'
  }),
  legalPage({
    url: '/medical-disclaimer/', slug: 'medical-disclaimer', label: 'Medical disclaimer',
    h1: 'Medical Disclaimer', seoTitle: 'Medical Disclaimer | QuantumHealth',
    seoDescription: 'The medical disclaimer for content published on the QuantumHealth website.',
    lead: 'Important limitations on the medical information published on this website.',
    html:
      '<p>Website content is provided for general educational purposes and is not a substitute for professional medical advice. Treatment availability, suitability, risks and results vary. All services are subject to applicable law and professional standards.</p>' +
      '<p>Reference to any product, brand, technique or regulatory position does not confirm its approval, availability or suitability in your jurisdiction. Medical content is reviewed before publication, and pages awaiting review are marked accordingly.</p>' +
      '<p>Always seek the advice of an appropriately qualified medical professional with any questions about a medical condition or treatment.</p>'
  }),
  legalPage({
    url: '/patient-photography-consent/', slug: 'patient-photography-consent', label: 'Patient photography consent',
    h1: 'Patient Photography Consent Policy', seoTitle: 'Patient Photography Consent Policy | QuantumHealth',
    seoDescription: 'How QuantumHealth approaches patient photography, consent and the responsible presentation of clinical images.',
    lead: 'How clinical photography is approached, consented and presented.',
    html:
      '<h2 class="h3">Consent first</h2><p>Clinical photography is used only with appropriate, documented patient consent. Images are never presented as a patient result unless they are genuine and consented.</p>' +
      '<h2 class="h3">Responsible presentation</h2><p>Before-and-after images use consistent lighting, positioning and camera angles, identify the procedure and timeframe, and carry a clear statement that individual results vary. Images are never digitally altered to exaggerate treatment outcomes.</p>' +
      '<h2 class="h3">Stock imagery</h2><p>Illustrative stock photography is clearly labelled and never presented as a patient result. [To be completed with the clinic’s specific consent processes and retention terms.]</p>'
  })
];

module.exports = { consultation, legal };
