import Link from "next/link";
import { Breadcrumbs } from "@/components/site/PageShell";
import type { Metadata } from "next";
import { notes } from "@/content/notas";
import type { Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const CRUMB = { pt: "Notas técnicas", en: "Engineering notes", es: "Notas técnicas" } as const;

const LANGS: Lang[] = ["pt", "en", "es"];
const pick = (p: string) => (LANGS.includes(p as Lang) ? (p as Lang) : "pt");

const COPY = {
  pt: {
    eyebrow: "Notas técnicas",
    title: "O que eu aprendi construindo",
    lead: "Notas curtas sobre decisões que eu tomei em sistemas que estão em produção. Cada uma aponta para o repositório onde o código está — se não dá para mostrar, não está escrito aqui.",
    back: "← Portfólio",
    read: "min de leitura",
    metaTitle: "Notas técnicas",
    metaDesc: "Notas sobre decisões de engenharia em sistemas em produção: modelagem de domínio, trade-offs de banco, e o custo real de rodar em plano gratuito.",
  },
  en: {
    eyebrow: "Engineering notes",
    title: "What I learned building",
    lead: "Short notes on decisions I made in systems that are in production. Each one points at the repository where the code lives — if it cannot be shown, it is not written here.",
    back: "← Portfolio",
    read: "min read",
    metaTitle: "Engineering notes",
    metaDesc: "Notes on engineering decisions in production systems: domain modelling, database trade-offs, and what running on a free tier actually costs.",
  },
  es: {
    eyebrow: "Notas técnicas",
    title: "Lo que aprendí construyendo",
    lead: "Notas breves sobre decisiones que tomé en sistemas en producción. Cada una apunta al repositorio donde está el código — si no se puede mostrar, no está escrito aquí.",
    back: "← Portafolio",
    read: "min de lectura",
    metaTitle: "Notas técnicas",
    metaDesc: "Notas sobre decisiones de ingeniería en sistemas en producción: modelado de dominio, trade-offs de base de datos y el costo real de correr en plan gratuito.",
  },
} as const;

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = pick(params.lang);
  const c = COPY[lang];
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: {
      canonical: `${SITE_URL}/${lang}/notas`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}/${l}/notas`])),
    },
    openGraph: { title: c.metaTitle, description: c.metaDesc, url: `${SITE_URL}/${lang}/notas` },
  };
}

export default function NotesIndex({ params }: { params: { lang: string } }) {
  const lang = pick(params.lang);
  const c = COPY[lang];
  const ordered = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-[820px]">
        <Breadcrumbs lang={lang} crumbs={[{ label: CRUMB[lang] }]} />

        <header className="mb-14 mt-8 border-b border-white/[0.07] pb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#00d4ff]">{c.eyebrow}</p>
          <h1 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl">{c.title}</h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-[#8b949e]">{c.lead}</p>
        </header>

        <ul className="flex flex-col gap-4">
          {ordered.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/${lang}/notas/${n.slug}`}
                className="group block rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-200 hover:border-[rgba(0,212,255,0.25)] hover:bg-[rgba(0,212,255,0.04)]"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#4d5866]">
                  <time dateTime={n.date}>{n.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{n.minutes} {c.read}</span>
                </div>
                <h2 className="text-xl font-bold text-white transition-colors group-hover:text-[#00d4ff]">
                  {n.title[lang]}
                </h2>
                <p className="mt-2 leading-relaxed text-[#8b949e]">{n.dek[lang]}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {n.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/[0.06] bg-white/[0.04] px-2 py-[3px] font-mono text-[11px] text-[#8b949e]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
