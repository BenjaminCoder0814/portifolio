import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Página não encontrada",
  robots: { index: false, follow: true },
};

/**
 * Root 404. Lives outside the [lang] segment, so it has no i18n context —
 * the copy is kept short and shown in PT/EN rather than pulled from the
 * dictionaries.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#0a0a0a]">
      <div className="w-full max-w-[620px]">
        <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0d1117] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-[#4d5866]">bash — 404</span>
          </div>

          <div className="p-8 font-mono text-sm leading-7">
            <p className="text-[#8b949e]">
              <span className="text-[#00d4ff]">~$ </span>cat página-solicitada
            </p>
            <p className="text-[#ff5f57] mt-2">
              cat: no such file or directory
            </p>
            <p className="text-[#4d5866] mt-6">
              # Essa página não existe (ou mudou de endereço).
            </p>
            <p className="text-[#4d5866]">
              # This page does not exist (or moved).
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00d4ff] text-[#0a0a0a] font-bold text-sm transition-all hover:shadow-[0_8px_30px_rgba(0,212,255,0.3)] hover:-translate-y-[2px]"
          >
            ← Voltar ao início
          </Link>
          <Link
            href="/curriculo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] text-[#c9d1d9] font-mono text-sm transition-all hover:border-[rgba(0,212,255,0.35)] hover:text-white"
          >
            Currículo
          </Link>
        </div>
      </div>
    </main>
  );
}
