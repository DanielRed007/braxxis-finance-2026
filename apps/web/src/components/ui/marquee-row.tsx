"use client";

import { useRef, useEffect } from "react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface MarqueeRowProps {
  testimonials: Testimonial[];
  speed?: number;
  reverse?: boolean;
}

export function MarqueeRow({
  testimonials,
  speed = 0.4,
  reverse = false,
}: MarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const animate = () => {
      offsetRef.current += reverse ? speed : -speed;
      const setWidth = el.scrollWidth / 3;

      if (Math.abs(offsetRef.current) >= setWidth) {
        offsetRef.current += reverse ? -setWidth : setWidth;
      }

      el.style.transform = `translateX(${offsetRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [speed, reverse]);

  const cards = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-4 will-change-transform"
        style={{ width: "max-content" }}
      >
        {cards.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="shrink-0 w-80 p-5 rounded-2xl"
            style={{
              background: "var(--color-surface)",
              border: "1px solid rgba(169, 148, 184, 0.15)",
            }}
          >
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "rgba(134, 96, 250, 0.25)",
                  color: "#a855f7",
                }}
              >
                {t.name[0]}
              </div>
              <div>
                <div className="text-white text-xs font-medium">{t.name}</div>
                <div
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
