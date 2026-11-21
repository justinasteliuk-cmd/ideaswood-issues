# Own crawl of ideaswood.eu (free, curl + Python), 2026-11-20
473 URLs from sitemap_index.xml (8 sitemaps). 426 fetched OK; 47 timed out (status 0 in the CSV, they are NOT errors: re-run slower). Data: tracking/site-crawl-2026-11-20.csv (title, meta, H1, words, claim counts per URL).
Of the 426 fetched pages:
- 48 without a title tag text, 7 titles over 60 characters, 27 pages share an identical title with another page.
- 87 without a meta description, 5 over 160 characters.
- 87 without an H1, 9 with more than one.
- 73 thin pages (under 150 words in the HTML, many are product pages whose text sits in builder shortcodes or tabs).
- Origin claims: 158 pages contain "Nordic" or "Made in Lithuania" (the banned unconfirmed origin claim).
- Manufacturer/factory/"our facilities" wording on 172 pages (cost guides, about-us, home, many products). Home title/meta unchanged (still "Manufacturer in Europe", "Nordic timber. Made in Lithuania").
- Green claims (eco-friendly, sustainab..., ecolog...) on 17 pages: home, /x/, Koralan guide, ultimate log cabin guide, hot tub and furniture categories, several products.
Priority for Astra: (1) titles and metas on the 87 pages with no meta and 48 without title, (2) duplicate titles, (3) "Nordic/Made in Lithuania" site-wide search-replace per the rule, (4) the 17 green-claim pages, (5) H1 on 87 pages (Divi templates).
