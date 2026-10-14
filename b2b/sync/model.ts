// Vienas užsakymo eilutės modelis, bendras registrui, kliento Google lapui ir cockpit'ui.
// Sinchronizacija ir patikros lygina tik šiuos laukus — viskas kita kiekvienoje vietoje gyvena savarankiškai.

export const STAGES = ["awaiting_advance", "production", "ready", "shipped", "delivered", "cancelled"] as const;
export type Stage = (typeof STAGES)[number];

export type OrderLine = {
  orderId: string;            // registro id; lape — stulpelis „Order Id“. Tuščias = eilutė dar neimportuota.
  clientKey: string;          // kliento lapo spreadsheetId — vienintelis patikimas kliento raktas lapuose
  orderDate: string | null;   // ISO yyyy-mm-dd
  productionEnd: string | null;
  manufacturerCode: string;
  itemName: string;
  wallMm: string;
  units: number;
  unitCents: number;
  totalCents: number;
  stage: Stage | null;        // null = lape tuščias arba neatpažintas statusas
  comments: string;
  deliveryAddress: string;
  packedDay: string | null;
  loadedDay: string | null;
};

/** Laukai, kuriuos vadybininkas gali keisti lape ir kurie keliauja į registrą. */
export const SHEET_EDITABLE = ["stage", "productionEnd", "comments", "deliveryAddress", "packedDay", "loadedDay"] as const;
/** Laukai, kuriuos valdo tik registras (kaina, kiekis, prekė). Pakeitimas lape — grąžinamas ir užfiksuojamas. */
export const REGISTRY_OWNED = ["orderDate", "manufacturerCode", "itemName", "wallMm", "units", "unitCents", "totalCents"] as const;
export type Field = (typeof SHEET_EDITABLE)[number] | (typeof REGISTRY_OWNED)[number];

// ── Lapo statusai ↔ registro būsenos ────────────────────────────────────────
// Lapo „Status“ sąrašas papildomas: Awaiting advance, Shipped, Cancelled. „New Order“ skaitomas kaip awaiting_advance.
const SHEET_TO_STAGE: Record<string, Stage> = {
  "new order": "awaiting_advance",
  "awaiting advance": "awaiting_advance",
  "on production": "production",
  "in production": "production",
  "production": "production",
  "ready": "ready",
  "shipped": "shipped",
  "loaded": "shipped",
  "delivered": "delivered",
  "cancelled": "cancelled",
  "canceled": "cancelled",
};
export const STAGE_TO_SHEET: Record<Stage, string> = {
  awaiting_advance: "Awaiting advance",
  production: "On Production",
  ready: "Ready",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
/** Lapuose statusai rašomi laisvai („Ready to ship“, „08/19/2026 READY FOR DELIVERY“, „Waiting advance“).
 *  Atpažįstam tik vienareikšmius. „Advance paid …“, „Drawings sent…“ → null: tai turi pataisyti žmogus,
 *  nes mokėjimas be banko įrašo nėra mokėjimas. */
export function parseStage(v: unknown): Stage | null {
  const s = String(v ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  if (SHEET_TO_STAGE[s]) return SHEET_TO_STAGE[s];
  if (/\b(paid|drawing)/.test(s)) return null;
  if (/^(waiting|awaiting)( for)? advance/.test(s)) return "awaiting_advance";
  if (/\bcancel/.test(s)) return "cancelled";
  if (/\bdelivered\b/.test(s)) return "delivered";
  if (/\b(shipped|loaded)\b/.test(s)) return "shipped";
  if (/\bready\b/.test(s)) return "ready";
  if (/\bproduction\b/.test(s)) return "production";
  return null;
}

/** Sub-eilutės (durys, langai, priedai po pagrindine eilute) neturi datos ir statuso — paveldi iš pagrindinės. */
export function inheritParent(lines: (OrderLine & { row: number })[]): (OrderLine & { row: number; parentRow: number | null })[] {
  let parent: (OrderLine & { row: number }) | null = null;
  return lines.map((l) => {
    if (l.orderDate) { parent = l; return { ...l, parentRow: null }; }
    if (parent && l.stage === null) return { ...l, orderDate: parent.orderDate, stage: parent.stage, parentRow: parent.row };
    return { ...l, parentRow: null };
  });
}

// ── Lapų reikšmių normalizavimas ────────────────────────────────────────────

/** "33141", "1,748.00", "1 748,00 €", 1748 → centai. Tuščia → 0. Neatpažinta → NaN (patikra tai pagaus). */
export function toCents(v: unknown): number {
  if (typeof v === "number") return Math.round(v * 100);
  let s = String(v ?? "").replace(/[€\s ]/g, "");
  if (!s) return 0;
  const lastComma = s.lastIndexOf(","), lastDot = s.lastIndexOf(".");
  if (lastComma > lastDot) s = s.replace(/\./g, "").replace(",", ".");           // 1.748,50
  else s = s.replace(/,/g, "");                                                   // 1,748.50
  if (!/^-?\d+(\.\d+)?$/.test(s)) return NaN;
  return Math.round(Number(s) * 100);
}

/** "2026 08 19", "2026-08-19", "2026.08.19", "19/08/2026", Sheets serijinis skaičius → "2026-08-19". */
export function toIsoDate(v: unknown): string | null {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v === "number") return new Date(Date.UTC(1899, 11, 30) + v * 86400000).toISOString().slice(0, 10);
  const s = String(v).trim();
  let m = s.match(/^(\d{4})[\s.\-/](\d{1,2})[\s.\-/](\d{1,2})$/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  m = s.match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  return null;
}

// ── Lapo antraštės: stulpeliai skirtinguose lapuose stovi skirtingose vietose ──

const HEADER_ALIASES: Record<string, keyof OrderLine | "price" | "total"> = {
  "order date": "orderDate",
  "approximate production end date": "productionEnd",
  "manufacturer code": "manufacturerCode",
  "manucaturer code": "manufacturerCode",
  "item name": "itemName",
  "wall thickness": "wallMm",
  "units": "units",
  "price": "price",
  "total price": "total",
  "status": "stage",
  "comments": "comments",
  "delivery address": "deliveryAddress",
  "packed day": "packedDay",
  "loaded day": "loadedDay",
  "order id": "orderId",
};

export function headerMap(header: unknown[]): Map<string, number> {
  const out = new Map<string, number>();
  header.forEach((h, i) => {
    const norm = String(h ?? "").toLowerCase().replace(/\s+/g, " ").trim();
    for (const [alias, field] of Object.entries(HEADER_ALIASES))
      if ((norm === alias || norm.startsWith(alias + " ")) && !out.has(field)) out.set(field, i);
  });
  return out;
}

export type SheetRow = { row: number; values: unknown[] };

/** Lapo eilutė → OrderLine. null, jei eilutė tuščia (tik „0“ sumoje arba kontaktų juosta). */
export function rowToLine(r: SheetRow, cols: Map<string, number>, clientKey: string): OrderLine | null {
  const g = (f: string) => (cols.has(f) ? r.values[cols.get(f)!] : "");
  const str = (f: string) => String(g(f) ?? "").trim();
  if (!str("itemName") && !str("manufacturerCode") && !toIsoDate(g("orderDate"))) return null;
  const units = Number(str("units") || 1);
  const unitCents = toCents(g("price"));
  const totalRaw = str("total");
  return {
    orderId: str("orderId"),
    clientKey,
    orderDate: toIsoDate(g("orderDate")),
    productionEnd: toIsoDate(g("productionEnd")),
    manufacturerCode: str("manufacturerCode"),
    itemName: str("itemName"),
    wallMm: str("wallMm"),
    units,
    unitCents,
    totalCents: totalRaw ? toCents(totalRaw) : units * unitCents,
    stage: parseStage(g("stage")),
    comments: str("comments"),
    deliveryAddress: str("deliveryAddress"),
    packedDay: toIsoDate(g("packedDay")),
    loadedDay: toIsoDate(g("loadedDay")),
  };
}
