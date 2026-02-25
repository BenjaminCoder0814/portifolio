"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const cardAccents = [
  { border: "rgba(0,212,255,0.25)",  bg: "rgba(0,212,255,0.04)",  hover: "rgba(0,212,255,0.08)",  glow: "#00d4ff" },
  { border: "rgba(124,58,237,0.25)", bg: "rgba(124,58,237,0.04)", hover: "rgba(124,58,237,0.08)", glow: "#7c3aed" },
  { border: "rgba(0,255,136,0.25)",  bg: "rgba(0,255,136,0.04)",  hover: "rgba(0,255,136,0.08)",  glow: "#00ff88" },
  { border: "rgba(255,189,46,0.25)", bg: "rgba(255,189,46,0.04)", hover: "rgba(255,189,46,0.08)", glow: "#ffbd2e" },
];

export default function EngineeringMindset() {
  const { t } = useI18n();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="mindset" className="py-28 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/3 w-[500px] h-[500px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />
        <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Section header */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mb-16 flex flex-col gap-3">
          <motion.p variants={fadeUp}
            className="font-mono text-[#7c3aed] text-sm tracking-[0.15em] uppercase">
            {t.sections.mindset.heading}
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white leading-[1.1] tracking-[-0.03em] max-w-[820px]"
            style={{ fontSize: "clamp(1.8rem,4.5vw,3.2rem)" }}>
            {t.mindset.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6e7681] text-base max-w-[560px] leading-relaxed">
            {t.mindset.sub}
          </motion.p>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#7c3aed] rounded-full" />
        </motion.div>

        {/* 4 thinking-pattern cards */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {t.mindset.cards.map((card, idx) => {
            const accent = cardAccents[idx] ?? cardAccents[0];
            return (
              <motion.div key={idx} variants={fadeUp}
                className="relative p-7 rounded-2xl border group transition-all duration-300 cursor-default"
                style={{ borderColor: accent.border, background: accent.bg }}
                onMouseEnter={(e) => { e.currentTarget.style.background = accent.hover; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = accent.bg; }}>
                {/* Corner glow on hover */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${accent.glow}20 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />

                <div className="text-4xl mb-4 select-none">{card.icon}</div>
                <h3 className="font-bold text-white text-lg mb-3 leading-tight"
                  style={{ color: "white" }}>
                  {card.title}
                </h3>
                <p className="text-[#6e7681] text-sm leading-relaxed">{card.desc}</p>

                {/* Step counter */}
                <div className="absolute top-5 right-5 font-mono text-xs"
                  style={{ color: accent.glow + "60" }}>
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Global Exposure strip */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          className="relative rounded-2xl border border-[rgba(0,212,255,0.12)] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(124,58,237,0.04) 100%)" }} />
          {/* Animated top border */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #00d4ff60, #7c3aed60, transparent)" }} />

          <div className="relative z-10 px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Globe icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.06)] flex items-center justify-center text-2xl">
                🌍
              </div>
              <div>
                <p className="font-mono text-[#00d4ff] text-xs tracking-[0.12em] uppercase mb-1">Global Exposure</p>
                <p className="text-white font-semibold text-base leading-snug">{t.mindset.global}</p>
              </div>
            </div>
            {/* Country count pill */}
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(0,212,255,0.2)] bg-[rgba(0,212,255,0.06)]">
              <span className="font-mono text-2xl font-black text-[#00d4ff]">17</span>
              <span className="font-mono text-[10px] text-[#4d5866] uppercase tracking-[0.1em] leading-tight">
                countries<br/>visited
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
