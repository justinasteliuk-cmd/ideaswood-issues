# Category text pack A, 2026-11-23 (for Astra / Mac executor)

Same method as `seo/fixes/sauna-categories-2026-11-21/` (outdoor sauna moved from position ~70 to 13.7 after that pack).
Three log-cabin categories with Search Console impressions on page 2-5 or autosuggest demand
(tracking/gsc-real-2026-11-20.csv, tracking/autosuggest-uk-2026-11-20.csv):
"prefab a frame homes for sale" (pos 12.0), "a frame house kit europe" (15.0), "a-frame cabin for sale" (23.0, 1 click);
autosuggest for "garden office kits uk", "insulated garden office", "log cabins for sale", "log cabin kits uk", "garden log cabins".

| Folder | Term ID | Live URL | Focus keyword | Secondary |
|---|---|---|---|---|
| a-frames/ | 655 | /product-category/a-frames/ | a frame house kit | prefab a frame homes for sale, a-frame cabin for sale, timber frame a frame, a frame log cabins |
| home-offices-studios/ | 658 | /product-category/home-offices-studios/ | garden office kits | garden office, garden office kits uk, insulated garden office |
| garden-cabins/ | 657 | /product-category/garden-cabins/ | garden log cabins | log cabins for sale, log cabin kits uk |

Term IDs confirmed twice on 2026-11-23: body class `term-655` / `term-658` / `term-657` in the live HTML, and the public
Store API (`/wp-json/wc/store/v1/products/categories`). Product counts in the Store API: 3 / 6 / 57.

Each folder: `title-meta.txt` (live vs new; titles 56-60 characters, metas 138-151; plus a proposed H1 line),
`intro-above-grid.html` (121-125 words, one `<p>`, no H1), `guide-below-grid.html` (439-472 words, H2/H3, FAQ with 4 questions).
Every number comes from the live listing on 2026-11-23 (Store API attributes = the attribute table on each product page).
No prices, warranty, U-values, assembly times, CE/FSC, origin, eco/energy wording, factory/manufacturer wording or customer names.

## IMPORTANT: these three pages do NOT use the Divi body template (unlike the sauna pages)
Checked by curl 2026-11-23: the body class has no Theme Builder body layout; the page is the standard WooCommerce archive with
the `iw-category-seo.php` mu-plugin. So:
- the part of the description BEFORE `<!--iw-below-->` prints ABOVE the grid (in `<header class="woocommerce-products-header">`),
- the part AFTER the marker prints UNDER the grid (`<div class="term-description iw-cat-below">`),
- the page H1 comes ONLY from the description (`<h1>A-frame cabins</h1>`, `<h1>Garden cabins</h1>` live now; home-offices-studios has
  an empty description and no H1 at all).

If you paste the marker first (sauna order), the intro drops under the grid and the page loses its H1. Use this order instead:

```
[H1 line from title-meta.txt]
[contents of intro-above-grid.html]
<!--iw-below-->
[contents of guide-below-grid.html]
```

## Paste method (wp-admin only; REST/kses strips h1/h2/h3/p, see COORDINATION 2026-10-26 regression on 657)
1. Back up the current description first (as the sauna pack did: `term-<ID>-before-2026-11-23.json`).
2. wp-admin > Products > Categories > Edit, or `wp-admin/term.php?taxonomy=product_cat&tag_ID=<Term ID>&post_type=product`.
3. Description box: **Text** tab (not Visual). Select all, delete, paste in the order above. If a second description textarea shows, paste the same there.
4. Rank Math box: NEW Title and Description from `title-meta.txt`; focus keyword from the table.
5. Update. Open the live URL in a private window: H1 + intro above the grid, guide with headings and links under it (page 1 only;
   the mu-plugin hides both on /page/2/). Purge LiteSpeed for the URL if the old text still shows. Then GSC "Request indexing".

## Internal links used (all 200 on 2026-11-23)
Sibling categories: /product-category/garden-cabins/, /home-offices-studios/, /a-frames/, /summer-houses-chalets/,
/sheds-storage-cabins/, /insulated-wooden-houses/, /villas-country-houses/. Pages: /how-much-does-a-garden-cabin-cost/,
/log-cabin-planning-permission-uk/, /trade-partners/, /insulated-garden-rooms/ (offices), /log-cabin-wall-thickness/ (cabins),
/price-my-cabin/, /contact-us/ + phone +370 678 22055 (same as sauna pack).

## [CHECK]
1. **Paste order differs from the sauna pack** (see above). Confirm the pages still have no Divi body layout before pasting.
2. **Live texts now break the claims rules and get replaced by this pack:** a-frames description has prices (€18,091-€31,825), and
   because a-frames has no Rank Math meta, Google's meta/OG description is that whole text with prices; garden-cabins description
   has prices (from €2,626, a price table) and "51 of the 53 models list a 60-month warranty".
3. **A-frame data conflicts:** A-frame 32 and 39 both list Width 8.8 m, Depth 7.92 m, Height 5.85 m but different areas (32.7 incl.
   6.7 m² attic vs 35.9 m²); the live category text says "Two have 2 rooms and 36 m²". Texts give only area, rooms, height. A-frame 32
   lists no wall thickness; A-frame Moose lists 44 mm walls but no construction type or timber. Texts say only what is listed.
4. **A-frame 39 short description** says "energy-efficient", "sustainable timber", "thermally efficient", "eco-friendly",
   "environmentally responsible": against the claims rules; product page outside this task, fix separately.
5. **Product pages carry "Warranty (months): 60"** (all office models, Moose, many cabins): outside this task, review per rules.
6. **Insulation options per model** not stated on the listing: texts say only "floor and roof insulation as an option, priced
   separately" (from content/15). Confirm the offices and cabins offer it.
7. **Home offices:** Sydney and Oden product descriptions are empty Divi shells (data only from the attribute table). Oden lists
   "People 2-4" for an office; not used.
8. **Garden cabins count:** Store API shows 57 (54 x 44 mm, Torino 4.5x6 58 mm, 68 Ottawa 6x4.5 and Det 6x6 68 mm); the live H1
   text says 53. Texts say "more than 50" and "54 of the cabins ... 44 mm": update the 54 if products change. Two Torino 4.5x6 products
   exist (44 mm "Garden House Torino" and 58 mm "Torino ... 58 mm walls"); the texts name the 58 mm one only as "Torino 4.5 x 6 has 58 mm".
9. **Overlap:** /home-offices-studios/ (6) vs /garden-cabins/ (57) vs /product-category/smart-line-series/smart-line-garden-cabins/
   (117). Not linked here; decide whether Smart Line competes for "garden log cabins".
10. **Timber wording:** listing says "Pinewood" for A-frame 32/39 and many cabins; the live garden-cabins meta says "Nordic spruce"
    (allowed as timber description, COORDINATION 2026-11-21). New texts say "pine" for the A-frames only and no species for cabins.
11. **Planning wording** in the offices FAQ ("often not in England...") follows content/15 and content/16; keep in line with the
    published planning guide.
