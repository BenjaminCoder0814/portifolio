"use client";

import { useScrollY } from "@/hooks";

export default function ScrollIndicator() {
  const scrollY = useScrollY();

  // Never bail out on `typeof window === "undefined"`: that returned null on the
  // server and a <div> on the client's first render, which is exactly the
  // mismatch React reports as "Expected server HTML to contain a matching <div>".
  // The bar is rendered on both sides instead — useScrollY starts at 0 and only
  // updates in an effect, so server and first client render both produce 0%.
  const maxScroll =
    typeof document !== "undefined"
      ? document.documentElement.scrollHeight - window.innerHeight
      : 0;

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
