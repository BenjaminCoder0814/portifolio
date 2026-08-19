"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resume, contact, type Lang } from "./data";

/* ── screen section helper ───────────────────────────────────────────────── */

function Section({
  label, accent, children, noMargin,
}: { label: string; accent: string; children: React.ReactNode; noMargin?: boolean }) {
  return (
    <div className={noMargin ? "" : "mt-8"}>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="shrink-0 text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: accent }}>
          {label}
        </h2>
        <div className="h-px flex-1" style={{ background: `${accent}25` }} />
      </div>
      {children}
    </div>
  );
}

function PdfSection({
  title, accent, children, noMargin,
}: { title: string; accent: "cyan" | "purple" | "green"; children: React.ReactNode; noMargin?: boolean }) {
  return (
    <div className={noMargin ? "pdf-section-nm" : "pdf-section"}>
      <div className="pdf-sec-head">
        <span className={`pdf-sec-title pdf-${accent}`}>{title}</span>
        <span className={`pdf-sec-line pdf-${accent}-line`} />
      </div>
      {children}
    </div>
  );
}

/* ── page ────────────────────────────────────────────────────────────────── */

export default function Curriculo() {
  const params = useParams();
  const routeLang = Array.isArray(params?.lang) ? params.lang[0] : params?.lang;
  const initial: Lang = routeLang === "en" || routeLang === "es" || routeLang === "pt" ? routeLang : "pt";

  const [lang, setLang] = useState<Lang>(initial);
  const c = resume[lang];

  // When this page is embedded (the resume modal loads it in an iframe) the
  // host already provides language switching, print and download. Rendering
  // our own bar on top of it stacks two sets of identical controls.
  // `null` = not yet determined; the bar only mounts once we know we're top-level,
  // so the embedded view never flashes a duplicate.
  const [embedded, setEmbedded] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      setEmbedded(window.self !== window.top);
    } catch {
      setEmbedded(true); // cross-origin access throws — we are framed
    }
  }, []);

  useEffect(() => setLang(initial), [initial]);
  useEffect(() => {
    document.title =
      lang === "en" ? "Resume — Benjamin Maciel"
      : lang === "es" ? "Currículum — Benjamin Maciel"
      : "Currículo — Benjamin Maciel";
  }, [lang]);

  return (
    <>
      {/* ── controls (top-level only — see `embedded` above) ──── */}
      {embedded === false && (
      <div className="no-print fixed right-4 top-4 z-50 flex items-center gap-2">
        <div className="flex overflow-hidden rounded-lg border border-white/20 font-mono text-xs font-bold">
          {(["pt", "en", "es"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-2 uppercase transition-all ${
                lang === l ? "bg-[#00d4ff] text-black" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <a href="/" className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 font-mono text-xs text-white transition-all hover:bg-white/20">
          {c.backPortfolio}
        </a>
        <button
          onClick={() => window.print()}
          className="rounded-lg bg-[#00d4ff] px-4 py-2 font-mono text-xs font-black text-black transition-all hover:opacity-90"
        >
          {c.exportPdf}
        </button>
      </div>
      )}

      {/* ══════════════════════════ SCREEN ══════════════════════════ */}
      <div
        className={`screen-view min-h-screen bg-[#0d0d0d] px-4 text-white ${
          embedded ? "py-8" : "py-20"
        }`}
      >
        <div className="mx-auto max-w-[860px]">
          <header className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-[#050505] shadow-lg">
                  <Image src="/benjamin-print.jpg" alt="Benjamin Maciel" className="object-cover" fill sizes="96px" />
                </div>
                <div>
                  <h1 className="text-5xl font-black uppercase leading-none tracking-tight">
                    Benjamin<br /><span className="text-[#00d4ff]">Maciel</span>
                  </h1>
                  <p className="mt-3 text-sm font-semibold text-[#8b949e]">{c.title}</p>
                  <p className="mt-1 text-xs text-[#525960]">{c.location}</p>
                </div>
              </div>
              <div className="space-y-1 text-right font-mono text-xs text-[#8b949e]">
                <p><a href={contact.phoneHref} className="text-sm font-bold text-white hover:underline">{contact.phone}</a></p>
                <p><a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a></p>
                <p><a href={contact.linkedinHref} target="_blank" rel="noopener noreferrer" className="hover:underline">{contact.linkedin}</a></p>
                <p><a href={contact.githubHref} target="_blank" rel="noopener noreferrer" className="hover:underline">{contact.github}</a></p>
                <p><a href={contact.siteHref} target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">{contact.site}</a></p>
              </div>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-transparent" />

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {c.highlights.map((h) => (
                <div key={h.l} className="rounded-lg border border-[#00d4ff]/15 bg-[#00d4ff]/[0.04] px-3 py-3 text-center">
                  <span className="block text-2xl font-black leading-none text-[#00d4ff]">{h.v}</span>
                  <span className="mt-[6px] block text-[10px] uppercase leading-tight tracking-[0.08em] text-[#8b949e]">{h.l}</span>
                </div>
              ))}
            </div>
          </header>

          <Section label={c.sSummary} accent="#00d4ff">
            <p className="text-sm leading-relaxed text-[#c9d1d9]">{c.summary}</p>
          </Section>

          <Section label={c.sAchievements} accent="#00ff88">
            <ul className="space-y-2">
              {c.achievements.map((a, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-[#c9d1d9]">
                  <span className="mt-px shrink-0 font-bold text-[#00ff88]">▪</span>{a}
                </li>
              ))}
            </ul>
          </Section>

          <Section label={c.sSkills} accent="#7c3aed">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {c.skills.map((s) => (
                <div key={s.cat} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#00d4ff]">{s.cat}</p>
                  <p className="text-xs leading-relaxed text-[#8b949e]">{s.items}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section label={c.sExperience} accent="#00d4ff">
            {c.exp.map((e) => (
              <div key={e.company} className="border-l-2 border-[#00d4ff]/30 pl-4">
                <p className="text-sm font-black text-white">{e.company}</p>
                <p className="mb-4 text-xs text-[#525960]">{e.sub}</p>
                {e.roles.map((r) => (
                  <div key={r.role} className="mb-6 last:mb-0">
                    <div className="mb-[2px] flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-bold text-[#00d4ff]">{r.role}</span>
                      <span className="font-mono text-xs text-[#525960]">{r.period}</span>
                    </div>
                    {"tagline" in r && r.tagline && (
                      <p className="mb-1 text-[11px] font-semibold text-[#8b949e]">{r.tagline}</p>
                    )}
                    {"note" in r && r.note && <p className="mb-2 font-mono text-[10px] text-[#525960]">{r.note}</p>}
                    <ul className="space-y-[7px]">
                      {r.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed text-[#c9d1d9]">
                          <span className="mt-px shrink-0 font-bold text-[#00d4ff]">›</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </Section>

          <Section label={c.sProjects} accent="#7c3aed">
            <div className="grid grid-cols-1 gap-4">
              {c.projects.map((p) => (
                <div key={p.name} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{p.name}</h3>
                    <span className="font-mono text-xs text-[#525960]">{p.year}</span>
                  </div>
                  <p className="mb-3 font-mono text-[10px] tracking-wide text-[#7c3aed]">{p.stack}</p>
                  <ul className="space-y-[6px]">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-[#8b949e]">
                        <span className="shrink-0 font-bold text-[#7c3aed]">–</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Section label={c.sEducation} accent="#00ff88" noMargin>
              {c.education.map((e) => (
                <div key={e.degree} className="mb-5 last:mb-0">
                  <p className="text-sm font-bold text-white">{e.degree}</p>
                  <p className="mt-[2px] text-xs text-[#8b949e]">{e.school}</p>
                  <p className="mt-1 font-mono text-[10px] text-[#525960]">{e.period}</p>
                </div>
              ))}
            </Section>
            <Section label={c.sLanguages} accent="#00ff88" noMargin>
              {c.languages.map((l) => (
                <div key={l.lang} className="mb-3 flex items-baseline justify-between last:mb-0">
                  <span className="text-sm font-semibold text-white">{l.lang}</span>
                  <span className="text-xs text-[#8b949e]">{l.level}</span>
                </div>
              ))}
            </Section>
          </div>

          <div className="h-20" />
        </div>
      </div>

      {/* ══════════════════════════ PDF ══════════════════════════ */}
      <div className="pdf-view">
        <div className="pdf-page">
          <div className="pdf-header">
            <div className="pdf-header-left">
              <p className="pdf-name">Benjamin Maciel</p>
              <p className="pdf-role">{c.title}</p>
              <p className="pdf-loc">{c.location}</p>
            </div>
            <div className="pdf-header-photo">
              {/*
                Print-only copy of the photo: 260px JPEG (13 KB) instead of the
                2 MB source PNG. The source is embedded byte-for-byte in the
                generated PDF, which pushed each file to 3.4 MB — a size some
                mail gateways reject and every recruiter waits for.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/benjamin-print.jpg" alt="Benjamin Maciel" />
            </div>
            <div className="pdf-header-right">
              <p className="pdf-phone">{contact.phone}</p>
              <p>{contact.email}</p>
              <p>{contact.linkedin}</p>
              <p>{contact.github}</p>
              <p>{contact.site}</p>
            </div>
          </div>

          <div className="pdf-highlights">
            {c.highlights.map((h) => (
              <div key={h.l} className="pdf-hl">
                <span className="pdf-hl-v">{h.v}</span>
                <span className="pdf-hl-l">{h.l}</span>
              </div>
            ))}
          </div>

          <div className="pdf-body-wrap">
            <PdfSection title={c.sSummary} accent="cyan">
              <p className="pdf-text">{c.summary}</p>
            </PdfSection>

            <PdfSection title={c.sAchievements} accent="green">
              <ul className="pdf-list">
                {c.achievements.map((a, i) => <li key={i}><span className="pdf-mark-green">▪</span>{a}</li>)}
              </ul>
            </PdfSection>

            <PdfSection title={c.sSkills} accent="purple">
              <div className="pdf-skills">
                {c.skills.map((s) => (
                  <div key={s.cat} className="pdf-skill-card">
                    <p className="pdf-skill-cat">{s.cat}</p>
                    <p className="pdf-skill-val">{s.items}</p>
                  </div>
                ))}
              </div>
            </PdfSection>

            <PdfSection title={c.sExperience} accent="cyan">
              {c.exp.map((e) => (
                <div key={e.company} className="pdf-exp">
                  <p className="pdf-exp-co">{e.company}</p>
                  <p className="pdf-exp-sub">{e.sub}</p>
                  {e.roles.map((r) => (
                    <div key={r.role} className="pdf-role-block">
                      <div className="pdf-exp-row">
                        <span className="pdf-exp-role">{r.role}</span>
                        <span className="pdf-exp-period">{r.period}</span>
                      </div>
                      {"tagline" in r && r.tagline && <p className="pdf-exp-tag">{r.tagline}</p>}
                      {"note" in r && r.note && <p className="pdf-exp-note">{r.note}</p>}
                      <ul className="pdf-list">
                        {r.bullets.map((b, i) => <li key={i}><span className="pdf-mark-cyan">›</span>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </PdfSection>

            <PdfSection title={c.sProjects} accent="purple">
              {c.projects.map((p) => (
                <div key={p.name} className="pdf-proj">
                  <div className="pdf-proj-row">
                    <span className="pdf-proj-name">{p.name}</span>
                    <span className="pdf-proj-year">{p.year}</span>
                  </div>
                  <p className="pdf-proj-stack">{p.stack}</p>
                  <ul className="pdf-list">
                    {p.bullets.map((b, i) => <li key={i}><span className="pdf-mark-purple">–</span>{b}</li>)}
                  </ul>
                </div>
              ))}
            </PdfSection>

            <div className="pdf-two-col">
              <PdfSection title={c.sEducation} accent="green" noMargin>
                {c.education.map((e) => (
                  <div key={e.degree} className="pdf-edu">
                    <p className="pdf-edu-deg">{e.degree}</p>
                    <p className="pdf-edu-sch">{e.school}</p>
                    <p className="pdf-edu-per">{e.period}</p>
                  </div>
                ))}
              </PdfSection>
              <PdfSection title={c.sLanguages} accent="green" noMargin>
                {c.languages.map((l) => (
                  <div key={l.lang} className="pdf-lang-row">
                    <span className="pdf-lang-n">{l.lang}</span>
                    <span className="pdf-lang-l">{l.level}</span>
                  </div>
                ))}
              </PdfSection>
            </div>
          </div>
        </div>
      </div>

      {/* dangerouslySetInnerHTML, not <style>{`...`}</style>: as children, React
          escapes the CSS's single quotes to &#x27; on the server, and a <style>
          element is raw text — the parser never decodes entities. That shipped
          `font-family: &#x27;Segoe UI&#x27;` (invalid CSS) and made the server
          markup differ from the client's by exactly those 20 characters, which
          is the hydration mismatch React reported on this page. */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pdf-view { display: none; }

        @media print {
          .screen-view { display: none !important; }
          .no-print    { display: none !important; }
          .pdf-view    { display: block !important; }

          @page { size: A4; margin: 0; }

          body {
            background: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .pdf-page {
            background: #0f172a; color: #e2e8f0;
            font-family: 'Segoe UI', system-ui, Arial, sans-serif;
            font-size: 8.2pt; width: 210mm; min-height: 297mm; padding-bottom: 12pt;
          }

          .pdf-header {
            background: #020617; border-bottom: 3px solid #00d4ff;
            padding: 16pt 22pt 14pt; display: flex; justify-content: space-between;
            align-items: center; gap: 16pt;
          }
          .pdf-header-left { flex: 1; }
          .pdf-name { font-size: 26pt; font-weight: 900; text-transform: uppercase;
            letter-spacing: -0.5pt; color: #f1f5f9; margin: 0; line-height: 1; }
          .pdf-role { font-size: 7.6pt; color: #00d4ff; font-weight: 700;
            letter-spacing: 0.5pt; margin: 5pt 0 3pt; }
          .pdf-loc { font-size: 6.8pt; color: #64748b; margin: 0; }
          .pdf-header-right { font-size: 6.8pt; color: #64748b; text-align: right;
            line-height: 1.75; font-family: 'Courier New', monospace; }
          .pdf-header-right p { margin: 0; }
          .pdf-phone { color: #f1f5f9 !important; font-weight: 700; font-size: 8.5pt; letter-spacing: 0.3pt; }
          .pdf-header-photo { width: 64pt; height: 64pt; border-radius: 10pt; overflow: hidden;
            border: 1pt solid rgba(255,255,255,0.12); flex-shrink: 0; }
          .pdf-header-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }

          .pdf-highlights { display: flex; background: rgba(0,212,255,0.05);
            border-bottom: 0.5pt solid rgba(0,212,255,0.18); padding: 6pt 22pt; }
          .pdf-hl { flex: 1; text-align: center; border-right: 0.5pt solid rgba(255,255,255,0.07); }
          .pdf-hl:last-child { border-right: none; }
          .pdf-hl-v { display: block; font-size: 10.5pt; font-weight: 900; color: #00d4ff; line-height: 1.1; }
          .pdf-hl-l { display: block; font-size: 5.6pt; text-transform: uppercase;
            letter-spacing: 0.5pt; color: #94a3b8; margin-top: 1pt; }

          .pdf-body-wrap { padding: 5pt 22pt 18pt; }
          .pdf-section { margin-top: 11pt; }
          .pdf-section-nm { margin-top: 0; }
          .pdf-sec-head { display: flex; align-items: center; gap: 6pt; margin-bottom: 5pt; }
          .pdf-sec-title { font-size: 6.4pt; font-weight: 900; text-transform: uppercase;
            letter-spacing: 1.4pt; white-space: nowrap; }
          .pdf-sec-line { flex: 1; height: 0.5pt; }
          .pdf-cyan { color: #00d4ff; } .pdf-purple { color: #a78bfa; } .pdf-green { color: #34d399; }
          .pdf-cyan-line { background: rgba(0,212,255,0.2); }
          .pdf-purple-line { background: rgba(167,139,250,0.2); }
          .pdf-green-line { background: rgba(52,211,153,0.2); }

          .pdf-text { color: #cbd5e1; line-height: 1.55; margin: 0; }

          .pdf-skills { display: grid; grid-template-columns: repeat(2,1fr); gap: 5pt; }
          .pdf-skill-card { background: rgba(255,255,255,0.04);
            border: 0.5pt solid rgba(255,255,255,0.08); border-radius: 3pt; padding: 5pt 6pt; }
          .pdf-skill-cat { font-size: 5.8pt; font-weight: 800; text-transform: uppercase;
            letter-spacing: 0.7pt; color: #00d4ff; margin: 0 0 2pt; }
          .pdf-skill-val { font-size: 7pt; color: #94a3b8; margin: 0; line-height: 1.35; }

          .pdf-exp { border-left: 2pt solid rgba(0,212,255,0.35); padding-left: 8pt; }
          .pdf-exp-co { font-weight: 800; color: #f1f5f9; font-size: 9pt; margin: 0; }
          .pdf-exp-sub { font-size: 6.4pt; color: #64748b; margin: 1pt 0 5pt; }
          .pdf-role-block { margin-bottom: 7pt; }
          .pdf-role-block:last-child { margin-bottom: 0; }
          .pdf-exp-row { display: flex; align-items: baseline; gap: 4pt; margin-bottom: 1pt; }
          .pdf-exp-role { font-weight: 700; color: #00d4ff; font-size: 8.4pt; }
          .pdf-exp-period { margin-left: auto; font-size: 6.4pt; color: #64748b; font-family: monospace; }
          .pdf-exp-tag { font-size: 6.6pt; color: #94a3b8; font-weight: 600; margin: 0 0 1pt; }
          .pdf-exp-note { font-size: 6.2pt; color: #64748b; font-style: italic; margin: 0 0 3pt; }

          .pdf-proj { border: 0.5pt solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.025);
            border-radius: 3pt; padding: 5pt 7pt; margin-bottom: 5pt; }
          .pdf-proj:last-child { margin-bottom: 0; }
          .pdf-proj-row { display: flex; justify-content: space-between; align-items: baseline; }
          .pdf-proj-name { font-weight: 700; color: #e2e8f0; font-size: 8.4pt; }
          .pdf-proj-year { font-size: 6.2pt; color: #64748b; font-family: monospace; }
          .pdf-proj-stack { font-size: 6.2pt; color: #a78bfa; font-family: monospace; margin: 0 0 3pt; }

          .pdf-list { margin: 0; padding: 0; list-style: none; }
          .pdf-list li { display: flex; gap: 4pt; color: #cbd5e1; margin-bottom: 2.5pt;
            line-height: 1.45; font-size: 7.6pt; }
          .pdf-list li:last-child { margin-bottom: 0; }
          .pdf-mark-cyan { color: #00d4ff; font-weight: 800; flex-shrink: 0; }
          .pdf-mark-purple { color: #a78bfa; font-weight: 800; flex-shrink: 0; }
          .pdf-mark-green { color: #34d399; font-weight: 800; flex-shrink: 0; }

          .pdf-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18pt;
            margin-top: 11pt; padding-bottom: 14pt; }
          .pdf-edu { margin-bottom: 5pt; }
          .pdf-edu-deg { font-weight: 700; color: #e2e8f0; margin: 0; font-size: 8pt; }
          .pdf-edu-sch { color: #94a3b8; font-size: 7pt; margin: 1pt 0; }
          .pdf-edu-per { color: #64748b; font-size: 6.2pt; font-family: monospace; margin: 0; }
          .pdf-lang-row { display: flex; justify-content: space-between; margin-bottom: 3pt; }
          .pdf-lang-n { font-weight: 600; color: #e2e8f0; font-size: 8pt; }
          .pdf-lang-l { color: #94a3b8; font-size: 7pt; }
        }
      ` }} />
    </>
  );
}
