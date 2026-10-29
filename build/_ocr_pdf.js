const path = require('path');
const { createWorker } = require('tesseract.js');
(async () => {
  const worker = await createWorker('eng');
  for (const p of [10, 11, 13, 14, 17, 18, 21, 22, 23, 24, 25]) {
    const f = require('fs').readdirSync('tmpimg/pdf').find((n) => n.startsWith('PDF -p' + p + '-'));
    if (!f) continue;
    const { data } = await worker.recognize(path.join('tmpimg/pdf', f));
    console.log('\n=== PAGE ' + p + ' ===');
    console.log(data.text.replace(/\n{2,}/g, '\n').trim());
  }
  await worker.terminate();
})();
