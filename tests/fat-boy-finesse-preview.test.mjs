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
 for(const fragment of ["#live","#videos","#about","#podcast","#merch","#connect"]) assert.ok(html.includes(fragment),"Missing anchor "+fragment);
 assert.match(html,/https:\/\/fat-boy-finesse-shop\.fourthwall\.com\/products\/fat-boy-finesse-logo-t-shirt|https:\/\/fat-boy-finesse-shop\.fourthwall\.com\/products\/extraitvert-t-shirt/);
 assert.match(html,/https:\/\/podcasts\.apple\.com\/us\/podcast\/the-take-notes-podcast/);
 assert.match(html,/data-reveal/);
 assert.match(css,/@media\(max-width:640px\)/);
 assert.doesNotMatch(html+css,/[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF]/u);
});

test("the livestream stays linked to the creator's actual YouTube channel, with explicit fallback and refresh",async()=>{
 const [html,js,config]=await Promise.all([load(prefix+"index.html"),load(prefix+"site.js"),load("branded-previews/firebase.json")]);
 const channel="UC_-FXJoPsApGI_xV1SvRFNw";
 assert.match(html,new RegExp('https://www.youtube.com/embed/live_stream\\?channel='+channel));
 assert.match(html,new RegExp('https://www.youtube.com/channel/'+channel+'/live'));
 assert.match(html,/id="live-frame"/);
 assert.match(html,/id="refresh-live"/);
 assert.match(js,/refresh-live/);
 assert.match(js,/frame\.src=url\.toString\(\)/);
 assert.match(html,/may be unavailable between broadcasts/);
 assert.doesNotMatch(html,/LIVE NOW|CURRENTLY LIVE|STREAMING NOW/i);
 const csp=JSON.parse(config).hosting.headers.flatMap(x=>x.headers).find(x=>x.key==="Content-Security-Policy")?.value||"";
 assert.match(csp,/frame-src https:\/\/www\.youtube\.com/);
 assert.match(csp,/https:\/\/imgproxy\.fourthwall\.dev/);
});

test("the live published concept includes the YouTube player and single canonical Awe footer",async()=>{
 const html=await load(published+"index.html");
 assert.match(html,/live_stream\?channel=UC_-FXJoPsApGI_xV1SvRFNw/);
 assert.match(html,/THE LIVE ROOM/);
 assert.match(html,/Designed by <strong>Awe Concepts<\/strong>/);
 assert.equal((html.match(/data-awe-design-credit="v1"/g)||[]).length,1);
});
