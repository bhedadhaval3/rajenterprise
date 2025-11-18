document.addEventListener('DOMContentLoaded', () => {
    // Auto-update year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(`
                .raj-section-title, .raj-core-title, .solarwind-title, .section-title,
                .raj-intro-text, .raj-intro-image, .raj-solution-card,
                .raj-mission, .raj-vision, .raj-core-card, .raj-clients-logos,
                .solarwind-services, .solarwind-project-card, 
                .contact-info, .contact-form, .raj-footer-col
            `).forEach(el => observer.observe(el));

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('header nav ul');

    if (hamburger && navUl) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navUl.classList.toggle('open');
        });

        document.querySelectorAll('header nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navUl.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navUl.contains(e.target)) {
                hamburger.classList.remove('active');
                navUl.classList.remove('open');
            }
        });
    }

    // Smooth scroll with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            const headerH = 80;

            if (target) {
                const pos = target.getBoundingClientRect().top + window.pageYOffset - headerH;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // Header shadow on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.style.boxShadow = '0 6px 20px rgba(0,0,0,.15)';
        } else {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,.1)';
        }
    });

    // Contact form feedback
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            const btn = form.querySelector('button[type="submit"]');
            const txt = btn.textContent;

            btn.textContent = 'Sending...';
            btn.style.background = '#28a745';

            setTimeout(() => {
                btn.textContent = 'Message Sent ✓';
                setTimeout(() => {
                    btn.textContent = txt;
                    btn.style.background = '#007bff';
                }, 2000);
            }, 1000);
        });
    }
});
