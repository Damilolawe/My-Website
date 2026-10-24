import test from "node:test";
import assert from "node:assert/strict";
import { templates, sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";
import { premiumStudyIds, premiumStudyThemes } from "../shared/premium-art-direction-35.mjs";

const preserved = ["folio","liquidmetal","runwayml","runwaymulti","nike","clay","ferrari"];

test("all 35 upgrade targets have their own stylesheet; Folio and six opt-outs stay untouched",()=>{
  assert.equal(premiumStudyIds.length,35);
  assert.equal(new Set(premiumStudyIds).size,35);
  const catalog = new Set(templates.map(t=>t.id));
  for(const id of premiumStudyIds) {
    assert(catalog.has(id), "unknown target "+id);
    assert(!preserved.includes(id), "protected template was changed: "+id);
    assert(premiumStudyThemes[id].length>120, id+" lacks authored rules");
    const html = renderSite(sampleForTemplate(id),{sample:true});
    assert(html.includes('data-awe-design-study="'+id+'"'),id+" missing distinctive art direction");
    assert(html.length <= 200000, id+" exceeds the customer page size limit with "+html.length+" characters");
    assert(html.includes('prefers-reduced-motion'),id+" missing reduced motion");
    assert(html.includes('width=device-width'),id+" missing viewport");
    assert(!html.includes("<script"),id+" must remain script-free");
  }
  for(const id of preserved) {
    const html=renderSite(sampleForTemplate(id),{sample:true});
    assert(!html.includes("data-awe-design-study"),"Protected template altered: "+id);
    assert(!html.includes("awe-motion-chapter"),"Protected template motion injection: "+id);
  }
});

test("customer-owned photo and optional motion media do not leak into other templates",()=>{
  const IDs=["index","afterhours","arcade","acidchrome"];
  for(const id of IDs) {
    const input=sampleForTemplate(id);
    input.content.heroVideoUrl="https://www.youtube.com/watch?v=jfKfPfyJRdk";
    input.content.cards=[{title:"Real Project",description:"Client footage",videoUrl:"https://vimeo.com/1234567"}];
    const html=renderSite(input);
    assert(html.includes('id="motion"'),id+" missing motion section");
    assert(html.includes("https://www.youtube-nocookie.com/embed/jfKfPfyJRdk"));
    assert(html.includes("https://player.vimeo.com/video/1234567"));
    assert(!html.includes("images.unsplash.com"),id+" cannot place sample photos in customer output");
  }
});

test("unsafe or unsupported customer video links are never embedded",()=>{
  const urls=["javascript:alert(1)","https://youtube.com.evil.example/watch?v=jfKfPfyJRdk","https://example.com/file.svg","https://vimeo.com/not-a-number"];
  for(const url of urls) {
    const input=sampleForTemplate("index");
    input.content.heroVideoUrl=url;
    const html=renderSite(input);
    assert(!html.includes('id="motion"'),url+" must be rejected");
  }
  const input=sampleForTemplate("index");
  input.content.heroVideoUrl="https://media.example.com/reel.webm";
  const html=renderSite(input);
  assert(html.includes('type="video/webm"'));
});
