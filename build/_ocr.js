const fs = require('fs');
const path = require('path');
const { createWorker } = require('tesseract.js');

(async () => {
  const dir = path.join(__dirname, '..', 'tmpimg');
  fs.mkdirSync(dir, { recursive: true });
  const files = fs.readdirSync(path.join(__dirname, '..', 'public'), { withFileTypes: true })
    .filter((f) => f.isFile() && /\.(png|jpe?g)$/i.test(f.name))
    .map((f) => f.name);
  const worker = await createWorker('eng');
  for (const name of files) {
    try {
      const { data } = await worker.recognize(path.join(__dirname, '..', 'public', name));
      console.log('\n=== ' + name + ' ===');
      console.log(data.text.replace(/\n{3,}/g, '\n\n').trim());
    } catch (e) {
      console.log('\n=== ' + name + ' === ERROR ' + e.message);
    }
  }
  await worker.terminate();
})();
