const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
toggle?.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')==='true';
  toggle.setAttribute('aria-expanded',String(!open));
  nav.classList.toggle('is-open',!open);
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded','false');
}));

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));}
else{
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    });
  },{threshold:.12,rootMargin:'0px 0px -6%'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
