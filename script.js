/* ==============================================================
   ALL-IN-ONE JS – fully responsive, smooth scroll, particles,
   IntersectionObserver animations, header shadow, form feedback
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------
    // 1. INTERSECTION OBSERVER – fade-in on scroll
    // --------------------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(`
        .raj-section-title, .raj-core-title, .solarwind-title,
        .raj-intro-text, .raj-intro-image, .raj-solution-card,
        .raj-mission, .raj-vision, .raj-core-card, .raj-clients-logos,
        .solarwind-services, .solarwind-service-list,
        .solarwind-project-card, .contact-info, .contact-form,
        .raj-footer-col
    `).forEach(el => observer.observe(el));

    // --------------------------------------------------------------
    // 2. MOBILE MENU TOGGLE
    // --------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('header nav ul');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();               // prevent document-click handler
            hamburger.classList.toggle('active');
            navUl.classList.toggle('open');
        });

        // close when clicking a nav link
        document.querySelectorAll('header nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navUl.classList.remove('open');
            });
        });

        // close when clicking outside the menu
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navUl.contains(e.target)) {
                hamburger.classList.remove('active');
                navUl.classList.remove('open');
            }
        });
    }

    // --------------------------------------------------------------
    // 3. SMOOTH SCROLL (with fixed-header offset)
    // --------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            const headerH = 80;                         // matches header height

            if (target) {
                const pos = target.getBoundingClientRect().top + window.pageYOffset - headerH;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }

            // close mobile menu after navigation
            if (hamburger && navUl) {
                hamburger.classList.remove('active');
                navUl.classList.remove('open');
            }
        });
    });

    // --------------------------------------------------------------
    // 4. HEADER SHADOW ON SCROLL
    // --------------------------------------------------------------
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 6px 20px rgba(0,0,0,.15)';
        } else {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,.1)';
        }
    });

    // --------------------------------------------------------------
    // 5. FLOATING PARTICLES (hero background)
    // --------------------------------------------------------------
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const count = 30;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';

            const size = Math.random() * 5 + 2;
            p.style.width = p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;

            const dur = Math.random() * 15 + 10;
            const del = Math.random() * 8;
            p.style.animation = `float ${dur}s linear infinite`;
            p.style.animationDelay = `-${del}s`;

            particlesContainer.appendChild(p);
        }
    }

    // --------------------------------------------------------------
    // 6. CONTACT FORM FEEDBACK (fake success)
    // --------------------------------------------------------------
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            const btn = form.querySelector('button[type="submit"]');
            const txt = btn.textContent;

            btn.textContent = 'Sending...';
            btn.style.background = '#28a745';

            setTimeout(() => {
                btn.textContent = 'Message Sent';
                setTimeout(() => {
                    btn.textContent = txt;
                    btn.style.background = '#007bff';
                }, 2000);
            }, 1000);
        });
    }
});
// Auto-update year
document.getElementById("year").textContent = new Date().getFullYear();