"use client";

import { useEffect } from "react";

export default function Curriculo() {
  useEffect(() => {
    document.title = "Currículo — Benjamin Maciel";
  }, []);

  return (
    <>
      {/* Print button — hidden on print */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <a
          href="/"
          className="px-4 py-2 text-sm font-mono bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all"
        >
          ← Portfolio
        </a>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-sm font-mono bg-[#00d4ff] text-black font-bold rounded-lg hover:opacity-90 transition-all"
        >
          ↓ Exportar PDF
        </button>
      </div>

      <div id="resume" className="bg-white text-black min-h-screen font-sans">
        <div className="max-w-[794px] mx-auto px-12 py-12">

          {/* ── HEADER ─────────────────────────────── */}
          <header className="border-b-2 border-black pb-5 mb-6">
            <h1 className="text-4xl font-black tracking-tight uppercase">Benjamin Maciel</h1>
            <p className="text-base font-semibold text-gray-500 mt-1 tracking-wide">Desenvolvedor Front End & Marketing Digital</p>
            <p className="text-sm text-gray-500 mt-[2px]">Engenheiro Coelho – SP · Nascimento: 20/02/2008</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-600 font-mono">
              <span>benjaminmaciel0814@gmail.com</span>
              <span>linkedin.com/in/benjaminmaciel</span>
              <span>github.com/BenjaminCoder0814</span>
              <span>preeminent-sopapillas-b24cad.netlify.app</span>
            </div>
          </header>

          {/* ── RESUMO PROFISSIONAL ─────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Resumo Profissional</h2>
            <p className="text-sm leading-relaxed text-gray-800">
              Desenvolvedor Front End com formação técnica em TI (UNASP-EC, 2025) e graduando em Sistemas de Informação.
              Experiência real na construção de interfaces web, sistemas de design, identidade visual e estratégia de marketing digital.
              Três anos atuando na Zenith Lacres — empresa industrial com 22 anos de mercado — onde desenvolvi o frontend de uma
              plataforma interna, conduzi rebranding completo e escalei presença digital de zero para R$10.000 em vendas mensais.
              Perfil que une execução técnica em código com visão estratégica de negócio e comunicação visual.
            </p>
          </section>

          {/* ── COMPETÊNCIAS TÉCNICAS ──────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Competências Técnicas</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Core Front End</p>
                <p className="text-gray-700">HTML5 · CSS3 · JavaScript (ES6+) · React · TypeScript · Tailwind CSS</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">UI / UX & Design</p>
                <p className="text-gray-700">Figma · Design System · Prototipação · Identidade Visual · Canva Pro</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Marketing Digital</p>
                <p className="text-gray-700">SEO On-Page · Copywriting · Marketplaces · Mídias Sociais · Fotografia de Produto</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Ferramentas & Workflow</p>
                <p className="text-gray-700">Git · GitHub · VS Code · Next.js · Framer Motion · Responsivo / Mobile First</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Backend (suporte)</p>
                <p className="text-gray-700">Node.js · REST APIs · MySQL · WebSocket · Consumo de APIs externas</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Soft Skills</p>
                <p className="text-gray-700">Autonomia · Atenção a detalhe visual · Visão estratégica · Comunicação técnica</p>
              </div>
            </div>
          </section>

          {/* ── EXPERIÊNCIA ────────────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Experiência Profissional</h2>

            <div className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">Zenith Lacres — Desenvolvedor Front End & Marketing Digital</h3>
                <span className="text-xs text-gray-500 font-mono shrink-0 ml-4">2023 – atual</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Empresa industrial com 22 anos de mercado · Engenheiro Coelho – SP</p>
              <ul className="text-sm space-y-[6px]">
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Desenvolvi o front end completo de plataforma interna de gestão em React — interfaces de estoque multi-CNPJ, chat corporativo e tabela de preços com cubagem automática</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Projetei o design system e todos os componentes visuais da plataforma do zero, priorizando usabilidade para operadores sem perfil técnico</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Conduzi rebranding completo da identidade visual: logotipo, paleta, tipografia, aplicações em mídia física e digital</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Redesenhei e desenvolvi o website corporativo com foco em conversão e presença digital profissional</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Gerenciei e otimizei presença em 5 marketplaces (Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop) — R$0 para R$10.000 em vendas em 3 meses</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Montei estúdio de fotografia de produtos e produzi todo o material visual para catálogo e marketing</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Gerenciei mídias sociais com produção de conteúdo visual alinhado à nova identidade da marca</li>
              </ul>
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">Freelancer — Web Design & Conteúdo Digital</h3>
                <span className="text-xs text-gray-500 font-mono shrink-0 ml-4">2024 – presente</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Projetos pontuais para clientes dos setores imobiliário, turismo e eventos.</p>
              <ul className="text-sm space-y-[6px]">
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Desenvolvi landing pages e peças visuais para campanhas digitais de clientes independentes</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Produzi conteúdo foto e vídeo para redes sociais e materiais de marketing imobiliário e turístico</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Realizei cobertura aérea oficial na Porsche Carrera Cup como operador de drone certificado (Futuriste Drone)</li>
              </ul>
            </div>
          </section>

          {/* ── PROJETOS ───────────────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Projetos Relevantes</h2>

            <div className="grid grid-cols-1 gap-3">
              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">Portfolio Pessoal — benjaminmaciel.dev</h3>
                  <span className="text-xs text-gray-400 font-mono">2026</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: Next.js 14 · React · TypeScript · Tailwind CSS · Framer Motion</p>
                <p className="text-sm text-gray-700">Portfolio interativo com animações, terminal simulado, boot loader e design system personalizado. Desenvolvido do zero — design, componentes, seções e deploy no Netlify.</p>
              </div>

              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">Plataforma Interna Zenith Lacres — Front End</h3>
                  <span className="text-xs text-gray-400 font-mono">2025–2026</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: React · JavaScript · CSS · Consumo de REST API · WebSocket</p>
                <p className="text-sm text-gray-700">Interface completa de sistema ERP customizado: painel de estoque, chat em tempo real, tabela de preços interativa e controle por nível de acesso. Sistema em produção ativa.</p>
              </div>

              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">TCC — Aplicação Web Full Stack</h3>
                  <span className="text-xs text-gray-400 font-mono">2025</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: HTML · CSS · JavaScript · Node.js · MySQL</p>
                <p className="text-sm text-gray-700">Projeto de conclusão do curso técnico desenvolvido 100% de forma autônoma — design, frontend e backend. Aprovado com nota máxima.</p>
              </div>

              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">Rebranding & Presença Digital — Zenith Lacres</h3>
                  <span className="text-xs text-gray-400 font-mono">2023–2024</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: Figma · Web Design · Copywriting · Marketing Digital</p>
                <p className="text-sm text-gray-700">Rebranding completo de empresa industrial: identidade visual, website, mídias sociais e marketplaces. Resultado: R$0 → R$10.000 em vendas online em 3 meses.</p>
              </div>
            </div>
          </section>

          {/* 2 colunas: Formação + Idiomas */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            {/* ── FORMAÇÃO ──────────────────────────── */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Formação Acadêmica</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-bold text-sm">Bacharelado em Sistemas de Informação</p>
                  <p className="text-xs text-gray-500">UNASP — Campus Engenheiro Coelho</p>
                  <p className="text-xs text-gray-400 font-mono">2026 – presente</p>
                </div>
                <div>
                  <p className="font-bold text-sm">Técnico em Tecnologia da Informação</p>
                  <p className="text-xs text-gray-500">UNASP — Campus Engenheiro Coelho</p>
                  <p className="text-xs text-gray-400 font-mono">2023 – 2025 · Concluído</p>
                </div>
              </div>
            </section>

            {/* ── IDIOMAS ───────────────────────────── */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Idiomas</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Português</span>
                  <span className="text-gray-500">Nativo</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Inglês</span>
                  <span className="text-gray-500">Intermediário / Avançado · Wizard W8</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Espanhol</span>
                  <span className="text-gray-500">Intermediário</span>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Internacional</h2>
                <p className="text-sm text-gray-700">17 países visitados. Leitura fluente de documentação técnica em inglês (React, MDN, Node.js).</p>
              </div>
            </section>
          </div>

        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          #resume { padding: 0; }
          body { background: white; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>
    </>
  );
}
