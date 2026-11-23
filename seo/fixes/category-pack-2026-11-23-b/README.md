# Pergola and BBQ category texts, 2026-11-23 (pack b, for Astra)

Same method as `../sauna-categories-2026-11-21/` (after that pack the outdoor sauna category moved from about position 70
to 13.7 in Search Console). Six categories: three pergola terms and their parent, BBQ grill cabins and grill sets.

| Folder | Term ID | Parent | Live URL | Focus keyword | Other target queries (GSC / UK autosuggest) |
|---|---|---|---|---|---|
| aluminum-pergola/ | 73 | 72 | /product-category/pergola/aluminum-pergola/ | aluminium pergola kit | aluminium pergola kits, aluminum pergola kits (13 impr., pos. 16; "aluminium pergola kit" 12 impr., pos. 31.7 in gsc-real) |
| wooden-pergola/ | 74 | 72 | /product-category/pergola/wooden-pergola/ | wooden pergola kit | wood pergolas (pos. 11.8), wooden pergola, timber pergola kit, wooden pergola with roof / with roof and sides |
| pergola/ | 72 | - | /product-category/pergola/ | pergola kits | garden pergola, wooden pergola kits uk, buy wooden pergola ireland |
| pergolas-cabins/ | 205 | 74 | /product-category/pergola/wooden-pergola/pergolas-cabins/ | pergola cabin | wooden pergola with roof and sides, garden room with pergola |
| bbq-grill-cabin/ | 23 | - | /product-category/bbq-grill-cabin/ | bbq grill cabin | grill cabin, bbq hut, wooden bbq hut, bbq hut for sale uk, scandinavian bbq hut (23 impr., pos. 82.3; 46 impr. for the page at pos. 72) |
| grill-sets/ | 78 | 23 | /product-category/bbq-grill-cabin/grill-sets/ | bbq grill set | grill cabin grill, bbq hut grill |

Term IDs: confirmed twice on 2026-11-23, in the live HTML (`term-NN` body class) and in the public Store API
(`/wp-json/wc/store/v1/products/categories?per_page=100`). The edit link is
`wp-admin/term.php?taxonomy=product_cat&tag_ID=<Term ID>&post_type=product`.

Each folder has `title-meta.txt` (live vs new; titles 48-58 characters, metas 146-155), `intro-above-grid.html`
(95-117 words, one `<p>`, no H1) and `guide-below-grid.html` (360-434 words: how to choose, 4 FAQ, internal links).
"pergola aluminium en kit" is a French query: not targeted in English copy (the hreflang/FR site is the place for it).

## Facts used (all fetched 2026-11-23)
- Category pages (curl, Mozilla UA) for model names, counts ("Showing 1-15 of 21", "of 19", "all 13/2/11/5") and the
  live title, meta and below-grid text. Product data from the public Store API (`/wc/store/v1/products?category=72|23`)
  and product pages: sizes, areas, heights, wall/board thickness, materials, set contents, colours.
- Aluminium pergolas: only what the listing says: 4 x 6 m, open and closed, 100 x 100 mm aluminium columns
  (2.5 mm wall), 40 x 80 mm beams, 16 mm matt polycarbonate roof panels, dark grey / brown / white paint. Nothing on
  LED, drainage, adjustable roof, freestanding or warranty (those are only in the Divi template text).
- BBQ: timber frame, 45 mm pinewood walls, bitumen shingles, central BBQ + table + benches + cushions + extendable
  chimney in the set, seats per model, bench counts, heights. No shape claim ("hexagonal" dropped: only the door window
  is called hexagon on the listing).
- content/20-garages-carports-pergolas-page.md for the safe wording (posts on a firm base, planning guide link, flue
  and fire rules). No prices, loads, warranty, assembly time, certificates, eco or origin wording. Timber is named as
  "pinewood" / "timber" because that is what the listing says; "Nordic spruce" is not used (not listed for these lines).

## Paste method (wp-admin only; REST/kses strips h1/h2/h3/p/ul)
1. wp-admin > Products > Categories > Edit the term (or the term.php link above with the Term ID).
2. Description box: **Text** tab (not Visual). Select all, delete the old text (pergola 72 and bbq 23 currently hold
   a below-grid text WITH PRICES; replace it completely). Paste exactly:
   ```
   <!--iw-below-->
   [contents of intro-above-grid.html]
   [contents of guide-below-grid.html]
   ```
   The marker line must be first: the Divi layout prints only the text after the marker, under the grid
   (mu-plugin `iw-category-seo.php`, `<div class="term-description iw-cat-below">`). If the screen shows a second
   description textarea, paste the same text there too.
3. Rank Math box on the same screen: NEW Title and Description from `title-meta.txt`, focus keyword from the table.
4. Update. Open the live URL in a private window, check the text under the grid, purge LiteSpeed for that URL.
Leave `<!-- [CHECK] ... -->` comments in place (invisible).

## Internal links used (all 200 on 2026-11-23)
Sibling and parent categories (pergola, wooden-pergola, aluminum-pergola, pergolas-cabins, bbq-grill-cabin,
grill-sets), /product-category/furniture/garden-furniture/, /product-category/hot-tubs/,
/log-cabin-planning-permission-uk/, /trade-partners/ (now 200, so no stand-in), /contact-us/ and +370 678 22055.

## [CHECK] before or after publishing
1. **/trade-partners/ title** reads "Log Cabin Manufacturer Sourcing, Lithuania | IdeasWood": against the
   supplier/exporter and origin rules. All six packs link to it; fix that page's title/meta.
2. **Aluminium "Closed" version**: the listing never says what Closed adds (sides? glazing?). Texts tell the buyer to ask.
   Product attributes for both aluminium kits also carry copied timber fields (Gable roof, 19 mm roof boards, 28 mm floor,
   roof area 11 m²) and a factory/5-year-warranty description block: clean up the product pages.
3. **Aluminium Divi template text** claims freestanding designs, LED lighting, drainage, adjustable roofing,
   "energy-efficient lighting" and warranty, none on the listing (only wall-mounted kits exist). Saqib/Divi lane.
4. **Wooden pergola live meta** calls Haga and Luna "aluminium pergolas"; they are 68 mm timber pergola cabins with an
   aluminium sliding window system. Replaced in the new meta.
5. **Pergola-Luna-ALU** description says "12 m² gazebo" but the attributes say 9.8 m² (3 x 4 m). **Pergola-Haga-ALU**
   description says "open-air pergola ... 21 m² roof area" vs 18.7 m² in attributes. Texts use the attributes.
6. **Linsi/Luna/Haga/Kipa: room or open pergola?** content/08 and the old live parent text say "a small 68 mm log room";
   the Kipa/Linsi/Luna product text says "pergola ... on 68 mm posts". Texts only say "listed with 68 mm walls". Confirm.
7. **Timber treatment**: only Deluxe says "wood is supplied untreated"; others unknown (FAQ says ask us).
8. **Grill sets**: Standard/Luxury grill attributes repeat the 9.2 m² cabin fields (area, people, walls). Which grill
   fits which cabin is not stated (6- vs 8-corner); texts say "tell us your cabin". Flame BBQ / Large Flame BBQ have no
   description, only diameter and height.
9. **BBQ template text**: "Authentic Scandinavian Design", "Sustainability", "Handcrafted Quality" and a heading
   "Everything You need to know about Garden Offices" on the BBQ page; wooden pergola template has
   "Sustainable Materials"; pergola cabins page has two H1s and "Pergola Cabins for Hot Tubs"/"Smart Investment".
   Grill cabin widths/depths show "?" on all six cabins. Saqib/product data.
10. **Pagination**: pergola (21) and wooden pergola (19) show 15 per page; Deluxe 3x6-4x6 and the ALU versions sit on
    page 2. Texts do not depend on what is on page 1.
11. **Product pages** still say "Directly from the factory", "5 years warranty" and "Warranty 60 months" (Kipa, Linsi,
    Luna descriptions too): outside this task, against the claims rules.
