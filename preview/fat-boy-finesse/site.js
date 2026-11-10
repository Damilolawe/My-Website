document.documentElement.classList.add('js');
const menu=document.getElementById('menu-toggle');const nav=document.getElementById('primary-nav');if(menu&&nav){const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open')};menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));window.addEventListener('resize',()=>{if(window.innerWidth>1100)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
const reveal=document.querySelectorAll('[data-reveal]');if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('seen');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px 50px 0px'});reveal.forEach(el=>observer.observe(el))}else{reveal.forEach(el=>el.classList.add('seen'))}
const moods={daily:{count:'01 / Everyday',title:'Easy to wear. Hard to forget.',text:'Fresh, versatile fragrances that feel right from the first spray. A solid place to start your scent journey.'},signature:{count:'02 / Signature',title:'Make it unmistakably yours.',text:'Memorable compositions with character and longevity. Discover something that feels personal, not just popular.'},bold:{count:'03 / Bold',title:'Enter the room before you do.',text:'Statement-making scents, deeper notes, and an unapologetic presence. For days when subtle is not the plan.'}};
const result=document.getElementById('scent-result');const flacon=document.querySelector('.flacon');document.querySelectorAll('[data-scent]').forEach(button=>button.addEventListener('click',()=>{const entry=moods[button.dataset.scent];if(!entry||!result)return;if(flacon)flacon.dataset.mood=button.dataset.scent;document.querySelectorAll('[data-scent]').forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active))});result.replaceChildren();const small=document.createElement('span');small.className='scent-num';small.textContent=entry.count;const heading=document.createElement('h3');heading.textContent=entry.title;const para=document.createElement('p');para.textContent=entry.text;result.append(small,heading,para)}));

/* The watch room always starts on the newest known *video ID*, never an
   uploads-playlist embed (which may render no player in browsers).
   A scheduled GitHub Action syncs this ID against YouTube's official RSS feed.
   YouTube IFrame API separately detects embeddable livestreams.
*/
const latestVideoId='GO1myfRMo_o';
const watchRoom=document.getElementById('live-set');
const videoFrame=document.getElementById('live-player');
const liveFrame=document.getElementById('live-frame');
const probeHost=document.getElementById('live-probe-host');
const streamStatus=document.getElementById('live-state');
if(watchRoom&&videoFrame&&liveFrame&&probeHost&&streamStatus){
 const channel='UC_-FXJoPsApGI_xV1SvRFNw';
 const directUrl=videoId=>'https://www.youtube.com/embed/'+videoId+'?rel=0&playsinline=1&autoplay=1&mute=1&enablejsapi=1';
 let currentMode='latest';
 let mainPlayer=null,mainReady=false,probePlayer=null,probeTimeout=null,checkSequence=0,lastCheck=0;
 const markFallback=()=>{
  liveFrame.classList.add('player-failed');
  const fallback=document.getElementById('latest-video-link');
  if(fallback)fallback.setAttribute('tabindex','0');
 };
 const setMode=(mode,liveId)=>{
  if(currentMode===mode)return;
  currentMode=mode;
  const isLive=mode==='live';
  watchRoom.classList.toggle('is-live',isLive);
  liveFrame.classList.remove('player-failed');
  streamStatus.textContent=isLive?'LIVE BROADCAST':'LATEST VIDEO';
  const targetId=isLive?liveId:latestVideoId;
  if(!targetId)return;
  if(mainReady&&mainPlayer){
   try{
    mainPlayer.mute();
    mainPlayer.loadVideoById(targetId);
    mainPlayer.playVideo();
    return;
   }catch(error){}
  }
  videoFrame.src=directUrl(targetId);
 };
 const detectId=player=>{
  try{
   const id=new URL(player.getVideoUrl()).searchParams.get('v')||'';
   return /^[A-Za-z0-9_-]{11}$/.test(id)?id:null;
  }catch(error){return null;}
 };
 const clearProbe=()=>{
  if(probeTimeout){clearTimeout(probeTimeout);probeTimeout=null;}
  if(probePlayer){try{probePlayer.destroy();}catch(error){}probePlayer=null;}
  probeHost.replaceChildren();
 };
 const checkLive=()=>{
  if(!window.YT||typeof window.YT.Player!=='function')return;
  const sequence=++checkSequence;
  clearProbe();
  lastCheck=Date.now();
  let finished=false;
  const finish=id=>{
   if(finished||sequence!==checkSequence)return;
   finished=true;
   clearProbe();
   if(id)setMode('live',id);
   else if(currentMode==='live')setMode('latest');
  };
  probeTimeout=setTimeout(()=>finish(null),11000);
  const probe=document.createElement('iframe');
  probe.title='Background livestream check';
  probe.setAttribute('aria-hidden','true');
  probe.tabIndex=-1;
  probe.allow='autoplay; encrypted-media';
  const url=new URL('https://www.youtube.com/embed/live_stream');
  url.searchParams.set('channel',channel);
  url.searchParams.set('enablejsapi','1');
  url.searchParams.set('origin',location.origin);
  url.searchParams.set('playsinline','1');
  url.searchParams.set('autoplay','0');
  url.searchParams.set('mute','1');
  probe.src=url.toString();
  probeHost.append(probe);
  try{
   probePlayer=new window.YT.Player(probe,{
    events:{
     onReady:event=>{const id=detectId(event.target);if(id)finish(id);},
     onStateChange:event=>{if([1,2,3,5].includes(event.data)){const id=detectId(event.target);if(id)finish(id);}},
     onError:()=>finish(null)
    }
   });
  }catch(error){finish(null);}
 };
 const init=()=>{
  if(!window.YT||typeof window.YT.Player!=='function')return;
  if(!mainPlayer){
   try{
    mainPlayer=new window.YT.Player(videoFrame,{
     events:{
      onReady:event=>{
       mainReady=true;
       try{event.target.mute();event.target.playVideo();}catch(error){}
      },
      onError:()=>{
       if(currentMode==='live')setMode('latest');
       else markFallback();
      }
     }
    });
   }catch(error){markFallback();}
  }
  checkLive();
 };
 window.onYouTubeIframeAPIReady=init;
 if(window.YT&&typeof window.YT.Player==='function')init();
 else{
  const script=document.createElement('script');
  script.src='https://www.youtube.com/iframe_api';
  script.async=true;
  document.head.append(script);
 }
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-lastCheck>2*60*1000)checkLive();});
 window.setInterval(()=>{if(!document.hidden)checkLive();},2*60*1000);
}
