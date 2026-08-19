/**
 * generate-og.js
 * ─────────────────────────────────────────────────────────────
 * Renders the static raster assets the metadata already references but that
 * were never committed: the Open Graph card and the PWA/Apple icons.
 *
 * Why this mattered: layout.tsx, [lang]/layout.tsx and the JSON-LD block all
 * point at /og-image.png, and manifest.json points at /icon-{192,512}.png.
 * None of those files existed, so every link preview resolved to a 404 and
 * the manifest failed to install.
 *
 * Usage:  npm run generate:og
 * Output: public/og-image.png, public/icon-192.png,
 *         public/icon-512.png, public/apple-icon.png
 *
 * Re-run after changing the name, role or stack below.
 * ─────────────────────────────────────────────────────────────
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, '..', 'public');

const NAME = 'Benjamin Maciel';
const ROLE = 'Front-End Developer';
const STACK = 'React.js · TypeScript · Next.js · Node.js';
const PROOF = 'ERP interno em produção · 3 CNPJs · São Paulo, BR';

const BG = '#0a0a0a';
const ACCENT = '#00d4ff';
const SANS = "'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";
const MONO = "'Cascadia Code', 'Consolas', 'SF Mono', 'Menlo', monospace";

const ogHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: ${BG}; color: #f0f6fc;
    font-family: ${SANS}; overflow: hidden; position: relative;
  }
  /* same cyan glow the hero uses, so the card reads as the site */
  .glow {
    position: absolute; width: 700px; height: 700px; border-radius: 50%;
    right: -220px; top: -260px; pointer-events: none;
    background: radial-gradient(circle, rgba(0,212,255,0.13) 0%, transparent 70%);
  }
  .grid {
    position: absolute; inset: 0; opacity: 0.35;
    background-image:
      linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  .inner { position: relative; padding: 76px 80px; height: 100%; display: flex; flex-direction: column; }
  .prompt { font-family: ${MONO}; font-size: 21px; color: ${ACCENT}; letter-spacing: 0.14em; text-transform: uppercase; }
  .name {
    font-size: 104px; font-weight: 900; letter-spacing: -0.045em;
    line-height: 0.94; margin-top: 26px; color: #fff;
  }
  .role { font-size: 42px; font-weight: 700; letter-spacing: -0.02em; margin-top: 20px; color: ${ACCENT}; }
  .stack { font-family: ${MONO}; font-size: 26px; color: #8b949e; margin-top: 26px; letter-spacing: 0.01em; }
  .spacer { flex: 1; }
  .footer {
    display: flex; align-items: center; gap: 18px;
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 26px;
  }
  .dot { width: 11px; height: 11px; border-radius: 50%; background: #00ff88; }
  .proof { font-family: ${MONO}; font-size: 22px; color: #4d5866; }
  .mark {
    margin-left: auto; font-family: ${MONO}; font-size: 26px; font-weight: 700;
    color: ${ACCENT}; border: 2px solid rgba(0,212,255,0.35);
    border-radius: 10px; padding: 8px 14px;
  }
</style></head><body>
  <div class="glow"></div><div class="grid"></div>
  <div class="inner">
    <div class="prompt">~$ whoami</div>
    <div class="name">${NAME}</div>
    <div class="role">${ROLE}</div>
    <div class="stack">${STACK}</div>
    <div class="spacer"></div>
    <div class="footer">
      <div class="dot"></div>
      <div class="proof">${PROOF}</div>
      <div class="mark">&lt;BM/&gt;</div>
    </div>
  </div>
</body></html>`;

const iconHtml = (size) => `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${size}px; height: ${size}px; background: ${BG};
    display: flex; align-items: center; justify-content: center;
    font-family: ${MONO}; overflow: hidden;
  }
  .mark {
    color: ${ACCENT}; font-weight: 700; letter-spacing: -0.03em;
    font-size: ${Math.round(size * 0.34)}px;
    border: ${Math.max(2, Math.round(size * 0.022))}px solid rgba(0,212,255,0.4);
    border-radius: ${Math.round(size * 0.19)}px;
    padding: ${Math.round(size * 0.1)}px ${Math.round(size * 0.09)}px;
    line-height: 1;
  }
</style></head><body><div class="mark">BM</div></body></html>`;

const TARGETS = [
  { file: 'og-image.png', width: 1200, height: 630, html: ogHtml },
  { file: 'icon-192.png', width: 192, height: 192, html: iconHtml(192) },
  { file: 'icon-512.png', width: 512, height: 512, html: iconHtml(512) },
  { file: 'apple-icon.png', width: 180, height: 180, html: iconHtml(180) },
];

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    for (const t of TARGETS) {
      const page = await browser.newPage();
      await page.setViewport({ width: t.width, height: t.height, deviceScaleFactor: 1 });
      await page.setContent(t.html, { waitUntil: 'load' });
      const out = path.join(OUTPUT_DIR, t.file);
      await page.screenshot({ path: out, type: 'png' });
      await page.close();
      console.log(`  ✓ ${t.file}  ${t.width}x${t.height}  (${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
    }
  } finally {
    await browser.close();
  }
  console.log('\nDone — assets written to public/');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
