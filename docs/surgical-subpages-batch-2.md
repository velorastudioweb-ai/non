# Surgical sub-pages, batch 2: editorial note

Prepared 30 October 2026. This batch adds 25 procedure-level pages under five
existing surgical guides. It is supporting education, not part of the supplied
20-page draft, and it has not been reviewed by a named clinician.

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
