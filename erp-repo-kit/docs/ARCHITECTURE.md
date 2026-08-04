# Architecture

> Companion to [DECISIONS.md](DECISIONS.md), which explains *why* each of these choices was made.
> This document explains *what* the system is.

---

## System overview

```
                        ┌─────────────────────────────┐
                        │        React SPA            │
                        │        TypeScript           │
                        │                             │
                        │  ┌───────────────────────┐  │
                        │  │  Design system /      │  │
                        │  │  component library    │  │
                        │  └───────────────────────┘  │
                        └───────┬─────────────┬───────┘
                                │             │
                      REST      │             │   WebSocket
                   (CRUD, auth, │             │  (stock events,
                    reporting)  │             │   chat messages)
                                ▼             ▼
                        ┌─────────────────────────────┐
                        │     Node.js / Express       │
                        │                             │
                        │   JWT auth · role guard     │
                        │   REST controllers          │
                        │   WebSocket server          │
                        └──────────────┬──────────────┘
                                       │
                                       ▼
                        ┌─────────────────────────────┐
                        │           MySQL             │
                        │                             │
                        │  every row carries an       │
                        │  entity identifier          │
                        └─────────────────────────────┘
```

<!-- TODO: substituir por um diagrama real (Excalidraw ou Mermaid) exportado como PNG.
     Um diagrama é a primeira coisa que um Engineering Manager olha. -->

---

## Data model

The defining constraint: **three legal entities share one physical warehouse.** Every stock row and every movement carries an entity identifier, which makes two things possible from one source of truth:

- **Per-entity view** — each legal entity has a clean ledger that stands on its own for accounting and audit
- **Consolidated view** — administration sees total stock across all three

Transfers between entities are a single transaction against one database, rather than a distributed operation across three.

<!-- TODO: diagrama ER, mesmo simplificado. Entidades principais:
     legal_entity · product · stock · stock_movement · user · role
     Marque a chave estrangeira de entidade em cada tabela — é o coração do modelo. -->

### The critical invariant

> Every query that touches stock must be entity-aware.

A query missing its entity filter silently returns another company's data. This is the most dangerous class of bug in the system, and it fails quietly rather than loudly.

<!-- TODO: descreva como você protege isso hoje. Camada de repositório? Helper de query?
     Revisão manual? Se hoje não há proteção sistemática, escreva isso e coloque no Roadmap.
     "Sei qual é o risco e ainda não o mitiguei" é uma resposta de engenheiro.
     "Nunca acontece" é uma resposta que não sobrevive a uma pergunta de follow-up. -->

---

## Real-time layer

A single WebSocket connection carries two kinds of traffic:

**Stock events.** When an operator records a movement, connected clients update without a refresh. This is what made the system trustworthy — two people looking at the same screen see the same number, which was never true with spreadsheets.

**Chat messages.** Internal communication between staff, replacing a paid external platform.

### Connection lifecycle

<!-- TODO: documentar o comportamento real:
     - O que acontece quando um cliente perde a conexão?
     - Existe reconexão automática?
     - Mensagens enviadas durante a queda são recuperadas ou perdidas?
     - Ao reconectar, o estoque em tela é revalidado ou fica stale?

     Se a resposta honesta for "reconecta mas pode ficar stale", escreva isso.
     Um engenheiro que conhece as bordas do próprio sistema é mais confiável
     que um que descreve um sistema perfeito. -->

---

## Authentication and authorization

**JWT** carrying a role claim. Three tiers:

| Role | Scope |
|---|---|
| **Operations** | Warehouse and production — stock movements, transfers, movement history |
| **Sales** | Commercial — pricing, cubic-weight calculation, availability |
| **Administration** | Full visibility and reporting |

Authorization is enforced at the API layer and **reflected in the interface**: each role gets a navigation structure containing only what's relevant to their job. For non-technical users, this is a usability decision as much as a security one — a smaller interface is a faster one.

<!-- TODO: token lifetime, refresh strategy (se houver), e o que acontece quando alguém sai da empresa. -->

---

## Front end

### Design system

A small component library specific to this application, covering the primitives every module needs: tables, forms, alerts, modals, navigation, status indicators.

The requirement driving it: **high information density without clutter.** Operators need many numbers on one screen, because the alternative is navigation, and navigation costs time when someone is standing in a warehouse. Density was a requirement, so hierarchy and spacing had to do the work extra screens would otherwise do.

<!-- TODO: listar os componentes reais e os tokens (cores, espaçamento, tipografia).
     Se houver Storybook, linkar — é um sinal muito forte. -->

### Module structure

<!-- TODO: descrever como o código está organizado — por feature? por tipo?
     Mostre a árvore de diretórios de nível 1–2. -->

---

## Deployment

Runs on internal company infrastructure with automated backup scripts. Version control on Git/GitHub.

<!-- TODO: descreva o processo real de deploy hoje. Se for manual, escreva "manual" —
     e coloque a automação no Roadmap. Não invente um pipeline. -->

---

## What this architecture does not do

Being explicit about scope boundaries is part of the design:

- **No multi-tenancy beyond the three entities.** The model is specific to this company's structure, not a generic SaaS tenancy model.
- **No offline mode.** The warehouse has reliable network; offline-first would have been complexity without a problem to solve.
- **No horizontal scaling.** The user count is the company's staff. Designing for scale that will not arrive is a cost, not a feature.

<!-- Esta seção é curta mas vale muito: mostra que você decidiu o que NÃO construir,
     que é metade do trabalho de arquitetura. -->
