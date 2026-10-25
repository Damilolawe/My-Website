import {fetchPublicTemplate,previewMessage} from "./shared/preview.mjs";

/* Original, fictional AWE Express sites only. Never fetch unpublished
   customer pages, private drafts, or arbitrary URLs into srcdoc. */
(() => {
  "use strict";
  const root=document.querySelector("#awe-universe");
  const dialog=document.querySelector("#universe-dialog");
  const legacy=document.querySelector("#awe-hero-showreel");
  if(!root||!dialog)return;

  const cards=[...root.querySelectorAll(".universe-card[data-template]")];
  const allowed=new Map([
    ["runwayml",{name:"CINEMATIC",tier:"starter"}],
    ["liquidmetal",{name:"LIQUID METAL",tier:"starter"}],
    ["clay",{name:"SCULPT",tier:"starter"}],
    ["nike",{name:"ATHLETIC",tier:"starter"}],
  ]);
  const reduce=matchMedia("(prefers-reduced-motion: reduce)");
  const compact=matchMedia("(max-width: 960px), (pointer: coarse)");
  const frame=dialog.querySelector("#universe-live-frame");
  const frameWrap=dialog.querySelector("#universe-preview-wrap");
  const loading=dialog.querySelector("#universe-preview-loading");
  const closeButton=dialog.querySelector("#universe-close");
  const standalone=dialog.querySelector("#universe-standalone");
  const choose=dialog.querySelector("#universe-choose");
  const heading=dialog.querySelector("#universe-dialog-title");
  const cached=new Map();
  let activeCard=null,closing=false,serial=0;

  function getSite(id){
    if(!allowed.has(id))return Promise.reject(Error("Unknown design"));
    if(!cached.has(id))cached.set(id,fetchPublicTemplate(id,{still:reduce.matches}).catch(error=>{
      cached.delete(id);throw error;
    }));
    return cached.get(id);
  }
  // Original site assets are rendered as inert, script-free HTML in the
  // miniature and modal previews. Full interaction is available in a new tab.
  function showInFrame(id,target,onComplete){
    getSite(id).then(html=>{
      target.addEventListener("load",onComplete,{once:true});
      target.srcdoc=html;
    }).catch(()=>{
      target.addEventListener("load",onComplete,{once:true});
      target.srcdoc=previewMessage("Preview unavailable. Use OPEN FULL SITE to see this design.");
    });
  }
  function sizeSnapshot(snapshot){
    const width=snapshot.clientWidth||260;
    const scale=Math.min(.7,width/1200);
    snapshot.style.setProperty("--u-scale",String(scale));
    snapshot.style.setProperty("--u-document-height",Math.ceil((snapshot.clientHeight||160)/scale)+"px");
  }
  const resize="ResizeObserver" in window?
    new ResizeObserver(entries=>{for(const entry of entries)sizeSnapshot(entry.target);}):null;
  for(const card of cards){
    const snapshot=card.querySelector(".universe-snapshot");
    sizeSnapshot(snapshot);
    resize?.observe(snapshot);
    card.querySelector(".universe-open").addEventListener("click",()=>openWorld(card));
    card.querySelector(".universe-open").addEventListener("focus",()=>{
      if(compact.matches)card.scrollIntoView({block:"nearest",inline:"center",behavior:reduce.matches?"instant":"smooth"});
    });
  }
  const watch="IntersectionObserver" in window?
    new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        watch.unobserve(entry.target);
        const id=entry.target.dataset.preview;
        const mini=entry.target.querySelector("iframe");
        // Stagger fetching by visibility instead of loading all 116 designs.
        showInFrame(id,mini,()=>{entry.target.dataset.loaded="true";});
      }
    },{rootMargin:"80px",threshold:.08}):null;
  for(const card of cards){
    const snapshot=card.querySelector(".universe-snapshot");
    if(watch)watch.observe(snapshot);
    else showInFrame(snapshot.dataset.preview,snapshot.querySelector("iframe"),()=>{snapshot.dataset.loaded="true";});
  }

  let movePending=false,localX=0,localY=0;
  const field=root.querySelector("#universe-field");
  if(!compact.matches&&!reduce.matches&&field){
    field.addEventListener("pointermove",event=>{
      if(event.pointerType==="touch")return;
      const rect=field.getBoundingClientRect();
      localX=(event.clientX-rect.left)/Math.max(1,rect.width)-.5;
      localY=(event.clientY-rect.top)/Math.max(1,rect.height)-.5;
      if(movePending)return;
      movePending=true;
      requestAnimationFrame(()=>{
        movePending=false;
        cards.forEach((card,i)=>{
          const depth=i%2===0?1:-1;
          card.style.setProperty("--u-shift-x",(localX*depth*11).toFixed(1)+"px");
          card.style.setProperty("--u-shift-y",(localY*depth*9).toFixed(1)+"px");
          card.style.setProperty("--u-tilt-y",(localX*depth*2).toFixed(2)+"deg");
          card.style.setProperty("--u-tilt-x",(-localY*depth*2).toFixed(2)+"deg");
        });
      });
    },{passive:true});
    field.addEventListener("pointerleave",()=>{
      cards.forEach(card=>{
        card.style.removeProperty("--u-shift-x");
        card.style.removeProperty("--u-shift-y");
        card.style.removeProperty("--u-tilt-y");
        card.style.removeProperty("--u-tilt-x");
      });
    });
  }

  function transitionWorld(card,reverse=false){
    if(reduce.matches||typeof dialog.animate!=="function"||!card)return Promise.resolve();
    const panel=dialog.querySelector(".universe-dialog-shell");
    const origin=card.getBoundingClientRect(),target=panel.getBoundingClientRect();
    if(!origin.width||!target.width)return Promise.resolve();
    const scaleX=Math.max(.08,origin.width/target.width);
    const scaleY=Math.max(.08,origin.height/target.height);
    const dx=origin.left+origin.width/2-target.left-target.width/2;
    const dy=origin.top+origin.height/2-target.top-target.height/2;
    const compactTransform="translate("+dx+"px,"+dy+"px) scale("+scaleX+","+scaleY+")";
    const keyframes=reverse?
      [{transform:"translate(0,0) scale(1)",opacity:1},{transform:compactTransform,opacity:.28}]:
      [{transform:compactTransform,opacity:.28},{transform:"translate(0,0) scale(1)",opacity:1}];
    const motion=panel.animate(keyframes,{duration:reverse?460:620,easing:"cubic-bezier(.19,.88,.22,1)"});
    return motion.finished.catch(()=>{});
  }
  function setDevice(device){
    if(device!=="desktop"&&device!=="mobile")return;
    frameWrap.dataset.device=device;
    dialog.querySelectorAll("[data-universe-device]").forEach(button=>
      button.setAttribute("aria-pressed",String(button.dataset.universeDevice===device))
    );
  }
  async function openWorld(card){
    if(dialog.open||closing)return;
    const id=card.dataset.template,data=allowed.get(id);
    if(!data)return;
    activeCard=card;
    const sequence=++serial;
    heading.textContent=data.name;
    frame.title=data.name+" original website demo";
    standalone.href="/templates/"+id+".html";
    choose.href="/order.html?tier="+data.tier+"&template="+id;
    frame.style.opacity="0";
    loading.textContent="ASSEMBLING "+data.name+"...";
    loading.hidden=false;
    frameWrap.classList.remove("is-revealed");
    frame.removeAttribute("srcdoc");
    setDevice("desktop");
    legacy?.setAttribute("aria-hidden","true");
    if(legacy)legacy.inert=true;
    dialog.showModal();
    document.body.classList.add("universe-dialog-open");
    // Trigger the fullscreen zoom immediately; load the real demo meanwhile.
    const animation=transitionWorld(card);
    showInFrame(id,frame,()=>{
      if(serial!==sequence)return;
      frame.style.opacity="1";
      // Reveal the actual rendered website only after its sandboxed document loads.
      requestAnimationFrame(()=>{if(serial===sequence)frameWrap.classList.add("is-revealed");});
      loading.hidden=true;
    });
    await animation;
    if(dialog.open)closeButton.focus({preventScroll:true});
  }
  async function closeWorld(){
    if(!dialog.open||closing)return;
    closing=true;
    ++serial;
    await transitionWorld(activeCard,true);
    dialog.close();
    document.body.classList.remove("universe-dialog-open");
    frame.removeAttribute("srcdoc");
    frameWrap.classList.remove("is-revealed");
    frame.style.opacity="0";
    loading.hidden=false;
    closing=false;
    activeCard?.querySelector(".universe-open")?.focus({preventScroll:true});
  }
  closeButton.addEventListener("click",closeWorld);
  dialog.addEventListener("cancel",event=>{event.preventDefault();closeWorld();});
  dialog.addEventListener("click",event=>{if(event.target===dialog)closeWorld();});
  dialog.querySelectorAll("[data-universe-device]").forEach(button=>
    button.addEventListener("click",()=>setDevice(button.dataset.universeDevice))
  );

  // If the module fails, the original hero showreel remains visible and usable.
  if(legacy){legacy.inert=true;legacy.setAttribute("aria-hidden","true");}
  document.documentElement.classList.add("universe-ready");
})();
