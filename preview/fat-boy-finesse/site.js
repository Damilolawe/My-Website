document.documentElement.classList.add('js');
const menu=document.getElementById('menu-toggle');const nav=document.getElementById('primary-nav');if(menu&&nav){const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open')};menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));window.addEventListener('resize',()=>{if(window.innerWidth>1100)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
const reveal=document.querySelectorAll('[data-reveal]');if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('seen');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px 50px 0px'});reveal.forEach(el=>observer.observe(el))}else{reveal.forEach(el=>el.classList.add('seen'))}
/* The red scrolling banner needs enough repeated content to fill even very
   wide desktop monitors. Animate by exactly one group's measured width,
   so the repeat starts at the same position with no blank or visible jump. */
const ticker=document.querySelector('.ticker');
const tickerTrack=ticker?.querySelector('.ticker-track');
if(ticker&&tickerTrack){
 const firstGroup=tickerTrack.querySelector('.ticker-group');
 if(firstGroup){
  const fillTicker=()=>{
   tickerTrack.querySelectorAll('.ticker-group').forEach((group,index)=>{if(index>0)group.remove();});
   const groupWidth=firstGroup.getBoundingClientRect().width;
   if(!(groupWidth>0))return;
   // One full group must remain beyond the visible area during scrolling.
   const needed=ticker.clientWidth+groupWidth;
   while(tickerTrack.scrollWidth<needed&&tickerTrack.children.length<24){
    const copy=firstGroup.cloneNode(true);
    copy.setAttribute('aria-hidden','true');
    tickerTrack.appendChild(copy);
   }
   tickerTrack.style.setProperty('--ticker-distance','-'+groupWidth+'px');
   tickerTrack.style.setProperty('--ticker-duration',Math.max(14,groupWidth/60)+'s');
  };
  fillTicker();
  window.addEventListener('resize',fillTicker,{passive:true});
  if(document.fonts?.ready)document.fonts.ready.then(fillTicker).catch(()=>{});
 }
}
/* The watch room always starts on the newest known *video ID*, never an
   uploads-playlist embed (which may render no player in browsers).
   A scheduled GitHub Action syncs this ID against YouTube's official RSS feed.
   YouTube IFrame API separately detects embeddable livestreams.
*/
const longFormVideoIds=["DJb4xBSUryc","oQbOUW6HLoQ","Gqj1NNd6qqY","3CDeenHTCBU","E_X7xLwTTME","fnMRdWTycmA","eLn6aAvyXnE","zG3AEsvUijw","9r_k_hC60ME","GGT05pQV6Hc","4OKWfCOf3mY","qacsB8AFiG8","auir4COP4pY","HGAVxS686q8","SAg1GlwR7iQ"];
const latestVideoId=longFormVideoIds[0];
const watchRoom=document.getElementById('live-set');
const videoFrame=document.getElementById('live-player');
const liveFrame=document.getElementById('live-frame');
const probeHost=document.getElementById('live-probe-host');
if(watchRoom&&videoFrame&&liveFrame&&probeHost){
 const channel='UC_-FXJoPsApGI_xV1SvRFNw';
 const directUrl=videoId=>'https://www.youtube.com/embed/'+videoId+'?rel=0&playsinline=1&autoplay=1&mute=1&enablejsapi=1';
 let currentMode='latest';
 let longFormIndex=0,consecutiveErrors=0;
 let mainPlayer=null,mainReady=false,probePlayer=null,probeTimeout=null,checkSequence=0,lastCheck=0;
 const markFallback=()=>{
  liveFrame.classList.add('player-failed');
  const fallback=document.getElementById('latest-video-link');
  if(fallback)fallback.setAttribute('tabindex','0');
 };
 const updateFallback=videoId=>{
  const link=document.getElementById('latest-video-link');
  const poster=document.getElementById('latest-video-thumbnail');
  if(link)link.href='https://www.youtube.com/watch?v='+videoId;
  if(poster)poster.src='https://i.ytimg.com/vi/'+videoId+'/hqdefault.jpg';
 };
 // A published text queue lets open tabs notice new long-form uploads without a refresh.
 let syncingUploads=false,lastUploadCheck=0;
 const syncNewUploads=async()=>{
  if(document.hidden||syncingUploads)return;
  syncingUploads=true;
  lastUploadCheck=Date.now();
  try{
   const url=new URL('./latest-videos.txt',location.href);
   url.searchParams.set('checked',String(Date.now()));
   const response=await fetch(url.toString(),{cache:'no-store',signal:AbortSignal.timeout(10000)});
   if(!response.ok)return;
   const found=(await response.text()).trim().split(/\r?\n/).filter(Boolean);
   if(found.length<2||found.length>15||found.some(id=>!/^[A-Za-z0-9_-]{11}$/.test(id))||new Set(found).size!==found.length)return;
   const oldLatest=longFormVideoIds[0];
   const playingId=longFormVideoIds[longFormIndex];
   longFormVideoIds.splice(0,longFormVideoIds.length,...found);
   if(found[0]!==oldLatest){
    updateFallback(found[0]);
    // A new upload replaces normal playback immediately, not a verified live stream.
    if(currentMode==='latest')playLongFormAt(0);
   }else{
    const updatedIndex=longFormVideoIds.indexOf(playingId);
    if(updatedIndex>=0)longFormIndex=updatedIndex;
   }
  }catch(error){
   // Keep existing playback if the update check is temporarily unavailable.
  }finally{syncingUploads=false;}
 };
 const playLongFormAt=index=>{
  if(currentMode!=='latest')return;
  longFormIndex=((index%longFormVideoIds.length)+longFormVideoIds.length)%longFormVideoIds.length;
  const id=longFormVideoIds[longFormIndex];
  updateFallback(id);
  liveFrame.classList.remove('player-failed');
  if(mainReady&&mainPlayer){
   try{
    mainPlayer.loadVideoById(id);
    mainPlayer.playVideo();
    return;
   }catch(error){}
  }
  videoFrame.src=directUrl(id);
 };
 const playNextLongForm=()=>{
  if(currentMode==='latest')playLongFormAt(longFormIndex+1);
 };
 const setMode=(mode,liveId)=>{
  if(currentMode===mode)return;
  currentMode=mode;
  const isLive=mode==='live';
  watchRoom.classList.toggle('is-live',isLive);
  liveFrame.classList.remove('player-failed');
  if(!isLive){consecutiveErrors=0;playLongFormAt(0);return;}
  const targetId=liveId;
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
  url.searchParams.set('autoplay','1');
  url.searchParams.set('mute','1');
  probe.src=url.toString();
  probeHost.append(probe);
  // A video ID alone is not proof of a livestream. Require playback
  // with zero duration twice, or YouTube's explicit isLive flag.
  let verifying=false;
  const verifyLive=player=>{
   if(verifying||finished)return;
   const id=detectId(player);
   if(!id)return;
   let live=false;
   try{
    const state=player.getPlayerState();
    const duration=Number(player.getDuration());
    const data=player.getVideoData();
    live=(data?.isLive===true)||(state===1&&duration===0);
   }catch(error){return;}
   if(!live)return;
   verifying=true;
   setTimeout(()=>{
    verifying=false;
    if(finished||sequence!==checkSequence)return;
    try{
     const stillPlaying=player.getPlayerState()===1;
     const duration=Number(player.getDuration());
     const explicitLive=player.getVideoData()?.isLive===true;
     if(explicitLive||(stillPlaying&&duration===0))finish(id);
    }catch(error){}
   },1250);
  };
  try{
   probePlayer=new window.YT.Player(probe,{
    events:{
     onReady:event=>{try{event.target.mute();event.target.playVideo();}catch(error){}verifyLive(event.target);},
     onStateChange:event=>{if(event.data===1)verifyLive(event.target);},
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
      onStateChange:event=>{
       if(currentMode!=='latest')return;
       if(event.data===0)playNextLongForm();
       if(event.data===1)consecutiveErrors=0;
      },
      onError:()=>{
       if(currentMode==='live'){setMode('latest');return;}
       consecutiveErrors+=1;
       if(consecutiveErrors<longFormVideoIds.length)playNextLongForm();
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
 syncNewUploads();
 document.addEventListener('visibilitychange',()=>{
  if(!document.hidden){
   syncNewUploads();
   if(Date.now()-lastCheck>2*60*1000)checkLive();
  }
 });
 window.addEventListener('focus',()=>{if(Date.now()-lastUploadCheck>10000)syncNewUploads();});
 window.addEventListener('online',syncNewUploads);
 window.setInterval(()=>{if(!document.hidden)checkLive();},2*60*1000);
 window.setInterval(()=>{if(!document.hidden)syncNewUploads();},60*1000);
}
