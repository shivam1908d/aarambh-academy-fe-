/* Northstar Academy - interaction layer */
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('#mainNav');
    const backToTop = document.querySelector('#backToTop');
    const inquiryForm = document.querySelector('#inquiryForm');
    const newsletterForm = document.querySelector('#newsletterForm');

    // Smooth scrolling for same-page navigation links.
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            if (nav.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(nav).hide();
            }
        });
    });

    // Highlight the current section in the navigation while scrolling.
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));

    // Filter the course cards by program type.
    document.querySelectorAll('.filter-btn').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            document.querySelectorAll('.course-item').forEach((card) => {
                card.classList.toggle('d-none', filter !== 'all' && card.dataset.category !== filter);
            });
        });
    });

    // Reveal the floating back-to-top control after the first viewport.
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Keep the demo form local and provide a clear confirmation state.
    inquiryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const status = inquiryForm.querySelector('.form-status');
        status.textContent = 'Thanks! We will call you within one working day.';
        inquiryForm.reset();
    });

    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = newsletterForm.querySelector('input');
        input.value = 'You are on the list. Thank you!';
        input.disabled = true;
        newsletterForm.querySelector('button').disabled = true;
    });
});