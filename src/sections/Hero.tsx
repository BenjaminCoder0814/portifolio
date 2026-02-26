"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { personal } from "@/data";
import { useTypingEffect } from "@/hooks";
import { useI18n } from "@/lib/i18n";
import benjaminFoto from "@/benjaminfoto.png";

export default function Hero() {
  const { t, lang } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const role      = useTypingEffect(t.hero.roles);

  // Code Rain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = (
      "アイウエオカキABCDEFGHIJ0123456789" +
      "const let var function return if else for while class import export " +
      "{}[]<>/\\|=+-*&%$#@!?;:.,_~`"
    ).split("");

    const fs = 13;
    const getCols = () => Math.floor(canvas.width / fs);
    let drops: number[] = [];

    const init = () => {
      drops = Array.from({ length: getCols() }, () =>
        Math.random() > 0.6 ? Math.random() * -60 : Math.random() * canvas.height / fs
      );
    };
    init();

    const draw = () => {
      ctx.fillStyle = "rgba(10,10,10,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fs}px JetBrains Mono, monospace`;

      drops.forEach((y, i) => {
        const ch  = chars[Math.floor(Math.random() * chars.length)];
        const x   = i * fs;
        const row = canvas.height / fs;
        const opacity = Math.max(0.1, 1 - (y / row) * 0.7);

        ctx.fillStyle  = `rgba(220,240,255,${opacity * 0.9})`;
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur  = 6;
        ctx.fillText(ch, x, y * fs);
        ctx.shadowBlur = 0;

        if (y > 2) {
          ctx.fillStyle = `rgba(0,212,255,${opacity * 0.4})`;
          const body = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(body, x, (y - 1) * fs);
        }

        if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.8;
      });
    };

    const loop = () => { draw(); animRef.current = requestAnimationFrame(loop); };
    loop();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "72px" }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Code Rain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.18] z-0"
      />

      {/* BG glows */}
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] font-mono text-[11px] text-[#00ff88] mb-6 animate-[fadeInUp_0.6s_0.2s_both]">
              <span className="w-[6px] h-[6px] rounded-full bg-[#00ff88] animate-[pulse-green_2s_infinite]" />
              {t.badge}
            </div>

            <p className="font-mono text-sm text-[#8b949e] mb-2 tracking-[0.05em] animate-[fadeInUp_0.6s_0.35s_both]">
              {t.hero.greeting}
            </p>

            <h1 className="font-sans font-black leading-[0.95] tracking-[-0.04em] mb-6 animate-[fadeInUp_0.6s_0.5s_both]"
              style={{ fontSize: "clamp(3rem,8vw,7.5rem)" }}>
              <span className="block text-white">{personal.firstName}</span>
              <span
                className="block text-[#00d4ff]"
                style={{ textShadow: "0 0 60px rgba(0,212,255,0.35)" }}
              >
                {personal.lastName}
              </span>
            </h1>

            {/* Typing role */}
            <div className="flex items-center gap-1 font-mono text-[#8b949e] mb-6 animate-[fadeInUp_0.6s_0.65s_both]"
              style={{ fontSize: "clamp(0.9rem,2vw,1.15rem)" }}>
              <span className="text-[#00d4ff]">~$ </span>
              <span className="text-white">{role}</span>
              <span className="text-[#00d4ff] animate-blink">|</span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#4d5866] mb-6 animate-[fadeInUp_0.6s_0.8s_both]">
              <span><span className="text-[#4d5866]">{t.hero.age}</span> <span className="text-[#8b949e]">{"// "}{personal.age} {t.hero.ageSuffix}</span></span>
              <span className="text-[#4d5866]">·</span>
              <span><span className="text-[#4d5866]">{t.hero.location}</span> <span className="text-[#8b949e]">{"// "}{personal.location}</span></span>
              <span className="text-[#4d5866]">·</span>
              <span><span className="text-[#4d5866]">{t.hero.status}</span> <span className="text-[#00ff88]">{"// "} {t.hero.online} ●</span></span>
            </div>

            {/* Tagline */}
            <p className="text-[#8b949e] mb-10 max-w-[580px] animate-[fadeInUp_0.6s_0.95s_both]"
              style={{ fontSize: "clamp(1rem,2vw,1.1rem)", lineHeight: 1.7 }}>
              {t.hero.subtitle}<br />
              <span className="font-mono text-sm text-[#4d5866]">{t.hero.tagline2}</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 animate-[fadeInUp_0.6s_1.1s_both]">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#00d4ff] text-[#0a0a0a] font-bold rounded-lg text-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,212,255,0.35)]"
              >
                {t.hero.cta_portfolio}
              </a>
              <a
                href={`/${lang}/curriculo`}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[rgba(124,58,237,0.12)] text-[#a78bfa] border border-[rgba(124,58,237,0.4)] rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-1 hover:bg-[rgba(124,58,237,0.22)] hover:border-[#7c3aed] hover:shadow-[0_8px_30px_rgba(124,58,237,0.25)]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
                {t.hero.cta_resume}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent text-white border border-[rgba(255,255,255,0.1)] rounded-lg text-sm font-semibold transition-all duration-200 hover:border-[#00d4ff] hover:text-[#00d4ff] hover:bg-[rgba(0,212,255,0.06)]"
              >
                {t.hero.cta_contact}
              </a>
            </div>

            {/* Socials */}
            <div className="flex gap-3 animate-[fadeInUp_0.6s_1.25s_both]">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 border border-[rgba(255,255,255,0.07)] rounded-lg text-[#8b949e] transition-all hover:text-[#00d4ff] hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.08)]"
                aria-label="GitHub"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 border border-[rgba(255,255,255,0.07)] rounded-lg text-[#8b949e] transition-all hover:text-[#00d4ff] hover:border-[#00d4ff] hover:bg-[rgba(0,212,255,0.08)]"
                aria-label="LinkedIn"
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="justify-self-center lg:justify-self-end w-[220px] sm:w-[260px] animate-[fadeInUp_0.6s_0.8s_both]">
            <div className="relative rounded-2xl p-[3px] bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(124,58,237,0.35),transparent_40%)] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
                <Image
                  src={benjaminFoto}
                  alt="Benjamin Maciel"
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-white/10" />
            </div>
            <p className="mt-3 text-center text-[11px] font-mono uppercase tracking-[0.14em] text-[#4d5866]">Benjamin Maciel</p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-6 flex flex-col items-center gap-2 text-[#4d5866] font-mono text-[10px] uppercase tracking-[0.12em]"
        style={{ writingMode: "vertical-rl" }}>
        <span>scroll</span>
        <div className="w-px h-[60px]"
          style={{ background: "linear-gradient(to bottom, #00d4ff, transparent)" }} />
      </div>
    </section>
  );
}
