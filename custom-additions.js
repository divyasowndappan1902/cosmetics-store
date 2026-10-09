document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- ABOUT PAGE ANIMATIONS ---
        
        // Formulation Lab
        const formulationContainer = document.querySelector('.formulation-steps-container');
        if (formulationContainer) {
            const steps = document.querySelectorAll('.formulation-step');
            const progressLine = document.querySelector('.formulation-line-progress');
            
            // Image scroll effect
            gsap.to('.formulation-img', {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.formulation-img-wrapper',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Line progress
            if (progressLine) {
                gsap.to(progressLine, {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: formulationContainer,
                        start: 'top 60%',
                        end: 'bottom 80%',
                        scrub: true
                    }
                });
            }

            // Steps reveal
            steps.forEach((step, i) => {
                gsap.to(step, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%'
                    }
                });
            });
        }

        // Beauty by Numbers
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length > 0) {
            statCards.forEach((card, i) => {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        onEnter: () => {
                            // Run counter
                            const counterInt = card.querySelector('.counter');
                            const counterFloat = card.querySelector('.counter-float');
                            
                            if (counterInt) {
                                const target = parseInt(counterInt.getAttribute('data-target'));
                                gsap.to(counterInt, {
                                    innerText: target,
                                    duration: 2,
                                    snap: { innerText: 1 },
                                    ease: 'power2.out'
                                });
                            }
                            if (counterFloat) {
                                const target = parseFloat(counterFloat.getAttribute('data-target'));
                                gsap.to(counterFloat, {
                                    innerText: target,
                                    duration: 2,
                                    snap: { innerText: 0.1 },
                                    ease: 'power2.out'
                                });
                            }
                        }
                    }
                });
            });
        }

        // --- SERVICES PAGE ANIMATIONS ---

        // Your Beauty Journey
        const journeyContainer = document.querySelector('.journey-timeline-container');
        if (journeyContainer) {
            const steps = document.querySelectorAll('.journey-step');
            const progressLines = document.querySelectorAll('.journey-line-progress');
            
            progressLines.forEach(line => {
                gsap.to(line, {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: journeyContainer,
                        start: 'top 60%',
                        end: 'bottom 80%',
                        scrub: true
                    }
                });
            });

            steps.forEach((step, i) => {
                gsap.to(step, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 85%'
                    }
                });
            });
        }

        // Beauty Transformations
        const transformCards = document.querySelectorAll('.transform-card');
        if (transformCards.length > 0) {
            transformCards.forEach((card, i) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                });
            });
        }

        // --- BLOG PAGE ANIMATIONS ---

        // Beauty Guides
        const guideCards = document.querySelectorAll('.guide-card');
        if (guideCards.length > 0) {
            guideCards.forEach((card, i) => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    }
                });
            });
        }
    }

    // --- ACCORDION INTERACTION ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const btn = item.querySelector('.faq-btn');
            const content = item.querySelector('.faq-content');
            const icon = item.querySelector('.faq-icon i');
            const iconContainer = item.querySelector('.faq-icon');

            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = '0px';
                    otherItem.querySelector('.faq-icon i').className = 'fa-solid fa-plus';
                    otherItem.querySelector('.faq-icon').classList.remove('bg-[#38251E]', 'text-[#FDF9F2]');
                    otherItem.querySelector('.faq-icon').classList.add('text-[#38251E]');
                });

                // Open this if it wasn't open
                if (!isOpen) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.className = 'fa-solid fa-xmark';
                    iconContainer.classList.remove('text-[#38251E]');
                    iconContainer.classList.add('bg-[#38251E]', 'text-[#FDF9F2]');
                }
            });
        });
    }
});
