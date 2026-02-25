import { personal } from "@/data";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[rgba(0,212,255,0.1)]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-6">

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/curriculo"
            className="font-mono text-xs text-[#00d4ff] border border-[rgba(0,212,255,0.2)] px-3 py-2 rounded transition-all hover:bg-[rgba(0,212,255,0.08)]"
          >
            📄 Currículo PDF
          </a>
          <a
            href="/linkedin"
            className="font-mono text-xs text-[#7c3aed] border border-[rgba(124,58,237,0.2)] px-3 py-2 rounded transition-all hover:bg-[rgba(124,58,237,0.08)]"
          >
            💼 LinkedIn Kit
          </a>
          <a
            href="/erp"
            className="font-mono text-xs text-[#00ff88] border border-[rgba(0,255,136,0.2)] px-3 py-2 rounded transition-all hover:bg-[rgba(0,255,136,0.08)]"
          >
            🛠️ Sistema ERP
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <a href="#hero" className="font-mono text-lg font-black">
            <span className="text-[#00d4ff]">&lt;</span>BM<span className="text-[#00d4ff]">/&gt;</span>
          </a>
          <p className="text-center text-xs text-[#4d5866] leading-relaxed">
            Desenvolvido com <span className="text-[#00d4ff]">intenção</span> por{" "}
            {personal.name} · 2026
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

      </div>
    </footer>
  );
}
