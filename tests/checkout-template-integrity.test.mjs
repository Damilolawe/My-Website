import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {packageAllowsTemplate} from "../shared/tiers.mjs";
import {validate, sample} from "../shared/model.mjs";

const starter={tier:"starter",delivery:"awe-hosted",amount:7500,currency:"usd"};
const signature={tier:"signature",delivery:"awe-multipage",pageCount:5,amount:15000,currency:"usd"};

test("a valid five-page design is not eligible for the lower-priced Starter order",()=>{
  const paidStarterTemplate=validate({...sample,template:"daylight"}).template;
  const forgedCheckoutTemplate=validate({...sample,template:"md-bugatti"}).template;
  assert.equal(packageAllowsTemplate(starter,paidStarterTemplate),true);
  assert.equal(packageAllowsTemplate(starter,forgedCheckoutTemplate),false);
  assert.equal(packageAllowsTemplate(signature,forgedCheckoutTemplate),true);
  assert.notEqual(forgedCheckoutTemplate,paidStarterTemplate);
});

test("both checkout APIs reject template swaps and disabled designs before locking or charging",async()=>{
  for(const path of ["netlify/functions/api.mjs","supabase/functions/awe-api/netlify/functions/api.mjs"]){
    const source=await readFile(new URL("../"+path,import.meta.url),"utf8");
    const first=source.indexOf('if (action === "checkout")');
    const last=source.indexOf('if (action === "revision")',first);
    assert(first>0 && last>first, "checkout block exists in "+path);
    const checkout=source.slice(first,last);
    const validation=checkout.indexOf("const input = validate(b.input);");
    const lock=checkout.indexOf('const locked = await patch(');
    const session=checkout.indexOf("checkout.sessions.create(");
    assert(validation>=0 && lock>validation && session>lock,path);
    const guarded=checkout.slice(validation,lock);
    assert.match(guarded,/input\.template !== o\.input\?\.template/,path);
    assert.match(guarded,/!packageAllowsTemplate\(p, input\.template\)/,path);
    assert.match(guarded,/rows\("awe_templates", `id=eq\.\$\{input\.template\}&enabled=eq\.true`\)/,path);
    assert.match(guarded,/fail\("The selected design changed\./,path);
    assert.match(guarded,/fail\("This template is no longer available\./,path);
  }
});
