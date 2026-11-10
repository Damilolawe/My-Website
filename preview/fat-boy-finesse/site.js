// Fat Boy Finesse — accessible, progressive-enhancement interactions.
const navButton=document.getElementById("nav-toggle");
const nav=document.getElementById("nav-items");
function closeNav(){if(!navButton||!nav)return;navButton.setAttribute("aria-expanded","false");navButton.setAttribute("aria-label","Open menu");nav.classList.remove("open")}
if(navButton&&nav){
  navButton.addEventListener("click",()=>{
    const open=navButton.getAttribute("aria-expanded")!=="true";
    navButton.setAttribute("aria-expanded",String(open));
    navButton.setAttribute("aria-label",open?"Close menu":"Open menu");
    nav.classList.toggle("open",open);
  });
  nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeNav));
  document.addEventListener("keydown",event=>{if(event.key==="Escape")closeNav()});
  document.addEventListener("click",event=>{if(!nav.contains(event.target)&&!navButton.contains(event.target))closeNav()});
  window.addEventListener("resize",()=>{if(window.innerWidth>900)closeNav()});
}
const elements=document.querySelectorAll("[data-reveal]");
if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add("seen");observer.unobserve(entry.target)}
  },{rootMargin:"0px 0px 80px 0px",threshold:.04});
  elements.forEach(item=>observer.observe(item));
}else elements.forEach(item=>item.classList.add("seen"));

// This channel-linked embed follows a public livestream when supported by
// YouTube. We never claim the channel is live from iframe-load success.
// The direct YouTube /live fallback is always provided.
const refresh=document.getElementById("refresh-live");
const frame=document.querySelector("#live-frame iframe");
if(refresh&&frame){
  refresh.addEventListener("click",()=>{
    const url=new URL("https://www.youtube.com/embed/live_stream");
    url.searchParams.set("channel","UC_-FXJoPsApGI_xV1SvRFNw");
    url.searchParams.set("rel","0");
    url.searchParams.set("playsinline","1");
    url.searchParams.set("reload",String(Date.now()));
    frame.src=url.toString();
    refresh.textContent="PLAYER REFRESHED";
    refresh.setAttribute("aria-label","Live stream player refreshed");
    refresh.blur();
  });
}
