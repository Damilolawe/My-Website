import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { randomUUID } from "node:crypto";
import {
  assertOwner,
  normalize,
  customerOrder,
  sample,
} from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";
import { inspectUpload } from "../platform/uploads.mjs";
import sharp from "sharp";
import api from "../netlify/functions/api.mjs";
import webhook from "../netlify/functions/webhook.mjs";
import Stripe from "stripe";
const owner = randomUUID(),
  customer = randomUUID(),
  other = randomUUID(),
  oid = randomUUID(),
  vid = randomUUID();
let db;
test("real PostgreSQL schema, payment replay, owner approval and revision isolation", async (t) => {
  db = new PGlite();
  await db.exec(
    "create role anon; create role authenticated; create role service_role bypassrls; create schema storage; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);",
  );
  const file = (await readdir("supabase/migrations")).find((x) =>
    x.endsWith("_awe_platform.sql"),
  );
  await db.exec(await readFile("supabase/migrations/" + file, "utf8"));
  await db.query("insert into awe_owner values($1)", [owner]);
  await db.query(
    `insert into awe_orders(id,user_id,email,slug,package_snapshot,input,stripe_session) values($1,$2,'fictional@example.com','test-person','{"amount":15000,"currency":"usd"}',$3,'cs_test_order')`,
    [oid, customer, JSON.stringify(sample)],
  );
  await t.test(
    "anonymous and customer database roles cannot read private data or call publication",
    async () => {
      for (const role of ["anon", "authenticated"]) {
        await db.exec(`set role ${role}`);
        await assert.rejects(db.query("select * from awe_versions"));
        await assert.rejects(db.query("select * from awe_orders"));
        await assert.rejects(
          db.query("select awe_publish($1,0,$2,$3)", [oid, vid, customer]),
        );
        await db.exec("reset role");
      }
    },
  );
  await t.test("payment mismatch rejected with no job", async () => {
    await assert.rejects(
      db.query(
        "select awe_payment('evt_bad',$1,'cs_test_order','pi_test',1,'usd','paid')",
        [oid],
      ),
    );
    assert.equal((await db.query("select * from awe_jobs")).rows.length, 0);
  });
  await t.test(
    "valid test payment is atomic and duplicate-safe; never publishes",
    async () => {
      for (let i = 0; i < 2; i++)
        await db.query(
          "select awe_payment('evt_good',$1,'cs_test_order','pi_test',15000,'usd','paid')",
          [oid],
        );
      assert.equal((await db.query("select * from awe_jobs")).rows.length, 1);
      assert.equal(
        (await db.query("select * from awe_payments")).rows.length,
        1,
      );
      const o = (await db.query("select * from awe_orders")).rows[0];
      assert.equal(o.public_version, null);
      assert.equal(o.status, "payment_verified");
    },
  );
  await t.test(
    "generation creates a private draft, stale writes rejected",
    async () => {
      await db.query("select awe_save_draft($1,1,$2,$3,$4,'[]',null)", [
        oid,
        vid,
        JSON.stringify(sample),
        renderSite(sample),
      ]);
      assert.equal(
        (await db.query("select public_version from awe_orders")).rows[0]
          .public_version,
        null,
      );
      await assert.rejects(
        db.query("select awe_save_draft($1,1,$2,$3,$4,'[]',$5)", [
          oid,
          randomUUID(),
          JSON.stringify(sample),
          "html",
          owner,
        ]),
      );
    },
  );
  await t.test(
    "customer cannot approve even with known order and version IDs",
    async () => {
      await assert.rejects(
        db.query("select awe_publish($1,2,$2,$3)", [oid, vid, customer]),
      );
      assert.equal(
        (await db.query("select * from awe_approvals")).rows.length,
        0,
      );
    },
  );
  await t.test(
    "owner approval commits public pointer, audit and delivery job together",
    async () => {
      await db.query("select awe_publish($1,2,$2,$3)", [oid, vid, owner]);
      const o = (await db.query("select * from awe_orders")).rows[0];
      assert.equal(o.public_version, vid);
      assert.equal(o.status, "published");
      assert.equal(
        (await db.query("select * from awe_approvals")).rows.length,
        1,
      );
      assert.equal(
        (await db.query("select * from awe_jobs where kind='deliver'")).rows
          .length,
        1,
      );
      await assert.rejects(
        db.query("select awe_publish($1,2,$2,$3)", [oid, vid, owner]),
      );
    },
  );
  await t.test(
    "revision and rejection leave approved live version intact",
    async () => {
      const v2 = randomUUID();
      await db.query("select awe_save_draft($1,3,$2,$3,$4,'[]',$5)", [
        oid,
        v2,
        JSON.stringify(sample),
        "new html",
        owner,
      ]);
      await db.query("select awe_reject($1,4,$2,'Needs another pass')", [
        oid,
        owner,
      ]);
      const o = (await db.query("select * from awe_orders")).rows[0];
      assert.equal(o.public_version, vid);
      assert.equal(o.draft_version, v2);
      assert.equal(o.status, "revisions_required");
      assert.equal(
        (await db.query("select * from awe_versions")).rows.length,
        2,
      );
    },
  );
  await t.test(
    "worker leases are exclusive and expired work can recover",
    async () => {
      const first = (await db.query("select * from awe_claim()")).rows[0];
      const second = (await db.query("select * from awe_claim()")).rows[0];
      assert.notEqual(first.id, second.id);
      assert.equal(
        (await db.query("select * from awe_claim()")).rows.length,
        0,
      );
      await db.query(
        "update awe_jobs set available_at=now()-interval '1 minute' where id=$1",
        [first.id],
      );
      const retry = (await db.query("select * from awe_claim()")).rows[0];
      assert.equal(retry.id, first.id);
      assert.notEqual(retry.lease, first.lease);
    },
  );
  await t.test("refund locks future publication", async () => {
    await db.query(
      "select awe_payment('evt_refund',$1,'cs_test_order','pi_test',15000,'usd','refunded')",
      [oid],
    );
    await assert.rejects(
      db.query("select awe_publish($1,6,$2,$3)", [oid, vid, owner]),
    );
  });
  await db.close();
});
test("template rendering escapes hostile content and allows only safe URLs and design tokens", () => {
  const input = normalize({
    template: "<script>",
    content: {
      name: "<img src=x onerror=alert(1)>",
      headline: "test",
      links: [
        "javascript:alert(1)",
        "https://example.com",
        "https://u:p@example.com",
      ],
      photoIds: ["../../private"],
    },
    design: {
      primary: "red;}body{display:none",
      font: "evil",
      sections: ["contact"],
    },
  });
  const html = renderSite(input);
  assert(!html.includes("<img src=x"));
  assert(!html.includes("javascript:"));
  assert(!html.includes("u:p"));
  assert(!html.includes("../../private"));
  assert(html.includes("&lt;img"));
  assert.equal(input.design.primary, "#3459dd");
  assert.equal(input.content.links.length, 1);
});
test("owner identity uses configured UUID and verified email, not user-editable metadata", () => {
  assert.throws(() =>
    assertOwner(
      { id: other, email_confirmed_at: "now", user_metadata: { admin: true } },
      owner,
    ),
  );
  assert.throws(() => assertOwner({ id: owner }, owner));
  assertOwner({ id: owner, email_confirmed_at: "now" }, owner);
});
test("customer response strips internal content, drafts, notes and jobs", () => {
  const result = customerOrder({
    id: oid,
    status: "awaiting_review",
    draft_version: vid,
    input: { secret: "private" },
    public_version: null,
    payment: "paid",
  });
  assert(!("draft_version" in result));
  assert(!("input" in result));
  assert.equal(result.status, "Studio review");
  assert.equal(result.preview_ready, false, "An unreleased owner draft must remain private");
  assert.equal(result.public_url, null);
});
test("uploads decode images, strip metadata and reject forged or unsupported files", async () => {
  const png = await sharp({
    create: { width: 10, height: 10, channels: 3, background: "red" },
  })
    .png()
    .toBuffer();
  const a = await inspectUpload(
    new File([png], "test.png", { type: "image/png" }),
  );
  assert.equal(a.mime, "image/webp");
  await assert.rejects(
    inspectUpload(new File(["fake"], "test.png", { type: "image/png" })),
  );
  await assert.rejects(
    inspectUpload(
      new File(["<svg></svg>"], "x.svg", { type: "image/svg+xml" }),
    ),
  );
  await assert.rejects(
    inspectUpload(new File(["not pdf"], "x.pdf", { type: "application/pdf" })),
  );
  await assert.rejects(
    inspectUpload(
      new File([new Uint8Array(4194305)], "x.pdf", { type: "application/pdf" }),
    ),
  );
});
test("HTTP endpoints fail closed before setup and reject cross-origin writes", async () => {
  process.env.SITE_ORIGIN = "https://studio.example";
  const a = await api(new Request("https://studio.example/api/admin/overview"));
  assert.equal(a.status, 401);
  const b = await api(
    new Request("https://studio.example/api/orders", {
      method: "POST",
      headers: { Origin: "https://evil.example" },
      body: "{}",
    }),
  );
  assert.equal(b.status, 403);
  const c = await api(new Request("https://studio.example/api/catalog"));
  assert.equal(c.status, 200);
  assert.equal((await c.json()).ordersEnabled, false);
});
test("Stripe raw-body verification rejects tampering and live mode, without database effects", async () => {
  process.env.STRIPE_SECRET_KEY = "sk_test_fictional";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_fictional";
  const s = new Stripe(process.env.STRIPE_SECRET_KEY);
  const payload = JSON.stringify({
    id: "evt_test",
    type: "irrelevant",
    livemode: false,
    data: { object: {} },
  });
  const signature = s.webhooks.generateTestHeaderString({
    payload,
    secret: process.env.STRIPE_WEBHOOK_SECRET,
  });
  const request = (p, sig) =>
    new Request("https://studio.example/.netlify/functions/webhook", {
      method: "POST",
      headers: { "stripe-signature": sig },
      body: p,
    });
  assert.equal((await webhook(request(payload, signature))).status, 200);
  assert.equal((await webhook(request(payload + " ", signature))).status, 400);
  const live = payload.replace('"livemode":false', '"livemode":true');
  const sig = s.webhooks.generateTestHeaderString({
    payload: live,
    secret: process.env.STRIPE_WEBHOOK_SECRET,
  });
  assert.equal((await webhook(request(live, sig))).status, 400);
});
