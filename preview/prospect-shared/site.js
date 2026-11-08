// Shared behaviour for prospect previews that do not ship their own site.js.
const menuButton = document.querySelector('[data-menu]');
// Older pages mark the menu with data-nav; others only have a <nav> in the header.
const nav = document.querySelector('[data-nav]') || menuButton?.closest('header')?.querySelector('nav') || document.querySelector('header nav');
if (menuButton && nav) {
  if (!nav.id) nav.id = 'site-menu';
  menuButton.setAttribute('aria-controls', nav.id);
  menuButton.setAttribute('aria-expanded', 'false');
  const setOpen = open => {
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };
  menuButton.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
}
const revealNodes = [...document.querySelectorAll('[data-reveal]')];
if (navigator.webdriver || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealNodes.forEach(node => node.classList.add('seen'));
} else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('seen'); observer.unobserve(entry.target); }
  }), { threshold: .14 });
  revealNodes.forEach(node => observer.observe(node));
}
