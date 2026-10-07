// main.js - Core animations and interactions

window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger);
    
    // 1. Preloader Animation
    const preloader = document.getElementById("preloader");
    if (preloader) {
        const tl = gsap.timeline();
        tl.fromTo(".gsap-preloader-text", 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
        .to("#preloader", {
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            preloader.style.display = "none";
            // Refresh ScrollTrigger after layout stabilizes
            ScrollTrigger.refresh();
          }
        });
    }

    // 2. Headings Scroll Animation (Cosmetics style: elegant fade + slight upward drift)
    const headings = document.querySelectorAll("h1, h2, h3");
    headings.forEach((heading) => {
      // Skip preloader heading
      if(heading.classList.contains('gsap-preloader-text')) return;
      
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });

    // 3. Premium "What We Offer" Section Animation (Specific to Services page)
    const offerSection = document.querySelector('.bg-\\[\\#FDF9F2\\].py-20.md\\:py-24'); // Target the section
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
    }
});
