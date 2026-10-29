import test from "node:test";
import assert from "node:assert/strict";
import {PGlite} from "@electric-sql/pglite";
import {readFile,readdir} from "node:fs/promises";
import {randomUUID} from "node:crypto";

async function database() {
 const db=new PGlite();
 await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);");
 const files=await readdir("supabase/migrations");
 for(const suffix of ["_awe_platform.sql","_customer_draft_approval.sql","_owner_first_review.sql"]) {
   const file=files.find(f=>f.endsWith(suffix));
   assert(file,"Missing migration "+suffix);
   await db.exec(await readFile("supabase/migrations/"+file,"utf8"));
 }
 return db;
}
async function order(db, owner, tier) {
 const oid=randomUUID(), uid=randomUUID(), v=randomUUID();
 const amount={starter:7500,signature:15000,premium:30000}[tier];
 await db.query("insert into awe_orders(id,user_id,email,slug,input,package_snapshot,payment,status,draft_version) values($1,$2,'customer@example.test',$3,'{}',$4,'paid','awaiting_review',$5)",[oid,uid,"project-"+oid,JSON.stringify({tier,amount}),v]);
 await db.query("insert into awe_versions(id,order_id,input,html) values($1,$2,'{}','<h1>Reviewed website</h1>')",[v,oid]);
 return {oid,uid,v,owner};
}
async function current(db,oid) {
 return (await db.query("select version,draft_version,status,public_version from awe_orders where id=$1",[oid])).rows[0];
}
async function studioRelease(db,o) {
 const x=await current(db,o.oid);
 await db.query("select awe_owner_release($1,$2,$3,$4)",[o.oid,x.version,x.draft_version,o.owner]);
}
async function revision(db,o) {
 const x=await current(db,o.oid);
 await db.query("select awe_customer_revision($1,$2,$3,$4)",[o.oid,x.draft_version,o.uid,"Please improve the heading and section spacing"]);
}
async function nextVersion(db,o) {
 const old=await current(db,o.oid), v=randomUUID();
 await db.query("select awe_save_draft($1,$2,$3,$4,$5,$6,$7)",[o.oid,old.version,v,"{}","<h1>Updated website</h1>","[]",o.owner]);
 o.v=v;
}
test("Owner-first release hides initial drafts and customer approval publishes exactly once",async()=>{
 const db=await database();
 try {
  const owner=randomUUID(); await db.query("insert into awe_owner values($1)",[owner]);
  const o=await order(db,owner,"signature");
  await assert.rejects(db.query("select awe_customer_approve($1,$2,$3)",[o.oid,o.v,o.uid]),/studio-approved/i);
  await assert.rejects(db.query("select awe_owner_release($1,0,$2,$3)",[o.oid,o.v,o.uid]),/Owner required/);
  await assert.rejects(studioRelease(db,o),/personally reviewed studio version/i);
  await nextVersion(db,o);
  await studioRelease(db,o);
  assert.equal((await current(db,o.oid)).status,"customer_review");
  await assert.rejects(db.query("select awe_customer_approve($1,$2,$3)",[o.oid,o.v,randomUUID()]),/Order not found/);
  assert.equal((await db.query("select awe_customer_approve($1,$2,$3) as published",[o.oid,o.v,o.uid])).rows[0].published,true);
  const published=await current(db,o.oid);
  assert.equal(published.public_version,o.v);
  assert.equal(published.status,"published");
  assert.equal((await db.query("select count(*)::int AS n from awe_jobs where kind='deliver' and order_id=$1",[o.oid])).rows[0].n,1);
  await assert.rejects(db.query("select awe_customer_approve($1,$2,$3)",[o.oid,o.v,o.uid]),/studio-approved/i);
  assert.equal((await db.query("select count(*)::int AS n from awe_jobs where kind='deliver' and order_id=$1",[o.oid])).rows[0].n,1);
 } finally {await db.close();}
});
test("Starter allows 1, Signature 3 and Premium unlimited customer revision requests",async()=>{
 const db=await database();
 try {
  const owner=randomUUID(); await db.query("insert into awe_owner values($1)",[owner]);
  for (const [tier,limit] of [["starter",1],["signature",3],["premium",5]]) {
   const o=await order(db,owner,tier);
   await assert.rejects(revision(db,o),/Current website is not available/);
   await nextVersion(db,o);
   for(let i=0;i<limit;i++){
     await studioRelease(db,o);
     await revision(db,o);
     assert.equal((await current(db,o.oid)).status,"revisions_required");
     await nextVersion(db,o);
   }
   await studioRelease(db,o);
   if(tier==="premium") await revision(db,o);
   else await assert.rejects(revision(db,o),/Package revision limit reached/);
   const row=(await db.query("select count(*)::int AS used from awe_revisions where order_id=$1",[o.oid])).rows[0];
   assert.equal(row.used,tier==="premium"?limit+1:limit);
   const usage=await db.query("select * from awe_customer_revision_usage($1)",[o.uid]);
   assert.equal(Number(usage.rows.find(row=>row.order_id===o.oid).used),row.used);
  }
 } finally {await db.close();}
});
