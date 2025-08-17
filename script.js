// Theme management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
        this.setupSystemThemeListener();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    }

    setupToggle() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            observerOptions
        );

        // Observe elements that should animate
        const animatedElements = document.querySelectorAll(
            '.hero-content, .section-header, .project-card, .contact-card, .skill-item'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createMobileMenuButton();
        this.setupEventListeners();
    }

    createMobileMenuButton() {
        const headerRight = document.querySelector('.header-right');
        const nav = document.querySelector('.nav');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
        
        // Insert before theme toggle
        const themeToggle = document.getElementById('themeToggle');
        headerRight.insertBefore(mobileMenuBtn, themeToggle);
        
        // Add mobile menu styles
        this.addMobileMenuStyles();
    }

    addMobileMenuStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-btn {
                display: block;
                width: 2.25rem;
                height: 2.25rem;
                border: none;
                background: none;
                cursor: pointer;
                border-radius: 0.375rem;
                color: var(--text-secondary);
                transition: background-color 0.3s ease;
            }
            
            .mobile-menu-btn:hover {
                background-color: var(--bg-tertiary);
            }
            
            @media (min-width: 768px) {
                .mobile-menu-btn {
                    display: none;
                }
            }
            
            .nav.mobile-open {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--bg-secondary);
                border-top: 1px solid var(--border-color);
                padding: 1rem;
                gap: 1rem;
            }
            
            @media (min-width: 768px) {
                .nav.mobile-open {
                    position: static;
                    flex-direction: row;
                    background: none;
                    border: none;
                    padding: 0;
                    gap: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.isOpen = !this.isOpen;
                nav.classList.toggle('mobile-open', this.isOpen);
                mobileMenuBtn.innerHTML = this.isOpen ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });
        }

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.isOpen = false;
                nav.classList.remove('mobile-open');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
}

// Form handling (for contact buttons)
class ContactHandler {
    constructor() {
        this.init();
    }

    init() {
        const contactButtons = document.querySelectorAll('.btn');
        contactButtons.forEach(btn => {
            if (btn.textContent.includes('Skontaktuj się') || 
                btn.textContent.includes('Napisz do mnie')) {
                btn.addEventListener('click', this.handleContact.bind(this));
            }
            
            if (btn.textContent.includes('GitHub')) {
                btn.addEventListener('click', () => {
                    window.open('https://github.com', '_blank');
                });
            }
            
            if (btn.textContent.includes('LinkedIn')) {
                btn.addEventListener('click', () => {
                    window.open('https://linkedin.com', '_blank');
                });
            }
        });
    }

    handleContact(e) {
        e.preventDefault();
        const email = 'erikk777coding@gmail.com';
        const subject = 'Kontakt ze strony portfolio';
        const body = 'Cześć Erik,\n\nPiszę w sprawie...';
        
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize all components
    new ThemeManager();
    new SmoothScroll();
    new ScrollAnimations();
    new MobileMenu();
    new ContactHandler();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        const nav = document.querySelector('.nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (nav) nav.classList.remove('mobile-open');
        if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});