import { PageHeader, Breadcrumb, PageNav } from "@/components/engineering/ui";
import InProgress from "@/components/engineering/InProgress";

export const metadata = { title: "AI Digital Workforce — Engineering" };

export default function Page() {
  return (
    <>
      <Breadcrumb trail={[{"label":"Engineering","href":"/engineering"},{"label":"AI Digital Workforce"}]} />
      <PageHeader eyebrow="Initiative" title="AI Digital Workforce" status={{ tone: "amber", label: "In progress" }} lead="Agents that take over repetitive administrative work, built on top of the platform already in production rather than as a parallel tool." />
      <InProgress
        what="The problem and the approach are settled. The architecture, model choice, integration surface and measured impact are not yet documented here."
        why="This page will follow the same structure as the ERP case study — problem, architecture, decisions, trade-offs, impact. It stays deliberately thin until the system is far enough along that describing it is reporting rather than forecasting."
        outline={[{"term":"Problem","desc":"Administrative work across departments is dominated by repetitive, rule-based tasks that consume staff time without requiring judgment."},{"term":"Approach","desc":"A digital workforce of agents taking over those tasks, integrated with the internal systems already in production so automation acts on live company data rather than a parallel copy that drifts."},{"term":"Why integrated rather than standalone","desc":"The platform already holds the operational data and already models the processes. Automation reading from a separate system would drift out of sync; automation built on the source of truth cannot."},{"term":"Architecture · Agent design · Workflows","desc":"To be documented: orchestration model, execution trigger, integration surface with the existing REST API, and failure handling."},{"term":"Current stage and measured impact","desc":"To be documented once there is something measured rather than intended."}]}
      />
      <PageNav prev={{ label: "Changelog", href: "/engineering/erp/changelog" }} />
    </>
  );
}
