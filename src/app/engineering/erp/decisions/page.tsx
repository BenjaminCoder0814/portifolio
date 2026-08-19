import {
  PageHeader, Breadcrumb, H2, Prose, Lead, Callout, Accordion, DefList, PageNav, Pill,
} from "@/components/engineering/ui";

export const metadata = { title: "Engineering decisions — Enterprise Operations Platform" };

/* Each record follows: context → decision → alternatives → trade-offs → consequences. */

function Record({
  context, decision, alternatives, consequences,
}: {
  context: string;
  decision: string;
  alternatives: { term: string; desc: string }[];
  consequences: { good: string; bad: string };
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-[6px] font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#525960]">Context</p>
        <p className="text-sm leading-relaxed text-[#c9d1d9]">{context}</p>
      </div>

      <div className="rounded-lg border-l-2 border-[#00d4ff] bg-[#00d4ff]/[0.05] px-4 py-3">
        <p className="mb-[6px] font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#00d4ff]">Decision</p>
        <p className="text-sm font-semibold leading-relaxed text-white">{decision}</p>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#525960]">
          Alternatives rejected
        </p>
        <DefList items={alternatives.map((a) => ({ ...a, tone: "red" as const }))} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[#00ff88]/15 bg-[#00ff88]/[0.04] px-4 py-3">
          <p className="mb-[6px] font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#00ff88]">Upside</p>
          <p className="text-[13px] leading-relaxed text-[#c9d1d9]">{consequences.good}</p>
        </div>
        <div className="rounded-lg border border-[#fbbf24]/15 bg-[#fbbf24]/[0.04] px-4 py-3">
          <p className="mb-[6px] font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#fbbf24]">Cost</p>
          <p className="text-[13px] leading-relaxed text-[#c9d1d9]">{consequences.bad}</p>
        </div>
      </div>
    </div>
  );
}

export default function Decisions() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Engineering", href: "/engineering" },
          { label: "Enterprise Operations Platform", href: "/engineering/erp" },
          { label: "Engineering decisions" },
        ]}
      />

      <PageHeader
        eyebrow="Enterprise Operations Platform"
        title="Engineering decisions"
        lead="Seven decisions that shaped the system. Each one records what was true at the time, what was chosen, what was rejected, and what it cost — because a decision without a cost wasn't a decision."
        meta={["7 records", "Accepted", "2025 – 2026"]}
      />

      <Callout tone="insight" title="Why these are written down">
        A system is the sum of decisions taken under constraint. Six months later nobody
        remembers the constraint — only the code, which looks arbitrary without it. These records
        exist so the next person (including future me) can tell a deliberate choice from an
        accident.
      </Callout>

      <H2 id="records">Records</H2>

      <Accordion
        defaultOpen="adr-001"
        items={[
          {
            id: "adr-001",
            title: "ADR-001 · Build in-house instead of licensing an ERP",
            meta: "Accepted",
            content: (
              <Record
                context="The company needed inventory control across three legal entities sharing one warehouse. The default option was licensing an off-the-shelf ERP."
                decision="Build the system in-house."
                alternatives={[
                  { term: "Off-the-shelf ERP", desc: "Models a single company. Three entities sharing physical stock but staying legally separate is not a configuration option — it's a data model decision." },
                  { term: "Spreadsheets with better discipline", desc: "Already the status quo, already failing. The failure was structural, not behavioural." },
                  { term: "Off-the-shelf plus customization", desc: "Vendor-dependent, paid per change, and still built on the wrong core model." },
                ]}
                consequences={{
                  good: "Exact process fit. No per-seat licensing. Changes ship the same week they're needed. No vendor lock-in.",
                  bad: "The company's operational system now depends on one developer. That risk is real and currently unmitigated.",
                }}
              />
            ),
          },
          {
            id: "adr-002",
            title: "ADR-002 · Single-Page Application over a decoupled REST API",
            meta: "Accepted",
            content: (
              <Record
                context="Warehouse operators check stock dozens of times a day. Sales staff price items while a customer waits on the phone."
                decision="React SPA in the browser, Node.js/Express REST API on the server, no server-rendered pages."
                alternatives={[
                  { term: "Server-rendered pages", desc: "A full page load per stock lookup. At the frequency these users query, that is slower than the spreadsheet it replaced." },
                  { term: "Monolith with templating", desc: "Simpler to deploy, but couples the interface to the server and makes the real-time layer awkward." },
                ]}
                consequences={{
                  good: "Stock lookups feel instant. The API is reusable by anything else that needs it later — including the AI automation layer.",
                  bad: "Two deployables instead of one. No SEO, which is irrelevant for an internal tool behind auth.",
                }}
              />
            ),
          },
          {
            id: "adr-003",
            title: "ADR-003 · TypeScript on the front end",
            meta: "Accepted",
            content: (
              <Record
                context="The system handles stock quantities, entity attribution and price calculations. A wrong type in any of those is a wrong number in a warehouse or on an invoice."
                decision="TypeScript for the front-end codebase."
                alternatives={[
                  { term: "Plain JavaScript", desc: "Faster to write initially. Rejected because with a single developer and no QA team, the compiler is the only reviewer available." },
                ]}
                consequences={{
                  good: "Shape mismatches between API responses and UI are caught at build time rather than by an operator seeing a wrong number.",
                  bad: "Slower initial development, and parts of the codebase are typed more loosely than others.",
                }}
              />
            ),
          },
          {
            id: "adr-004",
            title: "ADR-004 · SQLite first, then PostgreSQL on Neon",
            meta: "Superseded by migration · Most consequential",
            content: (
              <Record
                context="The first version had one user and ran on a laptop. SQLite meant no server to install, no credentials to manage and no hosting decision to make before there was anything worth hosting. Once the warehouse started using it from more than one machine, a file-backed database became the constraint rather than the shortcut."
                decision="Start on SQLite. Move to PostgreSQL on Neon when concurrency demanded it, keeping Prisma as the layer between the application and either one."
                alternatives={[
                  { term: "PostgreSQL from day one", desc: "Correct in hindsight and wrong at the time. It front-loads hosting, connection strings and a running server onto a project that had not yet earned any of them." },
                  { term: "Staying on SQLite", desc: "Writers block each other and the database lives on one machine's disk. Fine for one operator; not for a warehouse and a sales floor at once." },
                  { term: "MySQL", desc: "Would have worked. Neon's branching and generous free tier decided it, not the SQL dialect." },
                ]}
                consequences={{
                  good: "The migration was a schema change and a data copy, not a rewrite, because Prisma had been holding the boundary the whole time. The old migrations are still in the repository under migrations_sqlite_bak — the history of the move is not hidden.",
                  bad: "Two migration lineages exist in the repo, which is confusing to read cold. And Neon's free tier suspends an idle database, so the first request after a quiet period is slow — the front end has to treat a cold backend as a normal state, not an error.",
                }}
              />
            ),
          },
          {
            id: "adr-005",
            title: "ADR-005 · Firestore for chat, and nothing real-time for stock",
            meta: "Accepted",
            content: (
              <Record
                context="Internal communication ran on a paid external messaging platform. Replacing it meant owning presence, ordering, retries and offline delivery — the parts of chat that are actually hard and have nothing to do with this company's business."
                decision="Put chat on Firebase Firestore with Firebase Authentication, and leave stock on plain request/response over the REST API."
                alternatives={[
                  { term: "A WebSocket server of our own", desc: "One channel for chat and stock broadcasts. It means operating a stateful service, and owning reconnection, backfill and missed-message logic — for a warehouse that records movements dozens of times a day, not dozens of times a second." },
                  { term: "Polling for stock", desc: "Load proportional to users × frequency for data that mostly does not change. Rejected as paying continuously for freshness nobody had asked for." },
                  { term: "Keeping the paid platform", desc: "Recurring cost, and company conversations living in someone else's product." },
                ]}
                consequences={{
                  good: "The recurring messaging bill went to zero, and the hard parts of chat are Google's problem. Stock stayed simple: one API, one way in, no connection state in the front end.",
                  bad: "Two authentication systems in one product — JWT for the API, Firebase Auth for chat. And stock screens can be minutes stale until someone reloads, which is a real limitation rather than an oversight.",
                }}
              />
            ),
          },
          {
            id: "adr-006",
            title: "ADR-006 · JWT with the company's own roles as the permission model",
            meta: "Accepted",
            content: (
              <Record
                context="The company already had divisions before it had software: expedição, produção, compras, comercial, central de atendimento, supervisão, diretoria, TI. Any permission model invented on top of that would have to be explained to every user; a model that matched it would not."
                decision="JWT carrying a role claim, with requireRoles(...) guarding routes and the same role deciding which navigation a user is given. New accounts default to VISITANTE — no access — rather than to a partial one."
                alternatives={[
                  { term: "Server-side sessions", desc: "Would work. With a decoupled API, a stateless token avoids shared session storage." },
                  { term: "Two tiers (user / admin)", desc: "Too coarse. A salesperson and a warehouse operator need genuinely different screens, and neither needs the other's." },
                  { term: "Per-permission ACL", desc: "More flexible, and more machinery than roles the company can already name justify at this scale. It stays available if a role ever needs splitting." },
                ]}
                consequences={{
                  good: "Nobody has to learn what their permissions mean — they map onto the job title they already have. Each role also gets a smaller interface, which for non-technical users is a usability gain as much as a security one.",
                  bad: "Roles are a string on the user row, so adding one is a code change, not configuration. And JWTs cannot be revoked before expiry without extra machinery — which matters the day someone leaves the company.",
                }}
              />
            ),
          },
          {
            id: "adr-007",
            title: "ADR-007 · Custom design system instead of a component library",
            meta: "Accepted",
            content: (
              <Record
                context="Users need high information density on screen — hiding data behind navigation costs time when someone is standing in a warehouse. As a single developer, every UI decision re-made from scratch is time not spent on features."
                decision="Build a small design system and reusable React component library specific to this application."
                alternatives={[
                  { term: "Material UI / Ant Design / Chakra", desc: "Faster to start, and optimized for comfortable spacing and consumer-style density — which fights the density requirement here." },
                ]}
                consequences={{
                  good: "Every module ships against the same components. New modules don't re-litigate what a table or an alert looks like.",
                  bad: "Everything is maintained by one person, including accessibility and cross-browser behaviour a mature library would have handled.",
                }}
              />
            ),
          },
        ]}
      />

      <H2 id="format">Format</H2>

      <Prose>
        <Lead>
          A record is only useful if it survives contact with being wrong.
        </Lead>
        <p>
          When a decision here is reversed, the record isn&apos;t deleted — it&apos;s marked{" "}
          <Pill tone="amber">superseded</Pill> and the replacement explains what changed. A
          reversed record with an honest explanation is worth more than seven that never moved.
        </p>
      </Prose>

      <PageNav
        prev={{ label: "Architecture", href: "/engineering/erp/architecture" }}
        next={{ label: "Roadmap", href: "/engineering/erp/roadmap" }}
      />
    </>
  );
}
