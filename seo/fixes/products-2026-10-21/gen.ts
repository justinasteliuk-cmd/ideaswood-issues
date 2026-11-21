#!/usr/bin/env bun
/**
 * Builds a unique description for each thin or copied non-Divi product on ideaswood.eu, and a meta
 * description for every target (including Divi-built products, whose body is a layout and is not touched).
 * Only the product's own attributes, categories and existing text are used. See PLAN.md.
 *
 *   bun gen.ts <all.json> <out-dir>
 * writes <out-dir>/generated.json and <out-dir>/preview.html
 */
import { mkdirSync } from "node:fs";

const [allPath, outDir] = process.argv.slice(2);
const all = JSON.parse(await Bun.file(allPath).text()) as Record<string, any[]>;
const eu = all["https://ideaswood.eu"];

// ---------- text helpers ----------
const strip = (h: string) => (h || "").replace(/\[\/?et_pb_[^\]]*\]/g, " ").replace(/<[^>]+>/g, " ").replace(/&#8211;/g, "–").replace(/&#215;/g, "×").replace(/&#822[01];/g, '"').replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ").trim();
const words = (t: string) => t.split(/\s+/).filter(Boolean).length;
const grams = (t: string, n = 8) => { const w = t.toLowerCase().split(/\s+/); const s = new Set<string>(); for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(" ")); return s; };
const overlap = (a: Set<string>, b: Set<string>) => { if (!a.size) return 0; let k = 0; a.forEach(x => { if (b.has(x)) k++; }); return k / a.size; };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clean = (s: string) => s.replace(/&#8211;/g, "–").replace(/&#215;/g, "×").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const num = (s: string | undefined) => { const m = String(s ?? "").replace(",", ".").match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : NaN; };
const fmt = (n: number) => Number.isInteger(n) ? String(n) : String(+n.toFixed(2));
const dims = (s: string | undefined) => { const m = String(s ?? "").replace(/,/g, ".").match(/(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)/i); return m ? [parseFloat(m[1]), parseFloat(m[2])] : null; };
const an = (w: string) => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;
const seedOf = (id: number) => { let x = (id * 2654435761) % 4294967296; return (i: number) => { x = (x * 1103515245 + 12345 + i * 7919) % 2147483648; return x; }; };
const pick = <T,>(rnd: (i: number) => number, i: number, v: T[]) => v[rnd(i) % v.length];

// ---------- facts ----------
type Facts = Record<string, { v: string; multi: boolean }>;
function facts(p: any): Facts {
  const f: Facts = {};
  for (const a of p.attrs || []) {
    const terms = (a.terms || []).map((t: any) => clean(t.name)).filter((v: string) => v && !/^[\s?–-]*$/.test(v) && v !== "0" && v !== "0.0");
    if (terms.length) f[a.name] = { v: terms.join(", "), multi: terms.length > 1 };
  }
  return f;
}
const one = (f: Facts, ...keys: string[]) => { for (const k of keys) if (f[k] && !f[k].multi) return f[k].v; return undefined; };
const any = (f: Facts, ...keys: string[]) => { for (const k of keys) if (f[k]) return f[k].v; return undefined; };

// ---------- classification ----------
const isDivi = (p: any) => /\[et_pb_|et_pb_section/.test((p.desc || "") + (p.short || ""));
const otherSites = Object.entries(all).filter(([s]) => s !== "https://ideaswood.eu").flatMap(([s, ps]) => ps.map(p => ({ k: s.replace("https://", "") + "/" + p.slug, g: grams(strip(p.desc + " " + p.short)) })));
const euDocs = eu.map(p => ({ id: p.id, g: grams(strip(p.desc + " " + p.short)) }));
function classify(p: any) {
  const text = strip(p.desc + " " + p.short); const g = grams(text); const w = words(text);
  let best = 0, bw = "";
  for (const o of euDocs) { if (o.id === p.id) continue; const r = overlap(g, o.g); if (r > best) { best = r; bw = "ideaswood.eu/" + eu.find(x => x.id === o.id).slug; } }
  for (const o of otherSites) { const r = overlap(g, o.g); if (r > best) { best = r; bw = o.k; } }
  return { words: w, overlap: best, with: bw, cls: w < 60 ? "thin" : best >= 0.5 ? "copied" : "ok" };
}

function typeOf(p: any): string {
  const c: string[] = p.cats, n = p.name.toLowerCase();
  const has = (...s: string[]) => s.some(x => c.includes(x));
  if (has("sauna", "outdoor-sauna", "indoor-sauna", "sauna-cabins", "barrels-sauna", "sauna-pods", "standard-sauna")) return "sauna";
  if (has("hot-tubs", "external-heater", "firewood-heaters", "square-hot-tubs")) return /heater|stove/i.test(n) && !/tub/i.test(n) ? "heater" : "hottub";
  if (has("grill-sets")) return "grillset";
  if (has("bbq-grill-cabin")) return /cabin/i.test(n) ? "grillcabin" : "grillset";
  if (has("furniture", "garden-furniture")) return "furniture";
  if (has("thermowood", "cladding", "decking", "battens")) return "thermowood";
  if (/carport/i.test(n) && !/garage/i.test(n)) return "carport";
  if (/stable/i.test(n)) return "stable";
  if (/kiosk/i.test(n)) return "kiosk";
  if (has("pergola", "wooden-pergola", "aluminum-pergola", "pergolas-cabins")) return "pergola";
  if (has("camping-pods")) return "pod";
  if (has("a-frames")) return "aframe";
  if (has("garages-carports")) return /carport/i.test(n) && !/garage/i.test(n) ? "carport" : "garage";
  if (has("sheds-storage-cabins")) return "shed";
  if (has("summer-houses-chalets")) return "summer";
  if (has("insulated-wooden-houses")) return "insulated";
  if (has("villas-country-houses")) return "house";
  if (has("home-offices-studios")) return "office";
  if (has("stables-and-kiosks")) return "kiosk";
  if (has("garden-cabins", "new-2026")) return "cabin";
  // no usable category: decide from the name only when it is unambiguous
  if (/garage/i.test(n)) return "garage"; if (/pergola/i.test(n)) return "pergola"; if (/sauna/i.test(n)) return "sauna";
  return "uncategorised";
}
const BUILDING = new Set(["cabin", "office", "summer", "shed", "garage", "carport", "house", "insulated", "aframe", "pod", "grillcabin", "stable", "kiosk", "uncategorised"]);

const TYPE_NAME: Record<string, string[]> = {
  cabin: ["garden cabin", "garden log cabin", "log cabin"], office: ["garden office", "garden studio", "garden office cabin"],
  summer: ["summer house", "wooden summer house", "chalet-style summer house"], shed: ["garden shed", "storage shed", "wooden storage cabin"],
  garage: ["wooden garage", "timber garage", "log garage"], carport: ["wooden carport", "timber carport", "carport"],
  house: ["log house", "wooden house", "residential log house"], insulated: ["insulated wooden house", "insulated log house", "year-round wooden house"],
  stable: ["timber stable", "wooden stable", "stable building"], kiosk: ["wooden kiosk", "timber kiosk", "garden kiosk"], aframe: ["A-frame cabin", "A-frame house", "A-frame"],
  pod: ["camping pod", "glamping pod", "timber camping pod"], sauna: ["sauna", "outdoor sauna", "wooden sauna"],
  hottub: ["hot tub", "wooden hot tub", "wood-fired hot tub"], heater: ["hot tub heater", "firewood heater", "hot tub stove"],
  grillcabin: ["grill cabin", "BBQ grill cabin", "barbecue cabin"], grillset: ["grill set", "BBQ grill", "grill"],
  furniture: ["garden furniture set", "outdoor furniture set", "wooden furniture set"],
  thermowood: ["thermowood profile", "thermally modified timber board", "thermowood board"],
  pergola: ["pergola", "garden pergola", "wooden pergola"], uncategorised: ["wooden building", "log building", "timber building"],
};
const USE: Record<string, string[]> = {
  cabin: ["a home office, hobby room or guest space", "a studio, gym or quiet place to work", "a garden room you can use most of the year with insulation and a heater"],
  office: ["a home office or studio in the garden", "a quiet workplace away from the house", "a desk, shelving and a small sofa"],
  summer: ["summer stays, family weekends and guests", "life in the garden from spring to autumn", "a second living space in the garden"],
  shed: ["tools, bikes, a mower and garden gear", "dry, locked storage for equipment", "firewood, tools and seasonal furniture"],
  garage: ["a car plus storage or a workshop", "a dry, locked place for a car", "a car, bikes and tools under one roof"],
  carport: ["a car sheltered from rain and sun", "covered parking next to the house", "a car and a sheltered entrance"],
  house: ["a family home or a holiday house, with insulation, heating and local approvals", "a holiday house or a home on a plot with planning permission", "a family home, once insulated, heated and approved"],
  insulated: ["year-round living, with the insulation kits that come with it", "a home or holiday house used in every season", "all-year living with the insulation included in the package"],
  stable: ["a horse or pony, with tack and feed storage", "small livestock and their equipment", "a stable with room for tack and hay"], kiosk: ["a sales kiosk, ticket booth or market stand", "a small shop or information point", "a garden bar or event kiosk"],
  aframe: ["a holiday let, guest house or lakeside retreat", "overnight stays with a high, bright room under the roof", "a guest cabin or a rental unit"],
  pod: ["campsites, farms and holiday parks", "glamping guests", "a rental pod that earns from the first season"],
  sauna: ["the garden, a holiday home or a small spa", "regular sauna evenings at home", "a wellness corner next to a hot tub"],
  hottub: ["the garden or a spa corner", "a soak after the sauna", "a terrace with a view"], heater: ["heating a wooden hot tub", "a hot tub without an electricity supply"],
  grillcabin: ["outdoor cooking and dining in any weather", "evenings around the fire with friends", "garden dining, holiday homes and glamping sites"],
  grillset: ["a grill cabin or a covered terrace", "cooking over a real fire", "outdoor cooking for a group"],
  furniture: ["a terrace or a cabin veranda", "outdoor meals and evenings", "a garden dining or lounge corner"],
  thermowood: ["cladding, decking or sauna interiors", "facades, terraces and saunas", "exterior timber that stays stable"],
  pergola: ["shade over a terrace or a path", "an outdoor dining corner", "a covered seating area in the garden"],
};

// ---------- sentences ----------
function build(p: any, f: Facts, t: string, rnd: (i: number) => number) {
  const name = clean(p.name);
  const tn = pick(rnd, 1, TYPE_NAME[t]);
  const intro: string[] = [], body: string[] = [], plan: string[] = [];
  const fp = one(f, "Building width x length (m)", "Building Size (Width x Length)", "Building Size (L x W)", "Size (L x W)", "Size") || one(f, "Base footprint (m)");
  const bf = dims(one(f, "Base footprint (m)"));
  const baseDim = bf ? `${fmt(bf[0])} × ${fmt(bf[1])} m` : "";
  const d = fp ? dims(fp) : null;
  const area = num(one(f, "Internal area (m²)"));
  const wall = num(one(f, "Wall Thickness", "Walls"));
  const rooms = one(f, "Number of rooms");
  const terr = num(one(f, "Terraces surface (m²)"));
  const ridge = num(one(f, "Building height to the top of the ridge (m)"));
  const side = num(one(f, "Side wall height (m)"));
  const dimTxt = d ? `${fmt(d[0])} × ${fmt(d[1])} m` : "";

  if (BUILDING.has(t)) {
    const areaTxt = !isNaN(area) ? `${fmt(area)} m² inside` : "";
    const wallTxt = !isNaN(wall) ? `${fmt(wall)} mm ${t === "aframe" ? "walls" : "log walls"}` : "";
    intro.push(pick(rnd, 3, [
      `${name} is ${an(tn)}${dimTxt ? ` of ${dimTxt}` : ""}${areaTxt ? ` with ${areaTxt}` : ""}${wallTxt ? `, built with ${wallTxt}` : ""}.`,
      `${dimTxt ? `At ${dimTxt}` : name}${areaTxt ? `, with ${areaTxt},` : ""} ${dimTxt ? name + " is" : "is"} ${an(tn)}${wallTxt ? ` with ${wallTxt}` : ""}.`,
      `${an(tn).replace(/^./, c => c.toUpperCase())}${wallTxt ? ` in ${wallTxt}` : ""}: ${name}${dimTxt ? ` measures ${dimTxt}` : ""}${areaTxt ? ` and gives you ${areaTxt}` : ""}.`,
    ]));
    if (t === "insulated" && /insulation/i.test(strip(p.short || ""))) intro.push(pick(rnd, 18, [`Floor, wall and roof insulation kits are part of the package, as listed above.`, `The package includes the insulation kits for floor, walls and roof.`]));
    if (USE[t]) intro.push(pick(rnd, 4, [`It suits ${pick(rnd, 2, USE[t])}.`, `Use it for ${pick(rnd, 2, USE[t])}.`, dimTxt ? `This size works well for ${pick(rnd, 2, USE[t])}.` : `It works well for ${pick(rnd, 2, USE[t])}.`]));
    if (rooms) body.push(pick(rnd, 5, [`The layout has ${rooms} room${/^1$/.test(rooms) ? "" : "s"}.`, `Inside there ${/^1$/.test(rooms) ? "is one room" : `are ${rooms} rooms`}.`, `${/^1$/.test(rooms) ? "One room" : `${rooms} rooms`} on the plan.`]));
    if (!isNaN(terr) && terr > 0) body.push(pick(rnd, 6, [`A terrace of ${fmt(terr)} m² is part of the design.`, `The plan includes a ${fmt(terr)} m² terrace.`, `You also get ${fmt(terr)} m² of terrace.`]));
    if (!isNaN(side) && !isNaN(ridge) && t !== "aframe" && side >= 1) body.push(pick(rnd, 7, [`Side walls are ${fmt(side)} m high and the ridge reaches ${fmt(ridge)} m.`, `Wall height is ${fmt(side)} m at the eaves and ${fmt(ridge)} m at the ridge.`, `The building stands ${fmt(ridge)} m to the ridge, with ${fmt(side)} m side walls.`]));
    else if (!isNaN(ridge)) body.push(`Height to the ridge: ${fmt(ridge)} m.`);
    const fl = num(one(f, "Floor boards thickness (mm)", "Floor Thickness")), rb = num(one(f, "Roof boards thickness (mm)", "Roof Boards"));
    if (!isNaN(fl) && !isNaN(rb)) body.push(pick(rnd, 8, [`Floor boards are ${fmt(fl)} mm and roof boards ${fmt(rb)} mm.`, `The kit comes with ${fmt(fl)} mm floor boards and ${fmt(rb)} mm roof boards.`, `Floor: ${fmt(fl)} mm boards. Roof: ${fmt(rb)} mm boards.`]));
    const gl = one(f, "Type of window and door glazing", "Glazing");
    if (gl && /glaz/i.test(gl)) body.push(pick(rnd, 9, [`Windows and doors are ${gl.toLowerCase()}.`, `Glazing: ${gl.toLowerCase()}.`]));
    const roof = any(f, "Roof", "Roof Type");
    if (roof && /shingle/i.test(roof)) body.push(pick(rnd, 10, [`The roof is finished with bitumen shingles.`, `Bitumen shingles cover the roof.`, `Roof covering: bitumen shingles.`]));
    else if (roof && /gable|flat|modern|pitch/i.test(roof)) body.push(`Roof type: ${roof.toLowerCase()}.`);
    if (f["Choose a set"]) body.push(pick(rnd, 12, [`It is sold as an Economic or a Premium set; both are listed on this page.`, `Choose the Economic or the Premium set above.`, `Two sets are available, Economic and Premium.`]));
    if (f["Shutters"]) body.push(`Shutters are included.`);
    const ct = one(f, "Construction Type"); if (ct && /frame|panel/i.test(ct)) body.push(`Construction: ${ct.toLowerCase()}.`);
    const ppl = one(f, "People"); if (ppl && t === "pod") body.push(`It sleeps ${ppl}.`); if (ppl && t === "grillcabin") body.push(`It seats ${ppl} people around the grill.`);
    const w = num(one(f, "Warranty (months)", "Warranty")); if (!isNaN(w)) body.push(`Warranty: ${fmt(w)} months.`);
    // planning, by size: small kits are a two-person job; houses are not
    const big = t === "house" || t === "aframe" || (!isNaN(area) && area > 40);
    const baseTxt = baseDim ? pick(rnd, 13, [`The base footprint is ${baseDim}: prepare a level base of at least that size, a concrete slab, paving slabs or ground screws.`, `Prepare a firm, level base for the ${baseDim} base footprint before the kit arrives (slab, paving or ground screws).`, `${name} stands on a ${baseDim} base footprint, which needs a firm, level base such as a slab, paving slabs or ground screws.`])
      : `It needs a firm, level base such as a concrete slab, paving slabs or ground screws.`;
    const E = `<a href="https://ideaswood.eu/easy-installation/">`;
    const asmTxt = big ? pick(rnd, 14, [`The ${name} kit arrives pre-cut and numbered with an assembly manual; a building of this size is a job for a builder or an experienced team.`, `Everything in ${name} is pre-cut and numbered, and the manual shows the order. For ${isNaN(area) ? "a building this size" : fmt(area) + " m²"} plan a builder.`, `Pre-cut logs, numbered parts and a manual come with ${name}; plan a builder or a small team for a building of ${isNaN(area) ? "this size" : fmt(area) + " m²"}.`, `${name} is delivered pre-cut and numbered. At ${isNaN(area) ? "this size" : fmt(area) + " m² inside"} it is a builder's job rather than a weekend project.`])
      : pick(rnd, 14, [`The ${name} kit arrives pre-cut with an assembly manual, and two people with basic tools can put it up (see ${E}how assembly works</a>).`, `Everything in ${name} is pre-cut and numbered, so it can be built with a second pair of hands (${E}assembly guide</a>).`, `Two people, basic tools and the step-by-step manual are enough for a ${dimTxt || name} kit (${E}what you need</a>).`, `${name} comes pre-cut and numbered; the manual walks two people through the build (${E}assembly steps</a>).`, `Building ${name} is a two-person job with the manual and basic tools (${E}see how</a>).`]);
    const K = `<a href="https://ideaswood.eu/wood-impregnation-treatment-for-log-cabins-complete-guide-to-koralan-uk-110/">`;
    const trtTxt = pick(rnd, 15, [`Treat the ${name} timber soon after assembly, as explained in our ${K}wood treatment guide</a>.`, `Once ${name} is up, treat the wood (${K}how and when</a>).`, `Within the first weeks, protect the ${wallTxt ? wallTxt.split(" ").slice(0, 2).join(" ") + " logs" : "timber"} with a treatment (${K}treatment guide</a>).`, `Unless you order factory impregnation, plan a treatment for ${name} right after the build (${K}guide</a>).`, `A wood treatment in the first weeks keeps ${name} looking right for years; see the ${K}Koralan guide</a>.`]);
    const delTxt = pick(rnd, 16, [`We deliver ${name} as a kit to the UK, Ireland and the rest of Europe.`, `${name} ships as a kit to the UK, Ireland and Europe.`, `Delivery of the ${dimTxt || name} kit: UK, Ireland and the rest of Europe.`, `The ${name} kit is delivered across the UK, Ireland and Europe.`, `Ask for a delivery price to your address in the UK, Ireland or elsewhere in Europe when you order ${name}.`]);
    plan.push(...pick(rnd, 17, [[baseTxt, asmTxt, trtTxt, delTxt], [asmTxt, baseTxt, trtTxt, delTxt], [delTxt, baseTxt, asmTxt, trtTxt]]));
  } else if (t === "sauna") {
    const size = one(f, "Size (L x W)", "Building Size (L x W)") || (dims(one(f, "Size")) ? one(f, "Size") : undefined) || (d ? dimTxt : undefined);
    const sz = size ? dims(size) : null; const sizeTxt = sz ? `${fmt(sz[0])} × ${fmt(sz[1])} m` : "";
    const ppl = one(f, "People");
    intro.push(pick(rnd, 3, [`${name} is ${an(tn)}${sizeTxt ? ` of ${sizeTxt}` : ""}${!isNaN(wall) ? ` with ${fmt(wall)} mm walls` : ""}${ppl ? `, for ${ppl} people` : ""}.`, `${an(tn).replace(/^./, c => c.toUpperCase())}${ppl ? ` for ${ppl} people` : ""}: ${name}${sizeTxt ? `, ${sizeTxt}` : ""}${!isNaN(wall) ? `, ${fmt(wall)} mm walls` : ""}.`]));
    intro.push(`It suits ${pick(rnd, 2, USE[t])}.`);
    if (rooms) body.push(`${/^1$/.test(rooms) ? "One room" : rooms + " rooms"}.`);
    if (!isNaN(area)) body.push(`Internal area ${fmt(area)} m².`);
    if (!isNaN(terr) && terr > 0) body.push(`Terrace ${fmt(terr)} m².`);
    if (!isNaN(side) && !isNaN(ridge)) body.push(`Side height ${fmt(side)} m, ridge ${fmt(ridge)} m.`);
    const tim = one(f, "Timber"); if (tim) body.push(`Timber: ${tim}.`); else if (f["Timber"]) body.push(`Available in ${f["Timber"].v.replace(/, /g, " or ")}.`);
    const dr = one(f, "Door Size"); if (dr) body.push(`Door ${dr}.`);
    const wn = any(f, "Windows", "Window Size"); if (wn) body.push(`Windows: ${wn}.`);
    const rf = one(f, "Roof"); if (rf) body.push(`Roof: ${rf}.`);
    const cr = one(f, "Changing Room"); if (cr) body.push(`Changing room ${cr}.`);
    plan.push(pick(rnd, 11, [`Place it on a firm, level base, keep the vents clear and follow the heater manual for distances to walls and for the flue.`, `A level, dry base and clear ventilation are all it needs on site; keep the distances given in the heater manual.`]), pick(rnd, 16, [`Delivered to the UK, Ireland and the rest of Europe.`, `We deliver across the UK, Ireland and Europe.`]));
  } else if (t === "hottub" || t === "heater") {
    const shape = one(f, "Shape"), od = any(f, "Outside Diameter"), ppl = one(f, "People");
    intro.push(`${name} is ${an(tn)}${shape ? `, ${shape.toLowerCase()} in shape` : ""}${od ? `, ${f["Outside Diameter"]?.multi ? "available in " + od.replace(/, /g, " or ") : od + " outside"}` : ""}${ppl ? `, for ${ppl} people` : ""}.`);
    intro.push(`It suits ${pick(rnd, 2, USE[t])}.`);
    const wc = any(f, "Water Capacity"); if (wc) body.push(`Water capacity: ${wc}.`);
    const ht = any(f, "Heater Type"); if (ht) body.push(`Heater: ${ht}.`);
    const tim = any(f, "Timber"); if (tim) body.push(f["Timber"]?.multi ? `Timber options: ${tim}.` : `Timber: ${tim}.`);
    const h = one(f, "Height"); if (h) body.push(`Height ${h}.`);
    plan.push(`Place it on a firm, level base with water nearby and space around the stove; follow the stove manual for clearances and the flue.`, pick(rnd, 16, [`Delivered to the UK, Ireland and Europe.`, `We deliver across the UK, Ireland and the rest of Europe.`]));
  } else if (t === "grillset") {
    const nc = one(f, "Number of corners"), od = one(f, "Outside Diameter");
    intro.push(`${name} is ${an(tn)}${nc ? ` for a ${nc}-corner grill cabin` : ""}${od ? `, ${od} across` : ""}.`);
    intro.push(`It suits ${pick(rnd, 2, USE[t])}.`);
    for (const k of ["Grill body diagonal length", "Fire box diagonal length", "Table diagonal length", "Table diagonal length extended", "Smoke hood diagonal length", "Smoke pipe length", "Height from ground"]) { const v = one(f, k); if (v) body.push(`${k}: ${v}.`); }
    plan.push(`Follow the clearances in the manual and local fire rules for the flue. Delivered to the UK, Ireland and Europe.`);
  } else if (t === "furniture") {
    intro.push(`${name} is ${an(tn)} in ${one(f, "Timber") || "solid wood"}, made for ${pick(rnd, 2, USE[t])}.`);
    for (const k of ["Table Size in (cm) LxWxH", "Sofa size in (cm) LxWxH", "Chair Size in (cm) LxWxH", "Seat Height (cm)"]) { const v = one(f, k); if (v) body.push(`${k.replace(" in (cm) LxWxH", " (L × W × H, cm)")}: ${v}.`); }
    plan.push(pick(rnd, 5, [`Clean it with a soft brush and mild soap, and oil or stain it once a year.`, `Oil or stain the wood once a year and store the set dry in winter.`]), `Delivered to the UK, Ireland and Europe, on its own or together with a cabin.`);
  } else if (t === "thermowood") {
    intro.push(`${name}: ${tn} for ${pick(rnd, 2, USE[t])}.`);
    for (const [k, { v }] of Object.entries(f)) body.push(`${k}: ${v}.`);
    plan.push(`Thermowood is pine heat-treated at high temperature without chemicals; it is stable outdoors and is not for load-bearing or ground-contact use. Fix with stainless A2 screws as a minimum and pre-drill near board ends. See the <a href="https://ideaswood.eu/thermowood-cladding-for-timber-buildings/">thermowood guide</a>. Delivered across the UK, Ireland and Europe.`);
  } else if (t === "pergola") {
    const sz = dims(one(f, "Size")) || (dims(`${one(f, "Width") ?? ""} x ${one(f, "Length") ?? ""}`)) || d;
    const size = sz ? `${fmt(sz[0])} × ${fmt(sz[1])} m` : "";
    const rb = num(one(f, "Roof Boards", "Roof boards thickness (mm)"));
    const useP = !isNaN(rb) ? pick(rnd, 2, ["a covered seating area in the garden", "an outdoor dining corner under a solid roof", "shade and rain cover over a terrace"]) : pick(rnd, 2, USE[t]);
    intro.push(pick(rnd, 3, [`${name} is ${an(tn)}${size ? ` of ${size}` : ""}${!isNaN(wall) ? ` on ${fmt(wall)} mm posts` : ""}, for ${useP}.`, `${an(tn).replace(/^./, c => c.toUpperCase())}${size ? ` of ${size}` : ""}: ${name}${!isNaN(wall) ? `, built on ${fmt(wall)} mm posts` : ""}. It suits ${useP}.`]));
    const rt = one(f, "Roof Type"); if (rt) body.push(`Roof type: ${rt.toLowerCase()}.`);
    const ra = num(one(f, "Roof Area", "Roof area (m²)")); if (!isNaN(ra)) body.push(`Roof area ${fmt(ra)} m².`);
    if (!isNaN(rb)) body.push(`Roof boards ${fmt(rb)} mm.`);
    const cs = one(f, "Column Size"); if (cs) body.push(`Posts ${cs}.`);
    const cw = any(f, "Cover width"); if (cw) body.push(f["Cover width"]?.multi ? `Cover width options: ${cw}.` : `Cover width ${cw}.`);
    if (!isNaN(area)) body.push(`Covered area ${fmt(area)} m².`);
    if (!isNaN(terr) && terr > 0) body.push(`Terrace ${fmt(terr)} m².`);
    if (!isNaN(side) && !isNaN(ridge)) body.push(`Side height ${fmt(side)} m, ridge ${fmt(ridge)} m.`);
    const w = num(one(f, "Warranty (months)", "Warranty")); if (!isNaN(w)) body.push(`Warranty: ${fmt(w)} months.`);
    plan.push(pick(rnd, 11, [`Fix the posts to a firm base as the manual shows, and check local height limits if it stands next to the house.`, `Anchor the posts to a solid base and check height rules near a boundary before you build.`]), pick(rnd, 16, [`Delivered as a kit to the UK, Ireland and Europe.`, `We deliver the kit across the UK, Ireland and Europe.`]));
  }
  return { intro, body, plan };
}

// old text: keep only lines that carry facts the attributes cannot (room list, pack size), drop anything contradicting
function keepOld(p: any, f: Facts): { kept: string[]; conflicts: string[]; dropped: number } {
  const text = ((p.desc || "") + "\n" + (p.short || "")).replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|li|h\d|div)>/gi, "\n").replace(/m2\b|m\?\S?/g, "m²");
  // sentences, not paragraphs, so a room list survives the m²/mm exclusion
  const paras = text.split(/\n+/).map(s => strip(s)).filter(s => s.length > 12).flatMap(s => s.split(/(?<=\.)\s+(?=[A-Z])/)).map(s => s.trim()).filter(s => s.length > 12);
  const conflicts: string[] = [];
  const wall = num(one(f, "Wall Thickness")), fl = num(one(f, "Floor boards thickness (mm)", "Floor Thickness")), rb = num(one(f, "Roof boards thickness (mm)")), area = num(one(f, "Internal area (m²)")), roomsN = num(one(f, "Number of rooms"));
  const joined = paras.join(" ");
  for (const m of joined.matchAll(/(\d+)\s+rooms?\b/gi)) { const n = parseInt(m[1]); if (!isNaN(roomsN) && n !== roomsN) conflicts.push(`"${m[0]}" vs attribute ${roomsN} rooms`); }
  for (const m of joined.matchAll(/(\d+(?:[.,]\d+)?)\s*mm\s+(walls?|logs?|floor|roof)/gi)) { const n = parseFloat(m[1].replace(",", ".")); const k = m[2].toLowerCase(); const ref = /wall|log/.test(k) ? wall : /floor/.test(k) ? fl : rb; if (!isNaN(ref) && Math.abs(ref - n) > 0.5) conflicts.push(`"${m[0]}" vs attribute ${fmt(ref)} mm`); }
  for (const m of joined.matchAll(/(\d+(?:[.,]\d+)?)\s*m²\s*(of )?(internal|inside|floor|living)/gi)) { const n = parseFloat(m[1].replace(",", ".")); if (!isNaN(area) && Math.abs(area - n) > 0.2) conflicts.push(`"${m[0]}" vs attribute ${fmt(area)} m²`); }
  const kept = conflicts.length ? [] : paras.filter(s => /bedroom|bathroom|kitchen|living|hallway|wc\b|sauna room|changing room|standard set|pack size|full truck/i.test(s) && !/m²|\bmm\b/i.test(s));
  return { kept, conflicts, dropped: paras.length - kept.length };
}

// ---------- main ----------
const catsRes: any[] = await (await fetch("https://ideaswood.eu/wp-json/wc/store/v1/products/categories?per_page=100")).json();
const catLink = new Map(catsRes.map(c => [c.slug, { link: c.permalink, name: c.name.replace(/&amp;/g, "&") }]));
const out: any[] = [];
const skipped: any[] = [];
for (const p of eu) {
  if (p.cats.some((c: string) => c.startsWith("smart-line"))) continue;
  const divi = isDivi(p);
  const c = classify(p);
  if (!divi && c.cls === "ok") continue;
  if (/-max$/.test(p.slug)) { skipped.push({ slug: p.slug, why: "MAX line: text says 150 mm insulated walls, attribute says 44 mm; Justinas decides" }); continue; }
  if (/-alu$/.test(p.slug) && !p.cats.length) { skipped.push({ slug: p.slug, why: "name says aluminium, attributes are the wooden model's (68 mm walls); no category; Justinas decides" }); continue; }
  if (/^deluxe-/.test(p.slug)) { skipped.push({ slug: p.slug, why: "Deluxe line: glazed pergola rooms with no category; the old text is the only spec source (aluminium sliding windows, 140×140 columns). Needs a category first" }); continue; }
  if (p.cats.includes("thermowood") || p.cats.includes("cladding") || p.cats.includes("decking") || p.cats.includes("battens")) { skipped.push({ slug: p.slug, why: "thermowood line text is deliberate (price per m² of wall, lengths, fixings); left as is" }); continue; }
  const f = facts(p), t = typeOf(p), rnd = seedOf(p.id), name = clean(p.name);
  const { intro, body, plan } = build(p, f, t, rnd);
  let meta = ""; for (const sent of intro.map(x => x.replace(/<[^>]+>/g, ""))) { if ((meta + " " + sent).trim().length <= 158) meta = (meta + " " + sent).trim(); else break; }
  if (!meta) meta = intro[0].replace(/<[^>]+>/g, "").slice(0, 155).replace(/\s+\S*$/, "") + "…";
  if (divi) { out.push({ id: p.id, slug: p.slug, name, type: t, mode: "meta-only", meta, cls: "divi-layout", kept: 0, conflicts: [] }); continue; }
  const { kept, conflicts, dropped } = keepOld(p, f);
  const primaryCat = p.cats.find((x: string) => catLink.has(x) && !x.startsWith("smart-line") && !/default|new-2026|featured/.test(x));
  const cat = primaryCat ? catLink.get(primaryCat) : undefined;
  const catA = cat ? `<a href="${cat.link}">${cat.name.toLowerCase()}</a>` : "";
  const costA = BUILDING.has(t) ? `<a href="https://ideaswood.eu/how-much-does-a-garden-cabin-cost/">garden building prices</a>` : (t === "sauna" || t === "hottub") ? `<a href="https://ideaswood.eu/how-much-does-a-garden-sauna-cost/">sauna prices</a>` : "";
  const askA = BUILDING.has(t) || t === "sauna" ? `<a href="https://ideaswood.eu/price-my-cabin/">price my cabin</a>` : `<a href="https://ideaswood.eu/contact-us/">contact us</a>`;
  const linkTxt = pick(rnd, 20, [
    catA ? `Compare ${name} with other ${catA}${costA ? `, read about ${costA}` : ""}, or ${askA} for a different size.` : `${costA ? `Read about ${costA}, or ` : ""}${askA} for a different size of ${name}.`,
    `${catA ? `Other sizes: ${catA}. ` : ""}${costA ? `Typical budgets: ${costA}. ` : ""}Need ${name} changed? ${askA.replace(">price my cabin<", ">Send a sketch<").replace(">contact us<", ">Write to us<")}.`,
    `${costA ? `See ${costA} before you decide. ` : ""}${catA ? `More models in ${catA}. ` : ""}A different layout for ${name}: ${askA}.`,
  ]);
  const html = [`<p>${intro.join(" ")}</p>`, body.length ? `<p>${esc(body.join(" "))}</p>` : "", `<p>${plan.join(" ")}</p>`, `<p>${linkTxt}</p>`,
    kept.length ? `<h3>More about ${esc(name)}</h3>\n${kept.map(s => `<p>${esc(s)}</p>`).join("\n")}` : ""].filter(Boolean).join("\n");
  out.push({ id: p.id, slug: p.slug, name, type: t, mode: "body", meta, cls: c.cls, before: c, html, words: words(strip(html)), kept: kept.length, dropped, conflicts });
}
mkdirSync(outDir, { recursive: true });
await Bun.write(`${outDir}/generated.json`, JSON.stringify(out));
await Bun.write(`${outDir}/skipped.json`, JSON.stringify(skipped));
const bodies = out.filter(o => o.mode === "body");
await Bun.write(`${outDir}/preview.html`, `<!doctype html><meta charset="utf-8"><style>body{font:15px/1.5 system-ui;max-width:900px;margin:2em auto}article{border-bottom:2px solid #000;padding:1em 0}</style>` + bodies.map(o => `<article><h2>${esc(o.name)} <small>(${o.slug}, ${o.type}, ${o.words} words${o.conflicts.length ? ", CONFLICT: " + esc(o.conflicts.join("; ")) : ""})</small></h2>${o.html}<p><i>meta: ${esc(o.meta)}</i></p></article>`).join("\n"));
const byType: Record<string, number> = {}; bodies.forEach(o => byType[o.type] = (byType[o.type] || 0) + 1);
console.log(JSON.stringify({ body: bodies.length, metaOnly: out.length - bodies.length, skipped: skipped.length, byType, words: { min: Math.min(...bodies.map(o => o.words)), avg: Math.round(bodies.reduce((a, o) => a + o.words, 0) / bodies.length) }, conflicts: bodies.filter(o => o.conflicts.length).length, uncategorised: bodies.filter(o => o.type === "uncategorised").map(o => o.slug) }, null, 1));
