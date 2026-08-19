import { SITE_URL } from "@/lib/site";

/**
 * Resume content — single source for the screen view and the print/PDF view.
 * Mirrors resume/MASTER.md. When one changes, change the other.
 */

export type Lang = "pt" | "en" | "es";

export const contact = {
  email: "maciel@zenithlacres.com.br",
  phone: "+55 19 97100-3115",
  phoneHref: "tel:+5519971003115",
  linkedin: "linkedin.com/in/benjamin-maciel-dev",
  linkedinHref: "https://www.linkedin.com/in/benjamin-maciel-dev",
  github: "github.com/BenjaminCoder0814",
  githubHref: "https://github.com/BenjaminCoder0814",
  site: SITE_URL.replace(/^https?:\/\//, ""),
  siteHref: SITE_URL,
};

export const resume = {
  /* ─────────────────────────────────────────────────────────── PORTUGUÊS ── */
  pt: {
    lang: "PT",
    title: "Desenvolvedor Front-End · React.js · TypeScript · Sistemas Internos de Negócio",
    location: "São Paulo – SP, Brasil · Aberto a realocação e remoto internacional",
    exportPdf: "↓ Exportar PDF",
    backPortfolio: "← Portfólio",

    highlights: [
      { v: "3+", l: "Anos de experiência" },
      { v: "2025", l: "Formado — Técnico em TI" },
      { v: "100%", l: "Adoção do sistema em produção" },
      { v: "3", l: "Formações em andamento" },
    ],

    sSummary: "Resumo",
    summary:
      "Desenvolvedor Front-End que constrói software de negócio para melhorar eficiência operacional. Três anos de experiência prática com React.js, TypeScript, JavaScript, HTML5 e CSS3, transformando processos manuais em software em produção usado diariamente por equipes inteiras. Construí e coloquei em produção o front-end de um ERP interno que unificou três CNPJs, integrando REST APIs e sincronização em tempo real via Firestore, e reduzi em 40% o tempo de carregamento das interfaces. Hoje Diretor de Tecnologia da Informação na mesma empresa, seguindo mão na massa no código enquanto lidero arquitetura de software, transformação digital e uma iniciativa de força de trabalho digital com IA. Cursando Bacharelado em Ciência da Computação na University of the People (EUA).",

    sAchievements: "Impacto de Engenharia",
    achievements: [
      "Respondo pelo front-end do sistema que sustenta a operação da empresa — uma SPA em React.js e TypeScript em produção, usada diariamente por 100% da equipe operacional em três CNPJs, especificada, construída e entregue sozinho.",
      "Tomei a decisão de construir em vez de contratar, e executei: optei por desenvolver o ERP internamente em vez de licenciar uma plataforma de mercado. Hoje cobre estoque, precificação e comunicação interna, sem dependência de fornecedor.",
      "Transformei o processo manual mais lento da empresa no mais rápido: a precificação passou de 10–15 minutos de cálculo manual para menos de 30 segundos.",
      "Construí a camada de componentes sobre a qual a plataforma roda — design system e biblioteca React reutilizável que todos os módulos consomem.",
      "Lidero o Cortex, a iniciativa de IA da empresa: uma camada sobre os dados do ERP com integração ativa, sincronização incremental e 226 mil registros — base para agentes que assumem trabalho administrativo repetitivo.",
    ],

    sSkills: "Competências",
    skills: [
      { cat: "Front-End", items: "React.js · Next.js · JavaScript (ES6+) · TypeScript · HTML5 · CSS3 · Tailwind CSS · Framer Motion" },
      { cat: "Desenvolvimento Web", items: "Responsive Web Design · Web Performance · Arquitetura baseada em componentes · Design Systems · SPA · SSR · Cross-Browser · Internacionalização" },
      { cat: "APIs & Dados", items: "REST API Integration · Tempo real (Firestore) · JWT · Node.js · Express.js · Prisma · PostgreSQL" },
      { cat: "Software & Sistemas", items: "Arquitetura de software · Sistemas internos · Aplicações de negócio · Levantamento de requisitos · Liderança técnica · Decisão tecnológica" },
      { cat: "IA & Automação", items: "Agentes de IA · Automação de processos · Workflow Automation · Transformação digital" },
      { cat: "Ferramentas & Práticas", items: "Git · GitHub · VS Code · Figma · Jest · React Testing Library · Clean Code · Debugging · Code Review" },
    ],

    sExperience: "Experiência Profissional",
    exp: [
      {
        company: "Zenith Lacres",
        sub: "Indústria de lacres · 3 CNPJs · 22 anos de mercado · São Paulo – SP",
        roles: [
          {
            role: "Diretor de Tecnologia da Informação",
            tagline: "Desenvolvimento hands-on · Arquitetura Front-End · Sistemas Internos · Automação com IA",
            period: "2025 – atual",
            note: "Promovido de Desenvolvedor Front-End",
            bullets: [
              "Escrevo código em produção toda semana — React.js, TypeScript e a camada de integração REST da plataforma interna — enquanto lidero a estratégia de tecnologia entre três CNPJs.",
              "Defino a arquitetura de software e os padrões de front-end usados em todas as aplicações internas: arquitetura baseada em componentes, design system compartilhado e padrões de integração REST.",
              "Lidero a iniciativa de força de trabalho digital com IA, projetando agentes que automatizam tarefas administrativas repetitivas e reduzem trabalho manual.",
              "Direciono o desenvolvimento de sistemas internos que substituem processos manuais de ponta a ponta — do levantamento de requisitos com as áreas de negócio ao software entregue e adotado.",
              "Respondo pelas decisões de tecnologia da transformação digital da empresa, incluindo decisões de construir versus contratar — como desenvolver o ERP internamente em vez de licenciar uma plataforma de mercado.",
            ],
          },
          {
            role: "Desenvolvedor Front-End",
            period: "2023 – 2025",
            bullets: [
              "Desenvolvi o front-end do ERP interno com React.js e TypeScript — SPA com dashboards em tempo real, navegação por permissão e integração REST — hoje usada diariamente por 100% da equipe operacional.",
              "Implementei chat interno em tempo real sobre Firebase Firestore, eliminando uma assinatura recorrente de plataforma de mensagens.",
              "Construí e mantenho o design system e a biblioteca de componentes React reutilizáveis, padronizando a interface em todos os módulos da plataforma.",
              "Construí a interface de precificação com cálculo automático de cubagem e os dashboards de estoque em tempo real consumindo REST APIs.",
              "Desenvolvi interfaces web responsivas e cross-browser a partir de layouts no Figma, garantindo comportamento consistente em desktop e mobile.",
              "Otimizei renderização de componentes e entrega de assets nas interfaces web da empresa, reduzindo o tempo de carregamento em 40%.",
              "Colaborei com as áreas de negócio em iniciativas digitais, lançando a empresa em 5 marketplaces e levando a receita digital de R$0 a R$10.000 em 3 meses.",
            ],
          },
        ],
      },
    ],

    sProjects: "Projetos",
    projects: [
      {
        name: "Enterprise Operations Platform (ERP interno)",
        year: "2025 – 2026 · Em produção",
        stack: "React · Vite · Node.js · Express · Prisma · PostgreSQL · Firebase · JWT",
        bullets: [
          "Problema: três CNPJs dividindo um armazém controlavam estoque em planilhas desconectadas — movimentações sem rastreabilidade e 10–15 minutos de cálculo manual por cotação.",
          "Arquitetura: SPA React sobre REST API Express desacoplada; chat em tempo real sobre Firestore; JWT com controle de acesso por perfil; modelo relacional em PostgreSQL via Prisma, com movimentação de estoque escrita em transação para que registro e saldo nunca divirjam.",
          "Impacto: rastreabilidade total, inventário 60% mais rápido, precificação em menos de 30 segundos, ferramenta paga de comunicação eliminada, 100% de adoção.",
        ],
      },
      {
        name: "Cortex — camada de IA sobre o ERP",
        year: "2026 · Plataforma em homologação",
        stack: "Anthropic Claude API · Integração com ERP de terceiro · Sincronização incremental · Multiempresa",
        bullets: [
          "Camada de dados sobre o ERP comercial da empresa (Deltaze), sem acesso privilegiado ao schema: 9 consultas, 226.296 registros, sincronização incremental por chave natural e cobertura multiempresa.",
          "Raciocínio sobre a API Claude da Anthropic, mantida independente da camada de dados para que o modelo possa ser trocado sem tocar na integração.",
          "Plataforma em homologação; agentes (recebíveis, comercial, compras, executivo) em desenvolvimento, sob a regra de que nada crítico executa sem aprovação humana.",
        ],
      },
      {
        name: "Sistema Web Full Stack — TCC",
        year: "2025 · Entregue sozinho, nota máxima",
        stack: "Next.js 15 · React 19 · TypeScript · Prisma · Tailwind · Docker",
        bullets: [
          "Responsável por 100% da interface — layouts, estrutura de componentes, fluxo de navegação e responsividade — integrada ao back-end construído no mesmo projeto com Next.js e Prisma.",
        ],
      },
      {
        name: "Portfólio pessoal",
        year: "2026 · No ar",
        stack: "Next.js · React.js · TypeScript · Tailwind CSS · Framer Motion",
        bullets: [
          "Next.js App Router com rotas internacionalizadas geradas estaticamente (PT/EN/ES), design system próprio e seção de documentação técnica de engenharia.",
        ],
      },
    ],

    sEducation: "Formação",
    education: [
      { degree: "Bacharelado em Ciência da Computação (cursando)", school: "University of the People — Pasadena, Califórnia, EUA", period: "2026 – presente · Online" },
      { degree: "Bacharelado em Sistemas de Informação (cursando)", school: "UNASP — São Paulo, Brasil", period: "2026 – 2029" },
      { degree: "Técnico em Tecnologia da Informação", school: "UNASP — São Paulo, Brasil", period: "2023 – 2025 · Concluído" },
    ],

    sLanguages: "Idiomas",
    languages: [
      { lang: "Português", level: "Nativo" },
      { lang: "Inglês", level: "Profissional (B2)" },
      { lang: "Espanhol", level: "Intermediário (B1)" },
    ],
  },

  /* ──────────────────────────────────────────────────────────── ENGLISH ── */
  en: {
    lang: "EN",
    title: "Front-End Developer · React.js · TypeScript · Internal Business Systems",
    location: "São Paulo – SP, Brazil · Open to relocation and international remote",
    exportPdf: "↓ Export PDF",
    backPortfolio: "← Portfolio",

    highlights: [
      { v: "3+", l: "Years of experience" },
      { v: "2025", l: "Graduated — Technical Degree in IT" },
      { v: "100%", l: "Adoption of system in production" },
      { v: "3", l: "Degrees in progress" },
    ],

    sSummary: "Summary",
    summary:
      "Front-End Developer who builds business software that improves operational efficiency. Three years of practical experience with React.js, TypeScript, JavaScript, HTML5 and CSS3, turning manual operational processes into production software used daily by entire teams. Built and shipped the front end of an internal ERP unifying three legal entities, integrating REST APIs and real-time Firestore synchronisation, and reduced interface load time by 40%. Now Director of Information Technology at the same company, remaining hands-on in the codebase while leading software architecture, digital transformation and an AI digital workforce initiative. Currently pursuing a B.Sc. in Computer Science at University of the People (United States).",

    sAchievements: "Engineering Impact",
    achievements: [
      "Own the front end of the system the company runs on — a React.js and TypeScript single-page application in production, used daily by 100% of the operations team across three legal entities, specified, built and shipped solo.",
      "Made the build-versus-buy call, then executed it: chose to build the ERP in-house over licensing an off-the-shelf platform. It now covers inventory, pricing and internal communication with no vendor dependency.",
      "Turned the company's slowest manual process into its fastest: product pricing went from 10–15 minutes of manual calculation to under 30 seconds.",
      "Built the component layer the platform runs on — a design system and reusable React component library that every module ships against.",
      "Leading Cortex, the company's AI initiative: a layer over the ERP with a live integration, incremental synchronisation and 226,296 records imported — the foundation for agents that take over repetitive administrative work.",
    ],

    sSkills: "Core Expertise",
    skills: [
      { cat: "Front-End", items: "React.js · Next.js · JavaScript (ES6+) · TypeScript · HTML5 · CSS3 · Tailwind CSS · Framer Motion" },
      { cat: "Web Development", items: "Responsive Web Design · Web Performance · Component-Based Architecture · Design Systems · SPA · SSR · Cross-Browser · Internationalization" },
      { cat: "APIs & Data", items: "REST API Integration · Real-Time (Firestore) · JWT Authentication · Node.js · Express.js · Prisma · PostgreSQL" },
      { cat: "Software & Systems", items: "Software Architecture · Internal Systems · Business Applications · Requirements Gathering · Technical Leadership · Technology Decision-Making" },
      { cat: "AI & Automation", items: "AI Agents · AI-Driven Process Automation · Workflow Automation · Digital Transformation" },
      { cat: "Tools & Practices", items: "Git · GitHub · VS Code · Figma · Jest · React Testing Library · Clean Code · Debugging · Code Review" },
    ],

    sExperience: "Professional Experience",
    exp: [
      {
        company: "Zenith Lacres",
        sub: "Industrial sealing manufacturer · 3 legal entities · 22 years in market · São Paulo, Brazil",
        roles: [
          {
            role: "Director of Information Technology",
            tagline: "Hands-on Software Development · Front-End Architecture · Internal Systems · AI Automation",
            period: "2025 – Present",
            note: "Promoted from Front-End Developer",
            bullets: [
              "Write production code weekly — React.js, TypeScript and the REST API integration layer of the internal platform — while leading technology strategy across three legal entities.",
              "Define the software architecture and front-end technology standards used across all internal applications: component-based architecture, shared design system, and REST API integration patterns.",
              "Lead an AI digital workforce initiative, designing AI agents that automate repetitive administrative tasks to reduce manual work and increase operational efficiency.",
              "Direct the development of internal systems that replace manual processes end to end — from requirements gathering with business stakeholders to shipped, adopted software.",
              "Own technology decision-making for the company's digital transformation, including build-versus-buy calls such as developing the internal ERP in-house rather than licensing an off-the-shelf platform.",
            ],
          },
          {
            role: "Front-End Developer",
            period: "2023 – 2025",
            bullets: [
              "Developed the front end of an internal ERP with React.js and TypeScript — a single-page application with real-time dashboards, permission-aware navigation and REST API integration, now used daily by 100% of the operations team.",
              "Implemented real-time internal chat over Firebase Firestore, eliminating a recurring third-party messaging subscription.",
              "Built and maintained a custom design system and reusable React component library, standardizing the UI across every module of the platform.",
              "Built the dynamic pricing interface with automated cubic-weight calculation and the real-time inventory dashboards consuming REST APIs.",
              "Developed responsive, cross-browser web interfaces from Figma designs, ensuring consistent behavior across desktop and mobile.",
              "Optimized component rendering and asset delivery across the company's web interfaces, reducing load time by 40%.",
              "Collaborated with business teams on digital initiatives, launching the company across 5 online marketplaces and growing digital revenue from R$0 to R$10,000 in 3 months.",
            ],
          },
        ],
      },
    ],

    sProjects: "Selected Projects",
    projects: [
      {
        name: "Enterprise Operations Platform (Internal ERP)",
        year: "2025 – 2026 · In production",
        stack: "React · Vite · Node.js · Express · Prisma · PostgreSQL · Firebase · JWT",
        bullets: [
          "Problem: three legal entities sharing one warehouse tracked stock in disconnected spreadsheets — untraceable movements and 10–15 minutes of manual work per price quote.",
          "Architecture: a React SPA over a decoupled Express REST API; real-time chat on Firestore; JWT with role-based access; a PostgreSQL model through Prisma, where a stock movement and the balance it changes are written in one transaction so the two can never disagree.",
          "Impact: full traceability, 60% faster inventory counts, pricing under 30 seconds, one paid communication tool removed, 100% adoption by the operations team.",
        ],
      },
      {
        name: "Cortex — AI layer over the ERP",
        year: "2026 · Platform in homologation",
        stack: "Anthropic Claude API · Third-party ERP integration · Incremental sync · Multi-company",
        bullets: [
          "Data layer over the company's commercial ERP (Deltaze) with no privileged schema access: 9 queries, 226,296 records, incremental synchronisation keyed on natural keys, multi-company coverage.",
          "Reasoning on Anthropic's Claude API, kept independent of the data layer so the model can be swapped without touching the ERP integration.",
          "Platform in homologation; agents (receivables, commercial, purchasing, executive) in development, under the rule that nothing critical executes without human approval.",
        ],
      },
      {
        name: "Full-Stack Web Application — Graduation project",
        year: "2025 · Delivered solo, top grade",
        stack: "Next.js 15 · React 19 · TypeScript · Prisma · Tailwind · Docker",
        bullets: [
          "Owned 100% of the interface — layouts, component structure, navigation flow and responsive behavior — integrated with the back end built in the same project on Next.js and Prisma.",
        ],
      },
      {
        name: "Personal portfolio",
        year: "2026 · Live",
        stack: "Next.js · React.js · TypeScript · Tailwind CSS · Framer Motion",
        bullets: [
          "Next.js App Router with statically generated internationalized routes (EN/PT/ES), a design system built from scratch, and a technical engineering documentation section.",
        ],
      },
    ],

    sEducation: "Education",
    education: [
      { degree: "B.Sc. Computer Science (in progress)", school: "University of the People — Pasadena, California, USA", period: "2026 – present · Online" },
      { degree: "B.Sc. Information Systems (in progress)", school: "UNASP — São Paulo, Brazil", period: "2026 – 2029" },
      { degree: "Technical Diploma in Information Technology", school: "UNASP — São Paulo, Brazil", period: "2023 – 2025 · Completed" },
    ],

    sLanguages: "Languages",
    languages: [
      { lang: "Portuguese", level: "Native" },
      { lang: "English", level: "Professional working proficiency (B2)" },
      { lang: "Spanish", level: "Intermediate (B1)" },
    ],
  },

  /* ──────────────────────────────────────────────────────────── ESPAÑOL ── */
  es: {
    lang: "ES",
    title: "Desarrollador Front-End · React.js · TypeScript · Sistemas Internos de Negocio",
    location: "São Paulo – SP, Brasil · Abierto a reubicación y remoto internacional",
    exportPdf: "↓ Exportar PDF",
    backPortfolio: "← Portafolio",

    highlights: [
      { v: "3+", l: "Años de experiencia" },
      { v: "2025", l: "Graduado — Técnico en TI" },
      { v: "100%", l: "Adopción del sistema en producción" },
      { v: "3", l: "Formaciones en curso" },
    ],

    sSummary: "Resumen",
    summary:
      "Desarrollador Front-End que construye software de negocio para mejorar la eficiencia operativa. Tres años de experiencia práctica con React.js, TypeScript, JavaScript, HTML5 y CSS3, transformando procesos manuales en software en producción usado a diario por equipos completos. Construí y puse en producción el front-end de un ERP interno que unificó tres entidades legales, integrando REST APIs y sincronización en tiempo real vía Firestore, y reduje un 40% el tiempo de carga de las interfaces. Hoy Director de Tecnología de la Información en la misma empresa, sigo escribiendo código mientras lidero arquitectura de software, transformación digital y una iniciativa de fuerza de trabajo digital con IA. Cursando Licenciatura en Ciencias de la Computación en University of the People (EE.UU.).",

    sAchievements: "Impacto de Ingeniería",
    achievements: [
      "Soy responsable del front-end del sistema con el que opera la empresa: una SPA en React.js y TypeScript en producción, usada a diario por el 100% del equipo operativo en tres entidades legales, especificada, construida y entregada en solitario.",
      "Tomé la decisión de construir en lugar de comprar, y la ejecuté: opté por desarrollar el ERP internamente en vez de licenciar una plataforma de mercado. Hoy cubre inventario, precios y comunicación interna, sin dependencia de proveedor.",
      "Convertí el proceso manual más lento de la empresa en el más rápido: la cotización pasó de 10–15 minutos de cálculo manual a menos de 30 segundos.",
      "Construí la capa de componentes sobre la que corre la plataforma: design system y librería React reutilizable que todos los módulos consumen.",
      "Lidero Cortex, la iniciativa de IA de la empresa: una capa sobre los datos del ERP con integración activa, sincronización incremental y 226.296 registros — base para agentes que asumen trabajo administrativo repetitivo.",
    ],

    sSkills: "Competencias",
    skills: [
      { cat: "Front-End", items: "React.js · Next.js · JavaScript (ES6+) · TypeScript · HTML5 · CSS3 · Tailwind CSS · Framer Motion" },
      { cat: "Desarrollo Web", items: "Responsive Web Design · Web Performance · Arquitectura basada en componentes · Design Systems · SPA · SSR · Cross-Browser · Internacionalización" },
      { cat: "APIs & Datos", items: "REST API Integration · Tiempo real (Firestore) · JWT · Node.js · Express.js · Prisma · PostgreSQL" },
      { cat: "Software & Sistemas", items: "Arquitectura de software · Sistemas internos · Aplicaciones de negocio · Levantamiento de requisitos · Liderazgo técnico · Decisión tecnológica" },
      { cat: "IA & Automatización", items: "Agentes de IA · Automatización de procesos · Workflow Automation · Transformación digital" },
      { cat: "Herramientas & Prácticas", items: "Git · GitHub · VS Code · Figma · Jest · React Testing Library · Clean Code · Debugging · Code Review" },
    ],

    sExperience: "Experiencia Profesional",
    exp: [
      {
        company: "Zenith Lacres",
        sub: "Industria de precintos · 3 entidades legales · 22 años en el mercado · São Paulo, Brasil",
        roles: [
          {
            role: "Director de Tecnología de la Información",
            tagline: "Desarrollo hands-on · Arquitectura Front-End · Sistemas Internos · Automatización con IA",
            period: "2025 – actual",
            note: "Promovido desde Desarrollador Front-End",
            bullets: [
              "Escribo código en producción cada semana — React.js, TypeScript y la capa de integración REST de la plataforma interna — mientras lidero la estrategia de tecnología entre tres entidades legales.",
              "Defino la arquitectura de software y los estándares de front-end usados en todas las aplicaciones internas: arquitectura basada en componentes, design system compartido y patrones de integración REST.",
              "Lidero la iniciativa de fuerza de trabajo digital con IA, diseñando agentes que automatizan tareas administrativas repetitivas y reducen el trabajo manual.",
              "Dirijo el desarrollo de sistemas internos que reemplazan procesos manuales de punta a punta — del levantamiento de requisitos con las áreas de negocio al software entregado y adoptado.",
              "Respondo por las decisiones de tecnología de la transformación digital de la empresa, incluyendo decisiones de construir versus comprar — como desarrollar el ERP internamente en lugar de licenciar una plataforma de mercado.",
            ],
          },
          {
            role: "Desarrollador Front-End",
            period: "2023 – 2025",
            bullets: [
              "Desarrollé el front-end del ERP interno con React.js y TypeScript — SPA con dashboards en tiempo real, navegación por permisos e integración REST — hoy usada a diario por el 100% del equipo operativo.",
              "Implementé chat interno en tiempo real sobre Firebase Firestore, eliminando una suscripción recurrente de plataforma de mensajería.",
              "Construí y mantengo el design system y la librería de componentes React reutilizables, estandarizando la interfaz en todos los módulos.",
              "Construí la interfaz de precios con cálculo automático de cubicaje y los dashboards de inventario en tiempo real consumiendo REST APIs.",
              "Desarrollé interfaces web responsivas y cross-browser a partir de diseños en Figma.",
              "Optimicé el renderizado de componentes y la entrega de assets, reduciendo un 40% el tiempo de carga.",
              "Colaboré con las áreas de negocio en iniciativas digitales, lanzando la empresa en 5 marketplaces y llevando los ingresos digitales de R$0 a R$10.000 en 3 meses.",
            ],
          },
        ],
      },
    ],

    sProjects: "Proyectos",
    projects: [
      {
        name: "Enterprise Operations Platform (ERP interno)",
        year: "2025 – 2026 · En producción",
        stack: "React · Vite · Node.js · Express · Prisma · PostgreSQL · Firebase · JWT",
        bullets: [
          "Problema: tres entidades legales compartiendo un almacén controlaban inventario en planillas desconectadas — movimientos sin trazabilidad y 10–15 minutos de cálculo manual por cotización.",
          "Arquitectura: SPA React sobre REST API Express desacoplada; chat en tiempo real sobre Firestore; JWT con control de acceso por perfil; modelo relacional en PostgreSQL vía Prisma, con el movimiento de stock escrito en transacción para que registro y saldo nunca difieran.",
          "Impacto: trazabilidad total, inventario 60% más rápido, cotización en menos de 30 segundos, herramienta paga de comunicación eliminada, 100% de adopción.",
        ],
      },
      {
        name: "Cortex — capa de IA sobre el ERP",
        year: "2026 · Plataforma en homologación",
        stack: "Anthropic Claude API · Integración con ERP de terceros · Sincronización incremental · Multiempresa",
        bullets: [
          "Capa de datos sobre el ERP comercial de la empresa (Deltaze), sin acceso privilegiado al esquema: 9 consultas, 226.296 registros, sincronización incremental por clave natural y cobertura multiempresa.",
          "Razonamiento sobre la API Claude de Anthropic, mantenida independiente de la capa de datos para poder cambiar el modelo sin tocar la integración.",
          "Plataforma en homologación; agentes (cobranzas, comercial, compras, ejecutivo) en desarrollo, bajo la regla de que nada crítico se ejecuta sin aprobación humana.",
        ],
      },
      {
        name: "Sistema Web Full Stack — Proyecto final",
        year: "2025 · Entregado en solitario, nota máxima",
        stack: "Next.js 15 · React 19 · TypeScript · Prisma · Tailwind · Docker",
        bullets: [
          "Responsable del 100% de la interfaz — layouts, estructura de componentes, flujo de navegación y responsividad — integrada al back-end construido en el mismo proyecto con Next.js y Prisma.",
        ],
      },
      {
        name: "Portafolio personal",
        year: "2026 · En línea",
        stack: "Next.js · React.js · TypeScript · Tailwind CSS · Framer Motion",
        bullets: [
          "Next.js App Router con rutas internacionalizadas generadas estáticamente (PT/EN/ES), design system propio y sección de documentación técnica de ingeniería.",
        ],
      },
    ],

    sEducation: "Formación",
    education: [
      { degree: "Lic. en Ciencias de la Computación (en curso)", school: "University of the People — Pasadena, California, EE.UU.", period: "2026 – presente · Online" },
      { degree: "Lic. en Sistemas de Información (en curso)", school: "UNASP — São Paulo, Brasil", period: "2026 – 2029" },
      { degree: "Técnico en Tecnología de la Información", school: "UNASP — São Paulo, Brasil", period: "2023 – 2025 · Completado" },
    ],

    sLanguages: "Idiomas",
    languages: [
      { lang: "Portugués", level: "Nativo" },
      { lang: "Inglés", level: "Profesional (B2)" },
      { lang: "Español", level: "Intermedio (B1)" },
    ],
  },
} as const;
