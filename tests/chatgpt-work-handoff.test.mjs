import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { unzipSync, strFromU8 } from "fflate";
import { exportPrivateDraft } from "../platform/export.mjs";
import { workHandoffMessage, sendWorkHandoff, WORK_HANDOFF_SUBJECT, WORK_HANDOFF_RECIPIENT } from "../platform/work-handoff.mjs";

test("Work handoff email includes only an owner-only draft reference, not customer materials", () => {
  const id = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const version = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const txt = workHandoffMessage({id, email:"secret@example.test", input:{content:{bio:"PRIVATE BIO"}}},version,"https://aweconcepts.com");
  assert.equal(WORK_HANDOFF_SUBJECT,"AWE WORK HANDOFF | DRAFT READY");
  assert.equal(WORK_HANDOFF_RECIPIENT,"contact@aweconcepts.com");
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
  assert.match(api,/if \(route === "admin"\) \{\s*await owner\(u\);/);
  assert.match(api,/exportPrivateDraft\(o\)/);
  assert.match(admin,/data-work-export/);
  assert.match(production,/await saveDraft\(/);
});

test("Work notification is gated by verified payment and idempotent in simulated providers", async () => {
  const keys = ["AWE_WORK_HANDOFF_ENABLED", "AWE_WORK_HANDOFF_EMAIL",
    "RESEND_API_KEY", "EMAIL_FROM", "SITE_ORIGIN", "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_PUBLISHABLE_KEY"];
  const old = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  const previousFetch = globalThis.fetch;
  let mailCount = 0;
  const events = [];
  const order = {id:"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", payment:"paid",package_snapshot:{aiProcessingConsent:{granted:true,policy:"chatgpt-work-v1"}}};
  const version = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const json = data => new Response(JSON.stringify(data), {
    status:200, headers:{"content-type":"application/json"}
  });
  try {
    Object.assign(process.env, {
      AWE_WORK_HANDOFF_ENABLED:"true",
      AWE_WORK_HANDOFF_EMAIL:"contact@aweconcepts.com",
      RESEND_API_KEY:"example",
      EMAIL_FROM:"studio@example.test",
      SITE_ORIGIN:"https://aweconcepts.com",
      SUPABASE_URL:"https://db.example.test",
      SUPABASE_SERVICE_ROLE_KEY:"example",
      SUPABASE_PUBLISHABLE_KEY:"example",
    });
    globalThis.fetch = async (input, options={}) => {
      const u = new URL(input.toString());
      if (u.hostname === "api.resend.com") {
        mailCount++;
        const message = JSON.parse(options.body);
        assert.deepEqual(message.to,[WORK_HANDOFF_RECIPIENT]);
        assert.equal(message.subject, WORK_HANDOFF_SUBJECT);
        assert.match(options.headers["Idempotency-Key"],/work-handoff/);
        return json({id:"resend-accepted"});
      }
      assert.equal(u.hostname,"db.example.test");
      if (u.pathname === "/rest/v1/rpc/awe_reserve_work_handoff")
        return json(events.some(e=>e.details?.version === JSON.parse(options.body).p_version) ? "accepted" : "send");
      assert.equal(u.pathname,"/rest/v1/awe_events");
      if (options.method === "POST") {
        const row = JSON.parse(options.body);
        events.push(row);
        return json([row]);
      }
      return json(events);
    };
    assert.equal(await sendWorkHandoff({...order,payment:"unpaid"},version), false);
    assert.equal(mailCount,0);
    assert.equal(await sendWorkHandoff({...order,package_snapshot:{}},version),false);
    assert.equal(mailCount,0);
    assert.equal(await sendWorkHandoff(order,version), true);
    assert.equal(events[0].details.version, version);
    assert.equal(await sendWorkHandoff(order,version), false);
    assert.equal(mailCount,1);
    process.env.AWE_WORK_HANDOFF_EMAIL="damilolawe03@gmail.com";
    await assert.rejects(sendWorkHandoff(order,"dddddddd-dddd-4ddd-8ddd-dddddddddddd"), /business mailbox/);
    assert.equal(mailCount,1);
    process.env.AWE_WORK_HANDOFF_EMAIL="contact@aweconcepts.com";
    process.env.AWE_WORK_HANDOFF_ENABLED="false";
    assert.equal(await sendWorkHandoff(order,version), false);
    assert.equal(mailCount,1);
  } finally {
    globalThis.fetch = previousFetch;
    for (const key of keys) {
      if (old[key] === undefined) delete process.env[key];
      else process.env[key] = old[key];
    }
  }
});

test("owner private draft export packages approved assets without exposing unauthenticated public URLs", async () => {
  const orderId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
  const versionId = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
  const assetId = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
  const oldFetch = globalThis.fetch;
  const keys = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_PUBLISHABLE_KEY"];
  const oldEnv = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  try {
    Object.assign(process.env, {
      SUPABASE_URL: "https://db.example.test",
      SUPABASE_SERVICE_ROLE_KEY: "private-test-key",
      SUPABASE_PUBLISHABLE_KEY: "public-test-key",
    });
    globalThis.fetch = async input => {
      const url = new URL(input);
      assert.equal(url.hostname, "db.example.test");
      if (url.pathname.endsWith("/awe_versions"))
        return Response.json([{
          id: versionId, order_id: orderId,
          html: `<!doctype html><html><body><h1>Client portfolio</h1><img src="/api/assets/${assetId}"></body></html>`,
          input: {template:"folio",content:{name:"Client"}},
          asset_ids: [assetId],
        }]);
      if (url.pathname.endsWith("/awe_assets"))
        return Response.json([{id:assetId,order_id:orderId,mime:"image/png",
          public_allowed:true,path:"private/client-photo.png"}]);
      if (url.pathname.endsWith("/storage/v1/object/awe-private/private/client-photo.png"))
        return new Response(new Uint8Array([137,80,78,71]),{
          headers:{"Content-Type":"image/png"}});
      throw Error("Unexpected private storage request: "+url.pathname);
    };
    const order = {id:orderId,payment:"paid",package_snapshot:{aiProcessingConsent:{granted:true,policy:"chatgpt-work-v1"}},draft_version:versionId};
    const response = await exportPrivateDraft(order);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Cache-Control"), "private, no-store");
    const files = unzipSync(new Uint8Array(await response.arrayBuffer()));
    const html = strFromU8(files["index.html"]);
    assert.ok(html.includes("assets/"+assetId+".png"));
    assert.equal(html.includes('src="/api/assets/'),false);
    assert.ok(files["assets/"+assetId+".png"]);
    assert.equal(JSON.parse(strFromU8(files["awe-design-input.json"])).privateVersion,versionId);
    assert.ok(files["CHATGPT-WORK-INSTRUCTIONS.txt"]);
    await assert.rejects(exportPrivateDraft({...order,payment:"unpaid"}),/verified paid/);
    await assert.rejects(exportPrivateDraft({...order,package_snapshot:{}}),/Customer consent/);
  } finally {
    globalThis.fetch = oldFetch;
    for (const key of keys) {
      if (oldEnv[key] === undefined) delete process.env[key];
      else process.env[key] = oldEnv[key];
    }
  }
});
