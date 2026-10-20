'use strict';

/* =============================================================================
   Cochrane Library dataset for "breast augmentation / breast enlargement".

   Curates every Cochrane systematic review and registered review protocol
   relevant to breast enlargement, implant surgery and implant-based
   reconstruction, enriches it with publication metadata from NCBI PubMed,
   and writes a static JSON asset used by /research/cochrane-breast-enlargement/.

   Source: Cochrane Library (cochranelibrary.com) record list, verified against
           PubMed "Cochrane Database Syst Rev" citations and the Cochrane
           Library record pages in October 2026.
   Run with: node build/fetch-cochrane.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const EUTILS = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
const TOOL = 'quantumhealth-website';
const EMAIL = 'enquiries@nonsurgicalbreastenlargement.in';
const OUT = path.join(__dirname, '..', 'public', 'assets', 'data', 'cochrane-breast-enlargement.json');

const COCHRANE = 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.';
const doiUrl = (doi) => 'https://doi.org/' + doi;
const cdUrl = (id) => COCHRANE + id + '/full';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function esummary(ids, attempt = 1) {
  const body = new URLSearchParams(Object.assign({ tool: TOOL, email: EMAIL }, {
    db: 'pubmed', retmode: 'json', id: ids.join(',')
  }));
  let res;
  try {
    res = await fetch(EUTILS + 'esummary.fcgi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
  } catch (err) {
    if (attempt > 5) throw err;
    await sleep(1000 * attempt);
    return esummary(ids, attempt + 1);
  }
  if (res.status === 429 || res.status >= 500) {
    if (attempt > 5) throw new Error('NCBI error ' + res.status);
    await sleep(1500 * attempt);
    return esummary(ids, attempt + 1);
  }
  if (!res.ok) throw new Error('NCBI error ' + res.status);
  return JSON.parse(await res.text());
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function formatDate(pubdate) {
  const m = /^(\d{4})(?: ([A-Za-z]{3}))?(?: (\d{1,2}))?$/.exec(String(pubdate || '').trim());
  if (!m) return '';
  const month = m[2] ? MONTHS.findIndex((x) => x.toLowerCase().startsWith(m[2].toLowerCase())) : -1;
  if (month < 0) return m[1];
  return (m[3] ? Number(m[3]) + ' ' : '') + MONTHS[month] + ' ' + m[1];
}

/* ---------------------------------------------------------------------------
   Curated record set. Titles and statuses were verified against the Cochrane
   Library record pages; `updated` falls back to these values when PubMed
   metadata cannot be fetched.
   ------------------------------------------------------------------------- */
const DOCUMENTS = [
  {
    id: 'CD007258.pub3',
    title: 'Wound drainage after plastic and reconstructive surgery of the breast',
    category: 'augmentation',
    kind: 'Cochrane Review',
    status: 'Completed review',
    doi: '10.1002/14651858.CD007258.pub3',
    pmid: '26487173',
    updated: '2015',
    summary: 'Whether surgical wound drains should be placed after breast augmentation, reduction or reconstruction. Three randomised trials (306 women, 505 breasts) were found out of 190 screened studies — all of them in breast reduction — comparing drains with no drains after surgery.',
    keyPoints: [
      'Across the three trials, drains produced no statistically significant improvement in infection, other wound complications, pain, bruising, seroma, haematoma or reoperation.',
      'Women who were not drained left hospital a mean 0.77 days sooner (95% CI 0.40 to 1.14 days sooner; low-certainty evidence) — the only significant result.',
      'No trials of drains after breast augmentation or breast reconstruction were identified, so the findings apply to breast reduction only.',
      'Cochrane concludes that the limited evidence shows no significant benefit of routine post-operative drains, and that augmentation and reconstruction still require investigation.'
    ]
  },
  {
    id: 'CD010895.pub2',
    title: 'Different types of implants for reconstructive breast surgery',
    category: 'implant-types',
    kind: 'Cochrane Review',
    status: 'Completed review',
    doi: '10.1002/14651858.CD010895.pub2',
    pmid: '27182693',
    updated: '2016',
    summary: 'Whether different breast implant types — textured or smooth, silicone or saline, anatomical or round, variable or fixed volume — change capsular contracture, complications, satisfaction and quality of life after reconstructive breast surgery. Five randomised trials with 202 participants were found.',
    keyPoints: [
      'Every comparison was rated very low quality evidence: the trials were small, at unclear or high risk of bias, and too different from each other to pool.',
      'In one trial of 60 women, saline implants had less severe capsular contracture and higher satisfaction than silicone implants, but reinterventions were significantly more frequent with saline.',
      'No comparison reached statistical significance for textured versus smooth silicone implants (1 study, 20 women) or anatomical versus round implants (1 study, 36 women).',
      'No trials compared fifth-generation silicone implants or different manufacturers; the review concludes that surgeons still cannot counsel women on implant choice on the basis of randomised evidence.'
    ]
  },
  {
    id: 'CD013821.pub2',
    title: 'Implants versus autologous tissue flaps for breast reconstruction following mastectomy',
    category: 'reconstruction',
    kind: 'Cochrane Review',
    status: 'Completed review',
    doi: '10.1002/14651858.CD013821.pub2',
    pmid: '39479986',
    updated: '2024',
    summary: 'Implant-based versus own-tissue (flap) reconstruction after mastectomy — quality of life, satisfaction and short- and long-term complications. Thirty-five non-randomised studies with 57,555 participants met the criteria; no randomised trials were found.',
    keyPoints: [
      'Implants may reduce psychosocial well-being (mean difference -4.26 on a 0–100 scale; low-certainty evidence) and sexual well-being (-6.63; low-certainty) versus autologous flaps on BREAST-Q measures.',
      'Women may be less satisfied with the reconstruction with implants (-5.96; low-certainty) and with the breast itself (-8.17; very low-certainty).',
      'Long-term complications may be more frequent with implants (risk ratio 1.56, 95% CI 1.09 to 2.22; very low-certainty), while implant surgery was about 125 minutes shorter (very low-certainty).',
      'All evidence came from non-randomised studies (26 at serious overall risk of bias); the review found no superior technique for every woman and called for randomised trials.'
    ]
  },
  {
    id: 'CD016344',
    title: 'Breast implant insertion funnels for preventing capsular contracture',
    category: 'augmentation',
    kind: 'Cochrane Protocol',
    status: 'Review in progress',
    doi: '10.1002/14651858.CD016344',
    pmid: '41909996',
    updated: '2026',
    summary: 'Registered protocol for a review that will assess the effects of breast implant insertion funnels — devices used to guide the implant into place while minimising contact with skin — on capsular contracture rates in women having breast reconstruction or breast augmentation.',
    keyPoints: [
      'This is a protocol, not a completed review: no results are available yet.',
      'The primary outcome planned is capsular contracture, alongside other complications, with both randomised and non-randomised studies eligible.',
      'The protocol anticipates few, if any, randomised trials of funnels, because capsular contracture often appears years after surgery and has many causes.'
    ]
  },
  {
    id: 'CD015961',
    title: 'Mesh for immediate implant-based prepectoral breast reconstruction following mastectomy',
    category: 'reconstruction',
    kind: 'Cochrane Protocol',
    status: 'Review in progress',
    doi: '10.1002/14651858.CD015961',
    pmid: '40525534',
    updated: '2025',
    summary: 'Registered protocol for a review of biological or synthetic mesh used to support a prepectoral implant (placed above the muscle) in immediate breast reconstruction after mastectomy.',
    keyPoints: [
      'This is a protocol, not a completed review: no results have been published.',
      'It plans to compare mesh versus no mesh, and biological versus synthetic mesh, for complications, patient-reported outcomes and reoperation after prepectoral reconstruction.',
      'Prepectoral placement is one of the placement options also discussed in breast augmentation, so the review will be relevant to implant positioning debate generally.'
    ]
  },
  {
    id: 'CD011966',
    title: 'Acellular dermal matrices for breast reconstruction surgery',
    category: 'reconstruction',
    kind: 'Cochrane Protocol',
    status: 'Review in progress',
    doi: '10.1002/14651858.CD011966',
    pmid: '',
    updated: '2015',
    summary: 'Registered protocol for a review of acellular dermal matrices (biological meshes derived from human or animal skin) used around implants in immediate prosthetic breast reconstruction after cancer or risk-reducing surgery.',
    keyPoints: [
      'This protocol was registered in 2015; no completed review has been published under this title.',
      'It plans to compare reconstruction with versus without acellular dermal matrix for seroma, infection, skin flap necrosis, haematoma, reconstruction failure and implant removal.',
      'The protocol notes that some studies suggest dermal matrix may raise complication rates, which the review is intended to test.'
    ]
  },
  {
    id: 'CD010793.pub2',
    title: 'Autologous fat grafting for breast reconstruction',
    category: 'fat-grafting',
    kind: 'Cochrane Protocol',
    status: 'Withdrawn',
    doi: '10.1002/14651858.CD010793.pub2',
    pmid: '',
    updated: '29 June 2021',
    summary: 'Protocol for a review of autologous fat grafting — transferring the patient\'s own fat into the breast — for breast reconstruction after cancer surgery. Cochrane withdrew the protocol because the authors were no longer able to complete the review.',
    keyPoints: [
      'Cochrane withdrew this protocol: "the authors are no longer able to complete this review", so no Cochrane systematic review of fat grafting exists under this title.',
      'The protocol itself was published on 29 June 2021 and remains readable as a record of the intended methods.',
      'No Cochrane review has examined fat transfer for cosmetic breast enlargement either.'
    ]
  }
];

const CATEGORIES = [
  {
    id: 'augmentation',
    name: 'Augmentation and implant technique',
    description: 'Cochrane records that address breast enlargement directly — wound drains after augmentation surgery and the implant insertion techniques used to prevent capsular contracture.'
  },
  {
    id: 'implant-types',
    name: 'Implant types and materials',
    description: 'Cochrane reviews comparing implant surfaces, fillers and shapes, and what the randomised evidence does and does not establish about choosing between them.'
  },
  {
    id: 'reconstruction',
    name: 'Implant-based reconstruction',
    description: 'Reviews and registered protocols on reconstruction after mastectomy: implants versus the patient\'s own tissue, and the meshes and dermal matrices used to support implants.'
  },
  {
    id: 'fat-grafting',
    name: 'Fat transfer',
    description: 'The Cochrane record on fat grafting — withdrawn before any review was completed — and the evidence gap it leaves.'
  }
];

const FACTS = [
  {
    topic: 'Wound drains',
    statement: 'Randomised evidence does not support routine drains after breast surgery: in three trials (306 women) drains did not reduce complications, and hospital stay was about 0.8 days shorter without them. Every trial was in breast reduction — none in augmentation.',
    source: 'CD007258.pub3'
  },
  {
    topic: 'Implant type',
    statement: 'No randomised trial of usable quality establishes one implant type as better than another. All five trials (202 participants) were rated very low quality evidence, and neither textured-versus-smooth nor anatomical-versus-round comparisons reached significance.',
    source: 'CD010895.pub2'
  },
  {
    topic: 'Implants versus own tissue',
    statement: 'Across 35 non-randomised studies (57,555 participants), implants may mean lower psychosocial and sexual well-being and less satisfaction than autologous flaps, but about 125 minutes shorter surgery — with low to very low certainty throughout.',
    source: 'CD013821.pub2'
  },
  {
    topic: 'Capsular contracture',
    statement: 'Whether implant insertion funnels reduce capsular contracture is being assessed in a review registered in 2026. No results exist yet, and the protocol expects few randomised trials to be found.',
    source: 'CD016344'
  },
  {
    topic: 'Mesh and dermal matrix',
    statement: 'Two registered protocols — mesh for prepectoral support and acellular dermal matrices — still have no completed review, leaving implant-support techniques without a Cochrane synthesis.',
    source: 'CD015961'
  },
  {
    topic: 'Fat transfer',
    statement: 'Cochrane has never published a review of fat transfer for breast enlargement. The protocol on fat grafting for reconstruction was withdrawn in 2021 because the authors could not complete it.',
    source: 'CD010793.pub2'
  }
];

async function main() {
  const byPmid = {};
  DOCUMENTS.forEach((d) => { if (d.pmid) byPmid[d.pmid] = d; });

  try {
    const json = await esummary(Object.keys(byPmid));
    const result = (json && json.result) || {};
    Object.keys(byPmid).forEach((pmid) => {
      const rec = result[pmid];
      if (!rec) return;
      const formatted = formatDate(rec.pubdate || rec.epubdate);
      if (formatted) byPmid[pmid].updated = formatted;
      if (rec.sortfirstauthor && !byPmid[pmid].authors) byPmid[pmid].authors = rec.sortfirstauthor;
    });
    console.log('PubMed metadata fetched for ' + Object.keys(byPmid).length + ' records.');
  } catch (err) {
    console.warn('PubMed metadata unavailable (' + err.message + '); using curated publication years.');
  }

  const documents = DOCUMENTS.map((d) => ({
    id: d.id,
    title: d.title,
    category: d.category,
    kind: d.kind,
    status: d.status,
    updated: d.updated,
    doi: d.doi,
    pmid: d.pmid || '',
    url: cdUrl(d.id),
    doiUrl: doiUrl(d.doi),
    summary: d.summary,
    keyPoints: d.keyPoints
  }));

  const reviews = documents.filter((d) => d.kind === 'Cochrane Review').length;
  const data = {
    generated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    source: 'Cochrane Library (Cochrane Database of Systematic Reviews)',
    sourceUrl: 'https://www.cochranelibrary.com/',
    searchUrl: 'https://www.cochranelibrary.com/search?searchBy=0&searchText=breast+augmentation',
    total: documents.length,
    reviews,
    protocols: documents.length - reviews,
    categories: CATEGORIES,
    documents,
    facts: FACTS
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('Wrote ' + OUT + ' (' + documents.length + ' records: ' + reviews + ' reviews, ' + (documents.length - reviews) + ' protocols).');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
