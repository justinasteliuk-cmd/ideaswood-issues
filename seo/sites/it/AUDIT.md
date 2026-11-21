# abitazionidilegno.it – SEO audit (live crawl 2026-11-21)

Scope: Italian market site of IdeasWood (supplier and exporter of wooden buildings). Method: curl with a browser UA, `robots.txt`, `/wp-sitemap.xml` and its 6 child sitemaps, all 516 sitemap URLs fetched (6 parallel, 3 retries). 516/516 returned 200. Raw per-URL table: `data/crawl-2026-11-21.tsv`. Autosuggest source data: `data/autosuggest-it-2026-11-21.txt`.

Stack seen in the HTML: WordPress 6.7.12, WooCommerce 10.3.3, Divi, Polylang (free), Site Kit, `iw-product-options`, mu-plugin `iw-seo-basics` (writes the home meta, product meta and the small Organization schema). **No SEO plugin** (no Rank Math/Yoast), so category titles and meta cannot be set in a field today.

## 1. Google data (Search Console, last 28 days)
288 impressions, 0 clicks, average position 51.9.

| Query | Impr. | Pos. | Reads as |
|---|---|---|---|
| capannoni in legno prezzi | 74 | 54 | price-led, storage buildings |
| capannoni legno | 58 | 76.6 | same |
| capannone in legno | 28 | 86.7 | same |
| capannoni in legno | 27 | 81.4 | same |
| baite in legno | 10 | 35.8 | cabins |
| baite di legno | 2 | 21.5 | cabins |
| capannoni prefabbricati in legno | 4 | 60.5 | storage buildings |
| a frame | 4 | 36.5 | A-frame houses |

Two thirds of the impressions are for *capannoni* and Google shows us on pages 5-9, because no page on the site is about capannoni (the only match is the category slug `capannoni-di-stoccaggio`, which has no text, no H1 and no meta). Baite are already on pages 2-4 with an empty category, so they are the fastest win.

## 2. Summary of findings (ordered by damage)

| # | Problem | Where | Severity |
|---|---|---|---|
| 1 | Home says *"migliaia di persone nel Regno Unito e in Australia si affidano alla nostra tradizione"* and *"principali fornitori globali"* | `/` (page 22), block "I Principali Fornitori di Case in Legno in Italia" | P0 (wrong market, trust) |
| 2 | Factory/production claims: home meta *"La nostra fabbrica partner produce più di 3200 m³ di cabine al mese"*; About: *"oltre 3200 m³ di strutture prodotte ogni mese"*, *"stabilimenti"*, *"capacità produttiva fino a 100 camion al mese"*, *"ingegneri e specialisti di produzione"*, *"una linea di produzione"*; Contatti: *"siamo produttori e fornitori unici"*, *"capacità di fornitura e produzione supera i 3200 m²"* (m² here, m³ elsewhere) | `/` meta (mu-plugin constant), `/about-us/` (1384), `/contatti/` (9304) | P0 (banned wording, inconsistent unit) |
| 3 | Green and certification claims: home *"stile di vita ecosostenibile"*, *"efficienza energetica"*, *"Eco-Lusso e Sostenibilità"*, *"Legname di Provenienza Responsabile"*, *"Sostenibilità Garantita"*, *"prefabbricati ad alta efficienza energetica"*, *"design sostenibili"*; sauna and hot-tub pages: *"fornitori certificati dal Forest Stewardship Council"*, *"legno con certificazione FSC"*, *"materie prime ecologiche"*, *"Stufe a Legna Certificate CE"*, *"L'acrilico è certificato CE"*, *"rispettoso dell'ambiente"*; Contatti *"soluzioni ecosostenibili"*; one product (`/prodotto/a-frame-39/`) | `/`, `/contatti/`, term 27 (+ 593, 594 which render the same Divi layout), term 26 (+ 589), A-frame 39 | P0 (no proof on file) |
| 4 | "Nordic": product attribute value **"Abete nordico / Pino"** on 206 product pages; home *"abete e pino nordico"*, line name *"Kaia Nordic"*; sitewide footer: *"legno del Nord Europa a crescita lenta, considerato il migliore per resistenza"* on 499 pages (unverifiable superlative + origin claim) | attribute term, footer (Divi theme builder), page 22 | P1 |
| 5 | **"-UK"** in product names: Garage 6×6-UK, Garage 7×5,5-UK, Garage+posto auto coperto 6,8×5,6-UK, Posto auto coperto+deposito 5,7×5,3-UK and 5,7×7,9-UK (slugs `garage-6x6-uk`, `garage-7x55-uk`, `garagecarport-68x56-uk`, `carportstorage-57x53-uk`, `carportstorage-57x79-uk`); shown in "Prodotti correlati" on 17 pages | 5 products in term 206 | P1 |
| 6 | "Verniciatura **in fabbrica**" is the label of a paint option in the product options form on 106 product pages, plus "Verniciatura in fabbrica di porte e finestre" | `iw-product-options` option groups | P1 (banned word, easy fix) |
| 7 | Every product category (47 in the sitemap) has **no description, no meta description, no canonical**, and 42 of them **no H1** (Divi category template prints none). Title is the bare term name, e.g. "Capannoni di Stoccaggio \| abitazionidilegno.it" | all `/categoria-di-prodotto/…` | P1 (the money pages are empty) |
| 8 | Home: title "abitazionidilegno.it \| Vita ispirata" (no keyword); **11 H1s**; H1 is "Log Cabin in Legno…" (English term "log cabin" 14 times); hero copy is a translation of the .com/.eu template | page 22 | P1 |
| 9 | Category names are calques from English: "Cabine da Giardino", "Ufficio del Giardino", "Casa Estiva", "Cabine Pergolate", "Capannoni di Stoccaggio", "Case a Telaio", "Sauna a botti", "Vasca Idromassaggio" (singular) | product_cat terms | P1 (they miss what Italians type: casette in legno da giardino, ufficio da giardino, sauna a botte, vasche idromassaggio da esterno) |
| 10 | Parent category **Baite in legno (term 207, 199 products)** and sauna parents *All'aperto* (66) and *Al coperto* (65) are **missing from the sitemap** (WordPress core lists a term only when products are assigned to it directly) | wp-sitemap | P1 (the one category already on page 2-4 is not submitted) |
| 11 | Polylang: IT default (term 566, 1,333 items), EN (term 563, 1,010 items). **EN has no static front page** (`page_on_front: 0`), so `/en/` shows "abitazionidilegno.it \| Vita ispirata", H1 "Explore life in wood", Italian footer, 296 words, **no canonical, no meta, no hreflang**. hreflang (it, en) is printed **only on the Italian home**; no `x-default` anywhere. **No visible language switcher** (no `lang-item` in header or menu). `/en/about-us/` 301s to the Italian `/about-us/`. Only one EN page in the sitemap (`/en/contact-us/`, H1 in Italian "Mettiti in contatto", 17 words) | Polylang settings, menus | P1 |
| 12 | Utility and leftover URLs in the sitemap: `/cart/`, `/grazie/` (thank-you page), `/individual-or-bespoke-cabins/` (post 91, English title, 62 words, no meta), `/privacy-policy-and-cookies/` (no H1). `/my-account/`, `/checkout/` exist | sitemap | P2 |
| 13 | Italian page with English slug: `/about-us/` (Chi siamo). Other English slugs: `/insulation-kits-on-all-models-available/` (1411), `/highest-quality-windows-and-doors/` (1339) | pages | P2 |
| 14 | Product titles carry only the model name ("Almeria 6×8,87 \| abitazionidilegno.it"), no product type; 25 product names are English or half English (Camping Pod, Sauna Pod, Flame BBQ, Standard BBQ Grill, A-frame-Moose, Set lounge) | 464 products | P2 |
| 15 | Organization schema is minimal: name "abitazionidilegno.it", url, foundingDate 2007. No address, telephone, logo, contact point. Products have Product/Offer schema (WooCommerce), categories only BreadcrumbList | mu-plugin | P2 |
| 16 | One product without H1 (`/prodotto/rico-4x7-8-m/`); 4 duplicate product meta descriptions (furniture sets, hot tub) | products | P3 |

**Not found (good):** old owner contacts **+39 06 9785 7823** and **info@abchouses.it**: 0 hits in 516 pages (the only "9785" match was an internal option key). Header and footer now show the Italy contact: Gian Luca, **+370 645 07954**, gianluca@ideaswood.eu, WhatsApp; Contatti shows "Kastonu g. 8 D. Riese Vilniaus raj 14261, Lithuania". The company number +370 678 22055 appears nowhere on the site. [CHECK with Justinas: which number goes in the schema `telephone` and which in the visible header. This plan keeps Gian Luca visible and puts +370 678 22055 in the schema, as briefed.]

**Duplicate titles:** none (516 unique titles). **Duplicate meta:** 4 pairs on products. **Thin pages:** every category (0 words of category text; the 296-592 "words" counted are product names and prices in the grid), `/en/` (296), `/en/contact-us/` (17), `/individual-or-bespoke-cabins/` (62), `/contatti/` (135). Product pages have no long description in a WooCommerce description tab; their text is the options form.

**English leftovers:** home H1/hero ("Log Cabin", "cabin" x14), post "individual or bespoke cabins", `/about-us/` slug, 25 product names, "-UK" suffix, EN home entirely unbuilt.

**Technical OK:** http → https 301 in one hop; robots.txt is clean (blocks only wp-admin and WooCommerce temp folders) and points to `/wp-sitemap.xml`; `/sitemap.xml` 301s to it; every page has `max-image-preview:large`, no accidental noindex (only cart/checkout). `<html lang="it-IT">` on all Italian URLs, `en-US` on `/en/` URLs. Canonicals are self-referencing on posts, pages and products. (www host not testable from this network.)

## 3. Page table (all 52 non-product URLs; products are in `data/crawl-2026-11-21.tsv`)
*Words = words in the main content area including the product grid; categories have no own text.

| URL | Title (before " / abitazionidilegno.it") | Meta | H1 | Words* | Canonical | hreflang | lang | Schema |
|---|---|---|---|---|---|---|---|---|
| / | abitazionidilegno.it / Vita ispirata | yes | 11 H1s, first: Log Cabin in Legno Realizzati con Maestria | 610 | self | en, it | it-IT | Organization,WebSite |
| /about-us/ | Chi siamo | NO | Chi siamo | 546 | self | - | it-IT | - |
| /cart/ | Carrello | NO | NONE | 8 | self | - | it-IT | - |
| /categoria-di-prodotto/altri-prodotti/ | Altri prodotti | NO | NONE | 357 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/cabina-per-bbq/ | Cabina per BBQ | NO | NONE | 368 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/cabina-per-bbq/set-per-griglia/ | Set per Griglia | NO | NONE | 336 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case-a-frame/ | Case A-frame | NO | NONE | 312 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case-in-legno-coibentate/ | Case in legno coibentate | NO | NONE | 326 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/ | Case | NO | NONE | 478 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/cabine-da-giardino/ | Cabine da Giardino | NO | NONE | 592 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/cabine-pergolate/ | Cabine Pergolate | NO | NONE | 319 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/capannoni-di-stoccaggio/ | Capannoni di Stoccaggio | NO | NONE | 452 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/casa-estiva/ | Casa Estiva | NO | NONE | 483 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/case-a-telaio/ | Case a Telaio | NO | NONE | 296 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/case-da-campeggio/ | Case da Campeggio | NO | NONE | 324 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/case-di-campagna-ville/ | Case di Campagna/Ville | NO | NONE | 453 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/garage-posto-auto-coperto/ | Garage/Posto Auto Coperto | NO | NONE | 464 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/case/baite-in-legno/ufficio-del-giardino/ | Ufficio del Giardino | NO | NONE | 335 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/legno-termotrattato/ | Legno termotrattato | NO | NONE | 417 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/legno-termotrattato/listelli/ | Listelli | NO | NONE | 319 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/legno-termotrattato/pavimentazioni-per-esterni/ | Pavimentazioni per esterni | NO | NONE | 310 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/legno-termotrattato/rivestimenti/ | Rivestimenti | NO | NONE | 375 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/mobilia/ | Mobilia | NO | NONE | 324 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/mobilia/mobili-da-giardino/ | Mobili da Giardino | NO | NONE | 328 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/novita-2026/ | Novità 2026 | NO | NONE | 347 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/pergola/ | Pergola | NO | NONE | 359 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/pergola/pergolato-in-alluminio/ | Pergolato in Alluminio | NO | NONE | 317 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/pergola/pergolato-in-legno/ | Pergolato in Legno | NO | NONE | 341 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/sauna/ | Sauna | NO | Sciogli lo stress con stile con le nostre saune | 501 | none | - | it-IT | - |
| /categoria-di-prodotto/sauna/al-coperto/standard/ | Standard | NO | NONE | 322 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/sauna/allaperto/cabine-sauna/ | Cabine Sauna | NO | NONE | 384 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/sauna/allaperto/capsule-per-sauna/ | Capsule per sauna | NO | NONE | 313 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/sauna/allaperto/sauna-a-botti/ | Sauna a botti | NO | NONE | 324 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/sauna/sauna-da-esterno/ | Sauna da esterno | NO | Sciogli lo stress con stile con le nostre saune | 501 | none | - | it-IT | - |
| /categoria-di-prodotto/sauna/sauna-da-interno/ | Sauna da interno | NO | Sciogli lo stress con stile con le nostre saune | 501 | none | - | it-IT | - |
| /categoria-di-prodotto/serie-smart-line/ | Serie Smart Line | NO | NONE | 424 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/serie-smart-line/smart-line-capanni-e-ripostigli/ | Capanni e ripostigli Smart Line | NO | NONE | 433 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/serie-smart-line/smart-line-casette-da-giardino/ | Casette da giardino Smart Line | NO | NONE | 423 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/serie-smart-line/smart-line-garage/ | Garage Smart Line | NO | NONE | 317 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/serie-smart-line/smart-line-posti-auto-coperti/ | Posti auto coperti Smart Line | NO | NONE | 322 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/serie-smart-line/smart-line-strutture-da-giardino/ | Strutture da giardino Smart Line | NO | NONE | 310 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/stalle-e-chioschi/ | Stalle e chioschi | NO | NONE | 320 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/vasca-idromassaggio/ | Vasca Idromassaggio | NO | SPA / nel Tuo Giardino | 312 | none | - | it-IT | - |
| /categoria-di-prodotto/vasca-idromassaggio/stufa-esterna-a-legna/ | Stufa Esterna a Legna | NO | NONE | 325 | none | - | it-IT | Breadcrumb |
| /categoria-di-prodotto/vasca-idromassaggio/stufe-a-legna/ | Stufe a legna | NO | SPA / nel Tuo Giardino | 312 | none | - | it-IT | - |
| /categoria-di-prodotto/vasca-idromassaggio/vasca-idromassaggio-quadrata/ | Vasca Idromassaggio Quadrata | NO | NONE | 309 | none | - | it-IT | Breadcrumb |
| /category/blog-it/ | Blog | NO | NONE | 322 | none | - | it-IT | - |
| /contatti/ | Contattaci | NO | Contattaci / Richiedi informazioni | 135 | self | - | it-IT | - |
| /en/contact-us/ | Contact us | NO | Mettiti in contatto | 17 | self | - | en-US | - |
| /grazie/ | Grazie | NO | Grazie | 315 | self | - | it-IT | - |
| /individual-or-bespoke-cabins/ | individual or bespoke cabins | NO | individual or bespoke cabins | 62 | self | - | it-IT | - |
| /privacy-policy-and-cookies/ | Informativa sulla privacy e cookie | NO | NONE | 1261 | self | - | it-IT | - |

## 4. Category term IDs (from the live REST API, for the Mac tasks)
| Term ID | Name now | Products | URL |
|---|---|---|---|
| 57 | Case | 199 | /categoria-di-prodotto/case/ |
| 207 | Baite in Legno | 199 (via children) | /categoria-di-prodotto/case/baite-in-legno/ |
| 203 | Capannoni di Stoccaggio | 49 (sheds 1.2-7.36 m: Lulu, Edith, Alva, Elyra, Rapture, Eric…) | …/baite-in-legno/capannoni-di-stoccaggio/ |
| 276 | Cabine da Giardino | 53 | …/baite-in-legno/cabine-da-giardino/ |
| 204 | Casa Estiva | 31 | …/baite-in-legno/casa-estiva/ |
| 517 | Case di Campagna/Ville | 38 | …/baite-in-legno/case-di-campagna-ville/ |
| 206 | Garage/Posto Auto Coperto | 16 | …/baite-in-legno/garage-posto-auto-coperto/ |
| 152 | Ufficio del Giardino | 6 | …/baite-in-legno/ufficio-del-giardino/ |
| 205 | Cabine Pergolate | 4 | …/baite-in-legno/cabine-pergolate/ |
| 20 | Case da Campeggio | 2 | …/baite-in-legno/case-da-campeggio/ |
| 208 | Case a Telaio | 0 | …/baite-in-legno/case-a-telaio/ |
| 578 | Case A-frame | 3 | /categoria-di-prodotto/case-a-frame/ |
| 580 | Case in legno coibentate | 7 | /categoria-di-prodotto/case-in-legno-coibentate/ |
| 27 | Sauna | 12 | /categoria-di-prodotto/sauna/ |
| 594 / 593 | Sauna da esterno / da interno | 11 / 1 | …/sauna/sauna-da-esterno/, …/sauna-da-interno/ |
| 71 / 69 / 70 / 68 | Sauna a botti / Cabine Sauna / Capsule per sauna / Standard | 2 / 8 / 1 / 1 | …/sauna/allaperto/…, …/al-coperto/standard/ |
| 72 / 74 / 73 | Pergola / Pergolato in Legno / in Alluminio | 12 / 7 / 2 | /categoria-di-prodotto/pergola/… |
| 26 | Vasca Idromassaggio | 4 | /categoria-di-prodotto/vasca-idromassaggio/ |
| 23 | Cabina per BBQ | 11 | /categoria-di-prodotto/cabina-per-bbq/ |
| 582, 591, 595, 590, 586, 592 | Serie Smart Line (+ casette, capanni e ripostigli, garage, posti auto, strutture) | 178, 117, 54, 3, 3, 1 | /categoria-di-prodotto/serie-smart-line/… |
| 583 | Stalle e chioschi | 4 | /categoria-di-prodotto/stalle-e-chioschi/ |
| 0-product terms to hide or delete | 208, 543, 61, 202, 24, 79, 81, 67, 75, 77, 181, 549 "default-catagory", 249 "nauja-kategorija" | 0 | – |

Pages: 22 home, 1384 Chi siamo (`/about-us/`), 9304 Contatti, 9325 Grazie, 3481 EN Contact us, 1411, 1339, 170 Blog, 120 Shop. Post 91 "individual or bespoke cabins". Polylang language terms: it 566, en 563.

## 5. What the market searches (Autosuggest, 1,765 phrases after filtering)
Biggest clusters by number of suggestions: casette in legno (209), pergole (161), sauna (153), case in legno (158), garage/box auto/carport (150), baite/chalet/bungalow (130), capannoni/capanni (107), campeggio (81), A-frame (75), tiny house (51), ufficio/studio da giardino (38), tinozze/hot tub (28). The modifiers Italians add are **prezzi / costo / al mq**, **abitabile / coibentata / con bagno**, **chiavi in mano**, **prefabbricata / in kit**, **permessi / senza permesso**, and sizes (**3x3, 4x4, 6x6, 20/30/50 mq**). See KEYWORD-MAP.md.

Key consequence: Italian has no word "cabin" for this. Buyers say **casetta in legno** (garden building), **capanno / capannone** (storage), **baita / chalet** (cabin to live in), **box auto / garage in legno**, **tinozza** (wood-fired tub). The site uses "cabine", which Italians read as a booth or a ship's cabin.
