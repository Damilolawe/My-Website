// Joshy Gonz — photography portfolio concept interactions
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

  // Signature: gallery frames and sections ease in, staggered like a contact sheet
  var els = document.querySelectorAll('.sec-head,.frame,.gallery-note,.film-inner,.about-grid,.cause-card,.contact-inner');
  els.forEach(function (el) { el.classList.add('reveal'); });
  if (!reduce) {
    var frames = document.querySelector('.gallery');
    if (frames) [].slice.call(frames.children).forEach(function (f, i) { f.style.transitionDelay = (i * 0.08).toFixed(2) + 's'; });
    var causes = document.querySelector('.cause-grid');
    if (causes) [].slice.call(causes.children).forEach(function (c, i) { c.style.transitionDelay = (i * 0.09).toFixed(2) + 's'; });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('visible'); }); }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();

// Recover gracefully if the photographer's media CDN is unavailable.
(function(){function wire(){document.querySelectorAll('img[data-fallback]').forEach(function(img){function swap(){var to=img.getAttribute('data-fallback');if(!to)return;img.removeAttribute('data-fallback');img.alt='Joshy Gonz photography preview';img.src=to;}img.addEventListener('error',swap,{once:true});if(img.complete&&img.naturalWidth===0)swap();});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true});else wire();})();
