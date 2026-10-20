import type { CapacitorConfig } from "@capacitor/cli";

// Prototype remote shell: only the academy origin is kept inside the WebView.
// Never allow payment-provider or wildcard origins to access a native bridge.
const config: CapacitorConfig = {
  appId: "ng.cea.app",
  appName: "Cyber Elias Academy",
  webDir: "www",
  server: {
    url: "https://www.cea.ng",
    cleartext: false,
    errorPath: "offline.html",
  },
  android: { allowMixedContent: false },
};
export default config;
