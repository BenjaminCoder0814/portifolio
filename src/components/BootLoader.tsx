"use client";

import { useEffect, useRef, useState } from "react";

interface BootLine {
  text: string;
  type: "bold" | "accent" | "success" | "default" | "";
}

const BOOT_LINES: BootLine[] = [
  { text: "PORTFOLIO_OS v2.5 — BENJAMIN MACIEL", type: "bold" },
  { text: "─────────────────────────────────────────", type: "accent" },
  { text: "[ OK ] Initializing BENJAMIN_MACIEL.EXE", type: "success" },
  { text: "[ OK ] Loading identity module...", type: "success" },
  { text: "[ OK ] Mounting skill database...", type: "success" },
  { text: "[ OK ] Connecting project registry...", type: "success" },
  { text: "[ OK ] Establishing portfolio interface...", type: "success" },
  { text: "[ OK ] Compiling UI components...", type: "success" },
  { text: "[ OK ] Running integrity check... PASSED", type: "success" },
  { text: "", type: "" },
  { text: "──── SYSTEM READY ────", type: "accent" },
  { text: "Welcome. The architect is online.", type: "bold" },
];

export default function BootLoader() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hidden, setHidden] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  // Code rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "アイウエオABCDEFGHIJ0123456789{}[]const function return if".split("");
    const fs    = 13;
    const cols  = Math.floor(canvas.width / fs);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fs}px JetBrains Mono, monospace`;
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x  = i * fs;
        ctx.fillStyle = "rgba(0,212,255,0.7)";
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur  = 6;
        ctx.fillText(ch, x, y * fs);
        ctx.shadowBlur = 0;
        if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      });
    };

    const loop = () => { draw(); animRef.current = requestAnimationFrame(loop); };
    loop();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Show lines progressively
  useEffect(() => {
    const delays = [0, 300, 600, 900, 1100, 1300, 1550, 1750, 2000, 2200, 2350, 2550];
    const timers = delays.map((d, i) =>
      setTimeout(() => setVisibleCount((n) => Math.max(n, i + 1)), d)
    );
    const dismiss = setTimeout(() => setHidden(true), 3500);
    return () => { timers.forEach(clearTimeout); clearTimeout(dismiss); };
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[8000] bg-black flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-25" />
      <div className="relative z-10 font-mono max-w-xl w-[90%]">
        <div className="text-5xl font-black text-[#00d4ff] mb-8" style={{ textShadow: "0 0 30px rgba(0,212,255,0.5)" }}>
          &gt;_
        </div>
        <div className="min-h-[200px] flex flex-col gap-1">
          {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
            <div
              key={i}
              className={`text-xs transition-all duration-300 ${
                line.type === "bold"    ? "text-white font-bold text-base"        :
                line.type === "accent" ? "text-[#00d4ff]"                         :
                line.type === "success"? "text-[#00ff88]"                         :
                "text-[#8b949e]"
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
        <span className="inline-block w-[10px] h-[18px] bg-[#00d4ff] align-middle animate-blink ml-1"
          style={{ boxShadow: "0 0 8px #00d4ff" }} />
      </div>
    </div>
  );
}
