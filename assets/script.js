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

/* ─── ACTIVE NAV + SCROLL PROGRESS ───────────────────────── */
const sections = document.querySelectorAll('section[id], .masthead[id]');
const navLinks = document.querySelectorAll('.doc-nav a');
const progress = document.querySelector('.scroll-progress');

const onScroll = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });

  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

/* ─── FADE-IN ON SCROLL ──────────────────────────────────── */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll(
    '.masthead-tag, h1, .masthead-meta, .section-label, .project-table, .profile-grid, .expertise-table, .contact-grid'
  ).forEach(el => el.classList.add('fade-in'));

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
