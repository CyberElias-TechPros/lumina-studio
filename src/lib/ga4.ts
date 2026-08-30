const CONSENT_KEY = "cea:consent";
const SCRIPT_ATTRIBUTE = "data-cea-ga4";

export function initGA4(measurementId: string) {
  if (typeof window === "undefined" || !measurementId) return;

  // Analytics is optional. Do not load a third-party script before the visitor
  // has explicitly opted in from the consent banner.
  if (localStorage.getItem(CONSENT_KEY) !== "granted") return;
  if (document.querySelector(`script[${SCRIPT_ATTRIBUTE}="${measurementId}"]`)) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.async = true;
  script.setAttribute(SCRIPT_ATTRIBUTE, measurementId);
  document.head.appendChild(script);

  const config = () => {
    (window as unknown as Record<string, unknown>).dataLayer =
      (window as unknown as Record<string, unknown>).dataLayer || [];
    function gtag(...args: unknown[]) {
      ((window as unknown as Record<string, unknown>).dataLayer as unknown[]).push(args);
    }
    (window as unknown as Record<string, unknown>).gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });
  };

  script.addEventListener("load", config);
}

export function grantConsent() {
  localStorage.setItem(CONSENT_KEY, "granted");
  const id = import.meta.env.VITE_GA4_ID;
  if (id) initGA4(id);
}

export function denyConsent() {
  localStorage.setItem(CONSENT_KEY, "denied");
}

export function getConsent() {
  return localStorage.getItem(CONSENT_KEY);
}
