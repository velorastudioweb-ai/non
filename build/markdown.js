'use strict';

function parseFrontMatter(src) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!m) return { data: {}, body: src };
  const root = {};
  const frames = [{ indent: -1, map: root, pendingKey: null }];
  function unquote(s) { if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1); return s; }
  function coerce(v) {
    v = v.trim();
    if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(',').map((s) => unquote(s.trim())).filter((x) => x !== '');
    if (/^(true|false)$/i.test(v)) return v.toLowerCase() === 'true';
    if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
    return unquote(v);
  }
  function trim(indent) { while (frames.length > 1 && frames[frames.length-1].indent >= indent) frames.pop(); }
  for (const raw of m[1].split(/\r?\n/)) {
    if (!raw.trim() || /^\s*#/.test(raw)) continue;
    const indent = raw.match(/^\s*/)[0].length;
    const line = raw.trim();
    const li = /^-\s+(.*)$/.exec(line);
    if (li) {
      let owner = null;
      for (let f = frames.length-1; f>=0; f--) { if (frames[f].pendingKey && frames[f].indent < indent) { owner = frames[f]; break; } }
      if (!owner) continue;
      const arr = owner.map[owner.pendingKey] || (owner.map[owner.pendingKey] = []);
      const kvm = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(li[1]);
      if (kvm) {
        const obj = {}; obj[kvm[1]] = kvm[2] === '' ? null : coerce(kvm[2]); arr.push(obj); frames.push({ indent: indent, map: obj, pendingKey: null });
      } else { arr.push(coerce(li[1])); }
      continue;
    }
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (kv) { trim(indent); const top = frames[frames.length-1]; if (kv[2] === '') { top.map[kv[1]] = null; top.pendingKey = kv[1]; } else { top.map[kv[1]] = coerce(kv[2]); top.pendingKey = null; } }
  }
  return { data: root, body: src.slice(m[0].length) };
}
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function inline(s) {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, txt, href) { var ext = /^https?:/.test(href); return '<a href="'+href+'"'+(ext?' rel="noopener noreferrer"':'')+'>'+txt+'</a>'; });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  return out;
}
function markdownToHtml(md) {
  const lines = md.split(/\r?\n/);
  const html = [];
  let para = [], list = null, table = null;
  function flush() {
    if (para.length) { html.push('<p>'+inline(para.join(' '))+'</p>'); para=[]; }
    if (list) { html.push('<'+list.type+'>'+list.items.map(function(it){return '<li>'+inline(it)+'</li>'}).join('')+'</'+list.type+'>'); list=null; }
    if (table) {
      const head = table.rows[0]; const body = table.rows.slice(1);
      let t = '<div class="table-wrap"><table><thead><tr>'+head.map(function(c){return '<th>'+inline(c)+'</th>'}).join('')+'</tr></thead><tbody>';
      t += body.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+inline(c)+'</td>'}).join('')+'</tr>'}).join('');
      t += '</tbody></table></div>'; html.push(t); table=null;
    }
  }
  for (let i=0; i<lines.length; i++) {
    const line = lines[i], t = line.trim();
    if (!t) { flush(); continue; }
    const h = /^(#{2,4})\s+(.*)$/.exec(t);
    if (h) { flush(); html.push('<h'+h[1].length+'>'+inline(h[2])+'</h'+h[1].length+'>'); continue; }
    const ul = /^[-*]\s+(.*)$/.exec(t);
    if (ul) { if (para.length) { flush(); } if (!list || list.type !== 'ul') { if (list) flush(); list = {type:'ul', items:[]}; } list.items.push(ul[1]); continue; }
    const ol = /^\d+\.\s+(.*)$/.exec(t);
    if (ol) { if (para.length) flush(); if (!list || list.type !== 'ol') { if (list) flush(); list = {type:'ol', items:[]}; } list.items.push(ol[1]); continue; }
    if (/^\|.*\|$/.test(t)) { if (para.length) flush(); if (list) flush(); if (!table) table = {rows:[]}; table.rows.push(t.slice(1,-1).split('|').map(function(c){return c.trim()})); continue; }
    para.push(t);
  }
  flush();
  return html.join('\n');
}
function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60); }
function extractToc(html) {
  const toc = []; const re = /<h([23]) id="([^"]+)">([^<]+(?:<[^>]+>[^<]*)*)<\/h\1>/g; let m;
  while ((m = re.exec(html))) toc.push({ level: Number(m[1]), id: m[2], text: m[3].replace(/<[^>]+>/g,'') });
  return toc;
}
module.exports = { parseFrontMatter, markdownToHtml, slugify, extractToc, esc, inline };
