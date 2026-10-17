import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
const head = html.slice(html.indexOf("<head>"), html.indexOf("</head>"));
const tagUrl = "https://www.googletagmanager.com/gtag/js?id=AW-18424373618";
assert.equal(html.split(tagUrl).length - 1, 1, "One base tag loader");
const scripts = [...head.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
const listeners = [];
const context = {
  document: {
    addEventListener: (type, callback, capture) => listeners.push({ type, callback, capture }),
  },
};
context.window = context;
vm.createContext(context);
for (const script of scripts) vm.runInContext(script, context);
assert.equal(listeners.length, 1, "Only Google's supplied click listener is installed");
assert.equal(listeners[0].type, "click");
assert.equal(listeners[0].capture, true, "Capture phase handles popup propagation");
assert.equal(context.dataLayer.filter(args => args[0] === "config").length, 1);
const click = href => listeners[0].callback({
  target: { closest: selector => {
    assert.equal(selector, "a");
    return href === null ? null : { getAttribute: name => {
      assert.equal(name, "href");
      return href;
    }};
  }},
});
const events = () => context.dataLayer.filter(args => args[0] === "event");
click("tel:0901371301");
click("/assets/line-qr-taipei.webp");
click("https://muxuantw.com/assets/line-qr-taipei.webp");
click("tel:052222166");
click("https://lin.ee/NxoDqq0");
click("/assets/line-qr-chiayi.webp");
click(null);
assert.equal(events().length, 3, "One event per qualifying click");
assert.equal(events()[0][2].send_to, "AW-18424373618/7acVCK6P6ZIdEPLCttFE");
assert.equal(events()[1][2].send_to, "AW-18424373618/TZJ8CM2l4pIdEPLCttFE");
assert.equal(events()[2][2].send_to, "AW-18424373618/TZJ8CM2l4pIdEPLCttFE");
// The exact snippet requires a plain-digit href; displayed phone text is independent.
click("tel:09-01371301");
assert.equal(events().length, 3);
context.gtag = undefined;
assert.doesNotThrow(() => click("tel:0901371301"));
const main = fs.readFileSync(new URL("../client/src/main.tsx", import.meta.url), "utf8");
assert.ok(!main.includes("taipeiAds"), "Retired module is no longer initialized");
console.log("Google-supplied snippet checks passed: head installation, capture clicks, conversion labels, exclusions and no duplicate listener.");
