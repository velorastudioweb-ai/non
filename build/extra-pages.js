'use strict';

/* Contact page + legal/policy pages.
   This website is an independent educational resource, not a clinic. The
   contact form therefore collects only what is needed to reply to a general
   question, and the legal pages are written for a website publisher rather
   than for a treating clinic. */

const { site } = require('./content');
const { organizationSchema, WHATSAPP, whatsappLink, WHATSAPP_MESSAGE, locations } = require('./locations');
const { siteImages } = require('./site-images');
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const mailIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3.5" y="6" width="17" height="12" rx="1.5"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/></svg>';
const whatsappIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.4 11.7a8.4 8.4 0 0 1-12.4 7.4L3.6 20.4l1.3-4.3a8.4 8.4 0 1 1 15.5-4.4Z"/><path d="M9 8.4h2l.8 2-1 .8a6 6 0 0 0 2.9 2.9l.8-1 2 .8v2a1 1 0 0 1-1 1 7.6 7.6 0 0 1-6.6-6.5 1 1 0 0 1 1-1Z"/></svg>';
const whatsappUrl = whatsappLink(WHATSAPP.number, WHATSAPP_MESSAGE);

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
  seoTitle: 'Contact Us & Appointment Enquiries | Quantum Health',
  seoDescription: 'Contact Quantum Health about breast enlargement: Hong Kong head office, La Crown and Ritz in Bengaluru, Badr Al Samaa Medical Center in Dubai, click-to-call numbers and a secure appointment enquiry form.',
  bannerEyebrow: 'Contact & appointments',
  bannerLead: 'Reach the Quantum Health team in Hong Kong, Bengaluru or Dubai, or send an appointment enquiry. This is an enquiry service — no appointment is confirmed until the team replies.',
  bannerImage: '/Maroon Medical Booking Service Scene.png',
  bannerWidth: 1991,
  bannerHeight: 790,
  bannerAlt: 'Maroon booking scene: a woman calling on her phone beside a consultant at a service desk with a laptop, WhatsApp handset and appointment calendar, framed by Hong Kong, Bengaluru and Dubai city views',
  breadcrumb: [{ label: 'Contact' }],
  schema: [
    { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Us', url: site.url + '/contact/' },
    organizationSchema(site.url)
  ],
  blocks: [
    {
      type: 'prose',
      wide: true,
      html:
        '<div class="contact-intro">' +
          '<p class="lead">Choose a location for directions and local telephone numbers, or send one appointment enquiry and the team will route it to the right branch. WhatsApp enquiries are available on the central India number.</p>' +
          '<div class="contact-intro__actions">' +
            '<a class="btn btn--primary" href="#appointment">Appointment enquiry ' + arrow + '</a>' +
            '<a class="btn btn--outline" href="mailto:' + site.contact.email + '">' + mailIcon + ' Email the team</a>' +
            '<a class="btn btn--outline" href="' + whatsappUrl + '" target="_blank" rel="noopener">' + whatsappIcon + ' WhatsApp enquiries</a>' +
          '</div>' +
          '<p class="contact-intro__note">Official email: <a href="mailto:' + site.contact.email + '">' + site.contact.email + '</a> · WhatsApp: <a href="' + whatsappUrl + '" target="_blank" rel="noopener">' + site.contact.whatsappDisplay + '</a></p>' +
        '</div>'
    },
    {
      type: 'locations',
      eyebrow: 'Our global locations',
      heading: 'Hong Kong, Bengaluru and Dubai',
      lead: 'Location and telephone details supplied by Quantum Health. Opening hours, practitioner availability and treatment availability are confirmed directly by the team and are not published here.',
      locations: site.contact.locations
    },
    {
      type: 'appointment',
      id: 'appointment',
      eyebrow: 'Appointment enquiry',
      heading: 'Tell us how we can help',
      lead: 'Share your preferred country, branch, topic and timing. The team will review your enquiry and contact you to confirm what is available. Please do not book travel until you receive confirmation.',
      endpoint: site.contact.formEndpoint,
      points: [
        'Your enquiry is sent to the Quantum Health appointment team and stored securely.',
        'The team will reply using the phone number or email address you provide.',
        'Preferred dates and times are requests, not confirmed appointments.',
        'Please do not include sensitive medical records, symptoms or images in this form.'
      ]
    },
    {
      type: 'icon-grid',
      eyebrow: 'Before you write',
      heading: 'What helps the team route your enquiry',
      cols: 3,
      items: [
        { icon: 'pin', title: 'Preferred location', text: 'Tell us whether you are asking about Hong Kong, La Crown or Ritz in Bengaluru, or Dubai — Badr Al Samaa Medical Center.' },
        { icon: 'calendar', title: 'A realistic window', text: 'Give a preferred date and time window rather than an exact slot. The team will confirm the actual appointment time.' },
        { icon: 'safety', title: 'No urgent medical details', text: 'Use this form for appointment enquiries only. Do not send test results, images or detailed medical history, and never use it for an emergency.' }
      ]
    }
  ]
};

const locationsPage = {
  url: '/locations/', slug: 'locations',
  h1: 'Our Global Locations',
  seoTitle: 'Our Global Locations | Quantum Health',
  seoDescription: 'Quantum Health global contact network: Hong Kong head office in Tuen Mun, Bengaluru branches at La Crown Jayanagar and Ritz, and Badr Al Samaa Medical Center in Bur Dubai, with telephone numbers and map links.',
  bannerEyebrow: 'Global locations',
  bannerImage: '/Neon Cityscape with Golden Location Pins.png',
  bannerWidth: 1762,
  bannerHeight: 892,
  bannerAlt: 'Neon cityscape with golden location pins representing the Quantum Health global contact network',
  breadcrumb: [{ label: 'Locations' }],
  schema: [
    { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Our Global Locations', url: site.url + '/locations/' },
    organizationSchema(site.url)
  ],
  blocks: [
    {
      type: 'city-panels',
      center: true,
      eyebrow: 'Dubai and Bengaluru',
      heading: 'Where consultations happen in Dubai and Bengaluru',
      lead: 'Dubai consultations are held at Badr Al Samaa Medical Center in Mankhool, Bur Dubai. In Bengaluru the team consults at La Crown in Jayanagar and at Ritz. Choose a panel to send an enquiry to that branch.',
      panels: [
        {
          image: siteImages.dubaiPanel,
          country: 'United Arab Emirates',
          city: 'Dubai',
          address: 'Badr Al Samaa Medical Center, Ground Floor, Mankhool, Bur Dubai',
          phones: locations.find((location) => location.id === 'dubai').phones,
          href: '/contact/?branch=dubai#appointment',
          cta: 'Enquire'
        },
        {
          image: siteImages.bengaluruPanel,
          country: 'India',
          city: 'Bengaluru',
          address: 'La Crown, Jayanagar, and Ritz — confirm the branch when you book',
          phones: locations.find((location) => location.id === 'la-crown').phones.slice(0, 2),
          href: '/contact/?branch=la-crown#appointment',
          cta: 'Enquire'
        }
      ]
    },
    {
      type: 'locations',
      eyebrow: 'Where to reach us',
      heading: 'Four points of contact',
      lead: 'Hong Kong is the head office. Bengaluru has two branch locations, La Crown in Jayanagar and Ritz. Dubai consultations are held at Badr Al Samaa Medical Center in Mankhool, Bur Dubai. No opening hours or treatment availability are implied.',
      locations: site.contact.locations
    },
    {
      type: 'notice',
      icon: 'pin',
      title: 'Before travelling to any location',
      text: 'Please confirm your appointment and the exact meeting point with the team before travelling. In Dubai the address is Badr Al Samaa Medical Center in Mankhool, Bur Dubai: confirm the floor and suite with the team before setting out. Map links open Google Maps in a new tab; check the pin and the destination before setting out.'
    },
    {
      type: 'icon-grid',
      alt: true,
      eyebrow: 'Contact channels',
      heading: 'How the enquiry network works',
      cols: 3,
      items: [
        { icon: 'phone', title: 'Click to call', text: 'Every published number is a direct telephone link. International call charges depend on your provider.' },
        { icon: 'whatsapp', title: 'WhatsApp', text: 'WhatsApp enquiries are available on the central India number ' + site.contact.whatsappDisplay + '. Other numbers are telephone contacts.' },
        { icon: 'mail', title: 'Email and form', text: 'Use the appointment enquiry form or email ' + site.contact.email + '. The team will route your enquiry to the right location.' }
      ]
    },
    {
      type: 'cta',
      eyebrow: 'Ready to ask a question?',
      heading: 'Send one appointment enquiry',
      text: 'Tell the team your preferred country, branch and timing. You will receive a reply before any appointment is confirmed.',
      button: { label: 'Make an appointment enquiry', href: '/contact/#appointment' }
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
      '<h2 class="h3">Who we are</h2><p>This website is published by Quantum Health as an educational resource about breast enlargement and as a route for appointment enquiries. This policy explains how the personal information collected through this website is handled.</p>' +
      '<h2 class="h3">Information we collect</h2><p>If you use the appointment enquiry form, we collect your name, email address, phone country code and number, preferred country and branch, treatment or consultation topic, preferred date and time window, any additional message, and your privacy consent. Please do not submit detailed medical information, symptoms, test results or images; the form is not designed to receive them and the team cannot act on them.</p>' +
      '<h2 class="h3">How we use it</h2><p>Your details are used only to review and respond to your appointment enquiry, to confirm whether a preferred location and time are available, and to route the enquiry to the relevant Quantum Health contact. The contact-form endpoint validates the submission, sends it to the configured business inbox through Resend, and — where secure storage is configured for the deployment — stores a record so the enquiry is not lost if email delivery is delayed. If delivery is not configured, the site tells you that the enquiry was not sent. Information is not sold or used for advertising or marketing.</p>' +
      '<h2 class="h3">Retention and legal basis</h2><p>Enquiry records may remain in the business inbox and, where storage is configured, in the secure enquiry store for as long as needed to handle the enquiry, meet legal obligations or resolve a dispute. Where a privacy law requires a legal basis, processing is based on your request to receive a reply and the consent you provide by submitting the form. This general notice does not replace jurisdiction-specific legal advice.</p>' +
      '<h2 class="h3">Your choices</h2><p>You may ask for access to, correction of, or deletion of information you submitted by emailing <a href="mailto:' + site.contact.email + '">' + site.contact.email + '</a>. We may need enough information to identify the enquiry, and legal or technical limits can affect what can be deleted.</p>' +
      '<h2 class="h3">Cookies and analytics</h2><p>The published site does not intentionally set analytics, advertising or marketing cookies. Google Maps is not loaded until you choose to show a map; if you open a map or directions link, Google’s own terms and privacy policy apply. If analytics, advertising pixels or other embedded third-party media are added later, this policy and any required consent controls must be updated before they are activated.</p>'
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
      '<h2 class="h3">Educational purpose</h2><p>Content on this website is provided for general educational purposes. It is not a substitute for professional medical advice, diagnosis or treatment.</p>' +
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

module.exports = { contact, locationsPage, legal };
