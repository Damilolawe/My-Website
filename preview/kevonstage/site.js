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
  var letters = document.querySelectorAll('.wordmark .wm-line > span');
  letters.forEach(function (s, i) { s.style.animationDelay = (i * 0.055).toFixed(3) + 's'; });
  // Arm immediately so the name reads from the first paint, not after a blank beat.
  document.body.classList.add('sig-on');

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

  // Branded hero video: load the real player only on click (facade pattern)
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = heroVideo.getAttribute('data-embed');
      f.title = 'KevOnStage on YouTube';
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      f.setAttribute('allowfullscreen', '');
      f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
      // The existing screen-frame owns the 16:9 ratio; keep it in place
      // before and after playback, and replace only its inner facade.
      var frame = heroVideo.parentElement;
      if (!frame || !frame.classList.contains('screen-frame')) return;
      frame.classList.add('is-playing');
      frame.replaceChildren(f);
      f.focus();
    });
  }

  // Quiet reveal-on-scroll (elevation) — kept off under reduced-motion
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.profile-grid,.rail-head,.ac-gallery-head,.ac-photo-tile,.tour-inner,.studios-head,.scard,.shop-inner,.booking-inner');
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); rio.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { rio.observe(el); });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();

// Creator photo fallback — local, CSP-safe replacement for unavailable external media.
(function () {
  function wireCreatorPhotoFallbacks() {
    document.querySelectorAll('img[data-fallback]').forEach(function (img) {
      function recover() {
        var local = img.getAttribute('data-fallback');
        if (!local) return;
        img.removeAttribute('data-fallback');
        img.src = local;
      }
      img.addEventListener('error', recover, { once: true });
      if (img.complete && img.naturalWidth === 0) recover();
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireCreatorPhotoFallbacks, { once: true });
  } else {
    wireCreatorPhotoFallbacks();
  }
})();
