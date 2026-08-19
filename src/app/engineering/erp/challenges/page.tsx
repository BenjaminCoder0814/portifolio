import {
  PageHeader, Breadcrumb, PageNav, H2, H3, Prose, Lead, Callout, Code, DefList,
} from "@/components/engineering/ui";

export const metadata = { title: "Challenges — Enterprise Operations Platform" };

/**
 * Every challenge here is traceable to something in the repository — a comment,
 * a migration folder, a guard, a directory of dated scripts. Where the account
 * would need detail only the incident itself can supply, it says so instead of
 * inventing a debugging session.
 */
export default function Page() {
  return (
    <>
      <Breadcrumb
        trail={[
          { label: "Engineering", href: "/engineering" },
          { label: "Enterprise Operations Platform", href: "/engineering/erp" },
          { label: "Challenges" },
        ]}
      />

      <PageHeader
        eyebrow="Enterprise Operations Platform"
        title="Challenges"
        lead="The problems that shaped this system more than any feature did. Each one is visible in the code, which is the only reason it is written down here."
      />

      {/* ── 1. COLD BACKEND ─────────────────────────────────────────────── */}
      <H2 id="cold-start">A backend that goes to sleep</H2>

      <Lead>
        The system runs on free tiers. Free tiers suspend what is idle. So the first person to
        open the app each morning talks to a server that is not awake yet.
      </Lead>

      <Prose>
        <p>
          Render suspends an idle web service; Neon suspends an idle database. Both wake on
          demand, and both take seconds to do it. That is a perfectly reasonable trade for a
          system that costs nothing to run — but it lands on the worst possible person, the first
          one to arrive.
        </p>
        <p>
          The instinct is to show a spinner and wait. That is the wrong answer for chat: an empty
          contact list looks like <em>nobody is here</em>, not like <em>the server is waking
          up</em>. A warehouse operator does not distinguish between those two, and the second
          conclusion is the one that loses trust in the tool.
        </p>
      </Prose>

      <Code lang="frontend/src/pages/chat/chatHelpers.js">{`// IMPORTANTE: este array é apenas um FALLBACK visual usado quando a API
// /api/users/contacts ainda não respondeu (ex.: backend dormindo no Render).
// Assim que o backend responder, este array é substituído pela lista real
// (com os IDs verdadeiros do banco) — ver AuthContext.refreshContatosFromApi.
export const TODOS_USUARIOS = [
  { id: 1,   nome: 'Administrador',          perfil: 'ADMIN' },
  { id: 2,   nome: 'Expedição',              perfil: 'EXPEDICAO' },
  { id: 3,   nome: 'Compras',                perfil: 'COMPRAS' },
  { id: 4,   nome: 'Central de Atendimento', perfil: 'CENTRAL_ATENDIMENTO' },
  // ...
];`}</Code>

      <Prose>
        <p>
          The screen renders immediately with the shape of the answer, and the real data replaces
          it when it arrives. The comment is deliberately loud about what the array is not — a
          source of truth — because the failure mode of this pattern is someone later reading
          those IDs as real and writing against them.
        </p>
      </Prose>

      <Callout tone="warn" title="What it costs">
        Two representations of the same list now exist, and they drift the moment someone is
        added to the company. The fallback is stale by design and only correct in shape. The
        honest fix is not a better fallback — it is a backend that does not sleep, which is a
        billing decision rather than an engineering one.
      </Callout>

      {/* ── 2. MIGRATION ────────────────────────────────────────────────── */}
      <H2 id="migration">Changing the database under a system in use</H2>

      <Prose>
        <p>
          The first version ran on SQLite: a file, no server, nothing to configure. That was the
          right call for a project with one user and no certainty it would survive. It stopped
          being the right call the moment the warehouse and the sales floor were both writing.
        </p>
        <p>
          The move to PostgreSQL on Neon is still legible in the repository rather than tidied
          away — the SQLite migration lineage sits in{" "}
          <code>prisma/migrations_sqlite_bak/</code> beside the Postgres one, and the copy itself
          was a script (<code>scripts/migrate-sqlite-to-neon.mjs</code>) rather than a manual
          export.
        </p>
      </Prose>

      <DefList
        items={[
          {
            term: "Why it was survivable",
            tone: "green",
            desc: "Prisma had been the only thing talking to the database from the start. The application never held a dialect-specific query, so the migration touched the schema and the data, not the routes.",
          },
          {
            term: "Why the old lineage stayed",
            desc: "Deleting it would make the repository read as though it had always been Postgres. The history of a system that changed its mind is more useful to the next reader than a clean one that never did.",
          },
          {
            term: "What is still owed",
            tone: "amber",
            desc: "Two migration folders is confusing to encounter cold. It needs a note in the backend README explaining which lineage is live — not a deletion.",
          },
        ]}
      />

      {/* ── 3. CORRECTIONS ──────────────────────────────────────────────── */}
      <H2 id="corrections">Fixing production data without touching production</H2>

      <Prose>
        <p>
          A catalogue of physical products is never finished. Items get renamed, a category turns
          out to be wrong, a supplier changes a specification, a whole product line needs
          reclassifying. Every one of those is a data problem in a live database, and the fastest
          way to solve it is to open a client and start editing.
        </p>
        <p>
          That fast way is also the one with no record, no review and no undo. So corrections are
          written as dated scripts and committed:
        </p>
      </Prose>

      <Code lang="backend/scripts/ — a sample of the directory">{`bulk-insert-2026-05-27.mjs
migrate-lacres-liso-2026-05.mjs
insert-lacre-sacola-2026-05-27.mjs
query-abracadeiras-2026-07-06.mjs
update-abracadeiras-ajuste-2026-07-06b.mjs
fix-lacre-sacola-verde-2026-07-06.mjs
update-estoque-2026-07-03.mjs`}</Code>

      <Prose>
        <p>
          The pattern is visible in the names. A <code>query-</code> script runs first to see what
          would be affected; an <code>update-</code> script follows once the answer looks right;
          the <code>b</code> suffix on <code>2026-07-06b</code> is the second attempt of the same
          day, kept rather than overwritten. The date in the filename is what makes the directory
          readable a year later.
        </p>
      </Prose>

      <Callout tone="insight" title="The trade this actually makes">
        This is not version control for data and it does not pretend to be — there are no
        down-scripts, and nothing enforces that a script ran exactly once. What it buys is that
        every change to the catalogue has a diff, an author and a date, which is the difference
        between an error someone can find and an error nobody can explain.
      </Callout>

      {/* ── 4. ADOPTION ─────────────────────────────────────────────────── */}
      <H2 id="adoption">Business rules that are not technical decisions</H2>

      <Prose>
        <p>
          Some constraints in this system did not come from engineering at all. Access is
          restricted to working hours — Monday to Thursday 07:00–18:00, Friday until 16:00, and
          not at all on weekends:
        </p>
      </Prose>

      <Code lang="backend/src/utils/businessHours.js">{`export function checkBusinessHours() {
  const now     = new Date();
  const day     = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day === 0 || day === 6)
    return { ok: false, reason: 'Acesso permitido apenas de segunda a sexta-feira.' };

  if (day === 5 && (minutes < 7 * 60 || minutes >= 16 * 60))
    return { ok: false, reason: 'Na sexta-feira o acesso é das 07:00 às 16:00.' };

  // ...
}`}</Code>

      <H3>Why this is worth a paragraph</H3>

      <Prose>
        <p>
          A developer reading this in isolation sees an arbitrary restriction that will page
          someone at the worst possible moment. In context it is the company&apos;s operating
          policy expressed in the only place it can be enforced. The interesting part is not the
          rule — it is that the rule returns a <em>reason</em> rather than a bare rejection, so
          the person locked out is told why by the software instead of by a colleague.
        </p>
        <p>
          The unresolved question is what happens the day the warehouse works a Saturday.{" "}
          {"{{PREENCHER: houve alguma exceção real a essa regra em produção — inventário de fim de ano, hora extra? Como foi resolvido: mudança no código, deploy, ou alguém com acesso administrativo?}}"}
        </p>
      </Prose>

      <Callout tone="warn" title="Still being written">
        <p className="mb-2">
          What is missing from this page is the part only the incidents themselves can supply:
          what was tried before each of these worked.
        </p>
        <p className="text-[#8b949e]">
          {"{{PREENCHER: para cada desafio acima — o que você tentou antes da solução que ficou? A migração SQLite→Postgres teve downtime? Alguma correção de catálogo saiu errada e precisou ser desfeita?}}"}
        </p>
      </Callout>

      <PageNav
        prev={{ label: "Roadmap", href: "/engineering/erp/roadmap" }}
        next={{ label: "Journal", href: "/engineering/erp/journal" }}
      />
    </>
  );
}
