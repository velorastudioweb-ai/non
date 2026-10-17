"""Generate public/assets/img/og-cover.png (1200x630) from the dark luxe palette.

Run:  python build/og.py
Requires Pillow. Uses Georgia if available, else DejaVu Serif, else Pillow default.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageChops

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "img", "og-cover.png")

BG_DEEP = (46, 7, 15)      # #2E070F
BG_MAIN = (74, 13, 26)     # #4A0D1A
BG_VELVET = (110, 20, 39)  # #6E1427
GLOW = (138, 27, 51)       # #8A1B33
GOLD = (216, 177, 115)     # #D8B173
GOLD_LIGHT = (243, 221, 174)
BLUSH = (226, 184, 174)
WHITE = (255, 255, 255)

FONT_DIRS = [
    r"C:\Windows\Fonts",
    "/usr/share/fonts/truetype/dejavu",
    "/Library/Fonts",
]


def load_font(name_variants, size):
    for d in FONT_DIRS:
        for n in name_variants:
            p = os.path.join(d, n)
            if os.path.exists(p):
                try:
                    return ImageFont.truetype(p, size)
                except Exception:
                    pass
    return ImageFont.load_default()


serif = ["georgia.ttf", "Georgia.ttf", "DejaVuSerif.ttf", "Times New Roman.ttf"]
serif_italic = ["georgiai.ttf", "Georgia Italic.ttf", "DejaVuSerif-Italic.ttf"]
serif_bold = ["georgiab.ttf", "Georgia Bold.ttf", "DejaVuSerif-Bold.ttf"]

f_brand = load_font(serif_bold, 30)
f_title = load_font(serif, 62)
f_tag = load_font(serif_italic, 30)

img = Image.new("RGB", (W, H), BG_DEEP)
draw = ImageDraw.Draw(img)

# Diagonal burgundy gradient (135deg-ish)
for y in range(H):
    for_x = y / H
    r = int(BG_DEEP[0] + (BG_VELVET[0] - BG_DEEP[0]) * for_x)
    g = int(BG_DEEP[1] + (BG_VELVET[1] - BG_DEEP[1]) * for_x)
    b = int(BG_DEEP[2] + (BG_VELVET[2] - BG_DEEP[2]) * for_x)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Petal glow (top-right) — soft radial, screen-blended
glow = Image.new("RGB", (W, H), (0, 0, 0))
gdraw = ImageDraw.Draw(glow)
cx, cy, rad = int(W * 0.8), int(H * 0.22), 560
for i in range(rad, 0, -4):
    t = 1 - (i / rad)
    a = (t ** 2)
    gdraw.ellipse([cx - i, cy - i, cx + i, cy + i],
                  fill=(int(GLOW[0] * a), int(GLOW[1] * a), int(GLOW[2] * a)))
img = ImageChops.screen(img, glow)

# Champagne hotspot (bottom-right) — very subtle
hot = Image.new("RGB", (W, H), (0, 0, 0))
hdraw = ImageDraw.Draw(hot)
hx, hy, hrad = int(W * 0.92), int(H * 0.9), 380
for i in range(hrad, 0, -4):
    t = 1 - (i / hrad)
    a = (t ** 2) * 0.35
    hdraw.ellipse([hx - i, hy - i, hx + i, hy + i],
                  fill=(int(GOLD[0] * a), int(GOLD[1] * a), int(GOLD[2] * a)))
img = ImageChops.screen(img, hot)

draw = ImageDraw.Draw(img)

# Gold lotus mark (three petals) near top-left
bx, by, s = 108, 150, 3.0
petals = [
    [(24, 9), (29, 17.7), (29, 21.4), (24, 31), (19, 21.4), (19, 17.7), (24, 9)],
    [(10, 18), (21, 20), (24, 22.8), (27, 33), (16, 32), (13, 29), (10, 18)],
    [(38, 18), (35, 22.8), (32, 33), (24.6, 29), (27, 20), (38, 18)],
]
for p in petals:
    pts = [(bx + x * s, by + y * s) for (x, y) in p]
    draw.line(pts, fill=GOLD, width=3, joint="curve")

draw.text((96, 232), "QUANTUMHEALTH", font=f_brand, fill=GOLD_LIGHT)
draw.text((96, 310), "A More Informed Approach", font=f_title, fill=WHITE)
draw.text((96, 384), "to Breast Enhancement", font=f_title, fill=WHITE)
draw.text((96, 480), "Confidence begins with an informed consultation", font=f_tag, fill=BLUSH)

img.save(OUT, "PNG")
print("Wrote", os.path.normpath(OUT), img.size)
