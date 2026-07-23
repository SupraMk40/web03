
    (function() {
      'use strict';

      // ------------------------------------------------------------
      // SCROLL REVEAL (IntersectionObserver)
      // ------------------------------------------------------------
      const revealElements = document.querySelectorAll('.reveal');
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => revealObserver.observe(el));

      // ------------------------------------------------------------
      // HEADER SCROLL SHADOW
      // ------------------------------------------------------------
      const header = document.querySelector('.header');
      let lastScroll = 0;

      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        lastScroll = y;
      }, { passive: true });

      // ------------------------------------------------------------
      // MOBILE MENU
      // ------------------------------------------------------------
      const hamburger = document.querySelector('.hamburger');
      const overlay = document.querySelector('.mobile-overlay');
      const overlayLinks = overlay.querySelectorAll('a');

      function toggleMenu(open) {
        const isOpen = open !== undefined ? open : !overlay.classList.contains('open');
        overlay.classList.toggle('open', isOpen);
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }

      hamburger.addEventListener('click', () => toggleMenu());

      overlayLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
      });

      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
          toggleMenu(false);
        }
      });

      // Close on backdrop click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          toggleMenu(false);
        }
      });

      // ------------------------------------------------------------
      // FAQ ACCORDION
      // ------------------------------------------------------------
      const faqItems = document.querySelectorAll('.faq-item');

      faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        button.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');

          // Close all
          faqItems.forEach(other => {
            other.classList.remove('open');
            other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          });

          // Toggle current
          if (!isOpen) {
            item.classList.add('open');
            button.setAttribute('aria-expanded', 'true');
          }
        });

        // Keyboard: Enter and Space
        button.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
          }
        });
      });

      // ------------------------------------------------------------
      // SMOOTH SCROLL FOR ANCHOR LINKS
      // ------------------------------------------------------------
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
            window.scrollTo({
              top: targetPos,
              behavior: 'smooth'
            });
          }
        });
      });

    })();
  
