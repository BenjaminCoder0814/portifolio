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
            title: "ADR-004 · MySQL with row-level entity attribution",
            meta: "Accepted · Most consequential",
            content: (
              <Record
                context="Three legal entities share one physical warehouse. Each needs a legally distinct ledger. Administration needs one consolidated view. Stock physically moves between entities."
                decision="A single relational database where every stock record and every movement carries an entity identifier. Queries scope to one entity or roll up across all."
                alternatives={[
                  { term: "One database per entity", desc: "Transfers become cross-database transactions. Consolidated views require joining across databases. Backup and migration triple in complexity." },
                  { term: "No separation, tag-only", desc: "Legal separation would depend on discipline in the application layer. One bug and the ledgers are wrong in a way that matters to an auditor." },
                  { term: "NoSQL / document store", desc: "Stock movement is inherently relational and transactional. Wrong tool for the problem." },
                ]}
                consequences={{
                  good: "Transfers are a single transaction. Consolidated and per-entity views come from the same source of truth, so they cannot disagree.",
                  bad: "Every query must be entity-aware. A query missing the filter silently returns another company's data — the most dangerous bug class in the codebase.",
                }}
              />
            ),
          },
          {
            id: "adr-005",
            title: "ADR-005 · WebSocket for real-time stock and chat",
            meta: "Accepted",
            content: (
              <Record
                context="Two people looking at the same stock number must see the same value. An operator recording a movement and a salesperson quoting a price can be working simultaneously. Internal communication was running on a paid external platform."
                decision="A single WebSocket channel carrying both stock movement broadcasts and internal chat."
                alternatives={[
                  { term: "Polling", desc: "Latency proportional to the interval, and load proportional to users × frequency, for data that changes rarely." },
                  { term: "Server-Sent Events", desc: "One-directional. Works for stock broadcasts, not for chat." },
                  { term: "Keeping the paid chat platform", desc: "Recurring cost, no control, and no path to integrating chat with stock events." },
                ]}
                consequences={{
                  good: "The numbers on screen are trustworthy, which is what made operators adopt the system. Chat cost eliminated.",
                  bad: "Connection state becomes the front end's problem: reconnection, missed messages during a drop, stale values on resume.",
                }}
              />
            ),
          },
          {
            id: "adr-006",
            title: "ADR-006 · JWT with three permission tiers",
            meta: "Accepted",
            content: (
              <Record
                context="Three user groups with genuinely different needs: warehouse/production, sales, administration. Operators seeing pricing data or administrative reports is both a security issue and a usability one."
                decision="JWT authentication carrying a role claim. Three tiers — operations, sales, administration — shaping both API authorization and the navigation each user sees."
                alternatives={[
                  { term: "Server-side sessions", desc: "Would work. With a decoupled API, a stateless token avoids shared session storage." },
                  { term: "Two tiers (user / admin)", desc: "Too coarse. Sales and operations need genuinely different screens." },
                  { term: "Per-permission ACL", desc: "More flexible, and more complexity than three well-understood roles justify at this scale." },
                ]}
                consequences={{
                  good: "Each role sees a smaller interface, which for non-technical users is a usability gain as much as a security one.",
                  bad: "JWTs can't be revoked before expiry without additional machinery — relevant when someone leaves the company.",
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
