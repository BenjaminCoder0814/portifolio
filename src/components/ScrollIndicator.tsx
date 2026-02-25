"use client";

import { useScrollY } from "@/hooks";

export default function ScrollIndicator() {
  const scrollY = useScrollY();

  // Get total scrollable height
  if (typeof window === "undefined") return null;

  const maxScroll =
    typeof document !== "undefined"
      ? document.documentElement.scrollHeight - window.innerHeight
      : 1;

  const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

  return (
    <div className="fixed top-0 left-0 right-0 z-[1001] h-[2px]">
      <div
        className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
