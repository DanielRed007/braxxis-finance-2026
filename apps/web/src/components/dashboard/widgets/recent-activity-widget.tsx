'use client';

import type { ReactNode } from 'react';

const RECENT_ACTIVITY = [
  { action: 'Bought', asset: 'AAPL', amount: '$2,450.00', time: '2 hours ago' },
  { action: 'Sold', asset: 'ETH', amount: '$1,830.50', time: '5 hours ago' },
  { action: 'Bought', asset: 'TSLA', amount: '$3,120.00', time: '1 day ago' },
  { action: 'Dividend', asset: 'MSFT', amount: '+$48.20', time: '2 days ago' },
  { action: 'Bought', asset: 'BTC', amount: '$5,000.00', time: '3 days ago' },
];

export default function RecentActivityWidget(): ReactNode {
  return (
    <div
      className="p-6 rounded-2xl h-full"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>
        Recent Activity
      </h2>
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
            <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
