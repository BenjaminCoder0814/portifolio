"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const stepColors = ["#00d4ff", "#7c3aed", "#00ff88", "#ffbd2e"];

export default function CaseStudy() {
  const { t } = useI18n();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="case-study" className="py-28 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(0,255,136,0.025) 0%, transparent 60%)" }} />

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mb-14 flex flex-col gap-3">
          <motion.p variants={fadeUp}
            className="font-mono text-[#00ff88] text-sm tracking-[0.15em] uppercase">
            {t.casestudy.label}
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)" }}>
            {t.casestudy.title}
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#00ff88] rounded-full" />
        </motion.div>

        {/* Steps flow */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 mb-12 relative">

          {/* Connector line (desktop) */}
          <div className="hidden xl:block absolute top-[2.8rem] left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, #00d4ff40, #7c3aed40, #00ff8840, #ffbd2e40)" }} />

          {t.casestudy.steps.map((step, idx) => {
            const color = stepColors[idx] ?? "#00d4ff";
            return (
              <motion.div key={idx} variants={fadeUp}
                className="relative flex flex-col items-start xl:items-center xl:text-center px-4 pb-8 xl:pb-0 group">

                {/* Vertical connector (mobile) */}
                {idx < t.casestudy.steps.length - 1 && (
                  <div className="xl:hidden absolute left-[1.8rem] top-[4.5rem] bottom-0 w-px"
                    style={{ background: `${color}30` }} />
                )}

                {/* Circle node */}
                <div className="relative z-10 shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ borderColor: color, background: `${color}12` }}>
                  <span className="font-mono font-black text-sm" style={{ color }}>
                    {step.step}
                  </span>
                  {/* Outer pulse ring */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 0 8px ${color}18` }} />
                </div>

                {/* Label */}
                <p className="font-mono text-xs tracking-[0.12em] uppercase mb-2 font-semibold"
                  style={{ color }}>
                  {step.label}
                </p>

                {/* Description */}
                <p className="text-[#8b949e] text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Metrics bar */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          className="relative rounded-2xl border border-[rgba(0,255,136,0.15)] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.03) 0%, rgba(0,212,255,0.03) 100%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #00ff8850, transparent)" }} />

          <div className="relative z-10 px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {t.casestudy.metrics.map((m, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1">
                <span className="font-mono font-black text-[#00ff88]" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
                  {m.value}
                </span>
                <span className="font-mono text-[10px] text-[#4d5866] uppercase tracking-[0.1em] leading-tight">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
