// Khleo Thomas — neon arcade interactions
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var site = document.getElementById('site');
  if (site) {
    var onScroll = function () { site.classList.toggle('solid', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  var els = document.querySelectorAll('.reveal');
  if (els.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
      els.forEach(function (el) { io.observe(el); });
    } else { els.forEach(function (el) { el.classList.add('visible'); }); }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();

// If a remote photo cannot load, use the alternate real Khleo portrait.
(function () {
  function wirePhotoFallbacks() {
    document.querySelectorAll('img[data-fallback]').forEach(function (img) {
      function recover() {
        var alternate = img.getAttribute('data-fallback');
        if (!alternate || alternate === img.src) return;
        img.removeAttribute('data-fallback');
        img.src = alternate;
      }
      img.addEventListener('error', recover, { once: true });
      if (img.complete && img.naturalWidth === 0) recover();
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wirePhotoFallbacks, { once: true });
  } else {
    wirePhotoFallbacks();
  }
})();
