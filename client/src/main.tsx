import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeTaipeiAds } from "./lib/taipeiAds";

try {
  initializeTaipeiAds();
} catch {
  // A blocked or unavailable tracking integration must not stop the site rendering.
}

createRoot(document.getElementById("root")!).render(<App />);
