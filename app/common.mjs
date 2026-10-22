import { aweClient } from "./service-client.mjs";
export const $ = (s, r = document) => r.querySelector(s);
export const api = (path, data) => aweClient.api(path, data);
export function money(p) {
  return p?.amount
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: p.currency || "usd",
      }).format(p.amount / 100)
    : "Pricing to be announced";
}
export function report(error) {
  $("#feedback").textContent = error.message || error;
}
export function authForm(container, onDone) {
  container.innerHTML = `<div class="auth panel"><p class="eyebrow">Your AWE account</p><h2>A little hello.</h2><p>Sign in with a code sent to your email. No password to remember.</p><form id="auth-form"><label class="field">Email address<input name="email" type="email" required autocomplete="email"></label><label class="field" id="code-field" hidden>Email code<input name="token" inputmode="numeric" autocomplete="one-time-code" minlength="6" maxlength="10"></label><button class="btn" type="submit">Send sign-in code ↗</button></form><p id="auth-feedback" role="status"></p></div>`;
  let sent = false;
  $("#auth-form", container).onsubmit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const btn = $("button", f);
    btn.disabled = true;
    try {
      await api(
        "auth/" + (sent ? "verify" : "start"),
        Object.fromEntries(new FormData(f)),
      );
      if (sent) {
        await onDone();
      } else {
        sent = true;
        $("#code-field", container).hidden = false;
        $("[name=token]", container).required = true;
        btn.textContent = "Verify & continue ↗";
        $("#auth-feedback", container).textContent =
          "Check your inbox for the sign-in code.";
      }
    } catch (e) {
      $("#auth-feedback", container).textContent = e.message;
    } finally {
      btn.disabled = false;
    }
  };
}
