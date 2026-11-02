"""Restore a collapsed declaration and append the city-panel component styles."""
from pathlib import Path

css = Path(__file__).resolve().parent / "public" / "assets" / "css" / "components.css"
text = css.read_text(encoding="utf-8")

broken = ".contact-intro {\n  display: grid;  gap: var(--sp-4);"
fixed = ".contact-intro {\n  display: grid;\n  gap: var(--sp-4);"
assert text.count(broken) == 1
text = text.replace(broken, fixed)

block = """
/* ========== Dubai and Bengaluru consultation panels ==========
   The supplied artwork already draws its own neon frame, title rule and
   pill-shaped button, so the published address and the enquiry control are
   positioned in percentages of that artwork and sized with container queries.
   The measurements below come from the artwork itself: the title rule sits at
   24% of the panel height, the pill between 81% and 91%, both starting at 7%
   from the left edge. */
.city-panels {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.25rem, 3vw, var(--sp-4));
  margin-top: var(--sp-5);
}
@media (min-width: 900px) {
  .city-panels { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.city-panel__frame {
  container-type: inline-size;
  position: relative;
  aspect-ratio: var(--city-panel-ratio);
}
.city-panel__art {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
}
.city-panel__head {
  position: absolute;
  left: 6.4%;
  top: 6%;
  width: 48%;
}
.city-panel__country {
  margin: 0 0 .25rem;
  color: var(--gold);
  font-size: clamp(.62rem, 1.75cqw, .8rem);
  letter-spacing: .28em;
  text-transform: uppercase;
}
.city-panel__city {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(1.35rem, 4.6cqw, 2.2rem);
  font-weight: var(--w-head-strong);
  letter-spacing: .05em;
  text-transform: uppercase;
  line-height: 1.05;
  color: var(--ivory);
}
.city-panel__body {
  position: absolute;
  left: 6.4%;
  top: 29%;
  width: 46%;
}
.city-panel__address {
  margin: 0 0 .4rem;
  color: var(--muted);
  font-size: clamp(.72rem, 1.95cqw, .96rem);
  line-height: 1.55;
}
.city-panel__phones {
  margin: 0;
  font-size: clamp(.7rem, 1.9cqw, .92rem);
  line-height: 1.5;
}
.city-panel__phones a { color: var(--gold-light); }
.city-panel__cta {
  position: absolute;
  left: 6.6%;
  top: 81%;
  display: grid;
  place-items: center;
  gap: .35em;
  width: 29%;
  height: 9.6%;
  padding: 0;
  color: var(--gold-light);
  font-size: clamp(.62rem, 1.8cqw, .78rem);
  letter-spacing: .16em;
  text-transform: uppercase;
}
.city-panel__cta svg { width: 1.55em; height: 1.55em; flex: none; }
.city-panel__cta:hover { color: var(--ivory); }
/* ========== end Dubai and Bengaluru consultation panels ========== */
"""

marker = "\n@media (min-width: 1024px) {\n  .nav__link {"
assert text.count(marker) == 1, "nav anchor not found"
text = text.replace(marker, block.lstrip("\n") + marker, 1)
css.write_text(text, encoding="utf-8", newline="\n")
print("components.css updated")
