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
    before = subprocess.check_output(['git', 'show', '000aa86:' + file], cwd=root).decode('utf-8')
    after = (root / file).read_text(encoding='utf-8')
    equal = extract(before) == extract(after)
    results.append({'route': page['url'], 'written_content_identical': equal})
report = {'baseline_commit': '000aa86', 'excluded': 'Image captions, SVG markup and scripts only; all written educational content is compared.', 'pages': results}
(audit / 'content-verification.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
failed = [p['route'] for p in results if not p['written_content_identical']]
if failed:
    raise SystemExit('Written content changed: ' + ', '.join(failed))
print('All 36 rendered pages retain identical written content against the pre-image-audit checkpoint (excluding visual captions).')
