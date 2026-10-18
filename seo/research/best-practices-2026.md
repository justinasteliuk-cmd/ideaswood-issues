# SEO best practices 2026 for ideaswood.eu (research notes)

Researched 2026-10-18 via WebSearch only. **WebFetch failed (DNS blocked) for developers.google.com, status.search.google.com, dunsterhouse.co.uk, waltons.co.uk**, so no Google primary page and no competitor page was read directly. Nearly all sources are secondary (SEO vendor blogs / news). Items marked **[UNVERIFIED]** need checking against Google docs.

## 1. Google updates 2025-2026
- Aug 2025 spam update: started 26 Aug, done ~22 Sep 2025; hit thin/low-value content incl. buried pages on high-trust domains. https://www.seroundtable.com/google-december-2025-core-update-40569.html (context), https://www.veloxmedia.com/google-core-update
- Dec 2025 core update: began 11 Dec, ~18 days, third core update of 2025. One vendor analysis (400+ domains): specialist shops gained, broad assortments lost. https://www.xictron.com/en/blog/google-core-update-december-2025/ [single-vendor, indicative]
- Mar 2026 spam update (24-25 Mar, very fast) then Mar 2026 core update (began 27 Mar, ended 8 Apr, 12 days). No new spam policy categories. https://embryo.com/industry-updates/googles-march-2026-spam-update-finished-in-record-time/ , https://www.seroundtable.com/google-march-2026-core-update-41121.html
- May 2026 core update: second core update of 2026, finished ~2 Jun. https://www.searchenginejournal.com/google-begins-rolling-out-may-2026-core-update/575589/
- Sep 2026 spam update: started 24 Sep, still active 6 Oct; status now unclear. https://coalitiontechnologies.com/blog/will-another-google-core-update-coming-after-the-september-2026-spam-update . No confirmed Oct 2026 core update found; forecast of one by 12 Dec is speculation.
- E-commerce effect (vendor reports): copied manufacturer/supplier descriptions and templated product content hit hardest; original descriptions plus genuine reviews mostly unaffected; interchangeable aggregators lost, established brands gained (Sistrix: Amazon +5.6%, eBay -5.2%). https://novadata.io/resources/news/google-march-2026-core-update-ecommerce-sellers , https://www.xictron.com/en/blog/google-core-update-march-2026-recovery-shops/ . Loss figures (20-35%, 52-55% of shops) vary between vendors: unverified.
- Conflict: some sources say Mar 2026 spam update covered site reputation abuse, one (citing Barry Schwartz) says it did not. [UNVERIFIED]
- Google has published no product/category-specific guidance for these updates (per search results).

## 2. WooCommerce category pages
- UK study of 300 top-ranking category pages (updated Apr 2026): avg 310 words unique text, 66% under 400, 44% under 200. https://digitaloft.co.uk/category-page-content-length/ [one agency]
- Placement consensus: short intro (~100-300 words) above grid; FAQ/extra copy below. https://www.digitalapplied.com/blog/ecommerce-seo-product-category-page-guide-2026 , https://spilnoagency.com.ua/en/instructions-us/seo-optimisation-product-category-pages (100-200 intro + 300-500 below)
- Long blog-style buying guides under the grid can dilute commercial intent (Digital Oft); a short buying guide + link to a full guide is the compromise. https://outranked.digitaloft.co.uk/posts/category-page-content
- FAQs: 3-5, tailored to your own selling points, not generic "what is...". Same Digital Oft source.
- Internal links to subcategories/sizes and related categories are standard (e.g. size sub-pages 12x8ft).
- Duplicate/boilerplate: write unique intro per category and per size subcategory; do not reuse supplier text (see section 1).
- Competitors: Garden Buildings Direct (BillyOh seller) log-cabins page = short intro, filter sidebar, tiles, buying-guide link, live chat, guarantee/delivery USPs; size subpage has own intro. https://www.gardenbuildingsdirect.co.uk/log-cabins , https://www.gardenbuildingsdirect.co.uk/log-cabins/3-5m-x-2-5m . **Dunster House, Waltons, Tuin, Summerhouse24, Palmako UK, BillyOh category pages NOT inspected; no word counts obtained.**

## 3. Structured data / Merchant Center
- FAQ rich results: restricted to gov/health since 2023; reported fully dropped 7 May 2026, Rich Results Test/report removal Jun 2026, Search Console API Aug 2026. FAQPage markup may still help understanding but gives no visual result. https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/ , https://www.techwyse.com/news/ai-search/google-faq-rich-results-deprecated-2026 [dates differ by source; verify on Google docs]
- Shipping/returns: Nov 2025 Google expanded Search Console "Shipping and returns" settings to all identified merchants; SC settings override on-page markup; organization-level shipping policy markup added; per-product overrides it. https://developers.google.com/search/blog/2025/11/more-ways-to-share-shipping , https://ppc.land/google-expands-shipping-policy-options-for-online-merchants/
- Return policy markup (MerchantReturnPolicy) supported for merchant listings. https://searchengineland.com/google-adds-new-return-policy-structured-data-support-for-merchant-listing-395727
- Loyalty benefits in shipping/returns not supported (Jul 2025 doc). https://ppc.land/google-clarifies-merchant-return-policies-and-loyalty-programs-documentation/
- Product.category (CategoryCode) and sale validFrom/validThrough reportedly added 2026 [UNVERIFIED, single vendor] https://www.tryvizup.com/blog/google-merchant-listing-schema-category-and-sale-updates
- Free listings: UK and Ireland are on Google's supported-country list; synced products must be opted in to "Free listings" destination; eligibility does not guarantee impressions. https://support.google.com/merchants/answer/13692890 . WooCommerce-specific official walkthrough not found.
- Not checked in this pass (no source retrieved): current status of ItemList, AggregateRating, BreadcrumbList, Organization rich results. Assume Product/Offer/AggregateRating/Breadcrumb/Organization remain supported; **[UNVERIFIED]**.

## 4. AI search visibility
- Google: no special files/markup needed for AI Overviews/AI Mode; AI features use normal index. Quote reported from AI optimization guide (update date disputed, 15 May vs 15 Jun 2026): "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search". https://www.getpassionfruit.com/blog/should-i-create-an-llms.txt-file-google-s-2026-guidance-explained [secondary]
- llms.txt: Mueller called it speculative / meta-keywords-like; harmless to keep; Lighthouse 13.3 has an experimental agentic audit checking it. https://www.techwyse.com/news/ai-search/google-john-mueller-llms-txt-speculative-webmcp-ai-agents . Priority: do not block AI/search bots in robots.txt or bot-management.
- Ahrefs: 76% of AI Overview cited URLs come from top-10 pages; only ~11% overlap between AI assistants' citations and Google/Bing top 10. https://ahrefs.com/blog/ai-overview-citations-top-10 , https://ahrefs.com/blog/ai-search-overlap
- Ahrefs 75K brands: YouTube mentions correlate most with AI Overview visibility (correlation only). https://ahrefs.com/blog/ai-search-overlap
- Surfer (650K AI answers): Perplexity citation driven largely by first paragraph answering the query. https://surferseo.com/blog/improve-visibility-in-perplexity/ [vendor]
- 23 AI citation factors (Shepard, May 2026): https://ppc.land/23-factors-that-actually-get-your-content-cited-by-ai-search-engines/ (factor list not read)
- On-Page.ai (370 pages, Jul 2026): DR, backlinks, brand search volume did not predict citation. https://api.on-page.ai/research/ai-citation-predictors
- Nothing found testing tables or small-manufacturer cases; "40-60 word answer-first", author byline, FAQ schema advice is unverified practitioner opinion.

## 5. Core Web Vitals
- Good thresholds unchanged: LCP <=2.5s, INP <=200ms, CLS <=0.1 at 75th percentile; poor: >4s, >500ms, >0.25. https://rgb.ir/en/blog/core-web-vitals-thresholds-2026/ , https://accs-net.com/glossary/core-web-vitals/ (confirm at https://web.dev/articles/vitals)
- Claims of a 2026 tightening (LCP 2s) or higher INP weight have no Google source. https://www.jorbox.com/blog/core-web-vitals-that-actually-matter [treat as false/unverified]
- Ranking role small (tie-breaker; no single page-experience signal), UX/conversion is the main benefit. https://ppc.land/core-web-vitals/

## 6. International / hreflang
- Google's docs list English targeted at US, GB and IE as a use case for hreflang with small regional variations; hreflang, not subdomain/ccTLD naming, defines audience. https://developers.google.com/search/docs/specialty/international/localized-versions (via search snippet only)
- Needs reciprocal return tags; self-reference recommended (Ahrefs says not strictly required); each page canonical to itself, never cross-domain to another locale. https://ahrefs.com/blog/hreflang-study , https://scandiweb.com/blog/canonicals-and-hreflangs-for-international-store/
- Use en-GB (not en-UK), en-IE; x-default for fallback/selector. https://http.dev/hreflang
- Near-identical English pages: no official statement found that hreflang fully prevents duplicate clustering; advisable to differentiate (currency, VAT, delivery, spelling, local terms, legal). Moz-community sources disagree. [UNVERIFIED, no Google quote]

## Apply to ideaswood.eu (ranked by impact)
1. Replace any supplier/duplicated copy on products and categories with original text, specs, real photos, reviews (core-update risk).
2. Per category: unique 100-250 word answer-first intro above grid; 300-500 words below (buying guide snippet, sizing/permit/insulation facts, 3-5 tailored FAQs); link to subcategories and sizes and a full guide. Avoid templated text across size pages.
3. Audit competitor category pages manually (Dunster, Waltons, BillyOh, Palmako, Tuin, Summerhouse24): word count, headings; target ~300-450 words, since fetch was unavailable.
4. Set up Merchant Center free listings for GB/IE (+EU), clean GTINs/prices/shipping; configure Shipping & Returns in Search Console; add Product/Offer/MerchantReturnPolicy/OfferShippingDetails.
5. Locale differentiation: per-site currency, delivery times/costs, spelling, local regulations (UK planning/building regs, IE exemption rules), plus self-canonical + reciprocal hreflang (en-GB, en-IE, en-US, en-AU, x-default).
6. Strong About/company/manufacturer pages, author/expert bylines, contact details, Organization schema; consider YouTube build/assembly videos (AI citation correlation).
7. Keep FAQPage markup optional (no rich result now); do not spend effort on it for SERP appearance.
8. Allow Googlebot, GPTBot, PerplexityBot etc.; llms.txt optional/low priority.
9. Hit CWV thresholds (Divi bloat: image/LCP optimization, caching) for UX and as tie-breaker.
10. Re-verify all [UNVERIFIED] items in Google docs/Search Status Dashboard.
