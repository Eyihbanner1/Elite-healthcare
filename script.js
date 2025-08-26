// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize all functionality
    try {
        initHeroSlider();
        initStatsAnimation();
        initScrollAnimations();
        initMobileMenu();
        initSmoothScrolling();
        initHeaderScroll();
        initImageErrorHandling();
        initAboutUsTabs();
        initDirectionalHover();
        initJobApplicationForm();
        // Temporarily disable loading animation to test
        // initLoadingAnimation();
        console.log('All functions initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Hero Slider Functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Check if this page has a hero slider (for pages like index.html)
    if (!slides.length) {
        // This page doesn't have a hero slider (like job-center.html), skip initialization
        return;
    }
    
    // Check if all required slider elements exist
    if (!dots.length || !prevBtn || !nextBtn) {
        console.warn('Hero slider elements incomplete - missing controls');
        return;
    }
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        // Update current slide index
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slideCount;
        showSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(prevIndex);
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            startSlideshow();
        });
    });

    // Pause slideshow on hover
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);

    // Start the slideshow
    startSlideshow();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopSlideshow();
            startSlideshow();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopSlideshow();
            startSlideshow();
        }
    });
}

// Statistics Counter Animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepValue = target / steps;
            const stepTime = duration / steps;
            let current = 0;

            const counter = setInterval(() => {
                current += stepValue;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                stat.textContent = Math.floor(current);
            }, stepTime);
        });
        
        animated = true;
    }

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Scroll-based animations
function initScrollAnimations() {
    // Simple fade-in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Observe feature items for stagger animation
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    // Get all navigation links including dropdown menu items
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight - 20; // Extra 20px offset
                
                // Close mobile menu if it's open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
                
                // Close any open dropdown menus
                const dropdownMenus = document.querySelectorAll('.dropdown-menu');
                dropdownMenus.forEach(dropdown => {
                    dropdown.style.display = 'none';
                });
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add a brief highlight effect to the target section
                target.style.transition = 'background-color 0.3s ease';
                const originalBg = getComputedStyle(target).backgroundColor;
                target.style.backgroundColor = 'rgba(44, 90, 160, 0.1)';
                setTimeout(() => {
                    target.style.backgroundColor = originalBg;
                    setTimeout(() => {
                        target.style.transition = '';
                    }, 300);
                }, 300);
            }
        });
    });
    
    // Handle dropdown menu interactions
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) { // Only on desktop
                dropdownMenu.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) { // Only on desktop
                dropdownMenu.style.display = 'none';
            }
        });
        
        // Handle click for mobile
        const dropdownLink = dropdown.querySelector('.nav-link');
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isVisible = dropdownMenu.style.display === 'block';
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
                // Toggle current dropdown
                dropdownMenu.style.display = isVisible ? 'none' : 'block';
            }
        });
    });
}

// Header Background Change on Scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.classList.remove('scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }

    // Throttle scroll event for better performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Loading Animation
function initLoadingAnimation() {
    // Check if loading overlay already exists
    let loadingOverlay = document.querySelector('.loading-overlay');
    
    if (!loadingOverlay) {
        // Create loading overlay
        loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loadingOverlay);
        
        console.log('Loading overlay created');
    }
    
    // Function to remove loading overlay
    function removeLoadingOverlay() {
        if (loadingOverlay && loadingOverlay.parentNode) {
            console.log('Removing loading overlay');
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                if (loadingOverlay && loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                    console.log('Loading overlay removed');
                }
            }, 500);
        }
    }
    
    // Remove on window load
    if (document.readyState === 'complete') {
        // Page already loaded
        setTimeout(removeLoadingOverlay, 500);
    } else {
        // Wait for page to load
        window.addEventListener('load', () => {
            setTimeout(removeLoadingOverlay, 500);
        });
        
        // Fallback: Remove after 2 seconds
        setTimeout(removeLoadingOverlay, 2000);
    }
}

// Utility Functions

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Form Validation and Interaction (if forms are added)
function initFormInteractions() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', () => {
                validateField(input);
            });
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form is valid, submitting...');
                // Add your form submission logic here
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Update field styling based on validation
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
        if (errorElement) {
            errorElement.remove();
        }
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        
        if (!errorElement) {
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = errorMessage;
            field.parentElement.appendChild(error);
        } else {
            errorElement.textContent = errorMessage;
        }
    }
    
    return isValid;
}

// Parallax Effect for Hero Background
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = scrolled * 0.5;
            
            heroSection.style.transform = `translateY(${parallaxSpeed}px)`;
        }, 10));
    }
}

// Add custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .stat-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// Initialize additional features when page is fully loaded
window.addEventListener('load', () => {
    // Add any additional initialization here
    initParallaxEffect();
    
    // Add CSS for custom cursor if implemented
    const cursorStyles = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(44, 90, 160, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        }
        
        .custom-cursor.cursor-hover {
            width: 40px;
            height: 40px;
            background: rgba(231, 76, 60, 0.3);
        }
    `;
    
    // Only add cursor on non-touch devices
    if (!('ontouchstart' in window)) {
        const style = document.createElement('style');
        style.textContent = cursorStyles;
        document.head.appendChild(style);
        // initCustomCursor(); // Uncomment to enable custom cursor
    }
});

// Error handling for images
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
        
        img.addEventListener('error', () => {
            img.classList.remove('loading');
            img.classList.add('error');
            
            // If no onerror attribute is set, use default fallback
            if (!img.hasAttribute('onerror')) {
                const width = img.getAttribute('width') || '100%';
                const height = img.getAttribute('height') || '100%';
                const altText = img.alt || 'Image not available';
                
                img.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#f8f9fa"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
                              font-family="Arial, sans-serif" font-size="16" fill="#99a3af">
                            ${altText}
                        </text>
                    </svg>
                `)}`;
            }
        });
        
        // Preload images with retry mechanism
        if (img.src && !img.complete) {
            const preloadImg = new Image();
            preloadImg.onload = () => {
                img.src = preloadImg.src;
            };
            preloadImg.onerror = () => {
                img.dispatchEvent(new Event('error'));
            };
            preloadImg.src = img.src;
        }
    });
}

// About Us Tab Navigation Functionality
function initAboutUsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.about-tab-content');
    
    // Check if elements exist
    if (!tabButtons.length || !tabContents.length) {
        console.warn('About Us tab elements not found');
        return;
    }
    
    // Function to show specific tab
    function showTab(tabName) {
        // Remove active class from all tabs and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeContent = document.querySelector(`.about-tab-content[data-tab="${tabName}"]`);
        
        if (activeTab && activeContent) {
            activeTab.classList.add('active');
            activeContent.classList.add('active');
        }
        
        // Smooth scroll to top of about section on tab change
        const aboutSection = document.querySelector('.about-us-section');
        if (aboutSection) {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            if (tabName) {
                showTab(tabName);
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only handle keyboard navigation when about section is in view
        const aboutSection = document.querySelector('.about-us-section');
        if (!aboutSection) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (!isInView) return;
        
        const activeTab = document.querySelector('.tab-btn.active');
        if (!activeTab) return;
        
        const tabs = Array.from(tabButtons);
        const currentIndex = tabs.indexOf(activeTab);
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            const prevTab = tabs[prevIndex];
            if (prevTab) {
                const tabName = prevTab.getAttribute('data-tab');
                showTab(tabName);
            }
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            const nextTab = tabs[nextIndex];
            if (nextTab) {
                const tabName = nextTab.getAttribute('data-tab');
                showTab(tabName);
            }
        }
    });
    
    // Auto-tab cycling (optional - can be disabled)
    let autoTabInterval;
    const AUTO_TAB_DELAY = 10000; // 10 seconds
    const AUTO_TAB_ENABLED = false; // Set to true to enable auto-cycling
    
    function startAutoTabCycling() {
        if (!AUTO_TAB_ENABLED) return;
        
        autoTabInterval = setInterval(() => {
            const activeTab = document.querySelector('.tab-btn.active');
            if (!activeTab) return;
            
            const tabs = Array.from(tabButtons);
            const currentIndex = tabs.indexOf(activeTab);
            const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            const nextTab = tabs[nextIndex];
            
            if (nextTab) {
                const tabName = nextTab.getAttribute('data-tab');
                showTab(tabName);
            }
        }, AUTO_TAB_DELAY);
    }
    
    function stopAutoTabCycling() {
        if (autoTabInterval) {
            clearInterval(autoTabInterval);
        }
    }
    
    // Start auto-cycling if enabled
    if (AUTO_TAB_ENABLED) {
        startAutoTabCycling();
        
        // Pause auto-cycling on hover
        const aboutSection = document.querySelector('.about-us-section');
        if (aboutSection) {
            aboutSection.addEventListener('mouseenter', stopAutoTabCycling);
            aboutSection.addEventListener('mouseleave', startAutoTabCycling);
        }
        
        // Stop auto-cycling when user interacts
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                stopAutoTabCycling();
                // Restart after a delay
                setTimeout(startAutoTabCycling, AUTO_TAB_DELAY);
            });
        });
    }
    
    // Initialize first tab as active (should already be set in HTML)
    const firstTab = tabButtons[0];
    if (firstTab && !document.querySelector('.tab-btn.active')) {
        const tabName = firstTab.getAttribute('data-tab');
        showTab(tabName);
    }
    
    console.log('About Us tab navigation initialized successfully');
}

// Directional Hover Effect for All Interactive Cards (Matching Why Choose Elite Healthcare Style)
function initDirectionalHover() {
    // Select all interactive cards including tab navigation cards
    const cards = document.querySelectorAll('.why-choose-card, .highlight-item, .people-card, .governance-card, .training-step');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const direction = getHoverDirection(e, this);
            
            // Remove all previous direction classes
            this.classList.remove('hover-left', 'hover-right', 'hover-top', 'hover-bottom');
            
            // Add the appropriate direction class for entry (matching why-choose-card behavior)
            this.classList.add(`hover-${direction}`);
        });
        
        card.addEventListener('mouseleave', function(e) {
            // Remove hover classes when mouse leaves (simple cleanup)
            this.classList.remove('hover-left', 'hover-right', 'hover-top', 'hover-bottom');
        });
    });
}

// Function to calculate hover direction
function getHoverDirection(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    
    // Calculate distances from each edge
    const distanceFromLeft = x;
    const distanceFromRight = width - x;
    const distanceFromTop = y;
    const distanceFromBottom = height - y;
    
    // Find the minimum distance to determine entry direction
    const minDistance = Math.min(
        distanceFromLeft,
        distanceFromRight,
        distanceFromTop,
        distanceFromBottom
    );
    
    if (minDistance === distanceFromLeft) return 'left';
    if (minDistance === distanceFromRight) return 'right';
    if (minDistance === distanceFromTop) return 'top';
    return 'bottom';
}

// Initialize image error handling
initImageErrorHandling();

// Job Application Form Functionality
function initJobApplicationForm() {
    const form = document.querySelector('.job-application-form');
    if (!form) return; // Exit if form doesn't exist on current page
    
    const steps = document.querySelectorAll('.form-step');
    const nextBtn = document.querySelector('.next-step');
    const prevBtn = document.querySelector('.prev-step');
    const submitBtn = document.querySelector('.submit-application');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    let currentStep = 0;
    
    // Function to show specific step
    function showStep(stepIndex) {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        progressSteps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        if (steps[stepIndex]) {
            steps[stepIndex].classList.add('active');
        }
        if (progressSteps[stepIndex]) {
            progressSteps[stepIndex].classList.add('active');
        }
        
        // Update button visibility
        prevBtn.style.display = stepIndex > 0 ? 'inline-block' : 'none';
        nextBtn.style.display = stepIndex < steps.length - 1 ? 'inline-block' : 'none';
        submitBtn.style.display = stepIndex === steps.length - 1 ? 'inline-block' : 'none';
    }
    
    // Function to validate current step
    function validateStep(stepIndex) {
        const currentStepElement = steps[stepIndex];
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (field.type === 'checkbox') {
                const checkboxGroup = currentStepElement.querySelectorAll(`input[name="${field.name}"]`);
                const isChecked = Array.from(checkboxGroup).some(cb => cb.checked);
                if (!isChecked && field.hasAttribute('required')) {
                    isValid = false;
                    field.style.borderColor = '#ff6b6b';
                }
            } else if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff6b6b';
            } else {
                field.style.borderColor = '';
            }
        });
        
        return isValid;
    }
    
    // Next step functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            } else {
                alert('Please fill in all required fields before proceeding.');
            }
        });
    }
    
    // Previous step functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }
    
    // Form submission
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                // Collect form data
                const formData = new FormData(form);
                
                // Show success message
                alert('Thank you for your application! We will review your submission and contact you within 5-7 business days.');
                
                // Reset form (optional)
                form.reset();
                currentStep = 0;
                showStep(currentStep);
                
                // Scroll to top of form
                form.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Please complete all required fields.');
            }
        });
    }
    
    // File upload validation
    const fileInput = document.querySelector('#resume');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const maxSize = 5 * 1024 * 1024; // 5MB
                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                
                if (file.size > maxSize) {
                    alert('File size must be less than 5MB');
                    e.target.value = '';
                    return;
                }
                
                if (!allowedTypes.includes(file.type)) {
                    alert('Please upload a PDF, DOC, or DOCX file');
                    e.target.value = '';
                    return;
                }
            }
        });
    }
    
    // Initialize first step
    showStep(0);
}
