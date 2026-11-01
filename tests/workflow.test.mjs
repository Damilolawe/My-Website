import test from "node:test";
import {unzipSync,strFromU8} from "fflate";
import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { readFile, readdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import Stripe from "stripe";
import sharp from "sharp";
import api from "../netlify/functions/api.mjs";
import site from "../netlify/functions/site.mjs";
import webhook from "../netlify/functions/webhook.mjs";
import { runJobs } from "../platform/production.mjs";
import { sample } from "../shared/model.mjs";
import edgeApi from "../supabase/functions/awe-api/netlify/functions/api.mjs";
import edgeSite from "../supabase/functions/awe-api/netlify/functions/site.mjs";
import edgeWebhook from "../supabase/functions/awe-api/netlify/functions/webhook.mjs";
import {runJobs as edgeRunJobs} from "../supabase/functions/awe-api/platform/production.mjs";
import {allowedApprovedPageNames} from "../shared/approved-pages.mjs";

for (const flow of [
  {name:"Starter $75", amount:7500, template:sample.template, tier:"starter", delivery:"awe-hosted", pages:1, api, site, webhook, runJobs},
  {name:"Signature $150 Edge", amount:15000, template:"runwaymulti", tier:"signature", delivery:"awe-multipage", pages:5, api:edgeApi, site:edgeSite, webhook:edgeWebhook, runJobs:edgeRunJobs},
]) {
const {api,site,webhook,runJobs}=flow;
const design={...sample,template:flow.template};
test(flow.name+": HTTP workflow with real PostgreSQL and simulated external providers", async (t) => {
  const db = new PGlite();
  await db.exec(
    "create role anon;create role authenticated;create role service_role bypassrls;create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);",
  );
  const file = (await readdir("supabase/migrations")).find((x) =>
    x.endsWith("_awe_platform.sql"),
  );
  await db.exec(await readFile("supabase/migrations/" + file, "utf8"));
  for (const suffix of ["_customer_draft_approval.sql", "_payment_refund_event_ordering.sql", "_work_handoff_notification_reservation.sql", "_paid_order_confirmation.sql", "_owner_review_customer_acceptance.sql"]) {
    const migration = (await readdir("supabase/migrations")).find(f=>f.endsWith(suffix));
    await db.exec(await readFile("supabase/migrations/"+migration,"utf8"));
  }
  const owner = "220ddd21-710f-4dea-bc24-e34c8ba9cef8",
    customer = randomUUID(),
    stranger = randomUUID();
  const accounts = {
    owner: {
      id: owner,
      email: "contact@aweconcepts.com",
      email_confirmed_at: "now",
    },
    customer: {
      id: customer,
      email: "customer@example.test",
      email_confirmed_at: "now",
    },
    stranger: {
      id: stranger,
      email: "stranger@example.test",
      email_confirmed_at: "now",
    },
  };
  await db.query("insert into awe_owner values($1)", [owner]);
  const savedEnv={...process.env};
  Object.assign(process.env, {
    SITE_ORIGIN: "https://studio.example",
    SUPABASE_URL: "https://db.example",
    SUPABASE_SERVICE_ROLE_KEY: "fake-server",
    SUPABASE_PUBLISHABLE_KEY: "fake-public",
    OWNER_USER_ID: owner,
    ORDERS_ENABLED: "true",
    LIVE_CHECKOUT_ENABLED: "true",
    STRIPE_LIVE_SECRET_KEY: "sk_live_fictional",
    STRIPE_LIVE_WEBHOOK_SECRET: "whsec_live_fictional",
    STRIPE_SECRET_KEY: "sk_test_fictional",
    STRIPE_WEBHOOK_SECRET: "whsec_fictional",
    RESEND_API_KEY: "fake-email",
    EMAIL_FROM: "studio@example.test",
  });
  const original = globalThis.fetch;
  const originalHttpClient=Stripe._platformFunctions.createDefaultHttpClient;
  Stripe._platformFunctions.createDefaultHttpClient=()=>Stripe.createFetchHttpClient(globalThis.fetch);
  let checkoutCalls=0;
  const storage = new Map();
  let emailFails = true,
    emailCalls = 0;
  const response = (v, status = 200) =>
    new Response(JSON.stringify(v), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  function where(params, vals) {
    const clauses = [];
    for (const [k, v] of params) {
      if (["select", "order", "limit", "on_conflict"].includes(k)) continue;
      assert(k === "details->>version" || /^[a-z_]+$/.test(k));
      const column = k === "details->>version" ? "(details->>'version')" : k;
      if (v === "is.null") clauses.push(`${k} is null`);
      else if (v === "not.is.null") clauses.push(`${k} is not null`);
      else if (v.startsWith("eq.")) {
        vals.push(
          v === "eq.true" ? true : v === "eq.false" ? false : v.slice(3),
        );
        clauses.push(`${column}=$${vals.length}`);
      } else throw Error("Unhandled test filter " + v);
    }
    return clauses.length ? " where " + clauses.join(" and ") : "";
  }
  globalThis.fetch = async (input, options = {}) => {
    const url = new URL(typeof input === "string" ? input : input.url);
    if (url.hostname === "api.stripe.com") {
      assert.equal(url.pathname,"/v1/checkout/sessions");
      assert.equal(options.method,"POST");
      const params=new URLSearchParams(options.body);
      assert.equal(params.get("line_items[0][price_data][unit_amount]"),String(flow.amount));
      assert.equal(params.get("line_items[0][price_data][currency]"),"usd");
      assert.equal(params.get("client_reference_id"),oid);
      assert.equal(params.get("mode"),"payment");
      checkoutCalls++;
      return response({id:"cs_test_fixture",status:"open",url:"https://checkout.example.test/fixture"});
    }
    if (url.hostname === "studio.example")
      return site(new Request(url, options));
    if (url.hostname === "api.resend.com") {
      emailCalls++;
      return response(
        emailFails
          ? { error: "simulated outage" }
          : { id: "email_test_accepted" },
        emailFails ? 503 : 200,
      );
    }
    if (url.pathname === "/auth/v1/user") {
      const token = options.headers.Authorization.split(" ")[1];
      return response(accounts[token] || {}, accounts[token] ? 200 : 401);
    }
    if (url.pathname.startsWith("/storage/v1/object/awe-private/")) {
      const key = url.pathname;
      if (options.method === "POST") {
        storage.set(key, Buffer.from(options.body));
        return response({ ok: true });
      }
      return new Response(storage.get(key) || null, {
        status: storage.has(key) ? 200 : 404,
        headers: { "Content-Type": "image/webp" },
      });
    }
    assert.equal(url.hostname,"db.example","External network access is forbidden in this acceptance flow");
    try {
      const route = url.pathname.split("/").filter(Boolean);
      if (route[2] === "rpc") {
        const fn = route[3],
          b = JSON.parse(options.body || "{}");
        const keys = Object.keys(b),
          vals = Object.values(b).map((v) =>
            typeof v === "object" && v !== null ? JSON.stringify(v) : v,
          );
        const result = await db.query(
          `select * from ${fn}(${keys.map((k, i) => `${k}=>$${i + 1}`).join(",")})`,
          vals,
        );
        return response(result.rows);
      }
      const table = route[2];
      assert.match(table, /^awe_[a-z_]+$/);
      const method = options.method || "GET";
      let result;
      if (method === "GET") {
        const vals = [],
          w = where(url.searchParams, vals);
        const cols = url.searchParams.get("select") || "*";
        assert.match(cols, /^[a-z_,*]+$/);
        let extra = "";
        const order = url.searchParams.get("order");
        if (order) {
          const [col, dir] = order.split(".");
          assert.match(col, /^[a-z_]+$/);
          extra += ` order by ${col} ${dir === "desc" ? "desc" : "asc"}`;
        }
        const limit = Number(url.searchParams.get("limit"));
        if (limit) extra += ` limit ${limit}`;
        result = await db.query(
          `select ${cols} from ${table}${w}${extra}`,
          vals,
        );
      } else {
        const b = JSON.parse(options.body),
          keys = Object.keys(b),
          vals = Object.values(b).map((v) =>
            typeof v === "object" && v !== null ? JSON.stringify(v) : v,
          );
        keys.forEach((k) => assert.match(k, /^[a-z_]+$/));
        if (method === "PATCH") {
          const w = where(url.searchParams, vals);
          result = await db.query(
            `update ${table} set ${keys.map((k, i) => `${k}=$${i + 1}`).join(",")}${w} returning *`,
            vals,
          );
        } else
          result = await db.query(
            `insert into ${table}(${keys.join(",")}) values(${keys.map((_, i) => "$" + (i + 1)).join(",")}) returning *`,
            vals,
          );
      }
      return response(result.rows);
    } catch (e) {
      console.error("Test adapter:", e.message);
      return response({ error: e.message }, 409);
    }
  };
  const request = async (path, { actor = "customer", data, form } = {}) =>
    api(
      new Request("https://studio.example/api/" + path, {
        method: data || form ? "POST" : "GET",
        headers: {
          cookie: `__Host-awe=${actor}`,
          Origin: "https://studio.example",
          ...(form ? {} : { "Content-Type": "application/json" }),
        },
        body: form || (data ? JSON.stringify(data) : undefined),
      }),
    );
  let oid;
  try {
    await t.test("unconfigured terms prevent creating an order", async () => {
      const r = await request("orders", {
        data: { input: design, packageId: "express", consent: true },
      });
      assert.equal(r.status, 400);
    });
    const pkg = {
      name: "Fictional test package",
      enabled: true,
      amount: flow.amount,
      currency: "usd",
      tier: flow.tier,
      delivery: flow.delivery,
      pageCount: flow.pages,
      features: ["Test fixture only"],
      hosting: "Test terms",
      ownership: "Test terms",
      revisions: "Test terms",
      refunds: "Non-refundable except where required by law.",
      termsVersion: "test-v1",
    };
    await db.query("update awe_packages set data=$1 where id='express'", [
      JSON.stringify(pkg),
    ]);
    await db.query("insert into awe_templates(id,enabled,label) values($1,true,$2) on conflict(id) do update set enabled=true",[flow.template,flow.name]);
    await t.test("missing agreement and stale terms cannot create orders",async()=>{
      for(const agreement of [{consent:false,termsVersion:"test-v1"},{consent:true,termsVersion:"stale"}]) {
        assert.equal((await request("orders",{data:{input:design,packageId:"express",...agreement}})).status,400);
      }
      assert.equal((await db.query("select count(*)::int as n from awe_orders")).rows[0].n,0);
    });
    await t.test(
      "customer order snapshots package and stays unpaid",
      async () => {
        const r = await request("orders", {
          data: {
            input: design,
            packageId: "express",
            termsVersion: "test-v1",
            consent: true,
          },
        });
        assert.equal(r.status, 200, await r.clone().text());
        oid = (await r.json()).id;
        assert.equal(
          (await db.query("select payment from awe_orders")).rows[0].payment,
          "unpaid",
        );
      },
    );
    await t.test(
      "cross-customer reads and all non-owner draft routes denied",
      async () => {
        assert.equal(
          (await request("orders/" + oid, { actor: "stranger" })).status,
          404,
        );
        assert.equal(
          (await request(`admin/orders/${oid}/preview`)).status,
          403,
        );
        assert.equal((await request("admin/overview")).status, 403);
      },
    );
    const image = await sharp({
      create: { width: 12, height: 12, channels: 3, background: "blue" },
    })
      .png()
      .toBuffer();
    let aid;
    await t.test("secure upload and private asset authorization", async () => {
      const fd = new FormData();
      fd.append(
        "file",
        new File([image], "fictional.png", { type: "image/png" }),
      );
      fd.append("publish", "true");
      const r = await request(`orders/${oid}/upload`, { form: fd });
      assert.equal(r.status, 200);
      aid = (await r.json()).id;
      assert.equal((await request("assets/" + aid)).status, 403);
      assert.equal(
        (await request("assets/" + aid, { actor: "owner" })).status,
        200,
      );
    });
    const input = {
      ...design,
      content: { ...sample.content, photoIds: [aid] },
    };
    await db.query(
      "update awe_orders set input=$1 where id=$2",
      [JSON.stringify(input), oid],
    );
    await t.test("checkout uses the immutable package amount and records its session",async()=>{
      const r=await request(`orders/${oid}/checkout`,{data:{input,amount:1,currency:"eur"}});
      assert.equal(r.status,200,await r.clone().text());
      assert.equal((await r.json()).url,"https://checkout.example.test/fixture");
      assert.equal(checkoutCalls,1);
      const saved=(await db.query("select * from awe_orders")).rows[0];
      assert.equal(saved.stripe_session,"cs_test_fixture");
      assert.equal(saved.package_snapshot.amount,flow.amount);
    });
    const stripe = new Stripe("sk_test_fictional");
    async function event(eid, status, type = "checkout.session.completed") {
      const payload = JSON.stringify({
        id: eid,
        type,
        livemode: false,
        data: {
          object: {
            id: "cs_test_fixture",
            mode: "payment",
            client_reference_id: oid,
            payment_status: status,
            amount_total: flow.amount,
            currency: "usd",
            payment_intent: "pi_test_fixture",
          },
        },
      });
      return webhook(
        new Request("https://studio.example/.netlify/functions/webhook", {
          method: "POST",
          headers: {
            "stripe-signature": stripe.webhooks.generateTestHeaderString({
              payload,
              secret: "whsec_fictional",
            }),
          },
          body: payload,
        }),
      );
    }
    await t.test(
      "delayed payment does not queue production until paid",
      async () => {
        assert.equal((await event("evt_pending", "unpaid")).status, 200);
        assert.equal((await db.query("select * from awe_jobs")).rows.length, 0);
        assert.equal(
          (
            await event(
              "evt_paid",
              "paid",
              "checkout.session.async_payment_succeeded",
            )
          ).status,
          200,
        );
        assert.equal(
          (
            await event(
              "evt_paid",
              "paid",
              "checkout.session.async_payment_succeeded",
            )
          ).status,
          200,
        );
        assert.equal((await db.query("select * from awe_jobs")).rows.length, 2);
      },
    );
    let order;
    await t.test(
      "worker generates HTML and assets remain inaccessible publicly",
      async () => {
        // Payment confirmation is queued first; its simulated mail outage
        // cannot block the separate website generation job.
        await runJobs(2);
        order = (await db.query("select * from awe_orders")).rows[0];
        assert.equal(order.status, "awaiting_review");
        assert.equal(order.public_version, null);
        assert.equal(
          (
            await site(
              new Request(`https://studio.example/sites/${order.slug}`),
            )
          ).status,
          404,
        );
        const revision = await request(`orders/${oid}/revision`, {
          data: { message: "Please revise this private draft before publishing." },
        });
        assert.equal(revision.status, 409, "Customers cannot revise drafts before studio release.");
        assert.equal((await db.query("select public_version from awe_orders")).rows[0].public_version, null);
        assert.equal((await request(`orders/${oid}/revision`, {
          actor: "stranger", data: { message: "Unauthorized private draft revision." },
        })).status, 404);
        const preview = await request(`admin/orders/${oid}/preview`, {
          actor: "owner",
        });
        assert.equal(preview.status, 200);
        assert.match(preview.headers.get("cache-control"), /no-store/);
        assert((await preview.text()).includes("Jordan Ellis"));
      },
    );
    await t.test("owner editing creates a new private version", async () => {
      const r = await request(`admin/orders/${oid}/save`, {
        actor: "owner",
        data: {
          version: order.version,
          input: {
            ...input,
            content: { ...input.content, headline: "Reviewed by the owner" },
          },
        },
      });
      assert.equal(r.status, 200);
      order = (await db.query("select * from awe_orders")).rows[0];
      assert.equal(order.public_version, null);
    });

    await t.test("owner release requires current personally saved draft and exact confirmation",async()=>{
      const base={version:order.version,confirm:oid};
      assert.equal((await request(`orders/${oid}/approve`,{data:{version:order.draft_version}})).status,409);
      assert.equal((await request(`admin/orders/${oid}/release`,{data:base})).status,403);
      assert.equal((await request(`admin/orders/${oid}/release`,{actor:"owner",data:{...base,confirm:"wrong"}})).status,400);
      assert.equal((await request(`admin/orders/${oid}/publish`,{actor:"owner",data:base})).status,409);
      const released=await request(`admin/orders/${oid}/release`,{actor:"owner",data:base});
      assert.equal(released.status,200,await released.clone().text());
      order=(await db.query("select * from awe_orders where id=$1",[oid])).rows[0];
      assert.equal(order.status,"customer_review");
      assert.equal(order.public_version,null);
      assert.equal((await db.query("select count(*)::int n from awe_events where order_id=$1 and kind='owner_preapproved'",[oid])).rows[0].n,1);
    });
    await t.test("review invitation retries safely without publishing",async()=>{
      await runJobs(1);
      const review=(await db.query("select * from awe_jobs where order_id=$1 and kind='notify_review'",[oid])).rows[0];
      assert.ok(review?.error,"Failed invitation must remain retryable");
      assert.equal((await db.query("select public_version from awe_orders where id=$1",[oid])).rows[0].public_version,null);
      emailFails=false;
      await db.exec("update awe_jobs set available_at=now()-interval '1 minute' where kind='notify_review'");
      await runJobs(1);
      assert.equal((await db.query("select count(*)::int n from awe_events where order_id=$1 and kind='review_invitation_accepted'",[oid])).rows[0].n,1);
    });
    await t.test("customer accepts only the exact studio-approved version",async()=>{
      assert.equal((await request(`orders/${oid}/approve`,{actor:"stranger",data:{version:order.draft_version}})).status,404);
      const approved=await request(`orders/${oid}/approve`,{data:{version:order.draft_version}});
      assert.equal(approved.status,200,await approved.clone().text());
      order=(await db.query("select * from awe_orders where id=$1",[oid])).rows[0];
      assert.equal(order.status,"published");
      assert.equal(order.public_version,order.draft_version);
      assert.equal((await request(`orders/${oid}/approve`,{data:{version:order.draft_version}})).status,409);
      const page=await site(new Request(`https://studio.example/sites/${order.slug}`));
      assert.equal(page.status,200);
      assert((await page.text()).includes("Reviewed by the owner"));
      assert.equal((await site(new Request(`https://studio.example/sites/${order.slug}/assets/${aid}`))).status,200);
      assert.equal((await site(new Request(`https://studio.example/sites/${order.slug}/assets/${randomUUID()}`))).status,404);
    });
    await t.test("approved export is owner-gated and contains portable assets",async()=>{assert.equal((await request(`orders/${oid}/export`)).status,403);const r=await request(`admin/orders/${oid}/export`,{actor:'owner'});assert.equal(r.status,200);const files=unzipSync(new Uint8Array(await r.arrayBuffer()));assert(files['index.html']);for(const page of allowedApprovedPageNames(flow.template))assert(files[page],page);const asset=(await db.query('select mime from awe_assets where id=$1',[aid])).rows[0];const extension={'image/webp':'webp','image/png':'png','image/jpeg':'jpg'}[asset.mime];assert(files['assets/'+aid+'.'+extension]);assert(!strFromU8(files['index.html']).includes('/api/assets/'));});

    await t.test("delivery email failure retries without duplicate publication or confirmation",async()=>{
      emailFails=true;
      await runJobs(1);
      assert.equal((await db.query("select count(*)::int n from awe_deliveries where order_id=$1",[oid])).rows[0].n,0);
      const delivery=(await db.query("select * from awe_jobs where order_id=$1 and kind='deliver'",[oid])).rows[0];
      assert.ok(delivery?.error,"Failed delivery remains retryable");
      emailFails=false;
      await db.exec("update awe_jobs set available_at=now()-interval '1 minute' where kind='deliver'");
      await runJobs(1);
      assert.equal((await db.query("select count(*)::int n from awe_deliveries where order_id=$1",[oid])).rows[0].n,1);
      assert.equal((await db.query("select status from awe_orders where id=$1",[oid])).rows[0].status,"delivered");
      // Paid-order confirmation is an independent job, with its own retry.
      await db.exec("update awe_jobs set available_at=now()-interval '1 minute' where kind='order_confirmation'");
      await runJobs(1);
      assert.equal((await db.query("select state from awe_order_confirmations where order_id=$1",[oid])).rows[0].state,"accepted");
      assert.ok(emailCalls>=4);
    });
    await t.test(
      "customer revision request does not mutate live content",
      async () => {
        const before = (await db.query("select public_version from awe_orders"))
          .rows[0].public_version;
        assert.equal(
          (
            await request(`orders/${oid}/revision`, {
              data: { message: "Please update my headline." },
            })
          ).status,
          200,
        );
        assert.equal(
          (await db.query("select public_version from awe_orders")).rows[0]
            .public_version,
          before,
        );
        assert.equal(
          (await db.query("select * from awe_revisions where order_id=$1",[oid])).rows.length,
          1,
        );
      },
    );
  } finally {
    globalThis.fetch = original;
    Stripe._platformFunctions.createDefaultHttpClient=originalHttpClient;
    for(const key of Object.keys(process.env))if(!(key in savedEnv))delete process.env[key];
    Object.assign(process.env,savedEnv);
    await db.close();
  }
});

}
