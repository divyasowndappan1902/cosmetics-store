const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('C:\\Users\\Admin\\Desktop\\cos\\services.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const grids = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-3, .grid.grid-cols-2');
console.log("Grids found:", grids.length);
