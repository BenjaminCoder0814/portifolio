"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * The three doors, immediately below the hero.
 *
 * Everything a recruiter came for is one click from here. Deliberately three
 * cards and no prose: at this point in the page they are still deciding
 * whether to invest, and a paragraph asks for a commitment they haven't made.
 */
export default function Systems() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      href: "/engineering/erp",
      accent: "#00d4ff",
      status: t.systems.erp.status,
      title: t.systems.erp.title,
      desc: t.systems.erp.desc,
      metrics: [
        { v: "3", l: t.systems.erp.m1 },
        { v: "100%", l: t.systems.erp.m2 },
        { v: "15min→30s", l: t.systems.erp.m3 },
      ],
      primary: true,
    },
    {
      href: "/engineering",
      accent: "#a78bfa",
      status: t.systems.eng.status,
      title: t.systems.eng.title,
      desc: t.systems.eng.desc,
      metrics: [],
    },
    {
      href: "/engineering/ai",
      accent: "#8b949e",
      status: t.systems.ai.status,
      title: t.systems.ai.title,
      desc: t.systems.ai.desc,
      metrics: [],
      muted: true,
    },
  ];

  return (
    <section ref={ref} id="systems" className="relative py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp} className="mb-10 grid gap-5 lg:grid-cols-[1.6fr_1fr_1fr]">
            {cards.map((c) => (
              <motion.a
                key={c.href}
                variants={fadeUp}
                href={c.href}
                className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  c.muted
                    ? "border-white/[0.06] bg-white/[0.012] hover:border-white/[0.12]"
                    : "border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.045]"
                }`}
                style={c.primary ? { borderColor: "rgba(0,212,255,0.22)" } : undefined}
              >
                <span
                  className="mb-4 inline-flex w-fit items-center gap-[6px] rounded-full border px-[10px] py-[3px] font-mono text-[10px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: c.accent, borderColor: `${c.accent}33`, background: `${c.accent}0f` }}
                >
                  <span className="h-[5px] w-[5px] rounded-full" style={{ background: c.accent }} />
                  {c.status}
                </span>

                <h3 className={`font-black tracking-[-0.02em] text-white ${c.primary ? "text-2xl" : "text-lg"}`}>
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#8b949e]">{c.desc}</p>

                {c.metrics.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.07] pt-5">
                    {c.metrics.map((m) => (
                      <div key={m.l}>
                        <span className="block text-xl font-black leading-none" style={{ color: c.accent }}>
                          {m.v}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-[#4d5866]">
                          {m.l}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <span
                  className="mt-6 font-mono text-[11px] font-bold transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: c.accent }}
                >
                  {c.muted ? t.systems.followAlong : t.systems.explore} →
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
