"use client";

import { useEffect, useRef } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: { x: number; y: number; r: number; s: number; tw: number }[] = [];
    let raf = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = document.body.scrollHeight;
      const count = Math.floor((canvas!.width * canvas!.height) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 1.3 + 0.2,
        s: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      for (const st of stars) {
        const alpha = 0.35 + Math.sin(t * st.s + st.tw) * 0.35;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,205,255,${Math.max(0, alpha)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    const t2 = setTimeout(resize, 800);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <div className="grid-overlay" />
      <div className="vignette" />
    </>
  );
}
