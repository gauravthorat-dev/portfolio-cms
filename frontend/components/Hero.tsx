"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/lib/api";

const ROLES = ["Python Developer", "Backend Engineer", "AI Enthusiast", "Cyber Security Learner"];

export default function Hero({ profile }: { profile: Profile }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let ri = 0, ci = 0, deleting = false, timeout: ReturnType<typeof setTimeout>;
    function tick() {
      const word = ROLES[ri];
      if (!deleting) {
        ci++;
        setText(word.slice(0, ci));
        if (ci === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 1400);
          return;
        }
      } else {
        ci--;
        setText(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % ROLES.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 35 : 65);
    }
    const start = setTimeout(tick, 500);
    return () => { clearTimeout(start); clearTimeout(timeout); };
  }, []);

  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="hero" className="min-h-screen flex items-center pt-32 px-5 md:px-16 max-w-[1360px] mx-auto relative">
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center w-full">
        <div>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#3fe4ff]" />
            <span className="eyebrow">Available for backend &amp; AI roles</span>
          </div>
          <h1 className="hero-name font-display text-[48px] md:text-[92px] leading-[0.98] font-bold tracking-tight">
            {firstName.toUpperCase()}
            <br />
            {lastName.toUpperCase()}
          </h1>
          <div className="mt-6 font-mono text-cyan text-base md:text-xl flex items-center gap-2.5 min-h-[28px]">
            <span>{text}</span>
            <span className="inline-block w-2 h-5 bg-cyan animate-pulse" />
          </div>
          <p className="mt-6 max-w-[480px] text-dim text-[15.5px] leading-relaxed">
            {profile.short_bio}
          </p>
          <div className="flex gap-3.5 mt-9 flex-wrap">
            <a href="#projects" className="btn-primary px-7 py-3.5 rounded-full text-[13.5px] font-mono text-white inline-flex items-center gap-2">
              View my work →
            </a>
            <a href="#contact" className="btn-ghost border border-line-strong px-7 py-3.5 rounded-full text-[13.5px] font-mono text-text inline-flex items-center gap-2">
              Get in touch
            </a>
          </div>
          <div className="grid grid-cols-4 gap-3.5 mt-16">
            {[["5+", "Projects"], ["3+", "Years learning"], ["10+", "Technologies"], ["100%", "Curiosity"]].map(([n, l]) => (
              <div key={l} className="glass p-4 text-center">
                <div className="font-display text-2xl font-semibold text-white">{n}</div>
                <div className="text-[10.5px] text-faint uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-80 md:h-[520px] flex items-center justify-center order-first md:order-last">
          <div className="absolute border border-dashed border-[rgba(120,170,255,0.08)] rounded-full w-[500px] h-[500px] max-w-full" style={{ animation: "spin 60s linear infinite" }} />
          <div className="absolute border rounded-full w-[420px] h-[420px] max-w-full" style={{ borderColor: "rgba(157,107,255,0.15)", animation: "spin 34s linear infinite reverse" }} />
          <div className="absolute border border-line rounded-full w-80 h-80 max-w-full" style={{ animation: "spin 22s linear infinite" }} />
          <div className="core-orb w-36 h-36 rounded-full relative z-[2]" />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_12px_#3fe4ff]" style={{ top: "14%", left: "50%" }} />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-violet shadow-[0_0_12px_#9d6bff]" style={{ top: "50%", left: "88%" }} />
          <div className="absolute w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_12px_#3fe4ff]" style={{ top: "86%", left: "30%" }} />
        </div>
      </div>
    </section>
  );
}
