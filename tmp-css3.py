"""Remove the now-dead <=899px banner override block."""
from pathlib import Path

css = Path(__file__).resolve().parent / "public" / "assets" / "css" / "components.css"
text = css.read_text(encoding="utf-8")
start = text.index("@media (max-width: 899px) {")
depth = 0
i = start
while True:
    ch = text[i]
    if ch == "{":
        depth += 1
    elif ch == "}":
        depth -= 1
        if depth == 0:
            break
    i += 1
block = text[start:i + 1]
assert "qh-vikas-hero--banner" in block and "qh-video" not in block, block[:120]
text = text[:start] + text[i + 1:].lstrip("\n")
css.write_text(text, encoding="utf-8", newline="\n")
print("removed block of", len(block.splitlines()), "lines")
