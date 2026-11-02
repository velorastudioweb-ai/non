"""Map the baked-in pill and rule geometry of the city panels as ASCII."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "assets-src" / "supplied-2026-11-02" / "Hong Kong and Bengaluru Nightscapes.png"
im = Image.open(SRC).convert("L")
w, h = im.size
px = im.load()
print(f"art {w}x{h}; half={w // 2}")

COLS = 110
ROWS = 48


def row_char(y0, y1, x0, x1):
    out = []
    for gy in range(ROWS):
        line = ""
        for gx in range(COLS):
            xa = x0 + (x1 - x0) * gx // COLS
            xb = x0 + (x1 - x0) * (gx + 1) // COLS
            ya = y0 + (y1 - y0) * gy // ROWS
            yb = y0 + (y1 - y0) * (gy + 1) // ROWS
            peak = 0
            for y in range(ya, max(ya + 1, yb), 2):
                for x in range(xa, max(xa + 1, xb), 2):
                    v = px[x, y]
                    if v > peak:
                        peak = v
            line += "#" if peak > 200 else ("+" if peak > 140 else ".")
        frac = (gy + 0.5) / ROWS
        out.append(f"{frac:5.2f} {line}")
    return "\n".join(out)


half = w // 2
print("\n--- LEFT PANEL (x 0..%d) ---" % half)
print(row_char(0, h, 0, half))
print("\n--- RIGHT PANEL (x %d..%d) ---" % (half, w))
print(row_char(0, h, half, w))
print("\ncolumn scale: each char = %.1f%% of panel width" % (100.0 / COLS))
