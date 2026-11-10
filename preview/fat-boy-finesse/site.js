document.documentElement.classList.add('js');
const menu=document.getElementById('menu-toggle');const nav=document.getElementById('primary-nav');if(menu&&nav){const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open')};menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));window.addEventListener('resize',()=>{if(window.innerWidth>1100)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
const reveal=document.querySelectorAll('[data-reveal]');if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('seen');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px 50px 0px'});reveal.forEach(el=>observer.observe(el))}else{reveal.forEach(el=>el.classList.add('seen'))}
const moods={daily:{count:'01 / Everyday',title:'Easy to wear. Hard to forget.',text:'Fresh, versatile fragrances that feel right from the first spray. A solid place to start your scent journey.'},signature:{count:'02 / Signature',title:'Make it unmistakably yours.',text:'Memorable compositions with character and longevity. Discover something that feels personal, not just popular.'},bold:{count:'03 / Bold',title:'Enter the room before you do.',text:'Statement-making scents, deeper notes, and an unapologetic presence. For days when subtle is not the plan.'}};
const result=document.getElementById('scent-result');const flacon=document.querySelector('.flacon');document.querySelectorAll('[data-scent]').forEach(button=>button.addEventListener('click',()=>{const entry=moods[button.dataset.scent];if(!entry||!result)return;if(flacon)flacon.dataset.mood=button.dataset.scent;document.querySelectorAll('[data-scent]').forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active))});result.replaceChildren();const small=document.createElement('span');small.className='scent-num';small.textContent=entry.count;const heading=document.createElement('h3');heading.textContent=entry.title;const para=document.createElement('p');para.textContent=entry.text;result.append(small,heading,para)}));
const refresh=document.getElementById('refresh-live');
const frame=document.querySelector('#live-frame iframe');
const liveMessage=document.getElementById('live-message');
if(refresh&&frame){
 let lastChecked=Date.now();
 const checkLive=()=>{
  const url=new URL('https://www.youtube.com/embed/live_stream');
  url.searchParams.set('channel','UC_-FXJoPsApGI_xV1SvRFNw');
  url.searchParams.set('rel','0');
  url.searchParams.set('playsinline','1');
  url.searchParams.set('check',String(Date.now()));
  frame.src=url.toString();
  lastChecked=Date.now();
  if(liveMessage)liveMessage.textContent='Player refreshed. If there is no public live stream, YouTube may show an unavailable message. Open the channel for live chat, replays and uploads.';
 };
 refresh.addEventListener('click',checkLive);
 document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&Date.now()-lastChecked>5*60*1000)checkLive();
 });
}
