"""Optimize root-level raster images in public/ to WebP.

Converts every *.png/*.jpg/*.jpeg directly inside public/ into an optimized
.webp file (same base name), then moves the original into assets-src/ so it is
kept for provenance but never deployed.

Usage: python build/optimize-images.py [--quality 80] [--max-width 1600]
"""
import argparse
import os
import shutil
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
ARCHIVE = os.path.join(ROOT, "assets-src")

RASTER_EXTS = {".png", ".jpg", ".jpeg"}


def human(n):
    if n < 1024:
        return f"{n}B"
    if n < 1024 * 1024:
        return f"{n / 1024:.0f}KB"
    return f"{n / (1024 * 1024):.1f}MB"


def optimize(path, quality, max_width):
    with Image.open(path) as im:
        has_alpha = im.mode in ("RGBA", "LA", "PA") or (im.mode == "P" and "transparency" in im.info)
        im = im.convert("RGBA" if has_alpha else "RGB")
        if im.width > max_width:
            ratio = max_width / im.width
            im = im.resize((max_width, round(im.height * ratio)), Image.LANCZOS)
        out = os.path.splitext(path)[0] + ".webp"
        im.save(out, "WEBP", quality=quality, method=6)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quality", type=int, default=80)
    ap.add_argument("--max-width", type=int, default=1600)
    args = ap.parse_args()

    if not os.path.isdir(PUBLIC):
        sys.exit("public/ not found")
    os.makedirs(ARCHIVE, exist_ok=True)

    targets = sorted(
        f for f in os.listdir(PUBLIC)
        if os.path.splitext(f)[1].lower() in RASTER_EXTS and os.path.isfile(os.path.join(PUBLIC, f))
    )
    if not targets:
        print("No raster images left to optimize in public/.")
        return

    total_before = total_after = 0
    for name in targets:
        src = os.path.join(PUBLIC, name)
        before = os.path.getsize(src)
        out = optimize(src, args.quality, args.max_width)
        after = os.path.getsize(out)
        shutil.move(src, os.path.join(ARCHIVE, name))
        total_before += before
        total_after += after
        print(f"{name} -> {os.path.basename(out)}: {human(before)} -> {human(after)}")
    saved = (1 - total_after / total_before) * 100 if total_before else 0
    print(f"\nTotal: {human(total_before)} -> {human(total_after)} ({saved:.1f}% smaller)")


if __name__ == "__main__":
    main()
