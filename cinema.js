(() => {
  "use strict";
  const slider=document.querySelector("#transformation-slider");
  const stage=document.querySelector("#transformation-stage");
  if(!slider||!stage)return;
  const before=stage.querySelector("#comparison-before"),after=stage.querySelector("#comparison-after");
  const heading=document.querySelector("#comparison-insight-title");
  const copy=document.querySelector("#comparison-insight-copy");
  const link=document.querySelector("#comparison-learn-more");
  const comparisons={
    actor:{
      label:"ACTOR PORTFOLIO",beforeTitle:"Actor and performer portfolio",beforeCopy:"A short biography, a list of credits, and a basic contact section.",
      nav:"Home  About  Work  Contact",beforeName:"YOUR WEBSITE",
      kicker:"THE NEXT ROLE BEGINS HERE",title:"EVERY<br>ROLE<br><em>HAS A STORY.</em>",cta:"ENTER THE STORY ↗",edition:"CASTING PORTFOLIO / CONCEPT",
      insight:"From basic biography to cinematic introduction.",
      explanation:"A performance-led story, distinctive casting presentation, and intentional navigation—rather than another résumé-shaped landing page."
    },
    business:{
      label:"SMALL BUSINESS",beforeTitle:"Welcome to our local business",beforeCopy:"We provide quality products and excellent customer service.",
      nav:"Home  Services  About  Contact",beforeName:"LOCAL BUSINESS",
      kicker:"THOUGHTFUL BY NATURE",title:"GOOD<br>THINGS<br><em>GROW HERE.</em>",cta:"EXPLORE OUR STUDIO ↗",edition:"BOUTIQUE BUSINESS / CONCEPT",
      insight:"From generic brochure to recognizable brand.",
      explanation:"A stronger business identity, inviting storytelling, a clear service path, and memorable presentation can help people understand why to choose you."
    },
    developer:{
      label:"DEVELOPER PORTFOLIO",beforeTitle:"Hi, I am a developer",beforeCopy:"These are my skills. Here is a list of the projects I have completed.",
      nav:"Home  Skills  Projects  Contact",beforeName:"MY PORTFOLIO",
      kicker:"> USER@PORTFOLIO:~$ OPEN",title:"BUILD<br>WHAT'S<br><em>NEXT_</em>",cta:"RUN PROJECTS ↗",edition:"DEVELOPER PORTFOLIO / CONCEPT",
      insight:"From a list of skills to a working digital identity.",
      explanation:"A technical portfolio can reflect how you think and build. The console-style narrative helps projects feel tangible, organized, and intentional."
    },
    creative:{
      label:"CREATIVE STUDIO",beforeTitle:"My creative work and gallery",beforeCopy:"Here are images and projects I have created over time.",
      nav:"Home  Gallery  About  Contact",beforeName:"CREATIVE PORTFOLIO",
      kicker:"ISSUE 001 / SELECTED WORK",title:"THE<br>ART OF<br><em>SEEING.</em>",cta:"TURN THE PAGE ↗",edition:"CREATIVE EDITORIAL / CONCEPT",
      insight:"From image collection to editorial storytelling.",
      explanation:"A thoughtful creative portfolio uses composition, pacing, and distinctive presentation to give individual pieces the attention they deserve."
    }
  };
  let current="actor";
  const presets=[...document.querySelectorAll("[data-reveal]")];
  const selections=[...document.querySelectorAll("[data-comparison]")].filter(n=>n.matches("button"));
  function setPosition(value){
    const number=Math.min(100,Math.max(0,Number(value)||0));
    slider.value=String(number);
    stage.style.setProperty("--reveal",number+"%");
    slider.setAttribute("aria-valuetext",Math.round(number)+"% of the AWE redesign revealed");
    presets.forEach(btn=>btn.setAttribute("aria-pressed",String(Number(btn.dataset.reveal)===number)));
  }
  function setScenario(key){
    if(!Object.hasOwn(comparisons,key))return;
    current=key;
    const data=comparisons[key];
    stage.dataset.comparison=key;
    before.querySelector(".before-nav").replaceChildren();
    const name=document.createElement("strong");name.textContent=data.beforeName;
    const menu=document.createElement("span");menu.textContent=data.nav;
    before.querySelector(".before-nav").append(name,menu);
    before.querySelector(".before-card>span").textContent="Welcome to my website";
    before.querySelector(".before-card h3").textContent=data.beforeTitle;
    before.querySelector(".before-card p").textContent=data.beforeCopy;
    after.querySelector(".after-top span").textContent=data.edition;
    after.querySelector(".after-copy>span").textContent=data.kicker;
    // The title is fixed author-owned markup, never based on user input.
    after.querySelector(".after-copy h3").innerHTML=data.title;
    after.querySelector(".after-cta").textContent=data.cta;
    heading.textContent=data.insight;
    copy.textContent=data.explanation;
    link.href="/why-awe.html?concept="+key;
    selections.forEach(btn=>{
      const active=btn.dataset.comparison===key;
      btn.setAttribute("aria-pressed",String(active));
      btn.classList.toggle("is-selected",active);
    });
    setPosition(50);
  }
  slider.addEventListener("input",()=>setPosition(slider.value));
  presets.forEach(btn=>btn.addEventListener("click",()=>setPosition(btn.dataset.reveal)));
  selections.forEach(btn=>btn.addEventListener("click",()=>setScenario(btn.dataset.comparison)));
  let dragging=false;
  const move=(event)=>{
    if(!dragging)return;
    const box=stage.getBoundingClientRect();
    setPosition(Math.round((event.clientX-box.left)/box.width*100));
  };
  stage.addEventListener("pointerdown",event=>{
    if(event.button!==0||event.target.closest("a,button,input"))return;
    dragging=true;
    stage.setPointerCapture?.(event.pointerId);
    move(event);
  });
  stage.addEventListener("pointermove",move);
  stage.addEventListener("pointerup",()=>{dragging=false;});
  stage.addEventListener("pointercancel",()=>{dragging=false;});
  setScenario("actor");
  if(window.gsap&&window.ScrollTrigger&&!window.AWE_MOTION_PAUSED
     &&!matchMedia("(prefers-reduced-motion:reduce)").matches){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".transformation-head h2",{y:60,opacity:0,duration:1,ease:"power3.out",
      scrollTrigger:{trigger:".awe-transformation",start:"top 82%",once:true}});
  }
})();
