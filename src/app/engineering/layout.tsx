import type { Metadata } from "next";
import Sidebar from "@/components/engineering/Sidebar";

export const metadata: Metadata = {
  title: "Engineering — Benjamin Maciel",
  description:
    "Technical documentation for systems built by Benjamin Maciel: architecture, engineering decisions, trade-offs and outcomes.",
  // The decision records reconstruct reasoning that still needs the author's
  // sign-off. Remove this once every page has been reviewed and verified.
  robots: { index: false, follow: false },
};

export default function EngineeringLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-[820px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
