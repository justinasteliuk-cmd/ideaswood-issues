// Creates (or updates) the two guide pages as drafts with Rank Math meta. Idempotent by slug.
import { readFileSync, writeFileSync } from "node:fs";
import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
const s = shop(); const dir = import.meta.dir;
const planningLive = process.argv.includes("--planning-live");
const pages = [
  { slug: "log-cabin-planning-permission-uk", title: "Do You Need Planning Permission for a Log Cabin in England?",
    html: readFileSync(`${dir}/planning.html`, "utf8"),
    seoTitle: "Do You Need Planning Permission for a Log Cabin? England Guide",
    meta: "Height, boundary and size rules for a garden log cabin in England, when planning permission and building regulations apply, and how to check for your home.",
    kw: "log cabin planning permission" },
  { slug: "log-cabin-wall-thickness", title: "Log Cabin Wall Thickness: Which Do You Need?",
    html: readFileSync(`${dir}/wall.html`, "utf8").replace("{{PLANNING_STEP}}", planningLive
      ? `Read our <a href="https://ideaswood.eu/log-cabin-planning-permission-uk/">planning permission guide</a> before you choose a size.`
      : `If you are in England, check the Planning Portal guidance on outbuildings before you choose a size.`),
    seoTitle: "Log Cabin Wall Thickness: 44mm vs 58mm vs 68mm Explained",
    meta: "Which log cabin wall thickness do you need? Compare 44, 58 and 68 mm logs for offices, guest rooms and living space: warmth, strength, price and size.",
    kw: "log cabin wall thickness" },
];
const out: any[] = [];
for (const p of pages) {
  const ex = await (await fetch(`${s.base}/wp-json/wp/v2/pages?slug=${p.slug}&status=draft,publish,pending,private&context=edit`, { headers: s.headers })).json() as any[];
  const body: any = { title: p.title, slug: p.slug, content: p.html };
  if (!ex.length) body.status = "draft";
  const url = ex.length ? `${s.base}/wp-json/wp/v2/pages/${ex[0].id}` : `${s.base}/wp-json/wp/v2/pages`;
  if (ex.length) writeFileSync(`${dir}/backup-${ex[0].id}-${Date.now()}.json`, JSON.stringify(ex[0]));
  const r = await fetch(url, { method: "POST", headers: s.headers, body: JSON.stringify(body) });
  const j = await r.json() as any; if (!r.ok) throw new Error(`${p.slug} ${r.status} ${JSON.stringify(j).slice(0, 300)}`);
  const m = await fetch(`${s.base}/wp-json/rankmath/v1/updateMeta`, { method: "POST", headers: s.headers,
    body: JSON.stringify({ objectID: j.id, objectType: "post", meta: { rank_math_title: p.seoTitle, rank_math_description: p.meta, rank_math_focus_keyword: p.kw, rank_math_rich_snippet: "article", rank_math_snippet_article_type: "Article" } }) });
  const back = await (await fetch(`${s.base}/wp-json/wp/v2/pages/${j.id}?context=edit`, { headers: s.headers })).json() as any;
  const raw = back.content.raw as string;
  out.push({ id: j.id, slug: p.slug, status: back.status, rankmath: m.status, h2: (raw.match(/<h2/g) || []).length, table: (raw.match(/<table/g) || []).length, a: (raw.match(/<a /g) || []).length, same: raw.trim() === p.html.trim() || raw.includes(p.html.slice(0, 200)) });
}
console.log(JSON.stringify(out, null, 1));
