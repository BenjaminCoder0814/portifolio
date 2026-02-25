"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { skills, education } from "@/data";
import { useI18n } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const categoryColor: Record<string, string> = {
  frontend: "#00d4ff",
  backend:  "#7c3aed",
  database: "#00ff88",
  tools:    "#f59e0b",
};

export default function Formation() {
  const { t } = useI18n();
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (inView) setAnimated(true);
  }, [inView]);

  // Map data status strings to i18n keys
  const statusLabel = (status: string | undefined) => {
    if (!status) return null;
    if (status === "cursando" || status === "in progress" || status === "en curso") return t.formation.current;
    if (status === "concluído" || status === "completed" || status === "completado") return t.formation.completed;
    return t.formation.inProgress;
  };

  return (
    <section ref={ref} id="formation" className="py-28 relative">
      <div className="absolute right-[-150px] top-1/3 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-2 mb-16">
          <motion.p variants={fadeUp} className="font-mono text-[#00d4ff] text-sm tracking-[0.15em] uppercase">
            {t.sections.formation.num} {t.nav.formation}
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            {t.formation.skillsHeading}
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#7c3aed] rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills by category */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-8">
            {Object.entries(skills).map(([cat, items]) => (
              <motion.div key={cat} variants={fadeUp}>
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] mb-4"
                  style={{ color: categoryColor[cat] ?? "#00d4ff" }}>
                  {cat}
                </h3>
                <div className="flex flex-col gap-3">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between font-mono text-xs text-[#8b949e] mb-1">
                        <span>{skill.name}</span>
                        <span style={{ color: categoryColor[cat] ?? "#00d4ff" }}>{skill.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: animated ? `${skill.level}%` : "0%",
                            background: `linear-gradient(to right, ${categoryColor[cat] ?? "#00d4ff"}, ${categoryColor[cat] ?? "#00d4ff"}88)`,
                            boxShadow: `0 0 8px ${categoryColor[cat] ?? "#00d4ff"}66`,
                            transitionDelay: `${skill.level * 5}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education cards */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-5">
            {education.map((edu, idx) => (
              <motion.div key={idx} variants={fadeUp}
                className="p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(124,58,237,0.25)] transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-white text-sm leading-snug">{edu.degree}</h3>
                    <p className="font-mono text-[#8b949e] text-xs mt-1">{edu.institution}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-[#4d5866] bg-[rgba(255,255,255,0.04)] px-2 py-1 rounded">
                    {edu.period}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-sm text-[#6e7681]">{edu.description}</p>
                )}
                {edu.status && (
                  <div className="mt-2 inline-flex items-center gap-1 font-mono text-[11px]"
                    style={{ color: edu.status === "cursando" ? "#00ff88" : "#8b949e" }}>
                    <span className="w-[5px] h-[5px] rounded-full"
                      style={{ backgroundColor: edu.status === "cursando" ? "#00ff88" : "#8b949e" }} />
                    {statusLabel(edu.status)}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
