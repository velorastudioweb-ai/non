# Quantum Health website restructure

## Outcome

The existing dependency-free generator and Quantum Health artwork/palette are
retained. There are **36 canonical pages**, plus the 404 document and **36
retired-route redirects**. Contact and legal documents remain utility pages;
the only primary content categories are the three approved sections.

Navigation: **Home → Surgical Breast Enlargement → Non-Surgical Breast
Enlargement → Education & Research → About**.

`build/structure.js` is the canonical assembly/metadata/category/redirect
registry. Authored content is reused from the existing content and research
modules. `build/gen.js` generates only the registry's retained pages.

## Retained pages and URLs

### Home and primary categories

| Page | URL |
| --- | --- |
| Home | `/` |
| Surgical Breast Enlargement | `/surgical-breast-enlargement/` |
| Non-Surgical Breast Enlargement | `/non-surgical-breast-enlargement/` |
| General Education & Research | `/education-research/` |

### Surgical topics

| Page | URL |
| --- | --- |
| Breast Augmentation: Implants & Fat Transfer | `/surgical/breast-augmentation/` |
| Breast Implants: Types, Placement & Long-Term Reality | `/breast-implants/` |
| Implant Safety: Rupture, ALCL, Contracture & Monitoring | `/breast-implant-safety/` |
| Fat Transfer Breast Augmentation | `/surgical/fat-transfer-breast-augmentation/` |
| Breast Lift (Mastopexy) | `/surgical/breast-lift/` |
| Breast Revision: Exchange, Removal & Repair | `/surgical/breast-revision/` |
| Breast Filler Removal | `/surgical/breast-filler-removal/` |
| Breast Reduction | `/surgical/breast-reduction/` |
| Mastectomy & Chest Contouring | `/surgical/mastectomy-chest-surgery/` |

Lift, revision, filler removal, reduction and mastectomy are clearly identified
as related shape/corrective/reduction/chest procedures. The landing page explains
that they are not all enlargement procedures.

### Non-surgical topics

| Page | URL |
| --- | --- |
| Without Surgery: What Works — Evidence Guide | `/breast-enlargement-without-surgery/` |
| Non-Surgical Enhancement: Options & Safety | `/non-surgical/` |
| Breast Fillers: Safety, Evidence & Alternatives | `/non-surgical/dermal-fillers/` |
| Breast Thread Procedures | `/non-surgical/breast-threads/` |
| Mono Threads | `/non-surgical/mono-threads/` |
| PRP: Evidence Explained | `/non-surgical/prp/` |
| Biostimulators | `/non-surgical/biostimulators/` |
| Sculptra & PLLA | `/non-surgical/sculptra-plla/` |
| Stem Cells & Regenerative Medicine | `/non-surgical/regenerative-medicine/` |

The category landing is a topic index; `/non-surgical/` remains the substantive
options/safety guide, with its duplicated topic grid removed. Safety notices
distinguish appearance changes, surgery, experimental approaches, unapproved
breast injections and unsupported claims. Fat transfer is explicitly surgery.

### Shared education and research

| Page | URL |
| --- | --- |
| Understanding Breast Enlargement | `/understanding-breast-enlargement/` |
| Breast Anatomy | `/breast-anatomy/` |
| Options Compared: Surgical vs Non-Surgical | `/breast-enhancement-comparison/` |
| Candidacy, Safety, Warning Signs & Choosing a Surgeon | `/breast-enlargement-safety/` |
| Research Library | `/research/` |
| Clinical Studies, Reviews & References | `/references/` |
| Glossary | `/glossary/` |
| Shared FAQs | `/faqs/` |

### Website information and utilities

| Page | URL |
| --- | --- |
| About | `/about-us/` |
| Contact | `/contact/` |
| Privacy | `/privacy-policy/` |
| Cookies | `/cookie-policy/` |
| Terms | `/terms-of-use/` |
| Medical disclaimer | `/medical-disclaimer/` |

The existing noindex status of the four legal documents is retained; contact
remains indexable. The sitemap contains 32 indexable canonical pages. Unmatched
routes receive the 404 document.

## Consolidations and removals

- Surgical overview moved to the dedicated surgical category landing.
- Surgical/non-surgical comparison article merged into the comparison guide.
- Implant-selection article's unique discussion/references merged into implants.
- PRP article's research-versus-established-care discussion merged into PRP.
- Consultation questions and choosing-a-surgeon information merged into safety.
- Filler article's product-specific questions/references merged into fillers.
- The shortened non-surgical verdict article redirects to the detailed evidence
  guide, which already contains its clinical explanations and study findings.
- All six blog article routes and the redundant blog archive retired.
- PubMed study summaries, the searchable PMC archive and 12 publisher source
  collections consolidated into the research library. Distinct study findings,
  original links and source-specific context remain. Publisher collections use
  expandable sections with unique fragment IDs, not duplicate landing pages.
- The bibliography remains a distinct source list, not another research index.
- Four treatment-specific shared FAQ answers now link to their treatment guides.
  The generic suitability answer is owned by the shared FAQ.
- Useful incision/scar-care material recovered from the abandoned wiki article
  and placed in the augmentation guide's `#scars` section. Its unverified doctor
  byline/review date and invented clinical-team booking invitation were removed.
- The abandoned non-surgical wiki draft was removed after comparing it with the
  evidence guide. Promotional clinic lists, tourism packages, unsupported generic
  outcome/duration assurances and unverified clinic-price comparisons were not
  carried forward. Its unsourced contracture-treatment percentages were not
  promoted into scientific findings; the original draft remains in the backup.
- Removed six obsolete alternative generators, two clinic-oriented page
  generators, four obsolete templates, the unused root demo HTML/CSS, a temporary
  404 demo, an encoding test and two draft/patch artifacts. Active assets,
  dependencies, configuration, deployment headers and data remain.

## PDF review and recovery

- Extracted **all 1,642 PDF pages**: 3,839,467 characters, no text-empty pages.
- Inventoried **56 website route sections** and **12 complete dataset sections**.
- All substantive PDF material had editable project sources, so no topic needed
  a PDF-only reconstruction. The PDF was used to confirm the available content
  and its attribution before reorganising the editable sources.
- Checked the beginning/end text of **3,832 long dataset fields** against the
  complete extraction, normalising typography and removing PDF running headers:
  **zero remaining extraction mismatches**.
- All 12 JSON source datasets are unchanged, including **1,874 PMC records**.
  The PMC archive is identified as a broad external search capture; inclusion
  is not a relevance/quality judgement or treatment endorsement.
- Compared **332 original clinical content fragments** with their canonical
  destinations: **327 retained verbatim**, five intentionally consolidated FAQ
  answers as described above. Topic grids and repeated CTAs are excluded from
  this clinical-content comparison.

The complete extraction and the pre-deletion source ZIP are local files at
`docs/restructure-audit/complete-pdf.txt` and `docs/restructure-audit/before.zip`.
They are excluded from Git. Machine-readable inventories and coverage results
are in the same directory. The audit does not establish new clinical review,
independently revalidate every external paper, or invent missing study metadata.
No required topic content remains unrecovered.

## Retired URLs and redirects

All targets resolve directly to a retained page, with no redirect chains.
Vercel uses permanent redirects; the development server issues HTTP 301s;
static HTML stubs provide a fallback for other static hosts.

| Retired URL | Destination |
| --- | --- |
| `/surgical-breast-enhancement/` | `/surgical-breast-enlargement/` |
| `/blogs/` | `/education-research/` |
| `/blogs/surgical-vs-non-surgical-breast-enhancement/` | `/breast-enhancement-comparison/` |
| `/blogs/before-choosing-breast-implants/` | `/breast-implants/` |
| `/blogs/prp-and-breast-enhancement-what-the-evidence-says/` | `/non-surgical/prp/` |
| `/blogs/ten-questions-to-ask-at-a-breast-enhancement-consultation/` | `/breast-enlargement-safety/` |
| `/blogs/breast-fillers-sculptra-and-biostimulators-safety-questions/` | `/non-surgical/dermal-fillers/` |
| `/blogs/breast-enlargement-without-surgery-what-works/` | `/breast-enlargement-without-surgery/` |
| `/choosing-a-surgeon/` | `/breast-enlargement-safety/#choosing-a-surgeon` |
| `/breast-enlargement-research/` | `/research/#pubmed` |
| `/research/breast-enlargement/` | `/research/#pmc` |
| `/research/cochrane-breast-enlargement/` | `/research/#cochrane` |
| `/research/fda-breast-enlargement/` | `/research/#fda` |
| `/research/nhs-breast-enlargement/` | `/research/#nhs` |
| `/research/healthdirect-breast-enlargement/` | `/research/#healthdirect` |
| `/research/cleveland-clinic-breast-enlargement/` | `/research/#clevelandclinic` |
| `/research/asps-breast-enlargement/` | `/research/#asps` |
| `/research/bapras-breast-augmentation/` | `/research/#bapras` |
| `/research/baaps-breast-enlargement/` | `/research/#baaps` |
| `/research/statpearls-breast-augmentation/` | `/research/#statpearls` |
| `/research/medlineplus-breast-enlargement/` | `/research/#medlineplus` |
| `/research/wikipedia-breast-enlargement/` | `/research/#wikipedia` |
| `/research/wikipedia-breast-augmentation/` | `/research/#wikipediaaug` |
| `/about-dr-vikas-singh/` | `/about-us/` |
| `/locations/` | `/about-us/` |
| `/media-and-press/` | `/about-us/` |
| `/technology-and-medical-standards/` | `/about-us/` |
| `/patient-photography-consent/` | `/about-us/` |
| `/our-team/` | `/breast-enlargement-safety/#choosing-a-surgeon` |
| `/before-after-gallery/` | `/understanding-breast-enlargement/` |
| `/video-gallery/` | `/education-research/` |
| `/book-consultation/` | `/contact/` |
| `/candidacy-and-safety/` | `/breast-enlargement-safety/` |
| `/surgical/silicone-breast-implants/` | `/breast-implants/` |
| `/wiki/breast-augmentation-scars/` | `/surgical/breast-augmentation/#scars` |
| `/wiki/non-surgical-breast-enlargement/` | `/breast-enlargement-without-surgery/` |

## Verification results

| Check | Result |
| --- | --- |
| `npm run qa` (includes the build) | PASS; zero errors and warnings |
| Link/asset scan | 73 HTML files; 2,663 links; 58 in-page anchors |
| Canonical migration checks | PASS: 36 routes, unique titles/IDs, topic membership, cross-page anchors, sitemap and deployment redirect parity |
| HTTP checks | All 36 canonical routes return 200; all 36 retired routes return 301 with correct Location; unmatched route returns 404 |
| Browser layout matrix | All 36 pages at 320×568, 768×1024, 1024×768 and 1440×900: 144 successful renders |
| Overflow/clipping/images | Zero page overflow, off-screen content, clipped text, broken or distorted images |
| Browser console/network | Zero errors |
| Interactions | Mobile/tablet/desktop menu checks, Escape closure, comfortable menu targets, FAQ expansion, source deep-link reveal, PMC search, sort and abstracts pass |
| Content retention | 332 fragments audited; five explained FAQ consolidations |
| PDF/datasets | Entire PDF extracted; 12 datasets preserved; zero normalised field-check mismatches |

The browser audit found and fixed a shared-header tagline clipping issue and a
small-screen citation-grid overflow. The existing palette, imagery, responsive
table wraps and reduced-motion behaviour remain in use. No separate light-theme
switch exists in the current application.
