import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {renderSite} from "../shared/render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");

test("Signal / Noise preserves its editorial layout while containing the mobile masthead",async()=>{
 const css=await read("shared/site-shell-styles.mjs");
 const edge=await read("supabase/functions/awe-api/shared/site-shell-styles.mjs");
 assert.equal(css,edge,"browser and Edge generator must agree");
 assert(css.includes("@media(max-width:600px)"));
 assert(css.includes(".signal .shell-signal{transform:none;max-width:100%}"));
 assert(css.includes(".shell-signal{width:100%;"));
 assert(css.includes("transform:rotate(-1deg)"),"Desktop masthead angle stays intact");
 const html=renderSite(sampleForTemplate("signal"),{sample:true});
 assert(html.includes(".signal .shell-signal{transform:none;max-width:100%}"));
});

test("Homepage GSAP never tries to animate missing template choice nodes",async()=>{
 const homepage=await read("script.js");
 assert(homepage.includes("if($$('.worlds-choice').length)gsap.from('.worlds-choice'"));
 assert(homepage.includes("if($('.worlds-screen')&&$('.worlds-layout'))gsap.from('.worlds-screen'"));
 assert(homepage.includes("if($('.worlds-title'))gsap.from('.worlds-title'"));
 const relaunch=await read("awe-relaunch.js");
 assert(relaunch.includes('if(document.querySelector(".awe-impact-statement h2 span")'));
 const cinema=await read("cinema.js");
 assert(cinema.includes('document.querySelector(".transformation-head h2")'));
});

test("Unstable cross-document View Transition opt-in is removed but local motion survives",async()=>{
 const css=await read("studio.css");
 const js=await read("script.js");
 assert(!css.includes("@view-transition{navigation:auto}"));
 assert(css.includes("Cross-document navigation uses the native fallback"));
 assert(js.includes("gsap.context"));
 assert(js.includes("scrollTrigger"));
 assert(js.includes("window.AWE_MOTION_PAUSED"));
});

test("Client authorizes only the confirmed owner; payment never auto-publishes",async()=>{
 const backend=await read("supabase/functions/awe-api/platform/backend.mjs");
 const router=await read("supabase/functions/awe-api/platform/edge-router.mjs");
 const production=await read("supabase/functions/awe-api/platform/production.mjs");
 assert(backend.includes('u.id !== STUDIO_OWNER_USER_ID'));
 assert(backend.includes('STUDIO_OWNER_EMAIL = "contact@aweconcepts.com"'));
 assert(backend.includes('rows("awe_owner"'));
 assert(router.includes("await isOwner(u)"));
 assert(production.includes('rows("awe_approvals"'));
 assert(production.includes("o.public_version !== version"));
 assert(router.includes("verified.ok"));
 assert(router.includes("p[3]==='publish'"));
});
