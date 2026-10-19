'use strict';
const terms = [
  {term:'breast implant', def:'A medical device placed to increase breast volume.'},
  {term:'silicone implant', def:'Implant filled with cohesive silicone gel.'},
  {term:'saline implant', def:'Implant filled with sterile salt water.'},
  {term:'capsular contracture', def:'Tightening of scar capsule around implant.'},
  {term:'fat transfer', def:'Augmentation using patient\'s own fat.'},
  {term:'revision surgery', def:'Surgery to adjust, replace or remove implants.'},
  {term:'mastopexy', def:'Breast lift to reposition tissue and nipple.'}
];
terms.forEach(t=>{ t.slug = t.term.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); });
terms.sort((a,b)=> b.term.length-a.term.length);
function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function autoLink(html){
  const used = new Set();
  const parts = html.split(/(<[^>]*>)/g);
  let depth=0, inHead=false;
  for (let i=0;i<parts.length;i++){
    const p = parts[i];
    if (p[0]==='<'){
      if (/^<a[\s>]/i.test(p)) depth++;
      else if (/^<\/a>/i.test(p)) depth = Math.max(0,depth-1);
      else if (/^<h[2-4][\s>]/i.test(p)) inHead=true;
      else if (/^<\/h[2-4]>/i.test(p)) inHead=false;
      continue;
    }
    if (depth>0 || inHead) continue;
    for (const t of terms){
      if (used.has(t.slug)) continue;
      const re = new RegExp('(?<![\\w>-])('+escapeRe(t.term)+')s?(?![\\w<])','i');
      if (re.test(p)){
        parts[i] = p.replace(re, '<a class="glossary-link" href="/wiki/glossary/#'+t.slug+'">$1</a>');
        used.add(t.slug);
        break;
      }
    }
  }
  return parts.join('');
}
module.exports = { terms, autoLink };
