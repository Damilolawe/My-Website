import { fetchPublicTemplate, previewMessage } from "/shared/preview.mjs";
import { templates, types, typeSlugs, recommendedFor } from "/shared/model.mjs";
(() => {
  "use strict";
  const root=document.querySelector("#express-showcase");
  if(!root)return;
  const rail=root.querySelector("#worlds-choices"),frame=root.querySelector("#worlds-frame"),screen=root.querySelector("#worlds-screen");
  const name=root.querySelector("#worlds-name"),full=root.querySelector("#worlds-open");
  const loading=root.querySelector("#worlds-loading"),loadingName=root.querySelector("#worlds-loading-name");
  const view=root.querySelector(".worlds-view");
  const desktop=root.querySelector("#worlds-desktop"),mobile=root.querySelector("#worlds-mobile");
  const select=root.querySelector("#world-purpose");
  let selected="afterhours",purpose="Creative portfolio",version=0,controller=null;
  // Large sandbox previews are loaded near the gallery instead of on first paint.
  const deferPreview=matchMedia("(max-width: 900px), (pointer: coarse)").matches;
  let previewReady=!deferPreview;
  function syncFrame(){
    if(screen.classList.contains("is-mobile")){frame.style.width="";frame.style.height="";frame.style.transform="";view.style.height="";return;}
    const scale=Math.min(1,Math.max(1,view.clientWidth)/1280);
    frame.style.width="1280px";frame.style.height="1280px";frame.style.transform="scale("+scale+")";
    view.style.height=Math.round(1280*scale)+"px";
  }
  if("ResizeObserver" in window)new ResizeObserver(syncFrame).observe(view);
  else addEventListener("resize",syncFrame,{passive:true});
  const savedNames=new Map(templates.map(x=>[x.id,x.name]));
  function templatePath(id){return id==="runwaymulti"?"/experiments/runwayml-multipage/":"/templates/"+id+".html";}
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
    full.href=templatePath(id);screen.dataset.world=id;
    loading.hidden=false;loadingName.textContent=savedNames.get(id).toUpperCase();
    loading.setAttribute("aria-label","Loading "+savedNames.get(id)+" website preview");
    const still=false; // Desktop previews retain authored motion.
    screen.classList.toggle("is-changing",!still);
    frame.title="Original "+savedNames.get(id)+" website design preview";
    if(!previewReady)return;
    // Preserve the previous frame under the branded loading surface.
    try{
      const html=await fetchPublicTemplate(id,{type:purpose,still,signal:controller.signal});
      if(controller.signal.aborted||mine!==version)return;
      frame.onload=()=>{
        if(mine!==version)return;
        name.textContent=savedNames.get(id);loading.hidden=true;
        screen.classList.remove("is-changing");syncFrame();
      };
      frame.srcdoc=html;
    }catch(error){
      if(controller.signal.aborted||mine!==version)return;
      frame.onload=()=>{if(mine!==version)return;name.textContent=savedNames.get(id);loading.hidden=true;screen.classList.remove("is-changing");};
      frame.srcdoc=previewMessage("The preview could not load. Try Open Full Demo.");
      console.warn("Template preview unavailable",error);
    }
  }
  function size(mobileView){
    screen.classList.toggle("is-mobile",mobileView);
    desktop.setAttribute("aria-pressed",String(!mobileView));
    mobile.setAttribute("aria-pressed",String(mobileView));
    syncFrame();
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
  populate();
  if(!previewReady){
    frame.srcdoc=previewMessage("The collection is coming into view.");
    name.textContent="Selecting a design";
    choose(selected);
    if("IntersectionObserver" in window){
      const observer=new IntersectionObserver(entries=>{
        if(!entries.some(entry=>entry.isIntersecting))return;
        observer.disconnect();previewReady=true;choose(selected);
      },{rootMargin:"450px 0px"});
      observer.observe(root);
    }else{previewReady=true;choose(selected);}
  }else choose(selected);
  syncFrame();
})();
