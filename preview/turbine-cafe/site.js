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


  // Live open/closed lamp from the published hours (America/New_York).
  const HOURS = { 0: [10, 16], 1: null, 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [10, 16] };
  const NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fmt = h => (h % 12 || 12) + (h < 12 ? 'am' : 'pm');
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    const get = t => parts.find(p => p.type === t)?.value;
    const day = NAMES.indexOf(get('weekday'));
    const now = Number(get('hour')) + Number(get('minute')) / 60;
    const today = HOURS[day];
    const open = !!today && now >= today[0] && now < today[1];
    let text;
    if (open) text = 'Open now, until ' + fmt(today[1]);
    else {
      let d = day, first = true;
      for (let i = 0; i < 8; i++) {
        const h = HOURS[d];
        if (h && (!first || now < h[0])) { text = 'Closed now, opens ' + (first ? 'today' : NAMES[d]) + ' ' + fmt(h[0]); break; }
        d = (d + 1) % 7; first = false;
      }
    }
    document.querySelectorAll('[data-status]').forEach(el => {
      el.classList.add(open ? 'is-open' : 'is-closed');
      el.querySelector('.status-text').textContent = text;
    });
    document.querySelector('.day[data-day="' + day + '"]')?.classList.add('is-today');
  } catch (e) { /* keep the static label */ }

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
