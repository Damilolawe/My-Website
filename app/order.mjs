import {
  templates,
  types,
  sample,
  normalize,
  validate,
  esc,
  sections,
} from "/shared/model.mjs";
import { renderSite } from "/shared/render.mjs";
import { $, api, money, report, authForm } from "./common.mjs";
const labels = [
  "Your purpose",
  "Your starting point",
  "Your style",
  "Your story",
  "Review & checkout",
];
let step = 0,
  input = normalize(sample),
  files = [],
  catalog = { templates, packages: [], ordersEnabled: false },
  packageId = "express",
  me = null,
  orderId = null,
  uploaded = [];
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
  app.innerHTML = `<div class="wizard"><ol class="steps">${labels.map((l, i) => `<li class="${i === step ? "active" : ""}" ${i === step ? 'aria-current="step"' : ""}>0${i + 1} / ${l}</li>`).join("")}</ol><div class="work-area"><span class="step-count">0${step + 1} / 05 — ${labels[step].toUpperCase()}</span><div id="step"></div><div class="actions"><button class="btn secondary" id="back" ${step === 0 || orderId ? "hidden" : ""}>← Back</button><button class="btn acid" id="next">${step === 4 ? "Continue to test checkout" : "Next step"} ↗</button></div></div></div>`;
  const el = $("#step");
  $("#feedback").textContent = "";
  if (step === 0) {
    el.innerHTML = `<h2>What’s your next move?</h2><p class="muted">A first impression, a fresh start, a new opportunity.</p><div class="choices">${types.map((t, i) => `<button class="choice-card" data-type="${esc(t)}" aria-pressed="${input.type === t}"><span class="arrow">↗</span><small>0${i + 1} / MADE FOR YOU</small><strong>${t}</strong></button>`).join("")}</div><p class="muted">Something more ambitious? <a href="/account.html?custom=1">Tell us about an AWE Custom project ↗</a></p>`;
    el.querySelectorAll("[data-type]").forEach(
      (b) =>
        (b.onclick = () => {
          input.type = b.dataset.type;
          draw();
        }),
    );
  }
  if (step === 1) {
    el.innerHTML = `<h2>Find your kind of different.</h2><p class="muted">Six original directions. Live demonstrations use fictional content.</p><div class="template-grid">${catalog.templates.map((t) => `<article class="template-card" aria-pressed="${input.template === t.id}"><div class="template-art ${t.id}" style="--tile:${t.color}"><span class="eyebrow">${t.style}</span><p class="title">${t.tag}</p></div><div class="template-meta"><button class="template-select" data-template="${t.id}" aria-pressed="${input.template === t.id}"><strong>${t.name} ${input.template === t.id ? "✓" : ""}</strong><small>Select this direction</small></button><a class="demo-link" href="/templates/${t.id}.html" target="_blank" rel="noopener">Explore ↗</a></div></article>`).join("")}</div>`;
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
        { ...sample, template: input.template, design: input.design },
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
    el.innerHTML = `<h2>The story only you can tell.</h2><p class="muted">Use information you want visitors to see. Leave home addresses and private phone numbers out. Your résumé can suggest editable text after sign-in. Nothing from it is published until you explicitly apply changes and the studio owner approves the website.</p><form id="content" class="panel"><div class="field-row">${field("Public name *", "name", input.content.name)}${field("Headline *", "headline", input.content.headline)}</div>${field("Your biography", "bio", input.content.bio, "textarea")}${field("Hero label (optional)", "heroLabel", input.content.heroLabel || "")}${field("Main button text", "ctaLabel", input.content.ctaLabel || "Explore my work")}${field("Selected projects (freeform)", "projects", input.content.projects, "textarea")}<div class="notice"><h3>Feature your work beautifully</h3><p>Optional structured cards: one per line, in the form <strong>Title | Description | https://link.example</strong>. Leave empty to use your freeform projects instead.</p>${field("Project cards", "cardsText", (input.content.cards || []).map(x=>[x.title,x.description,x.url].join(" | ")).join("\n"), "textarea")}${field("Services (one per line)", "servicesText", (input.content.services || []).map(x=>[x.title,x.description,x.url].join(" | ")).join("\n"), "textarea")}${field("Testimonials (only genuine quotes)", "testimonialsText", (input.content.testimonials || []).map(x=>[x.quote,x.attribution].join(" | ")).join("\n"), "textarea")}</div><div class="field-row">${field("Education", "education", input.content.education, "textarea")}${field("Experience", "experience", input.content.experience, "textarea")}</div>${field("Skills", "skills", input.content.skills)}${field("Public contact email (optional)", "publicEmail", input.content.publicEmail)}${field("HTTPS profile links (one per line)", "links", input.content.links.join("\n"), "textarea")}<label class="field">Résumé & photographs (up to 12 files, 4 MB each)<input id="files" type="file" multiple accept=".pdf,.docx,.jpg,.jpeg,.png,.webp"></label><p class="muted">Selected photos will be included in your website after review. Only choose images you have permission to publish. PDF and DOCX documents remain private.</p><ul class="file-list" id="file-list"></ul><button type="button" class="btn secondary small" id="clear-files">Clear selected files</button><div class="notice"><h3>Import details from your résumé</h3><p>Choose a PDF or DOCX above, then preview suggestions. We do not automatically publish them, infer qualifications, or save the extraction result.</p><button type="button" class="btn secondary small" id="resume-analyze">Preview résumé suggestions ↗</button><p id="resume-feedback" role="status" class="feedback"></p><div id="resume-review"></div><div id="resume-auth"></div></div></form>`;
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
    el.innerHTML = `<h2>One last look. Then your next chapter.</h2><div class="summary"><div class="panel"><dl><dt>Your website</dt><dd>${esc(input.type)}</dd><dt>Design direction</dt><dd>${esc(templates.find((t) => t.id === input.template)?.name)} · ${esc(input.design.font)} · ${esc(input.design.appearance)}<br>${esc(input.design.primary)} / ${esc(input.design.secondary)}</dd><dt>Public name & headline</dt><dd>${esc(input.content.name)}<br>${esc(input.content.headline)}</dd><dt>Sections</dt><dd>${input.design.sections.map(esc).join(", ")}</dd><dt>Materials</dt><dd>${files.length ? files.map((f) => esc(f.name)).join("<br>") : "No files selected"}</dd></dl><p class="muted">Use Back to change any details before checkout.</p></div><div class="panel"><label class="field">Your package<select id="package">${packages.length ? packages.map((p) => `<option value="${p.id}" ${p.id === packageId ? "selected" : ""}>${esc(p.name)} — ${money(p)}</option>`).join("") : "<option>Packages opening soon</option>"}</select></label><h3>${p ? money(p) : "Pricing to be announced"}</h3>${p ? `<p>Website purchase: ${money(p)}<br>Total: ${money(p)}</p><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul><h4>Hosting</h4><p class="terms">${esc(p.hosting)}</p><h4>Ownership</h4><p class="terms">${esc(p.ownership)}</p><h4>Revisions</h4><p class="terms">${esc(p.revisions)}</p>` : "<p>The studio is preparing package pricing and terms. Checkout will open once those details are ready.</p>"}<label><input type="checkbox" id="consent"> I have reviewed the package terms, <a href="/privacy.html" target="_blank">privacy information</a>, and have permission to use these materials.</label></div></div><div class="notice">${catalog.ordersEnabled ? "Test checkout only. No live payments are enabled." : "Explore freely. Orders and payments are not open yet."} Every website is personally reviewed before publication.</div><div id="sign-in"></div>`;
    $("#package").onchange = (e) => {
      packageId = e.target.value;
      draw();
    };
    $("#next").disabled = !catalog.ordersEnabled || !p;
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
draw();
