import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
const s = shop();
for (const id of [18376, 18377]) { const r = await fetch(`${s.base}/wp-json/wp/v2/pages/${id}`, { method: "POST", headers: s.headers, body: JSON.stringify({ status: "publish" }) }); const j = await r.json() as any; console.log(id, r.status, j.status, j.link); }
