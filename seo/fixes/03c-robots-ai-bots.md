# 03c: Let AI search bots in, verify it, and set up Bing Webmaster Tools + IndexNow

For: Astra (ideaswood.eu executor). Date: 2026-11-20. Background: `research/ai-search-geo-2026-11-20.md` sections 2-3.
Owner says prospects already found IdeasWood via ChatGPT and Gemini, so nothing is fully blocked today. Goal: make sure no bot is blocked by robots.txt, firewall, CDN or plugin, and get pages into Bing quickly (Bing feeds Copilot and is a named source for ChatGPT search).

---

## 1. robots.txt

### Current state (applied 2026-10-18, fixes/03b)
The file has one `User-agent: *` group that only blocks cart, checkout, account, logs, add-to-cart, sorting, filters and search. **All AI bots are already allowed.** No change is strictly needed.

### Important rule before editing
A bot that finds a group naming it **ignores the `*` group completely**. If you add `User-agent: GPTBot` with only `Allow: /`, GPTBot may then crawl /cart/, /checkout/, ?add-to-cart= URLs. So named bots must share the same rule block as `*`, as below.

### Recommended file (explicit, same rules for everyone)
Replace the whole robots.txt with this. It is functionally the same as today for all bots, but states the intent clearly and survives a later "block AI bots" plugin default being noticed in review.

```
# SEMrushbot crawling to reduce server load
User-agent: SemrushBot
Crawl-delay: 10

# Search engines and AI search/answer bots: all welcome, same rules.
# Google: Googlebot (Search, AI Overviews, AI Mode), Google-Extended (Gemini training/grounding outside Search)
# Microsoft: Bingbot (Bing, Copilot; source for ChatGPT search)
# OpenAI: OAI-SearchBot (ChatGPT search), ChatGPT-User (user fetch), GPTBot (training)
# Perplexity: PerplexityBot (search), Perplexity-User (user fetch)
# Anthropic: Claude-SearchBot (search), Claude-User (user fetch), ClaudeBot (training)
User-agent: Googlebot
User-agent: Google-Extended
User-agent: Bingbot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: ClaudeBot
User-agent: Applebot
User-agent: Applebot-Extended
User-agent: DuckAssistBot
User-agent: CCBot
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /wp-content/uploads/wc-logs/
Disallow: /wp-content/uploads/woocommerce_transient_files/
Disallow: /wp-content/uploads/woocommerce_uploads/
Disallow: /*?add-to-cart=
Disallow: /*?*add-to-cart=
Disallow: /*?orderby=
Disallow: /*?filter_
Disallow: /*?s=
Disallow: /?s=

Sitemap: https://ideaswood.eu/sitemap_index.xml
```

Notes:
- Several `User-agent` lines followed by one rule block form one group (RFC 9309; Google and Bing support it).
- Do **not** add `Disallow: /` for GPTBot, ClaudeBot, Google-Extended or CCBot. They are training/grounding bots; blocking them does not hurt search today but makes future models know less about IdeasWood. Justinas wants AI to recommend IdeasWood, so allow. [Owner decision; reversible any time]
- Where to edit: if robots.txt is a physical file in the web root, edit that file. If not, Rank Math > General Settings > Edit robots.txt (Rank Math's editor is disabled when a physical file exists). Use the same place as on 2026-10-18.
- Also check www/http variants redirect to https://ideaswood.eu/robots.txt (fixed 2026-10-18).
- Do the same check on any other domain that should be visible (ideaswood.com, ideaswood.com.au) once their role is decided. Each host needs its own robots.txt.

---

## 2. Check nothing blocks the bots outside robots.txt

robots.txt is only a request. Firewalls, CDNs and security plugins block by user agent or rate, and that is the usual real cause of "AI can't see my site".

1. **Hosting / LiteSpeed / QUIC.cloud**: in QUIC.cloud dashboard (if used) check CDN > Security / Bot protection / "Block AI bots" style settings and any reCAPTCHA or anti-bot challenge; must be off for the bots above. In LiteSpeed WebAdmin / hosting panel check bot or crawler throttling. [CHECK: which CDN, if any, is in front of ideaswood.eu]
2. **Wordfence / other security plugin**: Firewall > Rate limiting: "If a crawler's page views exceed" should be throttle, not block; do not enable "block fake Google crawlers" without checking Bingbot; check Blocking > no user-agent patterns like `GPTBot`, `Claude`, `Perplexity`, `bot`.
3. **Cloudflare** (if ever added): Security > Bots: "Block AI training bots" / AI Crawl Control must allow OAI-SearchBot, PerplexityBot, Claude-SearchBot, and ideally GPTBot/ClaudeBot. New Cloudflare zones block AI bots by default since July 2025.
4. **.htaccess**: search for `RewriteCond %{HTTP_USER_AGENT}` lines naming any of the bots.

### Test commands (run from a Mac terminal)
Each should return `HTTP/2 200` and a similar `content-length` to the normal browser request. A 403, 429, 503 or a challenge page = blocked.

```bash
for UA in \
 "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
 "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)" \
 "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)" \
 "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0; +https://openai.com/bot)" \
 "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.1; +https://openai.com/gptbot)" \
 "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)" \
 "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +https://www.anthropic.com)" \
 "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)" ; do
  echo "== $UA"
  curl -s -o /dev/null -w "%{http_code} %{size_download} bytes\n" -A "$UA" https://ideaswood.eu/
  curl -s -o /dev/null -w "%{http_code} %{size_download} bytes (category)\n" -A "$UA" https://ideaswood.eu/product-category/garden-cabins/
done
curl -s https://ideaswood.eu/robots.txt
```
(User-agent strings are close to the published ones; exact versions change. The test only shows whether the server treats these names differently. Real bots also come from their own IP ranges, which a curl test cannot imitate, so step 3 below is the real proof.)

### Real-traffic proof (after 7 days)
In the hosting access log (cPanel/LiteSpeed raw access log), count hits per bot:
```bash
grep -Eio "OAI-SearchBot|ChatGPT-User|GPTBot|PerplexityBot|Perplexity-User|Claude-SearchBot|Claude-User|ClaudeBot|bingbot|Googlebot" access.log | sort | uniq -c | sort -rn
```
Also check status codes for those lines (`awk '{print $9}'`): mostly 200/301/304 is fine; many 403/429/503 = something blocks them.

### Tool checks
- Google Search Console > Settings > robots.txt report: fetched OK, no errors.
- Bing Webmaster Tools > Tools > robots.txt Tester: test `/`, `/product-category/garden-cabins/` and `/cart/` for Bingbot.
- OpenAI says robots.txt changes take about 24 hours to apply.
- **Never** switch on Google's AI Overviews / AI Mode opt-out in Search Console if it appears (being tested in the UK in 2026), and do not add `nosnippet` / `data-nosnippet` / `max-snippet:0` to money pages: these stop Google from quoting the page in AI answers.

---

## 3. Bing Webmaster Tools + IndexNow checklist

**Bing Webmaster Tools (BWT)**
- [ ] Go to https://www.bing.com/webmasters and sign in with the Microsoft account that will own it (use a company account, not personal). [CHECK: does a BWT account already exist?]
- [ ] Add site by **Import from Google Search Console** (fastest: imports the verified property and sitemaps). If import is not possible, verify with the XML file or meta tag (Rank Math > General Settings > Webmaster Tools > Bing verification code).
- [ ] Property must be `https://ideaswood.eu/` (the canonical host).
- [ ] Sitemaps: submit `https://ideaswood.eu/sitemap_index.xml`; confirm status "Success" and URL count close to GSC's.
- [ ] URL Inspection: inspect home, /product-category/garden-cabins/, /wellness-saunas/, /log-cabin-wall-thickness/; for any "not indexed", click Request indexing.
- [ ] Site Explorer / Recommendations (SEO reports): fix any blocked-by-robots, 4xx or redirect-chain issues reported.
- [ ] Crawl control: leave default (no reduced crawl rate).
- [ ] **AI Performance** report (left menu, public preview since Feb 2026): note citations in Copilot/Bing AI, grounding queries and cited pages monthly. Add the numbers to the report page.
- [ ] Add Justinas as a user (Settings > User management) so access does not depend on one person.

**IndexNow via Rank Math**
- [ ] Rank Math > Dashboard > Modules: switch on **Instant Indexing** (this module contains IndexNow). [CHECK exact labels in the installed Rank Math version]
- [ ] Rank Math > General Settings (or Instant Indexing settings) > IndexNow tab: tick post types to auto-submit: Posts, Pages, Products. Product categories if offered.
- [ ] The API key is generated automatically. Open the key file URL shown there (https://ideaswood.eu/<key>.txt) in a browser: it must return the key text, not a 404 or a cached HTML page. If LiteSpeed Cache or a redirect breaks it, exclude that URL from cache.
- [ ] Use "Submit URLs" once to send the 20 most important URLs manually (home, main categories, guides, trade partners, delivery, company facts when live).
- [ ] Check the History tab shows "200/202 OK" responses.
- [ ] In BWT > IndexNow, confirm Bing shows received URLs (can take a day).
- [ ] Do not install a second IndexNow plugin (double submissions).
- Note: IndexNow covers Bing (and Yandex, Seznam, Naver); it does not notify Google. For Google, keep submitting new key URLs in GSC URL Inspection.

**Bing Places for Business** (Copilot and Bing use it for company facts) [CHECK: whether to list, since buyers do not visit the address]
- [ ] https://www.bingplaces.com : import from Google Business Profile once GBP exists (content/07), or create with the exact NAP: IdeasWood, Kaštonų g. 8, Didžiosios Riešės k., Vilniaus r. sav., [postcode], Lithuania, +370 678 22055, https://ideaswood.eu/, category close to "Log cabin supplier" / "Building materials supplier". No "manufacturer" or "factory" category.

**Log it**
- [ ] Append to COORDINATION.md change log: date, "robots.txt AI bots explicit", "BWT verified", "IndexNow on", test results.
