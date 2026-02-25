"use client";

import { useEffect } from "react";

// Currículo focado em Desenvolvedor Front-End | UI/UX | Marketing Digital

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
            <p className="text-base font-semibold text-gray-600 mt-1 tracking-wide">Desenvolvedor Front-End | UI/UX | Marketing Digital</p>
            <p className="text-sm text-gray-400 mt-[2px]">Engenheiro Coelho – SP</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-600 font-mono">
              <span>benjaminmaciel0814@gmail.com</span>
              <span>linkedin.com/in/benjaminmaciel</span>
              <span>github.com/BenjaminCoder0814</span>
              <span>preeminent-sopapillas-b24cad.netlify.app</span>
            </div>
          </header>

          {/* ── OBJETIVO ───────────────────────────── */}
          <section className="mb-5">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Objetivo</h2>
            <p className="text-sm leading-relaxed text-gray-800">
              Atuar como Desenvolvedor Front-End contribuindo com interfaces modernas, performáticas e orientadas a conversão,
              integrando tecnologia e estratégia de marketing digital.
            </p>
          </section>

          {/* ── RESUMO PROFISSIONAL ─────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Resumo Profissional</h2>
            <p className="text-sm leading-relaxed text-gray-800">
              Desenvolvedor Front-End com formação técnica em TI e experiência prática em projetos empresariais reais.
              Atuação em criação de interfaces modernas, reestruturação de identidade visual, marketplaces e desenvolvimento
              de sistemas internos. Forte foco em performance, usabilidade e impacto comercial.
            </p>
          </section>

          {/* ── COMPETÊNCIAS TÉCNICAS ──────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Competências Técnicas</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Frontend</p>
                <p className="text-gray-700">HTML5 · CSS3 · JavaScript · React · Responsividade · UI/UX Design</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Estilização</p>
                <p className="text-gray-700">Tailwind CSS · TypeScript · Design System · Figma · Canva Pro</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Ferramentas</p>
                <p className="text-gray-700">Git · GitHub · VS Code · Next.js · Edição de vídeo e imagem</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Marketing Digital</p>
                <p className="text-gray-700">Estruturação de marketplace · Estratégia de conversão · Identidade visual · Produção de mídia</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Backend (suporte)</p>
                <p className="text-gray-700">Node.js · REST APIs · MySQL · WebSocket · Consumo de APIs</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Soft Skills</p>
                <p className="text-gray-700">Autonomia · Visão de produto · Foco em conversão · Liderança técnica</p>
              </div>
            </div>
          </section>

          {/* ── EXPERIÊNCIA ────────────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Experiência Profissional</h2>

            <div className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">Zenith Lacres — Front-End & Marketing Digital</h3>
                <span className="text-xs text-gray-500 font-mono shrink-0 ml-4">2023 – atual</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Empresa industrial com 22 anos de mercado · Engenheiro Coelho – SP</p>
              <ul className="text-sm space-y-[6px]">
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Desenvolvimento e reformulação de interfaces web da empresa</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Reestruturação visual e identidade digital da marca: logotipo, paleta, tipografia e aplicações físicas e digitais</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Criação e otimização de páginas para marketplaces — Mercado Livre, Shopee, Amazon, Magalu e TikTok Shop</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Implementação de estúdio interno para fotografia de produtos com produção de todo o material visual de catálogo</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Desenvolvimento de sistema interno com interface personalizada para controle de estoque e comunicação interna</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Crescimento de vendas digitais de R$0 para R$10.000 em 3 meses via estratégia de marketplace e conteúdo</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Produção e edição de vídeos institucionais e comerciais para mídias sociais</li>
              </ul>
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">Projetos Freelance — Drone & Produção Audiovisual</h3>
                <span className="text-xs text-gray-500 font-mono shrink-0 ml-4">2024 – 2025</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Certificado pela Futuriste Drone · São Paulo – SP</p>
              <ul className="text-sm space-y-[6px]">
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Cobertura aérea oficial na Porsche Carrera Cup como operador de drone credenciado</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Produção audiovisual para setor imobiliário e hoteleiro — fotos e vídeos de imóveis e propriedades</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Edição profissional de vídeos e tratamento de imagem para entrega de material final ao cliente</li>
              </ul>
            </div>
          </section>

          {/* ── PROJETOS ───────────────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Projetos Relevantes</h2>

            <div className="grid grid-cols-1 gap-3">
              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">Sistema Interno Empresarial — Front-End</h3>
                  <span className="text-xs text-gray-400 font-mono">2026</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Tecnologias: HTML · CSS · JavaScript · React · TypeScript · WebSocket · REST API</p>
                <ul className="text-sm space-y-[4px] text-gray-700 mt-1">
                  <li className="flex gap-2"><span className="shrink-0 text-gray-400">–</span>Interface de controle de estoque multi-CNPJ com painéis de movimentação em tempo real</li>
                  <li className="flex gap-2"><span className="shrink-0 text-gray-400">–</span>Chat corporativo interno com conexão via WebSocket</li>
                  <li className="flex gap-2"><span className="shrink-0 text-gray-400">–</span>Tabela dinâmica de preços com cálculo automático de cubagem e dados logísticos</li>
                  <li className="flex gap-2"><span className="shrink-0 text-gray-400">–</span>Design system próprio e componentes reutilizáveis. Sistema em produção ativa.</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">TCC Técnico — Projeto Full Stack</h3>
                  <span className="text-xs text-gray-400 font-mono">2025</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: HTML · CSS · JavaScript · Node.js · MySQL</p>
                <ul className="text-sm space-y-[4px] text-gray-700 mt-1">
                  <li className="flex gap-2"><span className="shrink-0 text-gray-400">–</span>Desenvolvimento completo da interface (UI/UX) — layouts, componentes e fluxo de navegação</li>
                  <li className="flex gap-2"><span className="shrink-0 text-gray-400">–</span>Implementação de funcionalidades front-end e integração com back-end próprio</li>
                  <li className="flex gap-2"><span className="shrink-0 text-gray-400">–</span>Responsável por 100% da estrutura visual do projeto — aprovado com nota máxima</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">Portfolio Pessoal — preeminent-sopapillas-b24cad.netlify.app</h3>
                  <span className="text-xs text-gray-400 font-mono">2026</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: Next.js 14 · React · TypeScript · Tailwind CSS · Framer Motion</p>
                <p className="text-sm text-gray-700">Portfolio interativo com animações avançadas, terminal simulado, boot loader e design system personalizado — desenvolvido do zero com deploy no Netlify.</p>
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
