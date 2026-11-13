// Joshy Gonz — photography portfolio concept interactions
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  var onNav = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onNav, { passive: true });
  onNav();

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
  });

  // Reveal: gallery frames wipe up like a shutter; sections ease in, staggered like a contact sheet
  var els = document.querySelectorAll('.sec-head,.frame,.gallery-note,.film-inner,.about-grid,.cause-card,.contact-inner');
  els.forEach(function (el) { el.classList.add('reveal'); });
  if (!reduce) {
    var gallery = document.querySelector('.gallery');
    if (gallery) [].slice.call(gallery.children).forEach(function (f, i) { f.style.transitionDelay = (i * 0.09).toFixed(2) + 's'; });
    var causes = document.querySelector('.cause-grid');
    if (causes) [].slice.call(causes.children).forEach(function (c, i) { c.style.transitionDelay = (i * 0.09).toFixed(2) + 's'; });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('visible'); }); }

  // Cinematic depth: parallax layers drift against the scroll
  if (!reduce) {
    var layers = [].slice.call(document.querySelectorAll('[data-parallax]')).map(function (el) {
      var target = el.classList.contains('about-portrait') ? el.querySelector('.about-photo') : el;
      return { el: el, target: target, speed: parseFloat(el.getAttribute('data-parallax')) || 0.15 };
    }).filter(function (l) { return l.target; });
    var ticking = false;
    var paint = function () {
      var vh = window.innerHeight;
      layers.forEach(function (l) {
        var r = l.el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return; // skip offscreen
        var offset = (r.top + r.height / 2 - vh / 2) * -l.speed;
        l.target.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
      ticking = false;
    };
    var onParallax = function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    window.addEventListener('scroll', onParallax, { passive: true });
    window.addEventListener('resize', onParallax, { passive: true });
    paint();
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();

// Recover gracefully if the photographer's media CDN is unavailable.
(function(){function wire(){document.querySelectorAll('img[data-fallback]').forEach(function(img){function swap(){var to=img.getAttribute('data-fallback');if(!to)return;img.removeAttribute('data-fallback');img.alt='Joshy Gonz photography preview';img.src=to;}img.addEventListener('error',swap,{once:true});if(img.complete&&img.naturalWidth===0)swap();});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true});else wire();})();
