import { $, api, money, report } from "./common.mjs";
import { downloadAuthorizedFile } from "./downloads.mjs";
import { aweClient } from "./service-client.mjs";
import { esc, templates, sections } from "/shared/model.mjs";
import { enhanceEditor } from "./studio-editor.mjs";
const app = $("#app");
let selected = null,
  overview = null,
  inquiries = [],
  checkoutReadiness = null;
const field = (label, name, value = "", area = false) =>
  `<label class="field">${label}${area ? `<textarea name="${name}">${esc(value)}</textarea>` : `<input name="${name}" value="${esc(value)}">`}</label>`;
const select = (label, name, values, current) =>
  `<label class="field">${label}<select name="${name}">${values.map((v) => `<option ${v === current ? "selected" : ""}>${v}</option>`).join("")}</select></label>`;
// This admin entrypoint only requests OTP for the owner's business mailbox.
// Actual privileges are checked by the server against a pinned Supabase Auth
// identity AND the restricted awe_owner authorization table.
const OWNER_EMAIL = "contact@aweconcepts.com";
function ownerSignIn() {
  app.innerHTML = `<section class="panel" aria-labelledby="owner-login-heading">
    <p class="eyebrow">AWE CONCEPTS / PRIVATE STUDIO</p>
    <h2 id="owner-login-heading">Owner sign-in</h2>
    <p class="muted">Access to the studio is restricted to its verified owner.</p>
    <form id="owner-login-form">
      <p class="muted">Verification codes are sent only to <strong>${OWNER_EMAIL}</strong>.</p>
      <label class="field" id="owner-code-field" hidden>Verification code
        <input name="token" autocomplete="one-time-code" inputmode="numeric"
          pattern="[0-9]{6,10}" minlength="6" maxlength="10" disabled required></label>
      <button type="submit" class="btn acid" id="owner-login-submit">Send owner sign-in code ↗︎</button>
    </form>
    <p id="owner-login-feedback" role="status" aria-live="polite"></p>
    <p class="muted"><a href="/account.html">Customer account ↗︎</a></p>
  </section>`;
  const form = $("#owner-login-form");
  const feedback = $("#owner-login-feedback");
  const button = $("#owner-login-submit");
  let requested = false;
  form.onsubmit = async (event) => {
    event.preventDefault();
    button.disabled = true;
    try {
      if (!requested) {
        await api("auth/start", { email: OWNER_EMAIL });
        requested = true;
        $("#owner-code-field").hidden = false;
        form.elements.token.disabled = false;
        form.elements.token.focus();
        button.textContent = "Verify owner code ↗︎";
        feedback.textContent = "Check the business mailbox for your one-time code.";
      } else {
        await api("auth/verify", { email: OWNER_EMAIL, token: form.elements.token.value.trim() });
        form.elements.token.value = "";
        await load();
      }
    } catch (error) {
      feedback.textContent = String(error?.message || "Sign-in failed. Try again.");
    } finally {
      button.disabled = false;
    }
  };
}
function ownerDenied() {
  app.innerHTML = `<div class="panel" role="alert"><h2>Private studio</h2>
    <p>Only the verified Awe Concepts owner can open this dashboard.</p>
    <button class="btn secondary" id="owner-switch">Switch to owner sign-in</button>
    <a class="btn secondary" href="/account.html">Customer account ↗︎</a></div>`;
  $("#owner-switch").onclick = async () => {
    await api("auth/logout", {});
    ownerSignIn();
  };
}
async function load() {
  if (!aweClient.session()) {
    ownerSignIn();
    return;
  }
  try {
    const me = await api("me");
    if (!me.admin || me.email?.toLowerCase() !== OWNER_EMAIL) {
      ownerDenied();
      return;
    }
    const [ordersView, leadList, readiness] = await Promise.all([
      api("admin/overview"),
      api("admin/inquiries"),
      api("admin/checkout-readiness")
    ]);
    overview = ordersView;
    inquiries = Array.isArray(leadList) ? leadList : [];
    checkoutReadiness = readiness;
    drawOverview();
  } catch (error) {
    if (error?.status === 401 || !aweClient.session()) {
      ownerSignIn();
    } else if (error?.status === 403) {
      ownerDenied();
    } else {
      // Keep the authenticated session when the backend is temporarily down.
      app.innerHTML = `<div class="panel" role="alert"><h2>The studio could not load</h2>
        <p>You're still signed in. Your dashboard data is unavailable right now.</p>
        <p id="studio-error" role="status"></p>
        <button class="btn secondary" id="studio-retry">Retry loading</button>
        <button class="btn secondary" id="studio-signout">Sign out</button></div>`;
      $("#studio-error").textContent = String(error?.message || "Studio service unavailable.");
      $("#studio-retry").onclick = load;
      $("#studio-signout").onclick = async () => {
        await api("auth/logout", {});
        ownerSignIn();
      };
    }
  }
}
function drawOverview() {
  const { orders, packages, briefs, jobs } = overview;
  const count = (s) => orders.filter((o) => s.includes(o.status)).length;
  const customers = new Set(orders.map((o) => o.user_id)).size;
  const revenues = {};
  orders
    .filter((o) => o.payment === "paid")
    .forEach((o) => {
      const p = o.package_snapshot;
      revenues[p.currency] = (revenues[p.currency] || 0) + p.amount;
    });
  app.innerHTML = `<div class="toolbar"><button class="btn secondary small" id="refresh">Refresh dashboard</button><button class="btn small" id="jobs">Run queued jobs</button><button class="btn secondary small" id="logout">Sign out</button></div><p class="muted">Showing the latest ${orders.length} orders (maximum 500). Amounts are gross verified purchases, excluding refunded orders and processor fees.</p><div class="stats">${[
    ["Orders", orders.length],
    ["New inquiries", inquiries.filter((q) => q.status === "new").length],
    ["Customers", customers],
    ["Awaiting payment", orders.filter((o) => o.payment === "unpaid").length],
    ["Confirmed purchases", orders.filter((o) => o.payment === "paid").length],
    ["In preparation", count(["generating", "payment_verified"])],
    ["Awaiting review", count(["awaiting_review"])],
    ["Revisions", count(["revisions_required"])],
    ["Published / delivered", orders.filter((o) => o.public_version).length],
    ["Delivered", count(["delivered"])],
    ["Failed jobs", jobs.filter((j) => j.error).length],
  ]
    .map(
      ([label, value]) =>
        `<div class="stat"><small>${label}</small><strong>${value}</strong></div>`,
    )
    .join("")}${Object.entries(revenues)
    .map(
      ([currency, amount]) =>
        `<div class="stat"><small>Gross ${currency.toUpperCase()}</small><strong>${money({ currency, amount })}</strong></div>`,
    )
    .join(
      "",
    )}</div><h2>Production queue</h2><label class="field">Filter orders<input id="search" placeholder="Name, email, status, or reference"></label><div class="table-scroll"><table><thead><tr><th>Customer</th><th>Website</th><th>Payment</th><th>Production</th><th></th></tr></thead><tbody id="orders"></tbody></table></div><h2 class="section-divider">Stripe checkout readiness</h2><p class="muted">Configuration overview only. Live checkout requires production credentials, finalized package terms, and verified webhook delivery.</p><div class="panel" id="checkout-readiness" aria-label="Stripe test readiness"><p>Stripe test API key: <strong>${checkoutReadiness?.serverTestKeyPresent ? "Configured" : "Not configured"}</strong></p><p>Webhook signing secret: <strong>${checkoutReadiness?.webhookSigningSecretPresent ? "Configured" : "Not configured"}</strong></p><p>Live API key: <strong>${checkoutReadiness?.liveSecretKeyPresent ? "Configured" : "Missing"}</strong></p><p>Live webhook secret: <strong>${checkoutReadiness?.liveWebhookSigningSecretPresent ? "Configured" : "Missing"}</strong></p><p>Live ordering: <strong>${checkoutReadiness?.livePaymentsAllowed ? "Configured (verify Stripe delivery)" : "Closed"}</strong></p><p>Valid enabled packages: <strong>${Number(checkoutReadiness?.enabledPackages || 0)}</strong></p><p>Verified payment records: <strong>${checkoutReadiness?.recordedPaymentExists ? "Present" : "None yet"}</strong></p><p>External webhook delivery: <strong>Not yet independently verified</strong></p><p class="muted">Only the studio owner can see these flags. Credentials and signing secrets are never included in the response.</p></div><h2 class="section-divider">New project inquiries</h2><p class="muted">These messages are private to the studio owner. Reply using your business email and update their status here.</p><div id="studio-inquiries">${inquiries.length ? inquiries.map((q) => `<article class="panel"><div class="toolbar"><strong>${esc(q.name)}</strong><span>${new Date(q.created_at).toLocaleString()}</span></div><p><strong>Email:</strong> ${esc(q.email)}<br><strong>Project:</strong> ${esc(q.project)}</p><p class="terms">${esc(q.message)}</p><label class="field">Follow-up status<select data-inquiry="${esc(q.id)}"><option value="new" ${q.status==="new"?"selected":""}>New</option><option value="contacted" ${q.status==="contacted"?"selected":""}>Contacted</option><option value="archived" ${q.status==="archived"?"selected":""}>Archived</option></select></label></article>`).join("") : '<p class="panel">No customer inquiries have been received yet.</p>'}</div><h2 class="section-divider">Packages & availability</h2><p class="muted">Existing orders keep their original package terms and price. New terms apply only to future orders.</p><button id="new-package" class="btn secondary small">Add package</button><div id="packages"></div><h2 class="section-divider">Template library</h2><div class="checks">${overview.templates.map((t) => `<label><input type="checkbox" data-template="${t.id}" ${t.enabled ? "checked" : ""}> ${esc(t.label)}</label>`).join("")}</div><h2 class="section-divider">Custom project briefs</h2>${briefs.map((b) => `<details class="panel"><summary>${esc(b.email)} · ${new Date(b.created_at).toLocaleDateString()}</summary><p class="terms">${esc(b.content.idea)}</p><p>Budget: ${esc(b.content.budget)}<br>Timing: ${esc(b.content.timing)}</p></details>`).join("") || "<p>No briefs yet.</p>"}<h2 class="section-divider">Job recovery</h2>${jobs.map((j) => `<div class="panel"><p>${esc(j.kind)} / ${esc(j.order_id)} · attempt ${j.attempts}/5</p><p>${esc(j.error || "Queued")}</p><button class="btn secondary small" data-retry="${j.id}">Retry job</button></div>`).join("") || "<p>No pending jobs.</p>"}`;
  function table(q = "") {
    $("#orders").innerHTML = orders
      .filter((o) =>
        `${o.email} ${o.input.content.name} ${o.status} ${o.id}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      )
      .map(
        (o) =>
          `<tr><td>${esc(o.input.content.name)}<br><small>${esc(o.email)}</small></td><td>${esc(o.input.template)}</td><td>${esc(o.payment)}</td><td>${esc(o.status.replaceAll("_", " "))}</td><td><button class="btn secondary small" data-order="${o.id}">Review ↗︎</button></td></tr>`,
      )
      .join("");
    $("#orders")
      .querySelectorAll("[data-order]")
      .forEach((b) => (b.onclick = () => openOrder(b.dataset.order)));
  }
  table();
  $("#search").oninput = (e) => table(e.target.value);
  $("#refresh").onclick = () => load();
  $("#jobs").onclick = async (e) => {
    e.target.disabled = true;
    try {
      await api("admin/run-jobs", {});
      await load();
    } catch (e) {
      report(e);
    }
  };
  $("#logout").onclick = async () => {
    await api("auth/logout", {});
    load();
  };
  app.querySelectorAll("[data-retry]").forEach(
    (b) =>
      (b.onclick = async () => {
        try {
          await api("admin/retry", { id: Number(b.dataset.retry) });
          await load();
        } catch (e) {
          report(e);
        }
      }),
  );
  app.querySelectorAll("[data-template]").forEach(
    (b) =>
      (b.onchange = async () => {
        try {
          await api("admin/templates", {
            id: b.dataset.template,
            enabled: b.checked,
          });
        } catch (e) {
          report(e);
          b.checked = !b.checked;
        }
      }),
  );
  $("#new-package").onclick = () => {
    overview.packages.push({
      id: "package-" + Date.now(),
      data: {
        name: "New package",
        enabled: false,
        amount: null,
        currency: "usd",
        features: [],
        hosting: "",
        ownership: "",
        revisions: "",
      },
    });
    drawOverview();
  };
  $("#packages").innerHTML = packages
    .map((p) => {
      const d = p.data;
      return `<details class="panel"><summary>${esc(d.name)} · ${d.enabled ? "Available" : "Disabled"} · ${money(d)}</summary><form data-package="${p.id}">${field("Package name", "name", d.name)}<div class="field-row">${field("Price in minor units (e.g. cents)", "amount", d.amount || "")}${field("Currency (e.g. usd)", "currency", d.currency)}</div>${field("Included features (one per line)", "features", (d.features || []).join("\n"), true)}${field("Hosting terms, duration & domain costs", "hosting", d.hosting, true)}${field("Ownership & transfer terms", "ownership", d.ownership, true)}${field("Revision policy", "revisions", d.revisions, true)}<label><input type="checkbox" name="filesIncluded" ${d.filesIncluded ? "checked" : ""}> Include downloadable website files after approval</label><br><label><input type="checkbox" name="enabled" ${d.enabled ? "checked" : ""}> Make package available</label><div class="toolbar"><button class="btn">Save package</button></div></form></details>`;
    })
    .join("");
  app.querySelectorAll("[data-inquiry]").forEach((control) => {
    control.onchange = async () => {
      control.disabled = true;
      try {
        await api(`admin/inquiries/${control.dataset.inquiry}`, {status:control.value});
        await load();
      } catch (error) {
        report(error);
        control.disabled = false;
      }
    };
  });
  app.querySelectorAll("[data-package]").forEach(
    (f) =>
      (f.onsubmit = async (e) => {
        e.preventDefault();
        try {
          const b = Object.fromEntries(new FormData(f));
          await api("admin/packages", {
            ...b,
            id: f.dataset.package,
            amount: Number(b.amount),
            features: b.features.split("\n").filter(Boolean),
            enabled: b.enabled === "on",
            filesIncluded: b.filesIncluded === "on",
          });
          await load();
        } catch (e) {
          report(e);
        }
      }),
  );
}
async function openOrder(orderId) {
  try {
    selected = await api(`admin/orders/${orderId}`);
    drawOrder();
  } catch (e) {
    report(e);
  }
}
function drawOrder() {
  const {
    order: o,
    assets,
    versions,
    events,
    revisions,
    deliveries,
  } = selected;
  const c = o.input.content,
    d = o.input.design;
  app.innerHTML = `<div class="toolbar"><button id="back" class="btn secondary small">←︎ All orders</button><span class="availability">${esc(o.status.replaceAll("_", " "))}</span></div><h2>${esc(c.name)} / ${esc(o.input.template)}</h2><p class="muted">${esc(o.email)} · ${esc(o.id)} · payment ${esc(o.payment)}</p><div class="split"><form id="editor" class="panel"><h3>Content & creative direction</h3>${field("Public name", "name", c.name)}${field("Headline", "headline", c.headline)}${["bio", "projects", "education", "experience", "skills"].map((k) => field(k[0].toUpperCase() + k.slice(1), k, c[k], true)).join("")}${field("Public email", "publicEmail", c.publicEmail)}${field("Profile links (one per line)", "links", c.links.join("\n"), true)}${select(
    "Template",
    "template",
    templates.map((t) => t.id),
    o.input.template,
  )}<div class="field-row"><label class="field">Primary color<input name="primary" type="color" value="${d.primary}"></label><label class="field">Secondary color<input name="secondary" type="color" value="${d.secondary}"></label></div>${select("Font", "font", ["sans", "serif", "mono"], d.font)}${select("Appearance", "appearance", ["light", "dark"], d.appearance)}${select("Layout", "layout", ["stacked", "split"], d.layout)}${select("Navigation", "navigation", ["full", "compact"], d.navigation)}${select("Motion", "animation", ["none", "subtle", "expressive"], d.animation)}<h4>Sections</h4><div class="checks">${sections.map((s) => `<label><input type="checkbox" name="sections" value="${s}" ${d.sections.includes(s) ? "checked" : ""}> ${s}</label>`).join("")}</div><h4>Portfolio images</h4><p class="muted">Choose from customer-approved images. Uncheck an image to remove it from the next version.</p><div class="checks">${assets
    .filter((a) => a.public_allowed && a.mime.startsWith("image/"))
    .map(
      (a) =>
        `<label><input type="checkbox" name="photos" value="${a.id}" ${c.photoIds.includes(a.id) ? "checked" : ""}> ${esc(a.name)}</label>`,
    )
    .join(
      "",
    )}</div><button class="btn acid" ${o.payment !== "paid" ? "disabled" : ""}>Save & regenerate private draft ↗︎</button>${o.payment !== "paid" ? '<p class="muted">This is an unpaid saved concept. You can inspect it in the Visual Studio preview, but a verified purchase is required before regenerating or publishing a version.</p>' : ""}</form><div><div class="preview-shell"><div class="preview-top"><span>OWNER-ONLY DRAFT</span><div>${[
    ["Desktop", "100%"],
    ["Tablet", "768px"],
    ["Mobile", "320px"],
  ]
    .map(([n, w]) => `<button data-width="${w}">${n}</button>`)
    .join(
      "",
    )}</div></div>${o.draft_version ? `<iframe id="draft" title="Private website draft" sandbox="" referrerpolicy="no-referrer"></iframe>` : "<p>Your draft will appear after verified payment and generation.</p>"}</div><div class="panel"><h3>Review decision</h3><p>Review the saved draft at each size. Publishing makes this exact version and its selected images publicly accessible.</p><label class="field">Review notes<textarea id="note" maxlength="2000"></textarea></label><div class="toolbar"><button id="reject" class="btn secondary" ${!o.draft_version ? "disabled" : ""}>Request revisions</button><button id="publish" class="btn acid" ${!o.draft_version || o.payment !== "paid" ? "disabled" : ""}>Approve & Publish ↗︎</button></div>${o.public_version ? `<a href="/sites/${o.slug}" target="_blank" rel="noopener">Current live website ↗︎</a><p><button type="button" class="btn secondary small" data-approved-download="${esc(o.id)}">Download approved website files ↓︎</button></p>` : ""}<p class="muted">${esc(o.delivery_error || "")}</p></div><h3>Replace / add a photograph</h3><form id="replace-photo" class="panel"><label class="field">New image (4 MB maximum)<input type="file" name="file" accept=".jpg,.jpeg,.png,.webp" required></label><label><input name="rights" type="checkbox" required> I have permission to use this image publicly.</label><button class="btn secondary small">Upload to private materials</button><p class="muted">Select the new image in the editor and save a draft. Uploading alone does not change the live site.</p></form><h3>Customer materials</h3><ul>${assets.map((a) => `<li><button type="button" class="btn secondary small" data-asset-download="${esc(a.id)}">Download ${esc(a.name)} ↓︎</button> · ${a.public_allowed ? "approved for website" : "private document"}</li>`).join("")}</ul><h3>Revision requests</h3>${revisions.map((r) => `<p class="notice">${esc(r.message)}</p>`).join("") || "<p>No requests yet.</p>"}<h3>Version history</h3>${versions.map((v) => `<p>${new Date(v.created_at).toLocaleString()} <button class="btn small secondary" data-restore="${v.id}">Restore as private draft</button></p>`).join("")}<h3>Delivery records</h3>${deliveries.map((v) => `<p>${new Date(v.created_at).toLocaleString()} · Email accepted by provider</p>`).join("") || "<p>No delivery emails accepted yet.</p>"}<h3>Audit trail</h3><div class="audit">${events.map((e) => `<p>${esc(e.created_at)} / ${esc(e.kind)} / ${esc(JSON.stringify(e.details))}</p>`).join("")}</div></div></div><dialog class="modal" id="confirm"><h2>Ready for the world?</h2><p>Publish the saved draft for <strong>${esc(c.name)}</strong>? This replaces the public version and queues a delivery email.</p><p>Unsaved editor changes are not included.</p><div class="toolbar"><button class="btn secondary" id="cancel">Keep private</button><button class="btn acid" id="confirm-publish">Publish approved version</button></div></dialog>`;
  // The Supabase Edge API delivers a private preview as authenticated JSON.
  // Do not navigate an iframe to an API URL: cross-origin bearer tokens cannot
  // be attached to iframe navigation, and that would bypass our API client.
  // srcdoc is intentionally sandboxed WITHOUT allow-same-origin or allow-scripts.
  if (o.draft_version) {
    const frame = $("#draft");
    api(`admin/orders/${o.id}/preview`).then(({ html }) => {
      if (typeof html !== "string" || html.length > 250000 || !/^<!doctype html>/i.test(html.trimStart()))
        throw Error("The private preview could not be validated.");
      if (frame?.isConnected && selected?.order?.id === o.id)
        frame.srcdoc = html;
    }).catch((error) => {
      if (frame?.isConnected) {
        const notice = document.createElement("p");
        notice.setAttribute("role", "status");
        notice.textContent = "Private preview unavailable: " + (error.message || "Please try again.");
        frame.replaceWith(notice);
      }
    });
  }
  app.querySelectorAll("[data-approved-download]").forEach((button) => {
    button.onclick = () => downloadAuthorizedFile(
      `admin/orders/${button.dataset.approvedDownload}/export`, button);
  });
  app.querySelectorAll("[data-asset-download]").forEach((button) => {
    button.onclick = () => downloadAuthorizedFile(
      `assets/${button.dataset.assetDownload}`, button);
  });
  const studio = enhanceEditor($("#editor"), o.input);
  $("#replace-photo").onsubmit = async (e) => {
    e.preventDefault();
    const btn = $("button", e.target);
    btn.disabled = true;
    try {
      const fd = new FormData(e.target);
      fd.set("rights", "true");
      await api(`admin/orders/${o.id}/upload`, fd);
      await openOrder(o.id);
    } catch (e) {
      report(e);
    } finally {
      btn.disabled = false;
    }
  };
  $("#back").onclick = load;
  app.querySelectorAll("[data-width]").forEach(
    (b) =>
      (b.onclick = () => {
        if ($("#draft")) $("#draft").style.width = b.dataset.width;
         if ($("#studio-live-frame")) $("#studio-live-frame").style.width = b.dataset.width;
      }),
  );
  $("#editor").onsubmit = async (e) => {
    e.preventDefault();
    const btn = $("button", e.target);
    btn.disabled = true;
    try {
      const f = new FormData(e.target),
        b = Object.fromEntries(f);
      const input = {
        ...o.input,
        template: b.template,
        content: {
          ...c,
          ...Object.fromEntries(
            [
              "name",
              "headline",
              "bio",
              "projects",
              "education",
              "experience",
              "skills",
              "publicEmail",
            ].map((k) => [k, b[k]]),
          ),
          links: b.links.split("\n").filter(Boolean),
          photoIds: f.getAll("photos"),
        },
        design: {
          ...Object.fromEntries(
            [
              "primary",
              "secondary",
              "font",
              "appearance",
              "layout",
              "navigation",
              "animation",
            ].map((k) => [k, b[k]]),
          ),
          sections: f.getAll("sections"),
        },
      };
      await api(`admin/orders/${o.id}/save`, { version: o.version, input: studio.merge(input) });
      await openOrder(o.id);
    } catch (e) {
      report(e);
    } finally {
      btn.disabled = false;
    }
  };
  $("#reject").onclick = async () => {
    try {
      await api(`admin/orders/${o.id}/reject`, {
        version: o.version,
        note: $("#note").value,
      });
      await openOrder(o.id);
    } catch (e) {
      report(e);
    }
  };
  $("#publish").onclick = () => $("#confirm").showModal();
  $("#cancel").onclick = () => $("#confirm").close();
  $("#confirm-publish").onclick = async (e) => {
    e.target.disabled = true;
    try {
      await api(`admin/orders/${o.id}/publish`, {
        version: o.version,
        confirm: o.id,
      });
      await openOrder(o.id);
    } catch (e) {
      report(e);
      $("#confirm").close();
    }
  };
  app.querySelectorAll("[data-restore]").forEach(
    (b) =>
      (b.onclick = async () => {
        try {
          await api(`admin/orders/${o.id}/restore`, {
            version: o.version,
            versionId: b.dataset.restore,
          });
          await openOrder(o.id);
        } catch (e) {
          report(e);
        }
      }),
  );
}
load();
