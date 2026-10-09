const fs = require('fs');
let html = fs.readFileSync('blog.html', 'utf8');

// 1. Remove Category Tags
html = html.replace(/<!-- Category Tags -->[\s\S]*?<\/div>\s*<\/div>/, '</div>');

// 2. Remove Ask Our Beauty Experts
html = html.replace(/<!-- Ask Our Beauty Experts Section -->[\s\S]*?(?=<!-- Footer -->)/, '');

fs.writeFileSync('blog.html', html);
console.log('Removed successfully.');
