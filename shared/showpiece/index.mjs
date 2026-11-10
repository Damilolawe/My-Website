import { renderShowpieceDesign } from "./kit.mjs";
import altitude from "./designs/altitude.mjs";
import stall from "./designs/stall.mjs";
import ticker from "./designs/ticker.mjs";
import signal from "./designs/signal.mjs";
import storybook from "./designs/storybook.mjs";
import launch from "./designs/launch.mjs";
import coachline from "./designs/coachline.mjs";
import postcard from "./designs/postcard.mjs";
import pitlane from "./designs/pitlane.mjs";
import roadtrip from "./designs/roadtrip.mjs";
import letterpress from "./designs/letterpress.mjs";
import dayplanner from "./designs/dayplanner.mjs";
import vault from "./designs/vault.mjs";
import kanban from "./designs/kanban.mjs";

const DESIGNS = [altitude, stall, ticker, signal, storybook, launch, coachline, postcard, pitlane, roadtrip, letterpress, dayplanner, vault, kanban];
export const showpieceDesigns = Object.freeze(Object.fromEntries(DESIGNS.map(d => [d.id, d])));
export const showpieceIds = Object.keys(showpieceDesigns);
export const showpiecePages = ["home", "work", "features", "studio", "contact"];

export function renderShowpiece(id, v, options = {}) {
  const design = showpieceDesigns[id];
  return design ? renderShowpieceDesign(design, v, options) : null;
}
