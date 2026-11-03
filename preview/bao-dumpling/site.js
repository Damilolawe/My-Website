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
if(!reduce){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.animate(
          [{opacity:.15,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],
          {duration:750,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'}
        );
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0,rootMargin:'120px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
