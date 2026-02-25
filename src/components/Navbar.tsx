"use client";

import { useScrollY } from "@/hooks";
import { useState, useEffect, lazy, Suspense } from "react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import dynamic from "next/dynamic";

const PdfViewerModal = dynamic(() => import("@/components/PdfViewerModal"), { ssr: false });

export default function Navbar() {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [pdfOpen, setPdfOpen] = useState(false);
  const { t } = useI18n();

  const scrolled = scrollY > 20;

  const NAV_ITEMS = [
    { label: t.nav.about,     href: "#about"     },
    { label: t.nav.formation, href: "#formation" },
    { label: t.nav.projects,  href: "#projects"  },
    { label: t.nav.knowme,    href: "#know-me"   },
    { label: t.nav.contact,   href: "#contact"   },
  ];

  // Active section detection
  useEffect(() => {
    const ids = ["about","formation","projects","know-me","contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); });
    }, { threshold: 0.35 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Open dev mode terminal via custom event
  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent("open-terminal"));
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[72px] transition-all duration-300 ${
          scrolled ? "bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-[rgba(0,212,255,0.12)]" : ""
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 gap-8">
          {/* Brand */}
          <a href="#hero" className="font-mono text-xl font-black text-white whitespace-nowrap">
            <span className="text-[#00d4ff]">&lt;</span>
            BM
            <span className="text-[#00d4ff]">/&gt;</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-xs font-medium uppercase tracking-[0.06em] transition-colors duration-200 relative group ${
                    active === item.href ? "text-[#00d4ff]" : "text-[#8b949e] hover:text-[#00d4ff]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#00d4ff] transition-all duration-300 ${
                      active === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Resume PDF button */}
            <button
              onClick={() => setPdfOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-[rgba(124,58,237,0.4)] rounded-lg font-mono text-xs font-semibold text-[#7c3aed] transition-all duration-200 hover:bg-[rgba(124,58,237,0.12)] hover:border-[#7c3aed]"
            >
              <span>📄</span>
              <span>{t.nav.resumeBtn}</span>
            </button>

            {/* Dev Mode terminal */}
            <button
              onClick={openTerminal}
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[rgba(0,212,255,0.2)] rounded-lg font-mono text-xs font-semibold text-[#00d4ff] transition-all duration-200 hover:bg-[rgba(0,212,255,0.1)] hover:border-[#00d4ff]"
            >
              <span>&gt;_</span>
              <span>{t.nav.devMode}</span>
            </button>

            {/* Mobile burger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span className={`block w-[22px] h-[2px] bg-[#8b949e] rounded transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block w-[22px] h-[2px] bg-[#8b949e] rounded transition-all ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-[22px] h-[2px] bg-[#8b949e] rounded transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-mono text-xl font-semibold uppercase tracking-widest text-[#8b949e] hover:text-[#00d4ff] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-3 mt-2">
            <LanguageSwitcher />
          </div>
          <button
            onClick={() => { setOpen(false); setPdfOpen(true); }}
            className="px-6 py-3 border border-[rgba(124,58,237,0.4)] rounded-lg font-mono text-sm text-[#7c3aed]"
          >
            📄 {t.nav.resumeBtn}
          </button>
          <button
            onClick={() => { setOpen(false); openTerminal(); }}
            className="px-6 py-3 border border-[rgba(0,212,255,0.3)] rounded-lg font-mono text-sm text-[#00d4ff]"
          >
            &gt;_ {t.nav.devMode}
          </button>
        </div>
      )}

      {/* PDF Viewer Modal */}
      <PdfViewerModal isOpen={pdfOpen} onClose={() => setPdfOpen(false)} />
    </>
  );
}
