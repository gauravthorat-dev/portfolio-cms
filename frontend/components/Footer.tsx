import { Profile } from "@/lib/api";

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="mt-32 md:mt-[150px] border-t border-line px-5 md:px-16 py-11">
      <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4">
        <p className="text-[12.5px] text-faint font-mono">© {new Date().getFullYear()} {profile.name}. Built from scratch.</p>
        <div className="flex gap-4">
          {profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="text-[12.5px] text-dim hover:text-cyan font-mono transition-colors">GitHub</a>}
          {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="text-[12.5px] text-dim hover:text-cyan font-mono transition-colors">LinkedIn</a>}
          {profile.email && <a href={`mailto:${profile.email}`} className="text-[12.5px] text-dim hover:text-cyan font-mono transition-colors">Email</a>}
        </div>
      </div>
    </footer>
  );
}
