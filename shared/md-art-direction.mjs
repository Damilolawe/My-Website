import {esc} from "./model.mjs";
import {uploadedDesignFor} from "./uploaded-designs.mjs";
/**
 * Each scene is a bespoke compositional component derived from the entire
 * privately preserved design-sources/refero/<brand>/DESIGN.md, NOT a reusable
 * donut / diagonal-stroke graphic with different colors. All mock interface
 * graphics are decorative; never claim live statistics or customer activity.
 * Uploaded customer images take precedence; demo photography never leaks into
 * published customer HTML (the caller provides heroImage for sample only).
 */
const E=x=>esc(x??"");
const label=(x)=>'<span class="art-meta">'+E(x)+'</span>';
const plate=(title,sub)=>'<div class="art-plate"><strong>'+E(title)+'</strong><small>'+E(sub)+'</small></div>';
const mock=(cls,children)=>'<div class="art-component '+cls+'">'+children+'</div>';
const circle=(a)=>'<div class="art-circle">'+E(a)+'</div>';
const SVG='<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="60" cy="60" r="37"/><path d="M14 60h92M60 14v92M34 34l52 52"/></svg>';
const scenes={
 folio:(v,img)=>'<div class="art-folio-grid"><aside>'+label("ISSUE / 01")+plate("A journal","OF THINGS MADE")+'</aside><div class="art-folio-cover">'+img+'<div class="art-folio-type">THE<br>STUDIO<br>ISSUE</div></div><aside class="art-folio-aside"><span>PEOPLE<br>IDEAS<br>PLACES</span><b>VOL. 001</b></aside></div>',
 still:(v,img)=>'<div class="art-still-stage"><span class="art-still-label">Designed to be seen.</span><div class="art-still-product">'+img+'<div class="art-still-object"><i></i><i></i><i></i></div></div><div class="art-still-spec"><b>Form meets function.</b><span>ONE THOUGHTFUL EXPERIENCE</span></div></div>',
 afterhours:(v,img)=>'<div class="art-film-frame">'+img+'<span class="art-film-grain"></span><div class="art-film-meta">A FILM BY '+E(v.content.name)+'</div><div class="art-film-title">AFTER<br>HOURS<span>.</span></div><div class="art-film-timeline"><i></i><span>SCENE 01 / OPENING</span></div></div>',
 signal:(v,img)=>'<div class="art-listening-room"><div class="art-music-head">'+label("YOUR LIBRARY")+'<strong>PLAY / EXPLORE</strong></div><div class="art-album-grid">'+mock("art-album art-album-a",img+'<b>01</b>')+mock("art-album art-album-b",'<div class="art-album-glyph">S/N</div><b>02</b>')+mock("art-album art-album-c",'<div class="art-album-rings"></div><b>03</b>')+'</div><div class="art-music-row"><span>FEATURED COLLECTION</span><strong>MADE TO BE HEARD</strong></div></div>',
 orbit:(v,img)=>'<div class="art-linear-app">'+mock("art-linear-sidebar",'<span class="art-app-logo">⌑</span>'+label("YOUR STUDIO")+'<div class="art-linear-item active">Overview</div><div class="art-linear-item">Projects</div><div class="art-linear-item">Archive</div>')+mock("art-linear-main",'<div class="art-linear-bar"><span>WORKSPACE / 001</span><span>● ACTIVE VIEW</span></div><h3>Ideas, in motion.</h3><div class="art-linear-board"><div class="art-linear-column"><span>CONCEPTS</span>'+plate("Explore","Early thinking")+plate("Discover","New direction")+'</div><div class="art-linear-column"><span>IN PROGRESS</span>'+plate("Build","A better experience")+'</div><div class="art-linear-column"><span>SELECTED</span>'+plate("Launch","A considered result")+'</div></div>'+ (img?'<div class="art-linear-upload">'+img+'</div>':"")+'</div>')+'</div>',
 playbill:(v,img)=>'<div class="art-concert-wall"><div class="art-poster-main">'+img+'<div class="art-poster-type"><span>THE NEXT ACT</span><strong>LIVE<br>AND<br>LOUD</strong><small>AN ORIGINAL SHOWCASE / 001</small></div></div><div class="art-poster-stack"><div class="art-poster-secondary"><span>FRI / 01</span><strong>MAKE<br>NOISE.</strong></div><div class="art-poster-third"><strong>NEW<br>WAVE</strong><span>EVENT SERIES 002</span></div></div></div>',
 monologue:(v,img)=>'<div class="art-film-journal"><div class="art-movie-backdrop">'+img+'<span>FEATURED / 01</span></div><div class="art-film-strip">'+[0,1,2].map((i)=>'<div class="art-film-poster art-film-poster-'+i+'"><small>FRAME 0'+(i+1)+'</small><strong>'+["THE OPENING","THE SCENE","THE EDIT"][i]+'</strong></div>').join("")+'</div></div>',
 portraiture:(v,img)=>'<div class="art-vsco-editorial"><div class="art-vsco-image">'+img+'</div><div class="art-vsco-sidebar"><span>THE LOOKBOOK</span><strong>PORTRAIT<br>STUDIES</strong><div class="art-vsco-lines"><i></i><i></i><i></i></div><small>COLLECTION / 01</small></div></div>',
 contactsheet:(v,img)=>'<div class="art-cosmos-canvas"><div class="art-cosmos-tile art-cosmos-large">'+img+'<span>FRAME / 001</span></div><div class="art-cosmos-tile art-cosmos-ink">'+circle("C")+'</div><div class="art-cosmos-tile art-cosmos-paper">'+SVG+'<span>ARCHIVE / 02</span></div><div class="art-cosmos-tile art-cosmos-soft"><span>COLLECT<br>THE<br>GOOD</span></div></div>',
 foundry:(v,img)=>'<div class="art-instrument"><div class="art-instrument-top"><span>OBJECT STUDY / 0001</span><span>PRECISION / DESIGN</span></div><div class="art-instrument-core">'+img+'<div class="art-foundry-device"><div class="art-device-display">01.<br><small>FORM / FUNCTION</small></div><div class="art-device-controls"><i></i><i></i><i></i></div></div></div><div class="art-instrument-bottom"><span>ENGINEERED FOR IMPACT</span><span>© ORIGINAL STUDY</span></div></div>',
 museum:(v,img)=>'<div class="art-figma-canvas"><div class="art-figma-floating">'+plate("A canvas","FOR EVERY IDEA")+'<div class="art-figma-dots"><i></i><i></i><i></i></div></div><div class="art-figma-screen">'+img+'<div class="art-figma-mosaic"><span class="art-shape-one"></span><span class="art-shape-two"></span><span class="art-shape-three"></span></div></div><span class="art-figma-cursor">↗︎</span></div>',
 brutalist:(v,img)=>'<div class="art-bauhaus-board"><div class="art-bauhaus-name">NOT<br>ORDINARY.</div><div class="art-bauhaus-objects"><i class="art-bauhaus-pillar p1"></i><i class="art-bauhaus-pillar p2"></i><i class="art-bauhaus-pillar p3"></i><i class="art-bauhaus-cube cube1"></i><i class="art-bauhaus-cube cube2"></i></div><div class="art-bauhaus-media">'+(img.includes("<img")?img:"")+'</div><div class="art-bauhaus-side">IDEAS THAT DON’T ASK PERMISSION.</div></div>',
 nocturne:(v,img)=>'<div class="art-ferrari-screen">'+img+'<div class="art-ferrari-halo"></div><div class="art-ferrari-copy"><small>ONE OF A KIND / 001</small><strong>PURE<br>INTENTION.</strong></div><div class="art-ferrari-bottom">FORM FOLLOWS EMOTION <span>01 / 03</span></div></div>',
 nightgrid:(v,img)=>'<div class="art-warp-hero"><div class="art-terminal-pane"><div class="art-terminal-tabs"><span>workspace</span><span>README.md</span><span>+</span></div><div class="art-terminal-command"><b>~/studio</b> <span>›</span> imagine --new</div><div class="art-terminal-line">The next chapter starts here.</div><div class="art-terminal-prompt">✓︎ <span>YOUR WORK, READY TO SHOW.</span></div></div><div class="art-warp-card"><span>PROJECT PREVIEW</span>'+ (img?img:'<div class="art-warp-geometric"></div>')+'<b>BUILT TO MOVE FORWARD</b></div></div>',
 couture:(v,img)=>'<div class="art-runway-gallery"><div class="art-runway-caption"><span>AN EDITED PERSPECTIVE</span><strong>STUDIES<br>IN FORM</strong></div><div class="art-runway-main">'+img+'<div class="art-runway-number">001 / EDITION</div></div><div class="art-runway-side"><span>RESORT / COLLECTION</span><strong>Quiet<br>Power.</strong></div></div>',
 signaldeck:(v,img)=>'<div class="art-raycast-stage"><div class="art-raycast-orbit"></div><div class="art-command-pane"><div class="art-command-search"><span>⌕</span> Search your possibilities...</div><div class="art-command-list"><div><span>↗︎</span> Explore projects <small>↵</small></div><div><span>◈</span> Selected work <small>⌘ K</small></div><div><span>≡</span> About the studio <small>⌥ A</small></div></div><div class="art-command-footer"><span>DESIGNED FOR SPEED</span><span>2026 EDITION</span></div></div>'+ (img?'<div class="art-raycast-upload">'+img+'</div>':"")+'</div>',
 obsidian:(v,img)=>'<div class="art-oryzo-film"><div class="art-oryzo-top"><span>PROCESS / OBJECT / 001</span><span>MADE WITH INTENTION</span></div><div class="art-oryzo-object">'+img+'<div class="art-oryzo-ring"><div class="art-oryzo-center"></div></div></div><div class="art-oryzo-type">MATTER<br>IN MOTION</div></div>',
 highlighter:(v,img)=>'<div class="art-ramp-workspace"><div class="art-ramp-app"><div class="art-ramp-bar"><b>STUDIO / WORKSPACE</b><span>THE OVERVIEW</span></div><div class="art-ramp-body"><div class="art-ramp-feature"><span>PROJECTS / 001</span><strong>Make every<br>idea count.</strong><div class="art-ramp-key">01 →︎ 02 →︎ 03</div></div><div class="art-ramp-table"><div>SELECTED WORK <span>VIEW</span></div><div>Research <span>01</span></div><div>Design <span>02</span></div><div>Launch <span>03</span></div></div></div></div><div class="art-ramp-footer"><span>BUILT FOR WHAT’S NEXT</span><span>↗︎</span></div>'+ (img?'<div class="art-ramp-upload">'+img+'</div>':"")+'</div>'
};
const beats={
 folio:["An edited point of view","Folio No. 01 is an editorial reading experience with considered type, quietly confident photography and print-inspired chapter pacing.","01 / EDITION"],
 still:["Only what matters","A spare, luminous presentation with product-scale visuals and carefully measured breathing room.","DESIGNED FOR CLARITY"],
 afterhours:["A title worth watching","Black-and-white cinematic chapter breaks give every project its own opening sequence.","NOW SHOWING / 001"],
 signal:["A collection worth exploring","Immersive cover-art grids, playlist-style labels and vibrant action moments put projects in the spotlight.","SELECTED FOR YOU"],
 orbit:["Make room for progress","Quietly engineered interface rhythm, dark precision cards, and a single purposeful action color.","PRODUCT THINKING / 001"],
 playbill:["Turn it up","Oversized display type, graphic posters and punchy card treatments evoke the energy of a sold-out show.","LIVE / NOW"],
 monologue:["A love letter to the frame","Large cinematic stills, poster-like columns and compact editorial metadata tell a connected story.","IN THE FRAME / 01"],
 portraiture:["An eye for the moment","Full-bleed, documentary photography and fearless typography celebrate authentic creative perspective.","IMAGES FIRST"],
 contactsheet:["Collect what inspires","Floating imagery and asymmetrical visual clusters recall a personally curated studio archive.","THE COLLECTIVE / 001"],
 foundry:["Designed like an instrument","Technical annotations, crisp interfaces and careful object staging turn utility into desire.","ENGINEERED / 001"],
 museum:["Room for possibilities","Playful compositions, tactile floating boards and spacious typography make experimentation feel premium.","OPEN STUDIO"],
 brutalist:["Expect the unexpected","Hard-edged geometry, loud full-bleed bands and strict monospaced rhythm refuse the usual template formula.","A NEW KIND OF RULE"],
 nocturne:["An unforgettable presence","Cinematic proportions, wide-spaced type, and restrained red details make every project a moment.","THE SIGNATURE / 01"],
 nightgrid:["Focus on what comes next","Structured dark product windows and expressive typography present creative work as capability.","FORWARD / 001"],
 couture:["Elegance is intentional","Edge-to-edge editorial fashion layouts and delicate typographic intervals never compete with the work.","THE COLLECTION / 001"],
 signaldeck:["Make the complex feel effortless","A keyboard-driven design language, precise application panels, and carefully focused contrasts.","COMMAND / 001"],
 obsidian:["An object of attention","Warm cream on near-black, microscopic labels, and deeply tactile materials reward a closer look.","OBJECT / MOTION"],
 highlighter:["Clarity has character","Highlighter actions, smart page grids and typography-led product stories prioritize confidence over noise.","KEEP MOVING"]
};
export function authoredScene(value,heroImage){
 const d=uploadedDesignFor(value.template);if(!d)return '';
 return '<div class="art-scene art-scene-'+E(d.id)+'">'+scenes[d.id](value,heroImage||'')+'</div>';
}
export function authoredBeat(value){
 const d=uploadedDesignFor(value.template);if(!d)return '';
 const [heading,description,eyebrow]=beats[d.id];
 return '<aside class="md-edition-break md-edition-'+E(d.id)+'" aria-label="'+E("About the visual direction")+'"><div class="md-edition-index">'+E(eyebrow)+'</div><div class="md-edition-content"><h2>'+E(heading)+'</h2><p>'+E(description)+'</p></div><span class="md-edition-rule" aria-hidden="true"></span></aside>';
}
