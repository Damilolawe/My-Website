import test from 'node:test';import assert from 'node:assert/strict';import {PGlite} from '@electric-sql/pglite';import {readFile,readdir} from 'node:fs/promises';import {randomUUID} from 'node:crypto';
const OWNER='220ddd21-710f-4dea-bc24-e34c8ba9cef8';
test('durable Work claims exclude duplicates, stale drafts, missing consent and unauthorized completion',async()=>{
 const db=new PGlite();try{
  await db.exec('create role anon;create role authenticated;create role service_role bypassrls;create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);');
  const files=await readdir('supabase/migrations');for(const suffix of ['_awe_platform.sql','_work_processing_claims.sql'])await db.exec(await readFile('supabase/migrations/'+files.find(f=>f.endsWith(suffix)),'utf8'));
  const oid=randomUUID(),vid=randomUUID(),run=randomUUID(),other=randomUUID();await db.query('insert into awe_owner values($1)',[OWNER]);
  await db.query("insert into awe_orders(id,user_id,email,slug,input,package_snapshot,payment,draft_version) values($1,$2,'synthetic@example.test','work-test','{}','{}','unpaid',$3)",[oid,randomUUID(),vid]);
  await db.query("insert into awe_versions(id,order_id,input,html) values($1,$2,'{}','<!doctype html><h1>Test</h1>')",[vid,oid]);
  const claim=(r=run,actor=OWNER,v=vid)=>db.query('select awe_work_claim($1,$2,$3,$4) as result',[oid,v,r,actor]);
  const result={provider:'chatgpt-library',fileId:'libfile_synthetic',sha256:'a'.repeat(64)};
  const finish=(r=run,res=result,failure=null,actor=OWNER)=>db.query('select awe_work_finish($1,$2,$3,$4,$5,$6) as result',[oid,vid,r,actor,res,failure]);
  await assert.rejects(claim(run,other),/Owner required/);await assert.rejects(claim(),/paid private draft/);
  await db.query("update awe_orders set payment='paid' where id=$1",[oid]);await assert.rejects(claim(),/consent/);
  await db.query(`update awe_orders set package_snapshot='{"aiProcessingConsent":{"granted":true,"policy":"chatgpt-work-v1"}}' where id=$1`,[oid]);
  const claims=await Promise.all([claim(),claim(other)]);assert.equal(claims.filter(x=>x.rows[0].result.acquired).length,1);assert.equal((await claim()).rows[0].result.acquired,false);
  assert.equal((await db.query('select count(*)::int as n from awe_work_runs')).rows[0].n,1);
  await assert.rejects(finish(other),/Matching processing claim/);await assert.rejects(finish(run,{provider:'public',fileId:'https://public.example',sha256:'a'.repeat(64)}),/Private result/);
  await assert.rejects(finish(run,{...result,url:'https://public.example'}),/Private result/);
  await db.query("update awe_orders set payment='refunded' where id=$1",[oid]);await assert.rejects(finish(),/Draft changed/);await db.query("update awe_orders set payment='paid' where id=$1",[oid]);
  await db.query("update awe_orders set package_snapshot='{}' where id=$1",[oid]);await assert.rejects(finish(),/consent/);await db.query(`update awe_orders set package_snapshot='{"aiProcessingConsent":{"granted":true,"policy":"chatgpt-work-v1"}}' where id=$1`,[oid]);
  assert.equal((await finish()).rows[0].result.state,'completed');assert.equal((await finish()).rows[0].result.state,'completed');assert.equal((await claim(other)).rows[0].result.state,'completed');
  const o=(await db.query('select * from awe_orders')).rows[0];assert.equal(o.public_version,null);assert.equal(o.draft_version,vid);assert.equal((await db.query("select count(*)::int as n from awe_events where kind='work_processing_completed'")).rows[0].n,1);
  for(const role of ['anon','authenticated']){await db.exec('set role '+role);await assert.rejects(db.query('select * from awe_work_runs'),/permission denied/);await assert.rejects(claim(),/permission denied/);await db.exec('reset role');}
 }finally{await db.close();}
});
