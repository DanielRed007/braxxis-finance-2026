'use client';

import type { ReactNode } from 'react';

const WATCHLIST = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$198.45', change: '+1.23%', positive: true },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$892.30', change: '+3.47%', positive: true },
  { symbol: 'BTC', name: 'Bitcoin', price: '$67,241.00', change: '-0.82%', positive: false },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,521.80', change: '+2.15%', positive: true },
];

export default function WatchlistWidget(): ReactNode {
  return (
    <div
      className="p-6 rounded-2xl h-full"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>
        Watchlist
      </h2>
      <div className="flex flex-col gap-3">
        {WATCHLIST.map((item) => (
          <div
            key={item.symbol}
            className="flex items-center justify-between py-3"
            style={{ borderBottom: '1px solid var(--color-border-card)' }}
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
                <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  {item.symbol}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {item.name}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                {item.price}
              </div>
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
  );
}
