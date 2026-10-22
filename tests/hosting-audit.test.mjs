import test from "node:test";
import assert from "node:assert/strict";
import { hostingAudit } from "../scripts/hosting-audit.mjs";

test("Firebase deploy output excludes server code, private folders and env files", async () => {
  const report = await hostingAudit();
  assert.deepEqual(report.unsafePaths, []);
  assert(report.pages >= 280, "The design gallery and its purpose-specific preview pages must be included");
  assert(report.files >= report.pages);
});

test("Firebase deploy fits Spark storage allowance and homepage assets are measurable", async () => {
  const report = await hostingAudit();
  assert(report.totalBytes > 0, "Expected built public files");
  assert(report.totalBytes < 10 * 1024 ** 3, "Firebase Hosting free storage capacity exceeded");
  assert(report.homeReferencedBytes > 0);
  assert(report.homeReferencedBytes <= report.totalBytes);
  assert(report.largest.length > 0);
});
