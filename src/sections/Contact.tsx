"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { personal } from "@/data";
import { useI18n } from "@/lib/i18n";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

type FormState = { name: string; email: string; message: string };

export default function Contact() {
  const { t } = useI18n();
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const channels = [
    {
      label: t.contact.email,
      value: personal.email,
      href:  `mailto:${personal.email}`,
      icon:  (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "@BenjaminCoder0814",
      href:  personal.github,
      icon:  (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "Benjamin Maciel",
      href:  personal.linkedin,
      icon:  (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section ref={ref} id="contact" className="py-28 relative">
      <div className="absolute left-[-100px] bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="flex flex-col gap-2 mb-16">
          <motion.p variants={fadeUp} className="font-mono text-[#00d4ff] text-sm tracking-[0.15em] uppercase">
            {t.sections.contact.num} {t.nav.contact}
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-black text-white tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            {t.sections.contact.heading}
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[3px] bg-[#00d4ff] rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Channels */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-6">
            <motion.p variants={fadeUp} className="text-[#8b949e] leading-relaxed">
              {t.contact.cta}
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#4d5866] text-sm font-mono">
              {t.contact.ctaSub}
            </motion.p>

            {channels.map((ch) => (
              <motion.a key={ch.label} variants={fadeUp}
                href={ch.href} target={ch.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(0,212,255,0.25)] hover:bg-[rgba(0,212,255,0.04)] transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,212,255,0.1)] flex items-center justify-center text-[#00d4ff] group-hover:scale-110 transition-transform">
                  {ch.icon}
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#4d5866] uppercase tracking-[0.1em]">{ch.label}</p>
                  <p className="text-sm text-[#c9d1d9]">{ch.value}</p>
                </div>
                <div className="ml-auto text-[#4d5866] group-hover:text-[#00d4ff] transition-colors">↗</div>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
            {status === "sent" ? (
              <motion.div variants={fadeUp}
                className="h-full flex flex-col items-center justify-center text-center p-8 rounded-xl border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.04)]">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-bold text-white text-lg mb-2">{t.contact.messageSent}</h3>
                <p className="text-[#8b949e] text-sm">{t.contact.thankYou}</p>
                <button onClick={() => setStatus("idle")}
                  className="mt-6 font-mono text-xs text-[#4d5866] hover:text-white transition-colors">
                  {t.contact.anotherSend}
                </button>
              </motion.div>
            ) : (
              <motion.form onSubmit={handleSubmit} variants={stagger}
                className="flex flex-col gap-5">
                {(["name", "email"] as const).map((field) => (
                  <motion.div key={field} variants={fadeUp}>
                    <label className="block font-mono text-xs text-[#4d5866] uppercase tracking-[0.1em] mb-2">
                      {field === "name" ? t.contact.nameLabel : t.contact.emailLabel}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] text-white text-sm font-mono focus:outline-none focus:border-[#00d4ff] focus:bg-[rgba(0,212,255,0.04)] transition-all placeholder:text-[#4d5866]"
                      placeholder={field === "name" ? t.contact.namePlaceholder : t.contact.emailPlaceholder}
                    />
                  </motion.div>
                ))}
                <motion.div variants={fadeUp}>
                  <label className="block font-mono text-xs text-[#4d5866] uppercase tracking-[0.1em] mb-2">{t.contact.msgLabel}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] text-white text-sm font-mono focus:outline-none focus:border-[#00d4ff] focus:bg-[rgba(0,212,255,0.04)] transition-all placeholder:text-[#4d5866] resize-none"
                    placeholder={t.contact.msgPlaceholder}
                  />
                </motion.div>
                <motion.button variants={fadeUp} type="submit" disabled={status === "sending"}
                  className="w-full py-3 rounded-lg bg-[#00d4ff] text-[#0a0a0a] font-bold text-sm transition-all hover:shadow-[0_8px_30px_rgba(0,212,255,0.3)] hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin" />
                      {t.contact.sending}
                    </span>
                  ) : t.contact.sendMessage}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
