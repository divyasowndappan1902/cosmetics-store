const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // regex to replace absolute with fixed in header class
    const regex = /<header\s+class="([^"]*)absolute([^"]*)"/i;
    if (regex.test(content)) {
        content = content.replace(regex, '<header class="$1fixed$2"');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed absolute to fixed in ' + file);
        count++;
    }
});

console.log('Total files fixed: ' + count);
