import { esc } from "./model.mjs";

const E = (s) => esc(s ?? "");

const DEMO = {
  "md-dji": {
    name: "Skyline Aerial", headline: "See the whole picture.", heroLabel: "Aerial film and photography",
    bio: "We fly cameras where people can't stand: over coastlines at dawn, through construction sites, above a festival crowd. You get footage that shows the scale of what you built.",
    cards: [
      { title: "Coastline at first light", description: "A forty-second opener shot over three mornings to catch the fog lifting off the bay." },
      { title: "Tower in progress", description: "Monthly flyovers of a twenty-storey build, stitched into one time-lapse for the investors." },
      { title: "Harvest weekend", description: "Crowd, stage and fields from four hundred feet, cut for the festival's social channels." },
    ],
    services: [
      { title: "Brand films", description: "Concept, permits, flight and edit, delivered in 4K." },
      { title: "Construction progress", description: "Scheduled flights from the same positions, every month." },
      { title: "Events", description: "Live crowd coverage with a licensed second pilot." },
    ],
  },
  "md-shopify": {
    name: "Verdant Supply", headline: "Small batch. Big heart.", heroLabel: "Goods from independent makers",
    bio: "A shop for things made slowly: hand-thrown mugs, plant-dyed linen, honey from twelve hives up the road. Every maker is someone we've met.",
    cards: [
      { title: "Stoneware mugs", description: "Thrown in a garage studio, glazed in moss and oat." },
      { title: "Plant-dyed linen", description: "Napkins coloured with onion skin, avocado pit and indigo." },
      { title: "Wildflower honey", description: "Twelve hives, one hillside, bottled the week it's spun." },
    ],
    services: [
      { title: "Gift boxes", description: "Pick three goods, we wrap them in reusable cloth." },
      { title: "Maker market", description: "First Saturday of the month, twenty stalls, free coffee." },
      { title: "Wholesale", description: "Stock our makers in your shop." },
    ],
  },
  "md-coinbase": {
    name: "The Future Fund", headline: "Money, made legible.", heroLabel: "Personal finance, explained",
    bio: "We turn your accounts into one clear picture: what's coming in, what's going out, and how much you can safely put away this month.",
    cards: [
      { title: "Monthly snapshot", description: "One page that shows where every dollar went." },
      { title: "Goal tracker", description: "Name it, price it, and watch the progress bar move." },
      { title: "Plain-language advice", description: "A real planner answers your questions within a day." },
    ],
    services: [
      { title: "Budget review", description: "A 45-minute call and a written plan." },
      { title: "Savings autopilot", description: "Rules that move money for you on payday." },
      { title: "Retirement check-in", description: "Are you on track? We'll show you the maths." },
    ],
  },
  "md-sentry": {
    name: "Night Watch", headline: "Know before they do.", heroLabel: "Error monitoring for small teams",
    bio: "Night Watch catches errors in your app, groups them, and tells the right person in plain language. Fewer surprise outages, quieter on-call nights.",
    cards: [
      { title: "Checkout crash, fixed in 9 minutes", description: "An alert with the exact line and the deploy that caused it." },
      { title: "Slow search, traced", description: "Found the one query adding two seconds to every page." },
      { title: "Silent failures, surfaced", description: "Background jobs that failed quietly for weeks, now on a dashboard." },
    ],
    services: [
      { title: "Error tracking", description: "Stack traces grouped by cause, not by message." },
      { title: "Performance traces", description: "See which request is slow and why." },
      { title: "Smart alerts", description: "Paged only when it matters, routed to who owns it." },
    ],
  },
  "md-starbucks": {
    name: "Far & Fable", headline: "Gifts with a story attached.", heroLabel: "A shop for keepsakes",
    bio: "Every object in the shop comes with the story of who made it and why. We wrap it, write a card, and send it on its way.",
    cards: [
      { title: "The lighthouse keeper's mug", description: "Made by a potter who lives in an old lighthouse." },
      { title: "A blanket for long winters", description: "Woven on a hundred-year-old loom in the hills." },
      { title: "Letters from the orchard", description: "Pressed apple-blossom stationery, one sheet at a time." },
    ],
    services: [
      { title: "Gift wrapping", description: "Paper, ribbon and a handwritten card." },
      { title: "Story cards", description: "Every gift arrives with its maker's story." },
      { title: "Local delivery", description: "Same-day within the city, on a bicycle." },
    ],
  },
  "md-spacex": {
    name: "Skyward Mission", headline: "Built to leave.", heroLabel: "Launch systems and mission design",
    bio: "We design small launch vehicles and the missions they fly. From the first sketch to the moment the clamps release, one team carries it through.",
    cards: [
      { title: "Mission 07: weather sat", description: "A 180 kg payload placed in sun-synchronous orbit." },
      { title: "Second-stage relight", description: "Three burns, one tank, a new record for the team." },
      { title: "Recovery at sea", description: "The first booster we caught and flew again." },
    ],
    services: [
      { title: "Rideshare launch", description: "Space for small payloads on scheduled flights." },
      { title: "Mission design", description: "Orbit, timeline and risk, planned with you." },
      { title: "Ground systems", description: "Telemetry, tracking and a control room that works." },
    ],
  },
};

export const showpieceIds = Object.keys(DEMO);

function contentFor(id, v, sample) {
  const c = v?.content || {};
  const d = DEMO[id] || {};
  if (sample) return { ...c, ...d, photoIds: [] };
  return {
    name: c.name || d.name, headline: c.headline || d.headline, heroLabel: c.heroLabel || d.heroLabel,
    bio: c.bio || d.bio, cards: c.cards?.length ? c.cards : d.cards, services: c.services?.length ? c.services : d.services,
    publicEmail: c.publicEmail, photoIds: c.photoIds || [],
  };
}

const letters = (text) => {
  let i = 0;
  const words = String(text).split(/\s+/).filter(Boolean).map(w => '<span class="w">' + [...w].map(ch => '<span class="ch" style="--i:' + (i++) + '">' + E(ch) + "</span>").join("") + "</span>");
  return '<span class="sr">' + E(text) + '</span><span aria-hidden="true" class="split">' + words.join(" ") + "</span>";
};

const contactLink = (c, label) => c.publicEmail
  ? '<a class="cta" href="mailto:' + E(c.publicEmail) + '">' + E(label) + "</a>"
  : c._sample ? '<a class="cta" href="#contact">' + E(label) + "</a>"
  : '<span class="cta cta-muted">Contact details will be added by the site owner.</span>';

const photo = (c, i, opts) => c.photoIds?.[i]
  ? '<img src="' + E((opts.assetBase || "/api/assets/") + c.photoIds[i] + (opts.assetSuffix || "")) + '" alt="" loading="lazy">'
  : "";

const BASE = `*,*:before,*:after{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}body{margin:0;min-height:100vh;overflow-x:hidden}img{display:block;max-width:100%}a{color:inherit}h1,h2,h3,p{margin:0}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:12px;top:-60px;z-index:100;padding:10px 14px;background:#fff;color:#000}.skip:focus{top:12px}
:focus-visible{outline:3px solid currentColor;outline-offset:4px}
.demo{position:relative;z-index:50;padding:7px 16px;text-align:center;font:600 12px/1.4 system-ui,sans-serif;letter-spacing:.02em;background:#000;color:#fff}
.split{display:inline}.split .w{display:inline-block;white-space:nowrap}.split .ch{display:inline-block}
@media (prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}`;

function page({ title, fonts, css, body, sample, bodyClass }) {
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + E(title) + '</title>' +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?' + fonts + '&display=swap">' +
    "<style>" + BASE + css + "</style></head><body class=\"" + bodyClass + "\"><a class=\"skip\" href=\"#main\">Skip to content</a>" +
    (sample ? '<div class="demo">Fictional template demo. All names and content are illustrative.</div>' : "") + body + "</body></html>";
}

/* ---------- 1. Skyline Aerial: topographic altitude ---------- */
function altitude(c, o) {
  const css = `
.alt{--sky:#0070d5;--deep:#03122a;--mist:#e7f0fb;--sun:#ffb15c;--ink:#03122a;background:var(--deep);color:var(--mist);font:400 17px/1.65 Manrope,system-ui,sans-serif}
.alt header{position:absolute;inset:auto 0 auto 0;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px clamp(18px,4vw,56px)}
.alt .brand{font:700 18px Unbounded,sans-serif;letter-spacing:-.02em;text-decoration:none}
.alt nav{display:flex;gap:clamp(14px,2.4vw,32px);font-weight:600;font-size:15px}.alt nav a{text-decoration:none;opacity:.8}.alt nav a:hover{opacity:1}
.alt-hero{position:relative;min-height:100svh;display:grid;align-items:end;overflow:hidden;padding:120px clamp(18px,4vw,56px) clamp(40px,7vw,90px);isolation:isolate}
.alt-topo{position:absolute;inset:-30%;z-index:-2;background:repeating-radial-gradient(circle at 62% 42%,transparent 0 22px,rgba(120,180,255,.22) 23px 24px),repeating-radial-gradient(circle at 20% 80%,transparent 0 30px,rgba(255,177,92,.14) 31px 32px);animation:topo 28s ease-in-out infinite alternate}
@keyframes topo{to{transform:scale(1.18) rotate(4deg) translate(-2%,3%)}}
.alt-glow{position:absolute;inset:0;z-index:-1;background:radial-gradient(60% 50% at 70% 30%,rgba(0,112,213,.55),transparent 70%),radial-gradient(40% 30% at 15% 90%,rgba(255,177,92,.28),transparent 70%)}
.alt-ruler{position:absolute;right:clamp(14px,3vw,40px);top:90px;bottom:40px;width:44px;background:repeating-linear-gradient(to bottom,rgba(231,240,251,.55) 0 1px,transparent 1px 12px),repeating-linear-gradient(to bottom,rgba(231,240,251,.9) 0 2px,transparent 2px 60px);background-size:12px 100%,28px 100%;background-repeat:repeat-y;background-position:right top;-webkit-mask:linear-gradient(transparent,#000 15%,#000 85%,transparent);mask:linear-gradient(transparent,#000 15%,#000 85%,transparent);animation:climb 3s linear infinite}
@keyframes climb{to{background-position:right 60px,right 60px}}
.alt-readout{position:absolute;right:clamp(66px,8vw,110px);top:50%;font:600 14px/1.2 Manrope;color:var(--sun);font-variant-numeric:tabular-nums}
.alt h1{font:800 clamp(52px,11.5vw,190px)/.86 Unbounded,sans-serif;letter-spacing:-.055em;max-width:12ch;color:var(--mist)}
.alt h1 .ch{animation:rise .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i) * 35ms + .2s)}
@keyframes rise{from{opacity:0;transform:translateY(.4em)}}
.alt-sub{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:end;margin-top:clamp(28px,4vw,50px);max-width:1100px}
.alt-sub p{max-width:46ch;color:rgba(231,240,251,.82)}
.alt .cta{display:inline-flex;padding:16px 26px;border-radius:999px;background:var(--sun);color:var(--deep);font-weight:800;text-decoration:none;white-space:nowrap;transition:transform .25s}.alt .cta:hover{transform:translateY(-3px)}.alt .cta-muted{background:transparent;color:var(--mist);border:1px solid rgba(231,240,251,.4);font-weight:600;white-space:normal}
.alt-horizon{position:absolute;left:0;right:0;bottom:34%;height:1px;background:linear-gradient(90deg,transparent,var(--sun),transparent);transform-origin:center;animation:tilt 9s ease-in-out infinite alternate;z-index:-1}
@keyframes tilt{from{transform:rotate(-3deg)}to{transform:rotate(2deg)}}
.alt-work{background:var(--mist);color:var(--ink);padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px)}
.alt-work h2,.alt-svc h2,.alt-end h2{font:800 clamp(36px,6vw,92px)/.95 Unbounded,sans-serif;letter-spacing:-.05em;max-width:14ch}
.alt-frames{display:grid;grid-template-columns:1.4fr 1fr;gap:clamp(16px,2.4vw,32px);margin-top:clamp(40px,6vw,80px)}
.alt-frame{position:relative;margin:0}.alt-frame:first-child{grid-row:span 2}
.alt-shot{position:relative;aspect-ratio:4/3;overflow:hidden;border-radius:6px;background:linear-gradient(#5aa7f0 0 38%,#ffd29a 38% 40%,#2f6f9e 40%)}
.alt-frame:first-child .alt-shot{aspect-ratio:auto;height:100%;min-height:420px}
.alt-shot img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.alt-shot:before,.alt-shot:after{content:"";position:absolute;inset:0}
.alt-shot:before{background:linear-gradient(160deg,transparent 52%,#1b4b73 52% 60%,transparent 60%),linear-gradient(200deg,transparent 58%,#0e2f4d 58%);}
.alt-shot:after{inset:14px;border:2px solid #fff;-webkit-mask:linear-gradient(#000 0 0) top left/26px 26px no-repeat,linear-gradient(#000 0 0) top right/26px 26px no-repeat,linear-gradient(#000 0 0) bottom left/26px 26px no-repeat,linear-gradient(#000 0 0) bottom right/26px 26px no-repeat;mask:linear-gradient(#000 0 0) top left/26px 26px no-repeat,linear-gradient(#000 0 0) top right/26px 26px no-repeat,linear-gradient(#000 0 0) bottom left/26px 26px no-repeat,linear-gradient(#000 0 0) bottom right/26px 26px no-repeat}
.alt-frame:nth-child(2) .alt-shot{background:linear-gradient(#c9dff5 0 30%,#8fa9c2 30% 100%)}.alt-frame:nth-child(2) .alt-shot:before{background:repeating-linear-gradient(90deg,transparent 0 30px,rgba(3,18,42,.5) 30px 34px) 30% 20%/40% 70% no-repeat,linear-gradient(transparent 70%,#3d5368 70%)}
.alt-frame:nth-child(3) .alt-shot{background:linear-gradient(#ff9d5c 0 34%,#7aa34a 34%)}.alt-frame:nth-child(3) .alt-shot:before{background:radial-gradient(circle at 50% 55%,#03122a 0 3px,transparent 4px) 0 0/16px 14px,linear-gradient(transparent 52%,rgba(122,163,74,0) 52%)}
.alt-frame figcaption{margin-top:14px}.alt-frame h3{font:700 clamp(19px,1.8vw,24px)/1.2 Unbounded,sans-serif;letter-spacing:-.03em}.alt-frame p{margin-top:6px;color:#3b4d66;max-width:44ch}
@supports (animation-timeline:view()){.alt-frame{animation:frame linear both;animation-timeline:view();animation-range:entry 0% cover 40%}@keyframes frame{from{opacity:.2;transform:scale(.92)}}}
.alt-svc{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,6vw,100px)}
.alt-svc ul{list-style:none;margin:0;padding:0}.alt-svc li{display:grid;grid-template-columns:1fr 1.3fr;gap:20px;padding:26px 0;border-top:1px solid rgba(231,240,251,.2)}.alt-svc li:last-child{border-bottom:1px solid rgba(231,240,251,.2)}
.alt-svc h3{font:700 22px/1.2 Unbounded,sans-serif;letter-spacing:-.03em}.alt-svc p{color:rgba(231,240,251,.75)}
.alt-end{padding:clamp(80px,12vw,180px) clamp(18px,4vw,56px);background:var(--sky);color:#fff;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:30px}
.alt footer{display:flex;justify-content:space-between;gap:20px;padding:24px clamp(18px,4vw,56px);font-size:14px;color:rgba(231,240,251,.6)}
@media(max-width:820px){.alt nav{gap:14px;font-size:13px}.alt-ruler,.alt-readout{display:none}.alt-sub,.alt-svc,.alt-svc li{grid-template-columns:1fr}.alt-frames{grid-template-columns:1fr}.alt-frame:first-child{grid-row:auto}.alt-frame:first-child .alt-shot{min-height:300px}}`;
  const cards = c.cards.slice(0, 3).map((k, i) => '<figure class="alt-frame"><div class="alt-shot">' + photo(c, i, o) + '</div><figcaption><h3>' + E(k.title) + "</h3><p>" + E(k.description) + "</p></figcaption></figure>").join("");
  const svc = (c.services || []).slice(0, 3).map(s => "<li><h3>" + E(s.title) + "</h3><p>" + E(s.description || "") + "</p></li>").join("");
  const body = '<div class="alt"><header><a class="brand" href="#main">' + E(c.name) + '</a><nav aria-label="Main"><a href="#work">Work</a><a href="#services">Services</a><a href="#contact">Contact</a></nav></header><main id="main">' +
    '<section class="alt-hero" aria-labelledby="h"><div class="alt-topo" aria-hidden="true"></div><div class="alt-glow" aria-hidden="true"></div><div class="alt-horizon" aria-hidden="true"></div><div class="alt-ruler" aria-hidden="true"></div><div class="alt-readout" aria-hidden="true">400 ft</div>' +
    '<div><h1 id="h">' + letters(c.headline) + '</h1><div class="alt-sub"><p>' + E(c.bio) + "</p>" + contactLink(c, "Plan a shoot") + "</div></div></section>" +
    '<section class="alt-work" id="work"><h2>Recent flights</h2><div class="alt-frames">' + cards + "</div></section>" +
    '<section class="alt-svc" id="services"><h2>What we fly</h2><ul>' + svc + "</ul></section>" +
    '<section class="alt-end" id="contact"><h2>Have a place worth seeing from above?</h2>' + contactLink(c, "Plan a shoot") + "</section></main>" +
    "<footer><span>" + E(c.name) + "</span><a href=\"#main\">Back to top</a></footer></div>";
  return { css, body, fonts: "family=Unbounded:wght@700;800&family=Manrope:wght@400;600;800" };
}

/* ---------- 2. Verdant Supply: market stall ---------- */
function stall(c, o) {
  const css = `
.st{overflow-x:clip;--paper:#e9f1d8;--leaf:#4f7a1f;--moss:#87a947;--tomato:#ff5a36;--ink:#1b2410;--plum:#5b2a4a;background:var(--paper);color:var(--ink);font:400 17px/1.6 "Instrument Sans",system-ui,sans-serif}
.st header{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px clamp(18px,4vw,56px)}
.st .brand{font:800 26px/1 Fraunces,serif;font-variation-settings:"SOFT" 100,"WONK" 1;text-decoration:none;color:var(--leaf)}
.st nav{display:flex;gap:6px}.st nav a{padding:9px 16px;border-radius:999px;border:2px solid var(--ink);text-decoration:none;font-weight:600;font-size:15px;transition:background .2s,color .2s}.st nav a:hover{background:var(--ink);color:var(--paper)}
.st-hero{position:relative;padding:clamp(30px,6vw,80px) clamp(18px,4vw,56px) clamp(50px,7vw,90px);overflow:hidden}
.st h1{font:900 clamp(64px,15vw,260px)/.82 Fraunces,serif;font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:-.045em;color:var(--leaf)}
.st h1 .ch{transform-origin:50% 100%;animation:drop .8s cubic-bezier(.3,1.6,.5,1) both;animation-delay:calc(var(--i) * 45ms)}
@keyframes drop{from{transform:translateY(-120%) rotate(-12deg);opacity:0}}
.st h1 .ch:nth-child(4n+2){color:var(--tomato)}.st h1 .ch:nth-child(5n+3){color:var(--plum)}
.st-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:40px;align-items:end;margin-top:clamp(26px,4vw,50px)}
.st-row p{font-size:clamp(18px,1.7vw,23px);max-width:42ch}
.st .cta{display:inline-flex;padding:18px 30px;border-radius:999px;background:var(--tomato);color:#fff;font-weight:700;text-decoration:none;box-shadow:0 6px 0 var(--ink);transition:transform .15s,box-shadow .15s}.st .cta:hover{transform:translateY(3px);box-shadow:0 3px 0 var(--ink)}.st .cta-muted{background:transparent;color:var(--ink);box-shadow:none;border:2px dashed var(--ink)}
.st-sticker{position:absolute;right:clamp(14px,6vw,90px);top:clamp(10px,4vw,40px);width:clamp(110px,14vw,190px);aspect-ratio:1;border-radius:50%;background:var(--tomato);color:#fff;display:grid;place-items:center;text-align:center;font:800 clamp(15px,1.5vw,20px)/1.1 Fraunces,serif;padding:18px;animation:spin 16s linear infinite}
.st-sticker:before{content:"";position:absolute;inset:8px;border:2px dashed rgba(255,255,255,.7);border-radius:50%}
@keyframes spin{to{transform:rotate(360deg)}}
.st-marquee{overflow:hidden;background:var(--ink);color:var(--paper);border-block:3px solid var(--ink);transform:rotate(-2deg);margin:0 -20px}
.st-track{display:flex;width:max-content;animation:slide 22s linear infinite}.st-track span{padding:18px 28px;font:800 clamp(22px,3vw,40px)/1 Fraunces,serif;white-space:nowrap}.st-track span:nth-child(odd){color:var(--moss)}
@keyframes slide{to{transform:translateX(-50%)}}
.st-shelf{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.st h2{font:900 clamp(42px,7vw,110px)/.9 Fraunces,serif;font-variation-settings:"SOFT" 100,"WONK" 1;letter-spacing:-.04em;max-width:13ch}
.st-goods{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2.5vw,34px);margin-top:clamp(36px,5vw,70px)}
.st-good{background:#fff;border:3px solid var(--ink);border-radius:28px;overflow:hidden;box-shadow:8px 8px 0 var(--ink);transition:transform .25s,box-shadow .25s}.st-good:hover{transform:translate(-4px,-4px) rotate(-1deg);box-shadow:12px 12px 0 var(--ink)}
.st-thing{position:relative;aspect-ratio:1.1;background:var(--moss);overflow:hidden}.st-thing img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.st-good:nth-child(2) .st-thing{background:#f3b6a8}.st-good:nth-child(3) .st-thing{background:#f7cf5d}
.st-thing i{position:absolute;left:50%;bottom:16%;translate:-50% 0;display:block}
.st-good:nth-child(1) .st-thing i{width:38%;height:46%;background:#f2ead8;border-radius:10px 10px 30px 30px;box-shadow:inset 0 -18px 0 #6c8a3a}.st-good:nth-child(1) .st-thing i:after{content:"";position:absolute;right:-30%;top:22%;width:34%;height:42%;border:10px solid #f2ead8;border-left:0;border-radius:0 40px 40px 0}
.st-good:nth-child(2) .st-thing i{width:56%;height:40%;background:repeating-linear-gradient(90deg,#8d3b5c 0 10px,#c06a8a 10px 20px);border-radius:6px;transform:rotate(-6deg)}
.st-good:nth-child(3) .st-thing i{width:34%;height:52%;background:#d98b17;border-radius:16px 16px 22px 22px;box-shadow:inset 0 14px 0 #fff3d6}
.st-good > div:last-child{padding:22px 24px 26px}.st-good h3{font:800 24px/1.15 Fraunces,serif}.st-good p{margin-top:8px;color:#3d4a2c}
.st-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
.st-svc article{padding:28px;border-radius:28px;background:var(--leaf);color:var(--paper)}.st-svc article:nth-child(2){background:var(--plum)}.st-svc article:nth-child(3){background:var(--tomato)}
.st-svc h3{font:800 28px/1.1 Fraunces,serif;margin-bottom:10px}
.st-end{margin:0 clamp(18px,4vw,56px) clamp(40px,5vw,60px);padding:clamp(50px,8vw,110px) clamp(24px,5vw,70px);border-radius:40px;background:var(--ink);color:var(--paper);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}.st-end h2{color:var(--moss)}
.st footer{display:flex;justify-content:space-between;padding:0 clamp(18px,4vw,56px) 30px;font-size:14px}
@media(max-width:820px){.st nav a{padding:6px 10px;font-size:13px}.st .brand{font-size:20px}.st-row,.st-goods,.st-svc{grid-template-columns:1fr}.st-sticker{position:relative;right:auto;top:auto;margin-top:24px}}`;
  const goods = c.cards.slice(0, 3).map((k, i) => '<article class="st-good"><div class="st-thing">' + (photo(c, i, o) || '<i aria-hidden="true"></i>') + "</div><div><h3>" + E(k.title) + "</h3><p>" + E(k.description) + "</p></div></article>").join("");
  const words = c.cards.slice(0, 3).map(k => "<span>" + E(k.title) + "</span>").join("");
  const svc = (c.services || []).slice(0, 3).map(s => "<article><h3>" + E(s.title) + "</h3><p>" + E(s.description || "") + "</p></article>").join("");
  const body = '<div class="st"><header><a class="brand" href="#main">' + E(c.name) + '</a><nav aria-label="Main"><a href="#shop">Shop</a><a href="#visit">Visit</a><a href="#contact">Say hello</a></nav></header><main id="main">' +
    '<section class="st-hero" aria-labelledby="h"><h1 id="h">' + letters(c.headline) + '</h1><div class="st-row"><p>' + E(c.bio) + "</p>" + contactLink(c, "Order a gift box") + '</div><div class="st-sticker" aria-hidden="true">' + E(c.heroLabel || "Made by hand") + "</div></section>" +
    '<div class="st-marquee" aria-hidden="true"><div class="st-track">' + words + words + words + words + "</div></div>" +
    '<section class="st-shelf" id="shop"><h2>On the shelf this week</h2><div class="st-goods">' + goods + "</div></section>" +
    '<section class="st-svc" id="visit" aria-label="Services">' + svc + "</section>" +
    '<section class="st-end" id="contact"><h2>Come say hello.</h2>' + contactLink(c, "Email the shop") + "</section></main>" +
    "<footer><span>" + E(c.name) + '</span><a href="#main">Back to top</a></footer></div>';
  return { css, body, fonts: "family=Fraunces:opsz,wght,SOFT,WONK@9..144,800..900,100,1&family=Instrument+Sans:wght@400;600;700" };
}

/* ---------- 3. The Future Fund: ticker ---------- */
function ticker(c, o) {
  const css = `
@property --a{syntax:"<integer>";initial-value:0;inherits:false}@property --b{syntax:"<integer>";initial-value:0;inherits:false}
.tk{--blue:#0052ff;--ink:#0a1633;--sky:#eef3ff;--mint:#00c389;--line:#d5def3;background:#fff;color:var(--ink);font:400 17px/1.6 "Bricolage Grotesque",system-ui,sans-serif}
.tk header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px);border-bottom:1px solid var(--line)}
.tk .brand{font:800 22px/1 "Bricolage Grotesque";letter-spacing:-.04em;text-decoration:none;display:flex;align-items:center;gap:10px}.tk .brand:before{content:"";width:22px;height:22px;border-radius:50%;background:conic-gradient(var(--blue) 0 70%,var(--mint) 0)}
.tk nav{display:flex;gap:28px;font-weight:600}.tk nav a{text-decoration:none}.tk nav a:hover{color:var(--blue)}
.tk-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(30px,5vw,80px);align-items:center;padding:clamp(50px,8vw,120px) clamp(18px,4vw,56px)}
.tk h1{font:800 clamp(56px,8.4vw,140px)/.92 "Bricolage Grotesque";font-stretch:82%;letter-spacing:-.035em}
.tk h1 .ch{animation:fade .5s ease both;animation-delay:calc(var(--i) * 40ms)}@keyframes fade{from{opacity:0}}
.tk-hero p{margin-top:28px;font-size:clamp(18px,1.6vw,22px);max-width:40ch;color:#36446b}
.tk .cta{display:inline-flex;margin-top:32px;padding:17px 28px;border-radius:14px;background:var(--blue);color:#fff;font-weight:700;text-decoration:none;transition:background .2s}.tk .cta:hover{background:var(--ink)}.tk .cta-muted{background:var(--sky);color:var(--ink)}
.tk-board{position:relative;padding:clamp(24px,3vw,40px);border-radius:28px;background:var(--ink);color:#fff;overflow:hidden}
.tk-board small{font:500 14px "Geist Mono",monospace;color:#9fb3e8}
.tk-num{display:flex;align-items:baseline;margin-top:8px;font:800 clamp(64px,9vw,140px)/1 "Bricolage Grotesque";letter-spacing:-.05em;color:var(--mint);font-variant-numeric:tabular-nums}
.tk-num b{font-weight:800;animation:ca 2.6s cubic-bezier(.15,.85,.25,1) .4s both;counter-reset:a var(--a)}.tk-num b:after{content:counter(a)}@keyframes ca{to{--a:24}}
.tk-num i{font-style:normal;animation:cb 2.6s cubic-bezier(.15,.85,.25,1) .4s both;counter-reset:b var(--b)}.tk-num i:after{content:"." counter(b) "%"}@keyframes cb{to{--b:8}}
.tk-num:before{content:"+"}@media (prefers-reduced-motion:reduce){.tk-num b{--a:24}.tk-num i{--b:8}}
.tk-board svg{display:block;width:100%;height:auto;margin-top:20px;overflow:visible}
.tk-board .path{fill:none;stroke:var(--mint);stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:900;animation:draw 2.6s cubic-bezier(.15,.85,.25,1) .4s both}
.tk-board .area{fill:url(#g);animation:fade 1s ease 2.2s both}
.tk-board .grid{stroke:#ffffff1f;stroke-width:1}
@keyframes draw{from{stroke-dashoffset:900}}@keyframes draws{from{stroke-dashoffset:300}}
.tk-legend{display:flex;justify-content:space-between;margin-top:14px;font:500 13px "Geist Mono",monospace;color:#9fb3e8}
.tk-rows{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px);background:var(--sky)}
.tk h2{font:800 clamp(38px,5.5vw,84px)/.98 "Bricolage Grotesque";font-stretch:82%;letter-spacing:-.03em;max-width:15ch}
.tk-list{margin-top:clamp(36px,5vw,64px);border-top:2px solid var(--ink)}
.tk-item{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) 160px;gap:30px;align-items:center;padding:30px 0;border-bottom:1px solid var(--line)}
.tk-item h3{font:700 clamp(22px,2.2vw,30px)/1.15 "Bricolage Grotesque";letter-spacing:-.03em}.tk-item p{color:#36446b}
.tk-item svg{width:100%;height:46px}.tk-item svg path{fill:none;stroke:var(--blue);stroke-width:3;stroke-linecap:round;stroke-dasharray:300}
@supports (animation-timeline:view()){.tk-item svg path{animation:draws linear both;animation-timeline:view();animation-range:entry 20% cover 45%}}
.tk-svc{padding:clamp(70px,9vw,130px) clamp(18px,4vw,56px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.tk-svc article{padding:30px;border:1px solid var(--line);border-radius:22px}.tk-svc h3{font:700 24px/1.2 "Bricolage Grotesque";margin-bottom:10px}.tk-svc p{color:#36446b}
.tk-end{margin:0 clamp(18px,4vw,56px) 40px;padding:clamp(50px,8vw,110px);border-radius:32px;background:var(--blue);color:#fff;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}.tk-end .cta{background:#fff;color:var(--blue);margin:0}
.tk footer{display:flex;justify-content:space-between;padding:0 clamp(18px,4vw,56px) 30px;font-size:14px;color:#56638a}
@media(max-width:860px){.tk nav{gap:14px;font-size:13px}.tk .brand{font-size:18px}.tk-hero,.tk-svc{grid-template-columns:1fr}.tk-item{grid-template-columns:1fr;gap:10px}.tk-item svg{max-width:220px}}`;
  const spark = ["M5 38 L60 30 L110 34 L160 18 L215 22 L270 8", "M5 30 L60 34 L110 20 L160 24 L215 12 L270 14", "M5 40 L60 28 L110 30 L160 20 L215 16 L270 6"];
  const rows = c.cards.slice(0, 3).map((k, i) => '<div class="tk-item"><h3>' + E(k.title) + "</h3><p>" + E(k.description) + '</p><svg viewBox="0 0 275 46" aria-hidden="true"><path d="' + spark[i] + '"/></svg></div>').join("");
  const svc = (c.services || []).slice(0, 3).map(s => "<article><h3>" + E(s.title) + "</h3><p>" + E(s.description || "") + "</p></article>").join("");
  const body = '<div class="tk"><header><a class="brand" href="#main">' + E(c.name) + '</a><nav aria-label="Main"><a href="#how">How it works</a><a href="#plans">Plans</a><a href="#contact">Talk to us</a></nav></header><main id="main">' +
    '<section class="tk-hero" aria-labelledby="h"><div><h1 id="h">' + letters(c.headline) + "</h1><p>" + E(c.bio) + "</p>" + contactLink(c, "Book a free review") + '</div>' +
    '<div class="tk-board" aria-hidden="true"><small>Example savings growth, 12 months</small><div class="tk-num"><b></b><i></i></div>' +
    '<svg viewBox="0 0 600 220"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00c389" stop-opacity=".45"/><stop offset="1" stop-color="#00c389" stop-opacity="0"/></linearGradient></defs><line class="grid" x1="0" y1="55" x2="600" y2="55"/><line class="grid" x1="0" y1="110" x2="600" y2="110"/><line class="grid" x1="0" y1="165" x2="600" y2="165"/><path class="area" d="M0 200 L60 185 L120 192 L180 160 L240 168 L300 130 L360 138 L420 98 L480 104 L540 60 L600 40 L600 220 L0 220Z"/><path class="path" d="M0 200 L60 185 L120 192 L180 160 L240 168 L300 130 L360 138 L420 98 L480 104 L540 60 L600 40"/></svg>' +
    '<div class="tk-legend"><span>Jan</span><span>Jun</span><span>Dec</span></div></div></section>' +
    '<section class="tk-rows" id="how"><h2>Everything in one clear view</h2><div class="tk-list">' + rows + "</div></section>" +
    '<section class="tk-svc" id="plans" aria-label="Plans">' + svc + "</section>" +
    '<section class="tk-end" id="contact"><h2>Start with a free review.</h2>' + contactLink(c, "Book a free review") + "</section></main>" +
    "<footer><span>" + E(c.name) + '</span><a href="#main">Back to top</a></footer></div>';
  return { css, body, fonts: "family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Geist+Mono:wght@500" };
}

/* ---------- 4. Night Watch: signal ---------- */
function signal(c, o) {
  const css = `
.nw{--bg:#120a24;--panel:#1d1238;--lilac:#a28afe;--lime:#c6ff4d;--red:#ff4d6d;--text:#ece6ff;background:var(--bg);color:var(--text);font:400 17px/1.65 Syne,system-ui,sans-serif}
.nw header{display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.nw .brand{font:800 20px/1 Syne;letter-spacing:-.02em;text-decoration:none;display:flex;gap:10px;align-items:center}.nw .brand:before{content:"";width:10px;height:10px;border-radius:50%;background:var(--lime);box-shadow:0 0 0 0 var(--lime);animation:ping 2s infinite}
@keyframes ping{70%{box-shadow:0 0 0 12px transparent}}
.nw nav{display:flex;gap:28px;font-weight:600}.nw nav a{text-decoration:none;opacity:.8}.nw nav a:hover{opacity:1;color:var(--lime)}
.nw-hero{position:relative;min-height:88svh;display:grid;align-items:center;padding:40px clamp(18px,4vw,56px) 80px;overflow:hidden;isolation:isolate}
.nw-radar{position:absolute;right:-10vw;top:50%;width:min(80vw,900px);aspect-ratio:1;translate:0 -50%;border-radius:50%;z-index:-1;background:repeating-radial-gradient(circle,transparent 0 58px,rgba(162,138,254,.22) 59px 60px);}
.nw-radar:before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,rgba(198,255,77,.3),transparent 22%);animation:sweep 4s linear infinite}
.nw-radar:after{content:"";position:absolute;left:62%;top:30%;width:12px;height:12px;border-radius:50%;background:var(--red);box-shadow:0 0 18px var(--red);animation:blip 4s linear infinite}
@keyframes sweep{to{transform:rotate(360deg)}}@keyframes blip{0%,12%{opacity:0}16%{opacity:1}60%,100%{opacity:0}}
.nw h1{position:relative;font:800 clamp(56px,10.5vw,176px)/.88 Syne;letter-spacing:-.05em;max-width:11ch}
.nw-glitch{position:relative;display:inline-block}
.nw-glitch:before,.nw-glitch:after{content:attr(data-text);position:absolute;inset:0;pointer-events:none;opacity:0}
.nw-glitch:before{color:var(--lime);clip-path:inset(0 0 60% 0);animation:g1 3.2s steps(1) infinite}
.nw-glitch:after{color:var(--red);clip-path:inset(55% 0 0 0);animation:g2 3.2s steps(1) infinite}
@keyframes g1{0%,86%,100%{transform:none;opacity:0}88%{transform:translate(-6px,-2px);opacity:.9}92%{transform:translate(5px,1px);opacity:.9}}
@keyframes g2{0%,88%,100%{transform:none;opacity:0}90%{transform:translate(6px,2px);opacity:.9}94%{transform:translate(-4px,0);opacity:.9}}
.nw-hero p{margin-top:28px;max-width:44ch;font-size:clamp(18px,1.6vw,21px);color:#c9bff0}
.nw .cta{display:inline-flex;margin-top:32px;padding:16px 26px;border-radius:10px;background:var(--lime);color:var(--bg);font-weight:800;text-decoration:none;transition:transform .2s}.nw .cta:hover{transform:translateY(-2px)}.nw .cta-muted{background:var(--panel);color:var(--text)}
.nw-term{margin:0 clamp(18px,4vw,56px);border:1px solid #3a2a6b;border-radius:18px;background:var(--panel);overflow:hidden}
.nw-term-top{display:flex;gap:8px;align-items:center;padding:14px 18px;border-bottom:1px solid #3a2a6b;font:500 13px "Martian Mono",monospace;color:#9e90d6}.nw-term-top i{width:10px;height:10px;border-radius:50%;background:#3a2a6b}
.nw-log{height:220px;overflow:hidden;-webkit-mask:linear-gradient(transparent,#000 25%,#000 80%,transparent);mask:linear-gradient(transparent,#000 25%,#000 80%,transparent)}
.nw-log ol{list-style:none;margin:0;padding:10px 18px;font:400 13px/2 "Martian Mono",monospace;animation:scroll 14s linear infinite}
.nw-log li span{color:var(--lime)}.nw-log li b{font-weight:400;color:var(--red)}.nw-log li em{font-style:normal;color:var(--lilac)}
@keyframes scroll{to{transform:translateY(-50%)}}
.nw-cases{padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px)}
.nw h2{font:800 clamp(38px,6vw,96px)/.92 Syne;letter-spacing:-.05em;max-width:14ch}
.nw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:clamp(36px,5vw,70px)}
.nw-case{position:relative;padding:30px;border-radius:20px;background:var(--panel);border:1px solid #3a2a6b;overflow:hidden}
.nw-case:before{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(198,255,77,.12),transparent 70%);transform:translateX(-100%);transition:transform .7s}.nw-case:hover:before{transform:translateX(100%)}
.nw-case .state{display:inline-flex;gap:8px;align-items:center;font:500 13px "Martian Mono",monospace;color:var(--lime)}.nw-case .state:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--lime)}
.nw-case h3{margin-top:22px;font:700 clamp(22px,2vw,28px)/1.15 Syne;letter-spacing:-.02em}.nw-case p{margin-top:10px;color:#c9bff0}
.nw-svc{padding:0 clamp(18px,4vw,56px) clamp(80px,10vw,140px)}
.nw-svc ul{list-style:none;margin:clamp(30px,4vw,50px) 0 0;padding:0}.nw-svc li{display:grid;grid-template-columns:1fr 1.4fr;gap:30px;padding:24px 0;border-top:1px solid #3a2a6b}.nw-svc h3{font:700 24px Syne}.nw-svc p{color:#c9bff0}
.nw-end{margin:0 clamp(18px,4vw,56px) 40px;padding:clamp(50px,8vw,110px);border-radius:28px;background:var(--lilac);color:var(--bg);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:30px}.nw-end .cta{margin:0;background:var(--bg);color:var(--lime)}
.nw footer{display:flex;justify-content:space-between;padding:0 clamp(18px,4vw,56px) 30px;font-size:14px;color:#9e90d6}
@media(max-width:860px){.nw nav{gap:14px;font-size:13px}.nw .brand{font-size:17px}.nw-grid,.nw-svc li{grid-template-columns:1fr}.nw-radar{right:-40vw;opacity:.6}}`;
  const log = ['<li><span>ok</span> deploy 4f2a1c rolled out to 3 regions</li>', '<li><b>error</b> TypeError in checkout/total.js:118</li>', '<li><em>group</em> 214 events, 1 cause, assigned to payments</li>', '<li><span>ok</span> fix merged, error rate back to 0.02%</li>', '<li><em>trace</em> /search p95 2.1s, slow query in products.sql</li>', '<li><span>ok</span> index added, p95 now 240ms</li>', '<li><b>warn</b> job email-digest failed 3 times</li>', '<li><span>ok</span> retry policy updated, queue drained</li>'].join("");
  const cases = c.cards.slice(0, 3).map(k => '<article class="nw-case"><span class="state">Resolved</span><h3>' + E(k.title) + "</h3><p>" + E(k.description) + "</p></article>").join("");
  const svc = (c.services || []).slice(0, 3).map(s => "<li><h3>" + E(s.title) + "</h3><p>" + E(s.description || "") + "</p></li>").join("");
  const body = '<div class="nw"><header><a class="brand" href="#main">' + E(c.name) + '</a><nav aria-label="Main"><a href="#cases">Results</a><a href="#product">Product</a><a href="#contact">Get started</a></nav></header><main id="main">' +
    '<section class="nw-hero" aria-labelledby="h"><div class="nw-radar" aria-hidden="true"></div><div><h1 id="h"><span class="nw-glitch" data-text="' + E(c.headline) + '">' + E(c.headline) + "</span></h1><p>" + E(c.bio) + "</p>" + contactLink(c, "Start monitoring") + "</div></section>" +
    '<div class="nw-term" aria-hidden="true"><div class="nw-term-top"><i></i><i></i><i></i>live events</div><div class="nw-log"><ol>' + log + log + "</ol></div></div>" +
    '<section class="nw-cases" id="cases"><h2>Problems found before anyone noticed</h2><div class="nw-grid">' + cases + "</div></section>" +
    '<section class="nw-svc" id="product"><h2>What it watches</h2><ul>' + svc + "</ul></section>" +
    '<section class="nw-end" id="contact"><h2>Sleep through the night.</h2>' + contactLink(c, "Start monitoring") + "</section></main>" +
    "<footer><span>" + E(c.name) + '</span><a href="#main">Back to top</a></footer></div>';
  return { css, body, fonts: "family=Syne:wght@400;600;700;800&family=Martian+Mono:wght@400;500" };
}

/* ---------- 5. Far & Fable: storybook ---------- */
function storybook(c, o) {
  const css = `
.fb{--sky:#fbe3d4;--sun:#f2b33d;--green:#00754a;--deep:#0b3d2c;--blush:#f4b9a6;--ink:#1d2a24;background:var(--sky);color:var(--ink);font:400 18px/1.7 Karla,system-ui,sans-serif}
.fb header{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.fb .brand{font:400 28px/1 Gloock,serif;text-decoration:none}
.fb nav{display:flex;gap:28px;font-weight:700}.fb nav a{text-decoration:none;border-bottom:2px solid transparent}.fb nav a:hover{border-color:currentColor}
.fb-hero{position:relative;height:clamp(640px,100svh,980px);overflow:hidden;text-align:center;isolation:isolate}
.fb-sun{position:absolute;left:50%;top:60%;width:clamp(180px,26vw,380px);aspect-ratio:1;border-radius:50%;translate:-50% 0;background:radial-gradient(circle at 40% 35%,#ffd77a,var(--sun));z-index:-3;animation:sunrise 2.4s cubic-bezier(.2,.8,.2,1) both}
@keyframes sunrise{from{transform:translateY(60%);opacity:.3}}
.fb-hill{position:absolute;left:-5%;right:-5%;bottom:0;z-index:-2;border-radius:50% 50% 0 0/100% 100% 0 0}
.fb-h1{height:44%;background:var(--blush);left:-30%;right:30%}.fb-h2{height:36%;background:#e98f74;left:35%;right:-25%}.fb-h3{height:26%;background:var(--green);z-index:-1}.fb-h4{height:14%;background:var(--deep);left:-20%;right:20%;z-index:0}
@supports (animation-timeline:scroll()){.fb-h1{animation:par1 linear both;animation-timeline:scroll()}.fb-h2{animation:par2 linear both;animation-timeline:scroll()}.fb-h4{animation:par3 linear both;animation-timeline:scroll()}.fb-sun{animation:sunrise 2.4s cubic-bezier(.2,.8,.2,1) both,sunset linear both;animation-timeline:auto,scroll();animation-range:normal,0 60vh}
@keyframes par1{to{transform:translateX(-12%)}}@keyframes par2{to{transform:translateX(14%)}}@keyframes par3{to{transform:translateY(40%)}}@keyframes sunset{to{transform:translateY(40%)}}}
.fb-copy{position:relative;z-index:2;padding:clamp(40px,7vw,90px) clamp(18px,4vw,56px) 0}
.fb h1{font:400 clamp(54px,9vw,150px)/.95 Gloock,serif;letter-spacing:-.03em;max-width:13ch;margin:0 auto}
.fb h1 .ch{animation:ink 1.1s ease both;animation-delay:calc(var(--i) * 30ms + .6s)}@keyframes ink{from{opacity:0;filter:blur(8px)}}
.fb-copy p{max-width:44ch;margin:24px auto 0;font-size:clamp(18px,1.6vw,21px)}
.fb .cta{display:inline-flex;margin-top:28px;padding:16px 28px;border-radius:999px;background:var(--deep);color:#fff;font-weight:700;text-decoration:none;transition:background .2s}.fb .cta:hover{background:var(--green)}.fb .cta-muted{background:transparent;color:var(--ink);border:2px solid var(--ink)}
.fb-chapters{background:#fffaf6;padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px)}
.fb h2{font:400 clamp(40px,6vw,96px)/1 Gloock,serif;letter-spacing:-.02em;max-width:15ch}
.fb-book{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(20px,3vw,44px);margin-top:clamp(40px,6vw,80px)}
.fb-page{position:relative;padding:clamp(28px,3vw,44px);background:#fff;border-radius:4px 20px 20px 4px;box-shadow:inset 10px 0 18px -12px rgba(0,0,0,.25),0 30px 40px -30px rgba(11,61,44,.4);transition:transform .4s}.fb-page:hover{transform:rotate(-1.5deg) translateY(-6px)}
.fb-page:nth-child(2){margin-top:60px}.fb-page:nth-child(3){margin-top:120px}
.fb-page .num{font:400 13px Karla;letter-spacing:.04em;color:var(--green)}
.fb-page h3{margin-top:14px;font:400 clamp(24px,2.3vw,32px)/1.15 Gloock,serif}
.fb-page p:first-letter{float:left;font:400 3.2em/.8 Gloock,serif;margin:6px 8px 0 0;color:var(--green)}
.fb-page p{margin-top:14px}
.fb-page img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;margin-bottom:18px}
.fb-svc{background:var(--green);color:#fff;padding:clamp(80px,10vw,140px) clamp(18px,4vw,56px);display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(30px,6vw,100px)}
.fb-svc ul{list-style:none;margin:0;padding:0}.fb-svc li{padding:22px 0;border-top:1px solid #ffffff40}.fb-svc h3{font:400 28px Gloock,serif}.fb-svc p{opacity:.85}
.fb-end{text-align:center;padding:clamp(90px,12vw,170px) clamp(18px,4vw,56px)}.fb-end h2{margin:0 auto}
.fb footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:15px;background:var(--deep);color:#d9e7df}
@media(max-width:860px){.fb nav{gap:14px;font-size:14px}.fb .brand{font-size:22px}.fb-book,.fb-svc{grid-template-columns:1fr}.fb-page:nth-child(n){margin-top:0}}`;
  const pages = c.cards.slice(0, 3).map((k, i) => '<article class="fb-page">' + photo(c, i, o) + '<span class="num">Chapter ' + (i + 1) + "</span><h3>" + E(k.title) + "</h3><p>" + E(k.description) + "</p></article>").join("");
  const svc = (c.services || []).slice(0, 3).map(s => "<li><h3>" + E(s.title) + "</h3><p>" + E(s.description || "") + "</p></li>").join("");
  const body = '<div class="fb"><header><a class="brand" href="#main">' + E(c.name) + '</a><nav aria-label="Main"><a href="#stories">Stories</a><a href="#services">How it works</a><a href="#contact">Contact</a></nav></header><main id="main">' +
    '<section class="fb-hero" aria-labelledby="h"><div class="fb-sun" aria-hidden="true"></div><div class="fb-hill fb-h1" aria-hidden="true"></div><div class="fb-hill fb-h2" aria-hidden="true"></div><div class="fb-hill fb-h3" aria-hidden="true"></div><div class="fb-hill fb-h4" aria-hidden="true"></div>' +
    '<div class="fb-copy"><h1 id="h">' + letters(c.headline) + "</h1><p>" + E(c.bio) + "</p>" + contactLink(c, "Find a gift") + "</div></section>" +
    '<section class="fb-chapters" id="stories"><h2>Every gift has a beginning</h2><div class="fb-book">' + pages + "</div></section>" +
    '<section class="fb-svc" id="services"><h2>From our shelf to their door</h2><ul>' + svc + "</ul></section>" +
    '<section class="fb-end" id="contact"><h2>Tell us who it\'s for.</h2>' + contactLink(c, "Write to us") + "</section></main>" +
    "<footer><span>" + E(c.name) + '</span><a href="#main">Back to top</a></footer></div>';
  return { css, body, fonts: "family=Gloock&family=Karla:wght@400;700" };
}

/* ---------- 6. Skyward Mission: launch ---------- */
function launch(c, o) {
  const css = `
@property --t{syntax:"<integer>";initial-value:10;inherits:false}
.ln{--black:#000;--white:#f4f4f2;--flame:#ff6a1a;--grey:#8b8b88;background:var(--black);color:var(--white);font:400 17px/1.6 Barlow,system-ui,sans-serif}
.ln header{position:absolute;left:0;right:0;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:22px clamp(18px,4vw,56px)}
.ln .brand{font:800 22px/1 "Big Shoulders Display",sans-serif;letter-spacing:.02em;text-decoration:none;text-transform:uppercase}
.ln nav{display:flex;gap:28px;font-weight:600}.ln nav a{text-decoration:none;opacity:.75}.ln nav a:hover{opacity:1}
.ln-hero{position:relative;min-height:100svh;display:grid;place-items:center;text-align:center;overflow:hidden;isolation:isolate;padding:100px clamp(18px,4vw,56px) 60px}
.ln-stars,.ln-stars:after{position:absolute;inset:-50% 0 0;z-index:-2;background-image:radial-gradient(1px 1px at 10% 20%,#fff,transparent),radial-gradient(1px 1px at 30% 70%,#fff,transparent),radial-gradient(2px 2px at 55% 35%,#fff,transparent),radial-gradient(1px 1px at 75% 15%,#fff,transparent),radial-gradient(1px 1px at 88% 60%,#fff,transparent),radial-gradient(2px 2px at 20% 90%,#fff,transparent),radial-gradient(1px 1px at 65% 85%,#fff,transparent);background-size:340px 340px;animation:drift 40s linear infinite}
.ln-stars:after{content:"";inset:0;background-size:520px 520px;opacity:.6;animation-duration:70s}
@keyframes drift{to{transform:translateY(340px)}}
.ln-count{position:absolute;inset:0;display:grid;place-items:center;font:900 clamp(200px,45vw,640px)/1 "Big Shoulders Display";color:transparent;-webkit-text-stroke:2px rgba(244,244,242,.18);counter-reset:t var(--t);animation:count 3s steps(10,end) .2s both,away .6s ease 3.2s both;z-index:-1}
.ln-count:after{content:counter(t)}
@keyframes count{to{--t:0}}@keyframes away{to{opacity:0;transform:scale(1.4)}}
.ln-trail{position:absolute;left:50%;bottom:0;width:4px;height:0;opacity:1;translate:-50% 0;background:linear-gradient(to top,transparent,var(--flame) 30%,#fff);box-shadow:0 0 24px var(--flame);border-radius:4px;z-index:-1;animation:trail 1.4s cubic-bezier(.6,0,.2,1) 3.2s forwards}
@keyframes trail{to{height:120%;opacity:0}}
.ln h1{font:900 clamp(80px,17vw,300px)/.88 "Big Shoulders Display";text-transform:uppercase;letter-spacing:-.01em}
.ln h1 .split{display:inline-block;animation:launch 1.2s cubic-bezier(.2,.9,.1,1) 3.25s both}
@keyframes launch{from{letter-spacing:.6em;opacity:0;filter:blur(10px);transform:translateY(40px)}}
.ln-hero p{max-width:46ch;margin:26px auto 0;color:#c8c8c4;font-size:clamp(18px,1.6vw,21px);animation:fadein 1s ease 3.8s both}
.ln .cta{display:inline-flex;margin-top:30px;padding:16px 30px;border:2px solid var(--white);font:700 15px Barlow;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;transition:background .2s,color .2s;animation:fadein 1s ease 4s both}.ln .cta:hover{background:var(--white);color:var(--black)}.ln .cta-muted{border-color:var(--grey);color:var(--grey);text-transform:none;letter-spacing:0}
@keyframes fadein{from{opacity:0}}
.ln-log{padding:clamp(80px,10vw,150px) clamp(18px,4vw,56px)}
.ln h2{font:900 clamp(48px,8vw,130px)/.85 "Big Shoulders Display";text-transform:uppercase;max-width:12ch}
.ln-missions{margin-top:clamp(40px,6vw,80px);border-top:1px solid #333}
.ln-mission{display:grid;grid-template-columns:120px minmax(0,1fr) minmax(0,1fr);gap:30px;padding:clamp(26px,3vw,40px) 0;border-bottom:1px solid #333;align-items:baseline}
.ln-mission .t{font:900 clamp(40px,4vw,64px)/1 "Big Shoulders Display";color:var(--flame)}
.ln-mission h3{font:800 clamp(26px,3vw,44px)/1 "Big Shoulders Display";text-transform:uppercase}.ln-mission p{color:#b5b5b0}
@supports (animation-timeline:view()){.ln-mission{animation:slidein linear both;animation-timeline:view();animation-range:entry 0% cover 35%}@keyframes slidein{from{opacity:0;transform:translateX(-40px)}}}
.ln-svc{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid #333;border-bottom:1px solid #333}
.ln-svc article{padding:clamp(30px,4vw,56px);border-right:1px solid #333}.ln-svc article:last-child{border-right:0}
.ln-svc h3{font:800 32px/1 "Big Shoulders Display";text-transform:uppercase;margin-bottom:14px}.ln-svc p{color:#b5b5b0}
.ln-end{position:relative;padding:clamp(100px,14vw,200px) clamp(18px,4vw,56px);text-align:center;overflow:hidden;background:radial-gradient(60% 80% at 50% 120%,#ff6a1a55,transparent 70%)}.ln-end h2{margin:0 auto}
.ln footer{display:flex;justify-content:space-between;padding:24px clamp(18px,4vw,56px);font-size:14px;color:var(--grey);border-top:1px solid #333}
@media(max-width:860px){.ln nav{gap:14px;font-size:13px}.ln-mission{grid-template-columns:1fr;gap:8px}.ln-svc{grid-template-columns:1fr}.ln-svc article{border-right:0;border-bottom:1px solid #333}}
@media (prefers-reduced-motion:reduce){.ln-count,.ln-trail{display:none}}`;
  const missions = c.cards.slice(0, 3).map((k, i) => '<article class="ln-mission"><span class="t" aria-hidden="true">T+' + String((i + 1) * 3).padStart(2, "0") + "</span><h3>" + E(k.title) + "</h3><p>" + E(k.description) + "</p></article>").join("");
  const svc = (c.services || []).slice(0, 3).map(s => "<article><h3>" + E(s.title) + "</h3><p>" + E(s.description || "") + "</p></article>").join("");
  const body = '<div class="ln"><header><a class="brand" href="#main">' + E(c.name) + '</a><nav aria-label="Main"><a href="#missions">Missions</a><a href="#services">Services</a><a href="#contact">Contact</a></nav></header><main id="main">' +
    '<section class="ln-hero" aria-labelledby="h"><div class="ln-stars" aria-hidden="true"></div><div class="ln-count" aria-hidden="true"></div><div class="ln-trail" aria-hidden="true"></div><div><h1 id="h">' + letters(c.headline) + "</h1><p>" + E(c.bio) + "</p>" + contactLink(c, "Book a launch") + "</div></section>" +
    '<section class="ln-log" id="missions"><h2>Mission log</h2><div class="ln-missions">' + missions + "</div></section>" +
    '<section class="ln-svc" id="services" aria-label="Services">' + svc + "</section>" +
    '<section class="ln-end" id="contact"><h2>Your payload. Our rocket.</h2>' + contactLink(c, "Book a launch") + "</section></main>" +
    "<footer><span>" + E(c.name) + '</span><a href="#main">Back to top</a></footer></div>';
  return { css, body, fonts: "family=Big+Shoulders+Display:wght@800;900&family=Barlow:wght@400;600;700" };
}

const DESIGNS = { "md-dji": altitude, "md-shopify": stall, "md-coinbase": ticker, "md-sentry": signal, "md-starbucks": storybook, "md-spacex": launch };

export function renderShowpiece(id, v, options = {}) {
  const make = DESIGNS[id];
  if (!make) return null;
  const c = contentFor(id, v, !!options.sample);
  c.cards = (c.cards || []).filter(Boolean);
  c._sample = !!options.sample;
  const { css, body, fonts } = make(c, options);
  return page({ title: c.name + " / " + c.headline, fonts, css, body, sample: !!options.sample, bodyClass: "sp-" + id });
}
