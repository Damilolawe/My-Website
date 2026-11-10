import { mkdir, writeFile } from "node:fs/promises";
import { sampleForTemplate } from "../shared/model.mjs";
import { templatePageCount } from "../shared/tiers.mjs";
import { renderShowpiece, showpieceIds, showpiecePages } from "../shared/showpiece/index.mjs";

await mkdir("dist/showpiece", { recursive: true });
let count = 0;
for (const id of showpieceIds) {
  const v = sampleForTemplate(id);
  if (templatePageCount(id) === 5) {
    await mkdir(`dist/showpiece/${id}`, { recursive: true });
    for (const page of showpiecePages) {
      await writeFile(`dist/showpiece/${id}/${page}.html`, renderShowpiece(id, v, { sample: true, multipage: true, page, href: p => `./${p}.html` }));
      count++;
    }
  } else {
    await writeFile(`dist/showpiece/${id}.html`, renderShowpiece(id, v, { sample: true }));
    count++;
  }
}
console.log(`Showpiece previews: ${showpieceIds.length} designs, ${count} pages`);
