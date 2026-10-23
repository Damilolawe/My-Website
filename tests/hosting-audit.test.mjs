import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { hostingAudit } from "../scripts/hosting-audit.mjs";
import { templates, types } from "../shared/model.mjs";

test("Public Firebase deploy contains all template previews but no private server code",async()=>{
  const report=await hostingAudit();
  const minimum=2*templates.length*(1+types.length);
  assert(report.pages>=minimum,"Missing generated template preview pages");
  assert(report.files>=report.pages);
  assert.deepEqual(report.unsafePaths,[]);
});
test("Firebase output stays inside expected storage limits",async()=>{
  const report=await hostingAudit();
  assert(report.totalBytes>0);
  assert(report.totalBytes<10*1024**3,"Static hosting exceeds 10GiB storage budget");
  assert(report.homeReferencedBytes>0 && report.homeReferencedBytes<=report.totalBytes);
  assert(report.largest.length>0);
});
test("Production deployment re-audits the final output including published sites",async()=>{
  const workflow=await readFile(new URL("../.github/workflows/firebase-hosting.yml",import.meta.url),"utf8");
  assert(workflow.includes("node scripts/hosting-audit.mjs"));
  assert(workflow.indexOf("node scripts/materialize-approved-sites.mjs") <
    workflow.indexOf("node scripts/hosting-audit.mjs"));
  assert(workflow.indexOf("node scripts/hosting-audit.mjs") <
    workflow.indexOf("Deploy only static assets to Firebase Hosting Classic"));
});
