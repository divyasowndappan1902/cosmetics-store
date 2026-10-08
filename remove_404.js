const fs = require('fs');

const blockToRemove = `        <div class="pt-2 border-t border-[#38251E]/10 mt-2">
            <a href="login.html" class="block text-center bg-[#38302A] text-white px-6 py-2.5 text-sm font-medium rounded-md hover:bg-black transition w-full">Register</a>
        </div>`;

let content = fs.readFileSync('404.html', 'utf8');
if (content.includes(blockToRemove)) {
    content = content.replace(blockToRemove, '');
    fs.writeFileSync('404.html', content, 'utf8');
    console.log('Removed from 404.html');
} else {
    console.log('Not found in 404.html exactly. Trying string index extraction.');
    let startIdx = content.indexOf('<div class="hidden md:flex');
    if (startIdx > -1) {
      let blockStart = content.indexOf('<div class="pt-2', startIdx);
      if (blockStart > -1 && blockStart < content.indexOf('<!-- Actions -->', startIdx)) {
         let blockEnd = content.indexOf('</div>', blockStart) + 6;
         content = content.substring(0, blockStart) + content.substring(blockEnd);
         fs.writeFileSync('404.html', content, 'utf8');
         console.log(`Fixed 404.html via index slice`);
      }
    }
}
