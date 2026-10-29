'use strict';
// Original authored SVG illustrations. This is a deterministic vector-art
// generator, not a photorealistic AI model and not a clinical image generator.
const fs = require('fs');
const path = require('path');
const { routes, forItem, showCardImages, inlineFor } = require('./visual-plan');
const { allPages } = require('./structure');
const out = path.join(__dirname, '..', 'public', 'assets', 'img');
const line = (d, stroke = '#D6B77A', width = 5) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const circle = (x, y, r, fill = 'url(#pearl)', stroke = '#D6B77A') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
const sheet = (x = 260, y = 120, w = 460, h = 480, rotate = -7) => `<g transform="rotate(${rotate} ${x + w / 2} ${y + h / 2})"><rect x="${x + 12}" y="${y + 16}" width="${w}" height="${h}" rx="24" fill="#160713" opacity=".2"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="url(#paper)" stroke="#D6B77A" stroke-width="3"/><path d="M${x + 50} ${y + 60}h${w - 100}M${x + 50} ${y + h - 85}h${w - 160}" stroke="#651B36" stroke-opacity=".28" stroke-width="4" stroke-linecap="round"/></g>`;
const lens = (x = 630, y = 345, r = 135) => `<g>${circle(x, y, r, '#651B36')}${circle(x, y, r - 15, 'url(#glass)', '#F4E6D6')}${line(`M${x + r * .7} ${y + r * .7}l120 120`, '#D6B77A', 25)}${line(`M${x + r * .7} ${y + r * .7}l120 120`, '#F4E6D6', 7)}${line(`M${x - r * .55} ${y - r * .1}q15 -60 75 -70`, '#FFF3E5', 6)}</g>`;
const shield = (x = 640, y = 300, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M0 -120L105 -80V10Q105 108 0 165Q-105 108 -105 10V-80Z" fill="url(#wine)" stroke="#D6B77A" stroke-width="6"/>${line('M0 -60V35M0 78V85', '#F6EBDD', 10)}</g>`;
const implant = (x = 450, y = 330, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cx="0" cy="0" rx="190" ry="135" fill="url(#pearl)" stroke="#D6B77A" stroke-width="5"/><ellipse cx="0" cy="-5" rx="169" ry="113" fill="url(#gel)" stroke="#F4E6D6" stroke-width="3"/>${line('M-115 -42Q-40 -105 70 -60', '#FFF8F0', 8)}${line('M-120 70Q0 118 132 48', '#A96A70', 3)}</g>`;
const cells = (x = 500, y = 330, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">${[[-120, -70, 75], [30, -105, 86], [135, 20, 88], [-30, 80, 90], [-160, 95, 64]].map(([a, b, r]) => circle(a, b, r, 'url(#fat)') + circle(a + r * .35, b - r * .15, 9, '#651B36')).join('')}</g>`;
const book = (x = 480, y = 330, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M0 -110Q-120 -180 -235 -125V175Q-110 125 0 190Q110 125 235 175V-125Q120 -180 0 -110Z" fill="url(#paper)" stroke="#D6B77A" stroke-width="5"/>${line('M0 -95V170', '#651B36', 4)}${[-60, -5, 50, 105].map((yy) => line(`M-185 ${yy}Q-110 ${yy - 24} -45 ${yy + 5}M45 ${yy + 5}Q110 ${yy - 24} 185 ${yy}`, '#B88D83', 3)).join('')}</g>`;
const pencil = `<g transform="translate(745 430) rotate(32)"><rect x="-14" y="-160" width="28" height="240" rx="8" fill="#D6B77A"/>${line('M0 -145V65', '#F6EBDD', 3)}<path d="M-14 80L0 122L14 80Z" fill="#EDD0B6"/>${line('M0 111V123', '#3B1525', 5)}</g>`;
const tube = `<g transform="translate(475 325) rotate(16)"><rect x="-66" y="-205" width="132" height="65" rx="12" fill="url(#wine)" stroke="#D6B77A" stroke-width="4"/><path d="M-54 -140H54V145Q54 215 0 215Q-54 215 -54 145Z" fill="url(#glass)" stroke="#F6EBDD" stroke-width="5"/><path d="M-43 28H43V140Q43 202 0 202Q-43 202 -43 140Z" fill="#7C203A"/><path d="M-43 -65H43V25H-43Z" fill="#D6B77A" opacity=".85"/>${line('M-27 -112V-78', '#FFF8F0', 8)}</g>`;
function subject(kind, seed) {
  switch (kind) {
    case 'learning': return book(500, 385, 1.05) + [0, 1, 2].map((i) => `<path d="M${320 + i * 145} 150V310L${355 + i * 145} 280L${390 + i * 145} 310V150Z" fill="${['#D6B77A', '#651B36', '#EBC4B9'][i]}" stroke="#D6B77A" stroke-width="3"/>`).join('');
    case 'claims': return [-1, 0, 1].map((i) => `<g transform="rotate(${i * 12} 500 350)"><rect x="${300 + i * 115}" y="${160 + Math.abs(i) * 65}" width="300" height="360" rx="22" fill="${['#D6B77A', '#EDD6C6', '#8C3856'][i + 1]}" stroke="#D6B77A" stroke-width="4"/></g>`).join('') + lens(700, 380, 125);
    case 'material': return `<ellipse cx="455" cy="370" rx="255" ry="145" fill="url(#glass)" stroke="#D6B77A" stroke-width="5"/><path d="M200 370V425Q455 640 710 425V370" fill="url(#gel)" stroke="#D6B77A" stroke-width="4"/>${circle(335, 350, 60, 'url(#pearl)')}${circle(485, 335, 45, 'url(#gel)')}${circle(570, 425, 28, 'url(#pearl)')}` + lens(730, 230, 98) + shield(260, 520, .35);
    case 'scars': return `<g>${[280, 510, 740].map((x, i) => `<ellipse cx="${x}" cy="330" rx="100" ry="150" fill="url(#pearl)" stroke="#D6B77A" stroke-width="3"/><circle cx="${x}" cy="295" r="37" fill="none" stroke="#651B36" stroke-width="5" stroke-dasharray="8 7"/>${i > 0 ? line(`M${x} 335V428`, '#651B36', 5) : ''}${i > 1 ? line(`M${x - 70} 435Q${x} 470 ${x + 70} 435`, '#651B36', 5) : ''}`).join('')}</g>`;
    case 'incisionPlans': {
      const mini = (x, y, type) => `<g>
        <ellipse cx="${x}" cy="${y}" rx="58" ry="88" fill="url(#pearl)" stroke="#D6B77A" stroke-width="3"/>
        <circle cx="${x}" cy="${y - 26}" r="17" fill="none" stroke="#651B36" stroke-width="4" stroke-dasharray="5 4"/>
        ${type > 0 ? line(`M${x} ${y - 9}V${y + 42}`, '#651B36', 4) : ''}
        ${type > 1 ? line(`M${x - 34} ${y + 48}Q${x} ${y + 74} ${x + 34} ${y + 48}`, '#651B36', 4) : ''}
      </g>`;
      return `<g>
        <path d="M150 585H850" stroke="#D6B77A" stroke-opacity=".3" stroke-width="3" stroke-dasharray="12 14"/>
        <ellipse cx="345" cy="330" rx="170" ry="225" fill="url(#pearl)" stroke="#D6B77A" stroke-width="5"/>
        <path d="M345 555Q475 520 505 380Q530 260 470 118Q405 80 345 88Z" fill="url(#wine)" opacity=".28"/>
        <circle cx="360" cy="325" r="60" fill="none" stroke="#651B36" stroke-width="7" stroke-dasharray="11 9"/>
        <path d="M360 385V515" stroke="#651B36" stroke-width="7" stroke-linecap="round"/>
        <path d="M220 520Q360 585 500 520" fill="none" stroke="#651B36" stroke-width="7" stroke-linecap="round"/>
        ${line('M165 230V440', '#D6B77A', 3)}
        ${[250, 320, 390].map((y) => line(`M145 ${y}H195`, '#D6B77A', 4)).join('')}
        ${mini(745, 170, 0)}
        ${mini(745, 365, 1)}
        ${mini(745, 560, 2)}
      </g>`;
    }
    case 'recovery': {
      const cell = (x, y, done) => done
        ? `<circle cx="${x}" cy="${y}" r="11" fill="#651B36" stroke="#D6B77A" stroke-width="2.5"/><path d="M${x - 5} ${y}l4 4 7-9" fill="none" stroke="#F6EBDD" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
        : circle(x, y, 8, 'url(#pearl)');
      const cells = [];
      [285, 335, 385, 435].forEach((y, r) => [230, 285, 340, 395, 450].forEach((x, c) => cells.push(cell(x, y, (r + c) % 5 === 2))));
      return `<g>
        <g transform="rotate(-5 330 330)">
          <rect x="190" y="164" width="310" height="370" rx="20" fill="#160713" opacity=".2"/>
          <rect x="180" y="150" width="310" height="370" rx="20" fill="url(#paper)" stroke="#D6B77A" stroke-width="3"/>
          <path d="M180 235H490" stroke="#651B36" stroke-opacity=".26" stroke-width="5"/>
          <path d="M245 118V168M430 118V168" stroke="#D6B77A" stroke-width="11" stroke-linecap="round"/>
          ${cells.join('')}
        </g>
        <g transform="translate(575 80) scale(.62)">
          <path d="M300 155L390 125Q445 200 500 125L590 155L670 295L600 340L575 280V560Q445 595 315 560V280L290 340L220 295Z" fill="url(#pearl)" stroke="#D6B77A" stroke-width="5"/>
          <path d="M445 205V565M320 390H570" stroke="#A96A80" stroke-width="4"/>
          ${[260, 320, 380, 440, 500].map((y) => circle(445, y, 5, '#651B36')).join('')}
        </g>
        <path d="M600 610H860" stroke="#D6B77A" stroke-opacity=".35" stroke-width="3" stroke-dasharray="10 10"/>
        ${[600, 730, 860].map((x) => circle(x, 610, 13, 'url(#pearl)')).join('')}
      </g>`;
    }
    case 'shoulders': return sheet(535, 160, 300, 350, 10) + `<path d="M300 140V205Q245 220 210 255L165 360M450 140V205Q505 220 540 255L585 360M245 290V530Q375 570 505 530V290M375 260V515" fill="none" stroke="#F4E6D6" stroke-width="7" stroke-linecap="round"/>${circle(245, 245, 45, 'none')}${circle(505, 245, 45, 'none')}${line('M300 140Q375 175 450 140', '#D6B77A', 5)}`;
    case 'garment': return `<path d="M300 155L390 125Q445 200 500 125L590 155L670 295L600 340L575 280V560Q445 595 315 560V280L290 340L220 295Z" fill="url(#pearl)" stroke="#D6B77A" stroke-width="5"/>${line('M445 205V565M320 390H570', '#A96A80', 4)}${[260, 320, 380, 440, 500].map((y) => circle(445, y, 5, '#651B36')).join('')}<g transform="translate(560 270) scale(.48)">${book(470, 340, 1)}</g>`;
    case 'implant': return implant(395, 315, 1.05) + `<g transform="translate(710 445)"><path d="M-150 40Q-90 -100 40 -80Q140 -40 155 40Z" fill="url(#pearl)" stroke="#D6B77A" stroke-width="5"/>${line('M-128 30Q-58 -72 33 -63', '#FFF3E5', 5)}</g>`;
    case 'monitoring': return implant(415, 345, .95) + lens(700, 280, 108) + shield(690, 480, .42);
    case 'options': return sheet(235, 130, 490, 450, seed % 2 ? 6 : -6) + implant(365, 305, .67) + cells(660, 420, .63) + pencil;
    case 'revision': return implant(470, 330, 1.05) + line('M250 140Q570 5 740 250M740 250L740 185M740 250L675 238', '#D6B77A', 7) + line('M720 515Q390 660 205 415M205 415L270 425M205 415L208 480', '#F4E6D6', 6);
    case 'fat': return cells(450, 320, 1.08) + `<g transform="translate(730 460) rotate(-32)"><rect x="-15" y="-110" width="30" height="150" rx="9" fill="url(#pearl)" stroke="#D6B77A" stroke-width="3"/>${line('M0 40V200', '#F6EBDD', 9)}${circle(0, 190, 4, '#651B36')}</g>`;
    case 'planning': return sheet(255, 100, 470, 500, seed % 2 ? 7 : -5) + `<g transform="translate(${seed % 2 ? 475 : 495} 350)"><path d="M-80 -155Q-130 -140 -145 -80L-180 115M80 -155Q130 -140 145 -80L180 115M-80 -155Q0 -112 80 -155M-110 -60Q-128 25 -88 115L-100 178M110 -60Q128 25 88 115L100 178M-100 178Q0 195 100 178" fill="none" stroke="#651B36" stroke-width="6" stroke-linecap="round"/>${line('M-92 5Q-50 40 -13 7M13 7Q50 40 92 5', '#B9858E', 4)}</g>` + pencil;
    case 'assessment': return sheet(240, 125, 445, 450, 5) + `<g opacity=".88">${circle(415, 305, 55, 'url(#gel)')}${circle(545, 385, 35, 'url(#gel)')}${circle(385, 455, 22, 'url(#gel)')}</g>` + lens(655, 300, 125) + shield(265, 520, .38);
    case 'filler': return `<g transform="translate(470 320) rotate(30)"><rect x="-50" y="-105" width="100" height="220" rx="12" fill="url(#glass)" stroke="#F4E6D6" stroke-width="5"/><rect x="-40" y="-30" width="80" height="125" fill="url(#gel)" opacity=".8"/>${line('M0 -200V-105M-65 -200H65M-75 -105H75M0 115V165', '#D6B77A', 12)}${line('M0 165V220', '#F4E6D6', 5)}</g>` + shield(730, 370, .85);
    case 'mono': case 'cog': return `<g>${[0, 1, 2, 3].map((i) => {
      const yy = 205 + i * 90;
      return line(`M220 ${yy}C370 ${yy - 115} 610 ${yy + 110} 800 ${yy - 30}`, i % 2 ? '#F4E6D6' : '#D6B77A', 5) + (kind === 'cog' ? [300, 420, 540, 660, 760].map((x, j) => line(`M${x} ${yy + (j % 2 ? 5 : -5)}l-21 -25M${x} ${yy + (j % 2 ? 5 : -5)}l23 23`, '#EBC4B9', 3)).join('') : '');
    }).join('')}</g>`;
    case 'prp': return `<ellipse cx="490" cy="565" rx="240" ry="35" fill="#160713" opacity=".25"/>` + tube + `<path d="M655 175V540H820" fill="none" stroke="#D6B77A" stroke-width="12" stroke-linecap="round"/>`;
    case 'scaffold': return `<g transform="translate(100 30)">${[[230, 190], [410, 130], [565, 225], [300, 385], [490, 420], [670, 355]].map(([x, y], i, points) => points.slice(i + 1).filter((_, j) => j < 2).map(([xx, yy]) => line(`M${x} ${y}L${xx} ${yy}`, '#D6B77A', 4)).join('') + circle(x, y, 30, 'url(#gel)')).join('')}</g>` + lens(740, 470, 95);
    case 'polymer': return `<path d="M200 290C320 50 430 570 560 325S760 210 830 430" fill="none" stroke="#D6B77A" stroke-width="7"/>${[[220, 260], [325, 220], [415, 355], [520, 390], [620, 235], [725, 270], [815, 405]].map(([x, y]) => circle(x, y, 43, 'url(#pearl)')).join('')}<g transform="translate(420 470)"><rect x="0" y="0" width="125" height="80" rx="15" fill="url(#glass)" stroke="#F6EBDD" stroke-width="3"/><rect x="22" y="-32" width="82" height="32" rx="5" fill="#D6B77A"/></g>`;
    case 'cells': return `<ellipse cx="430" cy="390" rx="235" ry="120" fill="url(#glass)" stroke="#D6B77A" stroke-width="5"/><path d="M195 390V430Q430 595 665 430V390" fill="url(#gel)" stroke="#D6B77A" stroke-width="4"/>${[[325, 370], [460, 340], [520, 425], [385, 430]].map(([x, y]) => circle(x, y, 28, 'url(#pearl)') + circle(x + 5, y - 2, 8, '#651B36')).join('')}<g transform="translate(730 260) rotate(25)"><rect x="-27" y="-120" width="54" height="155" rx="12" fill="url(#wine)" stroke="#D6B77A" stroke-width="4"/>${line('M0 35V85M-70 -130H70', '#F4E6D6', 12)}</g>${line('M785 360Q855 510 685 560H825', '#D6B77A', 16)}`;
    case 'anatomy': return `<path d="M290 115V600H395Q485 600 590 485Q740 455 790 355Q800 285 700 235Q590 215 510 150Q425 90 290 115Z" fill="url(#fat)" stroke="#F4E6D6" stroke-width="7"/><path d="M300 130V585H360V135Z" fill="#A96675" opacity=".8"/>${[[450, 205], [500, 310], [450, 445], [575, 405], [570, 245]].map(([x, y]) => circle(x, y, 33, '#EBC4B9', '#BD8491')).join('')}${line('M750 345Q640 330 570 245M690 340Q570 350 500 310M665 350Q590 410 450 445M620 300Q535 210 450 205M710 350Q650 400 575 405', '#651B36', 7)}<path d="M790 335Q825 344 790 366" fill="#B17980" stroke="#F4E6D6" stroke-width="5"/>`;
    case 'comparison': return `<g transform="translate(0 -20)">${line('M510 170V550M300 550H720M230 240H790', '#D6B77A', 10)}${circle(510, 225, 18, '#F6EBDD')}${line('M280 250L200 395M280 250L360 395M740 250L660 395M740 250L820 395', '#F4E6D6', 4)}<path d="M185 395Q280 520 375 395Z M645 395Q740 520 835 395Z" fill="url(#pearl)" stroke="#D6B77A" stroke-width="4"/></g>`;
    case 'safety': return sheet(235, 120, 440, 450, -8) + shield(640, 335, 1.1) + pencil;
    case 'evidence': return sheet(230, 140, 450, 435, -7) + [240, 330, 420].map((y) => `<rect x="320" y="${y}" width="35" height="35" rx="5" fill="none" stroke="#B9858E" stroke-width="3"/>${line(`M390 ${y + 16}H540`, '#B9858E', 4)}`).join('') + lens(675, 335, 155);
    case 'choice': return sheet(270, 145, 450, 410, 0) + [-1, 0, 1].map((i) => `<rect x="${360 + i * 140}" y="${245 + Math.abs(i) * 25}" width="115" height="185" rx="14" fill="${i === 0 ? '#651B36' : '#EBC4B9'}" stroke="#D6B77A" stroke-width="3"/>`).join('') + pencil;
    case 'questions': return `<rect x="210" y="160" width="370" height="240" rx="35" fill="url(#paper)" stroke="#D6B77A" stroke-width="4"/><path d="M270 400V460L340 400" fill="url(#paper)" stroke="#D6B77A" stroke-width="4"/><rect x="490" y="330" width="330" height="210" rx="35" fill="url(#wine)" stroke="#D6B77A" stroke-width="4"/><path d="M690 540L760 590V540" fill="#651B36" stroke="#D6B77A" stroke-width="4"/>${[305, 395, 485].map((x) => circle(x, 275, 9, '#651B36')).join('')}${[575, 655, 735].map((x) => circle(x, 430, 8, '#F4E6D6')).join('')}`;
    case 'contact': return `<rect x="230" y="205" width="560" height="360" rx="20" fill="url(#paper)" stroke="#D6B77A" stroke-width="4"/><path d="M240 220L510 415L780 220M240 550L435 365M780 550L585 365" fill="none" stroke="#B9858E" stroke-width="5"/>${circle(740, 195, 70, 'url(#wine)')}${line('M710 195H770M740 165V225', '#D6B77A', 4)}`;
    case 'references': return sheet(230, 110, 400, 470, -12) + sheet(380, 165, 390, 420, 9) + `<path d="M640 135V335L685 300L730 335V135Z" fill="#651B36" stroke="#D6B77A" stroke-width="3"/>`;
    case 'glossary': return book(485, 350, 1.12) + `<path d="M625 160V320L660 288L695 320V160Z" fill="#651B36" stroke="#D6B77A" stroke-width="3"/>` + lens(745, 470, 80);
    case 'library': return sheet(270, 120, 420, 440, 12) + book(490, 375, 1.05) + lens(765, 205, 85);
    case 'reading': return book(470, 340, 1.2) + pencil + `<ellipse cx="800" cy="485" rx="70" ry="32" fill="#651B36" stroke="#D6B77A" stroke-width="4"/><path d="M730 485V540Q800 580 870 540V485" fill="url(#wine)" stroke="#D6B77A" stroke-width="4"/>`;
    default: throw new Error('No authored illustration for ' + kind);
  }
}
function svg(art, variant) {
  const [w, h] = variant === 'banner' ? [1600, 640] : variant === 'portrait' ? [960, 1200] : [1200, 825];
  const transform = variant === 'banner' ? 'translate(790 48) scale(.77)' : variant === 'portrait' ? 'translate(25 245) scale(.9)' : 'translate(90 55)';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>
<linearGradient id="bg" x2="1" y2="1"><stop stop-color="#4A0D24"/><stop offset=".6" stop-color="#651B36"/><stop offset="1" stop-color="#300C1B"/></linearGradient>
<linearGradient id="paper" x2=".8" y2="1"><stop stop-color="#FFF4E4"/><stop offset="1" stop-color="#DCC1AC"/></linearGradient>
<radialGradient id="pearl" cx=".35" cy=".28"><stop stop-color="#FFF6E8"/><stop offset=".6" stop-color="#E6C9BD"/><stop offset="1" stop-color="#AF7C89"/></radialGradient>
<linearGradient id="gel" x2="1" y2="1"><stop stop-color="#F1C6C3" stop-opacity=".85"/><stop offset="1" stop-color="#A96B88" stop-opacity=".45"/></linearGradient>
<radialGradient id="fat" cx=".3" cy=".25"><stop stop-color="#FFF0CC"/><stop offset="1" stop-color="#D6AC7C"/></radialGradient>
<linearGradient id="glass" x2="1" y2="1"><stop stop-color="#FFF4E4" stop-opacity=".5"/><stop offset="1" stop-color="#EBC4B9" stop-opacity=".12"/></linearGradient>
<linearGradient id="wine" x2=".8" y2="1"><stop stop-color="#8C3856"/><stop offset="1" stop-color="#4A0D24"/></linearGradient>
<radialGradient id="light"><stop stop-color="#E6B8A9" stop-opacity=".18"/><stop offset="1" stop-color="#E6B8A9" stop-opacity="0"/></radialGradient>
<filter id="shadow" x="-.3" y="-.3" width="1.6" height="1.6"><feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#160711" flood-opacity=".22"/></filter></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/><ellipse cx="${w * .64}" cy="${h * .4}" rx="${w * .54}" ry="${h * .8}" fill="url(#light)"/>
<path d="M0 ${h * .88}Q${w * .5} ${h * .68} ${w} ${h * .88}" fill="none" stroke="#D6B77A" stroke-opacity=".12" stroke-width="2"/>
<g transform="${transform}"><ellipse cx="505" cy="565" rx="365" ry="52" fill="#160713" opacity=".16"/><circle cx="505" cy="325" r="310" fill="none" stroke="#D6B77A" stroke-opacity=".13" stroke-width="2"/><g filter="url(#shadow)">${subject(art.kind, art.seed)}</g></g></svg>`;
}
const manifest = [];
const required = new Map();
// The home "Our approach" split uses this portrait even though the About page
// itself has no split block.
if (!required.has('qh-independent-patient-education')) required.set('qh-independent-patient-education', new Set());
required.get('qh-independent-patient-education').add('portrait');
/* Body-section artwork used by figure blocks rather than card links. */
need('qh-reduction-incisions', 'card');
need('qh-reduction-recovery', 'card');
function need(key, variant) {
  if (!key) return;
  if (!required.has(key)) required.set(key, new Set());
  required.get(key).add(variant);
}
function inspect(page, blocks) {
  blocks.forEach((b) => {
    if (b.type === 'cards' && showCardImages(b)) b.items.forEach((it) => need(forItem(it), 'card'));
    if (b.type === 'split') need(forItem(b), 'portrait');
    if (b.type === 'steps' && b.slot) need(forItem(b), 'card');
    if (b.type === 'form' && b.slot) need(forItem(b), 'card');
    if (inlineFor(page, b)) need(routes[page.url].key, 'card');
    if (b.blocks) inspect(page, b.blocks);
  });
}
allPages.forEach((p) => {
  if (routes[p.url]) need(routes[p.url].key, 'banner');
  inspect(p, p.blocks);
});
const manifestFile = path.join(__dirname, '..', 'docs', 'image-audit', 'generated-assets.json');
// Remove only superseded outputs listed by this generator's own manifest.
const previous = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile)) : [];
previous.filter((a) => !required.get(Object.values(routes).find((r) => r.route === a.route).key)?.has(a.variant)).forEach((a) => {
  const base = a.filename.replace(/\.svg$/, '');
  [a.filename, ...[480, 640, 960, 1600].map((w) => base + '-' + w + '.webp')].forEach((file) => {
    const p = path.join(out, file);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  });
});
Object.values(routes).forEach((art) => {
  for (const variant of required.get(art.key) || []) {
    const file = art.key + '-' + variant + '.svg';
    fs.writeFileSync(path.join(out, file), svg(art, variant));
    manifest.push({ route: art.route, filename: file, kind: art.kind, variant, provenance: 'Original deterministic SVG illustration; not AI photography or clinical imagery', alt: art.alt });
  }
});
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
console.log('Generated ' + manifest.length + ' original SVG compositions for ' + Object.keys(routes).length + ' route concepts.');
