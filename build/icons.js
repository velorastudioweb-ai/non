'use strict';

/* Elegant line-icon set — stroke uses currentColor so icons inherit gold tone.
   viewBox 0 0 24 24, 1.4 stroke weight for a refined editorial feel. */

const wrap = (paths, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ${extra}>${paths}</svg>`;

const icons = {
  lotus: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" class="brand__mark">
      <g stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M24 9c3.4 4.6 5 8.7 5 12.4 0 3.9-1.7 7-5 9.6-3.3-2.6-5-5.7-5-9.6C19 17.7 20.6 13.6 24 9Z"/>
        <path d="M10 18c5 .4 8.7 2 11 4.8 2.4 2.9 3.4 6.4 3 10.2-4.5.4-8-1-10.7-4C10.9 26 9.8 22.3 10 18Z"/>
        <path d="M38 18c.2 4.3-.9 8-3.3 11-2.7 3-6.2 4.4-10.7 4-.4-3.8.6-7.3 3-10.2C29.3 20 33 18.4 38 18Z"/>
        <path d="M24 4.5v3M24 39v4.5"/>
      </g>
    </svg>`,

  volume: wrap(`<path d="M12 3.5c3 4 4.6 7 4.6 9.6 0 2.9-1.8 5-4.6 6.9-2.8-1.9-4.6-4-4.6-6.9 0-2.6 1.6-5.6 4.6-9.6Z"/><path d="M4.8 8.8c2.6 2.2 4.2 4.2 4.8 6.1M19.2 8.8c-2.6 2.2-4.2 4.2-4.8 6.1"/>`),
  shape: wrap(`<path d="M12 3c4 2.4 6 5.4 6 8.8 0 3.9-2.7 7.1-6 9.2-3.3-2.1-6-5.3-6-9.2C6 8.4 8 5.4 12 3Z"/><path d="M12 3v18M6.6 9.6c3 .5 5.1 1.7 6.5 3.8 1.4-2.1 3.5-3.3 6.5-3.8"/>`),
  natural: wrap(`<path d="M20 5c-7 0-12 4-12 9 0 1 .2 2 .5 2.9C11 15.6 15 13 20 12c-2 1-4.6 3.2-6.4 5.2M6 20c1.5-4 4-7 7-9"/>`),
  downtime: wrap(`<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 1.8"/><path d="M12 2.5v1.6M12 19.9v1.6M2.5 12h1.6M19.9 12h1.6"/>`),
  confidence: wrap(`<path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z"/>`),
  nonsurgical: wrap(`<path d="M12 3c3 4 4.6 7 4.6 9.6 0 2.9-1.8 5-4.6 6.9-2.8-1.9-4.6-4-4.6-6.9C7.4 10 9 7 12 3Z"/><path d="M12 19.5v1.8"/>`),
  surgical: wrap(`<path d="M14.5 4.5 19.5 9.5 9 20H4v-5L14.5 4.5Z"/><path d="m13 6 5 5M4 20l3.2-3.2"/>`),
  personalised: wrap(`<circle cx="12" cy="8.5" r="3.4"/><path d="M5.5 20c.7-3.4 3.4-5.2 6.5-5.2s5.8 1.8 6.5 5.2"/>`),
  evidence: wrap(`<path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20V4a.5.5 0 0 1 .5-.5Z"/><path d="M14 3.5V8h4M9.5 12h5M9.5 15.5h5"/>`),
  safety: wrap(`<path d="M12 3 5.5 5.6v5.2c0 4 2.7 7.4 6.5 8.7 3.8-1.3 6.5-4.7 6.5-8.7V5.6L12 3Z"/><path d="m9.3 11.8 1.9 1.9 3.5-3.6"/>`),
  discretion: wrap(`<rect x="5" y="10.5" width="14" height="9.5" rx="1.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14v2.5"/>`),
  clock: wrap(`<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 1.8"/>`),
  arrow: wrap(`<path d="M5 12h14M13 6l6 6-6 6"/>`),
  check: wrap(`<path d="m5 12.5 4.5 4.5L19 7"/>`),
  info: wrap(`<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6h.01"/>`),
  close: wrap(`<path d="M6 6l12 12M18 6 6 18"/>`),
  chevron: wrap(`<path d="m9 6 6 6-6 6"/>`),
  phone: wrap(`<path d="M6.5 3.5h3l1.4 3.5-1.8 1.4a11 11 0 0 0 5.5 5.5l1.4-1.8 3.5 1.4v3c0 .8-.7 1.5-1.5 1.5C11.4 18 6 12.6 5 5c0-.8.7-1.5 1.5-1.5Z"/>`),
  mail: wrap(`<rect x="3.5" y="6" width="17" height="12" rx="1.5"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>`),
  pin: wrap(`<path d="M12 21c4-4.4 6-7.7 6-10.4A6 6 0 0 0 6 10.6C6 13.3 8 16.6 12 21Z"/><circle cx="12" cy="10.4" r="2.3"/>`),
  calendar: wrap(`<rect x="4" y="5.5" width="16" height="15" rx="1.6"/><path d="M4 9.5h16M8.5 3.5v3.5M15.5 3.5v3.5"/>`),
  play: wrap(`<circle cx="12" cy="12" r="8.5"/><path d="m10 8.5 5.5 3.5-5.5 3.5v-7Z"/>`),
  quote: wrap(`<path d="M9 6c-3 1.5-4.5 4-4.5 7.5V18h5v-5H6.6c0-2.4.9-4.2 2.9-5.4L9 6ZM19 6c-3 1.5-4.5 4-4.5 7.5V18h5v-5h-2.9c0-2.4.9-4.2 2.9-5.4L19 6Z"/>`),
  scale: wrap(`<path d="M12 4v16M7 20h10M6 8h12M6 8l-2.5 5.5a3 3 0 0 0 5 0L6 8ZM18 8l-2.5 5.5a3 3 0 0 0 5 0L18 8Z"/>`),
  sparkle: wrap(`<path d="M12 3.5c.6 3.7 2.3 5.4 6 6-3.7.6-5.4 2.3-6 6-.6-3.7-2.3-5.4-6-6 3.7-.6 5.4-2.3 6-6Z"/><path d="M18.5 15.5c.3 1.6 1 2.3 2.5 2.6-1.5.3-2.2 1-2.5 2.6-.3-1.6-1-2.3-2.5-2.6 1.5-.3 2.2-1 2.5-2.6Z"/>`),
};

/* Decorative SVG: fine gold female-outline figure (hero lower-right accent). */
const figure = `<svg viewBox="0 0 220 420" fill="none" aria-hidden="true" focusable="false" class="figure-line">
  <g stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="110" cy="52" r="30"/>
    <path d="M110 82c-10 0-18 3-18 3-14 4-24 14-26 30l-6 58c-.4 4 3 6 6 3l12-30-4 62"/>
    <path d="M110 82c10 0 18 3 18 3 14 4 24 14 26 30l6 58c.4 4-3 6-6 3l-12-30 4 62"/>
    <path d="M76 108c-8 14-12 30-12 48"/>
    <path d="M144 108c8 14 12 30 12 48"/>
    <path d="M84 208c-4 26-8 52-14 76-4 18-10 34-16 48"/>
    <path d="M136 208c4 26 8 52 14 76 4 18 10 34 16 48"/>
    <path d="M92 232c8 6 28 6 36 0"/>
    <path d="M110 300c-2 20-2 40 0 60"/>
  </g>
</svg>`;

const flourish = `<svg viewBox="0 0 200 40" fill="none" aria-hidden="true" focusable="false">
  <path d="M2 30C40 6 90 6 100 20s60 14 98-10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
  <path d="M100 20c-6-8-16-12-26-10M100 20c6-8 16-12 26-10" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
</svg>`;

const divider = `<svg viewBox="0 0 240 16" fill="none" aria-hidden="true" focusable="false">
  <path d="M4 8h84M152 8h84" stroke="currentColor" stroke-width="1"/>
  <path d="M120 2.5c2.4 2 3.6 3.8 3.6 5.5 0 1.7-1.2 3.5-3.6 5.5-2.4-2-3.6-3.8-3.6-5.5 0-1.7 1.2-3.5 3.6-5.5Z" stroke="currentColor" stroke-width="1"/>
</svg>`;

module.exports = { icons, figure, flourish, divider };
