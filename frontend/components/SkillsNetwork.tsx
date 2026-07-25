"use client";

import { useEffect, useRef } from "react";
import { Skill } from "@/lib/api";
import Reveal from "./Reveal";

const CATEGORY_COLORS: Record<string, string> = {
  Languages: "#3fe4ff",
  Backend: "#4a7dff",
  "Data & ML": "#9d6bff",
  Tools: "#5be8a8",
};

export default function SkillsNetwork({ skills }: { skills: Skill[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const holder = holderRef.current;
    if (!canvas || !holder) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Node = Skill & { x: number; y: number; baseX: number; baseY: number };
    let nodes: Node[] = [];
    let hoverIdx = -1;
    let raf = 0;

    function layout() {
      const rect = holder!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;
      const cx = canvas!.width / 2, cy = canvas!.height / 2;
      const R = Math.min(canvas!.width, canvas!.height) * 0.36;
      nodes = skills.map((d, i) => {
        const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
        const jitter = (i % 3) * 10;
        const x = cx + Math.cos(angle) * (R + jitter);
        const y = cy + Math.sin(angle) * (R + jitter) * 0.82;
        return { ...d, x, y, baseX: x, baseY: y };
      });
    }

    function colorFor(cat: string | null) {
      return (cat && CATEGORY_COLORS[cat]) || "#3fe4ff";
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      const t = Date.now() * 0.0006;

      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(74,125,255,0.15)";
      ctx.fill();
      ctx.strokeStyle = "rgba(74,125,255,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "#cfe0ff";
      ctx.font = "600 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("GT", cx, cy);

      nodes.forEach((n, i) => {
        n.x = n.baseX + Math.sin(t + i) * 4;
        n.y = n.baseY + Math.cos(t + i * 1.3) * 4;
        const active = hoverIdx === -1 || hoverIdx === i || nodes[hoverIdx]?.category === n.category;
        const alpha = active ? 0.55 : 0.1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = `rgba(120,150,220,${hoverIdx === i ? 0.8 : alpha * 0.5})`;
        ctx.lineWidth = hoverIdx === i ? 1.4 : 0.7;
        ctx.stroke();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].category === nodes[j].category) {
            const active = hoverIdx === -1 || hoverIdx === i || hoverIdx === j;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(120,150,220,${active ? 0.12 : 0.03})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n, i) => {
        const isHover = hoverIdx === i;
        const dim = hoverIdx !== -1 && !isHover && nodes[hoverIdx]?.category !== n.category;
        const r = isHover ? 9 : 6;
        const color = colorFor(n.category);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = dim ? 0.25 : 1;
        ctx.shadowColor = color;
        ctx.shadowBlur = isHover ? 18 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        ctx.fillStyle = dim ? "rgba(200,210,230,0.25)" : isHover ? "#fff" : "rgba(210,220,240,0.85)";
        ctx.font = `${isHover ? "600 12.5px" : "400 11.5px"} sans-serif`;
        ctx.textAlign = n.x > cx ? "left" : "right";
        ctx.textBaseline = "middle";
        ctx.fillText(n.name, n.x + (n.x > cx ? 12 : -12), n.y);
      });

      raf = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let found = -1;
      nodes.forEach((n, i) => { if (Math.hypot(mx - n.x, my - n.y) < 14) found = i; });
      hoverIdx = found;
      canvas!.style.cursor = found > -1 ? "pointer" : "default";
    }
    function onLeave() { hoverIdx = -1; }

    layout();
    draw();
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", layout);
    const t2 = setTimeout(layout, 500);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", layout);
      clearTimeout(t2);
    };
  }, [skills]);

  const categories = Array.from(new Set(skills.map((s) => s.category || "Other")));

  return (
    <section id="skills" className="pt-32 md:pt-[150px] px-5 md:px-16 max-w-[1360px] mx-auto">
      <Reveal className="mb-14">
        <span className="eyebrow">02 · Capabilities</span>
        <h2 className="font-display text-[28px] md:text-[42px] font-semibold tracking-tight mt-2">Skills network</h2>
      </Reveal>
      <Reveal>
        <div ref={holderRef} className="glass relative h-[420px] md:h-[520px]">
          <span className="absolute top-5 right-5 text-[11px] text-faint font-mono tracking-wide">hover a node</span>
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </Reveal>
      <Reveal className="flex gap-6 flex-wrap justify-center mt-6" delay={0.05}>
        {categories.map((c) => (
          <div key={c} className="flex items-center gap-2 text-xs text-dim font-mono">
            <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[c] || "#3fe4ff" }} />
            {c}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
