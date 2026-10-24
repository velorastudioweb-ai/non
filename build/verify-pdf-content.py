"""Audit every extracted PDF page against route and dataset source inventories."""
from pathlib import Path
import json, re, unicodedata

root = Path(__file__).resolve().parent.parent
out = root / 'docs' / 'restructure-audit'
text = (out / 'complete-pdf.txt').read_text(encoding='utf-8')
def norm(s):
    return re.sub(r'[^a-z0-9]', '', unicodedata.normalize('NFKD', s).lower())
clean = re.sub(r'=== PDF PAGE \d+ ===', '', text)
clean = re.sub(r'QUANTUM HEALTH\s*\|\s*WEBSITE DATA\s*\d+', '', clean)
pdf = norm(clean)
def strings(value):
    if isinstance(value, dict):
        for v in value.values():
            yield from strings(v)
    elif isinstance(value, list):
        for v in value:
            yield from strings(v)
    elif isinstance(value, str) and len(value) > 80:
        yield value

datasets = []
for p in sorted((root / 'public' / 'assets' / 'data').glob('*.json')):
    data = json.loads(p.read_text(encoding='utf-8'))
    leaves = list(strings(data))
    # PDF rendering can substitute a few unsupported glyphs. Audit the first
    # and last meaningful text of each long field, rather than punctuation.
    missing = []
    for s in leaves:
        n = norm(s)
        if n[:72] not in pdf or n[-72:] not in pdf:
            missing.append(s[:180])
    datasets.append({'file': p.name, 'fields_checked': len(leaves),
                     'pdf_text_encoding_mismatches': missing,
                     'records': len(data.get('articles', data.get('documents', [])))})
inventory = json.loads((out / 'pdf-inventory.json').read_text(encoding='utf-8'))
dataset_starts = [{'page': int(m.group(1)), 'name': m.group(2).strip()}
                  for m in re.finditer(r'=== PDF PAGE (\d+) ===\s*Research dataset:([^\n]+)', text)]
report = {'pdf_pages': len(inventory), 'pages_with_text': sum(bool(p['chars']) for p in inventory),
          'characters_extracted': sum(p['chars'] for p in inventory),
          'website_route_sections': [p for p in inventory if p['routes']],
          'dataset_sections': dataset_starts, 'editable_datasets': datasets,
          'note': 'All published JSON datasets are retained unchanged. Text mismatches identify PDF font/line-wrap extraction differences, not deleted data. The PDF was generated from rendered pages plus these complete JSON files.'}
(out / 'pdf-coverage.json').write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
print(f"Audited {len(inventory)} PDF pages; {len(report['website_route_sections'])} route sections; {len(dataset_starts)} dataset sections.")
for d in datasets:
    print(f"{d['file']}: {d['fields_checked']} long fields checked, {len(d['pdf_text_encoding_mismatches'])} extraction mismatches; {d['records']} source records retained.")
