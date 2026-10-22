import { fetchPublicTemplate, previewMessage } from "/shared/preview.mjs";
(() => {
  "use strict";
  const root=document.querySelector("#express-showcase");
  if(!root)return;
  const choices=[...root.querySelectorAll("[data-world]")];
  const frame=root.querySelector("#worlds-frame");
  const screen=root.querySelector("#worlds-screen");
  const name=root.querySelector("#worlds-name");
  const full=root.querySelector("#worlds-open");
  const desktop=root.querySelector("#worlds-desktop"),mobile=root.querySelector("#worlds-mobile");
  const allowed=new Map([["index","The Index"],["folio","Folio No. 01"],["still","Still Studio"],["afterhours","After Hours"],["signal","Signal / Noise"],["daylight","Daylight"]]);
  let selected="afterhours",loadVersion=0,loadingController=null;
  async function choose(id){
    if(!allowed.has(id))return;
    selected=id;
    const version=++loadVersion;
    loadingController?.abort();
    const controller=new AbortController();
    loadingController=controller;
    choices.forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.world===id)));
    name.textContent=allowed.get(id);
    full.href="/templates/"+id+".html";
    screen.dataset.world=id;
    const still = !!window.AWE_MOTION_PAUSED ||
      matchMedia("(prefers-reduced-motion:reduce)").matches;
    screen.classList.toggle("is-changing",!still);
    frame.title="Fictional "+allowed.get(id)+" website demonstration";
    frame.srcdoc=previewMessage("Loading "+allowed.get(id)+"…");
    try{
      const html=await fetchPublicTemplate(id,{still,signal:controller.signal});
      if(controller.signal.aborted||version!==loadVersion)return;
      frame.onload=()=>screen.classList.remove("is-changing");
      frame.srcdoc=html;
    }catch(error){
      if(controller.signal.aborted||version!==loadVersion)return;
      frame.onload=null;
      frame.srcdoc=previewMessage("This preview could not load. Open the full demo using the link below.");
      screen.classList.remove("is-changing");
      console.warn("Template preview unavailable",error);
    }
  }
  function size(mobileView){
    screen.classList.toggle("is-mobile",mobileView);
    desktop.setAttribute("aria-pressed",String(!mobileView));
    mobile.setAttribute("aria-pressed",String(mobileView));
  }
  choices.forEach(button=>button.addEventListener("click",()=>choose(button.dataset.world)));
  desktop.addEventListener("click",()=>size(false));
  mobile.addEventListener("click",()=>size(true));
  root.querySelector("#worlds-choices").addEventListener("keydown",event=>{
    if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key))return;
    const i=choices.findIndex(btn=>btn===document.activeElement);
    if(i<0)return;
    const delta=/Up|Left/.test(event.key)?-1:1;
    const next=choices[(i+delta+choices.length)%choices.length];
    event.preventDefault();next.focus();choose(next.dataset.world);
  });
  document.addEventListener("awe:motion",()=>choose(selected));
  choose(selected);
})();
