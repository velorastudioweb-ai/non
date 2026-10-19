'use strict';
const { parseFrontMatter, markdownToHtml, extractToc } = require('./markdown');
const { autoLink } = require('./glossary');
const fs = require('fs');
const path = require('path');
function loadWiki(){
  const DIR = path.join(__dirname,'..','content','wiki');
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter(f=>f.endsWith('.md')).map(f=>{
    const src = fs.readFileSync(path.join(DIR,f),'utf8');
    const { data, body } = parseFrontMatter(src);
    let html = markdownToHtml(body); html = autoLink(html);
    return { slug: data.slug||f.replace(/\.md$/,''), url: '/wiki/'+(data.slug||f.replace(/\.md$/, ''))+'/', data, html, toc: extractToc(html), status: data.status||'draft' };
  });
}
module.exports = { loadWiki };
