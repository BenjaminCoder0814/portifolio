'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import pt from '@/i18n/pt.json';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';
import type { Lang } from '@/lib/i18n';

const dicts = { pt, en, es };

function ResumeContent() {
  const params = useSearchParams();
  const lang = (params.get('lang') as Lang) || 'pt';
  const d = (dicts[lang] ?? dicts.pt).resume.short;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          font-family: 'Inter', sans-serif;
          background: #050a0f;
          color: #e2e8f0;
          font-size: 12px;
          line-height: 1.55;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: #050a0f;
          padding: 18mm 18mm 14mm 18mm;
        }

        h1 { font-size: 1.85rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; }
        h2 { font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 0.6rem; padding-bottom: 0.35rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
        h3 { font-size: 0.82rem; font-weight: 600; }

        .cyan   { color: #00d4ff; }
        .purple { color: #7c3aed; }
        .green  { color: #00ff88; }
        .muted  { color: #64748b; }
        .light  { color: #94a3b8; }

        .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 1.1rem 0; }

        .badge {
          display: inline-block;
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
          font-size: 0.65rem;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          border: 1px solid;
        }
        .badge-cyan   { color: #00d4ff; border-color: rgba(0,212,255,0.3); background: rgba(0,212,255,0.06); }
        .badge-purple { color: #7c3aed; border-color: rgba(124,58,237,0.35); background: rgba(124,58,237,0.07); }

        ul.bullets { list-style: none; padding: 0; }
        ul.bullets li { padding-left: 1rem; position: relative; margin-bottom: 0.22rem; color: #c8d4e0; }
        ul.bullets li::before { content: '▶'; position: absolute; left: 0; font-size: 0.5rem; top: 0.32rem; color: #00d4ff; }

        .section { margin-bottom: 1.3rem; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; }
        .three-col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

        .xp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.3rem; }

        .skill-group { margin-bottom: 0.5rem; }
        .skill-label { font-size: 0.6rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em; color: #475569; margin-bottom: 0.2rem; }
        .skill-value { color: #94a3b8; font-size: 0.72rem; }

        .contact-row { display: flex; gap: 1.6rem; flex-wrap: wrap; margin-top: 0.5rem; }
        .contact-row a, .contact-row span { font-size: 0.72rem; color: #64748b; text-decoration: none; font-family: 'JetBrains Mono', monospace; }
        .contact-row a { color: #00d4ff; }

        @media screen {
          body { display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 2rem; }
        }

        @media print {
          html, body { background: #050a0f !important; }
          .page { margin: 0; padding: 15mm 17mm 12mm 17mm; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <div className="page">
        {/* ── Header ── */}
        <header style={{ marginBottom: '1.2rem' }}>
          <h1>
            <span className="cyan">Benjamin</span>{' '}
            <span style={{ color: '#f8fafc' }}>Maciel</span>
          </h1>
          <p style={{ color: '#7c3aed', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', marginTop: '0.3rem', letterSpacing: '0.04em' }}>
            {d.title}
          </p>
          <div className="contact-row">
            <a href="mailto:benzinndev@gmail.com">benzinndev@gmail.com</a>
            <a href="https://github.com/BenjaminCoder0814">github.com/BenjaminCoder0814</a>
            <a href="https://linkedin.com/in/benjamin-maciel">linkedin.com/in/benjamin-maciel</a>
            <span>Engenheiro Coelho – SP</span>
          </div>
        </header>

        <hr className="divider" />

        {/* ── Summary ── */}
        <section className="section">
          <h2 className="cyan">
            {lang === 'pt' ? 'Resumo' : lang === 'en' ? 'Summary' : 'Resumen'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.6 }}>{d.summary}</p>
        </section>

        <div className="two-col">
          {/* ── Skills ── */}
          <section className="section">
            <h2 className="cyan">
              {lang === 'pt' ? 'Competências' : lang === 'en' ? 'Skills' : 'Competencias'}
            </h2>
            <div className="skill-group">
              <div className="skill-label">Front-End</div>
              <div className="skill-value">{d.skills.frontend}</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">Design</div>
              <div className="skill-value">{d.skills.design}</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">Tools</div>
              <div className="skill-value">{d.skills.tools}</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">Back-End</div>
              <div className="skill-value">{d.skills.backend}</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">Marketing</div>
              <div className="skill-value">{d.skills.marketing}</div>
            </div>
          </section>

          {/* ── Education + Languages ── */}
          <div>
            <section className="section">
              <h2 className="purple">
                {lang === 'pt' ? 'Formação' : lang === 'en' ? 'Education' : 'Formación'}
              </h2>
              {d.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '0.55rem' }}>
                  <h3 style={{ color: '#e2e8f0' }}>{edu.degree}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b', fontSize: '0.7rem' }}>{edu.school}</span>
                    <span style={{ color: '#7c3aed', fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace" }}>{edu.period}</span>
                  </div>
                </div>
              ))}
            </section>

            <section className="section">
              <h2 className="green">
                {lang === 'pt' ? 'Idiomas' : lang === 'en' ? 'Languages' : 'Idiomas'}
              </h2>
              {d.languages.map((l, i) => (
                <div key={i} style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#00ff88', fontFamily: "'JetBrains Mono', monospace', fontSize: '0.6rem'" }}>▶ </span>
                  {l}
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* ── Experience ── */}
        <section className="section">
          <h2 className="purple">
            {lang === 'pt' ? 'Experiência' : lang === 'en' ? 'Experience' : 'Experiencia'}
          </h2>
          {d.experience.map((xp, i) => (
            <div key={i}>
              <div className="xp-header">
                <div>
                  <h3 style={{ color: '#f8fafc' }}>{xp.role}</h3>
                  <span style={{ color: '#00d4ff', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' }}>
                    {xp.company}
                  </span>
                </div>
                <span className="badge badge-purple">{xp.period}</span>
              </div>
              <ul className="bullets" style={{ marginTop: '0.4rem' }}>
                {xp.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* ── Objective ── */}
        <hr className="divider" />
        <section>
          <p style={{ fontSize: '0.72rem', color: '#475569', fontFamily: "'JetBrains Mono', monospace", textAlign: 'center', letterSpacing: '0.02em' }}>
            <span className="cyan">▶</span> {d.objective}
          </p>
        </section>
      </div>
    </>
  );
}

export default function ResumeShortPage() {
  return (
    <Suspense fallback={<div style={{ background: '#050a0f', color: '#00d4ff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>Loading resume…</div>}>
      <ResumeContent />
    </Suspense>
  );
}
