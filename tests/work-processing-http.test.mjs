import test from 'node:test';import assert from 'node:assert/strict';import {randomUUID} from 'node:crypto';
import legacy from '../netlify/functions/api.mjs';import edge from '../supabase/functions/awe-api/netlify/functions/api.mjs';
const OWNER='220ddd21-710f-4dea-bc24-e34c8ba9cef8';
for(const [label,api] of [['legacy',legacy],['edge',edge]])test(`${label}: Work claim endpoints require owner authentication and validate references`,async()=>{
 const env={...process.env},original=globalThis.fetch,oid=randomUUID(),vid=randomUUID(),run=randomUUID();let owner=false,calls=0;
 Object.assign(process.env,{SITE_ORIGIN:'https://aweconcepts.com',SUPABASE_URL:'https://db.example.test',SUPABASE_SERVICE_ROLE_KEY:'fixture',SUPABASE_PUBLISHABLE_KEY:'fixture',OWNER_USER_ID:OWNER});
 globalThis.fetch=async(input,options={})=>{
  const u=new URL(input);assert.equal(u.hostname,'db.example.test');
  if(u.pathname==='/auth/v1/user')return Response.json({id:owner?OWNER:randomUUID(),email:owner?'contact@aweconcepts.com':'synthetic@example.test',email_confirmed_at:'now'});
  if(u.pathname.endsWith('/awe_owner'))return Response.json([{user_id:OWNER}]);
  if(u.pathname.endsWith('/awe_orders'))return Response.json([{id:oid,user_id:randomUUID()}]);
  if(u.pathname.endsWith('/rpc/awe_work_claim')){calls++;assert.deepEqual(JSON.parse(options.body),{p_order:oid,p_version:vid,p_run:run,p_actor:OWNER});return Response.json({state:'claimed',acquired:true});}
  throw Error('Unexpected request '+u.pathname);
 };
 const request=(auth=true,body={version:vid,runId:run})=>api(new Request(`https://aweconcepts.com/api/admin/orders/${oid}/work-claim`,{method:'POST',headers:{origin:'https://aweconcepts.com','content-type':'application/json',...(auth?{authorization:'Bearer fixture',cookie:'__Host-awe=fixture'}:{})},body:JSON.stringify(body)}));
 try{assert.equal((await request(false)).status,401);assert.equal((await request()).status,403);assert.equal(calls,0);owner=true;assert.equal((await request(true,{version:'bad',runId:run})).status,400);assert.equal(calls,0);const response=await request();assert.equal(response.status,200);assert.equal((await response.json()).acquired,true);assert.equal(calls,1);}finally{globalThis.fetch=original;for(const k of Object.keys(process.env))if(!(k in env))delete process.env[k];Object.assign(process.env,env);}
});
