"""Repair build/templates.js: drop the duplicated city-panel renderer and restore the preferredCountries option list."""
from pathlib import Path

path = Path(__file__).resolve().parent / "build" / "templates.js"
lines = path.read_text(encoding="utf-8").split("\n")

# 1-based 545..582 -> the first (duplicate) renderer plus its trailing blank line.
start, end = 545, 582
block = "\n".join(lines[start - 1:end])
assert "renderCityPanels" in block and block.rstrip().endswith("}"), block[:200]
assert block.count("function renderCityPanels") == 1
del lines[start - 1:end]

text = "\n".join(lines)
topics = "  const topics = (b.topics || appointmentTopics).map((o) => `<option value=\"${esc(o)}\">${esc(o)}</option>`).join('\\n          ');"
assert text.count(topics) == 1, "topics line not found exactly once"
countries = "  const countries = preferredCountries.map((o) => `<option value=\"${esc(o)}\">${esc(o)}</option>`).join('\\n          ');"
assert "const countries" not in text
text = text.replace(topics, topics + "\n" + countries, 1)
path.write_text(text, encoding="utf-8", newline="\n")

check = "\n".join(lines)
print("renderCityPanels definitions:", check.count("function renderCityPanels"))
print("countries restored:", "const countries" in text, "| uses:", text.count("${countries}"))
