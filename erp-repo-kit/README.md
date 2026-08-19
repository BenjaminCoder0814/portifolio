# Enterprise Operations Platform

An internal ERP that replaced spreadsheet-based inventory control for a manufacturer operating three legal entities out of a single warehouse. In production since 2026, used daily by the entire operations team.

<!-- TODO: hero screenshot or 10s GIF of the dashboard goes here. This is the single
     highest-value thing in this README — a reader decides in 5 seconds whether to keep going. -->
![Dashboard](docs/media/dashboard.png)

```
React · Vite · Node.js · Express · Prisma · PostgreSQL · Firebase · JWT
```

---

## The problem

Zenith Lacres is an industrial sealing manufacturer that runs **three separate legal entities out of one physical warehouse**. The same shelf holds stock belonging to three different companies, and every movement has to be attributed to the right one.

That was being managed in disconnected spreadsheets:

- **No traceability.** A product could leave the warehouse with no record of which entity owned it, who moved it, or when.
- **Conflicting transfers.** Stock moved between entities was often recorded on one side only, so the two sheets disagreed and neither was trusted.
- **Slow quoting.** Pricing required manually computing cubic weight against a freight table — 10 to 15 minutes per quote, with the customer waiting.
- **Recurring cost.** Internal communication ran on a paid third-party platform.

The users are warehouse operators and salespeople. Not technical, and not willing to learn a complex tool.

## What it does

| Module | What it solves |
|---|---|
| **Multi-entity inventory** | Entry, exit and transfer between entities with full traceability — every movement attributed, auditable, reversible |
| **Real-time dashboard** | Consolidated and per-entity stock views, minimum-level alerts, live movement indicators |
| **Automated pricing** | Cubic-weight calculation integrated with the freight table — instant quotes |
| **Internal chat** | Real-time messaging on Firebase Firestore, replacing a paid external platform |
| **Role-based access** | Three tiers — operations, sales, administration — shaping both API permissions and navigation |

## Impact

| | Before | After |
|---|---|---|
| Stock traceability | None | Every movement recorded and auditable |
| Price quoting | 10–15 min, manual | **Under 30 seconds** |
| Inventory counting | Baseline | **60% faster** |
| Internal communication | Paid third-party platform | In-house, no recurring cost |
| Adoption | — | **100% of the operations team** |

## Architecture

Single-Page Application over a decoupled REST API, with a Firestore for anything real-time.

```
┌──────────────┐   REST      ┌──────────────┐
│  React SPA   │ ──────────► │  Express API │ ──────► PostgreSQL
│  TypeScript  │             │   JWT auth   │        (entity-scoped)
└──────┬───────┘             └──────┬───────┘
       │        Firestore           │
       └────────────────────────────┘
        stock updates · internal chat
```

The core design decision is in the data model: entities are separated at the row level, so each legal entity keeps a clean, legally distinct ledger while administration can roll up to a consolidated view from the same source of truth.

**→ [Full architecture](docs/ARCHITECTURE.md)** · **[Decision records](docs/DECISIONS.md)** · **[Technical challenges](docs/CHALLENGES.md)**

## Running locally

<!-- TODO: verify these commands actually work from a clean clone before publishing.
     A README with commands that fail is worse than no README. -->

```bash
git clone https://github.com/BenjaminCoder0814/enterprise-operations-platform
cd enterprise-operations-platform

# Front end
cd client && npm install && npm run dev

# API (mock data — no production credentials in this repo)
cd ../server && npm install && npm run dev
```

Seed data is mocked. Production data, credentials and company-specific business rules are not included in this repository.

## Repository scope

This repository contains the **front end and a mock API** for demonstration. The production deployment runs on the company's internal infrastructure and is not public.

## Documentation

| | |
|---|---|
| [Architecture](docs/ARCHITECTURE.md) | System design, data model, real-time layer, auth |
| [Engineering decisions](docs/DECISIONS.md) | Why React, REST, JWT, Firestore, PostgreSQL — and what was rejected |
| [Technical challenges](docs/CHALLENGES.md) | The hard problems and how they were solved |
| [Engineering journal](docs/ENGINEERING-JOURNAL.md) | What went wrong, what changed, what I'd do differently |
| [Changelog](CHANGELOG.md) | Release history |
| [Roadmap](ROADMAP.md) | What's next and why |

---

Built and maintained by [Benjamin Maciel](https://benjaminmaciel.com.br) — specified, architected and shipped solo.
