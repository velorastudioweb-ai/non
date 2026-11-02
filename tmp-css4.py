"""Rewrite the city-panel CSS so the enquiry control always sits on the artwork's pill."""
from pathlib import Path

css = Path(__file__).resolve().parent / "public" / "assets" / "css" / "components.css"
text = css.read_text(encoding="utf-8")

start = text.index("/* ========== Dubai and Bengaluru consultation panels ==========")
end = text.index("/* ========== end Dubai and Bengaluru consultation panels ========== */") + len("/* ========== end Dubai and Bengaluru consultation panels ========== */")

new = """/* ========== Dubai and Bengaluru consultation panels ==========
   The supplied artwork already draws its own neon frame, title rule and
   pill-shaped button, so the enquiry control is placed in percentages of the
   artwork in both layouts and sized with container-query units. Geometry
   measured from the artwork: title rule at 24% of the panel height, pill
   between 80% and 90%, both starting about 6.5% in from the left edge. Wide
   screens also overlay the published address on the dark sky at the top left;
   narrow screens keep the artwork at its own aspect ratio and read the text
   below it, because the overlay text would otherwise run into the skyline. */
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
.city-panel__frame { min-width: 0; }
.city-panel__media { position: relative; }
.city-panel__art {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}
.city-panel__cta {
  position: absolute;
  left: 6.6%;
  top: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28.6%;
  height: 10.4%;
  color: var(--gold-light);
  font-size: clamp(.62rem, 1.8cqw, .78rem);
  letter-spacing: .16em;
  text-transform: uppercase;
  white-space: nowrap;
}
/* The pill in the artwork is shorter than a comfortable tap target, so the
   hit area extends beyond the visible label. */
.city-panel__cta::before {
  content: "";
  position: absolute;
  left: -12%;
  top: -85%;
  width: 124%;
  height: 270%;
}
.city-panel__cta span { display: inline-block; }
.city-panel__cta svg { display: none; width: 1.55em; height: 1.55em; flex: none; margin-left: .45em; }
.city-panel__cta:hover { color: var(--ivory); }
.city-panel__head { margin-top: 1rem; }
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
  margin: .5rem 0 .35rem;
  color: var(--muted);
  font-size: var(--fs-body);
  line-height: 1.55;
}
.city-panel__phones { margin: 0; font-size: var(--fs-body); }
.city-panel__phones a { color: var(--gold-light); }
@container (min-width: 540px) {
  .city-panel__frame {
    position: relative;
    aspect-ratio: var(--city-panel-ratio);
  }
  .city-panel__media {
    position: absolute;
    inset: 0;
  }
  .city-panel__art {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .city-panel__cta svg { display: block; }
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
  .city-panel__address { margin-top: 0; font-size: clamp(.72rem, 1.95cqw, .96rem); line-height: 1.5; }
  .city-panel__phones { font-size: clamp(.7rem, 1.9cqw, .92rem); line-height: 1.45; }
}
/* ========== end Dubai and Bengaluru consultation panels ========== */"""

text = text[:start] + new + text[end:]
css.write_text(text, encoding="utf-8", newline="\n")
print("city-panel CSS rewritten")
