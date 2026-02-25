'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useI18n, type Lang } from '@/lib/i18n';

const LANG_LABELS: Record<Lang, string> = { pt: 'PT', en: 'EN', es: 'ES' };

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewerModal({ isOpen, onClose }: PdfViewerModalProps) {
  const { lang, setLang, t } = useI18n();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const resumeUrl = `/resume/short?lang=${lang}`;
  const downloadUrl = `/resume/benjamin_resume_short_${lang}.pdf`;
  const fileName = `benjamin_maciel_resume_${lang}.pdf`;

  // Reset loaded state when lang changes
  useEffect(() => {
    setIframeLoaded(false);
  }, [lang]);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) setIframeLoaded(false);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
      aria-modal="true"
      role="dialog"
      aria-label="Resume Viewer"
    >
      <div className="relative flex flex-col w-full max-w-4xl h-[95vh] bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#111] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Fechar"
              />
              <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <span className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>
            <span className="font-mono text-[11px] text-gray-400 hidden sm:block">
              curriculum.pdf — Benjamin Maciel
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex rounded border border-white/10 overflow-hidden">
              {(['pt', 'en', 'es'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase transition-all duration-150 ${
                    lang === l
                      ? 'bg-[#00d4ff] text-black'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            {/* Open in new tab */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-gray-400 border border-white/10 rounded hover:text-white hover:border-white/30 transition-colors"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Abrir
            </a>

            {/* Print / Save as PDF */}
            <button
              onClick={() => {
                const w = window.open(resumeUrl, '_blank');
                if (w) setTimeout(() => w.print(), 1200);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-semibold text-[#00d4ff] border border-[rgba(0,212,255,0.3)] rounded hover:bg-[rgba(0,212,255,0.08)] transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              <span className="hidden sm:inline">Imprimir PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {/* Download pre-generated PDF */}
            <a
              href={downloadUrl}
              download={fileName}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-semibold text-black bg-[#00d4ff] rounded hover:bg-[#00d4ff]/90 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t.nav.downloadPdf}
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-white transition-colors rounded"
              aria-label="Fechar modal"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── iframe ── */}
        <div className="relative flex-1 overflow-hidden bg-[#050a0f]">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
              <div className="w-7 h-7 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-xs text-gray-500">Carregando…</span>
            </div>
          )}
          <iframe
            key={`resume-${lang}`}
            src={resumeUrl}
            title={`Benjamin Maciel — Resume (${lang.toUpperCase()})`}
            className={`w-full h-full border-none transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* ── Footer hint ── */}
        <div className="shrink-0 px-4 py-2 border-t border-white/[0.06] bg-[#0d0d0d] flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-gray-600">
            Clique em <span className="text-[#00d4ff]">Imprimir PDF</span> → <em>Salvar como PDF</em> para exportar.
          </p>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-[10px] text-[#7c3aed] hover:text-[#a78bfa] transition-colors"
          >
            Ver página completa ↗
          </a>
        </div>
      </div>
    </div>
  );
}
