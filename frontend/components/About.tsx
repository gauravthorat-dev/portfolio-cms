import { Profile } from "@/lib/api";
import Reveal from "./Reveal";

export default function About({ profile }: { profile: Profile }) {
  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <section id="about" className="pt-32 md:pt-[150px] px-5 md:px-16 max-w-[1360px] mx-auto">
      <Reveal className="mb-14">
        <span className="eyebrow">01 · Profile</span>
        <h2 className="font-display text-[28px] md:text-[42px] font-semibold tracking-tight mt-2">About the operator</h2>
      </Reveal>
      <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-7">
        <Reveal className="glass p-8">
          <div className="w-[120px] h-[120px] rounded-3xl mx-auto mb-5 bg-gradient-to-br from-[#1a2545] to-[#0c1226] border border-line-strong flex items-center justify-center font-display text-3xl font-semibold text-cyan shadow-[0_0_40px_rgba(63,228,255,0.12)]">
            {initials}
          </div>
          <div className="text-center text-lg font-semibold mt-1">{profile.name}</div>
          <div className="text-center text-cyan text-[12.5px] font-mono mt-1">Python &amp; Backend Developer</div>
          <div className="flex flex-col gap-2.5 mt-6 pt-5 border-t border-line">
            {[
              "MCA student",
              `Based in ${profile.location || "India"}`,
              "Open-source contributor",
              "Cyber security learner",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2.5 text-[13px] text-dim">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan flex-shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col gap-5">
          <Reveal className="glass p-8 text-dim text-[15px] leading-[1.85]" delay={0.05}>
            {profile.long_bio}
          </Reveal>
          <Reveal className="grid grid-cols-3 gap-3.5" delay={0.1}>
            {[["15+", "Certificates"], ["20+", "Courses"], ["1000+", "Hours coding"]].map(([n, l]) => (
              <div key={l} className="glass p-5 text-center">
                <div className="font-display text-2xl font-semibold text-white">{n}</div>
                <div className="text-[10.5px] text-faint uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </Reveal>
          <Reveal className="glass flex items-center px-7 py-5" delay={0.15}>
            <div className="flex-1">
              <span className="block text-xs text-faint font-mono">Completed</span>
              <span className="text-[14.5px] font-medium">BCA</span>
            </div>
            <span className="text-faint px-4">→</span>
            <div className="flex-1">
              <span className="block text-xs text-faint font-mono">In progress</span>
              <span className="text-[14.5px] font-medium text-cyan">MCA</span>
            </div>
            <span className="text-faint px-4">→</span>
            <div className="flex-1">
              <span className="block text-xs text-faint font-mono">Ahead</span>
              <span className="text-[14.5px] font-medium">Software Engineer</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
