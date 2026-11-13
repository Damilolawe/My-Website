// Keenan Baker — editorial concept interactions
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 50); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav (accessible)
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  function syncMenu() { links.inert = window.innerWidth <= 900 && !links.classList.contains('open'); }
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    syncMenu();
  });
  syncMenu();
  window.addEventListener('resize', syncMenu);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); syncMenu(); toggle.focus();
    }
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); syncMenu(); });
  });

  // Signature A: masked line-by-line headline set, like type being printed
  if (!reduce) {
    document.documentElement.classList.add('js-anim');
    var hero = document.querySelector('.hero');
    var lines = document.querySelectorAll('.hero-title .line');
    requestAnimationFrame(function () {
      if (hero) hero.classList.add('in');
      lines.forEach(function (ln, i) { setTimeout(function () { ln.classList.add('in'); }, 120 + i * 150); });
    });
  }

  // General reveal for lower sections
  var els = document.querySelectorAll('.bio-grid,.album-inner,.sec-head,.media-heading,.media-intro,.watch-grid,.press-row,.merch-inner,.contact p,.social-row');
  els.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('visible'); }); }

  // Signature B: the record spins as you scroll past the album
  var vinyl = document.querySelector('.vinyl');
  if (vinyl && !reduce) {
    var spin = function () { vinyl.style.transform = 'translateY(-50%) rotate(' + (window.scrollY * 0.22).toFixed(1) + 'deg)'; };
    window.addEventListener('scroll', spin, { passive: true });
    spin();
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();
