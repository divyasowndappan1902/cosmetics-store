const fs = require('fs');

const fileMain = 'C:\\Users\\Admin\\Desktop\\cos\\main.js';
let js = fs.readFileSync(fileMain, 'utf8');

const targetStr = `    // 3. Premium "What We Offer" Section Animation (Specific to Services page)
    const offerSection = document.querySelector('.service-card')?.closest('section');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (offerSection && serviceCards.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: offerSection,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      const offerPara = offerSection.querySelector('p.max-w-2xl');
      if (offerPara) {
          tl.from(offerPara, { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "+=0.2");
      }

      tl.from(serviceCards, {
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4");
    }`;

js = js.replace(targetStr, "");
fs.writeFileSync(fileMain, js);

console.log("Removed What We Offer animation block precisely.");
