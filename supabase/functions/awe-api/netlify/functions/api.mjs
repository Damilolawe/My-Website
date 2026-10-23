import { sandboxOrderAllowed } from "../../shared/sandbox-checkout.mjs";
import { checkoutReservationState, checkoutPackageIsValid } from "../../shared/checkout-recovery.mjs";
import {
  env,
  isOwner,
  fail,
  ready,
  sb,
  rows,
  insert,
  patch,
  rpc,
  id,
  uuid,
  user,
  owned,
  origin,
  stripe,
  liveCheckoutConfigured,
  json,
  body,
  cookie,
} from "../../platform/backend.mjs";
import {
  templates,
  validate,
  normalize,
  text,
  customerOrder,
  assertOwner,
} from "../../shared/model.mjs";
import { saveDraft, runJobs } from "../../platform/production.mjs";
import { inspectUpload } from "../../platform/uploads.mjs";
import { previewResume } from "../../platform/resume.mjs";
import { exportApproved } from "../../platform/export.mjs";
async function owner(u) {
  if (!(await isOwner(u))) fail("Owner access required.", 403);
}
export default async function (req) {
  try {
    const path = new URL(req.url).pathname
      .replace(/^\/\.netlify\/functions\/api/, "/api")
      .slice(5)
      .split("/")
      .filter(Boolean);
    const [route, key, action] = path;
    const method = req.method;
    if (!["GET", "POST"].includes(method))
      return json({ error: "Method not allowed" }, 405);
    if (method === "POST") origin(req);
    if (route === "catalog" && method === "GET") {
      let packages = [],
        enabled = templates.map((t) => t.id);
      if (ready()) {
        packages = (await rows("awe_packages")).filter(p => p.data?.testOnly !== true).map((p) => ({
          id: p.id,
          ...p.data,
        }));
        enabled = (await rows("awe_templates", "enabled=eq.true")).map(
          (t) => t.id,
        );
      }
      return json({
        templates: templates.filter((t) => enabled.includes(t.id)),
        packages,
        accountsReady: ready(),
        ordersEnabled: liveCheckoutConfigured(),
        testMode: !liveCheckoutConfigured(),
        paymentMode: liveCheckoutConfigured() ? "live" : "closed",
        contact: env().PUBLIC_CONTACT_EMAIL || "",
      });
    }
    if (route === "auth" && method === "POST") {
      const b = await body(req, 2048);
      if (key === "logout")
        return json({ ok: true }, 200, { "Set-Cookie": cookie("", 0) });
      if (!ready()) fail("Account services are not configured yet.", 503);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email || ""))
        fail("Enter a valid email.");
      const verify = key === "verify";
      if (!verify && key !== "start") fail("Not found.", 404);
      if (verify && !/^\d{6,10}$/.test(b.token || ""))
        fail("Enter the code from your email.");
      const r = await fetch(
        env().SUPABASE_URL + `/auth/v1/${verify ? "verify" : "otp"}`,
        {
          method: "POST",
          headers: {
            apikey: env().SUPABASE_PUBLISHABLE_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            verify
              ? { type: "email", email: b.email, token: b.token }
              : { email: b.email, create_user: true },
          ),
          signal: AbortSignal.timeout(15000),
        },
      );
      if (!r.ok)
        fail(
          verify
            ? "Code expired or invalid. Request a new code."
            : "Unable to send a code right now. Please try later.",
          429,
        );
      if (!verify) return json({ ok: true });
      const v = await r.json();
      return json({ ok: true }, 200, {
        "Set-Cookie": cookie(v.access_token, v.expires_in),
      });
    }
    const u = await user(req);
    if (route === "resume" && key === "preview" && method === "POST") {
      if (Number(req.headers.get("content-length") || 0) > 4500000)
        fail("Résumé exceeds the 4 MB document limit.", 413);
      const fd = await req.formData();
      const file = fd.get("file");
      if (!file || !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type))
        fail("Choose a PDF or DOCX résumé.");
      const { bytes, mime } = await inspectUpload(file);
      return json(previewResume(bytes, mime));
    }
    const admin = await isOwner(u);
    if (route === "me") return json({ email: u.email, admin });
    if (route === "orders" && method === "GET" && !key)
      return json(
        (
          await rows(
            "awe_orders",
            `user_id=eq.${u.id}&order=created_at.desc&limit=100`,
          )
        ).map(customerOrder),
      );
    if (route === "orders" && method === "POST" && !key) {
      if (!liveCheckoutConfigured())
        fail("Orders are not open yet.", 503);
      const b = await body(req);
      const data = validate(b.input);
      const pkg = (
        await rows("awe_packages", `id=eq.${encodeURIComponent(b.packageId)}`)
      )[0];
      if (!pkg?.data.enabled) fail("This package is not available.");
      const p = pkg.data;
      if (p.testOnly === true) fail("Test checkout is limited to its assigned saved draft.", 403);
      if (
        !Number.isInteger(p.amount) ||
        p.amount <= 0 ||
        !p.hosting ||
        !p.ownership ||
        !p.revisions ||
        !p.termsVersion
      )
        fail("Package details are not ready.", 503);
      if (b.termsVersion !== p.termsVersion || b.consent !== true)
        fail("Review and accept the current package terms.");
      if (
        !(await rows("awe_templates", `id=eq.${data.template}&enabled=eq.true`))
          .length
      )
        fail("Template is not available.");
      if (
        (
          await rows(
            "awe_orders",
            `user_id=eq.${u.id}&payment=eq.unpaid&limit=5`,
          )
        ).length >= 5
      )
        fail("You have several unfinished orders. Please contact the studio.");
      const oid = id();
      await insert("awe_orders", {
        id: oid,
        user_id: u.id,
        email: u.email,
        slug: `${
          data.content.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .slice(0, 45)
            .replace(/^-|-$/g, "") || "portfolio"
        }-${oid.slice(0, 8)}`,
        input: data,
        package_snapshot: { id: pkg.id, ...p },
      });
      return json({ id: oid });
    }
    if (route === "orders" && key) {
      const o = await owned(key, u);
      if (method === "GET" && action === "export") {
        if (!o.package_snapshot.filesIncluded)
          fail("File transfer is not included in this package.", 403);
        return exportApproved(o);
      }
      if (method === "GET") return json(customerOrder(o));
      if (action === "upload") {
        if (o.checkout_at || o.stripe_session || o.payment !== "unpaid")
          fail(
            "Materials are locked for this checkout. Contact the studio for changes.",
            409,
          );
        if ((await rows("awe_assets", `order_id=eq.${o.id}`)).length >= 12)
          fail("Maximum 12 files per order.");
        if (Number(req.headers.get("content-length") || 0) > 4500000)
          fail("File too large.", 413);
        const fd = await req.formData();
        const file = fd.get("file");
        const { bytes, mime } = await inspectUpload(file);
        const aid = id(),
          path = `${o.id}/${aid}`;
        await sb(`/storage/v1/object/awe-private/${path}`, {
          method: "POST",
          headers: { "Content-Type": mime, "x-upsert": "false" },
          body: bytes,
        });
        await insert("awe_assets", {
          id: aid,
          order_id: o.id,
          path,
          mime,
          size: bytes.length,
          name: text(file.name, 150),
          public_allowed:
            mime.startsWith("image/") && fd.get("publish") === "true",
        });
        return json({ id: aid, mime });
      }
      if (action === "checkout") {
        const qaAllowed = sandboxOrderAllowed(o.package_snapshot, u, o.id, env());
        if (o.package_snapshot?.testOnly === true && !qaAllowed) fail("This test checkout is not available.", 403);
        if (!liveCheckoutConfigured() && !qaAllowed) fail("Orders are not open yet.", 503);
        const stripeClient = stripe(qaAllowed ? "test" : "live"); // Separate payment environments.
        if (o.payment !== "unpaid") fail("This order has already been paid.");
        if (o.stripe_session) {
          const previous = await stripeClient.checkout.sessions.retrieve(
            o.stripe_session,
          );
          if (previous.status === "open" && previous.url)
            return json({ url: previous.url });
          fail(
            "This checkout is closed. Contact the studio before creating another order.",
            409,
          );
        }
        const p = o.package_snapshot;
        if (!checkoutPackageIsValid(p))
          fail("Package terms are incomplete; checkout is unavailable.", 503);
        const reservation = checkoutReservationState(o);
        if (reservation === "manual-review")
          fail("This checkout needs studio review before retrying. Contact the studio.", 409);
        if (reservation === "new") {
          const b = await body(req);
          const input = validate(b.input);
          const assets = await rows("awe_assets", `order_id=eq.${o.id}`);
          if (
            input.content.photoIds.some(
              (a) => !assets.some((x) => x.id === a && x.public_allowed),
            )
          )
            fail("Invalid portfolio image.");
          // Reserve an immutable payload before talking to Stripe. Concurrency cannot alter the paid order.
          const locked = await patch(
            "awe_orders",
            `id=eq.${o.id}&checkout_at=is.null&version=eq.${o.version}`,
            {
              input,
              checkout_at: new Date().toISOString(),
              version: o.version + 1,
            },
          );
          if (!locked.length) fail("This order changed. Reload before checkout.", 409);
        }
        const session = await stripeClient.checkout.sessions.create(
          {
            mode: "payment",
            integration_identifier: "awe_express_" + o.id.slice(0, 8).replace(/[0-9a-f]/g, (c) => "abcdefghijklmnop"[parseInt(c, 16)]),
            client_reference_id: o.id,
            customer_email: o.email,
            line_items: [
              {
                price_data: {
                  currency: p.currency,
                  unit_amount: p.amount,
                  product_data: { name: p.name },
                },
                quantity: 1,
              },
            ],
            metadata: { order_id: o.id },
            success_url: `${env().SITE_ORIGIN}/account.html?order=${o.id}`,
            cancel_url: `${env().SITE_ORIGIN}/account.html?order=${o.id}`,
          },
          { idempotencyKey: qaAllowed ? `checkout-qa-v2-${o.id}` : `checkout-live-${o.id}` },
        );
        if (!session?.id || !session?.url || session.status !== "open")
          fail("Stripe did not return an open checkout. Contact the studio.", 502);
        const recorded = await patch(
          "awe_orders",
          `id=eq.${o.id}&checkout_at=not.is.null&stripe_session=is.null&payment=eq.unpaid`,
          { stripe_session: session.id },
        );
        if (!recorded.length) {
          // A concurrent request may already have saved the same session.
          const latest = (await rows("awe_orders", `id=eq.${o.id}`))[0];
          if (latest?.stripe_session !== session.id)
            fail("Checkout reconciliation needs studio review.", 409);
        }
        return json({ url: session.url });
      }
      if (action === "revision") {
        if (!o.public_version) fail("Revisions open after publication.");
        const b = await body(req, 8000);
        const message = text(b.message, 4000);
        if (message.length < 5) fail("Describe the changes you would like.");
        await insert("awe_revisions", { id: id(), order_id: o.id, message });
        return json({ ok: true });
      }
    }
    if (route === "briefs" && method === "POST") {
      const b = await body(req, 12000);
      if (!text(b.idea)) fail("Describe your project.");
      await insert("awe_briefs", {
        id: id(),
        user_id: u.id,
        email: u.email,
        content: {
          idea: text(b.idea, 5000),
          budget: text(b.budget, 300),
          timing: text(b.timing, 300),
        },
      });
      return json({ ok: true });
    }
    if (route === "assets" && method === "GET") {
      await owner(u);
      const a = (await rows("awe_assets", `id=eq.${uuid(key)}`))[0];
      if (!a) fail("Not found.", 404);
      const r = await sb(`/storage/v1/object/awe-private/${a.path}`, {
        headers: { "Content-Type": a.mime },
      });
      return new Response(await r.arrayBuffer(), {
        headers: {
          "Content-Type": a.mime,
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
          "Content-Disposition": a.mime.startsWith("image/")
            ? "inline"
            : 'attachment; filename="customer-document"',
          "Content-Security-Policy": "default-src 'none'; sandbox",
        },
      });
    }
    if (route === "admin") {
      await owner(u);
      if (key === "overview") {
        const [orders, packages, briefs, jobs, templateSettings] =
          await Promise.all([
            rows("awe_orders", "order=created_at.desc&limit=500"),
            rows("awe_packages"),
            rows("awe_briefs", "order=created_at.desc&limit=100"),
            rows("awe_jobs", "done=eq.false&limit=100"),
            rows("awe_templates"),
          ]);
        return json({
          orders,
          packages,
          briefs,
          jobs,
          templates: templateSettings,
        });
      }
      if (key === "run-jobs" && method === "POST") {
        await runJobs(3);
        return json({ ok: true });
      }
      if (key === "retry" && method === "POST") {
        const b = await body(req);
        const jid = Number(b.id);
        if (!Number.isSafeInteger(jid)) fail("Invalid job.");
        await patch("awe_jobs", `id=eq.${jid}&done=eq.false`, {
          attempts: 0,
          available_at: new Date().toISOString(),
          error: null,
        });
        return json({ ok: true });
      }
      if (key === "packages" && method === "POST") {
        const b = await body(req);
        if (!/^[a-z0-9-]{2,40}$/.test(b.id)) fail("Invalid package ID.");
        if (!Number.isInteger(b.amount) || b.amount < 1 || b.amount > 1000000)
          fail("Enter a price in minor currency units.");
        if (!["usd", "eur", "gbp", "cad", "aud"].includes(b.currency))
          fail("Supported currencies: usd, eur, gbp, cad, aud.");
        const data = {
          name: text(b.name, 100),
          enabled: b.enabled === true,
          amount: b.amount,
          currency: b.currency,
          features: (b.features || []).map((x) => text(x, 200)).slice(0, 20),
          hosting: text(b.hosting, 2000),
          ownership: text(b.ownership, 2000),
          revisions: text(b.revisions, 2000),
          delivery: "awe-hosted",
          filesIncluded: b.filesIncluded === true,
          termsVersion: id(),
        };
        if (
          data.enabled &&
          (!data.hosting || !data.ownership || !data.revisions)
        )
          fail("Fill all business terms before enabling.");
        await sb("/rest/v1/awe_packages?on_conflict=id", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates" },
          body: JSON.stringify({ id: b.id, data }),
        });
        await insert("awe_events", {
          actor: u.id,
          kind: "package_updated",
          details: { id: b.id },
        });
        return json({ ok: true });
      }
      if (key === "templates" && method === "POST") {
        const b = await body(req);
        if (!templates.some((t) => t.id === b.id)) fail("Unknown template.");
        await patch("awe_templates", `id=eq.${b.id}`, {
          enabled: b.enabled === true,
        });
        return json({ ok: true });
      }
      if (key === "orders" && action) {
        const o = await owned(action, u, true);
        const op = path[3];
        if (method === "GET" && op === "export") return exportApproved(o);
        if (method === "GET" && !op) {
          const [assets, versions, events, revisions, deliveries] =
            await Promise.all([
              rows("awe_assets", `order_id=eq.${o.id}`),
              rows(
                "awe_versions",
                `order_id=eq.${o.id}&select=id,created_at&order=created_at.desc`,
              ),
              rows("awe_events", `order_id=eq.${o.id}&order=created_at.desc`),
              rows("awe_revisions", `order_id=eq.${o.id}`),
              rows("awe_deliveries", `order_id=eq.${o.id}`),
            ]);
          return json({
            order: o,
            assets,
            versions,
            events,
            revisions,
            deliveries,
          });
        }
        if (op === "preview" && method === "GET") {
          const v = (
            await rows(
              "awe_versions",
              `id=eq.${o.draft_version || "00000000-0000-0000-0000-000000000000"}&order_id=eq.${o.id}`,
            )
          )[0];
          if (!v) fail("No draft yet.", 404);
          return new Response(v.html, {
            headers: {
              "Content-Type": "text/html",
              "Cache-Control": "private, no-store",
              "X-Frame-Options": "SAMEORIGIN",
              "Content-Security-Policy":
                "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'; sandbox allow-same-origin",
            },
          });
        }
        if (op === "upload" && method === "POST") {
          const fd = await req.formData();
          if (fd.get("rights") !== "true")
            fail("Confirm permission to publish the image.");
          const file = fd.get("file");
          const { bytes, mime } = await inspectUpload(file);
          if (!mime.startsWith("image/")) fail("Choose a photograph.");
          const aid = id(),
            path = `${o.id}/${aid}`;
          await sb(`/storage/v1/object/awe-private/${path}`, {
            method: "POST",
            headers: { "Content-Type": mime, "x-upsert": "false" },
            body: bytes,
          });
          await insert("awe_assets", {
            id: aid,
            order_id: o.id,
            path,
            mime,
            size: bytes.length,
            name: text(file.name, 150),
            public_allowed: true,
          });
          await insert("awe_events", {
            order_id: o.id,
            actor: u.id,
            kind: "image_uploaded",
            details: { asset: aid },
          });
          return json({ ok: true });
        }
        if (method === "POST") {
          const b = await body(req);
          if (b.version !== o.version)
            fail("This order changed. Reload before editing.", 409);
          if (op === "save") {
            await saveDraft(o, b.input, u.id);
            return json({ ok: true });
          }
          if (op === "restore") {
            const v = (
              await rows(
                "awe_versions",
                `id=eq.${uuid(b.versionId)}&order_id=eq.${o.id}`,
              )
            )[0];
            if (!v) fail("Version not found.", 404);
            await saveDraft(o, v.input, u.id);
            return json({ ok: true });
          }
          if (op === "reject") {
            await rpc("awe_reject", {
              p_order: o.id,
              p_expected: o.version,
              p_actor: u.id,
              p_note: text(b.note),
            });
            return json({ ok: true });
          }
          if (op === "publish") {
            if (b.confirm !== o.id)
              fail("Confirm this exact order before publishing.");
            await rpc("awe_publish", {
              p_order: o.id,
              p_expected: o.version,
              p_version: o.draft_version,
              p_actor: u.id,
            });
            return json({ url: `/sites/${o.slug}` });
          }
        }
      }
    }
    return json({ error: "Not found" }, 404);
  } catch (e) {
    console.error("AWE API failure classification", JSON.stringify({name:e.name,type:e.type,code:e.code,param:e.param,status:e.status || e.statusCode,requestId:e.requestId}));
    return json(
      {
        error: e.status
          ? e.message
          : "The operation could not be completed. Please try again.",
      },
      e.status || 500,
    );
  }
}

export const config = {
  rateLimit: {
    action: "rate_limit",
    aggregateBy: "ip",
    windowSize: 60,
    windowLimit: 90,
  },
};


