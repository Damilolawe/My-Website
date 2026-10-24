import {
  templates,
  types,
  sample,
  sampleForTemplate,
  typeSlugs,
  recommendedFor,
  normalize,
  validate,
  esc,
  sections,
} from "/shared/model.mjs";
import { renderSite } from "/shared/render.mjs";
import { tiers, minimumTier, packageTier, templateFitsTier, tierLevel } from "/shared/tiers.mjs";
import { fetchPublicTemplate, previewMessage } from "/shared/preview.mjs";
import { $, api, money, report, authForm } from "./common.mjs";
const labels = [
  "Choose your tier",
  "Explore templates",
  "Your style",
  "Your story",
  "Review & checkout",
];
let step = 0,
  input = normalize({...sample,design:{animation:"expressive"}}),
  files = [],
  catalog = { templates, packages: [], ordersEnabled: false },
  packageId = null,
  selectedTier = null,
  me = null,
  orderId = null,
  draftId = null,
  draftVersion = null,
  uploaded = [],
  theaterController = null;
let theaterPreferredMode = typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches ? "mobile" : "desktop";
// Only fictional data enters the public configurator preview. Customer content stays in memory until submission.
input.content = {
  name: "",
  headline: "",
  bio: "",
  education: "",
  experience: "",
  skills: "",
  projects: "",
  publicEmail: "",
  links: [],
  photoIds: [],
};
const app = $("#app");
try {
  catalog = await api("catalog");
} catch {}
function activePackagesForTier(tier) {
  return (catalog.packages || []).filter(p => p.enabled && packageTier(p) === tier)
    .sort((a,b) => a.amount - b.amount);
}
function selectedPackage() {
  const available = activePackagesForTier(selectedTier);
  return available.find(p => p.id === packageId) || available[0] || null;
}
function syncPackage() {
  packageId = selectedPackage()?.id || null;
}
function setTemplate(id) {
  const template = (catalog.templates || templates).find(t => t.id === id);
  if (!template) return;
  input.template = template.id;
  input.design.primary = template.color;
  input.design.appearance = ["afterhours","nocturne","terminal","brutalist","arcade","runwayml","runwaymulti"].includes(id) ? "dark" : "light";
  input.design.font = id === "folio" ? "serif" : id === "arcade" ? "mono" : "sans";
  input.design.secondary = id === "arcade" ? "#11120f" : "#ece9e0";
  input.design.corners = id === "arcade" ? "sharp" : "soft";
  input.design.sections = sampleForTemplate(id,input.type).design.sections;
}
function field(label, name, value = "", kind = "input") {
  return `<label class="field">${label}${kind === "textarea" ? `<textarea name="${name}" maxlength="${name === "projects" ? 5000 : 3000}">${esc(value)}</textarea>` : `<input name="${name}" value="${esc(value)}" maxlength="${name === "name" ? 100 : name === "headline" ? 160 : 1500}">`}</label>`;
}
function select(label, name, options, value) {
  return `<label class="field">${label}<select name="${name}">${options.map((o) => `<option value="${o}" ${value === o ? "selected" : ""}>${o}</option>`).join("")}</select></label>`;
}
function checkoutLabel() { return catalog.paymentMode === 'test' ? 'Continue to test checkout' : 'Continue to secure checkout'; }
function draw() {
  theaterController?.abort();
  theaterController = null;
  app.innerHTML = `<div class="wizard"><ol class="steps">${labels.map((l, i) => `<li class="${i === step ? "active" : ""}" ${i === step ? 'aria-current="step"' : ""}>0${i + 1} / ${l}</li>`).join("")}</ol><div class="work-area"><span class="step-count">0${step + 1} / 05 — ${labels[step].toUpperCase()}</span><div id="step"></div><div class="actions"><button class="btn secondary" id="back" ${step === 0 || orderId ? "hidden" : ""}>←︎ Back</button><button class="btn acid" id="next">${step === 4 ? checkoutLabel() : step === 0 ? "Browse templates" : "Next step"} ↗︎</button></div></div></div>`;
  const el = $("#step");
  $("#feedback").textContent = "";
  if (step === 0) {
    const cards = tiers.map((t, i) => {
      const packageForTier = activePackagesForTier(t.id)[0];
      const details = packageForTier?.features?.length
        ? packageForTier.features.slice(0, 4).map(f => '<li>' + esc(f) + '</li>').join("")
        : '<li>' + esc(t.note) + '</li><li>Choose your design before customizing</li>';
      const price = packageForTier ? money(packageForTier) : t.inquiry;
      const note = packageForTier ? "Available package" : "Starting inquiry price";
      return '<button type="button" class="tier-choice" data-tier="' + t.id + '" aria-pressed="' +
        String(selectedTier === t.id) + '"><span class="tier-choice-index">0' + (i + 1) +
        ' / ' + esc(note) + '</span><strong>' + esc(t.name) + '</strong><span class="tier-choice-price">' +
        esc(price) + '</span><span class="tier-choice-intro">' + esc(t.note) +
        '</span><ul>' + details + '</ul><span class="tier-choice-link">EXPLORE ' +
        esc(t.name.toUpperCase()) + ' TEMPLATES ↗︎</span></button>';
    }).join("");
    el.innerHTML = '<div class="tier-lead"><p class="eyebrow">01 / THE RIGHT STARTING POINT</p>' +
      '<h2>Start with your budget.<br><em>Find your direction.</em></h2>' +
      '<p class="muted">Choose the level that works for you. Higher tiers include access to designs from lower tiers. Every design is built to look professional.</p></div>' +
      '<div class="tier-choices">' + cards + '</div><p class="tier-disclaimer">Package prices, included services and ownership terms are confirmed before checkout. Starting prices shown without an active package are for inquiries only. <a href="/contact.html">Have a custom project? ↗︎</a></p>';
    el.querySelectorAll("[data-tier]").forEach(button => {
      button.onclick = () => {
        const tier = button.dataset.tier;
        if (tier !== selectedTier) {
          selectedTier = tier;
          packageId = null;
          syncPackage();
          const available = (catalog.templates || templates).filter(t => minimumTier(t.id) === tier);
          if (available.length) setTemplate(available[0].id);
        }
        step = 1;
        draw();
        app.scrollIntoView({ block: "start", behavior: "instant" });
      };
    });
    $("#next").disabled = !selectedTier;
  }
  if (step === 1) {
    const offered = (catalog.templates || templates)
      .filter(t => templateFitsTier(t.id, selectedTier));
    const matchesFilter = t => true; // All authored designs appear independently of purpose.
    const visible = offered.filter(matchesFilter);
    const active = visible.find(t => t.id === input.template) || visible[0] || offered[0];
    if (active && !visible.some(t => t.id === input.template)) setTemplate(active.id);
    const tierButtons = tiers.map(t => '<button type="button" class="tier-switch" data-switch-tier="' + t.id +
      '" aria-pressed="' + String(t.id === selectedTier) + '">' + esc(t.name) + '</button>').join("");
    const demoPath = (id) => id==="runwaymulti" ? "/experiments/runwayml-multipage/" : "/templates/" + encodeURIComponent(id) + ".html";
    const choice = (t,i) => '<article class="template-card template-poster '+(input.template===t.id?'chosen':'')+'" data-poster="'+esc(t.id)+'"><button type="button" class="template-select" data-template="'+esc(t.id)+'" aria-pressed="'+String(input.template===t.id)+'"><span class="poster-art poster-'+esc(t.id)+'" style="--tile:'+esc(t.color)+'"><span class="poster-num">'+String(i+1).padStart(2,'0')+'</span><strong>'+esc(t.name)+'</strong><span class="poster-symbol" aria-hidden="true"></span><span class="poster-style">'+esc(t.style)+''+'</span></span><span class="poster-meta"><strong>'+esc(t.tag)+'</strong><span>'+(input.template===t.id?'SELECTED ✓︎':'EXPLORE DIRECTION ↗︎')+'</span></span></button></article>';
    el.innerHTML = '<div class="tier-gallery-top"><div><p class="eyebrow">02 / FIND YOUR DESIGN</p><h2>' +
      esc(tiers.find(t => t.id === selectedTier)?.name || "Your") +
      ' templates</h2><p class="muted">Your package includes designs at this level and below. Explore the designs as they were authored, without résumé or business examples.</p></div>' +
      '<div class="tier-switches" aria-label="Change your tier">' + tierButtons + '</div></div>' +
      '<div class="template-filterbar"><span class="eyebrow">EXPLORE THE ORIGINAL DESIGNS</span>' +
      '<p class="muted" id="template-count" aria-live="polite">' + visible.length + ' of ' + offered.length + ' available designs</p></div>' +
      '<div class="experience-picker-heading"><div><p class="eyebrow">ORIGINAL DESIGN DIRECTIONS</p><h2>Don’t pick a color.<br><em>Pick a feeling.</em></h2><p class="muted">Explore real, scrollable example websites. The people and projects shown are fictional.</p></div><div class="experience-picker-index" aria-hidden="true"><strong></strong><small>AN ORIGINAL STARTING POINT</small></div></div>' +
      '<div class="experience-theater'+(theaterPreferredMode==='mobile'?' is-mobile':'')+'" data-active="'+esc(active.id)+'">' +
        '<div class="theater-header"><div class="theater-identity"><span class="eyebrow"><i class="theater-live" aria-hidden="true"></i> THE LIVE TEMPLATE THEATER</span><strong>Explore the actual website, not a static mockup.</strong></div>' +
        '<div class="theater-tools" aria-label="Preview screen size"><button type="button" id="theater-desktop" aria-pressed="'+String(theaterPreferredMode==='desktop')+'">DESKTOP</button><button type="button" id="theater-mobile" aria-pressed="'+String(theaterPreferredMode==='mobile')+'">MOBILE</button><a href="'+demoPath(active.id)+'" target="_blank" rel="noopener" id="theater-open">VIEW FULL WEBSITE ↗︎</a></div></div>' +
        '<div class="theater-viewport"><div class="theater-browser"><div class="theater-browserbar"><span class="browser-lights" aria-hidden="true"><i></i><i></i><i></i></span><span class="browser-url">'+esc(active.name)+' / fictional website preview</span><span class="browser-mode">'+(theaterPreferredMode==='mobile'?'MOBILE':'DESKTOP')+'</span></div><div class="theater-canvas"><iframe id="theater-frame" title="Fictional '+esc(active.name)+' website" sandbox="" loading="eager"></iframe><div class="theater-loading" role="status" aria-live="polite" hidden><span aria-hidden="true" class="theater-loading-mark">✳︎</span><strong>CRAFTING THE PREVIEW</strong><span id="theater-loading-name">'+esc(active.name)+'</span></div></div></div></div>' +
        '<div class="theater-caption"><div><span class="eyebrow">NOW EXPLORING · '+esc(selectedTier.toUpperCase())+'</span><h3>'+esc(active.name)+'</h3><p>'+esc(active.tag)+'</p></div><p class="theater-hint">SCROLL INSIDE THE SITE TO EXPLORE EVERY SECTION ↗︎</p></div>' +
        '<div class="theater-reassurance">This is a fictional demonstration. Your content, images, and colors are customized in the next steps. Select another direction below without losing your place.</div>' +
      '</div>' +
      '<div class="template-grid premium-template-grid">' + offered.map(choice).join('') + '</div>' +
      '<p id="no-template-matches" class="panel" ' + (visible.length ? 'hidden' : '') + '>No templates are available at this tier.</p>';
    const frame=el.querySelector("#theater-frame");
    const theater=el.querySelector(".experience-theater");
    const canvas=el.querySelector(".theater-canvas");
    const loading=el.querySelector(".theater-loading"),loadingName=el.querySelector("#theater-loading-name");
    const modeText=el.querySelector(".browser-mode");
    const lifetime=new AbortController();
    theaterController=lifetime;
    let activeRequest=null;
    const syncFrameSize=()=>{
      const mobile=theaterPreferredMode==="mobile";
      theater.classList.toggle("is-mobile",mobile);
      el.querySelector("#theater-mobile").setAttribute("aria-pressed",String(mobile));
      el.querySelector("#theater-desktop").setAttribute("aria-pressed",String(!mobile));
      modeText.textContent=mobile?"MOBILE":"DESKTOP";
      if(mobile){
        frame.style.width="";
        frame.style.height="";
        frame.style.transform="";
        canvas.style.height="auto";
      } else {
        // Keep the real desktop breakpoint even when the theater itself is narrower.
        const scale=Math.min(1,Math.max(.15,canvas.clientWidth/1280));
        frame.style.width="1280px";
        frame.style.height="1280px";
        frame.style.transform="scale("+scale+")";
        canvas.style.height=Math.round(1280*scale)+"px";
      }
    };
    const loadTemplate=(id)=>{
      activeRequest?.abort();
      activeRequest=new AbortController();
      const thisRequest=activeRequest;
      loadingName.textContent=templates.find(t=>t.id===id)?.name||"Website concept";
      loading.hidden=false;
      if(!frame.srcdoc)frame.srcdoc=previewMessage("Preparing your website preview…");
      fetchPublicTemplate(id,{signal:activeRequest.signal})
        .then((html)=>{
          if(!lifetime.signal.aborted&&!thisRequest.signal.aborted&&frame.isConnected&&input.template===id){
            frame.onload=()=>{if(!thisRequest.signal.aborted&&input.template===id)loading.hidden=true;};
            frame.srcdoc=html;
          }
        })
        .catch((error)=>{
          if(lifetime.signal.aborted||thisRequest.signal.aborted||!frame.isConnected)return;
          frame.onload=()=>{if(!thisRequest.signal.aborted)loading.hidden=true;};
          frame.srcdoc=previewMessage("This preview could not load. Use View Full Website above to explore the template.");
          console.warn("Template preview unavailable",error);
        });
    };
    lifetime.signal.addEventListener("abort",()=>activeRequest?.abort(),{once:true});
    window.addEventListener("resize",syncFrameSize,{signal:lifetime.signal});
    const setMode=(mode)=>{theaterPreferredMode=mode;syncFrameSize();};
    el.querySelector("#theater-desktop").onclick=()=>setMode("desktop");
    el.querySelector("#theater-mobile").onclick=()=>setMode("mobile");
    const chooseTemplate = id => {
      const template = offered.find(t => t.id === id);
      if (!template) return;
      setTemplate(id);
      theater.dataset.active=id;
      el.querySelector(".theater-caption h3").textContent = template.name;
      el.querySelector(".theater-caption p").textContent = template.tag;
      el.querySelector(".browser-url").textContent = template.name + " / fictional website preview";
      el.querySelector("#theater-open").href = demoPath(id);
      frame.title = "Fictional " + template.name + " website";
      el.querySelectorAll("[data-template]").forEach(b => {
        const chosen = b.dataset.template === id;
        b.setAttribute("aria-pressed", String(chosen));
        b.closest(".template-poster").classList.toggle("chosen", chosen);
        b.querySelector(".poster-meta>span").textContent = chosen ? "SELECTED ✓︎" : "EXPLORE DIRECTION ↗︎";
      });
      // Only update the sandboxed preview; keep scroll position stable.
      loadTemplate(id);
    };
    el.querySelectorAll("[data-template]").forEach(button => {
      button.onclick = () => chooseTemplate(button.dataset.template);
    });
    const applyPurposeFilter = () => {
      const shown = offered.filter(matchesFilter);
      el.querySelectorAll("[data-template]").forEach(button => {
        const template = offered.find(t => t.id === button.dataset.template);
        button.closest(".template-card").hidden = !template || !matchesFilter(template);
      });
      el.querySelector("#template-count").textContent = shown.length + " of " + offered.length + " available designs";
      el.querySelector("#no-template-matches").hidden = Boolean(shown.length);
      if (shown.length && !shown.some(t => t.id === input.template)) chooseTemplate(shown[0].id);
    };
    el.querySelectorAll("[data-switch-tier]").forEach(button => {
      button.onclick = () => {
        selectedTier = button.dataset.switchTier;
        packageId = null;
        syncPackage();
        const inRange = offered.find(t => t.id === input.template);
        const next = (catalog.templates || templates).filter(t => templateFitsTier(t.id, selectedTier));
        if (!next.some(t => t.id === input.template) && next.length) setTemplate(next[0].id);
        draw();
      };
    });
    applyPurposeFilter();
    syncFrameSize();
    if (active) loadTemplate(input.template);
  }
  if (step === 2) {
    const fixedControls = input.template === "arcade"
      ? '<p class="muted">Arcade Night keeps the supplied Big Shoulders / JetBrains typography, dark appearance, broadcast layout and sharp corners. Colors, section order, navigation and motion remain editable.</p>' +
        '<input type="hidden" name="font" value="mono"><input type="hidden" name="appearance" value="dark"><input type="hidden" name="layout" value="stacked"><input type="hidden" name="heroAlignment" value="left"><input type="hidden" name="corners" value="sharp">'
      : `${select("Typography", "font", ["sans", "serif", "mono"], input.design.font)}${select("Appearance", "appearance", ["light", "dark"], input.design.appearance)}${select("Layout", "layout", ["stacked", "split"], input.design.layout)}${select("Hero alignment", "heroAlignment", ["left", "center", "right"], input.design.heroAlignment)}${select("Corner style", "corners", ["sharp", "soft", "round"], input.design.corners)}`;
    el.innerHTML = `<h2>Give it your signature.</h2><div class="split"><form id="design" class="panel"><div class="field-row"><label class="field">Primary color<input name="primary" type="color" value="${input.design.primary}"></label><label class="field">Secondary color<input name="secondary" type="color" value="${input.design.secondary}"></label></div><p class="muted">Primary changes accents, buttons and selected hero highlights. Secondary influences backgrounds and interface surfaces. Photo imagery itself stays the same as you change colors; watch the preview adapt.</p>${fixedControls}${select("Navigation", "navigation", ["full", "compact"], input.design.navigation)}${select("Motion", "animation", ["none", "subtle", "expressive"], input.design.animation)}${select("Page spacing", "density", ["airy", "balanced", "compact"], input.design.density)}<p class="field">Website sections</p><div class="checks">${sections.map((s) => `<label><input type="checkbox" name="sections" value="${s}" ${input.design.sections.includes(s) ? "checked" : ""}> ${s}</label>`).join("")}</div>${field("Anything else in mind?", "preferences", input.preferences, "textarea")}</form><div class="preview-shell"><div class="preview-top"><span>SAMPLE CONFIGURATION</span><div><button id="wide" aria-label="Desktop preview">DESKTOP</button><button id="narrow" aria-label="Mobile preview">MOBILE</button></div></div><iframe title="Fictional template configuration preview" sandbox=""></iframe><p class="muted">This is sample content. Your personalized site is reviewed privately before delivery.</p></div></div>`;
    const update = () => {
      const f = new FormData($("#design"));
      input.design = {
        ...Object.fromEntries(f),
        sections: f.getAll("sections"),
      };
      input.preferences = f.get("preferences");
      $("iframe", el).srcdoc = renderSite(
        { ...sampleForTemplate(input.template,input.type), design: input.design },
        { sample: true },
      );
    };
    $("#design").oninput = update;
    $("#wide").onclick = () => {
      $("iframe", el).style.width = "100%";
    };
    $("#narrow").onclick = () => {
      $("iframe", el).style.width = "320px";
    };
    update();
  }
  if (step === 3) {
    const copy = ({
      "Student résumé":{name:"Your public name",headline:"Career headline / your focus",bio:"Introduce yourself to recruiters",projects:"Projects, research & achievements",cards:"Portfolio projects — title | what you built | HTTPS URL",services:"Services / capabilities (optional)",experience:"Internships, campus roles & experience",skills:"Technical & transferable skills",media:"Résumé, project screenshots & profile photos",hint:"Show evidence of your work, not invented accomplishments."},
      "Professional portfolio":{name:"Professional name",headline:"Your professional positioning",bio:"Professional overview",projects:"Case studies / completed projects",cards:"Case studies — title | measurable result | HTTPS URL",services:"Areas of expertise (optional)",experience:"Career and professional experience",skills:"Specialties and tools",media:"Résumé, case studies & portfolio images",hint:"Use real, verifiable case studies and outcomes."},
      "Actor / model":{name:"Stage / casting name",headline:"Your performance headline",bio:"Performer biography",projects:"Acting credits & portfolio highlights",cards:"Roles, reels & headshots — title | role / details | HTTPS reel URL",services:"Performance disciplines (optional)",experience:"Stage and screen credits",skills:"Special skills, accents & training",media:"Headshots, showreel stills & résumé",hint:"Include real credits, training and casting materials only. Do not claim fictional roles."},
      "Creative portfolio":{name:"Creative / studio name",headline:"Your creative point of view",bio:"Artist statement",projects:"Art, design and image collections",cards:"Selected work — title | creative brief | HTTPS URL",services:"Creative services (optional)",experience:"Exhibitions, collaborations & commissions",skills:"Tools and creative disciplines",media:"Photography, artwork & selected images",hint:"Show your own work or work you have permission to publish."},
      "Personal brand":{name:"Your public brand name",headline:"Your signature statement",bio:"Origin story & perspective",projects:"Milestones, ventures & thought leadership",cards:"Highlights — title | impact / story | HTTPS URL",services:"Speaking, partnerships & offerings",experience:"Background and achievements",skills:"Core strengths",media:"Portraits, press images & résumé (optional)",hint:"Lead with your real story, experiences and offers."},
      "Small business":{name:"Public business name",headline:"Customer-focused promise",bio:"The story behind the business",projects:"Case studies & customer experiences",cards:"Featured work — title | customer value | HTTPS URL",services:"Services, offerings & products",experience:"Your experience & qualifications (optional)",skills:"Specialties & value (optional)",media:"Products, team photos & business imagery",hint:"Make it easy to understand what you sell and how customers contact you. Use authentic reviews only."}
    })[input.type];
    const folioProjectFields = input.template === "folio"
      ? '<div class="notice"><h3>Customize the selected projects</h3><p>Each project has its own title, description, link and optional video. Upload the hero image first, followed by the project pictures in order.</p></div>' +
        [0,1,2].map(i => {
          const card = input.content.cards?.[i] || {};
          return '<fieldset class="panel"><legend>Project ' + (i+1) + '</legend>' +
            field('Project title', 'folioTitle'+i, card.title || '') +
            field('Project description', 'folioDescription'+i, card.description || '', 'textarea') +
            field('Project link (optional HTTPS URL)', 'folioUrl'+i, card.url || '') +
            field('Project video link (YouTube, Vimeo or HTTPS MP4/WebM)', 'folioVideo'+i, card.videoUrl || '') +
            '</fieldset>';
        }).join('')
      : field(copy.cards, "cardsText", (input.content.cards || []).map(x=>[x.title,x.description,x.url].join(" | ")).join("\n"), "textarea");
    el.innerHTML = `<h2>The story only you can tell.</h2><label class="field">What will you use your website for?<select id="site-purpose">${types.map(t => '<option value="' + esc(t) + '" ' + (input.type === t ? 'selected' : '') + '>' + esc(t) + '</option>').join("")}</select></label><p class="muted">${esc(copy.hint)} Use information you want visitors to see. Leave home addresses and private phone numbers out. Your résumé can suggest editable text after sign-in. Nothing from it is published until you explicitly apply changes and the studio owner approves the website.</p><form id="content" class="panel"><div class="field-row">${field(copy.name+" *", "name", input.content.name)}${field(copy.headline+" *", "headline", input.content.headline)}</div>${field(copy.bio, "bio", input.content.bio, "textarea")}${field("Hero label (optional)", "heroLabel", input.content.heroLabel || "")}${field("Main button text", "ctaLabel", input.content.ctaLabel || "Explore my work")}${field(copy.projects+" (freeform)", "projects", input.content.projects, "textarea")}<div class="notice"><h3>Feature your work beautifully</h3><p>Optional structured cards: one per line, in the form <strong>Title | Description | https://link.example</strong>. Leave empty to use your freeform projects instead.</p>${folioProjectFields}${field(copy.services+" (one per line)", "servicesText", (input.content.services || []).map(x=>[x.title,x.description,x.url].join(" | ")).join("\n"), "textarea")}${field("Testimonials (only genuine quotes)", "testimonialsText", (input.content.testimonials || []).map(x=>[x.quote,x.attribution].join(" | ")).join("\n"), "textarea")}</div><div class="field-row">${field("Education", "education", input.content.education, "textarea")}${field(copy.experience, "experience", input.content.experience, "textarea")}</div>${field(copy.skills, "skills", input.content.skills)}${field("Public contact email (optional)", "publicEmail", input.content.publicEmail)}${field("HTTPS profile links (one per line)", "links", input.content.links.join("\n"), "textarea")}${input.template === "folio" ? field("Hero video URL (optional: YouTube, Vimeo or HTTPS MP4/WebM)", "heroVideoUrl", input.content.heroVideoUrl || "") + '<p class="muted">Folio image order: the first selected photo is the hero; the next three are project photos. Videos use links, not file uploads.</p>' : ""}<label class="field">${esc(copy.media)} (up to 12 files, 4 MB each)<input id="files" type="file" multiple accept=".pdf,.docx,.jpg,.jpeg,.png,.webp"></label><p class="muted">Selected photos will be included in your website after review. Only choose images you have permission to publish. PDF and DOCX documents remain private.</p><ul class="file-list" id="file-list"></ul><button type="button" class="btn secondary small" id="clear-files">Clear selected files</button><div class="notice"><h3>Import details from your résumé</h3><p>Choose a PDF or DOCX above, then preview suggestions. We do not automatically publish them, infer qualifications, or save the extraction result.</p><button type="button" class="btn secondary small" id="resume-analyze">Preview résumé suggestions ↗︎</button><p id="resume-feedback" role="status" class="feedback"></p><div id="resume-review"></div><div id="resume-auth"></div></div></form>`;
    el.querySelector("#site-purpose").onchange = e => { input.type = e.target.value; };
    const filelist = () => {
      $("#file-list").innerHTML = files
        .map(
          (f) =>
            `<li>${esc(f.name)} · ${(f.size / 1048576).toFixed(2)} MB</li>`,
        )
        .join("");
    };
    $("#files").onchange = (e) => {
      const list = [...e.target.files];
      if (list.length > 12 || list.some((f) => f.size > 4194304)) {
        report("Choose up to 12 files, each no larger than 4 MB.");
        e.target.value = "";
        return;
      }
      files = list;
      filelist();
    };
    $("#clear-files").onclick = () => {
      files = [];
      $("#files").value = "";
      filelist();
    };
    filelist();
    $("#resume-analyze").onclick = async () => {
      const doc = files.find((f) => /\.pdf$|\.docx$/i.test(f.name));
      if (!doc) { $("#resume-feedback").textContent = "Choose a PDF or DOCX résumé using the file picker first."; return; }
      try { await api("me"); } catch {
        $("#resume-feedback").textContent = "Sign in below to analyze your résumé privately.";
        authForm($("#resume-auth"), () => { $("#resume-auth").innerHTML = ""; $("#resume-analyze").click(); });
        return;
      }
      const button = $("#resume-analyze");
      button.disabled = true;
      $("#resume-feedback").textContent = "Reading your document privately…";
      try {
        const fd = new FormData();
        fd.append("file", doc);
        const result = await api("resume/preview", fd);
        const fields = Object.entries(result.fields).filter(([_, value]) => !!value);
        const box = $("#resume-review");
        box.innerHTML = '<h4>Review extracted suggestions</h4><p class="muted">Uncheck anything you do not wish to apply. Read each field carefully—extraction can make mistakes.</p>' +
          fields.map(([key, value]) =>
            '<label class="field"><input type="checkbox" data-resume-field="' + esc(key) + '" checked> ' + esc(key) + '<textarea readonly rows="3">' + esc(value) + '</textarea></label>'
          ).join("") +
          result.warnings.map((w) => '<p class="muted">' + esc(w) + '</p>').join("") +
          '<button type="button" class="btn acid small" id="apply-resume">Apply selected suggestions ↗︎</button>';
        $("#resume-feedback").textContent = fields.length ? "Review the suggestions before applying." : "No usable fields found; enter your details manually.";
        const apply = $("#apply-resume");
        if (apply) apply.onclick = () => {
          let changed = 0;
          box.querySelectorAll("[data-resume-field]:checked").forEach((check) => {
            const key = check.dataset.resumeField;
            const destination = $("#content [name='" + key + "']");
            if (destination && result.fields[key]) { destination.value = result.fields[key]; changed++; }
          });
          $("#content").dispatchEvent(new Event("input",{bubbles:true}));
          $("#resume-feedback").textContent = changed + " reviewed field(s) applied. You can edit them before checkout.";
          box.innerHTML = "";
        };
      } catch (e) { $("#resume-feedback").textContent = e.message || "Unable to analyze this document."; }
      finally { button.disabled = false; }
    };
    $("#content").oninput = () => {
      const f = Object.fromEntries(new FormData($("#content")));
      for (const k of [
        "name",
        "headline",
        "bio",
        "projects",
        "education",
        "experience",
        "skills",
        "publicEmail",
      ])
        input.content[k] = f[k];
      input.content.links = (f.links || "")
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean);
      input.content.heroLabel = f.heroLabel || "";
      input.content.ctaLabel = f.ctaLabel || "Explore my work";
      const structured = (str, fields, max) => String(str || "").split("\n").filter(Boolean).slice(0,max).map(line => {
        const parts = line.split("|").map(x=>x.trim());
        return Object.fromEntries(fields.map((name,i)=>[name,parts[i]||""]));
      });
      input.content.cards = input.template === "folio"
        ? [0,1,2].map(i=>({
            title: String(f["folioTitle"+i] || ""),
            description: String(f["folioDescription"+i] || ""),
            url: String(f["folioUrl"+i] || ""),
            videoUrl: String(f["folioVideo"+i] || ""),
          })).filter(card=>card.title||card.description||card.url||card.videoUrl)
        : structured(f.cardsText, ["title","description","url"],12);
      if(input.template === "folio") input.content.heroVideoUrl = String(f.heroVideoUrl || "");
      input.content.services = structured(f.servicesText, ["title","description","url"],12);
      input.content.testimonials = structured(f.testimonialsText, ["quote","attribution"],8);
    };
  }
  if (step === 4) {
    const p = selectedPackage();
    if (p) packageId = p.id;
    const tier = tiers.find(t => t.id === selectedTier);
    el.innerHTML = `<h2>One last look. Then your next chapter.</h2><div class="summary"><div class="panel"><dl><dt>Your website</dt><dd>${esc(input.type)}</dd><dt>Design direction</dt><dd>${esc(templates.find((t) => t.id === input.template)?.name)} · ${esc(input.design.font)} · ${esc(input.design.appearance)}<br>${esc(input.design.primary)} / ${esc(input.design.secondary)}</dd><dt>Public name & headline</dt><dd>${esc(input.content.name)}<br>${esc(input.content.headline)}</dd><dt>Sections</dt><dd>${input.design.sections.map(esc).join(", ")}</dd><dt>Materials</dt><dd>${files.length ? files.map((f) => esc(f.name)).join("<br>") : "No files selected"}</dd></dl><p class="muted">Use Back to change any details before checkout.</p></div><div class="panel"><div class="eyebrow">SELECTED PACKAGE · ${esc(tier?.name || "Unselected")}</div><p class="muted">To change your package, go back to Step 1. Your content will be kept.</p><h3>${p ? money(p) : "Prices start at $75"}</h3>${p ? `<p>Website purchase: ${money(p)}<br>Total: ${money(p)}</p><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul><h4>Hosting</h4><p class="terms">${esc(p.hosting)}</p><h4>Ownership</h4><p class="terms">${esc(p.ownership)}</p><h4>Revisions</h4><p class="terms">${esc(p.revisions)}</p>${p.refunds ? `<h4>Payment, cancellations & refunds</h4><p class="terms"><strong>${esc(p.refunds)}</strong></p>` : ""}` : "<p>This tier has no configured checkout package yet. Its published starting price is " + esc(tier?.inquiry || "$75") + " (inquiry only). <a href='/contact.html'>Request a quote</a>.</p>"}<label><input type="checkbox" id="consent"> I agree to the package terms${p?.refunds ? ", including the all-sales-final, non-refundable payment policy (except where required by law)," : ","} acknowledge the <a href="/privacy.html" target="_blank">privacy information</a>, and confirm I have permission to use these materials.</label></div></div><div class="notice">${catalog.paymentMode === "live" ? "Secure Stripe checkout. You will see the final amount before confirming payment." : catalog.paymentMode === "test" ? "Sandbox verification only. No live payments are enabled." : "Explore freely. Orders and payments are not open yet."} Every website is personally reviewed before publication.</div><div class="panel"><h3>Save this design for later</h3><p class="muted">Save your website concept privately without paying. You can return to edit it, and the studio can review your submitted direction. Saving is not a paid order or a publication request. Selected photo and document files remain on your device until they are uploaded during an order.</p><button type="button" class="btn secondary" id="save-draft">Save my design ↗︎</button><p id="save-status" role="status" aria-live="polite"></p></div><div id="sign-in"></div>`;
    $("#next").disabled = input.template==="runwaymulti" || !catalog.ordersEnabled || !p || !templateFitsTier(input.template,selectedTier);
    if(input.template==="runwaymulti") el.insertAdjacentHTML("beforeend",'<p class="notice" role="status">The five-page Signature design is available for exploration, but automatic multi-page customer publishing is not available yet. Checkout is disabled for this preview. <a href="/contact.html">Ask about a custom multi-page build ↗︎</a></p>');
    $("#save-draft").onclick = saveDraft;
  }
  $("#back").onclick = () => {
    step--;
    draw();
    app.scrollIntoView({ block: "start", behavior: "instant" });
  };
  $("#next").onclick = async () => {
    try {
      if (step === 0 && !selectedTier) throw Error("Choose a tier first.");
      if (step === 1 && !templateFitsTier(input.template,selectedTier)) throw Error("Choose a template available in your tier.");
      if (step === 2 && !input.design.sections.length)
        throw Error("Choose at least one section.");
      if (step === 3) validate(input);
      if (step < 4) {
        step++;
        draw();
        app.scrollIntoView({ block: "start", behavior: "instant" });
        return;
      }
      if (!$("#consent").checked)
        throw Error("Review and accept the package terms first.");
      try {
        me = await api("me");
      } catch {
        authForm($("#sign-in"), async () => {
          me = await api("me");
          $("#sign-in").innerHTML =
            "<p>You’re signed in. Continue to checkout when ready.</p>";
        });
        return;
      }
      await checkout();
    } catch (e) {
      report(e);
    }
  };
}
async function checkout() {
  const btn = $("#next");
  btn.disabled = true;
  try {
    const p = selectedPackage();
    if (!p || !templateFitsTier(input.template, selectedTier)) throw Error("Select an eligible package before checkout.");
    if (!orderId && draftId) {
      const prepared = await api(`drafts/${draftId}/prepare`, {
        input,
        version: draftVersion,
        packageId,
        termsVersion: p.termsVersion,
        consent: true,
      });
      if (prepared?.id !== draftId || !Number.isSafeInteger(prepared.version))
        throw Error("The studio could not prepare your saved design for checkout.");
      orderId = prepared.id;
      draftVersion = prepared.version;
      $("#back").hidden = true;
    } else if (!orderId) {
      const o = await api("orders", {
        input,
        packageId,
        termsVersion: p.termsVersion,
        consent: true,
      });
      orderId = o.id;
      $("#back").hidden = true;
    }
    for (let i = uploaded.length; i < files.length; i++) {
      btn.textContent = `Uploading ${i + 1} / ${files.length}…`;
      const fd = new FormData();
      fd.append("file", files[i]);
      fd.append("publish", "true");
      uploaded.push(await api(`orders/${orderId}/upload`, fd));
    }
    input.content.photoIds = uploaded
      .filter((a) => a.mime.startsWith("image/"))
      .map((a) => a.id);
    btn.textContent = catalog.paymentMode === "test" ? "Opening secure test checkout…" : "Opening secure checkout…";
    const r = await api(`orders/${orderId}/checkout`, { input });
    const url = new URL(r.url);
    if (url.hostname !== "checkout.stripe.com" || url.protocol !== "https:")
      throw Error("Unexpected checkout destination.");
    location.assign(url.href);
  } finally {
    btn.disabled = false;
    btn.textContent = catalog.paymentMode === "test" ? "Continue to test checkout ↗︎" : "Continue to secure checkout ↗︎";
  }
}
const isUuid=(value)=>/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(value||"");
async function saveDraft() {
  const button=$("#save-draft");
  if (!button) return;
  button.disabled=true;
  try {
    try {
      await api("me");
    } catch (error) {
      if (error?.status === 401) {
        authForm($("#sign-in"), saveDraft);
        return;
      }
      throw error;
    }
    const data=draftId
      ? await api(`drafts/${draftId}`,{input,version:draftVersion})
      : await api("drafts",{input});
    if (!isUuid(data?.id) || !Number.isSafeInteger(data.version))
      throw Error("The studio could not confirm that your design was saved.");
    draftId=data.id;
    draftVersion=data.version;
    // The project identifier is a lookup reference, never an authentication token.
    history.replaceState(null,"",`/order.html?draft=${draftId}`);
    const message=$("#save-status");
    if (message) {
      message.textContent="Design saved privately. You can resume it using this page or from your account. ";
      const link=document.createElement("a");
      link.href="/account.html";
      link.textContent="Go to your projects ↗︎";
      message.append(link);
    }
  } catch(error) {
    report(error);
  } finally {
    button.disabled=false;
  }
}
async function restoreDraft() {
  const candidate=new URLSearchParams(location.search).get("draft");
  if(!candidate) return;
  if(!isUuid(candidate)){report(Error("Invalid draft link."));return;}
  try {
    const saved=await api(`drafts/${candidate}`);
    if(saved?.id!==candidate || !Number.isSafeInteger(saved?.version) || !saved?.input)
      throw Error("The studio could not load this saved design.");
    draftId=saved.id;
    draftVersion=saved.version;
    input=normalize(saved.input);
    selectedTier = minimumTier(input.template) || "starter";
    packageId = null;
    const choices = tiers.filter(t => tierLevel(t.id) >= tierLevel(selectedTier));
    const withPackage = choices.find(t => activePackagesForTier(t.id).length);
    if (withPackage) selectedTier = withPackage.id;
    syncPackage();
    files=[];
    uploaded=[];
    step=4;
    draw();
    const info=$("#save-status");
    if(info) info.textContent="Saved design loaded. You can change the earlier steps and save again.";
  } catch(error) {
    if(error?.status===401) {
      authForm(app,restoreDraft);
    } else {
      draw();
      report(error);
    }
  }
}
draw();
await restoreDraft();


