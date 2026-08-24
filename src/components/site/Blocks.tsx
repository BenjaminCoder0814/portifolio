import type { Block } from "@/content/notas";

/**
 * Renders the block arrays used by the notes and the case studies. Kept in one
 * place so an article and a case study cannot drift into different typography.
 */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2 key={i} className="mb-4 mt-12 text-2xl font-bold tracking-[-0.02em] text-white">
                {b.c}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="mb-5 leading-[1.75] text-[#c9d1d9]">
                {b.c}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="mb-5 flex list-disc flex-col gap-2 pl-5 text-[#c9d1d9]">
                {b.c.map((li) => (
                  <li key={li} className="leading-[1.7]">
                    {li}
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <figure key={i} className="mb-6 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0d1117]">
                {b.lang && (
                  <figcaption className="border-b border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#4d5866]">
                    {b.lang}
                  </figcaption>
                )}
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.7] text-[#c9d1d9]">
                  <code>{b.c}</code>
                </pre>
              </figure>
            );
          case "note":
            return (
              <aside
                key={i}
                className="mb-6 rounded-xl border-l-2 border-[#fbbf24] bg-[rgba(251,191,36,0.05)] px-5 py-4 leading-[1.7] text-[#c9d1d9]"
              >
                {b.c}
              </aside>
            );
        }
      })}
    </>
  );
}
