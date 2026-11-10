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
import editor from "./designs/editor.mjs";
import canvas from "./designs/canvas.mjs";
import blueprint from "./designs/blueprint.mjs";
import chatline from "./designs/chatline.mjs";
import sunroom from "./designs/sunroom.mjs";
import cardflip from "./designs/cardflip.mjs";
import aurora from "./designs/aurora.mjs";
import orbitclub from "./designs/orbitclub.mjs";
import greenhouse from "./designs/greenhouse.mjs";
import stickies from "./designs/stickies.mjs";
import notebook from "./designs/notebook.mjs";
import wireframe from "./designs/wireframe.mjs";
import colonnade from "./designs/colonnade.mjs";
import cabinet from "./designs/cabinet.mjs";
import funnel from "./designs/funnel.mjs";
import corkboard from "./designs/corkboard.mjs";

const DESIGNS = [altitude, stall, ticker, signal, storybook, launch, coachline, postcard, pitlane, roadtrip, letterpress, dayplanner, vault, kanban, editor, canvas, blueprint, chatline, sunroom, cardflip, aurora, orbitclub, greenhouse, stickies, notebook, wireframe, colonnade, cabinet, funnel, corkboard];
export const showpieceDesigns = Object.freeze(Object.fromEntries(DESIGNS.map(d => [d.id, d])));
export const showpieceIds = Object.keys(showpieceDesigns);
export const showpiecePages = ["home", "work", "features", "studio", "contact"];

export function renderShowpiece(id, v, options = {}) {
  const design = showpieceDesigns[id];
  return design ? renderShowpieceDesign(design, v, options) : null;
}
