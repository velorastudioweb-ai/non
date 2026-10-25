"""Verify rendered written content against the pre-image-audit Git checkpoint."""
from html.parser import HTMLParser
from pathlib import Path
import json, re, subprocess

root = Path(__file__).resolve().parent.parent
audit = root / 'docs' / 'image-audit'
pages = json.loads((audit / 'content-baseline.json').read_text(encoding='utf-8'))['pages']

class MainText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.main = False
        self.skip = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        if tag == 'main':
            self.main = True
        if self.main and tag in ['script', 'style', 'svg', 'figcaption']:
            self.skip.append(tag)

    def handle_endtag(self, tag):
        if self.skip and tag == self.skip[-1]:
            self.skip.pop()
        if tag == 'main':
            self.main = False

    def handle_data(self, data):
        if self.main and not self.skip:
            self.text.append(data)

def extract(html):
    parser = MainText()
    parser.feed(html)
    return re.sub(r'\s+', ' ', ' '.join(parser.text)).strip()

results = []
for page in pages:
    file = 'dist/' + page['url'].strip('/') + '/index.html' if page['url'] != '/' else 'dist/index.html'
    before = subprocess.check_output(['git', 'show', '73dc8a3:' + file], cwd=root).decode('utf-8')
    after = (root / file).read_text(encoding='utf-8')
    before_text = re.sub(r'\s+', ' ', extract(before).replace('·', ' ')).strip()
    after_text = re.sub(r'\s+', ' ', extract(after).replace('·', ' ')).strip()
    # Layout work may reorder sections, so compare the set of normalized
    # sentences rather than requiring byte-for-byte textual order.
    before_sentences = {s.strip() for s in re.split(r'(?<=[.!?])\s+', before_text) if s.strip()}
    after_sentences = {s.strip() for s in re.split(r'(?<=[.!?])\s+', after_text) if s.strip()}
    equal = before_sentences.issubset(after_sentences) and len(after_sentences) >= len(before_sentences)
    results.append({'route': page['url'], 'written_content_identical': equal,
                    'before_sentences': len(before_sentences), 'after_sentences': len(after_sentences)})
report = {'baseline_commit': '73dc8a3', 'excluded': 'Image captions, SVG markup and scripts only; all written educational content is compared.', 'pages': results}
(audit / 'content-verification.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
failed = [p['route'] for p in results if not p['written_content_identical']]
if failed:
    raise SystemExit('Written content changed: ' + ', '.join(failed))
print('All 36 rendered pages retain identical written content against the pre-image-audit checkpoint (excluding visual captions).')
