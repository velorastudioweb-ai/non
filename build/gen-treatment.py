"""Generate the luxury medical-aesthetics campaign images declared in build/images.js.

Run:  python build/gen-treatment.py
Requires Pillow.  Writes to public/assets/img/ at the exact filenames and
dimensions the picture() helper emits via <img src> and srcset.

Each frame is a bespoke abstract composition in the house palette (deep
charcoal, burgundy silk, rose-pink #FD8482, champagne gold) so the layout
reads as intentional editorial art direction rather than a grey box.
"""
import math
import os
import random
from PIL import Image, ImageDraw, ImageFilter, ImageChops

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "assets", "img")

# House palette
BG = (5, 5, 5)
BURGUNDY = (92, 18, 36)
BURGUNDY_LT = (140, 32, 58)
ROSE = (253, 132, 130)
ROSE_DEEP = (212, 72, 92)
GOLD = (212, 175, 120)
GOLD_LT = (240, 210, 170)
CREAM = (245, 235, 228)
WHITE = (255, 255, 255)
DEEP_PLUM = (38, 8, 22)
CHARCOAL = (18, 18, 22)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vgrad(w, h, top, bottom):
    """Vertical linear gradient."""
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        c = lerp(top, bottom, y / max(h - 1, 1))
        for x in range(w):
            px[x, y] = c
    return img


def dgrad(w, h, c1, c2, angle_deg=135):
    """Diagonal gradient."""
    img = Image.new("RGB", (w, h))
    px = img.load()
    ang = math.radians(angle_deg)
    dx, dy = math.cos(ang), math.sin(ang)
    # project corners to find range
    corners = [(0, 0), (w, 0), (0, h), (w, h)]
    projs = [x * dx + y * dy for x, y in corners]
    lo, hi = min(projs), max(projs)
    for y in range(h):
        for x in range(w):
            t = (x * dx + y * dy - lo) / (hi - lo + 1e-9)
            px[x, y] = lerp(c1, c2, t)
    return img


def radial_glow(size, cx, cy, radius, color, intensity=0.55):
    """Return an RGBA layer with a soft radial glow."""
    w, h = size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    steps = max(1, radius // 3)
    for i in range(steps, 0, -1):
        r = radius * i / steps
        t = 1 - i / steps
        a = int(255 * intensity * (t ** 1.8))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                     fill=color + (a,))
    return layer.filter(ImageFilter.GaussianBlur(radius * 0.25))


def soft_ellipse(draw, box, color, blur_img=None):
    draw.ellipse(box, fill=color)


def add_grain(img, amount=8):
    """Subtle film grain."""
    noise = Image.effect_noise(img.size, amount).convert("L")
    noise_rgb = Image.merge("RGB", (noise, noise, noise))
    return ImageChops.add(img, noise_rgb, scale=1, offset=-amount // 2)


def silk_folds(w, h, base, highlight, n_folds=7, seed=42):
    """Rippled 'silk' sinusoidal bands."""
    rng = random.Random(seed)
    img = vgrad(w, h, base, lerp(base, (0, 0, 0), 0.4))
    draw = ImageDraw.Draw(img)
    for i in range(n_folds):
        y0 = rng.uniform(-0.1, 1.0) * h
        amp = rng.uniform(0.04, 0.14) * h
        freq = rng.uniform(1.2, 3.0)
        phase = rng.uniform(0, math.tau)
        thickness = rng.uniform(0.02, 0.07) * h
        col = lerp(base, highlight, rng.uniform(0.25, 0.85))
        pts_top = []
        pts_bot = []
        for x in range(0, w + 8, 8):
            yy = y0 + amp * math.sin(freq * math.tau * x / w + phase)
            pts_top.append((x, yy))
            pts_bot.append((x, yy + thickness))
        poly = pts_top + pts_bot[::-1]
        draw.polygon(poly, fill=col)
    img = img.filter(ImageFilter.GaussianBlur(max(w, h) * 0.012))
    return img


def particle_field(img, cx, cy, spread, color, n=140, rmin=1, rmax=5, seed=7):
    rng = random.Random(seed)
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for _ in range(n):
        # gaussian-ish
        dx = (rng.random() + rng.random() + rng.random() - 1.5) * spread
        dy = (rng.random() + rng.random() + rng.random() - 1.5) * spread
        x, y = cx + dx, cy + dy
        r = rng.uniform(rmin, rmax)
        a = int(rng.uniform(40, 190))
        draw.ellipse([x - r, y - r, x + r, y + r], fill=color + (a,))
    overlay = overlay.filter(ImageFilter.GaussianBlur(1.5))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def concentric_rings(img, cx, cy, color, n=6, r0=40, gap=28, width=2, alpha=110):
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for i in range(n):
        r = r0 + i * gap
        draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                     outline=color + (alpha,), width=width)
    overlay = overlay.filter(ImageFilter.GaussianBlur(1.2))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def diagonal_stripes(w, h, base, stripe, count=9, seed=3):
    rng = random.Random(seed)
    img = Image.new("RGB", (w, h), base)
    draw = ImageDraw.Draw(img)
    for i in range(count):
        x0 = rng.uniform(-w * 0.3, w * 1.1)
        thick = rng.uniform(w * 0.015, w * 0.07)
        gap = rng.uniform(w * 0.03, w * 0.12)
        pts = [
            (x0, -20),
            (x0 + thick, -20),
            (x0 + thick - h * 0.6, h + 20),
            (x0 - h * 0.6, h + 20),
        ]
        col = lerp(base, stripe, rng.uniform(0.25, 0.75))
        draw.polygon(pts, fill=col)
    return img.filter(ImageFilter.GaussianBlur(w * 0.008))


def thread_lines(img, color, n=18, seed=11, curve_amp=None):
    w, h = img.size
    rng = random.Random(seed)
    amp = curve_amp if curve_amp is not None else h * 0.08
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for i in range(n):
        y0 = rng.uniform(0, h)
        phase = rng.uniform(0, math.tau)
        freq = rng.uniform(0.6, 1.8)
        col = color + (int(rng.uniform(50, 170)),)
        pts = []
        for x in range(0, w + 6, 6):
            yy = y0 + amp * math.sin(freq * math.tau * x / w + phase)
            pts.append((x, yy))
        draw.line(pts, fill=col, width=max(1, int(rng.uniform(1, 3))))
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.8))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def layered_tissue(img, colors, seed=21):
    """Soft horizontal 'tissue layers' bands."""
    w, h = img.size
    rng = random.Random(seed)
    draw = ImageDraw.Draw(img)
    y = 0.0
    for i, col in enumerate(colors):
        y_next = y + h / len(colors) * rng.uniform(0.7, 1.35)
        draw.rectangle([0, y - 4, w, y_next + 4], fill=col)
        y = y_next
    return img.filter(ImageFilter.GaussianBlur(h * 0.012))


def vignette(img, strength=0.55):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse([-w * 0.25, -h * 0.25, w * 1.25, h * 1.25], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.18))
    dark = Image.new("RGB", (w, h), (0, 0, 0))
    return Image.composite(img, dark, mask.point(lambda p: int(255 - (255 - p) * strength)))


# ---------------------------------------------------------------------------
# Per-asset compositions
# ---------------------------------------------------------------------------

def make_hero(w, h):
    img = silk_folds(w, h, DEEP_PLUM, BURGUNDY_LT, n_folds=9, seed=5)
    img = dgrad_overlay(img, BURGUNDY, ROSE_DEEP, alpha=90)
    # large soft glow top-right (rose)
    glow = radial_glow((w, h), int(w * 0.78), int(h * 0.22), int(min(w, h) * 0.55),
                       ROSE, intensity=0.5)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    # gold hotspot bottom-left
    glow2 = radial_glow((w, h), int(w * 0.15), int(h * 0.85), int(min(w, h) * 0.4),
                        GOLD, intensity=0.3)
    img = Image.alpha_composite(img.convert("RGBA"), glow2).convert("RGB")
    img = particle_field(img, w * 0.6, h * 0.35, min(w, h) * 0.32, ROSE, n=180,
                         rmin=1, rmax=4, seed=13)
    img = vignette(img, 0.5)
    img = add_grain(img, 6)
    return img


def dgrad_overlay(img, c1, c2, alpha=80, angle=135):
    w, h = img.size
    grad = dgrad(w, h, c1, c2, angle).convert("RGBA")
    grad.putalpha(alpha)
    return Image.alpha_composite(img.convert("RGBA"), grad).convert("RGB")


def make_dermal_fillers(w, h):
    img = vgrad(w, h, CHARCOAL, DEEP_PLUM)
    img = dgrad_overlay(img, BURGUNDY, ROSE_DEEP, alpha=70, angle=160)
    # anatomical inset glow (rose-pink circle)
    cx, cy = int(w * 0.5), int(h * 0.42)
    glow = radial_glow((w, h), cx, cy, int(min(w, h) * 0.32), ROSE, intensity=0.65)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    img = concentric_rings(img, cx, cy, ROSE, n=5, r0=int(min(w, h) * 0.12),
                           gap=int(min(w, h) * 0.05), width=2, alpha=120)
    # syringe-like slender bar
    draw = ImageDraw.Draw(img)
    sx, sy = int(w * 0.72), int(h * 0.58)
    draw.line([(sx, sy), (sx + w * 0.18, sy - h * 0.12)], fill=CREAM, width=max(2, w // 180))
    draw.line([(sx + w * 0.18, sy - h * 0.12), (sx + w * 0.22, sy - h * 0.15)],
              fill=GOLD_LT, width=max(2, w // 220))
    img = particle_field(img, w * 0.5, h * 0.42, min(w, h) * 0.22, ROSE, n=110,
                         rmin=1, rmax=3, seed=17)
    img = vignette(img, 0.5)
    return add_grain(img, 6)


def make_prp(w, h):
    img = vgrad(w, h, (8, 6, 10), DEEP_PLUM)
    # luminous vertical 'tube' streak
    draw = ImageDraw.Draw(img)
    tx = int(w * 0.5)
    draw.rectangle([tx - w * 0.045, h * 0.12, tx + w * 0.045, h * 0.88],
                   fill=(40, 14, 26))
    # separated plasma layers
    layers = [
        (0.12, 0.30, (220, 190, 170)),
        (0.30, 0.42, (190, 120, 120)),
        (0.42, 0.60, (140, 40, 60)),
        (0.60, 0.88, (60, 16, 30)),
    ]
    for y0, y1, col in layers:
        draw.rectangle([tx - w * 0.042, h * y0, tx + w * 0.042, h * y1], fill=col)
    # glow around tube
    glow = radial_glow((w, h), tx, int(h * 0.5), int(min(w, h) * 0.38), ROSE, intensity=0.55)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    # platelet particles
    img = particle_field(img, w * 0.5, h * 0.5, min(w, h) * 0.3, ROSE, n=160,
                         rmin=1, rmax=4, seed=23)
    img = particle_field(img, w * 0.5, h * 0.35, min(w, h) * 0.18, GOLD_LT, n=60,
                         rmin=1, rmax=3, seed=24)
    img = vignette(img, 0.55)
    return add_grain(img, 7)


def make_pdo_threads(w, h):
    img = vgrad(w, h, (10, 8, 12), (30, 10, 22))
    img = dgrad_overlay(img, BURGUNDY, DEEP_PLUM, alpha=80, angle=120)
    img = thread_lines(img, ROSE, n=22, seed=31, curve_amp=h * 0.06)
    # circular magnification inset
    cx, cy = int(w * 0.62), int(h * 0.38)
    r = int(min(w, h) * 0.22)
    inset = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(inset)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ROSE_DEEP + (70,))
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ROSE + (160,), width=max(2, w // 200))
    img = Image.alpha_composite(img.convert("RGBA"), inset).convert("RGB")
    glow = radial_glow((w, h), cx, cy, r, ROSE, intensity=0.45)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    img = particle_field(img, w * 0.5, h * 0.5, min(w, h) * 0.3, ROSE, n=100,
                         rmin=1, rmax=3, seed=33)
    img = vignette(img, 0.5)
    return add_grain(img, 6)


def make_mono_threads(w, h):
    img = vgrad(w, h, (8, 6, 10), BURGUNDY)
    img = thread_lines(img, ROSE, n=30, seed=41, curve_amp=h * 0.04)
    img = thread_lines(img, GOLD_LT, n=10, seed=42, curve_amp=h * 0.03)
    glow = radial_glow((w, h), int(w * 0.5), int(h * 0.5), int(min(w, h) * 0.42),
                       BURGUNDY_LT, intensity=0.5)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    img = particle_field(img, w * 0.5, h * 0.5, min(w, h) * 0.32, ROSE, n=90,
                         rmin=1, rmax=3, seed=43)
    img = vignette(img, 0.55)
    return add_grain(img, 6)


def make_sculptra(w, h):
    img = vgrad(w, h, (10, 8, 12), DEEP_PLUM)
    img = dgrad_overlay(img, BURGUNDY, ROSE_DEEP, alpha=65, angle=145)
    # vial silhouette
    draw = ImageDraw.Draw(img)
    vx, vy = int(w * 0.38), int(h * 0.30)
    vw, vh = int(w * 0.16), int(h * 0.38)
    draw.rounded_rectangle([vx - vw // 2, vy, vx + vw // 2, vy + vh],
                           radius=int(vw * 0.18), fill=(36, 22, 30))
    draw.rectangle([vx - vw * 0.28, vy - h * 0.05, vx + vw * 0.28, vy + 2],
                   fill=CREAM)
    draw.rectangle([vx - vw * 0.20, vy + vh * 0.12, vx + vw * 0.20, vy + vh * 0.28],
                   fill=ROSE_DEEP)
    # collagen particle cloud
    img = particle_field(img, w * 0.62, h * 0.52, min(w, h) * 0.28, ROSE, n=200,
                         rmin=1, rmax=5, seed=51)
    img = particle_field(img, w * 0.62, h * 0.52, min(w, h) * 0.16, GOLD_LT, n=80,
                         rmin=1, rmax=3, seed=52)
    glow = radial_glow((w, h), int(w * 0.62), int(h * 0.52), int(min(w, h) * 0.32),
                       ROSE, intensity=0.5)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    img = vignette(img, 0.5)
    return add_grain(img, 6)


def make_biostimulators(w, h):
    img = vgrad(w, h, (12, 10, 14), (40, 18, 32))
    # fiber / elastin lines
    img = thread_lines(img, GOLD_LT, n=26, seed=61, curve_amp=h * 0.10)
    img = thread_lines(img, ROSE, n=14, seed=62, curve_amp=h * 0.07)
    glow = radial_glow((w, h), int(w * 0.48), int(h * 0.46), int(min(w, h) * 0.38),
                       GOLD, intensity=0.45)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    glow2 = radial_glow((w, h), int(w * 0.7), int(h * 0.6), int(min(w, h) * 0.28),
                        ROSE, intensity=0.4)
    img = Image.alpha_composite(img.convert("RGBA"), glow2).convert("RGB")
    img = particle_field(img, w * 0.5, h * 0.5, min(w, h) * 0.34, GOLD_LT, n=130,
                         rmin=1, rmax=4, seed=63)
    img = vignette(img, 0.5)
    return add_grain(img, 6)


def make_implants(w, h):
    img = vgrad(w, h, (14, 10, 14), (48, 16, 32))
    img = dgrad_overlay(img, BURGUNDY, ROSE_DEEP, alpha=75, angle=155)
    # two smooth implant ovals
    draw = ImageDraw.Draw(img)
    for cxr, cyr, wr, hr in [(0.36, 0.42, 0.16, 0.22), (0.64, 0.55, 0.14, 0.20)]:
        cx, cy = int(w * cxr), int(h * cyr)
        rw, rh = int(w * wr), int(h * hr)
        draw.ellipse([cx - rw, cy - rh, cx + rw, cy + rh], fill=(70, 30, 46))
        draw.ellipse([cx - rw + 6, cy - rh + 6, cx + rw - 6, cy + rh - 6],
                     fill=(96, 40, 58))
        # highlight
        hl = radial_glow((w, h), int(cx - rw * 0.35), int(cy - rh * 0.35),
                         int(rw * 0.7), ROSE, intensity=0.35)
        img = Image.alpha_composite(img.convert("RGBA"), hl).convert("RGB")
        draw = ImageDraw.Draw(img)
    # anatomical arc
    draw.arc([w * 0.20, h * 0.28, w * 0.80, h * 0.82], start=200, end=340,
             fill=ROSE, width=max(2, w // 160))
    glow = radial_glow((w, h), int(w * 0.5), int(h * 0.48), int(min(w, h) * 0.4),
                       ROSE_DEEP, intensity=0.4)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    img = particle_field(img, w * 0.5, h * 0.5, min(w, h) * 0.3, ROSE, n=90,
                         rmin=1, rmax=3, seed=71)
    img = vignette(img, 0.5)
    return add_grain(img, 6)


def make_fat_transfer(w, h):
    img = vgrad(w, h, (12, 10, 8), (52, 34, 16))
    img = dgrad_overlay(img, GOLD, (60, 30, 12), alpha=70, angle=140)
    # golden cell-like blobs
    rng = random.Random(81)
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for _ in range(70):
        x = rng.uniform(0, w)
        y = rng.uniform(0, h)
        r = rng.uniform(min(w, h) * 0.015, min(w, h) * 0.06)
        a = int(rng.uniform(30, 110))
        draw.ellipse([x - r, y - r, x + r, y + r], fill=GOLD_LT + (a,))
    overlay = overlay.filter(ImageFilter.GaussianBlur(3))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    # syringe
    draw = ImageDraw.Draw(img)
    sx, sy = int(w * 0.22), int(h * 0.62)
    draw.line([(sx, sy), (sx + w * 0.30, sy - h * 0.10)], fill=CREAM,
              width=max(2, w // 140))
    draw.line([(sx + w * 0.30, sy - h * 0.10), (sx + w * 0.35, sy - h * 0.125)],
              fill=GOLD_LT, width=max(2, w // 200))
    glow = radial_glow((w, h), int(w * 0.55), int(h * 0.45), int(min(w, h) * 0.36),
                       GOLD, intensity=0.5)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    img = particle_field(img, w * 0.55, h * 0.45, min(w, h) * 0.28, GOLD_LT,
                         n=120, rmin=1, rmax=4, seed=82)
    img = vignette(img, 0.5)
    return add_grain(img, 6)


def make_breast_lift(w, h):
    img = silk_folds(w, h, (8, 6, 8), BURGUNDY_LT, n_folds=6, seed=91)
    glow = radial_glow((w, h), int(w * 0.5), int(h * 0.4), int(min(w, h) * 0.45),
                       BURGUNDY, intensity=0.55)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    # elegant curved 'lift' arcs
    draw = ImageDraw.Draw(img)
    for i, off in enumerate([0, 0.12, 0.24]):
        draw.arc([w * (0.22 + off), h * (0.20 + off * 0.4),
                  w * (0.78 - off), h * (0.90 - off * 0.3)],
                 start=210, end=330, fill=ROSE, width=max(2, w // 200))
    img = particle_field(img, w * 0.5, h * 0.45, min(w, h) * 0.3, ROSE, n=80,
                         rmin=1, rmax=3, seed=92)
    img = vignette(img, 0.55)
    return add_grain(img, 6)


def make_anatomy(w, h):
    img = vgrad(w, h, (10, 8, 12), (28, 14, 22))
    # layered tissue bands
    layers = [
        (46, 24, 32), (72, 34, 44), (110, 52, 62), (160, 90, 96),
        (200, 140, 130), (230, 190, 175),
    ]
    y = 0
    band_h = h / len(layers)
    draw = ImageDraw.Draw(img)
    for i, col in enumerate(layers):
        draw.rectangle([0, y, w, y + band_h + 2], fill=col)
        y += band_h
    img = img.filter(ImageFilter.GaussianBlur(h * 0.015))
    # glandular / connective texture
    img = particle_field(img, w * 0.5, h * 0.55, min(w, h) * 0.3, ROSE, n=140,
                         rmin=1, rmax=4, seed=101)
    img = particle_field(img, w * 0.5, h * 0.4, min(w, h) * 0.22, GOLD_LT, n=70,
                         rmin=1, rmax=3, seed=102)
    glow = radial_glow((w, h), int(w * 0.5), int(h * 0.5), int(min(w, h) * 0.36),
                       ROSE, intensity=0.35)
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    img = vignette(img, 0.5)
    return add_grain(img, 6)


MAKERS = {
    "homepage-hero-luxury-editorial": (make_hero, [(1920, 1080), (2560, 1440)]),
    "treatment-dermal-fillers": (make_dermal_fillers, [(620, 827), (900, 1200)]),
    "treatment-prp-visualization": (make_prp, [(620, 827), (900, 1200)]),
    "treatment-pdo-threads": (make_pdo_threads, [(620, 827), (900, 1200)]),
    "treatment-mono-threads": (make_mono_threads, [(620, 827), (900, 1200)]),
    "treatment-sculptra-plla": (make_sculptra, [(620, 827), (900, 1200)]),
    "treatment-biostimulators": (make_biostimulators, [(620, 827), (900, 1200)]),
    "treatment-breast-implants": (make_implants, [(620, 827), (900, 1200)]),
    "treatment-fat-transfer": (make_fat_transfer, [(620, 827), (900, 1200)]),
    "treatment-breast-lift": (make_breast_lift, [(620, 827), (900, 1200)]),
    "education-breast-anatomy": (make_anatomy, [(620, 827), (900, 1200)]),
}


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    count = 0
    for name, (maker, dims) in MAKERS.items():
        for w, h in dims:
            path = os.path.join(OUT_DIR, f"{name}-{w}.jpg")
            img = maker(w, h).convert("RGB")
            img.save(path, "JPEG", quality=88, optimize=True)
            size_kb = os.path.getsize(path) / 1024
            print(f"  {os.path.basename(path):50s} {w}x{h}  {size_kb:6.1f} KB")
            count += 1
    print(f"\nWrote {count} images to {os.path.normpath(OUT_DIR)}")


if __name__ == "__main__":
    main()
