"""Re-encode the cropped brand mark small enough for the header and footer."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent
src = ROOT / "public" / "assets" / "img" / "quantum-health-logo-mark.png"
image = Image.open(src)
image = image.resize((320, 320), Image.LANCZOS)
out = ROOT / "public" / "assets" / "img" / "quantum-health-logo-mark.webp"
image.save(out, "WEBP", quality=92, method=6)
src.unlink()
print(out.name, out.stat().st_size // 1024, "KB")
