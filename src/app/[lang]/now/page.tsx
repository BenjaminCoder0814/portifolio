import Link from "next/link";
import { Breadcrumbs } from "@/components/site/PageShell";
import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { personal } from "@/data";

const CRUMB = { pt: "Agora", en: "Now", es: "Ahora" } as const;

const LANGS: Lang[] = ["pt", "en", "es"];
const pick = (p: string) => (LANGS.includes(p as Lang) ? (p as Lang) : "pt");

/** Bump this whenever the page changes. A /now page with a stale date is worse
 *  than no /now page — it advertises that nothing has been looked at in months. */
const UPDATED = "2026-08-18";

type Entry = { term: string; desc: string };

const COPY: Record<Lang, {
  eyebrow: string; title: string; lead: string; back: string; updated: string;
  hNow: string; hFaq: string; faqLead: string; faqCta: string; now: Entry[];
  metaTitle: string; metaDesc: string; notesCta: string;
}> = {
  pt: {
    eyebrow: "Agora",
    title: "No que eu estou trabalhando",
    lead: "Uma página /now: o que ocupa meu tempo neste momento, e as perguntas que recrutador costuma fazer antes da primeira conversa.",
    back: "← Portfólio",
    updated: "Atualizado em",
    hNow: "Agora",
    hFaq: "Perguntas frequentes",
    faqLead: "Disponibilidade, senioridade, stack, idiomas, modelo de contratação e o que eu procuro — respondido numa página só.",
    faqCta: "Ver o FAQ completo",
    notesCta: "Ler as notas técnicas →",
    now: [
      { term: "Zenith Lacres — Software Engineer", desc: "Mantendo e evoluindo a plataforma interna que a operação usa todo dia: estoque, precificação com cubagem, chat, portaria, separações e auditoria. Escrevo código em produção toda semana." },
      { term: "Cortex — camada de IA sobre os dados do ERP", desc: "Integração ativa com sincronização incremental sobre 226.296 registros, raciocínio na API da Anthropic. A plataforma está em homologação; os agentes que assumem trabalho administrativo repetitivo ainda estão em desenvolvimento." },
      { term: "Duas graduações em andamento", desc: "Ciência da Computação na University of the People (online, EUA) e Sistemas de Informação no UNASP (São Paulo). Ambas iniciadas em 2026." },
      { term: "Escrevendo sobre o que construí", desc: "Notas técnicas sobre decisões reais de engenharia — modelagem de domínio, trade-offs de banco e o custo de rodar em plano gratuito. Cada nota aponta para o repositório onde o código está." },
      { term: "Procurando a próxima vaga", desc: "Aberto a oportunidades como Front-End / Software Engineer, remoto ou presencial em São Paulo, incluindo posições internacionais." },
    ],
    metaTitle: "Agora — no que estou trabalhando",
    metaDesc: "O que Benjamin Maciel está construindo, estudando e procurando agora, e as respostas às perguntas que recrutadores fazem antes da primeira conversa.",
  },
  en: {
    eyebrow: "Now",
    title: "What I am working on",
    lead: "A /now page: what has my attention at the moment, and the questions recruiters tend to ask before a first conversation.",
    back: "← Portfolio",
    updated: "Last updated",
    hNow: "Now",
    hFaq: "Frequently asked",
    faqLead: "Availability, seniority, stack, languages, contract model and what I am looking for — answered on one page.",
    faqCta: "Read the full FAQ",
    notesCta: "Read the engineering notes →",
    now: [
      { term: "Zenith Lacres — Software Engineer", desc: "Maintaining and extending the internal platform the operation runs on every day: inventory, cubic-weight pricing, chat, gatehouse queue, separations and audit. I write production code every week." },
      { term: "Cortex — an AI layer over the ERP data", desc: "A live integration with incremental synchronisation over 226,296 records, reasoning on Anthropic's API. The platform is in homologation; the agents meant to take over repetitive administrative work are still in development." },
      { term: "Two degrees in progress", desc: "B.Sc. Computer Science at University of the People (online, USA) and Information Systems at UNASP (São Paulo). Both started in 2026." },
      { term: "Writing about what I built", desc: "Engineering notes on real decisions — domain modelling, database trade-offs and what running on a free tier actually costs. Each note points at the repository where the code lives." },
      { term: "Looking for the next role", desc: "Open to Front-End / Software Engineer positions, remote or on-site in São Paulo, including international roles." },
    ],
    metaTitle: "Now — what I am working on",
    metaDesc: "What Benjamin Maciel is building, studying and looking for right now, plus answers to the questions recruiters ask before a first conversation.",
  },
  es: {
    eyebrow: "Ahora",
    title: "En qué estoy trabajando",
    lead: "Una página /now: qué ocupa mi tiempo en este momento, y las preguntas que los reclutadores suelen hacer antes de la primera conversación.",
    back: "← Portafolio",
    updated: "Actualizado el",
    hNow: "Ahora",
    hFaq: "Preguntas frecuentes",
    faqLead: "Disponibilidad, seniority, stack, idiomas, modelo de contratación y qué busco — respondido en una sola página.",
    faqCta: "Ver el FAQ completo",
    notesCta: "Leer las notas técnicas →",
    now: [
      { term: "Zenith Lacres — Software Engineer", desc: "Manteniendo y ampliando la plataforma interna que la operación usa todos los días: inventario, precios con cubicación, chat, portería, separaciones y auditoría. Escribo código en producción cada semana." },
      { term: "Cortex — capa de IA sobre los datos del ERP", desc: "Integración activa con sincronización incremental sobre 226.296 registros, razonamiento en la API de Anthropic. La plataforma está en homologación; los agentes que asumirán trabajo administrativo repetitivo siguen en desarrollo." },
      { term: "Dos carreras en curso", desc: "Ciencias de la Computación en University of the People (online, EE.UU.) y Sistemas de Información en UNASP (São Paulo). Ambas iniciadas en 2026." },
      { term: "Escribiendo sobre lo que construí", desc: "Notas técnicas sobre decisiones reales de ingeniería: modelado de dominio, trade-offs de base de datos y el costo de correr en plan gratuito. Cada nota apunta al repositorio donde está el código." },
      { term: "Buscando el próximo puesto", desc: "Abierto a posiciones de Front-End / Software Engineer, remoto o presencial en São Paulo, incluidas oportunidades internacionales." },
    ],
    metaTitle: "Ahora — en qué estoy trabajando",
    metaDesc: "Qué está construyendo, estudiando y buscando Benjamin Maciel ahora mismo, y las respuestas a las preguntas que hacen los reclutadores.",
  },
};

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
      canonical: `${SITE_URL}/${lang}/now`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}/${l}/now`])),
    },
    openGraph: { title: c.metaTitle, description: c.metaDesc, url: `${SITE_URL}/${lang}/now` },
  };
}

export default function NowPage({ params }: { params: { lang: string } }) {
  const lang = pick(params.lang);
  const c = COPY[lang];

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 sm:px-10">

      <div className="mx-auto max-w-[760px]">
        <Breadcrumbs lang={lang} crumbs={[{ label: CRUMB[lang] }]} />

        <header className="mb-14 mt-8 border-b border-white/[0.07] pb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#00d4ff]">{c.eyebrow}</p>
          <h1 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl">{c.title}</h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-[#8b949e]">{c.lead}</p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-[#4d5866]">
            {c.updated} <time dateTime={UPDATED}>{UPDATED}</time>
          </p>
        </header>

        <section aria-labelledby="now-h">
          <h2 id="now-h" className="mb-6 text-2xl font-bold tracking-[-0.02em] text-white">{c.hNow}</h2>
          <dl className="flex flex-col gap-5">
            {c.now.map((e) => (
              <div key={e.term} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <dt className="mb-2 font-semibold text-white">{e.term}</dt>
                <dd className="leading-[1.7] text-[#8b949e]">{e.desc}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="faq-h" className="mt-16">
          <h2 id="faq-h" className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">{c.hFaq}</h2>
          <p className="mb-4 leading-[1.75] text-[#8b949e]">{c.faqLead}</p>
          <Link href={`/${lang}/faq`} className="font-mono text-sm text-[#00d4ff] hover:underline">
            {c.faqCta} →
          </Link>
        </section>

        <footer className="mt-16 border-t border-white/[0.07] pt-8">
          <Link href={`/${lang}/notas`} className="font-mono text-sm text-[#00d4ff] transition-opacity hover:opacity-80">
            {c.notesCta}
          </Link>
          <p className="mt-6 font-mono text-xs text-[#4d5866]">
            {personal.email} · {personal.location}
          </p>
        </footer>
      </div>
    </main>
  );
}
