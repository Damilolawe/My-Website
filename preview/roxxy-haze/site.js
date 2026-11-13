// Roxxy Haze zine concept — interactions
(function () {
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 50); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
  });

  var els = document.querySelectorAll('.sec-head,.about-copy,.facets,.book-art,.book-copy,.embed-lead,.mu-card,.stream-copy,.stream-screen,.connect-lead,.so-card,.patreon-bar,.hub-row');
  els.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('visible'); }); }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Randomize equalizer bar heights/timing for a little life
  document.querySelectorAll('.mu-wave i,.scr-wave i').forEach(function (bar) {
    bar.style.animationDelay = (Math.random() * 0.7).toFixed(2) + 's';
  });

  // Stagger the paste-on settle across cards in a group so they land one by one
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ['.social-grid', '.music-grid'].forEach(function (sel) {
      var group = document.querySelector(sel);
      if (!group) return;
      [].slice.call(group.children).forEach(function (child, i) {
        if (child.classList.contains('reveal')) child.style.transitionDelay = (i * 0.07).toFixed(2) + 's';
      });
    });
  }
})();

// Creator photo fallback — local, CSP-safe replacement for unavailable external media.
(function () {
  function wireCreatorPhotoFallbacks() {
    document.querySelectorAll('.ac-photo-journal img[data-fallback]').forEach(function (img) {
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
