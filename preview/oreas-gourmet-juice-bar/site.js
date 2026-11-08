(() => {
  const btn = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  const setOpen = open => {
    if (!btn || !nav) return;
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  btn?.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && btn?.getAttribute('aria-expanded') === 'true') { setOpen(false); btn.focus(); }
  });
  const nodes = [...document.querySelectorAll('[data-reveal]')];
  if (!nodes.length) return;
  document.documentElement.classList.add('js-reveal');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || navigator.webdriver || !('IntersectionObserver' in window)) { nodes.forEach(n => n.classList.add('seen')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('seen'); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  nodes.forEach(n => io.observe(n));
})();
