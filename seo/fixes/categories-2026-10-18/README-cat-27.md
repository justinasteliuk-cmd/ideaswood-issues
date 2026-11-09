# Parent category 27 "sauna": intro invisible (2026-11-06)
All sauna categories use a Divi Theme Builder body layout that never fires `woocommerce_archive_description`,
so only the part after `<!--iw-below-->` (hook `woocommerce_after_shop_loop`) is rendered. The 10-18 intro + `<h1>` of term 27 are invisible.
Fix (needs a logged-in wp-admin session; REST kses would strip `<h2>/<table>`): open
`wp-admin/term.php?taxonomy=product_cat&tag_ID=27&post_type=product`, paste `cat-27-sauna.fixed.txt` into BOTH
description textareas (Text tab) and Update. Marker first, `<h1>` removed, everything else unchanged.
Alternative (Saqib, Divi lane): add the archive description module to the sauna TB layout and revert to the 10-18 text.
