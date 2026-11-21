# Missing titles/metas, 2026-11-21 (Mac executor)
Source: tracking/site-crawl-2026-11-20.csv. Re-check showed the 19 "product" gaps and most "no title" rows were a bot-check page ("One moment, please...") served to the crawler, not real gaps: products have Rank Math metas.
Applied via rankmath/v1/updateMeta (logged-in session): 15 product categories (categories.tsv; before values in backup-categories-before.tsv), post categories Blog (4) and Log Cabins (634).
noindex,follow: test page /neww/ (page 10704) and /category/uncategorized/ (term 1). Undo: set Rank Math robots back to index.
