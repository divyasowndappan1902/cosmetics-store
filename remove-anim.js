const fs = require('fs');

const fileMain = 'C:\\Users\\Admin\\Desktop\\cos\\main.js';
let js = fs.readFileSync(fileMain, 'utf8');

// Use regex to remove from "// 3. Premium" down to the closing brace before "});"
const regex = /\/\/ 3\. Premium "What We Offer".*?\}\n\}\);/s;

// We need to keep the closing `});` for the window load listener!
js = js.replace(/\/\/ 3\. Premium "What We Offer".*?\}\s*\}\);/s, '});');

fs.writeFileSync(fileMain, js);

console.log("Removed What We Offer animation block.");
