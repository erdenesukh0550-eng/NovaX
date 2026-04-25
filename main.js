/* ===========================
   NovaX – main.js (FIXED)
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll helper
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Smooth scroll for navbar links + close mobile nav
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href').replace('#', '');
      if (id) {
        event.preventDefault();
        scrollToSection(id);
      }
      navLinks?.classList.remove('open');
    });
  });

  // Buttons with data-scroll
  document.querySelectorAll('[data-scroll]').forEach(button => {
    button.addEventListener('click', () => {
      scrollToSection(button.dataset.scroll);
    });
  });

  // NAV CTA (Захиалах button)
  document.querySelector('.nav-cta')?.addEventListener('click', () => {
    scrollToSection('contact');
  });

  // Service tab switcher
  function showService(type, el) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.classList.remove('active');
    });

    document.querySelectorAll('.service-detail').forEach(detail => {
      detail.classList.remove('visible');
    });

    el.classList.add('active');

    const detail = document.getElementById('detail-' + type);
    if (detail) {
      detail.classList.add('visible');
    }
  }

  document.querySelectorAll('.service-card[data-service]').forEach(card => {
    card.addEventListener('click', () => {
      showService(card.dataset.service, card);
    });
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(
    '.service-card, .eq-card, .project-row, .about-block, .contact-opt'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });
  }
});
