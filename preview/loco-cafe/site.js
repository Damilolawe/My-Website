(() => {
  const toggle = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  const setOpen = open => {
    if (!toggle || !nav) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle?.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav?.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) { setOpen(false); toggle.focus(); }
  });

  const nodes = [...document.querySelectorAll('[data-reveal]')];
  if (!nodes.length || navigator.webdriver || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('seen'); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  nodes.forEach(n => {
    if (n.getBoundingClientRect().top < innerHeight) n.classList.add('seen');
    io.observe(n);
  });
})();
