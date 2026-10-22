import { AWE_SUPABASE_URL, AWE_SUPABASE_PUBLISHABLE_KEY } from "./app/service-config.mjs";

// AWE / DIGITAL inquiry form: a successful submission MUST be acknowledged by
// the database-backed Supabase Edge Function, not by Firebase's static homepage.
const form = document.querySelector('form[name="awe-inquiries"]');
if (form) {
  const status = document.querySelector("#inquiry-status");
  const button = form.querySelector('button[type="submit"]');
  let submitting = false;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    submitting = true;
    button.disabled = true;
    button.textContent = "SENDING YOUR INQUIRY…";
    status.textContent = "Submitting securely…";
    status.dataset.state = "pending";
    try {
      const payload=Object.fromEntries(new FormData(form));
      const response = await fetch(AWE_SUPABASE_URL + "/functions/v1/awe-inquiry", {
        method:"POST",
        credentials:"omit",
        headers:{"Content-Type":"application/json","apikey":AWE_SUPABASE_PUBLISHABLE_KEY},
        body:JSON.stringify(payload),
        signal:AbortSignal.timeout(20000),
      });
      const type=response.headers.get("content-type") || "";
      if (!type.includes("application/json"))
        throw Error("The inquiry service is not responding correctly.");
      const data=await response.json();
      if (!response.ok) throw Error(data?.error || "The inquiry could not be saved.");
      if (data?.ok !== true || typeof data?.reference !== "string" || !data.reference)
        throw Error("The inquiry service did not confirm receipt.");
      form.reset();
      form.hidden=true;
      const success=document.querySelector("#inquiry-success");
      success.hidden=false;
      success.focus();
      status.textContent="";
      status.dataset.state="success";
    } catch (error) {
      status.textContent=(error.name==="TimeoutError"?"The request timed out.":error.message || "Unable to submit.")+
        " Your information has not been confirmed as received. Please try again.";
      status.dataset.state="error";
      button.textContent="TRY SENDING AGAIN ↗";
    } finally {
      submitting=false;
      button.disabled=false;
    }
  });
}
