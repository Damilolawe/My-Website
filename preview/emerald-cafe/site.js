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

  // Day / night tabs: without JS both panels simply stack.
  const shifts = document.querySelector('.shifts');
  const tabs = [...document.querySelectorAll('[data-shift]')];
  if (shifts && tabs.length) {
    shifts.classList.add('has-tabs');
    const show = name => {
      tabs.forEach(t => {
        const on = t.dataset.shift === name;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      shifts.classList.toggle('is-night', name === 'night');
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(t.dataset.shift));
      t.addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        show(next.dataset.shift); next.focus();
      });
    });
    show('day');
  }

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
