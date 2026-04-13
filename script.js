document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. MOBILE MENU TOGGLE
       ========================================================================= */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-item');
    const menuIcon = mobileMenuBtn.querySelector('i');

    const toggleMenu = () => {
        const isActive = navContainer.classList.toggle('active');
        if (isActive) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            // Prevent scrolling on body when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* =========================================================================
       2. DYNAMIC STICKY HEADER (Hide on scroll down, show on up)
       ========================================================================= */
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add subtle background when not at top
        if (scrollTop > 10) {
            navbar.style.background = 'rgba(11, 15, 25, 0.85)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(11, 15, 25, 0.4)';
            navbar.style.boxShadow = 'none';
        }

        // Hide/Show logic
        if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;

        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true }); // passive flag for better mobile scroll performance

    /* =========================================================================
       3. HIGH-PERFORMANCE SCROLL REVEAL (Intersection Observer)
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal');

    // Configuration for the observer
    const revealOptions = {
        root: null, // Viewport
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element comes into view
        threshold: 0.1 // 10% of element visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                // Handle staggered animations via data-delay attribute
                const delay = el.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, parseInt(delay));
                } else {
                    el.classList.add('visible');
                }
                
                // If we only want elements to animate once, we unobserve them
                observer.unobserve(el);
            }
        });
    }, revealOptions);

    // Start observing
    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================================================
       4. SECTION HIGHLIGHT IN NAVIGATION
       ========================================================================= */
    const sections = document.querySelectorAll('section');
    
    const activeNavOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // When the section occupies the top middle
        threshold: 0
    };

    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                // Remove active from all
                document.querySelectorAll('.nav-item').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, activeNavOptions);

    sections.forEach(section => activeNavObserver.observe(section));

});