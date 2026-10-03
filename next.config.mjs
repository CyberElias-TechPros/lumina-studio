import vercel from "./vercel.json" with { type: "json" };

const privateRobotsHeader = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  // The existing repo-wide lint rules include legacy formatting warnings in
  // generated curriculum data. Keep lint available as a separate command.
  eslint: { ignoreDuringBuilds: true },
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
      { source: "/apply/status", headers: privateRobotsHeader },
      { source: "/apply/status/:path*", headers: privateRobotsHeader },
      { source: "/partners/apply", headers: privateRobotsHeader },
    ];
  },
};

export default nextConfig;
