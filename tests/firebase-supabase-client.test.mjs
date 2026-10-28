import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createAweClient} from "../app/service-client.mjs";

function mockStorage() {
  const memory = new Map();
  return {
    getItem: k => memory.get(k) ?? null,
    setItem: (k, value) => memory.set(k, value),
    removeItem: k => memory.delete(k),
  };
}
function reply(data, status=200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"Content-Type": "application/json"},
  });
}
function makeClient(fetcher, now=()=>1000) {
  const storage=mockStorage();
  return createAweClient({getStorage:()=>storage,fetcher,now});
}

test("Firebase app API uses Supabase Edge Function, not nonfunctional /api/", async () => {
  const calls=[];
  const client=makeClient(async(url,options)=>{calls.push({url,options});return reply({packages:[],ordersEnabled:false});});
  const data=await client.api("catalog");
  assert.equal(data.ordersEnabled,false);
  assert.equal(calls.length,1);
  assert.match(calls[0].url,/\/functions\/v1\/awe-api\/catalog$/);
  assert(!calls[0].url.includes("awe-digital.web.app/api"));
  assert.equal(calls[0].options.credentials,"omit");
  assert(/^sb_publishable_/.test(calls[0].options.headers.apikey));
  assert.equal(calls[0].options.headers.Authorization,undefined);
});
test("Unauthenticated visitors cannot request protected account or owner APIs", async () => {
  let calls=0;
  const client=makeClient(async()=>{calls++;return reply({});});
  await assert.rejects(client.api("me"),/Sign in to continue/);
  await assert.rejects(client.api("admin/overview"),/Sign in to continue/);
  await assert.rejects(client.api("orders"),/Sign in to continue/);
  assert.equal(calls,0);
});
test("Email OTP login verifies user and authorizes account API with bearer JWT",async()=>{
  const calls=[];
  const client=makeClient(async(url,options)=>{
    calls.push({url,options});
    if(url.endsWith("/auth/v1/otp"))return reply({});
    if(url.endsWith("/auth/v1/verify"))return reply({
      user:{email_confirmed_at:"2026-10-22T00:00:00Z"},
      access_token:"test-access",refresh_token:"test-refresh",expires_in:3600,
    });
    if(url.includes("/functions/v1/"))return reply({email:"customer@example.test",admin:false});
    throw Error("Unexpected URL");
  });
  assert.deepEqual(await client.beginEmailSignIn("customer@example.test"),{ok:true});
  assert.deepEqual(await client.verifyEmailCode("customer@example.test","123456"),{ok:true});
  assert.equal((await client.api("me")).email,"customer@example.test");
  assert.deepEqual(JSON.parse(calls[0].options.body),{email:"customer@example.test",create_user:true});
  assert.deepEqual(JSON.parse(calls[1].options.body),{email:"customer@example.test",token:"123456",type:"email"});
  assert.equal(calls[2].options.headers.Authorization,"Bearer test-access");
  assert.equal(calls[2].options.credentials,"omit");
});
test("Expired JWT refreshes before owner requests and rotates stored tokens",async()=>{
  let time=1000, refreshes=0, lastHeader="";
  const store=mockStorage();
  const client=createAweClient({getStorage:()=>store,now:()=>time,fetcher:async(url,o)=>{
    if(url.endsWith("/auth/v1/verify"))return reply({
      user:{email_confirmed_at:"yes"},access_token:"before",refresh_token:"ref-before",expires_in:120,
    });
    if(url.includes("grant_type=refresh_token")){
      refreshes++;
      assert.equal(JSON.parse(o.body).refresh_token,"ref-before");
      return reply({access_token:"after",refresh_token:"ref-after",expires_in:3600});
    }
    if(url.includes("/functions/")){lastHeader=o.headers.Authorization;return reply({orders:[]});}
    throw Error("Unexpected URL");
  }});
  await client.verifyEmailCode("a@b.co","123456");
  time+=70_000;
  await client.api("admin/overview");
  assert.equal(lastHeader,"Bearer after");
  assert.equal(refreshes,1);
  assert.equal(client.session().refresh_token,"ref-after");
});
test("Logout clears client session, even if remote revocation fails",async()=>{
  const client=makeClient(async(url)=>{
    if(url.endsWith("/auth/v1/verify"))return reply({
      user:{email_confirmed_at:"yes"},access_token:"before",refresh_token:"ref",expires_in:3600,
    });
    throw Error("Network failure");
  });
  await client.verifyEmailCode("a@b.co","123456");
  assert(client.session());
  await client.logout();
  assert.equal(client.session(),null);
  await assert.rejects(client.api("admin/overview"),/Sign in to continue/);
});
test("Rejects untrusted API route destinations and invalid OTP data",async()=>{
  const client=makeClient(async()=>reply({}));
  await assert.rejects(client.api("../admin"),/Invalid API route/);
  await assert.rejects(client.api("orders//xyz"),/Invalid API route/);
  await assert.rejects(client.beginEmailSignIn("invalid-email"),/valid email/);
  await assert.rejects(client.verifyEmailCode("a@b.co","invalid"),/code from your email/);
});
test("AWE Firebase hosting CSP permits only its own Supabase API and doesn't allow scripts from random hosts",async()=>{
  const conf=JSON.parse(await readFile(new URL("../firebase.json",import.meta.url)));
  const policy=conf.hosting.headers[0].headers.find(h=>h.key==="Content-Security-Policy").value;
  assert(policy.includes("connect-src 'self' https://hxxplkirfsewqsxodngv.supabase.co;"));
  assert(policy.includes("script-src 'self';"));
  assert(!policy.includes("unsafe-eval"));
  const source=await readFile(new URL("../app/common.mjs",import.meta.url),"utf8");
  assert(source.includes("aweClient.api(path, data)"));
  assert(!source.includes('fetch("/api/"'));
});
test("Customer upload retains multipart FormData without forced JSON encoding",async()=>{
  let options;
  const client=makeClient(async(url,o)=>{
    if(url.endsWith("/auth/v1/verify"))return reply({user:{email_confirmed_at:"yes"},access_token:"ok",refresh_token:"r",expires_in:3600});
    options=o;return reply({id:"asset"});
  });
  await client.verifyEmailCode("a@b.co","123456");
  const form=new FormData();form.append("rights","true");
  const response=await client.api("orders/11111111-1111-4111-8111-111111111111/upload",form);
  assert.equal(response.id,"asset");
  assert.strictEqual(options.body,form);
  assert.equal(options.headers["Content-Type"],undefined);
});


test("private preview page selection permits only authenticated preview routes and known HTML pages",async()=>{
 const calls=[];
 const client=makeClient(async(url,options)=>{
  calls.push({url,options});
  if(url.endsWith("/auth/v1/verify"))return reply({user:{email_confirmed_at:"now"},access_token:"fixture-access",refresh_token:"fixture-refresh",expires_in:3600});
  return reply({html:"<!doctype html><h1>Private fixture</h1>"});
 });
 await client.verifyEmailCode("fixture@example.test","123456");
 const id="aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
 for(const prefix of ["orders/","admin/orders/"]){
  const route=prefix+id+"/preview?page=contact.html";
  assert.match((await client.api(route)).html,/Private fixture/);
  assert.equal(calls.at(-1).options.headers.Authorization,"Bearer fixture-access");
  assert(calls.at(-1).url.endsWith(route));
 }
 const before=calls.length;
 for(const route of ["orders/"+id+"/preview?page=../secret","orders/"+id+"/preview?page=index.html&token=secret","orders/"+id+"/preview?page=unknown.html","catalog?page=index.html","https://other.example/preview?page=index.html"])
  await assert.rejects(client.api(route),/Invalid API route/);
 assert.equal(calls.length,before);
});
