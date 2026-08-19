/**
 * Single source of truth for the site's public origin.
 *
 * Every absolute URL the site emits — canonical tags, og:url, og:image,
 * sitemap entries, robots host, JSON-LD — has to agree with the domain the
 * page is actually served from. When they disagree, link previews silently
 * fail: LinkedIn and WhatsApp fetch og:image from the declared origin, and a
 * 404 there means no card at all.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL   — set this once a custom domain is live.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the stable production domain Vercel
 *      injects at build time (preview deploys still resolve to production,
 *      which is what canonical tags should point at).
 *   3. localhost — local builds only.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Absolute URL for a site-relative path. */
export const siteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
