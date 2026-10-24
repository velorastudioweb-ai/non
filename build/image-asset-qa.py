"""Check every generated responsive derivative and its matching SVG fallback."""
from pathlib import Path
import hashlib, json, re
from PIL import Image

root = Path(__file__).resolve().parent.parent
audit = root / 'docs' / 'image-audit'
assets = json.loads((audit / 'generated-files.json').read_text(encoding='utf-8'))
results = []
hashes = {}
for url in assets:
    p = root / 'public' / url.lstrip('/')
    assert p.is_file(), f'Missing image {url}'
    if p.suffix == '.webp':
        with Image.open(p) as img:
            width = int(re.search(r'-(\d+)\.webp$', p.name).group(1))
            ratio = 640 / 1600 if '-banner-' in p.name else 1200 / 960 if '-portrait-' in p.name else 1100 / 1600
            assert img.size == (width, round(width * ratio)), f'Wrong image dimensions {url}'
            assert len(img.getcolors(maxcolors=2) or []) != 1, f'Blank image {url}'
            results.append({'path': url, 'width': img.width, 'height': img.height, 'bytes': p.stat().st_size})
    else:
        svg = p.read_text(encoding='utf-8')
        assert '<text' not in svg and '<image' not in svg, f'Embedded text or external image {url}'
        digest = hashlib.sha256(p.read_bytes()).hexdigest()
        assert digest not in hashes, f'Duplicate composition: {url} and {hashes.get(digest)}'
        hashes[digest] = url
        results.append({'path': url, 'bytes': p.stat().st_size})
report = {'files': len(results), 'svg_compositions': len(hashes), 'failures': [], 'assets': results}
(audit / 'asset-verification.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(f"Verified all {len(results)} generated files: dimensions, nonblank WebP data, unique SVG compositions, no embedded text/logos or external image dependencies.")
