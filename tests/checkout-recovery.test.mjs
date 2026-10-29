import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  CHECKOUT_RETRY_WINDOW_MS,
  checkoutReservationState,
  checkoutPackageIsValid,
} from "../shared/checkout-recovery.mjs";

const validPackage = {
  name: "Fictional sandbox package",
  amount: 15000,
  currency: "usd",
  hosting: "Test hosting terms",
  ownership: "Test ownership terms",
  revisions: "Test revision policy",
  refunds: "Non-refundable except where law requires otherwise.",
  termsVersion: "test-v1",
};

test("unreserved orders start a checkout; recent locked orders can safely retry", () => {
  const now = Date.parse("2026-10-22T20:00:00Z");
  assert.equal(checkoutReservationState({}, now), "new");
  assert.equal(checkoutReservationState({ checkout_at: null }, now), "new");
  assert.equal(
    checkoutReservationState({ checkout_at: new Date(now - 60_000).toISOString() }, now),
    "retry",
  );
  assert.equal(
    checkoutReservationState({ checkout_at: new Date(now - CHECKOUT_RETRY_WINDOW_MS + 1).toISOString() }, now),
    "retry",
  );
});

test("stale, future, malformed or boundary reservations require manual review", () => {
  const now = Date.parse("2026-10-22T20:00:00Z");
  for (const checkout_at of [
    "not-a-date",
    new Date(now + 1000).toISOString(),
    new Date(now - CHECKOUT_RETRY_WINDOW_MS).toISOString(),
    new Date(now - 25 * 60 * 60 * 1000).toISOString(),
  ]) {
    assert.equal(
      checkoutReservationState({ checkout_at }, now),
      "manual-review",
    );
  }
});

test("checkout cannot lock a draft without immutable paid-package terms", () => {
  assert.equal(checkoutPackageIsValid(validPackage), true);
  for (const edit of [
    { amount: null },
    { amount: 0 },
    { amount: -1 },
    { amount: 1000001 },
    { amount: 1.5 },
    { currency: "invalid" },
    { name: "" },
    { hosting: "" },
    { ownership: "" },
    { revisions: "" },
    { refunds: "" },
    { termsVersion: "" },
  ]) {
    assert.equal(checkoutPackageIsValid({ ...validPackage, ...edit }), false);
  }
  assert.equal(checkoutPackageIsValid(null), false);
  const {refunds, ...oldQa} = validPackage;
  assert.equal(checkoutPackageIsValid({ ...oldQa, testOnly: true }), true);
  assert.equal(checkoutPackageIsValid(oldQa), false);
});

test("deployed and legacy API both gate and recover checkout with one idempotency key", async () => {
  for (const path of [
    "netlify/functions/api.mjs",
    "supabase/functions/awe-api/netlify/functions/api.mjs",
  ]) {
    const file = await readFile(new URL("../" + path, import.meta.url), "utf8");
    const begin = file.indexOf('if (action === "checkout")');
    const end = file.indexOf('if (action === "revision")', begin);
    assert(begin >= 0 && end > begin, "Checkout handler missing: " + path);
    const flow = file.slice(begin, end);
    assert(flow.includes("!liveCheckoutConfigured() && !qaAllowed"), path);
    assert(flow.indexOf('const stripeClient = stripe(qaAllowed ? "test" : "live");') < flow.indexOf("checkout_at: new Date()"), path);
    assert(flow.includes("checkoutPackageIsValid(p)"), path);
    assert(flow.includes("allow_promotion_codes: true"), "Hosted checkout must show promo input: " + path);
    assert(flow.includes('reservation === "manual-review"'), path);
    assert(flow.includes('reservation === "new"'), path);
    assert(flow.includes("if (!locked.length)"), path);
    assert(flow.includes("idempotencyKey: qaAllowed ? `checkout-qa-v2-${o.id}` : `checkout-live-${o.id}`"), path);
    assert(flow.includes("checkout_at=not.is.null&stripe_session=is.null&payment=eq.unpaid"), path);
    assert(flow.includes("latest?.stripe_session !== session.id"), path);
    assert(flow.includes('session.status !== "open"'), path);
    assert.equal((flow.match(/checkout.sessions.create\(/g) || []).length, 1, path);
  }
});
