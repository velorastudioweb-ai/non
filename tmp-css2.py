"""Replace the Vikas banner and city-panel CSS with layouts that hold up at every width."""
from pathlib import Path

css = Path(__file__).resolve().parent / "public" / "assets" / "css" / "components.css"
text = css.read_text(encoding="utf-8")

# --- 1. Dr. Vikas Singh banner: drop the stretched-background overlay. -------
start = text.index("/* Dr. Vikas Singh page banner.")
end = text.index("/* Supplied Zee Business / Times Magazine coverage. */")
old = text[start:end]
new = """/* Dr. Vikas Singh page banner. The supplied artwork keeps its subject on the
   right third, so it is published at its own aspect ratio above the profile
   copy instead of being stretched behind it: stretching cropped the subject and
   blew the 1600px source up to nearly three times its width. */
body .qh .qh-vikas-hero--banner {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(1rem, 2.6vw, 1.6rem);
}
body .qh .qh-vikas-banner {
  order: -1;
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1600 / 753;
  object-fit: cover;
  border: var(--hairline) solid var(--border-soft);
  border-radius: var(--radius-md);
}
body .qh .qh-vikas-hero__copy { min-width: 0; }
"""
text = text.replace(old, new, 1)

# --- 2. City panels: card mode until the panel is wide enough for the overlay.
marker_start = text.index("/* ========== Dubai and Bengaluru consultation panels ==========")
marker_end = text.index("/* ========== end Dubai and Bengaluru consultation panels ========== */")
end = marker_end + len("/* ========== end Dubai and Bengaluru consultation panels ========== */")
new_panels = """/* ========== Dubai and Bengaluru consultation panels ==========
   The supplied artwork already draws its own neon frame, title rule and
   pill-shaped button. Geometry measured from the artwork: the title rule sits at
   24% of the panel height, the pill between 81% and 91%, both starting about 7%
   in from the left edge. Published address, telephone and enquiry control are
   therefore positioned in percentages of the artwork and sized with
   container-query units, so they stay on the baked-in furniture. Below 540px of
   panel width that furniture becomes too small to sit text on, so the panel
   falls back to a normal card and the artwork is just the artwork. */
.city-panels {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.25rem, 3vw, var(--sp-4));
  margin-top: var(--sp-5);
}
@media (min-width: 900px) {
  .city-panels { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
.city-panel { container-type: inline-size; min-width: 0; }
.city-panel__frame { position: relative; min-width: 0; }
.city-panel__art {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}
.city-panel__head { margin-bottom: .8rem; }
.city-panel__country {
  margin: 0 0 .25rem;
  color: var(--gold);
  font-size: var(--fs-micro);
  letter-spacing: .26em;
  text-transform: uppercase;
}
.city-panel__city {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(1.45rem, 5vw, 2.1rem);
  font-weight: var(--w-head-strong);
  letter-spacing: .05em;
  text-transform: uppercase;
  line-height: 1.05;
  color: var(--ivory);
}
.city-panel__address {
  margin: 0 0 .4rem;
  color: var(--muted);
  font-size: var(--fs-body);
  line-height: 1.55;
}
.city-panel__phones { margin: 0; font-size: var(--fs-body); }
.city-panel__phones a { color: var(--gold-light); }
.city-panel__cta {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  margin-top: .9rem;
  padding: .5rem 1.15rem;
  border: var(--hairline) solid var(--border);
  border-radius: var(--radius-pill);
  color: var(--gold-light);
  font-size: var(--fs-micro);
  letter-spacing: .14em;
  text-transform: uppercase;
}
.city-panel__cta svg { width: 16px; height: 16px; flex: none; }
.city-panel__cta:hover { border-color: var(--gold); color: var(--ivory); }
@container (min-width: 540px) {
  .city-panel__frame { aspect-ratio: var(--city-panel-ratio); }
  .city-panel__art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .city-panel__head {
    position: absolute;
    left: 6.4%;
    top: 6%;
    width: 44%;
    margin: 0;
  }
  .city-panel__country { font-size: clamp(.62rem, 1.75cqw, .82rem); letter-spacing: .3em; }
  .city-panel__city { font-size: clamp(1.35rem, 4.6cqw, 2.2rem); }
  .city-panel__body {
    position: absolute;
    left: 6.4%;
    top: 29.5%;
    width: 42%;
  }
  .city-panel__address { font-size: clamp(.72rem, 1.95cqw, .96rem); line-height: 1.5; }
  .city-panel__phones { font-size: clamp(.7rem, 1.9cqw, .92rem); line-height: 1.45; }
  .city-panel__cta {
    position: absolute;
    left: 6.6%;
    top: 81%;
    display: grid;
    place-items: center;
    gap: .35em;
    width: 29%;
    height: 9.6%;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: clamp(.62rem, 1.8cqw, .78rem);
    letter-spacing: .16em;
  }
  .city-panel__cta svg { width: 1.55em; height: 1.55em; }
}
/* ========== end Dubai and Bengaluru consultation panels ========== */"""
text = text[:marker_start] + new_panels + text[end:]

css.write_text(text, encoding="utf-8", newline="\n")
print("CSS rewritten")
print("stale overlay rules removed:", "qh-vikas-hero--banner::after" not in text and "max-width: 899px" not in text)
