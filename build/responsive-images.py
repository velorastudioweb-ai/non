"""Generate uncropped responsive WebP derivatives of the existing root artwork.

Original public/ images are retained byte-for-byte. A checked-in manifest allows
the production Node build to use the derivatives without Python/Pillow on Vercel.
Run again after replacing a source image. Content hashes make immutable caching safe.
"""
from pathlib import Path
import hashlib
import json
import re
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
DEST = PUBLIC / 'assets' / 'responsive'
DEST.mkdir(parents=True, exist_ok=True)
manifest = {}
for src in sorted(PUBLIC.glob('*.webp')):
    digest = hashlib.sha256(src.read_bytes()).hexdigest()
    slug = re.sub(r'[^a-z0-9]+', '-', src.stem.lower()).strip('-')
    with Image.open(src) as image:
        width, height = image.size
        variants = []
        for w in [480, 768, 1024, 1280]:
            if w >= width:
                continue
            h = round(height * w / width)
            name = f'{slug}-{digest[:12]}-{w}.webp'
            out = DEST / name
            image.resize((w, h), Image.Resampling.LANCZOS).save(out, 'WEBP', quality=85, method=6)
            variants.append({'src': '/assets/responsive/' + name, 'width': w, 'height': h, 'bytes': out.stat().st_size})
        manifest['/' + src.name] = {'width': width, 'height': height, 'sha256': digest, 'bytes': src.stat().st_size, 'variants': variants}
(ROOT / 'build' / 'image-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(f'Prepared responsive sizes for {len(manifest)} original images; no crops or source replacements.')
