#!/usr/bin/env bun
// Exact-string replacements in a page/post body via wp/v2 (logged-in Chrome session). Fails if any "from" is not found exactly once.
// Usage: bun apply-replacements.ts <pages|posts> <id> <replacements.json> [--dry]
import { openSession, wp } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/wordpress/wp-session.ts";
const [type, id, file, flag] = process.argv.slice(2);
const s = await openSession();
const p = await wp(s, `${type}/${id}?context=edit`);
let c: string = p.content.raw;
await Bun.write(`${process.env.HOME}/Desktop/ideaswood-seo/backup/${type}-${id}-before-${Date.now()}.json`, JSON.stringify({ id, modified: p.modified, content: c }));
const reps: [string, string][] = JSON.parse(await Bun.file(file).text());
for (const [a, b] of reps) {
  const n = c.split(a).length - 1;
  if (n !== 1) throw new Error(`found ${n}x: ${a.slice(0, 80)}`);
  c = c.replace(a, () => b);
}
console.log("all", reps.length, "found once; new length", c.length);
if (flag === "--dry") process.exit(0);
const r = await wp(s, `${type}/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: c }) });
const back = await wp(s, `${type}/${id}?context=edit`); if (back.content.raw !== c) throw new Error("NOT SAVED: content differs after write"); console.log("saved + verified", r.id, back.content.raw.length);
