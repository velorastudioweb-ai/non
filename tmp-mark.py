"""Final asset preparation: logo mark, Our approach photo, Vikas banner, city panels."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
OUT = Path(r"C:\Users\Lokesh Reddy\AppData\Local\Temp\opencode\qh-assets")
OUT.mkdir(parents=True, exist_ok=True)

logo = ImageOps.exif_transpose(Image.open(PUBLIC / "WhatsApp Image 2026-11-02 at 8.45.16 AM.jpeg")).convert("RGB")

# Tight window around the crown + Q only (excludes the wordmark below and the
# decorative ribbons at the edges of the art).
px = logo.load()
minx = miny = maxx = maxy = None
for y in range(20, 365):
    for x in range(420, 740):
        r, g, b = px[x, y]
        if r >= 150 and g >= 100 and b <= 150:
            if minx is None or x < minx:
                minx = x
            if maxx is None or x > maxx:
                maxx = x
            if miny is None or y < miny:
                miny = y
            if maxy is None or y > maxy:
                maxy = y
print("tight mark bbox:", (minx, miny, maxx, maxy))

pad = 16
x0, y0 = max(0, minx - pad), max(0, miny - pad)
x1, y1 = min(logo.width, maxx + pad), min(logo.height, maxy + pad)
side = max(x1 - x0, y1 - y0)
cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
half = side // 2
box = (max(0, cx - half), max(0, cy - half), cx + half, cy + half)
print("square box:", box)
square = logo.crop(box).resize((512, 512), Image.LANCZOS)

# Circular mark with a gold ring, on the brand burgundy.
circle = square.convert("RGBA")
mask = Image.new("L", (512, 512), 0)
ImageDraw.Draw(mask).ellipse((2, 2, 509, 509), fill=255)
circle.putalpha(mask)
ring = ImageDraw.Draw(circle)
ring.ellipse((2, 2, 509, 509), outline=(214, 184, 117, 255), width=6)
circle.save(OUT / "quantum-health-logo-mark.png")
square.save(OUT / "logo-square-check.png")
print("wrote", OUT / "quantum-health-logo-mark.png")
