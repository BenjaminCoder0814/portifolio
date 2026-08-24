import type { Lang } from "@/lib/i18n";
import type { Block } from "@/content/notas";

/**
 * Case studies.
 *
 * Same rule as the notes: every technical claim here is traceable to a file in
 * a public repository. Where a number or a detail would have to be invented,
 * there is a {{PREENCHER}} marker instead — an honest gap survives an
 * interview, a plausible invention does not.
 */

export type CaseStudy = {
  slug: string;
  year: string;
  status: Record<Lang, string>;
  tone: "cyan" | "green" | "purple" | "amber";
  stack: string[];
  repo?: string;
  demo?: string;
  deepDive?: string;
  metrics: { v: string; l: Record<Lang, string> }[];
  title: Record<Lang, string>;
  dek: Record<Lang, string>;
  body: Record<Lang, Block[]>;
};

const MOVEMENT_TX = `const [movement] = await prisma.$transaction([
  prisma.movement.create({
    data: { productId: product.id, userId: req.user?.id ?? null, type, quantity: q },
  }),
  prisma.product.update({
    where: { id: product.id },
    data:  { stockCurrent: nextStock },
  }),
]);`;

const CUBAGEM = `for (const emb of fonte) {
  for (const r of emb.regras) {
    if (r.material !== material)               continue;
    if (!r.modelos.includes(modelo))           continue;
    if (!r.tamanhos.includes(Number(tamanho))) continue;
    resultados.push({ embalagemNome: emb.nome, maxPecas: r.maxPecas,
                      qtdEmbalagens: Math.ceil(qtd / r.maxPecas) });
    break;
  }
}`;

const CONTENT_TREE = `content/
├── about/          en · es · fr · pt · ru · zh-CN
├── privacy-policy/ en · es · fr · pt · ru · zh-CN
├── sales-terms/    en · es · fr · pt · ru · zh-CN
└── terms/          en · es · fr · pt · ru · zh-CN`;

const SITE_URL_RESOLUTION = `function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return \`https://\${vercel}\`;

  return "http://localhost:3000";
}`;

export const caseStudies: CaseStudy[] = [
  /* ─────────────────────────────────────────────────────────────── ERP ── */
  {
    slug: "erp-estoque",
    year: "2025 – 2026",
    tone: "cyan",
    status: { pt: "Em produção", en: "In production", es: "En producción" },
    stack: ["React", "Vite", "Node.js", "Express", "Prisma", "PostgreSQL", "Firebase", "JWT"],
    repo: "https://github.com/BenjaminCoder0814/estoque-pro",
    demo: "https://estoque-sistema.netlify.app/",
    deepDive: "/engineering/erp",
    metrics: [
      { v: "15 min → 30 s", l: { pt: "Tempo de cotação", en: "Price quoting", es: "Tiempo de cotización" } },
      { v: "9", l: { pt: "Perfis de acesso", en: "Access roles", es: "Roles de acceso" } },
      { v: "R$ 0", l: { pt: "Custo de infraestrutura", en: "Infrastructure cost", es: "Costo de infraestructura" } },
    ],
    title: {
      pt: "Plataforma interna Zenith Lacres",
      en: "Zenith Lacres internal platform",
      es: "Plataforma interna Zenith Lacres",
    },
    dek: {
      pt: "O sistema que a operação usa todos os dias: estoque, precificação, chat, portaria, separações e relatórios. Especificado, construído e colocado em produção sozinho.",
      en: "The system the operation runs on every day: inventory, pricing, chat, gatehouse, separations and reporting. Specified, built and shipped solo.",
      es: "El sistema que la operación usa todos los días: inventario, precios, chat, portería, separaciones e informes. Especificado, construido y puesto en producción en solitario.",
    },
    body: {
      pt: [
        { t: "h2", c: "Contexto e problema" },
        { t: "p", c: "A Zenith Lacres é uma indústria de lacres com 22 anos de mercado, e três empresas operando a partir de um mesmo armazém. O controle de estoque vivia em planilhas desconectadas." },
        { t: "p", c: "Isso produzia três falhas que se somavam. A mesma peça aparecia em mais de uma planilha com mais de um número, e ninguém sabia qual estava certo — então as pessoas paravam de confiar e iam contar a prateleira. Uma saída podia acontecer sem registro de quem tirou ou quando. E precificar exigia consultar manualmente a tabela de cubagem, o que levava de 10 a 15 minutos com o cliente esperando no telefone." },
        { t: "p", c: "O detalhe que define o projeto: a operação funcionava. A empresa era lucrativa e as pessoas sabiam o que estavam fazendo. As planilhas não eram sintoma de incompetência — eram um sistema que passou do próprio limite sem ninguém notar o momento exato. Isso muda a régua: software que é apenas melhor em teoria perde para um processo que as pessoas já dominam. Ele precisa ser mais rápido no primeiro dia." },
        { t: "h2", c: "Restrições" },
        { t: "p", c: "Um desenvolvedor. Orçamento de infraestrutura igual a zero — o sistema roda inteiro em planos gratuitos. E os usuários são operadores de armazém e vendedores: não técnicos, e sem disposição para treinar." },
        { t: "h2", c: "Arquitetura" },
        { t: "p", c: "Uma SPA em React sobre uma API REST em Express desacoplada, com PostgreSQL acessado exclusivamente via Prisma. O chat interno — a única superfície que precisa mesmo ser ao vivo — roda no Firestore, e não num canal em tempo real construído por mim." },
        { t: "p", c: "O estoque não é um campo que alguém edita. É um saldo que só se move porque uma movimentação foi registrada, com autor, tipo e motivo. Isso obriga duas escritas a acontecerem juntas:" },
        { t: "code", lang: "backend/src/routes/movements.js", c: MOVEMENT_TX },
        { t: "p", c: "Se a linha entra e o saldo não, o histórico mente. Se o saldo entra e a linha não, o número não tem explicação. A transação é o que impede as duas coisas." },
        { t: "h2", c: "Cubagem: a parte que só quem conhece o negócio constrói" },
        { t: "p", c: "Eu comecei procurando a fórmula de peso cúbico e não havia nenhuma. O que existia era um documento interno com uma tabela medida ao longo de anos: qual embalagem comporta quantas peças de cada modelo e tamanho. Então a tabela virou o modelo, e o cálculo virou casamento de regras:" },
        { t: "code", lang: "frontend/src/pages/Cubagem.jsx", c: CUBAGEM },
        { t: "p", c: "O desempate é onde mora o negócio: menos pacotes ganha, porque frete se cobra por volume — mas no empate prefere-se a embalagem de menor capacidade, porque espaço vazio dentro da caixa é volume que se paga para transportar ar." },
        { t: "h2", c: "Acesso" },
        { t: "p", c: "Os nove perfis não foram inventados: são as áreas do organograma que já existiam — expedição, produção, compras, comercial, central de atendimento, supervisão, diretoria, TI e admin. Ninguém precisa aprender o que seu perfil significa. Conta nova nasce como VISITANTE, sem nenhuma permissão, porque o estado seguro é acesso zero e não acesso parcial." },
        { t: "h2", c: "Resultados" },
        { t: "p", c: "A precificação passou de 10–15 minutos de consulta manual para menos de 30 segundos. O chat interno substituiu uma plataforma paga de mensagens, eliminando uma mensalidade. E o sistema cresceu para além dos três módulos que costumam ser citados: hoje cobre portaria com fila de check-in, separações, ramais, compras, pendências, mídia e relatórios." },
        { t: "note", c: "{{PREENCHER: números adicionais reais — quantos usuários internos ativos, quantos itens cadastrados no catálogo, desde quando está em produção sem interrupção.}}" },
        { t: "h2", c: "O que eu faria diferente" },
        { t: "p", c: "Três coisas, em ordem de importância." },
        { t: "p", c: "A primeira é a atribuição por empresa. O schema não tem tabela de empresa nem coluna de entidade em produto ou movimentação — as três empresas compartilham o sistema, mas a separação é organizacional e não está no modelo de dados. É a maior dívida em aberto, e a migração que a resolve fica mais cara a cada mês." },
        { t: "p", c: "A segunda é padronizar a autorização. Ela é aplicada rota a rota, o que já produziu inconsistência entre módulos; deveria ser uma decisão tomada uma vez, no roteador, com exceções explícitas." },
        { t: "p", c: "A terceira é a auditoria. Existe um modelo AuditLog no schema que nenhuma rota escreve, enquanto a tela de auditoria real lê do Firestore. Ou o modelo passa a ser usado, ou sai do schema — o que não pode é continuar prometendo uma trilha que não existe." },
      ],
      en: [
        { t: "h2", c: "Context and problem" },
        { t: "p", c: "Zenith Lacres is an industrial sealing manufacturer, 22 years in the market, with three companies operating out of a single warehouse. Inventory control lived in disconnected spreadsheets." },
        { t: "p", c: "That produced three compounding failures. The same item appeared in more than one sheet with more than one number, and nobody could tell which was right — so people stopped trusting them and went to count the shelf. Stock could leave with no record of who took it or when. And pricing meant consulting the cubic-weight table by hand, which took 10 to 15 minutes with a customer waiting on the phone." },
        { t: "p", c: "The detail that defines the project: the operation worked. The company was profitable and the people running it knew what they were doing. The spreadsheets were not a symptom of incompetence — they were a system that had scaled past its limits without anyone noticing the moment it did. That sets the bar: software that is merely better in principle loses to a process people already know. It has to be faster on the first day." },
        { t: "h2", c: "Constraints" },
        { t: "p", c: "One developer. An infrastructure budget of zero — the whole system runs on free tiers. And the users are warehouse operators and salespeople: non-technical, and unwilling to be trained." },
        { t: "h2", c: "Architecture" },
        { t: "p", c: "A React SPA over a decoupled Express REST API, with PostgreSQL reached only through Prisma. Internal chat — the one surface that genuinely has to be live — runs on Firestore rather than on a real-time channel I built." },
        { t: "p", c: "Stock is not a field anyone edits. It is a balance that moves only because a movement was recorded, with an author, a type and a reason. That forces two writes to happen together:" },
        { t: "code", lang: "backend/src/routes/movements.js", c: MOVEMENT_TX },
        { t: "p", c: "If the row lands without the balance, the history lies. If the balance lands without the row, the number has no explanation. The transaction is what prevents both." },
        { t: "h2", c: "Cubagem: the part only someone inside the business builds" },
        { t: "p", c: "I started by looking for the cubic-weight formula and there was none. What existed was an internal document holding a table measured over years: which package fits how many pieces of each model and size. So the table became the model, and the calculation became rule matching:" },
        { t: "code", lang: "frontend/src/pages/Cubagem.jsx", c: CUBAGEM },
        { t: "p", c: "The tie-break is where the business lives: fewer packages wins, because freight is billed by volume — but on a tie the smaller-capacity package is preferred, because empty space inside the box is volume you are paying to ship air in." },
        { t: "h2", c: "Access" },
        { t: "p", c: "The nine roles were not invented: they are the divisions that already existed on the org chart — expedição, produção, compras, comercial, central de atendimento, supervisão, diretoria, TI and admin. Nobody has to learn what their role means. A new account starts as VISITANTE with no permissions at all, because the safe state is no access rather than partial access." },
        { t: "h2", c: "Results" },
        { t: "p", c: "Pricing went from 10–15 minutes of manual lookup to under 30 seconds. Internal chat replaced a paid messaging platform, removing a monthly bill. And the system grew well past the three modules usually cited: it now covers a gatehouse check-in queue, separations, phone extensions, purchasing, pending orders, media and reports." },
        { t: "note", c: "{{PREENCHER: números adicionais reais — quantos usuários internos ativos, quantos itens cadastrados no catálogo, desde quando está em produção sem interrupção.}}" },
        { t: "h2", c: "What I would do differently" },
        { t: "p", c: "Three things, in order of importance." },
        { t: "p", c: "The first is per-company attribution. The schema has no company table and no entity column on products or movements — the three companies share the system, but the separation is organisational rather than modelled. It is the largest open debt, and the migration that fixes it gets more expensive every month." },
        { t: "p", c: "The second is standardising authorisation. It is applied route by route, which has already produced inconsistency between modules; it should be one decision taken once, at the router, with explicit exceptions." },
        { t: "p", c: "The third is the audit trail. There is an AuditLog model in the schema that no route writes, while the real audit screen reads from Firestore. Either the model starts being used or it leaves the schema — what it cannot do is keep promising a trail that is not there." },
      ],
      es: [
        { t: "h2", c: "Contexto y problema" },
        { t: "p", c: "Zenith Lacres es una industria de precintos con 22 años en el mercado, y tres empresas operando desde un mismo almacén. El control de inventario vivía en planillas desconectadas." },
        { t: "p", c: "Eso producía tres fallas que se sumaban. La misma pieza aparecía en más de una planilla con más de un número, y nadie sabía cuál era correcto, así que la gente dejaba de confiar e iba a contar el estante. Una salida podía ocurrir sin registro de quién la sacó ni cuándo. Y cotizar exigía consultar a mano la tabla de cubicación, lo que tomaba de 10 a 15 minutos con el cliente esperando al teléfono." },
        { t: "p", c: "El detalle que define el proyecto: la operación funcionaba. La empresa era rentable y la gente sabía lo que hacía. Las planillas no eran síntoma de incompetencia: eran un sistema que había superado su propio límite sin que nadie notara el momento exacto. Eso cambia la vara: un software que solo es mejor en teoría pierde ante un proceso que la gente ya domina. Tiene que ser más rápido el primer día." },
        { t: "h2", c: "Restricciones" },
        { t: "p", c: "Un desarrollador. Presupuesto de infraestructura cero — el sistema entero corre en planes gratuitos. Y los usuarios son operarios de almacén y vendedores: no técnicos, y sin disposición para capacitarse." },
        { t: "h2", c: "Arquitectura" },
        { t: "p", c: "Una SPA en React sobre una API REST en Express desacoplada, con PostgreSQL accedido exclusivamente vía Prisma. El chat interno — la única superficie que realmente tiene que ser en vivo — corre en Firestore, y no en un canal de tiempo real construido por mí." },
        { t: "p", c: "El stock no es un campo que alguien edita. Es un saldo que solo se mueve porque se registró un movimiento, con autor, tipo y motivo. Eso obliga a que dos escrituras ocurran juntas:" },
        { t: "code", lang: "backend/src/routes/movements.js", c: MOVEMENT_TX },
        { t: "p", c: "Si entra la fila y no el saldo, el historial miente. Si entra el saldo y no la fila, el número no tiene explicación. La transacción es lo que impide ambas cosas." },
        { t: "h2", c: "Cubicación: la parte que solo construye quien conoce el negocio" },
        { t: "p", c: "Empecé buscando la fórmula de peso cúbico y no había ninguna. Lo que existía era un documento interno con una tabla medida durante años: qué embalaje admite cuántas piezas de cada modelo y tamaño. Así que la tabla se volvió el modelo, y el cálculo se volvió emparejamiento de reglas:" },
        { t: "code", lang: "frontend/src/pages/Cubagem.jsx", c: CUBAGEM },
        { t: "p", c: "El desempate es donde vive el negocio: menos paquetes gana, porque el flete se cobra por volumen, pero en caso de empate se prefiere el embalaje de menor capacidad, porque el espacio vacío dentro de la caja es volumen que se paga por transportar aire." },
        { t: "h2", c: "Acceso" },
        { t: "p", c: "Los nueve roles no fueron inventados: son las áreas del organigrama que ya existían — expedição, produção, compras, comercial, central de atendimento, supervisão, diretoria, TI y admin. Nadie tiene que aprender qué significa su perfil. Una cuenta nueva nace como VISITANTE, sin ningún permiso, porque el estado seguro es acceso cero y no acceso parcial." },
        { t: "h2", c: "Resultados" },
        { t: "p", c: "La cotización pasó de 10–15 minutos de consulta manual a menos de 30 segundos. El chat interno reemplazó una plataforma paga de mensajería, eliminando una mensualidad. Y el sistema creció mucho más allá de los tres módulos que se suelen citar: hoy cubre portería con fila de check-in, separaciones, extensiones telefónicas, compras, pendientes, medios e informes." },
        { t: "note", c: "{{PREENCHER: números adicionais reais — quantos usuários internos ativos, quantos itens cadastrados no catálogo, desde quando está em produção sem interrupção.}}" },
        { t: "h2", c: "Qué haría diferente" },
        { t: "p", c: "Tres cosas, en orden de importancia." },
        { t: "p", c: "La primera es la atribución por empresa. El schema no tiene tabla de empresa ni columna de entidad en producto o movimiento: las tres empresas comparten el sistema, pero la separación es organizacional y no está modelada. Es la mayor deuda abierta, y la migración que la resuelve se encarece cada mes." },
        { t: "p", c: "La segunda es estandarizar la autorización. Se aplica ruta por ruta, lo que ya produjo inconsistencia entre módulos; debería ser una decisión tomada una vez, en el router, con excepciones explícitas." },
        { t: "p", c: "La tercera es la auditoría. Hay un modelo AuditLog en el schema que ninguna ruta escribe, mientras la pantalla real lee de Firestore. O el modelo empieza a usarse o sale del schema — lo que no puede es seguir prometiendo una traza que no existe." },
      ],
    },
  },

  /* ────────────────────────────────────────────────────── MUSCLE LEVELS ── */
  {
    slug: "muscle-levels",
    year: "2025",
    tone: "purple",
    status: { pt: "Entregue · nota máxima", en: "Delivered · top grade", es: "Entregado · nota máxima" },
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "MDX"],
    repo: "https://github.com/BenjaminCoder0814/TCC-MUSCLE-LEVELS",
    demo: "https://tcc-muscle-levels.vercel.app/",
    metrics: [
      { v: "100%", l: { pt: "Feito sozinho", en: "Built solo", es: "Hecho en solitario" } },
      { v: "181+", l: { pt: "Exercícios catalogados", en: "Exercises catalogued", es: "Ejercicios catalogados" } },
      { v: "6", l: { pt: "Idiomas de conteúdo", en: "Content languages", es: "Idiomas de contenido" } },
    ],
    title: {
      pt: "Muscle Levels — TCC full stack",
      en: "Muscle Levels — graduation project",
      es: "Muscle Levels — proyecto de graduación",
    },
    dek: {
      pt: "Plataforma de acompanhamento de treinos entregue como trabalho de conclusão. O projeto era para ser em trio; foi entregue individualmente.",
      en: "A workout-tracking platform delivered as my technical graduation project. It was meant to be a group of three; it was delivered alone.",
      es: "Plataforma de seguimiento de entrenamientos entregada como proyecto de graduación. Debía ser en trío; se entregó en solitario.",
    },
    body: {
      pt: [
        { t: "h2", c: "Contexto e problema" },
        { t: "p", c: "Trabalho de conclusão do curso técnico em TI. O escopo previa uma equipe de três pessoas; acabou sendo entregue por uma. Isso não é uma anedota de esforço — é a restrição que explica todas as decisões técnicas do projeto." },
        { t: "h2", c: "Restrições" },
        { t: "p", c: "Prazo acadêmico fixo, uma pessoa, e a necessidade de entregar algo funcionando na banca. Quando o time desaparece e o prazo não, a única variável que sobra é escopo — e escopo em projeto acadêmico é o que dá nota." },
        { t: "h2", c: "Arquitetura" },
        { t: "p", c: "Next.js 15 com App Router e React 19, TypeScript e Tailwind. As telas de treino, estatísticas, programas, loja e gamificação são rotas do App Router; o conteúdo institucional é MDX versionado por idioma." },
        { t: "code", lang: "estrutura de conteúdo", c: CONTENT_TREE },
        { t: "p", c: "Seis idiomas de conteúdo — inglês, espanhol, francês, português, russo e chinês simplificado — para termos de uso, política de privacidade, termos de venda e a página institucional. Para um TCC, isso é ambição, não requisito. Foi a decisão de tratar o projeto como produto e não como entrega escolar." },
        { t: "h2", c: "Catálogo de exercícios" },
        { t: "p", c: "A parte menos glamourosa e mais útil. O repositório tem um pipeline de dados no diretório data/: os exercícios brutos, uma versão para importação em CSV, um arquivo de estatísticas, um de fallback e — o mais revelador — um exercises-to-review.json. Curar catálogo é trabalho de dados, e separar o que já foi revisado do que ainda não foi é o que impede o catálogo de apodrecer." },
        { t: "h2", c: "Resultados" },
        { t: "p", c: "Aprovado com nota máxima, entregue individualmente. Mais de 181 exercícios catalogados, construtor de treinos, timer de descanso, detecção automática de recordes pessoais e análise de progressão." },
        { t: "note", c: "{{PREENCHER: o app teve usuários reais além da banca? Alguém usou para treinar de verdade? Se sim, quantos e por quanto tempo.}}" },
        { t: "h2", c: "O que eu faria diferente" },
        { t: "p", c: "Este é o projeto onde eu aprendi que configuração não é o mesmo que capacidade." },
        { t: "p", c: "O repositório tem workflow de CI, Dockerfile, templates de issue e pull request, e notificação no Discord. Fui reler tudo com atenção e nada disso jamais executou: o CI dispara em push para main e a única branch é master; e se disparasse, falharia, porque usa pnpm com lockfile congelado enquanto o repositório versiona um package-lock.json do npm. O Dockerfile, por sua vez, copia uma pasta prisma/ e um pnpm-lock.yaml que não existem — o build morre no primeiro COPY." },
        { t: "p", c: "Também versionei um .vscode/settings.json que desliga validação de TypeScript, ESLint, validação de JSON e o painel de problemas. Foi para calar o editor e terminar uma tela. O efeito é que os erros continuaram lá; eu só parei de vê-los." },
        { t: "note", c: "A lição não é sobre esses arquivos, é sobre o hábito: nunca commitar automação sem ver ela rodar uma vez, verde. Configuração que nunca executa não é configuração, é decoração — e decoração em repositório é pior que ausência, porque afirma uma garantia que não existe." },
      ],
      en: [
        { t: "h2", c: "Context and problem" },
        { t: "p", c: "The final project of my technical IT course. The scope assumed a team of three; it ended up delivered by one. That is not an anecdote about effort — it is the constraint that explains every technical decision in the project." },
        { t: "h2", c: "Constraints" },
        { t: "p", c: "A fixed academic deadline, one person, and the need to demo something working to a panel. When the team disappears and the deadline does not, the only remaining variable is scope — and in an academic project, scope is what the grade is made of." },
        { t: "h2", c: "Architecture" },
        { t: "p", c: "Next.js 15 with the App Router and React 19, TypeScript and Tailwind. The workout, statistics, programmes, store and gamification screens are App Router routes; the institutional content is MDX versioned per language." },
        { t: "code", lang: "content structure", c: CONTENT_TREE },
        { t: "p", c: "Six content languages — English, Spanish, French, Portuguese, Russian and Simplified Chinese — for terms of use, privacy policy, sales terms and the about page. For a school project that is ambition, not a requirement. It was the decision to treat the thing as a product rather than as coursework." },
        { t: "h2", c: "The exercise catalogue" },
        { t: "p", c: "The least glamorous and most useful part. The repository carries a data pipeline in data/: the raw exercises, a CSV built for import, a statistics file, a fallback file and — most telling — an exercises-to-review.json. Curating a catalogue is data work, and separating what has been reviewed from what has not is what stops the catalogue from rotting." },
        { t: "h2", c: "Results" },
        { t: "p", c: "Passed with the top grade, delivered individually. Over 181 catalogued exercises, a workout builder, a rest timer, automatic personal-record detection and progression analysis." },
        { t: "note", c: "{{PREENCHER: o app teve usuários reais além da banca? Alguém usou para treinar de verdade? Se sim, quantos e por quanto tempo.}}" },
        { t: "h2", c: "What I would do differently" },
        { t: "p", c: "This is the project where I learned that configuration is not the same as capability." },
        { t: "p", c: "The repository has a CI workflow, a Dockerfile, issue and pull-request templates, and Discord notifications. I went back and read all of it carefully, and none of it has ever executed: the CI triggers on pushes to main and the only branch is master; and if it did trigger it would fail, because it uses pnpm with a frozen lockfile while the repository commits an npm package-lock.json. The Dockerfile, in turn, copies a prisma/ directory and a pnpm-lock.yaml that do not exist — the build dies on the first COPY." },
        { t: "p", c: "I also committed a .vscode/settings.json that disables TypeScript validation, ESLint, JSON validation and the problems panel. It was to quiet the editor and finish a screen. The effect is that the errors stayed; I just stopped seeing them." },
        { t: "note", c: "The lesson is not about those files, it is about the habit: never commit automation without watching it run once, green. Configuration that never executes is not configuration, it is decoration — and decoration in a repository is worse than absence, because it asserts a guarantee that is not there." },
      ],
      es: [
        { t: "h2", c: "Contexto y problema" },
        { t: "p", c: "Proyecto final del curso técnico en TI. El alcance suponía un equipo de tres; terminó entregándolo una sola persona. No es una anécdota de esfuerzo: es la restricción que explica todas las decisiones técnicas del proyecto." },
        { t: "h2", c: "Restricciones" },
        { t: "p", c: "Plazo académico fijo, una persona, y la necesidad de mostrar algo funcionando ante un tribunal. Cuando el equipo desaparece y el plazo no, la única variable que queda es el alcance — y en un proyecto académico, el alcance es de lo que está hecha la nota." },
        { t: "h2", c: "Arquitectura" },
        { t: "p", c: "Next.js 15 con App Router y React 19, TypeScript y Tailwind. Las pantallas de entrenamiento, estadísticas, programas, tienda y gamificación son rutas del App Router; el contenido institucional es MDX versionado por idioma." },
        { t: "code", lang: "estructura de contenido", c: CONTENT_TREE },
        { t: "p", c: "Seis idiomas de contenido — inglés, español, francés, portugués, ruso y chino simplificado — para términos de uso, política de privacidad, términos de venta y la página institucional. Para un proyecto escolar eso es ambición, no requisito. Fue la decisión de tratarlo como producto y no como entrega académica." },
        { t: "h2", c: "El catálogo de ejercicios" },
        { t: "p", c: "La parte menos glamorosa y más útil. El repositorio tiene un pipeline de datos en data/: los ejercicios en bruto, una versión CSV para importación, un archivo de estadísticas, uno de respaldo y — lo más revelador — un exercises-to-review.json. Curar un catálogo es trabajo de datos, y separar lo revisado de lo no revisado es lo que evita que el catálogo se pudra." },
        { t: "h2", c: "Resultados" },
        { t: "p", c: "Aprobado con nota máxima, entregado individualmente. Más de 181 ejercicios catalogados, constructor de rutinas, temporizador de descanso, detección automática de récords personales y análisis de progresión." },
        { t: "note", c: "{{PREENCHER: o app teve usuários reais além da banca? Alguém usou para treinar de verdade? Se sim, quantos e por quanto tempo.}}" },
        { t: "h2", c: "Qué haría diferente" },
        { t: "p", c: "Este es el proyecto donde aprendí que configuración no es lo mismo que capacidad." },
        { t: "p", c: "El repositorio tiene workflow de CI, Dockerfile, plantillas de issue y pull request, y notificaciones a Discord. Volví a leerlo todo con atención y nada de eso ejecutó jamás: el CI dispara en push a main y la única rama es master; y si disparara, fallaría, porque usa pnpm con lockfile congelado mientras el repositorio versiona un package-lock.json de npm. El Dockerfile, a su vez, copia una carpeta prisma/ y un pnpm-lock.yaml que no existen: el build muere en el primer COPY." },
        { t: "p", c: "También versioné un .vscode/settings.json que apaga la validación de TypeScript, ESLint, la validación de JSON y el panel de problemas. Fue para callar al editor y terminar una pantalla. El efecto es que los errores siguieron ahí; solo dejé de verlos." },
        { t: "note", c: "La lección no es sobre esos archivos, es sobre el hábito: nunca commitear automatización sin verla correr una vez, en verde. La configuración que nunca se ejecuta no es configuración, es decoración — y la decoración en un repositorio es peor que la ausencia, porque afirma una garantía que no existe." },
      ],
    },
  },

  /* ─────────────────────────────────────────────────────── REBRANDING ── */
  {
    slug: "rebranding",
    year: "2023 – 2024",
    tone: "green",
    status: { pt: "Entregue", en: "Delivered", es: "Entregado" },
    stack: ["Figma", "UI/UX", "Web Design", "Marketing", "Fotografia de produto"],
    metrics: [
      { v: "R$ 0 → R$ 10k", l: { pt: "Vendas em 3 meses", en: "Sales in 3 months", es: "Ventas en 3 meses" } },
      { v: "5", l: { pt: "Marketplaces ativos", en: "Active marketplaces", es: "Marketplaces activos" } },
      { v: "22", l: { pt: "Anos da empresa", en: "Years in market", es: "Años de la empresa" } },
    ],
    title: {
      pt: "Rebranding e entrada em marketplaces",
      en: "Rebranding and marketplace launch",
      es: "Rebranding y entrada en marketplaces",
    },
    dek: {
      pt: "Redesenho da identidade visual de uma indústria com 22 anos de mercado, e a primeira venda digital da empresa.",
      en: "Redesigning the visual identity of a 22-year-old manufacturer, and the company's first digital sale.",
      es: "Rediseño de la identidad visual de una industria con 22 años, y la primera venta digital de la empresa.",
    },
    body: {
      pt: [
        { t: "h2", c: "Contexto e problema" },
        { t: "p", c: "Uma indústria de lacres com 22 anos de mercado, sólida no canal tradicional, e sem nenhuma presença digital de vendas. A identidade visual era a de uma empresa que nunca precisou ser encontrada por busca — porque os clientes ligavam." },
        { t: "h2", c: "Restrições" },
        { t: "p", c: "Sem agência, sem orçamento de produção, e um catálogo de produtos industriais que ninguém fotografa por prazer: lacres plásticos, abraçadeiras, arames, fitas. Marketplace não aceita foto ruim — a foto é a vitrine inteira." },
        { t: "h2", c: "O que foi feito" },
        { t: "p", c: "Redesenho da identidade visual, do site e das mídias sociais, montagem de um estúdio fotográfico interno para produzir o catálogo, e entrada em cinco marketplaces: Mercado Livre, Shopee, Amazon, Magalu e TikTok Shop." },
        { t: "p", c: "A montagem do estúdio interno é a decisão que sustenta o resto. Um catálogo industrial tem centenas de variações — modelo, tamanho, cor, material — e terceirizar isso significaria pagar por sessão a cada item novo. Trazer para dentro transformou custo variável em custo fixo, e transformou foto de produto em algo que se refaz numa tarde quando o produto muda." },
        { t: "h2", c: "Resultados" },
        { t: "p", c: "A receita digital saiu de R$ 0 para R$ 10.000 em três meses, com cinco marketplaces ativos." },
        { t: "note", c: "{{PREENCHER: detalhes reais que eu não tenho — quantos SKUs foram publicados, qual marketplace vendeu mais, se a identidade nova foi aplicada em embalagem/frota, e se há material antes/depois que possa ser publicado aqui.}}" },
        { t: "h2", c: "Por que isso está num portfólio de engenharia" },
        { t: "p", c: "Porque é o projeto que explica por que eu construo software do jeito que construo. Foi trabalhando no catálogo — cada produto com material, modelo, tamanho, cor — que eu entendi o domínio que depois virou o modelo de dados do ERP. A tabela de cubagem, os nomes dos produtos, as variações: tudo isso eu já conhecia antes de escrever a primeira linha do sistema." },
        { t: "note", c: "É também o projeto mais distante do rótulo Software Engineer, e ele fica no portfólio de propósito. A parte que interessa não é o Figma — é ter visto o negócio de dentro antes de propor sistema para ele." },
      ],
      en: [
        { t: "h2", c: "Context and problem" },
        { t: "p", c: "An industrial sealing manufacturer, 22 years in the market, solid in the traditional channel, with no digital sales presence at all. The visual identity was that of a company that had never needed to be found by search — because customers phoned." },
        { t: "h2", c: "Constraints" },
        { t: "p", c: "No agency, no production budget, and a catalogue of industrial products nobody photographs for pleasure: plastic seals, cable ties, wires, tapes. A marketplace does not tolerate a bad photograph — the photograph is the entire storefront." },
        { t: "h2", c: "What was done" },
        { t: "p", c: "A redesign of the visual identity, the website and social media, an in-house photography studio built to produce the catalogue, and launch on five marketplaces: Mercado Livre, Shopee, Amazon, Magalu and TikTok Shop." },
        { t: "p", c: "Building the studio in-house is the decision that holds the rest up. An industrial catalogue has hundreds of variations — model, size, colour, material — and outsourcing would have meant paying per session for every new item. Bringing it inside turned a variable cost into a fixed one, and turned product photography into something you redo in an afternoon when the product changes." },
        { t: "h2", c: "Results" },
        { t: "p", c: "Digital revenue went from R$0 to R$10,000 in three months, across five active marketplaces." },
        { t: "note", c: "{{PREENCHER: detalhes reais que eu não tenho — quantos SKUs foram publicados, qual marketplace vendeu mais, se a identidade nova foi aplicada em embalagem/frota, e se há material antes/depois que possa ser publicado aqui.}}" },
        { t: "h2", c: "Why this sits in an engineering portfolio" },
        { t: "p", c: "Because it is the project that explains why I build software the way I do. It was while working on the catalogue — each product with a material, a model, a size, a colour — that I learned the domain that later became the ERP's data model. The cubagem table, the product names, the variations: I knew all of it before writing the system's first line." },
        { t: "note", c: "It is also the project furthest from the Software Engineer label, and it stays in the portfolio on purpose. The part that matters is not the Figma work — it is having seen the business from the inside before proposing a system for it." },
      ],
      es: [
        { t: "h2", c: "Contexto y problema" },
        { t: "p", c: "Una industria de precintos con 22 años en el mercado, sólida en el canal tradicional, y sin ninguna presencia digital de ventas. La identidad visual era la de una empresa que nunca necesitó ser encontrada por búsqueda, porque los clientes llamaban." },
        { t: "h2", c: "Restricciones" },
        { t: "p", c: "Sin agencia, sin presupuesto de producción, y un catálogo de productos industriales que nadie fotografía por placer: precintos plásticos, abrazaderas, alambres, cintas. Un marketplace no tolera una mala foto: la foto es toda la vitrina." },
        { t: "h2", c: "Qué se hizo" },
        { t: "p", c: "Rediseño de la identidad visual, del sitio y de las redes sociales, montaje de un estudio fotográfico interno para producir el catálogo, y entrada en cinco marketplaces: Mercado Livre, Shopee, Amazon, Magalu y TikTok Shop." },
        { t: "p", c: "Montar el estudio internamente es la decisión que sostiene todo lo demás. Un catálogo industrial tiene cientos de variaciones — modelo, tamaño, color, material — y tercerizarlo habría significado pagar por sesión cada ítem nuevo. Traerlo adentro convirtió un costo variable en fijo, y convirtió la foto de producto en algo que se rehace en una tarde cuando el producto cambia." },
        { t: "h2", c: "Resultados" },
        { t: "p", c: "El ingreso digital pasó de R$0 a R$10.000 en tres meses, con cinco marketplaces activos." },
        { t: "note", c: "{{PREENCHER: detalhes reais que eu não tenho — quantos SKUs foram publicados, qual marketplace vendeu mais, se a identidade nova foi aplicada em embalagem/frota, e se há material antes/depois que possa ser publicado aqui.}}" },
        { t: "h2", c: "Por qué esto está en un portafolio de ingeniería" },
        { t: "p", c: "Porque es el proyecto que explica por qué construyo software como lo construyo. Fue trabajando en el catálogo — cada producto con material, modelo, tamaño y color — que aprendí el dominio que después se volvió el modelo de datos del ERP. La tabla de cubicación, los nombres de los productos, las variaciones: todo eso ya lo conocía antes de escribir la primera línea del sistema." },
        { t: "note", c: "Es también el proyecto más lejano de la etiqueta Software Engineer, y se queda en el portafolio a propósito. Lo que importa no es el trabajo en Figma: es haber visto el negocio desde adentro antes de proponerle un sistema." },
      ],
    },
  },

  /* ────────────────────────────────────────────────────────── PORTFOLIO ── */
  {
    slug: "portfolio",
    year: "2026",
    tone: "amber",
    status: { pt: "No ar", en: "Live", es: "En línea" },
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Puppeteer"],
    metrics: [
      { v: "64", l: { pt: "Páginas estáticas", en: "Static pages", es: "Páginas estáticas" } },
      { v: "3", l: { pt: "Idiomas", en: "Languages", es: "Idiomas" } },
      { v: "0", l: { pt: "Assets externos em runtime", en: "External runtime assets", es: "Assets externos en runtime" } },
    ],
    title: {
      pt: "Este portfólio",
      en: "This portfolio",
      es: "Este portafolio",
    },
    dek: {
      pt: "Um case study meta: as decisões técnicas do próprio site, incluindo o incidente de codificação que corrompeu o conteúdo desde o primeiro commit.",
      en: "A meta case study: the technical decisions behind this site, including the encoding incident that corrupted the content from the very first commit.",
      es: "Un case study meta: las decisiones técnicas del propio sitio, incluido el incidente de codificación que corrompió el contenido desde el primer commit.",
    },
    body: {
      pt: [
        { t: "h2", c: "Contexto e problema" },
        { t: "p", c: "Um portfólio de engenheiro tem um requisito que a maioria dos sites não tem: ele vai ser inspecionado por alguém que sabe ler código. O leitor abre o repositório que você linkou. Isso significa que qualquer afirmação no site é verificável — e qualquer divergência entre o que o site diz e o que o repositório mostra é pior do que não ter dito nada." },
        { t: "h2", c: "Restrições" },
        { t: "p", c: "Três idiomas com paridade real, não tradução parcial. SEO que funcione para quem busca e para IA que resume perfis. E carga rápida, porque recrutador abre em celular entre uma reunião e outra." },
        { t: "h2", c: "Arquitetura" },
        { t: "p", c: "Next.js 14 com App Router. As rotas vivem sob [lang] e são geradas estaticamente para pt, en e es, com dynamicParams desligado — o que faz qualquer idioma inválido cair num 404 de verdade em vez de renderizar a home com status 200." },
        { t: "p", c: "Um middleware detecta o Accept-Language na raiz e redireciona. E toda URL absoluta do site — canonical, og:url, og:image, sitemap, robots, JSON-LD — vem de um único lugar:" },
        { t: "code", lang: "src/lib/site.ts", c: SITE_URL_RESOLUTION },
        { t: "p", c: "Isso existe porque a falha anterior era silenciosa: as URLs apontavam para um domínio que não resolvia mais, então o LinkedIn e o WhatsApp buscavam a og:image, recebiam 404 e simplesmente não geravam preview. Não havia erro em lugar nenhum — o link só ficava feio." },
        { t: "h2", c: "Os assets são gerados, não versionados à mão" },
        { t: "p", c: "Dois scripts com Puppeteer: um renderiza os PDFs trilíngues do currículo a partir da própria página — o que impede o PDF e o site de discordarem — e outro gera a og-image 1200×630 e os ícones do manifest. Nenhum dos dois arquivos precisa ser mantido manualmente." },
        { t: "h2", c: "Resultados" },
        { t: "p", c: "64 páginas estáticas, três idiomas com hreflang e x-default, JSON-LD de Person, Article, FAQPage e BreadcrumbList, headers de segurança com CSP, e prefers-reduced-motion respeitado tanto no CSS quanto no Framer Motion." },
        { t: "h2", c: "O que eu faria diferente" },
        { t: "p", c: "O erro mais caro deste projeto não foi arquitetural, foi de codificação de arquivo." },
        { t: "p", c: "O arquivo central de dados nasceu corrompido: um passe de encoding transformou a seta ↗ em â†— e o travessão em â€”, e apagou traços em 31 linhas de texto visível. Nenhum commit do histórico tem os caracteres corretos — o arquivo já foi criado assim. O site exibiu Ver Demo â†— em todos os cards de projeto por meses." },
        { t: "note", c: "A lição é que erro de encoding não quebra o build, não gera warning e não aparece em teste. Ele só aparece para quem está lendo a página — que é exatamente a pessoa que você não pode perder. Hoje eu trato codificação de arquivo como parte do checklist de revisão, não como detalhe de editor." },
      ],
      en: [
        { t: "h2", c: "Context and problem" },
        { t: "p", c: "An engineer's portfolio has a requirement most sites do not: it will be inspected by someone who can read code. The reader opens the repository you linked. Which means every claim on the site is checkable — and any gap between what the site says and what the repository shows is worse than having said nothing." },
        { t: "h2", c: "Constraints" },
        { t: "p", c: "Three languages at real parity, not partial translation. SEO that works both for search and for the AI tools that summarise profiles. And a fast load, because a recruiter opens it on a phone between meetings." },
        { t: "h2", c: "Architecture" },
        { t: "p", c: "Next.js 14 with the App Router. Routes live under [lang] and are statically generated for pt, en and es, with dynamicParams turned off — which makes any invalid locale fall through to a real 404 instead of rendering the home page with a 200." },
        { t: "p", c: "Middleware reads Accept-Language at the root and redirects. And every absolute URL the site emits — canonical, og:url, og:image, sitemap, robots, JSON-LD — comes from one place:" },
        { t: "code", lang: "src/lib/site.ts", c: SITE_URL_RESOLUTION },
        { t: "p", c: "This exists because the previous failure was silent: the URLs pointed at a domain that no longer resolved, so LinkedIn and WhatsApp fetched the og:image, got a 404, and simply produced no preview card. There was no error anywhere — the link just looked bad." },
        { t: "h2", c: "The assets are generated, not hand-maintained" },
        { t: "p", c: "Two Puppeteer scripts: one renders the trilingual resume PDFs from the page itself — which stops the PDF and the site from disagreeing — and the other generates the 1200×630 og-image and the manifest icons. Neither file has to be maintained by hand." },
        { t: "h2", c: "Results" },
        { t: "p", c: "64 static pages, three languages with hreflang and x-default, JSON-LD for Person, Article, FAQPage and BreadcrumbList, security headers with a CSP, and prefers-reduced-motion respected in both CSS and Framer Motion." },
        { t: "h2", c: "What I would do differently" },
        { t: "p", c: "The most expensive mistake in this project was not architectural. It was file encoding." },
        { t: "p", c: "The central data file was born corrupted: an encoding pass turned the ↗ arrow into â†— and the em dash into â€”, and stripped dashes out of 31 lines of visible copy. No commit in the history has the correct characters — the file was created that way. The site displayed Ver Demo â†— on every project card for months." },
        { t: "note", c: "The lesson is that an encoding bug does not break the build, does not raise a warning and does not show up in a test. It only shows up for the person reading the page — which is exactly the person you cannot afford to lose. These days I treat file encoding as part of the review checklist rather than as an editor detail." },
      ],
      es: [
        { t: "h2", c: "Contexto y problema" },
        { t: "p", c: "El portafolio de un ingeniero tiene un requisito que la mayoría de los sitios no tiene: va a ser inspeccionado por alguien que sabe leer código. El lector abre el repositorio que enlazaste. Eso significa que toda afirmación del sitio es verificable, y cualquier divergencia entre lo que el sitio dice y lo que el repositorio muestra es peor que no haber dicho nada." },
        { t: "h2", c: "Restricciones" },
        { t: "p", c: "Tres idiomas con paridad real, no traducción parcial. SEO que funcione para búsqueda y para las IA que resumen perfiles. Y carga rápida, porque un reclutador lo abre en el móvil entre reuniones." },
        { t: "h2", c: "Arquitectura" },
        { t: "p", c: "Next.js 14 con App Router. Las rutas viven bajo [lang] y se generan estáticamente para pt, en y es, con dynamicParams apagado, lo que hace que cualquier idioma inválido caiga en un 404 real en vez de renderizar la home con estado 200." },
        { t: "p", c: "Un middleware lee Accept-Language en la raíz y redirige. Y toda URL absoluta del sitio — canonical, og:url, og:image, sitemap, robots, JSON-LD — sale de un solo lugar:" },
        { t: "code", lang: "src/lib/site.ts", c: SITE_URL_RESOLUTION },
        { t: "p", c: "Esto existe porque la falla anterior era silenciosa: las URLs apuntaban a un dominio que ya no resolvía, así que LinkedIn y WhatsApp pedían la og:image, recibían un 404 y simplemente no generaban tarjeta de vista previa. No había error en ningún lado: el enlace solo se veía mal." },
        { t: "h2", c: "Los assets se generan, no se mantienen a mano" },
        { t: "p", c: "Dos scripts con Puppeteer: uno renderiza los PDFs trilingües del currículum desde la propia página — lo que impide que el PDF y el sitio discrepen — y el otro genera la og-image de 1200×630 y los iconos del manifest. Ninguno de los dos archivos hay que mantenerlo a mano." },
        { t: "h2", c: "Resultados" },
        { t: "p", c: "64 páginas estáticas, tres idiomas con hreflang y x-default, JSON-LD de Person, Article, FAQPage y BreadcrumbList, cabeceras de seguridad con CSP, y prefers-reduced-motion respetado tanto en CSS como en Framer Motion." },
        { t: "h2", c: "Qué haría diferente" },
        { t: "p", c: "El error más caro de este proyecto no fue arquitectónico. Fue de codificación de archivo." },
        { t: "p", c: "El archivo central de datos nació corrupto: un pase de encoding convirtió la flecha ↗ en â†— y la raya en â€”, y borró guiones en 31 líneas de texto visible. Ningún commit del historial tiene los caracteres correctos: el archivo se creó así. El sitio mostró Ver Demo â†— en todas las tarjetas de proyecto durante meses." },
        { t: "note", c: "La lección es que un bug de codificación no rompe el build, no genera warning y no aparece en un test. Solo aparece para quien está leyendo la página, que es exactamente la persona que no puedes perder. Hoy trato la codificación de archivos como parte del checklist de revisión, no como un detalle del editor." },
      ],
    },
  },
];

export const caseBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
