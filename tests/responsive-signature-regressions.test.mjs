import test from "node:test";
import assert from "node:assert/strict";
import {renderSite} from "../shared/render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
import {renderApprovedDesignPages} from "../shared/approved-pages.mjs";

// These are output-level regressions. The production browser workflow separately
// checks actual CSS layout and links at physical mobile/tablet viewports.
test("Bugatti demo carries its tablet-specific intrinsic artwork sizing",()=>{
  const html=renderSite(sampleForTemplate("md-bugatti","Professional portfolio"),{sample:true});
  assert.match(html, /@media\(min-width:651px\) and \(max-width:960px\)\{\.source-md-bugatti \.visual\{width:100%;max-width:100%;height:auto/);
  assert.match(html, /\.source-md-bugatti \.visual\{aspect-ratio:2\.3/);
});
test("Daylight render keeps readable tracking while retaining original tilt",()=>{
  const html=renderSite(sampleForTemplate("daylight","Professional portfolio"),{sample:true});
  assert.match(html, /body\.site\.daylight \.hero h1\{letter-spacing:-\.025em!important/);
  assert.match(html, /body\.daylight \.hero h1\{[^}]*transform:rotate\(-3deg\)/);
});
test("Signature bundles expose separate contact pages with owner-setup guidance",()=>{
  for(const id of ["md-bugatti","md-airbnb","md-notion"]){
    const pages=renderApprovedDesignPages(sampleForTemplate(id,"Professional portfolio"));
    assert.deepEqual(Object.keys(pages),["index.html","work.html","features.html","studio.html","contact.html"],id);
    assert.match(pages["index.html"], /href="\.\/contact\.html"/,id);
    assert.match(pages["contact.html"], /id="contact"/,id);
    assert.match(pages["contact.html"], /Contact details will be added by the site owner\./,id);
  }
});
