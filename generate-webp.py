from PIL import Image
import os

# Read the source PNG
png_path = r'public\Breast Education and Research Collage.png'
img = Image.open(png_path)
print(f'Original size: {img.size}, mode: {img.mode}')

# Define WebP output sizes (matching the existing pattern: 480, 768, 1024, 1280)
sizes = [480, 768, 1024, 1280]

base_dir = r'public\assets\responsive'
os.makedirs(base_dir, exist_ok=True)

# Generate WebP versions
for size in sizes:
    width = size
    height = int(img.height * (size / img.width))
    resized = img.resize((width, height), Image.LANCZOS)

    webp_path = os.path.join(base_dir, f'qh-education-research-banner-{size}.webp')
    resized.save(webp_path, 'WEBP')
    print(f'Generated: {webp_path} - {width}x{height}')

# Also generate the 1600 size for the largest source
width = 1600
height = int(img.height * (1600 / img.width))
resized = img.resize((width, height), Image.LANCZOS)
webp_path = os.path.join(base_dir, f'qh-education-research-banner-1600.webp')
resized.save(webp_path, 'WEBP')
print(f'Generated: {webp_path} - {width}x{height}')

# Generate SVG fallback
svg_width = 1600
svg_height = 1100
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

print('\nAll WebP and SVG files generated successfully!')
