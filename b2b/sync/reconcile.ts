// Patikros taškai: trys nepriklausomos vietos turi rodyti tą patį.
//   A. Registras (tiesos šaltinis, b2b.ideaswood.eu)
//   B. Kliento Google lapas (ORDERS skirtukas)
//   C. Cockpit (data-orders.json)
// Kiekvieną naktį + po kiekvienos sinchronizacijos. Bet koks „error“ → laiškas Justinui ir raudona juosta cockpit'e.

import { type OrderLine } from "./model";

export type Severity = "error" | "warn";
export type Finding = { severity: Severity; code: string; clientKey: string; orderId?: string; detail: string };

export type Client = { clientKey: string; name: string; active: boolean; email: string | null; hasLogin: boolean };
export type Payment = { orderId: string; advanceCents: number; advanceDueCents: number | null };

const key = (l: OrderLine) => l.orderId;
const FIELDS = ["stage", "units", "unitCents", "totalCents", "itemName", "productionEnd", "loadedDay"] as const;

export function reconcile(input: {
  clients: Client[];
  registry: OrderLine[];
  sheets: OrderLine[];
  cockpit: OrderLine[];
  payments: Payment[];
}): Finding[] {
  const out: Finding[] = [];
  const push = (severity: Severity, code: string, clientKey: string, detail: string, orderId?: string) =>
    out.push({ severity, code, clientKey, orderId, detail });

  const idx = (ls: OrderLine[]) => new Map(ls.filter((l) => l.orderId).map((l) => [key(l), l]));
  const R = idx(input.registry), S = idx(input.sheets), C = idx(input.cockpit);
  const pay = new Map(input.payments.map((p) => [p.orderId, p]));

  // 1. Prisijungimai
  for (const c of input.clients) {
    if (!c.active) {
      if (c.hasLogin) push("error", "LOGIN_INACTIVE", c.clientKey, `${c.name}: neaktyvus klientas, bet prisijungimas veikia`);
      continue;
    }
    if (!c.email) push("error", "NO_EMAIL", c.clientKey, `${c.name}: nėra el. pašto — negalima sukurti prisijungimo`);
    else if (!c.hasLogin) push("error", "NO_LOGIN", c.clientKey, `${c.name}: aktyvus, bet neturi prisijungimo`);
  }

  // 2. Eilutės lape be Order Id = dar neimportuotos
  for (const l of input.sheets.filter((l) => !l.orderId))
    push("warn", "SHEET_ROW_NOT_IMPORTED", l.clientKey, `Lape eilutė be Order Id: ${l.itemName || l.manufacturerCode}`);

  // 3. Ar visur ta pati eilutė ir tie patys laukai
  const all = new Set([...R.keys(), ...S.keys(), ...C.keys()]);
  for (const id of all) {
    const r = R.get(id), s = S.get(id), c = C.get(id);
    const ck = (r ?? s ?? c)!.clientKey;
    if (!r) { push("error", "MISSING_IN_REGISTRY", ck, `Užsakymas ${id} yra ${s ? "lape" : ""}${s && c ? " ir " : ""}${c ? "cockpit'e" : ""}, bet ne registre`, id); continue; }
    if (!s && r.stage !== "delivered" && r.stage !== "cancelled") push("error", "MISSING_IN_SHEET", ck, `Užsakymas ${id} neparodytas kliento lape`, id);
    if (!c) push("error", "MISSING_IN_COCKPIT", ck, `Užsakymas ${id} neparodytas cockpit'e`, id);
    for (const f of FIELDS) {
      if (s && (s[f] ?? "") !== (r[f] ?? "")) push("error", "SHEET_DIFFERS", ck, `${id} ${f}: registras ${r[f]} ≠ lapas ${s[f]}`, id);
      if (c && (c[f] ?? "") !== (r[f] ?? "")) push("error", "COCKPIT_DIFFERS", ck, `${id} ${f}: registras ${r[f]} ≠ cockpit ${c[f]}`, id);
    }
    if (s && s.stage === null) push("warn", "SHEET_STATUS_EMPTY", ck, `${id}: lape tuščias arba neatpažintas Status`, id);
  }

  // 4. Verslo taisyklės (registre)
  for (const r of input.registry) {
    const p = pay.get(r.orderId);
    const paid = (p?.advanceCents ?? 0) >= (p?.advanceDueCents ?? 1);
    if (Number.isNaN(r.totalCents) || Number.isNaN(r.unitCents)) push("error", "BAD_AMOUNT", r.clientKey, `${r.orderId}: neperskaitoma suma`, r.orderId);
    else if (r.units * r.unitCents !== r.totalCents) push("warn", "TOTAL_MISMATCH", r.clientKey, `${r.orderId}: ${r.units} × ${r.unitCents / 100} ≠ ${r.totalCents / 100}`, r.orderId);
    if (r.stage === "production" && !paid) push("error", "PRODUCTION_WITHOUT_ADVANCE", r.clientKey, `${r.orderId}: gamyboje be avanso`, r.orderId);
    if (r.stage === "awaiting_advance" && p && paid) push("error", "ADVANCE_PAID_NOT_STARTED", r.clientKey, `${r.orderId}: avansas gautas, bet užsakymas dar laukia`, r.orderId);
    if (r.stage === "awaiting_advance" && /advance\s+paid|avansas\s+gautas/i.test(r.comments) && !(p && paid))
      push("error", "ADVANCE_IN_COMMENT_ONLY", r.clientKey, `${r.orderId}: komentare „${r.comments}“, bet mokėjimas neįrašytas`, r.orderId);
    if (r.stage === "awaiting_advance" && p?.advanceDueCents == null) push("error", "NO_ADVANCE_DUE", r.clientKey, `${r.orderId}: neįrašyta avanso suma`, r.orderId);
  }

  // 5. Kontrolinės sumos kiekvienam klientui (greitas akių patikrinimas cockpit'e)
  const sums = (ls: OrderLine[]) => {
    const m = new Map<string, { n: number; cents: number }>();
    for (const l of ls) {
      if (l.stage === "delivered" || l.stage === "cancelled") continue;
      const x = m.get(l.clientKey) ?? { n: 0, cents: 0 };
      x.n++; x.cents += l.totalCents || 0; m.set(l.clientKey, x);
    }
    return m;
  };
  const sr = sums(input.registry), ss = sums(input.sheets.filter((l) => l.orderId)), sc = sums(input.cockpit);
  for (const [ck, r] of sr) {
    const s = ss.get(ck) ?? { n: 0, cents: 0 }, c = sc.get(ck) ?? { n: 0, cents: 0 };
    if (r.n !== s.n || r.cents !== s.cents || r.n !== c.n || r.cents !== c.cents)
      push("error", "CLIENT_TOTALS", ck, `aktyvūs: registras ${r.n} / ${r.cents / 100} €, lapas ${s.n} / ${s.cents / 100} €, cockpit ${c.n} / ${c.cents / 100} €`);
  }
  return out;
}
