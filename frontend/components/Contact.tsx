"use client";

import { useState } from "react";
import { Profile, api } from "@/lib/api";
import Reveal from "./Reveal";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

export default function Contact({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.sendMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="pt-32 md:pt-[150px] px-5 md:px-16 max-w-[1360px] mx-auto">
      <Reveal className="mb-14">
        <span className="eyebrow">06 · Connect</span>
        <h2 className="font-display text-[28px] md:text-[42px] font-semibold tracking-tight mt-2">Let&apos;s build something</h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-7">
        <Reveal className="glass p-9 flex flex-col gap-5">
          <div>
            <h3 className="text-xl font-semibold mb-1.5">Open a channel</h3>
            <p className="text-dim text-sm leading-relaxed">
              Have a role, project, or idea worth discussing? I read every message and reply personally.
            </p>
          </div>
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3.5 text-sm py-3 border-t border-line">
              <span className="w-8.5 h-8.5 w-[34px] h-[34px] rounded-[10px] bg-cyan/10 border border-line flex items-center justify-center text-cyan"><Mail size={15} /></span>
              <div>{profile.email}<span className="block text-[11px] text-faint font-mono">Email</span></div>
            </a>
          )}
          {profile.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center gap-3.5 text-sm py-3 border-t border-line">
              <span className="w-[34px] h-[34px] rounded-[10px] bg-cyan/10 border border-line flex items-center justify-center text-cyan"><Linkedin size={15} /></span>
              <div>LinkedIn<span className="block text-[11px] text-faint font-mono">Profile</span></div>
            </a>
          )}
          {profile.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-3.5 text-sm py-3 border-t border-line">
              <span className="w-[34px] h-[34px] rounded-[10px] bg-cyan/10 border border-line flex items-center justify-center text-cyan"><Github size={15} /></span>
              <div>GitHub<span className="block text-[11px] text-faint font-mono">Code</span></div>
            </a>
          )}
          {profile.location && (
            <div className="flex items-center gap-3.5 text-sm py-3 border-t border-line">
              <span className="w-[34px] h-[34px] rounded-[10px] bg-cyan/10 border border-line flex items-center justify-center text-cyan"><MapPin size={15} /></span>
              <div>{profile.location}<span className="block text-[11px] text-faint font-mono">Location</span></div>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.05} className="glass p-9">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] text-faint uppercase tracking-wide font-mono">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="bg-white/[0.02] border border-line rounded-[10px] px-3.5 py-3 text-sm outline-none focus:border-cyan focus:shadow-[0_0_0_3px_rgba(63,228,255,0.1)] transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] text-faint uppercase tracking-wide font-mono">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
                className="bg-white/[0.02] border border-line rounded-[10px] px-3.5 py-3 text-sm outline-none focus:border-cyan focus:shadow-[0_0_0_3px_rgba(63,228,255,0.1)] transition"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] text-faint uppercase tracking-wide font-mono">Message</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What are you building?"
                rows={4}
                className="bg-white/[0.02] border border-line rounded-[10px] px-3.5 py-3 text-sm outline-none resize-y focus:border-cyan focus:shadow-[0_0_0_3px_rgba(63,228,255,0.1)] transition"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary justify-center px-7 py-3.5 rounded-full text-[13.5px] font-mono text-white border-none cursor-pointer disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send message →"}
            </button>
            {status === "sent" && (
              <p className="text-[12px] text-cyan text-center font-mono">Message sent — thanks for reaching out.</p>
            )}
            {status === "error" && (
              <p className="text-[12px] text-red-400 text-center font-mono">Something went wrong. Try again shortly.</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
