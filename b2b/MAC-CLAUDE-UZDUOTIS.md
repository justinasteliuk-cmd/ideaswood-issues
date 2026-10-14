# B2B portalas — diegimo užduotis Mac Claude / Saqib (2026-10-14)

Tęsinys: Drive `DIEGIMAS-RUNBOOK.md`. Šią užduotį paruošė debesies sesija: ji **neturi prieigos** prie VM `iw-registry`
ir portalo kodo, todėl viskas, ką galima padaryti be jų, jau padaryta ir ištestuota šiame aplanke.
Kiekvienas žingsnis turi priėmimo patikrą: be jos žingsnis nelaikomas atliktu. Diegimo 5 žingsnis
(`SERVERIAI ir diegimas.md`) privalomas po kiekvieno kodo pakeitimo.

## Paruošta šiame aplanke (`b2b/`)

| Failas | Kas | Patikrinta |
|---|---|---|
| `proforma/company.json` | Mūsų rekvizitai iš 2 proformų (6140 ir 2026-09-17), sutampa | IBAN kontrolinė suma ✅ |
| `proforma/proforma.ts` | Drive versija **+ EORI/REX kilmės deklaracija ir HS kodas** eksportui už ES (UK, NO, CH, AU) | `bun test` 9/9 ✅ |
| `proforma/proforma.test.ts` | 6 seni testai + company.json + UK eksporto PDF | ✅ |
| `pricebook/partnerPrice.ts` | Apvalinimo pataisa (3a), lygiai kaip lapo `ROUND` | 100 000 atvejų, 0 nesutapimų (senas kodas klydo 400 kartų) ✅ |
| `registry/registry-2026-10-14-papildymas.sql` | INSERT trigeris (spraga 10-07 faile) + icesmart + saugus užsakymų grąžinimas | bun:sqlite, 4/4 ✅ |

**Kodėl REX svarbu:** be kilmės deklaracijos UK pirkėjas (pvz. ALCHEMY DRINKS, Glasgow) moka muitą už medinius
namelius. Rankinės proformos ją turi, o Drive `proforma.ts` neturėjo, todėl automatinė proforma UK klientams
būtų blogesnė už rankinę.

## Tvarka (pagal žalą verslui)

### 1. SKUBIAUSIA: runbook §7, partneris mato mažmenines kainas
Pažeidžia pagrindinę portalo taisyklę ir stabdo užsakymus (mygtuko nesimato). Daryti pirmiausia, visa §7 apimtimi.
Patikra: 1280×800 ir 375 px, mygtukas matomas be slinkimo; `client` vartotojui puslapyje nėra ideaswood.eu
mažmeninės kainos; `bun qa.ts` praeina.

### 2. Registras: runbook §2, plius papildymas
```
gcloud compute ssh iw-registry --zone europe-north1-b
sudo sqlite3 /var/lib/iw-registry/registry.sqlite ".backup /tmp/pre-20261014.sqlite"
sqlite3 /var/lib/iw-registry/registry.sqlite ".schema orders" ".schema payments" ".schema clients" ".schema b2b_partners"
sqlite3 /var/lib/iw-registry/registry.sqlite "SELECT id,name,country,vat_number FROM clients WHERE id IN (6,8,9,14,15)"
```
- **Prieš paleidžiant patikrinti, kad id=8 tikrai Andrej Kováč.** 10-07 failas tai laiko savaime suprantamu.
- Pirma ant kopijos `/tmp/pre-20261014.sqlite`: `registry-2026-10-07.sql`, tada `registry-2026-10-14-papildymas.sql`.
  Tik tada ant tikros DB.
- Icesmart: atkomentuoti tą eilutę, kurios stulpelis yra `.schema`. Nespėlioti.
- „production be avanso“: sąrašą parodyti Justinui; `UPDATE` tik su patvirtintais id (avansas galėjo būti gautas ne per `payments`).
- Po to: VIES patikra Kováč (SK).

Patikra: `SELECT COUNT(*) FROM clients WHERE id IN (6,14,15)` = 0; `INSERT`/`UPDATE` į `production` be avanso → klaida;
icesmart prisijungti nebegali, jo seni užsakymai matomi admin pusėje.

### 3. Kainos portale = kainos lapuose (runbook §3)
- **a:** pakeisti `pricebook.ts::partnerPrice` kūną į `b2b/pricebook/partnerPrice.ts` versiją, testą įdėti į `qa.ts`.
- **b, c, e:** kaip runbook. §3e palyginimo testą paleisti iškart po a–c: lapai jau sutvarkyti 10-14.
- **d (garažų SKU S26230/S26223/S26273):** kainas paimti iš ideasplanner.com shop (iš debesies užblokuota).
  `ideasplanner` repozitorijoje (main, dev ir kt. šakos) šių SKU nėra, tai patikrinta.

Patikra: 0 nesutapimų portalas ↔ lapai, `bun qa.ts` 189+ praeina.

### 4. Proforma serveryje (runbook §4)
Imti `b2b/proforma/proforma.ts`, **ne** Drive versiją (Drive neturi REX). `company.json` → `/etc/iw-registry/company.json`
(chmod 640, savininkas tas, kuris paleidžia servisą). `ProtectSystem=strict`: `/var/lib/iw-registry/docs` turi būti `ReadWritePaths`.
Checkout'e `vat.basis === "export"` ne ES šalims (GB, NO, CH, AU…), kad atsirastų kilmės deklaracija.

Patikra: kaip runbook §4, plius testinis GB partneris: PDF su „European Union preferential origin“ ir HS 94061000.

### 5. Paveikslėliai ir renderių kilmė (runbook §8), tada kliento patogumai (§5 sąrašas)

## Laukia Justino sprendimų (blokuoja „ask price“)
Iš `TRUKSTAMOS-SAVIKAINOS.md`: koeficientai **sauna cabins, square sauna, PVC, elektriniai kaitintuvai container (1,50 ar 1,30)**,
taip pat vandens filtro savikaina (truck 195 / container 150, kuri teisinga). Tai 5 skaičiai, jie atrakina prekes, kurias partneriai jau mato.
