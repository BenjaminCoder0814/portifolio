"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { resume } from "@/app/curriculo/data";

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Reads from the resume data module rather than a second copy in i18n — the
 * home page and the resume cannot drift apart, because there is nowhere for
 * them to drift to.
 */
export default function Achievements() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const items = resume[lang].achievements;

  return (
    <section ref={ref} id="achievements" className="relative py-24">
      <div className="mx-auto max-w-[1000px] px-6">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.p variants={fadeUp} className="font-mono text-sm uppercase tracking-[0.15em] text-[#00ff88]">
            {t.sections.achievements.num} {t.sections.achievements.heading}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-2 font-sans font-black tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}
          >
            {t.achievements.title}
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-2 h-[3px] w-12 rounded-full bg-[#00ff88]" />

          <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            {items.map((a, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex gap-5 border-b border-white/[0.05] px-6 py-6 transition-colors last:border-b-0 hover:bg-white/[0.02]"
              >
                <span className="shrink-0 pt-[3px] font-mono text-xs font-bold text-[#00ff88]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-[#c9d1d9]">{a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
