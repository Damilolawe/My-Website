import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const src=await readFile(new URL('../app/order.mjs',import.meta.url),'utf8');
const checkout=src.slice(src.indexOf('async function checkout()'),src.indexOf('const isUuid='));
function scenario(prepare) {
  const calls=[], next={disabled:false,textContent:''}, back={hidden:false};
  const context={URL,Number,Error, catalog:{packages:[{id:'test',termsVersion:'qa-v1'}]},packageId:'test',
    orderId:null,draftId:'saved-draft',draftVersion:7,input:{content:{}},files:[],uploaded:[],
    selectedPackage:()=>({id:'test',termsVersion:'qa-v1'}),templateFitsTier:()=>true,selectedTier:'starter',
    $:(selector)=>selector==='#next'?next:back,
    api:async(path,body)=>{calls.push({path,body});return path.endsWith('/prepare')?prepare():{url:'https://checkout.stripe.com/test'};},
    location:{assign:(url)=>calls.push({redirect:url})}};
  vm.createContext(context); vm.runInContext(checkout,context);
  return {context,calls,next,back};
}
test('resumed checkout prepares the existing version and charges the same order without creating a duplicate',async()=>{
  const s=scenario(()=>({id:'saved-draft',version:8})); await s.context.checkout();
  assert.deepEqual(s.calls.map(c=>c.path||c.redirect),['drafts/saved-draft/prepare','orders/saved-draft/checkout','https://checkout.stripe.com/test']);
  assert.equal(s.calls[0].body.version,7); assert.equal(s.calls[0].body.consent,true);
  assert.equal(s.context.draftVersion,8); assert.equal(s.back.hidden,true);
});
test('a stale draft rejection prevents checkout and restores the button',async()=>{
  const s=scenario(()=>{throw Error('stale draft');});
  await assert.rejects(s.context.checkout(),/stale draft/);
  assert.equal(s.calls.length,1); assert.equal(s.next.disabled,false); assert.equal(s.context.orderId,null);
});
test('an unexpected prepared order cannot redirect to payment',async()=>{
  const s=scenario(()=>({id:'different-order',version:8}));
  await assert.rejects(s.context.checkout(),/could not prepare/);
  assert.equal(s.calls.length,1); assert.equal(s.context.orderId,null);
});
