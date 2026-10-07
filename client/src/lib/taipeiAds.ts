/** Franchise click conversions only; these are not completed calls or enquiries. */
const ADS_ID = "AW-18424373618";
const PHONE_CONVERSION = `${ADS_ID}/7acVCK6P6ZIdEPLCttFE`;
const QR_CONVERSION = `${ADS_ID}/TZJ8CM2l4pIdEPLCttFE`;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    muxuanTaipeiConversionTrackingInitialized?: boolean;
  }
}

export function getTaipeiConversion(href: string, origin: string) {
  if (/^tel:/i.test(href)) {
    const number = href.slice(4).replace(/[\s().-]/g, "");
    // Both 華山 and 林森 currently use this number. Do not match other branches.
    if (["0901371301", "+886901371301"].includes(number)) {
      return { send_to: PHONE_CONVERSION, contact_action: "phone_click" };
    }
    return null;
  }
  try {
    const url = new URL(href, origin);
    if (url.origin === origin && url.pathname === "/assets/line-qr-taipei.webp") {
      return { send_to: QR_CONVERSION, contact_action: "qr_image_click" };
    }
  } catch {
    // Invalid links are never conversion targets.
  }
  return null;
}

export function initializeTaipeiConversionTracking() {
  if (window.muxuanTaipeiConversionTrackingInitialized) return;

  // The Google tag and command queue are initialized once in client/index.html.
  // Delegation covers React navigation and dynamically mounted LINE popups.
  // Capture is needed because the popup stops click propagation in its bubble phase.
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest("a[href]");
    if (!anchor) return;
    const conversion = getTaipeiConversion(anchor.getAttribute("href")!, window.location.origin);
    if (!conversion) return;
    try {
      window.gtag?.("event", "conversion", {
        ...conversion,
        branch_group: "taipei_huashan_linsen",
        transport_type: "beacon",
      });
    } catch {
      // Tracking failures must never prevent calling or opening the QR image.
    }
  }, true);
  window.muxuanTaipeiConversionTrackingInitialized = true;
}
