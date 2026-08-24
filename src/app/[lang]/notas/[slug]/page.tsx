import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notes, noteBySlug, type Block } from "@/content/notas";
import type { Lang } from "@/lib/i18n";
import { SITE_URL, siteUrl } from "@/lib/site";
import { personal } from "@/data";

const LANGS: Lang[] = ["pt", "en", "es"];
const pick = (p: string) => (LANGS.includes(p as Lang) ? (p as Lang) : "pt");

const COPY = {
  pt: { back: "← Todas as notas", read: "min de leitura", source: "Código-fonte", all: "Notas técnicas" },
  en: { back: "← All notes", read: "min read", source: "Source", all: "Engineering notes" },
  es: { back: "← Todas las notas", read: "min de lectura", source: "Código fuente", all: "Notas técnicas" },
} as const;

export const dynamicParams = false;

export async function generateStaticParams() {
  return LANGS.flatMap((lang) => notes.map((n) => ({ lang, slug: n.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = pick(params.lang);
  const note = noteBySlug(params.slug);
  if (!note) return {};

  return {
    title: note.title[lang],
    description: note.dek[lang],
    alternates: {
      canonical: `${SITE_URL}/${lang}/notas/${note.slug}`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}/${l}/notas/${note.slug}`])),
    },
    openGraph: {
      type: "article",
      title: note.title[lang],
      description: note.dek[lang],
      url: `${SITE_URL}/${lang}/notas/${note.slug}`,
      publishedTime: note.date,
      authors: [personal.name],
    },
  };
}

/* ── block renderer ───────────────────────────────────────────────────────── */

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2 key={i} className="mt-12 mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
                {b.c}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="mb-5 leading-[1.75] text-[#c9d1d9]">
                {b.c}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="mb-5 flex list-disc flex-col gap-2 pl-5 text-[#c9d1d9]">
                {b.c.map((li) => (
                  <li key={li} className="leading-[1.7]">{li}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <figure key={i} className="mb-6 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0d1117]">
                {b.lang && (
                  <figcaption className="border-b border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#4d5866]">
                    {b.lang}
                  </figcaption>
                )}
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.7] text-[#c9d1d9]">
                  <code>{b.c}</code>
                </pre>
              </figure>
            );
          case "note":
            return (
              <aside
                key={i}
                className="mb-6 rounded-xl border-l-2 border-[#fbbf24] bg-[rgba(251,191,36,0.05)] px-5 py-4 leading-[1.7] text-[#c9d1d9]"
              >
                {b.c}
              </aside>
            );
        }
      })}
    </>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────── */

export default function NotePage({ params }: { params: { lang: string; slug: string } }) {
  const lang = pick(params.lang);
  const note = noteBySlug(params.slug);
  if (!note) notFound();

  const c = COPY[lang];

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 sm:px-10">
      {/* Article structured data: lets a search result or an AI summary attribute
          the piece correctly instead of guessing from the page title. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: note.title[lang],
            description: note.dek[lang],
            datePublished: note.date,
            inLanguage: lang,
            author: { "@type": "Person", name: personal.name, url: SITE_URL },
            publisher: { "@type": "Person", name: personal.name },
            image: siteUrl("/og-image.png"),
            mainEntityOfPage: `${SITE_URL}/${lang}/notas/${note.slug}`,
            keywords: note.tags.join(", "),
          }),
        }}
      />

      <article className="mx-auto max-w-[720px]">
        <Link
          href={`/${lang}/notas`}
          className="font-mono text-xs text-[#4d5866] transition-colors hover:text-[#00d4ff]"
        >
          {c.back}
        </Link>

        <header className="mb-10 mt-8 border-b border-white/[0.07] pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#4d5866]">
            <time dateTime={note.date}>{note.date}</time>
            <span aria-hidden="true">·</span>
            <span>{note.minutes} {c.read}</span>
          </div>

          <h1 className="text-3xl font-black leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl">
            {note.title[lang]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#8b949e]">{note.dek[lang]}</p>

          {note.source && (
            <p className="mt-6 font-mono text-xs text-[#4d5866]">
              {c.source}:{" "}
              <a
                href={note.source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00d4ff] hover:underline"
              >
                {note.source.label}
              </a>
            </p>
          )}
        </header>

        <div className="text-[17px]">
          <Blocks blocks={note.body[lang]} />
        </div>

        <footer className="mt-16 border-t border-white/[0.07] pt-8">
          <Link
            href={`/${lang}/notas`}
            className="font-mono text-sm text-[#00d4ff] transition-opacity hover:opacity-80"
          >
            {c.all} →
          </Link>
        </footer>
      </article>
    </main>
  );
}
