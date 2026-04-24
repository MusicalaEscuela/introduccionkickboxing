/* ═══════════════════════════════════════════════
   MUSICALA – GUÍA KICKBOXING
   script.js
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────
  // NAV: scroll class + hamburger menu
  // ─────────────────────────────────────────────
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Cerrar menú mobile al hacer click en un link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });


  // ─────────────────────────────────────────────
  // BACK TO TOP
  // ─────────────────────────────────────────────
  document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ─────────────────────────────────────────────
  // REVEAL ON SCROLL (IntersectionObserver)
  // ─────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger entre tarjetas del mismo grid
        const siblings = [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 60);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));


  // ─────────────────────────────────────────────
  // SMOOTH SCROLL para links de navegación
  // (refuerzo por si el CSS scroll-behavior no está
  //  disponible en algún browser antiguo)
  // ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // alto del nav
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ─────────────────────────────────────────────
  // MOVE CARDS: efecto de pulso al entrar al hover
  // (micro-interacción sin exagerar)
  // ─────────────────────────────────────────────
  document.querySelectorAll('.move-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.move-card__icon');
      if (!icon) return;
      icon.style.transform = 'scale(1.25) rotate(-5deg)';
      icon.style.transition = 'transform 0.22s ease';
      setTimeout(() => {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }, 220);
    });
  });


  // ─────────────────────────────────────────────
  // COMBO CARDS: animar chips al hover
  // ─────────────────────────────────────────────
  document.querySelectorAll('.combo-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const chips = card.querySelectorAll('.combo-chip');
      chips.forEach((chip, i) => {
        setTimeout(() => {
          chip.style.transform = 'translateY(-3px)';
          chip.style.transition = 'transform 0.18s ease';
          setTimeout(() => chip.style.transform = '', 200);
        }, i * 80);
      });
    });
  });


  // ─────────────────────────────────────────────
  // ACTIVE NAV LINK (highlight sección visible)
  // ─────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isMatch = link.getAttribute('href') === `#${id}`;
          link.style.color    = isMatch ? 'var(--color-primary)'      : '';
          link.style.background = isMatch ? 'var(--color-primary-soft)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));

});
