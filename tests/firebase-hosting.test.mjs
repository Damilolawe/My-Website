import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

test("Firebase Spark deploy targets only generated public static assets",async()=>{
  const config=JSON.parse(await readFile("firebase.json","utf8"));
  assert.equal(config.hosting.public,"dist");
  assert.equal("functions" in config,false,"Hosting on Spark cannot deploy Cloud Functions");
  assert.deepEqual(config.hosting.rewrites,[{source:"/sites/**",destination:"/site-viewer.html"}],"Only public approved sites may use a static rewrite");
  assert.equal("redirects" in config.hosting,false,"Do not redirect private routes");
  assert(!JSON.stringify(config).includes("netlify/functions"));
  assert(!JSON.stringify(config.hosting.rewrites).includes("/api/"),"No private API rewrite");
});
test("Firebase headers preserve privacy barriers and sandboxed template previews",async()=>{
  const config=JSON.parse(await readFile("firebase.json","utf8"));
  const headers=Object.fromEntries(config.hosting.headers[0].headers.map(h=>[h.key,h.value]));
  assert.equal(headers["X-Frame-Options"],"DENY");
  assert(headers["Content-Security-Policy"].includes("frame-ancestors 'none'"));
  assert(headers["Content-Security-Policy"].includes("script-src 'self'"));
  assert.equal(headers["X-Content-Type-Options"],"nosniff");
  const preview=await readFile("shared/preview.mjs","utf8");
  assert(preview.includes("srcdoc")||preview.includes("public static HTML"));
});
test("automatic Firebase deployment requires project variable and private GitHub secret",async()=>{
  const source=await readFile(".github/workflows/firebase-hosting.yml","utf8");
  assert(source.includes("vars.FIREBASE_PROJECT_ID"));
  assert(source.includes("secrets.FIREBASE_SERVICE_ACCOUNT"));
  assert(source.includes("FIREBASE_READY == 'true'"));
  assert(source.includes("npm run build"));
  assert(source.includes("npm test"));
  assert(source.includes("channelId: live"));
  assert(!source.includes("Blaze"));
});
test("Firebase output contains site pages but never deploys Netlify server functions",async()=>{
  const build=await readFile("scripts/build.mjs","utf8");
  for(const name of ["index.html","why-awe.html","order.html","shared"]){
    assert(build.includes('"'+name+'"'));
  }
  assert(!build.includes('"netlify/functions"'));
});
