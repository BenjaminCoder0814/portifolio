import Link from "next/link";
import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export const LANGS: Lang[] = ["pt", "en", "es"];
export const pickLang = (p: string) => (LANGS.includes(p as Lang) ? (p as Lang) : "pt");

/** Canonical + hreflang for a localized route, in one call. */
export function altsFor(lang: Lang, path: string) {
  return {
    canonical: `${SITE_URL}/${lang}${path}`,
    languages: {
      ...Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      "x-default": `${SITE_URL}/pt${path}`,
    },
  };
}

const BACK: Record<Lang, string> = {
  pt: "← Portfólio",
  en: "← Portfolio",
  es: "← Portafolio",
};

export type Crumb = { label: string; href?: string };

/**
 * The breadcrumb on its own, for pages that were written before PageShell and
 * keep their own header markup. Renders the visible trail and the matching
 * BreadcrumbList — Google wants those two to agree, so they ship together.
 */
export function Breadcrumbs({ lang, crumbs }: { lang: Lang; crumbs: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: `/${lang}` }, ...crumbs];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: trail.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.label,
              ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
            })),
          }),
        }}
      />
      <nav aria-label="Breadcrumb" className="font-mono text-xs text-[#4d5866]">
        <ol className="flex flex-wrap items-center gap-2">
          {trail.map((c, i) => (
            <li key={c.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-[#00d4ff]">
                  {i === 0 ? BACK[lang] : c.label}
                </Link>
              ) : (
                <span className="text-[#8b949e]">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * Shared chrome for the long-form pages under /[lang].
 *
 * Every one of them needs the same four things — a way back, a breadcrumb the
 * crawler can read, one h1, and a lead paragraph — so they live here rather
 * than being re-typed (and drifting) on a dozen pages.
 */
export default function PageShell({
  lang,
  eyebrow,
  title,
  lead,
  crumbs = [],
  width = "820px",
  children,
  footer,
}: {
  lang: Lang;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  crumbs?: Crumb[];
  width?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const trail: Crumb[] = [{ label: "Home", href: `/${lang}` }, ...crumbs];

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 sm:px-10">
      {trail.length > 1 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: trail.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.label,
                ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
              })),
            }),
          }}
        />
      )}

      <div className="mx-auto" style={{ maxWidth: width }}>
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-[#4d5866]">
          <ol className="flex flex-wrap items-center gap-2">
            {trail.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-[#00d4ff]">
                    {i === 0 ? BACK[lang] : c.label}
                  </Link>
                ) : (
                  <span className="text-[#8b949e]">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="mb-14 mt-8 border-b border-white/[0.07] pb-10">
          {eyebrow && (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#00d4ff]">{eyebrow}</p>
          )}
          <h1 className="text-3xl font-black leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl">{title}</h1>
          {lead && <div className="mt-5 max-w-[64ch] text-lg leading-relaxed text-[#8b949e]">{lead}</div>}
        </header>

        {children}

        {footer && <footer className="mt-16 border-t border-white/[0.07] pt-8">{footer}</footer>}
      </div>
    </main>
  );
}

/* ── small building blocks shared by the content pages ───────────────────── */

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold tracking-[-0.02em] text-white first:mt-0">
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-5 leading-[1.75] text-[#c9d1d9]">{children}</p>;
}

export function Muted({ children }: { children: ReactNode }) {
  return <p className="mb-5 leading-[1.75] text-[#8b949e]">{children}</p>;
}

export function Card({
  title,
  meta,
  children,
  href,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  href?: string;
}) {
  const inner = (
    <>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-bold text-white">{title}</h3>
        {meta && <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#4d5866]">{meta}</span>}
      </div>
      <div className="leading-[1.7] text-[#8b949e]">{children}</div>
    </>
  );

  const cls =
    "block rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-200 hover:border-[rgba(0,212,255,0.25)] hover:bg-[rgba(0,212,255,0.04)]";

  return href ? (
    <Link href={href} className={`group ${cls}`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function Grid({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return (
    <div className={`grid gap-4 ${cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>{children}</div>
  );
}

export function Callout({ tone = "note", children }: { tone?: "note" | "warn" | "risk"; children: ReactNode }) {
  const c = tone === "warn" ? "#fbbf24" : tone === "risk" ? "#f87171" : "#00d4ff";
  return (
    <div
      className="mb-6 rounded-xl border-l-2 px-5 py-4 leading-[1.75] text-[#c9d1d9]"
      style={{ borderColor: c, background: `${c}0d` }}
    >
      {children}
    </div>
  );
}

export function Code({ lang, children }: { lang?: string; children: string }) {
  return (
    <figure className="mb-6 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0d1117]">
      {lang && (
        <figcaption className="border-b border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#4d5866]">
          {lang}
        </figcaption>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.7] text-[#c9d1d9]">
        <code>{children}</code>
      </pre>
    </figure>
  );
}

export function DefList({ items }: { items: { term: string; desc: ReactNode }[] }) {
  return (
    <dl className="mb-6 flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {items.map((it) => (
        <div key={it.term} className="grid gap-1 py-4 sm:grid-cols-[210px_1fr] sm:gap-6">
          <dt className="font-mono text-sm font-semibold text-[#00d4ff]">{it.term}</dt>
          <dd className="leading-[1.7] text-[#8b949e]">{it.desc}</dd>
        </div>
      ))}
    </dl>
  );
}
