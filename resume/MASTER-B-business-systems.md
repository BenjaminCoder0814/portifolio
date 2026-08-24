# BENJAMIN MACIEL
## Business Systems Developer | React.js · TypeScript · Node.js | Internal Platforms · Process Automation · Applied AI

maciel@zenithlacres.com.br · [LinkedIn](https://www.linkedin.com/in/benjamin-maciel-dev) · [GitHub](https://github.com/BenjaminCoder0814) · [benjaminmaciel.com.br](https://benjaminmaciel.com.br)
São Paulo, Brazil (UTC−3) · Open to relocation and international remote · Requires visa sponsorship

> **Quando usar este currículo:** SaaS B2B, ERP, logística, supply chain, manufatura, fintech de
> operações, consultorias, times de *internal tools* / *business applications* / *operations
> engineering*. Mesmos fatos do Currículo A — enquadramento diferente.

---

## SUMMARY

Software developer who builds the internal systems companies actually run on. Three years turning manual operational processes into production software at an industrial manufacturer — specified, built and shipped the ERP that unified inventory, pricing and communication across three legal entities, now used daily by the entire operations team. Front end in **React.js and TypeScript**, integrated with **REST APIs**, real-time chat on **Firestore** and a **PostgreSQL** model through **Prisma**. Now Director of Information Technology at the same company, still writing production code while leading software architecture and an AI automation initiative. Currently pursuing a **B.Sc. in Computer Science at University of the People (United States)**.

---

## ENGINEERING IMPACT

- **Made the build-versus-buy call, then executed it.** Chose to build the ERP in-house over licensing an off-the-shelf platform; it now covers inventory, pricing and internal communication with no vendor dependency.
- **Own the system the company runs on.** In production and used daily by 100% of the operations team across three legal entities — replaced disconnected spreadsheets that made stock movements untraceable.
- **Turned the company's slowest manual process into its fastest.** Product pricing went from 10–15 minutes of manual calculation to under 30 seconds, through an interface with automated cubic-weight logic.
- **Leading Cortex, the company's AI initiative.** Built the data layer over the commercial ERP the company runs on — 226,296 records under incremental synchronisation, multi-company, reasoning on Anthropic's Claude API — as the foundation for agents that take over repetitive administrative work.
- **Cut inventory counting time by 60%** by developing real-time dashboards that gave operations teams live stock visibility, consolidated and per entity.
- **Removed a recurring software cost** by replacing a paid third-party messaging platform with an in-house real-time chat on Firebase Firestore, adopted company-wide.

---

## CORE EXPERTISE

**Business Systems:** Internal Systems · Business Applications · ERP Development · Inventory Management Systems · Dashboard Development · Workflow Automation · Process Automation · Requirements Gathering · Business Process Analysis

**Software Architecture:** Software Architecture · Component-Based Architecture · Single-Page Applications (SPA) · REST API Design & Integration · Real-Time Systems (Firestore) · Relational Data Modeling · Role-Based Access Control · Technical Leadership · Technology Decision-Making

**Front-End:** React.js · Next.js · JavaScript (ES6+) · TypeScript · HTML5 · CSS3 · Tailwind CSS · Design Systems · Reusable Component Libraries · Responsive Web Design · UI Development

**Back-End & Data:** Node.js · Express.js · Prisma · PostgreSQL · JWT Authentication · REST APIs

**AI & Automation:** AI Agents · AI-Driven Process Automation · Digital Transformation

**Tools & Practices:** Git · GitHub · VS Code · Figma · Jest · React Testing Library · Clean Code · Debugging · Problem Solving

---

## PROFESSIONAL EXPERIENCE

### Zenith Lacres — São Paulo, Brazil
*Industrial sealing manufacturer · 3 legal entities · 22 years in market*

#### Director of Information Technology · 2025 – Present
**Hands-on Software Development | Systems Architecture | Process Automation | Applied AI**
*Promoted from Front-End Developer*

- **Own** technology decision-making for the company's digital transformation, including build-versus-buy calls such as developing the internal ERP in-house rather than licensing an off-the-shelf platform.
- **Write production code weekly** — React.js, TypeScript and the REST API integration layer of the internal platform — while leading technology strategy across three legal entities.
- **Direct** the development of internal systems that replace manual processes end to end: sitting with the operations team to map the process, defining scope and data model, then building and shipping the software.
- **Define** the software architecture and technology standards used across all internal applications — component-based architecture, shared design system, REST API integration patterns, and role-based access control.
- **Lead** an AI automation initiative, designing AI agents that take over repetitive administrative tasks so the operations team spends its time on work that requires human judgment.

#### Front-End Developer · 2023 – 2025

- **Developed** the ERP that replaced the company's spreadsheet-based inventory control — a React.js and TypeScript single-page application with real-time dashboards, permission-aware navigation and REST API integration, now used daily by 100% of the operations team.
- **Built** the dynamic pricing interface with automated cubic-weight and logistics calculation, and the real-time inventory dashboards consuming REST APIs.
- **Implemented** real-time internal chat on Firebase Firestore, eliminating a recurring third-party messaging subscription.
- **Built** and maintained the design system and reusable React component library the platform is built on, standardizing the UI across every module.
- **Optimized** component rendering and asset delivery across the company's web interfaces, **reducing load time by 40%**.
- **Collaborated** with business teams on digital initiatives, launching the company across 5 online marketplaces and growing digital revenue from R$0 to R$10,000 in 3 months.

---

## SELECTED PROJECTS

### Enterprise Operations Platform (Internal ERP) — *In active production*
**React · TypeScript · Node.js · Express.js · Prisma · PostgreSQL · REST API · Firebase · JWT** · 2025 – 2026

- **Problem.** Three legal entities sharing one warehouse tracked stock in disconnected spreadsheets. Movements were untraceable, transfers between entities conflicted, price quoting took 10–15 minutes of manual calculation, and internal communication ran on a paid external platform.
- **Decision.** Evaluated off-the-shelf ERP against building in-house. Chose to build: full process fit, no per-seat licensing, no vendor lock-in, and continuous evolution controlled internally.
- **Architecture.** Single-Page Application over a decoupled REST API; real-time chat on Firestore; JWT authentication with the company's own roles guarding both the API and the navigation; a PostgreSQL model through Prisma where a stock movement and the balance it changes are written in one transaction.
- **Interface.** Custom design system and reusable React component library; real-time dashboards with consolidated and per-entity views; permission-aware navigation; high-density UI designed for non-technical warehouse and sales operators.
- **Impact.** Full stock traceability across entities · 60% faster inventory counts · pricing under 30 seconds · one paid communication tool removed from the cost base · **100% adoption by the operations team**.
- **Ownership.** Specified, architected, built and shipped solo — no external team, no outsourcing.

*Full case study: [benjaminmaciel.com.br/erp](https://benjaminmaciel.com.br/erp)*

### Cortex — AI layer over ERP data — *Platform in homologation*
**Anthropic Claude API · Third-party ERP integration · Incremental synchronisation · Multi-company** · 2026

- **Problem.** Administrative work across departments — chasing receivables, answering stock questions, preparing quotes — requires no judgment but does require a person navigating the ERP.
- **Constraint.** The data sits in Deltaze, the commercial ERP the company runs on. No privileged access and no schema to change, so the platform treats it as a read-only source that can change underneath it.
- **Built.** Data layer with 9 mapped queries, **226,296 records imported**, incremental synchronisation keyed on natural keys, multi-company coverage, pagination, and an explorer for verifying imported state against the source.
- **Architecture.** Reasoning on Anthropic's Claude API, kept independent of the data layer so the model can be swapped without touching the ERP integration.
- **Stage.** Platform in homologation. Agents — receivables, commercial, purchasing, executive — in development, under a rule fixed before the first one was written: nothing critical executes without human approval.

### Full-Stack Web Application — *Graduation project · delivered solo · top grade*
**Next.js 15 · React 19 · TypeScript · Tailwind CSS · MDX** · 2025

Built a complete web application end to end — interface, back end and relational data model — and defended it as the final project of the technical degree. Delivered without a team; graded top of the class.

---

## EDUCATION

**B.Sc. in Computer Science** — University of the People · Pasadena, California, United States
2026 – Present *(online)*

**B.Sc. in Information Systems** — UNASP · Engenheiro Coelho, São Paulo, Brazil
2026 – 2029 *(expected)*

**Technical Diploma in Information Technology** — UNASP · Engenheiro Coelho, São Paulo, Brazil
2023 – 2025 *(completed)* · Final project: full-stack web application delivered solo — top grade.

---

## LANGUAGES

**Portuguese** — Native · **English** — Professional working proficiency (B2) · **Spanish** — Intermediate (B1)

---

<!--
=============================================================================
DIFERENÇAS ENTRE O CURRÍCULO A E O B — mesmos fatos, ênfase diferente

                        A (Front-End)              B (Business Systems)
Título                  Front-End Developer        Business Systems Developer
1º Achievement          Own the front end          Build-versus-buy decision
Skills, 1ª categoria    Front-End                  Business Systems
Portfólio pessoal       Incluído como projeto      Removido (irrelevante aqui)
Link do case study      —                          Incluído
Cargo Director          2º bloco de destaque       1º bloco de destaque
Load time 40%           Achievement                Dentro da experiência

NENHUM FATO MUDA. Nenhuma métrica muda. Nenhum cargo muda.
Se um recrutador comparar os dois, não encontra contradição — só foco diferente.

⚠️ VERIFICAR ANTES DE ENVIAR: data de início da UoPeople, mês da promoção,
telefone com código de país.
=============================================================================
-->
