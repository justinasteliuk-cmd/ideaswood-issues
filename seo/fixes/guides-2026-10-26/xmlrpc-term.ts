// Writes a product_cat description through XML-RPC wp.editTerm. XML-RPC login calls wp_set_current_user,
// so kses_init sees the administrator's unfiltered_html and keeps h1/p/table (REST strips them on this site).
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { raw } from "./links-check.ts";
const [termId, file] = [Number(process.argv[2]), process.argv[3]];
const c = JSON.parse(readFileSync(`${homedir()}/.claude/PAI/USER/CREDENTIALS/wordpress/credentials.json`, "utf8"))["ideaswood.eu"];
const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const desc = readFileSync(file, "utf8");
const body = `<?xml version="1.0"?><methodCall><methodName>wp.editTerm</methodName><params>
<param><value><int>1</int></value></param>
<param><value><string>${esc(c.username)}</string></value></param>
<param><value><string>${esc(String(c.application_password).replace(/\s+/g, ""))}</string></value></param>
<param><value><int>${termId}</int></value></param>
<param><value><struct>
<member><name>taxonomy</name><value><string>product_cat</string></value></member>
<member><name>description</name><value><string>${esc(desc)}</string></value></member>
</struct></value></param></params></methodCall>`;
const r = await fetch("https://ideaswood.eu/xmlrpc.php", { method: "POST", headers: { "Content-Type": "text/xml" }, body });
const t = await r.text();
console.log(r.status, /<boolean>1<\/boolean>/.test(t) ? "editTerm OK" : t.replace(/\s+/g, " ").slice(0, 400));
const back = (await raw({ kind: "cat", id: termId })).text;
const norm = (x: string) => x.replace(/\s+/g, " ").trim();
console.log("readback", norm(back) === norm(desc) ? "MATCHES" : `DIFFERS (${back.length} vs ${desc.length})`);
