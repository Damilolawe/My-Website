import {studyCopy,studyCardTitles} from "./zip-guide-copy.mjs";
import {studyArtCategory} from "./zip-project-art.mjs";
// Extracted color systems from the uploaded VoltAgent DESIGN.md archive.
// 10 already represented references excluded, 74 new directions appended in source ZIP order.
// The source guides contain specifications, not full executable websites.
// Third-party branding and proprietary assets are NOT copied.
export const paletteRows="bugatti|000000|ffffff|ffffff|141414|M\nairbnb|ffffff|222222|ff385c|f5f5f5|M\nbmw-m|000000|ffffff|f3f3f3|1a1a1a|M\nbmw|ffffff|262626|1c69d4|fafafa|M\naljazeera|ffffff|000000|fa9000|f4f4f4|S\ncal|ffffff|111111|111111|f5f5f5|S\nbinance|ffffff|181a20|fcd535|1e2329|M\nairtable|ffffff|181d26|1866fa|f8fafc|M\n1win|141415|f0f2f5|00b24b|2e3035|S\nclaude|faf9f5|141413|cc785c|efe9de|S\nclickhouse|0a0a0a|ffffff|faff69|1a1a1a|S\ncoinbase|ffffff|0a0b0d|0052ff|f1f5ff|M\nelevenlabs|f5f5f5|0c0a09|292524|fafafa|S\ncursor|f7f7f4|26251e|f54e00|fafaf7|M\ncohere|ffffff|212121|1b5251|f0f6f1|S\ndell-1996|ffffff|000000|e91d2a|ffffff|S\ndji|ffffff|262626|0070d5|f7f9fa|M\ncomposio|0f0f0f|ffffff|5d48fa|181818|S\nexpo|ffffff|171717|000000|fafafa|S\nhashicorp|000000|ffffff|7b42bc|15181e|S\nframer|090909|ffffff|0099ff|141414|M\nibm|ffffff|161616|0f62fe|f4f4f4|M\nintercom|f5f1ec|111111|f4ae28|ffffff|M\njobright|ffffff|000000|00a680|f2f4f5|S\nhp|ffffff|1a1a1a|024ad8|f3f7fd|S\nkraken|161129|faf8f3|6c4df5|232136|S\nlamborghini|090909|faf8f3|d4b46b|202020|S\nlovable|f6f6fb|14141b|795ff9|e9e6ff|M\nmastercard|f7f8fa|202020|eb001b|fafafa|M\nmercury|fbfcfd|28253b|5266eb|f3f5ff|M\nmeta|ffffff|1c1e21|0064e0|f1f4f7|M\nmongodb|ffffff|001e2b|00ad56|f9fbfa|M\nmistral.ai|ffffff|1f1f1f|fa520f|fafafa|S\nminimax|ffffff|0a0a0a|3745ed|f7f8fa|S\nmintlify|ffffff|0a0a0a|238a66|f7f7f7|M\nmiro|ffffff|1c1c1e|4262ff|f7f8fa|M\nmydealz|f3f5f7|000000|30a83c|ffffff|S\nnerdwallet|ffffff|000000|008254|f7f7f7|S\nnotion|ffffff|1a1a1a|5645d4|f6f5f4|M\nnintendo-2001|7a8aba|21242e|e60012|ffffff|S\nnvidia|ffffff|000000|76b900|f3f5f0|M\noracle|ffffff|161513|b72f24|fbf9f8|M\nplaystation|ffffff|000000|0070d1|f5f7fa|M\nollama|ffffff|000000|000000|ffffff|S\nopencode.ai|fdfcfc|201d1d|007aff|f1eeee|S\nrenault|ffffff|000000|ffed00|f4f4f4|S\noura|f7f1e8|1c1b1a|2a72de|ffffff|S\nposthog|eeefe9|23251d|f7a501|ffffff|M\npinterest|ffffff|000000|e60023|f6f6f3|M\nsentry|1f1633|ffffff|a28afe|271d45|M\nshopify|fffefa|202d23|87a947|f0f4e9|M\nrevolut|ffffff|191c1f|494fdf|f3f4ff|M\nreplicate|f9f7f3|202020|ea2804|ffffff|S\nsanity|101215|faf8f3|e75b38|23262c|S\nsap|ffffff|000000|0057d2|eef3fb|S\nresend|000000|fcfdff|a68bfa|0a0a0c|M\nspacex|000000|ffffff|ffffff|161616|S\nslack|ffffff|1d1d1d|4a154b|faf5fa|M\nstarbucks|f5f1e7|253b2e|00754a|ffffff|M\ntesla|101010|faf8f3|e82127|1b1b1b|M\nstripe|ffffff|0d253d|533afd|f6f9fc|M\ntheverge|101215|faf8f3|ffcc00|23262c|S\nvercel|ffffff|171717|171717|fafafa|M\nuber|ffffff|000000|000000|efefef|S\nsuperhuman|ffffff|292827|1b1938|fafaf8|S\nsupabase|ffffff|171717|3ecf8e|fafafa|M\ntogether.ai|ffffff|000000|6e55db|f6f4fe|S\nvodafone|ffffff|25282b|e60000|f2f2f2|S\nwired|ffffff|000000|000000|f5f5f5|S\nwebflow|ffffff|080808|146ef5|f4f7ff|M\nwise|ffffff|0e0f0c|9fe870|e8ebe6|M\nvoltagent|101010|f2f2f2|00d992|1a1a1a|S\nzapier|fffefb|201515|ff4f00|f8f4f0|S\nx.ai|0a0a0a|ffffff|ffffff|1a1c20|S";
const label=x=>x.split(/[.-]/).map(w=>({ai:"AI",ibm:"IBM",bmw:"BMW",hp:"HP",dji:"DJI",nvidia:"NVIDIA",sap:"SAP",x:"X"}[w]||w.charAt(0).toUpperCase()+w.slice(1))).join(" ");
// Public-facing descriptors describe visual direction without exposing
// the original third-party references used as design research.
const galleryStyleByCategory=Object.freeze({
 auto:"Automotive editorial",
 editorial:"Editorial publishing",
 fintech:"Financial interface",
 code:"Developer experience",
 product:"Product design",
 commerce:"Digital commerce",
 studio:"Creative portfolio"
});
export const zipDesigns=Object.freeze(paletteRows.split("\n").map((row,i)=>{
 const [source,bg,ink,accent,surface,mode]=row.split("|");
 return Object.freeze({id:"md-"+source.replace(/[^a-z0-9]+/g,"-"),name:label(source)+" Study",
 style:galleryStyleByCategory[studyArtCategory(source)],tag:"Distinctive source-guided digital design.",color:"#"+accent,
 bg:"#"+bg,ink:"#"+ink,accent:"#"+accent,surface:"#"+surface,source,
 tier:mode==="M"?"signature":"starter",multipage:mode==="M",reference:"VoltAgent DESIGN.md",
 recommended:["Creative portfolio","Professional portfolio","Small business"],sourceIndex:i});
}));
export const zipDesignFor=id=>zipDesigns.find(t=>t.id===id)||null;
export const zipPages=Object.freeze(["home","work","features","studio","contact"]);
// Page-specific labels derived from the original DESIGN.md architecture. Stable URLs
// remain unchanged to preserve build artifacts and deep links.
const guideChapterLabels={"airbnb":["Explore","Features"],"bmw-m":["Explore","Features"],"binance":["Collection","Pricing"],"airtable":["Explore","Pricing"],"coinbase":["Explore","Pricing"],"cursor":["Explore","Pricing"],"dji":["Collection","Pricing"],"framer":["Work","Pricing"],"ibm":["Collection","Documentation"],"intercom":["Explore","Pricing"],"lovable":["Work","Documentation"],"mastercard":["Explore","Features"],"mercury":["Collection","Pricing"],"meta":["Collection","Features"],"mongodb":["Collection","Documentation"],"mintlify":["Work","Documentation"],"miro":["Collection","Documentation"],"notion":["Work","Documentation"],"nvidia":["Explore","Documentation"],"oracle":["Collection","Pricing"],"posthog":["Collection","Documentation"],"pinterest":["Explore","Documentation"],"sentry":["Explore","Documentation"],"shopify":["Explore","Pricing"],"revolut":["Collection","Features"],"resend":["Explore","Documentation"],"slack":["Explore","Pricing"],"starbucks":["Collection","Features"],"stripe":["Explore","Pricing"],"vercel":["Work","Pricing"],"supabase":["Explore","Pricing"],"webflow":["Collection","Pricing"],"wise":["Work","Pricing"]};
export const zipChapterLabels=source=>["Home",...(guideChapterLabels[source]||["Work","Features"]),"Studio","Contact"];

export const isDarkHex=hex=>{const h=hex.replace("#","");return [0,2,4].reduce((a,i)=>a+parseInt(h.slice(i,i+2),16),0)<365};
const guideStories={
 "md-bugatti":{name:"ATELIER VELOCITY",headline:"BEYOND EVERY LIMIT.",heroLabel:"ENGINEERING / THE ART OF MOVEMENT",bio:"A fictional luxury automotive atelier devoted to performance, precision and sculptural design.",cards:[{title:"The Grand Tour",description:"A study of movement, silence and speed.",url:""},{title:"Precision as Art",description:"A visual concept where engineering becomes sculpture.",url:""},{title:"The Collection",description:"An imagined selection of remarkable machines.",url:""}]},
 "md-airbnb":{name:"HOMEBY",headline:"Your place, wherever you go.",heroLabel:"HOMES / EXPERIENCES / DISCOVER",bio:"A fictional stay-discovery marketplace introducing remarkable spaces and memorable travel experiences.",cards:[{title:"A hillside hideaway",description:"A quiet retreat with open views and warm interiors.",url:""},{title:"Coastal mornings",description:"An imagined seaside apartment made for slow days.",url:""},{title:"The city loft",description:"A fictional urban escape with an inviting atmosphere.",url:""}]},
 "md-claude":{name:"KINSHIP INTELLIGENCE",headline:"Good ideas need room to grow.",heroLabel:"A THOUGHTFUL DIGITAL ASSISTANT",bio:"A fictional intelligence workspace designed around thoughtful collaboration and human creativity.",cards:[{title:"Think together",description:"An imagined research space for exploring important questions.",url:""},{title:"Create with clarity",description:"A calmer writing experience for ambitious ideas.",url:""},{title:"Build with care",description:"An example development workspace for useful tools.",url:""}]},
 "md-framer":{name:"FORM STUDIO",headline:"Dream it. Make it real.",heroLabel:"INTERACTIVE DESIGN / DIGITAL CANVAS",bio:"A fictional creative design platform turning bold ideas into expressive digital experiences.",cards:[{title:"Electric Atmosphere",description:"A vibrant gradient showcase of experimental work.",url:""},{title:"Canvas in Motion",description:"An imagined interactive product artboard.",url:""},{title:"The Possibilities",description:"A gallery of spatial design and digital stories.",url:""}]},
 "md-nintendo-2001":{name:"PIXELQUEST 2001",headline:"Your next adventure is loading.",heroLabel:"THE GAME ZONE / PLAYER ONE",bio:"A fictional retro games portal inspired by colorful Y2K consoles, friendly system panels and bright arcade culture.",cards:[{title:"New Releases",description:"Explore imaginary games for the next big adventure.",url:""},{title:"The Players Club",description:"A fun community for sharing games and challenges.",url:""},{title:"Game Finder",description:"A colorful collection of fictional game worlds.",url:""}]},
 "md-shopify":{name:"VERDANT SUPPLY",headline:"Your next big thing starts here.",heroLabel:"COMMERCE / MADE FOR MAKERS",bio:"A fictional independent commerce brand bringing inspiring products and thoughtful shops into one place.",cards:[{title:"The Spring Edit",description:"Everyday essentials with a considered touch.",url:""},{title:"Small Batch",description:"Products crafted with careful attention to materials.",url:""},{title:"Meet the Makers",description:"An imagined collection of independent creative shops.",url:""}]}
};

/* Fictional concept brands for source-guided previews. These are not copies
   of third-party company names, and never override a customer's chosen brand.
   Every example should read like a finished site instead of "STUDIO 66". */
export const demoBrandNames=Object.freeze({
  "bugatti": "ATELIER VELOCITY",
  "airbnb": "HOMEBY",
  "bmw-m": "APEX MOTORWORKS",
  "bmw": "NORTHLINE AUTOMOTIVE",
  "aljazeera": "THE OPEN LETTER",
  "cal": "DAILY RHYTHM",
  "binance": "VANTA LEDGER",
  "airtable": "FIELDWORK STUDIO",
  "1win": "THE CLUBHOUSE",
  "claude": "KINSHIP INTELLIGENCE",
  "clickhouse": "QUERY HOUSE",
  "coinbase": "THE FUTURE FUND",
  "elevenlabs": "SOUND FORM",
  "cursor": "NORTHSTACK",
  "cohere": "CLARITY HOUSE",
  "dell-1996": "BYTE & CO.",
  "dji": "SKYLINE AERIAL",
  "composio": "MOTION GRID",
  "expo": "LAUNCHPAD STUDIO",
  "hashicorp": "SYSTEMATIC",
  "framer": "FORM STUDIO",
  "ibm": "BLUEPRINT BUREAU",
  "intercom": "COMMON GROUND",
  "jobright": "NEXT CHAPTER",
  "hp": "HORIZON DEVICES",
  "kraken": "MIDNIGHT EXCHANGE",
  "lamborghini": "FORM & VELOCITY",
  "lovable": "SUNROOM DIGITAL",
  "mastercard": "MOMENT CARD",
  "mercury": "NORTH BANKING",
  "meta": "COMMONSPACE",
  "mongodb": "GREENHOUSE DATA",
  "mistral.ai": "OPEN INTELLIGENCE",
  "minimax": "KINETIC LAB",
  "mintlify": "FIELDNOTES WORKSHOP",
  "miro": "GOOD IDEAS CLUB",
  "mydealz": "DAILY FINDS",
  "nerdwallet": "CLEVER CAPITAL",
  "notion": "THE MAKING ROOM",
  "nintendo-2001": "PIXELQUEST 2001",
  "nvidia": "VECTOR COMPUTE",
  "oracle": "COLUMN ONE",
  "playstation": "NEON ARCADE",
  "ollama": "OPEN MODELS",
  "opencode.ai": "SOURCE FORGE",
  "renault": "CITYLINE MOTORS",
  "oura": "RITUAL WELLNESS",
  "posthog": "EVENT HORIZON",
  "pinterest": "PINBOARD EDITIONS",
  "sentry": "NIGHT WATCH",
  "shopify": "VERDANT SUPPLY",
  "revolut": "EVERYDAY ACCOUNT",
  "replicate": "TWIN LAB",
  "sanity": "CONTENT THEORY",
  "sap": "ENTERPRISE FIELD",
  "resend": "LETTERHEAD",
  "spacex": "SKYWARD MISSION",
  "slack": "THE WORKROOM",
  "starbucks": "FAR & FABLE",
  "tesla": "ELECTRIC FORM",
  "stripe": "MODERN PAY",
  "theverge": "THE OTHER SIDE",
  "vercel": "FRONTIER DEPLOY",
  "uber": "MOVE CITY",
  "superhuman": "FAST LETTER",
  "supabase": "GROVE DATABASE",
  "together.ai": "HUMAN & MACHINE",
  "vodafone": "SIGNAL HOUSE",
  "wired": "CULTURE CURRENT",
  "webflow": "FLOW STATE",
  "wise": "WORLD LEDGER",
  "voltagent": "WORKFLOW LAB",
  "zapier": "TASK CRAFT",
  "x.ai": "THE AI NOTEBOOK"
});
const chapterEyebrows=Object.freeze({
 auto:"MOTION / FORM / ENGINEERING",
 fintech:"FINANCIAL PRODUCTS / NEW DIRECTIONS",
 editorial:"INDEPENDENT CULTURE / IDEAS",
 code:"DEVELOPER EXPERIENCE / SYSTEMS",
 product:"PRODUCT DESIGN / EVERYDAY IDEAS",
 commerce:"OBJECTS / EXPERIENCES / COMMERCE",
 studio:"AN INDEPENDENT CREATIVE PRACTICE"
});

export function sampleZipDesign(id,base){
 const t=zipDesignFor(id);if(!t)return null;
 const authored=guideStories[id]||{};
 const study=studyCopy[t.source];
 const names=studyCardTitles(t.source);
 return {...base,type:"Creative portfolio",template:id,
 design:{...base.design,primary:t.color,secondary:t.surface,appearance:isDarkHex(t.bg)?"dark":"light",font:"sans",layout:"split",animation:"expressive",sections:["about","work","services","contact"]},
 content:{...base.content,name:authored.name||demoBrandNames[t.source],headline:study.headline,
 bio:study.bio,
 heroLabel:chapterEyebrows[studyArtCategory(t.source)],
 ctaLabel:"Explore the work",cards:names.map((title,i)=>({
  title,
  description:[
   "A visual direction grounded in "+study.focus.split(/\s+and\s+/i)[0]+", balancing clarity with character.",
   "A closer exploration of "+(study.focus.split(/\s+and\s+/i)[1]||study.focus)+", expressed through form and interaction.",
   "A complete concept bringing "+study.focus+" into a cohesive digital experience."
  ][i],
  url:""
 })),
 services:study.focus.split(/\s+and\s+/i).slice(0,2).map((phrase,i)=>({
  title:phrase.replace(/^./,c=>c.toUpperCase()).replace(/[. ]+$/,""),
  description:i===0?"Defining the visual language of "+phrase+", from first impression to the finest detail.":"Turning "+phrase+" into a more memorable, intuitive experience."
 })),links:[],publicEmail:"",photoIds:[],testimonials:[],...authored}};
}
