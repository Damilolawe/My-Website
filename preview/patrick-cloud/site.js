// Patrick Cloud — Cloud Village interactions
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav: solid on scroll
  var nav = document.getElementById('nav');
  var onNav = nav ? function () { nav.classList.toggle('solid', window.scrollY > 20); } : null;

  // Mobile menu
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Featured video: load the real player only on click (facade)
  var heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    var play = function () {
      var f = document.createElement('iframe');
      f.src = heroVideo.getAttribute('data-embed');
      f.title = 'Patrick Cloud featured video';
      f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      f.setAttribute('allowfullscreen', '');
      f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
      heroVideo.replaceWith(f);
    };
    heroVideo.addEventListener('click', play);
    heroVideo.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); } });
  }

  // Reveal-on-scroll
  var els = document.querySelectorAll('.reveal');
  if (els.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
      els.forEach(function (el) { io.observe(el); });
    } else { els.forEach(function (el) { el.classList.add('visible'); }); }
  }

  // Count-up on the numeric stats
  function countUp(b) {
    var target = parseFloat(b.getAttribute('data-count'));
    var dec = parseInt(b.getAttribute('data-dec') || '0', 10);
    var suf = b.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    if (reduce) { b.textContent = target.toFixed(dec) + suf; return; }
    var start = null, dur = 1300;
    function step(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      b.textContent = (target * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.stat b[data-count]');
  if (nums.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { cio.observe(n); });
  } else { nums.forEach(countUp); }

  // Sunrise scroll-progress sun
  var sun = document.querySelector('.sky-sun');
  var onProg = sun ? function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? h.scrollTop / max : 0;
    sun.style.left = (p * 100).toFixed(2) + '%';
  } : null;

  // Back-to-top cloud
  var tt = document.getElementById('toTop');
  var onTop = tt ? function () { tt.classList.toggle('show', window.scrollY > 600); } : null;
  if (tt) tt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  // Combined scroll handler
  function onScroll() { if (onNav) onNav(); if (onProg) onProg(); if (onTop) onTop(); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Rotating Cloud Village forecast
  var fc = document.getElementById('fcText');
  if (fc) {
    var msgs = ['100% good energy', 'highs of billions of views', 'a strong chance of dad jokes',
      'Planet Sandwich every Wednesday', 'scattered bars, clearing to laughs'];
    var fi = 0;
    setInterval(function () {
      fi = (fi + 1) % msgs.length;
      fc.style.opacity = '0';
      setTimeout(function () { fc.textContent = msgs[fi]; fc.style.opacity = '1'; }, 300);
    }, 3400);
  }

  if (!reduce) {
    // Mouse parallax on hero sky layers (uses `translate` so it composes with CSS transforms)
    var hero = document.querySelector('.hero');
    var layers = [].slice.call(document.querySelectorAll('.hero [data-depth]'));
    if (hero && layers.length) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        var cx = (e.clientX - r.left) / r.width - 0.5;
        var cy = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach(function (l) {
          var d = parseFloat(l.getAttribute('data-depth')) || 20;
          l.style.translate = (-cx * d).toFixed(1) + 'px ' + (-cy * d).toFixed(1) + 'px';
        });
      });
      hero.addEventListener('mouseleave', function () {
        layers.forEach(function (l) { l.style.translate = '0px 0px'; });
      });
    }

    // 3D tilt on video cards + featured facade
    document.querySelectorAll('.vcard, .feature-video').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(820px) rotateY(' + (px * 7).toFixed(2) + 'deg) rotateX(' + (-py * 7).toFixed(2) + 'deg) translateY(-5px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });

    // Magnetic sun buttons (uses `translate` so it composes with the hover lift transform)
    document.querySelectorAll('.btn-sun, .nav-links .cta').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1) + 'px ' + ((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1) + 'px';
      });
      b.addEventListener('pointerleave', function () { b.style.translate = ''; });
    });
  }

  // Smooth in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    });
  });
})();

// Recover gracefully if a thumbnail host is unavailable.
(function(){function wire(){document.querySelectorAll('img[data-fallback]').forEach(function(img){function swap(){var to=img.getAttribute('data-fallback');if(!to)return;img.removeAttribute('data-fallback');img.alt='Cloud Village';img.src=to;}img.addEventListener('error',swap,{once:true});if(img.complete&&img.naturalWidth===0)swap();});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire,{once:true});else wire();})();
