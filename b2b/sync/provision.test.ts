import { test, expect } from "bun:test";
import { Database } from "bun:sqlite";
import { mkdtempSync, readdirSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { provision } from "./provision-logins";

const mkdb = (partnerCols = "client_id INT, email TEXT, password_hash TEXT, must_change_password INT") => {
  const hasMust = partnerCols.includes("must_change_password");
  const db = new Database(":memory:");
  db.exec(`CREATE TABLE clients (id INTEGER PRIMARY KEY, name TEXT, sheet_id TEXT);
           CREATE TABLE b2b_partners (id INTEGER PRIMARY KEY, ${partnerCols});
           INSERT INTO clients VALUES (1,'Udis Homes srl','S-udis'),(2,'Housinger','S-hous'),(3,'LH Plan & Bau','S-lh');
           INSERT INTO b2b_partners (client_id,email,password_hash${hasMust ? ",must_change_password" : ""}) VALUES (2,'old@housinger.eu','$argon2id$old'${hasMust ? ",0" : ""});`);
  return db;
};
const input = [
  { sheetId: "S-udis", name: "Udis Homes srl", email: "rubinsevrani@yahoo.com" },
  { sheetId: "S-hous", name: "Housinger", email: "info@housinger.eu" },
  { sheetId: "S-lh", name: "LH Plan & Bau", email: "khk@lh-plan-und-bau.de" },
  { sheetId: "S-nera", name: "Nežinomas", email: "x@y.lt" },
];

test("sausas paleidimas nieko nekeičia", async () => {
  const db = mkdb(), out = mkdtempSync(join(tmpdir(), "ob-"));
  const r = await provision(db, input, false, out);
  expect(r.ok && r.created.map((c) => c.email)).toEqual(["rubinsevrani@yahoo.com", "khk@lh-plan-und-bau.de"]);
  expect((db.query("SELECT COUNT(*) n FROM b2b_partners").get() as any).n).toBe(1);
  expect(readdirSync(out)).toEqual([]);
});

test("apply: sukuria tik trūkstamus, esamo kliento neliečia, slaptažodis tik hash'u ir 0600 laiške", async () => {
  const db = mkdb(), out = mkdtempSync(join(tmpdir(), "ob-"));
  const r = await provision(db, input, true, out);
  expect(r.ok).toBe(true);
  const rows = db.query("SELECT client_id, email, password_hash h, must_change_password m FROM b2b_partners ORDER BY client_id").all() as any[];
  expect(rows.map((x) => x.client_id)).toEqual([1, 2, 3]);
  expect(rows.find((x) => x.client_id === 2).h).toBe("$argon2id$old");           // Housinger nepakeistas
  for (const x of rows.filter((x) => x.client_id !== 2)) { expect(x.h).toStartWith("$argon2id$"); expect(x.m).toBe(1); }
  const files = readdirSync(out);
  expect(files).toHaveLength(2);
  for (const f of files) {
    expect(statSync(join(out, f)).mode & 0o777).toBe(0o600);
    const mail = JSON.parse(readFileSync(join(out, f), "utf8"));
    const pw = mail.text.match(/Temporary password: (\S+)/)[1];
    const row = rows.find((x) => x.email === mail.to);
    expect(await Bun.password.verify(pw, row.h)).toBe(true);                       // laiške esantis slaptažodis tikrai atrakina paskyrą
    expect(JSON.stringify(rows)).not.toContain(pw);                                // registre jo nėra
  }
  expect(r.ok && r.skipped.map((s) => s.clientKey).sort()).toEqual(["S-hous", "S-nera"]);
});

test("pakartotinis paleidimas nieko nebekuria", async () => {
  const db = mkdb(), out = mkdtempSync(join(tmpdir(), "ob-"));
  await provision(db, input, true, out);
  const again = await provision(db, input, true, out);
  expect(again.ok && again.created).toEqual([]);
  expect((db.query("SELECT COUNT(*) n FROM b2b_partners").get() as any).n).toBe(3);
});

test("trūkstant schemos stulpelio sustoja ir nieko nerašo", async () => {
  const db = mkdb("client_id INT, email TEXT, password_hash TEXT");
  const r = await provision(db, input, true, mkdtempSync(join(tmpdir(), "ob-")));
  expect(r.ok).toBe(false);
  expect(!r.ok && r.missing.join()).toContain("must_change_password");
  expect((db.query("SELECT COUNT(*) n FROM b2b_partners").get() as any).n).toBe(1);
});
