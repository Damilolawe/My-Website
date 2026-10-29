import test from 'node:test';
import assert from 'node:assert/strict';
import edge from '../supabase/functions/awe-api/platform/edge-router.mjs';
import {sample} from '../shared/model.mjs';
import {customerOrder} from '../supabase/functions/awe-api/shared/model.mjs';

test('customer private draft reads enforce payment, ownership, immutable version and page allowlist', async () => {
  const oid='11111111-1111-4111-8111-111111111111';
  const uid='22222222-2222-4222-8222-222222222222';
  const vid='33333333-3333-4333-8333-333333333333';
  const original=globalThis.fetch;
  const saved={...process.env};
  let customer=uid;
  let order={id:oid,user_id:uid,payment:'paid',status:'awaiting_review',draft_version:vid,input:{template:'index'}};
  let version={id:vid,order_id:oid,input:sample,html:'<!doctype html><html><body><h1>Immutable private draft</h1></body></html>'};
  const reply=x=>new Response(JSON.stringify(x),{headers:{'content-type':'application/json'}});
  Object.assign(process.env,{SUPABASE_URL:'https://db.example',SUPABASE_SERVICE_ROLE_KEY:'fake-server',SUPABASE_PUBLISHABLE_KEY:'fake-public'});
  globalThis.fetch=async (url)=>{
    const u=new URL(url);
    if(u.pathname==='/auth/v1/user')return reply({id:customer,email_confirmed_at:'now',email:'fixture@example.test'});
    if(u.pathname==='/rest/v1/awe_orders')return reply([order]);
    if(u.pathname==='/rest/v1/awe_versions') {
      assert.equal(u.searchParams.get('id'),'eq.'+vid);
      assert.equal(u.searchParams.get('order_id'),'eq.'+oid);
      return reply([version]);
    }
    throw Error('Unexpected request '+u.pathname);
  };
  const get=(query='')=>edge(new Request('https://db.example/functions/v1/awe-api/orders/'+oid+'/preview'+query,{headers:{Authorization:'Bearer fake-customer'}}));
  try {
    assert.equal((await get()).status,403,'owner-only draft must stay private');
    assert.equal(customerOrder(order).preview_ready,false);
    order={...order,status:'customer_review'};
    let r=await get(); assert.equal(r.status,200);
    assert.equal(r.headers.get('cache-control'),'private, no-store');
    assert.equal((await r.json()).html,version.html);
    assert.equal((await get('?page=../../admin.html')).status,404);
    customer='44444444-4444-4444-8444-444444444444';
    assert.equal((await get()).status,404);
    customer=uid;order={...order,payment:'unpaid'};
    assert.equal((await get()).status,409);
    order={...order,payment:'paid',draft_version:null};
    assert.equal((await get()).status,409);
    order={...order,draft_version:vid,input:{template:'index'}};
    version={...version,input:{...sample,template:'runwaymulti'}};
    r=await get('?page=journal.html'); assert.equal(r.status,200);
    assert.match((await r.json()).html,/<title>JOURNAL/);
    assert.equal(customerOrder(order).preview_ready,true);
    assert.equal(customerOrder({...order,payment:'refunded'}).preview_ready,false);
  } finally {
    globalThis.fetch=original;
    for(const k of Object.keys(process.env))if(!(k in saved))delete process.env[k];
    Object.assign(process.env,saved);
  }
});
