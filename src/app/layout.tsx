import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/data";

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
  metadataBase: new URL("https://benjaminmaciel.dev"),
  title: {
    default: `${personal.name} — Developer & System Architect`,
    template: `%s | ${personal.name}`,
  },
  description:
    "Portfolio de Benjamin Maciel — Full Stack Developer, System Architect e Business Transformer. 18 anos. Engenheiro Coelho–SP. 3 anos na Zenith Lacres.",
  keywords: [
    "Benjamin Maciel",
    "portfolio",
    "developer",
    "full stack",
    "React",
    "Next.js",
    "Node.js",
    "system architect",
  ],
  authors: [{ name: personal.name, url: personal.github }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://benjaminmaciel.dev",
    title: `${personal.name} — Developer & System Architect`,
    description: "Full Stack Developer construindo sistemas escaláveis com visão de produto.",
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
    title: `${personal.name} — Developer & System Architect`,
    description: "Full Stack Developer construindo sistemas escaláveis com visão de produto.",
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
        {children}
      </body>
    </html>
  );
}
