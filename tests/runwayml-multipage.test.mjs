import test from "node:test";
import assert from "node:assert/strict";
import {readFile,access} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";

const ROOT="dist/experiments/runwayml-multipage/";
const pages=["index.html","research.html","work.html","studio.html","journal.html"];
const read=(p)=>readFile(ROOT+p,"utf8");

test("RunwayML experimental preview creates five separate pages with real navigation",async()=>{
 const all=await Promise.all(pages.map(read));
 for(let i=0;i<pages.length;i++){
  const html=all[i];
  assert(html.startsWith("<!doctype html>"),pages[i]+" missing DOCTYPE");
  assert(html.includes("rw-header"),pages[i]+" missing original navigation");
  assert(html.includes("rw-footer"),pages[i]+" missing original footer");
  assert(html.includes('href="/experiments/runwayml-multipage/research.html"'));
  assert(html.includes('href="/experiments/runwayml-multipage/work.html"'));
  assert(html.includes('href="/experiments/runwayml-multipage/studio.html"'));
  assert(html.includes('href="/experiments/runwayml-multipage/journal.html"'));
  assert(html.includes('name="robots" content="noindex,nofollow"'));
  assert(html.includes('prefers-reduced-motion:reduce'));
  assert(html.includes("@media(max-width:640px)"));
  assert(html.includes("rw-zoom"));
  assert(html.includes("#e9ecf2"));
  assert(!html.includes("<script"),"Preview should never inject executable scripts");
  assert(!html.includes("style-src 'unsafe-eval'"));
  for(const href of [...html.matchAll(/href="([^"]+)"/g)].map(x=>x[1])) {
   if(href.startsWith("#")) assert(html.includes('id="'+href.slice(1)+'"'),pages[i]+" dead anchor "+href);
   if(href.startsWith("/experiments/runwayml-multipage/")){
    const suffix=href.slice("/experiments/runwayml-multipage/".length).split("#")[0];
    await access(ROOT+(suffix||"index.html"));
   }
  }
 }
});
test("Original RunwayML full-page template and its demo stay unchanged",async()=>{
 const original=await readFile("dist/templates/runwayml.html","utf8");
 const expected=renderSite(sampleForTemplate("runwayml"),{sample:true});
 assert.equal(original,expected,"Original one-page template must remain byte-identical");
 const experimentalHome=await read("index.html");
 assert(experimentalHome.includes('id="rw-h1"'));
 assert(experimentalHome.includes("rw-hero-content"));
 assert(experimentalHome.includes("rw-stills-stack"));
 assert(experimentalHome.includes("rw-light-feature"));
 assert(experimentalHome.includes("COMPARE THE ORIGINAL SINGLE-PAGE TEMPLATE"));
 assert(experimentalHome.includes('href="/templates/runwayml.html"'));
});
test("Every new subpage retains cinema-grade imagery, meaningful content and studio identity",async()=>{
 for(const file of pages.slice(1)){
  const html=await read(file);
  assert(html.includes("FRAME STUDIES"),file);
  assert(html.includes("rw-hero-content"),file);
  assert(html.includes("rw-picture"),file);
  assert(html.includes('alt="Original cinematic landscape study'),file);
  assert(html.includes("SCROLL TO DISCOVER"),file);
  assert(html.includes('href="/experiments/runwayml-multipage/"'),file);
  assert(html.includes('motion-expressive'),file);
  assert(!html.includes("javascript:"));
 }
 const journal=await read("journal.html");
 for(const anchor of ["story-1","story-2","story-3"])assert(journal.includes('id="'+anchor+'"'));
 const studio=await read("studio.html");
 assert(studio.includes('id="contact"'));
});
