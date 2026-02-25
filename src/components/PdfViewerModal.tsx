'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useI18n, type Lang } from '@/lib/i18n';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker once (CDN)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfViewerModal({ isOpen, onClose }: PdfViewerModalProps) {
  const { lang, t } = useI18n();
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  const pdfSrc = `/resume/benjamin_resume_short_${lang}.pdf`;
  const fileName = `benjamin_maciel_resume_${lang}.pdf`;

  // Reset state when language or modal changes
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
      setLoading(true);
    }
  }, [isOpen, lang]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));
  const resetZoom = () => setScale(1.0);

  if (!isOpen) return null;

  const langLabels: Record<Lang, string> = { pt: 'PT', en: 'EN', es: 'ES' };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      aria-modal="true"
      role="dialog"
      aria-label="PDF Viewer"
    >
      {/* Modal container */}
      <div className="relative flex flex-col w-full max-w-3xl max-h-[95vh] bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111]">
          <div className="flex items-center gap-3">
            {/* Traffic light dots */}
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Fechar"
              />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="font-mono text-xs text-gray-300">
              {fileName}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Zoom */}
            <div className="flex items-center gap-1 rounded border border-white/10 overflow-hidden">
              <button
                onClick={zoomOut}
                className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-mono"
                aria-label="Zoom out"
              >−</button>
              <button
                onClick={resetZoom}
                className="px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-mono min-w-[3.5rem] text-center"
                aria-label="Reset zoom"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={zoomIn}
                className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-mono"
                aria-label="Zoom in"
              >+</button>
            </div>

            {/* Download */}
            <a
              href={pdfSrc}
              download={fileName}
              className="px-3 py-1.5 text-xs font-mono font-semibold text-black bg-[#00d4ff] hover:bg-[#00d4ff]/90 rounded transition-colors"
            >
              {t.nav.downloadPdf}
            </a>

            {/* Close */}
            <button
              onClick={onClose}
              className="px-2 py-1.5 text-xs text-gray-400 hover:text-white transition-colors font-mono"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── PDF Content ── */}
        <div className="flex-1 overflow-auto flex justify-center py-6 px-4 bg-[#1a1a1a]">
          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 text-gray-400">
              <div className="w-8 h-8 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-sm">Loading PDF…</span>
              <p className="text-xs text-gray-500 text-center max-w-xs">
                Run <code className="text-[#00d4ff]">npm run generate:pdfs</code> first to create PDF exports.
              </p>
            </div>
          )}

          <Document
            file={pdfSrc}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={() => setLoading(false)}
            loading={null}
            className="flex flex-col items-center gap-4"
          >
            {!loading &&
              Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
                <Page
                  key={`page_${page}`}
                  pageNumber={page}
                  scale={scale}
                  className="shadow-lg rounded overflow-hidden"
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                />
              ))}
          </Document>
        </div>

        {/* ── Footer ── */}
        {numPages > 1 && (
          <div className="flex items-center justify-center gap-4 px-4 py-2 border-t border-white/10 bg-[#111]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-3 py-1 text-xs font-mono text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              ← Prev
            </button>
            <span className="font-mono text-xs text-gray-300">
              {currentPage} / {numPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
              disabled={currentPage >= numPages}
              className="px-3 py-1 text-xs font-mono text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
