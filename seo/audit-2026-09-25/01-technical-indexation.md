# ideaswood.eu: Technical and Indexation SEO Audit

**Date:** 2026-09-25
**Scope:** Technical SEO, indexation, titles and meta, duplication, language signals
**Target markets:** English-language queries (UK, IE, DE/Nordics in English, general EU)
**Method:** I could not reach ideaswood.eu directly from the audit environment (HTTP blocked). The PageSpeed Insights API returned `429 RESOURCE_EXHAUSTED` (quota 0). All evidence below comes from about 40 US-based web-search queries (`site:ideaswood.eu`, `site:www.ideaswood.eu`, `site:ideaswood.com`, topical and operator queries). Search snippets are summarised by the search tool, so treat snippet text as indicative. Titles and URLs are quoted exactly as returned.

> **Verify first:** Before acting, confirm each finding in Google Search Console (GSC). Use Pages → Indexed / Not indexed, URL Inspection, and the Sitemaps report. A crawl with Screaming Frog or Sitebulb is also needed. Neither was possible from here.

---

## 0. Baseline metrics (as observed 2026-09-25)

| Metric | Count | Notes |
|---|---|---|
| Distinct URLs on ideaswood.eu hosts found in SERPs | **76** | Includes non-www https, www https and http www |
| - on `https://ideaswood.eu/` (current site) | 53 | |
| - on `https://www.ideaswood.eu/` (older WooCommerce catalogue) | 21 | Title pattern "… - IdeasWood" / "… Archives - IdeasWood" |
| - on `http://www.ideaswood.eu/` (pre-WordPress Joomla or old shop) | 2 | `.html` and `/lt/component/content/…` |
| Subdomains indexed | 2 | `factory.ideaswood.eu`, `business.ideaswood.eu` |
| Duplicate external domain with the same content | 1 (**ideaswood.com**) | 10 URLs seen, with the same slugs as ideaswood.eu |
| Product URLs found (all hosts) | 37 | 16 current and 21 legacy www |
| Product-category URLs found | 26 | 21 current and 5 legacy "Archives" |
| Blog/article URLs | 5 posts, 1 landing (`/scandinavian-wooden-houses-australia/`), 3 archives | |
| Titles that are generic or have no keyword (name only, "Featured", "Blog", "x", …) | **19** | 10 info/taxonomy pages and 9 product-name-only titles |
| Titles containing "in UK" (geo-restrictive) | **12** | All on category pages |
| Legacy "Archives - IdeasWood" titles | 5 | Old Yoast default for taxonomy archives |
| Distinct brand-suffix patterns in titles | **7** | `- ideaswood.eu`, `\| ideaswood.eu`, `- IdeasWood.eu's`, `- IdeasWood`, `\| IdeasWood`, `- Ideaswood`, and none |
| Spelling errors in titles or slugs | 6 URLs | "Welness", "Dinning" x3, "Talinn", "Linus 4x5" vs "5x4" |
| Category pages whose snippet contains "The page you requested could not be found" | **10** | Possible soft-404s or broken product loops |
| Test or junk pages indexed | 2 | `/x/`, `/category/uncategorized/` |
| Language versions (hreflang) | **0** | English only; one legacy `/lt/` Joomla URL |
| Phone numbers seen in indexed content | 2 | +370 678 22055 and +370 610 05085 (inconsistent NAP: name, address, phone) |

---

## 1. Indexed page inventory

### 1.1 Home, info and landing pages (`https://ideaswood.eu`)

| # | URL | SERP title | Snippet / observation |
|---|---|---|---|
| 1 | `/` | Log Cabins and Wooden Houses Manufacturer & Supplier - Ideaswood | "Europe's trusted log cabins manufacturer & supplier… deliver across the UK, Europe, USA and Australia" |
| 2 | `/about-us/` | About us - ideaswood.eu | "garden and house projects… Spruce and Pine… slow grown northern Europe wood" |
| 3 | `/contact-us/` | Contact Us - ideaswood.eu | Phone +37067822055 and info@ideaswood.eu |
| 4 | `/eu-project/` | EU project - ideaswood.eu | EU-funding disclosure page. Low search value. |
| 5 | `/wellness-saunas/` | Wellness Saunas - ideaswood.eu | "saunas and thermal wellness solutions exclusively to Resellers, Retailers, and Suppliers" (B2B) |
| 6 | `/easy-installation/` | Easy installation \| ideaswood.eu | "do not require specific skills… detailed assembly guide" |
| 7 | `/x/` | **x - ideaswood.eu** | Test or placeholder page. Appears for "guide", "Australia", "reviews" queries. |
| 8 | `/scandinavian-wooden-houses-australia/` | Eco Scandinavian Wooden Houses in Australia – Fast & Easy Assembly | Geo landing page for AU |

### 1.2 Blog

| # | URL | SERP title |
|---|---|---|
| 9 | `/blog/` | IdeasWood Blog – Tips & Ideas for Wooden Cabins |
| 10 | `/category/blog/` | **Blog - ideaswood.eu** (duplicates `/blog/`) |
| 11 | `/category/uncategorized/` | **Uncategorized - ideaswood.eu** |
| 12 | `/the-ultimate-log-cabin-guide/` | The Ultimate Log Cabin Guide - ideaswood.eu |
| 13 | `/pvc-windows-for-log-cabins/` | PVC Windows for Log Cabins — Specs, Sizes & Why We Recommend Them \| IdeasWood |
| 14 | `/thermowood-cladding-for-timber-buildings/` | Thermowood cladding: what it is, where it works, and where it does not - ideaswood.eu (**~85 characters, truncated**) |
| 15 | `/everything-you-need-to-know-about-insulation-kits-for-sheds-cabins-modular-homes/` | Everything You Need to Know About Insulation Kits for Sheds, Cabins & Modular Homes (**~80 characters, truncated**; slug is 80+ characters) |
| 16 | `/wood-impregnation-treatment-for-log-cabins-complete-guide-to-koralan-uk-110/` | Wood Impregnation Treatment for Log Cabins: Complete Guide to Koralan UK 110 - ideaswood.eu (**~90 characters, truncated**) |

### 1.3 Product categories (current, `https://ideaswood.eu/product-category/…`)

| # | Path | SERP title | Issue |
|---|---|---|---|
| 17 | `featured/` | **Featured \| ideaswood.eu** | WooCommerce "featured" pseudo-category. Thin. |
| 18 | `houses/` | Houses - ideaswood.eu | Generic |
| 19 | `houses/timber-frame-houses/` | Timber Frame Houses \| ideaswood.eu | OK, weak |
| 20 | `houses/log-cabins/` | Log cabins - ideaswood.eu | **Duplicate: log cabins under 3 parents** |
| 21 | `wooden-houses/` | Premium Wooden Houses Kits in UK - ideaswood.eu | Duplicate of #24 |
| 22 | `wooden-houses/log-cabins/` | Log cabins - ideaswood.eu | Duplicate of #20 and #23 |
| 23 | `log-cabins/` | Buy Premium Log cabins in UK - ideaswood.eu | "108 results, €1,261–€17,063" |
| 24 | `log-cabins/wooden-houses/` | Premium Wooden Houses Kits in UK - IdeasWood.eu's | Inverted hierarchy vs #21. Snippet shows "could not be found". |
| 25 | `log-cabins/garden-house/` | Buy Wooden Garden house in UK - ideaswood.eu | Duplicate of #26 |
| 26 | `log-cabins/wooden-houses/garden-house/` | Buy Wooden Garden house in UK - ideaswood.eu | Same title as #25 |
| 27 | `log-cabins/wooden-houses/summer-house/` | Buy Wooden Summer house in UK - IdeasWood.eu's | "could not be found" in snippet |
| 28 | `log-cabins/pergola-cabins/` | Buy Pergola cabins in UK - ideaswood.eu | |
| 29 | `log-cabins/storage-sheds/` | Buy Wooden Storage sheds in UK - IdeasWood.eu's | "32 products" |
| 30 | `log-cabins/garages-carports/` | Buy Wooden Garages / Carports in UK - ideaswood.eu | "6 products" |
| 31 | `furniture/garden-furniture/` | **Buy Garden furniture in UK - ideaswood.eu** | Geo mismatch (EUR, LT manufacturer) |
| 32 | `sauna/` | **Buy Welness Sauna in UK - ideaswood.eu** | Typo "Welness". "44 products". |
| 33 | `sauna/outdoor-sauna/sauna-pods/` | Sauna pods - IdeasWood.eu's | |
| 34 | `pergola/wooden-pergola/` | Buy Wooden pergola in UK - ideaswood.eu | |
| 35 | `hot-tub/outside-firewood-heater/` | "Hot tub with outside firewood stove" **and** "Outside firewood heater \| ideaswood.eu" | Google shows 2 different titles, so it is rewriting the title |
| 36 | `grill-cabins/grill-cabins-grill-cabins/` | Grill Cabins \| ideaswood.eu | Stuttering slug |
| 37 | `bbq-grill-cabin/grill-cabins/` | Grill Cabins - IdeasWood.eu's | Duplicate of #36 |

### 1.4 Products (current, `https://ideaswood.eu/product/…`)

| # | Slug | SERP title | Snippet |
|---|---|---|---|
| 38 | `alma-7x8-m/` | Alma 7x8 m - ideaswood.eu | 3 rooms, 32.1 m², €10,320–€11,038 |
| 39 | `verno/` | Verno - ideaswood.eu | €13,810–€22,609, 35.42 m² |
| 40 | `kaia/` | Kaia - ideaswood.eu | €15,816–€26,072 |
| 41 | `takoma-12x8-m/` | Takoma 12x8 m - ideaswood.eu | 75.1 m², €37,459 |
| 42 | `scarlett-7x10-2-m/` | Scarlett 7×10.2 m – Wooden Summer House | Good pattern (no brand) |
| 43 | `luni/` | Luni 6.8×9.8 m A Fully Insulated House – 47.3 m² | Good pattern |
| 44 | `typ-2-5-2x10-2-m/` | TYP-2 5.2x10.2 m - ideaswood.eu | 37.6 m² |
| 45 | `solari/` | Solari - ideaswood.eu | |
| 46 | `winnipeg-10-01x16-69-m/` | Winnipeg 10.01x16.69 m - ideaswood.eu | 118.2 m² |
| 47 | `wendy-9-7x9-8-m/` | Wendy 9.7x9.8 m - ideaswood.eu | 72.9 m² |
| 48 | `talinn-5x10-m/` | Talinn 5x10 m - ideaswood.eu | Typo (Tallinn) |
| 49 | `sauna-barrel-5-9-m-dia-1-97-m/` | Sauna Barrel 5.9 m, Dia. 1.97 m \| ideaswood.eu | |
| 50 | `wooden-dinning-set/` | Wooden Dinning Set - ideaswood.eu | Typo "Dinning" |
| 51 | `dinning-set/` | Elegant Dinning Set: Table, Sofa, and Arm Chairs Collection | Typo |
| 52 | `dinning-chairs-set-of-4/` | Dinning chairs set of 4 - ideaswood.eu | Typo |
| 53 | `lounge-set/` | Lounge Set - ideaswood.eu | Generic |

### 1.5 Legacy catalogue on `https://www.ideaswood.eu/` (old WooCommerce, 2021–2022 data)

All use the title suffix "- IdeasWood". This is a different template or SEO configuration from the current site, which means these URLs are still being served or have not been dropped from the index.

| # | URL (www) | SERP title |
|---|---|---|
| 54 | `/product-category/camping-house/camping-pods/insulated/24m-width/` | Camping Pods 2,4m width Insulated Archives - IdeasWood |
| 55 | `/product-category/camping-house/camping-pods/insulated/3m-width/` | Camping Pods 3m width Insulated Archives - IdeasWood |
| 56 | `/product-category/camping-house/camping-pods/not-insulated/3m-width-not-insulated/` | Camping Pods 3m width, Not Insulated Archives - IdeasWood |
| 57 | `/product-category/camping-house/camping-pods/not-insulated/camping-pod-3m-width-28mm-walls-not-insulated/` | Camping pod 3m width 28mm walls Not insulated Archives - IdeasWood |
| 58 | `/product-category/pavilions/double-pavilion-16-5-16-5/` | Double pavilion 16.5 + 16.5 Archives - IdeasWood |
| 59 | `/product/plan-camping-bus-5-9m/` | Plan Camping bus 5.9m - IdeasWood |
| 60 | `/product/camping-pod-3-0m-x-4-8m/` | Camping Pod 3.0m x 4.8m - IdeasWood |
| 61 | `/product/28mm-madrid-214x215/` | 28mm Madrid 2,14x2,15 - IdeasWood |
| 62 | `/product/68mm-wendy-n/` | 68mm Wendy (N) - IdeasWood |
| 63 | `/product/44mm-linus-4x5-n/` | 44mm Linus 4x5 (N) - IdeasWood |
| 64 | `/product/68mm-louise-6x6-n/` | 68mm Louise 6x6 (N) - IdeasWood |
| 65 | `/product/44mm-garage-5x5-n/` | 44mm Garage 5x5 (N) - IdeasWood |
| 66 | `/product/68mm-pave%CC%87sine%CC%87-nr-1-n/` | **68mm Pavėsinė Nr.1 (N) - IdeasWood** (Lithuanian word, combining-diacritic slug) |
| 67 | `/product/double-grill-cabin-69m%C2%B2/` | Grill Cabin 6,9m² - IdeasWood |
| 68 | `/product/double-grill-cabin-92m%C2%B2-with-25-extension/` | Grill Cabin 9,2m² with 2,5 Extension - IdeasWood |
| 69 | `/product/double-grill-cabin-92m%C2%B2-with-18-extension/` | Grill Cabin 9,2m² with 2,0 Extension - IdeasWood (slug says 1.8, title says 2.0) |
| 70 | `/product/exclusive-grill-cabin-92-m2/` | Exclusive grill cabin 9,2 m2 - IdeasWood |
| 71 | `/product/pavilion-9-2-m%C2%B2-with-25-extension/` | Pavilion 9.2 m² with 2,5 Extension - IdeasWood |
| 72 | `/product/sauna-barrel-24m-o-227m/` | Sauna barrel 2,4m Ø 2,27m - IdeasWood |
| 73 | `/product/sauna-barrel-40m-o-227m-with-changing-room/` | Sauna barrel 4,0m Ø 2,27m with changing room - IdeasWood |
| 74 | `/product/sauna-barrel-59m-o-227m-with-changing-room/` | Sauna barrel 5,9m Ø 2,27m with changing room - IdeasWood |

### 1.6 Pre-WordPress legacy (http, www)

| # | URL | SERP title |
|---|---|---|
| 75 | `http://www.ideaswood.eu/products/summer-houses/dac008-dijon-58mm.html` | Summer houses : DAC008 Dijon 58mm |
| 76 | `http://www.ideaswood.eu/lt/component/content/article/9-uncategorised/90-contacts` | **Log Cabins and Wooden Houses Manufacturer & Supplier - Ideaswood** (Joomla URL showing the current homepage title, so it is probably served as a duplicate of the homepage or through a soft redirect) |

### 1.7 Subdomains and sister domains

| Host | SERP title | Observation |
|---|---|---|
| `https://factory.ideaswood.eu/` | **logcabinsfactory.com – Wood Passion** | Different brand in the title. Competes for "log cabins" (it ranked above ideaswood.eu/ for `site:ideaswood.eu log cabins`). |
| `https://business.ideaswood.eu/` | Business with Ideaswood | B2B site, "© business.ideaswood.eu 2025" |
| `https://ideaswood.com/` | ideaswood.com \| Wood Passion | **Same slugs and content as ideaswood.eu**, for example `/product-category/houses/log-cabins/`, `/the-ultimate-log-cabin-guide/`, `/easy-installation/`, `/product/takoma-12x8-m/`. It says "since 1993 / 26,000 customers", while ideaswood.eu says "since 2007". For the query "ideaswood log cabins UK reviews", ideaswood.com/…/log-cabins/ ranked on page 1 next to ideaswood.eu. |

---

## 2. Title and meta issues

1. **Generic or keyword-free titles (19):**
   - `Featured | ideaswood.eu`, `Blog - ideaswood.eu`, `Uncategorized - ideaswood.eu`, `x - ideaswood.eu`, `Houses - ideaswood.eu`
   - `Log cabins - ideaswood.eu` (x2), `EU project - ideaswood.eu`, `About us - ideaswood.eu`, `Contact Us - ideaswood.eu`
   - Product titles that are only the model name: Alma, Verno, Kaia, Solari, Takoma, TYP-2, Winnipeg, Wendy, Talinn. None of these contain the product type (log cabin, garden room, insulated house kit), so they cannot rank for non-branded queries.
2. **Geo-restrictive "in UK" pattern (12 categories).** Examples: "Buy Premium Log cabins in UK", "Buy Garden furniture in UK", "Buy Welness Sauna in UK". This pattern:
   - Signals UK-only relevance, which suppresses IE, DE, Nordic and EU English queries.
   - Conflicts with EUR pricing, the Lithuanian address and the "UK, Europe, USA & Australia" copy.
   - Reads as keyword-stuffed template text ("Buy X in UK") that Google often rewrites.
3. **Seven inconsistent brand suffixes:** `- ideaswood.eu`, `| ideaswood.eu`, `- IdeasWood.eu's` (grammatically wrong), `- IdeasWood`, `| IdeasWood`, `- Ideaswood`, and none. This points to per-page manual overrides plus a changed global template, and possibly two SEO plugins or a plugin migration (Yoast "Archives - IdeasWood" vs a newer template).
4. **Typos in titles and slugs:** "Welness", "Dinning" (3 products), "Talinn", and "Linus 4x5" (www) vs "Linus 5×4" (.com).
5. **Truncation (>60 characters / ~580px):** the Koralan, Thermowood and Insulation-kits posts. Remove "- ideaswood.eu" from posts and shorten.
6. **Title rewriting by Google:** `/product-category/hot-tub/outside-firewood-heater/` shows two titles. This usually means the title does not match the H1 or content.
7. **Meta descriptions:** Many snippets are assembled from on-page body text (WooCommerce result counts, price ranges, "Wishlist / Shopping cart / Login / Register" navigation text on legacy pages). This suggests missing or ignored custom meta descriptions, especially on legacy www products and category pages.
8. **Duplicate titles:** "Log cabins - ideaswood.eu" (x2), "Buy Wooden Garden house in UK - ideaswood.eu" (x2), "Premium Wooden Houses Kits in UK" (x2), "Grill Cabins" (x2).

## 3. Thin or low-value pages that should be noindexed, redirected or removed

| URL | Action |
|---|---|
| `/x/` | Delete, return 410 (or 301 to `/`) |
| `/category/uncategorized/` | Move posts into real categories, noindex empty categories |
| `/category/blog/` | Noindex, or 301 to `/blog/` (duplicate of the blog index) |
| `/product-category/featured/` | Noindex (merchandising flag, not a real category) |
| `/eu-project/` | Keep live (legal obligation) but noindex |
| `/wellness-saunas/` (B2B reseller-only) | Keep, but point the canonical and internal links at the business subdomain or merge with `/product-category/sauna/` to avoid cannibalisation |
| Duplicate category trees (see §5) | 301 to one canonical category |
| All 21 legacy `www.` products and categories | 301 to the closest current product or category. For discontinued camping pods, pavilions and grill cabins with no equivalent, 301 to the parent category or return 410. |
| `http://www.ideaswood.eu/products/…html` and `/lt/component/…` | 301 at server level (regex) to current equivalents, or 410 |
| Cart, checkout, my-account, wishlist | Not seen indexed. Confirm they are noindexed (WooCommerce and Rank Math/Yoast do this by default). |
| Product tags (`/product-tag/…`), `?orderby=`, `?filter_`, `/page/N/` | Not seen in SERPs. Check GSC "Crawled/Discovered – not indexed" for them, and make sure faceted parameters are blocked or canonicalised. |

## 4. Language and hreflang signals

- **Only English is indexed.** No `/de/`, `/lt/`, `/ru/`, `/fi/` or `/sv/` WordPress versions were found. There are no WPML or Polylang signals.
- One **legacy Lithuanian Joomla URL** (`/lt/component/content/…`) is indexed and serves the English homepage title. This is a mixed-language signal.
- **Lithuanian leaking into the English catalogue:** product "68mm Pavėsinė Nr.1 (N)" (pavėsinė means gazebo), with a percent-encoded combining-diacritic slug.
- **Geo targeting is contradictory:** the titles say "in UK", one landing page targets Australia (`/scandinavian-wooden-houses-australia/`), the copy says "UK, Europe, USA & Australia", prices are in EUR, and ideaswood.com carries the same English content (probably aimed at US/global, with "ft" product names such as "Max 18.37 x 21.65 ft").
- **Recommendation:** If ideaswood.com is the US/global (imperial) version and ideaswood.eu the EU/UK version, implement **cross-domain hreflang**: `en-GB`/`en-IE`/`en` on .eu and `en-US` on .com, with self-referencing canonicals and x-default. Otherwise, 301 one domain to the other. Either way, remove "in UK" from EU-wide category titles and let hreflang or the content handle the country.

## 5. URL structure observations

- **Three competing product-category trees for the same products:**
  - `/product-category/houses/log-cabins/`
  - `/product-category/wooden-houses/log-cabins/`
  - `/product-category/log-cabins/` (with `wooden-houses/` nested *under* log-cabins, the reverse hierarchy)
  - `garden-house` exists both under `log-cabins/` and under `log-cabins/wooden-houses/`
  - Grill cabins exist under both `grill-cabins/grill-cabins-grill-cabins/` and `bbq-grill-cabin/grill-cabins/`

  This suggests leftover categories from a re-structure, or products assigned to several categories with the permalink base set to include the parent. The result is keyword cannibalisation and split link equity for the site's main money term, "log cabins".
- **Stuttering slug:** `grill-cabins-grill-cabins`, an automatic de-duplication suffix.
- **Inconsistent product slug conventions:**
  - Some slugs carry dimensions (`alma-7x8-m`) and some are bare (`verno`, `kaia`, `luni`, `solari`)
  - Legacy slugs use wall thickness prefixes (`68mm-`, `44mm-`)
  - Some slugs contain non-ASCII characters (`m²`, `ė`)
- **Overlong post slugs** (80+ characters).
- **WooCommerce permalinks:** `/product/` and `/product-category/` are the defaults. They work, but a flatter `/log-cabins/…` shop base would be stronger. This is optional and low priority because it needs mass 301s.

## 6. Signs of technical problems

| Signal | Evidence | Likely cause |
|---|---|---|
| **www vs non-www split** | 21 `https://www.ideaswood.eu/…` URLs indexed alongside `https://ideaswood.eu/…` | The www host either still serves an old WP install or database, or redirects www to non-www without a matching path, so old slugs 404 or were never redirected. Google keeps stale URLs. |
| **HTTP legacy URLs** | 2 `http://www.` URLs (Joomla `.html` and `/lt/component/…`) still in the index | Missing server-level 301s from the pre-2021 site |
| **Soft-404 / empty categories** | 10 category pages have "The page you requested could not be found" in their snippet text (garden furniture, wooden houses, summer house, garden house, grill cabins, wooden pergola, storage sheds, garages/carports, sauna, pergola cabins) | Either a theme "no products found" or 404 block rendered inside a 200 page (for example an empty sub-loop or widget), or these categories were empty when crawled. **High priority to verify.** Google can treat such pages as soft 404s. |
| **Cross-domain duplication** | ideaswood.com mirrors ideaswood.eu paths and pages | Two WP installs from one content base with no cross-domain canonicals or hreflang |
| **Subdomain competition** | factory.ideaswood.eu ("logcabinsfactory.com") ranks for "log cabins" | Separate site on the same root |
| **Google title rewrites** | Hot-tub category shows 2 titles | Title does not match the H1 |
| **Inconsistent NAP** | +370 678 22055 (contact page snippet) vs +370 610 05085 | Hurts entity and local trust. Make one number canonical in the schema. |
| **Inconsistent brand facts** | "since 2007" (.eu) vs "since 1993, 26,000 customers" (.com) | E-E-A-T and entity confusion |
| **PageSpeed / Core Web Vitals** | Not measured (API quota 0) | Run PSI or CrUX manually |
| Attachment pages, `?p=`, `?add-to-cart=`, `/feed/` | **Not observed** | Confirm in GSC |

## 7. Prioritised fix list

### P0: critical, this week

1. **Resolve the www/http legacy index (23 URLs).**
   - Make sure the server (`.htaccess` or nginx, *not* only WP) does http → https and www → non-www with the path preserved, as a single 301 hop.
   - Build a redirect map for the 21 legacy www product and category slugs and the 2 Joomla/HTML URLs. Use the Rank Math → Redirections module, or the "Redirection" plugin with regex, for example:
     - `^/product/(28|44|58|68)mm-(.*)$` → nearest current model or category
     - `^/product-category/camping-house/.*` → closest current category (or 410)
     - `^/products/.*\.html$` → `/product-category/log-cabins/`
     - `^/lt/.*` → `/` (or 410)
   - Resubmit `sitemap_index.xml` and use GSC Removals only for URLs that return 410.
2. **Fix the "could not be found" category pages.** Open each of the 10 categories. If the 404 message appears in the HTML, find the theme block or widget (often an empty "related"/"recently viewed" loop or a stale Elementor template) and remove it. Check URL Inspection for a "Soft 404" status.
3. **Decide the ideaswood.com vs ideaswood.eu relationship.**
   - Either implement cross-domain hreflang (`en-US` → .com; `en-GB`, `en-IE` and `en` x-default → .eu) with self-canonicals,
   - or 301 .com to .eu (or vice versa).
   - Align the company facts (founding year, customer count).
4. **Consolidate the category trees.** Pick one hierarchy, for example `/product-category/log-cabins/`, `/garden-rooms/`, `/summer-houses/`, `/garden-sheds/`, `/wooden-houses/`, `/saunas/`, `/pergolas/`, `/hot-tubs/`, `/garden-furniture/`. Then:
   - Reassign products (set one **primary category** per product in Rank Math/Yoast).
   - Delete the duplicate terms.
   - 301 the old term URLs to the kept term.
5. **Delete `/x/`** and return 410.

### P1: high, within 2–3 weeks

6. **Rewrite the title templates** (Rank Math → Titles & Meta, or Yoast → Search Appearance):
   - Separator: `|`. Brand: `IdeasWood`. Keep the brand only on home, category and info pages; drop it on products and posts if space is short.
   - Product template: `%title% – %primary_category% Kit | IdeasWood`, for example "Alma 7x8 m – Insulated Log Cabin Kit, 32 m² | IdeasWood". For high-value models, write the title manually with the size in m², the insulation and the use.
   - Category: `%term_title% – Made in Europe, Delivered to UK & EU | IdeasWood`, for example "Log Cabins for Sale – Nordic Timber Kits Delivered UK & EU | IdeasWood". **Remove every "Buy … in UK".**
   - Posts: `%title%` only, kept to 60 characters or less.
7. **Noindex:**
   - `/product-category/featured/`, `/category/uncategorized/`, `/category/blog/` (or 301 it to `/blog/`), `/eu-project/`
   - Product tags, author archives, date archives, and `?orderby`/`?filter` URLs (Rank Math: Titles & Meta → Misc/Taxonomies → Robots Meta = noindex; WooCommerce product_tag set to noindex).
   - In Rank Math → General → Links, enable "Redirect Attachments" to the parent post.
8. **Write unique meta descriptions** (140–155 characters) for all categories and the top 30 products. Include size, insulation, delivery area and price.
9. **Fix the typos:** Welness → Wellness, Dinning → Dining (rename the slugs with 301s), Talinn → Tallinn, Pavėsinė → Gazebo.
10. **Unify NAP** (one phone number, the Vilnius address) across the header, footer, contact page and `Organization`/`LocalBusiness` schema.
11. **Subdomains:**
    - Retitle factory.ideaswood.eu so it no longer carries the "logcabinsfactory.com" brand.
    - Either canonical its duplicate product pages to ideaswood.eu or noindex it if it only mirrors the catalogue.
    - Make sure business.ideaswood.eu targets B2B terms only ("wholesale log cabins", "sauna supplier for resellers").

### P2: medium, within 1–2 months

12. Standardise product slugs to `model-size-type` (for example `alma-7x8-log-cabin`) only for new products. Do not mass-rename existing indexed URLs unless they contain typos or non-ASCII characters.
13. Shorten the 80+ character post slugs, with 301s.
14. Add `Product` + `Offer` (priceCurrency EUR, priceRange), `BreadcrumbList`, `Organization` (foundingDate 2007, sameAs Facebook and Instagram) and `FAQPage` where relevant. Rank Math WooCommerce schema does this.
15. If German or Nordic markets are strategic, add real translations later (WPML or Polylang with hreflang) rather than relying on English pages.
16. Run PageSpeed and Core Web Vitals checks for `/`, `/product-category/log-cabins/` and one product page once access is available. WooCommerce with Elementor and 3D planner scripts is a likely source of LCP and INP problems.
17. Set up monthly checks: GSC Coverage (soft 404, duplicate without canonical), a `site:www.ideaswood.eu` spot-check, and a crawl of title length and duplication.

---

### Queries run (evidence log, abridged)

- `site:ideaswood.eu`
- `site:www.ideaswood.eu`
- `site:ideaswood.com`
- `site:factory.ideaswood.eu OR site:business.ideaswood.eu`
- `"ideaswood.eu"`
- `site:ideaswood.eu` combined with each of: log cabins; product; saunas; garden sheds summer houses; blog; garden furniture; lt; "Archives - IdeasWood"; pergola hot tub; garden office; de holzhaus; camping pods; tag; cart/checkout/my-account/wishlist; guide how to; villa country house; hot tubs; modern log cabins classic; page 2; planner ideasplanner; delivery shipping terms privacy; phone numbers; "could not be found"; storage sheds garages carports; Australia USA Scandinavian; pavilion grill cabin barrel sauna; inurl:products html; Lithuanian terms; insulated house kit; sauna cabin infrared; aluminium pergola; model names; /de/ /lt/ /ru/; sauna barrel thermowood
- Brand queries: "ideaswood log cabins UK reviews", "ideaswood summer house garden shed Lithuania manufacturer"
- PageSpeed API: `429 RESOURCE_EXHAUSTED` (quota 0)
