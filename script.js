/**
 * =========================================================================
 * KARAN PRAJAPATI PORTFOLIO INTERACTIVITY SCRIPT
 * High-performance, clean vanilla JS with responsive controls
 * =========================================================================
 */

/**
 * 📊 GOOGLE SHEETS INTEGRATION URL:
 * Paste your Google Apps Script Web App URL between the quotes below:
 * Example: const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
 */
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzrIgvrqazLkZXu2sfsCw8f6JStxDm-IbajTtCWhaNJC2MwIyBTiTPPT7wNxRhkzzL9/exec";

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. MOBILE NAVIGATION TOGGLE
       ========================================================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-item');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && navContainer && menuIcon) {
        const toggleMenu = () => {
            const isActive = navContainer.classList.toggle('active');
            if (isActive) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close menu when navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navContainer.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Close menu when mobile CTA button is clicked
        const mobileCta = navContainer.querySelector('.nav-cta-btn');
        if (mobileCta) {
            mobileCta.addEventListener('click', () => {
                if (navContainer.classList.contains('active')) {
                    toggleMenu();
                }
            });
        }

        // Auto-close menu if resized to desktop/tablet
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    /* =========================================================================
       2. DYNAMIC STICKY NAVBAR & BACK-TO-TOP BUTTON
       ========================================================================= */
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    let lastScrollTop = 0;
    const scrollThreshold = 40;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add solid/shadow class when scrolled away from top
        if (scrollTop > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/Hide back-to-top button
        if (backToTopBtn) {
            if (scrollTop > 450) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Hide/Show navbar on downward/upward scroll
        if (Math.abs(lastScrollTop - scrollTop) > scrollThreshold) {
            if (scrollTop > lastScrollTop && scrollTop > 120) {
                // Scrolling down
                navbar.classList.add('hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('hidden');
            }
            lastScrollTop = scrollTop;
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* =========================================================================
       3. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-delay');
                
                if (delay) {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, parseInt(delay, 10));
                } else {
                    el.classList.add('visible');
                }
                
                observer.unobserve(el);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================================================
       4. ACTIVE NAVIGATION LINK ON SCROLL
       ========================================================================= */
    const sections = document.querySelectorAll('section[id]');
    
    const navObserverOptions = {
        root: null,
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(sec => navObserver.observe(sec));

    /* =========================================================================
       5. SKILLS FILTERING INTERACTION
       ========================================================================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (filterButtons.length && skillCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                skillCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    /* =========================================================================
       5.1 PROJECTS FILTERING INTERACTION
       ========================================================================= */
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectFilterBtns.length && projectCards.length) {
        projectFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                projectFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-project-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-project-category') || '';
                    if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    /* =========================================================================
       6. CERTIFICATIONS CAROUSEL BUTTONS
       ========================================================================= */
    const certScrollContainer = document.getElementById('cert-scroll-container');
    const certPrevBtn = document.getElementById('cert-prev');
    const certNextBtn = document.getElementById('cert-next');

    if (certScrollContainer && certPrevBtn && certNextBtn) {
        const scrollAmount = 340; // width of card + gap

        certNextBtn.addEventListener('click', () => {
            certScrollContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        certPrevBtn.addEventListener('click', () => {
            certScrollContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    /* =========================================================================
       7. ONE-CLICK EMAIL COPY & TOAST NOTIFICATION
       ========================================================================= */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toastNotice = document.getElementById('toast-notice');
    const toastMessage = document.getElementById('toast-message');

    const showToast = (message) => {
        if (!toastNotice) return;
        if (toastMessage) toastMessage.textContent = message;
        toastNotice.classList.add('show');
        setTimeout(() => {
            toastNotice.classList.remove('show');
        }, 2800);
    };

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'karanpraja6@gmail.com';
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                }
                showToast('Email address copied to clipboard!');
            } catch (err) {
                showToast('Email: ' + email);
            }
        });
    }

    /* =========================================================================
       8. CONTACT FORM SUBMISSION TO GOOGLE SHEETS & POPUP MODAL
       ========================================================================= */
    const contactForm = document.getElementById('contactForm');
    const popupOverlay = document.getElementById('thank-you-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && popupOverlay) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Transmit Message <i class="fas fa-paper-plane"></i>';
            
            // Set loading state on button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Storing In Sheet...';
            }

            const formData = new FormData(contactForm);
            const formParams = new URLSearchParams(formData);

            // If user has provided their Google Apps Script Web App URL
            if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.trim().startsWith('http')) {
                try {
                    await fetch(GOOGLE_SHEET_URL, {
                        method: 'POST',
                        body: formParams,
                        mode: 'no-cors' // Allows sending cross-origin to Google Apps Script without CORS block
                    });
                    
                    // Show confirmation popup
                    popupOverlay.classList.remove('hidden');
                    contactForm.reset();
                    showToast('Inquiry logged into Google Sheet!');
                } catch (error) {
                    console.error('Google Sheet transmission error:', error);
                    // Still show popup to reassure visitor
                    popupOverlay.classList.remove('hidden');
                    contactForm.reset();
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHtml;
                    }
                }
            } else {
                // Default fallback if URL is not yet pasted
                console.info('Tip: Add your Google Apps Script Web App URL in script.js (GOOGLE_SHEET_URL) to save entries to Google Sheets.');
                
                // Simulate brief network delay for elegant UX
                setTimeout(() => {
                    popupOverlay.classList.remove('hidden');
                    contactForm.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHtml;
                    }
                }, 400);
            }
        });

        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', () => {
                popupOverlay.classList.add('hidden');
            });
        }

        // Close on backdrop click
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.add('hidden');
            }
        });

        // Close on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !popupOverlay.classList.contains('hidden')) {
                popupOverlay.classList.add('hidden');
            }
        });
    }

});
