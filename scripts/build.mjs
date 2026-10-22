import { cp, mkdir, rm } from "node:fs/promises";
const files = [
  "index.html",
  "404.html",
  "styles.css",
  "studio.css",
  "case-studies.css",
  "script.js",
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
];
await rm("dist", { recursive: true, force: true });
await mkdir("dist");
for (const file of files) await cp(file, "dist/" + file, { recursive: true });
await mkdir("dist/templates", { recursive: true });
const { templates, sample } = await import("../shared/model.mjs");
const { renderSite } = await import("../shared/render.mjs");
const { writeFile } = await import("node:fs/promises");
for (const t of templates)
  await writeFile(
    `dist/templates/${t.id}.html`,
    renderSite(
      {
        ...sample,
        template: t.id,
        design: {
          primary: t.color,
          appearance: t.id === "afterhours" ? "dark" : "light",
          font: t.id === "folio" ? "serif" : "sans",
          layout: ["index", "afterhours", "signal"].includes(t.id)
            ? "split"
            : "stacked",
        },
      },
      { sample: true },
    ),
  );
console.log(
  "Built Netlify public assets in dist/. Server functions remain outside public output.",
);
