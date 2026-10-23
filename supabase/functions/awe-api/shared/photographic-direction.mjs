/* Public demo photography: verified free-license Unsplash sources.
 * Images render ONLY in fictional public previews. Never in customer HTML,
 * owner drafts, or downloadable published site packages.
 * Customer templates remain portable and use approved uploaded images.
 */
const themes = Object.freeze({
  "index": {
    "photo": "photo-1776851629268-c878a7978c61",
    "gallery": "photo-1763850407750-4671769329c1",
    "credit": "studiopipin",
    "motto": "CLARITY / CHARACTER"
  },
  "folio": {
    "photo": "photo-1718964312487-d5e3d56fd2ce",
    "gallery": "photo-1771072428050-1492abb58f4a",
    "credit": "Branislav Rodman",
    "motto": "ISSUE Nº 01"
  },
  "still": {
    "photo": "photo-1776851629268-c878a7978c61",
    "gallery": "photo-1762062087175-0de79d49bf6c",
    "credit": "studiopipin",
    "motto": "OBJECT / SPACE"
  },
  "afterhours": {
    "photo": "photo-1774016591378-925354a456ee",
    "gallery": "photo-1771072428050-1492abb58f4a",
    "credit": "Cemrecan Yurtman",
    "motto": "A FILM BY / YOU"
  },
  "signal": {
    "photo": "photo-1780260412556-b47b849785dd",
    "gallery": "photo-1763850407750-4671769329c1",
    "credit": "Margo Evardson",
    "motto": "NO RULES / NO LIMITS"
  },
  "daylight": {
    "photo": "photo-1767551715049-fcd9b818b2d4",
    "gallery": "photo-1718964312487-d5e3d56fd2ce",
    "credit": "Anya Chernykh",
    "motto": "GOOD THINGS / AHEAD"
  },
  "atlas": {
    "photo": "photo-1763850407750-4671769329c1",
    "gallery": "photo-1776851629268-c878a7978c61",
    "credit": "Ivan Rohovchenko",
    "motto": "RESEARCH / FORM"
  },
  "terminal": {
    "photo": "photo-1770734360042-676ef707d022",
    "gallery": "photo-1693823462803-8921d3f5ea2c",
    "credit": "Harshit Katiyar",
    "motto": "BUILD / DEPLOY"
  },
  "orbit": {
    "photo": "photo-1777047023536-8e47688b77f9",
    "gallery": "photo-1763850407750-4671769329c1",
    "credit": "NASA",
    "motto": "BEYOND / EARTH"
  },
  "playbill": {
    "photo": "photo-1774016591378-925354a456ee",
    "gallery": "photo-1718964312487-d5e3d56fd2ce",
    "credit": "Cemrecan Yurtman",
    "motto": "OPENING / NIGHT"
  },
  "monologue": {
    "photo": "photo-1774016591378-925354a456ee",
    "gallery": "photo-1771072428050-1492abb58f4a",
    "credit": "Cemrecan Yurtman",
    "motto": "SCENE / ONE"
  },
  "portraiture": {
    "photo": "photo-1718964312487-d5e3d56fd2ce",
    "gallery": "photo-1780260412556-b47b849785dd",
    "credit": "Branislav Rodman",
    "motto": "FACE / FORM"
  },
  "contactsheet": {
    "photo": "photo-1780260412556-b47b849785dd",
    "gallery": "photo-1718964312487-d5e3d56fd2ce",
    "credit": "Margo Evardson",
    "motto": "FRAME / 001"
  },
  "atelier": {
    "photo": "photo-1771072428050-1492abb58f4a",
    "gallery": "photo-1780260412556-b47b849785dd",
    "credit": "sammy swae",
    "motto": "ATELIER / RUNWAY"
  },
  "museum": {
    "photo": "photo-1762062087175-0de79d49bf6c",
    "gallery": "photo-1776851629268-c878a7978c61",
    "credit": "Redd Francisco",
    "motto": "EXHIBITION / 01"
  },
  "brutalist": {
    "photo": "photo-1763850407750-4671769329c1",
    "gallery": "photo-1780260412556-b47b849785dd",
    "credit": "Ivan Rohovchenko",
    "motto": "PRINT / RESIST"
  },
  "nocturne": {
    "photo": "photo-1771072428050-1492abb58f4a",
    "gallery": "photo-1774016591378-925354a456ee",
    "credit": "sammy swae",
    "motto": "MIDNIGHT / EDITION"
  },
  "foundry": {
    "photo": "photo-1693823462803-8921d3f5ea2c",
    "gallery": "photo-1776851629268-c878a7978c61",
    "credit": "Maximilian Csali",
    "motto": "BUILT / TO LAST"
  },
  "bloom": {
    "photo": "photo-1767551715049-fcd9b818b2d4",
    "gallery": "photo-1718964312487-d5e3d56fd2ce",
    "credit": "Anya Chernykh",
    "motto": "GROW / GENTLY"
  },
  "ledger": {
    "photo": "photo-1776851629268-c878a7978c61",
    "gallery": "photo-1763850407750-4671769329c1",
    "credit": "studiopipin",
    "motto": "THE / OUTCOME"
  }
});
const artMarks = Object.freeze({
  "index": "I.",
  "folio": "F.",
  "still": "S.",
  "afterhours": "A/H",
  "signal": "S/N",
  "daylight": "D.",
  "atlas": "A.",
  "terminal": "</>",
  "orbit": "O.",
  "playbill": "P.",
  "monologue": "M.",
  "portraiture": "P.",
  "contactsheet": "C.",
  "atelier": "M.",
  "museum": "M.",
  "brutalist": "B!",
  "nocturne": "N.",
  "foundry": "F.",
  "bloom": "B.",
  "ledger": "L."
});
export function sampleArtwork(template, kind = "hero", index = 0) {
  const theme=themes[template];
  if(!theme)return "";
  const photo=kind==="work"?theme.gallery:theme.photo;
  const size=kind==="work"?900:1600;
  const url="https://images.unsplash.com/"+photo+"?auto=format&amp;fit=crop&amp;w="+size+"&amp;q=78";
  const count=String(index+1).padStart(2,"0");
  return '<div class="study-shot study-shot--'+template+' study-shot--'+kind+'" style="--study-photo:url('+url+')" role="img" aria-label="Licensed illustrative photograph in a fictional '+template+' website concept">'+
    '<span class="study-motto" aria-hidden="true">'+theme.motto+'</span>'+
    '<span class="study-index" aria-hidden="true">'+count+'</span>'+
    '<span class="study-credit">PHOTO STUDY / '+theme.credit+' · UNSPLASH</span>'+
  '</div>';
}
export function illustrationArtwork(template) {
  const id=Object.hasOwn(artMarks,template)?template:"index";
  return '<div class="editorial-illustration editorial-illustration--'+id+'" aria-hidden="true"><strong class="illustration-signature">'+artMarks[id].replaceAll("<","&lt;").replaceAll(">","&gt;")+'</strong></div>';
}
export const photoCSS = "\n/* Edition 02. Studio-directed photography is STRICTLY demo-only.\n   Customer versions use their uploaded photos or self-contained vector compositions. */\n.study-shot{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:#1e1c1c;min-width:0;min-height:100%}\n.study-shot::before{content:\"\";position:absolute;inset:0;z-index:0;background-image:linear-gradient(142deg,rgba(4,8,13,.04),rgba(4,8,13,.15) 55%,rgba(4,8,13,.38)),var(--study-photo);background-repeat:no-repeat;background-position:var(--study-position,center);background-size:cover;filter:var(--study-filter,none);transform:scale(1.025);transition:transform 1.2s cubic-bezier(.22,1,.36,1),filter .5s}\n.study-shot::after{content:\"\";position:absolute;inset:0;pointer-events:none;z-index:1;border:1px solid #ffffff18;background:linear-gradient(90deg,transparent 48.85%,#ffffff12 49%,transparent 49.15%),linear-gradient(0deg,#0003,transparent 35%);mix-blend-mode:normal}\n.hero-media:hover .study-shot::before,.case-image:hover .study-shot::before{transform:scale(1.085)}\n.study-motto{position:absolute;z-index:2;top:5%;left:6%;max-width:82%;font:700 clamp(9px,1vw,14px)/1.3 ui-monospace,monospace;letter-spacing:.2em;color:#fff;text-shadow:0 2px 15px #0009}\n.study-index{position:absolute;z-index:2;left:6%;bottom:7%;font:300 clamp(66px,12vw,175px)/.75 Georgia,serif;font-style:italic;letter-spacing:-.1em;color:#fff9;text-shadow:0 4px 45px #0006}\n.study-credit{position:absolute;z-index:3;right:4%;bottom:3%;font:600 8px/1.35 ui-monospace,monospace;letter-spacing:.06em;color:#fffad7;text-shadow:0 1px 6px #000;max-width:65%;text-align:right}\n.study-shot--work .study-index{font-size:clamp(65px,8vw,130px);opacity:.8}\n.study-shot--work .study-credit{font-size:7px}\n.hero-media:has(.study-shot){position:relative;overflow:hidden;background:#232124}\n.case-image:has(.study-shot){position:relative;background:#222}\n.study-shot--afterhours{--study-position:56% 36%;--study-filter:contrast(1.2) saturate(.75)}\n.study-shot--folio{--study-position:47% 35%;--study-filter:grayscale(.85) contrast(1.12)}\n.study-shot--atelier{--study-position:50% 18%;--study-filter:sepia(.1) contrast(1.08)}\n.study-shot--still{--study-position:45% 52%;--study-filter:grayscale(.62)}\n.study-shot--terminal{--study-position:52% 50%;--study-filter:contrast(1.18) saturate(.8)}\n.study-shot--signal{--study-position:60% 40%;--study-filter:contrast(1.24) saturate(1.2)}\n.study-shot--orbit{--study-position:50% 50%;--study-filter:contrast(1.15) saturate(1.15)}\n.study-shot--bloom,.study-shot--daylight{--study-position:50% 55%;--study-filter:saturate(.8)}\n.study-shot--museum{--study-position:50% 32%;--study-filter:sepia(.26) contrast(.95)}\n.study-shot--nocturne{--study-position:60% 33%;--study-filter:brightness(.63) contrast(1.15)}\n.study-shot--playbill,.study-shot--monologue{--study-position:55% 25%;--study-filter:grayscale(.8) contrast(1.2)}\n.study-shot--portraiture,.study-shot--contactsheet{--study-position:50% 24%;--study-filter:grayscale(.7)}\n.study-shot--foundry{--study-position:50% 45%;--study-filter:contrast(1.2) saturate(.55)}\n.study-shot--ledger,.study-shot--index,.study-shot--atlas{--study-position:54% 50%;--study-filter:contrast(1.08) saturate(.8)}\n.study-shot--brutalist{--study-filter:grayscale(1) contrast(1.7)}\n/* Replaces the common orb with a distinct, self-contained art system for real projects without supplied imagery. */\n.editorial-illustration{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;isolation:isolate;background:linear-gradient(125deg,var(--accent),var(--secondary))}\n.editorial-illustration::before{content:\"\";position:absolute;width:65%;aspect-ratio:1;border:clamp(25px,8vw,140px) solid #fff6;border-radius:50%;transform:rotate(-23deg) scaleX(.66);box-shadow:20px 20px 110px #0003}\n.editorial-illustration::after{content:\"\";position:absolute;inset:0;background:repeating-linear-gradient(-35deg,transparent 0 52px,#fff2 52px 53px);mix-blend-mode:overlay}\n.illustration-signature{position:relative;z-index:2;color:#fffddf;text-shadow:0 20px 50px #0005;font:italic 400 clamp(110px,17vw,300px)/.75 Georgia,serif;letter-spacing:-.12em;transform:rotate(-8deg)}\n.editorial-illustration--folio{background:linear-gradient(115deg,#dac6aa,var(--secondary))}\n.editorial-illustration--folio::before{border-radius:0;transform:rotate(17deg) scaleX(.7)}\n.editorial-illustration--afterhours{background:radial-gradient(ellipse at 70% 10%,#ca8579,#151419 60%)}\n.editorial-illustration--afterhours::before{height:160%;width:22%;border:0;border-radius:0;background:#f8dbb544;transform:rotate(28deg);filter:blur(22px)}\n.editorial-illustration--afterhours .illustration-signature{font:900 clamp(90px,13vw,240px)/.8 Impact,system-ui,sans-serif;transform:rotate(-5deg)}\n.editorial-illustration--atelier{background:linear-gradient(145deg,#e9d4b5,#70584c)}\n.editorial-illustration--atelier::before{width:38%;height:150%;border:0;border-radius:50% 50% 8% 8%;background:linear-gradient(#1b191bc9,#edc8b2);transform:rotate(-13deg)}\n.editorial-illustration--terminal{background:#0a1711}.editorial-illustration--terminal::before{border:1px solid #65ff8799;border-radius:0;width:82%;transform:none}\n.editorial-illustration--terminal .illustration-signature{font:900 clamp(65px,11vw,200px)/1 ui-monospace,monospace;color:#b3ffc3;letter-spacing:-.09em;transform:none}\n.editorial-illustration--orbit{background:radial-gradient(circle at 52% 45%,#4d469d,#02061b 69%)}.editorial-illustration--orbit::before{border:2px solid #fff8;width:90%;transform:rotate(55deg) scaleY(.37)}\n.editorial-illustration--contactsheet{background:repeating-linear-gradient(90deg,#191f1c 0 18%,#ecddc9 18.1% 19%,#161c1b 19.1% 38%)}\n.editorial-illustration--brutalist{background:linear-gradient(145deg,var(--accent) 0 50%,#111 50% 100%)}\n.editorial-illustration--brutalist .illustration-signature{font:1000 clamp(100px,17vw,300px)/.8 Impact,system-ui,sans-serif;transform:rotate(10deg)}\n.editorial-illustration--playbill,.editorial-illustration--monologue{background:radial-gradient(ellipse at 50% 0,#fbdc9290,#2a1720 55%,#100e14 78%)}\n.editorial-illustration--still,.editorial-illustration--museum{background:linear-gradient(145deg,#e9e4d5,#837e72)}\n.editorial-illustration--bloom,.editorial-illustration--daylight{background:radial-gradient(circle at 60% 30%,#f2ddac,var(--accent),var(--secondary))}\n.editorial-illustration--foundry{background:repeating-linear-gradient(0deg,#3a3730 0 20px,#62543e 22px 25px)}\n.editorial-illustration--nocturne{background:linear-gradient(135deg,#121215,#483331 57%,#d1a77e)}\n.editorial-illustration--ledger,.editorial-illustration--index,.editorial-illustration--atlas{background:linear-gradient(135deg,var(--secondary),#ebebe5,var(--accent))}\n.editorial-illustration--portraiture{background:linear-gradient(90deg,#bda69b 0 48%,#43332d 48% 52%,#d5bcb0 52%)}\n.editorial-illustration--signal{background:linear-gradient(35deg,var(--accent) 0 40%,#171717 40% 60%,var(--secondary) 60%)}\n/* Flagship 01: theatrical photography / full-bleed film-title design */\nbody.afterhours .afterhours-screen{min-height:max(750px,96svh);background:#080809}\nbody.afterhours .afterhours-screen>.hero-media{opacity:1}\nbody.afterhours .afterhours-screen .study-shot::before{background-position:60% 27%;filter:grayscale(.38) contrast(1.25)}\nbody.afterhours .afterhours-veil{background:linear-gradient(90deg,#09090bf2 0%,#09090baa 38%,transparent 95%),linear-gradient(0deg,#09090de6 0%,transparent 50%);z-index:1}\nbody.afterhours .afterhours-words{width:min(1430px,88%);padding:clamp(160px,20vh,260px) 0 clamp(130px,18vh,215px)}\nbody.afterhours .afterhours-words h1{font:900 clamp(82px,10.7vw,220px)/.75 Impact,\"Arial Narrow\",system-ui,sans-serif;letter-spacing:-.065em;text-transform:uppercase;max-width:11ch;text-wrap:balance;color:#f7eee6;text-shadow:0 18px 75px #000b}\nbody.afterhours .afterhours-words .hero-intro{max-width:49ch;font-size:clamp(15px,1.7vw,21px);line-height:1.55;color:#e8e3df}\nbody.afterhours .afterhours-frame,body.afterhours .afterhours-count{font:800 11px ui-monospace,monospace;letter-spacing:.25em}\nbody.afterhours .case-scene .scene-frame{border:8px solid #191618;box-shadow:0 25px 70px #0005}\nbody.afterhours .case-scene .case-body h3{font-size:clamp(34px,5vw,85px);text-transform:uppercase;letter-spacing:-.06em}\n/* Flagship 02: asymmetrical art-book spreads and monochrome portraiture */\nbody.folio .folio-hero{background:color-mix(in srgb,var(--palette-bg) 80%,#eee4d7);padding:clamp(30px,4vw,65px);min-height:850px;gap:clamp(8px,1vw,20px);overflow:clip}\nbody.folio .folio-words{grid-column:1/10;position:relative;z-index:3;margin:clamp(130px,14vw,220px) 0 0}\nbody.folio .folio-words h1{font:italic 400 clamp(90px,11.5vw,230px)/.78 Georgia,serif;letter-spacing:-.095em;max-width:9ch;text-transform:none}\nbody.folio .folio-picture{grid-column:8/13;grid-row:2;margin:clamp(55px,9vw,145px) 0 0;align-self:end;z-index:2}\nbody.folio .folio-picture .hero-media{height:clamp(480px,44vw,750px);min-height:480px;filter:none;box-shadow:35px 38px 0 color-mix(in srgb,var(--accent) 24%,transparent)}\nbody.folio .folio-picture .study-shot{--study-position:center 20%}\nbody.folio .folio-picture .study-shot .study-index{font-size:160px}\nbody.folio .folio-colophon{grid-column:1/-1;letter-spacing:.22em}\nbody.folio .case-spread:nth-child(2){margin-top:125px}\nbody.folio .case-spread .case-image{border-radius:0;box-shadow:22px 22px 0 color-mix(in srgb,var(--accent) 20%,transparent)}\nbody.folio .architect-story{font:italic 400 clamp(30px,4.8vw,68px)/1.25 Georgia,serif}\n/* Flagship 03: fashion campaign; large overlapping wordmarks and cinematic runway */\nbody.atelier .atelier-hero{min-height:900px;background:color-mix(in srgb,var(--palette-bg) 75%,#e7d6c1);color:var(--fg)}\nbody.atelier .atelier-stage{grid-template-columns:.32fr 1.14fr 1fr;gap:0;padding:clamp(45px,6vw,100px) 0 75px;min-height:790px}\nbody.atelier .atelier-numeral{font:italic 400 clamp(120px,20vw,350px)/.76 Georgia,serif;position:relative;z-index:3;opacity:.34;mix-blend-mode:multiply}\nbody.atelier .atelier-photo{height:clamp(600px,64vw,860px);width:100%;transform:rotate(-2deg);box-shadow:26px 30px 0 #3f342a80;z-index:2}\nbody.atelier .atelier-photo .hero-media{filter:none}\nbody.atelier .atelier-copy{margin-left:-10vw;position:relative;z-index:4}\nbody.atelier .atelier-copy h1{font:italic 400 clamp(85px,10.5vw,195px)/.78 Georgia,serif;letter-spacing:-.095em;color:var(--fg);text-shadow:2px 2px 1px #ffffff36}\nbody.atelier .atelier-copy .hero-intro{font-size:clamp(16px,1.5vw,21px);max-width:25ch}\nbody.atelier .case-runway .case-image{height:clamp(510px,55vw,920px)}\nbody.atelier .case-runway .runway-overlay{backdrop-filter:blur(4px)}\n/* Treat the other art directions individually, not as one interchangeable skin. */\nbody.index .index-identity{transform:translateY(-3%)}body.index .identity-stamp{box-shadow:22px 22px 0 var(--accent)}\nbody.still .still-stage .hero-media{clip-path:ellipse(48% 50% at center)}body.still .still-words h1{letter-spacing:-.09em}\nbody.signal .signal-artwork .hero-media{clip-path:polygon(4% 0,100% 6%,95% 100%,0 91%)}\nbody.daylight .daylight-photo .hero-media{transform:rotate(-3deg)}\nbody.atlas .atlas-visual .hero-media{border-radius:0;box-shadow:-18px 18px 0 #1b403a55}\nbody.terminal .terminal-window{box-shadow:30px 35px 0 #0003}\nbody.orbit .orbit-visual .hero-media{clip-path:ellipse(49% 49% at 50% 50%)}\nbody.playbill .playbill-image .hero-media{filter:grayscale(.35) contrast(1.1)}\nbody.monologue .script-page{box-shadow:25px 30px 0 #15151515}\nbody.portraiture .portraiture-image .hero-media{clip-path:ellipse(45% 49% at center)}\nbody.contactsheet .contactsheet-image .hero-media{filter:grayscale(1) contrast(1.22)}\nbody.museum .museum-visual .hero-media{border:12px solid #eee7d7;box-shadow:20px 20px 0 #574d402a}\nbody.brutalist .brutalist-visual .hero-media{filter:grayscale(1) contrast(1.4)}\nbody.nocturne .nocturne-visual .hero-media{filter:saturate(.6) contrast(1.18)}\nbody.foundry .foundry-image .hero-media{filter:sepia(.3) contrast(1.22)}\nbody.bloom .bloom-image .hero-media{filter:saturate(.85)}\nbody.ledger .ledger-visual .hero-media{border:7px solid var(--fg)}\n@media(max-width:950px){\n body.folio .folio-hero{min-height:0;padding:35px 4vw}\n body.folio .folio-words{margin-top:85px;grid-column:1/12}\n body.folio .folio-picture{grid-column:7/13;grid-row:2;margin:40px 0 0}\n body.atelier .atelier-stage{grid-template-columns:.15fr 1fr 1fr;min-height:0}\n body.atelier .atelier-copy{margin-left:-7vw}\n body.atelier .atelier-photo{height:580px}\n body.afterhours .afterhours-words h1{font-size:clamp(76px,11vw,140px)}\n}\n@media(max-width:650px){\n .study-credit{font-size:7px;max-width:75%}\n .study-index{font-size:90px}\n body.afterhours .afterhours-screen{min-height:740px}\n body.afterhours .afterhours-words{width:88%;padding:160px 0 110px}\n body.afterhours .afterhours-words h1{font-size:clamp(70px,15vw,105px);max-width:9ch}\n body.afterhours .afterhours-words .hero-intro{font-size:15px}\n body.folio .folio-hero{display:flex;flex-direction:column;padding:32px 18px 45px;gap:22px}\n body.folio .folio-words{width:100%;margin:40px 0 0}\n body.folio .folio-words h1{font-size:clamp(65px,16vw,110px)}\n body.folio .folio-picture{width:76%;align-self:flex-end;margin:0 2% 35px 0}\n body.folio .folio-picture .hero-media{height:410px;min-height:410px;box-shadow:18px 20px 0 color-mix(in srgb,var(--accent) 24%,transparent)}\n body.atelier .atelier-stage{display:flex;flex-direction:column;padding:35px 0}\n body.atelier .atelier-numeral{position:absolute;top:0;left:0;font-size:130px}\n body.atelier .atelier-photo{width:86%;height:540px;align-self:flex-start;transform:rotate(-2deg);margin:35px 0}\n body.atelier .atelier-copy{margin:-130px 0 25px 4%;align-self:stretch}\n body.atelier .atelier-copy h1{font-size:clamp(64px,14vw,100px)}\n body.atelier .atelier-copy .hero-intro{max-width:30ch}\n body.atelier .case-runway .case-image{height:460px}\n body.folio .case-spread:nth-child(2){margin-top:0}\n}\n@media(prefers-reduced-motion:reduce){\n .study-shot::before{transition:none!important;transform:none!important}\n .hero-media:hover .study-shot::before,.case-image:hover .study-shot::before{transform:none!important}\n}\n.motion-none .study-shot::before{transition:none!important;transform:none!important}\n.motion-none .hero-media:hover .study-shot::before,.motion-none .case-image:hover .study-shot::before{transform:none!important}\n\n/* Screenshot-driven flagship first-fold corrections, desktop / tablet / mobile. */\n/* Folio: photo and title are intentionally layered in the same grid row.\n   Without explicit grid-row CSS auto-placement drops the title below the image. */\nbody.folio .folio-hero{grid-template-rows:auto minmax(580px,1fr) auto}\nbody.folio .folio-words{grid-column:1/10;grid-row:2;margin:10px 0 0;align-self:center;z-index:3}\nbody.folio .folio-picture{grid-column:8/13;grid-row:2;margin:0;align-self:center;z-index:2}\nbody.folio .folio-words h1{font-size:clamp(82px,10.1vw,185px);line-height:.85;max-width:9ch}\nbody.folio .folio-picture .hero-media{height:clamp(480px,46vw,690px);min-height:480px}\nbody.afterhours .afterhours-words{margin:0 auto;align-self:center;padding:100px 0 105px}\nbody.afterhours .afterhours-words h1{font-size:clamp(74px,9.4vw,172px);line-height:.8;max-width:12ch}\nbody.afterhours .afterhours-screen .study-shot::before{filter:contrast(1.1) brightness(1.3) saturate(.75);background-position:70% 32%}\nbody.atelier .atelier-stage{padding-top:32px;min-height:670px}\nbody.atelier .atelier-photo{height:clamp(570px,58vw,740px)}\nbody.atelier .atelier-copy{transform:translateY(-85px)}\n@media(max-width:950px){\n body.folio .folio-hero{grid-template-rows:auto minmax(480px,1fr) auto}\n body.folio .folio-words{grid-column:1/11;grid-row:2;align-self:center;margin:0}\n body.folio .folio-picture{grid-column:8/13;grid-row:2;margin:0}\n body.folio .folio-words h1{font-size:clamp(70px,11.5vw,132px)}\n body.atelier .atelier-copy{transform:translateY(-30px)}\n}\n@media(max-width:650px){\n body.folio .folio-hero{display:flex;flex-direction:column;gap:22px}\n body.folio .folio-words{align-self:stretch;margin:12px 0 0;width:100%}\n body.folio .folio-picture{align-self:flex-end;margin:0 2% 28px 0;width:78%}\n body.folio .folio-words h1{font-size:clamp(58px,14.5vw,95px);max-width:10ch}\n body.folio .folio-picture .hero-media{height:400px;min-height:400px}\n body.afterhours .afterhours-screen{min-height:735px;align-items:start}\n body.afterhours .afterhours-words{margin:0 auto;align-self:start;width:88%;padding:77px 0 65px}\n body.afterhours .afterhours-words h1{font-size:clamp(53px,13.1vw,85px);max-width:10ch;line-height:.88}\n body.afterhours .afterhours-frame{top:15px}\n body.atelier .atelier-stage{padding:35px 0;min-height:0}\n body.atelier .atelier-photo{height:540px;width:86%}\n body.atelier .atelier-copy{margin:-300px 0 30px 4%;transform:none}\n body.atelier .atelier-copy h1{font-size:clamp(62px,13.5vw,96px)}\n}\n";
