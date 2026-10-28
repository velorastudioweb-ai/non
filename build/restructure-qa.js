'use strict';
// Structural checks specific to the canonical route migration.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { allPages, site, redirects, sections, surgical, nonsurgical, education } = require('./structure');
const dist = path.join(__dirname, '..', 'dist');
const pages = new Map(allPages.map((p) => [p.url, p]));
const html = (url) => fs.readFileSync(path.join(dist, url.replace(/^\//, ''), 'index.html'), 'utf8');
assert.equal(pages.size, allPages.length, 'Canonical routes must be unique');
assert.equal(surgical.length, 9);
assert.equal(nonsurgical.length, 9);
assert.deepEqual(site.nav.map((n) => n.label), ['Home', 'Surgical Breast Enlargement', 'Non-Surgical Breast Enlargement', 'Education & Research', 'Blogs', 'About', 'Contact us']);
assert(!pages.has('/doctors/') && !pages.has('/leadership/dr-sunitha-devaraj/'), 'Doctor directory and leadership must be consolidated into About');
assert(redirects.some((r) => r.from === '/doctors/' && r.to === '/about-us/#our-doctors'));
assert(redirects.some((r) => r.from === '/leadership/dr-sunitha-devaraj/' && r.to === '/about-us/#leadership'));
const aboutHtml = html('/about-us/');
assert(aboutHtml.includes('id="our-doctors"'), 'About must contain the doctors directory');
assert(aboutHtml.includes('id="leadership"'), 'About must contain the leadership reference');
assert(aboutHtml.includes('id="contact"') && aboutHtml.includes('href="/contact/">Contact us</a>'), 'About must end with a website-contact CTA');
assert.equal((aboutHtml.match(/class="qh-card qh-doctor-card"/g) || []).length, 8, 'About must retain all eight doctor cards');
assert.equal((aboutHtml.match(/<h4>Profile-listed expertise<\/h4>/g) || []).length, 8, 'Each doctor card must label supplied expertise');
assert.equal((aboutHtml.match(/<h4>Profile-listed qualifications<\/h4>/g) || []).length, 8, 'Each doctor card must label supplied qualifications');
const { doctors } = require('./quantum-health');
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
for (const doctor of doctors) {
  assert(aboutHtml.includes(doctor.name), 'Doctor name missing from About: ' + doctor.name);
  assert(aboutHtml.includes('href="' + doctor.profileUrl + '"'), 'Doctor profile link missing from About: ' + doctor.profileUrl);
  const expertise = (doctor.specialisations && doctor.specialisations.length ? doctor.specialisations : [doctor.designation])
    .flatMap((item) => String(item || '').split('|')).map((item) => item.trim()).filter((item) => item && !/\bexpert\b/i.test(item));
  expertise.forEach((item) => assert(aboutHtml.includes(escapeHtml(item)), 'Profile-listed expertise missing from About: ' + item));
  const qualifications = doctor.qualifications.length ? doctor.qualifications : (doctor.suppliedQualifications || []);
  qualifications.forEach((item) => assert(aboutHtml.includes(escapeHtml(item)), 'Profile-listed qualification missing from About: ' + item));
}
for (const phrase of [
  'OUR DOCTORS PANEL', 'EXPERTISE. EXPERIENCE. EXCEPTIONAL CARE.', 'LOOK BETTER',
  'FEEL SEXIER', 'BE MORE CONFIDENT', 'A GLOBAL TEAM FOR A BEAUTIFUL, HEALTHIER YOU',
  'Founder &amp; CEO', 'Executive Director, Quantum Health',
  '38 Years Experience', 'Over 10 Years', 'BOOK CONSULTATION',
  'QUANTUM HEALTH STEMCELL RESORT', 'Approved professional portrait pending',
  'verification pending'
]) assert(!aboutHtml.includes(phrase), 'Unapproved About-page material remains: ' + phrase);
assert(aboutHtml.includes('does not provide treatment or medical consultations'), 'About must align with the educational-site purpose');
assert(aboutHtml.includes('not been independently verified'), 'Profile-listed details must not be presented as verified facts');
assert(aboutHtml.includes('does not represent or endorse the clinicians listed'), 'Doctor links must be framed as non-endorsing references');
const homeHtml = html('/');
assert(!homeHtml.includes('qh-home__'), 'Clinic-oriented promotional panel must not appear on the education-site homepage');
assert(!homeHtml.includes('This website provides general education only. Individual suitability, outcomes and risks vary and require assessment by a qualified clinician.'), 'Removed hero note remains on the homepage');
const contactHtml = html('/contact/');
assert(contactHtml.includes('id="cf-country-code" name="country_code" autocomplete="tel-country-code" required'), 'Contact form must require a country calling code');
assert(contactHtml.includes('id="cf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel-national" required'), 'Contact form must require a mobile number');
for (const interest of ['General breast-enlargement information', 'Surgical options', 'Non-surgical options', 'Evidence and research', 'Safety and risks', 'Content correction', 'Source or reference suggestion', 'General question about this website', 'Other']) {
  assert(contactHtml.includes('>' + interest + '</option>'), 'Contact interest option missing: ' + interest);
}
assert(contactHtml.includes('Phone follow-up is only about your website enquiry'), 'Contact page must limit phone follow-up to website enquiries');
assert(!contactHtml.includes('Preferred consultation location') && !contactHtml.includes('To be confirmed by the clinic'), 'Clinic-specific location fields must not appear on the education-site contact form');
const titles = new Set();
const retired = new Set(redirects.map((r) => r.from));
assert.equal(retired.size, redirects.length, 'Duplicate redirect sources');
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
for (const p of allPages) {
  assert(!retired.has(p.url), 'Retained route is also retired: ' + p.url);
  assert(!titles.has(p.seoTitle), 'Duplicate title: ' + p.seoTitle);
  titles.add(p.seoTitle);
  const doc = html(p.url);
  const main = doc.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  assert(main.replace(/<[^>]+>/g, '').trim().length > 150, 'Empty page: ' + p.url);
  if (p.url !== '/about-us/' && !p.url.startsWith('/doctors/')) {
    assert(!/MedicHorizon|Dr\.\s*Vikas|\bour clinic\b|editorial draft/i.test(main), 'Unrelated branding or placeholder: ' + p.url);
  }
  const ids = [...doc.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML id: ' + p.url);
  for (const m of doc.matchAll(/href="(\/[^"?]*)"/g)) {
    const [route, hash] = m[1].split('#');
    assert(!retired.has(route), 'Internal link goes through redirect: ' + p.url + ' -> ' + route);
    if (hash && pages.has(route)) assert(html(route).includes('id="' + hash + '"'), 'Broken cross-page anchor: ' + m[1]);
  }
  assert(p.noindex || sitemap.includes(site.url + p.url + '</loc>'), 'Missing sitemap URL: ' + p.url);
}
for (const r of redirects) {
  const [route, hash] = r.to.split('#');
  assert(pages.has(route), 'Redirect target missing: ' + r.to);
  assert(!retired.has(route), 'Redirect chain: ' + r.from);
  assert(!sitemap.includes(site.url + r.from + '</loc>'), 'Retired URL in sitemap');
  if (hash) assert(html(route).includes('id="' + hash + '"'), 'Redirect anchor missing: ' + r.to);
}
for (const [i, entries] of [surgical, nonsurgical, education].entries()) {
  const landing = html(sections[i].href);
  entries.forEach(([url]) => assert(landing.includes('href="' + url + '"'), 'Topic missing from section: ' + url));
}
const vercel = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'vercel.json')));
assert.deepEqual(vercel.redirects, redirects.map((r) => ({ source: r.from, destination: r.to, permanent: true })), 'Run node build/sync-redirects.js');
console.log('Canonical migration QA: ' + allPages.length + ' retained routes, ' + redirects.length + ' redirects; titles, content, topic membership, direct internal links, anchors and sitemap verified.');
