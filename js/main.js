/* ═══════════════════════════════════════════════════
   MAIN.JS — Portfolio Orchestrator
   Boot sequence, scroll effects, interactions
═══════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────
   1. BOOT SEQUENCE
──────────────────────────────────────────────────── */
(function initBoot() {
  const bootScreen = document.getElementById('boot-screen');
  const bootLines  = document.getElementById('boot-lines');
  if (!bootScreen || !bootLines) return;

  // Start code rain on boot screen
  const bootRain = new CodeRain('rain-canvas-boot', {
    fontSize: 14,
    color:    '#00d4ff',
    bgAlpha:  0.08,
    speed:    1.2,
    density:  0.6,
  });
  bootRain.start();

  const lines = [
    { text: 'PORTFOLIO_OS v2.5 — BENJAMIN MACIEL',         type: 'bold',    delay: 0    },
    { text: '─────────────────────────────────────────',   type: 'accent',  delay: 300  },
    { text: '[ OK ] Initializing BENJAMIN_MACIEL.EXE',     type: 'success', delay: 600  },
    { text: '[ OK ] Loading identity module...',           type: 'success', delay: 900  },
    { text: '[ OK ] Mounting skill database...',           type: 'success', delay: 1100 },
    { text: '[ OK ] Connecting project registry...',       type: 'success', delay: 1300 },
    { text: '[ OK ] Establishing portfolio interface...',  type: 'success', delay: 1550 },
    { text: '[ OK ] Compiling UI components...',           type: 'success', delay: 1750 },
    { text: '[ OK ] Running integrity check... PASSED',    type: 'success', delay: 2000 },
    { text: '',                                            type: '',        delay: 2200 },
    { text: '──── SYSTEM READY ────',                      type: 'accent',  delay: 2350 },
    { text: 'Welcome. The architect is online.',           type: 'bold',    delay: 2550 },
  ];

  lines.forEach(({ text, type, delay }) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = `boot-line ${type}`;
      el.textContent = text;
      bootLines.appendChild(el);
      requestAnimationFrame(() => el.classList.add('visible'));
    }, delay);
  });

  // Dismiss boot screen
  setTimeout(() => {
    bootScreen.style.transition = 'opacity 0.8s ease';
    bootScreen.style.opacity    = '0';
    bootScreen.style.pointerEvents = 'none';
    bootRain.stop();
    setTimeout(() => {
      bootScreen.style.display = 'none';
      document.body.classList.add('loaded');
    }, 800);
  }, 3200);
})();

/* ──────────────────────────────────────────────────
   2. HERO CODE RAIN
──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const heroRain = new CodeRain('rain-canvas', {
    fontSize: 13,
    color:    '#00d4ff',
    bgAlpha:  0.04,
    speed:    0.8,
    density:  0.55,
  });
  heroRain.start();

  // Resize canvas to match section
  function resizeHeroCanvas() {
    const canvas = document.getElementById('rain-canvas');
    const section = document.getElementById('hero');
    if (!canvas || !section) return;
    canvas.style.width  = '100%';
    canvas.style.height = '100%';
  }
  resizeHeroCanvas();
  window.addEventListener('resize', resizeHeroCanvas);
});

/* ──────────────────────────────────────────────────
   3. CUSTOM CURSOR
──────────────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover detection
  const hoverTargets = 'a, button, [data-hover], input, textarea, .project-card, .knowme-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });
})();

/* ──────────────────────────────────────────────────
   4. NAVBAR
──────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  if (!navbar) return;

  // Scroll class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
})();

/* ──────────────────────────────────────────────────
   5. TYPING EFFECT (HERO ROLE)
──────────────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('role-text');
  if (!el) return;

  const phrases = [
    'System Architect',
    'Full Stack Developer',
    'Product Thinker',
    'Backend Engineer',
    'Software Craftsman',
  ];

  let i = 0, j = 0, deleting = false;

  function type() {
    const current = phrases[i];
    el.textContent = current.slice(0, j);

    if (!deleting && j < current.length) {
      j++;
      setTimeout(type, 85 + Math.random() * 40);
    } else if (!deleting && j === current.length) {
      deleting = true;
      setTimeout(type, 2400);
    } else if (deleting && j > 0) {
      j--;
      setTimeout(type, 45);
    } else {
      deleting = false;
      i = (i + 1) % phrases.length;
      setTimeout(type, 500);
    }
  }

  // Start after boot
  setTimeout(type, 3400);
})();

/* ──────────────────────────────────────────────────
   6. SCROLL REVEAL
──────────────────────────────────────────────────── */
(function initScrollReveal() {
  const opts = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };

  // Reveal on sections
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, opts);

  document.querySelectorAll(
    '.timeline-item, .project-card, .knowme-card, .edu-card, .reveal, .reveal-left, .reveal-right'
  ).forEach(el => revealObs.observe(el));

  // Stagger timeline items
  document.querySelectorAll('.timeline-item').forEach((el, idx) => {
    el.style.transitionDelay = `${idx * 0.12}s`;
  });

  // Stagger knowme cards
  document.querySelectorAll('.knowme-card').forEach((el, idx) => {
    el.style.transitionDelay = `${idx * 0.08}s`;
  });
})();

/* ──────────────────────────────────────────────────
   7. SKILL BARS ANIMATION
──────────────────────────────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const w   = bar.dataset.width || 0;
      requestAnimationFrame(() => {
        bar.style.width = w + '%';
        bar.classList.add('animated');
      });
      obs.unobserve(bar);
    });
  }, { threshold: 0.5 });

  bars.forEach(b => obs.observe(b));
})();

/* ──────────────────────────────────────────────────
   8. SMOOTH SCROLL
──────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ──────────────────────────────────────────────────
   9. CONTACT FORM
──────────────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn  = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;

    btn.innerHTML = '<span>Enviando...</span>';
    btn.disabled  = true;
    btn.style.opacity = '0.7';

    // Simulate send
    await new Promise(r => setTimeout(r, 1500));

    btn.innerHTML = '<span>✓ Mensagem enviada!</span>';
    btn.style.background = 'var(--green)';
    btn.style.color      = '#000';

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled  = false;
      btn.style.opacity = '';
      btn.style.background = '';
      btn.style.color      = '';
      form.reset();
    }, 3000);
  });
})();

/* ──────────────────────────────────────────────────
   10. PROJECT CARD TRANSITIONS
──────────────────────────────────────────────────── */
(function initProjectReveal() {
  const cards = document.querySelectorAll('.project-card');
  const obs   = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.1}s`;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(c => obs.observe(c));
})();

/* ──────────────────────────────────────────────────
   11. HERO PARALLAX (subtle)
──────────────────────────────────────────────────── */
(function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroContent.style.transform = `translateY(${y * 0.08}px)`;
      heroContent.style.opacity   = `${1 - y / (window.innerHeight * 0.9)}`;
    }
  }, { passive: true });
})();

/* ──────────────────────────────────────────────────
   12. SECTION BG GLOWS (dynamic)
──────────────────────────────────────────────────── */
(function injectGlows() {
  const hero = document.getElementById('hero');
  if (hero) {
    const g1 = document.createElement('div');
    g1.className = 'bg-glow bg-glow-1';
    hero.appendChild(g1);
    const g2 = document.createElement('div');
    g2.className = 'bg-glow bg-glow-2';
    hero.appendChild(g2);
  }
})();

/* ──────────────────────────────────────────────────
   13. NAV LABEL (data-label attribute)
──────────────────────────────────────────────────── */
(function initNavLabels() {
  document.querySelectorAll('.nav-links a[data-label]').forEach(a => {
    const label = a.dataset.label;
    if (label) {
      a.setAttribute('title', label);
    }
  });
})();

console.log('%c BENJAMIN MACIEL PORTFOLIO ', 'background:#00d4ff;color:#070b12;font-weight:900;padding:4px 8px;font-size:14px;');
console.log('%c Type "help" in the Dev Mode terminal for an interactive experience!', 'color:#8b949e;font-size:11px;');
