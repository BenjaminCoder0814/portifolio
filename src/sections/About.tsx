"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { personal } from "@/data";
import { useI18n } from "@/lib/i18n";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const { t } = useI18n();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} id="about" className="py-28 relative">
      {/* subtle bg glow */}
      <div className="absolute left-[-200px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-2 mb-16">
          <motion.p variants={fadeUp} className="font-mono text-[#00d4ff] text-sm tracking-[0.15em] uppercase">
            {t.sections.about.num} {t.nav.about}
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            {t.sections.about.heading}
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#00d4ff] rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-5">
            <motion.p variants={fadeUp}
              className="text-[#c9d1d9] leading-relaxed"
              style={{ fontSize: "clamp(1rem,1.8vw,1.1rem)" }}>
              {t.about.bio1}
            </motion.p>
            <motion.p variants={fadeUp}
              className="text-[#8b949e] leading-relaxed text-sm">
              {t.about.bio2}
            </motion.p>

            {/* Stack tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
              {personal.stack.map((tag) => (
                <span key={tag}
                  className="px-3 py-1 font-mono text-xs rounded border border-[rgba(0,212,255,0.25)] text-[#00d4ff] bg-[rgba(0,212,255,0.05)]">
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Quick stats */}
            <motion.div variants={fadeUp}
              className="grid grid-cols-3 gap-4 mt-4 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              {t.about.stats.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="font-mono text-2xl font-bold text-[#00d4ff]">{value}</div>
                  <div className="font-mono text-[10px] text-[#4d5866] uppercase tracking-[0.1em] mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
            className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />

            {t.formation.timeline.map((item, idx) => (
              <motion.div key={idx} variants={fadeRight}
                className="relative mb-10 last:mb-0">
                {/* dot */}
                <div
                  className="absolute -left-[29px] top-[5px] w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: idx === t.formation.timeline.length - 1 ? "#00d4ff" : "#4d5866",
                    backgroundColor: idx === t.formation.timeline.length - 1 ? "rgba(0,212,255,0.15)" : "#0a0a0a",
                    boxShadow: idx === t.formation.timeline.length - 1 ? "0 0 12px rgba(0,212,255,0.5)" : "none",
                  }}
                />

                <span className="font-mono text-[11px] text-[#4d5866] tracking-[0.08em]">
                  {item.year}
                </span>
                <h3 className="font-semibold text-white mt-1 mb-1">{item.title}</h3>
                <p className="text-sm text-[#8b949e]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

