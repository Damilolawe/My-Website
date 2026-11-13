// KevOnStage — premium network concept interactions
(function () {
  var nav = document.getElementById('nav');
  var fill = document.getElementById('playheadFill');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    if (fill) fill.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
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

  // Signature: stagger the wordmark "signal lock", then arm the sequence
  var letters = document.querySelectorAll('.wordmark span');
  letters.forEach(function (s, i) { s.style.animationDelay = (0.12 + i * 0.05) + 's'; });
  requestAnimationFrame(function () { document.body.classList.add('sig-on'); });

  // Horizontal content rails
  document.querySelectorAll('[data-row]').forEach(function (row) {
    var track = row.querySelector('[data-track]');
    if (!track) return;
    var ctrls = row.querySelectorAll('.rail-ctrl');
    var step = function () {
      var first = track.firstElementChild;
      var w = first ? first.getBoundingClientRect().width : track.clientWidth * 0.8;
      return (w + 18) * Math.max(1, Math.floor(track.clientWidth / (w + 18)));
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      var scrollable = max > 2;
      ctrls.forEach(function (b) {
        var dir = parseInt(b.getAttribute('data-dir'), 10);
        b.hidden = !scrollable || (dir < 0 && track.scrollLeft <= 2) || (dir > 0 && track.scrollLeft >= max);
      });
    };
    ctrls.forEach(function (b) {
      b.addEventListener('click', function () {
        track.scrollBy({ left: parseInt(b.getAttribute('data-dir'), 10) * step(), behavior: 'smooth' });
      });
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();
