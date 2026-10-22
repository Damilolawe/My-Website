import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");

test("Supabase Edge API does not load unsupported image codec at module startup", async () => {
  const src = await read("supabase/functions/awe-api/platform/uploads.mjs");
  assert(!src.includes("import { Image } from 'imagescript';"));
  assert(src.includes("await import('imagescript')"));
  assert(src.indexOf("await import('imagescript')") > src.indexOf("export async function inspectUpload"));
  assert(src.includes("Image.decode(bytes)"));
});
test("Account page does not discard verified session after backend failure", async () => {
  const src = await read("app/account.mjs");
  assert(src.includes("aweClient.session()"));
  assert(src.includes("error?.status === 401"));
  assert(src.includes('id="account-retry"'));
  assert(src.includes('id="account-error"'));
  assert(src.includes("Your account is still signed in"));
  assert(!src.includes("} catch {\n    authForm(app, load);"));
});
