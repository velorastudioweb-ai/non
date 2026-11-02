"""Inspect the four supplied assets and locate the baked-in panel furniture."""
from pathlib import Path
from PIL import Image, ImageOps

PUBLIC = Path(__file__).resolve().parent / "public"

FILES = {
    "logo": "WhatsApp Image 2026-11-02 at 8.45.16 AM.jpeg",
    "consult": "WhatsApp Image 2026-11-02 at 9.14.02 AM.jpeg",
    "vikas": "Maroon Visionary with Golden Worldscape.png",
    "cities": "Hong Kong and Bengaluru Nightscapes.png",
    "our_approach_current": "Our approach.webp",
}

for key, name in FILES.items():
    path = PUBLIC / name
    if not path.exists():
        print(f"{key}: MISSING {name}")
        continue
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        print(f"{key}: {name} -> {im.size[0]}x{im.size[1]} mode={im.mode} kb={path.stat().st_size // 1024}")

# Locate the gold pill outlines in the two-panel city art.
with Image.open(PUBLIC / FILES["cities"]) as im:
    art = im.convert("RGB")
w, h = art.size
print(f"\ncities art: {w}x{h}, half = {w // 2}x{h}")
px = art.load()


def bright_bbox(x0, y0, x1, y1, threshold):
    minx, miny, maxx, maxy = None, None, None, None
    for y in range(y0, y1, 2):
        for x in range(x0, x1, 2):
            r, g, b = px[x, y]
            if r >= threshold and g >= int(threshold * 0.65) and b <= int(threshold * 0.75):
                if minx is None or x < minx:
                    minx = x
                if maxx is None or x > maxx:
                    maxx = x
                if miny is None or y < miny:
                    miny = y
                if maxy is None or y > maxy:
                    maxy = y
    return (minx, miny, maxx, maxy)


# bottom-left pill of the left panel (search lower-left quadrant)
print("left pill region bbox:", bright_bbox(int(w * 0.02), int(h * 0.72), int(w * 0.26), int(h * 0.98), 200))
print("right pill region bbox:", bright_bbox(int(w * 0.52), int(h * 0.72), int(w * 0.76), int(h * 0.98), 200))
print("left rule line bbox:", bright_bbox(int(w * 0.02), int(h * 0.18), int(w * 0.48), int(h * 0.30), 230))
print("right rule line bbox:", bright_bbox(int(w * 0.52), int(h * 0.18), int(w * 0.98), int(h * 0.30), 230))
