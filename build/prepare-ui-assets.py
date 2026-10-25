"""Encode the original SVG grain/brand rendered by prepare-ui-assets.js."""
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parent.parent
with Image.open(ROOT / 'assets-src/grain.png') as image:
    # Neutral grey is transparent under overlay blending. Flattening onto it
    # avoids shipping a high-entropy alpha channel for this 3.5%-opacity texture.
    image = Image.alpha_composite(Image.new('RGBA', image.size, (128, 128, 128, 255)), image.convert('RGBA')).convert('RGB')
    image.save(ROOT / 'public/assets/img/grain-v1.webp', 'WEBP', quality=45, method=6)
with Image.open(ROOT / 'assets-src/favicon.png') as image:
    image.save(ROOT / 'public/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print('Encoded the existing grain texture and lotus favicon.')
print('Grain transfer size:', (ROOT / 'public/assets/img/grain-v1.webp').stat().st_size, 'bytes')
