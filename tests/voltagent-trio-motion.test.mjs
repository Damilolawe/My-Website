import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {trioCSS} from "../shared/voltagent-trio-styles.mjs";
import {trioMotionCSS} from "../shared/voltagent-trio-motion.mjs";

const designs={
 nike:{hero:"nike-hero",primary:"nk-sprint",ambient:"nk-track",decor:"nike-runline-inner",keyframes:["nk-sprint","nk-breathe","nk-track"]},
 clay:{hero:"clay-hero",primary:"cl-orb",ambient:"cl-bars",decor:"clay-spark s1",keyframes:["cl-left","cl-right","cl-orb"]},
 ferrari:{hero:"ferrari-hero",primary:"fr-lens",ambient:"fr-cue",decor:"ferrari-scroll-cue",keyframes:["fr-lens","fr-type","fr-line"]}
};
test("three independently art-directed motion grammars are visible and remain no-script",()=>{
 const styles=new Set();
 for(const [id,{hero,primary,ambient,decor,keyframes}] of Object.entries(designs)){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  const css=trioCSS(id);
  styles.add(trioMotionCSS(id));
  assert(html.includes('class="'+hero+' hero-variant"')||html.includes('class="'+hero+' hero-variant"')||html.includes(hero+" hero-variant"),id+" hero missing");
  assert(html.includes(decor),id+" distinctive animation markup missing");
  assert(html.includes("@keyframes "+primary),id+" primary motion missing");
  assert(html.includes("@keyframes "+ambient),id+" ambient motion missing");
  for(const name of keyframes) assert(css.includes("@keyframes "+name),id+" missing unique sequence "+name);
  assert(css.includes("prefers-reduced-motion:reduce"),id+" OS motion preference is ignored");
  assert(css.includes("motion-none"),id+" site-level no-animation setting ignored");
  assert(css.includes("animation-timeline:view()"),id+" scroll progress enhancement missing");
  assert(css.includes("@supports (animation-timeline:view())"),id+" progressive fallback missing");
  assert(!html.includes("<script"),id+" unexpected script");
  assert(css.length<40000,id+" CSS budget exceeded");
 }
 assert.equal(styles.size,3,"These must not be three copies of the same animation");
});
test("site-level motion setting can disable every entrance, ambient and scroll effect",()=>{
 for(const id of Object.keys(designs)){
  const v=sampleForTemplate(id);
  const off=renderSite({...v,design:{...v.design,animation:"none"}},{sample:true});
  assert(off.includes('motion-none"'),id+" missing motion-none override");
  assert(off.includes('.trio-site.motion-none *'),id+" override absent");
  assert(off.includes("animation:none!important"),id+" motion is not fully suppressible");
  assert(off.includes("animation-timeline:auto!important"),id+" scroll animation cannot be disabled");
  assert(off.includes("scroll-behavior:auto!important"),id+" scroll smoothness still forced");
 }
});
test("new decorative text and shapes are noninteractive and excluded from screen-reader reading",()=>{
 for(const id of Object.keys(designs)){
  const html=renderSite(sampleForTemplate(id),{sample:true});
  if(id==="nike"){
   assert(html.includes('class="nike-runline" aria-hidden="true"'));
   assert.equal((html.match(/MOVE FASTER/g)||[]).length>=8,true);
  }
  if(id==="clay"){
   for(const key of ["s1","s2","s3"])assert(html.includes('class="clay-spark '+key+'" aria-hidden="true"'));
  }
  if(id==="ferrari")assert(html.includes('class="ferrari-scroll-cue" aria-hidden="true"'));
  assert(html.includes('href="#work"'),id+" motion change broke navigation");
  assert(html.includes('id="contact"'),id+" motion change removed real contact");
 }
});
test("Supabase production renderer and Firebase frontend are byte-identical",async()=>{
 for(const filename of ["voltagent-trio.mjs","voltagent-trio-styles.mjs","voltagent-trio-motion.mjs"]){
  const [front,back]=await Promise.all([
   readFile(new URL("../shared/"+filename,import.meta.url),"utf8"),
   readFile(new URL("../supabase/functions/awe-api/shared/"+filename,import.meta.url),"utf8")
  ]);
  assert.equal(front,back,filename+" differs across rendering layers");
 }
});
test("client-published sites retain animation but never expose demo stock photography",()=>{
 for(const id of Object.keys(designs)){
  const site=renderSite(sampleForTemplate(id));
  assert(site.includes("trio-"+id));
  assert(site.includes("@keyframes "+designs[id].primary));
  assert(!site.includes("images.unsplash.com"),id+" exposed demo imagery");
  assert(!site.includes('class="trio-demo"'),id+" exposed demo label");
 }
});
