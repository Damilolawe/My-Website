// Tony Baker — voiceover studio concept interactions
(function () {
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

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

  // Signature: build the hero waveform — bars with varied height, delay and tempo
  var wave = document.getElementById('heroWave');
  if (wave) {
    var count = 52;
    for (var i = 0; i < count; i++) {
      var bar = document.createElement('i');
      // a loose sine envelope so the waveform reads like a voice, not a flat bar
      var env = 0.35 + 0.65 * Math.abs(Math.sin((i / count) * Math.PI * 3));
      bar.style.setProperty('--h', (env * 100).toFixed(0) + '%');
      bar.style.height = (env * 100).toFixed(0) + '%';
      bar.style.animationDelay = (-(i % 9) * 0.13).toFixed(2) + 's';
      bar.style.animationDuration = (1.1 + (i % 5) * 0.14).toFixed(2) + 's';
      wave.appendChild(bar);
    }
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
