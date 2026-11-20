# Market pages: IT and AU (SUPERSEDED by 21 and 22 for full copy; keep only the rules below) (and rules for UK/.com) – 2026-11-20
Problem (reported by Justinas 2026-11-20): abitazionidilegno.it home text talks about "the UK and Australia" and is built from the same template as the other sites; AU text is near-identical. Google treats near-identical text across domains as duplicates and the wrong-market lines are a logic error that hurts trust. The cloud session cannot open these domains (network blocked), so Astra must apply and scan.

## Rules for every market site (.it, .com.au, logcabinsfactory.com, .com, wiseideas.eu)
1. Each page names only ITS market. No other country in body text (footer link "IdeasWood worldwide" is the only exception).
2. Zero shared paragraphs between domains. Same facts, different sentences, different examples (climate, planning, delivery, currency, spelling: en-AU / en-GB / it-IT).
3. Only verified facts: founded 2007; spruce and pine, timber declared by manufacturers as from northern Europe; kits with custom layouts drawn in IdeasPlanner 3D; insulation and options priced separately; transport calculated individually; wholesale prices for B2B partners after a trade agreement, even one product.
4. Banned: "leading global supplier", "thousands of people trust", "heritage", "sustainable/eco/energy-efficient/carbon" (green-claims audit, content/10), "manufacturer", "cedar" unless sold, CE for saunas, "built for the Italian landscape" style filler.
5. Check: no two domains share an 8-word sequence (Astra runs the same 8-gram test used for products, products-2026-10-21/PLAN.md).

## abitazionidilegno.it (it-IT primary, English switchable) – DECIDED 2026-11-20
Default language is Italian: the Italian page lives at the root URL (/), is the x-default, and all titles, meta, schema inLanguage are it-IT. A visible language switcher (IT / EN) lets visitors open the English version at /en/ (use the existing multilingual plugin if one is installed, else WPML/Polylang-free option agreed with Astra; do not add a second heavy plugin). English pages use hreflang en and point back to Italian; never auto-redirect by browser language. The English draft below is the text for /en/, still IT-market only (no UK/AU mentions).

**H1 (IT):** Case in legno in kit per l'Italia
**Intro (IT):** Dal 2007 forniamo ed esportiamo case in legno, casette da giardino, saune e strutture per esterni in abete e pino del nord Europa. Ogni kit è tagliato su misura, arriva con istruzioni di montaggio e può essere personalizzato nel layout con il nostro configuratore 3D IdeasPlanner. L'isolamento e le altre opzioni si quotano a parte e il trasporto verso l'Italia viene calcolato caso per caso. Prima di ordinare, verifica con il tuo comune i permessi necessari: possiamo fornire disegni e dettagli tecnici per la pratica. Per i rivenditori: prezzi all'ingrosso dopo la firma di un accordo commerciale, anche per un solo prodotto.
**Title (IT):** Case in legno in kit – fornitura per l'Italia | IdeasWood
**Meta (IT):** Case in legno e casette da giardino in abete e pino, kit su misura con layout 3D. Dal 2007, consegna in Italia con trasporto calcolato per ordine.

**H1 (EN):** Wooden House Kits for Italy
**Intro (EN):** Since 2007 we have supplied and exported log houses, garden cabins and saunas in spruce and pine from northern Europe. Every kit is cut to order, comes with assembly instructions, and the layout can be drawn with our 3D IdeasPlanner. Insulation and other options are priced separately and transport to Italy is calculated per order. Check the permit route with your local comune before you order; we can supply drawings and technical details for the application. Resellers: wholesale prices after a signed trade agreement, from a single product.

## ideaswood.com.au (en-AU)
**H1:** Wooden House Kits for Australia
**Intro:** IdeasWood has supplied timber buildings since 2007: log cabins, granny-flat-style studios, garden rooms and saunas in spruce and pine from northern Europe. Pick a standard design or have the layout drawn in our 3D IdeasPlanner, then we quote the kit with delivery to your Australian address. Insulation and other options are quoted separately; freight is calculated for each order. Approvals vary by state and council, so confirm requirements with your council or certifier first; we provide drawings for your application. Stockists and builders can ask for wholesale terms, starting from one product.
**Title:** Wooden House Kits – Delivered to Australia | IdeasWood
**Meta:** Spruce and pine wooden house kits, cabins and saunas shipped to Australia. Custom 3D layouts, freight quoted per order. Trade terms for resellers.
Note (Justinas 2026-11-20): "granny flat" is the Australian name for a category that is called something else on the EU site (small second dwelling / studio). Keep the term on the AU site; Astra maps it to the matching category and uses it in AU text only.

## UK / logcabinsfactory.com / .com
Keep UK wording (planning permission, 2.5 m boundary rule etc. from content/04 and 12) on the UK-facing pages only. .com (USA): US English, "building permit", no UK references. logcabinsfactory.com: fix the visible Divi placeholder ("Your Title Goes Here") first.
