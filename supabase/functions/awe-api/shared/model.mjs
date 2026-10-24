import { newTemplates } from "./catalog-20.mjs";
import { originalDirections, directionFor } from "./refero-originals.mjs";
import {uploadedDesignFor} from "./uploaded-designs.mjs";
export const templates = [
  {
    id: "index",
    name: "The Index",
    style: "Modern professional",
    tag: "A sharp first impression.",
    color: "#3459dd",
  },
  {
    id: "folio",
    name: "Folio No. 01",
    style: "Elegant editorial",
    tag: "Let your work speak volumes.",
    color: "#9f442f",
  },
  {
    id: "still",
    name: "Still Studio",
    style: "Luxury minimalist",
    tag: "Less noise. More presence.",
    color: "#52604c",
  },
  {
    id: "afterhours",
    name: "After Hours",
    style: "Dark cinematic",
    tag: "Made for the spotlight.",
    color: "#b4acff",
  },
  {
    id: "signal",
    name: "Signal / Noise",
    style: "Bold creative",
    tag: "Impossible to scroll past.",
    color: "#e95a24",
  },
  {
    id: "daylight",
    name: "Daylight",
    style: "Playful contemporary",
    tag: "A little personality goes far.",
    color: "#7252ce",
  },
  {id:"liquidmetal",name:"Liquid Metal",style:"Graphite machined glass",tag:"A refined metallic presence.",color:"#E8EAEE"},
  ...newTemplates,
  ...originalDirections,
];
export const types = [
  "Student résumé",
  "Professional portfolio",
  "Actor / model",
  "Creative portfolio",
  "Personal brand",
  "Small business",
];
export const sections = [
  "about",
  "work",
  "services",
  "education",
  "experience",
  "skills",
  "testimonials",
  "contact",
];
export const esc = (x) =>
  String(x ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function text(x, max = 3000) {
  return String(x ?? "")
    .trim()
    .slice(0, max);
}
export function https(x) {
  if (!x) return "";
  try {
    const u = new URL(x);
    return u.protocol === "https:" && !u.username && !u.password ? u.href : "";
  } catch {
    return "";
  }
}
const cleanCards = (items, kind) =>
  (Array.isArray(items) ? items : []).slice(0, 12).map((item) => ({
    title: text(item?.title, 120),
    description: text(item?.description, 1200),
    url: https(item?.url),
  })).filter((item) => item.title || item.description);
const cleanTestimonials = (items) =>
  (Array.isArray(items) ? items : []).slice(0, 8).map((item) => ({
    quote: text(item?.quote, 700),
    attribution: text(item?.attribution, 100),
  })).filter((item) => item.quote);
export function normalize(input = {}) {
  const t = templates.find((t) => t.id === input.template) || templates[0];
  const c = input.content || {},
    d = input.design || {};
  return {
    type: types.includes(input.type) ? input.type : types[0],
    template: t.id,
    design: {
      primary: /^#[0-9a-f]{6}$/i.test(d.primary) ? d.primary : t.color,
      secondary: /^#[0-9a-f]{6}$/i.test(d.secondary) ? d.secondary : t.id === "arcade" ? "#11120f" : "#ece9e0",
      font: ["sans", "serif", "mono"].includes(d.font) ? d.font : "sans",
      appearance: d.appearance === "dark" ? "dark" : "light",
      layout: d.layout === "split" ? "split" : "stacked",
      navigation: d.navigation === "compact" ? "compact" : "full",
      animation: ["none", "subtle", "expressive"].includes(d.animation)
        ? d.animation
        : "subtle",
      sections: [...new Set((Array.isArray(d.sections) ? d.sections : sections)
        .filter((s) => sections.includes(s)))],
      heroAlignment: ["left", "center", "right"].includes(d.heroAlignment) ? d.heroAlignment : "left",
      density: ["airy", "balanced", "compact"].includes(d.density) ? d.density : "balanced",
      corners: ["sharp", "soft", "round"].includes(d.corners) ? d.corners : "soft",
    },
    content: {
      name: text(c.name, 100),
      headline: text(c.headline, 160),
      bio: text(c.bio),
      education: text(c.education),
      experience: text(c.experience),
      skills: text(c.skills, 1500),
      projects: text(c.projects, 5000),
      publicEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.publicEmail || "")
        ? text(c.publicEmail, 254)
        : "",
      links: (Array.isArray(c.links) ? c.links : [])
        .slice(0, 6)
        .map(https)
        .filter(Boolean),
      heroLabel: text(c.heroLabel, 110),
      ctaLabel: text(c.ctaLabel, 45) || "Explore my work",
      cards: cleanCards(c.cards, "work"),
      services: cleanCards(c.services, "service"),
      testimonials: cleanTestimonials(c.testimonials),
      photoIds: (Array.isArray(c.photoIds) ? c.photoIds : [])
        .filter((x) => /^[0-9a-f-]{36}$/.test(x))
        .slice(0, 8),
    },
    preferences: text(input.preferences, 2000),
  };
}
export function validate(input) {
  if (
    input?.content?.publicEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.content.publicEmail)
  )
    throw Object.assign(
      new Error("Enter a valid public email or leave it blank."),
      { status: 400 },
    );
  if ((input?.content?.links || []).some((u) => !https(u)))
    throw Object.assign(new Error("Profile links must be valid HTTPS URLs."), {
      status: 400,
    });
  const v = normalize(input);
  if (!v.content.name || !v.content.headline)
    throw Object.assign(new Error("Add your public name and headline."), {
      status: 400,
    });
  if (!v.design.sections.length)
    throw Object.assign(new Error("Choose at least one section."), {
      status: 400,
    });
  return v;
}
export const sample = {
  type: types[1],
  template: "index",
  content: {
    name: "Jordan Ellis",
    headline: "Making thoughtful things for a changing world.",
    bio: "A fictional creative exploring design, storytelling, and the spaces in between.",
    projects:
      "Objects of everyday life\nA personal study of shape, light, and daily rituals.\n\nA different perspective\nAn experimental editorial series.",
    education: "Sample education — replace with your own verified information.",
    experience: "Sample experience — tell your own story.",
    skills: "Design / Photography / Creative direction",
    links: [],
    heroLabel: "Independent designer / Visual storyteller",
    ctaLabel: "See selected projects",
    cards: [
      { title: "Form & Function", description: "A fictional visual identity and digital design study.", url: "" },
      { title: "New Perspectives", description: "An experimental editorial concept built around everyday life.", url: "" },
      { title: "Open Studio", description: "An ongoing fictional collection of photography and creative work.", url: "" }
    ],
    services: [
      { title: "Art Direction", description: "Imagining compelling identities and experiences.", url: "" },
      { title: "Web Design", description: "Thoughtful, responsive digital storytelling.", url: "" }
    ],
    testimonials: [{ quote: "A fictional quote for layout demonstration only.", attribution: "Sample testimonial — not a real client" }]
  },
};
/* All demo identities, roles and portfolio items below are explicitly fictional.
 * Never substitute sample accomplishments for real customer information. */
const demoIdentities = {
  index: { name:"Avery Brooks",headline:"Building what comes next.",heroLabel:"Software developer / Curious by design",
    bio:"A fictional emerging engineer turning difficult problems into simple, useful experiences.",
    projects:[{title:"Field Notes",description:"A sample note-taking application designed around focus.",url:""},{title:"Atlas",description:"A fictional dashboard exploring data and motion.",url:""},{title:"First Principles",description:"A sample frontend development concept.",url:""}],
    skills:"JavaScript / Interface design / Accessible web experiences",education:"Demo university · Sample degree",experience:"Example internship experience — replace with accurate information."},
  folio: {name:"Isabel Quinn",headline:"A new way of seeing.",heroLabel:"Art direction / Photography / Stories",
    bio:"A fictional image-maker drawn to movement, people and the beauty of an unfinished story.",
    projects:[{title:"The Quiet Hours",description:"A conceptual photographic diary.",url:""},{title:"Soft Geometry",description:"An editorial exploration of form and light.",url:""},{title:"Open Water",description:"A fictional series built around texture and atmosphere.",url:""}],
    skills:"Photography / Visual storytelling / Art direction"},
  still: {name:"Noa Sterling",headline:"Presence, not noise.",heroLabel:"Independent creative practice",
    bio:"An imagined studio working at the intersection of thoughtful design and quiet confidence.",
    projects:[{title:"Form Study",description:"A fictional object and identity exploration.",url:""},{title:"The Archive",description:"A collection of minimal editorial concepts.",url:""}],
    services:[{title:"Identity systems",description:"Conceptual brand direction.",url:""},{title:"Digital spaces",description:"Intentional website experiences.",url:""}]},
  afterhours: {name:"Morgan Vale",headline:"Every story deserves a stage.",heroLabel:"Actor / Performer / Storyteller",
    bio:"A fictional screen and stage performer exploring complicated characters and memorable moments.",
    projects:[{title:"The Role",description:"A fictional short-film credit presented for template demonstration.",url:""},{title:"Behind the Scenes",description:"An imagined photography series and performance reel.",url:""}],
    experience:"Sample theatrical credits — enter only verified roles and productions.",skills:"Acting / Performance / Collaboration"},
  signal: {name:"Riley Sparks",headline:"Make a little noise.",heroLabel:"Creative direction / Big ideas",
    bio:"A fictional multidisciplinary creative using color, rhythm and unexpected combinations.",
    projects:[{title:"Signal Lost",description:"A fictional visual identity experiment.",url:""},{title:"Volume 01",description:"A conceptual editorial and motion study.",url:""},{title:"Play Mode",description:"An energetic interactive poster concept.",url:""}]},
  daylight: {name:"Sunday Studio",headline:"Good ideas grow here.",heroLabel:"Independent studio / Small business",
    bio:"A fictional creative service studio focused on good energy and memorable first impressions.",
    projects:[{title:"The Welcome Kit",description:"A sample branded customer experience.",url:""},{title:"The Good Edit",description:"A fictional creative campaign.",url:""}],
    services:[{title:"Brand refresh",description:"A sample service for emerging businesses.",url:""},{title:"Creative consultation",description:"An example project-planning offering.",url:""}]},
  arcade: {name:"Nova Circuit",headline:"The arena is yours.",heroLabel:"Fictional esports event / Broadcast concept",
    bio:"A fictional esports production concept for tournaments, launches, and the communities that show up for them.",
    projects:[{title:"Opening Round",description:"A fictional tournament broadcast concept — no real event or results.",url:""},{title:"The Stage",description:"An imagined player introduction and live-show visual package.",url:""},{title:"Final Signal",description:"An illustrative event identity and social campaign.",url:""}],
    services:[{title:"Event identity",description:"A sample visual system for a competitive event.",url:""},{title:"Broadcast design",description:"An illustrative scorecard and stream package.",url:""}],
    skills:"Art direction / Event identity / Broadcast graphics"}
};
export const typeSlugs = {
  "Student résumé":"student","Professional portfolio":"professional",
  "Actor / model":"actor","Creative portfolio":"creative",
  "Personal brand":"brand","Small business":"business"
};
export function recommendedFor(template, purpose) {
  const ids={
    "Student résumé":["index","atlas","terminal","orbit"],
    "Professional portfolio":["index","atlas","terminal","ledger","orbit"],
    "Actor / model":["afterhours","playbill","monologue","portraiture"],
    "Creative portfolio":["folio","still","contactsheet","atelier","museum","brutalist","signal"],
    "Personal brand":["nocturne","orbit","still","atelier","daylight"],
    "Small business":["foundry","bloom","ledger","daylight","arcade"]
  };
  return (ids[purpose]||[]).includes(template.id) || (template.recommended||[]).includes(purpose);
}
const purposeDemos = {
  "Student résumé": {
    name:"Taylor Morgan",headline:"Curious mind. Real-world momentum.",heroLabel:"Computer science student / Emerging builder",
    bio:"A fictional student combining analytical thinking, thoughtful design, and hands-on projects.",
    cards:[{title:"Campus Companion",description:"Sample application concept supporting everyday campus life.",url:""},{title:"Data in Motion",description:"Conceptual data visualization project.",url:""},{title:"Accessible by Default",description:"Demonstration of inclusive interface thinking.",url:""}],
    services:[],education:"Demo University — sample studies in computer science.",experience:"Example internship — fictional experience for preview only.",
    skills:"JavaScript / Data visualization / Problem solving",ctaLabel:"Explore projects",
    sections:["about","work","education","experience","skills","contact"]},
  "Professional portfolio":{
    name:"Alex Rivera",headline:"Designing meaningful digital experiences.",heroLabel:"Product designer / Digital strategist",
    bio:"A fictional professional who brings research, storytelling, and thoughtful systems together.",
    cards:[{title:"Experience System",description:"An illustrative UX case study for this concept.",url:""},{title:"Open Product",description:"A sample software product exploration.",url:""},{title:"A Better Journey",description:"Fictional discovery-to-delivery project.",url:""}],
    services:[],education:"Sample training and professional development.",experience:"Sample career highlights; replace with verified positions.",
    skills:"Product strategy / Accessibility / Prototyping",ctaLabel:"View case studies",
    sections:["about","work","experience","skills","education","contact"]},
  "Actor / model":{
    name:"Jordan Monroe",headline:"Every role has a story.",heroLabel:"Actor / Performer / On-screen talent",
    bio:"A fictional performer working across stage, screen, and expressive portraiture.",
    cards:[{title:"The Beginning",description:"FICTIONAL FILM CREDIT — Lead, independent short. Demonstration only.",url:""},{title:"Under the Lights",description:"FICTIONAL THEATRE CREDIT — Ensemble. Demonstration only.",url:""},{title:"Casting Portraits",description:"Example headshot and lookbook gallery.",url:""}],
    services:[],education:"Sample performance training — fictional.",experience:"Selected roles: fictional film and stage examples for design preview.",skills:"Performance / Movement / Collaboration",ctaLabel:"See credits & work",
    sections:["about","work","experience","skills","contact"]},
  "Creative portfolio":{
    name:"Sage Ellis",headline:"There is a story in everything.",heroLabel:"Photographer / Artist / Image maker",
    bio:"A fictional creative exploring shadow, texture, identity, and the moments in between.",
    cards:[{title:"Still Life / 01",description:"Fictional photographic series exploring sculptural objects.",url:""},{title:"The In Between",description:"An imagined editorial story told in images.",url:""},{title:"Moving Pictures",description:"Sample direction for a motion design portfolio.",url:""}],
    services:[{title:"Creative direction",description:"Example offering — tailor to your practice.",url:""}],
    skills:"Photography / Art direction / Editorial design",ctaLabel:"View the collection",
    sections:["about","work","services","contact"]},
  "Personal brand":{
    name:"Avery Lane",headline:"A point of view worth knowing.",heroLabel:"Founder / Creator / Independent thinker",
    bio:"A fictional founder and storyteller sharing ideas, collaborations, and creative ambitions.",
    cards:[{title:"The Perspective",description:"Fictional speaking and writing highlights.",url:""},{title:"Ideas in Practice",description:"Sample ventures and collaborations.",url:""}],
    services:[{title:"Speaking & conversation",description:"Sample invitation to collaborate.",url:""},{title:"Creative partnerships",description:"Illustrative business partnership offering.",url:""}],
    skills:"Leadership / Creative thinking / Storytelling",ctaLabel:"Explore my story",
    sections:["about","work","services","contact"]},
  "Small business":{
    name:"Gather & Co.",headline:"Thoughtful service. Memorable moments.",heroLabel:"Independent local business / Welcome in",
    bio:"A fictional neighborhood service studio making everyday moments more meaningful.",
    cards:[{title:"Our Approach",description:"How we think about thoughtful service and customer care.",url:""},{title:"The Experience",description:"A fictional overview of the customer's journey.",url:""}],
    services:[{title:"Signature service",description:"Fictional example of a core customer offering.",url:""},{title:"Private appointments",description:"Example bookable service — connect a real booking link later.",url:""},{title:"A little extra",description:"Optional tailored project experience.",url:""}],
    skills:"",ctaLabel:"Explore our services",sections:["about","services","work","contact"]}
};
const originalByTemplate = {
  liquidmetal:"Professional portfolio",
  index:"Student résumé",folio:"Creative portfolio",still:"Personal brand",
  afterhours:"Actor / model",signal:"Creative portfolio",daylight:"Small business",
  atlas:"Student résumé",terminal:"Student résumé",orbit:"Professional portfolio",
  playbill:"Actor / model",monologue:"Actor / model",portraiture:"Actor / model",
  contactsheet:"Creative portfolio",atelier:"Creative portfolio",museum:"Creative portfolio",
  brutalist:"Creative portfolio",nocturne:"Personal brand",foundry:"Small business",
  bloom:"Small business",ledger:"Small business",arcade:"Creative portfolio"
};
/* Unique fictional gallery identities. Editable customer values are never replaced. */
const galleryIdentities = {
 liquidmetal:["Adrian Vale","Forma Atelier","Crafted to a higher standard.","Engineered simplicity."],
 index:["Avery Brooks","North & Number","Designed to make sense.","Clarity, structured."],
 folio:["Isabel Quinn","The Margin Studio","A life in chapters.","An edited collection."],
 still:["Noa Sterling","Common Objects","Give the work some room.","A quieter perspective."],
 afterhours:["Morgan Vale","Afterglow Films","Every frame has a pulse.","A story after dark."],
 signal:["Riley Sparks","Static Youth","Make something impossible to ignore.","Where culture meets expression."],
 daylight:["Remy Summers","Good Day Club","A little more wonder.","Ideas with an open door."],
 atlas:["Milan Rivers","Fieldwork Lab","Find the pattern. Change the map.","A collection of discoveries."],
 terminal:["Robin Code","Build State","Curiosity is the starting command.","Ideas, engineered."],
 orbit:["Cameron Vale","New Orbit","The next frontier is personal.","A different point of view."],
 playbill:["Ari Bennett","House Lights","There is more to the story.","An opening night to remember."],
 monologue:["Jules Arden","Scene One","The story begins with a voice.","A new chapter, in motion."],
 portraiture:["Taylor Monroe","The Portrait Room","Every face tells another story.","In every light, a new perspective."],
 contactsheet:["Ari Lens","Frame Theory","A moment worth holding.","The art of the edit."],
 atelier:["Sol Morgan","Maison Sol","Details are everything.","A study in materials and form."],
 museum:["Rae Ellis","The New Archive","Make room for a new idea.","An exhibition of possibility."],
 brutalist:["Nico Cross","Hard Copy Studio","Break the expected.","Every surface is a statement."],
 nocturne:["Alex Noir","Velvet & Form","Consider every detail.","An understated impression."],
 foundry:["Drew Mercer","Northline Workshop","Made with purpose. Built to last.","Work with substance."],
 bloom:["Jamie Rose","Bloom & Branch","Good things take shape.","Care in every detail."],
 ledger:["Jordan Park","Everwell Partners","Clarity creates momentum.","Better decisions start here."],
 arcade:["Nova Circuit","Night Shift Arena","The arena is yours.","An imagined competitive broadcast."]
};

/* Editorial fictional content by architecture; customer-entered content remains untouched. */
const galleryStories=Object.freeze({"index":["Making complexity feel effortless.","An imaginary interface designer building tools around clear human decisions.",["Signal Map","Community Table","The Clarity System"]],"folio":["Stories in the margins.","An independent fictional editorial artist assembling magazines, still photographs, and personal essays.",["Issue / 04","Notes from Elsewhere","The Last Page"]],"still":["Observe the ordinary.","A fictional still-life photographer exploring ceramic objects, texture, quiet light, and negative space.",["Morning Objects","Collected Forms","Space Between"]],"afterhours":["Something cinematic is happening.","A fictional film director exploring nocturnal portraiture, slow-burn stories, and dramatic performance.",["Midnight Take","The Long Way Home","Reel / 003"]],"signal":["Culture needs volume.","An imagined poster collective making album campaigns, disruptive typography, and bold music imagery.",["NOISE / 01","Broadcast Club","High Voltage"]],"daylight":["Everyday can feel extraordinary.","A fictional neighborhood creative shop designing friendly packaging and inclusive community experiences.",["Sunday Rituals","Little Joys","Open Door"]],"atlas":["Research has a visual language.","An imaginary field researcher mapping places, discoveries, and public information.",["Field Notes / 08","Open Coordinates","Research Index"]],"terminal":["Ideas worth building.","A fictional software developer exploring accessible tools, command interfaces, and offline-first thinking.",["Console / 01","Protocol Zero","Open Source Lab"]],"orbit":["Move beyond the dashboard.","An imaginary digital product team creating playful tools for complicated human journeys.",["Mission Control","Near / Far","Next Horizon"]],"playbill":["An entrance changes everything.","A fictional performance troupe exploring stagecraft, backstage photography, and theater identities.",["Act One","House Lights","The Ensemble"]],"monologue":["The stage belongs to the voice.","A fictional actor and writer combining close-up portraits, scripts, and intimate performance.",["Scene / 02","Off Book","A Quiet Line"]],"portraiture":["Look again.","A fictional portrait photographer composing human expression through sculptural light and color.",["Faces / 12","Soft Focus","Chromatic Portraits"]],"contactsheet":["Edit with intention.","A fictional image-maker building a visual narrative from raw contact sheets and precise sequencing.",["Frames / 24","Untitled Light","Proof / Selects"]],"atelier":["Designed down to the stitch.","A fictional fashion atelier studying textures, tailoring, and restrained editorial presentation.",["Collection / 01","Thread Studies","Between Seasons"]],"museum":["Give the work room.","A fictional independent gallery collecting unexpected sculptures and inviting new perspectives.",["Room / 06","The Archive","Open Gallery"]],"brutalist":["The rules are optional.","An imaginary graphic design studio challenging conventions with raw collage and graphic systems.",["Rough Draft","CUT / PASTE","NO RULES"]],"nocturne":["Less can mean more.","A fictional art director shaping intimate luxury experiences through materials and shadow.",["Velvet Hours","Private Study","The Signature"]],"foundry":["Craft that stays with you.","A fictional small workshop building thoughtful goods, process stories, and practical brand systems.",["Workshop / 03","Northline Goods","Built to Keep"]],"bloom":["Room to grow.","An imagined floristry studio combining organic arrangements, seasonal color, and hospitality.",["First Bloom","The Greenhouse","Gathered"]],"ledger":["Make it make sense.","A fictional advisory practice translating complex data into clear, calm decisions.",["Annual Outlook","Good Measure","Decision Notes"]]});
export function sampleForTemplate(id,purpose){
  const t=templates.find(x=>x.id===id)||templates[0];
  const category=types.includes(purpose)?purpose:(originalByTemplate[t.id]||"Professional portfolio");
  const kit=purposeDemos[category];
  const old=demoIdentities[t.id];
  const original=purpose===undefined && old;
  const preview = original ? {
    ...kit,...old,cards:old.projects||kit.cards,services:old.services||kit.services
  } : {...kit};
  // The public theater uses different fictional identities, not one generic profile
  // with twenty colorways. Project descriptions remain truthful-to-purpose.
  if (purpose!==undefined && galleryIdentities[t.id]) {
    const [person,business,statement,signature]=galleryIdentities[t.id];
    preview.name=category==="Small business"?business:person;
    preview.headline=statement;
    preview.heroLabel=signature+" / "+category;
    const story=galleryStories[t.id];
    if(story){
      preview.heroLabel=story[0]+" / "+category;
      preview.bio='A fictional demonstration: '+story[1];
      preview.cards=story[2].map((title,i)=>({
        title,description:["A fictional commissioned concept in "+story[0].toLowerCase(),"A different sample project exploring "+signature.toLowerCase(),"A fictional visual study for the "+t.name+" collection."][i],url:""
      }));
    }
  }
  const originalDirection=directionFor(t.id);
  const uploadedDirection=uploadedDesignFor(t.id);
  if (originalDirection) {
    const identity = originalDirection.name + " Studio";
    preview.name = identity;
    preview.headline = originalDirection.tag;
    preview.heroLabel = originalDirection.style + " / " + category;
    preview.bio = "A fictional sample for " + originalDirection.name + ": a distinct original design concept presenting " + originalDirection.character + " with an authentic visual rhythm.";
    preview.cards = [
      {title: originalDirection.name + " / First Impression", description: "An imagined project demonstrating " + originalDirection.style.toLowerCase() + ".", url: ""},
      {title: originalDirection.name + " / Working Process", description: "A fictional independent commission with original art direction.", url: ""},
      {title: originalDirection.name + " / Next Edition", description: "An illustrative case study for this website format.", url: ""}
    ];
  }
  if(t.id==="liquidmetal"){
    Object.assign(preview,{
      name:category==="Small business"?"Forma Atelier":"Adrian Vale",
      headline:category==="Small business"?"Precision, made personal.":"Design that leaves a lasting impression.",
      heroLabel:"Independent creative practice / "+category,
      bio:"A fictional example of considered craftsmanship, visual precision and independent creative work.",
      cards:[
        {title:"The Monolith",description:"A fictional sculptural identity system with clean material details.",url:""},
        {title:"Second Nature",description:"A fictional gallery experience exploring light and texture.",url:""},
        {title:"Edition Zero",description:"A fictional editorial portfolio with minimal storytelling.",url:""}
      ],
      services:[{title:"Creative direction",description:"Thoughtful ideas distilled into distinctive work.",url:""},{title:"Visual identity",description:"Clarity, material detail and deliberate composition.",url:""},{title:"Digital experiences",description:"Web work made with technical precision.",url:""}]
    });
  }
  const unique = purpose===undefined && !old;
  const motif={atlas:"Think bigger. Build smarter.",terminal:"Hello, future.",orbit:"Ideas without limits.",
    playbill:"This is the beginning.",monologue:"The scene is yours.",portraiture:"More than a face.",
    contactsheet:"Frame by frame.",atelier:"Crafted, not copied.",museum:"Art speaks.",
    brutalist:"Break the pattern.",nocturne:"An unforgettable presence.",
    foundry:"Built on trust.",bloom:"Come as you are.",ledger:"Make every impression count."};
  if(unique) preview.headline=motif[t.id]||preview.headline;
  if(unique) preview.name=({atlas:"Kai Ellis",terminal:"Robin Code",orbit:"Cameron Vale",playbill:"Morgan Blake",monologue:"Skyler Hart",portraiture:"Taylor Monroe",contactsheet:"Ari Lens",atelier:"Sol Atelier",museum:"The New Archive",brutalist:"Rae Riot",nocturne:"Alex Noir",foundry:"Northline Workshop",bloom:"Bloom & Branch",ledger:"Everwell Partners"})[t.id]||preview.name;
  if(t.id==="arcade" && purpose!==undefined){
    const directions={
      "Student résumé":["Ari Level","Build the next level.","An imagined student developer exploring games, accessibility and interface systems.",["Control Scheme","Match Point","Open Lobby"]],
      "Professional portfolio":["Jordan Flux","Every launch deserves a stage.","A fictional product designer creating tools for competitive communities.",["Arena Interface","Event System","Player Journey"]],
      "Actor / model":["Rae Knight","Own the spotlight.","An imagined host and performer presenting competitive events and creative broadcasts.",["Opening Sequence","Stage Presence","Broadcast Reel"]],
      "Creative portfolio":["Nova Circuit","The arena is yours.","A fictional esports art direction studio making tournament identities and broadcast systems.",["Opening Round","The Stage","Final Signal"]],
      "Personal brand":["Alex Voltage","Make your moment count.","A fictional creator sharing commentary, projects and competitive culture.",["The Channel","Community Nights","Creator Kit"]],
      "Small business":["Night Shift Arena","Play beyond the ordinary.","An imagined event business bringing people together around games and launches.",["The Venue","Event Nights","The Experience"]]
    };
    const [name,headline,bio,projects]=directions[category];
    Object.assign(preview,{name,headline,bio,heroLabel:"Competitive culture / "+category,
      cards:projects.map(title=>({title,description:"A fictional concept for the Arcade Night template preview.",url:""}))});
  }
  const content={...sample.content,...preview,projects:"",links:[],photoIds:[],publicEmail:"",testimonials:[]};
  return {type:category,template:t.id,design:{
    primary:uploadedDirection?.accent||t.color,animation:"expressive",
    secondary:(t.id==="liquidmetal"?"#15181D":uploadedDirection?.surface)||(t.id==="arcade"?"#11120f":originalDirection ? (["negative","nightgrid","signaldeck","obsidian"].includes(t.id)?"#242431":"#dedbd4") : "#ece9e0"),
    appearance:t.id==="liquidmetal" ? "dark" : uploadedDirection ? (["afterhours","signal","orbit","monologue","nocturne","nightgrid","signaldeck","obsidian"].includes(t.id)?"dark":"light") : (["afterhours","nocturne","terminal","brutalist","arcade"].includes(t.id)?"dark":"light"),
    sections:kit.sections
  },content};
}
export function customerOrder(o) {
  return {
    id: o.id,
    created_at: o.created_at,
    status:
      {
        received: "Order received",
        payment_verified: "Payment confirmed",
        generating: "Website in preparation",
        awaiting_review: "Quality review",
        revisions_required: "Quality review",
        approved: "Quality review",
        publishing: "Quality review",
        published: "Website ready",
        delivered: "Website delivered",
        generation_failed: "Website in preparation",
        publication_failed: "Quality review",
      }[o.status] || "Order received",
    payment: o.payment,
    package: o.package_snapshot,
    public_url: o.public_version ? `/sites/${o.slug}` : null,
  };
}
export function assertOwner(user, owner) {
  if (!owner || user?.id !== owner || !user.email_confirmed_at)
    throw Object.assign(new Error("Owner access required."), { status: 403 });
}

