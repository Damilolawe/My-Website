// Joshy Gonz — editorial multipage portfolio interactions
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- nav ---
  var nav = document.getElementById('nav');
  if (nav) {
    var onNav = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onNav, { passive: true });
    onNav();
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
      });
    }
  }

  // --- reveal on scroll (threshold 0 so clip-path wipes still trigger) ---
  var els = document.querySelectorAll('.reveal, .reveal-wipe');
  if (els.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
      els.forEach(function (el) { io.observe(el); });
    } else { els.forEach(function (el) { el.classList.add('visible'); }); }
  }

  // --- parallax depth (hero media, portraits, gallery feature) ---
  if (!reduce) {
    var layers = [].slice.call(document.querySelectorAll('[data-parallax]')).map(function (el) {
      return { el: el, target: el.querySelector('img') || el, speed: parseFloat(el.getAttribute('data-parallax')) || 0.12 };
    });
    if (layers.length) {
      var ticking = false;
      var paint = function () {
        var vh = window.innerHeight;
        layers.forEach(function (l) {
          var r = l.el.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          var off = (r.top + r.height / 2 - vh / 2) * -l.speed;
          l.target.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
        });
        ticking = false;
      };
      var onP = function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
      window.addEventListener('scroll', onP, { passive: true });
      window.addEventListener('resize', onP, { passive: true });
      paint();
    }
  }

  // --- gallery category filter ---
  var chips = document.querySelectorAll('.chip');
  var blocks = document.querySelectorAll('.gblock[data-category]');
  if (chips.length && blocks.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var f = chip.getAttribute('data-filter');
        blocks.forEach(function (b) {
          var show = f === 'all' || b.getAttribute('data-category') === f;
          b.classList.toggle('hidden-cat', !show);
        });
      });
    });
  }

  // --- lightbox ---
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');
    var openLb = function (src, cap) {
      lbImg.src = src; lbCap.textContent = cap || '';
      lb.classList.add('open'); document.body.style.overflow = 'hidden';
    };
    var closeLb = function () { lb.classList.remove('open'); document.body.style.overflow = ''; lbImg.removeAttribute('src'); };
    document.querySelectorAll('.gblock[data-full]').forEach(function (b) {
      b.addEventListener('click', function () { openLb(b.getAttribute('data-full'), b.getAttribute('data-caption') || ''); });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-close')) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });
  }

  // --- smooth in-page anchors ---
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
