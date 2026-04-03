'use client';

import type { ReactNode } from 'react';
import type { OrderBookEntry, RecentTrade } from '@/data/trade-data';

interface OrderBookProps {
  asks: OrderBookEntry[];
  bids: OrderBookEntry[];
  recentTrades: RecentTrade[];
  midPrice: string;
}

export function OrderBook({ asks, bids, recentTrades, midPrice }: OrderBookProps): ReactNode {
  return (
    <div
      className="rounded-2xl p-5 h-full"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-card)',
      }}
    >
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        Order Book
      </h3>

      {/* Header */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {['Price', 'Amount', 'Total'].map((h) => (
          <span
            key={h}
            className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', textAlign: h === 'Price' ? 'left' : 'right' }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Asks (reversed so lowest is at bottom) */}
      <div className="flex flex-col gap-0.5 mb-2">
        {[...asks].reverse().map((entry, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 py-0.5">
            <span className="text-xs font-mono" style={{ color: '#f87171' }}>{entry.price}</span>
            <span className="text-xs font-mono text-right" style={{ color: 'var(--color-text-secondary)' }}>{entry.amount}</span>
            <span className="text-xs font-mono text-right" style={{ color: 'var(--color-text-muted)' }}>{entry.total}</span>
          </div>
        ))}
      </div>

      {/* Mid price */}
      <div
        className="text-center py-2 mb-2 rounded-lg text-sm font-bold"
        style={{
          background: 'var(--color-input-bg)',
          color: 'var(--color-text-primary)',
        }}
      >
        ${midPrice}
      </div>

      {/* Bids */}
      <div className="flex flex-col gap-0.5 mb-5">
        {bids.map((entry, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 py-0.5">
            <span className="text-xs font-mono" style={{ color: '#4ade80' }}>{entry.price}</span>
            <span className="text-xs font-mono text-right" style={{ color: 'var(--color-text-secondary)' }}>{entry.amount}</span>
            <span className="text-xs font-mono text-right" style={{ color: 'var(--color-text-muted)' }}>{entry.total}</span>
          </div>
        ))}
      </div>

      {/* Recent trades */}
      <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
        Recent Trades
      </h3>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {['Price', 'Amount', 'Time'].map((h) => (
          <span
            key={h}
            className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', textAlign: h === 'Price' ? 'left' : 'right' }}
          >
            {h}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-0.5">
        {recentTrades.map((trade, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 py-0.5">
            <span className="text-xs font-mono" style={{ color: trade.side === 'buy' ? '#4ade80' : '#f87171' }}>
              {trade.price}
            </span>
            <span className="text-xs font-mono text-right" style={{ color: 'var(--color-text-secondary)' }}>{trade.amount}</span>
            <span className="text-xs font-mono text-right" style={{ color: 'var(--color-text-muted)' }}>{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
