import { fetchPublicTemplate, fetchPublicStudyPage, previewMessage } from "/shared/preview.mjs";
import {zipDesignFor,zipPages} from "/shared/zip-design-catalog.mjs";
import { templates } from "/shared/model.mjs";

// Render miniature catalog identities directly in the DOM. Firebase's global
// X-Frame-Options:DENY and CSP frame-ancestors 'none' prevent embedding the
// public --still.html pages, so an iframe is NOT a reliable thumbnail.
function miniTheme(item){
  const key=(item.id+" "+item.style+" "+item.name).toLowerCase();
  if(/bugatti|ferrari|automotive|motor|roadster|velocity|grand touring|racing/.test(key))return "automotive";
  if(/nintendo|arcade|game|esport|pixel|playful|playroom|playstation/.test(key))return "play";
  if(/mintlify|document|fieldnote|developer|technical|code|docs|terminal|obsidian|command/.test(key))return "terminal";
  if(/couture|fashion|luxury|editorial|folio|heritage|gallery|magazine|art director/.test(key))return "editorial";
  if(/cinematic|film|darkroom|after hours|nocturne|runway/.test(key))return "cinema";
  if(/organic|botanical|garden|bloom|nature|greenhouse/.test(key))return "organic";
  if(/commerce|store|shop|retail|product|marketplace|nike/.test(key))return "commerce";
  if(/finance|fintech|ledger|data|dashboard|signal|analytics/.test(key))return "dashboard";
  if(/architect|interior|structure|sculpt|clay|brutalist/.test(key))return "architecture";
  if(/minimal|monochrome|still|whiteboard|clearview/.test(key))return "minimal";
  const variants=["editorial","organic","dashboard","architecture","commerce","minimal","cinema","terminal"];
  return variants[([...(item.id||"")].reduce((n,ch)=>(n*31+ch.charCodeAt(0))|0,0)>>>0)%variants.length];
}
function miniatureSite(item){
  const root=document.createElement("span");
  const theme=miniTheme(item);
  root.className="worlds-mini worlds-mini--"+theme;
  root.setAttribute("aria-hidden","true");
  const accent=/^#[0-9a-f]{6}$/i.test(item.color)?item.color:"#c7ef79";
  root.style.setProperty("--mini-accent",accent);
  root.style.backgroundColor=accent; // Nonblank even before the stylesheet loads.
  const add=(parent,className)=>{
    const el=document.createElement("span");
    el.className=className;
    parent.appendChild(el);
    return el;
  };
  const page=add(root,"worlds-mini-page");
  const mast=add(page,"worlds-mini-mast");
  add(mast,"worlds-mini-mark");
  add(mast,"worlds-mini-menu");
  add(mast,"worlds-mini-menu worlds-mini-menu-short");
  const hero=add(page,"worlds-mini-hero");
  const copy=add(hero,"worlds-mini-copy");
  add(copy,"worlds-mini-kicker");
  add(copy,"worlds-mini-headline worlds-mini-headline-first");
  add(copy,"worlds-mini-headline worlds-mini-headline-second");
  add(copy,"worlds-mini-subline");
  add(copy,"worlds-mini-action");
  const art=add(hero,"worlds-mini-art");
  add(art,"worlds-mini-shape worlds-mini-shape-primary");
  add(art,"worlds-mini-shape worlds-mini-shape-secondary");
  add(art,"worlds-mini-shape worlds-mini-shape-detail");
  const bottom=add(page,"worlds-mini-bottom");
  for(let i=0;i<3;i++){
    const tile=add(bottom,"worlds-mini-tile worlds-mini-tile-"+(i+1));
    add(tile,"worlds-mini-tile-art");
    add(tile,"worlds-mini-tile-line");
  }
  const foot=add(page,"worlds-mini-foot");
  add(foot,"worlds-mini-foot-line");
  add(foot,"worlds-mini-foot-line");
  return root;
}

export function mountExpressGallery(root,{items=templates,initial="afterhours",initialMobile=false,onSelect=()=>{},onModeChange=()=>{}}={}) {
  if(!root)return new AbortController();
  const lifetime=new AbortController();
  const rail=root.querySelector("#worlds-choices"),frame=root.querySelector("#worlds-frame"),screen=root.querySelector("#worlds-screen");
  const name=root.querySelector("#worlds-name"),full=root.querySelector("#worlds-open");
  const loading=root.querySelector("#worlds-loading"),loadingName=root.querySelector("#worlds-loading-name");
  const search=root.querySelector("#worlds-search"),results=root.querySelector("#worlds-results");
  const description=root.querySelector("#worlds-description");
  const view=root.querySelector(".worlds-view");
  const desktop=root.querySelector("#worlds-desktop"),mobile=root.querySelector("#worlds-mobile");
  let selected=items.some(t=>t.id===initial)?initial:items[0]?.id,version=0,controller=null;
  let currentPage="home";
  const pageBar=document.createElement("div");
  pageBar.className="worlds-page-list";
  pageBar.setAttribute("role","group");
  pageBar.setAttribute("aria-label","Preview website pages");
  screen.querySelector(".worlds-toolbar")?.after(pageBar);
  function updatePageBar(id){
    pageBar.replaceChildren();
    const multi=zipDesignFor(id)?.multipage;
    pageBar.hidden=!multi;
    if(!multi)return;
    for(const part of zipPages){
      const b=document.createElement("button");
      b.type="button";b.textContent=part.toUpperCase();
      b.setAttribute("aria-pressed",String(part===currentPage));
      b.addEventListener("click",()=>{currentPage=part;choose(selected);});
      pageBar.appendChild(b);
    }
  }

  // Large sandbox previews are loaded near the gallery instead of on first paint.
  const deferPreview=matchMedia("(max-width: 900px), (pointer: coarse)").matches;
  let previewReady=!deferPreview;
  function syncFrame(){
    if(screen.classList.contains("is-mobile")){frame.style.width="";frame.style.height="";frame.style.transform="";view.style.height="";return;}
    const scale=Math.min(1,Math.max(1,view.clientWidth)/1280);
    const height=Math.max(1280,Math.ceil(660/scale));
    frame.style.width="1280px";frame.style.height=height+"px";frame.style.transform="scale("+scale+")";
    view.style.height=Math.round(height*scale)+"px";
  }
  if("ResizeObserver" in window){const observer=new ResizeObserver(syncFrame);observer.observe(view);lifetime.signal.addEventListener("abort",()=>observer.disconnect(),{once:true});}
  else addEventListener("resize",syncFrame,{passive:true,signal:lifetime.signal});
  lifetime.signal.addEventListener("abort",()=>controller?.abort(),{once:true});
  const savedTemplates=new Map(items.map(x=>[x.id,x]));
  function templatePath(id){return id==="runwaymulti"?"/experiments/runwayml-multipage/":items.some(t=>t.id===id&&t.multipage)?"/templates/"+id+"/home.html":"/templates/"+id+".html";}
  function populate(){
    const options=[...items];
    const fragment=document.createDocumentFragment();
    options.forEach((item,index)=>{
      const button=document.createElement("button");
      button.type="button";button.className="worlds-choice";button.dataset.world=item.id;
      button.setAttribute("aria-pressed",String(selected===item.id));
      const count=document.createElement("span");count.textContent=String(index+1).padStart(2,"0");
      const title=document.createElement("strong");title.textContent=item.name;
      const meta=document.createElement("small");meta.textContent=item.style;
      const copy=document.createElement("span");copy.className="worlds-choice-copy";copy.append(title,meta);
      const swatch=document.createElement("i");swatch.className="worlds-choice-swatch";
      swatch.style.backgroundColor=/^#[0-9a-f]{6}$/i.test(item.color)?item.color:"#dcfc46";
      swatch.setAttribute("aria-hidden","true");
      const symbol=document.createElement("span");symbol.setAttribute("aria-hidden","true");symbol.textContent="↗︎";
      const thumb=document.createElement("span");thumb.className="worlds-choice-thumb";thumb.setAttribute("aria-hidden","true");
      thumb.append(miniatureSite(item));
      button.append(count,thumb,swatch,copy,symbol);
      button.addEventListener("click",()=>choose(item.id,true));
      fragment.append(button);
    });
    rail.replaceChildren(rail.querySelector(".worlds-rail-note"),fragment);
    // Thumbnails are local DOM artwork, requiring no network frames or observers.
    filterChoices();
  }
  function filterChoices(){
    const query=search.value.trim().toLocaleLowerCase();
    let visible=0;
    rail.querySelectorAll("[data-world]").forEach(button=>{
      const item=savedTemplates.get(button.dataset.world);
      button.hidden=!!query&&!`${item.name} ${item.style} ${item.tag}`.toLocaleLowerCase().includes(query);
      if(!button.hidden)visible++;
    });
    results.textContent=visible+" of "+items.length+" designs";
    const note=rail.querySelector(".worlds-rail-note");
    note.textContent=query?"No designs match this search. Try another name or style.":"CHOOSE A DIRECTION TO PREVIEW.";
    note.hidden=!!query&&visible>0;
  }
  async function choose(id,notify=false){
    if(!savedTemplates.has(id))return;
    const item=savedTemplates.get(id);
    if(id!==selected)currentPage="home";
    selected=id;version++;const mine=version;
    updatePageBar(id);
    if(notify)onSelect(id);
    controller?.abort();controller=new AbortController();
    rail.querySelectorAll("[data-world]").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.world===id)));
    full.href=templatePath(id);screen.dataset.world=id;
    loading.hidden=false;loadingName.textContent=item.name.toUpperCase();
    loading.setAttribute("aria-label","Loading "+item.name+" website preview");
    screen.setAttribute("aria-busy","true");
    const still=false; // Desktop previews retain authored motion.
    screen.classList.toggle("is-changing",!still);
    frame.title=item.name+" fictional website design preview";
    if(!previewReady)return;
    // Preserve the previous frame under the branded loading surface.
    try{
      const html=zipDesignFor(id)?.multipage
        ?await fetchPublicStudyPage(id,currentPage,{signal:controller.signal})
        :await fetchPublicTemplate(id,{still,signal:controller.signal});
      if(controller.signal.aborted||mine!==version)return;
      frame.onload=()=>{
        if(mine!==version)return;
        name.textContent=item.name;description.textContent=item.tag;loading.hidden=true;
        screen.removeAttribute("aria-busy");
        screen.classList.remove("is-changing");syncFrame();
      };
      frame.srcdoc=html;
    }catch(error){
      if(controller.signal.aborted||mine!==version)return;
      frame.onload=()=>{if(mine!==version)return;name.textContent=item.name;description.textContent="Preview unavailable. Open the full demo to explore.";loading.hidden=true;screen.removeAttribute("aria-busy");screen.classList.remove("is-changing");};
      frame.srcdoc=previewMessage("The preview could not load. Try Open Full Demo.");
      console.warn("Template preview unavailable",error);
    }
  }
  function size(mobileView){
    onModeChange(mobileView);
    screen.classList.toggle("is-mobile",mobileView);
    desktop.setAttribute("aria-pressed",String(!mobileView));
    mobile.setAttribute("aria-pressed",String(mobileView));
    syncFrame();
  }
  desktop.addEventListener("click",()=>size(false));
  mobile.addEventListener("click",()=>size(true));
  rail.addEventListener("keydown",(event)=>{
    if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(event.key))return;
    const choices=[...rail.querySelectorAll("[data-world]:not([hidden])")];
    const i=choices.indexOf(document.activeElement);
    if(i<0)return;
    event.preventDefault();
    const next=choices[(i+(/Up|Left/.test(event.key)?-1:1)+choices.length)%choices.length];
    next.focus();choose(next.dataset.world);
  });
  document.addEventListener("awe:motion",()=>choose(selected),{signal:lifetime.signal});
  search.addEventListener("input",filterChoices);
  populate();
  if(initialMobile)size(true);
  if(!previewReady){
    frame.srcdoc=previewMessage("The collection is coming into view.");
    name.textContent="Selecting a design";
    if(selected)choose(selected);
    if("IntersectionObserver" in window){
      const observer=new IntersectionObserver(entries=>{
        if(!entries.some(entry=>entry.isIntersecting))return;
        observer.disconnect();previewReady=true;if(selected)choose(selected);
      },{rootMargin:"450px 0px"});
      observer.observe(root);
    }else{previewReady=true;if(selected)choose(selected);}
  }else if(selected)choose(selected);
  syncFrame();
  return lifetime;
}
