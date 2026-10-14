# Klientų prisijungimai + užsakymų sinchronizacija: registras ↔ klientų lapai ↔ cockpit

Justino užduotis (2026-10-14): kiekvienam aktyviam klientui sukurti prisijungimą su atsitiktiniu slaptažodžiu ir suvesti jo
aktyvius užsakymus. Jie turi matytis ir cockpit'e, ir kliento lape, viskas sinchronizuojama, ir yra kelios patikros vietos.

Logika (`model.ts`, `merge.ts`, `reconcile.ts`, `credentials.ts`) parašyta ir ištestuota (`bun test`, 13/13).
Serveryje lieka prijungti 3 adapterius (registro DB, Sheets API, cockpit `push.php`) ir paleisti.

## Principas

- **Tiesos šaltinis: registras** (`registry.sqlite`). Lapai ir cockpit yra jo vaizdai, bet vadybininkai toliau gali dirbti lapuose.
- **Kas ką keičia:**
  - Lape keičiama: Status, Approx. production end, Comments, Delivery address, Packed day, Loaded day. Šie laukai keliauja į registrą.
  - Tik registre keičiama: kaina, kiekis, prekė, data. Pakeitimas lape grąžinamas ir įrašomas į žurnalą.
- **Trijų versijų sujungimas:** registras, lapas ir paskutinė sinchronizuota būsena. Jei pakeitė viena pusė, jos reikšmė laimi.
  Jei pakeitė abi pusės skirtingai, tai konfliktas: niekas neperrašoma, sprendžia žmogus.
- **Avanso taisyklė galioja ir lape:** „On Production“ be avanso netaikoma, lape grąžinama „Awaiting advance“, o atvejis patenka į ataskaitą.
- **Kliento raktas** yra jo lapo `spreadsheetId`, **užsakymo raktas** – stulpelis „Order Id“ lape (įrašo sinchronizacija).

## Faktinė padėtis (44 aktyvūs lapai, nuskaityta 2026-10-14)

Sąrašai yra **privačiame Drive**, aplanke šalia runbook'o. Viešoje repozitorijoje jų nėra: tai klientų el. paštai ir sumos.
- `B2B prisijungimai — aktyvūs klientai 2026-10-14`: lapo id, įmonė, šalis, el. paštas, aktyvūs užsakymai ir €, prisijungimo būsena.
- `B2B lapų radiniai prieš importą 2026-10-14`: eilutės, kurias reikia pataisyti lape prieš importą.

| | |
|---|---|
| Aktyvių užsakymų | 44, ~316 tūkst. € (9 klientai) |
| Prisijungimą galima kurti dabar | 15 klientų (tik 2 iš jų turi aktyvių užsakymų: BM wood, AMR) |
| El. paštas rastas laiškuose, reikia Justino patvirtinimo | 7 (LH Plan+Bau, Housinger, Pinhomel ir kt.) |
| El. pašto nėra niekur | 21, tarp jų **Udis 85 tūkst. €, Corsica, Tecno House, Kováč** |
| Avansas sumokėtas, bet statusas „New Order“ | AMR ×5, BM wood, LH Plan+Bau (23 843 €). **Patikrinti, ar gamyba pradėta** |

**Lapų savininkai trys:** justinas.teliuk@ (15), laurai.gudelytei@ (26), logcabinsfactory.com@ (3).
Sinchronizacijos paslaugos paskyrai reikia **Editor** teisės į visus 44 lapus. Kitaip ji parašys tik į 15.
Patikra: `reconcile` turi matyti 44 lapus, ne mažiau.

## Žingsniai serveryje (Mac Claude / Saqib)

### 0. Schema (pirma pažiūrėti, nespėlioti)
```
sqlite3 /var/lib/iw-registry/registry.sqlite ".schema clients" ".schema b2b_partners" ".schema orders" ".schema payments"
```
Jei trūksta, pridėti (tik ADD COLUMN, nieko netrinti):
```sql
ALTER TABLE clients ADD COLUMN sheet_id TEXT;                 -- kliento lapo spreadsheetId, UNIQUE
CREATE UNIQUE INDEX IF NOT EXISTS clients_sheet_id ON clients(sheet_id);
ALTER TABLE b2b_partners ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 1;
CREATE TABLE IF NOT EXISTS sync_snapshots (order_id TEXT PRIMARY KEY, line_json TEXT NOT NULL, synced_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sync_log (id INTEGER PRIMARY KEY, at TEXT NOT NULL, direction TEXT NOT NULL, -- to_registry | to_sheet | conflict
  client_key TEXT, order_id TEXT, field TEXT, old TEXT, new TEXT, reason TEXT);
CREATE TABLE IF NOT EXISTS reconcile_runs (id INTEGER PRIMARY KEY, at TEXT NOT NULL, errors INTEGER, warns INTEGER, findings_json TEXT);
```

### 1. Importas: lapai → registras (vienkartinis, su sausu paleidimu)
- Kiekvienam aktyviam lapui (sąrašas `active-clients.csv`): `clients.sheet_id` susiejamas pagal pavadinimą. **Neatitikimus rodyti Justinui, nespėlioti.**
- ORDERS eilutės, kurių statusas ne „Delivered“ ir kurios neturi Order Id: sukurti `orders`, tada Order Id įrašyti atgal į lapą.
- Sausas paleidimas (`--dry-run`) išveda: kiek klientų, kiek eilučių, sumas pagal klientą. Rodyti Justinui prieš tikrą paleidimą.
- `advance_due_cents` = 30 % sumos su PVM. Jau gauti avansai (pvz. komentaras „Advance paid …“) įvedami į `payments`
  **tik pagal banko išrašą**, ne pagal komentarą.

### 2. Prisijungimai
- `planLogins()`: tik aktyviems klientams, tik tiems, kurie dar neturi prisijungimo; esami slaptažodžiai nekeičiami.
- Registre saugomas tik argon2id hash'as, `must_change_password = 1`.
- **Atviras slaptažodis negali patekti į Drive, Git, Slack ar CSV.** Jis siunčiamas tik laišku klientui (`welcomeEmail()`)
  per tą patį SMTP kaip proformos. Siuntimo faktas įrašomas į `notifications`.
- Pirmiausia vienas bandomasis klientas (pvz. B&M Wood): Justinas pats prisijungia jo vardu (impersonate) ir patikrina,
  ar mato tik jo užsakymus.

### 3. Sinchronizacija kas 5 min (`iw-sync.timer`)
1. Perskaityti visus aktyvius lapus (`spreadsheets.values.batchGet`, `UNFORMATTED_VALUE`), eilutes pagal antraštę (`headerMap`).
2. Kiekvienam užsakymui: `mergeLine(registras, lapas, snapshot, avansasGautas)`.
3. Pritaikyti `toRegistry` per tą patį kodą kaip portalas (taip suveikia ir DB trigeris). Klaida reiškia konfliktą, ne tylą.
4. Pritaikyti `toSheet` per `values.batchUpdate` (vienas užklausimas vienam lapui).
5. Įrašyti `newSnapshot` ir `sync_log`.
6. Sugeneruoti `data-orders.json` ir nusiųsti į cockpit per `push.php` (`X-Cockpit-Key`).
7. Paleisti `reconcile()` ir įrašyti į `reconcile_runs`.

Lapo Status validacijos sąrašą papildyti: Awaiting advance, Shipped, Cancelled. „New Order“ ir toliau suprantamas.

### 4. Patikros vietos (5 nepriklausomos)

| # | Kur | Ką rodo | Kas žiūri |
|---|---|---|---|
| 1 | **Importo ataskaita** (sausas paleidimas) | kiekvienam klientui: eilučių skaičius ir suma lape = registre | Justinas, prieš importą |
| 2 | **Kliento lapas**, papildomas skirtukas `SYNC` | paskutinės sinchronizacijos laikas, aktyvių užsakymų skaičius ir suma, „✓ sutampa su portalu“ arba klaidų sąrašas | klientas ir vadybininkas |
| 3 | **Cockpit**, juosta „Sinchronizacija“ | kiekvienam klientui: registras / lapas / cockpit (skaičius ir €), raudona, jei nesutampa; konfliktų sąrašas su mygtuku „pasirinkti registro / lapo reikšmę“ | Justinas, Laura |
| 4 | **Portalas** „Mano užsakymai“ | tie patys užsakymai ir suma; apačioje „Atnaujinta HH:MM“ | klientas |
| 5 | **Naktinis `reconcile`** 03:00 (po atsarginės kopijos 02:30) | visos taisyklės (`reconcile.ts`); bet kokia `error` siunčiama laišku Justinui | automatiškai |

`reconcile.ts` tikrina: aktyvus klientas be prisijungimo arba be el. pašto; neaktyvus klientas su veikiančiu prisijungimu;
užsakymas, kurio trūksta registre, lape arba cockpit'e; bet kurio lauko skirtumas; gamyba be avanso; avansas gautas, bet užsakymas
dar laukia; avansas tik komentare; neįrašyta avanso suma; kiekis × kaina ≠ suma; kliento kontrolinės sumos trijose vietose.

### 5. Priėmimas (be šito nelaikoma atlikta)
1. `bun test` sync aplanke: 13/13.
2. Sausas importas: Justinas patvirtina skaičius.
3. Bandomasis klientas: prisijungia su laikinu slaptažodžiu, priverstinai pasikeičia, mato tik savo užsakymus.
4. Lape pakeisti Status į „Ready“: per ≤5 min matosi portale ir cockpit'e. Portale pakeisti būseną: per ≤5 min matosi lape.
5. Lape pakeisti kainą: per ≤5 min grąžinama, įrašas `sync_log`.
6. Lape nustatyti „On Production“ be avanso: grąžinama ir rodoma cockpit'e kaip konfliktas.
7. `reconcile`: 0 error (arba kiekvieną likusį Justinas pažymėjo kaip žinomą).
8. Diegimo 5 žingsnis (`SERVERIAI ir diegimas.md`).
