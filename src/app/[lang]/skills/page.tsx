import Link from "next/link";
import type { Metadata } from "next";
import PageShell, { LANGS, pickLang, altsFor, H2, Callout } from "@/components/site/PageShell";

type Skill = { name: string; level: number; build: string; proof: string };
type Group = { title: string; intro: string; items: readonly Skill[] };

const COPY = {
  pt: {
    eyebrow: "Stack",
    crumb: "Stack técnica",
    title: "O que eu construo com cada uma, e onde isso está rodando",
    lead: "Nível autoavaliado, com a régua declarada abaixo. Cada linha traz um exemplo real — se eu não consigo apontar onde usei, não está nesta página.",
    scale: "A régua: 90+ significa que eu resolvo problema difícil sem consultar. 70–85, que eu construo em produção e sei onde estão minhas lacunas. Abaixo de 70, que eu já entreguei algo com aquilo mas ainda consulto documentação para o que foge do básico. Preferi números que eu consiga defender numa entrevista a números que impressionem numa barra de progresso.",
    labelBuild: "O que eu construo",
    labelProof: "Onde está",
    ctaProjects: "Ver os case studies",
    ctaUses: "Ver o setup completo",
    groups: [
      {
        title: "Front-end",
        intro: "É onde eu passo a maior parte do tempo e onde está a maior parte do que eu entreguei.",
        items: [
          { name: "React", level: 85, build: "Telas densas de dados: tabelas com filtro, formulários com estado composto, listas que precisam continuar rápidas com centenas de itens.", proof: "A SPA inteira do ERP da Zenith — estoque, precificação, portaria, separações." },
          { name: "Next.js (App Router)", level: 80, build: "Rotas internacionalizadas geradas estaticamente, metadata por idioma, server components para conteúdo e geração de assets no build.", proof: "Este portfólio (64 páginas estáticas em 3 idiomas) e o Muscle Levels." },
          { name: "TypeScript", level: 78, build: "Modelagem de dados de conteúdo com tipos que tornam estado inválido impossível de representar — o erro vira erro de compilação, não bug de produção.", proof: "Este site inteiro; o conteúdo das notas e case studies é tipado por idioma." },
          { name: "JavaScript (ES6+)", level: 88, build: "async/await, manipulação de coleções, e a lógica de domínio que vive no cliente — como o casamento de regras da cubagem.", proof: "Todo o front-end e o back-end do ERP." },
          { name: "Tailwind CSS", level: 85, build: "Design system com tokens próprios, layout responsivo e densidade de informação alta sem virar poluição visual.", proof: "Os três projetos, sempre com paleta customizada." },
          { name: "Framer Motion", level: 72, build: "Animação de entrada por scroll com variantes e stagger, respeitando prefers-reduced-motion via MotionConfig.", proof: "Este portfólio. Sistema interno não leva animação." },
          { name: "HTML semântico e acessibilidade", level: 80, build: "Um h1 por página, hierarquia de headings, aria-label onde o ícone é o único conteúdo, foco visível e navegação por teclado.", proof: "Este site — auditado página a página com navegador headless." },
        ],
      },
      {
        title: "Back-end e dados",
        intro: "Menos horas acumuladas que no front, e o suficiente para colocar e manter uma API em produção.",
        items: [
          { name: "Node.js e Express", level: 75, build: "APIs REST com middleware de autenticação e autorização, validação de entrada e regras que não podem viver no cliente.", proof: "A API do ERP: seis grupos de rotas, JWT e guarda por perfil." },
          { name: "Prisma", level: 76, build: "Schema como fonte de verdade, migrações versionadas e escrita transacional quando duas tabelas precisam mudar juntas.", proof: "É a camada que tornou a migração de SQLite para PostgreSQL uma troca de schema, não uma reescrita." },
          { name: "PostgreSQL", level: 74, build: "Modelagem relacional, índices nas colunas que a tela realmente filtra, e transação onde a consistência importa mais que a velocidade.", proof: "Banco de produção do ERP, hospedado no Neon." },
          { name: "Firebase Firestore", level: 70, build: "Dados em tempo real com onSnapshot para chat e telas de auditoria, com autenticação Firebase ao lado do JWT da API.", proof: "Chat interno do ERP, que substituiu uma plataforma paga." },
          { name: "Autenticação e autorização", level: 76, build: "JWT com claim de papel, middleware de guarda por rota, hash com bcrypt e o padrão de conta nova sem permissão nenhuma.", proof: "requireAuth e requireRoles no back-end do ERP." },
        ],
      },
      {
        title: "Infraestrutura e entrega",
        intro: "O suficiente para ser o único responsável por manter um sistema no ar sem orçamento.",
        items: [
          { name: "Vercel · Netlify · Render · Neon", level: 72, build: "Deploy contínuo, variáveis de ambiente por ambiente, e projetar em torno das limitações reais do plano gratuito — como um backend que suspende quando ocioso.", proof: "Este site na Vercel; o ERP dividido entre Netlify, Render, Neon e Firebase." },
          { name: "Git e GitHub", level: 82, build: "Branch por mudança, commit que explica o porquê, e histórico que permite reconstruir uma decisão um ano depois.", proof: "Todos os repositórios públicos." },
          { name: "SEO técnico", level: 78, build: "Metadata por idioma, canonical, hreflang com x-default, sitemap gerado da tabela de rotas, JSON-LD e headers de segurança.", proof: "Este portfólio — e o motivo pelo qual o preview de link dele funciona." },
          { name: "Automação com Puppeteer", level: 70, build: "Geração de assets no build: PDFs do currículo renderizados da própria página, og-image e ícones do manifest.", proof: "Os dois scripts em scripts/ deste repositório." },
        ],
      },
      {
        title: "Produto, design e IA",
        intro: "A parte que veio antes do código e que continua definindo o que eu construo.",
        items: [
          { name: "Modelagem de domínio", level: 80, build: "Traduzir processo manual em modelo de dados — descobrir que a regra é uma tabela medida, e não uma fórmula a ser inferida.", proof: "A cubagem do ERP e os nove perfis copiados do organograma." },
          { name: "Figma e UI/UX", level: 80, build: "Protótipo antes do código, design system, e interface para usuário não técnico que não vai ser treinado.", proof: "Rebranding completo da Zenith e o design deste site." },
          { name: "Integração com IA", level: 70, build: "Camada sobre dados existentes com sincronização incremental, usando modelo de linguagem para raciocínio em cima do que o ERP já sabe.", proof: "Cortex — em homologação, sobre 226.296 registros." },
        ],
      },
    ],
    metaTitle: "Stack técnica detalhada",
    metaDesc: "As tecnologias que Benjamin Maciel usa, o que constrói com cada uma, nível autoavaliado e o projeto real onde cada uma está rodando.",
  },
  en: {
    eyebrow: "Stack",
    crumb: "Technical stack",
    title: "What I build with each one, and where it is running",
    lead: "Self-assessed levels, against the scale stated below. Every line carries a real example — if I cannot point at where I used it, it is not on this page.",
    scale: "The scale: 90+ means I solve hard problems in it without looking things up. 70–85 means I build production work with it and know where my gaps are. Below 70 means I have shipped something with it but still read the docs for anything past the basics. I would rather publish numbers I can defend in an interview than numbers that look good on a progress bar.",
    labelBuild: "What I build",
    labelProof: "Where it runs",
    ctaProjects: "See the case studies",
    ctaUses: "See the full setup",
    groups: [
      {
        title: "Front end",
        intro: "Where I spend most of my time, and where most of what I have shipped lives.",
        items: [
          { name: "React", level: 85, build: "Data-dense screens: filtered tables, forms with compound state, lists that have to stay fast at hundreds of items.", proof: "The entire Zenith ERP SPA — inventory, pricing, gatehouse, separations." },
          { name: "Next.js (App Router)", level: 80, build: "Statically generated internationalised routes, per-locale metadata, server components for content, and asset generation at build time.", proof: "This portfolio (64 static pages across 3 languages) and Muscle Levels." },
          { name: "TypeScript", level: 78, build: "Modelling content data with types that make invalid state unrepresentable — the mistake becomes a compile error rather than a production bug.", proof: "This whole site; the notes and case-study content is typed per language." },
          { name: "JavaScript (ES6+)", level: 88, build: "async/await, collection work, and the domain logic that lives on the client — such as the cubagem rule matching.", proof: "The ERP's entire front end and back end." },
          { name: "Tailwind CSS", level: 85, build: "A design system on custom tokens, responsive layout, and high information density without visual noise.", proof: "All three projects, always on a custom palette." },
          { name: "Framer Motion", level: 72, build: "Scroll-reveal animation with variants and stagger, respecting prefers-reduced-motion through MotionConfig.", proof: "This portfolio. Internal systems get no animation." },
          { name: "Semantic HTML and accessibility", level: 80, build: "One h1 per page, correct heading hierarchy, aria-label where an icon is the only content, visible focus and keyboard navigation.", proof: "This site — audited page by page with a headless browser." },
        ],
      },
      {
        title: "Back end and data",
        intro: "Fewer accumulated hours than the front end, and enough to put an API in production and keep it there.",
        items: [
          { name: "Node.js and Express", level: 75, build: "REST APIs with authentication and authorisation middleware, input validation, and the rules that cannot live in the client.", proof: "The ERP API: six route groups, JWT and a per-role guard." },
          { name: "Prisma", level: 76, build: "Schema as the source of truth, versioned migrations, and transactional writes when two tables have to change together.", proof: "It is the layer that made the SQLite to PostgreSQL move a schema change rather than a rewrite." },
          { name: "PostgreSQL", level: 74, build: "Relational modelling, indexes on the columns screens actually filter by, and transactions where consistency matters more than speed.", proof: "The ERP's production database, hosted on Neon." },
          { name: "Firebase Firestore", level: 70, build: "Real-time data with onSnapshot for chat and audit screens, with Firebase Auth alongside the API's JWT.", proof: "The ERP's internal chat, which replaced a paid platform." },
          { name: "Authentication and authorisation", level: 76, build: "JWT carrying a role claim, per-route guard middleware, bcrypt hashing, and the pattern of a new account having no permissions.", proof: "requireAuth and requireRoles in the ERP back end." },
        ],
      },
      {
        title: "Infrastructure and delivery",
        intro: "Enough to be the only person responsible for keeping a system online with no budget.",
        items: [
          { name: "Vercel · Netlify · Render · Neon", level: 72, build: "Continuous deployment, per-environment variables, and designing around the real limits of a free tier — such as a backend that suspends when idle.", proof: "This site on Vercel; the ERP split across Netlify, Render, Neon and Firebase." },
          { name: "Git and GitHub", level: 82, build: "A branch per change, commits that explain why, and a history that lets a decision be reconstructed a year later.", proof: "Every public repository." },
          { name: "Technical SEO", level: 78, build: "Per-locale metadata, canonicals, hreflang with x-default, a sitemap generated from the route table, JSON-LD and security headers.", proof: "This portfolio — and the reason its link previews work." },
          { name: "Automation with Puppeteer", level: 70, build: "Build-time asset generation: resume PDFs rendered from the page itself, the og-image and the manifest icons.", proof: "The two scripts in this repository's scripts/ directory." },
        ],
      },
      {
        title: "Product, design and AI",
        intro: "The part that came before the code, and that still decides what I build.",
        items: [
          { name: "Domain modelling", level: 80, build: "Turning a manual process into a data model — finding out that the rule is a measured table rather than a formula to be inferred.", proof: "The ERP's cubagem module and the nine roles copied from the org chart." },
          { name: "Figma and UI/UX", level: 80, build: "Prototype before code, design systems, and interfaces for non-technical users who will not be trained.", proof: "The full Zenith rebranding and the design of this site." },
          { name: "AI integration", level: 70, build: "A layer over existing data with incremental synchronisation, using a language model to reason over what the ERP already knows.", proof: "Cortex — in homologation, over 226,296 records." },
        ],
      },
    ],
    metaTitle: "Detailed technical stack",
    metaDesc: "The technologies Benjamin Maciel uses, what he builds with each, self-assessed levels, and the real project where each one is running.",
  },
  es: {
    eyebrow: "Stack",
    crumb: "Stack técnico",
    title: "Qué construyo con cada una, y dónde está corriendo",
    lead: "Nivel autoevaluado, con la vara declarada abajo. Cada línea trae un ejemplo real — si no puedo señalar dónde lo usé, no está en esta página.",
    scale: "La vara: 90+ significa que resuelvo problemas difíciles sin consultar. 70–85, que construyo en producción y sé dónde están mis huecos. Por debajo de 70, que ya entregué algo con eso pero todavía consulto documentación para lo que sale de lo básico. Preferí números que pueda defender en una entrevista a números que impresionen en una barra de progreso.",
    labelBuild: "Qué construyo",
    labelProof: "Dónde está",
    ctaProjects: "Ver los case studies",
    ctaUses: "Ver el setup completo",
    groups: [
      {
        title: "Front-end",
        intro: "Es donde paso la mayor parte del tiempo y donde está la mayor parte de lo que entregué.",
        items: [
          { name: "React", level: 85, build: "Pantallas densas de datos: tablas con filtro, formularios con estado compuesto, listas que deben seguir rápidas con cientos de ítems.", proof: "La SPA entera del ERP de Zenith — inventario, precios, portería, separaciones." },
          { name: "Next.js (App Router)", level: 80, build: "Rutas internacionalizadas generadas estáticamente, metadata por idioma, server components para contenido y generación de assets en el build.", proof: "Este portafolio (64 páginas estáticas en 3 idiomas) y Muscle Levels." },
          { name: "TypeScript", level: 78, build: "Modelado de datos de contenido con tipos que hacen irrepresentable el estado inválido — el error se vuelve error de compilación, no bug de producción.", proof: "Este sitio entero; el contenido de notas y case studies está tipado por idioma." },
          { name: "JavaScript (ES6+)", level: 88, build: "async/await, manejo de colecciones, y la lógica de dominio que vive en el cliente — como el emparejamiento de reglas de la cubicación.", proof: "Todo el front-end y el back-end del ERP." },
          { name: "Tailwind CSS", level: 85, build: "Design system con tokens propios, layout responsivo y densidad de información alta sin ruido visual.", proof: "Los tres proyectos, siempre con paleta personalizada." },
          { name: "Framer Motion", level: 72, build: "Animación de entrada por scroll con variantes y stagger, respetando prefers-reduced-motion vía MotionConfig.", proof: "Este portafolio. Un sistema interno no lleva animación." },
          { name: "HTML semántico y accesibilidad", level: 80, build: "Un h1 por página, jerarquía de encabezados, aria-label donde el icono es el único contenido, foco visible y navegación por teclado.", proof: "Este sitio — auditado página por página con navegador headless." },
        ],
      },
      {
        title: "Back-end y datos",
        intro: "Menos horas acumuladas que en el front, y las suficientes para poner y mantener una API en producción.",
        items: [
          { name: "Node.js y Express", level: 75, build: "APIs REST con middleware de autenticación y autorización, validación de entrada y reglas que no pueden vivir en el cliente.", proof: "La API del ERP: seis grupos de rutas, JWT y guarda por rol." },
          { name: "Prisma", level: 76, build: "Schema como fuente de verdad, migraciones versionadas y escritura transaccional cuando dos tablas deben cambiar juntas.", proof: "Es la capa que convirtió la migración de SQLite a PostgreSQL en un cambio de schema, no en una reescritura." },
          { name: "PostgreSQL", level: 74, build: "Modelado relacional, índices en las columnas que la pantalla realmente filtra, y transacción donde la consistencia importa más que la velocidad.", proof: "Base de producción del ERP, alojada en Neon." },
          { name: "Firebase Firestore", level: 70, build: "Datos en tiempo real con onSnapshot para chat y pantallas de auditoría, con Firebase Auth junto al JWT de la API.", proof: "El chat interno del ERP, que reemplazó una plataforma paga." },
          { name: "Autenticación y autorización", level: 76, build: "JWT con claim de rol, middleware de guarda por ruta, hash con bcrypt y el patrón de cuenta nueva sin ningún permiso.", proof: "requireAuth y requireRoles en el back-end del ERP." },
        ],
      },
      {
        title: "Infraestructura y entrega",
        intro: "Lo suficiente para ser el único responsable de mantener un sistema en línea sin presupuesto.",
        items: [
          { name: "Vercel · Netlify · Render · Neon", level: 72, build: "Despliegue continuo, variables por entorno, y diseñar alrededor de los límites reales del plan gratuito — como un backend que se suspende al estar ocioso.", proof: "Este sitio en Vercel; el ERP repartido entre Netlify, Render, Neon y Firebase." },
          { name: "Git y GitHub", level: 82, build: "Una rama por cambio, commits que explican el porqué, e historial que permite reconstruir una decisión un año después.", proof: "Todos los repositorios públicos." },
          { name: "SEO técnico", level: 78, build: "Metadata por idioma, canonical, hreflang con x-default, sitemap generado desde la tabla de rutas, JSON-LD y cabeceras de seguridad.", proof: "Este portafolio — y la razón por la que sus previsualizaciones de enlace funcionan." },
          { name: "Automatización con Puppeteer", level: 70, build: "Generación de assets en el build: PDFs del currículum renderizados desde la propia página, la og-image y los iconos del manifest.", proof: "Los dos scripts en scripts/ de este repositorio." },
        ],
      },
      {
        title: "Producto, diseño e IA",
        intro: "La parte que vino antes del código y que sigue definiendo lo que construyo.",
        items: [
          { name: "Modelado de dominio", level: 80, build: "Traducir un proceso manual en modelo de datos — descubrir que la regla es una tabla medida y no una fórmula por inferir.", proof: "La cubicación del ERP y los nueve roles copiados del organigrama." },
          { name: "Figma y UI/UX", level: 80, build: "Prototipo antes del código, design systems, e interfaces para usuarios no técnicos que no van a ser capacitados.", proof: "El rebranding completo de Zenith y el diseño de este sitio." },
          { name: "Integración con IA", level: 70, build: "Una capa sobre datos existentes con sincronización incremental, usando un modelo de lenguaje para razonar sobre lo que el ERP ya sabe.", proof: "Cortex — en homologación, sobre 226.296 registros." },
        ],
      },
    ],
    metaTitle: "Stack técnico detallado",
    metaDesc: "Las tecnologías que usa Benjamin Maciel, qué construye con cada una, nivel autoevaluado y el proyecto real donde cada una está corriendo.",
  },
} as const;

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = pickLang(params.lang);
  const c = COPY[lang];
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: altsFor(lang, "/skills"),
    openGraph: { title: c.metaTitle, description: c.metaDesc },
  };
}

export default function SkillsPage({ params }: { params: { lang: string } }) {
  const lang = pickLang(params.lang);
  const c = COPY[lang];

  return (
    <PageShell
      lang={lang}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
      crumbs={[{ label: c.crumb }]}
      width="840px"
      footer={
        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <Link href={`/${lang}/projetos`} className="text-[#00d4ff] hover:underline">{c.ctaProjects} →</Link>
          <Link href={`/${lang}/uses`} className="text-[#00d4ff] hover:underline">{c.ctaUses} →</Link>
        </div>
      }
    >
      <Callout>{c.scale}</Callout>

      {(c.groups as readonly Group[]).map((g) => (
        <section key={g.title} aria-labelledby={g.title}>
          <H2 id={g.title}>{g.title}</H2>
          <p className="mb-6 leading-relaxed text-[#8b949e]">{g.intro}</p>

          <ul className="flex flex-col gap-4">
            {g.items.map((s) => (
              <li key={s.name} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-bold text-white">{s.name}</h3>
                  <span className="font-mono text-xs text-[#00d4ff]">{s.level}</span>
                </div>

                <div
                  className="mb-4 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]"
                  role="img"
                  aria-label={`${s.name}: ${s.level} / 100`}
                >
                  <div className="h-full rounded-full bg-[#00d4ff]" style={{ width: `${s.level}%` }} />
                </div>

                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4d5866]">{c.labelBuild}</p>
                <p className="mb-4 leading-[1.7] text-[#c9d1d9]">{s.build}</p>

                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4d5866]">{c.labelProof}</p>
                <p className="leading-[1.7] text-[#8b949e]">{s.proof}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </PageShell>
  );
}
