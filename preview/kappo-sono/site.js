
document.addEventListener('DOMContentLoaded',()=>{
 const header=document.querySelector('.site-header');
 const toggle=document.querySelector('.menu-toggle');
 const mobile=document.querySelector('.mobile-nav');
 const closeMenu=()=>{if(!toggle||!mobile)return;mobile.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation')};
 if(toggle&&mobile){toggle.addEventListener('click',()=>{const show=!mobile.classList.contains('open');mobile.classList.toggle('open',show);toggle.setAttribute('aria-expanded',String(show));toggle.setAttribute('aria-label',show?'Close navigation':'Open navigation')});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});}
 const setHeader=()=>header&&header.classList.toggle('scrolled',window.scrollY>20);
 setHeader();addEventListener('scroll',setHeader,{passive:true});
 const reveals=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const observer=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}})},{threshold:.07});reveals.forEach(el=>observer.observe(el))}else reveals.forEach(el=>el.classList.add('in-view'));
 const filters=[...document.querySelectorAll('[data-gallery-filter]')],tiles=[...document.querySelectorAll('.gallery-tile')];
 if(filters.length){filters.forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.galleryFilter;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));tiles.forEach(tile=>{tile.hidden=category!=='all'&&tile.dataset.category!==category});const count=document.querySelector('.gallery-count');if(count){const n=tiles.filter(tile=>!tile.hidden).length;count.textContent='Showing '+n+' '+(n===1?'photograph.':'photographs.')}}))}
 const lightbox=document.querySelector('.lightbox');
 if(lightbox&&tiles.length){
 const photo=lightbox.querySelector('img'),caption=lightbox.querySelector('.lightbox-caption'),close=lightbox.querySelector('.lightbox-close');
 let current=0,focusBefore=null;
 const visible=()=>tiles.filter(t=>!t.hidden);
 const show=index=>{const arr=visible();if(!arr.length)return;current=(index+arr.length)%arr.length;const el=arr[current];photo.src=el.querySelector('img').src;photo.alt=el.querySelector('img').alt;caption.textContent=(current+1)+' / '+arr.length+' — '+(el.dataset.caption||photo.alt)};
 const hide=()=>{lightbox.hidden=true;document.body.classList.remove('modal-open');photo.removeAttribute('src');if(focusBefore)focusBefore.focus()};
 tiles.forEach(tile=>tile.addEventListener('click',()=>{focusBefore=tile;show(visible().indexOf(tile));lightbox.hidden=false;document.body.classList.add('modal-open');close.focus()}));
 close.addEventListener('click',hide);
 lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>show(current-1));
 lightbox.querySelector('.lightbox-next').addEventListener('click',()=>show(current+1));
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)hide()});
 document.addEventListener('keydown',e=>{if(lightbox.hidden)return;if(e.key==='Escape'){hide();return}if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}if(e.key==='Tab'){const controls=[close,lightbox.querySelector('.lightbox-prev'),lightbox.querySelector('.lightbox-next')];const i=controls.indexOf(document.activeElement);if((e.shiftKey&&i===0)||i===-1){e.preventDefault();(e.shiftKey?controls[2]:controls[0]).focus()}else if(!e.shiftKey&&i===2){e.preventDefault();controls[0].focus()}}});
 let touchStart=null;
 lightbox.addEventListener('touchstart',event=>{if(event.touches.length===1)touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY}},{passive:true});
 lightbox.addEventListener('touchend',event=>{if(!touchStart||event.changedTouches.length!==1)return;const dx=event.changedTouches[0].clientX-touchStart.x;const dy=event.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)show(current+(dx<0?1:-1))},{passive:true});
 }

 // Progressive motion: enhance the existing page without hiding content on
 // browsers that do not support IntersectionObserver or reduced-motion queries.
 const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(!motionPreference.matches&&'IntersectionObserver'in window){
  document.documentElement.classList.add('motion-enhanced');
  const staggerGroups=document.querySelectorAll('.split,.features,.press,.story-stats,.visit-grid,.course-list,.gallery-grid,.menu-photo');
  staggerGroups.forEach(group=>{
   const children=[...group.children].filter(el=>el.matches('.reveal,.course,.feature,.gallery-tile,.contact-line,a,.image-shell,div'));
   children.forEach((el,index)=>el.style.setProperty('--motion-delay',Math.min(index%4,3)*90+'ms'));
  });
  const animated=[...document.querySelectorAll('.gallery-tile,.feature,.press a,.story-stats > div,.contact-line,.faq details')];
  const motionObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(entry.isIntersecting){
     entry.target.classList.add('in-view');
     motionObserver.unobserve(entry.target);
    }
   });
  },{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  animated.forEach(el=>{el.classList.add('motion-item');motionObserver.observe(el)});
  // The tiny progress accent is purely decorative and never captures input.
  const progress=document.createElement('span');
  progress.className='scroll-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.appendChild(progress);
  let scheduled=false;
  const syncProgress=()=>{
   const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
   progress.style.transform='scaleX('+Math.max(0,Math.min(1,window.scrollY/max))+')';
   scheduled=false;
  };
  const queueProgress=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(syncProgress)}};
  queueProgress();
  window.addEventListener('scroll',queueProgress,{passive:true});
  window.addEventListener('resize',queueProgress,{passive:true});
 }
 // A single-observer, progressive brushstroke on imagery and chapter panels.
 // The images themselves are never hidden, and the movement is skipped for
 // reduced-motion users.
 if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
  const inkSurfaces=document.querySelectorAll('.chap .image-shell,.menu-photo .image-shell');
  const inkObserver=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    entry.target.classList.add('motion-reached');
    inkObserver.unobserve(entry.target);
   }
  },{threshold:.18});
  inkSurfaces.forEach(element=>inkObserver.observe(element));
 }

});
