import { PageHeader, Card, CardGrid, StatGrid, Callout, H2, Prose, Pill } from "@/components/engineering/ui";

export default function EngineeringIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Engineering"
        title="Systems, decisions, trade-offs"
        lead="Technical documentation for the software I've built — what the problem was, what I chose, what I rejected, and what it cost. Written the way I'd want to read someone else's."
        meta={["Benjamin Maciel", "Front-End Developer · Internal Business Systems", "São Paulo, Brazil"]}
      />

      <StatGrid
        items={[
          { v: "1", l: "System in production", tone: "green" },
          { v: "3", l: "Legal entities unified" },
          { v: "100%", l: "Operations team adoption", tone: "green" },
          { v: "7", l: "Decision records", tone: "purple" },
        ]}
      />

      <H2 id="systems">Systems</H2>

      <CardGrid>
        <Card title="Enterprise Operations Platform" meta="2025 – 2026" href="/engineering/erp">
          An internal ERP that replaced spreadsheet-based inventory control for a manufacturer
          running three legal entities out of one warehouse. In production, used daily by the
          whole operations team. Specified, architected and shipped solo.
        </Card>
        <Card title="AI Digital Workforce" meta="2026" tone="amber" href="/engineering/ai">
          Agents that take over repetitive administrative work, built on top of the platform
          already in production rather than as a parallel tool. In development — this
          documentation is being written as the work happens.
        </Card>
      </CardGrid>

      <H2 id="how">How I work</H2>

      <Prose>
        <p>
          I start from the process, not the interface. Before writing code I map what people
          actually do, where the time goes, and what it costs when it goes wrong. The interface
          is the last decision, not the first.
        </p>
        <p>
          Most of what I build is internal software — the kind nobody demos at a conference and
          everybody depends on. It has a specific constraint that consumer software doesn&apos;t:
          the users didn&apos;t choose it, can&apos;t switch, and had a process that already worked
          before you arrived. Adoption isn&apos;t won by being better in the abstract. It&apos;s won
          by being faster than what they already do, on day one, without training.
        </p>
      </Prose>

      <Callout tone="insight" title="What these pages try to show">
        Anyone can describe a system that works. These documents also cover the decisions I&apos;d
        reverse, the risks I know about and haven&apos;t mitigated, and the parts that are hard to
        change today. A system without those isn&apos;t a real one — it&apos;s a brochure.
      </Callout>

      <H2 id="stack">Stack</H2>

      <Prose>
        <p className="flex flex-wrap gap-2">
          {[
            "React.js", "TypeScript", "Next.js", "JavaScript (ES6+)", "HTML5", "CSS3",
            "Tailwind CSS", "Node.js", "Express.js", "MySQL", "REST APIs", "WebSocket",
            "JWT", "Git", "Figma",
          ].map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-[10px] py-[5px] font-mono text-[11.5px] text-[#c9d1d9]"
            >
              {s}
            </span>
          ))}
        </p>
      </Prose>

      <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-8">
        <Pill tone="green">Available</Pill>
        <span className="text-sm text-[#8b949e]">
          Open to Front-End / React roles — international remote or relocation.
        </span>
        <a href="/curriculo" className="font-mono text-[12px] font-bold text-[#00d4ff] hover:underline">
          Resume →
        </a>
      </div>
    </>
  );
}
