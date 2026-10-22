import { unzipSync, strFromU8 } from "fflate";
import { inflateSync } from "node:zlib";

/* Extract only text that actually occurs in the supplied document.
   No OCR, AI, qualifications inference, file retention, or public publishing. */
const xmlText = (s) => String(s).replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (full, entity) => {
  if (entity[0] === "#") {
    const hex = entity[1]?.toLowerCase() === "x";
    const n = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
    return n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : " ";
  }
  return {amp:"&",lt:"<",gt:">",quot:'"',apos:"'"}[entity.toLowerCase()] || full;
});
function extractDocx(bytes) {
  let zip;
  try { zip = unzipSync(new Uint8Array(bytes), { filter: (f) => f.name === "word/document.xml" }); }
  catch { throw Error("This DOCX cannot be read. Upload a valid .docx file."); }
  const file = zip["word/document.xml"];
  if (!file || file.length > 1000000) throw Error("DOCX main document is unavailable or too large.");
  const xml = strFromU8(file);
  const paragraphs = [];
  for (const match of xml.matchAll(/<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g)) {
    const p = match[1];
    const pieces = [];
    for (const tag of p.matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:tab(?:\s[^>]*)?\/>|<w:br(?:\s[^>]*)?\/>/g)) {
      pieces.push(tag[1] === undefined ? " " : xmlText(tag[1]));
    }
    const value = pieces.join("").replace(/\s+/g," ").trim();
    if (value) paragraphs.push(value);
    if (paragraphs.length >= 450) break;
  }
  return paragraphs.join("\n");
}
function pdfUnescape(s) {
  return s.replace(/\\([0-7]{1,3}|[nrtbf()\\])/g, (_, esc) => /^[0-7]/.test(esc)
    ? String.fromCharCode(Number.parseInt(esc, 8))
    : ({n:"\n",r:"\n",t:" ",b:" ",f:" ","(":"(",")":")","\\":"\\"}[esc] || ""));
}
function fromPDFOperators(s) {
  const lines = [];
  // Preserve text objects only: metadata and compressed fonts must not be mistaken for résumé text.
  for (const bt of s.matchAll(/\bBT\b([\s\S]*?)\bET\b/g)) {
    const region = bt[1], strings = [];
    for (const m of region.matchAll(/\(((?:\\.|[^\\)])*)\)\s*Tj\b|\[\s*((?:(?:\((?:\\.|[^\\)])*\)|-?\d+(?:\.\d+)?|\s)*)?)\s*\]\s*TJ\b|<([0-9a-fA-F]+)>\s*Tj\b/g)) {
      if (m[1] !== undefined) strings.push(pdfUnescape(m[1]));
      if (m[2] !== undefined) {
        const pieces = [];
        for (const q of m[2].matchAll(/\(((?:\\.|[^\\)])*)\)/g)) pieces.push(pdfUnescape(q[1]));
        strings.push(pieces.join(""));
      }
      if (m[3]) {
        const h = m[3], codes = h.match(/.{2}/g) || [];
        const decoded = codes.map(n=>String.fromCharCode(parseInt(n,16))).join("");
        strings.push(decoded.replace(/\0/g,""));
      }
    }
    const value = strings.join(" ").replace(/\s+/g," ").trim();
    if (value) lines.push(value);
    if (lines.length >= 400) break;
  }
  return lines.join("\n");
}
function extractPDF(bytes) {
  if (bytes.subarray(0,5).toString() !== "%PDF-") throw Error("Invalid PDF document.");
  let text = "";
  const raw = bytes.toString("latin1");
  text += fromPDFOperators(raw) + "\n";
  // Best effort: many machine-generated PDFs compress page content with FlateDecode.
  const streams = [...raw.matchAll(/stream\r?\n/g)].slice(0,150);
  for (const stream of streams) {
    const start = stream.index + stream[0].length;
    const dict = raw.slice(Math.max(0,stream.index-500),stream.index);
    if (!/\/FlateDecode\b/.test(dict)) continue;
    const stop = raw.indexOf("endstream",start);
    if (stop === -1 || stop - start > 3000000) continue;
    const end = (raw[stop-2] === "\r" ? stop-2 : raw[stop-1] === "\n" || raw[stop-1] === "\r" ? stop-1 : stop);
    try {
      const inflated = inflateSync(bytes.subarray(start,end), { maxOutputLength: 1250000 });
      text += fromPDFOperators(inflated.toString("latin1")) + "\n";
    } catch { /* Unsupported stream; never invent text. */ }
    if (text.length > 45000) break;
  }
  return text.trim();
}
const headings = [
  ["education",/^(?:education|academic background|qualifications|certifications)$/i],
  ["experience",/^(?:work experience|professional experience|employment|experience|work history|career history)$/i],
  ["skills",/^(?:technical skills|skills|core competencies|technologies|tools)$/i],
  ["projects",/^(?:projects|selected work|portfolio|project experience|publications)$/i],
  ["bio",/^(?:professional summary|summary|profile|about me|objective)$/i],
];
export function suggestionsFromText(value) {
  const text = String(value || "").slice(0,50000).replace(/\0/g,"");
  const lines = text.split(/[\r\n]+/).map(s=>s.replace(/\s+/g," ").trim()).filter(Boolean).slice(0,450);
  if (!lines.length) throw Error("No readable text found. Scanned PDFs need OCR; use an editable DOCX or type the information manually.");
  const buckets = {education:[],experience:[],skills:[],projects:[],bio:[]};
  let area = null;
  const preamble = [];
  for (const line of lines) {
    const match = headings.find(([_,rx])=>rx.test(line.replace(/:$/,"")));
    if (match) { area = match[0]; continue; }
    if (!area) preamble.push(line);
    else buckets[area].push(line);
  }
  const name = preamble.find(s => !/^(resume|curriculum vitae|cv|portfolio)$/i.test(s) && !/@|https?:|www\.|\d{3}[\s().-]?\d{3}/.test(s) && s.split(" ").length <= 5 && s.length <= 80) || "";
  const headline = preamble.find(s => s!==name && s.length>5 && s.length<140 && !/@|https?:|www\./.test(s) && !/\d{3}[\s().-]?\d{3}/.test(s)) || "";
  const joined = (list,max) => list.join("\n").slice(0,max);
  const proposed = {
    name:name.slice(0,100), headline:headline.slice(0,160),
    bio:joined(buckets.bio,3000),
    education:joined(buckets.education,3000),
    experience:joined(buckets.experience,3000),
    skills:joined(buckets.skills,1500),
    projects:joined(buckets.projects,5000)
  };
  const warnings = [];
  if (!Object.values(proposed).some(Boolean)) warnings.push("No reliable fields were found. Please enter the information manually.");
  if (!buckets.education.length && !buckets.experience.length) warnings.push("Section headings were not recognized; manually review the source document.");
  warnings.push("Only suggestions are shown. Review and verify every detail before applying. Contact details are never auto-published.");
  return { fields:proposed, warnings, extractedCharacters:text.length, mode:"review-required" };
}
export function previewResume(bytes, mime) {
  if (!Buffer.isBuffer(bytes) || bytes.length > 4194304) throw Error("Invalid résumé upload.");
  let text;
  if (mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") text=extractDocx(bytes);
  else if (mime === "application/pdf") text=extractPDF(bytes);
  else throw Error("Only PDF and DOCX résumés can be analyzed.");
  return suggestionsFromText(text);
}
