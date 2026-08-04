# Changelog

All notable changes to the Enterprise Operations Platform.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/).

> ⚠️ **Benjamin — preencha com o histórico real.** Eu não tenho as datas nem a ordem em que os
> módulos entraram. O único fato que tenho é que o sistema entrou em produção em 2026 com os
> cinco módulos funcionando.
>
> Se você não lembra das datas exatas, use apenas mês/ano, ou consolide em menos versões.
> **Um changelog curto e verdadeiro vale mais que um longo e reconstruído.**
> `git log` do repositório privado provavelmente te dá a linha do tempo real.

---

## [Unreleased]

### In progress
- AI digital workforce — agents automating repetitive administrative workflows, integrated with the platform's existing data

### Planned
See [ROADMAP.md](ROADMAP.md).

---

## [1.0.0] — 2026-<!-- MM -->

First production release. Replaced spreadsheet-based inventory control across three legal entities.

### Added
- **Multi-entity inventory control** — entry, exit and transfer between legal entities with full movement traceability (product, date, responsible user)
- **Real-time operations dashboard** — consolidated and per-entity stock views, minimum-level alerts, movement indicators
- **Automated pricing** — cubic-weight calculation integrated with the freight table, replacing manual computation
- **Internal chat** — real-time messaging over WebSocket
- **Role-based access control** — three tiers (operations, sales, administration) shaping both API permissions and navigation
- Custom design system and reusable React component library

### Impact
- Price quoting: 10–15 minutes → under 30 seconds
- Inventory counting: 60% faster
- Paid third-party messaging platform: removed
- Adoption: 100% of the operations team

---

<!--
ENTRADAS A RECONSTRUIR — exemplos de formato, apague os que não se aplicam:

## [1.1.0] — 2026-MM
### Added
- <feature>
### Changed
- <mudança de comportamento>
### Fixed
- <bug corrigido — especialmente os que apareceram em produção>

## [0.9.0] — 2026-MM — Beta interno
### Added
- <o que existia antes do lançamento oficial>
### Changed
- <o que mudou depois do feedback da equipe — estas são as entradas mais interessantes,
   porque mostram que o sistema respondeu a uso real>
-->

---

## Como manter daqui em frente

Uma entrada por release. Agrupe em `Added` / `Changed` / `Deprecated` / `Removed` / `Fixed` / `Security`.

Registre o **efeito**, não o commit:

| ❌ | ✅ |
|---|---|
| `Refactored StockTable component` | `Stock table now loads 500+ items without freezing` |
| `Fixed bug in pricing` | `Fixed cubic-weight rounding that under-quoted freight on items under 1 kg` |

> Um changelog cujas entradas descrevem consequências para o usuário mostra que você pensa em
> quem usa o sistema. Um que lista refactors mostra que você pensa em código. A primeira é rara.
