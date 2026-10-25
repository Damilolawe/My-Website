import { $, api, report, authForm, money } from "./common.mjs";
import { aweClient } from "./service-client.mjs";
import { privatePreview } from "./private-preview.mjs";
import { downloadAuthorizedFile } from "./downloads.mjs";
import { esc } from "/shared/model.mjs";
const app = $("#app");
let previews = [];
async function load() {
  try {
    previews.forEach(p => p.dispose()); previews = [];
    const me = await api("me");
    const orders = await api("orders");
    app.innerHTML = `<div class="toolbar"><p>Signed in as ${esc(me.email)}</p><button id="logout" class="btn secondary small">Sign out</button>${me.admin ? '<a class="btn small" href="/admin.html">Open studio dashboard ↗︎</a>' : ""}</div><h2>Your projects</h2>${orders.length ? orders.map((o) => `<article class="panel"><p class="eyebrow">ORDER ${esc(o.id)}</p><h3>${esc(o.package.name)} · ${esc(o.package?.name === "Draft project" ? "Saved for review" : o.status)}</h3><p>Payment: ${esc(o.payment)} · ${money(o.package)}</p>${o.package?.name === "Draft project" ? `<a href="/order.html?draft=${encodeURIComponent(o.id)}" class="btn secondary">Resume & edit saved design ↗︎</a>` : ""}${o.preview_ready ? `<details class="panel"><summary>Review your private website draft</summary><p>This draft is private. Use the page buttons to review every page before requesting changes.</p><div class="toolbar">${o.preview_pages.map(page=>`<button type="button" class="btn secondary small" data-customer-preview="${esc(o.id)}" data-page="${esc(page)}">${esc(page.replace(".html",""))}</button>`).join("")}</div><p data-preview-status="${esc(o.id)}" role="status"></p><iframe title="Your private website draft" data-preview-frame="${esc(o.id)}" sandbox="" referrerpolicy="no-referrer" style="width:100%;height:700px;border:0;background:#fff"></iframe></details>` : ""}${o.public_url ? `<a href="${o.public_url}" class="btn" target="_blank" rel="noopener">Visit your website ↗︎</a>${o.package.filesIncluded ? `<button type="button" class="btn secondary" data-download-order="${esc(o.id)}">Download website files ↓︎</button><details><summary>Publish these files on your own hosting</summary><ol><li>Download and unzip your approved website files. Keep a backup of the complete folder.</li><li>Create and manage a hosting account in your own name with a service that supports static HTML websites.</li><li>Upload the complete folder contents, including index.html and all page and asset folders. Keep their names and structure intact.</li><li>Open the host’s preview link and check every page, image, contact link and mobile layout.</li><li>Connect your domain using the exact DNS instructions from your hosting provider. Domain and hosting purchases and renewals remain your responsibility.</li></ol><p>This download transfers the approved static website files. It does not transfer an Awe Concepts account or backend. Contact contact@aweconcepts.com if any approved files are missing.</p></details>` : ""}` : ""}${o.preview_ready ? `<form data-revision="${o.id}"><label class="field">Request a change<textarea name="message" required minlength="5" maxlength="4000" placeholder="Tell the studio what you’d like to adjust."></textarea></label><p class="muted">Included revisions: ${esc(o.package.revisions)}</p><button class="btn secondary">Send revision request ↗︎</button><p role="status"></p></form>` : `<p class="muted">${o.payment === "unpaid" ? "Payment has not been confirmed. A checkout return page is not a payment receipt." : "Your website is being prepared and reviewed. Your live link will appear here when it’s ready."}</p>`}</article>`).join("") : '<div class="panel"><h3>A blank page. A big possibility.</h3><p>Your projects will appear here.</p><a class="btn acid" href="/order.html">Explore AWE Express ↗︎</a></div>'}<section class="section-divider"><p class="eyebrow">Awe Concepts Custom</p><h2>Something beyond the usual?</h2><p>Bespoke design, advanced interactions, or a bigger build. Let’s talk about it.</p><form id="custom" class="panel"><label class="field">Your idea<textarea name="idea" maxlength="5000" required></textarea></label><div class="field-row"><label class="field">Budget (optional)<input name="budget" maxlength="300"></label><label class="field">Ideal timing (optional)<input name="timing" maxlength="300"></label></div><button class="btn">Send project brief ↗︎</button><p id="brief-result" role="status"></p></form></section>`;
    $("#logout").onclick = async () => {
      await api("auth/logout", {});
      await load();
    };
    const sessions = new Map();
    app.querySelectorAll("[data-customer-preview]").forEach(button => {
      button.onclick = async () => {
        const id = button.dataset.customerPreview;
        const frame = app.querySelector(`[data-preview-frame="${id}"]`);
        const status = app.querySelector(`[data-preview-status="${id}"]`);
        if (!sessions.has(id)) { const session = privatePreview(frame); sessions.set(id, session); previews.push(session); }
        button.disabled = true; status.textContent = 'Loading private draft…';
        try { await sessions.get(id).load(`orders/${id}/preview?page=${encodeURIComponent(button.dataset.page)}`); status.textContent = 'Private draft loaded.'; }
        catch(error) { status.textContent = 'Preview unavailable: ' + (error.message || 'Please try again.'); }
        finally { button.disabled = false; }
      };
    });
    app.querySelectorAll("[data-download-order]").forEach((button) => {
      button.onclick = () => downloadAuthorizedFile(
        `orders/${button.dataset.downloadOrder}/export`, button);
    });
    app.querySelectorAll("[data-revision]").forEach(
      (f) =>
        (f.onsubmit = async (e) => {
          e.preventDefault();
          const btn = $("button", f);
          btn.disabled = true;
          try {
            await api(
              `orders/${f.dataset.revision}/revision`,
              Object.fromEntries(new FormData(f)),
            );
            $("p[role=status]", f).textContent =
              "Your request has been sent to the studio. It does not automatically change or publish your website.";
            f.reset();
          } catch (e) {
            report(e);
          } finally {
            btn.disabled = false;
          }
        }),
    );
    $("#custom").onsubmit = async (e) => {
      e.preventDefault();
      const btn = $("button", e.currentTarget);
      btn.disabled = true;
      try {
        await api("briefs", Object.fromEntries(new FormData(e.currentTarget)));
        $("#brief-result").textContent =
          "Your brief has been saved for the studio to review.";
        e.target.reset();
      } catch (e) {
        report(e);
      } finally {
        btn.disabled = false;
      }
    };
  } catch (error) {
    if (error?.status === 401 || !aweClient.session()) {
      authForm(app, load);
      return;
    }
    // A backend failure must not restart an already successful email login.
    app.innerHTML = '<section class="panel" role="alert"><h2>Your email is verified.</h2>' +
      '<p>Your account is still signed in, but the studio service could not load.</p>' +
      '<p id="account-error"></p><div class="toolbar">' +
      '<button class="btn" id="account-retry">Retry loading</button>' +
      '<button class="btn secondary" id="account-signout">Sign out</button></div></section>';
    $("#account-error").textContent = String(error?.message || "Account service unavailable.");
    $("#account-retry").onclick = load;
    $("#account-signout").onclick = async () => {
      await api("auth/logout", {});
      authForm(app, load);
    };
  }
}
load();
