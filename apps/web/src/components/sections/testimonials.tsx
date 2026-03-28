"use client";

import { GradientText } from "../ui/gradient-text";
import { RevealCard } from "../ui/reveal-card";
import { MarqueeRow } from "../ui/marquee-row";

const TESTIMONIALS = [
  {
    name: "Marcus Webb",
    role: "Portfolio Manager",
    text: "Braxxis completely changed how I manage client portfolios. The real-time analytics and risk scoring are light-years ahead of what we had before.",
  },
  {
    name: "Sarah Lin",
    role: "Day Trader",
    text: "The speed of this platform is unreal. I can execute trades and monitor positions across multiple markets without any lag. Game changer.",
  },
  {
    name: "David Okonkwo",
    role: "Crypto Investor",
    text: "Finally a platform that takes digital assets seriously. The cold storage vault and DeFi integrations make Braxxis my go-to for crypto.",
  },
  {
    name: "Elena Moretti",
    role: "Financial Advisor",
    text: "My clients love the dashboard. The portfolio visualizations and projected returns make our quarterly reviews so much more productive.",
  },
  {
    name: "James Park",
    role: "Hedge Fund Analyst",
    text: "The AI-powered market signals have been incredibly accurate. We spotted three major swing opportunities last quarter that we would have missed otherwise.",
  },
  {
    name: "Priya Sharma",
    role: "Retail Investor",
    text: "I went from spreadsheets to Braxxis and my portfolio performance improved by 24%. The automated rebalancing alone is worth the subscription.",
  },
  {
    name: "Thomas Richter",
    role: "Wealth Manager",
    text: "Enterprise-grade tools at a fraction of the cost. We migrated our entire firm to Braxxis and haven't looked back since.",
  },
  {
    name: "Amara Johnson",
    role: "Startup Founder",
    text: "As a founder managing company treasury, Braxxis gives me institutional-level insight without needing a full finance team.",
  },
];

export function Testimonials() {
  return (
    <section className="w-full overflow-hidden">
      <RevealCard className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <GradientText>Loved by investors</GradientText>
        </h2>
        <p
          className="text-lg max-w-lg mx-auto"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Hear what our community has to say about growing their wealth with
          Braxxis.
        </p>
      </RevealCard>

      <div className="relative">
        {/* Left edge fade */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background:
              "linear-gradient(to right, var(--color-base), transparent)",
          }}
        />
        {/* Right edge fade */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 120,
            background:
              "linear-gradient(to left, var(--color-base), transparent)",
          }}
        />

        <div className="flex flex-col gap-4">
          <MarqueeRow testimonials={TESTIMONIALS} speed={0.35} reverse={false} />
          <MarqueeRow testimonials={TESTIMONIALS} speed={0.5} reverse={true} />
          <MarqueeRow testimonials={TESTIMONIALS} speed={0.25} reverse={false} />
        </div>
      </div>
    </section>
  );
}
