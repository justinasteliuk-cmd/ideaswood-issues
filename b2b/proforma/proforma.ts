// Išankstinė sąskaita (proforma) serveryje — be Justino kompiuterio ir be Proforma.xlsx.
//
// Krepšelio checkout'as kviečia issueProforma(): numeris rezervuojamas, PDF sugeneruojamas
// iš užšaldytų krepšelio kainų, išsaugomas ir išsiunčiamas klientui. Jokio Google Drive,
// jokio Excel — tik pdf-lib ir šriftas su lietuviškomis raidėmis, todėl veikia VM'e 24/7.
//
// Pinigai visur centais (sveiki skaičiai) — kad sumos sutaptų iki cento.
//
// 2026-10-14: eksportui už ES (UK, NO, CH, AU) — HS kodas ir REX kilmės deklaracija,
// kaip rankinėse proformose (pvz. ALCHEMY DRINKS, Glasgow). Be jos UK pirkėjas moka muitą.

import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { readFileSync } from "node:fs";

export type Company = {
  name: string;
  code: string;
  vatNumber: string;
  eori?: string;
  rex?: string;
  address: string;
  email: string;
  phone?: string;
  bank: { name: string; iban: string; swift: string };
};

export type Buyer = {
  name: string;
  address: string;
  country: string; // ISO-2
  vatNumber?: string;
};

export type Line = { sku: string; name: string; qty: number; unitNetCents: number };

/** Ateina iš vies.ts::vatRateFor — šis modulis tarifo pats nesprendžia. */
export type VatDecision = { rate: 0 | 21; basis: "intra-eu" | "export" | "domestic" | "unverified" };

export type ProformaInput = {
  number: string;
  issuedAt: Date;
  validDays: number;
  seller: Company;
  buyer: Buyer;
  orderRef: string;
  incoterm: string; // EXW / CIF ...
  lines: Line[];
  vat: VatDecision;
  advancePct: number; // 30
  transportNetCents?: number;
  hsCode?: string; // numatyta 94061000 (mediniai surenkami pastatai)
};

export type Totals = {
  netCents: number;
  vatCents: number;
  grossCents: number;
  advanceCents: number;
  balanceCents: number;
};

export function computeTotals(p: Pick<ProformaInput, "lines" | "vat" | "advancePct" | "transportNetCents">): Totals {
  for (const l of p.lines) {
    if (!Number.isInteger(l.unitNetCents) || l.unitNetCents < 0) throw new Error(`bloga kaina: ${l.sku}`);
    if (!Number.isInteger(l.qty) || l.qty <= 0) throw new Error(`blogas kiekis: ${l.sku}`);
  }
  const netCents = p.lines.reduce((s, l) => s + l.qty * l.unitNetCents, 0) + (p.transportNetCents ?? 0);
  const vatCents = Math.round((netCents * p.vat.rate) / 100);
  const grossCents = netCents + vatCents;
  // Avansas ir likutis — nuo sumos su PVM (PVM ir sąskaitos.md).
  const advanceCents = Math.round((grossCents * p.advancePct) / 100);
  return { netCents, vatCents, grossCents, advanceCents, balanceCents: grossCents - advanceCents };
}

export function vatNote(v: VatDecision): string | null {
  if (v.rate === 0 && v.basis === "intra-eu")
    return "Reverse charge — intra-Community supply of goods, VAT Directive 2006/112/EC Art. 138.";
  if (v.rate === 0 && v.basis === "export")
    return "Export of goods outside the EU, VAT Directive 2006/112/EC Art. 146.";
  if (v.basis === "unverified") return "VAT 21% applied: buyer VAT number not confirmed by VIES.";
  return null;
}

/** Kilmės deklaracija (ES–UK TCA ir kt.) — tik eksportui už ES ir tik jei turim REX. */
export function originStatement(seller: Company, v: VatDecision): string | null {
  if (v.basis !== "export" || !seller.rex) return null;
  const ids = [seller.eori && `EORI ${seller.eori}`, seller.rex].filter(Boolean).join(", ");
  return `The exporter of the products covered by this document (Exporter Reference No. ${ids}) declares that, except where otherwise clearly indicated, these products are of European Union preferential origin.`;
}

const eur = (c: number) =>
  (c / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

export async function renderProformaPdf(p: ProformaInput, fontPath: string, boldFontPath = fontPath): Promise<Uint8Array> {
  const t = computeTotals(p);
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(readFileSync(fontPath), { subset: true });
  const bold = await doc.embedFont(readFileSync(boldFontPath), { subset: true });
  doc.setTitle(`Proforma ${p.number}`);
  doc.setAuthor(p.seller.name);

  const W = 595, H = 842, M = 40;
  let page = doc.addPage([W, H]);
  let y = H - M;
  const ink = rgb(0.1, 0.1, 0.1), mute = rgb(0.4, 0.4, 0.4);
  const text = (pg: PDFPage, s: string, x: number, yy: number, size = 9, f: PDFFont = font, color = ink) =>
    pg.drawText(s, { x, y: yy, size, font: f, color });
  const right = (pg: PDFPage, s: string, xr: number, yy: number, size = 9, f: PDFFont = font) =>
    text(pg, s, xr - f.widthOfTextAtSize(s, size), yy, size, f);
  const wrap = (s: string, maxW: number, size = 9) => {
    const out: string[] = [];
    let cur = "";
    for (const w of s.split(/\s+/)) {
      const nx = cur ? cur + " " + w : w;
      if (font.widthOfTextAtSize(nx, size) > maxW && cur) { out.push(cur); cur = w; } else cur = nx;
    }
    if (cur) out.push(cur);
    return out;
  };

  text(page, "PROFORMA INVOICE", M, y, 18, bold); right(page, `No. ${p.number}`, W - M, y, 12, bold);
  y -= 16;
  const valid = new Date(p.issuedAt.getTime() + p.validDays * 86400000);
  right(page, `Date: ${p.issuedAt.toISOString().slice(0, 10)}   Valid until: ${valid.toISOString().slice(0, 10)}`, W - M, y, 9);
  right(page, `Order: ${p.orderRef}   ${p.incoterm}`, W - M, y - 12, 9);
  y -= 34;

  const block = (title: string, rows: string[], x: number) => {
    let yy = y;
    text(page, title, x, yy, 8, bold, mute); yy -= 12;
    for (const r of rows) for (const ln of wrap(r, 240)) { text(page, ln, x, yy); yy -= 11; }
    return yy;
  };
  const s = p.seller, b = p.buyer;
  const y1 = block("SELLER", [s.name, `Company code ${s.code}`, `VAT ${s.vatNumber}`, ...(s.eori ? [`EORI ${s.eori}`] : []), s.address, s.email + (s.phone ? `, ${s.phone}` : "")], M);
  const y2 = block("BUYER", [b.name, b.address, b.country + (b.vatNumber ? `, VAT ${b.vatNumber}` : "")], W / 2 + 10);
  y = Math.min(y1, y2) - 14;

  const cols = { sku: M, name: M + 70, qty: W - M - 170, unit: W - M - 90, sum: W - M };
  const header = (pg: PDFPage) => {
    pg.drawRectangle({ x: M, y: y - 4, width: W - 2 * M, height: 16, color: rgb(0.93, 0.92, 0.9) });
    text(pg, "Article", cols.sku + 2, y, 8, bold); text(pg, "Description", cols.name, y, 8, bold);
    right(pg, "Qty", cols.qty, y, 8, bold); right(pg, "Unit, net", cols.unit, y, 8, bold); right(pg, "Total, net", cols.sum, y, 8, bold);
    y -= 18;
  };
  header(page);
  for (const l of p.lines) {
    const lines = wrap(l.name, cols.qty - cols.name - 40);
    if (y - lines.length * 11 < 190) { page = doc.addPage([W, H]); y = H - M; header(page); }
    text(page, l.sku, cols.sku + 2, y);
    right(page, String(l.qty), cols.qty, y); right(page, eur(l.unitNetCents), cols.unit, y); right(page, eur(l.qty * l.unitNetCents), cols.sum, y);
    for (const ln of lines) { text(page, ln, cols.name, y); y -= 11; }
    y -= 4;
  }
  if (p.transportNetCents) { text(page, "Transport", cols.name, y); right(page, eur(p.transportNetCents), cols.sum, y); y -= 15; }

  y -= 6;
  page.drawLine({ start: { x: W / 2, y: y + 8 }, end: { x: W - M, y: y + 8 }, thickness: 0.5, color: mute });
  const tot = (label: string, v: number, f = font) => { text(page, label, W / 2, y, 9, f); right(page, eur(v), W - M, y, 9, f); y -= 13; };
  tot("Total net", t.netCents);
  tot(`VAT ${p.vat.rate}%`, t.vatCents);
  tot("Total", t.grossCents, bold);
  y -= 4;
  tot(`Advance payment ${p.advancePct}% — due now`, t.advanceCents, bold);
  tot("Balance — before loading", t.balanceCents);
  const note = vatNote(p.vat);
  if (note) { y -= 2; for (const ln of wrap(note, W / 2 - M)) { text(page, ln, W / 2, y, 7, font, mute); y -= 9; } }

  y -= 12;
  text(page, "PAYMENT DETAILS", M, y, 8, bold, mute); y -= 12;
  text(page, `${s.bank.name}   IBAN ${s.bank.iban}   SWIFT ${s.bank.swift}`, M, y); y -= 11;
  text(page, `Payment reference: ${p.number}`, M, y, 9, bold); y -= 16;
  for (const ln of wrap("Production starts when the advance payment is received. Production time is counted from the date the advance is received. Prices are fixed for this order.", W - 2 * M, 8)) {
    text(page, ln, M, y, 8, font, mute); y -= 10;
  }
  const origin = originStatement(s, p.vat);
  if (origin) {
    y -= 6;
    text(page, `HS commodity code: ${p.hsCode ?? "94061000"}`, M, y, 8, bold); y -= 11;
    for (const ln of wrap(origin, W - 2 * M, 8)) { text(page, ln, M, y, 8); y -= 10; }
  }
  return doc.save();
}

// ── Užsakymo būsenos: į gamybą — TIK gavus avansą ─────────────────────────────

export const STAGES = ["awaiting_advance", "production", "ready", "shipped", "delivered", "cancelled"] as const;
export type Stage = (typeof STAGES)[number];

const ALLOWED: Record<Stage, Stage[]> = {
  awaiting_advance: ["production", "cancelled"],
  production: ["ready", "cancelled"],
  ready: ["shipped"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

export function canMove(from: Stage, to: Stage, advanceReceivedCents: number, advanceDueCents: number): { ok: true } | { ok: false; reason: string } {
  if (!ALLOWED[from].includes(to)) return { ok: false, reason: `${from} → ${to} neleidžiama` };
  if (to === "production" && advanceReceivedCents < advanceDueCents)
    return { ok: false, reason: `avansas negautas: gauta ${eur(advanceReceivedCents)} iš ${eur(advanceDueCents)}` };
  return { ok: true };
}

/** Kai įrašomas banko mokėjimas: jei avansas padengtas — užsakymas pats keliauja į gamybą. */
export function stageAfterPayment(stage: Stage, receivedCents: number, advanceDueCents: number): Stage {
  return stage === "awaiting_advance" && receivedCents >= advanceDueCents ? "production" : stage;
}
