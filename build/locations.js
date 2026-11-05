'use strict';

/*
 * Canonical global location and contact data.
 *
 * These details are supplied by Quantum Health for its international contact
 * network. They are the single source used by the navigation, footer, contact
 * page, locations page, doctor profile, appointment form and schema so the
 * published contact information cannot drift between pages.
 *
 * Deliberate limits:
 *  - WhatsApp-enabled numbers are only those confirmed by Quantum Health for
 *    WhatsApp enquiries: +91 9148717036, +91 7676210310, +91 7406110611,
 *    +852 44608658 and +852 44644381. Every other number keeps a plain
 *    telephone link;
 *  - the Dubai meeting point is Badr Al Samaa Medical Center in Mankhool,
 *    Bur Dubai, as supplied for the United Arab Emirates enquiries;
 *  - no opening hours or treatment availability are invented for any location.
 */

const CONTACT_EMAIL = 'drvikas090909@gmail.com';
const WHATSAPP = Object.freeze({ number: '919148717036', display: '+91 91487 17036' });
const WHATSAPP_MESSAGE = 'Hello Quantum Health, I would like to know more about your treatments and consultation availability.';

function telHref(phone) {
  let value = String(phone || '').replace(/[^\d+]/g, '');
  if (value && value.charAt(0) !== '+') value = '+' + value;
  return 'tel:' + value;
}
function mapSearch(query) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
}
function mapDirections(query) {
  return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(query);
}
function mapEmbed(query) {
  return 'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&output=embed';
}
function whatsappLink(number, text) {
  return 'https://wa.me/' + String(number).replace(/[^\d]/g, '') +
    (text ? '?text=' + encodeURIComponent(text) : '');
}

const rawLocations = [
  {
    id: 'hong-kong',
    kind: 'physical',
    country: 'Hong Kong',
    countryCode: 'HK',
    role: 'Head Office',
    name: 'Hong Kong — Head Office',
    shortName: 'Hong Kong',
    addressLines: [
      '55–65 Lung Mun Road',
      'Sun Tuen Mun Shopping Centre',
      'Tuen Mun, New Territories',
      'Hong Kong'
    ],
    postal: {
      streetAddress: '55–65 Lung Mun Road, Sun Tuen Mun Shopping Centre',
      addressLocality: 'Tuen Mun',
      addressRegion: 'New Territories',
      addressCountry: 'HK'
    },
    mapQuery: '55–65 Lung Mun Road, Sun Tuen Mun Shopping Centre, Tuen Mun, New Territories, Hong Kong',
    phones: [
      { display: '+852 4460 8658', tel: '+85244608658', whatsapp: '85244608658' },
      { display: '+852 4464 4381', tel: '+85244644381', whatsapp: '85244644381' }
    ],
    whatsapp: '85244608658',
    note: 'Head office address supplied by Quantum Health. Both head-office numbers receive WhatsApp enquiries. Please confirm appointment availability with the team before travelling.'
  },
  {
    id: 'la-crown',
    kind: 'physical',
    country: 'India',
    countryCode: 'IN',
    role: 'Bengaluru Branch 1',
    name: 'Bengaluru — La Crown, Jayanagar',
    shortName: 'La Crown, Jayanagar',
    addressLines: [
      'La Crown, Jayanagar',
      'Bengaluru, Karnataka',
      'India'
    ],
    postal: {
      streetAddress: 'La Crown, Jayanagar',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    },
    mapQuery: 'La Crown, Jayanagar, Bengaluru, Karnataka, India',
    phones: [
      { display: '+91 91487 17036', tel: '+919148717036', whatsapp: '919148717036' },
      { display: '+91 76762 10310', tel: '+917676210310', whatsapp: '917676210310' },
      { display: '+91 74061 10611', tel: '+917406110611', whatsapp: '917406110611' }
    ],
    whatsapp: WHATSAPP.number,
    note: 'Central India enquiry numbers. All three numbers receive WhatsApp enquiries.'
  },
  {
    id: 'ritz',
    kind: 'physical',
    country: 'India',
    countryCode: 'IN',
    role: 'Bengaluru Branch 2',
    name: 'Bengaluru — Ritz',
    shortName: 'Ritz, Bengaluru',
    addressLines: [
      'Ritz',
      'Bengaluru, Karnataka',
      'India'
    ],
    postal: {
      streetAddress: 'Ritz',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN'
    },
    mapQuery: 'Ritz, Bengaluru, Karnataka, India',
    phones: [
      { display: '+91 91487 17036', tel: '+919148717036', whatsapp: '919148717036' },
      { display: '+91 76762 10310', tel: '+917676210310', whatsapp: '917676210310' },
      { display: '+91 74061 10611', tel: '+917406110611', whatsapp: '917406110611' }
    ],
    whatsapp: WHATSAPP.number,
    note: 'Uses the same central India enquiry numbers as the La Crown branch unless branch-specific numbers are supplied.'
  },
  {
    id: 'dubai',
    kind: 'physical',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    role: 'Dubai Branch',
    name: 'Dubai — Badr Al Samaa Medical Center',
    shortName: 'Dubai',
    addressLines: [
      'Badr Al Samaa Medical Center, Ground Floor',
      'Next to Sharaf DG Metro Station, Exit 1',
      'Khalid Bin Al Waleed Road, Mankhool, Bur Dubai',
      'Dubai, United Arab Emirates'
    ],
    postal: {
      streetAddress: 'Badr Al Samaa Medical Center, Ground Floor, Khalid Bin Al Waleed Road, Mankhool',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE'
    },
    mapQuery: 'Badr Al Samaa Medical Center, Khalid Bin Al Waleed Road, Mankhool, Bur Dubai, Dubai, United Arab Emirates',
    phones: [
      { display: '+971 50 128 9115', tel: '+971501289115' }
    ],
    whatsapp: '',
    note: 'Consultations in Dubai are held at Badr Al Samaa Medical Center in Mankhool, Bur Dubai. Confirm the appointment, the exact floor and the meeting point with the team before travelling.'
  }
];

const locations = rawLocations.map((location) => Object.assign({}, location, {
  address: location.addressLines.join(', '),
  mapUrl: location.mapQuery ? mapSearch(location.mapQuery) : '',
  directionsUrl: location.mapQuery ? mapDirections(location.mapQuery) : '',
  embedUrl: location.mapQuery ? mapEmbed(location.mapQuery) : '',
  whatsappUrl: location.whatsapp ? whatsappLink(location.whatsapp, WHATSAPP_MESSAGE) : '',
  phones: location.phones.map((phone) => Object.assign({}, phone, {
    whatsappUrl: phone.whatsapp ? whatsappLink(phone.whatsapp, WHATSAPP_MESSAGE) : ''
  }))
}));

const appointmentTopics = [
  'General breast-enlargement information',
  'Surgical breast enlargement',
  'Breast augmentation',
  'Breast implants',
  'Breast implant safety',
  'Fat transfer breast augmentation',
  'Breast lift surgery (mastopexy)',
  'Breast revision surgery',
  'Breast filler removal',
  'Breast reduction surgery',
  'Mastectomy and chest contouring surgery',
  'Non-surgical breast enhancement',
  'Breast fillers',
  'Thread procedures',
  'Mono threads',
  'PRP and regenerative treatments',
  'Biostimulators and Sculptra',
  'Stem cells and regenerative medicine',
  'Safety, risks or recovery',
  'Second opinion or choosing a surgeon',
  'Other / not sure'
];

const preferredTimes = [
  'Morning (10:00–13:00)',
  'Afternoon (14:00–17:00)',
  'Evening (17:00–19:00)',
  'Any time'
];

const preferredCountries = [
  'Hong Kong',
  'India',
  'United Arab Emirates',
  'Other / not sure'
];

const branches = locations.map((location) => ({
  value: location.id,
  label: location.name,
  country: location.country
})).concat([{ value: 'no-preference', label: 'No preference — advise me', country: 'Other / not sure' }]);

function organizationSchema(siteUrl) {
  const physical = locations.filter((location) => location.kind === 'physical');
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Quantum Health',
    url: siteUrl + '/',
    email: CONTACT_EMAIL,
    contactPoint: locations.reduce((points, location) => points.concat(location.phones.map((phone) => ({
      '@type': 'ContactPoint',
      telephone: phone.tel,
      contactType: 'appointment enquiries',
      areaServed: location.country,
      availableLanguage: ['English']
    }))), []),
    location: physical.map((location) => ({
      '@type': 'Place',
      name: 'Quantum Health — ' + location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.postal.streetAddress,
        addressLocality: location.postal.addressLocality,
        addressRegion: location.postal.addressRegion,
        addressCountry: location.postal.addressCountry
      },
      telephone: location.phones[0].tel,
      hasMap: location.mapUrl
    }))
  };
}

module.exports = {
  CONTACT_EMAIL,
  WHATSAPP,
  WHATSAPP_MESSAGE,
  locations,
  appointmentTopics,
  preferredTimes,
  preferredCountries,
  branches,
  telHref,
  whatsappLink,
  organizationSchema
};
