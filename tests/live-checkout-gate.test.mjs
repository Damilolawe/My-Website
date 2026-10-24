import test from "node:test";
import assert from "node:assert/strict";
import { liveCheckoutConfigured, stripe } from "../platform/backend.mjs";

const names = [
  "LIVE_CHECKOUT_ENABLED", "ORDERS_ENABLED", "STRIPE_LIVE_SECRET_KEY",
  "STRIPE_LIVE_WEBHOOK_SECRET", "STRIPE_SECRET_KEY",
];

test("real charges remain closed without all explicit launch conditions", () => {
  const previous = Object.fromEntries(names.map(name => [name, process.env[name]]));
  try {
    for (const name of names) delete process.env[name];
    assert.equal(liveCheckoutConfigured(), false);
    process.env.ORDERS_ENABLED = "true";
    assert.equal(liveCheckoutConfigured(), false);
    process.env.LIVE_CHECKOUT_ENABLED = "true";
    assert.equal(liveCheckoutConfigured(), false);
    process.env.STRIPE_LIVE_SECRET_KEY = "sk_test_wrong_mode";
    process.env.STRIPE_LIVE_WEBHOOK_SECRET = "whsec_synthetic_test";
    assert.equal(liveCheckoutConfigured(), false);
    assert.throws(() => stripe("live"), /Live checkout is not configured/);
    process.env.STRIPE_LIVE_SECRET_KEY = "sk_live_synthetic_test";
    assert.equal(liveCheckoutConfigured(), true);
    assert.doesNotThrow(() => stripe("live"));
    process.env.STRIPE_LIVE_SECRET_KEY = "rk_live_restricted_test_fixture";
    assert.equal(liveCheckoutConfigured(), true);
    assert.doesNotThrow(() => stripe("live"));
    process.env.STRIPE_LIVE_SECRET_KEY = "rk_test_wrong_mode";
    assert.equal(liveCheckoutConfigured(), false);
    assert.throws(() => stripe("live"), /Live checkout is not configured/);
    process.env.STRIPE_LIVE_SECRET_KEY = "rk_live_restricted_test_fixture";
    assert.throws(() => stripe("unknown"), /Unknown payment mode/);
    process.env.ORDERS_ENABLED = "false";
    assert.equal(liveCheckoutConfigured(), false);
  } finally {
    for (const name of names) {
      if (previous[name] === undefined) delete process.env[name];
      else process.env[name] = previous[name];
    }
  }
});
