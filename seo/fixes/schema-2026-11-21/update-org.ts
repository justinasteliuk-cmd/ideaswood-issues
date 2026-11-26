#!/usr/bin/env bun
// Updates Rank Math "Titles & Meta > Local SEO" (Organization schema) via rankmath/v1/updateSettings, sending the full current
// settings object (as the settings screen does) with only the keys below changed. Backup: titles-settings-before.json.
// Usage: bun update-org.ts [--dry] | bun update-org.ts --restore
import { openSession } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/wordpress/wp-session.ts";
const s = await openSession();
const page = await fetch("https://ideaswood.eu/wp-admin/admin.php?page=rank-math-options-titles", { headers: { Cookie: s.cookie } }).then((r) => r.text());
const start = page.indexOf('"optionPage":"titles","homeUrl":"https:\\/\\/ideaswood.eu","data":') ;
let i = page.indexOf('"data":', start) + 7, depth = 0, j = i, inStr = false;
for (; j < page.length; j++) { const c = page[j]; if (inStr) { if (c === "\\") j++; else if (c === '"') inStr = false; continue; } if (c === '"') inStr = true; else if (c === "{") depth++; else if (c === "}") { depth--; if (depth === 0) break; } }
const data = JSON.parse(page.slice(i, j + 1));
const dir = import.meta.dir;
if (process.argv.includes("--restore")) { Object.assign(data, JSON.parse(await Bun.file(dir + "/titles-settings-before.json").text())); }
else {
  if (!(await Bun.file(dir + "/titles-settings-before.json").exists())) await Bun.write(dir + "/titles-settings-before.json", JSON.stringify(data, null, 1));
  data.local_address = { streetAddress: "Kaštonų g. 8", addressLocality: "Didžiosios Riešės k.", addressRegion: "Vilniaus r. sav.", postalCode: "LT-14261", addressCountry: "LT" };
  data.phone_numbers = [{ type: "sales", number: "+370 678 22055" }];
  data.organization_description = "IdeasWood is a supplier and exporter of log cabins, wooden houses, garden rooms, garden sheds and saunas in spruce and pine, founded in 2007. Based in Lithuania, delivering across Europe, the UK and Ireland. Retail, trade and wholesale.";
}
const changed = ["local_address", "phone_numbers", "organization_description"];
console.log(Object.keys(data).length, "keys;", changed.map((k) => k + "=" + JSON.stringify(data[k]).slice(0, 90)).join("\n"));
if (process.argv.includes("--dry")) process.exit(0);
const r = await fetch("https://ideaswood.eu/wp-json/rankmath/v1/updateSettings", { method: "POST", headers: { Cookie: s.cookie, "X-WP-Nonce": s.nonce, "Content-Type": "application/json" }, body: JSON.stringify({ type: "titles", settings: data, updated: changed, isReset: false }) });
console.log(r.status, (await r.text()).slice(0, 300));
