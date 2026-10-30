# 2026 content expansion: 20 patient-education pages

Prepared 30 October 2026 from the supplied draft. This note records what was
built, where it lives and what must still happen before publication.

## What was added

Nineteen new canonical routes were added from the supplied draft, and the
existing `/faqs/` page was expanded from seven to fifteen questions. The FAQ
expansion is the first item in the supplied contents list, so it uses the
existing route instead of creating a duplicate FAQ page.

| # | Draft page | Route | Section |
| --- | --- | --- | --- |
| 1 | Breast Enlargement FAQs: 15 Questions Answered | `/faqs/` (expanded) | Education & Research |
| 2 | Creams, pills and massage | `/non-surgical/creams-pills-massage/` | Non-Surgical |
| 3 | Unsafe injections | `/non-surgical/unsafe-breast-injections/` | Non-Surgical |
| 4 | Silicone vs saline | `/surgical/silicone-vs-saline-implants/` | Surgical |
| 5 | Round vs anatomical | `/surgical/round-vs-anatomical-implants/` | Surgical |
| 6 | Choosing implant size | `/surgical/implant-size/` | Surgical |
| 7 | Implant placement | `/surgical/implant-placement/` | Surgical |
| 8 | How long implants last | `/surgical/implant-longevity/` | Surgical |
| 9 | Capsular contracture | `/surgical/capsular-contracture/` | Surgical |
| 10 | BIA-ALCL and implant illness | `/surgical/bia-alcl-implant-illness/` | Surgical |
| 11 | Mammograms | `/surgical/mammograms-with-implants/` | Surgical |
| 12 | Pregnancy and breastfeeding | `/surgical/pregnancy-breastfeeding-implants/` | Surgical |
| 13 | Fat survival | `/surgical/fat-transfer-survival/` | Surgical |
| 14 | Lift vs augmentation | `/surgical/breast-lift-vs-augmentation/` | Surgical |
| 15 | Asymmetry | `/surgical/breast-asymmetry/` | Surgical |
| 16 | Checking a surgeon's credentials | `/breast-surgeon-credentials/` | Education & Research |
| 17 | Consultation checklist | `/breast-augmentation-consultation-checklist/` | Education & Research |
| 18 | Understanding costs | `/breast-surgery-costs/` | Education & Research |
| 19 | Seven myths | `/non-surgical/breast-enlargement-myths/` | Non-Surgical |
| 20 | Urgent warning signs | `/surgical/breast-surgery-warning-signs/` | Surgical |

## Additional supporting sub-page batches

Three supporting batches are also present in the working tree and are registered
in the same route assembly. They were not part of the supplied 20-page draft;
they are narrower, procedure-level pages that sit under existing canonical
guides.

### Batch 1: augmentation, implants and implant safety (15 pages)

Authored in `build/surgical-subpages-content.js` and concatenated into the
export from `build/expanded-content.js`.

- Breast augmentation: `/surgical/breast-augmentation-candidacy/`,
  `/surgical/breast-augmentation-procedure/`,
  `/surgical/breast-augmentation-incisions/`,
  `/surgical/preparing-for-breast-augmentation/`,
  `/surgical/breast-augmentation-results/`
- Implants: `/surgical/how-breast-implants-are-made/`,
  `/surgical/implant-profile-width-volume/`, `/surgical/implant-rippling/`,
  `/surgical/implant-surface-texture/`,
  `/surgical/implant-records-warranties/`
- Implant safety: `/surgical/breast-implant-risks/`,
  `/surgical/implant-rupture/`, `/surgical/breast-sensation-changes/`,
  `/surgical/early-implant-complications/`,
  `/surgical/who-should-delay-implants/`

These are linked from the three parent guides (`/surgical/breast-augmentation/`,
`/breast-implants/`, `/breast-implant-safety/`) and from the surgical section
landing cards.

### Batch 2: procedure sub-pages (25 pages)

Authored in `build/surgical-subpages.js` and registered in `build/structure.js`.
There are five pages under each of five existing guides:

- Fat transfer: candidacy, procedure, recovery, lumps/fat necrosis, combined
  with implants
- Breast lift: understanding sagging, incisions and scars, recovery, risks,
  protecting results
- Breast revision: reasons, removal and exchange, capsule surgery,
  malposition, preparing for revision
- Filler removal: why removal, assessment, removal options, permanent/unknown
  products, after removal
- Breast reduction: candidacy, techniques, recovery, risks, outcomes

Each page declares a `parent` URL. `build/structure.js` links all five children
from that parent so none of the routes is orphaned. Review notes for this batch
are in `docs/surgical-subpages-batch-2.md`.

### Batch 3: non-surgical procedure sub-pages (30 pages)

Authored in `build/nonsurgical-subpages-content.js` and registered in
`build/structure.js`. There are five pages under each of six existing guides:

- Breast enlargement without surgery: volume versus appearance, bras and
  clothing, hormones, weight, and support when unhappy with breast size
- Non-surgical enhancement: options at a glance, appearance versus volume,
  reading evidence, regulatory status, and red flags
- Dermal fillers: hyaluronic-acid fillers, why breast use differs,
  complications, screening, and comparisons
- Breast threads: types, results, procedure, risks, and comparison with a lift
- Mono threads: basics, mono versus cog threads, collagen claims, procedure,
  and risks
- PRP: what it is, proposed uses, PRP with fat transfer, safety, and marketing
  claims

Each page declares `parentUrl` and `parentTitle`. `build/structure.js` gives it
a parent-guide breadcrumb and links each five-page group from its parent guide.

## Implementation

- The 19 draft pages and batch 1 live in `build/expanded-content.js` and
  `build/surgical-subpages-content.js`; batch 2 lives in
  `build/surgical-subpages.js`; batch 3 lives in
  `build/nonsurgical-subpages-content.js`.
- `build/structure.js` registers all of them, assigns section membership,
  breadcrumbs and `MedicalWebPage` schema, and adds them to the category
  landing cards, parent guides and the sitemap.
- The fifteen FAQ answers live in the existing `/faqs/` entry in
  `build/content.js`, including a matching `FAQPage` schema.
- The primary navigation is unchanged. New pages are linked from the three
  category landings under "Augmentation: candidacy, planning and recovery",
  "Implant choices, placement and safety", "Implant safety: risks, rupture and
  complications", "Fat transfer, lift, asymmetry and urgent care", "Evidence and
  safety guides" and "Decision and practical guides".
- Every new page links back to at least three existing canonical pages and
  includes a "Related education" card group.

## Editorial review still required

The supplied draft was clear that this is pre-publication material. Before the
pages are published:

1. A qualified clinician should review every page, especially the FDA
   monitoring intervals, textured-implant/BIA-ALCL wording, pregnancy and
   breastfeeding advice, and the India-specific registration guidance.
2. Add a named author and a named clinical reviewer, with credentials and review
   dates. No names or credentials have been invented here.
3. Link the primary sources cited in the text. The draft refers to US FDA
   guidance; confirm the current Indian regulatory position and local
   professional-registration requirements.
4. Re-check that no page quotes a price or promises an outcome. The cost page
   deliberately contains no figures.
5. Consider a further editorial pass on length and overlap with the existing
   implant, safety, fat-transfer and lift guides.
6. Review the 70 supporting sub-pages as separate editorial batches; they extend
   beyond the supplied draft and have not been clinically reviewed.

## Verification

```text
npm run build
npm run qa
```

The current build reports 145 generated HTML documents (140 indexable), 144
retained canonical routes, 37 redirects and no broken links, missing anchors,
duplicate IDs or duplicate SEO titles.
