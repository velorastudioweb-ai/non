"""Build immutable, uncropped WebP variants for every root raster asset.

The original files in ``public/`` are never altered.  The Node build consumes
the checked-in manifest, so production builds do not require Pillow.  Run this
script after adding or replacing a root PNG/JPEG/WebP image; the content hash
in every generated URL makes the immutable cache policy safe.

Pillow in this project supports WebP but not AVIF, so WebP is the portable
derivative format used here.  Images are resized only (never cropped or
upscaled), and byte-identical source files share one derivative set.
"""

from __future__ import annotations

import hashlib
import json
import re
import shutil
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
DEST = PUBLIC / "assets" / "responsive"
MANIFEST = ROOT / "build" / "image-manifest.json"
RASTER_SUFFIXES = {".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"}
# Candidates intentionally cover the supported device matrix without creating
# an unnecessary variant for every possible CSS pixel width.  The source-width
# derivative is always added as the immutable fallback / largest candidate.
WIDTHS = (320, 480, 640, 768, 1024, 1280, 1536, 1920)
WEBP_QUALITY = 85


def source_url(path: Path) -> str:
    return "/" + path.name


def slug_for(path: Path) -> str:
    return re.sub(r"[^a-z0-9]+", "-", path.stem.lower()).strip("-")


def output_sizes(width: int) -> list[int]:
    """Return sorted source-or-smaller widths, including the exact original."""
    return sorted({candidate for candidate in WIDTHS if candidate < width} | {width})


def output_name(slug: str, digest: str, width: int) -> str:
    return f"{slug}-{digest[:12]}-{width}.webp"


def save_variant(image: Image.Image, width: int, height: int, destination: Path) -> None:
    # ``ImageOps.exif_transpose`` below normalizes the rendered orientation.
    # Preserve alpha where present; Pillow handles RGB/RGBA WebP encoding.
    resized = image if image.size == (width, height) else image.resize((width, height), Image.Resampling.LANCZOS)
    resized.save(destination, "WEBP", quality=WEBP_QUALITY, method=6)


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)
    sources = sorted(
        path for path in PUBLIC.iterdir()
        if path.is_file() and path.suffix.lower() in RASTER_SUFFIXES
    )
    manifest: dict[str, dict] = {}
    # digest -> canonical render metadata.  The first alphabetical filename
    # becomes the stable derivative stem for exact duplicate source files.
    rendered: dict[str, dict] = {}

    for source in sources:
        digest = hashlib.sha256(source.read_bytes()).hexdigest()
        key = source_url(source)

        if digest not in rendered:
            with Image.open(source) as opened:
                native_size = opened.size
                image = ImageOps.exif_transpose(opened)
                # Load before the source file closes, then process all variants
                # from the same normalized image to keep results deterministic.
                image.load()
                width, height = image.size
                slug = slug_for(source)
                variants = []
                for candidate_width in output_sizes(width):
                    candidate_height = round(height * candidate_width / width)
                    filename = output_name(slug, digest, candidate_width)
                    destination = DEST / filename
                    # Root WebPs are already approved, compact source files.
                    # For their intrinsic-size candidate, copying the bytes
                    # preserves their exact quality while still moving delivery
                    # to a hash-named immutable URL.  Other formats (and WebP
                    # images whose EXIF orientation needs normalization) are
                    # encoded as WebP below.
                    if (
                        candidate_width == width
                        and source.suffix.lower() == ".webp"
                        and native_size == image.size
                    ):
                        shutil.copyfile(source, destination)
                    else:
                        save_variant(image, candidate_width, candidate_height, destination)
                    variants.append({
                        "src": "/assets/responsive/" + filename,
                        "width": candidate_width,
                        "height": candidate_height,
                        "bytes": destination.stat().st_size,
                    })
            rendered[digest] = {
                "canonicalSource": key,
                "width": width,
                "height": height,
                "variants": variants,
            }

        shared = rendered[digest]
        # ``variants`` are immutable derivative URLs, not the mutable root
        # original.  ``src`` is the largest derivative used as the <img>
        # fallback for clients without srcset support.
        manifest[key] = {
            "width": shared["width"],
            "height": shared["height"],
            "sha256": digest,
            "bytes": source.stat().st_size,
            "format": "webp",
            "src": shared["variants"][-1]["src"],
            "variants": shared["variants"],
        }
        if key != shared["canonicalSource"]:
            manifest[key]["canonicalSource"] = shared["canonicalSource"]

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    duplicate_count = len(sources) - len(rendered)
    variant_count = sum(len(item["variants"]) for item in rendered.values())
    print(
        f"Prepared {variant_count} immutable WebP variants for {len(sources)} root raster sources "
        f"({duplicate_count} duplicate source file(s) reuse an existing derivative set)."
    )


if __name__ == "__main__":
    main()
