import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeTaipeiConversionTracking } from "./lib/taipeiAds";

try {
  initializeTaipeiConversionTracking();
} catch (error) {
  // A blocked or unavailable tracking integration must not stop the site rendering.
  console.warn("Taipei contact tracking could not be initialized.", error);
}

createRoot(document.getElementById("root")!).render(<App />);
