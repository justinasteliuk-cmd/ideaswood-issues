#!/usr/bin/env bun
// Sets Rank Math title/description/focus keyword for a term or post via rankmath/v1/updateMeta (logged-in Chrome session).
// Usage: bun rankmath-meta.ts <term|post> <id> <title> <description> [focus]
import { $ } from "bun";
const [type, id, title, description, focus] = process.argv.slice(2);
const raw = await $`interceptor cookies ideaswood.eu --json`.text();
const jar = (JSON.parse(raw.slice(raw.indexOf("{"))).data) as any[];
const cookie = jar.map((c) => `${c.name}=${c.value}`).join("; ");
const html = await fetch("https://ideaswood.eu/wp-admin/", { headers: { Cookie: cookie } }).then((r) => r.text());
const nonce = html.match(/wpApiSettings\s*=\s*\{[^}]*?"nonce"\s*:\s*"([a-f0-9]+)"/)?.[1];
if (!nonce) throw new Error("no nonce");
const meta: Record<string, string> = { rank_math_title: title, rank_math_description: description };
if (focus) meta.rank_math_focus_keyword = focus;
const r = await fetch("https://ideaswood.eu/wp-json/rankmath/v1/updateMeta", {
  method: "POST",
  headers: { Cookie: cookie, "X-WP-Nonce": nonce, "Content-Type": "application/json" },
  body: JSON.stringify({ objectID: Number(id), objectType: type, meta }),
});
console.log(r.status, (await r.text()).slice(0, 200));
