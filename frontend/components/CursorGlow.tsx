"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!ref.current) return;
      ref.current.style.left = `${e.clientX}px`;
      ref.current.style.top = `${e.clientY}px`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed w-[340px] h-[340px] rounded-full pointer-events-none z-[2] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ background: "radial-gradient(circle, rgba(74,125,255,0.06), transparent 70%)" }}
    />
  );
}
