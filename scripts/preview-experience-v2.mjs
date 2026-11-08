import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("qa/111-prospect-revamp.json", "utf8"));
const bySlug = new Map(manifest.sites.map((site, index) => [site.slug, { ...site, index }]));

const esc = value => String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const stripTags = value => String(value || "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
const domainIs = (hostname, suffix) => hostname === suffix || hostname.endsWith("." + suffix);

function isApprovedDestination(href) {
  if (!/^https?:\/\//i.test(href)) return true;
  let url;
  try { url = new URL(href.replace(/&amp;/g, "&")); } catch { return false; }
  const host = url.hostname.toLowerCase().replace(/^(www|m)\./, "");
  if (domainIs(host, "aweconcepts.com")) return true;
  if (host === "maps.app.goo.gl" || host === "maps.google.com") return true;
  if (host === "google.com" && url.pathname.startsWith("/maps")) return true;
  const social = ["instagram.com", "facebook.com", "tiktok.com", "youtube.com", "youtu.be", "threads.net", "linkedin.com", "x.com", "twitter.com", "pinterest.com", "yelp.com"];
  if (social.some(domain => domainIs(host, domain))) return true;
  const booking = ["as.me", "acuityscheduling.com", "calendly.com", "resy.com", "opentable.com", "eventbrite.com", "exploretock.com"];
  if (booking.some(domain => domainIs(host, domain))) return true;
  return false;
}

export function stripOriginalSiteLinks(html, pagePath = "") {
  const fallback = /id=["']details["']/.test(html) ? "#details"
    : /id=["']visit["']/.test(html) ? "#visit"
    : /id=["']contact["']/.test(html) ? "#contact"
    : /id=["']experience["']/.test(html) ? "#experience"
    : /id=["']main["']/.test(html) ? "#main" : "./";
  let count = 0;
  const out = html.replace(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>[\s\S]*?<\/a>/gi, (whole, quote, href) => {
    if (isApprovedDestination(href)) return whole;
    const at = whole.indexOf(">");
    let open = whole.slice(0, at + 1);
    let content = whole.slice(at + 1, -4);
    open = open.replace(/\bhref\s*=\s*(["']).*?\1/i, 'href="' + fallback + '"')
      .replace(/\s+target\s*=\s*(["']).*?\1/gi, "")
      .replace(/\s+rel\s*=\s*(["']).*?\1/gi, "");
    if (/original|official site|source|business website|business site|website|book now|order now|learn more|discover/i.test(stripTags(content))
        && !/<(?:img|svg)\b/i.test(content)) {
      content = "Explore the concept";
    }
    count++;
    return open + content + "</a>";
  });
  return { html: out, removed: count, pagePath };
}

const labels = {
  asian: "A taste of the neighborhood", restaurant: "The table, considered",
  pizza: "Good things, shared", matcha: "A greener ritual",
  coffee: "Behind the cup", wellness: "The art of feeling good",
  bar: "After hours, reimagined", bakery: "The details behind the bake",
  burger: "The good stuff, up close", entertainment: "Find your next moment",
  mexican: "Full of character", retail: "The local edit",
  sweets: "Something worth savoring", japanese: "The finer details",
  flowers: "A little more color"
};
const invitation = {
  asian: "Come hungry.", restaurant: "Find your seat.", pizza: "Meet at the table.",
  matcha: "See you for matcha.", coffee: "Your next coffee stop.",
  wellness: "Make time for yourself.", bar: "Make a night of it.",
  bakery: "Meet you at the counter.", burger: "Bring your appetite.",
  entertainment: "See what is happening.", mexican: "Pull up a chair.",
  retail: "Come have a look.", sweets: "A sweet little detour.",
  japanese: "Come discover.", flowers: "Find something beautiful."
};

const sharedCss = [
  "body.awe-v2 .awe-v2-panel{position:relative;isolation:isolate;padding:clamp(64px,9vw,150px) clamp(20px,6vw,115px);overflow:hidden;background:var(--paper);color:var(--ink)}",
  "body.awe-v2 .awe-v2-label{font:800 11px/1.4 Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;opacity:.7}",
  "body.awe-v2 .awe-v2-header{display:flex;justify-content:space-between;align-items:flex-start;gap:4vw;margin-bottom:clamp(36px,6vw,90px)}",
  "body.awe-v2 .awe-v2-header h2{font-family:var(--display,Georgia,serif);font-size:clamp(3.4rem,7.5vw,9.4rem);line-height:.9;letter-spacing:-.065em;margin:16px 0 0;max-width:1100px;overflow-wrap:break-word}",
  "body.awe-v2 .awe-v2-header h2 em{font-weight:400;color:var(--accent);font-style:italic}",
  "body.awe-v2 .awe-v2-area{max-width:235px;line-height:1.5;font-size:clamp(13px,1.3vw,17px);opacity:.8}",
  "body.awe-v2 .awe-v2-stage{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,3vw,56px);align-items:start}",
  "body.awe-v2 .awe-v2-photo{position:relative;overflow:hidden;min-height:380px;background:var(--ink);margin:0}",
  "body.awe-v2 .awe-v2-photo img{display:block;width:100%;height:100%;position:absolute;inset:0;object-fit:cover;transition:transform .8s cubic-bezier(.18,.75,.2,1)}",
  "body.awe-v2 .awe-v2-photo:hover img{transform:scale(1.045)}",
  "body.awe-v2 .awe-v2-photo figcaption{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.75));color:#fff;padding:40px 23px 18px;font:700 10px/1.4 Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase}",
  "body.awe-v2 .awe-v2-content{display:grid;grid-template-columns:1fr;gap:0;min-width:0}",
  "body.awe-v2 .awe-v2-note{padding:22px 0 26px;border-top:1px solid currentColor;display:grid;grid-template-columns:70px 1fr;column-gap:25px;align-items:baseline}",
  "body.awe-v2 .awe-v2-note b{font:800 13px Arial,sans-serif;opacity:.55}",
  "body.awe-v2 .awe-v2-note h3{margin:0 0 10px;font-family:var(--display,Georgia,serif);font-size:clamp(1.65rem,2.7vw,3.5rem);line-height:1.05;letter-spacing:-.035em}",
  "body.awe-v2 .awe-v2-note p{grid-column:2;font-size:clamp(14px,1.2vw,17px);line-height:1.7;margin:0;opacity:.8;max-width:570px}",
  "body.awe-v2 .awe-v2-portrait{height:240px;min-height:240px;margin-top:35px}",
  "body.awe-v2 .awe-v2-end{margin-top:65px;padding-top:25px;border-top:1px solid currentColor;display:flex;justify-content:space-between;gap:20px;align-items:center}",
  "body.awe-v2 .awe-v2-end a{display:inline-flex;min-height:46px;align-items:center;justify-content:center;background:var(--ink);color:var(--paper);font:800 11px Arial,sans-serif;letter-spacing:.12em;text-decoration:none;text-transform:uppercase;padding:15px 24px}",
  "body.awe-v2 .awe-v2-end p{margin:0;font-size:13px;line-height:1.5;max-width:520px}",
  "body.awe-v2 .closing h2{overflow-wrap:break-word;font-size:clamp(3.4rem,7vw,8rem);line-height:.93;letter-spacing:-.05em}",
  "body.awe-v2 .hero h1{hyphens:auto;overflow-wrap:break-word}",
  "body.awe-v2 .marquee-track{animation-play-state:running}",
  "@keyframes awe-v2-in{from{opacity:.3;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}",
  "body.awe-v2 .awe-v2-header{animation:awe-v2-in .8s both}",
  "@media(prefers-reduced-motion:reduce){body.awe-v2 .awe-v2-header{animation:none}body.awe-v2 .awe-v2-photo img{transition:none}}",
  "@media(max-width:760px){body.awe-v2 .awe-v2-panel{padding:65px 6vw}body.awe-v2 .awe-v2-header{display:block;margin-bottom:32px}body.awe-v2 .awe-v2-header h2{font-size:clamp(3rem,12vw,5rem);max-width:100%}body.awe-v2 .awe-v2-area{margin-top:20px;max-width:100%}body.awe-v2 .awe-v2-stage{display:flex;flex-direction:column;gap:25px}body.awe-v2 .awe-v2-photo{width:100%;height:360px;min-height:360px}body.awe-v2 .awe-v2-portrait{height:185px;min-height:185px}body.awe-v2 .awe-v2-content{width:100%}body.awe-v2 .awe-v2-note{grid-template-columns:38px 1fr;gap:12px;padding:22px 0}body.awe-v2 .awe-v2-note h3{font-size:clamp(1.75rem,7vw,2.6rem)}body.awe-v2 .awe-v2-note p{grid-column:2;font-size:15px}body.awe-v2 .awe-v2-end{flex-direction:column;align-items:flex-start;margin-top:35px}body.awe-v2 .awe-v2-end a{width:100%}body.awe-v2 .closing h2{font-size:clamp(3.2rem,11vw,5.2rem)}body.awe-v2 .hero h1{overflow-wrap:break-word}}"
].join("\n");

const layouts = [
  "body.awe-v2.v2-mode-0 .awe-v2-panel{background:var(--ink);color:var(--paper)}body.awe-v2.v2-mode-0 .awe-v2-photo{height:690px}body.awe-v2.v2-mode-0 .awe-v2-portrait{display:none}body.awe-v2.v2-mode-0 .awe-v2-end a{background:var(--accent);color:var(--paper)}",
  "body.awe-v2.v2-mode-1 .awe-v2-panel{background:var(--paper)}body.awe-v2.v2-mode-1 .awe-v2-stage{grid-template-columns:1.35fr .65fr}body.awe-v2.v2-mode-1 .awe-v2-photo{height:620px;border-radius:310px 310px 0 0}body.awe-v2.v2-mode-1 .awe-v2-header h2{font-style:italic;font-weight:400}",
  "body.awe-v2.v2-mode-2 .awe-v2-panel{background:var(--accent);color:var(--paper)}body.awe-v2.v2-mode-2 .awe-v2-stage{grid-template-columns:.7fr 1.3fr}body.awe-v2.v2-mode-2 .awe-v2-content{grid-column:1;grid-row:1}body.awe-v2.v2-mode-2 .awe-v2-photo{grid-column:2;grid-row:1;height:720px;clip-path:polygon(12% 0,100% 0,100% 100%,0 85%)}body.awe-v2.v2-mode-2 .awe-v2-header h2 em{color:var(--ink)}",
  "body.awe-v2.v2-mode-3 .awe-v2-stage{grid-template-columns:.85fr 1.15fr}body.awe-v2.v2-mode-3 .awe-v2-photo{height:540px;transform:rotate(-3deg);box-shadow:22px 22px 0 var(--accent)}body.awe-v2.v2-mode-3 .awe-v2-portrait{display:none}body.awe-v2.v2-mode-3 .awe-v2-header h2{font-family:Arial,sans-serif;text-transform:uppercase;font-weight:900}",
  "body.awe-v2.v2-mode-4 .awe-v2-panel{background:var(--ink);color:var(--paper)}body.awe-v2.v2-mode-4 .awe-v2-stage{display:block;min-height:650px;position:relative}body.awe-v2.v2-mode-4 .awe-v2-photo{position:absolute;inset:0;height:100%;min-height:650px}body.awe-v2.v2-mode-4 .awe-v2-photo img{filter:brightness(.35)}body.awe-v2.v2-mode-4 .awe-v2-content{position:relative;max-width:850px;margin:0 auto;padding:60px;background:rgba(0,0,0,.65);backdrop-filter:blur(8px)}body.awe-v2.v2-mode-4 .awe-v2-portrait{display:none}body.awe-v2.v2-mode-4 .awe-v2-end a{background:var(--accent)}",
  "body.awe-v2.v2-mode-5 .awe-v2-panel{background:var(--paper)}body.awe-v2.v2-mode-5 .awe-v2-stage{grid-template-columns:1fr 1fr;gap:0}body.awe-v2.v2-mode-5 .awe-v2-photo{height:750px;border-radius:0 260px 0 0}body.awe-v2.v2-mode-5 .awe-v2-content{background:var(--ink);color:var(--paper);padding:4vw}body.awe-v2.v2-mode-5 .awe-v2-portrait{display:none}",
  "body.awe-v2.v2-mode-6 .awe-v2-panel{background:var(--paper)}body.awe-v2.v2-mode-6 .awe-v2-stage{grid-template-columns:.75fr 1.25fr}body.awe-v2.v2-mode-6 .awe-v2-photo{height:490px;border:22px solid var(--ink);border-radius:50%}body.awe-v2.v2-mode-6 .awe-v2-portrait{height:170px;min-height:170px}body.awe-v2.v2-mode-6 .awe-v2-header h2{font-variant:small-caps}",
  "body.awe-v2.v2-mode-7 .awe-v2-panel{background:var(--accent);color:var(--paper)}body.awe-v2.v2-mode-7 .awe-v2-stage{grid-template-columns:1.4fr .6fr}body.awe-v2.v2-mode-7 .awe-v2-photo{height:600px;border:12px solid var(--paper)}body.awe-v2.v2-mode-7 .awe-v2-note{border-top:2px solid currentColor}body.awe-v2.v2-mode-7 .awe-v2-portrait{display:none}",
  "body.awe-v2.v2-mode-8 .awe-v2-panel{background:var(--ink);color:var(--paper)}body.awe-v2.v2-mode-8 .awe-v2-stage{grid-template-columns:.8fr 1.2fr}body.awe-v2.v2-mode-8 .awe-v2-photo{height:650px;border-radius:300px 0 300px 0}body.awe-v2.v2-mode-8 .awe-v2-portrait{display:none}body.awe-v2.v2-mode-8 .awe-v2-header h2{letter-spacing:-.09em;font-weight:900}",
  "body.awe-v2.v2-mode-9 .awe-v2-stage{grid-template-columns:1.15fr .85fr}body.awe-v2.v2-mode-9 .awe-v2-photo{height:700px;clip-path:polygon(0 0,100% 9%,93% 100%,0 100%)}body.awe-v2.v2-mode-9 .awe-v2-header{flex-direction:row-reverse}body.awe-v2.v2-mode-9 .awe-v2-header h2{text-transform:uppercase;font-family:Arial,sans-serif;font-weight:900}",
  "body.awe-v2.v2-mode-10 .awe-v2-panel{background:var(--paper)}body.awe-v2.v2-mode-10 .awe-v2-stage{grid-template-columns:1fr 1fr;gap:8vw}body.awe-v2.v2-mode-10 .awe-v2-photo{height:570px;transform:rotate(3deg);box-shadow:-20px 20px 0 var(--accent)}body.awe-v2.v2-mode-10 .awe-v2-portrait{height:220px;min-height:220px;border-radius:180px 180px 0 0}body.awe-v2.v2-mode-10 .awe-v2-header h2{font-family:Georgia,serif;font-weight:400}",
  "body.awe-v2.v2-mode-11 .awe-v2-panel{background:var(--ink);color:var(--paper)}body.awe-v2.v2-mode-11 .awe-v2-header{display:block;text-align:center}body.awe-v2.v2-mode-11 .awe-v2-header h2{margin:24px auto;max-width:1000px}body.awe-v2.v2-mode-11 .awe-v2-stage{grid-template-columns:1fr 1fr;gap:5vw}body.awe-v2.v2-mode-11 .awe-v2-photo{height:590px;border-radius:250px 250px 0 0}body.awe-v2.v2-mode-11 .awe-v2-portrait{display:none}"
];
const mobileCss = [
  "@media(max-width:760px){body.awe-v2 .awe-v2-stage{display:flex;flex-direction:column}body.awe-v2 .awe-v2-photo{position:relative;inset:auto;transform:none;clip-path:none;box-shadow:none;border-width:0;height:340px;min-height:340px;border-radius:0}body.awe-v2 .awe-v2-content{grid-column:auto;grid-row:auto;position:relative;max-width:100%;padding:0;background:transparent;color:inherit;backdrop-filter:none}body.awe-v2 .awe-v2-portrait{display:none}body.awe-v2 .awe-v2-header{display:block;text-align:left}body.awe-v2 .awe-v2-header h2{margin:16px 0;font-size:clamp(3rem,12vw,5rem)}body.awe-v2 .awe-v2-end a{background:var(--ink);color:var(--paper)}body.awe-v2 .awe-v2-header h2 em{color:inherit;opacity:.78}body.awe-v2.v2-mode-1 .awe-v2-photo,body.awe-v2.v2-mode-11 .awe-v2-photo{border-radius:170px 170px 0 0}body.awe-v2.v2-mode-6 .awe-v2-photo{border-radius:50%;border:12px solid var(--ink)}body.awe-v2.v2-mode-8 .awe-v2-photo{border-radius:150px 0 150px 0}body.awe-v2.v2-mode-4 .awe-v2-stage{min-height:0}body.awe-v2.v2-mode-4 .awe-v2-photo{filter:none}body.awe-v2.v2-mode-4 .awe-v2-photo img{filter:none}body.awe-v2.v2-mode-4 .awe-v2-content{margin-top:22px}body.awe-v2.v2-mode-2 .awe-v2-content{order:2}body.awe-v2.v2-mode-5 .awe-v2-content{padding:22px;background:var(--ink);color:var(--paper)}body.awe-v2.v2-mode-7 .awe-v2-photo{border:8px solid var(--paper)}body.awe-v2.v2-mode-3 .awe-v2-header h2,body.awe-v2.v2-mode-9 .awe-v2-header h2{font-size:clamp(2.8rem,11vw,5rem)}body.awe-v2.v2-mode-10 .awe-v2-photo{transform:rotate(-2deg)}body.awe-v2.v2-mode-0 .awe-v2-end a,body.awe-v2.v2-mode-4 .awe-v2-end a{background:var(--accent)}body.awe-v2.v2-mode-7 .awe-v2-end a{background:var(--ink);color:var(--paper)}}"
].join("\n");

function upgradeProspect(html, site) {
  if (!html.includes("awe-distinctive-direction-2026") || !html.includes('class="details section"')) return html;
  const found = html.match(/<section class="details section" id="details">[\s\S]*?<\/section>/);
  if (!found) return html;
  const features = [...found[0].matchAll(/<article class="feature">[\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<p>([\s\S]*?)<\/p>[\s\S]*?<\/article>/g)];
  if (!features.length) return html;
  const photos = [...html.matchAll(/<img\b[^>]*\bsrc="(https?:\/\/[^"]+)"[^>]*>/g)]
    .map(match => match[1]).filter(url => /unsplash|images\.pexels|cloudinary|firebasestorage|storage\.googleapis/i.test(url));
  const imageA = photos[1] || photos[0] || (site.photos || [])[1];
  const imageB = photos[2] || photos[0] || (site.photos || [])[2];
  if (!imageA) return html;
  const mode = (site.index * 7 + String(site.genre).length * 3) % layouts.length;
  const genre = esc(site.genre || "independent");
  const name = esc(site.name);
  const area = esc(site.area);
  const headline = esc(labels[site.genre] || "The neighborhood edit");
  const cards = features.slice(0, 3).map((match, i) => '<article class="awe-v2-note"><b>0' + (i + 1) + '</b><h3>' + match[1] + '</h3><p>' + match[2] + '</p></article>').join("");
  const replacement = '<section class="awe-v2-panel" id="details" aria-labelledby="awe-v2-title">' +
    '<div class="awe-v2-header"><div><p class="awe-v2-label">The local edit / ' + genre + '</p><h2 id="awe-v2-title">' + headline + '<em>.</em></h2></div><p class="awe-v2-area">' + name + '<br>' + area + '</p></div>' +
    '<div class="awe-v2-stage"><figure class="awe-v2-photo"><img src="' + imageA + '" loading="lazy" decoding="async" alt="Editorial atmosphere photograph for ' + name + ' website concept"><figcaption>' + name + ' / ' + area + '</figcaption></figure>' +
    '<div class="awe-v2-content">' + cards + (imageB ? '<figure class="awe-v2-photo awe-v2-portrait"><img src="' + imageB + '" loading="lazy" decoding="async" alt="Second editorial view for ' + name + '"></figure>' : '') + '</div></div>' +
    '<div class="awe-v2-end"><p><strong>' + name + '</strong> / ' + esc(site.address || area) + '</p><a href="#visit">Plan a visit</a></div></section>';
  html = html.replace(found[0], replacement);
  html = html.replace(/<body\b([^>]*)>/i, (tag) => tag.replace(/\bclass="([^"]*)"/i, (full, val) => 'class="' + val + ' awe-v2 v2-mode-' + mode + '"'));
  if (/See you<br>around\./i.test(html)) {
    const phrase = esc(invitation[site.genre] || "Come discover.");
    html = html.replace(/See you<br>around\./i, phrase + '<br><span>' + area + '.</span>');
  }
  const style = '<style data-awe-v2="2026-11-08" data-direction="' + mode + '">' + sharedCss + '\n' + layouts[mode] + '\n' + mobileCss + '</style>';
  return html.replace('</head>', style + '</head>');
}

let modifiedPages = 0;
let removedLinks = 0;
let upgradedProspects = 0;
export function enhancePublishedHtml(html, filePath) {
  const slug = filePath.split("/").slice(-2, -1)[0];
  const isHome = /\/index\.html$/.test(filePath);
  if (isHome && bySlug.has(slug)) {
    const next = upgradeProspect(html, bySlug.get(slug));
    if (next !== html) { upgradedProspects++; html = next; }
  }
  const stripped = stripOriginalSiteLinks(html, filePath);
  removedLinks += stripped.removed;
  if (stripped.html !== html) modifiedPages++;
  return stripped.html;
}
export function getEnhancementStats() {
  return { upgradedProspects, modifiedPages, removedLinks };
}
