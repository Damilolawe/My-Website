const button=document.querySelector('.menu-button');
const nav=document.querySelector('#nav');
button?.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open',!open)});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');button?.setAttribute('aria-expanded','false')}));

/* Minimal scroll-reveal for multipage content. Content always shows without
   JS, under reduced-motion, or in automated captures (navigator.webdriver). */
(function(){
  var nodes=document.querySelectorAll('[data-reveal-group],[data-reveal]');
  if(!nodes.length) return;
  var still=!!navigator.webdriver||(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if(still||!('IntersectionObserver' in window)){nodes.forEach(function(n){n.classList.add('seen')});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target);}})},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  nodes.forEach(function(n){io.observe(n)});
})();
