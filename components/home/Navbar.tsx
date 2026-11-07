
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Browse Jobs", href: "#jobs" },
  { label: "Company", href: "#company" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-30 flex items-center justify-between rounded-2xl border border-white/[0.03] bg-[#202023]/90 px-4 py-3 shadow-xl backdrop-blur-md sm:px-6">

      {/* Logo */}
      <a href="#" className="text-2xl font-extrabold tracking-tight sm:text-[27px]">
        <span className="text-[#168cff]">hire</span>
        <span className="text-[#ff6a00]">loop</span>
      </a>

      {/* Desktop navigation */}
      <nav className="hidden items-center gap-7 text-xs text-gray-300 md:flex lg:gap-9">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition hover:text-white"
          >
            {link.label}
          </a>
        ))}

        <span className="h-5 w-px bg-white/15" />

        <a
          href="#signin"
          className="font-medium text-[#776aff] hover:text-[#9b92ff]"
        >
          Sign In
        </a>

        <a
          href="#get-started"
          className="rounded-lg bg-[#6355ff] px-5 py-2.5 font-medium text-white shadow-[0_0_20px_rgba(99,85,255,0.2)] transition hover:bg-[#7569ff]"
        >
          Get Started
        </a>
      </nav>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="absolute left-0 right-0 top-[calc(100%+10px)] flex flex-col gap-4 rounded-xl border border-white/10 bg-[#171719] p-5 shadow-2xl md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#signin"
            onClick={() => setMenuOpen(false)}
            className="text-[#8175ff]"
          >
            Sign In
          </a>

          <a
            href="#get-started"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg bg-[#6355ff] px-4 py-3 text-center text-white"
          >
            Get Started
          </a>
        </nav>
      )}
    </header>
  );
}
