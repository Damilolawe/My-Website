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
test("HTTP workflow with real PostgreSQL and simulated external providers", async (t) => {
  const db = new PGlite();
  await db.exec(
    "create role anon;create role authenticated;create role service_role bypassrls;create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);",
  );
  const file = (await readdir("supabase/migrations")).find((x) =>
    x.endsWith("_awe_platform.sql"),
  );
  await db.exec(await readFile("supabase/migrations/" + file, "utf8"));
  const owner = randomUUID(),
    customer = randomUUID(),
    stranger = randomUUID();
  const accounts = {
    owner: {
      id: owner,
      email: "owner@example.test",
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
      assert.match(k, /^[a-z_]+$/);
      if (v === "is.null") clauses.push(`${k} is null`);
      else if (v === "not.is.null") clauses.push(`${k} is not null`);
      else if (v.startsWith("eq.")) {
        vals.push(
          v === "eq.true" ? true : v === "eq.false" ? false : v.slice(3),
        );
        clauses.push(`${k}=$${vals.length}`);
      } else throw Error("Unhandled test filter " + v);
    }
    return clauses.length ? " where " + clauses.join(" and ") : "";
  }
  globalThis.fetch = async (input, options = {}) => {
    const url = new URL(typeof input === "string" ? input : input.url);
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
        data: { input: sample, packageId: "express", consent: true },
      });
      assert.equal(r.status, 400);
    });
    const pkg = {
      name: "Fictional test package",
      enabled: true,
      amount: 15000,
      currency: "usd",
      features: ["Test fixture only"],
      hosting: "Test terms",
      ownership: "Test terms",
      revisions: "Test terms",
      termsVersion: "test-v1",
    };
    await db.query("update awe_packages set data=$1 where id='express'", [
      JSON.stringify(pkg),
    ]);
    await t.test(
      "customer order snapshots package and stays unpaid",
      async () => {
        const r = await request("orders", {
          data: {
            input: sample,
            packageId: "express",
            termsVersion: "test-v1",
            consent: true,
          },
        });
        assert.equal(r.status, 200);
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
      ...sample,
      content: { ...sample.content, photoIds: [aid] },
    };
    await db.query(
      "update awe_orders set stripe_session='cs_test_fixture',input=$1 where id=$2",
      [JSON.stringify(input), oid],
    );
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
            amount_total: 15000,
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
        assert.equal((await db.query("select * from awe_jobs")).rows.length, 1);
      },
    );
    let order;
    await t.test(
      "worker generates HTML and assets remain inaccessible publicly",
      async () => {
        await runJobs(1);
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
    await t.test(
      "approval requires explicit exact-order confirmation and owner auth",
      async () => {
        const base = { version: order.version, confirm: oid };
        assert.equal(
          (await request(`admin/orders/${oid}/publish`, { data: base })).status,
          403,
        );
        assert.equal(
          (
            await request(`admin/orders/${oid}/publish`, {
              actor: "owner",
              data: { ...base, confirm: "wrong" },
            })
          ).status,
          400,
        );
        assert.equal(
          (
            await request(`admin/orders/${oid}/publish`, {
              actor: "owner",
              data: base,
            })
          ).status,
          200,
        );
        order = (await db.query("select * from awe_orders")).rows[0];
        const r = await site(
          new Request(`https://studio.example/sites/${order.slug}`),
        );
        assert.equal(r.status, 200);
        assert((await r.text()).includes("Reviewed by the owner"));
        assert.equal(
          (
            await site(
              new Request(
                `https://studio.example/sites/${order.slug}/assets/${aid}`,
              ),
            )
          ).status,
          200,
        );
        assert.equal(
          (
            await site(
              new Request(
                `https://studio.example/sites/${order.slug}/assets/${randomUUID()}`,
              ),
            )
          ).status,
          404,
        );
      },
    );
    await t.test("approved export is owner-gated and contains portable assets",async()=>{assert.equal((await request(`orders/${oid}/export`)).status,403);const r=await request(`admin/orders/${oid}/export`,{actor:'owner'});assert.equal(r.status,200);const files=unzipSync(new Uint8Array(await r.arrayBuffer()));assert(files['index.html']);assert(files['assets/'+aid+'.webp']);assert(!strFromU8(files['index.html']).includes('/api/assets/'));});
    await t.test(
      "email failure is retained and retry records successful acceptance",
      async () => {
        await runJobs(1);
        assert.equal(
          (await db.query("select * from awe_deliveries")).rows.length,
          0,
        );
        assert(
          (await db.query("select * from awe_jobs where kind='deliver'"))
            .rows[0].error,
        );
        emailFails = false;
        await db.exec(
          "update awe_jobs set available_at=now()-interval '1 minute' where kind='deliver'",
        );
        await runJobs(1);
        assert.equal(
          (await db.query("select * from awe_deliveries")).rows.length,
          1,
        );
        assert.equal(
          (await db.query("select status from awe_orders")).rows[0].status,
          "delivered",
        );
        assert.equal(emailCalls, 2);
      },
    );
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
          (await db.query("select * from awe_revisions")).rows.length,
          1,
        );
      },
    );
  } finally {
    globalThis.fetch = original;
    await db.close();
  }
});
