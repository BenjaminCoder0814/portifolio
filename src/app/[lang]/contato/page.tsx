import Link from "next/link";
import type { Metadata } from "next";
import PageShell, { LANGS, pickLang, altsFor, H2, Callout } from "@/components/site/PageShell";
import { personal } from "@/data";

const COPY = {
  pt: {
    eyebrow: "Contato",
    crumb: "Contato",
    title: "Fale comigo",
    lead: "Sem formulário. Todos os canais abaixo chegam direto em mim, e o WhatsApp é o que eu respondo mais rápido.",
    primary: "WhatsApp",
    primaryNote: "Respondo em até 24 horas.",
    hChannels: "Outros canais",
    hExpect: "O que esperar",
    expect:
      "Se você é recrutador: a página de FAQ já responde disponibilidade, senioridade, stack e o que eu procuro, então talvez não precise nem me perguntar. Se você quer ver código antes de conversar, os dois repositórios principais são públicos e cada nota técnica deste site aponta o arquivo que discute.",
    hWhy: "Uma observação sobre o formulário que não existe aqui",
    why:
      "Este site já teve um formulário de contato. Ele esperava 1,4 segundo e escrevia mensagem enviada, sem mandar nada a lugar nenhum. Quem escrevesse recebia a confirmação e sumia. Removi em vez de consertar, porque o WhatsApp já resolve — e porque um canal que finge funcionar é pior do que canal nenhum.",
    faq: "Ver o FAQ",
    channels: {
      email: "E-mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Localização",
    },
    locationNote: "Aberto a remoto e a realocação, inclusive internacional.",
    metaTitle: "Contato",
    metaDesc: "Como falar com Benjamin Maciel: WhatsApp, e-mail, LinkedIn e GitHub. Sem formulário — todos os canais chegam direto.",
  },
  en: {
    eyebrow: "Contact",
    crumb: "Contact",
    title: "Get in touch",
    lead: "No form. Every channel below reaches me directly, and WhatsApp is the one I answer fastest.",
    primary: "WhatsApp",
    primaryNote: "I reply within 24 hours.",
    hChannels: "Other channels",
    hExpect: "What to expect",
    expect:
      "If you are a recruiter: the FAQ page already answers availability, seniority, stack and what I am looking for, so you may not need to ask at all. If you would rather see code before talking, both main repositories are public and every engineering note on this site points at the file it discusses.",
    hWhy: "A note about the form that is not here",
    why:
      "This site used to have a contact form. It waited 1.4 seconds and printed message sent, without sending anything anywhere. Anyone who wrote got the confirmation and vanished. I removed it rather than fixing it, because WhatsApp already does the job — and because a channel that pretends to work is worse than no channel.",
    faq: "Read the FAQ",
    channels: {
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Location",
    },
    locationNote: "Open to remote work and relocation, including internationally.",
    metaTitle: "Contact",
    metaDesc: "How to reach Benjamin Maciel: WhatsApp, email, LinkedIn and GitHub. No form — every channel goes straight through.",
  },
  es: {
    eyebrow: "Contacto",
    crumb: "Contacto",
    title: "Hablemos",
    lead: "Sin formulario. Todos los canales de abajo llegan directo a mí, y WhatsApp es el que respondo más rápido.",
    primary: "WhatsApp",
    primaryNote: "Respondo en menos de 24 horas.",
    hChannels: "Otros canales",
    hExpect: "Qué esperar",
    expect:
      "Si eres reclutador: la página de FAQ ya responde disponibilidad, seniority, stack y qué busco, así que quizá ni haga falta preguntar. Si prefieres ver código antes de conversar, los dos repositorios principales son públicos y cada nota técnica de este sitio apunta al archivo que discute.",
    hWhy: "Una nota sobre el formulario que no está aquí",
    why:
      "Este sitio tuvo un formulario de contacto. Esperaba 1,4 segundos y escribía mensaje enviado, sin mandar nada a ninguna parte. Quien escribía recibía la confirmación y desaparecía. Lo eliminé en vez de arreglarlo, porque WhatsApp ya resuelve — y porque un canal que finge funcionar es peor que ningún canal.",
    faq: "Ver el FAQ",
    channels: {
      email: "Correo",
      linkedin: "LinkedIn",
      github: "GitHub",
      location: "Ubicación",
    },
    locationNote: "Abierto a remoto y a reubicación, incluso internacional.",
    metaTitle: "Contacto",
    metaDesc: "Cómo contactar a Benjamin Maciel: WhatsApp, correo, LinkedIn y GitHub. Sin formulario — todos los canales llegan directo.",
  },
} as const;

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = pickLang(params.lang);
  const c = COPY[lang];
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: altsFor(lang, "/contato"),
    openGraph: { title: c.metaTitle, description: c.metaDesc },
  };
}

export default function ContatoPage({ params }: { params: { lang: string } }) {
  const lang = pickLang(params.lang);
  const c = COPY[lang];

  const channels = [
    { label: c.channels.email, value: personal.email, href: `mailto:${personal.email}` },
    { label: c.channels.linkedin, value: "linkedin.com/in/benjamin-maciel-dev", href: personal.linkedin },
    { label: c.channels.github, value: "github.com/BenjaminCoder0814", href: personal.github },
  ];

  return (
    <PageShell
      lang={lang}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
      crumbs={[{ label: c.crumb }]}
      width="720px"
      footer={
        <Link href={`/${lang}/faq`} className="font-mono text-sm text-[#00d4ff] hover:underline">
          {c.faq} →
        </Link>
      }
    >
      <a
        href={`https://wa.me/${personal.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${c.primary} — ${personal.phone}`}
        className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#00d4ff] px-7 py-4 font-bold text-[#0a0a0a] transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,212,255,0.3)]"
      >
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span>
          {c.primary} · {personal.phone}
        </span>
      </a>
      <p className="mt-3 font-mono text-xs text-[#4d5866]">{c.primaryNote}</p>

      <H2 id="canais">{c.hChannels}</H2>
      <dl className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {channels.map((ch) => (
          <div key={ch.label} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#4d5866]">{ch.label}</dt>
            <dd>
              <a
                href={ch.href}
                target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-[#c9d1d9] transition-colors hover:text-[#00d4ff]"
              >
                {ch.value}
              </a>
            </dd>
          </div>
        ))}
        <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#4d5866]">{c.channels.location}</dt>
          <dd className="text-[#8b949e]">
            {personal.location} — {c.locationNote}
          </dd>
        </div>
      </dl>

      <H2 id="esperar">{c.hExpect}</H2>
      <p className="mb-6 leading-[1.75] text-[#c9d1d9]">{c.expect}</p>

      <H2 id="form">{c.hWhy}</H2>
      <Callout tone="warn">{c.why}</Callout>
    </PageShell>
  );
}
