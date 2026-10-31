'use strict';

/* Contact page + legal/policy pages.
   This website is an independent educational resource, not a clinic. The
   contact form therefore collects only what is needed to reply to a general
   question, and the legal pages are written for a website publisher rather
   than for a treating clinic. */

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
      { type: 'prose', html: o.html }
    ]
  };
}

const contact = {
  url: '/contact/', slug: 'contact',
  h1: 'Contact Us',
  seoTitle: 'Contact Us | Quantum Health',
  seoDescription: 'How to contact the Quantum Health — an independent educational website about breast enlargement options, evidence and safety.',
  bannerEyebrow: 'Contact',
  bannerLead: 'This website is an educational resource, not a clinic. Use this page for corrections, source suggestions or general questions about the content.',
  breadcrumb: [{ label: 'Contact' }],
  schema: [{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact', url: site.url + '/contact/' }],
  blocks: [
    {
      type: 'prose',
      html:
        '<p class="lead">This website does not provide treatment, consultations or diagnoses, and no clinician is available through it. Please read the notes below before writing to us.</p>'
    },
    {
      type: 'icon-grid',
      eyebrow: 'What to contact us about',
      heading: 'Appropriate and inappropriate enquiries',
      cols: 2,
      items: [
        { icon: 'evidence', title: 'Content corrections & sources', text: 'Spotted an error, a broken link or a source we should include? We welcome evidence-based corrections and suggestions.' },
        { icon: 'info', title: 'General questions about the content', text: 'Questions about how a page explains a concept, or where a cited source comes from, are welcome.' },
        { icon: 'safety', title: 'Medical advice — not here', text: 'We cannot give personal medical advice, diagnose a condition or recommend a treatment. Please see a qualified, registered clinician.' },
        { icon: 'safety', title: 'Urgent symptoms — seek care now', text: 'If you have fever, spreading redness, a new lump, chest pain or any urgent symptom after a procedure, contact a clinician or emergency services immediately.' }
      ]
    },
    {
      type: 'form',
      eyebrow: 'Message form',
      heading: 'Send a general message',
      lead: 'A mobile number is required for this form. Choose Phone or Email as your preferred reply method; if you choose Phone, we may call about your website enquiry. Please do not send detailed medical history, symptoms, test results or images; we cannot respond to individual medical questions.',
      interests: [
        'General breast-enlargement information',
        'Surgical options',
        'Non-surgical options',
        'Evidence and research',
        'Safety and risks',
        'Content correction',
        'Source or reference suggestion',
        'General question about this website',
        'Other'
      ],
      contactMethods: ['Phone', 'Email'],
      points: [
        'We may call or email about your website enquiry, using your selected contact method.',
        'We cannot provide medical advice or diagnosis.',
        'Please do not include personal medical details.',
        'Messages are handled confidentially.'
      ],
      slot: 'Consultation welcome imagery',
      submitLabel: 'Send message',
      endpoint: site.contact.formEndpoint
    },
    {
      type: 'notice',
      icon: 'info',
      title: 'This is not a clinic',
      text: 'No doctor, clinic, medical team or physical address is presented on this website because none has been verified. Phone follow-up is only about your website enquiry. Submitting a message does not create a doctor–patient relationship and does not commit you to any treatment.'
    },
    {
      type: 'notice',
      icon: 'mail',
      title: 'Prefer to email us directly?',
      text: 'To contact us without using the form, write to <a href="mailto:' + site.contact.email + '">' + site.contact.email + '</a>.'
    }
  ]
};

const legal = [
  legalPage({
    url: '/privacy-policy/', slug: 'privacy-policy', label: 'Privacy policy',
    h1: 'Privacy Policy', seoTitle: 'Privacy Policy | Quantum Health',
    seoDescription: 'How the Quantum Health website handles personal information submitted through its contact form.',
    lead: 'How personal information submitted through this website is handled.',
    html:
      '<h2 class="h3">Who we are</h2><p>This website is an independent, educational publication about breast enlargement. It is not a clinic and does not provide medical services. This policy explains how the limited personal information collected through this website is handled.</p>' +
      '<h2 class="h3">Information we collect</h2><p>If you use the contact form, we collect your name, email address, required mobile number and country calling code, area of interest, preferred contact method, and message. Please do not submit detailed medical information, symptoms, test results or images; the form is not designed to receive them and we cannot act on them.</p>' +
      '<h2 class="h3">How we use it</h2><p>Contact information is used only to read and reply to your website enquiry using your selected contact method. If you select Phone, we may call the mobile number you provided about that enquiry; if you select Email, we will reply by email. The contact-form endpoint validates the message and, only when delivery is configured, sends it through Resend to the published mailbox. If delivery is not configured, the site tells you that the message was not sent. Information is not sold or used for advertising or marketing.</p>' +
      '<h2 class="h3">Retention and legal basis</h2><p>We have not been given a fixed retention schedule for the publisher’s mailbox. Messages may remain in that mailbox or the delivery provider’s systems for as long as needed to handle the enquiry, meet legal obligations or resolve a dispute. Where a privacy law requires a legal basis, processing is based on your request to receive a reply and, where required, the consent you provide by submitting the form. This general notice does not replace jurisdiction-specific legal advice.</p>' +
      '<h2 class="h3">Your choices</h2><p>You may ask for access to, correction of, or deletion of information you submitted by emailing <a href="mailto:' + site.contact.email + '">' + site.contact.email + '</a>. We may need enough information to identify the enquiry, and legal or technical limits can affect what can be deleted. The publisher has not supplied a jurisdiction-specific list of privacy rights, so this page does not make one.</p>' +
      '<h2 class="h3">Cookies and analytics</h2><p>The published site does not intentionally set analytics, advertising or marketing cookies, and it does not include a consent-management banner because no non-essential cookies are currently used. If analytics, advertising pixels or embedded third-party media are added later, this policy and any required consent controls must be updated before they are activated.</p>'
  }),
  legalPage({
    url: '/cookie-policy/', slug: 'cookie-policy', label: 'Cookie policy',
    h1: 'Cookie Policy', seoTitle: 'Cookie Policy | Quantum Health',
    seoDescription: 'How the Quantum Health website uses cookies and similar technologies, and how consent is managed.',
    lead: 'How cookies and similar technologies are used, and how you can manage consent.',
    html:
      '<h2 class="h3">What cookies are</h2><p>Cookies are small files stored by your browser. This website is built to work without analytics, advertising or marketing cookies.</p>' +
      '<h2 class="h3">Current cookie use</h2><p>The published site does not intentionally set non-essential cookies and does not load analytics or advertising tags. For that reason, there is no cookie banner or consent preference to manage at present. Your browser or hosting provider may use strictly necessary technical mechanisms to deliver a secure connection; those are not used to profile visitors.</p>' +
      '<h2 class="h3">Future changes</h2><p>If non-essential analytics, advertising, social-media embeds or similar technologies are added, this policy will be updated and any required consent control will be implemented before those technologies are activated.</p>'
  }),
  legalPage({
    url: '/terms-of-use/', slug: 'terms-of-use', label: 'Terms of use',
    h1: 'Terms of Use', seoTitle: 'Terms of Use | Quantum Health',
    seoDescription: 'The terms governing use of the Quantum Health website and its educational content.',
    lead: 'The terms governing use of this website and its educational content.',
    html:
      '<h2 class="h3">Educational purpose</h2><p>Content on this website is provided for general educational purposes. It is not a substitute for professional medical advice, diagnosis or treatment, and it does not create a doctor–patient relationship.</p>' +
      '<h2 class="h3">No personalised advice</h2><p>Nothing on this website constitutes a personal recommendation for any specific individual. Treatment suitability, availability, risks and results vary and must be assessed in consultation with a qualified clinician.</p>' +
      '<h2 class="h3">External sources</h2><p>This website links to third-party sources so that readers can verify information. We do not control those sources and are not responsible for their content, availability, privacy practices or changes after linking.</p>' +
      '<h2 class="h3">Acceptable use</h2><p>You may use this website for personal, non-commercial educational purposes. Do not use it to seek emergency care, submit another person’s private health information, interfere with the site, or rely on it as a substitute for individual medical advice.</p>' +
      '<h2 class="h3">Changes and contact</h2><p>Information, links and these terms may change as evidence, regulation or the site changes. The publisher has not supplied a governing-law or registered-address statement, so this page does not make a jurisdictional claim. For a question about these terms or the website, email <a href="mailto:' + site.contact.email + '">' + site.contact.email + '</a>.</p>'
  }),
  legalPage({
    url: '/medical-disclaimer/', slug: 'medical-disclaimer', label: 'Medical disclaimer',
    h1: 'Medical Disclaimer', seoTitle: 'Medical Disclaimer | Quantum Health',
    seoDescription: 'The medical disclaimer for content published on the Quantum Health website.',
    lead: 'Important limitations on the medical information published on this website.',
    html:
      '<p>Website content is provided for general educational purposes and is not a substitute for professional medical advice. This website is not a clinic and does not provide treatment, consultations or diagnoses.</p>' +
      '<p>Treatment availability, suitability, risks and results vary. Reference to any product, brand, technique or regulatory position does not confirm its approval, availability or suitability in your jurisdiction. Regulatory and evidence positions change over time; always check the original source.</p>' +
      '<p>Always seek the advice of an appropriately qualified medical professional with any questions about a medical condition or treatment. If you notice a new breast lump or any urgent symptom, seek medical care promptly.</p>'
  })
];

module.exports = { contact, legal };
