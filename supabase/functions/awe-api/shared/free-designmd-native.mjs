// Native, design-specific editorial chapters for the ten retained DESIGN.md guides.
// Each page has its own document rhythm rather than a shared resume/business block.
// Source documents remain unchanged under design-sources/freedesignmd/.
import {esc} from "./model.mjs";
const E=x=>esc(String(x??""));
const plain=x=>E(x).slice(0,1000);
const glyph=(s)=>'<span aria-hidden="true">'+s+'</span>';
const card=(c,i)=>({title:c?.title||"Study / "+String(i+1).padStart(2,"0"),description:c?.description||"",url:c?.url||""});
export const SOURCE_ARCHITECTURES=Object.freeze([
 "acidchrome","voidstage","studiomargaux","neomemphis","monobrutalist",
 "vestigefolio","botanicalpress","limepress","gazettebroadside","risograph"
]);
export function sourceNativeScene(id,content){
 if(!SOURCE_ARCHITECTURES.includes(id))return "";
 const cards=Array.from({length:3},(_,i)=>card(content.cards?.[i],i));
 const name=plain(content.name);
 const headline=plain(content.headline);
 const label=(n,t)=>'<span class="fd-n-label">'+n+" / "+t+'</span>';
 const panel=(i)=>'<div class="fd-n-item"><span>0'+(i+1)+'</span><strong>'+plain(cards[i].title)+'</strong><p>'+plain(cards[i].description)+'</p></div>';
 let inside="";
 switch(id){
 case "acidchrome":
  inside='<div class="fd-n-acid-orb" aria-hidden="true"><i></i><b></b></div><div class="fd-n-acid-copy">'+label("01","MATERIAL STUDY")+'<h2>Material.<br>Light.<br>Motion.</h2><p>'+headline+'</p><div class="fd-n-acid-sweep">'+cards.map((_,i)=>panel(i)).join("")+'</div></div>';
  break;
 case "voidstage":
  inside='<div class="fd-n-void-stage"><div class="fd-n-void-ring" aria-hidden="true"></div>'+label("01","THE INFINITE FRAME")+'<div class="fd-n-void-head"><h2>Nothing<br>but the<br>moment.</h2><p>'+headline+'</p></div><div class="fd-n-void-index"><span>FORM / ABSENCE</span><span>LIGHT / PRESENCE</span><span>FRAME / 001</span></div></div>';
  break;
 case "studiomargaux":
  inside='<div class="fd-n-margaux"><div>'+label("01","A NOTE ON FORM")+'<span class="fd-n-margaux-mark">M.</span></div><div><h2>What matters<br><em>is what stays.</em></h2><p>'+plain(content.bio)+'</p><div class="fd-n-margaux-index">'+cards.map((_,i)=>'<div><span>0'+(i+1)+'</span><strong>'+plain(cards[i].title)+'</strong></div>').join("")+'</div></div></div>';
  break;
 case "neomemphis":
  inside='<div class="fd-n-memphis"><div class="fd-n-memphis-head">'+label("01","NEW POP")+'<h2>MORE.<br>MORE.<br>MORE.</h2><p>'+headline+'</p></div><div class="fd-n-memphis-composition" aria-hidden="true"><i class="fd-n-m-square"></i><i class="fd-n-m-circle"></i><i class="fd-n-m-stripe"></i><i class="fd-n-m-squiggle"></i></div><div class="fd-n-memphis-names">'+cards.map((_,i)=>'<b>'+plain(cards[i].title)+'</b>').join("")+'</div></div>';
  break;
 case "monobrutalist":
  inside='<div class="fd-n-mono"><div class="fd-n-mono-rail"><span>[PAGE / 001]</span><span>RAW TYPE — OPEN FORMAT</span><span>DESIGN / 2026</span></div><h2>THE<br>WHOLE<br>POINT<span>.</span></h2><div class="fd-n-mono-foot"><p>'+headline+'</p><div>'+cards.map((_,i)=>'<div>'+label("0"+(i+1),"INDEX")+'<strong>'+plain(cards[i].title)+'</strong></div>').join("")+'</div></div></div>';
  break;
 case "vestigefolio":
  inside='<div class="fd-n-vestige"><div class="fd-n-vestige-left">'+label("01","AN EDITORIAL COLLECTION")+'<h2>Objects of<br><i>lasting</i><br>interest.</h2><span class="fd-n-vestige-index">'+name+' — VOL. 001</span></div><div class="fd-n-vestige-object" aria-hidden="true"><div class="fd-n-vestige-shape"><i></i></div><span>LOOK / 001</span></div><div class="fd-n-vestige-foot">'+cards.map((_,i)=>'<span>'+String(i+1).padStart(2,"0")+' — '+plain(cards[i].title)+'</span>').join("")+'</div></div>';
  break;
 case "botanicalpress":
  inside='<div class="fd-n-botanical">'+label("01","FIELD NOTES")+'<div class="fd-n-botanical-cases">'+cards.map((_,i)=>'<article><div class="fd-n-botanical-sketch" aria-hidden="true"><svg viewBox="0 0 160 240" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M80 232C76 170 83 98 82 4M81 112C37 104 17 80 19 44C61 50 78 79 81 112M82 170C128 150 143 113 137 79C101 95 85 134 82 170M82 60C118 47 132 22 126 2C100 12 88 32 82 60"/></svg></div><span>SPECIMEN / 0'+(i+1)+'</span><h3>'+plain(cards[i].title)+'</h3><p>'+plain(cards[i].description)+'</p></article>').join("")+'</div><p class="fd-n-botanical-end">A collection of forms, thoughtfully observed.</p></div>';
  break;
 case "limepress":
  inside='<div class="fd-n-lime"><div class="fd-n-lime-head">'+label("01","PROGRESS BY DESIGN")+'<h2>A brighter<br>kind of<br>momentum.</h2><p>'+plain(content.bio)+'</p></div><div class="fd-n-lime-console"><div class="fd-n-lime-top"><span>OVERVIEW / ILLUSTRATIVE</span><span>○ ○ ○</span></div><div class="fd-n-lime-graph" aria-hidden="true">'+Array.from({length:12},(_,i)=>'<i style="--growth:'+[24,44,31,52,46,63,57,70,78,68,88,99][i]+'%"></i>').join("")+'</div><div class="fd-n-lime-bottom">'+cards.map((_,i)=>'<div><span>0'+(i+1)+'</span><strong>'+plain(cards[i].title)+'</strong></div>').join("")+'</div></div></div>';
  break;
 case "gazettebroadside":
  inside='<div class="fd-n-gazette"><div class="fd-n-gazette-top"><span>VOL. I / NO. 01</span><span>THE INDEPENDENT EDITION</span><span>EST. BY DESIGN</span></div><h2>THE<br>NEW VIEW.</h2><div class="fd-n-gazette-deck"><strong>'+headline+'</strong><span>THE DESIGN COLLECTION — 001</span></div><div class="fd-n-gazette-articles">'+cards.map((_,i)=>'<article>'+label("0"+(i+1),"DISPATCH")+'<h3>'+plain(cards[i].title)+'</h3><p>'+plain(cards[i].description)+'</p></article>').join("")+'</div></div>';
  break;
 case "risograph":
  inside='<div class="fd-n-riso"><div class="fd-n-riso-copy">'+label("01","PRINTED MATTER")+'<h2>IDEAS<br>WORTH<br>PRINTING.</h2><p>'+headline+'</p></div><div class="fd-n-riso-poster"><div class="fd-n-riso-under" aria-hidden="true"></div><div class="fd-n-riso-paper"><span>OFFSET / 001</span><strong>MAKE<br>SPACE.</strong><i aria-hidden="true"></i><span>'+name+'</span></div></div><div class="fd-n-riso-bottom">'+cards.map((_,i)=>'<b>0'+(i+1)+' / '+plain(cards[i].title)+'</b>').join("")+'</div></div>';
  break;
 }
 return '<section class="fd-native fd-native-'+E(id)+'" aria-label="'+E(id)+' source design chapter">'+inside+'</section>';
}
export const sourceNativeCSS=String.raw`
.fd-native{position:relative;max-width:1510px;margin:50px auto 100px;padding:0 clamp(22px,5vw,88px);isolation:isolate}
.fd-native *{box-sizing:border-box}
.fd-native h2,.fd-native h3,.fd-native p{margin:0}
.fd-native h2{font-family:var(--display);line-height:.95;font-size:clamp(46px,6.5vw,110px);letter-spacing:-.065em}
.fd-native p{font-family:var(--body);font-size:clamp(14px,1.2vw,18px);line-height:1.5;max-width:540px}
.fd-n-label{font:600 11px/1.5 var(--body);letter-spacing:.16em;text-transform:uppercase}
.fd-native strong{font-weight:600}
.fd-native-acidchrome{background:#06070c;color:#f2f4f8;min-height:680px;padding:clamp(40px,5vw,80px);display:grid;grid-template-columns:1fr 1.2fr;gap:30px;overflow:hidden}
.fd-n-acid-orb{min-height:490px;position:relative;display:grid;place-items:center}
.fd-n-acid-orb i{display:block;width:min(80%,440px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 29% 24%,#f2f4f8 1%,#bec4d4 11%,#7d89ae 20%,#06070c 38%,#ff4dd8 44%,#00e5c2 52%,#656b82 60%,#06070c 73%);box-shadow:inset -28px -28px 68px #05050a,16px 25px 90px #ff4dd835;transform:rotate(-14deg)}
.fd-n-acid-orb b{position:absolute;width:min(92%,550px);aspect-ratio:1;border:2px solid #8089a033;border-radius:50%;transform:rotate(22deg) scaleX(.62)}
.fd-n-acid-copy{align-self:center;position:relative;z-index:2}.fd-n-acid-copy h2{margin:40px 0;font-family:var(--display);font-weight:700}.fd-n-acid-copy p{color:#8089a0}
.fd-n-acid-sweep{border-top:1px solid #ffffff2d;margin-top:60px;display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
.fd-n-acid-sweep .fd-n-item{padding-top:16px;min-width:0}
.fd-n-item span,.fd-n-item strong{display:block}.fd-n-item span{font-size:11px;opacity:.7}.fd-n-item strong{font-size:13px;margin-top:10px}.fd-n-item p{display:none}
.fd-native-voidstage{background:#000;color:#fff;padding:0;overflow:hidden}
.fd-n-void-stage{position:relative;min-height:780px;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(30px,4vw,75px);background:radial-gradient(ellipse at 60% 56%,#122541 0%,#03060c 23%,#000 65%)}
.fd-n-void-ring{position:absolute;inset:18% 10% 19% auto;width:54%;aspect-ratio:1;border-radius:50%;border:1px solid #0099ff8c;box-shadow:0 0 110px #0099ff25,inset 0 0 120px #0099ff0e;transform:rotate(-14deg) scaleX(.77)}
.fd-n-void-head{position:relative;z-index:2;display:flex;align-items:end;justify-content:space-between;gap:50px}.fd-n-void-head h2{font-weight:500}.fd-n-void-head p{max-width:250px;color:#a6a6a6}
.fd-n-void-index{display:flex;justify-content:space-between;gap:25px;border-top:1px solid #454545;padding-top:15px;font:500 11px var(--body)}
.fd-native-studiomargaux{background:#ebe2ce;color:#0e0c0a}
.fd-n-margaux{display:grid;grid-template-columns:.3fr 1fr;gap:30px;border-top:1px solid #0e0c0a;padding-top:28px}
.fd-n-margaux-mark{display:block;font:400 clamp(150px,20vw,340px)/.9 var(--display)}
.fd-n-margaux h2{font-weight:300;font-size:clamp(63px,9vw,150px)}.fd-n-margaux h2 em{font-weight:300}.fd-n-margaux p{margin:30px 0 90px;max-width:620px}
.fd-n-margaux-index{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;border-top:1px solid #0e0c0a;padding-top:16px}
.fd-n-margaux-index div{display:flex;flex-direction:column;gap:16px}
.fd-native-neomemphis{background:#fff4d8;color:#171314;padding:0;overflow:hidden}
.fd-n-memphis{display:grid;grid-template-columns:1.3fr 1fr;min-height:710px;position:relative}
.fd-n-memphis-head{padding:clamp(35px,5vw,85px);position:relative;z-index:3}
.fd-n-memphis h2{font-weight:900;line-height:.8;letter-spacing:-.08em;margin:30px 0 40px}.fd-n-memphis p{max-width:360px}
.fd-n-memphis-composition{position:relative;min-height:500px;background:#e63946}
.fd-n-m-square{position:absolute;width:54%;aspect-ratio:1;background:#ffdc3a;top:16%;right:12%;transform:rotate(-17deg);border:7px solid #171314}
.fd-n-m-circle{position:absolute;width:47%;aspect-ratio:1;border-radius:50%;background:#4b80ff;left:-12%;bottom:12%;border:7px solid #171314}
.fd-n-m-stripe{position:absolute;inset:30% -20% 32% 20%;background:repeating-linear-gradient(45deg,#171314 0 9px,transparent 9px 28px);transform:rotate(14deg)}
.fd-n-m-squiggle{position:absolute;left:35%;top:12%;width:20%;height:80%;border:12px dotted #fff4d8;transform:rotate(-30deg)}
.fd-n-memphis-names{grid-column:1/-1;background:#ffdc3a;display:flex;gap:22px;flex-wrap:wrap;justify-content:space-between;padding:18px clamp(35px,5vw,85px);font:700 13px var(--body)}
.fd-native-monobrutalist{background:#fff;color:#000;padding:0;border:7px solid #000}
.fd-n-mono{padding:28px;display:flex;flex-direction:column;gap:40px}
.fd-n-mono-rail{display:flex;justify-content:space-between;gap:20px;padding-bottom:20px;border-bottom:7px solid #000;font:700 11px var(--body)}
.fd-n-mono h2{font:800 clamp(90px,15vw,245px)/.78 var(--display);letter-spacing:-.09em}.fd-n-mono h2 span{color:#000}
.fd-n-mono-foot{display:grid;grid-template-columns:.5fr 1fr;gap:30px;border-top:7px solid #000;padding-top:25px}
.fd-n-mono-foot>div{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
.fd-n-mono-foot strong{display:block;margin-top:18px}
.fd-native-vestigefolio{background:#f1e8d4;color:#0f0c0a;padding-top:70px;padding-bottom:55px}
.fd-n-vestige{display:grid;grid-template-columns:.9fr 1.1fr;gap:50px}
.fd-n-vestige-left{display:flex;flex-direction:column;justify-content:space-between}
.fd-n-vestige h2{font-weight:400;font-size:clamp(64px,8.5vw,135px)}.fd-n-vestige h2 i{font-weight:300}
.fd-n-vestige-object{height:620px;display:grid;place-items:center;background:#ddd1bd;position:relative}
.fd-n-vestige-shape{width:42%;height:70%;border-radius:48% 49% 20% 20%;background:linear-gradient(115deg,#271519,#723b39 43%,#1c1017 77%);box-shadow:27px 20px 25px #0f0c0a20}
.fd-n-vestige-object>span{position:absolute;bottom:22px;left:22px;font-size:11px}
.fd-n-vestige-index{font:600 12px var(--body)}
.fd-n-vestige-foot{grid-column:1/-1;display:flex;justify-content:space-between;gap:18px;flex-wrap:wrap;border-top:1px solid #0f0c0a;padding-top:15px;font:600 11px var(--body)}
.fd-native-botanicalpress{background:#f2ede0;color:#1f2a1e;padding-top:75px;padding-bottom:75px;border:1px solid #1f2a1e33}
.fd-n-botanical-cases{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
.fd-n-botanical-cases article{min-width:0;border:1px solid #1f2a1e64;background:#f8f4e9;padding:20px}
.fd-n-botanical-sketch{height:320px;display:grid;place-items:center;border-bottom:1px solid #1f2a1e5c;margin-bottom:15px}
.fd-n-botanical-sketch svg{width:min(70%,175px);height:92%}
.fd-n-botanical-cases article:nth-child(2) svg{transform:rotate(22deg)}
.fd-n-botanical-cases article:nth-child(3) svg{transform:rotate(-24deg)}
.fd-n-botanical-cases h3{font:italic 400 28px var(--display);margin:18px 0}
.fd-n-botanical-cases p{font-size:13px}.fd-n-botanical-end{margin-top:40px;font-style:italic}
.fd-native-limepress{background:#f9f9f5;color:#163300;padding:0}
.fd-n-lime{display:grid;grid-template-columns:1fr 1.1fr;min-height:710px}
.fd-n-lime-head{padding:clamp(30px,5vw,80px)}
.fd-n-lime h2{font:900 clamp(67px,8vw,130px)/.83 var(--display);letter-spacing:-.08em;text-transform:uppercase;margin:35px 0}
.fd-n-lime-console{background:#9fe870;padding:35px;display:flex;flex-direction:column;justify-content:space-between}
.fd-n-lime-top{display:flex;justify-content:space-between;font:700 11px var(--body)}
.fd-n-lime-graph{height:46%;min-height:270px;display:flex;align-items:end;gap:9px}
.fd-n-lime-graph i{flex:1;height:var(--growth);background:#163300;min-width:0;border-radius:7px 7px 0 0}
.fd-n-lime-bottom{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;border-top:1px solid #163300;padding-top:17px}
.fd-n-lime-bottom span{display:block;font-size:11px}.fd-n-lime-bottom strong{font-size:14px}
.fd-native-gazettebroadside{background:#e6e7d8;color:#1d1f1c;padding-top:40px;padding-bottom:80px;border-top:9px double #1d1f1c;border-bottom:9px double #1d1f1c}
.fd-n-gazette-top{display:flex;justify-content:space-between;gap:20px;font:700 11px var(--body);border-bottom:2px solid #1d1f1c;padding-bottom:12px}
.fd-n-gazette h2{text-align:center;font:800 clamp(100px,16vw,250px)/.72 var(--display);letter-spacing:-.1em;border-bottom:8px double #1d1f1c;padding:65px 0}
.fd-n-gazette-deck{display:flex;justify-content:space-between;align-items:start;gap:35px;padding:20px 0;border-bottom:2px solid #1d1f1c}
.fd-n-gazette-deck strong{font:500 clamp(25px,3vw,50px)/1.1 var(--display)}
.fd-n-gazette-articles{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;padding-top:45px}
.fd-n-gazette-articles article+article{border-left:1px solid #1d1f1c;padding-left:28px}
.fd-n-gazette-articles h3{font:700 clamp(23px,2.5vw,39px)/1.05 var(--display);margin:18px 0}.fd-n-gazette-articles p{font:400 15px/1.6 var(--display)}
.fd-native-risograph{background:#fbf7ec;color:#1a1815;padding-block:70px}
.fd-n-riso{display:grid;grid-template-columns:1fr 1fr;gap:25px}
.fd-n-riso-copy h2{font:800 clamp(67px,7.6vw,130px)/.85 var(--display);margin:35px 0}.fd-n-riso-copy p{max-width:340px}
.fd-n-riso-poster{height:670px;position:relative}
.fd-n-riso-under,.fd-n-riso-paper{position:absolute;inset:9% 12%;border:3px solid #1a1815}
.fd-n-riso-under{background:#1a1815;transform:rotate(9deg)}
.fd-n-riso-paper{background:#ff4f8b;transform:rotate(-6deg);padding:28px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.fd-n-riso-paper strong{font:900 clamp(75px,9vw,150px)/.8 var(--display);letter-spacing:-.09em;text-shadow:3px 3px 0 #fbf7ec}
.fd-n-riso-paper span{font:700 11px var(--body)}
.fd-n-riso-paper i{width:70%;aspect-ratio:1;border-radius:50%;position:absolute;right:-20%;top:40%;background:repeating-radial-gradient(circle,#1a1815 0 2px,transparent 2px 8px);opacity:.3}
.fd-n-riso-bottom{grid-column:1/-1;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;border-top:2px solid #1a1815;padding-top:19px;font:700 13px var(--body)}
@media(max-width:950px){
.fd-native-acidchrome,.fd-n-void-head,.fd-n-margaux,.fd-n-memphis,.fd-n-vestige,.fd-n-lime,.fd-n-riso{grid-template-columns:1fr}
.fd-n-acid-orb{min-height:300px}.fd-n-memphis-composition{min-height:350px}.fd-n-memphis-names{grid-column:auto}.fd-n-vestige-foot,.fd-n-riso-bottom{grid-column:auto}
.fd-n-vestige-object{height:480px}.fd-n-lime-console{min-height:460px}.fd-n-riso-poster{height:510px}
}
@media(max-width:640px){
.fd-native{margin:25px auto 60px;padding-inline:20px}
.fd-native h2{font-size:clamp(41px,12vw,64px);overflow-wrap:anywhere}
.fd-n-acid-sweep,.fd-n-margaux-index,.fd-n-botanical-cases,.fd-n-lime-bottom,.fd-n-gazette-articles{grid-template-columns:1fr}
.fd-n-acid-orb{min-height:230px}.fd-n-margaux-mark{font-size:130px}
.fd-n-mono h2{font-size:clamp(61px,20vw,105px)}.fd-n-mono-foot,.fd-n-mono-foot>div{grid-template-columns:1fr}
.fd-n-mono-rail,.fd-n-gazette-top,.fd-n-gazette-deck{flex-wrap:wrap}
.fd-n-gazette h2{font-size:clamp(66px,20vw,108px);padding:40px 0}
.fd-n-riso-poster{height:420px}.fd-n-riso-paper strong{font-size:clamp(48px,15vw,76px)}
.fd-n-void-stage{min-height:660px}.fd-n-void-head{display:block}.fd-n-void-head p{margin-top:30px}.fd-n-void-ring{width:78%;right:4%}
.fd-n-margaux p{margin:25px 0 40px}.fd-n-vestige-object{height:360px}
.fd-n-botanical-sketch{height:220px}
}
@media(prefers-reduced-motion:reduce){.fd-native *{animation:none!important;transition:none!important}}
`;
