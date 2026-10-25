import { cp, mkdir, rm } from "node:fs/promises";
const files = [
  "index.html",
  "404.html",
  "styles.css",
  "studio.css",
  "case-studies.css",
  "script.js",
  "motion-bootstrap.js",
  "showcase.js",
  "showcase.css",
  "cinema.css",
  "cinema.js",
  "awe-relaunch.css",
  "hero-layout-fix.css",
  "studio-reimagined.css",
  "why-awe.html",
  "why-awe.css",
  "why-awe.js",
  "awe-relaunch.js",
  "sculpture.js",
  "case-studies.js",
  "config.js",
  "favicon.svg",
  "favicon.ico",
  "_headers",
  "robots.txt",
  "assets",
  "vendor",
  "demos",
  "app",
  "shared",
  "order.html",
  "account.html",
  "admin.html",
  "privacy.html",
  "contact.html",
  "contact.js",
  "inquiry-received.html",
  "site-viewer.html",
  "site-viewer.js",
];
await rm("dist", { recursive: true, force: true });
await mkdir("dist");
for (const file of files) await cp(file, "dist/" + file, { recursive: true });
await mkdir("dist/templates", { recursive: true });
const { templates, types, typeSlugs, sampleForTemplate } = await import("../shared/model.mjs");
const { renderSite } = await import("../shared/render.mjs");
const { writeFile } = await import("node:fs/promises");
for (const t of templates) {
  const demo = sampleForTemplate(t.id);
  const config = {
    ...demo,
    template: t.id,
    design: {
      ...demo.design,
      primary: t.color,
      secondary: t.id === "arcade" ? "#11120f" : demo.design.secondary,
      appearance: ["afterhours", "arcade"].includes(t.id) ? "dark" : "light",
      font: t.id === "folio" ? "serif" : "sans",
      layout: ["index", "afterhours", "signal"].includes(t.id) ? "split" : "stacked",
    },
  };
  await writeFile(`dist/templates/${t.id}.html`, renderSite(config, { sample: true }));
  // A separate, accessible still version lets the studio's Pause Motion control
  // disable motion inside sandboxed demos without weakening iframe isolation.
  await writeFile(`dist/templates/${t.id}--still.html`, renderSite({
    ...config, design: { ...config.design, animation: "none" },
  }, { sample: true }));
  for (const type of types) {
    const dir = "dist/templates/" + typeSlugs[type];
    await mkdir(dir, {recursive:true});
    // Legacy purpose-specific URLs remain live as compatibility aliases, but
    // all of them display the SAME source-authored design. No fake resumes,
    // businesses, or category-dependent layout rewrites.
    await writeFile(dir + "/" + t.id + ".html",renderSite(config,{sample:true}));
    await writeFile(dir + "/" + t.id + "--still.html",renderSite({
      ...config,design:{...config.design,animation:"none"}
    },{sample:true}));
  }
}
console.log(
  "Built Firebase public assets in dist/. Supabase functions remain outside public output.",
);


// Keep the existing RunwayML template untouched; build separate linked HTML pages
// only for the reversible preview experiment.
const { buildRunwayMultipage } = await import("./runwayml-multipage.mjs");
await buildRunwayMultipage("dist");

// Public release identity contains no credentials or customer information.
await writeFile("dist/release.json", JSON.stringify({
  commit: process.env.GITHUB_SHA || null,
  buildRun: process.env.GITHUB_RUN_ID || null,
  builtAt: new Date().toISOString(),
}, null, 2) + "\n");
