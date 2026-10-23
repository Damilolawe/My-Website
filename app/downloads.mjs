import { aweClient } from "./service-client.mjs";

// Browser download bridge. Never navigates to a protected API URL without a
// bearer token or embeds private files in an unsandboxed new tab.
export async function downloadAuthorizedFile(route, button, client = aweClient) {
  const previousLabel = button?.textContent || "Download file";
  if (button) { button.disabled = true; button.textContent = "Preparing your download…"; }
  try {
    const { blob, filename } = await client.download(route);
    const objectUrl = URL.createObjectURL(blob);
    try {
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.append(link);
      link.click();
      link.remove();
    } finally {
      // iOS Safari may need the object URL for the next browser event loop.
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
    }
  } catch (error) {
    if (button) {
      let feedback = button.nextElementSibling;
      if (!feedback || feedback.dataset.downloadFeedback !== "true") {
        feedback = document.createElement("p");
        feedback.dataset.downloadFeedback = "true";
        feedback.setAttribute("role", "status");
        button.after(feedback);
      }
      feedback.textContent = "Download unavailable: " + (error?.message || "Please try again.");
    }
  } finally {
    if (button) { button.disabled = false; button.textContent = previousLabel; }
  }
}
