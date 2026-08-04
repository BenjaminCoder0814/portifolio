# AUDITORIA DO PORTFÓLIO — benjaminmaciel.com.br

Auditoria feita no código: `src/sections/Hero.tsx`, `src/app/[lang]/page.tsx`,
`src/i18n/en.json`, `src/middleware.ts`, `src/app/erp/page.tsx`.

---

## 🐛 BUG REAL — encontrado no código

`src/i18n/en.json` define **`about.bio3` duas vezes** (linhas 48 e 49). O segundo valor
sobrescreve o primeiro no parse do JSON. Resultado: este parágrafo **nunca é renderizado**:

> *"I'm 18, hold a technical IT degree, and have hands-on experience in a real business
> environment. I've worked on interface development, marketplace structuring, internal systems,
> and operational improvements..."*

Só aparece o segundo:

> *"Focus on performance, usability, and conversion. Every CSS line and every React component
> exists for a reason."*

Verifique se `pt.json` e `es.json` têm a mesma duplicação. Independentemente do conteúdo novo,
**isto é um bug de dados que precisa ser corrigido**.

---

## 🔴 Problemas críticos de posicionamento

### 1. A Hero rotaciona 4 identidades — e três estão erradas

`en.json` → `hero.roles`:
```json
["Front-End Developer", "UI/UX Designer", "Digital Marketing", "System Architect"]
```

Um recrutador que abre seu site vê "Digital Marketing" girando na tela. É exatamente a diluição
que estamos combatendo há quatro rodadas. **Deve ser:**

```json
["Front-End Developer", "Internal Systems Developer", "Business Software Engineer", "AI Automation"]
```

### 2. A idade aparece duas vezes na primeira dobra

`Hero.tsx:145` renderiza `Age // 18 years old`, e `hero.tagline2` repete
`"18 years old • Brazil • Global mindset"`.

Para um recrutador nos EUA isso é duplamente ruim: **compliance de RH evita ativamente ver
idade** (risco de discriminação), e 18 anos comunica inexperiência antes de o trabalho falar.
Seu trabalho é impressionante *e depois* a idade impressiona. Na ordem inversa, ela desqualifica.

**Remova o campo `Age` da Hero.** Mantenha em "Know Me", lá embaixo, se quiser — ali funciona
como reforço, não como filtro.

### 3. Projetos é a 6ª seção

`src/app/[lang]/page.tsx` → ordem atual:
```
Hero → About → EngineeringMindset → Formation → TechStack → Projects → CaseStudy → KnowMe → Now → Contact
```

O recrutador precisa passar por 5 seções antes de ver uma linha de trabalho real. **Ordem
recomendada:**
```
Hero → Projects → CaseStudy(ERP) → EngineeringMindset → TechStack → About → Formation → KnowMe → Now → Contact
```

Trabalho primeiro. Biografia depois. Quem quiser saber quem você é, rola.

### 4. O único "Case Study" do portfólio é de marketing

`en.json` → `casestudy` é **"Marketplace Growth — Zenith Lacres"**, sobre rebranding e
marketplaces. Seu case study em destaque não é técnico.

Isso precisa ser **o ERP**. Você já tem uma página excelente em `/erp` — ela está desconectada
da narrativa principal, acessível só pelo rodapé. **Promova o ERP a case study principal na home**
e rebaixe o de marketplace para um card secundário, ou remova.

`CASE-STUDY-ERP.md` já está escrito em inglês e pronto para virar o conteúdo dessa seção.

### 5. Nada sobre IA. Nada sobre o cargo de Diretor

Seu portfólio inteiro está desatualizado em relação ao seu posicionamento atual. Não há uma
palavra sobre a iniciativa de IA nem sobre o cargo de Director of Information Technology. `now`
ainda diz *"Updated February 2026"*.

### 6. Tags de projeto por categoria, não por tecnologia

`projects.items[1].tags` → `["Figma", "Digital Marketing", "UI/UX"]`

Um recrutador escaneando cards de projeto procura **tecnologias**. Toda tag deve ser stack:
`React.js` `TypeScript` `Node.js` `MySQL` `WebSocket` `REST API`.

---

## 🟠 Problemas médios

### 7. Idioma padrão é português

`middleware.ts:21` → `return 'pt'` quando não há `accept-language` reconhecido. Navegadores
normais enviam o header, então na prática um recrutador americano cai em `/en` — mas o fallback
deveria ser `en` para um site cujo objetivo é recrutamento internacional.

### 8. "3+ years of experience" e "13 countries" como stats de mesmo peso

`about.stats` coloca `3+ anos`, `R$10k`, `13 países` e `100% projetos entregues` lado a lado, no
mesmo tamanho. `13 countries` e `100% projects delivered` não são métricas de engenharia — a
segunda é impossível de verificar e soa inflada.

**Substitua por métricas do sistema:** `100% adoção da equipe`, `3 entidades unificadas`,
`15 min → 30 s`, `60% inventário mais rápido`.

O "13 países" **pode ficar no portfólio** — mas em "Know Me", como *international exposure*,
não como estatística de carreira.

### 9. R$ como unidade principal

`R$10k` num stat card não significa nada para um recrutador estrangeiro. Se mantiver, contextualize.

### 10. Meta / SEO

Verifique `layout.tsx`: título, meta description e Open Graph precisam estar em inglês com as
keywords principais. Quando um recrutador googla seu nome, o snippet precisa dizer
"Front-End Developer · React.js · TypeScript".

---

## ✅ O que está bom e deve ficar

- **A página `/erp`** é o melhor ativo do portfólio. Estrutura de case study real, decisões
  arquiteturais explicadas, impacto quantificado. Só está escondida.
- **`EngineeringMindset`** — as 4 cards (Problem Identification → Solution Structuring →
  Performance First → UX + Conversion) comunicam processo de engenharia. Mantenha.
- **`TechStack`** com *"o que uso, por que uso, e o que construo com cada tecnologia"* — isso é
  raro e bom. A maioria dos portfólios lista logos.
- **Trilíngue com rotas internacionalizadas** — é uma demonstração técnica real, não decoração.
- **Badge "Available for Front-End Opportunities"** — direto e útil.

---

## 🎯 HERO SECTION — reescrita completa

### Diagnóstico

A hero atual gasta a primeira dobra em: saudação, nome gigante, cargo rotativo (com marketing),
idade, localização, status online, e uma tagline genérica —
*"Front-End Developer focused on performance, usability and real business impact."*

Essa frase pode ser dita por qualquer um dos 50.000 devs React júnior do mercado. **Nada na sua
primeira dobra é seu.**

### Princípio da reescrita

> A primeira dobra não deve dizer o que você **é**. Deve dizer o que você **construiu**.

Ninguém contrata "focused on performance and usability". Contrata-se quem construiu o sistema
que uma empresa usa todo dia.

### Copy proposta

```
[badge]      ● Available for Front-End Opportunities

[greeting]   Hi, I'm

[name]       BENJAMIN
             MACIEL

[roles ~$]   Front-End Developer
             Internal Systems Developer
             Business Software Engineer
             AI Automation

[headline]   I build the internal systems companies run on.

[subline]    Front-End Developer working in React.js and TypeScript. I built and shipped
             the ERP my company's daily operation runs on — used by the entire operations
             team across three legal entities. Now leading its AI automation.

[meta]       Brazil · Open to relocation  ·  Director of IT @ Zenith Lacres  ·  ● Available

[CTAs]       [ See the system I built ]   [ View Resume ]   [ Get in Touch ]
```

### O que muda e por quê

| Mudança | Motivo |
|---|---|
| Sai `Age // 18 years old` | Filtro de compliance nos EUA; comunica inexperiência antes do trabalho |
| Sai `Digital Marketing` e `UI/UX Designer` dos roles | Dilui o posicionamento na primeira dobra |
| Entra headline `"I build the internal systems companies run on."` | Afirmação concreta e memorável. Ninguém mais no mercado júnior pode dizer isso |
| Subline cita **um sistema real** em vez de adjetivos | Prova em vez de declaração |
| CTA principal vira **"See the system I built"** | `"View Projects"` é genérico. Este desperta curiosidade e leva direto ao ERP |
| Entra `Director of IT @ Zenith Lacres` no meta | Credibilidade imediata, sem parecer executivo (vem junto de "Front-End Developer") |
| Sai `Status // Online ●` | Não significa nada para um recrutador |

### O teste dos 5 segundos

Leia só o que está em negrito na copy proposta:

> **BENJAMIN MACIEL** · **Front-End Developer** · **I build the internal systems companies run on.**
> · **See the system I built**

Isso responde "quem é, o que faz, e por que eu deveria continuar lendo" em uma respiração.
A hero atual, no mesmo tempo, responde: "Benjamin Maciel, 18 anos, faz várias coisas."

---

## Ordem de execução recomendada

| # | Ação | Impacto | Esforço |
|---|---|---|---|
| 1 | Corrigir o `bio3` duplicado no JSON | 🔴 bug | 2 min |
| 2 | Trocar `hero.roles` para as 4 identidades corretas | 🔴 alto | 5 min |
| 3 | Remover idade da Hero | 🔴 alto | 5 min |
| 4 | Nova headline + subline da Hero | 🔴 alto | 15 min |
| 5 | Mover `Projects` e `CaseStudy` para logo depois da Hero | 🔴 alto | 10 min |
| 6 | Trocar o Case Study de marketplace pelo ERP | 🔴 alto | 30 min |
| 7 | Tags de projeto por tecnologia | 🟠 médio | 10 min |
| 8 | Adicionar IA e cargo de Diretor ao conteúdo | 🟠 médio | 30 min |
| 9 | Stats por métricas de sistema | 🟠 médio | 15 min |
| 10 | Remover Angular/PHP/Laravel/PHPUnit/Azure dos i18n | 🟠 médio | 10 min |
| 11 | Meta tags em inglês | 🟠 médio | 15 min |
| 12 | Botão "Download Resume (ATS)" | 🟡 baixo | 20 min |
| 13 | Fallback de idioma → `en` | 🟡 baixo | 2 min |
