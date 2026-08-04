import {
  PageHeader, Breadcrumb, H2, H3, Prose, Lead, Callout, DefList, Code, PageNav, CardGrid, Card,
} from "@/components/engineering/ui";
import { SystemDiagram, DataModelDiagram, TransferFlowDiagram } from "@/components/engineering/Diagrams";

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
        meta={["React · TypeScript · Node.js · Express · MySQL · WebSocket · JWT"]}
      />

      {/* ── OVERVIEW ────────────────────────────────────────────────────── */}
      <H2 id="overview">System overview</H2>

      <Lead>
        A Single-Page Application over a decoupled REST API, with a WebSocket channel carrying
        anything that has to be live.
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
      <H2 id="transfers">Transfers between entities</H2>

      <Prose>
        <p>
          A transfer is two writes that must both succeed or both fail. If one lands and the other
          doesn&apos;t, two companies&apos; ledgers disagree and there is no way to tell which is
          right.
        </p>
        <p>
          That is exactly the failure the spreadsheets had. Rebuilding it in software would have
          defeated the purpose of building anything.
        </p>
      </Prose>

      <TransferFlowDiagram />

      <Code lang="Transfer — shape of the operation">{`// Both sides move inside one transaction, scoped to their entity.
// Either the ledgers agree afterwards, or nothing happened at all.

async function transferStock({ productId, fromEntity, toEntity, qty, userId }) {
  return db.transaction(async (tx) => {
    await tx.stock.decrement({ entityId: fromEntity, productId, qty });
    await tx.stock.increment({ entityId: toEntity,   productId, qty });

    await tx.movements.insert([
      { entityId: fromEntity, productId, userId, type: "transfer_out", qty },
      { entityId: toEntity,   productId, userId, type: "transfer_in",  qty },
    ]);
  });
}`}</Code>

      {/* ── REAL TIME ───────────────────────────────────────────────────── */}
      <H2 id="realtime">Real-time layer</H2>

      <Prose>
        <p>A single WebSocket connection carries two kinds of traffic:</p>
      </Prose>

      <DefList
        items={[
          {
            term: "Stock events",
            desc: "When an operator records a movement, connected clients update without a refresh. This is what made the system trustworthy — two people looking at the same screen see the same number, which was never true with spreadsheets.",
          },
          {
            term: "Chat messages",
            tone: "purple",
            desc: "Internal communication between staff, replacing a paid external platform. Sharing the existing channel meant no second piece of infrastructure to operate.",
          },
        ]}
      />

      <Callout tone="warn" title="What this costs">
        Connection state becomes the front end&apos;s problem: reconnection, messages missed
        during a drop, and stale values on resume. Polling would have avoided all of it — at the
        cost of latency proportional to the interval, and load proportional to users × frequency
        for data that changes rarely.
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

      <CardGrid cols={3}>
        <Card title="Operations" tone="cyan">
          Warehouse and production. Stock movements, transfers, movement history.
        </Card>
        <Card title="Sales" tone="purple">
          Commercial. Pricing, cubic-weight calculation, availability.
        </Card>
        <Card title="Administration" tone="green">
          Full visibility and reporting across all three entities.
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
