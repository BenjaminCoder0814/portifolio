import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;
const LANGS = ["pt", "en", "es"] as const;

/**
 * Generated from the real route table. The previous static sitemap.xml listed
 * a single URL — on the wrong domain — so every case-study page was invisible
 * to search. Engineering docs are excluded until their content is verified.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const localized = ["", "/curriculo"];

  const pages = LANGS.flatMap((lang) =>
    localized.map((path) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, `${BASE}/${l}${path}`])),
      },
    }))
  );

  const engineering = [
    "/engineering",
    "/engineering/erp",
    "/engineering/erp/architecture",
    "/engineering/erp/decisions",
    "/engineering/erp/roadmap",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/engineering/erp" ? 0.95 : 0.8,
  }));

  return [...pages, ...engineering];
}
