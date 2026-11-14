// Joshy Gonz — refined dark gallery interactions
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // header solidifies on scroll
  var top = document.getElementById('top');
  if (top) {
    var onScroll = function () { top.classList.toggle('solid', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // mobile nav
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

  // quiet fade-in reveal
  var els = document.querySelectorAll('.reveal');
  if (els.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
      els.forEach(function (el) { io.observe(el); });
    } else { els.forEach(function (el) { el.classList.add('visible'); }); }
  }

  // subtle parallax on tagged images
  if (!reduce) {
    var layers = [].slice.call(document.querySelectorAll('[data-parallax]')).map(function (el) {
      return { el: el, target: el.querySelector('img') || el, speed: parseFloat(el.getAttribute('data-parallax')) || 0.08 };
    });
    if (layers.length) {
      var ticking = false;
      var paint = function () {
        var vh = window.innerHeight;
        layers.forEach(function (l) {
          var r = l.el.getBoundingClientRect();
          if (r.bottom < -120 || r.top > vh + 120) return;
          var off = (r.top + r.height / 2 - vh / 2) * -l.speed;
          l.target.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0) scale(1.06)';
        });
        ticking = false;
      };
      var onP = function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
      window.addEventListener('scroll', onP, { passive: true });
      window.addEventListener('resize', onP, { passive: true });
      paint();
    }
  }

  // gallery category filter
  var filters = document.querySelectorAll('.filter');
  var shots = document.querySelectorAll('.shot[data-category]');
  if (filters.length && shots.length) {
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        filters.forEach(function (x) { x.classList.remove('active'); });
        f.classList.add('active');
        var cat = f.getAttribute('data-filter');
        shots.forEach(function (s) {
          s.classList.toggle('cat-hidden', !(cat === 'all' || s.getAttribute('data-category') === cat));
        });
      });
    });
  }

  // lightbox
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');
    var openLb = function (src, cap) { lbImg.src = src; lbCap.textContent = cap || ''; lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
    var closeLb = function () { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.removeAttribute('src'); };
    document.querySelectorAll('.shot[data-full]').forEach(function (b) {
      b.addEventListener('click', function () { openLb(b.getAttribute('data-full'), b.getAttribute('data-caption') || ''); });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-close')) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  }

  // smooth in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();

// Recover gracefully if the photographer's media CDN is unavailable.
(function(){function wire(){document.querySelectorAll('img[data-fallback]').forEach(function(img){function swap(){var to=img.getAttribute('data-fallback');if(!to)return;img.removeAttribute('data-fallback');img.alt='Joshy Gonz photography preview';img.src=to;}img.addEventListener('error',swap,{once:true});if(img.complete&&img.naturalWidth===0)swap();});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true});else wire();})();
