"use client";

/**
 * Engineering section design system.
 *
 * Deliberately dependency-free: no markdown runtime, no diagram library.
 * These pages are read by engineers on slow hotel wifi during a hiring loop —
 * every kilobyte here is a kilobyte that delays the first paint of a case study.
 */

import { useState, type ReactNode } from "react";

/* ── tokens ──────────────────────────────────────────────────────────────── */

export const accent = {
  cyan:   "#00d4ff",
  purple: "#a78bfa",
  green:  "#00ff88",
  amber:  "#fbbf24",
  red:    "#f87171",
} as const;

export type Accent = keyof typeof accent;

/* ── Prose: consistent vertical rhythm for text blocks ───────────────────── */

export function Prose({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-[#c9d1d9]">{children}</div>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-lg leading-relaxed text-[#e2e8f0]">{children}</p>;
}

/* ── Section heading with anchor ─────────────────────────────────────────── */

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 mt-14 mb-5 flex items-baseline gap-3 first:mt-0">
      <span className="text-2xl font-black tracking-[-0.02em] text-white">{children}</span>
      <span className="h-px flex-1 bg-white/[0.07]" />
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 mb-3 text-base font-bold text-white">{children}</h3>;
}

/* ── Status pill ─────────────────────────────────────────────────────────── */

export function Pill({ tone = "cyan", children }: { tone?: Accent; children: ReactNode }) {
  const c = accent[tone];
  return (
    <span
      className="inline-flex items-center gap-[6px] rounded-full border px-[10px] py-[3px] font-mono text-[10px] font-bold uppercase tracking-[0.1em]"
      style={{ color: c, borderColor: `${c}33`, background: `${c}0f` }}
    >
      <span className="h-[5px] w-[5px] rounded-full" style={{ background: c }} />
      {children}
    </span>
  );
}

/* ── Callout ─────────────────────────────────────────────────────────────── */

const calloutTone: Record<string, { c: string; label: string }> = {
  note:    { c: accent.cyan,   label: "Note" },
  insight: { c: accent.purple, label: "Insight" },
  win:     { c: accent.green,  label: "Outcome" },
  warn:    { c: accent.amber,  label: "Trade-off" },
  risk:    { c: accent.red,    label: "Known risk" },
};

export function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: keyof typeof calloutTone;
  title?: string;
  children: ReactNode;
}) {
  const { c, label } = calloutTone[tone];
  return (
    <div
      className="my-6 rounded-xl border-l-2 px-5 py-4"
      style={{ borderLeftColor: c, background: `${c}08`, borderTop: `1px solid ${c}14`, borderRight: `1px solid ${c}14`, borderBottom: `1px solid ${c}14` }}
    >
      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: c }}>
        {title ?? label}
      </p>
      <div className="text-sm leading-relaxed text-[#c9d1d9]">{children}</div>
    </div>
  );
}

/* ── Stat grid ───────────────────────────────────────────────────────────── */

export function StatGrid({ items }: { items: { v: string; l: string; tone?: Accent }[] }) {
  return (
    <div className="my-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.l} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-5">
          <p className="text-3xl font-black leading-none tracking-[-0.02em]" style={{ color: accent[s.tone ?? "cyan"] }}>
            {s.v}
          </p>
          <p className="mt-2 text-[11px] uppercase leading-tight tracking-[0.08em] text-[#8b949e]">{s.l}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Before / After ──────────────────────────────────────────────────────── */

export function BeforeAfter({ rows }: { rows: { label: string; before: string; after: string }[] }) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-white/[0.07]">
      <table className="w-full min-w-[520px] border-collapse text-sm">
        <thead>
          <tr className="bg-white/[0.03]">
            <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#8b949e]" />
            <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#f87171]">Before</th>
            <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#00ff88]">After</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-white/[0.05]">
              <td className="px-4 py-3 font-semibold text-white">{r.label}</td>
              <td className="px-4 py-3 text-[#8b949e]">{r.before}</td>
              <td className="px-4 py-3 font-semibold text-[#c9d1d9]">{r.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Tabs ────────────────────────────────────────────────────────────────── */

export function Tabs({ tabs }: { tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-1 border-b border-white/[0.07]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`-mb-px border-b-2 px-4 py-[10px] text-[13px] font-semibold transition-colors ${
              active === t.id
                ? "border-[#00d4ff] text-white"
                : "border-transparent text-[#8b949e] hover:text-[#c9d1d9]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-6">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}

/* ── Accordion ───────────────────────────────────────────────────────────── */

export function Accordion({
  items,
  defaultOpen,
}: {
  items: { id: string; title: string; meta?: string; content: ReactNode }[];
  defaultOpen?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  return (
    <div className="my-8 flex flex-col gap-2">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]">
            <button
              onClick={() => setOpen(isOpen ? null : it.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
              aria-expanded={isOpen}
            >
              <span
                className="shrink-0 font-mono text-xs text-[#00d4ff] transition-transform duration-200"
                style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
              >
                ▸
              </span>
              <span className="flex-1 text-sm font-semibold text-white">{it.title}</span>
              {it.meta && <span className="shrink-0 font-mono text-[10px] text-[#525960]">{it.meta}</span>}
            </button>
            {isOpen && (
              <div className="border-t border-white/[0.05] px-5 py-5 pl-[46px] text-sm leading-relaxed text-[#c9d1d9]">
                {it.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Code block ──────────────────────────────────────────────────────────── */

export function Code({ lang, children }: { lang?: string; children: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-white/[0.07] bg-[#050505]">
      {lang && (
        <div className="border-b border-white/[0.05] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#525960]">
          {lang}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-[#c9d1d9]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ── Timeline ────────────────────────────────────────────────────────────── */

export function Timeline({
  items,
}: {
  items: { date: string; title: string; tone?: Accent; body: ReactNode }[];
}) {
  return (
    <div className="my-8 flex flex-col">
      {items.map((it, i) => {
        const c = accent[it.tone ?? "cyan"];
        return (
          <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
            {i < items.length - 1 && (
              <span className="absolute left-[7px] top-[18px] h-full w-px bg-gradient-to-b from-white/[0.12] to-white/[0.03]" />
            )}
            <span
              className="relative z-[1] mt-[5px] h-[15px] w-[15px] shrink-0 rounded-full border-2"
              style={{ borderColor: c, background: "#0a0a0a", boxShadow: `0 0 0 4px ${c}12` }}
            />
            <div className="flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: c }}>
                {it.date}
              </p>
              <h4 className="mt-1 text-[15px] font-bold text-white">{it.title}</h4>
              <div className="mt-2 text-sm leading-relaxed text-[#8b949e]">{it.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Progress ────────────────────────────────────────────────────────────── */

export function Progress({ value, tone = "cyan", label }: { value: number; tone?: Accent; label?: string }) {
  const c = accent[tone];
  return (
    <div className="my-2">
      {label && (
        <div className="mb-[6px] flex justify-between font-mono text-[10px] uppercase tracking-[0.1em]">
          <span className="text-[#8b949e]">{label}</span>
          <span style={{ color: c }}>{value}%</span>
        </div>
      )}
      <div className="h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${value}%`, background: c }} />
      </div>
    </div>
  );
}

/* ── Card grid ───────────────────────────────────────────────────────────── */

export function CardGrid({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  return <div className={`my-8 grid gap-4 ${cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>{children}</div>;
}

export function Card({
  title,
  meta,
  tone = "cyan",
  href,
  children,
}: {
  title: string;
  meta?: string;
  tone?: Accent;
  href?: string;
  children: ReactNode;
}) {
  const c = accent[tone];
  const inner = (
    <>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h4 className="text-[15px] font-bold text-white">{title}</h4>
        {meta && <span className="shrink-0 font-mono text-[10px] text-[#525960]">{meta}</span>}
      </div>
      <div className="text-sm leading-relaxed text-[#8b949e]">{children}</div>
      {href && (
        <p className="mt-4 font-mono text-[11px] font-bold" style={{ color: c }}>
          Read →
        </p>
      )}
    </>
  );

  const cls =
    "rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.035]";

  return href ? (
    <a href={href} className={`${cls} block`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

/* ── Definition rows (used for trade-off / consequence lists) ────────────── */

export function DefList({ items }: { items: { term: string; desc: ReactNode; tone?: Accent }[] }) {
  return (
    <dl className="my-6 flex flex-col gap-4">
      {items.map((it) => (
        <div key={it.term} className="border-l-2 pl-4" style={{ borderColor: `${accent[it.tone ?? "cyan"]}44` }}>
          <dt className="text-sm font-bold text-white">{it.term}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-[#8b949e]">{it.desc}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Breadcrumb ──────────────────────────────────────────────────────────── */

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px]">
      {trail.map((t, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-[#3a4149]">/</span>}
          {t.href ? (
            <a href={t.href} className="text-[#8b949e] transition-colors hover:text-[#00d4ff]">
              {t.label}
            </a>
          ) : (
            <span className="text-[#c9d1d9]">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ── Page header ─────────────────────────────────────────────────────────── */

export function PageHeader({
  eyebrow,
  title,
  lead,
  status,
  meta,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  status?: { tone: Accent; label: string };
  meta?: string[];
}) {
  return (
    <header className="mb-12 border-b border-white/[0.07] pb-10">
      {eyebrow && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#00d4ff]">{eyebrow}</p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl">{title}</h1>
        {status && <Pill tone={status.tone}>{status.label}</Pill>}
      </div>
      {lead && <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-[#8b949e]">{lead}</p>}
      {meta && (
        <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-[#525960]">
          {meta.map((m, i) => (
            <span key={m}>
              {i > 0 && <span className="mr-2 text-[#2d3339]">·</span>}
              {m}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}

/* ── Next / previous page navigation ─────────────────────────────────────── */

export function PageNav({
  prev,
  next,
}: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <div className="mt-16 grid gap-3 border-t border-white/[0.07] pt-8 sm:grid-cols-2">
      {prev ? (
        <a
          href={prev.href}
          className="rounded-xl border border-white/[0.07] px-5 py-4 transition-colors hover:border-white/[0.16]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#525960]">← Previous</span>
          <span className="mt-1 block text-sm font-semibold text-white">{prev.label}</span>
        </a>
      ) : (
        <span />
      )}
      {next && (
        <a
          href={next.href}
          className="rounded-xl border border-white/[0.07] px-5 py-4 text-right transition-colors hover:border-white/[0.16]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#525960]">Next →</span>
          <span className="mt-1 block text-sm font-semibold text-white">{next.label}</span>
        </a>
      )}
    </div>
  );
}
