import { renderShowpieceDesign } from "./kit.mjs";
import altitude from "./designs/altitude.mjs";
import stall from "./designs/stall.mjs";
import ticker from "./designs/ticker.mjs";
import signal from "./designs/signal.mjs";
import storybook from "./designs/storybook.mjs";
import launch from "./designs/launch.mjs";

const DESIGNS = [altitude, stall, ticker, signal, storybook, launch];
export const showpieceDesigns = Object.freeze(Object.fromEntries(DESIGNS.map(d => [d.id, d])));
export const showpieceIds = Object.keys(showpieceDesigns);
export const showpiecePages = ["home", "work", "features", "studio", "contact"];

export function renderShowpiece(id, v, options = {}) {
  const design = showpieceDesigns[id];
  return design ? renderShowpieceDesign(design, v, options) : null;
}
