"use client";

import { useEffect, useState } from "react";

const LINES = [
  "> initializing portfolio...",
  "> scanning credentials...",
  "> access granted",
  "> welcome, visitor",
];

export default function Boot() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHide(true), 2300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[999] bg-void flex flex-col items-center justify-center transition-all duration-700 ${
        hide ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      <div className="font-display text-[15px] tracking-[0.4em] text-dim mb-6">G • T SYSTEM</div>
      <div className="font-mono text-[12.5px] text-cyan min-h-[100px] w-80 leading-loose">
        {LINES.map((line, i) => (
          <div
            key={line}
            className="opacity-0 animate-[bootIn_0.4s_forwards]"
            style={{ animationDelay: `${i * 0.45}s` }}
          >
            {line}
          </div>
        ))}
      </div>
      <div className="w-80 h-0.5 bg-[#131a2b] mt-4 overflow-hidden rounded-full">
        <div className="h-full w-0 bg-gradient-to-r from-blue to-cyan animate-[bootFill_2.2s_ease-out_forwards_0.2s]" />
      </div>
      <style>{`
        @keyframes bootIn { to { opacity: 1; } }
        @keyframes bootFill { to { width: 100%; } }
      `}</style>
    </div>
  );
}
