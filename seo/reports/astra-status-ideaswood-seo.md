# ASTRA STATUS: ideaswood.eu SEO įgyvendinimas

Būsena: DONE

- 2026-10-16 · vykdė Mac sesija „ideaswood.eu SEO vykdytojas" (paskyrė Astra). Visos 4 fazės įvykdytos arba užrašytos kaip praleistos su priežastimi.
- Pilna ataskaita (EN, debesų sesijai): lokaliame repo `~/.claude/PAI/USER/WORK/ideaswood-seo/repo/seo/reports/implementation-2026-10-16.md`, šaka `claude/ideaswood-seo-audit-8r34oj`. Push į GitHub: žr. pabaigą.
- Atsarginės kopijos prieš keitimus: UpdraftPlus DB 2026-10-16 10:01 (serverio laiku) + pilna kopija 2026-10-15. Nustatymų ir turinio „prieš" kopijos: `~/Desktop/ideaswood-seo/backup/`. Ekrano nuotraukos prieš/po: `~/Desktop/ideaswood-seo/screenshots/`.
- Nekartota (padaryta Dispatch 09-26/29): Organization schema, noindex featured/tag/author, sitemap pateiktas GSC.

## PageSpeed prieš / po (mobile, Lighthouse 12 vietiškai; PSI API kvota buvo išnaudota; INP lauko duomenų svetainė neturi)

| Puslapis | | Score | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|
| / | prieš | 37 | 17,5 s | 0,102 | 1 200 ms | 3,2 s |
| / | po (2 paleidimai) | 39 / 57 | 23,3 / 13,9 s | 0 / 0,027 | 670 / 470 ms | 7,0 / 2,0 s |
| /product/alma-7x8-m/ | prieš | 8 | 25,7 s | 1,743 | 1 850 ms | 2,9 s |
| /product/alma-7x8-m/ | po (2 paleidimai) | 23 / 27 | 11,9 / 12,2 s | 1,13 | 520 / 390 ms | 2,7 / 2,6 s |

Lab LCP/FCP labai svyruoja. Stabilu: pagrindinio CLS ~0, TBT perpus mažesnis, produkto LCP 25,7 → ~12 s. Likęs produkto CLS visas kyla iš Lepton Bridge galerijos (JS įterpimas). CSS rezervaciją bandžiau du kartus, poveikio nebuvo, todėl ją pašalinau.

„Blokai prieš paveikslėlius" = LiteSpeed lazy-load pilkas 1×1 GIF placeholderis. CSP nekaltas, svetainė jo neturi.

## Pakeitimų žurnalas (visi 2026-10-16)

| URL / vieta | Buvo | Tapo |
|---|---|---|
| LiteSpeed › Add Missing Sizes | OFF | ON |
| LiteSpeed › Responsive Placeholder | OFF (pilkas GIF) | ON (teisingo dydžio, beveik permatomas) |
| LiteSpeed › Viewport Images + cron | OFF | ON |
| LiteSpeed › Lazy Load Image Excludes | tuščia | `ideas-wood-logo`, `eco-vs-pre` |
| Customizer CSS ir Divi › Integration › head | — | galerijos CSS pridėtas, poveikio nebuvo, PAŠALINTAS (abu kaip buvę) |
| Rank Math Redirections (CSV importas) | 0 redirectų, senos kategorijos 404 | 34 šaltiniai → 19 redirectų (301, vienu šuoliu). Visi GSC puslapiai su parodymais dabar baigiasi 200. Sąrašas `repo/seo/fixes/06b-redirects-applied-2026-10-16.csv` |
| /x/ (įrašas 13186, 12 žodžių dublikatas) | 200 | 301 → Koralan straipsnis (įrašas NEIŠTRINTAS) |
| /eu-project/ | index | noindex, follow (paliktas gyvas) |
| Rank Math title separatorius | `-` | `\|` |
| Rank Math šablonai (pages, posts, products, product_cat, category) | „… - ideaswood.eu" | „… \| IdeasWood" |
| SEO title + meta: 12 puslapių/įrašų + 12 gyvų kategorijų | pvz. „Buy Welness Sauna in UK - ideaswood.eu" | pagal fixes/04, pritaikyta naujiems kategorijų slug'ams, be nepatikrinamų teiginių. Žurnalas `repo/seo/reports/titles-meta-log-2026-10-16.tsv` |
| SEO title + meta: 24 produktai (16 iš 04b + 8 su „Buy … in UK") + 3 grąžinti į šabloną | žr. žurnalą | faktai iš gyvų produkto atributų; kainos iš meta išmestos (kainas keičia kita sesija). Žurnalas `repo/seo/reports/product-titles-log-2026-10-16.tsv` |
| /how-much-does-a-garden-cabin-cost/ | 440 žodžių | + skyrius „Price by wall thickness" (170 modelių, 28/44/58/68 mm, kainos iš gyvo katalogo) |
| WP juodraštis 18344 (NEPUBLIKUOTAS) | — | /wellness-saunas/ perrašymas su katalogo faktais; prekybos faktai palikti `[CONFIRM]` |
| Priedų nuotraukos: naujas įskiepis „IdeasWood Product Options" (WCPA pakaitalas) — **DAR NE GYVAI**, laukia Saqibo staging ir Justino leidimo | WCPA krauna originalus (bitumen 4,7–8,2 MB), puslapis ~104 MB | Kortelėse tik WP miniatiūros + `srcset` (150/300/768 px; originalas išmestas iš `srcset`), `loading=lazy`, `width/height`; pilno dydžio „large" (1024 px) tik atidarius padidinimą. Vietinis matavimas: Alma 7×8 priedų nuotraukos 0,77 MB (78 vnt.), Trento 0,26 MB; bitumo kortelė 19 KB vietoj 4,8 MB. **Išmatuoti iš naujo, kai Saqib įdiegs ir išjungs WCPA.** Kodas: `01 B2B partneriu portalas/iw-product-options/` |

## GSC ir GA4
- GSC eksportas: `~/Desktop/ideaswood-seo/gsc-{query,page,country}-2026-07-16_2026-10-15.csv` + `gsc-sitemaps-2026-10-16.json`. 3 mėn.: 22 paspaudimai, 5 784 parodymai, vid. pozicija 68,3. Sitemap perskaitytas 10-15, be klaidų. Indeksavimo ataskaitos API nėra (naujausias eksportas 09-26: 62/325).
- GA4: tagas vienas (Site Kit ir GTM dalijasi gtag, 1 page_view per puslapį). Raktiniai įvykiai apibrėžti, bet per 30 d. **phone_click, email_click ir generate_lead = 0**. GTM trigeris suveikia (`gtm.linkClick`), tačiau GA4 užklausos nėra. Reikia patikrinti GTM tagus; Tag Manager API prieigos neturiu. add_to_cart sąmoningai ne raktinis (ga4-fix-key-events.ts).
- GA4↔GSC susiejimo per API patikrinti negaliu: GA4 › Admin › Product links.
- Nova: UTM schema `utm_source={platforma}&utm_medium=social&utm_campaign=organic-{tema}` (plan-template-2026-10.ts), GA4 ją jau atskiria. Galutinis URL sąrašas: `ideaswood-agents/marketing/growth/SEO-URLS-2026-10-16.md`. `url-remap-after-migration.md` sąlyga dabar įvykdyta (garden-cabins 53 prekės). Socialinio plano neliečiau.

## „Could not be found" kategorijos: priežastis
Visų produktų kategorijų Divi šablone yra Blog modulis „Explore More Inspiration". Kategorijoje jis neranda įrašų ir išveda „No Results Found – The page you requested could not be found". Būtent šį tekstą Google rodo kaip snippet'ą. Pačios kategorijos prekes turi. Pataisa Divi Theme Builder'yje (modulio „posts for current page" išjungti arba modulį pašalinti). Nedariau, nes tai šablonas (dizainas).

## Praleista ir kodėl
| Punktas | Kodėl |
|---|---|
| robots.txt | Fizinis failas public_html, Rank Math jo neredaguoja; cPanel rašymą auto-mode blokuoja. Paruošta įklijuoti: `repo/seo/fixes/03b-robots-TO-APPLY-2026-10-16.txt` |
| http://www → https vienu šuoliu | Dabar 2 šuoliai; reikia .htaccess (tas pats blokas). Paruošta: `repo/seo/fixes/06c-htaccess-www-https-TO-APPLY-2026-10-16.txt` |
| log-cabins kategorijų suliejimas | /product-category/log-cabins/ nebeegzistuoja (ištrinta 09-09). Visi 3 seni medžiai daro 301 į /garden-cabins/. Kategorijos neatkūriau (būtų gaminių perkėlimas). |
| Dinning→Dining, Talinn→Tallinn pavadinimai ir slug'ai | Gaminio turinys, ne mano ribose. SEO title jau rodo teisingą rašybą. „Welness" nebėra niekur. |
| Telefonas schemoje | Schema ir `tel:` nuorodos: +370 610 05085; antraštės tekstas ir verslo įrašai: +370 678 22055. Nekeičiau, kol Justinas nepatvirtins. |
| Rank Math PRO redirectų ekranas | Vis dar lūžta (PRO 3.0.91 vs free 1.0.280). CSV importas veikia. Atnaujinti reikia Rank Math paskyros. |
| Seni `wp-sitemap.xml` / `product-sitemap.xml` GSC | Trynimui reikia webmasters rašymo teisės, tokenas tik readonly. Nekenksminga. |
| Turinio juodraščiai 01–04, 07, glamping (06) | Nauji puslapiai su `[X]` faktais, nepublikuota. Klausimai žemiau. |
| hreflang (fixes/07) | Laukia .com pusės; .com neliesta. |

## Perduota kitoms sesijoms
Pastabos: `side-session-notes/local_ea38dcc2…/seo-executor-2026-10-16-findings.md`
- **„IdeasWood priedų įskiepis (WCPA pakaitalas)":** produkto puslapis siunčia ~104 MB. WCPA opcijų nuotraukos (bitumen-shingles-*.jpg 4,7–8,2 MB, roof-seam-panel/raingutters ~2,2 MB) kraunamos originalo dydžiu. Reikia naudoti -150x150 miniatiūras. Tai didžiausia lėtumo priežastis. NELIEČIAU. → **Išspręsta naujame įskiepyje (2026-10-16), įsigalios jį įdiegus ir išjungus WCPA** — žr. pakeitimų žurnalą.
- **Saqib / Lepton Bridge:** galerija įterpiama JS po užkrovimo, todėl CLS ~0,93. Reikia serverinio atvaizdavimo arba width/height nuotraukoms.
- **Divi šablono savininkas:** Blog modulis kategorijų šablone (žr. aukščiau).
- **.com sesija:** `repo/seo/fixes/07-cross-domain-hreflang.md` laukia .com pusės.

## Klausimai Justinui (faktai turiniui; be jų nepublikuoju)
1. Kuris telefonas teisingas svetainei ir schemai: +370 610 05085 ar +370 678 22055?
2. Pirtys prekybai: minimalus užsakymas, private label (nuo kiek vnt.), šildytuvų gamintojai (malkinis ir elektrinis visiems modeliams?), gamybos terminas, CE sertifikatas (yra dokumentas ar ne)?
3. Kainų gidas: tipinė pristatymo kaina į UK/IE (ar už vilkiką), ar šiltinimo komplektai ir stogo danga įkainojami atskirai?
4. Glamping nameliai: sienų storis, ar šiltinti, dydis su WC, kiek dienų surenka 2 žmonės, ar montuojate per partnerius, ar parduodate tik komplektą?
5. Didmenos puslapis (01): minimalus užsakymas, vilkiko maišymo taisyklės, mokėjimo sąlygos, kurias galima skelbti.

## GitHub
Lokalus commit `736e34b` šakoje `claude/ideaswood-seo-audit-8r34oj`. Push NEPAVYKO (`could not read Username for github.com`: gh neprisijungęs). Todėl visa EN ataskaita įdėta žemiau kaip priedas. Kai gh bus prisijungęs: `cd ~/.claude/PAI/USER/WORK/ideaswood-seo/repo && git push origin claude/ideaswood-seo-audit-8r34oj`.

---

## Priedas: seo/reports/implementation-2026-10-16.md (EN, debesų sesijai)

### ideaswood.eu SEO implementation – 2026-10-16

Executed from the Mac (Astra's SEO executor session) against the live site, logged in to WordPress. Every finding from the cloud audit was re-checked on the live site first. Several had changed: the 2026-09-09 category restructure deleted the whole `log-cabins` tree, and a Dispatch run on 2026-09-26/29 had already done part of Phase 1.

Backups before any change: UpdraftPlus DB backup 2026-10-16 10:01 (server time) plus the full backup from 2026-10-15 (DB, plugins, themes, others, uploads). Settings snapshots (LiteSpeed, Customizer CSS, plugin list, product categories, edited posts, titles before) are in `~/Desktop/ideaswood-seo/backup/` on the Mac.

## PageSpeed (mobile)

The PSI API daily quota for the shared key was exhausted, so the same engine (Lighthouse 12, mobile, simulated slow 4G) ran locally. There are no CrUX field data for the site, so INP is not available. TBT is the lab proxy.

| Page | Run | Score | LCP | CLS | TBT | FCP | Speed Index |
|---|---|---|---|---|---|---|---|
| Home / | before | 37 | 17.5 s | 0.102 | 1,200 ms | 3.2 s | 6.4 s |
| Home / | after, run 1 | 39 | 23.3 s | 0 | 670 ms | 7.0 s | 10.0 s |
| Home / | after, run 2 | 57 | 13.9 s | 0.027 | 470 ms | 2.0 s | 5.7 s |
| /product/alma-7x8-m/ | before | 8 | 25.7 s | 1.743 | 1,850 ms | 2.9 s | 21.4 s |
| /product/alma-7x8-m/ | after (final, run 7) | 23 | 11.9 s | 1.13 | 520 ms | 2.7 s | 37.7 s |
| /product/alma-7x8-m/ | after (final, run 8) | 27 | 12.2 s | 1.13 | 390 ms | 2.6 s | 40.6 s |

Lab LCP and FCP swing a lot between runs on this server (compare home runs 1 and 2). The stable gains: home CLS 0.10 → ~0, TBT roughly halved on both pages, product LCP 25.7 s → ~12 s. **The remaining product CLS (0.93–1.13) comes entirely from the Lepton Bridge gallery**, which hides the WooCommerce gallery and injects its own by JS. The 0.81 shift from the lazy image under it is gone. A CSS-only space reservation was tried twice (module aspect-ratio, then image aspect-ratio). It did not change the measured shift, so it was removed again. The proper fix is in the plugin: render the gallery server-side, or give the injected images width/height. Product Speed Index rises because of the ~104 MB of add-on images (point 4 below). Raw Lighthouse JSON: `~/Desktop/ideaswood-seo/*.lh.json`.

Root causes found (verified live):

1. **CSP is not the cause.** The site sends no Content-Security-Policy header (only HSTS, nosniff, X-Frame-Options, Referrer-Policy).
2. **The "blocks before images" are LiteSpeed lazy-load placeholders**: a 1x1 grey GIF (#c3c3c3) with no aspect ratio. Even the header logo was lazy-loaded, because its exclusion had been typed into the page-URI exclude field instead of the image exclude field.
3. **Product CLS 1.74**: the "Lepton Bridge" plugin hides the WooCommerce gallery (`display:none`) and injects its own gallery by JS after load, so everything below jumps down. A second jump came from a lazy image below it with no reserved space.
4. **Product pages download ~104 MB.** The WCPA add-on form loads roofing/gutter option images at original size (bitumen-shingles-*.jpg 4.7–8.2 MB each, roof-seam-panel/raingutters ~2.2 MB). This is the main cause of slow product pages. Not changed here: it belongs to the "IdeasWood add-ons plugin (WCPA replacement)" session. Fix: use the existing `-150x150` thumbnails for option previews.

## Change log

| Date | URL / setting | Before | After |
|---|---|---|---|
| 10-16 | LiteSpeed › Media › Add Missing Sizes | off | on |
| 10-16 | LiteSpeed › Media › Responsive Placeholder | off (grey GIF) | on (correctly sized, near-transparent SVG) |
| 10-16 | LiteSpeed › Media › Viewport Images + cron | off | on |
| 10-16 | LiteSpeed › Lazy Load Image Excludes | empty | `ideas-wood-logo` |
| 10-16 | LiteSpeed › Lazy Load Image Excludes | `ideas-wood-logo` | + `eco-vs-pre` (the above-the-fold template image on every product page had become the LCP element while lazy) |
| 10-16 | Customizer CSS, then Divi › Integration › head | – | gallery space reservation added, measured with no effect, **removed again** (both back to their original content) |
| 10-16 | /eu-project/ (post 11764) | index | noindex, follow (kept live) |
| 10-16 | Rank Math › Redirections (CSV import) | 0 redirects; old category URLs 404 | 34 sources → 19 redirects, all 301 single hop (list: `fixes/06b-redirects-applied-2026-10-16.csv`) |
| 10-16 | /x/ (post 13186, 12-word duplicate titled "x") | 200 | 301 → /wood-impregnation-treatment-for-log-cabins-complete-guide-to-koralan-uk-110/ (post kept, not deleted) |
| 10-16 | Rank Math title separator | `-` | `\|` |
| 10-16 | Rank Math templates: pages, posts, products, product categories, categories | `%title% %sep% %sitename%` → "… - ideaswood.eu" | `%title% %sep% IdeasWood` → "… \| IdeasWood" |
| 10-16 | SEO title + meta: 12 pages/posts, 12 live categories | see `titles-meta-log` | from `fixes/04-titles-meta.csv`, mapped to the live category slugs, unverifiable claims removed |
| 10-16 | SEO title + meta: 24 products (16 from 04b + 8 with old "Buy … in UK" titles) + 3 more reset to the template | see `product-titles-log` | facts taken from live product attributes; prices removed from meta |
| 10-16 | /how-much-does-a-garden-cabin-cost/ | 440 words | + "Price by wall thickness" table (170 models, 28/44/58/68 mm, from/to prices from the live catalogue, Oct 2026) |
| 10-16 | WP draft 18344 (not published) | – | rewrite of /wellness-saunas/ with catalogue facts; trade facts left as `[CONFIRM]` |
| 10-16 | LiteSpeed cache | – | Purge All after each batch |

Redirects verified live (curl, no cache): /product-category/log-cabins/ → /garden-cabins/, …/wooden-houses/garden-house/ → /garden-cabins/, …/wooden-houses/summer-house/ → /summer-houses-chalets/, …/storage-sheds/ → /sheds-storage-cabins/, /frame-houses/a-frames/ → /a-frames/, /grill-cabins/ → /bbq-grill-cabin/, …/camping-houses/ → /camping-pods/, /product/louise-6x6-m/ → /product/louise-6x6/, /x/, /home/, /kontaktai → /contact-us/, /lt/* → /, /category/blog/ → /blog/. Every GSC page with impressions in the last 3 months now ends on a 200 page.

Title/meta: 24/24 pages and categories and the sampled products verified live after purge.

## Already done before this run (not repeated)

From the 2026-09-26 Dispatch report: Rank Math Organization/Local SEO schema (name, logo, email, address, Facebook, Instagram), noindex on /product-category/featured/, tag and author archives already noindex, date archives and attachment pages redirect. Sitemap `sitemap_index.xml` is submitted in GSC and read without errors (last read 2026-10-15; 538 URLs). Rank Math (free + PRO) is the only SEO plugin; LiteSpeed Cache, Modern Image Formats (WebP) and Performance Lab are the only optimisers; no second optimiser was added.

Note: the 09-29 Dispatch run had switched on CSS/JS/HTML minify, emoji removal, iframe lazy-load and Add Missing Sizes. Today those were found switched off again (someone reverted them). Minify was not re-enabled: the 09-29 measurement showed no gain and the revert looks deliberate.

## Search Console export

`~/Desktop/ideaswood-seo/gsc-{query,page,country}-2026-07-16_2026-10-15.csv` and `gsc-sitemaps-2026-10-16.json`. Totals for 2026-07-16 – 2026-10-15: 22 clicks, 5,784 impressions, CTR 0.38 %, average position 68.3. The indexing (coverage) report has no API; the 09-26 export (62 indexed / 325 not indexed) is the latest.

## GA4 (property 399524440, G-E0N4733SR2)

- One GA4 tag. Site Kit (GT-5DDGB8Q) and GTM-M7JFNX share the same gtag; Lighthouse network logs show exactly one `page_view` hit per page. No duplicate.
- Key events defined: purchase, phone_click, click___phone, email_click, click___email, contact_form_submit, form_submit, submit_lead_form, generate_lead, ads_conversion_contact, qualify_lead, close_convert_lead, ua_purchase, ua_checkout.
- Last 30 days actually received: page_view 1,177, form_start 4, form_submit 2, add_to_cart 9, purchase 1. **phone_click, email_click and generate_lead: 0.** GTM link-click triggers fire (`gtm.linkClick` in dataLayer when a tel:/mailto: link is clicked), but no GA4 hit followed in a live test. The GTM tags need checking; this session has no Tag Manager API scope.
- add_to_cart is deliberately not a key event (`marketing/ga4-fix-key-events.ts`: no B2B order completes through the cart). Left as is.
- GA4 ↔ Search Console link: not verifiable through the Admin API. Check in GA4 › Admin › Product links.
- Social UTM: `utm_source={facebook|instagram|linkedin|…}&utm_medium=social&utm_campaign=organic-{topic}` (from `marketing/growth/plan-template-2026-10.ts`); GA4 already separates it. Final URL list for Nova: `ideaswood-agents/marketing/growth/SEO-URLS-2026-10-16.md`.

## "Could not be found" categories – cause

All product-category pages use one Divi Theme Builder body template. It contains a Blog module ("Explore More Inspiration") that, on a product category, finds no blog posts and prints "No Results Found – The page you requested could not be found". Google shows that text as the snippet. The categories themselves have products (e.g. Sauna: 12). Fix in Divi: set the Blog module to a fixed blog category (turn off "posts for current page") or remove it from the template. Not changed here because it is a theme template (design).

## Skipped, with reason

| Item | Why |
|---|---|
| robots.txt (fixes/03) | A physical `public_html/robots.txt` exists, so Rank Math cannot edit it, and cPanel file writes are blocked for this agent by the auto-mode classifier. Ready-to-paste file: `~/Desktop/ideaswood-seo/robots-txt-TO-APPLY-2026-10-16.txt` (keeps the existing SemrushBot and WooCommerce rules, adds cart/checkout/my-account and query-parameter rules). |
| http://www → https non-www in one hop | Today it takes 2 hops. Needs `.htaccess`, same cPanel block. Snippet: `~/Desktop/ideaswood-seo/htaccess-www-https-TO-APPLY-2026-10-16.txt`. |
| Merge log-cabin trees into /product-category/log-cabins/ | That category no longer exists (deleted in the 2026-09-09 restructure; garden-cabins is its successor). Recreating it would mean moving products. All three old trees now 301 to /product-category/garden-cabins/ instead. |
| Product renames Dinning → Dining, Talinn → Tallinn (name + slug) | Product content is out of scope for this session. SEO titles already show the correct spelling. WP adds a 301 from the old slug automatically once the slug changes. "Welness" exists nowhere any more. |
| Organization schema extras (foundingDate, areaServed, knowsAbout) | Rank Math Local SEO has no fields for them, and the founding year is unverified. |
| Phone number in schema | The schema and the `tel:` links say +370 610 05085, while the header text and the business records say +370 678 22055. Not changed until Justinas confirms which one is right (NAP consistency). |
| Old `wp-sitemap.xml` and `product-sitemap.xml` entries in GSC | Deleting them needs the webmasters write scope; the token has only readonly. Harmless. |
| Rank Math PRO redirect screen | Still broken (`TypeError … 'start-date'`, PRO 3.0.91 vs free 1.0.280). The CSV import works and was used. Updating PRO needs the Rank Math account. |
| Content drafts 01–04, 07 and the glamping half of 06 | New pages with `[X]` facts only Justinas can give. Not published. Questions below. |
| hreflang (fixes/07) | For the .com side. ideaswood.com was not touched. |

## Questions for Justinas (facts needed for content)

1. Which phone number is right for the website and schema: +370 610 05085 or +370 678 22055?
2. Saunas for trade: minimum order, private label (from how many units), heater brands (wood/electric for every model?), production lead time, CE certification (documented or not)?
3. Cost guide "other costs": a typical delivery price to the UK/IE (or per truck), and whether insulation kits and roofing are priced separately.
4. Glamping pods: wall thickness, whether they are insulated, the size with en-suite, assembly days for 2 people, whether you install via partners or sell kits only.
5. Wholesale page (01): minimum order, pallet/truck mix rules, payment terms you are willing to publish.

## Hand-offs

- Add-ons plugin session: product-page images (above, point 4).
- Divi template owner / Saqib: the Blog module on category pages; the Lepton gallery injecting late.
- .com session: `fixes/07-cross-domain-hreflang.md` still waits for the .com side.
- Nova: `marketing/growth/SEO-URLS-2026-10-16.md`. The condition in `url-remap-after-migration.md` is now met (garden-cabins 53 products).


## GitHub push (papildyta 2026-10-16)
Push laukia: `gh auth status` iki 20:40 rodė „not logged in". Foninis laukimas veikia iki ~2026-10-17 05:00 (Vilniaus laiku); kai gh prisijungs, commit `736e34b` bus išstumtas automatiškai ir čia atsiras eilutė „PUSHED".
- 2026-10-17 04:37: laukimas baigtas, gh taip ir neprisijungė (`gh auth status`: not logged in). Push NEĮVYKO, commit `736e34b` lieka lokaliai. Visa ataskaita yra šiame faile (priedas). Prisijungus: `gh auth login`, tada `cd ~/.claude/PAI/USER/WORK/ideaswood-seo/repo && gh auth setup-git && git push origin claude/ideaswood-seo-audit-8r34oj`.

## 2026-10-18 · Astra: robots.txt ir .htaccess įdiegti (anksčiau praleisti)

| URL / vieta | Buvo | Tapo |
|---|---|---|
| public_html/robots.txt | 11 taisyklių, be /cart/, /checkout/, /my-account/, ?orderby, ?filter_, ?s= | pagal `fixes/03b-robots-TO-APPLY-2026-10-16.txt` |
| public_html/.htaccess | http://www.ideaswood.eu → https://www → https://ideaswood.eu (2 šuoliai) | naujas blokas „IdeasWood canonical host“ po saugumo antraščių: vienas 301 į https://ideaswood.eu. Taikomas TIK ideaswood.eu / www.ideaswood.eu hostams, /.well-known/ išimtis |

Atsarginės kopijos serveryje: `public_html/.htaccess.bak-20261018-seo`, `public_html/robots.txt.bak-20261018-seo` (turinys patikrintas, sutampa).

Patikra (curl): http://www.ideaswood.eu/product/alma-7x8-m/ → 301 → https://ideaswood.eu/product/alma-7x8-m/ → 200, iš viso 1 šuolis. Kiti: https://www → 301 į non-www, http://ideaswood.eu → 301 į https. Home, produktas ir sitemap_index.xml grąžina 200, saugumo antraštės liko. Kitų domenų (ideaswood.com, staging.ideaswood.com, logcabinsfactory.com, timberescapes.com.au, abitazionidilegno.it) elgesys nepakito, kiekvienas veda į savo https.

Liko: GitHub push (gh dar neprisijungęs), Divi kategorijų šablono Blog modulis, GA4 GTM tagai, 5 klausimai Justinui.

## 2026-11-06 · vykdytojas: perindeksavimas + pirčių subkategorijos (Justinas: „Indeksavimas + pirtys")
- **Search Console:** „Request indexing" pateikta 11 URL (garden-cabins, sauna, outdoor-sauna, sauna-cabins, barrels-sauna, sauna-pods, indoor-sauna, summer-houses-chalets, sheds-storage-cabins, villas-country-houses, garages-carports); visi „URL is on Google". Dienos kvota išnaudota ties 12-u; rytoj liko insulated-wooden-houses ir pradžios puslapis. Gidai jau „Submitted and indexed".
- **Pirčių subkategorijos (buvo tuščios):** 5 tekstai įrašyti per wc/v3 + Rank Math focus keyword: outdoor-sauna (11 pirčių, €2 707–€15 892, tipų pasirinkimas, žmonių skaičius, konstrukcija), sauna-cabins (8 namelių pirtys), barrels-sauna (2 statinės Ø1,97 m), sauna-pods (Sauna Pod 2,4×1,9 m), indoor-sauna (Standard Indoor, 14 dydžių). Visi skaičiai iš Store API, 8 nuorodos 200. Failai `seo/fixes/categories-2026-10-18/sauna-subcats-2026-11-06.ts`, `apply-sauna-subcats.ts`; atsarginė kopija `~/Desktop/ideaswood-seo/backup/sauna-subcats-before-2026-11-06.json` (originalai tušti; atšaukti = description "").
- **Naujas faktas (Saqib juosta, Divi):** visos pirčių kategorijos (27 ir 5 subkategorijos) rodomos per Divi Theme Builder body maketą, kuris neiškviečia `woocommerce_archive_description`. Todėl įžanga virš prekių nerodoma; rodosi tik tekstas po grid'u (`woocommerce_after_shop_loop`). Mano 5 tekstams žymą padėjau pradžioje, tad visas tekstas matomas po prekėmis. **Tėvinei „sauna" (27) 10-18 įrašyta įžanga + H1 puslapyje nematoma** (meta aprašymui Rank Math ją vis tiek naudoja). Pataisa: per wp-admin formą perkelti `<!--iw-below-->` į pradžią ir išimti `<h1>` (Divi H1 jau yra), arba Saqib į TB maketą įdeda archyvo aprašo modulį. REST kelio nėra (kses nukerta `<p>/<h1>`).
- Pastaba: REST ir kses-saugiems tekstams nukerta `<p>` — pastraipos siunčiamos tuščia eilute, `wc_format_content` jas atkuria (patikrinta: 4–6 `<p>` kiekviename puslapyje).
