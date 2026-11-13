# Dispatch task – Phase 2 (architecture + on-page)

Paste into Dispatch AFTER Phase 1 is done. Attach or paste the tables below.

> Open ideaswood.eu WordPress admin in Chrome. Take BEFORE screenshots of every page you change.
>
> **A. Soft-404 check first.** Open these categories on the live site and report whether they show products or a "page could not be found" / "no products" message: sauna, garden-furniture, wooden-houses, summer-house, garden-house, grill-cabins, wooden-pergola, storage-sheds, garages-carports, pergola-cabins. If the message appears, find the cause (empty category, widget, theme block) and report — don't delete categories.
>
> **B. Category consolidation.** Main log cabin category = `/product-category/log-cabins/`. Make it the PRIMARY category for all log cabin products (Rank Math: "primary category"). Do not delete the duplicate categories yet — add 301 redirects from them (list below) using Rank Math → Redirections (or the Redirection plugin).
>
> **C. Redirects.** Add every row from the redirect table. For regex rows enable regex. For legacy `(28|44|58|68)mm-` products, map each one to the closest current model (same size/wall) — send me the list you chose. Test 5 redirects afterwards with an incognito window.
>
> **D. www / http.** Check if `https://www.ideaswood.eu/product/44mm-linus-4x5-n/` redirects to `https://ideaswood.eu/...` in ONE step. If not, tell me the hosting provider/panel (cPanel, Cloudflare, etc.) — do NOT edit .htaccess without confirming with me.
>
> **E. Titles & meta.** For each URL in the titles table set SEO title and meta description exactly as given (Rank Math/Yoast box on that page/category). Set global title templates: posts/pages/products `%title% | IdeasWood`, categories `%term% | IdeasWood` — remove "Buy … in UK".
>
> **F. Typos.** Rename products: Wooden Dinning Set → Wooden Dining Set, Dinning Set → Dining Set, Dinning chairs set of 4 → Dining chairs set of 4, Talinn → Tallinn, category "Welness" → "Wellness". Change slugs accordingly — Rank Math will offer an automatic 301; accept it.
>
> **G. Page `/x/`** is a Koralan UK 110 wood-treatment article published with the title "x". If it duplicates `/wood-impregnation-treatment-for-log-cabins-complete-guide-to-koralan-uk-110/`, trash it and 301 `/x/` to that post. If it is the only copy, retitle it "Log Cabin Wood Treatment: Koralan UK 110 Guide", change the slug to `/log-cabin-wood-treatment-koralan-uk-110/` and accept the 301. Set `/eu-project/` to noindex (keep it live).
>
> **H. Report:** table of every change (URL, before, after), anything skipped and why, and screenshots folder path.
>
> Do not change prices, product content, images or design.

Tables: `fixes/04-titles-meta.csv`, `fixes/06-redirects.csv`, pattern for products: `fixes/05-product-title-pattern.md`.
