import type { Metadata } from "next";
import { I18nProvider, type Lang } from "@/lib/i18n";
import { personal } from "@/data";

const LANG_SEO: Record<Lang, { title: string; description: string; locale: string; ogLocale: string }> = {
  pt: {
    title: `${personal.name} — Desenvolvedor Front-End & Arquiteto de Sistemas`,
    description:
      "Portfólio de Benjamin Maciel — Desenvolvedor Front-End com 3 anos de experiência real. 18 anos, Engenheiro Coelho–SP. Zenith Lacres.",
    locale: "pt_BR",
    ogLocale: "pt_BR",
  },
  en: {
    title: `${personal.name} — Front-End Developer & System Architect`,
    description:
      "Portfolio of Benjamin Maciel — Front-End Developer with 3 years of real business experience. 18 y/o, Engenheiro Coelho–SP, Brazil.",
    locale: "en_US",
    ogLocale: "en_US",
  },
  es: {
    title: `${personal.name} — Desarrollador Front-End & Arquitecto de Sistemas`,
    description:
      "Portfolio de Benjamin Maciel — Desarrollador Front-End con 3 años de experiencia empresarial real. 18 años, Engenheiro Coelho–SP, Brasil.",
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
      canonical: `https://benjaminmaciel.dev/${lang}`,
      languages: {
        "pt-BR": "https://benjaminmaciel.dev/pt",
        "en-US": "https://benjaminmaciel.dev/en",
        "es-ES": "https://benjaminmaciel.dev/es",
      },
    },
    openGraph: {
      type: "website",
      locale: seo.ogLocale,
      url: `https://benjaminmaciel.dev/${lang}`,
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
