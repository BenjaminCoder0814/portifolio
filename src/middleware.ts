import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    // Match root and only the exact lang slugs — avoid matching static assets
    '/((?!_next|favicon|fonts|resume/benjamin|og-image|manifest|apple-icon|sitemap).*)',
  ],
};

const SUPPORTED_LANGS = ['pt', 'en', 'es'] as const;
type Lang = typeof SUPPORTED_LANGS[number];

function detectLang(req: NextRequest): Lang {
  const acceptLang = req.headers.get('accept-language') ?? '';
  const parts = acceptLang.split(',').map((s) => s.split(';')[0].trim().toLowerCase());
  for (const part of parts) {
    if (part.startsWith('pt')) return 'pt';
    if (part.startsWith('es')) return 'es';
    if (part.startsWith('en')) return 'en';
  }
  return 'pt'; // default
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already on a lang route — let it through
  if (SUPPORTED_LANGS.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  // Root → redirect to detected lang
  if (pathname === '/') {
    const lang = detectLang(req);
    return NextResponse.redirect(new URL(`/${lang}`, req.url));
  }

  // /curriculo → /pt/curriculo (etc.)
  if (pathname === '/curriculo' || pathname.startsWith('/curriculo/')) {
    const lang = detectLang(req);
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
  }

  // /resume → /pt/resume (etc.)
  if (pathname === '/resume' || pathname.startsWith('/resume/')) {
    const lang = detectLang(req);
    return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url));
  }

  return NextResponse.next();
}
