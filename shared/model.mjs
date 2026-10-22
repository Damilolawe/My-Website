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
