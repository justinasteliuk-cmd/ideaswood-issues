import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
import { raw } from "./links-check.ts";
const s = shop(); const cur = (await raw({ kind: "posts", id: 6392 })).text;
const a = "Insulation kits are available for all our models, including our ";
if (cur.split(a).length !== 2) throw new Error("nomatch");
const next = cur.replace(a, "Insulation kits are also available for our ");
const r = await fetch(`${s.base}/wp-json/wp/v2/posts/6392`, { method: "POST", headers: s.headers, body: JSON.stringify({ content: next }) });
console.log(r.status, (await raw({ kind: "posts", id: 6392 })).text === next ? "readback OK" : "DIFF");
