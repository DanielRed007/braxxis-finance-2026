"use client";

import { GradientText } from "../ui/gradient-text";
import { FinanceCanvas } from "../ui/finance-canvas";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'rgb(6 0 16)' }}
    >
      {/* Layer 1: Finance-themed animated canvas */}
      <FinanceCanvas />

      {/* Layer 2: Center vignette so text stays readable over the vivid canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(6,0,16,0.55), transparent 80%)",
        }}
      />

      {/* Layer 4: Content with staggered entrance */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Announcement pill */}
        <div className="flex justify-center mb-8 animate-hero-stagger-0">
          <div
            className="flex items-center gap-2.5 px-4 py-1.5 text-sm"
            style={{
              borderRadius: "50px",
              background: "rgba(6, 0, 16, 0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ background: "var(--color-purple-primary)" }}
            >
              New
            </span>
            <span style={{ color: "var(--color-text-secondary)" }}>
              AI-powered portfolio analysis &amp; real-time insights
            </span>
            <span style={{ color: "var(--color-purple-accent)" }}>→</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6 animate-hero-stagger-1">
          <GradientText>Invest smarter</GradientText>
          <br />
          <span className="text-white">build wealth faster</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-hero-stagger-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Braxxis Finance gives you institutional-grade analytics, real-time
          market data, and intelligent portfolio management — all in one premium
          platform built for modern investors.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap animate-hero-stagger-3">
          <a
            href="/auth/sign-up"
            className="px-7 py-3 rounded-full font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-90"
            style={{ background: "var(--color-purple-primary)" }}
          >
            Get Started Free
          </a>
          <a
            href="/auth/sign-in"
            className="px-7 py-3 rounded-full font-semibold transition-all duration-200 hover:border-white/25 hover:text-white"
            style={{
              color: "rgba(255,255,255,0.7)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    </section>
  );
}
