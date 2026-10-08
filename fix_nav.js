const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('dashboard'));

const mobileRegBlock = `
        <div class="pt-2 border-t border-[#38251E]/10 mt-2">
            <a href="login.html" class="block text-center bg-[#38302A] text-white px-6 py-2.5 text-sm font-medium rounded-md hover:bg-black transition w-full">Register</a>
        </div>
    </div>`; // includes closing div of mobile-menu

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Hide the main Register button on mobile
    const oldRegBtn = 'transition inline-block">Register</a>';
    if (content.includes(oldRegBtn)) {
        content = content.replace(oldRegBtn, 'transition hidden md:inline-block">Register</a>');
        changed = true;
    }

    // 2. Add Register to mobile menu
    if (content.includes('id="mobile-menu"') && !content.includes('w-full">Register</a>\n        </div>\n    </div>')) {
        // find the end of mobile menu
        // It ends with <a href="contact.html"...>Contact</a> \n    </div>
        const contactLink = '<a href="contact.html" class="block text-[15px] font-medium text-gray-900 hover:text-[#ceab7e]">Contact</a>';
        if (content.includes(contactLink)) {
             content = content.replace(
                contactLink + '\n      </div>',
                contactLink + mobileRegBlock
             );
             // handle different spacing
             content = content.replace(
                contactLink + '\r\n      </div>',
                contactLink + mobileRegBlock
             );
             content = content.replace(
                contactLink + '\n    </div>',
                contactLink + mobileRegBlock
             );
             content = content.replace(
                contactLink + '\r\n    </div>',
                contactLink + mobileRegBlock
             );
             changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
