# Category text pack C, 2026-11-23: hot tubs, garages, summer houses, sheds (for Astra)

Same method as `../sauna-categories-2026-11-21/`. After that pack the outdoor sauna category moved from about position 70
to 13.7 in Search Console, so this pack does the same for six more categories. Target queries: "wood fired hot tubs for
sale" (GSC position 15.3, tracking/gsc-real-2026-11-20.csv), "electric wooden hot tubs uk", "external wood fired hot tub
heater", "hot tub wooden", "wooden garage kits", "wooden carport kit", "timber garage and car port", "summer house kits",
"wooden summer house", "storage shed prefab", "wooden sheds" (owner list + tracking/autosuggest-uk-2026-11-20.csv).

| Folder | Term ID | Live URL | Products (Store API) | Template | Focus keyword |
|---|---|---|---|---|---|
| hot-tubs/ | 26 | /product-category/hot-tubs/ | 4 | Divi body layout | wood fired hot tubs |
| external-heater/ | 76 (parent 26) | /product-category/hot-tubs/external-heater/ | 3 | Divi body layout | external wood fired hot tub heater |
| square-hot-tubs/ | 180 (parent 76) | /product-category/hot-tubs/external-heater/square-hot-tubs/ | 1 | Divi body layout | square hot tub |
| garages-carports/ | 656 | /product-category/garages-carports/ | 16 | default WooCommerce archive | wooden garage kits |
| summer-houses-chalets/ | 665 | /product-category/summer-houses-chalets/ | 31 | default WooCommerce archive | summer house kits |
| sheds-storage-cabins/ | 663 | /product-category/sheds-storage-cabins/ | 49 | default WooCommerce archive | wooden sheds |

Secondary keywords are in each `title-meta.txt`. Term IDs: from the live `<body class="... term-NN">` and the public
Store API `wp-json/wc/store/v1/products/categories` (both agree). `term-NN-before-2026-11-23.json` = the description that
is live now (Store API copy), for rollback.

Each folder: `title-meta.txt` (live vs new; titles 47-58 characters, metas 135-154), `intro-above-grid.html` (93-113
words, one `<p>`, no H1), `guide-below-grid.html` (424-479 words: how to choose, sizes from the live listings, FAQ with
4 questions, internal links, /trade-partners/). Every number is from the live listing or the product attributes and
short descriptions in the Store API, fetched 2026-11-23. No prices (the current live texts show prices; these replace
them), no power ratings, heat-up times, warranty, assembly time, CE/FSC, origin or eco wording.

## Two different templates (checked 2026-11-23 by curl)
- **Hot tubs 26, 76, 180: Divi Theme Builder body layout** (`et-tb-has-body`). The layout prints its own H1 and template
  text and never shows the part of the description before `<!--iw-below-->`. Only the part after the marker shows, under
  the grid. Same as the sauna pages.
- **Garages 656, summer houses 665, sheds 663: default WooCommerce archive** (no `et-tb-has-body`). Here the mu-plugin
  prints the part BEFORE the marker above the grid (inside `woocommerce-products-header`) and the part after it under
  the grid. The `<h1>` in today's description is the **only H1 on these pages**. If the marker goes first here, the
  pages lose their H1 and the intro drops below 16-30 products.

## Paste method (wp-admin only; REST/kses strips h1/h2/h3/p)
1. Log in to wp-admin. Products > Categories > Edit the category
   (or `wp-admin/term.php?taxonomy=product_cat&tag_ID=<Term ID>&post_type=product`).
2. In the Description box switch to the **Text** tab (not Visual). Select all, delete, then paste:

   **Hot tubs 26, 76, 180 (Divi body layout): marker first.**
   ```
   <!--iw-below-->
   [contents of intro-above-grid.html]
   [contents of guide-below-grid.html]
   ```
   **Garages 656, summer houses 665, sheds 663 (default archive): H1 and intro above, marker, guide below.**
   ```
   [the <h1> line from title-meta.txt]
   [contents of intro-above-grid.html]
   <!--iw-below-->
   [contents of guide-below-grid.html]
   ```
   If you prefer the identical marker-first method on these three too, it works, but then add the `<h1>` line
   directly after the marker, or the page has no H1 at all.
3. In the Rank Math box: paste the NEW Title and Description from `title-meta.txt` and set the focus keyword.
4. Click Update. Open the live URL in a private window: check the text shows (hot tubs: under the grid; the other three:
   H1 and intro above the grid, guide under it), headings and links work, exactly one H1. Purge the LiteSpeed cache for
   the URL if the old text still shows. Page 2 of summer houses and sheds shows no text (mu-plugin skips paged > 1).

## Internal links used (all 200 on 2026-11-23)
/trade-partners/ (live now, used in every FAQ), /contact-us/ + phone +370 678 22055, hot-tub parent and sub-categories,
/product-category/sauna/outdoor-sauna/, /product-category/garden-cabins/, /product-category/sheds-storage-cabins/,
/product-category/garages-carports/, /product-category/pergola/, /product-category/insulated-wooden-houses/,
/log-cabin-wall-thickness/, /log-cabin-planning-permission-uk/, /insulation-kits-on-all-models-available/.

## [CHECK] before or after publishing
1. **Hot tub template text breaks the claims rules** (Saqib, Divi lane): on /hot-tubs/ "Eco-Friendly Relaxation ...
   energy-efficient, designed with sustainability in mind", "Sustainability First ... minimal carbon footprint",
   "Nordic-inspired design", "tested for performance, heat efficiency"; on /square-hot-tubs/ "Energy-Efficient Relaxation",
   "thermal efficiency". Also claims "fiberglass or acrylic liners", "spruce, thermo wood, or WPC", "2-person to
   8-seaters" that do not match the listings. Product pages (e.g. Double hot tub, integral tub) carry long eco /
   "responsibly sourced" / health copy. Not touched by this pack.
2. **External Heater grid shows 4 tubs** (incl. the integral-stove tub) although only 3 are in term 76: the Divi Shop
   module is not set to the current category (same issue as the sauna pages). Texts name only the 3 tubs in term 76.
3. **Hot tub short descriptions are a shared copy**: the outside-stove tub and the double tub both start "Our hot tub with
   integral firewood heater basic set already includes", and the square tub too. Texts say "the round and double tubs
   list a basic set..." Confirm the double tub really has an external stove (it is in External Heater and Firewood
   Heaters; no Heater Type attribute) and what heater the outside-stove tub set includes.
4. **Tub timber**: the integral tub lists larch, red cedar, thermowood or wood composite, while the shared basic set says
   "outside decorative spruce wood". Texts give both as listed; confirm which is right per model.
5. **Electric hot tub**: only the integral tub lists Heater Type "Electric". Texts say no other tub lists electric.
6. **Square tub water volume vs height**: 1,500 l, 1 m high, 2.2 x 2.2 m (from attributes). OK as listed; "Outside
   Diameter" attribute name is used for its size.
7. **Garages**: what the "-UK" versions change is not stated (texts only say "a version marked UK"). Garage door sizes
   (Premium 198 x 85, Economy 185 x 85 cm) look like a pedestrian door, not a vehicle gate; gate type and size are not
   listed on any garage, and "Garage 6x9 (no gate) Premium" suggests others include one. Texts do not mention gates.
8. **Garage+carport 6.8 x 5.6**: 17.2 m² internal and 17.2 m² "terraces surface"; texts call the second a covered
   carport "of the same size". Confirm. Carport+storage: storage room size not listed; Carport-Pablo has almost no data.
9. **Garages wall filter** shows 28/34/45/58/68 mm chips on a category where every model is 44 mm (same chips on all
   archives). Cosmetic; Saqib.
10. **Summer houses**: 44/58/68 mm "spring to autumn / longer in the year" guidance and "planning permission and building
    regulations for a home or holiday let" come from the live text and content/16, not from product pages. Pod 3 x 5.9
    28 mm lists "Building width x length 15" (data error). Scarlett 68 mm lists terrace "x".
11. **Sheds base advice** (paving slabs, gravel bed with timber frame, ground screws) comes from the current live text,
    not from product pages. 7 terrace models and 4 two-room models counted from attributes; Elyra 3 x 5.96 has no
    internal area.
12. **Smart Line series** (terms 671 sheds 54 products, 672 garages, 673 carports) overlaps these categories; not linked
    because their specs were not checked. Decide if they should cross-link.
13. **/trade-partners/** body says "If you are looking for a manufacturer in Lithuania..." (visitor phrasing). Check it
    against the "never Made in Lithuania" rule.
14. **Product attributes** still list "Warranty (months) 60" on garages, sheds and summer houses: against the claims
    rules; outside this pack.
