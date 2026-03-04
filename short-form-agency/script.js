document.addEventListener('DOMContentLoaded', () => {

    // ===================================
    // Smooth Scroll Navigation
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 72;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ===================================
    // Scroll Reveal Animation
    // ===================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ===================================
    // Counter Animation
    // ===================================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    if (counter.dataset.animated) return;
                    counter.dataset.animated = 'true';
                    animateCounter(counter);
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.stats-grid, .kpi-grid').forEach(el => {
        counterObserver.observe(el);
    });

    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ===================================
    // Testimonial Carousel
    // ===================================
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (track && dotsContainer) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        let autoplayInterval;

        // Create dots
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }

        function updateDots() {
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            goToSlide(currentIndex);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });

        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        startAutoplay();

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        track.addEventListener('mouseleave', startAutoplay);

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoplayInterval);
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
            startAutoplay();
        }, { passive: true });
    }

    // ===================================
    // Mobile Menu
    // ===================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.querySelector('.mobile-menu-close');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ===================================
    // Contact Form
    // ===================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = '전송 완료 <i class="fas fa-check"></i>';
            btn.style.background = 'var(--accent)';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                this.reset();
            }, 2500);
        });
    }

    // ===================================
    // Logo Marquee pause on hover
    // ===================================
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        logoTrack.addEventListener('mouseenter', () => {
            logoTrack.style.animationPlayState = 'paused';
        });
        logoTrack.addEventListener('mouseleave', () => {
            logoTrack.style.animationPlayState = 'running';
        });
    }

});
