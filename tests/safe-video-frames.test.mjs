import test from "node:test";
import assert from "node:assert/strict";
import { hasUnsafeExecutableMarkup } from "../platform/safe-video-frames.mjs";
import { sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";

test("trusted YouTube and Vimeo video iframes are allowed for reviewed sites",()=>{
  for(const template of ["folio","index","afterhours"]) {
    const input=sampleForTemplate(template);
    input.content.heroVideoUrl="https://www.youtube.com/watch?v=jfKfPfyJRdk";
    input.content.cards=[{title:"Short film",description:"Sample footage",videoUrl:"https://vimeo.com/1234567"}];
    const rendered=renderSite(input);
    assert(rendered.includes("<iframe"),template+" should render video frame");
    assert.equal(hasUnsafeExecutableMarkup(rendered),false,template+" valid video was rejected");
  }
});
test("unsafe iframe hosts, srcdoc, event handlers and executable tags remain rejected",()=>{
  const examples=[
    '<iframe src="https://evil.example" loading="lazy" title="fake" referrerpolicy="strict-origin-when-cross-origin" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>',
    '<iframe src="https://player.vimeo.com/video/123" loading="lazy" title="Video" referrerpolicy="strict-origin-when-cross-origin" allow="fullscreen; picture-in-picture" srcdoc="evil" allowfullscreen></iframe>',
    '<iframe src="https://www.youtube-nocookie.com/embed/jfKfPfyJRdk" loading="lazy" title="Video" referrerpolicy="strict-origin-when-cross-origin" allow="fullscreen; encrypted-media; picture-in-picture" onload="evil()" allowfullscreen></iframe>',
    '<iframe src="javascript:alert(1)"></iframe>',
    '<script src="evil.js"></script>',
    '<object data="evil.swf"></object>',
    '<div onerror="evil()"></div>',
    '<base href="https://evil.example">'
  ];
  for(const html of examples) assert.equal(hasUnsafeExecutableMarkup(html),true,html.slice(0,80));
});
