import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import legacy from '../netlify/functions/api.mjs';
import edge from '../supabase/functions/awe-api/netlify/functions/api.mjs';
import {sample} from '../shared/model.mjs';

for(const [name,api] of [['legacy',legacy],['edge',edge]]) {
 test(`${name}: forged template changes and disabled designs cannot lock or charge`, async()=>{
  const saved={...process.env}, original=globalThis.fetch;
  const oid=randomUUID(), uid=randomUUID(); let writes=0, templateEnabled=true;
  const pkg={name:'Starter',tier:'starter',amount:7500,currency:'usd',hosting:'Hosting',ownership:'Ownership',revisions:'One',refunds:'Policy',termsVersion:'v1'};
  const order={id:oid,user_id:uid,email:'fictional@example.test',payment:'unpaid',input:sample,package_snapshot:pkg,version:0};
  Object.assign(process.env,{SITE_ORIGIN:'https://aweconcepts.com',SUPABASE_URL:'https://db.example.test',SUPABASE_SERVICE_ROLE_KEY:'test',SUPABASE_PUBLISHABLE_KEY:'test',ORDERS_ENABLED:'true',LIVE_CHECKOUT_ENABLED:'true',STRIPE_LIVE_SECRET_KEY:'sk_live_fixture',STRIPE_LIVE_WEBHOOK_SECRET:'whsec_fixture'});
  globalThis.fetch=async(input,options={})=>{
   const url=new URL(input);
   assert.equal(url.hostname,'db.example.test','must not contact Stripe');
   if(url.pathname==='/auth/v1/user')return Response.json({id:uid,email:order.email,email_confirmed_at:'now'});
   if(options.method==='PATCH'||options.method==='POST'){writes++;throw Error('forged checkout must not write');}
   if(url.pathname.endsWith('/awe_orders'))return Response.json([order]);
   if(url.pathname.endsWith('/awe_templates'))return Response.json(templateEnabled?[{id:sample.template,enabled:true}]:[]);
   throw Error('Unexpected backend call '+url.pathname);
  };
  const request=input=>api(new Request(`https://aweconcepts.com/api/orders/${oid}/checkout`,{method:'POST',headers:{origin:'https://aweconcepts.com',authorization:'Bearer fixture',cookie:'__Host-awe=fixture','content-type':'application/json'},body:JSON.stringify({input})}));
  try{
   const swapped=await request({...sample,template:'md-bugatti'});
   assert.equal(swapped.status,409);assert.match((await swapped.json()).error,/design changed/);assert.equal(writes,0);
   const withinTier=await request({...sample,template:sample.template==='daylight'?'folio':'daylight'});
   assert.equal(withinTier.status,409);assert.equal(writes,0);
   templateEnabled=false;
   const disabled=await request(sample);assert.equal(disabled.status,409);assert.match((await disabled.json()).error,/no longer available/);assert.equal(writes,0);
  } finally {globalThis.fetch=original;for(const key of Object.keys(process.env))if(!(key in saved))delete process.env[key];Object.assign(process.env,saved);}
 });
}
