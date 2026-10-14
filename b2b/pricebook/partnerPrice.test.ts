import { test, expect } from "bun:test";
import { partnerPrice } from "./partnerPrice";

// Google Sheets ROUND(x,0): pusė — aukštyn. Skaičiuojam tiksliai (BigInt), kad etalonas pats neklystų.
const sheetsRound = (cost: number, factorPct: number) => {
  const c = BigInt(Math.round(cost * 100)) * BigInt(factorPct); // ×10 000
  return Number((c + 5000n) / 10000n);
};

test("runbook pavyzdys: 2590 × 1,15 = 2979", () => {
  expect(Math.round(2590 * 1.15)).toBe(2978); // sena klaida
  expect(partnerPrice(2590, 1.15)).toBe(2979);
});

test("visi naudojami koeficientai × savikainos 1…20 000 € sutampa su lapu", () => {
  let oldBugs = 0;
  for (const f of [1.15, 1.2, 1.25, 1.3, 1.5])
    for (let cost = 1; cost <= 20000; cost++) {
      const want = sheetsRound(cost, Math.round(f * 100));
      expect(partnerPrice(cost, f)).toBe(want);
      if (Math.round(cost * f) !== want) oldBugs++;
    }
  console.log(`senas Math.round klydo ${oldBugs} kartų iš 100 000`);
});
