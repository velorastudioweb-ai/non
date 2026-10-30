# Surgical sub-pages, batch 2: editorial note

Prepared 30 October 2026. This batch adds 25 procedure-level pages under five
existing surgical guides. It is supporting education, not part of the supplied
20-page draft, and it has not been reviewed by a named clinician.

> **Publication status: hold.** A suitably qualified clinician must approve the
> clinical copy, and the India-specific regulatory and insurance wording must be
> rechecked, before these pages are published.

## Routes

### Fat transfer (`/surgical/fat-transfer-breast-augmentation/`)

- `/surgical/fat-transfer-breast-augmentation/candidacy/`
- `/surgical/fat-transfer-breast-augmentation/procedure/`
- `/surgical/fat-transfer-breast-augmentation/recovery/`
- `/surgical/fat-transfer-breast-augmentation/lumps-fat-necrosis/`
- `/surgical/fat-transfer-breast-augmentation/with-implants/`

### Breast lift (`/surgical/breast-lift/`)

- `/surgical/breast-lift/understanding-sagging/`
- `/surgical/breast-lift/incisions-scars/`
- `/surgical/breast-lift/recovery/`
- `/surgical/breast-lift/risks/`
- `/surgical/breast-lift/protecting-results/`

### Breast revision (`/surgical/breast-revision/`)

- `/surgical/breast-revision/reasons/`
- `/surgical/breast-revision/removal-exchange/`
- `/surgical/breast-revision/capsule-surgery/`
- `/surgical/breast-revision/malposition/`
- `/surgical/breast-revision/preparing/`

### Filler removal (`/surgical/breast-filler-removal/`)

- `/surgical/breast-filler-removal/why-removal/`
- `/surgical/breast-filler-removal/assessment/`
- `/surgical/breast-filler-removal/removal-options/`
- `/surgical/breast-filler-removal/permanent-unknown/`
- `/surgical/breast-filler-removal/after-removal/`

### Breast reduction (`/surgical/breast-reduction/`)

- `/surgical/breast-reduction/candidacy/`
- `/surgical/breast-reduction/techniques/`
- `/surgical/breast-reduction/recovery/`
- `/surgical/breast-reduction/risks/`
- `/surgical/breast-reduction/outcomes/`

## Integration

- Source: `build/surgical-subpages.js`.
- `build/structure.js` links each child from its declared `parent` guide and
  includes every route in the sitemap.
- Each page has a "Related education" card group and avoids prices or outcome
  promises.

## Review required

1. Clinical review of every page, with particular attention to fat necrosis,
   nipple blood supply, capsule surgery and revision expectations.
2. Named author and reviewer with credentials and review dates.
3. Add primary-source links where claims are made; the copy is deliberately
   general and does not cite specific studies.
4. Check for overlap with the parent guides and with the 19 pages from the
   supplied draft before publication.

## Length check

The following counts were generated from each prose block after stripping HTML.
They include headings and list text, but exclude card, notice and metadata copy.
All 25 pages are within the requested approximate 350–400-word range.

| Guide | Page | Words |
| --- | --- | ---: |
| Fat transfer | Candidacy | 360 |
| Fat transfer | Procedure | 363 |
| Fat transfer | Recovery | 400 |
| Fat transfer | Lumps, fat necrosis and calcifications | 395 |
| Fat transfer | With implants | 384 |
| Breast lift | Understanding sagging | 380 |
| Breast lift | Incisions and scars | 384 |
| Breast lift | Recovery | 398 |
| Breast lift | Risks | 370 |
| Breast lift | Protecting results | 383 |
| Breast revision | Reasons | 369 |
| Breast revision | Removal and exchange | 383 |
| Breast revision | Capsule surgery | 398 |
| Breast revision | Malposition | 390 |
| Breast revision | Preparing | 391 |
| Filler removal | Why removal may be needed | 388 |
| Filler removal | Assessment | 400 |
| Filler removal | Removal options | 399 |
| Filler removal | Permanent or unknown material | 383 |
| Filler removal | After removal | 374 |
| Breast reduction | Candidacy | 363 |
| Breast reduction | Techniques | 389 |
| Breast reduction | Recovery | 370 |
| Breast reduction | Risks | 392 |
| Breast reduction | Outcomes and long-term care | 399 |

## Source basis and India-specific checks

Sources were checked on 30 October 2026. They inform the editorial draft; they
do **not** replace a clinician’s review or provide a patient-specific treatment
recommendation.

### Indian regulation and insurance

- [CDSCO: Medical Device & Diagnostics](https://cdsco.gov.in/opencms/opencms/en/Medical-Device-Diagnostics/Medical-Device-Diagnostics/) explains that medical devices are regulated under the Drugs & Cosmetics Act, 1940 and the Medical Devices Rules, 2017, and links to the current approval and device-detail resources.
- [Medical Devices Rules, 2017 (as amended)](https://cdsco.gov.in/opencms/resources/UploadCDSCOWeb/2022/m_device/mdr%2C%202017%20%281%29.pdf) defines a device’s intended use by its labelling, instructions for use and approved promotional material. The filler-removal copy was narrowed accordingly: an authorisation or claim for another anatomical area does not establish that breast use is authorised, appropriate or safe.
- [IRDAI Master Circular on Health Insurance Business, 29 May 2024](https://irdai.gov.in/en/document-detail?documentId=4942918) requires a Customer Information Sheet that summarises cover, exclusions, waiting periods and claims information. It supports the instruction to read the current policy and obtain written pre-authorisation.
- [IRDAI Guidelines on Standardization of Exclusions in Health Insurance Contracts](https://irdai.gov.in/documents/37343/365525/Guidelines+on+Standardization+of+Exclusions+in+Health+Insurance+Contracts.pdf/39629f3a-a65b-7cea-f045-ca50f66ce6d0?download=true&t=1665918387659&version=1.1) set out the familiar `Excl08` cosmetic/plastic-surgery wording, including the exceptions for reconstruction after accident, burns or cancer and medically necessary treatment to remove a direct and immediate health risk when certified by the attending medical practitioner.

The site does **not** say that breast reduction, revision or filler removal is
automatically covered in India. A clinician’s certificate, pre-authorisation or
this educational page is not a coverage guarantee; the operative indication,
current policy document, insurer decision and other policy terms control.

### Clinical editorial sources

- [NHS: Surgical fat transfer](https://www.nhs.uk/tests-and-treatments/cosmetic-procedures/cosmetic-surgery/surgical-fat-transfer/) — patient-facing outline of harvesting, processing, injection, recovery and complications.
- [NHS: Breast reduction (female)](https://www.nhs.uk/tests-and-treatments/cosmetic-procedures/cosmetic-surgery/breast-reduction-female/) — patient information on indications, recovery, scars and complications.
- [FDA: Dermal fillers (soft-tissue fillers)](https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers) — supports the distinction between temporary and permanent material, complications, and the difficulty or impossibility of removing some fillers.
- [FDA: Risks and complications of breast implants](https://www.fda.gov/medical-devices/breast-implants/risks-and-complications-breast-implants) — supports the revision, implant-removal and capsule discussion.
- [Breast Surgery Collaborative Community consensus on capsulectomy terminology and management](https://www.plasticsurgery.org/documents/medical-professionals/BSCC-Capsulectomy-Terminology-Management-Consensus-Statement.pdf) — supports the careful distinction between capsulectomy terms and the limited indication for en-bloc capsulectomy.

The FDA sources describe United States regulation and should not be read as a
statement of Indian approval or an Indian standard of care. The NHS sources are
general patient information, not Indian commissioning or clinical guidance.
They are retained as a transparent starting point for the clinician review, not
as substitute authority for local practice.

## Pre-publication clinician-review checklist

1. Have an appropriately qualified, locally registered clinician review all 25
   pages and document the reviewer’s name, credentials, role and review date.
2. Confirm that every indication, risk, urgency statement, recovery instruction
   and screening statement is suitable for the intended audience and does not
   become individual medical advice.
3. Review capsule, explant and `en bloc` terminology against current specialist
   guidance, including when pathology, imaging or urgent referral is needed.
4. Confirm that the fat-transfer, lift and reduction wording reflects local
   surgical practice without promising a result, exact size or recovery time.
5. Verify every product-specific filler statement against the actual product
   label, intended use and current CDSCO record; do not infer breast-use status
   from a facial or overseas indication.
6. Have an India-qualified regulatory/insurance reviewer recheck the CDSCO and
   IRDAI references, the patient’s policy wording and the insurer’s current
   pre-authorisation process immediately before publication.
7. Add page-level primary references or a clearly maintained central source
   list if the editorial policy requires citations on patient pages.
8. Re-run `npm run build` and `npm run qa`, then manually review the parent
   guide cards, child breadcrumbs, metadata, related links and image alt text.

## Editorial constraints retained

- No page quotes a price, promises a particular cup size, guarantees recovery,
  or guarantees a surgical or insurance outcome.
- The detailed pages link back to their parent guide and to related educational
  pages; the five-card parent-guide sections provide browseable discovery.
- The existing pages on fat survival, lift versus augmentation and asymmetry are
  linked where relevant rather than repeated.
