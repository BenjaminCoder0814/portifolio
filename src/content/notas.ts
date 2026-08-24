import type { Lang } from "@/lib/i18n";

/**
 * Technical notes.
 *
 * Ground rule for this file: every note describes something that exists in a
 * repository I can point at. Where a claim would need detail only the incident
 * itself can supply, the note says so rather than inventing it. A note with a
 * hole in it is worth more than a tidy one that cannot survive a follow-up
 * question in an interview.
 */

export type Block =
  | { t: "p"; c: string }
  | { t: "h2"; c: string }
  | { t: "code"; lang?: string; c: string }
  | { t: "list"; c: string[] }
  | { t: "note"; c: string };

export type Note = {
  slug: string;
  date: string;
  minutes: number;
  tags: string[];
  source?: { label: string; href: string };
  title: Record<Lang, string>;
  dek: Record<Lang, string>;
  body: Record<Lang, Block[]>;
};

/* ─────────────────────────────────────────────────────────── code samples ── */

const CUBAGEM_RULES = `const DADOS_PACOTES = [
  {
    nome: 'Caixa 3',
    regras: [
      { material: 'metalico', modelos: ['ZLOCK'],   tamanhos: [15], maxPecas: 1000, pesoKg: 15 },
      { material: 'metalico', modelos: ['ZAJUSTE'], tamanhos: [30], maxPecas: 1000, pesoKg: 20 },
      { material: 'plastico', modelos: ['ES','DT'], tamanhos: [16], maxPecas: 6000, pesoKg: 10 },
      { material: 'plastico', modelos: ['EP'],      tamanhos: [23], maxPecas: 5000, pesoKg: 7  },
      // ...
    ],
  },
];`;

const CUBAGEM_MATCH = `for (const emb of fonte) {
  for (const r of emb.regras) {
    if (r.material !== material)               continue;
    if (!r.modelos.includes(modelo))           continue;
    if (!r.tamanhos.includes(Number(tamanho))) continue;

    resultados.push({
      embalagemNome: emb.nome,
      maxPecas:      r.maxPecas,
      qtdEmbalagens: Math.ceil(qtd / r.maxPecas),
    });
    break; // apenas primeira regra compatível por embalagem
  }
}`;

const CUBAGEM_SORT = `// Ordena recomendando MENOS pacotes.
// Empate em qtdEmbalagens → preferir o de MENOR capacidade unitária
// (melhor ajuste à quantidade, evita sobra de espaço numa embalagem
// maior do que o necessário).
resultados.sort((a, b) => {
  if (a.qtdEmbalagens !== b.qtdEmbalagens) return a.qtdEmbalagens - b.qtdEmbalagens;
  return a.maxPecas - b.maxPecas;
});`;

const MOVEMENT_TX = `let nextStock = product.stockCurrent;
if (type === 'ENTRADA') nextStock += q;
if (type === 'SAIDA')   nextStock -= q;
if (type === 'AJUSTE')  nextStock  = q;

if (nextStock < 0)
  return res.status(400).json({ ok: false, error: 'Estoque não pode ficar negativo' });

const [movement] = await prisma.$transaction([
  prisma.movement.create({
    data: { productId: product.id, userId: req.user?.id ?? null, type, quantity: q },
  }),
  prisma.product.update({
    where: { id: product.id },
    data:  { stockCurrent: nextStock },
  }),
]);`;

const FALLBACK = `// IMPORTANTE: este array é apenas um FALLBACK visual usado quando a API
// /api/users/contacts ainda não respondeu (ex.: backend dormindo no Render).
// Assim que o backend responder, este array é substituído pela lista real
// (com os IDs verdadeiros do banco) — ver AuthContext.refreshContatosFromApi.
export const TODOS_USUARIOS = [
  { id: 1, nome: 'Administrador', perfil: 'ADMIN' },
  { id: 2, nome: 'Expedição',     perfil: 'EXPEDICAO' },
  // ...
];`;

const SCRIPTS = `bulk-insert-2026-05-27.mjs
migrate-lacres-liso-2026-05.mjs
query-abracadeiras-2026-07-06.mjs
update-abracadeiras-ajuste-2026-07-06b.mjs
fix-lacre-sacola-verde-2026-07-06.mjs`;

const AUDIT_MODEL = `model AuditLog {
  id          Int      @id @default(autoincrement())
  userId      Int?
  entity      String
  action      String
  beforeJson  String?
  afterJson   String?
  createdAt   DateTime @default(now())
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
}`;

const AUDIT_REAL = `// frontend/src/pages/Auditoria.jsx
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';`;

const ROLES_GUARD = `router.get('/',        requireAuth, requireRoles('ADMIN', 'TI', 'DIRETORIA'), ah(async …));
router.post('/',       requireAuth, requireRoles('ADMIN', 'TI', 'DIRETORIA'), ah(async …));
router.patch('/:id',   requireAuth, requireRoles('ADMIN', 'TI', 'DIRETORIA'), ah(async …));`;

const ROLES_CONTACTS = `const users = await prisma.user.findMany({
  where:  { active: true, role: { not: 'VISITANTE' } },
  select: { id: true, name: true, displayName: true, avatarUrl: true, role: true },
});`;

const CORS_ALLOWLIST = `const defaultCorsOrigins = [
  'https://lacres.com.br',
  'https://www.lacres.com.br',
  'http://localhost:8080',
  'http://localhost:5173',
];

// Mescla defaults + env para evitar lockout acidental em producao.
const allowedOrigins = Array.from(new Set([
  ...defaultCorsOrigins.map(normalizeOrigin),
  ...envCorsOrigins,
]));

app.use(cors({
  origin(origin, callback) {
    // Permite requests server-to-server e health checks sem Origin.
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(normalizeOrigin(origin))) return callback(null, true);
    return callback(new Error(\`CORS bloqueado para origin: \${origin}\`));
  },
}));`;

const HEALTH = `app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw\`SELECT 1\`;
    return res.json({ ok: true, db: 'up' });
  } catch {
    return res.status(500).json({ ok: false, db: 'down' });
  }
});`;

const BUSINESS_HOURS = `export function checkBusinessHours() {
  const now     = new Date();
  const day     = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day === 0 || day === 6)
    return { ok: false, reason: 'Acesso permitido apenas de segunda a sexta-feira.' };

  if (day === 5 && (minutes < 7 * 60 || minutes >= 16 * 60))
    return { ok: false, reason: 'Na sexta-feira o acesso é das 07:00 às 16:00.' };

  if (minutes < 7 * 60 || minutes >= 18 * 60)
    return { ok: false, reason: 'De segunda a quinta o acesso é das 07:00 às 18:00.' };

  return { ok: true };
}`;

const CI_BRANCH = `# .github/workflows/ci.yml
on:
  push:
    branches: [main]      # ← o repositório só tem a branch "master"
  pull_request:
    branches: [main]

jobs:
  lint:
    steps:
      - uses: pnpm/action-setup@v4   # ← o repositório versiona package-lock.json`;

const DOCKER_GHOST = `FROM base AS deps
COPY package.json pnpm-lock.yaml ./   # ← pnpm-lock.yaml não existe
COPY prisma ./prisma                  # ← a pasta prisma/ não existe
RUN pnpm install --frozen-lockfile`;

/* ──────────────────────────────────────────────────────────────── notes ──── */

export const notes: Note[] = [
  /* ── 1 ── */
  {
    slug: "cubagem-tabela-de-regras",
    date: "2026-07-20",
    minutes: 6,
    tags: ["Domain modelling", "React", "Zenith ERP"],
    source: { label: "estoque-pro · frontend/src/pages/Cubagem.jsx", href: "https://github.com/BenjaminCoder0814/estoque-pro" },
    title: {
      pt: "Cubagem: quando a regra de negócio é um documento, não uma fórmula",
      en: "Cubagem: when the business rule is a document, not a formula",
      es: "Cubicación: cuando la regla de negocio es un documento, no una fórmula",
    },
    dek: {
      pt: "A conta que levava 10 a 15 minutos não era uma conta. Era alguém consultando uma tabela que existia em papel e na cabeça de duas pessoas.",
      en: "The calculation that took 10 to 15 minutes was not a calculation. It was someone consulting a table that existed on paper and in two people's heads.",
      es: "El cálculo que tardaba de 10 a 15 minutos no era un cálculo. Era alguien consultando una tabla que existía en papel y en la cabeza de dos personas.",
    },
    body: {
      pt: [
        { t: "p", c: "Eu comecei esse módulo procurando a fórmula. Peso cúbico costuma ser comprimento × largura × altura dividido por um fator, e eu esperava encontrar isso escrito em algum lugar. Não havia fórmula nenhuma." },
        { t: "p", c: "O que havia era um documento interno de cubagem: uma tabela dizendo que lacre plástico modelo ES de 16 mm cabe 6.000 peças numa determinada caixa, que o mesmo modelo em 23 mm cabe 5.000, que o metálico ZAJUSTE de 30 cm pesa 20 kg por pacote. Nada disso é derivável — é o resultado de anos medindo o que de fato entra na caixa." },
        { t: "h2", c: "Modelar o documento, não a matemática" },
        { t: "p", c: "A tentação é normalizar: extrair densidades, inferir volumes, chegar a uma fórmula que reproduza a tabela. Isso teria sido um erro. Qualquer fórmula que eu inventasse seria uma aproximação de dados que já eram exatos, e na primeira divergência entre a fórmula e o documento oficial ninguém saberia qual das duas estava certa." },
        { t: "p", c: "Então a tabela virou o modelo. Cada embalagem carrega uma lista de regras, e uma regra é a condição sob a qual aquela embalagem serve:" },
        { t: "code", lang: "frontend/src/pages/Cubagem.jsx", c: CUBAGEM_RULES },
        { t: "p", c: "O cálculo deixa de ser aritmética e vira casamento de regras: filtra por material, modelo e tamanho, e para na primeira regra compatível de cada embalagem." },
        { t: "code", lang: "calcularEmbalagens()", c: CUBAGEM_MATCH },
        { t: "h2", c: "O desempate é onde mora o negócio" },
        { t: "p", c: "Achar as embalagens compatíveis é a parte fácil. Recomendar uma é onde a decisão fica interessante, e foi a única parte que eu não consegui decidir sozinho — precisei perguntar." },
        { t: "code", c: CUBAGEM_SORT },
        { t: "p", c: "Menos pacotes ganha, porque frete se paga por volume. Mas no empate a preferência é pela embalagem de MENOR capacidade, o que parece contraintuitivo até você olhar uma caixa grande com um terço de espaço vazio saindo do armazém. Espaço vazio dentro da caixa é volume que você paga para transportar ar." },
        { t: "h2", c: "O que isso realmente resolveu" },
        { t: "p", c: "O ganho não foi velocidade de cálculo — computador nenhum precisa de 15 minutos para consultar uma tabela. O ganho foi que a tabela deixou de morar em duas cabeças. Antes, cotar dependia de alguém que soubesse; agora depende de alguém que saiba digitar quantidade, modelo e tamanho." },
        { t: "note", c: "O custo dessa escolha é honesto e permanente: quando o documento oficial de cubagem mudar, alguém tem que editar o código. Não há tela de administração para essas regras. Isso foi aceito porque a tabela muda em anos, não em meses — mas é dívida, e está anotada como tal." },
      ],
      en: [
        { t: "p", c: "I started this module looking for the formula. Cubic weight is usually length × width × height over some divisor, and I expected to find that written down somewhere. There was no formula." },
        { t: "p", c: "What existed was an internal cubagem document: a table stating that a 16 mm ES plastic seal fits 6,000 pieces in a particular box, that the same model at 23 mm fits 5,000, that a 30 cm ZAJUSTE metal seal weighs 20 kg per package. None of that is derivable. It is the result of years of measuring what actually fits." },
        { t: "h2", c: "Model the document, not the mathematics" },
        { t: "p", c: "The temptation is to normalise: extract densities, infer volumes, arrive at a formula that reproduces the table. That would have been a mistake. Any formula I invented would be an approximation of data that was already exact, and the first time the formula and the official document disagreed, nobody would know which one was wrong." },
        { t: "p", c: "So the table became the model. Each packaging option carries a list of rules, and a rule is the condition under which that packaging applies:" },
        { t: "code", lang: "frontend/src/pages/Cubagem.jsx", c: CUBAGEM_RULES },
        { t: "p", c: "The calculation stops being arithmetic and becomes rule matching: filter by material, model and size, and stop at the first compatible rule for each package." },
        { t: "code", lang: "calcularEmbalagens()", c: CUBAGEM_MATCH },
        { t: "h2", c: "The tie-break is where the business lives" },
        { t: "p", c: "Finding the compatible packages is the easy part. Recommending one is where the decision gets interesting, and it was the only part I could not settle on my own — I had to ask." },
        { t: "code", c: CUBAGEM_SORT },
        { t: "p", c: "Fewer packages wins, because freight is billed by volume. But on a tie the preference goes to the package with the SMALLER capacity, which reads as backwards until you watch a large box leave the warehouse a third empty. Empty space inside the box is volume you are paying to ship air in." },
        { t: "h2", c: "What this actually solved" },
        { t: "p", c: "The gain was not calculation speed — no computer needs 15 minutes to read a table. The gain was that the table stopped living in two people's heads. Quoting used to depend on someone who knew; now it depends on someone who can type a quantity, a model and a size." },
        { t: "note", c: "The cost of this choice is honest and permanent: when the official cubagem document changes, someone has to edit code. There is no admin screen for these rules. That was accepted because the table changes in years rather than months — but it is debt, and it is written down as debt." },
      ],
      es: [
        { t: "p", c: "Empecé este módulo buscando la fórmula. El peso cúbico suele ser largo × ancho × alto dividido por un factor, y esperaba encontrar eso escrito en alguna parte. No había ninguna fórmula." },
        { t: "p", c: "Lo que había era un documento interno de cubicación: una tabla que dice que un precinto plástico modelo ES de 16 mm entra 6.000 piezas en una caja determinada, que el mismo modelo en 23 mm entra 5.000, que el metálico ZAJUSTE de 30 cm pesa 20 kg por paquete. Nada de eso es derivable: es el resultado de años midiendo lo que realmente cabe." },
        { t: "h2", c: "Modelar el documento, no la matemática" },
        { t: "p", c: "La tentación es normalizar: extraer densidades, inferir volúmenes, llegar a una fórmula que reproduzca la tabla. Habría sido un error. Cualquier fórmula que yo inventara sería una aproximación de datos que ya eran exactos, y en la primera divergencia entre la fórmula y el documento oficial nadie sabría cuál de las dos estaba mal." },
        { t: "p", c: "Así que la tabla se convirtió en el modelo. Cada embalaje lleva una lista de reglas, y una regla es la condición bajo la cual ese embalaje sirve:" },
        { t: "code", lang: "frontend/src/pages/Cubagem.jsx", c: CUBAGEM_RULES },
        { t: "p", c: "El cálculo deja de ser aritmética y pasa a ser emparejamiento de reglas: filtra por material, modelo y tamaño, y se detiene en la primera regla compatible de cada embalaje." },
        { t: "code", lang: "calcularEmbalagens()", c: CUBAGEM_MATCH },
        { t: "h2", c: "El desempate es donde vive el negocio" },
        { t: "p", c: "Encontrar los embalajes compatibles es lo fácil. Recomendar uno es donde la decisión se pone interesante, y fue la única parte que no pude decidir solo: tuve que preguntar." },
        { t: "code", c: CUBAGEM_SORT },
        { t: "p", c: "Menos paquetes gana, porque el flete se cobra por volumen. Pero en caso de empate la preferencia es por el embalaje de MENOR capacidad, lo que parece al revés hasta que ves salir del almacén una caja grande con un tercio vacío. El espacio vacío dentro de la caja es volumen que pagas por transportar aire." },
        { t: "h2", c: "Qué resolvió esto de verdad" },
        { t: "p", c: "La ganancia no fue velocidad de cálculo: ninguna computadora necesita 15 minutos para consultar una tabla. La ganancia fue que la tabla dejó de vivir en la cabeza de dos personas. Antes cotizar dependía de alguien que supiera; ahora depende de alguien que sepa escribir cantidad, modelo y tamaño." },
        { t: "note", c: "El costo de esta decisión es honesto y permanente: cuando cambie el documento oficial de cubicación, alguien tiene que editar código. No hay pantalla de administración para estas reglas. Se aceptó porque la tabla cambia en años, no en meses, pero es deuda y está anotada como tal." },
      ],
    },
  },

  /* ── 2 ── */
  {
    slug: "saldo-armazenado-ou-somado",
    date: "2026-06-15",
    minutes: 5,
    tags: ["Prisma", "PostgreSQL", "Trade-offs"],
    source: { label: "estoque-pro · backend/src/routes/movements.js", href: "https://github.com/BenjaminCoder0814/estoque-pro" },
    title: {
      pt: "O saldo que eu escolhi armazenar em vez de somar",
      en: "The balance I chose to store instead of sum",
      es: "El saldo que elegí almacenar en vez de sumar",
    },
    dek: {
      pt: "Guardar um total que pode divergir da sua própria história é o tipo de decisão que parece errada num livro e certa num armazém.",
      en: "Storing a total that can drift from its own history is the kind of decision that looks wrong in a book and right in a warehouse.",
      es: "Guardar un total que puede divergir de su propia historia es el tipo de decisión que parece mala en un libro y correcta en un almacén.",
    },
    body: {
      pt: [
        { t: "p", c: "O estoque não é uma coluna que alguém edita. É um saldo no produto, e a única forma de movê-lo é escrever uma movimentação: ENTRADA, SAIDA ou AJUSTE. Essa restrição é o ponto inteiro do sistema — um número que mudou sem uma linha explicando por quê é exatamente o que as planilhas produziam." },
        { t: "h2", c: "A alternativa mais defensável é a que eu não escolhi" },
        { t: "p", c: "A opção honesta é não guardar saldo nenhum e derivar: SUM(quantity) sobre as movimentações, toda vez. Isso nunca diverge, porque não existe de que divergir. É a resposta correta em quase todo livro sobre o assunto." },
        { t: "p", c: "Eu não fiz isso, por um motivo entediante: o armazém lê o estoque muito mais do que escreve, e a lista de produtos é a tela mais aberta do sistema. Guardar o saldo torna o caso comum uma leitura indexada. Derivar tornaria a tela mais usada a mais cara." },
        { t: "h2", c: "O que se paga por essa escolha" },
        { t: "p", c: "Duas escritas que precisam acontecer juntas. Se a linha entra e o saldo não, o histórico mente. Se o saldo entra e a linha não, o número não tem explicação. As duas falhas são piores do que a escrita não ter acontecido." },
        { t: "code", lang: "backend/src/routes/movements.js", c: MOVEMENT_TX },
        { t: "p", c: "A transação é o que compra de volta a correção que a derivação daria de graça. E a guarda do negativo vem antes da escrita, de propósito: saldo negativo não é um estado em que o armazém pode estar, então não é um estado que a tabela pode guardar." },
        { t: "h2", c: "Por que AJUSTE existe" },
        { t: "p", c: "Porque a realidade e o banco vão divergir de qualquer jeito. Alguém derruba uma caixa, alguém conta errado, alguém tira do estoque sem registrar. Quando a contagem física discorda do sistema, a contagem física vence — e a correção entra como uma linha própria, com autor e data, em vez de alguém editar o número no banco." },
        { t: "note", c: "Um AJUSTE é uma admissão de que o histórico ficou incompleto em algum ponto. Registrá-lo como movimentação preserva a propriedade mais importante do sistema: todo número tem uma linha atrás dele." },
      ],
      en: [
        { t: "p", c: "Stock is not a column anyone edits. It is a balance on the product, and the only way to move it is to write a movement: ENTRADA, SAIDA or AJUSTE. That constraint is the entire point of the system — a number that changed without a row explaining why is exactly what the spreadsheets produced." },
        { t: "h2", c: "The more defensible alternative is the one I did not take" },
        { t: "p", c: "The honest option is to store no balance at all and derive it: SUM(quantity) over the movements, every time. That can never drift, because there is nothing to drift from. It is the correct answer in almost every book on the subject." },
        { t: "p", c: "I did not do that, for a boring reason: the warehouse reads stock far more often than it writes it, and the product list is the most-opened screen in the system. Storing the balance makes the common case a single indexed read. Deriving it would make the most-used screen the most expensive one." },
        { t: "h2", c: "What the choice costs" },
        { t: "p", c: "Two writes that have to land together. If the row lands without the balance, the history lies. If the balance lands without the row, the number has no explanation. Both failures are worse than the write not happening at all." },
        { t: "code", lang: "backend/src/routes/movements.js", c: MOVEMENT_TX },
        { t: "p", c: "The transaction is what buys back the correctness that derivation would have given for free. And the negative guard runs before the write, deliberately: a negative balance is not a state the warehouse can be in, so it is not a state the table may hold." },
        { t: "h2", c: "Why AJUSTE exists" },
        { t: "p", c: "Because reality and the database will disagree anyway. Someone drops a box, someone miscounts, someone takes stock without recording it. When the physical count disagrees with the system, the physical count wins — and the correction goes in as its own row, with an author and a date, rather than someone editing the number in the database." },
        { t: "note", c: "An AJUSTE is an admission that the history went incomplete somewhere. Recording it as a movement preserves the property that matters most: every number has a row behind it." },
      ],
      es: [
        { t: "p", c: "El stock no es una columna que alguien edita. Es un saldo en el producto, y la única forma de moverlo es escribir un movimiento: ENTRADA, SAIDA o AJUSTE. Esa restricción es el objetivo entero del sistema: un número que cambió sin una fila que explique por qué es exactamente lo que producían las planillas." },
        { t: "h2", c: "La alternativa más defendible es la que no elegí" },
        { t: "p", c: "La opción honesta es no guardar saldo y derivarlo: SUM(quantity) sobre los movimientos, cada vez. Eso nunca diverge, porque no hay de qué divergir. Es la respuesta correcta en casi todo libro sobre el tema." },
        { t: "p", c: "No lo hice por una razón aburrida: el almacén lee el stock mucho más de lo que lo escribe, y la lista de productos es la pantalla más abierta del sistema. Guardar el saldo convierte el caso común en una lectura indexada. Derivarlo haría que la pantalla más usada fuera la más cara." },
        { t: "h2", c: "Lo que cuesta esta elección" },
        { t: "p", c: "Dos escrituras que tienen que ocurrir juntas. Si entra la fila y no el saldo, el historial miente. Si entra el saldo y no la fila, el número no tiene explicación. Ambas fallas son peores que si la escritura no hubiera ocurrido." },
        { t: "code", lang: "backend/src/routes/movements.js", c: MOVEMENT_TX },
        { t: "p", c: "La transacción es lo que recompra la corrección que la derivación daría gratis. Y la guarda del negativo corre antes de escribir, a propósito: un saldo negativo no es un estado en el que el almacén pueda estar, así que no es un estado que la tabla pueda guardar." },
        { t: "h2", c: "Por qué existe AJUSTE" },
        { t: "p", c: "Porque la realidad y la base de datos van a discrepar de todos modos. Alguien tira una caja, alguien cuenta mal, alguien saca stock sin registrarlo. Cuando el conteo físico discrepa del sistema, gana el conteo físico, y la corrección entra como fila propia, con autor y fecha, en vez de que alguien edite el número en la base." },
        { t: "note", c: "Un AJUSTE es admitir que el historial quedó incompleto en algún punto. Registrarlo como movimiento preserva la propiedad más importante: todo número tiene una fila detrás." },
      ],
    },
  },

  /* ── 3 ── */
  {
    slug: "backend-que-dorme",
    date: "2026-05-30",
    minutes: 4,
    tags: ["Free tier", "UX", "Firebase"],
    source: { label: "estoque-pro · frontend/src/pages/chat/chatHelpers.js", href: "https://github.com/BenjaminCoder0814/estoque-pro" },
    title: {
      pt: "Projetar para um backend que dorme",
      en: "Designing for a backend that falls asleep",
      es: "Diseñar para un backend que se duerme",
    },
    dek: {
      pt: "O sistema roda em plano gratuito. Plano gratuito suspende o que está ocioso. A conta disso cai sempre na pior pessoa possível: a primeira que chega.",
      en: "The system runs on free tiers. Free tiers suspend what is idle. The bill for that always lands on the worst possible person: the first one to arrive.",
      es: "El sistema corre en plan gratuito. El plan gratuito suspende lo que está ocioso. La cuenta cae siempre en la peor persona posible: la primera que llega.",
    },
    body: {
      pt: [
        { t: "p", c: "O Render suspende um serviço ocioso. O Neon suspende um banco ocioso. Os dois acordam sob demanda e os dois levam segundos para isso. É uma troca perfeitamente razoável para um sistema que custa zero — só que ela é cobrada da pessoa que abre o app às sete da manhã." },
        { t: "h2", c: "Spinner é a resposta errada para chat" },
        { t: "p", c: "O instinto é mostrar um carregando e esperar. Funciona para uma tabela. Não funciona para o chat: uma lista de contatos vazia não parece o servidor está acordando, parece não tem ninguém aqui." },
        { t: "p", c: "Um operador de armazém não distingue entre essas duas leituras, e a segunda é a que faz ele fechar a aba e voltar para o WhatsApp — que era exatamente o que o chat interno existia para substituir." },
        { t: "h2", c: "A forma da resposta antes da resposta" },
        { t: "code", lang: "frontend/src/pages/chat/chatHelpers.js", c: FALLBACK },
        { t: "p", c: "A tela renderiza imediatamente com a forma do que vai chegar, e os dados reais substituem isso quando chegam. O comentário é deliberadamente ruidoso sobre o que o array não é — fonte de verdade — porque o jeito como esse padrão falha é alguém, meses depois, ler aqueles IDs como reais e escrever contra eles." },
        { t: "h2", c: "O que custa" },
        { t: "p", c: "Duas representações da mesma lista passam a existir, e elas divergem no instante em que alguém entra na empresa. O fallback é obsoleto por construção e só está certo no formato." },
        { t: "note", c: "A correção honesta não é um fallback melhor. É um backend que não dorme, o que é uma decisão de fatura e não de engenharia. Enquanto essa fatura não existir, o padrão fica — mas fica documentado como contorno, não como arquitetura." },
      ],
      en: [
        { t: "p", c: "Render suspends an idle service. Neon suspends an idle database. Both wake on demand and both take seconds to do it. It is a perfectly reasonable trade for a system that costs nothing to run — except the bill is paid by whoever opens the app at seven in the morning." },
        { t: "h2", c: "A spinner is the wrong answer for chat" },
        { t: "p", c: "The instinct is to show a loading state and wait. That works for a table. It does not work for chat: an empty contact list does not look like the server is waking up, it looks like nobody is here." },
        { t: "p", c: "A warehouse operator does not distinguish between those two readings, and the second one is what makes them close the tab and go back to WhatsApp — which is precisely what the internal chat existed to replace." },
        { t: "h2", c: "The shape of the answer before the answer" },
        { t: "code", lang: "frontend/src/pages/chat/chatHelpers.js", c: FALLBACK },
        { t: "p", c: "The screen renders immediately with the shape of what is coming, and the real data replaces it when it arrives. The comment is deliberately loud about what the array is not — a source of truth — because the way this pattern fails is someone reading those IDs as real months later and writing against them." },
        { t: "h2", c: "What it costs" },
        { t: "p", c: "Two representations of the same list now exist, and they drift the moment somebody joins the company. The fallback is stale by construction and only correct in shape." },
        { t: "note", c: "The honest fix is not a better fallback. It is a backend that does not sleep, which is a billing decision rather than an engineering one. Until that bill exists the pattern stays — but it stays documented as a workaround, not as architecture." },
      ],
      es: [
        { t: "p", c: "Render suspende un servicio ocioso. Neon suspende una base ociosa. Ambos despiertan bajo demanda y ambos tardan segundos en hacerlo. Es un intercambio razonable para un sistema que cuesta cero, salvo que la cuenta la paga quien abre la app a las siete de la mañana." },
        { t: "h2", c: "Un spinner es la respuesta equivocada para el chat" },
        { t: "p", c: "El instinto es mostrar un cargando y esperar. Funciona para una tabla. No funciona para el chat: una lista de contactos vacía no parece el servidor está despertando, parece no hay nadie aquí." },
        { t: "p", c: "Un operario de almacén no distingue entre esas dos lecturas, y la segunda es la que hace que cierre la pestaña y vuelva a WhatsApp, que es justamente lo que el chat interno existía para reemplazar." },
        { t: "h2", c: "La forma de la respuesta antes de la respuesta" },
        { t: "code", lang: "frontend/src/pages/chat/chatHelpers.js", c: FALLBACK },
        { t: "p", c: "La pantalla renderiza de inmediato con la forma de lo que va a llegar, y los datos reales la reemplazan cuando llegan. El comentario es deliberadamente ruidoso sobre lo que el array no es —una fuente de verdad— porque la forma en que este patrón falla es que alguien, meses después, lea esos IDs como reales y escriba contra ellos." },
        { t: "h2", c: "Lo que cuesta" },
        { t: "p", c: "Ahora existen dos representaciones de la misma lista, y divergen en el instante en que alguien entra a la empresa. El fallback está obsoleto por construcción y solo es correcto en su forma." },
        { t: "note", c: "La corrección honesta no es un mejor fallback. Es un backend que no duerma, que es una decisión de factura y no de ingeniería. Mientras esa factura no exista, el patrón se queda, pero queda documentado como rodeo, no como arquitectura." },
      ],
    },
  },

  /* ── 4 ── */
  {
    slug: "corrigir-dados-em-producao",
    date: "2026-07-06",
    minutes: 4,
    tags: ["Operations", "Data", "Zenith ERP"],
    source: { label: "estoque-pro · backend/scripts/", href: "https://github.com/BenjaminCoder0814/estoque-pro" },
    title: {
      pt: "Corrigir dados em produção sem abrir o banco",
      en: "Fixing production data without opening the database",
      es: "Corregir datos en producción sin abrir la base",
    },
    dek: {
      pt: "Um catálogo de produtos físicos nunca está pronto. O jeito mais rápido de consertar é abrir um cliente SQL — e é também o jeito sem registro, sem revisão e sem volta.",
      en: "A catalogue of physical products is never finished. The fastest way to fix it is to open a SQL client — and it is also the way with no record, no review and no undo.",
      es: "Un catálogo de productos físicos nunca está terminado. La forma más rápida de arreglarlo es abrir un cliente SQL, y es también la que no deja registro, revisión ni vuelta atrás.",
    },
    body: {
      pt: [
        { t: "p", c: "Itens são renomeados. Uma categoria se revela errada. Um fornecedor muda uma especificação e uma linha inteira precisa ser reclassificada. Cada um desses é um problema de dados num banco vivo, e nenhum deles é um bug de código." },
        { t: "h2", c: "O padrão que sobrou" },
        { t: "code", lang: "backend/scripts/ — amostra do diretório", c: SCRIPTS },
        { t: "p", c: "O padrão está nos nomes. Um script query- roda primeiro, para ver o que seria afetado. Um update- vem depois, quando a resposta parece certa. O sufixo b em 2026-07-06b é a segunda tentativa do mesmo dia, mantida em vez de sobrescrita." },
        { t: "p", c: "A data no nome do arquivo é o que torna o diretório legível um ano depois. Sem ela, é uma pilha de scripts sem ordem; com ela, é uma linha do tempo das correções do catálogo." },
        { t: "h2", c: "O que isso não é" },
        { t: "p", c: "Não é controle de versão para dados e não finge ser. Não há scripts de reversão, e nada garante que um script rodou exatamente uma vez. Se alguém rodar o mesmo update duas vezes, o resultado depende de o script ser idempotente — e nem todos são." },
        { t: "note", c: "O que se ganha é que toda mudança no catálogo tem um diff, um autor e uma data. Essa é a diferença entre um erro que alguém consegue achar e um erro que ninguém consegue explicar." },
      ],
      en: [
        { t: "p", c: "Items get renamed. A category turns out to be wrong. A supplier changes a specification and a whole product line needs reclassifying. Each of those is a data problem in a live database, and none of them is a code bug." },
        { t: "h2", c: "The pattern that stuck" },
        { t: "code", lang: "backend/scripts/ — a sample of the directory", c: SCRIPTS },
        { t: "p", c: "The pattern is in the names. A query- script runs first, to see what would be affected. An update- follows once the answer looks right. The b suffix on 2026-07-06b is the second attempt of the same day, kept rather than overwritten." },
        { t: "p", c: "The date in the filename is what makes the directory readable a year later. Without it, it is a pile of scripts in no order; with it, it is a timeline of catalogue corrections." },
        { t: "h2", c: "What this is not" },
        { t: "p", c: "It is not version control for data and it does not pretend to be. There are no down-scripts, and nothing guarantees a script ran exactly once. If someone runs the same update twice, the outcome depends on that script being idempotent — and not all of them are." },
        { t: "note", c: "What it buys is that every change to the catalogue has a diff, an author and a date. That is the difference between an error someone can find and an error nobody can explain." },
      ],
      es: [
        { t: "p", c: "Los ítems se renombran. Una categoría resulta estar mal. Un proveedor cambia una especificación y hay que reclasificar una línea entera. Cada uno es un problema de datos en una base viva, y ninguno es un bug de código." },
        { t: "h2", c: "El patrón que quedó" },
        { t: "code", lang: "backend/scripts/ — muestra del directorio", c: SCRIPTS },
        { t: "p", c: "El patrón está en los nombres. Un script query- corre primero, para ver qué se vería afectado. Un update- viene después, cuando la respuesta se ve bien. El sufijo b en 2026-07-06b es el segundo intento del mismo día, conservado en vez de sobrescrito." },
        { t: "p", c: "La fecha en el nombre del archivo es lo que hace legible el directorio un año después. Sin ella es una pila de scripts sin orden; con ella es una línea de tiempo de las correcciones del catálogo." },
        { t: "h2", c: "Lo que esto no es" },
        { t: "p", c: "No es control de versiones para datos y no pretende serlo. No hay scripts de reversión, y nada garantiza que un script haya corrido exactamente una vez. Si alguien corre el mismo update dos veces, el resultado depende de que ese script sea idempotente, y no todos lo son." },
        { t: "note", c: "Lo que se gana es que todo cambio en el catálogo tiene un diff, un autor y una fecha. Esa es la diferencia entre un error que alguien puede encontrar y un error que nadie puede explicar." },
      ],
    },
  },
  /* ── 5 ── */
  {
    slug: "tabela-que-nunca-usei",
    date: "2026-08-02",
    minutes: 5,
    tags: ["Schema design", "Dead code", "Firestore"],
    source: { label: "estoque-pro · backend/prisma/schema.prisma", href: "https://github.com/BenjaminCoder0814/estoque-pro" },
    title: {
      pt: "A tabela que eu modelei e nunca usei",
      en: "The table I modelled and never used",
      es: "La tabla que modelé y nunca usé",
    },
    dek: {
      pt: "Existe um modelo AuditLog no schema, com antes e depois em JSON. Nenhuma rota escreve nele. A auditoria de verdade acabou nascendo em outro lugar.",
      en: "There is an AuditLog model in the schema, with before and after as JSON. No route writes to it. The real audit ended up being born somewhere else.",
      es: "Existe un modelo AuditLog en el schema, con antes y después en JSON. Ninguna ruta escribe en él. La auditoría real terminó naciendo en otro lugar.",
    },
    body: {
      pt: [
        { t: "p", c: "Quando desenhei o schema, auditoria parecia óbvia: toda mudança relevante guarda quem fez, em que entidade, e o estado antes e depois. Escrevi o modelo antes de escrever qualquer rota que fosse usá-lo." },
        { t: "code", lang: "backend/prisma/schema.prisma", c: AUDIT_MODEL },
        { t: "p", c: "É um modelo razoável. O problema é que ele nunca foi preenchido. Nenhuma das seis rotas do backend — auth, media, movements, pendingOrders, products, users — escreve uma linha de AuditLog." },
        { t: "h2", c: "O que aconteceu no lugar" },
        { t: "p", c: "A tela de auditoria existe e funciona. Ela só não lê do Postgres:" },
        { t: "code", c: AUDIT_REAL },
        { t: "p", c: "Contagens físicas, histórico de preços e o log de atividade vivem no Firestore, com onSnapshot atualizando a tela em tempo real. O Firebase já estava no projeto por causa do chat, e reaproveitá-lo custava zero infraestrutura nova — enquanto escrever no AuditLog exigiria tocar em toda rota de escrita do backend." },
        { t: "h2", c: "Por que isso é dívida e não uma escolha" },
        { t: "p", c: "Se fosse uma decisão consciente, o modelo teria sido removido do schema. Ele ficou. E um modelo que existe no schema é uma promessa: a próxima pessoa que ler aquele arquivo vai assumir que existe trilha de auditoria no banco relacional, e vai construir em cima de uma tabela vazia." },
        { t: "p", c: "Há ainda uma consequência prática. Auditoria no Firestore e dados no Postgres significam que não dá para responder, numa consulta só, quem mudou o saldo deste produto — porque o saldo e a explicação estão em bancos diferentes." },
        { t: "note", c: "A correção é escolher: ou o AuditLog passa a ser escrito nas rotas de escrita e a tela migra para ele, ou o modelo sai do schema e a auditoria assume publicamente que mora no Firestore. O que não pode continuar é as duas coisas coexistirem, com uma delas mentindo." },
      ],
      en: [
        { t: "p", c: "When I designed the schema, auditing looked obvious: every meaningful change records who did it, on which entity, and the state before and after. I wrote the model before writing any route that would use it." },
        { t: "code", lang: "backend/prisma/schema.prisma", c: AUDIT_MODEL },
        { t: "p", c: "It is a reasonable model. The problem is that it was never populated. None of the backend's six route files — auth, media, movements, pendingOrders, products, users — writes a single AuditLog row." },
        { t: "h2", c: "What happened instead" },
        { t: "p", c: "The audit screen exists and works. It just does not read from Postgres:" },
        { t: "code", c: AUDIT_REAL },
        { t: "p", c: "Physical counts, price history and the activity log live in Firestore, with onSnapshot keeping the screen current. Firebase was already in the project because of chat, and reusing it cost no new infrastructure — whereas writing AuditLog rows would have meant touching every write route in the backend." },
        { t: "h2", c: "Why this is debt rather than a choice" },
        { t: "p", c: "If it had been a deliberate decision, the model would have been deleted from the schema. It stayed. And a model that exists in a schema is a promise: the next person to read that file will assume there is an audit trail in the relational database, and will build on top of an empty table." },
        { t: "p", c: "There is a practical consequence too. Auditing in Firestore and data in Postgres means you cannot answer, in a single query, who changed this product's balance — because the balance and the explanation live in different databases." },
        { t: "note", c: "The fix is to pick one: either AuditLog starts being written by the write routes and the screen moves to it, or the model leaves the schema and the audit trail admits publicly that it lives in Firestore. What cannot continue is both existing with one of them lying." },
      ],
      es: [
        { t: "p", c: "Cuando diseñé el schema, la auditoría parecía obvia: todo cambio relevante guarda quién lo hizo, sobre qué entidad, y el estado antes y después. Escribí el modelo antes de escribir cualquier ruta que fuera a usarlo." },
        { t: "code", lang: "backend/prisma/schema.prisma", c: AUDIT_MODEL },
        { t: "p", c: "Es un modelo razonable. El problema es que nunca se llenó. Ninguna de las seis rutas del backend — auth, media, movements, pendingOrders, products, users — escribe una fila de AuditLog." },
        { t: "h2", c: "Qué pasó en su lugar" },
        { t: "p", c: "La pantalla de auditoría existe y funciona. Solo que no lee de Postgres:" },
        { t: "code", c: AUDIT_REAL },
        { t: "p", c: "Los conteos físicos, el historial de precios y el log de actividad viven en Firestore, con onSnapshot manteniendo la pantalla al día. Firebase ya estaba en el proyecto por el chat, y reutilizarlo no costaba infraestructura nueva, mientras que escribir en AuditLog habría implicado tocar todas las rutas de escritura." },
        { t: "h2", c: "Por qué esto es deuda y no una decisión" },
        { t: "p", c: "Si hubiera sido una decisión consciente, el modelo se habría borrado del schema. Se quedó. Y un modelo que existe en un schema es una promesa: la próxima persona que lea ese archivo asumirá que hay traza de auditoría en la base relacional, y construirá sobre una tabla vacía." },
        { t: "p", c: "Hay además una consecuencia práctica. Auditoría en Firestore y datos en Postgres significa que no se puede responder, en una sola consulta, quién cambió el saldo de este producto, porque el saldo y la explicación están en bases distintas." },
        { t: "note", c: "La corrección es elegir: o AuditLog empieza a escribirse en las rutas de escritura y la pantalla migra a él, o el modelo sale del schema y la auditoría asume públicamente que vive en Firestore. Lo que no puede seguir es que coexistan con una de las dos mintiendo." },
      ],
    },
  },

  /* ── 6 ── */
  {
    slug: "papeis-copiados-do-organograma",
    date: "2026-07-28",
    minutes: 4,
    tags: ["RBAC", "Express", "Product thinking"],
    source: { label: "estoque-pro · backend/src/routes/users.js", href: "https://github.com/BenjaminCoder0814/estoque-pro" },
    title: {
      pt: "Papéis copiados do organograma",
      en: "Roles copied from the org chart",
      es: "Roles copiados del organigrama",
    },
    dek: {
      pt: "Quase todo tutorial de RBAC inventa admin, user e guest. A empresa já tinha nomes para as pessoas antes de ter software — usar os dela custou menos e explicou-se sozinho.",
      en: "Almost every RBAC tutorial invents admin, user and guest. The company already had names for people before it had software — using its names cost less and explained itself.",
      es: "Casi todo tutorial de RBAC inventa admin, user y guest. La empresa ya tenía nombres para las personas antes de tener software — usar los suyos costó menos y se explicó solo.",
    },
    body: {
      pt: [
        { t: "p", c: "Os papéis do sistema são EXPEDICAO, PRODUCAO, COMPRAS, COMERCIAL, CENTRAL_ATENDIMENTO, SUPERVISAO, DIRETORIA, TI e ADMIN. Nenhum deles foi inventado por mim: são as áreas que já existiam no organograma, com os nomes que as pessoas já usavam." },
        { t: "p", c: "Isso resolve de graça o problema mais chato de controle de acesso, que não é técnico. Ninguém precisa aprender o que seu perfil significa — ele é o cargo que a pessoa já tem." },
        { t: "h2", c: "A checagem é entediante de propósito" },
        { t: "code", lang: "backend/src/routes/users.js", c: ROLES_GUARD },
        { t: "p", c: "Um middleware, uma lista de papéis, aplicado por rota. Sem hierarquia, sem herança, sem árvore de permissões. Gerenciar usuários é privilégio de ADMIN, TI e DIRETORIA, e isso está escrito na própria linha da rota — dá para auditar o backend inteiro lendo as declarações." },
        { t: "h2", c: "VISITANTE é o detalhe que mais importa" },
        { t: "p", c: "Todo usuário novo nasce como VISITANTE, que não é um papel com poucas permissões: é um papel sem nenhuma. O estado seguro é acesso zero, não acesso parcial." },
        { t: "p", c: "E o VISITANTE também some da lista de contatos do chat:" },
        { t: "code", lang: "GET /api/users/contacts", c: ROLES_CONTACTS },
        { t: "p", c: "Uma conta ainda não liberada não aparece para ninguém conversar. É uma linha de filtro que evita a pergunta quem é essa pessoa? antes que alguém precise fazê-la." },
        { t: "h2", c: "O que essa simplicidade custa" },
        { t: "note", c: "Papel é uma string na linha do usuário, então criar um papel novo é mudança de código e deploy, não configuração. Aceitável enquanto os papéis forem o organograma — que muda em anos. No dia em que alguém precisar de uma permissão que não existe em nenhum cargo, esse modelo quebra, e a resposta certa será ACL por permissão, não mais um papel." },
      ],
      en: [
        { t: "p", c: "The system's roles are EXPEDICAO, PRODUCAO, COMPRAS, COMERCIAL, CENTRAL_ATENDIMENTO, SUPERVISAO, DIRETORIA, TI and ADMIN. I invented none of them: they are the divisions that already existed on the org chart, under the names people already used." },
        { t: "p", c: "That solves the most tedious problem in access control for free, and it is not a technical one. Nobody has to learn what their role means — it is the job title they already have." },
        { t: "h2", c: "The check is deliberately boring" },
        { t: "code", lang: "backend/src/routes/users.js", c: ROLES_GUARD },
        { t: "p", c: "One middleware, one list of roles, applied per route. No hierarchy, no inheritance, no permission tree. Managing users belongs to ADMIN, TI and DIRETORIA, and that is written on the route line itself — you can audit the whole backend by reading the declarations." },
        { t: "h2", c: "VISITANTE is the detail that matters most" },
        { t: "p", c: "Every new user starts as VISITANTE, which is not a role with few permissions: it is a role with none. The safe state is no access, not partial access." },
        { t: "p", c: "And VISITANTE also disappears from the chat contact list:" },
        { t: "code", lang: "GET /api/users/contacts", c: ROLES_CONTACTS },
        { t: "p", c: "An account that has not been granted anything yet is not someone you can message. It is one filter clause that prevents the question who is this person? before anyone has to ask it." },
        { t: "h2", c: "What the simplicity costs" },
        { t: "note", c: "A role is a string on the user row, so adding one is a code change and a deploy, not configuration. That is acceptable while the roles are the org chart — which changes in years. The day someone needs a permission that belongs to no job title, this model breaks, and the right answer will be per-permission ACL rather than one more role." },
      ],
      es: [
        { t: "p", c: "Los roles del sistema son EXPEDICAO, PRODUCAO, COMPRAS, COMERCIAL, CENTRAL_ATENDIMENTO, SUPERVISAO, DIRETORIA, TI y ADMIN. Ninguno lo inventé yo: son las áreas que ya existían en el organigrama, con los nombres que la gente ya usaba." },
        { t: "p", c: "Eso resuelve gratis el problema más tedioso del control de acceso, que no es técnico. Nadie tiene que aprender qué significa su perfil: es el cargo que ya tiene." },
        { t: "h2", c: "La verificación es aburrida a propósito" },
        { t: "code", lang: "backend/src/routes/users.js", c: ROLES_GUARD },
        { t: "p", c: "Un middleware, una lista de roles, aplicado por ruta. Sin jerarquía, sin herencia, sin árbol de permisos. Gestionar usuarios es privilegio de ADMIN, TI y DIRETORIA, y está escrito en la línea de la ruta: se puede auditar todo el backend leyendo las declaraciones." },
        { t: "h2", c: "VISITANTE es el detalle que más importa" },
        { t: "p", c: "Todo usuario nuevo nace como VISITANTE, que no es un rol con pocos permisos: es un rol sin ninguno. El estado seguro es acceso cero, no acceso parcial." },
        { t: "p", c: "Y VISITANTE también desaparece de la lista de contactos del chat:" },
        { t: "code", lang: "GET /api/users/contacts", c: ROLES_CONTACTS },
        { t: "p", c: "Una cuenta todavía no habilitada no aparece para que nadie le escriba. Es una cláusula de filtro que evita la pregunta ¿quién es esta persona? antes de que alguien tenga que hacerla." },
        { t: "h2", c: "Lo que cuesta esta simplicidad" },
        { t: "note", c: "El rol es un string en la fila del usuario, así que crear uno nuevo es cambio de código y deploy, no configuración. Aceptable mientras los roles sean el organigrama, que cambia en años. El día que alguien necesite un permiso que no pertenece a ningún cargo, este modelo se rompe, y la respuesta correcta será ACL por permiso, no un rol más." },
      ],
    },
  },

  /* ── 7 ── */
  {
    slug: "onde-o-sistema-mora",
    date: "2026-07-12",
    minutes: 5,
    tags: ["Deploy", "CORS", "Operations"],
    source: { label: "estoque-pro · backend/src/server.js", href: "https://github.com/BenjaminCoder0814/estoque-pro" },
    title: {
      pt: "Onde o sistema mora: quatro serviços gratuitos e uma allowlist",
      en: "Where the system lives: four free services and an allowlist",
      es: "Dónde vive el sistema: cuatro servicios gratuitos y una allowlist",
    },
    dek: {
      pt: "O front na Netlify, a API no Render, o banco no Neon, o chat no Firebase. Custo somado: zero. O que isso obriga a resolver não é zero.",
      en: "Front end on Netlify, API on Render, database on Neon, chat on Firebase. Total cost: zero. What that forces you to solve is not zero.",
      es: "El front en Netlify, la API en Render, la base en Neon, el chat en Firebase. Costo total: cero. Lo que eso obliga a resolver no es cero.",
    },
    body: {
      pt: [
        { t: "p", c: "Quatro provedores, quatro planos gratuitos, quatro domínios diferentes. A primeira consequência disso é que nada é same-origin: o navegador precisa ser autorizado explicitamente a falar com a API." },
        { t: "h2", c: "A allowlist e o medo de se trancar para fora" },
        { t: "code", lang: "backend/src/server.js", c: CORS_ALLOWLIST },
        { t: "p", c: "Três detalhes desse trecho importam mais do que parecem." },
        { t: "p", c: "O primeiro é a mesclagem entre a lista fixa e a variável de ambiente. Se a allowlist viesse só de CORS_ORIGIN, uma variável mal digitada no painel do Render derrubaria o acesso ao sistema inteiro — em produção, num sábado, sem ninguém para consertar. Manter os domínios de produção no código é um seguro contra o próprio operador." },
        { t: "p", c: "O segundo é normalizar a origin antes de comparar. Barra no final é a diferença entre funcionar e não funcionar, e é o tipo de bug que consome uma tarde." },
        { t: "p", c: "O terceiro é o if (!origin) return callback(null, true). Requisições sem Origin não vêm de navegador — são health checks e chamadas servidor-a-servidor. Bloqueá-las quebraria o monitoramento sem melhorar segurança nenhuma, porque CORS nunca foi um mecanismo de autenticação." },
        { t: "h2", c: "O health check existe por causa do plano gratuito" },
        { t: "code", c: HEALTH },
        { t: "p", c: "Ele não responde ok se o processo está de pé. Ele encosta no banco com um SELECT 1, porque o modo de falha real dessa arquitetura não é a API cair — é a API estar viva e o banco estar suspenso. Um health check que só confirma o processo mentiria exatamente na hora em que a resposta importa." },
        { t: "note", c: "O que essa topologia realmente compra é a possibilidade de existir: um sistema que roda de graça é um sistema que ninguém precisa aprovar orçamento para manter no ar. O preço é latência de cold start, uma superfície de configuração espalhada por quatro painéis, e nenhum SLA em lugar nenhum." },
      ],
      en: [
        { t: "p", c: "Four providers, four free tiers, four different domains. The first consequence is that nothing is same-origin: the browser has to be explicitly permitted to talk to the API." },
        { t: "h2", c: "The allowlist, and the fear of locking yourself out" },
        { t: "code", lang: "backend/src/server.js", c: CORS_ALLOWLIST },
        { t: "p", c: "Three details in that snippet matter more than they look." },
        { t: "p", c: "The first is merging the hard-coded list with the environment variable. If the allowlist came only from CORS_ORIGIN, one mistyped variable in the Render dashboard would take down access to the entire system — in production, on a Saturday, with nobody around to fix it. Keeping the production domains in code is insurance against the operator, who is me." },
        { t: "p", c: "The second is normalising the origin before comparing. A trailing slash is the difference between working and not working, and it is the kind of bug that eats an afternoon." },
        { t: "p", c: "The third is if (!origin) return callback(null, true). Requests without an Origin header are not from a browser — they are health checks and server-to-server calls. Blocking them would break monitoring without improving security at all, because CORS was never an authentication mechanism." },
        { t: "h2", c: "The health check exists because of the free tier" },
        { t: "code", c: HEALTH },
        { t: "p", c: "It does not answer ok merely because the process is up. It touches the database with SELECT 1, because the real failure mode of this architecture is not the API going down — it is the API being alive while the database is suspended. A health check that only confirms the process would lie at exactly the moment the answer matters." },
        { t: "note", c: "What this topology really buys is the possibility of existing: a system that runs for free is a system nobody has to approve a budget to keep online. The price is cold-start latency, a configuration surface spread across four dashboards, and no SLA anywhere." },
      ],
      es: [
        { t: "p", c: "Cuatro proveedores, cuatro planes gratuitos, cuatro dominios distintos. La primera consecuencia es que nada es same-origin: el navegador necesita autorización explícita para hablar con la API." },
        { t: "h2", c: "La allowlist y el miedo a dejarse fuera" },
        { t: "code", lang: "backend/src/server.js", c: CORS_ALLOWLIST },
        { t: "p", c: "Tres detalles de ese fragmento importan más de lo que parecen." },
        { t: "p", c: "El primero es mezclar la lista fija con la variable de entorno. Si la allowlist viniera solo de CORS_ORIGIN, una variable mal escrita en el panel de Render tumbaría el acceso al sistema entero, en producción, un sábado, sin nadie para arreglarlo. Mantener los dominios de producción en el código es un seguro contra el propio operador." },
        { t: "p", c: "El segundo es normalizar la origin antes de comparar. Una barra final es la diferencia entre funcionar y no funcionar, y es el tipo de bug que se come una tarde." },
        { t: "p", c: "El tercero es if (!origin) return callback(null, true). Las peticiones sin cabecera Origin no vienen de un navegador: son health checks y llamadas servidor a servidor. Bloquearlas rompería el monitoreo sin mejorar la seguridad, porque CORS nunca fue un mecanismo de autenticación." },
        { t: "h2", c: "El health check existe por el plan gratuito" },
        { t: "code", c: HEALTH },
        { t: "p", c: "No responde ok solo porque el proceso esté vivo. Toca la base con un SELECT 1, porque el modo de falla real de esta arquitectura no es que la API se caiga, sino que la API esté viva y la base suspendida. Un health check que solo confirma el proceso mentiría justo cuando la respuesta importa." },
        { t: "note", c: "Lo que esta topología compra de verdad es la posibilidad de existir: un sistema que corre gratis es un sistema que nadie tiene que aprobar en un presupuesto para mantener en línea. El precio es latencia de arranque en frío, una superficie de configuración repartida en cuatro paneles, y ningún SLA en ninguna parte." },
      ],
    },
  },

  /* ── 8 ── */
  {
    slug: "horario-comercial-como-resposta-http",
    date: "2026-06-28",
    minutes: 3,
    tags: ["Domain rules", "Node.js", "UX"],
    source: { label: "estoque-pro · backend/src/utils/businessHours.js", href: "https://github.com/BenjaminCoder0814/estoque-pro" },
    title: {
      pt: "Quando a regra de negócio vira uma resposta HTTP",
      en: "When the business rule becomes an HTTP response",
      es: "Cuando la regla de negocio se vuelve una respuesta HTTP",
    },
    dek: {
      pt: "O sistema não abre no fim de semana. Não é uma limitação técnica — é a política da empresa, e o único lugar onde ela pode ser aplicada é o código.",
      en: "The system does not open on weekends. That is not a technical limitation — it is company policy, and the only place it can be enforced is the code.",
      es: "El sistema no abre los fines de semana. No es una limitación técnica: es la política de la empresa, y el único lugar donde puede aplicarse es el código.",
    },
    body: {
      pt: [
        { t: "code", lang: "backend/src/utils/businessHours.js", c: BUSINESS_HOURS },
        { t: "p", c: "Segunda a quinta das 07:00 às 18:00. Sexta até as 16:00. Sábado e domingo, nada. Um desenvolvedor lendo isso fora de contexto vê uma restrição arbitrária que vai atrapalhar alguém no pior momento possível." },
        { t: "h2", c: "O detalhe que salva a regra" },
        { t: "p", c: "A função não devolve um booleano. Ela devolve { ok: false, reason: '...' } — e a razão é uma frase em português, escrita para a pessoa que bateu na porta, não para o log." },
        { t: "p", c: "Essa diferença é tudo. Um sistema que responde 403 sem explicação transfere o problema para um colega: a pessoa bloqueada vai perguntar para alguém por que não consegue entrar. Um sistema que responde na sexta-feira o acesso é das 07:00 às 16:00 encerra o assunto ali." },
        { t: "h2", c: "O que eu ainda não resolvi" },
        { t: "p", c: "A regra está codificada, não configurada. Não há tela onde a diretoria mude o horário, e não há exceção prevista — inventário de fim de ano, hora extra, um sábado de mutirão." },
        { t: "note", c: "Enquanto a exceção não acontece, isso é simplicidade. No dia em que acontecer, vira um deploy às pressas para liberar um sábado. É a diferença entre uma regra que o negócio controla e uma que o desenvolvedor controla — e eu escolhi a segunda sem que ninguém tivesse pedido isso." },
      ],
      en: [
        { t: "code", lang: "backend/src/utils/businessHours.js", c: BUSINESS_HOURS },
        { t: "p", c: "Monday to Thursday, 07:00 to 18:00. Friday until 16:00. Saturday and Sunday, nothing. A developer reading this out of context sees an arbitrary restriction that will get in someone's way at the worst possible moment." },
        { t: "h2", c: "The detail that rescues the rule" },
        { t: "p", c: "The function does not return a boolean. It returns { ok: false, reason: '...' } — and the reason is a sentence in Portuguese, written for the person at the door rather than for the log." },
        { t: "p", c: "That difference is everything. A system that answers 403 with no explanation hands the problem to a colleague: the blocked person goes and asks someone why they cannot get in. A system that answers on Friday, access runs from 07:00 to 16:00 ends the conversation there." },
        { t: "h2", c: "What I have not solved" },
        { t: "p", c: "The rule is coded, not configured. There is no screen where management changes the hours, and no exception is anticipated — year-end stocktaking, overtime, an all-hands Saturday." },
        { t: "note", c: "Until the exception happens, this is simplicity. The day it happens, it becomes a rushed deploy to unlock a Saturday. That is the difference between a rule the business controls and a rule the developer controls — and I picked the second without anyone having asked for it." },
      ],
      es: [
        { t: "code", lang: "backend/src/utils/businessHours.js", c: BUSINESS_HOURS },
        { t: "p", c: "De lunes a jueves de 07:00 a 18:00. Viernes hasta las 16:00. Sábado y domingo, nada. Un desarrollador que lea esto fuera de contexto ve una restricción arbitraria que va a estorbar a alguien en el peor momento." },
        { t: "h2", c: "El detalle que rescata la regla" },
        { t: "p", c: "La función no devuelve un booleano. Devuelve { ok: false, reason: '...' }, y la razón es una frase en portugués, escrita para la persona que tocó la puerta, no para el log." },
        { t: "p", c: "Esa diferencia lo es todo. Un sistema que responde 403 sin explicación traslada el problema a un colega: la persona bloqueada va a preguntarle a alguien por qué no puede entrar. Un sistema que responde el viernes el acceso es de 07:00 a 16:00 cierra el tema ahí." },
        { t: "h2", c: "Lo que todavía no resolví" },
        { t: "p", c: "La regla está codificada, no configurada. No hay pantalla donde la dirección cambie el horario, y no hay excepción prevista: inventario de fin de año, horas extra, un sábado de refuerzo." },
        { t: "note", c: "Mientras la excepción no ocurra, esto es simplicidad. El día que ocurra, se vuelve un deploy apurado para liberar un sábado. Esa es la diferencia entre una regla que controla el negocio y una que controla el desarrollador, y elegí la segunda sin que nadie lo pidiera." },
      ],
    },
  },

  /* ── 9 ── */
  {
    slug: "andaime-que-nunca-rodou",
    date: "2026-08-19",
    minutes: 5,
    tags: ["CI/CD", "Docker", "Lessons"],
    source: { label: "TCC-MUSCLE-LEVELS · .github/workflows/ci.yml", href: "https://github.com/BenjaminCoder0814/TCC-MUSCLE-LEVELS" },
    title: {
      pt: "O andaime que nunca rodou",
      en: "The scaffolding that never ran",
      es: "El andamio que nunca corrió",
    },
    dek: {
      pt: "Meu TCC tem CI, Dockerfile, templates de issue e notificação no Discord. Fui reler tudo isso com atenção e descobri que nada disso jamais executou uma vez.",
      en: "My graduation project has CI, a Dockerfile, issue templates and Discord notifications. I went back and read all of it carefully, and found that none of it has ever executed once.",
      es: "Mi proyecto de graduación tiene CI, Dockerfile, plantillas de issue y notificaciones a Discord. Volví a leerlo con atención y descubrí que nada de eso ejecutó jamás.",
    },
    body: {
      pt: [
        { t: "p", c: "Escrevo isto sobre o meu próprio repositório, e não é confortável. Mas é o tipo de coisa que um entrevistador técnico descobre em dois minutos, e prefiro ser eu a apontar." },
        { t: "h2", c: "O CI que aponta para uma branch inexistente" },
        { t: "code", lang: ".github/workflows/ci.yml", c: CI_BRANCH },
        { t: "p", c: "O workflow dispara em push e pull request para main. O repositório tem exatamente uma branch, chamada master. O workflow nunca foi acionado — não falhou, o que seria útil, simplesmente nunca rodou." },
        { t: "p", c: "E se rodasse, falharia na instalação: o job usa pnpm com --frozen-lockfile, e o repositório versiona package-lock.json, do npm. Não existe pnpm-lock.yaml." },
        { t: "h2", c: "O Dockerfile que copia o que não existe" },
        { t: "code", lang: "Dockerfile", c: DOCKER_GHOST },
        { t: "p", c: "Duas linhas, dois arquivos fantasmas. Não há pnpm-lock.yaml e não há pasta prisma/ — nenhuma, em lugar nenhum do repositório. O build morre no primeiro COPY." },
        { t: "h2", c: "Por que isso aconteceu" },
        { t: "p", c: "Porque configuração parece trabalho feito. Adicionar um ci.yml dá a sensação exata de ter integração contínua, e o arquivo fica lá, verde no editor, dizendo que existe. A diferença entre ter CI e ter um arquivo de CI só aparece quando alguém quebra o build e ninguém é avisado." },
        { t: "p", c: "O mesmo vale para o Dockerfile: ele foi escrito para uma versão do projeto que usava Prisma e pnpm. O projeto mudou; o Dockerfile não. Ninguém percebeu porque ninguém tentou rodar." },
        { t: "h2", c: "O que eu tirei disso" },
        { t: "p", c: "Configuração que nunca executa não é configuração, é decoração. E decoração em repositório é pior do que ausência, porque a ausência é honesta: um repo sem CI diz que não tem CI. Um repo com CI quebrado diz que tem." },
        { t: "note", c: "A correção é pequena — trocar main por master, gerar o lockfile que o CI espera, e ou restaurar a pasta prisma/ ou remover as linhas do Dockerfile. O que não é pequeno é o hábito: nunca commitar um arquivo de automação sem ver ele rodar uma vez, verde, antes de seguir em frente." },
      ],
      en: [
        { t: "p", c: "I am writing this about my own repository, and it is not comfortable. But it is the kind of thing a technical interviewer finds in two minutes, and I would rather be the one pointing at it." },
        { t: "h2", c: "The CI that targets a branch that does not exist" },
        { t: "code", lang: ".github/workflows/ci.yml", c: CI_BRANCH },
        { t: "p", c: "The workflow triggers on push and pull request to main. The repository has exactly one branch, called master. The workflow has never been triggered — it has not failed, which would at least be useful. It simply never ran." },
        { t: "p", c: "And if it did run, it would fail at install: the job uses pnpm with --frozen-lockfile, and the repository commits package-lock.json, from npm. There is no pnpm-lock.yaml." },
        { t: "h2", c: "The Dockerfile that copies what is not there" },
        { t: "code", lang: "Dockerfile", c: DOCKER_GHOST },
        { t: "p", c: "Two lines, two ghost files. There is no pnpm-lock.yaml and no prisma/ directory — none, anywhere in the repository. The build dies on the first COPY." },
        { t: "h2", c: "Why this happened" },
        { t: "p", c: "Because configuration feels like completed work. Adding a ci.yml gives the exact sensation of having continuous integration, and the file sits there, syntax-highlighted, asserting that it exists. The gap between having CI and having a CI file only shows up when someone breaks the build and nobody is told." },
        { t: "p", c: "The same is true of the Dockerfile: it was written for a version of the project that used Prisma and pnpm. The project moved on; the Dockerfile did not. Nobody noticed because nobody tried to run it." },
        { t: "h2", c: "What I took from it" },
        { t: "p", c: "Configuration that never executes is not configuration, it is decoration. And decoration in a repository is worse than absence, because absence is honest: a repo with no CI says it has no CI. A repo with broken CI says it has CI." },
        { t: "note", c: "The fix is small — change main to master, generate the lockfile the CI expects, and either restore the prisma/ directory or delete those Dockerfile lines. What is not small is the habit: never commit an automation file without watching it run once, green, before moving on." },
      ],
      es: [
        { t: "p", c: "Escribo esto sobre mi propio repositorio, y no es cómodo. Pero es el tipo de cosa que un entrevistador técnico encuentra en dos minutos, y prefiero ser yo quien lo señale." },
        { t: "h2", c: "El CI que apunta a una rama que no existe" },
        { t: "code", lang: ".github/workflows/ci.yml", c: CI_BRANCH },
        { t: "p", c: "El workflow se dispara en push y pull request a main. El repositorio tiene exactamente una rama, llamada master. El workflow nunca se activó: no falló, lo que al menos sería útil. Simplemente nunca corrió." },
        { t: "p", c: "Y si corriera, fallaría en la instalación: el job usa pnpm con --frozen-lockfile, y el repositorio versiona package-lock.json, de npm. No existe pnpm-lock.yaml." },
        { t: "h2", c: "El Dockerfile que copia lo que no está" },
        { t: "code", lang: "Dockerfile", c: DOCKER_GHOST },
        { t: "p", c: "Dos líneas, dos archivos fantasma. No hay pnpm-lock.yaml ni carpeta prisma/ — ninguna, en ninguna parte del repositorio. El build muere en el primer COPY." },
        { t: "h2", c: "Por qué pasó esto" },
        { t: "p", c: "Porque la configuración se siente como trabajo hecho. Agregar un ci.yml da la sensación exacta de tener integración continua, y el archivo queda ahí, coloreado en el editor, afirmando que existe. La diferencia entre tener CI y tener un archivo de CI solo aparece cuando alguien rompe el build y nadie se entera." },
        { t: "p", c: "Lo mismo con el Dockerfile: se escribió para una versión del proyecto que usaba Prisma y pnpm. El proyecto cambió; el Dockerfile no. Nadie lo notó porque nadie intentó ejecutarlo." },
        { t: "h2", c: "Lo que saqué de esto" },
        { t: "p", c: "La configuración que nunca se ejecuta no es configuración, es decoración. Y la decoración en un repositorio es peor que la ausencia, porque la ausencia es honesta: un repo sin CI dice que no tiene CI. Un repo con CI roto dice que tiene." },
        { t: "note", c: "La corrección es pequeña: cambiar main por master, generar el lockfile que el CI espera, y o restaurar la carpeta prisma/ o borrar esas líneas del Dockerfile. Lo que no es pequeño es el hábito: nunca commitear un archivo de automatización sin verlo correr una vez, en verde, antes de seguir." },
      ],
    },
  },
];

export const noteBySlug = (slug: string) => notes.find((n) => n.slug === slug);
