"use client";

import type { ReactNode } from "react";
import { useInView } from "./use-in-view";

interface RevealCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealCard({ children, delay = 0, className = "" }: RevealCardProps) {
  const [ref, visible] = useInView(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
