# Engineering Decisions

Architecture Decision Records for the Enterprise Operations Platform. Each record states the
context, the decision, what was rejected, and the consequence — including the bad ones.

> ⚠️ **Benjamin — leia antes de publicar.** Estes ADRs foram redigidos a partir do que está
> documentado na sua página `/erp`. O raciocínio foi **reconstruído**, não ditado por você.
> Leia cada um e corrija onde o motivo real foi diferente. Um ADR que descreve um raciocínio
> que não foi o seu é uma armadilha: você vai ter que defendê-lo em entrevista.
>
> Onde aparecer `[VERIFICAR]`, a afirmação é uma dedução minha que você precisa confirmar ou corrigir.

---

## ADR-001 — Build in-house instead of licensing an ERP

**Status:** Accepted · **Date:** 2025

### Context
The company needed inventory control across three legal entities sharing one warehouse. The default option was licensing an off-the-shelf ERP.

### Decision
Build the system in-house.

### Alternatives considered

| Option | Rejected because |
|---|---|
| Off-the-shelf ERP | Models a single company. Three entities sharing physical stock but staying legally separate is not a configuration option — it's a data model decision |
| Spreadsheets + discipline | Already the status quo, already failing. The failure was structural, not behavioral |
| Off-the-shelf + customization | Vendor-dependent, paid per change, and still built on the wrong core model |

### Consequences
**Good:** exact process fit; no per-seat licensing; changes ship the same week they're needed; no vendor lock-in.

**Bad:** the company now depends on one developer for its operational system. That is a real, unmitigated risk — see [Roadmap](../ROADMAP.md) for the documentation and handover work that addresses it.

---

## ADR-002 — Single-Page Application over a decoupled REST API

**Status:** Accepted

### Context
Warehouse operators check stock dozens of times a day. Sales staff price items while a customer waits on the phone.

### Decision
React SPA in the browser; Node.js/Express REST API on the server; no server-rendered pages.

### Alternatives considered
- **Server-rendered pages** — a full page load per stock lookup. At the frequency these users query, that is unusable.
- **Monolith with templating** — simpler to deploy, but couples the interface to the server and makes the real-time layer awkward.

### Consequences
**Good:** stock lookups feel instant; the API is reusable by anything else that needs it later (including the AI automation layer).

**Bad:** two deployables instead of one. No SEO — irrelevant here, it's an internal tool behind auth.

---

## ADR-003 — TypeScript on the front end

**Status:** Accepted

### Context
The system handles stock quantities, entity attribution and price calculations. A wrong type in any of those is a wrong number in a warehouse or an invoice.

### Decision
TypeScript for the front-end codebase.

### Alternatives considered
- **Plain JavaScript** — faster to write initially. Rejected: with a single developer and no QA team, the compiler is the only reviewer available.

### Consequences
**Good:** shape mismatches between API responses and UI are caught at build time rather than by an operator seeing a wrong number.

**Bad:** slower initial development. `[VERIFICAR]` — parts of the codebase are typed more loosely than others; be honest about this if asked.

---

## ADR-004 — MySQL with row-level entity attribution

**Status:** Accepted · **This is the most important decision in the system**

### Context
Three legal entities share one physical warehouse. Each needs a legally distinct ledger. Administration needs one consolidated view. Stock physically moves between entities.

### Decision
A single relational database where every stock record and every movement carries an entity identifier. Queries scope to one entity or roll up across all.

### Alternatives considered

| Option | Rejected because |
|---|---|
| One database per entity | Transfers between entities become cross-database transactions. Consolidated views require joining across databases. Backup and migration triple in complexity |
| No entity separation, tag-only | Legal separation would depend on discipline in the application layer. One bug and the ledgers are wrong in a way that matters to an auditor |
| NoSQL / document store | Stock movement is inherently relational and transactional. Wrong tool |

### Consequences
**Good:** transfers are a single transaction. Consolidated and per-entity views come from the same source of truth, so they cannot disagree.

**Bad:** every query must be entity-aware. Forgetting the entity filter is the single most dangerous class of bug in this codebase — it silently returns another company's data. `[VERIFICAR]` — describe how you guard against this today (query helper? repository layer? code review?). If you don't guard against it systematically, say so and put it in the Roadmap. That answer is more impressive than a fake one.

---

## ADR-005 — WebSocket for real-time stock and chat

**Status:** Accepted

### Context
Two people looking at the same stock number must see the same value. An operator recording a movement and a salesperson quoting a price can be working simultaneously. Internal communication was running on a paid external platform.

### Decision
A WebSocket channel carrying both stock movement broadcasts and internal chat.

### Alternatives considered
- **Polling** — every client hitting the API on a timer. Rejected: latency proportional to the interval, and load proportional to users × frequency for data that changes rarely.
- **Server-Sent Events** — one-directional. Works for stock broadcasts, not for chat.
- **Keep the paid chat platform** — recurring cost, no control, and no path to integrating chat with stock events.

### Consequences
**Good:** the numbers on screen are trustworthy, which is what made operators adopt the system. Chat cost eliminated.

**Bad:** connection state is now something the front end must handle — reconnection, missed messages during a drop, stale state on resume. `[VERIFICAR]` — document what actually happens today when a client loses connection. If the answer is "it doesn't handle it well," write that. See [Challenges](CHALLENGES.md).

---

## ADR-006 — JWT with three permission tiers

**Status:** Accepted

### Context
Three distinct user groups with genuinely different needs: warehouse/production, sales, administration. Operators seeing pricing data or administrative reports is both a security issue and a usability one.

### Decision
JWT authentication carrying a role claim. Three tiers: **operations**, **sales**, **administration**. The role shapes both API authorization and the navigation the user sees.

### Alternatives considered
- **Server-side sessions** — would work. Rejected: with a decoupled API, a stateless token avoids shared session storage. `[VERIFICAR]` — confirm this was your reasoning.
- **Two tiers (user/admin)** — too coarse. Sales and operations need genuinely different screens.
- **Per-permission ACL** — more flexible, more complexity than three well-understood roles justify.

### Consequences
**Good:** each role sees a smaller interface, which for non-technical users is a usability gain as much as a security one.

**Bad:** JWTs can't be revoked before expiry without extra machinery. `[VERIFICAR]` — what is the token lifetime, and what happens when someone leaves the company today?

---

## ADR-007 — Custom design system instead of a component library

**Status:** Accepted

### Context
The users are warehouse operators and salespeople who need high information density on screen — hiding data behind navigation costs time when someone is standing in a warehouse. As a single developer, every UI decision re-made from scratch is time not spent on features.

### Decision
Build a small design system and reusable React component library specific to this application.

### Alternatives considered
- **Material UI / Ant Design / Chakra** — faster to start. Rejected `[VERIFICAR]`: these are optimized for comfortable spacing and consumer-style density, which fights the requirement here. Confirm whether this was your actual reason, or whether it was bundle size, learning curve, or preference — any of those is a legitimate answer, but say the true one.

### Consequences
**Good:** every module ships against the same components; an operator who learns one screen can use the next. New modules don't re-litigate what a table or an alert looks like.

**Bad:** everything is maintained by one person, including accessibility and cross-browser behavior that a mature library would have handled. `[VERIFICAR]` — be honest about accessibility coverage. "Not addressed yet" is a fine answer for an internal tool; claiming WCAG compliance you haven't tested is not.

---

## Template for new records

```markdown
## ADR-NNN — Title

**Status:** Proposed | Accepted | Superseded by ADR-XXX · **Date:**

### Context
What was true when this decision was made.

### Decision
What was chosen.

### Alternatives considered
What was rejected, and why.

### Consequences
Good and bad. Especially bad.
```
