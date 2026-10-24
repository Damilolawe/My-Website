import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {minimumTier,templateFitsTier} from "../shared/tiers.mjs";
import {renderSite} from "../shared/render.mjs";
import {originalDirections} from "../shared/refero-originals.mjs";

test("40 original, purchase-eligible designs include exactly 20 Starter and 20 additional Signature",()=>{
 assert.equal(templates.length,40);
 assert.equal(originalDirections.length,19);
 assert.equal(new Set(templates.map(t=>t.id)).size,40);
 assert.equal(templates.filter(t=>minimumTier(t.id)==="starter").length,20);
 assert.equal(templates.filter(t=>minimumTier(t.id)==="signature").length,20);
 assert.equal(templates.filter(t=>templateFitsTier(t.id,"signature")).length,40);
 assert.equal(templates.filter(t=>templateFitsTier(t.id,"premium")).length,40);
});

test("19 new architected demos are independent, script-free, responsive and safe to publish",()=>{
 const heroes=new Set();
 for(const t of originalDirections){
  const sample=sampleForTemplate(t.id,"Creative portfolio");
  const html=renderSite(sample,{sample:true});
  assert.match(html,/<h1 id="hero-title">/);
  assert(html.includes('class="shell-header shell-'+t.id+'"'),t.id+" missing themed navigation");
  assert(html.includes('class="shell-footer shell-footer-'+t.id+'"'),t.id+" missing themed footer");
  assert(html.includes('data-architecture="'+t.character+'"'),t.id+" missing architecture");
  assert(html.includes('mode-ref-'+t.id),t.id+" missing unique portfolio case layout");
  assert(html.includes('id="work"'),t.id+" missing work");
  assert(html.includes('contact-setup-note'),t.id+" missing honest contact setup");
  assert(html.includes('prefers-reduced-motion:reduce'),t.id+" missing accessible motion");
  assert(!/<script\b/i.test(html),t.id+" injected javascript");
  assert(!html.includes('images.unsplash.com'),t.id+" requires remote imagery");
  assert(html.length<200000,t.id+" cannot pass generation limit ("+html.length+")");
  heroes.add(html.match(/hero-variant (ref-[a-z]+)/)?.[1]);
 }
 assert.equal(heroes.size,19,"Original templates must have unique hero identities");
});

test("new designs render permitted customer media and escape HTML without fabricated outbound links",()=>{
 for(const dir of originalDirections){
  const config=sampleForTemplate(dir.id);
  config.content.name="<img src=x onerror=1>";
  config.content.headline="<script>bad()</script>";
  config.content.photoIds=["11111111-1111-4111-8111-111111111111"];
  config.content.cards=[{title:"Real project",description:"Published with permission",url:"javascript:alert(1)"}];
  const html=renderSite(config);
  assert(html.includes("&lt;img src=x onerror=1&gt;"),dir.id);
  assert(html.includes("&lt;script&gt;bad()&lt;/script&gt;"),dir.id);
  assert(html.includes("/api/assets/11111111-1111-4111-8111-111111111111"),dir.id);
  assert(!html.includes("<script>bad()</script>"),dir.id);
  assert(!html.includes("javascript:alert"),dir.id);
 }
});

test("each original designer's implementation brief exists and engine mirroring is exact",async()=>{
 const paths=["model.mjs","premium.mjs","theme-palette.mjs","tiers.mjs","reference-direction.mjs","refero-originals.mjs","site-shells.mjs","full-page-layouts.mjs"];
 for(const path of paths){
  const a=await readFile(new URL("../shared/"+path,import.meta.url),"utf8");
  const b=await readFile(new URL("../supabase/functions/awe-api/shared/"+path,import.meta.url),"utf8");
  assert.equal(a,b,path+" front-end/back-end mismatch");
 }
 for(const dir of originalDirections){
  const spec=await readFile(new URL("../docs/design-directions/"+dir.id+".md",import.meta.url),"utf8");
  assert(spec.includes("Original AWE Concepts DESIGN.md"),dir.id);
  assert(spec.includes(dir.id),dir.id);
 }
});
