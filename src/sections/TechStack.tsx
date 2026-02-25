"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const techIcons: Record<string, string> = {
  "React":       "⚛",
  "Next.js":     "▲",
  "TypeScript":  "TS",
  "Tailwind CSS":"TW",
  "Node.js":     "⬡",
  "MySQL":       "🗄",
  "Figma":       "✦",
  "Git":         "⎇",
};

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  Frontend:  { text: "#00d4ff", bg: "rgba(0,212,255,0.08)",  border: "rgba(0,212,255,0.2)"  },
  Framework: { text: "#ffffff", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)" },
  Language:  { text: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)"  },
  Styling:   { text: "#00ff88", bg: "rgba(0,255,136,0.08)",  border: "rgba(0,255,136,0.2)"   },
  Backend:   { text: "#00ff88", bg: "rgba(0,255,136,0.08)",  border: "rgba(0,255,136,0.2)"   },
  Database:  { text: "#ffbd2e", bg: "rgba(255,189,46,0.08)", border: "rgba(255,189,46,0.2)"  },
  Design:    { text: "#ff7de8", bg: "rgba(255,125,232,0.08)", border: "rgba(255,125,232,0.2)" },
  DevOps:    { text: "#8b949e", bg: "rgba(139,148,158,0.08)", border: "rgba(139,148,158,0.2)" },
};

export default function TechStack() {
  const { t } = useI18n();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="techstack" className="py-28 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(124,58,237,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mb-14 flex flex-col gap-3">
          <motion.p variants={fadeUp}
            className="font-mono text-[#00d4ff] text-sm tracking-[0.15em] uppercase">
            {t.sections.techstack.heading}
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.8rem,4.5vw,3rem)" }}>
            {t.sections.techstack.heading}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#6e7681] text-sm leading-relaxed max-w-[480px]">
            {t.techstack.sub}
          </motion.p>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#00d4ff] rounded-full" />
        </motion.div>

        {/* Tech grid */}
        <motion.div
          variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.techstack.items.map((item, idx) => {
            const cat = categoryColors[item.category] ?? categoryColors["DevOps"];
            const icon = techIcons[item.name] ?? "◆";
            return (
              <motion.div key={idx} variants={fadeUp}
                className="group relative p-5 rounded-xl border transition-all duration-300 cursor-default overflow-hidden"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.border;
                  e.currentTarget.style.background = cat.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                }}>

                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-base font-mono font-black transition-colors duration-300"
                    style={{ background: cat.bg, color: cat.text, border: `1px solid ${cat.border}` }}>
                    {icon}
                  </div>
                  {/* Category badge */}
                  <span className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-[2px] rounded-full"
                    style={{ color: cat.text, background: cat.bg, border: `1px solid ${cat.border}` }}>
                    {item.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-bold text-white text-base mb-2 transition-colors duration-300 group-hover:text-white">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-[#6e7681] text-xs leading-relaxed">{item.desc}</p>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${cat.text}60, transparent)` }} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Note: no percentages, only descriptions */}
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mt-8 text-center font-mono text-xs text-[#4d5866] tracking-[0.08em]">
          // no skill bars. what matters is what gets shipped.
        </motion.p>
      </div>
    </section>
  );
}
