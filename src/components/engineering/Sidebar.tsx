"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

type Item = { label: string; href: string; status?: "draft" };
type Group = { label: string; items: Item[] };

export const NAV: Group[] = [
  {
    label: "Overview",
    items: [{ label: "Engineering", href: "/engineering" }],
  },
  {
    label: "Enterprise Operations Platform",
    items: [
      { label: "Case study",           href: "/engineering/erp" },
      { label: "Architecture",         href: "/engineering/erp/architecture" },
      { label: "Engineering decisions",href: "/engineering/erp/decisions" },
      { label: "Roadmap",              href: "/engineering/erp/roadmap" },
      { label: "Challenges",           href: "/engineering/erp/challenges", status: "draft" },
      { label: "Journal",              href: "/engineering/erp/journal",    status: "draft" },
      { label: "Changelog",            href: "/engineering/erp/changelog",  status: "draft" },
    ],
  },
  {
    label: "Cortex — AI over ERP data",
    items: [{ label: "Overview", href: "/engineering/ai" }],
  },
];

function Links({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();
  return (
    <nav className="flex flex-col gap-7">
      {NAV.map((g) => (
        <div key={g.label}>
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#525960]">
            {g.label}
          </p>
          <ul className="flex flex-col gap-[2px]">
            {g.items.map((it) => {
              const active = path === it.href;
              return (
                <li key={it.href}>
                  <a
                    href={it.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 rounded-md border-l-2 px-3 py-[7px] text-[13px] transition-colors ${
                      active
                        ? "border-[#00d4ff] bg-[#00d4ff]/[0.07] font-semibold text-white"
                        : "border-transparent text-[#8b949e] hover:border-white/20 hover:text-[#c9d1d9]"
                    }`}
                  >
                    <span className="flex-1">{it.label}</span>
                    {it.status === "draft" && (
                      <span className="rounded border border-[#fbbf24]/25 bg-[#fbbf24]/[0.08] px-[5px] py-px font-mono text-[9px] uppercase tracking-wider text-[#fbbf24]">
                        wip
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="sticky top-0 z-30 flex w-full items-center gap-2 border-b border-white/[0.07] bg-[#0a0a0a]/95 px-6 py-3 font-mono text-xs text-[#8b949e] backdrop-blur lg:hidden"
        aria-expanded={open}
      >
        <span className="text-[#00d4ff]">{open ? "×" : "☰"}</span> Documentation
      </button>

      {open && (
        <div className="border-b border-white/[0.07] bg-[#0a0a0a] px-6 py-6 lg:hidden">
          <Links onNavigate={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-screen w-[262px] shrink-0 overflow-y-auto border-r border-white/[0.07] px-6 py-10 lg:block">
        <a
          href="/"
          className="mb-9 block font-mono text-[11px] text-[#525960] transition-colors hover:text-[#00d4ff]"
        >
          ← Portfolio
        </a>
        <Links />
      </aside>
    </>
  );
}
