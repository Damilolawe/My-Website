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
  var els = document.querySelectorAll('.sec-head,.gallery-frame,.gallery-note,.podcast-layout,.about-grid,.contact-inner');
  els.forEach(function (el) { el.classList.add('reveal'); });
  if (!reduce) {
    document.querySelectorAll('.event-gallery').forEach(function(gallery){ [].slice.call(gallery.children).forEach(function(f,i){ f.style.transitionDelay = (i*0.06).toFixed(2)+'s'; }); });
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


/* Event-organized photography archive + keyboard-accessible cinematic viewer */
(function () {
 const filters=Array.from(document.querySelectorAll('[data-gallery-filter]'));
 const blocks=Array.from(document.querySelectorAll('.event-block[data-event]'));
 const status=document.getElementById('galleryStatus');
 const lightbox=document.getElementById('photoLightbox');
 const lightboxImage=document.getElementById('lightboxImage');
 const photos=Array.from(document.querySelectorAll('[data-gallery-photo]'));
 const close=document.getElementById('lightboxClose');
 let visible=photos, active=0, trigger=null;
 function setFilter(name) {
   blocks.forEach(block=>{
     block.hidden=name!=='all' && block.dataset.event!==name;
     // A filtered-in section should not depend on an IntersectionObserver re-fire.
     if(!block.hidden) block.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
   });
   filters.forEach(btn=>{
     const selected=btn.dataset.galleryFilter===name;
     btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));
   });
   visible=photos.filter(p=>!p.closest('.event-block').hidden);
   status.textContent=visible.length+' photograph'+(visible.length===1?'':'s')+' · '+(name==='all'?'7 stories':blocks.find(b=>b.dataset.event===name).querySelector('h3').textContent);
 }
 filters.forEach(btn=>btn.addEventListener('click',()=>setFilter(btn.dataset.galleryFilter)));
 function show(index) {
   if(!visible.length)return;
   active=(index+visible.length)%visible.length;
   const item=visible[active], img=item.querySelector('img');
   lightboxImage.src=item.dataset.full;
   lightboxImage.alt=img.alt;
   document.getElementById('lightboxEvent').textContent=item.dataset.photoEvent;
   document.getElementById('lightboxTitle').textContent=item.dataset.photoTitle;
   document.getElementById('lightboxCounter').textContent=String(active+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0');
 }
 photos.forEach(photo=>photo.addEventListener('click',()=>{
   trigger=photo;
   show(visible.indexOf(photo));
   lightbox.hidden=false;
   document.body.classList.add('lightbox-open');
   close.focus();
 }));
 function dismiss() {
   lightbox.hidden=true;
   document.body.classList.remove('lightbox-open');
   lightboxImage.removeAttribute('src');
   if(trigger)trigger.focus();
 }
 close.addEventListener('click',dismiss);
 document.getElementById('lightboxPrev').addEventListener('click',()=>show(active-1));
 document.getElementById('lightboxNext').addEventListener('click',()=>show(active+1));
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)dismiss()});
 window.addEventListener('keydown',e=>{
   if(lightbox.hidden)return;
   if(e.key==='Escape'){e.preventDefault();dismiss()}
   else if(e.key==='ArrowLeft'){e.preventDefault();show(active-1)}
   else if(e.key==='ArrowRight'){e.preventDefault();show(active+1)}
   else if(e.key==='Tab'){
     const targets=Array.from(lightbox.querySelectorAll('button'));
     const first=targets[0],last=targets[targets.length-1];
     if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
     else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
   }
 });
 setFilter('all');
})();
