import test from 'node:test';
import assert from 'node:assert/strict';
import {PGlite} from '@electric-sql/pglite';
import {readFile,readdir} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';

test('notification reservation requires a paid consented private draft and bounds provider retries',async()=>{
 const db=new PGlite();
 try {
  await db.exec('create role anon; create role authenticated; create role service_role bypassrls; create schema storage; create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);');
  const migrations=await readdir('supabase/migrations');
  for(const suffix of ['_awe_platform.sql','_work_handoff_notification_reservation.sql'])
   await db.exec(await readFile('supabase/migrations/'+migrations.find(f=>f.endsWith(suffix)),'utf8'));
  const oid=randomUUID(),vid=randomUUID();
  await db.query("insert into awe_orders(id,user_id,email,slug,input,package_snapshot,payment) values($1,$2,'synthetic@example.test','synthetic','{}','{}','unpaid')",[oid,randomUUID()]);
  const reserve=()=>db.query('select awe_reserve_work_handoff($1,$2) as state',[oid,vid]);
  await assert.rejects(reserve(),/paid draft/);
  await db.query("update awe_orders set payment='paid',draft_version=$2 where id=$1",[oid,vid]);
  await assert.rejects(reserve(),/consent/);
  await db.query(`update awe_orders set package_snapshot='{"aiProcessingConsent":{"granted":true,"policy":"chatgpt-work-v1"}}' where id=$1`,[oid]);
  await assert.rejects(reserve(),/missing/);
  await db.query("insert into awe_versions(id,order_id,input,html) values($1,$2,'{}','<h1>Fictional</h1>')",[vid,oid]);
  assert.equal((await reserve()).rows[0].state,'send');
  assert.equal((await reserve()).rows[0].state,'send');
  assert.equal((await db.query("select count(*)::int as n from awe_events where kind='work_handoff_email_started'")).rows[0].n,1);
  await db.exec("update awe_events set created_at=now()-interval '21 hours'");
  assert.equal((await reserve()).rows[0].state,'manual-review');
  await db.query("insert into awe_events(order_id,kind,details) values($1,'work_handoff_email_accepted',jsonb_build_object('version',$2::text))",[oid,vid]);
  assert.equal((await reserve()).rows[0].state,'accepted');
  for(const role of ['anon','authenticated']){
   await db.exec('set role '+role);await assert.rejects(reserve(),/permission denied/);await db.exec('reset role');
  }
 } finally {await db.close();}
});
