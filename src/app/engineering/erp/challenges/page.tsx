import { PageHeader, Breadcrumb, PageNav } from "@/components/engineering/ui";
import InProgress from "@/components/engineering/InProgress";

export const metadata = { title: "Challenges — Enterprise Operations Platform" };

export default function Page() {
  return (
    <>
      <Breadcrumb trail={[{"label":"Engineering","href":"/engineering"},{"label":"Enterprise Operations Platform","href":"/engineering/erp"},{"label":"Challenges"}]} />
      <PageHeader eyebrow="Enterprise Operations Platform" title="Challenges" status={{ tone: "amber", label: "In progress" }} lead="The hard problems in this system: what broke, how it was found, and what it cost to fix." />
      <InProgress
        what="Three challenges are identified and their problem statements are written. What is missing is the part that matters most: what was actually tried before it worked."
        why="These entries are being written from the real incident history rather than reconstructed after the fact. A plausible-sounding account of a debugging session that did not happen would undermine every other page in this section."
        outline={[{"term":"Concurrent stock movements across entities","desc":"Two operators can record movements on the same product simultaneously. A transfer is two writes that must both succeed or both fail — otherwise two ledgers disagree and neither can be trusted. This is the exact failure the spreadsheets had."},{"term":"Keeping every query entity-aware","desc":"A query missing its entity filter does not crash. It silently returns another company data. The most dangerous bug class in the codebase, precisely because it fails quietly."},{"term":"Designing for users who did not want software","desc":"Warehouse operators and salespeople had a process that worked badly but that they knew. Adoption was not won by being better in the abstract — it was won by being faster on day one, without training."}]}
      />
      <PageNav prev={{ label: "Roadmap", href: "/engineering/erp/roadmap" }} next={{ label: "Journal", href: "/engineering/erp/journal" }} />
    </>
  );
}
