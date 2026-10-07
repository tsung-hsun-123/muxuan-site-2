import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../client/src/lib/taipeiAds.ts", import.meta.url), "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const scripts = [];
const listeners = [];
class Element {
  constructor(href) { this.href = href; }
  closest() { return this.href === null ? null : this; }
  getAttribute() { return this.href; }
}
const window = { location: { origin: "https://muxuantw.com" } };
const context = vm.createContext({
  exports: {}, window, URL, Element,
  document: {
    querySelector: () => scripts[0],
    createElement: () => ({}),
    head: { appendChild: script => scripts.push(script) },
    addEventListener: (type, listener, capture) => listeners.push({ type, listener, capture }),
  },
});
vm.runInContext(code, context);
const { getTaipeiConversion, initializeTaipeiAds } = context.exports;
for (const href of ["tel:0901371301", "tel:0901-371-301", "tel:+886-901-371-301"]) {
  assert.equal(getTaipeiConversion(href, window.location.origin)?.contact_action, "phone_click");
}
for (const href of ["/assets/line-qr-taipei.webp", "https://muxuantw.com/assets/line-qr-taipei.webp"]) {
  assert.equal(getTaipeiConversion(href, window.location.origin)?.contact_action, "qr_image_click");
}
for (const href of ["tel:05-2222166", "tel:05-3628586", "tel:+65 6538 9589", "tel:02-23967893", "tel:09013713010", "https://lin.ee/NxoDqq0", "/assets/line-qr-chiayi.webp", "https://example.com/assets/line-qr-taipei.webp", "https://muxuantw.com.evil.test/assets/line-qr-taipei.webp", "/contact", "javascript:alert(1)"]) {
  assert.equal(getTaipeiConversion(href, window.location.origin), null, href);
}
initializeTaipeiAds();
initializeTaipeiAds();
assert.equal(scripts.length, 1);
assert.equal(listeners.length, 1);
assert.equal(listeners[0].capture, true);
assert.equal(scripts[0].async, true);
assert.match(scripts[0].src, /AW-18424373618$/);
const click = href => listeners[0].listener({ target: new Element(href) });
const events = () => window.dataLayer.filter(args => args[0] === "event");
// Elements created after initialization emulate navigation and opening/reopening the popup.
click("tel:0901371301");
click("/assets/line-qr-taipei.webp");
click("/assets/line-qr-taipei.webp");
click("tel:05-2222166");
click("https://lin.ee/NxoDqq0");
click(null);
assert.equal(events().length, 3);
assert.equal(events()[0][2].send_to, "AW-18424373618/7acVCK6P6ZIdEPLCttFE");
assert.equal(events()[1][2].send_to, "AW-18424373618/TZJ8CM2l4pIdEPLCttFE");
window.gtag = () => { throw new Error("Tracking blocked"); };
assert.doesNotThrow(() => click("tel:0901371301"));
console.log("Taipei Ads tests passed: exact targets, other-branch exclusions, dynamic clicks, idempotent setup and failure isolation.");
