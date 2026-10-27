import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { workHandoffMessage, WORK_HANDOFF_SUBJECT } from "../platform/work-handoff.mjs";

test("Work handoff email includes only an owner-only draft reference, not customer materials", () => {
  const id = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const version = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const txt = workHandoffMessage({id, email:"secret@example.test", input:{content:{bio:"PRIVATE BIO"}}},version,"https://aweconcepts.com");
  assert.equal(WORK_HANDOFF_SUBJECT,"AWE WORK HANDOFF | DRAFT READY");
  assert.match(txt,/admin\.html\?order=aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa/);
  assert.match(txt,/owner approval/i);
  assert.doesNotMatch(txt,/PRIVATE BIO|secret@example\.test/);
  assert.throws(()=>workHandoffMessage({id:"bad"},version,"https://aweconcepts.com"));
});

test("Work handoff is opt-in, owner-gated, and never bypasses draft review", async () => {
  const production=await readFile("platform/production.mjs","utf8");
  const api=await readFile("netlify/functions/api.mjs","utf8");
  const admin=await readFile("app/admin.mjs","utf8");
  const handoff=await readFile("platform/work-handoff.mjs","utf8");
  assert.match(production,/sendWorkHandoff\(/);
  assert.match(handoff,/AWE_WORK_HANDOFF_ENABLED !== "true"/);
  assert.match(handoff,/order\.payment !== "paid"/);
  assert.match(api,/await owner\(u\)/);
  assert.match(api,/exportPrivateDraft\(o\)/);
  assert.match(admin,/data-work-export/);
  assert.match(production,/await saveDraft\(/);
});
