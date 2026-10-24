import test from "node:test";
import assert from "node:assert/strict";
import {normalize,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";

const PHOTO_A="11111111-1111-4111-8111-111111111111";
const PHOTO_B="22222222-2222-4222-8222-222222222222";
const PHOTO_C="33333333-3333-4333-8333-333333333333";

function configured(overrides={}){
  const sample=sampleForTemplate("folio");
  return {...sample,content:{...sample.content,
    name:"Orchid Studio",
    headline:"Shape the ideas that matter.",
    bio:"Crafting thoughtful stories.",
    photoIds:[PHOTO_A,PHOTO_B,PHOTO_C],
    cards:[{title:"First Project",description:"Identity experiment.",url:"https://example.org"},{title:"Second Project",description:"Architecture series."}],
    ...overrides}};
}

test("Folio uses the editorial layout in customer rendering",()=>{
  const html=renderSite(configured());
  assert.match(html,/folio-editorial/);
  assert.match(html,/id="hero-title"/);
  assert.match(html,/Shape the ideas/);
  assert.match(html,/Crafting thoughtful stories/);
  assert.match(html,/First Project/);
  assert.match(html,/Second Project/);
  assert.match(html,/--rust:#9f442f/);
  assert.match(html,/prefers-reduced-motion/);
  assert.match(html,/width=device-width/);
  assert.match(html,/id="work"/);
  assert.match(html,/id="contact"/);
  assert(!html.includes("images.unsplash.com/"),"Never publish sample imagery for a client");
  assert(!html.includes("FICTIONAL TEMPLATE DEMO"));
});
test("Folio maps uploaded photo IDs by customer-defined slot and does not embed unsafe paths",()=>{
  const html=renderSite(configured());
  assert(html.includes("/api/assets/"+PHOTO_A));
  assert(html.includes("/api/assets/"+PHOTO_B));
  assert(html.includes("/api/assets/"+PHOTO_C));
  assert(html.indexOf(PHOTO_A)<html.indexOf(PHOTO_B));
  assert(!html.includes("../../"));
});
test("Folio accepts only sanitized HTTPS project and video URLs",()=>{
  const input=configured({heroVideoUrl:"https://www.youtube.com/watch?v=jfKfPfyJRdk",
    cards:[{title:"Film",videoUrl:"https://vimeo.com/1234567",url:"javascript:alert(1)"},
      {title:"Motion",videoUrl:"https://example.com/reel.webm"}]});
  const normalized=normalize(input);
  assert.equal(normalized.content.cards[0].url,"");
  assert.equal(normalized.content.cards[0].videoUrl,"https://vimeo.com/1234567");
  const html=renderSite(input);
  assert(html.includes("youtube-nocookie.com/embed/jfKfPfyJRdk"));
  assert(html.includes("player.vimeo.com/video/1234567"));
  assert(html.includes("video/webm"));
  assert(!html.includes("javascript:alert"));
  assert(!html.includes("<script"));
});
test("Custom work, process and studio text is escaped, optional sections stay optional",()=>{
  const input=configured({name:"<script>alert(1)</script>",
    bio:"No fabricated claims",
    cards:[{title:"<img src=x onerror=alert(2)>",description:"Real & verified"}],
    services:[{title:"Design",description:"Discovery / craft"}]});
  input.design={...input.design,sections:["work","services","about"]};
  const html=renderSite(input);
  assert(html.includes("&lt;script&gt;"));
  assert(html.includes("&lt;img src=x onerror=alert(2)&gt;"));
  assert(!html.includes('<script'));
  assert(!html.includes('id="contact"'));
  assert(html.includes('id="services"'));
  assert(html.indexOf('id="work"')<html.indexOf('id="services"'));
  assert(html.indexOf('id="services"')<html.indexOf('id="about"'));
});
test("Folio demo has organic editorial sections and never needs emojis",()=>{
  const html=renderSite(sampleForTemplate("folio"),{sample:true});
  assert(html.includes("FICTIONAL TEMPLATE DEMO"));
  assert(html.includes("The Art of Stillness"));
  assert(html.includes("A Sense of Belonging"));
  assert(html.includes("The Unexpected"));
  assert(!/[\u{1F300}-\u{1FAFF}]/u.test(html));
});
