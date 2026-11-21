#!/usr/bin/env bun
// Creates (or updates, if the slug exists) a published page; first <h1> in the file becomes the page title (Divi prints it as H1).
// Usage: bun create-page.ts <slug> <file.html> "<seo title>" "<meta>" "<focus>" [--draft]
import { openSession, wp } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/wordpress/wp-session.ts";
const [slug, file, seoTitle, meta, focus] = process.argv.slice(2);
const status = process.argv.includes("--draft") ? "draft" : "publish";
const s = await openSession();
let html = await Bun.file(import.meta.dir + "/" + file).text();
const h1 = html.match(/<h1>([\s\S]*?)<\/h1>/)![1];
html = html.replace(/<h1>[\s\S]*?<\/h1>\s*/, "");
const ex = await wp(s, `pages?slug=${slug}&status=publish,draft&context=edit&_fields=id,content`);
const body = JSON.stringify({ slug, title: h1, content: html, status });
const H = { "Content-Type": "application/json" };
const p = ex.length ? await wp(s, `pages/${ex[0].id}`, { method: "POST", headers: H, body }) : await wp(s, "pages", { method: "POST", headers: H, body });
if (ex.length) await Bun.write(`${process.env.HOME}/Desktop/ideaswood-seo/backup/page-${ex[0].id}-before-${Date.now()}.json`, JSON.stringify(ex[0]));
const html0 = await fetch("https://ideaswood.eu/wp-admin/", { headers: { Cookie: s.cookie } }).then((r) => r.text());
const r = await fetch("https://ideaswood.eu/wp-json/rankmath/v1/updateMeta", { method: "POST", headers: { Cookie: s.cookie, "X-WP-Nonce": s.nonce, "Content-Type": "application/json" }, body: JSON.stringify({ objectID: p.id, objectType: "post", meta: { rank_math_title: seoTitle, rank_math_description: meta, rank_math_focus_keyword: focus } }) });
console.log(ex.length ? "updated" : "created", p.id, p.status, p.link, "rankmath", r.status, "meta len", meta.length);
