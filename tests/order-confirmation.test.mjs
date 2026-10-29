import test from "node:test";
import assert from "node:assert/strict";
import {confirmationMessage, sendOrderConfirmation} from "../platform/confirmation.mjs";
import {confirmationMessage as edgeMessage, sendOrderConfirmation as edgeSend} from "../supabase/functions/awe-api/platform/confirmation.mjs";

const ref = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const order = {
  id:ref, payment:"paid", stripe_session:"cs_test_fixture",
  email:"client@example.test",
  package_snapshot:{name:'Starter <script>alert("x")</script>',revisions:"1 revision"}
};
const payment = {amount:0,currency:"usd",kind:"paid"};
const old = {...process.env};

test("customer confirmation renders exact discounted payment, revision policy and escaped HTML",()=>{
  for (const render of [confirmationMessage,edgeMessage]) {
    const msg=render(order,payment,"https://aweconcepts.com");
    assert.match(msg.subject,/Order confirmed/);
    assert.match(msg.text,/Amount charged: \$0\.00/);
    assert.match(msg.text,/Included revisions: 1 revision/);
    assert.match(msg.text,new RegExp(ref));
    assert.match(msg.text,/https:\/\/aweconcepts.com\/account.html/);
    assert.ok(!msg.html.includes("<script>alert"));
    assert.match(msg.html,/&lt;script&gt;/);
    assert.match(msg.html,/View your order/);
  }
});
test("unpaid orders and refunds never send confirmations",async()=>{
  for(const send of [sendOrderConfirmation,edgeSend]) {
    assert.equal(await send({...order,payment:"unpaid"}),false);
    assert.equal(await send({...order,payment:"refunded"}),false);
  }
});
test("verified paid order sends a single branded message and records provider acceptance",async()=>{
  const originalFetch=globalThis.fetch;
  const events=[],mail=[];
  Object.assign(process.env,{
    SITE_ORIGIN:"https://aweconcepts.com",
    SUPABASE_URL:"https://db.example.test",
    SUPABASE_SERVICE_ROLE_KEY:"server-test-only",
    SUPABASE_PUBLISHABLE_KEY:"publishable-test",
    EMAIL_FROM:"Awe Concepts <studio@example.test>",
    RESEND_API_KEY:"test-key"
  });
  let reservation="send";
  globalThis.fetch=async(input,options={})=>{
    const url=new URL(input);
    if(url.hostname==="api.resend.com"){
      const body=JSON.parse(options.body);
      mail.push({body,headers:options.headers});
      return Response.json({id:"resend_accepted_1"});
    }
    if(url.pathname==="/rest/v1/awe_payments")return Response.json([payment]);
    if(url.pathname==="/rest/v1/rpc/awe_reserve_order_confirmation")
      return Response.json(reservation);
    if(url.pathname==="/rest/v1/awe_order_confirmations" && options.method==="PATCH")
      return Response.json([{order_id:ref,state:"accepted"}]);
    if(url.pathname==="/rest/v1/awe_events" && options.method==="POST"){
      events.push(JSON.parse(options.body));return Response.json([{}]);
    }
    throw Error("Unexpected external request: "+url);
  };
  try {
    assert.equal(await sendOrderConfirmation(order),true);
    assert.equal(mail.length,1);
    assert.deepEqual(mail[0].body.to,["client@example.test"]);
    assert.equal(mail[0].body.reply_to,"contact@aweconcepts.com");
    assert.equal(mail[0].headers["Idempotency-Key"],"order-confirmation/"+ref);
    assert.equal(events[0].kind,"order_confirmation_email_accepted");
    reservation="accepted";
    assert.equal(await sendOrderConfirmation(order),false);
    assert.equal(await edgeSend(order),false);
    assert.equal(mail.length,1,"replayed order must not send another email");
    reservation="reconcile";
    await assert.rejects(sendOrderConfirmation(order),/reconciliation/);
    assert.equal(mail.length,1,"expired ambiguous sends must not retry");
  } finally {
    globalThis.fetch=originalFetch;
    for (const key of Object.keys(process.env)) if (!(key in old)) delete process.env[key];
    Object.assign(process.env,old);
  }
});
