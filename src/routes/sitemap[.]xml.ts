import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { ARTICLES } from "@/data/articles";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/scholarships",
          "/universities",
          "/courses",
          "/blog",
          "/study-abroad",
          "/career-guidance",
          "/online-learning",
          "/student-resources",
          "/about",
          "/services",
          "/contact",
          "/faq",
          "/privacy",
          "/disclaimer",
        ];
        const all = [
          ...staticPaths.map((p) => ({
            path: p,
            changefreq: "weekly",
            priority: p === "/" ? "1.0" : "0.8",
          })),
          ...ARTICLES.map((a) => ({
            path: `/blog/${a.slug}`,
            lastmod: a.date,
            changefreq: "monthly",
            priority: "0.7",
          })),
        ];

        const urls = all.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            (e as { lastmod?: string }).lastmod
              ? `    <lastmod>${(e as { lastmod?: string }).lastmod}</lastmod>`
              : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
