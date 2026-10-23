/* Selected template palette overrides preset hero and chrome colors. */
const color=/^#[a-f0-9]{6}$/i;
const rgb=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));
const hex=a=>'#'+a.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
const mix=(a,b,p)=>{const x=rgb(a),y=rgb(b);return hex(x.map((v,i)=>v*p+y[i]*(1-p)))};
const lum=s=>rgb(s).map(n=>{const v=n/255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
const on=s=>lum(s)>.179?'#10131b':'#ffffff';
export function paletteTokens(primary,secondary,dark=false){
 if(!color.test(primary)||!color.test(secondary))throw new TypeError('Invalid palette color');
 const base=dark?'#141619':'#f7f6f2',strong=mix(secondary,base,.70);
 return {'palette-bg':mix(secondary,base,dark?.16:.10),
 'palette-surface':mix(secondary,dark?'#24252a':'#ffffff',dark?.23:.14),
 'palette-primary-soft':mix(primary,base,.27),
 'palette-secondary-soft':mix(secondary,base,.30),
 'palette-secondary-strong':strong,'palette-on-secondary-strong':on(strong),
 'palette-deep-primary':mix(primary,'#090e15',.36),
 'palette-deep-secondary':mix(secondary,'#090e15',.32),
 'on-secondary':on(secondary)};
}
export const paletteInline=(primary,secondary,dark=false)=>Object.entries(paletteTokens(primary,secondary,dark)).map(([k,v])=>'--'+k+':'+v).join(';');
const templates=['index','folio','still','afterhours','signal','daylight','atlas','terminal','orbit','playbill','monologue','portraiture','contactsheet','atelier','museum','brutalist','nocturne','foundry','bloom','ledger'];
const soft='linear-gradient(130deg,var(--palette-primary-soft),var(--palette-secondary-soft))';
const deep='radial-gradient(circle at 65% 28%,var(--palette-deep-primary),var(--palette-deep-secondary) 83%)';
const heroes={index:soft,folio:soft,still:soft,afterhours:deep,signal:soft,daylight:soft,
 atlas:'var(--secondary)',terminal:'var(--palette-deep-primary)',
 orbit:'radial-gradient(circle at 67% 40%,var(--accent),color-mix(in srgb,var(--accent) 78%,var(--secondary)) 85%)',
 playbill:'var(--secondary)',monologue:'var(--secondary)',portraiture:'var(--secondary)',
 contactsheet:'var(--palette-deep-secondary)',atelier:'var(--secondary)',museum:'var(--secondary)',
 brutalist:'var(--accent)',nocturne:deep,foundry:'var(--secondary)',bloom:'var(--secondary)',ledger:'var(--secondary)'};
const darkHeroes=new Set(['afterhours','terminal','contactsheet','nocturne']);
const accentHeroes=new Set(['orbit','brutalist']);
const softHeroes=new Set(['index','folio','still','signal','daylight']);
const specials={
 afterhours:{'.afterhours-screen .experience-art':'background:radial-gradient(ellipse at 65% 30%,var(--accent),var(--palette-deep-secondary) 70%)','.shell-afterhours':'background:var(--palette-deep-primary);color:#fff;border-color:var(--accent)'},
 atlas:{'.shell-atlas':'background:var(--accent);color:var(--on-accent);border-left-color:var(--secondary)','.case-research':'background:var(--palette-secondary-soft);color:var(--fg);border-color:var(--accent)'},
 terminal:{'.shell-terminal':'background:var(--palette-deep-secondary);color:#fff;border-color:var(--accent)','.terminal-headerbar':'background:var(--palette-deep-primary);border-color:var(--accent)','.case-command':'background:var(--palette-deep-secondary);color:#fff;border-color:var(--accent)','.terminal-dots':'color:var(--accent)'},
 orbit:{'.work-card':'background:var(--palette-secondary-soft);color:var(--fg)','.orbit-number':'color:var(--on-accent)'},
 playbill:{'.playbill-ornament':'background:var(--secondary);color:var(--on-secondary)','.theatre-program':'background:var(--palette-secondary-soft);color:var(--fg)','.shell-playbill':'background:var(--secondary);color:var(--on-secondary);border-color:var(--accent)'},
 monologue:{'.script-page':'background:var(--palette-secondary-soft);color:var(--fg)','.shell-monologue':'background:var(--palette-secondary-soft);color:var(--fg)','.case-screenplay':'background:var(--palette-secondary-soft);color:var(--fg)'},
 portraiture:{'.portraiture-seal':'background:var(--accent);color:var(--on-accent)','.portraiture-mosaic span':'background:linear-gradient(130deg,var(--accent),var(--secondary))','.portrait-mat':'background:var(--palette-secondary-soft)'},
 contactsheet:{'.contactsheet-center':'background:var(--palette-deep-primary);color:#fff','.shell-contactsheet':'background:var(--palette-deep-secondary);color:#fff','.case-contact-frame':'background:var(--palette-deep-secondary);color:#fff','.contactsheet-grid i':'background:linear-gradient(145deg,var(--accent),var(--secondary))'},
 atelier:{'.atelier-numeral':'color:var(--accent)'},
 museum:{'.museum-plinth':'background:var(--accent)','.artifact-stand':'background:var(--palette-secondary-soft)'},
 brutalist:{'.brutalist-icon':'color:var(--secondary)','.shell-brutalist':'background:var(--secondary);color:var(--on-secondary);border-color:var(--accent)','.case-flyer':'background:var(--accent);color:var(--on-accent)'},
 nocturne:{'.nocturne-monogram':'color:var(--accent)','.shell-nocturne':'border-color:var(--accent);color:var(--accent)'},
 foundry:{'.foundry-badge':'background:var(--accent);color:var(--on-accent)','.shell-foundry':'background:var(--accent);color:var(--on-accent)'},
 bloom:{'.bloom-flower':'color:var(--accent)','.shell-bloom':'background:var(--secondary);color:var(--on-secondary);border-color:var(--accent)','.case-journal':'background:var(--palette-secondary-soft);color:var(--fg)'},
 ledger:{'.ledger-card':'background:var(--accent);color:var(--on-accent);box-shadow:20px 20px 0 var(--secondary)','.shell-ledger':'background:var(--secondary);color:var(--on-secondary);border-color:var(--accent)','.case-job':'background:var(--palette-secondary-soft);color:var(--fg)'},
 signal:{'.shell-signal':'background:var(--accent);color:var(--on-accent);box-shadow:0 15px var(--secondary)'},
 daylight:{'.shell-daylight':'background:var(--secondary);color:var(--on-secondary)','.daylight-hero::before':'background:var(--secondary)'}
};
const rule=(id,sel,css)=>sel.split(',').map(part=>'body.'+id+' '+part.trim()).join(',')+'{'+css+'}';
export const paletteCSS=templates.map(id=>{
 const text=darkHeroes.has(id)?'#ffffff':accentHeroes.has(id)?'var(--on-accent)':softHeroes.has(id)?'var(--fg)':'var(--on-secondary)';
 return 'body.'+id+'{--bg:var(--palette-bg);--surface:var(--palette-surface)}'+
 rule(id,'.hero','background:'+heroes[id]+';color:'+text)+
 rule(id,'.hero .hero-copy h1,.hero .hero-label,.hero .hero-intro','color:inherit')+
 rule(id,'.shell-header','background:var(--palette-secondary-soft);color:var(--fg);border-color:var(--accent)')+
 rule(id,'.shell-footer','background:var(--palette-secondary-strong);color:var(--palette-on-secondary-strong)')+
 rule(id,'.service-card','background:var(--palette-secondary-soft);color:var(--fg);border-color:var(--palette-secondary-strong)')+
 Object.entries(specials[id]||{}).map(([sel,css])=>rule(id,sel,css)).join('');
}).join('')+
 'body .pill-link,body .hero .pill-link{background:var(--accent)!important;border-color:var(--accent)!important;color:var(--on-accent)!important}'+
 'body .case-art,body .work-art{background:linear-gradient(125deg,var(--accent),var(--secondary))}';
