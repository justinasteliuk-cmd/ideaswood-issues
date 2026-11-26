#!/usr/bin/env bun
/**
 * Writes the category descriptions from cattexts.ts to ideaswood.eu and sets the Rank Math focus keyword.
 * NOT RUN by the SEO executor (blocked); run it from a session that is allowed to write to the live site.
 *
 *   bun apply-descriptions.ts            # dry run: prints what would change, saves current descriptions
 *   bun apply-descriptions.ts --apply    # writes
 *
 * Default WooCommerce archive categories get intro only until iw-category-seo.php (mu-plugin) is installed;
 * after that, run with --split to write intro + <!--iw-below--> + below-grid text.
 * Divi-template categories (23, 27, 26, 82, 72) always get the full text: their Divi Text module
 * (Dynamic Content: Category Description) shows it under the grid.
 */
import { shop } from "../../../../../ideaswood-agents/registry/shop-auth.ts";
import { TEXTS } from "./cattexts.ts";
import { writeFileSync } from "node:fs";

const s = shop();
const apply = process.argv.includes("--apply");
const split = process.argv.includes("--split");
const DIVI = new Set([23, 27, 26, 82, 72]);
const before: any[] = [];
for (const t of TEXTS) {
  const cur = (await (await fetch(`${s.base}/wp-json/wc/v3/products/categories/${t.id}`, { headers: s.headers })).json()) as any;
  before.push({ id: t.id, slug: cur.slug, description: cur.description });
  const description = DIVI.has(t.id) || split ? `${t.above}\n<!--iw-below-->\n${t.below}` : t.above;
  if (!apply) { console.log("dry", t.id, t.slug, `current ${String(cur.description ?? "").length} chars -> new ${description.length}`); continue; }
  const r = await fetch(`${s.base}/wp-json/wc/v3/products/categories/${t.id}`, { method: "PUT", headers: s.headers, body: JSON.stringify({ description }) });
  const k = await fetch(`${s.base}/wp-json/rankmath/v1/updateMeta`, { method: "POST", headers: s.headers, body: JSON.stringify({ objectID: t.id, objectType: "term", meta: { rank_math_focus_keyword: t.kw } }) });
  console.log(t.id, t.slug, "description", r.status, "focus keyword", k.status);
}
writeFileSync(`${process.env.HOME}/Desktop/ideaswood-seo/backup/category-descriptions-before-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(before, null, 1));
