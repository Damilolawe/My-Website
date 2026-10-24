import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { submitInquiry } from "../app/submit-inquiry.mjs";

const input = {
  name: "Alex Example", email: "alex@example.test", project: "Business website",
  message: "I need a website for my neighborhood bookstore.",
};
const reference = "12345678-1234-1234-1234-123456789abc";

test("homepage inquiry submits a valid project brief and requires storage acknowledgment", async () => {
  let request;
  const fetcher = async (url, options) => {
    request = { url, options };
    return new Response(JSON.stringify({ ok: true, reference }), {
      headers: { "content-type": "application/json" },
    });
  };
  assert.equal(await submitInquiry(input, fetcher), reference);
  assert.match(request.url, /\/functions\/v1\/awe-inquiry$/);
  assert.equal(request.options.method, "POST");
  assert.equal(request.options.credentials, "omit");
  assert.deepEqual(JSON.parse(request.options.body), {
    name: input.name, email: input.email, project: "Small business website",
    message: input.message,
  });
  await assert.rejects(submitInquiry(input, async () => new Response(
    JSON.stringify({ ok: true, reference: "received" }),
    { headers: { "content-type": "application/json" } },
  )), /confirm receipt/);
  await assert.rejects(submitInquiry(input, async () => new Response(
    JSON.stringify({ error: "Please wait before sending another inquiry." }),
    { status: 429, headers: { "content-type": "application/json" } },
  )), /Please wait/);
});

test("homepage inquiry rejects invalid details without a network request", async () => {
  let called = false;
  const fetcher = async () => { called = true; };
  await assert.rejects(submitInquiry({ ...input, email: "bad" }, fetcher), /Review/);
  await assert.rejects(submitInquiry({ ...input, project: "unknown" }, fetcher), /Review/);
  await assert.rejects(submitInquiry({ ...input, message: "x".repeat(3001) }, fetcher), /Review/);
  assert.equal(called, false);
});

test("homepage has a distinct send action and required return contact", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const script = await readFile(new URL("../script.js", import.meta.url), "utf8");
  assert.match(html, /id="send-brief"[^>]*>SEND INQUIRY/);
  assert.match(html, /id="brief-email"[^>]*required/);
  assert.match(html, /href="\/privacy.html"/);
  assert.match(script, /briefSubmitting\|\|briefSent/);
});
