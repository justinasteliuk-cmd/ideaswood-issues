import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
const s = shop(); const B = "https://ideaswood.eu";
export const rows = [
  { from: "Home", kind: "pages", id: 10312, to: "/product-category/garden-cabins/", anchor: "garden cabins" },
  { from: "Home", kind: "pages", id: 10312, to: "/product-category/summer-houses-chalets/", anchor: "summer houses" },
  { from: "Home", kind: "pages", id: 10312, to: "/product-category/sauna/", anchor: "outdoor saunas" },
  { from: "Home", kind: "pages", id: 10312, to: "/how-much-does-a-garden-cabin-cost/", anchor: "what a garden cabin costs" },
  { from: "Garden cabins category", kind: "cat", id: 657, to: "/how-much-does-a-garden-cabin-cost/", anchor: "How much does a garden cabin cost" },
  { from: "Garden cabins category", kind: "cat", id: 657, to: "/pvc-windows-for-log-cabins/", anchor: "PVC windows" },
  { from: "Cost post (cabin)", kind: "posts", id: 17451, to: "/product-category/garden-cabins/", anchor: "garden cabins" },
  { from: "Cost post (cabin)", kind: "posts", id: 17451, to: "/everything-you-need-to-know-about-insulation-kits-for-sheds-cabins-modular-homes/", anchor: "insulation kits" },
  { from: "Cost post (sauna)", kind: "posts", id: 17535, to: "/product-category/sauna/", anchor: "outdoor saunas" },
  { from: "Sauna category", kind: "cat", id: 27, to: "/how-much-does-a-garden-sauna-cost/", anchor: "How much does a garden sauna cost" },
  { from: "Sauna category", kind: "cat", id: 27, to: "/wellness-saunas/", anchor: "sauna for resale and hospitality" },
  { from: "/wellness-saunas/", kind: "posts", id: 6712, to: "/product-category/sauna/", anchor: "retail saunas" },
  { from: "Ultimate log cabin guide", kind: "posts", id: 5532, to: "/easy-installation/", anchor: "easy installation" },
  { from: "PVC windows post", kind: "posts", id: 13289, to: "/product-category/garden-cabins/", anchor: "garden cabins" },
  { from: "Insulation kits post", kind: "posts", id: 6392, to: "/product-category/garden-cabins/", anchor: "garden cabins" },
  { from: "Koralan post", kind: "posts", id: 13160, to: "/product-category/garden-cabins/", anchor: "log cabins" },
];
export async function raw(r: any): Promise<{ id: number; text: string; builder?: string }> {
  if (r.kind === "cat") { const c = await (await fetch(`${B}/wp-json/wc/v3/products/categories/${r.id}`, { headers: s.headers })).json() as any; return { id: r.id, text: c.description }; }
  const url = r.id ? `${B}/wp-json/wp/v2/${r.kind}/${r.id}?context=edit` : `${B}/wp-json/wp/v2/${r.kind}?slug=${r.slug}&context=edit`;
  let p = await (await fetch(url, { headers: s.headers })).json() as any; if (Array.isArray(p)) p = p[0];
  return { id: p.id, text: p.content.raw, builder: p.meta?._et_pb_use_builder };
}
if (import.meta.main) for (const r of rows) {
  const { id, text, builder } = await raw(r);
  const has = new RegExp(`href=["'](https://ideaswood\\.eu)?${r.to.replace(/[/.]/g, "\\$&")}["']`).test(text);
  const code = (await fetch(B + r.to, { redirect: "manual" })).status;
  console.log([r.from, id, r.to, "target", code, "builder", builder || "-", "len", text.length, has ? "HAS LINK" : "missing"].join(" | "));
}
