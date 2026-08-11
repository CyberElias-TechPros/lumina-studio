import { createFileRoute } from "@tanstack/react-router";
import { programs, blogPosts } from "@/data/site";

const SITE_URL = "https://cea.ng";

interface StaticRoute {
  path: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  image?: string;
}

const staticRoutes: StaticRoute[] = [
  { path: "", priority: "1.0", changefreq: "daily", lastmod: "2025-08-10" },
  { path: "/about", priority: "0.8", changefreq: "weekly", lastmod: "2025-08-01" },
  { path: "/admissions", priority: "0.9", changefreq: "weekly", lastmod: "2025-08-05" },
  { path: "/alumni", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-20" },
  { path: "/apply", priority: "0.9", changefreq: "weekly", lastmod: "2025-08-08" },
  { path: "/blog", priority: "0.8", changefreq: "weekly", lastmod: "2025-08-07" },
  { path: "/careers", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-15" },
  { path: "/community", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-22" },
  { path: "/contact", priority: "0.8", changefreq: "monthly", lastmod: "2025-08-01" },
  { path: "/engines", priority: "0.8", changefreq: "weekly", lastmod: "2025-08-03" },
  { path: "/events", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-18" },
  { path: "/faq", priority: "0.8", changefreq: "monthly", lastmod: "2025-08-02" },
  { path: "/library", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-25" },
  { path: "/marketplace", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-19" },
  { path: "/pricing", priority: "0.8", changefreq: "weekly", lastmod: "2025-08-04" },
  { path: "/programs", priority: "0.9", changefreq: "weekly", lastmod: "2025-08-06" },
  { path: "/programs/compare", priority: "0.8", changefreq: "monthly", lastmod: "2025-07-28" },
  { path: "/scholarships", priority: "0.8", changefreq: "monthly", lastmod: "2025-07-30" },
  { path: "/services", priority: "0.8", changefreq: "weekly", lastmod: "2025-08-02" },
  { path: "/stories", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-21" },
  { path: "/virtual-tour", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-17" },
  { path: "/visit", priority: "0.8", changefreq: "monthly", lastmod: "2025-07-29" },
  { path: "/visit/info", priority: "0.7", changefreq: "monthly", lastmod: "2025-07-24" },
  { path: "/visit/feedback", priority: "0.6", changefreq: "monthly", lastmod: "2025-07-12" },
  { path: "/visit/brochure", priority: "0.6", changefreq: "monthly", lastmod: "2025-07-10" },
];

const programRoutes: SitemapUrl[] = programs.map((p) => ({
  url: `${SITE_URL}/programs/${p.slug}`,
  lastmod: "2025-08-05",
  changefreq: "weekly",
  priority: "0.8",
  image: "/og-programs.svg",
}));

const blogRoutes: SitemapUrl[] = blogPosts.map((p) => ({
  url: `${SITE_URL}/blog/${p.slug}`,
  lastmod: "2025-07-28",
  changefreq: "monthly",
  priority: "0.7",
  image: "/og-card.svg",
}));

export const Route = createFileRoute("/sitemap/xml")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex" }],
  }),
  loader: async () => {
    const allRoutes: SitemapUrl[] = [
      ...staticRoutes.map((r) => ({
        url: `${SITE_URL}${r.path}`,
        lastmod: r.lastmod,
        changefreq: r.changefreq,
        priority: r.priority,
      })),
      ...programRoutes,
      ...blogRoutes,
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allRoutes
  .map(
    (u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    ${u.image ? `<image:image><image:loc>${SITE_URL}${u.image}</image:loc></image:image>` : ""}
  </url>`,
  )
  .join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  },
});
