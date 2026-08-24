import type { Metadata } from "next";
import { I18nProvider, type Lang } from "@/lib/i18n";
import { personal } from "@/data";
import { SITE_URL } from "@/lib/site";

const LANG_SEO: Record<Lang, { title: string; description: string; locale: string; ogLocale: string }> = {
  pt: {
    title: `${personal.name} — Software Engineer · Full-Stack`,
    description:
      "Software Engineer que constrói os sistemas internos com que as empresas operam. React.js, TypeScript, ERP interno em produção e automação com IA. São Paulo, Brasil.",
    locale: "pt_BR",
    ogLocale: "pt_BR",
  },
  en: {
    title: `${personal.name} — Software Engineer · Full-Stack`,
    description:
      "Software Engineer building the internal business systems companies run on. React.js, TypeScript, an internal ERP in production, and AI-driven automation. São Paulo, Brazil.",
    locale: "en_US",
    ogLocale: "en_US",
  },
  es: {
    title: `${personal.name} — Software Engineer · Full-Stack`,
    description:
      "Software Engineer que construye los sistemas internos con los que operan las empresas. React.js, TypeScript, ERP interno en producción y automatización con IA. São Paulo, Brasil.",
    locale: "es_ES",
    ogLocale: "es_ES",
  },
};

const VALID_LANGS: Lang[] = ["pt", "en", "es"];

export async function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }));
}

/**
 * Without this, [lang] swallows every unmatched single-segment path: /jobs,
 * /about, a mistyped link — all rendered the PT homepage with a 200, so the
 * 404 page was unreachable and crawlers saw unlimited duplicates of the home
 * page under different URLs. Restricting to the generated params makes
 * anything else fall through to not-found.tsx with a real 404.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (VALID_LANGS.includes(params.lang as Lang) ? params.lang : "pt") as Lang;
  const seo = LANG_SEO[lang];

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        "pt-BR": `${SITE_URL}/pt`,
        "en-US": `${SITE_URL}/en`,
        "es-ES": `${SITE_URL}/es`,
        // middleware falls back to PT when Accept-Language matches nothing,
        // so x-default has to name the page an unmatched visitor actually gets.
        "x-default": `${SITE_URL}/pt`,
      },
    },
    openGraph: {
      type: "website",
      locale: seo.ogLocale,
      url: `${SITE_URL}/${lang}`,
      title: seo.title,
      description: seo.description,
      siteName: `${personal.name} Portfolio`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${personal.name} Portfolio` }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = (VALID_LANGS.includes(params.lang as Lang) ? params.lang : "pt") as Lang;

  return (
    <I18nProvider initialLang={lang}>{children}</I18nProvider>
  );
}
