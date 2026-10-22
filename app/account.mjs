import { $, api, report, authForm, money } from "./common.mjs";
import { esc } from "/shared/model.mjs";
const app = $("#app");
async function load() {
  try {
    const me = await api("me");
    const orders = await api("orders");
    app.innerHTML = `<div class="toolbar"><p>Signed in as ${esc(me.email)}</p><button id="logout" class="btn secondary small">Sign out</button>${me.admin ? '<a class="btn small" href="/admin.html">Open studio dashboard ↗</a>' : ""}</div><h2>Your projects</h2>${orders.length ? orders.map((o) => `<article class="panel"><p class="eyebrow">ORDER ${esc(o.id)}</p><h3>${esc(o.package.name)} · ${esc(o.package?.name === "Draft project" ? "Saved for review" : o.status)}</h3><p>Payment: ${esc(o.payment)} · ${money(o.package)}</p>${o.package?.name === "Draft project" ? `<a href="/order.html?draft=${encodeURIComponent(o.id)}" class="btn secondary">Resume & edit saved design ↗</a>` : ""}${o.public_url ? `<a href="${o.public_url}" class="btn" target="_blank" rel="noopener">Visit your website ↗</a>${o.package.filesIncluded ? `<a href="/api/orders/${o.id}/export" class="btn secondary">Download website files ↓</a>` : ""}<form data-revision="${o.id}"><label class="field">Request a change<textarea name="message" required minlength="5" maxlength="4000" placeholder="Tell Dami what you’d like to adjust."></textarea></label><p class="muted">Included revisions: ${esc(o.package.revisions)}</p><button class="btn secondary">Send revision request ↗</button><p role="status"></p></form>` : `<p class="muted">${o.payment === "unpaid" ? "Payment has not been confirmed. A checkout return page is not a payment receipt." : "Your website is being prepared and reviewed. Your live link will appear here when it’s ready."}</p>`}</article>`).join("") : '<div class="panel"><h3>A blank page. A big possibility.</h3><p>Your projects will appear here.</p><a class="btn acid" href="/order.html">Explore AWE Express ↗</a></div>'}<section class="section-divider"><p class="eyebrow">Awe Concepts Custom</p><h2>Something beyond the usual?</h2><p>Bespoke design, advanced interactions, or a bigger build. Let’s talk about it.</p><form id="custom" class="panel"><label class="field">Your idea<textarea name="idea" maxlength="5000" required></textarea></label><div class="field-row"><label class="field">Budget (optional)<input name="budget" maxlength="300"></label><label class="field">Ideal timing (optional)<input name="timing" maxlength="300"></label></div><button class="btn">Send project brief ↗</button><p id="brief-result" role="status"></p></form></section>`;
    $("#logout").onclick = async () => {
      await api("auth/logout", {});
      await load();
    };
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
              "Your request has been sent to Dami. Your current website stays live.";
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
          "Your brief has been saved for Dami to review.";
        e.target.reset();
      } catch (e) {
        report(e);
      } finally {
        btn.disabled = false;
      }
    };
  } catch {
    authForm(app, load);
  }
}
load();
