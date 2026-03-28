"use client";

import { GradientText } from "../ui/gradient-text";
import { RevealCard } from "../ui/reveal-card";

interface Stat {
  label: string;
  value: string;
  sub: string;
}

const STATS: Stat[] = [
  { label: "Assets Managed", value: "$2.4B", sub: "Across all client portfolios" },
  { label: "Active Investors", value: "38K+", sub: "Growing every month" },
  { label: "Markets Tracked", value: "120+", sub: "Global equities, crypto & forex" },
  { label: "Avg. Return", value: "18.7%", sub: "Annual portfolio performance" },
  { label: "Uptime", value: "99.99%", sub: "Enterprise-grade reliability" },
];

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  return (
    <RevealCard delay={delay} className="h-full">
      <div
        className="p-8 rounded-2xl h-full transition-all duration-300 cursor-default hover:scale-[1.01]"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border-card)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-card-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border-card)";
        }}
      >
        <div
          className="text-xs font-medium uppercase tracking-widest mb-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          {stat.label}
        </div>
        <GradientText className="text-5xl md:text-6xl font-bold">
          {stat.value}
        </GradientText>
        <div
          className="mt-3 text-sm"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {stat.sub}
        </div>
      </div>
    </RevealCard>
  );
}

export function BentoStats() {
  return (
    <section className="max-w-6xl mx-auto px-6">
      <RevealCard className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <GradientText>Trusted by investors</GradientText>
        </h2>
        <p
          className="text-lg max-w-lg mx-auto"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Numbers that reflect the confidence our community places in every
          trade.
        </p>
      </RevealCard>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Row 1: 50/50 split */}
        <div className="md:col-span-2">
          <StatCard stat={STATS[0]} delay={0} />
        </div>
        <div className="md:col-span-2">
          <StatCard stat={STATS[1]} delay={0.1} />
        </div>

        {/* Row 2: three columns (1 + 1 + 2) */}
        <div className="md:col-span-1">
          <StatCard stat={STATS[2]} delay={0.2} />
        </div>
        <div className="md:col-span-1">
          <StatCard stat={STATS[3]} delay={0.3} />
        </div>
        <div className="md:col-span-2">
          <StatCard stat={STATS[4]} delay={0.4} />
        </div>
      </div>
    </section>
  );
}
