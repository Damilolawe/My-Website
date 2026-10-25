(() => {
  "use strict";
  const show=document.querySelector("#awe-hero-showreel");
  if(!show)return;
  const views=[...show.querySelectorAll("[data-reel]")];
  const dots=[...show.querySelectorAll("[data-reel-select]")];
  const next=show.querySelector("#reel-next");
  const anchor=show.querySelector("#reel-explore");
  const count=show.querySelector("#reel-index");
  const ids=["/templates/actor/afterhours.html","/templates/student/terminal.html","/templates/business/bloom.html"];
  const compactTouch=window.matchMedia("(max-width: 900px), (pointer: coarse)");
  let index=0, interval=null,observed=false;
  function choose(nextIndex){
    index=(nextIndex+views.length)%views.length;
    for(let i=0;i<views.length;i++){
      const active=i===index;
      views[i].classList.toggle("is-active",active);
      views[i].inert=!active;
      views[i].setAttribute("aria-hidden",String(!active));
      dots[i].setAttribute("aria-pressed",String(active));
    }
    count.textContent=String(index+1).padStart(2,"0")+" / 03";
    anchor.href=ids[index];
  }
  function shouldPlay(){
    // Stop automatic deck changes during mobile scrolling; buttons still work.
    return observed&&!document.hidden&&!compactTouch.matches;
  }
  function reset(){
    if(interval!==null){clearInterval(interval);interval=null;}
    if(shouldPlay())interval=setInterval(()=>{
      if(!show.matches(":hover")&&!show.matches(":focus-within"))choose(index+1);
    },6800);
  }
  next?.addEventListener("click",()=>{choose(index+1);reset();});
  dots.forEach((button,i)=>button.addEventListener("click",()=>{choose(i);reset();}));
  show.addEventListener("mouseenter",reset);
  show.addEventListener("mouseleave",reset);
  show.addEventListener("focusin",reset);
  show.addEventListener("focusout",reset);
  document.addEventListener("visibilitychange",reset);
  document.addEventListener("awe:motion",reset);
  if("IntersectionObserver" in window){
    const watcher=new IntersectionObserver(entries=>{observed=entries[0]?.isIntersecting??false;reset();},{threshold:.25});
    watcher.observe(show);
  }else{observed=true;reset();}
  choose(0);
  {
    let context=null;
    const startMotion=()=>{
      context?.revert();context=null;
      if(compactTouch.matches)return;
      if(!window.gsap||!window.ScrollTrigger)return;
      window.gsap.registerPlugin(window.ScrollTrigger);
      context=window.gsap.context(()=>{
      if(document.querySelector(".awe-impact-statement h2 span") && document.querySelector(".awe-impact-statement"))window.gsap.from(".awe-impact-statement h2 span",{
        y:110,rotation:-2,opacity:.1,stagger:.17,ease:"power3.out",duration:1.2,
        scrollTrigger:{trigger:".awe-impact-statement",start:"top 76%",once:true}
      });
      if(document.querySelector(".impact-bottom>*") && document.querySelector(".impact-bottom"))window.gsap.from(".impact-bottom>*",{
        y:55,opacity:0,stagger:.16,duration:.8,ease:"power2.out",
        scrollTrigger:{trigger:".impact-bottom",start:"top 85%",once:true}
      });
      });
    };
    document.addEventListener('awe:motion',startMotion);
    startMotion();
  }
})();
