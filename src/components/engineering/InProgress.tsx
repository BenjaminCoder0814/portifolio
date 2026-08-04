import { Callout, DefList, Pill } from "./ui";

/**
 * Honest placeholder for pages whose content must come from lived experience
 * rather than reconstruction. Publishing a plausible-sounding incident log
 * that never happened would undermine every other page in this section.
 */
export default function InProgress({
  what,
  outline,
  why,
}: {
  what: string;
  outline: { term: string; desc: string }[];
  why: string;
}) {
  return (
    <>
      <Callout tone="warn" title="Being written">
        <p className="mb-2">{what}</p>
        <p className="text-[#8b949e]">{why}</p>
      </Callout>

      <p className="mb-4 mt-10 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#525960]">
        Planned structure
      </p>

      <DefList items={outline.map((o) => ({ ...o, tone: "amber" as const }))} />

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-6">
        <Pill tone="amber">In progress</Pill>
        <span className="text-sm text-[#8b949e]">
          Meanwhile, the{" "}
          <a href="/engineering/erp/architecture" className="text-[#00d4ff] hover:underline">architecture</a> and{" "}
          <a href="/engineering/erp/decisions" className="text-[#00d4ff] hover:underline">decision records</a>{" "}
          are complete.
        </span>
      </div>
    </>
  );
}
