'use client';

import type { ReactNode } from 'react';

const MARKET_NEWS = [
  { title: 'Fed Signals Potential Rate Cut in Q3', source: 'Reuters', time: '15 min ago' },
  { title: 'NVIDIA Surpasses $2T Market Cap After Earnings Beat', source: 'Bloomberg', time: '1 hour ago' },
  { title: 'Bitcoin ETF Inflows Reach Record $1.2B in Single Day', source: 'CoinDesk', time: '3 hours ago' },
  { title: 'EU Approves New Digital Asset Regulation Framework', source: 'Financial Times', time: '5 hours ago' },
];

export default function MarketNewsWidget(): ReactNode {
  return (
    <div
      className="p-6 rounded-2xl h-full"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h2 className="font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>
        Market News
      </h2>
      <div className="flex flex-col gap-3">
        {MARKET_NEWS.map((item, i) => (
          <div
            key={i}
            className="py-3"
            style={{
              borderBottom: i < MARKET_NEWS.length - 1
                ? '1px solid var(--color-border-card)'
                : 'none',
            }}
          >
            <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
              {item.title}
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span>{item.source}</span>
              <span>·</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
