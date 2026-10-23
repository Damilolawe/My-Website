// Public, no-credentials production CORS checks: runs from GitHub Actions.
import assert from "node:assert/strict";
const API="https://hxxplkirfsewqsxodngv.supabase.co/functions/v1/awe-api";
const allowed=["https://aweconcepts.com","https://www.aweconcepts.com","https://awe-digital.web.app"];
const routes=["me","catalog","admin/overview"];
const options=async (route,origin)=>{
  const response=await fetch(API+"/"+route,{
    method:"OPTIONS",
    headers:{
      Origin:origin,
      "Access-Control-Request-Method":"GET",
      "Access-Control-Request-Headers":"apikey,authorization,x-client-info,content-type"
    },
    signal:AbortSignal.timeout(16000)
  });
  return response;
};
for(const origin of allowed)for(const route of routes){
  const response=await options(route,origin);
  assert.equal(response.status,204,"Unexpected production preflight "+response.status+" "+origin+"/"+route);
  assert.equal(response.headers.get("access-control-allow-origin"),origin,
    "Missing allowed CORS response "+origin+"/"+route);
  assert.match(response.headers.get("access-control-allow-headers")||"",/authorization/);
  console.log("PASS OPTIONS",origin,route,response.status);
}
for(const origin of ["https://untrusted.example","null"]){
  const response=await options("me",origin);
  assert.equal(response.status,403,"Untrusted origin must not preflight successfully");
  assert.equal(response.headers.get("access-control-allow-origin"),null);
  console.log("PASS rejected OPTIONS",origin,response.status);
}
for(const route of ["me","admin/overview"]){
  const response=await fetch(API+"/"+route,{
    headers:{Origin:allowed[0]},
    signal:AbortSignal.timeout(16000)
  });
  assert.equal(response.status,401,"Unauthenticated private API returned "+response.status+" for "+route);
  assert.equal(response.headers.get("access-control-allow-origin"),allowed[0]);
  console.log("PASS unauthenticated GET denied",route,response.status);
}
const catalog=await fetch(API+"/catalog",{
  headers:{Origin:allowed[0]},
  signal:AbortSignal.timeout(16000)
});
assert.equal(catalog.status,200,"Public catalog unavailable");
assert.equal(catalog.headers.get("access-control-allow-origin"),allowed[0]);
console.log("PASS public catalog",catalog.status);
console.log("Production preflight and unauthenticated-access smoke checks passed.");
