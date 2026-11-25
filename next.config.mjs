import vercel from "./vercel.json" with { type: "json" };

const privateRobotsHeader = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  { key: "Referrer-Policy", value: "no-referrer" },
];

/**
 * Baseline response headers applied to every route.
 *
 * These were absent entirely: the app set `X-Robots-Tag` on private routes and
 * nothing else, so the public site could be framed by any origin and served
 * content without a MIME-sniffing guard. `Content-Security-Policy` is
 * deliberately not included here — the app loads third-party consent-gated
 * scripts and inline JSON-LD, so a CSP needs its own allowlist and its own
 * test rather than a guess in a config file.
 */
const baselineSecurityHeaders = [
  // Stops the site being framed. The app has no legitimate embedder, so
  // DENY rather than SAMEORIGIN — nothing on cea.ng iframes cea.ng.
  { key: "X-Frame-Options", value: "DENY" },
  // Stops a browser guessing that a text response is executable.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // HTTPS for two years, subdomains included, preload-eligible. Safe to send
  // over HTTP too: browsers ignore it there.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Send the origin to same-site destinations and nothing to third parties.
  // Private routes override this with `no-referrer`.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The app uses none of these; denying them removes a class of abuse.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Legacy XSS auditor off on purpose: it introduced vulnerabilities of its own
  // and modern browsers no longer implement it.
  { key: "X-XSS-Protection", value: "0" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  // The existing repo-wide lint rules include legacy formatting warnings in
  // generated curriculum data. Keep lint available as a separate command.
  eslint: { ignoreDuringBuilds: true },
  // The /ai-engineering/[phase]/[lesson] route reads the pre-rendered lesson
  // bundles from disk at request time (they are too heavy to compile in).
  outputFileTracingIncludes: {
    "/ai-engineering/[phase]/[lesson]": ["./src/content/ai-lessons-rendered/**"],
  },
  allowedDevOrigins: ["localhost", "127.0.0.1", "*.e2b.app"],
  async redirects() {
    return [
      ...vercel.redirects,
      { source: "/app/partner", destination: "/app/partner/hub", permanent: false },
      { source: "/app/employer", destination: "/app/employer/hub", permanent: false },
      {
        source: "/app/conversion-copy",
        destination: "/app/conversion-copy/analytics",
        permanent: false,
      },
      { source: "/app/alumni", destination: "/app/alumni/hub", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        // Every route first; the specific rules below add to these rather than
        // replacing them, so a route can be private *and* carry baseline headers.
        source: "/:path*",
        headers: baselineSecurityHeaders,
      },
      {
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }],
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Content-Type", value: "application/manifest+json; charset=utf-8" }],
      },
      { source: "/app", headers: privateRobotsHeader },
      { source: "/app/:path*", headers: privateRobotsHeader },
      { source: "/auth", headers: privateRobotsHeader },
      { source: "/auth/:path*", headers: privateRobotsHeader },
      { source: "/portal", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      { source: "/portal/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      { source: "/apply", headers: privateRobotsHeader },
      { source: "/apply/:path*", headers: privateRobotsHeader },
      { source: "/apply/status", headers: privateRobotsHeader },
      { source: "/apply/status/:path*", headers: privateRobotsHeader },
      { source: "/partners/apply", headers: privateRobotsHeader },
    ];
  },
};

export default nextConfig;
