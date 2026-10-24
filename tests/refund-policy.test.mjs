import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = path => readFile(new URL("../" + path, import.meta.url), "utf8");

test("the commercial checkout visibly discloses non-refundable terms before consent", async () => {
  const checkout = await source("app/order.mjs");
  assert(checkout.includes("Payment, cancellations & refunds"));
  assert(checkout.includes("esc(p.refunds)"));
  assert(checkout.includes("all-sales-final, non-refundable payment policy"));
  assert(checkout.indexOf("esc(p.refunds)") < checkout.indexOf('id="consent"'));
});

test("owner editor preserves the refund policy on subsequent package saves", async () => {
  const editor = await source("app/admin.mjs");
  assert(editor.includes('name="refunds"') || editor.includes('"refunds", d.refunds'));
  for (const path of ["netlify/functions/api.mjs", "supabase/functions/awe-api/netlify/functions/api.mjs"]) {
    const api = await source(path);
    assert(api.includes("refunds: text(b.refunds, 2000)"), path);
    assert(api.includes("!data.refunds"), path);
    assert(api.includes("!p.testOnly && !p.refunds"), path);
    assert(api.includes("p.refunds.slice(0, 280)"), path);
  }
});

test("both checkout environments enforce commercial refund terms, without blocking QA fixtures", async () => {
  for (const path of ["shared/checkout-recovery.mjs", "supabase/functions/awe-api/shared/checkout-recovery.mjs"]) {
    const src = await source(path);
    assert(src.includes('p.testOnly === true || (typeof p.refunds === "string"'), path);
  }
  const edge = await source("supabase/functions/awe-api/platform/edge-router.mjs");
  assert(edge.includes("!v.testOnly&&!v.refunds"));
  assert(edge.includes("p.data.refunds && p.data.termsVersion"));
});
