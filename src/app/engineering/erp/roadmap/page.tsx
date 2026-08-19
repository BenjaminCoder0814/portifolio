import {
  PageHeader, Breadcrumb, H2, Prose, Lead, Callout, Progress, DefList, PageNav, Pill, CardGrid, Card,
} from "@/components/engineering/ui";

export const metadata = { title: "Roadmap — Enterprise Operations Platform" };

function Release({
  version, name, status, progress, tone, children,
}: {
  version: string;
  name: string;
  status: string;
  progress: number;
  tone: "green" | "cyan" | "amber" | "purple";
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="font-mono text-lg font-black text-white">{version}</span>
        <span className="text-[15px] font-semibold text-[#c9d1d9]">{name}</span>
        <span className="ml-auto"><Pill tone={tone}>{status}</Pill></span>
      </div>
      <Progress value={progress} tone={tone} />
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Engineering", href: "/engineering" },
          { label: "Enterprise Operations Platform", href: "/engineering/erp" },
          { label: "Roadmap" },
        ]}
      />

      <PageHeader
        eyebrow="Enterprise Operations Platform"
        title="Roadmap"
        lead="What's next, what won't be built, and how it's prioritized. A roadmap that lists only features says 'I build what's asked'. This one starts with paying down risk I introduced."
      />

      <div className="my-10 flex flex-col gap-4">
        <Release version="v1" name="Production release" status="Shipped" progress={100} tone="green">
          <DefList
            items={[
              { term: "Multi-entity inventory control", tone: "green", desc: "Entry, exit and transfer with full traceability across three legal entities." },
              { term: "Real-time dashboards", tone: "green", desc: "Consolidated and per-entity views, minimum-level alerts, live movement indicators." },
              { term: "Automated pricing", tone: "green", desc: "Cubic-weight calculation integrated with the freight table. 10–15 min → under 30 s." },
              { term: "Internal chat over WebSocket", tone: "green", desc: "Replaced a paid third-party messaging platform." },
              { term: "Role-based access control", tone: "green", desc: "Three tiers shaping both API permissions and navigation." },
            ]}
          />
        </Release>

        <Release version="v2" name="Paying down known risk" status="Next" progress={15} tone="cyan">
          <Prose>
            <p className="text-sm">
              Everything in v2 exists because building v1 fast created it. None of it is visible
              to users, and all of it is more important than the next feature.
            </p>
          </Prose>
          <DefList
            items={[
              {
                term: "Systematic entity-scope enforcement",
                desc: "A query missing its entity filter silently returns another company's data. It should be structurally impossible to write an unscoped query, not merely discouraged. Approach: a repository layer that requires an entity context by construction.",
              },
              {
                term: "Automated tests on the critical paths",
                desc: "Transfers between entities and cubic-weight pricing are the two places where a bug produces wrong numbers — silently, and with financial consequence. Scope: transfer transactions including concurrent access, pricing across weight and volume ranges, permission boundaries per role.",
              },
              {
                term: "Reduce single-person dependency",
                desc: "The company's operational system depends on one developer. This documentation is the first step; a runbook, a documented recovery procedure and an onboarding path for a second developer are the rest.",
              },
            ]}
          />
        </Release>

        <Release version="v3" name="Operational maturity" status="Considered" progress={0} tone="amber">
          <DefList
            items={[
              { term: "Deployment automation", tone: "amber", desc: "Matters once more than one person touches the system — not before." },
              { term: "Audit trail surfacing", tone: "amber", desc: "Movements are already recorded and reversible. An interface for administration to review history without a developer would remove a recurring request." },
              { term: "Mobile warehouse view", tone: "amber", desc: "Operators use desktop terminals today. Worth doing only if the physical process changes to make it useful." },
            ]}
          />
        </Release>

        <Release version="Adjacent" name="Cortex — AI over ERP data" status="Platform in homologation" progress={35} tone="purple">
          <Prose>
            <p className="text-sm">
              A separate initiative, not a phase of this one: an AI layer over{" "}
              <strong>Deltaze</strong>, the commercial ERP the company runs on. 226,296 records
              under incremental synchronisation, reasoning on the Claude API.
            </p>
            <p className="text-sm">
              It sits here on the roadmap because the two systems will eventually meet — but the
              data it reads is not this platform&apos;s, and pretending otherwise would misstate
              what was actually built.
            </p>
          </Prose>
          <p className="mt-4">
            <a href="/engineering/ai" className="font-mono text-[12px] font-bold text-[#a78bfa] hover:underline">
              Cortex →
            </a>
          </p>
        </Release>
      </div>

      {/* ── NOT PLANNED ─────────────────────────────────────────────────── */}
      <H2 id="not-planned">Explicitly not planned</H2>

      <Prose>
        <p>Stating what won&apos;t be built is part of the roadmap.</p>
      </Prose>

      <CardGrid>
        <Card title="Multi-tenancy as a product" tone="red">
          The model is specific to this company&apos;s three-entity structure. Generalizing it
          into SaaS would be a different product with a different data model.
        </Card>
        <Card title="Offline mode" tone="red">
          The warehouse network is reliable. Offline-first would add significant complexity to
          solve a problem that doesn&apos;t occur.
        </Card>
        <Card title="Horizontal scaling" tone="red">
          User count is the company&apos;s staff. Designing for scale that will not arrive is a
          cost, not a feature.
        </Card>
        <Card title="Microservices" tone="red">
          One developer, one deployment target, one database. Distributed complexity without a
          distributed problem.
        </Card>
      </CardGrid>

      {/* ── PRIORITIZATION ──────────────────────────────────────────────── */}
      <H2 id="prioritization">How this is prioritized</H2>

      <Lead>Three rules, applied in order.</Lead>

      <DefList
        items={[
          {
            term: "1 · Silent risk before visible features",
            desc: "A wrong number nobody notices costs more than a missing screen everybody sees. Entity-scope enforcement outranks anything a user would ask for.",
          },
          {
            term: "2 · Repeated requests before interesting problems",
            desc: "What the operations team asks for a third time is a real requirement. What's technically interesting to me usually isn't.",
          },
          {
            term: "3 · Reversibility",
            desc: "Prefer changes that can be undone in a week over ones that lock the system in. With a single developer, the cost of being wrong is what determines how fast you can move.",
          },
        ]}
      />

      <Callout tone="insight" title="What v2 says about v1">
        Every item in v2 is a consequence of a v1 decision. That is not a failure of planning —
        it is what shipping under constraint produces. The failure would be not writing them down.
      </Callout>

      <PageNav
        prev={{ label: "Engineering decisions", href: "/engineering/erp/decisions" }}
        next={{ label: "Challenges", href: "/engineering/erp/challenges" }}
      />
    </>
  );
}
