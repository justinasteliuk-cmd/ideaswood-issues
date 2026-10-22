# 02: Keywords, baseline rankings and competitors: ideaswood.eu

**Audit date:** 2026-09-25
**Scope:** English-language Google page-1 visibility for ideaswood.eu (Vilnius, LT). The brief says the company was founded in 2007, but the indexed site says "since 1993". See issue K-7.
**Tracking file:** `seo/tracking/rankings.csv`. Re-run it daily for one week, then weekly.

## Method and caveats (read before comparing runs)

| Item | Detail |
|---|---|
| Tool | The agent `WebSearch` tool. It returns up to about 9–10 organic results per query and is **US-based**, so it is not a UK or IE Google SERP. |
| Position | The order in which the tool returned results (1 = first). It is a proxy for Google rank, not a Search Console figure. |
| ideaswood.eu fetch | Blocked by the egress proxy. Index coverage was checked with `site:` queries instead. |
| Competitor fetch | Also blocked (eurodita.com, satusbaltic.com, summerhouse24.co.uk). Competitor analysis relies on `site:` queries and SERP snippets. |
| Consequences | Head terms such as "log cabins", "garden sheds" and "wooden houses" show US-intent SERPs (Wikipedia, Costco, Hobby Lobby). UK SERPs would be different: Dunster House, Tuin, BillyOh, Waltons, B&Q. Treat Tier C results as directional only. |
| Recommendation | Confirm these results with **Google Search Console** (Performance > Queries, country = UK/IE/DE/NL) and a UK-located rank tracker such as SE Ranking, Ahrefs or Semrush with location set to United Kingdom. Keep the exact query strings from the CSV so runs stay comparable. |

**Summary:** ideaswood.eu ranks in the top results for **0 of 37 non-brand queries**. It appears only for the brand query `ideaswood` (homepage at position 7, /about-us/ at 8). Two further signals matter. For `log cabin manufacturer Lithuania` and `log cabin factory Lithuania`, the #1 result is ideaswood's **own Facebook page** ("Log Cabins Factory-ideaswood.eu"). Google therefore connects the entity to these queries, but the website does not capture that traffic.

---

## 1. Keyword universe (40 keywords)

Difficulty is a qualitative estimate (Low / Med / High / Very High) based on how strong the domains in the SERP are and on SERP type. It is not a tool-measured KD, so validate it with Ahrefs or Semrush volumes before prioritising.

Intent codes: **C** = commercial investigation, **T** = transactional, **B2B** = trade/wholesale transactional, **I** = informational, **N** = navigational.

### Tier A: winnable long-tail and B2B (priority now)

| # | Keyword | Intent | Difficulty | Target page (proposed) |
|---|---|---|---|---|
| 1 | log cabin manufacturer Lithuania | B2B / N | Low | /log-cabin-manufacturer/ (B2B hub) |
| 2 | log cabins manufacturer Europe | B2B | Med | /log-cabin-manufacturer/ |
| 3 | log cabin factory Lithuania | B2B | Low | /log-cabin-manufacturer/ (+ factory/about) |
| 4 | wooden house manufacturer Lithuania | B2B / C | Low–Med | /wooden-houses/ hub |
| 5 | prefab wooden houses from Lithuania | C | Low–Med | /wooden-houses/ hub |
| 6 | timber frame houses Lithuania export | B2B | Low | /timber-frame-houses/ |
| 7 | log cabin wholesale supplier | B2B | Low–Med | /wholesale/ (dealer programme) |
| 8 | private label log cabins supplier for dealers | B2B | Med (Eurodita dominates) | /wholesale/private-label/ |
| 9 | garden shed manufacturer Europe wholesale | B2B | Low | /wholesale/garden-sheds/ |
| 10 | garden sauna wholesale supplier | B2B | Low | /wholesale/saunas/ |
| 11 | sauna manufacturer Lithuania | B2B | Low | /saunas/ + /wholesale/saunas/ |
| 12 | barrel sauna manufacturer | B2B / C | Med (US SERP) | /saunas/barrel-saunas/ |
| 13 | outdoor sauna manufacturer Europe | B2B / C | Med | /saunas/ |
| 14 | glamping pods manufacturer europe | B2B | Med | /glamping-pods/ (commercial) |
| 15 | camping pods manufacturer Lithuania | B2B | Low | /glamping-pods/ |
| 16 | wooden summer houses manufacturer Lithuania | B2B | Low | /summer-houses/ |
| 17 | wooden garden furniture manufacturer Europe wholesale | B2B | Med (Europages owns SERP) | /garden-furniture/ + Europages listing |
| 18 | Nordic spruce log cabin kits | C | Med | /log-cabins/ (hub) |
| 19 | 44mm log cabin | T | Med | /log-cabins/44mm/ |
| 20 | 70mm log cabin (and "68mm log cabin") | T | Med | /log-cabins/68mm-70mm/ |
| 21 | 28mm log cabin | T | Low–Med | /log-cabins/28mm/ |
| 22 | garden room kits Europe | C | Med | /garden-rooms/ |
| 23 | log cabin delivery to Ireland | T | Med | /delivery/ireland/ |
| 24 | log cabin delivery to UK from Europe | T / I | Low | /delivery/uk/ |

### Tier B: mid-competition commercial

| # | Keyword | Intent | Difficulty | Target page |
|---|---|---|---|---|
| 25 | log cabins for sale Europe | T | Med–High | /log-cabins/ |
| 26 | log cabin kits UK | T | High | /log-cabins/ + /delivery/uk/ |
| 27 | wooden garden house kits | T | Med | /garden-houses/ |
| 28 | summer house kits | T | High | /summer-houses/ |
| 29 | residential log cabins | C / T | High | /log-cabins/residential/ |
| 30 | log cabin houses to live in Europe | C | Med | /log-cabins/residential/ |
| 31 | insulated log cabins | C / I | High | /log-cabins/insulated/ + guide |
| 32 | garden log cabins | T | High | /log-cabins/ |
| 33 | barrel sauna kit | T | Med–High | /saunas/barrel-saunas/ |
| 34 | wooden garage kits | T | Med | /garages/ |
| 35 | log cabin manufacturer | B2B / C | High (US log-home SERP) | /log-cabin-manufacturer/ |
| 36 | log cabin prices / log cabin cost | I / C | Med–High | /guides/log-cabin-cost/ |

### Tier C: head terms (long-term, authority-dependent)

| # | Keyword | Intent | Difficulty | Note |
|---|---|---|---|---|
| 37 | log cabins | Mixed | Very High | Wikipedia plus national retailers. Unrealistic within 12 months. |
| 38 | garden sheds | T | Very High | Dominated by big-box retailers in the UK. |
| 39 | wooden houses | Mixed (US = crafts) | Very High | Intent mismatch in the US. In the UK and EU it is prefab-house directories. |
| 40 | summerhouses / summer houses | T | Very High | GBD, B&Q, Dunster House, Summerhouse24 |

---

## 2. Baseline rankings, 2026-09-25

Exact query strings are listed below; keep them byte-identical when re-running. "NR" means ideaswood.eu is not among the results returned (about the top 9–10).

| Query (exact) | Tier | ideaswood.eu | #1 | #2 | #3 |
|---|---|---|---|---|---|
| `log cabin manufacturer Lithuania` | A | NR (**own Facebook page is #1**) | facebook.com | eurowood.lt | eurowood.lt |
| `log cabins manufacturer Europe` | A | NR | en.wikipedia.org | loghomes.sk | palmakologcabins.co.uk |
| `wooden house manufacturer Lithuania` | A | NR | klaster.lt | spassio.com | woodhouses.eu |
| `garden sauna wholesale supplier` | A | NR | gardensauna.co.uk | saunamarketplace.com | en.wikipedia.org |
| `log cabin wholesale supplier` | A | NR | globalsources.com | pinecab2b.com | wholesaleloghomes.com |
| `Nordic spruce log cabin kits` | A | NR | palmako.co.uk | summerhouse24.co.uk | homesteadsupplier.com |
| `prefab wooden houses from Lithuania` | A | NR | klaster.lt | spassio.com | ecobustas.lt |
| `garden room kits Europe` | A | NR | thegardenroomguide.co.uk | palmako.co.uk | lumohouses.com |
| `44mm log cabin` | A | NR | powersheds.com | tigersheds.com | logcabinkits.co.uk |
| `70mm log cabin` | A | NR | tuin.co.uk | tigersheds.com | tigersheds.com |
| `barrel sauna manufacturer` | A | NR | fieldmag.com | almostheaven.com | almostheaven.com |
| `glamping pods manufacturer europe` | A | NR | moderncampground.com | epicmonday.com | epicmonday.com |
| `log cabin factory Lithuania` | A | NR (**own Facebook page is #1**) | facebook.com | woodfactory.lt | eurowood.lt |
| `sauna manufacturer Lithuania` | A | NR | ensun.io | accio.com | eskalada.com |
| `private label log cabins supplier for dealers` | A | NR | bloggang.com | globenewswire.com | eurodita.com |
| `garden shed manufacturer Europe wholesale` | A | NR | globalsources.com | globalsources.com | europages.co.uk |
| `camping pods manufacturer Lithuania` | A | NR | alibaba.com | prweb.com | energyhouses.com |
| `wooden summer houses manufacturer Lithuania` | A | NR | woodenme.com | spassio.com | eurowood.lt |
| `timber frame houses Lithuania export` | A | NR | gtaic.ai | klaster.lt | spassio.com |
| `wooden garden furniture manufacturer Europe wholesale` | A | NR | gardenforum.co.uk | europages.co.uk | mgtimberproductsltd.co.uk |
| `log cabins for sale Europe` | B | NR | summerhouse24.co.uk | en.wikipedia.org | bertsch-holzbau.eu |
| `wooden garden house kits` | B | NR | alibaba.com | gardenista.com | freedomroom.com |
| `summer house kits` | B | NR | summerhouse24.co.uk | rolifeonline.com | salamanderstoves.com |
| `residential log cabins` | B | NR | pinterest.com | en.wikipedia.org | en.wikipedia.org |
| `log cabin kits UK` | B | NR | summerhouse24.co.uk | dunsterhouse.co.uk | logcabinkits.co.uk |
| `insulated log cabins` | B | NR | gardenbuildingsdirect.co.uk | tigersheds.com | tentsile.com |
| `garden log cabins` | B | NR | gardenbuildingsdirect.co.uk | tigersheds.com | tigersheds.com |
| `outdoor sauna manufacturer Europe` | B | NR | corso-saunamanufaktur.com | saunamanufacture.com | baltresto.com |
| `log cabin delivery to Ireland` | B | NR | loghouse.ie | timberliving.ie | timberkitbuildings.ie |
| `log cabin manufacturer` | B | NR | eloghomes.com | loghome.com | southlandloghomes.com |
| `barrel sauna kit` | B | NR | saunamarketplace.com | saunamarketplace.com | fieldmag.com |
| `wooden garage kits` | B | NR | dcstructures.com | jamaicacottageshop.com | amazon.com |
| `log cabin houses to live in Europe` | B | NR | nature.house | nature.house | en.wikipedia.org |
| `log cabins` | C | NR | en.wikipedia.org | en.wikipedia.org | en.wikipedia.org |
| `garden sheds` | C | NR | summerwood.com | eartheasy.com | costco.com |
| `wooden houses` | C | NR | hobbylobby.com | amazon.com | target.com |
| `summerhouses` | C | NR | en.wikipedia.org | en.wikipedia.org | merriam-webster.com |
| `ideaswood` (brand control) | brand | **7** (homepage), 8 (/about-us/) | instagram.com | linkedin.com | instagram.com |

**Score: 0/37 non-brand keywords in the top 10.** The baseline is zero, so any appearance counts as progress.

### Index observations from `site:` queries (relevant to keyword targeting)

These are findings, not rankings. They explain why the pages that exist do not rank.

| ID | Finding | Evidence | Impact |
|---|---|---|---|
| K-1 | **Duplicate brand domain.** ideaswood.com ("Wood Passion") is indexed with the same catalogue and the same article, *The Ultimate Log Cabin Guide*, which also exists on ideaswood.eu. | `site:ideaswood.com` returns /the-ultimate-log-cabin-guide/, /product-category/houses/log-cabins/ and /product/44-linus-5x4/ | Link equity is split across the two domains and the content duplicates itself. Choose one canonical domain and 301 the other, or use hreflang with genuinely distinct regional content. |
| K-2 | **www and non-www both indexed.** | `https://www.ideaswood.eu/product/44mm-linus-4x5-n/` and `https://ideaswood.eu/product-category/houses/log-cabins/` both appear | Canonicalisation or redirect problem. It dilutes rankings. |
| K-3 | **Product names carry no keywords.** Examples: "44mm Linus 4x5 (N) - IdeasWood", "68mm Wendy (N)", "Alma 7x8 m". | site: results | The titles never say "log cabin", "garden room" or "summer house". Target format: `Linus 4x5m 44mm Log Cabin Kit, Nordic Spruce | IdeasWood`. |
| K-4 | **Thin archives indexed.** /category/uncategorized/, /product-category/featured/ and deep attribute archives such as "Camping pod 3m width 28mm walls Not insulated Archives". | site: results | Crawl budget is wasted and thin pages are indexed. Noindex the archives and create curated hubs instead. |
| K-5 | **Typo and geography mismatch in titles.** "Buy **Welness** Sauna in UK", while prices are shown in **EUR incl. 21% VAT (LT)**. | site: results | UK buyers see EUR prices and LT VAT, which undermines trust and relevance for UK queries. |
| K-6 | **A blog exists but is off-target.** Posts cover thermowood cladding and Koralan UK 110 impregnation. | site: results | Useful topics, but none targets a buyer keyword such as cost, planning or wall thickness. |
| K-7 | **Inconsistent founding year.** The site says "26,000 customers since 1993"; the brief says 2007. | ideaswood.com / ideaswood.eu snippets | E-E-A-T and trust. Fix it everywhere, including Organization schema `foundingDate`. |
| K-8 | **The homepage title is good:** "Log Cabins and Wooden Houses Manufacturer & Supplier - Ideaswood". | brand SERP | It should rank for "log cabin manufacturer Lithuania". The lack of ranking points to authority, content depth or technical issues, not to the title. |

---

## 3. Competitors

### Recurring domains (number of tracked SERPs in which they appear)

| Domain | Country / type | Appearances | Where |
|---|---|---|---|
| summerhouse24.co.uk | UK storefront for EU-made cabins | 6 | Nordic spruce kits, log cabins for sale Europe, summer house kits, log cabin kits UK, summerhouses |
| eurodita.com | LT, B2B private label | 5 | LT manufacturer, factory LT, for sale Europe, private label (6/9 results), shed wholesale |
| tigersheds.com | UK retailer | 5 | 44mm, 70mm, insulated, garden log cabins |
| satusbaltic.com | LT manufacturer, B2B + B2C | 4 | LT manufacturer, manufacturer Europe (x2), for sale Europe (x2), private label |
| eurowood.lt (Eurovudas) | LT manufacturer | 4 | LT manufacturer (x3), factory LT, summer houses LT |
| palmako.co.uk / palmakologcabins.co.uk | EE manufacturer, UK arm | 4 | manufacturer Europe, Nordic spruce, garden room kits, summer house kits |
| europages.co.uk | B2B directory | 6 | LT manufacturer, sheds wholesale, furniture wholesale, for sale Europe, sauna LT |
| spassio.com / klaster.lt | listicle / cluster directory | 5 | wooden houses LT, prefab LT, summer houses LT, timber frame LT |
| dunsterhouse.co.uk | UK manufacturer-retailer | 2 (+ many UK SERPs) | log cabin kits UK, summerhouses |
| tuin.co.uk | UK retailer | 2 | 70mm log cabin, summer house kits |
| pineca.com / pinecab2b.com | LT, B2C + B2B | 3 | wholesale supplier, wooden garden house kits, garage kits |
| gardenbuildingsdirect.co.uk | UK retailer | 3 | insulated, garden log cabins, summerhouses |

Directories (Europages, Spassio, KlasterLT, woodhouses.eu, ensun.io, glampitect.com) are **not rivals. They are listing opportunities.** Getting ideaswood onto each of them is the fastest route onto page 1 for Tier A "manufacturer Lithuania" queries.

### Top 6 competitors: what they do better

#### 1. Eurodita (eurodita.com), the closest B2B rival
- **Page types:** a dedicated page for each B2B intent: `/log-cabins-manufacturer-in-lithuania/`, `/private-label-manufacturing/`, `/bespoke-custom-log-cabins/`, `/residential-log-cabins/` ("B2B Private-Label"), `/log-cabins/sheds/` ("B2B Wholesale Manufacturer"), `/partner-onboarding-guide/`, `/markets/` (localised pages in 10 languages).
- **Titles:** the keyword is always paired with a B2B qualifier, for example "Log Cabins Manufacturer In Lithuania | Log Cabins B2B | Eurodita" and "Private-Label Log Cabins: Complete Dealer Guide".
- **Trust numbers:** "98 active partners across 38 countries", "30 years", "FSC Nordic spruce", "German CNC ±2 mm", "quote + 3D renders in 24–48 h", "dealer margins 25–45%".
- **Digital PR:** a GlobeNewswire press release (Feb 2026) ranks #2 for the private-label query, and a PRWeb release ranks for camping pods.
- **Lesson:** Eurodita wins B2B queries with **one page per B2B intent**, dealer economics and PR. ideaswood has no equivalent pages in the index.

#### 2. Satus Baltic (satusbaltic.com), LT, B2B and B2C
- Its homepage title is keyword-exact: "Bespoke Log Cabins & Wooden Houses Manufacturer".
- `/partner-program` is titled "Wholesale Log Cabins & Wooden Houses For Sale | Modular Cabins". It ranks for "manufacturer Europe" and "for sale Europe".
- `/custom-quote` is a free quote with a 3-business-day SLA.
- Clean product URLs (`/products/vasto-5-95-5-95-m`) with a consistent title suffix. Snippets mention FSC certification, "3,000+ projects" and wall-profile options.
- **Lesson:** a short, keyword-exact homepage title, a wholesale page, and FSC as a trust signal.

#### 3. Summerhouse24 (summerhouse24.co.uk), UK storefront for European-made kits
- The strongest content engine in the set. It publishes **buyer guides that rank**: "European Log Cabin Kits And Prices (UK Edition 2026)" ranks #1 for "log cabins for sale Europe", and there are guides to shed bases (grass, gravel, uneven ground), granny annexes (cost, law, Caravan Sites Act), "best shed to buy" and interior ideas.
- A local ccTLD (.co.uk), GBP pricing and UK-specific topics.
- **Lesson:** a UK-localised storefront plus **cost/price guides with a year in the title** win Tier B. This is the direct model for ideaswood's UK strategy.

#### 4. Palmako (palmako.co.uk + palmakologcabins.co.uk), Estonian manufacturer
- A **UK subsidiary domain** (GardenLife Products Ltd, since 2011) with a UK phone number, "free delivery across mainland UK" and kerbside-delivery explanations.
- Separate collections by use: `/collections/garden-offices`, `/insulated-garden-rooms`, `/garden-rooms`, `/summer-houses` and barrel saunas. "Slow-grown Nordic spruce" appears in every title and snippet.
- Scale proof: "60,000 buildings/year, 300 employees". It offers a bespoke design service and FAQs.
- **Lesson:** separate collections by **use case** (garden office, insulated garden room), plus UK phone and delivery trust signals.

#### 5. Eurowood / Eurovudas (eurowood.lt), LT manufacturer
- Ranks #2 and #3 for "log cabin manufacturer Lithuania" with a plain `/log-cabins/`, `/summer-houses/` and `/about-us/` structure.
- The About page carries hard numbers: "since 2003, 10,000+ buildings/year, 20,000+ cabins sold worldwide".
- Third-party mentions: it is cited in thegardenroomguide.co.uk's DIY kit guide.
- **Lesson:** even a simple site ranks for LT manufacturer queries when the About/manufacturer page is specific and quantified and the brand is cited by UK guide sites.

#### 6. Dunster House (dunsterhouse.co.uk), UK market leader (Tuin and Tiger Sheds are similar)
- A **Help Centre** with more than 8 planning-permission and building-regulations pages, for example "Do I need planning permission for my log cabin", "Garden Buildings Planning Permission UK" and "Building Regulations & Planning Permission". These capture high-volume informational UK queries and link into products.
- Category landing pages by **thickness** and by **use**: `/log-cabins/kits`, plus Tuin's `/log-cabins-44mm/`, `/log-cabins-58mm/`, `/log-cabins-70mm/`, `/log-cabins-residential/`, `/affordable-log-cabins/` ("all under £5,000") and `/premium-log-cabins-and-garden-offices/`.
- Reviews and guarantees ("10-year guarantee"), installation services, and Ireland coverage via a reseller (shedfactoryireland.ie).
- **Lesson:** **one landing page per wall thickness, per price band and per use**, backed by a planning-permission knowledge base.

### Cross-competitor gap summary

| Capability | Eurodita | Satus | SH24 | Palmako | Eurowood | Dunster/Tuin | ideaswood (observed) |
|---|---|---|---|---|---|---|---|
| B2B manufacturer landing page | Yes | Yes | – | partial | Yes | – | **No indexed page** |
| Wholesale / dealer / private-label page | Yes (several) | Yes | – | resellers mentioned | partial | – | **Not found** (a blog mention of "resellers" only) |
| Wall-thickness hubs (28/44/68–70mm) | – | profiles | Yes | – | – | **Yes** | Filter archives only |
| Use-case hubs (office, residential, insulated) | residential | – | Yes | **Yes** | – | **Yes** | No |
| Buyer guides (cost, planning, base) | dealer guides | – | **Yes** | FAQ | – | **Yes** | 1 generic guide, 2 treatment posts |
| UK localisation (GBP, UK phone, delivery) | – | – | **Yes** | **Yes** | – | **Yes** | EUR incl. LT VAT |
| Configurator / quote tool | 3D quote in 24–48h | custom quote | – | bespoke service | bespoke | – | **IdeasPlanner 3D tool (an asset, but under-leveraged)** |
| Hard trust numbers | Yes | Yes | – | Yes | Yes | Yes | Inconsistent (1993 vs 2007) |
| PR / directory presence | **Yes** | – | – | – | Yes | – | Facebook only |

---

## 4. Content gap: assets ideaswood needs

Ordered by priority. Tier A (P1) should show movement within 4–8 weeks of indexing.

### P1: B2B and manufacturer pages (target Tier A)
1. **/log-cabin-manufacturer/**: "Log Cabin Manufacturer in Lithuania | Factory-Direct Since 20XX". Cover factory size, "3,200 m² of structures per month" capacity, CNC, Nordic spruce, certifications (FSC/PEFC if held), export countries, lead times, a video from the factory, and Organization + LocalBusiness schema. Link it from the Facebook page, which already ranks #1.
2. **/wholesale/** (dealer programme): MOQ, dealer pricing tiers, margin example, container loads (units per 40ft), private label or white label, marketing kit, a "Become a dealer" form. Titles along the lines of "Log Cabin Wholesale Supplier | Dealer & Private-Label Programme".
3. **B2B sub-pages:** `/wholesale/saunas/` ("garden sauna wholesale supplier"), `/wholesale/garden-sheds/`, `/wholesale/glamping-pods/` (campsite operators: ROI, planning, insulation), `/wholesale/garden-furniture/`, `/wholesale/private-label/`.
4. **Wooden houses hub:** `/wooden-houses/` and `/timber-frame-houses/` targeting "prefab wooden houses from Lithuania" and "wooden house manufacturer Lithuania". Cover the process, U-values, what is included in the kit, and delivery.
5. **Directory and PR push (off-page):** Europages, Spassio, KlasterLT/PrefabLT, woodhouses.eu, ensun.io, Glampitect's manufacturer list, thegardenroomguide.co.uk kit roundup, and one press release (on GlobeNewswire or EIN Presswire, following Eurodita's approach).

### P1: product taxonomy landing pages (target Tier A/B)
6. **Wall-thickness hubs:** `/log-cabins/28mm/`, `/log-cabins/44mm/`, `/log-cabins/68mm/` (title "68mm / 70mm Log Cabins"). Each needs 400–800 words of unique copy (uses, U-value, when planning or building regulations apply, and a comparison table) plus the product grid. They replace the thin filter archives.
7. **Use-case hubs:** `/log-cabins/residential/`, `/log-cabins/insulated/`, `/garden-rooms/` (garden office), `/summer-houses/`, `/garages/`, `/saunas/barrel-saunas/`, `/saunas/sauna-pods/`, `/glamping-pods/`.
8. **Product title and H1 rewrite across the catalogue:** `{Model} {W}x{D}m {thickness}mm {Type} Kit | IdeasWood`. Add Product schema with `offers` (price, priceCurrency, availability), `brand` and `material`.

### P2: market and delivery pages (target Tier B UK/IE)
9. **/delivery/uk/**: lead times, cost, customs and VAT after Brexit (who pays import VAT and duty, DDP versus DAP), kerbside delivery, pallet sizes. Target "log cabin delivery UK" and "buy log cabin from Europe UK".
10. **/delivery/ireland/**: Ireland is intra-EU, so no customs. This is a strong differentiator against UK sellers into Ireland. Target "log cabin delivery to Ireland" and "log cabins Ireland".
11. **Currency and VAT:** show GBP for UK visitors, or at least explain the VAT treatment. Consider /en-gb/ and /en-ie/ with hreflang, or resolve the ideaswood.com duplicate into a real regional site (see K-1).

### P2: buyer guides (target informational queries and links)
12. **Log cabin cost guide 2026 (UK & Europe):** prices by size and thickness, kit versus installed, delivery, base, insulation. This is Summerhouse24's #1 winning page type.
13. **Planning permission for log cabins (UK)** and **(Ireland: exempted development, 25 m²)**, plus building regulations for residential cabins.
14. **28mm vs 44mm vs 68mm log cabin: which wall thickness?** with a comparison table and U-values.
15. **How to build a log cabin base** (concrete, slab, ground screws, timber frame).
16. **Insulating a log cabin for year-round use.**
17. **Barrel sauna vs cube sauna vs sauna pod**, and **outdoor sauna buying guide** (heaters, wood types, thermowood; the existing thermowood post can be reused).
18. **Glamping pod business guide:** costs, ROI and planning for campsites. It feeds the B2B pods page.
19. **Comparisons:** "Buying a log cabin direct from a Baltic manufacturer vs a UK retailer", and "Nordic spruce vs UK-grown timber".

### P3: trust and conversion assets
20. **Reviews:** Trustpilot or Google reviews with an on-site widget and AggregateRating on products, where the reviews are genuine and first-party.
21. **Case studies and gallery:** installations by country (UK, IE, DE, NL, FR), and dealer success stories.
22. **Promote the IdeasPlanner 3D tool** as a landing page (`/log-cabin-configurator/`) targeting "log cabin configurator", "design your own log cabin" and "custom log cabin builder". No competitor in these SERPs offers a public 3D planner, which makes it a strong linkable asset.
23. **Downloads:** catalogue PDF, spec sheets, assembly manuals (also for the "installation guide" long-tail). Gate the dealer price list behind the wholesale form.
24. **Fix the founding-year inconsistency** and publish a consistent company fact sheet (year, capacity, customers, export countries).

---

## Re-run protocol
1. Run each `keyword` in `seo/tracking/rankings.csv` **verbatim** with the same tool.
2. Append rows with the new `date`. Do not overwrite earlier rows.
3. Record ideaswood.eu, www.ideaswood.eu **and** ideaswood.com separately in `notes`.
4. Weekly: add GSC average position for the same queries (UK, IE and all countries) as a sanity check against the US-based tool.
