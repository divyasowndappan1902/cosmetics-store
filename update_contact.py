import os
import glob
import re

files = glob.glob('c:/Users/Admin/Desktop/cos/*.html')

new_contact_html = """          <!-- Column 5: Contact Us -->
          <div class="flex flex-col lg:col-span-2">
            <h3 class="font-serif text-[1.4rem] text-black mb-6">Contact us</h3>
            <div class="space-y-4 font-serif text-[14px] text-white/90 leading-relaxed">
              <p class="flex items-start gap-3">
                <i class="fa-solid fa-location-dot mt-1 text-white/80"></i>
                <span>MMR Complex,<br/>periyakollapatty,<br/>Chinnatirupathi<br/>Salem<br/>Tamil nadu -636008</span>
              </p>
              <p class="flex items-center gap-3">
                <i class="fa-solid fa-envelope text-white/80"></i>
                <a href="mailto:info@stackly.com" class="hover:text-white transition-colors">info@stackly.com</a>
              </p>
              <p class="flex items-center gap-3 font-sans text-[15px] text-white font-medium mt-2">
                <i class="fa-solid fa-phone text-white/80"></i>
                <span>+91 98765 43210</span>
              </p>
            </div>
          </div>"""

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to find Column 5
    pattern = r'<!-- Column 5: Contact Us -->\s*<div class="flex flex-col lg:col-span-2">.*?(?=</div>\s*</div>\s*</div>\s*<div class="border-t)'
    
    content = re.sub(pattern, new_contact_html, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")
