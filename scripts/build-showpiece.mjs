import { mkdir, writeFile } from "node:fs/promises";
import { sampleForTemplate } from "../shared/model.mjs";
import { renderShowpiece, showpieceIds } from "../shared/showpiece.mjs";

await mkdir("dist/showpiece", { recursive: true });
for (const id of showpieceIds) {
  await writeFile(`dist/showpiece/${id}.html`, renderShowpiece(id, sampleForTemplate(id), { sample: true }));
}
console.log(`Showpiece previews: ${showpieceIds.length}`);
