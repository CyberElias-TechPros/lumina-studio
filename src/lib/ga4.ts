export function initGA4(measurementId: string) {
  if (typeof window === "undefined" || !measurementId) return;

  const consent = localStorage.getItem("cea:consent");
  if (consent === "denied") return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
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
  localStorage.setItem("cea:consent", "granted");
  const id = import.meta.env.VITE_GA4_ID;
  if (id) initGA4(id);
}

export function denyConsent() {
  localStorage.setItem("cea:consent", "denied");
}

export function getConsent() {
  return localStorage.getItem("cea:consent");
}
