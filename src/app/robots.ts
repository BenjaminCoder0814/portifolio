import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/linkedin"] }],
    sitemap: "https://benjaminmaciel.com.br/sitemap.xml",
    host: "https://benjaminmaciel.com.br",
  };
}
