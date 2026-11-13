// Explicit internal-link edits from seo/content/09-internal-linking-map.md. Each find string must occur exactly once.
// Dry run by default; --write saves a backup of the original content and writes, then reads back.
import { writeFileSync, mkdirSync } from "node:fs";
import { shop } from "/Users/justas/.claude/PAI/USER/WORK/ideaswood-agents/registry/shop-auth.ts";
import { raw } from "./links-check.ts";
const s = shop(); const B = "https://ideaswood.eu"; const write = process.argv.includes("--write");
const a = (p: string, t: string) => `<a href="${B}${p}">${t}</a>`;
const edits: { kind: string; id: number; find: string; repl: string; row: string }[] = [
  { kind: "pages", id: 10312, row: "Home → summer houses + garden cabins + cost",
    find: "ideal for garden offices, summer houses, or extra living space, built to last through every season.",
    repl: `ideal for garden offices, ${a("/product-category/summer-houses-chalets/", "summer houses")}, or extra living space, built to last through every season. Browse all our ${a("/product-category/garden-cabins/", "garden cabins")}, or see ${a("/how-much-does-a-garden-cabin-cost/", "what a garden cabin costs")}.` },
  { kind: "pages", id: 10312, row: "Home → outdoor saunas",
    find: "offering the ultimate spa experience in your home or garden.</p>",
    repl: `offering the ultimate spa experience in your home or garden. See all our ${a("/product-category/sauna/", "outdoor saunas")}.</p>` },
  { kind: "cat", id: 657, row: "Garden cabins category → PVC windows",
    find: `See <a href="https://ideaswood.eu/easy-installation/">how assembly works</a>.</p>`,
    repl: `See <a href="https://ideaswood.eu/easy-installation/">how assembly works</a>.</p>\n<p><strong>Windows.</strong> Read why we recommend ${a("/pvc-windows-for-log-cabins/", "PVC windows")} for most cabins.</p>` },
  { kind: "posts", id: 17451, row: "Cost post (cabin) → insulation kits",
    find: "On many smaller cabins the floor is an option, so compare like with like.</li>",
    repl: `On many smaller cabins the floor is an option, so compare like with like. For winter use, budget for floor and roof ${a("/everything-you-need-to-know-about-insulation-kits-for-sheds-cabins-modular-homes/", "insulation kits")}.</li>` },
  { kind: "posts", id: 17535, row: "Cost post (sauna) → outdoor saunas",
    find: "so you know what each type actually costs.</p>",
    repl: `so you know what each type actually costs. You can also browse all our ${a("/product-category/sauna/", "outdoor saunas")}.</p>` },
  { kind: "posts", id: 6712, row: "/wellness-saunas/ → retail saunas",
    find: "<strong>exclusively to Resellers, Retailers, and Suppliers</strong>.</p>",
    repl: `<strong>exclusively to Resellers, Retailers, and Suppliers</strong>.</p>\n<p style="text-align: justify;">Buying a sauna for your own garden? See our ${a("/product-category/sauna/", "retail saunas")}.</p>` },
  { kind: "posts", id: 5532, row: "Ultimate log cabin guide → easy installation",
    find: "Modify the layout, size, and features to match your unique requirements.</li>\n</ul>",
    repl: `Modify the layout, size, and features to match your unique requirements.</li>\n</ul>\n<p style="text-align: left;">Every cabin ships as a pre-cut kit. See how ${a("/easy-installation/", "easy installation")} works.</p>` },
  { kind: "posts", id: 13289, row: "PVC windows post → garden cabins (replaces redirected /product-category/log-cabins/)",
    find: `<a href="https://ideaswood.eu/product-category/log-cabins/">Browse our log cabin range</a>`,
    repl: `Browse our ${a("/product-category/garden-cabins/", "garden cabins")}` },
  { kind: "posts", id: 6392, row: "Insulation kits post → garden cabins",
    find: "energy efficiency year-round.</p>",
    repl: `energy efficiency year-round.</p>\n<p>Insulation kits are available for all our models, including our ${a("/product-category/garden-cabins/", "garden cabins")}.</p>` },
  { kind: "posts", id: 13160, row: "Koralan post → log cabins",
    find: "<p>Wooden log cabins face constant environmental challenges.",
    repl: `<p>Wooden ${a("/product-category/garden-cabins/", "log cabins")} face constant environmental challenges.` },
];
const docs = new Map<string, { orig: string; text: string }>();
let bad = 0;
for (const e of edits) {
  const k = `${e.kind}:${e.id}`;
  if (!docs.has(k)) { const t = (await raw(e)).text; docs.set(k, { orig: t, text: t }); }
  const d = docs.get(k)!; const n = d.text.split(e.find).length - 1;
  console.log(n === 1 ? "OK  " : `BAD(${n})`, k, e.row); if (n !== 1) { bad++; continue; }
  d.text = d.text.replace(e.find, e.repl);
}
if (bad) { console.log("stopping: fix BAD rows first"); process.exit(1); }
if (write) {
  const dir = import.meta.dir + "/link-backups"; mkdirSync(dir, { recursive: true });
  for (const [k, d] of docs) {
    const [kind, id] = k.split(":");
    writeFileSync(`${dir}/${kind}-${id}.orig.txt`, d.orig);
    const url = kind === "cat" ? `${B}/wp-json/wc/v3/products/categories/${id}` : `${B}/wp-json/wp/v2/${kind}/${id}`;
    const res = await fetch(url, { method: kind === "cat" ? "PUT" : "POST", headers: s.headers, body: JSON.stringify(kind === "cat" ? { description: d.text } : { content: d.text }) });
    const back = (await raw({ kind, id: Number(id) })).text;
    console.log("WROTE", k, res.status, back === d.text ? "readback OK" : "READBACK DIFFERS");
  }
}
