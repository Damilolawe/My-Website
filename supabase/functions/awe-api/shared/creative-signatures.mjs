import { esc } from "./model.mjs";

// These chapters use the owner's normalized content. They never invent clients,
// bookings, products or results, and they render without executable JavaScript.
const E = esc;
const prose = (value) => E(value || "").replace(/\r?\n/g, "<br>");
const short = (value, max = 220) => String(value || "").trim().slice(0, max);
const destination = (ids) => ids.includes("work") ? "#work" : ids.includes("contact") ? "#contact" : "#main";

export function signatureMarkup(value, navIds = []) {
  const { template, content: c } = value;
  const name = E(c.name);
  const line = E(c.headline);
  const next = destination(navIds);
  const first = c.cards?.[0];
  const second = c.cards?.[1];
  switch (template) {
    case "atelier":
      return '<section class="signature signature-atelier" aria-labelledby="signature-atelier-title">' +
        '<div class="atelier-edition-top"><span>THE COLLECTION / 001</span><span>AN INDEPENDENT PRACTICE</span><span>EST. TODAY</span></div>' +
        '<div class="atelier-edition-stage"><span class="atelier-edition-number" aria-hidden="true">01</span>' +
        '<div class="atelier-edition-copy"><span class="signature-kicker">THE ART OF EXPRESSION</span><h2 id="signature-atelier-title">' + name + '</h2>' +
        '<p>' + line + '</p><a href="' + next + '">Discover the collection <span aria-hidden="true">↗︎</span></a></div>' +
        '<div class="atelier-edition-composition" aria-hidden="true"><span class="atelier-edition-oval"></span><span class="atelier-edition-seam"></span><span class="atelier-edition-mark">A</span></div></div>' +
        '<div class="atelier-edition-bottom"><span>FORM / PRESENCE / POINT OF VIEW</span><span>SCROLL TO EXPLORE ↓︎</span></div></section>';
    case "signal":
      return '<section class="signature signature-signal" aria-labelledby="signature-signal-title">' +
        '<div class="signal-broadcast-head"><span>TRANSMISSION 001</span><span>STAY TUNED / KEEP MAKING</span></div>' +
        '<div class="signal-broadcast-grid"><div class="signal-broadcast-title"><span class="signature-kicker">A CREATIVE FREQUENCY</span>' +
        '<h2 id="signature-signal-title">' + line + '</h2><a href="' + next + '">See the work ↗︎</a></div>' +
        '<div class="signal-broadcast-object" aria-hidden="true"><span class="signal-object-disc"></span><span class="signal-object-eye"></span><span class="signal-object-bar">IDEAS / IN MOTION</span></div>' +
        '<div class="signal-broadcast-note"><b>' + name + '</b><span>NOT MADE TO BLEND IN.</span></div></div>' +
        '<div class="signal-broadcast-foot" aria-hidden="true"><span>MAKE IT FEEL LIKE SOMETHING ◆ MAKE IT FEEL LIKE SOMETHING ◆</span></div></section>';
    case "orbit": {
      const concept = short(c.bio?.split("\n")[0], 240) || "A point of view in motion.";
      const project = first ? short(first.title, 120) : "Selected work";
      const detail = first?.description ? short(first.description, 280) : "Explore the work and the thinking behind it.";
      return '<section class="signature signature-orbit" aria-labelledby="signature-orbit-title">' +
        '<div class="orbit-console-head"><span>ORBIT / 360</span><span>EXPLORATION SYSTEM · 001</span><span class="orbit-console-live">DESIGN STUDY</span></div>' +
        '<div class="orbit-console-grid"><div class="orbit-console-visual" aria-hidden="true">' +
        '<svg viewBox="0 0 640 640" focusable="false"><defs><radialGradient id="orbit-glow"><stop stop-color="currentColor" stop-opacity=".7"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs>' +
        '<circle cx="320" cy="320" r="210" fill="none" stroke="currentColor" stroke-width="1" opacity=".24"/>' +
        '<circle cx="320" cy="320" r="270" fill="none" stroke="currentColor" stroke-width="1" opacity=".14"/>' +
        '<g class="orbit-console-rotor"><ellipse cx="320" cy="320" rx="272" ry="95" fill="none" stroke="currentColor" stroke-width="2" opacity=".75"/>' +
        '<circle cx="50" cy="320" r="8" fill="currentColor"/></g><circle cx="320" cy="320" r="114" fill="url(#orbit-glow)"/>' +
        '<circle cx="320" cy="320" r="68" fill="none" stroke="currentColor" stroke-width="3"/>' +
        '<path d="M320 248v144M248 320h144" stroke="currentColor" opacity=".48"/></svg>' +
        '<span class="orbit-console-coordinates">AXIS / 001 / OPEN ENDED</span></div>' +
        '<div class="orbit-console-content"><span class="signature-kicker">DISCOVER THE SIGNAL</span><h2 id="signature-orbit-title">' + line + '</h2>' +
        '<p class="orbit-console-deck">' + name + ' / A living body of work.</p>' +
        '<div class="orbit-console-panels"><details><summary><span>01 / THE POINT OF VIEW</span><span aria-hidden="true">+</span></summary><p>' + prose(concept) + '</p></details>' +
        '<details><summary><span>02 / SELECTED WORK</span><span aria-hidden="true">+</span></summary><p><strong>' + E(project) + '</strong><br>' + prose(detail) + '</p></details>' +
        '<details><summary><span>03 / WHAT COMES NEXT</span><span aria-hidden="true">+</span></summary><p><a href="' + next + '">Explore the next chapter ↗︎</a></p></details></div>' +
        '</div></div><div class="orbit-console-foot"><span>IDEA / OBSERVATION / EXECUTION</span><span>SCROLL TO CONTINUE ↓︎</span></div></section>';
    }
    case "afterhours": {
      const shots = [first, second].filter(Boolean);
      return '<section class="signature signature-afterhours" aria-labelledby="signature-afterhours-title">' +
        '<div class="afterhours-sequence-head"><span>REEL / 001</span><span>AN INTRODUCTION TO THE WORK</span><span>00:00:01:24</span></div>' +
        '<div class="afterhours-sequence-main"><div class="afterhours-sequence-type"><span class="signature-kicker">A STORY IN FRAMES</span>' +
        '<h2 id="signature-afterhours-title">THE<br><em>NEXT</em><br>SCENE.</h2><p>' + name + ' / ' + line + '</p>' +
        '<a href="' + next + '">Enter the portfolio ↗︎</a></div>' +
        '<div class="afterhours-sequence-stills"><div class="afterhours-sequence-frame" aria-hidden="true"><span>FRAME 01 / A NEW PERSPECTIVE</span><b>01</b></div>' +
        (shots.length ? shots.map((shot, i) => '<details><summary><span>0' + (i + 1) + ' / ' + E(short(shot.title, 90)) + '</span><span aria-hidden="true">+</span></summary>' +
          '<p>' + prose(short(shot.description, 300) || "A selected piece from the portfolio.") + '</p></details>').join("") :
          '<p class="afterhours-sequence-empty">A space for the work that deserves to be seen.</p>') +
        '</div></div><div class="afterhours-sequence-foot" aria-hidden="true">◼︎ ◼︎ ◼︎ ◼︎ ◼︎ ◼︎ ◼︎ ◼︎ ◼︎ ◼︎ ◼︎ ◼︎</div></section>';
    }
    default:
      return "";
  }
}

export const signatureCSS = `
.signature{position:relative;min-width:0;overflow:clip;margin:clamp(55px,9vw,140px) 0;isolation:isolate}
.signature *{box-sizing:border-box}
.signature-kicker{font:700 11px/1.4 ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase}
.signature a{display:inline-flex;gap:30px;align-items:center;min-height:48px;text-underline-offset:5px}
.signature details{border-top:1px solid currentColor}
.signature details:last-child{border-bottom:1px solid currentColor}
.signature summary{display:flex;justify-content:space-between;gap:15px;cursor:pointer;padding:18px 0;min-height:52px;list-style:none;font:700 12px/1.5 ui-monospace,monospace;letter-spacing:.1em}
.signature summary::-webkit-details-marker{display:none}
.signature summary span:last-child{font-size:20px;line-height:1}
.signature details[open] summary span:last-child{transform:rotate(45deg)}
.signature details p{margin:0 0 25px;max-width:45ch;font-size:16px;line-height:1.6}
.signature :is(a,summary):focus-visible{outline:3px solid var(--accent);outline-offset:5px}

/* An editorial issue: hairlines, outsized type, sculptural figure and spacious pacing. */
.signature-atelier{background:#eae4d9;color:#252321;padding:clamp(18px,3vw,42px)}
.atelier-edition-top,.atelier-edition-bottom{display:flex;justify-content:space-between;gap:20px;border-block:1px solid #3936317a;padding:13px 0;font:700 10px/1.5 ui-monospace,monospace;letter-spacing:.13em}
.atelier-edition-stage{min-height:clamp(560px,58vw,820px);display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);align-items:center;position:relative}
.atelier-edition-number{position:absolute;top:1%;left:-.06em;font:italic 400 clamp(160px,31vw,490px)/.8 Georgia,serif;letter-spacing:-.12em;color:#9a897c38;pointer-events:none}
.atelier-edition-copy{position:relative;z-index:2;padding:clamp(50px,11vw,160px) 0 50px clamp(15px,3vw,50px)}
.atelier-edition-copy h2{font:italic 400 clamp(68px,9vw,170px)/.81 Georgia,serif;letter-spacing:-.095em;overflow-wrap:anywhere;max-width:10ch;margin:35px 0}
.atelier-edition-copy p{font:400 clamp(17px,2vw,25px)/1.4 Georgia,serif;max-width:26ch}
.atelier-edition-copy a{font:700 12px ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em}
.atelier-edition-composition{height:clamp(410px,47vw,670px);align-self:center;position:relative;background:linear-gradient(130deg,color-mix(in srgb,var(--secondary) 45%,#302821),#171717);box-shadow:24px 24px 0 color-mix(in srgb,var(--accent) 30%,#b7aa98)}
.atelier-edition-oval{position:absolute;inset:10% 18%;border:clamp(13px,3vw,45px) solid #e8e0d0;border-radius:48% 48% 40% 40%;transform:rotate(-18deg);box-shadow:inset -20px -20px 35px #0007,15px 20px 35px #0007}
.atelier-edition-seam{position:absolute;inset:7%;border:1px solid #f7f1e477}
.atelier-edition-mark{position:absolute;right:4%;bottom:-.16em;color:#eae4d9;font:italic 400 clamp(190px,30vw,430px)/.9 Georgia,serif;mix-blend-mode:difference}
.atelier-edition-bottom{border-bottom:0}

/* Printed creative broadcast: jagged composition, sticker art and kinetic strip. */
.signature-signal{background:var(--accent);color:var(--on-accent);border:5px solid #101010;box-shadow:15px 15px 0 #101010;padding:clamp(18px,3vw,42px)}
.signal-broadcast-head{display:flex;justify-content:space-between;gap:20px;border-bottom:3px solid currentColor;padding:0 0 12px;font:900 10px ui-monospace,monospace;letter-spacing:.18em}
.signal-broadcast-grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);gap:clamp(15px,4vw,65px);min-height:620px;padding:clamp(35px,5vw,70px) 0}
.signal-broadcast-title{position:relative;z-index:2;align-self:center}
.signal-broadcast-title h2{font:900 clamp(57px,7.3vw,135px)/.84 Impact,Arial,sans-serif;letter-spacing:-.065em;text-transform:uppercase;overflow-wrap:anywhere;max-width:10ch;transform:rotate(-2deg);margin:25px 0}
.signal-broadcast-title a{background:#101010;color:#fff;padding:12px 22px;transform:rotate(2deg);font:800 13px ui-monospace,monospace;text-transform:uppercase}
.signal-broadcast-object{position:relative;min-height:430px;background:repeating-linear-gradient(125deg,transparent 0 24px,#10101023 24px 26px),color-mix(in srgb,var(--secondary) 75%,#fff);border:5px solid #101010;transform:rotate(6deg);box-shadow:16px 19px 0 #10101080;align-self:center}
.signal-object-disc{position:absolute;inset:10%;border:clamp(18px,3vw,45px) solid #101010;border-radius:50%;box-shadow:15px 25px 0 #10101050;transform:rotate(-17deg) scaleX(.8)}
.signal-object-eye{position:absolute;left:41%;top:37%;width:18%;aspect-ratio:1;background:#101010;border-radius:50%;box-shadow:0 0 0 18px var(--accent)}
.signal-object-bar{position:absolute;bottom:8%;left:-16%;background:#101010;color:#fff;padding:14px 22px;transform:rotate(-11deg);font:900 16px ui-monospace,monospace;white-space:nowrap}
.signal-broadcast-note{grid-column:1/-1;display:flex;justify-content:space-between;gap:20px;align-items:end;border-top:3px solid currentColor;padding-top:20px;font:900 clamp(14px,2vw,27px)/1.1 Impact,Arial,sans-serif;letter-spacing:.06em}
.signal-broadcast-foot{overflow:hidden;white-space:nowrap;border-top:2px solid currentColor;font:900 23px Impact,Arial,sans-serif;letter-spacing:.09em;padding-top:13px}

/* A restrained technical instrument with a functional three-part briefing. */
.signature-orbit{background:radial-gradient(circle at 29% 44%,#104d59,#071924 51%,#040d15);color:#e3f5f2;border:1px solid #72def64d;padding:clamp(18px,2.7vw,40px)}
.orbit-console-head,.orbit-console-foot{display:flex;justify-content:space-between;gap:20px;align-items:center;border-bottom:1px solid #a1d9e544;padding-bottom:15px;font:700 10px ui-monospace,monospace;letter-spacing:.17em}
.orbit-console-live{color:#79f0cf}
.orbit-console-live:before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:currentColor;margin-right:9px}
.orbit-console-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:clamp(30px,4vw,70px);align-items:center;min-height:660px}
.orbit-console-visual{position:relative;min-width:0;color:color-mix(in srgb,var(--accent) 56%,#6cf6ed)}
.orbit-console-visual:before{content:"";position:absolute;inset:12%;border:1px solid #a1d9e522;border-radius:50%}
.orbit-console-visual svg{display:block;width:100%;max-height:610px;filter:drop-shadow(0 0 25px #28d4ef77)}
.orbit-console-rotor{transform-origin:320px 320px;animation:orbit-signature-spin 28s linear infinite}
@keyframes orbit-signature-spin{to{transform:rotate(360deg)}}
.orbit-console-coordinates{position:absolute;left:4%;bottom:8%;font:700 10px ui-monospace,monospace;letter-spacing:.14em}
.orbit-console-content{padding:50px 0}
.orbit-console-content h2{font:700 clamp(47px,5.5vw,105px)/.94 system-ui,sans-serif;letter-spacing:-.085em;max-width:11ch;overflow-wrap:anywhere;margin:24px 0}
.orbit-console-deck{font:600 13px ui-monospace,monospace;color:#a7dbdd;letter-spacing:.07em}
.orbit-console-panels{margin-top:38px}
.orbit-console-panels details{border-color:#82bcc566}
.orbit-console-panels p{color:#d2e7e7}
.orbit-console-foot{border-top:1px solid #a1d9e544;border-bottom:0;padding:15px 0 0}

/* A film sequence: quiet suspense, colossal titling and an accessible shot list. */
.signature-afterhours{background:#0b0a0b;color:#f3ece2;border-top:8px solid color-mix(in srgb,var(--accent) 55%,#b96e4a);padding:clamp(18px,3vw,42px)}
.afterhours-sequence-head{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #c9b7a969;padding-bottom:16px;font:700 10px ui-monospace,monospace;letter-spacing:.18em}
.afterhours-sequence-main{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);gap:clamp(25px,6vw,90px);min-height:680px;align-items:center}
.afterhours-sequence-type{position:relative;padding:65px 0;z-index:1}
.afterhours-sequence-type h2{font:900 clamp(85px,10vw,180px)/.78 Impact,"Arial Narrow",system-ui,sans-serif;letter-spacing:-.05em;margin:30px 0;max-width:7ch}
.afterhours-sequence-type h2 em{font:italic 400 .78em Georgia,serif;letter-spacing:-.09em;color:color-mix(in srgb,var(--accent) 50%,#f3ece2)}
.afterhours-sequence-type p{font:400 clamp(17px,1.8vw,25px)/1.4 Georgia,serif;max-width:30ch}
.afterhours-sequence-type a{font:800 11px ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase}
.afterhours-sequence-stills{padding:30px 0}
.afterhours-sequence-frame{position:relative;display:flex;justify-content:space-between;align-items:flex-start;min-height:360px;padding:20px;background:linear-gradient(135deg,#54312c 0%,#131d23 42%,#050607 100%);box-shadow:inset 0 0 0 12px #0b0a0b,0 0 0 1px #f3ece24d;overflow:hidden;font:700 10px ui-monospace,monospace;letter-spacing:.13em}
.afterhours-sequence-frame:before{content:"";position:absolute;inset:25% 16% 8%;border:1px solid #d6b79b66;border-radius:48% 48% 5% 5%;transform:rotate(-14deg);box-shadow:35px 50px 100px #b9806280}
.afterhours-sequence-frame b{position:absolute;right:3%;bottom:-.3em;font:900 250px/.9 Impact,sans-serif;opacity:.16}
.afterhours-sequence-stills details{border-color:#f3ece27a}
.afterhours-sequence-stills p{color:#d6c9bd}
.afterhours-sequence-empty{font:italic 20px Georgia,serif}
.afterhours-sequence-foot{border-top:1px solid #c9b7a969;padding-top:16px;letter-spacing:clamp(4px,1vw,16px);overflow:hidden;white-space:nowrap;color:#c5aa94}

@media(max-width:800px){
 .atelier-edition-stage,.signal-broadcast-grid,.orbit-console-grid,.afterhours-sequence-main{grid-template-columns:minmax(0,1fr)}
 .atelier-edition-stage{min-height:0}.atelier-edition-copy{padding:70px 8px 20px}.atelier-edition-copy h2{font-size:clamp(57px,13vw,100px)}
 .atelier-edition-composition{height:400px;max-width:70%;width:70%;margin:15px 6% 45px auto}.atelier-edition-mark{font-size:clamp(130px,30vw,250px)}
 .signal-broadcast-grid{min-height:0;gap:35px}.signal-broadcast-title h2{font-size:clamp(56px,12vw,100px)}
 .signal-broadcast-object{min-height:340px;width:min(75%,470px);margin:auto}.signal-broadcast-note{grid-column:auto}
 .orbit-console-grid{gap:0}.orbit-console-visual{width:min(100%,550px);margin:auto}.orbit-console-content{padding:10px 0 45px}
 .afterhours-sequence-main{gap:0}.afterhours-sequence-type{padding:55px 0 15px}.afterhours-sequence-type h2{font-size:clamp(75px,13vw,120px)}
}
@media(max-width:480px){
 .signature{margin:55px 0}.signature-atelier,.signature-signal,.signature-orbit,.signature-afterhours{padding:18px}
 .atelier-edition-top span:nth-child(2),.signal-broadcast-head span:nth-child(2),.orbit-console-head span:nth-child(2),.afterhours-sequence-head span:nth-child(2){display:none}
 .atelier-edition-copy{padding:65px 0 10px}.atelier-edition-copy h2{font-size:clamp(52px,14vw,73px)}
 .atelier-edition-composition{width:82%;max-width:82%;height:300px;margin:10px 6% 38px auto}
 .atelier-edition-bottom,.orbit-console-foot{font-size:8px;letter-spacing:.07em}
 .signal-broadcast-grid{padding:35px 0}.signal-broadcast-title h2{font-size:clamp(50px,12vw,70px)}
 .signal-broadcast-object{width:83%;min-height:260px;transform:rotate(3deg)}.signal-object-bar{left:-9%;font-size:10px}
 .signal-broadcast-note{flex-direction:column;align-items:start}.signal-broadcast-foot{font-size:14px}
 .orbit-console-content h2{font-size:clamp(43px,10vw,65px)}.orbit-console-coordinates{font-size:8px}
 .afterhours-sequence-type h2{font-size:clamp(73px,17vw,100px)}
 .afterhours-sequence-frame{min-height:260px}.afterhours-sequence-frame b{font-size:180px}
}
@media(prefers-reduced-motion:reduce){.orbit-console-rotor{animation:none}}
.motion-none .orbit-console-rotor{animation:none}
`;
