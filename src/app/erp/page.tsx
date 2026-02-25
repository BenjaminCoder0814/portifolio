"use client";

import { useEffect } from "react";

const sections = [
  {
    label: "Contexto & Problema",
    icon: "🔍",
    color: "#00d4ff",
    content: [
      "A Zenith Lacres é uma empresa com 22 anos de mercado no setor de lacres industriais, operando com três CNPJs distintos dentro da mesma estrutura física.",
      "O cenário encontrado apresentava falhas críticas de gestão: ausência de rastreabilidade de estoque entre CNPJs, movimentações manuais registradas em planilhas desconectadas, conflitos de entrada e saída de produtos entre as três entidades jurídicas, e dependência de plataformas externas pagas para comunicação interna.",
      "Adicionalmente, não havia uma tabela de preços centralizada com cálculo de cubagem automatizado — o que impactava diretamente na precificação rápida e no atendimento ao cliente.",
    ],
  },
  {
    label: "Solução Arquitetural",
    icon: "🏗️",
    color: "#7c3aed",
    content: [
      "A arquitetura foi projetada como uma SPA (Single Page Application) com backend desacoplado via REST API, priorizando baixa latência nas consultas de estoque e comunicação em tempo real via WebSocket para o módulo de chat.",
      "O banco de dados relacional MySQL foi modelado com separação de entidades por CNPJ, permitindo visibilidade unificada e também isolada por empresa. A autenticação é baseada em JWT com controle de acesso por nível de permissão, garantindo que cada colaborador veja apenas o que é relevante à sua função.",
      "A interface foi construída com React e design system próprio, priorizando densidade de informação sem sacrificar usabilidade — dado que os usuários são operadores de expedição e vendas sem perfil técnico.",
    ],
  },
  {
    label: "Funcionalidades Implementadas",
    icon: "⚙️",
    color: "#00ff88",
    content: null,
    list: [
      { title: "Controle de Estoque Multi-CNPJ", desc: "Movimentações de entrada, saída e transferência entre CNPJs com rastreabilidade completa. Histórico de movimentações por produto, data e responsável." },
      { title: "Chat Corporativo Interno", desc: "Comunicação em tempo real (WebSocket) entre colaboradores da empresa, eliminando dependência e custo de plataformas externas como WhatsApp Business e Meta Business." },
      { title: "Tabela de Preços com Cubagem Automática", desc: "Cálculo automatizado de cubagem (volume × peso) integrado à tabela de preços, permitindo precificação instantânea por produto e modalidade de frete." },
      { title: "Painel de Gestão Operacional", desc: "Dashboard com visão em tempo real do estoque consolidado e por CNPJ, alertas de nível mínimo e indicadores de movimentação." },
      { title: "Controle de Acesso por Perfil", desc: "Três níveis de acesso: Operador (expedição/produção), Comercial (vendas/preços) e Administrativo (visão total + relatórios)." },
    ],
  },
  {
    label: "Stack Técnica",
    icon: "🛠️",
    color: "#00d4ff",
    content: null,
    stack: [
      { category: "Frontend", items: ["React", "JavaScript (ES6+)", "CSS Modules / Tailwind", "Axios", "WebSocket (cliente)"] },
      { category: "Backend", items: ["Node.js", "Express.js", "REST API", "WebSocket (Server)", "JWT Auth"] },
      { category: "Banco de Dados", items: ["MySQL", "Modelagem Relacional", "Queries Multi-CNPJ", "Migrations"] },
      { category: "Infraestrutura", items: ["Deploy interno (servidor local Windows)", "Scripts de backup automatizado", "Git / GitHub (controle de versão)"] },
    ],
  },
  {
    label: "Impacto Empresarial",
    icon: "📈",
    color: "#00ff88",
    content: null,
    list: [
      { title: "Rastreabilidade total", desc: "Eliminação de conflitos entre CNPJs. Toda movimentação registrada, auditável e reversível." },
      { title: "Redução de custos operacionais", desc: "Substituição de plataformas de comunicação pagas por chat interno proprietário." },
      { title: "Agilidade comercial", desc: "Precificação via cubagem passou de manual (10–15 min) para instantânea < 30 segundos." },
      { title: "Profissionalização interna", desc: "Operadores com acesso a dados em tempo real, reduzindo erros humanos de expedição estimados em 30%+ por gestão visual dos processos." },
      { title: "Sistema em produção ativa", desc: "Lançado em 2026, em uso contínuo com adoção de 100% da equipe operacional." },
    ],
  },
  {
    label: "Contexto do Desenvolvedor",
    icon: "👤",
    color: "#7c3aed",
    content: [
      "O sistema foi idealizado, arquitetado e desenvolvido integralmente por Benjamin Maciel — 18 anos — sem equipe externa, sem terceirização de desenvolvimento.",
      "A decisão de construir o sistema internamente (vs. contratar ERP de mercado) foi estratégica: redução de custo, aderência total ao processo da empresa e capacidade de evolução contínua sem dependência de fornecedor.",
      "O projeto representa a convergência entre experiência operacional real (3 anos dentro da empresa) e capacidade técnica de desenvolvimento — permitindo que o arquiteto do sistema fosse também o maior conhecedor do processo que ele modelou.",
    ],
  },
];

export default function ErpPage() {
  useEffect(() => {
    document.title = "Sistema ERP — Benjamin Maciel";
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-[760px] mx-auto">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-mono text-[#00d4ff] text-xs uppercase tracking-[0.15em] mb-1">Documentação Técnica</p>
            <h1 className="text-3xl font-black leading-tight">Plataforma Interna<br />de Gestão Empresarial</h1>
            <p className="text-[#8b949e] text-sm mt-2">Zenith Lacres · ERP Customizado · 2025–2026</p>
          </div>
          <a href="/" className="font-mono text-xs text-[#8b949e] hover:text-[#00d4ff] transition-colors border border-[rgba(255,255,255,0.07)] px-3 py-2 rounded-lg shrink-0">
            ← Portfolio
          </a>
        </div>

        {/* Meta bar */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: "Tipo", value: "ERP Customizado" },
            { label: "Status", value: "Produção Ativa ✓" },
            { label: "Desenvolvedor", value: "Benjamin Maciel (solo)" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] px-4 py-3">
              <p className="font-mono text-[10px] text-[#8b949e] uppercase tracking-[0.1em] mb-1">{m.label}</p>
              <p className="text-sm font-semibold">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((s) => (
            <div key={s.label} className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-[rgba(255,255,255,0.06)]"
                style={{ background: `${s.color}08` }}>
                <span className="text-lg">{s.icon}</span>
                <h2 className="font-bold text-sm" style={{ color: s.color }}>{s.label}</h2>
              </div>

              <div className="px-5 py-4">
                {s.content && (
                  <div className="flex flex-col gap-3">
                    {s.content.map((p, i) => (
                      <p key={i} className="text-sm text-[#c9d1d9] leading-relaxed">{p}</p>
                    ))}
                  </div>
                )}

                {s.list && (
                  <ul className="flex flex-col gap-3">
                    {s.list.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="shrink-0 w-2 h-2 rounded-full mt-[6px]" style={{ background: s.color }} />
                        <div>
                          <span className="text-sm font-semibold">{item.title}: </span>
                          <span className="text-sm text-[#8b949e]">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {s.stack && (
                  <div className="grid grid-cols-2 gap-4">
                    {s.stack.map((cat) => (
                      <div key={cat.category}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#8b949e] mb-2">{cat.category}</p>
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map((tech) => (
                            <span key={tech} className="text-xs px-2 py-1 rounded font-mono"
                              style={{ background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}25` }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-10 flex gap-3">
          <a href="/curriculo" className="flex-1 py-3 rounded-xl border border-[rgba(255,255,255,0.07)] text-center text-sm font-mono text-[#8b949e] hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all">
            📄 Currículo PDF
          </a>
          <a href="/linkedin" className="flex-1 py-3 rounded-xl border border-[rgba(255,255,255,0.07)] text-center text-sm font-mono text-[#8b949e] hover:border-[#7c3aed] hover:text-[#7c3aed] transition-all">
            💼 LinkedIn Kit
          </a>
        </div>

      </div>
    </div>
  );
}
