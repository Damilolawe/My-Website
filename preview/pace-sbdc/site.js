/* Pace SBDC independent concept / accessibility first. No personal information stored. */
(() => {
 "use strict";
 const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
 const toggle = document.querySelector(".menu-toggle");
 const menu = document.querySelector(".mobile-nav");
 function closeMenu() {
   if(!toggle || !menu) return;
   toggle.setAttribute("aria-expanded","false");
   toggle.setAttribute("aria-label","Open menu");
   menu.hidden = true;
 }
 toggle?.addEventListener("click", () => {
   const open = toggle.getAttribute("aria-expanded")==="true";
   toggle.setAttribute("aria-expanded",String(!open));
   toggle.setAttribute("aria-label",open?"Open menu":"Close menu");
   menu.hidden = open;
 });
 menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
 document.addEventListener("click", e=>{
   if(menu && !menu.hidden && !menu.contains(e.target) && !toggle?.contains(e.target)) closeMenu();
 });
 document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeMenu(); });
 window.matchMedia("(min-width:1001px)").addEventListener("change",e=>{if(e.matches)closeMenu()});

 // Service filters preserve keyboard access, exact counts, and screen-reader status.
 const filters = [...document.querySelectorAll(".service-filter-btn")];
 const cards = [...document.querySelectorAll(".service-card")];
 const serviceGroup=document.querySelector(".service-filter");
 if(serviceGroup && cards.length) {
   const status=document.createElement("span");
   status.setAttribute("role","status");status.setAttribute("aria-live","polite");
   status.className="filter-status";
   status.style.cssText="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap";
   serviceGroup.append(status);
   filters.forEach(button=>button.addEventListener("click",()=>{
     const category=button.dataset.service;
     filters.forEach(f=>{
       const active=f===button;
       f.classList.toggle("is-active",active);
       f.setAttribute("aria-pressed",String(active));
     });
     let visible=0;
     cards.forEach(card=>{
       const show=category==="all"||card.dataset.stage===category;
       card.hidden=!show;
       if(show){visible++;card.classList.add("in-view");}
     });
     status.textContent=visible+" services shown";
   }));
 }

 // Progressive reveal: never hide content before the observer exists.
 if(!reduced.matches && "IntersectionObserver" in window){
   const seen=new IntersectionObserver(entries=>{
     entries.forEach(entry=>{
       if(entry.isIntersecting){
         entry.target.classList.add("in-view");
         seen.unobserve(entry.target);
       }
     });
   },{threshold:.05,rootMargin:"0px 0px 48px 0px"});
   document.querySelectorAll(".reveal").forEach(el=>seen.observe(el));
   document.documentElement.classList.add("motion-ready");
 }else{
   document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in-view"));
 }

 // Source images stay outside copy blocks and fail gracefully if the third
 // party removes a photo. No stock substitutions, misleading portrait, or emoji.
 document.querySelectorAll(".hero-portrait img").forEach(img=>{
   const fallback=()=>{
     if(img.dataset.failed==="yes") return;
     img.dataset.failed="yes";
     const block=document.createElement("div");
     block.setAttribute("role","img");
     block.setAttribute("aria-label","Pace SBDC entrepreneurial support illustration");
     block.style.cssText="height:100%;display:grid;place-items:center;background:radial-gradient(circle at 45% 45%,#488494,#0b2a42 68%);color:#e1f5e7;font:800 clamp(44px,6vw,100px) Manrope,sans-serif;letter-spacing:-.08em";
     block.textContent="PACE / SBDC";
     img.replaceWith(block);
   };
   img.addEventListener("error",fallback,{once:true});
   if(img.complete && img.naturalWidth===0) fallback();
 });

 // Client testimonials, financing applications, and event registration all
 // remain on the original approved external service. This concept collects
 // no visitor details, and does not install analytics or tracking scripts.
})();
