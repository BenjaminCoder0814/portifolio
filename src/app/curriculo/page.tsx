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
            <p className="text-sm text-gray-600 mt-1">Engenheiro Coelho – SP · Nascimento: 20/02/2008</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-gray-700 font-mono">
              <span>📧 benjaminmaciel0814@gmail.com</span>
              <span>💼 linkedin.com/in/benjaminmaciel</span>
              <span>🐙 github.com/BenjaminCoder0814</span>
              <span>🌐 preeminent-sopapillas-b24cad.netlify.app</span>
            </div>
          </header>

          {/* ── RESUMO PROFISSIONAL ─────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Resumo Profissional</h2>
            <p className="text-sm leading-relaxed text-gray-800">
              Técnico em Tecnologia da Informação formado pelo UNASP-EC (2025) e estudante de Sistemas de Informação.
              Desenvolvedor Full Stack com experiência real em criação de sistemas empresariais, arquitetura de plataformas internas,
              rebranding corporativo, marketing digital e estratégia de negócios. Três anos atuando na Zenith Lacres —
              empresa com 22 anos no mercado — com entregas mensuráveis em tecnologia, operações e crescimento comercial.
              Perfil técnico com visão analítica voltada à identificação de gaps e construção de soluções de alto impacto.
            </p>
          </section>

          {/* ── EXPERIÊNCIA ────────────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Experiência Profissional</h2>

            <div className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">Zenith Lacres — Marketing, Desenvolvimento & Operações</h3>
                <span className="text-xs text-gray-500 font-mono shrink-0 ml-4">2023 – atual</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Empresa com 22 anos no mercado. Engenheiro Coelho / São Paulo – SP.</p>
              <ul className="text-sm space-y-[5px]">
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Desenvolvi plataforma interna de controle de estoque multi-CNPJ, eliminando conflitos de entradas e saídas entre três CNPJs no mesmo local</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Implementei chat corporativo interno, reduzindo custos operacionais com comunicação via plataformas externas pagas</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Estruturei tabela de preços com cálculo de cubagem e gestão de dados fiscais diretamente na plataforma</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Implementei catálogo em 5 marketplaces (Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop), saindo de R$0 para R$10.000 em vendas em 3 meses</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Montei estúdio interno de fotografia de produtos e produzi todo o material visual de catálogo</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Conduzi rebranding completo: identidade visual, logotipo, mídias sociais e website corporativo</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Atuei nos setores de expedição, produção, vendas e administrativo — mapeando processos e identificando oportunidades de melhoria</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Participei de processos de análise tributária e fiscal no setor administrativo</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">Operador de Drone Profissional — Freelancer</h3>
                <span className="text-xs text-gray-500 font-mono shrink-0 ml-4">2024 – 2025</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Certificado pela Futuriste Drone, São Paulo – SP.</p>
              <ul className="text-sm space-y-[5px]">
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Realizei cobertura aérea oficial na Porsche Carrera Cup como operador freelancer</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Prestei serviços de filmagem e fotografia aérea para os setores imobiliário, hoteleiro e turístico</li>
                <li className="flex gap-2"><span className="shrink-0 text-gray-400">•</span>Executei edição profissional de vídeos e fotos para entrega de conteúdo final ao cliente</li>
              </ul>
            </div>
          </section>

          {/* ── PROJETOS ───────────────────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Projetos Relevantes</h2>

            <div className="grid grid-cols-1 gap-3">
              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">Plataforma Interna Empresarial (ERP Customizado)</h3>
                  <span className="text-xs text-gray-400 font-mono">2026</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: React · Node.js · MySQL · WebSocket · REST API</p>
                <p className="text-sm text-gray-700">Controle de estoque unificado para 3 CNPJs, chat interno corporativo, tabela de preços com cubagem automática e painel de gestão operacional. Sistema em produção ativa.</p>
              </div>

              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">TCC — Sistema Web Full Stack</h3>
                  <span className="text-xs text-gray-400 font-mono">2025</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: HTML · CSS · JavaScript · Node.js · MySQL</p>
                <p className="text-sm text-gray-700">Projeto de conclusão do curso técnico desenvolvido integralmente de forma autônoma — design, frontend e backend. Aprovado com nota máxima.</p>
              </div>

              <div className="border border-gray-200 rounded p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">Rebranding & Estratégia Digital — Zenith Lacres</h3>
                  <span className="text-xs text-gray-400 font-mono">2023–2024</span>
                </div>
                <p className="text-xs font-mono text-gray-500 mb-1">Stack: Figma · Web Design · Marketing Digital · Marketplaces</p>
                <p className="text-sm text-gray-700">Redesign de identidade visual, website e mídias sociais. Implementação em marketplaces com crescimento de R$0 para R$10.000 em vendas em 3 meses.</p>
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
                  <p className="text-xs text-gray-400 font-mono">2023 – 2025</p>
                </div>
                <div>
                  <p className="font-bold text-sm">Certificação em Pilotagem de Drone</p>
                  <p className="text-xs text-gray-500">Futuriste Drone — São Paulo, SP</p>
                  <p className="text-xs text-gray-400 font-mono">2024</p>
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
                  <span className="text-gray-500">Intermediário / Avançado (Wizard W8)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Espanhol</span>
                  <span className="text-gray-500">Intermediário</span>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-2">Internacional</h2>
                <p className="text-sm text-gray-700">17 países visitados. Viagens frequentes a negócios. Experiência com ambientes multiculturais.</p>
              </div>
            </section>
          </div>

          {/* ── COMPETÊNCIAS TÉCNICAS ──────────────── */}
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 mb-3">Competências Técnicas</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Frontend</p>
                <p className="text-gray-700">HTML · CSS · JavaScript · React · Tailwind CSS · UI/UX Design</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Backend</p>
                <p className="text-gray-700">Node.js · REST APIs · Lógica de Sistemas · Autenticação JWT</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Banco de Dados</p>
                <p className="text-gray-700">MySQL · SQL · Modelagem Relacional · Integração Multi-CNPJ</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Ferramentas</p>
                <p className="text-gray-700">Git · GitHub · VS Code · Figma · Marketplaces Digitais</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Outros</p>
                <p className="text-gray-700">Edição de vídeo e foto · Fotografia de produto · Pilotagem de drone</p>
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wide text-gray-500 mb-1">Soft Skills</p>
                <p className="text-gray-700">Autonomia · Visão analítica · Identificação de gaps · Liderança técnica</p>
              </div>
            </div>
          </section>

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
