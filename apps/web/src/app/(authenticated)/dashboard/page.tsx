'use client';

import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { GradientText } from '@/components/ui/gradient-text';

const PORTFOLIO_STATS = [
  { label: 'Total Balance', value: '$48,352.61', change: '+12.4%', positive: true },
  { label: 'Today\'s P&L', value: '+$1,204.30', change: '+2.5%', positive: true },
  { label: 'Open Positions', value: '14', change: '3 new', positive: true },
  { label: 'Win Rate', value: '73.2%', change: '+1.8%', positive: true },
];

const RECENT_ACTIVITY = [
  { action: 'Bought', asset: 'AAPL', amount: '$2,450.00', time: '2 hours ago' },
  { action: 'Sold', asset: 'ETH', amount: '$1,830.50', time: '5 hours ago' },
  { action: 'Bought', asset: 'TSLA', amount: '$3,120.00', time: '1 day ago' },
  { action: 'Dividend', asset: 'MSFT', amount: '+$48.20', time: '2 days ago' },
  { action: 'Bought', asset: 'BTC', amount: '$5,000.00', time: '3 days ago' },
];

const WATCHLIST = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$198.45', change: '+1.23%', positive: true },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$892.30', change: '+3.47%', positive: true },
  { symbol: 'BTC', name: 'Bitcoin', price: '$67,241.00', change: '-0.82%', positive: false },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,521.80', change: '+2.15%', positive: true },
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
      <div className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</div>
      <div
        className="text-xs font-medium"
        style={{ color: stat.positive ? '#4ade80' : '#f87171' }}
      >
        {stat.change}
      </div>
    </div>
  );
}

export default function DashboardPage(): ReactNode {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          <GradientText>Dashboard</GradientText>
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Welcome back, {user?.email?.split('@')[0] ?? 'investor'}. Here&apos;s your portfolio overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PORTFOLIO_STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Recent Activity */}
        <div
          className="lg:col-span-3 p-6 rounded-2xl"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-card)',
          }}
        >
          <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>Recent Activity</h2>
          <div className="flex flex-col gap-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3"
                style={{
                  borderBottom: i < RECENT_ACTIVITY.length - 1
                    ? '1px solid var(--color-border-card)'
                    : 'none',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: item.action === 'Sold'
                        ? 'rgba(248, 113, 113, 0.15)'
                        : 'rgba(134, 96, 250, 0.15)',
                      color: item.action === 'Sold' ? '#f87171' : '#a855f7',
                    }}
                  >
                    {item.asset.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {item.action} {item.asset}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {item.time}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Watchlist */}
        <div
          className="lg:col-span-2 p-6 rounded-2xl"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-card)',
          }}
        >
          <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>Watchlist</h2>
          <div className="flex flex-col gap-3">
            {WATCHLIST.map((item) => (
              <div
                key={item.symbol}
                className="flex items-center justify-between py-3"
                style={{
                  borderBottom: '1px solid var(--color-border-card)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background: 'rgba(134, 96, 250, 0.15)',
                      color: '#a855f7',
                    }}
                  >
                    {item.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.symbol}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {item.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.price}</div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: item.positive ? '#4ade80' : '#f87171' }}
                  >
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
