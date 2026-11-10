import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const prefix="preview/fat-boy-finesse/";
const published="branded-previews/public/fat-boy-finesse/";
const load=async path=>readFile(path,"utf8");

test("Fat Boy Finesse creator concept uses original red, black, white identity and existing creator destinations",async()=>{
 const [html,css]=await Promise.all([load(prefix+"index.html"),load(prefix+"styles.css")]);
 assert.match(html,/Walter Jennette/);
 assert.match(css,/--red:#e01b2f/);
 assert.match(css,/--black:#101010/);
 assert.match(css,/--white:#fafaf8/);
 assert.match(html,/imgproxy\.fourthwall\.dev/);
 assert.match(html,/ugc\.production\.linktr\.ee/);
 for(const section of ["live","videos","about","podcast","merch","connect"]) assert.ok(html.includes('id="'+section+'"'),"Missing section "+section);
 assert.match(html,/https:\/\/fat-boy-finesse-shop\.fourthwall\.com\/products\/fat-boy-finesse-logo-t-shirt|https:\/\/fat-boy-finesse-shop\.fourthwall\.com\/products\/extraitvert-t-shirt/);
 assert.match(html,/https:\/\/podcasts\.apple\.com\/us\/podcast\/the-take-notes-podcast/);
 assert.match(html,/data-reveal/);
 assert.match(html,/embed\/videoseries\?list=UU_-FXJoPsApGI_xV1SvRFNw/);
 assert.match(html,/name="twitter:card"/);
 assert.doesNotMatch(html,/<span class="brand-art">/);
 assert.match(html,/class="creator-stage"/);
 assert.doesNotMatch(html,/class="bottle-stage"/);
 assert.match(css,/@media\(max-width:1100px\)/);
 assert.match(css,/@media\(max-width:640px\)/);
 assert.match(css,/@media\(max-width:640px\)/);
 assert.doesNotMatch(html+css,/[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF]/u);
});

test("compact watch room defaults to recent uploads and checks verified live state",async()=>{
 const [html,js,css,config]=await Promise.all([
  load(prefix+"index.html"),load(prefix+"site.js"),load(prefix+"styles.css"),load("branded-previews/firebase.json")
 ]);
 assert.match(html,/id="live-player"/);
 assert.match(html,/loading="eager"/);
 assert.match(html,/enablejsapi=1/);
 assert.match(html,/One player, two modes/);
 assert.doesNotMatch(html,/class="latest-player"/);
 assert.match(js,/setupMainPlayer/);
 assert.match(js,/event.target.mute\(\);event.target.playVideo\(\)/);
 assert.match(html,/embed\/videoseries\?list=UU_-FXJoPsApGI_xV1SvRFNw/);
 assert.match(html,/id="live-probe-host"/);
 assert.match(html,/id="live-state"/);
 assert.match(html,/LATEST UPLOAD/);
 assert.match(html,/youtube.com\/channel\/UC_-FXJoPsApGI_xV1SvRFNw\/live/);
 assert.match(js,/youtube.com\/iframe_api/);
 assert.match(js,/new window.YT.Player/);
 assert.match(js,/getLiveVideoId/);
 assert.match(js,/setMode\('live',liveVideoId\)/);
 assert.match(js,/setMode\('latest'\)/);
 assert.match(js,/visibilitychange/);
 assert.match(css,/\.live-set\{width:min\(100%,970px\)/);
 assert.doesNotMatch(html,/LIVE NOW|CURRENTLY LIVE|STREAMING NOW/i);
 const csp=JSON.parse(config).hosting.headers.flatMap(x=>x.headers).find(x=>x.key==="Content-Security-Policy")?.value||"";
 assert.match(csp,/script-src 'self' https:\/\/www.youtube.com/);
 assert.match(csp,/frame-src https:\/\/www.youtube.com/);
});

test("the live published concept includes the YouTube player and single canonical Awe footer",async()=>{
 const html=await load(published+"index.html");
 assert.match(html,/embed\/videoseries\?list=UU_-FXJoPsApGI_xV1SvRFNw/);
 assert.match(html,/THE WATCH ROOM/);
 assert.match(html,/Designed by <strong>Awe Concepts<\/strong>/);
 assert.equal((html.match(/data-awe-design-credit="v1"/g)||[]).length,1);
});
