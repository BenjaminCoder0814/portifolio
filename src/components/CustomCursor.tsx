"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX  = useRef(0);
  const mouseY  = useRef(0);
  const ringX   = useRef(0);
  const ringY   = useRef(0);
  const animId  = useRef(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };

    const loop = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringX.current + "px";
        ringRef.current.style.top  = ringY.current + "px";
      }
      animId.current = requestAnimationFrame(loop);
    };

    const hoverEls = 'a, button, [data-hover], input, textarea';
    const onOver = (e: MouseEvent) => { if ((e.target as Element).closest(hoverEls)) setHover(true); };
    const onOut  = (e: MouseEvent) => { if ((e.target as Element).closest(hoverEls)) setHover(false); };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);
    loop();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{
          width: 6, height: 6,
          background: hover ? "#7c3aed" : "#00d4ff",
          boxShadow:  hover
            ? "0 0 10px #7c3aed, 0 0 20px rgba(124,58,237,0.4)"
            : "0 0 10px #00d4ff, 0 0 20px rgba(0,212,255,0.35)",
          transition: "background 0.2s, box-shadow 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full hidden md:block"
        style={{
          width:   hover ? 48 : 32,
          height:  hover ? 48 : 32,
          border:  `1px solid ${hover ? "#7c3aed" : "#00d4ff"}`,
          opacity: hover ? 1 : 0.5,
          transition: "width 0.25s cubic-bezier(0.175,0.885,0.32,1.275), height 0.25s cubic-bezier(0.175,0.885,0.32,1.275), opacity 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}
