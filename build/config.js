'use strict';

const site = {
  brand: 'QuantumHealth',
  brandSuffix: 'by Dr. Vikas Singh',
  tagline: 'A More Informed Approach to Breast Enhancement',
  url: 'https://non-surgicalbreastenlargement.in',
  ga4: 'G-XXXXXXXXXX',
  whatsapp: '919000000000',
  phoneDisplay: '+91 90000 00000',
  phoneTel: '+919000000000',
  email: 'care@quantumhealth.example',
  defaultLocale: 'en-IN',
  languages: [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'ar', label: 'العربية' }
  ]
};
const countries = {
  in: { code: 'in', hreflang: 'en-IN', name: 'India', currency: 'INR', currencySymbol: '₹', city: 'Mumbai', phoneTel: '+919000000000', phoneDisplay: '+91 90000 00000', whatsapp: '919000000000', testimonials: false, beforeAfter: false, costRange: '₹1,80,000 – ₹4,50,000', costNotes: '' },
  uae: { code: 'uae', hreflang: 'en-AE', name: 'UAE', currency: 'AED', currencySymbol: 'AED', city: 'Dubai', phoneTel: '+97140000000', phoneDisplay: '+971 4 000 0000', whatsapp: '97140000000', testimonials: true, beforeAfter: true, costRange: 'AED 25,000 – AED 45,000', costNotes: '' },
  uk: { code: 'uk', hreflang: 'en-GB', name: 'UK', currency: 'GBP', currencySymbol: '£', city: 'London', phoneTel: '+442000000000', phoneDisplay: '+44 20 0000 0000', whatsapp: '442000000000', testimonials: true, beforeAfter: true, costRange: '£6,000 – £9,500', costNotes: '' }
};
const surgeons = { 'vikas-singh': { slug: 'vikas-singh', name: 'Dr. Vikas Singh', title: 'Consultant Plastic, Reconstructive & Aesthetic Surgeon', qualifications: ['MBBS', 'MS', 'MCh (Plastic Surgery)'], registration: 'State Medical Council Reg. No. PLACEHOLDER-REG', memberships: ['APSI', 'IAAPS'], experience: '15+ years', focus: ['Breast augmentation'], languages: ['English', 'Hindi'], bio: ['Surgeon-led, education-first practice.'] } };
const compliance = { disclaimer: 'This page is educational information, not medical advice, and is not a substitute for an in-person consultation with a qualified surgeon. Individual suitability, risks and outcomes vary.', noGuarantee: 'No outcome, cup size or result is guaranteed.' };
module.exports = { site, countries, surgeons, compliance };
