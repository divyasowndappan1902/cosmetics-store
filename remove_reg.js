const fs = require('fs');

const blockToRemove = `        <div class="pt-2 border-t border-[#38251E]/10 mt-2">
            <a href="login.html" class="block text-center bg-[#38302A] text-white px-6 py-2.5 text-sm font-medium rounded-md hover:bg-black transition w-full">Register</a>
        </div>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('dashboard'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(blockToRemove)) {
    content = content.replace(blockToRemove, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Removed from ${file}`);
  } else {
    console.log(`Not found in ${file}, trying regex...`);
    const regex = /<div class="pt-2 border-t border-\\[#38251E\\]\/10 mt-2\">[\s\S]*?<\/div>/;
    if (regex.test(content)) {
      content = content.replace(regex, '');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Removed via regex from ${file}`);
    } else {
      // Just try to find the Register block inside the hidden md:flex container
      let startIdx = content.indexOf('<div class="hidden md:flex items-center gap-8 text-[15px] font-medium">');
      if (startIdx > -1) {
        let blockStart = content.indexOf('<div class="pt-2', startIdx);
        if (blockStart > -1 && blockStart < content.indexOf('<!-- Actions -->', startIdx)) {
           let blockEnd = content.indexOf('</div>', blockStart) + 6;
           content = content.substring(0, blockStart) + content.substring(blockEnd);
           fs.writeFileSync(file, content, 'utf8');
           console.log(`Removed via index slice from ${file}`);
        }
      }
    }
  }
});
