Apply the ideaswood.eu SEO fixes from this Mac, where you are logged in to WordPress, Search Console and PageSpeed.

Justinas's instruction: apply the fixes through my computer, tidy the existing .eu pages to best practice, all permissions are granted, don't ask questions. He also reports that ideaswood.eu shows blocks that load before the images, which may be a page-speed problem. Fix that too.

Source files are in the repo justinasteliuk-cmd/ideaswood-issues, branch claude/ideaswood-seo-audit-8r34oj (PR #2), folder seo/. The analysis was done from Google search results only, because the cloud session cannot open the site, so verify each finding on the live site before changing it.

Already done by other agents. Read this first and do not repeat it:
   - Jul to Aug 2025, Saqib: Semrush site audits (Drive folder "SEO for Ideaswood.eu": Semrush-Full_Site_Audit 23 Jul 2025, 100_Pages_Site_Audit 6 Jul 2025, Ideaswood.eu Issues.xlsx, Complete SEO Sheet). His sheet records these as done: duplicate title tags removed, layout fixed, CSS and JS minified, image optimisation to WebP started. The on-page phase that was meant to start 1 Aug 2025 (keyword research, schema, backlink plan, content strategy) was left as an empty template. Before step 1, check which minify, WebP and cache plugins are already active so you do not stack a second optimiser on top of the first.
   - "IT saugumas" session (21 Sep): security headers were added on all 5 sites, with a daily audit at 07:30. If the page-load flash is caused by blocked fonts, scripts or images, check the browser console for Content-Security-Policy errors before touching caching or images. A strict CSP is the first suspect.
   - "Svetainių QA + .com SEO" session (closed 24 Sep): QA and SEO work for .com and 31 QA tasks for Saqib. Its notes are not visible from the cloud. Read them (or ask the session) before changing anything that overlaps, and leave .com alone.
   - Social posting (Nova, 5 posts a day), LinkedIn clean-up and forum posting are marketing, not on-site SEO. Do not duplicate or pause them.
   - Two cost posts (/how-much-does-a-garden-cabin-cost/ and /how-much-does-a-garden-sauna-cost/) are already live.

Take a before screenshot and a backup first. Keep a change log (URL, before, after).

1. Speed and the load flash
   - Measure first with PageSpeed Insights on mobile for the home page and one product page. Record LCP, CLS and INP.
   - Find what causes the blocks that appear before the images load. Likely causes: images without width/height or reserved space, a lazy-loaded hero image, slow fonts (use font-display: swap and preload), render-blocking CSS and JS, a slider, no page cache.
   - Fix it with the plugins already installed where you can (caching, image optimisation, WebP, defer JS, preload the hero image). Re-measure afterwards.

2. Technical base (report page, "Dispatch tasks", Phase 1)
   - SEO plugin, Organization schema, noindex on tag/author/date/attachment pages and /product-category/featured/.
   - robots.txt from seo/fixes/03-robots.txt. Sitemap submitted in Search Console.
   - Export Search Console data (Queries, Pages, Countries for the last 3 months, and the indexing report) to Desktop/ideaswood-seo/.

3. Structure and titles (seo/DISPATCH-phase2.md)
   - Titles and meta: seo/fixes/04-titles-meta.csv.
   - Redirects: seo/fixes/06-redirects.csv. Set http to https and www to non-www at server level, in a single hop.
   - About 10 categories show "could not be found" in Google (sauna, garden furniture, wooden houses, summer house, garden house, grill cabins, wooden pergola, storage sheds, garages/carports, pergola cabins). Find and report the cause.
   - Fix the typos: Welness to Wellness, Dinning to Dining, Talinn to Tallinn.
   - /x/ is a real Koralan wood-treatment article titled "x". Redirect or retitle it. Do not delete it.
   - Merge the three log-cabin category trees into /product-category/log-cabins/ with 301 redirects.

4. Content (seo/content/*.md)
   - The drafts contain [X] placeholders for facts only Justinas can supply. Do not publish a page with the placeholders filled in by guesswork.
   - Do not create a new cost-guide page. /how-much-does-a-garden-cabin-cost/ and /how-much-does-a-garden-sauna-cost/ already exist, so extend them.
   - The sauna draft should rewrite /wellness-saunas/.

Rules
   - ideaswood.com is handled by a separate session. Do not edit it. Give that session seo/fixes/07-cross-domain-hreflang.md so both sides implement the same hreflang tags.
   - Do not change prices, products, product content or design. Do not touch user accounts. The "Gyčio prieigų auditas" session found 4 suspicious admin users on ideaswood.eu; leave them for that session.
   - Do not collide with the "Impregnavimo kainos" session, which is editing product prices.
   - Every change must be reversible. Back up first.
   - If a decision is truly blocked, do not ask Justinas. Skip that step, log it, and move on.

When done, write the change log and the before/after PageSpeed numbers to seo/reports/implementation-<date>.md and push to the same branch. The cloud SEO session will then re-measure rankings against the 2026-09-25 baseline.
