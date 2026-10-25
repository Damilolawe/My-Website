import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const code=await readFile(new URL('../motion-bootstrap.js',import.meta.url),'utf8');
async function boot(compact, failVendor=false) {
  const loads=[], events=[];
  const query={matches:compact,addEventListener(_,fn){this.changed=fn;}};
  const document={createElement:()=>({}),head:{append(script){loads.push(script.src);queueMicrotask(()=>{
    if(failVendor&&script.src.includes('/vendor/'))script.onerror();else script.onload();
  });}},dispatchEvent:e=>events.push(e.type)};
  await vm.runInNewContext(code,{document,matchMedia:()=>query,CustomEvent:class{constructor(type){this.type=type;}},console:{error(){}},queueMicrotask});
  return {loads,events,query};
}
test('desktop initializes engines before the same essential interaction scripts',async()=>{
  const result=await boot(false);
  assert.deepEqual(result.loads,['/vendor/gsap.min.js','/vendor/ScrollTrigger.min.js','/script.js','/cinema.js','/awe-relaunch.js']);
  assert.deepEqual(result.events,['awe:vendors-ready']);
});
test('mobile keeps all interaction scripts while avoiding unused desktop engines',async()=>{
  const result=await boot(true);
  assert.deepEqual(result.loads,['/script.js','/cinema.js','/awe-relaunch.js']);
  result.query.matches=false;result.query.changed();
  await new Promise(resolve=>setImmediate(resolve));
  assert.deepEqual(result.loads.slice(3),['/vendor/gsap.min.js','/vendor/ScrollTrigger.min.js']);
  assert(result.events.includes('awe:vendors-ready'));
});
test('a vendor failure cannot prevent ordering and homepage interactions from initializing',async()=>{
  const result=await boot(false,true);
  assert.deepEqual(result.loads.slice(-3),['/script.js','/cinema.js','/awe-relaunch.js']);
});
