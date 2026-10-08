const fs = require('fs');

const fileMain = 'C:\\Users\\Admin\\Desktop\\cos\\main.js';
let js = fs.readFileSync(fileMain, 'utf8');

const index = js.indexOf('// 3. Premium "What We Offer" Section Animation');
if (index !== -1) {
    js = js.substring(0, index) + '});\n';
    fs.writeFileSync(fileMain, js);
    console.log("Successfully removed block by index.");
} else {
    console.log("String not found");
}
