import type { Metadata } from "next";
import { I18nProvider, type Lang } from "@/lib/i18n";
import { personal } from "@/data";

const LANG_SEO: Record<Lang, { title: string; description: string; locale: string; ogLocale: string }> = {
  pt: {
    title: `${personal.name} — Desenvolvedor Front-End & Arquiteto de Sistemas`,
    description:
      "Desenvolvedor Front-End que constrói os sistemas internos com que as empresas operam. React.js, TypeScript, ERP interno em produção e automação com IA. São Paulo, Brasil.",
    locale: "pt_BR",
    ogLocale: "pt_BR",
  },
  en: {
    title: `${personal.name} — Front-End Developer & System Architect`,
    description:
      "Front-End Developer building the internal business systems companies run on. React.js, TypeScript, an internal ERP in production, and AI-driven automation. São Paulo, Brazil.",
    locale: "en_US",
    ogLocale: "en_US",
  },
  es: {
    title: `${personal.name} — Desarrollador Front-End & Arquitecto de Sistemas`,
    description:
      "Desarrollador Front-End que construye los sistemas internos con los que operan las empresas. React.js, TypeScript, ERP interno en producción y automatización con IA. São Paulo, Brasil.",
    locale: "es_ES",
    ogLocale: "es_ES",
  },
};

const VALID_LANGS: Lang[] = ["pt", "en", "es"];

export async function generateStaticParams() {
  return VALID_LANGS.map((lang) => ({ lang }));
}

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
      canonical: `https://benjaminmaciel.com.br/${lang}`,
      languages: {
        "pt-BR": "https://benjaminmaciel.com.br/pt",
        "en-US": "https://benjaminmaciel.com.br/en",
        "es-ES": "https://benjaminmaciel.com.br/es",
      },
    },
    openGraph: {
      type: "website",
      locale: seo.ogLocale,
      url: `https://benjaminmaciel.com.br/${lang}`,
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
