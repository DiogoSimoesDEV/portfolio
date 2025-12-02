// ============================================
// SMOOTH SCROLL & NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// TYPING EFFECT
// ============================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                typingText.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ============================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    const aosType = el.getAttribute('data-aos');
    const delay = el.getAttribute('data-aos-delay') || 0;
    
    if (aosType === 'fade-up') {
        el.style.transform = 'translateY(50px)';
    } else if (aosType === 'fade-right') {
        el.style.transform = 'translateX(-50px)';
    } else if (aosType === 'fade-left') {
        el.style.transform = 'translateX(50px)';
    } else if (aosType === 'zoom-in') {
        el.style.transform = 'scale(0.8)';
    }
    
    el.style.transitionDelay = delay + 'ms';
    observer.observe(el);
});

// ============================================
// ANIMATED COUNTER FOR STATS
// ============================================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            animateCounter(statNumber, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// ============================================
// PARALLAX EFFECT
// ============================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelector('.particles-background');
    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Header shadow on scroll
    const header = document.querySelector('header');
    if (scrolled > 100) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
    } else {
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = scrolled;
});

// ============================================
// TECH SHOWCASE INTERACTIVE
// ============================================
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.6)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 10px 20px rgba(139, 92, 246, 0.3)';
    });
});

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PROJECT CARD HOVER EFFECT (Simplified - no tilt)
// ============================================
// Tilt effect removed as requested - cards now only have simple hover effects via CSS

// ============================================
// DYNAMIC PARTICLES
// ============================================
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        z-index: 0;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: floatParticle ${5 + Math.random() * 5}s infinite ease-in-out;
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 10000);
};

// Create particles periodically
setInterval(createParticle, 3000);

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// TIMELINE ANIMATION
// ============================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// ============================================
// SKILL CARD HOVER EFFECTS
// ============================================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'float 3s ease-in-out infinite, pulse 1s ease-in-out';
            }, 10);
        }
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
let ticking = false;

const onScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', onScroll, { passive: true });

// ============================================
// INITIAL LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Hello! Interested in my code?', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%cCheck out my GitHub: github.com/seu-usuario', 'color: #06b6d4; font-size: 14px;');

