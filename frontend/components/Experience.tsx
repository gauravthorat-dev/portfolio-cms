import { ExperienceItem } from "@/lib/api";
import Reveal from "./Reveal";

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="pt-32 md:pt-[150px] px-5 md:px-16 max-w-[1360px] mx-auto">
      <Reveal className="mb-14">
        <span className="eyebrow">04 · Journey</span>
        <h2 className="font-display text-[28px] md:text-[42px] font-semibold tracking-tight mt-2">Experience</h2>
      </Reveal>
      <Reveal className="glass p-8 md:p-11">
        <div className="relative pl-9 timeline-line">
          {experience.map((e, i) => (
            <div key={e.id} className={`relative ${i === experience.length - 1 ? "" : "pb-11"}`}>
              <div className="absolute -left-9 top-1 w-3.5 h-3.5 rounded-full bg-void border-2 border-cyan shadow-[0_0_10px_rgba(63,228,255,0.5)]" />
              <div className="font-mono text-xs text-cyan tracking-wide">{e.duration}</div>
              <div className="text-lg font-semibold mt-1.5">{e.role}</div>
              <div className="text-[13px] text-dim mt-0.5">{e.company}</div>
              <div className="text-[13.5px] text-dim mt-2.5 leading-relaxed max-w-[520px]">{e.description}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
