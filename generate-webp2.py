from PIL import Image
import os

# Read the source PNG
png_path = r'public\Breast Education and Research Collage.png'
img = Image.open(png_path)
print(f'Original size: {img.size}, mode: {img.mode}')

# The picture function with variant 'banner' expects these sizes: [640, 960, 1600]
# And generates srcset: qh-education-research-banner-640.webp 640w, qh-education-research-banner-960.webp 960w, qh-education-research-banner-1600.webp 1600w
# The largest is 1600x640, and the <img> has width=1600 height=640

# Required sizes for banner variant
sizes = [640, 960, 1600]

base_dir = r'public\assets\responsive'
os.makedirs(base_dir, exist_ok=True)

# Remove old qh-education-research-banner files if needed (but keep other files)
# Actually, let's just generate the required ones

# Generate WebP versions for banner sizes
for size in sizes:
    width = size
    # Calculate height maintaining aspect ratio, but target is 640:256, 960:384, 1600:640
    # Ratio: width/height = 640/256 = 2.5, 960/384 = 2.5, 1600/640 = 2.5
    # So height = width / 2.5
    height = width / 2.5
    # Round to integer
    height = int(height)

    resized = img.resize((width, height), Image.LANCZOS)

    webp_path = os.path.join(base_dir, f'qh-education-research-banner-{size}.webp')
    resized.save(webp_path, 'WEBP')
    print(f'Generated: {webp_path} - {width}x{height}')

# Also generate the SVG fallback with the correct dimensions (1600x640)
svg_width = 1600
svg_height = 640
svg_content = f'''<svg width="{svg_width}" height="{svg_height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="{svg_width}" height="{svg_height}" fill="var(--light)" />
  <text x="{svg_width/2}" y="{svg_height/2}" fill="var(--accent-ink)" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">
    Breast Education & Research
  </text>
</svg>'''

svg_path = os.path.join(base_dir, 'qh-education-research-banner-1600.svg')
with open(svg_path, 'w') as f:
    f.write(svg_content)
print(f'Generated: {svg_path}')

print('\\nAll WebP and SVG files generated successfully for banner variant!')
