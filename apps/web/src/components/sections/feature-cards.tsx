"use client";

import type { ReactNode } from "react";
import { GradientText } from "../ui/gradient-text";
import { RevealCard } from "../ui/reveal-card";

interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
  link: string;
}

const FEATURES: Feature[] = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a855f7"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Real-Time Analytics",
    desc: "Live market data, candlestick charts, and performance metrics updated every second across 120+ global markets.",
    link: "Explore analytics",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a855f7"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
      </svg>
    ),
    title: "Risk Management",
    desc: "AI-driven risk scoring, stop-loss automation, and portfolio stress testing to protect your capital in any market.",
    link: "Learn more",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a855f7"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a4 4 0 0 0-8 0v2" />
        <circle cx="12" cy="14" r="1.5" />
      </svg>
    ),
    title: "Secure Vault",
    desc: "Bank-grade encryption, multi-factor authentication, and cold storage integration for your digital assets.",
    link: "See security",
  },
];

export function FeatureCards() {
  return (
    <section className="max-w-6xl mx-auto px-6">
      <RevealCard className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <GradientText>Built for serious investors</GradientText>
        </h2>
        <p
          className="text-lg max-w-lg mx-auto"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Institutional-grade tools designed to help you make smarter, faster
          decisions.
        </p>
      </RevealCard>

      <div className="grid md:grid-cols-3 gap-4">
        {FEATURES.map((feature, i) => (
          <RevealCard key={feature.title} delay={i * 0.1}>
            <div
              className="group p-7 rounded-2xl h-full transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border-card)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--color-border-card-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--color-border-card)";
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: "rgba(134, 96, 250, 0.1)",
                  border: "1px solid rgba(134,96,250,0.15)",
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {feature.desc}
              </p>

              {/* Link */}
              <span
                className="text-sm font-medium inline-flex items-center gap-1.5"
                style={{ color: "var(--color-purple-light)" }}
              >
                {feature.link}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </RevealCard>
        ))}
      </div>
    </section>
  );
}
