# ASTRA STATUS: ideaswood.eu kategorijų aprašymai

Būsena: BLOCKED

- 2026-10-18 · vykdo Mac sesija „ideaswood.eu SEO vykdytojas". Failo nebuvo (Astra rašė, kad sukurtas), todėl sukūriau jį su šia antrašte.
- Tekstai paruošti, bet į svetainę NEĮRAŠYTI: šiai sesijai auto-mode klasifikatorius užblokavo visus gyvus rašymus, kai užduotis atėjo iš kitos sesijos, o ne iš Justino. Užblokuota: WooCommerce kategorijų aprašymų PUT („Modify Shared Resources"), cPanel Fileman („DNS / Domain / Cert Changes"), Merchant Center .eu paskyros atidarymas („PII Data Handling"). Neapeidinėjau.
- Viskas paruošta pritaikyti vienu paleidimu: repo `seo/content/08-category-descriptions.md` (tekstai), `seo/fixes/categories-2026-10-18/` (`cattexts.ts`, `apply-descriptions.ts`, `iw-category-seo.php`).

## Ką radau (svarbu taikant)
1. **„Smart Line" pavyzdys** nėra kategorijos aprašymas (visų .eu kategorijų aprašymai tušti, išskyrus Thermowood). Smart Line „geras aprašymas" yra produktų tekstuose (pvz. /product/salvia-2/: matmenys, sienos, kas įskaičiuota, specifikacijų lentelė), o kategorijų lygmenyje tą patį stilių turi Thermowood. Tekstai parašyti pagal juos: konkretūs skaičiai, kur tinka, be reklaminių frazių.
2. **Du šablonų tipai.**
   - **A, savas Divi body šablonas:** sauna (27), bbq-grill-cabin (23), hot-tubs (26), garden-furniture (82), pergola (72), taip pat sauna/outdoor-sauna. Juose yra įrašytas tekstas ir Blog modulis, kuris išveda „could not be found". WooCommerce aprašymas čia NERODOMAS, kol Blog modulis nepakeistas Text moduliu su Dynamic Content = Category Description. Pastaba: įrašytame sauna šablono tekste teigiama „infrared and steam saunas", o kataloge tokių nėra.
   - **B, standartinis WooCommerce archyvas:** garden-cabins, summer-houses-chalets, sheds-storage-cabins, camping-pods, a-frames, insulated-wooden-houses, villas-country-houses, garages-carports. Aprašymas rodomas virš tinklelio savaime (kaip Thermowood). Šie puslapiai neturi H1, todėl intro prasideda `<h1>`. Tekstui po tinkleliu reikia mu-plugin `iw-category-seo.php`: jis aprašymą skelia per `<!--iw-below-->`, o be jo visas tekstas atsidurtų virš prekių.
3. **Divi šablono eksportas** yra failo atsisiuntimas, o tam reikia Justino leidimo pokalbyje. Kaip atsarginė kopija tinka UpdraftPlus DB kopija (šablonai yra DB), padaryta prieš keitimą.

## Tekstai (13 kategorijų, visos reikšmės iš gyvo katalogo 2026-10-18)
| Kategorija | Focus keyword | Žodžiai |
|---|---|---|
| garden-cabins | garden cabins | 319 |
| summer-houses-chalets | wooden summer house | 266 |
| sheds-storage-cabins | wooden garden sheds | 239 |
| camping-pods | camping pods | 188 |
| bbq-grill-cabin | bbq grill cabin | 188 |
| a-frames | a-frame cabin | 139 |
| insulated-wooden-houses | wooden house kits | 186 |
| villas-country-houses | log house kits | 195 |
| garages-carports | wooden garage kit | 162 |
| sauna | outdoor sauna | 189 |
| hot-tubs | wood fired hot tub | 170 |
| garden-furniture | wooden garden furniture | 149 |
| pergola | wooden pergola | 137 |

Mažesnės nei 300 žodžių: kategorijose su 2–4 modeliais daugiau patikrinamų faktų nėra, o tekstas be faktų būtų tik užpildas.

**Pataisyta pagal katalogą (juodraštis klydo):** sodo nameliai yra tik 44/58/68 mm (28 mm nėra; 50 iš 53 yra 44 mm). Sandėliukai 28 mm (47) ir 44 mm (2). Grilio namelių sienos 45 mm. Medienos atributas daugiausia „Pinewood", kai kur „North spruce / Pinewood".

**Neužpildytos ir išmestos reikšmės:** heat_up_info, heating_time, winter_info, assembly_info, larger_size/what_is_included (Smart Line grindys ir langai įkainojami atskirai, todėl bendro teiginio „rinkinyje yra…" nėra), log/frame build time, energy_info, confirm_plans/drawings, chimney_info, options_info (pergolės šoninės sienos), sleeps (išskyrus insulated pod: 2), loft_info, insulation_options (A-frame), garage_door_info, CE/šildytuvų gamintojai.

**Išmestos nuorodos (puslapių nėra, 404):** UK planning permission guide, delivery to the UK, trade/wholesale page, glamping. Naudotos gyvos: /easy-installation/, /price-my-cabin/, /how-much-does-a-garden-cabin-cost/, /how-much-does-a-garden-sauna-cost/, /wellness-saunas/, /thermowood-cladding-for-timber-buildings/, /pvc-windows-for-log-cabins/, insulation ir Koralan straipsniai, /contact-us/ bei kategorijų tarpusavio nuorodos.

## Patikros (tik skaitymas, atlikta)
- **5. Indeksavimas:** visos 13 kategorijų `index, follow` ir yra `product_cat-sitemap.xml`. Titles ir meta nepakeisti. Focus keyword NENUSTATYTAS (blokuota, įtraukta į apply-descriptions.ts).
- **6. Produktų tekstai (10 pavyzdžių):** 6 iš 10 dalijasi 66–91 % teksto su grupės svetainėmis ir kitais savo produktais, tad tai šabloninis / kopijuotas tekstas:
  - /product/deko-5x3-m/ 91 % = logcabinsfactory.com/product/deko-5x3-m/
  - /product/gustav-a-6x6-m/ 85 % = logcabinsfactory.com/product/gustav-b-6x8-m/
  - /product/garage-3-2x5-2-m/ 91 % = logcabinsfactory.com/product/garage-5x5-m/
  - /product/sauna-barrel-17-m-o-197m/ 82 % = timberescapes.com.au, 71 % = ideaswood.com/product/sauna-l/
  - /product/hot-tub-with-integral-firewood-stove/ 87 % = logcabinsfactory.com/product/double-hot-tub/
  - /product/grill-cabin-6-9m/ 80 % = logcabinsfactory.com/product/grill-cabin-4-5-m²/

  Ploni (30–56 žodžių): /product/alva-3x3-m/, /product/pergola-haga-4x4-m/, /product/iberica-t2-6-36x8-86-m/. Unikalus: /product/pommier-14/. Produktų neperrašinėjau (už ribų).
- **7. Merchant Center:** paskyros YRA: „ideaswood.eu" (766076255) ir „ideaswood.com" (5566361182). .eu paskyros atidarymą blokavo klasifikatorius, todėl feed, shipping ir returns nepatikrinti. .com overview atsidarė pirmas pagal nutylėjimą (283 produktai, 282 approved, „Return cost: Incomplete", įspėjimas „Content API shutdown 2026-08-18 → Merchant API"). .com nėra mano sritis, tik pastaba.
- **8. robots.txt** (gyvas, įdiegtas 10-18): `User-agent: *` be jokių Googlebot, GPTBot, PerplexityBot ar CCBot draudimų. Visi leidžiami. llms.txt praleistas (pasirinktinis).
- **9.** Ekrano nuotraukų po pakeitimo nėra (pakeitimų nebuvo). Ankstesnės: `~/Desktop/ideaswood-seo/screenshots/`.

## Kaip pritaikyti (sesijai, kuriai leidžiama rašyti į ideaswood.eu)
1. UpdraftPlus: DB kopija.
2. `cd ~/.claude/PAI/USER/WORK/ideaswood-seo/repo/seo/fixes/categories-2026-10-18 && bun apply-descriptions.ts` (dry), tada `--apply`. A grupė gaus pilną tekstą, B grupė tik intro.
3. cPanel: `iw-category-seo.php` → `public_html/wp-content/mu-plugins/` (naujas failas, nieko neperrašo; atšaukti = ištrinti failą). Tada `bun apply-descriptions.ts --apply --split` (B grupė gaus tekstą po tinkleliu).
4. Divi Theme Builder: 5 A šablonuose Blog modulį („Explore More Inspiration") pakeisti Text moduliu su Dynamic Content = Category Description.
5. LiteSpeed Purge All; patikrinti `/product-category/garden-cabins/` (H1 + intro virš, gidas po tinkleliu) ir `/product-category/sauna/` („could not be found" nebėra).

## Priedas: „Smart Line Series" modelis (pagal ASTRA-HANDOFF-ideaswood-categories-addendum.md, 2026-10-18)
- URL: https://ideaswood.eu/product-category/smart-line-series/ (ir 5 subkategorijos: smart-line-garden-cabins, -sheds-storage, -garages, -carports, -garden-structures).
- Gyvai patikrinta 2026-10-18 (Store API ir HTML): **šios kategorijos aprašymas TUŠČIAS**, kaip ir visų jos subkategorijų. Teksto nei virš, nei po tinkleliu nėra; 0 žodžių, antraščių nėra, vidinių nuorodų nėra. Vienintelis ilgesnis tekstas puslapyje yra visos svetainės poraštės blurb'as „We are specialist for garden and house projects… slow grown northern Europe wood…", kurio „slow grown" teiginio niekas nepatvirtina (taisyklės pažeidimas, bet tai poraštė, ne kategorija; neperrašiau).
- Todėl kategorijos aprašymo, kurį galima būtų perimti, nėra. „Smart Line" stilių radau Smart Line **produktų** tekstuose (pvz. /product/salvia-2/: matmenys pirmame sakinyje, sienos ir aukščiai, kas įskaičiuota ir kas įkainota atskirai, specifikacijų lentelė, be būdvardžių). Šiuo stiliumi ir Thermowood kategorijos aprašymu (vienintelis netuščias) parašyti 13 tekstų. Jei Justinas turėjo omenyje kitą puslapį (pvz. ideaswood.com ar staging), reikia URL.
- Ledger pastaba: lanes lentelėje Divi šablonas priskirtas Saqib'ui, o Astra 10-18 leido man pakeisti Blog modulį. Nepakeičiau (blokuota), tad konflikto nėra; šablono žingsnį gali daryti bet kuris iš jų.
