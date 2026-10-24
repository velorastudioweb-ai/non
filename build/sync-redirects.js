'use strict';
const fs = require('fs');
const path = require('path');
const { redirects } = require('./structure');
const file = path.join(__dirname, '..', 'vercel.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
config.redirects = redirects.map(({ from, to }) => ({ source: from, destination: to, permanent: true }));
fs.writeFileSync(file, JSON.stringify(config, null, 2) + '\n');
console.log('Synced ' + config.redirects.length + ' permanent Vercel redirects.');
