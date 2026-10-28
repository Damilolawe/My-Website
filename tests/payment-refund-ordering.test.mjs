import test from 'node:test';import assert from 'node:assert/strict';import {PGlite} from '@electric-sql/pglite';import {readFile,readdir} from 'node:fs/promises';import {randomUUID} from 'node:crypto';
test('out-of-order refund events cannot downgrade a full refund or enqueue another production job',async()=>{
 const db=new PGlite();try{
 await db.exec('create role anon;create role authenticated;create role service_role bypassrls;create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);');
 const migrations=await readdir('supabase/migrations');for(const suffix of ['_awe_platform.sql','_payment_refund_event_ordering.sql'])await db.exec(await readFile('supabase/migrations/'+migrations.find(f=>f.endsWith(suffix)),'utf8'));
 const oid=randomUUID();await db.query(`insert into awe_orders(id,user_id,email,slug,input,package_snapshot,stripe_session) values($1,$2,'fictional@example.test','refund-test','{}','{"amount":7500,"currency":"usd"}','cs_fixture')`,[oid,randomUUID()]);
 const event=(id,kind,amount=7500,currency='usd')=>db.query("select awe_payment($1,$2,'cs_fixture','pi_fixture',$3,$4,$5)",[id,oid,amount,currency,kind]);
 await assert.rejects(event('invalid','unknown'),/Invalid payment event/);await assert.rejects(event('null','paid',null),/Payment mismatch/);
 await event('paid','paid');await event('full','refunded');await event('late-partial','partially_refunded');await event('late-paid','paid');await event('full','refunded');
 assert.equal((await db.query('select payment from awe_orders')).rows[0].payment,'refunded');assert.equal((await db.query('select count(*)::int as n from awe_jobs')).rows[0].n,1);
 }finally{await db.close();}
});
