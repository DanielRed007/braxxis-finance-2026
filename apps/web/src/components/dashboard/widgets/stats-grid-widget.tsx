'use client';

import type { ReactNode } from 'react';

const PORTFOLIO_STATS = [
  { label: 'Total Balance', value: '$48,352.61', change: '+12.4%', positive: true },
  { label: 'Today\'s P&L', value: '+$1,204.30', change: '+2.5%', positive: true },
  { label: 'Open Positions', value: '14', change: '3 new', positive: true },
  { label: 'Win Rate', value: '73.2%', change: '+1.8%', positive: true },
];

function StatCard({ stat }: { stat: typeof PORTFOLIO_STATS[number] }): ReactNode {
  return (
    <div
      className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <div
        className="text-xs font-medium uppercase tracking-widest mb-2"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {stat.label}
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
        {stat.value}
      </div>
      <div
        className="text-xs font-medium"
        style={{ color: stat.positive ? '#4ade80' : '#f87171' }}
      >
        {stat.change}
      </div>
    </div>
  );
}

export default function StatsGridWidget(): ReactNode {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {PORTFOLIO_STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
