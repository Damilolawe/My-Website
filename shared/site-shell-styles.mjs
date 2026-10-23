export const shellCSS = `/* Twenty independent site shells — differentiated mastheads, navigation and closings. */
.site-architecture{position:relative;isolation:isolate}
.shell-header,.shell-footer{width:min(1480px,90%);margin:0 auto;position:relative}
.shell-nav{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:clamp(10px,2vw,28px);font:700 12px/1.45 var(--label-font);text-transform:uppercase;letter-spacing:.09em}
.shell-nav a{color:inherit;text-decoration:none;transition:opacity .25s,transform .25s}
.shell-nav a:hover{opacity:.65;transform:translateY(-2px)}
.shell-brand{font:850 clamp(21px,3vw,39px)/1 var(--body-font)!important;letter-spacing:-.07em;text-transform:none;flex:1}
.shell-note,.shell-footer-index{font:700 10px/1.6 var(--label-font);letter-spacing:.12em}
.shell-header{padding:22px 0;z-index:5}
.shell-header .shell-nav a:focus-visible,.shell-footer a:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.shell-mid{position:relative}.shell-opening{position:relative}
.shell-footer{margin-top:70px;padding:40px 0 24px;border-top:1px solid var(--border)}
.shell-footer>strong{display:block;font:900 clamp(64px,11vw,210px)/.83 var(--body-font);letter-spacing:-.1em;margin:60px 0;text-wrap:balance}
.shell-footer-bottom{border-top:1px solid var(--border);padding-top:25px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;font:700 12px var(--label-font);letter-spacing:.08em}
.shell-footer-bottom a{color:inherit;text-decoration:none}
.shell-main{position:relative}
.shell-opening-editorial{border-top:1px solid var(--border);margin-top:25px}
.shell-opening-performance{margin-top:10px}.shell-opening-quiet{padding:15px 0}
.shell-opening-graphic{transform:rotate(-.2deg)}
.shell-mid-technical{border-left:1px solid var(--border);padding-left:clamp(12px,2vw,30px)}
.shell-mid-performance{border-top:7px solid var(--fg)}.shell-mid-graphic{border-top:6px solid var(--fg)}
.shell-mid-quiet{max-width:1280px;margin-inline:auto}
/* 01 / Career identity */
.shell-index{display:grid;grid-template-columns:140px 1fr auto;align-items:center;gap:25px;border-bottom:3px solid var(--fg)}
.shell-index .shell-vertical{writing-mode:vertical-rl;display:flex;gap:15px;letter-spacing:.12em;font:800 9px monospace}
.shell-index .shell-nav{gap:22px}.shell-index .shell-brand{flex-basis:100%}.shell-header-end{font:800 10px monospace;white-space:nowrap}
.index .shell-main{border-inline:1px solid #3332;padding-inline:clamp(10px,2vw,35px)}
.index .shell-footer{border-top:5px solid var(--fg)}
/* 02 / Magazine masthead */
.shell-folio{border-top:8px solid var(--fg);text-align:center}
.shell-folio .folio-rule{display:flex;justify-content:space-between;align-items:center;gap:20px;border-bottom:2px solid var(--fg);padding:18px 0;font:800 10px monospace}
.shell-folio .shell-brand{font:italic 400 clamp(45px,6vw,110px)/.9 Georgia,serif!important;letter-spacing:-.08em}
.shell-folio .shell-nav{justify-content:center;padding:17px 0;border-bottom:1px solid var(--border)}
.folio .shell-footer>strong{font:italic 400 clamp(90px,13vw,235px)/.8 Georgia,serif}
.folio .shell-footer-index{display:block;text-align:center}
/* 03 / Minimal gallery */
.shell-still{padding:45px 0 30px}.shell-still .shell-nav{gap:45px}.shell-still .shell-brand{font:400 clamp(35px,5vw,80px) Georgia,serif!important}
.shell-still .shell-nav-links{display:flex;gap:25px}.still-hairline{margin-top:40px;border-top:1px solid var(--border)}
.still .shell-main{max-width:1360px}
.still .shell-footer{text-align:center;padding:100px 0}.still .shell-footer>strong{font:400 clamp(70px,12vw,220px) Georgia,serif}
.still .shell-footer-bottom{justify-content:space-around}
/* 04 / Film frame */
.shell-afterhours{background:#09080b;color:#fff;padding:20px 3vw;width:100%;border-block:15px solid #07080a}
.cinema-topline{display:flex;justify-content:space-between;gap:10px;align-items:center;font:800 10px monospace;letter-spacing:.12em}
.cinema-topline .shell-brand{font:900 27px system-ui!important;letter-spacing:-.05em}
.shell-afterhours .shell-nav{justify-content:flex-end;padding:20px 0 5px}
.cinema-perforation{font:20px monospace;letter-spacing:1.1em;white-space:nowrap;overflow:hidden;margin-top:18px;color:#999}
.afterhours .shell-footer{background:#0e0e12;color:#e0d9d0;text-align:center;border:0;padding:80px 4vw;width:100%}
.afterhours .shell-footer>strong{font:900 clamp(70px,11vw,190px) system-ui;text-transform:uppercase}
/* 05 / Graphic broadcast */
.shell-signal{width:100%;background:var(--fg);color:var(--bg);padding:0;transform:rotate(-1deg);box-shadow:0 15px var(--secondary)}
.signal-brandbar{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:20px 4vw;border-bottom:3px solid currentColor}
.signal-brandbar .shell-brand{font:1000 clamp(35px,5vw,85px)/.9 system-ui!important;text-transform:uppercase}
.shell-signal .shell-nav{padding:16px 4vw;justify-content:space-between;font-weight:950}
.brutalist-strapline,.brutalist-brand{font-weight:950}
.signal .shell-main{margin-top:75px}.signal .shell-footer>strong{transform:rotate(-3deg);text-shadow:8px 9px 0 var(--secondary)}
/* 06 / Scrapbook */
.shell-daylight{margin:38px auto 0;border-radius:100px;background:var(--secondary);padding:22px 45px;color:#252122;transform:rotate(-1deg)}
.shell-daylight .shell-nav{gap:20px}.daylight-tab{position:absolute;right:5%;top:-35px;font-size:100px;color:var(--accent);line-height:1}
.shell-daylight .shell-nav-links{display:flex;gap:20px}
.daylight .shell-footer{border-radius:150px 30px 80px 25px;background:var(--secondary);padding:80px 5vw;color:#252122}
.daylight .shell-footer>strong{font:italic 700 clamp(65px,11vw,200px) Georgia,serif}
/* 07 / Research identity */
.shell-atlas{background:#0d483e;color:#dbefdf;border-left:13px solid #8dd9b4;padding:30px;display:grid;grid-template-columns:1fr 3fr auto;gap:25px}
.atlas-id,.atlas-registration{font:800 10px/2 monospace}.shell-atlas .shell-nav{gap:15px}.shell-atlas .shell-brand{flex-basis:100%;font-weight:950}
.atlas .shell-main{border-inline:1px dashed #1d675b}.atlas .shell-footer{border-top:7px solid #164d45}
/* 08 / Terminal */
.shell-terminal{background:#07170c;border:2px solid #85d991;color:#9ff6ad;padding:0;font:13px monospace;margin-top:30px}
.terminal-headerbar{background:#24432c;border-bottom:1px solid #85d991;padding:9px 19px;display:flex;justify-content:space-between}
.shell-terminal .shell-nav{justify-content:flex-start;padding:17px 24px;gap:26px;font:13px monospace}
.shell-terminal .shell-brand{font:800 25px monospace!important;flex:0 1 auto}.terminal-prompt{color:#a8ffb5}
.terminal .shell-footer{background:#0a170c;color:#b4f3bb;border:1px dashed #8cff8e;padding:40px}
.terminal .shell-footer>strong{font:750 clamp(37px,7vw,130px)/1.1 monospace;letter-spacing:-.075em}
/* 09 / Spatial */
.shell-orbit{position:relative;display:flex;align-items:center;gap:20px;padding:45px 0 15px}
.orbit-compass{font-size:70px;color:var(--accent);line-height:1}.shell-orbit .shell-nav{flex:1}.orbit-coordinates{writing-mode:vertical-rl;font:700 9px monospace}
.orbit .shell-main{overflow:visible}.orbit .shell-footer{border:1px solid var(--border);border-radius:50%;padding:80px 5vw;text-align:center}
.orbit .shell-footer>strong{font-weight:950}
/* 10 / Theatre playbill */
.shell-playbill{border:12px double #572b20;color:#4e2921;background:#e5d5b9;text-align:center;padding:20px;margin-top:20px}
.shell-playbill .shell-brand{display:block;font:italic 400 clamp(52px,8vw,145px)/.9 Georgia,serif!important}
.playbill-fineprint{font:800 11px/1.5 Georgia;letter-spacing:.15em}
.shell-playbill .shell-nav{justify-content:center;gap:40px;border-block:1px solid #79533f;padding:15px}
.playbill .shell-footer{background:#e3cfb0;color:#4c2b1c;border:10px double #734f37;padding:65px 4vw;text-align:center}
.playbill .shell-footer>strong{font:italic 400 clamp(70px,11vw,190px) Georgia,serif}
/* 11 / Script */
.shell-monologue{background:#fffdf3;color:#252722;box-shadow:12px 17px 0 #c4bbaa;padding:45px;display:grid;grid-template-columns:140px 1fr 20px;gap:20px;font:800 12px monospace;margin-top:20px}
.script-pagination{font:800 11px/1.8 monospace}.script-paperclip{font:40px monospace}
.shell-monologue .shell-nav{font:700 13px monospace;justify-content:flex-start}.shell-monologue .shell-brand{flex-basis:100%;font:700 28px monospace!important}
.monologue .shell-footer{background:#fffaf0;color:#242625;box-shadow:12px 16px 0 #b7afa0;padding:80px 5vw}
.monologue .shell-footer>strong{font:700 clamp(70px,10vw,170px) "Courier New",monospace}
/* 12 / Casting lookbook */
.shell-portraiture{border-inline:1px solid #937163;padding:35px;display:grid;grid-template-columns:1fr 3fr auto;align-items:center;gap:20px}
.portrait-count,.portrait-frame-number{font:800 11px monospace}
.shell-portraiture .shell-brand{font:italic 400 clamp(30px,4vw,66px) Georgia,serif!important}
.portraiture .shell-footer{border-radius:50% 50% 0 0;background:var(--secondary);padding:140px 5vw 45px;text-align:center}
.portraiture .shell-footer>strong{font:400 clamp(85px,13vw,200px) Georgia,serif}
/* 13 / Film negative */
.shell-contactsheet{background:#111811;color:#e4f4df;padding:12px 15px;font:800 11px monospace;margin-top:10px}
.negative-dashes{white-space:nowrap;overflow:hidden;letter-spacing:1.2em;color:#b6d2a9}
.shell-contactsheet .shell-nav{padding:15px 25px}.shell-contactsheet .shell-brand{font:900 23px monospace!important}
.contactsheet .shell-footer{background:#101710;color:#e8f6df;padding:60px 4vw}
.contactsheet .shell-footer>strong{font:850 clamp(80px,11vw,200px)/.82 system-ui;text-transform:uppercase}
/* 14 / Fashion issue */
.shell-atelier{text-align:center;padding:25px 0 35px}
.atelier-seasons,.atelier-seasonline{font:800 10px monospace;letter-spacing:.17em;border-block:1px solid;padding:12px}
.shell-atelier .shell-nav{flex-direction:column;gap:20px}.shell-atelier .shell-brand{font:italic 400 clamp(60px,9vw,150px)/.9 Georgia,serif!important}
.shell-atelier .shell-nav-links{display:flex;gap:28px}
.atelier .shell-footer{text-align:center;padding:100px 0}.atelier .shell-footer>strong{font:italic 400 clamp(70px,13vw,235px)/.9 Georgia,serif}
/* 15 / Museum */
.shell-museum{margin:25px auto 60px;display:grid;grid-template-columns:1fr 3fr auto;gap:20px;align-items:center;border-block:1px solid #75664b;padding:25px 0}
.museum-exhibit-tag,.museum-entrance{font:750 10px monospace}.shell-museum .shell-brand{font:400 clamp(30px,4vw,65px) Georgia,serif!important}
.museum .shell-footer{background:#e0d7c1;color:#49392e;padding:75px 5vw}.museum .shell-footer>strong{font:400 clamp(60px,11vw,200px) Georgia,serif}
/* 16 / Printed zine */
.shell-brutalist{border:7px solid #111;background:#f9e737;color:#111;transform:rotate(-1deg);padding:0;margin-top:30px;box-shadow:12px 13px #161616}
.brutalist-brand{display:flex;justify-content:space-between;align-items:center;padding:15px 25px;border-bottom:7px solid #111}
.brutalist-brand .shell-brand{font:1000 clamp(38px,5vw,90px)/.9 system-ui!important;text-transform:uppercase}
.brutalist-brand b{font-size:85px}.shell-brutalist .shell-nav{padding:15px 25px;font-weight:950}
.shell-brutalist .brutalist-strapline{display:block;padding:10px;background:#111;color:#f8e737;text-align:center;font:900 12px monospace}
.brutalist .shell-footer{background:#f4dd22;color:#111;border:8px solid #111;box-shadow:20px 20px #111;transform:rotate(-2deg);padding:50px 4vw}
.brutalist .shell-footer>strong{font:1000 clamp(65px,12vw,220px)/.78 system-ui}
/* 17 / Dark signature */
.shell-nocturne{text-align:center;margin:65px auto;padding:50px 0;border-block:1px solid #ae8b6273;color:#ebd3b4}
.nocturne-star{font-size:45px}.shell-nocturne>.shell-brand{display:block;font:italic 400 clamp(50px,8vw,120px) Georgia,serif!important;margin:15px 0 35px}
.shell-nocturne .shell-nav{justify-content:center;gap:45px}.nocturne-byline{margin-top:25px;font:750 10px monospace;letter-spacing:.16em}
.nocturne .shell-footer{text-align:center;border-top:1px solid #9a815d;color:#e7cd9e}
.nocturne .shell-footer>strong{font:italic 400 clamp(70px,13vw,210px) Georgia,serif}
/* 18 / Workshop header */
.shell-foundry{background:#312f26;color:#f4d497;padding:20px;display:grid;grid-template-columns:120px 1fr auto;align-items:center;gap:20px;margin-top:24px}
.foundry-stamp{border:4px solid #e8bc74;font:950 30px system-ui;text-align:center;padding:25px 10px}
.foundry-heading .shell-brand{display:block;font:950 clamp(32px,5vw,80px)/.9 system-ui!important;text-transform:uppercase}
.foundry-heading .shell-note{display:block;margin-top:9px}
.shell-foundry .shell-nav{justify-content:flex-end}
.foundry .shell-footer{background:#332e23;color:#e9cd9b;padding:60px 4vw}
.foundry .shell-footer>strong{font:950 clamp(70px,12vw,230px)/.85 system-ui;text-transform:uppercase}
/* 19 / Botanical label */
.shell-bloom{margin:35px auto;border:3px solid #ad7097;border-radius:70px 15px 70px 15px;padding:24px 48px;display:flex;align-items:center;gap:25px;color:#753c59}
.bloom-flowerlet{font-size:70px;line-height:1}.shell-bloom>.shell-brand{font:italic 500 clamp(30px,4vw,70px) Georgia,serif!important}
.shell-bloom .shell-nav{justify-content:flex-end}.bloom-wave{font-size:22px;line-height:1}
.bloom .shell-footer{border:2px solid #b0749b;border-radius:80px 15px 80px 15px;background:#f3dfeb;color:#7e3b5e;padding:70px 5vw}
.bloom .shell-footer>strong{font:italic 500 clamp(60px,12vw,200px) Georgia,serif}
/* 20 / Consultancy report */
.shell-ledger{background:#e8eef4;color:#1a3f5a;border-top:9px solid #1a3d58;padding:22px 35px;box-shadow:12px 12px #b3cadc;margin-top:30px}
.ledger-rule,.ledger-underheader{display:flex;justify-content:space-between;font:800 10px monospace;letter-spacing:.12em}
.shell-ledger .shell-nav{padding:30px 0;border-bottom:2px solid #274862}.shell-ledger .shell-brand{font:850 clamp(30px,4vw,74px) system-ui!important}
.ledger-underheader{padding-top:12px}
.ledger .shell-footer{border-top:9px solid #234564;padding:70px 5vw;background:#e7eff6;color:#1d405b}
.ledger .shell-footer>strong{font:950 clamp(65px,11vw,190px) system-ui}
/* responsive system with hard overflow guards */
@media(max-width:900px){
 .shell-index,.shell-atlas,.shell-portraiture,.shell-museum,.shell-foundry,.shell-monologue{grid-template-columns:1fr}
 .shell-index .shell-vertical{display:none}
 .shell-header-end,.atlas-registration,.portrait-frame-number,.museum-entrance{display:none}
 .shell-header{gap:15px}.shell-nav{justify-content:flex-start}
 .shell-main{width:min(100% - 32px,1480px)}
 .shell-bloom{flex-wrap:wrap}
}
@media(max-width:600px){
 .shell-header,.shell-footer{width:calc(100% - 30px)}
 .shell-header{padding:20px 10px}
 .shell-nav{font-size:10px;gap:15px}
 .shell-brand{flex-basis:100%;font-size:24px!important;overflow-wrap:anywhere}
 .shell-footer>strong{font-size:clamp(53px,13vw,88px)!important;overflow-wrap:anywhere}
 .shell-footer{padding:45px 0 20px}.shell-footer-bottom{font-size:10px}
 .shell-afterhours,.shell-signal{width:100%}
 /* At narrow widths the angled Signal masthead used to extend ~2px outside the viewport. */
 .signal .shell-signal{transform:none;max-width:100%}
 .shell-still .shell-nav-links,.shell-daylight .shell-nav-links,.shell-atelier .shell-nav-links{display:flex;flex-wrap:wrap;gap:13px}
 .shell-folio .folio-rule{flex-wrap:wrap}.shell-folio .shell-brand{font-size:48px!important}
 .shell-playbill .shell-brand,.shell-atelier .shell-brand,.shell-nocturne>.shell-brand{font-size:48px!important}
 .shell-daylight,.shell-bloom{padding:26px;border-radius:35px 10px}
 .shell-monologue{padding:20px}.shell-brutalist .brutalist-brand b{font-size:40px}
 .shell-foundry{display:block}.foundry-stamp{display:inline-block;padding:12px;margin-bottom:18px}
 .shell-footer .shell-footer-index{font-size:9px}.shell-footer strong{line-height:1}
 .shell-mid-technical{padding-left:0;border:0}
}
@media(prefers-reduced-motion:reduce){.shell-nav a{transition:none}}
`;
