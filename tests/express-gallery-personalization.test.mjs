import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const read = file => readFile(new URL("../" + file,import.meta.url),"utf8");

test("template selection clearly explains that designs can become individual websites", async()=>{
 const [app,styles] = await Promise.all([read("app/order.mjs"),read("app/express-gallery.css")]);
 const heading = 'id="express-gallery-title"';
 const panel = 'class="express-personalization-note"';
 const search = 'id="worlds-search"';
 const headAt = app.indexOf(heading);
 const noteAt = app.indexOf(panel);
 const searchAt = app.indexOf(search);
 assert(headAt >= 0 && noteAt > headAt && searchAt > noteAt,
  "Customization reassurance belongs inside the design gallery, before choosing a design");
 assert.equal(app.split(panel).length-1,1,"Do not repeat the reassurance throughout the flow");
 assert(app.includes('id="express-personalization-title">Made to be yours.</h4>'));
 assert(app.includes("These aren&#39;t one-size-fits-all websites."));
 assert(app.includes("Each design can be transformed to reflect your personality, your business, and your vision."));
 assert(app.includes("Think of these previews as inspiration for what&#39;s possible."));
 assert(styles.includes(".app-main .express-personalization-note{"));
 assert(styles.includes(".app-main .express-personalization-note h4{"));
 assert(styles.includes(".app-main .express-personalization-note p{"));
 assert(styles.includes("@media(max-width:700px)"),"Mobile gallery reassurance must be responsive");
 assert(styles.includes("grid-template-columns:minmax(0,1fr)"),"Mobile reassurance must use a single column");
});

test("template selection page respects quote-only Premium and unmodified Starter and Signature prices",async()=>{
 const html=await read("order.html");
 assert(html.includes("One page $75 · Multi-page $150 · Premium / AWE Custom: Custom Quote."));
 assert(!html.includes("$250+"),"Premium starting price should not return");
 assert(html.includes('id="app"'),"Existing tier selector must remain mounted");
});
