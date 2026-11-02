"""Prepare the supplied brand artwork for publication.

Writes the final, published assets into public/ (root originals for the
responsive pipeline, plus the logo mark under public/assets/img/).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
IMG = PUBLIC / "assets" / "img"
IMG.mkdir(parents=True, exist_ok=True)
SUPPLIED = ROOT / "assets-src" / "supplied-2026-11-02"
SUPPLIED.mkdir(parents=True, exist_ok=True)

LOGO_SRC = PUBLIC / "WhatsApp Image 2026-11-02 at 8.45.16 AM.jpeg"
CONSULT_SRC = PUBLIC / "WhatsApp Image 2026-11-02 at 9.14.02 AM.jpeg"
VIKAS_SRC = PUBLIC / "Maroon Visionary with Golden Worldscape.png"
CITIES_SRC = PUBLIC / "Hong Kong and Bengaluru Nightscapes.png"

WEBP_QUALITY = 86


def load(path):
    with Image.open(path) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        image.load()
    return image


def save(image, path, quality=WEBP_QUALITY):
    image.save(path, "WEBP", quality=quality, method=6)
    print(f"{path.name}: {image.size[0]}x{image.size[1]} {path.stat().st_size // 1024} KB")


# 1. Header/footer logo mark — the crowned Q only.
logo = load(LOGO_SRC)
px = logo.load()
minx = miny = maxx = maxy = None
for y in range(20, 366):
    for x in range(420, 740):
        r, g, b = px[x, y]
        if r >= 150 and g >= 100 and b <= 150:
            minx = x if minx is None or x < minx else minx
            maxx = x if maxx is None or x > maxx else maxx
            miny = y if miny is None or y < miny else miny
            maxy = y if maxy is None or y > maxy else maxy
pad = 14
x0, y0 = max(0, minx - pad), max(0, miny - pad)
x1, y1 = min(logo.width, maxx + pad), min(logo.height, maxy + pad)
half = max(x1 - x0, y1 - y0) // 2
cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
mark = logo.crop((cx - half, cy - half, cx + half, cy + half)).resize((400, 400), Image.LANCZOS).convert("RGBA")
mask = Image.new("L", (400, 400), 0)
ImageDraw.Draw(mask).ellipse((3, 3, 396, 396), fill=255)
mark.putalpha(mask)
ImageDraw.Draw(mark).ellipse((3, 3, 396, 396), outline=(214, 184, 117, 255), width=5)
mark.save(IMG / "quantum-health-logo-mark.png")
print(f"quantum-health-logo-mark.png: 400x400 {(IMG / 'quantum-health-logo-mark.png').stat().st_size // 1024} KB")

# 2. Homepage "Our approach" artwork — consultation scene, watermark strip trimmed.
consult = load(CONSULT_SRC)
cw, ch = consult.size
trimmed = consult.crop((0, int(ch * 0.05), cw, ch))
target_w = 1536
trimmed = trimmed.resize((target_w, round(trimmed.size[1] * target_w / trimmed.size[0])), Image.LANCZOS)
save(trimmed, PUBLIC / "Quantum Health Consultation Scene.webp")

# 3. Dr. Vikas Singh page banner.
vikas = load(VIKAS_SRC)
vw = 1600
vikas = vikas.resize((vw, round(vikas.size[1] * vw / vikas.size[0])), Image.LANCZOS)
save(vikas, PUBLIC / "Dr Vikas Singh Global Practice Banner.webp")

# 4. Locations page city panels — Dubai (left), Bengaluru (right).
cities = load(CITIES_SRC)
w, h = cities.size
left = cities.crop((0, 0, w // 2, h)).resize((1100, round(h * 1100 / (w // 2))), Image.LANCZOS)
right = cities.crop((w // 2, 0, w, h)).resize((1100, round(h * 1100 / (w - w // 2))), Image.LANCZOS)
save(left, PUBLIC / "Dubai Clinic Panel.webp")
save(right, PUBLIC / "Bengaluru Clinic Panel.webp")

print("\nDone. Supplied originals stay in public/ until they are archived.")
