"use client";

import { useEffect, useState } from "react";

const sections = [
  {
    id: "headline",
    label: "Headline",
    content: `Full Stack Developer & System Architect | Técnico em TI | Criador de Sistemas Empresariais | Marketing Digital | Zenith Lacres`,
  },
  {
    id: "about",
    label: "About / Sobre",
    content: `Desenvolvedor Full Stack com formação técnica em TI (UNASP-EC, 2025) e cursando Sistemas de Informação (conclusão prevista para 2029).

Aos 18 anos, tenho 3 anos de atuação real na Zenith Lacres — empresa com 22 anos no mercado — onde atuei em tecnologia, operações, marketing digital e estratégia comercial.

Principais entregas:
→ Criei plataforma interna de gestão (controle de estoque multi-CNPJ, chat corporativo, tabela de preços e cubagem)
→ Implementei empresa em marketplaces (Mercado Livre, Shopee, Amazon, Magalu, TikTok Shop): R$0 → R$10.000 em 3 meses
→ Conduzi rebranding completo da identidade visual, website e mídias sociais
→ TCC do curso técnico desenvolvido 100% de forma autônoma — design, frontend e backend
→ Cobertura aérea profissional na Porsche Carrera Cup como operador de drone certificado

Stack: React · JavaScript · Node.js · MySQL · HTML/CSS · Figma · REST APIs

Penso como arquiteto: antes de escrever código, entendo o sistema, mapeio os gaps e projeto a solução certa.

🌎 17 países visitados. PT nativo · EN avançado · ES intermediário.
📍 Engenheiro Coelho – SP | Aberto a oportunidades híbridas e remotas.`,
  },
  {
    id: "exp-zenith",
    label: "Experiência — Zenith Lacres",
    content: `Zenith Lacres
Desenvolvedor Full Stack & Marketing Digital
Março 2023 – Presente · 3 anos

Engenheiro Coelho, SP (Presencial / Híbrido)

Empresa com 22 anos de atuação no setor industrial.

Tecnologia & Sistemas:
• Desenvolvi plataforma interna completa: controle de estoque unificado para 3 CNPJs, chat corporativo interno, tabela de preços com cubagem automática e painel de gestão
• Stack utilizada: React, Node.js, MySQL, WebSocket, REST API
• Sistema lançado em 2026, em produção ativa

Marketing & Crescimento:
• Reestruturei a identidade visual completa da empresa (logo, cores, tipografia, aplicações)
• Reformulei website e presença em mídias sociais (Instagram, Facebook)
• Implementei catálogo em 5 marketplaces: crescimento de R$0 para R$10.000 em vendas em 3 meses
• Montei estúdio interno de fotografia de produtos

Operações:
• Atuei nos setores de expedição, produção, vendas e administrativo
• Mapeei gaps operacionais e propus soluções sistêmicas
• Participei de análise tributária e fiscal`,
  },
  {
    id: "exp-drone",
    label: "Experiência — Drone",
    content: `Operador de Drone Profissional — Freelancer
2024 – 2025

• Cobertura aérea oficial na Porsche Carrera Cup
• Serviços para setores imobiliário, hoteleiro e turístico
• Edição profissional de foto e vídeo para entrega final
• Certificação em pilotagem pela Futuriste Drone (São Paulo – SP)`,
  },
  {
    id: "project-erp",
    label: "Projeto — ERP Zenith",
    content: `Plataforma Interna de Gestão — Zenith Lacres
2025–2026

Problema identificado: a empresa operava com 3 CNPJs no mesmo local físico, causando conflitos de estoque, falta de rastreabilidade de movimentações, custos elevados com comunicação via plataformas externas e ausência de tabela de preços centralizada.

Solução desenvolvida:
→ Sistema web interno com autenticação e controle de acesso por nível
→ Módulo de estoque unificado com movimentações entre CNPJs
→ Chat corporativo interno eliminando custo com Meta Business
→ Tabela de preços com cálculo automático de cubagem
→ Painel de gestão com visibilidade em tempo real

Stack: React · Node.js · MySQL · WebSocket · REST API · JWT

Resultado: sistema lançado em 2026, em uso ativo. Controle operacional completo.`,
  },
];

export default function LinkedIn() {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    document.title = "LinkedIn — Benjamin Maciel";
  }, []);

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-[760px] mx-auto">

        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-mono text-[#00d4ff] text-xs uppercase tracking-[0.15em] mb-1">LinkedIn Toolkit</p>
            <h1 className="text-3xl font-black">Benjamin Maciel</h1>
            <p className="text-[#8b949e] text-sm mt-1">Copie e cole cada seção diretamente no seu perfil</p>
          </div>
          <a href="/" className="font-mono text-xs text-[#8b949e] hover:text-[#00d4ff] transition-colors border border-[rgba(255,255,255,0.07)] px-3 py-2 rounded-lg">
            ← Portfolio
          </a>
        </div>

        <div className="flex flex-col gap-5">
          {sections.map((s) => (
            <div key={s.id} className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
                <span className="font-mono text-xs text-[#00d4ff] uppercase tracking-[0.1em]">{s.label}</span>
                <button
                  onClick={() => copy(s.id, s.content)}
                  className={`font-mono text-xs px-3 py-1 rounded border transition-all ${
                    copied === s.id
                      ? "border-[#00ff88] text-[#00ff88] bg-[rgba(0,255,136,0.08)]"
                      : "border-[rgba(255,255,255,0.1)] text-[#8b949e] hover:border-[#00d4ff] hover:text-[#00d4ff]"
                  }`}
                >
                  {copied === s.id ? "✓ Copiado!" : "Copiar"}
                </button>
              </div>
              <pre className="px-5 py-4 text-sm text-[#c9d1d9] whitespace-pre-wrap leading-relaxed font-sans">
                {s.content}
              </pre>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl border border-[rgba(0,212,255,0.15)] bg-[rgba(0,212,255,0.04)]">
          <p className="font-mono text-xs text-[#00d4ff] uppercase tracking-[0.1em] mb-2">Links importantes</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="https://github.com/BenjaminCoder0814" target="_blank" rel="noopener noreferrer"
              className="text-[#8b949e] hover:text-white transition-colors">🐙 github.com/BenjaminCoder0814</a>
            <a href="/" className="text-[#8b949e] hover:text-white transition-colors">🌐 Portfolio Online</a>
            <a href="/curriculo" className="text-[#8b949e] hover:text-white transition-colors">📄 Currículo PDF</a>
          </div>
        </div>

      </div>
    </div>
  );
}
