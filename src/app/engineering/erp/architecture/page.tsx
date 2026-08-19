import {
  PageHeader, Breadcrumb, H2, H3, Prose, Lead, Callout, DefList, Code, PageNav, CardGrid, Card,
} from "@/components/engineering/ui";
import { SystemDiagram, DataModelDiagram, MovementFlowDiagram } from "@/components/engineering/Diagrams";

export const metadata = { title: "Architecture — Enterprise Operations Platform" };

export default function Architecture() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Engineering", href: "/engineering" },
          { label: "Enterprise Operations Platform", href: "/engineering/erp" },
          { label: "Architecture" },
        ]}
      />

      <PageHeader
        eyebrow="Enterprise Operations Platform"
        title="Architecture"
        lead="How the system is put together, and why each layer exists. The reasoning behind each choice lives in the decision records."
        meta={["React · Vite · Node.js · Express · Prisma · PostgreSQL · Firebase · JWT"]}
      />

      {/* ── OVERVIEW ────────────────────────────────────────────────────── */}
      <H2 id="overview">System overview</H2>

      <Lead>
        A React single-page application over a decoupled Express REST API on PostgreSQL. The one
        surface that genuinely has to be live — internal chat — runs on Firestore rather than on a
        real-time channel of our own.
      </Lead>

      <SystemDiagram />

      <Prose>
        <p>
          Decoupling the client from the server was driven by usage, not fashion. Warehouse
          operators check stock dozens of times a day and sales staff price items while a customer
          waits. A full page load per lookup would have made the system slower than the
          spreadsheet it replaced — which is the one way it could have failed completely.
        </p>
      </Prose>

      {/* ── DATA MODEL ──────────────────────────────────────────────────── */}
      <H2 id="data-model">Data model</H2>

      <Prose>
        <p>
          This is the defining constraint of the whole system: <strong>three legal entities share
          one physical warehouse.</strong> Each needs a ledger that stands on its own for
          accounting and audit. Administration needs one consolidated view. Stock physically moves
          between them.
        </p>
        <p>
          Every stock row and every movement carries an entity identifier. That single decision is
          what makes both views possible from one source of truth — and it&apos;s why they can
          never disagree.
        </p>
      </Prose>

      <DataModelDiagram />

      <Callout tone="risk" title="The critical invariant">
        <p className="mb-2">
          <strong>Every query that touches stock must be entity-aware.</strong>
        </p>
        <p>
          A query missing its entity filter doesn&apos;t crash — it silently returns another
          company&apos;s data. It is the most dangerous class of bug in this codebase precisely
          because it fails quietly. Making it structurally impossible, rather than merely
          discouraged, is the highest-priority item on the{" "}
          <a href="/engineering/erp/roadmap" className="text-[#00d4ff] hover:underline">roadmap</a>.
        </p>
      </Callout>

      {/* ── TRANSFERS ───────────────────────────────────────────────────── */}
      <H2 id="movements">Stock movements</H2>

      <Prose>
        <p>
          Stock is not a column anyone edits. It is a balance on the product, and the only way to
          move it is to write a movement — <code>ENTRADA</code>, <code>SAIDA</code> or{" "}
          <code>AJUSTE</code>. That constraint is the whole point: a number that changed without a
          row explaining why is exactly what the spreadsheets produced.
        </p>
        <p>
          Which means every write is two writes — the movement row and the new balance — and they
          have to land together. If the row lands without the balance, the history lies. If the
          balance lands without the row, the number has no explanation. Both failures are worse
          than the write not happening at all.
        </p>
      </Prose>

      <MovementFlowDiagram />

      <Code lang="backend/src/routes/movements.js">{`router.post('/', ah(async (req, res) => {
  const { productId, type, quantity, note } = req.body || {};
  const q = Number(quantity || 0);
  if (!productId || !type || q <= 0)
    return res.status(400).json({ ok: false, error: 'Dados inválidos' });

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });
  if (!product)
    return res.status(404).json({ ok: false, error: 'Produto não encontrado' });

  let nextStock = product.stockCurrent;
  if (type === 'ENTRADA') nextStock += q;
  if (type === 'SAIDA')   nextStock -= q;
  if (type === 'AJUSTE')  nextStock  = q;

  // Refuse before writing. A negative balance is not a state the
  // warehouse can be in, so it is not a state the table may hold.
  if (nextStock < 0)
    return res.status(400).json({ ok: false, error: 'Estoque não pode ficar negativo' });

  const [movement] = await prisma.$transaction([
    prisma.movement.create({
      data: { productId: product.id, userId: req.user?.id ?? null, type, quantity: q, note: note || '' },
    }),
    prisma.product.update({
      where: { id: product.id },
      data:  { stockCurrent: nextStock },
    }),
  ]);

  return res.status(201).json({ ok: true, data: movement });
}));`}</Code>

      <Callout tone="insight" title="Why the balance is stored, not summed">
        The honest alternative is to keep no balance at all and derive it —{" "}
        <code>SUM(quantity)</code> over the movements, every time. That can never drift, because
        there is nothing to drift from. It was rejected for a boring reason: the warehouse reads
        stock far more often than it writes it, and the product list is the most-opened screen in
        the system. Storing the balance makes the common case a single indexed read, and{" "}
        <code>$transaction</code> is what buys back the correctness that derivation would have
        given for free. <code>AJUSTE</code> exists for when reality and the balance disagree
        anyway — a physical count wins, and the adjustment is recorded as its own row rather than
        edited in silently.
      </Callout>

      {/* ── REAL TIME ───────────────────────────────────────────────────── */}
      <H2 id="realtime">Real-time layer</H2>

      <Prose>
        <p>
          Only one thing in this system is actually real-time, and it is not stock. It is chat.
        </p>
      </Prose>

      <DefList
        items={[
          {
            term: "Chat runs on Firestore",
            tone: "purple",
            desc: (
              <>
                Messages live in a <code>chat_conversas</code> collection with Firebase
                Authentication behind them. The client subscribes; Google operates the socket, the
                reconnection and the offline queue. The reason it exists at all is that internal
                communication was running through a paid external messaging platform — replacing
                it removed a recurring bill.
              </>
            ),
          },
          {
            term: "Stock is request/response",
            desc: (
              <>
                Movements go over the same REST API as everything else, and screens read the
                balance when they open. There is no push, and no server of ours holding
                connections open.
              </>
            ),
          },
        ]}
      />

      <Callout tone="warn" title="The trade-off, stated plainly">
        Two people looking at the same stock screen can be a few minutes apart until one of them
        reloads. That is a real limitation and it is the honest description of the system as
        built. It was accepted because the write rate is low — a warehouse records movements
        dozens of times a day, not dozens of times a second — and because the alternative was
        operating a stateful real-time layer for data that rarely changes. Chat got Firestore
        precisely because chat is the workload where staleness is immediately, obviously wrong.
      </Callout>

      <Callout tone="insight" title="Why a second backend for one feature">
        Adding Firebase means two authentication stories in one product — JWT for the API,
        Firebase Auth for chat — which is a genuine cost in complexity. It bought delivery speed
        on the feature with the least business logic and the most infrastructure: presence,
        ordering, retries and offline delivery are the hard parts of chat, and none of them are
        parts anyone would be paid to reinvent here.
      </Callout>

      {/* ── AUTH ────────────────────────────────────────────────────────── */}
      <H2 id="auth">Authentication and permissions</H2>

      <Prose>
        <p>
          JWT carrying a role claim. Authorization is enforced at the API layer and{" "}
          <strong>reflected in the interface</strong> — each role gets a navigation structure
          containing only what&apos;s relevant to their job.
        </p>
      </Prose>

      <Code lang="backend/src/middleware/auth.js">{`export function requireAuth(req, res, next) {
  const auth  = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ ok: false, error: 'Token ausente' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ ok: false, error: 'Token inválido' });
  }
}

export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ ok: false, error: 'Não autenticado' });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ ok: false, error: 'Sem permissão' });
    return next();
  };
}`}</Code>

      <Prose>
        <p>
          The roles are not three tiers, they are the org chart. The company already had these
          divisions before there was any software, so the permission model copies them rather than
          inventing a hierarchy nobody would recognise:
        </p>
      </Prose>

      <CardGrid cols={3}>
        <Card title="Warehouse floor" tone="cyan" meta="EXPEDICAO · PRODUCAO">
          Records movements and separations. Sees stock and its own queue, not pricing or reports.
        </Card>
        <Card title="Commercial" tone="purple" meta="COMERCIAL · CENTRAL_ATENDIMENTO">
          Pricing, cubic-weight calculation and availability — the screens used with a customer
          waiting on the line.
        </Card>
        <Card title="Buying" tone="green" meta="COMPRAS">
          Pending orders and replenishment alerts, driven by each product&apos;s minimum stock.
        </Card>
        <Card title="Oversight" tone="amber" meta="SUPERVISAO · DIRETORIA">
          Reports and consolidated views across the operation.
        </Card>
        <Card title="Administration" tone="red" meta="ADMIN · TI">
          User management, audit log, and everything the other roles cannot reach.
        </Card>
        <Card title="Default" meta="VISITANTE">
          What a new account gets until someone grants it something. The safe state is no access,
          not partial access.
        </Card>
      </CardGrid>

      <Prose>
        <p>
          Hiding irrelevant options mattered as much as securing them. For people who aren&apos;t
          software users by trade, every menu item they don&apos;t need is a decision they have to
          make and a mistake they can make.
        </p>
      </Prose>

      {/* ── FRONT END ───────────────────────────────────────────────────── */}
      <H2 id="frontend">Front end</H2>

      <H3>Design system</H3>
      <Prose>
        <p>
          A small component library specific to this application: tables, forms, alerts, modals,
          navigation, status indicators. Every module ships against the same components, so an
          operator who learns one screen can use the next.
        </p>
        <p>
          The requirement driving it was <strong>high information density without clutter.</strong>{" "}
          Operators need many numbers on one screen, because the alternative is navigation, and
          navigation costs time when someone is standing in a warehouse. Density was a
          requirement, so hierarchy and spacing had to do the work that extra screens would
          otherwise do.
        </p>
      </Prose>

      {/* ── NON GOALS ───────────────────────────────────────────────────── */}
      <H2 id="non-goals">What this architecture does not do</H2>

      <Prose>
        <p>Being explicit about scope boundaries is part of the design.</p>
      </Prose>

      <DefList
        items={[
          {
            term: "No multi-tenancy beyond the three entities",
            tone: "amber",
            desc: "The model is specific to this company's structure, not a generic SaaS tenancy model. Generalizing it would be a different product.",
          },
          {
            term: "No offline mode",
            tone: "amber",
            desc: "The warehouse network is reliable. Offline-first would add significant complexity to solve a problem that doesn't occur.",
          },
          {
            term: "No horizontal scaling",
            tone: "amber",
            desc: "The user count is the company's staff. Designing for scale that will not arrive is a cost, not a feature.",
          },
          {
            term: "No microservices",
            tone: "amber",
            desc: "One developer, one deployment target, one database. Distributed complexity without a distributed problem.",
          },
        ]}
      />

      <PageNav
        prev={{ label: "Case study", href: "/engineering/erp" }}
        next={{ label: "Engineering decisions", href: "/engineering/erp/decisions" }}
      />
    </>
  );
}
