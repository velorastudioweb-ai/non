const fs = require('fs');
const p = 'build/content.js';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(/topicImage\('ourApproach'\)/g, "topicImage('consultation-illustrative')");
fs.writeFileSync(p, s);
console.log('done');
