// Cost guide (post 17451): add the 34 mm row (Smart Line garden cabins) to "Price by wall thickness".
// Figures from the Store API on 2026-11-06 (prices incl. VAT, as displayed): 39 models, HOUBLON €1,323 – BUGOLA 2 €7,796.
import { writeFileSync } from "node:fs";
import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
const s = shop();
const get = async () => (await (await fetch(`${s.base}/wp-json/wp/v2/posts/17451?context=edit`, { headers: s.headers })).json() as any).content.raw as string;
const orig = await get();
writeFileSync(`${import.meta.dir}/link-backups-live/posts-17451.before-34mm.orig.txt`, orig);
const anchor = `<tr><td>44 mm</td>`;
if (orig.split(anchor).length !== 2 || orig.includes("34 mm")) throw new Error("anchor not unique or row already there");
const row = `<tr><td>34 mm (Smart Line)</td><td>39</td><td><a href="https://ideaswood.eu/product/houblon/">€1,323</a> (HOUBLON)</td><td><a href="https://ideaswood.eu/product/bugola-2/">€7,796</a> (BUGOLA 2)</td></tr>\n`;
let t = orig.replace(anchor, row + anchor);
const intro = "for garden cabins, sheds, summer houses and villas, grouped by log wall thickness.";
if (t.split(intro).length !== 2) throw new Error("intro not found");
t = t.replace(intro, `for garden cabins, sheds, summer houses and villas, grouped by log wall thickness. The 34 mm row covers our <a href="https://ideaswood.eu/product-category/smart-line-series/smart-line-garden-cabins/">Smart Line garden cabins</a>.`);
const r = await fetch(`${s.base}/wp-json/wp/v2/posts/17451`, { method: "POST", headers: s.headers, body: JSON.stringify({ content: t }) });
console.log(r.status, (await get()) === t ? "readback OK" : "READBACK DIFFERS");
