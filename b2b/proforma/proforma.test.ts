import { test, expect } from "bun:test";
import { writeFileSync, readFileSync } from "node:fs";
import { computeTotals, renderProformaPdf, canMove, stageAfterPayment, vatNote, originStatement, type ProformaInput, type Company } from "./proforma";

const FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf";
const BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";
const COMPANY: Company = JSON.parse(readFileSync(new URL("./company.json", import.meta.url), "utf8"));

const sample = (over: Partial<ProformaInput> = {}): ProformaInput => ({
  number: "PF-2026-0001",
  issuedAt: new Date("2026-10-07T10:00:00Z"),
  validDays: 14,
  seller: COMPANY,
  buyer: { name: "B&M Wood s.r.o.", address: "Strání, Czech Republic", country: "CZ", vatNumber: "CZ00000000" },
  orderRef: "IW-2026-0043",
  incoterm: "EXW Lithuania",
  lines: [
    { sku: "S26199", name: "Alva 3x4, 44 mm — rąstinis namelis su ąžuolinėmis durimis (čęėįšųūž)", qty: 1, unitNetCents: 177000 },
    { sku: "GC2501", name: "Grill Cabin 4,5 m²", qty: 2, unitNetCents: 264000 },
  ],
  vat: { rate: 0, basis: "intra-eu" },
  advancePct: 30,
  ...over,
});

const ibanOk = (iban: string) => {
  const s = iban.replace(/\s+/g, "");
  const r = (s.slice(4) + s.slice(0, 4)).replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  return [...r].reduce((m, d) => (m * 10 + Number(d)) % 97, 0) === 1;
};

test("company.json: visi rekvizitai, IBAN kontrolinė suma teisinga", () => {
  for (const k of ["name", "code", "vatNumber", "address", "email"] as const) expect(COMPANY[k]).toBeTruthy();
  expect(COMPANY.vatNumber).toBe("LT" + "100009176917");
  expect(COMPANY.bank.swift).toBe("HABALT22");
  expect(ibanOk(COMPANY.bank.iban)).toBe(true);
});

test("sumos: intra-EU 0 %", () => {
  const t = computeTotals(sample());
  expect(t).toEqual({ netCents: 705000, vatCents: 0, grossCents: 705000, advanceCents: 211500, balanceCents: 493500 });
});

test("sumos: LT 21 %, avansas nuo sumos su PVM, likutis + avansas = viso", () => {
  const t = computeTotals(sample({ vat: { rate: 21, basis: "domestic" }, transportNetCents: 45000 }));
  expect(t.netCents).toBe(750000);
  expect(t.vatCents).toBe(157500);
  expect(t.grossCents).toBe(907500);
  expect(t.advanceCents).toBe(272250);
  expect(t.advanceCents + t.balanceCents).toBe(t.grossCents);
});

test("blogi duomenys atmetami, ne nuryjami", () => {
  expect(() => computeTotals(sample({ lines: [{ sku: "X", name: "x", qty: 1, unitNetCents: 10.5 }] }))).toThrow();
  expect(() => computeTotals(sample({ lines: [{ sku: "X", name: "x", qty: 0, unitNetCents: 100 }] }))).toThrow();
});

test("PVM pastabos", () => {
  expect(vatNote({ rate: 0, basis: "intra-eu" })).toContain("Art. 138");
  expect(vatNote({ rate: 0, basis: "export" })).toContain("Art. 146");
  expect(vatNote({ rate: 21, basis: "domestic" })).toBeNull();
});

test("kilmės deklaracija: tik eksportui už ES", () => {
  expect(originStatement(COMPANY, { rate: 0, basis: "export" })).toContain("LTREXLTMM0000202624");
  expect(originStatement(COMPANY, { rate: 0, basis: "export" })).toContain("EORI LT302555740");
  expect(originStatement(COMPANY, { rate: 0, basis: "intra-eu" })).toBeNull();
  expect(originStatement({ ...COMPANY, rex: undefined }, { rate: 0, basis: "export" })).toBeNull();
});

test("į gamybą tik gavus avansą", () => {
  expect(canMove("awaiting_advance", "production", 0, 211500).ok).toBe(false);
  expect(canMove("awaiting_advance", "production", 211499, 211500).ok).toBe(false);
  expect(canMove("awaiting_advance", "production", 211500, 211500).ok).toBe(true);
  expect(canMove("awaiting_advance", "shipped", 999999, 1).ok).toBe(false);
  expect(stageAfterPayment("awaiting_advance", 211500, 211500)).toBe("production");
  expect(stageAfterPayment("awaiting_advance", 100000, 211500)).toBe("awaiting_advance");
});

test("PDF sugeneruojamas su lietuviškomis raidėmis ir daug eilučių", async () => {
  const lines = Array.from({ length: 60 }, (_, i) => ({ sku: `S${26000 + i}`, name: `Priedas Nr. ${i} — šiltinimas, langų dėžės`, qty: 1, unitNetCents: 1000 + i }));
  const pdf = await renderProformaPdf(sample({ lines }), FONT, BOLD);
  expect(pdf.byteLength).toBeGreaterThan(5000);
  expect(Buffer.from(pdf.slice(0, 5)).toString()).toBe("%PDF-");
  writeFileSync("sample-proforma.pdf", await renderProformaPdf(sample(), FONT, BOLD));
});

test("PDF eksportui į UK — su HS kodu ir REX", async () => {
  const uk = sample({
    buyer: { name: "ALCHEMY DRINKS WHOLESALE LTD", address: "24 Carlyle Ave, Hillington, Glasgow G52 4XX", country: "GB" },
    incoterm: "DAP Glasgow",
    vat: { rate: 0, basis: "export" },
  });
  const pdf = await renderProformaPdf(uk, FONT, BOLD);
  expect(pdf.byteLength).toBeGreaterThan(5000);
  writeFileSync("sample-proforma-uk.pdf", pdf);
});
