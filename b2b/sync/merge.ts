// Dvikryptė sinchronizacija registras ↔ kliento lapas, triju versijų sujungimas.
//
// base = kaip eilutė atrodė po paskutinės sėkmingos sinchronizacijos (lentelė sync_snapshots).
// Kiekvienam laukui: pasikeitė tik vienoje pusėje → ta reikšmė laimi; abiejose skirtingai → KONFLIKTAS,
// niekas neperrašoma, žmogus sprendžia. Taip niekas netyčia neištrina kito pakeitimo.
//
// Taisyklės, kurių sujungimas niekada nepažeidžia:
//  1. Kainą, kiekį, prekę valdo registras. Pakeitimas lape grąžinamas + įrašomas į žurnalą (kad matytų Justinas).
//  2. Į gamybą — tik su avansu. Lapo „On Production“ be avanso registre netaikomas, o lape grąžinamas „Awaiting advance“.
//  3. Būsena eina tik pirmyn (ready → production negalima), išskyrus atšaukimą.

import { type OrderLine, type Field, type Stage, SHEET_EDITABLE, REGISTRY_OWNED, STAGES } from "./model";

export type Change = { orderId: string; field: Field; from: unknown; to: unknown };
export type Conflict = { orderId: string; field: Field; registry: unknown; sheet: unknown; base: unknown; reason: string };

export type MergeResult = {
  toRegistry: Change[];     // taikyti registre
  toSheet: Change[];        // perrašyti lape
  conflicts: Conflict[];    // į ataskaitą, nieko nekeičiama
  newSnapshot: OrderLine;   // išsaugoti kaip base, kai pakeitimai pritaikyti
};

const eq = (a: unknown, b: unknown) => (a ?? "") === (b ?? "");
const order = (s: Stage | null) => (s ? STAGES.indexOf(s) : -1);

export function mergeLine(reg: OrderLine, sheet: OrderLine, base: OrderLine | null, advancePaid: boolean): MergeResult {
  const toRegistry: Change[] = [], toSheet: Change[] = [], conflicts: Conflict[] = [];
  const snap: OrderLine = { ...reg };
  const id = reg.orderId;

  for (const f of REGISTRY_OWNED) {
    if (!eq(reg[f], sheet[f])) toSheet.push({ orderId: id, field: f, from: sheet[f], to: reg[f] });
  }

  for (const f of SHEET_EDITABLE) {
    const r = reg[f], s = sheet[f], b = base ? base[f] : r;
    if (eq(r, s)) continue;
    const regChanged = !eq(r, b), sheetChanged = !eq(s, b);

    if (sheetChanged && !regChanged) {
      if (f === "stage") {
        const want = s as Stage | null;
        if (want === null) { toSheet.push({ orderId: id, field: f, from: s, to: r }); continue; } // ištrintas/neatpažintas statusas
        if (want === "production" && !advancePaid) {
          conflicts.push({ orderId: id, field: f, registry: r, sheet: s, base: b, reason: "Lape „On Production“, bet avansas negautas — grąžinta" });
          toSheet.push({ orderId: id, field: f, from: s, to: r });
          continue;
        }
        if (want !== "cancelled" && order(want) < order(r as Stage)) {
          conflicts.push({ orderId: id, field: f, registry: r, sheet: s, base: b, reason: "Būsena lape atgal — netaikoma" });
          toSheet.push({ orderId: id, field: f, from: s, to: r });
          continue;
        }
      }
      toRegistry.push({ orderId: id, field: f, from: r, to: s });
      (snap as any)[f] = s;
    } else if (regChanged && !sheetChanged) {
      toSheet.push({ orderId: id, field: f, from: s, to: r });
    } else {
      conflicts.push({ orderId: id, field: f, registry: r, sheet: s, base: b, reason: "Pakeista abiejose vietose" });
      (snap as any)[f] = b; // base nekeičiam, kol žmogus neišspręs
    }
  }
  return { toRegistry, toSheet, conflicts, newSnapshot: snap };
}
