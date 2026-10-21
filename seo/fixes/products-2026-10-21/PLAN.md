# Plan: unique product descriptions on ideaswood.eu (2026-10-21)

## Problem (measured 2026-10-21, Store API, 8-gram overlap)
464 published products. Excluding the 178 Smart Line products (Justinas's model texts, templated among themselves but accepted), 276 products are either thin (<60 words, 165) or copied (>=50 % 8-gram overlap, 111: 96 with ideaswood.com, 13 with logcabinsfactory.com, rest within .eu). Only 6 are unique. GSC: 62 indexed / 325 not indexed ("crawled, currently not indexed" 165) - thin/duplicate content is the most likely cause.

## Goal
Each of the 276 target products gets its own description built only from facts on its own product page (attributes, categories, existing text), 150-250 words of prose plus a specification table, with sentence phrasing varied per product so that prose overlap within .eu stays under ~25 % and overlap with the other sites drops below 50 %.

## Rules
- Facts only from the product's own attributes and its existing description. No invented numbers, timber grades, certificates, lead times or delivery prices. Prices are not mentioned in the text (price box already on the page; other sessions change prices).
- Do not touch name, slug, price, short_description, images, categories, attributes. Only `description`.
- Keep the existing human-written paragraphs (room layouts, pack sizes) at the end under "More about {name}", unless a number in that text contradicts an attribute (e.g. "28 mm floor boards" vs attribute 19 mm). In that case drop the old paragraph for that product and list the product in the report for Justinas.
- Skip Smart Line products, the 6 unique ones, and anything with >=60 words and <50 % overlap.
- Backup every current description to `~/Desktop/ideaswood-seo/backup/product-descriptions-before-2026-10-21.json` before the first write. Revert = PUT the backup back (script `revert.ts`).
- Write via wc/v3 PUT with the WP Application Password (verified today: product content keeps `<h3>` and `<table>`, unlike term descriptions).
- Dry run first: render all 276 to one HTML file, re-measure overlap on the generated prose, spot-check 5 by eye, then `--apply`.
- After apply: curl 10 random product pages (200, new H3 present, no "[object" / "undefined" / "NaN" strings), LiteSpeed Purge All.

## Text structure (per product type, chosen from categories)
1. Intro (2-3 sentences): what it is, footprint, internal area, wall thickness, rooms/terrace, who it suits (category-based: garden cabin / summer house / shed / garage / house / sauna / hot tub / pergola / grill / furniture / thermowood).
2. `<h3>Specification</h3>` table: all attributes present, units kept as on the site.
3. "Planning the build" paragraph: base, assembly by two people with manual (link /easy-installation/), treatment (link Koralan guide), delivery as a kit to UK/IE/EU. Varied phrasing (3-4 variants per sentence, picked by product id).
4. Internal links: its category, cost guide, /price-my-cabin/.
5. "More about {name}": preserved original paragraphs (sanitised), if any and not contradicting.

## Revision after the Auditor's plan review (2026-10-21)
- 87 of the 276 "copied" products are Divi-built: their `description` is a layout (`[et_pb_section …]`) and the visible text lives in `_et_pb_old_content`. Their "copied" label was a shortcode artefact. They get a Rank Math meta description only (their current meta is shortcode junk); the body is not touched.
- Real target: 182 non-Divi thin/copied products (body + meta). Skipped and reported: 5 MAX-line products (text says 150 mm insulated walls, attribute 44 mm) and 2 "-alu" pergolas (name aluminium, attributes of the wooden model).
- No spec table (the page already renders the attributes table). 3–6 key figures go into the prose.
- Planning paragraph per type; buildings over 40 m² or houses say "a builder's job", nothing about two people. Boards, heaters, tubs and furniture get their own short paragraph.
- Old paragraphs: kept only when they carry room-layout or pack facts and no number contradicts an attribute (wall/floor/roof mm exact, area ±0.2 m²); the copied marketing text is dropped. Every conflict is listed in the report.
- Overlap measured on the full new description + unchanged short_description, shortcodes stripped, against all 5 sites, with a positive control. Single threshold for the report: median within-set < 30 %, no product > 50 % vs another site.
- Backup from wc/v3 `context=edit` (raw description, date_modified, rank_math_description) written before the first PUT; revert skips products modified after the apply.

## Risks
- Templated text still templated: mitigated by per-sentence variants and product-specific numbers; measured after generation, abort if prose overlap within .eu > 35 % for more than 10 % of products.
- Wrong attribute units/formats ("6,3 x 7,5", "10.2 m²", "?"): normalise decimal comma, drop "?" and empty values.
- Other sessions: speed-eu-com (mu-plugins), lcf-catalogue (logcabinsfactory), cart-ux/add-ons (WCPA) do not write product descriptions on .eu. Ledger checked 2026-10-21.
