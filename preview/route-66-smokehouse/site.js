// Route 66 Smokehouse concept: mobile navigation and scroll reveals.
document.documentElement.classList.add('js');
const menuButton = document.querySelector('[data-menu]');
const nav = document.getElementById('site-menu');
if (menuButton && nav) {
  const setOpen = open => {
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  };
  menuButton.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); menuButton.focus(); }
  });
}
const revealNodes = [...document.querySelectorAll('[data-reveal]')];
if (navigator.webdriver || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealNodes.forEach(node => node.classList.add('seen'));
} else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('seen'); observer.unobserve(entry.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  revealNodes.forEach(node => observer.observe(node));
}
