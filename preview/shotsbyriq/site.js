(()=>{
'use strict';
const menuButton=document.querySelector('.menu-button'),menu=document.getElementById('menu-panel');
const closeMenu=()=>{if(!menu||!menuButton)return;menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu')};
menuButton?.addEventListener('click',()=>{const opening=menu.hidden;menu.hidden=!opening;menuButton.setAttribute('aria-expanded',String(opening));menuButton.setAttribute('aria-label',opening?'Close menu':'Open menu')});
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!menuButton.contains(e.target))closeMenu()});
const header=document.querySelector('.topbar');addEventListener('scroll',()=>header?.classList.toggle('is-scrolled',scrollY>25),{passive:true});
const replaceBrokenPhoto=img=>{
 if(img.dataset.fallbackApplied)return;
 img.dataset.fallbackApplied='1';
 const fallback=document.createElement('a');
 fallback.href='https://www.instagram.com/shotsbyriq_/';
 fallback.target='_blank';
 fallback.rel='noopener noreferrer';
 fallback.setAttribute('aria-label','View SHOTSBYRIQ photography on Instagram');
 fallback.textContent='VIEW PHOTOGRAPHY ON INSTAGRAM';
 Object.assign(fallback.style,{display:'grid',placeItems:'center',width:'100%',height:'100%',minHeight:'180px',padding:'24px',background:'#151a26',color:'#8fb7ff',font:'700 12px/1.4 Arial,sans-serif',letterSpacing:'.12em',textAlign:'center',textDecoration:'none'});
 img.replaceWith(fallback);
};
document.querySelectorAll('img[src]').forEach(img=>{
 if(img.id==='lb-image')return;
 img.addEventListener('error',()=>replaceBrokenPhoto(img),{once:true});
 if(img.complete&&img.naturalWidth===0)replaceBrokenPhoto(img);
});
const tiles=[...document.querySelectorAll('.frame')],filters=[...document.querySelectorAll('[data-filter]')],sheet=document.querySelector('.contact-sheet'),count=document.querySelector('#archive-count');
let category='all',visible=tiles,activeIndex=0,previousFocus=null;
const filterView=tag=>{
category=tag;filters.forEach(b=>{const selected=b.dataset.filter===tag;b.setAttribute('aria-pressed',String(selected));b.classList.toggle('is-selected',selected)});
visible=tiles.filter(tile=>tag==='all'||tile.dataset.category===tag);tiles.forEach(tile=>tile.hidden=!visible.includes(tile));sheet.classList.toggle('is-filtered',tag!=='all');count.textContent=String(visible.length).padStart(2,'0')+' / '+String(tiles.length).padStart(2,'0')};
filters.forEach(b=>b.addEventListener('click',()=>filterView(b.dataset.filter)));
const modal=document.querySelector('#lightbox'),modalImage=document.querySelector('#lb-image'),modalTitle=document.querySelector('#lb-title'),modalPost=document.querySelector('#lb-post'),modalIndex=document.querySelector('#lb-index'),closeButton=modal.querySelector('.lb-close');
const source=[
{label:'Golden Era — I',post:'https://www.instagram.com/shotsbyriq_/p/DFtmwvXIxYl/'},
{label:'Golden Era — II',post:'https://www.instagram.com/shotsbyriq_/p/DFtmwvXIxYl/'},
{label:'The Birthday — I',post:'https://www.instagram.com/shotsbyriq_/p/DXQJUe1lEVe/'},
{label:'The Birthday — II',post:'https://www.instagram.com/shotsbyriq_/p/DXQJUe1lEVe/'},
{label:'Portrait Study — I',post:'https://www.instagram.com/shotsbyriq_/p/DeZ-_HAFOA6/'},
{label:'Portrait Study — II',post:'https://www.instagram.com/shotsbyriq_/p/DeZ-_HAFOA6/'},
{label:'That Birthday Glow',post:'https://www.instagram.com/shotsbyriq_/p/DeNlullleB0/'},
{label:'The Nurse Brat — I',post:'https://www.instagram.com/shotsbyriq_/p/DeIK9C3FGhF/'},
{label:'The Nurse Brat — II',post:'https://www.instagram.com/shotsbyriq_/p/DeIK9C3FGhF/'}
];
const display=(index)=>{if(!visible.length)return;activeIndex=(index+visible.length)%visible.length;const tile=visible[activeIndex],image=tile.querySelector('img'),p=source[Number(tile.dataset.photo)];modalImage.src=image.currentSrc||image.src;modalImage.alt=image.alt;modalTitle.textContent=p.label;modalPost.href=p.post;modalIndex.textContent=String(activeIndex+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0')};
const open=(tile)=>{previousFocus=document.activeElement;display(visible.indexOf(tile));modal.hidden=false;document.body.classList.add('modal-open');closeButton.focus()};
const close=()=>{if(modal.hidden)return;modal.hidden=true;document.body.classList.remove('modal-open');modalImage.removeAttribute('src');previousFocus?.focus()};
tiles.forEach(tile=>tile.addEventListener('click',()=>open(tile)));
const collageLinks=[...document.querySelectorAll('[data-open-photo]')];
collageLinks.forEach(link=>link.addEventListener('click',event=>{
 const index=Number(link.dataset.openPhoto);
 const tile=tiles.find(item=>Number(item.dataset.photo)===index);
 if(!tile)return;
 event.preventDefault();
 filterView('all');
 open(tile);
}));
closeButton.addEventListener('click',close);modal.querySelector('.lb-prev').addEventListener('click',()=>display(activeIndex-1));modal.querySelector('.lb-next').addEventListener('click',()=>display(activeIndex+1));
modal.addEventListener('click',e=>{if(e.target===modal)close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();closeMenu()}if(modal.hidden)return;if(e.key==='ArrowRight'){e.preventDefault();display(activeIndex+1)}if(e.key==='ArrowLeft'){e.preventDefault();display(activeIndex-1)}if(e.key==='Tab'){const controls=[closeButton,modal.querySelector('.lb-prev'),modal.querySelector('.lb-next'),modalPost],first=controls[0],last=controls.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
let start=null;modal.addEventListener('touchstart',e=>{if(e.touches.length===1)start={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});modal.addEventListener('touchend',e=>{if(!start||e.changedTouches.length!==1)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3)display(activeIndex+(dx<0?1:-1))},{passive:true});
filterView('all');

// An unobtrusive camera-exposure meter and staggered contact-sheet reveal.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion && 'IntersectionObserver' in window){
 const meter=document.createElement('span');
 meter.className='exposure-progress';
 meter.setAttribute('aria-hidden','true');
 document.body.appendChild(meter);
 let scheduled=false;
 const update=()=>{
  const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
  meter.style.transform='scaleX('+Math.max(0,Math.min(1,scrollY/max))+')';
  scheduled=false;
 };
 const queue=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}};
 addEventListener('scroll',queue,{passive:true});
 addEventListener('resize',queue,{passive:true});
 update();
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(entry.isIntersecting){entry.target.classList.add('photo-arrived');observer.unobserve(entry.target)}
  }
 },{threshold:.06,rootMargin:'0px 0px 45px 0px'});
 tiles.forEach(tile=>observer.observe(tile));
 document.body.classList.add('photo-motion');
}
})();