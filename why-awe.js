(() => {
  "use strict";
  const valid=new Set(["actor","business","developer","creative"]);
  const params=new URLSearchParams(window.location.search);
  const concept=params.get("concept");
  const choose=valid.has(concept)?concept:null;
  if(!choose)return;
  const target=document.getElementById(choose);
  if(!target)return;
  const banner=document.createElement("div");
  banner.className="story-selection-note";
  banner.textContent="YOU'RE EXPLORING: "+choose.toUpperCase()+" — SCROLL FOR THE FULL DESIGN STORY";
  banner.style.cssText="background:#d9fd47;color:#10160e;padding:12px 5vw;font:800 11px/1.6 monospace;letter-spacing:.09em";
  document.querySelector(".story-chapters")?.prepend(banner);
  // Do not jump unexpectedly before images and fonts have been laid out;
  // scroll only after the document is ready, and honor reduced motion.
  window.addEventListener("load",()=>{
    if(window.location.hash)return;
    target.scrollIntoView({behavior:"instant",block:"start"});
    target.setAttribute("tabindex","-1");
    target.focus({preventScroll:true});
  },{once:true});
})();
