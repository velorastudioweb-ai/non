"""Draft crops for review before they are published into public/."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps, ImageFilter

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
OUT = Path(r"C:\Users\Lokesh Reddy\AppData\Local\Temp\opencode\qh-assets")
OUT.mkdir(parents=True, exist_ok=True)

logo = ImageOps.exif_transpose(Image.open(PUBLIC / "WhatsApp Image 2026-11-02 at 8.45.16 AM.jpeg")).convert("RGB")
consult = ImageOps.exif_transpose(Image.open(PUBLIC / "WhatsApp Image 2026-11-02 at 9.14.02 AM.jpeg")).convert("RGB")
cities = ImageOps.exif_transpose(Image.open(PUBLIC / "Hong Kong and Bengaluru Nightscapes.png")).convert("RGB")
lw, lh = logo.size


def gold_bbox(img, x0, y0, x1, y1, min_r=150, min_g=100, max_b=140):
    px = img.load()
    minx = miny = None
    maxx = maxy = None
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b = px[x, y]
            if r >= min_r and g >= min_g and b <= max_b:
                if minx is None or x < minx:
                    minx = x
                if maxx is None or x > maxx:
                    maxx = x
                if miny is None or y < miny:
                    miny = y
                if maxy is None or y > maxy:
                    maxy = y
    return minx, miny, maxx, maxy


# 1. Crown + Q mark: gold pixels in the upper-middle band of the logo art.
bbox = gold_bbox(logo, int(lw * 0.25), int(lh * 0.02), int(lw * 0.75), int(lh * 0.60))
print("mark bbox:", bbox)
pad = 14
x0, y0, x1, y1 = bbox[0] - pad, bbox[1] - pad, bbox[2] + pad, bbox[3] + pad
side = max(x1 - x0, y1 - y0)
cx, cy = (x0 + x1) // 2, (y0 + y1) // 2
mark = logo.crop((cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)).resize((512, 512), Image.LANCZOS)
mask = Image.new("L", (512, 512), 0)
ImageDraw.Draw(mask).ellipse((0, 0, 511, 511), fill=255)
mark = mark.convert("RGBA")
mark.putalpha(mask)
mark.save(OUT / "logo-mark-circle.png")
logo.crop((max(0, bbox[0] - 30), max(0, bbox[1] - 30), min(lw, bbox[2] + 30), min(lh, bbox[3] + 30))).save(OUT / "logo-mark-square-check.png")

# 2. Consultation photo with the watermark strip removed.
cw, ch = consult.size
strip = int(ch * 0.045)
print("consult watermark strip removed:", strip, "px of", ch)
consult.crop((0, strip, cw, ch)).resize((1536, int((ch - strip) * 1536 / cw)), Image.LANCZOS).save(OUT / "consultation-draft.webp", quality=86)

# 3. City panels - keep the halves as they are, and a version with a label overlay mock.
w, h = cities.size
left = cities.crop((0, 0, w // 2, h))
right = cities.crop((w // 2, 0, w, h))
left.save(OUT / "panel-left.webp", quality=86)
right.save(OUT / "panel-right.webp", quality=86)
print("panel size:", left.size)

# Mock overlay so the baked pill and rule positions can be judged.
mock = left.convert("RGB").copy()
d = ImageDraw.Draw(mock)
pw, ph = mock.size
d.rectangle([int(pw * 0.055) - 4, int(ph * 0.818) - 4, int(pw * 0.055 + 360) + 4, int(ph * 0.952) + 4], outline=(0, 255, 0), width=3)
d.rectangle([int(pw * 0.15) - 4, int(ph * 0.19) - 4, int(pw * 0.92) + 4, int(ph * 0.30) + 4], outline=(0, 120, 255), width=3)
mock.save(OUT / "panel-left-mock.png")
