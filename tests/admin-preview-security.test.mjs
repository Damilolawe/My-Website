import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Owner's private preview is obtained from the authenticated API as JSON", async () => {
  const admin = await readFile(new URL("../app/admin.mjs", import.meta.url), "utf8");
  assert(admin.includes('api(`admin/orders/${o.id}/preview`)'), "Admin must call API rather than navigate frame URL");
  assert(admin.includes("frame.srcdoc = html"), "Private preview response must fill srcdoc");
  assert(!admin.includes('src="/api/admin/orders/'), "Never navigate directly to a private API");
});
test("Private admin preview sandbox blocks scripts and cross-origin escalation", async () => {
  const admin = await readFile(new URL("../app/admin.mjs", import.meta.url), "utf8");
  assert(admin.includes('sandbox=""'), "Private preview iframe should run with all sandbox restrictions");
  assert(!admin.includes('sandbox="allow-same-origin"'));
  assert(admin.includes("typeof html !== \"string\"") && admin.includes("html.length > 250000"), "Limit preview size and validate payload");
  assert(admin.includes("selected?.order?.id === o.id"), "Avoid racing stale preview responses across customer records");
});
