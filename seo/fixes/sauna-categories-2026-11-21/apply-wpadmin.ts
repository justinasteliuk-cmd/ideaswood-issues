#!/usr/bin/env bun
// Submits the wp-admin term edit form (same as clicking Update) using the logged-in Chrome session.
// Usage: bun apply-wpadmin.ts <termId> <folder> [--dry]
import { $ } from "bun";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const [id, folder, flag] = process.argv.slice(2);
const dry = flag === "--dry";
const site = "https://ideaswood.eu";
const raw = await $`interceptor cookies ideaswood.eu --json`.text();
const jar = (JSON.parse(raw.slice(raw.indexOf("{"))).data) as { name: string; value: string }[];
const cookie = jar.map((c) => `${c.name}=${c.value}`).join("; ");
const H = { Cookie: cookie, "User-Agent": "Mozilla/5.0" };
const editUrl = `${site}/wp-admin/term.php?taxonomy=product_cat&tag_ID=${id}&post_type=product`;
const html = await fetch(editUrl, { headers: H, redirect: "manual" }).then((r) => r.text());
const formM = html.match(/<form[^>]*id="edittag"[\s\S]*?<\/form>/);
if (!formM) throw new Error("edit form not found (session expired?)");
const form = formM[0];
const dec = (s: string) => s.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const fd = new URLSearchParams();
for (const m of form.matchAll(/<input\b[^>]*>/g)) {
  const tag = m[0];
  const name = tag.match(/name="([^"]+)"/)?.[1]; if (!name) continue;
  const type = tag.match(/type="([^"]+)"/)?.[1] ?? "text";
  if ((type === "checkbox" || type === "radio") && !/checked/.test(tag)) continue;
  if (type === "submit" || type === "button") continue;
  fd.append(name, dec(tag.match(/value="([^"]*)"/)?.[1] ?? ""));
}
for (const m of form.matchAll(/<textarea\b[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/textarea>/g)) fd.append(m[1], dec(m[2]));
for (const m of form.matchAll(/<select\b[^>]*name=["']([^"']+)["'][^>]*>([\s\S]*?)<\/select>/g)) {
  const sel = m[2].match(/<option[^>]*value=["']([^"']*)["'][^>]*selected/)?.[1] ?? m[2].match(/<option[^>]*value=["']([^"']*)["']/)?.[1] ?? "";
  fd.append(m[1], sel);
}
const dir = import.meta.dir + "/" + folder;
const intro = readFileSync(join(dir, "intro-above-grid.html"), "utf8").trim();
const guide = readFileSync(join(dir, "guide-below-grid.html"), "utf8").trim();
const desc = `<!--iw-below-->\n${intro}\n${guide}`;
const tm = readFileSync(join(dir, "title-meta.txt"), "utf8");
const nw = tm.split(/^NEW\s*$/m)[1];
const title = nw.match(/^Title:\s*(.+)$/m)![1].trim();
const meta = nw.match(/^Meta:\s*(.+)$/m)![1].trim();
const fk = tm.match(/Focus keyword:\s*(.+)$/m)![1].trim();
const keys = [...new Set([...fd.keys()])];
const backup = { id, at: new Date().toISOString(), fields: Object.fromEntries(keys.filter(k=>/description|rank_math_(title|description|focus)/.test(k)).map(k=>[k, fd.getAll(k)])) };
writeFileSync(`${process.env.HOME}/Desktop/ideaswood-seo/backup/term-${id}-before-2026-11-21.json`, JSON.stringify(backup, null, 2));
for (const k of keys) if (k === "description" || /^description/.test(k)) fd.set(k, desc);
fd.set("rank_math_title", title); fd.set("rank_math_description", meta); fd.set("rank_math_focus_keyword", fk);
console.log({ parent: fd.get("parent"), display: fd.get("display_type"), id, keys: keys.filter(k=>!k.startsWith("_")||k==="_wpnonce").join(","), title, metaLen: meta.length, descLen: desc.length });
if (dry) process.exit(0);
const r = await fetch(`${site}/wp-admin/edit-tags.php`, { method: "POST", headers: { ...H, "Content-Type": "application/x-www-form-urlencoded", Referer: editUrl }, body: fd.toString(), redirect: "manual" });
console.log("POST", r.status, r.headers.get("location"));
