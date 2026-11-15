/* Shared by the portfolio (index.html) and the tools catalog (outils/index.html). */

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── THEME TOGGLE ───────────────────────────────────────── */
(() => {
  const toggle = document.querySelector('.theme-toggle');
  const setTheme = (theme, animate) => {
    if (animate && !reduceMotion) {
      root.classList.add('theme-switching');
      window.setTimeout(() => root.classList.remove('theme-switching'), 350);
    }
    root.setAttribute('data-theme', theme);
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
    }
  };

  setTheme(root.getAttribute('data-theme') || 'light', false);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
      localStorage.setItem('theme', next);
    });
  }

  /* follow the system only while no manual choice has been made */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light', true);
  });
})();

/* ─── INDEX ACCORDION ────────────────────────────────────── */
const rows = [...document.querySelectorAll('.project-row')];

const setOpen = (row, open) => {
  const detail = document.getElementById(`detail-${row.dataset.id}`);
  row.classList.toggle('open', open);
  row.setAttribute('aria-expanded', String(open));
  if (detail) {
    detail.classList.toggle('open', open);
    detail.setAttribute('aria-hidden', String(!open));
  }
};

/* keep the URL shareable: #projet-03 reopens project 03 */
const syncHash = (row, open) => {
  if (!row.id) return;
  const base = location.pathname + location.search;
  if (open) history.replaceState(null, '', `#${row.id}`);
  else if (location.hash === `#${row.id}`) history.replaceState(null, '', base);
};

rows.forEach(row => {
  const toggle = () => {
    const open = !row.classList.contains('open');
    setOpen(row, open);
    syncHash(row, open);
    updateExpandButtons();
  };
  row.addEventListener('click', toggle);
  row.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

/* "Tout déplier / Tout replier" buttons, scoped to their section */
const expandButtons = [...document.querySelectorAll('[data-expand-all]')];

function updateExpandButtons() {
  expandButtons.forEach(btn => {
    const scope = btn.closest('section') || document;
    const scoped = [...scope.querySelectorAll('.project-row')];
    const allOpen = scoped.length > 0 && scoped.every(r => r.classList.contains('open'));
    btn.textContent = allOpen ? 'Tout replier' : 'Tout déplier';
    btn.setAttribute('aria-expanded', String(allOpen));
  });
}

expandButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const scope = btn.closest('section') || document;
    const scoped = [...scope.querySelectorAll('.project-row')];
    const open = !scoped.every(r => r.classList.contains('open'));
    scoped.forEach(r => setOpen(r, open));
    if (!open && location.hash) history.replaceState(null, '', location.pathname + location.search);
    updateExpandButtons();
  });
});

/* open the row targeted by the URL hash on load */
(() => {
  const target = location.hash && document.getElementById(location.hash.slice(1));
  if (target && target.classList.contains('project-row')) {
    setOpen(target, true);
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  }
  updateExpandButtons();
})();

/* ─── ACTIVE NAV + SCROLL PROGRESS ───────────────────────── */
const sections = [...document.querySelectorAll('main [id]')].filter(el => el.matches('section, .masthead'));
const anchorLinks = [...document.querySelectorAll('.doc-nav a[href^="#"]')];
const progress = document.querySelector('.scroll-progress');

let ticking = false;
const onScroll = () => {
  ticking = false;
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  anchorLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));

  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  }
};
const requestScroll = () => {
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
};

window.addEventListener('scroll', requestScroll, { passive: true });
window.addEventListener('resize', requestScroll, { passive: true });
onScroll();

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
if (!reduceMotion && 'IntersectionObserver' in window) {
  /* masthead: short stagger */
  document.querySelectorAll('.masthead-tag, .masthead h1, .masthead-lede, .masthead-meta, .masthead .toc')
    .forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${i * 70}ms`;
    });

  document.querySelectorAll(
    '.section-label, .section-intro, .project-table, .tool-card, .profile-grid, .expertise-table, .contact-grid'
  ).forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
