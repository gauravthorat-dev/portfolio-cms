"use client";

import { useEffect, useState } from "react";
import { Project, API_URL, api } from "@/lib/api";
import Reveal from "./Reveal";
import { Github, ExternalLink } from "lucide-react";

function mediaUrl(path: string | null) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_URL}${path}`;
}

function ordered(items: Project[]) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [items, setItems] = useState<Project[]>(() => ordered(projects));
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    api
      .getProjects()
      .then((data) => {
        if (active && Array.isArray(data)) {
          setItems(ordered(data));
          setError(false);
        }
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="projects" className="pt-32 md:pt-[150px] px-5 md:px-16 max-w-[1360px] mx-auto">
      <Reveal className="mb-14">
        <span className="eyebrow">03 · Work</span>
        <h2 className="font-display text-[28px] md:text-[42px] font-semibold tracking-tight mt-2">Selected projects</h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((p, i) => {
          const thumbnail = mediaUrl(p.thumbnail);
          const stack = Array.isArray(p.tech_stack) ? p.tech_stack : [];

          return (
          <Reveal key={p.id} delay={i * 0.05} className="glass overflow-hidden transition-transform hover:-translate-y-1.5">
            <div className="h-[190px] relative overflow-hidden bg-gradient-to-br from-[#0d1428] to-[#141c38] flex items-center justify-center">
              {p.featured && (
                <span className="absolute top-3.5 left-3.5 z-[2] bg-cyan/10 border border-cyan/35 text-cyan text-[10px] px-2.5 py-1 rounded-full font-mono tracking-wide">
                  Featured
                </span>
              )}
              {thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={thumbnail} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display text-[44px] font-bold text-white/10 tracking-wide relative z-[1]">
                  {p.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              )}
            </div>
            <div className="p-6 pt-5">
              <h3 className="text-lg font-semibold mb-1.5">{p.title}</h3>
              <p className="text-[13.5px] text-dim leading-relaxed mb-4">{p.short_description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {stack.map((t) => (
                  <span key={t} className="text-[10.5px] px-2.5 py-1 rounded-full border border-line text-dim font-mono">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {p.live_url && (
                  <a href={p.live_url} target="_blank" rel="noreferrer" className="text-xs text-dim hover:text-cyan transition-colors flex items-center gap-1.5 font-mono">
                    <ExternalLink size={13} /> Live demo
                  </a>
                )}
                {p.github_url && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" className="text-xs text-dim hover:text-cyan transition-colors flex items-center gap-1.5 font-mono">
                    <Github size={13} /> Source
                  </a>
                )}
              </div>
            </div>
          </Reveal>
          );
        })}
      </div>
      {error && items.length === 0 && (
        <p className="mt-4 text-xs text-faint font-mono">Projects are temporarily unavailable.</p>
      )}
    </section>
  );
}
