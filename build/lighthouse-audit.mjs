// Measure sequentially so parallel browser jobs do not skew CPU timings.
// Usage: node build/lighthouse-audit.mjs [--base URL] [--quick] [--label live]
import fs from 'node:fs/promises';
import path from 'node:path';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
const args = process.argv.slice(2);
const arg = name => args.includes(name) ? args[args.indexOf(name) + 1] : null;
const base = arg('--base') || 'http://localhost:8100';
const label = arg('--label') || 'local';
const out = path.resolve('docs/performance-audit');
await fs.mkdir(out, { recursive: true });
function summarize(lhr) {
  const metric = id => lhr.audits[id]?.numericValue;
  return {
    url: lhr.finalDisplayedUrl, lighthouseVersion: lhr.lighthouseVersion, time: lhr.fetchTime,
    mode: lhr.configSettings.formFactor,
    scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
    lcp: metric('largest-contentful-paint'), cls: metric('cumulative-layout-shift'), tbt: metric('total-blocking-time'),
    fcp: metric('first-contentful-paint'), bytes: metric('total-byte-weight'),
    findings: Object.values(lhr.audits).filter(a => a.score !== null && a.score < 1 && ['binary', 'numeric', 'metricSavings'].includes(a.scoreDisplayMode))
      .map(a => ({ id: a.id, score: a.score, title: a.title, value: a.displayValue, details: a.details }))
  };
}
if (args.includes('--summarize-baseline')) {
  const lhr = JSON.parse(await fs.readFile(path.join(out, 'baseline-home-mobile.report.json'), 'utf8'));
  const summary = summarize(lhr);
  await fs.writeFile(path.join(out, 'baseline-lighthouse-summary.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify({ ...summary, findings: summary.findings.map(({ details, ...f }) => f) }, null, 2));
} else {
  const routes = arg('--routes') ? arg('--routes').split(',') : args.includes('--quick') ? ['/'] : ['/', '/surgical-breast-enlargement/', '/breast-implants/', '/non-surgical-breast-enlargement/', '/education-research/', '/research/'];
  const summaries = [];
  for (const route of routes) {
    for (const mode of ['mobile', 'desktop']) {
      const chrome = await launch({ chromePath: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', chromeFlags: ['--headless=new'] });
      try {
        const result = await lighthouse(base + route, {
          port: chrome.port, logLevel: 'error', output: ['json', 'html'], onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
        }, mode === 'desktop' ? desktopConfig : undefined);
        if (result.lhr.runtimeError) throw new Error(JSON.stringify(result.lhr.runtimeError));
        const name = `${label}-${route === '/' ? 'home' : route.replace(/\W+/g, '-')}-${mode}`;
        await fs.writeFile(path.join(out, name + '.report.json'), result.report[0]);
        await fs.writeFile(path.join(out, name + '.report.html'), result.report[1]);
        const summary = summarize(result.lhr);
        summaries.push(summary);
        console.log(`${name}: ${JSON.stringify(summary.scores)} LCP=${Math.round(summary.lcp)}ms CLS=${summary.cls.toFixed(3)} TBT=${summary.tbt}ms`);
      } finally { await chrome.kill(); }
      await fs.writeFile(path.join(out, `${label}-lighthouse-summary.json`), JSON.stringify(summaries, null, 2));
    }
  }
}
