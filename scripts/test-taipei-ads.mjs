import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const html = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const head = html.slice(html.indexOf("<head>"), html.indexOf("</head>"));
const tagUrl = "https://www.googletagmanager.com/gtag/js?id=AW-18424373618";
assert.equal(html.split(tagUrl).length - 1, 1, "One base tag loader");
assert.ok(head.includes(tagUrl), "Base tag must be in the initial HTML head");
const bootstrap = [...head.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(match => match[1]).filter(script => script.includes("gtag('config', 'AW-18424373618')"));
assert.equal(bootstrap.length, 1, "One Google tag configuration");

const source = fs.readFileSync(new URL("../client/src/lib/taipeiAds.ts", import.meta.url), "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const listeners = [];
class Element {
  constructor(href) { this.href = href; }
  closest() { return this.href === null ? null : this; }
  getAttribute() { return this.href; }
}
const context = {
  exports: {}, URL, Element, Date,
  location: { origin: "https://muxuantw.com" },
  document: {
    // Conversion setup must not add another loader.
    createElement: () => { throw new Error("Duplicate tag loader"); },
    addEventListener: (type, listener, capture) => listeners.push({ type, listener, capture }),
  },
};
context.window = context;
vm.createContext(context);
vm.runInContext(bootstrap[0], context);
vm.runInContext(code, context);
const { getTaipeiConversion, initializeTaipeiConversionTracking } = context.exports;
for (const href of ["tel:09-01371301", "tel:0901371301", "tel:0901-371-301", "tel:+886-901-371-301"]) {
  assert.equal(getTaipeiConversion(href, context.location.origin)?.contact_action, "phone_click");
}
for (const href of ["/assets/line-qr-taipei.webp", "https://muxuantw.com/assets/line-qr-taipei.webp"]) {
  assert.equal(getTaipeiConversion(href, context.location.origin)?.contact_action, "qr_image_click");
}
for (const href of ["tel:05-2222166", "tel:05-3628586", "tel:+65 6538 9589", "tel:02-23967893", "tel:09013713010", "https://lin.ee/NxoDqq0", "/assets/line-qr-chiayi.webp", "https://example.com/assets/line-qr-taipei.webp", "https://muxuantw.com.evil.test/assets/line-qr-taipei.webp", "/contact", "javascript:alert(1)"]) {
  assert.equal(getTaipeiConversion(href, context.location.origin), null, href);
}
initializeTaipeiConversionTracking();
initializeTaipeiConversionTracking();
assert.equal(listeners.length, 1, "One conversion listener, even after repeated initialization");
assert.equal(listeners[0].capture, true, "Popup bubble handlers cannot suppress tracking");
assert.equal(context.dataLayer.filter(args => args[0] === "config").length, 1);
const click = href => listeners[0].listener({ target: new Element(href) });
const events = () => context.dataLayer.filter(args => args[0] === "event");
// Elements created later simulate navigation and opening/reopening the popup.
// Queueing works even before the external Google script has finished loading.
click("tel:09-01371301");
click("/assets/line-qr-taipei.webp");
click("/assets/line-qr-taipei.webp");
click("tel:05-2222166");
click("https://lin.ee/NxoDqq0");
click(null);
assert.equal(events().length, 3);
assert.equal(events()[0][2].send_to, "AW-18424373618/7acVCK6P6ZIdEPLCttFE");
assert.equal(events()[1][2].send_to, "AW-18424373618/TZJ8CM2l4pIdEPLCttFE");
context.gtag = () => { throw new Error("Tracking blocked"); };
assert.doesNotThrow(() => click("tel:0901371301"));
console.log("Taipei tracking checks passed: HTML head bootstrap, no duplicates, queued dynamic clicks, other-branch exclusions and failure isolation.");
