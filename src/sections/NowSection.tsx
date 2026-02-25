"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const itemColors = ["#00d4ff", "#7c3aed", "#00ff88"];
const cursorVariants: Variants = {
  blink: {
    opacity: [1, 0],
    transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" },
  },
};

export default function NowSection() {
  const { t } = useI18n();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="now" className="py-28 relative overflow-hidden">
      {/* Subtle radial bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-10 items-start">

          {/* Left: main content */}
          <div>
            {/* Header */}
            <motion.div
              variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
              className="mb-10 flex flex-col gap-3">
              <motion.p variants={fadeUp}
                className="font-mono text-[#00d4ff] text-sm tracking-[0.15em] uppercase">
                {t.sections.now.heading}
              </motion.p>
              <motion.h2 variants={fadeUp}
                className="font-sans font-black text-white tracking-[-0.03em]"
                style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
                {t.sections.now.heading}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#6e7681] text-sm">
                {t.now.sub}
              </motion.p>
              <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#00d4ff] rounded-full" />
            </motion.div>

            {/* Terminal-style items */}
            <motion.div
              variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
              className="rounded-xl border border-[rgba(255,255,255,0.07)] overflow-hidden"
              style={{ background: "#0d1117" }}>

              {/* Terminal title bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.06)]"
                style={{ background: "#161b22" }}>
                <div className="flex gap-[6px]">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="flex-1 text-center font-mono text-xs text-[#4d5866]">
                  benjamin@portfolio ~ now
                </span>
              </div>

              {/* Lines */}
              <div className="p-5 font-mono text-sm flex flex-col gap-4">
                {t.now.items.map((item, idx) => {
                  const color = itemColors[idx] ?? "#00d4ff";
                  return (
                    <motion.div key={idx} variants={fadeUp} className="flex items-start gap-3 group">
                      <span className="text-[#4d5866] shrink-0 mt-[1px]">$</span>
                      <div className="flex flex-col gap-[2px]">
                        <span className="text-[#4d5866] text-xs uppercase tracking-[0.1em]">
                          currently --{item.label.toLowerCase()}
                        </span>
                        <span className="font-semibold flex items-center gap-1" style={{ color }}>
                          {item.value}
                          {idx === 0 && (
                            <motion.span
                              variants={cursorVariants} animate="blink"
                              className="inline-block w-[2px] h-4 ml-1 rounded-sm"
                              style={{ background: color }} />
                          )}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Available line */}
                <motion.div variants={fadeUp}
                  className="flex items-center gap-2 pt-2 border-t border-[rgba(255,255,255,0.06)] mt-1">
                  <span className="text-[#4d5866] text-xs">$</span>
                  <span className="text-[#00ff88] text-xs font-mono">{t.now.available}</span>
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right: Lighthouse badge */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
            className="xl:sticky xl:top-32 flex flex-col items-center gap-4">

            {/* Lighthouse score ring */}
            <div className="relative flex items-center justify-center w-40 h-40">
              {/* SVG progress ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
                {/* Track */}
                <circle cx="80" cy="80" r="65"
                  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                {/* Progress ~ 95% */}
                <circle cx="80" cy="80" r="65"
                  fill="none" stroke="url(#lh-grad)" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 65}`}
                  strokeDashoffset={`${2 * Math.PI * 65 * 0.05}`} />
                <defs>
                  <linearGradient id="lh-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00ff88" />
                    <stop offset="100%" stopColor="#00d4ff" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inner content */}
              <div className="flex flex-col items-center select-none">
                <span className="font-mono font-black text-white" style={{ fontSize: "2.2rem", lineHeight: 1 }}>95</span>
                <span className="font-mono text-[10px] text-[#00ff88] tracking-[0.1em] uppercase">+</span>
              </div>
            </div>

            {/* Label */}
            <div className="text-center">
              <p className="font-mono text-xs text-[#6e7681] tracking-[0.1em] uppercase">
                {t.now.lighthouse}
              </p>
              <p className="font-mono text-[10px] text-[#4d5866] mt-1">Performance · A11y · SEO</p>
            </div>

            {/* Score bars */}
            <div className="w-full flex flex-col gap-2 text-[10px] font-mono">
              {[
                { label: "Performance", score: 95, color: "#00ff88"  },
                { label: "Accessibility", score: 92, color: "#00d4ff" },
                { label: "Best Practices", score: 96, color: "#7c3aed" },
                { label: "SEO", score: 98, color: "#ffbd2e"  },
              ].map((metric) => (
                <div key={metric.label} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[8px] font-black text-black"
                    style={{ background: metric.color }}>
                    {metric.score >= 90 ? "●" : "●"}
                  </span>
                  <span className="text-[#4d5866] flex-1 truncate">{metric.label}</span>
                  <span style={{ color: metric.color }}>{metric.score}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
