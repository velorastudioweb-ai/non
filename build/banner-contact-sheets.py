"""Build visual-review sheets from the real-browser banner screenshots."""
from pathlib import Path
import sys
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent
label = sys.argv[1] if len(sys.argv) > 1 else 'after'
width = sys.argv[2] if len(sys.argv) > 2 else '390'
folder = ROOT / 'docs/performance-audit' / label
files = sorted(folder.glob(f'*-{width}-banner.png'))
for start in range(0, len(files), 6):
    sheet = Image.new('RGB', (1200, 2200), '#f3ecee')
    draw = ImageDraw.Draw(sheet)
    for i, file in enumerate(files[start:start + 6]):
        x, y = (i % 3) * 400, (i // 3) * 1100
        draw.text((x + 8, y + 8), file.name.replace(f'-{width}-banner.png', '')[:48], fill='#35000d')
        with Image.open(file) as image:
            image.thumbnail((384, 1050))
            sheet.paste(image.convert('RGB'), (x + 8, y + 32))
    target = folder / f'review-{width}-{start // 6 + 1}.png'
    sheet.save(target)
    print(target.relative_to(ROOT))
