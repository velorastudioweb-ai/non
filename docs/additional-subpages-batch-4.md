# Additional sub-pages, batch 4: editorial note

Prepared 31 October 2026. This batch adds 20 focused educational pages beneath
four existing parent guides. The copy is drafted for clinician review before
publication. It does not provide personal medical advice, promise a result, or
establish product approval in India.

## Scope check: mastectomy and chest contouring

The existing parent guide already covered mastectomy for cancer or risk
reduction and gender-affirming chest masculinisation. This batch treats
gynaecomastia as a separate chest-contouring topic, not as a cancer mastectomy.
The parent-page summary was clarified to make that distinction explicit.

## Routes

### Biostimulators (`/non-surgical/biostimulators/`)

- `/non-surgical/biostimulators/what-are-biostimulators/`
- `/non-surgical/biostimulators/approved-uses/`
- `/non-surgical/biostimulators/how-collagen-stimulation-works/`
- `/non-surgical/biostimulators/risks/`
- `/non-surgical/biostimulators/chest-skin-vs-breast-volume/`

### Sculptra and PLLA (`/non-surgical/sculptra-plla/`)

- `/non-surgical/sculptra-plla/what-is-plla/`
- `/non-surgical/sculptra-plla/approvals-evidence/`
- `/non-surgical/sculptra-plla/preparation-technique/`
- `/non-surgical/sculptra-plla/nodules-complications/`
- `/non-surgical/sculptra-plla/realistic-expectations/`

### Stem cells and regenerative medicine (`/non-surgical/regenerative-medicine/`)

- `/non-surgical/regenerative-medicine/stem-cell-terms/`
- `/non-surgical/regenerative-medicine/marketing-claims-evidence/`
- `/non-surgical/regenerative-medicine/cell-assisted-fat-grafting/`
- `/non-surgical/regenerative-medicine/safety-unproven-treatments/`
- `/non-surgical/regenerative-medicine/clinical-trials/`

### Mastectomy and chest contouring surgery (`/surgical/mastectomy-chest-surgery/`)

- `/surgical/mastectomy-chest-surgery/why-chest-surgery-is-done/`
- `/surgical/mastectomy-chest-surgery/types-of-mastectomy/`
- `/surgical/mastectomy-chest-surgery/contouring-after-mastectomy/`
- `/surgical/mastectomy-chest-surgery/gender-affirming-chest-surgery/`
- `/surgical/mastectomy-chest-surgery/gynaecomastia/`

## Integration

- Source content: `build/batch4-subpages.js`.
- `build/structure.js` adds every page to the canonical route registry, sitemap,
  breadcrumbs, schema and parent-guide card groups.
- The existing approved editorial illustrations are reused. No new clinical
  imagery or treatment-result claim is introduced.

## Required review before publication

1. Have an appropriately qualified clinician review all 20 pages, especially
   urgency statements, screening language, procedural descriptions and
   gender-affirming-care terminology.
2. Verify product-specific indications, preparation instructions, brand wording
   and regulatory statements against current Indian labels and CDSCO rules.
3. Add and maintain linked primary sources for claims about PLLA,
   biostimulators, cell-assisted fat grafting and clinical-trial regulation.
4. Confirm that trial-registry, ethics and consent wording is appropriate for
   the intended Indian audience.
5. Confirm that mastectomy, reconstruction, flat closure, top surgery and
   gynaecomastia content reflects the surgeons and services that the site is
   actually qualified to describe.
6. Re-run `npm run build` and `npm run qa`, then check each parent-guide card,
   child breadcrumb, metadata, related link and mobile layout.
