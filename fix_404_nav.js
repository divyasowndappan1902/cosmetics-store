const fs = require('fs');
let content = fs.readFileSync('404.html', 'utf8');
content = content.replace(
    '<nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">',
    '<nav class="fixed top-0 left-0 w-full z-50 bg-[#f4eee5]/90 backdrop-blur-md max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">'
);
fs.writeFileSync('404.html', content, 'utf8');
console.log('Fixed nav in 404.html');
