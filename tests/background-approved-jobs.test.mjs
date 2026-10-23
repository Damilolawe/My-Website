import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

test("Only successful, signed webhook responses can start background generation",async()=>{
 const source=await readFile(new URL("../supabase/functions/awe-api/platform/edge-router.mjs",import.meta.url),"utf8");
 assert.match(source,/if\(path==='stripe-webhook'\) \{/);
 assert.match(source,/const verified = await webhook\(req\)/);
 assert.match(source,/if \(verified\.ok\) startBackgroundJobs\(\);/);
 assert(!source.includes("if(path==='stripe-webhook')return webhook(req)"));
});
test("Only authenticated successfully approved publish routes can kick delivery",async()=>{
 const source=await readFile(new URL("../supabase/functions/awe-api/platform/edge-router.mjs",import.meta.url),"utf8");
 const handler=source.slice(source.indexOf("const response=await legacyApi("));
 assert(handler.includes("response.ok && req.method==='POST'"));
 assert(handler.includes("p.length===4"));
 assert(handler.includes("p[0]==='admin' && p[1]==='orders' && p[3]==='publish'"));
 assert(handler.includes("startBackgroundJobs()"));
 const legacy=await readFile(new URL("../supabase/functions/awe-api/netlify/functions/api.mjs",import.meta.url),"utf8");
 assert(legacy.includes('if (op === "publish")'));
 assert(legacy.includes('await rpc("awe_publish"'));
 const schema=await readFile(new URL("../supabase/migrations/20261022024259_awe_platform.sql",import.meta.url),"utf8");
 assert(schema.includes("not exists(select 1 from awe_owner where user_id=p_actor)"));
 assert(schema.includes("o.payment<>'paid'"));
 assert(schema.includes("insert into awe_jobs(order_id,kind,version_id) values(p_order,'deliver',p_version)"));
});
test("Supabase background work uses EdgeRuntime.waitUntil, bounded durable job claims",async()=>{
 const source=await readFile(new URL("../supabase/functions/awe-api/platform/edge-router.mjs",import.meta.url),"utf8");
 assert(source.includes('typeof EdgeRuntime.waitUntil !== "function"'));
 assert(source.includes("EdgeRuntime.waitUntil(task)"));
 assert(source.includes("runJobs(3).catch"));
 const worker=await readFile(new URL("../supabase/functions/awe-api/platform/production.mjs",import.meta.url),"utf8");
 assert(worker.includes('await rpc("awe_claim")'));
 assert(worker.includes("if (job.kind === \"deliver\")"));
 assert(worker.includes("await deliver(o, job.version_id)"));
 assert(worker.includes("Approval required."));
 assert(worker.includes("verifyPublication({"));
});
