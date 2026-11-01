import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {applyAweDesignCredit,AWE_CREDIT_LINK} from "../shared/brand-credit.mjs";
import {renderSite} from "../shared/render.mjs";
import {renderZipDesign} from "../shared/zip-design-render.mjs";
import {renderApprovedDesignPages} from "../shared/approved-pages.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {zipDesignFor} from "../shared/zip-design-catalog.mjs";
const present=html=>{
 assert.equal((html.match(/data-awe-design-credit="v1"/g)||[]).length,1,"Exactly one credit");
 assert.match(html,/Designed by <strong>Awe Concepts<\/strong>/);
 assert.match(html,/href="https:\/\/aweconcepts\.com\/"/);
 assert.match(html,/aria-label="Designed by Awe Concepts/);
 assert.match(html,/<svg[^>]*aria-hidden="true"/);
 assert.match(html,/<path fill="#c6ff00"/);
 assert.match(html,/data-awe-credit-style="v1"/);
 assert.ok(html.indexOf('id="awe-design-credit"')<html.lastIndexOf("</body>"));
};
test("Awe Concepts credit is accessible, self-contained and idempotent",()=>{
 assert.equal(AWE_CREDIT_LINK,"https://aweconcepts.com/");
 const html='<!doctype html><html lang="en"><head></head><body><footer>Client footer</footer></body></html>';
 const result=applyAweDesignCredit(html);
 present(result);
 assert.equal(applyAweDesignCredit(result),result);
 assert.ok(result.indexOf("Client footer")<result.indexOf('id="awe-design-credit"'));
 assert.throws(()=>applyAweDesignCredit("<div>not a document</div>"),/malformed HTML/);
 assert.doesNotMatch(result,/<script|onload=|onclick=/i);
});
test("Starter, Folio, and premium renderers all include the credit",()=>{
 for(const id of ["afterhours","folio","runwayml","nike","clay","ferrari"]){
  present(renderSite({...sampleForTemplate(id),template:id},{sample:true}));
 }
});
test("source-guided and flagship template renderers include it on every page",()=>{
 for(const id of ["md-bugatti","md-mintlify","md-nintendo-2001","md-airbnb"]){
  const t=zipDesignFor(id);assert.ok(t);
  const v={...sampleForTemplate(id),template:id};
  for(const page of (t.multipage?["home","work","features","studio","contact"]:["home"]))present(renderZipDesign(v,{sample:true},page));
 }
});
test("approved five-page designs receive the credit BEFORE owner and customer sign-off",()=>{
 for(const id of ["runwaymulti","md-bugatti","md-airbnb"]){
  const pages=renderApprovedDesignPages({...sampleForTemplate(id),template:id},{assetBase:"/api/assets/"});
  assert.equal(Object.keys(pages).length,5);
  for(const html of Object.values(pages))present(html);
 }
});
test("Kappo Sono presents the brand credit on every page",async()=>{
 for(const file of ["index","menu","story","gallery","visit"])present(await readFile("preview/kappo-sono/"+file+".html","utf8"));
});
