// ═══════════════════════════════════════
// EduPilot Suite — Landing Page Scripts
// ═══════════════════════════════════════

// Navigation scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  links.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
  });
});

// Intersection Observer for fade-up animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Animate progress bars when visible
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.progress-fill');
      bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width + '%';
        }
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.vis-card').forEach(card => {
  // Initialize progress bars at 0
  card.querySelectorAll('.progress-fill').forEach(bar => {
    bar.style.width = '0%';
  });
  barObserver.observe(card);
});

// Smooth scroll - let native CSS handle it, just ensure proper navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.location.hash = href;
    }
  });
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--white)';
    }
  });
});

// Add subtle parallax to hero dashboard
const heroDashboard = document.querySelector('.hero-dashboard');
if (heroDashboard && window.matchMedia('(min-width: 1024px)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < 800) {
      heroDashboard.style.transform = `translateY(${scrolled * 0.03}px)`;
    }
  });
}

// Counter animation for mock stats
function animateCounters() {
  const stats = document.querySelectorAll('.mock-stat .val');
  stats.forEach(stat => {
    const text = stat.textContent;
    const num = parseInt(text.replace(/[^0-9]/g, ''));
    const suffix = text.replace(/[0-9]/g, '');
    if (!isNaN(num) && num > 0 && !stat.dataset.animated) {
      stat.dataset.animated = 'true';
      let current = 0;
      const step = Math.ceil(num / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= num) {
          current = num;
          clearInterval(timer);
        }
        stat.textContent = current + suffix;
      }, 30);
    }
  });
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(animateCounters, 500);
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);
