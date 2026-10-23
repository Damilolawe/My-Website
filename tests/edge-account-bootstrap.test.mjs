import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const file = p => readFile(new URL("../" + p, import.meta.url), "utf8");

test("Unrelated Edge API routes do not import the unsupported native image module", async () => {
  const code = await file("supabase/functions/awe-api/platform/uploads.mjs");
  assert(!code.includes("import { Image } from 'imagescript';"));
  assert(code.includes("await import('imagescript')"));
  assert(code.indexOf("await import('imagescript')") > code.indexOf("export async function inspectUpload"));
});
test("Existing customer OTP stays authenticated on studio outage", async () => {
  const code = await file("app/account.mjs");
  assert(code.includes("aweClient.session()"));
  assert(code.includes("error?.status === 401"));
  assert(code.includes('id="account-retry"'));
  assert(code.includes('id="account-error"'));
  assert(code.includes("Your account is still signed in"));
  assert(!code.includes("} catch {\n    authForm(app, load);"));
});
