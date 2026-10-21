import type { CapacitorConfig } from "@capacitor/cli";

// Prototype remote shell: only the academy origin is kept inside the WebView.
// Never allow payment-provider or wildcard origins to access a native bridge.
const origin = new URL(process.env.CEA_ANDROID_ORIGIN || "https://www.cea.ng");
if (
  origin.protocol !== "https:" ||
  origin.username ||
  origin.password ||
  origin.pathname !== "/" ||
  origin.search ||
  origin.hash ||
  (origin.port && origin.port !== "443")
) {
  throw new Error("CEA_ANDROID_ORIGIN must be an HTTPS origin without credentials, query or path");
}
const config: CapacitorConfig = {
  appId: "ng.cea.app",
  appName: "Cyber Elias Academy",
  webDir: "www",
  server: {
    url: origin.origin,
    cleartext: false,
    errorPath: "offline.html",
  },
  android: { allowMixedContent: false, adjustMarginsForEdgeToEdge: "disable" },
};
export default config;
