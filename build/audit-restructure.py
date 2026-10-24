"""Extract the complete source PDF and preserve pre-restructure source files."""
from pathlib import Path
import fitz, json, re, zipfile

root = Path(__file__).resolve().parent.parent
out = root / 'docs' / 'restructure-audit'
out.mkdir(parents=True, exist_ok=True)
if not (out / 'before.zip').exists():
    with zipfile.ZipFile(out / 'before.zip', 'x', zipfile.ZIP_DEFLATED) as backup:
        for folder in ['build', 'content']:
            for p in (root / folder).rglob('*'):
                if p.is_file() and '_qa-snapshot' not in p.parts:
                    backup.write(p, p.relative_to(root))
        for name in ['vercel.json', 'index.html', 'styles.css']:
            if (root / name).exists():
                backup.write(root / name, name)
doc = fitz.open(root / 'data.pdf')
parts, inventory = [], []
for i, page in enumerate(doc):
    text = page.get_text().replace('\ufb01', 'fi').replace('\ufb02', 'fl')
    parts.append(f'\n=== PDF PAGE {i+1} ===\n{text}')
    inventory.append({'page': i+1, 'chars': len(text), 'routes': re.findall(r'Page:\s*(/\S*)', text), 'heading': text[:180]})
(out / 'complete-pdf.txt').write_text(''.join(parts), encoding='utf-8')
(out / 'pdf-inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'pages':len(doc), 'characters':sum(p['chars'] for p in inventory), 'empty_pages':[p['page'] for p in inventory if not p['chars']], 'route_sections':[{'page':p['page'],'routes':p['routes']} for p in inventory if p['routes']]}, indent=2))
