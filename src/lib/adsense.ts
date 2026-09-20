/** Same publisher id as ads.txt and the google-adsense-account meta tag. */
export const ADSENSE_CLIENT = "ca-pub-9117572925263537";

export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

/** Legal, apply and signed-in surfaces must not load the ads tag. */
const NO_ADS = /^\/(privacy|terms|accessibility|apply|auth|app|portal)(\/|$)/;

export function adsAllowedOnPath(pathname: string): boolean {
  return !NO_ADS.test(pathname);
}

export function loadAdSense() {
  if (typeof window === "undefined" || !ADSENSE_CLIENT) return;
  if (!adsAllowedOnPath(window.location.pathname)) return;
  if (document.querySelector(`script[data-adsense="${ADSENSE_CLIENT}"]`)) return;
  if (document.querySelector(`script[src*="adsbygoogle.js"][src*="${ADSENSE_CLIENT}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("data-adsense", ADSENSE_CLIENT);
  script.src = ADSENSE_SCRIPT_SRC;
  document.head.appendChild(script);
}

export function initAdSense() {
  try {
    loadAdSense();
  } catch {
    console.debug("[adsense] load failed");
  }
}
