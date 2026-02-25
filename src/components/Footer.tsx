import { personal } from "@/data";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[rgba(0,212,255,0.1)]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#hero" className="font-mono text-lg font-black">
          <span className="text-[#00d4ff]">&lt;</span>BM<span className="text-[#00d4ff]">/&gt;</span>
        </a>
        <p className="text-center text-xs text-[#4d5866] leading-relaxed">
          Desenvolvido com <span className="text-[#00d4ff]">intenção</span> por{" "}
          {personal.name} · 2025
          <br />
          <span className="text-[#4d5866]">Next.js · TypeScript · Tailwind · Framer Motion</span>
        </p>
        <a
          href="#hero"
          className="font-mono text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] px-3 py-2 rounded transition-all hover:bg-[rgba(0,212,255,0.08)]"
        >
          ↑ Início
        </a>
      </div>
    </footer>
  );
}
