/* ===========================
   NovaX – main.js (FIXED)
   =========================== */

// Smooth scroll helper
function scrollTo(id) {
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
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ✅ NAV CTA (Захиалах button FIX)
document.querySelector('.nav-cta')?.addEventListener('click', () => {
  scrollTo('contact');
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

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  '.service-card, .eq-card, .project-row, .about-block, .contact-opt'
);

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