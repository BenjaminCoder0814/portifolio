import Link from "next/link";
import type { Metadata } from "next";
import PageShell, { LANGS, pickLang, altsFor } from "@/components/site/PageShell";

type QA = { q: string; a: string };

const COPY = {
  pt: {
    eyebrow: "FAQ",
    crumb: "FAQ",
    title: "Perguntas que recrutador faz antes da primeira conversa",
    lead: "Respostas curtas e honestas. Onde a resposta depende de uma decisão que eu ainda não tomei, está escrito que depende.",
    contact: "Falar comigo",
    items: [
      { q: "Onde você mora e trabalha remoto?", a: "São Paulo, Brasil. Trabalho remoto sem problema, e estou aberto a realocação — incluindo fora do país." },
      { q: "Que tipo de vaga você procura?", a: "Software Engineer, júnior ou estágio, com foco em front-end mas confortável indo até o banco. Remoto ou presencial em São Paulo, incluindo posições internacionais." },
      { q: "Qual é a sua senioridade de verdade?", a: "Três anos construindo software que está em produção e em uso diário, mas sem nunca ter trabalhado em time de engenharia. Sei especificar, construir e manter sozinho; não sei ainda como é revisar código de outra pessoa toda semana, e é justamente isso que eu quero aprender." },
      { q: "Qual é a sua stack principal?", a: "React, Next.js e TypeScript no front; Node.js com Express, Prisma e PostgreSQL no back. Firestore quando o problema é tempo real. A página de stack tem o nível autoavaliado de cada uma, com a régua declarada." },
      { q: "Dá para ver o código?", a: "Dá, e é o ponto. O ERP está em github.com/BenjaminCoder0814/estoque-pro e o TCC em TCC-MUSCLE-LEVELS, ambos públicos. Cada nota técnica deste site aponta para o arquivo específico que ela discute." },
      { q: "Que idiomas você fala?", a: "Português nativo, inglês avançado e espanhol intermediário. Este site inteiro existe nos três, escrito — não traduzido automaticamente." },
      { q: "Você está estudando?", a: "Duas graduações em paralelo, ambas iniciadas em 2026: Ciência da Computação na University of the People (online, EUA) e Sistemas de Informação no UNASP. O técnico em TI foi concluído em 2025." },
      { q: "Por que tem um projeto de branding num portfólio de engenharia?", a: "Porque é o projeto que explica os outros. Foi fotografando o catálogo produto por produto que eu aprendi o domínio que depois virou o modelo de dados do ERP. Quando propus construir o sistema, eu não estava adivinhando como a operação funcionava." },
      { q: "Você usa IA para programar?", a: "Uso, e não escondo. Uso para acelerar o que é mecânico e para revisar o que eu escrevi. O limite que eu me imponho é simples: não vai para produção código que eu não consiga explicar linha por linha numa entrevista. Se eu não entendi, não entrou." },
      { q: "Qual a sua disponibilidade para começar?", a: "{{PREENCHER: prazo real — imediato, 15 dias, 30 dias?}}" },
      { q: "Você prefere CLT ou PJ?", a: "{{PREENCHER: sua preferência de modelo de contratação.}}" },
      { q: "Qual é a sua pretensão salarial?", a: "{{PREENCHER: decida se quer expor faixa. Se não quiser, algo como 'aberto a conversar a partir do escopo da vaga' resolve.}}" },
    ],
    metaTitle: "FAQ para recrutadores",
    metaDesc: "Disponibilidade, senioridade, stack, idiomas e o que Benjamin Maciel procura numa vaga — respondido antes da primeira conversa.",
  },
  en: {
    eyebrow: "FAQ",
    crumb: "FAQ",
    title: "Questions recruiters ask before a first conversation",
    lead: "Short, honest answers. Where the answer depends on a decision I have not made yet, it says so.",
    contact: "Get in touch",
    items: [
      { q: "Where are you based, and do you work remotely?", a: "São Paulo, Brazil. Remote is not a problem, and I am open to relocation — including outside the country." },
      { q: "What kind of role are you looking for?", a: "Software Engineer, junior or internship, front-end focused but comfortable going all the way to the database. Remote or on-site in São Paulo, including international positions." },
      { q: "What is your seniority, honestly?", a: "Three years building software that is in production and in daily use, but never having worked inside an engineering team. I can specify, build and maintain on my own; what I do not yet know is what it is like to review someone else's code every week, and that is exactly what I want to learn." },
      { q: "What is your main stack?", a: "React, Next.js and TypeScript on the front; Node.js with Express, Prisma and PostgreSQL on the back. Firestore when the problem is real-time. The stack page has a self-assessed level for each, against a stated scale." },
      { q: "Can I see the code?", a: "Yes, and that is the point. The ERP is at github.com/BenjaminCoder0814/estoque-pro and the graduation project at TCC-MUSCLE-LEVELS, both public. Every engineering note on this site points at the specific file it discusses." },
      { q: "Which languages do you speak?", a: "Portuguese natively, English at an advanced level and Spanish at an intermediate one. This entire site exists in all three — written, not machine-translated." },
      { q: "Are you studying?", a: "Two degrees in parallel, both started in 2026: Computer Science at University of the People (online, USA) and Information Systems at UNASP. The technical IT diploma was completed in 2025." },
      { q: "Why is there a branding project in an engineering portfolio?", a: "Because it is the project that explains the others. Photographing the catalogue product by product is how I learned the domain that later became the ERP's data model. When I proposed building the system, I was not guessing at how the operation worked." },
      { q: "Do you use AI to write code?", a: "I do, and I do not hide it. I use it to speed up what is mechanical and to review what I wrote. The limit I hold myself to is simple: nothing ships that I could not explain line by line in an interview. If I did not understand it, it did not go in." },
      { q: "When could you start?", a: "{{PREENCHER: prazo real — imediato, 15 dias, 30 dias?}}" },
      { q: "Do you prefer CLT or PJ?", a: "{{PREENCHER: sua preferência de modelo de contratação.}}" },
      { q: "What are your salary expectations?", a: "{{PREENCHER: decida se quer expor faixa. Se não quiser, algo como 'open to discussing based on the scope of the role' resolve.}}" },
    ],
    metaTitle: "FAQ for recruiters",
    metaDesc: "Availability, seniority, stack, languages and what Benjamin Maciel is looking for — answered before the first conversation.",
  },
  es: {
    eyebrow: "FAQ",
    crumb: "FAQ",
    title: "Preguntas que los reclutadores hacen antes de la primera conversación",
    lead: "Respuestas cortas y honestas. Donde la respuesta depende de una decisión que todavía no tomé, está escrito que depende.",
    contact: "Hablar conmigo",
    items: [
      { q: "¿Dónde vives y trabajas en remoto?", a: "São Paulo, Brasil. El trabajo remoto no es problema, y estoy abierto a reubicación, incluso fuera del país." },
      { q: "¿Qué tipo de puesto buscas?", a: "Software Engineer, junior o prácticas, con foco en front-end pero cómodo llegando hasta la base de datos. Remoto o presencial en São Paulo, incluidas posiciones internacionales." },
      { q: "¿Cuál es tu seniority, honestamente?", a: "Tres años construyendo software que está en producción y en uso diario, pero sin haber trabajado nunca dentro de un equipo de ingeniería. Sé especificar, construir y mantener solo; lo que todavía no sé es cómo es revisar el código de otra persona cada semana, y es justamente lo que quiero aprender." },
      { q: "¿Cuál es tu stack principal?", a: "React, Next.js y TypeScript en el front; Node.js con Express, Prisma y PostgreSQL en el back. Firestore cuando el problema es tiempo real. La página de stack tiene el nivel autoevaluado de cada una, con la vara declarada." },
      { q: "¿Se puede ver el código?", a: "Sí, y ese es el punto. El ERP está en github.com/BenjaminCoder0814/estoque-pro y el proyecto de graduación en TCC-MUSCLE-LEVELS, ambos públicos. Cada nota técnica de este sitio apunta al archivo específico que discute." },
      { q: "¿Qué idiomas hablas?", a: "Portugués nativo, inglés avanzado y español intermedio. Este sitio entero existe en los tres, escrito y no traducido automáticamente." },
      { q: "¿Estás estudiando?", a: "Dos carreras en paralelo, ambas iniciadas en 2026: Ciencias de la Computación en University of the People (online, EE.UU.) y Sistemas de Información en UNASP. El técnico en TI se concluyó en 2025." },
      { q: "¿Por qué hay un proyecto de branding en un portafolio de ingeniería?", a: "Porque es el proyecto que explica a los demás. Fotografiando el catálogo producto por producto aprendí el dominio que después se volvió el modelo de datos del ERP. Cuando propuse construir el sistema, no estaba adivinando cómo funcionaba la operación." },
      { q: "¿Usas IA para programar?", a: "Sí, y no lo escondo. La uso para acelerar lo mecánico y para revisar lo que escribí. El límite que me impongo es simple: no va a producción código que no pueda explicar línea por línea en una entrevista. Si no lo entendí, no entró." },
      { q: "¿Cuál es tu disponibilidad para empezar?", a: "{{PREENCHER: prazo real — imediato, 15 dias, 30 dias?}}" },
      { q: "¿Prefieres CLT o PJ?", a: "{{PREENCHER: sua preferência de modelo de contratação.}}" },
      { q: "¿Cuáles son tus expectativas salariales?", a: "{{PREENCHER: decida se quer expor faixa.}}" },
    ],
    metaTitle: "FAQ para reclutadores",
    metaDesc: "Disponibilidad, seniority, stack, idiomas y qué busca Benjamin Maciel en un puesto — respondido antes de la primera conversación.",
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
    alternates: altsFor(lang, "/faq"),
    openGraph: { title: c.metaTitle, description: c.metaDesc },
  };
}

export default function FaqPage({ params }: { params: { lang: string } }) {
  const lang = pickLang(params.lang);
  const c = COPY[lang];

  return (
    <>
      {/* Only answered questions go into the structured data — publishing a
          {{PREENCHER}} marker as an accepted answer would be worse than
          omitting the question entirely. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: lang,
            mainEntity: (c.items as readonly QA[])
              .filter((f) => !f.a.includes("PREENCHER"))
              .map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
          }),
        }}
      />

      <PageShell
        lang={lang}
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        crumbs={[{ label: c.crumb }]}
        width="760px"
        footer={
          <Link href={`/${lang}/contato`} className="font-mono text-sm text-[#00d4ff] hover:underline">
            {c.contact} →
          </Link>
        }
      >
        <dl className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {(c.items as readonly QA[]).map((f) => (
            <div key={f.q} className="py-6">
              <dt className="mb-2 text-lg font-bold text-white">{f.q}</dt>
              <dd className="leading-[1.75] text-[#c9d1d9]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </PageShell>
    </>
  );
}
