import Link from "next/link";
import { Breadcrumbs } from "@/components/site/PageShell";
import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const CRUMB = { pt: "O que eu uso", en: "What I use", es: "Lo que uso" } as const;

const LANGS: Lang[] = ["pt", "en", "es"];
const pick = (p: string) => (LANGS.includes(p as Lang) ? (p as Lang) : "pt");

type Item = { name: string; note: string };
type Group = { title: string; intro?: string; items: Item[] };

const COPY: Record<Lang, {
  eyebrow: string; title: string; lead: string; back: string;
  groups: Group[]; hRegret: string; regret: string; hHardware: string; hardware: string;
  metaTitle: string; metaDesc: string;
}> = {
  pt: {
    eyebrow: "Setup",
    title: "O que eu uso",
    lead: "Ferramentas que aparecem de fato nos meus repositórios — não uma lista de aspiração. Se está aqui, tem um arquivo de configuração ou uma dependência provando.",
    back: "← Portfólio",
    hRegret: "Uma configuração da qual eu me arrependo",
    regret:
      "No repositório do TCC, o .vscode/settings.json desliga tudo: validação de TypeScript, ESLint, validação de JSON e o painel de problemas. Eu fiz isso quando o editor estava barulhento demais e eu queria terminar uma tela. O efeito colateral é que os erros continuaram existindo — eu só parei de vê-los. Hoje eu trato ruído de linter como um bug do meu setup, não como algo para silenciar.",
    hHardware: "Hardware",
    hardware: "{{PREENCHER: máquina, processador, memória, monitores, teclado, headset. Se preferir não expor, apague esta seção inteira.}}",
    groups: [
      {
        title: "Editor e escrita de código",
        items: [
          { name: "VS Code", note: "Ambiente principal. Os dois repositórios versionam .vscode/settings.json, então o setup viaja junto com o projeto." },
          { name: "Cursor", note: "Usado no TCC — o repositório tem um .cursorrules definindo padrão de código, organização de pastas e o que não fazer." },
          { name: "Prettier", note: "printWidth 140, proseWrap always, aspas duplas, com o plugin de ordenação de JSON." },
          { name: "ESLint", note: "Via eslint-config-next nos projetos Next.js." },
        ],
      },
      {
        title: "Front-end",
        items: [
          { name: "Next.js (App Router)", note: "Este portfólio e o TCC. Rotas internacionalizadas, geração estática e metadata por idioma." },
          { name: "React", note: "18 no ERP e neste site; 19 no TCC." },
          { name: "Vite", note: "Build do front-end do ERP. Escolhido pela velocidade de dev server num projeto sem SSR." },
          { name: "TypeScript", note: "Neste portfólio e no TCC. O ERP é JavaScript — foi escrito antes de eu adotar TS, e migrá-lo hoje seria custo sem retorno claro." },
          { name: "Tailwind CSS", note: "Nos três projetos, sempre com tokens próprios em vez das cores padrão." },
          { name: "Framer Motion", note: "Só neste portfólio. Sistema interno não ganha animação de scroll." },
          { name: "lucide-react · Heroicons", note: "Ícones. lucide nos três, Heroicons no ERP por já estar lá." },
        ],
      },
      {
        title: "Back-end e dados",
        items: [
          { name: "Node.js 20 · Express", note: "API do ERP. Express porque o problema era CRUD com regras, não streaming." },
          { name: "Prisma", note: "Camada única de acesso ao banco. Foi ela que tornou a migração de SQLite para PostgreSQL uma troca de schema em vez de uma reescrita." },
          { name: "PostgreSQL (Neon)", note: "Banco de produção do ERP." },
          { name: "Firebase Firestore", note: "Chat interno e as telas de auditoria e contagem, com onSnapshot para tempo real." },
          { name: "JWT · bcryptjs", note: "Autenticação e hash de senha na API." },
          { name: "Chart.js · xlsx", note: "Gráficos do dashboard e exportação para planilha — porque parte da operação ainda quer o arquivo." },
        ],
      },
      {
        title: "Deploy e infraestrutura",
        items: [
          { name: "Vercel", note: "Este portfólio." },
          { name: "Netlify", note: "Front-end do ERP, com _redirects para o roteamento da SPA." },
          { name: "Render", note: "API do ERP. Plano gratuito, o que significa cold start no primeiro acesso do dia." },
          { name: "GitHub Actions", note: "Presente nos repositórios — e, no caso do TCC, um lembrete de que arquivo de CI não é o mesmo que ter CI." },
        ],
      },
      {
        title: "Automação neste site",
        intro: "Este portfólio gera os próprios assets em vez de depender de arquivos soltos:",
        items: [
          { name: "Puppeteer", note: "Dois scripts: um renderiza os PDFs trilíngues do currículo a partir da própria página, outro gera o og-image e os ícones do manifest." },
          { name: "next/font", note: "Inter e JetBrains Mono self-hosted no build, sem requisição externa em runtime." },
        ],
      },
      {
        title: "Design",
        items: [
          { name: "Figma", note: "Protótipos, fluxos e o material do rebranding da Zenith." },
        ],
      },
    ],
    metaTitle: "O que eu uso — ferramentas e setup",
    metaDesc: "As ferramentas que aparecem de fato nos repositórios de Benjamin Maciel: editor, front-end, back-end, dados, deploy e automação.",
  },
  en: {
    eyebrow: "Setup",
    title: "What I use",
    lead: "Tools that actually appear in my repositories — not an aspirational list. If it is here, there is a config file or a dependency proving it.",
    back: "← Portfolio",
    hRegret: "One setting I regret",
    regret:
      "In the graduation-project repository, .vscode/settings.json turns everything off: TypeScript validation, ESLint, JSON validation and the problems panel. I did that when the editor got too noisy and I wanted to finish a screen. The side effect is that the errors kept existing — I just stopped seeing them. These days I treat linter noise as a bug in my setup rather than something to silence.",
    hHardware: "Hardware",
    hardware: "{{PREENCHER: máquina, processador, memória, monitores, teclado, headset. Se preferir não expor, apague esta seção inteira.}}",
    groups: [
      {
        title: "Editor and writing code",
        items: [
          { name: "VS Code", note: "Primary environment. Both repositories commit .vscode/settings.json, so the setup travels with the project." },
          { name: "Cursor", note: "Used on the graduation project — the repository carries a .cursorrules defining code style, folder organisation and what not to do." },
          { name: "Prettier", note: "printWidth 140, proseWrap always, double quotes, with the JSON sorting plugin." },
          { name: "ESLint", note: "Through eslint-config-next on the Next.js projects." },
        ],
      },
      {
        title: "Front end",
        items: [
          { name: "Next.js (App Router)", note: "This portfolio and the graduation project. Internationalised routes, static generation and per-locale metadata." },
          { name: "React", note: "18 on the ERP and on this site; 19 on the graduation project." },
          { name: "Vite", note: "Builds the ERP front end. Chosen for dev-server speed on a project with no SSR." },
          { name: "TypeScript", note: "On this portfolio and the graduation project. The ERP is JavaScript — written before I adopted TS, and migrating it now would be cost with no clear return." },
          { name: "Tailwind CSS", note: "All three projects, always with custom tokens rather than the default palette." },
          { name: "Framer Motion", note: "This portfolio only. Internal systems do not get scroll animations." },
          { name: "lucide-react · Heroicons", note: "Icons. lucide across all three, Heroicons on the ERP because it was already there." },
        ],
      },
      {
        title: "Back end and data",
        items: [
          { name: "Node.js 20 · Express", note: "The ERP API. Express because the problem was CRUD with rules, not streaming." },
          { name: "Prisma", note: "The single database access layer. It is what turned the SQLite to PostgreSQL move into a schema change rather than a rewrite." },
          { name: "PostgreSQL (Neon)", note: "The ERP's production database." },
          { name: "Firebase Firestore", note: "Internal chat and the audit and stock-count screens, with onSnapshot for live updates." },
          { name: "JWT · bcryptjs", note: "Authentication and password hashing on the API." },
          { name: "Chart.js · xlsx", note: "Dashboard charts and spreadsheet export — because part of the operation still wants the file." },
        ],
      },
      {
        title: "Deployment and infrastructure",
        items: [
          { name: "Vercel", note: "This portfolio." },
          { name: "Netlify", note: "The ERP front end, with _redirects handling SPA routing." },
          { name: "Render", note: "The ERP API. Free tier, which means a cold start on the first request of the day." },
          { name: "GitHub Actions", note: "Present in the repositories — and, on the graduation project, a reminder that a CI file is not the same as having CI." },
        ],
      },
      {
        title: "Automation on this site",
        intro: "This portfolio generates its own assets rather than depending on loose files:",
        items: [
          { name: "Puppeteer", note: "Two scripts: one renders the trilingual resume PDFs from the page itself, the other generates the og-image and the manifest icons." },
          { name: "next/font", note: "Inter and JetBrains Mono self-hosted at build time, with no external request at runtime." },
        ],
      },
      {
        title: "Design",
        items: [
          { name: "Figma", note: "Prototypes, flows, and the material for the Zenith rebranding." },
        ],
      },
    ],
    metaTitle: "What I use — tools and setup",
    metaDesc: "The tools that actually appear in Benjamin Maciel's repositories: editor, front end, back end, data, deployment and automation.",
  },
  es: {
    eyebrow: "Setup",
    title: "Lo que uso",
    lead: "Herramientas que aparecen de verdad en mis repositorios, no una lista aspiracional. Si está aquí, hay un archivo de configuración o una dependencia que lo prueba.",
    back: "← Portafolio",
    hRegret: "Una configuración de la que me arrepiento",
    regret:
      "En el repositorio del proyecto de graduación, .vscode/settings.json apaga todo: validación de TypeScript, ESLint, validación de JSON y el panel de problemas. Lo hice cuando el editor se puso demasiado ruidoso y yo quería terminar una pantalla. El efecto secundario es que los errores siguieron existiendo: solo dejé de verlos. Hoy trato el ruido del linter como un bug de mi setup, no como algo que silenciar.",
    hHardware: "Hardware",
    hardware: "{{PREENCHER: máquina, processador, memória, monitores, teclado, headset. Se preferir não expor, apague esta seção inteira.}}",
    groups: [
      {
        title: "Editor y escritura de código",
        items: [
          { name: "VS Code", note: "Entorno principal. Ambos repositorios versionan .vscode/settings.json, así que el setup viaja con el proyecto." },
          { name: "Cursor", note: "Usado en el proyecto de graduación — el repositorio tiene un .cursorrules que define estilo de código, organización de carpetas y qué no hacer." },
          { name: "Prettier", note: "printWidth 140, proseWrap always, comillas dobles, con el plugin de ordenación de JSON." },
          { name: "ESLint", note: "Vía eslint-config-next en los proyectos Next.js." },
        ],
      },
      {
        title: "Front-end",
        items: [
          { name: "Next.js (App Router)", note: "Este portafolio y el proyecto de graduación. Rutas internacionalizadas, generación estática y metadata por idioma." },
          { name: "React", note: "18 en el ERP y en este sitio; 19 en el proyecto de graduación." },
          { name: "Vite", note: "Construye el front-end del ERP. Elegido por velocidad del dev server en un proyecto sin SSR." },
          { name: "TypeScript", note: "En este portafolio y en el proyecto de graduación. El ERP es JavaScript: se escribió antes de que adoptara TS, y migrarlo hoy sería costo sin retorno claro." },
          { name: "Tailwind CSS", note: "En los tres proyectos, siempre con tokens propios en vez de la paleta por defecto." },
          { name: "Framer Motion", note: "Solo en este portafolio. Un sistema interno no lleva animaciones de scroll." },
          { name: "lucide-react · Heroicons", note: "Iconos. lucide en los tres, Heroicons en el ERP porque ya estaba." },
        ],
      },
      {
        title: "Back-end y datos",
        items: [
          { name: "Node.js 20 · Express", note: "La API del ERP. Express porque el problema era CRUD con reglas, no streaming." },
          { name: "Prisma", note: "La única capa de acceso a la base. Es lo que convirtió la migración de SQLite a PostgreSQL en un cambio de schema y no en una reescritura." },
          { name: "PostgreSQL (Neon)", note: "Base de datos de producción del ERP." },
          { name: "Firebase Firestore", note: "Chat interno y las pantallas de auditoría y conteo, con onSnapshot para tiempo real." },
          { name: "JWT · bcryptjs", note: "Autenticación y hash de contraseñas en la API." },
          { name: "Chart.js · xlsx", note: "Gráficos del dashboard y exportación a planilla, porque parte de la operación todavía quiere el archivo." },
        ],
      },
      {
        title: "Despliegue e infraestructura",
        items: [
          { name: "Vercel", note: "Este portafolio." },
          { name: "Netlify", note: "Front-end del ERP, con _redirects para el ruteo de la SPA." },
          { name: "Render", note: "API del ERP. Plan gratuito, lo que implica arranque en frío en el primer acceso del día." },
          { name: "GitHub Actions", note: "Presente en los repositorios — y, en el de graduación, un recordatorio de que un archivo de CI no es lo mismo que tener CI." },
        ],
      },
      {
        title: "Automatización en este sitio",
        intro: "Este portafolio genera sus propios assets en vez de depender de archivos sueltos:",
        items: [
          { name: "Puppeteer", note: "Dos scripts: uno renderiza los PDFs trilingües del currículum desde la propia página, el otro genera el og-image y los iconos del manifest." },
          { name: "next/font", note: "Inter y JetBrains Mono self-hosted en el build, sin petición externa en runtime." },
        ],
      },
      {
        title: "Diseño",
        items: [
          { name: "Figma", note: "Prototipos, flujos y el material del rebranding de Zenith." },
        ],
      },
    ],
    metaTitle: "Lo que uso — herramientas y setup",
    metaDesc: "Las herramientas que aparecen de verdad en los repositorios de Benjamin Maciel: editor, front-end, back-end, datos, despliegue y automatización.",
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
      canonical: `${SITE_URL}/${lang}/uses`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}/${l}/uses`])),
    },
    openGraph: { title: c.metaTitle, description: c.metaDesc, url: `${SITE_URL}/${lang}/uses` },
  };
}

export default function UsesPage({ params }: { params: { lang: string } }) {
  const lang = pick(params.lang);
  const c = COPY[lang];

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-[820px]">
        <Breadcrumbs lang={lang} crumbs={[{ label: CRUMB[lang] }]} />

        <header className="mb-14 mt-8 border-b border-white/[0.07] pb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#00d4ff]">{c.eyebrow}</p>
          <h1 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl">{c.title}</h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-[#8b949e]">{c.lead}</p>
        </header>

        <div className="flex flex-col gap-14">
          {c.groups.map((g) => (
            <section key={g.title} aria-labelledby={g.title}>
              <h2 id={g.title} className="mb-2 text-2xl font-bold tracking-[-0.02em] text-white">
                {g.title}
              </h2>
              {g.intro && <p className="mb-5 leading-relaxed text-[#8b949e]">{g.intro}</p>}
              <dl className="mt-5 flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {g.items.map((it) => (
                  <div key={it.name} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                    <dt className="font-mono text-sm font-semibold text-[#00d4ff]">{it.name}</dt>
                    <dd className="leading-[1.7] text-[#8b949e]">{it.note}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <section aria-labelledby="regret-h">
            <h2 id="regret-h" className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
              {c.hRegret}
            </h2>
            <p className="rounded-xl border-l-2 border-[#fbbf24] bg-[rgba(251,191,36,0.05)] px-5 py-4 leading-[1.75] text-[#c9d1d9]">
              {c.regret}
            </p>
          </section>

          <section aria-labelledby="hw-h">
            <h2 id="hw-h" className="mb-4 text-2xl font-bold tracking-[-0.02em] text-white">
              {c.hHardware}
            </h2>
            <p className="leading-[1.75] text-[#8b949e]">{c.hardware}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
