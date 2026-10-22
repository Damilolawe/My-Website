import { cp, mkdir, rm } from "node:fs/promises";
const files = [
  "index.html",
  "404.html",
  "styles.css",
  "studio.css",
  "case-studies.css",
  "script.js",
  "showcase.js",
  "showcase.css",
  "cinema.css",
  "cinema.js",
  "sculpture.js",
  "case-studies.js",
  "config.js",
  "favicon.svg",
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
      appearance: t.id === "afterhours" ? "dark" : "light",
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
    const purposeful = {...config,type,content:sampleForTemplate(t.id,type).content,
      design:{...config.design,sections:sampleForTemplate(t.id,type).design.sections}};
    await writeFile(dir + "/" + t.id + ".html",renderSite(purposeful,{sample:true}));
    await writeFile(dir + "/" + t.id + "--still.html",renderSite({
      ...purposeful,design:{...purposeful.design,animation:"none"}
    },{sample:true}));
  }
}
console.log(
  "Built Netlify public assets in dist/. Server functions remain outside public output.",
);
