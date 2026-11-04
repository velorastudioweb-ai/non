'use strict';
const L = require('./lib');
const R = require('./render');

/* ------------- slug helpers ------------- */
function urlToSlug(pathname) {
  const p = String(pathname || '/').split('?')[0].split('#')[0];
  const seg = p.replace(/^\/+|\/+$/g, '');
  if (!seg || seg === 'index') return 'home';
  return seg.replace(/\/+$/, '').replace(/\//g, '-').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
}

/* ------------- document helpers ------------- */
async function pagesMeta() { return L.readDoc('pages/index.json', { pages: {} }); }
async function writePageMeta(slug, patch) {
  const meta = await pagesMeta();
  meta.pages[slug] = Object.assign({}, meta.pages[slug], patch, { updatedAt: L.nowIso() });
  await L.writeDoc('pages/index.json', meta);
  return meta.pages[slug];
}
async function audit(entry) {
  const log = await L.readDoc('audit.json', { entries: [] });
  log.entries.unshift(Object.assign({ at: L.nowIso(), actor: 'admin' }, entry));
  log.entries = log.entries.slice(0, 300);
  await L.writeDoc('audit.json', log);
}
async function addRevision(slug, doc, label) {
  const revs = await L.readDoc(`pages/${slug}/revisions.json`, { list: [] });
  const rev = 'r' + Date.now().toString(36);
  revs.list.unshift({ rev, at: L.nowIso(), label: label || 'published', doc });
  revs.list = revs.list.slice(0, 40);
  await L.writeDoc(`pages/${slug}/revisions.json`, revs);
  return rev;
}

/* ------------- validation of overlay documents ------------- */
const FIELD_KEYS = ['text', 'html', 'src', 'srcBase', 'width', 'height', 'alt', 'href', 'hidden', 'style'];
function validateOverlay(doc) {
  if (!doc || typeof doc !== 'object') throw Object.assign(new Error('invalid document'), { status: 422 });
  const out = { v: 1, seo: null, sections: {}, order: null, added: [], doctorsGrid: null };
  if (doc.seo && typeof doc.seo === 'object') {
    out.seo = {
      title: L.clean(doc.seo.title, 180) || undefined,
      description: L.clean(doc.seo.description, 320) || undefined,
      noindex: doc.seo.noindex === true || undefined
    };
    if (!out.seo.title && !out.seo.description && !out.seo.noindex) out.seo = null;
  }
  const sections = doc.sections && typeof doc.sections === 'object' ? doc.sections : {};
  Object.keys(sections).forEach((sid) => {
    if (!/^s\d+$/.test(sid)) return;
    const s = sections[sid] || {};
    const entry = {};
    if (s.hidden === true) entry.hidden = true;
    if (typeof s.html === 'string' && s.html.trim()) entry.html = L.sanitizeHtml(s.html);
    if (s.bg && /^#[0-9a-fA-F]{3,6}$/.test(String(s.bg))) entry.bg = String(s.bg);
    if (['left', 'center', 'right'].includes(s.align)) entry.align = s.align;
    if (['tight', 'normal', 'relaxed'].includes(s.spacing)) entry.spacing = s.spacing;
    const fields = s.fields && typeof s.fields === 'object' ? s.fields : {};
    const fOut = {};
    Object.keys(fields).forEach((fid) => {
      if (!/^f\d+$/.test(fid)) return;
      const f = fields[fid] || {};
      const fo = {};
      FIELD_KEYS.forEach((k) => {
        if (f[k] === undefined || f[k] === null || f[k] === '') return;
        if (k === 'html') fo.html = L.sanitizeHtml(f.html);
        else if (k === 'text') fo.text = String(f.text).slice(0, 20000);
        else if (k === 'src' || k === 'srcBase' || k === 'href') fo[k] = L.safeUrl(f[k]);
        else if (k === 'alt') fo.alt = String(f.alt).slice(0, 300);
        else if (k === 'width' || k === 'height') fo[k] = Math.max(1, Math.min(6000, Number(f[k]) || 0)) || undefined;
        else if (k === 'hidden') fo.hidden = f.hidden === true || undefined;
        else if (k === 'style') {
          const st = f.style || {};
          const so = {};
          if (st.color && /^#[0-9a-fA-F]{3,6}$/.test(st.color)) so.color = st.color;
          if (['left', 'center', 'right'].includes(st.align)) so.align = st.align;
          if (st.bold === true) so.bold = true;
          if (Object.keys(so).length) fo.style = so;
        }
      });
      if (Object.keys(fo).length) fOut[fid] = fo;
    });
    if (Object.keys(fOut).length) entry.fields = fOut;
    if (Object.keys(entry).length) out.sections[sid] = entry;
  });
  if (Array.isArray(doc.order) && doc.order.every((x) => /^s\d+$/.test(x))) out.order = doc.order;
  const added = (doc.added || []).filter((a) => a && typeof a.html === 'string').map((a) => ({
    id: /^a[\w-]{1,40}$/.test(String(a.id)) ? String(a.id) : L.id('a'),
    name: L.clean(a.name, 80),
    html: L.sanitizeHtml(a.html)
  })).slice(0, 60);
  out.added = added;
  if (doc.doctorsGrid && typeof doc.doctorsGrid.html === 'string') {
    out.doctorsGrid = { html: L.sanitizeHtml(doc.doctorsGrid.html) };
  }
  return out;
}

function validateSite(doc) {
  const s = doc || {};
  const out = {
    updatedAt: L.nowIso(),
    contacts: {
      email: /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(String(s.contacts && s.contacts.email)) ? String(s.contacts.email).trim().toLowerCase() : '',
      phoneDisplay: L.clean(s.contacts && s.contacts.phoneDisplay, 40),
      phoneTel: L.clean(s.contacts && s.contacts.phoneTel, 30).replace(/[^\d+]/g, ''),
      whatsappNumber: L.clean(s.contacts && s.contacts.whatsappNumber, 30).replace(/[^\d]/g, ''),
      whatsappDisplay: L.clean(s.contacts && s.contacts.whatsappDisplay, 40),
      whatsappMessage: String((s.contacts && s.contacts.whatsappMessage) || '').slice(0, 400),
      numbers: (s.contacts && Array.isArray(s.contacts.numbers) ? s.contacts.numbers : []).map((n) => ({
        id: L.clean(n.id, 30) || L.id('n'),
        display: L.clean(n.display, 40),
        tel: L.clean(n.tel, 30).replace(/[^\d+]/g, ''),
        whatsapp: n.whatsapp ? L.clean(n.whatsapp, 30).replace(/[^\d]/g, '') : '',
        branch: L.clean(n.branch, 60)
      })).filter((n) => n.tel).slice(0, 40)
    },
    locations: (Array.isArray(s.locations) ? s.locations : []).map((l, i) => ({
      id: L.clean(l.id, 40) || 'loc-' + i,
      name: L.clean(l.name, 90),
      shortName: L.clean(l.shortName, 60),
      role: L.clean(l.role, 60),
      country: L.clean(l.country, 40),
      addressLines: (Array.isArray(l.addressLines) ? l.addressLines : []).map((x) => L.clean(x, 120)).filter(Boolean).slice(0, 6),
      phones: (Array.isArray(l.phones) ? l.phones : []).map((p) => ({
        display: L.clean(p.display, 40), tel: L.clean(p.tel, 30).replace(/[^\d+]/g, ''),
        whatsapp: p.whatsapp ? L.clean(p.whatsapp, 30).replace(/[^\d]/g, '') : ''
      })).filter((p) => p.tel).slice(0, 8),
      mapQuery: L.clean(l.mapQuery, 240),
      hours: L.clean(l.hours, 160),
      email: /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(String(l.email)) ? String(l.email).trim() : '',
      note: String(l.note || '').slice(0, 500),
      image: l.image && typeof l.image === 'object' ? { src: L.safeUrl(l.image.src), alt: L.clean(l.image.alt, 200) } : null
    })).filter((l) => l.name).slice(0, 30),
    nav: (Array.isArray(s.nav) ? s.nav : []).map((n) => ({
      label: L.clean(n.label, 60), href: L.safeUrl(n.href), shortLabel: L.clean(n.shortLabel, 40),
      hidden: n.hidden === true || undefined,
      children: (Array.isArray(n.children) ? n.children : []).map((c) => ({ label: L.clean(c.label, 60), href: L.safeUrl(c.href) })).slice(0, 20)
    })).filter((n) => n.label && n.href).slice(0, 12),
    footer: {
      blurb: String((s.footer && s.footer.blurb) || '').slice(0, 1200),
      note: String((s.footer && s.footer.note) || '').slice(0, 400),
      explore: (s.footer && Array.isArray(s.footer.explore) ? s.footer.explore : []).map((x) => ({ label: L.clean(x.label, 60), href: L.safeUrl(x.href) })).slice(0, 20),
      patient: (s.footer && Array.isArray(s.footer.patient) ? s.footer.patient : []).map((x) => ({ label: L.clean(x.label, 60), href: L.safeUrl(x.href) })).slice(0, 20),
      legal: (s.footer && Array.isArray(s.footer.legal) ? s.footer.legal : []).map((x) => ({ label: L.clean(x.label, 60), href: L.safeUrl(x.href) })).slice(0, 10),
      social: (s.footer && Array.isArray(s.footer.social) ? s.footer.social : []).map((x) => ({ label: L.clean(x.label, 40), href: L.safeUrl(x.href) })).slice(0, 8)
    },
    theme: {
      colors: {
        navGold: L.colorOr(s.theme && s.theme.colors && s.theme.colors.navGold, '#D4AF37'),
        navGoldLight: L.colorOr(s.theme && s.theme.colors && s.theme.colors.navGoldLight, '#F0D58B'),
        navGoldDark: L.colorOr(s.theme && s.theme.colors && s.theme.colors.navGoldDark, '#9C7628'),
        bg: L.colorOr(s.theme && s.theme.colors && s.theme.colors.bg, '#4A0F24'),
        burgundy: L.colorOr(s.theme && s.theme.colors && s.theme.colors.burgundy, '#641B35'),
        card: L.colorOr(s.theme && s.theme.colors && s.theme.colors.card, '#300A19'),
        heading: L.colorOr(s.theme && s.theme.colors && s.theme.colors.heading, '#FFF0E8'),
        gold: L.colorOr(s.theme && s.theme.colors && s.theme.colors.gold, '#D8B58A')
      },
      goldNav: s.theme ? s.theme.goldNav !== false : true,
      animation: ['full', 'reduced', 'off'].includes(s.theme && s.theme.animation) ? s.theme.animation : 'full'
    },
    settings: {
      whatsappPrefill: String((s.settings && s.settings.whatsappPrefill) || '').slice(0, 400),
      formNotifyEmail: /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(String(s.settings && s.settings.formNotifyEmail)) ? String(s.settings.formNotifyEmail).trim().toLowerCase() : '',
      siteName: L.clean(s.settings && s.settings.siteName, 60) || 'Quantum Health',
      headerCta: { label: L.clean(s.settings && s.settings.headerCta && s.settings.headerCta.label, 40), href: L.safeUrl(s.settings && s.settings.headerCta && s.settings.headerCta.href) }
    }
  };
  if (!out.contacts.email) delete out.contacts.email;
  return out;
}

function validateDoctors(doc) {
  const list = (Array.isArray(doc && doc.list) ? doc.list : []).map((d, i) => ({
    id: L.clean(d.id, 30) || 'doc-' + i,
    name: L.clean(d.name, 90),
    designation: L.clean(d.designation, 120),
    qualifications: (Array.isArray(d.qualifications) ? d.qualifications : []).map((x) => L.clean(x, 120)).filter(Boolean).slice(0, 12),
    suppliedQualifications: (Array.isArray(d.suppliedQualifications) ? d.suppliedQualifications : []).map((x) => L.clean(x, 120)).filter(Boolean).slice(0, 12),
    credentialNote: String(d.credentialNote || '').slice(0, 400),
    specialisations: (Array.isArray(d.specialisations) ? d.specialisations : []).map((x) => L.clean(x, 120)).filter(Boolean).slice(0, 14),
    experience: L.clean(d.experience, 120),
    bio: (Array.isArray(d.bio) ? d.bio : []).map((x) => String(x).slice(0, 1500)).filter(Boolean).slice(0, 8),
    locations: (Array.isArray(d.locations) ? d.locations : []).map((x) => L.clean(x, 120)).filter(Boolean).slice(0, 12),
    awards: (Array.isArray(d.awards) ? d.awards : []).map((x) => L.clean(x, 160)).filter(Boolean).slice(0, 12),
    contact: {
      phone: L.clean(d.contact && d.contact.phone, 30),
      whatsapp: L.safeUrl(d.contact && d.contact.whatsapp),
      email: /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(String(d.contact && d.contact.email)) ? String(d.contact.email).trim() : '',
      reference: L.safeUrl(d.contact && d.contact.reference)
    },
    profileUrl: L.safeUrl(d.profileUrl || '/contact/'),
    portrait: d.portrait && d.portrait.src ? { src: L.safeUrl(d.portrait.src), alt: L.clean(d.portrait.alt, 200) || undefined, width: Number(d.portrait.width) || undefined, height: Number(d.portrait.height) || undefined } : null,
    visible: d.visible !== false,
    order: Number.isFinite(d.order) ? d.order : i
  })).filter((d) => d.name).slice(0, 40);
  return { list, updatedAt: L.nowIso() };
}

/* ------------- session / auth ------------- */
const SESSION_COOKIE = 'qh_admin';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

async function currentSession(req) {
  const token = L.parseCookies(req)[SESSION_COOKIE];
  if (!token || token.length > 80) return null;
  const sess = await L.readDoc('sessions/' + token + '.json', null);
  if (!sess || !sess.email) return null;
  if (Date.now() - (sess.lastSeenTs || sess.createdAtTs) > SESSION_TTL_MS) {
    try { await L.deleteDoc('sessions/' + token + '.json'); } catch {}
    return null;
  }
  return { token, sess };
}
async function touchSession(token, req) {
  const sess = await L.readDoc('sessions/' + token + '.json', null);
  if (!sess) return;
  sess.lastSeenTs = Date.now();
  sess.lastSeen = L.nowIso();
  sess.ip = L.clientIp(req);
  await L.writeDoc('sessions/' + token + '.json', sess);
}

/* ------------- media ------------- */
const MIME_EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' };
const EXT_MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif' };

/* public enquiry intake — used by api/contact.js and the admin API alike */
async function createEnquiry(value) {
  const receivedAt = L.nowIso();
  const eid = L.id('en').replace('en-', '');
  const key = `enquiries/${receivedAt.slice(0, 10)}-${eid}.json`;
  const doc = {
    id: eid, receivedAt,
    name: L.clean(value.name, 120), email: L.clean(value.email, 254).toLowerCase(),
    countryCode: L.clean(value.countryCode, 8), phone: L.clean(value.phone, 30),
    preferredCountry: L.clean(value.preferredCountry, 80), preferredBranch: L.clean(value.preferredBranch, 80),
    preferredBranchLabel: L.clean(value.preferredBranchLabel || value.preferredBranch, 120), topic: L.clean(value.topic, 160),
    preferredDate: L.clean(value.preferredDate, 20), preferredTime: L.clean(value.preferredTime, 80),
    message: String(value.message || '').slice(0, 4000), consent: value.consent === true,
    status: 'new', source: 'website'
  };
  await L.writeDoc(key, doc);
  return { ok: true, id: doc.id, key };
}

/* ------------- main dispatcher ------------- */
async function run(action, payload, ctx) {
  const { req, res } = ctx;

  /* ---- auth ---- */
  if (action === 'login') {
    const email = String(payload.email || '').trim().toLowerCase();
    const creds = await L.readDoc('credentials.json', null);
    if (!creds) throw Object.assign(new Error('Administrator not configured yet. Run the secure setup script on the server: node scripts/setup-admin.js'), { status: 503 });
    if (!L.rateLimit('login:' + L.clientIp(req), 8, 10 * 60 * 1000)) throw Object.assign(new Error('Too many login attempts. Wait a few minutes.'), { status: 429 });
    if (email !== creds.email || !L.verifyPassword(payload.password || '', creds.hash)) {
      creds.failed = (creds.failed || 0) + 1; creds.lastFail = L.nowIso();
      await L.writeDoc('credentials.json', creds);
      throw Object.assign(new Error('Email or password is incorrect.'), { status: 401 });
    }
    if (creds.lockedUntil && Date.now() < creds.lockedUntil) throw Object.assign(new Error('Account temporarily locked after repeated failures. Try again later.'), { status: 429 });
    if (creds.totpSecret) {
      if (!payload.code) return { step: 'totp' };
      if (!L.totpVerify(creds.totpSecret, payload.code)) throw Object.assign(new Error('Incorrect two-factor code.'), { status: 401 });
    }
    creds.failed = 0; delete creds.lockedUntil;
    await L.writeDoc('credentials.json', creds);
    const token = L.id('sess').replace('sess-', '') + L.id('x').slice(4);
    await L.writeDoc('sessions/' + token + '.json', { email, createdAt: L.nowIso(), createdAtTs: Date.now(), lastSeenTs: Date.now(), ip: L.clientIp(req) });
    L.setCookie(res, SESSION_COOKIE, token, { maxAge: SESSION_TTL_MS / 1000 });
    await audit({ action: 'login', actor: email });
    return { ok: true, email };
  }
  if (action === 'logout') {
    const cur = await currentSession(req);
    if (cur) { await L.deleteDoc('sessions/' + cur.token + '.json'); L.clearCookie(res, SESSION_COOKIE); await audit({ action: 'logout' }); }
    return { ok: true };
  }
  if (action === 'me') {
    const cur = await currentSession(req);
    const creds = await L.readDoc('credentials.json', null);
    return { signedIn: !!cur, email: cur ? cur.sess.email : null, totp: !!(creds && creds.totpSecret), setupRequired: !creds };
  }

  /* ---- everything below requires an active admin session ---- */
  const cur = await currentSession(req);
  if (!cur) throw Object.assign(new Error('Not signed in.'), { status: 401 });
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && String(req.headers['x-qh-request'] || '') !== '1') {
    throw Object.assign(new Error('Missing CMS request header (CSRF protection).'), { status: 403 });
  }
  touchSession(cur.token, req).catch(() => {});

  switch (action) {
    /* ---- pages / overlay ---- */
    case 'page.get': {
      const slug = L.clean(payload.slug, 80);
      const [published, draft, revisions, meta] = await Promise.all([
        L.readDoc(`pages/${slug}/published.json`, null),
        L.readDoc(`pages/${slug}/draft.json`, null),
        L.readDoc(`pages/${slug}/revisions.json`, { list: [] }),
        pagesMeta()
      ]);
      return { slug, published, draft, revisions: revisions.list, meta: meta.pages[slug] || null };
    }
    case 'page.saveDraft': {
      const slug = L.clean(payload.slug, 80);
      const doc = validateOverlay(payload.doc);
      await L.writeDoc(`pages/${slug}/draft.json`, doc);
      const m = await writePageMeta(slug, { hasDraft: true, draftAt: L.nowIso() });
      await audit({ action: 'draft.save', slug });
      return { ok: true, meta: m };
    }
    case 'page.publish': {
      const slug = L.clean(payload.slug, 80);
      const draft = await L.readDoc(`pages/${slug}/draft.json`, null);
      if (!draft) throw Object.assign(new Error('Nothing to publish — save a draft first.'), { status: 422 });
      const previous = await L.readDoc(`pages/${slug}/published.json`, null);
      if (previous) await addRevision(slug, previous, 'replaced by ' + L.nowIso().slice(0, 10));
      await L.writeDoc(`pages/${slug}/published.json`, draft);
      await writePageMeta(slug, { published: true, hasDraft: false, publishedAt: L.nowIso() });
      await audit({ action: 'publish', slug });
      return { ok: true };
    }
    case 'page.unpublish': {
      const slug = L.clean(payload.slug, 80);
      const previous = await L.readDoc(`pages/${slug}/published.json`, null);
      if (previous) await addRevision(slug, previous, 'unpublished snapshot');
      try { await L.deleteDoc(`pages/${slug}/published.json`); } catch {}
      await writePageMeta(slug, { published: false });
      await audit({ action: 'unpublish', slug });
      return { ok: true };
    }
    case 'page.discardDraft': {
      const slug = L.clean(payload.slug, 80);
      try { await L.deleteDoc(`pages/${slug}/draft.json`); } catch {}
      await writePageMeta(slug, { hasDraft: false });
      return { ok: true };
    }
    case 'page.revisions': {
      const slug = L.clean(payload.slug, 80);
      const revisions = await L.readDoc(`pages/${slug}/revisions.json`, { list: [] });
      return { list: revisions.list.map(({ rev, at, label }) => ({ rev, at, label })) };
    }
    case 'page.restore': {
      const slug = L.clean(payload.slug, 80);
      const rev = L.clean(payload.rev, 40);
      const revisions = await L.readDoc(`pages/${slug}/revisions.json`, { list: [] });
      const found = revisions.list.find((x) => x.rev === rev);
      if (!found) throw Object.assign(new Error('Revision not found.'), { status: 404 });
      const current = await L.readDoc(`pages/${slug}/published.json`, null);
      if (current) await addRevision(slug, current, 'before restore of ' + rev);
      await L.writeDoc(`pages/${slug}/published.json`, found.doc);
      await audit({ action: 'restore', slug, rev });
      return { ok: true };
    }
    case 'pages.list': {
      const [meta, site] = await Promise.all([pagesMeta(), L.readDoc('site.json', null)]);
      return { pages: meta.pages, siteUpdatedAt: site && site.updatedAt };
    }

    /* ---- doctors ---- */
    case 'doctors.get': {
      const doc = await L.readDoc('doctors.json', { list: [] });
      return doc;
    }
    case 'doctors.save': {
      const doc = validateDoctors(payload);
      await L.writeDoc('doctors.json', doc);
      await audit({ action: 'doctors.save', count: doc.list.length });
      if (payload.publish) {
        const grid = { html: R.doctorsSectionHtml(doc.list, 'Doctors') };
        const slug = 'meet-doctors';
        const published = await L.readDoc(`pages/${slug}/published.json`, null) || { seo: null, sections: {}, order: null, added: [], doctorsGrid: null };
        if (published.sections && published.sections.s1 && published.sections.s1.html) grid.previous = true;
        const overlay = validateOverlay(Object.assign({}, published, { doctorsGrid: grid }));
        await addRevision(slug, published, 'before doctors publish');
        await L.writeDoc(`pages/${slug}/published.json`, overlay);
        await writePageMeta(slug, { published: true, publishedAt: L.nowIso() });
        await audit({ action: 'doctors.publish', slug });
      }
      return { ok: true, list: doc.list };
    }

    /* ---- site (contacts, locations, nav, footer, theme, settings) ---- */
    case 'site.get': {
      return L.readDoc('site.json', null);
    }
    case 'site.save': {
      const previous = await L.readDoc('site.json', null);
      const doc = validateSite(payload);
      if (previous) {
        const revs = await L.readDoc('site-revisions.json', { list: [] });
        revs.list.unshift({ rev: 'sr' + Date.now().toString(36), at: L.nowIso(), doc: previous });
        revs.list = revs.list.slice(0, 30);
        await L.writeDoc('site-revisions.json', revs);
      }
      await L.writeDoc('site.json', doc);
      await audit({ action: 'site.save', scope: payload.scope || 'site' });
      return { ok: true, site: doc };
    }
    case 'site.revisions': return L.readDoc('site-revisions.json', { list: [] });
    case 'site.restore': {
      const revs = await L.readDoc('site-revisions.json', { list: [] });
      const found = revs.list.find((x) => x.rev === L.clean(payload.rev, 30));
      if (!found) throw Object.assign(new Error('Site revision not found.'), { status: 404 });
      await L.writeDoc('site.json', found.doc);
      await audit({ action: 'site.restore', rev: found.rev });
      return { ok: true };
    }

    /* ---- media ---- */
    case 'media.list': return L.readDoc('media/index.json', { assets: [] });
    case 'media.upload': {
      const dataUrl = String(payload.dataUrl || '');
      const m = dataUrl.match(/^data:(image\/(jpeg|png|webp|avif|gif));base64,([A-Za-z0-9+/=]+)$/);
      if (!m) throw Object.assign(new Error('Unsupported image data.'), { status: 422 });
      const buffer = Buffer.from(m[3], 'base64');
      if (buffer.length > 8 * 1024 * 1024) throw Object.assign(new Error('Image exceeds the 8 MB limit.'), { status: 413 });
      const ext = MIME_EXT[m[1]] || 'webp';
      const mediaId = L.id('img').replace('img-', '');
      const folder = L.clean(payload.folder, 30) || 'general';
      const path = `media/${folder}/${mediaId}.${ext}`;
      await L.writeBinary(path, buffer, m[1]);
      const index = await L.readDoc('media/index.json', { assets: [] });
      const asset = {
        id: mediaId, path, folder, ext, size: buffer.length,
        name: L.clean(payload.name, 90) || (mediaId + '.' + ext),
        alt: L.clean(payload.alt, 300),
        width: Number(payload.width) || undefined, height: Number(payload.height) || undefined,
        createdAt: L.nowIso(), updatedAt: L.nowIso()
      };
      index.assets.unshift(asset);
      await L.writeDoc('media/index.json', index);
      await audit({ action: 'media.upload', path });
      return { ok: true, asset, url: '/api/qh/file/' + path };
    }
    case 'media.update': {
      const index = await L.readDoc('media/index.json', { assets: [] });
      const a = index.assets.find((x) => x.id === L.clean(payload.id, 40));
      if (!a) throw Object.assign(new Error('Asset not found.'), { status: 404 });
      if (payload.alt !== undefined) a.alt = L.clean(payload.alt, 300);
      if (payload.name !== undefined) a.name = L.clean(payload.name, 90);
      if (payload.folder !== undefined) a.folder = L.clean(payload.folder, 30);
      a.updatedAt = L.nowIso();
      await L.writeDoc('media/index.json', index);
      return { ok: true, asset: a };
    }
    case 'media.delete': {
      const index = await L.readDoc('media/index.json', { assets: [] });
      const a = index.assets.find((x) => x.id === L.clean(payload.id, 40));
      if (!a) throw Object.assign(new Error('Asset not found.'), { status: 404 });
      if (!payload.force && a.usedBy && a.usedBy.length) throw Object.assign(new Error('Image is used by ' + a.usedBy.length + ' page(s). Confirm with force.'), { status: 409 });
      try { await L.deleteDoc(a.path); } catch {}
      index.assets = index.assets.filter((x) => x.id !== a.id);
      await L.writeDoc('media/index.json', index);
      await audit({ action: 'media.delete', path: a.path });
      return { ok: true };
    }

    /* ---- enquiries ---- */
    case 'enquiries.list': {
      const blobs = await L.listDocs('enquiries/');
      const items = [];
      for (const b of blobs.slice(0, 400)) {
        try {
          const doc = await L.readDoc(b.pathname.slice(L.PREFIX.length), null);
          if (doc) items.push(doc);
        } catch {}
      }
      return { items: items.sort((a, b) => String(b.receivedAt).localeCompare(String(a.receivedAt))) };
    }
    case 'enquiries.patch': {
      const key = L.clean(payload.key, 120);
      if (!/^enquiries\/[\w:.@+-]+\.json$/.test(key)) throw Object.assign(new Error('Bad enquiry key.'), { status: 422 });
      const doc = await L.readDoc(key, null);
      if (!doc) throw Object.assign(new Error('Enquiry not found.'), { status: 404 });
      if (payload.status) doc.status = ['new', 'contacted', 'scheduled', 'closed'].includes(payload.status) ? payload.status : doc.status;
      if (payload.note !== undefined) doc.note = String(payload.note).slice(0, 2000);
      doc.updatedAt = L.nowIso();
      await L.writeDoc(key, doc);
      await audit({ action: 'enquiry.update', key, status: doc.status });
      return { ok: true, doc };
    }
    case 'enquiries.delete': {
      const key = L.clean(payload.key, 120);
      if (!/^enquiries\/[\w:.@+-]+\.json$/.test(key)) throw Object.assign(new Error('Bad enquiry key.'), { status: 422 });
      await L.deleteDoc(key);
      await audit({ action: 'enquiry.delete', key });
      return { ok: true };
    }
    case 'enquiries.create': {
      return createEnquiry(payload.enquiry || {});
    }
    case 'enquiries.export': {
      const { items } = await run('enquiries.list', {}, ctx);
      const cols = ['id', 'receivedAt', 'status', 'name', 'email', 'countryCode', 'phone', 'preferredCountry', 'preferredBranchLabel', 'topic', 'preferredDate', 'preferredTime', 'message', 'note'];
      const csv = [cols.join(',')].concat(items.map((e) => cols.map((c) => '"' + String(e[c] == null ? '' : e[c]).replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"').join(','))).join('\r\n');
      return { csv, count: items.length };
    }

    /* ---- components / gallery ---- */
    case 'components.get': return L.readDoc('components.json', { blocks: [] });
    case 'components.save': {
      const blocks = (Array.isArray(payload.blocks) ? payload.blocks : []).map((b) => ({
        id: L.clean(b.id, 30) || L.id('cmp'),
        name: L.clean(b.name, 80),
        html: L.sanitizeHtml(String(b.html || ''))
      })).filter((b) => b.name).slice(0, 60);
      await L.writeDoc('components.json', { blocks, updatedAt: L.nowIso() });
      await audit({ action: 'components.save' });
      return { ok: true, blocks };
    }
    case 'gallery.get': return L.readDoc('gallery.json', { items: [] });
    case 'gallery.save': {
      const items = (Array.isArray(payload.items) ? payload.items : []).map((g, i) => ({
        id: L.clean(g.id, 30) || L.id('g'),
        title: L.clean(g.title, 90),
        category: L.clean(g.category, 60),
        caption: String(g.caption || '').slice(0, 400),
        before: g.before && g.before.src ? { src: L.safeUrl(g.before.src), alt: L.clean(g.before.alt, 200), width: Number(g.before.width) || undefined, height: Number(g.before.height) || undefined } : null,
        after: g.after && g.after.src ? { src: L.safeUrl(g.after.src), alt: L.clean(g.after.alt, 200), width: Number(g.after.width) || undefined, height: Number(g.after.height) || undefined } : null,
        consent: g.consent === true,
        published: g.published !== false,
        order: Number.isFinite(g.order) ? g.order : i
      })).filter((g) => g.title).slice(0, 100);
      const pageSlug = L.clean(payload.page, 80) || 'understanding-breast-enlargement';
      await L.writeDoc('gallery.json', { items, pageSlug, updatedAt: L.nowIso() });
      if (payload.publish) {
        const html = R.gallerySectionHtml(items, payload.heading || 'Before and after gallery', payload.lead);
        const published = await L.readDoc(`pages/${pageSlug}/published.json`, null) || { sections: {}, order: null, added: [] };
        const added = (published.added || []).filter((a) => a.id !== 'gallery-managed');
        added.push({ id: 'gallery-managed', name: 'Before & after gallery', html });
        const overlay = validateOverlay(Object.assign({}, published, { added }));
        await addRevision(pageSlug, published, 'before gallery publish');
        await L.writeDoc(`pages/${pageSlug}/published.json`, overlay);
        await writePageMeta(pageSlug, { published: true, publishedAt: L.nowIso() });
      }
      await audit({ action: 'gallery.save', publish: !!payload.publish });
      return { ok: true, items };
    }

    /* ---- audit / stats / placeholders ---- */
    case 'audit.list': {
      const log = await L.readDoc('audit.json', { entries: [] });
      return { entries: log.entries.slice(0, Number(payload.limit) || 100) };
    }
    case 'dashboard.stats': {
      const [meta, doctors, site, media, auditLog, gallery, components, enquiriesBlobs] = await Promise.all([
        pagesMeta(), L.readDoc('doctors.json', { list: [] }), L.readDoc('site.json', null),
        L.readDoc('media/index.json', { assets: [] }), L.readDoc('audit.json', { entries: [] }),
        L.readDoc('gallery.json', { items: [] }), L.readDoc('components.json', { blocks: [] }),
        L.listDocs('enquiries/')
      ]);
      const pages = Object.values(meta.pages || {});
      const missingImages = await missingImageAssets();
      return {
        sections: pages.reduce((n, p) => n + (p.sections || 0), 0),
        doctors: doctors.list.length,
        doctorsVisible: doctors.list.filter((d) => d.visible !== false).length,
        images: media.assets.length,
        branches: site ? site.locations.length : 0,
        enquiries: enquiriesBlobs.length,
        drafts: pages.filter((p) => p.hasDraft).length,
        published: pages.filter((p) => p.published).length,
        missingImages,
        gallery: gallery.items.length,
        components: components.blocks.length,
        recent: auditLog.entries.slice(0, 12)
      };
    }
    case 'placeholders.scan': {
      const findings = [];
      const docs = await L.listDocs('pages/');
      for (const b of docs) {
        if (!/(published|draft)\.json$/.test(b.pathname)) continue;
        const doc = await L.readDoc(b.pathname.slice(L.PREFIX.length), null);
        if (!doc) continue;
        const slug = b.pathname.slice(L.PREFIX.length).split('/')[1];
        const kind = /published/.test(b.pathname) ? 'published' : 'draft';
        scanPatterns(JSON.stringify(doc), findings, `${slug} (${kind})`);
      }
      const [doctors, site] = await Promise.all([L.readDoc('doctors.json', { list: [] }), L.readDoc('site.json', null)]);
      doctors.list.forEach((d) => {
        if (d.suppliedQualifications && d.suppliedQualifications.length) findings.push({ page: 'doctors/' + d.id, pattern: 'qualification-verification-pending', detail: d.credentialNote || 'Supplied qualifications require verification before being shown as verified.' });
        if (!d.portrait) findings.push({ page: 'doctors/' + d.id, pattern: 'portrait-pending', detail: 'No approved professional portrait supplied — a monogram placeholder is published.' });
        if (!d.qualifications.length && !d.suppliedQualifications.length) findings.push({ page: 'doctors/' + d.id, pattern: 'no-qualifications', detail: 'Doctor record has no qualifications entered.' });
      });
      if (site) {
        (site.contacts.numbers || []).forEach((n) => { if (/90000|0000000/.test(n.tel)) findings.push({ page: 'site.contacts', pattern: 'placeholder-number', detail: n.display }); });
        if (/example\./i.test(site.contacts.email || '')) findings.push({ page: 'site.contacts', pattern: 'placeholder-email', detail: site.contacts.email });
      }
      scanPatterns(JSON.stringify(await L.readDoc('gallery.json', { items: [] })), findings, 'gallery');
      return { findings: findings.slice(0, 300), baseScan: '/assets/data/qh-placeholders.json' };
    }
    case 'review-queue.list': {
      const queue = await L.readDoc('review-queue.json', { items: [] });
      const [doctors, site] = await Promise.all([L.readDoc('doctors.json', { list: [] }), L.readDoc('site.json', null)]);
      const dynamic = [];
      doctors.list.forEach((d) => {
        if (d.suppliedQualifications && d.suppliedQualifications.length) dynamic.push({ id: 'dq-' + d.id, page: 'meet-doctors', kind: 'Medical credentials', note: `${d.name}: qualifications shown as supplied; verify against registers before describing them as verified.` });
        if ((d.awards || []).length) dynamic.push({ id: 'da-' + d.id, page: 'meet-doctors', kind: 'Awards/affiliations', note: `${d.name}: awards require original certificates before publication.` });
      });
      (site && site.locations || []).forEach((l) => { if (l.hours) dynamic.push({ id: 'lh-' + l.id, page: 'locations', kind: 'Business hours', note: `${l.name}: verify published hours with the branch.` }); });
      return { items: queue.items.concat(dynamic) };
    }

    /* ---- admin security ---- */
    case 'security.password.change': {
      const creds = await L.readDoc('credentials.json', null);
      if (!creds) throw Object.assign(new Error('Setup missing.'), { status: 503 });
      if (!L.verifyPassword(payload.current || '', creds.hash)) throw Object.assign(new Error('Current password is incorrect.'), { status: 403 });
      const issues = L.passwordIssues(payload.next || '');
      if (issues.length) throw Object.assign(new Error('New password needs: ' + issues.join('; ')), { status: 422 });
      creds.hash = L.hashPassword(payload.next);
      creds.updatedAt = L.nowIso();
      await L.writeDoc('credentials.json', creds);
      // keep only this session; revoke the rest
      const sessions = await L.listDocs('sessions/');
      for (const s of sessions) {
        if (!s.pathname.endsWith(cur.token + '.json')) { try { await L.deleteDoc(s.pathname.slice(L.PREFIX.length)); } catch {} }
      }
      await audit({ action: 'security.password.change' });
      return { ok: true };
    }
    case 'security.totp.begin': {
      const creds = await L.readDoc('credentials.json', null);
      if (creds.totpSecret) throw Object.assign(new Error('Two-factor is already enabled.'), { status: 409 });
      creds.pendingSecret = L.totpSecret();
      await L.writeDoc('credentials.json', creds);
      const issuer = encodeURIComponent('Quantum Health');
      const account = encodeURIComponent(creds.email);
      return { secret: creds.pendingSecret, otpauth: `otpauth://totp/${issuer}:${account}?secret=${creds.pendingSecret}&issuer=${issuer}&digits=6&period=30` };
    }
    case 'security.totp.confirm': {
      const creds = await L.readDoc('credentials.json', null);
      if (!creds.pendingSecret || !L.totpVerify(creds.pendingSecret, payload.code)) throw Object.assign(new Error('Code does not match the displayed secret.'), { status: 422 });
      creds.totpSecret = creds.pendingSecret; delete creds.pendingSecret;
      await L.writeDoc('credentials.json', creds);
      await audit({ action: 'security.totp.enable' });
      return { ok: true };
    }
    case 'security.totp.disable': {
      const creds = await L.readDoc('credentials.json', null);
      if (!creds.totpSecret) return { ok: true };
      if (!L.verifyPassword(payload.password || '', creds.hash)) throw Object.assign(new Error('Password is incorrect.'), { status: 403 });
      delete creds.totpSecret;
      await L.writeDoc('credentials.json', creds);
      await audit({ action: 'security.totp.disable' });
      return { ok: true };
    }
    case 'security.sessions': {
      const sessions = await L.listDocs('sessions/');
      const out = [];
      for (const s of sessions.slice(0, 20)) {
        const doc = await L.readDoc(s.pathname.slice(L.PREFIX.length), null);
        if (doc) out.push({ tokenTail: s.pathname.slice(-10), createdAt: doc.createdAt, lastSeen: doc.lastSeen, current: s.pathname.endsWith(cur.token + '.json') });
      }
      return { sessions: out };
    }
    case 'security.logoutAll': {
      const sessions = await L.listDocs('sessions/');
      for (const s of sessions) { try { await L.deleteDoc(s.pathname.slice(L.PREFIX.length)); } catch {} }
      L.clearCookie(res, SESSION_COOKIE);
      await audit({ action: 'security.logoutAll' });
      return { ok: true };
    }

    /* ---- backup ---- */
    case 'backup.export': {
      const names = ['site.json', 'doctors.json', 'pages/index.json', 'media/index.json', 'components.json', 'gallery.json', 'review-queue.json', 'audit.json'];
      const bundle = { exportedAt: L.nowIso(), docs: {} };
      for (const n of names) bundle.docs[n] = await L.readDoc(n, null);
      const meta = await pagesMeta();
      for (const slug of Object.keys(meta.pages || {})) {
        bundle.docs[`pages/${slug}/published.json`] = await L.readDoc(`pages/${slug}/published.json`, null);
        bundle.docs[`pages/${slug}/draft.json`] = await L.readDoc(`pages/${slug}/draft.json`, null);
        bundle.docs[`pages/${slug}/revisions.json`] = await L.readDoc(`pages/${slug}/revisions.json`, null);
      }
      await audit({ action: 'backup.export' });
      return bundle;
    }

    /* ---- content read used by the public pages ---- */
    default:
      throw Object.assign(new Error('Unknown admin action: ' + action), { status: 400 });
  }
}

/* scan a JSON string for placeholder patterns */
const PLACEHOLDER_PATTERNS = [
  [/lorem\s+ipsum/i, 'lorem-ipsum'],
  [/placeholder/i, 'placeholder-text'],
  [/\bTBD\b|\bTODO\b/i, 'todo'],
  [/coming\s+soon/i, 'coming-soon'],
  [/example\.(com|org|net)/i, 'example-domain'],
  [/919000000000|90000\s?00000|\+91\s?90000\b/, 'placeholder-phone'],
  [/\bdummy\b|\bsample text\b/i, 'dummy-text'],
  [/1234567890|0000000000/, 'placeholder-number']
];
function scanPatterns(str, findings, page) {
  PLACEHOLDER_PATTERNS.forEach(([re, name]) => {
    const m = str.match(re);
    if (m) findings.push({ page, pattern: name, detail: str.slice(Math.max(0, m.index - 40), m.index + 80).slice(0, 160) });
  });
}

async function missingImageAssets() {
  const index = await L.readDoc('media/index.json', { assets: [] });
  const meta = await pagesMeta();
  const docsJson = [];
  for (const slug of Object.keys(meta.pages || {})) {
    const d = await L.readDoc(`pages/${slug}/published.json`, null);
    if (d) docsJson.push(JSON.stringify(d));
  }
  docsJson.push(JSON.stringify(await L.readDoc('doctors.json', null)));
  docsJson.push(JSON.stringify(await L.readDoc('site.json', null)));
  const all = docsJson.join('\n');
  return index.assets.filter((a) => a.path && !all.includes(a.path)).length;
}

/* public content endpoint (no auth). The public runtime only needs the
 * published overlay for this page plus the shared site settings; drafts are
 * served only with a valid admin session. Doctor records are delivered through
 * the authenticated doctors.get action, never over the public content API. */
async function contentFor(req, pathname, wantDraft) {
  const slug = urlToSlug(pathname);
  const [site, published] = await Promise.all([
    L.readDoc('site.json', null),
    L.readDoc(`pages/${slug}/published.json`, null)
  ]);
  let overlay = published;
  let draft = false;
  if (wantDraft) {
    const cur = await currentSession(req);
    if (cur) {
      const d = await L.readDoc(`pages/${slug}/draft.json`, null);
      if (d) { overlay = d; draft = true; }
    }
  }
  return { slug, overlay, draft, site, fetchedAt: L.nowIso() };
}

module.exports = { run, contentFor, currentSession, urlToSlug, validateOverlay, validateSite, validateDoctors, createEnquiry, SESSION_COOKIE, pagesMeta, writePageMeta, audit, addRevision, EXT_MIME };
