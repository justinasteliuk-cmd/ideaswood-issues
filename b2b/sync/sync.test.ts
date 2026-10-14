import { test, expect } from "bun:test";
import { headerMap, rowToLine, toCents, toIsoDate, parseStage, type OrderLine } from "./model";
import { mergeLine } from "./merge";
import { reconcile } from "./reconcile";
import { randomPassword, planLogins } from "./credentials";

// Tikra antraštė ir eilutė iš „30 BM wood (CZ) (truck)“ ORDERS, 2026-10-14
const BM_HEADER = ["Order date", "Approximate Production End Date", "I4P Client identification no", "Manufacturer Code", "Client's identification code \nmust be on the packs!", "Item name \nmust be on the packs!", "wall thickness\n (mm)", "Units", "Price", "Total price", "IdeasPlanner \ncode", "Quality: Premium/Premium+\nno door or window", "Insulation \nRoof or Floor\n or Wall", "Status", "Comments", "Delivery address", "Package height", "Package length", "Pack quantity", "Packed day", "Loaded day", "Order Id"];
const BM_ROW = ["2026 08 19", "2026 10 15", "", "6958", "", "C-43326", "68", "1", "33141", "33141", "C-43326", "", "", "New Order", "Advance paid 2026-08-24 EUR 10 467.00"];
// Senas šablonas: kitokia stulpelių tvarka (yra Discount, „Manucaturer“ su klaida)
const OLD_HEADER = ["Order date", "Approximate Production End Date", "I4P Client identification no", "Manucaturer Code", "Client's identification code \nmust be on the packs!", "Item name \nmust be on the packs!", "wall thickness\n (mm)", "Units", "Price", "Discount", "Total price", "Cabinplanner \ncode", "Quality", "Insulation", "Status", "Comments", "Delivery address", "", "Package height", "Package length", "Pack quantity", "Packed day", "Loaded day", "Order Id"];

const BM = "1ufZt50kcO9LlpoKZ9lCCl4y7YIAxDijPQMhE0Fz18Dc";

test("normalizavimas: sumos, datos, statusai", () => {
  expect(toCents("33141")).toBe(3314100);
  expect(toCents("1,748.00")).toBe(174800);
  expect(toCents("1.748,50 €")).toBe(174850);
  expect(toCents("10 467.00")).toBe(1046700);
  expect(toCents("")).toBe(0);
  expect(Number.isNaN(toCents("ask price"))).toBe(true);
  expect(toIsoDate("2026 08 19")).toBe("2026-08-19");
  expect(toIsoDate("19/08/2026")).toBe("2026-08-19");
  expect(toIsoDate(46253)).toBe("2026-08-19");
  expect(parseStage("New Order")).toBe("awaiting_advance");
  expect(parseStage(" On Production ")).toBe("production");
  expect(parseStage("???")).toBeNull();
  // Tikri statusai iš 44 klientų lapų (2026-10-14)
  expect(parseStage("Ready to ship")).toBe("ready");
  expect(parseStage("08/19/2026 READY FOR DELIVERY")).toBe("ready");
  expect(parseStage("Waiting advance")).toBe("awaiting_advance");
  expect(parseStage("on production")).toBe("production");
  expect(parseStage("Advance paid 07.09 1043eur")).toBeNull();
  expect(parseStage("Paid in full - waiting for remaining parts")).toBeNull();
  expect(parseStage("waiting for drawings confirmation")).toBeNull();
  expect(parseStage("Drawings sent to client")).toBeNull();
});

test("BM wood eilutė perskaitoma pagal antraštę, ne pagal poziciją", () => {
  const l = rowToLine({ row: 5, values: BM_ROW }, headerMap(BM_HEADER), BM)!;
  expect(l).toMatchObject({ orderDate: "2026-08-19", productionEnd: "2026-10-15", manufacturerCode: "6958", itemName: "C-43326", wallMm: "68", units: 1, unitCents: 3314100, totalCents: 3314100, stage: "awaiting_advance", orderId: "" });
  const old = headerMap(OLD_HEADER);
  expect(old.get("manufacturerCode")).toBe(3);
  expect(old.get("total")).toBe(10);
  expect(old.get("stage")).toBe(14);
  expect(old.get("orderId")).toBe(23);
});

test("tuščios eilutės ir kontaktų juosta praleidžiamos", () => {
  const cols = headerMap(BM_HEADER);
  expect(rowToLine({ row: 4, values: ["", "", "", "", "", "", "", "", "", "0"] }, cols, BM)).toBeNull();
  expect(rowToLine({ row: 2, values: ["      Orders: info@ideaswood.eu"] }, cols, BM)).toBeNull();
});

const line = (o: Partial<OrderLine> = {}): OrderLine => ({
  orderId: "IW-1", clientKey: BM, orderDate: "2026-08-19", productionEnd: "2026-10-15", manufacturerCode: "6958", itemName: "C-43326",
  wallMm: "68", units: 1, unitCents: 3314100, totalCents: 3314100, stage: "awaiting_advance", comments: "", deliveryAddress: "",
  packedDay: null, loadedDay: null, ...o,
});

test("sujungimas: lapo pakeitimas keliauja į registrą", () => {
  const base = line({ stage: "production" });
  const m = mergeLine(base, line({ stage: "ready", packedDay: "2026-10-10" }), base, true);
  expect(m.toRegistry.map((c) => [c.field, c.to])).toEqual([["stage", "ready"], ["packedDay", "2026-10-10"]]);
  expect(m.conflicts).toEqual([]);
});

test("sujungimas: registro pakeitimas keliauja į lapą", () => {
  const base = line();
  const m = mergeLine(line({ stage: "production" }), base, base, true);
  expect(m.toSheet).toEqual([{ orderId: "IW-1", field: "stage", from: "awaiting_advance", to: "production" }]);
});

test("sujungimas: kainos pakeitimas lape grąžinamas", () => {
  const base = line();
  const m = mergeLine(base, line({ unitCents: 100, totalCents: 100 }), base, true);
  expect(m.toRegistry).toEqual([]);
  expect(m.toSheet.map((c) => c.field)).toEqual(["unitCents", "totalCents"]);
});

test("sujungimas: „On Production“ be avanso — netaikoma, grąžinama, konfliktas ataskaitoje", () => {
  const base = line();
  const m = mergeLine(base, line({ stage: "production" }), base, false);
  expect(m.toRegistry).toEqual([]);
  expect(m.toSheet[0]).toMatchObject({ field: "stage", to: "awaiting_advance" });
  expect(m.conflicts[0].reason).toContain("avansas");
});

test("sujungimas: būsena atgal netaikoma; atšaukimas leidžiamas", () => {
  const base = line({ stage: "ready" });
  expect(mergeLine(base, line({ stage: "production" }), base, true).toRegistry).toEqual([]);
  expect(mergeLine(base, line({ stage: "cancelled" }), base, true).toRegistry[0]).toMatchObject({ field: "stage", to: "cancelled" });
});

test("sujungimas: pakeista abiejose vietose → konfliktas, niekas neperrašoma", () => {
  const base = line({ comments: "a" });
  const m = mergeLine(line({ comments: "registras" }), line({ comments: "lapas" }), base, true);
  expect(m.toRegistry).toEqual([]);
  expect(m.toSheet).toEqual([]);
  expect(m.conflicts).toHaveLength(1);
  expect(m.newSnapshot.comments).toBe("a");
});

test("patikros: BM wood atvejis — avansas tik komentare", () => {
  const r = line({ comments: "Advance paid 2026-08-24 EUR 10 467.00" });
  const f = reconcile({
    clients: [{ clientKey: BM, name: "30 BM wood (CZ)", active: true, email: "info@bmwood.cz", hasLogin: true }],
    registry: [r], sheets: [r], cockpit: [r],
    payments: [{ orderId: "IW-1", advanceCents: 0, advanceDueCents: 994230 }],
  });
  expect(f.map((x) => x.code)).toEqual(["ADVANCE_IN_COMMENT_ONLY"]);
});

test("patikros: visos trys vietos sutampa → 0 radinių", () => {
  const r = line({ stage: "production" });
  expect(reconcile({
    clients: [{ clientKey: BM, name: "BM", active: true, email: "info@bmwood.cz", hasLogin: true }],
    registry: [r], sheets: [r], cockpit: [r], payments: [{ orderId: "IW-1", advanceCents: 994230, advanceDueCents: 994230 }],
  })).toEqual([]);
});

test("patikros: trūksta lape, skiriasi cockpit'e, nėra prisijungimo, gamyba be avanso", () => {
  const r = line({ stage: "production" });
  const codes = reconcile({
    clients: [{ clientKey: BM, name: "BM", active: true, email: "info@bmwood.cz", hasLogin: false }, { clientKey: "X", name: "Icesmart", active: false, email: "a@b.c", hasLogin: true }],
    registry: [r], sheets: [], cockpit: [line({ stage: "ready" })], payments: [],
  }).map((x) => x.code);
  expect(codes).toEqual(expect.arrayContaining(["NO_LOGIN", "LOGIN_INACTIVE", "MISSING_IN_SHEET", "COCKPIT_DIFFERS", "PRODUCTION_WITHOUT_ADVANCE", "CLIENT_TOTALS"]));
});

test("slaptažodžiai: atsitiktiniai, be painių simbolių, saugomas tik hash'as", async () => {
  const set = new Set(Array.from({ length: 2000 }, () => randomPassword()));
  expect(set.size).toBe(2000);
  for (const p of set) expect(p).toMatch(/^[a-km-np-zA-HJ-NP-Z2-9]{16}$/);
  const { create, skipped } = await planLogins([
    { clientKey: "a", email: "Info@BMwood.cz ", active: true, hasLogin: false },
    { clientKey: "b", email: "info@bmwood.cz", active: true, hasLogin: false },
    { clientKey: "c", email: null, active: true, hasLogin: false },
    { clientKey: "d", email: "x@y.z", active: false, hasLogin: false },
    { clientKey: "e", email: "e@y.z", active: true, hasLogin: true },
  ]);
  expect(create.map((c) => c.email)).toEqual(["info@bmwood.cz"]);
  expect(create[0].hash).toStartWith("$argon2id$");
  expect(await Bun.password.verify(create[0].password, create[0].hash)).toBe(true);
  expect(skipped.map((s) => s.clientKey)).toEqual(["b", "c", "d", "e"]);
});
