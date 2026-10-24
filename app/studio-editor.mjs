import { esc } from "/shared/model.mjs";
import { renderSite } from "/shared/render.mjs";

/* Owner-only studio enhancement. All edits remain browser-local until the existing
 * authenticated Save & Regenerate action creates a new PRIVATE version. */
export function enhanceEditor(form, original) {
  const state = {
    cards: (original.content.cards || []).map(x => ({...x})),
    services: (original.content.services || []).map(x => ({...x})),
    testimonials: (original.content.testimonials || []).map(x => ({...x}))
  };
  const before = form.querySelector('button.btn.acid');
  if (!before) return { merge: x=>x };
  const options = document.createElement("div");
  options.className = "studio-tools";
  options.innerHTML =
    '<h3>Visual studio</h3><p class="muted">Changes preview instantly, but only Save &amp; Regenerate makes a private version. Publishing always requires a separate owner action.</p>' +
    '<div class="field-row">' +
    '<label class="field">Hero alignment<select name="heroAlignment"><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label>' +
    '<label class="field">Page spacing<select name="density"><option value="airy">Airy</option><option value="balanced">Balanced</option><option value="compact">Compact</option></select></label>' +
    '<label class="field">Corner style<select name="corners"><option value="sharp">Sharp</option><option value="soft">Soft</option><option value="round">Rounded</option></select></label></div>' +
    '<label class="field">Hero eyebrow / label<input name="heroLabel" maxlength="110" value="' + esc(original.content.heroLabel || "") + '"></label>' +
    '<label class="field">Primary button text<input name="ctaLabel" maxlength="45" value="' + esc(original.content.ctaLabel || "Explore my work") + '"></label>' +

    (original.template === "folio"
      ? '<label class="field">Hero video URL (YouTube, Vimeo or HTTPS MP4/WebM)<input name="heroVideoUrl" maxlength="800" value="' + esc(original.content.heroVideoUrl || "") + '"></label>'
      : "") +
    '<h4>Arrange sections</h4><p class="muted">Select the section checkboxes above, then reorder the sections below.</p><div id="studio-sections" class="studio-arrangement"></div>' +
    '<h4>Project showcase cards</h4><p class="muted">Each card can have a title, description, and optional HTTPS project link.</p><div data-studio-group="cards"></div><button class="btn secondary small" type="button" data-add="cards">+ Add project</button>' +
    '<h4>Services & offerings</h4><div data-studio-group="services"></div><button class="btn secondary small" type="button" data-add="services">+ Add service</button>' +
    '<h4>Testimonials</h4><p class="muted">Only publish real testimonials with permission. Leave this section empty if you have none.</p><div data-studio-group="testimonials"></div><button class="btn secondary small" type="button" data-add="testimonials">+ Add testimonial</button>' +
    '<p class="notice">All editor changes are local until saved as a private draft. The currently published customer website will not change.</p>';
  form.insertBefore(options,before);
  const groupCaps={cards:12,services:12,testimonials:8};
  const field = (k,v,property,label,area) => '<label class="field">' + label + (area ?
    '<textarea data-prop="' + property + '" rows="3" maxlength="1200">' + esc(v[property] || "") + '</textarea>' :
    '<input data-prop="' + property + '" value="' + esc(v[property] || "") + '" maxlength="' + ((property==="url"||property==="videoUrl")?"800":"120") + '">') + '</label>';
  let redrawPending = false;
  function collectGroup(name) {
    const target=options.querySelector('[data-studio-group="'+name+'"]');
    target.querySelectorAll('[data-entry]').forEach((row)=>{
      const i=Number(row.dataset.entry);
      for(const entry of row.querySelectorAll('[data-prop]')) {
        if(state[name][i]) state[name][i][entry.dataset.prop]=entry.value;
      }
    });
  }
  function drawGroup(name) {
    const target=options.querySelector('[data-studio-group="'+name+'"]');
    target.innerHTML=state[name].map((item,i) =>
      '<div class="studio-row" data-entry="'+i+'"><div class="studio-row-head"><strong>' + (name==="cards" ? "Project" : name==="services" ? "Service" : "Testimonial") + ' ' + (i+1) +
      '</strong><div><button type="button" data-move="-1" aria-label="Move up" '+(i===0?"disabled":"")+'>↑</button><button type="button" data-move="1" aria-label="Move down" '+(i===state[name].length-1?"disabled":"")+'>↓</button><button type="button" data-delete="1" aria-label="Remove entry">✕</button></div></div>' +
      (name==="testimonials" ? field(name,item,"quote","Verified quotation",true) + field(name,item,"attribution","Attribution",false)
        : field(name,item,"title","Title",false) + field(name,item,"description","Description",true) + field(name,item,"url","Optional HTTPS link",false) + (name==="cards" ? field(name,item,"videoUrl","Optional video URL (YouTube, Vimeo or HTTPS MP4/WebM)",false) : "")) + '</div>'
    ).join("");
    target.querySelectorAll("button[data-move],button[data-delete]").forEach(btn=>{
      btn.onclick=()=>{collectGroup(name); const i=Number(btn.closest("[data-entry]").dataset.entry);
        if(btn.dataset.delete){state[name].splice(i,1);} else {
          const j=i+Number(btn.dataset.move);
          if(j<0||j>=state[name].length)return;
          [state[name][i],state[name][j]]=[state[name][j],state[name][i]];
        }
        drawGroup(name); livePreview();
      };
    });
    target.querySelectorAll("[data-prop]").forEach(x => x.addEventListener("input",()=>{collectGroup(name);livePreview();}));
  }
  for(const name of Object.keys(groupCaps)){
    drawGroup(name);
    options.querySelector('[data-add="'+name+'"]').onclick=()=>{
      collectGroup(name);
      if(state[name].length>=groupCaps[name])return;
      state[name].push(name==="testimonials"?{quote:"",attribution:""}:{title:"",description:"",url:""});
      drawGroup(name);livePreview();
    };
  }
  for(const name of ["heroAlignment","density","corners"]) options.querySelector('[name="'+name+'"]').value =
    original.design[name] || {heroAlignment:"left",density:"balanced",corners:"soft"}[name];

  const sectionContainer=form.querySelector('.checks:has(input[name="sections"])');
  const arranged=options.querySelector("#studio-sections");
  if(sectionContainer){
    const current=original.design.sections || [];
    Array.from(sectionContainer.querySelectorAll('label')).sort((a,b)=>{
      const ai=current.indexOf(a.querySelector("input")?.value),bi=current.indexOf(b.querySelector("input")?.value);
      return (ai<0?100:ai)-(bi<0?100:bi);
    }).forEach(label=>sectionContainer.append(label));
    function drawSectionButtons(){
      arranged.innerHTML=Array.from(sectionContainer.querySelectorAll('label')).map((el,i)=>{
        const box=el.querySelector('input');
        return '<div class="studio-section"><span>'+esc(box.value)+' '+(box.checked?'✓':'—')+'</span><div><button type="button" data-pos="'+i+'" data-shift="-1" '+(i===0?'disabled':'')+'>↑</button><button type="button" data-pos="'+i+'" data-shift="1" '+(i===sectionContainer.children.length-1?'disabled':'')+'>↓</button></div></div>';
      }).join("");
      arranged.querySelectorAll('[data-shift]').forEach(b=>b.onclick=()=>{
        const i=Number(b.dataset.pos),j=i+Number(b.dataset.shift),rows=Array.from(sectionContainer.children);
        if(!rows[j])return;
        if(j<i)sectionContainer.insertBefore(rows[i],rows[j]);
        else sectionContainer.insertBefore(rows[j],rows[i]);
        drawSectionButtons();livePreview();
      });
    }
    sectionContainer.addEventListener("change",()=>{drawSectionButtons();livePreview()});
    drawSectionButtons();
  }
  function merge(base) {
    for(const name of Object.keys(groupCaps))collectGroup(name);
    const f=new FormData(form);
    return {...base, design:{...base.design,
      heroAlignment:f.get("heroAlignment"),density:f.get("density"),corners:f.get("corners"),
      sections:f.getAll("sections")},
      content:{...base.content,heroLabel:f.get("heroLabel"),ctaLabel:f.get("ctaLabel"),
        heroVideoUrl:base.template==="folio" ? String(f.get("heroVideoUrl")||"") : base.content.heroVideoUrl,
        cards:state.cards.filter(x=>x.title?.trim()||x.description?.trim()),
        services:state.services.filter(x=>x.title?.trim()||x.description?.trim()),
        testimonials:state.testimonials.filter(x=>x.quote?.trim())}};
  }
  const shell=document.querySelector(".preview-shell");
  const saved=shell?.querySelector("#draft");
  let preview,liveBtn,savedBtn;
  if(shell){
    const tabs=document.createElement("div");
    tabs.className="studio-preview-actions";
    tabs.innerHTML='<button type="button" class="btn small" id="studio-live">Visual preview (unsaved)</button>'+
      '<button type="button" class="btn secondary small" id="studio-saved">Saved private draft</button>'+
      '<p class="muted">This preview is local to your browser. Click Save &amp; Regenerate to create a private version for approval.</p>';
    const el=document.createElement("iframe");
    el.id="studio-live-frame";el.title="Unsaved visual preview. Click a section to edit.";el.setAttribute("sandbox","allow-same-origin");
    el.style.cssText="width:100%;height:540px;border:0;background:white;display:block;";
    if(saved){saved.hidden=true;saved.after(el);}else shell.append(el);
    shell.prepend(tabs);
    // Generated HTML is escaped and has no scripts. The sandbox allows same-origin
    // inspection only; scripts remain disabled. Clicking a preview element focuses
    // its owning editor field without changing the saved/public document.
    el.addEventListener("load", () => {
      const doc=el.contentDocument;
      if(!doc)return;
      const mapping=[["#hero-title",'[name="headline"]'],[".fe-hero h1",'[name="headline"]'],[".fe-hero .fe-intro",'[name="bio"]'],[".hero-label",'[name="heroLabel"]'],[".hero-intro",'[name="bio"]'],[".hero-actions .pill-link",'[name="ctaLabel"]'],["#about .prose",'[name="bio"]'],["#education .prose",'[name="education"]'],["#experience .prose",'[name="experience"]'],["#skills .prose",'[name="skills"]']];
      for(const [query,target] of mapping){
        doc.querySelectorAll(query).forEach(node=>{
          node.title="Click to edit this section";
          node.style.cursor="pointer";
          node.addEventListener("click",event=>{
            event.preventDefault();
            const field=form.querySelector(target);
            if(!field)return;
            field.scrollIntoView({block:"center",behavior:"smooth"});
            field.focus({preventScroll:true});
          });
        });
      }
      doc.querySelectorAll(".work-card,.service-card,.quote,.fe-project").forEach((node,i)=>{
        node.title="Click to edit this card";
        node.style.cursor="pointer";
        node.addEventListener("click",event=>{
          if(event.target.closest("a"))event.preventDefault();
          const type=(node.classList.contains("work-card")||node.classList.contains("fe-project"))?"cards":node.classList.contains("service-card")?"services":"testimonials";
          const siblings=Array.from(node.parentNode.children);
          const index=siblings.indexOf(node);
          const field=options.querySelector('[data-studio-group="'+type+'"] [data-entry="'+index+'"] [data-prop]');
          if(field){field.scrollIntoView({block:"center",behavior:"smooth"});field.focus({preventScroll:true});}
        });
      });
    });
    liveBtn=tabs.querySelector("#studio-live");savedBtn=tabs.querySelector("#studio-saved");preview=el;
    liveBtn.onclick=()=>{preview.hidden=false;if(saved)saved.hidden=true;livePreview();};
    savedBtn.onclick=()=>{preview.hidden=true;if(saved)saved.hidden=false;};
  }
  function livePreview(){
    if(!preview || preview.hidden || redrawPending)return;
    redrawPending=true;
    requestAnimationFrame(()=>{
      redrawPending=false;
      const fd=new FormData(form);
      const base={
        ...original,template:fd.get("template"),
        content:{...original.content,
          ...Object.fromEntries(["name","headline","bio","projects","education","experience","skills","publicEmail"].map(k=>[k,fd.get(k)])),
          links:String(fd.get("links")||"").split("\n").map(x=>x.trim()).filter(Boolean),
          photoIds:fd.getAll("photos")},
        design:{...original.design,
          ...Object.fromEntries(["primary","secondary","font","appearance","layout","navigation","animation"].map(k=>[k,fd.get(k)])),
          sections:fd.getAll("sections")}
      };
      try{preview.srcdoc=renderSite(merge(base));}
      catch(e){preview.srcdoc='<p style="font-family:sans-serif;padding:20px">Please check the fields: '+esc(e.message)+'</p>';}
    });
  }
  form.addEventListener("input",(e)=>{if(!e.target.closest('[data-studio-group]')) livePreview();});
  form.addEventListener("change",livePreview);
  livePreview();
  return { merge, preview };
}
