document.documentElement.classList.add('js');
const menu=document.getElementById('menu-toggle');const nav=document.getElementById('primary-nav');if(menu&&nav){const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open')};menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));window.addEventListener('resize',()=>{if(window.innerWidth>1100)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
const reveal=document.querySelectorAll('[data-reveal]');if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('seen');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px 50px 0px'});reveal.forEach(el=>observer.observe(el))}else{reveal.forEach(el=>el.classList.add('seen'))}
const moods={daily:{count:'01 / Everyday',title:'Easy to wear. Hard to forget.',text:'Fresh, versatile fragrances that feel right from the first spray. A solid place to start your scent journey.'},signature:{count:'02 / Signature',title:'Make it unmistakably yours.',text:'Memorable compositions with character and longevity. Discover something that feels personal, not just popular.'},bold:{count:'03 / Bold',title:'Enter the room before you do.',text:'Statement-making scents, deeper notes, and an unapologetic presence. For days when subtle is not the plan.'}};
const result=document.getElementById('scent-result');const flacon=document.querySelector('.flacon');document.querySelectorAll('[data-scent]').forEach(button=>button.addEventListener('click',()=>{const entry=moods[button.dataset.scent];if(!entry||!result)return;if(flacon)flacon.dataset.mood=button.dataset.scent;document.querySelectorAll('[data-scent]').forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active))});result.replaceChildren();const small=document.createElement('span');small.className='scent-num';small.textContent=entry.count;const heading=document.createElement('h3');heading.textContent=entry.title;const para=document.createElement('p');para.textContent=entry.text;result.append(small,heading,para)}));
/* Latest-upload fallback is always available, even if the live check fails.
   The official IFrame API probes whether the channel actually has an embeddable
   broadcast; it never treats the header's red styling as proof of being live. */
const watchRoom=document.getElementById('live-set');
const videoFrame=document.getElementById('live-player');
const probeHost=document.getElementById('live-probe-host');
const streamStatus=document.getElementById('live-state');
const streamMessage=document.getElementById('live-message');
const checkButton=document.getElementById('refresh-live');
if(watchRoom&&videoFrame&&probeHost&&streamStatus&&streamMessage&&checkButton){
 const channel='UC_-FXJoPsApGI_xV1SvRFNw';
 const uploads='UU_-FXJoPsApGI_xV1SvRFNw';
 const recentUrl='https://www.youtube.com/embed/videoseries?list='+uploads+'&index=0&rel=0&playsinline=1&autoplay=1&mute=1';
 const liveUrl='https://www.youtube.com/embed/live_stream?channel='+channel+'&rel=0&playsinline=1&autoplay=1&mute=1';
 let activeMode='latest',checkNumber=0,probePlayer=null,checkTimeout=null,lastCheck=0;
 function setMode(mode){
  if(activeMode===mode)return;
  activeMode=mode;
  watchRoom.classList.toggle('is-live',mode==='live');
  if(mode==='live'){
   videoFrame.src=liveUrl;
   streamStatus.textContent='LIVE BROADCAST';
   streamMessage.textContent='Walter is broadcasting on YouTube. Watch here, or open his channel to join the live chat.';
  }else{
   videoFrame.src=recentUrl;
   streamStatus.textContent='LATEST UPLOAD';
   streamMessage.textContent='Showing the newest public upload. The player switches back when YouTube confirms a livestream. Autoplay may require a tap.';
  }
 }
 function clearProbe(){
  if(checkTimeout){clearTimeout(checkTimeout);checkTimeout=null;}
  if(probePlayer){try{probePlayer.destroy();}catch(error){}probePlayer=null;}
  probeHost.replaceChildren();
 }
 function hasActualVideo(player){
  try{
   const url=new URL(player.getVideoUrl());
   return /^[A-Za-z0-9_-]{11}$/.test(url.searchParams.get('v')||'');
  }catch(error){return false;}
 }
 function checkForLive(){
  if(!window.YT||typeof window.YT.Player!=='function'){
   streamMessage.textContent='The newest video is ready to play. Automatic live checks are unavailable; open the YouTube channel to check the broadcast.';
   return;
  }
  const number=++checkNumber;
  clearProbe();
  lastCheck=Date.now();
  checkButton.disabled=true;
  checkButton.textContent='Checking...';
  const probe=document.createElement('iframe');
  probe.title='Background livestream availability check';
  probe.tabIndex=-1;
  probe.setAttribute('aria-hidden','true');
  const src=new URL('https://www.youtube.com/embed/live_stream');
  src.searchParams.set('channel',channel);
  src.searchParams.set('enablejsapi','1');
  src.searchParams.set('origin',location.origin);
  src.searchParams.set('playsinline','1');
  src.searchParams.set('autoplay','1');
  src.searchParams.set('mute','1');
  src.searchParams.set('rel','0');
  probe.src=src.toString();
  probeHost.append(probe);
  let finished=false;
  function finish(isLive){
   if(finished||number!==checkNumber)return;
   finished=true;
   clearProbe();
   checkButton.disabled=false;
   checkButton.textContent='Check for live';
   if(isLive)setMode('live');
   else if(activeMode==='live')setMode('latest');
   else{
    streamStatus.textContent='LATEST UPLOAD';
    streamMessage.textContent='Showing the newest public upload. No embeddable livestream was detected. The YouTube channel link is always available, and autoplay may require a tap.';
   }
  }
  checkTimeout=setTimeout(()=>finish(false),11000);
  try{
   probePlayer=new window.YT.Player(probe,{
    events:{
     onReady:event=>{if(hasActualVideo(event.target))finish(true);},
     onStateChange:event=>{
      if([1,2,3,5].includes(event.data)&&hasActualVideo(event.target))finish(true);
     },
     onError:()=>finish(false)
    }
   });
  }catch(error){finish(false);}
 }
 checkButton.addEventListener('click',checkForLive);
 document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&Date.now()-lastCheck>2*60*1000)checkForLive();
 });
 window.setInterval(()=>{if(!document.hidden)checkForLive();},2*60*1000);
 window.onYouTubeIframeAPIReady=checkForLive;
 if(window.YT&&typeof window.YT.Player==='function')checkForLive();
 else{
  const script=document.createElement('script');
  script.src='https://www.youtube.com/iframe_api';
  script.async=true;
  script.onerror=()=>{
   streamMessage.textContent='The newest video is ready to play. Automatic livestream checks are unavailable right now; open YouTube to watch live.';
  };
  document.head.append(script);
 }
}
