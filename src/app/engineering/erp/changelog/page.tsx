import { PageHeader, Breadcrumb, PageNav } from "@/components/engineering/ui";
import InProgress from "@/components/engineering/InProgress";

export const metadata = { title: "Changelog — Enterprise Operations Platform" };

export default function Page() {
  return (
    <>
      <Breadcrumb trail={[{"label":"Engineering","href":"/engineering"},{"label":"Enterprise Operations Platform","href":"/engineering/erp"},{"label":"Changelog"}]} />
      <PageHeader eyebrow="Enterprise Operations Platform" title="Changelog" status={{ tone: "amber", label: "In progress" }} lead="Release history. Entries record the effect on the people using the system, not the commit that produced it." />
      <InProgress
        what="The v1 release contents are documented on the roadmap. The intermediate history — the internal beta and what changed after the team started using it — is being reconstructed from the repository history."
        why="Those intermediate entries are the interesting ones, because they record what real use changed. They are worth reconstructing accurately rather than approximating."
        outline={[{"term":"v1.0.0 — Production release","desc":"Five modules shipped: multi-entity inventory, real-time dashboards, automated pricing, internal chat, role-based access. Documented in full on the roadmap."},{"term":"v0.9.x — Internal beta","desc":"What existed before the official launch, and what changed after the operations team used it for the first time."},{"term":"Format","desc":"Grouped as Added / Changed / Fixed. Entries describe the consequence for the user — Stock table now loads 500+ items without freezing, not Refactored StockTable component."}]}
      />
      <PageNav prev={{ label: "Journal", href: "/engineering/erp/journal" }} next={{ label: "AI Digital Workforce", href: "/engineering/ai" }} />
    </>
  );
}
