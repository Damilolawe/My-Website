import { fetchPublicTemplate, previewMessage } from "/shared/preview.mjs";
import { templates, types, typeSlugs, recommendedFor } from "/shared/model.mjs";
(() => {
  "use strict";
  const root=document.querySelector("#express-showcase");
  if(!root)return;
  const rail=root.querySelector("#worlds-choices"),frame=root.querySelector("#worlds-frame"),screen=root.querySelector("#worlds-screen");
  const name=root.querySelector("#worlds-name"),full=root.querySelector("#worlds-open");
  const desktop=root.querySelector("#worlds-desktop"),mobile=root.querySelector("#worlds-mobile");
  const select=root.querySelector("#world-purpose");
  let selected="afterhours",purpose="Creative portfolio",version=0,controller=null;
  const savedNames=new Map(templates.map(x=>[x.id,x.name]));
  function templatePath(id){return "/templates/"+typeSlugs[purpose]+"/"+id+".html";}
  function populate(){
    const options=[...templates].sort((a,b)=>Number(recommendedFor(b,purpose))-Number(recommendedFor(a,purpose)));
    const fragment=document.createDocumentFragment();
    options.forEach((item,index)=>{
      const button=document.createElement("button");
      button.type="button";button.className="worlds-choice";button.dataset.world=item.id;
      button.setAttribute("aria-pressed",String(selected===item.id));
      const count=document.createElement("span");count.textContent=String(index+1).padStart(2,"0");
      const title=document.createElement("strong");title.textContent=item.name;
      const symbol=document.createElement("span");symbol.setAttribute("aria-hidden","true");symbol.textContent=recommendedFor(item,purpose)?"✳︎":"↗︎";
      if(recommendedFor(item,purpose))button.classList.add("is-recommended");
      button.append(count,title,symbol);
      button.addEventListener("click",()=>choose(item.id));
      fragment.append(button);
    });
    rail.replaceChildren(fragment);
  }
  async function choose(id){
    if(!savedNames.has(id))return;
    selected=id;version++;const mine=version;
    controller?.abort();controller=new AbortController();
    rail.querySelectorAll("[data-world]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.world===id)));
    name.textContent=savedNames.get(id);
    full.href=templatePath(id);screen.dataset.world=id;
    const still=!!window.AWE_MOTION_PAUSED || matchMedia("(prefers-reduced-motion:reduce)").matches;
    screen.classList.toggle("is-changing",!still);
    frame.title="Fictional "+savedNames.get(id)+" website for "+purpose;
    frame.srcdoc=previewMessage("Preparing a "+purpose+" design…");
    try{
      const html=await fetchPublicTemplate(id,{type:purpose,still,signal:controller.signal});
      if(controller.signal.aborted||mine!==version)return;
      frame.onload=()=>screen.classList.remove("is-changing");
      frame.srcdoc=html;
    }catch(error){
      if(controller.signal.aborted||mine!==version)return;
      frame.srcdoc=previewMessage("The preview could not load. Try Open Full Demo.");
      screen.classList.remove("is-changing");
      console.warn("Template preview unavailable",error);
    }
  }
  function size(mobileView){
    screen.classList.toggle("is-mobile",mobileView);
    desktop.setAttribute("aria-pressed",String(!mobileView));
    mobile.setAttribute("aria-pressed",String(mobileView));
  }
  for(const type of types){
    const option=document.createElement("option");option.value=type;option.textContent=type;select.append(option);
  }
  select.value=purpose;
  select.addEventListener("change",()=>{
    if(!types.includes(select.value))return;
    purpose=select.value;
    const featured=templates.find(t=>recommendedFor(t,purpose));
    if(featured)selected=featured.id;
    populate();choose(selected);
  });
  desktop.addEventListener("click",()=>size(false));
  mobile.addEventListener("click",()=>size(true));
  rail.addEventListener("keydown",(event)=>{
    if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key))return;
    const choices=[...rail.querySelectorAll("[data-world]")];
    const i=choices.indexOf(document.activeElement);
    if(i<0)return;
    event.preventDefault();
    const next=choices[(i+(/Up|Left/.test(event.key)?-1:1)+choices.length)%choices.length];
    next.focus();choose(next.dataset.world);
  });
  document.addEventListener("awe:motion",()=>choose(selected));
  populate();choose(selected);
})();
