// "(when live)" rows from 09-internal-linking-map.md, after 18376/18377 were published.
import { writeFileSync, readFileSync } from "node:fs";
import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
import { raw } from "./links-check.ts";
const s = shop(); const B = "https://ideaswood.eu";
const a = (p: string, t: string) => `<a href="${B}${p}">${t}</a>`;
const edits = [
  { kind: "posts", id: 17451, find: "<p>Wall thickness is one of the biggest price drivers.",
    repl: `<p>${a("/log-cabin-wall-thickness/", "Wall thickness")} is one of the biggest price drivers.` },
  { kind: "posts", id: 5532, find: `See how ${a("/easy-installation/", "easy installation")} works.</p>`,
    repl: `See how ${a("/easy-installation/", "easy installation")} works. Before you choose, compare ${a("/log-cabin-wall-thickness/", "wall thickness")} options and, in England, check the ${a("/log-cabin-planning-permission-uk/", "planning permission")} rules.</p>` },
];
const sentence = `Before you choose, read our ${a("/log-cabin-wall-thickness/", "wall thickness guide")} and our ${a("/log-cabin-planning-permission-uk/", "planning permission guide")}.`;
for (const e of edits) {
  const cur = (await raw(e)).text; if (cur.split(e.find).length !== 2) throw new Error(`nomatch ${e.id}`);
  writeFileSync(`link-backups-live/${e.kind}-${e.id}.orig.txt`, cur);
  const next = cur.replace(e.find, e.repl);
  const r = await fetch(`${B}/wp-json/wp/v2/${e.kind}/${e.id}`, { method: "POST", headers: s.headers, body: JSON.stringify({ content: next }) });
  console.log(e.id, r.status, (await raw(e)).text === next ? "readback OK" : "DIFF");
}
// Category 657: add the same sentence to the full-HTML fix file and to the kses-safe interim text.
for (const f of ["cat-657.fixed.txt", "cat-657.interim.txt"]) {
  let t = readFileSync(f, "utf8"); const m = f.includes("fixed") ? `for most cabins.</p>` : `for most cabins.`;
  if (t.split(m).length !== 2) throw new Error(`nomatch ${f}`);
  t = t.replace(m, f.includes("fixed") ? `for most cabins. ${sentence}</p>` : `for most cabins. ${sentence}`); writeFileSync(f, t);
}
console.log("cat files updated");
