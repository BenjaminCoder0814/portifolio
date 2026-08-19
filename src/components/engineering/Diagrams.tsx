/**
 * Hand-built SVG diagrams.
 *
 * Chosen over a client-side diagram runtime (Mermaid et al.) on purpose: three
 * diagrams do not justify shipping a rendering engine to every visitor. These
 * are server-rendered, cost nothing at runtime, and stay legible when scaled.
 */

function Frame({ title, children, height }: { title: string; children: React.ReactNode; height: number }) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-xl border border-white/[0.07] bg-[#050505] p-6">
        <svg
          viewBox={`0 0 760 ${height}`}
          className="mx-auto block h-auto w-full min-w-[600px] max-w-[760px]"
          role="img"
          aria-label={title}
        >
          <defs>
            <marker id="arw" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#4d5866" />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-[#525960]">{title}</figcaption>
    </figure>
  );
}

const box = { rx: 8, fill: "rgba(255,255,255,0.025)", stroke: "rgba(255,255,255,0.10)" };

/* ── System architecture ─────────────────────────────────────────────────── */

export function SystemDiagram() {
  return (
    <Frame title="Figure 1 — System architecture: a React SPA over a decoupled Express REST API, with chat on Firestore beside it" height={400}>
      {/* client */}
      <rect x="240" y="20" width="280" height="92" {...box} />
      <text x="380" y="46" textAnchor="middle" fill="#00d4ff" fontSize="11" fontFamily="monospace" letterSpacing="1.5">CLIENT</text>
      <text x="380" y="70" textAnchor="middle" fill="#f1f5f9" fontSize="15" fontWeight="700">React SPA · TypeScript</text>
      <text x="380" y="92" textAnchor="middle" fill="#8b949e" fontSize="11.5">Design system · reusable component library</text>

      {/* edges down */}
      <line x1="315" y1="112" x2="315" y2="186" stroke="#4d5866" strokeWidth="1.2" markerEnd="url(#arw)" />
      <text x="303" y="152" textAnchor="end" fill="#8b949e" fontSize="10.5" fontFamily="monospace">REST</text>
      <text x="303" y="166" textAnchor="end" fill="#525960" fontSize="9.5" fontFamily="monospace">CRUD · auth</text>

      <line x1="445" y1="112" x2="445" y2="186" stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#arw)" />
      <text x="457" y="152" fill="#a78bfa" fontSize="10.5" fontFamily="monospace">Firestore</text>
      <text x="457" y="166" fill="#525960" fontSize="9.5" fontFamily="monospace">chat · live</text>

      {/* server */}
      <rect x="200" y="188" width="360" height="104" {...box} />
      <text x="380" y="214" textAnchor="middle" fill="#00d4ff" fontSize="11" fontFamily="monospace" letterSpacing="1.5">SERVER</text>
      <text x="380" y="238" textAnchor="middle" fill="#f1f5f9" fontSize="15" fontWeight="700">Node.js · Express</text>
      <rect x="222" y="252" width="150" height="26" rx="5" fill="rgba(0,212,255,0.07)" stroke="rgba(0,212,255,0.20)" />
      <text x="297" y="269" textAnchor="middle" fill="#7dd3fc" fontSize="10.5" fontFamily="monospace">JWT · role guard</text>
      <rect x="388" y="252" width="150" height="26" rx="5" fill="rgba(167,139,250,0.07)" stroke="rgba(167,139,250,0.20)" />
      <text x="463" y="269" textAnchor="middle" fill="#c4b5fd" fontSize="10.5" fontFamily="monospace">Firebase Firestore</text>

      {/* to db */}
      <line x1="380" y1="292" x2="380" y2="326" stroke="#4d5866" strokeWidth="1.2" markerEnd="url(#arw)" />

      {/* db */}
      <rect x="240" y="328" width="280" height="60" rx={8} fill="rgba(0,255,136,0.04)" stroke="rgba(0,255,136,0.18)" />
      <text x="380" y="352" textAnchor="middle" fill="#00ff88" fontSize="11" fontFamily="monospace" letterSpacing="1.5">DATA</text>
      <text x="380" y="374" textAnchor="middle" fill="#f1f5f9" fontSize="14" fontWeight="700">PostgreSQL on Neon — reached only through Prisma</text>
    </Frame>
  );
}

/* ── Entity / data model ─────────────────────────────────────────────────── */

export function DataModelDiagram() {
  const t = (x: number, y: number, label: string, rows: string[], tone = "#00d4ff") => (
    <g key={label}>
      <rect x={x} y={y} width="182" height={34 + rows.length * 19} {...box} />
      <rect x={x} y={y} width="182" height="28" rx={8} fill={`${tone}12`} />
      <text x={x + 12} y={y + 19} fill={tone} fontSize="11.5" fontFamily="monospace" fontWeight="700">{label}</text>
      {rows.map((r, i) => (
        <text key={r} x={x + 12} y={y + 47 + i * 19} fill={r.startsWith("→") ? "#a78bfa" : "#8b949e"} fontSize="11" fontFamily="monospace">
          {r}
        </text>
      ))}
    </g>
  );

  return (
    <Frame title="Figure 2 — Data model: a movement names the product, the person and the reason" height={330}>
      {t(40, 30, "PendingOrder", ["→ productId", "→ requestedById", "status"], "#00ff88")}
      {t(289, 30, "Product", ["id", "code", "stockCurrent"])}
      {t(538, 30, "User", ["id", "email", "role"], "#fbbf24")}

      {t(40, 178, "AuditLog", ["→ userId", "entity · action", "beforeJson → afterJson"], "#a78bfa")}
      {t(330, 178, "Movement", ["→ productId", "→ userId", "type · quantity"], "#00d4ff")}

      {/* relations */}
      <line x1="380" y1="122" x2="380" y2="176" stroke="#4d5866" strokeWidth="1.2" markerEnd="url(#arw)" />
      <line x1="629" y1="122" x2="629" y2="215" stroke="#4d5866" strokeWidth="1.2" />
      <line x1="629" y1="215" x2="514" y2="215" stroke="#4d5866" strokeWidth="1.2" markerEnd="url(#arw)" />
      <line x1="222" y1="215" x2="328" y2="215" stroke="#4d5866" strokeWidth="1.2" markerEnd="url(#arw)" />

      <text x="380" y="308" textAnchor="middle" fill="#525960" fontSize="11" fontStyle="italic">
        Stock is not a table you edit. It is a balance on the product, moved only by writing a movement.
      </text>
    </Frame>
  );
}

/* ── Stock movement write path ───────────────────────────────────────────── */

export function MovementFlowDiagram() {
  const step = (x: number, label: string, sub: string, tone: string) => (
    <g key={label}>
      <rect x={x} y="60" width="150" height="72" rx="8" fill={`${tone}0d`} stroke={`${tone}33`} />
      <text x={x + 75} y="88" textAnchor="middle" fill={tone} fontSize="12.5" fontWeight="700">{label}</text>
      <text x={x + 75} y="110" textAnchor="middle" fill="#8b949e" fontSize="10.5" fontFamily="monospace">{sub}</text>
    </g>
  );

  return (
    <Frame title="Figure 3 — Recording a movement: the row and the balance are written together or not at all" height={210}>
      {step(20, "Operator", "entrada · saída · ajuste", "#00d4ff")}
      {step(215, "API", "validates type + qty", "#00d4ff")}
      {step(410, "Guard", "balance cannot go < 0", "#fbbf24")}
      {step(605, "Transaction", "movement + product", "#00ff88")}

      <line x1="172" y1="96" x2="211" y2="96" stroke="#4d5866" strokeWidth="1.2" markerEnd="url(#arw)" />
      <line x1="367" y1="96" x2="406" y2="96" stroke="#4d5866" strokeWidth="1.2" markerEnd="url(#arw)" />
      <line x1="562" y1="96" x2="601" y2="96" stroke="#4d5866" strokeWidth="1.2" markerEnd="url(#arw)" />

      <text x="380" y="172" textAnchor="middle" fill="#f87171" fontSize="11.5" fontFamily="monospace">
        prisma.$transaction([ create(movement), update(product) ])
      </text>
      <text x="380" y="190" textAnchor="middle" fill="#525960" fontSize="11">
        A movement row that disagrees with the balance it changed is worse than no record at all.
      </text>
    </Frame>
  );
}
