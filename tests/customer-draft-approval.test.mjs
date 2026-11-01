import test from "node:test";
import assert from "node:assert/strict";
import { PGlite } from "@electric-sql/pglite";
import { readFile,readdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";

test("publication requires a personally saved owner release followed by current customer approval",async()=>{
 const db=new PGlite();
 try{
  await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);");
  const files=await readdir("supabase/migrations");
  for(const suffix of ["_awe_platform.sql","_customer_draft_approval.sql","_owner_review_customer_acceptance.sql"]){
   const file=files.find(f=>f.endsWith(suffix));
   assert.ok(file,"Missing migration "+suffix);
   await db.exec(await readFile("supabase/migrations/"+file,"utf8"));
  }
  const oid=randomUUID(),owner=randomUUID(),customer=randomUUID(),stranger=randomUUID(),first=randomUUID(),second=randomUUID();
  await db.query("insert into awe_owner values($1)",[owner]);
  await db.query("insert into awe_orders(id,user_id,email,slug,input,package_snapshot,payment,status,draft_version) values($1,$2,'fictional@example.test','signoff','{}','{}','paid','awaiting_review',$3)",[oid,customer,first]);
  await db.query("insert into awe_versions(id,order_id,input,html) values($1,$2,'{}','<h1>Example</h1>')",[first,oid]);
  const accept=(v,actor=customer)=>db.query("select awe_customer_approve($1,$2,$3)",[oid,v,actor]);
  const release=(v,actor=owner,expected=0)=>db.query("select awe_owner_release($1,$2,$3,$4)",[oid,expected,v,actor]);
  await assert.rejects(accept(first),/studio-approved draft/);
  await assert.rejects(accept(first,stranger),/Order not found/);
  await assert.rejects(release(first,stranger),/Owner required/);
  await assert.rejects(release(first),/personally reviewed studio version/);
  // The owner must save this exact version personally before release.
  await db.query("insert into awe_events(order_id,actor,kind,details) values($1,$2,'draft_saved',jsonb_build_object('version',$3::uuid))",[oid,owner,first]);
  await release(first);
  let o=(await db.query("select * from awe_orders where id=$1",[oid])).rows[0];
  assert.equal(o.status,"customer_review");
  assert.equal(o.public_version,null);
  // A new owner edit invalidates prior preapproval and customer acceptance.
  await db.query("select awe_save_draft($1,$2,$3,$4,$5,$6,$7)",[oid,o.version,second,"{}","<!doctype html><h1>Updated</h1>","[]",owner]);
  await assert.rejects(accept(first),/studio-approved draft/);
  o=(await db.query("select * from awe_orders where id=$1",[oid])).rows[0];
  await release(second,owner,o.version);
  o=(await db.query("select * from awe_orders where id=$1",[oid])).rows[0];
  assert.equal(o.public_version,null);
  assert.equal((await db.query("select count(*)::int n from awe_approvals where order_id=$1",[oid])).rows[0].n,0);
  assert.equal((await accept(second)).rows[0].awe_customer_approve,true);
  o=(await db.query("select * from awe_orders where id=$1",[oid])).rows[0];
  assert.equal(o.status,"published");
  assert.equal(o.public_version,second);
  assert.equal((await db.query("select count(*)::int n from awe_approvals where order_id=$1",[oid])).rows[0].n,1);
  assert.equal((await db.query("select count(*)::int n from awe_jobs where order_id=$1 and kind='deliver'",[oid])).rows[0].n,1);
  await assert.rejects(accept(second),/studio-approved draft/);
  for(const role of ["anon","authenticated"]){
   await db.exec("set role "+role);
   await assert.rejects(accept(second),/permission denied/);
   await db.exec("reset role");
  }
 }finally{await db.close();}
});
