// Vienkartinis prisijungimų sukūrimas patvirtintiems klientams. Paleisti VM'e, ten, kur gyvena registry.sqlite.
//
//   bun provision-logins.ts clients.json            # sausas paleidimas: nieko nekeičia, parodo planą
//   bun provision-logins.ts clients.json --apply    # sukuria prisijungimus + laiškų eilę
//
// clients.json: [{ "sheetId": "...", "name": "Udis Homes srl", "email": "..." }, ...]
// (sheetId + patvirtinti el. paštai yra Drive lape „B2B prisijungimai — aktyvūs klientai“, stulpelis email_candidate).
//
// Saugumas: atviras slaptažodis NIEKUR nespausdinamas ir nelieka failuose, išskyrus laiško tekstą outbox aplanke
// (0600, tik savininkui). Portalo siuntėjas išsiunčia ir ištrina failą. Registre saugomas tik argon2id hash'as.
// Schemos nespėlioja: jei trūksta stulpelio, sustoja ir pasako, kurio.

import { Database } from "bun:sqlite";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { planLogins, welcomeEmail } from "./credentials";

const DB_PATH = process.env.REGISTRY_DB ?? "/var/lib/iw-registry/registry.sqlite";
const OUTBOX = process.env.LOGIN_OUTBOX ?? "/var/lib/iw-registry/outbox-logins";
type Input = { sheetId: string; name: string; email: string };

export async function provision(db: Database, input: Input[], apply: boolean, outbox = OUTBOX) {
  const cols = (t: string) => new Set((db.query(`PRAGMA table_info(${t})`).all() as { name: string }[]).map((c) => c.name));
  const pick = (have: Set<string>, ...names: string[]) => names.find((n) => have.has(n));

  const cl = cols("clients"), pa = cols("b2b_partners");
  const missing: string[] = [];
  if (!cl.has("sheet_id")) missing.push("clients.sheet_id (SYNC-DIEGIMAS.md 0 žingsnis)");
  const emailCol = pick(pa, "email", "login_email", "username");
  const hashCol = pick(pa, "password_hash", "pass_hash", "hash");
  if (!pa.has("client_id")) missing.push("b2b_partners.client_id");
  if (!emailCol) missing.push("b2b_partners: el. pašto stulpelis (email / login_email / username)");
  if (!hashCol) missing.push("b2b_partners: slaptažodžio hash stulpelis (password_hash / pass_hash / hash)");
  if (!pa.has("must_change_password")) missing.push("b2b_partners.must_change_password (SYNC-DIEGIMAS.md 0 žingsnis)");
  if (missing.length) return { ok: false as const, missing, created: [], skipped: [] };

  const rows = input.map((i) => {
    const c = db.query("SELECT id, name FROM clients WHERE sheet_id = ?").get(i.sheetId) as { id: number; name: string } | null;
    const has = c ? !!db.query("SELECT 1 FROM b2b_partners WHERE client_id = ?").get(c.id) : false;
    return { clientKey: i.sheetId, email: i.email, active: !!c, hasLogin: has, name: i.name, clientId: c?.id };
  });
  const { create, skipped } = await planLogins(rows);
  const byKey = new Map(rows.map((r) => [r.clientKey, r]));
  const notFound = rows.filter((r) => !r.clientId).map((r) => ({ clientKey: r.clientKey, reason: "kliento nėra registre (clients.sheet_id nesusietas)" }));
  const created: { name: string; email: string }[] = [];

  if (apply) {
    mkdirSync(outbox, { recursive: true, mode: 0o700 });
    db.exec("BEGIN");
    try {
      for (const c of create) {
        const r = byKey.get(c.clientKey)!;
        db.query(`INSERT INTO b2b_partners (client_id, ${emailCol}, ${hashCol}, must_change_password) VALUES (?, ?, ?, 1)`).run(r.clientId!, c.email, c.hash);
        const m = welcomeEmail(r.name, c.email, c.password);
        writeFileSync(`${outbox}/${r.clientId}-${Date.now()}.json`, JSON.stringify({ to: c.email, ...m }), { mode: 0o600 });
        created.push({ name: r.name, email: c.email });
      }
      db.exec("COMMIT");
    } catch (e) { db.exec("ROLLBACK"); throw e; }
  } else created.push(...create.map((c) => ({ name: byKey.get(c.clientKey)!.name, email: c.email })));

  return { ok: true as const, missing: [], created, skipped: [...notFound, ...skipped.filter((s) => !notFound.some((n) => n.clientKey === s.clientKey))] };
}

if (import.meta.main) {
  const [file, flag] = [process.argv[2], process.argv[3]];
  if (!file) { console.error("naudojimas: bun provision-logins.ts clients.json [--apply]"); process.exit(2); }
  const apply = flag === "--apply";
  const res = await provision(new Database(DB_PATH), JSON.parse(readFileSync(file, "utf8")), apply);
  if (!res.ok) { console.error("SUSTOTA, trūksta schemoje:\n - " + res.missing.join("\n - ")); process.exit(1); }
  console.log(apply ? "SUKURTA:" : "SAUSAS PALEIDIMAS, bus sukurta:");
  for (const c of res.created) console.log(`  ${c.name} <${c.email}>`);
  if (res.skipped.length) console.log("PRALEISTA:\n" + res.skipped.map((s) => `  ${s.clientKey}: ${s.reason}`).join("\n"));
}
