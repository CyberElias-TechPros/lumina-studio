const SITE_NAME = "Cyber Elias Academy";
const SITE_URL = "https://cea.ng";
const SITE_PHONE = "+234 905 862 8386";
const SITE_EMAIL = "hello@cea.ng";
const SITE_LOGO = "/icon.svg";
// Keep these in sync with the footer social links (src/components/marketing/
// site-footer.tsx). Entity profiles must match across structured data and the
// visible page or the knowledge-graph disambiguation weakens.
const TWITTER_HANDLE = "@cybeliasacademy";

export interface SeoInput {
  title: string;
  description: string;
  path?: string;
  type?: string;
  image?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

function unique(input: string, fallback: string): string {
  const v = input?.trim();
  return v &&
    v !== "Article at Cyber Elias Academy." &&
    v !== "Program detail at Cyber Elias Academy."
    ? v
    : fallback;
}

export function buildSeo(input: SeoInput) {
  const title = input.title.includes(SITE_NAME) ? input.title : `${input.title} — ${SITE_NAME}`;
  const description = unique(
    input.description,
    "Nigeria's digital skills academy. Train from scratch to advanced, build a portfolio, and get hired.",
  );
  const url = input.path ? `${SITE_URL}${input.path}` : SITE_URL;
  const image = input.image ?? `${SITE_URL}/og-default.png`;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { name: "author", content: SITE_NAME },
    {
      name: "robots",
      content: input.noIndex
        ? "noindex,nofollow"
        : "index,follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { name: "googlebot", content: input.noIndex ? "noindex" : "index,follow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: input.type ?? "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: title },
    { property: "og:locale", content: "en_NG" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: TWITTER_HANDLE },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "geo.region", content: "NG-RI" },
    { name: "geo.placename", content: "Port Harcourt" },
    { name: "ICBM", content: "4.8156,7.0498" },
  ];

  const links: Array<Record<string, string>> = [{ rel: "canonical", href: url }];

  const structuredData = Array.isArray(input.structuredData)
    ? input.structuredData
    : input.structuredData
      ? [input.structuredData]
      : [];

  return { meta, links, structuredData, title, description, url };
}
export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  alternateName: "CEA",
  url: SITE_URL,
  logo: SITE_LOGO,
  description:
    "Nigeria's digital skills academy and technology studio. Train from scratch to advanced in software development, cloud, AI, design and digital marketing.",
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "26 Ebony Road, Off Rumuola Road",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
  sameAs: [
    "https://www.linkedin.com/company/cyber-elias-academy",
    "https://www.facebook.com/cybereliasacademy/",
    "https://x.com/cybeliasacademy",
    "https://www.instagram.com/cyberelias.tk/",
    "https://www.youtube.com/@CyberEliasAcademy",
  ],
};

export const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  image: SITE_LOGO,
  url: SITE_URL,
  telephone: SITE_PHONE,
  email: SITE_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "26 Ebony Road, Off Rumuola Road",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 4.8156,
    longitude: 7.0498,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "20:00",
  },
  priceRange: "₦₦",
};

// NOTE: deliberately no SearchAction potentialAction — the site has no
// server-rendered /search route; search lives inside /library, /glossary and
// /programs. Advertising a sitelinks search box that 404s is invalid markup
// noise, so the WebSite node stays minimal and truthful.
export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};
export function getPageHead(input: SeoInput) {
  const { meta, links } = buildSeo(input);
  const ld = Array.isArray(input.structuredData)
    ? input.structuredData
    : input.structuredData
      ? [input.structuredData]
      : [];
  const scripts =
    ld.length > 0
      ? [
          {
            type: "application/ld+json" as const,
            json: ld.length === 1 ? JSON.stringify(ld[0]) : JSON.stringify(ld),
          },
        ]
      : [];
  return { meta, links, scripts };
}
