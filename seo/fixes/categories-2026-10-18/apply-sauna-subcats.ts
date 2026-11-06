#!/usr/bin/env bun
/**
 * Writes the sauna sub-category texts (sauna-subcats-2026-11-06.ts) to ideaswood.eu.
 *   bun apply-sauna-subcats.ts            dry run: backs up current descriptions
 *   bun apply-sauna-subcats.ts --apply    writes description (intro + <!--iw-below--> + guide) and the focus keyword
 * REST strips <h2>/<table> and even <p> on term descriptions (kses), so paragraphs are sent as blank-line-separated text
 * (wc_format_content autop restores them). The sauna categories use a Divi Theme Builder body layout that never fires
 * woocommerce_archive_description, so the marker goes FIRST: the whole text renders under the grid (the only hook that fires).
 * Backup: ~/Desktop/ideaswood-seo/backup/sauna-subcats-before-<date>.json
 */
import { shop } from "../../../../../ideaswood-agents/registry/shop-auth.ts";
import { TEXTS } from "./sauna-subcats-2026-11-06.ts";
import { writeFileSync } from "node:fs";

const s = shop();
const apply = process.argv.includes("--apply");
const day = new Date().toISOString().slice(0, 10);
const before: any[] = [];
for (const t of TEXTS) {
  const cur = (await (await fetch(`${s.base}/wp-json/wc/v3/products/categories/${t.id}`, { headers: s.headers })).json()) as any;
  before.push({ id: t.id, slug: cur.slug, description: cur.description });
  if (cur.slug !== t.slug) { console.log("SKIP slug mismatch", t.id, cur.slug, t.slug); continue; }
  const para = (h: string) => h.replace(/<\/p>\s*/g, "\n\n").replace(/<p>/g, "").trim();
  const description = `<!--iw-below-->\n${para(t.above)}\n\n${para(t.below)}`;
  if (!apply) { console.log("dry", t.id, t.slug, `current ${String(cur.description ?? "").length} chars -> new ${description.length}`); continue; }
  const r = await fetch(`${s.base}/wp-json/wc/v3/products/categories/${t.id}`, { method: "PUT", headers: s.headers, body: JSON.stringify({ description }) });
  const j: any = await r.json();
  const k = await fetch(`${s.base}/wp-json/rankmath/v1/updateMeta`, { method: "POST", headers: s.headers, body: JSON.stringify({ objectID: t.id, objectType: "term", meta: { rank_math_focus_keyword: t.kw } }) });
  console.log(t.id, t.slug, "description", r.status, "links kept:", (j.description.match(/<a /g) || []).length, "/", (description.match(/<a /g) || []).length, "marker:", j.description.includes("iw-below"), "focus keyword", k.status);
}
writeFileSync(`${process.env.HOME}/Desktop/ideaswood-seo/backup/sauna-subcats-before-${day}.json`, JSON.stringify(before, null, 1));
