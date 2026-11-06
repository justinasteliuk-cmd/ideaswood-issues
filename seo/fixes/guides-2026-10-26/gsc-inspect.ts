import { readFileSync } from "node:fs"; import { homedir } from "node:os";
const c = JSON.parse(readFileSync(`${homedir()}/.claude/PAI/USER/CREDENTIALS/google/credentials.json`, "utf8"));
const t = await (await fetch("https://oauth2.googleapis.com/token", { method: "POST", body: new URLSearchParams({ client_id: c.client_id, client_secret: c.client_secret, refresh_token: c.refresh_token, grant_type: "refresh_token" }) })).json() as any;
for (const u of ["https://ideaswood.eu/log-cabin-planning-permission-uk/", "https://ideaswood.eu/log-cabin-wall-thickness/"]) {
  const r = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", { method: "POST", headers: { Authorization: `Bearer ${t.access_token}`, "Content-Type": "application/json" }, body: JSON.stringify({ inspectionUrl: u, siteUrl: "sc-domain:ideaswood.eu" }) });
  const j = await r.json() as any; const x = j.inspectionResult?.indexStatusResult;
  console.log(u, r.status, x ? JSON.stringify({ verdict: x.verdict, coverage: x.coverageState, lastCrawl: x.lastCrawlTime, sitemap: x.sitemap, canonical: x.googleCanonical }) : JSON.stringify(j).slice(0, 300));
}
