import { AWE_SUPABASE_URL, AWE_SUPABASE_PUBLISHABLE_KEY } from "./service-config.mjs";

const CATEGORIES = {
  "Portfolio website": "Actor or creative portfolio",
  "Business website": "Small business website",
  "Web application": "Custom web project",
  "Something else": "General inquiry",
};

export async function submitInquiry({ name, email, project, message }, fetcher = fetch) {
  const payload = {
    name: name.trim(), email: email.trim(),
    project: CATEGORIES[project], message: message.trim(),
  };
  if (!payload.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
      !payload.project || payload.message.length < 10 || payload.message.length > 3000)
    throw Error("Review your name, email, and project details before sending.");
  const response = await fetcher(AWE_SUPABASE_URL + "/functions/v1/awe-inquiry", {
    method: "POST", credentials: "omit",
    headers: { "Content-Type": "application/json", apikey: AWE_SUPABASE_PUBLISHABLE_KEY },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(20000),
  });
  if (!(response.headers.get("content-type") || "").includes("application/json"))
    throw Error("The inquiry service is not responding correctly.");
  const data = await response.json();
  if (!response.ok) throw Error(data?.error || "The inquiry could not be saved.");
  if (data?.ok !== true || typeof data?.reference !== "string" ||
      !/^[a-f0-9-]{36}$/i.test(data.reference))
    throw Error("The inquiry service did not confirm receipt.");
  return data.reference;
}
