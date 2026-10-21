#!/usr/bin/env bun
/**
 * Applies generated.json to ideaswood.eu.
 *   bun apply.ts <generated.json> <snapshot all.json>            dry run: backs up, prints what would change
 *   bun apply.ts <generated.json> <snapshot all.json> --apply    writes
 *   bun apply.ts --revert <backup.json>                          restores bodies written by apply
 *
 * Backup (raw description via wc/v3 context=edit, date_modified, current rank_math_description) is written
 * BEFORE the first write and re-written after every product, with a marker per item: bodyWritten, metaWritten.
 * Body is written only for mode=body items whose live description still equals the snapshot gen.ts was built from.
 * Meta is written only where rank_math_description is empty (existing hand-written metas are listed, not replaced).
 * Revert: only items with bodyWritten, and only if the live description still equals the text we wrote.
 */
import { shop } from "../../../../../ideaswood-agents/registry/shop-auth.ts";
import { writeFileSync, existsSync } from "node:fs";

const s = shop();
const H = s.headers;
const args = process.argv.slice(2);
const apply = args.includes("--apply"), revertIdx = args.indexOf("--revert");
const norm = (h: string) => (h || "").replace(/\s+/g, " ").replace(/&#8217;|’/g, "'").replace(/&#8221;|&#8220;|”|“/g, '"').replace(/&#8211;|–/g, "-").trim();

async function getEdit(id: number) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const r = await fetch(`${s.base}/wp-json/wc/v3/products/${id}?context=edit&_fields=id,slug,description,short_description,date_modified,meta_data`, { headers: H });
    if (r.ok) { const p: any = await r.json(); const rm = (p.meta_data || []).find((m: any) => m.key === "rank_math_description"); return { id: p.id, slug: p.slug, description: p.description, short_description: p.short_description, date_modified: p.date_modified, rank_math_description: rm ? String(rm.value) : "" }; }
    await new Promise(r => setTimeout(r, 1500));
  }
  throw new Error(`GET ${id} failed 3x`);
}
const save = (path: string, data: any) => writeFileSync(path, JSON.stringify(data, null, 1));

if (revertIdx > -1) {
  const path = args[revertIdx + 1];
  const backup = JSON.parse(await Bun.file(path).text()) as any[];
  let done = 0, skipped = 0, failed = 0;
  for (const b of backup) {
    if (!b.bodyWritten) continue;
    const cur = await getEdit(b.id);
    if (norm(cur.description) !== norm(b.writtenHtml)) { console.log("skip (description changed since apply):", b.slug); skipped++; continue; }
    const r = await fetch(`${s.base}/wp-json/wc/v3/products/${b.id}`, { method: "PUT", headers: H, body: JSON.stringify({ description: b.description }) });
    let okMeta = true;
    if (b.metaWritten) { const m = await fetch(`${s.base}/wp-json/rankmath/v1/updateMeta`, { method: "POST", headers: H, body: JSON.stringify({ objectID: b.id, objectType: "post", meta: { rank_math_description: b.rank_math_description ?? "" } }) }); okMeta = m.ok; }
    if (r.ok && okMeta) { b.bodyWritten = false; b.metaWritten = false; b.reverted = new Date().toISOString(); done++; console.log("reverted", b.slug); } else { failed++; console.log("FAIL revert", b.slug, r.status, okMeta); }
    save(path, backup);
  }
  console.log({ done, skipped, failed }); process.exit(failed ? 1 : 0);
}

const [genPath, snapPath] = args;
const gen = JSON.parse(await Bun.file(genPath).text()) as any[];
const snap = new Map<number, string>((JSON.parse(await Bun.file(snapPath).text())["https://ideaswood.eu"] as any[]).map(p => [p.id, p.desc]));
const day = new Date().toISOString().slice(0, 10);
const backupPath = `${process.env.HOME}/Desktop/ideaswood-seo/backup/product-descriptions-before-${day}.json`;
const backup: any[] = existsSync(backupPath) ? JSON.parse(await Bun.file(backupPath).text()) : [];
const byId = new Map(backup.map(b => [b.id, b]));
for (const o of gen) { if (!byId.has(o.id)) { const e = await getEdit(o.id); backup.push(e); byId.set(o.id, e); } }
save(backupPath, backup);
console.log("backup:", backup.length, "products ->", backupPath);

// plan
const plan = gen.map(o => {
  const b = byId.get(o.id)!;
  const bodyOk = o.mode === "body" && norm(b.description) === norm(snap.get(o.id) || "");
  const bodyStale = o.mode === "body" && !bodyOk;
  const metaOk = !b.rank_math_description || b.rank_math_description.trim() === "";
  return { o, b, bodyOk, bodyStale, metaOk };
});
console.log({ bodies: plan.filter(x => x.bodyOk).length, bodiesSkippedChangedSinceSnapshot: plan.filter(x => x.bodyStale).map(x => x.o.slug), metas: plan.filter(x => x.metaOk).length, metasKeptExisting: plan.filter(x => !x.metaOk).length });
if (!apply) { console.log("dry run, nothing written. Existing metas kept:", plan.filter(x => !x.metaOk).map(x => x.o.slug).join(", ")); process.exit(0); }

let ok = 0, fail = 0;
for (const { o, b, bodyOk, metaOk } of plan) {
  try {
    if (bodyOk && !b.bodyWritten) {
      const r = await fetch(`${s.base}/wp-json/wc/v3/products/${o.id}`, { method: "PUT", headers: H, body: JSON.stringify({ description: o.html }) });
      if (!r.ok) throw new Error(`PUT body ${r.status} ${(await r.text()).slice(0, 120)}`);
      const j: any = await r.json();
      b.bodyWritten = true; b.writtenHtml = j.description; b.date_modified_after = j.date_modified; save(backupPath, backup);
      if (norm(j.description) !== norm(o.html)) throw new Error("body altered by WordPress filters (check <h3>/links)");
    }
    if (metaOk && !b.metaWritten) {
      const m = await fetch(`${s.base}/wp-json/rankmath/v1/updateMeta`, { method: "POST", headers: H, body: JSON.stringify({ objectID: o.id, objectType: "post", meta: { rank_math_description: o.meta } }) });
      if (!m.ok) throw new Error(`meta ${m.status}`);
      const after = await getEdit(o.id);
      if (after.rank_math_description.trim() !== o.meta.trim()) throw new Error("meta not saved");
      b.metaWritten = true; save(backupPath, backup);
    }
    ok++; if (ok % 25 === 0) console.log("done", ok);
  } catch (e: any) { fail++; console.log("FAIL", o.slug, e.message); save(backupPath, backup); }
}
console.log({ ok, fail, bodiesWritten: backup.filter(b => b.bodyWritten).length, metasWritten: backup.filter(b => b.metaWritten).length });
