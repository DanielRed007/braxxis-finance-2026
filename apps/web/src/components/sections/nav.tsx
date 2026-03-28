"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "Features", "About", "Pricing"] as const;

export function Nav() {
  const [active, setActive] = useState<string>("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-all duration-400"
      style={{
        background: scrolled
          ? "linear-gradient(rgb(6,0,16), transparent)"
          : "transparent",
      }}
    >
      <nav
        className="flex items-center gap-1 px-2 py-1.5"
        style={{
          borderRadius: "50px",
          background: "rgba(6, 0, 16, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--color-border-nav)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-1 px-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
              fill="#8660fa"
              opacity="0.3"
            />
            <path
              d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
              stroke="#8660fa"
              strokeWidth="1.5"
              fill="none"
            />
            <path d="M9 12l2 2 4-4" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-white font-bold text-sm ml-1">Braxxis</span>
        </div>

        {/* Links */}
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => setActive(link)}
            className="relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 hover:text-white"
            style={{
              color:
                active === link ? "#fff" : "rgba(255,255,255,0.45)",
              background:
                active === link
                  ? "rgba(134,96,250,0.12)"
                  : "transparent",
            }}
          >
            {link}
            {active === link && (
              <span
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: "var(--color-purple-accent)" }}
              />
            )}
          </button>
        ))}

        {/* Auth buttons */}
        <div className="ml-2 flex items-center gap-2">
          <a
            href="/auth/sign-in"
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:text-white"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Sign In
          </a>
          <a
            href="/auth/sign-up"
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:brightness-90"
            style={{ background: "var(--color-purple-primary)" }}
          >
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  );
}
