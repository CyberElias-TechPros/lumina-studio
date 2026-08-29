import { getConsent } from "@/lib/ga4";

const ADSense_CLIENT = "";

export function loadAdSense() {
  if (typeof window === "undefined" || !ADSense_CLIENT) return;
  if (getConsent() !== "granted") return;
  if (document.querySelector(`script[data-adsense="${ADSense_CLIENT}"]`)) return;

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("data-adsense", ADSense_CLIENT);
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSense_CLIENT}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

export function initAdSense() {
  try {
    loadAdSense();
  } catch {
    console.debug("[adsense] load failed");
  }
}
