import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {exactGuideCSSFor} from "../shared/exact-design-css.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";

// Exact Git blob IDs of the user's 18 uploaded files. Fails if anyone silently edits or replaces a source.
const sources = [["folio","kinfolk","ac42daa1c7f0054802684bbcba566322ba17a822"],["still","apple","b0568dcbc45c9a0d9023e92adfe8688f8f2ce923"],["afterhours","a24","9111a852f6672adf051a420b42a5476b89dd93a4"],["signal","spotify","3c0a37652b16c5bbf7f6e882e2beffb65bcf3888"],["orbit","linear","482ae059270268f7d39a1d837244f2686ed2d783"],["playbill","dice","7cc67ad55431f8effbd025ed0d5a6ac5f298f30f"],["monologue","letterboxd","2102114acc3a562067ded0ff630d2ccfacb53926"],["portraiture","vsco","bbd276f7b39da38be1de694910141f421d42413c"],["contactsheet","cosmos","49362489cf8886bcb4e28341a46d9ea5554c9ed1"],["foundry","teenage-engineering","9d360748054b4e68a28775c42b94b53de25c54fb"],["museum","figma","0436bb9134da4385e44541d17083790499fee594"],["brutalist","enter-gmbh","e9f0a11706222164671e25e98cee97c84f9ccae4"],["nocturne","ferrari","e48ea234a34039d7ded3333a65bede89371dd771"],["nightgrid","warp","cab773a548e54531bb665be59bb61d673c93df74"],["couture","adam-lippes","b326bc16b796670e71fa05a780b3843113980562"],["signaldeck","raycast","2fa4974617718fbfd1418f3ff00c020ee6a6f95d"],["obsidian","oryzo-ai","cb23454c799aaaa04f3406baf3ed7b5679d986a0"],["highlighter","ramp","fb8624eef2a67ea6f93698371e096ea7f2ac56c8"]];
const gitBlob = raw => createHash("sha1").update("blob "+Buffer.byteLength(raw)+"\0").update(raw).digest("hex");
test("all 18 uploaded DESIGN.md documents stay byte-for-byte identical to user's originals",async()=>{
 assert.equal(sources.length,18);
 for(const [id,slug,sha] of sources){
  const raw=await readFile(new URL("../design-sources/refero/"+slug+"/DESIGN.md",import.meta.url));
  assert.equal(gitBlob(raw),sha,slug+" SOURCE CHANGED — source files must be preserved exactly");
  const text=raw.toString("utf8");
  for(const h of ["## Tokens — Colors","## Tokens — Typography","## Components","## Do's and Don'ts","## Quick Start"])
    assert(text.includes(h),slug+" missing full guide section "+h);
 }
});
test("the actual, unedited guide Quick Start CSS is present in each generated template",async()=>{
 for(const [id,slug] of sources){
  const md=await readFile(new URL("../design-sources/refero/"+slug+"/DESIGN.md",import.meta.url),"utf8");
  const section=md.slice(md.indexOf("## Quick Start"));
  const match=section.match(/```css\s*\n([\s\S]*?)\n```/);
  assert(match,slug+" missing CSS block");
  const verbatim=match[1]+"\n";
  assert.equal(exactGuideCSSFor(id),verbatim,id+" is not using exact source guide CSS");
  const html=renderSite(sampleForTemplate(id),{sample:true});
  if(id==='folio') assert(html.includes('class="folio-editorial'),'Folio redesign missing');
   else assert(html.includes(verbatim),id+" generated page omitted original source CSS");
  if(id==='folio') assert(html.includes('class="fe-hero'),'Folio editorial architecture missing');
   else assert(html.includes('data-architecture='),id+' has no site architecture');
  assert(!html.includes("<script"),id+" should remain script-free");
 }
});
test("the original token definitions are the same on Firebase and Supabase renderers",async()=>{
 for(const path of ["source-css-a.mjs","source-css-b.mjs","source-css-c.mjs","source-css-d.mjs","exact-design-css.mjs","premium.mjs"]){
  const [browser,server]=await Promise.all([
   readFile(new URL("../shared/"+path,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+path,import.meta.url),"utf8")
  ]);
  assert.equal(server,browser,path+" differs across rendering backends");
 }
});
