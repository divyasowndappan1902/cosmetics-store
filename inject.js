const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'blog.html',
  'contact.html',
  'login.html',
  'signup.html',
  'admin_dashboard.html',
  'customer_dashboard.html'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert CSS
  if (!content.includes('premium-animations.css')) {
    content = content.replace('</head>', '    <link rel="stylesheet" href="premium-animations.css">\n</head>');
  }

  // Insert JS
  if (!content.includes('premium-animations.js')) {
    content = content.replace('</body>', '    <script src="premium-animations.js"></script>\n</body>');
  }

  // Also ensure GSAP is in all of them before premium-animations.js
  const gsapScripts = `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>\n`;
  if (!content.includes('gsap.min.js')) {
    content = content.replace('<script src="premium-animations.js"></script>', gsapScripts + '    <script src="premium-animations.js"></script>');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
