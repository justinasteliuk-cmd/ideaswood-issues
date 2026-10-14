// Partnerio kaina = savikaina × koeficientas, suapvalinta iki euro TAIP PAT, kaip Google lapuose (ROUND).
//
// Klaida, kurią taiso (DIEGIMAS-RUNBOOK 3a): Math.round(2590 * 1.15) = 2978, nes
// 2590 * 1.15 = 2978.4999999999995 dvejetainėje aritmetikoje. Lapas rodo 2979.
// Todėl skaičiuojam sveikais skaičiais: koeficientas → šimtosios, pusė kelia aukštyn.
//
// Įdėti vietoje esamos pricebook.ts::partnerPrice (signatūra ta pati).

export function partnerPrice(costNet: number, factor: number): number {
  return Math.floor((Math.round(costNet * Math.round(factor * 100)) + 50) / 100);
}
