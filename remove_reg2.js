const fs = require('fs');

const files = ['404.html', 'login.html', 'signup.html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let startIdx = content.indexOf('<div class="hidden md:flex');
    if (startIdx > -1) {
      let blockStart = content.indexOf('<div class="pt-2', startIdx);
      if (blockStart > -1 && blockStart < content.indexOf('<!-- Actions -->', startIdx)) {
         let blockEnd = content.indexOf('</div>', blockStart) + 6;
         content = content.substring(0, blockStart) + content.substring(blockEnd);
         fs.writeFileSync(file, content, 'utf8');
         console.log(`Fixed ${file}`);
      }
    }
  }
});
