import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/content/projects";
import PageShell, { LANGS, pickLang, altsFor } from "@/components/site/PageShell";

const COPY = {
  pt: {
    eyebrow: "Projetos",
    title: "Quatro coisas que eu construí, e o que cada uma me ensinou",
    lead: "Cada projeto tem uma página com contexto, restrições, arquitetura, código real e o que eu faria diferente. Onde falta um número, há um marcador — não um chute.",
    crumb: "Projetos",
    read: "Ler o case study",
    stackLabel: "Stack",
    metaTitle: "Projetos e case studies",
    metaDesc: "Case studies de Benjamin Maciel: um ERP em produção, um TCC full stack, um rebranding com entrada em marketplaces e este próprio portfólio.",
  },
  en: {
    eyebrow: "Projects",
    title: "Four things I built, and what each one taught me",
    lead: "Each project has a page with context, constraints, architecture, real code and what I would do differently. Where a number is missing there is a marker — not a guess.",
    crumb: "Projects",
    read: "Read the case study",
    stackLabel: "Stack",
    metaTitle: "Projects and case studies",
    metaDesc: "Case studies by Benjamin Maciel: an ERP in production, a full-stack graduation project, a rebranding with marketplace launch, and this portfolio itself.",
  },
  es: {
    eyebrow: "Proyectos",
    title: "Cuatro cosas que construí, y lo que cada una me enseñó",
    lead: "Cada proyecto tiene una página con contexto, restricciones, arquitectura, código real y qué haría diferente. Donde falta un número hay un marcador, no una suposición.",
    crumb: "Proyectos",
    read: "Leer el case study",
    stackLabel: "Stack",
    metaTitle: "Proyectos y case studies",
    metaDesc: "Case studies de Benjamin Maciel: un ERP en producción, un proyecto de graduación full stack, un rebranding con entrada en marketplaces y este portafolio.",
  },
} as const;

const TONE: Record<string, string> = {
  cyan: "#00d4ff",
  green: "#00ff88",
  purple: "#a78bfa",
  amber: "#fbbf24",
};

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = pickLang(params.lang);
  const c = COPY[lang];
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: altsFor(lang, "/projetos"),
    openGraph: { title: c.metaTitle, description: c.metaDesc },
  };
}

export default function ProjectsIndex({ params }: { params: { lang: string } }) {
  const lang = pickLang(params.lang);
  const c = COPY[lang];

  return (
    <PageShell
      lang={lang}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
      crumbs={[{ label: c.crumb }]}
      width="920px"
    >
      <ul className="flex flex-col gap-6">
        {caseStudies.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/${lang}/projetos/${p.slug}`}
              className="group block rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-200 hover:border-[rgba(0,212,255,0.25)] hover:bg-[rgba(0,212,255,0.03)]"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em]">
                <span className="text-[#4d5866]">{p.year}</span>
                <span
                  className="rounded border px-2 py-[2px]"
                  style={{
                    color: TONE[p.tone],
                    borderColor: `${TONE[p.tone]}55`,
                    background: `${TONE[p.tone]}12`,
                  }}
                >
                  {p.status[lang]}
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-[#00d4ff]">
                {p.title[lang]}
              </h2>
              <p className="mt-3 max-w-[68ch] leading-relaxed text-[#8b949e]">{p.dek[lang]}</p>

              <div className="mt-6 flex flex-wrap gap-8">
                {p.metrics.map((m) => (
                  <div key={m.v}>
                    <div className="font-mono text-lg font-bold" style={{ color: TONE[p.tone] }}>
                      {m.v}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#4d5866]">
                      {m.l[lang]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-white/[0.06] bg-white/[0.04] px-2 py-[3px] font-mono text-[11px] text-[#8b949e]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="mt-6 font-mono text-xs text-[#00d4ff]">{c.read} →</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
