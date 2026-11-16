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

  // ---- Airplane: fly in from the left, weave through the letters (in front of
  // and behind each, alternating), then fly off the right; the whole flight
  // repeats every 15s. Driven here so it can re-order against individual
  // letters, which CSS keyframes cannot do. ----
  (function () {
    var plane = document.querySelector('.sky-plane');
    var inner = document.querySelector('.hero-inner');
    var title = document.querySelector('.hero-title');
    if (!plane || !inner || !title) return;
    if (reduce) { plane.style.display = 'none'; return; }
    var letters = [].slice.call(title.querySelectorAll('.l'));
    if (!letters.length) { plane.style.display = 'none'; return; }

    // Alternate which letters sit in front of (z7) vs behind (z5) the plane (z6 while weaving).
    letters.forEach(function (l, i) {
      l.style.zIndex = (i % 2 === 0) ? '7' : '5';
      l.style.animationDelay = (0.05 + i * 0.035).toFixed(3) + 's';
    });

    var PW = 32, PH = 16;      // half the plane's rendered size (64x32)
    var T = 15000;             // full cycle, ms
    var m = null;
    function measure() {
      // offsetLeft/offsetTop/offsetWidth/offsetHeight are layout positions that
      // IGNORE the letters' entrance transform, so the plane's path is correct
      // from the very first frame (getBoundingClientRect would include the
      // translate and make the plane start low, then snap).
      var ls = letters.map(function (l) { return { l: l.offsetLeft, r: l.offsetLeft + l.offsetWidth, t: l.offsetTop, b: l.offsetTop + l.offsetHeight }; });
      var tops = ls.map(function (o) { return o.t; }), bots = ls.map(function (o) { return o.b; });
      var minT = Math.min.apply(null, tops), maxB = Math.max.apply(null, bots);
      var lineH = ls[0].b - ls[0].t;
      var il = inner.getBoundingClientRect().left; // inner has no transform, so this is stable
      var vw = window.innerWidth;
      m = {
        midY: (minT + maxB) / 2,
        wordLeft: ls[0].l,
        wordRight: ls[ls.length - 1].r,
        offLeft: -il - 120,
        offRight: (vw - il) + 120,
        rightEdge: (vw - il),
        multiline: (maxB - minT) > lineH * 1.5
      };
    }
    window.addEventListener('resize', measure, { passive: true });

    var start = 0, started = false;
    plane.style.opacity = '0';

    var TRAVEL = 10000; // ms to cross the whole screen at one constant speed
    function path(t) {
      var midY = m.midY;
      var weave = false, x, y, rot = 0, sc = 1, vis = true;
      if (t >= TRAVEL) { return { x: m.offRight, y: midY, rot: 0, sc: 1, vis: false, weave: false }; }
      // Constant horizontal speed the whole way: X is linear from off-left to off-right.
      var p = t / TRAVEL;
      x = m.offLeft + (m.offRight - m.offLeft) * p;
      if (m.multiline) { return { x: x, y: midY, rot: 0, sc: 1, vis: true, weave: false }; }
      // Weave (gentle bob + banking + behind/in-front z) only while over the word.
      var wStart = m.wordLeft - 46, wEnd = m.wordRight + 66;
      if (x > wStart && x < wEnd) {
        var wp = (x - wStart) / (wEnd - wStart);
        y = midY + Math.sin(wp * Math.PI * 3) * -6;
        rot = Math.sin(wp * Math.PI * 6) * 4;
        weave = true;
      } else { y = midY; }
      return { x: x, y: y, rot: rot, sc: sc, vis: vis, weave: weave };
    }

    function frame(now) {
      if (m) {
        var s = path((now - start) % T);
        plane.style.transform = 'translate(' + (s.x - PW).toFixed(1) + 'px,' + (s.y - PH).toFixed(1) + 'px) rotate(' + s.rot.toFixed(1) + 'deg) scale(' + s.sc.toFixed(3) + ')';
        plane.style.opacity = s.vis ? '1' : '0';
        plane.style.zIndex = s.weave ? '6' : '10';
      }
      requestAnimationFrame(frame);
    }

    // Start only once the web font has loaded, so the first measurement uses the
    // real letter metrics and the plane never has to correct itself on load.
    function begin() {
      if (started) return;
      started = true;
      measure();
      start = performance.now();
      requestAnimationFrame(frame);
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(begin);
      setTimeout(begin, 1200); // fallback if fonts.ready is slow
    } else {
      begin();
    }
  })();

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
      // Keep the original 16:9 frame in the DOM: swapping the frame itself
      // changes its intrinsic height and makes the player jump on click.
      heroVideo.classList.add('is-playing');
      heroVideo.style.transform = '';
      heroVideo.removeAttribute('role');
      heroVideo.removeAttribute('tabindex');
      heroVideo.removeAttribute('aria-label');
      heroVideo.replaceChildren(f);
      f.focus();
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

  // Forecast is now a small interactive piece of the Cloud Village world.
  // Click/tap or press Enter/Space to change the weather; pause auto-cycling
  // on hidden tabs and turn it off entirely for reduced-motion visitors.
  var fc = document.getElementById('fcText');
  var forecastButton = document.getElementById('forecastButton');
  if (fc && forecastButton) {
    var msgs = ['100% good energy', 'sunny with a chance of laughs', 'a strong chance of dad jokes',
      'Planet Sandwich every Wednesday', 'scattered bars, clearing to laughs'];
    var fi = 0, changing = false;
    function nextForecast() {
      if (changing) return;
      changing = true;
      fi = (fi + 1) % msgs.length;
      if (reduce) {
        fc.textContent = msgs[fi];
        changing = false;
        return;
      }
      fc.classList.add('forecast-out');
      forecastButton.classList.remove('forecast-pop');
      void forecastButton.offsetWidth; // restart the little sun burst
      forecastButton.classList.add('forecast-pop');
      window.setTimeout(function () {
        fc.textContent = msgs[fi];
        fc.classList.remove('forecast-out');
        changing = false;
      }, 190);
    }
    forecastButton.addEventListener('click', nextForecast);
    if (!reduce) {
      window.setInterval(function () {
        if (!document.hidden) nextForecast();
      }, 5300);
    }
  }

  // 3D hero diorama: the whole sky scene rotates in real 3D space.
  // A rAF loop blends a gentle idle sway with the pointer target so it stays alive
  // on touch devices too, then eases back to rest when the pointer leaves.
  var scene = document.getElementById('scene');
  var hero = document.querySelector('.hero');
  if (scene && hero && !reduce) {
    var tx = 0, ty = 0, cxCur = 0, cyCur = 0, over = false, t0 = performance.now();
    hero.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5);
      ty = ((e.clientY - r.top) / r.height - 0.5);
      over = true;
    });
    hero.addEventListener('pointerleave', function () { over = false; tx = 0; ty = 0; });
    var loop = function (now) {
      var idle = (now - t0) / 1000;
      var ix = over ? 0 : Math.sin(idle * 0.5) * 0.22;
      var iy = over ? 0 : Math.cos(idle * 0.38) * 0.12;
      cxCur += ((tx + ix) - cxCur) * 0.06;
      cyCur += ((ty + iy) - cyCur) * 0.06;
      scene.style.transform = 'rotateX(' + (-cyCur * 12).toFixed(2) + 'deg) rotateY(' + (cxCur * 16).toFixed(2) + 'deg)';
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  if (!reduce) {
    // Real 3D tilt on video cards + featured facade (perspective comes from the
    // container, so translateZ children — the play button — pop toward the viewer)
    document.querySelectorAll('.vcard, .feature-video').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        // Never rotate an active iframe. Its on-screen dimensions stay fixed.
        if (card.classList.contains('is-playing') || e.pointerType === 'touch') return;
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'rotateY(' + (px * 9).toFixed(2) + 'deg) rotateX(' + (-py * 9).toFixed(2) + 'deg) translateZ(26px)';
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
