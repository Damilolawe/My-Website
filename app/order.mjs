import {
  templates,
  types,
  sample,
  sampleForTemplate,
  recommendedFor,
  normalize,
  validate,
  esc,
  sections,
} from "/shared/model.mjs";
import { renderSite } from "/shared/render.mjs";
import { fetchPublicTemplate, previewMessage } from "/shared/preview.mjs";
import { $, api, money, report, authForm } from "./common.mjs";
const labels = [
  "Your purpose",
  "Your starting point",
  "Your style",
  "Your story",
  "Review & checkout",
];
let step = 0,
  input = normalize({...sample,design:{animation:"expressive"}}),
  files = [],
  catalog = { templates, packages: [], ordersEnabled: false },
  packageId = "express",
  me = null,
  orderId = null,
  draftId = null,
  draftVersion = null,
  uploaded = [],
  theaterController = null;
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
function field(label, name, value = "", kind = "input") {
  return `<label class="field">${label}${kind === "textarea" ? `<textarea name="${name}" maxlength="${name === "projects" ? 5000 : 3000}">${esc(value)}</textarea>` : `<input name="${name}" value="${esc(value)}" maxlength="${name === "name" ? 100 : name === "headline" ? 160 : 1500}">`}</label>`;
}
function select(label, name, options, value) {
  return `<label class="field">${label}<select name="${name}">${options.map((o) => `<option value="${o}" ${value === o ? "selected" : ""}>${o}</option>`).join("")}</select></label>`;
}
function draw() {
  theaterController?.abort();
  theaterController = null;
  app.innerHTML = `<div class="wizard"><ol class="steps">${labels.map((l, i) => `<li class="${i === step ? "active" : ""}" ${i === step ? 'aria-current="step"' : ""}>0${i + 1} / ${l}</li>`).join("")}</ol><div class="work-area"><span class="step-count">0${step + 1} / 05 — ${labels[step].toUpperCase()}</span><div id="step"></div><div class="actions"><button class="btn secondary" id="back" ${step === 0 || orderId ? "hidden" : ""}>← Back</button><button class="btn acid" id="next">${step === 4 ? "Continue to test checkout" : "Next step"} ↗</button></div></div></div>`;
  const el = $("#step");
  $("#feedback").textContent = "";
  if (step === 0) {
    el.innerHTML = `<h2>What’s your next move?</h2><p class="muted">A first impression, a fresh start, a new opportunity.</p><div class="choices">${types.map((t, i) => `<button class="choice-card" data-type="${esc(t)}" aria-pressed="${input.type === t}"><span class="arrow">↗</span><small>0${i + 1} / MADE FOR YOU</small><strong>${t}</strong></button>`).join("")}</div><p class="muted">Something more ambitious? <a href="/account.html?custom=1">Tell us about an Awe Concepts Custom project ↗</a></p>`;
    el.querySelectorAll("[data-type]").forEach(
      (b) =>
        (b.onclick = () => {
          input.type = b.dataset.type;
          input.design.sections = sampleForTemplate(input.template,input.type).design.sections;
          draw();
        }),
    );
  }
  if (step === 1) {
    const active = templates.find((t)=>t.id===input.template) || templates[0];
    const offered = [...templates].sort((a,b)=>Number(recommendedFor(b,input.type))-Number(recommendedFor(a,input.type)));
    el.innerHTML = '<div class="experience-picker-heading"><div><p class="eyebrow">FIND YOUR CREATIVE DIRECTION.</p><h2>Don’t pick a color.<br><em>Pick a feeling.</em></h2><p class="muted">Exploring '+esc(input.type)+' websites. Each preview uses fictional examples designed for that purpose.</p></div><div class="experience-picker-index"><strong>✳</strong><small>DESIGNED FOR YOUR STORY</small></div></div>' +
      '<div class="experience-theater" data-active="'+esc(active.id)+'"><div class="theater-header"><span class="eyebrow"><i class="theater-live"></i> LIVE TEMPLATE THEATER</span><div class="theater-tools"><button type="button" id="theater-desktop" aria-pressed="true">DESKTOP</button><button type="button" id="theater-mobile" aria-pressed="false">MOBILE</button><a href="/templates/'+({ "Student résumé":"student","Professional portfolio":"professional","Actor / model":"actor","Creative portfolio":"creative","Personal brand":"brand","Small business":"business"}[input.type])+"/"+esc(active.id)+'.html" target="_blank" rel="noopener" id="theater-open">OPEN FULL DEMO ↗</a></div></div><div class="theater-viewport"><iframe id="theater-frame" title="Fictional '+esc(active.name)+' template preview" sandbox="" loading="eager"></iframe></div><div class="theater-caption"><div><span class="eyebrow">NOW EXPLORING</span><h3>'+esc(active.name)+'</h3><p>'+esc(active.tag)+'</p></div><span class="eyebrow">SCROLL INSIDE TO EXPLORE ↗</span></div></div>' +
      '<div class="template-grid premium-template-grid">' + offered.map((t,i)=>'<article class="template-card template-poster '+(input.template===t.id?'chosen':'')+'" data-poster="'+esc(t.id)+'"><button type="button" class="template-select" data-template="'+esc(t.id)+'" aria-pressed="'+String(input.template===t.id)+'"><span class="poster-art poster-'+esc(t.id)+'" style="--tile:'+esc(t.color)+'"><span class="poster-num">'+String(i+1).padStart(2,'0')+'</span><strong>'+esc(t.name)+'</strong><span class="poster-symbol" aria-hidden="true">✳</span><span class="poster-style">'+esc(t.style)+(recommendedFor(t,input.type)?' · RECOMMENDED':'')+'</span></span><span class="poster-meta"><strong>'+esc(t.tag)+'</strong><span>'+ (input.template===t.id?'SELECTED ✓':'EXPLORE DIRECTION ↗')+'</span></span></button></article>').join("")+'</div>';
    const frame=el.querySelector("#theater-frame"),theater=el.querySelector(".experience-theater");
    const controller=new AbortController();
    theaterController=controller;
    frame.srcdoc=previewMessage("Loading "+active.name+"…");
    fetchPublicTemplate(active.id,{type:input.type,signal:controller.signal})
      .then((html)=>{if(!controller.signal.aborted && frame.isConnected)frame.srcdoc=html;})
      .catch((error)=>{
        if(controller.signal.aborted || !frame.isConnected)return;
        frame.srcdoc=previewMessage("Preview unavailable. Select Open Full Demo above to see this design.");
        console.warn("Template preview unavailable",error);
      });
    el.querySelector("#theater-mobile").onclick=()=>{theater.classList.add("is-mobile");el.querySelector("#theater-mobile").setAttribute("aria-pressed","true");el.querySelector("#theater-desktop").setAttribute("aria-pressed","false");};
    el.querySelector("#theater-desktop").onclick=()=>{theater.classList.remove("is-mobile");el.querySelector("#theater-desktop").setAttribute("aria-pressed","true");el.querySelector("#theater-mobile").setAttribute("aria-pressed","false");};
    el.querySelectorAll("[data-template]").forEach(
      (b) =>
        (b.onclick = () => {
          input.template = b.dataset.template;
          const t = templates.find((t) => t.id === input.template);
          input.design.primary = t.color;
          input.design.appearance = t.id === "afterhours" ? "dark" : "light";
          input.design.font = t.id === "folio" ? "serif" : "sans";
          draw();
        }),
    );
  }
  if (step === 2) {
    el.innerHTML = `<h2>Give it your signature.</h2><div class="split"><form id="design" class="panel"><div class="field-row"><label class="field">Primary color<input name="primary" type="color" value="${input.design.primary}"></label><label class="field">Secondary color<input name="secondary" type="color" value="${input.design.secondary}"></label></div>${select("Typography", "font", ["sans", "serif", "mono"], input.design.font)}${select("Appearance", "appearance", ["light", "dark"], input.design.appearance)}${select("Layout", "layout", ["stacked", "split"], input.design.layout)}${select("Navigation", "navigation", ["full", "compact"], input.design.navigation)}${select("Motion", "animation", ["none", "subtle", "expressive"], input.design.animation)}${select("Hero alignment", "heroAlignment", ["left", "center", "right"], input.design.heroAlignment)}${select("Page spacing", "density", ["airy", "balanced", "compact"], input.design.density)}${select("Corner style", "corners", ["sharp", "soft", "round"], input.design.corners)}<p class="field">Website sections</p><div class="checks">${sections.map((s) => `<label><input type="checkbox" name="sections" value="${s}" ${input.design.sections.includes(s) ? "checked" : ""}> ${s}</label>`).join("")}</div>${field("Anything else in mind?", "preferences", input.preferences, "textarea")}</form><div class="preview-shell"><div class="preview-top"><span>SAMPLE CONFIGURATION</span><div><button id="wide" aria-label="Desktop preview">DESKTOP</button><button id="narrow" aria-label="Mobile preview">MOBILE</button></div></div><iframe title="Fictional template configuration preview" sandbox=""></iframe><p class="muted">This is sample content. Your personalized site is reviewed privately before delivery.</p></div></div>`;
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
    el.innerHTML = `<h2>The story only you can tell.</h2><p class="muted">${esc(copy.hint)} Use information you want visitors to see. Leave home addresses and private phone numbers out. Your résumé can suggest editable text after sign-in. Nothing from it is published until you explicitly apply changes and the studio owner approves the website.</p><form id="content" class="panel"><div class="field-row">${field(copy.name+" *", "name", input.content.name)}${field(copy.headline+" *", "headline", input.content.headline)}</div>${field(copy.bio, "bio", input.content.bio, "textarea")}${field("Hero label (optional)", "heroLabel", input.content.heroLabel || "")}${field("Main button text", "ctaLabel", input.content.ctaLabel || "Explore my work")}${field(copy.projects+" (freeform)", "projects", input.content.projects, "textarea")}<div class="notice"><h3>Feature your work beautifully</h3><p>Optional structured cards: one per line, in the form <strong>Title | Description | https://link.example</strong>. Leave empty to use your freeform projects instead.</p>${field(copy.cards, "cardsText", (input.content.cards || []).map(x=>[x.title,x.description,x.url].join(" | ")).join("\n"), "textarea")}${field(copy.services+" (one per line)", "servicesText", (input.content.services || []).map(x=>[x.title,x.description,x.url].join(" | ")).join("\n"), "textarea")}${field("Testimonials (only genuine quotes)", "testimonialsText", (input.content.testimonials || []).map(x=>[x.quote,x.attribution].join(" | ")).join("\n"), "textarea")}</div><div class="field-row">${field("Education", "education", input.content.education, "textarea")}${field(copy.experience, "experience", input.content.experience, "textarea")}</div>${field(copy.skills, "skills", input.content.skills)}${field("Public contact email (optional)", "publicEmail", input.content.publicEmail)}${field("HTTPS profile links (one per line)", "links", input.content.links.join("\n"), "textarea")}<label class="field">${esc(copy.media)} (up to 12 files, 4 MB each)<input id="files" type="file" multiple accept=".pdf,.docx,.jpg,.jpeg,.png,.webp"></label><p class="muted">Selected photos will be included in your website after review. Only choose images you have permission to publish. PDF and DOCX documents remain private.</p><ul class="file-list" id="file-list"></ul><button type="button" class="btn secondary small" id="clear-files">Clear selected files</button><div class="notice"><h3>Import details from your résumé</h3><p>Choose a PDF or DOCX above, then preview suggestions. We do not automatically publish them, infer qualifications, or save the extraction result.</p><button type="button" class="btn secondary small" id="resume-analyze">Preview résumé suggestions ↗</button><p id="resume-feedback" role="status" class="feedback"></p><div id="resume-review"></div><div id="resume-auth"></div></div></form>`;
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
          '<button type="button" class="btn acid small" id="apply-resume">Apply selected suggestions ↗</button>';
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
      input.content.cards = structured(f.cardsText, ["title","description","url"],12);
      input.content.services = structured(f.servicesText, ["title","description","url"],12);
      input.content.testimonials = structured(f.testimonialsText, ["quote","attribution"],8);
    };
  }
  if (step === 4) {
    const packages = catalog.packages.filter((p) => p.enabled);
    const p = packages.find((p) => p.id === packageId) || packages[0];
    if (p) packageId = p.id;
    el.innerHTML = `<h2>One last look. Then your next chapter.</h2><div class="summary"><div class="panel"><dl><dt>Your website</dt><dd>${esc(input.type)}</dd><dt>Design direction</dt><dd>${esc(templates.find((t) => t.id === input.template)?.name)} · ${esc(input.design.font)} · ${esc(input.design.appearance)}<br>${esc(input.design.primary)} / ${esc(input.design.secondary)}</dd><dt>Public name & headline</dt><dd>${esc(input.content.name)}<br>${esc(input.content.headline)}</dd><dt>Sections</dt><dd>${input.design.sections.map(esc).join(", ")}</dd><dt>Materials</dt><dd>${files.length ? files.map((f) => esc(f.name)).join("<br>") : "No files selected"}</dd></dl><p class="muted">Use Back to change any details before checkout.</p></div><div class="panel"><label class="field">Your package<select id="package">${packages.length ? packages.map((p) => `<option value="${p.id}" ${p.id === packageId ? "selected" : ""}>${esc(p.name)} — ${money(p)}</option>`).join("") : "<option>Packages opening soon</option>"}</select></label><h3>${p ? money(p) : "Pricing to be announced"}</h3>${p ? `<p>Website purchase: ${money(p)}<br>Total: ${money(p)}</p><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul><h4>Hosting</h4><p class="terms">${esc(p.hosting)}</p><h4>Ownership</h4><p class="terms">${esc(p.ownership)}</p><h4>Revisions</h4><p class="terms">${esc(p.revisions)}</p>` : "<p>The studio is preparing package pricing and terms. Checkout will open once those details are ready.</p>"}<label><input type="checkbox" id="consent"> I have reviewed the package terms, <a href="/privacy.html" target="_blank">privacy information</a>, and have permission to use these materials.</label></div></div><div class="notice">${catalog.ordersEnabled ? "Test checkout only. No live payments are enabled." : "Explore freely. Orders and payments are not open yet."} Every website is personally reviewed before publication.</div><div class="panel"><h3>Save this design for later</h3><p class="muted">Save your website concept privately without paying. You can return to edit it, and the studio can review your submitted direction. Saving is not a paid order or a publication request. Selected photo and document files remain on your device until they are uploaded during an order.</p><button type="button" class="btn secondary" id="save-draft">Save my design ↗</button><p id="save-status" role="status" aria-live="polite"></p></div><div id="sign-in"></div>`;
    $("#package").onchange = (e) => {
      packageId = e.target.value;
      draw();
    };
    $("#next").disabled = !catalog.ordersEnabled || !p;
    $("#save-draft").onclick = saveDraft;
  }
  $("#back").onclick = () => {
    step--;
    draw();
    app.scrollIntoView({ block: "start", behavior: "instant" });
  };
  $("#next").onclick = async () => {
    try {
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
    const p = catalog.packages.find((p) => p.id === packageId);
    if (!orderId) {
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
    btn.textContent = "Opening secure test checkout…";
    const r = await api(`orders/${orderId}/checkout`, { input });
    const url = new URL(r.url);
    if (url.hostname !== "checkout.stripe.com" || url.protocol !== "https:")
      throw Error("Unexpected checkout destination.");
    location.assign(url.href);
  } finally {
    btn.disabled = false;
    btn.textContent = "Continue to test checkout ↗";
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
      link.textContent="Go to your projects ↗";
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
