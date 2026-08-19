import {
  PageHeader, Breadcrumb, H2, H3, Prose, Lead, Callout, StatGrid,
  DefList, CardGrid, Card, Tabs, PageNav, Pill,
} from "@/components/engineering/ui";

export const metadata = { title: "Cortex — AI platform over ERP data" };

export default function AiPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Engineering", href: "/engineering" }, { label: "Cortex" }]} />

      <PageHeader
        eyebrow="Initiative"
        title="Cortex"
        status={{ tone: "amber", label: "Platform in homologation" }}
        lead="An AI layer over the company's ERP data. The data platform is built and in homologation; the agents that will act on it are in development. This page describes what exists, not what it is planned to become."
        meta={["2026", "Anthropic Claude API", "Third-party ERP integration", "Multi-company"]}
      />

      <Callout tone="note" title="Where this actually stands">
        The extraction, synchronisation and exploration layer is working in homologation. No agent
        is executing real business work yet. Everything below is split accordingly — what is built,
        and what is not.
      </Callout>

      {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
      <H2 id="problem">The problem</H2>

      <Lead>
        Administrative work across the company is dominated by repetitive, rule-based tasks:
        chasing receivables, answering stock questions, preparing quotes, checking production
        status. None of them require judgment. All of them require someone to look something up in
        the ERP.
      </Lead>

      <Prose>
        <p>
          The information exists. It sits in <strong>Deltaze</strong>, the commercial ERP the
          company runs on. The bottleneck is not data — it is that answering a question means a
          person navigating a system, and that person is finite.
        </p>
      </Prose>

      {/* ── CONSTRAINT ──────────────────────────────────────────────────── */}
      <H2 id="constraint">The constraint that shaped everything</H2>

      <Callout tone="insight" title="We don't own the ERP">
        Deltaze is a third-party product. There is no privileged access, no schema to change, no
        hooks to add. Every decision below follows from that: the platform has to treat the ERP as
        a read-only source that can change underneath it without warning.
      </Callout>

      <Prose>
        <p>
          This is the opposite of the{" "}
          <a href="/engineering/erp" className="text-[#00d4ff] hover:underline">
            Enterprise Operations Platform
          </a>
          , where I own the data model and can shape it around the problem. Here the model is
          someone else&apos;s, it is not documented for this use, and it has to be reconciled from
          the outside.
        </p>
      </Prose>

      {/* ── BUILT ───────────────────────────────────────────────────────── */}
      <H2 id="built">What is built</H2>

      <StatGrid
        items={[
          { v: "226,296", l: "Records imported", tone: "green" },
          { v: "9", l: "ERP queries live", tone: "green" },
          { v: "Multi", l: "Company coverage", tone: "green" },
          { v: "0", l: "Console errors in homologation", tone: "green" },
        ]}
      />

      <Tabs
        tabs={[
          {
            id: "extraction",
            label: "Extraction",
            content: (
              <DefList
                items={[
                  {
                    term: "Nine queries against the ERP",
                    tone: "green",
                    desc: "Each mapped to a business entity the agents will need. The set is deliberately small — every query is a dependency on a schema I do not control, so each has to earn its place.",
                  },
                  {
                    term: "Pagination",
                    tone: "green",
                    desc: "The ERP returns data in pages. Extraction walks them rather than asking for everything at once, which keeps memory flat and avoids putting load on a production system the company depends on.",
                  },
                  {
                    term: "Multi-company coverage",
                    tone: "green",
                    desc: "The company operates as multiple legal entities. Extraction is entity-aware from the start, for the same reason the ERP I built is: a record without an entity is a record that cannot be trusted.",
                  },
                ]}
              />
            ),
          },
          {
            id: "sync",
            label: "Synchronisation",
            content: (
              <>
                <DefList
                  items={[
                    {
                      term: "Natural keys",
                      tone: "green",
                      desc: "Records are identified by their business identity rather than an import-time surrogate. This is what makes re-running the sync safe: the same record arriving twice updates rather than duplicates.",
                    },
                    {
                      term: "Incremental updates",
                      tone: "green",
                      desc: "After the first load, only what changed is fetched. A full re-import of 226,296 records on every run would be both slow and rude to a production ERP.",
                    },
                    {
                      term: "Automatic scheduling",
                      tone: "green",
                      desc: "Synchronisation runs on its own. Data that needs a human to refresh it is data that will be stale exactly when someone relies on it.",
                    },
                  ]}
                />
                <Callout tone="warn" title="Why natural keys mattered more than expected">
                  Without them, incremental sync is not possible — there is no way to tell an update
                  from a new record coming out of a system whose internal identifiers you cannot
                  depend on. Getting this wrong would have meant a full re-import forever.
                </Callout>
              </>
            ),
          },
          {
            id: "explorer",
            label: "Explorer",
            content: (
              <Prose>
                <p>
                  An interface for inspecting what has been extracted: browsing entities, checking
                  what synchronised, and verifying that a record in Cortex matches the record in the
                  ERP.
                </p>
                <p>
                  It exists because of the constraint above. When the source system is someone
                  else&apos;s and can change without notice, being able to <em>see</em> the imported
                  state is not a nice-to-have — it is how you find out something drifted before an
                  agent acts on it.
                </p>
              </Prose>
            ),
          },
        ]}
      />

      <H3>Model layer</H3>
      <Prose>
        <p>
          Reasoning runs on <strong>Anthropic&apos;s Claude API</strong>. The data platform is
          deliberately independent of it: extraction, synchronisation and storage know nothing about
          the model, so the model can be changed, compared or upgraded without touching the layer
          that talks to the ERP.
        </p>
      </Prose>

      {/* ── NOT BUILT ───────────────────────────────────────────────────── */}
      <H2 id="not-built">What is not built</H2>

      <Prose>
        <p>
          The agents are the point of the project, and they are the part that does not exist yet.
          Listing them as though they did would make everything above less believable.
        </p>
      </Prose>

      <CardGrid>
        <Card title="Receivables" tone="amber" meta="Priority 1">
          Chasing overdue invoices, reading replies, recognising a payment claim or a receipt, and
          escalating to a person only when it cannot resolve.
        </Card>
        <Card title="Commercial" tone="amber" meta="Priority 2">
          Answering customer questions on stock, price and lead time, and assembling a quote from
          live ERP data.
        </Card>
        <Card title="Purchasing" tone="amber" meta="Priority 3">
          Noticing low stock, comparing suppliers, and preparing a purchase order for approval.
        </Card>
        <Card title="Executive" tone="amber" meta="Priority 4">
          Answering &ldquo;how is the company doing today&rdquo; across revenue, stock, sales and
          production in one pass.
        </Card>
      </CardGrid>

      <Prose>
        <p className="text-sm text-[#8b949e]">
          Stock, production, gatehouse and HR agents follow the same pattern and sit behind these.
        </p>
      </Prose>

      <H3>Platform work still outstanding</H3>
      <Prose>
        <p className="flex flex-wrap gap-2">
          {[
            "Conversation history", "Per-company memory", "Per-user memory",
            "Fine-grained permissions", "Full audit trail", "Monitoring", "Metrics",
            "Notifications", "Agent versioning", "Load testing", "Automated backups",
          ].map((s) => (
            <span
              key={s}
              className="rounded-md border border-[#fbbf24]/20 bg-[#fbbf24]/[0.05] px-[10px] py-[5px] font-mono text-[11.5px] text-[#fbbf24]"
            >
              {s}
            </span>
          ))}
        </p>
      </Prose>

      {/* ── PRINCIPLE ───────────────────────────────────────────────────── */}
      <H2 id="approval">The rule the agents are built under</H2>

      <Callout tone="risk" title="Nothing critical executes on its own">
        An agent prepares, proposes and waits. A person approves. Only then does it act.
      </Callout>

      <Prose>
        <p>
          This is decided before the first agent is written, not discovered afterwards. An
          automation that can issue a purchase order or contact a customer without review is one bad
          inference away from a real business consequence — and the company would be right to stop
          trusting the whole system after the first one.
        </p>
        <p>
          The cost is real: a human stays in the loop, so what is saved is the lookup and the
          drafting, not the decision. That is the trade I would make again.
        </p>
      </Prose>

      {/* ── HONEST CLOSE ────────────────────────────────────────────────── */}
      <H2 id="stage">Honest summary</H2>

      <DefList
        items={[
          {
            term: "ERP integration and data layer",
            tone: "green",
            desc: "Built and in homologation. 226,296 records, nine queries, incremental sync, multi-company, natural keys, working explorer.",
          },
          {
            term: "Model layer",
            tone: "green",
            desc: "Claude API wired in, kept independent of the data platform.",
          },
          {
            term: "Agents",
            tone: "amber",
            desc: "In development. None executing business work yet.",
          },
          {
            term: "Platform hardening",
            tone: "amber",
            desc: "Memory, audit, permissions, monitoring and versioning outstanding.",
          },
          {
            term: "Measured impact",
            tone: "red",
            desc: "None yet. There is nothing to report until agents run against real work, and reporting a projection as a result would be the fastest way to lose the credibility the rest of this page is trying to earn.",
          },
        ]}
      />

      <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-8">
        <Pill tone="amber">Updated as it ships</Pill>
        <span className="text-sm text-[#8b949e]">
          Written as the work happens rather than after it. Numbers appear here when they are
          measured, not when they are expected.
        </span>
      </div>

      <PageNav prev={{ label: "Enterprise Operations Platform", href: "/engineering/erp" }} />
    </>
  );
}
