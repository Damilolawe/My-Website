// Separate source-guided renderers: sports commerce, claymation SaaS,
// cinematic automotive. Proprietary logos and fonts are intentionally omitted.
import {esc,https} from "./model.mjs";
import {trioCSS} from "./voltagent-trio-styles.mjs";
const E=x=>esc(String(x??""));
const demoPhotos={
 nike:[
 "photo-1538805060514-97d9cc17730c","photo-1517836357463-d25dfeac3438",
 "photo-1552674605-db6ffd4facb5","photo-1517649763962-0c623066013b",
 "photo-1546483875-ad9014c88eba"],
 ferrari:[
 "photo-1614200179396-2bdb77ebf81b","photo-1544636331-e26879cd4d9b",
 "photo-1492144534655-ae79c964c9d7","photo-1503376780353-7e6692767b70"]
};
function media(v,i,opts,cls=""){
 const id=v.content.photoIds?.[i];
 const sample=opts.sample===true;
 const src=id?(opts.assetBase||"/api/assets/")+id+(opts.assetSuffix||""):(sample&&demoPhotos[v.template]?.[i]?"https://images.unsplash.com/"+demoPhotos[v.template][i]+"?auto=format&fit=crop&w="+(i===0?2000:1150)+"&q=80":null);
 return '<div class="trio-media '+cls+'">'+(src?'<img src="'+E(src)+'" alt="'+E(v.content.name)+' editorial image '+(i+1)+'" loading="'+(i===0?"eager":"lazy")+'">':'<div class="trio-motif" aria-hidden="true"><i></i><b></b></div>')+'</div>';
}
const data=v=>v.content.cards.length?v.content.cards:[{title:"First perspective",description:v.content.bio,url:""},{title:"In progress",description:"An ongoing creative study",url:""}];
const anchor=(id,text)=>'<a href="#'+id+'">'+text+'</a>';
function header(v,cls,names){
 const links=names.map(([id,label])=>anchor(id,label)).join("");
 return '<header class="'+cls+'"><a href="#main" class="trio-logo">'+E(v.content.name)+'</a><nav aria-label="Section navigation">'+links+'</nav><details class="trio-menu"><summary>Menu <span aria-hidden="true">☰</span></summary><nav aria-label="Mobile navigation">'+links+'</nav></details></header>';
}
const footer=v=>'<footer class="trio-footer"><strong>'+E(v.content.name)+'</strong><nav aria-label="Footer navigation">'+anchor("main","Top ↑︎")+anchor("work","Collection")+anchor("contact","Contact")+'</nav><small>Independent visual design study / Edition 001</small></footer>';
const contact=v=>'<section class="trio-contact" id="contact"><span class="trio-label">03 / CONTINUE THE STORY</span><h2>THE NEXT<br>CHAPTER.</h2>'+(v.content.publicEmail?'<a href="mailto:'+E(v.content.publicEmail)+'" class="trio-button">Get in touch ↗︎</a>':'<p class="contact-setup-note">Add a contact email or public link to receive inquiries.</p>')+'</section>';
function nike(v,opts){
 const c=v.content,r=data(v),nav=[["about","Campaign"],["work","Collection"],["contact","Connect"]];
 const cards=r.slice(0,5).map((x,i)=>'<article class="nike-product">'+media(v,i+1,opts)+'<h3>'+E(x.title)+'</h3><p>'+E(x.description)+'</p><span>MOVE / '+String(i+1).padStart(2,"0")+'</span></article>').join("");
 return '<div class="nike-utility">THE NEXT MOVE STARTS HERE / A CAMPAIGN ABOUT MOVEMENT</div>'+header(v,"nike-header",nav)+
 '<main id="main"><section class="nike-hero hero-variant" id="about" aria-labelledby="hero-title">'+media(v,0,opts)+
 '<div class="nike-hero-copy"><span class="trio-label">'+E(c.heroLabel)+'</span><h1 id="hero-title">'+E(c.headline)+'</h1><p>'+E(c.bio)+'</p><a class="trio-button" href="#work">Explore collection ↗︎</a></div></section>'+
 '<div class="nike-runline" aria-hidden="true"><div class="nike-runline-inner">'+Array.from({length:8},()=>'<span>MOVE FASTER <i>✦︎</i> RUN DIFFERENT <i>✦︎</i> FIND YOUR EDGE <i>✦︎</i></span>').join('')+'</div></div><section class="nike-collection" id="work"><div class="trio-section-head"><h2>MADE TO MOVE.</h2><span class="trio-label">COLLECTION / 001</span></div><div class="nike-grid">'+cards+'</div></section>'+
 '<section class="nike-story">'+media(v,4,opts)+'<div class="nike-story-copy"><span class="trio-label">BEYOND THE FINISH LINE</span><h2>ALWAYS<br>IN MOTION.</h2><p>'+E(c.bio)+'</p><a class="trio-button" href="#contact">Discover more ↗︎</a></div></section>'+
 '<section class="nike-directions"><h2>Choose your direction.</h2><div>'+["RUN","TRAIN","LIVE"].map(x=>'<a href="#work">'+x+' <span aria-hidden="true">↗︎</span></a>').join("")+'</div></section>'+contact(v)+'</main>'+footer(v);
}
function clay(v,opts){
 const c=v.content,r=[...data(v),{title:"Collaborate",description:"Find new ways forward."},{title:"Build",description:"Make useful things together."},{title:"Grow",description:"Turn ideas into momentum."}];
 const panels=r.slice(0,6).map((x,i)=>'<article class="clay-panel"><span class="trio-label">0'+(i+1)+' / WORKFLOW</span><h3>'+E(x.title)+'</h3><p>'+E(x.description)+'</p><div class="clay-ui" aria-hidden="true"><div class="clay-ui-top">FIELDWORK / PLATFORM <span>● ● ●</span></div><i></i><i></i><i></i><div class="clay-ui-bars"><b></b><b></b><b></b><b></b></div></div></article>').join("");
 return header(v,"clay-header",[["about","The idea"],["work","What it does"],["contact","Get in touch"]])+
 '<main id="main"><section class="clay-hero hero-variant" id="about" aria-labelledby="hero-title"><div class="clay-hero-copy"><span class="trio-label">'+E(c.heroLabel)+'</span><h1 id="hero-title">'+E(c.headline)+'</h1><p>'+E(c.bio)+'</p><a class="trio-button" href="#work">Explore the possibilities ↗︎</a></div><div class="clay-world" role="img" aria-label="Three-dimensional colorful clay-style mountains and orb"><div class="clay-mount a"></div><div class="clay-mount b"></div><div class="clay-sphere"></div><div class="clay-earth"></div><span class="clay-spark s1" aria-hidden="true"></span><span class="clay-spark s2" aria-hidden="true"></span><span class="clay-spark s3" aria-hidden="true"></span></div></section>'+
 '<div class="clay-trust">BEAUTIFUL CONNECTIONS • SURPRISING POSSIBILITIES • MADE TO WORK</div>'+
 '<section class="clay-intro"><span class="trio-label">THE PLATFORM</span><h2>All the pieces.<br>One beautiful picture.</h2></section><section id="work" class="clay-grid">'+panels+'</section>'+
 '<section class="clay-closing"><div><span class="trio-label">MADE FOR THE CURIOUS</span><h2>Make connections<br>that matter.</h2><p>'+E(c.bio)+'</p><a class="trio-button" href="#contact">Start exploring ↗︎</a></div><div class="clay-gem" role="img" aria-label="Sculptural colored orb"></div></section>'+contact(v)+'</main>'+footer(v);
}
function ferrari(v,opts){
 const c=v.content,r=data(v);
 const panels=r.slice(0,2).map((x,i)=>'<article class="ferrari-feature">'+media(v,i+1,opts)+'<span class="trio-label">STORY / '+String(i+1).padStart(2,"0")+'</span><h3>'+E(x.title)+'</h3><p>'+E(x.description)+'</p>'+(https(x.url)?'<a href="'+E(x.url)+'" target="_blank" rel="noopener noreferrer">Explore chapter ↗︎</a>':'')+'</article>').join("");
 return header(v,"ferrari-header",[["about","Vision"],["work","Collection"],["contact","Contact"]])+
 '<main id="main"><section class="ferrari-hero hero-variant" aria-labelledby="hero-title">'+media(v,0,opts)+'<div class="ferrari-hero-copy"><span class="trio-label">'+E(c.heroLabel)+'</span><h1 id="hero-title">'+E(c.headline)+'</h1><p>'+E(c.bio)+'</p><a class="trio-button" href="#work">Discover more ↗︎</a></div><div class="ferrari-scroll-cue" aria-hidden="true"><i></i> SCROLL TO EXPLORE</div></section>'+
 '<section class="ferrari-vision" id="about"><span class="trio-label">01 / FORM & PERFORMANCE</span><h2>DESIGNED<br>TO BE FELT.</h2><p>'+E(c.bio)+'</p></section>'+
 '<section class="ferrari-collection" id="work">'+panels+'</section>'+
 '<section class="ferrari-specs">'+["FORM","FEEL","TIME"].map((x,i)=>'<article><span class="trio-label">0'+(i+1)+' / DESIGN STUDY</span><strong>'+x+'</strong><p>'+["Every line has intention.","A story in motion.","Precision in every detail."][i]+'</p></article>').join("")+'</section>'+
 '<section class="ferrari-end">'+media(v,3,opts)+'<span class="trio-label">THE ART OF VELOCITY / EDITION 001</span></section>'+contact(v)+'</main>'+footer(v);
}
export function renderVoltAgentTrio(value,opts={}){
 const type=value.template;
 if(!["nike","clay","ferrari"].includes(type))return null;
 const content=value.content||{};
 const html=type==="nike"?nike(value,opts):type==="clay"?clay(value,opts):ferrari(value,opts);
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="'+(type==="ferrari"?"dark":"light")+'"><title>'+E(content.name)+' — '+E(content.headline)+'</title><meta name="description" content="'+E(content.headline)+'"><style>'+trioCSS(type)+'</style></head><body class="trio-site trio-'+type+' motion-'+E(value.design.animation)+'">'+
 (opts.sample?'<div class="trio-demo">FICTIONAL TEMPLATE DEMO — INDEPENDENT DESIGN STUDY</div>':'')+
 '<a class="trio-skip" href="#main">Skip to content</a>'+html+'</body></html>';
}
