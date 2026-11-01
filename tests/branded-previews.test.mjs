import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { KAPPO_PAGES } from "../scripts/rewrite-kappo-preview-urls.mjs";

const root = "branded-previews/";
const read = async path => readFile(root + path, "utf8");
const expectedFiles = ["404.html", "index.html", "robots.txt", "kappo-sono/styles.css", "kappo-sono/site.js", ...KAPPO_PAGES.map(name=>"kappo-sono/"+name),"otaku-haven/index.html","otaku-haven/styles.css","otaku-haven/site.js","shotsbyriq/index.html"].sort();

test("branded previews build exactly the allowlisted independent public concepts", async () => {
 execFileSync(process.execPath, ["scripts/build-branded-previews.mjs"], {stdio:"pipe"});
 const actual = [];
 const walk = async (base, prefix="") => {
  for (const entry of await readdir(base,{withFileTypes:true})) {
   const rel = prefix + entry.name;
   if(entry.isDirectory()) await walk(base + "/" + entry.name, rel + "/");
   else actual.push(rel);
  }
 };
 await walk(root+"public");
 assert.deepEqual(actual.sort(),expectedFiles);
 const landing=await read("public/index.html");
 assert.match(landing,/href="\/otaku-haven\/"/);
 assert.match(landing,/href="\/kappo-sono\/"/);
 assert.match(landing,/independent design studies/);
 assert.match(landing,/href="\\/shotsbyriq\\/"/);
 assert.match(landing,/noindex,nofollow/);
 assert.equal(await read("public/robots.txt"),"User-agent: *\nDisallow: /\n");
});

test("restaurant pages resolve logo, navigation, script and CSS on branded host", async () => {
 for(const name of KAPPO_PAGES){
  const html = await read("public/kappo-sono/"+name);
  assert.match(html,/href="\/kappo-sono\/styles.css"/);
  assert.match(html,/href="\/kappo-sono\/"/);
  assert.doesNotMatch(html,/\b(?:href|src)="\/(?:styles\.css|site\.js|menu\.html|story\.html|gallery\.html|visit\.html)"/);
  assert.match(html,/noindex/);
  if(name !== "404.html"){
   assert.match(html,/src="\/kappo-sono\/site.js"/);
   for(const page of ["menu","story","gallery","visit"])
    assert.ok(html.includes('href="/kappo-sono/'+page+'.html"'),name+" missing "+page);
  }
 }
});

test("photographer preview features actual portraits, booking and Awe credit", async () => {
 const html=await read("public/shotsbyriq/index.html");
 assert.match(html,/Independent portfolio concept by Awe Concepts/);
 assert.match(html,/app\.acuityscheduling\.com\/schedule\.php\?owner=30252037/);
 assert.match(html,/data:image\/webp;base64,/);
 assert.match(html,/Designed by <strong>Awe Concepts<\/strong>/);
 assert.match(html,/noindex, nofollow/);
 assert.match(html,/id="lightbox"/);
});

test("preview Firebase target is separate from production and not a private draft deployment", async () => {
 const production = JSON.parse(await readFile("firebase.json","utf8"));
 assert.equal(production.hosting.public,"dist");
 assert.equal(production.hosting.target,undefined);
 const config=JSON.parse(await read("firebase.json"));
 const rc=JSON.parse(await read(".firebaserc"));
 assert.equal(config.hosting.public,"public");
 assert.equal(config.hosting.target,"previews");
 assert.equal(rc.projects.default,"awe-digital");
 assert.deepEqual(rc.targets["awe-digital"].hosting.previews,["awe-concepts-previews"]);
 assert.ok(config.hosting.headers[0].headers.some(h=>h.key==="X-Robots-Tag"&&h.value.includes("noindex")));
 const workflow=await readFile(".github/workflows/branded-previews.yml","utf8");
 assert.match(workflow,/target: 'previews'/);
 assert.match(workflow,/entryPoint: 'branded-previews'/);
 assert.match(workflow,/channelId: live/);
 assert.doesNotMatch(workflow,/npm run build/);
});
