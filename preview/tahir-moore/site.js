// Tahir Moore concept — link-hub interactions
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
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

  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('visible'); }); }

  // Signature: magnetic link rows — each row leans toward the cursor and a lime
  // light tracks the pointer across it.
  if (!reduce && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.lrow').forEach(function (row) {
      row.addEventListener('pointermove', function (e) {
        var r = row.getBoundingClientRect();
        var x = e.clientX - r.left, y = e.clientY - r.top;
        row.style.setProperty('--mx', x + 'px');
        row.style.setProperty('--my', y + 'px');
        var dx = (x / r.width - 0.5) * 12;
        var dy = (y / r.height - 0.5) * 6 - 3;
        row.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      });
      row.addEventListener('pointerleave', function () { row.style.transform = ''; });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
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
