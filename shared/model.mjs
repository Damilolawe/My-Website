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
      secondary: /^#[0-9a-f]{6}$/i.test(d.secondary) ? d.secondary : "#ece9e0",
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
    services:[{title:"Brand refresh",description:"A sample service for emerging businesses.",url:""},{title:"Creative consultation",description:"An example project-planning offering.",url:""}]}
};
export function sampleForTemplate(id){
  const type={index:"Student résumé",folio:"Creative portfolio",still:"Personal brand",afterhours:"Actor / model",signal:"Creative portfolio",daylight:"Small business"}[id]||"Professional portfolio";
  const example=demoIdentities[id]||demoIdentities.index;
  return {type,template:id,design:{animation:"expressive",appearance:id==="afterhours"?"dark":"light",sections},
    content:{...sample.content,...example, cards:example.projects||sample.content.cards,
      projects:"",services:example.services||sample.content.services,testimonials:[]}};
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
