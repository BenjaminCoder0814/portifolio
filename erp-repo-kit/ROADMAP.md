# Roadmap

What's next for the Enterprise Operations Platform, and why.

> **Why publish a roadmap.** It shows how you prioritize — which is a different skill from
> building. A roadmap that lists only features says "I build what's asked." A roadmap that
> includes paying down known risk says "I understand what I built and where it's weak."
>
> ⚠️ Ajuste as prioridades para as suas reais. Os itens marcados 🔧 são riscos que **eu** identifiquei
> lendo a arquitetura — se algum já estiver resolvido, mova para o CHANGELOG.

---

## Now — in progress

### AI digital workforce
A separate initiative, not a phase of this one: an AI layer over Deltaze, the commercial ERP the company runs on. It reads that system's data, not this platform's — the two will eventually meet, but conflating them would misstate what was built where.

The reasoning: the platform already holds the operational data and already models the processes. Automation that reads from a parallel system would drift out of sync; automation built on top of the source of truth cannot.

<!-- TODO: substituir por descrição técnica real quando definida —
     modelo, integração, quais processos, o que já roda. -->

---

## Next — committed

### 🔧 Systematic entity-scope enforcement
**Why:** every stock query must filter by legal entity. A query missing the filter returns another company's data and fails silently. Today this depends on <!-- TODO: descreva o mecanismo atual -->. It should be structurally impossible to write an unscoped query, not merely discouraged.

**Approach:** repository layer that requires an entity context, so the filter cannot be omitted by construction.

### 🔧 Automated tests on the critical paths
**Why:** stock transfers between entities and cubic-weight pricing are the two places where a bug produces wrong numbers in a warehouse or an invoice — silently, and with financial consequence. These are currently verified by <!-- TODO: manual? nada? -->.

**Scope:** transfer transactions (including concurrent access), pricing calculation across weight and volume ranges, permission boundaries per role.

### 🔧 Reduce single-person dependency
**Why:** the company's operational system currently depends on one developer. This is the largest non-technical risk in the project, and it's mine to address.

**Approach:** the documentation in this repository is the first step. Next: runbook for common operational issues, documented recovery procedure, and a written onboarding path for a second developer.

---

## Later — considered, not committed

### Deployment automation
Deploy is currently <!-- TODO: manual? script? -->. Automating it matters once more than one person touches the system — not before.

### Audit trail surfacing
Movements are already recorded and reversible. An interface for administration to review history without a developer would remove a recurring request.

### Mobile-friendly warehouse view
Operators use desktop terminals today. Worth doing only if the physical process changes to make it useful — not as a default assumption.

---

## Explicitly not planned

Stating what won't be built is part of the roadmap.

| Not planned | Why |
|---|---|
| **Multi-tenancy as a product** | The model is specific to this company's three-entity structure. Generalizing it into SaaS would be a different product with a different data model |
| **Offline mode** | The warehouse network is reliable. Offline-first would add significant complexity to solve a problem that doesn't occur |
| **Horizontal scaling** | User count is the company's staff. Designing for scale that will not arrive is a cost, not a feature |
| **Migration to a microservice architecture** | One developer, one deployment target, one database. Distributed complexity without a distributed problem |

---

## How this roadmap is prioritized

1. **Known risk that fails silently** ahead of visible features — a wrong number nobody notices costs more than a missing screen everybody sees
2. **What the operations team asks for repeatedly** ahead of what's technically interesting
3. **Reversibility** — prefer changes that can be undone in a week over ones that lock the system in

<!-- Esta seção curta é a que mais diz sobre você como engenheiro.
     Se sua ordem de prioridade real for diferente, escreva a sua — o valor está
     em ter uma ordem explícita, não em ter esta. -->
