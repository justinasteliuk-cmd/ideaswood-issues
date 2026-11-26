# ideaswood.eu / .com / .com.au – cross-domain setup (all three owned by IdeasWood)

Decision 2026-09-29 (Justinas): all three domains stay. No 301 merge. ideaswood.com is handled in a separate session.

## Why something still has to be done
Google currently sees the same English pages on .eu and .com (same slugs, same guide), so it picks one and filters the other, and brand search splits across 4 domains. Without signals, .eu and .com compete with each other for every keyword.

## Fix: hreflang + self-canonicals (both sites must carry the same tags)
| Domain | hreflang | Market |
|---|---|---|
| ideaswood.eu | en-GB, en-IE, en (x-default) | UK, Ireland, EU (EUR, metric) |
| ideaswood.com | en-US (+ en-CA if relevant) | North America (USD, ft) |
| ideaswood.com.au | en-AU, en-NZ | Australia / NZ |

On each equivalent page, all three sites list all versions, e.g. on ideaswood.eu/the-ultimate-log-cabin-guide/:
```html
<link rel="canonical" href="https://ideaswood.eu/the-ultimate-log-cabin-guide/">
<link rel="alternate" hreflang="en-GB" href="https://ideaswood.eu/the-ultimate-log-cabin-guide/">
<link rel="alternate" hreflang="en-IE" href="https://ideaswood.eu/the-ultimate-log-cabin-guide/">
<link rel="alternate" hreflang="en-US" href="https://ideaswood.com/the-ultimate-log-cabin-guide/">
<link rel="alternate" hreflang="en-AU" href="https://ideaswood.com.au/the-ultimate-log-cabin-guide/">
<link rel="alternate" hreflang="x-default" href="https://ideaswood.eu/the-ultimate-log-cabin-guide/">
```
Rules: tags must be reciprocal (a page missing the return tag is ignored); only pair pages that really are equivalent; each page canonicals to itself, never to the other domain.

## Also needed so the sites are not near-duplicates
- Localise: currency, units, delivery/VAT text, phone format, examples per market.
- One set of company facts across all three (founding year: .eu says 2007, .com says 1993 – pick one).
- Organization schema: same @id / sameAs listing all three domains.
- Footer on each: "IdeasWood worldwide: EU & UK · USA · Australia" linking the other sites.

## For the .com session
Pass this file to the session working on ideaswood.com so both sides implement the same hreflang map.
