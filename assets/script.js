/* ─── NAV MOBILE TOGGLE ──────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

/* ─── ACTIVE NAV ON SCROLL ───────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a');

const setActive = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActive, { passive: true });
setActive();

/* ─── FADE-IN ON SCROLL ──────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ─── STAGGER CARD ANIMATIONS ────────────────────────────── */
document.querySelectorAll('.cards-grid, .projects-grid').forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
  });
});
