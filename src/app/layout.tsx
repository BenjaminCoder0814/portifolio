import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/data";
import { SITE_URL, siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${personal.name} — Front-End Developer · React.js · TypeScript`,
    template: `%s | ${personal.name}`,
  },
  description:
    "Front-End Developer building the internal business systems companies run on. React.js, TypeScript, an internal ERP in production, and AI-driven process automation. São Paulo, Brazil.",
    keywords: [
    "Benjamin Maciel",
    "Front-End Developer",
    "React Developer",
    "React.js",
    "TypeScript",
    "Next.js",
    "Internal Systems Developer",
    "Business Software Engineer",
    "ERP",
    "AI Automation",
  ],
  authors: [{ name: personal.name, url: personal.github }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    title: `${personal.name} — Front-End Developer · React.js · TypeScript`,
    description: "He built and runs the system his company operates on. React.js · TypeScript · Internal business systems · AI automation.",
    siteName: `${personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personal.name} Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — Front-End Developer · React.js · TypeScript`,
    description:
      "He built and runs the system his company operates on. React.js · TypeScript · Internal business systems · AI automation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0a] text-[#f0f6fc]`}
      >
        {/* Structured data: lets a recruiter's Google result show role, employer
            and profile links instead of a bare title and URL. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: personal.name,
              url: SITE_URL,
              image: siteUrl("/og-image.png"),
              jobTitle: "Front-End Developer",
              email: `mailto:${personal.email}`,
              telephone: "+55 19 97100-3115",
              worksFor: { "@type": "Organization", name: "Zenith Lacres" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "São Paulo",
                addressRegion: "SP",
                addressCountry: "BR",
              },
              alumniOf: [
                { "@type": "CollegeOrUniversity", name: "University of the People" },
                { "@type": "CollegeOrUniversity", name: "UNASP" },
              ],
              knowsLanguage: ["pt-BR", "en", "es"],
              knowsAbout: [
                "React.js", "TypeScript", "JavaScript", "Next.js",
                "Front-End Development", "Internal Business Systems",
                "REST APIs", "WebSocket", "AI Automation",
              ],
              sameAs: [personal.github, personal.linkedin],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
