import {
  PageHeader, Breadcrumb, H2, H3, Prose, Lead, Callout, StatGrid,
  BeforeAfter, CardGrid, Card, Tabs, DefList, PageNav,
} from "@/components/engineering/ui";

export const metadata = { title: "Enterprise Operations Platform — Engineering" };

export default function ErpCaseStudy() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Engineering", href: "/engineering" }, { label: "Enterprise Operations Platform" }]} />

      <PageHeader
        eyebrow="Case study"
        title="Enterprise Operations Platform"
        status={{ tone: "green", label: "In production" }}
        lead="An internal ERP that replaced spreadsheet-based inventory control for a manufacturer operating three legal entities out of a single warehouse. Specified, architected and shipped solo."
        meta={[
          "2025 – 2026",
          "React · TypeScript · Node.js · Express · MySQL · WebSocket · JWT",
          "Sole developer",
        ]}
      />

      <StatGrid
        items={[
          { v: "15 min → 30 s", l: "Price quoting", tone: "green" },
          { v: "60%", l: "Faster inventory counts", tone: "green" },
          { v: "3", l: "Legal entities unified" },
          { v: "100%", l: "Operations team adoption", tone: "green" },
        ]}
      />

      {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
      <H2 id="problem">The problem</H2>

      <Lead>
        Zenith Lacres is an industrial sealing manufacturer that runs three separate legal
        entities out of one physical warehouse. The same shelf holds stock belonging to three
        different companies, and every movement has to be attributed to the right one.
      </Lead>

      <Prose>
        <p>
          That structure is normal in Brazilian manufacturing. It was being managed in
          disconnected spreadsheets, which produced four failures that compounded:
        </p>
      </Prose>

      <DefList
        items={[
          {
            term: "No traceability",
            tone: "red",
            desc: "A product could leave the warehouse with no record of which entity owned it, who moved it, or when. Reconciliation was archaeology.",
          },
          {
            term: "Conflicting transfers",
            tone: "red",
            desc: "Stock moved between entities was often recorded on one side only. The two sheets disagreed and nobody could tell which was right — so neither was trusted.",
          },
          {
            term: "Slow quoting",
            tone: "red",
            desc: "Pricing required manually computing cubic weight against a freight table. Ten to fifteen minutes per quote, with the customer waiting on the phone.",
          },
          {
            term: "Recurring cost without ownership",
            tone: "red",
            desc: "Internal communication ran on a paid third-party platform — a monthly cost for something the company had no control over.",
          },
        ]}
      />

      <Callout tone="note" title="Who the users are">
        Warehouse operators and salespeople. Not technical, and not willing to learn a complex
        tool. This constraint drove more design decisions than any technical requirement did.
      </Callout>

      {/* ── BUSINESS CONTEXT ────────────────────────────────────────────── */}
      <H2 id="context">Business context</H2>

      <Prose>
        <p>
          The company has been in the market for 22 years. Its operation worked — it was
          profitable and the people running it knew what they were doing. The spreadsheets
          weren&apos;t a symptom of incompetence; they were a system that had scaled past its
          limits without anyone noticing the moment it did.
        </p>
        <p>
          This matters because it sets the bar for replacement. Software that is merely
          better in principle loses to a process people already know. It has to be
          <em> faster on the first day</em>, or it doesn&apos;t get used.
        </p>
      </Prose>

      {/* ── BUILD VS BUY ────────────────────────────────────────────────── */}
      <H2 id="build-vs-buy">Build vs. buy</H2>

      <Prose>
        <p>
          The obvious move was to license an off-the-shelf ERP. I evaluated that and chose to
          build instead.
        </p>
      </Prose>

      <Tabs
        tabs={[
          {
            id: "compare",
            label: "Comparison",
            content: (
              <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-white/[0.03]">
                      <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#8b949e]">Factor</th>
                      <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#8b949e]">Off-the-shelf</th>
                      <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#00ff88]">Build</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#8b949e]">
                    {[
                      ["Multi-entity model", "Generic — needs customization or workarounds", "Modeled on how the company actually operates"],
                      ["Cost", "Per-seat licensing, indefinitely", "One-time development effort"],
                      ["Cubic-weight pricing", "Not a standard feature", "Core feature, built for this business"],
                      ["Evolution", "Vendor roadmap and paid customization", "Changed the same week it's needed"],
                      ["Vendor lock-in", "High", "None"],
                    ].map(([a, b, c]) => (
                      <tr key={a} className="border-t border-white/[0.05]">
                        <td className="px-4 py-3 font-semibold text-white">{a}</td>
                        <td className="px-4 py-3">{b}</td>
                        <td className="px-4 py-3 text-[#c9d1d9]">{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ),
          },
          {
            id: "reason",
            label: "The deciding factor",
            content: (
              <Prose>
                <p>
                  The multi-entity requirement decided it. Off-the-shelf systems model{" "}
                  <em>one company</em>. Modeling three entities that share physical stock but must
                  stay legally separate is not a configuration option — it&apos;s a data model
                  decision, and it had to be correct from the start.
                </p>
                <p>
                  The strategic bet: the person who already understood the operation from the
                  inside could model it more accurately than any vendor could. I had spent two
                  years inside the company before building this.
                </p>
              </Prose>
            ),
          },
          {
            id: "cost",
            label: "What it cost",
            content: (
              <Callout tone="risk" title="Unmitigated consequence">
                The company&apos;s operational system now depends on one developer. That is a real
                risk and it is mine to address — documentation is the first step, a runbook and a
                second developer are on the{" "}
                <a href="/engineering/erp/roadmap" className="text-[#00d4ff] hover:underline">roadmap</a>.
              </Callout>
            ),
          },
        ]}
      />

      {/* ── WHAT IT DOES ────────────────────────────────────────────────── */}
      <H2 id="modules">What it does</H2>

      <CardGrid>
        <Card title="Multi-entity inventory" tone="cyan">
          Entry, exit and transfer between legal entities with full traceability. Every movement
          attributed, auditable and reversible.
        </Card>
        <Card title="Real-time dashboards" tone="cyan">
          Consolidated and per-entity stock views, minimum-level alerts, live movement indicators.
          Two people looking at the same number see the same number.
        </Card>
        <Card title="Automated pricing" tone="green">
          Cubic-weight calculation integrated with the freight table. What took 10–15 minutes of
          manual work returns in under 30 seconds.
        </Card>
        <Card title="Internal chat" tone="purple">
          Real-time messaging over the same WebSocket channel, replacing a paid external platform.
        </Card>
      </CardGrid>

      <H3>Role-based access</H3>
      <Prose>
        <p>
          Three tiers — operations, sales, administration — shaping both API authorization and the
          navigation each user sees. For non-technical users, a smaller interface is a faster one,
          so this is a usability decision as much as a security one.
        </p>
      </Prose>

      {/* ── IMPACT ──────────────────────────────────────────────────────── */}
      <H2 id="impact">Impact</H2>

      <BeforeAfter
        rows={[
          { label: "Stock traceability", before: "None — untraceable movements", after: "Every movement recorded and auditable" },
          { label: "Price quoting", before: "10–15 minutes, manual", after: "Under 30 seconds" },
          { label: "Inventory counting", before: "Baseline", after: "60% faster" },
          { label: "Internal communication", before: "Paid third-party platform", after: "In-house, no recurring cost" },
          { label: "Adoption", before: "—", after: "100% of the operations team" },
        ]}
      />

      <Callout tone="win" title="Why adoption reached 100%">
        Not because the software was better in the abstract. Because pricing — the thing sales
        staff did dozens of times a day and hated — became instant. Every other module inherited
        the credibility that one feature bought.
      </Callout>

      {/* ── CONTINUE ────────────────────────────────────────────────────── */}
      <H2 id="continue">Continue</H2>

      <CardGrid>
        <Card title="Architecture" href="/engineering/erp/architecture">
          System design, the data model that carries entity attribution, the real-time layer, and
          what this architecture deliberately does not do.
        </Card>
        <Card title="Engineering decisions" tone="purple" href="/engineering/erp/decisions">
          Seven decision records — context, alternatives rejected, and consequences including the
          bad ones.
        </Card>
        <Card title="Roadmap" tone="amber" href="/engineering/erp/roadmap">
          What&apos;s next, what won&apos;t be built, and how it&apos;s prioritized.
        </Card>
        <Card title="Challenges" tone="red" href="/engineering/erp/challenges">
          The hard problems: concurrent movements, entity-scope enforcement, and designing for
          users who didn&apos;t want software.
        </Card>
      </CardGrid>

      <PageNav
        prev={{ label: "Engineering", href: "/engineering" }}
        next={{ label: "Architecture", href: "/engineering/erp/architecture" }}
      />
    </>
  );
}
