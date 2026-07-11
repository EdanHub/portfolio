/* ─── PROJECT TABLE — ACCORDION ──────────────────────────── */
document.querySelectorAll('.project-row').forEach(row => {
  const id      = row.dataset.id;
  const detail  = document.getElementById(`detail-${id}`);

  const toggle = () => {
    const open = row.classList.toggle('open');
    row.setAttribute('aria-expanded', open);
    if (detail) {
      detail.classList.toggle('open', open);
      detail.setAttribute('aria-hidden', !open);
    }
  };

  row.addEventListener('click', toggle);
  row.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

/* ─── ACTIVE NAV ON SCROLL ───────────────────────────────── */
const sections = document.querySelectorAll('section[id], .masthead[id]');
const navLinks = document.querySelectorAll('.doc-nav a');

const markActive = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', markActive, { passive: true });
markActive();

/* ─── FADE-IN ON SCROLL ──────────────────────────────────── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
