#!/usr/bin/env bun
/**
 * Measures 8-gram overlap of the NEW full descriptions (what the page will show: new body + unchanged
 * short_description) against every product on the 5 group sites and within the new set. Shortcodes stripped.
 *   bun measure.ts <all.json> <generated.json>
 * Starts with a positive control: two identical texts must score 100 %.
 */
const all = JSON.parse(await Bun.file(process.argv[2]).text()) as Record<string, any[]>;
const gen = JSON.parse(await Bun.file(process.argv[3]).text()) as any[];
const strip = (h: string) => (h || "").replace(/\[\/?et_pb_[^\]]*\]/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
const grams = (t: string, n = 8) => { const w = t.split(" "); const s = new Set<string>(); for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(" ")); return s; };
const ov = (a: Set<string>, b: Set<string>) => { if (!a.size) return 0; let k = 0; a.forEach(x => { if (b.has(x)) k++; }); return k / a.size; };
const ctrl = grams(strip("<p>one two three four five six seven eight nine ten eleven twelve</p>"));
if (ov(ctrl, ctrl) !== 1) throw new Error("positive control failed"); console.log("positive control: identical texts = 100 %");
const eu = all["https://ideaswood.eu"];
const existing = Object.entries(all).flatMap(([s, ps]) => ps.map(p => ({ k: s.replace("https://", "") + "/" + p.slug, id: p.id, site: s, g: grams(strip(p.desc + " " + p.short)) })));
const newDocs = gen.filter(o => o.mode === "body").map(o => { const p = eu.find(x => x.id === o.id); return { k: "NEW/" + o.slug, id: o.id, g: grams(strip(o.html + " " + (p?.short || ""))) }; });
const within: number[] = [], vsExisting: number[] = []; const worst: string[] = [];
for (const d of newDocs) {
  let b1 = 0, k1 = ""; for (const o of newDocs) { if (o === d) continue; const r = ov(d.g, o.g); if (r > b1) { b1 = r; k1 = o.k; } }
  let b2 = 0, k2 = ""; for (const o of existing) { if (o.site === "https://ideaswood.eu" && o.id === d.id) continue; const r = ov(d.g, o.g); if (r > b2) { b2 = r; k2 = o.k; } }
  within.push(b1); vsExisting.push(b2); if (b1 > 0.35 || b2 > 0.35) worst.push(`${d.k} within=${(b1 * 100).toFixed(0)}% (${k1}) existing=${(b2 * 100).toFixed(0)}% (${k2})`);
}
const q = (a: number[]) => { const s = [...a].sort((x, y) => x - y); const pc = (p: number) => (s[Math.min(s.length - 1, Math.floor(s.length * p))] * 100).toFixed(0) + "%"; return { median: pc(0.5), p90: pc(0.9), max: pc(1), over35: a.filter(x => x > 0.35).length, over50: a.filter(x => x > 0.5).length, n: a.length }; };
console.log("within new set:", JSON.stringify(q(within)));
console.log("vs existing products on 5 sites:", JSON.stringify(q(vsExisting)));
console.log("over 35 %:", worst.length, "\n" + worst.slice(0, 10).join("\n"));
