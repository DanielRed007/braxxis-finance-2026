'use client';

import type { ReactNode } from 'react';

const SUMMARY = [
  { label: '7D', value: '+3.2%', positive: true },
  { label: '30D', value: '+12.4%', positive: true },
  { label: '90D', value: '-2.1%', positive: false },
  { label: 'YTD', value: '+18.7%', positive: true },
];

export default function PerformanceChartWidget(): ReactNode {
  return (
    <div
      className="p-6 rounded-2xl h-full"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>
        Performance
      </h2>

      {/* Decorative chart area */}
      <div className="mb-5">
        <svg viewBox="0 0 300 80" className="w-full" style={{ opacity: 0.8 }}>
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 L30 52 L60 58 L90 40 L120 45 L150 30 L180 35 L210 20 L240 25 L270 15 L300 18"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
          />
          <path
            d="M0 60 L30 52 L60 58 L90 40 L120 45 L150 30 L180 35 L210 20 L240 25 L270 15 L300 18 L300 80 L0 80Z"
            fill="url(#chartGrad)"
          />
        </svg>
      </div>

      {/* Period summary */}
      <div className="grid grid-cols-4 gap-3">
        {SUMMARY.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {s.label}
            </div>
            <div
              className="text-sm font-semibold"
              style={{ color: s.positive ? '#4ade80' : '#f87171' }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
