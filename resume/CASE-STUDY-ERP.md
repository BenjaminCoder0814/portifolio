# Case Study — Internal ERP at Zenith Lacres

**Role:** Sole developer and architect · **Status:** In production, used daily · **Timeline:** 2025 – 2026
**Stack:** React · TypeScript · JavaScript · Node.js · Express.js · Prisma · PostgreSQL · REST API · Firebase · JWT

> Este documento existe para ser enviado como anexo, publicado no GitHub como `README.md` do repositório,
> e usado como base do case study do portfólio. É o mesmo conteúdo em três canais — a base da marca única.

---

## The problem

Zenith Lacres is an industrial sealing manufacturer that operates **three separate legal entities out of a single physical warehouse**. That structure is normal in Brazilian manufacturing and it creates a specific, expensive problem: the same shelf holds stock belonging to three different companies, and every movement has to be attributed correctly.

The company was managing this in disconnected spreadsheets. Concretely, that meant:

- **No traceability.** A product could leave the warehouse without a record of which entity it belonged to, who moved it, or when. Reconciliation was archaeology.
- **Conflicting transfers.** Stock transferred between entities was frequently recorded on one side and not the other, so the two spreadsheets disagreed and nobody knew which was right.
- **Slow quoting.** Pricing required manually calculating cubic weight (volume × weight) against a freight table. A single quote took **10–15 minutes**, with the customer waiting.
- **Recurring cost with no ownership.** Internal communication ran on a paid third-party platform, adding a monthly cost for something the company had no control over.

The people affected were not technical. They were warehouse operators and salespeople who needed information fast and could not be asked to learn a complex tool.

---

## The decision: build vs. buy

The obvious move was to license an off-the-shelf ERP. I evaluated that and chose to build instead. The reasoning:

| Factor | Off-the-shelf ERP | Build in-house |
|---|---|---|
| Multi-entity model | Generic; would need customization or workarounds | Modeled exactly on how the company actually operates |
| Cost | Per-seat licensing, indefinitely | One-time development effort |
| Cubic-weight pricing | Not a standard feature | Core feature, built for this business |
| Evolution | Requires vendor roadmap and paid customization | Changed the same week it's needed |
| Vendor lock-in | High | None |

The deciding factor was the multi-entity requirement. Off-the-shelf systems model *one company*. Modeling three entities that share physical stock but must stay legally separate is not a configuration option — it's a data model decision, and it had to be made correctly from the start.

The strategic bet: **the person who already understood the operation from the inside could model it more accurately than any vendor could**. I had spent two years inside the company before building this.

---

## Architecture

**Single-Page Application over a decoupled REST API.**
The front end is a React SPA; the back end is a Node.js/Express REST API. Decoupling them was deliberate — stock queries needed to be fast and frequent, and a page reload per lookup would have been unusable for warehouse operators checking inventory dozens of times a day.

**Firestore for chat; request/response for everything else.**
Internal chat runs on Firestore. Stock is deliberately not real-time: movements go over the same REST API as everything else, and screens read the balance when they open. The write rate is dozens of movements a day, not dozens a second, so a stateful real-time layer would have been cost without benefit.

**PostgreSQL relational model through Prisma.**
The core design decision. Entities are separated at the data model level — each movement is attributed to a legal entity — while queries can roll up to a consolidated view. This gives administration a single picture of total stock and gives each entity a clean, legally distinct ledger from the same source of truth.

**JWT authentication with three permission tiers.**
- *Operations* — warehouse and production: stock movements, transfers, history
- *Sales* — commercial: pricing, cubic-weight calculation, availability
- *Administration* — full visibility and reporting

Access control shapes the interface, not just the API: each role sees a navigation structure containing only what's relevant to their job. For non-technical users, hiding irrelevant options mattered as much as securing them.

---

## Interface

The users are warehouse operators and salespeople, not software users by trade. That constraint drove every front-end decision.

- **Custom design system and reusable React component library.** Every module ships against the same components, so a warehouse operator who learns one screen can use the next one. It also means new modules ship without re-deciding what a table, a form or an alert looks like.
- **High information density without clutter.** Operators need many numbers on one screen — the alternative is navigation, and navigation costs time when someone is standing in a warehouse. Density was a requirement, so hierarchy and spacing had to do the work that extra screens would otherwise do.
- **Real-time dashboards** with consolidated and per-entity views, minimum-stock alerts, and movement indicators.
- **Pricing interface with automated cubic-weight calculation**, replacing the manual spreadsheet-and-freight-table process.

---

## Impact

| | Before | After |
|---|---|---|
| Stock traceability across entities | None — untraceable movements | Every movement recorded, auditable, reversible |
| Price quoting | 10–15 minutes, manual | **Under 30 seconds** |
| Inventory counting | Baseline | **60% faster** |
| Internal communication | Paid third-party platform | In-house, no recurring cost |
| Adoption | — | **100% of the operations team** |

The system is in **active production** and is the platform the company's daily operation runs on.

---

## What I'd do differently

*(Esta seção é opcional no portfólio, mas é a que mais impressiona engenheiros. Preencha com o que
for verdade para você — abaixo estão as perguntas que você deve responder, não respostas prontas.)*

- Which architectural decision would you reverse today, and why?
- What broke in production that you didn't anticipate?
- What did you build that turned out not to be needed?
- Where is the system hardest to change right now?

> Um engenheiro sênior lendo um case study procura por esta seção. A ausência dela sugere que o
> autor nunca refletiu criticamente sobre o próprio trabalho; a presença dela — mesmo com falhas
> admitidas — sinaliza maturidade técnica. **Não pule esta seção. Escreva você mesmo, com honestidade.**

---

## Ownership

Specified, architected, built and shipped solo — no external team, no outsourced development.
