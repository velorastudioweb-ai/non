"""Generate bold, abstract breast-medical artwork for the site image library.

Run with: python build/gen-bold-art.py
Requires Pillow. Writes the existing image filenames/dimensions plus wide
page-banner artwork into public/assets/img/.
"""
import math
import os
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "img")
BG = (13, 5, 12)
PLUM = (48, 5, 27)
BURGUNDY = (112, 12, 42)
ROSE = (232, 70, 112)
PINK = (255, 137, 160)
GOLD = (226, 190, 112)
IVORY = (246, 228, 215)

# Existing picture() keys and their exact responsive dimensions.
ASSETS = {
    "hero-portrait": [(700, 875), (1000, 1250)],
    "portrait-studio": [(620, 775), (900, 1125)],
    "portrait-shadow": [(620, 775), (900, 1125)],
    "clinic": [(620, 775), (900, 1125)],
    "chair": [(620, 775), (900, 1125)],
    "care-hands": [(620, 775), (900, 1125)],
    "hands": [(620, 775), (900, 1125)],
    "stilllife": [(560, 385), (900, 619)],
    "dropper": [(560, 385), (900, 619)],
    "glass-bottles": [(560, 385), (900, 619)],
    "curtain": [(560, 385), (900, 619)],
    "shadows": [(560, 385), (900, 619)],
    "perfume": [(560, 385), (900, 619)],
    "marble-dark": [(560, 385), (900, 619)],
    "marble-white": [(560, 385), (900, 619)],
    "leaf": [(560, 385), (900, 619)],
    "orchid": [(560, 385), (900, 619)],
    "concrete": [(560, 385), (900, 619)],
    "skyline": [(560, 385), (900, 619)],
    "city-street": [(560, 385), (900, 619)],
    "archways": [(560, 385), (900, 619)],
    "escalator": [(560, 385), (900, 619)],
    "books": [(560, 385), (900, 619)],
    "notebook": [(560, 385), (900, 619)],
    "fabric-folds": [(1800, 1012)],
    "homepage-hero-luxury-editorial": [(1920, 1080), (2560, 1440)],
    "treatment-dermal-fillers": [(620, 827), (900, 1200)],
    "treatment-prp-visualization": [(620, 827), (900, 1200)],
    "treatment-pdo-threads": [(620, 827), (900, 1200)],
    "treatment-mono-threads": [(620, 827), (900, 1200)],
    "treatment-sculptra-plla": [(620, 827), (900, 1200)],
    "treatment-biostimulators": [(620, 827), (900, 1200)],
    "treatment-breast-implants": [(620, 827), (900, 1200)],
    "treatment-fat-transfer": [(620, 827), (900, 1200)],
    "treatment-breast-lift": [(620, 827), (900, 1200)],
    "education-breast-anatomy": [(620, 827), (900, 1200)],
}

BANNERS = [
    "banner-breast-enhancement", "banner-nonsurgical", "banner-dermal-fillers",
    "banner-prp", "banner-breast-threads", "banner-mono-threads",
    "banner-regenerative", "banner-sculptra-plla", "banner-biostimulators",
    "banner-surgical", "banner-breast-augmentation", "banner-breast-implants",
    "banner-fat-transfer", "banner-breast-lift", "banner-comparison",
    "banner-anatomy", "banner-about", "banner-understanding",
    "banner-implant-safety", "banner-surgeon", "banner-safety", "banner-faqs",
    "banner-blogs", "banner-blog-surgical-vs-nonsurgical",
    "banner-blog-implants", "banner-blog-prp", "banner-blog-consultation",
    "banner-blog-safety", "banner-policy", "banner-glossary",
    "banner-references", "banner-research", "banner-contact",
]


def mix(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def backdrop(w, h, seed):
    # Render a tiny gradient then upscale: crisp enough for a soft studio wash,
    # without expensive per-pixel Python loops at banner resolution.
    rng = random.Random(seed)
    sw, sh = 48, 48
    small = Image.new("RGB", (sw, sh))
    px = small.load()
    for y in range(sh):
        for x in range(sw):
            t = min(1, max(0, (x / sw) * .45 + (y / sh) * .30 + rng.random() * .08))
            px[x, y] = mix(BG, PLUM, t)
    img = small.resize((w, h), Image.Resampling.BICUBIC).convert("RGBA")
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(glow)
    cx, cy = int(w * .69), int(h * .47)
    radius = int(min(w, h) * .75)
    for i in range(24, 0, -1):
        r = int(radius * i / 24)
        alpha = int(4 + (24 - i) * 1.5)
        d.ellipse((cx-r, cy-r, cx+r, cy+r), fill=ROSE + (alpha,))
    img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(max(8, min(w, h) // 20))))
    return img


def add_contours(draw, cx, cy, rx, ry, seed, color=GOLD, count=5, width=2):
    # Layered medical contour lines evoke breast anatomy without literal or
    # explicit imagery; offsets and arcs vary by asset for a distinct result.
    phase = seed % 17
    for i in range(count):
        inset = i * .105
        box = (cx-rx*(1-inset), cy-ry*(1-inset), cx+rx*(1-inset), cy+ry*(1-inset))
        draw.arc(box, start=195 + phase + i * 3, end=345 + phase - i * 2,
                 fill=color + (max(70, 210 - i * 20),), width=width)
        draw.arc(box, start=15 + phase, end=165 + phase,
                 fill=ROSE + (max(55, 155 - i * 15),), width=max(1, width - 1))


def artwork(w, h, seed, banner=False, label=""):
    rng = random.Random(seed)
    img = backdrop(w, h, seed)
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    # Site banners leave a quiet text field on the left; content images use a
    # centered composition with the same strong clinical/editorial motif.
    cx = int(w * (.72 if banner else .52))
    cy = int(h * (.52 if banner else .49))
    rx = int(min(w, h) * (.37 if banner else .42))
    ry = int(min(w, h) * (.42 if banner else .43))

    # Bold paired tissue forms, softly shaded and outlined in rose/champagne.
    for side in (-1, 1):
        bx = cx + int(side * rx * .30)
        by = cy + int(ry * .10)
        ex, ey = int(rx * .62), int(ry * .68)
        d.ellipse((bx-ex, by-ey, bx+ex, by+ey), fill=BURGUNDY + (125,),
                  outline=ROSE + (210,), width=max(2, min(w, h) // 150))
        d.arc((bx-ex*.82, by-ey*.76, bx+ex*.82, by+ey*.76), 195, 345,
              fill=IVORY + (190,), width=max(1, min(w, h) // 240))
    add_contours(d, cx, cy + int(ry * .12), int(rx * .95), int(ry * .83), seed,
                 count=5 if banner else 6, width=max(1, min(w, h) // 220))

    # Anatomical tissue-layer ribbons across the lower third.
    for i, col in enumerate((ROSE, BURGUNDY, GOLD)):
        y = int(h * (.75 + i * .055))
        pts = []
        for x in range(-4, w + 8, max(6, w // 150)):
            wave = math.sin(x / max(1, w) * math.tau * (1.1 + i*.2) + seed) * h * (.022 + i*.004)
            pts.append((x, int(y + wave)))
        d.line(pts, fill=col + (100 if i != 2 else 135,), width=max(2, min(w, h) // 110))

    # Floating connective-tissue particles and a precise gold framing arc.
    for _ in range(max(45, min(180, w * h // 18000))):
        x = rng.uniform(cx-rx*1.25, cx+rx*1.25)
        y = rng.uniform(cy-ry*1.1, cy+ry*1.1)
        r = rng.uniform(max(1, min(w, h)*.002), max(2, min(w, h)*.009))
        col = GOLD if rng.random() > .55 else PINK
        d.ellipse((x-r, y-r, x+r, y+r), fill=col + (rng.randint(65, 170),))
    d.arc((cx-rx*1.22, cy-ry*1.12, cx+rx*1.22, cy+ry*1.12), 205, 345,
          fill=GOLD + (190,), width=max(2, min(w, h) // 180))

    theme = label.lower()
    if "thread" in theme:
        # Fine, sweeping paths suggest thread-placement concepts over breast
        # contours, without implying treatment results.
        for line in range(11):
            y0 = cy - ry * .62 + line * ry * .12
            points = []
            for x in range(int(cx-rx), int(cx+rx), max(5, w//180)):
                y = y0 + math.sin((x-cx)/max(1,rx)*math.pi*1.4 + line*.42) * ry*.06
                points.append((x, int(y)))
            d.line(points, fill=(PINK if line % 2 else GOLD) + (145,), width=max(1, min(w,h)//320))
    elif "implant" in theme:
        # Paired smooth implant-inspired capsules sit within the breast forms.
        for side in (-1, 1):
            bx = cx + int(side * rx * .30)
            by = cy + int(ry * .10)
            irx, iry = int(rx*.31), int(ry*.43)
            d.ellipse((bx-irx, by-iry, bx+irx, by+iry), fill=ROSE + (42,),
                      outline=IVORY + (195,), width=max(2, min(w,h)//220))
            d.arc((bx-irx*.7, by-iry*.78, bx+irx*.7, by+iry*.78), 205, 325,
                  fill=GOLD + (210,), width=max(1, min(w,h)//260))
    elif "fat-transfer" in theme or "fat-transfer" in label:
        for _ in range(48):
            x = rng.uniform(cx-rx*.78, cx+rx*.78)
            y = rng.uniform(cy-ry*.53, cy+ry*.62)
            r = rng.uniform(min(w,h)*.008, min(w,h)*.026)
            d.ellipse((x-r, y-r, x+r, y+r), fill=GOLD + (80,), outline=GOLD + (180,), width=1)
    elif "lift" in theme:
        for i in range(4):
            inset = i * .12
            d.arc((cx-rx*(.88-inset), cy-ry*(.88-inset), cx+rx*(.88-inset), cy+ry*(.88-inset)),
                  218, 322, fill=GOLD + (205-i*25,), width=max(2, min(w,h)//220))
    elif "anatomy" in theme or "education" in theme:
        for i, col in enumerate((PINK, ROSE, GOLD, IVORY)):
            y = int(cy - ry*.4 + i*ry*.25)
            d.arc((cx-rx*.65, y-ry*.3, cx+rx*.65, y+ry*.38), 190, 350,
                  fill=col + (180,), width=max(2, min(w,h)//240))

    img = Image.alpha_composite(img, overlay.filter(ImageFilter.GaussianBlur(.55)))

    # The banner's left-side scrim is baked into the art as a fallback; CSS
    # adds a second responsive text-contrast layer.
    if banner:
        scrim = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        sd = ImageDraw.Draw(scrim)
        for x in range(w):
            a = int(180 * max(0, 1 - x / (w * .76)))
            if a:
                sd.line((x, 0, x, h), fill=(15, 3, 10, a))
        img = Image.alpha_composite(img, scrim)

    # Subtle vignette and fine film grain.
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse((-w*.16, -h*.22, w*1.16, h*1.22), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(max(8, min(w, h)*.14)))
    shade = Image.new("RGBA", (w, h), (0, 0, 0, 85))
    shade.putalpha(mask.point(lambda p: 85 - int(p * .23)))
    img = Image.alpha_composite(img, shade)
    return img.convert("RGB")


def save_image(name, w, h, banner=False):
    path = os.path.join(OUT_DIR, f"{name}-{w}.jpg")
    artwork(w, h, sum(ord(ch) for ch in name), banner, name).save(path, "JPEG", quality=89, optimize=True)
    print(f"{os.path.basename(path):52s} {w}x{h}")


def social_cover():
    img = artwork(1200, 630, 2026, banner=True, label="breast-enhancement")
    draw = ImageDraw.Draw(img)
    font_dirs = [r"C:\Windows\Fonts", "/usr/share/fonts/truetype/dejavu", "/Library/Fonts"]

    def font(names, size):
        for directory in font_dirs:
            for name in names:
                path = os.path.join(directory, name)
                if os.path.exists(path):
                    try:
                        return ImageFont.truetype(path, size)
                    except OSError:
                        pass
        return ImageFont.load_default()

    brand = font(["georgiab.ttf", "Georgia Bold.ttf", "DejaVuSerif-Bold.ttf"], 26)
    title = font(["georgia.ttf", "Georgia.ttf", "DejaVuSerif.ttf"], 58)
    tagline = font(["georgiai.ttf", "Georgia Italic.ttf", "DejaVuSerif-Italic.ttf"], 25)
    draw.text((72, 122), "BREAST ENLARGEMENT GUIDE", font=brand, fill=GOLD)
    draw.line((72, 170, 350, 170), fill=ROSE, width=3)
    draw.text((68, 225), "A More Informed", font=title, fill=IVORY)
    draw.text((68, 297), "Approach to", font=title, fill=IVORY)
    draw.text((68, 369), "Breast Enhancement", font=title, fill=PINK)
    draw.text((72, 480), "Independent, evidence-based patient education", font=tagline, fill=IVORY)
    return img


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    count = 0
    for name, dimensions in ASSETS.items():
        for w, h in dimensions:
            save_image(name, w, h)
            count += 1
    for name in BANNERS:
        for w, h in ((1600, 640), (2560, 1024)):
            save_image(name, w, h, banner=True)
            count += 1
    # Large social-preview campaign artwork, kept separate from the branded SVG.
    social_cover().save(
        os.path.join(OUT_DIR, "og-cover.png"), "PNG", optimize=True)
    print(f"\nWrote {count} JPEG assets and updated og-cover.png in {OUT_DIR}")


if __name__ == "__main__":
    main()
