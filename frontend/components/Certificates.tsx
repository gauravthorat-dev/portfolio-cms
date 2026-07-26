"use client";

import { useEffect, useState } from "react";
import { Certificate, API_URL, api } from "@/lib/api";
import Reveal from "./Reveal";
import { ExternalLink, Download, Maximize2, X } from "lucide-react";

function fileUrl(path: string | null) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${API_URL}${path}`;
}

const GRADE_COLORS: Record<string, string> = {
  Elite: "#3fe4ff",
  Distinction: "#9d6bff",
  Pass: "#5be8a8",
};

function ordered(items: Certificate[]) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export default function Certificates({ certificates }: { certificates: Certificate[] }) {
  const [items, setItems] = useState<Certificate[]>(() => ordered(certificates));
  const [preview, setPreview] = useState<Certificate | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    api
      .getCertificates()
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
    <section id="certificates" className="pt-32 md:pt-[150px] px-5 md:px-16 max-w-[1360px] mx-auto">
      <Reveal className="mb-14">
        <span className="eyebrow">05 · Credentials</span>
        <h2 className="font-display text-[28px] md:text-[42px] font-semibold tracking-tight mt-2">Certificates</h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((c, i) => {
          const logo = fileUrl(c.issuer_logo);
          const image = fileUrl(c.image);
          const pdf = fileUrl(c.pdf_file);
          const gradeColor = (c.grade && GRADE_COLORS[c.grade]) || "#3fe4ff";
          const skills = Array.isArray(c.skills_learned) ? c.skills_learned : [];

          return (
            <Reveal key={c.id} delay={i * 0.05} className="glass p-6 transition-transform hover:-translate-y-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-violet/10 border border-violet/30 flex items-center justify-center overflow-hidden">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt={c.issuer || ""} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-display font-semibold text-violet">{(c.issuer || "C")[0]}</span>
                  )}
                </div>
                {c.featured && (
                  <span className="bg-cyan/10 border border-cyan/35 text-cyan text-[10px] px-2.5 py-1 rounded-full font-mono tracking-wide">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-[15.5px] font-semibold leading-snug mb-1.5">{c.title}</h3>
              <div className="text-xs text-dim font-mono">{c.issuer}</div>

              {c.grade && (
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: gradeColor }} />
                  <span className="text-[11.5px] font-mono" style={{ color: gradeColor }}>{c.grade}</span>
                  {c.duration && <span className="text-[11.5px] text-faint font-mono">· {c.duration}</span>}
                </div>
              )}

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {skills.slice(0, 4).map((s) => (
                    <span key={s} className="text-[10px] px-2 py-1 rounded-full border border-line text-dim font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-[11.5px] text-faint font-mono">
                <span>Issued {c.issue_date}</span>
                {c.credential_id && <span className="truncate max-w-[100px]" title={c.credential_id}>#{c.credential_id}</span>}
              </div>

              <div className="flex items-center gap-3 mt-4 flex-wrap">
                {image && (
                  <button
                    onClick={() => setPreview(c)}
                    className="flex items-center gap-1.5 text-xs text-dim hover:text-cyan transition font-mono"
                  >
                    <Maximize2 size={13} /> View
                  </button>
                )}
                {c.credential_url && (
                  <a
                    href={c.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-dim hover:text-cyan transition font-mono"
                  >
                    <ExternalLink size={13} /> Verify
                  </a>
                )}
                {pdf && (
                  <a
                    href={pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-dim hover:text-cyan transition font-mono"
                  >
                    <Download size={13} /> PDF
                  </a>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
      {error && items.length === 0 && (
        <p className="mt-4 text-xs text-faint font-mono">Certificates are temporarily unavailable.</p>
      )}

      {preview && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setPreview(null)}
        >
          <div className="glass max-w-lg w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 text-dim hover:text-text transition"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold mb-1 pr-8">{preview.title}</h3>
            <div className="text-xs text-dim font-mono mb-4">{preview.issuer}</div>
            {fileUrl(preview.image) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={fileUrl(preview.image)!} alt={preview.title} className="w-full rounded-lg border border-line" />
            )}
            {preview.description && <p className="text-dim text-[13.5px] leading-relaxed mt-4">{preview.description}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
