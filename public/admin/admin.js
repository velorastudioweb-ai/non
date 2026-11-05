'use strict';
/* Quantum Health admin panel - single-page application.
 * Talks to /api/qh/admin/ (session-cookie authenticated, x-qh-request CSRF header)
 * and drives the visual editor by messaging the ?qh_edit=1 preview iframe.
 * Keep this file ASCII-only in literals (PowerShell-safe). */

const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
const el = (tag, attrs, kids) => {
  const n = document.createElement(tag);
  Object.keys(attrs || {}).forEach((k) => {
    if (k === 'class') n.className = attrs[k];
    else if (k === 'html') n.innerHTML = attrs[k];
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
    else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
  });
  (Array.isArray(kids) ? kids : kids != null ? [kids] : []).forEach((c) => n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return n;
};
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function toast(msg, isErr) {
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'toast' + (isErr ? ' err' : '');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.classList.add('hidden'); }, 4200);
}
async function api(action, payload) {
  const res = await fetch('/api/qh/admin/', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-qh-request': '1' },
    credentials: 'same-origin',
    body: JSON.stringify(Object.assign({ action }, payload || {}))
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || ('Request failed (' + res.status + ')'));
  return json;
}
function modalOpen(node) { $('#modal-body').innerHTML = ''; $('#modal-body').appendChild(node); $('#modal').classList.remove('hidden'); }
function modalClose() { $('#modal').classList.add('hidden'); }
function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: type || 'application/json' }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
async function pagesIndex() {
  if (pagesIndex._c) return pagesIndex._c;
  const res = await fetch('/assets/data/qh-pages.json');
  pagesIndex._c = (await res.json()).pages;
  return pagesIndex._c;
}

/* ---------------- auth / shell ---------------- */
let ME = null;
function showLogin(note) {
  $('#shell').classList.add('hidden');
  $('#login').classList.remove('hidden');
  if (note) $('#login-note').textContent = note;
}
async function boot() {
  try {
    ME = await api('me');
  } catch (e) { return showLogin('CMS unavailable: ' + e.message); }
  if (!ME.signedIn) {
    if (ME.setupRequired) showLogin('No administrator is configured yet. Run node scripts/setup-admin.js once on the deployment.');
    else showLogin();
    return;
  }
  $('#login').classList.add('hidden');
  $('#shell').classList.remove('hidden');
  buildMenu();
  route();
}
$('#login-form').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const btn = $('#login-form button');
  btn.disabled = true;
  try {
    const email = $('#login-email').value.trim().toLowerCase();
    const password = $('#login-password').value;
    const code = $('#login-code').value.trim();
    let out = await api('login', { email, password, code: code || undefined });
    if (out.step === 'totp') { $('#totp-row').classList.remove('hidden'); $('#login-code').focus(); btn.disabled = false; return; }
    location.hash = '#/dashboard';
    boot();
  } catch (e) { toast(e.message, true); btn.disabled = false; }
});
$('#logout').addEventListener('click', async () => { try { await api('logout'); } catch (e) {} location.reload(); });
$('#modal-close').addEventListener('click', modalClose);
$('#picker-close').addEventListener('click', () => $('#media-picker').classList.add('hidden'));
window.addEventListener('hashchange', route);

/* ---------------- menu / router ---------------- */
const MODULES = [
  ['dashboard', 'Dashboard'], ['pages', 'All Pages'], ['editor', 'Visual Page Editor'],
  ['home', 'Homepage'], ['surgical', 'Surgical Treatments'], ['nonsurgical', 'Non-Surgical Treatments'],
  ['doctors', 'Dr. Vikas Singh & Team'], ['gallery', 'Before & After'], ['media', 'Media Library'],
  ['locations', 'Locations & Branches'], ['contacts', 'Contact & WhatsApp'], ['enquiries', 'Forms & Enquiries'],
  ['nav', 'Navigation & Footer'], ['seo', 'SEO Manager'], ['appearance', 'Global Appearance'],
  ['components', 'Reusable Components'], ['placeholders', 'Placeholder Audit'], ['revisions', 'Revision History'],
  ['security', 'Admin Security'], ['settings', 'Settings']
];
function buildMenu() {
  const nav = $('#nav-menu');
  nav.innerHTML = '';
  MODULES.forEach(([id, label]) => nav.appendChild(el('button', { 'data-m': id, onclick: () => { location.hash = '#/' + id; } }, label)));
}
function route() {
  const parts = (location.hash || '#/dashboard').slice(2).split('/');
  const view = parts[0] || 'dashboard';
  $$('#nav-menu button').forEach((b) => b.classList.toggle('on', b.getAttribute('data-m') === view));
  (VIEWS[view] || VIEWS.dashboard)(parts.slice(1));
}

/* ---------------- editor state ---------------- */
const ED = {
  slug: null, url: null, current: null, structure: [], dirty: false, saving: false, lastSaved: null, pendingPick: null
};
function docOr() { return ED.current || (ED.current = blankDoc()); }
function sendToFrame(msg) {
  const f = $('#editor-frame');
  if (f && f.contentWindow) f.contentWindow.postMessage(Object.assign({ from: 'qhadmin' }, msg), '*');
}
window.addEventListener('message', (ev) => {
  const d = ev.data || {};
  if (d.from !== 'qhpage') return;
  if (d.type === 'qh:ready') {
    ED.structure = d.structure || [];
    renderSections();
    sendToFrame({ cmd: 'apply', doc: ED.current });
    if (ED.pendingPick) { const pk = ED.pendingPick; ED.pendingPick = null; handlePick(pk); }
    const status = $('#edit-status');
    const ls = ED.loadState || 'base';
    if (status) status.textContent = ls === 'draft' ? 'Editing DRAFT (not live)' : (ls === 'published' ? 'Editing PUBLISHED copy' : 'Editing original content');
  }
  if (d.type === 'qh:pick') handlePick(d.info);
  if (d.type === 'qh:snapshot') addBlockFromHtml(d.sid, d.html);
});
function handlePick(info) {
  if (!ED.structure.length) { ED.pendingPick = info; return; }
  if (info.kind === 'section') selectSection(info.sid);
  else selectField(info.sid, info.fid);
}

function blankDoc() { return { seo: null, sections: {}, order: null, added: [] }; }
function secEntry(sid) {
  const d = docOr();
  d.sections[sid] = d.sections[sid] || {};
  return d.sections[sid];
}
function fieldEntry(sid, fid) {
  const e = secEntry(sid);
  e.fields = e.fields || {};
  e.fields[fid] = e.fields[fid] || {};
  return e.fields[fid];
}
let saveTimer = null;
function markDirty() {
  ED.dirty = true;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveDraft, 900);
}
async function saveDraft() {
  if (!ED.slug || !ED.dirty) return;
  ED.saving = true;
  try {
    await api('page.saveDraft', { slug: ED.slug, doc: ED.current });
    ED.dirty = false; ED.lastSaved = new Date();
    const s = $('#save-note'); if (s) s.textContent = 'Draft saved ' + ED.lastSaved.toLocaleTimeString();
  } catch (e) { toast('Save failed: ' + e.message, true); }
  ED.saving = false;
}

/* ---------------- VIEWS ---------------- */
const VIEWS = {};

VIEWS.dashboard = async function () {
  $('#view-title').textContent = 'Dashboard';
  const v = $('#view'); v.innerHTML = '<p class="muted">Loading...</p>';
  let stats = null, err = null;
  try { stats = await api('dashboard.stats'); } catch (e) { err = e.message; }
  const pages = await pagesIndex().catch(() => []);
  $('#top-actions').innerHTML = '';
  if (err) { v.innerHTML = '<div class="card">CMS storage not reachable: ' + esc(err) + '</div>'; return; }
  const S = (n, l) => el('div', { class: 'stat' }, [el('b', {}, String(n == null ? '-' : n)), el('span', {}, l)]);
  v.innerHTML = '';
  v.appendChild(el('div', { class: 'grid stats' }, [
    S(stats.sections || pages.length, 'Sections tracked'), S(pages.length, 'Pages'),
    S(stats.doctors, 'Doctors'), S(stats.images, 'Media assets'), S(stats.branches, 'Branches'),
    S(stats.enquiries, 'Enquiries'), S(stats.drafts, 'Drafts'), S(stats.published, 'Published edits'),
    S(stats.missingImages, 'Unused images'), S(stats.gallery, 'Gallery items')
  ]));
  const quick = el('div', { class: 'card' }, [el('h3', {}, 'Quick actions')]);
  [['#/editor/home', 'Edit Homepage'], ['#/pages', 'Edit Any Page'], ['#/media', 'Upload Image'], ['#/doctors', 'Add Doctor'], ['#/contacts', 'Manage Contacts'], ['#/enquiries', 'View Enquiries'], ['#/nav', 'Manage Navigation'], ['#/nav', 'Edit Footer'], ['/', 'Open Live Website']].forEach(([href, label]) => {
    quick.appendChild(el('a', Object.assign({ class: 'btn ghost small', href, style: 'margin:.25rem .3rem .25rem 0; text-decoration:none' }, href === '/' ? { target: '_blank' } : {}), label));
  });
  v.appendChild(quick);
  const recent = el('div', { class: 'card' }, [el('h3', {}, 'Recent changes')]);
  if (!stats.recent.length) recent.appendChild(el('p', { class: 'muted' }, 'No changes yet - publish something from the Visual Page Editor.'));
  stats.recent.forEach((r) => recent.appendChild(el('div', { class: 'list-row' }, [
    el('span', { class: 'badge' }, r.action), el('span', { class: 'grow' }, r.slug || r.scope || ''),
    el('span', { class: 'muted small' }, new Date(r.at).toLocaleString())
  ])));
  v.appendChild(recent);
};

VIEWS.pages = async function () {
  $('#view-title').textContent = 'All Pages';
  const pages = await pagesIndex();
  const meta = await api('pages.list').catch(() => ({ pages: {} }));
  const search = el('input', { placeholder: 'Filter by URL or title...', style: 'width:20rem', oninput: () => draw() });
  $('#top-actions').innerHTML = ''; $('#top-actions').appendChild(search);
  const v = $('#view'); v.innerHTML = '';
  const table = el('table');
  table.innerHTML = '<thead><tr><th>URL</th><th>Title</th><th>State</th><th>Last edited</th><th></th></tr></thead>';
  const body = el('tbody'); table.appendChild(body); v.appendChild(table);
  function draw() {
    const q = search.value.toLowerCase();
    body.innerHTML = '';
    pages.filter((p) => !q || p.url.includes(q) || String(p.title || '').toLowerCase().includes(q)).slice(0, 240).forEach((p) => {
      const m = meta.pages[p.slug] || {};
      const state = m.hasDraft ? '<span class="badge warn">draft</span> ' : '';
      body.appendChild(el('tr', {}, [
        el('td', {}, esc(p.url)), el('td', {}, esc(p.title || p.h1 || '')),
        el('td', { html: state + (m.published ? '<span class="badge done">published</span>' : '<span class="badge">base</span>') }),
        el('td', { class: 'small muted' }, m.updatedAt ? new Date(m.updatedAt).toLocaleString() : '-'),
        el('td', {}, el('a', { class: 'btn small', href: '#/editor/' + p.slug }, 'Edit'))
      ]));
    });
  }
  draw();
};

VIEWS.home = () => VIEWS.editor(['home']);
VIEWS.surgical = async () => {
  const pages = await pagesIndex();
  VIEWS.listPage('Surgical Treatments', pages.filter((p) => p.url.startsWith('/surgical') || p.url === '/breast-implants/' || p.url === '/breast-implant-safety/'));
};
VIEWS.nonsurgical = async () => {
  const pages = await pagesIndex();
  VIEWS.listPage('Non-Surgical Treatments', pages.filter((p) => p.url.startsWith('/non-surgical') || p.url === '/breast-enlargement-without-surgery/'));
};
VIEWS.listPage = function (title, pages) {
  $('#view-title').textContent = title;
  $('#top-actions').innerHTML = '';
  const v = $('#view'); v.innerHTML = '';
  const table = el('table');
  table.innerHTML = '<thead><tr><th>URL</th><th>Title</th><th></th></tr></thead>';
  const body = el('tbody'); table.appendChild(body);
  pages.forEach((p) => body.appendChild(el('tr', {}, [el('td', {}, esc(p.url)), el('td', {}, esc(p.title || '')), el('td', {}, el('a', { class: 'btn small', href: '#/editor/' + p.slug }, 'Edit'))])));
  v.appendChild(table);
  v.appendChild(el('p', { class: 'muted small' }, 'Shared treatment cards: edit the section containing the cards on any page with the Visual Page Editor, or keep a canonical copy in Reusable Components and insert it where needed.'));
};

/* ---- visual editor ---- */
VIEWS.editor = async function (args) {
  $('#view-title').textContent = 'Visual Page Editor';
  const slug = (args && args[0]) || null;
  if (slug && slug !== ED.slug) {
    const pages = await pagesIndex();
    const found = pages.find((p) => p.slug === slug);
    ED.slug = slug;
    ED.url = found ? found.url : '/' + slug.replace(/-/g, '/') + '/';
    ED.current = null;
    const data = await api('page.get', { slug }).catch((e) => { toast(e.message, true); return {}; });
    ED.loadState = data.draft ? 'draft' : (data.published ? 'published' : 'base');
    ED.current = JSON.parse(JSON.stringify(data.draft || data.published || blankDoc()));
    ED.structure = [];
    ED.pendingPick = null;
  }
  if (!ED.slug) {
    const pages = await pagesIndex();
    $('#top-actions').innerHTML = '';
    const v = $('#view'); v.innerHTML = '';
    const card = el('div', { class: 'card' }, [el('h3', {}, 'Choose a page to edit')]);
    const sel = el('select', { style: 'width:26rem' });
    pages.forEach((p) => sel.appendChild(el('option', { value: p.slug }, p.url + '   ' + (p.title || ''))));
    card.appendChild(el('div', { class: 'row' }, [sel, el('button', { class: 'btn primary', onclick: () => { location.hash = '#/editor/' + sel.value; } }, 'Open editor')]));
    v.appendChild(card);
    return;
  }
  const tb = $('#top-actions'); tb.innerHTML = '';
  tb.appendChild(el('span', { class: 'preview-status draft', id: 'edit-status' }, 'loading preview...'));
  tb.appendChild(el('button', { class: 'btn ghost small', onclick: async () => { ED.dirty = true; await saveDraft(); toast('Draft saved'); } }, 'Save Draft'));
  tb.appendChild(el('button', { class: 'btn small', onclick: () => window.open(ED.url, '_blank') }, 'View Live'));
  tb.appendChild(el('button', { class: 'btn primary small', onclick: publishCurrent }, 'Save & Publish'));
  tb.appendChild(el('button', { class: 'btn ghost small', onclick: showRevisions }, 'History'));
  const v = $('#view');
  v.innerHTML = '<div class="three-col"><div class="card seclist-card"><h3>Sections <button class="iconbtn" id="add-sec" title="Add section">+</button></h3><div class="seclist" id="seclist"></div></div><iframe class="editor-frame" id="editor-frame" src="' + esc(ED.url) + '?qh_edit=1"></iframe><div class="card inspector" id="inspector"><h3>Inspector</h3><p class="muted small">Click any heading, paragraph, image, link or card in the preview to edit it here. <span id="save-note"></span></p></div></div>';
  $('#add-sec').addEventListener('click', addSectionDialog);
  renderSections();
};
async function publishCurrent() {
  try {
    ED.dirty = true; await saveDraft();
    await api('page.publish', { slug: ED.slug });
    toast('Published - live on the website within seconds (edge cache up to 30s).');
    const s = $('#edit-status'); if (s) { s.textContent = 'PUBLISHED'; s.className = 'preview-status published'; }
  } catch (e) { toast(e.message, true); }
}
function showRevisions() {
  const box = el('div');
  box.appendChild(el('h3', {}, 'Version history - ' + ED.slug));
  const list = el('div'); box.appendChild(list);
  modalOpen(box);
  api('page.revisions', { slug: ED.slug }).then((r) => {
    list.innerHTML = '';
    if (!r.list.length) list.appendChild(el('p', { class: 'muted' }, 'No earlier published versions yet for this page.'));
    r.list.forEach((rev) => list.appendChild(el('div', { class: 'list-row' }, [
      el('span', { class: 'grow' }, new Date(rev.at).toLocaleString() + ' - ' + (rev.label || '')),
      el('button', { class: 'btn small', onclick: async () => { try { await api('page.restore', { slug: ED.slug, rev: rev.rev }); toast('Version restored'); location.reload(); } catch (e) { toast(e.message, true); } } }, 'Restore')
    ])));
  });
}
function renderSections() {
  const host = $('#seclist'); if (!host) return;
  host.innerHTML = '';
  const addedIds = ((ED.current && ED.current.added) || []).map((a) => a.id);
  ED.structure.forEach((sec, idx) => {
    const item = el('div', { class: 'sec-item' + (sec.hidden ? ' off' : '') });
    const head = el('div', { class: 'sec-head' });
    head.appendChild(el('span', { class: 'name', title: sec.name }, (idx + 1) + '. ' + sec.name));
    head.appendChild(iconBtn('up', () => moveSection(sec.sid, -1)));
    head.appendChild(iconBtn('dn', () => moveSection(sec.sid, 1)));
    head.appendChild(iconBtn(sec.hidden ? 'off' : 'on', () => toggleHidden(sec.sid, sec)));
    head.appendChild(iconBtn('dup', () => duplicateSection(sec.sid)));
    if (addedIds.indexOf(sec.sid) > -1) head.appendChild(iconBtn('x', () => removeAdded(sec.sid)));
    item.appendChild(head);
    if ((sec.fields || []).length) {
      const fl = el('div', { class: 'flist hidden' });
      sec.fields.forEach((f) => fl.appendChild(el('div', { 'data-key': sec.sid + '.' + f.fid, title: f.type + ' ' + (f.text || f.src || f.href || ''), onclick: () => selectField(sec.sid, f.fid) }, f.fid + ' | ' + f.type + ' | ' + (f.text || f.src || f.href || '').slice(0, 44))));
      head.addEventListener('click', (e) => { if (e.target.closest('.iconbtn')) return; fl.classList.toggle('hidden'); });
      item.appendChild(fl);
    }
    host.appendChild(item);
  });
}
function iconBtn(txt, fn) { return el('button', { class: 'iconbtn', title: 'action', onclick: (e) => { e.stopPropagation(); fn(); } }, txt); }
function toggleHidden(sid, sec) {
  const entry = secEntry(sid);
  entry.hidden = !entry.hidden;
  sec.hidden = entry.hidden;
  markDirty(); sendToFrame({ cmd: 'apply', doc: ED.current }); renderSections();
}
function moveSection(sid, dir) {
  const order = (ED.current.order = ED.current.order || ED.structure.map((s) => s.sid));
  const i = order.indexOf(sid); if (i < 0) return;
  const j = i + dir; if (j < 0 || j >= order.length) return;
  order.splice(j, 0, order.splice(i, 1)[0]);
  markDirty(); sendToFrame({ cmd: 'apply', doc: ED.current });
}
function duplicateSection(sid) { sendToFrame({ cmd: 'snapshot', sid }); }
function addBlockFromHtml(sid, html) {
  if (!html) { toast('Section snapshot unavailable', true); return; }
  ED.current.added = ED.current.added || [];
  ED.current.added.push({ id: 'a' + Date.now().toString(36), name: 'Copy of ' + sid, html });
  markDirty(); setTimeout(() => sendToFrame({ cmd: 'apply', doc: ED.current }), 60);
  toast('Section duplicated - see the bottom of the preview');
}
function removeAdded(id) {
  ED.current.added = (ED.current.added || []).filter((a) => a.id !== id && String(a.id) !== id);
  ED.structure = ED.structure.filter((s) => s.sid !== id);
  markDirty(); sendToFrame({ cmd: 'apply', doc: ED.current }); renderSections();
}
function addSectionDialog() {
  const box = el('div');
  box.appendChild(el('h3', {}, 'Add a new section'));
  const title = el('input', { placeholder: 'Heading shown on the page' });
  const body = el('textarea', { class: 'wide', placeholder: 'Body text. Blank lines start a new paragraph.' });
  box.appendChild(el('label', { class: 'field-label' }, 'Heading')); box.appendChild(title);
  box.appendChild(el('label', { class: 'field-label' }, 'Text')); box.appendChild(body);
  const comps = el('select'); comps.appendChild(el('option', { value: '' }, '- or insert a reusable component -'));
  api('components.get').then((c) => (c.blocks || []).forEach((b) => comps.appendChild(el('option', { value: b.html }, b.name)))).catch(() => {});
  box.appendChild(comps);
  box.appendChild(el('div', { class: 'row', style: 'margin-top:1rem' }, [el('button', {
    class: 'btn primary', onclick: () => {
      const html = comps.value ? comps.value : '<section class="section"><div class="container"><h2 class="h2">' + esc(title.value || 'New section') + '</h2>' + body.value.split(/\n{2,}/).map((p) => '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>').join('') + '</div></section>';
      ED.current.added = ED.current.added || [];
      ED.current.added.push({ id: 'a' + Date.now().toString(36), name: title.value || 'New section', html });
      markDirty(); sendToFrame({ cmd: 'apply', doc: ED.current }); modalClose(); toast('Section added');
    }
  }, 'Add section')]));
  modalOpen(box);
}

/* ---- inspector ---- */
function selectSection(sid) {
  const sec = ED.structure.find((s) => s.sid === sid) || {};
  const box = el('div');
  box.appendChild(el('h3', {}, 'Section: ' + (sec.name || sid)));
  box.appendChild(el('label', { class: 'field-label' }, 'Section background (safe palette)'));
  const colors = ['#3B1020', '#4A0F24', '#641B35', '#300A19', '#2A0B17', 'clear'];
  const row = el('div', { class: 'row' });
  colors.forEach((c) => row.appendChild(el('button', {
    class: 'iconbtn', title: c, style: 'width:2rem;height:2rem;border-radius:6px;border:1px solid var(--gold-dark);background:' + (c === 'clear' ? 'transparent' : c),
    onclick: () => { const e = secEntry(sid); if (c === 'clear') delete e.bg; else e.bg = c; markDirty(); sendToFrame({ cmd: 'apply', doc: ED.current }); }
  }, '')));
  box.appendChild(row);
  box.appendChild(el('label', { class: 'field-label' }, 'Text alignment'));
  const al = el('div', { class: 'row' });
  ['left', 'center', 'right', 'reset'].forEach((c) => {
    al.appendChild(el('button', { class: 'btn ghost small', onclick: () => { const e = secEntry(sid); if (c === 'reset') delete e.align; else e.align = c; markDirty(); sendToFrame({ cmd: 'apply', doc: ED.current }); } }, c));
  });
  box.appendChild(al);
  box.appendChild(el('label', { class: 'field-label' }, 'Section spacing'));
  const sp = el('div', { class: 'row' });
  ['tight', 'normal', 'relaxed', 'reset'].forEach((c) => {
    sp.appendChild(el('button', { class: 'btn ghost small', onclick: () => { const e = secEntry(sid); if (c === 'reset') delete e.spacing; else e.spacing = c === 'normal' ? undefined : c; markDirty(); sendToFrame({ cmd: 'apply', doc: ED.current }); } }, c));
  });
  box.appendChild(sp);
  setInspector(box);
  sendToFrame({ cmd: 'setActive', key: sid });
}
function setInspector(node) { const i = $('#inspector'); if (i) { i.innerHTML = ''; i.appendChild(node); } }
function selectField(sid, fid) {
  const sec = ED.structure.find((s) => s.sid === sid);
  const f = sec && (sec.fields || []).find((x) => x.fid === fid);
  if (!f) return;
  const entry = fieldEntry(sid, fid);
  const box = el('div');
  box.appendChild(el('h3', {}, f.type + ' | ' + sid + '.' + fid));
  const upd = () => { markDirty(); sendToFrame({ cmd: 'apply', doc: ED.current }); };
  if (f.type === 'img') {
    const src = el('input', { value: entry.src || f.src || '', placeholder: '/assets/... or https:// image URL' });
    src.addEventListener('change', () => { entry.src = src.value || undefined; delete entry.srcBase; upd(); });
    box.appendChild(el('label', { class: 'field-label' }, 'Image URL'));
    box.appendChild(el('div', { class: 'row' }, [src, el('button', { class: 'btn small', onclick: () => pickMedia((a) => { entry.src = a.url; src.value = a.url; if (a.width) entry.width = a.width; if (a.height) entry.height = a.height; upd(); }) }, 'Media library')]));
    const alt = el('input', { value: entry.alt != null ? entry.alt : (f.alt || ''), placeholder: 'Descriptive alt text' });
    alt.addEventListener('change', () => { entry.alt = alt.value; upd(); });
    box.appendChild(el('label', { class: 'field-label' }, 'Alt text'));
    box.appendChild(alt);
    const hid = el('input', { type: 'checkbox', checked: !!entry.hidden });
    hid.addEventListener('change', () => { entry.hidden = hid.checked || undefined; upd(); });
    box.appendChild(el('label', { class: 'pill-toggle' }, [hid, ' Hide this image']));
  } else if (f.type === 'link') {
    const text = el('input', { value: entry.text != null ? entry.text : f.text });
    text.addEventListener('input', () => { entry.text = text.value; delete entry.html; upd(); });
    const href = el('input', { value: entry.href != null ? entry.href : f.href });
    href.addEventListener('change', () => { entry.href = href.value; upd(); });
    box.appendChild(el('label', { class: 'field-label' }, 'Button / link label')); box.appendChild(text);
    box.appendChild(el('label', { class: 'field-label' }, 'Link URL')); box.appendChild(href);
  } else {
    const mode = entry.html != null ? 'html' : 'text';
    const ta = el('textarea', { class: 'wide', value: mode === 'html' ? entry.html : (entry.text != null ? entry.text : f.text || '') });
    ta.setAttribute('data-mode', mode);
    ta.addEventListener('input', () => {
      if (ta.getAttribute('data-mode') === 'html') { entry.html = filterHtml(ta.value); delete entry.text; }
      else { entry.text = ta.value; delete entry.html; }
      upd();
    });
    box.appendChild(el('label', { class: 'field-label' }, 'Content'));
    const bar = el('div', { class: 'rte-bar' });
    const mk = (label, fn) => bar.appendChild(el('button', { class: 'btn ghost small', onclick: (e) => { e.preventDefault(); fn(); } }, label));
    mk('Bold', () => wrapSel(ta, '<strong>', '</strong>', 'html'));
    mk('Italic', () => wrapSel(ta, '<em>', '</em>', 'html'));
    mk('Break', () => wrapSel(ta, '', '<br>', 'html'));
    mk('Link', () => wrapSel(ta, '<a href="/contact/">', '</a>', 'html'));
    mk('Plain', () => { ta.setAttribute('data-mode', 'plain'); ta.value = decodeEntities(ta.value.replace(/<[^>]+>/g, ' ')); });
    mk('Rich', () => { ta.setAttribute('data-mode', 'html'); });
    box.appendChild(bar);
    box.appendChild(ta);
    box.appendChild(el('label', { class: 'field-label' }, 'Text colour'));
    const st = el('div', { class: 'row', style: 'margin-top:.3rem' });
    [['gold', 'var(--gold-light)'], ['ivory', '#FFF8EF'], ['light-gold', '#F0D58B']].forEach(([lab, c]) => st.appendChild(el('button', { class: 'btn ghost small', onclick: () => { entry.style = Object.assign({}, entry.style, { color: c }); upd(); } }, lab)));
    st.appendChild(el('button', { class: 'btn ghost small', onclick: () => { if (entry.style) { delete entry.style.color; } upd(); } }, 'reset'));
    box.appendChild(st);
  }
  setInspector(box);
  sendToFrame({ cmd: 'setActive', key: sid + '.' + fid });
}
function wrapSel(ta, before, after, mode) {
  ta.setAttribute('data-mode', mode);
  const s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
  ta.value = v.slice(0, s) + before + v.slice(s, e) + after + v.slice(e);
  ta.dispatchEvent(new Event('input'));
  ta.focus();
}
function decodeEntities(s) { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; }
function filterHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const okTags = ['STRONG', 'EM', 'B', 'I', 'U', 'BR', 'A', 'P', 'SPAN'];
  (function walk(node) {
    Array.prototype.slice.call(node.childNodes).forEach((c) => {
      if (c.nodeType === 1) {
        if (okTags.indexOf(c.tagName) === -1) {
          if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED'].indexOf(c.tagName) > -1) { c.remove(); return; }
          const frag = document.createDocumentFragment();
          while (c.firstChild) frag.appendChild(c.firstChild);
          c.replaceWith(frag);
        } else {
          Array.prototype.slice.call(c.attributes).forEach((a) => {
            if (a.name === 'href' && c.tagName === 'A') { if (!/^(https?:|mailto:|tel:|\/|#)/i.test(a.value)) c.removeAttribute('href'); return; }
            c.removeAttribute(a.name);
          });
          walk(c);
        }
      }
    });
  })(tmp);
  return tmp.innerHTML;
}

/* ---- media picker ---- */
let pickCb = null;
function pickMedia(cb) {
  pickCb = cb;
  $('#media-picker').classList.remove('hidden');
  api('media.list').then((r) => {
    const g = $('#picker-grid'); g.innerHTML = '';
    (r.assets || []).forEach((a) => {
      const url = '/api/qh/file/' + a.path;
      g.appendChild(el('img', { src: url, alt: a.alt || a.name, onclick: () => { $('#media-picker').classList.add('hidden'); pickCb({ url, id: a.id, width: a.width, height: a.height }); } }));
    });
    if (!(r.assets || []).length) g.appendChild(el('p', { class: 'muted' }, 'No images uploaded yet - open Media Library.'));
  });
}

/* ---- media library ---- */
VIEWS.media = async function () {
  $('#view-title').textContent = 'Media Library';
  const tb = $('#top-actions'); tb.innerHTML = '';
  const file = el('input', { type: 'file', accept: 'image/*', multiple: 'multiple', style: 'display:none' });
  tb.appendChild(file);
  tb.appendChild(el('button', { class: 'btn primary small', onclick: () => file.click() }, 'Upload images'));
  const folderPref = el('input', { placeholder: 'upload folder (optional)', style: 'width:14rem' });
  tb.appendChild(folderPref);
  const v = $('#view');
  const dz = el('div', { class: 'dropzone' }, 'Drop image files here (up to 8 MB each) - resized to max 1920px, converted to WebP where supported, stored in the private media library and served from this site origin.');
  v.innerHTML = ''; v.appendChild(dz); v.appendChild(el('div', { class: 'medgrid', id: 'medgrid' }));
  const draw = async () => {
    const r = await api('media.list');
    const g = $('#medgrid'); g.innerHTML = '';
    (r.assets || []).forEach((a) => {
      const cell = el('div', { class: 'medcell' });
      const url = '/api/qh/file/' + a.path;
      cell.appendChild(el('img', { src: url, alt: a.alt || a.name, loading: 'lazy' }));
      cell.appendChild(el('div', { class: 'meta' }, [el('b', {}, a.name), el('span', {}, (a.folder || 'general') + ' | ' + Math.round(a.size / 1024) + ' KB')]));
      const ops = el('div', { class: 'ops' });
      ops.appendChild(el('button', { class: 'btn ghost small', onclick: () => editAlt(a, url) }, 'Alt/name'));
      ops.appendChild(el('button', { class: 'btn ghost small', onclick: () => copy(url) }, 'Copy URL'));
      ops.appendChild(el('button', { class: 'btn danger small', onclick: async () => { if (!confirm('Delete this image? It may be referenced by published content.')) return; try { await api('media.delete', { id: a.id, force: true }); draw(); } catch (e) { toast(e.message, true); } } }, 'Delete'));
      cell.appendChild(ops);
      g.appendChild(cell);
    });
    if (!(r.assets || []).length) g.appendChild(el('p', { class: 'muted' }, 'The library is empty. Upload the first image above.'));
  };
  const editAlt = (a, url) => {
    const box = el('div');
    box.appendChild(el('h3', {}, 'Edit asset'));
    box.appendChild(el('img', { src: url, style: 'max-width:100%;border-radius:8px' }));
    const name = el('input', { value: a.name }); const alt = el('input', { value: a.alt || '' }); const folder = el('input', { value: a.folder || 'general' });
    box.appendChild(el('label', { class: 'field-label' }, 'File name')); box.appendChild(name);
    box.appendChild(el('label', { class: 'field-label' }, 'Alt text')); box.appendChild(alt);
    box.appendChild(el('label', { class: 'field-label' }, 'Folder')); box.appendChild(folder);
    box.appendChild(el('button', { class: 'btn primary', style: 'margin-top:.8rem', onclick: async () => { await api('media.update', { id: a.id, name: name.value, alt: alt.value, folder: folder.value }); modalClose(); draw(); } }, 'Save'));
    modalOpen(box);
  };
  async function uploadFiles(list) {
    for (const f of Array.from(list)) {
      if (!f.type || !f.type.startsWith('image/')) continue;
      try {
        const dataUrl = await resizeToDataUrl(f);
        const r = await api('media.upload', { name: f.name, alt: '', folder: (folderPref.value || 'general').trim(), dataUrl });
        toast('Uploaded ' + f.name + ' -> ' + r.asset.path);
      } catch (e) { toast('Upload failed: ' + e.message, true); }
    }
    draw();
  }
  file.addEventListener('change', () => uploadFiles(file.files));
  dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.classList.add('on'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('on'));
  dz.addEventListener('drop', (e) => { e.preventDefault(); dz.classList.remove('on'); uploadFiles(e.dataTransfer.files); });
  dz.addEventListener('click', () => file.click());
  await draw();
};
function resizeToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1920;
      let w = img.width, h = img.height;
      if (w > max) { h = Math.round(h * max / w); w = max; }
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      let out;
      try { out = c.toDataURL('image/webp', 0.85); } catch (e) { out = ''; }
      if (!out || out.indexOf('data:image/webp') !== 0) out = c.toDataURL('image/jpeg', 0.88);
      resolve(out);
    };
    img.onerror = reject;
    img.src = url;
  });
}
function copy(text) { navigator.clipboard.writeText(location.origin + text).then(() => toast('Copied full URL'), () => toast(text)); }

/* ---- doctors ---- */
VIEWS.doctors = async function () {
  $('#view-title').textContent = 'Dr. Vikas Singh & Team';
  const tb = $('#top-actions'); tb.innerHTML = '';
  const data = await api('doctors.get');
  let list = (data.list || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));
  const v = $('#view');
  tb.appendChild(el('button', { class: 'btn ghost small', onclick: async () => { try { await api('doctors.save', { list }); toast('Doctors saved'); } catch (e) { toast(e.message, true); } } }, 'Save'));
  tb.appendChild(el('button', { class: 'btn primary small', onclick: async () => { try { await api('doctors.save', { list, publish: true }); toast('Doctors published to /about-us/'); } catch (e) { toast(e.message, true); } } }, 'Save & publish page'));
  function draw() {
    v.innerHTML = '';
    const card = el('div', { class: 'card' }));
    card.appendChild(el('h3', {}, 'Doctor profiles'));
    card.appendChild(el('p', { class: 'muted small' }, 'Only enter qualifications and awards that the Quantum Health team has supplied. Records marked verification-pending stay labelled as supplied and are never published as verified. Publishing updates the live About page doctors grid immediately.'));
    list.forEach((d, i) => {
      const row = el('div', { class: 'list-row' });
      row.appendChild(el('b', { class: 'grow' }, d.name));
      row.appendChild(el('span', { class: 'muted small' }, d.designation || ''));
      if (d.visible === false) row.appendChild(el('span', { class: 'badge warn' }, 'hidden'));
      row.appendChild(el('button', { class: 'btn ghost small', onclick: () => { if (i) { const t = list[i - 1]; list[i - 1] = list[i]; list[i] = t; draw(); } } }, 'up'));
      row.appendChild(el('button', { class: 'btn ghost small', onclick: () => { if (i < list.length - 1) { const t = list[i + 1]; list[i + 1] = list[i]; list[i] = t; draw(); } } }, 'dn'));
      row.appendChild(el('button', { class: 'btn small', onclick: () => editDoctor(d) }, 'Edit'));
      row.appendChild(el('button', { class: 'btn danger small', onclick: () => { list = list.filter((x) => x !== d); draw(); } }, 'Remove'));
      card.appendChild(row);
    });
    card.appendChild(el('button', { class: 'btn primary small', style: 'margin-top:.7rem', onclick: () => editDoctor(null) }, '+ Add doctor'));
    v.appendChild(card);
  }
  function editDoctor(d) {
    const isNew = !d;
    if (isNew) d = { id: 'doc-' + Date.now().toString(36), name: '', designation: '', qualifications: [], specialisations: [], bio: [], locations: [], awards: [], suppliedQualifications: [], credentialNote: '', experience: '', contact: {}, profileUrl: '/doctors/', portrait: null, visible: true, order: list.length };
    const box = el('div');
    box.appendChild(el('h3', {}, isNew ? 'New doctor profile' : 'Edit ' + d.name));
    const name = el('input', { value: d.name }); const desig = el('input', { value: d.designation || '' });
    const quals = el('textarea', { class: 'wide', value: (d.qualifications || []).join('\n') });
    const sup = el('textarea', { class: 'wide', value: (d.suppliedQualifications || []).join('\n') });
    const note = el('input', { value: d.credentialNote || '' });
    const spec = el('textarea', { class: 'wide', value: (d.specialisations || []).join('\n') });
    const exp = el('input', { value: d.experience || '' });
    const bio = el('textarea', { class: 'wide', value: (d.bio || []).join('\n\n') });
    const locs = el('textarea', { class: 'wide', value: (d.locations || []).join('\n') });
    const awards = el('textarea', { class: 'wide', value: (d.awards || []).join('\n') });
    const phone = el('input', { value: (d.contact && d.contact.phone) || '' });
    const wa = el('input', { value: (d.contact && d.contact.whatsapp) || '' });
    const email = el('input', { value: (d.contact && d.contact.email) || '' });
    const ref = el('input', { value: (d.contact && d.contact.reference) || '' });
    const prof = el('input', { value: d.profileUrl || '' });
    const vis = el('input', { type: 'checkbox', checked: d.visible !== false });
    const portraitSrc = el('input', { value: (d.portrait && d.portrait.src) || '', placeholder: '/api/qh/file/... or /assets/img/...' });
    const fields = [['Full name', name], ['Professional title', desig], ['Verified qualifications (one per line)', quals], ['Supplied qualifications - pending verification (one per line)', sup], ['Verification note', note], ['Specialisations (one per line)', spec], ['Experience', exp], ['Biography (blank line between paragraphs)', bio], ['Consultation locations (one per line)', locs], ['Supplied awards/affiliations - pending verification', awards], ['Phone', phone], ['WhatsApp link', wa], ['Email', email], ['Reference website', ref], ['Profile page URL', prof], ['Portrait image URL', portraitSrc]];
    fields.forEach(([l, inp]) => { box.appendChild(el('label', { class: 'field-label' }, l)); box.appendChild(inp); });
    box.appendChild(el('div', { class: 'row' }, [el('button', { class: 'btn small', onclick: () => pickMedia((a) => { portraitSrc.value = a.url; }) }, 'Choose portrait from media library')]));
    box.appendChild(el('label', { class: 'pill-toggle', style: 'margin-top:.7rem' }, [vis, ' Visible on the public page']));
    box.appendChild(el('button', {
      class: 'btn primary', style: 'margin-top:1rem', onclick: () => {
        d.name = name.value.trim(); d.designation = desig.value; d.qualifications = lines(quals); d.suppliedQualifications = lines(sup); d.credentialNote = note.value;
        d.specialisations = lines(spec); d.experience = exp.value; d.bio = paragraphs(bio); d.locations = lines(locs); d.awards = lines(awards);
        d.contact = { phone: phone.value, whatsapp: wa.value, email: email.value, reference: ref.value };
        d.profileUrl = prof.value || '/contact/';
        d.portrait = portraitSrc.value ? { src: portraitSrc.value } : null;
        d.visible = vis.checked;
        if (isNew) list.push(d);
        modalClose(); draw();
      }
    }, isNew ? 'Add doctor' : 'Save doctor'));
    modalOpen(box);
  }
  draw();
};
function lines(t) { return t.value.split('\n').map((x) => x.trim()).filter(Boolean); }
function paragraphs(t) { return t.value.split(/\n{2,}/).map((x) => x.trim()).filter(Boolean); }

/* ---- gallery ---- */
VIEWS.gallery = async function () {
  $('#view-title').textContent = 'Before & After';
  const data = await api('gallery.get');
  let items = data.items || [];
  const page = data.pageSlug || 'understanding-breast-enlargement';
  const tb = $('#top-actions'); tb.innerHTML = '';
  tb.appendChild(el('button', { class: 'btn ghost small', onclick: () => save(false) }, 'Save'));
  tb.appendChild(el('button', { class: 'btn primary small', onclick: () => save(true) }, 'Save & publish'));
  async function save(publish) {
    try { await api('gallery.save', { items, publish, page }); toast(publish ? 'Gallery published' : 'Gallery saved'); } catch (e) { toast(e.message, true); }
  }
  const v = $('#view'); v.innerHTML = '';
  v.appendChild(el('div', { class: 'card' }, [el('h3', {}, 'Consent rules'), el('p', { class: 'muted small' }, 'Illustrative imagery must never be labelled as a genuine clinical result. Patient photography requires written consent before the item is marked published; unconsented items are rendered with an explicit illustrative note.')]));
  const list = el('div', { class: 'card' }, [el('h3', {}, 'Gallery items')]);
  function draw() {
    list.querySelectorAll('.list-row').forEach((n) => n.remove());
    items.forEach((g, i) => {
      const row = el('div', { class: 'list-row' });
      row.appendChild(el('b', { class: 'grow' }, g.title || '(untitled)'));
      row.appendChild(el('span', { class: 'badge' }, g.category || 'uncategorised'));
      row.appendChild(g.consent ? el('span', { class: 'badge done' }, 'consent recorded') : el('span', { class: 'badge warn' }, 'illustrative'));
      row.appendChild(el('button', { class: 'btn small', onclick: () => edit(i) }, 'Edit'));
      row.appendChild(el('button', { class: 'btn danger small', onclick: () => { items.splice(i, 1); draw(); } }, 'Remove'));
      list.appendChild(row);
    });
    list.appendChild(el('button', { class: 'btn primary small', style: 'margin-top:.6rem', onclick: () => { items.push({ id: 'g' + Date.now().toString(36), title: '', before: null, after: null, consent: false, published: true }); edit(items.length - 1); } }, '+ Add before/after item'));
  }
  function edit(i) {
    const g = items[i];
    const box = el('div');
    box.appendChild(el('h3', {}, 'Gallery item'));
    const title = el('input', { value: g.title || '' });
    const cat = el('input', { value: g.category || '' });
    const cap = el('textarea', { class: 'wide', value: g.caption || '' });
    const bs = el('input', { value: (g.before && g.before.src) || '' });
    const as = el('input', { value: (g.after && g.after.src) || '' });
    const consent = el('input', { type: 'checkbox', checked: !!g.consent });
    const pub = el('input', { type: 'checkbox', checked: g.published !== false });
    const pick = (target) => el('button', { class: 'btn small', onclick: () => pickMedia((a) => { target.value = a.url; }) }, 'Library');
    box.appendChild(el('label', { class: 'field-label' }, 'Title')); box.appendChild(title);
    box.appendChild(el('label', { class: 'field-label' }, 'Treatment category')); box.appendChild(cat);
    box.appendChild(el('label', { class: 'field-label' }, 'Caption')); box.appendChild(cap);
    box.appendChild(el('label', { class: 'field-label' }, 'Before image URL')); box.appendChild(el('div', { class: 'row' }, [bs, pick(bs)]));
    box.appendChild(el('label', { class: 'field-label' }, 'After image URL')); box.appendChild(el('div', { class: 'row' }, [as, pick(as)]));
    box.appendChild(el('label', { class: 'pill-toggle' }, [consent, ' Written patient consent on file']));
    box.appendChild(el('label', { class: 'pill-toggle' }, [pub, ' Published']));
    box.appendChild(el('button', { class: 'btn primary', style: 'margin-top:1rem', onclick: () => {
      g.title = title.value; g.category = cat.value; g.caption = cap.value;
      g.before = bs.value ? { src: bs.value } : null; g.after = as.value ? { src: as.value } : null;
      g.consent = consent.checked; g.published = pub.checked;
      modalClose(); draw();
    } }, 'Save item'));
    modalOpen(box);
  }
  draw(); v.appendChild(list);
};

/* ---- locations ---- */
VIEWS.locations = async function () {
  $('#view-title').textContent = 'Locations & Branches';
  const site = await api('site.get');
  if (!site || !site.locations) { $('#view').innerHTML = '<div class="card">The site has not been seeded yet. Run <code>node scripts/seed-cms.js</code> during setup.</div>'; $('#top-actions').innerHTML = ''; return; }
  const v = $('#view'); v.innerHTML = '';
  const tb = $('#top-actions'); tb.innerHTML = '';
  tb.appendChild(el('button', { class: 'btn primary small', onclick: () => api('site.save', site).then(() => toast('Locations updated on the live website immediately.')).catch((e) => toast(e.message, true)) }, 'Save & go live'));
  site.locations.forEach((l) => {
    const card = el('div', { class: 'card' });
    card.appendChild(el('h3', {}, l.name || 'Branch'));
    const mk = (label, value, setter, textarea) => { const inp = textarea ? el('textarea', { class: 'wide', value }) : el('input', { value }); inp.addEventListener('input', () => setter(inp.value)); card.appendChild(el('label', { class: 'field-label' }, label)); card.appendChild(inp); };
    mk('Branch name', l.name, (x) => l.name = x);
    mk('Role', l.role, (x) => l.role = x);
    mk('Country', l.country, (x) => l.country = x);
    mk('Address lines (one per line)', (l.addressLines || []).join('\n'), (x) => l.addressLines = x.split('\n').map((s) => s.trim()).filter(Boolean), true);
    mk('Google Maps query', l.mapQuery, (x) => l.mapQuery = x);
    mk('Business hours (only publish verified hours)', l.hours || '', (x) => l.hours = x);
    mk('Branch email (optional)', l.email || '', (x) => l.email = x);
    mk('Note shown under the card', l.note || '', (x) => l.note = x, true);
    card.appendChild(el('label', { class: 'field-label' }, 'Phone numbers - fill the WhatsApp column only for numbers confirmed for WhatsApp'));
    (l.phones || []).forEach((p) => {
      const row = el('div', { class: 'row' });
      const d = el('input', { value: p.display, placeholder: '+91 91487 17036', style: 'width:11rem' });
      const t = el('input', { value: p.tel, placeholder: '+919148717036', style: 'width:11rem' });
      const w = el('input', { value: p.whatsapp || '', placeholder: 'WhatsApp digits (blank = no WhatsApp)' });
      d.addEventListener('input', () => p.display = d.value); t.addEventListener('input', () => p.tel = t.value); w.addEventListener('input', () => p.whatsapp = w.value.replace(/[^\d]/g, ''));
      row.appendChild(d); row.appendChild(t); row.appendChild(w);
      row.appendChild(el('button', { class: 'btn danger small', onclick: () => { l.phones = l.phones.filter((x) => x !== p); VIEWS.locations(); } }, 'x'));
      card.appendChild(row);
    });
    card.appendChild(el('button', { class: 'btn ghost small', onclick: () => { l.phones = l.phones || []; l.phones.push({ display: '', tel: '', whatsapp: '' }); VIEWS.locations(); } }, '+ Add number'));
    v.appendChild(card);
  });
  v.appendChild(el('button', { class: 'btn primary', onclick: () => { site.locations.push({ id: 'branch-' + Date.now().toString(36), name: 'New branch', role: 'Branch', country: '', addressLines: [], phones: [], mapQuery: '', hours: '', email: '', note: '' }); api('site.save', site).then(() => VIEWS.locations()); } }, '+ Add branch'));
};

/* ---- contacts & whatsapp ---- */
VIEWS.contacts = async function () {
  $('#view-title').textContent = 'Contact & WhatsApp';
  const site = await api('site.get');
  if (!site || !site.contacts) { $('#view').innerHTML = '<div class="card">Seed the CMS first (scripts/seed-cms.js).</div>'; $('#top-actions').innerHTML = ''; return; }
  const c = site.contacts;
  site.settings = site.settings || {};
  const v = $('#view'); v.innerHTML = '';
  $('#top-actions').innerHTML = '';
  $('#top-actions').appendChild(el('button', { class: 'btn primary small', onclick: () => api('site.save', site).then(() => toast('Contacts live on the website now')).catch((e) => toast(e.message, true)) }, 'Save & go live'));
  const card = el('div', { class: 'card' }, [el('h3', {}, 'Central contact database')]);
  card.appendChild(el('p', { class: 'muted small' }, 'These values feed the header quick-contact, mobile bar, footer and every branch card automatically. Saving here updates the live website without a redeploy.'));
  const mk = (label, value, setter, area) => { const i = area ? el('textarea', { class: 'wide', value }) : el('input', { value }); i.addEventListener('input', () => setter(i.value)); card.appendChild(el('label', { class: 'field-label' }, label)); card.appendChild(i); };
  mk('Official email', c.email, (x) => c.email = x);
  mk('Primary phone display', c.phoneDisplay, (x) => c.phoneDisplay = x);
  mk('Primary phone dial (tel)', c.phoneTel, (x) => c.phoneTel = x);
  mk('WhatsApp number (digits only, country code)', c.whatsappNumber, (x) => c.whatsappNumber = x.replace(/[^\d]/g, ''));
  mk('WhatsApp display', c.whatsappDisplay, (x) => c.whatsappDisplay = x);
  mk('Prefilled WhatsApp message', c.whatsappMessage || '', (x) => { c.whatsappMessage = x; site.settings.whatsappPrefill = x; }, true);
  v.appendChild(card);
  const num = el('div', { class: 'card' }, [el('h3', {}, 'All published numbers')]);
  c.numbers = c.numbers || [];
  c.numbers.forEach((n) => {
    const row = el('div', { class: 'row' });
    const d = el('input', { value: n.display, style: 'width:12rem' });
    const t = el('input', { value: n.tel, style: 'width:12rem' });
    const w = el('input', { value: n.whatsapp || '', placeholder: 'WhatsApp digits (blank = phone only)' });
    const b = el('input', { value: n.branch || '', placeholder: 'Branch label' });
    d.addEventListener('input', () => n.display = d.value); t.addEventListener('input', () => n.tel = t.value);
    w.addEventListener('input', () => n.whatsapp = w.value.replace(/[^\d]/g, '')); b.addEventListener('input', () => n.branch = b.value);
    row.appendChild(d); row.appendChild(t); row.appendChild(w); row.appendChild(b);
    row.appendChild(el('button', { class: 'btn danger small', onclick: () => { c.numbers = c.numbers.filter((x) => x !== n); VIEWS.contacts(); } }, 'x'));
    num.appendChild(row);
  });
  num.appendChild(el('button', { class: 'btn ghost small', onclick: () => { c.numbers.push({ id: 'n' + Date.now().toString(36), display: '', tel: '', whatsapp: '', branch: '' }); VIEWS.contacts(); } }, '+ Add number'));
  v.appendChild(num);
};

/* ---- enquiries ---- */
VIEWS.enquiries = async function () {
  $('#view-title').textContent = 'Forms & Enquiries';
  const r = await api('enquiries.list');
  const v = $('#view'); v.innerHTML = '';
  const tb = $('#top-actions'); tb.innerHTML = '';
  tb.appendChild(el('button', { class: 'btn ghost small', onclick: async () => { const e = await api('enquiries.export'); download('quantum-health-enquiries.csv', e.csv, 'text/csv'); } }, 'Export CSV'));
  const statusF = el('select', { onchange: () => draw() }); ['all', 'new', 'contacted', 'scheduled', 'closed'].forEach((s) => statusF.appendChild(el('option', { value: s }, s)));
  const searchF = el('input', { placeholder: 'Search name, email, topic...', oninput: () => draw(), style: 'width:16rem' });
  v.appendChild(el('div', { class: 'row' }, [statusF, searchF]));
  const table = el('table'); table.innerHTML = '<thead><tr><th>Date</th><th>Name</th><th>Contact</th><th>Topic</th><th>Branch</th><th>Status</th><th></th></tr></thead>';
  const body = el('tbody'); table.appendChild(body); v.appendChild(table);
  function draw() {
    body.innerHTML = '';
    const q = searchF.value.toLowerCase(), s = statusF.value;
    r.items.filter((e) => (s === 'all' || e.status === s) && (!q || JSON.stringify(e).toLowerCase().includes(q))).slice(0, 120).forEach((e) => {
      const key = 'enquiries/' + e.receivedAt.slice(0, 10) + '-' + e.id + '.json';
      body.appendChild(el('tr', {}, [
        el('td', { class: 'small' }, new Date(e.receivedAt).toLocaleString()),
        el('td', {}, [el('b', {}, e.name), el('div', { class: 'small muted' }, e.topic)]),
        el('td', { class: 'small', html: esc(e.email) + '<br>' + esc(e.countryCode + ' ' + e.phone) }),
        el('td', { class: 'small' }, e.topic), el('td', { class: 'small' }, e.preferredBranchLabel || e.preferredBranch),
        el('td', {}, el('span', { class: 'badge ' + (e.status === 'new' ? 'new' : 'done') }, e.status)),
        el('td', {}, el('button', { class: 'btn small', onclick: () => detail(e, key) }, 'Open'))
      ]));
    });
  }
  function detail(e, key) {
    const box = el('div');
    box.appendChild(el('h3', {}, e.name));
    box.appendChild(el('p', { class: 'muted small' }, new Date(e.receivedAt).toLocaleString()));
    box.appendChild(el('div', { class: 'card', html: '<p>' + esc(e.message || '(no message)').replace(/\r?\n/g, '<br>') + '</p>' }));
    box.appendChild(el('p', { class: 'small muted' }, 'Preferred: ' + (e.preferredCountry || '') + ' | ' + (e.preferredBranchLabel || '') + ' | ' + (e.preferredDate || '') + ' ' + (e.preferredTime || '')));
    const note = el('textarea', { class: 'wide', value: e.note || '' });
    box.appendChild(el('label', { class: 'field-label' }, 'Internal note (never shown publicly)'));
    box.appendChild(note);
    const row = el('div', { class: 'row', style: 'margin-top:.7rem' });
    ['new', 'contacted', 'scheduled', 'closed'].forEach((s) => row.appendChild(el('button', { class: 'btn ' + (e.status === s ? 'primary' : 'ghost') + ' small', onclick: async () => { await api('enquiries.patch', { key, status: s, note: note.value }); toast('Status: ' + s); VIEWS.enquiries(); } }, s)));
    row.appendChild(el('button', { class: 'btn danger small', onclick: async () => { if (!confirm('Delete this enquiry permanently?')) return; await api('enquiries.delete', { key }); modalClose(); VIEWS.enquiries(); } }, 'Delete'));
    box.appendChild(row);
    modalOpen(box);
  }
  draw();
};

/* ---- navigation & footer ---- */
VIEWS.nav = async function () {
  $('#view-title').textContent = 'Navigation & Footer';
  const site = await api('site.get');
  if (!site || !site.nav) { $('#view').innerHTML = '<div class="card">Seed the CMS first.</div>'; $('#top-actions').innerHTML = ''; return; }
  const v = $('#view'); v.innerHTML = '';
  $('#top-actions').innerHTML = '';
  $('#top-actions').appendChild(el('button', { class: 'btn primary small', onclick: () => api('site.save', site).then(() => toast('Navigation & footer live now')).catch((e) => toast(e.message, true)) }, 'Save & go live'));
  const navCard = el('div', { class: 'card' }, [el('h3', {}, 'Main navigation'), el('p', { class: 'muted small' }, 'Labels, links, order and visibility apply live. Dropdown children edit the topic links under Surgical and Non-surgical. The header logo artwork is managed through Media Library plus a one-time build (logo changes need a build).')]);
  function redraw() {
    navCard.querySelectorAll('.list-row').forEach((n) => n.remove());
    site.nav.forEach((n, i) => {
      const row = el('div', { class: 'list-row' });
      const lab = el('input', { value: n.label, style: 'width:13rem' }); lab.addEventListener('input', () => n.label = lab.value);
      const href = el('input', { value: n.href, style: 'width:16rem' }); href.addEventListener('input', () => n.href = href.value);
      const vis = el('input', { type: 'checkbox', checked: n.hidden !== true }); vis.addEventListener('change', () => n.hidden = !vis.checked);
      row.appendChild(el('span', { class: 'small muted' }, String(i + 1)));
      row.appendChild(lab); row.appendChild(href); row.appendChild(vis);
      row.appendChild(el('button', { class: 'btn ghost small', onclick: () => { if (i > 0) { const t = site.nav[i - 1]; site.nav[i - 1] = n; site.nav[i] = t; redraw(); } } }, 'up'));
      row.appendChild(el('button', { class: 'btn ghost small', onclick: () => { if (i < site.nav.length - 1) { const t = site.nav[i + 1]; site.nav[i + 1] = n; site.nav[i] = t; redraw(); } } }, 'dn'));
      if (n.children && n.children.length) {
        const det = el('details', { style: 'width:100%' });
        det.appendChild(el('summary', { class: 'small muted' }, 'Dropdown topics (' + n.children.length + ')'));
        n.children.forEach((ch, j) => {
          const r2 = el('div', { class: 'row' });
          const l2 = el('input', { value: ch.label, style: 'width:13rem' }); l2.addEventListener('input', () => ch.label = l2.value);
          const h2 = el('input', { value: ch.href, style: 'width:16rem' }); h2.addEventListener('input', () => ch.href = h2.value);
          r2.appendChild(l2); r2.appendChild(h2);
          r2.appendChild(el('button', { class: 'btn danger small', onclick: () => { n.children.splice(j, 1); redraw(); } }, 'x'));
          det.appendChild(r2);
        });
        det.appendChild(el('button', { class: 'btn ghost small', onclick: () => { n.children.push({ label: 'New topic', href: '/' }); redraw(); } }, '+ Add topic'));
        row.appendChild(det);
      }
      navCard.appendChild(row);
    });
  }
  redraw();
  v.appendChild(navCard);
  site.footer = site.footer || {};
  const foot = el('div', { class: 'card' }, [el('h3', {}, 'Footer')]);
  const mkArea = (label, get, set) => { foot.appendChild(el('label', { class: 'field-label' }, label)); const a = el('textarea', { class: 'wide', value: get() }); a.addEventListener('input', () => set(a.value)); foot.appendChild(a); };
  mkArea('Footer description (first column)', () => site.footer.blurb || '', (x) => site.footer.blurb = x);
  mkArea('Small-print note under the description', () => site.footer.note || '', (x) => site.footer.note = x);
  mkArea('Legal links (label | href, one per line)', () => (site.footer.legal || []).map((x) => x.label + ' | ' + x.href).join('\n'), (x) => site.footer.legal = parsePairs(x));
  mkArea('Social links (label | full URL, one per line)', () => (site.footer.social || []).map((x) => x.label + ' | ' + x.href).join('\n'), (x) => site.footer.social = parsePairs(x));
  mkArea('Explore column (label | href, one per line)', () => (site.footer.explore || []).map((x) => x.label + ' | ' + x.href).join('\n'), (x) => site.footer.explore = parsePairs(x));
  v.appendChild(foot);
};
function parsePairs(x) { return x.split('\n').map((l) => l.split(' | ')).filter((p) => p.length >= 2).map((p) => ({ label: p[0].trim(), href: p[1].trim() })); }

/* ---- SEO ---- */
VIEWS.seo = async function (args) {
  $('#view-title').textContent = 'SEO Manager';
  const pages = await pagesIndex();
  const v = $('#view'); v.innerHTML = '';
  const sel = el('select', { style: 'width:26rem', onchange: () => { location.hash = '#/seo/' + sel.value; load(); } });
  pages.forEach((p) => sel.appendChild(el('option', { value: p.slug }, p.url)));
  if (args && args[0]) sel.value = args[0];
  v.appendChild(el('div', { class: 'card' }, [el('h3', {}, 'Per-page metadata'), sel]));
  const host = el('div'); v.appendChild(host);
  const title = el('input', { style: 'width:100%' });
  const desc = el('textarea', { class: 'wide' });
  const noindex = el('input', { type: 'checkbox' });
  host.appendChild(el('label', { class: 'field-label' }, 'Meta title')); host.appendChild(title);
  host.appendChild(el('label', { class: 'field-label' }, 'Meta description')); host.appendChild(desc);
  host.appendChild(el('label', { class: 'pill-toggle' }, [noindex, ' Ask search engines not to index this page']));
  let doc = null, slug = sel.value;
  async function load() {
    slug = sel.value;
    const data = await api('page.get', { slug });
    doc = data.draft || data.published || blankDoc();
    const pagesInfo = await pagesIndex();
    const p = pagesInfo.find((x) => x.slug === slug) || {};
    title.value = (doc.seo && doc.seo.title) || p.title || '';
    desc.value = (doc.seo && doc.seo.description) || '';
    noindex.checked = !!(doc.seo && doc.seo.noindex);
  }
  const saveSeo = () => { doc.seo = { title: title.value, description: desc.value, noindex: noindex.checked || undefined }; };
  title.addEventListener('input', saveSeo); desc.addEventListener('input', saveSeo); noindex.addEventListener('change', saveSeo);
  await load();
  const actions = el('div', { class: 'card' });
  actions.appendChild(el('button', { class: 'btn ghost small', onclick: async () => { saveSeo(); await api('page.saveDraft', { slug, doc }); toast('SEO draft saved'); } }, 'Save draft'));
  actions.appendChild(el('button', { class: 'btn primary small', onclick: async () => { saveSeo(); await api('page.saveDraft', { slug, doc }); await api('page.publish', { slug }); toast('SEO published'); } }, 'Publish'));
  actions.appendChild(el('span', { class: 'muted small' }, '  Titles apply live on the page. URLs are unchanged, so existing rankings stay intact.'));
  v.appendChild(actions);
  const redir = el('div', { class: 'card' }, [el('h3', {}, 'Redirects (live)'), el('p', { class: 'muted small' }, 'CMS-managed 301/302 redirects apply without redeployment (edge middleware, cached about 60 seconds). Build-time redirects in vercel.json remain in force too.')]);
  const site = await api('site.get').catch(() => null);
  if (site) {
    site.redirects = site.redirects || [];
    site.redirects.forEach((r, i) => {
      const row = el('div', { class: 'row' });
      const f = el('input', { value: r.from, style: 'width:15rem' }); const t2 = el('input', { value: r.to, style: 'width:15rem' });
      f.addEventListener('input', () => r.from = f.value); t2.addEventListener('input', () => r.to = t2.value);
      row.appendChild(f); row.appendChild(t2);
      row.appendChild(el('button', { class: 'btn danger small', onclick: () => { site.redirects.splice(i, 1); api('site.save', site).then(() => VIEWS.seo([slug])); } }, 'x'));
      redir.appendChild(row);
    });
    redir.appendChild(el('button', { class: 'btn ghost small', onclick: () => { site.redirects.push({ from: '/old-url/', to: '/new-url/', permanent: true }); api('site.save', site).then(() => VIEWS.seo([slug])); } }, '+ Add redirect'));
  }
  v.appendChild(redir);
  v.appendChild(el('div', { class: 'card' }, [el('h3', {}, 'Sitemap'), el('a', { href: '/sitemap.xml', target: '_blank', class: 'btn ghost small' }, 'Open sitemap.xml'), el('span', { class: 'muted small' }, '  Generated at build; includes all indexable pages. New pages need a build; existing-page metadata updates live.')]));
};

/* ---- appearance ---- */
VIEWS.appearance = async function () {
  $('#view-title').textContent = 'Global Appearance';
  const site = await api('site.get');
  if (!site) { $('#view').innerHTML = '<div class="card">Seed the CMS first.</div>'; $('#top-actions').innerHTML = ''; return; }
  const t = site.theme || (site.theme = { colors: {}, goldNav: true, animation: 'full' });
  t.colors = t.colors || {};
  const v = $('#view'); v.innerHTML = '';
  $('#top-actions').innerHTML = '';
  $('#top-actions').appendChild(el('button', { class: 'btn primary small', onclick: () => api('site.save', site).then(() => toast('Appearance live across the site')).catch((e) => toast(e.message, true)) }, 'Save & go live'));
  const card = el('div', { class: 'card' });
  card.appendChild(el('h3', {}, 'Brand palette (CSS variables - controlled settings, no code injection)'));
  const swatches = [
    ['navGold', 'Metallic gold (nav hover)', '#D4AF37'], ['navGoldLight', 'Light gold', '#F0D58B'], ['navGoldDark', 'Dark gold', '#9C7628'],
    ['bg', 'Primary maroon background', '#4A0F24'], ['burgundy', 'Burgundy sections', '#641B35'], ['card', 'Card background', '#300A19'],
    ['heading', 'Heading ivory', '#FFF0E8'], ['gold', 'Rules & accents gold', '#D8B58A']
  ];
  swatches.forEach(([key, label, dflt]) => {
    const row = el('div', { class: 'row', style: 'margin:.45rem 0' });
    const inp = el('input', { type: 'color', value: t.colors[key] || dflt, style: 'width:3rem;height:2.2rem;padding:.1rem' });
    inp.addEventListener('input', () => t.colors[key] = inp.value);
    row.appendChild(inp); row.appendChild(el('span', { class: 'grow' }, label + '  (' + (t.colors[key] || dflt) + ')'));
    row.appendChild(el('button', { class: 'btn ghost small', onclick: () => { delete t.colors[key]; VIEWS.appearance(); } }, 'reset'));
    card.appendChild(row);
  });
  const goldNav = el('input', { type: 'checkbox', checked: t.goldNav !== false });
  goldNav.addEventListener('change', () => t.goldNav = goldNav.checked);
  card.appendChild(el('label', { class: 'pill-toggle' }, [goldNav, ' Gold navbar hover glow & animated underline']));
  const anim = el('select');
  [['full', 'Full motion'], ['reduced', 'Reduced (no scroll reveals)'], ['off', 'All animation off']].forEach(([val, lab]) => { const o = el('option', { value: val }, lab); if (t.animation === val) o.selected = true; anim.appendChild(o); });
  anim.addEventListener('change', () => t.animation = anim.value);
  card.appendChild(el('label', { class: 'field-label' }, 'Animation intensity'));
  card.appendChild(anim);
  card.appendChild(el('p', { class: 'muted small' }, 'Fonts, card chrome and button styles follow the built-in premium theme. Visitors using reduced-motion settings are always respected by the base CSS.'));
  v.appendChild(card);
};

/* ---- components ---- */
VIEWS.components = async function () {
  $('#view-title').textContent = 'Reusable Components';
  const data = await api('components.get');
  let blocks = data.blocks || [];
  const v = $('#view'); v.innerHTML = '';
  const card = el('div', { class: 'card' }, [el('h3', {}, 'Shared blocks'), el('p', { class: 'muted small' }, 'Insert these anywhere via the Visual Page Editor (+ section). Editing the library changes future inserts; pages that already received a copy keep their own content, so a mass overwrite can never happen by accident.')]);
  function draw() {
    card.querySelectorAll('.cmp').forEach((n) => n.remove());
    blocks.forEach((b, i) => {
      const name = el('input', { value: b.name, style: 'width:16rem' }); name.addEventListener('input', () => b.name = name.value);
      const html = el('textarea', { class: 'wide', value: b.html }); html.addEventListener('input', () => b.html = html.value);
      card.appendChild(el('div', { class: 'cmp card' }, [el('div', { class: 'row' }, [name, el('button', { class: 'btn danger small', onclick: () => { blocks.splice(i, 1); draw(); } }, 'Remove')]), html]));
    });
    card.appendChild(el('button', { class: 'btn ghost small', onclick: () => { blocks.push({ id: 'cmp' + Date.now().toString(36), name: 'New block', html: '<section class="section"><div class="container"><h2 class="h2">Shared block</h2><p>Edit the text.</p></div></section>' }); draw(); } }, '+ New block'));
  }
  draw(); v.appendChild(card);
  $('#top-actions').innerHTML = '';
  $('#top-actions').appendChild(el('button', { class: 'btn primary small', onclick: () => api('components.save', { blocks }).then(() => toast('Library saved')).catch((e) => toast(e.message, true)) }, 'Save library'));
};

/* ---- placeholders ---- */
VIEWS.placeholders = async function () {
  $('#view-title').textContent = 'Placeholder Audit';
  const v = $('#view'); v.innerHTML = '<p class="muted">Scanning...</p>';
  const [base, live, queue] = await Promise.all([
    fetch('/assets/data/qh-placeholders.json').then((r) => r.json()).catch(() => ({ findings: [] })),
    api('placeholders.scan').catch(() => ({ findings: [] })),
    api('review-queue.list').catch(() => ({ items: [] }))
  ]);
  v.innerHTML = '';
  const c1 = el('div', { class: 'card' }, [el('h3', {}, 'Built content scan (last deploy: ' + String(base.generatedAt || '-').slice(0, 10) + ')')]);
  if (!base.findings.length) c1.appendChild(el('p', {}, 'OK - no lorem-ipsum, dummy numbers or template leftovers found in the built pages.'));
  else base.findings.forEach((f) => c1.appendChild(el('div', { class: 'list-row' }, [el('span', { class: 'badge warn' }, f.pattern), el('span', { class: 'grow' }, f.page), el('span', { class: 'muted small' }, 'x' + f.count), el('a', { class: 'btn small', href: '#/editor/' + f.page.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home' }, 'Fix')])));
  v.appendChild(c1);
  const c2 = el('div', { class: 'card' }, [el('h3', {}, 'CMS data scan (drafts & published)')]);
  if (!live.findings.length) c2.appendChild(el('p', {}, 'OK - CMS records are clean.'));
  else live.findings.forEach((f) => c2.appendChild(el('div', { class: 'list-row' }, [el('span', { class: 'badge warn' }, f.pattern), el('span', { class: 'grow' }, f.page), el('span', { class: 'muted small' }, String(f.detail).slice(0, 120))])));
  v.appendChild(c2);
  const c3 = el('div', { class: 'card' }, [el('h3', {}, 'Safety & verification review queue'), el('p', { class: 'muted small' }, 'Medical claims that require professional approval before being presented as verified. They are kept out of public text and tracked here.')]);
  queue.items.forEach((q) => c3.appendChild(el('div', { class: 'list-row' }, [el('span', { class: 'badge' }, q.kind), el('span', { class: 'grow' }, q.note)])));
  v.appendChild(c3);
};

/* ---- revisions ---- */
VIEWS.revisions = async function () {
  $('#view-title').textContent = 'Revision History';
  const pages = await pagesIndex();
  const v = $('#view'); v.innerHTML = '';
  const sel = el('select', { style: 'width:24rem' });
  pages.forEach((p) => sel.appendChild(el('option', { value: p.slug }, p.url)));
  const go = el('button', { class: 'btn primary small', onclick: load }, 'Load');
  v.appendChild(el('div', { class: 'card row' }, [el('h3', {}, 'Page versions'), sel, go]));
  const host = el('div'); v.appendChild(host);
  async function load() {
    const slug = sel.value;
    const r = await api('page.revisions', { slug });
    host.innerHTML = '';
    const card = el('div', { class: 'card' }, [el('h3', {}, 'Versions of ' + slug)]);
    if (!r.list.length) card.appendChild(el('p', { class: 'muted' }, 'No versions recorded yet for this page.'));
    r.list.forEach((rev) => card.appendChild(el('div', { class: 'list-row' }, [
      el('span', { class: 'grow' }, new Date(rev.at).toLocaleString() + ' - ' + (rev.label || '')),
      el('button', { class: 'btn small', onclick: async () => { if (!confirm('Restore this version as the live content?')) return; await api('page.restore', { slug, rev: rev.rev }); toast('Restored'); } }, 'Restore')
    ])));
    host.appendChild(card);
  }
  const siteRevs = el('div', { class: 'card' }, [el('h3', {}, 'Site settings versions')]);
  api('site.revisions').then((r) => {
    (r.list || []).slice(0, 12).forEach((rev) => siteRevs.appendChild(el('div', { class: 'list-row' }, [
      el('span', { class: 'grow' }, new Date(rev.at).toLocaleString()),
      el('button', { class: 'btn small', onclick: async () => { if (!confirm('Restore site-wide settings to this point?')) return; await api('site.restore', { rev: rev.rev }); toast('Site settings restored'); } }, 'Restore')
    ])));
  }).catch(() => {});
  host.appendChild(siteRevs);
};

/* ---- security ---- */
VIEWS.security = async function () {
  $('#view-title').textContent = 'Admin Security';
  const v = $('#view'); v.innerHTML = '';
  const me = await api('me');
  const pw = el('div', { class: 'card' }, [el('h3', {}, 'Password')]);
  const cur = el('input', { type: 'password', autocomplete: 'current-password' });
  const nx = el('input', { type: 'password', autocomplete: 'new-password' });
  pw.appendChild(el('p', { class: 'muted small' }, 'Administrator account: ' + esc(me.email) + ' - scrypt-hashed password, HTTP-only session cookies (8h sliding expiry), login rate limiting, public registration disabled.'));
  pw.appendChild(el('label', { class: 'field-label' }, 'Current password')); pw.appendChild(cur);
  pw.appendChild(el('label', { class: 'field-label' }, 'New password (12+ chars, upper+lower case, number, symbol)')); pw.appendChild(nx);
  pw.appendChild(el('button', { class: 'btn primary', style: 'margin-top:.7rem', onclick: async () => { try { await api('security.password.change', { current: cur.value, next: nx.value }); toast('Password changed. Other sessions revoked.'); cur.value = nx.value = ''; } catch (e) { toast(e.message, true); } } }, 'Change password'));
  v.appendChild(pw);
  const tw = el('div', { class: 'card' }, [el('h3', {}, 'Two-factor authentication')]);
  if (me.totp) tw.appendChild(el('p', {}, 'Two-factor is ENABLED for this account.'));
  const pass = el('input', { type: 'password', placeholder: 'password (to disable)' });
  const show = el('div');
  tw.appendChild(el('button', { class: 'btn ghost small', onclick: async () => {
    try {
      const pending = await api('security.totp.begin');
      show.innerHTML = '';
      show.appendChild(el('p', { class: 'muted small' }, 'Add this key to your authenticator app (Google Authenticator, Authy, 1Password):'));
      show.appendChild(el('code', {}, pending.secret));
      show.appendChild(el('p', { class: 'small' }, el('a', { href: pending.otpauth, target: '_blank', rel: 'noopener' }, 'otpauth:// link (opens in authenticator apps)')));
    } catch (e) { toast(e.message, true); }
  } }, 'Enable two-factor'));
  tw.appendChild(show);
  const code = el('input', { inputmode: 'numeric', maxlength: '6', placeholder: '6-digit code', style: 'width:8rem' });
  tw.appendChild(el('div', { class: 'row', style: 'margin-top:.6rem' }, [
    code,
    el('button', { class: 'btn small', onclick: async () => { try { await api('security.totp.confirm', { code: code.value }); toast('Two-factor enabled - a code is required at each sign-in.'); VIEWS.security(); } catch (e) { toast(e.message, true); } } }, 'Confirm enable'),
    pass, el('button', { class: 'btn danger small', onclick: async () => { try { await api('security.totp.disable', { password: pass.value }); toast('Two-factor disabled'); VIEWS.security(); } catch (e) { toast(e.message, true); } } }, 'Disable 2FA')
  ]));
  v.appendChild(tw);
  const sw = el('div', { class: 'card' }, [el('h3', {}, 'Active sessions')]);
  const s = await api('security.sessions');
  (s.sessions || []).forEach((x) => sw.appendChild(el('div', { class: 'list-row' }, [el('span', { class: 'grow' }, (x.current ? 'this device | ' : '') + new Date(x.lastSeen || x.createdAt).toLocaleString()), el('span', { class: 'muted small' }, '...' + x.tokenTail)])));
  sw.appendChild(el('button', { class: 'btn danger small', style: 'margin-top:.6rem', onclick: async () => { await api('security.logoutAll'); toast('Signed out everywhere'); setTimeout(() => location.reload(), 800); } }, 'Sign out all devices'));
  v.appendChild(sw);
};

/* ---- settings ---- */
VIEWS.settings = async function () {
  $('#view-title').textContent = 'Settings';
  const site = await api('site.get');
  const v = $('#view'); v.innerHTML = '';
  if (site) {
    site.settings = site.settings || {};
    const card = el('div', { class: 'card' }, [el('h3', {}, 'Forms & notifications')]);
    const notify = el('input', { value: site.settings.formNotifyEmail || '', placeholder: 'enquiry notification inbox' });
    notify.addEventListener('input', () => site.settings.formNotifyEmail = notify.value);
    card.appendChild(el('label', { class: 'field-label' }, 'Enquiry notification email (falls back to the published clinic mailbox)'));
    card.appendChild(notify);
    card.appendChild(el('p', { class: 'muted small' }, 'Form fields, topics and validation are defined by the appointment form; spam is filtered by honeypot + rate limiting. The confirmation text lives on the Contact page - edit it in the Visual Page Editor.'));
    v.appendChild(card);
    const save = el('button', { class: 'btn primary small' }, 'Save settings');
    save.addEventListener('click', () => api('site.save', site).then(() => toast('Settings saved')).catch((e) => toast(e.message, true)));
    v.appendChild(el('div', { class: 'row' }, [save]));
  }
  const db = el('div', { class: 'card' }, [el('h3', {}, 'Storage & environment')]);
  const probe = await fetch('/api/qh/content/?page=/').then((r) => r.status).catch(() => 0);
  db.appendChild(el('p', {}, 'Content API: ' + (probe === 200 ? 'CONNECTED (Vercel Blob database)' : 'ERROR HTTP ' + probe)));
  db.appendChild(el('p', { class: 'muted small' }, 'Pages, media, doctors, contacts, enquiries, revisions and the audit log share one private Blob store behind /api/qh. Backups:'));
  db.appendChild(el('button', { class: 'btn ghost small', onclick: async () => { const b = await api('backup.export'); download('qh-cms-backup.json', JSON.stringify(b, null, 1)); } }, 'Export full JSON backup'));
  v.appendChild(db);
};

/* ---------------- start ---------------- */
window.QH_ADMIN_DEBUG = { ED, handlePick, selectField, VIEWS };
boot();
