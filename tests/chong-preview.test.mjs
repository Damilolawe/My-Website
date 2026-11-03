import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read=name=>readFile(`branded-previews/public/chong/${name}`,"utf8");
test("CHONG redesign is accurate, multipage and independently labeled",async()=>{
  const [home,story,menu,css,js]=await Promise.all([read("index.html"),read("story.html"),read("menu.html"),read("styles.css"),read("site.js")]);
  for(const html of [home,story,menu]){
    assert.match(html,/Independent, unofficial redesign concept by Awe Concepts/i);
    assert.match(html,/not the official CHONG website/i);
    assert.match(html,/noindex,nofollow/i);
    assert.match(html,/Designed by <a href="https:\/\/aweconcepts\.com"/);
    assert.doesNotMatch(html,/<form\b/i);
    assert.doesNotMatch(html,/[🀀-🫿←-⇿☀-➿]/u);
    for(const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)){
      assert.ok(match[1]);
      if(match[0].includes('target="_blank"')) assert.match(match[0],/rel="noopener noreferrer"/);
    }
  }
  assert.match(home,/201 East 10th Street/);
  assert.match(home,/11:00 AM–9:00 PM/);
  assert.match(home,/@chongnyc/);
  assert.match(story,/five different teas from Thailand/i);
  for(const item of ["Chong Signature","Lychee Thai Tea","Chong Thai Tea Toast","Chong Bingsu","Panna Cotta"]) assert.ok(menu.includes(item));
  for(const asset of ["tea.webp","toast.webp","bingsu.webp","launch.webp","story-room.webp","story-portrait.webp","instagram.webp"]) assert.ok(home.includes(asset)||story.includes(asset)||menu.includes(asset));
  assert.match(css,/@media\(max-width:700px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(js,/IntersectionObserver/);
});
