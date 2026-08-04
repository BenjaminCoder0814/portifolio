import { PageHeader, Breadcrumb, PageNav } from "@/components/engineering/ui";
import InProgress from "@/components/engineering/InProgress";

export const metadata = { title: "Journal — Enterprise Operations Platform" };

export default function Page() {
  return (
    <>
      <Breadcrumb trail={[{"label":"Engineering","href":"/engineering"},{"label":"Enterprise Operations Platform","href":"/engineering/erp"},{"label":"Journal"}]} />
      <PageHeader eyebrow="Enterprise Operations Platform" title="Engineering journal" status={{ tone: "amber", label: "In progress" }} lead="A running log of decisions, surprises and changes of direction while building and operating the platform." />
      <InProgress
        what="A changelog records what shipped. This records what I was thinking and where I was wrong."
        why="Entries are written the same week the thing happens. Reconstructed entries always sound cleaner than the truth, which makes them worth less than nothing."
        outline={[{"term":"Launch: the first week in production","desc":"What was not anticipated, who resisted, what broke, and what worked better than expected."},{"term":"The feature nobody used","desc":"Every system has one. Why it seemed essential, and what its absence of use revealed about the process."},{"term":"The decision I would reverse","desc":"When a record in the decision log is superseded, the reasoning is recorded here rather than quietly edited."}]}
      />
      <PageNav prev={{ label: "Challenges", href: "/engineering/erp/challenges" }} next={{ label: "Changelog", href: "/engineering/erp/changelog" }} />
    </>
  );
}
