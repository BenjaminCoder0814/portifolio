import Link from "next/link";
import type { Metadata } from "next";
import PageShell, { LANGS, pickLang, altsFor, H2, Callout } from "@/components/site/PageShell";

type Entry = {
  period: string;
  role: string;
  org: string;
  tone: "cyan" | "green" | "purple" | "amber";
  context: string;
  built: readonly string[];
  impact?: string;
};

const COPY = {
  pt: {
    eyebrow: "Experiência",
    crumb: "Experiência",
    title: "O que eu construí, em ordem",
    lead: "Cada entrada com o contexto, o que foi construído e o que mudou depois. Mantido em paridade com o currículo — as duas fontes não podem divergir.",
    hWork: "Trabalho",
    hEdu: "Formação",
    labelBuilt: "O que construí",
    labelImpact: "Impacto",
    cv: "Ver currículo completo",
    projects: "Ver os case studies",
    note: "{{PREENCHER: mês/ano exatos de início na Zenith Lacres, e o título formal do cargo hoje. Também: período exato da atividade com drone e se houve registro ANAC/SISANT.}}",
    work: [
      {
        period: "2023 – atual",
        role: "Desenvolvedor · Software Engineer",
        org: "Zenith Lacres — São Paulo",
        tone: "cyan" as const,
        context:
          "Indústria de lacres com mais de 20 anos de mercado e três empresas operando a partir de um mesmo armazém. Entrei pelo lado de marca e catálogo, e acabei construindo o sistema que a operação usa hoje.",
        built: [
          "A plataforma interna inteira: estoque com movimentação rastreável, precificação com cubagem, chat interno, portaria com fila de check-in, separações, compras, pendências, relatórios e mídia.",
          "Front-end em React sobre uma API REST em Express, com PostgreSQL acessado via Prisma e chat em Firebase Firestore.",
          "Controle de acesso com nove perfis espelhando o organograma da empresa, com VISITANTE — sem permissão nenhuma — como estado inicial.",
          "Rebranding da identidade visual, site, mídias sociais e montagem de estúdio fotográfico interno para o catálogo.",
          "Entrada em cinco marketplaces: Mercado Livre, Shopee, Amazon, Magalu e TikTok Shop.",
          "Cortex, a camada de IA sobre os dados do ERP — integração ativa com sincronização incremental sobre 226.296 registros, em homologação.",
        ],
        impact:
          "Precificação de 10–15 minutos manuais para menos de 30 segundos. Chat interno substituiu uma plataforma paga de mensagens. Receita digital de R$ 0 a R$ 10.000 em três meses.",
      },
      {
        period: "2024",
        role: "Piloto de drone · captação aérea",
        org: "Freelance",
        tone: "amber" as const,
        context:
          "Operação de drone profissional para captação e cinegrafia, incluindo cobertura da Porsche Carrera Cup.",
        built: [
          "Planejamento de voo e captação sob restrição real: bateria, vento, enquadramento e uma única tomada.",
          "Edição e entrega do material captado.",
        ],
        impact:
          "É a linha mais fora de contexto do currículo e ela fica de propósito: é a experiência que mais se parece com produção — não existe refatorar depois que o evento acabou.",
      },
    ],
    edu: [
      {
        period: "2026 – atual",
        role: "Bacharelado em Ciência da Computação",
        org: "University of the People — EUA, online",
        tone: "purple" as const,
        context: "Graduação em andamento, cursada em paralelo com a de Sistemas de Informação.",
        built: [],
      },
      {
        period: "2026 – 2029",
        role: "Bacharelado em Sistemas de Informação",
        org: "UNASP — São Paulo",
        tone: "purple" as const,
        context: "Graduação em andamento.",
        built: [],
      },
      {
        period: "2023 – 2025",
        role: "Técnico em Tecnologia da Informação",
        org: "UNASP — São Paulo",
        tone: "green" as const,
        context: "Formação técnica concluída, com destaque em desenvolvimento web e design.",
        built: [
          "TCC entregue 100% sozinho — o projeto previa uma equipe de três — com aprovação e nota máxima.",
        ],
      },
      {
        period: "2022",
        role: "Clube de robótica LEGO",
        org: "Robótica educacional",
        tone: "green" as const,
        context:
          "Um ano de robótica educacional. É onde eu aprendi que o mundo físico não aceita quase certo — o programa que funciona na bancada falha no chão porque o chão tem atrito.",
        built: [],
      },
      {
        period: "2020",
        role: "Primeiro código — 12 anos",
        org: "Scratch · Code Buddy",
        tone: "green" as const,
        context: "Comecei porque queria fazer um jogo e descobri que dava.",
        built: [],
      },
    ],
    metaTitle: "Experiência profissional e formação",
    metaDesc: "A trajetória profissional de Benjamin Maciel: Zenith Lacres, captação com drone, formação técnica no UNASP e duas graduações em andamento.",
  },
  en: {
    eyebrow: "Experience",
    crumb: "Experience",
    title: "What I built, in order",
    lead: "Each entry with its context, what was built and what changed afterwards. Kept in parity with the CV — the two sources cannot disagree.",
    hWork: "Work",
    hEdu: "Education",
    labelBuilt: "What I built",
    labelImpact: "Impact",
    cv: "See the full CV",
    projects: "See the case studies",
    note: "{{PREENCHER: mês/ano exatos de início na Zenith Lacres, e o título formal do cargo hoje. Também: período exato da atividade com drone e se houve registro ANAC/SISANT.}}",
    work: [
      {
        period: "2023 – present",
        role: "Developer · Software Engineer",
        org: "Zenith Lacres — São Paulo",
        tone: "cyan" as const,
        context:
          "An industrial sealing manufacturer with over 20 years in the market and three companies operating out of one warehouse. I came in through brand and catalogue work, and ended up building the system the operation runs on today.",
        built: [
          "The entire internal platform: inventory with traceable movements, cubic-weight pricing, internal chat, a gatehouse check-in queue, separations, purchasing, pending orders, reports and media.",
          "A React front end over an Express REST API, with PostgreSQL reached through Prisma and chat on Firebase Firestore.",
          "Access control with nine roles mirroring the company's org chart, with VISITANTE — no permissions at all — as the starting state.",
          "Rebranding of the visual identity, website and social media, plus an in-house photography studio for the catalogue.",
          "Launch on five marketplaces: Mercado Livre, Shopee, Amazon, Magalu and TikTok Shop.",
          "Cortex, the AI layer over the ERP data — a live integration with incremental synchronisation over 226,296 records, currently in homologation.",
        ],
        impact:
          "Pricing went from 10–15 manual minutes to under 30 seconds. Internal chat replaced a paid messaging platform. Digital revenue went from R$0 to R$10,000 in three months.",
      },
      {
        period: "2024",
        role: "Drone pilot · aerial capture",
        org: "Freelance",
        tone: "amber" as const,
        context: "Professional drone operation for aerial capture and videography, including coverage of the Porsche Carrera Cup.",
        built: [
          "Flight planning and capture under real constraints: battery, wind, framing and a single take.",
          "Editing and delivery of the captured material.",
        ],
        impact:
          "It is the most out-of-place line on the CV and it stays on purpose: it is the experience closest to production — there is no refactor once the event is over.",
      },
    ],
    edu: [
      {
        period: "2026 – present",
        role: "B.Sc. Computer Science",
        org: "University of the People — USA, online",
        tone: "purple" as const,
        context: "In progress, studied in parallel with the Information Systems degree.",
        built: [],
      },
      {
        period: "2026 – 2029",
        role: "B.Sc. Information Systems",
        org: "UNASP — São Paulo",
        tone: "purple" as const,
        context: "In progress.",
        built: [],
      },
      {
        period: "2023 – 2025",
        role: "Technical Diploma in Information Technology",
        org: "UNASP — São Paulo",
        tone: "green" as const,
        context: "Completed, with distinction in web development and design.",
        built: ["Graduation project delivered entirely solo — it was scoped for a team of three — passed with the top grade."],
      },
      {
        period: "2022",
        role: "LEGO robotics club",
        org: "Educational robotics",
        tone: "green" as const,
        context:
          "A year of educational robotics. It is where I learned that the physical world does not accept almost right — the program that works on the bench fails on the floor because the floor has friction.",
        built: [],
      },
      {
        period: "2020",
        role: "First code — age 12",
        org: "Scratch · Code Buddy",
        tone: "green" as const,
        context: "I started because I wanted to make a game and found out I could.",
        built: [],
      },
    ],
    metaTitle: "Professional experience and education",
    metaDesc: "Benjamin Maciel's professional trajectory: Zenith Lacres, aerial drone work, technical training at UNASP and two degrees in progress.",
  },
  es: {
    eyebrow: "Experiencia",
    crumb: "Experiencia",
    title: "Lo que construí, en orden",
    lead: "Cada entrada con su contexto, lo que se construyó y lo que cambió después. Mantenido en paridad con el currículum — las dos fuentes no pueden diferir.",
    hWork: "Trabajo",
    hEdu: "Formación",
    labelBuilt: "Qué construí",
    labelImpact: "Impacto",
    cv: "Ver el currículum completo",
    projects: "Ver los case studies",
    note: "{{PREENCHER: mês/ano exatos de início na Zenith Lacres, e o título formal do cargo hoje. Também: período exato da atividade com drone e se houve registro ANAC/SISANT.}}",
    work: [
      {
        period: "2023 – actual",
        role: "Desarrollador · Software Engineer",
        org: "Zenith Lacres — São Paulo",
        tone: "cyan" as const,
        context:
          "Industria de precintos con más de 20 años en el mercado y tres empresas operando desde un mismo almacén. Entré por el lado de marca y catálogo, y terminé construyendo el sistema que la operación usa hoy.",
        built: [
          "La plataforma interna entera: inventario con movimientos rastreables, precios con cubicación, chat interno, portería con fila de check-in, separaciones, compras, pendientes, informes y medios.",
          "Front-end en React sobre una API REST en Express, con PostgreSQL accedido vía Prisma y chat en Firebase Firestore.",
          "Control de acceso con nueve roles que reflejan el organigrama, con VISITANTE — sin ningún permiso — como estado inicial.",
          "Rebranding de la identidad visual, sitio y redes sociales, más el montaje de un estudio fotográfico interno para el catálogo.",
          "Entrada en cinco marketplaces: Mercado Livre, Shopee, Amazon, Magalu y TikTok Shop.",
          "Cortex, la capa de IA sobre los datos del ERP — integración activa con sincronización incremental sobre 226.296 registros, en homologación.",
        ],
        impact:
          "La cotización pasó de 10–15 minutos manuales a menos de 30 segundos. El chat interno reemplazó una plataforma paga de mensajería. El ingreso digital pasó de R$0 a R$10.000 en tres meses.",
      },
      {
        period: "2024",
        role: "Piloto de drone · captación aérea",
        org: "Freelance",
        tone: "amber" as const,
        context: "Operación de drone profesional para captación y videografía, incluida la cobertura de la Porsche Carrera Cup.",
        built: [
          "Planificación de vuelo y captación bajo restricción real: batería, viento, encuadre y una sola toma.",
          "Edición y entrega del material captado.",
        ],
        impact:
          "Es la línea más fuera de lugar del currículum y se queda a propósito: es la experiencia más parecida a producción — no hay refactor después de que el evento terminó.",
      },
    ],
    edu: [
      {
        period: "2026 – actual",
        role: "Licenciatura en Ciencias de la Computación",
        org: "University of the People — EE.UU., online",
        tone: "purple" as const,
        context: "En curso, cursada en paralelo con la de Sistemas de Información.",
        built: [],
      },
      {
        period: "2026 – 2029",
        role: "Licenciatura en Sistemas de Información",
        org: "UNASP — São Paulo",
        tone: "purple" as const,
        context: "En curso.",
        built: [],
      },
      {
        period: "2023 – 2025",
        role: "Técnico en Tecnología de la Información",
        org: "UNASP — São Paulo",
        tone: "green" as const,
        context: "Concluido, con destaque en desarrollo web y diseño.",
        built: ["Proyecto de graduación entregado en solitario — estaba planteado para un equipo de tres — aprobado con nota máxima."],
      },
      {
        period: "2022",
        role: "Club de robótica LEGO",
        org: "Robótica educativa",
        tone: "green" as const,
        context:
          "Un año de robótica educativa. Ahí aprendí que el mundo físico no acepta el casi correcto — el programa que funciona en la mesa falla en el suelo porque el suelo tiene fricción.",
        built: [],
      },
      {
        period: "2020",
        role: "Primer código — 12 años",
        org: "Scratch · Code Buddy",
        tone: "green" as const,
        context: "Empecé porque quería hacer un juego y descubrí que podía.",
        built: [],
      },
    ],
    metaTitle: "Experiencia profesional y formación",
    metaDesc: "La trayectoria profesional de Benjamin Maciel: Zenith Lacres, captación con drone, formación técnica en UNASP y dos carreras en curso.",
  },
} as const;

const TONE: Record<string, string> = { cyan: "#00d4ff", green: "#00ff88", purple: "#a78bfa", amber: "#fbbf24" };

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = pickLang(params.lang);
  const c = COPY[lang];
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: altsFor(lang, "/experiencia"),
    openGraph: { title: c.metaTitle, description: c.metaDesc },
  };
}

function Timeline({ items, labelBuilt, labelImpact }: { items: readonly Entry[]; labelBuilt: string; labelImpact: string }) {
  return (
    <ol className="flex flex-col gap-10 border-l border-white/[0.08] pl-6">
      {items.map((e) => (
        <li key={e.period + e.role} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[31px] top-2 h-3 w-3 rounded-full border-2 border-[#0a0a0a]"
            style={{ background: TONE[e.tone] }}
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: TONE[e.tone] }}>
            {e.period}
          </p>
          <h3 className="mt-1 text-xl font-bold text-white">{e.role}</h3>
          <p className="font-mono text-xs text-[#4d5866]">{e.org}</p>
          <p className="mt-3 leading-[1.75] text-[#c9d1d9]">{e.context}</p>

          {e.built.length > 0 && (
            <>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4d5866]">{labelBuilt}</p>
              <ul className="mt-2 flex list-disc flex-col gap-2 pl-5 text-[#8b949e]">
                {e.built.map((b) => (
                  <li key={b.slice(0, 24)} className="leading-[1.7]">{b}</li>
                ))}
              </ul>
            </>
          )}

          {e.impact && (
            <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4d5866]">{labelImpact}</p>
              <p className="leading-[1.7] text-[#c9d1d9]">{e.impact}</p>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function ExperienciaPage({ params }: { params: { lang: string } }) {
  const lang = pickLang(params.lang);
  const c = COPY[lang];

  return (
    <PageShell
      lang={lang}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
      crumbs={[{ label: c.crumb }]}
      width="800px"
      footer={
        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <Link href={`/${lang}/curriculo`} className="text-[#00d4ff] hover:underline">{c.cv} →</Link>
          <Link href={`/${lang}/projetos`} className="text-[#00d4ff] hover:underline">{c.projects} →</Link>
        </div>
      }
    >
      <H2 id="trabalho">{c.hWork}</H2>
      <Timeline items={c.work} labelBuilt={c.labelBuilt} labelImpact={c.labelImpact} />

      <H2 id="formacao">{c.hEdu}</H2>
      <Timeline items={c.edu} labelBuilt={c.labelBuilt} labelImpact={c.labelImpact} />

      <div className="mt-12">
        <Callout tone="warn">{c.note}</Callout>
      </div>
    </PageShell>
  );
}
