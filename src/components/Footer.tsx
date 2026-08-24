"use client";

import { personal } from "@/data";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t, lang } = useI18n();

  // One list, three columns. Adding a route means adding a line here, not
  // hunting for the four places a link used to be duplicated.
  const groups: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: t.footer.groupWork,
      links: [
        { label: t.nav.projects, href: `/${lang}/projetos` },
        { label: t.footer.erp, href: "/engineering/erp" },
        { label: t.nav.notes, href: `/${lang}/notas` },
        { label: t.footer.engineering, href: "/engineering" },
      ],
    },
    {
      title: t.footer.groupAbout,
      links: [
        { label: t.nav.about, href: `/${lang}/sobre` },
        { label: t.nav.experience, href: `/${lang}/experiencia` },
        { label: t.nav.stack, href: `/${lang}/skills` },
        { label: t.footer.principles, href: `/${lang}/como-trabalho` },
      ],
    },
    {
      title: t.footer.groupHire,
      links: [
        { label: t.footer.curriculum, href: `/${lang}/curriculo` },
        { label: t.footer.faq, href: `/${lang}/faq` },
        { label: t.footer.now, href: `/${lang}/now` },
        { label: t.footer.uses, href: `/${lang}/uses` },
        { label: t.nav.contact, href: `/${lang}/contato` },
      ],
    },
  ];

  return (
    <footer className="border-t border-[rgba(0,212,255,0.1)] py-14">
      <div className="mx-auto max-w-[1200px] px-6">
        <nav aria-label="Footer" className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#4d5866]">{g.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-[#8b949e] transition-colors hover:text-[#00d4ff]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <a href={`/${lang}`} className="font-mono text-lg font-black" aria-label={personal.name}>
            <span className="text-[#00d4ff]">&lt;</span>BM<span className="text-[#00d4ff]">/&gt;</span>
          </a>

          <p className="text-center text-xs leading-relaxed text-[#4d5866]">
            {t.footer.developed} <span className="text-[#00d4ff]">{t.footer.intention}</span> {t.footer.by}{" "}
            {personal.name} · 2026
            <br />
            <span>Next.js · TypeScript · Tailwind · Framer Motion</span>
          </p>

          <a
            href={`https://wa.me/${personal.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[rgba(0,212,255,0.2)] px-3 py-2 font-mono text-xs text-[#00d4ff] transition-all hover:bg-[rgba(0,212,255,0.08)]"
          >
            {t.contact.whatsapp} ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
