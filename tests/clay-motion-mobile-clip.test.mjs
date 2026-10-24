import test from "node:test";
import assert from "node:assert/strict";
import {trioMotionCSS} from "../shared/voltagent-trio-motion.mjs";
import {renderSite} from "../shared/render.mjs";
import {sampleForTemplate} from "../shared/model.mjs";
test("animated Clay art clips to its own visual bounds instead of widening the mobile page",()=>{
 const css=trioMotionCSS("clay");
 assert(css.includes(".trio-clay .clay-world,.trio-clay .clay-closing{overflow:hidden;overflow:clip;max-width:100%}"));
 assert(css.includes("cl-spark"),"Motion must remain enabled, not removed");
 assert(css.includes("prefers-reduced-motion:reduce"));
 const html=renderSite(sampleForTemplate("clay"),{sample:true});
 assert(html.includes("overflow:clip;max-width:100%"));
 assert(html.includes("clay-spark s1"));
});
