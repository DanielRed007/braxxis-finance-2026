'use client';

import type { ReactNode } from 'react';

const ALLOCATIONS = [
  { label: 'Stocks', pct: 45, color: '#a855f7' },
  { label: 'Crypto', pct: 30, color: '#6366f1' },
  { label: 'Bonds', pct: 15, color: '#4ade80' },
  { label: 'Cash', pct: 10, color: '#facc15' },
];

export default function PortfolioAllocationWidget(): ReactNode {
  return (
    <div
      className="p-6 rounded-2xl h-full"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>
        Portfolio Allocation
      </h2>
      <div className="flex flex-col gap-4">
        {ALLOCATIONS.map((a) => (
          <div key={a.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                {a.label}
              </span>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                {a.pct}%
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: 'var(--color-input-bg)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${a.pct}%`, background: a.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
