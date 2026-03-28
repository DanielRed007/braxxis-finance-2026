"use client";

import { useInView } from "../ui/use-in-view";

export function CTASection() {
  const [ref, visible] = useInView(0.2);

  return (
    <section className="max-w-5xl mx-auto px-6" ref={ref}>
      <div
        className="relative overflow-hidden p-12 md:p-20 text-center"
        style={{
          borderRadius: 40,
          background:
            "linear-gradient(135deg, rgb(124, 58, 237), rgba(24, 47, 255, 0.6))",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition:
            "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none grain-overlay"
          style={{
            borderRadius: "inherit",
            opacity: 0.35,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Ready to grow
            <br />
            your wealth?
          </h2>
          <p
            className="text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Join thousands of investors using Braxxis to track portfolios,
            analyze markets, and make smarter investment decisions — completely
            free to start.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="/auth/sign-up"
              className="px-8 py-3.5 rounded-full font-semibold text-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl"
              style={{
                background: "#fff",
                color: "var(--color-purple-primary)",
              }}
            >
              Start Investing Free
            </a>
            <a
              href="/auth/sign-in"
              className="px-8 py-3.5 rounded-full font-semibold text-lg text-white transition-all duration-200 hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
