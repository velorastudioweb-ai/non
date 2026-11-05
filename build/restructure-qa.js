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
assert.equal(nonsurgical.length, 10);
assert.deepEqual(site.nav.map((n) => n.label), ['Home', 'Surgical Breast Enlargement', 'Non-Surgical Breast Enlargement', 'Blogs', 'Locations', 'Dr. Vikas Singh', 'Contact us']);
const doctorsNav = site.nav.find((n) => n.label === 'Dr. Vikas Singh');
assert(doctorsNav && doctorsNav.href === '/doctors/dr-vikas-singh/', 'Primary navigation must link to the Dr. Vikas Singh profile page');
assert(!site.nav.some((n) => n.href === '/education-research/'), 'Education & Research must not remain in the primary navigation');
assert(!pages.has('/doctors/') && !pages.has('/leadership/dr-sunitha-devaraj/') && !pages.has('/meet-doctors/'), 'Doctor directory must live at /doctors/dr-vikas-singh/ and leadership must be consolidated into About');
assert(redirects.some((r) => r.from === '/doctors/' && r.to === '/doctors/dr-vikas-singh/'));
assert(redirects.some((r) => r.from === '/meet-doctors/' && r.to === '/doctors/dr-vikas-singh/'));
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
const nanditaHtml = html('/doctors/dr-nandita/');
assert(nanditaHtml.includes('Portrait of Dr. Nandita'), 'Dr. Nandita must show her supplied portrait');
assert(!nanditaHtml.includes('qh-portrait--initials'), 'Dr. Nandita must not use the initials fallback');
const subraminiHtml = html('/doctors/dr-subramini/');
assert(subraminiHtml.includes('Portrait of Dr. Subramini'), 'Dr. Subramini must show his supplied portrait');
assert(!subraminiHtml.includes('qh-portrait--initials'), 'Dr. Subramini must not use the initials fallback');
const homeHtml = html('/');
assert(!homeHtml.includes('qh-home__'), 'Clinic-oriented promotional panel must not appear on the education-site homepage');
assert(!homeHtml.includes('This website provides general education only. Individual suitability, outcomes and risks vary and require assessment by a qualified clinician.'), 'Removed hero note remains on the homepage');
const contactHtml = html('/contact/');
assert(contactHtml.includes('id="cf-country-code" name="country_code" autocomplete="tel-country-code" required'), 'Contact form must require a country calling code');
assert(contactHtml.includes('id="cf-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel-national" required'), 'Contact form must require a mobile number');
assert(contactHtml.includes('id="cf-preferred-country" name="preferred_country"'), 'Contact form must collect a preferred country');
assert(contactHtml.includes('id="cf-preferred-branch" name="preferred_branch"'), 'Contact form must collect a preferred branch');
assert(contactHtml.includes('id="cf-topic" name="topic"'), 'Contact form must collect a treatment or consultation topic');
assert(contactHtml.includes('id="cf-date" name="preferred_date" type="date"'), 'Contact form must collect a preferred date');
assert(contactHtml.includes('id="cf-time" name="preferred_time"'), 'Contact form must collect a preferred time');
assert(contactHtml.includes('No appointment is confirmed until the team replies.'), 'Contact form must not imply an appointment is confirmed');
assert(contactHtml.includes('data-fallback-email="' + site.contact.email + '"'), 'Contact form must expose the fallback mailbox');
assert(!contactHtml.includes('Preferred consultation location') && !contactHtml.includes('To be confirmed by the clinic'), 'Clinic-specific location fields must not appear on the education-site contact form');
const { articles } = require('./published-blogs');
const blogIndexHtml = html('/blogs/');
assert.equal(articles.length, 10, 'The published blog index must contain ten articles');
assert(!blogIndexHtml.includes('before-after'), 'The blog index must not contain a Before & After section');
assert(!blogIndexHtml.includes('figure-feature'), 'The blog index must not contain a Before & After figure');
for (const category of ['All Articles', 'Breast Enlargement Education', 'Patient Perspectives']) {
  assert(blogIndexHtml.includes('data-blog-filter="' + category + '"'), 'Blog category filter missing: ' + category);
}
const vikasHtml = html('/doctors/dr-vikas-singh/');
for (const phrase of ['ABOUT DR. VIKAS SINGH', 'An International Medical Presence', 'Indian Clinical Network', 'Bengaluru locations', 'Contact & Enquiries', 'drvikas090909@gmail.com']) {
  assert(vikasHtml.includes(phrase), 'Dr. Vikas Singh profile missing: ' + phrase);
}
for (const article of articles) {
  const articleHtml = html('/blogs/' + article.slug + '/');
  assert(articleHtml.includes('· ' + article.readingMinutes + ' min read'), 'Calculated reading time missing: ' + article.slug);
  assert(articleHtml.includes('"timeRequired":"PT' + article.readingMinutes + 'M"'), 'Schema reading time missing: ' + article.slug);
  assert(blogIndexHtml.includes(article.date + ' · ' + article.readingMinutes + ' min read'), 'Calculated card reading time missing: ' + article.slug);
  if (article.perspective) assert(articleHtml.includes('Illustrative scenario:'), 'Fictional-scenario disclosure missing: ' + article.slug);
}
assert(!blogIndexHtml.includes('8 min read'), 'The blog index must not retain a fixed reading-time label');
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
  if (!p.url.startsWith('/doctors/') && p.url !== '/about-us/') assert(main.replace(/<[^>]+>/g, '').trim().length > 100, 'Empty page: ' + p.url);
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
const csp = vercel.headers[0].headers.find((header) => header.key === 'Content-Security-Policy').value;
assert(csp.includes("script-src 'self' 'sha256-0J0RsGwLZayEXDRx+sgvWKXPOoYRvfRKOkUvovNIKxw='"), 'CSP must allow only the hashed progressive-enhancement bootstrap');
assert(!csp.includes("script-src 'self' 'unsafe-inline'"), 'CSP must not broadly allow inline scripts');
assert.deepEqual(vercel.redirects, redirects.map((r) => ({ source: r.from, destination: r.to, permanent: true })), 'Run node build/sync-redirects.js');
console.log('Canonical migration QA: ' + allPages.length + ' retained routes, ' + redirects.length + ' redirects; titles, content, topic membership, direct internal links, anchors and sitemap verified.');
