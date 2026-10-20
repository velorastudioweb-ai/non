'use strict';

/* Glossary of breast-enlargement terms used across the site.
   Definitions are deliberately short and non-promotional. `slug` anchors the
   term on /glossary/ and is used by autoLink() for inline references. */
const terms = [
  { term: 'breast implant', def: 'A medical device placed surgically to increase breast volume or restore shape, filled with saline (salt water) or silicone gel.' },
  { term: 'silicone implant', def: 'A breast implant filled with silicone gel, which tends to feel more like natural breast tissue and does not collapse if the shell leaks.' },
  { term: 'saline implant', def: 'A breast implant filled with sterile salt water; if the shell leaks, the implant collapses and the fluid is absorbed or expelled.' },
  { term: 'cohesive gel implant', def: 'A silicone implant whose gel holds together, so it tends to stay in shape even if the shell is cut; often called form-stable or "gummy bear".' },
  { term: 'capsular contracture', def: 'Tightening and hardening of the scar tissue capsule that naturally forms around an implant; a common reason for revision surgery.' },
  { term: 'capsulectomy', def: 'Surgical removal of the scar capsule around a breast implant, sometimes performed at the same time as implant exchange or removal.' },
  { term: 'implant rupture', def: 'Loss of integrity of a breast implant shell. A silicone rupture can be "silent", producing no symptoms, which is why screening is advised.' },
  { term: 'BIA-ALCL', def: 'Breast implant-associated anaplastic large cell lymphoma — a rare lymphoma of the fluid or capsule around an implant, linked mainly to textured implants.' },
  { term: 'BIA-SCC', def: 'Breast implant-associated squamous cell carcinoma — a very rare cancer in the capsule around an implant.' },
  { term: 'breast implant illness', def: 'A term used for self-reported systemic symptoms such as fatigue, "brain fog", joint pain and rash attributed to implants; not an established diagnosis.' },
  { term: 'fat transfer', def: 'Enlargement or reshaping using the patient\'s own fat, removed by liposuction, processed and injected into the breast. Also called lipofilling or autologous fat grafting.' },
  { term: 'lipofilling', def: 'Another name for fat transfer: injecting the patient\'s own fat, usually after liposuction, to add volume or refine shape.' },
  { term: 'autologous fat grafting', def: 'The transfer of a patient\'s own (autologous) fat from one part of the body to another; the scientific name for fat transfer.' },
  { term: 'fat necrosis', def: 'Death of transferred fat cells that fail to establish a blood supply; may cause lumps, oil cysts or calcification visible on imaging.' },
  { term: 'oil cyst', def: 'A pocket of liquefied fat that can form after fat necrosis following fat transfer; usually benign but may require assessment.' },
  { term: 'external volume expansion', def: 'Pre-stretching the breast with a bra-like vacuum device worn for hours a day for weeks before fat transfer, aiming to improve fat survival.' },
  { term: 'revision surgery', def: 'An operation to adjust, exchange, reposition or remove breast implants after a previous procedure.' },
  { term: 'explantation', def: 'Surgical removal of breast implants, with or without replacement.' },
  { term: 'mastopexy', def: 'A breast lift: reshaping and raising sagging breasts without deliberately adding volume.' },
  { term: 'ptosis', def: 'Sagging or drooping of the breast; its degree helps determine whether a lift is appropriate.' },
  { term: 'breast augmentation', def: 'Surgery to increase breast size or change shape, using implants or, in selected cases, the patient\'s own fat.' },
  { term: 'breast reduction', def: 'Surgery that removes breast tissue, fat and skin to reduce breast size and weight, often to relieve physical symptoms.' },
  { term: 'transaxillary', def: 'An approach to breast augmentation through an incision in the armpit (axilla).' },
  { term: 'inframammary fold', def: 'The natural crease under the breast; a common and well-hidden incision site for implant placement.' },
  { term: 'periareolar', def: 'An approach or incision around the edge of the areola.' },
  { term: 'submuscular', def: 'Placing a breast implant behind the pectoral muscle.' },
  { term: 'subglandular', def: 'Placing a breast implant behind the breast tissue but in front of the pectoral muscle.' },
  { term: 'PRP', def: 'Platelet-rich plasma: a preparation made by concentrating platelets from the patient\'s own blood, used in various regenerative procedures.' },
  { term: 'biostimulator', def: 'A broad category of injectable products intended to stimulate a tissue response such as collagen production, for selected approved indications.' },
  { term: 'poly-L-lactic acid', def: 'A biodegradable collagen-stimulating injectable (for example Sculptra), licensed for specific facial indications, not for breast enlargement.' },
  { term: 'dermal filler', def: 'An injectable product used for certain approved aesthetic indications; not approved for breast enlargement.' },
  { term: 'hyaluronic acid filler', def: 'A gel filler based on hyaluronic acid, used for approved aesthetic indications; its suitability for the breast is not established.' },
  { term: 'liquid silicone', def: 'Injectable silicone that is not an implant and must never be used to enlarge the breast; linked to disfigurement, embolism and death.' },
  { term: 'mammography', def: 'X-ray imaging of the breast used for screening and diagnosis; implants, fat transfer and fillers can change its appearance.' },
  { term: 'MRI screening', def: 'Magnetic resonance imaging used to check silicone implants for silent rupture, recommended by the FDA at intervals after placement.' },
  { term: 'seroma', def: 'A collection of fluid that can form after surgery or around an implant.' },
  { term: 'haematoma', def: 'A collection of blood (bruise) that can form after surgery and may require drainage.' }
];

/* de-duplicate by slug, keeping first occurrence */
const seen = new Set();
const unique = [];
terms.forEach((t) => {
  const slug = t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (seen.has(slug)) return;
  seen.add(slug);
  unique.push({ term: t.term, def: t.def, slug });
});

/* Sort longest term first so multi-word terms win over substrings. */
unique.sort((a, b) => b.term.length - a.term.length);

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* Inline-link the first occurrence of each glossary term in an HTML fragment,
   skipping anything already inside a link or a heading. */
function autoLink(html) {
  const used = new Set();
  const parts = html.split(/(<[^>]*>)/g);
  let depth = 0, inHead = false;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p[0] === '<') {
      if (/^<a[\s>]/i.test(p)) depth++;
      else if (/^<\/a>/i.test(p)) depth = Math.max(0, depth - 1);
      else if (/^<h[2-4][\s>]/i.test(p)) inHead = true;
      else if (/^<\/h[2-4]>/i.test(p)) inHead = false;
      continue;
    }
    if (depth > 0 || inHead) continue;
    for (const t of unique) {
      if (used.has(t.slug)) continue;
      const re = new RegExp('(?<![\\w>-])(' + escapeRe(t.term) + ')s?(?![\\w<])', 'i');
      if (re.test(p)) {
        parts[i] = p.replace(re, '<a class="glossary-link" href="/glossary/#' + t.slug + '">$1</a>');
        used.add(t.slug);
        break;
      }
    }
  }
  return parts.join('');
}

module.exports = { terms: unique, autoLink };
