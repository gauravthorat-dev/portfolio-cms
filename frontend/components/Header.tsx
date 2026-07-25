"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-16 py-5 backdrop-blur-xl bg-void/55 border-b border-line transition-shadow ${
        scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : ""
      }`}
    >
      <div className="font-display font-semibold text-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_10px_#3fe4ff] animate-pulse" />
        GT
      </div>
      <nav className="hidden md:flex gap-8">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="text-[13.5px] text-dim hover:text-text transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="hidden md:inline-flex border border-line-strong px-4 py-2 rounded-full text-[12.5px] text-cyan font-mono hover:bg-cyan/5 transition-colors"
      >
        Open channel →
      </a>
      <button className="md:hidden text-text" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-void border-b border-line flex flex-col md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-5 py-4 text-sm text-dim border-t border-line first:border-t-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
