(() => {
  "use strict";
  const slider=document.querySelector("#transformation-slider");
  const stage=document.querySelector("#transformation-stage");
  if(!slider||!stage)return;
  const setPosition=(value)=>{
    const n=Math.max(0,Math.min(100,Number(value)||0));
    stage.style.setProperty("--reveal",n+"%");
    slider.setAttribute("aria-valuetext",Math.round(n)+"% AWE visual direction revealed");
  };
  slider.addEventListener("input",()=>setPosition(slider.value));
  setPosition(slider.value);
  // Pointer/drag support never overrides keyboard or native range accessibility.
  let dragging=false;
  const move=(event)=>{
    if(!dragging)return;
    const rect=stage.getBoundingClientRect();
    const percent=(event.clientX-rect.left)/rect.width*100;
    slider.value=String(Math.min(100,Math.max(0,Math.round(percent))));
    setPosition(slider.value);
  };
  stage.addEventListener("pointerdown",(event)=>{
    if(event.button!==0)return;
    dragging=true;
    stage.setPointerCapture?.(event.pointerId);
    move(event);
  });
  stage.addEventListener("pointermove",move);
  stage.addEventListener("pointerup",()=>{dragging=false;});
  stage.addEventListener("pointercancel",()=>{dragging=false;});
  if(window.gsap&&window.ScrollTrigger && !window.AWE_MOTION_PAUSED){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".transformation-head h2",{y:70,opacity:0,duration:1.15,ease:"power3.out",scrollTrigger:{trigger:".awe-transformation",start:"top 80%",once:true}});
    gsap.from(".transformation-stage",{y:75,opacity:0,duration:1.1,ease:"power3.out",scrollTrigger:{trigger:".transformation-stage",start:"top 89%",once:true}});
  }
})();
