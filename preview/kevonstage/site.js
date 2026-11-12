// KevOnStage streaming concept — interactions
(function () {
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 50); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
  });

  // Horizontal content-row controls (Netflix/Tubi-style rows)
  document.querySelectorAll('[data-row]').forEach(function (row) {
    var track = row.querySelector('[data-track]');
    if (!track) return;
    var ctrls = row.querySelectorAll('.row-ctrl');
    var step = function () {
      var first = track.firstElementChild;
      var w = first ? first.getBoundingClientRect().width : track.clientWidth * 0.8;
      return (w + 20) * Math.max(1, Math.floor(track.clientWidth / (w + 20)) - 0 || 1);
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      var scrollable = max > 2;
      ctrls.forEach(function (b) {
        var dir = parseInt(b.getAttribute('data-dir'), 10);
        var hide = !scrollable || (dir < 0 && track.scrollLeft <= 2) || (dir > 0 && track.scrollLeft >= max);
        b.hidden = hide;
      });
    };
    ctrls.forEach(function (b) {
      b.addEventListener('click', function () {
        var dir = parseInt(b.getAttribute('data-dir'), 10);
        track.scrollBy({ left: dir * step(), behavior: 'smooth' });
      });
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  });

  // Scroll reveal
  var els = document.querySelectorAll('.bb-meta,.bb-video,.about-grid,.row-head,.tour-feature,.date-list,.card-grid,.studios-copy,.studios-cards,.shop-inner,.section-head,.social-row');
  els.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('visible'); });
  }

  // Smooth anchor
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Subtle card tilt on pointer
  document.querySelectorAll('.media-card,.scard').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'translateY(-6px) rotateX(' + (-y * 5) + 'deg) rotateY(' + (x * 5) + 'deg)';
    });
    card.addEventListener('pointerleave', function () { card.style.transform = ''; });
  });
})();
