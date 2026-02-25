"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { personal, timeline } from "@/data";

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
  const ref   = useRef<HTMLElement>(null);
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
            01. Sobre
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Quem sou eu
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
              {personal.bio}
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
              {personal.stats.map(({ label, value }) => (
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

            {timeline.map((item, idx) => (
              <motion.div key={idx} variants={fadeRight}
                className="relative mb-10 last:mb-0">
                {/* dot */}
                <div
                  className="absolute -left-[29px] top-[5px] w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: item.current ? "#00d4ff" : "#4d5866",
                    backgroundColor: item.current ? "rgba(0,212,255,0.15)" : "#0a0a0a",
                    boxShadow: item.current ? "0 0 12px rgba(0,212,255,0.5)" : "none",
                  }}
                />

                <span className="font-mono text-[11px] text-[#4d5866] tracking-[0.08em]">
                  {item.year}
                </span>
                <h3 className="font-semibold text-white mt-1 mb-1">{item.title}</h3>
                <p className="text-sm text-[#8b949e]">{item.description}</p>
                {item.tech && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tech.map((t) => (
                      <span key={t} className="px-2 py-[2px] font-mono text-[10px] rounded bg-[rgba(124,58,237,0.15)] text-[#a78bfa] border border-[rgba(124,58,237,0.2)]">{t}</span>
                    ))}
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
