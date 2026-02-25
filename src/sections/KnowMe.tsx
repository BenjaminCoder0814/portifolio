"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { knowMe, personal } from "@/data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function KnowMe() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="know-me" className="py-28 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-2 mb-16">
          <motion.p variants={fadeUp} className="font-mono text-[#00d4ff] text-sm tracking-[0.15em] uppercase">
            04. Know Me
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Além do código
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#00ff88] rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {knowMe.map((item, idx) => (
            <motion.div key={idx} variants={fadeUp}
              className="p-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(0,255,136,0.2)] hover:bg-[rgba(0,255,136,0.02)] transition-all group">
              <div className="text-3xl mb-4">{item.emoji}</div>
              <h3 className="font-bold text-white mb-2 group-hover:text-[#00ff88] transition-colors">{item.title}</h3>
              <p className="text-sm text-[#6e7681] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Philosophy blockquote */}
        {personal.philosophy && (
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative max-w-[700px] mx-auto text-center">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-6xl text-[#00ff88] opacity-20 select-none leading-none">{String.fromCharCode(34)}</div>
            <p className="text-[#c9d1d9] text-xl font-medium italic leading-relaxed mb-4 relative z-[1]">
              {personal.philosophy}
            </p>
            <cite className="font-mono text-sm text-[#4d5866] not-italic">— {personal.firstName} {personal.lastName}</cite>
          </motion.blockquote>
        )}
      </div>
    </section>
  );
}
