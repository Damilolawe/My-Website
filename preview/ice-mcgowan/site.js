// Ice McGowan concept — manga poster-panel interactions
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

  // Reveal panels as the reader moves down the page (vertical manga flow)
  var els = document.querySelectorAll('.panel,.sec-head,.gutter-strip,.social-row');
  els.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('visible'); }); }

  // Stagger the panel stamp so a stack of cards inks in one after another
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.work-stack, .about-row, .work-spread, .pod-spread').forEach(function (group) {
      [].slice.call(group.children).forEach(function (child, i) {
        if (child.classList.contains('reveal')) child.style.transitionDelay = (i * 0.09).toFixed(2) + 's';
      });
    });
  }

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
