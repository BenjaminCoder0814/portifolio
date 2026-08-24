import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, caseBySlug } from "@/content/projects";
import Blocks from "@/components/site/Blocks";
import PageShell, { LANGS, pickLang, altsFor } from "@/components/site/PageShell";
import { SITE_URL, siteUrl } from "@/lib/site";
import { personal } from "@/data";

const COPY = {
  pt: { crumb: "Projetos", repo: "Ver código", demo: "Ver demo", deep: "Documentação técnica", all: "Todos os projetos", stack: "Stack" },
  en: { crumb: "Projects", repo: "View code", demo: "View demo", deep: "Technical documentation", all: "All projects", stack: "Stack" },
  es: { crumb: "Proyectos", repo: "Ver código", demo: "Ver demo", deep: "Documentación técnica", all: "Todos los proyectos", stack: "Stack" },
} as const;

const TONE: Record<string, string> = { cyan: "#00d4ff", green: "#00ff88", purple: "#a78bfa", amber: "#fbbf24" };

export const dynamicParams = false;

export async function generateStaticParams() {
  return LANGS.flatMap((lang) => caseStudies.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = pickLang(params.lang);
  const p = caseBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.title[lang],
    description: p.dek[lang],
    alternates: altsFor(lang, `/projetos/${p.slug}`),
    openGraph: { type: "article", title: p.title[lang], description: p.dek[lang] },
  };
}

export default function CaseStudyPage({ params }: { params: { lang: string; slug: string } }) {
  const lang = pickLang(params.lang);
  const p = caseBySlug(params.slug);
  if (!p) notFound();

  const c = COPY[lang];
  const tone = TONE[p.tone];

  return (
    <>
      {/* SoftwareApplication for the products, so a search result or an AI
          summary can tell that these are systems rather than blog posts. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: p.title[lang],
            description: p.dek[lang],
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            inLanguage: lang,
            author: { "@type": "Person", name: personal.name, url: SITE_URL },
            image: siteUrl("/og-image.png"),
            url: `${SITE_URL}/${lang}/projetos/${p.slug}`,
            ...(p.repo ? { codeRepository: p.repo } : {}),
          }),
        }}
      />

      <PageShell
        lang={lang}
        eyebrow={`${c.crumb} · ${p.year}`}
        title={p.title[lang]}
        lead={p.dek[lang]}
        crumbs={[{ label: c.crumb, href: `/${lang}/projetos` }, { label: p.title[lang] }]}
        width="780px"
        footer={
          <Link href={`/${lang}/projetos`} className="font-mono text-sm text-[#00d4ff] hover:underline">
            ← {c.all}
          </Link>
        }
      >
        <div className="mb-10 flex flex-wrap gap-8 border-b border-white/[0.07] pb-8">
          {p.metrics.map((m) => (
            <div key={m.v}>
              <div className="font-mono text-2xl font-bold" style={{ color: tone }}>
                {m.v}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#4d5866]">{m.l[lang]}</div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4d5866]">{c.stack}</p>
          <div className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded border border-white/[0.06] bg-white/[0.04] px-2 py-[3px] font-mono text-[11px] text-[#8b949e]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {(p.repo || p.demo || p.deepDive) && (
          <div className="mb-12 flex flex-wrap gap-3">
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.demo} — ${p.title[lang]}`}
                className="rounded-lg bg-[#00d4ff] px-5 py-2.5 font-mono text-xs font-bold text-[#0a0a0a] transition-all hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(0,212,255,0.3)]"
              >
                {c.demo}
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.repo} — ${p.title[lang]}`}
                className="rounded-lg border border-white/[0.14] px-5 py-2.5 font-mono text-xs text-[#c9d1d9] transition-all hover:border-[rgba(0,212,255,0.4)] hover:text-white"
              >
                {c.repo}
              </a>
            )}
            {p.deepDive && (
              <Link
                href={p.deepDive}
                className="rounded-lg border border-white/[0.14] px-5 py-2.5 font-mono text-xs text-[#c9d1d9] transition-all hover:border-[rgba(0,212,255,0.4)] hover:text-white"
              >
                {c.deep} →
              </Link>
            )}
          </div>
        )}

        <article className="text-[17px]">
          <Blocks blocks={p.body[lang]} />
        </article>
      </PageShell>
    </>
  );
}
