#!/usr/bin/env bun
/**
 * build-it-theme.ts — turns the ideaswood.com child-theme layer ("Lepton": divi-custom
 * js/script.js + style.css) into the abitazionidilegno.it version.
 *
 *   bun build-it-theme.ts <com-script.js> <com-style.css> <out-dir>
 *
 * What changes for .it:
 *  - visible texts in Italian (header bar, cart, tabs, addon modal, installation, insulation slides)
 *  - contacts: Gian Luca, +370 645 07954
 *  - colours: .com teal -> .it green (#4CB52D, hover #3A8F22)
 *  - prices formatted it-IT, default symbol €
 *  - checkout behaviour from .com is NOT copied: bank-details modal, order-success interception,
 *    VAT-ID sync and the "VAT included 0" checkout review are .com-specific (.com charges no VAT,
 *    .it uses WooPayments/PayPal), so those init calls are dropped.
 * Addon description KEYS stay English: they must match the WCPA section titles.
 * Every replacement must hit at least once, otherwise the build fails (the source moved).
 */

const [srcJs, srcCss, outDir] = process.argv.slice(2);
if (!srcJs || !srcCss || !outDir) throw new Error("usage: bun build-it-theme.ts <script.js> <style.css> <out-dir>");

const CRLF = (await Bun.file(srcJs).text()).includes("\r\n");
let js = (await Bun.file(srcJs).text()).replace(/\r\n/g, "\n");
let css = (await Bun.file(srcCss).text()).replace(/\r\n/g, "\n");
const misses: string[] = [];

function rep(src: string, from: string, to: string, all = false): string {
  if (!src.includes(from)) { misses.push(from.slice(0, 80)); return src; }
  return all ? src.split(from).join(to) : src.replace(from, to);
}

// --- init list: drop .com checkout behaviour
for (const call of ["buildCheckoutOrderReview();", "addBankDetailsButton();", "initCheckoutOrderSuccessPopup();", "initVatIdSync();"]) {
  js = rep(js, `            ${call}\n`, `            // .it: ${call} not used (see build-it-theme.ts)\n`);
}

// --- header utility bar
js = rep(js, `'<a href="tel:+37067822055" class="lepton-header-phone-number">+370 67822055</a>'`,
  `'<a href="tel:+37064507954" class="lepton-header-phone-number">+370 645 07954</a>'`);
js = rep(js, "Open 09:00-18:00, Mon-Fri", "Aperto 09:00-18:00, lun-ven");
js = rep(js, `placeholder="Search for products"`, `placeholder="Cerca prodotti"`);
js = rep(js, `aria-label="Search"`, `aria-label="Cerca"`, true);
js = rep(js, `class="lepton-header-btn lepton-header-btn-contact">Contact Us</a>`, `class="lepton-header-btn lepton-header-btn-contact">Contattaci</a>`);
js = rep(js, `class="lepton-header-btn lepton-header-btn-callback">Callback</button>`, `class="lepton-header-btn lepton-header-btn-callback">Richiamami</button>`);
// .it has no Popup Maker (#pum-5571 is .com's): "Richiamami" becomes a mailto to Gian Luca, which the
// iw-contact-tracking mu-plugin counts as email_click.
js = rep(js, `'<button type="button" class="lepton-header-btn lepton-header-btn-callback">Richiamami</button>'`,
  `'<a href="mailto:gianluca@ideaswood.eu?subject=Richiesta%20di%20richiamata" class="lepton-header-btn lepton-header-btn-callback">Richiamami</a>'`);
js = rep(js, "            $('#pum-5571').popmake('open');\n", "            // .it: plain mailto link, no popup\n");
js = rep(js, `aria-label="My account"`, `aria-label="Il mio account"`, true);
js = rep(js, `aria-label="Cart"`, `aria-label="Carrello"`, true);
js = rep(js, `aria-label="Home"`, `aria-label="Home page"`, true);

// --- generic UI
const ui: [string, string][] = [
  [">Add to cart<", ">Aggiungi al carrello<"],
  [">Product photo<", ">Foto del prodotto<"],
  [">Product description<", ">Descrizione del prodotto<"],
  [">No image<", ">Nessuna immagine<"],
  [">+ Add to basket<", ">+ Aggiungi al carrello<"],
  ["'Product description coming soon.'", "'Descrizione del prodotto in arrivo.'"],
  ["Continue shopping", "Continua gli acquisti"],
  ["Additional items", "Articoli aggiuntivi"],
  ["Item total", "Totale articolo"],
  [">QTY<", ">QTÀ<"],
  [">Price<", ">Prezzo<"],
  [">Specifications<", ">Specifiche<"],
  [">Description<", ">Descrizione<"],
  [">Documents<", ">Documenti<"],
  [">FAQs<", ">Domande frequenti<"],
  ["Documents coming soon.", "Documenti in arrivo."],
  ["FAQs coming soon.", "Domande frequenti in arrivo."],
  [">Back to the top<", ">Torna su<"],
  ['aria-label="Close"', 'aria-label="Chiudi"'],
  [">no image<", ">nessuna immagine<"],
];
for (const [a, b] of ui) js = rep(js, a, b, true);

// prices: it-IT and €
js = rep(js, "toLocaleString('en-US')", "toLocaleString('it-IT')", true);
js = rep(js, "toLocaleString('en-US', {", "toLocaleString('it-IT', {", true);
js = rep(js, ".text() || '$';", ".text() || '€';", true);
js = rep(js, "item.prices.currency_symbol || '$';", "item.prices.currency_symbol || '€';");

// --- addon descriptions (values only; keys stay English)
function setDesc(key: string, it: string) {
  const start = js.indexOf(`'${key}': '`);
  if (start < 0) { misses.push("desc " + key); return; }
  const valStart = start + `'${key}': `.length;
  // value = concatenation of '...' + '...' up to the first `',` that ends the entry
  const end = js.indexOf("',\n", valStart);
  const endObj = js.indexOf("'\n    };", valStart);
  const stop = end < 0 ? endObj : (endObj >= 0 ? Math.min(end, endObj) : end);
  js = js.slice(0, valStart) + `'${it.replace(/'/g, "\\'")}` + js.slice(stop);
}
setDesc("Bitumen roof shingles", "Le tegole bituminose sono una soluzione di copertura versatile ed economica, che si adatta facilmente a diverse forme e pendenze del tetto. Questo materiale tradizionale resta molto diffuso per l'ottimo rapporto qualità-prezzo e per una protezione duratura con poca manutenzione.");
setDesc("Underlayer for bitumen shingles", "Questo sottostrato è realizzato in bitume modificato con polimeri SBS e ha un'anima di rinforzo in fibra di vetro, con superficie sabbiata o antracite. È consigliato sotto le tegole bituminose e offre una protezione affidabile durante e dopo la posa del tetto.");
setDesc("Impregnation", "Questo trattamento impregnante è un rivestimento per legno a base olio o acqua, pensato per il trattamento industriale degli elementi in legno, soprattutto per uso esterno. Protegge le parti in legno della casa, offre un'ottima resistenza agli agenti atmosferici e regola l'umidità riducendo il rigonfiamento e il ritiro del legno.");
setDesc("Metal roofing tile vena", "La copertura metallica Vena è una soluzione resistente e leggera che riproduce l'aspetto delle tegole tradizionali. È compatibile con i sistemi di tetto isolato per ottime prestazioni termiche.");
setDesc("Metal roofing seam panel phr revolution", "La copertura metallica Revolution Seam Panel è una soluzione resistente, moderna e leggera, ispirata ai sistemi a giunto tradizionali. Le nervature a doppio trapezio aggiungono resistenza, rigidità e un aspetto senza tempo, adatto sia a edifici residenziali sia commerciali.");
setDesc("Raingutters system", "Il sistema di grondaie allontana l'acqua piovana dal tetto, dalle pareti e dalle fondazioni, aiutando a prevenire danni, erosione e accumulo di umidità. È particolarmente consigliato nelle zone con piogge frequenti: protegge facciata, porte, finestre e fondazioni e migliora la durata dell'edificio.");
setDesc("Cladding boards painting for walls insulation", "La verniciatura industriale delle perline utilizza attrezzature automatiche professionali per applicare vernici o impregnanti resistenti. Questo metodo riduce il rischio di difetti superficiali e aumenta la durata della finitura.");
setDesc("External wooden doors and windows painting", "La verniciatura in fabbrica per finestre e porte Premium e Premium Plus è un servizio che fa risparmiare tempo e denaro, eseguito con vernici industriali di alta qualità per elementi esterni. La verniciatura non è disponibile per finestre e porte di qualità Standard.");
setDesc("Floor insulation kit pile foundation", "Kit di isolamento adatto a fondazioni su pali. Per garantire la stabilità strutturale e proteggere il materiale isolante, il sistema comprende uno strato di truciolare e uno strato aggiuntivo di travetti del pavimento.");
setDesc("Floor insulation kit slab foundation", "Kit di isolamento adatto a fondazioni a platea: non servono travetti aggiuntivi né strati di truciolare.");
setDesc("Roof insulation kit", "Kit di isolamento posato sotto la copertura del tetto: aggiunge uno strato di lana di roccia sopra le travi, con membrana traspirante e intercapedine d'aria, e un pannello di base adatto alla copertura scelta, per una posa stabile e ben ventilata.");
setDesc("Wall insulation kit horizontal t g cladding", "Isolamento delle pareti rifinito con perline orizzontali maschio-femmina, posate su membrana traspirante e listelli in legno, per un aspetto pulito e tradizionale.");
setDesc("Wall insulation kit vertical t g cladding", "Isolamento delle pareti rifinito con perline verticali maschio-femmina. Questa versione comprende un ulteriore strato di listelli orizzontali per una maggiore rigidità.");

// installation ("Construction work")
const inst: [string, string][] = [
  ["What is included in the installation service price", "Cosa comprende il prezzo del servizio di montaggio"],
  ["High quality service", "Servizio di alta qualità"],
  ["Immediate service", "Servizio immediato"],
];
for (const [a, b] of inst) js = rep(js, `heading: '${a}'`, `heading: '${b}'`);
function setSectionText(firstFragment: string, it: string) {
  const i = js.indexOf(`text: '${firstFragment}`);
  if (i < 0) { misses.push("section " + firstFragment.slice(0, 40)); return; }
  const vs = i + "text: ".length;
  const ve = js.indexOf("'\n", js.indexOf("'.", vs) - 1) ;
  const close = js.indexOf("'\n                }", vs);
  js = js.slice(0, vs) + `'${it.replace(/'/g, "\\'")}` + js.slice(close);
  void ve;
}
setSectionText("The installation service price includes", "Il prezzo del servizio di montaggio comprende l'assemblaggio della casetta (pareti, pavimento, tavole del tetto, finestre, porte, serrature e relativa ferramenta) e la posa del materiale di copertura offerto sul nostro sito (o molto simile).");
setSectionText("We co-operate with highly skilled", "Collaboriamo con montatori professionisti molto esperti nell'installazione di casette in legno, garage e posti auto coperti. Sono disponibili anche per servizi extra, come la realizzazione della base, grondaie, impianti idraulici ed elettrici, verniciatura e altri lavori edili, a un prezzo aggiuntivo competitivo.");
setSectionText("Once you have ordered the installation service", "Dopo l'ordine del servizio di montaggio, il nostro team vi contatterà per organizzare l'installazione prima della consegna della casetta. Di solito la squadra arriva poco dopo la consegna.");

// insulation comparison slides (titles, labels, captions)
const slides: [string, string][] = [
  ["title: 'Floor insulation'", "title: 'Isolamento del pavimento'"],
  ["label: 'Pile foundation'", "label: 'Fondazione su pali'"],
  ["label: 'Slab foundation'", "label: 'Fondazione a platea'"],
  ["title: 'Wall insulation'", "title: 'Isolamento delle pareti'"],
  ["label: 'Horizontal T&G board'", "label: 'Perline orizzontali'"],
  ["label: 'Vertical T&G board'", "label: 'Perline verticali'"],
  ["title: 'Roof insulation'", "title: 'Isolamento del tetto'"],
  ["label: 'Bitumen shingles / EPDM'", "label: 'Tegole bituminose / EPDM'"],
  ["label: 'Metal roof'", "label: 'Copertura metallica'"],
];
for (const [a, b] of slides) js = rep(js, a, b);
function setCaption(firstFragment: string, it: string) {
  const i = js.indexOf(`caption: '${firstFragment}`);
  if (i < 0) { misses.push("caption " + firstFragment.slice(0, 40)); return; }
  const vs = i + "caption: ".length;
  const close = js.indexOf("'\n", js.indexOf("',", vs) >= 0 ? vs : vs);
  const end = Math.min(...["'\n                    }", "'\n                }", "',\n"].map((t) => { const k = js.indexOf(t, vs); return k < 0 ? Infinity : k; }));
  js = js.slice(0, vs) + `'${it.replace(/'/g, "\\'")}` + js.slice(end);
  void close;
}
setCaption("Insulation kit suitable for pile foundations", "Kit di isolamento per fondazioni su pali. Per la stabilità strutturale e la protezione dell'isolante, comprende uno strato di truciolare e uno strato aggiuntivo di travetti.");
setCaption("Insulation kit suitable for slab foundations", "Kit di isolamento per fondazioni a platea: non servono travetti aggiuntivi né truciolare.");
setCaption("Wall insulation finished with horizontal", "Isolamento delle pareti rifinito con perline orizzontali maschio-femmina, su membrana traspirante e listelli in legno, per un aspetto pulito e tradizionale.");
setCaption("Wall insulation finished with vertical", "Isolamento delle pareti rifinito con perline verticali maschio-femmina, con un ulteriore strato di listelli orizzontali per una maggiore rigidità.");
setCaption("For bitumen shingles or EPDM roofing", "Per tegole bituminose o EPDM, uno strato di pannelli OSB offre una base solida e stabile per la corretta posa della copertura.");
setCaption("For metal roof systems", "Per le coperture metalliche si usa un listellato al posto dell'OSB, per garantire la ventilazione e la corretta posa.");

// --- colours
const colours: [string, string][] = [
  ["#378682", "#4CB52D"], ["#2c6a67", "#3A8F22"], ["#2C6A67", "#3A8F22"],
  ["rgba(55, 134, 130,", "rgba(76, 181, 45,"], ["rgba(55,134,130,", "rgba(76,181,45,"],
];
for (const [a, b] of colours) { if (js.includes(a)) js = js.split(a).join(b); if (css.includes(a)) css = css.split(a).join(b); }
css = css.replace(/#378682/gi, "#4CB52D");

if (misses.length) { console.error("MISSES:\n" + misses.join("\n")); process.exit(1); }
if (/#378682|55, ?134, ?130/i.test(js + css)) { console.error("teal left"); process.exit(1); }
await Bun.write(`${outDir}/script.js`, CRLF ? js.replace(/\n/g, "\r\n") : js);
await Bun.write(`${outDir}/style.css`, css);
console.log("ok", js.length, css.length);
