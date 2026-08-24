import Link from "next/link";
import { Breadcrumbs } from "@/components/site/PageShell";
import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const CRUMB = { pt: "Como eu trabalho", en: "How I work", es: "Cómo trabajo" } as const;

const LANGS: Lang[] = ["pt", "en", "es"];
const pick = (p: string) => (LANGS.includes(p as Lang) ? (p as Lang) : "pt");

type Principle = { n: string; title: string; body: string[]; evidence: string; href?: string };

const COPY: Record<Lang, {
  eyebrow: string; title: string; lead: string; back: string;
  evidenceLabel: string; items: Principle[]; closing: string;
  metaTitle: string; metaDesc: string;
}> = {
  pt: {
    eyebrow: "Como eu trabalho",
    title: "Seis coisas em que eu acredito, e onde elas aparecem no código",
    lead: "Princípio sem evidência é slogan. Cada um destes veio de uma decisão que eu tomei num sistema em produção, e cada um aponta para onde a decisão está escrita.",
    back: "← Portfólio",
    evidenceLabel: "Onde isso aparece",
    closing:
      "Nenhum destes é regra universal. São o que eu aprendi construindo sistemas internos para uma operação que não pode parar, com um usuário que não escolheu usar software. Num contexto diferente — produto de consumo, escala grande, time grande — vários deles mudariam.",
    items: [
      {
        n: "01",
        title: "Todo número precisa de uma linha atrás dele",
        body: [
          "O estoque não é um campo que alguém edita. É um saldo que só se move porque uma movimentação foi registrada, com quem, quando e por quê.",
          "Isso não é purismo de auditoria. É o que separa o sistema das planilhas que ele substituiu: naquelas, o número mudava e ninguém sabia quem tinha mudado. Um número sem explicação não é informação, é rumor.",
        ],
        evidence: "routes/movements.js — a movimentação e o saldo são escritos em prisma.$transaction, e o saldo negativo é recusado antes de qualquer escrita.",
        href: "/notas/saldo-armazenado-ou-somado",
      },
      {
        n: "02",
        title: "Modelar o que existe, não o que seria elegante",
        body: [
          "A cubagem não virou uma fórmula porque não era uma fórmula: era uma tabela que a empresa mediu ao longo de anos. Os papéis de acesso não viraram admin/user/guest porque a empresa já tinha nomes para as pessoas.",
          "A tentação de normalizar é forte, e quase sempre custa mais do que economiza. Uma abstração que não corresponde ao mundo real vira um lugar onde exceções se acumulam.",
        ],
        evidence: "Cubagem.jsx guarda a tabela oficial como regras; users.js usa EXPEDICAO, COMPRAS, COMERCIAL — os nomes do organograma.",
        href: "/notas/cubagem-tabela-de-regras",
      },
      {
        n: "03",
        title: "O estado seguro é nenhum acesso",
        body: [
          "Conta nova nasce como VISITANTE: não é um papel com poucas permissões, é um papel sem nenhuma. Alguém precisa conceder deliberadamente.",
          "O padrão oposto — dar um acesso básico e ir restringindo — falha em silêncio. Ninguém percebe uma permissão a mais; todo mundo percebe uma permissão a menos, e vem pedir.",
        ],
        evidence: "O papel padrão no schema é VISITANTE, e o endpoint de contatos do chat filtra role: { not: 'VISITANTE' }.",
        href: "/notas/papeis-copiados-do-organograma",
      },
      {
        n: "04",
        title: "O erro é para a pessoa ler, não para o log",
        body: [
          "Quando o acesso é negado fora do horário comercial, a resposta não é um booleano nem um 403 mudo. É uma frase: na sexta-feira o acesso é das 07:00 às 16:00.",
          "Um sistema que recusa sem explicar transfere o trabalho para um colega — a pessoa bloqueada vai perguntar para alguém. Uma frase de dez palavras no lugar certo economiza uma conversa por vez, todos os dias.",
        ],
        evidence: "businessHours.js devolve { ok: false, reason } em português, não um booleano.",
        href: "/notas/horario-comercial-como-resposta-http",
      },
      {
        n: "05",
        title: "Configuração que não executa é decoração",
        body: [
          "Descobri isso relendo meu próprio repositório: um workflow de CI apontando para uma branch que não existe, um Dockerfile copiando uma pasta que foi removida. Arquivos que pareciam infraestrutura e nunca rodaram uma vez.",
          "Um repositório sem CI é honesto. Um repositório com CI quebrado afirma uma garantia que não tem — e é pior justamente porque parece melhor.",
        ],
        evidence: "ci.yml do TCC dispara em main; a única branch é master. O Dockerfile copia prisma/ e pnpm-lock.yaml, que não existem.",
        href: "/notas/andaime-que-nunca-rodou",
      },
      {
        n: "06",
        title: "Comprar o problema difícil quando ele não é o seu problema",
        body: [
          "O chat interno precisava de presença, ordenação, reenvio e entrega offline. Nada disso é o negócio de uma indústria de lacres, e nada disso é fácil.",
          "Então o chat foi para o Firestore, e eu paguei o preço declarado: duas autenticações no mesmo produto. Ainda vale — porque o tempo que eu não gastei reimplementando WebSocket foi gasto na cubagem, que é a parte que só eu podia construir.",
        ],
        evidence: "Chat em Firestore com Firebase Auth, ao lado da API Express com JWT. O custo está registrado no ADR-005.",
        href: "/notas/onde-o-sistema-mora",
      },
    ],
    metaTitle: "Como eu trabalho — princípios de engenharia",
    metaDesc: "Seis princípios de engenharia de Benjamin Maciel, cada um ligado à decisão real, em código de produção, que o originou.",
  },
  en: {
    eyebrow: "How I work",
    title: "Six things I believe, and where they show up in the code",
    lead: "A principle without evidence is a slogan. Each of these came out of a decision I made in a production system, and each points at where that decision is written down.",
    back: "← Portfolio",
    evidenceLabel: "Where this shows up",
    closing:
      "None of these is a universal rule. They are what I learned building internal systems for an operation that cannot stop, for users who did not choose to use software. In a different context — consumer product, large scale, large team — several of them would change.",
    items: [
      {
        n: "01",
        title: "Every number needs a row behind it",
        body: [
          "Stock is not a field anyone edits. It is a balance that moves only because a movement was recorded, with who, when and why.",
          "This is not audit purism. It is what separates the system from the spreadsheets it replaced: there, the number changed and nobody knew who had changed it. A number with no explanation is not information, it is rumour.",
        ],
        evidence: "routes/movements.js — the movement and the balance are written inside prisma.$transaction, and a negative balance is refused before any write.",
        href: "/notas/saldo-armazenado-ou-somado",
      },
      {
        n: "02",
        title: "Model what exists, not what would be elegant",
        body: [
          "Cubic weight did not become a formula because it was not a formula: it was a table the company measured over years. Access roles did not become admin/user/guest because the company already had names for its people.",
          "The urge to normalise is strong, and it almost always costs more than it saves. An abstraction that does not match the real world becomes the place where exceptions pile up.",
        ],
        evidence: "Cubagem.jsx keeps the official table as rules; users.js uses EXPEDICAO, COMPRAS, COMERCIAL — the names on the org chart.",
        href: "/notas/cubagem-tabela-de-regras",
      },
      {
        n: "03",
        title: "The safe state is no access",
        body: [
          "A new account starts as VISITANTE: not a role with few permissions, a role with none. Someone has to grant deliberately.",
          "The opposite pattern — give a basic level and restrict from there — fails silently. Nobody notices one permission too many; everybody notices one too few, and comes to ask.",
        ],
        evidence: "The default role in the schema is VISITANTE, and the chat contacts endpoint filters role: { not: 'VISITANTE' }.",
        href: "/notas/papeis-copiados-do-organograma",
      },
      {
        n: "04",
        title: "The error is for the person, not for the log",
        body: [
          "When access is denied outside business hours, the answer is not a boolean or a silent 403. It is a sentence: on Friday, access runs from 07:00 to 16:00.",
          "A system that refuses without explaining hands the work to a colleague — the blocked person goes and asks someone. Ten words in the right place saves one conversation at a time, every day.",
        ],
        evidence: "businessHours.js returns { ok: false, reason } in Portuguese, not a boolean.",
        href: "/notas/horario-comercial-como-resposta-http",
      },
      {
        n: "05",
        title: "Configuration that does not execute is decoration",
        body: [
          "I found this out re-reading my own repository: a CI workflow targeting a branch that does not exist, a Dockerfile copying a folder that was removed. Files that looked like infrastructure and never ran once.",
          "A repository with no CI is honest. A repository with broken CI asserts a guarantee it does not have — and it is worse precisely because it looks better.",
        ],
        evidence: "The graduation project's ci.yml triggers on main; the only branch is master. The Dockerfile copies prisma/ and pnpm-lock.yaml, neither of which exists.",
        href: "/notas/andaime-que-nunca-rodou",
      },
      {
        n: "06",
        title: "Buy the hard problem when it is not your problem",
        body: [
          "Internal chat needed presence, ordering, retries and offline delivery. None of that is the business of a sealing manufacturer, and none of it is easy.",
          "So chat went to Firestore, and I paid the stated price: two authentication systems in one product. It still holds — because the time I did not spend reimplementing WebSocket went into the cubagem module, which is the part only I could build.",
        ],
        evidence: "Chat on Firestore with Firebase Auth, beside the Express API with JWT. The cost is recorded in ADR-005.",
        href: "/notas/onde-o-sistema-mora",
      },
    ],
    metaTitle: "How I work — engineering principles",
    metaDesc: "Six engineering principles from Benjamin Maciel, each tied to the real decision, in production code, that produced it.",
  },
  es: {
    eyebrow: "Cómo trabajo",
    title: "Seis cosas en las que creo, y dónde aparecen en el código",
    lead: "Un principio sin evidencia es un eslogan. Cada uno de estos salió de una decisión que tomé en un sistema en producción, y cada uno apunta a dónde está escrita esa decisión.",
    back: "← Portafolio",
    evidenceLabel: "Dónde aparece esto",
    closing:
      "Ninguno de estos es una regla universal. Son lo que aprendí construyendo sistemas internos para una operación que no puede parar, con usuarios que no eligieron usar software. En otro contexto — producto de consumo, gran escala, equipo grande — varios cambiarían.",
    items: [
      {
        n: "01",
        title: "Todo número necesita una fila detrás",
        body: [
          "El stock no es un campo que alguien edita. Es un saldo que solo se mueve porque se registró un movimiento, con quién, cuándo y por qué.",
          "No es purismo de auditoría. Es lo que separa al sistema de las planillas que reemplazó: ahí el número cambiaba y nadie sabía quién lo había cambiado. Un número sin explicación no es información, es rumor.",
        ],
        evidence: "routes/movements.js — el movimiento y el saldo se escriben dentro de prisma.$transaction, y un saldo negativo se rechaza antes de escribir.",
        href: "/notas/saldo-armazenado-ou-somado",
      },
      {
        n: "02",
        title: "Modelar lo que existe, no lo que sería elegante",
        body: [
          "La cubicación no se volvió fórmula porque no era una fórmula: era una tabla que la empresa midió durante años. Los roles no se volvieron admin/user/guest porque la empresa ya tenía nombres para su gente.",
          "La tentación de normalizar es fuerte y casi siempre cuesta más de lo que ahorra. Una abstracción que no coincide con el mundo real se vuelve el lugar donde se acumulan las excepciones.",
        ],
        evidence: "Cubagem.jsx guarda la tabla oficial como reglas; users.js usa EXPEDICAO, COMPRAS, COMERCIAL — los nombres del organigrama.",
        href: "/notas/cubagem-tabela-de-regras",
      },
      {
        n: "03",
        title: "El estado seguro es ningún acceso",
        body: [
          "Una cuenta nueva nace como VISITANTE: no es un rol con pocos permisos, es un rol sin ninguno. Alguien tiene que conceder deliberadamente.",
          "El patrón opuesto — dar un nivel básico e ir restringiendo — falla en silencio. Nadie nota un permiso de más; todos notan uno de menos, y vienen a pedirlo.",
        ],
        evidence: "El rol por defecto en el schema es VISITANTE, y el endpoint de contactos filtra role: { not: 'VISITANTE' }.",
        href: "/notas/papeis-copiados-do-organograma",
      },
      {
        n: "04",
        title: "El error es para que lo lea la persona, no el log",
        body: [
          "Cuando se niega el acceso fuera del horario comercial, la respuesta no es un booleano ni un 403 mudo. Es una frase: el viernes el acceso es de 07:00 a 16:00.",
          "Un sistema que rechaza sin explicar traslada el trabajo a un colega: la persona bloqueada va a preguntarle a alguien. Diez palabras en el lugar correcto ahorran una conversación por vez, todos los días.",
        ],
        evidence: "businessHours.js devuelve { ok: false, reason } en portugués, no un booleano.",
        href: "/notas/horario-comercial-como-resposta-http",
      },
      {
        n: "05",
        title: "La configuración que no se ejecuta es decoración",
        body: [
          "Lo descubrí releyendo mi propio repositorio: un workflow de CI apuntando a una rama que no existe, un Dockerfile copiando una carpeta que fue eliminada. Archivos que parecían infraestructura y nunca corrieron una vez.",
          "Un repositorio sin CI es honesto. Un repositorio con CI roto afirma una garantía que no tiene, y es peor justamente porque parece mejor.",
        ],
        evidence: "El ci.yml del proyecto de graduación dispara en main; la única rama es master. El Dockerfile copia prisma/ y pnpm-lock.yaml, que no existen.",
        href: "/notas/andaime-que-nunca-rodou",
      },
      {
        n: "06",
        title: "Comprar el problema difícil cuando no es tu problema",
        body: [
          "El chat interno necesitaba presencia, ordenación, reintentos y entrega offline. Nada de eso es el negocio de una industria de precintos, y nada de eso es fácil.",
          "Así que el chat fue a Firestore y pagué el precio declarado: dos autenticaciones en el mismo producto. Sigue valiendo, porque el tiempo que no gasté reimplementando WebSocket se fue al módulo de cubicación, que es la parte que solo yo podía construir.",
        ],
        evidence: "Chat en Firestore con Firebase Auth, junto a la API Express con JWT. El costo está registrado en el ADR-005.",
        href: "/notas/onde-o-sistema-mora",
      },
    ],
    metaTitle: "Cómo trabajo — principios de ingeniería",
    metaDesc: "Seis principios de ingeniería de Benjamin Maciel, cada uno ligado a la decisión real, en código de producción, que lo originó.",
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
      canonical: `${SITE_URL}/${lang}/como-trabalho`,
      languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}/${l}/como-trabalho`])),
    },
    openGraph: { title: c.metaTitle, description: c.metaDesc, url: `${SITE_URL}/${lang}/como-trabalho` },
  };
}

export default function PrinciplesPage({ params }: { params: { lang: string } }) {
  const lang = pick(params.lang);
  const c = COPY[lang];

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-[780px]">
        <Breadcrumbs lang={lang} crumbs={[{ label: CRUMB[lang] }]} />

        <header className="mb-16 mt-8 border-b border-white/[0.07] pb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#00d4ff]">{c.eyebrow}</p>
          <h1 className="text-3xl font-black leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl">{c.title}</h1>
          <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-[#8b949e]">{c.lead}</p>
        </header>

        <ol className="flex flex-col gap-14">
          {c.items.map((p) => (
            <li key={p.n}>
              <article>
                <div className="mb-3 flex items-baseline gap-4">
                  <span className="font-mono text-sm font-bold text-[#00d4ff]">{p.n}</span>
                  <h2 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-white">{p.title}</h2>
                </div>
                {p.body.map((para) => (
                  <p key={para.slice(0, 24)} className="mb-4 leading-[1.75] text-[#c9d1d9]">
                    {para}
                  </p>
                ))}
                <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#4d5866]">
                    {c.evidenceLabel}
                  </p>
                  <p className="text-sm leading-[1.7] text-[#8b949e]">{p.evidence}</p>
                  {p.href && (
                    <Link
                      href={`/${lang}${p.href}`}
                      className="mt-3 inline-block font-mono text-xs text-[#00d4ff] hover:underline"
                    >
                      →
                    </Link>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ol>

        <footer className="mt-16 border-t border-white/[0.07] pt-8">
          <p className="leading-[1.75] text-[#8b949e]">{c.closing}</p>
        </footer>
      </div>
    </main>
  );
}
