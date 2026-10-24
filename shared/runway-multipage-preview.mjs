import {renderRunwayML} from "./runwayml.mjs";
// This renderer is a Preview Only entry. Customer checkout is blocked until
// customer-specific multi-file publishing can be approved and deployed safely.
const ROOT="/experiments/runwayml-multipage/";
export function renderRunwayMultiPreview(value, options={}) {
  let html=renderRunwayML(value,options);
  if(!options.sample) return html; // never embed another customer's or demo URLs in a published site
  const routes={research:"research.html",work:"work.html",studio:"studio.html",journal:"journal.html"};
  for(const [section,file] of Object.entries(routes))
    html=html.replaceAll('href="#'+section+'"','href="'+ROOT+file+'"');
  html=html.replaceAll('href="#main"','href="'+ROOT+'"');
  html=html.replaceAll('href="#contact"','href="'+ROOT+'studio.html#contact"');
  html=html.replace('</footer>','<p class="rw-demo-note rw-inner">FIVE-PAGE SIGNATURE PREVIEW · <a href="'+ROOT+'" target="_blank" rel="noopener">EXPLORE ALL PAGES ↗︎</a></p></footer>');
  return html;
}
