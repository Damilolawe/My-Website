import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");

test("homepage contact actions have a responsive gap rather than touching inline",async()=>{
 const [html,css,js]=await Promise.all(["index.html","styles.css","script.js"].map(read));
 const start=html.indexOf('<div class="contact-actions"');
 const end=html.indexOf('</div>',start);
 assert(start>=0 && end>start,"Contact actions should have a shared wrapping container");
 const actions=html.slice(start,end);
 assert(actions.includes('href="/contact.html">SEND A PROJECT INQUIRY'));
 assert(actions.includes('id="direct-contact" class="contact-github" hidden'));
 assert.match(css,/\.contact-main \.contact-actions\s*\{[^}]*display:flex;[^}]*flex-wrap:wrap;[^}]*gap:20px 24px;/);
 assert.match(css,/\.contact-main \.contact-actions \.contact-github\s*\{[^}]*margin:0;/);
 assert.match(css,/@media\(max-width:700px\)\s*\{[^]*?\.contact-main \.contact-actions\{gap:14px;/);
 assert(js.includes("'#direct-contact'"),"Existing email-link behavior must still be hooked up");
});
