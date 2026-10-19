# Image Generation Checklist — Photorealistic Campaign Set

Status: **PENDING** — no image-generation API is configured in this environment.
The current imagery (`public/assets/img/*.jpg`) is procedurally generated abstract
artwork from `build/gen-bold-art.py`. The photorealistic editorial set below has
NOT been generated and must not be faked.

## How to use this checklist

- Generate each image with its prompt (any capable model: gpt-image-1,
  Imagen/Gemini, Stable Diffusion, Midjourney, fal.ai, Replicate…).
- Export the exact file names and pixel sizes listed — the site's responsive
  `picture()` pipeline in `build/images.js` requires them verbatim.
- If the model outputs a different aspect ratio, center-crop to the exact
  target size before saving. Do not letterbox or stretch.
- Save finals to `public/assets/img/`, run `npm run qa`, then commit.
- Optionally convert to WebP and add `<source type="image/webp">` variants;
  the pipeline currently ships JPEG only.

## Slot map (master prompt image → site key → export files)

| # | Purpose | Site key (build/images.js) | Export files (exact size) | Notes |
|---|---------|----------------------------|---------------------------|-------|
| 1 | Homepage hero | `homepage-hero-luxury-editorial` | `homepage-hero-luxury-editorial-1920.jpg` (1920×1080), `homepage-hero-luxury-editorial-2560.jpg` (2560×1440) | Subject right, negative space left; hero is loaded eager/fetchpriority=high |
| 2 | Fuller-bust confidence (augmentation intro) | `portrait-studio` | `portrait-studio-620.jpg` (620×775), `portrait-studio-900.jpg` (900×1125) | 4:5. Also backs `/surgical/breast-augmentation/` card |
| 3 | Natural-looking enhancement | `portrait-shadow` | `portrait-shadow-620.jpg` (620×775), `portrait-shadow-900.jpg` (900×1125) | 4:5. Also backs `/surgical-breast-enhancement/` |
| 4 | Bold burgundy campaign band | `fabric-folds` | `fabric-folds-1800.jpg` (1800×1012) | ~16:9 |
| 5 | Consultation with specialist | `care-hands` | `care-hands-620.jpg` (620×775), `care-hands-900.jpg` (900×1125) | 4:5 export (prompt's 4:3 gets cropped); backs `/book-consultation/` and `/candidacy-and-safety/` |
| 6 | Patient education | `education-breast-anatomy` | `education-breast-anatomy-620.jpg` (620×827), `education-breast-anatomy-900.jpg` (900×1200) | 3:4 |
| 7 | Luxury clinic interior | `clinic` | `clinic-620.jpg` (620×775), `clinic-900.jpg` (900×1125) | 4:5 export (prompt's 16:9 gets cropped); backs `/about-us/` |
| 8 | Confidence / body positivity | `hands` | `hands-620.jpg` (620×775), `hands-900.jpg` (900×1125) | 4:5. Caution: `hands` also backs "Portrait — Dr. Vikas Singh" slot; prefer remapping the doctor slots to `null` first |
| 9 | Different body types (inclusion) | NEW key needed, e.g. `inclusive-patients` | suggest `inclusive-patients-1200.jpg` (1200×800) | Wire into `ROUTES['/our-team/']` or a body-positive section after generation |
| 10 | Bottom-of-page CTA banner | `banner-consultation` | `banner-consultation-1600.jpg` (1600×640), `banner-consultation-2560.jpg` (2560×1024) | Wide campaign crop; subject right third |

Alt text: replace the current "abstract artwork" alts in `build/images.js`
with descriptive alts per the master prompt (e.g. "Adult woman in an elegant
burgundy outfit for a breast enhancement clinic campaign"). Keep them
non-keyword-stuffed.

## Hard exclusions (site policy, do not violate)

- Doctor, team, video, and consented-case slots stay unpublished or use real,
  consented photography. Never fill with AI imagery:
  `pendingFrame()` slots (`Video thumbnail`, `Consented case 01–06`,
  `Clinical reference`) and any "Portrait — Dr. Vikas Singh" slot.
- Adults only; fully opaque clothing; no explicit content; no fabricated
  patient results, credentials, testimonials, or outcome guarantees.

## Prompts (from the master prompt, verbatim)

### IMAGE 1 — MAIN HERO IMAGE
Create an ultra-realistic luxury cosmetic surgery editorial photograph featuring a confident adult woman approximately 30–38 years old with a naturally full, proportionate bust, elegant posture, a defined waist and realistic body proportions. She wears a sophisticated, fully opaque, structured burgundy evening dress with a tasteful neckline. Her appearance is polished, confident, and refined, with natural skin texture, understated makeup, healthy-looking skin and a relaxed expression. Frame her from approximately the hips upward, with her body angled slightly toward the camera. Use soft directional studio lighting, warm ivory and muted burgundy surroundings, subtle champagne highlights, cinematic depth, sophisticated luxury-brand art direction and premium medical-aesthetics campaign photography. Position the subject toward the right side of the frame, leaving clean negative space on the left for a website headline and CTA. Photorealistic, editorial quality, anatomically accurate, premium, elegant, non-explicit, fully clothed. Wide 16:9 landscape composition.

### IMAGE 2 — FULLER BUST CONFIDENCE
Premium cosmetic surgery editorial photograph of a confident adult woman aged 28–40 with a visibly full, enhanced-looking bust and balanced body proportions, wearing an elegant, opaque, fitted ivory top with a tasteful neckline and tailored trousers. Three-quarter pose, shoulders relaxed, natural smile, realistic skin texture, sophisticated makeup and understated jewelry. Warm neutral studio backdrop, soft diffused lighting, champagne accents, luxury aesthetic medicine campaign, authentic and empowering mood, anatomically realistic, fully clothed, no sexualized pose, no nudity. Vertical 4:5 composition.

### IMAGE 3 — NATURAL-LOOKING ENHANCEMENT
Photorealistic editorial portrait of a confident adult woman aged 30–40 with a proportionate fuller bust, wearing a high-quality fully opaque cream knit top beneath a tailored beige blazer. Natural body proportions, authentic skin texture, relaxed shoulders, approachable expression, elegant posture. Premium cosmetic clinic photography, soft daylight, warm ivory background, subtle shadows, refined neutral styling. Emphasize confidence and a natural-looking silhouette, not sexual appeal. No nudity, no transparent fabric, no exaggerated anatomy. Vertical 4:5 composition.

### IMAGE 4 — BOLD BURGUNDY CAMPAIGN
High-fashion cosmetic aesthetics editorial photograph of an adult woman aged 28–38 with a visibly fuller bust and confident posture, wearing a sophisticated, fully opaque, structured burgundy gown with elegant tailoring. Rich wine-red background, dramatic softbox lighting, subtle champagne rim light, refined shadows, premium luxury advertising style. The composition should feel powerful, elegant and sophisticated, with a flattering but realistic silhouette and natural anatomy. No explicit cleavage emphasis, no lingerie, no nudity, no provocative posing, no text or logo. Landscape 16:9 composition.

### IMAGE 5 — CONSULTATION WITH A SPECIALIST
Photorealistic premium cosmetic surgery consultation in a bright, sophisticated medical clinic. An adult female patient in her early 30s, fully clothed in a modest ivory consultation top, speaks comfortably with a professional female cosmetic surgeon in a white medical coat. The patient appears relaxed, confident and respected. Modern treatment room, neutral upholstery, soft daylight, clean surfaces, subtle burgundy accents and premium clinical interior design. Authentic patient-doctor interaction, professional body language, realistic skin and facial features, no visible patient records, no text or logos. Landscape 4:3 composition.

### IMAGE 6 — PATIENT EDUCATION
Premium medical editorial photograph of a professional female cosmetic surgeon discussing breast enhancement options with an adult female patient in a private consultation room. Both women are fully clothed. A tablet or simple anatomical medical illustration may appear in the background, but no graphic surgical imagery. Warm neutral lighting, burgundy accent details, elegant medical interior, realistic expressions, trustworthy and reassuring atmosphere. Photorealistic, professional, ethical, privacy-conscious clinic photography. Landscape 4:3 composition.

### IMAGE 7 — LUXURY CLINIC INTERIOR
Ultra-realistic architectural photograph of a premium cosmetic surgery clinic reception and consultation lounge. Elegant ivory walls, champagne-metal accents, burgundy upholstery, soft indirect lighting, refined reception desk, comfortable seating, clean contemporary design and a welcoming atmosphere. Medical-grade cleanliness with a luxury hospitality feel. No people required, no visible brand names, no text, no clutter. Wide-angle architectural photography, natural material textures, realistic lighting, landscape 16:9 composition.

### IMAGE 8 — CONFIDENCE AND BODY POSITIVITY
Premium lifestyle editorial photograph of an adult woman aged 30–40 with a fuller bust and balanced, realistic proportions, wearing a stylish, fully opaque, fitted dusty-rose dress. She stands confidently in a softly lit modern interior, smiling naturally, with relaxed shoulders and elegant posture. Warm ivory and blush surroundings, authentic skin texture, sophisticated editorial photography, positive and empowering mood. The image should communicate self-confidence and personal choice, not sexual availability. Fully clothed, anatomically realistic, no nudity. Vertical 4:5 composition.

### IMAGE 9 — DIFFERENT BODY TYPES
Luxury healthcare editorial portrait featuring two different adult women, approximately 28–42 years old, with distinct natural body types and fuller bust proportions. Both wear elegant, fully opaque, structured tops in ivory and muted burgundy. Natural poses, realistic anatomy, individual facial features, authentic skin texture and relaxed expressions. Premium studio photography, warm neutral backdrop, soft balanced lighting, tasteful and body-positive styling. Communicate that consultation is personalized rather than implying one ideal body shape. No nudity, no transparent clothing, no exaggerated anatomy. Landscape 3:2 composition.

### IMAGE 10 — APPOINTMENT CTA BANNER
Wide luxury cosmetic clinic campaign photograph featuring a confident adult woman aged 30–40 with a naturally full bust, wearing an elegant, fully opaque burgundy outfit. Position the woman toward the right third of the frame. The left half contains uncluttered warm ivory and muted burgundy background space suitable for website text and an appointment button. Soft cinematic lighting, authentic skin texture, sophisticated luxury aesthetic medicine photography, realistic proportions, calm confident expression. No embedded text, no logo, no nudity, no lingerie. Wide 16:9 composition.
