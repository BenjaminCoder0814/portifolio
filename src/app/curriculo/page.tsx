"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import benjaminFoto from "@/benjaminfoto.png";

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────

const t = {
  pt: {
    lang: "PT",
    title: "Desenvolvedor Front-End | UI/UX | Marketing Digital",
    location: "Engenheiro Coelho – SP",
    birth: "Nascimento: 20/02/2008",
    exportPdf: "↓ Exportar PDF",
    backPortfolio: "← Portfólio",
    sObjective: "Objetivo",
    objective: "Atuar como Desenvolvedor Front-End em modelo remoto/online, entregando interfaces modernas, performáticas e orientadas a conversão, integrando tecnologia e estratégia de marketing digital. Baseado em Engenheiro Coelho (interior de SP), disponível para idas pontuais à sede.",
    sSummary: "Resumo Profissional",
    summary: "Desenvolvedor Front-End com formação técnica em TI e experiência prática em projetos empresariais reais. Atuação em criação de interfaces modernas, reestruturação de identidade visual, marketplaces e desenvolvimento de sistemas internos. Forte foco em performance, usabilidade e impacto comercial.",
    sSkills: "Competências Técnicas",
    skills: [
      { cat: "Frontend", items: "HTML5 · CSS3 · JavaScript · React · Responsividade · UI/UX Design" },
      { cat: "Estilização", items: "Tailwind CSS · TypeScript · Design System · Figma · Canva Pro · Framer Motion" },
      { cat: "Ferramentas", items: "Git · GitHub · VS Code · Next.js · Edição de vídeo e imagem" },
        { cat: "Testes", items: "Jest · React Testing Library (básico)" },
      { cat: "Marketing Digital", items: "Estruturação de marketplace · Estratégia de conversão · Identidade visual · Produção de mídia" },
      { cat: "Backend (suporte)", items: "Node.js · REST APIs · MySQL · WebSocket · Consumo de APIs" },
      { cat: "Soft Skills", items: "Autonomia · Visão de produto · Foco em conversão · Liderança técnica" },
      { cat: "Soft Skills", items: "Autonomia (entrega de projetos solo) · Visão de produto (identificação de oportunidades) · Foco em conversão (resultados mensuráveis) · Liderança técnica (mentoria de colegas e condução de rebranding)" },
    ],
    sExperience: "Experiência Profissional",
    exp: [
      {
        company: "Zenith Lacres",
        role: "Front-End & Marketing Digital",
        period: "2023 – atual",
        sub: "Empresa industrial com 22 anos de mercado · Engenheiro Coelho – SP",
        bullets: [
          "Desenvolvimento e reformulação de interfaces web da empresa (tempo de carregamento reduzido em 40%)",
          "Sistema interno multi-CNPJ disponível em: https://estoque-sistema.netlify.app/",
          "Reestruturação visual e identidade digital da marca: logotipo, paleta, tipografia e aplicações físicas e digitais",
          "Criação e otimização de páginas para marketplaces — Mercado Livre, Shopee, Amazon, Magalu e TikTok Shop",
          "Implementação de estúdio interno para fotografia de produtos com produção de todo o material visual de catálogo",
          "Desenvolvimento de sistema interno com interface personalizada para controle de estoque e comunicação interna",
          "Crescimento de vendas digitais de R$0 para R$10.000 em 3 meses via estratégia de marketplace e conteúdo (aumento de 100% no alcance digital)",
          "Produção e edição de vídeos institucionais e comerciais para mídias sociais",
        ],
      },
      {
        company: "Projetos Freelance",
        role: "Drone & Produção Audiovisual",
        period: "2024 – 2025",
        sub: "Certificado pela Futuriste Drone · São Paulo – SP",
        bullets: [
          "Cobertura aérea oficial na Porsche Carrera Cup como operador de drone credenciado",
          "Produção audiovisual para setor imobiliário e hoteleiro — fotos e vídeos de imóveis e propriedades",
          "Edição profissional de vídeos e tratamento de imagem para entrega de material final ao cliente",
        ],
      },
    ],
    sProjects: "Projetos Relevantes",
    projects: [
      {
        name: "Sistema Interno Empresarial — Front-End",
        year: "2026",
        stack: "HTML · CSS · JavaScript · React · TypeScript · WebSocket · REST API",
        bullets: [
          "Interface de controle de estoque multi-CNPJ com painéis de movimentação em tempo real (redução de 60% no tempo de inventário)",
          "Chat corporativo interno com conexão via WebSocket",
          "Tabela dinâmica de preços com cálculo automático de cubagem e dados logísticos",
          "Design system próprio e componentes reutilizáveis — sistema em produção ativa",
        ],
      },
      {
        name: "TCC Técnico — Projeto Full Stack",
        year: "2025",
        stack: "HTML · CSS · JavaScript · Node.js · MySQL",
        bullets: [
          "Desenvolvimento completo da interface (UI/UX) — layouts, componentes e fluxo de navegação",
          "Implementação de funcionalidades front-end e integração com back-end próprio",
          "Responsável por 100% da estrutura visual do projeto — aprovado com nota máxima",
        ],
      },
      {
        name: "Portfólio Pessoal",
        year: "2026",
        stack: "Next.js 14 · React · TypeScript · Tailwind CSS · Framer Motion",
        bullets: [
          "Portfolio interativo com animações avançadas, terminal simulado e boot loader",
          "Design system personalizado desenvolvido do zero com deploy no Netlify",
        ],
      },
    ],
    sEducation: "Formação Acadêmica",
    education: [
      { degree: "Bacharelado em Sistemas de Informação", school: "UNASP — Campus Engenheiro Coelho", period: "2026 – 2029 (cursando)" },
      { degree: "Técnico em Tecnologia da Informação", school: "UNASP — Campus Engenheiro Coelho", period: "2023 – 2025 · Concluído" },
      { degree: "Certificação Profissional em Pilotagem de Drone", school: "Futuriste Drone", period: "2024" },
    ],
    sLanguages: "Idiomas",
    languages: [
      { lang: "Português", level: "Nativo" },
      { lang: "Inglês", level: "Intermediário / Avançado · Wizard W8" },
      { lang: "Espanhol", level: "Intermediário" },
    ],
    sIntl: "Internacional",
    intl: "13 países visitados (Brasil, França, Egito, Argentina, Paraguai, Palestina, Israel, Uruguai, Colômbia, EUA, Peru, Chile, Bolívia). Leitura fluente de documentação técnica em inglês (React, MDN, Node.js).",
  },

  en: {
    lang: "EN",
    title: "Front-End Developer | UI/UX | Digital Marketing",
    location: "Engenheiro Coelho – SP, Brazil",
    birth: "Born: Feb 20, 2008",
    exportPdf: "↓ Export PDF",
    backPortfolio: "← Portfolio",
    sObjective: "Objective",
    objective: "To work remotely/online as a Front-End Developer, delivering modern, performant, conversion-driven interfaces, bridging technology and digital marketing strategy. Based in Engenheiro Coelho (São Paulo countryside), available for occasional on-site visits to HQ.",
    sSummary: "Professional Summary",
    summary: "Front-End Developer with a technical degree in IT and hands-on experience in real business projects. Skilled in building modern interfaces, visual identity overhauls, marketplace management, and internal system development. Strong focus on performance, usability, and commercial impact.",
    sSkills: "Technical Skills",
    skills: [
      { cat: "Frontend", items: "HTML5 · CSS3 · JavaScript · React · Responsive Design · UI/UX Design" },
      { cat: "Styling", items: "Tailwind CSS · TypeScript · Design System · Figma · Canva Pro" },
      { cat: "Tools", items: "Git · GitHub · VS Code · Next.js · Video & Image Editing" },
      { cat: "Digital Marketing", items: "Marketplace Setup · Conversion Strategy · Visual Identity · Media Production" },
      { cat: "Backend (support)", items: "Node.js · REST APIs · MySQL · WebSocket · API Integration" },
      { cat: "Soft Skills", items: "Autonomy · Product Vision · Conversion Focus · Technical Leadership" },
    ],
    sExperience: "Professional Experience",
    exp: [
      {
        company: "Zenith Lacres",
        role: "Front-End Developer & Digital Marketing",
        period: "2023 – present",
        sub: "Industrial company with 22 years in the market · Engenheiro Coelho – SP",
        bullets: [
          "Development and redesign of the company's web interfaces",
          "Full visual rebrand and digital identity: logo, color palette, typography, physical and digital applications",
          "Creation and optimization of marketplace product pages — Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop",
          "Set up in-house product photography studio producing all visual catalog material",
          "Built internal management system with custom UI for inventory control and corporate communication",
          "Grew digital sales from R$0 to R$10,000 in 3 months through marketplace strategy and content",
          "Produced and edited institutional and commercial videos for social media",
        ],
      },
      {
        company: "Freelance Projects",
        role: "Drone Operator & Audiovisual Production",
        period: "2024 – 2025",
        sub: "Certified by Futuriste Drone · São Paulo – SP",
        bullets: [
          "Official aerial coverage at Porsche Carrera Cup as a credentialed drone operator",
          "Audiovisual production for real estate and hospitality sectors — property photos and videos",
          "Professional video editing and image treatment for final client delivery",
        ],
      },
    ],
    sProjects: "Relevant Projects",
    projects: [
      {
        name: "Internal Business Platform — Front-End",
        year: "2026",
        stack: "HTML · CSS · JavaScript · React · TypeScript · WebSocket · REST API",
        bullets: [
          "Multi-CNPJ inventory control interface with real-time movement dashboards",
          "Internal corporate chat with WebSocket connection",
          "Dynamic pricing table with automatic cubic weight calculation and logistics data",
          "Custom design system and reusable components — system in active production",
        ],
      },
      {
        name: "Technical Graduation Project — Full Stack",
        year: "2025",
        stack: "HTML · CSS · JavaScript · Node.js · MySQL",
        bullets: [
          "Full interface development (UI/UX) — layouts, components, and navigation flow",
          "Front-end implementation and integration with own back-end",
          "Solely responsible for 100% of the project visual structure — top grade achieved",
        ],
      },
      {
        name: "Personal Portfolio",
        year: "2026",
        stack: "Next.js 14 · React · TypeScript · Tailwind CSS · Framer Motion",
        bullets: [
          "Interactive portfolio with advanced animations, simulated terminal, and boot loader",
          "Custom design system built from scratch with Netlify deployment",
        ],
      },
    ],
    sEducation: "Education",
    education: [
      { degree: "B.Sc. Information Systems (in progress)", school: "UNASP — Engenheiro Coelho Campus", period: "2026 – present" },
      { degree: "Technical Degree in Information Technology", school: "UNASP — Engenheiro Coelho Campus", period: "2023 – 2025 · Completed" },
    ],
    sLanguages: "Languages",
    languages: [
      { lang: "Portuguese", level: "Native" },
      { lang: "English", level: "Intermediate / Advanced · Wizard W8" },
      { lang: "Spanish", level: "Intermediate" },
    ],
    sIntl: "International",
    intl: "13 countries visited (Brazil, France, Egypt, Argentina, Paraguay, Palestine, Israel, Uruguay, Colombia, USA, Peru, Chile, Bolivia). Fluent reading of technical documentation in English (React, MDN, Node.js).",
  },

  es: {
    lang: "ES",
    title: "Desarrollador Front-End | UI/UX | Marketing Digital",
    location: "Engenheiro Coelho – SP, Brasil",
    birth: "Nacimiento: 20/02/2008",
    exportPdf: "↓ Exportar PDF",
    backPortfolio: "← Portafolio",
    sObjective: "Objetivo",
    objective: "Actuar en modalidad remota/online como Desarrollador Front-End, entregando interfaces modernas, de alto rendimiento y orientadas a la conversión, integrando tecnología y estrategia de marketing digital. Resido en Engenheiro Coelho (interior de São Paulo) con disponibilidad para visitas puntuales a la sede.",
    sSummary: "Resumen Profesional",
    summary: "Desarrollador Front-End con formación técnica en TI y experiencia práctica en proyectos empresariales reales. Especializado en creación de interfaces modernas, reestructuración de identidad visual, marketplaces y desarrollo de sistemas internos. Fuerte enfoque en rendimiento, usabilidad e impacto comercial.",
    sSkills: "Competencias Técnicas",
    skills: [
      { cat: "Frontend", items: "HTML5 · CSS3 · JavaScript · React · Responsividad · UI/UX Design" },
      { cat: "Estilos", items: "Tailwind CSS · TypeScript · Design System · Figma · Canva Pro" },
      { cat: "Herramientas", items: "Git · GitHub · VS Code · Next.js · Edición de video e imagen" },
      { cat: "Marketing Digital", items: "Estructura de marketplace · Estrategia de conversión · Identidad visual · Producción de medios" },
      { cat: "Backend (soporte)", items: "Node.js · REST APIs · MySQL · WebSocket · Consumo de APIs" },
      { cat: "Soft Skills", items: "Autonomía · Visión de producto · Enfoque en conversión · Liderazgo técnico" },
    ],
    sExperience: "Experiencia Profesional",
    exp: [
      {
        company: "Zenith Lacres",
        role: "Front-End & Marketing Digital",
        period: "2023 – actual",
        sub: "Empresa industrial con 22 años en el mercado · Engenheiro Coelho – SP",
        bullets: [
          "Desarrollo y reformulación de interfaces web de la empresa",
          "Reestructuración visual e identidad digital de la marca: logotipo, paleta, tipografía y aplicaciones físicas y digitales",
          "Creación y optimización de páginas para marketplaces — Mercado Livre, Shopee, Amazon, Magalu y TikTok Shop",
          "Implementación de estudio interno para fotografía de productos con producción de todo el material visual del catálogo",
          "Desarrollo de sistema interno con interfaz personalizada para control de inventario y comunicación interna",
          "Crecimiento de ventas digitales de R$0 a R$10.000 en 3 meses mediante estrategia de marketplace y contenido",
          "Producción y edición de videos institucionales y comerciales para redes sociales",
        ],
      },
      {
        company: "Proyectos Freelance",
        role: "Drone & Producción Audiovisual",
        period: "2024 – 2025",
        sub: "Certificado por Futuriste Drone · São Paulo – SP",
        bullets: [
          "Cobertura aérea oficial en Porsche Carrera Cup como operador de drone acreditado",
          "Producción audiovisual para sector inmobiliario y hotelero — fotos y videos de propiedades",
          "Edición profesional de videos y tratamiento de imágenes para entrega final al cliente",
        ],
      },
    ],
    sProjects: "Proyectos Relevantes",
    projects: [
      {
        name: "Sistema Interno Empresarial — Front-End",
        year: "2026",
        stack: "HTML · CSS · JavaScript · React · TypeScript · WebSocket · REST API",
        bullets: [
          "Interfaz de control de inventario multi-CNPJ con paneles de movimiento en tiempo real",
          "Chat corporativo interno con conexión vía WebSocket",
          "Tabla dinámica de precios con cálculo automático de cubage y datos logísticos",
          "Design system propio y componentes reutilizables — sistema en producción activa",
        ],
      },
      {
        name: "TCC Técnico — Proyecto Full Stack",
        year: "2025",
        stack: "HTML · CSS · JavaScript · Node.js · MySQL",
        bullets: [
          "Desarrollo completo de la interfaz (UI/UX) — layouts, componentes y flujo de navegación",
          "Implementación de funcionalidades front-end e integración con back-end propio",
          "Responsable del 100% de la estructura visual del proyecto — aprobado con nota máxima",
        ],
      },
      {
        name: "Portafolio Personal",
        year: "2026",
        stack: "Next.js 14 · React · TypeScript · Tailwind CSS · Framer Motion",
        bullets: [
          "Portfolio interactivo con animaciones avanzadas, terminal simulado y boot loader",
          "Design system personalizado desarrollado desde cero con deploy en Netlify",
        ],
      },
    ],
    sEducation: "Formación Académica",
    education: [
      { degree: "Ing. en Sistemas de Información (en curso)", school: "UNASP — Campus Engenheiro Coelho", period: "2026 – presente" },
      { degree: "Técnico en Tecnología de la Información", school: "UNASP — Campus Engenheiro Coelho", period: "2023 – 2025 · Completado" },
    ],
    sLanguages: "Idiomas",
    languages: [
      { lang: "Portugués", level: "Nativo" },
      { lang: "Inglés", level: "Intermedio / Avanzado · Wizard W8" },
      { lang: "Español", level: "Intermedio" },
    ],
    sIntl: "Internacional",
    intl: "13 países visitados (Brasil, Francia, Egipto, Argentina, Paraguay, Palestina, Israel, Uruguay, Colombia, EE.UU., Perú, Chile, Bolivia). Lectura fluida de documentación técnica en inglés (React, MDN, Node.js).",
  },
};

type Lang = "pt" | "en" | "es";

// ─── SECTION HELPER ──────────────────────────────────────────────────────────

function Section({
  label,
  accent,
  children,
  noMargin,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
  noMargin?: boolean;
}) {
  return (
    <div className={noMargin ? "" : "mt-8"}>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[11px] font-black uppercase tracking-[0.18em] shrink-0" style={{ color: accent }}>
          {label}
        </h2>
        <div className="flex-1 h-px" style={{ background: `${accent}25` }} />
      </div>
      {children}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Curriculo() {
  const [lang, setLang] = useState<Lang>("pt");
  const c = t[lang];

  useEffect(() => {
    document.title = "Currículo — Benjamin Maciel";
  }, []);

  return (
    <>
      {/* ── FLOATING CONTROLS (hidden on print) ──────────────── */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2 items-center">
        <div className="flex rounded-lg overflow-hidden border border-white/20 text-xs font-mono font-bold">
          {(["pt", "en", "es"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-2 transition-all uppercase ${
                lang === l
                  ? "bg-[#00d4ff] text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <a
          href="/"
          className="px-3 py-2 text-xs font-mono bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all"
        >
          {c.backPortfolio}
        </a>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-mono bg-[#00d4ff] text-black font-black rounded-lg hover:opacity-90 transition-all"
        >
          {c.exportPdf}
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SCREEN VERSION — dark, full-featured
      ══════════════════════════════════════════════════════════ */}
      <div className="screen-view min-h-screen bg-[#0d0d0d] text-white py-20 px-4">
        <div className="max-w-[860px] mx-auto">

          {/* HEADER */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-[#050505]">
                  <Image src={benjaminFoto} alt="Benjamin Maciel" className="object-cover" fill sizes="96px" />
                </div>
                <div>
                  <h1 className="text-5xl font-black tracking-tight uppercase leading-none">
                    Benjamin<br />
                    <span className="text-[#00d4ff]">Maciel</span>
                  </h1>
                  <p className="text-sm font-semibold text-[#8b949e] mt-3 tracking-widest uppercase">{c.title}</p>
                  <p className="text-xs text-[#525960] mt-1">{c.location}</p>
                </div>
              </div>
              <div className="text-xs text-[#8b949e] font-mono space-y-1 text-right">
                <p>
                  <a href="mailto:benjaminmaciel0814@gmail.com" className="hover:underline">benjaminmaciel0814@gmail.com</a>
                </p>
                <p>
                  <a href="https://linkedin.com/in/benjamin-maciel-1ba2563a2" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/benjaminmaciel</a>
                </p>
                <p>
                  <a href="https://github.com/BenjaminCoder0814" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/BenjaminCoder0814</a>
                </p>
                <p>
                  <a href="https://benjaminmaciel.com.br" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">benjaminmaciel.com.br</a>
                </p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-transparent mt-6" />
          </header>

          {/* OBJECTIVE */}
          <Section label={c.sObjective} accent="#00d4ff">
            <p className="text-sm text-[#c9d1d9] leading-relaxed">{c.objective}</p>
          </Section>

          {/* SUMMARY */}
          <Section label={c.sSummary} accent="#7c3aed">
            <p className="text-sm text-[#c9d1d9] leading-relaxed">{c.summary}</p>
          </Section>

          {/* SKILLS */}
          <Section label={c.sSkills} accent="#00ff88">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {c.skills.map((s) => (
                <div key={s.cat} className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#00d4ff] mb-2">{s.cat}</p>
                  <p className="text-xs text-[#8b949e] leading-relaxed">{s.items}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* EXPERIENCE */}
          <Section label={c.sExperience} accent="#00d4ff">
            <div className="flex flex-col gap-7">
              {c.exp.map((e) => (
                <div key={e.company} className="border-l-2 border-[#00d4ff]/30 pl-4">
                  <div className="flex justify-between items-baseline flex-wrap gap-2 mb-[2px]">
                    <div>
                      <span className="font-black text-sm text-white">{e.company}</span>
                      <span className="text-[#00d4ff] text-sm font-semibold"> — {e.role}</span>
                    </div>
                    <span className="font-mono text-xs text-[#525960]">{e.period}</span>
                  </div>
                  <p className="text-xs text-[#525960] mb-3">{e.sub}</p>
                  <ul className="space-y-[7px]">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[#c9d1d9]">
                        <span className="shrink-0 text-[#00d4ff] font-bold mt-px">›</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* PROJECTS */}
          <Section label={c.sProjects} accent="#7c3aed">
            <div className="grid grid-cols-1 gap-4">
              {c.projects.map((p) => (
                <div key={p.name} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                  <div className="flex justify-between items-baseline flex-wrap gap-2 mb-1">
                    <h3 className="font-bold text-sm text-white">{p.name}</h3>
                    <span className="font-mono text-xs text-[#525960]">{p.year}</span>
                  </div>
                  <p className="font-mono text-[10px] text-[#7c3aed] mb-3 tracking-wide">{p.stack}</p>
                  <ul className="space-y-[6px]">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[#8b949e]">
                        <span className="shrink-0 text-[#7c3aed] font-bold">–</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* EDUCATION + LANGUAGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <Section label={c.sEducation} accent="#00ff88" noMargin>
              {c.education.map((e) => (
                <div key={e.degree} className="mb-5 last:mb-0">
                  <p className="font-bold text-sm text-white">{e.degree}</p>
                  <p className="text-xs text-[#8b949e] mt-[2px]">{e.school}</p>
                  <p className="font-mono text-[10px] text-[#525960] mt-1">{e.period}</p>
                </div>
              ))}
            </Section>

            <Section label={c.sLanguages} accent="#00ff88" noMargin>
              {c.languages.map((l) => (
                <div key={l.lang} className="flex justify-between items-baseline mb-3 last:mb-0">
                  <span className="text-sm font-semibold text-white">{l.lang}</span>
                  <span className="text-xs text-[#8b949e]">{l.level}</span>
                </div>
              ))}
              <div className="mt-5 pt-4 border-t border-white/[0.07]">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#525960] mb-1">{c.sIntl}</p>
                <p className="text-xs text-[#8b949e] leading-relaxed">{c.intl}</p>
              </div>
            </Section>
          </div>

          <div className="h-20" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          PDF VERSION — only visible on print
          Dark navy background, cyan/purple/green accents
      ══════════════════════════════════════════════════════════ */}
      <div className="pdf-view">
        <div className="pdf-page">

          {/* PDF HEADER */}
          <div className="pdf-header">
            <div className="pdf-header-left">
              <h1 className="pdf-name">Benjamin Maciel</h1>
              <p className="pdf-role">{c.title}</p>
              <p className="pdf-loc">{c.location} · {c.birth}</p>
            </div>
            <div className="pdf-header-photo">
              <img src={benjaminFoto.src} alt="Benjamin Maciel" />
            </div>
            <div className="pdf-header-right">
              <p>benjaminmaciel0814@gmail.com</p>
              <p>linkedin.com/in/benjaminmaciel</p>
              <p>github.com/BenjaminCoder0814</p>
              <p>preeminent-sopapillas-b24cad.netlify.app</p>
            </div>
          </div>

          {/* PDF BODY */}
          <div className="pdf-body-wrap">

            <PdfSection title={c.sObjective} accent="cyan">
              <p className="pdf-text">{c.objective}</p>
            </PdfSection>

            <PdfSection title={c.sSummary} accent="purple">
              <p className="pdf-text">{c.summary}</p>
            </PdfSection>

            <PdfSection title={c.sSkills} accent="green">
              <div className="pdf-skills">
                {c.skills.map((s) => (
                  <div key={s.cat} className="pdf-skill-card">
                    <p className="pdf-skill-cat">{s.cat}</p>
                    <p className="pdf-skill-val">{s.items}</p>
                  </div>
                ))}
              </div>
            </PdfSection>

            <PdfSection title={c.sExperience} accent="cyan">
              {c.exp.map((e) => (
                <div key={e.company} className="pdf-exp">
                  <div className="pdf-exp-row">
                    <span className="pdf-exp-co">{e.company}</span>
                    <span className="pdf-exp-role"> — {e.role}</span>
                    <span className="pdf-exp-period">{e.period}</span>
                  </div>
                  <p className="pdf-exp-sub">{e.sub}</p>
                  <ul className="pdf-list">
                    {e.bullets.map((b, i) => (
                      <li key={i}><span className="pdf-mark-cyan">›</span>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </PdfSection>

            <PdfSection title={c.sProjects} accent="purple">
              {c.projects.map((p) => (
                <div key={p.name} className="pdf-proj">
                  <div className="pdf-proj-row">
                    <span className="pdf-proj-name">{p.name}</span>
                    <span className="pdf-proj-year">{p.year}</span>
                  </div>
                  <p className="pdf-proj-stack">{p.stack}</p>
                  <ul className="pdf-list">
                    {p.bullets.map((b, i) => (
                      <li key={i}><span className="pdf-mark-purple">–</span>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </PdfSection>

            <div className="pdf-two-col">
              <div>
                <PdfSection title={c.sEducation} accent="green" noMargin>
                  {c.education.map((e) => (
                    <div key={e.degree} className="pdf-edu">
                      <p className="pdf-edu-deg">{e.degree}</p>
                      <p className="pdf-edu-sch">{e.school}</p>
                      <p className="pdf-edu-per">{e.period}</p>
                    </div>
                  ))}
                </PdfSection>
              </div>
              <div>
                <PdfSection title={c.sLanguages} accent="green" noMargin>
                  {c.languages.map((l) => (
                    <div key={l.lang} className="pdf-lang-row">
                      <span className="pdf-lang-n">{l.lang}</span>
                      <span className="pdf-lang-l">{l.level}</span>
                    </div>
                  ))}
                  <p className="pdf-intl-label">{c.sIntl}</p>
                  <p className="pdf-intl-text">{c.intl}</p>
                </PdfSection>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── STYLES ─────────────────────────────────────────────── */}
      <style>{`
        .pdf-view { display: none; }

        @media print {
          .screen-view { display: none !important; }
          .no-print    { display: none !important; }
          .pdf-view    { display: block !important; }

          @page { size: A4; margin: 0; }

          body {
            background: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* PAGE */
          .pdf-page {
            background: #0f172a;
            color: #e2e8f0;
            font-family: 'Segoe UI', system-ui, Arial, sans-serif;
            font-size: 8.5pt;
            width: 210mm;
            min-height: 297mm;
            padding-bottom: 14pt;
          }

          /* HEADER */
          .pdf-header {
            background: #020617;
            border-bottom: 3px solid #00d4ff;
            padding: 20pt 22pt 18pt;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16pt;
          }
          .pdf-header-left { flex: 1; }
          .pdf-name {
            font-size: 28pt;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -0.5pt;
            color: #f1f5f9;
            margin: 0;
            line-height: 1;
          }
          .pdf-role {
            font-size: 7.5pt;
            color: #00d4ff;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.2pt;
            margin: 5pt 0 3pt;
          }
          .pdf-loc { font-size: 7pt; color: #475569; margin: 0; }
          .pdf-header-right {
            font-size: 7pt;
            color: #64748b;
            text-align: right;
            line-height: 1.9;
            font-family: 'Courier New', monospace;
          }
          .pdf-header-right p { margin: 0; }

          .pdf-header-photo {
            width: 72pt;
            height: 72pt;
            border-radius: 12pt;
            overflow: hidden;
            border: 1pt solid rgba(255,255,255,0.12);
            box-shadow: 0 10pt 28pt rgba(0,0,0,0.35);
            background: linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.18));
            flex-shrink: 0;
          }
          .pdf-header-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          /* BODY WRAP */
          .pdf-body-wrap { padding: 6pt 26pt 22pt; }

          /* SECTION */
          .pdf-section      { margin-top: 14pt; }
          .pdf-section-nm   { margin-top: 0; }
          .pdf-sec-head {
            display: flex;
            align-items: center;
            gap: 6pt;
            margin-bottom: 6pt;
            padding-bottom: 3pt;
          }
          .pdf-sec-title {
            font-size: 6.5pt;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1.5pt;
            white-space: nowrap;
          }
          .pdf-sec-line { flex: 1; height: 0.5pt; }

          .pdf-cyan   { color: #00d4ff; }
          .pdf-purple { color: #a78bfa; }
          .pdf-green  { color: #34d399; }
          .pdf-cyan-line   { background: rgba(0,212,255,0.2); }
          .pdf-purple-line { background: rgba(167,139,250,0.2); }
          .pdf-green-line  { background: rgba(52,211,153,0.2); }

          .pdf-text { color: #cbd5e1; line-height: 1.6; margin: 0; }

          /* SKILLS */
          .pdf-skills {
            display: grid;
            grid-template-columns: repeat(3,1fr);
            gap: 6pt;
          }
          .pdf-skill-card {
            background: rgba(255,255,255,0.04);
            border: 0.5pt solid rgba(255,255,255,0.08);
            border-radius: 3pt;
            padding: 6pt 7pt;
            min-height: 32pt;
          }
          .pdf-skill-cat {
            font-size: 6pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.8pt;
            color: #00d4ff;
            margin: 0 0 2pt;
          }
          .pdf-skill-val { font-size: 7.5pt; color: #94a3b8; margin: 0; line-height: 1.4; }

          /* EXPERIENCE */
          .pdf-exp {
            border-left: 2pt solid rgba(0,212,255,0.35);
            padding-left: 8pt;
            margin-bottom: 10pt;
          }
          .pdf-exp:last-child { margin-bottom: 0; }
          .pdf-exp-row { display: flex; align-items: baseline; flex-wrap: wrap; gap: 2pt; margin-bottom: 2pt; }
          .pdf-exp-co { font-weight: 800; color: #f1f5f9; font-size: 8.5pt; }
          .pdf-exp-role { font-weight: 600; color: #00d4ff; font-size: 8.5pt; }
          .pdf-exp-period { margin-left: auto; font-size: 6.5pt; color: #475569; font-family: monospace; }
          .pdf-exp-sub { font-size: 6.5pt; color: #475569; margin: 0 0 3pt; }

          /* PROJECTS */
          .pdf-proj {
            border: 0.5pt solid rgba(255,255,255,0.07);
            background: rgba(255,255,255,0.025);
            border-radius: 3pt;
            padding: 6pt 8pt;
            margin-bottom: 7pt;
          }
          .pdf-proj:last-child { margin-bottom: 0; }
          .pdf-proj-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1pt; }
          .pdf-proj-name { font-weight: 700; color: #e2e8f0; font-size: 8.5pt; }
          .pdf-proj-year { font-size: 6.5pt; color: #475569; font-family: monospace; }
          .pdf-proj-stack { font-size: 6.5pt; color: #a78bfa; font-family: monospace; letter-spacing: 0.3pt; margin: 0 0 3pt; }

          /* SHARED LIST */
          .pdf-list { margin: 0; padding: 0; list-style: none; }
          .pdf-list li { display: flex; gap: 5pt; color: #cbd5e1; margin-bottom: 3pt; line-height: 1.55; font-size: 8pt; }
          .pdf-list li:last-child { margin-bottom: 0; }
          .pdf-mark-cyan   { color: #00d4ff; font-weight: 800; flex-shrink: 0; }
          .pdf-mark-purple { color: #a78bfa; font-weight: 800; flex-shrink: 0; }

          /* TWO COL */
          .pdf-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20pt; padding-bottom: 18pt; }

          /* EDUCATION */
          .pdf-edu { margin-bottom: 6pt; }
          .pdf-edu:last-child { margin-bottom: 0; }
          .pdf-edu-deg { font-weight: 700; color: #e2e8f0; margin: 0; font-size: 8.5pt; }
          .pdf-edu-sch { color: #94a3b8; font-size: 7.5pt; margin: 1pt 0; }
          .pdf-edu-per { color: #475569; font-size: 6.5pt; font-family: monospace; margin: 0; }

          /* LANGUAGES */
          .pdf-lang-row { display: flex; justify-content: space-between; margin-bottom: 4pt; }
          .pdf-lang-n { font-weight: 600; color: #e2e8f0; font-size: 8.5pt; }
          .pdf-lang-l { color: #94a3b8; font-size: 7.5pt; }
          .pdf-intl-label { font-size: 6pt; text-transform: uppercase; letter-spacing: 0.8pt; color: #475569; margin: 7pt 0 2pt; }
          .pdf-intl-text  { color: #94a3b8; font-size: 7.5pt; line-height: 1.5; margin: 0; }
        }
      `}</style>
    </>
  );
}

// ─── PDF SECTION HELPER ───────────────────────────────────────────────────────

function PdfSection({
  title,
  accent,
  children,
  noMargin,
}: {
  title: string;
  accent: "cyan" | "purple" | "green";
  children: React.ReactNode;
  noMargin?: boolean;
}) {
  return (
    <div className={noMargin ? "pdf-section-nm" : "pdf-section"}>
      <div className="pdf-sec-head">
        <span className={`pdf-sec-title pdf-${accent}`}>{title}</span>
        <span className={`pdf-sec-line pdf-${accent}-line`} />
      </div>
      {children}
    </div>
  );
}
