"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { notes } from "@/content/notas";
import { useI18n } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const COPY = {
  pt: {
    num: "05.",
    kicker: "Escrita técnica",
    heading: "O que eu aprendi construindo",
    lead: "Notas sobre decisões reais — cada uma aponta para o arquivo do repositório onde a decisão está escrita.",
    all: "Ver todas as notas",
    read: "min",
    more: "Mais",
    links: [
      { href: "/como-trabalho", label: "Como eu trabalho", desc: "Seis princípios, cada um ligado ao código que o originou." },
      { href: "/uses", label: "O que eu uso", desc: "Ferramentas que aparecem de fato nos repositórios." },
      { href: "/now", label: "Agora", desc: "No que estou trabalhando, e o FAQ para recrutador." },
    ],
  },
  en: {
    num: "05.",
    kicker: "Engineering writing",
    heading: "What I learned building",
    lead: "Notes on real decisions — each one points at the repository file where the decision is written down.",
    all: "Read all notes",
    read: "min",
    more: "More",
    links: [
      { href: "/como-trabalho", label: "How I work", desc: "Six principles, each tied to the code that produced it." },
      { href: "/uses", label: "What I use", desc: "Tools that actually appear in the repositories." },
      { href: "/now", label: "Now", desc: "What I am working on, plus the recruiter FAQ." },
    ],
  },
  es: {
    num: "05.",
    kicker: "Escritura técnica",
    heading: "Lo que aprendí construyendo",
    lead: "Notas sobre decisiones reales — cada una apunta al archivo del repositorio donde está escrita la decisión.",
    all: "Ver todas las notas",
    read: "min",
    more: "Más",
    links: [
      { href: "/como-trabalho", label: "Cómo trabajo", desc: "Seis principios, cada uno ligado al código que lo originó." },
      { href: "/uses", label: "Lo que uso", desc: "Herramientas que aparecen de verdad en los repositorios." },
      { href: "/now", label: "Ahora", desc: "En qué estoy trabajando, y el FAQ para reclutadores." },
    ],
  },
} as const;

export default function Writing() {
  const { lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const c = COPY[lang];

  const featured = [...notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

  return (
    <section ref={ref} id="writing" className="py-28 relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-2 mb-14">
          <motion.p variants={fadeUp} className="font-mono text-[#00d4ff] text-sm tracking-[0.15em] uppercase">
            {c.num} {c.kicker}
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            {c.heading}
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#00d4ff] rounded-full" />
          <motion.p variants={fadeUp} className="mt-4 max-w-[62ch] text-[#8b949e] leading-relaxed">
            {c.lead}
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((n) => (
            <motion.a key={n.slug} variants={fadeUp}
              href={`/${lang}/notas/${n.slug}`}
              className="group flex flex-col rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 transition-all hover:border-[rgba(0,212,255,0.25)] hover:bg-[rgba(0,212,255,0.04)]">
              <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#4d5866]">
                <time dateTime={n.date}>{n.date}</time>
                <span aria-hidden="true">·</span>
                <span>{n.minutes} {c.read}</span>
              </div>
              <h3 className="font-bold text-white leading-snug transition-colors group-hover:text-[#00d4ff]">
                {n.title[lang]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8b949e]">{n.dek[lang]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {n.tags.slice(0, 3).map((t) => (
                  <span key={t}
                    className="rounded border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-2 py-[3px] font-mono text-[11px] text-[#8b949e]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"} className="mt-6">
          <a href={`/${lang}/notas`}
            className="inline-flex items-center gap-2 font-mono text-sm text-[#00d4ff] hover:underline">
            {c.all} →
          </a>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {c.links.map((l) => (
            <motion.a key={l.href} variants={fadeUp}
              href={`/${lang}${l.href}`}
              className="group rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 transition-all hover:border-[rgba(0,212,255,0.25)]">
              <p className="font-bold text-white transition-colors group-hover:text-[#00d4ff]">{l.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#8b949e]">{l.desc}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
