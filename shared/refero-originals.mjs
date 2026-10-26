// Only the five uploaded-MD-derived additions remain from the previous speculative 19.
// Fourteen unbacked concepts are retired; source documents are kept outside the public build.
export const originalDirections=[
  {
    "id": "nightgrid",
    "name": "Night Grid",
    "style": "Obsidian terminal cockpit",
    "tag": "Make every command count.",
    "color": "#cbb0f7",
    "recommended": [
      "Professional portfolio",
      "Student résumé",
      "Creative portfolio"
    ],
    "tier": "starter",
    "reference": "Warp",
    "character": "terminal cockpit",
    "referenceUrl": "https://styles.refero.design/style/d4c51049-58eb-404a-9fcb-f195928b1c99"
  },
  {
    "id": "couture",
    "name": "Couture Notes",
    "style": "Cream couture editorial",
    "tag": "A collection in every detail.",
    "color": "#000000",
    "recommended": [
      "Actor / model",
      "Creative portfolio",
      "Small business"
    ],
    "tier": "starter",
    "reference": "Adam Lippes",
    "character": "couture lookbook",
    "referenceUrl": "https://styles.refero.design/style/cdc4a162-cefa-49a1-81e7-4857e421ae24"
  },
  {
    "id": "signaldeck",
    "name": "Signal Deck",
    "style": "Dark command key workspace",
    "tag": "Something extraordinary, on command.",
    "color": "#ff6363",
    "recommended": [
      "Professional portfolio",
      "Creative portfolio",
      "Small business"
    ],
    "tier": "starter",
    "reference": "Raycast",
    "character": "command keys",
    "referenceUrl": "https://styles.refero.design/style/3b6a17f0-3bdf-418c-a95e-0b89e5a8b2f8"
  },
  {
    "id": "obsidian",
    "name": "Obsidian Film",
    "style": "Warm darkroom reveal",
    "tag": "A world beyond the obvious.",
    "color": "#dc5000",
    "recommended": [
      "Creative portfolio",
      "Actor / model",
      "Small business"
    ],
    "tier": "starter",
    "reference": "ORYZO AI",
    "character": "darkroom object",
    "referenceUrl": "https://styles.refero.design/style/1f204e95-454a-437e-845b-c1b169d35607"
  },
  {
    "id": "highlighter",
    "name": "Highlighter",
    "style": "Financial highlighter editorial",
    "tag": "Make the important unmistakable.",
    "color": "#e4f222",
    "recommended": [
      "Professional portfolio",
      "Small business",
      "Personal brand"
    ],
    "tier": "starter",
    "reference": "Ramp",
    "character": "finance editorial",
    "referenceUrl": "https://styles.refero.design/style/b38702a0-75ab-474c-9106-00b624535825"
  }
];
export const directionFor=id=>originalDirections.find(d=>d.id===id)||null;
