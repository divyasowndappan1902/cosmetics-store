
// Respect prefers-reduced-motion
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(10); // Speed up animations so they happen instantly
}
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const premiumEase = "power3.out";
    const slowEase = "power2.inOut";

    // --- NAVBAR ---
    const nav = document.querySelector('nav');
    if (nav) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

    
        });

        // Initial Navbar Entrance
        gsap.from(nav, { y: -20, opacity: 0, duration: 1, ease: premiumEase, delay: 0.2 });
    }

    // --- HOME PAGE: HERO SECTION ---
    const heroMain = document.querySelector('main');
    if (heroMain && heroMain.querySelector('img[alt="Model"]')) {
        const heroTl = gsap.timeline();
        
        // Image
        const heroImg = heroMain.querySelector('img[alt="Model"]');
        if (heroImg) {
            heroTl.fromTo(heroImg, 
                { scale: 0.96, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 1.5, ease: slowEase }, 
                0
            );
            // Floating movement
            gsap.to(heroImg, {
                y: "-=10",
                duration: 4,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });
        }

        // Headings
        const h1s = heroMain.querySelectorAll('h1');
        if (h1s.length) {
            heroTl.fromTo(h1s,
                { y: 30, opacity: 0, letterSpacing: "tight" },
                { y: 0, opacity: 1, letterSpacing: "normal", duration: 1.2, stagger: 0.2, ease: premiumEase },
                0.4
            );
        }

        // Description
        const heroDesc = heroMain.querySelector('p');
        if (heroDesc) {
            heroTl.fromTo(heroDesc,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: premiumEase },
                0.8
            );
        }

        // Buttons
        const heroBtns = heroMain.querySelectorAll('button, a.underline');
        if (heroBtns.length) {
            heroTl.fromTo(heroBtns,
                { y: 15, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: premiumEase },
                1.0
            );
        }

        // Floating Cards
        const floatingCards = heroMain.querySelectorAll('.glass-card');
        if (floatingCards.length) {
            heroTl.fromTo(floatingCards,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: premiumEase },
                1.2
            );
        }
    }

    // --- TRUST / STATISTICS SECTION (Counters) ---
    const statsSection = document.querySelector('h2.font-serif.text-4xl.text-\\[\\#1F1C18\\]')?.closest('div.w-full');
    if (statsSection) {
        const numbers = statsSection.querySelectorAll('h2');
        numbers.forEach(num => {
            if (num.innerText.includes('4.9')) {
                gsap.fromTo(num, { innerText: 0 }, {
                    innerText: 4.9,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: { trigger: num, start: "top 90%" },
                    snap: { innerText: 0.1 }
                });
            } else if (num.innerText.includes('98%')) {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: 98,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: { trigger: num, start: "top 90%" },
                    onUpdate: function() {
                        num.innerText = Math.floor(obj.val) + "%";
                    }
                });
            }
        });
    }

    // --- ADD PREMIUM CLASSES TO CARDS/IMAGES ---
    document.querySelectorAll('.group.cursor-pointer').forEach(el => {
        el.classList.add('img-zoom-wrapper');
    });
    document.querySelectorAll('section .bg-\\[\\#CBA97F\\]').forEach(el => {
        el.classList.add('premium-card');
    });

    // --- STAGGERED REVEALS (Categories, Products, Services, Blog) ---
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        const cards = Array.from(grid.children).filter(child => 
            child.tagName === 'DIV' && !child.classList.contains('absolute')
        );
        if (cards.length > 0) {
            gsap.fromTo(cards, 
                { y: 40, opacity: 0 }, 
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: premiumEase,
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    });

    // --- 3-STEP ROUTINE (Connecting Line & Sequence) ---
    const stepSection = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('3-step'))?.closest('section') || document.querySelector('.max-w-6xl.mx-auto.h-\\[600px\\]');
    if (stepSection) {
        const labels = stepSection.querySelectorAll('.hidden.md\\:block');
        if (labels.length) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stepSection,
                    start: "top 70%",
                }
            });
            tl.fromTo(labels, 
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, stagger: 0.4, ease: premiumEase }
            );
            
            // Draw paths
            const paths = stepSection.querySelectorAll('path');
            paths.forEach(p => {
                const len = p.getTotalLength();
                gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
                tl.to(p, { strokeDashoffset: 0, duration: 1, ease: "power1.inOut" }, "-=0.8");
            });
        }
    }

    // --- INGREDIENTS SECTION (Alternating reveals) ---
    const ingredients = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('What goes in'))?.closest('section')?.querySelectorAll('.flex-col') || document.querySelectorAll('section.border-t .flex-col');
    ingredients.forEach((ing, i) => {
        gsap.fromTo(ing, 
            { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: premiumEase, scrollTrigger: { trigger: ing, start: "top 85%" }}
        );
        const img = ing.querySelector('img');
        if (img) {
            ing.classList.add('img-zoom-wrapper');
            gsap.fromTo(img, { scale: 0.95 }, { scale: 1, duration: 1.2, ease: slowEase, scrollTrigger: { trigger: ing, start: "top 85%" }});
        }
    });

    // --- PARALLAX EFFECT ---
    const banner = document.querySelector('.bg-\\[\\#C3A47C\\]');
    if (banner) {
        const img = banner.querySelector('img');
        if (img) {
            gsap.fromTo(img, 
                { y: -30 }, 
                { y: 30, ease: "none", scrollTrigger: { trigger: banner, start: "top bottom", end: "bottom top", scrub: true } }
            );
        }
    }

    const parallaxImgs = document.querySelectorAll('.parallax-img');
    parallaxImgs.forEach(img => {
        gsap.fromTo(img, 
            { yPercent: -15 }, 
            { yPercent: 15, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
        );
    });

    // --- CUSTOMER REVIEWS SLIDER ---
    // If not a slider, just add staggered animation
    const reviews = document.querySelectorAll('.animate-float-gentle');
    reviews.forEach((review, i) => {
        gsap.fromTo(review, 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: i * 0.1, ease: premiumEase, scrollTrigger: { trigger: review, start: "top 90%" }}
        );
    });

    // --- SOCIAL GALLERY (Masonry staggered reveal) ---
    const galleryItems = document.querySelectorAll('.break-inside-avoid');
    if (galleryItems.length > 0) {
        gsap.fromTo(galleryItems, 
            { y: 50, opacity: 0 }, 
            {
                y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: premiumEase,
                scrollTrigger: { trigger: galleryItems[0], start: "top 85%" }
            }
        );
    }

    // --- FAQ ACCORDION ---
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach((detail) => {
        const summary = detail.querySelector('summary');
        const content = detail.querySelector('p, div');
        const icon = detail.querySelector('.faq-icon') || detail.querySelector('svg');
        
        if (summary && content) {
            // Prevent default toggle behavior
            summary.addEventListener('click', (e) => {
                e.preventDefault();
                
                const isOpen = detail.hasAttribute('open');
                
                // Close all others
                detailsElements.forEach((otherDetail) => {
                    if (otherDetail !== detail && otherDetail.hasAttribute('open')) {
                        const otherContent = otherDetail.querySelector('p, div');
                        const otherIcon = otherDetail.querySelector('.faq-icon') || otherDetail.querySelector('svg');
                        
                        gsap.to(otherContent, { height: 0, opacity: 0, duration: 0.4, ease: premiumEase, onComplete: () => {
                            otherDetail.removeAttribute('open');
                        }});
                        if (otherIcon) gsap.to(otherIcon, { rotation: 0, duration: 0.4, ease: premiumEase });
                    }
                });

                if (isOpen) {
                    // Close current
                    gsap.to(content, { height: 0, opacity: 0, duration: 0.4, ease: premiumEase, onComplete: () => {
                        detail.removeAttribute('open');
                    }});
                    if (icon) gsap.to(icon, { rotation: 0, duration: 0.4, ease: premiumEase });
                } else {
                    // Open current
                    detail.setAttribute('open', '');
                    gsap.fromTo(content, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.4, ease: premiumEase });
                    if (icon) gsap.to(icon, { rotation: 45, duration: 0.4, ease: premiumEase }); // 45deg makes plus an X
                }
            });
            
            // Ensure proper initial state
            if (!detail.hasAttribute('open')) {
                gsap.set(content, { height: 0, opacity: 0, overflow: 'hidden' });
            } else {
                gsap.set(content, { height: "auto", opacity: 1, overflow: 'hidden' });
                if (icon) gsap.set(icon, { rotation: 45 });
            }
        }
    });

    // --- ABOUT/SERVICES/BLOG/CONTACT SPECIFIC REVEALS ---
    
    // Split reveals (Hero texts and images)
    const splitSections = document.querySelectorAll('.split-reveal');
    splitSections.forEach(section => {
        const left = section.querySelector('.left-content');
        const right = section.querySelector('.right-content');
        if(left) gsap.fromTo(left, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: premiumEase, scrollTrigger: { trigger: section, start: "top 85%" }});
        if(right) gsap.fromTo(right, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: premiumEase, scrollTrigger: { trigger: section, start: "top 85%" }});
    });

    // Timeline line
    const timelines = document.querySelectorAll('.timeline-line');
    timelines.forEach(timeline => {
        gsap.fromTo(timeline, { height: 0 }, { height: "100%", ease: "none", scrollTrigger: { trigger: timeline.parentElement, start: "top 50%", end: "bottom 50%", scrub: true }});
    });

    // Team hover effects
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('img'), { filter: 'grayscale(0%)', scale: 1.05, duration: 0.6, ease: premiumEase });
            gsap.to(card.querySelector('.info'), { y: -10, duration: 0.4, ease: premiumEase });
            gsap.to(card.querySelectorAll('.social'), { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: premiumEase });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('img'), { filter: 'grayscale(100%)', scale: 1, duration: 0.6, ease: premiumEase });
            gsap.to(card.querySelector('.info'), { y: 0, duration: 0.4, ease: premiumEase });
            gsap.to(card.querySelectorAll('.social'), { opacity: 0, y: 10, duration: 0.4, ease: premiumEase });
        });
    });

    // Forms
    const formFields = document.querySelectorAll('form input, form textarea');
    if (formFields.length > 0) {
        gsap.fromTo(formFields, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: premiumEase, scrollTrigger: { trigger: formFields[0].closest('form'), start: "top 90%" }}
        );
    }

    // Global Images smooth reveal
    const allImgs = document.querySelectorAll('img:not([alt="Model"])');
    allImgs.forEach(img => {
        // Skip small icons or logos
        if(img.width < 100 || img.classList.contains('no-anim')) return;
        gsap.fromTo(img, 
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 1.2, ease: slowEase, scrollTrigger: { trigger: img, start: "top 95%" }}
        );
    });

    // jQuery-like helper for contains
    // Not actually used jQuery, but handled with closest and standard querySelectors above.
});

    // --- COUNTDOWN FLIP ---
    const countdownContainers = document.querySelectorAll('.flex.flex-col.items-center');
    countdownContainers.forEach(container => {
        const numElement = container.querySelector('span.text-4xl.md\\:text-6xl');
        if (numElement && numElement.innerText.match(/^\d+$/)) {
            // Found a countdown number, let's just make sure it flips slightly on load
            gsap.fromTo(numElement, 
                { rotationX: -90, opacity: 0 },
                { rotationX: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: container, start: "top 95%" } }
            );
        }
    });

    // Remove old main.js scroll animations if they conflict (like the preloader which might be annoying if it bounces)
    // Actually, I can just let it run. But wait, we wanted to fix `gsap-preloader-text`.

    // --- BLOG CATEGORY FILTER (Smooth Transition) ---
    const blogFilters = document.querySelectorAll('a[href="#"]');
    blogFilters.forEach(filter => {
        if(filter.parentElement && filter.parentElement.classList.contains('gap-x-3')) {
            filter.classList.add('blog-category-filter');
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active from others
                filter.parentElement.querySelectorAll('.blog-category-filter').forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                // Animate content area (simulated filtering)
                const articlesGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-3') || document.querySelector('.flex.flex-col.gap-6');
                if (articlesGrid) {
                    gsap.to(articlesGrid.children, {
                        opacity: 0,
                        y: 20,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "power2.inOut",
                        onComplete: () => {
                            gsap.to(articlesGrid.children, {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                stagger: 0.1,
                                ease: premiumEase
                            });
                        }
                    });
                }
            });
        }
    });

    // --- SUBTLE SHIMMER EFFECT (Golden Hour) ---
    const goldenHourSection = Array.from(document.querySelectorAll('section')).find(s => s.innerText.toLowerCase().includes('rose gold'));
    if (goldenHourSection) {
        // Add subtle shimmer pseudo-element via GSAP
        const btn = goldenHourSection.querySelector('button');
        if (btn) {
            btn.classList.add('cta-btn'); // For the shine effect in CSS
        }
    }

    // --- CONTACT FORM SEQUENTIAL REVEAL ---
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contact')) {
        const fields = contactForm.querySelectorAll('input, textarea, button, .flex.items-center');
        gsap.fromTo(fields, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: premiumEase, scrollTrigger: { trigger: contactForm, start: "top 85%" }}
        );
    }

    // --- CONTACT INFO & MAP ---
    const infoCards = document.querySelectorAll('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4 > div');
    if (infoCards.length > 0) {
        gsap.fromTo(infoCards,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: premiumEase, scrollTrigger: { trigger: infoCards[0].parentElement, start: "top 85%" }}
        );
    }

    const map = document.querySelector('iframe')?.parentElement;
    if (map && window.location.pathname.includes('contact')) {
        gsap.fromTo(map,
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: premiumEase, scrollTrigger: { trigger: map, start: "top 85%" }}
        );
    }

    // Contact form button
    if (contactForm) {
        const btn = contactForm.querySelector('button');
        if (btn) btn.classList.add('cta-btn');
    }

    // Info card icons
    infoCards.forEach(card => {
        const icon = card.querySelector('.w-\\[3\\.5rem\\]');
        if (icon) {
            gsap.fromTo(icon, { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(1.7)", scrollTrigger: { trigger: card, start: "top 85%" }});
        }
    });

    // --- NEWSLETTER / BEAUTY CLUB ---
    const newsletter = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Beauty Club'))?.closest('section');
    if (newsletter) {
        const heading = newsletter.querySelector('h2');
        const p = newsletter.querySelector('p');
        const input = newsletter.querySelector('input');
        const btn = newsletter.querySelector('button');
        if (btn) btn.classList.add('cta-btn');

        gsap.fromTo(heading, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: premiumEase, scrollTrigger: { trigger: newsletter, start: "top 85%" }});
        gsap.fromTo(p, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: premiumEase, scrollTrigger: { trigger: newsletter, start: "top 85%" }});
        gsap.fromTo(input, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, delay: 0.2, ease: premiumEase, scrollTrigger: { trigger: newsletter, start: "top 85%" }});
        gsap.fromTo(btn, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: premiumEase, scrollTrigger: { trigger: newsletter, start: "top 85%" }});
    }

    // --- PROMISE SECTION IMAGES ---
    const promiseImages = document.querySelectorAll('.rounded-t-\\[150px\\], .rounded-r-\\[150px\\]');
    promiseImages.forEach((imgWrap, i) => {
        gsap.fromTo(imgWrap, 
            { y: i % 2 === 0 ? 40 : -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: i * 0.15, ease: premiumEase, scrollTrigger: { trigger: imgWrap.parentElement, start: "top 85%" }}
        );
    });

    // Blog flex grids
    const blogFlexGrids = document.querySelectorAll('.flex.flex-col.gap-6.md\\:gap-8');
    blogFlexGrids.forEach(grid => {
        const cards = grid.querySelectorAll('a');
        if (cards.length > 0) {
            gsap.fromTo(cards, 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: premiumEase, scrollTrigger: { trigger: grid, start: "top 85%" }}
            );
        }
    });

    // Beauty Tips Alternate Reveal
    const beautyTipsSection = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Tips'))?.closest('section');
    if (beautyTipsSection) {
        const beautyTips = beautyTipsSection.querySelectorAll('.grid > a, .grid > div');
        if (beautyTips.length > 0) {
            beautyTips.forEach((tip, i) => {
                gsap.fromTo(tip, 
                    { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: premiumEase, scrollTrigger: { trigger: tip.parentElement, start: "top 85%" }}
                );
            });
        }
    }

    // --- REVIEWS MARQUEE DUPLICATION ---
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Clone the original cards and append them
        const cards = Array.from(marqueeContent.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            marqueeContent.appendChild(clone);
        });
    }

    // Stars fade in trigger
    if (marqueeContent) {
        ScrollTrigger.create({
            trigger: marqueeContent,
            start: "top 85%",
            onEnter: () => {
                marqueeContent.querySelectorAll('.review-card').forEach(card => card.classList.add('stars-visible'));
            }
        });
    }

    // --- SMOKY TEXT ANIMATION ---
    const smokyTexts = document.querySelectorAll('.smoky-text');
    smokyTexts.forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        
        // Wrap characters in span, keep spaces as text nodes to avoid width issues
        const chars = text.split('').map(char => {
            if (char === ' ') return ' ';
            return `<span style="display:inline-block; opacity:0; filter:blur(12px); transform:translateY(20px) scale(1.1);">${char}</span>`;
        }).join('');
        
        el.innerHTML = chars;
        
        const spans = el.querySelectorAll('span');
        gsap.to(spans, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            scale: 1,
            duration: 1.5,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%"
            }
        });
    });
