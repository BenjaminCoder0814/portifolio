# Benjamin Maciel — Portfolio

> **Front-End Developer** — Next.js 14 · TypeScript · Tailwind CSS

A high-performance, futuristic developer portfolio built with Next.js 14 App Router, TypeScript and Tailwind CSS. Features a Matrix-inspired code rain boot loader, an interactive terminal emulator, Framer Motion scroll animations and a complete design system.

---

## Stack

| Layer       | Technology                      |
|-------------|---------------------------------|
| Framework   | Next.js 14.x (App Router)       |
| Language    | TypeScript 5                    |
| Styling     | Tailwind CSS 3 + custom tokens  |
| Animations  | Framer Motion 11                |
| Icons       | lucide-react                    |
| Fonts       | Inter + JetBrains Mono (Google) |
| Deploy      | Vercel (recommended)            |

---

## Features

- **Boot Loader** - Canvas Matrix code rain with progressive system messages
- **Custom Cursor** - Dual dot+ring cursor with smooth requestAnimationFrame tracking (desktop only)
- **Scroll Progress Bar** - 2px gradient indicator at the top of the viewport
- **Navbar** - Scroll-aware active link detection via IntersectionObserver, mobile burger menu
- **Dev Mode Terminal** - Full terminal emulator overlay with command history and Tab-autocomplete
- **Hero** - Persistent code rain canvas + typewriter cycling through roles
- **About / Timeline** - Framer Motion scroll-reveal with animated vertical timeline
- **Formation** - Skill progress bars animated on scroll + education cards
- **Projects** - Featured card with syntax-highlighted code preview + project grid
- **Know Me** - 6 personality cards + philosophy blockquote
- **Contact** - WhatsApp CTA + channel links (e-mail, LinkedIn, GitHub, Instagram)
- **SEO** - Metadata per locale, Open Graph + Twitter cards, JSON-LD Person, canonical, hreflang, sitemap, robots

---

## Architecture

```
src/
 app/
    globals.css        # Design system (CSS vars, keyframes, utilities)
    layout.tsx         # Root layout - fonts, metadata, html lang
    page.tsx           # Page assembly
 components/            # Shared UI components
    BootLoader.tsx
    CustomCursor.tsx
    Footer.tsx
    Navbar.tsx
    ScrollIndicator.tsx
    TerminalModal.tsx
 sections/              # Page sections
    Hero.tsx
    About.tsx
    Formation.tsx
    Projects.tsx
    KnowMe.tsx
    Contact.tsx
 data/
    index.ts           # Single source of truth for all content
 hooks/
    index.ts           # useTypingEffect, useScrollY, useInView
 lib/
     utils.ts           # cn() and clamp()
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build && npm start
```

Open http://localhost:3000

---

## Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | No | Public origin used for canonical tags, `og:url`, `og:image`, the sitemap, the robots host and the JSON-LD block. |

Resolution order lives in `src/lib/site.ts`: `NEXT_PUBLIC_SITE_URL` → Vercel's
`VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`. On Vercel it resolves
on its own, so the variable is only needed once a custom domain is live.

It matters because link previews break silently when it is wrong: LinkedIn and
WhatsApp fetch `og:image` from the declared origin, and a 404 there means no
preview card at all.

---

## Generated assets

Both scripts write into `public/` and their output is committed.

```bash
# Open Graph card + PWA/Apple icons — re-run after changing name, role or stack
npm run generate:og

# Trilingual resume PDFs, rendered from /:lang/curriculo
# Requires a server on :3000, and the same NEXT_PUBLIC_SITE_URL used to build it,
# because the resume prints the site URL.
NEXT_PUBLIC_SITE_URL=https://your-domain npm run build
npm run start          # in another terminal
npm run generate:pdfs
```

---

## Customization

All content (name, bio, skills, projects, timeline, etc.) lives in a single file:

```
src/data/index.ts
```

Edit the `personal`, `timeline`, `skills`, `projects`, `education` and `knowMe` exports.

---

## Design Tokens

| Token     | Value                   | Usage                       |
|-----------|-------------------------|-----------------------------|
| --cyan    | #00d4ff                 | Primary accent, links, bars |
| --purple  | #7c3aed                 | Secondary, timeline dots    |
| --green   | #00ff88                 | Terminal, status badge      |
| --bg      | #0a0a0a                 | Page background             |
| --border  | rgba(255,255,255,0.07)  | Card borders                |

---

## License

MIT - feel free to fork and customize for your own portfolio.

---

*Built with coffee and TypeScript by **Benjamin Maciel***
