// Post 6392 (insulation kits): point links at the old /product-category/houses/... paths (301 or 404) to the live categories.
import { writeFileSync } from "node:fs";
import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
const s = shop(); const B = "https://ideaswood.eu/product-category/";
const map: Record<string, string> = {
  "houses/log-cabins/garden-office-houses/": "home-offices-studios/",
  "houses/log-cabins/modern-log-cabins/": "garden-cabins/",
  "houses/log-cabins/storage-sheds/": "sheds-storage-cabins/",
  "houses/log-cabins/garden-house/": "garden-cabins/",
  "houses/log-cabins/": "garden-cabins/",
};
const get = async () => (await (await fetch(`${s.base}/wp-json/wp/v2/posts/6392?context=edit`, { headers: s.headers })).json() as any).content.raw as string;
const orig = await get();
writeFileSync(`${import.meta.dir}/link-backups-live/posts-6392.before-redirects.orig.txt`, orig);
let t = orig;
for (const [from, to] of Object.entries(map)) t = t.split(`href="${B}${from}"`).join(`href="${B}${to}"`);
const left = (t.match(/product-category\/houses\//g) || []).length;
const r = await fetch(`${s.base}/wp-json/wp/v2/posts/6392`, { method: "POST", headers: s.headers, body: JSON.stringify({ content: t }) });
console.log(r.status, "old paths left:", left, (await get()) === t ? "readback OK" : "READBACK DIFFERS");
