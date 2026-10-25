(() => {
  "use strict";
  const slider=document.querySelector("#transformation-slider");
  const stage=document.querySelector("#transformation-stage");
  if(!slider||!stage)return;
  const before=stage.querySelector("#comparison-before"),after=stage.querySelector("#comparison-after");
  const heading=document.querySelector("#comparison-insight-title");
  const copy=document.querySelector("#comparison-insight-copy");
  const link=document.querySelector("#comparison-learn-more");
  // Four authored fictional brands, each with its own complete homepage hero.
  const comparisons={
    actor:{brand:"MARA ELLIS",nav:"WORK  /  ABOUT  /  REPRESENTATION",beforeName:"Mara Ellis",beforeTitle:"Mara Ellis — Actor",beforeCopy:"Welcome to my website. View my résumé, headshots, and acting credits.",kicker:"ACTOR / NEW YORK · LOS ANGELES",title:"A LIFE<br>IN <em>CHARACTER.</em>",cta:"EXPLORE SELECTED WORK ↗︎",edition:"FILM  /  STAGE  /  VOICE",insight:"Mara Ellis — a cinematic actor portfolio.",explanation:"An original fictional performer identity with editorial headshot photography, credits-led navigation, and a casting-focused introduction."},
    business:{brand:"SUNDAY BLOOM",nav:"THE SHOP  /  OUR STORY  /  VISIT",beforeName:"Sunday Bloom Flowers",beforeTitle:"Welcome to Sunday Bloom",beforeCopy:"We sell flowers and bouquets for all occasions. Contact us for pricing and delivery.",kicker:"INDEPENDENT FLORAL STUDIO · BROOKLYN",title:"FLOWERS<br>FOR <em>FEELING.</em>",cta:"EXPLORE THE COLLECTION ↗︎",edition:"FLOWERS  /  GIFTING  /  EVENTS",insight:"Sunday Bloom — a boutique florist storefront.",explanation:"An original fictional floral shop with a distinctive retail identity, evocative product imagery, and a clear shopping journey."},
    developer:{brand:"JORDAN PARK",nav:"PROJECTS  /  LAB  /  ABOUT  /  CONTACT",beforeName:"Jordan Park Portfolio",beforeTitle:"Hello, I am Jordan",beforeCopy:"I am a web developer. My skills include JavaScript, React, and Python. See my projects.",kicker:"FULL-STACK ENGINEER · OPEN TO COLLABORATION",title:"IDEAS<br>INTO <em>CODE.</em>",cta:"VIEW THE PROJECT INDEX ↗︎",edition:"ENGINEERING  /  EXPERIMENTS  /  SYSTEMS",insight:"Jordan Park — a developer's interactive identity.",explanation:"An original fictional engineering portfolio with an authentic code-inspired interface, featured builds, and technical navigation."},
    creative:{brand:"ATELIER NO. 9",nav:"WORK  /  JOURNAL  /  STUDIO  /  CONTACT",beforeName:"Atelier No. 9",beforeTitle:"Our Creative Projects",beforeCopy:"We are a design studio. Here is our portfolio of photography and branding work.",kicker:"INDEPENDENT IMAGE-MAKING PRACTICE",title:"FORM<br>MEETS <em>FEELING.</em>",cta:"VIEW SELECTED PROJECTS ↗︎",edition:"ART DIRECTION  /  IMAGE  /  CULTURE",insight:"Atelier No. 9 — an editorial creative studio.",explanation:"An original fictional creative practice with gallery-led art direction, a photographic portfolio, and editorial storytelling."}
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
    stage.setAttribute("aria-label",data.brand+" website redesign comparison");
    before.querySelector(".before-nav").replaceChildren();
    const name=document.createElement("strong");name.textContent=data.beforeName;
    const menu=document.createElement("span");menu.textContent=data.nav;
    before.querySelector(".before-nav").append(name,menu);
    before.querySelector(".before-card>span").textContent=data.beforeName+" / OFFICIAL WEBSITE";
    before.querySelector(".before-card h3").textContent=data.beforeTitle;
    before.querySelector(".before-card p").textContent=data.beforeCopy;
    after.querySelector(".after-top").firstChild.textContent=data.brand+" ";
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
  if(document.querySelector(".transformation-head h2")&&document.querySelector(".awe-transformation")&&window.gsap&&window.ScrollTrigger&&!window.AWE_MOTION_PAUSED
     &&!matchMedia("(max-width:900px), (pointer:coarse)").matches){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".transformation-head h2",{y:60,opacity:0,duration:1,ease:"power3.out",
      scrollTrigger:{trigger:".awe-transformation",start:"top 82%",once:true}});
  }
})();
