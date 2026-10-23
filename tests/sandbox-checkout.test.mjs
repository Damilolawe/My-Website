import test from 'node:test';
import assert from 'node:assert/strict';
import {sandboxCustomerAllowed,sandboxOrderAllowed} from '../shared/sandbox-checkout.mjs';
const now=Date.parse('2026-10-23T04:00:00Z');
const customer={id:'qa-customer'};
const settings={STRIPE_SECRET_KEY:'sk_test_fake',ORDERS_ENABLED:'false'};
const orderId='8ef68bc1-1a3e-491e-be2f-97095a954059';
const offer={testOnly:true,enabled:true,amount:100,currency:'usd',testCustomerId:customer.id,testOrderId:orderId,testExpiresAt:'2026-10-23T08:00:00Z'};
test('only the assigned saved draft can use the approved $1 sandbox offer while public ordering stays closed',()=>{
  assert.equal(sandboxCustomerAllowed(offer,customer,settings,now),true);
  assert.equal(sandboxOrderAllowed(offer,customer,orderId,settings,now),true);
  assert.equal(sandboxOrderAllowed(offer,customer,'00000000-0000-0000-0000-000000000000',settings,now),false);
  assert.equal(settings.ORDERS_ENABLED,'false');
});
test('anonymous and other customers cannot discover or use the QA offer',()=>{
  for(const user of [undefined,{}, {id:'other-customer'}]){
    assert.equal(sandboxCustomerAllowed(offer,user,settings,now),false);
    assert.equal(sandboxOrderAllowed(offer,user,orderId,settings,now),false);
  }
});
test('live credentials, altered amounts/currency, disabled offers, and expired windows fail closed',()=>{
  for(const patch of [{testOnly:false},{enabled:false},{amount:101},{currency:'eur'},{testExpiresAt:'bad'},{testExpiresAt:'2026-10-23T03:59:59Z'}])
    assert.equal(sandboxOrderAllowed({...offer,...patch},customer,orderId,settings,now),false);
  for(const key of [undefined,'sk_live_fake',''])
    assert.equal(sandboxOrderAllowed(offer,customer,orderId,{...settings,STRIPE_SECRET_KEY:key},now),false);
});
