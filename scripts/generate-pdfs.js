/**
 * generate-pdfs.js
 * ─────────────────────────────────────────────────────────────
 * Generates trilingual PDF resumes from the /resume/short page.
 *
 * Usage:
 *   1. Start the dev/prod server:  npm run dev  OR  npm run start
 *   2. In another terminal:        npm run generate:pdfs
 *
 * Output: public/resume/benjamin_resume_short_{pt,en,es}.pdf
 * ─────────────────────────────────────────────────────────────
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'resume');
const BASE_URL = process.env.RESUME_BASE_URL || 'http://localhost:3000';
const LANGS = ['pt', 'en', 'es'];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generatePdfs() {
  console.log('\n📄  Benjamin Portfolio — PDF Generator');
  console.log('══════════════════════════════════════');
  console.log(`Base URL  : ${BASE_URL}`);
  console.log(`Output dir: ${OUTPUT_DIR}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const lang of LANGS) {
    const url = `${BASE_URL}/resume/short?lang=${lang}`;
    const outputPath = path.join(OUTPUT_DIR, `benjamin_resume_short_${lang}.pdf`);

    console.log(`▶  Generating [${lang.toUpperCase()}]  ${url}`);

    try {
      const page = await browser.newPage();

      // A4 viewport (96 DPI equivalent)
      await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30_000,
      });

      // Wait for fonts and any animations to settle
      await new Promise((r) => setTimeout(r, 1200));

      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
        preferCSSPageSize: true,
      });

      await page.close();

      const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
      console.log(`   ✅  Saved → ${path.basename(outputPath)} (${sizeKB} KB)`);
    } catch (err) {
      console.error(`   ❌  Failed [${lang}]:`, err.message);
    }
  }

  await browser.close();
  console.log('\n✨  All PDFs generated successfully!\n');
}

generatePdfs().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
