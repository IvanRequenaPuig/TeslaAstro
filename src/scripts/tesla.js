const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');

/* ---------- Menú lateral ---------- */
function toggleMenu(open) {
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
}

menuBtn.addEventListener('click', () => toggleMenu(!menu.classList.contains('is-open')));
menuClose.addEventListener('click', () => toggleMenu(false));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleMenu(false);
});
document.addEventListener('click', (e) => {
  if (menu.classList.contains('is-open') && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
    toggleMenu(false);
  }
});

/* ---------- Color del nav según la sección visible ---------- */
// Observa una franja fina en la parte superior de la pantalla (donde está el nav).
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const theme = entry.target.dataset.theme;
      nav.classList.toggle('nav--dark', theme === 'dark');
      nav.classList.toggle('nav--light', theme === 'light');
    });
  },
  { rootMargin: '0px 0px -92% 0px', threshold: 0 }
);

document.querySelectorAll('.panel').forEach((panel) => observer.observe(panel));
