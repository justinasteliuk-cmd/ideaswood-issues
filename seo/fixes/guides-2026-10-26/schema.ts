import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
const s = shop();
const article = { "@type": "Article", metadata: { type: "template", title: "Article", isPrimary: true, reviewLocationShortcode: "", name: "Article" },
  headline: "%seo_title%", description: "%seo_description%", keywords: "%keywords%", datePublished: "%date(Y-m-dTH:i:sP)%", dateModified: "%modified(Y-m-dTH:i:sP)%",
  author: { "@type": "Organization", name: "%org_name%" }, image: { "@id": "%primary_image_id%" }, articleSection: "" };
for (const id of [18376, 18377]) {
  const r = await fetch(`${s.base}/wp-json/rankmath/v1/updateMeta`, { method: "POST", headers: s.headers,
    body: JSON.stringify({ objectID: id, objectType: "post", meta: { rank_math_rich_snippet: "", rank_math_snippet_article_type: "" } }) });
  const k = await fetch(`${s.base}/wp-json/rankmath/v1/updateSchemas`, { method: "POST", headers: s.headers,
    body: JSON.stringify({ objectID: id, objectType: "post", schemas: { "new-9999": article } }) }).catch(e => e);
  console.log(id, r.status, k.status ?? k, k.text ? (await k.text()).slice(0, 200) : "");
}
