import { cp, mkdir, rm, readFile } from "node:fs/promises";
const files = [
  "index.html",
  "404.html",
  "styles.css",
  "studio.css",
  "case-studies.css",
  "brianna-case.css",
  "brianna-case.js",
  "script.js",
  "motion-bootstrap.js",
  "showcase.js",
  "showcase.css",
  "cinema.css",
  "cinema.js",
  "universe.css",
  "universe.js",
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
const {zipDesignFor,zipPages}=await import("../shared/zip-design-catalog.mjs");
const {renderZipDesign}=await import("../shared/zip-design-render.mjs");
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
  if(zipDesignFor(t.id)?.multipage){
    const folder="dist/templates/"+t.id;await mkdir(folder,{recursive:true});
    for(const page of zipPages)await writeFile(folder+"/"+page+".html",renderZipDesign(config,{sample:true},page));
  }
  // A separate, accessible still version lets the studio's Pause Motion control
  // disable motion inside sandboxed demos without weakening iframe isolation.
  await writeFile(`dist/templates/${t.id}--still.html`, renderSite({
    ...config, design: { ...config.design, animation: "none" },
  }, { sample: true }));
  // New studies have one canonical demo and, for Signature, five linked pages.
  // Only the original 42 require backwards-compatible purpose-specific aliases.
  if (zipDesignFor(t.id)) continue;
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

// Build and cache authentic image previews from the rendered, motion-free pages.
const { generateTemplateThumbnails } = await import("./generate-template-thumbnails.mjs");
await generateTemplateThumbnails();

// Public release identity contains no credentials or customer information.
await writeFile("dist/release.json", JSON.stringify({
  commit: process.env.GITHUB_SHA || null,
  buildRun: process.env.GITHUB_RUN_ID || null,
  builtAt: new Date().toISOString(),
}, null, 2) + "\n");

// Keep the authored CSS cascade, but avoid eight separate render-blocking
// stylesheet requests on the public homepage. All CSS asset URLs are absolute.
const homePath = "dist/index.html";
let homeHTML = await readFile(homePath, "utf8");
const localStyles = [...homeHTML.matchAll(/<link rel="stylesheet" href="(\/?[^"\s]+\.css)">/g)];
const homeCSS = [];
for (const [tag, href] of localStyles) {
  homeCSS.push(await readFile(href.replace(/^\//, ""), "utf8"));
  homeHTML = homeHTML.replace(tag, homeCSS.length === 1
    ? '<link rel="stylesheet" href="/assets/home-bundle.css">' : '');
}
await writeFile("dist/assets/home-bundle.css", homeCSS.join("\n"));
await writeFile(homePath, homeHTML);
