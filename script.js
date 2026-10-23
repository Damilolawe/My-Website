(() => {
  'use strict';
  const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)'), fine=matchMedia('(hover: hover) and (pointer: fine)');
  let motionPreference=null;
  try{motionPreference=localStorage.getItem('awe-motion');}catch{}
  let paused=reduce.matches||motionPreference==='paused', motionContext;
  window.AWE_MOTION_PAUSED=paused;
  const motionButton=$('#motion-toggle');
  function applyMotion(){
    window.AWE_MOTION_PAUSED=paused;
    document.documentElement.classList.toggle('motion-paused',paused);
    motionButton.textContent=paused?'ENABLE MOTION':'PAUSE MOTION';
    motionButton.setAttribute('aria-pressed',String(paused));
    motionContext?.revert();
    if(!paused && window.gsap && window.ScrollTrigger){
      gsap.registerPlugin(ScrollTrigger);
      motionContext=gsap.context(()=>{
        $$('.reveal').forEach(el=>{gsap.from(el,{y:35,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 96%',once:true},clearProps:'transform,opacity'});});
        gsap.from('.hero-line>span,.hero-line>em',{yPercent:110,duration:1.25,stagger:.09,ease:'power4.out',clearProps:'transform'});
        gsap.from('.hero-meta,.hero-bottom,.hero-art',{opacity:0,duration:1.4,delay:.35,clearProps:'opacity'});
        if(innerWidth>900){gsap.to('.hero-title',{y:70,opacity:.3,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});}
        if(document.querySelector('#express-showcase')){
          gsap.from('.worlds-title',{y:70,opacity:0,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'#express-showcase',start:'top 82%',once:true}});
          gsap.from('.worlds-choice',{x:-40,opacity:0,duration:.6,stagger:.1,ease:'power2.out',scrollTrigger:{trigger:'.worlds-layout',start:'top 82%',once:true}});
          gsap.from('.worlds-screen',{y:60,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.worlds-layout',start:'top 82%',once:true}});
        }
      });
    }
    document.dispatchEvent(new CustomEvent('awe:motion',{detail:{paused}}));
  }
  motionButton.addEventListener('click',()=>{paused=!paused;motionPreference=paused?'paused':'enabled';try{localStorage.setItem('awe-motion',paused?'paused':'enabled');}catch{}applyMotion();});
  reduce.addEventListener('change',e=>{paused=e.matches||motionPreference==='paused';applyMotion();});
  applyMotion();
  $('#year').textContent=String(new Date().getFullYear());
  let scrollFrame=0;
  const updateScroll=()=>{scrollFrame=0;const y=scrollY;$('#header').classList.toggle('scrolled',y>32);$('#progress').style.width=Math.min(100,y/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100)+'%';};
  addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});addEventListener('resize',updateScroll,{passive:true});updateScroll();
  const menu=$('#mobile-menu'),menuButton=$('#menu-toggle');
  function setMenu(open){
    menu.classList.toggle('open',open);menu.inert=!open;
    menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    document.body.classList.toggle('menu-open',open);$('main').inert=open;$('footer').inert=open;
    if(open)$('a',menu).focus();else if(menu.contains(document.activeElement))menuButton.focus();
  }
  menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
  $$('a',menu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{
    if(!menu.classList.contains('open'))return;
    if(e.key==='Escape'){setMenu(false);return;}
    if(e.key!=='Tab')return;
    const nodes=[menuButton,...$$('a',menu)],first=nodes[0],last=nodes.at(-1);
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
  addEventListener('resize',()=>{if(innerWidth>900)setMenu(false);},{passive:true});
  // Pointer events update on demand. There is no site-wide perpetual pointer animation.
  if(fine.matches){
    $$('.magnetic').forEach(el=>{
      el.addEventListener('pointermove',e=>{if(paused)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.1}px)`;});
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
    $$('.project-visual').forEach(el=>el.addEventListener('pointermove',e=>{if(paused)return;const r=el.getBoundingClientRect();el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');},{passive:true}));
  }
  const themes={
    electric:{headline:'NORMAL IS OVERRATED.',brand:'future / form',label:'THE NEXT GENERATION OF CREATIVE',color:'#dcfc46'},
    editorial:{headline:'Make an entrance.',brand:'Maison.',label:'A MORE CONSIDERED POINT OF VIEW',color:'#d9c4ac'},
    minimal:{headline:'LESS. BUT BETTER.',brand:'form.',label:'REDUCE TO THE ESSENTIAL',color:'#f1f3f4'}
  };
  let labStyle='electric';const stage=$('#lab-stage'),demo=$('.lab-demo');
  function updateAccent(){const hex=$('#lab-accent').value;stage.style.setProperty('--lab-accent',hex);const [r,g,b]=hex.slice(1).match(/../g).map(v=>parseInt(v,16));demo.style.color=(r*.299+g*.587+b*.114)>145?'#10170b':'#fffdf2';}
  function setStyle(value){const t=themes[value];if(!t)return;labStyle=value;stage.dataset.style=value;$('#demo-headline').textContent=$('#lab-message').value.trim()||t.headline;$('.demo-brand').textContent=t.brand;$('.demo-label').textContent=t.label;$('#style-name').textContent=value.toUpperCase();$('#lab-accent').value=t.color;updateAccent();$$('.lab-option').forEach(b=>{b.classList.toggle('selected',b.dataset.style===value);b.setAttribute('aria-pressed',String(b.dataset.style===value));});}
  $$('.lab-option').forEach(b=>b.addEventListener('click',()=>setStyle(b.dataset.style)));
  $('#lab-accent').addEventListener('input',updateAccent);
  $('#lab-message').addEventListener('input',()=>$('#demo-headline').textContent=$('#lab-message').value.trim()||themes[labStyle].headline);
  $('#lab-motion').addEventListener('input',()=>demo.dataset.motion=$('#lab-motion').value);
  $('#lab-reset').addEventListener('click',()=>{$('#lab-message').value='';$('#lab-motion').value='1';demo.dataset.motion='1';demo.classList.remove('activated');setStyle('electric');});
  // The preview's two apparent controls really do something.
  const labMenu=$('.demo-menu'), labAction=$('.demo-action');
  if(labMenu){const button=document.createElement('button');button.type='button';button.className=labMenu.className;button.textContent='REMIX ↗';button.setAttribute('aria-label','Cycle the playground design style');labMenu.replaceWith(button);button.addEventListener('click',()=>setStyle(['electric','editorial','minimal'][(['electric','editorial','minimal'].indexOf(labStyle)+1)%3]));}
  if(labAction){const button=document.createElement('button');button.type='button';button.className=labAction.className;button.textContent='MOVE THE UNEXPECTED ↗';button.setAttribute('aria-pressed','false');labAction.replaceWith(button);button.addEventListener('click',()=>{const on=demo.classList.toggle('activated');button.setAttribute('aria-pressed',String(on));});}
  $('#lab-use').addEventListener('click',()=>{const values={electric:'Bold and expressive',editorial:'Elegant and editorial',minimal:'Clean and minimal'};$('#brief-vibe').value=values[labStyle];$('#brief-feedback').textContent='Your playground direction has been added to your brief.';});
  setStyle('electric');
  $$('.service-row').forEach((el,i)=>{const link=document.createElement('a');link.href='#contact';link.setAttribute('aria-label','Discuss '+$('h3',el).textContent);link.addEventListener('click',()=>selectProject(['Portfolio website','Business website','Something else','Web application'][i]));el.append(link);});
  let selectedProject='Portfolio website',step=0;
  function selectProject(value){selectedProject=value;$$('[data-group=project] .choice').forEach(b=>{const on=b.dataset.value===value;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});}
  $$('[data-group=project] .choice').forEach(b=>b.addEventListener('click',()=>selectProject(b.dataset.value)));
  const email=window.AWE_CONFIG?.contactEmail||'',hasEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(hasEmail){const direct=$('#direct-contact');direct.href='mailto:'+email;direct.hidden=false;$('#contact-status').textContent='Have a quick question? Email '+email+', or use the brief builder to start with a little more detail.';$('#email-brief').hidden=false;}
  else{const direct=$('#direct-contact');direct.href='/contact.html';direct.textContent='SEND A PROJECT INQUIRY ↗';direct.hidden=false;$('#contact-status').textContent='Want to talk about a project? Send an inquiry without signing in. You can also use the creative brief builder below.';}
  const fields=$$('[data-step]'),feedback=$('#brief-feedback');
  function briefText(){return ['PROJECT BRIEF / AWE CONCEPTS','', 'Project: '+selectedProject,'Idea: '+$('#brief-description').value.trim(),'References: '+($('#brief-references').value.trim()||'To discuss'),'','Direction: '+$('#brief-vibe').value,'Ideal timing: '+$('#brief-timeline').value,'Budget: '+($('#brief-budget').value.trim()||'To discuss'),'Name: '+($('#brief-name').value.trim()||'Not provided'),'Email: '+($('#brief-email').value.trim()||'Not provided'),'','Playground style: '+labStyle,'Playground accent: '+$('#lab-accent').value,'Playground headline: '+($('#lab-message').value.trim()||themes[labStyle].headline),'','This brief is a conversation starter, not an order or agreement.'].join('\n');}
  function showStep(){fields.forEach((f,i)=>f.hidden=i!==step);$('#brief-progress').style.width=((step+1)/3*100)+'%';$('#brief-step-label').textContent=['01 / 03 — THE IDEA','02 / 03 — THE DIRECTION','03 / 03 — READY TO SHARE'][step];$('#brief-back').hidden=step===0;$('#brief-next').hidden=step===2;
    if(step===2){const text=briefText();$('#brief-summary').textContent=text;if(hasEmail)$('#email-brief').href='mailto:'+email+'?subject='+encodeURIComponent('Project inquiry — '+selectedProject)+'&body='+encodeURIComponent(text);}
    $('legend',fields[step]).tabIndex=-1;$('legend',fields[step]).focus({preventScroll:true});
  }
  $('#brief-next').addEventListener('click',()=>{for(const el of $$('input,textarea,select',fields[step])){if(!el.checkValidity()){el.reportValidity();return;}}step=Math.min(2,step+1);showStep();});
  $('#brief-back').addEventListener('click',()=>{step=Math.max(0,step-1);showStep();});
  $('#brief-form').addEventListener('submit',e=>e.preventDefault());
  $('#copy-brief').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(briefText());feedback.textContent='Brief copied. Nothing has been sent.';}catch{const selection=getSelection(),range=document.createRange();range.selectNodeContents($('#brief-summary'));selection.removeAllRanges();selection.addRange(range);feedback.textContent='Select and copy the highlighted brief, or download it below. Nothing has been sent.';}});
  $('#download-brief').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([briefText()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Awe Concepts-Project-Brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback.textContent='Brief download prepared. Nothing has been sent.';});
  // Pause background decorative animation while a project file is open.
  document.addEventListener('awe:case',e=>document.dispatchEvent(new CustomEvent('awe:motion',{detail:{paused:paused||e.detail.open}})));
})();
